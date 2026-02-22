/* ═══════════════════════════════════════
   MY MUQABALA — Mahram Numerique + Document Distribution
   Chat supervision & document sending modules
═══════════════════════════════════════ */

const MahramManager = {
    channels: [],          // Stream Channel objects
    selectedChannel: null, // Stream Channel

    async init() {
        // Wait for AdminChatManager to be ready
        if (!AdminChatManager._getClient()) {
            await AdminChatManager.initialize();
        }
        await this.loadChannels();
    },

    async loadChannels() {
        var client = AdminChatManager._getClient();
        if (!client) {
            this.renderEmptyState();
            return;
        }

        try {
            // Query all messaging channels where the admin/coach is a member.
            // Note: $autocomplete is not supported on the "id" field in Stream Chat,
            // so we filter by membership instead — this returns all coaching channels
            // the admin was added to via initiate-coaching-chat.
            var filter = { type: 'messaging', members: { $in: [client.userID] } };
            var sort = { last_message_at: -1 };
            this.channels = await client.queryChannels(filter, sort, { limit: 30, watch: true });
        } catch (err) {
            console.error('[Mahram] loadChannels error:', err);
            this.channels = [];
        }
        this.renderChannels();
    },

    renderEmptyState() {
        var container = document.getElementById('mahram-channels');
        if (container) {
            container.innerHTML = '<div class="admin-list-empty" style="padding:2rem">Chat non connecté. Vérifiez la configuration Stream.</div>';
        }
        var countEl = document.getElementById('channel-count');
        if (countEl) countEl.textContent = '0';
    },

    renderChannels() {
        var container = document.getElementById('mahram-channels');
        if (!container) return;

        var countEl = document.getElementById('channel-count');
        if (countEl) countEl.textContent = this.channels.length;

        if (this.channels.length === 0) {
            container.innerHTML = '<div class="admin-list-empty" style="padding:2rem">Aucune conversation trouvée.</div>';
            return;
        }

        var self = this;
        var client = AdminChatManager._getClient();

        container.innerHTML = this.channels.map(function(ch) {
            // Find the client member (not the coach)
            var members = Object.values(ch.state.members || {});
            var clientMember = members.find(function(m) { return client && m.user_id !== client.userID; });
            var clientName = clientMember && clientMember.user ? clientMember.user.name : (ch.data.name || 'Client');
            var initial = clientName.charAt(0).toUpperCase();

            var lastMsg = ch.state.messages && ch.state.messages.length > 0
                ? ch.state.messages[ch.state.messages.length - 1] : null;
            var lastDate = lastMsg && lastMsg.created_at
                ? new Date(lastMsg.created_at).toLocaleDateString('fr-FR') : '';
            var unread = ch.countUnread ? ch.countUnread() : 0;

            var active = self.selectedChannel && self.selectedChannel.id === ch.id
                ? ' style="background:rgba(124,58,237,0.06)"' : '';

            return '<div class="admin-item-card"' + active + ' onclick="MahramManager.selectChannel(\'' + ch.id + '\')" style="cursor:pointer">' +
                '<div class="admin-list-avatar">' + AdminApp._esc(initial) + '</div>' +
                '<div class="admin-item-info">' +
                '<div class="admin-item-title">' + AdminApp._esc(clientName) + '</div>' +
                '<div class="admin-item-sub">' + lastDate + '</div>' +
                '</div>' +
                (unread > 0 ? '<span class="admin-item-badge actif">' + unread + ' new</span>' : '<span class="admin-item-badge">' + (ch.state.messages ? ch.state.messages.length : 0) + ' msg</span>') +
                '</div>';
        }).join('');
    },

    selectChannel(channelId) {
        var channel = this.channels.find(function(ch) { return ch.id === channelId; });
        if (!channel) return;

        this.selectedChannel = channel;
        this.renderChannels();
        this.renderMessages();

        // Wire up AdminChatManager for sending
        AdminChatManager._setCurrentChannel(channel);
        var inputArea = document.getElementById('admin-chat-input-area');
        if (inputArea) inputArea.style.display = 'flex';

        // Mark as read
        channel.markRead();

        // Listen for new messages on this channel
        channel.on('message.new', function() {
            MahramManager.renderMessages();
        });
    },

    renderMessages() {
        var container = document.getElementById('mahram-messages');
        if (!container || !this.selectedChannel) return;

        var messages = this.selectedChannel.state.messages || [];
        var client = AdminChatManager._getClient();

        if (messages.length === 0) {
            container.innerHTML = '<div class="admin-list-empty" style="padding:2rem">Aucun message dans cette conversation.</div>';
            return;
        }

        container.innerHTML = messages.map(function(msg) {
            var isCoach = client && msg.user && msg.user.id === client.userID;
            var time = msg.created_at ? new Date(msg.created_at).toLocaleString('fr-FR', {
                day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit'
            }) : '';
            var userName = msg.user ? (msg.user.name || msg.user.id) : 'Inconnu';
            var align = isCoach ? 'margin-left:auto;background:rgba(124,58,237,0.08)' : 'margin-right:auto;background:var(--paper-warm,#faf6f1)';

            return '<div style="max-width:75%;padding:0.75rem 1rem;border-radius:12px;margin-bottom:0.5rem;font-size:0.85rem;line-height:1.5;' + align + '">' +
                '<div style="font-weight:600;font-size:0.72rem;color:var(--ink-muted);margin-bottom:0.25rem">' +
                (isCoach ? 'Vous' : AdminApp._esc(userName)) + ' — ' + time + '</div>' +
                '<div style="color:var(--ink-soft)">' + AdminApp._esc(msg.text || '') + '</div>' +
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
