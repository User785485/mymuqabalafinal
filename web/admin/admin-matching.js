/* ═══════════════════════════════════════
   MY MUQABALA — Matching & Exports Manager
   3-step workflow: Pre-matching -> Notify -> Definitive
   ───────────────────────────────────────
   V2 schema: profiles, matches, events, event_participants
═══════════════════════════════════════ */

const MatchingManager = {
    pool: [],
    results: [],
    events: [],
    selectedEventId: null,
    confirmationStatus: null,

    async init() {
        await Promise.all([this.loadPool(), this.loadResults(), this.loadEvents()]);
    },

    /* ═══ EVENTS ═══ */

    async loadEvents() {
        var { data, error } = await sb.from('events')
            .select('id, titre, date_evenement, statut')
            .eq('type', 'matching')
            .order('date_evenement', { ascending: false })
            .limit(20);
        if (error) { console.warn('Events load:', error.message); return; }
        this.events = data || [];
        this.renderEventSelector();
    },

    renderEventSelector() {
        var container = document.getElementById('event-selector-container');
        if (!container) return;
        if (this.events.length === 0) {
            container.innerHTML = '<span style="font-size:0.82rem;color:var(--ink-muted)">Aucun \u00e9v\u00e9nement matching cr\u00e9\u00e9</span>';
            return;
        }
        this.selectedEventId = this.events[0].id;
        var self = this;
        container.innerHTML = '<select id="matching-event-select" style="padding:0.5rem 0.75rem;border-radius:8px;border:1px solid rgba(107,90,156,0.15);font-size:0.85rem;background:var(--card-bg,#fff)">' +
            this.events.map(function(e) {
                var date = new Date(e.date_evenement).toLocaleDateString('fr-FR');
                return '<option value="' + e.id + '">' + AdminApp._esc(e.titre) + ' \u2014 ' + date + ' (' + e.statut + ')</option>';
            }).join('') +
            '</select>';
        document.getElementById('matching-event-select').addEventListener('change', function(ev) {
            self.selectedEventId = ev.target.value;
            self.loadConfirmationStatus();
            self.loadResults();
        });
        // Load confirmation status for first event
        this.loadConfirmationStatus();
    },

    /* ═══ POOL (V2: profiles table) ═══ */

    async loadPool() {
        const { data, error } = await sb.from('profiles')
            .select('id, prenom, nom, statut_parcours, genre, is_high_ticket, nb_events_participes')
            .eq('statut_parcours', 'matching_pool')
            .order('is_high_ticket', { ascending: false })
            .order('nb_events_participes', { ascending: true });
        if (error) { AdminApp.toast('Erreur chargement pool', 'error'); return; }
        this.pool = data || [];
        this.renderPool();
    },

    renderPool() {
        var container = document.getElementById('matching-pool');
        if (!container) return;

        var countEl = document.getElementById('pool-count');
        if (countEl) countEl.textContent = this.pool.length;

        var hommes = this.pool.filter(function(c) { return c.genre === 'homme'; }).length;
        var femmes = this.pool.filter(function(c) { return c.genre === 'femme'; }).length;
        var balanceEl = document.getElementById('gender-balance');
        if (balanceEl) balanceEl.innerHTML = '<span style="color:var(--purple)">' + hommes + ' hommes</span> / <span style="color:var(--rose-deep)">' + femmes + ' femmes</span>';

        if (this.pool.length === 0) {
            container.innerHTML = '<div class="admin-list-empty" style="padding:2rem">Aucun profil en statut matching_pool.</div>';
            return;
        }

        container.innerHTML = this.pool.map(function(c) {
            var htBadge = c.is_high_ticket ? 'High Ticket' : 'Standard';
            var htClass = c.is_high_ticket ? 'actif' : 'inactif';
            return '<div class="admin-item-card">' +
                '<div class="admin-list-avatar">' + (c.prenom || '?').charAt(0).toUpperCase() + '</div>' +
                '<div class="admin-item-info">' +
                '<div class="admin-item-title">' + AdminApp._esc(c.prenom || '') + ' ' + AdminApp._esc(c.nom || '') + '</div>' +
                '<div class="admin-item-sub">' + (c.genre || 'non d\u00e9fini') + ' \u2014 ' + (c.nb_events_participes || 0) + ' \u00e9v\u00e9nement(s)</div>' +
                '</div>' +
                '<span class="admin-item-badge ' + htClass + '">' + htBadge + '</span>' +
                '</div>';
        }).join('');
    },

    /* ═══ RESULTS (V2: matches table) ═══ */

    async loadResults() {
        var query = sb.from('matches')
            .select('id, event_id, user_1_id, user_2_id, score_compatibilite, statut, created_at, user_1:profiles!matches_user_1_id_fkey(prenom, nom), user_2:profiles!matches_user_2_id_fkey(prenom, nom)')
            .order('created_at', { ascending: false })
            .limit(50);

        // Filter by selected event if available
        if (this.selectedEventId) {
            query = query.eq('event_id', this.selectedEventId);
        }

        var { data, error } = await query;
        if (error) { console.warn('Matching results:', error.message); this.results = []; this.renderResults(); return; }
        this.results = data || [];
        this.renderResults();
    },

    renderResults() {
        var container = document.getElementById('matching-results');
        if (!container) return;

        if (this.results.length === 0) {
            container.innerHTML = '<div class="admin-list-empty" style="padding:2rem">Aucun r\u00e9sultat. Lancez le pr\u00e9-matching.</div>';
            return;
        }

        container.innerHTML = this.results.map(function(r) {
            var name1 = r.user_1 ? (r.user_1.prenom + ' ' + (r.user_1.nom || '')) : 'Inconnu';
            var name2 = r.user_2 ? (r.user_2.prenom + ' ' + (r.user_2.nom || '')) : 'Inconnu';
            var score = r.score_compatibilite || 0;
            var statut = r.statut || 'propose';
            return '<div style="background:var(--card-bg,#fff);border-radius:12px;border:1px solid rgba(107,90,156,0.08);padding:1.25rem;margin-bottom:0.75rem">' +
                '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem">' +
                '<div style="font-weight:600;font-size:0.92rem">' + AdminApp._esc(name1) + ' <span style="color:var(--ink-muted);font-weight:400">\u2194</span> ' + AdminApp._esc(name2) + '</div>' +
                '<span style="font-size:0.78rem;padding:0.25rem 0.75rem;border-radius:100px;background:rgba(124,58,237,0.1);color:var(--purple)">' + score + '%</span>' +
                '</div>' +
                '<div style="font-size:0.78rem;color:var(--ink-muted)">Statut : ' + statut + '</div>' +
                '</div>';
        }).join('');
    },

    /* ═══ STEP 1: PRE-MATCHING ═══ */

    async runPreMatching() {
        if (!this.selectedEventId) {
            AdminApp.toast('S\u00e9lectionnez un \u00e9v\u00e9nement d\'abord', 'error');
            return;
        }
        if (!confirm('Lancer le pr\u00e9-matching sur le pool actuel ?\n\nCela calcule les compatibilit\u00e9s sans cr\u00e9er les matchs d\u00e9finitifs.')) return;

        AdminApp.toast('Pr\u00e9-matching en cours...', 'success');
        var { data, error } = await sb.rpc('run_matching_algorithm', {
            p_event_id: this.selectedEventId,
            p_confirmed_only: false
        });

        if (error) { AdminApp.toast('Erreur: ' + error.message, 'error'); return; }

        var msg = 'Pr\u00e9-matching termin\u00e9 ! ' + (data.matches_created || 0) + ' compatibilit\u00e9(s) trouv\u00e9e(s)';
        if (data.undermatched && data.undermatched.length > 0) {
            msg += '\n\u26a0 ' + data.undermatched.length + ' profil(s) sans match';
        }
        AdminApp.toast(msg, 'success');
        await this.loadResults();
        this.updateWorkflowButtons();
    },

    /* ═══ STEP 2: NOTIFY PARTICIPANTS ═══ */

    async notifyParticipants() {
        if (!this.selectedEventId) {
            AdminApp.toast('S\u00e9lectionnez un \u00e9v\u00e9nement d\'abord', 'error');
            return;
        }

        if (this.results.length === 0) {
            AdminApp.toast('Lancez d\'abord le pr\u00e9-matching', 'error');
            return;
        }

        if (!confirm('Envoyer les notifications aux participants ?\n\nChaque participant avec des compatibilit\u00e9s recevra une alerte push.')) return;

        AdminApp.toast('Envoi des notifications...', 'success');

        try {
            var { data: result, error: fnError } = await sb.functions.invoke('notify-pre-matching', {
                body: { event_id: this.selectedEventId }
            });

            if (fnError) {
                AdminApp.toast('Erreur: ' + (fnError.message || 'Erreur inconnue'), 'error');
                return;
            }

            AdminApp.toast(
                (result.notified_count || 0) + ' participant(s) notifi\u00e9(s), ' +
                (result.push_sent || 0) + ' push envoy\u00e9(s)',
                'success'
            );

            await this.loadConfirmationStatus();
            this.updateWorkflowButtons();
        } catch (err) {
            AdminApp.toast('Erreur r\u00e9seau: ' + err.message, 'error');
        }
    },

    /* ═══ CONFIRMATION STATUS ═══ */

    async loadConfirmationStatus() {
        if (!this.selectedEventId) return;

        var { data, error } = await sb.rpc('get_event_confirmation_status', {
            p_event_id: this.selectedEventId
        });

        if (error) { console.warn('Confirmation status:', error.message); return; }
        this.confirmationStatus = data;
        this.renderConfirmationTracker();
        this.updateWorkflowButtons();
    },

    renderConfirmationTracker() {
        var container = document.getElementById('confirmation-tracker');
        if (!container) return;

        var s = this.confirmationStatus;
        if (!s || s.total === 0) {
            container.innerHTML = '';
            return;
        }

        var pctConfirme = Math.round((s.confirme / s.total) * 100);
        container.innerHTML =
            '<div style="background:var(--card-bg,#fff);border-radius:12px;border:1px solid rgba(107,90,156,0.08);padding:1.25rem;margin-bottom:1rem">' +
            '<div style="font-weight:600;font-size:0.92rem;margin-bottom:0.75rem">Confirmations</div>' +
            '<div style="display:flex;gap:1rem;margin-bottom:0.75rem">' +
            '<div style="text-align:center;flex:1"><div style="font-size:1.5rem;font-weight:700;color:var(--purple)">' + s.confirme + '</div><div style="font-size:0.72rem;color:var(--ink-muted)">Confirm\u00e9(s)</div></div>' +
            '<div style="text-align:center;flex:1"><div style="font-size:1.5rem;font-weight:700;color:var(--ink-muted)">' + s.en_attente + '</div><div style="font-size:0.72rem;color:var(--ink-muted)">En attente</div></div>' +
            '<div style="text-align:center;flex:1"><div style="font-size:1.5rem;font-weight:700;color:var(--rose-deep,#c44)">' + s.decline + '</div><div style="font-size:0.72rem;color:var(--ink-muted)">D\u00e9clin\u00e9(s)</div></div>' +
            '</div>' +
            '<div style="background:rgba(107,90,156,0.08);border-radius:100px;height:8px;overflow:hidden">' +
            '<div style="background:var(--purple);height:100%;width:' + pctConfirme + '%;border-radius:100px;transition:width 0.3s"></div>' +
            '</div>' +
            '<div style="font-size:0.72rem;color:var(--ink-muted);margin-top:0.5rem">' + pctConfirme + '% confirm\u00e9 (' + s.confirme + '/' + s.total + ')</div>' +
            '</div>';
    },

    /* ═══ STEP 3: DEFINITIVE MATCHING ═══ */

    async runDefinitiveMatching() {
        if (!this.selectedEventId) {
            AdminApp.toast('S\u00e9lectionnez un \u00e9v\u00e9nement d\'abord', 'error');
            return;
        }

        var s = this.confirmationStatus;
        if (!s || s.confirme === 0) {
            AdminApp.toast('Aucun participant confirm\u00e9. Attendez les confirmations.', 'error');
            return;
        }

        if (!confirm('Lancer le matching d\u00e9finitif avec les ' + s.confirme + ' participant(s) confirm\u00e9(s) ?\n\nLes pr\u00e9-matchs seront supprim\u00e9s et remplac\u00e9s par les matchs d\u00e9finitifs.')) return;

        AdminApp.toast('Matching d\u00e9finitif en cours...', 'success');

        var { data, error } = await sb.rpc('run_matching_algorithm', {
            p_event_id: this.selectedEventId,
            p_confirmed_only: true
        });

        if (error) { AdminApp.toast('Erreur: ' + error.message, 'error'); return; }

        var msg = 'Matching d\u00e9finitif termin\u00e9 ! ' + (data.matches_created || 0) + ' match(s) cr\u00e9\u00e9(s)';
        msg += ' (' + (data.pre_matches_cleaned || 0) + ' pr\u00e9-matchs nettoy\u00e9s)';
        AdminApp.toast(msg, 'success');
        await this.loadResults();
    },

    /* ═══ STEP 4: PREPARE BLINK DATES ═══ */

    async prepareBlinkDates() {
        if (!this.selectedEventId) {
            AdminApp.toast('S\u00e9lectionnez un \u00e9v\u00e9nement d\'abord', 'error');
            return;
        }

        var confirmedMatches = this.results.filter(function(r) { return r.statut === 'confirme_mutuel'; });
        if (confirmedMatches.length === 0) {
            AdminApp.toast('Aucun match confirm\u00e9 mutuel. Lancez d\'abord le matching d\u00e9finitif.', 'error');
            return;
        }

        if (!confirm('Pr\u00e9parer les Blink Dates pour ' + confirmedMatches.length + ' match(s) confirm\u00e9(s) ?\n\nCela cr\u00e9e le planning des rounds et les s\u00e9lections photos.')) return;

        AdminApp.toast('Pr\u00e9paration en cours...', 'success');
        var { data, error } = await sb.rpc('prepare_blink_date_event', {
            p_event_id: this.selectedEventId
        });

        if (error) { AdminApp.toast('Erreur: ' + error.message, 'error'); return; }

        AdminApp.toast(
            'Pr\u00e9paration termin\u00e9e ! ' + (data.total_blink_dates || 0) + ' blink date(s) cr\u00e9\u00e9(s) en ' + (data.total_rounds || 0) + ' round(s)',
            'success'
        );
        this.updateWorkflowButtons();
    },

    /* ═══ STEP 5: LAUNCH EVENT ═══ */

    async launchEvent() {
        if (!this.selectedEventId) {
            AdminApp.toast('S\u00e9lectionnez un \u00e9v\u00e9nement d\'abord', 'error');
            return;
        }

        if (!confirm('Lancer l\'\u00e9v\u00e9nement ?\n\nLe statut passera \u00e0 "en_cours" et tous les participants seront notifi\u00e9s.')) return;

        AdminApp.toast('Lancement en cours...', 'success');

        try {
            var { data: result, error: fnError } = await sb.functions.invoke('launch-event', {
                body: { event_id: this.selectedEventId }
            });

            if (fnError) {
                AdminApp.toast('Erreur: ' + (fnError.message || 'Erreur inconnue'), 'error');
                return;
            }

            AdminApp.toast(
                '\u00c9v\u00e9nement lanc\u00e9 ! ' + (result.push_sent || 0) + ' notification(s) envoy\u00e9e(s) \u00e0 ' + (result.participants_count || 0) + ' participant(s)',
                'success'
            );
            this.updateWorkflowButtons();
        } catch (err) {
            AdminApp.toast('Erreur r\u00e9seau: ' + err.message, 'error');
        }
    },

    /* ═══ STEP 6: RESOLVE MATCHES ═══ */

    async resolveMatches() {
        if (!this.selectedEventId) {
            AdminApp.toast('S\u00e9lectionnez un \u00e9v\u00e9nement d\'abord', 'error');
            return;
        }

        if (!confirm('R\u00e9soudre tous les matchs de cet \u00e9v\u00e9nement ?\n\nLes matchs seront class\u00e9s en "confirm\u00e9" ou "rejet\u00e9" selon les feedbacks et photos.')) return;

        AdminApp.toast('R\u00e9solution en cours...', 'success');
        var { data, error } = await sb.rpc('resolve_event_matches', {
            p_event_id: this.selectedEventId
        });

        if (error) { AdminApp.toast('Erreur: ' + error.message, 'error'); return; }

        AdminApp.toast(
            'R\u00e9solution termin\u00e9e ! ' + (data.confirmed_count || 0) + ' match(s) confirm\u00e9(s), ' + (data.rejected_count || 0) + ' rejet\u00e9(s)',
            'success'
        );

        // Display confirmed matches
        this.renderConfirmedMatches(data.confirmed_matches || []);

        // Create channels for confirmed matches
        if (data.confirmed_count > 0) {
            AdminApp.toast('Cr\u00e9ation des channels de chat...', 'success');
            try {
                await sb.functions.invoke('create-event-channels', {
                    body: { event_id: this.selectedEventId }
                });
                AdminApp.toast('Channels de chat cr\u00e9\u00e9s !', 'success');
            } catch (chErr) {
                AdminApp.toast('Erreur cr\u00e9ation channels: ' + chErr.message, 'error');
            }
        }

        await this.loadResults();
    },

    renderConfirmedMatches(matches) {
        var section = document.getElementById('confirmed-matches-section');
        var container = document.getElementById('confirmed-matches-table');
        if (!section || !container) return;

        if (matches.length === 0) {
            section.style.display = 'none';
            return;
        }

        section.style.display = 'block';
        container.innerHTML = matches.map(function(m) {
            return '<div style="background:var(--card-bg,#fff);border-radius:12px;border:1px solid rgba(34,197,94,0.2);padding:1rem;display:flex;justify-content:space-between;align-items:center">' +
                '<div style="display:flex;align-items:center;gap:0.75rem">' +
                '<span style="font-size:1.2rem">\u2764\ufe0f</span>' +
                '<span style="font-weight:600;font-size:0.9rem">' + AdminApp._esc(m.user_1_id).substring(0, 8) + ' \u2194 ' + AdminApp._esc(m.user_2_id).substring(0, 8) + '</span>' +
                '</div>' +
                '<span style="font-size:0.78rem;padding:0.25rem 0.75rem;border-radius:100px;background:rgba(34,197,94,0.1);color:#16a34a">' + (m.score || 0) + '%</span>' +
                '</div>';
        }).join('');
    },

    /* ═══ WORKFLOW UI ═══ */

    updateWorkflowButtons() {
        var btn2 = document.getElementById('btn-notify');
        var btn3 = document.getElementById('btn-definitive');
        var btn4 = document.getElementById('btn-prepare-blink');
        var btn5 = document.getElementById('btn-launch-event');
        var btn6 = document.getElementById('btn-resolve');

        if (btn2) {
            btn2.disabled = this.results.length === 0;
            btn2.style.opacity = this.results.length === 0 ? '0.4' : '1';
        }

        if (btn3) {
            var hasConfirmed = this.confirmationStatus && this.confirmationStatus.confirme > 0;
            btn3.disabled = !hasConfirmed;
            btn3.style.opacity = hasConfirmed ? '1' : '0.4';
        }

        // Step 4: enabled when there are confirme_mutuel matches
        var hasConfirmeMutuel = this.results.some(function(r) { return r.statut === 'confirme_mutuel'; });
        if (btn4) {
            btn4.disabled = !hasConfirmeMutuel;
            btn4.style.opacity = hasConfirmeMutuel ? '1' : '0.4';
        }

        // Step 5: enabled when step 4 has been run (blink dates exist)
        if (btn5) {
            btn5.disabled = !hasConfirmeMutuel;
            btn5.style.opacity = hasConfirmeMutuel ? '1' : '0.4';
        }

        // Step 6: enabled when event is en_cours
        var currentEvent = this.events.find(function(e) { return e.id === this.selectedEventId; }.bind(this));
        var isEnCours = currentEvent && currentEvent.statut === 'en_cours';
        if (btn6) {
            btn6.disabled = !isEnCours;
            btn6.style.opacity = isEnCours ? '1' : '0.4';
        }
    },

    /* ═══ EXPORTS (V2: profiles table) ═══ */

    async exportCSV() {
        var { data, error } = await sb.from('profiles')
            .select('id, prenom, nom, email, telephone, statut_parcours, genre, is_high_ticket');
        if (error) { AdminApp.toast('Erreur export', 'error'); return; }

        var rows = [['ID', 'Pr\u00e9nom', 'Nom', 'Email', 'T\u00e9l\u00e9phone', 'Statut', 'Genre', 'High Ticket']];
        (data || []).forEach(function(c) {
            rows.push([c.id, c.prenom || '', c.nom || '', c.email || '', c.telephone || '', c.statut_parcours || '', c.genre || '', c.is_high_ticket ? 'Oui' : 'Non']);
        });

        var csv = rows.map(function(r) {
            return r.map(function(v) { return '"' + String(v).replace(/"/g, '""') + '"'; }).join(',');
        }).join('\n');
        this._download(csv, 'mymuqabala-export-' + new Date().toISOString().split('T')[0] + '.csv', 'text/csv');
        AdminApp.toast('Export CSV t\u00e9l\u00e9charg\u00e9', 'success');
    },

    async exportJSON() {
        var { data, error } = await sb.from('profiles').select('*');
        if (error) { AdminApp.toast('Erreur export', 'error'); return; }
        var json = JSON.stringify(data || [], null, 2);
        this._download(json, 'mymuqabala-export-' + new Date().toISOString().split('T')[0] + '.json', 'application/json');
        AdminApp.toast('Export JSON t\u00e9l\u00e9charg\u00e9', 'success');
    },

    _download(content, filename, type) {
        var blob = new Blob([content], { type: type });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url; a.download = filename; a.click();
        URL.revokeObjectURL(url);
    }
};
