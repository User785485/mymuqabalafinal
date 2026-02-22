/* ═══════════════════════════════════════
   MY MUQABALA — Dashboard Data Layer
   Handles client auth + dynamic content
═══════════════════════════════════════ */

const DashboardData = {
    _data: null,
    _telephone: null,
    _accessCode: null,
    _uuid: null,

    /* ─── Auth: check session or URL params ─── */
    async init() {
        // 1. Try URL params first
        const params = new URLSearchParams(window.location.search);
        let tel = params.get('tel');
        let code = params.get('code');

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

    /* ─── Update navigation links with auth params ─── */
    _updateNavLinks() {
        const suffix = '?tel=' + encodeURIComponent(this._telephone) + '&code=' + encodeURIComponent(this._accessCode);
        document.querySelectorAll('a[href^="dashboard-"]').forEach(link => {
            const href = link.getAttribute('href');
            if (href && !href.includes('?')) {
                link.setAttribute('href', href + suffix);
            }
        });
        // Also update sidebar logo link
        document.querySelectorAll('.sidebar-logo a').forEach(link => {
            const href = link.getAttribute('href');
            if (href && !href.includes('?')) {
                link.setAttribute('href', href + suffix);
            }
        });
        // Header home buttons
        document.querySelectorAll('.header-btn[href^="dashboard-"]').forEach(link => {
            const href = link.getAttribute('href');
            if (href && !href.includes('?')) {
                link.setAttribute('href', href + suffix);
            }
        });
        // Questionnaire links (chat in-app)
        document.querySelectorAll('a[href^="questionnaire.html"]').forEach(link => {
            const href = link.getAttribute('href');
            if (href) {
                const sep = href.includes('?') ? '&' : '?';
                link.setAttribute('href', href + sep + 'tel=' + encodeURIComponent(this._telephone) + '&code=' + encodeURIComponent(this._accessCode));
            }
        });
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

    /* ─── Page-specific: Cartographie (fetches from section_content) ─── */
    async populateCartographie() {
        if (!this._uuid) return;

        // Fetch all cartographie docs for this user
        const { data: docs, error } = await sb
            .from('section_content')
            .select('content_key, titre, contenu_html')
            .eq('client_id', this._uuid)
            .eq('section_key', 'cartographie')
            .order('content_key');

        if (error) {
            console.error('Erreur chargement cartographie:', error);
            return;
        }

        // Build a map: DOC_01 → {titre, contenu_html}
        const docMap = {};
        if (docs) {
            docs.forEach(d => { docMap[d.content_key] = d; });
        }

        // Update each doc-card
        document.querySelectorAll('.doc-card').forEach((card, i) => {
            let contentKey;
            if (i < 20) {
                contentKey = 'DOC_' + String(i + 1).padStart(2, '0');
            } else {
                contentKey = 'PROTOCOLE';
            }

            const doc = docMap[contentKey];
            if (doc && doc.contenu_html) {
                // Make clickable → open modal
                card.setAttribute('href', '#');
                card.addEventListener('click', (e) => {
                    e.preventDefault();
                    DashboardData.openDocViewer(doc.titre || contentKey, doc.contenu_html);
                });
            } else {
                // No content available yet
                card.removeAttribute('href');
                card.style.opacity = '0.5';
                card.style.pointerEvents = 'none';
            }
        });
    },

    /* ─── Page-specific: Compte-Rendu (fetches from section_content) ─── */
    async populateCompteRendu() {
        if (!this._uuid) return;

        const { data: docs } = await sb
            .from('section_content')
            .select('content_key, titre, contenu_html')
            .eq('client_id', this._uuid)
            .eq('section_key', 'compte_rendu');

        if (docs && docs.length > 0 && docs[0].contenu_html) {
            this.openDocViewer(docs[0].titre || 'Compte-Rendu', docs[0].contenu_html);
        }
    },

    /* ─── Document Viewer Modal ─── */
    openDocViewer(title, html) {
        const modal = document.getElementById('doc-viewer-modal');
        if (!modal) return;
        document.getElementById('doc-viewer-title').textContent = title;
        const frame = document.getElementById('doc-viewer-frame');
        frame.srcdoc = html;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    },

    closeDocViewer() {
        const modal = document.getElementById('doc-viewer-modal');
        if (!modal) return;
        modal.style.display = 'none';
        document.getElementById('doc-viewer-frame').srcdoc = '';
        document.body.style.overflow = '';
    }
};

// Global function for onclick
function closeDocViewer() { DashboardData.closeDocViewer(); }

/* ─── Auto-init on page load ─── */
document.addEventListener('DOMContentLoaded', async () => {
    const ok = await DashboardData.init();
    if (!ok) return;

    DashboardData.populateCommon();

    // Detect current page and populate specific content
    const page = window.location.pathname.split('/').pop().replace(/\?.*/, '');

    // Load server-side progress and apply to checkboxes
    if (DashboardData.content && DashboardData.content.progress && typeof applyServerProgress === 'function') {
        applyServerProgress(DashboardData.content.progress);
    }

    switch (page) {
        case 'dashboard-test.html':
            DashboardData.populateAccueil();
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
