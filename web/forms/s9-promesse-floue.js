/* ═══════════════════════════════════════
   S9 — La Promesse Floue
   Converti depuis Typebot · 106 steps · 8 variables
═══════════════════════════════════════ */

const S9_PROMESSE_FLOUE = {
    id: 's9_promesse_floue',
    version: 1,
    title: "S9 — La Promesse Floue",
    icon: '🌫️',
    checkboxId: 's9',
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
        "difficulte_principale_dans_le_flou",
        "peur_dominante_dans_l_ambiguite",
        "rapport_a_l_incertitude_relationnelle",
        "reaction_face_aux_promesses_vagues",
        "strategie_de_confrontation_du_flou",
        "telephone",
        "type_d_ambiguite_vecue",
        "verite_sur_la_peur_de_s_engager"
],

    steps: [

        /* ════════════════════════════════════ */
        { type: 'section', title: "Cartographie émotionnelle" },

        { type: 'image', url: "https://images.unsplash.com/photo-1491824989090-cc2d0b57eb0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHNlYXJjaHwxfHxicm91aWxsYXJkfGVufDB8MHx8fDE3NTk4NDU4MzF8MA&ixlib=rb-4.1.0&q=80&w=1080", alt: "" },
        { type: 'message', content: "Bienvenue dans le Scénario 9 : La Promesse Floue.\n\nAvant d'aller plus loin, peux-tu me partager ces informations : " },
        { type: 'text_input', variable: 'reponse', placeholder: "Ton prénom..." },
        { type: 'email_input', variable: 'email', placeholder: "ton.email@exemple.com" },
        { type: 'phone_input', variable: 'telephone', placeholder: "06 12 34 56 78", defaultPrefix: '+33' },
        { type: 'message', content: "🌫️ Dans le brouillard des promesses..." },
        { type: 'narrative', content: [{"text": "Aujourd'hui, nous explorons les ", "bold": true}, {"text": "territoires flous", "bold": true}, {"text": " de l'engagement..."}, {"text": "\n\n"}, {"text": "Ces espaces où l'amour existe mais où sa ", "italic": true}, {"text": "direction", "italic": true}, {"text": " reste ", "italic": true}, {"text": "incertaine", "italic": true}, {"text": "."}] },
        { type: 'message', content: [{"text": "🌊 ", "bold": true}, {"text": "Comment vis-tu l'incertitude relationnelle ?"}] },
        { type: 'choice', variable: 'rapport_a_l_incertitude_relationnelle', options: [{"id": "l_anxiete_me_consume_j_ai_bes", "label": "L'anxiété me consume\n\"J'ai besoin de savoir où on va\""}, {"id": "je_flotte_sereinement_les_cho", "label": "Je flotte sereinement\n\"Les choses se clarifieront en temps voulu\""}, {"id": "je_masque_mon_inquietude_je_f", "label": "Je masque mon inquiétude\n\"Je fais semblant que ça me va\""}, {"id": "je_pose_des_ultimatums_c_est", "label": "Je pose des ultimatums\n\"C'est maintenant ou jamais\""}, {"id": "je_navigue_entre_espoir_et_dou", "label": "Je navigue entre espoir et doute\n\"Un jour ça me va, un jour ça m'angoisse\""}] },
        { type: 'message', content: [{"text": "Cette réaction révèle ta ", "bold": true}, {"text": "tolérance au flou", "bold": true}, {"text": "..."}] },
        { type: 'message', content: [{"text": "💭 Et face aux promesses vagues..."}, {"text": "\n\n"}, {"text": "Qu'est-ce qui se réveille en toi ?", "bold": true}] },
        { type: 'choice', variable: 'reaction_face_aux_promesses_vagues', options: [{"id": "la_mefiance_instinctive", "label": "La méfiance instinctive"}, {"id": "l_espoir_patient", "label": "L'espoir patient"}, {"id": "la_frustration_croissante", "label": "La frustration croissante"}, {"id": "le_besoin_de_clarifier", "label": "Le besoin de clarifier"}, {"id": "l_acceptation_resignee", "label": "L'acceptation résignée"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Le brouillard relationnel" },

        { type: 'narrative', content: [{"text": "L'ambiguïté..."}, {"text": "\n\n"}, {"text": "Ce ", "italic": true}, {"text": "confort inconfortable", "italic": true}, {"text": " où certains couples s'installent."}, {"text": "\n\n"}, {"text": "Ni vraiment ensemble, ni vraiment séparés. Flottant dans un ", "bold": true}, {"text": "entre-deux", "bold": true}, {"text": " qui peut durer des ", "italic": true}, {"text": "mois", "italic": true}, {"text": ", des ", "italic": true}, {"text": "années", "italic": true}, {"text": "..."}] },
        { type: 'image', url: "https://images.unsplash.com/photo-1476782916354-326ab24c93df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHNlYXJjaHw4fHxzb2xpdHVkZXxlbnwwfDB8fHwxNzU5ODQ1OTUwfDA&ixlib=rb-4.1.0&q=80&w=1080", alt: "" },
        { type: 'message', content: [{"text": "🌫️ ", "italic": true}, {"text": "Quand les contours de l'amour s'estompent...", "italic": true}] },
        { type: 'narrative', content: [{"text": "Laisse-moi te raconter l'histoire de ", "bold": true}, {"text": "Samira", "bold": true}, {"text": "..."}, {"text": "\n\n"}, {"text": "Une histoire où l'amour existe mais où sa ", "italic": true}, {"text": "destination", "italic": true}, {"text": " reste ", "italic": true}, {"text": "mystérieuse", "italic": true}, {"text": "."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "entrer_dans_ce_brouillard", "label": "Entrer dans ce brouillard →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "L'histoire qui flotte" },

        { type: 'narrative', content: [{"text": "Un an et demi."}, {"text": "\n\n"}, {"text": "Samira comptait encore en mois au début. Puis en années", "bold": true}, {"text": ". Maintenant, elle avait arrêté de compter."}, {"text": "\n\n"}, {"text": "Avec Hamza, c'était... quoi exactement", "italic": true}, {"text": " ?"}] },
        { type: 'narrative', content: [{"text": "\"Tu viens dîner chez mes parents dimanche ?\" demanda-t-elle en préparant le thé."}, {"text": "\n\n"}, {"text": "\"Ah... Je dois vérifier. Tu sais, avec le travail en ce moment...\""}, {"text": "\n\n"}, {"text": "Le ", "bold": true}, {"text": "travail", "bold": true}, {"text": ". L'excuse passe-partout. Comme les \"", "italic": true}, {"text": "on verra", "italic": true}, {"text": "\", les \"", "italic": true}, {"text": "bientôt inch'Allah", "italic": true}, {"text": "\", les \"", "italic": true}, {"text": "quand le moment sera bon", "italic": true}, {"text": "\"."}, {"text": "\n\n"}, {"text": "Samira sentit cette ", "bold": true}, {"text": "fatigue familière", "bold": true}, {"text": " l'envahir."}] },
        { type: 'narrative', content: [{"text": "Pas la fatigue du corps. Celle de l'", "bold": true}, {"text": "âme", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "La fatigue de ", "italic": true}, {"text": "naviguer sans carte", "italic": true}, {"text": ". De ", "italic": true}, {"text": "construire sur du sable", "italic": true}, {"text": ". D'", "italic": true}, {"text": "aimer sans savoir vers où", "italic": true}, {"text": "."}, {"text": "\n\n"}, {"text": "\"Hamza...\" commença-t-elle."}, {"text": "\n\n"}, {"text": "\"Je sais ce que tu vas dire.\" Il soupira. \"Samira, on est ", "bold": true}, {"text": "bien", "bold": true}, {"text": " comme ça, non ?\""}] },
        { type: 'narrative', content: [{"text": "\"Bien comme ça\""}, {"text": "\n\n"}, {"text": "Ces mots ", "bold": true}, {"text": "résonnaient", "bold": true}, {"text": " dans sa tête."}, {"text": "\n\n"}, {"text": "Mais qu'est-ce que ça voulait dire ? Bien dans le ", "italic": true}, {"text": "flou", "italic": true}, {"text": " ? Bien dans l'", "italic": true}, {"text": "attente perpétuelle", "italic": true}, {"text": " ? Bien dans cette ", "italic": true}, {"text": "non-définition", "italic": true}, {"text": " ?"}] },
        { type: 'choice', variable: 'choix', options: [{"id": "ressentir_son_questionnement", "label": "Ressentir son questionnement →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Ta propre navigation" },

        { type: 'narrative', content: [{"text": "Avant de voir comment Samira traverse ce brouillard..."}, {"text": "\n\n"}, {"text": "Plongeons dans ", "bold": true}, {"text": "ta", "bold": true}, {"text": " vérité."}] },
        { type: 'narrative', content: [{"text": "🌫️ ", "bold": true}, {"text": "Si tu étais à la place de Samira..."}, {"text": "\n\n"}, {"text": "Après 1 ans et demi de \"on verra", "italic": true}, {"text": "\"..."}, {"text": "\n\n"}, {"text": "Quelle serait ta plus grande peur", "bold": true}, {"text": " ?"}] },
        { type: 'choice', variable: 'peur_dominante_dans_l_ambiguite', options: [{"id": "d_avoir_deja_perdu_trop_de_tem", "label": "D'avoir déjà perdu trop de temps"}, {"id": "qu_il_ne_m_aime_pas_vraiment", "label": "Qu'il ne m'aime pas vraiment"}, {"id": "de_forcer_et_de_tout_perdre", "label": "De forcer et de tout perdre"}, {"id": "qu_il_attende_quelqu_un_d_autr", "label": "Qu'il attende quelqu'un d'autre"}, {"id": "de_passer_a_cote_du_bon_ailleu", "label": "De passer à côté du bon ailleurs"}, {"id": "que_rien_ne_change_jamais", "label": "Que rien ne change jamais"}] },
        { type: 'message', content: [{"text": "Cette peur touche ton ", "bold": true}, {"text": "besoin de sécurité", "bold": true}, {"text": " profond..."}] },
        { type: 'narrative', content: [{"text": "Creusons plus ", "bold": true}, {"text": "profond", "bold": true}, {"text": "..."}, {"text": "\n\n"}, {"text": "Dans l'ambiguïté relationnelle, qu'est-ce qui t'est le plus ", "bold": true}, {"text": "difficile", "bold": true}, {"text": " à vivre ?"}] },
        { type: 'text_input', variable: 'difficulte_principale_dans_le_flou', placeholder: "Ce qui me pèse le plus dans le flou relationnel...", isLong: true },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Le moment de vérité" },

        { type: 'message', content: [{"text": "Cette conscience est ", "bold": true}, {"text": "cruciale", "bold": true}, {"text": " pour naviguer..."}] },
        { type: 'narrative', content: [{"text": "Revenons à Samira..."}, {"text": "\n\n"}, {"text": "Ce soir-là, quelque chose ", "bold": true}, {"text": "bascula", "bold": true}, {"text": " en elle."}] },
        { type: 'narrative', content: [{"text": "\"Non, Hamza. On n'est pas ", "italic": true}, {"text": "'bien comme ça'", "italic": true}, {"text": ".\""}, {"text": "\n\n"}, {"text": "Sa voix était ", "bold": true}, {"text": "calme", "bold": true}, {"text": " mais ", "bold": true}, {"text": "ferme", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "\"J'ai ", "italic": true}, {"text": "29 ans", "italic": true}, {"text": ". Ma sœur cadette se marie le mois prochain. Et moi, je suis toujours dans cette... cette ", "bold": true}, {"text": "salle d'attente", "bold": true}, {"text": " avec toi.\""}] },
        { type: 'narrative', content: [{"text": "Il la regarda, surpris par cette ", "italic": true}, {"text": "clarté nouvelle", "italic": true}, {"text": "."}, {"text": "\n\n"}, {"text": "\"Mais... Samira, tu sais que je t'aime.\""}, {"text": "\n\n"}, {"text": "\"L'amour sans ", "bold": true}, {"text": "direction", "bold": true}, {"text": ", c'est comme conduire dans le brouillard sans phares. On avance, mais vers ", "italic": true}, {"text": "où", "italic": true}, {"text": " ?\""}] },
        { type: 'narrative', content: [{"text": "💭 ", "bold": true}, {"text": "Face à cette confrontation nécessaire..."}, {"text": "\n\n"}, {"text": "Comment Samira devrait-elle ", "bold": true}, {"text": "naviguer", "bold": true}, {"text": " ce moment ?"}] },
        { type: 'choice', variable: 'strategie_de_confrontation_du_flou', options: [{"id": "poser_une_deadline_claire_3", "label": "Poser une deadline claire - \"3 mois pour décider\""}, {"id": "explorer_ses_peurs_profondes", "label": "Explorer ses peurs profondes - \"Qu'est-ce qui te retient ?\""}, {"id": "clarifier_ses_propres_besoins", "label": "Clarifier ses propres besoins - \"Voici ce dont j'ai besoin\""}, {"id": "proposer_un_accompagnement", "label": "Proposer un accompagnement - \"Allons voir quelqu'un ensemble\""}, {"id": "prendre_de_la_distance_j_ai", "label": "Prendre de la distance - \"J'ai besoin de réfléchir seule\""}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Les vérités cachées" },

        { type: 'message', content: [{"text": "Le silence s'installa. Lourd de ", "bold": true}, {"text": "non-dits", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "Puis Hamza parla enfin :"}, {"text": "\n\n"}, {"text": "\"Tu veux savoir la vérité ? J'ai ", "italic": true}, {"text": "peur", "italic": true}, {"text": ".\""}, {"text": "\n\n"}, {"text": "\"Peur de m'engager et de ", "bold": true}, {"text": "décevoir", "bold": true}, {"text": ". Peur de promettre ce que je ne pourrai peut-être pas ", "bold": true}, {"text": "tenir", "bold": true}, {"text": ". Mon père... il a fait tant de promesses à ma mère. Il n'en a tenu ", "italic": true}, {"text": "aucune", "italic": true}, {"text": ".\""}] },
        { type: 'narrative', content: [{"text": "Samira le regarda avec une ", "bold": true}, {"text": "tendresse nouvelle", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "\"Mais Hamza... En refusant de promettre par peur de décevoir, tu me ", "italic": true}, {"text": "déçois déjà", "italic": true}, {"text": ". Chaque jour.\""}, {"text": "\n\n"}, {"text": "Il baissa les yeux. La ", "bold": true}, {"text": "vérité", "bold": true}, {"text": ", simple et douloureuse."}] },
        { type: 'narrative', content: [{"text": "Dans ce moment de vérité..."}, {"text": "\n\n"}, {"text": "Qu'est-ce que cette peur de Hamza ", "bold": true}, {"text": "révèle vraiment", "bold": true}, {"text": " ?"}] },
        { type: 'text_input', variable: 'verite_sur_la_peur_de_s_engager', placeholder: "Ce que cache vraiment la peur de s'engager...", isLong: true },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Les mécanismes du flou" },

        { type: 'message', content: [{"text": "Cette observation touche au ", "bold": true}, {"text": "cœur", "bold": true}, {"text": " des ambiguïtés relationnelles..."}] },
        { type: 'message', content: [{"text": "Explorons les ", "bold": true}, {"text": "vraies raisons", "bold": true}, {"text": " derrière le flou relationnel..."}] },
        { type: 'narrative', content: [{"text": "🌫️ ", "bold": true}, {"text": "Pourquoi certains maintiennent l'ambiguïté :"}, {"text": "\n\n"}, {"text": "1. ", "bold": true}, {"text": "La Peur de Perdre", "bold": true}, {"text": "\n\n"}, {"text": "   \"Si je ne m'engage pas, je ne peux pas ", "italic": true}, {"text": "échouer", "italic": true}, {"text": "\""}, {"text": "\n\n"}, {"text": "   → Protection contre la ", "italic": true}, {"text": "vulnérabilité", "italic": true}, {"text": "\n\n"}, {"text": "2. ", "bold": true}, {"text": "L'Attente du Mieux", "bold": true}, {"text": "\n\n"}, {"text": "   \"Et si quelqu'un de ", "italic": true}, {"text": "mieux", "italic": true}, {"text": " arrivait ?\""}, {"text": "\n\n"}, {"text": "   → Syndrome de l'", "italic": true}, {"text": "herbe plus verte", "italic": true}, {"text": "\n\n"}, {"text": "3. ", "bold": true}, {"text": "Les Blessures Non Guéries", "bold": true}, {"text": "\n\n"}, {"text": "   \"J'ai déjà ", "italic": true}, {"text": "souffert", "italic": true}, {"text": " en m'engageant\""}, {"text": "\n\n"}, {"text": "   → Trauma relationnel ", "italic": true}, {"text": "actif", "italic": true}, {"text": "\n\n"}, {"text": "4. ", "bold": true}, {"text": "L'Immaturité Émotionnelle", "bold": true}, {"text": "\n\n"}, {"text": "   \"Je ne sais pas ce que je ", "italic": true}, {"text": "veux", "italic": true}, {"text": "\""}, {"text": "\n\n"}, {"text": "   → Incapacité à se ", "italic": true}, {"text": "définir", "italic": true}] },
        { type: 'choice', variable: 'choix', options: [{"id": "me_reconnaitre_dans_ces_patter", "label": "Me reconnaître dans ces patterns →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Le miroir de l'incertitude" },

        { type: 'image', url: "https://images.unsplash.com/photo-1675238146662-73be883ff024?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHNlYXJjaHw0N3x8aW5jZXJ0aXR1ZGV8ZW58MHwwfHx8MTc1OTg0NjExMXww&ixlib=rb-4.1.0&q=80&w=1080", alt: "" },
        { type: 'message', content: [{"text": "Tes réponses dessinent une ", "bold": true}, {"text": "carte fascinante", "bold": true}, {"text": "..."}] },
        { type: 'narrative', content: [{"text": "✨ Dans cette exploration du flou, tu révèles une ", "bold": true}, {"text": "sagesse particulière", "bold": true}, {"text": " :"}, {"text": "\n\n"}, {"text": "Tu comprends que l'ambiguïté n'est pas ", "italic": true}, {"text": "neutre", "italic": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Elle porte un ", "bold": true}, {"text": "coût émotionnel", "bold": true}, {"text": " - l'anxiété, le doute, l'érosion lente de la ", "italic": true}, {"text": "confiance en soi", "italic": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Tu sais que naviguer dans le brouillard demande une ", "bold": true}, {"text": "force particulière", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "Ce qui émerge de ton exploration :", "bold": true}, {"text": "\n\n"}, {"text": "• Tu portes une ", "italic": true}, {"text": "conscience aiguë", "italic": true}, {"text": " du temps qui passe"}, {"text": "\n\n"}, {"text": "• Tu reconnais le ", "italic": true}, {"text": "poids", "italic": true}, {"text": " de l'incertitude prolongée"}, {"text": "\n\n"}, {"text": "• Tu cherches l'équilibre entre ", "italic": true}, {"text": "patience", "italic": true}, {"text": " et ", "italic": true}, {"text": "clarté", "italic": true}, {"text": "\n\n"}, {"text": "• Tu navigues entre ", "italic": true}, {"text": "espoir", "italic": true}, {"text": " et ", "italic": true}, {"text": "lucidité", "italic": true}] },
        { type: 'narrative', content: [{"text": "Le défi n'est pas d'", "italic": true}, {"text": "accepter", "italic": true}, {"text": " ou de ", "italic": true}, {"text": "fuir", "italic": true}, {"text": " l'ambiguïté."}, {"text": "\n\n"}, {"text": "C'est de ", "bold": true}, {"text": "reconnaître", "bold": true}, {"text": " quand elle sert la relation et quand elle la ", "bold": true}, {"text": "dessert", "bold": true}, {"text": "."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "comprendre_l_art_de_clarifier", "label": "Comprendre l'art de clarifier →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "L'art de la clarification" },

        { type: 'message', content: [{"text": "Laisse-moi t'éclairer sur l'art de ", "bold": true}, {"text": "dissiper le brouillard", "bold": true}, {"text": "..."}] },
        { type: 'message', content: [{"text": "💫 ", "bold": true}, {"text": "Les 4 Types d'Ambiguïté Relationnelle"}] },
        { type: 'narrative', content: [{"text": "1. ", "bold": true}, {"text": "L'Ambiguïté Protectrice", "bold": true}, {"text": "\n\n"}, {"text": "Les débuts où on ", "italic": true}, {"text": "apprend à se connaître", "italic": true}, {"text": "\n\n"}, {"text": "→ ", "bold": true}, {"text": "Saine", "bold": true}, {"text": " et ", "bold": true}, {"text": "temporaire", "bold": true}, {"text": "\n\n"}, {"text": "Durée : 3-6 mois maximum"}] },
        { type: 'narrative', content: [{"text": "2. L'Ambiguïté Anxieuse", "bold": true}, {"text": "\n\n"}, {"text": "L'u"}, {"text": "n veut plus, l'autre résiste", "italic": true}, {"text": "\n\n"}, {"text": "→ Douloureuse et épuisante", "bold": true}, {"text": "\n\n"}, {"text": "Signal d'incompatibilité", "italic": true}, {"text": " ?"}] },
        { type: 'narrative', content: [{"text": "3. ", "bold": true}, {"text": "L'Ambiguïté Confortable", "bold": true}, {"text": "\n\n"}, {"text": "Les deux ", "italic": true}, {"text": "évitent", "italic": true}, {"text": " la définition"}, {"text": "\n\n"}, {"text": "→ ", "bold": true}, {"text": "Stagnante", "bold": true}, {"text": " et ", "bold": true}, {"text": "limitante", "bold": true}, {"text": "\n\n"}, {"text": "Peur de ", "italic": true}, {"text": "grandir", "italic": true}, {"text": " ensemble"}] },
        { type: 'narrative', content: [{"text": "4. ", "bold": true}, {"text": "L'Ambiguïté Stratégique", "bold": true}, {"text": "\n\n"}, {"text": "Maintenue pour ", "italic": true}, {"text": "garder les options ouvertes", "italic": true}, {"text": "\n\n"}, {"text": "→ ", "bold": true}, {"text": "Égoïste", "bold": true}, {"text": " et ", "bold": true}, {"text": "blessante", "bold": true}, {"text": "\n\n"}, {"text": "Manque de ", "italic": true}, {"text": "respect", "italic": true}, {"text": " profond"}] },
        { type: 'narrative', content: [{"text": "Reconnaissant ces types..."}, {"text": "\n\n"}, {"text": "Quelle ambiguïté as-tu le plus ", "bold": true}, {"text": "vécue", "bold": true}, {"text": " ?"}] },
        { type: 'choice', variable: 'type_d_ambiguite_vecue', options: [{"id": "la_protectrice_qui_s_eternise", "label": "La protectrice qui s'éternise"}, {"id": "l_anxieuse_qui_epuise", "label": "L'anxieuse qui épuise"}, {"id": "la_confortable_qui_stagne", "label": "La confortable qui stagne"}, {"id": "la_strategique_qui_blesse", "label": "La stratégique qui blesse"}, {"id": "un_melange_selon_les_relations", "label": "Un mélange selon les relations"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Trois clés pour dissiper le brouillard" },

        { type: 'narrative', content: [{"text": "Pour naviguer l'ambiguïté avec ", "bold": true}, {"text": "grâce", "bold": true}, {"text": " et ", "bold": true}, {"text": "clarté", "bold": true}, {"text": "..."}] },
        { type: 'narrative', content: [{"text": "🗝️ ", "bold": true}, {"text": "1. La Clarification Progressive", "bold": true}, {"text": "\n\n"}, {"text": "Au lieu de l'ultimatum, la ", "bold": true}, {"text": "conversation étagée", "bold": true}, {"text": " :"}, {"text": "\n\n"}, {"text": "• ", "bold": true}, {"text": "Étape 1", "bold": true}, {"text": " : \"Où te vois-tu dans 6 mois ?\""}, {"text": "\n\n"}, {"text": "  Explorer sa ", "italic": true}, {"text": "vision personnelle", "italic": true}, {"text": "\n\n"}, {"text": "• ", "bold": true}, {"text": "Étape 2", "bold": true}, {"text": " : \"Comment nous vois-tu évoluer ?\""}, {"text": "\n\n"}, {"text": "  Introduire le ", "italic": true}, {"text": "\"nous\"", "italic": true}, {"text": " doucement"}, {"text": "\n\n"}, {"text": "• ", "bold": true}, {"text": "Étape 3", "bold": true}, {"text": " : \"Qu'est-ce qui te retient ?\""}, {"text": "\n\n"}, {"text": "  Explorer les ", "italic": true}, {"text": "peurs", "italic": true}, {"text": " avec compassion"}, {"text": "\n\n"}, {"text": "• ", "bold": true}, {"text": "Étape 4", "bold": true}, {"text": " : \"De quoi as-tu besoin pour avancer ?\""}, {"text": "\n\n"}, {"text": "  Co-créer les ", "italic": true}, {"text": "conditions", "italic": true}, {"text": " de clarté"}] },
        { type: 'narrative', content: [{"text": "🌟 ", "bold": true}, {"text": "2. L'Ancrage dans le Présent", "bold": true}, {"text": "\n\n"}, {"text": "Sortir du \"", "italic": true}, {"text": "un jour peut-être", "italic": true}, {"text": "\" :"}, {"text": "\n\n"}, {"text": "• Définir des ", "bold": true}, {"text": "micro-engagements", "bold": true}, {"text": " concrets"}, {"text": "\n\n"}, {"text": "  \"Cette semaine, on fait X ensemble\""}, {"text": "\n\n"}, {"text": "• Célébrer les ", "bold": true}, {"text": "petits pas", "bold": true}, {"text": "\n\n"}, {"text": "  \"Tu as rencontré ma sœur, c'est important\""}, {"text": "\n\n"}, {"text": "• Observer les ", "bold": true}, {"text": "actes", "bold": true}, {"text": " plus que les ", "italic": true}, {"text": "mots", "italic": true}, {"text": "\n\n"}, {"text": "  Les promesses floues vs les gestes concrets"}, {"text": "\n\n"}, {"text": "L'engagement se construit dans le ", "bold": true}, {"text": "quotidien", "bold": true}, {"text": ", pas dans le ", "italic": true}, {"text": "futur hypothétique", "italic": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "💎 ", "bold": true}, {"text": "3. La Clarté Intérieure d'Abord", "bold": true}, {"text": "\n\n"}, {"text": "Avant de demander la clarté, la ", "bold": true}, {"text": "cultiver en soi", "bold": true}, {"text": " :"}, {"text": "\n\n"}, {"text": "• ", "bold": true}, {"text": "Définir ses non-négociables", "bold": true}, {"text": "\n\n"}, {"text": "  \"J'ai besoin de X pour me sentir en sécurité\""}, {"text": "\n\n"}, {"text": "• ", "bold": true}, {"text": "Clarifier sa timeline personnelle", "bold": true}, {"text": "\n\n"}, {"text": "  \"Je veux Y avant mes Z ans\""}, {"text": "\n\n"}, {"text": "• ", "bold": true}, {"text": "Honorer ses besoins", "bold": true}, {"text": " sans culpabilité"}, {"text": "\n\n"}, {"text": "  \"C'est légitime de vouloir savoir\""}, {"text": "\n\n"}, {"text": "Tu ne peux pas forcer la clarté chez l'autre, mais tu peux ", "bold": true}, {"text": "incarner", "bold": true}, {"text": " la tienne."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "voir_la_transformation_possibl", "label": "Voir la transformation possible →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "La transformation nécessaire" },

        { type: 'narrative', content: [{"text": "Revenons à Samira et Hamza..."}, {"text": "\n\n"}, {"text": "Après cette conversation ", "bold": true}, {"text": "cruciale", "bold": true}, {"text": "..."}] },
        { type: 'narrative', content: [{"text": "\"Samira, donne-moi ", "italic": true}, {"text": "trois mois", "italic": true}, {"text": ".\""}, {"text": "\n\n"}, {"text": "Elle allait protester quand il continua :"}, {"text": "\n\n"}, {"text": "\"Pas trois mois dans le flou. Trois mois pour te ", "bold": true}, {"text": "prouver", "bold": true}, {"text": " que je peux être l'homme dont tu as besoin. Pour ", "bold": true}, {"text": "guérir", "bold": true}, {"text": " mes peurs. Pour apprendre à ", "bold": true}, {"text": "promettre", "bold": true}, {"text": " sans trembler.\""}] },
        { type: 'narrative', content: [{"text": "Il sortit son téléphone :"}, {"text": "\n\n"}, {"text": "\"Regarde. J'ai pris rendez-vous avec un ", "italic": true}, {"text": "thérapeute", "italic": true}, {"text": ". Pour comprendre mes blocages. J'ai aussi parlé à l'imam pour des ", "italic": true}, {"text": "conseils prématrimoniaux", "italic": true}, {"text": ".\""}, {"text": "\n\n"}, {"text": "Samira sentit quelque chose ", "bold": true}, {"text": "bouger", "bold": true}, {"text": " en elle. Ce n'était plus du flou. C'était un ", "bold": true}, {"text": "plan", "bold": true}, {"text": ", une ", "bold": true}, {"text": "direction", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "Les trois mois qui suivirent furent ", "bold": true}, {"text": "différents", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "• Hamza ", "italic": true}, {"text": "partageait", "italic": true}, {"text": " ses séances, ses prises de conscience"}, {"text": "\n\n"}, {"text": "• Ils ", "italic": true}, {"text": "planifiaient", "italic": true}, {"text": " concrètement : budget, lieu de vie, timeline"}, {"text": "\n\n"}, {"text": "• Il ", "italic": true}, {"text": "rencontra", "italic": true}, {"text": " sa famille, elle la sienne"}, {"text": "\n\n"}, {"text": "• Les \"", "italic": true}, {"text": "on verra", "italic": true}, {"text": "\" devinrent des \"", "bold": true}, {"text": "voici comment", "bold": true}, {"text": "\""}, {"text": "\n\n"}, {"text": "L'ambiguïté se ", "bold": true}, {"text": "dissolvait", "bold": true}, {"text": " dans l'action."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "explorer_la_dimension_spiritue", "label": "Explorer la dimension spirituelle →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "La dimension sacrée de la clarté" },

        { type: 'message', content: [{"text": "Il y a une ", "bold": true}, {"text": "sagesse divine", "bold": true}, {"text": " dans la clarté..."}] },
        { type: 'image', url: "https://images.unsplash.com/photo-1602524206684-fdf7c87c1b33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHNlYXJjaHwzfHxtb3NxdWV8ZW58MHx8fHwxNjk2MDAwMDAwfDA&ixlib=rb-4.0.3&q=80&w=1080", alt: "" },
        { type: 'narrative', content: [{"text": "🤲 L'Islam nous enseigne la ", "bold": true}, {"text": "clarté", "bold": true}, {"text": " dans les engagements :"}, {"text": "\n\n"}, {"text": "\"", "italic": true}, {"text": "Ô vous qui croyez ! Respectez vos engagements.", "italic": true}, {"text": "\" (5:1)"}, {"text": "\n\n"}, {"text": "Mais comment respecter ce qui n'est pas ", "bold": true}, {"text": "défini", "bold": true}, {"text": " ?"}] },
        { type: 'narrative', content: [{"text": "Le Prophète ﷺ a dit : \"", "italic": true}, {"text": "Le halal est clair et le haram est clair, et entre les deux il y a des choses ambiguës.", "italic": true}, {"text": "\""}, {"text": "\n\n"}, {"text": "Dans les relations, l'ambiguïté prolongée nous maintient dans cette ", "bold": true}, {"text": "zone grise", "bold": true}, {"text": " :"}, {"text": "\n\n"}, {"text": "• Ni ", "italic": true}, {"text": "halal", "italic": true}, {"text": " (engagement clair)"}, {"text": "\n\n"}, {"text": "• Ni vraiment ", "italic": true}, {"text": "haram", "italic": true}, {"text": "\n\n"}, {"text": "• Mais dans un ", "bold": true}, {"text": "inconfort spirituel", "bold": true}, {"text": "\n\n"}, {"text": "La clarté est une forme d'", "bold": true}, {"text": "adoration", "bold": true}, {"text": " - elle honore la vérité."}] },
        { type: 'narrative', content: [{"text": "L'", "bold": true}, {"text": "istikhara", "bold": true}, {"text": " pour les moments de flou :"}, {"text": "\n\n"}, {"text": "Non pas \"Montre-moi s'il est ", "italic": true}, {"text": "le bon", "italic": true}, {"text": "\""}, {"text": "\n\n"}, {"text": "Mais \"Guide-moi vers la ", "bold": true}, {"text": "clarté", "bold": true}, {"text": " dont j'ai besoin\""}, {"text": "\n\n"}, {"text": "Car parfois, la guidance est de voir que l'ambiguïté elle-même est un ", "italic": true}, {"text": "signe", "italic": true}, {"text": "."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "integrer_l_essence", "label": "Intégrer l'essence →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "L'essence à retenir" },

        { type: 'message', content: "De ce voyage dans le brouillard relationnel, retiens ceci..." },
        { type: 'narrative', content: [{"text": "🌸 ", "bold": true}, {"text": "L'ambiguïté est une réponse"}, {"text": "\n\n"}, {"text": "Quand quelqu'un maintient le flou, c'est déjà une forme de ", "bold": true}, {"text": "clarté", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Cela te dit : \"Je ne suis pas ", "italic": true}, {"text": "prêt", "italic": true}, {"text": "\" ou \"Je ne suis pas ", "italic": true}, {"text": "sûr", "italic": true}, {"text": "\"."}, {"text": "\n\n"}, {"text": "🌸 ", "bold": true}, {"text": "Tu mérites la clarté"}, {"text": "\n\n"}, {"text": "Demander où tu en es n'est pas ", "italic": true}, {"text": "presser", "italic": true}, {"text": ". C'est ", "bold": true}, {"text": "honorer", "bold": true}, {"text": " ton temps et ton cœur."}, {"text": "\n\n"}, {"text": "Ta vie n'est pas un ", "italic": true}, {"text": "brouillon", "italic": true}, {"text": " en attente de validation."}, {"text": "\n\n"}, {"text": "🌸 ", "bold": true}, {"text": "La patience a des limites"}, {"text": "\n\n"}, {"text": "Attendre que l'autre soit prêt, oui. L'attendre ", "italic": true}, {"text": "indéfiniment", "italic": true}, {"text": ", non."}, {"text": "\n\n"}, {"text": "Il y a une différence entre la ", "bold": true}, {"text": "patience", "bold": true}, {"text": " et l'", "bold": true}, {"text": "oubli de soi", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "Le plus important :", "bold": true}, {"text": "\n\n"}, {"text": "L'amour véritable ne vit pas dans le ", "italic": true}, {"text": "peut-être", "italic": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Il dit ", "bold": true}, {"text": "\"oui\"", "bold": true}, {"text": " avec courage ou ", "bold": true}, {"text": "\"non\"", "bold": true}, {"text": " avec honnêteté."}, {"text": "\n\n"}, {"text": "Mais il ne te laisse pas ", "italic": true}, {"text": "flotter", "italic": true}, {"text": " dans l'incertitude."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "finaliser", "label": "Finaliser →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "La bénédiction de la clarté" },

        { type: 'message', content: "Avant de nous quitter, reçois cette parole..." },
        { type: 'narrative', content: [{"text": "Que tu sois celle qui ", "italic": true}, {"text": "navigue le flou", "italic": true}, {"text": " ou celle qui ", "italic": true}, {"text": "cherche la clarté", "italic": true}, {"text": "..."}, {"text": "\n\n"}, {"text": "Que tu portes la ", "italic": true}, {"text": "patience", "italic": true}, {"text": " ou l'", "italic": true}, {"text": "urgence", "italic": true}, {"text": " dans ton cœur..."}, {"text": "\n\n"}, {"text": "Sache que tu ", "bold": true}, {"text": "mérites", "bold": true}, {"text": " de savoir où tu vas."}] },
        { type: 'narrative', content: [{"text": "Puisses-tu trouver quelqu'un dont les ", "italic": true}, {"text": "\"oui\"", "italic": true}, {"text": " sont des ", "bold": true}, {"text": "oui", "bold": true}, {"text": " et les ", "italic": true}, {"text": "\"non\"", "italic": true}, {"text": " sont des ", "bold": true}, {"text": "non", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Quelqu'un qui n'a pas peur de ", "bold": true}, {"text": "promettre", "bold": true}, {"text": " parce qu'il sait ", "bold": true}, {"text": "tenir", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Quelqu'un qui transforme le brouillard en ", "italic": true}, {"text": "chemin clair", "italic": true}, {"text": " vers un ", "italic": true}, {"text": "futur partagé", "italic": true}, {"text": "."}] },
        { type: 'message', content: "🌫️✨" },
        { type: 'choice', variable: 'choix', options: [{"id": "celebrer_ce_voyage", "label": "Célébrer ce voyage →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Gratitude et célébration" },

        { type: 'image', url: "https://images.unsplash.com/photo-1527824404775-dce343118ebc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHNlYXJjaHw1Mnx8dm95YWdlfGVufDB8MHx8fDE3NTk4NDU3MDR8MA&ixlib=rb-4.1.0&q=80&w=1080", alt: "" },
        { type: 'message', content: [{"text": "Quel voyage ", "bold": true}, {"text": "courageux", "bold": true}, {"text": " tu viens de faire..."}] },
        { type: 'narrative', content: [{"text": "Explorer l'", "bold": true}, {"text": "ambiguïté", "bold": true}, {"text": ", c'est toucher à l'une des ", "italic": true}, {"text": "anxiétés", "italic": true}, {"text": " les plus universelles en amour."}, {"text": "\n\n"}, {"text": "Tu as osé regarder tes ", "bold": true}, {"text": "besoins de sécurité", "bold": true}, {"text": ", questionner ta ", "bold": true}, {"text": "tolérance au flou", "bold": true}, {"text": ", imaginer la ", "bold": true}, {"text": "clarté possible", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "C'est un acte de ", "bold": true}, {"text": "respect de soi", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "Tes réponses enrichissent ta ", "bold": true}, {"text": "cartographie émotionnelle personnelle", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Chaque prise de conscience sur ton ", "italic": true}, {"text": "rapport à l'incertitude", "italic": true}, {"text": " te rapproche de relations plus ", "bold": true}, {"text": "sereines", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Tu apprends à ", "italic": true}, {"text": "demander", "italic": true}, {"text": " ce dont tu as besoin sans ", "italic": true}, {"text": "t'excuser", "italic": true}, {"text": " d'avoir des besoins."}] },
        { type: 'narrative', content: [{"text": "Tu découvres que la clarté n'est pas l'", "italic": true}, {"text": "ennemie", "italic": true}, {"text": " de l'amour.", "bold": true}, {"text": "\n\n"}, {"text": "Elle est sa ", "bold": true}, {"text": "fondation", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Car comment construire sur du ", "italic": true}, {"text": "brouillard", "italic": true}, {"text": " ?"}] },
        { type: 'narrative', content: [{"text": "Continue de ", "bold": true}, {"text": "naviguer", "bold": true}, {"text": " avec cette nouvelle clarté."}, {"text": "\n\n"}, {"text": "L'ambiguïté que tu refuses aujourd'hui fait place à la ", "bold": true}, {"text": "certitude", "bold": true}, {"text": " que tu mérites demain."}] },
        { type: 'message', content: [{"text": "À très vite pour la suite de ton parcours ", "bold": true}, {"text": "Love Transformations™", "bold": true}, {"text": " insha'Allah…✨"}] },
        { type: 'message', content: [{"text": "🌫️ ", "bold": true}, {"text": "Fin du Scénario 9 : La Promesse Floue", "bold": true}, {"text": " 🌫️"}] },

        { type: 'completion', title: "Félicitations !", message: "Tu as terminé S9 — La Promesse Floue. Tes réponses ont été sauvegardées.", icon: '🌫️' }
    ]
};

/* ─── Form Registry ─── */
if (typeof window.FORM_REGISTRY === 'undefined') window.FORM_REGISTRY = {};
window.FORM_REGISTRY['s9-promesse-floue'] = S9_PROMESSE_FLOUE;
