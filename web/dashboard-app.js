/* ═══════════════════════════════════════
   MY MUQABALA — DASHBOARD APP JS
   Shared across all dashboard pages
═══════════════════════════════════════ */

/* ─── Sidebar Toggle ─── */
function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('open');
    document.getElementById('overlay').classList.toggle('active');
}
function closeSidebar() {
    document.getElementById('sidebar').classList.remove('open');
    document.getElementById('overlay').classList.remove('active');
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSidebar(); });

/* ─── ProgressStore (localStorage, scoped by client) ─── */
const ProgressStore = {
    SCHEMA_VERSION: 1,

    _getKey() {
        const clientId = sessionStorage.getItem('mm_uuid') || sessionStorage.getItem('mm_telephone') || 'default';
        return 'mymuqabala_progress_' + clientId;
    },

    getStore() {
        try {
            const raw = localStorage.getItem(this._getKey());
            if (!raw) return this._default();
            const data = JSON.parse(raw);
            if (data._version !== this.SCHEMA_VERSION) return this._default();
            return data;
        } catch { return this._default(); }
    },

    _default() {
        return { _version: this.SCHEMA_VERSION, ressources: {}, formulaires: {}, cartographie: {} };
    },

    save(store) {
        try { localStorage.setItem(this._getKey(), JSON.stringify(store)); } catch {}
    },

    setItem(section, id, completed) {
        const store = this.getStore();
        if (!store[section]) store[section] = {};
        store[section][id] = completed;
        this.save(store);
    },

    getItem(section, id) {
        const store = this.getStore();
        return store[section] ? store[section][id] : false;
    },

    getStats(section) {
        const store = this.getStore();
        const items = store[section] || {};
        const keys = Object.keys(items);
        const completed = keys.filter(k => items[k] === true).length;
        return { completed, total: keys.length, percentage: keys.length ? Math.round((completed / keys.length) * 100) : 0 };
    }
};

/* ─── Checkbox Persistence + UI Update ─── */
function initCheckboxes() {
    const checkboxes = document.querySelectorAll('.check-item input[type="checkbox"]');
    checkboxes.forEach(cb => {
        const section = cb.dataset.section || 'ressources';
        const id = cb.dataset.id;
        if (!id) return;

        // Restore
        if (ProgressStore.getItem(section, id)) {
            cb.checked = true;
        }

        // Listen
        cb.addEventListener('change', () => {
            ProgressStore.setItem(section, id, cb.checked);
            if (cb.checked) celebrateCheck(cb);
            updateProgressUI(section);
            updateMonthBadges();
            scheduleProgressSave();
        });
    });

    // Explicit click handlers — bypass unreliable native label-input toggle
    // (hidden inputs + overflow:hidden cards break native label association)
    document.querySelectorAll('.check-item').forEach(label => {
        label.addEventListener('click', function(e) {
            if (e.target.tagName === 'INPUT') return;
            e.preventDefault();
            const input = this.querySelector('input[type="checkbox"]');
            if (!input || input.disabled) return;
            input.checked = !input.checked;
            input.dispatchEvent(new Event('change', { bubbles: true }));
        });
    });
}

/* ─── Confetti Celebrations ─── */
function celebrateCheck(element) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (typeof confetti !== 'function') return;

    // Find position from week-item (ressources) or form-card (formulaires) or label itself
    const anchor = element.closest('.week-item') || element.closest('.form-card') || element.closest('.check-item');
    const rect = anchor?.getBoundingClientRect();
    if (rect) {
        confetti({
            particleCount: 60, spread: 70, startVelocity: 25, decay: 0.92,
            origin: { x: (rect.left + rect.width / 2) / window.innerWidth, y: rect.top / window.innerHeight },
            colors: ['#7c3aed', '#e8b4b8', '#7d9a8c', '#c9a962', '#ffffff'],
            ticks: 120, gravity: 1.0, scalar: 0.9
        });
    }

    // Check if accordion group is complete (ressources months or formulaire accordions)
    const groupEl = element.closest('.month-content') || element.closest('.month-accordion');
    if (groupEl) {
        const allCbs = groupEl.querySelectorAll('input[type="checkbox"]');
        const allChecked = Array.from(allCbs).every(c => c.checked);
        if (allChecked && allCbs.length > 0) celebrateMilestone();
    }
}

function celebrateMilestone() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (typeof confetti !== 'function') return;

    // Side cannons
    const end = Date.now() + 1500;
    (function frame() {
        confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0 }, colors: ['#7c3aed', '#e8b4b8', '#c9a962'] });
        confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1 }, colors: ['#7c3aed', '#e8b4b8', '#c9a962'] });
        if (Date.now() < end) requestAnimationFrame(frame);
    }());
}

