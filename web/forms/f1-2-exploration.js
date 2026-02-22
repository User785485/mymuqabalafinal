/* ═══════════════════════════════════════
   F1.2 — Exploration Intérieure
   Converti depuis Typebot · 128 steps · 4 variables
═══════════════════════════════════════ */

const F1_2_EXPLORATION = {
    id: 'f1_2_exploration',
    version: 1,
    title: "F1.2 — Exploration Intérieure",
    icon: '🔍',
    checkboxId: 'f1_2',
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
        "email",
        "prenom",
        "reaffirmation_engagement",
        "telephone"
],

    steps: [

        /* ════════════════════════════════════ */
        { type: 'section', title: "📍 Retrouvailles" },

        { type: 'image', url: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHNlYXJjaHwyfHx0cmF2ZWx8ZW58MHwwfHx8MTc1MjgzMDA4OXww&ixlib=rb-4.1.0&q=80&w=1080", alt: "" },
        { type: 'message', content: [{"text": "⚠️ Important - Avant de commencer ce formulaire", "bold": true}] },
        { type: 'narrative', content: [{"text": "Ce message apparaîtra", "bold": true}, {"text": " au début de chaque formulaire "}, {"text": "pour t'accompagner", "bold": true}, {"text": " tout au long de ton parcours."}] },
        { type: 'narrative', content: [{"text": "🔄"}, {"text": " Si tu reviens sur le formulaire ou tu as rencontré un bug ?", "bold": true}, {"text": "\n\n"}, {"text": "Tes réponses "}, {"text": "sont enregistrées", "bold": true}, {"text": " au fur et à mesure."}] },
        { type: 'message', content: [{"text": "Pour des raisons de sécurité et de confidentialité de tes données", "bold": true}, {"text": ", nous ne sauvegardons pas automatiquement une session de reprise. "}] },
        { type: 'narrative', content: [{"text": "Voici comment reprendre simplement :", "bold": true}, {"text": "\n\n"}, {"text": "1️⃣ "}, {"text": "Rafraîchis la page", "bold": true}, {"text": " (recharge le formulaire)"}, {"text": "\n\n"}, {"text": "2️⃣ "}, {"text": "Pour les questions à choix multiples/unique", "bold": true}, {"text": " → Re-sélectionne les mêmes réponses"}, {"text": "\n\n"}, {"text": "3️⃣ "}, {"text": "Pour ton email et téléphone", "bold": true}, {"text": " → Re-saisis les mêmes informations (pour qu'on sache que c'est toi)"}, {"text": "\n\n"}, {"text": "4️⃣ "}, {"text": "Pour les questions écrites", "bold": true}, {"text": " → Écris simplement \"Déjà répondu\" et passe à la suivante"}, {"text": "\n\n"}, {"text": "5️⃣ "}, {"text": "Continue", "bold": true}, {"text": " jusqu'à retrouver où tu t'étais arrêtée ! 😊"}] },
        { type: 'message', content: [{"text": "Commençons !", "bold": true, "italic": true}] },
        { type: 'message', content: [{"text": "Formulaire 1.2 : Les Fondations ", "bold": true, "italic": true}] },
        { type: 'message', content: [{"text": "📍 Heureux de te retrouver pour poursuivre ce "}, {"text": "voyage intérieur", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "Tu as créé ton espace sécurisé et posé ton intention."}, {"text": "\n\n"}, {"text": "C'est "}, {"text": "magnifique", "bold": true}, {"text": "."}] },
        { type: 'message', content: [{"text": "Maintenant, j'aimerais explorer avec toi "}, {"text": "qui tu es vraiment", "bold": true}, {"text": " à ce moment précis de ta vie."}] },
        { type: 'message', content: [{"text": "📊 Avant de continuer, rappelle-moi tes "}, {"text": "coordonnées", "bold": true}, {"text": "."}] },
        { type: 'message', content: [{"text": "Cela me permet d'assurer la "}, {"text": "continuité", "bold": true}, {"text": " de ton parcours personnalisé :"}] },
        { type: 'choice', variable: 'choix', options: [{"id": "continuer", "label": "Continuer →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Email" },

        { type: 'message', content: [{"text": "Ton adresse email ?"}, {"text": "\n\n"}, {"text": "(Pour recevoir ta cartographie et tes ressources)", "italic": true}] },
        { type: 'email_input', variable: 'email', placeholder: "ton.email@exemple.com" },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Téléphone" },

        { type: 'message', content: [{"text": "Ton numéro de téléphone ?"}, {"text": "\n\n"}, {"text": "(Pour le suivi personnalisé de ton programme)", "italic": true}] },
        { type: 'phone_input', variable: 'telephone', placeholder: "06 12 34 56 78", defaultPrefix: '+33' },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Transition Journal" },

        { type: 'choice', variable: 'choix', options: [{"id": "explorer_mon_journal", "label": "Explorer mon journal →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "💡 Journal" },

        { type: 'message', content: [{"text": "📔 J'aimerais te parler de quelque chose d'important : ton "}, {"text": "journal", "bold": true}, {"text": "."}] },
        { type: 'message', content: "Il peut devenir ton futur meilleur allié.\n\nCe n'est pas un simple carnet - c'est un outil de transformation que tu pourras garder par la suite." },
        { type: 'message', content: [{"text": "🌟 Laisse-moi t'expliquer pourquoi l'écriture manuscrite est "}, {"text": "transformatrice", "bold": true}, {"text": "."}] },
        { type: 'message', content: [{"text": "Imagine : quand tu écris à la main, ton cerveau fait quelque chose d'"}, {"text": "étonnant", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "Il connecte tes "}, {"text": "émotions", "bold": true}, {"text": " (hémisphère droit) avec ta "}, {"text": "logique", "bold": true}, {"text": " (hémisphère gauche)."}, {"text": "\n\n"}, {"text": "C'est comme construire un pont entre ce que tu ressens et ce que tu comprends."}] },
        { type: 'message', content: [{"text": "💡 Des études en neurosciences montrent que l'écriture manuscrite active des zones du cerveau liées à la "}, {"text": "guérison émotionnelle", "bold": true}, {"text": "."}] },
        { type: 'message', content: [{"text": "C'est littéralement "}, {"text": "thérapeutique", "bold": true}, {"text": "."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "comprendre_pourquoi_ca_marche", "label": "Comprendre pourquoi ça marche →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "✨ La Magie de l'Écriture" },

        { type: 'message', content: [{"text": "✨ Voici ce qui se passe concrètement quand tu "}, {"text": "écris", "bold": true}, {"text": " :"}] },
        { type: 'message', content: [{"text": "Les émotions \"coincées\" trouvent une "}, {"text": "sortie", "bold": true}, {"text": " (comme ouvrir une valve)"}] },
        { type: 'message', content: [{"text": "Tu passes d'observatrice de tes pensées en boucle à "}, {"text": "créatrice de solutions", "bold": true}] },
        { type: 'message', content: [{"text": "Ton système nerveux se "}, {"text": "calme", "bold": true}, {"text": " (l'écriture active le nerf vague)"}] },
        { type: 'message', content: [{"text": "Tu ancres physiquement tes "}, {"text": "prises de conscience", "bold": true}, {"text": " (le geste grave la mémoire)"}] },
        { type: 'message', content: "📖 Ton journal deviendra :" },
        { type: 'message', content: [{"text": "Ton "}, {"text": "meilleur ami silencieux", "bold": true}, {"text": " - toujours là, jamais jugeant"}] },
        { type: 'narrative', content: [{"text": "Ton "}, {"text": "GPS émotionnel", "bold": true}, {"text": " - "}, {"text": "miroir de tes voyages intérieurs, reflet de qui tu deviens "}] },
        { type: 'message', content: [{"text": "Ta "}, {"text": "preuve d'évolution", "bold": true}, {"text": " - relis dans 6 mois, tu seras bluffée"}] },
        { type: 'message', content: [{"text": "Ton "}, {"text": "espace de vérité brute", "bold": true}, {"text": " - ici, pas de masque social"}] },
        { type: 'choice', variable: 'choix', options: [{"id": "voir_le_mode_d_emploi", "label": "Voir le mode d'emploi →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Mode d'emploi" },

        { type: 'message', content: [{"text": "💡 Voici un "}, {"text": "mode d'emploi simple", "bold": true}, {"text": " :"}] },
        { type: 'message', content: [{"text": "Choisis un carnet qui te donne "}, {"text": "envie de l'ouvrir", "bold": true}, {"text": " (la beauté inspire)"}] },
        { type: 'message', content: [{"text": "Écris comme tu parles à ta meilleure amie - "}, {"text": "sans filtre", "bold": true}] },
        { type: 'message', content: [{"text": "Date "}, {"text": "TOUJOURS", "bold": true}, {"text": " (pour suivre ton évolution)"}] },
        { type: 'message', content: [{"text": "Écris surtout quand c'est "}, {"text": "dur", "bold": true}, {"text": " (c'est là que la magie opère)"}] },
        { type: 'narrative', content: [{"text": "\"Dans l'écriture, l'âme trouve sa voix\"", "italic": true}, {"text": "\n\n"}, {"text": "Fais-toi ce "}, {"text": "cadeau quotidien", "bold": true}, {"text": "."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "vers_l_engagement", "label": "Vers l'engagement →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "✨ L'Engagement Profond" },

        { type: 'image', url: "https://images.unsplash.com/photo-1749374573697-8882bfef5700?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHNlYXJjaHw1NDd8fHIlQzMlQTlzb2x1dGlvbnxlbnwwfDB8fHwxNzY0ODU4MDc0fDA&ixlib=rb-4.1.0&q=80&w=1080", alt: "" },
        { type: 'message', content: [{"text": "✨ Maintenant, parlons de "}, {"text": "l'engagement profond", "bold": true}, {"text": " que tu prends."}] },
        { type: 'narrative', content: [{"text": "Ce voyage de transformation s'étalera sur "}, {"text": "plusieurs semaines", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Chaque phase apporte sa propre sagesse et ses révélations."}] },
        { type: 'narrative', content: [{"text": "Tu as déjà franchi la "}, {"text": "première porte", "bold": true}, {"text": " avec courage."}, {"text": "\n\n"}, {"text": "Approfondissons maintenant."}] },
        { type: 'message', content: [{"text": "Tu sais, ton timing est "}, {"text": "parfait", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "Ce n'est pas un hasard si tu es ici maintenant."}, {"text": "\n\n"}, {"text": "Ton être intérieur sait qu'il est temps de comprendre, de guérir et de "}, {"text": "transformer tes schémas amoureux", "bold": true}, {"text": "."}] },
        { type: 'message', content: [{"text": "💡 J'aimerais que tu comprennes pourquoi la transformation authentique "}, {"text": "prend du temps", "bold": true}, {"text": "."}] },
        { type: 'message', content: "Les neurosciences nous enseignent que :" },
        { type: 'message', content: [{"text": "21 jours", "bold": true}, {"text": " sont nécessaires pour initier un changement"}] },
        { type: 'message', content: [{"text": "63 jours", "bold": true}, {"text": " pour qu'une nouvelle habitude s'ancre"}] },
        { type: 'message', content: [{"text": "Plusieurs semaines", "bold": true}, {"text": " pour transformer profondément nos schémas relationnels"}] },
        { type: 'message', content: [{"text": "Comme Allah fait croître la plante selon sa sagesse, tes prises de conscience ont besoin de "}, {"text": "temps pour devenir", "bold": true}, {"text": " de vraies transformations."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "decouvrir_les_benefices", "label": "Découvrir les bénéfices →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "🧠 Les Schémas Répétitifs" },

        { type: 'message', content: [{"text": "🧠 Laisse-moi t'expliquer ce qu'est un "}, {"text": "schéma répétitif", "bold": true}, {"text": "."}] },
        { type: 'message', content: [{"text": "Un schéma est comme une "}, {"text": "danse automatique", "bold": true}, {"text": " que tu répètes inconsciemment."}] },
        { type: 'message', content: [{"text": "Par exemple : Si tu portes la croyance "}, {"text": "\"Je ne mérite pas l'amour\"", "italic": true}, {"text": ", tu pourrais inconsciemment choisir des partenaires émotionnellement indisponibles, confirmant ainsi ta croyance initiale."}] },
        { type: 'narrative', content: [{"text": "La bonne nouvelle ?"}, {"text": "\n\n"}, {"text": "Une fois le schéma identifié, tu peux choisir une "}, {"text": "nouvelle danse", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "Tu n'es ni \"maudite\" ni \"défaillante\"."}, {"text": "\n\n"}, {"text": "Tu es simplement "}, {"text": "humaine", "bold": true}, {"text": ", avec des schémas qui peuvent être transformés."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "voir_mes_piliers_de_force", "label": "Voir mes piliers de force →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "✨ Piliers de Force" },

        { type: 'image', url: "https://images.unsplash.com/photo-1651441757991-01e73f06deb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHNlYXJjaHw1OHx8Zm9yY2V8ZW58MHwwfHx8MTc2NDg1ODE4MXww&ixlib=rb-4.1.0&q=80&w=1080", alt: "" },
        { type: 'message', content: [{"text": "✨ Reconnais-tu les "}, {"text": "piliers de force", "bold": true}, {"text": " que tu as déjà développés ?"}] },
        { type: 'message', content: "Tu as déjà démontré :" },
        { type: 'message', content: [{"text": "💫 ", "bold": true}, {"text": "Courage", "bold": true}, {"text": " - Pour avoir commencé malgré l'incertitude"}] },
        { type: 'message', content: [{"text": "💫 ", "bold": true}, {"text": "Authenticité", "bold": true}, {"text": " - Pour commencer à oser faire face à certaines vérités"}] },
        { type: 'message', content: "D'autres piliers se révéleront au fil de ton parcours..." },
        { type: 'narrative', content: [{"text": "\"Allah est beau et Il aime la beauté\"", "italic": true}, {"text": "\n\n"}, {"text": "Cette architecture intérieure représente la "}, {"text": "beauté de ton âme", "bold": true}, {"text": " en construction."}] },
        { type: 'message', content: [{"text": "⚠️ Je veux être honnête avec toi : ce voyage peut réveiller des "}, {"text": "émotions profondes", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "C'est normal et nécessaire."}, {"text": "\n\n"}, {"text": "Les émotions sont des "}, {"text": "messagères", "bold": true}, {"text": ", pas des ennemies."}] },
        { type: 'message', content: [{"text": "Elles viennent t'indiquer où se trouve le "}, {"text": "travail de guérison", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "Tu ne seras pas la première à traverser ces vagues émotionnelles."}, {"text": "\n\n"}, {"text": "Toutes celles qui ont vécu cette transformation témoignent que c'était "}, {"text": "essentiel pour leur libération", "bold": true}, {"text": "."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "reaffirmer_mon_engagement", "label": "Réaffirmer mon engagement →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "💡 Réaffirmation" },

        { type: 'message', content: [{"text": "💡 J'aimerais que tu réaffirmes ton "}, {"text": "engagement intérieur", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "Les recherches montrent que réaffirmer son intention "}, {"text": "renforce la détermination", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "C'est comme recalibrer ta boussole intérieure."}] },
        { type: 'message', content: [{"text": "Avec quelle énergie poursuis-tu ce "}, {"text": "voyage maintenant", "bold": true}, {"text": " ?"}] },
        { type: 'message', content: [{"text": "Reconnecte-toi à ton "}, {"text": "pourquoi profond", "bold": true}, {"text": "..."}] },
        { type: 'narrative', content: [{"text": "💬 Exprime-toi librement (audio ou écrit, comme tu préfères) ", "italic": true}, {"text": "\n\n"}, {"text": "✨ Plus tu partages, plus ta cartographie sera précise insha'Allah ", "italic": true}, {"text": "\n\n"}, {"text": "🎤 Audio uniquement sur WhatsApp !", "italic": true}, {"text": "\n\n"}, {"text": "🤍 Choisis ce qui te met le plus à l'aise", "italic": true}] },
        { type: 'text_input', variable: 'reaffirmation_engagement', placeholder: "Ton espace d'expression", isLong: true },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Méditation énergie" },

        { type: 'message', content: "💡 Ferme les yeux un instant.\n\nRessens cette énergie." },
        { type: 'narrative', content: [{"text": "Où la sens-tu ?"}, {"text": "\n\n"}, {"text": "Comment "}, {"text": "vibre-t-elle", "bold": true}, {"text": " ?"}] },
        { type: 'narrative', content: [{"text": "Cette énergie renouvelée "}, {"text": "nourrit ta transformation", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Allah est témoin de ta persévérance."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "continuer", "label": "Continuer →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "🌟 Pause & Transition" },

        { type: 'image', url: "https://images.unsplash.com/photo-1539326075171-2284bcbc8ae2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHNlYXJjaHwyNHx8cGF1c2V8ZW58MHwwfHx8MTc2NDg1ODIzNXww&ixlib=rb-4.1.0&q=80&w=1080", alt: "" },
        { type: 'message', content: "Tu as posé des bases solides en explorant :" },
        { type: 'message', content: [{"text": "✓ L'importance du "}, {"text": "journal", "bold": true}, {"text": " comme outil de transformation"}] },
        { type: 'message', content: [{"text": "✓ Ton "}, {"text": "engagement profond", "bold": true}, {"text": " dans ce voyage"}] },
        { type: 'message', content: [{"text": "✓ Les "}, {"text": "bénéfices concrets", "bold": true}, {"text": " qui t'attendent"}] },
        { type: 'message', content: [{"text": "✓ Tes "}, {"text": "schémas répétitifs", "bold": true}, {"text": " et comment ils fonctionnent"}] },
        { type: 'message', content: [{"text": "✓ Tes "}, {"text": "piliers de force", "bold": true}, {"text": " déjà présents"}] },
        { type: 'message', content: [{"text": "La prochaine partie t'emmènera dans une "}, {"text": "exploration plus profonde", "bold": true}, {"text": " de tes objectifs et de ta transformation."}] },
        { type: 'message', content: "💫 Comment te sens-tu maintenant ?\n\nPrends un moment pour respirer et intégrer tout ce que tu viens de découvrir." },
        { type: 'choice', variable: 'choix', options: [{"id": "je_continue_maintenant_vers_le", "label": "Je continue maintenant vers le Formulaire 1.3  →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "💾 Sauvegarde" },

        { type: 'message', content: [{"text": "Parfait !", "bold": true}, {"text": " Tes réponses sont sauvegardées."}] },
        { type: 'narrative', content: "🌿 Félicitations ! Tu viens de terminer le formulaire 2/6 de la Phase de Germination.\n\nTu as posé les fondations de ton voyage intérieur avec courage et authenticité. 📍\n\nProgression : [■■□□□□] 2/6 formulaires complétés\n\nN'oublie pas de poursuivre avec le Formulaire 1.3 pour approfondir ta cartographie émotionnelle.\n\nLa suite t'attend quand tu seras prête... 🌸" },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Prénom" },

        { type: 'message', content: [{"text": "Ton prénom ?"}, {"text": "\n\n"}, {"text": "(Pour personnaliser ton accompagnement)", "italic": true}] },
        { type: 'text_input', variable: 'prenom', placeholder: "Ton prénom..." },

        /* ════════════════════════════════════ */
        { type: 'section', title: "💫 Les Bénéfices" },

        { type: 'message', content: [{"text": "Sur le "}, {"text": "plan personnel", "bold": true}, {"text": " :"}] },
        { type: 'message', content: [{"text": "Comprendre "}, {"text": "POURQUOI", "bold": true}, {"text": " tu répètes certains schémas"}] },
        { type: 'message', content: [{"text": "Identifier tes "}, {"text": "blessures profondes", "bold": true}, {"text": " pour les surmonter"}] },
        { type: 'message', content: [{"text": "Découvrir les "}, {"text": "forces extraordinaires", "bold": true}, {"text": " forgées par tes épreuves"}] },
        { type: 'message', content: [{"text": "Créer un "}, {"text": "GPS émotionnel", "bold": true}, {"text": " pour naviguer tes relations futures"}] },
        { type: 'message', content: [{"text": "Sur le "}, {"text": "plan spirituel", "bold": true}, {"text": " :"}] },
        { type: 'message', content: [{"text": "Comprendre comment ta relation au Divin "}, {"text": "colore toutes tes autres relations", "bold": true}] },
        { type: 'message', content: [{"text": "Aligner tes "}, {"text": "valeurs profondes", "bold": true}, {"text": " avec tes choix amoureux"}] },
        { type: 'message', content: [{"text": "Transformer chaque blessure en "}, {"text": "sagesse divine", "bold": true}] },
        { type: 'message', content: [{"text": "\"Et peut-être détestez-vous une chose alors qu'elle est un bien pour vous\"", "italic": true}, {"text": " (2:216)"}] },
        { type: 'choice', variable: 'choix', options: [{"id": "comprendre_les_schemas", "label": "Comprendre les schémas →"}] },

        { type: 'completion', title: "Félicitations !", message: "Tu as terminé F1.2 — Exploration Intérieure. Tes réponses ont été sauvegardées.", icon: '🔍' }
    ]
};

/* ─── Form Registry ─── */
if (typeof window.FORM_REGISTRY === 'undefined') window.FORM_REGISTRY = {};
window.FORM_REGISTRY['f1-2-exploration'] = F1_2_EXPLORATION;
