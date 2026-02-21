/* ═══════════════════════════════════════
   MY MUQABALA — Invitation Manager
   Manages invitations CRUD
═══════════════════════════════════════ */

const InvitationManager = {
    invitations: [],

    async init() { await this.loadInvitations(); },

    async loadInvitations() {
        const { data, error } = await sb.from('invitations')
            .select('*').order('created_at', { ascending: false });
        if (error) { AdminApp.toast('Erreur chargement invitations', 'error'); return; }
        this.invitations = data || [];
        this.render();
    },

    render() {
        const container = document.getElementById('invitations-list');
        if (!container) return;

        const countEl = document.getElementById('invitation-count');
        if (countEl) countEl.textContent = this.invitations.length;

        if (this.invitations.length === 0) {
            container.innerHTML = '<div class="admin-list-empty" style="padding:2rem">Aucune invitation envoyée.</div>';
            return;
        }

        container.innerHTML = this.invitations.map(inv => {
            var statusClass = inv.status === 'accepted' ? 'actif' : inv.status === 'expired' ? 'inactif' : 'en_attente';
            var statusLabel = inv.status === 'accepted' ? 'Acceptée' : inv.status === 'expired' ? 'Expirée' : 'En attente';
            var dateStr = new Date(inv.created_at).toLocaleDateString('fr-FR');
            return '<div class="admin-item-card">' +
                '<div class="admin-item-info">' +
                '<div class="admin-item-title">' + AdminApp._esc(inv.prenom || '') + ' ' + AdminApp._esc(inv.nom || '') + '</div>' +
                '<div class="admin-item-sub">' + AdminApp._esc(inv.telephone || '') + ' — ' + dateStr + '</div>' +
                '</div>' +
                '<span class="admin-item-badge ' + statusClass + '">' + statusLabel + '</span>' +
                '</div>';
        }).join('');
    },

    async create(e) {
        e.preventDefault();
        var data = {
            prenom: document.getElementById('inv-prenom').value.trim(),
            nom: document.getElementById('inv-nom').value.trim(),
            telephone: document.getElementById('inv-telephone').value.trim(),
            email: document.getElementById('inv-email').value.trim(),
            status: 'pending',
            expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
        };
        if (!data.telephone) { AdminApp.toast('Téléphone obligatoire', 'error'); return; }

        var { error } = await sb.from('invitations').insert(data);
        if (error) { AdminApp.toast('Erreur: ' + error.message, 'error'); return; }

        // Reset form
        ['inv-prenom', 'inv-nom', 'inv-telephone', 'inv-email'].forEach(function(id) {
            document.getElementById(id).value = '';
        });
        await this.loadInvitations();
        AdminApp.toast('Invitation envoyée à ' + data.prenom, 'success');
    },

    async importCSV() {
        var self = this;
        var input = document.createElement('input');
        input.type = 'file';
        input.accept = '.csv';
        input.onchange = async function(e) {
            var file = e.target.files[0];
            if (!file) return;
            var text = await file.text();
            var lines = text.split('\n').filter(function(l) { return l.trim(); });
            var imported = 0;
            for (var i = 1; i < lines.length; i++) {
                var cols = lines[i].split(',').map(function(c) { return c.trim().replace(/^"|"$/g, ''); });
                if (cols.length < 3) continue;
                var row = {
                    prenom: cols[0],
                    nom: cols[1],
                    telephone: cols[2],
                    email: cols[3] || '',
                    status: 'pending',
                    expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
                };
                var { error } = await sb.from('invitations').insert(row);
                if (!error) imported++;
            }
            await self.loadInvitations();
            AdminApp.toast(imported + ' invitation(s) importée(s)', 'success');
        };
        input.click();
    }
};
