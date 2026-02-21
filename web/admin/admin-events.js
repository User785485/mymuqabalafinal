/* ═══════════════════════════════════════
   MY MUQABALA — Events CRUD Module
   Manage events from the admin panel
═══════════════════════════════════════ */

const EventManager = {
    events: [],
    editingEventId: null,

    async init() { await this.loadEvents(); },

    async loadEvents() {
        const { data, error } = await sb.from('events')
            .select('*').order('date_evenement', { ascending: true });
        if (error) { AdminApp.toast('Erreur chargement événements', 'error'); return; }
        this.events = data || [];
        this.render();
    },

    render() {
        const container = document.getElementById('events-list');
        if (!container) return;

        const countEl = document.getElementById('event-count');
        if (countEl) countEl.textContent = this.events.length;

        if (this.events.length === 0) {
            container.innerHTML = '<div class="admin-list-empty" style="padding:2rem">Aucun événement. Crée le premier !</div>';
            return;
        }

        container.innerHTML = this.events.map(evt => {
            const d = new Date(evt.date_evenement);
            const day = d.getDate();
            const month = d.toLocaleDateString('fr-FR', { month: 'short' });
            const typeBadge = evt.type || 'matching';
            const typeLabels = { matching: 'Matching', coaching_groupe: 'Coaching', blink_date: 'Blink Date' };
            const statusLabels = { planifie: 'Planifié', en_cours: 'En cours', termine: 'Terminé', annule: 'Annulé' };
            return '<div class="event-card" style="cursor:pointer" onclick="EventManager.edit(\'' + evt.id + '\')">' +
                '<div class="event-date-badge"><div class="event-date-day">' + day + '</div><div class="event-date-month">' + month + '</div></div>' +
                '<div class="event-info"><div class="event-title">' + AdminApp._esc(evt.titre || 'Événement') + '</div>' +
                '<span class="event-type-badge ' + typeBadge + '">' + (typeLabels[typeBadge] || typeBadge) + '</span>' +
                '<div class="event-participants">' + (evt.max_participants || 0) + ' participant(s)</div></div>' +
                '<div class="event-status-dot ' + (evt.statut || 'planifie') + '" title="' + (statusLabels[evt.statut] || 'Planifié') + '"></div>' +
                '</div>';
        }).join('');
    },

    showForm() {
        this.editingEventId = null;
        document.getElementById('evt-title').value = '';
        document.getElementById('evt-date').value = '';
        document.getElementById('evt-type').value = 'matching';
        document.getElementById('evt-status').value = 'planifie';
        document.getElementById('evt-description').value = '';
        document.getElementById('btn-delete-event').style.display = 'none';
        document.getElementById('event-editor').style.display = 'block';
    },

    edit(id) {
        const evt = this.events.find(e => e.id === id);
        if (!evt) return;
        this.editingEventId = id;
        document.getElementById('evt-title').value = evt.titre || '';
        document.getElementById('evt-date').value = evt.date_evenement ? evt.date_evenement.split('T')[0] : '';
        document.getElementById('evt-type').value = evt.type || 'matching';
        document.getElementById('evt-status').value = evt.statut || 'planifie';
        document.getElementById('evt-description').value = evt.description || '';
        document.getElementById('btn-delete-event').style.display = 'inline-flex';
        document.getElementById('event-editor').style.display = 'block';
    },

    async save() {
        const data = {
            titre: document.getElementById('evt-title').value.trim(),
            date_evenement: document.getElementById('evt-date').value,
            type: document.getElementById('evt-type').value,
            statut: document.getElementById('evt-status').value,
            description: document.getElementById('evt-description').value
        };
        if (!data.titre) { AdminApp.toast('Titre obligatoire', 'error'); return; }

        let error;
        if (this.editingEventId) {
            ({ error } = await sb.from('events').update(data).eq('id', this.editingEventId));
        } else {
            ({ error } = await sb.from('events').insert(data));
        }
        if (error) { AdminApp.toast('Erreur: ' + error.message, 'error'); return; }

        document.getElementById('event-editor').style.display = 'none';
        await this.loadEvents();
        AdminApp.toast('Événement sauvegardé', 'success');
    },

    async remove() {
        if (!this.editingEventId || !confirm('Supprimer cet événement ?')) return;
        const { error } = await sb.from('events').delete().eq('id', this.editingEventId);
        if (error) { AdminApp.toast('Erreur suppression', 'error'); return; }
        document.getElementById('event-editor').style.display = 'none';
        await this.loadEvents();
        AdminApp.toast('Événement supprimé', 'success');
    },

    cancelEdit() {
        document.getElementById('event-editor').style.display = 'none';
        this.editingEventId = null;
    }
};
