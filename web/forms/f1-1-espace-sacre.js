/* ═══════════════════════════════════════
   F1.1 — L'Espace Sacré
   Converti depuis Typebot · 224 steps · 7 variables
═══════════════════════════════════════ */

const F1_1_ESPACE_SACRE = {
    id: 'f1_1_espace_sacre',
    version: 1,
    title: "F1.1 — L'Espace Sacré",
    icon: '🌱',
    checkboxId: 'f1_1',
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
        "email",
        "intention_du_voyage",
        "niveau_de_motivation",
        "niveau_de_securite_ressenti",
        "niveau_de_sincerite",
        "ressenti_corporel",
        "telephone"
],

    steps: [

        /* ════════════════════════════════════ */
        { type: 'section', title: "Le parcours" },

        { type: 'message', content: [{"text": "💫 Laisse-moi t'expliquer "}, {"text": "notre parcours ensemble", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "Tu te trouves actuellement dans le "}, {"text": "premier formulaire", "bold": true}, {"text": " de ton voyage intérieur."}, {"text": "\n\n"}, {"text": "Plus précisément, tu es dans le Formulaire 1.1, qui est le premier des 6 formulaires de la "}, {"text": "Phase Germination", "bold": true}, {"text": "."}] },
        { type: 'message', content: [{"text": "Je te recommande de prévoir "}, {"text": "45 minutes à 1 heure", "bold": true}, {"text": " en continu pour préserver la cohérence du processus."}] },
        { type: 'message', content: [{"text": "Pense à ce moment comme une "}, {"text": "conversation profonde avec toi-même", "bold": true}, {"text": " - ce travail mérite qu'on lui accorde le temps nécessaire."}] },
        { type: 'narrative', content: [{"text": "Voilà.", "italic": true}, {"text": "\n\n"}, {"text": "Ta présence ici témoigne d'une "}, {"text": "décision importante", "bold": true}, {"text": " : tu as choisi de comprendre."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "decouvrir_la_suite", "label": "Découvrir la suite →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Faire connaissance" },

        { type: 'message', content: [{"text": "📍 Commençons par "}, {"text": "faire connaissance", "bold": true}, {"text": "."}] },
        { type: 'message', content: [{"text": "J'ai besoin de quelques informations pour "}, {"text": "personnaliser ton parcours", "bold": true}, {"text": " et m'assurer que tu reçoives toutes les ressources adaptées à ta situation."}] },
        { type: 'message', content: [{"text": "Bien sûr, tes données sont "}, {"text": "protégées et strictement confidentielles", "bold": true}, {"text": "."}] },
        { type: 'message', content: [{"text": "Ta présence ici témoigne d'une "}, {"text": "décision importante", "bold": true}, {"text": " : tu as choisi de comprendre."}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Email" },

        { type: 'narrative', content: [{"text": "Quelle est ton adresse email pour recevoir ta "}, {"text": "cartographie personnalisée", "bold": true}, {"text": " ?"}, {"text": "\n\n"}, {"text": "(Tu recevras également des ressources adaptées à ton parcours)", "italic": true}] },
        { type: 'email_input', variable: 'email', placeholder: "ton.email@exemple.com" },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Téléphone" },

        { type: 'message', content: [{"text": "Aurais-tu un numéro où je pourrais te joindre si nécessaire ?"}, {"text": "\n\n"}, {"text": "(Uniquement pour ton suivi personnalisé)", "italic": true}] },
        { type: 'phone_input', variable: 'telephone', placeholder: "06 12 34 56 78", defaultPrefix: '+33' },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Remerciement" },

        { type: 'message', content: [{"text": "✨ "}, {"text": "Merci infiniment", "bold": true}, {"text": " pour ces informations."}] },
        { type: 'narrative', content: [{"text": "Tu viens de poser la "}, {"text": "première pierre", "bold": true}, {"text": " de ton parcours de transformation."}, {"text": "\n\n"}, {"text": "C'est un moment important."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "explorer_plus_loin", "label": "Explorer plus loin →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "La cartographie émotionnelle" },

        { type: 'image', url: "https://images.unsplash.com/photo-1464788061904-b026adb5422b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHNlYXJjaHwzfHxDSEVNSU58ZW58MHwwfHx8MTc1MjY2MjkzM3ww&ixlib=rb-4.1.0&q=80&w=1080", alt: "" },
        { type: 'message', content: [{"text": "📍 Laisse-moi te parler de la "}, {"text": "Cartographie Émotionnelle", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "Je veux être transparent avec toi : ce parcours n'est pas une solution rapide."}, {"text": "\n\n"}, {"text": "C'est un processus de "}, {"text": "transformation authentique", "bold": true}, {"text": ", profond et durable."}] },
        { type: 'message', content: [{"text": "Tu te demandes peut-être pourquoi cette "}, {"text": "approche progressive", "bold": true}, {"text": " ?"}] },
        { type: 'narrative', content: [{"text": "C'est parce que la guérison véritable nécessite "}, {"text": "du temps pour s'ancrer", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Comme Allah fait mûrir le fruit en son temps, tes prises de conscience ont besoin d'espace pour s'épanouir."}] },
        { type: 'message', content: [{"text": "\"C'est Lui qui a créé toute chose et lui a donné sa juste mesure\"", "italic": true}, {"text": " (25:2)"}] },
        { type: 'choice', variable: 'choix', options: [{"id": "j_ai_compris", "label": "J'ai compris →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Les 5 phases" },

        { type: 'message', content: [{"text": "🌊 Voici les "}, {"text": "5 phases de ta transformation", "bold": true}, {"text": " qui t'attendent :"}] },
        { type: 'narrative', content: [{"text": "🌱 "}, {"text": "Phase 1 - Germination", "bold": true}, {"text": " "}, {"text": "(où tu es maintenant)", "italic": true}, {"text": "\n\n"}, {"text": "→ Nous allons explorer qui tu es aujourd'hui à travers 3 formulaires approfondis"}] },
        { type: 'narrative', content: [{"text": "🌿 "}, {"text": "Phase 2 - Croissance", "bold": true}, {"text": "\n\n"}, {"text": "→ Nous comprendrons tes racines familiales avec douceur"}] },
        { type: 'narrative', content: [{"text": "🌳 "}, {"text": "Phase 3 - Enracinement", "bold": true}, {"text": "\n\n"}, {"text": "→ Nous identifierons les schémas récurrents dans tes relations"}] },
        { type: 'narrative', content: [{"text": "🌸 "}, {"text": "Phase 4 - Floraison", "bold": true}, {"text": "\n\n"}, {"text": "→ Nous intégrerons ta dimension spirituelle dans ta guérison"}] },
        { type: 'narrative', content: [{"text": "🍃 "}, {"text": "Phase 5 - Intégration", "bold": true}, {"text": "\n\n"}, {"text": "→ Nous créerons ton plan personnel de transformation durable"}] },
        { type: 'message', content: [{"text": "\"N'as-tu pas vu comment Allah propose en parabole une bonne parole pareille à un bel arbre dont la racine est ferme et la ramure s'élance dans le ciel ?\"", "italic": true}, {"text": " (14:24)"}] },
        { type: 'choice', variable: 'choix', options: [{"id": "continuer_l_exploration", "label": "Continuer l'exploration →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Ce que tu découvriras" },

        { type: 'message', content: [{"text": "💫 Voici ce que tu "}, {"text": "découvriras sur toi-même", "bold": true}, {"text": " :"}] },
        { type: 'message', content: "Au fil de ce voyage, tu comprendras :" },
        { type: 'message', content: [{"text": "Les "}, {"text": "raisons profondes", "bold": true}, {"text": " derrière tes choix relationnels répétitifs"}] },
        { type: 'message', content: [{"text": "Comment tes expériences passées "}, {"text": "influencent tes relations actuelles", "bold": true}] },
        { type: 'message', content: [{"text": "Les "}, {"text": "forces cachées", "bold": true}, {"text": " que tu as développées à travers tes épreuves"}] },
        { type: 'message', content: [{"text": "Ton "}, {"text": "mode de fonctionnement unique", "bold": true}, {"text": " en amour"}] },
        { type: 'message', content: [{"text": "Les clés pour "}, {"text": "transformer ce qui ne te sert plus", "bold": true}] },
        { type: 'choice', variable: 'choix', options: [{"id": "je_veux_comprendre", "label": "Je veux comprendre →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Ta motivation" },

        { type: 'message', content: [{"text": "💡 J'aimerais savoir où tu te situes dans ta "}, {"text": "motivation actuelle", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "Cette question me permet de comprendre ton point de départ."}, {"text": "\n\n"}, {"text": "Il n'y a pas de bonne ou mauvaise réponse - seulement "}, {"text": "ta vérité du moment", "bold": true}, {"text": "."}] },
        { type: 'message', content: [{"text": "Sur une échelle de préparation intérieure, où te situes-tu ?"}, {"text": "\n\n"}, {"text": "(1 = J'hésite encore, 10 = Je suis pleinement engagée)", "italic": true}] },
        { type: 'rating', variable: 'niveau_de_motivation', max: 10, leftLabel: "J'hésite", rightLabel: "Engagée" },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Validation motivation" },

        { type: 'narrative', content: [{"text": "Ta réponse est "}, {"text": "précieuse", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Elle me permet d'adapter mon accompagnement à tes besoins réels."}] },
        { type: 'message', content: [{"text": "Tu sais, le simple fait d'être ici, à explorer ces questions, témoigne déjà de "}, {"text": "ton courage", "bold": true}, {"text": "."}] },
        { type: 'message', content: [{"text": "Chaque personne commence exactement où elle en est - et c'est "}, {"text": "toujours le bon endroit", "bold": true}, {"text": " pour commencer."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "decouvrir_mes_piliers", "label": "Découvrir mes piliers →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Les 9 piliers" },

        { type: 'image', url: "https://images.unsplash.com/photo-1749497683197-ae96f3cb92f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NTI4Mjk5MDB8&ixlib=rb-4.1.0&q=80&w=1080", alt: "" },
        { type: 'message', content: [{"text": "✨ Au fil de ce voyage, tu construiras "}, {"text": "9 piliers de force", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "Laisse-moi te parler de ces piliers qui se révéleront progressivement."}, {"text": "\n\n"}, {"text": "C'est comme construire une "}, {"text": "architecture intérieure solide", "bold": true}, {"text": " :"}] },
        { type: 'message', content: [{"text": "💫 "}, {"text": "Courage", "bold": true}, {"text": " - Tu l'as déjà démontré en osant commencer"}] },
        { type: 'message', content: [{"text": "💫 "}, {"text": "Authenticité", "bold": true}, {"text": " - La capacité à partager ta vérité profonde"}] },
        { type: 'message', content: [{"text": "💫 "}, {"text": "Présence", "bold": true}, {"text": " - La capacité à rester ancrée dans l'instant"}] },
        { type: 'message', content: [{"text": "💫 "}, {"text": "Sagesse", "bold": true}, {"text": " - En reconnaissant les leçons de ton parcours"}] },
        { type: 'message', content: [{"text": "💫 "}, {"text": "Persévérance", "bold": true}, {"text": " - Pour continuer même quand c'est difficile"}] },
        { type: 'message', content: [{"text": "Et "}, {"text": "4 autres piliers magnifiques", "bold": true}, {"text": " qui se dévoileront au moment opportun..."}] },
        { type: 'narrative', content: [{"text": "\"Allah est beau et Il aime la beauté\"", "italic": true}, {"text": "\n\n"}, {"text": "Cette construction intérieure reflète la "}, {"text": "beauté de ton âme", "bold": true}, {"text": " qui aspire à s'épanouir."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "sceller_notre_alliance", "label": "Sceller notre alliance →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Notre alliance" },

        { type: 'message', content: [{"text": "🤝 Avant d'aller plus loin, scellons notre "}, {"text": "alliance de travail", "bold": true}, {"text": "."}] },
        { type: 'message', content: [{"text": "💝 Voici "}, {"text": "mon engagement", "bold": true}, {"text": " envers toi :"}] },
        { type: 'message', content: [{"text": "Je vais t'accompagner avec "}, {"text": "bienveillance et rigueur", "bold": true}] },
        { type: 'message', content: [{"text": "Je respecterai "}, {"text": "ton rythme unique", "bold": true}] },
        { type: 'message', content: [{"text": "Je créerai une "}, {"text": "cartographie précise et utile", "bold": true}, {"text": " pour toi"}] },
        { type: 'message', content: [{"text": "Je maintiendrai un "}, {"text": "cadre professionnel et sécurisant", "bold": true}] },
        { type: 'message', content: [{"text": "🌺 Et voici ce dont "}, {"text": "j'ai besoin", "bold": true}, {"text": " de ta part :"}] },
        { type: 'message', content: [{"text": "Ta "}, {"text": "sincérité", "bold": true}, {"text": " dans les réponses"}] },
        { type: 'message', content: [{"text": "Ta "}, {"text": "présence attentive", "bold": true}] },
        { type: 'message', content: [{"text": "Ta "}, {"text": "patience", "bold": true}, {"text": " avec le processus"}] },
        { type: 'message', content: [{"text": "Ton "}, {"text": "ouverture", "bold": true}, {"text": " aux découvertes"}] },
        { type: 'choice', variable: 'choix', options: [{"id": "j_accepte_cette_alliance", "label": "J'accepte cette alliance →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Transparence" },

        { type: 'message', content: [{"text": "⚠️ Je préfère être transparent : ce voyage peut parfois être "}, {"text": "intense", "bold": true}, {"text": "."}] },
        { type: 'message', content: "Explorer ses profondeurs peut :" },
        { type: 'message', content: [{"text": "Réveiller des "}, {"text": "émotions endormies", "bold": true}, {"text": " - elles font partie du processus de guérison"}] },
        { type: 'message', content: [{"text": "Provoquer des "}, {"text": "prises de conscience", "bold": true}, {"text": " parfois déstabilisantes"}] },
        { type: 'message', content: [{"text": "Demander du "}, {"text": "courage", "bold": true}, {"text": " pour regarder certaines vérités"}] },
        { type: 'narrative', content: [{"text": "Mais sache que chaque émotion est une "}, {"text": "messagère", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Elle vient t'enseigner quelque chose d'important sur ton chemin."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "je_comprends", "label": "Je comprends →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Tes droits" },

        { type: 'message', content: [{"text": "🤲 Tu conserves toujours ces "}, {"text": "droits fondamentaux", "bold": true}, {"text": " dans ce voyage."}] },
        { type: 'message', content: "Je tiens à te rappeler que tu as le droit de :" },
        { type: 'message', content: [{"text": "✨ Avancer à "}, {"text": "ton rythme", "bold": true}, {"text": " - Il n'y a aucune course"}] },
        { type: 'message', content: [{"text": "✨ "}, {"text": "Respirer", "bold": true}, {"text": " quand tu en ressens le besoin"}] },
        { type: 'message', content: [{"text": "✨ Ressentir "}, {"text": "toutes tes émotions", "bold": true}, {"text": " - elles sont toutes légitimes"}] },
        { type: 'message', content: [{"text": "✨ Être "}, {"text": "imparfaite", "bold": true}, {"text": " - c'est ton humanité"}] },
        { type: 'message', content: [{"text": "✨ Célébrer "}, {"text": "chaque avancée", "bold": true}, {"text": ", même petite"}] },
        { type: 'narrative', content: [{"text": "Ce voyage t'appartient."}, {"text": "\n\n"}, {"text": "Honore ton rythme unique", "bold": true}, {"text": "."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "voir_si_je_me_reconnais", "label": "Voir si je me reconnais →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Reconnaissance" },

        { type: 'image', url: "https://images.unsplash.com/photo-1505816014357-96b5ff457e9a", alt: "" },
        { type: 'message', content: [{"text": "💭 Peut-être te reconnais-tu dans certaines de ces "}, {"text": "situations", "bold": true}, {"text": " ?"}] },
        { type: 'message', content: "Si certaines de ces phrases résonnent en toi :" },
        { type: 'message', content: [{"text": "\"Je répète toujours les mêmes schémas en amour\"", "italic": true}] },
        { type: 'message', content: [{"text": "\"Je me demande pourquoi mes relations suivent le même scénario\"", "italic": true}] },
        { type: 'message', content: [{"text": "\"Je sens qu'il y a un lien avec mon passé mais je ne le vois pas clairement\"", "italic": true}] },
        { type: 'message', content: [{"text": "\"J'ai besoin de comprendre pour pouvoir changer\"", "italic": true}] },
        { type: 'message', content: [{"text": "\"Je suis prête pour une transformation authentique et durable\"", "italic": true}] },
        { type: 'message', content: "Si tu hoches la tête en lisant ces mots..." },
        { type: 'narrative', content: [{"text": "Sache que tu n'es "}, {"text": "PAS défaillante", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Tu n'es "}, {"text": "PAS trop compliquée", "bold": true}, {"text": "."}] },
        { type: 'message', content: [{"text": "Tu portes simplement une histoire qui mérite d'être "}, {"text": "comprise avec respect", "bold": true}, {"text": "."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "poser_mon_intention", "label": "Poser mon intention →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "L'intention" },

        { type: 'message', content: [{"text": "💡 Maintenant, j'aimerais que nous posions ensemble une "}, {"text": "intention claire", "bold": true}, {"text": "."}] },
        { type: 'message', content: [{"text": "Les neurosciences affirment qu'une intention consciente "}, {"text": "multiplie par 3", "bold": true}, {"text": " les chances de transformation réussie."}] },
        { type: 'narrative', content: [{"text": "Dans notre tradition spirituelle, l'intention (niyyah) est le "}, {"text": "fondement de toute action", "bold": true}, {"text": " :"}, {"text": "\n\n"}, {"text": "\"Les actions ne valent que par leurs intentions\"", "italic": true}, {"text": " (Hadith)."}] },
        { type: 'message', content: [{"text": "Cette intention sera ton "}, {"text": "phare dans les moments de doute", "bold": true}, {"text": "."}] },
        { type: 'message', content: [{"text": "Quelle intention poses-tu pour ce "}, {"text": "voyage de transformation", "bold": true}, {"text": " ?"}] },
        { type: 'message', content: [{"text": "Prends un moment de recueillement, murmure "}, {"text": "\"Bismillah\"", "italic": true}, {"text": " et laisse ton cœur s'exprimer..."}] },
        { type: 'narrative', content: [{"text": "💬 Exprime-toi librement (audio ou écrit, comme tu préfères) ", "italic": true}, {"text": "\n\n"}, {"text": "✨ Plus tu partages, plus ta cartographie sera précise insha'Allah ", "italic": true}, {"text": "\n\n"}, {"text": "🎤 Audio uniquement sur WhatsApp !", "italic": true}, {"text": "\n\n"}, {"text": "🤍 Choisis ce qui te met le plus à l'aise", "italic": true}] },
        { type: 'text_input', variable: 'intention_du_voyage', placeholder: "Mon intention profonde est de...", isLong: true },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Validation intention" },

        { type: 'narrative', content: [{"text": "Cette intention est maintenant "}, {"text": "ancrée dans ton cœur", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Elle guidera chaque étape de ton parcours."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "preparer_les_conditions", "label": "Préparer les conditions →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Conditions optimales" },

        { type: 'message', content: [{"text": "🕊️ Avant de plonger dans l'exploration, préparons les "}, {"text": "conditions optimales", "bold": true}, {"text": "."}] },
        { type: 'message', content: "J'aimerais m'assurer que tu disposes de :" },
        { type: 'message', content: [{"text": "☐ "}, {"text": "45 minutes à 1 heure", "bold": true}, {"text": " sans interruption"}] },
        { type: 'message', content: [{"text": "☐ Un "}, {"text": "espace calme", "bold": true}, {"text": " où tu te sens en sécurité"}] },
        { type: 'message', content: [{"text": "☐ Ta "}, {"text": "boisson préférée", "bold": true}, {"text": " à portée de main"}] },
        { type: 'message', content: [{"text": "☐ Un "}, {"text": "cœur disponible", "bold": true}, {"text": " pour accueillir ce qui émergera"}] },
        { type: 'message', content: [{"text": "L'idéal est de compléter chaque formulaire en "}, {"text": "une session", "bold": true}, {"text": " pour maintenir la cohérence du processus."}] },
        { type: 'message', content: "Es-tu dans de bonnes conditions pour commencer ?" },
        { type: 'choice', variable: 'choix', options: [{"id": "oui_je_suis_prete", "label": "Oui, je suis prête"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Début de la germination" },

        { type: 'image', url: "https://images.unsplash.com/photo-1738315783529-32f0bb4a65ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHNlYXJjaHw3fHxnZXJtaW5hdGlvbnxlbnwwfDB8fHwxNzUyNjYzNTc0fDA&ixlib=rb-4.1.0&q=80&w=1080", alt: "" },
        { type: 'message', content: [{"text": "📍 Parfait, la "}, {"text": "Germination", "bold": true}, {"text": " peut maintenant commencer."}] },
        { type: 'narrative', content: [{"text": "🌱 "}, {"text": "PHASE I : GERMINATION", "bold": true}, {"text": "\n\n"}, {"text": "Première partie : Créons ensemble ton espace de confiance"}] },
        { type: 'message', content: [{"text": "Bismillah ar-Rahman ar-Rahim...", "italic": true}] },
        { type: 'narrative', content: [{"text": "Nous y voilà."}, {"text": "\n\n"}, {"text": "Bienvenue", "bold": true}, {"text": " dans cette première phase de ton parcours."}] },
        { type: 'message', content: "La Germination... Sais-tu ce que c'est ?" },
        { type: 'narrative', content: [{"text": "C'est ce moment précieux où la graine commence à "}, {"text": "s'éveiller sous la terre", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Personne ne la voit encore, mais elle sait qu'elle est en train de devenir."}] },
        { type: 'message', content: "Prenons un instant pour nous centrer..." },
        { type: 'message', content: [{"text": "Si tu le souhaites, pose ta "}, {"text": "main droite sur ton cœur", "bold": true}, {"text": " - c'est une pratique prophétique qui apaise et recentre."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "creer_mon_espace_securise", "label": "Créer mon espace sécurisé →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Espace sécurisé" },

        { type: 'message', content: [{"text": "🔐 Maintenant, créons ensemble ton "}, {"text": "espace sécurisé", "bold": true}, {"text": "."}] },
        { type: 'message', content: [{"text": "Pour que tu puisses t'ouvrir en toute confiance, j'aimerais établir clairement le "}, {"text": "cadre de sécurité", "bold": true}, {"text": " de cet espace."}] },
        { type: 'message', content: [{"text": "🔒 Voici ma "}, {"text": "promesse de confidentialité", "bold": true}, {"text": " :"}] },
        { type: 'message', content: [{"text": "✓  Ta "}, {"text": "sécurité émotionnelle", "bold": true}, {"text": " est ma priorité absolue "}] },
        { type: 'message', content: [{"text": "✓ Tout ce que tu partages est "}, {"text": "crypté et protégé", "bold": true}] },
        { type: 'message', content: [{"text": "✓ Jamais tes informations ne seront "}, {"text": "partagées", "bold": true}] },
        { type: 'message', content: [{"text": "✓ Seul ton accompagnant a accès à tes réponses, avec "}, {"text": "éthique et respect", "bold": true}] },
        { type: 'message', content: [{"text": "✓ Tu peux demander la "}, {"text": "suppression de tes données", "bold": true}, {"text": " à tout moment"}] },
        { type: 'narrative', content: [{"text": "Cet espace "}, {"text": "t'appartient entièrement", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Tu peux y déposer :"}] },
        { type: 'message', content: [{"text": "Tes "}, {"text": "questionnements les plus intimes", "bold": true}] },
        { type: 'message', content: [{"text": "Tes "}, {"text": "peurs les plus profondes", "bold": true}] },
        { type: 'message', content: [{"text": "Tes "}, {"text": "espoirs les plus sincères", "bold": true}] },
        { type: 'message', content: [{"text": "Tout sera accueilli avec "}, {"text": "respect et professionnalisme", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "Comment te sens-tu dans cet "}, {"text": "espace sécurisé", "bold": true}, {"text": " ?"}, {"text": "\n\n"}, {"text": "(1 = J'ai encore des réserves, 10 = Je me sens totalement en confiance)", "italic": true}] },
        { type: 'rating', variable: 'niveau_de_securite_ressenti', max: 10, leftLabel: "Réserves", rightLabel: "Confiance" },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Validation sécurité" },

        { type: 'narrative', content: [{"text": "Merci pour ta réponse."}, {"text": "\n\n"}, {"text": "Quel que soit ton niveau de confort actuel, nous avancerons toujours "}, {"text": "à ton rythme", "bold": true}, {"text": "."}] },
        { type: 'message', content: [{"text": "Ta "}, {"text": "sécurité émotionnelle", "bold": true}, {"text": " reste ma priorité absolue."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "explorer_la_sincerite", "label": "Explorer la sincérité →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "La sincérité" },

        { type: 'message', content: [{"text": "💡 J'aimerais maintenant te parler de l'importance de la "}, {"text": "sincérité", "bold": true}, {"text": "."}] },
        { type: 'message', content: [{"text": "Tu sais, plus tu seras "}, {"text": "authentique", "bold": true}, {"text": " dans tes réponses, plus ta cartographie sera précise et transformatrice."}] },
        { type: 'message', content: [{"text": "L'honnêteté avec soi-même est le "}, {"text": "premier pas vers la liberté intérieure", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "À quel point te sens-tu capable d'être "}, {"text": "authentique", "bold": true}, {"text": " aujourd'hui ?"}, {"text": "\n\n"}, {"text": "(1 = C'est encore difficile, 10 = Je peux tout dire)", "italic": true}] },
        { type: 'rating', variable: 'niveau_de_sincerite', max: 10, leftLabel: "Difficile", rightLabel: "Tout dire" },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Validation sincérité" },

        { type: 'message', content: [{"text": "Merci pour cette "}, {"text": "transparence", "bold": true}, {"text": "."}] },
        { type: 'message', content: [{"text": "Peu importe ton niveau actuel, le fait d'être ici témoigne déjà d'un "}, {"text": "courage remarquable", "bold": true}, {"text": "."}] },
        { type: 'message', content: [{"text": "L'authenticité est un "}, {"text": "muscle", "bold": true}, {"text": " qui se développe avec la pratique."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "connecter_avec_mon_corps", "label": "Connecter avec mon corps →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Connexion corporelle" },

        { type: 'image', url: "https://images.unsplash.com/photo-1545205597-3d9d02c29597", alt: "" },
        { type: 'message', content: [{"text": "🧘‍♀️ Avant d'aller plus loin, j'aimerais que nous prenions contact avec "}, {"text": "ton corps", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "C'est une étape importante que beaucoup négligent."}, {"text": "\n\n"}, {"text": "Ton corps porte la "}, {"text": "sagesse de ton histoire", "bold": true}, {"text": "."}] },
        { type: 'message', content: [{"text": "Quand tu penses à ce voyage de transformation, que se passe-t-il dans "}, {"text": "ton corps", "bold": true}, {"text": " ?"}] },
        { type: 'message', content: "Ferme les yeux un instant...\n\nQue ressens-tu ? Des papillons ? Une tension ? Une ouverture ?" },
        { type: 'message', content: [{"text": "💡 "}, {"text": "Note : Si c'est difficile de connecter avec ton corps, c'est normal. Beaucoup d'entre nous ont appris à se déconnecter pour survivre. Commence par ce que tu remarques, même si c'est juste \"je ne sens rien de particulier\".", "italic": true}] },
        { type: 'narrative', content: [{"text": "💬 Exprime-toi librement (audio ou écrit, comme tu préfères) ", "italic": true}, {"text": "\n\n"}, {"text": "✨ Plus tu partages, plus ta cartographie sera précise insha'Allah ", "italic": true}, {"text": "\n\n"}, {"text": "🎤 Audio uniquement sur WhatsApp !", "italic": true}, {"text": "\n\n"}, {"text": "🤍 Choisis ce qui te met le plus à l'aise", "italic": true}] },
        { type: 'text_input', variable: 'ressenti_corporel', placeholder: "Je ressens dans mon corps...", isLong: true },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Validation connexion" },

        { type: 'narrative', content: [{"text": "Cette "}, {"text": "conscience corporelle", "bold": true}, {"text": " t'accompagnera tout au long du voyage."}, {"text": "\n\n"}, {"text": "C'est un précieux allié."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "celebrer_mon_avancee", "label": "Célébrer mon avancée →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Félicitations" },

        { type: 'message', content: [{"text": "✨ "}, {"text": "Félicitations", "bold": true}, {"text": ", tu viens d'accomplir la première étape !"}] },
        { type: 'message', content: [{"text": "Regarde ce que tu as déjà posé comme "}, {"text": "fondations solides", "bold": true}, {"text": " :"}] },
        { type: 'message', content: [{"text": "✓ Ton "}, {"text": "intention", "bold": true}, {"text": " est claire et bénie"}] },
        { type: 'message', content: [{"text": "✓ Ton "}, {"text": "espace sécurisé", "bold": true}, {"text": " est établi"}] },
        { type: 'message', content: [{"text": "✓ Notre "}, {"text": "alliance de travail", "bold": true}, {"text": " est scellée"}] },
        { type: 'message', content: [{"text": "✓ Tu as pris contact avec ton "}, {"text": "ressenti corporel", "bold": true}] },
        { type: 'message', content: [{"text": "💾 Tout est "}, {"text": "sauvegardé automatiquement", "bold": true}, {"text": "."}] },
        { type: 'message', content: "📍 Voici où tu en es maintenant :" },
        { type: 'narrative', content: [{"text": "Tu viens de créer ton "}, {"text": "espace sacré", "bold": true}, {"text": " et de poser tes fondations."}, {"text": "\n\n"}, {"text": "C'est une belle réussite."}] },
        { type: 'message', content: [{"text": "Le prochain formulaire explorera "}, {"text": "qui tu es vraiment", "bold": true}, {"text": " aujourd'hui."}] },
        { type: 'message', content: [{"text": "Tu peux maintenant continuer vers le "}, {"text": "Formulaire 1.2", "bold": true}, {"text": " où nous explorerons ensemble ta situation actuelle et tes ressentis profonds."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "aller_au_formulaire_1_2", "label": "Aller au Formulaire 1.2 →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Fin" },

        { type: 'narrative', content: " 🌿 Félicitations ! Tu viens de terminer le formulaire 1/6 de la Phase de Germination. \n\nTu as posé les fondations de ton voyage intérieur avec courage et authenticité. 📍 \n\nProgression : [■□□□□□] 1/6 \n\nN'oublie pas de poursuivre avec le Formulaire 1.2 pour approfondir ta cartographie émotionnelle.\n\n La suite t'attend quand tu seras prête... 🌸 " },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Accueil sacré" },

        { type: 'image', url: "https://images.unsplash.com/photo-1747767763480-a5b4c7a82aef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NTI4Mjk4MDN8&ixlib=rb-4.1.0&q=80&w=1080", alt: "" },
        { type: 'message', content: [{"text": "⚠️ Important - Avant de commencer ce formulaire", "bold": true}] },
        { type: 'narrative', content: [{"text": "Ce message apparaîtra", "bold": true}, {"text": " au début de chaque formulaire "}, {"text": "pour t'accompagner", "bold": true}, {"text": " tout au long de ton parcours."}] },
        { type: 'narrative', content: [{"text": "🔄 "}, {"text": "Si tu reviens sur le formulaire ou tu as rencontré un bug ?", "bold": true}, {"text": "\n\n"}, {"text": "Tes réponses "}, {"text": "sont enregistrées", "bold": true}, {"text": " au fur et à mesure."}] },
        { type: 'message', content: [{"text": "Pour des raisons de sécurité et de confidentialité de tes données", "bold": true}, {"text": ", nous ne sauvegardons pas automatiquement une session de reprise. "}] },
        { type: 'message', content: [{"text": "Voici comment reprendre facilement : ", "bold": true}] },
        { type: 'narrative', content: [{"text": "Voici comment reprendre simplement :", "bold": true}, {"text": "\n\n"}, {"text": "1️⃣ "}, {"text": "Rafraîchis la page", "bold": true}, {"text": " (recharge le formulaire)"}, {"text": "\n\n"}, {"text": "2️⃣ "}, {"text": "Pour les questions à choix multiples/unique", "bold": true}, {"text": " → Re-sélectionne les mêmes réponses"}, {"text": "\n\n"}, {"text": "3️⃣ "}, {"text": "Pour ton email et téléphone", "bold": true}, {"text": " → Re-saisis les mêmes informations (pour qu'on sache que c'est toi)"}, {"text": "\n\n"}, {"text": "4️⃣ "}, {"text": "Pour les questions écrites", "bold": true}, {"text": " → Écris simplement \"Déjà répondu\" et passe à la suivante"}, {"text": "\n\n"}, {"text": "5️⃣ "}, {"text": "Continue", "bold": true}, {"text": " jusqu'à retrouver où tu t'étais arrêtée ! 😊"}] },
        { type: 'choice', variable: 'choix', options: [{"id": "j_ai_compris", "label": "J'ai compris"}] },
        { type: 'message', content: [{"text": "Commençons !", "bold": true, "italic": true}] },
        { type: 'message', content: [{"text": "Formulaire 1.1 : L'Espace Sacré", "bold": true, "italic": true}] },
        { type: 'message', content: [{"text": "📍 "}, {"text": "Bienvenue dans cet espace", "bold": true}, {"text": " qui t'est entièrement dédié."}] },
        { type: 'message', content: [{"text": "💫 Avant de commencer, j'aimerais que tu prennes un instant pour "}, {"text": "respirer profondément", "bold": true}, {"text": "..."}] },
        { type: 'narrative', content: [{"text": "Voilà.", "italic": true}, {"text": "\n\n"}, {"text": "Ta présence ici témoigne d'une "}, {"text": "décision importante", "bold": true}, {"text": " : tu as choisi de comprendre."}] },
        { type: 'message', content: [{"text": "C'est un "}, {"text": "acte de courage", "bold": true}, {"text": " que j'honore profondément."}] },
        { type: 'narrative', content: [{"text": "Je veux que tu saches que ce voyage de transformation demande "}, {"text": "du temps et de la profondeur", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Ta confiance marque le début d'un travail sérieux que je prends vraiment à cœur."}] },
        { type: 'message', content: [{"text": "Ce processus a été créé avec soin pour des "}, {"text": "femmes courageuses", "bold": true}, {"text": " comme toi, qui souhaitent explorer leur monde intérieur avec méthode et bienveillance."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "je_suis_prete", "label": "Je suis prête →"}] },

        { type: 'completion', title: "Félicitations !", message: "Tu as terminé F1.1 — L'Espace Sacré. Tes réponses ont été sauvegardées.", icon: '🌱' }
    ]
};

/* ─── Form Registry ─── */
if (typeof window.FORM_REGISTRY === 'undefined') window.FORM_REGISTRY = {};
window.FORM_REGISTRY['f1-1-espace-sacre'] = F1_1_ESPACE_SACRE;
