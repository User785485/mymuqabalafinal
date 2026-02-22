/* ═══════════════════════════════════════
   F1.3 — Le Fil Conducteur
   Converti depuis Typebot · 140 steps · 13 variables
═══════════════════════════════════════ */

const F1_3_FIL_CONDUCTEUR = {
    id: 'f1_3_fil_conducteur',
    version: 1,
    title: "F1.3 — Le Fil Conducteur",
    icon: '🧵',
    checkboxId: 'f1_3',
    theme: {
        background: '#FDFBF7',
        botBubbleBg: 'rgba(253, 251, 247, 0.9)',
        botBubbleText: '#4A3B6E',
        botBubbleBorder: 'rgba(212, 86, 156, 0.15)',
        userBubbleBg: '#6B5A9C',
        userBubbleText: '#FDFBF7',
        buttonBg: '#D4569C',
        buttonText: '#FDFBF7',
        inputBg: '#FDFBF7',
        inputText: '#4A3B6E',
        inputBorder: 'rgba(107, 90, 156, 0.25)',
        progressFill: 'linear-gradient(90deg, #D4569C, #D4A373)',
        progressBg: 'rgba(107, 90, 156, 0.1)'
    },
    bot: {
        name: 'Mohamed',
        avatar: 'M'
    },
    timing: {
        speed: 55,
        maxDelay: 2000,
        betweenBubbles: 1200
    },
    variables: [
        "ce_que_je_lache",
        "protection_energie_f2",
        "qui_celebrera_f2",
        "telephone",
        "var_capacite_profondeur",
        "var_email",
        "var_indicateurs_reussite",
        "var_manifestation_schemas",
        "var_objectif_relationnel",
        "var_objectifs_transformation",
        "var_prenom",
        "var_ressenti_corporel",
        "var_schemas_subtils"
],

    steps: [

        /* ════════════════════════════════════ */
        { type: 'section', title: "✨ Préparation" },

        { type: 'message', content: [{"text": "✨ Avant de continuer, vérifions que tu es "}, {"text": "prête pour la suite", "bold": true}, {"text": "."}] },
        { type: 'message', content: "Assure-toi d'avoir :" },
        { type: 'narrative', content: [{"text": "☐ Un "}, {"text": "moment calme", "bold": true}, {"text": " devant toi"}, {"text": "\n\n"}, {"text": "☐ Ton "}, {"text": "journal", "bold": true}, {"text": " à proximité si tu en ressens le besoin"}, {"text": "\n\n"}, {"text": "☐ Ton "}, {"text": "cœur ouvert", "bold": true}, {"text": " à la découverte"}, {"text": "\n\n"}, {"text": "☐ La "}, {"text": "permission intérieure", "bold": true}, {"text": " d'être authentique"}] },
        { type: 'narrative', content: [{"text": "Si tu es arrivée jusqu'ici, c'est que ton être profond sait qu'il est "}, {"text": "prêt", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Honore ce courage."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "commencer_l_exploration", "label": "Commencer l'exploration →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "📍 Exploration Approfondie" },

        { type: 'image', url: "https://images.unsplash.com/photo-1533810019453-7351dbd31aee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHNlYXJjaHw3NHx8ZXhwbG9yZXxlbnwwfDB8fHwxNzUyODMwNTU4fDA&ixlib=rb-4.1.0&q=80&w=1080", alt: "" },
        { type: 'message', content: [{"text": "Bismillah...", "italic": true}] },
        { type: 'message', content: [{"text": "Bienvenue dans cette "}, {"text": "exploration approfondie", "bold": true}, {"text": "."}] },
        { type: 'message', content: "Prends une grande respiration...\n\nSi tu le souhaites, pose ta main sur ton cœur pour te recentrer." },
        { type: 'message', content: [{"text": "Tu es en "}, {"text": "sécurité", "bold": true}, {"text": " pour explorer."}] },
        { type: 'message', content: [{"text": "💡 J'aimerais maintenant approfondir ta "}, {"text": "compréhension de toi-même", "bold": true}, {"text": "."}] },
        { type: 'message', content: [{"text": "Cette étape demande du courage car elle touche à des "}, {"text": "vérités parfois inconfortables", "bold": true}, {"text": "."}] },
        { type: 'message', content: [{"text": "Rumi disait : "}, {"text": "\"La blessure est l'endroit où la Lumière entre en toi\"", "italic": true}, {"text": "."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "explorer_mes_schemas", "label": "Explorer mes schémas →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "💭 Schémas Subtils" },

        { type: 'narrative', content: [{"text": "Parmi ces "}, {"text": "schémas subtils", "bold": true}, {"text": ", lesquels résonnent en toi ? 💭"}, {"text": "\n\n"}, {"text": "(Coche tous ceux qui résonnent)"}] },
        { type: 'choice', variable: 'var_schemas_subtils', multiple: true, options: [{"id": "tu_donnes_beaucoup_mais_recois", "label": "Tu donnes beaucoup mais reçois peu - \"Je dois mériter l'amour\""}, {"id": "tu_t_effaces_pour_maintenir_la", "label": "Tu t'effaces pour maintenir la paix - \"Mes besoins passent après\""}, {"id": "tu_intellectualises_tes_emotio", "label": "Tu intellectualises tes émotions - \"Si je comprends, je contrôle\""}, {"id": "tu_anticipes_le_rejet_je_pa", "label": "Tu anticipes le rejet - \"Je pars avant qu'on me quitte\""}, {"id": "tu_minimises_tes_succes_relati", "label": "Tu minimises tes succès relationnels ou autres - \"C'était juste de la chance\""}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Manifestation des schémas" },

        { type: 'message', content: [{"text": "Tu as simplement appris des "}, {"text": "stratégies de survie", "bold": true}, {"text": " qui ne te servent plus aujourd'hui."}] },
        { type: 'narrative', content: [{"text": "Si certains te parlent profondément..."}, {"text": "\n\n"}, {"text": "Tu n'es pas "}, {"text": "\"anormale\"", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "Comment et dans quelles situations ces schémas se sont-ils "}, {"text": "manifestés", "bold": true}, {"text": " ?"}, {"text": "\n\n"}, {"text": "(Relation amoureuse, amicale, familiale, professionnelle…)", "italic": true}] },
        { type: 'narrative', content: [{"text": "💬 Exprime-toi librement (audio ou écrit, comme tu préfères) ", "italic": true}, {"text": "\n\n"}, {"text": "✨ Plus tu partages, plus ta cartographie sera précise insha'Allah ", "italic": true}, {"text": "\n\n"}, {"text": "🎤 Audio uniquement sur WhatsApp !", "italic": true}, {"text": "\n\n"}, {"text": "🤍 Choisis ce qui te met le plus à l'aise", "italic": true}] },
        { type: 'text_input', variable: 'var_manifestation_schemas', placeholder: "Ton espace d'expression", isLong: true },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Reconnaissance des schémas" },

        { type: 'narrative', content: [{"text": "Reconnaître ces schémas demande une grande "}, {"text": "maturité émotionnelle", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Bravo pour ton courage."}] },
        { type: 'message', content: "💭 Il est possible que tu en reconnaisses plusieurs." },
        { type: 'narrative', content: [{"text": "92% des femmes identifient au moins "}, {"text": "3 de ces schémas", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Tu n'es ni brisée, ni anormale - tu es juste humaine."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "explorer_le_ressenti_corporel", "label": "Explorer le ressenti corporel →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "🧘‍♀️ Ressenti Corporel" },

        { type: 'message', content: [{"text": "🧘‍♀️ Maintenant, j'aimerais explorer comment ton "}, {"text": "corps vit ces schémas", "bold": true}, {"text": "."}] },
        { type: 'message', content: [{"text": "Quand tu reconnais ces schémas en toi, où les "}, {"text": "ressens-tu", "bold": true}, {"text": " dans ton corps ?"}] },
        { type: 'message', content: "Une tension dans la poitrine ?\n\nUn nœud dans le ventre ?\n\nUne lourdeur sur les épaules ?" },
        { type: 'message', content: [{"text": "💡 "}, {"text": "Note : Si c'est difficile de connecter avec ton corps, c'est normal. Beaucoup d'entre nous ont appris à se déconnecter pour survivre. Commence par ce que tu remarques, même si c'est subtil.", "italic": true}] },
        { type: 'narrative', content: [{"text": "💬 Exprime-toi librement (audio ou écrit, comme tu préfères) ", "italic": true}, {"text": "\n\n"}, {"text": "✨ Plus tu partages, plus ta cartographie sera précise insha'Allah ", "italic": true}, {"text": "\n\n"}, {"text": "🎤 Audio uniquement sur WhatsApp !", "italic": true}, {"text": "\n\n"}, {"text": "🤍 Choisis ce qui te met le plus à l'aise", "italic": true}] },
        { type: 'text_input', variable: 'var_ressenti_corporel', placeholder: "Ton espace d'expression", isLong: true },

        /* ════════════════════════════════════ */
        { type: 'section', title: "🎁 La Cartographie Personnalisée" },

        { type: 'image', url: "https://images.unsplash.com/photo-1499591934245-40b55745b905?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHNlYXJjaHwxMHx8Y2FydGV8ZW58MHwwfHx8MTc1MjY2NzY0OHww&ixlib=rb-4.1.0&q=80&w=1080", alt: "" },
        { type: 'message', content: [{"text": "🎁 Laisse-moi te décrire ce que ta cartographie "}, {"text": "t'offrira concrètement", "bold": true}, {"text": "."}] },
        { type: 'message', content: [{"text": "Elle sera ton "}, {"text": "guide personnel", "bold": true}, {"text": ", offrant :"}] },
        { type: 'message', content: [{"text": "🗺️ Une "}, {"text": "compréhension multidimensionnelle", "bold": true}, {"text": " - Psychologique, somatique, énergétique, spirituelle"}] },
        { type: 'message', content: [{"text": "🔍 Des "}, {"text": "connexions révélées", "bold": true}, {"text": " - Entre ton histoire, tes choix et tes aspirations"}] },
        { type: 'message', content: [{"text": "💡 Des "}, {"text": "protocoles sur mesure", "bold": true}, {"text": " - Adaptés à TON système unique"}] },
        { type: 'message', content: [{"text": "🌟 Une "}, {"text": "vision claire", "bold": true}, {"text": " - De qui tu peux devenir"}] },
        { type: 'message', content: [{"text": "📚 Un "}, {"text": "manuel personnel", "bold": true}, {"text": " - Pour ne plus te perdre en relation"}] },
        { type: 'message', content: [{"text": "🧭 Une "}, {"text": "boussole permanente", "bold": true}, {"text": " - À consulter dans 1 an, 5 ans, 10 ans"}] },
        { type: 'message', content: [{"text": "\"Cette cartographie a changé ma vie. Je la relis régulièrement et découvre toujours de nouvelles profondeurs.\"", "italic": true}, {"text": " - Fatima, 37 ans"}] },
        { type: 'message', content: [{"text": "💡 Je veux insister sur l'importance de "}, {"text": "l'authenticité", "bold": true}, {"text": "."}] },
        { type: 'message', content: [{"text": "Plus tu es vraie dans tes réponses, plus ta cartographie sera "}, {"text": "transformatrice", "bold": true}, {"text": "."}] },
        { type: 'message', content: [{"text": "C'est la qualité de ta sincérité qui détermine la "}, {"text": "profondeur de ta guérison", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "À quel point te sens-tu capable d'explorer tes "}, {"text": "profondeurs", "bold": true}, {"text": " ?"}, {"text": "\n\n"}, {"text": "(1 = Je reste prudente, 10 = Je plonge sans réserve)", "italic": true}] },
        { type: 'rating', variable: 'var_capacite_profondeur', max: 10, leftLabel: "Prudente", rightLabel: "Sans réserve" },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Validation capacité" },

        { type: 'narrative', content: [{"text": "Parfait."}, {"text": "\n\n"}, {"text": "Ton niveau actuel est exactement celui dont tu as "}, {"text": "besoin", "bold": true}, {"text": "."}] },
        { type: 'message', content: "Cette capacité évoluera naturellement au fil du voyage." },
        { type: 'choice', variable: 'choix', options: [{"id": "clarifier_mes_objectifs", "label": "Clarifier mes objectifs →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "📍 Objectifs de Transformation" },

        { type: 'message', content: [{"text": "📍 Maintenant, clarifions ensemble tes "}, {"text": "objectifs de transformation", "bold": true}, {"text": "."}] },
        { type: 'message', content: [{"text": "Des objectifs clairs sont comme des "}, {"text": "étoiles dans la nuit", "bold": true}, {"text": " - ils guident ton chemin même dans les moments difficiles."}] },
        { type: 'message', content: [{"text": "💫 Sais-tu pourquoi il est important de "}, {"text": "verbaliser tes aspirations", "bold": true}, {"text": " ?"}] },
        { type: 'message', content: [{"text": "Les neurosciences confirment : énoncer ses objectifs active des zones cérébrales spécifiques qui "}, {"text": "renforcent l'engagement", "bold": true}, {"text": "."}] },
        { type: 'message', content: [{"text": "C'est comme signer un "}, {"text": "contrat avec toi-même", "bold": true}, {"text": "."}] },
        { type: 'message', content: [{"text": "💡 Dans quelques semaines, quelle personne veux-tu être "}, {"text": "devenue", "bold": true}, {"text": " ?"}] },
        { type: 'message', content: "Voici quelques exemples pour t'inspirer :" },
        { type: 'narrative', content: [{"text": "\"Une femme qui ne répète plus les mêmes schémas toxiques\"", "italic": true}, {"text": "\n\n"}, {"text": "\"Quelqu'un qui sait dire non avec assurance\"", "italic": true}, {"text": "\n\n"}, {"text": "\"Une femme qui reconnaît les signaux d'alarme dès le début\"", "italic": true}, {"text": "\n\n"}, {"text": "\"Une personne qui s'aime assez pour partir quand nécessaire\"", "italic": true}, {"text": "\n\n"}, {"text": "\"Quelqu'un qui attire des partenaires émotionnellement disponibles\"", "italic": true}, {"text": "\n\n"}, {"text": "\"Une femme qui reste elle-même en couple\"", "italic": true}] },
        { type: 'message', content: [{"text": "Prends une grande respiration et exprime ce que tu veux "}, {"text": "vraiment transformer", "bold": true}, {"text": "..."}] },
        { type: 'narrative', content: [{"text": "💬 Exprime-toi librement (audio ou écrit, comme tu préfères) ", "italic": true}, {"text": "\n\n"}, {"text": "✨ Plus tu partages, plus ta cartographie sera précise insha'Allah ", "italic": true}, {"text": "\n\n"}, {"text": "🎤 Audio uniquement sur WhatsApp !", "italic": true}, {"text": "\n\n"}, {"text": "🤍 Choisis ce qui te met le plus à l'aise", "italic": true}] },
        { type: 'text_input', variable: 'var_objectifs_transformation', placeholder: "Ton espace d'expression", isLong: true },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Transition objectif relationnel" },

        { type: 'choice', variable: 'choix', options: [{"id": "definir_mon_objectif_relationn", "label": "Définir mon objectif relationnel →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "🎯 Objectif Relationnel" },

        { type: 'image', url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2", alt: "" },
        { type: 'message', content: [{"text": "🎯 Parlons maintenant de ton "}, {"text": "objectif relationnel principal", "bold": true}, {"text": "."}] },
        { type: 'message', content: "Voici quelques exemples pour t'inspirer :" },
        { type: 'narrative', content: [{"text": "\"Rencontrer un partenaire aligné avec mes valeurs\"", "italic": true}, {"text": "\n\n"}, {"text": "\"Vivre une relation stable et épanouissante\"", "italic": true}, {"text": "\n\n"}, {"text": "\"Apprendre à aimer sans dépendance\"", "italic": true}, {"text": "\n\n"}, {"text": "\"Construire un couple ancré dans la foi\"", "italic": true}, {"text": "\n\n"}, {"text": "\"Me sentir choisie et respectée pleinement\"", "italic": true}] },
        { type: 'message', content: [{"text": "Exprime ce que ton cœur "}, {"text": "désire vraiment", "bold": true}, {"text": ", pas ce que tu \"devrais\" vouloir."}] },
        { type: 'narrative', content: [{"text": "💬 "}, {"text": "Exprime-toi librement", "bold": true}, {"text": " Certaines trouvent l'audio plus naturel pour partager leurs émotionsD'autres préfèrent l'écrit pour structurer leurs pensées"}, {"text": "\n\n"}, {"text": "✨ "}, {"text": "Les deux sont parfaits.", "bold": true}, {"text": " Plus tu partages, plus ta cartographie sera précise et transformatrice insha'Allah."}, {"text": "\n\n"}, {"text": " Si tu préfères m'envoyer un "}, {"text": "message audio", "bold": true}, {"text": ", enregistre le directement sur WhatsApp"}, {"text": "\n\n"}, {"text": "🤍 "}, {"text": "Choisis ce qui te met le plus à l'aise", "italic": true}] },
        { type: 'text_input', variable: 'var_objectif_relationnel', placeholder: "Ton espace d'expression", isLong: true },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Indicateurs de réussite" },

        { type: 'message', content: [{"text": "✨ Comment sauras-tu que tu as "}, {"text": "réussi", "bold": true}, {"text": " ?"}] },
        { type: 'narrative', content: [{"text": "J'aimerais que tu sois "}, {"text": "spécifique", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Trouve des indicateurs concrets et observables."}] },
        { type: 'message', content: "Exemples pour t'inspirer :" },
        { type: 'narrative', content: [{"text": "\"J'exprimerai mes limites calmement\"", "italic": true}, {"text": "\n\n"}, {"text": "\"Je partagerai mes émotions sans crainte\"", "italic": true}, {"text": "\n\n"}, {"text": "\"Je ne chercherai plus à convaincre quelqu'un de rester\"", "italic": true}, {"text": "\n\n"}, {"text": "\"Je ressentirai de la paix dans mes décisions\"", "italic": true}] },
        { type: 'narrative', content: [{"text": "💬 "}, {"text": "Exprime-toi librement", "bold": true}, {"text": " Certaines trouvent l'audio plus naturel pour partager leurs émotionsD'autres préfèrent l'écrit pour structurer leurs pensées"}, {"text": "\n\n"}, {"text": "✨ "}, {"text": "Les deux sont parfaits.", "bold": true}, {"text": " Plus tu partages, plus ta cartographie sera précise et transformatrice insha'Allah."}, {"text": "\n\n"}, {"text": " Si tu préfères m'envoyer un "}, {"text": "message audio", "bold": true}, {"text": ", enregistre le directement sur WhatsApp"}, {"text": "\n\n"}, {"text": "🤍 "}, {"text": "Choisis ce qui te met le plus à l'aise", "italic": true}] },
        { type: 'text_input', variable: 'var_indicateurs_reussite', placeholder: "Ton espace d'expression", isLong: true },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Transition intention spirituelle" },

        { type: 'choice', variable: 'choix', options: [{"id": "explorer_mon_intention_spiritu", "label": "Explorer mon intention spirituelle →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "🌙 Intention Spirituelle" },

        { type: 'message', content: [{"text": "🌙 J'aimerais maintenant que nous explorions ton "}, {"text": "intention spirituelle", "bold": true}, {"text": " pour ce voyage."}] },
        { type: 'message', content: [{"text": "Place ta main sur ton cœur et "}, {"text": "connecte-toi au Divin", "bold": true}, {"text": "."}] },
        { type: 'message', content: [{"text": "Quelle est ton "}, {"text": "aspiration spirituelle profonde", "bold": true}, {"text": " ?"}] },
        { type: 'message', content: "Exemples pour t'inspirer :" },
        { type: 'narrative', content: [{"text": "\"Transformer mes blessures en sagesse\"", "italic": true}, {"text": "\n\n"}, {"text": "\"M'abandonner à la volonté divine\"", "italic": true}, {"text": "\n\n"}, {"text": "\"Faire de l'amour une voie spirituelle\"", "italic": true}, {"text": "\n\n"}, {"text": "\"Accueillir le qadar (le destin) avec confiance\"", "italic": true}] },
        { type: 'narrative', content: [{"text": "💬 "}, {"text": "Exprime-toi librement", "bold": true}, {"text": " Certaines trouvent l'audio plus naturel pour partager leurs émotionsD'autres préfèrent l'écrit pour structurer leurs pensées"}, {"text": "\n\n"}, {"text": "✨ "}, {"text": "Les deux sont parfaits.", "bold": true}, {"text": " Plus tu partages, plus ta cartographie sera précise et transformatrice insha'Allah."}, {"text": "\n\n"}, {"text": " Si tu préfères m'envoyer un "}, {"text": "message audio", "bold": true}, {"text": ", enregistre le directement sur WhatsApp"}, {"text": "\n\n"}, {"text": "🤍 "}, {"text": "Choisis ce qui te met le plus à l'aise", "italic": true}] },
        { type: 'text_input', variable: 'protection_energie_f2', placeholder: "Ton espace d'expression...", isLong: true },
        { type: 'narrative', content: [{"text": "Tu n'es pas "}, {"text": "seule", "bold": true}, {"text": " dans ce voyage."}, {"text": "\n\n"}, {"text": "D'autres soutiens viendront."}] },
        { type: 'message', content: [{"text": "Après ta transformation, qui "}, {"text": "célébrera", "bold": true}, {"text": " avec toi ?"}] },
        { type: 'narrative', content: [{"text": "💬 "}, {"text": "Exprime-toi librement", "bold": true}, {"text": " Certaines trouvent l'audio plus naturel pour partager leurs émotions. D'autres préfèrent l'écrit pour structurer leurs pensées"}, {"text": "\n\n"}, {"text": "✨ "}, {"text": "Les deux sont parfaits.", "bold": true}, {"text": " Plus tu partages, plus ta cartographie sera précise et transformatrice insha'Allah."}, {"text": "\n\n"}, {"text": " Si tu préfères m'envoyer un "}, {"text": "message audio", "bold": true}, {"text": ", enregistre le directement sur WhatsApp"}, {"text": "\n\n"}, {"text": "🤍 "}, {"text": "Choisis ce qui te met le plus à l'aise", "italic": true}] },
        { type: 'text_input', variable: 'qui_celebrera_f2', placeholder: "Ton espace d'expression...", isLong: true },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Validation spirituelle" },

        { type: 'choice', variable: 'choix', options: [{"id": "identifier_ce_dont_je_me_deles", "label": "Identifier ce dont je me déleste →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "💪 Lâcher Prise" },

        { type: 'message', content: [{"text": "💪 Maintenant, soyons honnêtes : qu'es-tu prête à "}, {"text": "lâcher", "bold": true}, {"text": " pour y arriver ?"}] },
        { type: 'narrative', content: [{"text": "L'honnêteté ici est "}, {"text": "cruciale", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "C'est ton engagement envers ta transformation."}] },
        { type: 'message', content: "Exemples pour t'inspirer :" },
        { type: 'narrative', content: [{"text": "\"La peur de l'abandon\"", "italic": true}, {"text": "\n\n"}, {"text": "\"Le besoin de contrôle\"", "italic": true}, {"text": "\n\n"}, {"text": "\"L'idée que je dois tout donner pour être aimée\"", "italic": true}, {"text": "\n\n"}, {"text": "\"Les relations ambiguës\"", "italic": true}] },
        { type: 'narrative', content: [{"text": "💬 "}, {"text": "Exprime-toi librement", "bold": true}, {"text": " Certaines trouvent l'audio plus naturel pour partager leurs émotionsD'autres préfèrent l'écrit pour structurer leurs pensées"}, {"text": "\n\n"}, {"text": "✨ "}, {"text": "Les deux sont parfaits.", "bold": true}, {"text": " Plus tu partages, plus ta cartographie sera précise et transformatrice insha'Allah."}, {"text": "\n\n"}, {"text": " Si tu préfères m'envoyer un "}, {"text": "message audio", "bold": true}, {"text": ", enregistre le directement sur WhatsApp"}, {"text": "\n\n"}, {"text": "🤍 "}, {"text": "Choisis ce qui te met le plus à l'aise", "italic": true}] },
        { type: 'text_input', variable: 'ce_que_je_lache', placeholder: "Ton espace d'expression", isLong: true },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Validation lâcher prise" },

        { type: 'narrative', content: [{"text": "Lâcher ces schémas demande beaucoup de "}, {"text": "courage", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Tu viens de faire un pas décisif."}] },
        { type: 'message', content: [{"text": "🌟  Identifier ce qu'on est prête à lâcher, c'est déjà commencer à "}, {"text": "desserrer l'emprise", "bold": true}, {"text": "."}] },
        { type: 'message', content: [{"text": "Tu viens de faire un "}, {"text": "acte de libération", "bold": true}, {"text": "."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "continuer", "label": "Continuer →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Transition vers Phase 3" },

        { type: 'image', url: "https://images.unsplash.com/photo-1455058683937-c45857082982?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHNlYXJjaHwxfHxsaWdodHxlbnwwfDB8fHwxNzUyODMwNjU4fDA&ixlib=rb-4.1.0&q=80&w=1080", alt: "" },
        { type: 'message', content: "Magnifique ! Le formulaire 1.3 est complet 💫" },
        { type: 'message', content: "Dans ce formulaire, tu as :" },
        { type: 'message', content: "✓ Identifié tes objectifs relationnes et de transformation" },
        { type: 'message', content: [{"text": "✓ Analysé ton "}, {"text": "aspiration spirituelle profonde", "bold": true}] },
        { type: 'message', content: "✓ Identifié ce dont tu es prête à te délester" },
        { type: 'message', content: "Le Formulaire 1.4 t'attend pour :" },
        { type: 'message', content: [{"text": "🌿 Évaluer ton "}, {"text": "bien-être global", "bold": true}] },
        { type: 'message', content: [{"text": "🛡️ Explorer tes "}, {"text": "stratégies d'apaisement", "bold": true}] },
        { type: 'message', content: [{"text": "🦋 Visualiser ta "}, {"text": "transformation", "bold": true}] },
        { type: 'message', content: [{"text": "🎯 Entamer ton "}, {"text": "plan d'action", "bold": true}] },
        { type: 'narrative', content: "🌿 Félicitations ! Tu viens de terminer le formulaire 3/6 de la Phase de Germination.\n\nTu as exploré tes schémas subtils et posé les bases de ta transformation. 📍\n\nProgression : [■■■□□□] 3/6 formulaires complétés\n\nLe Formulaire 1.4 t'attend pour explorer ton appel intérieur et ta situation actuelle.\n\nContinue quand tu seras prête... 🌸" },

        /* ════════════════════════════════════ */
        { type: 'section', title: "💫 Reconnexion" },

        { type: 'image', url: "https://images.unsplash.com/photo-1616984195751-acc4af582417?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHNlYXJjaHwyM3x8Zmxvd2Vyc3xlbnwwfDB8fHwxNzUyODMwNDMxfDA&ixlib=rb-4.1.0&q=80&w=1080", alt: "" },
        { type: 'message', content: [{"text": "Formulaire 1.3 : Les Schémas Subtils", "bold": true, "italic": true}] },
        { type: 'narrative', content: "💫 Bienvenue dans le Formulaire 1.3, le troisième volet de ta cartographie émotionnelle !\n\nRappel rapide : Tu as déjà complété 2 formulaires sur 6. Dans les parties précédentes, tu as créé ton espace sacré et exploré tes fondations.\n\nMaintenant, nous allons approfondir et créer ta cartographie personnalisée." },
        { type: 'message', content: [{"text": "Avant de continuer, quel est ton prénom ?"}, {"text": "\n\n"}, {"text": "(Pour personnaliser la suite de ton parcours)", "italic": true}] },
        { type: 'text_input', variable: 'var_prenom', placeholder: "Ton prénom..." },
        { type: 'message', content: [{"text": "Et ton email ?"}, {"text": "\n\n"}, {"text": "(Pour recevoir ta cartographie complète)", "italic": true}] },
        { type: 'email_input', variable: 'var_email', placeholder: "ton.email@exemple.com" },
        { type: 'message', content: [{"text": "Et ton numéro de téléphone ?"}, {"text": "\n\n"}, {"text": "(Pour recevoir ta cartographie complète)", "italic": true}] },
        { type: 'phone_input', variable: 'telephone', placeholder: "06 12 34 56 78", defaultPrefix: '+33' },
        { type: 'narrative', content: [{"text": "Prends une grande respiration..."}, {"text": "\n\n"}, {"text": "Es-tu prête à "}, {"text": "explorer tes profondeurs", "bold": true}, {"text": " ?"}] },
        { type: 'choice', variable: 'choix', options: [{"id": "je_suis_prete_a_explorer_mes_p", "label": "Je suis prête à explorer mes profondeurs →"}] },

        { type: 'completion', title: "Félicitations !", message: "Tu as terminé F1.3 — Le Fil Conducteur. Tes réponses ont été sauvegardées.", icon: '🧵' }
    ]
};

/* ─── Form Registry ─── */
if (typeof window.FORM_REGISTRY === 'undefined') window.FORM_REGISTRY = {};
window.FORM_REGISTRY['f1-3-fil-conducteur'] = F1_3_FIL_CONDUCTEUR;
