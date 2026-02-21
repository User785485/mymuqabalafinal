/**
 * Admin Chat Manager — Bidirectional Stream Chat for admin panel.
 *
 * Provides real-time messaging between the coach/admin and clients
 * via the Stream Chat JS SDK (loaded from CDN in panel.html).
 *
 * Usage:
 *   await AdminChatManager.initialize();
 *   await AdminChatManager.openChannelForClient(clientId);
 */
const AdminChatManager = (() => {
    let client = null;
    let currentChannel = null;
    let messageListener = null;

    // ── DOM references ────────────────────────────────────────────────────
    const getMessagesContainer = () => document.getElementById('mahram-messages');
    const getChatInput = () => document.getElementById('admin-chat-input');
    const getSendButton = () => document.getElementById('admin-chat-send');

    // ── Initialize Stream Chat client ─────────────────────────────────────
    async function initialize() {
        try {
            if (!window.StreamChat) {
                console.warn('[AdminChat] StreamChat SDK not loaded');
                return false;
            }

            const apiKey = '2zjfuskjraaa';
            if (!apiKey) {
                console.warn('[AdminChat] No Stream Chat API key found');
                return false;
            }

            client = StreamChat.getInstance(apiKey);

            // Get coach token from Supabase edge function
            const supabase = sb;
            if (!supabase) {
                console.warn('[AdminChat] Supabase client not available');
                return false;
            }

            const { data: session } = await supabase.auth.getSession();
            if (!session?.session) {
                console.warn('[AdminChat] No active session');
                return false;
            }

            // Call edge function to generate Stream token for coach
            const { data: tokenData, error } = await supabase.functions.invoke(
                'generate-stream-token',
                { body: { userId: session.session.user.id } }
            );

            if (error || !tokenData?.stream_token) {
                console.error('[AdminChat] Failed to get Stream token:', error);
                return false;
            }

            // Connect as coach
            await client.connectUser(
                {
                    id: session.session.user.id,
                    name: 'Coach',
                    role: 'admin',
                },
                tokenData.stream_token
            );

            console.log('[AdminChat] Connected successfully');
            _setupSendButton();
            return true;
        } catch (err) {
            console.error('[AdminChat] Initialize failed:', err);
            return false;
        }
    }

    // ── Open channel for a specific client ────────────────────────────────
    async function openChannelForClient(clientId, clientName) {
        if (!client) {
            const ok = await initialize();
            if (!ok) {
                _renderError('Chat non disponible. V\u00e9rifiez la configuration.');
                return;
            }
        }

        try {
            // Clean up previous listener
            if (messageListener && currentChannel) {
                currentChannel.off(messageListener);
                messageListener = null;
            }

            // Create or get the coaching channel
            const channel = client.channel('messaging', `coaching-${clientId}`, {
                name: `Coaching - ${clientName || clientId}`,
                members: [client.userID, clientId],
            });

            await channel.watch();
            currentChannel = channel;

            // Render existing messages
            _renderMessages(channel);

            // Listen for new messages in real-time
            messageListener = channel.on('message.new', () => {
                _renderMessages(channel);
            });

            // Show input area
            _showChatInput(true);

        } catch (err) {
            console.error('[AdminChat] Open channel failed:', err);
            _renderError('Impossible d\u2019ouvrir la conversation.');
        }
    }

    // ── Render messages ───────────────────────────────────────────────────
    function _renderMessages(channel) {
        const container = getMessagesContainer();
        if (!container) return;

        const messages = channel.state.messages || [];

        if (messages.length === 0) {
            container.innerHTML = '<div class="admin-list-empty" style="margin:auto">Aucun message dans cette conversation.</div>';
            return;
        }

        const currentUserId = client?.userID;

        container.innerHTML = messages.map(msg => {
            const isOwn = msg.user?.id === currentUserId;
            const time = msg.created_at ? new Date(msg.created_at).toLocaleString('fr-FR', {
                day: '2-digit',
                month: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
            }) : '';
            const userName = msg.user?.name || msg.user?.id || 'Inconnu';
            const bgColor = isOwn ? 'rgba(124,58,237,0.08)' : 'rgba(0,0,0,0.03)';
            const align = isOwn ? 'flex-end' : 'flex-start';
            const borderRadius = isOwn
                ? '16px 16px 4px 16px'
                : '16px 16px 16px 4px';

            return `
                <div style="display:flex;flex-direction:column;align-items:${align};margin-bottom:0.75rem">
                    <div style="font-size:0.7rem;color:var(--ink-muted,#6b7280);margin-bottom:0.2rem">
                        ${isOwn ? 'Vous' : _escapeHtml(userName)} \u00b7 ${time}
                    </div>
                    <div style="background:${bgColor};padding:0.6rem 1rem;border-radius:${borderRadius};max-width:75%;word-break:break-word;font-size:0.88rem;line-height:1.5">
                        ${_escapeHtml(msg.text || '')}
                    </div>
                </div>
            `;
        }).join('');

        // Scroll to bottom
        container.scrollTop = container.scrollHeight;
    }

    // ── Send message ──────────────────────────────────────────────────────
    async function sendMessage() {
        const input = getChatInput();
        if (!input || !currentChannel) return;

        const text = input.value.trim();
        if (!text) return;

        try {
            await currentChannel.sendMessage({ text });
            input.value = '';
            input.focus();
        } catch (err) {
            console.error('[AdminChat] Send message failed:', err);
        }
    }

    // ── UI helpers ────────────────────────────────────────────────────────
    function _setupSendButton() {
        const btn = getSendButton();
        if (btn) {
            btn.onclick = sendMessage;
        }
        const input = getChatInput();
        if (input) {
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                }
            });
        }
    }

    function _showChatInput(show) {
        const inputArea = document.getElementById('admin-chat-input-area');
        if (inputArea) {
            inputArea.style.display = show ? 'flex' : 'none';
        }
    }

    function _renderError(message) {
        const container = getMessagesContainer();
        if (container) {
            container.innerHTML = `<div class="admin-list-empty" style="margin:auto;color:var(--rose-deep,#e11d48)">${_escapeHtml(message)}</div>`;
        }
    }

    function _escapeHtml(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    // ── Disconnect ────────────────────────────────────────────────────────
    async function disconnect() {
        if (messageListener && currentChannel) {
            currentChannel.off(messageListener);
        }
        if (client) {
            await client.disconnectUser();
            client = null;
        }
        currentChannel = null;
        messageListener = null;
    }

    // ── Public API ────────────────────────────────────────────────────────
    return {
        initialize,
        openChannelForClient,
        sendMessage,
        disconnect,
    };
})();
