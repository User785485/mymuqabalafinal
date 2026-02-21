/* ═══════════════════════════════════════
   MY MUQABALA — Mahram Numerique + Document Distribution
   Chat supervision & document sending modules
═══════════════════════════════════════ */

const MahramManager = {
    channels: [],
    selectedChannel: null,
    messages: [],

    async init() { await this.loadChannels(); },

    async loadChannels() {
        var { data, error } = await sb.from('chat_channels')
            .select('*, client:profiles!chat_channels_client_id_fkey(prenom, nom)')
            .order('last_message_at', { ascending: false });
        if (error) { AdminApp.toast('Erreur chargement channels', 'error'); this.channels = []; }
        else { this.channels = data || []; }
        this.renderChannels();
    },

    renderChannels() {
        var container = document.getElementById('mahram-channels');
        if (!container) return;

        var countEl = document.getElementById('channel-count');
        if (countEl) countEl.textContent = this.channels.length;

        if (this.channels.length === 0) {
            container.innerHTML = '<div class="admin-list-empty" style="padding:2rem">Aucune conversation trouvee.</div>';
            return;
        }

        var self = this;
        container.innerHTML = this.channels.map(function(ch) {
            var clientName = ch.client ? (ch.client.prenom + ' ' + (ch.client.nom || '')) : 'Client';
            var lastDate = ch.last_message_at ? new Date(ch.last_message_at).toLocaleDateString('fr-FR') : '';
            var active = self.selectedChannel === ch.id ? ' style="background:rgba(124,58,237,0.06)"' : '';
            return '<div class="admin-item-card"' + active + ' onclick="MahramManager.selectChannel(\'' + ch.id + '\')" style="cursor:pointer">' +
                '<div class="admin-list-avatar">' + (ch.client ? ch.client.prenom.charAt(0).toUpperCase() : '?') + '</div>' +
                '<div class="admin-item-info">' +
                '<div class="admin-item-title">' + AdminApp._esc(clientName) + '</div>' +
                '<div class="admin-item-sub">' + (ch.channel_type || 'coach') + ' — ' + lastDate + '</div>' +
                '</div>' +
                '<span class="admin-item-badge">' + (ch.message_count || 0) + ' msg</span>' +
                '</div>';
        }).join('');
    },

    async selectChannel(channelId) {
        this.selectedChannel = channelId;
        this.renderChannels();

        var { data, error } = await sb.from('chat_messages')
            .select('*')
            .eq('channel_id', channelId)
            .order('created_at', { ascending: true })
            .limit(100);

        if (error) { AdminApp.toast('Erreur chargement messages', 'error'); return; }
        this.messages = data || [];
        this.renderMessages();

        // Open real-time Stream Chat channel for bidirectional messaging
        var channel = this.channels.find(function(ch) { return ch.id === channelId; });
        if (channel && typeof AdminChatManager !== 'undefined') {
            var clientId = channel.client_id;
            var clientName = channel.client ? (channel.client.prenom + ' ' + (channel.client.nom || '')).trim() : '';
            AdminChatManager.openChannelForClient(clientId, clientName);
        }
    },

    renderMessages() {
        var container = document.getElementById('mahram-messages');
        if (!container) return;

        if (this.messages.length === 0) {
            container.innerHTML = '<div class="admin-list-empty" style="padding:2rem">Aucun message dans cette conversation.</div>';
            return;
        }

        container.innerHTML = this.messages.map(function(msg) {
            var isCoach = msg.sender_type === 'coach' || msg.sender_type === 'admin';
            var time = new Date(msg.created_at).toLocaleString('fr-FR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
            var align = isCoach ? 'margin-left:auto;background:rgba(124,58,237,0.08)' : 'margin-right:auto;background:var(--paper-warm,#faf6f1)';
            return '<div style="max-width:75%;padding:0.75rem 1rem;border-radius:12px;margin-bottom:0.5rem;font-size:0.85rem;line-height:1.5;' + align + '">' +
                '<div style="font-weight:600;font-size:0.72rem;color:var(--ink-muted);margin-bottom:0.25rem">' + (isCoach ? 'Coach' : 'Client') + ' — ' + time + '</div>' +
                '<div style="color:var(--ink-soft)">' + AdminApp._esc(msg.content || '') + '</div>' +
                (msg.type === 'audio' ? '<div style="margin-top:0.35rem;font-size:0.75rem;color:var(--purple)">Enregistrement audio (' + (msg.duration || '?') + 's)</div>' : '') +
                '</div>';
        }).join('');

        container.scrollTop = container.scrollHeight;
    }
};

const DocDistribution = {
    docs: [],
    sentHistory: [],

    async init() { await this.loadHistory(); },

    async loadHistory() {
        var { data, error } = await sb.from('document_distributions')
            .select('*, client:profiles!document_distributions_client_id_fkey(prenom, nom)')
            .order('sent_at', { ascending: false })
            .limit(50);
        if (error) { console.warn('Doc distribution:', error.message); this.sentHistory = []; }
        else { this.sentHistory = data || []; }
        this.renderHistory();
    },

    renderHistory() {
        var container = document.getElementById('doc-dist-history');
        if (!container) return;

        if (this.sentHistory.length === 0) {
            container.innerHTML = '<div class="admin-list-empty" style="padding:2rem">Aucun document envoye.</div>';
            return;
        }

        container.innerHTML = this.sentHistory.map(function(d) {
            var clientName = d.client ? (d.client.prenom + ' ' + (d.client.nom || '')) : 'Client';
            var date = new Date(d.sent_at).toLocaleDateString('fr-FR');
            return '<div class="admin-item-card">' +
                '<div style="width:36px;height:36px;border-radius:10px;background:var(--sage-light,#e8f0eb);display:flex;align-items:center;justify-content:center;font-size:1rem;flex-shrink:0">📄</div>' +
                '<div class="admin-item-info">' +
                '<div class="admin-item-title">' + AdminApp._esc(d.document_name || 'Document') + '</div>' +
                '<div class="admin-item-sub">Envoye a ' + AdminApp._esc(clientName) + ' — ' + date + '</div>' +
                '</div>' +
                '<span class="admin-item-badge actif">Envoye</span>' +
                '</div>';
        }).join('');
    },

    async send(e) {
        e.preventDefault();
        var clientId = document.getElementById('doc-client-select').value;
        var docName = document.getElementById('doc-name-input').value.trim();
        if (!clientId || !docName) { AdminApp.toast('Client et document obligatoires', 'error'); return; }

        var { error } = await sb.from('document_distributions').insert({
            client_id: clientId,
            document_name: docName,
            sent_at: new Date().toISOString()
        });

        if (error) { AdminApp.toast('Erreur: ' + error.message, 'error'); return; }
        document.getElementById('doc-name-input').value = '';
        await this.loadHistory();
        AdminApp.toast('Document envoye !', 'success');
    },

    async populateClientSelect() {
        var select = document.getElementById('doc-client-select');
        if (!select) return;
        var clients = AdminApp.clients || [];
        select.innerHTML = '<option value="">Selectionner un client</option>' +
            clients.map(function(c) {
                return '<option value="' + c.id + '">' + AdminApp._esc(c.prenom || '') + ' ' + AdminApp._esc(c.nom || '') + '</option>';
            }).join('');
    }
};
