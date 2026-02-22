/* ═══════════════════════════════════════
   F1.6 — La Boussole Intérieure
   Converti depuis Typebot · 200 steps · 20 variables
═══════════════════════════════════════ */

const F1_6_BOUSSOLE_INTERIEURE = {
    id: 'f1_6_boussole_interieure',
    version: 1,
    title: "F1.6 — La Boussole Intérieure",
    icon: '🧭',
    checkboxId: 'f1_6',
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
        "capture_finale",
        "defis_actuels",
        "espace_cur",
        "foi_et_amour",
        "grande_decouverte",
        "marquer_moment",
        "marqueurs_reussite",
        "niveau_anxiete",
        "niveau_energie",
        "premier_pas",
        "qualite_sommeil",
        "ressenti_final",
        "self_care",
        "stabilite_emotionnelle",
        "strategies_apaisement",
        "stress_corporel",
        "telephone",
        "transformation_future",
        "un_mot",
        "visualisation_6_mois"
],

    steps: [

        /* ════════════════════════════════════ */
        { type: 'section', title: "Bienvenue Phase Finale" },

        { type: 'image', url: "https://images.unsplash.com/photo-1682687982183-c2937a74257c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHNlYXJjaHwxOHx8ZXhwbG9yZXxlbnwwfDB8fHwxNzUyNzU3MjEzfDA&ixlib=rb-4.1.0&q=80&w=1080", alt: "" },
        { type: 'message', content: [{"text": "Formulaire 1.6 : La Transformation", "bold": true, "italic": true}] },
        { type: 'message', content: "🦋 Nous voici au Formulaire 1.6 - le dernier formulaire de la Phase Germination !\n\nTu as parcouru 5 formulaires avec courage. Cette dernière étape ancrera ta transformation.\n\nIl est temps de visualiser ton futur et créer ton plan d'action concret." },
        { type: 'message', content: "Rappelle-moi ton prénom pour continuer ce voyage ensemble :" },
        { type: 'text_input', variable: 'reponse', placeholder: "Ton prénom..." },
        { type: 'email_input', variable: 'email', placeholder: "ton.email@exemple.com" },
        { type: 'phone_input', variable: 'telephone', placeholder: "06 12 34 56 78", defaultPrefix: '+33' },
        { type: 'choice', variable: 'choix', options: [{"id": "explorer_mon_bien_etre", "label": "Explorer mon bien-être →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Bien-être global" },

        { type: 'message', content: [{"text": "📍 Faisons maintenant un check-up de ton "}, {"text": "bien-être global", "bold": true}, {"text": "."}] },
        { type: 'message', content: [{"text": "🌡️ Ces questions me permettent de "}, {"text": "personnaliser", "bold": true}, {"text": " ton accompagnement."}] },
        { type: 'message', content: [{"text": "📊 Comment évaluerais-tu ton "}, {"text": "bien-être actuel", "bold": true}, {"text": " ?"}] },
        { type: 'message', content: [{"text": "😰 Niveau d'anxiété "}, {"text": "(1 = faible, 10 = élevée)", "italic": true}] },
        { type: 'rating', variable: 'niveau_anxiete', max: 10, leftLabel: "Faible", rightLabel: "Élevée" },
        { type: 'message', content: [{"text": "😴 Qualité du sommeil "}, {"text": "(1 = perturbé, 10 = excellent)", "italic": true}] },
        { type: 'rating', variable: 'qualite_sommeil', max: 10, leftLabel: "Perturbé", rightLabel: "Excellent" },
        { type: 'message', content: [{"text": "⚡ Niveau d'énergie "}, {"text": "(1 = bas, 10 = haut)", "italic": true}] },
        { type: 'rating', variable: 'niveau_energie', max: 10, leftLabel: "Bas", rightLabel: "Haut" },
        { type: 'message', content: [{"text": "🌊 Stabilité émotionnelle "}, {"text": "(1 = instable, 10 = stable)", "italic": true}] },
        { type: 'rating', variable: 'stabilite_emotionnelle', max: 10, leftLabel: "Instable", rightLabel: "Stable" },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Stress relationnel" },

        { type: 'message', content: [{"text": "🧘‍♀️ J'aimerais comprendre comment ton corps exprime ton "}, {"text": "stress relationnel", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "💡 Pourquoi explorer cela ?"}, {"text": "\n\n"}, {"text": "Ton corps est ton "}, {"text": "premier système d'alarme", "bold": true}, {"text": "."}] },
        { type: 'message', content: [{"text": "Reconnaître ses signaux te permet d'agir avant que l'anxiété ne prenne le "}, {"text": "contrôle", "bold": true}, {"text": "."}] },
        { type: 'message', content: [{"text": "Comment ton corps "}, {"text": "manifeste-t-il", "bold": true}, {"text": " le stress relationnel ?"}] },
        { type: 'message', content: "Manifestations courantes :" },
        { type: 'message', content: [{"text": "\"Gorge serrée quand je pense à nos disputes\"", "italic": true}] },
        { type: 'message', content: [{"text": "\"Migraines après ses messages ambigus\"", "italic": true}] },
        { type: 'message', content: [{"text": "\"Estomac noué avant nos rendez-vous\"", "italic": true}] },
        { type: 'message', content: [{"text": "\"Tensions dans la nuque quand il m'ignore\"", "italic": true}] },
        { type: 'message', content: [{"text": "\"Fatigue extrême après nos conversations\"", "italic": true}] },
        { type: 'message', content: [{"text": "\"Palpitations quand son nom apparaît\"", "italic": true}] },
        { type: 'message', content: [{"text": "💡 "}, {"text": "Note : Si c'est difficile de connecter avec ton corps, c'est normal. Beaucoup d'entre nous ont appris à se déconnecter pour survivre. Commence par ce que tu remarques, même si c'est subtil.", "italic": true}] },
        { type: 'narrative', content: [{"text": "💬 Exprime-toi librement (audio ou écrit, comme tu préfères) ", "italic": true}, {"text": "\n\n"}, {"text": "✨ Plus tu partages, plus ta cartographie sera précise insha'Allah ", "italic": true}, {"text": "\n\n"}, {"text": "🎤 Audio uniquement sur WhatsApp !", "italic": true}, {"text": "\n\n"}, {"text": "🤍 Choisis ce qui te met le plus à l'aise", "italic": true}] },
        { type: 'text_input', variable: 'stress_corporel', placeholder: "Ton espace d'expression...", isLong: true },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Défis actuels" },

        { type: 'image', url: "https://images.unsplash.com/photo-1658678921503-874deb85a7d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHNlYXJjaHw2fHxlc2NhbGFkZXxlbnwwfDB8fHwxNzUyNjY5NTQ1fDA&ixlib=rb-4.1.0&q=80&w=1080", alt: "" },
        { type: 'message', content: [{"text": "💭 Y a-t-il des "}, {"text": "défis actuels ou passés", "bold": true}, {"text": " que tu traverses ?"}] },
        { type: 'message', content: "Exemples pour t'inspirer :" },
        { type: 'message', content: "Période difficile au travail ou en famille" },
        { type: 'message', content: "Anxiété ou stress chronique" },
        { type: 'message', content: "Deuil ou perte récente" },
        { type: 'message', content: "Burnout ou épuisement" },
        { type: 'message', content: "Problèmes de santé" },
        { type: 'message', content: "Ou rien de particulier" },
        { type: 'narrative', content: [{"text": "💬 Exprime-toi librement (audio ou écrit, comme tu préfères) ", "italic": true}, {"text": "\n\n"}, {"text": "✨ Plus tu partages, plus ta cartographie sera précise insha'Allah ", "italic": true}, {"text": "\n\n"}, {"text": "🎤 Audio uniquement sur WhatsApp !", "italic": true}, {"text": "\n\n"}, {"text": "🤍 Choisis ce qui te met le plus à l'aise", "italic": true}] },
        { type: 'text_input', variable: 'defis_actuels', placeholder: "Ton espace d'expression...", isLong: true },
        { type: 'message', content: [{"text": "Traverser des défis tout en cherchant à te transformer témoigne de ta "}, {"text": "force intérieure", "bold": true}, {"text": "."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "explorer_mon_self_care", "label": "Explorer mon self-care →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Prendre soin de soi" },

        { type: 'message', content: [{"text": "🌿 J'aimerais comprendre comment tu "}, {"text": "prends soin de toi", "bold": true}, {"text": " actuellement."}] },
        { type: 'message', content: "Certaines femmes trouvent leur refuge dans la prière, d'autres dans la nature, certaines dans le mouvement..." },
        { type: 'message', content: "Exemples pour t'inspirer :" },
        { type: 'message', content: [{"text": "\"Je fais mes 5 prières, c'est mon ancrage quotidien\"", "italic": true}] },
        { type: 'message', content: [{"text": "\"La marche en nature me reconnecte à moi-même\"", "italic": true}] },
        { type: 'message', content: [{"text": "\"L'écriture dans mon journal est ma thérapie\"", "italic": true}] },
        { type: 'message', content: [{"text": "\"Les bains aux huiles essentielles m'apaisent\"", "italic": true}] },
        { type: 'message', content: [{"text": "\"Le sport est mon exutoire\"", "italic": true}] },
        { type: 'message', content: [{"text": "\"Honnêtement, j'ai du mal à prendre soin de moi...\"", "italic": true}] },
        { type: 'narrative', content: [{"text": "💬 Exprime-toi librement (audio ou écrit, comme tu préfères) ", "italic": true}, {"text": "\n\n"}, {"text": "✨ Plus tu partages, plus ta cartographie sera précise insha'Allah ", "italic": true}, {"text": "\n\n"}, {"text": "🎤 Audio uniquement sur WhatsApp !", "italic": true}, {"text": "\n\n"}, {"text": "🤍 Choisis ce qui te met le plus à l'aise", "italic": true}] },
        { type: 'text_input', variable: 'self_care', placeholder: "Ton espace d'expression...", isLong: true },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Stratégies d'apaisement" },

        { type: 'message', content: [{"text": "🛡️ Quelles sont tes stratégies pour t'apaiser quand les émotions deviennent "}, {"text": "intenses", "bold": true}, {"text": " ?"}] },
        { type: 'message', content: "Nous avons toutes développé des moyens de nous réguler - certains sains, d'autres moins." },
        { type: 'message', content: [{"text": "L'important est de les reconnaître "}, {"text": "sans jugement", "bold": true}, {"text": "."}] },
        { type: 'message', content: "Peut-être que tu :" },
        { type: 'message', content: "Appelles une amie de confiance" },
        { type: 'message', content: "Te réfugies dans la prière ou le dhikr" },
        { type: 'message', content: "Scrolles sur les réseaux" },
        { type: 'message', content: "Manges quelque chose de réconfortant" },
        { type: 'message', content: "T'isoles pour pleurer" },
        { type: 'message', content: "Fais du sport intensément" },
        { type: 'message', content: "Regardes des séries pour t'évader" },
        { type: 'message', content: "Autre chose ?" },
        { type: 'narrative', content: [{"text": "💬 Il n'y a pas de mauvaise réponse."}, {"text": "\n\n"}, {"text": "Connaître tes stratégies actuelles nous permettra de les "}, {"text": "optimiser ensemble", "bold": true}, {"text": "."}] },
        { type: 'text_input', variable: 'strategies_apaisement', placeholder: "Ton espace d'expression...", isLong: true },
        { type: 'choice', variable: 'choix', options: [{"id": "quelque_chose_a_deposer", "label": "Quelque chose à déposer →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Espace du cœur" },

        { type: 'image', url: "https://images.unsplash.com/photo-1626895684825-03b8655f26b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHNlYXJjaHwxfHxjb2xsZWN0aWZ8ZW58MHwwfHx8MTc1Mjc1ODQwMnww&ixlib=rb-4.1.0&q=80&w=1080", alt: "" },
        { type: 'message', content: [{"text": "❤️ Avant de clôturer cette section, y a-t-il quelque chose d'important que ton cœur aimerait "}, {"text": "déposer", "bold": true}, {"text": " ?"}] },
        { type: 'message', content: "Parfois, les questions structurées ne capturent pas tout." },
        { type: 'message', content: "Il peut y avoir :" },
        { type: 'message', content: [{"text": "Un "}, {"text": "secret", "bold": true}, {"text": " que tu portes depuis longtemps"}] },
        { type: 'message', content: [{"text": "Une "}, {"text": "peur", "bold": true}, {"text": " que tu n'as pas osé nommer"}] },
        { type: 'message', content: [{"text": "Un "}, {"text": "espoir", "bold": true}, {"text": " que tu gardes caché"}] },
        { type: 'message', content: [{"text": "Une "}, {"text": "intuition", "bold": true}, {"text": " sur ton chemin"}] },
        { type: 'message', content: [{"text": "Une "}, {"text": "douleur", "bold": true}, {"text": " qui a besoin d'être entendue"}] },
        { type: 'message', content: [{"text": "Ou simplement quelque chose qui a besoin d'être "}, {"text": "dit", "bold": true}] },
        { type: 'narrative', content: [{"text": "Cet espace est le tien."}, {"text": "\n\n"}, {"text": "Aucune attente, juste une "}, {"text": "invitation", "bold": true}, {"text": "..."}] },
        { type: 'message', content: [{"text": "💬 Laisse parler ce qui a besoin de "}, {"text": "s'exprimer", "bold": true}, {"text": "..."}] },
        { type: 'text_input', variable: 'espace_cur', placeholder: "Ton espace d'expression...", isLong: true },
        { type: 'message', content: [{"text": "✨ Tu débloques le "}, {"text": "Pilier de la Persévérance", "bold": true}, {"text": "."}] },
        { type: 'message', content: [{"text": "Pour être arrivée jusqu'ici avec "}, {"text": "constance", "bold": true}, {"text": "."}] },
        { type: 'message', content: [{"text": "\"Certes, avec la difficulté vient la facilité\"", "italic": true}, {"text": " (94:5)"}] },
        { type: 'choice', variable: 'choix', options: [{"id": "visualiser_ma_transformation", "label": "Visualiser ma transformation →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Visualisation" },

        { type: 'message', content: [{"text": "📍 Pour finir, visualisons ensemble ta "}, {"text": "transformation", "bold": true}, {"text": "."}] },
        { type: 'message', content: [{"text": "💡 Savais-tu que visualiser ta transformation la rend plus "}, {"text": "réelle", "bold": true}, {"text": " ?"}] },
        { type: 'message', content: [{"text": "Les neurosciences montrent que le cerveau ne fait pas la différence entre une visualisation intense et la "}, {"text": "réalité", "bold": true}, {"text": "."}] },
        { type: 'message', content: "Dans 6 mois, tu seras une femme qui..." },
        { type: 'message', content: [{"text": "Décris-la comme si tu la "}, {"text": "voyais", "bold": true}, {"text": "..."}] },
        { type: 'message', content: "💡 Ferme vraiment les yeux.\n\nImagine-la devant toi." },
        { type: 'message', content: "Comment se tient-elle ? Quelle lumière dans ses yeux ?\n\nComment marche-t-elle ? Comment parle-t-elle ?" },
        { type: 'message', content: "Quelle énergie émane d'elle ?\n\nQue porte-t-elle ? Comment se sent-elle dans son corps ?" },
        { type: 'narrative', content: [{"text": "💬 Exprime-toi librement (audio ou écrit, comme tu préfères) ", "italic": true}, {"text": "\n\n"}, {"text": "✨ Plus tu partages, plus ta cartographie sera précise insha'Allah ", "italic": true}, {"text": "\n\n"}, {"text": "🎤 Audio uniquement sur WhatsApp !", "italic": true}, {"text": "\n\n"}, {"text": "🤍 Choisis ce qui te met le plus à l'aise", "italic": true}] },
        { type: 'text_input', variable: 'visualisation_6_mois', placeholder: "Ton espace d'expression...", isLong: true },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Action immédiate" },

        { type: 'image', url: "https://images.unsplash.com/photo-1751536084702-2f2ef793fcf5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NTI2NzAzODh8&ixlib=rb-4.1.0&q=80&w=1080", alt: "" },
        { type: 'message', content: [{"text": "Quel est le premier petit pas que tu peux faire "}, {"text": "DÈS DEMAIN", "bold": true}, {"text": " ?"}] },
        { type: 'narrative', content: [{"text": "💡 Pourquoi cette question ?"}, {"text": "\n\n"}, {"text": "Le changement commence par une action, même "}, {"text": "minuscule", "bold": true}, {"text": "."}] },
        { type: 'message', content: [{"text": "Les neurosciences montrent qu'une micro-action crée un "}, {"text": "momentum", "bold": true}, {"text": " qui facilite les suivantes."}] },
        { type: 'message', content: "Exemples pour t'inspirer :" },
        { type: 'message', content: [{"text": "\"Bloquer 10 minutes le matin pour respirer consciemment\"", "italic": true}] },
        { type: 'message', content: [{"text": "\"Effacer son numéro de mon téléphone\"", "italic": true}] },
        { type: 'message', content: [{"text": "\"M'inscrire à ce cours qui m'attire depuis longtemps\"", "italic": true}] },
        { type: 'message', content: [{"text": "\"Écrire une gratitude avant de dormir\"", "italic": true}] },
        { type: 'message', content: [{"text": "\"Appeler cette amie bienveillante\"", "italic": true}] },
        { type: 'message', content: [{"text": "\"Commencer mon journal\"", "italic": true}] },
        { type: 'message', content: [{"text": "\"Faire une prière de l'istikhara pour ma guidance\"", "italic": true}] },
        { type: 'narrative', content: [{"text": "💬 Exprime-toi librement (audio ou écrit, comme tu préfères) ", "italic": true}, {"text": "\n\n"}, {"text": "✨ Plus tu partages, plus ta cartographie sera précise insha'Allah ", "italic": true}, {"text": "\n\n"}, {"text": "🎤 Audio uniquement sur WhatsApp !", "italic": true}, {"text": "\n\n"}, {"text": "🤍 Choisis ce qui te met le plus à l'aise", "italic": true}] },
        { type: 'text_input', variable: 'premier_pas', placeholder: "Ton espace d'expression...", isLong: true },
        { type: 'choice', variable: 'choix', options: [{"id": "identifier_mes_marqueurs", "label": "Identifier mes marqueurs →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Marqueurs de réussite" },

        { type: 'message', content: [{"text": "Qu'est-ce qui te dira que tu es sur la "}, {"text": "bonne voie", "bold": true}, {"text": " ?"}] },
        { type: 'narrative', content: [{"text": "💡 L'intérêt de cette question :"}, {"text": "\n\n"}, {"text": "Identifier des marqueurs concrets te permet de "}, {"text": "célébrer tes progrès", "bold": true}, {"text": " et de rester motivée."}] },
        { type: 'message', content: [{"text": "Ce sont tes "}, {"text": "\"preuves\"", "bold": true}, {"text": " personnelles de transformation."}] },
        { type: 'message', content: "Signes possibles :" },
        { type: 'message', content: [{"text": "\"Je ne vérifie plus ses stories obsessivement\"", "italic": true}] },
        { type: 'message', content: [{"text": "\"Mon sommeil s'améliore naturellement\"", "italic": true}] },
        { type: 'message', content: [{"text": "\"Je ressens moins cette boule d'anxiété\"", "italic": true}] },
        { type: 'message', content: [{"text": "\"Je dis non sans me justifier pendant 10 minutes\"", "italic": true}] },
        { type: 'message', content: [{"text": "\"Les larmes viennent moins souvent\"", "italic": true}] },
        { type: 'message', content: [{"text": "\"Je souris vraiment, pas juste poliment\"", "italic": true}] },
        { type: 'message', content: [{"text": "\"Je ressens de la paix après mes prières\"", "italic": true}] },
        { type: 'message', content: [{"text": "\"Mon intuition devient plus claire\"", "italic": true}] },
        { type: 'narrative', content: [{"text": "💬 Exprime-toi librement (audio ou écrit, comme tu préfères) ", "italic": true}, {"text": "\n\n"}, {"text": "✨ Plus tu partages, plus ta cartographie sera précise insha'Allah ", "italic": true}, {"text": "\n\n"}, {"text": "🎤 Audio uniquement sur WhatsApp !", "italic": true}, {"text": "\n\n"}, {"text": "🤍 Choisis ce qui te met le plus à l'aise", "italic": true}] },
        { type: 'text_input', variable: 'marqueurs_reussite', placeholder: "Ton espace d'expression...", isLong: true },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Foi et amour" },

        { type: 'message', content: [{"text": "🌙 Une dernière question importante : ta "}, {"text": "relation spirituelle", "bold": true}, {"text": " et l'amour."}] },
        { type: 'message', content: [{"text": "Comment ta foi influence-t-elle ta "}, {"text": "vision de l'amour", "bold": true}, {"text": " ?"}] },
        { type: 'message', content: "Est-ce une force ? Un conflit ? Une guidance ?" },
        { type: 'narrative', content: [{"text": "💬 Exprime-toi librement (audio ou écrit, comme tu préfères) ", "italic": true}, {"text": "\n\n"}, {"text": "✨ Plus tu partages, plus ta cartographie sera précise insha'Allah ", "italic": true}, {"text": "\n\n"}, {"text": "🎤 Audio uniquement sur WhatsApp !", "italic": true}, {"text": "\n\n"}, {"text": "🤍 Choisis ce qui te met le plus à l'aise", "italic": true}] },
        { type: 'text_input', variable: 'foi_et_amour', placeholder: "Ton espace d'expression...", isLong: true },
        { type: 'narrative', content: [{"text": "Cette vision est maintenant "}, {"text": "ancrée", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Elle guide déjà tes pas."}] },
        { type: 'message', content: [{"text": "📔 Avant de clôturer, y a-t-il quelque chose que tu voudrais "}, {"text": "capturer", "bold": true}, {"text": " ?"}] },
        { type: 'message', content: "Un espace pour toi :" },
        { type: 'text_input', variable: 'capture_finale', placeholder: "Zone de texte libre...", isLong: true },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Célébration finale" },

        { type: 'image', url: "https://images.unsplash.com/photo-1467810563316-b5476525c0f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHNlYXJjaHwzfHxjJUMzJUE5bCVDMyVBOWJyYXRpb258ZW58MHwwfHx8MTc1MjY2OTU5OHww&ixlib=rb-4.1.0&q=80&w=1080", alt: "" },
        { type: 'message', content: [{"text": "🎊 "}, {"text": "Félicitations", "bold": true}, {"text": " ! Tu as complété la Phase Transformation !"}] },
        { type: 'message', content: [{"text": "Regarde tout ce que tu as "}, {"text": "accompli", "bold": true}, {"text": " :"}] },
        { type: 'message', content: [{"text": "✓ Tu as évalué ton "}, {"text": "bien-être global", "bold": true}] },
        { type: 'message', content: [{"text": "✓ Tu as identifié tes "}, {"text": "stratégies d'apaisement", "bold": true}] },
        { type: 'message', content: [{"text": "✓ Tu as "}, {"text": "visualisé ta transformation", "bold": true}] },
        { type: 'message', content: [{"text": "✓ Tu as défini ton "}, {"text": "premier pas concret", "bold": true}] },
        { type: 'message', content: [{"text": "✓ Tu as identifié tes "}, {"text": "marqueurs de réussite", "bold": true}] },
        { type: 'message', content: [{"text": "✓ Tu as exploré ta "}, {"text": "dimension spirituelle", "bold": true}] },
        { type: 'message', content: [{"text": "💫 Tu as maintenant acquis "}, {"text": "TOUS tes Piliers", "bold": true}, {"text": " de transformation !"}] },
        { type: 'narrative', content: [{"text": "Les graines sont plantées."}, {"text": "\n\n"}, {"text": "La transformation est "}, {"text": "en marche", "bold": true}, {"text": "."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "ressentir_ma_transformation", "label": "Ressentir ma transformation →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Ressenti final" },

        { type: 'narrative', content: [{"text": "Pose ta main sur ton cœur..."}, {"text": "\n\n"}, {"text": "Que "}, {"text": "ressens-tu", "bold": true}, {"text": " maintenant ?"}] },
        { type: 'narrative', content: [{"text": "💬 Exprime-toi librement (audio ou écrit, comme tu préfères) ", "italic": true}, {"text": "\n\n"}, {"text": "✨ Plus tu partages, plus ta cartographie sera précise insha'Allah ", "italic": true}, {"text": "\n\n"}, {"text": "🎤 Audio uniquement sur WhatsApp !", "italic": true}, {"text": "\n\n"}, {"text": "🤍 Choisis ce qui te met le plus à l'aise", "italic": true}] },
        { type: 'text_input', variable: 'ressenti_final', placeholder: "Ton espace d'expression...", isLong: true },
        { type: 'narrative', content: [{"text": "Ce que tu ressens maintenant est "}, {"text": "différent", "bold": true}, {"text": " du début."}, {"text": "\n\n"}, {"text": "La transformation est déjà en mouvement."}] },
        { type: 'message', content: [{"text": "Si tu devais résumer en "}, {"text": "un mot", "bold": true}, {"text": " ?"}] },
        { type: 'text_input', variable: 'un_mot', placeholder: "Zone de texte" },
        { type: 'message', content: [{"text": "Quelle a été ta plus grande "}, {"text": "découverte", "bold": true}, {"text": " ?"}] },
        { type: 'narrative', content: [{"text": "💬 Exprime-toi librement (audio ou écrit, comme tu préfères) ", "italic": true}, {"text": "\n\n"}, {"text": "✨ Plus tu partages, plus ta cartographie sera précise insha'Allah ", "italic": true}, {"text": "\n\n"}, {"text": "🎤 Audio uniquement sur WhatsApp !", "italic": true}, {"text": "\n\n"}, {"text": "🤍 Choisis ce qui te met le plus à l'aise", "italic": true}] },
        { type: 'text_input', variable: 'grande_decouverte', placeholder: "Ton espace d'expression...", isLong: true },
        { type: 'message', content: [{"text": "Comment vois-tu ta "}, {"text": "transformation future", "bold": true}, {"text": " maintenant ?"}] },
        { type: 'narrative', content: [{"text": "💬 Exprime-toi librement (audio ou écrit, comme tu préfères) ", "italic": true}, {"text": "\n\n"}, {"text": "✨ Plus tu partages, plus ta cartographie sera précise insha'Allah ", "italic": true}, {"text": "\n\n"}, {"text": "🎤 Audio uniquement sur WhatsApp !", "italic": true}, {"text": "\n\n"}, {"text": "🤍 Choisis ce qui te met le plus à l'aise", "italic": true}] },
        { type: 'text_input', variable: 'transformation_future', placeholder: "Ton espace d'expression...", isLong: true },
        { type: 'narrative', content: [{"text": "Cette vision est déjà en "}, {"text": "manifestation", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Tu en as semé les graines."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "lire_les_temoignages", "label": "Lire les témoignages →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Témoignages et clôture" },

        { type: 'image', url: "https://images.unsplash.com/reserve/O7A9fAvYSXC7NTdz8gLQ_IMGP1039.jpg?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHNlYXJjaHw1fHxjaGVtaW58ZW58MHwwfHx8MTc1MjY2OTc3MXww&ixlib=rb-4.1.0&q=80&w=1080", alt: "" },
        { type: 'message', content: [{"text": "💝 Voici ce que d'autres femmes ont "}, {"text": "vécu", "bold": true}, {"text": " :"}] },
        { type: 'message', content: [{"text": "Fatima, 29 ans : \"J'ai appris à reconnaître mes signaux corporels\"", "italic": true}] },
        { type: 'message', content: [{"text": "Nour, 33 ans : \"Ma visualisation est devenue ma boussole\"", "italic": true}] },
        { type: 'message', content: [{"text": "Leila, 27 ans : \"J'ai enfin un plan d'action concret\"", "italic": true}] },
        { type: 'message', content: [{"text": "Comment aimerais-tu "}, {"text": "marquer ce moment", "bold": true}, {"text": " ?"}] },
        { type: 'choice', variable: 'marquer_moment', multiple: true, options: [{"id": "m_offrir_du_calme", "label": "M'offrir du calme"}, {"id": "noter_3_gratitudes", "label": "Noter 3 gratitudes"}, {"id": "une_priere_de_remerciement", "label": "Une prière de remerciement"}, {"id": "un_moment_ou_je_me_fais_plaisi", "label": "Un moment où je me fais plaisir"}] },
        { type: 'message', content: [{"text": "\"Je célèbre mon courage. Les graines sont plantées. Je me fais confiance.\"", "italic": true}] },
        { type: 'narrative', content: [{"text": "\"Celui qui place sa confiance en Allah, Il lui suffit\"", "italic": true}, {"text": " (65:3)."}, {"text": "\n\n"}, {"text": "Tu as semé avec "}, {"text": "tawakkul", "bold": true}, {"text": "."}] },
        { type: 'message', content: [{"text": "✨ Ton voyage complet de "}, {"text": "transformation", "bold": true}, {"text": " :"}] },
        { type: 'message', content: [{"text": "Phase 1 - L'Éveil :", "bold": true}, {"text": " Tu as exploré ton appel et ta situation"}] },
        { type: 'message', content: [{"text": "Phase 2 - La Conscience :", "bold": true}, {"text": " Tu as découvert tes ressources"}] },
        { type: 'message', content: [{"text": "Phase 3 - La Transformation :", "bold": true}, {"text": " Tu as ancré le changement"}] },
        { type: 'message', content: [{"text": "Les fondations de ta métamorphose sont maintenant "}, {"text": "complètes", "bold": true}, {"text": "."}] },
        { type: 'message', content: [{"text": "📍 Ce qui t'attend maintenant dans ton "}, {"text": "voyage", "bold": true}, {"text": " :"}] },
        { type: 'message', content: [{"text": "Ton premier pas t'attend "}, {"text": "dès demain", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "Merci infiniment de ta "}, {"text": "confiance", "bold": true}, {"text": " et de ton "}, {"text": "courage", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Tu as tout ce qu'il faut pour réussir. 🌺"}] },
        { type: 'message', content: [{"text": "🦋 "}, {"text": "Phase Germination complétée !", "bold": true}] },
        { type: 'choice', variable: 'choix', options: [{"id": "terminer", "label": "Terminer →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Fin du formulaire" },

        { type: 'narrative', content: "🌺 FÉLICITATIONS ! Tu as complété les 6 formulaires de la Phase 1 de ta Cartographie Émotionnelle !\n\nProgression : [■■■■■■] 6/6 formulaires complétés ✨\n\nTu as maintenant :\n\n- Créé ton espace sacré (Formulaire 1.1)\n\n- Exploré tes fondations (Formulaire 1.2)\n\n- Identifié tes schémas (Formulaire 1.3)\n\n- Compris ton appel (Formulaire 1.4)\n\n- Découvert tes ressources (Formulaire 1.5)\n\n- Ancré ta transformation (Formulaire 1.6)" },
        { type: 'narrative', content: "📩 Pour m’informer que tu as complété la Phase 1, il te suffit de cliquer sur le lien ci-dessous.\n\n\n Un message pré-rempli s’ouvrira automatiquement sur WhatsApp que tu n'auras qu'à envoyer:\n\n👉 \n\nCela me permet de suivre ton avancée et d'avancer dans la suite du programme pour toi, insha’Allah.\n\nJe te dis à très vite !" },

        { type: 'completion', title: "Félicitations !", message: "Tu as terminé F1.6 — La Boussole Intérieure. Tes réponses ont été sauvegardées.", icon: '🧭' }
    ]
};

/* ─── Form Registry ─── */
if (typeof window.FORM_REGISTRY === 'undefined') window.FORM_REGISTRY = {};
window.FORM_REGISTRY['f1-6-boussole-interieure'] = F1_6_BOUSSOLE_INTERIEURE;