/* ─── Tooltip Mobile Toggle ─── */
function initTooltips() {
    document.querySelectorAll('.doc-tooltip-toggle').forEach(btn => {
        btn.addEventListener('click', e => {
            e.preventDefault();
            e.stopPropagation();
            const content = btn.closest('.doc-card').querySelector('.doc-tooltip-content');
            if (content) {
                const isVisible = content.classList.contains('show');
                // Close all others first
                document.querySelectorAll('.doc-tooltip-content.show').forEach(c => c.classList.remove('show'));
                if (!isVisible) content.classList.toggle('show');
            }
        });
    });
}

/* ─── Progress Bar Update ─── */
function updateProgressUI(section) {
    const bar = document.querySelector('.progress-fill');
    const countEl = document.querySelector('.progress-count');
    const pctEl = document.querySelector('.progress-pct');
    if (!bar) return;

    const checkboxes = document.querySelectorAll(`.check-item input[data-section="${section}"]`);
    const total = checkboxes.length;
    const completed = Array.from(checkboxes).filter(c => c.checked).length;
    const pct = total ? Math.round((completed / total) * 100) : 0;

    bar.style.width = pct + '%';
    if (countEl) countEl.textContent = completed + '/' + total;
    if (pctEl) pctEl.textContent = pct + '%';
}

/* ─── Month Badges Update ─── */
function updateMonthBadges() {
    document.querySelectorAll('.month-accordion').forEach(acc => {
        const cbs = acc.querySelectorAll('input[type="checkbox"]');
        const checked = Array.from(cbs).filter(c => c.checked).length;
        const badge = acc.querySelector('.month-badge');
        if (badge && cbs.length) badge.textContent = checked + '/' + cbs.length + ' ✓';
    });
}

/* ─── Tabs ─── */
function initTabs() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const group = btn.closest('.tabs-wrapper') || document;
            group.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            group.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            btn.classList.add('active');
            const target = document.getElementById(btn.dataset.tab);
            if (target) target.classList.add('active');
        });
    });
}

/* ─── Progress Bar Animation on Load ─── */
function animateProgressBar() {
    const bar = document.querySelector('.progress-fill');
    if (!bar) return;
    const targetWidth = bar.dataset.target || bar.style.width || '0%';
    bar.style.width = '0%';
    requestAnimationFrame(() => {
        requestAnimationFrame(() => { bar.style.width = targetWidth; });
    });
}

/* ─── Supabase Progress Sync ─── */
let _progressSaveTimer = null;
function scheduleProgressSave() {
    clearTimeout(_progressSaveTimer);
    _progressSaveTimer = setTimeout(() => {
        const tel = sessionStorage.getItem('mm_telephone');
        const code = sessionStorage.getItem('mm_access_code');
        if (!tel || !code || typeof sb === 'undefined') return;

        const store = ProgressStore.getStore();
        sb.rpc('save_client_progress', {
            p_telephone: tel,
            p_code: code,
            p_progress: JSON.stringify(store)
        }).then(({ error }) => {
            if (error) console.warn('Progress save failed:', error.message);
        });
    }, 800);
}

function applyServerProgress(serverStore) {
    if (!serverStore) return;
    try {
        const parsed = typeof serverStore === 'string' ? JSON.parse(serverStore) : serverStore;
        // Merge server data into localStorage
        ['formulaires', 'ressources', 'cartographie'].forEach(section => {
            if (parsed[section]) {
                Object.entries(parsed[section]).forEach(([id, completed]) => {
                    ProgressStore.setItem(section, id, completed);
                });
            }
        });
        // Apply to checkboxes on current page
        document.querySelectorAll('.check-item input[type="checkbox"]').forEach(cb => {
            const section = cb.dataset.section || 'ressources';
            const id = cb.dataset.id;
            if (id && ProgressStore.getItem(section, id)) {
                cb.checked = true;
            } else if (id) {
                cb.checked = false;
            }
        });
        // Update UI
        const firstCb = document.querySelector('.check-item input[data-section]');
        if (firstCb) updateProgressUI(firstCb.dataset.section);
        updateMonthBadges();
    } catch (e) { console.warn('applyServerProgress error:', e); }
}

/* ─── Form Completion Auto-Detection ─── */
const FORM_CHECKBOX_MAP = {
    'f1_express_v2': 'exp1'
};

