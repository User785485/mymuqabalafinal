/* ═══════════════════════════════════════
   S2 — Le Rythme Discord
   Converti depuis Typebot · 105 steps · 8 variables
═══════════════════════════════════════ */

const S2_RYTHME = {
    id: 's2_rythme',
    version: 1,
    title: "S2 — Le Rythme Discord",
    icon: '🎵',
    checkboxId: 's2',
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
        "analysepatterns",
        "conseiltiming",
        "influencestiming",
        "pression",
        "rapporttemps",
        "reactiontempo",
        "strategiedecalage",
        "telephone"
],

    steps: [

        /* ════════════════════════════════════ */
        { type: 'section', title: "Cartographie émotionnelle" },

        { type: 'image', url: "https://images.unsplash.com/photo-1599733442143-127f1f5540f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHNlYXJjaHwxMDF8fGJvb2t8ZW58MHwwfHx8MTc1NDEzMzc2MXww&ixlib=rb-4.1.0&q=80&w=1080", alt: "" },
        { type: 'message', content: "⏰ Un nouveau chapitre s'ouvre..." },
        { type: 'message', content: "Avant de commencer, rappelle moi ces quelques informations : " },
        { type: 'text_input', variable: 'reponse', placeholder: "Quel est ton prénom ?" },
        { type: 'phone_input', variable: 'telephone', placeholder: "06 12 34 56 78", defaultPrefix: '+33' },
        { type: 'email_input', variable: 'email', placeholder: "ton.email@exemple.com" },
        { type: 'message', content: [{"text": "Avant d'explorer cette nouvelle facette des relations, dis-moi..."}, {"text": "\n\n"}, {"text": "Comment vis-tu le temps qui passe ?", "bold": true}] },
        { type: 'choice', variable: 'rapporttemps', options: [{"id": "le_temps_file_trop_vite_j_ai", "label": "Le temps file trop vite\n\"J'ai l'impression que la vie m'échappe\""}, {"id": "chaque_chose_en_son_temps_je", "label": "Chaque chose en son temps\n\"Je fais confiance au timing divin\""}, {"id": "l_impatience_me_consume_j_ai", "label": "L'impatience me consume\n\"J'ai besoin que les choses avancent\""}, {"id": "la_lenteur_me_rassure_j_aime", "label": "La lenteur me rassure\n\"J'aime prendre le temps de construire\""}, {"id": "je_navigue_entre_les_deux_par", "label": "Je navigue entre les deux\n\"Parfois pressée, parfois zen\""}] },
        { type: 'message', content: [{"text": "Le temps est un révélateur puissant", "bold": true}, {"text": " de nos peurs et nos désirs."}] },
        { type: 'message', content: [{"text": "💭 Et en ce moment..."}, {"text": "\n\n"}, {"text": "Quelle pression ressens-tu le plus ?", "bold": true}] },
        { type: 'choice', variable: 'pression', options: [{"id": "l_horloge_biologique_qui_murmu", "label": "L'horloge biologique qui murmure"}, {"id": "les_questions_familiales_qui_s", "label": "Les questions familiales qui se multiplient"}, {"id": "ma_propre_impatience_de_constr", "label": "Ma propre impatience de construire"}, {"id": "la_peur_de_precipiter_les_chos", "label": "La peur de précipiter les choses"}, {"id": "un_melange_de_tout_ca", "label": "Un mélange de tout ça"}, {"id": "je_ne_ressens_pas_de_pression", "label": "Je ne ressens pas de pression particulière"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "La dissonance des cœurs" },

        { type: 'narrative', content: [{"text": "Le temps... Cette dimension ", "bold": true}, {"text": "invisible", "bold": true}, {"text": " qui peut rapprocher ou éloigner deux âmes."}, {"text": "\n\n"}, {"text": "Aujourd'hui, explorons ensemble ce qui arrive quand deux cœurs ne battent pas au ", "italic": true}, {"text": "même rythme", "italic": true}, {"text": "..."}] },
        { type: 'image', url: "https://images.unsplash.com/photo-1501139083538-0139583c060f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHNlYXJjaHw4fHx0aW1lfGVufDB8fHx8MTY5NjAwMDAwMHww&ixlib=rb-4.0.3&q=80&w=1080", alt: "" },
        { type: 'message', content: [{"text": "⏳ ", "italic": true}, {"text": "Quand les horloges du cœur se désynchronisent...", "italic": true}] },
        { type: 'narrative', content: [{"text": "Laisse-moi te raconter l'histoire de ", "bold": true}, {"text": "Yasmin", "bold": true}, {"text": "..."}, {"text": "\n\n"}, {"text": "Une histoire qui pourrait être la tienne, la mienne, celle de tant d'autres qui cherchent à ", "italic": true}, {"text": "harmoniser leur mélodie", "italic": true}, {"text": " avec celle d'un autre."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "je_suis_prete_a_plonger_dans_c", "label": "Je suis prête à plonger dans cette exploration"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "La révélation du décalage" },

        { type: 'narrative', content: [{"text": "Trois mois.", "bold": true}, {"text": "\n\n"}, {"text": "Trois mois que Yasmin et Ilyas tissent cette connexion ", "bold": true}, {"text": "délicate", "bold": true}, {"text": ". Messages quotidiens, appels qui s'étirent dans la nuit, rencontres qui laissent ce goût de ", "italic": true}, {"text": "\"pas assez\"", "italic": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Trois mois où quelque chose de ", "bold": true}, {"text": "doux et prometteur", "bold": true}, {"text": " grandit entre eux."}] },
        { type: 'narrative', content: [{"text": "Ce soir-là, ils marchent le long du fleuve. Les lumières de la ville dansent sur l'eau, créant ce cadre ", "italic": true}, {"text": "parfait", "italic": true}, {"text": " pour les conversations qui comptent."}, {"text": "\n\n"}, {"text": "Ilyas s'arrête. Ce regard qu'elle commence à reconnaître. Celui qui précède les ", "bold": true}, {"text": "mots importants", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "\"Yasmin...\"", "italic": true}, {"text": "\n\n"}, {"text": "Sa voix porte cette ", "bold": true}, {"text": "certitude tranquille", "bold": true}, {"text": " qui la déstabilise toujours un peu."}, {"text": "\n\n"}, {"text": "\"Je sais ce que je ressens. Je sais ce que je veux. J'aimerais qu'on officialise, qu'on avance ", "italic": true}, {"text": "vraiment", "italic": true}, {"text": ". Rencontrer nos familles, poser les bases de quelque chose de ", "italic": true}, {"text": "concret", "italic": true}, {"text": ".\"", "italic": true}] },
        { type: 'narrative', content: [{"text": "Le sourire de Yasmin ", "bold": true}, {"text": "vacille", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Son cœur fait cette chose ", "bold": true}, {"text": "étrange", "bold": true}, {"text": " - bondir de joie et se serrer d'anxiété dans le ", "bold": true}, {"text": "même battement", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Trois mois... ", "italic": true}, {"text": "Est-ce assez pour savoir ? Est-ce trop peu pour s'engager ?", "italic": true}, {"text": "\n\n"}, {"text": "Cette question qui n'a pas de réponse universelle mais qui exige ", "bold": true}, {"text": "SA", "bold": true}, {"text": " réponse à elle."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "ressentir_ce_qu_elle_vit", "label": "Ressentir ce qu'elle vit →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Les voix du doute" },

        { type: 'message', content: [{"text": "Dans le silence qui suit sa déclaration, ", "italic": true}, {"text": "mille voix se lèvent en elle", "italic": true}, {"text": "..."}] },
        { type: 'narrative', content: [{"text": "💭 ", "bold": true}, {"text": "\"Il va trop vite... ou c'est moi qui vais trop lentement ?\"", "italic": true}, {"text": "\n\n"}, {"text": "🌙 ", "bold": true}, {"text": "\"Ma mère a connu mon père 6 mois avant le mariage... et ils sont ensemble depuis 30 ans.\"", "italic": true}, {"text": "\n\n"}, {"text": "⚡ ", "bold": true}, {"text": "\"Mais Zahra a attendu 2 ans... et il est parti quand même.\"", "italic": true}, {"text": "\n\n"}, {"text": "🤲 ", "bold": true}, {"text": "\"Istikhara ? Mais comment distinguer la guidance divine de ma propre peur ?\"", "italic": true}] },
        { type: 'narrative', content: [{"text": "Elle le regarde. Cet homme qui semble si ", "bold": true}, {"text": "sûr", "bold": true}, {"text": " de lui, de ", "bold": true}, {"text": "eux", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Cette assurance qu'elle envie et qui l'effraie à ", "italic": true}, {"text": "parts égales", "italic": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Comment fait-il pour ", "italic": true}, {"text": "savoir", "italic": true}, {"text": " si vite ? Ou peut-être... comment fait-elle pour ", "italic": true}, {"text": "douter", "italic": true}, {"text": " encore ?", "italic": true}] },
        { type: 'choice', variable: 'choix', options: [{"id": "explorer_ma_propre_reaction", "label": "Explorer ma propre réaction →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "L'exploration intérieure" },

        { type: 'narrative', content: [{"text": "Avant de découvrir ce que Yasmin va répondre..."}, {"text": "\n\n"}, {"text": "Prends un instant pour sentir ce qui se joue en ", "bold": true}, {"text": "toi", "bold": true}, {"text": " face à cette situation."}] },
        { type: 'narrative', content: [{"text": "💭 ", "bold": true}, {"text": "Si tu étais Yasmin, face à cette déclaration après 3 mois..."}, {"text": "\n\n"}, {"text": "Qu'est-ce qui ", "bold": true}, {"text": "dominerait", "bold": true}, {"text": " en toi ?"}] },
        { type: 'choice', variable: 'reactiontempo', options: [{"id": "la_joie_pure_enfin_moi_au", "label": "La joie pure - \"Enfin ! Moi aussi je sais !\""}, {"id": "la_panique_douce_c_est_trop", "label": "La panique douce - \"C'est trop rapide, j'ai besoin de temps\""}, {"id": "le_questionnement_comment_p", "label": "Le questionnement - \"Comment peut-il être si sûr si vite ?\""}, {"id": "la_mefiance_les_hommes_prom", "label": "La méfiance - \"Les hommes promettent vite et partent vite\""}, {"id": "l_analyse_pratique_verifion", "label": "L'analyse pratique - \"Vérifions la compatibilité concrète d'abord\""}, {"id": "le_conflit_interieur_mon_c", "label": "Le conflit intérieur - \"Mon cœur dit oui mais ma tête dit attends\""}] },
        { type: 'message', content: [{"text": "Cette réaction en dit ", "bold": true}, {"text": "beaucoup", "bold": true}, {"text": " sur ton rapport au temps dans l'amour..."}] },
        { type: 'narrative', content: [{"text": "Creusons plus ", "bold": true}, {"text": "profond", "bold": true}, {"text": "..."}, {"text": "\n\n"}, {"text": "Au-delà de la première réaction, qu'est-ce qui ", "bold": true}, {"text": "influence vraiment", "bold": true}, {"text": " ton rapport au timing dans les relations ?"}] },
        { type: 'text_input', variable: 'influencestiming', placeholder: "Ce qui pèse dans ma balance du temps relationnel...", isLong: true },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Le dilemme révélé" },

        { type: 'narrative', content: [{"text": "Merci pour cette ", "bold": true}, {"text": "transparence", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "C'est dans ces zones d'inconfort qu'on apprend le plus sur soi..."}] },
        { type: 'narrative', content: [{"text": "Revenons à Yasmin..."}, {"text": "\n\n"}, {"text": "Elle prend une ", "bold": true}, {"text": "profonde inspiration", "bold": true}, {"text": ". Les mots se forment lentement, comme si elle les ", "italic": true}, {"text": "sculptait avec précaution", "italic": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "\"Ilyas... Ce que tu dis me touche profondément. Vraiment.\"", "italic": true}, {"text": "\n\n"}, {"text": "\"Mais j'ai besoin de plus de temps. Pas parce que je doute de ", "italic": true}, {"text": "toi", "italic": true}, {"text": "... mais parce que je veux être sûre de ", "italic": true}, {"text": "moi", "italic": true}, {"text": ". De ", "italic": true}, {"text": "nous", "italic": true}, {"text": ". De construire quelque chose de ", "italic": true}, {"text": "solide", "italic": true}, {"text": ".\"", "italic": true}] },
        { type: 'narrative', content: [{"text": "Elle voit quelque chose ", "bold": true}, {"text": "changer", "bold": true}, {"text": " dans son regard."}, {"text": "\n\n"}, {"text": "Pas de la colère. Plutôt... de l'", "italic": true}, {"text": "incompréhension", "italic": true}, {"text": " ? De la ", "italic": true}, {"text": "déception", "italic": true}, {"text": " ?"}, {"text": "\n\n"}, {"text": "\"", "italic": true}, {"text": "Combien de temps ?", "italic": true}, {"text": "\""}, {"text": "\n\n"}, {"text": "Sa question, simple, porte le ", "bold": true}, {"text": "poids", "bold": true}, {"text": " de tous les malentendus possibles."}] },
        { type: 'message', content: [{"text": "🌊 ", "bold": true}, {"text": "Face à cette question, que ressens-tu que Yasmin devrait répondre ?"}] },
        { type: 'choice', variable: 'strategiedecalage', options: [{"id": "donner_un_delai_precis_6_mo", "label": "Donner un délai précis - \"6 mois de plus pour être sûre\""}, {"id": "rester_dans_le_flou_je_ne_s", "label": "Rester dans le flou - \"Je ne sais pas... je le sentirai\""}, {"id": "retourner_la_question_et_to", "label": "Retourner la question - \"Et toi, pourquoi cette urgence ?\""}, {"id": "proposer_un_compromis_avanc", "label": "Proposer un compromis - \"Avançons doucement, sans pression\""}, {"id": "exprimer_sa_peur_j_ai_peur", "label": "Exprimer sa peur - \"J'ai peur qu'on se trompe en allant trop vite\""}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Les conséquences du décalage" },

        { type: 'message', content: [{"text": "Les jours qui suivent cette conversation portent une ", "bold": true}, {"text": "texture différente", "bold": true}, {"text": "..."}] },
        { type: 'narrative', content: [{"text": "Les messages d'Ilyas arrivent toujours, mais quelque chose a ", "bold": true}, {"text": "changé", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Cette spontanéité joyeuse a laissé place à une ", "italic": true}, {"text": "politesse qui fait mal", "italic": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Yasmin le ", "bold": true}, {"text": "sent", "bold": true}, {"text": ". Cette distance qui n'est pas physique mais qui creuse un ", "italic": true}, {"text": "fossé invisible", "italic": true}, {"text": " entre eux."}, {"text": "\n\n"}, {"text": "Elle oscille entre deux tentations :"}, {"text": "\n\n"}, {"text": "💓 ", "italic": true}, {"text": "Accélérer pour le rassurer", "italic": true}, {"text": "\n\n"}, {"text": "🛡️ ", "italic": true}, {"text": "Ralentir encore plus pour protéger son rythme", "italic": true}] },
        { type: 'narrative', content: [{"text": "💫 ", "bold": true}, {"text": "Dans cette danse délicate du timing..."}, {"text": "\n\n"}, {"text": "Si tu étais l'", "bold": true}, {"text": "amie proche", "bold": true}, {"text": " de Yasmin, quel conseil du cœur lui offrirais-tu ?"}] },
        { type: 'text_input', variable: 'conseiltiming', placeholder: "Le conseil que je donnerais à Yasmin...", isLong: true },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Les patterns cachés" },

        { type: 'message', content: [{"text": "Ce conseil révèle ta ", "bold": true}, {"text": "sagesse relationnelle", "bold": true}, {"text": "..."}] },
        { type: 'narrative', content: [{"text": "Maintenant, regardons ce qui se cache ", "bold": true}, {"text": "vraiment", "bold": true}, {"text": " derrière ces différences de rythme..."}, {"text": "\n\n"}, {"text": "Ce n'est ", "bold": true}, {"text": "jamais", "bold": true}, {"text": " juste une question de timing."}] },
        { type: 'narrative', content: [{"text": "🔍 ", "bold": true}, {"text": "Quand quelqu'un veut aller vite, ça peut cacher :"}, {"text": "\n\n"}, {"text": "• Une ", "italic": true}, {"text": "peur de perdre", "italic": true}, {"text": " l'autre"}, {"text": "\n\n"}, {"text": "• Une ", "italic": true}, {"text": "clarté authentique", "italic": true}, {"text": " sur ses sentiments"}, {"text": "\n\n"}, {"text": "• Une ", "italic": true}, {"text": "pression externe", "italic": true}, {"text": " (famille, âge, société)"}, {"text": "\n\n"}, {"text": "• Un ", "italic": true}, {"text": "pattern d'intensité", "italic": true}, {"text": " relationnelle"}, {"text": "\n\n"}, {"text": "🌙 ", "bold": true}, {"text": "Quand quelqu'un veut ralentir, ça peut révéler :"}, {"text": "\n\n"}, {"text": "• Des ", "italic": true}, {"text": "blessures passées", "italic": true}, {"text": " non guéries"}, {"text": "\n\n"}, {"text": "• Une ", "italic": true}, {"text": "sagesse prudente", "italic": true}, {"text": "\n\n"}, {"text": "• Une ", "italic": true}, {"text": "peur de l'engagement", "italic": true}, {"text": "\n\n"}, {"text": "• Un ", "italic": true}, {"text": "besoin profond de sécurité", "italic": true}] },
        { type: 'narrative', content: [{"text": "En regardant Yasmin et Ilyas..."}, {"text": "\n\n"}, {"text": "Qu'est-ce que leurs rythmes différents ", "bold": true}, {"text": "révèlent vraiment", "bold": true}, {"text": " selon toi ?"}] },
        { type: 'text_input', variable: 'analysepatterns', placeholder: "Ce que leurs rythmes révèlent vraiment...", isLong: true },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Le miroir bienveillant" },

        { type: 'image', url: "https://images.unsplash.com/photo-1663104192417-6804188a9a8e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHNlYXJjaHwzODl8fHN5bmNocm98ZW58MHwwfHx8MTc1NDEzNDIwMnww&ixlib=rb-4.1.0&q=80&w=1080", alt: "" },
        { type: 'message', content: [{"text": "Tes réponses dessinent un portrait intéressant", "bold": true}, {"text": "..."}] },
        { type: 'narrative', content: [{"text": "✨ Dans cette danse du timing relationnel, tu portes une ", "bold": true}, {"text": "conscience unique", "bold": true}, {"text": " :"}, {"text": "\n\n"}, {"text": "Tu comprends que le temps n'est pas ", "italic": true}, {"text": "objectif", "italic": true}, {"text": " en amour."}, {"text": "\n\n"}, {"text": "Trois mois peuvent être une ", "bold": true}, {"text": "éternité", "bold": true}, {"text": " pour un cœur et un ", "bold": true}, {"text": "instant", "bold": true}, {"text": " pour un autre."}, {"text": "\n\n"}, {"text": "Cette tension entre l'urgence et la patience n'est pas un défaut - c'est le signe que tu cherches ", "bold": true}, {"text": "ton propre rythme", "bold": true}, {"text": ", celui qui honore à la fois ton cœur et ta sagesse."}] },
        { type: 'narrative', content: [{"text": "Ce qui émerge de de cette situation :", "bold": true}, {"text": "\n\n"}, {"text": "• Tu es consciente des multiples forces", "italic": true}, {"text": " qui influencent le timing"}, {"text": "\n\n"}, {"text": "• Tu sais que derrière chaque rythme se cache une histoire", "italic": true}, {"text": "\n\n"}, {"text": "• Tu cherches l'équilibre entre ", "italic": true}, {"text": "protection et ouverture", "italic": true}, {"text": "\n\n"}, {"text": "• Tu navigues entre les ", "italic": true}, {"text": "attentes externes", "italic": true}, {"text": " et ta ", "italic": true}, {"text": "vérité interne", "italic": true}] },
        { type: 'narrative', content: [{"text": "Le défi n'est pas de trouver le \"bon\" rythme universel, mais de reconnaître et honorer ", "bold": true}, {"text": "ton", "bold": true}, {"text": " rythme tout en restant ", "italic": true}, {"text": "ouverte", "italic": true}, {"text": " à celui de l'autre."}, {"text": "\n\n"}, {"text": "Car l'amour véritable naît dans cette ", "bold": true}, {"text": "négociation délicate", "bold": true}, {"text": " entre deux temporalités qui apprennent à ", "italic": true}, {"text": "danser ensemble", "italic": true}, {"text": "."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "comprendre_les_mecanismes_prof", "label": "Comprendre les mécanismes profonds →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Comprendre les horloges du cœur" },

        { type: 'message', content: [{"text": "Laisse-moi t'éclairer sur ce qui se joue ", "bold": true}, {"text": "vraiment", "bold": true}, {"text": " dans ces décalages de rythme..."}] },
        { type: 'narrative', content: [{"text": "🕰️ ", "bold": true}, {"text": "Les 5 Horloges qui nous gouvernent"}, {"text": "\n\n"}, {"text": "Nous portons tous ", "bold": true}, {"text": "plusieurs temporalités", "bold": true}, {"text": " qui parfois s'harmonisent, parfois se contredisent :"}] },
        { type: 'narrative', content: [{"text": "⏰ 1. L'Horloge Biologique", "bold": true, "italic": true}, {"text": "\n\n"}, {"text": "Celle qui murmure les années qui passent", "italic": true}, {"text": ", l'âge idéal pour fonder une famille."}, {"text": "\n\n"}, {"text": "Elle ne ment pas mais elle ne devrait pas ", "bold": true}, {"text": "dicter seule", "bold": true}, {"text": " nos choix."}, {"text": "\n\n"}, {"text": "Elle dit : ", "italic": true}, {"text": "\"Le temps presse\"", "italic": true}] },
        { type: 'narrative', content: [{"text": "💭 2. L'Horloge Émotionnelle", "bold": true, "italic": true}, {"text": "\n\n"}, {"text": "Celle qui mesure la ", "bold": true}, {"text": "profondeur", "bold": true}, {"text": " de la connexion."}, {"text": "\n\n"}, {"text": "Pour certains, 3 mois suffisent pour ", "italic": true}, {"text": "savoir", "italic": true}, {"text": ". Pour d'autres, il faut des ", "italic": true}, {"text": "saisons entières", "italic": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Elle dit : ", "italic": true}, {"text": "\"Je sens ou je ne sens pas\"", "italic": true}] },
        { type: 'narrative', content: [{"text": "🛡️ 3. L'Horloge des Blessures", "bold": true, "italic": true}, {"text": "\n\n"}, {"text": "Celle qui ralentit ou accélère selon nos ", "bold": true}, {"text": "cicatrices", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Trop vite par ", "italic": true}, {"text": "peur de perdre", "italic": true}, {"text": ", trop lentement par ", "italic": true}, {"text": "peur de souffrir", "italic": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Elle dit : ", "italic": true}, {"text": "\"Attention, souviens-toi\"", "italic": true}] },
        { type: 'narrative', content: [{"text": "👨‍👩‍👧 4. L'Horloge Sociale", "bold": true, "italic": true}, {"text": "\n\n"}, {"text": "Celle des ", "italic": true}, {"text": "questions familiales", "italic": true}, {"text": ", des amies qui se marient, de la ", "italic": true}, {"text": "pression communautaire", "italic": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Elle peut nous ", "bold": true}, {"text": "pousser", "bold": true}, {"text": " ou nous ", "bold": true}, {"text": "freiner", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Elle dit : ", "italic": true}, {"text": "\"Qu'est-ce qu'ils vont dire ?\"", "italic": true}] },
        { type: 'narrative', content: [{"text": "🤲 5. L'Horloge Divine", "bold": true, "italic": true}, {"text": "\n\n"}, {"text": "Celle du ", "italic": true}, {"text": "mektoub", "italic": true}, {"text": ", du timing parfait qu'on ne contrôle pas."}, {"text": "\n\n"}, {"text": "La plus ", "bold": true}, {"text": "sage", "bold": true}, {"text": " mais la plus ", "bold": true}, {"text": "difficile", "bold": true}, {"text": " à entendre dans le bruit des autres."}, {"text": "\n\n"}, {"text": "Elle dit : ", "italic": true}, {"text": "\"Chaque chose en son temps béni\"", "italic": true}] },
        { type: 'narrative', content: [{"text": "💡 Le secret ?", "bold": true, "italic": true}, {"text": "\n\n"}, {"text": "Apprendre à écouter ", "bold": true}, {"text": "toutes", "bold": true}, {"text": " ces horloges sans laisser une seule dominer."}, {"text": "\n\n"}, {"text": "C'est dans leur ", "bold": true}, {"text": "harmonie", "bold": true}, {"text": " que se trouve ton rythme authentique."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "recevoir_mes_outils_pratiques", "label": "Recevoir mes outils pratiques →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Trois clés pour harmoniser" },

        { type: 'message', content: [{"text": "Pour naviguer ces différences de rythme avec ", "bold": true}, {"text": "sagesse", "bold": true}, {"text": "..."}] },
        { type: 'narrative', content: [{"text": "🗝️ 1. Le Dialogue des Horloges", "bold": true, "italic": true}, {"text": "\n\n"}, {"text": "Au lieu de dire ", "italic": true}, {"text": "\"Tu vas trop vite\"", "italic": true}, {"text": " ou ", "italic": true}, {"text": "\"Tu es trop lent\"", "italic": true}, {"text": ", partage ", "bold": true}, {"text": "ton horloge", "bold": true}, {"text": " :"}, {"text": "\n\n"}, {"text": "\"Voici ce qui influence mon rythme...\""}, {"text": "\n\n"}, {"text": "• Mon histoire avec... ", "italic": true}, {"text": "[partager avec vulnérabilité]", "italic": true}, {"text": "\n\n"}, {"text": "• Ma vision du temps nécessaire pour..."}, {"text": "\n\n"}, {"text": "• Ce qui me rassurerait c'est..."}, {"text": "\n\n"}, {"text": "Puis demande : ", "italic": true}, {"text": "\"Qu'est-ce qui influence le tien ?\"", "italic": true}] },
        { type: 'narrative', content: [{"text": "🌉 2. Les Ponts de Progression", "bold": true, "italic": true}, {"text": "\n\n"}, {"text": "Créez des étapes qui respectent les ", "bold": true}, {"text": "deux rythmes", "bold": true}, {"text": " :"}, {"text": "\n\n"}, {"text": "• ", "bold": true}, {"text": "Pour celui qui veut avancer :", "bold": true}, {"text": "\n\n"}, {"text": "  Des gestes concrets (rencontrer un ami proche, partager un projet)"}, {"text": "\n\n"}, {"text": "• ", "bold": true}, {"text": "Pour celui qui veut ralentir :", "bold": true}, {"text": "\n\n"}, {"text": "  Du temps défini (\"Donnons-nous 2 mois puis on réévalue\")"}, {"text": "\n\n"}, {"text": "L'important : Que chacun sente que ses besoins sont ", "bold": true}, {"text": "honorés", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "🤲 3. L'Istikhara du Timing", "bold": true, "italic": true}, {"text": "\n\n"}, {"text": "Quand le décalage persiste, demande ", "bold": true}, {"text": "guidance", "bold": true}, {"text": " :"}, {"text": "\n\n"}, {"text": "• Fais l'istikhara non pas sur la personne, mais sur le ", "bold": true}, {"text": "timing", "bold": true}, {"text": "\n\n"}, {"text": "• Observe les signes : Les portes s'ouvrent ou se ferment ?"}, {"text": "\n\n"}, {"text": "• Écoute ta ", "italic": true}, {"text": "sakina", "italic": true}, {"text": " : La paix vient de quel choix ?"}, {"text": "\n\n"}, {"text": "Parfois, le bon timing n'est pas le nôtre ni le sien, mais celui qui est ", "bold": true}, {"text": "écrit", "bold": true}, {"text": "."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "decouvrir_la_verite_profonde", "label": "Découvrir la vérité profonde →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "La vérité sur le timing" },

        { type: 'message', content: "Il y a une vérité que peu osent dire sur le timing en amour..." },
        { type: 'narrative', content: [{"text": "Le décalage de rythme n'est pas un problème à résoudre.", "bold": true}, {"text": "\n\n"}, {"text": "C'est un ", "bold": true}, {"text": "révélateur", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "Il révèle :"}, {"text": "\n\n"}, {"text": "✨ Votre capacité à ", "italic": true}, {"text": "naviguer les différences", "italic": true}, {"text": "\n\n"}, {"text": "✨ Votre aptitude au ", "italic": true}, {"text": "compromis sans compromission", "italic": true}, {"text": "\n\n"}, {"text": "✨ Votre maturité à ", "italic": true}, {"text": "honorer deux vérités simultanément", "italic": true}, {"text": "\n\n"}, {"text": "✨ Votre sagesse à ", "italic": true}, {"text": "distinguer l'essentiel du négociable", "italic": true}] },
        { type: 'narrative', content: [{"text": "Car voici le ", "bold": true}, {"text": "secret", "bold": true}, {"text": " :"}, {"text": "\n\n"}, {"text": "Un couple qui ne sait pas harmoniser ses rythmes au début aura du mal à harmoniser ses vies plus tard.", "italic": true}, {"text": "\n\n"}, {"text": "Mais un couple qui apprend cette danse dès le début ?"}, {"text": "\n\n"}, {"text": "Il a trouvé la ", "bold": true}, {"text": "clé de la durabilité", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "La vraie question n'est donc pas :"}, {"text": "\n\n"}, {"text": "\"Qui a le bon rythme ?\""}, {"text": "\n\n"}, {"text": "Mais :"}, {"text": "\n\n"}, {"text": "\"Comment créons-nous ", "bold": true}, {"text": "notre", "bold": true}, {"text": " rythme ?\"", "bold": true}] },
        { type: 'choice', variable: 'choix', options: [{"id": "integrer_l_essence", "label": "Intégrer l'essence →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "L'essence à retenir" },

        { type: 'message', content: "De ce voyage dans les horloges du cœur, retiens ceci..." },
        { type: 'narrative', content: [{"text": "🌸 ", "bold": true}, {"text": "Ton rythme n'est ni trop rapide ni trop lent"}, {"text": "\n\n"}, {"text": "Il est le reflet de ton ", "bold": true}, {"text": "histoire", "bold": true}, {"text": ", tes ", "bold": true}, {"text": "besoins", "bold": true}, {"text": ", ta ", "bold": true}, {"text": "sagesse", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "L'honorer, c'est ", "italic": true}, {"text": "t'honorer", "italic": true}, {"text": "."}, {"text": "\n\n"}, {"text": "🌸 ", "bold": true}, {"text": "Le décalage est une invitation, pas un obstacle"}, {"text": "\n\n"}, {"text": "Il t'invite à ", "italic": true}, {"text": "communiquer plus profondément", "italic": true}, {"text": ", à ", "italic": true}, {"text": "comprendre plus finement", "italic": true}, {"text": ", à ", "italic": true}, {"text": "aimer plus sagement", "italic": true}, {"text": "."}, {"text": "\n\n"}, {"text": "🌸 ", "bold": true}, {"text": "L'harmonie ne vient pas de l'uniformité"}, {"text": "\n\n"}, {"text": "Elle naît quand deux rythmes différents trouvent une ", "bold": true}, {"text": "mélodie commune", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "Le plus important :", "bold": true}, {"text": "\n\n"}, {"text": "Si malgré l'amour, les rythmes restent ", "bold": true}, {"text": "irréconciliables", "bold": true}, {"text": ", ce n'est pas un échec."}, {"text": "\n\n"}, {"text": "C'est la ", "bold": true}, {"text": "sagesse", "bold": true}, {"text": " de reconnaître que certaines danses ne sont pas faites pour durer."}, {"text": "\n\n"}, {"text": "Et c'est ", "italic": true}, {"text": "ok", "italic": true}, {"text": "."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "recevoir_la_benediction_finale", "label": "Recevoir la bénédiction finale →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "La bénédiction du temps" },

        { type: 'message', content: "Avant de nous quitter, j'ai ce message pour toi..." },
        { type: 'narrative', content: [{"text": "Que tu sois Yasmin qui demande du temps ou Ilyas qui veut avancer...", "italic": true}, {"text": "\n\n"}, {"text": "Que tu portes l'urgence de celle qui sent le temps filer ou la patience de celle qui refuse de se presser...", "italic": true}, {"text": "\n\n"}, {"text": "Sache que ton rythme est ", "bold": true}, {"text": "sacré", "bold": true}, {"text": ".", "italic": true}] },
        { type: 'narrative', content: [{"text": "Puisses-tu trouver quelqu'un dont l'horloge ne bat pas forcément au ", "italic": true}, {"text": "même rythme", "italic": true}, {"text": " que la tienne..."}, {"text": "\n\n"}, {"text": "Mais qui a la ", "bold": true}, {"text": "sagesse", "bold": true}, {"text": " et l'", "bold": true}, {"text": "amour", "bold": true}, {"text": " de créer avec toi une ", "bold": true}, {"text": "nouvelle mesure du temps", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Une mesure où ", "italic": true}, {"text": "\"nous\"", "italic": true}, {"text": " devient plus important que ", "italic": true}, {"text": "\"vite\"", "italic": true}, {"text": " ou ", "italic": true}, {"text": "\"lentement\"", "italic": true}, {"text": "."}] },
        { type: 'message', content: "⏰✨" },
        { type: 'choice', variable: 'choix', options: [{"id": "cloturer_ce_voyage", "label": "Clôturer ce voyage →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Gratitude et célébration" },

        { type: 'image', url: "https://images.unsplash.com/photo-1707343848552-893e05dba6ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MXwxfHNlYXJjaHw2fHx0cmF2ZWx8ZW58MHwwfHx8MTc1NDEzMzU5NHww&ixlib=rb-4.1.0&q=80&w=1080", alt: "" },
        { type: 'message', content: [{"text": "Bravo pour ce voyage ", "bold": true}, {"text": "courageux", "bold": true}, {"text": "..."}] },
        { type: 'narrative', content: [{"text": "Explorer le temps dans l'amour", "bold": true}, {"text": ", c'est toucher à l'une des dimensions intimes", "italic": true}, {"text": " de notre être."}, {"text": "\n\n"}, {"text": "Tu viens de plonger dans tes propres horloges, de questionner tes rythmes, de reconnaître tes influences."}, {"text": "\n\n"}, {"text": "C'est un acte de ", "bold": true}, {"text": "courage", "bold": true}, {"text": " et de ", "bold": true}, {"text": "conscience", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "Tes réponses viennent enrichir ta ", "bold": true}, {"text": "cartographie émotionnelle personnelle", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Chaque élément que tu as partagé, chaque prise de conscience, chaque moment de vulnérabilité..."}, {"text": "\n\n"}, {"text": "Tout cela tisse la compréhension unique de qui tu es dans le ", "italic": true}, {"text": "temps de l'amour", "italic": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "Tu découvres que le timing parfait n'existe pas.", "bold": true}, {"text": "\n\n"}, {"text": "Il n'y a que ", "bold": true}, {"text": "ton", "bold": true}, {"text": " timing, celui qui honore ton histoire, tes besoins, ta sagesse intérieure."}, {"text": "\n\n"}, {"text": "Et la capacité ", "italic": true}, {"text": "merveilleuse", "italic": true}, {"text": " de créer un nouveau temps avec celui qui saura ", "bold": true}, {"text": "danser avec tes horloges", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "Continue d'explorer, de questionner, de ", "bold": true}, {"text": "grandir", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Le temps que tu prends pour te comprendre aujourd'hui est le plus ", "bold": true}, {"text": "beau cadeau", "bold": true}, {"text": " que tu puisses offrir à ton futur amour."}] },
        { type: 'message', content: [{"text": "À très vite pour la suite de ton parcours ", "bold": true}, {"text": "Love Transformations™", "bold": true}, {"text": " insha'Allah…✨"}] },
        { type: 'message', content: [{"text": "⏰ ", "bold": true}, {"text": "Fin du Scénario 2 : Le Rythme Discord", "bold": true}, {"text": " ⏰"}] },

        { type: 'completion', title: "Félicitations !", message: "Tu as terminé S2 — Le Rythme Discord. Tes réponses ont été sauvegardées.", icon: '🎵' }
    ]
};

/* ─── Form Registry ─── */
if (typeof window.FORM_REGISTRY === 'undefined') window.FORM_REGISTRY = {};
window.FORM_REGISTRY['s2-rythme'] = S2_RYTHME;
