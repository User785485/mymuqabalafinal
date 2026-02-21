/* ═══════════════════════════════════════
   MY MUQABALA — Admin Panel App
   CRUD clients + content management
═══════════════════════════════════════ */

const AdminApp = {
    clients: [],
    filteredClients: [],
    selectedClient: null,
    selectedClientData: {},
    editingRetourId: null,
    editingRencontreId: null,
    _dataSource: 'v1',

    /* ─── INIT ─── */
    async init() {
        // getUser() validates the JWT server-side (not just local cache)
        const { data: { user }, error: userError } = await sb.auth.getUser();
        if (userError || !user) {
            await sb.auth.signOut();
            window.location.href = '/admin/index.html';
            return;
        }

        // Verify user has coach or admin role
        const { data: profileData } = await sb.from('profiles').select('role').eq('id', user.id).single();
        if (!profileData || !['coach', 'admin'].includes(profileData.role)) {
            await sb.auth.signOut();
            window.location.href = '/admin/index.html';
            return;
        }

        const userInfo = document.getElementById('admin-user-info');
        if (userInfo) userInfo.textContent = user.email;

        await this.loadClients();
    },

    /* ─── LOGOUT ─── */
    async logout() {
        await sb.auth.signOut();
        window.location.href = '/admin/index.html';
    },

    /* ─── LOAD ALL CLIENTS (V2 profiles first, V1 clients fallback) ─── */
    async loadClients() {
        // Try V2 first (profiles table)
        let { data, error } = await sb
            .from('profiles')
            .select('id, prenom, nom, email, telephone, role, statut_parcours, photo_floue_url, is_high_ticket, nb_events_participes, metadata')
            .order('prenom');

        if (error || !data || data.length === 0) {
            // Fallback to V1 (clients table)
            ({ data, error } = await sb
                .from('clients')
                .select('id, client_id, access_code, prenom, nom, email, telephone, statut')
                .order('prenom'));

            if (error) { this.toast('Erreur chargement clients', 'error'); return; }
            this._dataSource = 'v1';
        } else {
            this._dataSource = 'v2';
            // Map V2 fields to V1-compatible format for existing renderers
            data = data.map(p => ({
                ...p,
                client_id: p.id.substring(0, 6),
                access_code: '------',  // OTP replaces static codes in V2
                statut: this._mapStatutParcours(p.statut_parcours),
            }));
        }

        this.clients = data || [];
        this.filteredClients = [...this.clients];
        this.renderClientList();
    },

    /* ─── SEARCH ─── */
    search(query) {
        const q = query.toLowerCase().trim();
        if (!q) {
            this.filteredClients = [...this.clients];
        } else {
            this.filteredClients = this.clients.filter(c =>
                (c.prenom || '').toLowerCase().includes(q) ||
                (c.nom || '').toLowerCase().includes(q) ||
                (c.email || '').toLowerCase().includes(q) ||
                (c.telephone || '').includes(q) ||
                (c.client_id || '').includes(q)
            );
        }
        this.renderClientList();
    },

    /* ─── RENDER CLIENT LIST ─── */
    renderClientList() {
        const container = document.getElementById('client-list');
        const countEl = document.getElementById('client-count');
        if (countEl) countEl.textContent = this.filteredClients.length;

        if (this.filteredClients.length === 0) {
            container.innerHTML = '<div class="admin-list-empty">Aucun client trouvé.</div>';
            return;
        }

        container.innerHTML = this.filteredClients.map(c => {
            const initial = (c.prenom || '?').charAt(0).toUpperCase();
            const active = this.selectedClient === c.id ? ' active' : '';
            return '<button class="admin-list-item' + active + '" onclick="AdminApp.selectClient(\'' + c.id + '\')">' +
                '<div class="admin-list-avatar">' + initial + '</div>' +
                '<div class="admin-list-info">' +
                '<div class="admin-list-name">' + this._esc(c.prenom) + (c.nom ? ' ' + this._esc(c.nom) : '') + '</div>' +
                '<div class="admin-list-sub">N\u00B0 ' + c.client_id + '</div>' +
                '</div>' +
                '<div class="admin-list-status ' + c.statut + '"></div>' +
                '</button>';
        }).join('');
    },

    /* ─── SELECT CLIENT ─── */
    async selectClient(uuid) {
        this.selectedClient = uuid;
        this.renderClientList();

        const detailEmpty = document.getElementById('detail-empty');
        const detailContent = document.getElementById('detail-content');
        detailEmpty.style.display = 'none';
        detailContent.style.display = 'block';

        // Load full client data
        const client = this.clients.find(c => c.id === uuid);
        if (!client) return;

        if (this._dataSource === 'v2') {
            // V2: Read from profiles + V2 tables, with fallback to V1 tables
            const [
                { data: fullProfile },
                { data: visibility },
                { data: retours },
                { data: bilans },
                { data: rencontres },
                { data: content },
                { data: coachDocs },
                { data: events }
            ] = await Promise.all([
                sb.from('profiles').select('*').eq('id', uuid).single(),
                sb.from('section_visibility').select('*').eq('client_id', uuid).single(),
                sb.from('retours_hebdomadaires').select('*').eq('client_id', uuid).order('semaine_numero'),
                sb.from('bilans_plan_action').select('*').eq('client_id', uuid).order('mois_numero'),
                sb.from('rencontres_historique').select('*').eq('client_id', uuid).order('numero'),
                sb.from('section_content').select('*').eq('client_id', uuid),
                sb.from('coach_documents').select('*').eq('destinataire_id', uuid).then(r => r).catch(() => ({ data: null })),
                sb.from('event_participants').select('*, events(*)').eq('user_id', uuid).then(r => r).catch(() => ({ data: null }))
            ]);

            // Map V2 profile to V1-compatible client format for existing renderers
            let mappedClient = null;
            if (fullProfile) {
                mappedClient = {
                    ...fullProfile,
                    client_id: fullProfile.id.substring(0, 6),
                    access_code: '------',
                    statut: this._mapStatutParcours(fullProfile.statut_parcours),
                };
            }

            this.selectedClientData = {
                client: mappedClient,
                visibility: visibility,
                retours: retours || [],
                bilans: bilans || [],
                rencontres: rencontres || [],
                content: content || [],
                coachDocuments: coachDocs || [],
                eventParticipations: events || []
            };
        } else {
            // V1: Load related data in parallel from original tables
            const [
                { data: fullClient },
                { data: visibility },
                { data: retours },
                { data: bilans },
                { data: rencontres },
                { data: content }
            ] = await Promise.all([
                sb.from('clients').select('*').eq('id', uuid).single(),
                sb.from('section_visibility').select('*').eq('client_id', uuid).single(),
                sb.from('retours_hebdomadaires').select('*').eq('client_id', uuid).order('semaine_numero'),
                sb.from('bilans_plan_action').select('*').eq('client_id', uuid).order('mois_numero'),
                sb.from('rencontres_historique').select('*').eq('client_id', uuid).order('numero'),
                sb.from('section_content').select('*').eq('client_id', uuid)
            ]);

            this.selectedClientData = {
                client: fullClient,
                visibility: visibility,
                retours: retours || [],
                bilans: bilans || [],
                rencontres: rencontres || [],
                content: content || []
            };
        }

        this._populateDetail();
    },

    /* ─── POPULATE DETAIL VIEW ─── */
    _populateDetail() {
        const c = this.selectedClientData.client;
        if (!c) return;

        // Header
        document.getElementById('detail-avatar').textContent = (c.prenom || '?').charAt(0).toUpperCase();
        document.getElementById('detail-name').textContent = c.prenom + (c.nom ? ' ' + c.nom : '');
        document.getElementById('detail-client-id').textContent = c.client_id;

        // Credentials box
        document.getElementById('detail-telephone').textContent = c.telephone || '(pas de téléphone)';

        // Password from metadata
        const pwd = c.metadata?.generated_password || '';
        this._detailPassword = pwd;
        this._detailPasswordVisible = false;
        document.getElementById('detail-password').textContent = pwd ? '●●●●●●●●●●●●' : '(aucun)';
        document.getElementById('detail-pwd-eye').textContent = '👁';

        // High ticket
        const htBox = document.getElementById('high-ticket-box');
        const htLabel = document.getElementById('detail-high-ticket');
        if (htLabel) {
            htLabel.textContent = c.is_high_ticket ? 'Oui ✨' : 'Non';
            htLabel.style.color = c.is_high_ticket ? '#C9A962' : 'var(--ink-muted,#6b7280)';
        }
        if (htBox) {
            htBox.style.background = c.is_high_ticket ? 'rgba(201,169,98,0.12)' : 'rgba(201,169,98,0.06)';
            htBox.style.borderColor = c.is_high_ticket ? 'rgba(201,169,98,0.3)' : 'rgba(201,169,98,0.15)';
        }

        // Events count
        document.getElementById('detail-events-count').textContent = c.nb_events_participes || 0;

        // Preview link
        const previewLink = document.getElementById('detail-preview-link');
        previewLink.href = '../dashboard-test.html?tel=' + encodeURIComponent(c.telephone || '');

        // Form fields
        document.getElementById('field-prenom').value = c.prenom || '';
        document.getElementById('field-nom').value = c.nom || '';
        document.getElementById('field-email').value = c.email || '';
        document.getElementById('field-telephone').value = c.telephone || '';
        var statutEl = document.getElementById('field-statut-parcours');
        if (statutEl) statutEl.value = c.statut_parcours || 'inscription';
        document.getElementById('field-notes').value = c.notes_internes || '';
        document.getElementById('field-compte-rendu-id').value = c.compte_rendu_id || '';
        document.getElementById('field-plan-action-id').value = c.plan_action_id || '';
        document.getElementById('field-cartographie-id').value = c.cartographie_id || '';

        // Section toggles
        this._renderSectionToggles();

        // Retours
        this._renderRetoursList();

        // Bilans
        this._renderBilansList();

        // Rencontres historique
        this._renderRencontresList();

        // Reset to first tab
        this.switchTab('infos');
        this._loadMatchingCount(c.id);
    },

    /* ─── MATCHING COUNT ─── */
    async _loadMatchingCount(uuid) {
        try {
            const { count, error } = await sb
                .from('matches')
                .select('*', { count: 'exact', head: true })
                .or('user_1_id.eq.' + uuid + ',user_2_id.eq.' + uuid);
            if (!error) {
                document.getElementById('detail-matching-count').textContent = count || 0;
            }
        } catch (e) {
            document.getElementById('detail-matching-count').textContent = '–';
        }
    },

    /* ─── TABS ─── */
    switchTab(tabName) {
        document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.admin-tab-content').forEach(t => t.classList.remove('active'));
        document.querySelector('.admin-tab-content#tab-' + tabName).classList.add('active');
        // Activate correct tab button
        const tabs = document.querySelectorAll('.admin-tab');
        const tabMap = { 'infos': 0, 'sections': 1, 'rencontres': 2, 'plan-action': 3, 'historique': 4, 'progression': 5, 'scoring': 6 };
        if (tabMap[tabName] !== undefined && tabs[tabMap[tabName]]) {
            tabs[tabMap[tabName]].classList.add('active');
        }
        if (tabName === 'progression') this._renderProgressionTab();
        if (tabName === 'scoring') this._renderScoringTab();
    },

    /* ─── SAVE CLIENT INFOS ─── */
    async saveInfos(e) {
        e.preventDefault();
        const uuid = this.selectedClient;
        if (!uuid) return;

        const updates = {
            prenom: document.getElementById('field-prenom').value.trim(),
            nom: document.getElementById('field-nom').value.trim(),
            email: document.getElementById('field-email').value.trim(),
            telephone: document.getElementById('field-telephone').value.trim(),
            statut_parcours: document.getElementById('field-statut-parcours')?.value || 'inscription',
            notes_internes: document.getElementById('field-notes').value,
            compte_rendu_id: document.getElementById('field-compte-rendu-id').value.trim(),
            plan_action_id: document.getElementById('field-plan-action-id').value.trim(),
            cartographie_id: document.getElementById('field-cartographie-id').value.trim()
        };

        let error;
        if (this._dataSource === 'v2') {
            // V2: Save to profiles table with mapped field names
            const profileUpdates = {
                prenom: updates.prenom,
                nom: updates.nom,
                email: updates.email,
                telephone: updates.telephone,
                statut_parcours: updates.statut_parcours,
            };
            // Store V1-specific fields in metadata JSONB
            const metadataUpdates = {
                notes_internes: updates.notes_internes,
                compte_rendu_id: updates.compte_rendu_id,
                plan_action_id: updates.plan_action_id,
                cartographie_id: updates.cartographie_id
            };
            profileUpdates.metadata = {
                ...(this.selectedClientData.client?.metadata || {}),
                ...metadataUpdates
            };
            ({ error } = await sb.from('profiles').update(profileUpdates).eq('id', uuid));
        } else {
            // V1: Save to clients table
            ({ error } = await sb.from('clients').update(updates).eq('id', uuid));
        }

        if (error) { this.toast('Erreur sauvegarde', 'error'); /* sauvegarde is a noun here */ return; }

        // Update local cache
        const idx = this.clients.findIndex(c => c.id === uuid);
        if (idx >= 0) Object.assign(this.clients[idx], updates);
        this.selectedClientData.client = { ...this.selectedClientData.client, ...updates };

        this.renderClientList();
        document.getElementById('detail-name').textContent = updates.prenom + (updates.nom ? ' ' + updates.nom : '');
        document.getElementById('detail-avatar').textContent = updates.prenom.charAt(0).toUpperCase();

        const status = document.getElementById('save-status-infos');
        status.textContent = 'Enregistré !';
        status.classList.add('show');
        setTimeout(() => status.classList.remove('show'), 2000);

        this.toast('Client mis à jour', 'success');
    },

    /* ─── SECTION TOGGLES ─── */
    _renderSectionToggles() {
        const vis = this.selectedClientData.visibility || {};
        const sections = [
            { key: 'show_accueil', label: 'Accueil' },
            { key: 'show_ressources', label: 'Ressources Pédagogiques' },
            { key: 'show_formulaires', label: 'Formulaires Exploratoires' },
            { key: 'show_cartographie', label: 'Cartographie Émotionnelle' },
            { key: 'show_compatibilite', label: 'Recherche de Compatibilité' },
            { key: 'show_plan_action', label: 'Plan d\'Action' },
            { key: 'show_rencontres', label: 'Rencontres en Cours' },
            { key: 'show_historique', label: 'Historique des Rencontres' }
        ];

        const container = document.getElementById('section-toggles');
        container.innerHTML = sections.map(s => {
            const checked = vis[s.key] !== false ? ' checked' : '';
            return '<div class="admin-toggle-row">' +
                '<span class="admin-toggle-label">' + s.label + '</span>' +
                '<label class="admin-toggle">' +
                '<input type="checkbox"' + checked + ' onchange="AdminApp.toggleSection(\'' + s.key + '\', this.checked)">' +
                '<span class="admin-toggle-track"></span>' +
                '<span class="admin-toggle-thumb"></span>' +
                '</label></div>';
        }).join('');
    },

    async toggleSection(key, value) {
        const uuid = this.selectedClient;
        if (!uuid) return;

        const update = {};
        update[key] = value;

        const { error } = await sb.from('section_visibility').update(update).eq('client_id', uuid);
        if (error) { this.toast('Erreur', 'error'); return; }

        if (this.selectedClientData.visibility) {
            this.selectedClientData.visibility[key] = value;
        }
        this.toast(value ? 'Section activée' : 'Section masquée', 'success');
    },

    /* ─── RETOURS HEBDOMADAIRES ─── */
    _renderRetoursList() {
        const retours = this.selectedClientData.retours || [];
        const container = document.getElementById('retours-list');

        if (retours.length === 0) {
            container.innerHTML = '<div class="admin-list-empty" style="padding:1.5rem">Aucun retour. Clique "+ Ajouter un retour" pour commencer.</div>';
            return;
        }

        container.innerHTML = retours.map(r =>
            '<div class="admin-item-card" onclick="AdminApp.editRetour(\'' + r.id + '\')">' +
            '<div class="admin-item-info">' +
            '<div class="admin-item-title">Semaine ' + r.semaine_numero + '</div>' +
            '<div class="admin-item-sub">' + (r.date_retour || 'Pas de date') + '</div>' +
            '</div>' +
            '<span class="admin-item-badge ' + r.statut + '">' + (r.statut === 'redige' ? 'Rédigé' : 'En attente') + '</span>' +
            '</div>'
        ).join('');

        document.getElementById('retour-editor').style.display = 'none';
    },

    addRetour() {
        this.editingRetourId = null;
        const retours = this.selectedClientData.retours || [];
        const nextNum = retours.length > 0 ? Math.max(...retours.map(r => r.semaine_numero)) + 1 : 1;

        document.getElementById('retour-semaine').value = nextNum;
        document.getElementById('retour-date').value = '';
        document.getElementById('retour-contenu').value = '';
        document.getElementById('retour-statut').value = 'en_attente';
        document.getElementById('btn-delete-retour').style.display = 'none';
        document.getElementById('retour-editor').style.display = 'block';
    },

    editRetour(id) {
        const r = (this.selectedClientData.retours || []).find(x => x.id === id);
        if (!r) return;

        this.editingRetourId = id;
        document.getElementById('retour-semaine').value = r.semaine_numero;
        document.getElementById('retour-date').value = r.date_retour || '';
        document.getElementById('retour-contenu').value = r.contenu || '';
        document.getElementById('retour-statut').value = r.statut || 'en_attente';
        document.getElementById('btn-delete-retour').style.display = 'inline-flex';
        document.getElementById('retour-editor').style.display = 'block';
    },

    async saveRetour() {
        const uuid = this.selectedClient;
        if (!uuid) return;

        const data = {
            client_id: uuid,
            semaine_numero: parseInt(document.getElementById('retour-semaine').value),
            date_retour: document.getElementById('retour-date').value.trim(),
            contenu: document.getElementById('retour-contenu').value,
            statut: document.getElementById('retour-statut').value
        };

        let error;
        if (this.editingRetourId) {
            ({ error } = await sb.from('retours_hebdomadaires').update(data).eq('id', this.editingRetourId));
        } else {
            ({ error } = await sb.from('retours_hebdomadaires').insert(data));
        }

        if (error) { this.toast('Erreur: ' + error.message, 'error'); return; }

        await this._reloadRetours();
        this.toast('Retour sauvegardé', 'success');
    },

    async deleteRetour() {
        if (!this.editingRetourId || !confirm('Supprimer ce retour ?')) return;
        const { error } = await sb.from('retours_hebdomadaires').delete().eq('id', this.editingRetourId);
        if (error) { this.toast('Erreur suppression', 'error'); return; }
        await this._reloadRetours();
        this.toast('Retour supprimé', 'success');
    },

    cancelRetourEdit() {
        document.getElementById('retour-editor').style.display = 'none';
        this.editingRetourId = null;
    },

    async _reloadRetours() {
        const { data } = await sb.from('retours_hebdomadaires')
            .select('*').eq('client_id', this.selectedClient).order('semaine_numero');
        this.selectedClientData.retours = data || [];
        this._renderRetoursList();
    },

    /* ─── BILANS PLAN ACTION ─── */
    _renderBilansList() {
        const bilans = this.selectedClientData.bilans || [];
        const container = document.getElementById('bilans-list');

        container.innerHTML = bilans.map(b => {
            const statusLabels = { 'a_venir': 'A venir', 'en_cours': 'En cours', 'disponible': 'Disponible' };
            return '<div class="admin-bilan-card">' +
                '<div class="admin-bilan-header">' +
                '<span class="admin-bilan-title">' + this._esc(b.titre) + '</span>' +
                '<span class="admin-item-badge ' + b.statut + '">' + (statusLabels[b.statut] || b.statut) + '</span>' +
                '</div>' +
                '<div class="admin-form-field" style="margin-bottom:0.75rem">' +
                '<label>Statut</label>' +
                '<select onchange="AdminApp.updateBilan(\'' + b.id + '\', \'statut\', this.value)">' +
                '<option value="a_venir"' + (b.statut === 'a_venir' ? ' selected' : '') + '>A venir</option>' +
                '<option value="en_cours"' + (b.statut === 'en_cours' ? ' selected' : '') + '>En cours</option>' +
                '<option value="disponible"' + (b.statut === 'disponible' ? ' selected' : '') + '>Disponible</option>' +
                '</select></div>' +
                '<div class="admin-form-field">' +
                '<label>Contenu (HTML)</label>' +
                '<textarea rows="4" onblur="AdminApp.updateBilan(\'' + b.id + '\', \'contenu\', this.value)">' + this._esc(b.contenu || '') + '</textarea>' +
                '</div></div>';
        }).join('');
    },

    async updateBilan(id, field, value) {
        const update = {};
        update[field] = value;
        const { error } = await sb.from('bilans_plan_action').update(update).eq('id', id);
        if (error) { this.toast('Erreur', 'error'); return; }

        // Update local
        const b = (this.selectedClientData.bilans || []).find(x => x.id === id);
        if (b) b[field] = value;

        if (field === 'statut') {
            this._renderBilansList();
            this.toast('Bilan mis à jour', 'success');
        }
    },

    /* ─── RENCONTRES HISTORIQUE ─── */
    _renderRencontresList() {
        const rencontres = this.selectedClientData.rencontres || [];
        const container = document.getElementById('rencontres-list');

        if (rencontres.length === 0) {
            container.innerHTML = '<div class="admin-list-empty" style="padding:1.5rem">Aucune rencontre. Clique "+ Ajouter" pour commencer.</div>';
            return;
        }

        container.innerHTML = rencontres.map(r =>
            '<div class="admin-item-card" onclick="AdminApp.editRencontre(\'' + r.id + '\')">' +
            '<div class="admin-item-info">' +
            '<div class="admin-item-title">' + this._esc(r.titre || 'Rencontre #' + r.numero) + '</div>' +
            '<div class="admin-item-sub">' + (r.date_rencontre || '') + '</div>' +
            '</div>' +
            '<span class="admin-item-badge ' + r.statut + '">' +
            (r.statut === 'analyse_disponible' ? 'Analyse dispo' : 'En attente') + '</span>' +
            '</div>'
        ).join('');

        document.getElementById('rencontre-editor').style.display = 'none';
    },

    addRencontre() {
        this.editingRencontreId = null;
        const rencontres = this.selectedClientData.rencontres || [];
        const nextNum = rencontres.length > 0 ? Math.max(...rencontres.map(r => r.numero)) + 1 : 1;

        document.getElementById('rencontre-numero').value = nextNum;
        document.getElementById('rencontre-date').value = '';
        document.getElementById('rencontre-titre').value = 'Rencontre #' + nextNum;
        document.getElementById('rencontre-analyse').value = '';
        document.getElementById('rencontre-statut').value = 'en_attente';
        document.getElementById('btn-delete-rencontre').style.display = 'none';
        document.getElementById('rencontre-editor').style.display = 'block';
    },

    editRencontre(id) {
        const r = (this.selectedClientData.rencontres || []).find(x => x.id === id);
        if (!r) return;

        this.editingRencontreId = id;
        document.getElementById('rencontre-numero').value = r.numero;
        document.getElementById('rencontre-date').value = r.date_rencontre || '';
        document.getElementById('rencontre-titre').value = r.titre || '';
        document.getElementById('rencontre-analyse').value = r.analyse || '';
        document.getElementById('rencontre-statut').value = r.statut || 'en_attente';
        document.getElementById('btn-delete-rencontre').style.display = 'inline-flex';
        document.getElementById('rencontre-editor').style.display = 'block';
    },

    async saveRencontre() {
        const uuid = this.selectedClient;
        if (!uuid) return;

        const data = {
            client_id: uuid,
            numero: parseInt(document.getElementById('rencontre-numero').value),
            date_rencontre: document.getElementById('rencontre-date').value.trim(),
            titre: document.getElementById('rencontre-titre').value.trim(),
            analyse: document.getElementById('rencontre-analyse').value,
            statut: document.getElementById('rencontre-statut').value
        };

        let error;
        if (this.editingRencontreId) {
            ({ error } = await sb.from('rencontres_historique').update(data).eq('id', this.editingRencontreId));
        } else {
            ({ error } = await sb.from('rencontres_historique').insert(data));
        }

        if (error) { this.toast('Erreur: ' + error.message, 'error'); return; }

        await this._reloadRencontres();
        this.toast('Rencontre sauvegardée', 'success');
    },

    async deleteRencontre() {
        if (!this.editingRencontreId || !confirm('Supprimer cette rencontre ?')) return;
        const { error } = await sb.from('rencontres_historique').delete().eq('id', this.editingRencontreId);
        if (error) { this.toast('Erreur suppression', 'error'); return; }
        await this._reloadRencontres();
        this.toast('Rencontre supprimée', 'success');
    },

    cancelRencontreEdit() {
        document.getElementById('rencontre-editor').style.display = 'none';
        this.editingRencontreId = null;
    },

    async _reloadRencontres() {
        const { data } = await sb.from('rencontres_historique')
            .select('*').eq('client_id', this.selectedClient).order('numero');
        this.selectedClientData.rencontres = data || [];
        this._renderRencontresList();
    },

    /* ─── SHOW SECTIONS ─── */
    showSection(name) {
        document.getElementById('section-clients').style.display = name === 'clients' ? 'flex' : 'none';
        document.getElementById('section-new-client').style.display = name === 'new-client' ? 'block' : 'none';
        document.getElementById('section-events').style.display = name === 'events' ? 'block' : 'none';
        var invitationsEl = document.getElementById('section-invitations');
        if (invitationsEl) invitationsEl.style.display = name === 'invitations' ? 'block' : 'none';
        var matchingEl = document.getElementById('section-matching');
        if (matchingEl) matchingEl.style.display = name === 'matching' ? 'block' : 'none';
        var exportsEl = document.getElementById('section-exports');
        if (exportsEl) exportsEl.style.display = name === 'exports' ? 'block' : 'none';
        var mahramEl = document.getElementById('section-mahram');
        if (mahramEl) mahramEl.style.display = name === 'mahram' ? 'block' : 'none';
        var documentsEl = document.getElementById('section-documents');
        if (documentsEl) documentsEl.style.display = name === 'documents' ? 'block' : 'none';

        document.querySelectorAll('.admin-nav-item').forEach(n => n.classList.remove('active'));
        var navMap = { 'clients': 'nav-clients', 'new-client': 'nav-nouveau', 'events': 'nav-events', 'invitations': 'nav-invitations', 'matching': 'nav-matching', 'exports': 'nav-exports', 'mahram': 'nav-mahram', 'documents': 'nav-documents' };
        var navId = navMap[name] || '';
        if (navId) document.getElementById(navId)?.classList.add('active');

        if (name === 'events' && typeof EventManager !== 'undefined') EventManager.init();
        if (name === 'invitations' && typeof InvitationManager !== 'undefined') InvitationManager.init();
        if (name === 'matching' && typeof MatchingManager !== 'undefined') MatchingManager.init();
        if (name === 'exports' && typeof ExportManager !== 'undefined') ExportManager.init();
        if (name === 'mahram' && typeof MahramManager !== 'undefined') {
            MahramManager.init();
            if (typeof AdminChatManager !== 'undefined') AdminChatManager.initialize();
        }
        if (name === 'documents' && typeof DocDistribution !== 'undefined') { DocDistribution.init(); DocDistribution.populateClientSelect(); }
    },

    showNewClientForm() {
        this.showSection('new-client');
        document.getElementById('new-prenom').value = '';
        document.getElementById('new-nom').value = '';
        document.getElementById('new-email').value = '';
        document.getElementById('new-telephone').value = '';
        var genreEl = document.getElementById('new-genre');
        if (genreEl) genreEl.value = '';
        var credCard = document.getElementById('generated-credentials');
        if (credCard) credCard.style.display = 'none';
    },

    /* ─── CREATE CLIENT ─── */
    async createClient(e) {
        e.preventDefault();

        const telephone = document.getElementById('new-telephone').value.trim();
        const prenom = document.getElementById('new-prenom').value.trim();
        const nom = document.getElementById('new-nom').value.trim();
        const email = document.getElementById('new-email').value.trim();
        const genre = document.getElementById('new-genre')?.value || '';

        if (!telephone) { this.toast('Le téléphone est obligatoire', 'error'); return; }
        if (!prenom) { this.toast('Le prénom est obligatoire', 'error'); return; }
        if (!genre) { this.toast('Le genre est obligatoire', 'error'); return; }

        // Hide previous credentials
        const credCard = document.getElementById('generated-credentials');
        if (credCard) credCard.style.display = 'none';

        try {
            const { data, error } = await sb.functions.invoke('create-client', {
                body: { telephone, prenom, nom, email, genre }
            });

            if (error) { this.toast('Erreur: ' + (error.message || error), 'error'); return; }

            // Show generated credentials
            if (data && data.password) {
                this._generatedPassword = data.password;
                this._generatedPasswordVisible = false;
                document.getElementById('gen-telephone').textContent = telephone;
                document.getElementById('gen-password').textContent = '\u25CF\u25CF\u25CF\u25CF\u25CF\u25CF\u25CF\u25CF\u25CF\u25CF\u25CF\u25CF';
                document.getElementById('gen-eye-icon').textContent = '\uD83D\uDC41';
                if (credCard) credCard.style.display = 'block';
            }

            await this.loadClients();
            this.toast('Client "' + prenom + '" créé avec succès !', 'success');
        } catch (err) {
            // Fallback: direct profiles insert if edge function not deployed
            const { error: insertErr } = await sb.from('profiles').insert({
                prenom, nom, email, telephone, genre,
                date_naissance: '2000-01-01',
                ville: 'Non renseignée',
                role: 'participant',
                statut_parcours: 'inscription'
            });

            if (insertErr) { this.toast('Erreur: ' + insertErr.message, 'error'); return; }
            await this.loadClients();
            this.toast('Client "' + prenom + '" créé (sans mot de passe \u2014 edge function non déployée)', 'success');
        }
    },

    /* ─── TOGGLE GENERATED PASSWORD VISIBILITY ─── */
    _generatedPassword: '',
    _generatedPasswordVisible: false,

    toggleGenPassword() {
        this._generatedPasswordVisible = !this._generatedPasswordVisible;
        document.getElementById('gen-password').textContent = this._generatedPasswordVisible
            ? this._generatedPassword
            : '\u25CF\u25CF\u25CF\u25CF\u25CF\u25CF\u25CF\u25CF\u25CF\u25CF\u25CF\u25CF';
        document.getElementById('gen-eye-icon').textContent = this._generatedPasswordVisible ? '\uD83D\uDE48' : '\uD83D\uDC41';
    },

    /* ─── COPY GENERATED CREDENTIALS ─── */
    copyGenCredentials() {
        const tel = document.getElementById('gen-telephone').textContent;
        const pwd = this._generatedPassword;
        const text = 'Téléphone: ' + tel + '\nMot de passe: ' + pwd;
        navigator.clipboard.writeText(text).then(() => this.toast('Identifiants copiés !', 'success'));
    },

    /* ─── COPY CREDENTIALS ─── */
    copyCredentials() {
        const c = this.selectedClientData.client;
        if (!c) return;
        const pwd = this._detailPassword || '(non généré)';
        const text = 'Téléphone: ' + (c.telephone || '') + '\nMot de passe: ' + pwd;
        navigator.clipboard.writeText(text).then(() => this.toast('Identifiants copiés !', 'success'));
    },

    /* ─── PASSWORD TOGGLE ─── */
    _detailPassword: '',
    _detailPasswordVisible: false,

    toggleDetailPassword() {
        this._detailPasswordVisible = !this._detailPasswordVisible;
        document.getElementById('detail-password').textContent = this._detailPasswordVisible
            ? (this._detailPassword || '(aucun)')
            : (this._detailPassword ? '●●●●●●●●●●●●' : '(aucun)');
        document.getElementById('detail-pwd-eye').textContent = this._detailPasswordVisible ? '🙈' : '👁';
    },

    /* ─── HIGH TICKET TOGGLE ─── */
    async toggleHighTicket() {
        const uuid = this.selectedClient;
        if (!uuid) return;
        const c = this.selectedClientData.client;
        if (!c) return;

        const newVal = !c.is_high_ticket;
        const { error } = await sb.from('profiles').update({ is_high_ticket: newVal }).eq('id', uuid);
        if (error) { this.toast('Erreur: ' + error.message, 'error'); return; }

        c.is_high_ticket = newVal;
        // Update local cache
        const idx = this.clients.findIndex(x => x.id === uuid);
        if (idx >= 0) this.clients[idx].is_high_ticket = newVal;

        // Update UI
        const htLabel = document.getElementById('detail-high-ticket');
        const htBox = document.getElementById('high-ticket-box');
        if (htLabel) {
            htLabel.textContent = newVal ? 'Oui ✨' : 'Non';
            htLabel.style.color = newVal ? '#C9A962' : 'var(--ink-muted,#6b7280)';
        }
        if (htBox) {
            htBox.style.background = newVal ? 'rgba(201,169,98,0.12)' : 'rgba(201,169,98,0.06)';
            htBox.style.borderColor = newVal ? 'rgba(201,169,98,0.3)' : 'rgba(201,169,98,0.15)';
        }

        this.toast(newVal ? 'High Ticket activé ✨' : 'High Ticket désactivé', 'success');
    },

    /* ─── TOAST ─── */
    toast(message, type) {
        const el = document.getElementById('admin-toast');
        el.textContent = message;
        el.className = 'admin-toast show ' + (type || '');
        clearTimeout(this._toastTimer);
        this._toastTimer = setTimeout(() => el.classList.remove('show'), 3000);
    },

    /* ─── PROGRESSION TAB ─── */
    _progressData: {},

    _renderProgressionTab() {
        const container = document.getElementById('progression-content');
        if (!container) return;

        // Parse progress from section_content
        const contentRows = this.selectedClientData.content || [];
        const progressRow = contentRows.find(r => r.section_key === 'progress');
        let progress = {};
        if (progressRow && progressRow.content_value) {
            try { progress = JSON.parse(progressRow.content_value); } catch {}
        }
        // Flatten: progress may have {formulaires:{s1:true,...}, ressources:{m1w1:true,...}} or flat
        if (progress.formulaires || progress.ressources) {
            this._progressData = { ...progress };
        } else {
            this._progressData = { formulaires: {}, ressources: {} };
        }
        const fp = this._progressData.formulaires || {};
        const rp = this._progressData.ressources || {};

        const sections = [
            { title: 'Scénarios Thérapeutiques (S1-S10)', section: 'formulaires', items: [
                {id:'s1',label:'S1 — L\'Étincelle Initiale'},
                {id:'s2',label:'S2 — Le Rythme Discord'},
                {id:'s3',label:'S3 — Les Deux Mondes'},
                {id:'s4',label:'S4 — Le Test Invisible'},
                {id:'s5',label:'S5 — La Danse du Pouvoir'},
                {id:'s6',label:'S6 — L\'Écho du Passé'},
                {id:'s7',label:'S7 — Le Triangle Sacré'},
                {id:'s8',label:'S8 — Le Miroir Dérangeant'},
                {id:'s9',label:'S9 — La Promesse Floue'},
                {id:'s10',label:'S10 — Le Futur se Dessine'}
            ]},
            { title: 'Partie 1 : La Germination (F1.1-F1.6)', section: 'formulaires', items: [
                {id:'f1_1',label:'F1.1 — L\'Espace Sacré'},
                {id:'f1_2',label:'F1.2 — Exploration Intérieure'},
                {id:'f1_3',label:'F1.3 — Le Fil Conducteur'},
                {id:'f1_4',label:'F1.4 — Ton Parcours'},
                {id:'f1_5',label:'F1.5 — Exploration & Transformation'},
                {id:'f1_6',label:'F1.6 — La Boussole Intérieure'}
            ]},
            { title: 'Partie 2 : Les Racines (F2.1-F2.5)', section: 'formulaires', items: [
                {id:'f2_1',label:'F2.1 — Les Fondations'},
                {id:'f2_2',label:'F2.2 — L\'Héritage Émotionnel'},
                {id:'f2_3',label:'F2.3 — Les Échos d\'Enfance'},
                {id:'f2_4',label:'F2.4 — Le Style d\'Attachement'},
                {id:'f2_5',label:'F2.5 — Le Corps Raconte'}
            ]},
            { title: 'Partie 3 : Les Patterns (F3.1-F3.4)', section: 'formulaires', items: [
                {id:'f3_1',label:'F3.1 — Début des Relations'},
                {id:'f3_2',label:'F3.2 — Les Saisons Amoureuses'},
                {id:'f3_3',label:'F3.3 — Racines Entrelacées'},
                {id:'f3_4',label:'F3.4 — Forces & Créativité'}
            ]},
            { title: 'Partie 4 : Les Valeurs (F4.1-F4.3)', section: 'formulaires', items: [
                {id:'f4_1',label:'F4.1 — Spiritualité et Amour'},
                {id:'f4_2',label:'F4.2 — Le Jardin Secret'},
                {id:'f4_3',label:'F4.3 — La Boussole du Coeur'}
            ]},
            { title: 'Partie 5 : Le Bilan Final', section: 'formulaires', items: [
                {id:'f_final',label:'Formulaire Final — Le Bilan'}
            ]},
            { title: 'Formulaires Express (F1-F4)', section: 'formulaires', items: [
                {id:'exp1',label:'F1 — L\'Empreinte (Les racines de ton cœur)'},
                {id:'exp2',label:'F2 — Le Schéma (La danse répétitive)'},
                {id:'exp3',label:'F3 — La Boussole (Ce qui compte vraiment)'},
                {id:'exp4',label:'F4 — Les Forces (L\'engagement, ta transformation)'}
            ]},
            { title: 'Mois 1 — Fondations', section: 'ressources', items: [
                {id:'m1w1',label:'S1 — Introduction au parcours (Vidéo 12min + Guide)'},
                {id:'m1w2',label:'S2 — Comprendre tes schémas (Audio 18min + Guide)'},
                {id:'m1w3',label:'S3 — Bientôt disponible'},
                {id:'m1w4',label:'S4 — Bientôt disponible'}
            ]},
            { title: 'Mois 2 — Les blessures et les masques', section: 'ressources', items: [
                {id:'m2w1',label:'S1 — Les blessures fondamentales (Vidéo 24min + Guide)'},
                {id:'m2w2',label:'S2 — Identifier tes masques (Audio 15min + Guide)'},
                {id:'m2w3',label:'S3 — Bientôt disponible'},
                {id:'m2w4',label:'S4 — Bientôt disponible'}
            ]},
            { title: 'Mois 3 — L\'attachement en Islam', section: 'ressources', items: [
                {id:'m3w1',label:'S1 — Les styles d\'attachement (Vidéo 20min + Guide)'},
                {id:'m3w2',label:'S2 — L\'attachement sécurisant (Audio 12min + Guide)'},
                {id:'m3w3',label:'S3 — Bientôt disponible'},
                {id:'m3w4',label:'S4 — Bientôt disponible'}
            ]},
            { title: 'Mois 4 — Construire des relations saines', section: 'ressources', items: [
                {id:'m4w1',label:'S1 — Les fondations relationnelles (Vidéo 22min + Guide)'},
                {id:'m4w2',label:'S2 — Communication non-violente (Audio 14min + Guide)'},
                {id:'m4w3',label:'S3 — Bientôt disponible'},
                {id:'m4w4',label:'S4 — Bientôt disponible'}
            ]},
            { title: 'Mois 5 — Le chemin vers la paix intérieure', section: 'ressources', items: [
                {id:'m5w1',label:'S1 — La paix intérieure (Vidéo 15min + Guide)'},
                {id:'m5w2',label:'S2 — Méditation du Tawakkul (Audio 8min + Guide)'},
                {id:'m5w3',label:'S3 — Bientôt disponible'},
                {id:'m5w4',label:'S4 — Bientôt disponible'}
            ]},
            { title: 'Mois 6 — Régulation émotionnelle', section: 'ressources', items: [
                {id:'m6w1',label:'S1 — Respiration de régulation (Audio 5min + Guide)'},
                {id:'m6w2',label:'S2 — Gestion des déclencheurs (Vidéo 16min + Guide)'},
                {id:'m6w3',label:'S3 — Bientôt disponible'},
                {id:'m6w4',label:'S4 — Bientôt disponible'}
            ]},
            { title: 'Mois 7 — Dhikr thérapeutique', section: 'ressources', items: [
                {id:'m7w1',label:'S1 — Introduction au Dhikr thérapeutique (Audio 12min + Guide)'},
                {id:'m7w2',label:'S2 — Pratique guidée (Vidéo 18min + Guide)'},
                {id:'m7w3',label:'S3 — Bientôt disponible'},
                {id:'m7w4',label:'S4 — Bientôt disponible'}
            ]},
            { title: 'Mois 8 — Visualisation positive', section: 'ressources', items: [
                {id:'m8w1',label:'S1 — Visualisation et intention (Audio 10min + Guide)'},
                {id:'m8w2',label:'S2 — Ancrer ta vision (Vidéo 14min + Guide)'},
                {id:'m8w3',label:'S3 — Bientôt disponible'},
                {id:'m8w4',label:'S4 — Bientôt disponible'}
            ]},
            { title: 'Mois 9 — Coaching : Les fondations', section: 'ressources', items: [
                {id:'m9w1',label:'S1 — Session coaching Les fondations Partie 1 (Vidéo 1h15 + PDF)'},
                {id:'m9w2',label:'S2 — Integration et exercices (Guide)'},
                {id:'m9w3',label:'S3 — Bientôt disponible'},
                {id:'m9w4',label:'S4 — Bientôt disponible'}
            ]},
            { title: 'Mois 10 — Coaching : Approfondir', section: 'ressources', items: [
                {id:'m10w1',label:'S1 — Session coaching Approfondir Partie 1 (Vidéo 1h20 + PDF)'},
                {id:'m10w2',label:'S2 — Integration et exercices (Guide)'},
                {id:'m10w3',label:'S3 — Bientôt disponible'},
                {id:'m10w4',label:'S4 — Bientôt disponible'}
            ]},
            { title: 'Mois 11 — Consolidation', section: 'ressources', items: [
                {id:'m11w1',label:'S1 — Bientôt disponible'},
                {id:'m11w2',label:'S2 — Bientôt disponible'},
                {id:'m11w3',label:'S3 — Bientôt disponible'},
                {id:'m11w4',label:'S4 — Bientôt disponible'}
            ]},
            { title: 'Mois 12 — Célébration & Perspectives', section: 'ressources', items: [
                {id:'m12w1',label:'S1 — Bientôt disponible'},
                {id:'m12w2',label:'S2 — Bientôt disponible'},
                {id:'m12w3',label:'S3 — Bientôt disponible'},
                {id:'m12w4',label:'S4 — Bientôt disponible'}
            ]},
            { title: 'Ramadan S1 — Purification de l\'intention', section: 'ressources', items: [
                {id:'r1d1',label:'Jour 1 — L\'intention du coeur (Audio 7min)'},
                {id:'r1d2',label:'Jour 2 — Accueillir le mois béni (Audio 6min)'},
                {id:'r1d3',label:'Jour 3 — La patience comme force (Audio 8min)'},
                {id:'r1d4',label:'Jour 4 — Pardonner pour avancer (Audio 7min)'},
                {id:'r1d5',label:'Jour 5 — La gratitude profonde (Audio 5min)'},
                {id:'r1d6',label:'Jour 6 — Le silence intérieur (Audio 6min)'},
                {id:'r1d7',label:'Jour 7 — Bilan de la première semaine (Audio 10min)'}
            ]},
            { title: 'Ramadan S2 — Guérison des blessures', section: 'ressources', items: [
                {id:'r2d1',label:'Jour 8 — Reconnaître ses blessures (Audio 8min)'},
                {id:'r2d2',label:'Jour 9 — L\'enfant intérieur (Audio 9min)'},
                {id:'r2d3',label:'Jour 10 — Libérer la colère (Audio 7min)'},
                {id:'r2d4',label:'Jour 11 — La tristesse comme messagère (Audio 8min)'},
                {id:'r2d5',label:'Jour 12 — La peur et la confiance (Audio 6min)'},
                {id:'r2d6',label:'Jour 13 — Transformer la honte (Audio 7min)'},
                {id:'r2d7',label:'Jour 14 — Bilan de la deuxième semaine (Audio 10min)'}
            ]},
            { title: 'Ramadan S3 — Reconstruction', section: 'ressources', items: [
                {id:'r3d1',label:'Jour 15 — Connaître ta valeur (Audio 7min)'},
                {id:'r3d2',label:'Jour 16 — Les limites saines (Audio 8min)'},
                {id:'r3d3',label:'Jour 17 — Laylat al-Qadr, La nuit du destin (Audio 10min)'},
                {id:'r3d4',label:'Jour 18 — La vision du mariage en Islam (Audio 8min)'},
                {id:'r3d5',label:'Jour 19 — Tes forces intérieures (Audio 6min)'},
                {id:'r3d6',label:'Jour 20 — Construire sur du solide (Audio 7min)'},
                {id:'r3d7',label:'Jour 21 — Bilan de la troisième semaine (Audio 10min)'}
            ]},
            { title: 'Ramadan S4 — Intégration & Célébration', section: 'ressources', items: [
                {id:'r4d1',label:'Jour 22 — L\'amour inconditionnel (Audio 7min)'},
                {id:'r4d2',label:'Jour 23 — La du\'a qui guérit (Audio 8min)'},
                {id:'r4d3',label:'Jour 24 — Le Tawakkul profond (Audio 6min)'},
                {id:'r4d4',label:'Jour 25 — La renaissance (Audio 7min)'},
                {id:'r4d5',label:'Jour 26 — Laylat al-Qadr, Nuit de la puissance (Audio 10min)'},
                {id:'r4d6',label:'Jour 27 — Les dernières nuits (Audio 8min)'},
                {id:'r4d7',label:'Jour 28 — Préparer l\'après-Ramadan (Audio 7min)'},
                {id:'r4d8',label:'Jour 29 — Célébration et gratitude (Audio 6min)'},
                {id:'r4d9',label:'Jour 30 — Eid Mubarak, Ton bilan complet (Audio 10min)'}
            ]}
        ];

        let html = '';
        sections.forEach(sec => {
            const data = sec.section === 'formulaires' ? fp : rp;
            const checked = sec.items.filter(it => data[it.id] === true).length;
            html += '<details class="admin-progress-group" style="margin-bottom:0.75rem">' +
                '<summary style="cursor:pointer;padding:0.6rem 0.75rem;background:rgba(124,58,237,0.04);border-radius:8px;font-weight:600;font-size:0.85rem;display:flex;justify-content:space-between;align-items:center;user-select:none">' +
                '<span>' + sec.title + '</span>' +
                '<span class="admin-progress-counter" style="font-size:0.75rem;color:var(--purple);font-weight:700">' + checked + '/' + sec.items.length + '</span>' +
                '</summary><div style="padding:0.5rem 0">';
            sec.items.forEach(it => {
                const isChecked = data[it.id] === true ? ' checked' : '';
                html += '<label style="display:flex;align-items:center;gap:0.5rem;padding:0.35rem 0.75rem;cursor:pointer;font-size:0.82rem;color:#3d3d3d">' +
                    '<input type="checkbox"' + isChecked + ' onchange="AdminApp.toggleProgress(\'' + sec.section + '\',\'' + it.id + '\',this.checked)">' +
                    ' ' + it.label + '</label>';
            });
            html += '</div></details>';
        });

        container.innerHTML = html;
    },

    async toggleProgress(section, itemId, completed) {
        if (!this._progressData[section]) this._progressData[section] = {};
        this._progressData[section][itemId] = completed;

        const uuid = this.selectedClient;
        if (!uuid) return;

        const progressJson = JSON.stringify(this._progressData);

        // Find existing row
        const contentRows = this.selectedClientData.content || [];
        const existing = contentRows.find(r => r.section_key === 'progress');

        let error;
        if (existing) {
            ({ error } = await sb.from('section_content').update({ content_value: progressJson }).eq('id', existing.id));
            existing.content_value = progressJson;
        } else {
            const { data: newRow, error: insertErr } = await sb.from('section_content')
                .insert({ client_id: uuid, section_key: 'progress', content_value: progressJson })
                .select().single();
            error = insertErr;
            if (newRow) this.selectedClientData.content.push(newRow);
        }

        if (error) { this.toast('Erreur: ' + error.message, 'error'); return; }

        // Update only the counters — do NOT re-render (that would close all accordions)
        this._updateProgressCounters();
    },

    _updateProgressCounters() {
        const container = document.getElementById('progression-content');
        if (!container) return;
        container.querySelectorAll('details.admin-progress-group').forEach(details => {
            const checkboxes = details.querySelectorAll('input[type="checkbox"]');
            const checked = Array.from(checkboxes).filter(cb => cb.checked).length;
            const counterEl = details.querySelector('.admin-progress-counter');
            if (counterEl) counterEl.textContent = checked + '/' + checkboxes.length;
        });
    },

    /* ─── SCORING TAB ─── */
    _renderScoringTab() {
        var container = document.getElementById('scoring-content');
        if (!container) return;

        var contentRows = this.selectedClientData.content || [];
        var scoringRow = contentRows.find(function(r) { return r.section_key === 'scoring_147q'; });
        var scoring = null;
        if (scoringRow && scoringRow.content_value) {
            try { scoring = JSON.parse(scoringRow.content_value); } catch(e) {}
        }

        if (!scoring || !scoring.categories) {
            container.innerHTML = '<div class="admin-list-empty">Aucune donnée de scoring disponible.</div>';
            return;
        }

        var cats = scoring.categories;
        var catLabels = {
            'valeurs': 'Valeurs',
            'attachement': 'Attachement',
            'communication': 'Communication',
            'spiritualite': 'Spiritualité',
            'compatibilite': 'Compatibilité'
        };
        var catIndex = 0;
        var html = '';

        var keys = Object.keys(catLabels);
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            var val = cats[key] || 0;
            catIndex++;
            html += '<div class="scoring-bar-group">' +
                '<div class="scoring-bar-label">' +
                '<span class="scoring-bar-name">' + catLabels[key] + '</span>' +
                '<span class="scoring-bar-value">' + val + '%</span>' +
                '</div>' +
                '<div class="scoring-bar">' +
                '<div class="scoring-bar-fill cat-' + catIndex + '" style="width:' + val + '%"></div>' +
                '</div></div>';
        }

        // Attachment style
        if (scoring.attachment_style) {
            html += '<div style="margin-top:1.25rem;margin-bottom:1rem">' +
                '<span style="font-size:0.75rem;font-weight:600;text-transform:uppercase;letter-spacing:0.04em;color:var(--ink-muted)">Style d\'attachement</span>' +
                '<div style="margin-top:0.4rem"><span class="admin-item-badge actif" style="font-size:0.82rem;padding:0.3rem 0.85rem">' + this._esc(scoring.attachment_style) + '</span></div>' +
                '</div>';
        }

        // Dealbreakers
        if (scoring.dealbreakers && scoring.dealbreakers.length > 0) {
            html += '<div style="margin-top:1rem">' +
                '<span style="font-size:0.75rem;font-weight:600;text-transform:uppercase;letter-spacing:0.04em;color:var(--ink-muted)">Dealbreakers</span>' +
                '<div class="scoring-dealbreakers" style="display:flex;flex-wrap:wrap;gap:0.3rem;margin-top:0.4rem">';
            for (var j = 0; j < scoring.dealbreakers.length; j++) {
                html += '<span class="scoring-dealbreaker-tag">' + this._esc(scoring.dealbreakers[j]) + '</span>';
            }
            html += '</div></div>';
        }

        container.innerHTML = html;
    },

    /* ─── HELPERS ─── */
    _esc(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    },

    _randomDigits(n) {
        let result = '';
        for (let i = 0; i < n; i++) result += Math.floor(Math.random() * 10);
        if (result.charAt(0) === '0') result = String(Math.floor(Math.random() * 9) + 1) + result.slice(1);
        return result;
    },

    /* ─── V2 SCHEMA HELPERS ─── */
    _mapStatutParcours(statut) {
        const archiveStatuts = ['termine', 'desactive'];
        const pauseStatuts = ['inscription'];
        if (archiveStatuts.includes(statut)) return 'archive';
        if (pauseStatuts.includes(statut)) return 'pause';
        return 'actif';
    },

    /* ─── OPEN CHAT FOR SELECTED CLIENT ─── */
    async openChatForClient() {
        const uuid = this.selectedClient;
        if (!uuid) { this.toast('Sélectionnez un client d\'abord', 'error'); return; }
        const c = this.selectedClientData?.client;
        const name = c ? ((c.prenom || '') + ' ' + (c.nom || '')).trim() : '';

        this.toast('Création du canal de discussion...', 'info');
        const channel = await AdminChatManager.createChannelForClient(uuid, name);
        if (channel) {
            this.toast('Chat ouvert !', 'success');
            // Switch to mahram section and select the channel
            this.showSection('mahram');
            setTimeout(() => { MahramManager.selectChannel(channel.id); }, 500);
        } else {
            this.toast('Erreur lors de la création du chat', 'error');
        }
    }
};

/* ─── Auto-init ─── */
document.addEventListener('DOMContentLoaded', () => AdminApp.init());
