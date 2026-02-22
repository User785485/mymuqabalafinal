/* ═══════════════════════════════════════
   S10 — Le Futur se Dessine
   Converti depuis Typebot · 88 steps · 8 variables
═══════════════════════════════════════ */

const S10_FUTUR_SE_DESSINE = {
    id: 's10_futur_se_dessine',
    version: 1,
    title: "S10 — Le Futur se Dessine",
    icon: '🎨',
    checkboxId: 's10',
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
        "action_dans_les_24h",
        "blessure_encore_presente",
        "dimension_prioritaire",
        "engagement_sacre",
        "etat_face_a_la_synthese",
        "inspiration_du_futur",
        "qualite_developpee_recemment",
        "telephone"
],

    steps: [

        /* ════════════════════════════════════ */
        { type: 'section', title: "Cartographie émotionnelle - La Synthèse Sacrée" },

        { type: 'image', url: "https://images.unsplash.com/photo-1756758005190-92941d91b8b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NTk4NDY3MzZ8&ixlib=rb-4.1.0&q=80&w=1080", alt: "" },
        { type: 'message', content: [{"text": "Bienvenue dans ce dernier Scénario : La Synthèse Fractale", "bold": true}, {"text": "\n\n"}, {"text": "Avant tout, peux-tu me partager ces informations : "}] },
        { type: 'text_input', variable: 'reponse', placeholder: "Ton prénom..." },
        { type: 'email_input', variable: 'email', placeholder: "ton.email@exemple.com" },
        { type: 'phone_input', variable: 'telephone', placeholder: "06 12 34 56 78", defaultPrefix: '+33' },
        { type: 'message', content: "🌟 Toutes les dimensions convergent..." },
        { type: 'narrative', content: [{"text": "Nous voici au ", "bold": true}, {"text": "point culminant", "bold": true}, {"text": " de ton voyage..."}, {"text": "\n\n"}, {"text": "Là où toutes les dimensions explorées ", "italic": true}, {"text": "se rencontrent", "italic": true}, {"text": " pour révéler qui tu es ", "bold": true}, {"text": "vraiment", "bold": true}, {"text": " en amour."}, {"text": "\n\n"}, {"text": "Avant de plonger dans cette synthèse transformatrice..."}] },
        { type: 'message', content: [{"text": "✨ ", "bold": true}, {"text": "Comment arrives-tu à ce moment de synthèse ?"}] },
        { type: 'choice', variable: 'etat_face_a_la_synthese', options: [{"id": "avec_une_clarte_nouvelle_les", "label": "Avec une clarté nouvelle\n\"Les pièces du puzzle commencent à s'assembler\""}, {"id": "dans_une_douce_confusion_tant", "label": "Dans une douce confusion\n\"Tant d'insights, j'ai besoin d'intégrer\""}, {"id": "portee_par_l_espoir_je_sens_q", "label": "Portée par l'espoir\n\"Je sens que quelque chose de grand se prépare\""}, {"id": "avec_une_certaine_fatigue_j_a", "label": "Avec une certaine fatigue\n\"J'ai exploré tant de dimensions, j'ai besoin de repos\""}, {"id": "dans_l_anticipation_sacree_je", "label": "Dans l'anticipation sacrée\n\"Je suis prête pour la révélation finale\""}] },
        { type: 'narrative', content: [{"text": "Cette présence que tu portes est ", "bold": true}, {"text": "parfaite", "bold": true}, {"text": " pour ce moment."}, {"text": "\n\n"}, {"text": "Elle sera le terreau où germera ta vision intégrale."}] },
        { type: 'message', content: [{"text": "🎯 Et maintenant..."}, {"text": "\n\n"}, {"text": "Quelle dimension de ton être relationnel demande le plus d'attention en ce moment ?", "bold": true}] },
        { type: 'choice', variable: 'dimension_prioritaire', multiple: true, options: [{"id": "ma_capacite_a_faire_confiance", "label": "Ma capacité à faire confiance"}, {"id": "ma_clarte_sur_ce_que_je_veux_v", "label": "Ma clarté sur ce que je veux vraiment"}, {"id": "mon_rapport_aux_differences", "label": "Mon rapport aux différences"}, {"id": "ma_gestion_du_temps_relationne", "label": "Ma gestion du temps relationnel"}, {"id": "mon_equilibre_entre_autonomie", "label": "Mon équilibre entre autonomie et connexion"}, {"id": "tout_semble_important_en_meme", "label": "Tout semble important en même temps"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "L'histoire d'Amina - Celle qui porte toutes les dimensions" },

        { type: 'narrative', content: [{"text": "Il existe une femme qui porte en elle ", "italic": true}, {"text": "toutes les dimensions", "italic": true}, {"text": " que tu as explorées..."}, {"text": "\n\n"}, {"text": "Son nom est ", "bold": true}, {"text": "Amina", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Et son histoire pourrait être la tienne."}] },
        { type: 'image', url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHNlYXJjaHwxfHxzdGFyc3xlbnwwfDB8fHwxNzUzNTM1MDY2fDA&ixlib=rb-4.1.0&q=80&w=1080", alt: "" },
        { type: 'message', content: [{"text": "✨ ", "italic": true}, {"text": "Quand toutes les dimensions se rencontrent...", "italic": true}] },
        { type: 'narrative', content: [{"text": "Amina, 32 ans, assise dans son jardin au crépuscule."}, {"text": "\n\n"}, {"text": "Devant elle, un journal intime ouvert. Des années de questionnements, de découvertes, de ", "italic": true}, {"text": "cartographies émotionnelles", "italic": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Ce soir, elle sent que quelque chose de ", "bold": true}, {"text": "différent", "bold": true}, {"text": " se prépare."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "decouvrir_ce_moment_decisif", "label": "Découvrir ce moment décisif →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "La révélation fractale" },

        { type: 'narrative', content: [{"text": "Dans la douceur du soir, Amina ferme les yeux."}, {"text": "\n\n"}, {"text": "Et soudain, elle ", "bold": true}, {"text": "voit", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "Elle voit sa ", "bold": true}, {"text": "sécurité émotionnelle", "bold": true}, {"text": " : ce besoin d'être vue, comprise, tenue dans les tempêtes."}, {"text": "\n\n"}, {"text": "Elle voit sa ", "bold": true}, {"text": "clarté émotionnelle", "bold": true}, {"text": " : cette capacité grandissante à nommer ce qu'elle ressent."}, {"text": "\n\n"}, {"text": "Elle voit ses ", "bold": true}, {"text": "conflits transformés", "bold": true}, {"text": " : de la fuite à l'assertivité bienveillante."}, {"text": "\n\n"}, {"text": "Elle voit son ", "bold": true}, {"text": "rapport au temps", "bold": true}, {"text": " : cette danse entre patience et urgence."}] },
        { type: 'narrative', content: [{"text": "Plus profondément encore..."}, {"text": "\n\n"}, {"text": "Sa ", "bold": true}, {"text": "résilience", "bold": true}, {"text": " qui s'est forgée dans les épreuves."}, {"text": "\n\n"}, {"text": "Son ", "bold": true}, {"text": "intelligence relationnelle", "bold": true}, {"text": " qui lit entre les lignes."}, {"text": "\n\n"}, {"text": "Son ", "bold": true}, {"text": "style d'attachement", "bold": true}, {"text": " qui évolue vers la sécurité."}, {"text": "\n\n"}, {"text": "Son ", "bold": true}, {"text": "authenticité", "bold": true}, {"text": " qui ose se montrer vulnérable."}] },
        { type: 'narrative', content: [{"text": "Et dans cette vision, toutes ces dimensions ne sont plus ", "italic": true}, {"text": "séparées", "italic": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Elles forment une ", "bold": true}, {"text": "géométrie sacrée", "bold": true}, {"text": " : le ", "bold": true}, {"text": "mandala", "bold": true}, {"text": " de son être relationnel."}, {"text": "\n\n"}, {"text": "Chaque dimension ", "italic": true}, {"text": "nourrit", "italic": true}, {"text": " les autres. Chaque force ", "italic": true}, {"text": "équilibre", "italic": true}, {"text": " une fragilité. Chaque blessure ", "italic": true}, {"text": "révèle", "italic": true}, {"text": " une sagesse."}] },
        { type: 'narrative', content: [{"text": "Amina ouvre les yeux. Une larme de ", "bold": true}, {"text": "reconnaissance", "bold": true}, {"text": " coule."}, {"text": "\n\n"}, {"text": "\"", "italic": true}, {"text": "Je ne cherche plus quelqu'un pour me compléter", "italic": true}, {"text": ",\" murmure-t-elle."}, {"text": "\n\n"}, {"text": "\"", "italic": true}, {"text": "Je suis déjà complète. Je cherche quelqu'un avec qui danser cette complétude.", "italic": true}, {"text": "\""}] },
        { type: 'choice', variable: 'choix', options: [{"id": "m_explorer_dans_ce_miroir", "label": "M'explorer dans ce miroir →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Ta projection dans le présent" },

        { type: 'narrative', content: [{"text": "Avant de continuer avec Amina..."}, {"text": "\n\n"}, {"text": "Plongeons dans ", "bold": true}, {"text": "ta", "bold": true}, {"text": " géométrie sacrée."}] },
        { type: 'narrative', content: [{"text": "🌟 ", "bold": true}, {"text": "En ce moment précis de ta vie..."}, {"text": "\n\n"}, {"text": "Si tu devais nommer la ", "bold": true}, {"text": "qualité relationnelle", "bold": true}, {"text": " que tu as le plus développée ces derniers mois, quelle serait-elle ?"}] },
        { type: 'choice', variable: 'qualite_developpee_recemment', multiple: true, options: [{"id": "ma_capacite_a_poser_des_limite", "label": "Ma capacité à poser des limites saines"}, {"id": "mon_ouverture_a_la_vulnerabili", "label": "Mon ouverture à la vulnérabilité"}, {"id": "ma_patience_dans_la_constructi", "label": "Ma patience dans la construction"}, {"id": "ma_clarte_sur_mes_besoins", "label": "Ma clarté sur mes besoins"}, {"id": "ma_resilience_face_aux_defis", "label": "Ma résilience face aux défis"}, {"id": "mon_authenticite_courageuse", "label": "Mon authenticité courageuse"}] },
        { type: 'message', content: [{"text": "Cette qualité est une ", "bold": true}, {"text": "pierre précieuse", "bold": true}, {"text": " dans ton mandala relationnel..."}] },
        { type: 'narrative', content: [{"text": "Creusons plus ", "bold": true}, {"text": "profond", "bold": true}, {"text": "..."}, {"text": "\n\n"}, {"text": "Quelle est la ", "bold": true}, {"text": "blessure", "bold": true}, {"text": " qui continue de guider certains de tes choix relationnels ?"}] },
        { type: 'text_input', variable: 'blessure_encore_presente', placeholder: "La blessure que je porte encore...", isLong: true },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Naviguer vers le futur" },

        { type: 'narrative', content: [{"text": "Cette conscience de ta blessure est ", "bold": true}, {"text": "sacrée", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Elle n'est pas une faiblesse mais une ", "italic": true}, {"text": "boussole", "italic": true}, {"text": " vers ta guérison."}] },
        { type: 'narrative', content: [{"text": "Revenons à Amina..."}, {"text": "\n\n"}, {"text": "Cette nuit-là, elle fait un ", "bold": true}, {"text": "rêve", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "Dans son rêve, elle se voit dans ", "italic": true}, {"text": "cinq ans", "italic": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Elle est dans une maison baignée de lumière. Des rires d'enfants au loin. Une main masculine pose du thé à la menthe sur la table. Un regard complice. Un sourire qui dit ", "italic": true}, {"text": "\"nous avons réussi\"", "italic": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Mais ce n'est pas la scène qui la frappe."}, {"text": "\n\n"}, {"text": "C'est la ", "bold": true}, {"text": "femme qu'elle est devenue", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "Cette femme a intégré toutes ses dimensions :"}, {"text": "\n\n"}, {"text": "✓ Sa ", "bold": true}, {"text": "sécurité", "bold": true}, {"text": " vient de l'intérieur"}, {"text": "\n\n"}, {"text": "✓ Sa ", "bold": true}, {"text": "clarté", "bold": true}, {"text": " guide ses choix"}, {"text": "\n\n"}, {"text": "✓ Ses ", "bold": true}, {"text": "conflits", "bold": true}, {"text": " deviennent des ponts"}, {"text": "\n\n"}, {"text": "✓ Son ", "bold": true}, {"text": "temps", "bold": true}, {"text": " est sacré et partagé"}, {"text": "\n\n"}, {"text": "✓ Sa ", "bold": true}, {"text": "résilience", "bold": true}, {"text": " est ancrée"}, {"text": "\n\n"}, {"text": "✓ Son ", "bold": true}, {"text": "intelligence", "bold": true}, {"text": " lit les cœurs"}, {"text": "\n\n"}, {"text": "✓ Son ", "bold": true}, {"text": "attachement", "bold": true}, {"text": " est libre"}, {"text": "\n\n"}, {"text": "✓ Son ", "bold": true}, {"text": "authenticité", "bold": true}, {"text": " rayonne"}, {"text": "\n\n"}, {"text": "✓ Sa ", "bold": true}, {"text": "spiritualité", "bold": true}, {"text": " l'ancre"}, {"text": "\n\n"}, {"text": "✓ Son ", "bold": true}, {"text": "intimité", "bold": true}, {"text": " est sacrée"}, {"text": "\n\n"}, {"text": "✓ Ses ", "bold": true}, {"text": "finances", "bold": true}, {"text": " sont équilibrées"}, {"text": "\n\n"}, {"text": "✓ Ses ", "bold": true}, {"text": "cultures", "bold": true}, {"text": " dansent ensemble"}, {"text": "\n\n"}, {"text": "✓ Sa ", "bold": true}, {"text": "santé mentale", "bold": true}, {"text": " est prioritaire"}] },
        { type: 'narrative', content: [{"text": "💫 ", "bold": true}, {"text": "Si tu étais Amina dans ce rêve..."}, {"text": "\n\n"}, {"text": "Quelle dimension de cette femme future t'", "bold": true}, {"text": "inspire", "bold": true}, {"text": " le plus ?"}] },
        { type: 'choice', variable: 'inspiration_du_futur', options: [{"id": "sa_paix_interieure_inebranlabl", "label": "Sa paix intérieure inébranlable"}, {"id": "sa_capacite_a_creer_l_harmonie", "label": "Sa capacité à créer l'harmonie"}, {"id": "son_authenticite_sans_compromi", "label": "Son authenticité sans compromis"}, {"id": "sa_sagesse_relationnelle", "label": "Sa sagesse relationnelle"}, {"id": "son_equilibre_entre_tous_les_a", "label": "Son équilibre entre tous les aspects"}, {"id": "sa_joie_profonde_et_sereine", "label": "Sa joie profonde et sereine"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Le miroir fractal personnalisé" },

        { type: 'image', url: "https://images.unsplash.com/photo-1662195471864-55c7e25e1f33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHNlYXJjaHwxfHxtYW5kYWxhfGVufDB8MHx8fDE3NTk4NDY2NDl8MA&ixlib=rb-4.1.0&q=80&w=1080", alt: "" },
        { type: 'message', content: [{"text": "Maintenant, regardons ton ", "bold": true}, {"text": "propre mandala", "bold": true}, {"text": "..."}] },
        { type: 'narrative', content: [{"text": "✨ À travers toutes tes explorations, une ", "bold": true}, {"text": "géométrie unique", "bold": true}, {"text": " émerge :"}, {"text": "\n\n"}, {"text": "Tu es celle qui porte en elle la capacité de ", "italic": true}, {"text": "transformer", "italic": true}, {"text": " :"}, {"text": "\n\n"}, {"text": "• Les ", "bold": true}, {"text": "peurs", "bold": true}, {"text": " en ", "bold": true}, {"text": "sagesse", "bold": true}, {"text": "\n\n"}, {"text": "• Les ", "bold": true}, {"text": "blessures", "bold": true}, {"text": " en ", "bold": true}, {"text": "compassion", "bold": true}, {"text": "\n\n"}, {"text": "• Les ", "bold": true}, {"text": "différences", "bold": true}, {"text": " en ", "bold": true}, {"text": "richesse", "bold": true}, {"text": "\n\n"}, {"text": "• Les ", "bold": true}, {"text": "conflits", "bold": true}, {"text": " en ", "bold": true}, {"text": "croissance", "bold": true}, {"text": "\n\n"}, {"text": "• Les ", "bold": true}, {"text": "attentes", "bold": true}, {"text": " en ", "bold": true}, {"text": "liberté", "bold": true}] },
        { type: 'narrative', content: [{"text": "Ce qui émerge de ton parcours :", "bold": true}, {"text": "\n\n"}, {"text": "• Tu navigues entre ", "italic": true}, {"text": "force", "italic": true}, {"text": " et ", "italic": true}, {"text": "vulnérabilité", "italic": true}, {"text": "\n\n"}, {"text": "• Tu cherches l'", "italic": true}, {"text": "équilibre", "italic": true}, {"text": " sans perdre ton ", "italic": true}, {"text": "essence", "italic": true}, {"text": "\n\n"}, {"text": "• Tu honores tes ", "italic": true}, {"text": "racines", "italic": true}, {"text": " tout en créant ton ", "italic": true}, {"text": "envol", "italic": true}, {"text": "\n\n"}, {"text": "• Tu intègres le ", "italic": true}, {"text": "sacré", "italic": true}, {"text": " dans le ", "italic": true}, {"text": "quotidien", "italic": true}, {"text": "\n\n"}, {"text": "• Tu danses entre ", "italic": true}, {"text": "tradition", "italic": true}, {"text": " et ", "italic": true}, {"text": "modernité", "italic": true}] },
        { type: 'narrative', content: [{"text": "Le secret de ta géométrie sacrée ?"}, {"text": "\n\n"}, {"text": "Tu n'es pas ", "italic": true}, {"text": "une seule dimension", "italic": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Tu es un ", "bold": true}, {"text": "univers fractal", "bold": true}, {"text": " où chaque partie contient le ", "bold": true}, {"text": "tout", "bold": true}, {"text": "."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "integrer_cette_vision", "label": "Intégrer cette vision →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Les outils d'intégration fractale" },

        { type: 'message', content: [{"text": "Pour vivre cette ", "bold": true}, {"text": "synthèse", "bold": true}, {"text": " au quotidien..."}] },
        { type: 'narrative', content: [{"text": "🔑 ", "bold": true}, {"text": "1. Le Rituel du Mandala Vivant"}, {"text": "\n\n"}, {"text": "Chaque matin, visualise ta ", "bold": true}, {"text": "géométrie sacrée", "bold": true}, {"text": " :"}, {"text": "\n\n"}, {"text": "• Respire dans chaque dimension"}, {"text": "\n\n"}, {"text": "• Sens leur ", "italic": true}, {"text": "interconnexion", "italic": true}, {"text": "\n\n"}, {"text": "• Choisis celle qui a besoin d'", "italic": true}, {"text": "attention", "italic": true}, {"text": " aujourd'hui"}, {"text": "\n\n"}, {"text": "• Pose une ", "italic": true}, {"text": "intention", "italic": true}, {"text": " pour l'honorer"}, {"text": "\n\n"}, {"text": "Tu deviens ", "bold": true}, {"text": "architecte consciente", "bold": true}, {"text": " de ton être relationnel."}] },
        { type: 'narrative', content: [{"text": "🌟 ", "bold": true}, {"text": "2. La Pratique de l'Alignement Fractal"}, {"text": "\n\n"}, {"text": "Face à chaque ", "bold": true}, {"text": "décision relationnelle", "bold": true}, {"text": ", demande-toi :"}, {"text": "\n\n"}, {"text": "✓ Cela nourrit-il ma ", "italic": true}, {"text": "sécurité", "italic": true}, {"text": " ?"}, {"text": "\n\n"}, {"text": "✓ Cela clarifie-t-il mes ", "italic": true}, {"text": "émotions", "italic": true}, {"text": " ?"}, {"text": "\n\n"}, {"text": "✓ Cela honore-t-il mon ", "italic": true}, {"text": "temps", "italic": true}, {"text": " ?"}, {"text": "\n\n"}, {"text": "✓ Cela renforce-t-il mon ", "italic": true}, {"text": "authenticité", "italic": true}, {"text": " ?"}, {"text": "\n\n"}, {"text": "✓ Cela élève-t-il notre ", "italic": true}, {"text": "connexion", "italic": true}, {"text": " ?"}, {"text": "\n\n"}, {"text": "Si la réponse vibre ", "bold": true}, {"text": "oui", "bold": true}, {"text": " dans plusieurs dimensions, tu es ", "bold": true}, {"text": "alignée", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "💫 ", "bold": true}, {"text": "3. Le Journal de Synthèse Fractale"}, {"text": "\n\n"}, {"text": "Une fois par semaine, écris :"}, {"text": "\n\n"}, {"text": "• Quelle dimension s'est ", "italic": true}, {"text": "renforcée", "italic": true}, {"text": " ?"}, {"text": "\n\n"}, {"text": "• Quelle dimension demande ", "italic": true}, {"text": "attention", "italic": true}, {"text": " ?"}, {"text": "\n\n"}, {"text": "• Comment elles ", "italic": true}, {"text": "dialoguent", "italic": true}, {"text": " entre elles ?"}, {"text": "\n\n"}, {"text": "• Quel ", "italic": true}, {"text": "pattern", "italic": true}, {"text": " émerge ?"}, {"text": "\n\n"}, {"text": "• Quelle ", "italic": true}, {"text": "transformation", "italic": true}, {"text": " se dessine ?"}, {"text": "\n\n"}, {"text": "Tu deviens ", "bold": true}, {"text": "témoin éveillée", "bold": true}, {"text": " de ta propre évolution."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "recevoir_la_dimension_spiritue", "label": "Recevoir la dimension spirituelle →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "La dimension sacrée de la synthèse" },

        { type: 'message', content: [{"text": "Il y a une ", "bold": true}, {"text": "sagesse divine", "bold": true}, {"text": " dans cette géométrie fractale..."}] },
        { type: 'image', url: "https://images.unsplash.com/photo-1543844788-21c3d7a81946?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHNlYXJjaHwxfHxpc2xhbWljJTIwcGF0dGVybnxlbnwwfHx8fDE2OTYwMDAwMDB8MA&ixlib=rb-4.0.3&q=80&w=1080", alt: "" },
        { type: 'narrative', content: [{"text": "🌙 ", "italic": true}, {"text": "\"Et de toute chose Nous avons créé un couple, peut-être vous rappellerez-vous.\"", "italic": true}, {"text": "\n\n"}, {"text": "Cette création en ", "italic": true}, {"text": "paires", "italic": true}, {"text": " n'est pas une ", "italic": true}, {"text": "division", "italic": true}, {"text": "."}, {"text": "\n\n"}, {"text": "C'est une invitation à la ", "bold": true}, {"text": "complétude consciente", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "Ta géométrie fractale révèle :"}, {"text": "\n\n"}, {"text": "• Tu es déjà ", "bold": true}, {"text": "entière", "bold": true}, {"text": "\n\n"}, {"text": "• L'autre n'est pas ta ", "italic": true}, {"text": "moitié manquante", "italic": true}, {"text": "\n\n"}, {"text": "• Il est le ", "bold": true}, {"text": "miroir", "bold": true}, {"text": " qui révèle ta ", "bold": true}, {"text": "lumière", "bold": true}, {"text": "\n\n"}, {"text": "• Ensemble, vous créez une ", "bold": true}, {"text": "nouvelle géométrie", "bold": true}, {"text": "\n\n"}, {"text": "• Plus complexe, plus belle, plus ", "italic": true}, {"text": "vivante", "italic": true}] },
        { type: 'narrative', content: [{"text": "La pratique spirituelle de la synthèse :"}, {"text": "\n\n"}, {"text": "🤲 Dans ton ", "bold": true}, {"text": "istikhara", "bold": true}, {"text": " :"}, {"text": "\n\n"}, {"text": "\"", "italic": true}, {"text": "Ya Allah, montre-moi comment honorer toutes mes dimensions dans l'amour", "italic": true}, {"text": "\""}, {"text": "\n\n"}, {"text": "🌟 Dans ta ", "bold": true}, {"text": "gratitude", "bold": true}, {"text": " :"}, {"text": "\n\n"}, {"text": "\"", "italic": true}, {"text": "Alhamdulillah pour la complexité qui me rend unique", "italic": true}, {"text": "\""}, {"text": "\n\n"}, {"text": "✨ Dans ton ", "bold": true}, {"text": "intention", "bold": true}, {"text": " :"}, {"text": "\n\n"}, {"text": "\"", "italic": true}, {"text": "Que mon amour soit un reflet de Ta perfection fractale", "italic": true}, {"text": "\""}] },
        { type: 'choice', variable: 'choix', options: [{"id": "integrer_l_essence", "label": "Intégrer l'essence →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "L'essence fractale à retenir" },

        { type: 'message', content: "De cette exploration totale, retiens ceci..." },
        { type: 'narrative', content: [{"text": "🌸 ", "bold": true}, {"text": "Tu n'es pas une ligne, tu es un mandala"}, {"text": "\n\n"}, {"text": "Chaque dimension de ton être relationnel ", "italic": true}, {"text": "dialogue", "italic": true}, {"text": " avec les autres."}, {"text": "\n\n"}, {"text": "Ta complexité n'est pas un ", "italic": true}, {"text": "défaut", "italic": true}, {"text": " mais ta plus grande ", "bold": true}, {"text": "richesse", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "🌸 ", "bold": true}, {"text": "L'amour n'est pas une destination mais une danse"}, {"text": "\n\n"}, {"text": "Entre toutes tes dimensions, entre toi et l'autre, entre le ", "italic": true}, {"text": "rêve", "italic": true}, {"text": " et la ", "italic": true}, {"text": "réalité", "italic": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Chaque jour est une nouvelle ", "bold": true}, {"text": "chorégraphie", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "🌸 ", "bold": true}, {"text": "Ta vision du futur crée ton présent"}, {"text": "\n\n"}, {"text": "En visualisant la ", "italic": true}, {"text": "femme intégrée", "italic": true}, {"text": " que tu deviens,"}, {"text": "\n\n"}, {"text": "Tu actives déjà sa ", "bold": true}, {"text": "présence", "bold": true}, {"text": " en toi."}] },
        { type: 'narrative', content: [{"text": "Le plus important :", "bold": true}, {"text": "\n\n"}, {"text": "Cette synthèse n'est pas une ", "italic": true}, {"text": "fin", "italic": true}, {"text": "."}, {"text": "\n\n"}, {"text": "C'est le ", "bold": true}, {"text": "commencement", "bold": true}, {"text": " d'une nouvelle façon d'", "bold": true}, {"text": "être", "bold": true}, {"text": " en relation."}, {"text": "\n\n"}, {"text": "Où chaque dimension est ", "italic": true}, {"text": "honorée", "italic": true}, {"text": ", ", "italic": true}, {"text": "intégrée", "italic": true}, {"text": ", ", "italic": true}, {"text": "célébrée", "italic": true}, {"text": "."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "m_engager_concretement", "label": "M'engager concrètement →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "L'engagement de transformation" },

        { type: 'message', content: [{"text": "Le moment est venu de ", "bold": true}, {"text": "sceller", "bold": true}, {"text": " cette transformation..."}] },
        { type: 'narrative', content: [{"text": "Amina se lève de son jardin."}, {"text": "\n\n"}, {"text": "Elle prend son journal et écrit :"}, {"text": "\n\n"}, {"text": "\"", "italic": true}, {"text": "Aujourd'hui, je m'engage à honorer TOUTES mes dimensions.", "italic": true}, {"text": "\n\n"}, {"text": "Je ne cherche plus la perfection mais l'authenticité.", "italic": true}, {"text": "\n\n"}, {"text": "Je ne fuis plus ma complexité mais je la célèbre.", "italic": true}, {"text": "\n\n"}, {"text": "Je suis prête pour l'amour qui honorera mon mandala entier.", "italic": true}, {"text": "\""}] },
        { type: 'narrative', content: [{"text": "✍️ ", "bold": true}, {"text": "Et toi..."}, {"text": "\n\n"}, {"text": "Quel ", "bold": true}, {"text": "engagement sacré", "bold": true}, {"text": " veux-tu prendre devant ta géométrie fractale ?"}] },
        { type: 'text_input', variable: 'engagement_sacre', placeholder: "Mon engagement envers moi-même...", isLong: true },
        { type: 'narrative', content: [{"text": "Cet engagement est maintenant gravé", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Il vibre déjà, attirant ce qui lui correspond."}] },
        { type: 'narrative', content: [{"text": "🌟 Une dernière chose..."}, {"text": "\n\n"}, {"text": "Quelle sera ta ", "bold": true}, {"text": "première action concrète", "bold": true}, {"text": " dans les prochaines 24h pour honorer cet engagement ?"}] },
        { type: 'text_input', variable: 'action_dans_les_24h', placeholder: "Mon action concrète sera..." },

        /* ════════════════════════════════════ */
        { type: 'section', title: "La bénédiction du futur qui se dessine" },

        { type: 'narrative', content: [{"text": "Que tu sois au ", "italic": true}, {"text": "début", "italic": true}, {"text": " de ton exploration ou à la ", "italic": true}, {"text": "fin", "italic": true}, {"text": " de ce cycle..."}, {"text": "\n\n"}, {"text": "Que tu portes ", "italic": true}, {"text": "peu", "italic": true}, {"text": " de blessures ou ", "italic": true}, {"text": "beaucoup", "italic": true}, {"text": " de sagesse..."}, {"text": "\n\n"}, {"text": "Sache que tu es ", "bold": true}, {"text": "exactement", "bold": true}, {"text": " où tu dois être."}] },
        { type: 'narrative', content: [{"text": "Puisses-tu trouver quelqu'un dont le ", "italic": true}, {"text": "mandala", "italic": true}, {"text": " danse avec le tien..."}, {"text": "\n\n"}, {"text": "Quelqu'un qui voit ta ", "bold": true}, {"text": "complexité", "bold": true}, {"text": " comme une ", "bold": true}, {"text": "œuvre d'art", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Quelqu'un avec qui créer une ", "italic": true}, {"text": "géométrie nouvelle", "italic": true}, {"text": "..."}, {"text": "\n\n"}, {"text": "Plus ", "bold": true}, {"text": "vaste", "bold": true}, {"text": " que la somme de vos parties."}] },
        { type: 'narrative', content: [{"text": "Le futur se dessine..."}, {"text": "\n\n"}, {"text": "Et il porte déjà ton ", "bold": true}, {"text": "empreinte fractale", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "🌟✨"}] },
        { type: 'choice', variable: 'choix', options: [{"id": "celebrer_ce_voyage", "label": "Célébrer ce voyage →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Gratitude et célébration fractale" },

        { type: 'image', url: "https://images.unsplash.com/photo-1759434225861-e834192ccdaf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NTk4NDY3MTR8&ixlib=rb-4.1.0&q=80&w=1080", alt: "" },
        { type: 'message', content: [{"text": "Quelle ", "bold": true}, {"text": "odyssée fractale", "bold": true}, {"text": " tu viens d'accomplir..."}] },
        { type: 'narrative', content: [{"text": "Tu as exploré toutes tes dimensions, reconnu leur interconnexion, honoré leur danse", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Tu as vu comment chaque partie de toi contient le tout", "italic": true}, {"text": "."}, {"text": "\n\n"}, {"text": "C'est un accomplissement", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "Cette synthèse fractale devient maintenant ta ", "bold": true}, {"text": "boussole vivante", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Chaque décision, chaque choix, chaque pas peut maintenant être guidé par cette ", "italic": true}, {"text": "vision intégrale", "italic": true}, {"text": " de qui tu es."}, {"text": "\n\n"}, {"text": "Tu n'es plus ", "italic": true}, {"text": "fragmentée", "italic": true}, {"text": ". Tu es ", "bold": true}, {"text": "fractale", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "Tu portes en toi un ", "bold": true}, {"text": "univers relationnel", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Et l'amour qui viendra le reconnaîtra."}, {"text": "\n\n"}, {"text": "Car on attire ce qui ", "italic": true}, {"text": "vibre", "italic": true}, {"text": " à notre ", "italic": true}, {"text": "fréquence", "italic": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Et ta fréquence est maintenant celle de l'", "bold": true}, {"text": "intégration consciente", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "Continue de danser avec toutes tes dimensions."}, {"text": "\n\n"}, {"text": "Continue d'honorer ta complexité."}, {"text": "\n\n"}, {"text": "Continue de ", "bold": true}, {"text": "devenir", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "Tu es maintenant diplômée de ton propre ", "bold": true}, {"text": "parcours Love Transformations™", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Que cette synthèse fractale t'accompagne toujours."}, {"text": "\n\n"}, {"text": "Insha'Allah...✨"}] },
        { type: 'message', content: [{"text": "🌟 ", "bold": true}, {"text": "Fin du Scénario 10 : Le Futur se Dessine - Synthèse Fractale", "bold": true}, {"text": " 🌟"}] },

        { type: 'completion', title: "Félicitations !", message: "Tu as terminé S10 — Le Futur se Dessine. Tes réponses ont été sauvegardées.", icon: '🎨' }
    ]
};

/* ─── Form Registry ─── */
if (typeof window.FORM_REGISTRY === 'undefined') window.FORM_REGISTRY = {};
window.FORM_REGISTRY['s10-futur-se-dessine'] = S10_FUTUR_SE_DESSINE;
