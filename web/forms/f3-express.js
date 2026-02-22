/* ═══════════════════════════════════════
   La Boussole — Ce Qui Compte Vraiment
   Converti depuis Typebot · 71 steps · 23 variables
═══════════════════════════════════════ */

const F3_EXPRESS = {
    id: 'f3_express',
    version: 1,
    title: "La Boussole — Ce Qui Compte Vraiment",
    icon: '🧭',
    checkboxId: 'exp3',
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
        "alignement_vision_c21",
        "besoins_non_exprimes_c16",
        "besoins_securite_c12",
        "continuer_vers_f4",
        "debut_relation_c4",
        "declencheurs_crise_c7",
        "duree_lune_de_miel_c6",
        "email",
        "emotions_bloquees_c15b",
        "emotions_exprimees_c15a",
        "facteurs_attraction_c5",
        "gestion_conflits_c14",
        "manifestation_attachement_c10",
        "moment_succes_c18",
        "pattern_fin_c8",
        "peurs_relationnelles_c11",
        "prenom",
        "qualites_relationnelles_c17",
        "ressources_resilience_c19",
        "style_attachement_c9",
        "style_communication_c13",
        "telephone",
        "vision_amour_ideal_c20"
],

    steps: [

        /* ════════════════════════════════════ */
        { type: 'section', title: "BLOC 1 - Accueil" },

        { type: 'image', url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", alt: "" },
        { type: 'message', content: [{"text": "Bismillah", "italic": true}, {"text": "."}] },
        { type: 'message', content: "Te revoila... " },
        { type: 'narrative', content: [{"text": "Ce formulaire t'invite a "}, {"text": "observer tes cycles amoureux", "bold": true}, {"text": " avec "}, {"text": "curiosite", "bold": true}, {"text": " - pas avec jugement."}, {"text": "\n\n"}, {"text": "Tu vas aussi decouvrir tes "}, {"text": "forces", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "Prends une grande inspiration..."}, {"text": "\n\n"}, {"text": "Expire lentement...", "italic": true}, {"text": "\n\n"}, {"text": "C'est parti."}] },
        { type: 'message', content: [{"text": "Bienvenue dans le "}, {"text": "Formulaire 3 EXPRESS V2 : La Boussole - Cycles Relationnels", "bold": true}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "BLOC 2 - Identification (C1-C3)" },

        { type: 'message', content: "Avant de commencer, rappelle-moi qui tu es..." },
        { type: 'message', content: [{"text": "C1. Ton prenom ?", "bold": true}] },
        { type: 'text_input', variable: 'prenom', placeholder: "Ton prenom..." },
        { type: 'message', content: [{"text": "C2. Ton email ?", "bold": true}] },
        { type: 'email_input', variable: 'email', placeholder: "ton.email@exemple.com" },
        { type: 'message', content: [{"text": "C3. Ton telephone ?", "bold": true}] },
        { type: 'phone_input', variable: 'telephone', placeholder: "06 12 34 56 78", defaultPrefix: '+33' },

        /* ════════════════════════════════════ */
        { type: 'section', title: "BLOC 3 - Cycles Relationnels (C4-C8)" },

        { type: 'message', content: [{"text": "CYCLES RELATIONNELS", "bold": true}, {"text": "\n\n"}, {"text": "Explorons comment tes histoires commencent, evoluent et se terminent..."}] },
        { type: 'message', content: [{"text": "C4. Comment commencent generalement tes histoires d'amour ?", "bold": true}] },
        { type: 'choice', variable: 'debut_relation_c4', options: [{"id": "coup_de_foudre_intense_tout", "label": "Coup de foudre intense - Tout va tres vite"}, {"id": "glissement_progressif_l_amit", "label": "Glissement progressif - L'amitie devient amour"}, {"id": "il_me_poursuit_je_me_laisse", "label": "Il me poursuit - Je me laisse convaincre"}, {"id": "c_est_complique_des_le_debut", "label": "C'est complique des le debut - Pas vraiment disponible"}, {"id": "passion_physique_d_abord_le", "label": "Passion physique d'abord - Le reste suit (ou pas)"}, {"id": "connexion_intellectuelle_on", "label": "Connexion intellectuelle - On se comprend"}, {"id": "je_prends_ce_qui_vient_pas_v", "label": "Je prends ce qui vient - Pas vraiment de choix actif"}] },
        { type: 'message', content: [{"text": "C5. Qu'est-ce qui t'attire generalement au debut ?", "bold": true}, {"text": "\n\n"}, {"text": "(Tu peux en choisir plusieurs)", "italic": true}] },
        { type: 'choice', variable: 'facteurs_attraction_c5', multiple: true, options: [{"id": "l_intensite_emotionnelle_on", "label": "L'intensite emotionnelle - On se sent VIVANT"}, {"id": "le_potentiel_de_sauvetage", "label": "Le potentiel de 'sauvetage' - Il a besoin de moi"}, {"id": "l_indisponibilite_ce_qui_est", "label": "L'indisponibilite - Ce qui est difficile est precieux"}, {"id": "la_familiarite_quelque_chose", "label": "La familiarite - Quelque chose de connu (meme toxique)"}, {"id": "le_charisme_confiance_il_pre", "label": "Le charisme/confiance - Il prend de la place"}, {"id": "la_connexion_profonde_on_se", "label": "La connexion profonde - On se comprend vraiment"}, {"id": "la_securite_il_me_rassure", "label": "La securite - Il me rassure"}, {"id": "le_mystere_envie_de_percer_s", "label": "Le mystere - Envie de percer son secret"}] },
        { type: 'message', content: [{"text": "C6. Combien de temps dure generalement la 'lune de miel' ", "bold": true}, {"text": "(periode enchantee du debut)", "italic": true}, {"text": " dans tes relations ?", "bold": true}] },
        { type: 'choice', variable: 'duree_lune_de_miel_c6', options: [{"id": "quelques_jours_a_quelques_sema", "label": "Quelques jours a quelques semaines"}, {"id": "1_a_3_mois", "label": "1 a 3 mois"}, {"id": "3_a_6_mois", "label": "3 a 6 mois"}, {"id": "6_mois_a_1_an", "label": "6 mois a 1 an"}, {"id": "plus_d_un_an", "label": "Plus d'un an"}, {"id": "je_ne_connais_pas_vraiment_de", "label": "Je ne connais pas vraiment de lune de miel"}] },
        { type: 'message', content: [{"text": "C7. Qu'est-ce qui fait generalement 'basculer' la relation vers les difficultes ?", "bold": true}, {"text": "\n\n"}, {"text": "(Tu peux en choisir plusieurs)", "italic": true}] },
        { type: 'choice', variable: 'declencheurs_crise_c7', multiple: true, options: [{"id": "la_routine_s_installe", "label": "La routine s'installe"}, {"id": "une_deception_par_rapport_a_me", "label": "Une deception par rapport a mes attentes"}, {"id": "la_distance_emotionnelle_ou_p", "label": "La distance (emotionnelle ou physique)"}, {"id": "la_jalousie_ou_la_possessivite", "label": "La jalousie ou la possessivite"}, {"id": "un_conflit_mal_gere", "label": "Un conflit mal gere"}, {"id": "l_apparition_de_ses_vrais_de", "label": "L'apparition de ses 'vrais' defauts"}, {"id": "mes_propres_peurs_insecurites", "label": "Mes propres peurs/insecurites"}, {"id": "une_tierce_personne_ex_amis", "label": "Une tierce personne (ex, amis, famille)"}, {"id": "le_manque_de_communication", "label": "Le manque de communication"}, {"id": "un_evenement_exterieur_stressa", "label": "Un evenement exterieur stressant"}] },
        { type: 'message', content: [{"text": "C8. Comment se terminent generalement tes relations ?", "bold": true}] },
        { type: 'choice', variable: 'pattern_fin_c8', options: [{"id": "c_est_moi_qui_pars_je_finis", "label": "C'est moi qui pars - Je finis par craquer"}, {"id": "on_me_quitte_je_suis_trop", "label": "On me quitte - Je suis 'trop' quelque chose"}, {"id": "explosion_un_evenement_preci", "label": "Explosion - Un evenement precipite tout"}, {"id": "mort_lente_ca_s_eteint_progr", "label": "Mort lente - Ca s'eteint progressivement"}, {"id": "sabotage_inconscient_je_fais", "label": "Sabotage inconscient - Je fais en sorte que ca echoue"}, {"id": "on_off_repetitif_ruptures_et", "label": "On/Off repetitif - Ruptures et reconciliations"}, {"id": "ghosting_disparition_soudain", "label": "Ghosting - Disparition soudaine (de moi ou de lui)"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "BLOC 4 - Attachement (C9-C12)" },

        { type: 'message', content: [{"text": "ATTACHEMENT", "bold": true}, {"text": "\n\n"}, {"text": "Explorons comment tu t'attaches et ce dont tu as besoin..."}] },
        { type: 'message', content: [{"text": "C9. En relation, tu te reconnais le plus dans quel style ?", "bold": true}] },
        { type: 'choice', variable: 'style_attachement_c9', options: [{"id": "secure_je_me_sens_a_l_aise_a", "label": "SECURE - Je me sens a l'aise avec l'intimite et l'autonomie. Je communique mes besoins, j'accepte les conflits comme normaux. Je crois que je merite l'amour."}, {"id": "anxieux_j_ai_peur_d_etre_aba", "label": "ANXIEUX - J'ai peur d'etre abandonnee. J'ai besoin de reassurance constante. Le silence me stresse. Je peux devenir 'collante' ou jalouse quand j'ai peur."}, {"id": "evitant_je_valorise_mon_inde", "label": "EVITANT - Je valorise mon independance. L'intimite me met mal a l'aise. Je peux me fermer quand quelqu'un s'approche trop. Je me sens 'envahie' facilement."}, {"id": "desorganise_j_oscille_entre", "label": "DESORGANISE - J'oscille entre desir intense et peur panique. Je veux l'intimite mais elle me fait peur. Mes reactions peuvent etre contradictoires."}] },
        { type: 'narrative', content: [{"text": "C10. Comment ce style se manifeste-t-il concretement dans tes relations ?", "bold": true}, {"text": "\n\n"}, {"text": "Exemple : ", "italic": true}, {"text": "'Quand il ne repond pas vite, je panique et j'envoie plusieurs messages'", "italic": true}, {"text": " ou ", "italic": true}, {"text": "'Quand ca devient serieux, je trouve des raisons de fuir'", "italic": true}] },
        { type: 'text_input', variable: 'manifestation_attachement_c10', placeholder: "Comment ca se manifeste concretement...", isLong: true },
        { type: 'message', content: [{"text": "C11. Quelles sont tes 3 principales peurs en relation ?", "bold": true}, {"text": "\n\n"}, {"text": "(Choisis maximum 3)", "italic": true}] },
        { type: 'choice', variable: 'peurs_relationnelles_c11', multiple: true, options: [{"id": "abandon_qu_on_me_quitte_qu", "label": "ABANDON - Qu'on me quitte, qu'on m'oublie"}, {"id": "engloutissement_perdre_mon_i", "label": "ENGLOUTISSEMENT - Perdre mon identite dans la relation"}, {"id": "trahison_etre_trompee_qu_on", "label": "TRAHISON - Etre trompee, qu'on me mente"}, {"id": "perte_d_identite_ne_plus_sav", "label": "PERTE D'IDENTITE - Ne plus savoir qui je suis"}, {"id": "intimite_qu_on_me_connaisse", "label": "INTIMITE - Qu'on me connaisse vraiment"}, {"id": "vulnerabilite_montrer_mes_fa", "label": "VULNERABILITE - Montrer mes faiblesses"}, {"id": "rejet_ne_pas_etre_assez_bien", "label": "REJET - Ne pas etre assez bien"}, {"id": "dependance_avoir_besoin_de_q", "label": "DEPENDANCE - Avoir besoin de quelqu'un"}] },
        { type: 'narrative', content: [{"text": "C12. De quoi as-tu BESOIN pour te sentir en securite dans une relation ?", "bold": true}, {"text": "\n\n"}, {"text": "Exemples : ", "italic": true}, {"text": "'Des messages reguliers', 'Savoir ou il est', 'Du temps pour moi', 'Etre sa priorite', 'De la stabilite'...", "italic": true}] },
        { type: 'text_input', variable: 'besoins_securite_c12', placeholder: "Ce dont j'ai besoin pour me sentir en securite...", isLong: true },

        /* ════════════════════════════════════ */
        { type: 'section', title: "BLOC 5 - Communication (C13-C16)" },

        { type: 'message', content: [{"text": "COMMUNICATION", "bold": true}, {"text": "\n\n"}, {"text": "Explorons comment tu communiques et geres les conflits..."}] },
        { type: 'message', content: [{"text": "C13. Quel est ton style de communication dominant en relation ?", "bold": true}] },
        { type: 'choice', variable: 'style_communication_c13', options: [{"id": "direct_je_dis_ce_que_je_pens", "label": "DIRECT - Je dis ce que je pense, clairement"}, {"id": "indirect_je_suggere_j_esper", "label": "INDIRECT - Je suggere, j'espere qu'il comprendra"}, {"id": "passif_j_evite_de_m_exprimer", "label": "PASSIF - J'evite de m'exprimer pour ne pas deranger"}, {"id": "passif_agressif_je_montre_mo", "label": "PASSIF-AGRESSIF - Je montre mon mecontentement autrement"}, {"id": "emotionnel_je_m_exprime_avec", "label": "EMOTIONNEL - Je m'exprime avec beaucoup d'emotion"}, {"id": "ferme_je_me_referme_quand_ca", "label": "FERME - Je me referme quand ca devient difficile"}] },
        { type: 'message', content: [{"text": "C14. Comment geres-tu les conflits en relation ?", "bold": true}] },
        { type: 'choice', variable: 'gestion_conflits_c14', options: [{"id": "j_evite_je_fais_comme_si_de", "label": "J'EVITE - Je fais comme si de rien n'etait"}, {"id": "j_affronte_je_confronte_dire", "label": "J'AFFRONTE - Je confronte directement"}, {"id": "je_fuis_je_m_eloigne_physiqu", "label": "JE FUIS - Je m'eloigne physiquement ou emotionnellement"}, {"id": "j_explose_puis_je_regrette", "label": "J'EXPLOSE puis je regrette"}, {"id": "j_essaie_de_dialoguer_calmemen", "label": "J'ESSAIE DE DIALOGUER calmement"}, {"id": "je_me_ferme_en_silence_mur_de", "label": "JE ME FERME en silence (mur de pierre)"}, {"id": "ca_depend_variable_selon_le", "label": "CA DEPEND - Variable selon le conflit"}] },
        { type: 'message', content: [{"text": "C15. Quelles emotions exprimes-tu FACILEMENT en relation ?", "bold": true}, {"text": "\n\n"}, {"text": "(Tu peux en choisir plusieurs)", "italic": true}] },
        { type: 'choice', variable: 'emotions_exprimees_c15a', multiple: true, options: [{"id": "joie", "label": "Joie"}, {"id": "tristesse", "label": "Tristesse"}, {"id": "colere", "label": "Colere"}, {"id": "peur", "label": "Peur"}, {"id": "desir", "label": "Desir"}, {"id": "tendresse", "label": "Tendresse"}, {"id": "frustration", "label": "Frustration"}, {"id": "gratitude", "label": "Gratitude"}, {"id": "vulnerabilite", "label": "Vulnerabilite"}] },
        { type: 'message', content: [{"text": "Et quelles emotions BLOQUES-TU ou CACHES ?", "bold": true}, {"text": "\n\n"}, {"text": "(Tu peux en choisir plusieurs)", "italic": true}] },
        { type: 'choice', variable: 'emotions_bloquees_c15b', multiple: true, options: [{"id": "joie", "label": "Joie"}, {"id": "tristesse", "label": "Tristesse"}, {"id": "colere", "label": "Colere"}, {"id": "peur", "label": "Peur"}, {"id": "desir", "label": "Desir"}, {"id": "tendresse", "label": "Tendresse"}, {"id": "frustration", "label": "Frustration"}, {"id": "gratitude", "label": "Gratitude"}, {"id": "vulnerabilite", "label": "Vulnerabilite"}] },
        { type: 'narrative', content: [{"text": "C16. Quels besoins as-tu du mal a EXPRIMER en relation ?", "bold": true}, {"text": "\n\n"}, {"text": "Exemples : ", "italic": true}, {"text": "'Besoin de reassurance', 'Besoin d'espace', 'Besoin d'affection physique', 'Besoin d'etre comprise', 'Besoin de temps pour moi', 'Besoin de soutien emotionnel'", "italic": true}] },
        { type: 'text_input', variable: 'besoins_non_exprimes_c16', placeholder: "Les besoins que j'ai du mal a exprimer...", isLong: true },

        /* ════════════════════════════════════ */
        { type: 'section', title: "BLOC 6 - Forces (C17-C19)" },

        { type: 'message', content: [{"text": "FORCES RELATIONNELLES", "bold": true}, {"text": "\n\n"}, {"text": "Maintenant, celebrons ce qui est beau en toi..."}] },
        { type: 'narrative', content: [{"text": "C17. Quelles sont tes 3 qualites dont tu es FIERE en relation ?", "bold": true}, {"text": "\n\n"}, {"text": "Exemples : ", "italic": true}, {"text": "Ecoute profonde, Loyaute, Empathie, Humour, Patience, Generosite, Authenticite, Capacite a pardonner, Resilience, Communication, Tendresse, Creativite...", "italic": true}] },
        { type: 'text_input', variable: 'qualites_relationnelles_c17', placeholder: "Mes 3 qualites relationnelles...", isLong: true },
        { type: 'narrative', content: [{"text": "C18. Raconte un MOMENT ou tu as reussi quelque chose en relation (meme petit) - un moment ou tu as ete fiere de toi", "bold": true}, {"text": "\n\n"}, {"text": "Exemples : ", "italic": true}, {"text": "'J'ai reussi a exprimer un besoin', 'J'ai pose une limite', 'J'ai pardonne', 'Je suis partie d'une relation toxique', 'J'ai communique calmement en conflit'...", "italic": true}] },
        { type: 'text_input', variable: 'moment_succes_c18', placeholder: "Un moment ou j'ai ete fiere de moi en relation...", isLong: true },
        { type: 'message', content: [{"text": "C19. Quelles ressources interieures t'ont aidee a traverser les moments difficiles en amour ?", "bold": true}, {"text": "\n\n"}, {"text": "(Tu peux en choisir plusieurs)", "italic": true}] },
        { type: 'choice', variable: 'ressources_resilience_c19', multiple: true, options: [{"id": "ma_foi_ma_connexion_spiritue", "label": "Ma foi / Ma connexion spirituelle"}, {"id": "mon_entourage_amis_famille", "label": "Mon entourage (amis, famille)"}, {"id": "l_ecriture_le_journaling", "label": "L'ecriture / Le journaling"}, {"id": "la_meditation_la_priere", "label": "La meditation / La priere"}, {"id": "ma_force_interieure", "label": "Ma force interieure"}, {"id": "les_lectures_l_apprentissage", "label": "Les lectures / L'apprentissage"}, {"id": "une_activite_creative", "label": "Une activite creative"}, {"id": "le_sport_le_mouvement", "label": "Le sport / Le mouvement"}, {"id": "le_temps_laisser_passer", "label": "Le temps - Laisser passer"}, {"id": "la_therapie_l_accompagnement", "label": "La therapie / L'accompagnement"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "BLOC 7 - Vision (C20-C21)" },

        { type: 'message', content: [{"text": "VISION", "bold": true}, {"text": "\n\n"}, {"text": "Terminons par ce que tu souhaites vivre..."}] },
        { type: 'narrative', content: [{"text": "C20. Decris l'amour que tu veux vivre - ton ideal", "bold": true}, {"text": "\n\n"}, {"text": "Pas les details physiques ou materiels, mais l'", "italic": true}, {"text": "essence", "bold": true, "italic": true}, {"text": " de la relation que tu veux vivre...", "italic": true}] },
        { type: 'text_input', variable: 'vision_amour_ideal_c20', placeholder: "L'amour que je veux vivre...", isLong: true },
        { type: 'message', content: [{"text": "C21. Sur une echelle de 1 a 10, a quel point te sens-tu alignee avec cette vision aujourd'hui ?", "bold": true}, {"text": "\n\n"}, {"text": "1 = tres loin | 10 = presque la", "italic": true}] },
        { type: 'rating', variable: 'alignement_vision_c21', max: 10, leftLabel: "Tres loin", rightLabel: "Presque la" },

        /* ════════════════════════════════════ */
        { type: 'section', title: "BLOC 8 - Pause Sacree" },

        { type: 'message', content: [{"text": "PAUSE SACREE", "bold": true}] },
        { type: 'narrative', content: [{"text": "Tu viens de faire un travail "}, {"text": "immense", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Tu as observe tes "}, {"text": "cycles", "bold": true}, {"text": " AVEC tes "}, {"text": "forces", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Tu n'es pas que tes patterns - tu as aussi des "}, {"text": "ressources precieuses", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "\"Et Il vous a montre Ses signes. Lequel donc des bienfaits d'Allah nierez-vous ?\" (55:13)", "italic": true}, {"text": "\n\n"}, {"text": "Meme dans les repetitions, il y a des "}, {"text": "signes", "bold": true}, {"text": " a voir."}] },
        { type: 'message', content: "Bois de l'eau.\n\nEtire-toi.\n\nFerme les yeux quelques secondes.\n\nRespire profondement et honore ce travail de conscience." },
        { type: 'narrative', content: [{"text": "Bravo", "bold": true}, {"text": " !"}, {"text": "\n\n"}, {"text": "Tu viens de completer le Formulaire 3 EXPRESS V2 - La Boussole."}, {"text": "\n\n"}, {"text": "Tes reponses vont etre analysees pour t'offrir un accompagnement personnalise."}] },
        { type: 'choice', variable: 'continuer_vers_f4', options: [{"id": "continuer_vers_le_formulaire_4", "label": "Continuer vers le Formulaire 4"}] },

        { type: 'completion', title: "Félicitations !", message: "Tu as terminé La Boussole — Ce Qui Compte Vraiment. Tes réponses ont été sauvegardées.", icon: '🧭' }
    ]
};

/* ─── Form Registry ─── */
if (typeof window.FORM_REGISTRY === 'undefined') window.FORM_REGISTRY = {};
window.FORM_REGISTRY['f3-express'] = F3_EXPRESS;
