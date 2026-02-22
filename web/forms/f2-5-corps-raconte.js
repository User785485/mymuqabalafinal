/* ═══════════════════════════════════════
   F2.5 — Le Corps Raconte
   Converti depuis Typebot · 165 steps · 48 variables
═══════════════════════════════════════ */

const F2_5_CORPS_RACONTE = {
    id: 'f2_5_corps_raconte',
    version: 1,
    title: "F2.5 — Le Corps Raconte",
    icon: '🫀',
    checkboxId: 'f2_5',
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
        "alimentation_bien_etre",
        "alimentation_emotionnelle",
        "atouts_seduction_conscients",
        "authenticite_du_style",
        "besoins_validation_esthetique",
        "comparaison_autres_femmes",
        "comportements_addictifs",
        "correspondance_perception",
        "declencheurs_dissociation",
        "empechement_strategie",
        "equilibre_pudeur_feminite",
        "evolution_image_corporelle",
        "fonction_addictions",
        "frequence_dissociation",
        "histoire_medicale_significative",
        "impact_addictions",
        "impact_complexes_sur_relations",
        "impact_corps_sur_relations",
        "impact_dissociation",
        "impact_reseaux_sociaux",
        "influence_regard_masculin",
        "message_du_corps_a_l_amour",
        "messages_recus_sur_le_corps",
        "mouvement_regulation_emotionnelle",
        "mouvement_source",
        "nature_rituels_beaute",
        "origine_addictions",
        "partie_du_corps_aimee",
        "partie_du_corps_difficile",
        "perception_dans_le_miroir",
        "perception_par_les_autres",
        "prenom_strategies",
        "prete_a_deposer_armure",
        "protection_principale",
        "relation_activite_physique",
        "relation_alimentation",
        "relation_avec_le_corps",
        "ressources_ancrage",
        "restriction_alimentaire",
        "rituels_beaute_bien_etre",
        "rituels_de_soin",
        "sensation_corps_en_mouvement",
        "signes_dissociation",
        "strategies_comportementales",
        "strategies_mentales",
        "style_et_feminite",
        "telephone",
        "utilisation_atouts_seduction"
],

    steps: [

        /* ════════════════════════════════════ */
        { type: 'section', title: "Accueil Stratégies et Corps" },

        { type: 'image', url: "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHNlYXJjaHw1fHxwYXlzYWdlfGVufDB8MHx8fDE3NTU0MzYxNDF8MA&ixlib=rb-4.1.0&q=80&w=1080", alt: "" },
        { type: 'message', content: [{"text": "Formulaire 2.5 : Stratégies de Survie et Relation au Corps", "bold": true, "italic": true}] },
        { type: 'narrative', content: [{"text": "🌿 Voici le "}, {"text": "dernier formulaire", "bold": true}, {"text": " de ta Phase Croissance !"}, {"text": "\n\n"}, {"text": "Explorons tes "}, {"text": "stratégies de protection", "bold": true}, {"text": " et ton "}, {"text": "rapport au corps", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "💡 "}, {"text": "Pourquoi c'est essentiel ?", "bold": true}, {"text": "\n\n"}, {"text": "Tes stratégies de survie t'ont "}, {"text": "protégée enfant", "bold": true}, {"text": "..."}, {"text": "\n\n"}, {"text": "Mais aujourd'hui, elles peuvent "}, {"text": "bloquer l'amour", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Ton corps garde la "}, {"text": "mémoire de tout", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Le reconnecter, c'est retrouver ta "}, {"text": "puissance", "bold": true}, {"text": "."}] },
        { type: 'message', content: "Une dernière fois pour cette phase, ton prénom :" },
        { type: 'text_input', variable: 'prenom_strategies', placeholder: "Ton prénom..." },
        { type: 'phone_input', variable: 'telephone', placeholder: "06 12 34 56 78", defaultPrefix: '+33' },
        { type: 'email_input', variable: 'email', placeholder: "ton.email@exemple.com" },
        { type: 'narrative', content: [{"text": "📍 "}, {"text": "Note d'encouragement", "bold": true}, {"text": "\n\n"}, {"text": "Tu as déjà parcouru tant de chemin dans cette phase."}, {"text": "\n\n"}, {"text": "Cette dernière exploration va "}, {"text": "tout relier", "bold": true}, {"text": "."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "explorer_mes_strategies_de_sur", "label": "Explorer mes stratégies de survie →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Préparation stratégies" },

        { type: 'message', content: [{"text": "📍 Découvrons tes "}, {"text": "stratégies de survie émotionnelle", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "💡 "}, {"text": "Compréhension clé :", "bold": true}, {"text": "\n\n"}, {"text": "Enfant, tu as développé des stratégies "}, {"text": "brillantes", "bold": true}, {"text": " pour survivre."}, {"text": "\n\n"}, {"text": "Ces armures t'ont protégée... mais maintenant elles peuvent t'"}, {"text": "isoler de l'amour", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "Honore ces stratégies. Elles t'ont "}, {"text": "sauvée", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Maintenant, tu peux choisir quand les garder ou les déposer."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "identifier_mes_armures", "label": "Identifier mes armures →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Stratégies de survie" },

        { type: 'message', content: [{"text": "Tes "}, {"text": "stratégies MENTALES", "bold": true}, {"text": " de protection :"}] },
        { type: 'choice', variable: 'strategies_mentales', multiple: true, options: [{"id": "intellectualisation_je_rat", "label": "🧠 Intellectualisation • Je rationalise tout pour ne pas ressentir"}, {"id": "hypervigilance_je_scanne", "label": "👁️ Hypervigilance • Je scanne constamment les dangers"}, {"id": "dissociation_je_me_deconn", "label": "☁️ Dissociation • Je me déconnecte de la réalité"}, {"id": "monde_fantasme_je_prefere", "label": "🦄 Monde fantasmé • Je préfère mes rêves à la réalité"}, {"id": "rumination_je_tourne_en_bo", "label": "🔄 Rumination • Je tourne en boucle sur les problèmes"}, {"id": "projection_j_imagine_le_pi", "label": "🎯 Projection • J'imagine le pire pour m'y préparer"}, {"id": "deni_je_refuse_de_voir_ce", "label": "🙈 Déni • Je refuse de voir ce qui fait mal"}, {"id": "minimisation_c_est_pas_si", "label": "🔍 Minimisation • \"C'est pas si grave\""}, {"id": "perfectionnisme_si_c_est_p", "label": "💎 Perfectionnisme • Si c'est parfait, je serai en sécurité"}, {"id": "controle_mental_je_dois_to", "label": "🎮 Contrôle mental • Je dois tout prévoir et maîtriser"}] },
        { type: 'message', content: [{"text": "Tes "}, {"text": "stratégies COMPORTEMENTALES", "bold": true}, {"text": " :"}] },
        { type: 'choice', variable: 'strategies_comportementales', multiple: true, options: [{"id": "fuite_je_pars_avant_que_ca", "label": "🏃 Fuite • Je pars avant que ça devienne trop proche"}, {"id": "attaque_la_meilleure_defe", "label": "⚔️ Attaque • La meilleure défense, c'est l'attaque"}, {"id": "gel_je_me_fige_je_ne_reag", "label": "🧊 Gel • Je me fige, je ne réagis plus"}, {"id": "soumission_je_dis_oui_a_to", "label": "🙇 Soumission • Je dis oui à tout pour éviter le conflit"}, {"id": "seduction_je_charme_pour_c", "label": "💋 Séduction • Je charme pour contrôler"}, {"id": "performance_je_joue_un_rol", "label": "🎭 Performance • Je joue un rôle pour être aimée"}, {"id": "isolation_je_me_coupe_des", "label": "🏝️ Isolation • Je me coupe des autres"}, {"id": "suractivite_je_m_epuise", "label": "🏃‍♀️ Suractivité • Je m'épuise pour ne pas penser"}, {"id": "dependance_je_m_accroche_p", "label": "🔗 Dépendance • Je m'accroche pour ne pas être seule"}, {"id": "auto_sabotage_je_detruis_a", "label": "💣 Auto-sabotage • Je détruis avant d'être détruite"}] },
        { type: 'message', content: [{"text": "Ta stratégie "}, {"text": "PRINCIPALE", "bold": true}, {"text": " te protège de quoi ?"}] },
        { type: 'text_input', variable: 'protection_principale', placeholder: "Ma stratégie principale me protège de...", isLong: true },
        { type: 'message', content: [{"text": "Mais elle t'"}, {"text": "empêche", "bold": true}, {"text": " aussi de... ?"}] },
        { type: 'text_input', variable: 'empechement_strategie', placeholder: "Cette stratégie m'empêche de...", isLong: true },
        { type: 'message', content: [{"text": "Es-tu "}, {"text": "prête", "bold": true}, {"text": " à explorer la possibilité de déposer cette armure ?"}] },
        { type: 'choice', variable: 'prete_a_deposer_armure', options: [{"id": "oui_je_suis_prete_a_explore", "label": "✨ Oui, je suis prête à explorer cette possibilité"}, {"id": "oui_mais_tres_doucement_et", "label": "🌱 Oui, mais très doucement et progressivement"}, {"id": "j_ai_peur_mais_je_veux_essay", "label": "😰 J'ai peur mais je veux essayer"}, {"id": "pas_encore_j_ai_encore_bes", "label": "🛡️ Pas encore, j'ai encore besoin de cette protection"}, {"id": "oui_mais_j_aurai_besoin_d_a", "label": "🤝 Oui, mais j'aurai besoin d'aide et de soutien"}, {"id": "peut_etre_juste_dans_certain", "label": "🌗 Peut-être juste dans certains contextes sécurisants"}] },
        { type: 'choice', variable: 'choix', options: [{"id": "respirer_un_moment", "label": "Respirer un moment →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Pause douceur" },

        { type: 'image', url: "https://images.unsplash.com/photo-1545205597-3d9d02c29597", alt: "" },
        { type: 'message', content: [{"text": "🌸 "}, {"text": "Pause reconnaissance", "bold": true}] },
        { type: 'narrative', content: [{"text": "Tu viens de faire quelque chose de "}, {"text": "très courageux", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Regarder ses armures en face demande une "}, {"text": "immense bravoure", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Tu n'es pas obligée de tout changer tout de suite."}, {"text": "\n\n"}, {"text": "La conscience est déjà le "}, {"text": "premier pas", "bold": true}, {"text": "."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "explorer_mon_rapport_au_corps", "label": "Explorer mon rapport au corps →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Préparation temple du corps" },

        { type: 'message', content: [{"text": "📍 Explorons ton "}, {"text": "temple sacré", "bold": true}, {"text": " : ton corps."}] },
        { type: 'narrative', content: [{"text": "💡 "}, {"text": "Vérité puissante :", "bold": true}, {"text": "\n\n"}, {"text": "Ton corps est ta "}, {"text": "première maison", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Comment tu l'habites influence "}, {"text": "comment tu aimes", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Ton corps garde la mémoire de tout : les caresses ET les blessures."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "honorer_mon_temple", "label": "Honorer mon temple →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Addictions et compensations" },

        { type: 'message', content: [{"text": "🌀 J'aimerais explorer avec toi les "}, {"text": "compensations", "bold": true}, {"text": " que tu as peut-être développées."}] },
        { type: 'narrative', content: [{"text": "💙 Il n'y a "}, {"text": "aucun jugement", "bold": true}, {"text": " ici."}, {"text": "\n\n"}, {"text": "Les addictions sont souvent des tentatives d'"}, {"text": "automédication", "bold": true}, {"text": " face à la douleur."}] },
        { type: 'message', content: [{"text": "As-tu remarqué des "}, {"text": "comportements répétitifs", "bold": true}, {"text": " qui t'apaisent temporairement ?"}] },
        { type: 'choice', variable: 'comportements_addictifs', multiple: true, options: [{"id": "nourriture_reconfort_restr", "label": "🍰 Nourriture (réconfort, restriction, compulsion)"}, {"id": "ecrans_reseaux_sociaux_scro", "label": "📱 Écrans/réseaux sociaux (scrolling infini)"}, {"id": "shopping_achats_compulsifs", "label": "🛍️ Shopping (achats compulsifs)"}, {"id": "travail_surmenage_fuite_da", "label": "💼 Travail (surmenage, fuite dans le faire)"}, {"id": "relations_toxiques_dependan", "label": "💔 Relations toxiques (dépendance affective)"}, {"id": "substances_tabac_alcool_m", "label": "🚬 Substances (tabac, alcool, médicaments)"}, {"id": "jeux_paris_jeux_video_exce", "label": "🎲 Jeux (paris, jeux vidéo excessifs)"}, {"id": "sexualite_compulsive", "label": "🌹 Sexualité compulsive"}, {"id": "sport_excessif_blessures_ig", "label": "🏃 Sport excessif (blessures ignorées)"}, {"id": "aucune_compensation_notable", "label": "✨ Aucune compensation notable"}] },
        { type: 'message', content: "Ces comportements servent souvent à :" },
        { type: 'choice', variable: 'fonction_addictions', multiple: true, options: [{"id": "anesthesier_une_douleur_emot", "label": "💉 Anesthésier une douleur émotionnelle"}, {"id": "remplir_un_vide_interieur", "label": "🕳️ Remplir un vide intérieur"}, {"id": "reprendre_le_controle_quand", "label": "🎯 Reprendre le contrôle quand tout semble chaotique"}, {"id": "me_punir_pour_quelque_chose", "label": "⛓️ Me punir pour quelque chose"}, {"id": "me_recompenser_apres_des_epr", "label": "🎁 Me récompenser après des épreuves"}, {"id": "fuir_une_realite_trop_diffic", "label": "🏃 Fuir une réalité trop difficile"}, {"id": "me_connecter_aux_autres_par", "label": "🤝 Me connecter aux autres (paradoxalement)"}, {"id": "ressentir_quelque_chose_mem", "label": "💖 Ressentir quelque chose (même négatif)"}] },
        { type: 'message', content: [{"text": "Quel "}, {"text": "impact", "bold": true}, {"text": " ces comportements ont-ils sur ta vie ?"}] },
        { type: 'text_input', variable: 'impact_addictions', placeholder: "L'impact sur ma vie, mes relations, ma santé...", isLong: true },
        { type: 'message', content: [{"text": "Peux-tu identifier "}, {"text": "quand", "bold": true}, {"text": " ces comportements ont commencé ?"}] },
        { type: 'message', content: [{"text": "💭 Y avait-il un événement déclencheur ? Une période particulière ?", "italic": true}] },
        { type: 'text_input', variable: 'origine_addictions', placeholder: "L'origine de ces comportements...", isLong: true },
        { type: 'narrative', content: [{"text": "💙 Merci pour ton "}, {"text": "honnêteté", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Reconnaître ces mécanismes est le premier pas vers la "}, {"text": "libération", "bold": true}, {"text": "."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "explorer_la_dissociation", "label": "Explorer la dissociation →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Image corporelle et perception" },

        { type: 'message', content: [{"text": "🪞 Explorons maintenant ta relation à ton "}, {"text": "image corporelle", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "💡 "}, {"text": "Pourquoi c'est crucial ?", "bold": true}, {"text": "\n\n"}, {"text": "Ton rapport à ton corps influence directement ta "}, {"text": "confiance en relation", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Comment tu te perçois colore comment tu permets aux autres de t'aimer."}] },
        { type: 'message', content: "🪞 Quand tu te regardes dans le miroir, que vois-tu en premier ?" },
        { type: 'choice', variable: 'perception_dans_le_miroir', options: [{"id": "ce_que_j_aime_chez_moi", "label": "😍 Ce que j'aime chez moi"}, {"id": "mes_defauts_et_imperfections", "label": "😔 Mes défauts et imperfections"}, {"id": "une_image_objective_et_neut", "label": "👁️ Une image objective et neutre"}, {"id": "ca_depend_de_mon_humeur", "label": "🌊 Ça dépend de mon humeur"}, {"id": "j_evite_de_me_regarder_vraim", "label": "😶 J'évite de me regarder vraiment"}, {"id": "une_version_que_je_dois_amel", "label": "🎭 Une version que je dois améliorer"}, {"id": "une_femme_belle_et_digne_d_a", "label": "✨ Une femme belle et digne d'amour"}, {"id": "je_me_concentre_sur_les_deta", "label": "🔍 Je me concentre sur les détails négatifs"}] },
        { type: 'message', content: [{"text": "Comment cette perception a-t-elle "}, {"text": "évolué", "bold": true}, {"text": " depuis l'adolescence ?"}] },
        { type: 'text_input', variable: 'evolution_image_corporelle', placeholder: "Depuis l'adolescence, ma perception de mon corps...", isLong: true },
        { type: 'message', content: [{"text": "🎯 "}, {"text": "COMPLEXES ET ZONES D'AMOUR", "bold": true}] },
        { type: 'message', content: [{"text": "Quelle partie de ton corps "}, {"text": "aimes-tu le plus", "bold": true}, {"text": " ?"}] },
        { type: 'text_input', variable: 'partie_du_corps_aimee', placeholder: "J'aime le plus..." },
        { type: 'message', content: [{"text": "Et celle que tu "}, {"text": "acceptes le moins", "bold": true}, {"text": " ?"}] },
        { type: 'text_input', variable: 'partie_du_corps_difficile', placeholder: "J'ai du mal à accepter..." },
        { type: 'message', content: [{"text": "Comment ces complexes "}, {"text": "influencent tes relations intimes", "bold": true}, {"text": " ?"}] },
        { type: 'text_input', variable: 'impact_complexes_sur_relations', placeholder: "Dans mes relations, mes complexes corporels font que je...", isLong: true },
        { type: 'message', content: "📱 Quel impact ont les réseaux sociaux sur ta perception de ton corps ?" },
        { type: 'choice', variable: 'impact_reseaux_sociaux', options: [{"id": "impact_tres_negatif_je_me_c", "label": "📉 Impact très négatif, je me compare constamment"}, {"id": "impact_moderement_negatif_p", "label": "😔 Impact modérément négatif, parfois décourageant"}, {"id": "impact_neutre_je_ne_me_com", "label": "⚖️ Impact neutre, je ne me compare pas vraiment"}, {"id": "impact_positif_j_y_trouve_d", "label": "💪 Impact positif, j'y trouve de l'inspiration"}, {"id": "aucun_impact_je_ne_suis_pas", "label": "🚫 Aucun impact, je ne suis pas sur les réseaux"}, {"id": "j_ai_appris_a_filtrer_et_me", "label": "🎯 J'ai appris à filtrer et me protéger"}] },
        { type: 'message', content: [{"text": "Te "}, {"text": "compares-tu physiquement", "bold": true}, {"text": " aux autres femmes ?"}] },
        { type: 'text_input', variable: 'comparaison_autres_femmes', placeholder: "Quand je vois d'autres femmes, je...", isLong: true },
        { type: 'choice', variable: 'choix', options: [{"id": "explorer_ma_relation_au_mouvem", "label": "Explorer ma relation au mouvement →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Activité physique et mouvement" },

        { type: 'message', content: [{"text": "🏃‍♀️ Explorons ta relation au "}, {"text": "mouvement et à l'activité physique", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "💡 "}, {"text": "Révélation importante :", "bold": true}, {"text": "\n\n"}, {"text": "Ton rapport au sport révèle ton rapport à l'"}, {"text": "effort", "bold": true}, {"text": ", à la "}, {"text": "performance", "bold": true}, {"text": " et au "}, {"text": "plaisir corporel", "bold": true}, {"text": "."}] },
        { type: 'message', content: "💃 Comment décrirais-tu ta relation à l'activité physique ?" },
        { type: 'choice', variable: 'relation_activite_physique', options: [{"id": "j_adore_bouger_c_est_mon_pl", "label": "💕 J'adore bouger, c'est mon plaisir"}, {"id": "c_est_ma_discipline_je_me_f", "label": "💪 C'est ma discipline, je me force"}, {"id": "c_est_complique_j_aimerais", "label": "😅 C'est compliqué, j'aimerais mais..."}, {"id": "c_est_mon_exutoire_emotio", "label": "🏃‍♀️ C'est mon exutoire émotionnel"}, {"id": "c_est_purement_esthetique_po", "label": "📊 C'est purement esthétique/poids"}, {"id": "je_suis_plutot_sedentaire", "label": "😴 Je suis plutôt sédentaire"}, {"id": "c_est_vital_pour_mon_equilib", "label": "⚡ C'est vital pour mon équilibre"}, {"id": "c_est_social_j_aime_les_spo", "label": "🎯 C'est social, j'aime les sports d'équipe"}, {"id": "je_prefere_les_mouvements", "label": "🧘‍♀️ Je préfère les mouvements doux (yoga, marche)"}] },
        { type: 'message', content: [{"text": "Utilises-tu l'exercice physique pour "}, {"text": "réguler tes émotions", "bold": true}, {"text": " ?"}] },
        { type: 'text_input', variable: 'mouvement_regulation_emotionnelle', placeholder: "Quand je vais mal, le mouvement...", isLong: true },
        { type: 'message', content: "🎭 Ton corps en mouvement est-il source de..." },
        { type: 'choice', variable: 'mouvement_source', options: [{"id": "performance_il_faut_que_je", "label": "🏆 Performance • Il faut que je sois la meilleure"}, {"id": "plaisir_j_ecoute_ce_qui_me", "label": "🌸 Plaisir • J'écoute ce qui me fait du bien"}, {"id": "les_deux_selon_l_activite", "label": "⚖️ Les deux selon l'activité"}, {"id": "controle_pour_maintenir_mo", "label": "📏 Contrôle • Pour maintenir mon poids/forme"}, {"id": "connection_je_me_sens_reli", "label": "🤝 Connection • Je me sens reliée à mon corps"}, {"id": "anxiete_peur_du_regard_de", "label": "😰 Anxiété • Peur du regard, de mal faire"}, {"id": "evasion_pour_oublier_mes_s", "label": "🎪 Évasion • Pour oublier mes soucis"}] },
        { type: 'message', content: [{"text": "Comment te "}, {"text": "sens-tu dans ton corps", "bold": true}, {"text": " quand tu bouges ?"}] },
        { type: 'text_input', variable: 'sensation_corps_en_mouvement', placeholder: "Quand je bouge, mon corps...", isLong: true },
        { type: 'choice', variable: 'choix', options: [{"id": "explorer_ma_relation_a_l_alime", "label": "Explorer ma relation à l'alimentation →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Alimentation et nutrition émotionnelle" },

        { type: 'message', content: [{"text": "🍎 Explorons ta relation à la "}, {"text": "nourriture et à l'alimentation", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "💡 "}, {"text": "Pourquoi c'est révélateur ?", "bold": true}, {"text": "\n\n"}, {"text": "Notre façon de nourrir notre corps reflète notre façon de "}, {"text": "prendre soin de nous-mêmes", "bold": true}, {"text": "."}] },
        { type: 'message', content: "🍽️ Comment décrirais-tu ta relation à l'alimentation ?" },
        { type: 'choice', variable: 'relation_alimentation', options: [{"id": "sereine_et_intuitive", "label": "😊 Sereine et intuitive"}, {"id": "compliquee_et_culpabilisante", "label": "😰 Compliquée et culpabilisante"}, {"id": "controlee_et_disciplinee", "label": "🎯 Contrôlée et disciplinée"}, {"id": "emotionnelle_et_variable", "label": "🌊 Émotionnelle et variable"}, {"id": "fonctionnelle_pour_l_ene", "label": "🏃‍♀️ Fonctionnelle, pour l'énergie"}, {"id": "guidee_par_mes_valeurs_relig", "label": "🕌 Guidée par mes valeurs religieuses"}, {"id": "source_de_plaisir_et_partag", "label": "❤️ Source de plaisir et partage"}, {"id": "obsessionnelle_avec_le_poid", "label": "⚖️ Obsessionnelle avec le poids"}, {"id": "je_n_y_pense_pas_vraiment", "label": "🤷‍♀️ Je n'y pense pas vraiment"}] },
        { type: 'message', content: "💭 As-tu le sentiment de manger tes émotions ? Dans quelles situations ?" },
        { type: 'text_input', variable: 'alimentation_emotionnelle', placeholder: "Je mange mes émotions quand...", isLong: true },
        { type: 'message', content: [{"text": "Te "}, {"text": "restreins-tu", "bold": true}, {"text": " ou te prives-tu parfois ?"}] },
        { type: 'text_input', variable: 'restriction_alimentaire', placeholder: "Je me restreins quand...", isLong: true },
        { type: 'message', content: [{"text": "Comment l'alimentation "}, {"text": "influence-t-elle ton bien-être", "bold": true}, {"text": " général ?"}] },
        { type: 'text_input', variable: 'alimentation_bien_etre', placeholder: "L'alimentation impacte mon bien-être car...", isLong: true },
        { type: 'choice', variable: 'choix', options: [{"id": "explorer_le_regard_des_autres", "label": "Explorer le regard des autres →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Regard des autres et validation" },

        { type: 'message', content: [{"text": "👁️ Explorons l'impact du "}, {"text": "regard des autres", "bold": true}, {"text": " sur ton rapport à ton corps."}] },
        { type: 'narrative', content: [{"text": "💡 "}, {"text": "Dimension sociale cruciale :", "bold": true}, {"text": "\n\n"}, {"text": "Notre rapport au corps est façonné par le "}, {"text": "regard social", "bold": true}, {"text": ". Comprendre cette influence te libère."}] },
        { type: 'message', content: "👀 Comment penses-tu être perçue physiquement par les autres ?" },
        { type: 'text_input', variable: 'perception_par_les_autres', placeholder: "Je pense que les autres me voient comme...", isLong: true },
        { type: 'message', content: [{"text": "Cette perception "}, {"text": "correspond-elle", "bold": true}, {"text": " à ce que tu ressens intérieurement ?"}] },
        { type: 'choice', variable: 'correspondance_perception', options: [{"id": "oui_totalement_aligne", "label": "✅ Oui, totalement aligné"}, {"id": "parfois_oui_parfois_non", "label": "🌊 Parfois oui, parfois non"}, {"id": "non_il_y_a_un_decalage", "label": "❌ Non, il y a un décalage"}, {"id": "je_n_en_ai_aucune_idee", "label": "🤷‍♀️ Je n'en ai aucune idée"}, {"id": "j_ai_peur_de_la_realite", "label": "😰 J'ai peur de la réalité"}] },
        { type: 'message', content: "👨 Le regard des hommes influence-t-il ta façon de t'habiller ou te comporter ?" },
        { type: 'choice', variable: 'influence_regard_masculin', options: [{"id": "jamais_je_m_habille_pour_mo", "label": "🚫 Jamais, je m'habille pour moi"}, {"id": "inconsciemment_peut_etre", "label": "🤔 Inconsciemment peut-être"}, {"id": "oui_je_veux_plaire", "label": "👗 Oui, je veux plaire"}, {"id": "oui_je_veux_me_proteger", "label": "🛡️ Oui, je veux me protéger"}, {"id": "ca_depend_du_contexte", "label": "⚖️ Ça dépend du contexte"}, {"id": "j_utilise_ca_strategiquement", "label": "🎯 J'utilise ça stratégiquement"}] },
        { type: 'message', content: "💎 De quelle validation esthétique as-tu besoin ?" },
        { type: 'text_input', variable: 'besoins_validation_esthetique', placeholder: "J'ai besoin qu'on me dise que je suis...", isLong: true },
        { type: 'choice', variable: 'choix', options: [{"id": "explorer_ma_sensualite_quotidi", "label": "Explorer ma sensualité quotidienne →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Sensualité et expression quotidienne" },

        { type: 'message', content: [{"text": "🌹 Explorons comment tu exprimes ta "}, {"text": "féminité et ta sensualité", "bold": true}, {"text": " au quotidien."}] },
        { type: 'narrative', content: [{"text": "💡 "}, {"text": "Au-delà de la sexualité :", "bold": true}, {"text": "\n\n"}, {"text": "La sensualité c'est "}, {"text": "habiter pleinement", "bold": true}, {"text": " ton corps de femme, tous les jours."}] },
        { type: 'message', content: "👗 Comment exprimes-tu ta féminité dans ton style vestimentaire ?" },
        { type: 'text_input', variable: 'style_et_feminite', placeholder: "Mon style exprime ma féminité par...", isLong: true },
        { type: 'message', content: [{"text": "Tes choix vestimentaires "}, {"text": "reflètent-ils ta personnalité", "bold": true}, {"text": " profonde ?"}] },
        { type: 'choice', variable: 'authenticite_du_style', options: [{"id": "completement_je_suis_authen", "label": "✨ Complètement, je suis authentique"}, {"id": "partiellement_je_joue_parfo", "label": "🎭 Partiellement, je joue parfois un rôle"}, {"id": "peu_je_me_conforme_aux_atte", "label": "❌ Peu, je me conforme aux attentes"}, {"id": "je_suis_en_transition", "label": "🚧 Je suis en transition"}, {"id": "je_n_y_ai_jamais_reflechi", "label": "🤷‍♀️ Je n'y ai jamais réfléchi"}] },
        { type: 'message', content: "💄 Quels sont tes rituels de beauté/bien-être quotidiens ?" },
        { type: 'text_input', variable: 'rituels_beaute_bien_etre', placeholder: "Mes rituels beauté/bien-être...", isLong: true },
        { type: 'message', content: [{"text": "Ces rituels sont-ils source de "}, {"text": "plaisir ou de contrainte", "bold": true}, {"text": " ?"}] },
        { type: 'text_input', variable: 'nature_rituels_beaute', placeholder: "Ces rituels sont... pour moi", isLong: true },
        { type: 'message', content: "🎯 Quels sont tes atouts de séduction dont tu es consciente ?" },
        { type: 'text_input', variable: 'atouts_seduction_conscients', placeholder: "Je sais que je séduis par...", isLong: true },
        { type: 'message', content: [{"text": "Comment "}, {"text": "utilises-tu", "bold": true}, {"text": " (ou non) ces atouts ?"}] },
        { type: 'text_input', variable: 'utilisation_atouts_seduction', placeholder: "J'utilise mes atouts de séduction...", isLong: true },
        { type: 'message', content: "🕌 Comment concilies-tu pudeur religieuse et expression de ta féminité ?" },
        { type: 'text_input', variable: 'equilibre_pudeur_feminite', placeholder: "Entre pudeur et féminité, je...", isLong: true },
        { type: 'narrative', content: [{"text": "Tu as exploré avec courage tous les aspects de ta "}, {"text": "relation au corps", "bold": true}, {"text": " et à ta "}, {"text": "féminité", "bold": true}, {"text": "."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "terminer_cette_exploration_cor", "label": "Terminer cette exploration corporelle →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Temple du corps" },

        { type: 'message', content: "Mon corps et moi, c'est..." },
        { type: 'choice', variable: 'relation_avec_le_corps', multiple: true, options: [{"id": "ma_meilleure_amie_on_s_eco", "label": "💝 Ma meilleure amie • On s'écoute et se respecte"}, {"id": "une_etrangere_je_ne_la_con", "label": "👤 Une étrangère • Je ne la connais pas vraiment"}, {"id": "mon_ennemie_on_est_en_gue", "label": "⚔️ Mon ennemie • On est en guerre permanente"}, {"id": "un_outil_elle_doit_perform", "label": "🔧 Un outil • Elle doit performer et obéir"}, {"id": "un_fardeau_elle_me_pese_e", "label": "⛓️ Un fardeau • Elle me pèse et me limite"}, {"id": "mon_temple_je_la_venere_e", "label": "🏛️ Mon temple • Je la vénère et la soigne"}, {"id": "ma_prison_je_m_y_sens_enfe", "label": "🔒 Ma prison • Je m'y sens enfermée"}, {"id": "mon_alliee_on_apprend_a_co", "label": "🤝 Mon alliée • On apprend à collaborer"}, {"id": "un_mystere_je_ne_la_compre", "label": "❓ Un mystère • Je ne la comprends pas"}, {"id": "en_reconciliation_on_se_re", "label": "🌱 En réconciliation • On se retrouve doucement"}] },
        { type: 'message', content: [{"text": "Les "}, {"text": "messages reçus", "bold": true}, {"text": " sur ton corps de femme :"}] },
        { type: 'choice', variable: 'messages_recus_sur_le_corps', multiple: true, options: [{"id": "cache_toi_ton_corps_atti", "label": "🙈 \"Cache-toi\" • Ton corps attire le danger"}, {"id": "aie_honte_tes_formes_son", "label": "😳 \"Aie honte\" • Tes formes sont embarrassantes"}, {"id": "sois_parfaite_ton_corps", "label": "💎 \"Sois parfaite\" • Ton corps doit être irréprochable"}, {"id": "maigris_tu_prends_trop_d", "label": "📏 \"Maigris\" • Tu prends trop de place"}, {"id": "silence_total_on_ne_parlai", "label": "🤐 Silence total • On ne parlait pas du corps"}, {"id": "c_est_dangereux_ton_cor", "label": "⚠️ \"C'est dangereux\" • Ton corps peut te trahir"}, {"id": "c_est_ton_pouvoir_utilis", "label": "👑 \"C'est ton pouvoir\" • Utilise-le intelligemment"}, {"id": "c_est_peche_le_plaisir_e", "label": "🚫 \"C'est péché\" • Le plaisir est interdit"}, {"id": "tu_es_belle_celebration", "label": "🌹 \"Tu es belle\" • Célébration de ta féminité"}, {"id": "messages_contradictoires_s", "label": "🎭 Messages contradictoires • Sois belle mais pas trop"}] },
        { type: 'message', content: [{"text": "Mes "}, {"text": "rituels de soin", "bold": true}, {"text": " (ou leur absence) :"}] },
        { type: 'text_input', variable: 'rituels_de_soin', placeholder: "Pour prendre soin de mon corps, je...", isLong: true },
        { type: 'narrative', content: [{"text": "Mon "}, {"text": "histoire médicale/corporelle", "bold": true}, {"text": " significative :"}, {"text": "\n\n"}, {"text": "(Opérations, maladies, accidents, transformations...)", "italic": true}] },
        { type: 'text_input', variable: 'histoire_medicale_significative', placeholder: "Mon corps a vécu...", isLong: true },
        { type: 'message', content: [{"text": "Comment ton rapport au corps "}, {"text": "affecte tes relations", "bold": true}, {"text": " ?"}] },
        { type: 'text_input', variable: 'impact_corps_sur_relations', placeholder: "Dans l'intimité, mon rapport au corps...", isLong: true },
        { type: 'message', content: [{"text": "Si ton corps pouvait "}, {"text": "parler à ton futur amour", "bold": true}, {"text": ", que dirait-il ?"}] },
        { type: 'text_input', variable: 'message_du_corps_a_l_amour', placeholder: "Mon corps dirait : ...", isLong: true },
        { type: 'message', content: [{"text": "Tu as osé regarder tes "}, {"text": "armures et ton temple", "bold": true}, {"text": " avec honnêteté."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "terminer_la_phase_croissance", "label": "Terminer la Phase Croissance →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Clôture Phase Croissance" },

        { type: 'image', url: "https://images.unsplash.com/photo-1502945015378-0e284ca1a5be", alt: "" },
        { type: 'narrative', content: [{"text": "🌿✨ "}, {"text": "FÉLICITATIONS !", "bold": true}, {"text": " ✨🌿"}, {"text": "\n\n"}, {"text": "Tu viens de compléter TOUTE la "}, {"text": "Phase Croissance", "bold": true}, {"text": " !"}] },
        { type: 'message', content: "Durant cette phase, tu as exploré :\n\n✓ L'atmosphère de ton enfance\n\n✓ Tes figures parentales\n\n✓ Les dynamiques familiales\n\n✓ Tes racines et blessures\n\n✓ Tes stratégies de survie\n\n✓ Ton rapport au corps" },
        { type: 'narrative', content: [{"text": "💡 Tu viens de cartographier les "}, {"text": "racines de tes patterns", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Cette conscience est le "}, {"text": "pouvoir de transformation", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Tu n'es plus condamnée à répéter. Tu peux "}, {"text": "choisir", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "La "}, {"text": "Phase 3 : Enracinement", "bold": true}, {"text": " t'attend."}, {"text": "\n\n"}, {"text": "Tu y exploreras tes "}, {"text": "patterns relationnels actuels", "bold": true}, {"text": " et découvriras tes "}, {"text": "forces cachées", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "🎉 "}, {"text": "Célèbre-toi !", "bold": true}, {"text": "\n\n"}, {"text": "Tu viens de faire un travail "}, {"text": "monumental", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Offre-toi quelque chose de doux pour honorer ce chemin."}] },
        { type: 'narrative', content: [{"text": "📩 Pour m’informer que tu as complété la "}, {"text": "Phase 2", "bold": true}, {"text": ", il te suffit de cliquer sur le lien ci-dessous."}, {"text": "\n\n"}, {"text": "\n Un message pré-rempli s’ouvrira automatiquement sur WhatsApp que tu n’auras qu’à envoyer :"}, {"text": "\n\n"}, {"text": "👉 "}, {"text": "\n\n"}, {"text": "Cela me permet de suivre ton avancée et d’avancer dans la suite du programme pour toi, insha’Allah."}, {"text": "\n\n"}, {"text": "Je te dis à très vite ! 🌿"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Dissociation" },

        { type: 'message', content: [{"text": "🌫️ Explorons maintenant les moments où tu te "}, {"text": "déconnectes", "bold": true}, {"text": " de toi-même."}] },
        { type: 'narrative', content: [{"text": "💙 La dissociation est une "}, {"text": "protection naturelle", "bold": true}, {"text": " du cerveau."}, {"text": "\n\n"}, {"text": "Face à trop d'intensité, on \"sort\" de notre corps ou de nos émotions."}] },
        { type: 'message', content: [{"text": "As-tu déjà vécu ces "}, {"text": "expériences", "bold": true}, {"text": " ?"}] },
        { type: 'choice', variable: 'signes_dissociation', multiple: true, options: [{"id": "brouillard_mental_difficul", "label": "🌫️ Brouillard mental (difficulté à penser clairement)"}, {"id": "mode_automatique_faire_sans", "label": "🤖 Mode automatique (faire sans ressentir)"}, {"id": "observer_sa_vie_de_l_exteri", "label": "👁️ Observer sa vie de l'extérieur"}, {"id": "sentiment_d_irrealite_rien", "label": "🌌 Sentiment d'irréalité (rien ne semble vrai)"}, {"id": "ne_plus_sentir_son_corps", "label": "👻 Ne plus sentir son corps"}, {"id": "perdre_la_notion_du_temps", "label": "⏰ Perdre la notion du temps"}, {"id": "trous_de_memoire_frequents", "label": "🧩 Trous de mémoire fréquents"}, {"id": "coupure_totale_des_emotions", "label": "😶 Coupure totale des émotions"}, {"id": "ne_plus_savoir_qui_on_est_vr", "label": "🎭 Ne plus savoir qui on est vraiment"}, {"id": "je_ne_me_reconnais_dans_aucu", "label": "✅ Je ne me reconnais dans aucun de ces signes"}] },
        { type: 'message', content: [{"text": "Qu'est-ce qui "}, {"text": "déclenche", "bold": true}, {"text": " ces moments de déconnexion ?"}] },
        { type: 'choice', variable: 'declencheurs_dissociation', multiple: true, options: [{"id": "conflits_ou_confrontations", "label": "💥 Conflits ou confrontations"}, {"id": "moments_d_intimite_physique", "label": "💕 Moments d'intimité (physique ou émotionnelle)"}, {"id": "stress_intense_ou_deadlines", "label": "😰 Stress intense ou deadlines"}, {"id": "emotions_trop_fortes", "label": "🌊 Émotions trop fortes"}, {"id": "rappels_de_souvenirs_doulour", "label": "📸 Rappels de souvenirs douloureux"}, {"id": "situations_sexuelles", "label": "🌹 Situations sexuelles"}, {"id": "critiques_ou_jugements", "label": "🗣️ Critiques ou jugements"}, {"id": "foules_ou_groupes", "label": "👥 Foules ou groupes"}, {"id": "situations_de_performance", "label": "🎭 Situations de performance"}, {"id": "ca_arrive_de_facon_aleatoire", "label": "🎲 Ça arrive de façon aléatoire"}] },
        { type: 'message', content: [{"text": "À quelle "}, {"text": "fréquence", "bold": true}, {"text": " vis-tu ces déconnexions ?"}] },
        { type: 'rating', variable: 'frequence_dissociation', max: 10, leftLabel: "Jamais", rightLabel: "Très souvent" },
        { type: 'message', content: [{"text": "Comment cela "}, {"text": "impacte", "bold": true}, {"text": "-t-il tes relations ?"}] },
        { type: 'message', content: [{"text": "💬 Notamment dans l'intimité ou les moments importants...", "italic": true}] },
        { type: 'text_input', variable: 'impact_dissociation', placeholder: "L'impact sur mes relations...", isLong: true },
        { type: 'message', content: [{"text": "Qu'est-ce qui t'aide à "}, {"text": "revenir", "bold": true}, {"text": " dans ton corps ?"}] },
        { type: 'text_input', variable: 'ressources_ancrage', placeholder: "Ce qui m'ancre (respiration, mouvement, nature...)...", isLong: true },
        { type: 'narrative', content: [{"text": "💙 Ton système nerveux a fait de son mieux pour te "}, {"text": "protéger", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Maintenant, tu peux apprendre à rester présente en sécurité."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "explorer_mon_image_corporelle", "label": "Explorer mon image corporelle →"}] },

        { type: 'completion', title: "Félicitations !", message: "Tu as terminé F2.5 — Le Corps Raconte. Tes réponses ont été sauvegardées.", icon: '🫀' }
    ]
};

/* ─── Form Registry ─── */
if (typeof window.FORM_REGISTRY === 'undefined') window.FORM_REGISTRY = {};
window.FORM_REGISTRY['f2-5-corps-raconte'] = F2_5_CORPS_RACONTE;
