/* ═══════════════════════════════════════
   MY MUQABALA — Chat Engine
   Vanilla JS conversation engine
   Handles state, rendering, persistence
═══════════════════════════════════════ */

const ChatEngine = {
    /* ─── State ─── */
    form: null,
    currentStep: 0,
    answers: {},
    variables: {},
    isProcessing: false,
    isResuming: false,
    totalInteractive: 0,
    completedInteractive: 0,
    _saveTimer: null,
    _tel: null,
    _code: null,

    /* ─── Audio State ─── */
    _mediaRecorder: null,
    _audioChunks: [],
    _recordingStart: 0,
    _recordingTimer: null,
    _currentParts: [],       // [{type:'text'|'audio', content:'...', audioUrl:null}]
    _audioStream: null,
    _EDGE_FN_URL: 'https://eawmathizvtxdtdgrwsg.supabase.co/functions/v1/transcribe-audio',
    _MAX_RECORD_SEC: 300,    // 5 min

    /* ─── DOM refs ─── */
    els: {
        messages: null,
        messagesInner: null,
        inputArea: null,
        inputInner: null,
        progressFill: null,
        headerName: null,
        headerTitle: null,
        headerAvatar: null,
    },

    /* ─── Interactive step types ─── */
    INTERACTIVE_TYPES: ['text_input', 'email_input', 'phone_input', 'choice', 'rating'],

    /* ─── Init ─── */
    async init() {
        // Parse URL params
        const params = new URLSearchParams(window.location.search);
        const formId = params.get('form');
        this._tel = params.get('tel') || sessionStorage.getItem('mm_telephone') || '';
        this._code = params.get('code') || sessionStorage.getItem('mm_access_code') || '';

        // Store auth in session
        if (this._tel) sessionStorage.setItem('mm_telephone', this._tel);
        if (this._code) sessionStorage.setItem('mm_access_code', this._code);

        // Load form
        if (!formId || !window.FORM_REGISTRY || !window.FORM_REGISTRY[formId]) {
            this._showError('Formulaire introuvable.');
            return;
        }
        this.form = window.FORM_REGISTRY[formId];

        // Cache DOM
        this.els.messages = document.getElementById('chat-messages');
        this.els.messagesInner = document.getElementById('chat-messages-inner');
        this.els.inputArea = document.getElementById('chat-input-area');
        this.els.inputInner = document.getElementById('chat-input-inner');
        this.els.progressFill = document.getElementById('chat-progress-fill');
        this.els.headerName = document.getElementById('chat-header-name');
        this.els.headerTitle = document.getElementById('chat-header-title');
        this.els.headerAvatar = document.getElementById('chat-header-avatar');

        // Setup header
        this.els.headerName.textContent = this.form.bot.name;
        this.els.headerTitle.textContent = this.form.title;
        if (this.form.bot.avatar && this.form.bot.avatar.length > 2) {
            this.els.headerAvatar.innerHTML = '<img src="' + this.form.bot.avatar + '" alt="' + this.form.bot.name + '">';
        } else {
            this.els.headerAvatar.textContent = this.form.bot.avatar || 'M';
        }

        // Count interactive steps
        this.totalInteractive = this.form.steps.filter(s => this.INTERACTIVE_TYPES.includes(s.type)).length;

        // Check for saved progress
        const saved = this._loadLocal();
        let serverSaved = null;
        if (this._tel && this._code && typeof sb !== 'undefined') {
            serverSaved = await this._loadServer();
        }

        // Use the most advanced save
        const bestSave = this._pickBestSave(saved, serverSaved);

        if (bestSave && bestSave.currentStep > 0 && bestSave.status !== 'completed') {
            this._showResumeDialog(bestSave);
        } else {
            document.body.classList.remove('chat-loading');
            document.body.classList.add('chat-ready');
            this._processStep();
        }
    },

    /* ─── Resume Dialog ─── */
    _showResumeDialog(saveData) {
        const overlay = document.createElement('div');
        overlay.className = 'chat-resume-overlay';

        const answeredCount = Object.keys(saveData.answers || {}).length;

        overlay.innerHTML =
            '<div class="chat-resume-dialog">' +
                '<div class="chat-resume-title">Reprendre ta conversation ?</div>' +
                '<div class="chat-resume-text">Tu avais r\u00e9pondu \u00e0 ' + answeredCount + ' question' + (answeredCount > 1 ? 's' : '') + '. Veux-tu reprendre l\u00e0 o\u00f9 tu en \u00e9tais ?</div>' +
                '<div class="chat-resume-actions">' +
                    '<button class="chat-resume-btn secondary" id="resume-restart">Recommencer</button>' +
                    '<button class="chat-resume-btn primary" id="resume-continue">Reprendre</button>' +
                '</div>' +
            '</div>';

        document.body.appendChild(overlay);
        document.body.classList.remove('chat-loading');
        document.body.classList.add('chat-ready');

        document.getElementById('resume-continue').addEventListener('click', () => {
            overlay.remove();
            this._resumeFrom(saveData);
        });

        document.getElementById('resume-restart').addEventListener('click', () => {
            overlay.remove();
            this.answers = {};
            this.variables = {};
            this.currentStep = 0;
            this.completedInteractive = 0;
            this._clearLocal();
            this._processStep();
        });
    },

    /* ─── Resume: replay all steps instantly ─── */
    _resumeFrom(saveData) {
        this.isResuming = true;
        this.answers = saveData.answers || {};
        this.variables = {};
        this.currentStep = 0;
        this.completedInteractive = 0;

        // Rebuild variables from answers
        for (const [variable, value] of Object.entries(this.answers)) {
            this.variables[variable] = value;
        }

        const targetStep = saveData.currentStep;

        // Replay all steps up to saved position instantly
        for (let i = 0; i < targetStep && i < this.form.steps.length; i++) {
            const step = this.form.steps[i];
            this._renderStepInstant(step, i);
            if (this.INTERACTIVE_TYPES.includes(step.type)) {
                this.completedInteractive++;
            }
        }

        this.currentStep = targetStep;
        this.isResuming = false;
        this._updateProgress();
        this._scrollToBottom(false);

        // Continue from saved position
        setTimeout(() => this._processStep(), 400);
    },

    /* ─── Render step instantly (for resume) ─── */
    _renderStepInstant(step, index) {
        switch (step.type) {
            case 'message':
                this._addBotBubble(this._renderContent(step.content), true);
                break;
            case 'image':
                this._addImageBubble(step.url, true);
                break;
            case 'section':
                this._addSection(step.title, true);
                break;
            case 'text_input': {
                const val = this.answers[step.variable];
                if (val) {
                    const hasAudio = this.answers[step.variable + '_audio_urls'] && this.answers[step.variable + '_audio_urls'].length > 0;
                    this._addUserBubble(val + (hasAudio ? ' \uD83C\uDFA4' : ''), true);
                }
                break;
            }
            case 'email_input':
            case 'phone_input': {
                const val = this.answers[step.variable];
                if (val) this._addUserBubble(val, true);
                break;
            }
            case 'choice': {
                const val = this.answers[step.variable];
                if (val) {
                    if (step.multiple && Array.isArray(val)) {
                        const labels = val.map(id => {
                            const opt = step.options.find(o => o.id === id);
                            return opt ? opt.label : id;
                        });
                        this._addUserBubble(labels.join(', '), true);
                    } else {
                        const opt = step.options.find(o => o.id === val);
                        this._addUserBubble(opt ? opt.label : val, true);
                    }
                }
                break;
            }
            case 'rating': {
                const val = this.answers[step.variable];
                if (val) this._addUserBubble(val + '/10', true);
                break;
            }
            case 'completion':
                // Don't show completion on resume
                break;
        }
    },

    /* ─── Process current step ─── */
    async _processStep() {
        if (this.isProcessing) return;
        if (this.currentStep >= this.form.steps.length) return;

        this.isProcessing = true;
        const step = this.form.steps[this.currentStep];

        switch (step.type) {
            case 'message':
                await this._handleMessage(step);
                this.currentStep++;
                this.isProcessing = false;
                this._processStep();
                break;

            case 'image':
                await this._handleImage(step);
                this.currentStep++;
                this.isProcessing = false;
                this._processStep();
                break;

            case 'section':
                await this._handleSection(step);
                this.currentStep++;
                this.isProcessing = false;
                this._processStep();
                break;

            case 'text_input':
                this._currentParts = [];
                await this._showTypingThenInput(step);
                this._showTextInput(step);
                this.isProcessing = false;
                break;

            case 'email_input':
                await this._showTypingThenInput(step);
                this._showEmailInput(step);
                this.isProcessing = false;
                break;

            case 'phone_input':
                await this._showTypingThenInput(step);
                this._showPhoneInput(step);
                this.isProcessing = false;
                break;

            case 'choice':
                await this._handleChoice(step);
                this.completedInteractive++;
                this._updateProgress();
                this.currentStep++;
                this.isProcessing = false;
                this._processStep();
                break;

            case 'rating':
                await this._handleRating(step);
                this.completedInteractive++;
                this._updateProgress();
                this.currentStep++;
                this.isProcessing = false;
                this._processStep();
                break;

            case 'completion':
                await this._handleCompletion(step);
                this.isProcessing = false;
                break;

            default:
                this.currentStep++;
                this.isProcessing = false;
                this._processStep();
        }
    },

    /* ─── Handle: message ─── */
    async _handleMessage(step) {
        const text = this._renderContent(step.content);
        const delay = this._calcDelay(text);
        await this._showTyping(delay);
        this._addBotBubble(text);
        this._scrollToBottom();
        await this._wait(200);
    },

    /* ─── Handle: image ─── */
    async _handleImage(step) {
        await this._showTyping(800);
        this._addImageBubble(step.url);
        this._scrollToBottom();
        await this._wait(400);
    },

    /* ─── Handle: section ─── */
    async _handleSection(step) {
        await this._wait(600);
        this._addSection(step.title);
        this._scrollToBottom();
        await this._wait(300);
    },

    /* ─── Handle: choice ─── */
    async _handleChoice(step) {
        this._hideInput();
        const container = document.createElement('div');
        container.className = 'chat-choices';
        container.style.padding = '8px 0';

        if (step.multiple) {
            // Multi-select
            const selected = new Set();

            step.options.forEach((opt, i) => {
                const btn = document.createElement('button');
                btn.className = 'chat-choice-btn';
                btn.textContent = opt.label;
                btn.type = 'button';

                btn.addEventListener('click', () => {
                    if (selected.has(opt.id)) {
                        selected.delete(opt.id);
                        btn.classList.remove('selected');
                    } else {
                        selected.add(opt.id);
                        btn.classList.add('selected');
                    }
                    confirmBtn.disabled = selected.size === 0;
                });

                container.appendChild(btn);

                // Stagger animation
                setTimeout(() => btn.classList.add('visible'), 50 * (i + 1));
            });

            // Confirm button
            const confirmBtn = document.createElement('button');
            confirmBtn.className = 'chat-multi-confirm';
            confirmBtn.textContent = 'Valider ma s\u00e9lection';
            confirmBtn.type = 'button';
            confirmBtn.disabled = true;
            container.appendChild(confirmBtn);
            setTimeout(() => confirmBtn.classList.add('visible'), 50 * (step.options.length + 1));

            this.els.messagesInner.appendChild(container);
            this._scrollToBottom();

            await new Promise(resolve => {
                confirmBtn.addEventListener('click', () => {
                    const values = Array.from(selected);
                    const labels = values.map(id => {
                        const opt = step.options.find(o => o.id === id);
                        return opt ? opt.label : id;
                    });
                    container.remove();
                    this._addUserBubble(labels.join(', '));
                    this._recordAnswer(step.variable, values);
                    resolve();
                });
            });
        } else {
            // Single-select
            step.options.forEach((opt, i) => {
                const btn = document.createElement('button');
                btn.className = 'chat-choice-btn';
                btn.textContent = opt.label;
                btn.type = 'button';
                container.appendChild(btn);

                // Stagger animation
                setTimeout(() => btn.classList.add('visible'), 50 * (i + 1));
            });

            this.els.messagesInner.appendChild(container);
            this._scrollToBottom();

            await new Promise(resolve => {
                container.querySelectorAll('.chat-choice-btn').forEach((btn, i) => {
                    btn.addEventListener('click', () => {
                        btn.classList.add('selected');
                        container.remove();
                        this._addUserBubble(step.options[i].label);
                        this._recordAnswer(step.variable, step.options[i].id);
                        resolve();
                    });
                });
            });
        }

    },

    /* ─── Handle: rating ─── */
    async _handleRating(step) {
        this._hideInput();
        const container = document.createElement('div');
        container.className = 'chat-rating';
        container.style.padding = '8px 0';

        // Labels
        const labels = document.createElement('div');
        labels.className = 'chat-rating-labels';
        labels.innerHTML = '<span>' + (step.leftLabel || '1') + '</span><span>' + (step.rightLabel || '10') + '</span>';
        container.appendChild(labels);

        // Pills
        const pills = document.createElement('div');
        pills.className = 'chat-rating-pills';
        const max = step.max || 10;

        for (let i = 1; i <= max; i++) {
            const pill = document.createElement('button');
            pill.className = 'chat-rating-pill';
            pill.textContent = i;
            pill.type = 'button';
            pills.appendChild(pill);

            // Stagger animation
            setTimeout(() => pill.classList.add('visible'), 40 * i);
        }

        container.appendChild(pills);
        this.els.messagesInner.appendChild(container);
        this._scrollToBottom();

        await new Promise(resolve => {
            pills.querySelectorAll('.chat-rating-pill').forEach(pill => {
                pill.addEventListener('click', () => {
                    const val = parseInt(pill.textContent, 10);
                    container.remove();
                    this._addUserBubble(val + '/10');
                    this._recordAnswer(step.variable, val);
                    resolve();
                });
            });
        });

    },

    /* ─── Handle: completion ─── */
    async _handleCompletion(step) {
        // Mark as completed in Supabase
        if (this._tel && this._code && typeof sb !== 'undefined') {
            try {
                await sb.rpc('complete_form_response', {
                    p_telephone: this._tel,
                    p_code: this._code,
                    p_form_id: this.form.id,
                    p_answers: this.answers
                });
            } catch (e) { console.warn('Completion save error:', e); }
        }

        // Save locally as completed
        this._saveLocal('completed');

        // Update progress to 100%
        this.completedInteractive = this.totalInteractive;
        this._updateProgress();

        // Build completion screen
        const div = document.createElement('div');
        div.className = 'chat-completion';
        div.innerHTML =
            '<div class="chat-completion-icon">' + (step.icon || this.form.icon || '\uD83C\uDF89') + '</div>' +
            '<div class="chat-completion-title">' + (step.title || 'F\u00e9licitations !') + '</div>' +
            '<div class="chat-completion-text">' + this._interpolate(step.message || '') + '</div>' +
            '<a class="chat-completion-btn" id="chat-back-btn" href="#">Retour au dashboard \u2192</a>';

        this.els.messagesInner.appendChild(div);
        this._scrollToBottom();

        // Build dashboard return URL
        const backBtn = document.getElementById('chat-back-btn');
        const dashUrl = 'dashboard-formulaires.html' +
            (this._tel ? '?tel=' + encodeURIComponent(this._tel) + '&code=' + encodeURIComponent(this._code) : '');
        backBtn.href = dashUrl;

        // Confetti
        this._fireConfetti();

        this._hideInput();
    },

    /* ─── Show typing then prepare for input ─── */
    async _showTypingThenInput(_step) {
        // Just a brief delay before showing input field
        await this._wait(200);
    },

    /* ─── Text Input ─── */
    _showTextInput(step) {
        this._hideInput();
        const isLong = step.isLong;
        const isOptional = step.optional;
        const canRecord = this._canRecordAudio();

        const micBtnHtml = canRecord
            ? '<button class="chat-mic-btn" id="chat-mic-btn" type="button" title="Enregistrer un message vocal">' +
                '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>' +
              '</button>'
            : '';

        const html =
            '<div class="chat-text-input-wrap">' +
                (isLong
                    ? '<textarea class="chat-text-input long" id="chat-input-field" placeholder="' + (step.placeholder || '') + '" rows="3"></textarea>'
                    : '<input type="text" class="chat-text-input" id="chat-input-field" placeholder="' + (step.placeholder || '') + '">') +
                micBtnHtml +
                '<button class="chat-send-btn" id="chat-send-btn" type="button"' + (isOptional ? '' : ' disabled') + '>' +
                    '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>' +
                '</button>' +
            '</div>';

        this.els.inputInner.innerHTML = html;
        this._showInput();

        const field = document.getElementById('chat-input-field');
        const sendBtn = document.getElementById('chat-send-btn');
        const micBtn = document.getElementById('chat-mic-btn');

        // Auto-grow textarea
        if (isLong) {
            field.addEventListener('input', () => {
                field.style.height = 'auto';
                field.style.height = Math.min(field.scrollHeight, 120) + 'px';
                sendBtn.disabled = !isOptional && !field.value.trim();
            });
        } else {
            field.addEventListener('input', () => {
                sendBtn.disabled = !isOptional && !field.value.trim();
            });
        }

        const submit = () => {
            const val = field.value.trim();
            if (!val && !isOptional) return;
            this._hideInput();
            this._addUserBubble(val || '(pass\u00e9)');
            this._currentParts.push({ type: 'text', content: val || '(pass\u00e9)', audioUrl: null });
            this._showAddMorePrompt(step.variable, step);
        };

        sendBtn.addEventListener('click', submit);
        field.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey && !isLong) {
                e.preventDefault();
                submit();
            }
            if (e.key === 'Enter' && e.ctrlKey && isLong) {
                e.preventDefault();
                submit();
            }
        });

        // Mic button
        if (micBtn) {
            micBtn.addEventListener('click', () => {
                this._startRecording(step);
            });
        }

        setTimeout(() => field.focus(), 100);
    },

    /* ─── Email Input ─── */
    _showEmailInput(step) {
        this._hideInput();

        const html =
            '<div class="chat-text-input-wrap">' +
                '<input type="email" class="chat-email-input" id="chat-input-field" placeholder="' + (step.placeholder || 'ton.email@exemple.com') + '">' +
                '<button class="chat-send-btn" id="chat-send-btn" type="button" disabled>' +
                    '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>' +
                '</button>' +
            '</div>' +
            '<div class="chat-input-error" id="chat-input-error">Adresse email invalide</div>';

        this.els.inputInner.innerHTML = html;
        this._showInput();

        const field = document.getElementById('chat-input-field');
        const sendBtn = document.getElementById('chat-send-btn');
        const errorEl = document.getElementById('chat-input-error');

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        field.addEventListener('input', () => {
            const val = field.value.trim();
            sendBtn.disabled = !emailRegex.test(val);
            errorEl.classList.remove('visible');
        });

        const submit = () => {
            const val = field.value.trim();
            if (!emailRegex.test(val)) {
                errorEl.classList.add('visible');
                return;
            }
            this._hideInput();
            this._addUserBubble(val);
            this._recordAnswer(step.variable, val);
            this.completedInteractive++;
            this._updateProgress();
            this.currentStep++;
            this._processStep();
        };

        sendBtn.addEventListener('click', submit);
        field.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') { e.preventDefault(); submit(); }
        });

        setTimeout(() => field.focus(), 100);
    },

    /* ─── Phone Input ─── */
    _showPhoneInput(step) {
        this._hideInput();

        const html =
            '<div class="chat-text-input-wrap">' +
                '<div class="chat-phone-wrap">' +
                    '<select class="chat-phone-prefix" id="chat-phone-prefix">' +
                        '<option value="+33">+33</option>' +
                        '<option value="+212">+212</option>' +
                        '<option value="+216">+216</option>' +
                        '<option value="+213">+213</option>' +
                        '<option value="+32">+32</option>' +
                        '<option value="+41">+41</option>' +
                        '<option value="+44">+44</option>' +
                        '<option value="+1">+1</option>' +
                    '</select>' +
                    '<input type="tel" class="chat-phone-input" id="chat-input-field" placeholder="' + (step.placeholder || '06 12 34 56 78') + '">' +
                '</div>' +
                '<button class="chat-send-btn" id="chat-send-btn" type="button" disabled>' +
                    '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>' +
                '</button>' +
            '</div>' +
            '<div class="chat-input-error" id="chat-input-error">Num\u00e9ro de t\u00e9l\u00e9phone invalide</div>';

        this.els.inputInner.innerHTML = html;
        this._showInput();

        const prefix = document.getElementById('chat-phone-prefix');
        const field = document.getElementById('chat-input-field');
        const sendBtn = document.getElementById('chat-send-btn');
        const errorEl = document.getElementById('chat-input-error');

        // Set default prefix
        if (step.defaultPrefix) prefix.value = step.defaultPrefix;

        // Pre-fill from URL if variable is 'telephone' and we have it
        if (step.variable === 'telephone' && this._tel) {
            // Extract digits after prefix
            let tel = this._tel;
            const prefixOptions = ['+33', '+212', '+216', '+213', '+32', '+41', '+44', '+1'];
            for (const p of prefixOptions) {
                if (tel.startsWith(p)) {
                    prefix.value = p;
                    tel = tel.substring(p.length);
                    break;
                }
            }
            field.value = tel;
            sendBtn.disabled = tel.replace(/\s/g, '').length < 6;
        }

        field.addEventListener('input', () => {
            const digits = field.value.replace(/\s/g, '');
            sendBtn.disabled = digits.length < 6;
            errorEl.classList.remove('visible');
        });

        const submit = () => {
            const digits = field.value.replace(/\s/g, '');
            if (digits.length < 6) {
                errorEl.classList.add('visible');
                return;
            }
            const fullNum = prefix.value + digits;
            this._hideInput();
            this._addUserBubble(prefix.value + ' ' + field.value.trim());
            this._recordAnswer(step.variable, fullNum);
            this.completedInteractive++;
            this._updateProgress();
            this.currentStep++;
            this._processStep();
        };

        sendBtn.addEventListener('click', submit);
        field.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') { e.preventDefault(); submit(); }
        });

        setTimeout(() => field.focus(), 100);
    },

    /* ─── Record Answer + Save ─── */
    _recordAnswer(variable, value) {
        if (!variable) return;
        this.answers[variable] = value;
        this.variables[variable] = value;

        // Save immediately to localStorage
        this._saveLocal();

        // Debounced save to Supabase
        this._scheduleSave();
    },

    /* ─── Typing Indicator ─── */
    async _showTyping(duration) {
        const typing = document.createElement('div');
        typing.className = 'typing-indicator';
        typing.id = 'typing-indicator';
        typing.innerHTML =
            '<div class="chat-msg-avatar">' + this._avatarHTML() + '</div>' +
            '<div class="typing-dots">' +
                '<div class="typing-dot"></div>' +
                '<div class="typing-dot"></div>' +
                '<div class="typing-dot"></div>' +
            '</div>';

        this.els.messagesInner.appendChild(typing);
        this._scrollToBottom();
        await this._wait(duration);
        typing.remove();
    },

    /* ─── Add Bot Bubble ─── */
    _addBotBubble(html, instant) {
        const msg = document.createElement('div');
        msg.className = 'chat-msg bot' + (instant ? ' instant' : '');
        msg.innerHTML =
            '<div class="chat-msg-avatar">' + this._avatarHTML() + '</div>' +
            '<div class="chat-bubble">' + html + '</div>';
        this.els.messagesInner.appendChild(msg);
        if (!instant) this._scrollToBottom();
    },

    /* ─── Add User Bubble ─── */
    _addUserBubble(text, instant) {
        const msg = document.createElement('div');
        msg.className = 'chat-msg user' + (instant ? ' instant' : '');
        msg.innerHTML = '<div class="chat-bubble">' + this._escapeHtml(text) + '</div>';
        this.els.messagesInner.appendChild(msg);
        if (!instant) this._scrollToBottom();
    },

    /* ─── Add Image Bubble ─── */
    _addImageBubble(url, instant) {
        const msg = document.createElement('div');
        msg.className = 'chat-msg bot' + (instant ? ' instant' : '');
        msg.innerHTML =
            '<div class="chat-msg-avatar">' + this._avatarHTML() + '</div>' +
            '<div class="chat-msg-image"><img src="' + url + '" alt="" loading="lazy"></div>';
        this.els.messagesInner.appendChild(msg);
        if (!instant) this._scrollToBottom();
    },

    /* ─── Add Section ─── */
    _addSection(title, instant) {
        const div = document.createElement('div');
        div.className = 'chat-section' + (instant ? ' instant' : '');
        div.innerHTML =
            '<div class="chat-section-line">' +
                '<span class="chat-section-text">' + this._escapeHtml(title) + '</span>' +
            '</div>';
        this.els.messagesInner.appendChild(div);
    },

    /* ─── Input Area Show/Hide ─── */
    _showInput() {
        this.els.inputArea.classList.add('visible');
        this._scrollToBottom();
    },

    _hideInput() {
        this.els.inputArea.classList.remove('visible');
        this.els.inputInner.innerHTML = '';
    },

    /* ─── Content Rendering ─── */
    _renderContent(content) {
        if (typeof content === 'string') {
            return this._escapeHtml(this._interpolate(content));
        }
        if (Array.isArray(content)) {
            return content.map(part => {
                const text = this._escapeHtml(this._interpolate(part.text || ''));
                if (part.bold) return '<strong>' + text + '</strong>';
                if (part.italic) return '<em>' + text + '</em>';
                return text;
            }).join('');
        }
        return '';
    },

    /* ─── Variable Interpolation ─── */
    _interpolate(text) {
        return text.replace(/\{\{(\w+)\}\}/g, (match, key) => {
            return this.variables[key] || match;
        });
    },

    /* ─── Calculate typing delay ─── */
    _calcDelay(html) {
        const text = html.replace(/<[^>]+>/g, '');
        const words = text.split(/\s+/).length;
        const speed = this.form.timing?.speed || 55;
        const maxDelay = this.form.timing?.maxDelay || 2000;
        return Math.min(words * speed, maxDelay);
    },

    /* ─── Progress ─── */
    _updateProgress() {
        if (!this.els.progressFill || this.totalInteractive === 0) return;
        const pct = Math.round((this.completedInteractive / this.totalInteractive) * 100);
        this.els.progressFill.style.width = pct + '%';
    },

    /* ─── Scroll ─── */
    _scrollToBottom(smooth) {
        if (smooth === false) {
            this.els.messages.scrollTop = this.els.messages.scrollHeight;
        } else {
            requestAnimationFrame(() => {
                this.els.messages.scrollTo({
                    top: this.els.messages.scrollHeight,
                    behavior: 'smooth'
                });
            });
        }
    },

    /* ─── Utils ─── */
    _wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    _escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },

    _avatarHTML() {
        if (this.form.bot.avatar && this.form.bot.avatar.length > 2) {
            return '<img src="' + this.form.bot.avatar + '" alt="' + this.form.bot.name + '">';
        }
        return this.form.bot.avatar || 'M';
    },

    /* ══════════════════════════════════
       AUDIO RECORDING & TRANSCRIPTION
    ══════════════════════════════════ */

    _canRecordAudio() {
        return typeof MediaRecorder !== 'undefined' &&
               navigator.mediaDevices &&
               typeof navigator.mediaDevices.getUserMedia === 'function';
    },

    _getAudioMimeType() {
        const types = ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4', 'audio/ogg'];
        for (const t of types) {
            if (MediaRecorder.isTypeSupported(t)) return t;
        }
        return 'audio/webm';
    },

    _getAudioExtension(mime) {
        if (mime.includes('mp4')) return 'mp4';
        if (mime.includes('ogg')) return 'ogg';
        return 'webm';
    },

    async _startRecording(step) {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            this._audioStream = stream;
            const mime = this._getAudioMimeType();
            this._mediaRecorder = new MediaRecorder(stream, {
                mimeType: mime,
                audioBitsPerSecond: 24000
            });
            this._audioChunks = [];

            this._mediaRecorder.ondataavailable = (e) => {
                if (e.data.size > 0) this._audioChunks.push(e.data);
            };

            this._mediaRecorder.onstop = () => {
                const blob = new Blob(this._audioChunks, { type: mime });
                const duration = (Date.now() - this._recordingStart) / 1000;
                clearInterval(this._recordingTimer);
                this._stopStream();
                if (duration < 1) {
                    this._showTextInput(step);
                    this._showRecordingError('Enregistrement trop court (min 1s)');
                    return;
                }
                this._renderAudioPreview(blob, duration, step, mime);
            };

            this._mediaRecorder.start(250);
            this._recordingStart = Date.now();
            this._renderRecordingUI(step);

        } catch (err) {
            console.warn('Microphone error:', err);
            this._showRecordingError('Micro non disponible');
        }
    },

    _stopStream() {
        if (this._audioStream) {
            this._audioStream.getTracks().forEach(t => t.stop());
            this._audioStream = null;
        }
    },

    _stopRecording() {
        if (this._mediaRecorder && this._mediaRecorder.state === 'recording') {
            this._mediaRecorder.stop();
        }
        clearInterval(this._recordingTimer);
    },

    _renderRecordingUI(step) {
        this._hideInput();
        const html =
            '<div class="chat-text-input-wrap">' +
                '<div class="chat-recording-bar">' +
                    '<div class="chat-recording-dot"></div>' +
                    '<span class="chat-recording-timer" id="rec-timer">0:00</span>' +
                    '<div class="chat-recording-progress"><div class="chat-recording-progress-fill" id="rec-progress"></div></div>' +
                    '<span class="chat-recording-max">5:00</span>' +
                '</div>' +
                '<button class="chat-stop-btn" id="chat-stop-btn" type="button" title="Arr\u00eater l\'enregistrement">' +
                    '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="6" width="12" height="12" rx="2"/></svg>' +
                '</button>' +
            '</div>';

        this.els.inputInner.innerHTML = html;
        this._showInput();

        const timerEl = document.getElementById('rec-timer');
        const progressEl = document.getElementById('rec-progress');
        const stopBtn = document.getElementById('chat-stop-btn');

        this._recordingTimer = setInterval(() => {
            const elapsed = (Date.now() - this._recordingStart) / 1000;
            const mins = Math.floor(elapsed / 60);
            const secs = Math.floor(elapsed % 60);
            timerEl.textContent = mins + ':' + (secs < 10 ? '0' : '') + secs;
            progressEl.style.width = Math.min((elapsed / this._MAX_RECORD_SEC) * 100, 100) + '%';
            if (elapsed >= this._MAX_RECORD_SEC) {
                this._stopRecording();
            }
        }, 500);

        stopBtn.addEventListener('click', () => this._stopRecording());
    },

    _renderAudioPreview(blob, duration, step, mime) {
        this._hideInput();
        const audioUrl = URL.createObjectURL(blob);
        const mins = Math.floor(duration / 60);
        const secs = Math.floor(duration % 60);
        const durStr = mins + ':' + (secs < 10 ? '0' : '') + secs;

        const html =
            '<div class="chat-text-input-wrap">' +
                '<div class="chat-audio-preview">' +
                    '<button class="chat-audio-play-btn" id="audio-play-btn" type="button" title="Lire">' +
                        '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>' +
                    '</button>' +
                    '<span class="chat-audio-duration">' + durStr + '</span>' +
                    '<div class="chat-audio-waveform" id="audio-waveform"></div>' +
                '</div>' +
                '<button class="chat-audio-delete-btn" id="audio-delete-btn" type="button" title="Supprimer">' +
                    '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>' +
                '</button>' +
                '<button class="chat-send-btn" id="audio-send-btn" type="button" title="Envoyer">' +
                    '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>' +
                '</button>' +
            '</div>';

        this.els.inputInner.innerHTML = html;
        this._showInput();

        // Waveform visual
        const waveform = document.getElementById('audio-waveform');
        for (let i = 0; i < 20; i++) {
            const bar = document.createElement('div');
            bar.className = 'chat-audio-waveform-bar';
            bar.style.height = (4 + Math.random() * 16) + 'px';
            waveform.appendChild(bar);
        }

        // Play/pause
        const audio = new Audio(audioUrl);
        const playBtn = document.getElementById('audio-play-btn');
        let playing = false;
        playBtn.addEventListener('click', () => {
            if (playing) { audio.pause(); playing = false; playBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>'; }
            else { audio.play(); playing = true; playBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>'; }
        });
        audio.addEventListener('ended', () => { playing = false; playBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>'; });

        // Delete
        document.getElementById('audio-delete-btn').addEventListener('click', () => {
            audio.pause();
            URL.revokeObjectURL(audioUrl);
            this._showTextInput(step);
        });

        // Send
        const sendBtn = document.getElementById('audio-send-btn');
        sendBtn.addEventListener('click', () => {
            sendBtn.disabled = true;
            audio.pause();
            URL.revokeObjectURL(audioUrl);
            this._handleAudioSubmit(blob, step.variable, step, mime);
        });
    },

    async _uploadAudio(blob, variable, index, mime) {
        const ext = this._getAudioExtension(mime);
        const formId = this.form ? this.form.id : 'unknown';
        const ts = Date.now();
        const safeTel = (this._tel || 'anon').replace(/[^a-zA-Z0-9]/g, '');
        const path = formId + '_' + safeTel + '/' + ts + '_' + variable + '_' + index + '.' + ext;

        const { data, error } = await sb.storage.from('form-audio').upload(path, blob, {
            contentType: mime,
            upsert: false
        });

        if (error) throw new Error('Upload failed: ' + error.message);

        const { data: urlData } = sb.storage.from('form-audio').getPublicUrl(path);
        return { path: path, publicUrl: urlData.publicUrl };
    },

    async _transcribeAudio(filePath) {
        const res = await fetch(this._EDGE_FN_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + SUPABASE_ANON_KEY
            },
            body: JSON.stringify({
                filePath: filePath,
                telephone: this._tel,
                code: this._code
            })
        });

        if (!res.ok) {
            const err = await res.json().catch(() => ({ error: 'Unknown error' }));
            throw new Error(err.error || 'Transcription failed');
        }

        return await res.json();
    },

    async _handleAudioSubmit(blob, variable, step, mime) {
        this._hideInput();
        const index = this._currentParts.filter(p => p.type === 'audio').length + 1;

        // Show processing in input area
        this._showProcessingMessage('Envoi en cours...');

        try {
            // 1. Upload
            const { path, publicUrl } = await this._uploadAudio(blob, variable, index, mime);

            // 2. Transcribe
            this._showProcessingMessage('Transcription en cours...');
            let transcription;
            try {
                const result = await this._transcribeAudio(path);
                transcription = result.text || '';
            } catch (err) {
                console.warn('Transcription error:', err);
                transcription = '[Transcription en attente]';
            }

            // 3. Show user bubble with transcription
            this._addUserBubble(transcription + ' \uD83C\uDFA4');

            // 4. Store part
            this._currentParts.push({
                type: 'audio',
                content: transcription,
                audioUrl: publicUrl
            });

            // 5. Ask "add more?"
            this._showAddMorePrompt(variable, step);

        } catch (err) {
            console.error('Audio submit error:', err);
            this._hideInput();
            this._addBotBubble('D\u00e9sol\u00e9, une erreur est survenue lors de l\'envoi. R\u00e9essaie.');
            this._scrollToBottom();
            // Re-show text input so user can retry or type
            setTimeout(() => this._showTextInput(step), 600);
        }
    },

    _showProcessingMessage(text) {
        this.els.inputInner.innerHTML =
            '<div class="chat-processing-msg">' +
                '<div class="chat-processing-dots"><span></span><span></span><span></span></div>' +
                '<span>' + text + '</span>' +
            '</div>';
        this._showInput();
        this._scrollToBottom();
    },

    async _showAddMorePrompt(variable, step) {
        this._hideInput();
        await this._wait(400);
        await this._showTyping(800);
        this._addBotBubble('Merci ! Souhaites-tu compl\u00e9ter ta r\u00e9ponse ?');
        this._scrollToBottom();

        // Show choices in the messages area
        const container = document.createElement('div');
        container.className = 'chat-choices';
        container.style.padding = '8px 0';

        const btnDone = document.createElement('button');
        btnDone.className = 'chat-choice-btn';
        btnDone.textContent = 'C\'est tout \u2713';
        btnDone.type = 'button';
        container.appendChild(btnDone);

        const btnAdd = document.createElement('button');
        btnAdd.className = 'chat-choice-btn';
        btnAdd.textContent = 'Ajouter quelque chose \uD83C\uDFA4';
        btnAdd.type = 'button';
        container.appendChild(btnAdd);

        this.els.messagesInner.appendChild(container);
        this._scrollToBottom();

        setTimeout(() => btnDone.classList.add('visible'), 50);
        setTimeout(() => btnAdd.classList.add('visible'), 100);

        let chosen = false;
        btnDone.addEventListener('click', () => {
            if (chosen) return;
            chosen = true;
            btnDone.classList.add('selected');
            container.remove();
            this._addUserBubble('C\'est tout \u2713');
            this._finalizeTextInput(variable, step);
        });

        btnAdd.addEventListener('click', () => {
            if (chosen) return;
            chosen = true;
            btnAdd.classList.add('selected');
            container.remove();
            this._addUserBubble('Ajouter quelque chose \uD83C\uDFA4');
            // Re-show text input for more
            setTimeout(() => this._showTextInput(step), 300);
        });
    },

    _finalizeTextInput(variable, step) {
        const finalText = this._currentParts.map(p => p.content).join('\n\n');
        const audioUrls = this._currentParts.filter(p => p.audioUrl).map(p => p.audioUrl);

        // Set audio_urls BEFORE _recordAnswer so _saveLocal includes them
        if (audioUrls.length > 0) {
            this.answers[variable + '_audio_urls'] = audioUrls;
        }
        this._recordAnswer(variable, finalText);
        this._currentParts = [];

        this.completedInteractive++;
        this._updateProgress();
        this.currentStep++;
        this._processStep();
    },

    _showRecordingError(msg) {
        const errorEl = document.createElement('div');
        errorEl.className = 'chat-input-error visible';
        errorEl.textContent = msg;
        errorEl.style.textAlign = 'center';
        this.els.inputInner.appendChild(errorEl);
        setTimeout(() => errorEl.remove(), 3000);
    },

    _showError(msg) {
        document.body.classList.remove('chat-loading');
        document.body.classList.add('chat-ready');
        const el = document.getElementById('chat-messages-inner');
        if (el) el.innerHTML = '<div style="text-align:center;padding:40px;color:#888">' + msg + '</div>';
    },


    /* ══════════════════════════════════
       PERSISTENCE
    ══════════════════════════════════ */

    _localKey() {
        return 'mm_chat_' + (this.form ? this.form.id : 'unknown');
    },

    _saveLocal(status) {
        try {
            const data = {
                formId: this.form.id,
                currentStep: this.currentStep,
                answers: this.answers,
                status: status || 'in_progress',
                updatedAt: Date.now()
            };
            localStorage.setItem(this._localKey(), JSON.stringify(data));
        } catch (e) { /* quota exceeded */ }
    },

    _loadLocal() {
        try {
            const raw = localStorage.getItem(this._localKey());
            if (!raw) return null;
            return JSON.parse(raw);
        } catch { return null; }
    },

    _clearLocal() {
        try { localStorage.removeItem(this._localKey()); } catch {}
    },

    /* ─── Supabase persistence ─── */
    _scheduleSave() {
        clearTimeout(this._saveTimer);
        this._saveTimer = setTimeout(() => this._saveToServer(), 2000);
    },

    async _saveToServer() {
        if (!this._tel || !this._code || typeof sb === 'undefined') return;
        try {
            await sb.rpc('save_form_progress', {
                p_telephone: this._tel,
                p_code: this._code,
                p_form_id: this.form.id,
                p_step: this.currentStep,
                p_answers: this.answers
            });
        } catch (e) { console.warn('Supabase save error:', e); }
    },

    async _loadServer() {
        if (!this._tel || !this._code || typeof sb === 'undefined') return null;
        try {
            const { data, error } = await sb.rpc('load_form_progress', {
                p_telephone: this._tel,
                p_code: this._code,
                p_form_id: this.form.id
            });
            if (error || !data) return null;
            return {
                formId: data.form_id,
                currentStep: data.current_step,
                answers: data.answers || {},
                status: data.status,
                updatedAt: new Date(data.updated_at).getTime()
            };
        } catch { return null; }
    },

    _pickBestSave(local, server) {
        if (!local && !server) return null;
        if (!local) return server;
        if (!server) return local;
        // Pick the one with more progress
        if ((server.currentStep || 0) > (local.currentStep || 0)) return server;
        return local;
    },


    /* ══════════════════════════════════
       CONFETTI
    ══════════════════════════════════ */

    _fireConfetti() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        if (typeof confetti !== 'function') return;

        // Center burst
        confetti({
            particleCount: 100,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#7c3aed', '#e8b4b8', '#7d9a8c', '#c9a962', '#A8D5BA']
        });

        // Side cannons
        const end = Date.now() + 2000;
        (function frame() {
            confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0 }, colors: ['#A8D5BA', '#6B8E7F', '#c9a962'] });
            confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1 }, colors: ['#A8D5BA', '#6B8E7F', '#c9a962'] });
            if (Date.now() < end) requestAnimationFrame(frame);
        }());
    }
};

/* ─── Boot ─── */
document.addEventListener('DOMContentLoaded', () => ChatEngine.init());
