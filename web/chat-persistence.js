/* ═══════════════════════════════════════
   MY MUQABALA — Chat Persistence Layer v2
   Multi-layer: localStorage + IndexedDB + Supabase
   Retry queue + fetch keepalive + audio blob save
   Hash dedup + idle save + persistent storage
═══════════════════════════════════════ */

const ChatPersistence = {

    _DB_NAME: 'mm_chat_db',
    _DB_VERSION: 2,
    _STORE_NAME: 'form_progress',
    _AUDIO_STORE: 'pending_audio',
    _db: null,
    _retryQueue: [],
    _retryTimer: null,
    _saveTimer: null,
    _idleTimer: null,
    _beaconUrl: null,
    _engine: null,
    _emergencySaved: false,
    _lastSaveHash: null,

    /* ─── Init ─── */
    async init(engine) {
        this._engine = engine;
        this._beaconUrl = (typeof SUPABASE_URL !== 'undefined' ? SUPABASE_URL : '') + '/functions/v1/save-form-beacon';

        // Open IndexedDB
        try {
            this._db = await this._openDB();
        } catch (e) {
            console.warn('IndexedDB unavailable:', e);
        }

        // [1.4] Defense-in-depth: multiple unload events
        this._setupEmergencySave();

        // Start retry loop
        this._startRetryLoop();

        // [1.6] Request persistent storage after first interaction
        this._requestPersistentStorage();
    },

    /* ─── IndexedDB setup (v2: adds pending_audio store) ─── */
    _openDB() {
        return new Promise((resolve, reject) => {
            if (typeof indexedDB === 'undefined') {
                reject(new Error('IndexedDB not available'));
                return;
            }
            const req = indexedDB.open(this._DB_NAME, this._DB_VERSION);
            req.onupgradeneeded = (e) => {
                const db = e.target.result;
                if (!db.objectStoreNames.contains(this._STORE_NAME)) {
                    db.createObjectStore(this._STORE_NAME, { keyPath: 'formId' });
                }
                // [1.2] Audio blob store
                if (!db.objectStoreNames.contains(this._AUDIO_STORE)) {
                    db.createObjectStore(this._AUDIO_STORE, { keyPath: 'formId' });
                }
            };
            req.onsuccess = () => resolve(req.result);
            req.onerror = () => reject(req.error);
        });
    },

    /* ─── LocalStorage key ─── */
    _localKey(formId) {
        return 'mm_chat_' + (formId || 'unknown');
    },

    /* ─── Save to localStorage ─── */
    saveLocal(formId, data) {
        try {
            const payload = Object.assign({}, data, {
                formId: formId,
                updatedAt: Date.now()
            });
            localStorage.setItem(this._localKey(formId), JSON.stringify(payload));
        } catch (e) {
            console.warn('localStorage save failed:', e);
            // [1.6] Fallback to sessionStorage
            try {
                sessionStorage.setItem(this._localKey(formId), JSON.stringify(Object.assign({}, data, { formId: formId, updatedAt: Date.now() })));
            } catch (e2) { /* quota exceeded everywhere */ }
        }

        // Also save to IndexedDB as backup
        this._saveIDB(formId, data);
    },

    /* ─── Load from localStorage ─── */
    loadLocal(formId) {
        try {
            var raw = localStorage.getItem(this._localKey(formId));
            if (!raw) {
                // [1.6] Try sessionStorage fallback
                raw = sessionStorage.getItem(this._localKey(formId));
            }
            if (!raw) return null;
            return JSON.parse(raw);
        } catch (e) {
            return null;
        }
    },

    /* ─── Clear localStorage ─── */
    clearLocal(formId) {
        try { localStorage.removeItem(this._localKey(formId)); } catch (e) { /* ignore */ }
        try { sessionStorage.removeItem(this._localKey(formId)); } catch (e) { /* ignore */ }
        this._clearIDB(formId);
    },

    /* ─── Save to IndexedDB ─── */
    async _saveIDB(formId, data) {
        if (!this._db) return;
        try {
            const tx = this._db.transaction(this._STORE_NAME, 'readwrite');
            const store = tx.objectStore(this._STORE_NAME);
            store.put(Object.assign({}, data, {
                formId: formId,
                updatedAt: Date.now()
            }));
        } catch (e) {
            console.warn('IndexedDB save failed:', e);
        }
    },

    /* ─── Load from IndexedDB ─── */
    loadIDB(formId) {
        if (!this._db) return Promise.resolve(null);
        return new Promise((resolve) => {
            try {
                const tx = this._db.transaction(this._STORE_NAME, 'readonly');
                const store = tx.objectStore(this._STORE_NAME);
                const req = store.get(formId);
                req.onsuccess = () => resolve(req.result || null);
                req.onerror = () => resolve(null);
            } catch (e) {
                resolve(null);
            }
        });
    },

    /* ─── Clear IndexedDB ─── */
    async _clearIDB(formId) {
        if (!this._db) return;
        try {
            const tx = this._db.transaction(this._STORE_NAME, 'readwrite');
            const store = tx.objectStore(this._STORE_NAME);
            store.delete(formId);
        } catch (e) { /* ignore */ }
    },

    /* ═══════════════════════════════════
       [1.2] Pending Audio Blob (IndexedDB)
    ═══════════════════════════════════ */

    async savePendingAudio(formId, variable, blob, duration) {
        if (!this._db) return;
        try {
            const tx = this._db.transaction(this._AUDIO_STORE, 'readwrite');
            const store = tx.objectStore(this._AUDIO_STORE);
            store.put({
                formId: formId,
                variable: variable,
                blob: blob,
                duration: duration,
                savedAt: Date.now()
            });
        } catch (e) {
            console.warn('Pending audio save failed:', e);
        }
    },

    loadPendingAudio(formId) {
        if (!this._db) return Promise.resolve(null);
        return new Promise((resolve) => {
            try {
                const tx = this._db.transaction(this._AUDIO_STORE, 'readonly');
                const store = tx.objectStore(this._AUDIO_STORE);
                const req = store.get(formId);
                req.onsuccess = () => resolve(req.result || null);
                req.onerror = () => resolve(null);
            } catch (e) {
                resolve(null);
            }
        });
    },

    async clearPendingAudio(formId) {
        if (!this._db) return;
        try {
            const tx = this._db.transaction(this._AUDIO_STORE, 'readwrite');
            const store = tx.objectStore(this._AUDIO_STORE);
            store.delete(formId);
        } catch (e) { /* ignore */ }
    },

    /* ═══════════════════════════════════
       Save to Supabase (debounced)
    ═══════════════════════════════════ */

    /* ─── [1.6] Debounced save with hash dedup ─── */
    scheduleSave() {
        const engine = this._engine;
        if (!engine || !engine.form) return;

        // Hash dedup: skip if data hasn't changed
        var hash = this._quickHash(JSON.stringify(engine.answers) + ':' + engine.currentStep);
        if (hash === this._lastSaveHash) return;

        clearTimeout(this._saveTimer);
        this._saveTimer = setTimeout(() => {
            this._lastSaveHash = hash;
            this._saveToServer();
        }, 2000);

        // [1.6] Schedule idle save as 3rd layer
        this._scheduleIdleSave();
    },

    /* ─── Immediate save to Supabase ─── */
    async _saveToServer() {
        const engine = this._engine;
        if (!engine || !engine._tel || !engine._code || typeof sb === 'undefined') return;

        try {
            const { error } = await sb.rpc('save_form_progress', {
                p_telephone: engine._tel,
                p_code: engine._code,
                p_form_id: engine.form.id,
                p_step: engine.currentStep,
                p_answers: engine.answers
            });
            if (error) throw error;
        } catch (e) {
            console.warn('Supabase save error, queueing retry:', e);
            this._enqueueRetry({
                telephone: engine._tel,
                code: engine._code,
                form_id: engine.form.id,
                step: engine.currentStep,
                answers: engine.answers
            });
        }
    },

    /* ─── Force save (synchronous, for unload) ─── */
    _saveImmediate() {
        const engine = this._engine;
        if (!engine || !engine.form) return;

        this.saveLocal(engine.form.id, {
            currentStep: engine.currentStep,
            answers: engine.answers,
            status: 'in_progress',
            version: engine.form.version || 1
        });
    },

    /* ─── Load from Supabase ─── */
    async loadServer(telephone, code, formId) {
        if (!telephone || !code || typeof sb === 'undefined') return null;
        try {
            const { data, error } = await sb.rpc('load_form_progress', {
                p_telephone: telephone,
                p_code: code,
                p_form_id: formId
            });
            if (error || !data) return null;

            const inner = data.data || data;
            if (data.success === false) return null;

            return {
                formId: inner.form_id || formId,
                currentStep: inner.step || inner.current_step || 0,
                answers: inner.answers || {},
                status: inner.status || 'in_progress',
                updatedAt: inner.updated_at ? new Date(inner.updated_at).getTime() : 0
            };
        } catch (e) {
            console.warn('Server load error:', e);
            return null;
        }
    },

    /* ─── Complete form on server ─── */
    async completeOnServer(telephone, code, formId, answers) {
        if (!telephone || !code || typeof sb === 'undefined') return false;
        try {
            const { error } = await sb.rpc('complete_form_response', {
                p_telephone: telephone,
                p_code: code,
                p_form_id: formId,
                p_answers: answers
            });
            if (error) throw error;
            return true;
        } catch (e) {
            console.warn('Completion save error:', e);
            return false;
        }
    },

    /* ─── Pick best save (by timestamp, not step count) ─── */
    pickBestSave(local, server, idb) {
        const candidates = [local, server, idb].filter(Boolean);
        if (candidates.length === 0) return null;
        if (candidates.length === 1) return candidates[0];

        candidates.sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
        return candidates[0];
    },

    /* ═══════════════════════════════════
       Retry Queue
    ═══════════════════════════════════ */

    _enqueueRetry(payload) {
        this._retryQueue = this._retryQueue.filter(p => p.form_id !== payload.form_id);
        this._retryQueue.push(payload);
    },

    _startRetryLoop() {
        this._retryTimer = setInterval(() => this._processRetryQueue(), 10000);
    },

    async _processRetryQueue() {
        if (this._retryQueue.length === 0) return;
        if (typeof sb === 'undefined') return;

        const queue = this._retryQueue.slice();
        this._retryQueue = [];

        for (const payload of queue) {
            try {
                const { error } = await sb.rpc('save_form_progress', {
                    p_telephone: payload.telephone,
                    p_code: payload.code,
                    p_form_id: payload.form_id,
                    p_step: payload.step,
                    p_answers: payload.answers
                });
                if (error) throw error;
            } catch (e) {
                this._retryQueue.push(payload);
            }
        }
    },

    /* ═══════════════════════════════════
       [1.4] Defense-in-depth emergency save
       4 events: visibilitychange, pagehide,
       beforeunload, freeze
    ═══════════════════════════════════ */

    _setupEmergencySave() {
        const handler = () => this._emergencySave();

        // visibilitychange (hidden) — primary for mobile
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'hidden') handler();
        });

        // pagehide — Safari/iOS
        window.addEventListener('pagehide', handler);

        // beforeunload — desktop browsers
        window.addEventListener('beforeunload', handler);

        // freeze — Chromium (Page Lifecycle API)
        if ('onfreeze' in document) {
            document.addEventListener('freeze', handler);
        }

        // [1.4] Check if page was discarded
        if (document.wasDiscarded) {
            console.info('Page was previously discarded by browser');
        }
    },

    _emergencySave() {
        if (this._emergencySaved) return;
        this._emergencySaved = true;

        // Reset flag after 2s to allow re-saving if user returns
        setTimeout(() => { this._emergencySaved = false; }, 2000);

        // 1. Save to localStorage synchronously
        this._saveImmediate();

        // 2. [1.4] fetch keepalive to server
        const engine = this._engine;
        if (!engine || !engine.form || !engine._tel || !engine._code) return;

        try {
            const payload = JSON.stringify({
                telephone: engine._tel,
                code: engine._code,
                form_id: engine.form.id,
                step: engine.currentStep,
                answers: engine.answers
            });
            fetch(this._beaconUrl, {
                method: 'POST',
                keepalive: true,
                headers: { 'Content-Type': 'application/json' },
                body: payload
            }).catch(function() {});
        } catch (e) { /* best effort */ }
    },

    /* ═══════════════════════════════════
       [1.6] Hash dedup + idle save +
       persistent storage
    ═══════════════════════════════════ */

    _quickHash(str) {
        var hash = 0;
        for (var i = 0; i < str.length; i++) {
            var chr = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0;
        }
        return hash;
    },

    _scheduleIdleSave() {
        if (this._idleTimer) return;
        var cb = () => {
            this._idleTimer = null;
            this._saveImmediate();
        };
        if (typeof requestIdleCallback !== 'undefined') {
            this._idleTimer = requestIdleCallback(cb, { timeout: 30000 });
        } else {
            this._idleTimer = setTimeout(cb, 5000);
        }
    },

    _requestPersistentStorage() {
        if (navigator.storage && navigator.storage.persist) {
            // Request after a small delay to not block init
            setTimeout(() => {
                navigator.storage.persist().then(function(granted) {
                    if (granted) {
                        console.info('Persistent storage granted');
                    }
                }).catch(function() {});
            }, 3000);
        }
    },

    /* ─── Cleanup ─── */
    destroy() {
        clearTimeout(this._saveTimer);
        clearInterval(this._retryTimer);
        if (this._idleTimer) {
            if (typeof cancelIdleCallback !== 'undefined') {
                cancelIdleCallback(this._idleTimer);
            } else {
                clearTimeout(this._idleTimer);
            }
        }
        this._retryQueue = [];
    }
};
