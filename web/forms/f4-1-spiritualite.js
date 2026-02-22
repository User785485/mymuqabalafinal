/* ═══════════════════════════════════════
   F4.1 — Spiritualité et Amour
   Converti depuis Typebot · 113 steps · 22 variables
═══════════════════════════════════════ */

const F4_1_SPIRITUALITE = {
    id: 'f4_1_spiritualite',
    version: 1,
    title: "F4.1 — Spiritualité et Amour",
    icon: '🤲',
    checkboxId: 'f4_1',
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
        "allah_amour_propres_mots",
        "autres_non_negociables",
        "aveu_hypocrisie",
        "contenu_des_duas",
        "criteres_negociables",
        "croyances_allah_et_amour",
        "description_conflit",
        "detail_influences_perception",
        "email_phase_4",
        "histoire_derniere_istikhara",
        "impact_sur_capacite_amour",
        "influences_perception_allah",
        "lien_pere_et_allah",
        "non_negociables_spirituels",
        "pratique_istikhara",
        "prenom_phase_4",
        "raisons_flexibilite",
        "reaction_silence_divin",
        "telephone",
        "type_conflit_interieur",
        "type_relation_avec_allah",
        "vecu_resultat_istikhara"
],

    steps: [

        /* ════════════════════════════════════ */
        { type: 'section', title: "Accueil Phase 4" },

        { type: 'image', url: "https://images.unsplash.com/photo-1611934180042-da791b4091e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHNlYXJjaHwxfHxzcGlyaXR1YWxpdCVDMyVBOXxlbnwwfDB8fHwxNzU5NjU5NTM1fDA&ixlib=rb-4.1.0&q=80&w=1080", alt: "" },
        { type: 'message', content: [{"text": "Formulaire 4.1 : Spiritualité et amour", "bold": true, "italic": true}] },
        { type: 'narrative', content: [{"text": "🌸 Bienvenue dans la "}, {"text": "Phase Floraison", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Tu as magnifiquement traversé les phases précédentes."}, {"text": "\n\n"}, {"text": "Maintenant, j'aimerais explorer avec toi la "}, {"text": "dimension spirituelle", "bold": true}, {"text": " de tes relations."}] },
        { type: 'narrative', content: [{"text": "💡 "}, {"text": "Pourquoi explorer la spiritualité dans l'amour ?", "bold": true}, {"text": "\n\n"}, {"text": "Ta relation avec le Divin "}, {"text": "influence profondément", "bold": true}, {"text": " ta façon d'aimer et d'être aimée."}, {"text": "\n\n"}, {"text": "Comprendre cette connexion t'aidera à "}, {"text": "aligner", "bold": true}, {"text": " ta vie amoureuse avec tes valeurs profondes."}] },
        { type: 'message', content: "Avant de continuer, rappelle-moi tes coordonnées :" },
        { type: 'message', content: "Ton prénom ?" },
        { type: 'text_input', variable: 'prenom_phase_4', placeholder: "Ton prénom..." },
        { type: 'message', content: "Ton email ?" },
        { type: 'email_input', variable: 'email_phase_4', placeholder: "ton.email@exemple.com" },
        { type: 'message', content: "Ton numéro ?" },
        { type: 'phone_input', variable: 'telephone', placeholder: "06 12 34 56 78", defaultPrefix: '+33' },
        { type: 'narrative', content: [{"text": "📍 "}, {"text": "Important", "bold": true}, {"text": " : Cette exploration touche au sacré en toi."}, {"text": "\n\n"}, {"text": "Il n'y a "}, {"text": "aucun jugement", "bold": true}, {"text": " ici."}, {"text": "\n\n"}, {"text": "Je suis là pour t'accompagner avec respect et bienveillance."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "je_suis_prete_a_explorer", "label": "Je suis prête à explorer →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Préparation relation à Allah" },

        { type: 'message', content: [{"text": "📍 Commençons par explorer ta "}, {"text": "relation avec Allah", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "💡 "}, {"text": "Pourquoi c'est essentiel ?", "bold": true}, {"text": "\n\n"}, {"text": "Ta perception d'Allah influence "}, {"text": "inconsciemment", "bold": true}, {"text": " comment tu perçois l'amour humain."}, {"text": "\n\n"}, {"text": "Si tu vois Allah comme punisseur, tu peux craindre l'amour. Si tu Le vois comme Miséricordieux, tu t'ouvres différemment."}] },
        { type: 'message', content: [{"text": "Beaucoup de femmes découvrent ici des "}, {"text": "liens profonds", "bold": true}, {"text": " entre leur spiritualité et leurs blocages amoureux."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "explorer_ma_relation_a_allah", "label": "Explorer ma relation à Allah →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Relation actuelle avec Allah" },

        { type: 'message', content: [{"text": "D'abord, comment décrirais-tu ta "}, {"text": "relation actuelle", "bold": true}, {"text": " avec Allah ?"}] },
        { type: 'choice', variable: 'type_relation_avec_allah', multiple: true, options: [{"id": "proche_et_intime_je_ressen", "label": "🤲 Proche et intime • Je ressens Sa présence au quotidien"}, {"id": "fluctuante_parfois_proche", "label": "🌊 Fluctuante • Parfois proche, parfois distant"}, {"id": "teintee_de_culpabilite_je", "label": "😔 Teintée de culpabilité • Je ne me sens jamais assez bien"}, {"id": "basee_sur_la_crainte_j_ai", "label": "😰 Basée sur la crainte • J'ai peur de Son châtiment"}, {"id": "remplie_d_amour_je_ressens", "label": "💖 Remplie d'amour • Je ressens Sa miséricorde"}, {"id": "marquee_par_le_doute_je_qu", "label": "❓ Marquée par le doute • Je questionne parfois"}, {"id": "abandonnee_je_me_sens_dela", "label": "💔 Abandonnée • Je me sens délaissée"}, {"id": "formelle_je_pratique_mais", "label": "📿 Formelle • Je pratique mais sans vraie connexion"}, {"id": "mon_refuge_c_est_ma_source", "label": "🏡 Mon refuge • C'est ma source de paix"}, {"id": "conflictuelle_entre_ce_que", "label": "⚡ Conflictuelle • Entre ce que je veux et ce qu'Il veut"}] },
        { type: 'narrative', content: [{"text": "Merci pour cette honnêteté."}, {"text": "\n\n"}, {"text": "Ta relation avec Allah est "}, {"text": "unique et personnelle", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Il n'y a pas de \"bonne\" ou \"mauvaise\" façon de vivre cette connexion."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "comprendre_ce_qui_influence_ma", "label": "Comprendre ce qui influence ma perception →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Ce qui colore ma perception" },

        { type: 'message', content: [{"text": "Maintenant, explorons ce qui "}, {"text": "colore ta perception", "bold": true}, {"text": " d'Allah."}] },
        { type: 'narrative', content: [{"text": "💡 "}, {"text": "Révélation importante :", "bold": true}, {"text": "\n\n"}, {"text": "Notre image d'Allah est souvent influencée par notre "}, {"text": "relation avec nos parents", "bold": true}, {"text": ", surtout le père."}, {"text": "\n\n"}, {"text": "Comprendre ces influences t'aidera à purifier ta connexion spirituelle."}] },
        { type: 'narrative', content: [{"text": "Qu'est-ce qui a le plus "}, {"text": "influencé", "bold": true}, {"text": " ta perception d'Allah ?"}, {"text": "\n\n"}, {"text": "(Coche tout ce qui résonne)", "italic": true}] },
        { type: 'choice', variable: 'influences_perception_allah', multiple: true, options: [{"id": "la_relation_avec_mon_pere", "label": "👨 La relation avec mon père"}, {"id": "la_relation_avec_ma_mere", "label": "👩 La relation avec ma mère"}, {"id": "l_education_religieuse_recue", "label": "📚 L'éducation religieuse reçue"}, {"id": "les_discours_a_la_mosquee", "label": "🕌 Les discours à la mosquée"}, {"id": "les_epreuves_vecues", "label": "💔 Les épreuves vécues"}, {"id": "les_duas_exaucees_ou_non", "label": "🤲 Les duas exaucées (ou non)"}, {"id": "l_entourage_religieux", "label": "👥 L'entourage religieux"}, {"id": "mes_lectures_personnelles", "label": "📖 Mes lectures personnelles"}, {"id": "des_experiences_spirituelles", "label": "✨ Des expériences spirituelles"}, {"id": "les_reseaux_sociaux_religieu", "label": "📱 Les réseaux sociaux religieux"}] },
        { type: 'message', content: [{"text": "Peux-tu m'expliquer "}, {"text": "comment", "bold": true}, {"text": " ces éléments ont façonné ta vision ?"}] },
        { type: 'narrative', content: [{"text": "Pour t'inspirer, voici quelques exemples :", "italic": true}, {"text": "\n\n"}, {"text": "• \"Mon père était sévère, alors j'imagine Allah sévère aussi\"", "italic": true}, {"text": "\n\n"}, {"text": "• \"Les discours sur l'Enfer m'ont fait Le craindre\"", "italic": true}, {"text": "\n\n"}, {"text": "• \"Mes duas non exaucées m'ont fait douter de Son amour\"", "italic": true}, {"text": "\n\n"}, {"text": "Mais ta réponse unique est ce qui compte.", "italic": true}] },
        { type: 'text_input', variable: 'detail_influences_perception', placeholder: "Ma perception d'Allah a été influencée par...", isLong: true },
        { type: 'choice', variable: 'choix', options: [{"id": "explorer_le_lien_avec_ma_vie_a", "label": "Explorer le lien avec ma vie amoureuse →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Allah et ma vie amoureuse" },

        { type: 'message', content: [{"text": "Voyons maintenant comment tu perçois le "}, {"text": "rôle d'Allah", "bold": true}, {"text": " dans ta vie amoureuse."}] },
        { type: 'narrative', content: [{"text": "💡 "}, {"text": "Ce que ça va révéler :", "bold": true}, {"text": "\n\n"}, {"text": "Tu vas comprendre si tu te sens "}, {"text": "soutenue ou jugée", "bold": true}, {"text": " par Allah dans ta quête d'amour."}, {"text": "\n\n"}, {"text": "Cela influence directement ta capacité à t'ouvrir à l'amour."}] },
        { type: 'message', content: [{"text": "Complète spontanément :"}, {"text": "\n\n"}, {"text": "\"Concernant ma vie amoureuse, je crois qu'Allah...\"", "italic": true}] },
        { type: 'choice', variable: 'croyances_allah_et_amour', multiple: true, options: [{"id": "a_deja_tout_planifie_pour_moi", "label": "A déjà tout planifié pour moi"}, {"id": "me_teste_a_travers_mes_echecs", "label": "Me teste à travers mes échecs"}, {"id": "me_punit_pour_mes_peches", "label": "Me punit pour mes péchés"}, {"id": "me_protege_du_mauvais", "label": "Me protège du mauvais"}, {"id": "me_prepare_a_quelque_chose_de", "label": "Me prépare à quelque chose de meilleur"}, {"id": "attend_que_je_devienne_meilleu", "label": "Attend que je devienne meilleure"}, {"id": "me_guide_vers_la_bonne_personn", "label": "Me guide vers la bonne personne"}, {"id": "m_a_oubliee", "label": "M'a oubliée"}, {"id": "ecoute_mes_duas_avec_compassio", "label": "Écoute mes duas avec compassion"}, {"id": "retarde_pour_une_sagesse_que_j", "label": "Retarde pour une sagesse que j'ignore"}] },
        { type: 'message', content: [{"text": "Maintenant, avec "}, {"text": "tes propres mots", "bold": true}, {"text": ", dis-moi ce que tu ressens vraiment :"}] },
        { type: 'text_input', variable: 'allah_amour_propres_mots', placeholder: "Au fond de moi, je crois qu'Allah...", isLong: true },
        { type: 'choice', variable: 'choix', options: [{"id": "explorer_mes_duas_d_amour", "label": "Explorer mes duas d'amour →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Mes duas concernant l'amour" },

        { type: 'message', content: [{"text": "Parlons de tes "}, {"text": "duas concernant l'amour", "bold": true}, {"text": "."}] },
        { type: 'message', content: "Que demandes-tu à Allah concernant ta vie amoureuse ?" },
        { type: 'narrative', content: [{"text": "Exemples de duas courantes :", "italic": true}, {"text": "\n\n"}, {"text": "• \"Ya Allah, envoie-moi mon époux\"", "italic": true}, {"text": "\n\n"}, {"text": "• \"Guéris mon cœur d'abord\"", "italic": true}, {"text": "\n\n"}, {"text": "• \"Protège-moi du haram\"", "italic": true}, {"text": "\n\n"}, {"text": "• \"Donne-moi la patience\"", "italic": true}] },
        { type: 'text_input', variable: 'contenu_des_duas', placeholder: "Dans mes duas, je demande souvent...", isLong: true },
        { type: 'message', content: [{"text": "Comment vis-tu le "}, {"text": "\"silence divin\"", "bold": true}, {"text": " face à tes duas ?"}] },
        { type: 'choice', variable: 'reaction_silence_divin', options: [{"id": "avec_patience_je_sais_qu", "label": "🕊️ Avec patience • Je sais qu'Il répond au bon moment"}, {"id": "avec_doute_je_me_demande_s", "label": "❓ Avec doute • Je me demande s'Il m'écoute"}, {"id": "avec_sentiment_d_abandon_j", "label": "💔 Avec sentiment d'abandon • Je me sens ignorée"}, {"id": "avec_culpabilite_je_pense", "label": "😔 Avec culpabilité • Je pense ne pas mériter"}, {"id": "avec_colere_c_est_injuste", "label": "😤 Avec colère • C'est injuste"}, {"id": "avec_confiance_il_sait_mie", "label": "🤲 Avec confiance • Il sait mieux que moi"}, {"id": "avec_incomprehension_je_ne", "label": "🤷 Avec incompréhension • Je ne comprends pas"}, {"id": "avec_acceptation_c_est_so", "label": "☮️ Avec acceptation • C'est Son plan"}] },
        { type: 'choice', variable: 'choix', options: [{"id": "prendre_une_pause_spirituelle", "label": "Prendre une pause spirituelle →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Pause spirituelle" },

        { type: 'image', url: "https://images.unsplash.com/photo-1487800940032-1cf211187aea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHNlYXJjaHw1fHxpc2xhbXxlbnwwfDB8fHwxNzU5ODQxMjgyfDA&ixlib=rb-4.1.0&q=80&w=1080", alt: "" },
        { type: 'narrative', content: [{"text": "Ces questions touchent ton "}, {"text": "cœur spirituel", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "C'est "}, {"text": "sacré", "bold": true}, {"text": " ce que tu partages."}, {"text": "\n\n"}, {"text": "Allah connaît la sincérité de ta quête."}] },
        { type: 'narrative', content: [{"text": "Prends "}, {"text": "3 respirations profondes", "bold": true}, {"text": " :"}, {"text": "\n\n"}, {"text": "Inspire Sa miséricorde...", "italic": true}, {"text": "\n\n"}, {"text": "Expire tes inquiétudes...", "italic": true}] },
        { type: 'narrative', content: [{"text": "Ta "}, {"text": "vulnérabilité spirituelle", "bold": true}, {"text": " est une force."}, {"text": "\n\n"}, {"text": "Elle montre ton désir authentique de vivre un amour aligné avec tes valeurs."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "explorer_ma_pratique_de_l_isti", "label": "Explorer ma pratique de l'istikhara →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Ma pratique de l'istikhara" },

        { type: 'message', content: [{"text": "📿 Parlons de ta pratique de "}, {"text": "l'istikhara", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "💡 "}, {"text": "Pourquoi c'est révélateur :", "bold": true}, {"text": "\n\n"}, {"text": "Ta façon de pratiquer l'istikhara révèle ta "}, {"text": "confiance en Allah", "bold": true}, {"text": " et en tes propres ressentis."}] },
        { type: 'message', content: "Comment pratiques-tu l'istikhara dans tes décisions amoureuses ?" },
        { type: 'choice', variable: 'pratique_istikhara', multiple: true, options: [{"id": "je_la_fais_systematiquement", "label": "🤲 Je la fais systématiquement avant toute décision"}, {"id": "seulement_pour_les_decisions", "label": "💍 Seulement pour les décisions importantes (mariage)"}, {"id": "rarement_je_prefere_decider", "label": "🌙 Rarement, je préfère décider seule"}, {"id": "je_la_fais_mais_j_ai_du_mal", "label": "😕 Je la fais mais j'ai du mal à interpréter"}, {"id": "je_la_repete_plusieurs_fois", "label": "🔄 Je la répète plusieurs fois si pas de réponse claire"}, {"id": "je_demande_a_d_autres_de_la", "label": "👥 Je demande à d'autres de la faire pour moi"}, {"id": "je_ne_la_pratique_pas", "label": "❌ Je ne la pratique pas"}, {"id": "j_ai_peur_de_la_reponse", "label": "😰 J'ai peur de la réponse"}] },
        { type: 'message', content: [{"text": "Raconte-moi l'histoire de ta "}, {"text": "dernière istikhara amoureuse", "bold": true}, {"text": " :"}] },
        { type: 'text_input', variable: 'histoire_derniere_istikhara', placeholder: "La dernière fois que j'ai fait l'istikhara pour une décision amoureuse...", isLong: true },
        { type: 'message', content: "Comment as-tu vécu le résultat ?" },
        { type: 'text_input', variable: 'vecu_resultat_istikhara', placeholder: "Suite à cette istikhara, j'ai ressenti...", isLong: true },
        { type: 'choice', variable: 'choix', options: [{"id": "explorer_le_lien_avec_mon_pere", "label": "Explorer le lien avec mon père →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Allah et relation au père" },

        { type: 'message', content: [{"text": "Le miroir paternel", "bold": true}] },
        { type: 'narrative', content: [{"text": "💡 "}, {"text": "Révélation psycho-spirituelle :", "bold": true}, {"text": "\n\n"}, {"text": "Notre première image d'une \"autorité aimante\" vient souvent du "}, {"text": "père", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Cette image influence inconsciemment notre perception d'Allah."}] },
        { type: 'message', content: [{"text": "Comment ta relation à Allah "}, {"text": "reflète", "bold": true}, {"text": " ta relation au père ?"}] },
        { type: 'narrative', content: [{"text": "Quelques reflets possibles :", "italic": true}, {"text": "\n\n"}, {"text": "• \"Mon père était absent → J'ai du mal à sentir la présence d'Allah\"", "italic": true}, {"text": "\n\n"}, {"text": "• \"Mon père était sévère → Je crains le jugement d'Allah\"", "italic": true}, {"text": "\n\n"}, {"text": "• \"Mon père était aimant → Je ressens la miséricorde divine\"", "italic": true}, {"text": "\n\n"}, {"text": "• \"Mon père était imprévisible → Ma foi fluctue\"", "italic": true}] },
        { type: 'text_input', variable: 'lien_pere_et_allah', placeholder: "Je réalise que ma relation avec mon père et ma relation avec Allah...", isLong: true },
        { type: 'message', content: [{"text": "Comment cela affecte-t-il ta capacité à "}, {"text": "recevoir l'amour", "bold": true}, {"text": " ?"}] },
        { type: 'text_input', variable: 'impact_sur_capacite_amour', placeholder: "Cette connexion affecte ma capacité à recevoir l'amour car...", isLong: true },
        { type: 'choice', variable: 'choix', options: [{"id": "explorer_mes_criteres_spiritue", "label": "Explorer mes critères spirituels →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Section 28 : Introduction" },

        { type: 'message', content: [{"text": "Explorons maintenant l'"}, {"text": "honnêteté", "bold": true}, {"text": " de tes critères spirituels."}] },
        { type: 'narrative', content: [{"text": "💡 "}, {"text": "Moment de vérité :", "bold": true}, {"text": "\n\n"}, {"text": "Il y a souvent un écart entre nos critères "}, {"text": "affichés", "italic": true}, {"text": " et nos critères "}, {"text": "réels", "italic": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Cette honnêteté avec toi-même est "}, {"text": "libératrice", "bold": true}, {"text": "."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "etre_honnete_sur_mes_criteres", "label": "Être honnête sur mes critères →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Non-négociables spirituels" },

        { type: 'message', content: [{"text": "Quels sont tes "}, {"text": "VRAIS non-négociables", "bold": true}, {"text": " spirituels ?"}] },
        { type: 'narrative', content: [{"text": "Pas ce que tu "}, {"text": "devrais", "italic": true}, {"text": " exiger, mais ce dont tu as "}, {"text": "vraiment", "italic": true}, {"text": " besoin."}] },
        { type: 'choice', variable: 'non_negociables_spirituels', multiple: true, options: [{"id": "qu_il_prie_regulierement", "label": "🕌 Qu'il prie régulièrement"}, {"id": "qu_il_porte_la_barbe", "label": "🧔 Qu'il porte la barbe"}, {"id": "qu_il_mange_halal", "label": "🥩 Qu'il mange halal"}, {"id": "qu_il_ne_boive_pas_d_alcool", "label": "🚫 Qu'il ne boive pas d'alcool"}, {"id": "qu_il_respecte_ma_pratique", "label": "🤝 Qu'il respecte ma pratique"}, {"id": "qu_il_partage_mes_valeurs_mo", "label": "💎 Qu'il partage mes valeurs morales"}, {"id": "accord_sur_l_education_relig", "label": "👶 Accord sur l'éducation religieuse des enfants"}, {"id": "que_sa_famille_soit_prat", "label": "👨‍👩‍👧 Que sa famille soit pratiquante"}, {"id": "qu_il_ait_des_connaissances", "label": "📚 Qu'il ait des connaissances religieuses"}, {"id": "qu_il_valorise_la_chastete", "label": "💍 Qu'il valorise la chasteté"}] },
        { type: 'message', content: [{"text": "Y a-t-il d'autres critères "}, {"text": "vraiment non-négociables", "bold": true}, {"text": " pour toi ?"}] },
        { type: 'text_input', variable: 'autres_non_negociables', placeholder: "Pour moi, il est essentiel qu'il..." },
        { type: 'choice', variable: 'choix', options: [{"id": "voir_ce_qui_est_negociable", "label": "Voir ce qui est négociable →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Ce qui est négociable" },

        { type: 'message', content: [{"text": "Maintenant, soyons honnêtes : qu'est-ce qui est "}, {"text": "négociable en réalité", "bold": true}, {"text": " ?"}] },
        { type: 'message', content: "💡 Même si tu préférerais que ce ne le soit pas..." },
        { type: 'text_input', variable: 'criteres_negociables', placeholder: "Si je suis vraiment honnête, je pourrais négocier sur...", isLong: true },
        { type: 'message', content: [{"text": "Qu'est-ce qui te rend "}, {"text": "flexible", "bold": true}, {"text": " sur ces points ?"}] },
        { type: 'text_input', variable: 'raisons_flexibilite', placeholder: "Je deviens flexible quand...", isLong: true },
        { type: 'choice', variable: 'choix', options: [{"id": "explorer_mon_conflit_interieur", "label": "Explorer mon conflit intérieur →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Conflit intérieur principal" },

        { type: 'message', content: [{"text": "Quel est ton "}, {"text": "conflit intérieur principal", "bold": true}, {"text": " concernant la foi et l'amour ?"}] },
        { type: 'choice', variable: 'type_conflit_interieur', multiple: true, options: [{"id": "entre_mes_desirs_et_le_halal", "label": "Entre mes désirs et le halal"}, {"id": "entre_mon_cur_et_ma_raison_re", "label": "Entre mon cœur et ma raison religieuse"}, {"id": "entre_les_attentes_familiales", "label": "Entre les attentes familiales et mes choix"}, {"id": "entre_culture_et_religion", "label": "Entre culture et religion"}, {"id": "entre_vie_moderne_et_tradition", "label": "Entre vie moderne et tradition"}, {"id": "entre_patience_spirituelle_et", "label": "Entre patience spirituelle et urgence biologique"}, {"id": "entre_l_ideal_religieux_et_la", "label": "Entre l'idéal religieux et la réalité"}, {"id": "entre_suivre_mon_cur_ou_ma_fo", "label": "Entre suivre mon cœur ou ma foi"}] },
        { type: 'message', content: [{"text": "Décris ce conflit avec "}, {"text": "tes mots", "bold": true}, {"text": " :"}] },
        { type: 'text_input', variable: 'description_conflit', placeholder: "Mon conflit intérieur, c'est que d'un côté...", isLong: true },
        { type: 'choice', variable: 'choix', options: [{"id": "poursuivre", "label": "Poursuivre →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "L'hypocrisie à m'avouer" },

        { type: 'message', content: [{"text": "💡 Nous avons tous des zones où il est difficile d'être honnête avec soi-même. Les reconnaître est un acte de "}, {"text": "courage spirituel", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "Exemples :", "bold": true}, {"text": "\n\n"}, {"text": "\"Je dis vouloir un homme pieux mais je suis attirée par les bad boys\"", "italic": true}, {"text": "\n\n"}, {"text": "\"Je juge celles qui fréquentent mais je le fais en secret\"", "italic": true}, {"text": "\n\n"}, {"text": "\"Je prêche la patience mais je désespère\"", "italic": true}] },
        { type: 'text_input', variable: 'aveu_hypocrisie', placeholder: "Ce que j'ai du mal à reconn, c'est que je...", isLong: true },
        { type: 'message', content: [{"text": "✨ "}, {"text": "Bravo pour ton honnêteté !", "bold": true}] },
        { type: 'choice', variable: 'choix', options: [{"id": "terminer_ce_formulaire", "label": "Terminer ce formulaire →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Clôture formulaire" },

        { type: 'image', url: "https://images.unsplash.com/photo-1759434225861-e834192ccdaf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NTk2NjA0NDh8&ixlib=rb-4.1.0&q=80&w=1080", alt: "" },
        { type: 'message', content: [{"text": "🌸 "}, {"text": "Magnifique !", "bold": true}, {"text": " Tu viens de terminer le Formulaire 4.1."}] },
        { type: 'narrative', content: [{"text": "Tu as exploré avec "}, {"text": "courage", "bold": true}, {"text": " :"}, {"text": "\n\n"}, {"text": "✓ Ta relation avec Allah et son impact sur l'amour"}, {"text": "\n\n"}, {"text": "✓ Tes duas et ta pratique de l'istikhara"}, {"text": "\n\n"}, {"text": "✓ Le lien entre ta relation au père et au Divin"}, {"text": "\n\n"}, {"text": "✓ Tes vrais critères spirituels"}, {"text": "\n\n"}, {"text": "✓ Tes conflits intérieurs "}] },
        { type: 'narrative', content: [{"text": "💡 "}, {"text": "Révélation importante :", "bold": true}, {"text": "\n\n"}, {"text": "Tu viens de créer un "}, {"text": "pont", "bold": true}, {"text": " entre ta spiritualité et ta vie amoureuse."}, {"text": "\n\n"}, {"text": "Cette intégration est essentielle pour vivre un amour "}, {"text": "aligné", "bold": true}, {"text": "."}] },
        { type: 'message', content: "Progression Phase 4 : [■□□] 1/3 formulaires complétés" },
        { type: 'narrative', content: [{"text": "Le "}, {"text": "Formulaire 4.2", "bold": true}, {"text": " t'attend pour explorer l'intimité et la guérison spirituelle."}, {"text": "\n\n"}, {"text": "Tu y découvriras comment réconcilier ta spiritualité et ta sensualité."}] },
        { type: 'message', content: [{"text": "Continue quand tu seras prête... 🤲"}, {"text": "\n\n"}, {"text": "Qu'Allah guide tes pas sur ce chemin de découverte.", "italic": true}] },

        { type: 'completion', title: "Félicitations !", message: "Tu as terminé F4.1 — Spiritualité et Amour. Tes réponses ont été sauvegardées.", icon: '🤲' }
    ]
};

/* ─── Form Registry ─── */
if (typeof window.FORM_REGISTRY === 'undefined') window.FORM_REGISTRY = {};
window.FORM_REGISTRY['f4-1-spiritualite'] = F4_1_SPIRITUALITE;
