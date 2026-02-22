/* ═══════════════════════════════════════
   F2.3 — Les Échos d'Enfance
   Converti depuis Typebot · 72 steps · 16 variables
═══════════════════════════════════════ */

const F2_3_ECHOS = {
    id: 'f2_3_echos',
    version: 1,
    title: "F2.3 — Les Échos d'Enfance",
    icon: '👶',
    checkboxId: 'f2_3',
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
        "apprentissage_sur_l_amour",
        "figures_inspirantes",
        "impact_fratrie_sur_amour",
        "impact_sur_ideal_amoureux",
        "integration_des_qualites",
        "metaphore_danse_parents",
        "modeles_rejetes",
        "moment_comprehension_dynamique",
        "pattern_reproduit_ou_evite",
        "position_dans_famille",
        "prenom_dynamiques",
        "qualites_admirees",
        "relations_avec_freres",
        "relations_avec_surs",
        "role_assigne_famille",
        "telephone"
],

    steps: [

        /* ════════════════════════════════════ */
        { type: 'section', title: "Accueil Dynamiques Familiales" },

        { type: 'image', url: "https://images.unsplash.com/photo-1511895426328-dc8714191300", alt: "" },
        { type: 'message', content: [{"text": "Formulaire 2.3 : Les Dynamiques Familiales", "bold": true, "italic": true}] },
        { type: 'narrative', content: [{"text": "🌿 Tu continues magnifiquement ta "}, {"text": "Phase Croissance", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Maintenant, explorons les "}, {"text": "dynamiques relationnelles", "bold": true}, {"text": " qui t'ont modelée."}] },
        { type: 'narrative', content: [{"text": "💡 "}, {"text": "Pourquoi c'est crucial ?", "bold": true}, {"text": "\n\n"}, {"text": "Le couple de tes parents était ton "}, {"text": "premier modèle d'amour", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Ta place dans la fratrie a défini ton "}, {"text": "rôle relationnel", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Ces dynamiques sont les "}, {"text": "empreintes invisibles", "bold": true}, {"text": " qui structurent tes relations actuelles. "}] },
        { type: 'message', content: "Rappelle-moi ton prénom :" },
        { type: 'text_input', variable: 'prenom_dynamiques', placeholder: "Ton prénom..." },
        { type: 'phone_input', variable: 'telephone', placeholder: "06 12 34 56 78", defaultPrefix: '+33' },
        { type: 'email_input', variable: 'email', placeholder: "ton.email@exemple.com" },
        { type: 'narrative', content: [{"text": "📍 "}, {"text": "Note importante", "bold": true}, {"text": "\n\n"}, {"text": "Observer ces dynamiques ne signifie pas "}, {"text": "blâmer", "bold": true}, {"text": " qui que ce soit."}, {"text": "\n\n"}, {"text": "C'est simplement comprendre les "}, {"text": "scripts inconscients", "bold": true}, {"text": " que tu rejoues."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "observer_la_relation_parentale", "label": "Observer la relation parentale →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Préparation danse parentale" },

        { type: 'message', content: [{"text": "📍 Explorons la "}, {"text": "relation entre tes parents", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "💡 "}, {"text": "Révélation puissante :", "bold": true}, {"text": "\n\n"}, {"text": "On reproduit souvent la relation de nos parents..."}, {"text": "\n\n"}, {"text": "Soit en la "}, {"text": "répétant exactement", "bold": true}, {"text": ","}, {"text": "\n\n"}, {"text": "Soit en faisant "}, {"text": "l'exact opposé", "bold": true}, {"text": " (ce qui nous y enchaîne aussi)."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "comprendre_leur_danse", "label": "Comprendre leur danse →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Danse relationnelle parentale" },

        { type: 'message', content: [{"text": "Si la relation de tes parents était une "}, {"text": "danse", "bold": true}, {"text": ", ce serait :"}] },
        { type: 'choice', variable: 'metaphore_danse_parents', options: [{"id": "un_tango_passionne_et_inte", "label": "💃 Un tango • Passionné et intense"}, {"id": "une_valse_elegante_en_appa", "label": "🎭 Une valse • Élégante en apparence, mais rigide et codifiée"}, {"id": "du_rock_energique_mais_cha", "label": "🎸 Du rock • Énergique mais chaotique, on ne sait jamais qui mène"}, {"id": "un_slow_colles_l_un_a_l_au", "label": "🕺 Un slow • Collés l'un à l'autre, fusionnels, étouffants"}, {"id": "une_bataille_chacun_danse", "label": "⚔️ Une bataille • Chacun danse sa partition, ça clashe"}, {"id": "danse_des_robots_mecanique", "label": "🤖 Danse des robots • Mécanique, sans émotion, routinière"}, {"id": "deux_solos_chacun_dans_son", "label": "🚶 Deux solos • Chacun dans son monde, pas de connexion"}, {"id": "bal_masque_faux_semblants", "label": "🎭 Bal masqué • Faux-semblants, on joue des rôles"}, {"id": "danse_immobile_figes_dans", "label": "🛑 Danse immobile • Figés dans leurs positions, rien ne bouge"}, {"id": "freestyle_chaotique_imprev", "label": "🌀 Freestyle chaotique • Imprévisible, sans harmonie"}] },
        { type: 'message', content: [{"text": "En les observant, qu'as-tu "}, {"text": "appris sur l'amour", "bold": true}, {"text": " ?"}] },
        { type: 'choice', variable: 'apprentissage_sur_l_amour', multiple: true, options: [{"id": "l_amour_est_un_combat_perma", "label": "⚔️ L'amour est un combat permanent"}, {"id": "un_des_deux_doit_toujours_s", "label": "🕊️ Un des deux doit toujours se sacrifier"}, {"id": "les_non_dits_tuent_l_amour_l", "label": "🤐 Les non-dits tuent l'amour lentement"}, {"id": "sans_passion_drame_ce_n_est", "label": "🔥 Sans passion/drame, ce n'est pas de l'amour"}, {"id": "il_faut_maintenir_les_appare", "label": "🎭 Il faut maintenir les apparences coûte que coûte"}, {"id": "l_amour_est_une_lutte_de_pou", "label": "👑 L'amour est une lutte de pouvoir"}, {"id": "trop_de_proximite_tue_l_amou", "label": "🚪 Trop de proximité tue l'amour"}, {"id": "l_amour_rend_dependant_et_fa", "label": "🔗 L'amour rend dépendant et faible"}, {"id": "l_amour_devient_routine_avec", "label": "📅 L'amour devient routine avec le temps"}, {"id": "l_amour_durable_est_possible", "label": "💝 L'amour durable est possible malgré les défis"}] },
        { type: 'message', content: [{"text": "Raconte-moi "}, {"text": "le moment", "bold": true}, {"text": " où tu as vraiment compris leur dynamique :"}] },
        { type: 'text_input', variable: 'moment_comprehension_dynamique', placeholder: "Je me souviens du jour où j'ai réalisé que...", isLong: true },
        { type: 'message', content: [{"text": "Le pattern de leur relation que tu "}, {"text": "reproduis ou évites à tout prix", "bold": true}, {"text": " :"}] },
        { type: 'text_input', variable: 'pattern_reproduit_ou_evite', placeholder: "Dans mes relations, je me surprends à...", isLong: true },
        { type: 'choice', variable: 'choix', options: [{"id": "explorer_ma_constellation_fami", "label": "Explorer ma constellation familiale →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Préparation constellation" },

        { type: 'message', content: [{"text": "📍 Voyons maintenant ta "}, {"text": "place dans la constellation familiale", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "💡 "}, {"text": "Pourquoi c'est important :", "bold": true}, {"text": "\n\n"}, {"text": "Ta position (aînée, cadette, du milieu...) a créé ton "}, {"text": "identité relationnelle", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Le rôle qu'on t'a donné, tu continues souvent à le jouer dans tes relations amoureuses."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "identifier_ma_place", "label": "Identifier ma place →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Constellation fraternelle" },

        { type: 'message', content: [{"text": "Ta "}, {"text": "position", "bold": true}, {"text": " dans la famille :"}] },
        { type: 'choice', variable: 'position_dans_famille', multiple: true, options: [{"id": "l_ainee_premiere_nee_j_ai", "label": "👑 L'aînée • Première née, j'ai ouvert la voie"}, {"id": "du_milieu_coincee_entre_le", "label": "🌉 Du milieu • Coincée entre les autres"}, {"id": "la_benjamine_la_petite_der", "label": "🧸 La benjamine • La petite dernière"}, {"id": "enfant_unique_toute_l_atte", "label": "💎 Enfant unique • Toute l'attention sur moi"}, {"id": "jumelle_nee_avec_mon_doubl", "label": "👯 Jumelle • Née avec mon double"}, {"id": "grand_ecart_beaucoup_d_an", "label": "🏝️ Grand écart • Beaucoup d'années avec mes frères/sœurs"}, {"id": "adoptee_arrivee_dans_la_co", "label": "🌟 Adoptée • Arrivée dans la constellation"}, {"id": "famille_recomposee_positio", "label": "🏠 Famille recomposée • Position changeante"}] },
        { type: 'message', content: [{"text": "Le "}, {"text": "rôle", "bold": true}, {"text": " qu'on t'a assigné (consciemment ou non) :"}] },
        { type: 'choice', variable: 'role_assigne_famille', multiple: true, options: [{"id": "la_responsable_celle_qui", "label": "🛡️ La responsable • Celle qui prend soin de tous"}, {"id": "l_invisible_celle_qu_on_ou", "label": "👻 L'invisible • Celle qu'on oublie facilement"}, {"id": "la_rebelle_celle_qui_defie", "label": "⚡ La rebelle • Celle qui défie l'autorité"}, {"id": "la_parfaite_celle_qui_ne_d", "label": "⭐ La parfaite • Celle qui ne déçoit jamais"}, {"id": "la_mediatrice_celle_qui_a", "label": "🕊️ La médiatrice • Celle qui apaise les conflits"}, {"id": "le_clown_celle_qui_detend", "label": "🎭 Le clown • Celle qui détend l'atmosphère"}, {"id": "la_fragile_celle_dont_on_s", "label": "🏥 La fragile • Celle dont on s'inquiète"}, {"id": "la_confidente_celle_a_qui", "label": "🤫 La confidente • Celle à qui on dit tout"}, {"id": "le_bouc_emissaire_celle_qu", "label": "🐐 Le bouc émissaire • Celle qu'on blâme"}, {"id": "l_eternelle_enfant_celle_q", "label": "👶 L'éternelle enfant • Celle qu'on surprotège"}] },
        { type: 'narrative', content: [{"text": "Tes relations avec tes "}, {"text": "sœurs", "bold": true}, {"text": " aujourd'hui :"}, {"text": "\n\n"}, {"text": "(Si tu n'as pas de sœurs, écris \"pas de sœurs\")", "italic": true}] },
        { type: 'text_input', variable: 'relations_avec_surs', placeholder: "Avec mes sœurs, c'est...", isLong: true },
        { type: 'narrative', content: [{"text": "Tes relations avec tes "}, {"text": "frères", "bold": true}, {"text": " aujourd'hui :"}, {"text": "\n\n"}, {"text": "(Si tu n'as pas de frères, écris \"pas de frères\")", "italic": true}] },
        { type: 'text_input', variable: 'relations_avec_freres', placeholder: "Avec mes frères, c'est...", isLong: true },
        { type: 'message', content: [{"text": "Comment ces dynamiques fraternelles influencen"}, {"text": "t tes relations amoureuses", "bold": true}, {"text": " ?"}] },
        { type: 'text_input', variable: 'impact_fratrie_sur_amour', placeholder: "Dans mes relations amoureuses, je retrouve...", isLong: true },
        { type: 'choice', variable: 'choix', options: [{"id": "prendre_une_pause", "label": "Prendre une pause →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Pause bienveillance" },

        { type: 'image', url: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94", alt: "" },
        { type: 'message', content: [{"text": "🌸 "}, {"text": "Pause intégration", "bold": true}] },
        { type: 'narrative', content: [{"text": "Tu viens de revisiter des "}, {"text": "dynamiques profondes", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "C'est beaucoup d'informations à intégrer."}, {"text": "\n\n"}, {"text": "Respire. Tu fais un travail "}, {"text": "extraordinaire", "bold": true}, {"text": "."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "explorer_mes_modeles_d_identif", "label": "Explorer mes modèles d'identification →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Préparation modèles" },

        { type: 'message', content: [{"text": "🆕 Explorons maintenant tes "}, {"text": "modèles d'identification", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "💡 "}, {"text": "Découverte fascinante :", "bold": true}, {"text": "\n\n"}, {"text": "Au-delà de ta famille, tu as choisi des "}, {"text": "figures inspirantes", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Ces modèles révèlent qui tu "}, {"text": "aspires à être", "bold": true}, {"text": " et ce que tu "}, {"text": "cherches en amour", "bold": true}, {"text": "."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "identifier_mes_modeles", "label": "Identifier mes modèles →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Mes modèles d'identification" },

        { type: 'narrative', content: [{"text": "Quelles "}, {"text": "figures t'ont inspirée", "bold": true}, {"text": " dans ta vie ?"}, {"text": "\n\n"}, {"text": "(Réelles ou fictives : prof, tante, personnage de film, héroïne...)", "italic": true}] },
        { type: 'text_input', variable: 'figures_inspirantes', placeholder: "Les figures qui m'ont marquée sont...", isLong: true },
        { type: 'message', content: [{"text": "Qu'est-ce que tu "}, {"text": "admirais", "bold": true}, {"text": " chez ces figures ?"}] },
        { type: 'choice', variable: 'qualites_admirees', multiple: true, options: [{"id": "leur_force_et_independance", "label": "💪 Leur force et indépendance"}, {"id": "leur_douceur_et_bienveillanc", "label": "🌸 Leur douceur et bienveillance"}, {"id": "leur_intelligence_et_sagesse", "label": "🧠 Leur intelligence et sagesse"}, {"id": "leur_courage_face_aux_epreuv", "label": "🦁 Leur courage face aux épreuves"}, {"id": "leur_creativite_et_originali", "label": "🎨 Leur créativité et originalité"}, {"id": "leur_liberte_et_authenticite", "label": "🦅 Leur liberté et authenticité"}, {"id": "leur_capacite_d_aimer", "label": "💝 Leur capacité d'aimer"}, {"id": "leur_resilience_et_capacite", "label": "🌱 Leur résilience et capacité de rebondir"}, {"id": "leur_leadership_naturel", "label": "👑 Leur leadership naturel"}, {"id": "leur_connexion_spirituelle", "label": "✨ Leur connexion spirituelle"}] },
        { type: 'message', content: [{"text": "Comment as-tu "}, {"text": "intégré leurs qualités", "bold": true}, {"text": " ?"}] },
        { type: 'text_input', variable: 'integration_des_qualites', placeholder: "J'ai développé en moi...", isLong: true },
        { type: 'message', content: [{"text": "À l'inverse, quels modèles "}, {"text": "rejettes-tu", "bold": true}, {"text": " et pourquoi ?"}] },
        { type: 'text_input', variable: 'modeles_rejetes', placeholder: "Je refuse d'être comme...", isLong: true },
        { type: 'message', content: [{"text": "L'impact sur ton "}, {"text": "idéal amoureux", "bold": true}, {"text": " :"}] },
        { type: 'message', content: "Ces modèles t'ont fait rechercher quel type de partenaire ?" },
        { type: 'text_input', variable: 'impact_sur_ideal_amoureux', placeholder: "Dans mes relations, je cherche quelqu'un qui...", isLong: true },
        { type: 'choice', variable: 'choix', options: [{"id": "terminer_ce_formulaire", "label": "Terminer ce formulaire →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Clôture formulaire" },

        { type: 'image', url: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70", alt: "" },
        { type: 'message', content: [{"text": "🌿 "}, {"text": "Félicitations !", "bold": true}, {"text": " Tu viens de terminer le Formulaire 2.3."}] },
        { type: 'message', content: "Tu as courageusement exploré :\n\n✓ La danse relationnelle de tes parents\n\n✓ Ta place et ton rôle dans la constellation familiale\n\n✓ Tes modèles d'identification et leur impact" },
        { type: 'narrative', content: [{"text": "💡 "}, {"text": "Prise de conscience majeure :", "bold": true}, {"text": "\n\n"}, {"text": "Tu vois maintenant les "}, {"text": "scripts invisibles", "bold": true}, {"text": " que tu rejoues."}, {"text": "\n\n"}, {"text": "Cette conscience est le "}, {"text": "pouvoir de réécrire", "bold": true}, {"text": " ton histoire."}] },
        { type: 'message', content: "Progression Phase 2 : [■■■□□] 3/5 formulaires complétés" },
        { type: 'narrative', content: [{"text": "Le "}, {"text": "Formulaire 2.4", "bold": true}, {"text": " t'attend pour explorer tes racines et blessures."}, {"text": "\n\n"}, {"text": "Tu y découvriras les blessures fondamentales qui colorent encore ta vie amoureuse."}] },
        { type: 'message', content: [{"text": "Tu es sur le chemin de ta liberté émotionnelle... 🌸"}, {"text": "\n\n"}, {"text": "Chaque découverte te rapproche de l'amour que tu mérites.", "italic": true}] },

        { type: 'completion', title: "Félicitations !", message: "Tu as terminé F2.3 — Les Échos d'Enfance. Tes réponses ont été sauvegardées.", icon: '👶' }
    ]
};

/* ─── Form Registry ─── */
if (typeof window.FORM_REGISTRY === 'undefined') window.FORM_REGISTRY = {};
window.FORM_REGISTRY['f2-3-echos'] = F2_3_ECHOS;
