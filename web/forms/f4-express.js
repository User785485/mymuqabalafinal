/* ═══════════════════════════════════════
   Les Forces — L'Engagement
   Converti depuis Typebot · 140 steps · 35 variables
═══════════════════════════════════════ */

const F4_EXPRESS = {
    id: 'f4_express',
    version: 1,
    title: "Les Forces — L'Engagement",
    icon: '💪',
    checkboxId: 'exp4',
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
        "action_7_jours",
        "blocages_sexuels_identifies",
        "comportements_futurs",
        "conseil_a_soi_meme",
        "croyance_transformation_possible",
        "duas_pour_amour",
        "email",
        "esperance_pour_soi",
        "expression_libre_du_coeur",
        "femme_future_6_mois",
        "forces_developpees_par_blessures",
        "forces_principales",
        "gratitude_au_saboteur",
        "influences_perception_allah",
        "insight_principal",
        "manifestations_stress_corporel",
        "message_a_moi_passe",
        "messages_sensualite_recus",
        "niveau_anxiete",
        "niveau_energie",
        "niveau_engagement_changement",
        "niveau_intimite_confortable",
        "obstacles_transformation",
        "prenom",
        "qualite_sommeil",
        "racine_du_saboteur",
        "relation_au_corps",
        "relation_avec_allah",
        "saboteur_principal",
        "stabilite_emotionnelle",
        "strategies_apaisement",
        "systeme_rappel",
        "telephone",
        "transformation_maintenant",
        "vision_intimite_sacree"
],

    steps: [

        /* ════════════════════════════════════ */
        { type: 'section', title: "Accueil & Transition" },

        { type: 'image', url: "https://images.unsplash.com/photo-1760883918278-bf835637e81f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjI2MDIyNjB8&ixlib=rb-4.1.0&q=80&w=1080", alt: "" },
        { type: 'message', content: [{"text": "Bismillah", "italic": true}, {"text": "."}] },
        { type: 'message', content: "Te voici pour la derniere etape..." },
        { type: 'narrative', content: [{"text": "Regarde le chemin parcouru :"}, {"text": "\n\n"}, {"text": "Tu as explore tes "}, {"text": "racines", "bold": true}, {"text": "\n\n"}, {"text": "Tu as identifie ton "}, {"text": "pattern", "bold": true}, {"text": "\n\n"}, {"text": "Tu as calibre ta "}, {"text": "boussole", "bold": true}] },
        { type: 'narrative', content: [{"text": "Il reste une derniere etape "}, {"text": "cruciale", "bold": true}, {"text": " :"}, {"text": "\n\n"}, {"text": "Identifier tes "}, {"text": "forces cachees", "bold": true}, {"text": " et transformer cette conscience en "}, {"text": "action concrete", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "Tu as explore tes "}, {"text": "racines", "bold": true}, {"text": ", vu ton "}, {"text": "pattern", "bold": true}, {"text": ", clarifie ta "}, {"text": "boussole", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Maintenant, identifions tes "}, {"text": "forces", "bold": true}, {"text": " et ce que tu es prete a "}, {"text": "transformer", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "Prends une grande inspiration..."}, {"text": "\n\n"}, {"text": "Expire profondement...", "italic": true}, {"text": "\n\n"}, {"text": "Allons jusqu'au bout."}] },
        { type: 'message', content: [{"text": "Bienvenue dans le "}, {"text": "Formulaire 4 EXPRESS V2 : Les Forces & L'Engagement - Ta Transformation", "bold": true}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Collecte Donnees - Identification Q1-Q3" },

        { type: 'message', content: "Une derniere fois, rappelle-moi tes coordonnees pour finaliser ton rapport personnalise..." },
        { type: 'text_input', variable: 'prenom', placeholder: "Ton prenom..." },
        { type: 'message', content: "Ton email ?" },
        { type: 'email_input', variable: 'email', placeholder: "ton.email@exemple.com" },
        { type: 'message', content: "Ton telephone ?" },
        { type: 'phone_input', variable: 'telephone', placeholder: "06 12 34 56 78", defaultPrefix: '+33' },

        /* ════════════════════════════════════ */
        { type: 'section', title: "NOUVEAU - Spiritualite D1-D3" },

        { type: 'message', content: [{"text": "TA CONNEXION SPIRITUELLE", "bold": true}] },
        { type: 'narrative', content: [{"text": "Avant d'explorer tes forces, prenons un moment pour parler de ta "}, {"text": "relation avec Allah", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "C'est le fondement de tout.", "italic": true}] },
        { type: 'message', content: [{"text": "D1 - Comment decrirais-tu ta relation avec Allah ?", "bold": true}, {"text": "\n\n"}, {"text": "(Tu peux choisir plusieurs reponses)", "italic": true}] },
        { type: 'choice', variable: 'relation_avec_allah', multiple: true, options: [{"id": "proche_et_intime_je_lui_parl", "label": "Proche et intime - Je Lui parle comme a un confident"}, {"id": "fluctuante_parfois_proche_p", "label": "Fluctuante - Parfois proche, parfois distante"}, {"id": "teintee_de_culpabilite_j_ai", "label": "Teintee de culpabilite - J'ai l'impression de decevoir"}, {"id": "basee_sur_la_crainte_peur_du", "label": "Basee sur la crainte - Peur du chatiment"}, {"id": "remplie_d_amour_je_ressens_s", "label": "Remplie d'amour - Je ressens Sa misericorde"}, {"id": "marquee_par_le_doute_je_ne_s", "label": "Marquee par le doute - Je ne sais plus quoi penser"}, {"id": "abandonnee_je_me_suis_eloign", "label": "Abandonnee - Je me suis eloignee"}, {"id": "formelle_rituelle_je_pratiqu", "label": "Formelle/rituelle - Je pratique par habitude"}, {"id": "mon_refuge_je_me_tourne_vers", "label": "Mon refuge - Je me tourne vers Lui dans les difficultes"}, {"id": "conflictuelle_j_ai_des_repro", "label": "Conflictuelle - J'ai des reproches a Lui faire"}] },
        { type: 'message', content: [{"text": "D2 - Qu'est-ce qui a le PLUS influence ta vision d'Allah ?", "bold": true}, {"text": "\n\n"}, {"text": "(Choisis toutes celles qui resonnent)", "italic": true}] },
        { type: 'choice', variable: 'influences_perception_allah', multiple: true, options: [{"id": "ma_relation_avec_mon_pere", "label": "Ma relation avec mon pere"}, {"id": "ma_relation_avec_ma_mere", "label": "Ma relation avec ma mere"}, {"id": "l_education_religieuse_recue", "label": "L'education religieuse recue"}, {"id": "les_discours_entendus_a_la_mos", "label": "Les discours entendus a la mosquee"}, {"id": "les_epreuves_que_j_ai_traverse", "label": "Les epreuves que j'ai traversees"}, {"id": "des_duas_exaucees", "label": "Des duas exaucees"}, {"id": "des_duas_non_exaucees", "label": "Des duas non exaucees"}, {"id": "mes_lectures_et_recherches_per", "label": "Mes lectures et recherches personnelles"}, {"id": "des_experiences_spirituelles_p", "label": "Des experiences spirituelles profondes"}] },
        { type: 'message', content: [{"text": "D3 - Que demandes-tu a Allah concernant ta vie amoureuse ?", "bold": true}, {"text": "\n\n"}, {"text": "Cette question est profondement personnelle. Il n'y a pas de bonne ou mauvaise reponse. Partage ce qui est dans ton coeur quand tu fais dua pour l'amour.", "italic": true}] },
        { type: 'text_input', variable: 'duas_pour_amour', placeholder: "Ce que je demande a Allah pour l'amour...", isLong: true },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Introduction Sequence 4" },

        { type: 'message', content: [{"text": "SEQUENCE 4 - LES FORCES & L'ENGAGEMENT", "bold": true}, {"text": "\n\n"}, {"text": "Tes Ressources et Ton Action", "bold": true}] },
        { type: 'image', url: "https://images.unsplash.com/photo-1508435119781-3a9b5c683dfd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080", alt: "" },
        { type: 'narrative', content: [{"text": "Pourquoi cette section ?", "bold": true}, {"text": "\n\n"}, {"text": "Parce que la "}, {"text": "transformation", "bold": true}, {"text": " ne vient pas que de voir le probleme. Elle vient de mobiliser tes "}, {"text": "ressources", "bold": true}, {"text": " et de passer a l'"}, {"text": "action", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "\"Allah ne modifie point l'etat d'un peuple tant qu'ils ne modifient pas ce qui est en eux-memes\" (13:11)", "italic": true}, {"text": "\n\n"}, {"text": "Le changement commence "}, {"text": "en toi", "bold": true}, {"text": "."}] },
        { type: 'message', content: "Allons-y !" },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Ton Bien-etre Global Q4-Q9" },

        { type: 'message', content: [{"text": "TON BIEN-ETRE GLOBAL", "bold": true}] },
        { type: 'narrative', content: [{"text": "Avant d'explorer tes "}, {"text": "forces", "bold": true}, {"text": ", faisons un check-up de ton "}, {"text": "bien-etre actuel", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "Pourquoi cette question ?", "bold": true}, {"text": "\n\n"}, {"text": "Ton etat de bien-etre influence ta "}, {"text": "capacite a transformer", "bold": true}, {"text": ". Ces informations me permettent de "}, {"text": "personnaliser tes recommandations", "bold": true}, {"text": "."}] },
        { type: 'message', content: [{"text": "Comment evaluerais-tu ton bien-etre actuel ?", "bold": true}, {"text": "\n\n"}, {"text": "Utilise les echelles ci-dessous pour evaluer chaque aspect :", "italic": true}] },
        { type: 'message', content: [{"text": "Q4 - Niveau d'anxiete", "bold": true}, {"text": " (1 = faible, 10 = eleve)"}] },
        { type: 'rating', variable: 'niveau_anxiete', max: 10, leftLabel: "Faible", rightLabel: "Eleve" },
        { type: 'message', content: [{"text": "Q5 - Qualite du sommeil", "bold": true}, {"text": " (1 = perturbe, 10 = excellent)"}] },
        { type: 'rating', variable: 'qualite_sommeil', max: 10, leftLabel: "Perturbe", rightLabel: "Excellent" },
        { type: 'message', content: [{"text": "Q6 - Niveau d'energie", "bold": true}, {"text": " (1 = bas, 10 = haut)"}] },
        { type: 'rating', variable: 'niveau_energie', max: 10, leftLabel: "Bas", rightLabel: "Haut" },
        { type: 'message', content: [{"text": "Q7 - Stabilite emotionnelle", "bold": true}, {"text": " (1 = instable, 10 = stable)"}] },
        { type: 'rating', variable: 'stabilite_emotionnelle', max: 10, leftLabel: "Instable", rightLabel: "Stable" },
        { type: 'message', content: [{"text": "Maintenant, parlons de ton corps..."}, {"text": "\n\n"}, {"text": "Q8 - Comment ton corps manifeste-t-il le stress relationnel ?", "bold": true}] },
        { type: 'narrative', content: [{"text": "Pourquoi cette question ?", "bold": true}, {"text": "\n\n"}, {"text": "Ton "}, {"text": "corps", "bold": true}, {"text": " est ton "}, {"text": "premier systeme d'alarme", "bold": true}, {"text": ". Reconnaitre ses signaux te permet d'agir avant que l'anxiete ne prenne le controle."}] },
        { type: 'choice', variable: 'manifestations_stress_corporel', multiple: true, options: [{"id": "migraines_maux_de_tete", "label": "Migraines/maux de tete"}, {"id": "gorge_serree_difficulte_a_res", "label": "Gorge serree, difficulte a respirer"}, {"id": "estomac_noue_nausees", "label": "Estomac noue, nausees"}, {"id": "tensions_dans_la_nuque_epaules", "label": "Tensions dans la nuque/epaules"}, {"id": "troubles_du_sommeil_insomnie", "label": "Troubles du sommeil (insomnie ou hypersomnie)"}, {"id": "palpitations_coeur_qui_s_emba", "label": "Palpitations, coeur qui s'emballe"}, {"id": "fatigue_extreme_epuisement", "label": "Fatigue extreme, epuisement"}, {"id": "vertiges_sensation_d_irrealit", "label": "Vertiges, sensation d'irrealite"}, {"id": "mon_corps_reste_calme_peu_de", "label": "Mon corps reste calme - Peu de manifestations physiques"}] },
        { type: 'message', content: [{"text": "Et maintenant..."}, {"text": "\n\n"}, {"text": "Q9 - Quelles sont tes strategies pour t'apaiser quand les emotions deviennent intenses ?", "bold": true}] },
        { type: 'choice', variable: 'strategies_apaisement', multiple: true, options: [{"id": "respiration_consciente", "label": "Respiration consciente"}, {"id": "priere_dhikr_lecture_du_cora", "label": "Priere, dhikr, lecture du Coran"}, {"id": "sport_mouvement_physique", "label": "Sport, mouvement physique"}, {"id": "contact_avec_la_nature", "label": "Contact avec la nature"}, {"id": "ecriture_journaling", "label": "Ecriture, journaling"}, {"id": "parler_a_quelqu_un_de_confianc", "label": "Parler a quelqu'un de confiance"}, {"id": "temps_seule_silence", "label": "Temps seule, silence"}, {"id": "expression_creative_art_musi", "label": "Expression creative (art, musique...)"}, {"id": "je_n_ai_pas_vraiment_de_strate", "label": "Je n'ai pas vraiment de strategie"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "NOUVEAU - Relation au Corps D4-D5" },

        { type: 'message', content: "Les questions suivantes concernent ta relation avec ton corps. C'est un sujet parfois difficile. Prends ton temps, tu es en securite." },
        { type: 'message', content: [{"text": "TA RELATION A TON CORPS", "bold": true}] },
        { type: 'message', content: [{"text": "D4 - Comment decrirais-tu ta relation avec ton corps ?", "bold": true}, {"text": "\n\n"}, {"text": "(Tu peux choisir plusieurs reponses)", "italic": true}] },
        { type: 'choice', variable: 'relation_au_corps', multiple: true, options: [{"id": "je_l_aime_et_le_respecte_tel_q", "label": "Je l'aime et le respecte tel qu'il est"}, {"id": "relation_neutre_ni_amour_ni", "label": "Relation neutre - ni amour ni rejet"}, {"id": "c_est_complexe_j_oscille_ent", "label": "C'est complexe - j'oscille entre acceptation et critique"}, {"id": "je_le_critique_souvent_trop_g", "label": "Je le critique souvent (trop grosse, pas assez...)"}, {"id": "j_ai_honte_de_certaines_partie", "label": "J'ai honte de certaines parties"}, {"id": "je_me_sens_deconnectee_de_mon", "label": "Je me sens deconnectee de mon corps"}, {"id": "en_processus_de_reconciliation", "label": "En processus de reconciliation"}] },
        { type: 'message', content: [{"text": "D5 - Quels messages as-tu recus sur la sensualite feminine ?", "bold": true}, {"text": "\n\n"}, {"text": "(Choisis tous ceux que tu as entendus)", "italic": true}] },
        { type: 'choice', variable: 'messages_sensualite_recus', multiple: true, options: [{"id": "ton_corps_est_source_de_honte", "label": "\"Ton corps est source de honte\""}, {"id": "tu_es_une_tentation_pour_les", "label": "\"Tu es une tentation pour les hommes\""}, {"id": "tes_desirs_sont_peche", "label": "\"Tes desirs sont peche\""}, {"id": "cache_toi_couvre_toi", "label": "\"Cache-toi, couvre-toi\""}, {"id": "on_n_en_parle_pas_tabou_tot", "label": "\"On n'en parle pas\" (tabou total)"}, {"id": "c_est_seulement_pour_le_maria", "label": "\"C'est seulement pour le mariage\""}, {"id": "c_est_un_devoir_pas_un_plais", "label": "\"C'est un devoir, pas un plaisir\""}, {"id": "le_plaisir_c_est_pour_l_homm", "label": "\"Le plaisir, c'est pour l'homme\""}, {"id": "une_femme_pudique_n_a_pas_de", "label": "\"Une femme pudique n'a pas de desirs\""}, {"id": "ton_corps_et_tes_desirs_sont", "label": "\"Ton corps et tes desirs sont une benediction dans le halal\""}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Tes Forces Cachees Q10-Q11" },

        { type: 'message', content: [{"text": "TES FORCES CACHEES", "bold": true}] },
        { type: 'narrative', content: [{"text": "Maintenant, identifions tes "}, {"text": "ressources", "bold": true}, {"text": "..."}, {"text": "\n\n"}, {"text": "Tu en as plus que tu ne le penses."}] },
        { type: 'message', content: [{"text": "Q10 - Quelles sont tes forces principales ?", "bold": true}, {"text": "\n\n"}, {"text": "(Choisis toutes celles qui resonnent)", "italic": true}] },
        { type: 'choice', variable: 'forces_principales', multiple: true, options: [{"id": "resilience_tu_te_releves_tou", "label": "Resilience - Tu te releves toujours"}, {"id": "empathie_tu_ressens_profonde", "label": "Empathie - Tu ressens profondement"}, {"id": "courage_tu_oses_affronter", "label": "Courage - Tu oses affronter"}, {"id": "lucidite_tu_vois_clair", "label": "Lucidite - Tu vois clair"}, {"id": "foi_tu_as_confiance_en_allah", "label": "Foi - Tu as confiance en Allah"}, {"id": "determination_tu_ne_laches_p", "label": "Determination - Tu ne laches pas"}, {"id": "intelligence_emotionnelle", "label": "Intelligence emotionnelle"}, {"id": "creativite_tu_trouves_des_so", "label": "Creativite - Tu trouves des solutions"}, {"id": "authenticite_tu_restes_toi_m", "label": "Authenticite - Tu restes toi-meme"}, {"id": "patience_tu_sais_attendre", "label": "Patience - Tu sais attendre"}] },
        { type: 'narrative', content: [{"text": "Une verite puissante..."}, {"text": "\n\n"}, {"text": "Q11 - Quelles forces as-tu developpees A CAUSE de tes blessures ?", "bold": true}, {"text": "\n\n"}, {"text": "Exemple : \"Ma blessure d'abandon m'a rendue tres independante\", \"Mon besoin de controle m'a appris a m'organiser\"...", "italic": true}] },
        { type: 'text_input', variable: 'forces_developpees_par_blessures', placeholder: "Les forces nees de mes blessures...", isLong: true },
        { type: 'narrative', content: [{"text": "C'est l'"}, {"text": "alchimie", "bold": true}, {"text": " : transformer le plomb en or."}, {"text": "\n\n"}, {"text": "Tes blessures t'ont donne des "}, {"text": "super-pouvoirs", "bold": true}, {"text": "."}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Ton Saboteur Interieur Q12-Q14" },

        { type: 'message', content: [{"text": "TON SABOTEUR INTERIEUR", "bold": true}] },
        { type: 'narrative', content: [{"text": "Parlons maintenant de cette voix en toi..."}, {"text": "\n\n"}, {"text": "Celle qui te "}, {"text": "protege", "bold": true}, {"text": " en te "}, {"text": "sabotant", "bold": true}, {"text": "."}] },
        { type: 'message', content: [{"text": "Q12 - Quel est ton saboteur principal ?", "bold": true}, {"text": "\n\n"}, {"text": "Celui qui revient le plus souvent te chuchoter ses mensonges...", "italic": true}] },
        { type: 'choice', variable: 'saboteur_principal', multiple: true, options: [{"id": "la_perfectionniste_tu_n_es", "label": "La Perfectionniste - \"Tu n'es jamais assez bien\""}, {"id": "la_critique_tu_es_nulle_re", "label": "La Critique - \"Tu es nulle, regarde tous tes defauts\""}, {"id": "la_victime_ca_n_arrive_qu_a", "label": "La Victime - \"Ca n'arrive qu'a toi, c'est injuste\""}, {"id": "la_catastrophiste_ca_va_mal", "label": "La Catastrophiste - \"Ca va mal finir, comme toujours\""}, {"id": "la_pusher_fais_plus_sois_p", "label": "La Pusher - \"Fais plus, sois plus forte, ne faiblis pas\""}, {"id": "l_evitante_ne_prends_pas_de", "label": "L'Evitante - \"Ne prends pas de risque, reste dans ta zone\""}, {"id": "la_comparatrice_les_autres", "label": "La Comparatrice - \"Les autres ont tout, toi rien\""}, {"id": "l_indecise_tu_ne_sauras_jam", "label": "L'Indecise - \"Tu ne sauras jamais ce qui est bon pour toi\""}] },
        { type: 'message', content: [{"text": "D'ou vient ce saboteur ?"}, {"text": "\n\n"}, {"text": "Q13 - Quelle blessure d'enfance a cree cette voix protectrice ?", "bold": true}] },
        { type: 'text_input', variable: 'racine_du_saboteur', placeholder: "Mon saboteur vient de...", isLong: true },
        { type: 'narrative', content: [{"text": "Exercice de gratitude..."}, {"text": "\n\n"}, {"text": "Q14 - Que peux-tu remercier ton saboteur d'avoir fait pour toi ?", "bold": true}, {"text": "\n\n"}, {"text": "Oui, vraiment. Il t'a protegee d'une certaine maniere...", "italic": true}] },
        { type: 'text_input', variable: 'gratitude_au_saboteur', placeholder: "Je remercie mon saboteur d'avoir...", isLong: true },
        { type: 'narrative', content: [{"text": "En le remerciant, tu fais la "}, {"text": "paix", "bold": true}, {"text": " avec lui."}, {"text": "\n\n"}, {"text": "Tu peux maintenant le transformer."}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "NOUVEAU - Intimite D6-D8 (GAP CRITIQUE)" },

        { type: 'message', content: "Les questions suivantes concernent l'intimite. C'est un sujet tabou pour beaucoup de soeurs. Tes reponses sont confidentielles et sans jugement. Si certaines questions te mettent mal a l'aise, tu peux passer." },
        { type: 'message', content: [{"text": "TON INTIMITE FUTURE", "bold": true}] },
        { type: 'narrative', content: [{"text": "D6 - Jusqu'a quelle profondeur te sens-tu CONFORTABLE dans l'intimite emotionnelle ?", "bold": true}, {"text": "\n\n"}, {"text": "Les 5 couches d'intimite :", "italic": true}, {"text": "\n\n"}, {"text": "Couche 1 : Faits et opinions (surface)", "italic": true}, {"text": "\n\n"}, {"text": "Couche 2 : Emotions (ce que je ressens)", "italic": true}, {"text": "\n\n"}, {"text": "Couche 3 : Peurs et blessures (vulnerabilite)", "italic": true}, {"text": "\n\n"}, {"text": "Couche 4 : Reves profonds (ce que je desire)", "italic": true}, {"text": "\n\n"}, {"text": "Couche 5 : Union spirituelle (connexion ame)", "italic": true}] },
        { type: 'choice', variable: 'niveau_intimite_confortable', options: [{"id": "couche_1_seulement_je_reste", "label": "Couche 1 seulement - Je reste en surface"}, {"id": "jusqu_a_couche_2_je_partage", "label": "Jusqu'a couche 2 - Je partage mes emotions"}, {"id": "jusqu_a_couche_3_je_peux_mon", "label": "Jusqu'a couche 3 - Je peux montrer ma vulnerabilite"}, {"id": "jusqu_a_couche_4_je_partage", "label": "Jusqu'a couche 4 - Je partage mes reves profonds"}, {"id": "jusqu_a_couche_5_je_peux_viv", "label": "Jusqu'a couche 5 - Je peux vivre une union spirituelle"}, {"id": "ca_depend_de_la_personne_et_de", "label": "Ca depend de la personne et de la confiance"}] },
        { type: 'message', content: [{"text": "D7 - Quels blocages identifies-tu concernant ta sexualite future (dans le cadre du mariage) ?", "bold": true}, {"text": "\n\n"}, {"text": "(Tu peux choisir plusieurs reponses)", "italic": true}] },
        { type: 'choice', variable: 'blocages_sexuels_identifies', multiple: true, options: [{"id": "honte_de_mon_corps", "label": "Honte de mon corps"}, {"id": "peur_de_la_douleur", "label": "Peur de la douleur"}, {"id": "culpabilite_d_avoir_des_desirs", "label": "Culpabilite d'avoir des desirs"}, {"id": "peur_du_jugement_de_mon_futur", "label": "Peur du jugement de mon futur epoux"}, {"id": "messages_familiaux_culturels_t", "label": "Messages familiaux/culturels toxiques"}, {"id": "trauma_ou_experience_negative", "label": "Trauma ou experience negative passee"}, {"id": "manque_de_connaissance_de_mon", "label": "Manque de connaissance de mon propre corps"}, {"id": "pression_de_performance", "label": "Pression de \"performance\""}, {"id": "deconnexion_de_mon_corps_je_n", "label": "Deconnexion de mon corps (je ne ressens pas)"}, {"id": "interpretations_rigides_de_la", "label": "Interpretations rigides de la religion"}, {"id": "peur_de_l_intimite_emotionnell", "label": "Peur de l'intimite emotionnelle qui accompagne"}, {"id": "aucun_blocage_identifie", "label": "Aucun blocage identifie"}] },
        { type: 'message', content: [{"text": "D8 - Que representerait pour toi une intimite EPANOUIE et SACREE dans ton futur mariage ?", "bold": true}, {"text": "\n\n"}, {"text": "Prends ton temps pour cette question. C'est une vision profonde de ce que tu esperes vivre dans l'intimite avec ton futur epoux, dans le cadre halal et sacre du mariage.", "italic": true}] },
        { type: 'text_input', variable: 'vision_intimite_sacree', placeholder: "Ma vision d'une intimite epanouie et sacree...", isLong: true },
        { type: 'message', content: "Merci pour ta confiance et ton courage. Ces sujets sont rarement abordes et pourtant si importants pour ton futur bonheur conjugal. Qu'Allah t'accorde une intimite epanouie et sacree." },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Ce Que Tu Es Prete a Transformer Q15-Q17" },

        { type: 'message', content: [{"text": "CE QUE TU ES PRETE A TRANSFORMER", "bold": true}] },
        { type: 'narrative', content: [{"text": "Le moment de "}, {"text": "verite", "bold": true}, {"text": "..."}, {"text": "\n\n"}, {"text": "Maintenant que tu as "}, {"text": "vu", "bold": true}, {"text": " tout cela, qu'es-tu prete a "}, {"text": "transformer", "bold": true}, {"text": " ?"}] },
        { type: 'message', content: [{"text": "Q15 - Quelle est LA chose que tu veux transformer maintenant ?", "bold": true}, {"text": "\n\n"}, {"text": "Une seule. La plus importante.", "italic": true}] },
        { type: 'text_input', variable: 'transformation_maintenant', placeholder: "Ce que je veux transformer maintenant...", isLong: true },
        { type: 'message', content: [{"text": "Q16 - Qu'est-ce qui pourrait t'empecher de transformer cela ?", "bold": true}, {"text": "\n\n"}, {"text": "Sois honnete sur les obstacles...", "italic": true}] },
        { type: 'text_input', variable: 'obstacles_transformation', placeholder: "Les obstacles possibles...", isLong: true },
        { type: 'narrative', content: [{"text": "Maintenant, l'engagement..."}, {"text": "\n\n"}, {"text": "Q17 - Sur une echelle de 1 a 10, a quel point es-tu prete a changer ?", "bold": true}, {"text": "\n\n"}, {"text": "1 = Pas vraiment prete | 10 = Totalement engagee", "italic": true}] },
        { type: 'rating', variable: 'niveau_engagement_changement', max: 10, leftLabel: "Pas prete", rightLabel: "Engagee" },
        { type: 'narrative', content: [{"text": "Ce chiffre est ta "}, {"text": "verite du moment", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Quelle que soit ta reponse, elle est "}, {"text": "parfaite", "bold": true}, {"text": "."}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Ton Engagement Sacre Q18-Q19" },

        { type: 'message', content: [{"text": "TON ENGAGEMENT SACRE", "bold": true}] },
        { type: 'narrative', content: [{"text": "La conscience sans "}, {"text": "action", "bold": true}, {"text": " reste sterile..."}, {"text": "\n\n"}, {"text": "Prends un engagement "}, {"text": "concret", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "Q18 - Quelle action concrete vas-tu poser dans les 7 prochains jours ?", "bold": true}, {"text": "\n\n"}, {"text": "Petite mais concrete. Mesurable.", "italic": true}, {"text": "\n\n"}, {"text": "Exemples : \"Ecrire pendant 10 min par jour\", \"Dire non a une sollicitation qui me draine\"...", "italic": true}] },
        { type: 'text_input', variable: 'action_7_jours', placeholder: "Mon action des 7 prochains jours..." },
        { type: 'message', content: [{"text": "Q19 - Comment vas-tu te rappeler de faire cette action ?", "bold": true}, {"text": "\n\n"}, {"text": "Alarme telephone ? Note sur le miroir ?", "italic": true}] },
        { type: 'text_input', variable: 'systeme_rappel', placeholder: "Mon systeme de rappel..." },
        { type: 'narrative', content: [{"text": "En mettant des "}, {"text": "conditions", "bold": true}, {"text": " a ta realite, tu la "}, {"text": "crees", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Visualisons maintenant ou tu seras dans 6 mois..."}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Ta Vision a 6 Mois Q20-Q21" },

        { type: 'message', content: [{"text": "TA VISION A 6 MOIS", "bold": true}] },
        { type: 'message', content: "Ferme les yeux un instant...\n\nImagine-toi dans 6 mois." },
        { type: 'message', content: [{"text": "Q20 - Quelle femme seras-tu dans 6 mois si tu honores tous tes engagements ?", "bold": true}, {"text": "\n\n"}, {"text": "Decris-la. Comment se sent-elle ? Comment se comporte-t-elle ?", "italic": true}] },
        { type: 'text_input', variable: 'femme_future_6_mois', placeholder: "Dans 6 mois, je serai...", isLong: true },
        { type: 'message', content: [{"text": "Q21 - Quels comportements auras-tu abandonnes d'ici la ?", "bold": true}, {"text": "\n\n"}, {"text": "Ce que tu ne fais plus...", "italic": true}] },
        { type: 'text_input', variable: 'comportements_futurs', placeholder: "Les comportements que j'aurai abandonnes...", isLong: true },
        { type: 'narrative', content: [{"text": "Cette vision est ton "}, {"text": "blueprint", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Ton cerveau sait maintenant ou aller."}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Dialogue avec Ton Passe Q22-Q24" },

        { type: 'message', content: [{"text": "DIALOGUE AVEC TON PASSE", "bold": true}] },
        { type: 'narrative', content: [{"text": "Un exercice de guerison puissant..."}, {"text": "\n\n"}, {"text": "Si tu pouvais parler a la "}, {"text": "toi du passe", "bold": true}, {"text": ", celle qui a commence ce chemin..."}] },
        { type: 'message', content: [{"text": "Q22 - Que lui dirais-tu ?", "bold": true}, {"text": "\n\n"}, {"text": "Ecris-lui une lettre courte mais sincere...", "italic": true}] },
        { type: 'text_input', variable: 'message_a_moi_passe', placeholder: "Chere moi du passe...", isLong: true },
        { type: 'message', content: [{"text": "Q23 - Quelle est ton esperance pour toi-meme maintenant ?", "bold": true}] },
        { type: 'text_input', variable: 'esperance_pour_soi', placeholder: "Mon esperance pour moi-meme...", isLong: true },
        { type: 'narrative', content: [{"text": "Q24 - Crois-tu vraiment que la transformation est possible pour toi ?", "bold": true}, {"text": "\n\n"}, {"text": "Pas pour \"les autres\". Pour "}, {"text": "toi", "bold": true}, {"text": "."}] },
        { type: 'choice', variable: 'croyance_transformation_possible', options: [{"id": "oui_totalement", "label": "Oui, totalement"}, {"id": "oui_mais_j_ai_des_doutes", "label": "Oui mais j'ai des doutes"}, {"id": "pas_sure_j_ai_peur_d_esperer", "label": "Pas sure - j'ai peur d'esperer"}, {"id": "non_pas_vraiment", "label": "Non, pas vraiment"}] },
        { type: 'message', content: [{"text": "\"Ne desesperez pas de la misericorde d'Allah. Allah pardonne tous les peches\" (39:53)", "italic": true}, {"text": "\n\n"}, {"text": "Si Allah peut tout transformer, tu peux transformer ton coeur."}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Un Dernier Regard Q25-Q26" },

        { type: 'message', content: [{"text": "UN DERNIER REGARD", "bold": true}] },
        { type: 'narrative', content: [{"text": "Avant de clore..."}, {"text": "\n\n"}, {"text": "Prenons un moment pour "}, {"text": "integrer", "bold": true}, {"text": "."}] },
        { type: 'message', content: [{"text": "Q25 - Quel est ta prise de conscience la plus puissante de tout ce processus ?", "bold": true}, {"text": "\n\n"}, {"text": "Ce qui a fait \"clic\" dans ta tete et ton coeur...", "italic": true}] },
        { type: 'text_input', variable: 'insight_principal', placeholder: "Ma prise de conscience la plus puissante...", isLong: true },
        { type: 'message', content: [{"text": "Q26 - Si tu devais te donner UN seul conseil a toi-meme, ce serait quoi ?", "bold": true}] },
        { type: 'text_input', variable: 'conseil_a_soi_meme', placeholder: "Mon conseil a moi-meme..." },
        { type: 'narrative', content: [{"text": "Garde ce conseil "}, {"text": "precieusement", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "C'est ta sagesse qui parle."}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Un Espace pour Ton Coeur Q27" },

        { type: 'message', content: [{"text": "UN ESPACE POUR TON COEUR", "bold": true}] },
        { type: 'narrative', content: [{"text": "Y a-t-il quelque chose d'autre que tu veux partager ?"}, {"text": "\n\n"}, {"text": "Quelque chose que tu n'as pas eu l'occasion de dire..."}, {"text": "\n\n"}, {"text": "Une question, une peur, une esperance, une colere...", "italic": true}, {"text": "\n\n"}, {"text": "C'est un espace "}, {"text": "libre", "bold": true}, {"text": " pour toi."}] },
        { type: 'text_input', variable: 'expression_libre_du_coeur', placeholder: "Ce que j'ai encore sur le coeur... (optionnel)", isLong: true },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Cloture Sacree - Pause Sacree" },

        { type: 'message', content: [{"text": "CLOTURE SACREE", "bold": true}] },
        { type: 'narrative', content: [{"text": "Tu viens d'accomplir quelque chose d'"}, {"text": "extraordinaire", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Tu as traverse "}, {"text": "4 territoires sacres", "bold": true}, {"text": " :"}, {"text": "\n\n"}, {"text": "Tes "}, {"text": "racines", "bold": true}, {"text": "\n\n"}, {"text": "Ton "}, {"text": "pattern", "bold": true}, {"text": "\n\n"}, {"text": "Ta "}, {"text": "boussole", "bold": true}, {"text": "\n\n"}, {"text": "Tes "}, {"text": "forces", "bold": true}] },
        { type: 'narrative', content: [{"text": "Ce travail demande un "}, {"text": "courage immense", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Je t'honore pour etre allee jusqu'au bout."}] },
        { type: 'narrative', content: [{"text": "Une dou'a pour toi :", "bold": true}, {"text": "\n\n"}, {"text": "\"O Allah, gueris son coeur des blessures du passe.", "italic": true}, {"text": "\n\n"}, {"text": "Eclaire son chemin vers l'amour qui lui est destine.", "italic": true}, {"text": "\n\n"}, {"text": "Facilite sa transformation et accorde-lui la sakina.\"", "italic": true}, {"text": "\n\n"}, {"text": "Amin.", "italic": true}] },
        { type: 'narrative', content: [{"text": "Merci."}, {"text": "\n\n"}, {"text": "Merci d'avoir eu le "}, {"text": "courage", "bold": true}, {"text": " de plonger."}, {"text": "\n\n"}, {"text": "Merci d'avoir ete "}, {"text": "honnete", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Merci d'avoir "}, {"text": "fait confiance", "bold": true}, {"text": " au processus."}] },
        { type: 'narrative', content: [{"text": "Qu'Allah :", "bold": true}, {"text": "\n\n"}, {"text": "Guerisse ton coeur"}, {"text": "\n\n"}, {"text": "Transforme tes blessures en sagesse"}, {"text": "\n\n"}, {"text": "T'accorde la sakina"}, {"text": "\n\n"}, {"text": "Te guide vers celui qui est fait pour toi"}, {"text": "\n\n"}, {"text": "Facilite ton chemin vers l'amour"}, {"text": "\n\n"}, {"text": "Et qu'Il honore tes efforts et transforme tes patterns."}, {"text": "\n\n"}, {"text": "Qu'Il te guide vers celui qui merite ton coeur.", "italic": true}, {"text": "\n\n"}, {"text": "Amin.", "italic": true}] },

        { type: 'completion', title: "Félicitations !", message: "Tu as terminé Les Forces — L'Engagement. Tes réponses ont été sauvegardées.", icon: '💪' }
    ]
};

/* ─── Form Registry ─── */
if (typeof window.FORM_REGISTRY === 'undefined') window.FORM_REGISTRY = {};
window.FORM_REGISTRY['f4-express'] = F4_EXPRESS;
