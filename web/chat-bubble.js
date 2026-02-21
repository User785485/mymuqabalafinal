/* ═══════════════════════════════════════
   MY MUQABALA — Chat Bubble Widget
   Self-contained floating chat for client dashboards.
   Lazy-connects to Stream Chat on first click.
═══════════════════════════════════════ */

const ChatBubble = (() => {
    let client = null;
    let channel = null;
    let isOpen = false;
    let isConnected = false;
    let isConnecting = false;
    let unreadCount = 0;

    // DOM refs (set in mount)
    let bubbleBtn = null;
    let badgeEl = null;
    let panelEl = null;
    let messagesEl = null;
    let typingEl = null;
    let inputEl = null;
    let sendBtn = null;

    let typingTimeout = null;

    // ── HTML templates ──

    const BUBBLE_SVG = '<svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.2L4 17.2V4h16v12z"/></svg>';
    const CLOSE_SVG = '<svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="currentColor"/></svg>';
    const SEND_SVG = '<svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>';

    // ── Mount DOM ──

    function mount() {
        // Bubble button
        bubbleBtn = document.createElement('button');
        bubbleBtn.className = 'chat-bubble-btn';
        bubbleBtn.setAttribute('aria-label', 'Ouvrir le chat');
        bubbleBtn.innerHTML = BUBBLE_SVG + '<span class="chat-bubble-badge" id="chat-badge">0</span>';
        bubbleBtn.addEventListener('click', toggle);
        document.body.appendChild(bubbleBtn);

        badgeEl = bubbleBtn.querySelector('.chat-bubble-badge');

        // Panel
        panelEl = document.createElement('div');
        panelEl.className = 'chat-panel';
        panelEl.innerHTML =
            '<div class="chat-panel-header">' +
                '<span class="chat-panel-header-title">Ton accompagnant</span>' +
                '<button class="chat-panel-close" aria-label="Fermer">' + CLOSE_SVG + '</button>' +
            '</div>' +
            '<div class="chat-panel-messages" id="chat-messages"></div>' +
            '<div class="chat-typing" id="chat-typing"></div>' +
            '<div class="chat-panel-input">' +
                '<textarea class="chat-panel-textarea" id="chat-input" rows="1" placeholder="Votre message..."></textarea>' +
                '<button class="chat-panel-send" id="chat-send" aria-label="Envoyer">' + SEND_SVG + '</button>' +
            '</div>';
        document.body.appendChild(panelEl);

        // Refs
        messagesEl = panelEl.querySelector('#chat-messages');
        typingEl = panelEl.querySelector('#chat-typing');
        inputEl = panelEl.querySelector('#chat-input');
        sendBtn = panelEl.querySelector('#chat-send');

        // Close button
        panelEl.querySelector('.chat-panel-close').addEventListener('click', toggle);

        // Send handlers
        sendBtn.addEventListener('click', send);
        inputEl.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                send();
            }
        });

        // Auto-resize textarea
        inputEl.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = Math.min(this.scrollHeight, 100) + 'px';
            // Typing indicator
            _keystroke();
        });
    }

    // ── Lazy connect ──

    async function connect() {
        if (isConnected || isConnecting) return;
        isConnecting = true;

        _showLoading();

        try {
            var tel = sessionStorage.getItem('mm_telephone');
            var code = sessionStorage.getItem('mm_access_code');
            var uuid = sessionStorage.getItem('mm_uuid');
            if (!tel || !code || !uuid) {
                _showEmpty('Session expirée. Veuillez vous reconnecter.');
                isConnecting = false;
                return;
            }

            // Get Stream token via edge function
            var resp = await fetch(SUPABASE_URL + '/functions/v1/generate-stream-token-client', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': SUPABASE_ANON_KEY
                },
                body: JSON.stringify({ telephone: tel, access_code: code })
            });

            if (!resp.ok) {
                var errBody = await resp.json().catch(function() { return {}; });
                console.error('[ChatBubble] Token error:', errBody);
                _showEmpty('Connexion au chat impossible.');
                isConnecting = false;
                return;
            }

            var tokenData = await resp.json();
            var streamToken = tokenData.stream_token;
            var userId = tokenData.user_id;

            // Connect to Stream
            client = StreamChat.getInstance('2zjfuskjraaa');
            var prenom = (typeof DashboardData !== 'undefined' && DashboardData.prenom) ? DashboardData.prenom : 'Client';
            await client.connectUser({ id: userId, name: prenom }, streamToken);

            // Query existing channels
            var channels = await client.queryChannels(
                { type: 'messaging', members: { $in: [userId] } },
                { last_message_at: -1 },
                { limit: 1 }
            );

            if (channels.length > 0) {
                channel = channels[0];
                await channel.watch();
                unreadCount = channel.countUnread();
                _updateBadge();
                _renderMessages();
                _listenEvents();
            } else {
                _showEmpty('Votre accompagnant vous contactera bientôt.');
            }

            // Listen for new channel invitations
            client.on('notification.added_to_channel', async function(event) {
                channel = client.channel('messaging', event.channel.id);
                await channel.watch();
                _renderMessages();
                _listenEvents();
                if (!isOpen) {
                    unreadCount = channel.countUnread();
                    _updateBadge();
                    _pulseBubble();
                }
            });

            isConnected = true;
        } catch (err) {
            console.error('[ChatBubble] Connect error:', err);
            _showEmpty('Erreur de connexion au chat.');
        }

        isConnecting = false;
    }

    // ── Channel events ──

    function _listenEvents() {
        channel.on('message.new', function(event) {
            _renderMessages();
            if (!isOpen && event.message.user.id !== client.userID) {
                unreadCount++;
                _updateBadge();
                _pulseBubble();
            }
        });
        channel.on('typing.start', function(event) {
            if (event.user.id !== client.userID) {
                typingEl.textContent = 'Coach écrit...';
            }
        });
        channel.on('typing.stop', function(event) {
            if (event.user.id !== client.userID) {
                typingEl.textContent = '';
            }
        });
    }

    // ── Toggle panel ──

    async function toggle() {
        if (!isConnected && !isConnecting) {
            await connect();
        }
        isOpen = !isOpen;
        panelEl.classList.toggle('open', isOpen);

        if (isOpen && channel) {
            channel.markRead();
            unreadCount = 0;
            _updateBadge();
            _scrollToBottom();
            inputEl.focus();
        }
    }

    // ── Send message ──

    async function send() {
        var text = inputEl.value.trim();
        if (!text || !channel) return;

        sendBtn.disabled = true;
        try {
            await channel.sendMessage({ text: text });
            inputEl.value = '';
            inputEl.style.height = 'auto';
        } catch (err) {
            console.error('[ChatBubble] Send error:', err);
        }
        sendBtn.disabled = false;
        inputEl.focus();
    }

    // ── Typing keystroke (debounced) ──

    function _keystroke() {
        if (!channel) return;
        channel.keystroke();
        clearTimeout(typingTimeout);
        typingTimeout = setTimeout(function() {
            if (channel) channel.stopTyping();
        }, 2000);
    }

    // ── Render messages ──

    function _renderMessages() {
        if (!messagesEl || !channel) return;

        var messages = channel.state.messages || [];
        if (messages.length === 0) {
            _showEmpty('Aucun message pour le moment.');
            return;
        }

        var currentUserId = client ? client.userID : '';

        messagesEl.innerHTML = messages.map(function(msg) {
            var isOwn = msg.user && msg.user.id === currentUserId;
            var cls = isOwn ? 'chat-msg chat-msg-own' : 'chat-msg chat-msg-other';
            var time = msg.created_at ? new Date(msg.created_at).toLocaleString('fr-FR', {
                day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit'
            }) : '';
            return '<div class="' + cls + '">' +
                '<div>' + _escapeHtml(msg.text || '') + '</div>' +
                '<div class="chat-msg-time">' + time + '</div>' +
            '</div>';
        }).join('');

        _scrollToBottom();
    }

    // ── UI helpers ──

    function _updateBadge() {
        if (!badgeEl) return;
        if (unreadCount > 0) {
            badgeEl.textContent = unreadCount > 99 ? '99+' : unreadCount;
            badgeEl.classList.add('visible');
        } else {
            badgeEl.classList.remove('visible');
        }
    }

    function _pulseBubble() {
        if (!bubbleBtn) return;
        bubbleBtn.classList.remove('pulse');
        // Force reflow to restart animation
        void bubbleBtn.offsetWidth;
        bubbleBtn.classList.add('pulse');
    }

    function _scrollToBottom() {
        if (messagesEl) {
            messagesEl.scrollTop = messagesEl.scrollHeight;
        }
    }

    function _showLoading() {
        if (messagesEl) {
            messagesEl.innerHTML = '<div class="chat-panel-loading"></div>';
        }
    }

    function _showEmpty(text) {
        if (messagesEl) {
            messagesEl.innerHTML = '<div class="chat-panel-empty">' + _escapeHtml(text) + '</div>';
        }
    }

    function _escapeHtml(str) {
        var div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    // ── Public API ──
    return { mount: mount, toggle: toggle, send: send, connect: connect };
})();

document.addEventListener('DOMContentLoaded', function() {
    ChatBubble.mount();
});
