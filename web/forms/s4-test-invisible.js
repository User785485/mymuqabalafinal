/* ═══════════════════════════════════════
   S4 — Le Test Invisible
   Converti depuis Typebot · 105 steps · 8 variables
═══════════════════════════════════════ */

const S4_TEST_INVISIBLE = {
    id: 's4_test_invisible',
    version: 1,
    title: "S4 — Le Test Invisible",
    icon: '👁️',
    checkboxId: 's4',
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
        "ce_que_les_triggers_touchent_vraiment",
        "emotion_dominante_face_au_micro_trigger",
        "niveau_de_partage_vulnerable",
        "pattern_de_sur_reaction_reconnu",
        "reaction_face_au_derangement",
        "sensibilite_aux_details",
        "strategie_de_navigation_du_conflit",
        "telephone"
],

    steps: [

        /* ════════════════════════════════════ */
        { type: 'section', title: "Cartographie émotionnelle" },

        { type: 'image', url: "https://images.unsplash.com/photo-1706208686865-dca5126c94a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHNlYXJjaHwxNHx8ZCVDMyVBOXRhaWxzfGVufDB8MHx8fDE3NTQ4NDE0ODR8MA&ixlib=rb-4.1.0&q=80&w=1080", alt: "" },
        { type: 'message', content: "🔍 Les détails qui révèlent..." },
        { type: 'narrative', content: [{"text": "Bienvenue à toi dans "}, {"text": "le", "bold": true}, {"text": " "}, {"text": "scénario 4 : Le Test Invisible", "bold": true}, {"text": " ! Avant de commencer :"}] },
        { type: 'text_input', variable: 'reponse', placeholder: "Quel est ton prénom ?" },
        { type: 'phone_input', variable: 'telephone', placeholder: "06 12 34 56 78", defaultPrefix: '+33' },
        { type: 'email_input', variable: 'email', placeholder: "ton.email@exemple.com" },
        { type: 'narrative', content: [{"text": "Aujourd'hui, nous explorons les ", "bold": true}, {"text": "micro-moments", "bold": true}, {"text": " qui révèlent les ", "bold": true}, {"text": "macro-vérités", "bold": true}, {"text": "..."}, {"text": "\n\n"}, {"text": "Mais d'abord, dis-moi..."}] },
        { type: 'message', content: [{"text": "💭 ", "bold": true}, {"text": "Comment réagis-tu aux petits détails ?"}] },
        { type: 'choice', variable: 'sensibilite_aux_details', options: [{"id": "je_remarque_tout_les_moindres", "label": "Je remarque tout\n\"Les moindres changements me sautent aux yeux\""}, {"id": "je_suis_selective_certains_de", "label": "Je suis sélective\n\"Certains détails me touchent, d'autres passent\""}, {"id": "je_sur_analyse_un_petit_detai", "label": "Je sur-analyse\n\"Un petit détail peut m'obséder des heures\""}, {"id": "je_relativise_vite_je_ne_m_at", "label": "Je relativise vite\n\"Je ne m'attarde pas sur les petites choses\""}, {"id": "ca_depend_de_mon_etat_parfois", "label": "Ça dépend de mon état\n\"Parfois hypersensible, parfois indifférente\""}] },
        { type: 'message', content: [{"text": "Cette sensibilité révèle ton ", "bold": true}, {"text": "système d'alerte intérieur", "bold": true}, {"text": "..."}] },
        { type: 'message', content: [{"text": "⚡ Et quand quelque chose te dérange..."}, {"text": "\n\n"}, {"text": "Quelle est ta première réaction ?", "bold": true}] },
        { type: 'choice', variable: 'reaction_face_au_derangement', options: [{"id": "je_bouillonne_interieurement", "label": "Je bouillonne intérieurement"}, {"id": "j_exprime_directement", "label": "J'exprime directement"}, {"id": "je_me_questionne_d_abord", "label": "Je me questionne d'abord"}, {"id": "je_minimise_pour_garder_la_pai", "label": "Je minimise pour garder la paix"}, {"id": "je_stocke_jusqu_a_l_explosion", "label": "Je stocke jusqu'à l'explosion"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Le test commence" },

        { type: 'narrative', content: [{"text": "Les petits incidents..."}, {"text": "\n\n"}, {"text": "Parfois ce sont des ", "italic": true}, {"text": "détails sans importance", "italic": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Parfois ce sont des ", "bold": true}, {"text": "fenêtres sur l'âme", "bold": true}, {"text": "."}] },
        { type: 'image', url: "https://images.unsplash.com/photo-1668718003253-d5b8cd004bf0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHNlYXJjaHw3fHxpbmNpZGVudHN8ZW58MHwwfHx8MTc1NDg0MTkzOHww&ixlib=rb-4.1.0&q=80&w=1080", alt: "" },
        { type: 'message', content: [{"text": "💫 ", "italic": true}, {"text": "Quand l'insignifiant devient significatif...", "italic": true}] },
        { type: 'narrative', content: [{"text": "Laisse-moi te raconter l'histoire de ", "bold": true}, {"text": "Amira", "bold": true}, {"text": "..."}, {"text": "\n\n"}, {"text": "Une histoire où un ", "italic": true}, {"text": "petit incident", "italic": true}, {"text": " révèle de ", "italic": true}, {"text": "grandes vérités", "italic": true}, {"text": "."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "decouvrir_ce_moment_revelateur", "label": "Découvrir ce moment révélateur →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "L'incident révélateur" },

        { type: 'narrative', content: [{"text": "Un mois et demi de ", "bold": true}, {"text": "douceur croissante", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Amira et Sofiane construisent leur rythme. Messages du matin qui font sourire, appels du soir qui ", "italic": true}, {"text": "apaisent", "italic": true}, {"text": ", cette complicité qui grandit à chaque échange."}, {"text": "\n\n"}, {"text": "Tout semble ", "bold": true}, {"text": "fluide", "bold": true}, {"text": ". Jusqu'à ce soir-là."}] },
        { type: 'narrative', content: [{"text": "Ils avaient prévu de se retrouver à 19h30 après le travail. Un café dans leur endroit habituel, ces quelques heures ", "italic": true}, {"text": "précieuses", "italic": true}, {"text": " volées au quotidien."}, {"text": "\n\n"}, {"text": "19h45. Pas de Sofiane."}, {"text": "\n\n"}, {"text": "20h. Un message : ", "italic": true}, {"text": "\"Désolé, réunion qui s'éternise. J'arrive dès que possible !\"", "italic": true}, {"text": "\n\n"}, {"text": "Pas de ", "italic": true}, {"text": "\"Je suis vraiment désolé\"", "italic": true}, {"text": ". Pas de ", "italic": true}, {"text": "\"Tu m'attends ?\"", "italic": true}, {"text": ". Juste cette phrase ", "bold": true}, {"text": "fonctionnelle", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "20h15. Il arrive, souriant, comme si de rien n'était."}, {"text": "\n\n"}, {"text": "\"", "italic": true}, {"text": "Désolé pour le retard ! Cette réunion, une catastrophe...", "italic": true}, {"text": "\""}, {"text": "\n\n"}, {"text": "Et il enchaîne sur les détails de sa journée."}, {"text": "\n\n"}, {"text": "Amira sourit. Mais à l'intérieur, quelque chose ", "bold": true}, {"text": "grince", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "Ce n'est ", "bold": true}, {"text": "rien", "bold": true}, {"text": ", se dit-elle. ", "italic": true}, {"text": "45 minutes de retard, ça arrive.", "italic": true}, {"text": "\n\n"}, {"text": "Mais pourquoi cette ", "bold": true}, {"text": "irritation", "bold": true}, {"text": " qui monte ?"}, {"text": "\n\n"}, {"text": "Pourquoi ce sentiment d'être ", "italic": true}, {"text": "invisible", "italic": true}, {"text": ", ", "italic": true}, {"text": "pas prioritaire", "italic": true}, {"text": ", ", "italic": true}, {"text": "prise pour acquise", "italic": true}, {"text": " ?"}, {"text": "\n\n"}, {"text": "C'est ", "bold": true}, {"text": "disproportionné", "bold": true}, {"text": ", elle le sait. Mais c'est ", "bold": true}, {"text": "là", "bold": true}, {"text": "."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "entendre_ses_voix_interieures", "label": "Entendre ses voix intérieures →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Les voix qui s'élèvent" },

        { type: 'message', content: [{"text": "Dans le brouhaha du café, une ", "bold": true}, {"text": "symphonie intérieure", "bold": true}, {"text": " se joue..."}] },
        { type: 'narrative', content: [{"text": "💭 ", "italic": true}, {"text": "\"Il n'a même pas demandé si j'ai attendu longtemps...\"", "italic": true}, {"text": "\n\n"}, {"text": "⚡ ", "italic": true}, {"text": "\"Stop Amira, tu dramatises. C'est juste un retard.\"", "italic": true}, {"text": "\n\n"}, {"text": "🛡️ ", "italic": true}, {"text": "\"Mais c'est comme ça que ça commence... D'abord les retards, puis...\"", "italic": true}, {"text": "\n\n"}, {"text": "💔 ", "italic": true}, {"text": "\"Rappelle-toi Kamel. Ça avait commencé exactement comme ça.\"", "italic": true}, {"text": "\n\n"}, {"text": "✨ ", "italic": true}, {"text": "\"Mais Sofiane n'est pas Kamel. Ou si ?\"", "italic": true}] },
        { type: 'narrative', content: [{"text": "Elle le regarde parler avec ", "bold": true}, {"text": "animation", "bold": true}, {"text": " de sa journée."}, {"text": "\n\n"}, {"text": "Cet homme qui d'habitude est si ", "italic": true}, {"text": "attentionné", "italic": true}, {"text": ". Qui remarque quand elle change de parfum, qui se souvient de ses rendez-vous importants."}, {"text": "\n\n"}, {"text": "Pourquoi ", "bold": true}, {"text": "aujourd'hui", "bold": true}, {"text": " cette ", "bold": true}, {"text": "négligence", "bold": true}, {"text": " ?"}] },
        { type: 'choice', variable: 'choix', options: [{"id": "explorer_ma_propre_reaction", "label": "Explorer ma propre réaction →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Ton miroir intérieur" },

        { type: 'narrative', content: [{"text": "Avant de voir comment Amira navigue ce moment..."}, {"text": "\n\n"}, {"text": "Plongeons dans ", "bold": true}, {"text": "ta", "bold": true}, {"text": " vérité face aux ", "bold": true}, {"text": "micro-triggers", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "🔍 ", "bold": true}, {"text": "Si tu étais à la place d'Amira..."}, {"text": "\n\n"}, {"text": "Face à ce retard sans ", "italic": true}, {"text": "vraies excuses", "italic": true}, {"text": ", cette arrivée ", "italic": true}, {"text": "désinvolte", "italic": true}, {"text": "..."}, {"text": "\n\n"}, {"text": "Quelle émotion ", "bold": true}, {"text": "dominerait", "bold": true}, {"text": " en toi ?"}] },
        { type: 'choice', variable: 'emotion_dominante_face_au_micro_trigger', options: [{"id": "la_colere_froide_le_manque", "label": "La colère froide - \"Le manque de respect, je ne supporte pas\""}, {"id": "la_tristesse_cachee_je_ne_c", "label": "La tristesse cachée - \"Je ne compte pas assez pour lui\""}, {"id": "l_anxiete_montante_c_est_le", "label": "L'anxiété montante - \"C'est le début de la négligence\""}, {"id": "la_rationalisation_ce_n_est", "label": "La rationalisation - \"Ce n'est qu'un retard, je relativise\""}, {"id": "le_doute_profond_ai_je_rais", "label": "Le doute profond - \"Ai-je raison de m'énerver pour si peu ?\""}, {"id": "la_deception_silencieuse_je", "label": "La déception silencieuse - \"Je pensais qu'il était différent\""}] },
        { type: 'message', content: [{"text": "Cette émotion révèle ce qui se ", "bold": true}, {"text": "cache", "bold": true}, {"text": " sous ta surface..."}] },
        { type: 'narrative', content: [{"text": "Allons plus ", "bold": true}, {"text": "loin", "bold": true}, {"text": "..."}, {"text": "\n\n"}, {"text": "Quand tu réagis ", "bold": true}, {"text": "fortement", "bold": true}, {"text": " à un petit incident, qu'est-ce que ça touche ", "bold": true}, {"text": "vraiment", "bold": true}, {"text": " en toi ?"}] },
        { type: 'text_input', variable: 'ce_que_les_triggers_touchent_vraiment', placeholder: "Ce que les petits incidents réveillent vraiment en moi...", isLong: true },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Naviguer la tempête" },

        { type: 'message', content: [{"text": "Cette conscience est ", "bold": true}, {"text": "précieuse", "bold": true}, {"text": "..."}] },
        { type: 'narrative', content: [{"text": "Revenons à Amira..."}, {"text": "\n\n"}, {"text": "Elle a le choix. ", "bold": true}, {"text": "Réagir", "bold": true}, {"text": " ou ", "bold": true}, {"text": "répondre", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "Elle pourrait :"}, {"text": "\n\n"}, {"text": "• ", "italic": true}, {"text": "Sourire et enfouir", "italic": true}, {"text": " - Faire comme si de rien n'était"}, {"text": "\n\n"}, {"text": "• ", "italic": true}, {"text": "Exploser maintenant", "italic": true}, {"text": " - Laisser sortir toute la frustration"}, {"text": "\n\n"}, {"text": "• ", "italic": true}, {"text": "Glisser des piques", "italic": true}, {"text": " - Exprimer indirectement"}, {"text": "\n\n"}, {"text": "• ", "italic": true}, {"text": "Aborder avec douceur", "italic": true}, {"text": " - Partager ce qu'elle ressent"}, {"text": "\n\n"}, {"text": "• ", "italic": true}, {"text": "Observer d'abord", "italic": true}, {"text": " - Voir si c'est un pattern"}] },
        { type: 'narrative', content: [{"text": "Elle choisit la ", "bold": true}, {"text": "voie du milieu", "bold": true}, {"text": " :"}, {"text": "\n\n"}, {"text": "\"", "italic": true}, {"text": "Sofiane, j'ai quelque chose à te dire. Ton retard ce soir... ça m'a plus touchée que ça ne devrait peut-être.", "italic": true}, {"text": "\""}, {"text": "\n\n"}, {"text": "Il ", "bold": true}, {"text": "se redresse", "bold": true}, {"text": ", surpris."}] },
        { type: 'narrative', content: [{"text": "💫 ", "bold": true}, {"text": "À ta place..."}, {"text": "\n\n"}, {"text": "Comment ", "bold": true}, {"text": "naviguerais-tu", "bold": true}, {"text": " ce moment délicat ?"}] },
        { type: 'choice', variable: 'strategie_de_navigation_du_conflit', options: [{"id": "expression_directe_voila_ex", "label": "Expression directe - \"Voilà exactement ce qui me dérange\""}, {"id": "questionnement_doux_qu_est", "label": "Questionnement doux - \"Qu'est-ce qui s'est passé ce soir ?\""}, {"id": "partage_vulnerable_ca_a_rev", "label": "Partage vulnérable - \"Ça a réveillé de vieilles blessures\""}, {"id": "etablir_les_limites_j_ai_be", "label": "Établir les limites - \"J'ai besoin qu'on parle du respect du temps\""}, {"id": "explorer_ensemble_comprenon", "label": "Explorer ensemble - \"Comprenons pourquoi ça me touche autant\""}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Le dialogue révélateur" },

        { type: 'message', content: [{"text": "La conversation qui suit est un ", "bold": true}, {"text": "tournant", "bold": true}, {"text": "..."}] },
        { type: 'narrative', content: [{"text": "\"", "italic": true}, {"text": "Plus touchée que ça ne devrait ?", "italic": true}, {"text": "\" répète Sofiane."}, {"text": "\n\n"}, {"text": "\"", "italic": true}, {"text": "Amira, je suis vraiment désolé. Je... je n'ai pas réalisé. Pour moi c'était juste un retard de travail, mais je vois que pour toi c'était plus.", "italic": true}, {"text": "\""}, {"text": "\n\n"}, {"text": "Elle ", "bold": true}, {"text": "respire", "bold": true}, {"text": ". Le plus dur arrive :"}, {"text": "\n\n"}, {"text": "\"", "italic": true}, {"text": "C'est pas rationnel, je sais. Mais quand tu es arrivé sans vraiment t'excuser, sans demander si j'avais attendu... j'ai eu l'impression de ne pas compter.", "italic": true}, {"text": "\""}] },
        { type: 'narrative', content: [{"text": "Le visage de Sofiane ", "bold": true}, {"text": "change", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "\"", "italic": true}, {"text": "Oh Amira... Tu comptes. Tu comptes tellement. Je suis juste... parfois maladroit. Distrait. Mais jamais négligent avec toi, jamais volontairement.", "italic": true}, {"text": "\""}, {"text": "\n\n"}, {"text": "Un silence. Puis :"}, {"text": "\n\n"}, {"text": "\"", "italic": true}, {"text": "Dis-moi... qu'est-ce qui se cache vraiment derrière cette réaction ?", "italic": true}, {"text": "\""}] },
        { type: 'narrative', content: [{"text": "🌊 ", "bold": true}, {"text": "Si tu étais Amira..."}, {"text": "\n\n"}, {"text": "Oserais-tu partager la ", "bold": true}, {"text": "vraie raison", "bold": true}, {"text": " de ta sur-réaction ?"}] },
        { type: 'choice', variable: 'niveau_de_partage_vulnerable', options: [{"id": "partage_total_voici_mes_ble", "label": "Partage total - \"Voici mes blessures passées...\""}, {"id": "partage_partiel_j_ai_vecu_d", "label": "Partage partiel - \"J'ai vécu des choses qui me rendent sensible\""}, {"id": "focus_sur_le_present_c_est", "label": "Focus sur le présent - \"C'est nous deux qui compte, pas le passé\""}, {"id": "demande_du_temps_j_ai_besoi", "label": "Demande du temps - \"J'ai besoin de comprendre moi-même d'abord\""}, {"id": "detournement_doux_l_importa", "label": "Détournement doux - \"L'important c'est qu'on en parle maintenant\""}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Les patterns cachés" },

        { type: 'message', content: [{"text": "Ce niveau de partage révèle ta ", "bold": true}, {"text": "stratégie de protection", "bold": true}, {"text": "..."}] },
        { type: 'message', content: [{"text": "Explorons ce qui se ", "bold": true}, {"text": "cache vraiment", "bold": true}, {"text": " derrière les sur-réactions..."}] },
        { type: 'narrative', content: [{"text": "🔍 ", "bold": true}, {"text": "Les micro-déclencheurs sont des messagers :"}, {"text": "\n\n"}, {"text": "• Un retard → ", "italic": true}, {"text": "\"Suis-je une priorité ?\"", "italic": true}, {"text": "\n\n"}, {"text": "• Un oubli → ", "italic": true}, {"text": "\"Suis-je mémorable ?\"", "italic": true}, {"text": "\n\n"}, {"text": "• Un ton sec → ", "italic": true}, {"text": "\"Suis-je respectée ?\"", "italic": true}, {"text": "\n\n"}, {"text": "• Une distraction → ", "italic": true}, {"text": "\"Suis-je intéressante ?\"", "italic": true}, {"text": "\n\n"}, {"text": "• Une comparaison → ", "italic": true}, {"text": "\"Suis-je suffisante ?\"", "italic": true}] },
        { type: 'narrative', content: [{"text": "⚡ ", "bold": true}, {"text": "La sur-réaction révèle toujours :"}, {"text": "\n\n"}, {"text": "1. Une ", "bold": true}, {"text": "blessure non guérie", "bold": true}, {"text": "\n\n"}, {"text": "   Le présent active un souvenir douloureux"}, {"text": "\n\n"}, {"text": "2. Un ", "bold": true}, {"text": "besoin non exprimé", "bold": true}, {"text": "\n\n"}, {"text": "   Ce qu'on n'ose pas demander directement"}, {"text": "\n\n"}, {"text": "3. Une ", "bold": true}, {"text": "peur cachée", "bold": true}, {"text": "\n\n"}, {"text": "   Ce qu'on redoute de voir se répéter"}, {"text": "\n\n"}, {"text": "4. Une ", "bold": true}, {"text": "attente inconsciente", "bold": true}, {"text": "\n\n"}, {"text": "   Ce qu'on espère sans le dire"}] },
        { type: 'narrative', content: [{"text": "En regardant l'histoire d'Amira..."}, {"text": "\n\n"}, {"text": "Quel ", "bold": true}, {"text": "pattern personnel", "bold": true}, {"text": " reconnais-tu en toi ?"}] },
        { type: 'text_input', variable: 'pattern_de_sur_reaction_reconnu', placeholder: "Le pattern de sur-réaction que je reconnais en moi...", isLong: true },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Le miroir bienveillant" },

        { type: 'image', url: "https://images.unsplash.com/photo-1614239453154-e85d3df41707?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHNlYXJjaHwxOXx8cmVmbGV0fGVufDB8MHx8fDE3NTQ4NDI1ODl8MA&ixlib=rb-4.1.0&q=80&w=1080", alt: "" },
        { type: 'message', content: [{"text": "Ta conscience s'affine avec une ", "bold": true}, {"text": "beauté touchante", "bold": true}, {"text": "..."}] },
        { type: 'narrative', content: [{"text": "✨ Dans cette exploration des micro-déclencheurs, tu révèles une intelligence émotionnelle", "bold": true}, {"text": " en construction :"}, {"text": "\n\n"}, {"text": "Tu ", "italic": true}, {"text": "reconnais", "italic": true}, {"text": " que tes réactions parlent plus de ", "bold": true}, {"text": "toi", "bold": true}, {"text": " que de ", "bold": true}, {"text": "l'autre", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Tu ", "italic": true}, {"text": "comprends", "italic": true}, {"text": " que les petits incidents sont des ", "bold": true}, {"text": "fenêtres", "bold": true}, {"text": " sur tes profondeurs."}, {"text": "\n\n"}, {"text": "Tu ", "italic": true}, {"text": "navigues", "italic": true}, {"text": " entre le droit de ressentir et la sagesse de comprendre."}] },
        { type: 'narrative', content: [{"text": "Ce qui émerge de ton exploration :", "bold": true}, {"text": "\n\n"}, {"text": "• Tu es ", "italic": true}, {"text": "attentive", "italic": true}, {"text": " aux détails qui comptent"}, {"text": "\n\n"}, {"text": "• Tu portes des ", "italic": true}, {"text": "sensibilités", "italic": true}, {"text": " qui sont des forces déguisées"}, {"text": "\n\n"}, {"text": "• Tu cherches l'", "italic": true}, {"text": "équilibre", "italic": true}, {"text": " entre expression et sur-réaction"}, {"text": "\n\n"}, {"text": "• Tu apprends à ", "italic": true}, {"text": "décoder", "italic": true}, {"text": " tes propres signaux d'alarme"}] },
        { type: 'narrative', content: [{"text": "Le défi n'est pas d'", "italic": true}, {"text": "ignorer", "italic": true}, {"text": " tes réactions ou de les ", "italic": true}, {"text": "juger", "italic": true}, {"text": "."}, {"text": "\n\n"}, {"text": "C'est de les ", "bold": true}, {"text": "accueillir", "bold": true}, {"text": " comme des ", "bold": true}, {"text": "messagères", "bold": true}, {"text": ", de les ", "bold": true}, {"text": "comprendre", "bold": true}, {"text": ", puis de ", "bold": true}, {"text": "choisir", "bold": true}, {"text": " ta réponse."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "comprendre_les_mecanismes_prof", "label": "Comprendre les mécanismes profonds →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Décoder les sur-réactions" },

        { type: 'message', content: [{"text": "Laisse-moi t'éclairer sur la ", "bold": true}, {"text": "mécanique cachée", "bold": true}, {"text": " des sur-réactions..."}] },
        { type: 'narrative', content: [{"text": "💡 ", "bold": true}, {"text": "L'équation de la sur-réaction :"}, {"text": "\n\n"}, {"text": "Incident mineur + Blessure ancienne + Peur activée = ", "bold": true}, {"text": "Explosion émotionnelle", "bold": true}] },
        { type: 'narrative', content: [{"text": "🎯 ", "bold": true}, {"text": "Exemples concrets :"}, {"text": "\n\n"}, {"text": "• Il oublie de répondre à un message"}, {"text": "\n\n"}, {"text": "  → Blessure : ", "italic": true}, {"text": "\"On m'a déjà ignorée\"", "italic": true}, {"text": "\n\n"}, {"text": "  → Peur : ", "italic": true}, {"text": "\"Je vais être abandonnée\"", "italic": true}, {"text": "\n\n"}, {"text": "• Il fait une blague sur ton apparence"}, {"text": "\n\n"}, {"text": "  → Blessure : ", "italic": true}, {"text": "\"On s'est déjà moqué de moi\"", "italic": true}, {"text": "\n\n"}, {"text": "  → Peur : ", "italic": true}, {"text": "\"Je ne suis pas assez belle\"", "italic": true}, {"text": "\n\n"}, {"text": "• Il annule un rendez-vous"}, {"text": "\n\n"}, {"text": "  → Blessure : ", "italic": true}, {"text": "\"On m'a déjà fait passer en dernier\"", "italic": true}, {"text": "\n\n"}, {"text": "  → Peur : ", "italic": true}, {"text": "\"Je ne compte pas vraiment\"", "italic": true}] },
        { type: 'narrative', content: [{"text": "🔄 ", "bold": true}, {"text": "Le processus en 4 temps :"}, {"text": "\n\n"}, {"text": "1. ", "bold": true}, {"text": "L'incident", "bold": true}, {"text": " (objectif)"}, {"text": "\n\n"}, {"text": "   Ce qui se passe réellement"}, {"text": "\n\n"}, {"text": "2. ", "bold": true}, {"text": "L'interprétation", "bold": true}, {"text": " (subjectif)"}, {"text": "\n\n"}, {"text": "   L'histoire qu'on se raconte"}, {"text": "\n\n"}, {"text": "3. ", "bold": true}, {"text": "L'activation", "bold": true}, {"text": " (émotionnel)"}, {"text": "\n\n"}, {"text": "   Les vieilles blessures qui se réveillent"}, {"text": "\n\n"}, {"text": "4. ", "bold": true}, {"text": "La réaction", "bold": true}, {"text": " (comportemental)"}, {"text": "\n\n"}, {"text": "   Comment on exprime (ou pas) tout ça"}] },
        { type: 'narrative', content: [{"text": "🌟 ", "bold": true}, {"text": "La clé de la transformation :"}, {"text": "\n\n"}, {"text": "Créer un ", "bold": true}, {"text": "espace", "bold": true}, {"text": " entre l'incident et la réaction."}, {"text": "\n\n"}, {"text": "Dans cet espace : ", "italic": true}, {"text": "observer", "italic": true}, {"text": ", ", "italic": true}, {"text": "comprendre", "italic": true}, {"text": ", ", "italic": true}, {"text": "choisir", "italic": true}, {"text": "."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "recevoir_mes_outils_pratiques", "label": "Recevoir mes outils pratiques →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Trois clés pour transformer" },

        { type: 'message', content: [{"text": "Pour transformer les micro-déclencheurs en opportunités de croissance", "bold": true}, {"text": "..."}] },
        { type: 'narrative', content: [{"text": "🔑 1. Le STOP Sacré", "bold": true}, {"text": "\n\n"}, {"text": "Quand tu sens la ", "bold": true}, {"text": "montée émotionnelle", "bold": true}, {"text": " :"}, {"text": "\n\n"}, {"text": "• ", "bold": true}, {"text": "S", "bold": true}, {"text": "top - Arrête-toi physiquement"}, {"text": "\n\n"}, {"text": "• ", "bold": true}, {"text": "Respire profondément 3 fois"}, {"text": "\n\n"}, {"text": "• ", "bold": true}, {"text": "O", "bold": true}, {"text": "bserve - Qu'est-ce qui se passe vraiment ?"}, {"text": "\n\n"}, {"text": "• ", "bold": true}, {"text": "Choisis ta réponse consciemment"}, {"text": "\n\n"}, {"text": "Ce ", "italic": true}, {"text": "moment de pause", "italic": true}, {"text": " change tout."}] },
        { type: 'narrative', content: [{"text": "🌊 2. La Question Magique", "bold": true}, {"text": "\n\n"}, {"text": "Avant de réagir, demande-toi :"}, {"text": "\n\n"}, {"text": "\"", "italic": true}, {"text": "Si ma meilleure amie me racontait cette situation, qu'est-ce que je penserais ?", "italic": true}, {"text": "\""}, {"text": "\n\n"}, {"text": "Cette question te permet de :"}, {"text": "\n\n"}, {"text": "• Prendre de la ", "bold": true}, {"text": "distance", "bold": true}, {"text": "\n\n"}, {"text": "• Accéder à ta ", "bold": true}, {"text": "sagesse", "bold": true}, {"text": "\n\n"}, {"text": "• Sortir du ", "bold": true}, {"text": "mode victime", "bold": true}, {"text": "\n\n"}, {"text": "• Voir plus ", "bold": true}, {"text": "clairement", "bold": true}] },
        { type: 'narrative', content: [{"text": "💬 3. Le Dialogue de Clarification", "bold": true}, {"text": "\n\n"}, {"text": "Quand tu décides de ", "bold": true}, {"text": "communiquer", "bold": true}, {"text": " :"}, {"text": "\n\n"}, {"text": "\"", "italic": true}, {"text": "Quand tu [comportement objectif], je ressens [émotion]. Ça me rappelle [si tu veux partager]. J'ai besoin de [besoin clair].", "italic": true}, {"text": "\""}, {"text": "\n\n"}, {"text": "Exemple concret :"}, {"text": "\n\n"}, {"text": "\"", "italic": true}, {"text": "Quand tu arrives en retard sans prévenir, je me sens anxieuse. J'ai besoin qu'on communique sur les changements de plans.", "italic": true}, {"text": "\""}, {"text": "\n\n"}, {"text": "Pas d'", "italic": true}, {"text": "accusations", "italic": true}, {"text": ", pas de ", "italic": true}, {"text": "généralisations", "italic": true}, {"text": ", juste des ", "bold": true}, {"text": "faits", "bold": true}, {"text": " et des ", "bold": true}, {"text": "besoins", "bold": true}, {"text": "."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "decouvrir_la_verite_profonde", "label": "Découvrir la vérité profonde →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "La vérité sur les tests invisibles" },

        { type: 'message', content: "Il y a une vérité que peu osent voir sur les micro-déclencheurs..." },
        { type: 'narrative', content: [{"text": "Les petits incidents ne sont pas des ", "italic": true}, {"text": "problèmes", "italic": true}, {"text": ".", "bold": true}, {"text": "\n\n"}, {"text": "Ce sont des ", "bold": true}, {"text": "cadeaux", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "Ils te montrent :"}, {"text": "\n\n"}, {"text": "✨ Où tu as encore besoin de ", "italic": true}, {"text": "guérir", "italic": true}, {"text": "\n\n"}, {"text": "✨ Ce que tu n'oses pas ", "italic": true}, {"text": "demander directement", "italic": true}, {"text": "\n\n"}, {"text": "✨ Les ", "italic": true}, {"text": "standards", "italic": true}, {"text": " que tu mérites"}, {"text": "\n\n"}, {"text": "✨ Ta capacité à ", "italic": true}, {"text": "communiquer", "italic": true}, {"text": " ou pas"}] },
        { type: 'narrative', content: [{"text": "Plus important encore :", "bold": true}, {"text": "\n\n"}, {"text": "Ils révèlent si cette relation a l'", "bold": true}, {"text": "espace", "bold": true}, {"text": " pour tes vulnérabilités."}, {"text": "\n\n"}, {"text": "Car un partenaire qui ", "italic": true}, {"text": "accueille", "italic": true}, {"text": " tes sur-réactions avec ", "italic": true}, {"text": "curiosité", "italic": true}, {"text": " plutôt qu'avec ", "italic": true}, {"text": "jugement", "italic": true}, {"text": "..."}, {"text": "\n\n"}, {"text": "C'est un partenaire avec qui tu peux ", "bold": true}, {"text": "grandir", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "La vraie question n'est pas :"}, {"text": "\n\n"}, {"text": "\"Comment arrêter de sur-réagir ?\""}, {"text": "\n\n"}, {"text": "Mais :"}, {"text": "\n\n"}, {"text": "\"", "bold": true}, {"text": "Qu'est-ce que mes réactions m'enseignent ?", "bold": true}, {"text": "\""}] },
        { type: 'choice', variable: 'choix', options: [{"id": "integrer_l_essence", "label": "Intégrer l'essence →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "L'essence à retenir" },

        { type: 'message', content: "De ce voyage dans les micro-moments, retiens ceci..." },
        { type: 'narrative', content: [{"text": "🌸 ", "bold": true}, {"text": "Tes sur-réactions sont des messagères, pas des ennemies"}, {"text": "\n\n"}, {"text": "Elles portent la ", "bold": true}, {"text": "sagesse", "bold": true}, {"text": " de tes blessures et l'", "bold": true}, {"text": "espoir", "bold": true}, {"text": " de ta guérison."}, {"text": "\n\n"}, {"text": "Les ", "italic": true}, {"text": "écouter", "italic": true}, {"text": " sans les ", "italic": true}, {"text": "laisser diriger", "italic": true}, {"text": ", c'est la maturité émotionnelle."}, {"text": "\n\n"}, {"text": "🌸 ", "bold": true}, {"text": "Les petits tests révèlent les grandes vérités"}, {"text": "\n\n"}, {"text": "Comment quelqu'un réagit à tes ", "italic": true}, {"text": "sensibilités", "italic": true}, {"text": " montre comment il gérera tes ", "italic": true}, {"text": "vulnérabilités", "italic": true}, {"text": "."}, {"text": "\n\n"}, {"text": "🌸 ", "bold": true}, {"text": "L'espace entre stimulus et réponse est ton pouvoir"}, {"text": "\n\n"}, {"text": "Dans cet espace, tu peux ", "bold": true}, {"text": "choisir", "bold": true}, {"text": " qui tu veux être, pas qui tes blessures te poussent à être."}] },
        { type: 'narrative', content: [{"text": "Le plus important :", "bold": true}, {"text": "\n\n"}, {"text": "Tu n'as pas besoin d'être ", "italic": true}, {"text": "parfaitement guérie", "italic": true}, {"text": " pour être ", "italic": true}, {"text": "parfaitement aimée", "italic": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Mais tu as besoin d'être ", "bold": true}, {"text": "consciente", "bold": true}, {"text": " pour être ", "bold": true}, {"text": "sage", "bold": true}, {"text": " dans l'amour."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "acceder_l_etape_finale", "label": "Accéder l'étape finale →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "La bénédiction de la conscience" },

        { type: 'message', content: "Avant de nous quitter..." },
        { type: 'narrative', content: [{"text": "Que tu sois celle qui ", "italic": true}, {"text": "sur-réagit", "italic": true}, {"text": " ou celle qui ", "italic": true}, {"text": "retient tout", "italic": true}, {"text": "..."}, {"text": "\n\n"}, {"text": "Que tu portes des ", "italic": true}, {"text": "sensibilités à fleur de peau", "italic": true}, {"text": " ou des ", "italic": true}, {"text": "armures invisibles", "italic": true}, {"text": "..."}, {"text": "\n\n"}, {"text": "Sache que ta ", "bold": true}, {"text": "conscience", "bold": true}, {"text": " est ta plus grande ", "bold": true}, {"text": "alliée", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "Puisses-tu trouver quelqu'un qui voit tes ", "italic": true}, {"text": "sur-réactions", "italic": true}, {"text": " non comme des ", "italic": true}, {"text": "drames", "italic": true}, {"text": "..."}, {"text": "\n\n"}, {"text": "Mais comme des ", "bold": true}, {"text": "invitations", "bold": true}, {"text": " à mieux te ", "bold": true}, {"text": "connaître", "bold": true}, {"text": ", te ", "bold": true}, {"text": "comprendre", "bold": true}, {"text": ", t'", "bold": true}, {"text": "aimer", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Quelqu'un qui transforme tes ", "italic": true}, {"text": "tempêtes intérieures", "italic": true}, {"text": " en ", "italic": true}, {"text": "conversations qui guérissent", "italic": true}, {"text": "."}] },
        { type: 'message', content: "🔍✨" },
        { type: 'choice', variable: 'choix', options: [{"id": "celebrer_ce_voyage", "label": "Célébrer ce voyage →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Gratitude et célébration" },

        { type: 'image', url: "https://images.unsplash.com/photo-1454391304352-2bf4678b1a7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHNlYXJjaHwyfHxjbGFyaXR5fGVufDB8fHx8MTY5NjAwMDAwMHww&ixlib=rb-4.0.3&q=80&w=1080", alt: "" },
        { type: 'message', content: [{"text": "Quelle exploration", "bold": true}, {"text": " tu viens de faire..."}] },
        { type: 'narrative', content: [{"text": "Explorer les micro-déclencheurs", "bold": true}, {"text": ", c'est avoir le courage de regarder dans le miroir de nos réactions", "italic": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Tu as osé reconnaître tes ", "bold": true}, {"text": "sensibilités", "bold": true}, {"text": ", questionner tes ", "bold": true}, {"text": "patterns", "bold": true}, {"text": ", comprendre tes ", "bold": true}, {"text": "mécanismes", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "C'est un acte d'", "bold": true}, {"text": "intelligence émotionnelle", "bold": true}, {"text": " et de ", "bold": true}, {"text": "maturité", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "Tes réponses enrichissent ta ", "bold": true}, {"text": "cartographie émotionnelle personnelle", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Chaque prise de conscience sur tes ", "italic": true}, {"text": "triggers", "italic": true}, {"text": " est un pas vers des relations plus ", "bold": true}, {"text": "conscientes", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Tu apprends à ", "italic": true}, {"text": "danser", "italic": true}, {"text": " avec tes sensibilités plutôt que de les ", "italic": true}, {"text": "combattre", "italic": true}, {"text": " ou les ", "italic": true}, {"text": "cacher", "italic": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "Tu découvres que tes ", "italic": true}, {"text": "réactions", "italic": true}, {"text": " ne sont pas des ", "italic": true}, {"text": "défauts", "italic": true}, {"text": ".", "bold": true}, {"text": "\n\n"}, {"text": "Ce sont des ", "bold": true}, {"text": "boussoles", "bold": true}, {"text": " qui pointent vers ce qui a besoin d'", "italic": true}, {"text": "attention", "italic": true}, {"text": ", de ", "italic": true}, {"text": "guérison", "italic": true}, {"text": ", d'", "italic": true}, {"text": "expression", "italic": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Les ", "bold": true}, {"text": "honorer", "bold": true}, {"text": " tout en apprenant à les ", "bold": true}, {"text": "transformer", "bold": true}, {"text": ", c'est la sagesse relationnelle."}] },
        { type: 'narrative', content: [{"text": "Continue d'observer avec ", "bold": true}, {"text": "curiosité", "bold": true}, {"text": " et ", "bold": true}, {"text": "compassion", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Chaque micro-moment est une opportunité de mieux te ", "bold": true}, {"text": "connaître", "bold": true}, {"text": " et de mieux ", "bold": true}, {"text": "aimer", "bold": true}, {"text": "."}] },
        { type: 'message', content: [{"text": "À très vite pour la suite de ton parcours ", "bold": true}, {"text": "Love Transformations™", "bold": true}, {"text": " insha'Allah…✨"}] },
        { type: 'message', content: [{"text": "🔍 ", "bold": true}, {"text": "Fin du Scénario 4 : Le Test Invisible", "bold": true}, {"text": " 🔍"}] },

        { type: 'completion', title: "Félicitations !", message: "Tu as terminé S4 — Le Test Invisible. Tes réponses ont été sauvegardées.", icon: '👁️' }
    ]
};

/* ─── Form Registry ─── */
if (typeof window.FORM_REGISTRY === 'undefined') window.FORM_REGISTRY = {};
window.FORM_REGISTRY['s4-test-invisible'] = S4_TEST_INVISIBLE;
