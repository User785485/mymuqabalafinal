/* ═══════════════════════════════════════
   S3 — Les Deux Mondes
   Converti depuis Typebot · 104 steps · 8 variables
═══════════════════════════════════════ */

const S3_DEUX_MONDES = {
    id: 's3_deux_mondes',
    version: 1,
    title: "S3 — Les Deux Mondes",
    icon: '🌍',
    checkboxId: 's3',
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
        "ce_que_les_differences_revelent",
        "conseil_sur_les_differences",
        "difference_qui_defie_le_plus",
        "rapport_aux_mondes_culturels",
        "reaction_face_aux_differences",
        "reaction_viscerale_a_la_difference",
        "strategie_de_navigation_des_differences",
        "telephone"
],

    steps: [

        /* ════════════════════════════════════ */
        { type: 'section', title: "Cartographie émotionnelle" },

        { type: 'image', url: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHNlYXJjaHwyfHxicmlkZ2V8ZW58MHx8fHwxNjk2MDAwMDAwfDA&ixlib=rb-4.0.3&q=80&w=1080", alt: "" },
        { type: 'message', content: "🌉 Entre deux rives..." },
        { type: 'message', content: [{"text": "Bienvenue à toi dans le "}, {"text": "scénario 3 : Entre deux mondes", "bold": true}, {"text": " ! Avant de commencer :"}] },
        { type: 'text_input', variable: 'reponse', placeholder: "Quel est ton prénom ?" },
        { type: 'phone_input', variable: 'telephone', placeholder: "06 12 34 56 78", defaultPrefix: '+33' },
        { type: 'email_input', variable: 'email', placeholder: "ton.email@exemple.com" },
        { type: 'narrative', content: [{"text": "Aujourd'hui, nous explorons les ", "bold": true}, {"text": "ponts", "bold": true}, {"text": " entre les mondes..."}, {"text": "\n\n"}, {"text": "Mais d'abord, dis-moi..."}] },
        { type: 'message', content: [{"text": "🌍 ", "bold": true}, {"text": "Comment vis-tu ta place entre les mondes, entre tradition et modernité ?"}] },
        { type: 'choice', variable: 'rapport_aux_mondes_culturels', options: [{"id": "je_navigue_avec_aisance_j_ai", "label": "Je navigue avec aisance\n\"J'ai trouvé mon équilibre entre tradition et modernité\""}, {"id": "je_me_sens_tiraillee_parfois", "label": "Je me sens tiraillée\n\"Parfois ici, parfois là-bas, jamais complètement quelque part\""}, {"id": "j_ai_choisi_mon_camp_j_ai_tra", "label": "J'ai choisi mon camp\n\"J'ai tranché pour simplifier ma vie\""}, {"id": "je_cree_mon_propre_monde_ni_l", "label": "Je crée mon propre monde\n\"Ni l'un ni l'autre, mais quelque chose de nouveau\""}, {"id": "ca_depend_du_contexte_je_m_ad", "label": "Ça dépend du contexte\n\"Je m'adapte selon les situations\""}] },
        { type: 'message', content: [{"text": "💫 Et face aux différences..."}, {"text": "\n\n"}, {"text": "Quelle est ta première réaction ?", "bold": true}] },
        { type: 'choice', variable: 'reaction_face_aux_differences', options: [{"id": "la_curiosite_m_anime", "label": "La curiosité m'anime"}, {"id": "la_prudence_me_guide", "label": "La prudence me guide"}, {"id": "l_inconfort_me_saisit", "label": "L'inconfort me saisit"}, {"id": "l_analyse_me_protege", "label": "L'analyse me protège"}, {"id": "l_ouverture_mesuree", "label": "L'ouverture mesurée"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "La révélation inattendue" },

        { type: 'narrative', content: [{"text": "Les différences..."}, {"text": "\n\n"}, {"text": "Parfois elles ", "italic": true}, {"text": "enrichissent", "italic": true}, {"text": ", parfois elles ", "italic": true}, {"text": "défient", "italic": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Toujours elles ", "bold": true}, {"text": "révèlent", "bold": true}, {"text": "."}] },
        { type: 'image', url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHNlYXJjaHw0fHxjb252ZXJzYXRpb258ZW58MHx8fHwxNjk2MDAwMDAwfDA&ixlib=rb-4.0.3&q=80&w=1080", alt: "" },
        { type: 'message', content: [{"text": "🌍 ", "italic": true}, {"text": "Quand les mondes se rencontrent...", "italic": true}] },
        { type: 'narrative', content: [{"text": "Laisse-moi te raconter l'histoire de ", "bold": true}, {"text": "Nadia", "bold": true}, {"text": "..."}, {"text": "\n\n"}, {"text": "Une histoire où l'amour naissant rencontre une ", "italic": true}, {"text": "vérité inattendue", "italic": true}, {"text": "."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "decouvrir_cette_rencontre", "label": "Découvrir cette rencontre →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "La découverte qui change tout" },

        { type: 'narrative', content: [{"text": "Deux mois de ", "bold": true}, {"text": "connexion pure", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Nadia et Karim ont construit leur bulle. Messages qui font sourire, conversations qui ", "italic": true}, {"text": "nourrissent l'âme", "italic": true}, {"text": ", silences ", "italic": true}, {"text": "confortables", "italic": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Cette alchimie rare où deux esprits se ", "bold": true}, {"text": "reconnaissent", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "Ce soir-là, dans ce café aux lumières tamisées, ils parlent de ", "bold": true}, {"text": "tout", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Rêves, peurs, cette enfance qui nous façonne, ces blessures qui nous sculptent."}, {"text": "\n\n"}, {"text": "L'intimité grandit dans chaque mot échangé."}] },
        { type: 'narrative', content: [{"text": "Puis, entre deux rires, Karim partage quelque chose."}, {"text": "\n\n"}, {"text": "Pas comme un ", "italic": true}, {"text": "aveu", "italic": true}, {"text": ". Plutôt comme une ", "italic": true}, {"text": "évidence", "italic": true}, {"text": " qu'il pensait qu'elle connaissait déjà."}, {"text": "\n\n"}, {"text": "Un détail sur son parcours, sa famille, ses valeurs, son mode de vie..."}, {"text": "\n\n"}, {"text": "Quelque chose qui ", "bold": true}, {"text": "change la donne", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "Le sourire de Nadia ne ", "bold": true}, {"text": "vacille pas", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Mais à l'intérieur, c'est le ", "italic": true}, {"text": "vertige", "italic": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Cette information redessine ", "bold": true}, {"text": "tout", "bold": true}, {"text": ". L'image qu'elle s'était construite. Les projections qu'elle avait commencé à tisser. Les possibles qu'elle avait osé imaginer."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "vivre_sa_tempete_interieure", "label": "Vivre sa tempête intérieure →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "La tempête silencieuse" },

        { type: 'message', content: [{"text": "Dans le calme apparent du café, une ", "bold": true}, {"text": "tempête", "bold": true}, {"text": " se lève en elle..."}] },
        { type: 'narrative', content: [{"text": "🌪️ ", "bold": true}, {"text": "Les voix s'entrechoquent :"}, {"text": "\n\n"}, {"text": "💭 ", "italic": true}, {"text": "\"Mais il est parfait sur tout le reste...\"", "italic": true}, {"text": "\n\n"}, {"text": "⚡ ", "italic": true}, {"text": "\"Comment n'ai-je pas vu ça venir ?\"", "italic": true}, {"text": "\n\n"}, {"text": "🛡️ ", "italic": true}, {"text": "\"Est-ce vraiment si important ?\"", "italic": true}, {"text": "\n\n"}, {"text": "🌙 ", "italic": true}, {"text": "\"Qu'est-ce que ma famille dirait ?\"", "italic": true}, {"text": "\n\n"}, {"text": "✨ ", "italic": true}, {"text": "\"L'amour peut-il transcender ça ?\"", "italic": true}] },
        { type: 'narrative', content: [{"text": "Karim continue de parler, ", "italic": true}, {"text": "inconscient", "italic": true}, {"text": " du séisme qu'il vient de déclencher."}, {"text": "\n\n"}, {"text": "Cette ", "bold": true}, {"text": "différence", "bold": true}, {"text": " - quelle qu'elle soit - flotte maintenant entre eux."}, {"text": "\n\n"}, {"text": "Invisible pour lui. ", "bold": true}, {"text": "Monumentale", "bold": true}, {"text": " pour elle."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "explorer_ma_propre_reaction", "label": "Explorer ma propre réaction →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Ta propre vérité" },

        { type: 'narrative', content: [{"text": "Avant de découvrir comment Nadia navigue ce moment..."}, {"text": "\n\n"}, {"text": "Plongeons dans ", "bold": true}, {"text": "ta", "bold": true}, {"text": " vérité."}] },
        { type: 'narrative', content: [{"text": "🌊 ", "bold": true}, {"text": "Imagine-toi à la place de Nadia..."}, {"text": "\n\n"}, {"text": "Cette révélation pourrait être n'importe quoi : différence de ", "italic": true}, {"text": "classe sociale", "italic": true}, {"text": ", de ", "italic": true}, {"text": "niveau d'éducation", "italic": true}, {"text": ", de ", "italic": true}, {"text": "pratique religieuse", "italic": true}, {"text": ", de ", "italic": true}, {"text": "vision du couple", "italic": true}, {"text": ", de ", "italic": true}, {"text": "rapport à l'argent", "italic": true}, {"text": "..."}, {"text": "\n\n"}, {"text": "Quelle différence te ", "bold": true}, {"text": "défierait", "bold": true}, {"text": " le plus ?"}] },
        { type: 'text_input', variable: 'difference_qui_defie_le_plus', placeholder: "La différence qui me challengerait vraiment serait...", isLong: true },
        { type: 'message', content: [{"text": "Cette réponse révèle tes ", "bold": true}, {"text": "lignes invisibles", "bold": true}, {"text": "..."}] },
        { type: 'narrative', content: [{"text": "Maintenant, creusons plus ", "bold": true}, {"text": "profond", "bold": true}, {"text": "..."}, {"text": "\n\n"}, {"text": "Face à cette différence que tu viens de nommer, quelle serait ta ", "bold": true}, {"text": "première réaction viscérale", "bold": true}, {"text": " ?"}] },
        { type: 'choice', variable: 'reaction_viscerale_a_la_difference', options: [{"id": "le_deni_protecteur_ce_n_est", "label": "Le déni protecteur - \"Ce n'est pas si grave, on peut dépasser ça\""}, {"id": "la_fuite_immediate_c_est_un", "label": "La fuite immédiate - \"C'est un deal-breaker, je dois partir\""}, {"id": "la_negociation_interieure_v", "label": "La négociation intérieure - \"Voyons les pour et les contre\""}, {"id": "la_curiosite_courageuse_exp", "label": "La curiosité courageuse - \"Explorons ce que ça signifie vraiment\""}, {"id": "le_questionnement_profond_q", "label": "Le questionnement profond - \"Qu'est-ce que ça dit de mes propres limites ?\""}, {"id": "la_paralysie_emotionnelle_j", "label": "La paralysie émotionnelle - \"Je ne sais plus quoi penser\""}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Naviguer l'inattendu" },

        { type: 'message', content: [{"text": "Cette réaction montre comment tu te protèges", "bold": true}, {"text": "..."}] },
        { type: 'narrative', content: [{"text": "Revenons à Nadia..."}, {"text": "\n\n"}, {"text": "La soirée touche à sa fin. Il faut ", "bold": true}, {"text": "réagir", "bold": true}, {"text": ", ", "bold": true}, {"text": "dire quelque chose", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "Elle choisit la ", "italic": true}, {"text": "douceur", "italic": true}, {"text": " :"}, {"text": "\n\n"}, {"text": "\"C'est... intéressant de découvrir cette facette de toi. J'ai besoin d'un peu de temps pour ", "italic": true}, {"text": "digérer", "italic": true}, {"text": " tout ça.\""}, {"text": "\n\n"}, {"text": "Karim fronce légèrement les sourcils. ", "italic": true}, {"text": "\"Tout ça ?\"", "italic": true}, {"text": "\n\n"}, {"text": "Il commence à ", "bold": true}, {"text": "comprendre", "bold": true}, {"text": " que quelque chose a ", "bold": true}, {"text": "basculé", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "💭 ", "bold": true}, {"text": "Dans les jours qui suivent..."}, {"text": "\n\n"}, {"text": "Comment penses-tu que Nadia devrait ", "bold": true}, {"text": "naviguer", "bold": true}, {"text": " cette découverte ?"}] },
        { type: 'choice', variable: 'strategie_de_navigation_des_differences', options: [{"id": "dialogue_direct_parlons_ouv", "label": "Dialogue direct - \"Parlons ouvertement de cette différence\""}, {"id": "exploration_interieure_je_d", "label": "Exploration intérieure - \"Je dois d'abord comprendre mes propres limites\""}, {"id": "test_progressif_voyons_comm", "label": "Test progressif - \"Voyons comment ça se manifeste au quotidien\""}, {"id": "consultation_externe_j_ai_b", "label": "Consultation externe - \"J'ai besoin de perspectives extérieures\""}, {"id": "distance_temporaire_prenons", "label": "Distance temporaire - \"Prenons du recul pour voir clair\""}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Le dialogue des mondes" },

        { type: 'narrative', content: [{"text": "Une semaine plus tard, ils se retrouvent."}, {"text": "\n\n"}, {"text": "Cette fois, la ", "bold": true}, {"text": "légèreté", "bold": true}, {"text": " a laissé place à quelque chose de plus ", "bold": true}, {"text": "grave", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "\"Nadia, j'ai senti que quelque chose avait ", "italic": true}, {"text": "changé", "italic": true}, {"text": " l'autre soir.\""}, {"text": "\n\n"}, {"text": "Elle respire profondément. Le moment de ", "bold": true}, {"text": "vérité", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "\"Karim, ce que tu m'as partagé... ça m'a fait réaliser qu'on vient de ", "italic": true}, {"text": "mondes différents", "italic": true}, {"text": " sur certains aspects. Et j'essaie de comprendre si...\""}, {"text": "\n\n"}, {"text": "\"Si c'est ", "italic": true}, {"text": "surmontable", "italic": true}, {"text": " ?\" Il termine sa phrase."}] },
        { type: 'narrative', content: [{"text": "Le silence qui suit porte le ", "bold": true}, {"text": "poids", "bold": true}, {"text": " de tous les possibles."}, {"text": "\n\n"}, {"text": "\"Tu sais,\" reprend-il, \"ces différences... elles peuvent être des ", "italic": true}, {"text": "ponts", "italic": true}, {"text": " ou des ", "italic": true}, {"text": "murs", "italic": true}, {"text": ". Ça dépend de ce qu'on en fait.\""}, {"text": "\n\n"}, {"text": "Nadia le regarde vraiment. Cet homme qui, malgré la différence, reste ", "bold": true}, {"text": "lui", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "🌉 ", "bold": true}, {"text": "Si tu étais l'amie de cœur de Nadia..."}, {"text": "\n\n"}, {"text": "Quel ", "bold": true}, {"text": "conseil profond", "bold": true}, {"text": " lui offrirais-tu dans ce moment crucial ?"}] },
        { type: 'text_input', variable: 'conseil_sur_les_differences', placeholder: "Mon conseil du cœur serait...", isLong: true },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Les vérités cachées" },

        { type: 'message', content: [{"text": "Ce conseil révèle ta ", "bold": true}, {"text": "philosophie profonde", "bold": true}, {"text": " sur l'amour et les différences..."}] },
        { type: 'message', content: [{"text": "Explorons ce qui se cache ", "bold": true}, {"text": "vraiment", "bold": true}, {"text": " derrière notre rapport aux différences..."}] },
        { type: 'narrative', content: [{"text": "🔍 ", "bold": true}, {"text": "Quand une différence nous dérange, c'est souvent parce qu'elle touche :"}, {"text": "\n\n"}, {"text": "• Une ", "italic": true}, {"text": "peur profonde", "italic": true}, {"text": " (du jugement, du rejet, de l'échec)"}, {"text": "\n\n"}, {"text": "• Une ", "italic": true}, {"text": "loyauté invisible", "italic": true}, {"text": " (à notre famille, notre communauté, notre histoire)"}, {"text": "\n\n"}, {"text": "• Une ", "italic": true}, {"text": "croyance non questionnée", "italic": true}, {"text": " (sur ce qui est \"normal\" ou \"acceptable\")"}, {"text": "\n\n"}, {"text": "• Un ", "italic": true}, {"text": "rêve secret", "italic": true}, {"text": " (de qui on voulait être avec)"}, {"text": "\n\n"}, {"text": "• Une ", "italic": true}, {"text": "blessure ancienne", "italic": true}, {"text": " (qui se réveille face à l'inconnu)"}] },
        { type: 'narrative', content: [{"text": "En regardant l'histoire de Nadia et Karim..."}, {"text": "\n\n"}, {"text": "Qu'est-ce que cette différence ", "bold": true}, {"text": "révèle vraiment", "bold": true}, {"text": " selon toi ?"}, {"text": "\n\n"}, {"text": "Sur eux, sur nous, sur la nature de l'amour ?"}] },
        { type: 'text_input', variable: 'ce_que_les_differences_revelent', placeholder: "Ce que cette situation révèle profondément...", isLong: true },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Le miroir des possibles" },

        { type: 'image', url: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHNlYXJjaHwxMHx8bWlycm9yfGVufDB8fHx8MTY5NjAwMDAwMHww&ixlib=rb-4.0.3&q=80&w=1080", alt: "" },
        { type: 'message', content: [{"text": "Tes réponses tissent une carte", "bold": true}, {"text": "..."}] },
        { type: 'narrative', content: [{"text": "✨ Dans cette exploration des différences, tu révèles une ", "bold": true}, {"text": "sagesse particulière", "bold": true}, {"text": " :"}, {"text": "\n\n"}, {"text": "Tu comprends que les différences ne sont ni ", "italic": true}, {"text": "bonnes", "italic": true}, {"text": " ni ", "italic": true}, {"text": "mauvaises", "italic": true}, {"text": " en soi."}, {"text": "\n\n"}, {"text": "Elles sont des ", "bold": true}, {"text": "révélateurs", "bold": true}, {"text": " - de nos limites, nos peurs, mais aussi de notre capacité à ", "italic": true}, {"text": "grandir", "italic": true}, {"text": " et à ", "italic": true}, {"text": "aimer au-delà", "italic": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "Ce qui émerge de ton exploration :", "bold": true}, {"text": "\n\n"}, {"text": "• Tu portes une ", "italic": true}, {"text": "conscience", "italic": true}, {"text": " de tes propres frontières"}, {"text": "\n\n"}, {"text": "• Tu reconnais la ", "italic": true}, {"text": "complexité", "italic": true}, {"text": " des héritages que nous portons"}, {"text": "\n\n"}, {"text": "• Tu navigues entre ", "italic": true}, {"text": "authenticité", "italic": true}, {"text": " et ", "italic": true}, {"text": "adaptabilité", "italic": true}, {"text": "\n\n"}, {"text": "• Tu cherches l'équilibre entre ", "italic": true}, {"text": "honorer tes valeurs", "italic": true}, {"text": " et ", "italic": true}, {"text": "rester ouverte", "italic": true}] },
        { type: 'narrative', content: [{"text": "Le défi n'est pas d'", "italic": true}, {"text": "effacer", "italic": true}, {"text": " les différences ou de les ", "italic": true}, {"text": "ignorer", "italic": true}, {"text": "."}, {"text": "\n\n"}, {"text": "C'est d'apprendre à ", "bold": true}, {"text": "danser avec", "bold": true}, {"text": " - parfois en les transcendant, parfois en les honorant, toujours en les ", "bold": true}, {"text": "comprenant", "bold": true}, {"text": "."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "comprendre_les_dynamiques_prof", "label": "Comprendre les dynamiques profondes →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Comprendre les ponts invisibles" },

        { type: 'message', content: [{"text": "Laisse-moi t'éclairer sur les ", "bold": true}, {"text": "dynamiques invisibles", "bold": true}, {"text": " qui se jouent..."}] },
        { type: 'message', content: [{"text": "🌍 Les 4 Types de Différences Relationnelles", "bold": true}] },
        { type: 'narrative', content: [{"text": "🌱 1.", "bold": true}, {"text": " "}, {"text": "Les Différences Enrichissantes", "bold": true}, {"text": "\n\n"}, {"text": "Celles qui ", "italic": true}, {"text": "élargissent", "italic": true}, {"text": " notre monde sans menacer notre ", "italic": true}, {"text": "essence", "italic": true}, {"text": "."}, {"text": "\n\n"}, {"text": "• Il cuisine, tu ne sais pas faire cuire un œuf"}, {"text": "\n\n"}, {"text": "• Tu es spontanée, il est planificateur"}, {"text": "\n\n"}, {"text": "• Différentes passions qui s'additionnent"}, {"text": "\n\n"}, {"text": "Impact : ", "italic": true}, {"text": "Complémentarité naturelle", "italic": true}] },
        { type: 'narrative', content: [{"text": "🌊 2.", "bold": true}, {"text": " "}, {"text": "Les Différences Négociables", "bold": true}, {"text": "\n\n"}, {"text": "Celles qui demandent des ", "italic": true}, {"text": "ajustements", "italic": true}, {"text": " mais restent ", "italic": true}, {"text": "surmontables", "italic": true}, {"text": "."}, {"text": "\n\n"}, {"text": "• Niveaux de pratique religieuse différents"}, {"text": "\n\n"}, {"text": "• Visions du partage financier"}, {"text": "\n\n"}, {"text": "• Rapport aux familles d'origine"}, {"text": "\n\n"}, {"text": "Impact : ", "italic": true}, {"text": "Croissance mutuelle possible", "italic": true}] },
        { type: 'narrative', content: [{"text": "⚡ 3. Les Différences Critiques", "bold": true}, {"text": "\n\n"}, {"text": "Celles qui touchent nos ", "italic": true}, {"text": "valeurs fondamentales", "italic": true}, {"text": " ou notre ", "italic": true}, {"text": "vision de vie", "italic": true}, {"text": "."}, {"text": "\n\n"}, {"text": "• Désir d'enfants (oui vs non)"}, {"text": "\n\n"}, {"text": "• Valeurs éthiques opposées"}, {"text": "\n\n"}, {"text": "• Modes de vie incompatibles"}, {"text": "\n\n"}, {"text": "Impact : ", "italic": true}, {"text": "Remise en question profonde", "italic": true}] },
        { type: 'narrative', content: [{"text": "🔥 4. Les Différences Illusoires", "bold": true}, {"text": "\n\n"}, {"text": "Celles qui semblent ", "italic": true}, {"text": "insurmontables", "italic": true}, {"text": " mais cachent des ", "italic": true}, {"text": "peurs", "italic": true}, {"text": " ou des ", "italic": true}, {"text": "préjugés", "italic": true}, {"text": "."}, {"text": "\n\n"}, {"text": "• \"Il n'a pas fait de grandes études\""}, {"text": "\n\n"}, {"text": "• \"Elle vient d'un autre milieu\""}, {"text": "\n\n"}, {"text": "• \"Nos familles sont trop différentes\""}, {"text": "\n\n"}, {"text": "Impact : ", "italic": true}, {"text": "Opportunité de transcendance", "italic": true}] },
        { type: 'narrative', content: [{"text": "💡 ", "bold": true}, {"text": "La clé ?"}, {"text": "\n\n"}, {"text": "Distinguer ce qui est ", "bold": true}, {"text": "négociable", "bold": true}, {"text": " de ce qui est ", "bold": true}, {"text": "non-négociable", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Et surtout, questionner ", "italic": true}, {"text": "pourquoi", "italic": true}, {"text": " certaines choses nous semblent non-négociables."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "recevoir_mes_outils_pratiques", "label": "Recevoir mes outils pratiques →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Trois clés pour construire des ponts" },

        { type: 'narrative', content: [{"text": "Pour naviguer les différences avec ", "bold": true}, {"text": "sagesse", "bold": true}, {"text": " et ", "bold": true}, {"text": "cœur", "bold": true}, {"text": "..."}] },
        { type: 'narrative', content: [{"text": "🔑 1. La Cartographie des Mondes", "bold": true}, {"text": "\n\n"}, {"text": "Avant de juger une différence, ", "bold": true}, {"text": "explore-la", "bold": true}, {"text": " :"}, {"text": "\n\n"}, {"text": "• ", "italic": true}, {"text": "\"Aide-moi à comprendre...\"", "italic": true}, {"text": " plutôt que ", "italic": true}, {"text": "\"Je ne comprends pas pourquoi...\"", "italic": true}, {"text": "\n\n"}, {"text": "• ", "italic": true}, {"text": "\"Qu'est-ce que ça représente pour toi ?\"", "italic": true}, {"text": "\n\n"}, {"text": "• ", "italic": true}, {"text": "\"Comment en es-tu arrivé là ?\"", "italic": true}, {"text": "\n\n"}, {"text": "La ", "bold": true}, {"text": "curiosité", "bold": true}, {"text": " transforme les murs en fenêtres."}] },
        { type: 'narrative', content: [{"text": "🌉 2. Le Test des Valeurs Profondes", "bold": true}, {"text": "\n\n"}, {"text": "Face à une différence troublante, demande-toi :"}, {"text": "\n\n"}, {"text": "✓ Est-ce que ça touche mes ", "bold": true}, {"text": "valeurs fondamentales", "bold": true}, {"text": " ?"}, {"text": "\n\n"}, {"text": "  → Si oui : Honore cette limite"}, {"text": "\n\n"}, {"text": "✓ Est-ce que ça touche mes ", "bold": true}, {"text": "peurs", "bold": true}, {"text": " ?"}, {"text": "\n\n"}, {"text": "  → Si oui : Explore avant de fuir"}, {"text": "\n\n"}, {"text": "✓ Est-ce que ça touche mes ", "bold": true}, {"text": "préjugés", "bold": true}, {"text": " ?"}, {"text": "\n\n"}, {"text": "  → Si oui : Questionne et grandis"}, {"text": "\n\n"}, {"text": "La ", "bold": true}, {"text": "clarté intérieure", "bold": true}, {"text": " guide les bonnes décisions."}] },
        { type: 'narrative', content: [{"text": "🤝 3. La Co-création du Troisième Espace", "bold": true}, {"text": "\n\n"}, {"text": "Au lieu de ", "italic": true}, {"text": "\"ton monde ou le mien\"", "italic": true}, {"text": ", créez ", "bold": true}, {"text": "\"notre monde\"", "bold": true}, {"text": " :"}, {"text": "\n\n"}, {"text": "• Identifiez ce qui est ", "italic": true}, {"text": "sacré", "italic": true}, {"text": " pour chacun"}, {"text": "\n\n"}, {"text": "• Trouvez les ", "italic": true}, {"text": "valeurs communes", "italic": true}, {"text": " sous les différences"}, {"text": "\n\n"}, {"text": "• Créez des ", "italic": true}, {"text": "rituels nouveaux", "italic": true}, {"text": " qui honorent les deux"}, {"text": "\n\n"}, {"text": "• Célébrez la ", "italic": true}, {"text": "richesse", "italic": true}, {"text": " de votre métissage"}, {"text": "\n\n"}, {"text": "L'amour véritable ne demande pas l'", "italic": true}, {"text": "uniformité", "italic": true}, {"text": " mais l'", "bold": true}, {"text": "harmonie", "bold": true}, {"text": "."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "explorer_la_dimension_spiritue", "label": "Explorer la dimension spirituelle →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "La dimension sacrée des différences" },

        { type: 'message', content: [{"text": "Il y a une ", "bold": true}, {"text": "sagesse divine", "bold": true}, {"text": " dans les différences..."}] },
        { type: 'image', url: "https://images.unsplash.com/photo-1593811955184-c803f15a1556?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHNlYXJjaHw0fHxkaWZmZXJlbmNlc3xlbnwwfDB8fHwxNzU0ODQwNTcyfDA&ixlib=rb-4.1.0&q=80&w=1080", alt: "" },
        { type: 'narrative', content: [{"text": "🤲 ", "italic": true}, {"text": "\"Et parmi Ses signes Il a créé de vous, pour vous, des épouses pour que vous viviez en tranquillité avec elles et Il a mis entre vous de l'affection et de la bonté.\"", "italic": true}, {"text": "\n\n"}, {"text": "Remarque comme le verset ne dit pas ", "italic": true}, {"text": "\"des épouses identiques\"", "italic": true}, {"text": " ou ", "italic": true}, {"text": "\"des épouses similaires\"", "italic": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "Les différences peuvent être des ", "bold": true}, {"text": "tests", "bold": true}, {"text": " :"}, {"text": "\n\n"}, {"text": "• De notre ", "italic": true}, {"text": "capacité à aimer au-delà", "italic": true}, {"text": "\n\n"}, {"text": "• De notre ", "italic": true}, {"text": "attachement aux apparences", "italic": true}, {"text": "\n\n"}, {"text": "• De notre ", "italic": true}, {"text": "flexibilité spirituelle", "italic": true}, {"text": "\n\n"}, {"text": "• De notre ", "italic": true}, {"text": "confiance en la guidance divine", "italic": true}] },
        { type: 'narrative', content: [{"text": "Mais attention à l'", "bold": true}, {"text": "équilibre", "bold": true}, {"text": " :"}, {"text": "\n\n"}, {"text": "Ce n'est pas parce qu'une différence est ", "italic": true}, {"text": "difficile", "italic": true}, {"text": " qu'elle est ", "italic": true}, {"text": "destinée", "italic": true}, {"text": " à être surmontée."}, {"text": "\n\n"}, {"text": "Parfois, la ", "bold": true}, {"text": "sagesse", "bold": true}, {"text": " est de reconnaître que certains chemins ne sont pas faits pour se croiser ", "italic": true}, {"text": "durablement", "italic": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Et c'est aussi une forme de ", "bold": true}, {"text": "guidance divine", "bold": true}, {"text": "."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "integrer_l_essence", "label": "Intégrer l'essence →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "L'essence à retenir" },

        { type: 'message', content: "De ce voyage entre les mondes, retiens ceci..." },
        { type: 'narrative', content: [{"text": "🌸 ", "bold": true}, {"text": "Les différences ne sont pas des défauts à corriger"}, {"text": "\n\n"}, {"text": "Elles sont des ", "bold": true}, {"text": "invitations", "bold": true}, {"text": " - à ", "italic": true}, {"text": "comprendre", "italic": true}, {"text": ", à ", "italic": true}, {"text": "grandir", "italic": true}, {"text": ", à ", "italic": true}, {"text": "choisir consciemment", "italic": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Parfois l'invitation est d'", "bold": true}, {"text": "élargir", "bold": true}, {"text": " ton monde. Parfois elle est de ", "bold": true}, {"text": "clarifier", "bold": true}, {"text": " tes limites."}, {"text": "\n\n"}, {"text": "🌸 ", "bold": true}, {"text": "Ton monde n'est ni supérieur ni inférieur"}, {"text": "\n\n"}, {"text": "Il est ", "bold": true}, {"text": "tien", "bold": true}, {"text": ". Façonné par ton histoire, tes expériences, tes rêves."}, {"text": "\n\n"}, {"text": "L'honorer tout en restant ", "italic": true}, {"text": "ouverte", "italic": true}, {"text": " à d'autres mondes, c'est la ", "bold": true}, {"text": "maturité relationnelle", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "🌸 ", "bold": true}, {"text": "L'amour ne demande pas l'effacement des différences"}, {"text": "\n\n"}, {"text": "Il demande la ", "bold": true}, {"text": "création consciente", "bold": true}, {"text": " d'un espace où deux mondes peuvent ", "italic": true}, {"text": "coexister", "italic": true}, {"text": ", ", "italic": true}, {"text": "dialoguer", "italic": true}, {"text": ", ", "italic": true}, {"text": "s'enrichir", "italic": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Ou la ", "bold": true}, {"text": "sagesse", "bold": true}, {"text": " de reconnaître quand c'est impossible."}] },
        { type: 'narrative', content: [{"text": "Le plus important :", "bold": true}, {"text": "\n\n"}, {"text": "Une différence n'est ", "bold": true}, {"text": "jamais", "bold": true}, {"text": " juste une différence."}, {"text": "\n\n"}, {"text": "C'est un ", "italic": true}, {"text": "miroir", "italic": true}, {"text": " qui te montre tes propres ", "bold": true}, {"text": "frontières", "bold": true}, {"text": ", tes ", "bold": true}, {"text": "peurs", "bold": true}, {"text": ", tes ", "bold": true}, {"text": "possibilités", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "La question n'est pas ", "italic": true}, {"text": "\"Puis-je vivre avec cette différence ?\"", "italic": true}, {"text": "\n\n"}, {"text": "Mais ", "bold": true}, {"text": "\"Qu'est-ce que cette différence m'apprend sur moi ?\"", "bold": true}] },
        { type: 'choice', variable: 'choix', options: [{"id": "recevoir_la_benediction_finale", "label": "Recevoir la bénédiction finale →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "La bénédiction des ponts" },

        { type: 'message', content: "Avant de nous quitter..." },
        { type: 'narrative', content: [{"text": "Que tu sois celle qui ", "italic": true}, {"text": "construit des ponts", "italic": true}, {"text": " ou celle qui ", "italic": true}, {"text": "honore ses rives", "italic": true}, {"text": "..."}, {"text": "\n\n"}, {"text": "Que tu choisisses de ", "italic": true}, {"text": "transcender", "italic": true}, {"text": " les différences ou de ", "italic": true}, {"text": "les respecter à distance", "italic": true}, {"text": "..."}, {"text": "\n\n"}, {"text": "Sache que ta ", "bold": true}, {"text": "conscience", "bold": true}, {"text": " est ta plus grande ", "bold": true}, {"text": "force", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "Puisses-tu trouver quelqu'un dont les différences ", "italic": true}, {"text": "t'enrichissent", "italic": true}, {"text": " sans te ", "italic": true}, {"text": "diminuer", "italic": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Quelqu'un avec qui créer un ", "bold": true}, {"text": "troisième espace", "bold": true}, {"text": " - ni le tien, ni le sien, mais ", "bold": true}, {"text": "le vôtre", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Un espace où vos ", "italic": true}, {"text": "mondes", "italic": true}, {"text": " dansent sans se ", "italic": true}, {"text": "perdre", "italic": true}, {"text": "."}] },
        { type: 'message', content: "🌉✨" },
        { type: 'choice', variable: 'choix', options: [{"id": "celebrer_ce_voyage", "label": "Célébrer ce voyage →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Gratitude et célébration" },

        { type: 'image', url: "https://images.unsplash.com/photo-1612278675615-7b093b07772d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHNlYXJjaHw0MHx8dHJhdmVsfGVufDB8MHx8fDE3NTQ4NDA4NTV8MA&ixlib=rb-4.1.0&q=80&w=1080", alt: "" },
        { type: 'message', content: [{"text": "Quel voyage", "bold": true}, {"text": " tu viens de faire..."}] },
        { type: 'narrative', content: [{"text": "Explorer les ", "bold": true}, {"text": "différences", "bold": true}, {"text": ", c'est toucher à ce qui nous ", "italic": true}, {"text": "sépare", "italic": true}, {"text": " et nous ", "italic": true}, {"text": "unit", "italic": true}, {"text": " à la fois."}, {"text": "\n\n"}, {"text": "Tu as osé regarder tes propres ", "bold": true}, {"text": "frontières", "bold": true}, {"text": ", questionner tes ", "bold": true}, {"text": "héritages", "bold": true}, {"text": ", imaginer des ", "bold": true}, {"text": "ponts", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "C'est un acte de ", "bold": true}, {"text": "maturité", "bold": true}, {"text": " et d'", "bold": true}, {"text": "espoir", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "Tes réponses enrichissent ta ", "bold": true}, {"text": "cartographie émotionnelle personnelle", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Chaque prise de conscience sur tes ", "italic": true}, {"text": "limites", "italic": true}, {"text": " et tes ", "italic": true}, {"text": "ouvertures", "italic": true}, {"text": " te rapproche de relations plus ", "bold": true}, {"text": "authentiques", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Tu apprends à ", "italic": true}, {"text": "danser", "italic": true}, {"text": " entre ", "bold": true}, {"text": "fidélité à toi-même", "bold": true}, {"text": " et ", "bold": true}, {"text": "ouverture à l'autre", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "Tu découvres que l'amour n'est pas l'", "italic": true}, {"text": "absence", "italic": true}, {"text": " de différences.", "bold": true}, {"text": "\n\n"}, {"text": "C'est la capacité de créer de la ", "bold": true}, {"text": "beauté", "bold": true}, {"text": " avec elles."}, {"text": "\n\n"}, {"text": "Ou la ", "bold": true}, {"text": "sagesse", "bold": true}, {"text": " de reconnaître quand certains mondes sont trop ", "italic": true}, {"text": "éloignés", "italic": true}, {"text": " pour se rejoindre sans se ", "italic": true}, {"text": "perdre", "italic": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "Continue d'explorer avec ", "bold": true}, {"text": "curiosité", "bold": true}, {"text": " et ", "bold": true}, {"text": "bienveillance", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Les ponts que tu apprends à construire aujourd'hui seront les fondations", "bold": true}, {"text": " de ton amour de demain insha'Allah."}] },
        { type: 'message', content: [{"text": "À très vite pour la suite de ton parcours ", "bold": true}, {"text": "Love Transformations™", "bold": true}, {"text": " insha'Allah…✨"}] },
        { type: 'message', content: [{"text": "🌉 ", "bold": true}, {"text": "Fin du Scénario 3 : Les Deux Mondes", "bold": true}, {"text": " 🌉"}] },

        { type: 'completion', title: "Félicitations !", message: "Tu as terminé S3 — Les Deux Mondes. Tes réponses ont été sauvegardées.", icon: '🌍' }
    ]
};

/* ─── Form Registry ─── */
if (typeof window.FORM_REGISTRY === 'undefined') window.FORM_REGISTRY = {};
window.FORM_REGISTRY['s3-deux-mondes'] = S3_DEUX_MONDES;
