/* ═══════════════════════════════════════
   MY MUQABALA — Dashboard Data Layer
   Handles client auth + dynamic content
═══════════════════════════════════════ */

const DashboardData = {
    _data: null,
    _telephone: null,
    _accessCode: null,
    _uuid: null,
    _schemaVersion: null,

    /* ─── Auth: check session or URL params ─── */
    async init() {
        // 1. Try URL params first
        const params = new URLSearchParams(window.location.search);
        let tel = params.get('tel');
        let code = params.get('code');

        // Clean URL to remove credentials from browser history/address bar
        if (tel && code) {
            window.history.replaceState({}, '', window.location.pathname);
        }

        // 2. Fallback to sessionStorage
        if (!tel || !code) {
            tel = sessionStorage.getItem('mm_telephone');
            code = sessionStorage.getItem('mm_access_code');
            const uuid = sessionStorage.getItem('mm_uuid');
            if (tel && code && uuid) {
                this._telephone = tel;
                this._accessCode = code;
                this._uuid = uuid;
            }
        }

        // 3. No credentials → redirect to login
        if (!tel || !code) {
            this._redirectToLogin();
            return false;
        }

        // 4. Verify access via RPC (if no cached UUID)
        if (!this._uuid) {
            const { data, error } = await sb.rpc('verify_client_access', {
                p_telephone: tel,
                p_code: code
            });

            if (error || !data) {
                this._redirectToLogin();
                return false;
            }

            this._uuid = data;
            this._telephone = tel;
            this._accessCode = code;

            // Store in sessionStorage
            sessionStorage.setItem('mm_telephone', tel);
            sessionStorage.setItem('mm_access_code', code);
            sessionStorage.setItem('mm_uuid', this._uuid);
        }

        // 5. Fetch full dashboard data
        const { data: dashData, error: dashError } = await sb.rpc('get_client_dashboard', {
            p_uuid: this._uuid
        });

        if (dashError || !dashData) {
            console.error('Failed to load dashboard data:', dashError);
            return false;
        }

        this._data = dashData;

        // Detect schema version: V2 profiles have statut_parcours, V1 clients have statut
        this._schemaVersion = this._data?.client?.statut_parcours ? 'v2' : 'v1';

        // If V2, map profile fields to V1-compatible fields for backward compat
        if (this._schemaVersion === 'v2' && this._data.client) {
            const c = this._data.client;
            if (!c.client_id) {
                c.client_id = (c.id || '').substring(0, 6);
            }
            if (!c.statut && c.statut_parcours) {
                const archiveStatuts = ['termine', 'desactive'];
                const pauseStatuts = ['inscription'];
                if (archiveStatuts.includes(c.statut_parcours)) c.statut = 'archive';
                else if (pauseStatuts.includes(c.statut_parcours)) c.statut = 'pause';
                else c.statut = 'actif';
            }
        }

        return true;
    },

    _redirectToLogin() {
        const currentPage = window.location.pathname.split('/').pop();
        if (currentPage !== 'dashboard-login.html') {
            window.location.href = 'dashboard-login.html';
        }
    },

    /* ─── Getters ─── */
    get client() { return this._data?.client || {}; },
    get visibility() { return this._data?.visibility || {}; },
    get retours() { return this._data?.retours || []; },
    get bilans() { return this._data?.bilans || []; },
    get rencontres() { return this._data?.rencontres || []; },
    get content() { return this._data?.content || {}; },
    get prenom() { return this.client.prenom || ''; },
    get clientIdDisplay() { return this.client.client_id || ''; },
    get nextEvent() { return this._data?.next_event || null; },
    get activeMatch() { return this._data?.active_match || null; },
    get coachMessage() { return this._data?.coach_message || null; },
    get pendingActions() { return this._data?.pending_actions || []; },
    get currentPhase() { return this._data?.current_phase || 1; },
    get unreadNotifications() { return this._data?.unread_notifications || 0; },
    get schemaVersion() { return this._schemaVersion || 'v1'; },

    /* ─── Populate common sidebar + header elements ─── */
    populateCommon() {
        const prenom = this.prenom;
        const initial = prenom.charAt(0).toUpperCase();
        const clientId = this.clientIdDisplay;

        // Sidebar client info
        document.querySelectorAll('.client-avatar').forEach(el => { el.textContent = initial; });
        document.querySelectorAll('.client-name').forEach(el => { el.textContent = prenom; });
        document.querySelectorAll('.client-id').forEach(el => { el.textContent = 'N\u00B0 ' + clientId; });

        // Header greeting (only on accueil page)
        const greetingEl = document.querySelector('.header-greeting');
        if (greetingEl) {
            const emEl = greetingEl.querySelector('em');
            if (emEl) { emEl.textContent = prenom; }
        }

        // Update all nav links to carry auth params
        this._updateNavLinks();

        // Hide sections based on visibility
        this._applySectionVisibility();

        // Remove skeleton loading state
        document.body.classList.remove('loading');
        document.body.classList.add('loaded');
    },

    /* ─── Update navigation links ─── */
    /* Auth params are now stored in sessionStorage, no longer injected into URLs */
    _updateNavLinks() {
        // No-op: credentials are managed via sessionStorage, not URL params
    },

    /* ─── Section visibility: hide nav items + pages ─── */
    _applySectionVisibility() {
        const vis = this.visibility;
        const sectionMap = {
            'dashboard-test.html': 'show_accueil',
            'dashboard-ressources.html': 'show_ressources',
            'dashboard-formulaires.html': 'show_formulaires',
            'dashboard-cartographie.html': 'show_cartographie',
            'dashboard-compatibilite.html': 'show_compatibilite',
            'dashboard-plan-action.html': 'show_plan_action',
            'dashboard-rencontres.html': 'show_rencontres',
            'dashboard-historique.html': 'show_historique'
        };

        Object.entries(sectionMap).forEach(([page, key]) => {
            if (vis[key] === false) {
                // Hide nav items linking to this page
                document.querySelectorAll('a.nav-item[href*="' + page.split('.')[0] + '"]').forEach(el => {
                    el.classList.add('section-hidden');
                });
            }
        });
    },

    /* ─── Page-specific: Accueil (dashboard-test.html) ─── */
    populateAccueil() {
        // Welcome title
        const welcomeTitle = document.querySelector('.welcome-title');
        if (welcomeTitle) {
            welcomeTitle.textContent = 'As-salamu alaykum ' + this.prenom;
        }
    },

    /* ─── Page-specific: Accueil Widgets (5 widgets) ─── */
    populateAccueilWidgets() {
        // 1. Phase Progression Indicator
        const phase = this.currentPhase;
        const phaseWidget = document.getElementById('phase-widget');
        if (phaseWidget) {
            phaseWidget.setAttribute('data-phase', phase);
            const steps = phaseWidget.querySelectorAll('.phase-progress-step');
            steps.forEach((step, i) => {
                step.classList.remove('active', 'completed', 'pending');
                if (i + 1 < phase) {
                    step.classList.add('completed');
                } else if (i + 1 === phase) {
                    step.classList.add('active');
                } else {
                    step.classList.add('pending');
                }
            });
        }

        // 2. Event Countdown Widget
        const event = this.nextEvent;
        if (event) {
            const titleEl = document.getElementById('countdown-title');
            const timerEl = document.getElementById('countdown-timer');
            if (titleEl) titleEl.textContent = event.title || 'Événement à venir';
            if (timerEl && event.date) {
                const diff = new Date(event.date) - new Date();
                if (diff > 0) {
                    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                    const units = timerEl.querySelectorAll('.countdown-value');
                    if (units[0]) units[0].textContent = String(days).padStart(2, '0');
                    if (units[1]) units[1].textContent = String(hours).padStart(2, '0');
                    if (units[2]) units[2].textContent = String(mins).padStart(2, '0');
                }
            }
        }

        // 3. Active Match Card
        const match = this.activeMatch;
        const matchWidget = document.getElementById('match-widget');
        if (match && matchWidget) {
            matchWidget.style.display = '';
            const nameEl = document.getElementById('match-name');
            const initialEl = document.getElementById('match-initial');
            const metaEl = document.getElementById('match-meta');
            const scoreFill = document.getElementById('match-score-fill');
            const scoreText = document.getElementById('match-score-text');
            if (nameEl) nameEl.textContent = match.name || '---';
            if (initialEl) initialEl.textContent = (match.name || '?').charAt(0).toUpperCase();
            if (metaEl && match.hobbies) metaEl.textContent = match.hobbies.join(' · ');
            if (scoreFill && match.compatibility) scoreFill.style.width = match.compatibility + '%';
            if (scoreText && match.compatibility) scoreText.textContent = 'Compatibilité : ' + match.compatibility + '%';
        }

        // 4. Coach Message Widget
        const coach = this.coachMessage;
        if (coach) {
            const msgEl = document.getElementById('coach-message');
            const dateEl = document.getElementById('coach-date');
            if (msgEl) msgEl.textContent = coach.message || 'Ton accompagnant te contactera bientôt.';
            if (dateEl && coach.date) dateEl.textContent = coach.date;
        }

        // 5. Pending Actions Tracker
        const actions = this.pendingActions;
        if (actions.length > 0) {
            const listEl = document.getElementById('actions-list');
            const countEl = document.getElementById('actions-count');
            if (countEl) countEl.textContent = actions.length;
            if (listEl) {
                listEl.innerHTML = actions.map(a => {
                    const iconClass = a.priority === 'urgent' ? 'urgent' : (a.priority === 'info' ? 'info' : 'normal');
                    return '<a class="action-item" href="' + (a.link || '#') + '" style="text-decoration:none;">' +
                        '<div class="action-icon ' + iconClass + '">' + (a.icon || '📌') + '</div>' +
                        '<div class="action-text">' + (a.text || '') + '</div>' +
                        '<span class="action-cta">' + (a.cta || 'Voir →') + '</span></a>';
                }).join('');
            }
        }

        // 6. Notification badge
        const notifCount = this.unreadNotifications;
        const notifBadge = document.getElementById('notif-count');
        if (notifBadge) {
            notifBadge.textContent = notifCount > 0 ? notifCount : '';
        }
    },

    /* ─── Page-specific: Rencontres en Cours ─── */
    populateRencontresEnCours() {
        const container = document.getElementById('js-retours-container');
        if (!container) return;

        const retours = this.retours;
        if (!retours || retours.length === 0) {
            container.innerHTML = '<details class="retour-semaine" open>' +
                '<summary class="retour-semaine-header">' +
                '<span class="retour-semaine-numero">Semaine 1</span>' +
                '<span class="retour-semaine-date">\u2014</span>' +
                '</summary>' +
                '<div class="retour-semaine-body">' +
                '<p class="retour-vide">En attente de ton premier formulaire.</p>' +
                '</div></details>';
            return;
        }

        container.innerHTML = retours.map((r, i) => {
            const isOpen = i === retours.length - 1 ? ' open' : '';
            const dateText = r.date_retour || '\u2014';
            const body = r.statut === 'redige' && r.contenu
                ? r.contenu
                : '<p class="retour-vide">En attente de retour.</p>';
            return '<details class="retour-semaine"' + isOpen + '>' +
                '<summary class="retour-semaine-header">' +
                '<span class="retour-semaine-numero">Semaine ' + r.semaine_numero + '</span>' +
                '<span class="retour-semaine-date">' + dateText + '</span>' +
                '</summary>' +
                '<div class="retour-semaine-body">' + body + '</div></details>';
        }).join('');
    },

    /* ─── Page-specific: Plan d'Action ─── */
    populatePlanAction() {
        const container = document.getElementById('js-bilans-container');
        if (!container) return;

        const bilans = this.bilans;
        if (!bilans || bilans.length === 0) return;

        const statusMap = {
            'a_venir': { badge: 'exploratoire', label: 'A venir', dot: 'pending' },
            'en_cours': { badge: 'en-cours', label: 'En cours', dot: 'active' },
            'disponible': { badge: 'prete', label: 'Disponible', dot: 'done' }
        };
        const monthLabels = ['Mois 1', 'Mois 2', 'Mois 3'];

        container.innerHTML = bilans.map((b, i) => {
            const s = statusMap[b.statut] || statusMap['a_venir'];
            const content = b.statut === 'disponible' && b.contenu
                ? '<div style="margin-top:0.75rem;font-size:0.85rem;color:var(--ink-muted);line-height:1.6">' + b.contenu + '</div>'
                : '<p>' + this._bilanDefaultText(b.mois_numero) + '</p>';
            return '<div class="timeline-item">' +
                '<div class="timeline-dot ' + s.dot + '"></div>' +
                '<div class="timeline-card">' +
                '<div class="timeline-card-header"><div><span class="timeline-month">' + monthLabels[i] + '</span>' +
                '<h4>' + b.titre + '</h4></div>' +
                '<span class="status-badge ' + s.badge + ' status-badge-sm"><span class="status-dot"></span> ' + s.label + '</span></div>' +
                content + '</div></div>';
        }).join('');
    },

    _bilanDefaultText(mois) {
        const texts = {
            1: 'Premier point d\u2019\u00E9tape : ce que tu as mis en place, les r\u00E9sultats observ\u00E9s, les ajustements n\u00E9cessaires.',
            2: 'Approfondissement des strat\u00E9gies, analyse des interactions, renforcement de la confiance.',
            3: 'Bilan global du parcours de 3 mois, c\u00E9l\u00E9bration des progr\u00E8s, perspectives de long terme.'
        };
        return texts[mois] || '';
    },

    /* ─── Page-specific: Historique des Rencontres ─── */
    populateHistorique() {
        const container = document.getElementById('js-historique-container');
        if (!container) return;

        const rencontres = this.rencontres;
        if (!rencontres || rencontres.length === 0) {
            container.innerHTML = '<div class="empty-state">' +
                '<span class="empty-state-icon">\uD83D\uDCCB</span>' +
                '<p>Ton historique apparaitra ici au fil de tes rencontres. Chaque experience est une opportunite d\u2019apprentissage.</p></div>';
            return;
        }

        container.innerHTML = rencontres.map(r => {
            const badgeClass = r.statut === 'analyse_disponible' ? 'complete' : 'pending';
            const badgeText = r.statut === 'analyse_disponible' ? 'Analyse disponible' : 'En attente d\u2019analyse';
            const detail = r.statut === 'analyse_disponible' && r.analyse
                ? '<h4 style="font-family:var(--font-display);font-size:1rem;font-weight:500;color:var(--ink);margin-bottom:0.5rem">Retour de ton accompagnant</h4>' + r.analyse
                : '<p>Ton formulaire a \u00E9t\u00E9 re\u00E7u. L\u2019analyse arrive bient\u00F4t.</p>';
            return '<details class="rencontre-card">' +
                '<summary><div class="rencontre-header">' + (r.titre || 'Rencontre #' + r.numero) +
                ' <span class="form-badge ' + badgeClass + '">' + badgeText + '</span></div></summary>' +
                '<div class="rencontre-detail">' + detail + '</div></details>';
        }).join('');
    },

    /* ─── Page-specific: Compatibilite ─── */
    populateCompatibilite() {
        const formStatus = this.content['compatibilite_form_status'];
        if (formStatus === 'searching') {
            const pending = document.getElementById('state-pending');
            const searching = document.getElementById('state-searching');
            const statusText = document.getElementById('compat-status-text');
            if (pending) pending.style.display = 'none';
            if (searching) searching.style.display = 'block';
            if (statusText) statusText.textContent = 'En cours de recherche';
        }
    },

    /* ─── V2 Widgets: uses V2-specific fields if available ─── */
    populateV2Widgets() {
        if (this.schemaVersion !== 'v2') return;

        const c = this.client;

        // Display V2 badge if present
        const v2Badge = document.getElementById('v2-schema-badge');
        if (v2Badge) v2Badge.style.display = '';

        // Photo floue (V2 field)
        if (c.photo_floue_url) {
            const photoEl = document.querySelector('.client-photo-floue');
            if (photoEl) {
                photoEl.style.backgroundImage = 'url(' + c.photo_floue_url + ')';
                photoEl.style.display = '';
            }
        }

        // High-ticket indicator (V2 field)
        if (c.is_high_ticket) {
            const htEl = document.querySelector('.high-ticket-badge');
            if (htEl) htEl.style.display = '';
        }

        // Events participated count (V2 field)
        if (c.nb_events_participes != null) {
            const evtEl = document.getElementById('events-count');
            if (evtEl) evtEl.textContent = c.nb_events_participes;
        }

        // Statut parcours (V2 field) displayed raw
        if (c.statut_parcours) {
            const spEl = document.getElementById('statut-parcours');
            if (spEl) spEl.textContent = c.statut_parcours;
        }
    },

    /* ─── Page-specific: Cartographie ─── */
    populateCartographie() {
        // If cartographie_id exists, update doc links
        const cartoId = this.client.cartographie_id;
        if (cartoId) {
            document.querySelectorAll('.doc-card').forEach((card, i) => {
                const docNum = String(i + 1).padStart(2, '0');
                if (i < 20) {
                    card.setAttribute('href', '/cartographie/' + cartoId + '/DOC_' + docNum + '.html');
                } else {
                    // Bonus doc (Protocol)
                    card.setAttribute('href', '/cartographie/' + cartoId + '/DOC_PROTOCOLE.html');
                }
            });
        }
    }
};

/* ─── Auto-init on page load ─── */
document.addEventListener('DOMContentLoaded', async () => {
    const ok = await DashboardData.init();
    if (!ok) return;

    DashboardData.populateCommon();
    DashboardData.populateV2Widgets();

    // Detect current page and populate specific content
    const page = window.location.pathname.split('/').pop().replace(/\?.*/, '');

    // Load server-side progress and apply to checkboxes
    if (DashboardData.content && DashboardData.content.progress && typeof applyServerProgress === 'function') {
        applyServerProgress(DashboardData.content.progress);
    }

    switch (page) {
        case 'dashboard-test.html':
            DashboardData.populateAccueil();
            DashboardData.populateAccueilWidgets();
            break;
        case 'dashboard-rencontres.html':
            DashboardData.populateRencontresEnCours();
            break;
        case 'dashboard-plan-action.html':
            DashboardData.populatePlanAction();
            break;
        case 'dashboard-historique.html':
            DashboardData.populateHistorique();
            break;
        case 'dashboard-compatibilite.html':
            DashboardData.populateCompatibilite();
            break;
        case 'dashboard-cartographie.html':
            DashboardData.populateCartographie();
            break;
    }
});
