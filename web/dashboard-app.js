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
    // Express
    'f1_express_v2': 'exp1',
    'f2_express': 'exp2',
    'f3_express': 'exp3',
    'f4_express': 'exp4',
    // Scenarios
    's1_etincelle': 's1',
    's2_rythme': 's2',
    's3_deux_mondes': 's3',
    's4_test_invisible': 's4',
    's5_danse_pouvoir': 's5',
    's6_echo_passe': 's6',
    's7_triangle_sacre': 's7',
    's8_miroir_derangeant': 's8',
    's9_promesse_floue': 's9',
    's10_futur_se_dessine': 's10',
    // Germination
    'f1_1_espace_sacre': 'f1_1',
    'f1_2_exploration': 'f1_2',
    'f1_3_fil_conducteur': 'f1_3',
    'f1_4_parcours': 'f1_4',
    'f1_5_transformation': 'f1_5',
    'f1_6_boussole_interieure': 'f1_6',
    // Racines
    'f2_1_fondations': 'f2_1',
    'f2_2_heritage': 'f2_2',
    'f2_3_echos': 'f2_3',
    'f2_4_attachement': 'f2_4',
    'f2_5_corps_raconte': 'f2_5',
    // Patterns
    'f3_1_debut_relations': 'f3_1',
    'f3_2_saisons': 'f3_2',
    'f3_3_racines_entrelacees': 'f3_3',
    'f3_4_forces_creativite': 'f3_4',
    // Valeurs
    'f4_1_spiritualite': 'f4_1',
    'f4_2_jardin_secret': 'f4_2',
    'f4_3_boussole_coeur': 'f4_3',
    // Bilan Final
    'f_final_bilan': 'f_final'
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

/* ─── Init ─── */
document.addEventListener('DOMContentLoaded', () => {
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
