/* ═══════════════════════════════════════
   F2.2 — L'Héritage Émotionnel
   Converti depuis Typebot · 93 steps · 22 variables
═══════════════════════════════════════ */

const F2_2_HERITAGE = {
    id: 'f2_2_heritage',
    version: 1,
    title: "F2.2 — L'Héritage Émotionnel",
    icon: '🧬',
    checkboxId: 'f2_2',
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
        "expression_amour_pere",
        "gestion_des_conflits",
        "homme_non_realise_pere",
        "impact_cognitif_sur_les_relations",
        "impact_relation_mere",
        "impact_relation_pere",
        "langage_amour_mere",
        "lecon_emotions_hommes",
        "message_a_la_mere",
        "message_au_pere",
        "moment_valorisation_pere",
        "prenom_figures",
        "presence_maternelle",
        "presence_paternelle",
        "regard_de_la_mere",
        "ressemblance_a_la_mere",
        "style_d_apprentissage",
        "style_de_communication",
        "style_de_prise_de_decision",
        "style_de_traitement_de_l_information",
        "telephone",
        "type_de_memoire"
],

    steps: [

        /* ════════════════════════════════════ */
        { type: 'section', title: "Accueil Figures Parentales" },

        { type: 'image', url: "https://images.unsplash.com/photo-1476234251651-f353703a034d", alt: "" },
        { type: 'message', content: [{"text": "Formulaire 2.2 : Les Figures Parentales", "bold": true, "italic": true}] },
        { type: 'narrative', content: [{"text": "🌿 Bienvenue dans cette nouvelle exploration de ta "}, {"text": "Phase Croissance", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Après avoir exploré l'atmosphère de ton enfance, j'aimerais maintenant comprendre les "}, {"text": "figures qui t'ont façonnée", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "💡 "}, {"text": "Pourquoi explorer tes parents ?", "bold": true}, {"text": "\n\n"}, {"text": "Ta relation avec ta mère a créé ton "}, {"text": "modèle de recevoir l'amour", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Ta relation avec ton père a façonné ton "}, {"text": "modèle de l'homme idéal", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Comprendre ces empreintes, c'est "}, {"text": "réécrire ton histoire amoureuse", "bold": true}, {"text": "."}] },
        { type: 'message', content: "Avant de continuer, rappelle-moi tes coordonnées :" },
        { type: 'message', content: "Ton prénom ?" },
        { type: 'text_input', variable: 'prenom_figures', placeholder: "Ton prénom..." },
        { type: 'phone_input', variable: 'telephone', placeholder: "06 12 34 56 78", defaultPrefix: '+33' },
        { type: 'email_input', variable: 'email', placeholder: "ton.email@exemple.com" },
        { type: 'narrative', content: [{"text": "📍 "}, {"text": "Important", "bold": true}, {"text": " : Explorer nos parents peut réveiller beaucoup d'émotions."}, {"text": "\n\n"}, {"text": "Il n'y a pas de "}, {"text": "\"bons\" ou \"mauvais\" parents", "bold": true}, {"text": " ici."}, {"text": "\n\n"}, {"text": "Juste des humains qui ont fait de leur mieux avec leurs propres blessures."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "explorer_ma_relation_maternell", "label": "Explorer ma relation maternelle →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Préparation portrait maternel" },

        { type: 'message', content: [{"text": "📍 Commençons par explorer ta "}, {"text": "relation avec ta mère", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "💡 "}, {"text": "Ce que tu vas découvrir :", "bold": true}, {"text": "\n\n"}, {"text": "• Pourquoi tu "}, {"text": "acceptes ou refuses", "bold": true}, {"text": " l'amour d'une certaine façon"}, {"text": "\n\n"}, {"text": "• D'où vient ton "}, {"text": "sentiment de mériter", "bold": true}, {"text": " (ou non) l'amour"}, {"text": "\n\n"}, {"text": "• Comment tu "}, {"text": "reproduis ou évites", "bold": true}, {"text": " ses patterns"}] },
        { type: 'narrative', content: [{"text": "Ta mère était elle-même une femme avec ses propres blessures et limitations."}, {"text": "\n\n"}, {"text": "Explorer cette relation, c'est "}, {"text": "comprendre, pas juger", "bold": true}, {"text": "."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "dessiner_son_portrait_emotionn", "label": "Dessiner son portrait émotionnel →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Portrait maternel" },

        { type: 'narrative', content: [{"text": "Voyons d'abord la "}, {"text": "présence émotionnelle", "bold": true}, {"text": " de ta mère."}, {"text": "\n\n"}, {"text": "Si tu devais la décrire :"}] },
        { type: 'choice', variable: 'presence_maternelle', multiple: true, options: [{"id": "presente_et_enveloppante_pa", "label": "🌊 Présente et enveloppante, parfois envahissante"}, {"id": "dynamique_toujours_en_mouv", "label": "🏞️ Dynamique, toujours en mouvement"}, {"id": "calme_en_surface_profondeu", "label": "🏔️ Calme en surface, profondeurs mystérieuses"}, {"id": "presente_par_intermittence", "label": "🌧️ Présente par intermittence"}, {"id": "presente_mais_insaisissable", "label": "Présente mais insaisissable"}, {"id": "genereuse_donne_sans_compte", "label": "💧 Généreuse, donne sans compter"}, {"id": "hauts_et_bas_selon_ses_humeu", "label": "🌊 Hauts et Bas selon ses humeurs, imprévisible"}, {"id": "imposante_et_charismatique", "label": "🏞️ Imposante et charismatique, difficile à approcher"}, {"id": "aride_emotionnellement_peu", "label": "🏜️ Aride émotionnellement, peu de tendresse"}, {"id": "chaotique_et_menacante", "label": "⛈️ Chaotique et menaçante"}] },
        { type: 'message', content: [{"text": "Cette description en dit long sur la façon dont tu as "}, {"text": "appris à recevoir l'amour", "bold": true}, {"text": "."}] },
        { type: 'message', content: [{"text": "Comment ta mère "}, {"text": "exprimait son amour", "bold": true}, {"text": " ?"}] },
        { type: 'narrative', content: [{"text": "Son "}, {"text": "langage d'amour principal", "bold": true}, {"text": " était :"}, {"text": "\n\n"}, {"text": "(Tu peux en choisir plusieurs)", "italic": true}] },
        { type: 'choice', variable: 'langage_amour_mere', multiple: true, options: [{"id": "actes_de_service_cuisiner", "label": "🍳 Actes de service • Cuisiner, nettoyer, organiser"}, {"id": "paroles_valorisantes_compl", "label": "💬 Paroles valorisantes • Compliments, encouragements"}, {"id": "temps_de_qualite_presence", "label": "⏰ Temps de qualité • Présence, écoute, activités ensemble"}, {"id": "cadeaux_offrir_des_present", "label": "🎁 Cadeaux • Offrir des présents, gâter matériellement"}, {"id": "contact_physique_calins_b", "label": "🤗 Contact physique • Câlins, bisous, caresses"}, {"id": "critiques_bienveillantes", "label": "📏 Critiques \"bienveillantes\" • Pour que tu deviennes meilleure"}, {"id": "sacrifice_se_priver_pour", "label": "🕊️ Sacrifice • Se priver pour toi, rappeler ses efforts"}, {"id": "controle_surveiller_prote", "label": "🔐 Contrôle • Surveiller, protéger, décider pour toi"}, {"id": "peu_d_expressions_l_amour", "label": "🌑 Peu d'expressions • L'amour était supposé, pas montré"}, {"id": "sous_conditions_quand_tu_r", "label": "🎯 Sous conditions • Quand tu réussissais ou obéissais"}] },
        { type: 'message', content: [{"text": "Maintenant, une question "}, {"text": "profonde", "bold": true}, {"text": " :"}] },
        { type: 'narrative', content: [{"text": "Complète cette phrase : "}, {"text": "\"Aux yeux de ma mère, j'étais...\"", "bold": true}, {"text": "\n\n"}, {"text": "Exemples : sa fierté, son fardeau, sa rivale, son bébé, sa confidente...", "italic": true}] },
        { type: 'text_input', variable: 'regard_de_la_mere', placeholder: "Aux yeux de ma mère, j'étais...", isLong: true },
        { type: 'message', content: [{"text": "Comment cela affecte ta "}, {"text": "capacité à recevoir l'amour", "bold": true}, {"text": " aujourd'hui ?"}] },
        { type: 'text_input', variable: 'impact_relation_mere', placeholder: "Dans mes relations, je remarque que je...", isLong: true },
        { type: 'message', content: [{"text": "Si tu pouvais dire "}, {"text": "UNE chose", "bold": true}, {"text": " à ta mère (qu'elle entendrait vraiment) :"}] },
        { type: 'text_input', variable: 'message_a_la_mere', placeholder: "Maman, j'aimerais que tu saches que...", isLong: true },
        { type: 'message', content: [{"text": "🆕 Question miroir : En quoi lui "}, {"text": "ressembles-tu malgré toi", "bold": true}, {"text": " ?"}] },
        { type: 'text_input', variable: 'ressemblance_a_la_mere', placeholder: "Je réalise que comme elle, je...", isLong: true },
        { type: 'message', content: [{"text": "🆕 Question profonde : "}, {"text": "Quelle femme elle n'a pas pu être ?", "bold": true}] },
        { type: 'message', content: [{"text": "Derrière ses limitations, quelles parts d'elle ont été "}, {"text": "étouffées", "italic": true}, {"text": " ?"}] },
        { type: 'text_input', variable: 'reponse', placeholder: "Je pense que ma mère aurait aimé être..." },
        { type: 'message', content: [{"text": "Bravo pour ta profondeur et pour avoir osé plonger dans les "}, {"text": "eaux maternelles", "bold": true}, {"text": " et en ressortir avec clarté."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "prendre_une_respiration", "label": "Prendre une respiration →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Pause transition" },

        { type: 'image', url: "https://images.unsplash.com/photo-1571478287153-a888447264e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHNlYXJjaHwxMHx8cGF1c2V8ZW58MHwwfHx8MTc1NTQyMDcyMHww&ixlib=rb-4.1.0&q=80&w=1080", alt: "" },
        { type: 'message', content: [{"text": "🌸 "}, {"text": "Pause transition", "bold": true}] },
        { type: 'narrative', content: [{"text": "Tu viens d'explorer ta "}, {"text": "relation maternelle", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "C'est un territoire chargé d'émotions pour toute femme."}, {"text": "\n\n"}, {"text": "Respire profondément. Tu es "}, {"text": "courageuse", "bold": true}, {"text": "."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "explorer_ma_relation_paternell", "label": "Explorer ma relation paternelle →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Préparation portrait paternel" },

        { type: 'message', content: [{"text": "📍 Explorons maintenant ta "}, {"text": "relation avec ton père", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "💡 "}, {"text": "Ce que tu vas comprendre :", "bold": true}, {"text": "\n\n"}, {"text": "• Ton "}, {"text": "modèle masculin", "bold": true}, {"text": " inconscient"}, {"text": "\n\n"}, {"text": "• Ce que tu "}, {"text": "cherches ou fuis", "bold": true}, {"text": " chez les hommes"}, {"text": "\n\n"}, {"text": "• Comment tu as appris qu'un homme "}, {"text": "\"devrait être\"", "bold": true}] },
        { type: 'narrative', content: [{"text": "Que ton père ait été présent, absent, aimant ou distant..."}, {"text": "\n\n"}, {"text": "Cette relation a "}, {"text": "façonné ton rapport aux hommes", "bold": true}, {"text": "."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "comprendre_cette_empreinte", "label": "Comprendre cette empreinte →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Portrait paternel" },

        { type: 'message', content: [{"text": "La "}, {"text": "présence de ton père", "bold": true}, {"text": " dans ta vie était comme :"}] },
        { type: 'choice', variable: 'presence_paternelle', multiple: true, options: [{"id": "le_soleil_chaleureux_et_c", "label": "☀️ Le soleil • Chaleureux et constant, illuminait mes journées"}, {"id": "une_montagne_solide_et_pr", "label": "🏔️ Une montagne • Solide et protecteur, mais distant"}, {"id": "le_vent_present_mais_insai", "label": "💨 Le vent • Présent mais insaisissable, difficile à saisir"}, {"id": "l_orage_imprevisible_ent", "label": "⛈️ L'orage • Imprévisible, entre éclairs de colère et accalmies"}, {"id": "le_brouillard_present_phy", "label": "🌫️ Le brouillard • Présent physiquement mais émotionnellement absent"}, {"id": "un_rocher_stable_mais_froi", "label": "🪨 Un rocher • Stable mais froid, peu d'émotions exprimées"}, {"id": "l_ocean_lointain_on_savait", "label": "🌊 L'océan lointain • On savait qu'il existait mais on ne le voyait jamais"}, {"id": "le_feu_passionne_et_intens", "label": "🔥 Le feu • Passionné et intense, réchauffant ou brûlant"}, {"id": "une_etoile_admire_de_loin", "label": "⭐ Une étoile • Admiré de loin, guide mais inaccessible"}, {"id": "l_absence_un_vide_un_manq", "label": "🌑 L'absence • Un vide, un manque, un fantôme"}] },
        { type: 'message', content: [{"text": "Comment ton père "}, {"text": "montrait son amour", "bold": true}, {"text": " (s'il le montrait) ?"}] },
        { type: 'choice', variable: 'expression_amour_pere', multiple: true, options: [{"id": "en_pourvoyant_travailler_d", "label": "💼 En pourvoyant • Travailler dur, payer les factures"}, {"id": "en_protegeant_etablir_des", "label": "🛡️ En protégeant • Établir des règles, surveiller"}, {"id": "par_des_activites_sport_b", "label": "⚽ Par des activités • Sport, bricolage, sorties"}, {"id": "par_sa_fierte_quand_je_reu", "label": "🏆 Par sa fierté • Quand je réussissais quelque chose"}, {"id": "par_l_humour_blagues_taqu", "label": "😄 Par l'humour • Blagues, taquineries affectueuses"}, {"id": "par_le_silence_tu_sais_bi", "label": "🤐 Par le silence • \"Tu sais bien que je t'aime\""}, {"id": "par_des_cadeaux_acheter_de", "label": "🎁 Par des cadeaux • Acheter des choses, donner de l'argent"}, {"id": "par_des_mots_dire_je_t_ai", "label": "💬 Par des mots • Dire \"je t'aime\", encourager"}, {"id": "par_des_gestes_calins_bis", "label": "🤗 Par des gestes • Câlins, bisous, contact physique"}, {"id": "il_ne_le_montrait_pas_l_am", "label": "❌ Il ne le montrait pas • L'amour n'était pas exprimé"}] },
        { type: 'narrative', content: [{"text": "Raconte-moi un moment où tu t'es sentie "}, {"text": "vraiment vue/valorisée", "bold": true}, {"text": " par ton père :"}, {"text": "\n\n"}, {"text": "(Ou au contraire, un moment où tu aurais eu besoin qu'il te voie)", "italic": true}] },
        { type: 'text_input', variable: 'moment_valorisation_pere', placeholder: "Je me souviens de...", isLong: true },
        { type: 'message', content: [{"text": "Le rapport de ton père aux émotions t'a appris que "}, {"text": "les hommes...", "bold": true}] },
        { type: 'choice', variable: 'lecon_emotions_hommes', multiple: true, options: [{"id": "doivent_etre_forts_et_ne_pas", "label": "💪 Doivent être forts et ne pas pleurer"}, {"id": "ont_le_droit_d_etre_en_coler", "label": "😤 Ont le droit d'être en colère mais pas tristes"}, {"id": "sont_naturellement_distants", "label": "🚪 Sont naturellement distants émotionnellement"}, {"id": "doivent_proteger_sans_montr", "label": "🛡️ Doivent protéger sans montrer leurs peurs"}, {"id": "ne_savent_pas_exprimer_leurs", "label": "🗿 Ne savent pas exprimer leurs sentiments"}, {"id": "peuvent_etre_fragiles_mon_p", "label": "🥺 Peuvent être fragiles (mon père l'était)"}, {"id": "peuvent_etre_sensibles_et_ex", "label": "💝 Peuvent être sensibles et expressifs"}, {"id": "sont_imprevisibles_et_peuven", "label": "⚡ Sont imprévisibles et peuvent exploser"}, {"id": "sont_emotionnellement_inacce", "label": "👻 Sont émotionnellement inaccessibles"}, {"id": "ont_des_emotions_mais_ne_sav", "label": "🎭 Ont des émotions mais ne savent pas les gérer"}] },
        { type: 'message', content: [{"text": "Comment cette relation impacte "}, {"text": "tes relations amoureuses", "bold": true}, {"text": " aujourd'hui ?"}] },
        { type: 'text_input', variable: 'impact_relation_pere', placeholder: "Dans mes relations avec les hommes, je...", isLong: true },
        { type: 'message', content: [{"text": "Si ton père pouvait "}, {"text": "vraiment TE VOIR", "bold": true}, {"text": " aujourd'hui, que voudrais-tu qu'il comprenne ?"}] },
        { type: 'text_input', variable: 'message_au_pere', placeholder: "Papa, j'aimerais que tu voies que...", isLong: true },
        { type: 'message', content: [{"text": "🆕 Question profonde : "}, {"text": "Quel homme il n'a pas pu être ?", "bold": true}] },
        { type: 'message', content: [{"text": "Derrière ses limitations, quelles parts de lui ont été "}, {"text": "étouffées", "italic": true}, {"text": " ?"}] },
        { type: 'text_input', variable: 'homme_non_realise_pere', placeholder: "Je pense que mon père aurait aimé être...", isLong: true },
        { type: 'choice', variable: 'choix', options: [{"id": "analyser_ma_dimension_cognitiv", "label": "Analyser ma dimension cognitive →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Dimensions cognitives" },

        { type: 'message', content: [{"text": "🧠 Avant de cloturer ce formulaire j'aimerais explorer ta "}, {"text": "façon de penser", "bold": true}, {"text": " et comment elle influence tes relations."}] },
        { type: 'message', content: [{"text": "💙 Comprendre ton "}, {"text": "style cognitif", "bold": true}, {"text": " peut éclairer pourquoi certaines relations fonctionnent mieux que d'autres."}] },
        { type: 'message', content: [{"text": "Comment "}, {"text": "traites-tu l'information", "bold": true}, {"text": " habituellement ?"}] },
        { type: 'choice', variable: 'style_de_traitement_de_l_information', multiple: true, options: [{"id": "analytique_j_analyse_tout", "label": "🔬 Analytique : J'analyse tout en détail"}, {"id": "intuitif_je_me_fie_a_mon_r", "label": "✨ Intuitif : Je me fie à mon ressenti"}, {"id": "visuel_j_ai_besoin_de_voir", "label": "👀 Visuel : J'ai besoin de voir pour comprendre"}, {"id": "auditif_j_ai_besoin_d_ente", "label": "👂 Auditif : J'ai besoin d'entendre et d'échanger"}, {"id": "kinesthesique_j_ai_besoin", "label": "🤲 Kinesthésique : J'ai besoin de ressentir"}, {"id": "global_je_vois_d_abord_la", "label": "🌐 Global : Je vois d'abord la vue d'ensemble"}, {"id": "sequentiel_j_ai_besoin_d_e", "label": "🔢 Séquentiel : J'ai besoin d'étapes logiques"}] },
        { type: 'message', content: [{"text": "Comment prends-tu tes "}, {"text": "décisions importantes", "bold": true}, {"text": " ?"}] },
        { type: 'choice', variable: 'style_de_prise_de_decision', options: [{"id": "apres_mure_reflexion_et_anal", "label": "🤔 Après mûre réflexion et analyse"}, {"id": "selon_mes_emotions_du_moment", "label": "💖 Selon mes émotions du moment"}, {"id": "apres_consultation_de_person", "label": "👥 Après consultation de personnes de confiance"}, {"id": "en_suivant_mon_intuition", "label": "🌟 En suivant mon intuition"}, {"id": "en_alignement_avec_mes_valeu", "label": "🧧 En alignement avec mes valeurs"}, {"id": "de_maniere_pragmatique_et_pr", "label": "🎯 De manière pragmatique et pratique"}, {"id": "spontanement_dans_l_instant", "label": "⚡ Spontanément, dans l'instant"}] },
        { type: 'message', content: [{"text": "Quel est ton "}, {"text": "style de communication", "bold": true}, {"text": " préféré ?"}] },
        { type: 'choice', variable: 'style_de_communication', multiple: true, options: [{"id": "directe_et_claire", "label": "🎯 Directe et claire"}, {"id": "diplomate_et_nuancee", "label": "🕊️ Diplomate et nuancée"}, {"id": "emotionnelle_et_expressive", "label": "💕 Émotionnelle et expressive"}, {"id": "factuelle_et_precise", "label": "📊 Factuelle et précise"}, {"id": "metaphorique_et_imagee", "label": "🎨 Métaphorique et imagée"}, {"id": "j_ecoute_plus_que_je_ne_parl", "label": "👂 J'écoute plus que je ne parle"}, {"id": "je_prefere_l_ecrit_a_l_oral", "label": "✍️ Je préfère l'écrit à l'oral"}] },
        { type: 'message', content: [{"text": "Comment "}, {"text": "apprends-tu", "bold": true}, {"text": " le mieux ?"}] },
        { type: 'text_input', variable: 'style_d_apprentissage', placeholder: "J'apprends mieux quand...", isLong: true },
        { type: 'message', content: [{"text": "Face aux "}, {"text": "conflits", "bold": true}, {"text": ", tu as tendance à :"}] },
        { type: 'choice', variable: 'gestion_des_conflits', options: [{"id": "analyser_logiquement_la_situ", "label": "🧩 Analyser logiquement la situation"}, {"id": "eviter_ou_fuir_le_conflit", "label": "🏃 Éviter ou fuir le conflit"}, {"id": "confronter_directement", "label": "⚔️ Confronter directement"}, {"id": "chercher_un_compromis", "label": "🤝 Chercher un compromis"}, {"id": "reagir_emotionnellement", "label": "😢 Réagir émotionnellement"}, {"id": "prendre_du_temps_pour_reflec", "label": "⏳ Prendre du temps pour réfléchir"}, {"id": "chercher_a_comprendre_l_autr", "label": "💙 Chercher à comprendre l'autre"}] },
        { type: 'message', content: [{"text": "Comment fonctionne ta "}, {"text": "mémoire", "bold": true}, {"text": " dans les relations ?"}] },
        { type: 'choice', variable: 'type_de_memoire', multiple: true, options: [{"id": "je_me_souviens_surtout_des_e", "label": "💕 Je me souviens surtout des émotions"}, {"id": "je_retiens_tous_les_details", "label": "🔍 Je retiens tous les détails"}, {"id": "je_me_souviens_des_paroles", "label": "🗣️ Je me souviens des paroles exactes"}, {"id": "je_retiens_les_sensations_ph", "label": "🌸 Je retiens les sensations physiques"}, {"id": "ma_memoire_est_selective", "label": "🎯 Ma mémoire est sélective"}, {"id": "je_me_souviens_en_images", "label": "📸 Je me souviens en images"}, {"id": "j_oublie_facilement", "label": "🌫️ J'oublie facilement"}] },
        { type: 'message', content: [{"text": "Comment ton style cognitif "}, {"text": "impacte", "bold": true}, {"text": "-t-il tes relations amoureuses ?"}] },
        { type: 'text_input', variable: 'impact_cognitif_sur_les_relations', placeholder: "Dans mes relations, ma façon de penser crée parfois...", isLong: true },
        { type: 'narrative', content: [{"text": "🧠 Comprendre ton "}, {"text": "style cognitif", "bold": true}, {"text": " t'aidera à :"}, {"text": "\n\n"}, {"text": "• Mieux communiquer tes besoins"}, {"text": "\n\n"}, {"text": "• Comprendre les incompréhensions"}, {"text": "\n\n"}, {"text": "• Créer des ponts avec des styles différents"}] },
        { type: 'choice', variable: 'choix', options: [{"id": "terminer_ce_formulaire", "label": "Terminer ce formulaire →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Clôture formulaire" },

        { type: 'image', url: "https://images.unsplash.com/photo-1474552226712-ac0f0961a954", alt: "" },
        { type: 'message', content: [{"text": "🌿 "}, {"text": "Bravo !", "bold": true}, {"text": " Tu viens de terminer le Formulaire 2.2."}] },
        { type: 'narrative', content: [{"text": "Tu as exploré avec "}, {"text": "profondeur", "bold": true}, {"text": " :"}, {"text": "\n\n"}, {"text": "✓ Ta relation avec ta mère et son impact"}, {"text": "\n\n"}, {"text": "✓ Ta relation avec ton père et ses empreintes"}, {"text": "\n\n"}, {"text": "✓ Comment ces deux figures façonnent tes relations aujourd'hui"}] },
        { type: 'narrative', content: [{"text": "💡 "}, {"text": "Révélation clé :", "bold": true}, {"text": "\n\n"}, {"text": "Tu n'es pas "}, {"text": "condamnée à répéter", "bold": true}, {"text": " ces schémas."}, {"text": "\n\n"}, {"text": "En les comprenant, tu peux maintenant "}, {"text": "choisir différemment", "bold": true}, {"text": "."}] },
        { type: 'message', content: "Progression Phase 2 : [■■□□□] 2/5 formulaires complétés" },
        { type: 'narrative', content: [{"text": "Le "}, {"text": "Formulaire 2.3", "bold": true}, {"text": " t'attend pour explorer les dynamiques familiales."}, {"text": "\n\n"}, {"text": "Tu y découvriras comment la relation de tes parents et ta place dans la fratrie influencent encore tes choix amoureux."}] },
        { type: 'message', content: [{"text": "Tu avances magnifiquement... 🌸"}, {"text": "\n\n"}, {"text": "Chaque prise de conscience est une graine de transformation.", "italic": true}] },

        { type: 'completion', title: "Félicitations !", message: "Tu as terminé F2.2 — L'Héritage Émotionnel. Tes réponses ont été sauvegardées.", icon: '🧬' }
    ]
};

/* ─── Form Registry ─── */
if (typeof window.FORM_REGISTRY === 'undefined') window.FORM_REGISTRY = {};
window.FORM_REGISTRY['f2-2-heritage'] = F2_2_HERITAGE;
