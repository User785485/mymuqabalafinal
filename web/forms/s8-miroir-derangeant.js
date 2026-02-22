/* ═══════════════════════════════════════
   S8 — Le Miroir Dérangeant
   Converti depuis Typebot · 102 steps · 8 variables
═══════════════════════════════════════ */

const S8_MIROIR_DERANGEANT = {
    id: 's8_miroir_derangeant',
    version: 1,
    title: "S8 — Le Miroir Dérangeant",
    icon: '🪞',
    checkboxId: 's8',
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
        "ce_que_le_miroir_revele",
        "conseil_pour_prendre_sa_place",
        "expression_si_liberte_totale",
        "irritation_cachee_projetee",
        "navigation_de_la_revelation",
        "reaction_face_au_miroir",
        "style_de_gestion_des_irritations",
        "telephone"
],

    steps: [

        /* ════════════════════════════════════ */
        { type: 'section', title: "Cartographie émotionnelle" },

        { type: 'image', url: "https://images.unsplash.com/photo-1740393076705-69922a4cce76?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHNlYXJjaHw5fHxtaXJvaXJ8ZW58MHwwfHx8MTc1OTg0NTI2Nnww&ixlib=rb-4.1.0&q=80&w=1080", alt: "" },
        { type: 'message', content: "🪞 Quand l'autre nous révèle..." },
        { type: 'message', content: [{"text": "Bienvenue dans le scénario 8 : Le Miroir Dérangeant", "bold": true}] },
        { type: 'message', content: "Tout d'abord, peux-tu me partager ces informations :" },
        { type: 'text_input', variable: 'reponse', placeholder: "Quel est ton prénom ?" },
        { type: 'email_input', variable: 'email', placeholder: "ton.email@exemple.com" },
        { type: 'phone_input', variable: 'telephone', placeholder: "06 12 34 56 78", defaultPrefix: '+33' },
        { type: 'narrative', content: [{"text": "Parfois, nos plus grandes ", "bold": true}, {"text": "irritations", "bold": true}, {"text": " cachent nos plus profondes ", "bold": true}, {"text": "vérités", "bold": true}, {"text": "..."}, {"text": "\n\n"}, {"text": "Avant d'explorer ce miroir troublant, dis-moi..."}] },
        { type: 'message', content: [{"text": "😤 ", "bold": true}, {"text": "Comment vis-tu les irritations relationnelles ?"}] },
        { type: 'choice', variable: 'style_de_gestion_des_irritations', options: [{"id": "je_les_exprime_directement_je", "label": "Je les exprime directement\n\"Je dis ce qui me dérange sans tourner autour\""}, {"id": "je_les_rumine_en_silence_ca_t", "label": "Je les rumine en silence\n\"Ça tourne en boucle dans ma tête\""}, {"id": "je_me_questionne_d_abord_pour", "label": "Je me questionne d'abord\n\"Pourquoi ça me touche autant ?\""}, {"id": "je_les_evite_au_maximum_je_de", "label": "Je les évite au maximum\n\"Je déteste les confrontations\""}, {"id": "je_les_analyse_profondement_j", "label": "Je les analyse profondément\n\"J'essaie de comprendre le message caché\""}] },
        { type: 'message', content: [{"text": "Cette approche révèle déjà ton ", "bold": true}, {"text": "rapport à l'inconfort relationnel", "bold": true}, {"text": "..."}] },
        { type: 'message', content: [{"text": "🔍 Et face à ce qui t'agace chez l'autre..."}, {"text": "\n\n"}, {"text": "Quelle est ta première réaction intérieure ?", "bold": true}] },
        { type: 'choice', variable: 'reaction_face_au_miroir', options: [{"id": "le_jugement_immediat", "label": "Le jugement immédiat"}, {"id": "la_curiosite_sur_moi_meme", "label": "La curiosité sur moi-même"}, {"id": "le_rejet_instinctif", "label": "Le rejet instinctif"}, {"id": "la_reconnaissance_troublante", "label": "La reconnaissance troublante"}, {"id": "l_analyse_de_nos_differences", "label": "L'analyse de nos différences"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "La révélation troublante" },

        { type: 'narrative', content: [{"text": "Il y a une vérité que peu osent regarder en face..."}, {"text": "\n\n"}, {"text": "Parfois, ce qui nous agace le plus chez l'autre est précisément ce que nous refusons de voir", "italic": true}, {"text": " en nous."}] },
        { type: 'image', url: "https://images.unsplash.com/photo-1603572298498-848f70a46d29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHNlYXJjaHw2fHxtaXJvaXJ8ZW58MHwwfHx8MTc1OTg0NTI2Nnww&ixlib=rb-4.1.0&q=80&w=1080", alt: "" },
        { type: 'message', content: [{"text": "🪞 ", "italic": true}, {"text": "Quand l'autre devient notre miroir...", "italic": true}] },
        { type: 'narrative', content: [{"text": "Laisse-moi te raconter l'histoire d'", "bold": true}, {"text": "Amina", "bold": true}, {"text": "..."}, {"text": "\n\n"}, {"text": "Une histoire où l'amour devient un ", "italic": true}, {"text": "révélateur impitoyable", "italic": true}, {"text": " de ce que nous cachons à nous-mêmes."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "decouvrir_ce_miroir_derangeant", "label": "Découvrir ce miroir dérangeant →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Le miroir qui dérange" },

        { type: 'narrative', content: [{"text": "Deux mois de ", "bold": true}, {"text": "relation prometteuse", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Amina et Karim construisent leur histoire. Entre moments de ", "italic": true}, {"text": "complicité pure", "italic": true}, {"text": " et discussions qui ", "italic": true}, {"text": "nourrissent l'âme", "italic": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Mais quelque chose ", "bold": true}, {"text": "agace", "bold": true}, {"text": " profondément Amina..."}] },
        { type: 'narrative', content: [{"text": "Ce soir-là, ils sont chez des amis communs."}, {"text": "\n\n"}, {"text": "Karim fait ce qu'il fait ", "italic": true}, {"text": "toujours", "italic": true}, {"text": " : il ", "bold": true}, {"text": "monopolise", "bold": true}, {"text": " la conversation. Ses histoires, ses opinions, ses expériences..."}, {"text": "\n\n"}, {"text": "Amina observe. Cette ", "italic": true}, {"text": "aisance", "italic": true}, {"text": " qu'il a de prendre ", "italic": true}, {"text": "toute la place", "italic": true}, {"text": ". Sans gêne. Sans questionnement."}] },
        { type: 'narrative', content: [{"text": "L'", "bold": true}, {"text": "irritation", "bold": true}, {"text": " monte. ", "italic": true}, {"text": "Encore", "italic": true}, {"text": "."}, {"text": "\n\n"}, {"text": "\"", "italic": true}, {"text": "Il ne sait pas écouter. Il parle toujours de lui. Il prend toute la lumière.", "italic": true}, {"text": "\""}, {"text": "\n\n"}, {"text": "Plus tard, dans la voiture :"}, {"text": "\n\n"}, {"text": "\"", "italic": true}, {"text": "Tu ne laisses jamais d'espace aux autres !", "italic": true}, {"text": "\""}] },
        { type: 'narrative', content: [{"text": "Karim la regarde, ", "bold": true}, {"text": "surpris", "bold": true}, {"text": " :"}, {"text": "\n\n"}, {"text": "\"", "italic": true}, {"text": "Mais toi aussi tu aurais pu parler. Rien ne t'empêchait de partager tes histoires.", "italic": true}, {"text": "\""}, {"text": "\n\n"}, {"text": "Cette phrase. Simple. ", "bold": true}, {"text": "Dévastatrice", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Car elle touche quelque chose qu'Amina refuse de ", "italic": true}, {"text": "voir", "italic": true}, {"text": "."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "plonger_dans_sa_verite", "label": "Plonger dans sa vérité →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Ta propre projection" },

        { type: 'narrative', content: [{"text": "Avant de découvrir la vérité d'Amina..."}, {"text": "\n\n"}, {"text": "Plongeons dans ", "bold": true}, {"text": "ta", "bold": true}, {"text": " vérité."}] },
        { type: 'narrative', content: [{"text": "🪞 ", "bold": true}, {"text": "Si tu étais Amina..."}, {"text": "\n\n"}, {"text": "Face à quelqu'un qui prend ", "italic": true}, {"text": "toute la place", "italic": true}, {"text": "..."}, {"text": "\n\n"}, {"text": "Quelle serait ta ", "bold": true}, {"text": "vraie irritation cachée", "bold": true}, {"text": " ?"}] },
        { type: 'choice', variable: 'irritation_cachee_projetee', multiple: true, options: [{"id": "ma_propre_difficulte_a_prendre", "label": "Ma propre difficulté à prendre ma place"}, {"id": "mon_envie_secrete_de_cette_ais", "label": "Mon envie secrète de cette aisance"}, {"id": "ma_peur_du_jugement_si_j_osais", "label": "Ma peur du jugement si j'osais"}, {"id": "ma_frustration_de_m_autocensur", "label": "Ma frustration de m'autocensurer"}, {"id": "mon_conditionnement_a_rester_d", "label": "Mon conditionnement à rester discrète"}, {"id": "ma_jalousie_de_sa_liberte_d_et", "label": "Ma jalousie de sa liberté d'être"}] },
        { type: 'message', content: [{"text": "Cette reconnaissance demande un ", "bold": true}, {"text": "courage immense", "bold": true}, {"text": "..."}] },
        { type: 'narrative', content: [{"text": "Creusons plus ", "bold": true}, {"text": "profond", "bold": true}, {"text": "..."}, {"text": "\n\n"}, {"text": "Si tu pouvais prendre toute la place comme lui, qu'est-ce que tu ", "bold": true}, {"text": "exprimerais", "bold": true}, {"text": " ?"}] },
        { type: 'text_input', variable: 'expression_si_liberte_totale', placeholder: "Ce que j'oserais enfin exprimer si je n'avais plus peur...", isLong: true },

        /* ════════════════════════════════════ */
        { type: 'section', title: "La réalisation troublante" },

        { type: 'message', content: [{"text": "Cette vérité que tu viens de toucher est ", "bold": true}, {"text": "précieuse", "bold": true}, {"text": "..."}] },
        { type: 'narrative', content: [{"text": "Revenons à Amina..."}, {"text": "\n\n"}, {"text": "Cette nuit-là, elle ne ", "bold": true}, {"text": "dort pas", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "La phrase de Karim tourne en boucle."}, {"text": "\n\n"}, {"text": "Et soudain, la ", "bold": true}, {"text": "révélation", "bold": true}, {"text": " :"}, {"text": "\n\n"}, {"text": "Ce n'est pas sa ", "italic": true}, {"text": "prise de place", "italic": true}, {"text": " qui l'agace."}, {"text": "\n\n"}, {"text": "C'est sa propre ", "bold": true}, {"text": "incapacité", "bold": true}, {"text": " à prendre la sienne."}] },
        { type: 'narrative', content: [{"text": "\"", "italic": true}, {"text": "J'ai été éduquée à me taire. À laisser parler les autres. À être discrète, effacée.", "italic": true}, {"text": "\""}, {"text": "\n\n"}, {"text": "\"", "italic": true}, {"text": "Et je lui en veux d'avoir cette liberté que je me refuse.", "italic": true}, {"text": "\""}, {"text": "\n\n"}, {"text": "Les larmes coulent. ", "bold": true}, {"text": "Libératrices", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "💫 ", "bold": true}, {"text": "Face à cette prise de conscience..."}, {"text": "\n\n"}, {"text": "Comment penses-tu qu'Amina devrait ", "bold": true}, {"text": "naviguer", "bold": true}, {"text": " cette révélation ?"}] },
        { type: 'choice', variable: 'navigation_de_la_revelation', options: [{"id": "lui_partager_cette_decouverte", "label": "Lui partager cette découverte avec vulnérabilité"}, {"id": "travailler_d_abord_sur_elle_me", "label": "Travailler d'abord sur elle-même"}, {"id": "s_excuser_et_expliquer_sa_proj", "label": "S'excuser et expliquer sa projection"}, {"id": "demander_son_aide_pour_oser_pl", "label": "Demander son aide pour oser plus"}, {"id": "transformer_l_irritation_en_in", "label": "Transformer l'irritation en inspiration"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Le dialogue transformateur" },

        { type: 'narrative', content: [{"text": "Le lendemain matin, Amina trouve le ", "bold": true}, {"text": "courage", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Un courage nouveau. Celui de la ", "italic": true}, {"text": "vérité", "italic": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "\"", "italic": true}, {"text": "Karim, j'ai compris quelque chose cette nuit.", "italic": true}, {"text": "\""}, {"text": "\n\n"}, {"text": "Il pose son café, attentif."}, {"text": "\n\n"}, {"text": "\"", "italic": true}, {"text": "Ce n'est pas toi qui prends trop de place. C'est moi qui ne prends pas la mienne.", "italic": true}, {"text": "\""}] },
        { type: 'narrative', content: [{"text": "Sa voix tremble mais elle continue :"}, {"text": "\n\n"}, {"text": "\"", "italic": true}, {"text": "J'ai été éduquée à m'effacer. Et je t'en veux d'avoir cette liberté que je m'interdis.", "italic": true}, {"text": "\""}, {"text": "\n\n"}, {"text": "Karim prend sa main :"}, {"text": "\n\n"}, {"text": "\"", "italic": true}, {"text": "Alors prends-la, cette place. Je veux t'entendre. Vraiment.", "italic": true}, {"text": "\""}] },
        { type: 'narrative', content: [{"text": "🌟 ", "bold": true}, {"text": "Dans ce moment de transformation..."}, {"text": "\n\n"}, {"text": "Quel ", "bold": true}, {"text": "conseil du cœur", "bold": true}, {"text": " offrirais-tu à Amina ?"}] },
        { type: 'text_input', variable: 'conseil_pour_prendre_sa_place', placeholder: "Le conseil que je lui donnerais pour oser prendre sa place...", isLong: true },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Les vérités du miroir" },

        { type: 'message', content: [{"text": "Ce conseil révèle ta ", "bold": true}, {"text": "sagesse relationnelle", "bold": true}, {"text": "..."}] },
        { type: 'message', content: [{"text": "Explorons ce que cachent ", "bold": true}, {"text": "vraiment", "bold": true}, {"text": " nos irritations..."}] },
        { type: 'narrative', content: [{"text": "🔍 ", "bold": true}, {"text": "Quand quelqu'un nous agace, c'est souvent parce qu'il :"}, {"text": "\n\n"}, {"text": "• ", "italic": true}, {"text": "Exprime", "italic": true}, {"text": " ce que nous ", "italic": true}, {"text": "réprimons", "italic": true}, {"text": "\n\n"}, {"text": "• ", "italic": true}, {"text": "Vit", "italic": true}, {"text": " ce que nous nous ", "italic": true}, {"text": "interdisons", "italic": true}, {"text": "\n\n"}, {"text": "• ", "italic": true}, {"text": "Montre", "italic": true}, {"text": " ce que nous ", "italic": true}, {"text": "cachons", "italic": true}, {"text": "\n\n"}, {"text": "• ", "italic": true}, {"text": "Révèle", "italic": true}, {"text": " ce que nous ", "italic": true}, {"text": "nions", "italic": true}] },
        { type: 'narrative', content: [{"text": "En regardant l'histoire d'Amina et Karim..."}, {"text": "\n\n"}, {"text": "Qu'est-ce que ce miroir révèle vraiment", "bold": true}, {"text": " selon toi ?"}] },
        { type: 'text_input', variable: 'ce_que_le_miroir_revele', placeholder: "Ce que cette dynamique révèle profondément...", isLong: true },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Le miroir bienveillant" },

        { type: 'image', url: "https://images.unsplash.com/photo-1756134904044-1cf7868cb9de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NTk4NDU0MzR8&ixlib=rb-4.1.0&q=80&w=1080", alt: "" },
        { type: 'message', content: [{"text": "Tes réponses dessinent un ", "bold": true}, {"text": "portrait lumineux", "bold": true}, {"text": "..."}] },
        { type: 'narrative', content: [{"text": "✨ Dans cette exploration du miroir dérangeant, tu révèles une ", "bold": true}, {"text": "conscience rare", "bold": true}, {"text": " :"}, {"text": "\n\n"}, {"text": "Tu comprends que nos ", "italic": true}, {"text": "irritations", "italic": true}, {"text": " sont des ", "italic": true}, {"text": "invitations", "italic": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Des invitations à regarder ce que nous avons ", "bold": true}, {"text": "enfoui", "bold": true}, {"text": ", ", "bold": true}, {"text": "nié", "bold": true}, {"text": " ou ", "bold": true}, {"text": "réprimé", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "Ce qui émerge de ton exploration :", "bold": true}, {"text": "\n\n"}, {"text": "• Tu reconnais la ", "italic": true}, {"text": "projection", "italic": true}, {"text": " comme mécanisme"}, {"text": "\n\n"}, {"text": "• Tu vois l'autre comme ", "italic": true}, {"text": "révélateur", "italic": true}, {"text": ", pas ennemi"}, {"text": "\n\n"}, {"text": "• Tu cherches la ", "italic": true}, {"text": "croissance", "italic": true}, {"text": " dans l'inconfort"}, {"text": "\n\n"}, {"text": "• Tu transformes l'", "italic": true}, {"text": "irritation", "italic": true}, {"text": " en ", "italic": true}, {"text": "introspection", "italic": true}] },
        { type: 'narrative', content: [{"text": "Le défi n'est pas d'", "italic": true}, {"text": "éliminer", "italic": true}, {"text": " nos irritations."}, {"text": "\n\n"}, {"text": "C'est de les ", "bold": true}, {"text": "écouter", "bold": true}, {"text": " comme des ", "bold": true}, {"text": "messagers", "bold": true}, {"text": " de notre âme."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "comprendre_les_mecanismes_prof", "label": "Comprendre les mécanismes profonds →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Comprendre les miroirs relationnels" },

        { type: 'message', content: [{"text": "Laisse-moi t'éclairer sur les ", "bold": true}, {"text": "mécanismes cachés", "bold": true}, {"text": " du miroir..."}] },
        { type: 'message', content: [{"text": "🪞 ", "bold": true}, {"text": "Les 4 Types de Miroirs Relationnels"}] },
        { type: 'narrative', content: [{"text": "🌟 ", "bold": true}, {"text": "1. Le Miroir de l'Ombre", "bold": true}, {"text": "\n\n"}, {"text": "Il montre ce que nous avons ", "italic": true}, {"text": "refoulé", "italic": true}, {"text": " ou ", "italic": true}, {"text": "nié", "italic": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Exemple : L'égoïsme qu'on déteste = notre besoin réprimé de penser à nous"}, {"text": "\n\n"}, {"text": "Message : ", "italic": true}, {"text": "\"Regarde ce que tu t'interdis\"", "italic": true}] },
        { type: 'narrative', content: [{"text": "💫 ", "bold": true}, {"text": "2. Le Miroir du Désir", "bold": true}, {"text": "\n\n"}, {"text": "Il révèle ce que nous ", "italic": true}, {"text": "envions", "italic": true}, {"text": " secrètement."}, {"text": "\n\n"}, {"text": "Exemple : Sa liberté d'expression = notre envie d'oser"}, {"text": "\n\n"}, {"text": "Message : ", "italic": true}, {"text": "\"Voici ce que tu veux devenir\"", "italic": true}] },
        { type: 'narrative', content: [{"text": "🔥 ", "bold": true}, {"text": "3. Le Miroir de la Peur", "bold": true}, {"text": "\n\n"}, {"text": "Il expose ce que nous ", "italic": true}, {"text": "craignons", "italic": true}, {"text": " d'être."}, {"text": "\n\n"}, {"text": "Exemple : Sa vulnérabilité = notre terreur d'être faible"}, {"text": "\n\n"}, {"text": "Message : ", "italic": true}, {"text": "\"Voici ta peur profonde\"", "italic": true}] },
        { type: 'narrative', content: [{"text": "✨ ", "bold": true}, {"text": "4. Le Miroir du Potentiel", "bold": true}, {"text": "\n\n"}, {"text": "Il montre ce que nous ", "italic": true}, {"text": "pourrions", "italic": true}, {"text": " devenir."}, {"text": "\n\n"}, {"text": "Exemple : Son authenticité = notre capacité cachée"}, {"text": "\n\n"}, {"text": "Message : ", "italic": true}, {"text": "\"Tu as ça en toi aussi\"", "italic": true}] },
        { type: 'narrative', content: [{"text": "💡 ", "bold": true}, {"text": "La clé ?"}, {"text": "\n\n"}, {"text": "Reconnaître ", "bold": true}, {"text": "quel miroir", "bold": true}, {"text": " est activé quand quelqu'un nous agace."}, {"text": "\n\n"}, {"text": "Car chaque irritation est une ", "italic": true}, {"text": "porte", "italic": true}, {"text": " vers une partie de nous qui demande à être ", "bold": true}, {"text": "vue", "bold": true}, {"text": ", ", "bold": true}, {"text": "acceptée", "bold": true}, {"text": ", ", "bold": true}, {"text": "intégrée", "bold": true}, {"text": "."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "recevoir_mes_outils_pratiques", "label": "Recevoir mes outils pratiques →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Trois clés pour transformer le miroir" },

        { type: 'message', content: [{"text": "Pour transformer les miroirs dérangeants en ", "bold": true}, {"text": "alliés de croissance", "bold": true}, {"text": "..."}] },
        { type: 'narrative', content: [{"text": "🗝️ 1. La Pause Réflexive", "bold": true}, {"text": "\n\n"}, {"text": "Quand l'irritation monte :"}, {"text": "\n\n"}, {"text": "• STOP", "bold": true}, {"text": " - Respire profondément"}, {"text": "\n\n"}, {"text": "• DEMANDE", "bold": true}, {"text": " - \"Qu'est-ce que ça dit de moi ?\""}, {"text": "\n\n"}, {"text": "• EXPLORE", "bold": true}, {"text": " - \"Qu'est-ce que je m'interdis ?\""}, {"text": "\n\n"}, {"text": "• REMERCIE", "bold": true}, {"text": " - \"Merci de me montrer ça\""}, {"text": "\n\n"}, {"text": "L'irritation devient alors révélation", "italic": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "🌟 ", "bold": true}, {"text": "2. Le Dialogue du Miroir", "bold": true}, {"text": "\n\n"}, {"text": "Partage ta découverte avec ", "bold": true}, {"text": "vulnérabilité", "bold": true}, {"text": " :"}, {"text": "\n\n"}, {"text": "• ", "italic": true}, {"text": "\"J'ai réalisé que mon irritation...\"", "italic": true}, {"text": "\n\n"}, {"text": "  Nomme ta projection"}, {"text": "\n\n"}, {"text": "• ", "italic": true}, {"text": "\"En fait, c'est moi qui...\"", "italic": true}, {"text": "\n\n"}, {"text": "  Assume ta part"}, {"text": "\n\n"}, {"text": "• ", "italic": true}, {"text": "\"J'aimerais apprendre de toi...\"", "italic": true}, {"text": "\n\n"}, {"text": "  Transforme en opportunité"}, {"text": "\n\n"}, {"text": "La ", "bold": true}, {"text": "transparence", "bold": true}, {"text": " dissout la projection."}] },
        { type: 'narrative', content: [{"text": "💫 ", "bold": true}, {"text": "3. L'Intégration Consciente", "bold": true}, {"text": "\n\n"}, {"text": "Cultive ce que tu envies :"}, {"text": "\n\n"}, {"text": "• Identifie la ", "italic": true}, {"text": "qualité", "italic": true}, {"text": " que tu projettes"}, {"text": "\n\n"}, {"text": "• Trouve des ", "italic": true}, {"text": "petits pas", "italic": true}, {"text": " pour l'exprimer"}, {"text": "\n\n"}, {"text": "• ", "italic": true}, {"text": "Pratique", "italic": true}, {"text": " dans des espaces sûrs"}, {"text": "\n\n"}, {"text": "• ", "italic": true}, {"text": "Célèbre", "italic": true}, {"text": " chaque progrès"}, {"text": "\n\n"}, {"text": "Tu deviens ce que tu ", "bold": true}, {"text": "admires", "bold": true}, {"text": " secrètement."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "explorer_la_dimension_spiritue", "label": "Explorer la dimension spirituelle →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "La dimension sacrée du miroir" },

        { type: 'message', content: [{"text": "Il y a une ", "bold": true}, {"text": "sagesse divine", "bold": true}, {"text": " dans le miroir relationnel..."}] },
        { type: 'image', url: "https://images.unsplash.com/photo-1736957764199-8b3f7b6c117d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NTk4NDU1Nzl8&ixlib=rb-4.1.0&q=80&w=1080", alt: "" },
        { type: 'narrative', content: [{"text": "🤲 ", "italic": true}, {"text": "\"Les croyants sont les miroirs les uns des autres.\"", "italic": true}, {"text": "\n\n"}, {"text": "- Hadith du Prophète ﷺ"}, {"text": "\n\n"}, {"text": "Cette parole contient une ", "bold": true}, {"text": "vérité profonde", "bold": true}, {"text": " :"}, {"text": "\n\n"}, {"text": "Nous sommes placés les uns devant les autres pour nous ", "italic": true}, {"text": "révéler", "italic": true}, {"text": ", nous ", "italic": true}, {"text": "purifier", "italic": true}, {"text": ", nous ", "italic": true}, {"text": "élever", "italic": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "Le miroir dérangeant est une ", "bold": true}, {"text": "miséricorde", "bold": true}, {"text": " :"}, {"text": "\n\n"}, {"text": "• Il nous montre nos ", "italic": true}, {"text": "zones d'ombre", "italic": true}, {"text": " à illuminer"}, {"text": "\n\n"}, {"text": "• Il révèle nos ", "italic": true}, {"text": "potentiels", "italic": true}, {"text": " endormis"}, {"text": "\n\n"}, {"text": "• Il nous invite à la ", "italic": true}, {"text": "connaissance de soi", "italic": true}, {"text": "\n\n"}, {"text": "• Il nous pousse vers plus d'", "italic": true}, {"text": "authenticité", "italic": true}] },
        { type: 'narrative', content: [{"text": "La pratique spirituelle :"}, {"text": "\n\n"}, {"text": "Quand quelqu'un t'irrite, fais cette ", "bold": true}, {"text": "du'a", "bold": true}, {"text": " :"}, {"text": "\n\n"}, {"text": "\"", "italic": true}, {"text": "Ô Allah, montre-moi ce que cette personne révèle de moi. Aide-moi à voir avec clarté et à grandir avec sagesse.", "italic": true}, {"text": "\""}, {"text": "\n\n"}, {"text": "Car dans chaque irritation se cache une ", "bold": true}, {"text": "invitation divine", "bold": true}, {"text": " à devenir plus ", "bold": true}, {"text": "complet", "bold": true}, {"text": "."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "integrer_l_essence", "label": "Intégrer l'essence →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "L'essence à retenir" },

        { type: 'message', content: "De ce voyage dans le miroir dérangeant, retiens ceci..." },
        { type: 'narrative', content: [{"text": "🌸 ", "bold": true}, {"text": "Les autres ne sont pas là pour te déranger"}, {"text": "\n\n"}, {"text": "Ils sont là pour te ", "bold": true}, {"text": "révéler", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Chaque irritation est une ", "italic": true}, {"text": "invitation", "italic": true}, {"text": " à regarder en toi."}, {"text": "\n\n"}, {"text": "🌸 ", "bold": true}, {"text": "Ce que tu juges, tu le portes"}, {"text": "\n\n"}, {"text": "Sous une forme ou une autre, ", "italic": true}, {"text": "réprimée", "italic": true}, {"text": " ou ", "italic": true}, {"text": "niée", "italic": true}, {"text": "."}, {"text": "\n\n"}, {"text": "La ", "bold": true}, {"text": "reconnaissance", "bold": true}, {"text": " est le début de la ", "bold": true}, {"text": "libération", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "🌸 ", "bold": true}, {"text": "L'intégration transforme tout"}, {"text": "\n\n"}, {"text": "Quand tu acceptes ce que tu projetais, l'irritation se ", "italic": true}, {"text": "dissout", "italic": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Et l'autre redevient simplement... l'", "bold": true}, {"text": "autre", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "Le plus important :", "bold": true}, {"text": "\n\n"}, {"text": "Chaque personne qui t'agace est un ", "italic": true}, {"text": "cadeau", "italic": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Elle te montre exactement où tu as besoin de ", "bold": true}, {"text": "grandir", "bold": true}, {"text": ", de ", "bold": true}, {"text": "guérir", "bold": true}, {"text": ", d'", "bold": true}, {"text": "accepter", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Remercie ces ", "italic": true}, {"text": "miroirs dérangeants", "italic": true}, {"text": ". Ils sont tes plus grands ", "bold": true}, {"text": "maîtres", "bold": true}, {"text": "."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "cloturer_ce_voyage", "label": "Cloturer ce voyage →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "La bénédiction du miroir" },

        { type: 'message', content: "Avant de nous quitter, reçois cette parole..." },
        { type: 'narrative', content: [{"text": "Que tu sois celle qui ", "italic": true}, {"text": "juge rapidement", "italic": true}, {"text": " ou celle qui ", "italic": true}, {"text": "questionne profondément", "italic": true}, {"text": "..."}, {"text": "\n\n"}, {"text": "Que tu portes des ", "italic": true}, {"text": "irritations anciennes", "italic": true}, {"text": " ou des ", "italic": true}, {"text": "projections nouvelles", "italic": true}, {"text": "..."}, {"text": "\n\n"}, {"text": "Sache que chaque miroir est une ", "bold": true}, {"text": "grâce", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "Puisses-tu trouver quelqu'un qui soit pour toi un ", "italic": true}, {"text": "miroir lumineux", "italic": true}, {"text": "..."}, {"text": "\n\n"}, {"text": "Qui te révèle non seulement tes ", "bold": true}, {"text": "ombres", "bold": true}, {"text": " mais aussi ta ", "bold": true}, {"text": "lumière", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Et puisses-tu avoir le ", "italic": true}, {"text": "courage", "italic": true}, {"text": " de regarder, d'", "italic": true}, {"text": "accepter", "italic": true}, {"text": ", et de ", "italic": true}, {"text": "grandir", "italic": true}, {"text": "."}] },
        { type: 'message', content: "🪞✨" },
        { type: 'choice', variable: 'choix', options: [{"id": "celebrer_ce_moment", "label": "Célébrer ce moment →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Gratitude et célébration" },

        { type: 'image', url: "https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHNlYXJjaHwxN3x8dm95YWdlfGVufDB8MHx8fDE3NTk4NDU3MDN8MA&ixlib=rb-4.1.0&q=80&w=1080", alt: "" },
        { type: 'message', content: [{"text": "Quel voyage ", "bold": true}, {"text": "courageux", "bold": true}, {"text": " tu viens de faire..."}] },
        { type: 'narrative', content: [{"text": "Explorer le miroir dérangeant", "bold": true}, {"text": ", c'est accepter de voir ce que nous préférerions ignorer", "italic": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Tu as osé regarder tes projections, questionner tes irritations, reconnaître tes ombres", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "Tes réponses enrichissent ta ", "bold": true}, {"text": "cartographie émotionnelle personnelle", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Chaque prise de conscience sur tes ", "italic": true}, {"text": "mécanismes", "italic": true}, {"text": " te rapproche de relations plus ", "bold": true}, {"text": "authentiques", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Tu apprends à ", "italic": true}, {"text": "voir", "italic": true}, {"text": " au-delà des apparences, à ", "italic": true}, {"text": "comprendre", "italic": true}, {"text": " au-delà des jugements."}] },
        { type: 'narrative', content: [{"text": "Tu découvres que l'autre n'est jamais ", "italic": true}, {"text": "l'ennemi", "italic": true}, {"text": ".", "bold": true}, {"text": "\n\n"}, {"text": "Il est le ", "bold": true}, {"text": "révélateur", "bold": true}, {"text": " bienveillant de ce qui demande à être ", "bold": true}, {"text": "vu", "bold": true}, {"text": " et ", "bold": true}, {"text": "intégré", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Et dans cette reconnaissance, l'", "italic": true}, {"text": "irritation", "italic": true}, {"text": " devient ", "italic": true}, {"text": "gratitude", "italic": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "Continue de voir les autres comme des ", "bold": true}, {"text": "miroirs bienveillants", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Chaque irritation transformée est une ", "bold": true}, {"text": "libération", "bold": true}, {"text": " qui te rapproche de ton ", "bold": true}, {"text": "authenticité", "bold": true}, {"text": "."}] },
        { type: 'message', content: [{"text": "À très vite pour la suite de ton parcours ", "bold": true}, {"text": "Love Transformations™", "bold": true}, {"text": " insha'Allah…✨"}] },
        { type: 'message', content: [{"text": "🪞 ", "bold": true}, {"text": "Fin du Scénario 8 : Le Miroir Dérangeant", "bold": true}, {"text": " 🪞"}] },

        { type: 'completion', title: "Félicitations !", message: "Tu as terminé S8 — Le Miroir Dérangeant. Tes réponses ont été sauvegardées.", icon: '🪞' }
    ]
};

/* ─── Form Registry ─── */
if (typeof window.FORM_REGISTRY === 'undefined') window.FORM_REGISTRY = {};
window.FORM_REGISTRY['s8-miroir-derangeant'] = S8_MIROIR_DERANGEANT;
