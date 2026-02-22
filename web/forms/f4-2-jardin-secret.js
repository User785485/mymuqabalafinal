/* ═══════════════════════════════════════
   F4.2 — Le Jardin Secret
   Converti depuis Typebot · 107 steps · 22 variables
═══════════════════════════════════════ */

const F4_2_JARDIN_SECRET = {
    id: 'f4_2_jardin_secret',
    version: 1,
    title: "F4.2 — Le Jardin Secret",
    icon: '🌺',
    checkboxId: 'f4_2',
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
        "action_1_reconstruction",
        "action_2_reconstruction",
        "action_3_reconstruction",
        "affirmations_guerison",
        "blocages_intimite",
        "blocages_sexualite",
        "fleur_dominante_renaissance",
        "gratitude_corps",
        "impact_messages_sensualite",
        "intention_guerison_intime",
        "limites_non_negociables",
        "messages_sensualite",
        "niveau_intimite_confortable",
        "parties_corps_rejetees",
        "pensee_miroir",
        "premiere_pierre_intimite",
        "prenom_jardin",
        "reaction_non_respect_limites",
        "relation_avec_le_corps",
        "style_limites",
        "telephone",
        "vision_sexualite_sacree"
],

    steps: [

        /* ════════════════════════════════════ */
        { type: 'section', title: "Accueil - Entrée dans le Jardin Secret" },

        { type: 'image', url: "https://images.unsplash.com/photo-1591426508941-2f92736f5ff4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHNlYXJjaHwxN3x8amFyZGlufGVufDB8MHx8fDE3NTk2NjA1MDh8MA&ixlib=rb-4.1.0&q=80&w=1080", alt: "" },
        { type: 'message', content: [{"text": "Bismillah ar-Rahman ar-Rahim...", "italic": true}] },
        { type: 'message', content: [{"text": "🌷 Formulaire 4.2 : Intimité et Guérison Profonde", "bold": true, "italic": true}] },
        { type: 'narrative', content: [{"text": "🌿 Imagine un jardin secret au plus profond de ton être..."}, {"text": "\n\n"}, {"text": "Un jardin où fleurissent tes désirs les plus purs, tes vulnérabilités les plus précieuses, tes aspirations les plus intimes."}, {"text": "\n\n"}, {"text": "Certaines parties de ce jardin ont peut-être été "}, {"text": "négligées", "bold": true}, {"text": ", d'autres "}, {"text": "blessées", "bold": true}, {"text": "..."}, {"text": "\n\n"}, {"text": "Aujourd'hui, nous allons "}, {"text": "y entrer", "bold": true}, {"text": " avec douceur."}] },
        { type: 'message', content: "🤲 \"Et c'est Lui qui guérit les cœurs brisés\" (Coran 42:49)\n\nCe jardin intime est sacré. Allah lui-même protège cette exploration." },
        { type: 'message', content: "Avant d'aller plus loin, rappelle-moi qui tu es :" },
        { type: 'message', content: "Ton prénom ?" },
        { type: 'text_input', variable: 'prenom_jardin', placeholder: "Mon prénom..." },
        { type: 'email_input', variable: 'email', placeholder: "ton.email@exemple.com" },
        { type: 'phone_input', variable: 'telephone', placeholder: "06 12 34 56 78", defaultPrefix: '+33' },
        { type: 'choice', variable: 'choix', options: [{"id": "entrer_avec_respect_dans_mon", "label": "🌸 Entrer avec respect dans mon jardin →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Normalisation des Blessures Intimes" },

        { type: 'image', url: "https://images.unsplash.com/photo-1731696920983-8c97094dbc52?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHNlYXJjaHwxfHxsYXJtZXN8ZW58MHwwfHx8MTc1OTY2MDY3NHww&ixlib=rb-4.1.0&q=80&w=1080", alt: "" },
        { type: 'message', content: "💙 Avant toute chose, une vérité importante..." },
        { type: 'narrative', content: [{"text": "🔍 "}, {"text": "Données universelles :", "bold": true}, {"text": "\n\n"}, {"text": "• "}, {"text": "70% des femmes", "bold": true}, {"text": " portent des blessures non-dites liées à l'intimité"}, {"text": "\n\n"}, {"text": "• "}, {"text": "85% des femmes musulmanes", "bold": true}, {"text": " vivent un conflit entre spiritualité et sensualité"}, {"text": "\n\n"}, {"text": "• "}, {"text": "92% des femmes", "bold": true}, {"text": " ont reçu des messages toxiques sur leur corps"}, {"text": "\n\n"}, {"text": "• "}, {"text": "67% des femmes", "bold": true}, {"text": " se sentent coupables de leurs désirs naturels"}] },
        { type: 'narrative', content: [{"text": "Si tu portes des blessures dans ce domaine, sache que tu n'es "}, {"text": "absolument pas seule", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Ces blessures ne sont pas de "}, {"text": "ta faute", "italic": true}, {"text": ". Elles sont souvent le résultat de :"}, {"text": "\n\n"}, {"text": "• Messages culturels toxiques sur la féminité"}, {"text": "\n\n"}, {"text": "• Interprétations rigides de la religion"}, {"text": "\n\n"}, {"text": "• Traumatismes transgénérationnels"}, {"text": "\n\n"}, {"text": "• Éducation basée sur la honte"}] },
        { type: 'narrative', content: [{"text": "💎 "}, {"text": "Honorer tes protections", "bold": true}, {"text": "\n\n"}, {"text": "Toutes les protections que tu as mises en place - pudeur, retrait, méfiance - étaient "}, {"text": "nécessaires", "bold": true}, {"text": " à un moment donné."}, {"text": "\n\n"}, {"text": "Nous ne les jugerons pas. Nous les "}, {"text": "honorerons", "bold": true}, {"text": " tout en explorant avec douceur."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "honorer_mes_protections_et", "label": "🛡️ Honorer mes protections et continuer →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Le Corps comme Temple Sacré" },

        { type: 'image', url: "https://images.unsplash.com/photo-1447619297994-b829cc1ab44a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHNlYXJjaHw2fHxtYWlufGVufDB8MHx8fDE3NTk2NjA3NzZ8MA&ixlib=rb-4.1.0&q=80&w=1080", alt: "" },
        { type: 'narrative', content: [{"text": "💫 "}, {"text": "Vision islamique du corps féminin :", "bold": true}, {"text": "\n\n"}, {"text": "\"Et parmi Ses signes, Il a créé de vous, pour vous, des épouses pour que vous viviez en tranquillité avec elles et Il a mis entre vous de l'affection et de la bonté.\" (Coran 30:21)"}, {"text": "\n\n"}, {"text": "Ton corps féminin est une "}, {"text": "création divine", "bold": true}, {"text": ", parfaitement conçue pour l'amour et la beauté."}] },
        { type: 'message', content: "Actuellement, quelle est ta relation avec ton corps ?" },
        { type: 'choice', variable: 'relation_avec_le_corps', multiple: true, options: [{"id": "je_l_aime_et_le_respecte", "label": "💕 Je l'aime et le respecte"}, {"id": "relation_neutre_sans_affect", "label": "😐 Relation neutre, sans affect particulier"}, {"id": "c_est_complexe_j_oscille", "label": "🌊 C'est complexe, j'oscille"}, {"id": "je_le_critique_beaucoup", "label": "😔 Je le critique beaucoup"}, {"id": "j_ai_honte_de_certaines_part", "label": "😞 J'ai honte de certaines parties"}, {"id": "je_me_sens_deconnectee_de_l", "label": "🌫️ Je me sens déconnectée de lui"}, {"id": "il_me_fait_peur_parfois", "label": "😰 Il me fait peur parfois"}, {"id": "nous_sommes_en_guerre", "label": "⚔️ Nous sommes en guerre"}, {"id": "en_processus_de_reconciliati", "label": "🌱 En processus de réconciliation"}, {"id": "il_reste_un_mystere_pour_moi", "label": "❓ Il reste un mystère pour moi"}] },
        { type: 'message', content: "Quand tu te regardes dans le miroir, la première pensée qui vient est :" },
        { type: 'text_input', variable: 'pensee_miroir', placeholder: "Quand je me regarde dans le miroir, je me dis...", isLong: true },
        { type: 'narrative', content: [{"text": "Y a-t-il des parties de ton corps que tu as du mal à "}, {"text": "accepter", "bold": true}, {"text": " ?"}, {"text": "\n\n"}, {"text": "(Cette question aide à identifier les zones de réconciliation nécessaires)", "italic": true}] },
        { type: 'text_input', variable: 'parties_corps_rejetees', placeholder: "Les parties de mon corps que j'ai du mal à accepter...", isLong: true },
        { type: 'narrative', content: [{"text": "🌸 "}, {"text": "Exercice thérapeutique : Gratitude corporelle", "bold": true}, {"text": "\n\n"}, {"text": "Prenons un moment pour reconnaître tout ce que ton corps fait pour toi..."}] },
        { type: 'message', content: "Complète cette phrase : \"Je remercie mon corps pour...\"" },
        { type: 'text_input', variable: 'gratitude_corps', placeholder: "Je remercie mon corps pour...", isLong: true },
        { type: 'choice', variable: 'choix', options: [{"id": "explorer_pudeur_et_sensualit", "label": "🌹 Explorer pudeur et sensualité →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Pudeur et Sensualité Sacrée" },

        { type: 'narrative', content: [{"text": "💎 "}, {"text": "Vérité profonde :", "bold": true}, {"text": "\n\n"}, {"text": "La pudeur n'est pas l'ennemi de la sensualité. Au contraire, elle en est la "}, {"text": "gardienne", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Une femme peut être profondément "}, {"text": "pudique ET sensuelle", "bold": true}, {"text": ". Cette apparente contradiction est en fait une "}, {"text": "harmonie divine", "bold": true}, {"text": "."}] },
        { type: 'message', content: [{"text": "Quels messages as-tu reçus sur la sensualité féminine ?"}, {"text": "\n\n"}, {"text": "(Coche tout ce qui résonne, même vaguement)", "italic": true}] },
        { type: 'choice', variable: 'messages_sensualite', multiple: true, options: [{"id": "ton_corps_est_source_de_hon", "label": "😞 \"Ton corps est source de honte\""}, {"id": "tu_es_une_tentation_pour_le", "label": "🚫 \"Tu es une tentation pour les hommes\""}, {"id": "tes_desirs_sont_peche", "label": "⚠️ \"Tes désirs sont péché\""}, {"id": "cache_toi_couvre_toi", "label": "🙈 \"Cache-toi, couvre-toi\""}, {"id": "on_n_en_parle_pas", "label": "🤐 \"On n'en parle pas\""}, {"id": "seulement_dans_le_mariage", "label": "💍 \"Seulement dans le mariage\""}, {"id": "c_est_un_devoir_pas_un_pla", "label": "😓 \"C'est un devoir, pas un plaisir\""}, {"id": "c_est_sale_impur", "label": "🚿 \"C'est sale, impur\""}, {"id": "le_plaisir_c_est_pour_l_ho", "label": "👨 \"Le plaisir, c'est pour l'homme\""}, {"id": "controle_tes_pulsions", "label": "⛓️ \"Contrôle tes pulsions\""}, {"id": "une_femme_pudique_n_a_pas_d", "label": "🧕 \"Une femme pudique n'a pas de désirs\""}, {"id": "ton_corps_et_tes_desirs_son", "label": "✨ \"Ton corps et tes désirs sont bénédiction dans le halal\""}] },
        { type: 'message', content: "Comment ces messages ont-ils façonné ta relation à ta sensualité ?" },
        { type: 'text_input', variable: 'impact_messages_sensualite', placeholder: "Ces messages ont créé en moi...", isLong: true },
        { type: 'narrative', content: [{"text": "🤲 Merci pour cette honnêteté courageuse."}, {"text": "\n\n"}, {"text": "Ces messages toxiques ne reflètent pas la vérité sur toi. Tu es une "}, {"text": "création parfaite", "bold": true}, {"text": " d'Allah, digne d'amour et de respect."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "explorer_l_intimite_emotionn", "label": "💕 Explorer l'intimité émotionnelle →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Intimité Émotionnelle - Niveaux de Vulnérabilité" },

        { type: 'image', url: "https://images.unsplash.com/photo-1518199266791-5375a83190b7", alt: "" },
        { type: 'narrative', content: [{"text": "🧅 "}, {"text": "Les couches de l'intimité", "bold": true}, {"text": "\n\n"}, {"text": "L'intimité véritable se construit par couches :"}, {"text": "\n\n"}, {"text": "• "}, {"text": "Couche 1", "bold": true}, {"text": " : Partage des faits et opinions"}, {"text": "\n\n"}, {"text": "• "}, {"text": "Couche 2", "bold": true}, {"text": " : Expression des émotions"}, {"text": "\n\n"}, {"text": "• "}, {"text": "Couche 3", "bold": true}, {"text": " : Révélation des peurs et blessures"}, {"text": "\n\n"}, {"text": "• "}, {"text": "Couche 4", "bold": true}, {"text": " : Partage des rêves et aspirations profondes"}, {"text": "\n\n"}, {"text": "• "}, {"text": "Couche 5", "bold": true}, {"text": " : Union des âmes - intimité spirituelle complète"}] },
        { type: 'message', content: [{"text": "Jusqu'à quelle couche te sens-tu "}, {"text": "généralement confortable", "bold": true}, {"text": " ?"}] },
        { type: 'choice', variable: 'niveau_intimite_confortable', options: [{"id": "couche_1_faits_et_opinion", "label": "🗣️ Couche 1 - Faits et opinions (surface)"}, {"id": "couche_2_emotions", "label": "❤️ Couche 2 - Émotions"}, {"id": "couche_3_peurs_et_blessure", "label": "💔 Couche 3 - Peurs et blessures"}, {"id": "couche_4_reves_profonds", "label": "✨ Couche 4 - Rêves profonds"}, {"id": "couche_5_union_spirituell", "label": "🕊️ Couche 5 - Union spirituelle"}, {"id": "ca_depend_de_la_personne_et", "label": "🌊 Ça dépend de la personne et du contexte"}] },
        { type: 'message', content: "Qu'est-ce qui t'empêche d'aller plus profond dans l'intimité ?" },
        { type: 'choice', variable: 'blocages_intimite', multiple: true, options: [{"id": "peur_d_etre_abandonnee_si_on", "label": "😨 Peur d'être abandonnée si on me connaît vraiment"}, {"id": "peur_du_jugement", "label": "👁️ Peur du jugement"}, {"id": "peur_que_mes_vulnerabilites", "label": "⚡ Peur que mes vulnérabilités soient utilisées contre moi"}, {"id": "habitude_de_tout_controler", "label": "🎭 Habitude de tout contrôler"}, {"id": "manque_de_confiance_en_l_aut", "label": "🔒 Manque de confiance en l'autre"}, {"id": "manque_d_estime_de_moi", "label": "😔 Manque d'estime de moi"}, {"id": "messages_familiaux_sur", "label": "👨‍👩‍👧‍👦 Messages familiaux sur la vulnérabilité"}, {"id": "trauma_passe", "label": "💔 Trauma passé"}, {"id": "peur_de_l_intensite_emotionn", "label": "🌊 Peur de l'intensité émotionnelle"}, {"id": "education_sur_la_pudeur_mal", "label": "🧕 Éducation sur la pudeur mal comprise"}] },
        { type: 'narrative', content: [{"text": "🌉 "}, {"text": "Exercice thérapeutique : \"Le Pont de l'Intimité\"", "bold": true}, {"text": "\n\n"}, {"text": "Imagine que tu construis un pont vers l'intimité véritable."}, {"text": "\n\n"}, {"text": "Quelle serait la "}, {"text": "première pierre", "bold": true}, {"text": " de ce pont ? Le premier pas vers une intimité plus profonde ?"}] },
        { type: 'text_input', variable: 'premiere_pierre_intimite', placeholder: "La première pierre de mon pont vers l'intimité serait...", isLong: true },
        { type: 'choice', variable: 'choix', options: [{"id": "explorer_mes_limites", "label": "🛡️ Explorer mes limites →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Boundaries Sacrées" },

        { type: 'narrative', content: [{"text": "💎 "}, {"text": "Vérité fondamentale :", "bold": true}, {"text": "\n\n"}, {"text": "Avoir des limites claires n'est pas de l'égoïsme. C'est de l'"}, {"text": "amour de soi", "bold": true}, {"text": " et du "}, {"text": "respect divin", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Tes limites protègent le temple sacré de ton être. Elles permettent à l'amour véritable de s'épanouir en sécurité."}] },
        { type: 'message', content: "Actuellement, comment poses-tu tes limites dans l'intimité ?" },
        { type: 'choice', variable: 'style_limites', multiple: true, options: [{"id": "limites_claires_et_bien_comm", "label": "🔵 Limites claires et bien communiquées"}, {"id": "limites_floues_pas_toujour", "label": "🌫️ Limites floues, pas toujours exprimées"}, {"id": "limites_tres_rigides_par_pro", "label": "🧱 Limites très rigides par protection"}, {"id": "peu_de_limites_je_m_adapte", "label": "🌊 Peu de limites, je m'adapte trop"}, {"id": "je_pose_des_limites_quand_c", "label": "⚡ Je pose des limites quand c'est trop tard"}, {"id": "mes_limites_changent_selon_m", "label": "🎭 Mes limites changent selon mon humeur"}, {"id": "j_ai_des_limites_mais_je_ne", "label": "🤐 J'ai des limites mais je ne les dis pas"}, {"id": "je_culpabilise_de_poser_des", "label": "😞 Je culpabilise de poser des limites"}] },
        { type: 'narrative', content: [{"text": "Quelles sont tes limites "}, {"text": "absolument non-négociables", "bold": true}, {"text": " dans l'intimité ?"}, {"text": "\n\n"}, {"text": "Ces limites sacrées que tu ne franchirais jamais, peu importe les circonstances.", "italic": true}] },
        { type: 'text_input', variable: 'limites_non_negociables', placeholder: "Mes limites absolument non-négociables...", isLong: true },
        { type: 'message', content: [{"text": "Comment réagis-tu quand quelqu'un "}, {"text": "ne respecte pas", "bold": true}, {"text": " tes limites ?"}] },
        { type: 'choice', variable: 'reaction_non_respect_limites', multiple: true, options: [{"id": "je_reste_ferme_et_je_reaffir", "label": "💪 Je reste ferme et je réaffirme ma limite"}, {"id": "je_me_mets_en_colere", "label": "😤 Je me mets en colère"}, {"id": "je_me_retire_de_la_situation", "label": "🚪 Je me retire de la situation"}, {"id": "je_finis_par_ceder", "label": "😞 Je finis par céder"}, {"id": "je_culpabilise_d_avoir_pose", "label": "😔 Je culpabilise d'avoir posé la limite"}, {"id": "je_doute_de_ma_legitimite", "label": "❓ Je doute de ma légitimité"}, {"id": "je_me_justifie_longuement", "label": "🗣️ Je me justifie longuement"}, {"id": "ca_depend_du_contexte_et_de", "label": "🎭 Ça dépend du contexte et de la personne"}] },
        { type: 'choice', variable: 'choix', options: [{"id": "explorer_mon_intimite", "label": "🌹 Explorer mon intimité →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Sexualité Sacrée - Vision Islamique" },

        { type: 'image', url: "https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHNlYXJjaHwyfHxwYXlzYWdlfGVufDB8MHx8fDE3NTk2NjA5OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080", alt: "" },
        { type: 'message', content: [{"text": "🌙 "}, {"text": "La Sexualité : Un Don Divin", "bold": true}] },
        { type: 'narrative', content: [{"text": "📖 "}, {"text": "Enseignement prophétique : ", "bold": true}, {"text": "\n\n"}, {"text": "Le Prophète ﷺ a dit : \"Dans le rapport intime de chacun d'entre vous, il y a une "}, {"text": "récompense", "bold": true}, {"text": ".\""}] },
        { type: 'narrative', content: [{"text": "🚫 "}, {"text": "Messages toxiques à déconstruire :", "bold": true}, {"text": "\n\n"}, {"text": "Malheureusement, des interprétations rigides ont pollué cette beauté. Certains messages toxiques circulent :"}, {"text": "\n\n"}, {"text": "❌ \"Le plaisir féminin n'est pas important\""}, {"text": "\n\n"}, {"text": "❌ \"C'est juste pour la procréation\""}, {"text": "\n\n"}, {"text": "❌ \"Une femme pieuse n'a pas de désirs\""}, {"text": "\n\n"}, {"text": "❌ \"C'est sale et impur\""}] },
        { type: 'narrative', content: [{"text": "✨ "}, {"text": "La vérité divine :", "bold": true}, {"text": "\n\n"}, {"text": "• Ta sexualité est un "}, {"text": "don précieux", "bold": true}, {"text": " d'Allah"}, {"text": "\n\n"}, {"text": "• Ton plaisir dans le halal est "}, {"text": "source de baraka", "bold": true}, {"text": "\n\n"}, {"text": "• L'intimité conjugale est un "}, {"text": "acte d'adoration", "bold": true}, {"text": "\n\n"}, {"text": "• Allah a créé le plaisir pour "}, {"text": "les deux époux", "bold": true}] },
        { type: 'message', content: [{"text": "Quels blocages identifies-tu concernant ta sexualité future ?"}, {"text": "\n\n"}, {"text": "(Nommons-les pour mieux les guérir)", "italic": true}] },
        { type: 'choice', variable: 'blocages_sexualite', multiple: true, options: [{"id": "honte_de_mon_corps", "label": "😞 Honte de mon corps"}, {"id": "peur_de_la_douleur", "label": "😣 Peur de la douleur"}, {"id": "culpabilite_d_avoir_des_desi", "label": "😔 Culpabilité d'avoir des désirs"}, {"id": "peur_du_jugement_de_mon_epo", "label": "👁️ Peur du jugement de mon époux"}, {"id": "messages_familiaux_tox", "label": "👨‍👩‍👧‍👦 Messages familiaux toxiques"}, {"id": "trauma_ou_experience_negativ", "label": "💔 Trauma ou expérience négative passée"}, {"id": "manque_de_connaissance_de_mo", "label": "❓ Manque de connaissance de mon corps"}, {"id": "pression_de_performance", "label": "🎭 Pression de performance"}, {"id": "deconnexion_de_mon_corps", "label": "🌫️ Déconnexion de mon corps"}, {"id": "interpretations_rigides_de_l", "label": "📖 Interprétations rigides de la religion"}, {"id": "peur_de_l_intimite_emotionne", "label": "🫣 Peur de l'intimité émotionnelle"}, {"id": "aucun_blocage_identifie", "label": "✨ Aucun blocage identifié"}] },
        { type: 'message', content: [{"text": "Que représenterait pour toi une "}, {"text": "sexualité épanouie et sacrée", "bold": true}, {"text": " dans ton futur mariage ?"}] },
        { type: 'text_input', variable: 'vision_sexualite_sacree', placeholder: "Une sexualité épanouie et sacrée pour moi ce serait...", isLong: true },
        { type: 'choice', variable: 'choix', options: [{"id": "prendre_une_pause_de_gueriso", "label": "🌸 Prendre une pause de guérison →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Pause de Guérison Profonde" },

        { type: 'image', url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4", alt: "" },
        { type: 'narrative', content: [{"text": "Tu viens d'explorer des territoires "}, {"text": "profondément intimes", "bold": true}, {"text": " de ton être."}, {"text": "\n\n"}, {"text": "Peu de femmes osent regarder si profondément."}, {"text": "\n\n"}, {"text": "Prends un moment."}] },
        { type: 'narrative', content: [{"text": "🧘‍♀️ "}, {"text": "Scan corporel de douceur", "bold": true}, {"text": "\n\n"}, {"text": "Ferme les yeux un instant..."}, {"text": "\n\n"}, {"text": "Respire profondément et envoie de la "}, {"text": "compassion", "bold": true}, {"text": " vers :"}, {"text": "\n\n"}, {"text": "• Ton cœur qui porte tant de blessures"}, {"text": "\n\n"}, {"text": "• Ton corps qui mérite tant d'amour"}, {"text": "\n\n"}, {"text": "• Ton âme qui aspire à la guérison"}, {"text": "\n\n"}, {"text": "• Toutes les parties de toi qui ont été blessées"}] },
        { type: 'narrative', content: [{"text": "💫 "}, {"text": "Affirmation de guérison", "bold": true}, {"text": "\n\n"}, {"text": "Répète en ton cœur :", "italic": true}, {"text": "\n\n"}, {"text": "\"Je suis digne d'amour."}, {"text": "\n\n"}, {"text": "Je suis digne de guérison."}, {"text": "\n\n"}, {"text": "Je suis digne d'intimité sacrée."}, {"text": "\n\n"}, {"text": "Allah m'a créée parfaite."}, {"text": "\n\n"}, {"text": "Mon jardin secret refleurira.\""}] },
        { type: 'choice', variable: 'choix', options: [{"id": "continuer", "label": "🌷 Continuer →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Renaissance Intime - Le Jardin qui Refleurit" },

        { type: 'image', url: "https://images.unsplash.com/photo-1579053778004-3a4d3f0fae19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHNlYXJjaHwzfHxyb3NlfGVufDB8MHx8fDE3NTk2NjExNTF8MA&ixlib=rb-4.1.0&q=80&w=1080", alt: "" },
        { type: 'narrative', content: "Ferme les yeux et laisse cette image se former en toi...\n\n🌱 Tu te tiens devant ton jardin. Il a été négligé, certaines parties sont fanées, d'autres blessées...\n\n🌿 Mais regarde... Des pousses vertes percent la terre. La vie revient.\n\n☀️ Le soleil éclaire chaque recoin. Sa lumière guérit ce qui était dans l'ombre." },
        { type: 'narrative', content: [{"text": "🌺 Maintenant, observe... Les fleurs commencent à éclore :"}, {"text": "\n\n"}, {"text": "• "}, {"text": "La rose de l'amour de soi", "bold": true}, {"text": " - parfumée et fière"}, {"text": "\n\n"}, {"text": "• "}, {"text": "Le jasmin de la sensualité sacrée", "bold": true}, {"text": " - délicat et puissant"}, {"text": "\n\n"}, {"text": "• "}, {"text": "Les lys blancs de la pureté du cœur", "bold": true}, {"text": " - immaculés"}, {"text": "\n\n"}, {"text": "• "}, {"text": "Les pivoines de l'intimité guérie", "bold": true}, {"text": " - généreuses et ouvertes"}, {"text": "\n\n"}, {"text": "• "}, {"text": "Les violettes de l'humilité", "bold": true}, {"text": " - pudiques mais radieuses"}] },
        { type: 'narrative', content: [{"text": "Dans ton jardin en renaissance, quelle fleur vois-tu "}, {"text": "dominer", "bold": true}, {"text": " le paysage ?"}, {"text": "\n\n"}, {"text": "Celle qui représente ta plus grande aspiration de guérison.", "italic": true}] },
        { type: 'text_input', variable: 'fleur_dominante_renaissance', placeholder: "Dans mon jardin renaissant, la fleur qui domine est...", isLong: true },
        { type: 'narrative', content: [{"text": "🌱 "}, {"text": "Rituel de Renaissance", "bold": true}, {"text": "\n\n"}, {"text": "Imagine maintenant que tu plantes une graine spéciale dans ton jardin."}, {"text": "\n\n"}, {"text": "Cette graine contient "}, {"text": "une intention de guérison", "bold": true}, {"text": " pour ton intimité future."}, {"text": "\n\n"}, {"text": "Quelle intention plantes-tu dans cette graine sacrée ?"}] },
        { type: 'text_input', variable: 'intention_guerison_intime', placeholder: "Je plante l'intention de...", isLong: true },
        { type: 'choice', variable: 'choix', options: [{"id": "integrer_cette_renaissance", "label": "🌸 Intégrer cette renaissance →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Intégration Pudique" },

        { type: 'narrative', content: [{"text": "💎 "}, {"text": "Affirmations de Guérison Intime", "bold": true}, {"text": "\n\n"}, {"text": "Ces affirmations t'aideront à ancrer ta transformation. Choisis celles qui résonnent le plus fort en toi :"}] },
        { type: 'choice', variable: 'affirmations_guerison', multiple: true, options: [{"id": "mon_corps_est_un_temple_sac", "label": "🕌 \"Mon corps est un temple sacré, digne de respect et d'amour\""}, {"id": "ma_sensualite_est_un_don_di", "label": "🌹 \"Ma sensualité est un don divin que j'honore avec pudeur\""}, {"id": "mes_limites_sont_sacrees_e", "label": "🛡️ \"Mes limites sont sacrées et protègent ce qui est précieux en moi\""}, {"id": "ma_guerison_est_possible_et", "label": "✨ \"Ma guérison est possible et méritée\""}, {"id": "j_ai_le_droit_a_une_intimit", "label": "💕 \"J'ai le droit à une intimité épanouie et sacrée\""}, {"id": "mon_passe_ne_definit_pas_m", "label": "🕊️ \"Mon passé ne définit pas mon futur intime\""}, {"id": "je_suis_digne_d_etre_aimee", "label": "💖 \"Je suis digne d'être aimée pour qui je suis\""}, {"id": "allah_guide_ma_guerison_ave", "label": "🤲 \"Allah guide ma guérison avec sa miséricorde infinie\""}, {"id": "mon_jardin_secret_refleurit", "label": "🌷 \"Mon jardin secret refleurit jour après jour\""}, {"id": "ma_vulnerabilite_est_une_fo", "label": "💪 \"Ma vulnérabilité est une force qui permet l'amour vrai\""}] },
        { type: 'narrative', content: [{"text": "📋 "}, {"text": "Plan de Reconstruction Intime", "bold": true}, {"text": "\n\n"}, {"text": "Quelles sont les "}, {"text": "3 actions concrètes", "bold": true}, {"text": " que tu peux poser dès maintenant pour nourrir la guérison de ton intimité ?"}, {"text": "\n\n"}, {"text": "Exemples : méditer sur tes affirmations, écrire à ton corps, lire sur la sexualité sacrée...", "italic": true}] },
        { type: 'message', content: "Action 1 :" },
        { type: 'text_input', variable: 'action_1_reconstruction', placeholder: "Ma première action concrète..." },
        { type: 'message', content: "Action 2 :" },
        { type: 'text_input', variable: 'action_2_reconstruction', placeholder: "Ma deuxième action concrète..." },
        { type: 'message', content: "Action 3 :" },
        { type: 'text_input', variable: 'action_3_reconstruction', placeholder: "Ma troisième action concrète..." },
        { type: 'message', content: "Pour avoir eu le courage d'explorer tes zones les plus vulnérables et d'initier ta guérison intime avec tant de pudeur et de sagesse." },
        { type: 'choice', variable: 'choix', options: [{"id": "cloturer_cette_exploration", "label": "🌸 Clôturer cette exploration →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Clôture - Le Jardin Secret Refleurit" },

        { type: 'image', url: "https://images.unsplash.com/photo-1444930694458-01babf71870c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHNlYXJjaHwxMnx8ZmxldXJzfGVufDB8MHx8fDE3NTk2NjEzMTF8MA&ixlib=rb-4.1.0&q=80&w=1080", alt: "" },
        { type: 'narrative', content: [{"text": "🌷 "}, {"text": "Extraordinaire Accomplissement !", "bold": true}, {"text": "\n\n"}, {"text": "Tu viens de terminer l'un des formulaires les plus courageux de tout le parcours."}] },
        { type: 'narrative', content: [{"text": "🏆 Tu as exploré avec "}, {"text": "bravoure", "bold": true}, {"text": " :"}, {"text": "\n\n"}, {"text": "✓ Tes blessures intimes "}, {"text": "\n\n"}, {"text": "✓ Ta relation avec ton corps "}, {"text": "\n\n"}, {"text": "✓ L'harmonie entre pudeur et sensualité"}, {"text": "\n\n"}, {"text": "✓ Tes niveaux d'intimité émotionnelle"}, {"text": "\n\n"}, {"text": "✓ Tes limites sacrées"}, {"text": "\n\n"}, {"text": "✓ Ta vision de la sexualité "}, {"text": "\n\n"}, {"text": "✓ Ton processus de renaissance "}] },
        { type: 'narrative', content: [{"text": "🌟 "}, {"text": "Transformation profonde en cours :", "bold": true}, {"text": "\n\n"}, {"text": "En nommant tes blessures, tu as commencé à les "}, {"text": "libérer", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "En visualisant ta renaissance, tu as "}, {"text": "planté des graines", "bold": true}, {"text": " de guérison."}, {"text": "\n\n"}, {"text": "En définissant tes intentions, tu as "}, {"text": "tracé le chemin", "bold": true}, {"text": " vers une intimité alignée."}] },
        { type: 'message', content: "📊 Progression Phase 4 : [■■□] 2/3 formulaires complétés" },
        { type: 'narrative', content: [{"text": "🎯 "}, {"text": "Prochaine étape :", "bold": true}, {"text": "\n\n"}, {"text": "Le "}, {"text": "Formulaire 4.3", "bold": true}, {"text": " t'attend pour explorer tes valeurs profondes et ta vision de vie."}, {"text": "\n\n"}, {"text": "Tu y définiras ce qui est vraiment essentiel pour toi et comment aligner ta vie sur tes valeurs les plus profondes."}] },
        { type: 'narrative', content: [{"text": "🤲 "}, {"text": "Dua de clôture :", "bold": true}, {"text": "\n\n"}, {"text": "\"Ya Allah, guéris ce qui a été blessé en moi."}, {"text": "\n\n"}, {"text": "Fait refleurir ce qui a été négligé."}, {"text": "\n\n"}, {"text": "Bénis mon chemin vers l'intimité sacrée."}, {"text": "\n\n"}, {"text": "Ameen.\""}] },
        { type: 'message', content: [{"text": "🌸 Ton jardin secret refleurit déjà. Chaque jour qui passe, il gagnera en beauté et en parfum."}, {"text": "\n\n"}, {"text": "Continue quand tu te sentiras prête. ", "italic": true}] },

        { type: 'completion', title: "Félicitations !", message: "Tu as terminé F4.2 — Le Jardin Secret. Tes réponses ont été sauvegardées.", icon: '🌺' }
    ]
};

/* ─── Form Registry ─── */
if (typeof window.FORM_REGISTRY === 'undefined') window.FORM_REGISTRY = {};
window.FORM_REGISTRY['f4-2-jardin-secret'] = F4_2_JARDIN_SECRET;
