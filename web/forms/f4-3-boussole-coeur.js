/* ═══════════════════════════════════════
   F4.3 — La Boussole du Cœur
   Converti depuis Typebot · 110 steps · 14 variables
═══════════════════════════════════════ */

const F4_3_BOUSSOLE_COEUR = {
    id: 'f4_3_boussole_coeur',
    version: 1,
    title: "F4.3 — La Boussole du Cœur",
    icon: '❤️',
    checkboxId: 'f4_3',
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
        "alignement_avec_valeurs",
        "autres_non_negociables",
        "cause_evolution_valeurs",
        "ce_qui_manque_pour_alignement",
        "compromis_sur_valeurs",
        "evolution_des_valeurs",
        "experience_conflits_valeurs",
        "expression_des_valeurs",
        "non_negociables_absolus",
        "priorites_des_valeurs",
        "qui_devenir_pour_amour_ideal",
        "reconnaissance_valeurs_partagees",
        "telephone",
        "valeurs_fondamentales"
],

    steps: [

        /* ════════════════════════════════════ */
        { type: 'section', title: "Ouverture Sacrée" },

        { type: 'image', url: "https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", alt: "" },
        { type: 'message', content: [{"text": "بسم الله الرحمن الرحيم", "italic": true}, {"text": "\n\n"}, {"text": "Au nom d'Allah, le Tout Miséricordieux, le Très Miséricordieux...", "italic": true}] },
        { type: 'message', content: [{"text": "🧭 Bienvenue dans ce moment où tu vas découvrir", "bold": true}, {"text": " ta Boussole du Cœur ", "bold": true, "italic": true}, {"text": "..."}] },
        { type: 'narrative', content: [{"text": "💫 Imagine une ", "italic": true}, {"text": "boussole", "bold": true, "italic": true}, {"text": ", forgée dans l'or de tes expériences...", "italic": true}, {"text": "\n\n"}, {"text": "Son aiguille, aimantée par ", "italic": true}, {"text": "tes valeurs les plus profondes", "bold": true, "italic": true}, {"text": ", pointe toujours vers ton ", "italic": true}, {"text": "Nord véritable", "bold": true, "italic": true}, {"text": ".", "italic": true}] },
        { type: 'message', content: [{"text": "\"Et c'est Lui qui a fait de la terre un berceau pour vous et vous y a tracé des chemins afin que vous vous guidiez\"", "italic": true}, {"text": " (Coran 43:10)"}] },
        { type: 'message', content: "Avant de commencer, rappelle-moi ces informations :" },
        { type: 'text_input', variable: 'reponse', placeholder: "Ton prénom" },
        { type: 'email_input', variable: 'email', placeholder: "ton.email@exemple.com" },
        { type: 'phone_input', variable: 'telephone', placeholder: "06 12 34 56 78", defaultPrefix: '+33' },
        { type: 'choice', variable: 'choix', options: [{"id": "poursuivre", "label": "Poursuivre ->"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Préparation Émotionnelle" },

        { type: 'narrative', content: [{"text": "🌬️ Avant de commencer cette exploration profonde...", "bold": true}, {"text": "\n\n"}, {"text": "Prends une ", "italic": true}, {"text": "profonde inspiration", "bold": true, "italic": true}, {"text": " par le nez...", "italic": true}] },
        { type: 'message', content: [{"text": "Retiens ton souffle ", "italic": true}, {"text": "3 secondes", "bold": true}, {"text": "...", "italic": true}] },
        { type: 'narrative', content: [{"text": "Et expire doucement... ", "italic": true}, {"text": "Relâche toute tension", "bold": true, "italic": true}, {"text": ".", "italic": true}, {"text": "\n\n"}, {"text": "✨ Parfait. Tu es maintenant ", "bold": true}, {"text": "centrée et présente", "bold": true, "italic": true}, {"text": ".", "bold": true}] },
        { type: 'narrative', content: [{"text": "📍 Tu es dans le ", "bold": true}, {"text": "troisième et dernier formulaire", "bold": true, "italic": true}, {"text": " de la ", "bold": true}, {"text": "Phase 4 : Floraison", "bold": true, "italic": true}, {"text": ".", "bold": true}, {"text": "\n\n"}, {"text": "Après avoir exploré ta ", "italic": true}, {"text": "spiritualité", "bold": true}, {"text": " et ton ", "italic": true}, {"text": "intimité sacrée", "bold": true}, {"text": ", il est temps de clarifier ", "italic": true}, {"text": "tes valeurs profondes", "bold": true, "italic": true}, {"text": " et de dessiner ", "italic": true}, {"text": "la carte de ton amour idéal", "bold": true, "italic": true}, {"text": ".", "italic": true}] },
        { type: 'narrative', content: [{"text": "🧠 ", "bold": true}, {"text": "Les neurosciences nous révèlent", "bold": true, "italic": true}, {"text": " que nos valeurs sont comme des ", "italic": true}, {"text": "étoiles guides", "bold": true, "italic": true}, {"text": " dans notre cerveau...", "italic": true}, {"text": "\n\n"}, {"text": "Elles activent notre ", "italic": true}, {"text": "cortex préfrontal médian", "bold": true}, {"text": ", la région de ", "italic": true}, {"text": "l'identité profonde", "bold": true, "italic": true}, {"text": " et du ", "italic": true}, {"text": "sens de soi", "bold": true, "italic": true}, {"text": ".", "italic": true}] },
        { type: 'narrative', content: [{"text": "💫 Es-tu prête à ", "bold": true}, {"text": "découvrir ta boussole intérieure", "bold": true, "italic": true}, {"text": " et à ", "bold": true}, {"text": "tracer la carte", "bold": true, "italic": true}, {"text": " de ton ", "bold": true}, {"text": "territoire amoureux sacré", "bold": true, "italic": true}, {"text": " ?", "bold": true}] },
        { type: 'choice', variable: 'choix', options: [{"id": "poursuivre", "label": "Poursuivre ->"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Section 31 : Introduction Enrichie" },

        { type: 'image', url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", alt: "" },
        { type: 'narrative', content: [{"text": "💎 Chaque valeur est un ", "italic": true}, {"text": "diamant unique", "bold": true, "italic": true}, {"text": ", taillé par tes expériences, poli par ta sagesse...", "italic": true}, {"text": "\n\n"}, {"text": "Ensemble, ils forment la ", "italic": true}, {"text": "constellation", "bold": true, "italic": true}, {"text": " qui guide tes choix amoureux.", "italic": true}] },
        { type: 'choice', variable: 'choix', options: [{"id": "decouvrir_mes_valeurs", "label": "Découvrir mes valeurs ->"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Section 31 : Q1 - Valeurs fondamentales Enrichi" },

        { type: 'message', content: [{"text": "🌸 J'aimerais maintenant explorer avec toi quelque chose de ", "italic": true}, {"text": "fondamental", "bold": true, "italic": true}, {"text": "...", "italic": true}] },
        { type: 'narrative', content: [{"text": "💭 Imagine que tu puisses créer une ", "italic": true}, {"text": "relation parfaite", "bold": true, "italic": true}, {"text": ", alignée avec tout ce qui compte vraiment pour toi...", "italic": true}, {"text": "\n\n"}, {"text": "Quels seraient les ", "italic": true}, {"text": "piliers inébranlables", "bold": true, "italic": true}, {"text": " de cette relation ?", "italic": true}] },
        { type: 'narrative', content: [{"text": "✨ ", "bold": true}, {"text": "Quelles sont tes valeurs les plus fondamentales dans une relation amoureuse ?", "bold": true}, {"text": "\n\n"}, {"text": "(Tu peux en choisir plusieurs - écoute ton cœur)", "italic": true}] },
        { type: 'choice', variable: 'valeurs_fondamentales', multiple: true, options: [{"id": "authenticite_etre_pleineme", "label": "🌿 Authenticité - Être pleinement moi-même"}, {"id": "liberte_preserver_mon_esp", "label": "🕊️ Liberté - Préserver mon espace vital"}, {"id": "securite_me_sentir_protege", "label": "🏡 Sécurité - Me sentir protégée et stable"}, {"id": "croissance_mutuelle_evolue", "label": "🌱 Croissance mutuelle - Évoluer ensemble"}, {"id": "passion_vivre_intensement", "label": "🔥 Passion - Vivre intensément l'amour"}, {"id": "stabilite_construire_sur_d", "label": "⚓ Stabilité - Construire sur du solide"}, {"id": "aventure_explorer_la_vie_e", "label": "🌍 Aventure - Explorer la vie ensemble"}, {"id": "spiritualite_partagee_unis", "label": "🤲 Spiritualité partagée - Unis dans la foi"}, {"id": "famille_creer_un_foy", "label": "👨‍👩‍👧‍👦 Famille - Créer un foyer aimant"}, {"id": "independance_rester_souver", "label": "💪 Indépendance - Rester souveraine"}, {"id": "communication_dialogue_pro", "label": "💬 Communication - Dialogue profond"}, {"id": "respect_honorer_l_autre", "label": "🙏 Respect - Honorer l'autre"}] },
        { type: 'narrative', content: [{"text": "💫 ", "bold": true}, {"text": "Magnifique", "bold": true, "italic": true}, {"text": ". Ces valeurs sont les ", "bold": true}, {"text": "étoiles de ta constellation personnelle", "bold": true, "italic": true}, {"text": ".", "bold": true}] },
        { type: 'narrative', content: [{"text": "🎯 Maintenant, imaginons que tu doives choisir les ", "italic": true}, {"text": "trois joyaux les plus précieux", "bold": true, "italic": true}, {"text": "...", "italic": true}, {"text": "\n\n"}, {"text": "Ceux sans lesquels tu ne pourrais ", "italic": true}, {"text": "jamais", "bold": true, "italic": true}, {"text": " te sentir épanouie en amour.", "italic": true}] },
        { type: 'message', content: [{"text": "✨ ", "bold": true}, {"text": "Parmi ces valeurs, quelles sont les 3 plus importantes pour toi, par ordre de priorité ?", "bold": true}] },
        { type: 'text_input', variable: 'priorites_des_valeurs', placeholder: "1. Ma valeur la plus sacrée... 2. Ensuite... 3. Et puis...", isLong: true },
        { type: 'narrative', content: [{"text": "🌟 Ces trois valeurs forment le ", "bold": true}, {"text": "cœur de ta boussole", "bold": true, "italic": true}, {"text": ".", "bold": true}, {"text": "\n\n"}, {"text": "Elles te guideront toujours vers ton ", "italic": true}, {"text": "Nord véritable", "bold": true, "italic": true}, {"text": ".", "italic": true}] },
        { type: 'choice', variable: 'choix', options: [{"id": "poursuivre", "label": "Poursuivre ->"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Section 31 : Q2 - Compromis Enrichi" },

        { type: 'narrative', content: [{"text": "🌊 La vie est comme l'océan... Elle nous demande parfois d'être ", "italic": true}, {"text": "flexibles comme l'eau", "bold": true, "italic": true}, {"text": ", et parfois d'être ", "italic": true}, {"text": "fermes comme le rocher", "bold": true, "italic": true}, {"text": ".", "italic": true}] },
        { type: 'narrative', content: [{"text": "💭 J'aimerais explorer avec toi cette ", "italic": true}, {"text": "danse subtile", "bold": true, "italic": true}, {"text": " entre ", "italic": true}, {"text": "flexibilité", "bold": true}, {"text": " et ", "italic": true}, {"text": "fermeté", "bold": true}, {"text": "...", "italic": true}] },
        { type: 'message', content: [{"text": "⚖️ ", "bold": true}, {"text": "Sur quelles valeurs es-tu prête à faire des compromis ? Sur lesquelles c'est non négociable ?", "bold": true}] },
        { type: 'text_input', variable: 'compromis_sur_valeurs', placeholder: "Je peux être flexible sur... mais jamais je ne transigerai sur...", isLong: true },
        { type: 'narrative', content: [{"text": "💪 ", "bold": true}, {"text": "Quelle clarté !", "bold": true, "italic": true}, {"text": " Connaître ses ", "bold": true}, {"text": "lignes rouges", "bold": true, "italic": true}, {"text": " est une forme de ", "bold": true}, {"text": "sagesse profonde", "bold": true, "italic": true}, {"text": ".", "bold": true}] },
        { type: 'narrative', content: [{"text": "🔥 Parfois, nos valeurs entrent en ", "italic": true}, {"text": "collision", "bold": true, "italic": true}, {"text": " avec celles de l'être aimé...", "italic": true}, {"text": "\n\n"}, {"text": "C'est dans ces moments que nous découvrons ", "italic": true}, {"text": "qui nous sommes vraiment", "bold": true, "italic": true}, {"text": ".", "italic": true}] },
        { type: 'message', content: [{"text": "💭 ", "bold": true}, {"text": "As-tu déjà vécu des conflits de valeurs dans tes relations ? Comment les as-tu gérés ?", "bold": true}] },
        { type: 'text_input', variable: 'experience_conflits_valeurs', placeholder: "Dans mes relations passées, j'ai rencontré des conflits quand... et j'ai appris que...", isLong: true },
        { type: 'narrative', content: [{"text": "🌟 ", "bold": true}, {"text": "Chaque conflit de valeurs est une ", "italic": true}, {"text": "invitation à grandir", "bold": true, "italic": true}, {"text": ".", "italic": true}, {"text": "\n\n"}, {"text": "Tu as transformé ces défis en ", "italic": true}, {"text": "sagesse vivante", "bold": true, "italic": true}, {"text": ". C'est admirable.", "italic": true}] },
        { type: 'choice', variable: 'choix', options: [{"id": "poursuivre", "label": "Poursuivre ->"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Section 31 : Q3 - Évolution des valeurs Enrichi" },

        { type: 'narrative', content: [{"text": "🦋 Comme le papillon qui émerge de sa chrysalide...", "italic": true}, {"text": "\n\n"}, {"text": "Nos valeurs ", "italic": true}, {"text": "se métamorphosent", "bold": true, "italic": true}, {"text": " au fil de notre voyage.", "italic": true}] },
        { type: 'message', content: [{"text": "🌱 ", "bold": true}, {"text": "Comment tes valeurs en amour ont-elles évolué avec le temps ?", "bold": true}] },
        { type: 'text_input', variable: 'evolution_des_valeurs', placeholder: "Avant, je valorisais surtout... Aujourd'hui, je comprends l'importance de...", isLong: true },
        { type: 'message', content: [{"text": "✨ ", "bold": true}, {"text": "Quelle belle évolution !", "bold": true, "italic": true}, {"text": " Tu as grandi, mûri, approfondi ta compréhension de l'amour.", "italic": true}] },
        { type: 'message', content: [{"text": "🔍 Chaque transformation a ses ", "italic": true}, {"text": "catalyseurs ", "bold": true, "italic": true}, {"text": "...", "italic": true}] },
        { type: 'message', content: [{"text": "💫 ", "bold": true}, {"text": "Qu'est-ce qui a provoqué cette évolution ?", "bold": true}] },
        { type: 'text_input', variable: 'cause_evolution_valeurs', placeholder: "Cette transformation est venue de... J'ai compris que...", isLong: true },
        { type: 'narrative', content: [{"text": "🙏 ", "bold": true}, {"text": "\"Et Il vous a enseigné ce que vous ne saviez pas\"", "italic": true}, {"text": " (Coran 2:239)"}, {"text": "\n\n"}, {"text": "Chaque expérience t'a rapprochée de ta ", "italic": true}, {"text": "vérité profonde", "bold": true, "italic": true}, {"text": ".", "italic": true}] },
        { type: 'choice', variable: 'choix', options: [{"id": "aligner_mes_valeurs", "label": "Aligner mes valeurs ->"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Section 31 : Q3bis - Alignement des valeurs Enrichi" },

        { type: 'narrative', content: [{"text": "🪞 Regarde-toi dans le ", "italic": true}, {"text": "miroir de ton âme", "bold": true, "italic": true}, {"text": "...", "italic": true}, {"text": "\n\n"}, {"text": "Vois-tu une femme qui vit selon ses ", "italic": true}, {"text": "valeurs authentiques", "bold": true, "italic": true}, {"text": " ?", "italic": true}] },
        { type: 'message', content: [{"text": "🎯 ", "bold": true}, {"text": "Es-tu alignée avec tes valeurs dans ta vie amoureuse actuelle ?", "bold": true}] },
        { type: 'choice', variable: 'alignement_avec_valeurs', options: [{"id": "totalement_alignee_je_vis", "label": "✨ Totalement alignée - Je vis mes valeurs pleinement"}, {"id": "partiellement_alignee_quel", "label": "🌙 Partiellement alignée - Quelques ajustements nécessaires"}, {"id": "peu_alignee_je_m_eloigne", "label": "🌫️ Peu alignée - Je m'éloigne de mes valeurs"}, {"id": "pas_du_tout_alignee_je_vis", "label": "⚡ Pas du tout alignée - Je vis contre mes valeurs"}, {"id": "en_transition_je_realigne", "label": "🦋 En transition - Je réaligne ma vie actuellement"}] },
        { type: 'narrative', content: [{"text": "💝 Quel que soit ton niveau d'alignement actuel, ", "italic": true}, {"text": "sois douce avec toi-même", "bold": true, "italic": true}, {"text": ".", "italic": true}, {"text": "\n\n"}, {"text": "Le simple fait de ", "italic": true}, {"text": "prendre conscience", "bold": true, "italic": true}, {"text": " est déjà un pas vers l'alignement.", "italic": true}] },
        { type: 'message', content: [{"text": "🌱 ", "bold": true}, {"text": "Qu'est-ce qui te manque pour être pleinement alignée ?", "bold": true}] },
        { type: 'text_input', variable: 'ce_qui_manque_pour_alignement', placeholder: "Pour être pleinement alignée avec mes valeurs, il me manque... J'aurais besoin de...", isLong: true },
        { type: 'narrative', content: [{"text": "🌟 ", "bold": true}, {"text": "Tu viens de poser un ", "italic": true}, {"text": "diagnostic précieux", "bold": true, "italic": true}, {"text": ".", "italic": true}, {"text": "\n\n"}, {"text": "Maintenant tu sais exactement ", "italic": true}, {"text": "où porter ton attention", "bold": true, "italic": true}, {"text": " pour retrouver ton ", "italic": true}, {"text": "équilibre sacré", "bold": true, "italic": true}, {"text": ".", "italic": true}] },
        { type: 'choice', variable: 'choix', options: [{"id": "prendre_une_pause", "label": "Prendre une pause ->"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Pause Section 31 Enrichie" },

        { type: 'narrative', content: [{"text": "🌬️ ", "bold": true}, {"text": "Prends trois respirations profondes pour ", "italic": true}, {"text": "intégrer", "bold": true, "italic": true}, {"text": " tout ce que tu viens de découvrir.", "italic": true}] },
        { type: 'narrative', content: [{"text": "💎 Tu viens de ", "italic": true}, {"text": "polir les joyaux", "bold": true, "italic": true}, {"text": " de tes valeurs...", "italic": true}, {"text": "\n\n"}, {"text": "Ils brillent maintenant de leur ", "italic": true}, {"text": "éclat véritable", "bold": true, "italic": true}, {"text": ".", "italic": true}] },
        { type: 'narrative', content: [{"text": "✨ ", "bold": true}, {"text": "Clarifier ses valeurs est un ", "italic": true}, {"text": "travail profond et sacré", "bold": true, "italic": true}, {"text": ".", "italic": true}, {"text": "\n\n"}, {"text": "Honore-toi pour ce ", "italic": true}, {"text": "courage", "bold": true, "italic": true}, {"text": " et cette ", "italic": true}, {"text": "honnêteté", "bold": true, "italic": true}, {"text": ".", "italic": true}] },
        { type: 'choice', variable: 'choix', options: [{"id": "expression_de_mes_valeurs", "label": "Expression de mes valeurs ->"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Section 31 : Q4 - Transmission des valeurs Enrichi" },

        { type: 'narrative', content: [{"text": "🌺 Les valeurs sont comme des ", "italic": true}, {"text": "parfums précieux", "bold": true, "italic": true}, {"text": "...", "italic": true}, {"text": "\n\n"}, {"text": "Elles ", "italic": true}, {"text": "émanent de nous", "bold": true, "italic": true}, {"text": " naturellement, touchant ceux qui nous entourent.", "italic": true}] },
        { type: 'message', content: [{"text": "💬 ", "bold": true}, {"text": "Comment exprimes-tu tes valeurs dans une relation ? Comment les transmets-tu ?", "bold": true}] },
        { type: 'text_input', variable: 'expression_des_valeurs', placeholder: "J'exprime mes valeurs en... Je les transmets par...", isLong: true },
        { type: 'narrative', content: [{"text": "🌟 ", "bold": true}, {"text": "Magnifique !", "bold": true, "italic": true}, {"text": " Tu es une ", "italic": true}, {"text": "ambassadrice vivante", "bold": true, "italic": true}, {"text": " de tes valeurs.", "italic": true}] },
        { type: 'message', content: [{"text": "🔍 Mais comment reconnaître une ", "italic": true}, {"text": "âme sœur de valeurs", "bold": true, "italic": true}, {"text": " ?", "italic": true}] },
        { type: 'message', content: [{"text": "👁️ ", "bold": true}, {"text": "Comment sais-tu si ton/ta partenaire partage tes valeurs ?", "bold": true}] },
        { type: 'text_input', variable: 'reconnaissance_valeurs_partagees', placeholder: "Je reconnais que quelqu'un partage mes valeurs quand... Je le vois dans...", isLong: true },
        { type: 'narrative', content: [{"text": "💝 ", "bold": true}, {"text": "Tu as développé une ", "italic": true}, {"text": "intelligence des valeurs", "bold": true, "italic": true}, {"text": " remarquable.", "italic": true}, {"text": "\n\n"}, {"text": "Cette capacité à ", "italic": true}, {"text": "reconnaître l'alignement", "bold": true, "italic": true}, {"text": " te guidera vers des relations ", "italic": true}, {"text": "authentiques et nourrissantes", "bold": true, "italic": true}, {"text": ".", "italic": true}] },
        { type: 'choice', variable: 'choix', options: [{"id": "cloturer_ce_voyage", "label": "Cloturer ce voyage ->"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Déblocage Pétale 11 Enrichi" },

        { type: 'message', content: [{"text": "🌸✨ ", "bold": true}, {"text": "FÉLICITATIONS !", "bold": true, "italic": true}] },
        { type: 'narrative', content: [{"text": "🌸 ", "bold": true}, {"text": "Tu as clarifié ce qui compte ", "italic": true}, {"text": "vraiment", "bold": true, "italic": true}, {"text": " pour toi dans l'amour.", "italic": true}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Section 32 : Introduction Enrichie" },

        { type: 'image', url: "https://images.unsplash.com/photo-1504805572947-34fad45aed93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", alt: "" },
        { type: 'narrative', content: [{"text": "🗺️ ", "bold": true}, {"text": "Section 32 : La Carte du Territoire Amoureux", "bold": true, "italic": true}, {"text": "\n\n"}, {"text": "Maintenant que ta boussole est calibrée par tes valeurs...", "italic": true}, {"text": "\n\n"}, {"text": "Il est temps de ", "italic": true}, {"text": "dessiner la carte", "bold": true, "italic": true}, {"text": " de l'amour que tu souhaites ", "italic": true}, {"text": "explorer et habiter", "bold": true, "italic": true}, {"text": ".", "italic": true}] },
        { type: 'narrative', content: [{"text": "🧠 ", "bold": true}, {"text": "Savais-tu que notre cerveau ne fait pas la différence", "italic": true}, {"text": " entre une vision ", "italic": true}, {"text": "intensément imaginée", "bold": true, "italic": true}, {"text": " et la ", "italic": true}, {"text": "réalité vécue", "bold": true, "italic": true}, {"text": " ?", "italic": true}, {"text": "\n\n"}, {"text": "C'est pourquoi ", "italic": true}, {"text": "visualiser ton amour idéal", "bold": true, "italic": true}, {"text": " commence déjà à le ", "italic": true}, {"text": "manifester", "bold": true, "italic": true}, {"text": ".", "italic": true}] },
        { type: 'narrative', content: [{"text": "✨ ", "bold": true}, {"text": "Créons ensemble la ", "italic": true}, {"text": "vision de l'amour", "bold": true, "italic": true}, {"text": " que tu souhaites ", "italic": true}, {"text": "vivre et incarner", "bold": true, "italic": true}, {"text": "...", "italic": true}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Section 32 : Q5 - Transformation Personnelle" },

        { type: 'narrative', content: [{"text": "🦋 ", "bold": true}, {"text": "Pour vivre l'amour que tu viens de décrire...", "bold": true}, {"text": "\n\n"}, {"text": "Tu vas devoir ", "italic": true}, {"text": "évoluer", "bold": true}, {"text": "...", "italic": true}, {"text": "\n\n"}, {"text": "Devenir la femme qui ", "italic": true}, {"text": "incarne", "bold": true}, {"text": " ces valeurs...", "italic": true}, {"text": "\n\n"}, {"text": "Celle qui ", "italic": true}, {"text": "attire", "bold": true}, {"text": " naturellement ce qu'elle mérite...", "italic": true}] },
        { type: 'narrative', content: [{"text": "💎 Ce n'est pas une question de \"changer qui tu es\".", "italic": true}, {"text": "\n\n"}, {"text": "C'est une question de ", "italic": true}, {"text": "révéler", "bold": true}, {"text": " qui tu es vraiment.", "italic": true}] },
        { type: 'message', content: [{"text": "🌟 Qui devras-tu devenir pour vivre cet amour idéal ?", "bold": true}, {"text": "\n\n"}, {"text": "Quelles qualités développer ? Quelles peurs dépasser ? Quelles habitudes cultiver ?", "italic": true}] },
        { type: 'text_input', variable: 'qui_devenir_pour_amour_ideal', placeholder: "Pour vivre cet amour, j'ai envie de devenir une femme qui...", isLong: true },
        { type: 'narrative', content: [{"text": "👑 ", "bold": true}, {"text": "Tu viens de définir ta BOUSSOLE complète !", "bold": true}, {"text": "\n\n"}, {"text": "- ✅ Tes ", "italic": true}, {"text": "valeurs", "bold": true}, {"text": " (ton Nord)", "italic": true}, {"text": "\n\n"}, {"text": "- ✅ Ton ", "italic": true}, {"text": "territoire amoureux", "bold": true}, {"text": " (ta carte)", "italic": true}, {"text": "\n\n"}, {"text": "- ✅ Tes ", "italic": true}, {"text": "limites sacrées", "bold": true}, {"text": " (tes frontières)", "italic": true}, {"text": "\n\n"}, {"text": "- ✅ Ta ", "italic": true}, {"text": "vision", "bold": true}, {"text": " (ta destination)", "italic": true}, {"text": "\n\n"}, {"text": "- ✅ Ta ", "italic": true}, {"text": "transformation", "bold": true}, {"text": " (ton chemin)", "italic": true}] },
        { type: 'choice', variable: 'choix', options: [{"id": "ancrer_dans_mon_corps", "label": "Ancrer dans mon corps ->"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Section 33 : Non-Négociables Absolus" },

        { type: 'narrative', content: [{"text": "🛡️ Parlons maintenant de tes frontières ...", "bold": true}, {"text": "\n\n"}, {"text": "Il y a des choses sur lesquelles tu peux être ", "italic": true}, {"text": "flexible", "bold": true}, {"text": "...", "italic": true}, {"text": "\n\n"}, {"text": "Et il y a des lignes que tu ne franchiras ", "italic": true}, {"text": "jamais", "bold": true}, {"text": ", peu importe l'intensité de l'amour.", "italic": true}] },
        { type: 'narrative', content: [{"text": "🔥 Ces non-négociables ne sont pas de l'", "italic": true}, {"text": "intransigeance", "bold": true}, {"text": ".", "italic": true}, {"text": "\n\n"}, {"text": "Ce sont des ", "italic": true}, {"text": "protections divines", "bold": true}, {"text": " pour ton cœur et ton âme.", "italic": true}] },
        { type: 'message', content: [{"text": "⚠️ Quels sont tes NON-NÉGOCIABLES ABSOLUS en amour ?", "bold": true}, {"text": "\n\n"}, {"text": "(Sélectionne tout ce qui est vraiment non-négociable pour toi)", "italic": true}] },
        { type: 'choice', variable: 'non_negociables_absolus', multiple: true, options: [{"id": "partage_de_la_foi_musulmane", "label": "🕌 Partage de la foi musulmane"}, {"id": "pas_d_addiction_alcool_dro", "label": "🚫 Pas d'addiction (alcool, drogues, jeux...)"}, {"id": "engagement_clair_vers_le_mar", "label": "💍 Engagement clair vers le mariage"}, {"id": "respect_de_ma_pratique_relig", "label": "🙏 Respect de ma pratique religieuse"}, {"id": "respect_de_ma_famille", "label": "👨‍👩‍👧‍👦 Respect de ma famille"}, {"id": "transparence_financiere_tota", "label": "💰 Transparence financière totale"}, {"id": "communication_honnete_et_di", "label": "🗣️ Communication honnête et directe"}, {"id": "fidelite_emotionnelle_et_phy", "label": "🤝 Fidélité émotionnelle et physique"}, {"id": "volonte_de_grandir_ensemble", "label": "🌱 Volonté de grandir ensemble"}, {"id": "accord_sur_le_desir_d_enfant", "label": "👶 Accord sur le désir d'enfants (ou non)"}, {"id": "vision_partagee_du_futur", "label": "🏠 Vision partagée du futur"}, {"id": "respect_de_mon_autonomie", "label": "💪 Respect de mon autonomie"}] },
        { type: 'message', content: [{"text": "🔒 Y a-t-il d'autres non-négociables ABSOLUS pour toi ?", "bold": true}, {"text": "\n\n"}, {"text": "Des lignes rouges personnelles que tu n'as pas vues dans la liste...", "italic": true}] },
        { type: 'text_input', variable: 'autres_non_negociables', placeholder: "Pour moi, il est absolument non-négociable que...", isLong: true },
        { type: 'narrative', content: [{"text": "💪 Tu viens de tracer les frontières de ton territoire.", "bold": true}, {"text": "\n\n"}, {"text": "Ces limites ne sont pas des ", "italic": true}, {"text": "murs", "bold": true}, {"text": " qui t'enferment...", "italic": true}, {"text": "\n\n"}, {"text": "Ce sont des ", "italic": true}, {"text": "gardiens", "bold": true}, {"text": " qui protègent ce qui est précieux.", "italic": true}] },
        { type: 'choice', variable: 'choix', options: [{"id": "visualiser_ma_vie_de_couple", "label": "Visualiser ma vie de couple ->"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Clôture Phase 4 - FLORAISON ACCOMPLIE" },

        { type: 'image', url: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", alt: "" },
        { type: 'message', content: [{"text": "🌸 ", "bold": true}, {"text": "LA PHASE 4 : FLORAISON EST ACCOMPLIE !", "bold": true}] },
        { type: 'narrative', content: [{"text": "Regarde le chemin parcouru dans cette phase extraordinaire..."}, {"text": "\n\n"}, {"text": "✅ Formulaire 4.1 : Spiritualité et Amour", "bold": true}, {"text": "\n\n"}, {"text": "→ Tu as exploré ta relation avec Allah et son impact sur l'amour"}, {"text": "\n\n"}, {"text": "✅ Formulaire 4.2 : Intimité et Guérison", "bold": true}, {"text": "\n\n"}, {"text": "→ Tu as courageusement visité ton jardin secret"}, {"text": "\n\n"}, {"text": "✅ Formulaire 4.3 : La Boussole du Cœur (OÙ TU ES)", "bold": true}, {"text": "\n\n"}, {"text": "→ Tu as clarifié tes valeurs et tracé ta carte"}] },
        { type: 'narrative', content: [{"text": "💌 Un message personnel avant la Phase 5...", "bold": true}, {"text": "\n\n"}, {"text": "Tu as accompli quelque chose de ", "italic": true}, {"text": "rare", "bold": true}, {"text": " et de ", "italic": true}, {"text": "précieux", "bold": true}, {"text": ".", "italic": true}, {"text": "\n\n"}, {"text": "18 formulaires. Des centaines dizaines de questions. Des heures d'introspection.", "italic": true}, {"text": "\n\n"}, {"text": "La Phase 5 sera ", "italic": true}, {"text": "courte mais puissante", "bold": true}, {"text": ".", "italic": true}, {"text": "\n\n"}, {"text": "Elle va ", "italic": true}, {"text": "synthétiser", "bold": true}, {"text": " tout ton parcours.", "italic": true}, {"text": "\n\n"}, {"text": "Prends le temps nécessaire. Respire. Intègre.", "italic": true}, {"text": "\n\n"}, {"text": "Et quand tu seras prête...", "italic": true}, {"text": "\n\n"}, {"text": "Je t'attendrai pour le dernier pas vers ta ", "italic": true}, {"text": "cartographie complète", "bold": true}, {"text": ".", "italic": true}] },
        { type: 'narrative', content: [{"text": "📩 Pour m’informer que tu as complété la "}, {"text": "Phase 4", "bold": true}, {"text": ", il te suffit de cliquer sur le lien ci-dessous."}, {"text": "\n\n"}, {"text": "\n Un message pré-rempli s’ouvrira automatiquement sur WhatsApp que tu n’auras qu’à envoyer :"}, {"text": "\n\n"}, {"text": "👉 "}, {"text": "\n\n"}, {"text": "Cela me permet de suivre ton avancée et d’avancer dans la suite du programme pour toi, insha’Allah."}, {"text": "\n\n"}, {"text": "Je te dis à très vite ! 🌿"}] },

        { type: 'completion', title: "Félicitations !", message: "Tu as terminé F4.3 — La Boussole du Cœur. Tes réponses ont été sauvegardées.", icon: '❤️' }
    ]
};

/* ─── Form Registry ─── */
if (typeof window.FORM_REGISTRY === 'undefined') window.FORM_REGISTRY = {};
window.FORM_REGISTRY['f4-3-boussole-coeur'] = F4_3_BOUSSOLE_COEUR;
