/* ═══════════════════════════════════════
   F3.1 — Début des Relations
   Converti depuis Typebot · 139 steps · 18 variables
═══════════════════════════════════════ */

const F3_1_DEBUT_RELATIONS = {
    id: 'f3_1_debut_relations',
    version: 1,
    title: "F3.1 — Début des Relations",
    icon: '💕',
    checkboxId: 'f3_1',
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
        "changement_souhaite",
        "confrontation_projections_vs_realite",
        "declencheurs_des_problemes",
        "detail_du_debut_des_relations",
        "duree_de_la_lune_de_miel",
        "elements_d_attraction",
        "exemple_concret_de_pattern",
        "experience_de_la_lune_de_miel",
        "integration_somatique",
        "moment_d_apparition_des_problemes",
        "pattern_d_attraction_recurrent",
        "patterns_destructeurs_recurrents",
        "projections_en_phase_de_seduction",
        "responsabilite_dans_les_cycles",
        "signes_de_dependance_emotionnelle",
        "telephone",
        "timeline_d_attachement_emotionnel",
        "type_de_debut_des_relations"
],

    steps: [

        /* ════════════════════════════════════ */
        { type: 'section', title: "Ouverture Sacrée" },

        { type: 'image', url: "https://images.unsplash.com/photo-1756049060197-37b4b52c3183?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NTY4OTkyNTh8&ixlib=rb-4.1.0&q=80&w=1080", alt: "" },
        { type: 'message', content: [{"text": "بسم الله الرحمن الرحيم", "italic": true}, {"text": "\n\n"}, {"text": "Au nom d'Allah, le Tout Miséricordieux, le Très Miséricordieux...", "italic": true}] },
        { type: 'message', content: [{"text": "🌱 ✨ ", "bold": true}, {"text": "Bienvenue dans cette exploration", "bold": true, "italic": true}, {"text": " de tes premiers élans amoureux..."}] },
        { type: 'message', content: "Avant de continuer, rappelle-moi tes coordonnées :" },
        { type: 'message', content: "Ton prénom ?" },
        { type: 'text_input', variable: 'reponse', placeholder: "Ton prénom..." },
        { type: 'message', content: "Ton email ?" },
        { type: 'email_input', variable: 'email', placeholder: "ton.email@exemple.com" },
        { type: 'message', content: "Ton téléphone ?" },
        { type: 'phone_input', variable: 'telephone', placeholder: "06 12 34 56 78", defaultPrefix: '+33' },
        { type: 'message', content: "💫 Avant de commencer, pose ta main sur ton cœur et prends une profonde inspiration...\n\nSens cette présence bienveillante qui t'accompagne dans ce voyage intérieur." },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Métaphore de la Première Pousse" },

        { type: 'narrative', content: [{"text": "🌱 Imagine une graine, enfouie dans la terre fertile de ton cœur..."}, {"text": "\n\n"}, {"text": "Cette graine, c'est ton potentiel relationnel", "bold": true}, {"text": " - unique, sacré, portant en elle tous tes rêves d'amour."}] },
        { type: 'narrative', content: [{"text": "Et puis vient ce moment   magique... La ", "bold": true}, {"text": "première pousse", "bold": true, "italic": true}, {"text": " qui perce délicatement la surface, cherchant instinctivement la lumière."}, {"text": "\n\n"}, {"text": "Cette pousse fragile et courageuse, ce sont tes premiers élans amoureux", "bold": true}, {"text": "."}] },
        { type: 'message', content: "✨ La lumière qu'elle recherche ? C'est l'amour véritable que ton âme appelle...\n\nEt la terre qui la nourrit ? C'est le contexte unique de chacune de tes rencontres." },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Contextualisation du Parcours" },

        { type: 'message', content: "💝 Tu as magnifiquement exploré tes racines familiales dans la Phase 2...\n\nTu as eu le courage de regarder d'où tu viens, de comprendre les patterns transmis, de reconnaître les blessures et les cadeaux de ton héritage familial." },
        { type: 'narrative', content: [{"text": "🌳 Nous entrons maintenant dans la ", "bold": true}, {"text": "Phase 3 : Enracinement", "bold": true}, {"text": " - un territoire tout aussi essentiel de ta cartographie émotionnelle."}, {"text": "\n\n"}, {"text": "Ici, nous explorons comment ces racines se manifestent dans tes relations amoureuses."}] },
        { type: 'message', content: "✨ Regarde tout le chemin parcouru depuis le début... Quelle transformation remarquable !\n\nTa persévérance et ton courage m'inspirent profondément." },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Préparation Émotionnelle" },

        { type: 'narrative', content: [{"text": "🕊️ Cet espace reste ton ", "bold": true}, {"text": "sanctuaire personnel", "bold": true}, {"text": ", protégé et bienveillant."}, {"text": "\n\n"}, {"text": "Ici, tu peux déposer en toute sécurité tes souvenirs les plus intimes, tes questionnements les plus profonds."}] },
        { type: 'message', content: "🤲 Il est normal de ressentir de la vulnérabilité en explorant tes débuts amoureux...\n\nCette tendresse que tu ressens ? C'est ton cœur qui se prépare à accueillir ses propres vérités avec compassion." },
        { type: 'narrative', content: [{"text": "📊 Les recherches montrent que ", "bold": true}, {"text": "93% des femmes", "bold": true}, {"text": " reconnaissent des patterns récurrents dans leurs débuts relationnels."}, {"text": "\n\n"}, {"text": "Tu n'es donc absolument pas seule dans cette exploration. Ces patterns sont ", "italic": true}, {"text": "normaux", "italic": true}, {"text": " et révèlent la sagesse inconsciente de ton cœur."}] },
        { type: 'narrative', content: [{"text": "💫 Je suis là avec toi pour explorer ces territoires", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Nous irons à ton rythme, en honorant chaque révélation."}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Exploration - Type de Début" },

        { type: 'image', url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", alt: "" },
        { type: 'message', content: "💫 J'aimerais explorer quelque chose de délicatement précieux avec toi..." },
        { type: 'narrative', content: [{"text": "🧠 Comme une graine qui sent les premiers rayons du printemps, chaque début de relation porte une promesse unique..."}, {"text": "\n\n"}, {"text": "Les neurosciences nous révèlent que les ", "bold": true}, {"text": "90 premiers jours", "bold": true}, {"text": " d'une relation activent les mêmes circuits neuronaux que l'attachement précoce formé dans l'enfance."}] },
        { type: 'message', content: "🌱 Cette première pousse de l'amour naissant révèle tant de choses sur la façon dont ton cœur s'ouvre au monde..." },
        { type: 'message', content: [{"text": "Comment se manifestent généralement les débuts de tes histoires d'amour ?", "bold": true}] },
        { type: 'choice', variable: 'type_de_debut_des_relations', options: [{"id": "coup_de_foudre_intense_l_e", "label": "⚡ Coup de foudre intense - L'évidence immédiate"}, {"id": "d_abord_une_amitie_qui_s_epa", "label": "🤝 D'abord une amitié qui s'épanouit - La croissance lente"}, {"id": "phase_de_seduction_mutuelle", "label": "💃 Phase de séduction mutuelle - La danse des cœurs"}, {"id": "rencontre_fortuite_qui_s_app", "label": "🎲 Rencontre fortuite qui s'approfondit - Le hasard béni"}, {"id": "un_autre_pattern_unique_me_c", "label": "🔄 Un autre pattern unique me caractérise"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Validation - Type de Début" },

        { type: 'message', content: "🙏 Merci infiniment pour cette confiance... C'est courageux de reconnaître ces patterns.\n\nTu viens de révéler quelque chose d'important sur la façon dont ton cœur s'éveille à l'amour." },
        { type: 'message', content: "💝 J'aimerais maintenant connaître les nuances précieuses de ces premiers moments...\n\nPeux-tu me décrire plus intimement ce qui se passe dans ton cœur et dans ton corps lors de ces débuts ?" },
        { type: 'narrative', content: [{"text": "💬 Exprime-toi librement (audio ou écrit, comme tu préfères) ", "italic": true}, {"text": "\n\n"}, {"text": "✨ Plus tu partages, plus ta cartographie sera précise insha'Allah ", "italic": true}, {"text": "\n\n"}, {"text": "🎤 Audio uniquement sur WhatsApp !", "italic": true}, {"text": "\n\n"}, {"text": "🤍 Choisis ce qui te met le plus à l'aise", "italic": true}] },
        { type: 'text_input', variable: 'detail_du_debut_des_relations', placeholder: "Dans ces premiers moments, je ressens... et il se passe en moi...", isLong: true },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Célébration du Partage 1" },

        { type: 'narrative', content: [{"text": "✨ Cette description est un ", "bold": true}, {"text": "cadeau précieux", "bold": true}, {"text": " que tu t'offres à toi-même..."}, {"text": "\n\n"}, {"text": "En mettant des mots sur ces expériences intimes, tu permets à ta conscience de mieux comprendre les mouvements de ton âme."}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Exploration - Éléments d'Attraction" },

        { type: 'image', url: "https://images.unsplash.com/photo-1754273844587-f6071584597b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NTY4OTk2NDJ8&ixlib=rb-4.1.0&q=80&w=1080", alt: "" },
        { type: 'message', content: "🌟 Explorons maintenant cette force mystérieuse qu'on appelle l'attraction..." },
        { type: 'narrative', content: [{"text": "🧠 Les neurosciences nous apprennent que l'attraction active le ", "bold": true}, {"text": "système de récompense", "bold": true}, {"text": " de notre cerveau en libérant de la dopamine, créant cette sensation d'exaltation si familière."}, {"text": "\n\n"}, {"text": "Mais ce qui est fascinant, c'est que nous sommes attirés par des éléments qui résonnent avec nos ", "italic": true}, {"text": "besoins inconscients", "italic": true}, {"text": "."}] },
        { type: 'message', content: "🌱 Comme une jeune pousse qui se tourne instinctivement vers certaines qualités de lumière, ton cœur reconnaît certains éléments qui l'attirent profondément..." },
        { type: 'message', content: [{"text": "Qu'est-ce qui allume cette étincelle d'attraction en toi au tout début ?", "bold": true}, {"text": "\n\n"}, {"text": "(Tu peux choisir plusieurs éléments qui résonnent) ✨", "italic": true}] },
        { type: 'choice', variable: 'elements_d_attraction', multiple: true, options: [{"id": "l_apparence_physique_cett", "label": "👁️ L'apparence physique - Cette beauté qui captive"}, {"id": "l_intelligence_et_l_esprit", "label": "🧠 L'intelligence et l'esprit - Cette vivacité qui stimule"}, {"id": "le_sens_de_l_humour_cette", "label": "😄 Le sens de l'humour - Cette légèreté qui enchante"}, {"id": "le_cote_mysterieux_cette_p", "label": "🎭 Le côté mystérieux - Cette profondeur qui intrigue"}, {"id": "la_confiance_en_soi_cette", "label": "💪 La confiance en soi - Cette assurance qui rassure"}, {"id": "la_vulnerabilite_cette_aut", "label": "🤲 La vulnérabilité - Cette authenticité qui touche"}, {"id": "la_stabilite_emotionnelle", "label": "🗻 La stabilité émotionnelle - Cette solidité qui apaise"}, {"id": "la_passion_et_l_intensite", "label": "🔥 La passion et l'intensité - Cette flamme qui embrase"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Réflexion - Patterns d'Attraction" },

        { type: 'message', content: "🙏 Merci pour cette exploration si honnête de ce qui t'attire...\n\nCes choix révèlent des aspects profonds de ta personnalité et de tes besoins authentiques." },
        { type: 'image', url: "https://images.unsplash.com/photo-1527066236128-2ff79f7b9705?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHNlYXJjaHwyfHxlYXV8ZW58MHwwfHx8MTc1Njg5OTc1OHww&ixlib=rb-4.1.0&q=80&w=1080", alt: "" },
        { type: 'message', content: "💫 Maintenant, regardons plus profondément... Comme les cercles dans l'eau qui révèlent des patterns invisibles...\n\nY a-t-il un pattern récurrent dans ce qui t'attire ? Quelque chose qui revient systématiquement, comme une signature unique ?" },
        { type: 'text_input', variable: 'pattern_d_attraction_recurrent', placeholder: "Je remarque que je suis toujours magnétiquement attirée par... et cela révèle peut-être que...", isLong: true },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Validation des Patterns" },

        { type: 'narrative', content: [{"text": "✨ Cette prise de conscience est ", "bold": true}, {"text": "véritablement précieuse", "bold": true}, {"text": "..."}, {"text": "\n\n"}, {"text": "Tu viens d'identifier une partie de ton 'empreinte émotionnelle' unique. Cette lucidité est le fondement de toute transformation authentique."}] },
        { type: 'message', content: "🕊️ Prenons un moment de pause pour laisser cette découverte s'ancrer en toi..." },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Exploration - Attachement Émotionnel" },

        { type: 'message', content: "💫 Explorons maintenant quelque chose de très délicat et important..." },
        { type: 'narrative', content: [{"text": "🧠 Les neurosciences révèlent que l'attachement émotionnel suit des ", "bold": true}, {"text": "patterns neurobiologiques", "bold": true}, {"text": " précis, influencés par notre style d'attachement formé dans l'enfance."}, {"text": "\n\n"}, {"text": "Certaines personnes s'attachent rapidement, d'autres prennent plus de temps - il n'y a pas de 'bonne' façon."}] },
        { type: 'message', content: "🌱 Comme une jeune pousse qui développe ses racines à son propre rythme, ton cœur a sa façon unique de s'enraciner émotionnellement..." },
        { type: 'message', content: [{"text": "Combien de temps te faut-il généralement avant de te sentir vraiment attachée ou même dépendante émotionnellement de l'autre ?", "bold": true}] },
        { type: 'choice', variable: 'timeline_d_attachement_emotionnel', options: [{"id": "presque_immediatement_mon", "label": "⚡ Presque immédiatement - Mon cœur s'ouvre vite"}, {"id": "quelques_semaines_le_temps", "label": "🌱 Quelques semaines - Le temps de la germination"}, {"id": "quelques_mois_l_enracineme", "label": "🌿 Quelques mois - L'enracinement progressif"}, {"id": "environ_un_an_la_croissanc", "label": "🌳 Environ un an - La croissance lente et profonde"}, {"id": "je_garde_toujours_une_certai", "label": "🗻 Je garde toujours une certaine indépendance"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Signes d'Attachement" },

        { type: 'message', content: "🙏 Merci de partager ce rythme si personnel... Chaque tempo d'attachement a sa propre sagesse." },
        { type: 'message', content: "💫 J'aimerais maintenant comprendre les signes subtils qui t'indiquent que ton cœur s'est attaché...\n\nCes signaux précieux que ton corps et ton âme t'envoient..." },
        { type: 'message', content: [{"text": "Quels sont les signes - dans ton cœur, ton corps, tes pensées - qui te montrent que tu es devenue émotionnellement dépendante ?", "bold": true}] },
        { type: 'text_input', variable: 'signes_de_dependance_emotionnelle', placeholder: "Je sais que je suis dépendante quand... dans mon corps je ressens... mes pensées deviennent...", isLong: true },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Validation des Signes" },

        { type: 'narrative', content: [{"text": "✨ Cette conscience de tes signaux intérieurs est un ", "bold": true}, {"text": "cadeau immense", "bold": true}, {"text": " que tu te fais..."}, {"text": "\n\n"}, {"text": "Beaucoup de femmes vivent ces expériences sans les comprendre. Toi, tu développes cette sagesse intérieure qui permet d'observer tes patterns avec bienveillance."}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Exploration - Projections et Idéalisation" },

        { type: 'image', url: "https://images.unsplash.com/photo-1684505760553-2551d5870b5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHNlYXJjaHwzfHx0ZXJyaXRvaXJlfGVufDB8MHx8fDE3NTY4OTk4ODF8MA&ixlib=rb-4.1.0&q=80&w=1080", alt: "" },
        { type: 'message', content: "💫 Explorons maintenant un territoire délicat mais essentiel..." },
        { type: 'narrative', content: [{"text": "🧠 En psychologie, la ", "bold": true}, {"text": "projection", "bold": true}, {"text": " est ce mécanisme inconscient par lequel nous attribuons à l'autre des qualités, des intentions ou des capacités qu'il n'a pas nécessairement."}, {"text": "\n\n"}, {"text": "C'est normal et humain - nous créons une version idéalisée de l'autre pour combler nos besoins profonds."}] },
        { type: 'message', content: "🌱 Comme une jeune pousse qui imagine parfois voir plus de lumière qu'il n'y en a vraiment, notre cœur en phase de séduction crée parfois de beaux mirages..." },
        { type: 'message', content: [{"text": "Dans tes phases de séduction, quelles projections ou idéalisations crées-tu typiquement sur l'autre ?", "bold": true}] },
        { type: 'text_input', variable: 'projections_en_phase_de_seduction', placeholder: "Au début, j'imagine souvent que l'autre... je lui prête des qualités comme... j'espère qu'il sera...", isLong: true },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Réalité vs Projections" },

        { type: 'message', content: "💎 Et maintenant la question délicate mais libératrice...\n\nQue se passe-t-il généralement quand la réalité se révèle et que tes projections se confrontent à la vraie personnalité de l'autre ?" },
        { type: 'message', content: [{"text": "Comment la réalité se compare-t-elle généralement à ces belles projections ?", "bold": true}] },
        { type: 'text_input', variable: 'confrontation_projections_vs_realite', placeholder: "Avec le temps, je réalise que... la réalité révèle souvent... et cela me fait ressentir...", isLong: true },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Intégration Première Partie" },

        { type: 'message', content: "Tu viens de cartographier avec une honnêteté remarquable la façon dont ton cœur s'ouvre à l'amour." },
        { type: 'narrative', content: [{"text": "🌱 Ta première pousse a révélé :", "bold": true}, {"text": "\n\n"}, {"text": "• La façon unique dont tes relations commencent"}, {"text": "\n\n"}, {"text": "• Les éléments qui allument ton attraction"}, {"text": "\n\n"}, {"text": "• Ton rythme personnel d'attachement"}, {"text": "\n\n"}, {"text": "• Tes projections et leur confrontation à la réalité"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Transition vers les Cycles" },

        { type: 'image', url: "https://images.unsplash.com/photo-1459478309853-2c33a60058e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHNlYXJjaHwyfHxzZWFzb258ZW58MHwwfHx8MTc1Njg5OTk5M3ww&ixlib=rb-4.1.0&q=80&w=1080", alt: "" },
        { type: 'message', content: "🍃 Maintenant que nous avons exploré la naissance de tes élans amoureux, découvrons leurs saisons...\n\nCar comme un arbre qui traverse printemps, été, automne et hiver, tes relations ont leurs propres cycles." },
        { type: 'message', content: [{"text": "🌸 Les Saisons Relationnelles", "bold": true}, {"text": "\n\n"}, {"text": "Explorons maintenant avec la même tendresse les cycles qui se répètent dans tes relations..."}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Exploration - Lune de Miel" },

        { type: 'message', content: "💫 Commençons par explorer cette saison dorée qu'on appelle la 'lune de miel'..." },
        { type: 'narrative', content: [{"text": "🧠 Les neurosciences montrent que cette période est caractérisée par un ", "bold": true}, {"text": "cocktail neurochimique", "bold": true}, {"text": " unique : dopamine, ocytocine, sérotonine... créant cette sensation d'euphorie et d'harmonie parfaite."}, {"text": "\n\n"}, {"text": "C'est biologiquement temporaire - et c'est normal !"}] },
        { type: 'message', content: "🌸 C'est le printemps de ta relation - cette période où tout semble possible et magnifique..." },
        { type: 'message', content: [{"text": "Combien de temps dure généralement cette phase enchantée dans tes relations ?", "bold": true}] },
        { type: 'choice', variable: 'duree_de_la_lune_de_miel', options: [{"id": "1_a_3_mois_un_printemps_in", "label": "🌱 1 à 3 mois - Un printemps intense mais bref"}, {"id": "3_a_6_mois_une_floraison_g", "label": "🌸 3 à 6 mois - Une floraison généreuse"}, {"id": "6_mois_a_1_an_un_ete_prolo", "label": "🌻 6 mois à 1 an - Un été prolongé"}, {"id": "plus_d_un_an_une_magie_dur", "label": "🌺 Plus d'un an - Une magie durable"}, {"id": "c_est_tres_variable_selon_le", "label": "🔄 C'est très variable selon les relations"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Expérience de la Lune de Miel" },

        { type: 'message', content: "🙏 Merci de partager ce rythme si personnel... Chaque cœur a ses propres saisons." },
        { type: 'message', content: "💫 J'aimerais maintenant connaître la texture unique de ces moments précieux...\n\nComment vis-tu intérieurement cette période ? Qu'est-ce qui la caractérise dans ton cœur et ton corps ?" },
        { type: 'text_input', variable: 'experience_de_la_lune_de_miel', placeholder: "Pendant la lune de miel, je ressens... mon corps vibre de... mes pensées sont... cette période a la saveur de...", isLong: true },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Premiers Problèmes" },

        { type: 'message', content: "✨ Cette description de ta lune de miel révèle la beauté unique de ta façon d'aimer...\n\nCes moments précieux font partie du trésor de ton cœur." },
        { type: 'message', content: "🍂 Et puis vient l'automne... Cette période où les premiers défis apparaissent...\n\nC'est naturel et nécessaire - c'est le moment où la relation montre sa vraie nature." },
        { type: 'message', content: [{"text": "Quand et dans quelles circonstances apparaissent généralement tes premiers défis relationnels ?", "bold": true}] },
        { type: 'text_input', variable: 'moment_d_apparition_des_problemes', placeholder: "Les premiers problèmes apparaissent généralement quand... dans le contexte de... au moment où...", isLong: true },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Déclencheurs des Problèmes" },

        { type: 'message', content: "🙏 Identifier 'quand' les défis apparaissent est le premier pas vers la compréhension du 'pourquoi'." },
        { type: 'narrative', content: [{"text": "💫 Maintenant, explorons les déclencheurs spécifiques de ces premières tensions..."}, {"text": "\n\n"}, {"text": "Quels sont les éléments qui allument généralement ces premières étincelles de conflit ?", "bold": true}, {"text": "\n\n"}, {"text": "(Tu peux choisir plusieurs déclencheurs) 🔥", "italic": true}] },
        { type: 'choice', variable: 'declencheurs_des_problemes', multiple: true, options: [{"id": "jalousie_cette_peur_de_per", "label": "💚 Jalousie - Cette peur de perdre l'autre"}, {"id": "problemes_de_communication", "label": "🗣️ Problèmes de communication - Les malentendus"}, {"id": "attentes_differentes_les_v", "label": "🎯 Attentes différentes - Les visions qui divergent"}, {"id": "differences_d_engagement_l", "label": "💍 Différences d'engagement - Les rythmes décalés"}, {"id": "installation_de_la_routine", "label": "🔄 Installation de la routine - La magie qui s'évapore"}, {"id": "conflits_de_valeurs_les_p", "label": "⚖️ Conflits de valeurs - Les principes qui s'opposent"}, {"id": "besoins_non_satisfaits_les", "label": "💝 Besoins non satisfaits - Les attentes déçues"}, {"id": "questions_de_controle_les", "label": "🎮 Questions de contrôle - Les pouvoirs qui s'affrontent"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Patterns Destructeurs" },

        { type: 'message', content: "✨ Il faut du courage pour reconnaître ces déclencheurs... Tu développes une conscience émotionnelle remarquable." },
        { type: 'message', content: "💫 Maintenant, explorons quelque chose de plus profond et délicat...\n\nLes patterns récurrents qui se manifestent dans tes relations - ces cycles qui se répètent parfois malgré toi." },
        { type: 'message', content: [{"text": "🧠 Ces patterns ne sont pas des défauts - ils sont souvent des ", "bold": true}, {"text": "stratégies de survie", "bold": true}, {"text": " développées dans ton passé pour protéger ton cœur."}] },
        { type: 'message', content: [{"text": "Peux-tu identifier avec bienveillance envers toi-même des patterns qui se répètent dans tes relations ?", "bold": true}] },
        { type: 'text_input', variable: 'patterns_destructeurs_recurrents', placeholder: "Je remarque que dans mes relations, il y a souvent... ce pattern se manifeste par... et cela crée...", isLong: true },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Exemple Concret de Pattern" },

        { type: 'message', content: "🙏 Cette honnêteté avec toi-même est un acte d'amour profond...\n\nReconnaître ses patterns sans se juger est le fondement de toute guérison authentique." },
        { type: 'message', content: "💝 Pour ancrer cette prise de conscience, pourrais-tu partager un exemple concret de l'un de ces patterns ?\n\nUn souvenir spécifique qui illustre bien cette dynamique récurrente..." },
        { type: 'text_input', variable: 'exemple_concret_de_pattern', placeholder: "Par exemple, dans ma dernière relation... cette situation s'est manifestée quand... et j'ai réagi en...", isLong: true },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Responsabilité dans les Cycles" },

        { type: 'message', content: "✨ Merci pour cette vulnérabilité si précieuse...\n\nCet exemple concret éclaire magnifiquement la façon dont tes patterns se manifestent dans la vraie vie." },
        { type: 'message', content: "💫 Maintenant vient la question la plus courageuse et la plus libératrice..." },
        { type: 'narrative', content: [{"text": "🤲 Cette question demande un courage immense..."}, {"text": "\n\n"}, {"text": "Il ne s'agit pas de culpabilité, mais de ", "bold": true}, {"text": "pouvoir personnel", "bold": true}, {"text": " - reconnaître ce sur quoi tu as une influence."}] },
        { type: 'message', content: [{"text": "Avec toute la bienveillance du monde envers toi-même : quelle est ta part de responsabilité dans ces cycles relationnels ?", "bold": true}] },
        { type: 'text_input', variable: 'responsabilite_dans_les_cycles', placeholder: "Je reconnais avec compassion que ma part de responsabilité inclut... mes contributions à ces cycles sont...", isLong: true },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Changement Souhaité" },

        { type: 'message', content: "Il faut un courage exceptionnel pour reconnaître sa part de responsabilité sans se juger. Tu viens de franchir un seuil majeur de maturité émotionnelle." },
        { type: 'message', content: "🌱 Et maintenant, tournons-nous vers la transformation...\n\nCar reconnaître, c'est le premier pas. Le deuxième, c'est choisir consciemment de grandir." },
        { type: 'message', content: [{"text": "Qu'est-ce que tu aimerais transformer dans ta façon d'être en relation ?", "bold": true}] },
        { type: 'text_input', variable: 'changement_souhaite', placeholder: "J'aimerais apprendre à... développer... transformer... créer plus de...", isLong: true },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Intégration Somatique" },

        { type: 'message', content: "✨ Cette intention de transformation que tu viens de poser est comme une graine plantée dans le terreau fertile de ta conscience..." },
        { type: 'image', url: "https://images.unsplash.com/photo-1542374848-4c74196a2207?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHNlYXJjaHw5NXx8Zmxvd2VyfGVufDB8MHx8fDE3NTY5MDA2NTR8MA&ixlib=rb-4.1.0&q=80&w=1080", alt: "" },
        { type: 'message', content: "🧘‍♀️ Avant de clôturer cette exploration, prenons un moment pour ancrer toutes ces découvertes dans ton corps...\n\nCar ton corps porte la mémoire de tous ces élans amoureux, de ces cycles, de ces patterns." },
        { type: 'message', content: [{"text": "Ferme les yeux un instant... Où dans ton corps ressens-tu ces premiers élans amoureux dont nous avons parlé ?", "bold": true}, {"text": "\n\n"}, {"text": "Dans ton cœur ? Ton ventre ? Ta poitrine ? Tes mains ?", "italic": true}] },
        { type: 'text_input', variable: 'integration_somatique', placeholder: "Dans mon corps, je ressens ces élans amoureux dans... comme une sensation de... qui me dit...", isLong: true },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Célébration Finale" },

        { type: 'image', url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", alt: "" },
        { type: 'message', content: [{"text": "🙏 ✨ ", "bold": true}, {"text": "Merci infiniment pour ton courage et ton honnêteté", "bold": true, "italic": true}, {"text": " ✨ 🙏", "bold": true}] },
        { type: 'narrative', content: [{"text": "🌟 Regarde ces découvertes précieuses que tu as révélées :", "bold": true}, {"text": "\n\n"}, {"text": "✨ La signature unique de tes débuts amoureux"}, {"text": "\n\n"}, {"text": "✨ Les éléments qui allument ton attraction"}, {"text": "\n\n"}, {"text": "✨ Ton rythme personnel d'attachement"}, {"text": "\n\n"}, {"text": "✨ Tes projections et leur confrontation au réel"}, {"text": "\n\n"}, {"text": "✨ Les saisons de tes relations"}, {"text": "\n\n"}, {"text": "✨ Tes patterns et ta part de responsabilité"}, {"text": "\n\n"}, {"text": "✨ Ton intention de transformation"}] },
        { type: 'message', content: "🌱 Ta première pousse a trouvé sa direction vers la lumière...\n\nElle connaît maintenant ses patterns, ses cycles, ses désirs de croissance. Elle est prête pour l'étape suivante de son épanouissement." },
        { type: 'message', content: "🌿 Dans le prochain formulaire, nous explorerons plus profondément ces cycles et patterns relationnels avec des outils concrets de transformation...\n\nCar cette conscience que tu as développée aujourd'hui est le terreau fertile de tous les changements à venir." },
        { type: 'message', content: [{"text": "Alhamdulillahi rabbil alameen...", "italic": true}, {"text": "\n\n"}, {"text": "✨ Louanges à Allah qui guide chaque âme vers sa lumière intérieure. ✨", "italic": true}] },

        { type: 'completion', title: "Félicitations !", message: "Tu as terminé F3.1 — Début des Relations. Tes réponses ont été sauvegardées.", icon: '💕' }
    ]
};

/* ─── Form Registry ─── */
if (typeof window.FORM_REGISTRY === 'undefined') window.FORM_REGISTRY = {};
window.FORM_REGISTRY['f3-1-debut-relations'] = F3_1_DEBUT_RELATIONS;
