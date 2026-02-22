/* ═══════════════════════════════════════
   MY MUQABALA — Form Responses Admin
   View, filter, export form responses
═══════════════════════════════════════ */

const FormResponsesApp = {
    responses: [],
    filteredResponses: [],
    expandedRowId: null,
    page: 0,
    pageSize: 50,
    totalCount: 0,
    searchQuery: '',

    /* ─── Known form IDs with human labels ─── */
    formLabels: {
        's1': 'S1 — L\'Etincelle Initiale',
        's2': 'S2 — Le Rythme Discord',
        's3': 'S3 — Les Deux Mondes',
        's4': 'S4 — Le Test Invisible',
        's5': 'S5 — La Danse du Pouvoir',
        's6': 'S6 — L\'Echo du Passe',
        's7': 'S7 — Le Triangle Sacre',
        's8': 'S8 — Le Miroir Derangeant',
        's9': 'S9 — La Promesse Floue',
        's10': 'S10 — Le Futur se Dessine',
        'f1_1': 'F1.1 — L\'Espace Sacre',
        'f1_2': 'F1.2 — Exploration Interieure',
        'f1_3': 'F1.3 — Le Fil Conducteur',
        'f1_4': 'F1.4 — Ton Parcours',
        'f1_5': 'F1.5 — Exploration & Transformation',
        'f1_6': 'F1.6 — La Boussole Interieure',
        'f2_1': 'F2.1 — Les Fondations',
        'f2_2': 'F2.2 — L\'Heritage Emotionnel',
        'f2_3': 'F2.3 — Les Echos d\'Enfance',
        'f2_4': 'F2.4 — Le Style d\'Attachement',
        'f2_5': 'F2.5 — Le Corps Raconte',
        'f3_1': 'F3.1 — Debut des Relations',
        'f3_2': 'F3.2 — Les Saisons Amoureuses',
        'f3_3': 'F3.3 — Racines Entrelacees',
        'f3_4': 'F3.4 — Forces & Creativite',
        'f4_1': 'F4.1 — Spiritualite et Amour',
        'f4_2': 'F4.2 — Le Jardin Secret',
        'f4_3': 'F4.3 — La Boussole du Coeur',
        'f_final': 'Formulaire Final — Le Bilan',
        'f1_express_v2': 'F1 Express — L\'Empreinte',
        'exp1': 'F1 Express — L\'Empreinte',
        'exp2': 'F2 Express — Le Schema',
        'exp3': 'F3 Express — La Boussole',
        'exp4': 'F4 Express — Les Forces',
    },

    /* ─── INIT ─── */
    async init() {
        const { data: { user }, error: userError } = await sb.auth.getUser();
        if (userError || !user) {
            await sb.auth.signOut();
            window.location.href = '/admin/index.html';
            return;
        }

        // Verify admin/coach role
        const { data: profileData } = await sb.from('profiles').select('role').eq('id', user.id).single();
        if (!profileData || !['coach', 'admin'].includes(profileData.role)) {
            await sb.auth.signOut();
            window.location.href = '/admin/index.html';
            return;
        }

        const userInfo = document.getElementById('admin-user-info');
        if (userInfo) userInfo.textContent = user.email;

        this._populateFormIdDropdown();
        await this.loadData();
    },

    /* ─── LOGOUT ─── */
    async logout() {
        await sb.auth.signOut();
        window.location.href = '/admin/index.html';
    },

    /* ─── POPULATE FORM ID DROPDOWN ─── */
    _populateFormIdDropdown() {
        var select = document.getElementById('filter-form-id');
        if (!select) return;
        // Keep the "Tous" option, append known form ids
        var keys = Object.keys(this.formLabels);
        for (var i = 0; i < keys.length; i++) {
            var opt = document.createElement('option');
            opt.value = keys[i];
            opt.textContent = this.formLabels[keys[i]];
            select.appendChild(opt);
        }
    },

    /* ─── LOAD DATA via RPC ─── */
    async loadData() {
        var formId = document.getElementById('filter-form-id')?.value || null;
        var status = document.getElementById('filter-status')?.value || null;

        this.toast('Chargement...', 'info');

        try {
            var params = {
                p_limit: 500,
                p_offset: 0
            };
            if (formId) params.p_form_id = formId;
            if (status) params.p_status = status;

            var { data, error } = await sb.rpc('get_form_responses', params);

            if (error) {
                // Fallback: try direct table query if RPC not available
                console.warn('RPC get_form_responses failed, trying direct query:', error.message);
                await this._loadDirectQuery(formId, status);
                return;
            }

            if (data && data.success) {
                this.responses = data.data || [];
                this.totalCount = data.total || this.responses.length;
            } else if (data && !data.success) {
                this.toast('Erreur: ' + (data.error || 'Inconnu'), 'error');
                this.responses = [];
                this.totalCount = 0;
            } else {
                this.responses = [];
                this.totalCount = 0;
            }
        } catch (err) {
            console.error('loadData error:', err);
            // Fallback to direct query
            await this._loadDirectQuery(formId, status);
            return;
        }

        this._applyClientFilters();
        this.toast(this.responses.length + ' reponse(s) chargee(s)', 'success');
    },

    /* ─── FALLBACK: Direct table query ─── */
    async _loadDirectQuery(formId, status) {
        var query = sb.from('form_responses')
            .select('id, form_id, status, answers, created_at, updated_at, completed_at, client_id')
            .order('updated_at', { ascending: false })
            .limit(500);

        if (formId) query = query.eq('form_id', formId);
        if (status) query = query.eq('status', status);

        var { data: frData, error: frError } = await query;
        if (frError) {
            this.toast('Erreur: ' + frError.message, 'error');
            this.responses = [];
            this.totalCount = 0;
            this._applyClientFilters();
            return;
        }

        // Enrich with client info (batch lookup)
        var responses = frData || [];
        if (responses.length > 0) {
            var clientIds = [...new Set(responses.map(function(r) { return r.client_id; }))];
            // Try profiles first, then clients
            var { data: profiles } = await sb.from('profiles')
                .select('id, prenom, telephone')
                .in('id', clientIds);

            if (!profiles || profiles.length === 0) {
                var { data: clients } = await sb.from('clients')
                    .select('id, prenom, telephone')
                    .in('id', clientIds);
                profiles = clients || [];
            }

            var profileMap = {};
            for (var i = 0; i < (profiles || []).length; i++) {
                profileMap[profiles[i].id] = profiles[i];
            }

            for (var j = 0; j < responses.length; j++) {
                var p = profileMap[responses[j].client_id];
                if (p) {
                    responses[j].prenom = p.prenom;
                    responses[j].telephone = p.telephone;
                }
            }
        }

        this.responses = responses;
        this.totalCount = responses.length;
        this._applyClientFilters();
        this.toast(this.responses.length + ' reponse(s) chargee(s)', 'success');
    },

    /* ─── FILTER / SEARCH ─── */
    applyFilters() {
        this.page = 0;
        this.loadData();
    },

    onSearch(value) {
        this.searchQuery = (value || '').toLowerCase().trim();
        this.page = 0;
        this._applyClientFilters();
    },

    _applyClientFilters() {
        var self = this;
        var dateFrom = document.getElementById('filter-date-from')?.value || '';
        var dateTo = document.getElementById('filter-date-to')?.value || '';

        this.filteredResponses = this.responses.filter(function(r) {
            // Text search
            if (self.searchQuery) {
                var haystack = ((r.prenom || '') + ' ' + (r.telephone || '') + ' ' + (r.form_id || '')).toLowerCase();
                if (haystack.indexOf(self.searchQuery) === -1) return false;
            }
            // Date range filter (client-side)
            if (dateFrom) {
                var rDate = (r.updated_at || r.created_at || '').substring(0, 10);
                if (rDate < dateFrom) return false;
            }
            if (dateTo) {
                var rDate2 = (r.updated_at || r.created_at || '').substring(0, 10);
                if (rDate2 > dateTo) return false;
            }
            return true;
        });

        // Update total count badge
        var countEl = document.getElementById('fr-total-count');
        if (countEl) countEl.textContent = this.filteredResponses.length;

        // Discover new form IDs from data and add to dropdown
        this._updateFormIdDropdown();

        this.renderTable();
    },

    /* ─── UPDATE FORM ID DROPDOWN WITH DISCOVERED IDS ─── */
    _updateFormIdDropdown() {
        var select = document.getElementById('filter-form-id');
        if (!select) return;

        var existingOptions = {};
        for (var i = 0; i < select.options.length; i++) {
            existingOptions[select.options[i].value] = true;
        }

        for (var j = 0; j < this.responses.length; j++) {
            var fid = this.responses[j].form_id;
            if (fid && !existingOptions[fid]) {
                var opt = document.createElement('option');
                opt.value = fid;
                opt.textContent = this.formLabels[fid] || fid;
                select.appendChild(opt);
                existingOptions[fid] = true;
            }
        }
    },

    /* ─── RENDER TABLE ─── */
    renderTable() {
        var tbody = document.getElementById('fr-table-body');
        if (!tbody) return;

        var start = this.page * this.pageSize;
        var end = Math.min(start + this.pageSize, this.filteredResponses.length);
        var pageData = this.filteredResponses.slice(start, end);

        if (pageData.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" class="fr-empty">Aucune reponse trouvee.</td></tr>';
            this._updatePagination(start, end);
            return;
        }

        var html = '';
        for (var i = 0; i < pageData.length; i++) {
            var r = pageData[i];
            var answerCount = this._countAnswers(r.answers);
            var statusClass = r.status === 'completed' ? 'completed' : 'in_progress';
            var statusLabel = r.status === 'completed' ? 'Termine' : 'En cours';
            var updatedDate = r.updated_at ? new Date(r.updated_at).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '--';
            var formLabel = this.formLabels[r.form_id] || r.form_id || '--';
            var isExpanded = this.expandedRowId === r.id;

            html += '<tr class="' + (isExpanded ? 'fr-expanded' : '') + '" onclick="FormResponsesApp.toggleRow(\'' + r.id + '\')">' +
                '<td style="font-weight:600;color:var(--ink)">' + this._esc(r.prenom || 'Inconnu') + '</td>' +
                '<td>' + this._esc(r.telephone || '--') + '</td>' +
                '<td><span style="font-size:0.78rem">' + this._esc(formLabel) + '</span></td>' +
                '<td><span class="fr-status ' + statusClass + '">' + statusLabel + '</span></td>' +
                '<td style="text-align:center">' + answerCount + '</td>' +
                '<td style="font-size:0.78rem;color:var(--ink-muted)">' + updatedDate + '</td>' +
                '</tr>';

            // Expanded detail row
            if (isExpanded) {
                html += '<tr class="fr-detail-row"><td colspan="6">' +
                    '<div class="fr-detail-inner">' +
                    '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem">' +
                    '<h4>Reponses — ' + this._esc(formLabel) + '</h4>' +
                    '<button class="admin-btn admin-btn-sm" onclick="event.stopPropagation();FormResponsesApp.openModal(\'' + r.id + '\')">Vue complete</button>' +
                    '</div>' +
                    this._renderAnswers(r.answers, 5) +
                    (answerCount > 5 ? '<div style="margin-top:0.5rem;font-size:0.78rem;color:var(--ink-muted);font-style:italic">+ ' + (answerCount - 5) + ' reponse(s) supplementaire(s) — cliquer "Vue complete"</div>' : '') +
                    '</div></td></tr>';
            }
        }

        tbody.innerHTML = html;
        this._updatePagination(start, end);
    },

    /* ─── TOGGLE ROW ─── */
    toggleRow(id) {
        this.expandedRowId = this.expandedRowId === id ? null : id;
        this.renderTable();
    },

    /* ─── OPEN MODAL ─── */
    openModal(id) {
        var r = this._findById(id);
        if (!r) return;

        var formLabel = this.formLabels[r.form_id] || r.form_id || '--';
        document.getElementById('fr-modal-title').textContent = 'Reponses — ' + formLabel;

        var metaHtml = '<span>Client: <strong>' + this._esc(r.prenom || 'Inconnu') + '</strong></span>' +
            '<span>Tel: ' + this._esc(r.telephone || '--') + '</span>' +
            '<span>Statut: ' + (r.status === 'completed' ? 'Termine' : 'En cours') + '</span>';
        if (r.completed_at) {
            metaHtml += '<span>Termine le: ' + new Date(r.completed_at).toLocaleDateString('fr-FR') + '</span>';
        }
        document.getElementById('fr-modal-meta').innerHTML = metaHtml;

        document.getElementById('fr-modal-answers').innerHTML = this._renderAnswers(r.answers, 0);

        document.getElementById('fr-modal-overlay').classList.add('open');
    },

    /* ─── CLOSE MODAL ─── */
    closeModal(event) {
        if (event && event.target !== event.currentTarget && !event.target.classList.contains('fr-modal-close')) return;
        document.getElementById('fr-modal-overlay').classList.remove('open');
    },

    /* ─── RENDER ANSWERS ─── */
    _renderAnswers(answers, limit) {
        if (!answers || typeof answers !== 'object') {
            return '<div class="fr-empty" style="padding:1rem">Aucune reponse enregistree.</div>';
        }

        var keys = Object.keys(answers);
        if (keys.length === 0) {
            return '<div class="fr-empty" style="padding:1rem">Aucune reponse enregistree.</div>';
        }

        var displayKeys = limit > 0 ? keys.slice(0, limit) : keys;
        var html = '<div class="fr-answer-list">';

        for (var i = 0; i < displayKeys.length; i++) {
            var key = displayKeys[i];
            var value = answers[key];
            var questionLabel = this._formatQuestionLabel(key);
            var answerHtml = this._formatAnswerValue(value);

            html += '<div class="fr-answer-item">' +
                '<div class="fr-answer-question">' + this._esc(questionLabel) + '</div>' +
                '<div class="fr-answer-value">' + answerHtml + '</div>' +
                '</div>';
        }

        html += '</div>';
        return html;
    },

    /* ─── FORMAT QUESTION LABEL ─── */
    _formatQuestionLabel(key) {
        // Try to make the key more readable
        // e.g. "q1" -> "Question 1", "question_about_values" -> "Question about values"
        if (/^q\d+$/i.test(key)) {
            return 'Question ' + key.substring(1);
        }
        // Replace underscores with spaces and capitalize first letter
        var label = key.replace(/_/g, ' ').replace(/^\w/, function(c) { return c.toUpperCase(); });
        return label;
    },

    /* ─── FORMAT ANSWER VALUE ─── */
    _formatAnswerValue(value) {
        if (value === null || value === undefined) return '<em style="color:var(--ink-faint)">Pas de reponse</em>';

        if (typeof value === 'string') {
            // Check if it's an audio URL
            if (this._isAudioUrl(value)) {
                return '<audio controls preload="none"><source src="' + this._esc(value) + '"></audio>' +
                    '<div style="font-size:0.72rem;color:var(--ink-faint);margin-top:0.2rem">' + this._esc(value) + '</div>';
            }
            // Check if it's any other URL
            if (/^https?:\/\//i.test(value)) {
                return '<a href="' + this._esc(value) + '" target="_blank" rel="noopener" style="color:var(--purple);word-break:break-all">' + this._esc(value) + '</a>';
            }
            return this._esc(value);
        }

        if (typeof value === 'boolean') {
            return value ? 'Oui' : 'Non';
        }

        if (typeof value === 'number') {
            return String(value);
        }

        if (Array.isArray(value)) {
            if (value.length === 0) return '<em style="color:var(--ink-faint)">Liste vide</em>';
            return '<ul style="margin:0;padding-left:1.2rem">' +
                value.map(function(v) { return '<li>' + FormResponsesApp._formatAnswerValue(v) + '</li>'; }).join('') +
                '</ul>';
        }

        if (typeof value === 'object') {
            // Render nested object
            var html = '<div style="padding-left:0.75rem;border-left:2px solid var(--card-border)">';
            var objKeys = Object.keys(value);
            for (var k = 0; k < objKeys.length; k++) {
                html += '<div style="margin-bottom:0.3rem">' +
                    '<span style="font-weight:600;font-size:0.78rem;color:var(--ink-muted)">' + this._esc(objKeys[k]) + ':</span> ' +
                    this._formatAnswerValue(value[objKeys[k]]) +
                    '</div>';
            }
            html += '</div>';
            return html;
        }

        return this._esc(String(value));
    },

    /* ─── CHECK AUDIO URL ─── */
    _isAudioUrl(str) {
        if (typeof str !== 'string') return false;
        var lower = str.toLowerCase();
        return /\.(mp3|wav|ogg|m4a|aac|webm|opus)(\?|$)/i.test(lower) ||
            (lower.indexOf('audio') > -1 && /^https?:\/\//.test(lower));
    },

    /* ─── PAGINATION ─── */
    _updatePagination(start, end) {
        var total = this.filteredResponses.length;
        var infoEl = document.getElementById('fr-pagination-info');
        if (infoEl) {
            if (total === 0) {
                infoEl.textContent = '0 reponses';
            } else {
                infoEl.textContent = (start + 1) + '-' + end + ' sur ' + total;
            }
        }

        var prevBtn = document.getElementById('fr-btn-prev');
        var nextBtn = document.getElementById('fr-btn-next');
        if (prevBtn) prevBtn.disabled = this.page === 0;
        if (nextBtn) nextBtn.disabled = end >= total;
    },

    prevPage() {
        if (this.page > 0) {
            this.page--;
            this.expandedRowId = null;
            this.renderTable();
        }
    },

    nextPage() {
        var maxPage = Math.ceil(this.filteredResponses.length / this.pageSize) - 1;
        if (this.page < maxPage) {
            this.page++;
            this.expandedRowId = null;
            this.renderTable();
        }
    },

    /* ─── EXPORT JSON ─── */
    exportJSON() {
        var data = this.filteredResponses;
        if (data.length === 0) { this.toast('Rien a exporter', 'error'); return; }

        var exportData = data.map(function(r) {
            return {
                id: r.id,
                form_id: r.form_id,
                form_label: FormResponsesApp.formLabels[r.form_id] || r.form_id,
                status: r.status,
                client_prenom: r.prenom || '',
                client_telephone: r.telephone || '',
                answers: r.answers,
                created_at: r.created_at,
                updated_at: r.updated_at,
                completed_at: r.completed_at
            };
        });

        var jsonStr = JSON.stringify(exportData, null, 2);
        var blob = new Blob([jsonStr], { type: 'application/json;charset=utf-8' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        var ts = new Date().toISOString().replace(/[:.]/g, '-').substring(0, 19);
        a.download = 'form-responses-' + ts + '.json';
        a.click();
        URL.revokeObjectURL(url);

        this.toast(data.length + ' reponse(s) exportee(s) en JSON', 'success');
    },

    /* ─── EXPORT CSV ─── */
    exportCSV() {
        var data = this.filteredResponses;
        if (data.length === 0) { this.toast('Rien a exporter', 'error'); return; }

        // Collect all unique answer keys across all responses
        var allKeys = {};
        for (var i = 0; i < data.length; i++) {
            if (data[i].answers && typeof data[i].answers === 'object') {
                var keys = Object.keys(data[i].answers);
                for (var j = 0; j < keys.length; j++) {
                    allKeys[keys[j]] = true;
                }
            }
        }
        var answerKeys = Object.keys(allKeys).sort();

        // Build CSV header
        var sep = ';';
        var headers = ['ID', 'Formulaire', 'Statut', 'Client', 'Telephone', 'Date_creation', 'Date_MAJ', 'Date_completion'];
        for (var k = 0; k < answerKeys.length; k++) {
            headers.push(this._csvSafe(answerKeys[k]));
        }
        var csv = headers.join(sep) + '\n';

        // Build rows
        for (var r = 0; r < data.length; r++) {
            var row = data[r];
            var cols = [
                row.id || '',
                this.formLabels[row.form_id] || row.form_id || '',
                row.status || '',
                row.prenom || '',
                row.telephone || '',
                row.created_at ? row.created_at.substring(0, 10) : '',
                row.updated_at ? row.updated_at.substring(0, 10) : '',
                row.completed_at ? row.completed_at.substring(0, 10) : ''
            ];
            for (var ak = 0; ak < answerKeys.length; ak++) {
                var val = row.answers ? row.answers[answerKeys[ak]] : '';
                cols.push(this._csvSafe(this._flattenValue(val)));
            }
            csv += cols.join(sep) + '\n';
        }

        var blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        var ts = new Date().toISOString().replace(/[:.]/g, '-').substring(0, 19);
        a.download = 'form-responses-' + ts + '.csv';
        a.click();
        URL.revokeObjectURL(url);

        this.toast(data.length + ' reponse(s) exportee(s) en CSV', 'success');
    },

    /* ─── HELPERS ─── */
    _countAnswers(answers) {
        if (!answers || typeof answers !== 'object') return 0;
        return Object.keys(answers).length;
    },

    _findById(id) {
        for (var i = 0; i < this.responses.length; i++) {
            if (this.responses[i].id === id) return this.responses[i];
        }
        return null;
    },

    _esc(str) {
        var div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    },

    _csvSafe(str) {
        if (str === null || str === undefined) return '';
        var s = String(str);
        // Escape quotes and wrap if contains separator, quotes, or newlines
        if (s.indexOf(';') > -1 || s.indexOf('"') > -1 || s.indexOf('\n') > -1) {
            return '"' + s.replace(/"/g, '""') + '"';
        }
        return s;
    },

    _flattenValue(val) {
        if (val === null || val === undefined) return '';
        if (typeof val === 'string') return val;
        if (typeof val === 'number' || typeof val === 'boolean') return String(val);
        if (Array.isArray(val)) return val.map(function(v) { return FormResponsesApp._flattenValue(v); }).join(', ');
        if (typeof val === 'object') return JSON.stringify(val);
        return String(val);
    },

    /* ─── TOAST ─── */
    toast(message, type) {
        var el = document.getElementById('admin-toast');
        if (!el) return;
        el.textContent = message;
        el.className = 'admin-toast show ' + (type || '');
        clearTimeout(this._toastTimer);
        this._toastTimer = setTimeout(function() { el.classList.remove('show'); }, 3000);
    }
};

/* ─── Auto-init ─── */
document.addEventListener('DOMContentLoaded', function() { FormResponsesApp.init(); });