async function checkFormCompletions() {
    const tel = sessionStorage.getItem('mm_telephone');
    const code = sessionStorage.getItem('mm_access_code');
    if (!tel || !code || typeof sb === 'undefined') return;

    // Check each mapped form
    for (const [formId, checkboxId] of Object.entries(FORM_CHECKBOX_MAP)) {
        try {
            const { data } = await sb.rpc('load_form_progress', {
                p_telephone: tel, p_code: code, p_form_id: formId
            });
            if (data && data.status === 'completed') {
                const cb = document.querySelector('input[data-id="' + checkboxId + '"]');
                if (cb && !cb.checked) {
                    cb.checked = true;
                    ProgressStore.setItem('formulaires', checkboxId, true);
                }
            }
        } catch (e) { /* ignore */ }
    }

    // Refresh UI
    updateProgressUI('formulaires');
    updateMonthBadges();
    scheduleProgressSave();
}

/* ─── Theme Toggle (Dark Mode) ─── */
const ThemeManager = {
    STORAGE_KEY: 'mymuqabala_theme',

    init() {
        const saved = localStorage.getItem(this.STORAGE_KEY);
        if (saved) {
            document.documentElement.setAttribute('data-theme', saved);
        } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.setAttribute('data-theme', 'dark');
        }
        this._updateIcon();

        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            if (!localStorage.getItem(this.STORAGE_KEY)) {
                document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
                this._updateIcon();
            }
        });
    },

    toggle() {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem(this.STORAGE_KEY, next);
        this._updateIcon();
    },

    _updateIcon() {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        document.querySelectorAll('.theme-toggle').forEach(btn => {
            btn.textContent = isDark ? '\u2600\uFE0F' : '\uD83C\uDF19';
            btn.setAttribute('aria-label', isDark ? 'Mode clair' : 'Mode sombre');
        });
    }
};

/* ─── Session Timeout (30 minutes inactivity) ─── */
const SessionTimeout = {
    TIMEOUT_MS: 30 * 60 * 1000,
    WARNING_MS: 28 * 60 * 1000,
    CHECK_INTERVAL_MS: 60 * 1000,
    _lastActivity: Date.now(),
    _timer: null,
    _warningShown: false,

    init() {
        if (!sessionStorage.getItem('mm_telephone')) return;
        this._lastActivity = Date.now();

        const self = this;
        const resetActivity = function() {
            self._lastActivity = Date.now();
            if (self._warningShown) self._dismissWarning();
        };

        ['mousemove', 'click', 'keydown', 'scroll', 'touchstart'].forEach(function(evt) {
            document.addEventListener(evt, resetActivity, { passive: true });
        });

        this._timer = setInterval(function() { self._check(); }, this.CHECK_INTERVAL_MS);
    },

    _check() {
        var elapsed = Date.now() - this._lastActivity;
        if (elapsed >= this.TIMEOUT_MS) {
            this._logout();
        } else if (elapsed >= this.WARNING_MS && !this._warningShown) {
            this._showWarning();
        }
    },

    _showWarning() {
        this._warningShown = true;
        var remaining = Math.ceil((this.TIMEOUT_MS - (Date.now() - this._lastActivity)) / 60000);
        var banner = document.createElement('div');
        banner.id = 'session-timeout-warning';
        banner.style.cssText = 'position:fixed;top:0;left:0;right:0;z-index:10000;background:#fef3cd;border-bottom:2px solid #c9a962;padding:0.75rem 1rem;text-align:center;font-size:0.9rem;color:#856404;display:flex;align-items:center;justify-content:center;gap:0.5rem;';
        banner.innerHTML = 'Votre session expire dans ' + remaining + ' minute(s) par inactivit\u00e9. '
            + '<button onclick="SessionTimeout._dismissWarning()" style="background:#7c3aed;color:#fff;border:none;padding:0.3rem 0.8rem;border-radius:6px;cursor:pointer;font-size:0.8rem">Je suis l\u00e0</button>';
        document.body.prepend(banner);
    },

    _dismissWarning() {
        this._warningShown = false;
        var banner = document.getElementById('session-timeout-warning');
        if (banner) banner.remove();
    },

    _logout() {
        clearInterval(this._timer);
        sessionStorage.removeItem('mm_telephone');
        sessionStorage.removeItem('mm_access_code');
        sessionStorage.removeItem('mm_uuid');
        window.location.href = 'dashboard-login.html?expired=1';
    }
};

/* ─── Init ─── */
document.addEventListener('DOMContentLoaded', () => {
    ThemeManager.init();
    SessionTimeout.init();
    initCheckboxes();
    initTooltips();
    initTabs();
    updateMonthBadges();
    animateProgressBar();

    // Auto-update progress bar based on checkboxes on current page
    const firstCb = document.querySelector('.check-item input[data-section]');
    if (firstCb) updateProgressUI(firstCb.dataset.section);

    // Auto-detect completed chat questionnaires
    const page = window.location.pathname.split('/').pop().replace(/\?.*/, '');
    if (page === 'dashboard-formulaires.html') {
        checkFormCompletions();
    }
});
