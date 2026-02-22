/* ═══════════════════════════════════════
   F2.4 — Le Style d'Attachement
   Converti depuis Typebot · 150 steps · 41 variables
═══════════════════════════════════════ */

const F2_4_ATTACHEMENT = {
    id: 'f2_4_attachement',
    version: 1,
    title: "F2.4 — Le Style d'Attachement",
    icon: '🔗',
    checkboxId: 'f2_4',
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
        "accompagnement_pour_traumas",
        "alarmes_internes",
        "apprentissage_souhaite",
        "benediction_a_transmettre",
        "blessure_abandon_0_10",
        "blessure_humiliation_0_10",
        "blessure_injustice_0_10",
        "blessure_rejet_0_10",
        "blessure_trahison_0_10",
        "ce_qu_ils_ont_quitte_et_cherche",
        "comment_appris_heritage",
        "dua_pour_ancetres",
        "emotions_inexpliquees",
        "experiences_traumatiques",
        "gestion_pressions_familiales",
        "histoire_avec_le_pays",
        "honorer_memoire",
        "impact_culture_sur_amour",
        "impact_des_traumas",
        "impact_trauma_complexe",
        "manifestation_blessure_dominante",
        "message_transgenerationnel",
        "niveau_conformite_famille",
        "parler_a_arriere_grand_mere",
        "partie_creee_pour_survivre",
        "patterns_lignee_feminine",
        "poids_porte",
        "prenom_racines",
        "quotidien_trauma_complexe",
        "rapport_a_la_culture_multiple",
        "reaction_corporelle_intimite",
        "situations_reveil_emotions",
        "situations_trauma_complexe",
        "sort_a_eviter",
        "strategie_equilibre",
        "telephone",
        "tensions_culturelles_mariage",
        "trauma_complexe_en_amour",
        "traumas_familiaux",
        "trouve_vs_espere",
        "type_de_reponse_dominante"
],

    steps: [

        /* ════════════════════════════════════ */
        { type: 'section', title: "Accueil Racines et Blessures" },

        { type: 'image', url: "https://images.unsplash.com/photo-1706900978418-76ef2a3ddbc1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHNlYXJjaHwyMnx8cmFjaW5lc3xlbnwwfDB8fHwxNzU1NDMyMjExfDA&ixlib=rb-4.1.0&q=80&w=1080", alt: "" },
        { type: 'message', content: [{"text": "Formulaire 2.4 : Racines et Blessures", "bold": true, "italic": true}] },
        { type: 'narrative', content: [{"text": "🌿 Tu approches de la fin de ta "}, {"text": "Phase Croissance", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Il est temps d'explorer les "}, {"text": "racines profondes", "bold": true}, {"text": " et les "}, {"text": "blessures fondamentales", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "💡 "}, {"text": "Pourquoi c'est transformateur ?", "bold": true}, {"text": "\n\n"}, {"text": "Tes "}, {"text": "racines culturelles", "bold": true}, {"text": " influencent tes attentes en amour."}, {"text": "\n\n"}, {"text": "Tes "}, {"text": "blessures d'enfance", "bold": true}, {"text": " créent tes patterns de protection."}, {"text": "\n\n"}, {"text": "Les identifier, c'est pouvoir enfin "}, {"text": "guérir", "bold": true}, {"text": "."}] },
        { type: 'message', content: "Rappelle-moi ton prénom :" },
        { type: 'text_input', variable: 'prenom_racines', placeholder: "Ton prénom..." },
        { type: 'phone_input', variable: 'telephone', placeholder: "06 12 34 56 78", defaultPrefix: '+33' },
        { type: 'email_input', variable: 'email', placeholder: "ton.email@exemple.com" },
        { type: 'narrative', content: [{"text": "📍 "}, {"text": "Espace de bienveillance", "bold": true}, {"text": "\n\n"}, {"text": "Cette exploration peut toucher des zones "}, {"text": "sensibles", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Souviens-toi : tu n'es pas tes blessures, tu es celle qui "}, {"text": "les transcende", "bold": true}, {"text": "."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "explorer_mes_racines", "label": "Explorer mes racines →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Préparation racines transplantées" },

        { type: 'narrative', content: [{"text": "💡 "}, {"text": "Découverte importante :", "bold": true}, {"text": "\n\n"}, {"text": "L'histoire migratoire de ta famille porte des "}, {"text": "messages inconscients", "bold": true}, {"text": " sur :"}, {"text": "\n\n"}, {"text": "• Ce qu'on peut espérer de la vie"}, {"text": "\n\n"}, {"text": "• Comment on survit vs comment on vit"}, {"text": "\n\n"}, {"text": "• Ce qu'on mérite en amour"}] },
        { type: 'choice', variable: 'choix', options: [{"id": "raconter_mon_histoire", "label": "Raconter mon histoire →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Racines transplantées" },

        { type: 'message', content: [{"text": "Raconte-moi ton "}, {"text": "histoire avec ce pays", "bold": true}, {"text": " :"}] },
        { type: 'message', content: [{"text": "Es-tu née ici ? Tes parents ? Tes grands-parents ? Tes origines ?", "italic": true}] },
        { type: 'text_input', variable: 'histoire_avec_le_pays', placeholder: "Mon histoire avec ce pays...", isLong: true },
        { type: 'narrative', content: [{"text": "Qu'est-ce que tes parents (ou grands-parents) ont "}, {"text": "quitté", "bold": true}, {"text": " et "}, {"text": "cherché", "bold": true}, {"text": " ?"}] },
        { type: 'text_input', variable: 'ce_qu_ils_ont_quitte_et_cherche', placeholder: "Ils ont quitté... pour chercher...", isLong: true },
        { type: 'narrative', content: [{"text": "Qu'ont-ils "}, {"text": "trouvé", "bold": true}, {"text": " vs ce qu'ils avaient "}, {"text": "espéré", "bold": true}, {"text": " ?"}] },
        { type: 'choice', variable: 'trouve_vs_espere', multiple: true, options: [{"id": "mieux_que_leurs_reves_une", "label": "✨ Mieux que leurs rêves • Une vraie réussite"}, {"id": "different_mais_bien_pas_co", "label": "🔄 Différent mais bien • Pas comme prévu mais satisfaisant"}, {"id": "deception_la_realite_etait", "label": "😔 Déception • La réalité était plus dure"}, {"id": "survie_ils_ont_survecu_ma", "label": "🛡️ Survie • Ils ont survécu mais pas vraiment vécu"}, {"id": "nostalgie_le_cur_reste_au", "label": "💔 Nostalgie • Le cœur resté au pays"}, {"id": "entre_deux_ni_vraiment_d_i", "label": "🌉 Entre-deux • Ni vraiment d'ici ni de là-bas"}, {"id": "reconstruction_tout_rebat", "label": "🏗️ Reconstruction • Tout rebâtir de zéro"}, {"id": "liberation_enfin_libres_d", "label": "🦅 Libération • Enfin libres d'être eux-mêmes"}] },
        { type: 'message', content: [{"text": "Ton rapport à cette "}, {"text": "double/triple culture", "bold": true}, {"text": " :"}] },
        { type: 'choice', variable: 'rapport_a_la_culture_multiple', multiple: true, options: [{"id": "fierte_je_porte_mes_cultur", "label": "🌟 Fierté • Je porte mes cultures avec honneur"}, {"id": "tiraillement_entre_deux_mo", "label": "🎭 Tiraillement • Entre deux mondes, deux codes"}, {"id": "rejet_j_ai_voulu_m_eloigne", "label": "🚫 Rejet • J'ai voulu m'éloigner de mes origines"}, {"id": "melange_creatif_j_ai_cree", "label": "🎨 Mélange créatif • J'ai créé ma propre synthèse"}, {"id": "invisibilisation_je_cache", "label": "👤 Invisibilisation • Je cache certaines parties"}, {"id": "en_recherche_je_redecouvre", "label": "🔍 En recherche • Je redécouvre mes racines"}, {"id": "confusion_je_ne_sais_pas_o", "label": "❓ Confusion • Je ne sais pas où je me situe"}, {"id": "richesse_c_est_ma_force_un", "label": "💎 Richesse • C'est ma force unique"}] },
        { type: 'message', content: [{"text": "Comment cette histoire "}, {"text": "impacte tes choix amoureux", "bold": true}, {"text": " ?"}] },
        { type: 'text_input', variable: 'impact_culture_sur_amour', placeholder: "Dans mes relations, cette histoire se traduit par...", isLong: true },
        { type: 'narrative', content: [{"text": "Le "}, {"text": "message transgénérationnel", "bold": true}, {"text": " sur l'amour que tu as reçu :"}, {"text": "\n\n"}, {"text": "Exemples : ", "italic": true}, {"text": "\n\n"}, {"text": "\"L'amour doit se mériter\" ", "italic": true}, {"text": "\n\n"}, {"text": "\"Les femmes doivent se sacrifier pour leur famille\" ", "italic": true}, {"text": "\n\n"}, {"text": "\"Les hommes ne montrent pas leurs émotions\" ", "italic": true}, {"text": "\n\n"}, {"text": "\"Il faut souffrir pour être aimé\" ", "italic": true}, {"text": "\n\n"}, {"text": "\"L'amour vient avec le temps\" ", "italic": true}, {"text": "\n\n"}, {"text": "\"On ne divorce pas, on endure\" ", "italic": true}, {"text": "\n\n"}, {"text": "\"L'amour rend vulnérable et faible\" ", "italic": true}, {"text": "\n\n"}, {"text": "\"Il faut choisir entre carrière et amour\" ", "italic": true}] },
        { type: 'text_input', variable: 'message_transgenerationnel', placeholder: "Inconsciemment, j'ai appris que l'amour...", isLong: true },
        { type: 'narrative', content: [{"text": "Qu'est-ce que tu as "}, {"text": "observé dans le couple de tes parents ", "bold": true}, {"text": "? Quelles phrases revenaient souvent "}, {"text": "sur l'amour/le mariage", "bold": true}, {"text": " ?  Quels "}, {"text": "sacrifices ou compromis étaient valorisés", "bold": true}, {"text": " ? Comment "}, {"text": "l'affection était-elle exprimée (ou non)", "bold": true}, {"text": " dans ta famille ?"}] },
        { type: 'text_input', variable: 'reponse', placeholder: "Dans ma famille ..." },
        { type: 'choice', variable: 'choix', options: [{"id": "prendre_une_pause", "label": "Prendre une pause →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Pause transition" },

        { type: 'image', url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4", alt: "" },
        { type: 'message', content: [{"text": "🌸 "}, {"text": "Pause intégration", "bold": true}] },
        { type: 'narrative', content: [{"text": "Tu viens d'explorer des "}, {"text": "héritages profonds", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Ces racines font partie de ta "}, {"text": "richesse", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Respire. Tu portes une histoire "}, {"text": "puissante", "bold": true}, {"text": "."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "explorer_mes_blessures_fondame", "label": "Explorer mes blessures fondamentales →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Préparation blessures" },

        { type: 'message', content: [{"text": "📍 Explorons maintenant tes "}, {"text": "5 blessures fondamentales", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "💡 "}, {"text": "Selon Lise Bourbeau :", "bold": true}, {"text": "\n\n"}, {"text": "Nous portons tous des blessures d'enfance qui créent nos "}, {"text": "masques de protection", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Ces masques nous protègent... mais nous "}, {"text": "empêchent d'aimer pleinement", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "Tout le monde a des blessures. C'est "}, {"text": "humain", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Les identifier, c'est le premier pas vers la "}, {"text": "guérison", "bold": true}, {"text": "."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "evaluer_mes_blessures", "label": "Évaluer mes blessures →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Blessures fondamentales" },

        { type: 'narrative', content: [{"text": "Pour chaque blessure, évalue son "}, {"text": "intensité", "bold": true}, {"text": " de 0 à 10 :"}, {"text": "\n\n"}, {"text": "0 = pas du tout présente | 10 = très intense", "italic": true}] },
        { type: 'narrative', content: [{"text": "💔 "}, {"text": "Blessure d'ABANDON", "bold": true}, {"text": "\n\n"}, {"text": "Tu as peur d'être laissée, tu t'accroches, tu as besoin de réassurance constante.", "italic": true}] },
        { type: 'text_input', variable: 'blessure_abandon_0_10', placeholder: "0-10" },
        { type: 'narrative', content: [{"text": "🚫 "}, {"text": "Blessure de REJET", "bold": true}, {"text": "\n\n"}, {"text": "Tu te sens \"pas assez bien\", tu fuis avant qu'on te rejette, tu te sabotes.", "italic": true}] },
        { type: 'text_input', variable: 'blessure_rejet_0_10', placeholder: "0-10" },
        { type: 'narrative', content: [{"text": "🗡️ "}, {"text": "Blessure de TRAHISON", "bold": true}, {"text": "\n\n"}, {"text": "Tu contrôles tout, tu ne fais pas confiance, tu vérifies constamment.", "italic": true}] },
        { type: 'text_input', variable: 'blessure_trahison_0_10', placeholder: "0-10" },
        { type: 'narrative', content: [{"text": "😳 "}, {"text": "Blessure d'HUMILIATION", "bold": true}, {"text": "\n\n"}, {"text": "Tu as honte de tes besoins, tu te sacrifies, tu minimises tes désirs.", "italic": true}] },
        { type: 'text_input', variable: 'blessure_humiliation_0_10', placeholder: "0-10" },
        { type: 'narrative', content: [{"text": "⚖️ "}, {"text": "Blessure d'INJUSTICE", "bold": true}, {"text": "\n\n"}, {"text": "Tu es perfectionniste, rigide, tu ne supportes pas les \"c'est pas juste\".", "italic": true}] },
        { type: 'text_input', variable: 'blessure_injustice_0_10', placeholder: "0-10" },
        { type: 'message', content: [{"text": "Ta blessure "}, {"text": "dominante", "bold": true}, {"text": " se manifeste en amour par :"}] },
        { type: 'text_input', variable: 'manifestation_blessure_dominante', placeholder: "Dans mes relations, cette blessure me fait...", isLong: true },
        { type: 'message', content: [{"text": "🆕 Quelle "}, {"text": "\"partie\" de toi", "bold": true}, {"text": " s'est créée pour survivre à cette blessure ?"}] },
        { type: 'message', content: [{"text": "Exemple : \"La guerrière qui ne montre jamais sa vulnérabilité\" ou \"La petite fille qui veut plaire à tout prix\"...", "italic": true}] },
        { type: 'text_input', variable: 'partie_creee_pour_survivre', placeholder: "La partie de moi qui s'est créée est...", isLong: true },
        { type: 'message', content: [{"text": "Bravo pour ta vulnérabilité et pour avoir osé regarder tes "}, {"text": "blessures en face", "bold": true}, {"text": " avec courage."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "explorer_plus_profondement", "label": "Explorer plus profondément →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Préparation blessures traumatiques" },

        { type: 'message', content: [{"text": "💡 "}, {"text": "Explorons avec douceur ", "bold": true}, {"text": "des expériences qui peuvent expliquer tes patterns"}] },
        { type: 'message', content: "📍 Ces questions demandent du courage. Tu peux les ignorer si c'est trop difficile aujourd'hui." },
        { type: 'choice', variable: 'choix', options: [{"id": "je_suis_prete_a_explorer", "label": "Je suis prête à explorer →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Exploration blessures traumatiques" },

        { type: 'message', content: "As-tu vécu des expériences qui ont marqué profondément ta relation au toucher ou à l'intimité ?" },
        { type: 'choice', variable: 'experiences_traumatiques', multiple: true, options: [{"id": "non_rien_de_significatif", "label": "😌 Non, rien de significatif"}, {"id": "oui_des_experiences_diffici", "label": "🤕 Oui, des expériences difficiles dans l'enfance"}, {"id": "oui_des_relations_toxiques", "label": "💔 Oui, des relations toxiques/violentes à l'âge adulte"}, {"id": "oui_plusieurs_experiences_a", "label": "🌊 Oui, plusieurs expériences à différents âges"}, {"id": "je_prefere_ne_pas_en_parler", "label": "🤐 Je préfère ne pas en parler maintenant"}, {"id": "oui_mais_j_ai_deja_fait_un", "label": "🙏 Oui, mais j'ai déjà fait un travail de guérison"}] },
        { type: 'message', content: "Si tu as coché \"oui\", veux tu en partager plus ? Ces expériences affectent-elles encore tes relations ? " },
        { type: 'text_input', variable: 'impact_des_traumas', placeholder: "Je remarque que...", isLong: true },
        { type: 'message', content: "As-tu déjà été accompagnée pour ces blessures ?" },
        { type: 'choice', variable: 'accompagnement_pour_traumas', multiple: true, options: [{"id": "therapie_individuelle", "label": "🧠 Thérapie individuelle"}, {"id": "therapie_de_groupe", "label": "👥 Thérapie de groupe"}, {"id": "accompagnement_spirituel", "label": "🤲 Accompagnement spirituel"}, {"id": "travail_personnel_livres_f", "label": "📚 Travail personnel (livres, formations)"}, {"id": "jamais_encore", "label": "❌ Jamais encore"}, {"id": "je_m_en_suis_sortie_seule", "label": "💪 Je m'en suis sortie seule"}] },
        { type: 'message', content: "Comment ton corps réagit-il dans l'intimité émotionnelle ?" },
        { type: 'text_input', variable: 'reaction_corporelle_intimite', placeholder: "Quand quelqu'un se rapproche émotionnellement...", isLong: true },
        { type: 'message', content: "Tu fais preuve de courage en explorant ces territoires." },
        { type: 'choice', variable: 'choix', options: [{"id": "continuer_l_exploration", "label": "Continuer l'exploration →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Préparation trauma complexe" },

        { type: 'message', content: [{"text": "💔 "}, {"text": "Les Blessures Répétées", "bold": true}] },
        { type: 'narrative', content: [{"text": "💡 Au-delà des blessures ponctuelles, certaines d'entre nous portent des blessures creusées par la "}, {"text": "répétition", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Le trauma complexe, c'est quand la blessure n'est pas UN événement, mais une accumulation."}, {"text": "\n\n"}, {"text": "Comme des gouttes d'eau qui finissent par creuser la pierre.", "italic": true}] },
        { type: 'choice', variable: 'choix', options: [{"id": "explorer_mes_blessures_repetee", "label": "Explorer mes blessures répétées →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Exploration trauma complexe" },

        { type: 'message', content: [{"text": "As-tu vécu des situations blessantes de façon répétée dans ton enfance/adolescence ?"}, {"text": "\n\n"}, {"text": "(Ce n'est pas l'intensité qui compte, mais la répétition)", "italic": true}] },
        { type: 'choice', variable: 'situations_trauma_complexe', multiple: true, options: [{"id": "critiques_constantes_tu_n", "label": "🔄 Critiques constantes • \"Tu n'es jamais assez bien\""}, {"id": "negligence_emotionnelle_te", "label": "😶 Négligence émotionnelle • Tes besoins ignorés systématiquement"}, {"id": "invalidation_repetee_tu_e", "label": "🎭 Invalidation répétée • \"Tu exagères toujours\""}, {"id": "ambiance_imprevisible_ne_j", "label": "⚡ Ambiance imprévisible • Ne jamais savoir à quoi s'attendre"}, {"id": "rejet_recurrent_sentiment", "label": "🚫 Rejet récurrent • Sentiment d'être de trop"}, {"id": "abandon_emotionnel_presenc", "label": "👻 Abandon émotionnel • Présence physique mais absence affective"}, {"id": "responsabilites_inadaptees", "label": "🎯 Responsabilités inadaptées • Parentification, rôle d'adulte trop tôt"}, {"id": "isolement_impose_coupee_du", "label": "🔒 Isolement imposé • Coupée du monde extérieur"}, {"id": "trahisons_multiples_promes", "label": "💔 Trahisons multiples • Promesses brisées encore et encore"}, {"id": "chaos_chronique_instabili", "label": "🌪️ Chaos chronique • Instabilité permanente"}] },
        { type: 'message', content: "Raconte-moi comment c'était au quotidien :" },
        { type: 'text_input', variable: 'quotidien_trauma_complexe', placeholder: "Au quotidien, je vivais dans une atmosphère où...", isLong: true },
        { type: 'message', content: [{"text": "Comment ces expériences répétées ont façonné ta façon d'être en relation ?"}, {"text": "\n\n"}, {"text": "Par exemple : hypervigilance, difficulté à faire confiance, attente du pire...", "italic": true}] },
        { type: 'text_input', variable: 'impact_trauma_complexe', placeholder: "À cause de ces répétitions, aujourd'hui je...", isLong: true },
        { type: 'message', content: "Quelles \"alarmes internes\" se sont développées en toi ?" },
        { type: 'choice', variable: 'alarmes_internes', multiple: true, options: [{"id": "je_detecte_le_moindre_change", "label": "🚨 Je détecte le moindre changement d'humeur"}, {"id": "je_scrute_les_micro_express", "label": "👁️ Je scrute les micro-expressions"}, {"id": "j_anticipe_toujours_le_rejet", "label": "🔮 J'anticipe toujours le rejet/conflit"}, {"id": "je_me_prepare_constamment_a", "label": "🛡️ Je me prépare constamment au pire"}, {"id": "je_capte_l_energie_des_autre", "label": "📡 Je capte l'énergie des autres instantanément"}, {"id": "je_deviens_qui_on_veut_que_j", "label": "🎪 Je deviens qui on veut que je sois"}, {"id": "je_me_coupe_de_mes_emotions", "label": "❄️ Je me coupe de mes émotions préventivement"}, {"id": "je_fuis_avant_que_ca_degener", "label": "🏃 Je fuis avant que ça dégénère"}, {"id": "je_sur_performe_pour_eviter", "label": "🎭 Je sur-performe pour éviter les critiques"}] },
        { type: 'message', content: "Dans tes relations amoureuses, comment ce trauma complexe se manifeste ?" },
        { type: 'text_input', variable: 'trauma_complexe_en_amour', placeholder: "Dans mes relations, ces vieilles blessures font que je...", isLong: true },
        { type: 'message', content: "💡 Sais-tu que le trauma complexe peut créer 4 types de réponses ?\n\nLaquelle est ta dominante en amour ?" },
        { type: 'choice', variable: 'type_de_reponse_dominante', options: [{"id": "fight_combat_j_attaque_a", "label": "🥊 Fight (Combat) • J'attaque avant d'être attaquée"}, {"id": "flight_fuite_je_pars_des", "label": "🏃 Flight (Fuite) • Je pars dès que ça devient difficile"}, {"id": "freeze_gel_je_me_paraly", "label": "❄️ Freeze (Gel) • Je me paralyse, incapable d'agir"}, {"id": "fawn_soumission_je_me_su", "label": "🤝 Fawn (Soumission) • Je me sur-adapte pour maintenir la paix"}] },
        { type: 'message', content: "Comment aimerais-tu apprendre à répondre différemment ?" },
        { type: 'text_input', variable: 'apprentissage_souhaite', placeholder: "J'aimerais apprendre à...", isLong: true },
        { type: 'choice', variable: 'choix', options: [{"id": "explorer_l_heritage_invisible", "label": "Explorer l'héritage invisible →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Préparation héritage épigénétique" },

        { type: 'message', content: [{"text": "💫 "}, {"text": "L'Héritage Invisible", "bold": true}] },
        { type: 'message', content: [{"text": "🧬 Prendre une pause profonde... Nous entrons dans un "}, {"text": "territoire sacré", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "💡 "}, {"text": "La sagesse moderne rejoint la sagesse ancienne :", "bold": true}, {"text": "\n\n"}, {"text": "La science découvre ce que nos ancêtres savaient : les blessures se transmettent dans le sang, dans l'âme, à travers les générations."}, {"text": "\n\n"}, {"text": "Tes réactions \"inexpliquées\", tes peurs sans origine claire, tes patterns mystérieux... ils portent peut-être la mémoire de tes grands-mères."}] },
        { type: 'message', content: "Parfois, nous portons ce qui ne nous appartient pas.\n\nComprendre cet héritage, c'est le premier pas pour s'en libérer." },
        { type: 'choice', variable: 'choix', options: [{"id": "explorer_mon_heritage_transgen", "label": "Explorer mon héritage transgénérationnel →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Exploration héritage épigénétique" },

        { type: 'narrative', content: [{"text": "🌊 "}, {"text": "EXPLORATION DE L'HÉRITAGE TRAUMATIQUE", "bold": true}, {"text": "\n\n"}, {"text": "Y a-t-il des traumatismes majeurs dans l'histoire de ta famille ?"}, {"text": "\n\n"}, {"text": "Tu peux en cocher plusieurs - même les histoires \"floues\" comptent", "italic": true}] },
        { type: 'choice', variable: 'traumas_familiaux', multiple: true, options: [{"id": "exil_migration_forcee_dera", "label": "🏠 Exil/migration forcée • Déracinement, perte de terre natale"}, {"id": "guerres_conflits_violence", "label": "⚔️ Guerres/conflits • Violence vécue par tes ancêtres"}, {"id": "pertes_traumatiques_enfant", "label": "💔 Pertes traumatiques • Enfants morts, époux perdus tragiquement"}, {"id": "famines_pauvrete_extreme_s", "label": "🌾 Famines/pauvreté extrême • Survie, manque profond"}, {"id": "persecutions_religieuses_po", "label": "🏛️ Persécutions religieuses/politiques • Oppression, clandestinité"}, {"id": "ruine_perte_soudaine_de_stat", "label": "💰 Ruine/perte soudaine de statut • Chute sociale brutale"}, {"id": "secrets_de_famille_lourds", "label": "🤐 Secrets de famille lourds • Non-dits qui empoisonnent"}, {"id": "maladies_graves_recurrentes", "label": "🏥 Maladies graves récurrentes • Patterns de souffrance physique"}, {"id": "violences_abus_trauma_sexu", "label": "🔒 Violences/abus • Trauma sexuel ou physique"}, {"id": "pertes_perinatales_repetees", "label": "👶 Pertes périnatales répétées • Fausses couches, mortalité infantile"}, {"id": "trahisons_financieres_arna", "label": "💸 Trahisons financières • Arnaques, spoliations"}, {"id": "rien_de_particulier_que_je_c", "label": "❌ Rien de particulier que je connaisse"}] },
        { type: 'message', content: "Comment as-tu appris ces histoires familiales ?" },
        { type: 'text_input', variable: 'comment_appris_heritage', placeholder: "J'ai découvert que... à travers...", isLong: true },
        { type: 'narrative', content: [{"text": "🔮 "}, {"text": "ÉMOTIONS INEXPLIQUÉES", "bold": true}, {"text": "\n\n"}, {"text": "Quelles émotions \"venues de nulle part\" traversent parfois ton être ?"}, {"text": "\n\n"}, {"text": "Ces émotions qui surgissent sans cause apparente, comme si elles appartenaient à une autre époque...", "italic": true}] },
        { type: 'text_input', variable: 'emotions_inexpliquees', placeholder: "Parfois je ressens une tristesse/peur/colère/honte qui semble venir de nulle part, comme si...", isLong: true },
        { type: 'message', content: "Dans quelles situations ces émotions ancestrales se réveillent ?" },
        { type: 'choice', variable: 'situations_reveil_emotions', multiple: true, options: [{"id": "quand_je_pense_au_mariage", "label": "🏠 Quand je pense au mariage • Peur inexpliquée"}, {"id": "questions_d_argent_anxiete", "label": "💰 Questions d'argent • Anxiété disproportionnée"}, {"id": "autour_de_la_maternite_ter", "label": "👶 Autour de la maternité • Terreurs profondes"}, {"id": "voyages_deplacements_paniq", "label": "🌍 Voyages/déplacements • Panique du déracinement"}, {"id": "garder_des_secrets_poids_m", "label": "🤐 Garder des secrets • Poids mystérieux"}, {"id": "en_groupe_social_sentiment", "label": "👥 En groupe social • Sentiment de ne pas appartenir"}, {"id": "face_a_l_autorite_peur_vi", "label": "🏛️ Face à l'autorité • Peur viscérale"}, {"id": "perte_abandon_douleur_deme", "label": "💔 Perte/abandon • Douleur démesurée"}, {"id": "dans_la_spiritualite_culpa", "label": "🕌 Dans la spiritualité • Culpabilité inexpliquée"}] },
        { type: 'narrative', content: [{"text": "🔄 "}, {"text": "PATTERNS TRANSGÉNÉRATIONNELS", "bold": true}, {"text": "\n\n"}, {"text": "Y a-t-il des schémas qui se répètent mystérieusement dans ta lignée féminine ?"}, {"text": "\n\n"}, {"text": "Regarde tes grand-mères, arrière-grand-mères, tantes... Que vois-tu ?", "italic": true}] },
        { type: 'text_input', variable: 'patterns_lignee_feminine', placeholder: "Dans ma lignée féminine, il y a souvent... (séparations, difficultés financières, problèmes de santé, solitude...)", isLong: true },
        { type: 'message', content: "Quel est le \"sort\" que tu as peur de reproduire ?" },
        { type: 'text_input', variable: 'sort_a_eviter', placeholder: "J'ai parfois peur de finir comme... parce que...", isLong: true },
        { type: 'message', content: "Te sens-tu parfois porter le poids d'une histoire qui n'est pas la tienne ?" },
        { type: 'text_input', variable: 'poids_porte', placeholder: "J'ai l'impression de porter le fardeau de... comme si c'était ma responsabilité de...", isLong: true },
        { type: 'message', content: [{"text": "🤲 "}, {"text": "GUÉRISON TRANSGÉNÉRATIONNELLE", "bold": true}] },
        { type: 'message', content: "Quelle du'a fais-tu pour tes ancêtres ?" },
        { type: 'text_input', variable: 'dua_pour_ancetres', placeholder: "Pour mes grands-mères et arrière-grands-mères, je demande à Allah...", isLong: true },
        { type: 'message', content: "Comment honores-tu la mémoire de tes aïeules ?" },
        { type: 'text_input', variable: 'honorer_memoire', placeholder: "Pour honorer leur mémoire, je...", isLong: true },
        { type: 'message', content: "Quelle bénédiction veux-tu transmettre pour \"guérir\" la lignée ?" },
        { type: 'text_input', variable: 'benediction_a_transmettre', placeholder: "Pour mes filles/la génération suivante, je veux briser le cycle de... et transmettre...", isLong: true },
        { type: 'message', content: "Si tu pouvais parler à tta grand-mère ou ton arrière-grand-mère, que lui dirais-tu ?" },
        { type: 'text_input', variable: 'parler_a_arriere_grand_mere', placeholder: "Grand-mère, je veux que tu saches que...", isLong: true },
        { type: 'message', content: [{"text": "Tu as le courage d'explorer les mémoires transgénérationnelles et de choisir consciemment ce que tu transmets."}, {"text": "\n\n"}, {"text": "\"Celui qui brise un cycle négatif peut sauver sept générations.\"", "italic": true}] },
        { type: 'choice', variable: 'choix', options: [{"id": "explorer_mes_tensions_culturel", "label": "Explorer mes tensions culturelles →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Exploration dimension culturelle" },

        { type: 'message', content: "Le niveau de \"conformité\" attendu par ta famille :" },
        { type: 'choice', variable: 'niveau_conformite_famille', options: [{"id": "liberte_totale_de_choix", "label": "🕊️ Liberté totale de choix"}, {"id": "concertation_mais_decision_f", "label": "🤝 Concertation mais décision finale mienne"}, {"id": "negociation_necessaire", "label": "⚖️ Négociation nécessaire"}, {"id": "forte_pression_pour_certains", "label": "👥 Forte pression pour certains critères"}, {"id": "peu_de_marge_de_manuvre", "label": "🔒 Peu de marge de manœuvre"}, {"id": "messages_contradictoires", "label": "❓ Messages contradictoires"}] },
        { type: 'message', content: "Tes plus grandes tensions culturelles concernant le mariage :" },
        { type: 'choice', variable: 'tensions_culturelles_mariage', multiple: true, options: [{"id": "origine_ethnique_du_futur_ep", "label": "🌍 Origine ethnique du futur époux"}, {"id": "niveau_d_etudes_statut_socia", "label": "🎓 Niveau d'études/statut social"}, {"id": "situation_financiere", "label": "💰 Situation financière"}, {"id": "niveau_de_religiosite", "label": "🧔 Niveau de religiosité"}, {"id": "approbation_de_sa_fami", "label": "👨‍👩‍👧‍👦 Approbation de sa famille"}, {"id": "age_limite_selon_eux", "label": "⏰ Âge \"limite\" selon eux"}, {"id": "lieu_de_residence_apres_mari", "label": "🏠 Lieu de résidence après mariage"}, {"id": "timing_pour_les_enfants", "label": "👶 Timing pour les enfants"}, {"id": "ma_carriere_vs_vie_de_famill", "label": "💼 Ma carrière vs vie de famille"}, {"id": "aucune_tension_particuliere", "label": "❌ Aucune tension particulière"}] },
        { type: 'message', content: "Comment gères-tu ces pressions familiales ?" },
        { type: 'text_input', variable: 'gestion_pressions_familiales', placeholder: "Face aux attentes familiales...", isLong: true },
        { type: 'message', content: "Ta stratégie pour l'équilibre autonomie/respect familial :" },
        { type: 'text_input', variable: 'strategie_equilibre', placeholder: "Pour honorer ma famille tout en restant authentique...", isLong: true },
        { type: 'choice', variable: 'choix', options: [{"id": "terminer_ce_formulaire", "label": "Terminer ce formulaire →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Clôture formulaire" },

        { type: 'image', url: "https://images.unsplash.com/photo-1667673917908-f5a902a1bfb2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHNlYXJjaHw0fHxjbG90dXJlfGVufDB8MHx8fDE3NTU0MzU5MTN8MA&ixlib=rb-4.1.0&q=80&w=1080", alt: "" },
        { type: 'message', content: "🌿 Tu viens de terminer le Formulaire 2.4." },
        { type: 'narrative', content: [{"text": "Tu as exploré des territoires "}, {"text": "très profonds", "bold": true}, {"text": " :"}, {"text": "\n\n"}, {"text": "✓ Tes racines transplantées et leur héritage"}, {"text": "\n\n"}, {"text": "✓ L'impact de ton histoire culturelle sur l'amour"}, {"text": "\n\n"}, {"text": "✓ Tes 5 blessures fondamentales"}, {"text": "\n\n"}, {"text": "✓ Les parties de toi créées pour survivre"}, {"text": "\n\n"}, {"text": "✓ Les blessures traumatiques et leur impact"}, {"text": "\n\n"}, {"text": "✓ Les traumas complexes et tes mécanismes de survie"}, {"text": "\n\n"}, {"text": "✓ L'héritage transgénérationnel de ta lignée"}, {"text": "\n\n"}, {"text": "✓ Les tensions culturelles dans tes choix amoureux"}] },
        { type: 'narrative', content: [{"text": "💡 "}, {"text": "Transformation profonde en cours :", "bold": true}, {"text": "\n\n"}, {"text": "Nommer ses blessures, c'est "}, {"text": "commencer à guérir", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Comprendre son héritage, c'est pouvoir "}, {"text": "choisir ce qu'on transmet", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Tu n'es plus obligée de porter ces masques qui t'épuisent."}] },
        { type: 'message', content: "Progression Phase 2 : [■■■■□] 4/5 formulaires complétés" },
        { type: 'narrative', content: [{"text": "Le "}, {"text": "Formulaire 2.5", "bold": true}, {"text": " t'attend pour explorer tes stratégies de survie et ton rapport au corps."}, {"text": "\n\n"}, {"text": "C'est le dernier formulaire de cette phase !"}] },
        { type: 'message', content: [{"text": "Tu es si proche de compléter cette phase... 🌸"}, {"text": "\n\n"}, {"text": "Tes blessures ne définissent pas qui tu es, elles révèlent ta force.", "italic": true}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Préparation dimension culturelle" },

        { type: 'message', content: [{"text": "🌍 "}, {"text": "Tensions culturelles et choix personnel", "bold": true}] },
        { type: 'message', content: [{"text": "💡 "}, {"text": "Naviguer entre héritage familial et autonomie personnelle", "bold": true}] },
        { type: 'choice', variable: 'choix', options: [{"id": "explorer_mes_tensions_culturel", "label": "Explorer mes tensions culturelles →"}] },

        { type: 'completion', title: "Félicitations !", message: "Tu as terminé F2.4 — Le Style d'Attachement. Tes réponses ont été sauvegardées.", icon: '🔗' }
    ]
};

/* ─── Form Registry ─── */
if (typeof window.FORM_REGISTRY === 'undefined') window.FORM_REGISTRY = {};
window.FORM_REGISTRY['f2-4-attachement'] = F2_4_ATTACHEMENT;
