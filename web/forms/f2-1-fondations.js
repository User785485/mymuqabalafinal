/* ═══════════════════════════════════════
   F2.1 — Les Fondations
   Converti depuis Typebot · 109 steps · 22 variables
═══════════════════════════════════════ */

const F2_1_FONDATIONS = {
    id: 'f2_1_fondations',
    version: 1,
    title: "F2.1 — Les Fondations",
    icon: '🏗️',
    checkboxId: 'f2_1',
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
        "alertes_meteo_choix",
        "amour_propres_mots",
        "climat_emotionnel_enfance",
        "consequence_transgression",
        "croyance_sur_la_perfection",
        "croyance_sur_le_rejet",
        "croyance_sur_les_besoins",
        "definition_amour_enfance",
        "distorsions_cognitives_dominantes",
        "email_phase_2",
        "emotions_interdites_enfance",
        "exemple_de_dialogue_interieur",
        "impact_definition_aujourd_hui",
        "metacognition",
        "monopole_emotions_famille",
        "origine_des_schemas",
        "prenom_phase_2",
        "regle_qui_emprisonne_aujourd_hui",
        "souvenir_alerte_meteo",
        "telephone",
        "telephone_phase_2",
        "type_de_dialogue_interieur"
],

    steps: [

        /* ════════════════════════════════════ */
        { type: 'section', title: "Accueil Phase 2" },

        { type: 'message', content: "Avant de continuer, rappelle-moi tes coordonnées :" },
        { type: 'message', content: "Ton prénom ?" },
        { type: 'text_input', variable: 'reponse', placeholder: "Ton prénom..." },
        { type: 'message', content: "Ton email ?" },
        { type: 'email_input', variable: 'email', placeholder: "ton.email@exemple.com" },
        { type: 'message', content: "Ton téléphone ?" },
        { type: 'phone_input', variable: 'telephone', placeholder: "06 12 34 56 78", defaultPrefix: '+33' },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Accueil Phase 2" },

        { type: 'image', url: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368", alt: "" },
        { type: 'message', content: [{"text": "Formulaire 2.1 : L'Atmosphère de l'Enfance", "bold": true, "italic": true}] },
        { type: 'narrative', content: [{"text": "🌿 Bienvenue dans la "}, {"text": "Phase Croissance", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Tu as magnifiquement complété la première phase."}, {"text": "\n\n"}, {"text": "Maintenant, j'aimerais explorer avec toi les "}, {"text": "racines de tes schémas relationnels", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "💡 "}, {"text": "Pourquoi explorer l'enfance ?", "bold": true}, {"text": "\n\n"}, {"text": "Les neurosciences nous montrent que "}, {"text": "90% de nos réactions émotionnelles", "bold": true}, {"text": " en amour viennent de ce qu'on a appris enfant."}, {"text": "\n\n"}, {"text": "Comprendre ces racines, c'est "}, {"text": "reprendre le pouvoir", "bold": true}, {"text": " sur tes schémas."}] },
        { type: 'message', content: "Avant de continuer, rappelle-moi tes coordonnées :" },
        { type: 'message', content: "Ton prénom ?" },
        { type: 'text_input', variable: 'prenom_phase_2', placeholder: "Ton prénom..." },
        { type: 'message', content: "Ton email ?" },
        { type: 'email_input', variable: 'email_phase_2', placeholder: "ton.email@exemple.com" },
        { type: 'message', content: "Ton téléphone ?" },
        { type: 'phone_input', variable: 'telephone_phase_2', placeholder: "06 12 34 56 78", defaultPrefix: '+33' },
        { type: 'narrative', content: [{"text": "📍 "}, {"text": "Important", "bold": true}, {"text": " : Cette exploration peut remuer des émotions."}, {"text": "\n\n"}, {"text": "C'est "}, {"text": "normal et sain", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Je suis là pour t'accompagner à chaque étape."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "je_suis_prete_a_explorer", "label": "Je suis prête à explorer →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Préparation atmosphère" },

        { type: 'message', content: [{"text": "📍 Commençons par "}, {"text": "l'atmosphère générale", "bold": true}, {"text": " de ton enfance."}] },
        { type: 'narrative', content: [{"text": "💡 "}, {"text": "Pourquoi c'est important ?", "bold": true}, {"text": "\n\n"}, {"text": "L'ambiance émotionnelle de ton enfance a créé ton "}, {"text": "\"thermostat émotionnel\"", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "C'est ce qui fait qu'aujourd'hui, tu te sens \"normale\" dans certaines ambiances... même si elles sont toxiques."}] },
        { type: 'narrative', content: [{"text": "Beaucoup de femmes découvrent ici pourquoi elles "}, {"text": "tolèrent l'intolérable", "bold": true}, {"text": " ou pourquoi elles "}, {"text": "fuient le trop calme", "bold": true}, {"text": "."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "explorer_mon_climat_familial", "label": "Explorer mon climat familial →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Atmosphère émotionnelle" },

        { type: 'narrative', content: [{"text": "D'abord, voyons l'ambiance générale."}, {"text": "\n\n"}, {"text": "Si tu devais décrire le "}, {"text": "climat émotionnel", "bold": true}, {"text": " de ton enfance :"}] },
        { type: 'choice', variable: 'climat_emotionnel_enfance', multiple: true, options: [{"id": "ensoleille_chaleur_rires", "label": "☀️ Ensoleillé • Chaleur, rires et joie dominaient"}, {"id": "variable_un_jour_bien_un", "label": "⛅ Variable • Un jour bien, un jour tendu, imprévisible"}, {"id": "pluvieux_une_tristesse_de", "label": "🌧️ Pluvieux • Une tristesse de fond, comme un voile gris"}, {"id": "orageux_disputes_cris_t", "label": "⛈️ Orageux • Disputes, cris, tensions électriques"}, {"id": "glacial_froideur_distanc", "label": "❄️ Glacial • Froideur, distance, peu de contacts chaleureux"}, {"id": "brumeux_on_ne_savait_jama", "label": "🌫️ Brumeux • On ne savait jamais sur quel pied danser"}, {"id": "tornade_chaos_permanent", "label": "🌪️ Tornade • Chaos permanent, montagnes russes émotionnelles"}, {"id": "arc_en_ciel_apres_la_pluie", "label": "🌈 Arc-en-ciel après la pluie • Des moments durs mais aussi beaucoup d'amour"}, {"id": "nuit_etoilee_calme_en_surf", "label": "🌙 Nuit étoilée • Calme en surface mais solitude profonde"}, {"id": "desertique_peu_d_emotions", "label": "🏜️ Désertique • Peu d'émotions exprimées, sécheresse affective"}, {"id": "maree_des_vagues_d_intensi", "label": "🌊 Marée • Des vagues d'intensité puis le calme plat"}, {"id": "eclaircie_globalement_ser", "label": "🌤️ Éclaircie • Globalement serein avec quelques passages nuageux"}] },
        { type: 'narrative', content: [{"text": "Merci pour cette première image."}, {"text": "\n\n"}, {"text": "Tu sais, "}, {"text": "aucune famille n'est parfaite", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Ce qui compte, c'est de comprendre comment ce climat t'affecte "}, {"text": "encore aujourd'hui", "bold": true}, {"text": "."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "identifier_les_signaux_d_alert", "label": "Identifier les signaux d'alerte →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Alertes météo familiales" },

        { type: 'message', content: [{"text": "Maintenant, parlons des "}, {"text": "\"alertes météo\"", "bold": true}, {"text": " dans ta famille."}] },
        { type: 'narrative', content: [{"text": "💡 "}, {"text": "Ce que ça va révéler :", "bold": true}, {"text": "\n\n"}, {"text": "Tu vas comprendre pourquoi aujourd'hui tu es "}, {"text": "hyper-vigilante", "bold": true}, {"text": " à certains signes chez ton partenaire."}, {"text": "\n\n"}, {"text": "Ces \"radars\" d'enfance sont toujours actifs dans tes relations actuelles."}] },
        { type: 'narrative', content: [{"text": "Dans ta famille, "}, {"text": "qu'est-ce qui annonçait", "bold": true}, {"text": " que l'ambiance allait changer ?"}, {"text": "\n\n"}, {"text": "(Coche tout ce qui résonne)", "italic": true}] },
        { type: 'choice', variable: 'alertes_meteo_choix', multiple: true, options: [{"id": "le_silence_soudain_de_maman", "label": "🤐 Le silence soudain de maman"}, {"id": "les_pas_lourds_dans_l_escali", "label": "👣 Les pas lourds dans l'escalier"}, {"id": "une_porte_qui_claque", "label": "🚪 Une porte qui claque"}, {"id": "le_ton_de_voix_qui_monte", "label": "📢 Le ton de voix qui monte"}, {"id": "l_heure_tardive_d_un_retour", "label": "🕐 L'heure tardive d'un retour"}, {"id": "une_odeur_particuliere_alco", "label": "🍷 Une odeur particulière (alcool, cigarette...)"}, {"id": "les_adultes_qui_chuchotent", "label": "🤫 Les adultes qui chuchotent"}, {"id": "l_expression_du_visage_de_pa", "label": "😔 L'expression du visage de papa/maman"}, {"id": "le_telephone_qui_sonne", "label": "📞 Le téléphone qui sonne"}, {"id": "les_discussions_sur_l_argent", "label": "💰 Les discussions sur l'argent"}, {"id": "l_arrivee_de_certains_visite", "label": "🚗 L'arrivée de certains visiteurs"}, {"id": "un_repas_en_retard_ou_rate", "label": "🍽️ Un repas en retard ou raté"}, {"id": "autre_chose", "label": "Autre chose"}] },
        { type: 'message', content: [{"text": "Maintenant, aide-moi à comprendre "}, {"text": "un moment précis", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "Raconte-moi "}, {"text": "une fois", "bold": true}, {"text": " où tu as senti cette \"alerte météo\", ce changement d'ambiance ou cette tension/conflit marquant(e) :"}, {"text": "\n\n"}, {"text": "Quel âge avais-tu ? Qu'est-ce qui s'est passé ?", "italic": true}] },
        { type: 'text_input', variable: 'souvenir_alerte_meteo', placeholder: "Je me souviens d'une fois où...", isLong: true },
        { type: 'narrative', content: [{"text": "Merci de partager ce souvenir."}, {"text": "\n\n"}, {"text": "C'est "}, {"text": "courageux", "bold": true}, {"text": " de revisiter ces moments."}, {"text": "\n\n"}, {"text": "Tu n'es pas responsable de l'ambiance de ton enfance. L'enfant que tu étais faisait de son mieux pour naviguer dans ce climat.", "italic": true}] },
        { type: 'choice', variable: 'choix', options: [{"id": "comprendre_ce_que_j_ai_appris", "label": "Comprendre ce que j'ai appris →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Apprentissage sur l'amour" },

        { type: 'message', content: [{"text": "Voyons maintenant ce que ce climat t'a "}, {"text": "enseigné sur l'amour", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "💡 "}, {"text": "Révélation importante :", "bold": true}, {"text": "\n\n"}, {"text": "Les enfants apprennent ce qu'est l'amour en "}, {"text": "observant", "bold": true}, {"text": ", pas en écoutant."}, {"text": "\n\n"}, {"text": "Ce que tu as "}, {"text": "vu", "italic": true}, {"text": " est devenu ta "}, {"text": "définition inconsciente", "italic": true}, {"text": " de l'amour."}] },
        { type: 'message', content: [{"text": "Complète spontanément cette phrase :"}, {"text": "\n\n"}, {"text": "\"Dans ma famille, j'ai appris que l'amour c'est...\"", "italic": true}] },
        { type: 'choice', variable: 'definition_amour_enfance', multiple: true, options: [{"id": "se_sacrifier_pour_les_autres", "label": "Se sacrifier pour les autres"}, {"id": "quelque_chose_qu_il_faut_merit", "label": "Quelque chose qu'il faut mériter"}, {"id": "forcement_complique_et_doulour", "label": "Forcément compliqué et douloureux"}, {"id": "donne_sous_conditions", "label": "Donné sous conditions"}, {"id": "rare_et_precieux", "label": "Rare et précieux"}, {"id": "dangereux_ca_rend_vulnerable", "label": "Dangereux, ça rend vulnérable"}, {"id": "une_recompense_pour_etre_parfa", "label": "Une récompense pour être parfaite"}, {"id": "imprevisible_ca_va_et_ca_vien", "label": "Imprévisible, ça va et ça vient"}, {"id": "quelque_chose_qui_ne_se_dit_pa", "label": "Quelque chose qui ne se dit pas"}, {"id": "ce_qui_manquait_dans_ma_famill", "label": "Ce qui manquait dans ma famille"}, {"id": "accessible_simple_et_exprime", "label": "accessible, simple et exprimé naturellement "}] },
        { type: 'message', content: [{"text": "Maintenant, avec "}, {"text": "tes propres mots", "bold": true}, {"text": " :"}] },
        { type: 'text_input', variable: 'amour_propres_mots', placeholder: "Pour moi enfant, l'amour c'était...", isLong: true },
        { type: 'message', content: [{"text": "Comment cette définition d'enfance "}, {"text": "influence", "bold": true}, {"text": " tes relations aujourd'hui ?"}] },
        { type: 'message', content: [{"text": "Par exemple : \"Je pense toujours devoir mériter l'amour\" ou \"J'attends que ça devienne compliqué pour croire que c'est réel\"...", "italic": true}] },
        { type: 'text_input', variable: 'impact_definition_aujourd_hui', placeholder: "Aujourd'hui, dans mes relations, je remarque que...", isLong: true },
        { type: 'choice', variable: 'choix', options: [{"id": "prendre_une_pause", "label": "Prendre une pause →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Pause bienveillance" },

        { type: 'image', url: "https://images.unsplash.com/photo-1510682999913-847a6d3cf221?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHNlYXJjaHwxMXx8YnJlYWt8ZW58MHwwfHx8MTc1NTQxOTEwOHww&ixlib=rb-4.1.0&q=80&w=1080", alt: "" },
        { type: 'message', content: [{"text": "🌸 "}, {"text": "Pause douceur", "bold": true}] },
        { type: 'narrative', content: [{"text": "Tu viens d'explorer des territoires "}, {"text": "sensibles", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "C'est "}, {"text": "normal", "bold": true}, {"text": " si des émotions remontent."}, {"text": "\n\n"}, {"text": "Ces émotions sont des "}, {"text": "messagères", "bold": true}, {"text": ", pas des ennemies."}] },
        { type: 'narrative', content: [{"text": "Prends "}, {"text": "3 grandes respirations", "bold": true}, {"text": " :"}, {"text": "\n\n"}, {"text": "Inspire... 1, 2, 3, 4", "italic": true}, {"text": "\n\n"}, {"text": "Retiens... 1, 2, 3, 4", "italic": true}, {"text": "\n\n"}, {"text": "Expire... 1, 2, 3, 4, 5, 6", "italic": true}] },
        { type: 'narrative', content: [{"text": "Tu es "}, {"text": "courageuse", "bold": true}, {"text": " d'explorer ces profondeurs."}, {"text": "\n\n"}, {"text": "Chaque prise de conscience est un pas vers ta "}, {"text": "liberté émotionnelle", "bold": true}, {"text": "."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "explorer_les_regles_invisibles", "label": "Explorer les règles invisibles →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Règles invisibles" },

        { type: 'image', url: "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHNlYXJjaHwzfHxtYWlzb258ZW58MHwwfHx8MTc1NTQxOTI4NHww&ixlib=rb-4.1.0&q=80&w=1080", alt: "" },
        { type: 'message', content: [{"text": "📍 Explorons maintenant les "}, {"text": "règles invisibles", "bold": true}, {"text": " de ton foyer."}] },
        { type: 'narrative', content: [{"text": "💡 "}, {"text": "Ce que tu vas découvrir :", "bold": true}, {"text": "\n\n"}, {"text": "Pourquoi tu "}, {"text": "réprimes", "bold": true}, {"text": " certaines émotions dans tes relations."}, {"text": "\n\n"}, {"text": "Pourquoi tu te sens "}, {"text": "coupable", "bold": true}, {"text": " de ressentir certaines choses."}, {"text": "\n\n"}, {"text": "Ces règles d'enfance sont encore tes "}, {"text": "\"lois intérieures\"", "italic": true}, {"text": " aujourd'hui."}] },
        { type: 'message', content: [{"text": "🔴 "}, {"text": "Zone rouge", "bold": true}, {"text": " : Les émotions INTERDITES chez toi"}] },
        { type: 'message', content: [{"text": "Quelles émotions n'avaient "}, {"text": "PAS le droit d'exister", "bold": true}, {"text": " ?"}] },
        { type: 'choice', variable: 'emotions_interdites_enfance', multiple: true, options: [{"id": "la_tristesse_arrete_de_pl", "label": "😢 La tristesse • \"Arrête de pleurer pour rien\""}, {"id": "la_colere_une_fille_bien", "label": "😤 La colère • \"Une fille bien élevée ne se fâche pas\""}, {"id": "la_peur_n_aie_pas_peur_c", "label": "😨 La peur • \"N'aie pas peur, c'est ridicule\""}, {"id": "la_joie_excessive_calme_t", "label": "😊 La joie excessive • \"Calme-toi, tu déranges\""}, {"id": "la_jalousie_c_est_moche_d", "label": "😒 La jalousie • \"C'est moche d'être jalouse\""}, {"id": "la_deception_tu_devrais_e", "label": "😔 La déception • \"Tu devrais être reconnaissante\""}, {"id": "les_desirs_tu_es_trop_exi", "label": "💭 Les désirs • \"Tu es trop exigeante\""}, {"id": "la_frustration_c_est_comm", "label": "😤 La frustration • \"C'est comme ça, point\""}, {"id": "la_vulnerabilite_ne_montr", "label": "🥺 La vulnérabilité • \"Ne montre pas tes faiblesses\""}, {"id": "les_besoins_tu_demandes_t", "label": "🤲 Les besoins • \"Tu demandes toujours trop\""}] },
        { type: 'message', content: [{"text": "Que se passait-il quand tu transgressais ces "}, {"text": "\"interdits émotionnels\"", "bold": true}, {"text": " ?"}] },
        { type: 'text_input', variable: 'consequence_transgression', placeholder: "Quand je montrais ces émotions, il se passait...", isLong: true },
        { type: 'message', content: [{"text": "[Question importante] "}, {"text": "Qui avait le monopole", "bold": true}, {"text": " de certaines émotions ?"}] },
        { type: 'narrative', content: [{"text": "💡 "}, {"text": "Révélation clé :", "bold": true}, {"text": "\n\n"}, {"text": "Dans chaque famille, certaines émotions sont "}, {"text": "\"réservées\"", "italic": true}, {"text": " à certaines personnes."}, {"text": "\n\n"}, {"text": "Ça explique pourquoi aujourd'hui tu "}, {"text": "t'interdis", "bold": true}, {"text": " certains ressentis."}] },
        { type: 'narrative', content: [{"text": "Exemples : ", "italic": true}, {"text": "\n\n"}, {"text": "• \"Seule maman avait le droit d'être fatiguée\"", "italic": true}, {"text": "\n\n"}, {"text": "• \"La colère, c'était réservé à papa\"", "italic": true}, {"text": "\n\n"}, {"text": "• \"Mon frère avait le monopole de la fragilité\"", "italic": true}] },
        { type: 'text_input', variable: 'monopole_emotions_famille', placeholder: "Dans ma famille, les émotions étaient distribuées comme ça...", isLong: true },
        { type: 'message', content: [{"text": "La règle qui t'"}, {"text": "emprisonne ENCORE aujourd'hui", "bold": true}, {"text": " :"}] },
        { type: 'narrative', content: [{"text": "Quelle règle d'enfance suis-tu "}, {"text": "encore sans t'en rendre compte", "bold": true}, {"text": " ?"}, {"text": "\n\n"}, {"text": "Par exemple : \"Je ne dois pas déranger\", \"Je dois toujours être forte\"...", "italic": true}] },
        { type: 'text_input', variable: 'regle_qui_emprisonne_aujourd_hui', placeholder: "La règle que je suis encore aujourd'hui...", isLong: true },
        { type: 'message', content: [{"text": "Bravo pour ton courage d'identifier les "}, {"text": "chaînes invisibles", "bold": true}, {"text": " qui limitent encore ta liberté émotionnelle."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "explorer_mes_schemas_de_pensee", "label": "Explorer mes schémas de pensée →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Schémas de pensée" },

        { type: 'message', content: [{"text": "🆕 Explorons maintenant tes "}, {"text": "schémas de pensée", "bold": true}, {"text": " automatiques."}] },
        { type: 'narrative', content: [{"text": "💡 "}, {"text": "Découverte fascinante :", "bold": true}, {"text": "\n\n"}, {"text": "Tes pensées automatiques créent ta "}, {"text": "réalité émotionnelle", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Ces schémas de pensée sont comme des "}, {"text": "lunettes déformantes", "bold": true}, {"text": " héritées de l'enfance."}, {"text": "\n\n"}, {"text": "Les identifier, c'est pouvoir enfin "}, {"text": "changer de lunettes", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "Tes "}, {"text": "distorsions cognitives", "bold": true}, {"text": " dominantes :"}, {"text": "\n\n"}, {"text": "(Coche toutes celles qui te parlent)", "italic": true}] },
        { type: 'choice', variable: 'distorsions_cognitives_dominantes', multiple: true, options: [{"id": "catastrophisation_j_imagi", "label": "🌪️ Catastrophisation • J'imagine toujours le pire scénario"}, {"id": "lecture_de_pensee_je_sais", "label": "🔮 Lecture de pensée • Je 'sais' ce que l'autre pense de moi"}, {"id": "generalisation_un_echec", "label": "♾️ Généralisation • Un échec = je suis nulle en tout"}, {"id": "filtre_mental_je_ne_vois", "label": "🕳️ Filtre mental • Je ne vois que le négatif"}, {"id": "disqualification_du_positif", "label": "❌ Disqualification du positif • Les compliments ne comptent pas"}, {"id": "conclusions_hatives_je_sau", "label": "🏃 Conclusions hâtives • Je saute aux conclusions sans preuves"}, {"id": "raisonnement_emotionnel_je", "label": "💭 Raisonnement émotionnel • Je le sens donc c'est vrai"}, {"id": "etiquettes_je_suis_nu", "label": "🏷️ Étiquettes • Je suis... (nulle, ratée, pas assez...)"}, {"id": "personnalisation_tout_est", "label": "🎯 Personnalisation • Tout est de ma faute"}, {"id": "tout_ou_rien_c_est_parfai", "label": "⚪⚫ Tout ou rien • C'est parfait ou c'est nul"}] },
        { type: 'message', content: [{"text": "Ton "}, {"text": "dialogue intérieur", "bold": true}, {"text": " est plutôt :"}] },
        { type: 'choice', variable: 'type_de_dialogue_interieur', multiple: true, options: [{"id": "critique_severe_tu_es_nul", "label": "😈 Critique sévère • 'Tu es nulle, tu n'y arriveras jamais'"}, {"id": "exigeant_perfectionniste", "label": "📏 Exigeant perfectionniste • 'Ce n'est pas assez bien'"}, {"id": "anxieux_anticipateur_et_s", "label": "😰 Anxieux anticipateur • 'Et si... Et si... Et si...'"}, {"id": "defaitiste_resigne_a_quoi", "label": "😔 Défaitiste résigné • 'À quoi bon essayer ?'"}, {"id": "comparateur_constant_elle", "label": "📊 Comparateur constant • 'Elle est mieux que toi'"}, {"id": "parfois_bienveillant_tu_f", "label": "🌸 Parfois bienveillant • 'Tu fais de ton mieux'"}, {"id": "encourageant_tu_peux_le_f", "label": "💪 Encourageant • 'Tu peux le faire !'"}, {"id": "neutre_observateur_simple", "label": "😐 Neutre observateur • Simple constat sans jugement"}, {"id": "variable_depend_de_mon_hum", "label": "🎭 Variable • Dépend de mon humeur et de la situation"}, {"id": "peu_present_je_pense_peu_a", "label": "🤐 Peu présent • Je pense peu à moi-même"}] },
        { type: 'message', content: [{"text": "Donne-moi un "}, {"text": "exemple concret", "bold": true}, {"text": " de ce dialogue :"}] },
        { type: 'text_input', variable: 'exemple_de_dialogue_interieur', placeholder: "La dernière fois, je me suis dit...", isLong: true },
        { type: 'narrative', content: [{"text": "Mes "}, {"text": "croyances intermédiaires", "bold": true}, {"text": " :"}, {"text": "\n\n"}, {"text": "Complète ces phrases spontanément :", "italic": true}] },
        { type: 'message', content: "\"Si je montre mes besoins, alors...\"" },
        { type: 'text_input', variable: 'croyance_sur_les_besoins', placeholder: "...alors..." },
        { type: 'message', content: "\"Si je ne suis pas parfaite, alors...\"" },
        { type: 'text_input', variable: 'croyance_sur_la_perfection', placeholder: "...alors..." },
        { type: 'message', content: "\"Si quelqu'un me rejette, cela signifie que...\"" },
        { type: 'text_input', variable: 'croyance_sur_le_rejet', placeholder: "...cela signifie que..." },
        { type: 'narrative', content: [{"text": "Ma "}, {"text": "métacognition", "bold": true}, {"text": " :"}, {"text": "\n\n"}, {"text": "Comment je perçois ma façon de penser ?", "italic": true}] },
        { type: 'text_input', variable: 'metacognition', placeholder: "Quand j'observe mes pensées, je remarque que...", isLong: true },
        { type: 'message', content: [{"text": "L'"}, {"text": "origine probable", "bold": true}, {"text": " de ces schémas :"}] },
        { type: 'text_input', variable: 'origine_des_schemas', placeholder: "Je pense que ces schémas viennent de...", isLong: true },
        { type: 'narrative', content: [{"text": "Tu viens de faire quelque chose d'"}, {"text": "extraordinaire", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Observer ses pensées, c'est le "}, {"text": "premier pas vers la liberté mentale", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Tu n'es pas tes pensées. Tu es celle qui les "}, {"text": "observe", "italic": true}, {"text": "."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "terminer_ce_formulaire", "label": "Terminer ce formulaire →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Clôture formulaire" },

        { type: 'image', url: "https://images.unsplash.com/photo-1589502425544-692108b08f53?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHNlYXJjaHw3NHx8bWFnbmlmaXF1ZXxlbnwwfDB8fHwxNzU1NDE5ODA0fDA&ixlib=rb-4.1.0&q=80&w=1080", alt: "" },
        { type: 'message', content: [{"text": "🌿 "}, {"text": "Magnifique !", "bold": true}, {"text": " Tu viens de terminer le Formulaire 2.1."}] },
        { type: 'narrative', content: [{"text": "Tu as exploré avec "}, {"text": "courage", "bold": true}, {"text": " :"}, {"text": "\n\n"}, {"text": "✓ L'atmosphère émotionnelle de ton enfance"}, {"text": "\n\n"}, {"text": "✓ Les signaux d'alerte familiaux"}, {"text": "\n\n"}, {"text": "✓ Ce que tu as appris sur l'amour"}, {"text": "\n\n"}, {"text": "✓ Les règles invisibles qui te gouvernent encore"}] },
        { type: 'narrative', content: [{"text": "💡 "}, {"text": "Révélation importante :", "bold": true}, {"text": "\n\n"}, {"text": "Tu viens de faire le lien entre ton "}, {"text": "passé", "bold": true}, {"text": " et tes "}, {"text": "schémas actuels", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "C'est le "}, {"text": "premier pas", "bold": true}, {"text": " pour t'en libérer."}] },
        { type: 'message', content: "Progression Phase 2 : [■□□□□] 1/5 formulaires complétés" },
        { type: 'narrative', content: [{"text": "Le "}, {"text": "Formulaire 2.2", "bold": true}, {"text": " t'attend pour explorer les figures parentales."}, {"text": "\n\n"}, {"text": "Tu y découvriras comment la relation avec tes parents façonne encore tes relations amoureuses aujourd'hui."}] },
        { type: 'message', content: [{"text": "Continue quand tu seras prête... 🌸"}, {"text": "\n\n"}, {"text": "Souviens-toi : chaque pas compte, même les plus petits.", "italic": true}] },

        { type: 'completion', title: "Félicitations !", message: "Tu as terminé F2.1 — Les Fondations. Tes réponses ont été sauvegardées.", icon: '🏗️' }
    ]
};

/* ─── Form Registry ─── */
if (typeof window.FORM_REGISTRY === 'undefined') window.FORM_REGISTRY = {};
window.FORM_REGISTRY['f2-1-fondations'] = F2_1_FONDATIONS;
