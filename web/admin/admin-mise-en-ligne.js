/* ═══════════════════════════════════════
   MY MUQABALA — Mise en ligne Manager v2
   Direct DB insert into section_content
   No more static files or Storage upload
═══════════════════════════════════════ */

const MiseEnLigneManager = {
    pendingFiles: [], // {file, type, status}
    results: [],      // {telephone, prenom, password, isNew, status, error}
    _initialized: false,

    /* ─── INIT ─── */
    init() {
        if (this._initialized) {
            this.loadHistory();
            return;
        }
        this._initialized = true;

        // Make upload zones clickable
        document.querySelectorAll('.mel-upload-zone').forEach(zone => {
            zone.addEventListener('click', () => {
                zone.querySelector('input[type="file"]').click();
            });
        });

        this.loadHistory();
    },

    /* ─── DRAG & DROP ─── */
    dragOver(e) {
        e.preventDefault();
        e.stopPropagation();
        e.currentTarget.classList.add('dragover');
    },

    dragLeave(e) {
        e.preventDefault();
        e.stopPropagation();
        e.currentTarget.classList.remove('dragover');
    },

    drop(e) {
        e.preventDefault();
        e.stopPropagation();
        const zone = e.currentTarget;
        zone.classList.remove('dragover');
        const type = zone.dataset.type;
        this.handleFiles(e.dataTransfer.files, type);
    },

    /* ─── HANDLE FILES ─── */
    handleFiles(files, type) {
        for (const file of files) {
            const ext = file.name.split('.').pop().toLowerCase();
            if (!['html', 'txt'].includes(ext)) {
                AdminApp.toast('Fichier ignor\u00e9 : ' + file.name + ' (seuls .html et .txt sont accept\u00e9s)', 'error');
                continue;
            }
            this.pendingFiles.push({ file, type, status: 'pending' });
        }
        this._renderPendingList();
    },

    /* ─── REMOVE PENDING ─── */
    removePending(index) {
        this.pendingFiles.splice(index, 1);
        this._renderPendingList();
    },

    /* ─── RENDER PENDING LIST ─── */
    _renderPendingList() {
        const container = document.getElementById('mel-pending-list');
        const countEl = document.getElementById('mel-pending-count');
        const btn = document.getElementById('mel-process-btn');

        if (countEl) countEl.textContent = this.pendingFiles.length;
        if (btn) btn.disabled = this.pendingFiles.length === 0;

        if (this.pendingFiles.length === 0) {
            container.innerHTML = '<div class="admin-list-empty">Glisse des fichiers dans les zones ci-dessus.</div>';
            return;
        }

        container.innerHTML = this.pendingFiles.map((item, i) => {
            const statusClass = item.status || 'pending';
            const statusLabel = { pending: 'En attente', uploading: 'Traitement...', done: 'OK', error: 'Erreur' }[statusClass] || statusClass;
            return '<div class="mel-file-item">' +
                '<span class="mel-file-type">' + item.type + '</span>' +
                '<span class="mel-file-name">' + this._esc(item.file.name) + '</span>' +
                '<span class="mel-file-status ' + statusClass + '">' + statusLabel + '</span>' +
                (item.status === 'pending' ? '<button class="mel-file-remove" onclick="MiseEnLigneManager.removePending(' + i + ')" title="Retirer">\u2715</button>' : '') +
                '</div>';
        }).join('');
    },

    /* ─── EXTRACT PHONE FROM FILENAME ─── */
    _extractPhone(filename) {
        const stem = filename.replace(/\.[^.]+$/, '');
        const match = stem.match(/(\+?\d{10,15})/);
        if (!match) return null;
        let digits = match[1].replace(/[^\d]/g, '');
        if (digits.startsWith('0033')) digits = '33' + digits.slice(4);
        else if (digits.startsWith('0') && digits.length === 10) digits = '33' + digits.slice(1);
        return '+' + digits;
    },

    /* ─── EXTRACT PRENOM FROM FILENAME ─── */
    _extractPrenom(filename) {
        const stem = filename.replace(/\.[^.]+$/, '');
        // Pattern: +33612345678_Fatima.html → Fatima
        if (stem.includes('_')) {
            const parts = stem.split('_');
            // Skip DOC_XX patterns
            if (!parts[0].startsWith('DOC')) {
                return parts.slice(1).join('_');
            }
        }
        return '';
    },

    /* ─── EXTRACT DOC KEY FROM CARTOGRAPHIE FILENAME ─── */
    _extractDocKey(filename) {
        const match = filename.match(/^(DOC_\d+[A-Z]?)/i);
        if (match) return match[1].toUpperCase();
        if (filename.toUpperCase().startsWith('PROTOCOLE')) return 'PROTOCOLE';
        return filename.replace(/\.[^.]+$/, '');
    },

    /* ─── EXTRACT TITLE FROM HTML ─── */
    _extractTitle(html) {
        const match = html.match(/<h[12][^>]*>(.*?)<\/h[12]>/i);
        if (match) {
            return match[1].replace(/<[^>]+>/g, '').trim();
        }
        return '';
    },

    /* ─── MAP TYPE → section_key / content_key ─── */
    _mapType(type, filename) {
        if (type === 'compte-rendu') {
            return { section_key: 'compte_rendu', content_key: 'CR_001', titre: 'Compte-Rendu Personnalis\u00e9' };
        }
        if (type === 'plan-action') {
            return { section_key: 'page_de_vente', content_key: 'PDV_001', titre: 'Programme Personnalis\u00e9' };
        }
        if (type === 'cartographie') {
            const ck = this._extractDocKey(filename);
            return { section_key: 'cartographie', content_key: ck, titre: '' }; // titre extracted from HTML
        }
        return null;
    },

    /* ─── FIND OR CREATE PROFILE ─── */
    async _findOrCreateProfile(phone, prenom) {
        // 1. Check existing profile
        const { data: existing } = await sb
            .from('profiles')
            .select('id,prenom')
            .eq('telephone', phone)
            .single();

        if (existing) {
            return { uuid: existing.id, prenom: existing.prenom || prenom, password: null, isNew: false };
        }

        // 2. Create via Edge Function
        const { data: created, error: createErr } = await sb.functions.invoke('create-client', {
            body: { telephone: phone, prenom: prenom || 'Client', genre: 'femme' }
        });

        if (createErr) throw new Error('Cr\u00e9ation profil: ' + (createErr.message || createErr));

        const result = typeof created === 'string' ? JSON.parse(created) : created;
        return {
            uuid: result.user_id || result.id,
            prenom: prenom || result.prenom || 'Client',
            password: result.password || null,
            isNew: true
        };
    },

    /* ─── PROCESS ALL: Direct DB insert ─── */
    async processAll() {
        if (this.pendingFiles.length === 0) return;

        const btn = document.getElementById('mel-process-btn');
        if (btn) { btn.disabled = true; btn.textContent = 'Publication en cours...'; }

        this.results = [];
        let successCount = 0;
        let errorCount = 0;

        // Group files by phone number for cartographie (multi-file)
        const grouped = {};
        for (const item of this.pendingFiles) {
            if (item.status === 'done') continue;
            const phone = this._extractPhone(item.file.name);
            const key = phone || item.file.name;
            if (!grouped[key]) grouped[key] = [];
            grouped[key].push(item);
        }

        for (const [key, items] of Object.entries(grouped)) {
            const phone = this._extractPhone(items[0].file.name);
            if (!phone) {
                for (const item of items) {
                    item.status = 'error';
                    item.errorMsg = 'Impossible d\'extraire le t\u00e9l\u00e9phone du nom de fichier';
                    errorCount++;
                }
                this._renderPendingList();
                continue;
            }

            // Mark all items as processing
            for (const item of items) {
                item.status = 'uploading';
            }
            this._renderPendingList();

            try {
                const prenom = this._extractPrenom(items[0].file.name);
                const profile = await this._findOrCreateProfile(phone, prenom);

                // Process each file
                for (const item of items) {
                    try {
                        const content = await this._readFileAsText(item.file);
                        const mapping = this._mapType(item.type, item.file.name);
                        if (!mapping) throw new Error('Type non support\u00e9: ' + item.type);

                        // For cartographie, extract title from HTML
                        let titre = mapping.titre || this._extractTitle(content) || mapping.content_key;

                        const { error: upsertErr } = await sb
                            .from('section_content')
                            .upsert({
                                client_id: profile.uuid,
                                section_key: mapping.section_key,
                                content_key: mapping.content_key,
                                titre: titre,
                                contenu_html: content
                            }, { onConflict: 'client_id,section_key,content_key' });

                        if (upsertErr) throw upsertErr;

                        item.status = 'done';
                        successCount++;
                    } catch (fileErr) {
                        item.status = 'error';
                        item.errorMsg = fileErr.message || String(fileErr);
                        errorCount++;
                    }
                    this._renderPendingList();
                }

                // Collect result for this phone
                this.results.push({
                    telephone: phone,
                    prenom: profile.prenom,
                    password: profile.password,
                    isNew: profile.isNew,
                    status: 'ok',
                    filesCount: items.filter(i => i.status === 'done').length
                });

            } catch (err) {
                for (const item of items) {
                    if (item.status !== 'done') {
                        item.status = 'error';
                        item.errorMsg = err.message || String(err);
                        errorCount++;
                    }
                }
                this.results.push({
                    telephone: phone,
                    prenom: '',
                    password: null,
                    isNew: false,
                    status: 'error',
                    error: err.message || String(err)
                });
                this._renderPendingList();
            }
        }

        // Remove successful items after a delay
        setTimeout(() => {
            this.pendingFiles = this.pendingFiles.filter(f => f.status !== 'done');
            this._renderPendingList();
        }, 2000);

        if (btn) { btn.disabled = false; btn.textContent = 'Publier'; }

        if (successCount > 0) AdminApp.toast(successCount + ' fichier(s) publi\u00e9(s)', 'success');
        if (errorCount > 0) AdminApp.toast(errorCount + ' erreur(s)', 'error');

        this._renderResults();
        this.loadHistory();
    },

    /* ─── RENDER RESULTS TABLE ─── */
    _renderResults() {
        const container = document.getElementById('mel-results');
        if (!container || this.results.length === 0) return;

        container.style.display = 'block';

        const tbody = this.results.map(r => {
            const statusBadge = r.isNew
                ? '<span style="color:var(--sage);font-weight:600">Nouveau</span>'
                : '<span style="color:var(--ink-muted)">Existant</span>';
            const pwd = r.password
                ? '<span class="mel-pwd" onclick="this.textContent=this.dataset.pwd" data-pwd="' + this._esc(r.password) + '" style="cursor:pointer;color:var(--purple);font-weight:600">Afficher</span>'
                : '<span style="color:var(--ink-faint)">\u2014</span>';
            const files = r.filesCount ? r.filesCount + ' fichier(s)' : '';
            const errMsg = r.status === 'error' ? '<span style="color:var(--fail,red);font-size:0.75rem">' + this._esc(r.error) + '</span>' : '';
            return '<tr>' +
                '<td>' + this._esc(r.telephone) + '</td>' +
                '<td>' + this._esc(r.prenom) + '</td>' +
                '<td>' + statusBadge + '</td>' +
                '<td>' + pwd + '</td>' +
                '<td>' + files + errMsg + '</td>' +
                '</tr>';
        }).join('');

        container.querySelector('tbody').innerHTML = tbody;
    },

    /* ─── DOWNLOAD CSV ─── */
    downloadCSV() {
        if (this.results.length === 0) return;

        const smsTemplate = "Assalamu 'Alaykum {prenom},\n\nTon espace My Muqabala est pret !\n\nConnecte-toi sur l'app ou sur https://my-muqabala.fr/dashboard-login.html\n\nTes identifiants :\nTelephone : {telephone}\nMot de passe : {password}\n\nCe message est personnel et confidentiel.\n\nAvec toute ma bienveillance,\nMohamed";

        const rows = [['Telephone', 'Prenom', 'Mot_de_passe', 'Nouveau_compte', 'Message_SMS'].join(';')];

        for (const r of this.results) {
            if (r.status === 'error') continue;
            const pwd = r.password || '';
            const nouveau = r.isNew ? 'Oui' : 'Non';
            const msg = r.password
                ? smsTemplate.replace('{prenom}', r.prenom).replace('{telephone}', r.telephone).replace('{password}', r.password)
                : '';
            rows.push([r.telephone, r.prenom, pwd, nouveau, '"' + msg.replace(/"/g, '""') + '"'].join(';'));
        }

        const blob = new Blob(['\uFEFF' + rows.join('\n')], { type: 'text/csv;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'identifiants-' + new Date().toISOString().slice(0, 10) + '.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    },

    /* ─── LOAD HISTORY from section_content ─── */
    async loadHistory() {
        const container = document.getElementById('mel-history-list');
        if (!container) return;

        // Show recent section_content entries (last 50)
        const { data, error } = await sb
            .from('section_content')
            .select('client_id, section_key, content_key, titre, updated_at, profiles!inner(prenom, telephone)')
            .not('contenu_html', 'is', null)
            .order('updated_at', { ascending: false })
            .limit(50);

        if (error) {
            container.innerHTML = '<div class="admin-list-empty">Erreur : ' + (error.message || error) + '</div>';
            return;
        }

        if (!data || data.length === 0) {
            container.innerHTML = '<div class="admin-list-empty">Aucun contenu publi\u00e9.</div>';
            return;
        }

        container.innerHTML = data.map(row => {
            const profile = row.profiles || {};
            const date = row.updated_at ? new Date(row.updated_at).toLocaleString('fr-FR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }) : '';

            return '<div class="mel-file-item">' +
                '<span class="mel-file-type">' + row.section_key + '</span>' +
                '<span class="mel-file-name">' + this._esc(profile.prenom || '') + ' — ' + this._esc(row.titre || row.content_key) + '</span>' +
                '<span style="font-size:0.75rem;color:var(--ink-muted)">' + this._esc(profile.telephone || '') + '</span>' +
                '<span style="font-size:0.72rem;color:var(--ink-faint)">' + date + '</span>' +
                '<span class="mel-file-status done">Publi\u00e9</span>' +
                '</div>';
        }).join('');
    },

    /* ─── HELPERS ─── */
    _readFileAsText(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = () => reject(reader.error);
            reader.readAsText(file, 'UTF-8');
        });
    },

    _esc(str) {
        const div = document.createElement('div');
        div.textContent = str || '';
        return div.innerHTML;
    }
};
