/* ═══════════════════════════════════════
   MY MUQABALA — Chat Engine v2.0
   Vanilla JS conversation engine
   State machine · Rendering · Persistence
   Skip logic · Theme · Back · Keyboard nav
═══════════════════════════════════════ */

const ChatEngine = {
    /* ─── State ─── */
    form: null,
    currentStep: 0,
    answers: {},
    variables: {},
    isProcessing: false,
    isResuming: false,
    totalInteractive: 0,
    completedInteractive: 0,
    _tel: null,
    _code: null,
    stepHistory: [],         // Stack for back button
    _isRecording: false,     // Prevent back during recording

    /* ─── Audio State ─── */
    _mediaRecorder: null,
    _audioChunks: [],
    _recordingStart: 0,
    _recordingTimer: null,
    _currentParts: [],
    _audioStream: null,
    _EDGE_FN_URL: 'https://eawmathizvtxdtdgrwsg.supabase.co/functions/v1/transcribe-audio',
    _MAX_RECORD_SEC: 300,

    /* ─── DOM refs ─── */
    els: {
        messages: null,
        messagesInner: null,
        inputArea: null,
        inputInner: null,
        progressFill: null,
        progressText: null,
        headerName: null,
        headerTitle: null,
        headerAvatar: null,
        backBtn: null,
    },

    /* ─── Interactive step types ─── */
    INTERACTIVE_TYPES: ['text_input', 'email_input', 'phone_input', 'choice', 'rating', 'date_input', 'slider', 'file_input'],

    /* ─── Phone prefix list (30+ countries) ─── */
    PHONE_PREFIXES: [
        { code: '+33',  flag: '\uD83C\uDDEB\uD83C\uDDF7', label: 'France' },
        { code: '+212', flag: '\uD83C\uDDF2\uD83C\uDDE6', label: 'Maroc' },
        { code: '+216', flag: '\uD83C\uDDF9\uD83C\uDDF3', label: 'Tunisie' },
        { code: '+213', flag: '\uD83C\uDDE9\uD83C\uDDFF', label: 'Alg\u00e9rie' },
        { code: '+32',  flag: '\uD83C\uDDE7\uD83C\uDDEA', label: 'Belgique' },
        { code: '+41',  flag: '\uD83C\uDDE8\uD83C\uDDED', label: 'Suisse' },
        { code: '+44',  flag: '\uD83C\uDDEC\uD83C\uDDE7', label: 'UK' },
        { code: '+1',   flag: '\uD83C\uDDFA\uD83C\uDDF8', label: 'US/CA' },
        { code: '+49',  flag: '\uD83C\uDDE9\uD83C\uDDEA', label: 'Allemagne' },
        { code: '+34',  flag: '\uD83C\uDDEA\uD83C\uDDF8', label: 'Espagne' },
        { code: '+39',  flag: '\uD83C\uDDEE\uD83C\uDDF9', label: 'Italie' },
        { code: '+31',  flag: '\uD83C\uDDF3\uD83C\uDDF1', label: 'Pays-Bas' },
        { code: '+352', flag: '\uD83C\uDDF1\uD83C\uDDFA', label: 'Luxembourg' },
        { code: '+377', flag: '\uD83C\uDDF2\uD83C\uDDE8', label: 'Monaco' },
        { code: '+90',  flag: '\uD83C\uDDF9\uD83C\uDDF7', label: 'Turquie' },
        { code: '+966', flag: '\uD83C\uDDF8\uD83C\uDDE6', label: 'Arabie S.' },
        { code: '+971', flag: '\uD83C\uDDE6\uD83C\uDDEA', label: '\u00C9AU' },
        { code: '+974', flag: '\uD83C\uDDF6\uD83C\uDDE6', label: 'Qatar' },
        { code: '+965', flag: '\uD83C\uDDF0\uD83C\uDDFC', label: 'Kowe\u00EFt' },
        { code: '+20',  flag: '\uD83C\uDDEA\uD83C\uDDEC', label: '\u00C9gypte' },
        { code: '+962', flag: '\uD83C\uDDEF\uD83C\uDDF4', label: 'Jordanie' },
        { code: '+961', flag: '\uD83C\uDDF1\uD83C\uDDE7', label: 'Liban' },
        { code: '+218', flag: '\uD83C\uDDF1\uD83C\uDDFE', label: 'Libye' },
        { code: '+222', flag: '\uD83C\uDDF2\uD83C\uDDF7', label: 'Mauritanie' },
        { code: '+221', flag: '\uD83C\uDDF8\uD83C\uDDF3', label: 'S\u00e9n\u00e9gal' },
        { code: '+225', flag: '\uD83C\uDDE8\uD83C\uDDEE', label: "C\u00f4te d'Iv." },
        { code: '+223', flag: '\uD83C\uDDF2\uD83C\uDDF1', label: 'Mali' },
        { code: '+237', flag: '\uD83C\uDDE8\uD83C\uDDF2', label: 'Cameroun' },
        { code: '+242', flag: '\uD83C\uDDE8\uD83C\uDDEC', label: 'Congo' },
        { code: '+243', flag: '\uD83C\uDDE8\uD83C\uDDE9', label: 'RDC' },
        { code: '+7',   flag: '\uD83C\uDDF7\uD83C\uDDFA', label: 'Russie' },
        { code: '+86',  flag: '\uD83C\uDDE8\uD83C\uDDF3', label: 'Chine' },
        { code: '+91',  flag: '\uD83C\uDDEE\uD83C\uDDF3', label: 'Inde' },
        { code: '+81',  flag: '\uD83C\uDDEF\uD83C\uDDF5', label: 'Japon' },
        { code: '+61',  flag: '\uD83C\uDDE6\uD83C\uDDFA', label: 'Australie' },
        { code: '+55',  flag: '\uD83C\uDDE7\uD83C\uDDF7', label: 'Br\u00e9sil' },
    ],

    /* ─── Signal Flutter app ─── */
    _signalFlutter(type, data) {
        const msg = JSON.stringify(Object.assign({ type: type }, data || {}));
        if (window.FlutterBridge) {
            window.FlutterBridge.postMessage(msg);
        } else if (window.parent !== window) {
            window.parent.postMessage(msg, '*');
        }
    },

    /* ══════════════════════════════════
       INIT
    ══════════════════════════════════ */
    async init() {
        // Parse URL params
        const params = new URLSearchParams(window.location.search);
        const formId = params.get('form');
        this._tel = params.get('tel') || sessionStorage.getItem('mm_telephone') || '';
        this._code = params.get('code') || sessionStorage.getItem('mm_access_code') || '';

        // Store auth in session
        if (this._tel) sessionStorage.setItem('mm_telephone', this._tel);
        if (this._code) sessionStorage.setItem('mm_access_code', this._code);

        // [1.4] Clean credentials from URL — keep only ?form=xxx
        if (params.get('tel') || params.get('code')) {
            const cleanUrl = window.location.pathname + (formId ? '?form=' + encodeURIComponent(formId) : '');
            window.history.replaceState({}, '', cleanUrl);
        }

        // Load form (support dynamic loading)
        if (formId && (!window.FORM_REGISTRY || !window.FORM_REGISTRY[formId])) {
            // [3.6] Try dynamic loading
            try {
                await this._loadFormScript(formId);
            } catch (e) { /* fallback: form not found */ }
        }

        if (!formId || !window.FORM_REGISTRY || !window.FORM_REGISTRY[formId]) {
            this._showError('Formulaire introuvable.');
            return;
        }
        this.form = window.FORM_REGISTRY[formId];

        // Cache DOM
        this.els.messages = document.getElementById('chat-messages');
        this.els.messagesInner = document.getElementById('chat-messages-inner');
        this.els.inputArea = document.getElementById('chat-input-area');
        this.els.inputInner = document.getElementById('chat-input-inner');
        this.els.progressFill = document.getElementById('chat-progress-fill');
        this.els.progressText = document.getElementById('chat-progress-text');
        this.els.headerName = document.getElementById('chat-header-name');
        this.els.headerTitle = document.getElementById('chat-header-title');
        this.els.headerAvatar = document.getElementById('chat-header-avatar');
        this.els.backBtn = document.getElementById('chat-back-step-btn');

        // [1.6] Setup header (safe DOM creation, no innerHTML)
        this.els.headerName.textContent = this.form.bot.name;
        this.els.headerTitle.textContent = this.form.title;
        this._setAvatarElement(this.els.headerAvatar, this.form.bot);

        // [2.1] Apply theme from form definition
        this._applyTheme();

        // Count interactive steps (accounting for skip logic)
        this.totalInteractive = this._countInteractiveSteps();

        // [2.2] Setup back button
        this._setupBackButton();

        // [1.2] Prefetch images
        this._prefetchImages();

        // [1.5] Init persistence layer
        if (typeof ChatPersistence !== 'undefined') {
            await ChatPersistence.init(this);
        }

        // [1.2] Audio blob save on tab close
        this._setupVisibilityHandler();

        // [5.3] Global error handling
        this._setupErrorHandling();

        // Check for saved progress (multi-layer)
        const localSave = this._loadLocal();
        let serverSave = null;
        let idbSave = null;

        if (this._tel && this._code && typeof sb !== 'undefined' && typeof ChatPersistence !== 'undefined') {
            serverSave = await ChatPersistence.loadServer(this._tel, this._code, this.form.id);
        }
        if (typeof ChatPersistence !== 'undefined') {
            idbSave = await ChatPersistence.loadIDB(this.form.id);
        }

        // [1.5B] Pick best save by timestamp
        const bestSave = this._pickBestSave(localSave, serverSave, idbSave);

        // [1.8] Check version compatibility
        if (bestSave && bestSave.version && this.form.version && bestSave.version !== this.form.version) {
            this._showVersionWarning(bestSave);
            return;
        }

        if (bestSave && bestSave.currentStep > 0 && bestSave.status !== 'completed') {
            this._showResumeDialog(bestSave);
        } else {
            document.body.classList.remove('chat-loading');
            document.body.classList.add('chat-ready');
            // [1.2] Check for pending audio from interrupted recording
            this._checkPendingAudio();
            this._processStep();
        }
    },

    /* ─── [3.6] Dynamic form loading ─── */
    _loadFormScript(formId) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'forms/' + encodeURIComponent(formId) + '.js';
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    },

    /* ─── [2.1] Apply theme from form definition ─── */
    _applyTheme() {
        const theme = this.form.theme;
        if (!theme) return;

        const root = document.documentElement;
        const map = {
            background:      '--chat-bg',
            botBubbleBg:     '--bot-bubble-bg',
            botBubbleText:   '--bot-bubble-text',
            botBubbleBorder: '--bot-bubble-border',
            userBubbleBg:    '--user-bubble-bg',
            userBubbleText:  '--user-bubble-text',
            buttonBg:        '--btn-bg',
            buttonText:      '--btn-text',
            inputBg:         '--input-bg',
            inputText:       '--input-text',
            inputBorder:     '--input-border',
            progressFill:    '--progress-fill',
            progressBg:      '--progress-bg',
        };

        for (const [key, cssVar] of Object.entries(map)) {
            if (theme[key]) {
                // [2.2] Detect gradient values and use background-image
                if (key === 'progressFill' && theme[key].includes('gradient')) {
                    root.style.setProperty(cssVar, 'transparent');
                    root.style.setProperty('--progress-fill-gradient', theme[key]);
                } else {
                    root.style.setProperty(cssVar, theme[key]);
                }
            }
        }

        // Compute hover from buttonBg
        if (theme.buttonBg) {
            root.style.setProperty('--btn-hover', this._darkenColor(theme.buttonBg, 15));
            root.style.setProperty('--input-focus', theme.buttonBg);
        }

        // Update meta theme-color
        const metaTheme = document.querySelector('meta[name="theme-color"]');
        if (metaTheme && theme.background) {
            metaTheme.setAttribute('content', theme.background);
        }
    },

    _darkenColor(hex, percent) {
        const num = parseInt(hex.replace('#', ''), 16);
        const r = Math.max(0, (num >> 16) - Math.round(2.55 * percent));
        const g = Math.max(0, ((num >> 8) & 0x00FF) - Math.round(2.55 * percent));
        const b = Math.max(0, (num & 0x0000FF) - Math.round(2.55 * percent));
        return '#' + (0x1000000 + (r << 16) + (g << 8) + b).toString(16).slice(1);
    },

    /* ─── [1.6] Safe avatar element creation ─── */
    _setAvatarElement(container, bot) {
        container.textContent = '';
        if (bot.avatar && bot.avatar.length > 2) {
            const img = document.createElement('img');
            img.src = bot.avatar;
            img.alt = bot.name;
            img.onerror = function() { this.replaceWith(document.createTextNode(bot.name.charAt(0))); };
            container.appendChild(img);
        } else {
            container.textContent = bot.avatar || 'M';
        }
    },

    /* ─── [1.6] Create avatar DOM node (returns element, not HTML string) ─── */
    _createAvatarNode() {
        const wrap = document.createElement('div');
        wrap.className = 'chat-msg-avatar';
        if (this.form.bot.avatar && this.form.bot.avatar.length > 2) {
            const img = document.createElement('img');
            img.src = this.form.bot.avatar;
            img.alt = this.form.bot.name;
            img.onerror = function() { this.replaceWith(document.createTextNode('M')); };
            wrap.appendChild(img);
        } else {
            wrap.textContent = this.form.bot.avatar || 'M';
        }
        return wrap;
    },

    /* ─── [1.2] Prefetch images ─── */
    _prefetchImages() {
        if (!this.form || !this.form.steps) return;
        this.form.steps.forEach(function(step) {
            if (step.type === 'image' && step.url) {
                var link = document.createElement('link');
                link.rel = 'prefetch';
                link.as = 'image';
                link.href = step.url;
                document.head.appendChild(link);
            }
        });
    },

    /* ─── Count interactive steps (with skip logic) ─── */
    _countInteractiveSteps() {
        return this.form.steps.filter(function(s) {
            return this.INTERACTIVE_TYPES.includes(s.type);
        }.bind(this)).length;
    },

    /* ─── [2.2] Back button ─── */
    _setupBackButton() {
        if (!this.els.backBtn) return;
        this.els.backBtn.addEventListener('click', () => this._goBack());
        this._updateBackButton();
    },

    _updateBackButton() {
        if (!this.els.backBtn) return;
        this.els.backBtn.style.display = (this.stepHistory.length > 0 && !this._isRecording) ? 'flex' : 'none';
    },

    _goBack() {
        if (this.stepHistory.length === 0 || this.isProcessing || this._isRecording) return;

        const prev = this.stepHistory.pop();

        // Remove DOM elements added after this point
        this._removeBubblesAfter(prev.domCount);

        // Restore state
        if (prev.variable) {
            delete this.answers[prev.variable];
            delete this.variables[prev.variable];
            delete this.answers[prev.variable + '_audio_urls'];
        }
        this.currentStep = prev.step;
        this.completedInteractive = prev.completedInteractive;

        this._hideInput();
        this._updateProgress();
        this._updateBackButton();

        // Save state
        this._saveLocal();

        // Re-process the step
        setTimeout(() => this._processStep(), 200);
    },

    _removeBubblesAfter(count) {
        const children = this.els.messagesInner.children;
        while (children.length > count) {
            children[children.length - 1].remove();
        }
    },

    _pushHistory(step) {
        if (!this.INTERACTIVE_TYPES.includes(step.type)) return;
        this.stepHistory.push({
            step: this.currentStep,
            variable: step.variable,
            completedInteractive: this.completedInteractive,
            domCount: this.els.messagesInner.children.length
        });
        this._updateBackButton();
    },

    /* ─── [5.3] Error handling ─── */
    _setupErrorHandling() {
        window.addEventListener('error', (e) => {
            console.error('Chat engine error:', e.error);
            this._showToast('Une erreur est survenue. Tes r\u00e9ponses sont sauvegard\u00e9es.');
        });
        window.addEventListener('unhandledrejection', (e) => {
            console.error('Unhandled promise rejection:', e.reason);
            this._showToast('Une erreur est survenue. Tes r\u00e9ponses sont sauvegard\u00e9es.');
        });
    },

    /* ─── [1.2] Visibility handler: save audio blob on tab close ─── */
    _setupVisibilityHandler() {
        var self = this;
        document.addEventListener('visibilitychange', function() {
            if (document.visibilityState === 'hidden' && self._isRecording && self._mediaRecorder) {
                // Stop recording — onstop will save blob via _pendingVisibilityBlob flag
                self._pendingVisibilityBlob = true;
                self._mediaRecorder.stop();
            }
        });
    },

    /* ─── [1.2] Check for pending audio from a previous session ─── */
    async _checkPendingAudio() {
        if (typeof ChatPersistence === 'undefined' || !this.form) return;
        var pending = await ChatPersistence.loadPendingAudio(this.form.id);
        if (!pending) return;

        // Show a dialog offering to recover the audio
        var overlay = document.createElement('div');
        overlay.className = 'chat-resume-overlay';
        overlay.innerHTML =
            '<div class="chat-resume-dialog">' +
                '<div class="chat-resume-title">Enregistrement r\u00e9cup\u00e9r\u00e9</div>' +
                '<div class="chat-resume-text">Tu avais un enregistrement audio en cours. Souhaites-tu le r\u00e9cup\u00e9rer ?</div>' +
                '<div class="chat-resume-actions">' +
                    '<button class="chat-resume-btn secondary" id="pending-audio-discard">Ignorer</button>' +
                    '<button class="chat-resume-btn primary" id="pending-audio-recover">R\u00e9cup\u00e9rer</button>' +
                '</div>' +
            '</div>';
        document.body.appendChild(overlay);

        var self = this;
        document.getElementById('pending-audio-discard').addEventListener('click', function() {
            overlay.remove();
            ChatPersistence.clearPendingAudio(self.form.id);
        });
        document.getElementById('pending-audio-recover').addEventListener('click', function() {
            overlay.remove();
            // Find the current step to pass to audio preview
            var step = self.form.steps[self.currentStep];
            if (step && step.type === 'text_input') {
                var mime = self._getAudioMimeType();
                var duration = (pending.duration || 5000) / 1000;
                self._renderAudioPreview(pending.blob, duration, step, mime);
            }
            ChatPersistence.clearPendingAudio(self.form.id);
        });
    },

    _showToast(msg) {
        const existing = document.querySelector('.chat-toast');
        if (existing) existing.remove();

        const toast = document.createElement('div');
        toast.className = 'chat-toast';
        toast.textContent = msg;
        document.body.appendChild(toast);
        requestAnimationFrame(() => toast.classList.add('visible'));
        setTimeout(() => {
            toast.classList.remove('visible');
            setTimeout(() => toast.remove(), 300);
        }, 4000);
    },

    /* ─── [1.8] Version warning ─── */
    _showVersionWarning(saveData) {
        const overlay = document.createElement('div');
        overlay.className = 'chat-resume-overlay';
        overlay.innerHTML =
            '<div class="chat-resume-dialog">' +
                '<div class="chat-resume-title">Formulaire mis \u00e0 jour</div>' +
                '<div class="chat-resume-text">Ce formulaire a \u00e9t\u00e9 modifi\u00e9 depuis ta derni\u00e8re visite. Tes r\u00e9ponses pr\u00e9c\u00e9dentes ne sont plus compatibles. Souhaites-tu recommencer ?</div>' +
                '<div class="chat-resume-actions">' +
                    '<button class="chat-resume-btn primary" id="version-restart">Recommencer</button>' +
                '</div>' +
            '</div>';

        document.body.appendChild(overlay);
        document.body.classList.remove('chat-loading');
        document.body.classList.add('chat-ready');

        document.getElementById('version-restart').addEventListener('click', () => {
            overlay.remove();
            this.answers = {};
            this.variables = {};
            this.currentStep = 0;
            this.completedInteractive = 0;
            this._clearLocal();
            this._processStep();
        });
    },

    /* ─── Resume Dialog ─── */
    _showResumeDialog(saveData) {
        const overlay = document.createElement('div');
        overlay.className = 'chat-resume-overlay';

        const answeredCount = Object.keys(saveData.answers || {}).length;

        overlay.innerHTML =
            '<div class="chat-resume-dialog">' +
                '<div class="chat-resume-title">Reprendre ta conversation ?</div>' +
                '<div class="chat-resume-text">Tu avais r\u00e9pondu \u00e0 ' + answeredCount + ' question' + (answeredCount > 1 ? 's' : '') + '. Veux-tu reprendre l\u00e0 o\u00f9 tu en \u00e9tais ?</div>' +
                '<div class="chat-resume-actions">' +
                    '<button class="chat-resume-btn secondary" id="resume-restart">Recommencer</button>' +
                    '<button class="chat-resume-btn primary" id="resume-continue">Reprendre</button>' +
                '</div>' +
            '</div>';

        document.body.appendChild(overlay);
        document.body.classList.remove('chat-loading');
        document.body.classList.add('chat-ready');

        document.getElementById('resume-continue').addEventListener('click', () => {
            overlay.remove();
            this._resumeFrom(saveData);
        });

        document.getElementById('resume-restart').addEventListener('click', () => {
            overlay.remove();
            this.answers = {};
            this.variables = {};
            this.currentStep = 0;
            this.completedInteractive = 0;
            this.stepHistory = [];
            this._clearLocal();
            this._updateBackButton();
            this._processStep();
        });
    },

    /* ─── Resume: replay all steps instantly ─── */
    _resumeFrom(saveData) {
        this.isResuming = true;
        this.answers = saveData.answers || {};
        this.variables = {};
        this.currentStep = 0;
        this.completedInteractive = 0;
        this.stepHistory = [];

        // Rebuild variables from answers
        for (const [variable, value] of Object.entries(this.answers)) {
            this.variables[variable] = value;
        }

        const targetStep = saveData.currentStep;

        // Replay all steps up to saved position instantly
        for (var i = 0; i < targetStep && i < this.form.steps.length; i++) {
            var step = this.form.steps[i];

            // [3.1] Skip logic during resume
            if (step.condition && !this._evaluateCondition(step.condition)) {
                continue;
            }

            this._renderStepInstant(step, i);
            if (this.INTERACTIVE_TYPES.includes(step.type)) {
                this.completedInteractive++;
            }
        }

        this.currentStep = targetStep;
        this.isResuming = false;
        this._updateProgress();
        this._scrollToBottom(false);

        // Continue from saved position
        setTimeout(() => this._processStep(), 400);
    },

    /* ─── Render step instantly (for resume) ─── */
    _renderStepInstant(step, index) {
        switch (step.type) {
            case 'message':
                this._addBotBubble(this._renderContent(step.content), true);
                break;
            case 'image':
                this._addImageBubble(step, true);
                break;
            case 'section':
                this._addSection(step.title, true);
                break;
            case 'text_input': {
                var val = this.answers[step.variable];
                if (val) {
                    var hasAudio = this.answers[step.variable + '_audio_urls'] && this.answers[step.variable + '_audio_urls'].length > 0;
                    this._addUserBubble(val + (hasAudio ? ' \uD83C\uDFA4' : ''), true);
                }
                break;
            }
            case 'email_input':
            case 'phone_input':
            case 'date_input': {
                var val2 = this.answers[step.variable];
                if (val2) this._addUserBubble(val2, true);
                break;
            }
            case 'slider': {
                var val3 = this.answers[step.variable];
                if (val3 !== undefined) this._addUserBubble(String(val3), true);
                break;
            }
            case 'choice': {
                var val4 = this.answers[step.variable];
                if (val4) {
                    if (step.multiple && Array.isArray(val4)) {
                        var labels = val4.map(function(id) {
                            var opt = step.options.find(function(o) { return o.id === id; });
                            return opt ? opt.label : id;
                        });
                        this._addUserBubble(labels.join(', '), true);
                    } else {
                        var opt = step.options.find(function(o) { return o.id === val4; });
                        this._addUserBubble(opt ? opt.label : val4, true);
                    }
                }
                break;
            }
            case 'rating': {
                var val5 = this.answers[step.variable];
                if (val5) this._addUserBubble(val5 + '/' + (step.max || 10), true);
                break;
            }
            case 'file_input': {
                var val6 = this.answers[step.variable];
                if (val6) this._addUserBubble(val6.name || 'Fichier envoy\u00e9', true);
                break;
            }
            case 'narrative': {
                var nContent = step.content;
                var nLines = Array.isArray(nContent) ? nContent : [nContent];
                for (var ni = 0; ni < nLines.length; ni++) {
                    var nText = this._interpolate(typeof nLines[ni] === 'string' ? nLines[ni] : (nLines[ni].text || ''));
                    this._addNarrativeBubble(nText, step.mood, true);
                }
                break;
            }
            case 'completion':
                break;
        }
    },


    /* ══════════════════════════════════
       STEP PROCESSING + SKIP LOGIC
    ══════════════════════════════════ */

    async _processStep() {
        if (this.isProcessing) return;
        if (this.currentStep >= this.form.steps.length) return;

        this.isProcessing = true;
        var step = this.form.steps[this.currentStep];

        // [3.1] Evaluate skip logic condition
        if (step.condition && !this._evaluateCondition(step.condition)) {
            this.currentStep++;
            this.isProcessing = false;
            this._processStep();
            return;
        }

        switch (step.type) {
            case 'message':
                await this._handleMessage(step);
                this.currentStep++;
                this.isProcessing = false;
                this._processStep();
                break;

            case 'image':
                await this._handleImage(step);
                this.currentStep++;
                this.isProcessing = false;
                this._processStep();
                break;

            case 'section':
                await this._handleSection(step);
                this.currentStep++;
                this.isProcessing = false;
                this._processStep();
                break;

            case 'text_input':
                this._currentParts = [];
                this._pushHistory(step);
                await this._showTypingThenInput(step);
                this._showTextInput(step);
                this.isProcessing = false;
                break;

            case 'email_input':
                this._pushHistory(step);
                await this._showTypingThenInput(step);
                this._showEmailInput(step);
                this.isProcessing = false;
                break;

            case 'phone_input':
                this._pushHistory(step);
                await this._showTypingThenInput(step);
                this._showPhoneInput(step);
                this.isProcessing = false;
                break;

            case 'choice':
                this._pushHistory(step);
                await this._handleChoice(step);
                this.completedInteractive++;
                this._updateProgress();
                this.currentStep++;
                this.isProcessing = false;
                this._processStep();
                break;

            case 'rating':
                this._pushHistory(step);
                await this._handleRating(step);
                this.completedInteractive++;
                this._updateProgress();
                this.currentStep++;
                this.isProcessing = false;
                this._processStep();
                break;

            case 'date_input':
                this._pushHistory(step);
                await this._showTypingThenInput(step);
                this._showDateInput(step);
                this.isProcessing = false;
                break;

            case 'slider':
                this._pushHistory(step);
                await this._handleSlider(step);
                this.completedInteractive++;
                this._updateProgress();
                this.currentStep++;
                this.isProcessing = false;
                this._processStep();
                break;

            case 'file_input':
                this._pushHistory(step);
                await this._showTypingThenInput(step);
                this._showFileInput(step);
                this.isProcessing = false;
                break;

            case 'narrative':
                await this._handleNarrative(step);
                this.currentStep++;
                this.isProcessing = false;
                this._processStep();
                break;

            case 'completion':
                await this._handleCompletion(step);
                this.isProcessing = false;
                break;

            default:
                this.currentStep++;
                this.isProcessing = false;
                this._processStep();
        }
    },

    /* ─── [3.1] Evaluate condition ─── */
    _evaluateCondition(condition) {
        if (!condition) return true;

        // Compound conditions
        if (condition.and) {
            return condition.and.every(function(c) { return this._evaluateCondition(c); }.bind(this));
        }
        if (condition.or) {
            return condition.or.some(function(c) { return this._evaluateCondition(c); }.bind(this));
        }

        var val = this.variables[condition.variable];

        if (condition.equals !== undefined) return val === condition.equals;
        if (condition.notEquals !== undefined) return val !== condition.notEquals;
        if (condition.exists !== undefined) return condition.exists ? (val !== undefined && val !== null && val !== '') : (val === undefined || val === null || val === '');
        if (condition.in !== undefined) return Array.isArray(condition.in) && condition.in.includes(val);
        if (condition.notIn !== undefined) return !Array.isArray(condition.notIn) || !condition.notIn.includes(val);
        if (condition.gt !== undefined) return Number(val) > Number(condition.gt);
        if (condition.lt !== undefined) return Number(val) < Number(condition.lt);

        return true;
    },


    /* ══════════════════════════════════
       STEP HANDLERS
    ══════════════════════════════════ */

    async _handleMessage(step) {
        var text = this._renderContent(step.content);
        var delay = this._calcDelay(text);
        await this._showTyping(delay);
        this._addBotBubble(text);
        this._scrollToBottom();
        await this._wait(200);
    },

    async _handleImage(step) {
        await this._showTyping(800);
        this._addImageBubble(step);
        this._scrollToBottom();
        await this._wait(400);
    },

    async _handleSection(step) {
        await this._wait(600);
        this._addSection(step.title);
        this._scrollToBottom();
        await this._wait(300);
    },

    /* ─── [1.5] Handle: narrative (immersive text) ─── */
    async _handleNarrative(step) {
        var content = step.content;
        var lines = Array.isArray(content) ? content : [content];
        var betweenDelay = (this.form.timing && this.form.timing.betweenBubbles) || 1200;

        for (var i = 0; i < lines.length; i++) {
            var text = this._interpolate(typeof lines[i] === 'string' ? lines[i] : (lines[i].text || ''));
            var delay = this._calcDelay(this._escapeHtml(text));
            // Narrative gets 50% more typing delay for immersion
            await this._showTyping(Math.min(delay * 1.5, 3000));
            this._addNarrativeBubble(text, step.mood);
            this._scrollToBottom();
            if (i < lines.length - 1) {
                await this._wait(betweenDelay);
            }
        }
        await this._wait(400);
    },

    /* ─── Add Narrative Bubble ─── */
    _addNarrativeBubble(text, mood, instant) {
        var msg = document.createElement('div');
        msg.className = 'chat-msg bot' + (instant ? ' instant' : '');

        msg.appendChild(this._createAvatarNode());

        var bubble = document.createElement('div');
        bubble.className = 'chat-bubble chat-bubble-narrative';
        if (mood) bubble.setAttribute('data-mood', mood);
        bubble.textContent = text;
        msg.appendChild(bubble);

        this.els.messagesInner.appendChild(msg);
        if (!instant) this._scrollToBottom();
    },

    /* ─── Handle: choice (with keyboard nav + "Other" option) ─── */
    async _handleChoice(step) {
        this._hideInput();
        var container = document.createElement('div');
        container.className = 'chat-choices';
        container.style.padding = '8px 0';

        // Build full options list (add "Other" if step.allowOther)
        var allOptions = step.options.slice();
        if (step.allowOther) {
            allOptions.push({ id: 'other', label: 'Autre (pr\u00e9ciser)', isOther: true });
        }

        if (step.multiple) {
            var selected = new Set();

            allOptions.forEach(function(opt, i) {
                var btn = document.createElement('button');
                btn.className = 'chat-choice-btn';
                btn.textContent = opt.label;
                btn.type = 'button';
                // [2.3] Keyboard nav
                btn.setAttribute('role', 'checkbox');
                btn.setAttribute('aria-checked', 'false');
                btn.tabIndex = i === 0 ? 0 : -1;

                btn.addEventListener('click', function() {
                    if (selected.has(opt.id)) {
                        selected.delete(opt.id);
                        btn.classList.remove('selected');
                        btn.setAttribute('aria-checked', 'false');
                    } else {
                        selected.add(opt.id);
                        btn.classList.add('selected');
                        btn.setAttribute('aria-checked', 'true');
                    }
                    confirmBtn.disabled = selected.size === 0;
                });

                container.appendChild(btn);
                setTimeout(function() { btn.classList.add('visible'); }, 50 * (i + 1));
            });

            var confirmBtn = document.createElement('button');
            confirmBtn.className = 'chat-multi-confirm';
            confirmBtn.textContent = 'Valider ma s\u00e9lection';
            confirmBtn.type = 'button';
            confirmBtn.disabled = true;
            container.appendChild(confirmBtn);
            setTimeout(function() { confirmBtn.classList.add('visible'); }, 50 * (allOptions.length + 1));

            this.els.messagesInner.appendChild(container);
            this._scrollToBottom();
            this._setupChoiceKeyboard(container);

            await new Promise(function(resolve) {
                confirmBtn.addEventListener('click', function() {
                    var values = Array.from(selected);
                    var labels = values.map(function(id) {
                        var opt = allOptions.find(function(o) { return o.id === id; });
                        return opt ? opt.label : id;
                    });
                    container.remove();
                    this._addUserBubble(labels.join(', '));
                    this._recordAnswer(step.variable, values);
                    resolve();
                }.bind(this));
            }.bind(this));
        } else {
            // Single-select
            allOptions.forEach(function(opt, i) {
                var btn = document.createElement('button');
                btn.className = 'chat-choice-btn';
                btn.textContent = opt.label;
                btn.type = 'button';
                // [2.3] Keyboard nav
                btn.setAttribute('role', 'radio');
                btn.tabIndex = i === 0 ? 0 : -1;
                container.appendChild(btn);
                setTimeout(function() { btn.classList.add('visible'); }, 50 * (i + 1));
            });

            // [2.3] ARIA
            container.setAttribute('role', 'radiogroup');

            this.els.messagesInner.appendChild(container);
            this._scrollToBottom();
            this._setupChoiceKeyboard(container);

            await new Promise(function(resolve) {
                var buttons = container.querySelectorAll('.chat-choice-btn');
                buttons.forEach(function(btn, i) {
                    btn.addEventListener('click', function() {
                        var opt = allOptions[i];
                        // [2.6] "Other" option
                        if (opt.isOther) {
                            this._handleOtherOption(container, step, allOptions, resolve);
                            return;
                        }
                        btn.classList.add('selected');
                        container.remove();
                        this._addUserBubble(opt.label);
                        this._recordAnswer(step.variable, opt.id);
                        resolve();
                    }.bind(this));
                }.bind(this));
            }.bind(this));
        }
    },

    /* ─── [2.6] Handle "Other" option ─── */
    _handleOtherOption(container, step, allOptions, resolve) {
        container.remove();
        this._addUserBubble('Autre (pr\u00e9ciser)');

        // Show text input for custom answer
        this._hideInput();
        var wrap = document.createElement('div');
        wrap.className = 'chat-text-input-wrap';
        var input = document.createElement('input');
        input.type = 'text';
        input.className = 'chat-text-input';
        input.placeholder = 'Pr\u00e9cise ta r\u00e9ponse...';
        wrap.appendChild(input);

        var sendBtn = document.createElement('button');
        sendBtn.className = 'chat-send-btn';
        sendBtn.type = 'button';
        sendBtn.disabled = true;
        sendBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>';
        wrap.appendChild(sendBtn);

        this.els.inputInner.appendChild(wrap);
        this._showInput();

        input.addEventListener('input', function() {
            sendBtn.disabled = !input.value.trim();
        });

        var submit = function() {
            var val = input.value.trim();
            if (!val) return;
            this._hideInput();
            this._addUserBubble(val);
            this._recordAnswer(step.variable, 'other');
            this._recordAnswer(step.variable + '_detail', val);
            resolve();
        }.bind(this);

        sendBtn.addEventListener('click', submit);
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') { e.preventDefault(); submit(); }
        });

        setTimeout(function() { input.focus(); }, 100);
    },

    /* ─── [2.3] Keyboard navigation for choices ─── */
    _setupChoiceKeyboard(container) {
        var buttons = container.querySelectorAll('.chat-choice-btn');
        if (buttons.length === 0) return;

        // Auto-focus first button
        setTimeout(function() { buttons[0].focus(); }, 200);

        container.addEventListener('keydown', function(e) {
            var current = document.activeElement;
            var idx = Array.from(buttons).indexOf(current);
            if (idx === -1) return;

            var next = -1;
            if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                next = (idx + 1) % buttons.length;
            } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                next = (idx - 1 + buttons.length) % buttons.length;
            } else if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                current.click();
                return;
            }

            if (next >= 0) {
                e.preventDefault();
                buttons[idx].tabIndex = -1;
                buttons[next].tabIndex = 0;
                buttons[next].focus();
            }
        });
    },

    /* ─── Handle: rating (with keyboard nav) ─── */
    async _handleRating(step) {
        this._hideInput();
        var container = document.createElement('div');
        container.className = 'chat-rating';
        container.style.padding = '8px 0';

        var labels = document.createElement('div');
        labels.className = 'chat-rating-labels';
        var leftSpan = document.createElement('span');
        leftSpan.textContent = step.leftLabel || '1';
        var rightSpan = document.createElement('span');
        rightSpan.textContent = step.rightLabel || String(step.max || 10);
        labels.appendChild(leftSpan);
        labels.appendChild(rightSpan);
        container.appendChild(labels);

        var pills = document.createElement('div');
        pills.className = 'chat-rating-pills';
        pills.setAttribute('role', 'radiogroup');
        var max = step.max || 10;

        for (var i = 1; i <= max; i++) {
            var pill = document.createElement('button');
            pill.className = 'chat-rating-pill';
            pill.textContent = i;
            pill.type = 'button';
            pill.setAttribute('role', 'radio');
            pill.tabIndex = i === 1 ? 0 : -1;
            pills.appendChild(pill);
            (function(p, idx) {
                setTimeout(function() { p.classList.add('visible'); }, 40 * idx);
            })(pill, i);
        }

        container.appendChild(pills);
        this.els.messagesInner.appendChild(container);
        this._scrollToBottom();

        // Auto-focus first pill
        var allPills = pills.querySelectorAll('.chat-rating-pill');
        setTimeout(function() { if (allPills[0]) allPills[0].focus(); }, 300);

        // Keyboard nav
        pills.addEventListener('keydown', function(e) {
            var current = document.activeElement;
            var idx = Array.from(allPills).indexOf(current);
            if (idx === -1) return;

            var next = -1;
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = Math.min(idx + 1, allPills.length - 1);
            else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = Math.max(idx - 1, 0);
            else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); current.click(); return; }

            if (next >= 0 && next !== idx) {
                e.preventDefault();
                allPills[idx].tabIndex = -1;
                allPills[next].tabIndex = 0;
                allPills[next].focus();
            }
        });

        await new Promise(function(resolve) {
            allPills.forEach(function(pill) {
                pill.addEventListener('click', function() {
                    var val = parseInt(pill.textContent, 10);
                    container.remove();
                    this._addUserBubble(val + '/' + max);
                    this._recordAnswer(step.variable, val);
                    resolve();
                }.bind(this));
            }.bind(this));
        }.bind(this));
    },

    /* ─── [3.2] Handle: date_input ─── */
    _showDateInput(step) {
        this._hideInput();
        var wrap = document.createElement('div');
        wrap.className = 'chat-text-input-wrap';

        var input = document.createElement('input');
        input.type = 'date';
        input.className = 'chat-text-input';
        input.id = 'chat-input-field';
        if (step.min) input.min = step.min;
        if (step.max) input.max = step.max;
        wrap.appendChild(input);

        var sendBtn = document.createElement('button');
        sendBtn.className = 'chat-send-btn';
        sendBtn.type = 'button';
        sendBtn.disabled = true;
        sendBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>';
        wrap.appendChild(sendBtn);

        this.els.inputInner.appendChild(wrap);
        this._showInput();

        input.addEventListener('input', function() {
            sendBtn.disabled = !input.value;
        });

        var submit = function() {
            var val = input.value;
            if (!val) return;
            this._hideInput();
            this._addUserBubble(val);
            this._recordAnswer(step.variable, val);
            this.completedInteractive++;
            this._updateProgress();
            this.currentStep++;
            this._processStep();
        }.bind(this);

        sendBtn.addEventListener('click', submit);
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') { e.preventDefault(); submit(); }
        });

        setTimeout(function() { input.focus(); }, 100);
    },

    /* ─── [3.2] Handle: slider ─── */
    async _handleSlider(step) {
        this._hideInput();
        var container = document.createElement('div');
        container.className = 'chat-slider-wrap';
        container.style.padding = '8px 0';

        var labels = document.createElement('div');
        labels.className = 'chat-rating-labels';
        var leftSpan = document.createElement('span');
        leftSpan.textContent = step.leftLabel || String(step.min || 0);
        var rightSpan = document.createElement('span');
        rightSpan.textContent = step.rightLabel || String(step.max || 100);
        labels.appendChild(leftSpan);
        labels.appendChild(rightSpan);
        container.appendChild(labels);

        var sliderRow = document.createElement('div');
        sliderRow.className = 'chat-slider-row';

        var slider = document.createElement('input');
        slider.type = 'range';
        slider.className = 'chat-slider';
        slider.min = step.min || 0;
        slider.max = step.max || 100;
        slider.step = step.step || 1;
        slider.value = step.default || Math.floor(((step.max || 100) - (step.min || 0)) / 2);
        sliderRow.appendChild(slider);

        var valueDisplay = document.createElement('span');
        valueDisplay.className = 'chat-slider-value';
        valueDisplay.textContent = slider.value;
        sliderRow.appendChild(valueDisplay);

        container.appendChild(sliderRow);

        var confirmBtn = document.createElement('button');
        confirmBtn.className = 'chat-multi-confirm visible';
        confirmBtn.textContent = 'Valider';
        confirmBtn.type = 'button';
        container.appendChild(confirmBtn);

        this.els.messagesInner.appendChild(container);
        this._scrollToBottom();

        slider.addEventListener('input', function() {
            valueDisplay.textContent = slider.value;
        });

        await new Promise(function(resolve) {
            confirmBtn.addEventListener('click', function() {
                var val = Number(slider.value);
                container.remove();
                this._addUserBubble(String(val));
                this._recordAnswer(step.variable, val);
                resolve();
            }.bind(this));
        }.bind(this));
    },

    /* ─── [3.3] Handle: file_input ─── */
    _showFileInput(step) {
        this._hideInput();
        var self = this;
        var accept = step.accept || 'image/*,.pdf';
        var maxSize = step.maxSize || 10 * 1024 * 1024; // 10MB default

        var wrap = document.createElement('div');
        wrap.className = 'chat-file-input-wrap';

        // Drop zone
        var dropZone = document.createElement('div');
        dropZone.className = 'chat-file-dropzone';
        dropZone.innerHTML =
            '<div class="chat-file-dropzone-icon">\uD83D\uDCC1</div>' +
            '<div class="chat-file-dropzone-text">Glisse un fichier ici<br>ou clique pour choisir</div>' +
            '<div class="chat-file-dropzone-hint">' + this._escapeHtml(step.hint || 'Max 10 Mo \u00b7 Images, PDF') + '</div>';

        var fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = accept;
        fileInput.style.display = 'none';
        fileInput.id = 'chat-file-input';

        dropZone.appendChild(fileInput);
        wrap.appendChild(dropZone);

        // Preview area (hidden initially)
        var preview = document.createElement('div');
        preview.className = 'chat-file-preview';
        preview.style.display = 'none';
        wrap.appendChild(preview);

        // Send button (hidden initially)
        var sendBtn = document.createElement('button');
        sendBtn.className = 'chat-send-btn chat-file-send';
        sendBtn.type = 'button';
        sendBtn.style.display = 'none';
        sendBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> Envoyer';
        wrap.appendChild(sendBtn);

        this.els.inputInner.appendChild(wrap);
        this._showInput();

        var selectedFile = null;

        // Click to select
        dropZone.addEventListener('click', function(e) {
            if (e.target === fileInput) return;
            fileInput.click();
        });

        // Drag events
        dropZone.addEventListener('dragover', function(e) {
            e.preventDefault();
            dropZone.classList.add('dragover');
        });
        dropZone.addEventListener('dragleave', function() {
            dropZone.classList.remove('dragover');
        });
        dropZone.addEventListener('drop', function(e) {
            e.preventDefault();
            dropZone.classList.remove('dragover');
            if (e.dataTransfer.files.length > 0) {
                handleFile(e.dataTransfer.files[0]);
            }
        });

        // File input change
        fileInput.addEventListener('change', function() {
            if (fileInput.files.length > 0) {
                handleFile(fileInput.files[0]);
            }
        });

        function handleFile(file) {
            // Validate size
            if (file.size > maxSize) {
                self._showToast('Fichier trop volumineux (max ' + Math.round(maxSize / 1024 / 1024) + ' Mo)');
                return;
            }

            selectedFile = file;
            dropZone.style.display = 'none';
            preview.style.display = 'flex';
            sendBtn.style.display = 'inline-flex';

            // Show preview
            preview.textContent = '';
            if (file.type.startsWith('image/')) {
                var img = document.createElement('img');
                img.className = 'chat-file-preview-img';
                img.src = URL.createObjectURL(file);
                preview.appendChild(img);
            } else {
                var icon = document.createElement('div');
                icon.className = 'chat-file-preview-icon';
                icon.textContent = '\uD83D\uDCC4';
                preview.appendChild(icon);
            }
            var info = document.createElement('div');
            info.className = 'chat-file-preview-info';
            var nameEl = document.createElement('div');
            nameEl.className = 'chat-file-preview-name';
            nameEl.textContent = file.name;
            info.appendChild(nameEl);
            var sizeEl = document.createElement('div');
            sizeEl.className = 'chat-file-preview-size';
            sizeEl.textContent = (file.size / 1024).toFixed(1) + ' Ko';
            info.appendChild(sizeEl);
            preview.appendChild(info);

            var removeBtn = document.createElement('button');
            removeBtn.className = 'chat-file-remove';
            removeBtn.type = 'button';
            removeBtn.textContent = '\u2715';
            removeBtn.addEventListener('click', function() {
                selectedFile = null;
                preview.style.display = 'none';
                sendBtn.style.display = 'none';
                dropZone.style.display = 'flex';
                fileInput.value = '';
            });
            preview.appendChild(removeBtn);
        }

        // Send
        sendBtn.addEventListener('click', function() {
            if (!selectedFile) return;
            sendBtn.disabled = true;
            sendBtn.textContent = 'Envoi...';
            self._uploadFile(selectedFile, step);
        });
    },

    async _uploadFile(file, step) {
        var formId = this.form ? this.form.id : 'unknown';
        var safeTel = (this._tel || 'anon').replace(/[^a-zA-Z0-9]/g, '');
        var ts = Date.now();
        var ext = file.name.split('.').pop() || 'bin';
        var path = formId + '_' + safeTel + '/' + ts + '_' + step.variable + '.' + ext;

        try {
            if (typeof sb === 'undefined') throw new Error('Supabase not loaded');

            var result = await sb.storage.from('form-files').upload(path, file, {
                contentType: file.type,
                upsert: false
            });

            if (result.error) throw new Error(result.error.message);

            var urlResult = sb.storage.from('form-files').getPublicUrl(path);
            var publicUrl = urlResult.data.publicUrl;

            this._hideInput();
            this._addUserBubble(file.name + ' \u2705');
            this._recordAnswer(step.variable, { name: file.name, url: publicUrl, size: file.size, type: file.type });
            this.completedInteractive++;
            this._updateProgress();
            this.currentStep++;
            this._processStep();

        } catch (err) {
            console.error('File upload error:', err);
            this._showToast('Erreur lors de l\u2019envoi du fichier. R\u00e9essaie.');
            // Re-enable send button
            var btn = this.els.inputInner.querySelector('.chat-file-send');
            if (btn) {
                btn.disabled = false;
                btn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> Envoyer';
            }
        }
    },

    /* ─── Handle: completion ─── */
    async _handleCompletion(step) {
        // [1.5D] Save to server FIRST, only clear local if successful
        var serverSaved = false;
        if (this._tel && this._code && typeof ChatPersistence !== 'undefined') {
            serverSaved = await ChatPersistence.completeOnServer(this._tel, this._code, this.form.id, this.answers);
        }

        if (serverSaved) {
            // Server confirmed — safe to clear in-progress and mark completed locally
            this._clearLocal();
            this._saveLocal('completed');
        } else {
            // Server save failed — keep in-progress state so user can retry
            this._showToast('Tes r\u00e9ponses sont sauvegard\u00e9es localement. La synchronisation sera r\u00e9essay\u00e9e.');
        }

        // Update progress to 100%
        this.completedInteractive = this.totalInteractive;
        this._updateProgress();

        // Signal completion to Flutter
        this._signalFlutter('formCompleted');

        // Build completion screen (safe DOM)
        var div = document.createElement('div');
        div.className = 'chat-completion';

        var iconDiv = document.createElement('div');
        iconDiv.className = 'chat-completion-icon';
        iconDiv.textContent = step.icon || this.form.icon || '\uD83C\uDF89';
        div.appendChild(iconDiv);

        var titleDiv = document.createElement('div');
        titleDiv.className = 'chat-completion-title';
        titleDiv.textContent = step.title || 'F\u00e9licitations !';
        div.appendChild(titleDiv);

        var textDiv = document.createElement('div');
        textDiv.className = 'chat-completion-text';
        textDiv.textContent = this._interpolate(step.message || '');
        div.appendChild(textDiv);

        var backBtn = document.createElement('button');
        backBtn.className = 'chat-completion-btn';
        backBtn.type = 'button';
        backBtn.textContent = 'Retour au dashboard \u2192';
        div.appendChild(backBtn);

        this.els.messagesInner.appendChild(div);
        this._scrollToBottom();

        backBtn.addEventListener('click', function() {
            if (window.FlutterBridge || window.parent !== window) {
                this._signalFlutter('close');
            } else {
                var dashUrl = 'dashboard-formulaires.html' +
                    (this._tel ? '?tel=' + encodeURIComponent(this._tel) + '&code=' + encodeURIComponent(this._code) : '');
                window.location.href = dashUrl;
            }
        }.bind(this));

        this._fireConfetti();
        this._hideInput();

        // Hide back button on completion
        if (this.els.backBtn) this.els.backBtn.style.display = 'none';
    },

    async _showTypingThenInput(_step) {
        await this._wait(200);
    },


    /* ══════════════════════════════════
       INPUT HANDLERS
    ══════════════════════════════════ */

    _showTextInput(step) {
        this._hideInput();
        var isLong = step.isLong;
        var isOptional = step.optional;
        var canRecord = this._canRecordAudio();

        var wrap = document.createElement('div');
        wrap.className = 'chat-text-input-wrap';

        var field;
        if (isLong) {
            field = document.createElement('textarea');
            field.className = 'chat-text-input long';
            field.rows = 3;
        } else {
            field = document.createElement('input');
            field.type = 'text';
            field.className = 'chat-text-input';
        }
        field.id = 'chat-input-field';
        field.placeholder = step.placeholder || '';
        wrap.appendChild(field);

        if (canRecord) {
            var micBtn = document.createElement('button');
            micBtn.className = 'chat-mic-btn';
            micBtn.id = 'chat-mic-btn';
            micBtn.type = 'button';
            micBtn.title = 'Enregistrer un message vocal';
            micBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>';
            wrap.appendChild(micBtn);
        }

        var sendBtn = document.createElement('button');
        sendBtn.className = 'chat-send-btn';
        sendBtn.id = 'chat-send-btn';
        sendBtn.type = 'button';
        sendBtn.disabled = !isOptional;
        sendBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>';
        wrap.appendChild(sendBtn);

        this.els.inputInner.appendChild(wrap);
        this._showInput();

        if (isLong) {
            field.addEventListener('input', function() {
                field.style.height = 'auto';
                field.style.height = Math.min(field.scrollHeight, 120) + 'px';
                sendBtn.disabled = !isOptional && !field.value.trim();
            });
        } else {
            field.addEventListener('input', function() {
                sendBtn.disabled = !isOptional && !field.value.trim();
            });
        }

        var submit = function() {
            var val = field.value.trim();
            if (!val && !isOptional) return;
            this._hideInput();
            this._addUserBubble(val || '(pass\u00e9)');
            this._currentParts.push({ type: 'text', content: val || '(pass\u00e9)', audioUrl: null });
            this._showAddMorePrompt(step.variable, step);
        }.bind(this);

        sendBtn.addEventListener('click', submit);
        field.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && !e.shiftKey && !isLong) {
                e.preventDefault();
                submit();
            }
            if (e.key === 'Enter' && e.ctrlKey && isLong) {
                e.preventDefault();
                submit();
            }
        });

        if (canRecord) {
            var micEl = document.getElementById('chat-mic-btn');
            if (micEl) {
                micEl.addEventListener('click', function() {
                    this._startRecording(step);
                }.bind(this));
            }
        }

        setTimeout(function() { field.focus(); }, 100);
    },

    _showEmailInput(step) {
        this._hideInput();

        var wrap = document.createElement('div');
        wrap.className = 'chat-text-input-wrap';

        var field = document.createElement('input');
        field.type = 'email';
        field.className = 'chat-email-input';
        field.id = 'chat-input-field';
        field.placeholder = step.placeholder || 'ton.email@exemple.com';
        wrap.appendChild(field);

        var sendBtn = document.createElement('button');
        sendBtn.className = 'chat-send-btn';
        sendBtn.type = 'button';
        sendBtn.disabled = true;
        sendBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>';
        wrap.appendChild(sendBtn);

        this.els.inputInner.appendChild(wrap);

        var errorEl = document.createElement('div');
        errorEl.className = 'chat-input-error';
        errorEl.id = 'chat-input-error';
        errorEl.textContent = 'Adresse email invalide';
        this.els.inputInner.appendChild(errorEl);

        this._showInput();

        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        field.addEventListener('input', function() {
            var val = field.value.trim();
            sendBtn.disabled = !emailRegex.test(val);
            errorEl.classList.remove('visible');
        });

        var submit = function() {
            var val = field.value.trim();
            if (!emailRegex.test(val)) {
                errorEl.classList.add('visible');
                return;
            }
            this._hideInput();
            this._addUserBubble(val);
            this._recordAnswer(step.variable, val);
            this.completedInteractive++;
            this._updateProgress();
            this.currentStep++;
            this._processStep();
        }.bind(this);

        sendBtn.addEventListener('click', submit);
        field.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') { e.preventDefault(); submit(); }
        });

        setTimeout(function() { field.focus(); }, 100);
    },

    /* ─── Phone Input (extended prefixes) ─── */
    _showPhoneInput(step) {
        this._hideInput();

        var wrap = document.createElement('div');
        wrap.className = 'chat-text-input-wrap';

        var phoneWrap = document.createElement('div');
        phoneWrap.className = 'chat-phone-wrap';

        var select = document.createElement('select');
        select.className = 'chat-phone-prefix';
        select.id = 'chat-phone-prefix';

        // [2.4] Extended prefix list
        this.PHONE_PREFIXES.forEach(function(p) {
            var option = document.createElement('option');
            option.value = p.code;
            option.textContent = p.flag + ' ' + p.code;
            select.appendChild(option);
        });
        phoneWrap.appendChild(select);

        var field = document.createElement('input');
        field.type = 'tel';
        field.className = 'chat-phone-input';
        field.id = 'chat-input-field';
        field.placeholder = step.placeholder || '06 12 34 56 78';
        phoneWrap.appendChild(field);

        wrap.appendChild(phoneWrap);

        var sendBtn = document.createElement('button');
        sendBtn.className = 'chat-send-btn';
        sendBtn.type = 'button';
        sendBtn.disabled = true;
        sendBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>';
        wrap.appendChild(sendBtn);

        this.els.inputInner.appendChild(wrap);

        var errorEl = document.createElement('div');
        errorEl.className = 'chat-input-error';
        errorEl.id = 'chat-input-error';
        errorEl.textContent = 'Num\u00e9ro de t\u00e9l\u00e9phone invalide';
        this.els.inputInner.appendChild(errorEl);

        this._showInput();

        // Set default prefix
        if (step.defaultPrefix) select.value = step.defaultPrefix;

        // Auto-detect prefix from navigator.language
        if (!step.defaultPrefix) {
            var lang = (navigator.language || '').toLowerCase();
            var langMap = { 'fr': '+33', 'ar-ma': '+212', 'ar-tn': '+216', 'ar-dz': '+213', 'nl-be': '+32', 'fr-be': '+32', 'de-ch': '+41', 'fr-ch': '+41', 'en-gb': '+44', 'en-us': '+1' };
            for (var key in langMap) {
                if (lang.startsWith(key)) { select.value = langMap[key]; break; }
            }
        }

        // Pre-fill from URL if variable is 'telephone'
        if (step.variable === 'telephone' && this._tel) {
            var tel = this._tel;
            for (var idx = 0; idx < this.PHONE_PREFIXES.length; idx++) {
                var p = this.PHONE_PREFIXES[idx].code;
                if (tel.startsWith(p)) {
                    select.value = p;
                    tel = tel.substring(p.length);
                    break;
                }
            }
            field.value = tel;
            sendBtn.disabled = tel.replace(/\s/g, '').length < 6;
        }

        field.addEventListener('input', function() {
            var digits = field.value.replace(/\s/g, '');
            sendBtn.disabled = digits.length < 6;
            errorEl.classList.remove('visible');
        });

        var submit = function() {
            var digits = field.value.replace(/\s/g, '');
            if (digits.length < 6) {
                errorEl.classList.add('visible');
                return;
            }
            var fullNum = select.value + digits;
            this._hideInput();
            this._addUserBubble(select.value + ' ' + field.value.trim());
            this._recordAnswer(step.variable, fullNum);
            this.completedInteractive++;
            this._updateProgress();
            this.currentStep++;
            this._processStep();
        }.bind(this);

        sendBtn.addEventListener('click', submit);
        field.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') { e.preventDefault(); submit(); }
        });

        setTimeout(function() { field.focus(); }, 100);
    },


    /* ══════════════════════════════════
       ANSWER RECORDING + PERSISTENCE
    ══════════════════════════════════ */

    _recordAnswer(variable, value) {
        if (!variable) return;
        this.answers[variable] = value;
        this.variables[variable] = value;

        // Save to localStorage immediately
        this._saveLocal();

        // Debounced save to Supabase (via persistence layer)
        if (typeof ChatPersistence !== 'undefined') {
            ChatPersistence.scheduleSave();
        }
    },

    /* ─── Local persistence (delegates to ChatPersistence if available) ─── */
    _localKey() {
        return 'mm_chat_' + (this.form ? this.form.id : 'unknown');
    },

    _saveLocal(status) {
        var data = {
            formId: this.form.id,
            currentStep: this.currentStep,
            answers: this.answers,
            status: status || 'in_progress',
            version: this.form.version || 1,
            updatedAt: Date.now()
        };
        if (typeof ChatPersistence !== 'undefined') {
            ChatPersistence.saveLocal(this.form.id, data);
        } else {
            try {
                localStorage.setItem(this._localKey(), JSON.stringify(data));
            } catch (e) { /* quota exceeded */ }
        }
    },

    _loadLocal() {
        if (typeof ChatPersistence !== 'undefined') {
            return ChatPersistence.loadLocal(this.form ? this.form.id : 'unknown');
        }
        try {
            var raw = localStorage.getItem(this._localKey());
            if (!raw) return null;
            return JSON.parse(raw);
        } catch (e) { return null; }
    },

    _clearLocal() {
        if (typeof ChatPersistence !== 'undefined') {
            ChatPersistence.clearLocal(this.form.id);
        } else {
            try { localStorage.removeItem(this._localKey()); } catch (e) { /* ignore */ }
        }
    },

    /* ─── [1.5B] Pick best save by timestamp ─── */
    _pickBestSave(local, server, idb) {
        if (typeof ChatPersistence !== 'undefined') {
            return ChatPersistence.pickBestSave(local, server, idb);
        }
        // Fallback: compare by timestamp
        var candidates = [local, server, idb].filter(Boolean);
        if (candidates.length === 0) return null;
        if (candidates.length === 1) return candidates[0];
        candidates.sort(function(a, b) { return (b.updatedAt || 0) - (a.updatedAt || 0); });
        return candidates[0];
    },


    /* ══════════════════════════════════
       DOM RENDERING
    ══════════════════════════════════ */

    /* ─── Typing Indicator ─── */
    async _showTyping(duration) {
        var typing = document.createElement('div');
        typing.className = 'typing-indicator';
        typing.id = 'typing-indicator';

        typing.appendChild(this._createAvatarNode());

        var dots = document.createElement('div');
        dots.className = 'typing-dots';
        for (var i = 0; i < 3; i++) {
            var dot = document.createElement('div');
            dot.className = 'typing-dot';
            dots.appendChild(dot);
        }
        typing.appendChild(dots);

        this.els.messagesInner.appendChild(typing);
        this._scrollToBottom();
        await this._wait(duration);
        typing.remove();
    },

    /* ─── Add Bot Bubble ─── */
    _addBotBubble(html, instant) {
        var msg = document.createElement('div');
        msg.className = 'chat-msg bot' + (instant ? ' instant' : '');

        msg.appendChild(this._createAvatarNode());

        var bubble = document.createElement('div');
        bubble.className = 'chat-bubble';
        bubble.innerHTML = html; // Pre-escaped in _renderContent
        msg.appendChild(bubble);

        this.els.messagesInner.appendChild(msg);
        if (!instant) this._scrollToBottom();
    },

    /* ─── Add User Bubble ─── */
    _addUserBubble(text, instant) {
        var msg = document.createElement('div');
        msg.className = 'chat-msg user' + (instant ? ' instant' : '');

        var bubble = document.createElement('div');
        bubble.className = 'chat-bubble';
        bubble.textContent = text; // Safe: textContent, no XSS
        msg.appendChild(bubble);

        this.els.messagesInner.appendChild(msg);
        if (!instant) this._scrollToBottom();
    },

    /* ─── [1.2] Add Image Bubble (safe DOM, error handling) ─── */
    _addImageBubble(step, instant) {
        var url = typeof step === 'string' ? step : step.url;
        var alt = (typeof step === 'object' && step.alt) ? step.alt : '';

        var msg = document.createElement('div');
        msg.className = 'chat-msg bot' + (instant ? ' instant' : '');

        msg.appendChild(this._createAvatarNode());

        var imgWrap = document.createElement('div');
        imgWrap.className = 'chat-msg-image';

        // Skeleton loading
        var skeleton = document.createElement('div');
        skeleton.className = 'chat-img-loading';
        imgWrap.appendChild(skeleton);

        var img = document.createElement('img');
        img.alt = alt;
        img.loading = 'lazy';

        img.onload = function() {
            skeleton.remove();
            if (!instant) this._scrollToBottom();
        }.bind(this);

        img.onerror = function() {
            skeleton.remove();
            imgWrap.classList.add('chat-img-error');
            var fallback = document.createElement('div');
            fallback.className = 'chat-img-fallback';
            fallback.textContent = alt || 'Image indisponible';
            imgWrap.appendChild(fallback);
            img.style.display = 'none';
        };

        img.src = url;
        imgWrap.appendChild(img);
        msg.appendChild(imgWrap);

        this.els.messagesInner.appendChild(msg);
        if (!instant) this._scrollToBottom();
    },

    /* ─── Add Section ─── */
    _addSection(title, instant) {
        var div = document.createElement('div');
        div.className = 'chat-section' + (instant ? ' instant' : '');

        var line = document.createElement('div');
        line.className = 'chat-section-line';

        var span = document.createElement('span');
        span.className = 'chat-section-text';
        span.textContent = title; // Safe: textContent
        line.appendChild(span);

        div.appendChild(line);
        this.els.messagesInner.appendChild(div);
    },

    /* ─── Input Area Show/Hide ─── */
    _showInput() {
        this.els.inputArea.classList.add('visible');
        this._scrollToBottom();
    },

    _hideInput() {
        this.els.inputArea.classList.remove('visible');
        this.els.inputInner.textContent = '';
    },


    /* ══════════════════════════════════
       CONTENT RENDERING & UTILS
    ══════════════════════════════════ */

    _renderContent(content) {
        if (typeof content === 'string') {
            return this._escapeHtml(this._interpolate(content));
        }
        if (Array.isArray(content)) {
            return content.map(function(part) {
                var text = this._escapeHtml(this._interpolate(part.text || ''));
                if (part.bold) return '<strong>' + text + '</strong>';
                if (part.italic) return '<em>' + text + '</em>';
                return text;
            }.bind(this)).join('');
        }
        return '';
    },

    _interpolate(text) {
        var vars = this.variables;
        return text.replace(/\{\{(\w+)\}\}/g, function(match, key) {
            return vars[key] || match;
        });
    },

    _calcDelay(html) {
        var text = html.replace(/<[^>]+>/g, '');
        var words = text.split(/\s+/).length;
        var speed = (this.form.timing && this.form.timing.speed) || 55;
        var maxDelay = (this.form.timing && this.form.timing.maxDelay) || 2000;
        return Math.min(words * speed, maxDelay);
    },

    /* ─── [2.5] Progress with estimated time ─── */
    _updateProgress() {
        if (!this.els.progressFill || this.totalInteractive === 0) return;
        var pct = Math.round((this.completedInteractive / this.totalInteractive) * 100);
        this.els.progressFill.style.width = pct + '%';

        // Time estimate
        if (this.els.progressText) {
            var remaining = this.totalInteractive - this.completedInteractive;
            if (remaining > 0 && this.completedInteractive > 0) {
                var avgSec = 20; // ~20s per question average
                var mins = Math.ceil((remaining * avgSec) / 60);
                this.els.progressText.textContent = '~' + mins + ' min';
            } else if (remaining === 0) {
                this.els.progressText.textContent = '';
            }
        }
    },

    _scrollToBottom(smooth) {
        if (smooth === false) {
            this.els.messages.scrollTop = this.els.messages.scrollHeight;
        } else {
            requestAnimationFrame(function() {
                this.els.messages.scrollTo({
                    top: this.els.messages.scrollHeight,
                    behavior: 'smooth'
                });
            }.bind(this));
        }
    },

    _wait(ms) {
        return new Promise(function(resolve) { setTimeout(resolve, ms); });
    },

    _escapeHtml(text) {
        var div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },


    /* ══════════════════════════════════
       AUDIO RECORDING & TRANSCRIPTION
    ══════════════════════════════════ */

    _canRecordAudio() {
        return typeof MediaRecorder !== 'undefined' &&
               navigator.mediaDevices &&
               typeof navigator.mediaDevices.getUserMedia === 'function';
    },

    _getAudioMimeType() {
        var types = ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4', 'audio/ogg'];
        for (var i = 0; i < types.length; i++) {
            if (MediaRecorder.isTypeSupported(types[i])) return types[i];
        }
        return 'audio/webm';
    },

    _getAudioExtension(mime) {
        if (mime.includes('mp4')) return 'mp4';
        if (mime.includes('ogg')) return 'ogg';
        return 'webm';
    },

    async _startRecording(step) {
        try {
            var stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            this._audioStream = stream;
            this._isRecording = true;
            this._updateBackButton();

            var mime = this._getAudioMimeType();
            this._mediaRecorder = new MediaRecorder(stream, {
                mimeType: mime,
                audioBitsPerSecond: 24000
            });
            this._audioChunks = [];

            this._mediaRecorder.ondataavailable = function(e) {
                if (e.data.size > 0) this._audioChunks.push(e.data);
            }.bind(this);

            this._mediaRecorder.onstop = function() {
                var blob = new Blob(this._audioChunks, { type: mime });
                var duration = Date.now() - this._recordingStart;
                clearInterval(this._recordingTimer);
                this._stopStream();
                this._isRecording = false;
                this._updateBackButton();

                // [1.2] If tab was hidden, save blob to IDB instead of showing preview
                if (this._pendingVisibilityBlob) {
                    this._pendingVisibilityBlob = false;
                    if (typeof ChatPersistence !== 'undefined' && this.form) {
                        ChatPersistence.savePendingAudio(this.form.id, step.variable, blob, duration);
                    }
                    return;
                }

                var durationSec = duration / 1000;
                if (durationSec < 1) {
                    this._showTextInput(step);
                    this._showRecordingError('Enregistrement trop court (min 1s)');
                    return;
                }
                this._renderAudioPreview(blob, durationSec, step, mime);
            }.bind(this);

            this._mediaRecorder.start(250);
            this._recordingStart = Date.now();
            this._renderRecordingUI(step);

        } catch (err) {
            console.warn('Microphone error:', err);
            this._isRecording = false;
            this._updateBackButton();
            this._showRecordingError('Micro non disponible');
        }
    },

    _stopStream() {
        if (this._audioStream) {
            this._audioStream.getTracks().forEach(function(t) { t.stop(); });
            this._audioStream = null;
        }
    },

    _stopRecording() {
        if (this._mediaRecorder && this._mediaRecorder.state === 'recording') {
            this._mediaRecorder.stop();
        }
        clearInterval(this._recordingTimer);
    },

    _renderRecordingUI(step) {
        this._hideInput();
        var html =
            '<div class="chat-text-input-wrap">' +
                '<div class="chat-recording-bar">' +
                    '<div class="chat-recording-dot"></div>' +
                    '<span class="chat-recording-timer" id="rec-timer">0:00</span>' +
                    '<div class="chat-recording-progress"><div class="chat-recording-progress-fill" id="rec-progress"></div></div>' +
                    '<span class="chat-recording-max">5:00</span>' +
                '</div>' +
                '<button class="chat-stop-btn" id="chat-stop-btn" type="button" title="Arr\u00eater l\'enregistrement">' +
                    '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="6" width="12" height="12" rx="2"/></svg>' +
                '</button>' +
            '</div>';

        this.els.inputInner.innerHTML = html;
        this._showInput();

        var timerEl = document.getElementById('rec-timer');
        var progressEl = document.getElementById('rec-progress');
        var stopBtn = document.getElementById('chat-stop-btn');

        this._recordingTimer = setInterval(function() {
            var elapsed = (Date.now() - this._recordingStart) / 1000;
            var mins = Math.floor(elapsed / 60);
            var secs = Math.floor(elapsed % 60);
            timerEl.textContent = mins + ':' + (secs < 10 ? '0' : '') + secs;
            progressEl.style.width = Math.min((elapsed / this._MAX_RECORD_SEC) * 100, 100) + '%';
            if (elapsed >= this._MAX_RECORD_SEC) {
                this._stopRecording();
            }
        }.bind(this), 500);

        stopBtn.addEventListener('click', function() { this._stopRecording(); }.bind(this));
    },

    _renderAudioPreview(blob, duration, step, mime) {
        this._hideInput();
        var audioUrl = URL.createObjectURL(blob);
        var mins = Math.floor(duration / 60);
        var secs = Math.floor(duration % 60);
        var durStr = mins + ':' + (secs < 10 ? '0' : '') + secs;

        var html =
            '<div class="chat-text-input-wrap">' +
                '<div class="chat-audio-preview">' +
                    '<button class="chat-audio-play-btn" id="audio-play-btn" type="button" title="Lire">' +
                        '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>' +
                    '</button>' +
                    '<span class="chat-audio-duration">' + durStr + '</span>' +
                    '<div class="chat-audio-waveform" id="audio-waveform"></div>' +
                '</div>' +
                '<button class="chat-audio-delete-btn" id="audio-delete-btn" type="button" title="Supprimer">' +
                    '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>' +
                '</button>' +
                '<button class="chat-send-btn" id="audio-send-btn" type="button" title="Envoyer">' +
                    '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>' +
                '</button>' +
            '</div>';

        this.els.inputInner.innerHTML = html;
        this._showInput();

        var waveform = document.getElementById('audio-waveform');
        for (var i = 0; i < 20; i++) {
            var bar = document.createElement('div');
            bar.className = 'chat-audio-waveform-bar';
            bar.style.height = (4 + Math.random() * 16) + 'px';
            waveform.appendChild(bar);
        }

        var audio = new Audio(audioUrl);
        var playBtn = document.getElementById('audio-play-btn');
        var playing = false;
        playBtn.addEventListener('click', function() {
            if (playing) { audio.pause(); playing = false; playBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>'; }
            else { audio.play(); playing = true; playBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>'; }
        });
        audio.addEventListener('ended', function() { playing = false; playBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>'; });

        document.getElementById('audio-delete-btn').addEventListener('click', function() {
            audio.pause();
            URL.revokeObjectURL(audioUrl);
            this._showTextInput(step);
        }.bind(this));

        var sendBtn = document.getElementById('audio-send-btn');
        sendBtn.addEventListener('click', function() {
            sendBtn.disabled = true;
            audio.pause();
            URL.revokeObjectURL(audioUrl);
            this._handleAudioSubmit(blob, step.variable, step, mime);
        }.bind(this));
    },

    async _uploadAudio(blob, variable, index, mime) {
        var ext = this._getAudioExtension(mime);
        var formId = this.form ? this.form.id : 'unknown';
        var ts = Date.now();
        var safeTel = (this._tel || 'anon').replace(/[^a-zA-Z0-9]/g, '');
        var path = formId + '_' + safeTel + '/' + ts + '_' + variable + '_' + index + '.' + ext;

        var result = await sb.storage.from('form-audio').upload(path, blob, {
            contentType: mime,
            upsert: false
        });

        if (result.error) throw new Error('Upload failed: ' + result.error.message);

        var urlResult = sb.storage.from('form-audio').getPublicUrl(path);
        return { path: path, publicUrl: urlResult.data.publicUrl };
    },

    async _transcribeAudio(filePath) {
        var res = await fetch(this._EDGE_FN_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + SUPABASE_ANON_KEY
            },
            body: JSON.stringify({
                filePath: filePath,
                telephone: this._tel,
                code: this._code
            })
        });

        if (!res.ok) {
            var err = await res.json().catch(function() { return { error: 'Unknown error' }; });
            throw new Error(err.error || 'Transcription failed');
        }

        return await res.json();
    },

    async _handleAudioSubmit(blob, variable, step, mime) {
        this._hideInput();
        var index = this._currentParts.filter(function(p) { return p.type === 'audio'; }).length + 1;

        this._showProcessingMessage('Envoi en cours...');

        try {
            var uploadResult = await this._uploadAudio(blob, variable, index, mime);

            this._showProcessingMessage('Transcription en cours...');
            var transcription;
            try {
                transcription = await this._transcribeWithRetry(uploadResult.path);
            } catch (err) {
                console.warn('Transcription failed after retries:', err);
                transcription = '';
            }

            // Show transcription edit UI instead of directly adding bubble
            this._showTranscriptionEdit(transcription, uploadResult.publicUrl, variable, step);

        } catch (err) {
            console.error('Audio submit error:', err);
            this._hideInput();
            this._addBotBubble(this._escapeHtml('D\u00e9sol\u00e9, une erreur est survenue lors de l\'envoi. R\u00e9essaie.'));
            this._scrollToBottom();
            setTimeout(function() { this._showTextInput(step); }.bind(this), 600);
        }
    },

    /* ─── [1.1] Transcription editing UI ─── */
    _showTranscriptionEdit(transcription, audioUrl, variable, step) {
        this._hideInput();

        var container = document.createElement('div');
        container.className = 'chat-transcription-edit';

        // Mini audio player
        var player = document.createElement('div');
        player.className = 'chat-transcription-player';
        var audio = new Audio(audioUrl);
        var playBtn = document.createElement('button');
        playBtn.type = 'button';
        playBtn.className = 'chat-audio-play-btn';
        playBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>';
        player.appendChild(playBtn);

        var playerLabel = document.createElement('span');
        playerLabel.className = 'chat-audio-duration';
        playerLabel.textContent = 'Audio';
        player.appendChild(playerLabel);
        container.appendChild(player);

        var playing = false;
        playBtn.addEventListener('click', function() {
            if (playing) {
                audio.pause();
                playing = false;
                playBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>';
            } else {
                audio.play();
                playing = true;
                playBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>';
            }
        });
        audio.addEventListener('ended', function() {
            playing = false;
            playBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>';
        });

        // Warning if transcription failed
        if (!transcription) {
            var warning = document.createElement('div');
            warning.className = 'chat-transcription-warning';
            warning.textContent = 'La transcription automatique a \u00e9chou\u00e9. Tu peux \u00e9crire ta r\u00e9ponse manuellement.';
            warning.setAttribute('role', 'alert');
            container.appendChild(warning);
        }

        // Textarea
        var textarea = document.createElement('textarea');
        textarea.className = 'chat-transcription-textarea';
        textarea.value = transcription;
        textarea.placeholder = '\u00c9cris ou corrige ta r\u00e9ponse ici...';
        textarea.rows = 4;
        textarea.setAttribute('aria-label', 'Transcription \u00e0 v\u00e9rifier');
        container.appendChild(textarea);

        // Action buttons
        var actions = document.createElement('div');
        actions.className = 'chat-transcription-actions';

        var reRecordBtn = document.createElement('button');
        reRecordBtn.type = 'button';
        reRecordBtn.className = 'chat-resume-btn secondary';
        reRecordBtn.textContent = 'Re-enregistrer \uD83C\uDFA4';
        actions.appendChild(reRecordBtn);

        var validateBtn = document.createElement('button');
        validateBtn.type = 'button';
        validateBtn.className = 'chat-resume-btn primary';
        validateBtn.textContent = 'Valider \u2713';
        actions.appendChild(validateBtn);

        container.appendChild(actions);
        this.els.inputInner.appendChild(container);
        this._showInput();
        this._scrollToBottom();

        // Focus textarea
        setTimeout(function() { textarea.focus(); }, 100);

        // Validate: add bubble + push part + next
        var self = this;
        validateBtn.addEventListener('click', function() {
            var text = textarea.value.trim();
            if (!text) {
                self._showToast('Saisis une r\u00e9ponse avant de valider.');
                return;
            }
            audio.pause();
            self._hideInput();
            self._addUserBubble(text + ' \uD83C\uDFA4');
            self._currentParts.push({
                type: 'audio',
                content: text,
                audioUrl: audioUrl
            });
            self._showAddMorePrompt(variable, step);
        });

        // Re-record: remove container + start recording
        reRecordBtn.addEventListener('click', function() {
            audio.pause();
            self._hideInput();
            self._startRecording(step);
        });

        // Keyboard: Ctrl+Enter = validate
        textarea.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && e.ctrlKey) {
                e.preventDefault();
                validateBtn.click();
            }
        });
    },

    /* ─── [1.3] Transcription with retry + exponential backoff ─── */
    async _transcribeWithRetry(filePath, maxRetries) {
        if (maxRetries === undefined) maxRetries = 2;
        for (var attempt = 0; attempt <= maxRetries; attempt++) {
            try {
                var result = await this._transcribeAudio(filePath);
                return result.text || '';
            } catch (err) {
                if (attempt === maxRetries) throw err;
                await this._wait(1000 * Math.pow(2, attempt));
            }
        }
    },

    _showProcessingMessage(text) {
        this.els.inputInner.innerHTML =
            '<div class="chat-processing-msg">' +
                '<div class="chat-processing-dots"><span></span><span></span><span></span></div>' +
                '<span>' + this._escapeHtml(text) + '</span>' +
            '</div>';
        this._showInput();
        this._scrollToBottom();
    },

    async _showAddMorePrompt(variable, step) {
        this._hideInput();
        await this._wait(400);
        await this._showTyping(800);
        this._addBotBubble(this._escapeHtml('Merci ! Souhaites-tu compl\u00e9ter ta r\u00e9ponse ?'));
        this._scrollToBottom();

        var container = document.createElement('div');
        container.className = 'chat-choices';
        container.style.padding = '8px 0';

        var btnDone = document.createElement('button');
        btnDone.className = 'chat-choice-btn';
        btnDone.textContent = 'C\'est tout \u2713';
        btnDone.type = 'button';
        container.appendChild(btnDone);

        var btnAdd = document.createElement('button');
        btnAdd.className = 'chat-choice-btn';
        btnAdd.textContent = 'Ajouter quelque chose \uD83C\uDFA4';
        btnAdd.type = 'button';
        container.appendChild(btnAdd);

        this.els.messagesInner.appendChild(container);
        this._scrollToBottom();

        setTimeout(function() { btnDone.classList.add('visible'); }, 50);
        setTimeout(function() { btnAdd.classList.add('visible'); }, 100);

        var chosen = false;
        btnDone.addEventListener('click', function() {
            if (chosen) return;
            chosen = true;
            btnDone.classList.add('selected');
            container.remove();
            this._addUserBubble('C\'est tout \u2713');
            this._finalizeTextInput(variable, step);
        }.bind(this));

        btnAdd.addEventListener('click', function() {
            if (chosen) return;
            chosen = true;
            btnAdd.classList.add('selected');
            container.remove();
            this._addUserBubble('Ajouter quelque chose \uD83C\uDFA4');
            setTimeout(function() { this._showTextInput(step); }.bind(this), 300);
        }.bind(this));
    },

    _finalizeTextInput(variable, step) {
        var finalText = this._currentParts.map(function(p) { return p.content; }).join('\n\n');
        var audioUrls = this._currentParts.filter(function(p) { return p.audioUrl; }).map(function(p) { return p.audioUrl; });

        if (audioUrls.length > 0) {
            this.answers[variable + '_audio_urls'] = audioUrls;
        }
        this._recordAnswer(variable, finalText);
        this._currentParts = [];

        this.completedInteractive++;
        this._updateProgress();
        this.currentStep++;
        this._processStep();
    },

    _showRecordingError(msg) {
        var errorEl = document.createElement('div');
        errorEl.className = 'chat-input-error visible';
        errorEl.textContent = msg;
        errorEl.style.textAlign = 'center';
        this.els.inputInner.appendChild(errorEl);
        setTimeout(function() { errorEl.remove(); }, 3000);
    },

    _showError(msg) {
        document.body.classList.remove('chat-loading');
        document.body.classList.add('chat-ready');
        var el = document.getElementById('chat-messages-inner');
        if (el) {
            el.textContent = '';
            var div = document.createElement('div');
            div.style.cssText = 'text-align:center;padding:40px;color:#888';
            div.textContent = msg;
            el.appendChild(div);
        }
    },


    /* ══════════════════════════════════
       CONFETTI
    ══════════════════════════════════ */

    _fireConfetti() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        if (typeof confetti !== 'function') return;

        confetti({
            particleCount: 100,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#7c3aed', '#e8b4b8', '#7d9a8c', '#c9a962', '#A8D5BA']
        });

        var end = Date.now() + 2000;
        (function frame() {
            confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0 }, colors: ['#A8D5BA', '#6B8E7F', '#c9a962'] });
            confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1 }, colors: ['#A8D5BA', '#6B8E7F', '#c9a962'] });
            if (Date.now() < end) requestAnimationFrame(frame);
        }());
    }
};

/* ─── Boot ─── */
document.addEventListener('DOMContentLoaded', function() { ChatEngine.init(); });
