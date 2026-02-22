/* ═══════════════════════════════════════
   F3.2 — Les Saisons Amoureuses
   Converti depuis Typebot · 137 steps · 13 variables
═══════════════════════════════════════ */

const F3_2_SAISONS = {
    id: 'f3_2_saisons',
    version: 1,
    title: "F3.2 — Les Saisons Amoureuses",
    icon: '🌸',
    checkboxId: 'f3_2',
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
        "declencheurs_passage_automne",
        "description_ete_relationnel",
        "duree_des_cycles_relationnels",
        "espoirs_secrets_du_printemps",
        "exemple_concret_automne",
        "forces_relationnelles_naturelles",
        "intention_nouveau_cycle",
        "localisation_corporelle_des_saisons",
        "patterns_d_idealisation",
        "patterns_de_fin_de_relation",
        "patterns_de_reaction_automne",
        "sagesse_acquise_des_hivers",
        "telephone"
],

    steps: [

        /* ════════════════════════════════════ */
        { type: 'section', title: "Ouverture Sacrée" },

        { type: 'image', url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e", alt: "" },
        { type: 'narrative', content: [{"text": "🌳 L'Arbre des Saisons Amoureuses 🌳", "bold": true, "italic": true}, {"text": "\n\n"}, {"text": "Formulaire 3.2 : "}, {"text": "Cycles & Patterns Relationnels", "bold": true}] },
        { type: 'narrative', content: [{"text": "Bienvenue dans cette exploration."}, {"text": "\n\n"}, {"text": "Tu viens d'entrer dans l'un des territoires les plus "}, {"text": "révélateurs", "bold": true}, {"text": " de ton voyage intérieur."}] },
        { type: 'message', content: "Avant de continuer, rappelle-moi tes coordonnées :" },
        { type: 'message', content: "Ton prénom ?" },
        { type: 'text_input', variable: 'reponse', placeholder: "Ton prénom..." },
        { type: 'message', content: "Ton email ?" },
        { type: 'email_input', variable: 'email', placeholder: "ton.email@exemple.com" },
        { type: 'message', content: "Ton téléphone ?" },
        { type: 'phone_input', variable: 'telephone', placeholder: "06 12 34 56 78", defaultPrefix: '+33' },
        { type: 'message', content: [{"text": "🕊️ "}, {"text": "Bismillah ar-Rahman ar-Rahim", "italic": true}] },
        { type: 'narrative', content: [{"text": "Prenons d'abord un moment pour "}, {"text": "nous centrer ensemble", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Inspire profondément... "}, {"text": "1... 2... 3... 4...", "italic": true}, {"text": "\n\n"}, {"text": "Retiens... "}, {"text": "1... 2... 3... 4...", "italic": true}, {"text": "\n\n"}, {"text": "Expire lentement... "}, {"text": "1... 2... 3... 4... 5... 6...", "italic": true}] },
        { type: 'narrative', content: [{"text": "🌳 "}, {"text": "Imagine un arbre majestueux...", "bold": true}, {"text": "\n\n"}, {"text": "Depuis des décennies, il traverse les saisons. Printemps éclatant, été généreux, automne doré, hiver rigoureux..."}, {"text": "\n\n"}, {"text": "Chaque cycle l'enrichit. Chaque saison révèle une facette de sa "}, {"text": "sagesse profonde", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Tes relations aussi suivent ces cycles. Et comme l'arbre, tu peux apprendre à "}, {"text": "danser avec les saisons", "italic": true}, {"text": " plutôt que de les subir."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "explorons_mes_saisons_amoure", "label": "🌱 Explorons mes saisons amoureuses →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Contexte Neuroscientifique" },

        { type: 'message', content: [{"text": "💡 "}, {"text": "Révélation Neuroscientifique", "bold": true}] },
        { type: 'narrative', content: [{"text": "Les neurosciences nous révèlent quelque chose de fascinant :"}, {"text": "\n\n"}, {"text": "Nos patterns relationnels se gravent dans nos circuits neuronaux dès l'âge de "}, {"text": "3-4 ans", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Ces \""}, {"text": "autoroutes neuronales", "italic": true}, {"text": "\" dictent "}, {"text": "85% de nos réactions", "bold": true}, {"text": " en amour."}] },
        { type: 'narrative', content: [{"text": "🌟 "}, {"text": "La bonne nouvelle ?", "bold": true}, {"text": "\n\n"}, {"text": "Grâce à la "}, {"text": "neuroplasticité", "bold": true}, {"text": ", ton cerveau peut créer de nouveaux chemins à tout âge."}, {"text": "\n\n"}, {"text": "Identifier tes cycles, c'est le "}, {"text": "premier pas", "bold": true}, {"text": " pour les transformer."}] },
        { type: 'narrative', content: [{"text": "💕 "}, {"text": "Tu n'es pas seule", "bold": true}, {"text": "\n\n"}, {"text": "97% des femmes répètent des patterns relationnels inconscients."}, {"text": "\n\n"}, {"text": "C'est "}, {"text": "humain", "bold": true}, {"text": ", c'est "}, {"text": "normal", "bold": true}, {"text": ", et surtout... c'est "}, {"text": "transformable", "bold": true}, {"text": "."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "creer_un_espace_securise", "label": "🛡️ Créer un espace sécurisé →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Préparation Émotionnelle" },

        { type: 'image', url: "https://images.unsplash.com/photo-1502462041640-b3d7e50d0662?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHNlYXJjaHw5fHxjYWYlQzMlQTl8ZW58MHwwfHx8MTc1NjkwNzgxNXww&ixlib=rb-4.1.0&q=80&w=1080", alt: "" },
        { type: 'narrative', content: [{"text": "Avant d'explorer tes cycles profonds, vérifions que tu es dans les "}, {"text": "meilleures conditions", "bold": true}, {"text": " :"}, {"text": "\n\n"}, {"text": "• Es-tu dans un lieu "}, {"text": "privé et tranquille", "italic": true}, {"text": " ?"}, {"text": "\n\n"}, {"text": "• As-tu au moins "}, {"text": "20 minutes", "italic": true}, {"text": " devant toi ?"}, {"text": "\n\n"}, {"text": "• Te sens-tu "}, {"text": "émotionnellement disponible", "italic": true}, {"text": " ?"}] },
        { type: 'narrative', content: [{"text": "🤝 "}, {"text": "Notre alliance thérapeutique", "bold": true}, {"text": "\n\n"}, {"text": "Je suis ici pour t'accompagner avec "}, {"text": "bienveillance", "bold": true}, {"text": " et "}, {"text": "respect", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Aucune révélation ne sera jugée. Chaque prise de conscience est un "}, {"text": "cadeau", "bold": true}, {"text": " que tu t'offres."}] },
        { type: 'narrative', content: [{"text": "✨ "}, {"text": "Tes droits fondamentaux", "bold": true}, {"text": "\n\n"}, {"text": "• Tu as le droit de "}, {"text": "ressentir", "bold": true}, {"text": " toutes tes émotions"}, {"text": "\n\n"}, {"text": "• Tu as le droit de "}, {"text": "prendre ton temps", "bold": true}, {"text": "\n\n"}, {"text": "• Tu as le droit de faire des "}, {"text": "pauses", "bold": true}, {"text": " si nécessaire"}, {"text": "\n\n"}, {"text": "• Tu as le droit d'être "}, {"text": "imparfaite", "bold": true}, {"text": " dans tes réponses"}] },
        { type: 'narrative', content: [{"text": "🌸 "}, {"text": "Permission de ressentir", "bold": true}, {"text": "\n\n"}, {"text": "Cette exploration peut réveiller des émotions enfouies."}, {"text": "\n\n"}, {"text": "C'est "}, {"text": "normal", "bold": true}, {"text": ", c'est "}, {"text": "sain", "bold": true}, {"text": ", et c'est le signe que ton coeur "}, {"text": "ressent", "bold": true}, {"text": "."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "entrer_dans_mon_printemps_am", "label": "🌸 Entrer dans mon printemps amoureux →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Printemps Amoureux - Introduction" },

        { type: 'image', url: "https://images.unsplash.com/photo-1556066138-cfac27159329?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHNlYXJjaHwyMXx8cHJpbnRlbXBzfGVufDB8MHx8fDE3NTY5MDc5OTh8MA&ixlib=rb-4.1.0&q=80&w=1080", alt: "" },
        { type: 'narrative', content: [{"text": "🌸 "}, {"text": "PRINTEMPS AMOUREUX", "bold": true, "italic": true}, {"text": "\n\n"}, {"text": "La saison de l'espoir et des promesses"}] },
        { type: 'message', content: [{"text": "\"Comme les fleurs de cerisier qui éclosent dans un souffle de vent tiède, tes débuts amoureux portent en eux toute la magie du possible...\"", "italic": true}] },
        { type: 'narrative', content: [{"text": "💡 "}, {"text": "La science du printemps amoureux", "bold": true}, {"text": "\n\n"}, {"text": "Les neurosciences appellent cette phase "}, {"text": "\"l'état de limerence\"", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Ton cerveau produit un cocktail de "}, {"text": "dopamine, noradrénaline et sérotonine", "italic": true}, {"text": " qui crée cette sensation d'euphorie."}, {"text": "\n\n"}, {"text": "Comprendre "}, {"text": "comment", "italic": true}, {"text": " tu vis tes printemps révèle tes patterns les plus profonds."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "explorer_mes_espoirs_de_prin", "label": "🌱 Explorer mes espoirs de printemps →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Printemps - Espoirs et Attentes" },

        { type: 'message', content: [{"text": "🌱 "}, {"text": "Les graines de tes espoirs", "bold": true}] },
        { type: 'narrative', content: [{"text": "Comme l'arbre qui sent monter la sève du renouveau, tu portes en toi des espoirs qui renaissent à chaque nouvelle rencontre..."}, {"text": "\n\n"}, {"text": "Explorons ensemble ces "}, {"text": "graines d'espoir", "bold": true}, {"text": " que tu sèmes au début de chaque relation."}] },
        { type: 'message', content: [{"text": "Au début d'une nouvelle relation, quels sont les "}, {"text": "espoirs secrets", "bold": true}, {"text": " qui fleurissent dans ton cœur ?"}] },
        { type: 'text_input', variable: 'espoirs_secrets_du_printemps', placeholder: "Au printemps de mes amours, j'espère secrètement que...", isLong: true },
        { type: 'narrative', content: [{"text": "✨ Merci pour cette vulnérabilité."}, {"text": "\n\n"}, {"text": "Ces espoirs sont "}, {"text": "précieux", "bold": true}, {"text": ". Ils révèlent les besoins les plus profonds de ton âme."}, {"text": "\n\n"}, {"text": "Il n'y a rien de \"trop\" dans tes attentes. Tu as le droit de "}, {"text": "rêver grand", "bold": true}, {"text": "."}] },
        { type: 'message', content: [{"text": "🔮 "}, {"text": "Tes patterns d'idéalisation", "bold": true}] },
        { type: 'narrative', content: [{"text": "💡 "}, {"text": "Révélation importante :", "bold": true}, {"text": "\n\n"}, {"text": "L'idéalisation n'est pas un défaut. C'est un "}, {"text": "mécanisme protecteur", "bold": true}, {"text": " qui t'aide à créer du lien."}, {"text": "\n\n"}, {"text": "Mais comprendre "}, {"text": "comment", "italic": true}, {"text": " tu idéalises t'aidera à vivre des relations plus "}, {"text": "équilibrées", "bold": true}, {"text": "."}] },
        { type: 'message', content: [{"text": "Dans tes printemps amoureux, comment as-tu tendance à "}, {"text": "idéaliser", "bold": true}, {"text": " la personne qui te plaît ?"}] },
        { type: 'choice', variable: 'patterns_d_idealisation', multiple: true, options: [{"id": "je_le_la_vois_parfait_e_sa", "label": "🌟 Je le/la vois parfait(e), sans défaut"}, {"id": "je_projette_qu_il_elle_va_me", "label": "🦸 Je projette qu'il/elle va me sauver de ma solitude"}, {"id": "je_suis_convaincue_que_c_est", "label": "💕 Je suis convaincue que c'est \"le/la bon(ne)\""}, {"id": "je_vois_son_potentiel_plus_q", "label": "🌱 Je vois son potentiel plus que sa réalité"}, {"id": "je_cree_un_conte_de_fees_dan", "label": "🏰 Je crée un conte de fées dans ma tête"}, {"id": "je_pense_qu_il_elle_va_me_co", "label": "🧩 Je pense qu'il/elle va me compléter"}, {"id": "j_imagine_que_l_amour_nous_t", "label": "🦋 J'imagine que l'amour nous transformera"}, {"id": "je_le_la_vois_comme_un_refu", "label": "🛡️ Je le/la vois comme un refuge sûr"}, {"id": "j_idealise_peu_je_reste_rea", "label": "🎯 J'idéalise peu, je reste réaliste"}] },
        { type: 'choice', variable: 'choix', options: [{"id": "passer_a_mon_ete_relationne", "label": "☀️ Passer à mon été relationnel →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Été Relationnel - Introduction" },

        { type: 'image', url: "https://images.unsplash.com/uploads/14121010130570e22bcdf/e1730efe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHNlYXJjaHwxMnx8JUMzJUE5dCVDMyVBOXxlbnwwfDB8fHwxNzU2OTA3OTgzfDA&ixlib=rb-4.1.0&q=80&w=1080", alt: "" },
        { type: 'narrative', content: [{"text": "☀️ "}, {"text": "ÉTÉ RELATIONNEL", "bold": true, "italic": true}, {"text": "\n\n"}, {"text": "La saison de la plénitude et de l'épanouissement"}] },
        { type: 'message', content: [{"text": "\"Comme l'arbre en pleine floraison qui donne le meilleur de lui-même, ton été relationnel révèle ta capacité d'aimer et d'être aimée...\"", "italic": true}] },
        { type: 'narrative', content: [{"text": "🌟 "}, {"text": "C'est l'heure de célébrer tes forces !", "bold": true}, {"text": "\n\n"}, {"text": "Trop souvent, nous nous concentrons sur ce qui ne va pas. Mais ton été relationnel révèle tes "}, {"text": "talents d'amoureuse", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Ces moments de plénitude ne sont pas des accidents. Ils révèlent qui tu es "}, {"text": "vraiment", "bold": true}, {"text": " quand tu t'autorises à aimer."}] },
        { type: 'narrative', content: [{"text": "💡 "}, {"text": "La neuroscience du bonheur amoureux", "bold": true}, {"text": "\n\n"}, {"text": "Dans tes étés relationnels, ton cerveau active les "}, {"text": "circuits de l'ocytocine", "italic": true}, {"text": " (hormone de l'attachement) et des "}, {"text": "endorphines", "italic": true}, {"text": " (hormones du bien-être)."}, {"text": "\n\n"}, {"text": "Ces moments de bonheur "}, {"text": "recâblent ton cerveau", "bold": true}, {"text": " vers le positif. Ils créent un "}, {"text": "nouveau standard", "italic": true}, {"text": " de ce que tu mérites."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "celebrer_mes_moments_de_plen", "label": "🌻 Célébrer mes moments de plénitude →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Été - Moments de Plénitude" },

        { type: 'message', content: [{"text": "🌻 "}, {"text": "Tes moments de pure magie relationnelle", "bold": true}] },
        { type: 'narrative', content: [{"text": "Ferme les yeux un instant et replonge dans tes plus beaux souvenirs amoureux..."}, {"text": "\n\n"}, {"text": "Ces moments où tout semblait "}, {"text": "parfaitement aligné", "bold": true}, {"text": ". Où l'amour coulait naturellement, comme une rivière tranquille..."}] },
        { type: 'message', content: [{"text": "Décris-moi un de tes plus beaux "}, {"text": "étés relationnels", "bold": true}, {"text": ". Qu'est-ce qui rendait cette période si spéciale ?"}] },
        { type: 'text_input', variable: 'description_ete_relationnel', placeholder: "Mon plus bel été relationnel, c'était quand...", isLong: true },
        { type: 'narrative', content: [{"text": "✨ "}, {"text": "Quelle merveille !", "bold": true}, {"text": "\n\n"}, {"text": "Ce que tu viens de décrire n'est pas un hasard. C'est la révélation de tes "}, {"text": "talents relationnels", "bold": true}, {"text": " authentiques."}, {"text": "\n\n"}, {"text": "Cette version de toi existe. Elle est "}, {"text": "réelle", "bold": true}, {"text": ". Elle peut revivre."}] },
        { type: 'message', content: [{"text": "💎 "}, {"text": "Tes super-pouvoirs relationnels", "bold": true}] },
        { type: 'message', content: [{"text": "Dans tes plus belles relations, quelles sont tes "}, {"text": "forces naturelles", "bold": true}, {"text": " qui se révèlent ?"}] },
        { type: 'choice', variable: 'forces_relationnelles_naturelles', multiple: true, options: [{"id": "je_sais_ecouter_profondement", "label": "💕 Je sais écouter profondément"}, {"id": "j_apporte_douceur_et_tendres", "label": "🌸 J'apporte douceur et tendresse"}, {"id": "je_suis_d_une_loyaute_a_tou", "label": "🛡️ Je suis d'une loyauté à toute épreuve"}, {"id": "j_apporte_joie_et_spontaneit", "label": "🎉 J'apporte joie et spontanéité"}, {"id": "je_nourris_les_conversations", "label": "🌊 Je nourris les conversations profondes"}, {"id": "j_aide_l_autre_a_guerir_ses", "label": "🌿 J'aide l'autre à guérir ses blessures"}, {"id": "j_apporte_creativite_et_fant", "label": "🎨 J'apporte créativité et fantaisie"}, {"id": "je_suis_un_pilier_solide_et", "label": "🏔️ Je suis un pilier solide et rassurant"}, {"id": "j_inspire_l_autre_a_grandir", "label": "⭐ J'inspire l'autre à grandir"}, {"id": "j_encourage_l_authenticite", "label": "🗝️ J'encourage l'authenticité"}, {"id": "j_apporte_sagesse_et_perspec", "label": "🦉 J'apporte sagesse et perspective"}, {"id": "je_vis_l_amour_avec_intensit", "label": "🔥 Je vis l'amour avec intensité"}] },
        { type: 'choice', variable: 'choix', options: [{"id": "explorer_mon_automne_relatio", "label": "🍂 Explorer mon automne relationnel →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Automne Relationnel - Introduction" },

        { type: 'image', url: "https://images.unsplash.com/photo-1507100403890-47482dcd79e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHNlYXJjaHwxNHx8YXV0b21uZXxlbnwwfDB8fHwxNzU2OTA4NzA4fDA&ixlib=rb-4.1.0&q=80&w=1080", alt: "" },
        { type: 'narrative', content: [{"text": "🍂 "}, {"text": "AUTOMNE RELATIONNEL", "bold": true, "italic": true}, {"text": "\n\n"}, {"text": "La saison des premières tempêtes et des transformations"}] },
        { type: 'message', content: [{"text": "\"Comme les feuilles dorées qui dansent dans le vent avant de se transformer, tes automnes relationnels révèlent ta sagesse face aux défis...\"", "italic": true}] },
        { type: 'narrative', content: [{"text": "💕 "}, {"text": "L'automne fait partie du cycle naturel", "bold": true}, {"text": "\n\n"}, {"text": "Beaucoup de femmes se culpabilisent quand arrivent les premières difficultés."}, {"text": "\n\n"}, {"text": "Mais l'automne n'est pas un échec. C'est un "}, {"text": "test de maturité", "bold": true}, {"text": " relationnelle. C'est là que se révèlent tes "}, {"text": "ressources profondes", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "💡 "}, {"text": "La neuroscience de l'adaptation", "bold": true}, {"text": "\n\n"}, {"text": "Quand arrivent les défis, ton système nerveux active le "}, {"text": "mode survie", "italic": true}, {"text": ". C'est normal et protecteur."}, {"text": "\n\n"}, {"text": "Comprendre "}, {"text": "comment", "italic": true}, {"text": " tu réagis aux premiers défis révèle tes patterns de "}, {"text": "résilience", "bold": true}, {"text": " ou de "}, {"text": "sabotage", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "🛡️ "}, {"text": "Permission d'explorer sans jugement", "bold": true}, {"text": "\n\n"}, {"text": "Nous allons explorer des moments difficiles. C'est "}, {"text": "courageux", "bold": true}, {"text": " de ta part."}, {"text": "\n\n"}, {"text": "Rappelle-toi : tu n'es pas tes réactions passées. Tu es celle qui "}, {"text": "apprend", "bold": true}, {"text": " et qui "}, {"text": "évolue", "bold": true}, {"text": "."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "explorer_mes_patterns_de_de", "label": "🌪️ Explorer mes patterns de défis →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Automne - Patterns de Réaction" },

        { type: 'message', content: [{"text": "🌪️ "}, {"text": "Tes patterns face aux premières tempêtes", "bold": true}] },
        { type: 'message', content: "Comme l'arbre face au vent d'automne, chacune développe ses stratégies pour traverser les difficultés...\n\nCertaines plient sans rompre. D'autres résistent. D'autres encore perdent leurs feuilles pour mieux renaître..." },
        { type: 'message', content: [{"text": "⚡ "}, {"text": "Tes déclencheurs d'automne", "bold": true}] },
        { type: 'message', content: "Qu'est-ce qui marque généralement le passage de ton été vers ton automne relationnel ?" },
        { type: 'choice', variable: 'declencheurs_passage_automne', multiple: true, options: [{"id": "l_installation_dans_la_routi", "label": "📅 L'installation dans la routine"}, {"id": "la_decouverte_des_premiers_d", "label": "🔍 La découverte des premiers défauts"}, {"id": "la_deception_des_attentes_no", "label": "💔 La déception des attentes non comblées"}, {"id": "une_prise_de_distance_de_sa", "label": "📱 Une prise de distance de sa part"}, {"id": "les_premieres_questions_d_en", "label": "💍 Les premières questions d'engagement"}, {"id": "les_premiers_vrais_desaccor", "label": "⚔️ Les premiers vrais désaccords"}, {"id": "l_introduction_dans_le", "label": "👨‍👩‍👧‍👦 L'introduction dans les cercles familiaux"}, {"id": "les_premiers_moments_de_jalo", "label": "💚 Les premiers moments de jalousie"}, {"id": "l_adaptation_au_quotidien_pa", "label": "🏠 L'adaptation au quotidien partagé"}, {"id": "les_desaccords_sur_les_proje", "label": "🎯 Les désaccords sur les projets futurs"}] },
        { type: 'message', content: [{"text": "🔄 "}, {"text": "Tes patterns de réaction automatiques", "bold": true}] },
        { type: 'message', content: "Quand l'automne relationnel arrive, comment réagis-tu instinctivement ?" },
        { type: 'choice', variable: 'patterns_de_reaction_automne', multiple: true, options: [{"id": "je_fuis_ou_prends_mes_dis", "label": "🏃‍♀️ Je fuis ou prends mes distances"}, {"id": "j_essaie_de_tout_controler", "label": "🎛️ J'essaie de tout contrôler"}, {"id": "je_deviens_parfaite_pour_evi", "label": "⭐ Je deviens parfaite pour éviter les conflits"}, {"id": "je_deviens_critique_et_point", "label": "🔍 Je deviens critique et pointilleuse"}, {"id": "je_me_sacrifie_pour_sauver_l", "label": "💝 Je me sacrifie pour sauver la relation"}, {"id": "je_me_ferme_emotionnellement", "label": "🚪 Je me ferme émotionnellement"}, {"id": "je_sabote_inconsciemment", "label": "💥 Je sabote inconsciemment"}, {"id": "je_me_bats_pour_faire_durer", "label": "⚔️ Je me bats pour faire durer"}, {"id": "je_m_adapte_en_perdant_mon_a", "label": "🦎 Je m'adapte en perdant mon authenticité"}, {"id": "je_communique_ouvertement_m", "label": "🗣️ Je communique ouvertement mes besoins"}] },
        { type: 'message', content: [{"text": "📖 "}, {"text": "Un exemple concret de ton automne", "bold": true}] },
        { type: 'message', content: "Raconte-moi un automne relationnel marquant. Qu'est-ce qui s'est passé ? Comment as-tu réagi ?" },
        { type: 'text_input', variable: 'exemple_concret_automne', placeholder: "Je me souviens d'un automne relationnel où...", isLong: true },
        { type: 'narrative', content: [{"text": "🌸 Merci pour ce partage si "}, {"text": "authentique", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Revisiter ces moments demande du courage. Tu es en train de "}, {"text": "reprendre ton pouvoir", "bold": true}, {"text": " sur tes patterns."}, {"text": "\n\n"}, {"text": "Ces réactions étaient des "}, {"text": "stratégies de survie", "bold": true}, {"text": ". Elles ont eu leur utilité. Maintenant, tu peux choisir de nouvelles réponses."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "explorer_mon_hiver_transfor", "label": "❄️ Explorer mon hiver transformateur →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Hiver Transformateur - Introduction" },

        { type: 'image', url: "https://images.unsplash.com/photo-1457269449834-928af64c684d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHNlYXJjaHwxfHxoaXZlcnxlbnwwfDB8fHwxNzU2OTA4MTU3fDA&ixlib=rb-4.1.0&q=80&w=1080", alt: "" },
        { type: 'narrative', content: [{"text": "❄️ "}, {"text": "HIVER TRANSFORMATEUR", "bold": true, "italic": true}, {"text": "\n\n"}, {"text": "La saison des fins qui préparent les renouvaux"}] },
        { type: 'message', content: [{"text": "\"Comme l'arbre nu qui révèle sa structure essentielle, tes hivers relationnels dévoilent ta force authentique et ta sagesse acquise...\"", "italic": true}] },
        { type: 'narrative', content: [{"text": "🕊️ "}, {"text": "Honorons tes deuils amoureux", "bold": true}, {"text": "\n\n"}, {"text": "L'hiver relationnel n'est pas une saison d'échec. C'est une saison de "}, {"text": "transformation profonde", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Chaque fin porte en elle les graines du renouveau. Chaque deuil fait naître une "}, {"text": "nouvelle sagesse", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "💡 "}, {"text": "La neuroscience de la résilience", "bold": true}, {"text": "\n\n"}, {"text": "Les ruptures activent les mêmes zones cérébrales que la "}, {"text": "douleur physique", "italic": true}, {"text": ". C'est pourquoi \"ça fait si mal\"."}, {"text": "\n\n"}, {"text": "Mais cette douleur reconstruit aussi ton cerveau. Elle renforce tes circuits de "}, {"text": "résilience", "bold": true}, {"text": " et d'"}, {"text": "adaptation", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "🌸 "}, {"text": "Permission de ressentir pleinement", "bold": true}, {"text": "\n\n"}, {"text": "Nous allons explorer des territoires sensibles. Si des émotions remontent, c'est "}, {"text": "parfait", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Tes larmes, ta colère, ta tristesse... tout cela fait partie de ton processus de "}, {"text": "libération", "bold": true}, {"text": "."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "explorer_mes_patterns_de_fin", "label": "🍃 Explorer mes patterns de fin →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Hiver - Patterns de Fin" },

        { type: 'message', content: [{"text": "🍃 "}, {"text": "Tes patterns de fin et de transformation", "bold": true}] },
        { type: 'message', content: "Comme les feuilles qui tombent selon leur propre rythme, chacune vit ses fins de manière unique...\n\nCertaines s'accrochent jusqu'au bout. D'autres lâchent prise avant même l'automne. D'autres encore dansent avec le vent du changement..." },
        { type: 'message', content: [{"text": "🔚 "}, {"text": "Comment se terminent tes relations ?", "bold": true}] },
        { type: 'message', content: "Observe tes patterns de fin. Comment tes relations se terminent-elles généralement ?" },
        { type: 'choice', variable: 'patterns_de_fin_de_relation', multiple: true, options: [{"id": "c_est_moi_qui_pars_genera", "label": "🏃‍♀️ C'est moi qui pars généralement"}, {"id": "on_me_quitte_plus_souvent", "label": "💔 On me quitte plus souvent"}, {"id": "c_est_souvent_mutuel_et_apai", "label": "🤝 C'est souvent mutuel et apaisé"}, {"id": "ca_s_eteint_progressivement", "label": "🕯️ Ça s'éteint progressivement"}, {"id": "c_est_souvent_explosif_et_do", "label": "💥 C'est souvent explosif et douloureux"}, {"id": "je_sabote_inconsciemment", "label": "💣 Je sabote inconsciemment"}, {"id": "je_fuis_avant_l_engagement", "label": "🚪 Je fuis avant l'engagement"}, {"id": "je_demande_trop_ca_fait_fu", "label": "⚖️ Je demande trop, ça fait fuir"}, {"id": "nous_reproduisons_des_patter", "label": "🌀 Nous reproduisons des patterns toxiques"}, {"id": "c_est_tres_variable_selon_le", "label": "🎭 C'est très variable selon les relations"}] },
        { type: 'message', content: [{"text": "💎 "}, {"text": "La sagesse que t'ont apportée tes hivers", "bold": true}] },
        { type: 'narrative', content: [{"text": "Chaque hiver relationnel t'a appris quelque chose d'essentiel sur toi-même..."}, {"text": "\n\n"}, {"text": "Ces leçons sont tes "}, {"text": "trésors de sagesse", "bold": true}, {"text": ". Elles font de toi la femme que tu es aujourd'hui."}] },
        { type: 'message', content: [{"text": "Quelle est la plus grande "}, {"text": "sagesse", "bold": true}, {"text": " que t'ont apportée tes expériences de rupture ou de fin ?"}] },
        { type: 'text_input', variable: 'sagesse_acquise_des_hivers', placeholder: "Mes hivers relationnels m'ont appris que...", isLong: true },
        { type: 'narrative', content: [{"text": "✨ Cette sagesse que tu viens d'exprimer n'est pas venue facilement. Elle a été "}, {"text": "forgée dans l'épreuve", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Tu n'es plus la même femme qu'avant tes hivers. Tu es "}, {"text": "plus forte", "bold": true}, {"text": ", "}, {"text": "plus sage", "bold": true}, {"text": ", "}, {"text": "plus authentique", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "🌟 Bravo pour avoir transformé tes douleurs en "}, {"text": "sagesse", "bold": true}, {"text": " et tes épreuves en "}, {"text": "force", "bold": true}, {"text": "."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "cartographier_mes_cycles_com", "label": "🌳 Cartographier mes cycles complets →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Reconnaissance des Cycles Complets" },

        { type: 'image', url: "https://images.unsplash.com/photo-1682236149004-517e8a2dac24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHNlYXJjaHwxM3x8c2Fpc29uc3xlbnwwfDB8fHwxNzU2OTA4NjYzfDA&ixlib=rb-4.1.0&q=80&w=1080", alt: "" },
        { type: 'message', content: [{"text": "🌳 "}, {"text": "Cartographie de tes Saisons Relationnelles", "bold": true}] },
        { type: 'narrative', content: [{"text": "✨ "}, {"text": "Tu viens d'accomplir quelque chose de remarquable !", "bold": true}, {"text": "\n\n"}, {"text": "Tu as traversé toutes tes saisons amoureuses avec conscience et courage."}, {"text": "\n\n"}, {"text": "Peu de femmes osent regarder leurs patterns avec tant d'"}, {"text": "honnêteté", "bold": true}, {"text": " et de "}, {"text": "bienveillance", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "💡 "}, {"text": "Révélation des patterns récurrents", "bold": true}, {"text": "\n\n"}, {"text": "Maintenant que tu as exploré toutes tes saisons, des patterns émergent..."}, {"text": "\n\n"}, {"text": "Ces répétitions ne sont pas un hasard. Elles révèlent la "}, {"text": "programmation profonde", "bold": true}, {"text": " de ton système amoureux."}] },
        { type: 'narrative', content: [{"text": "⏱️ "}, {"text": "La durée de tes cycles", "bold": true}, {"text": "\n\n"}, {"text": "En général, combien de temps durent tes "}, {"text": "saisons relationnelles", "bold": true}, {"text": " ?"}] },
        { type: 'choice', variable: 'duree_des_cycles_relationnels', multiple: true, options: [{"id": "printemps_tres_court_quelqu", "label": "🌸 Printemps très court (quelques semaines)"}, {"id": "printemps_prolonge_plusieur", "label": "🌸 Printemps prolongé (plusieurs mois)"}, {"id": "ete_bref_quelques_mois_max", "label": "☀️ Été bref (quelques mois maximum)"}, {"id": "ete_prolonge_peut_durer_de", "label": "☀️ Été prolongé (peut durer des années)"}, {"id": "transition_rapide_vers_l_aut", "label": "🍂 Transition rapide vers l'automne"}, {"id": "automne_qui_s_eternise", "label": "🍂 Automne qui s'éternise"}, {"id": "hiver_bref_renaissance_rap", "label": "❄️ Hiver bref, renaissance rapide"}, {"id": "hiver_long_difficile_a_sor", "label": "❄️ Hiver long, difficile à sortir"}, {"id": "je_saute_souvent_la_phase_e", "label": "⚠️ Je saute souvent la phase été"}, {"id": "j_evite_la_phase_hiver_je", "label": "⚠️ J'évite la phase hiver (je repars avant)"}] },
        { type: 'narrative', content: [{"text": "🧠 "}, {"text": "Pourquoi ces patterns se répètent ?", "bold": true}, {"text": "\n\n"}, {"text": "Ton cerveau adore les "}, {"text": "patterns familiers", "italic": true}, {"text": ", même s'ils te font souffrir."}, {"text": "\n\n"}, {"text": "Il préfère la "}, {"text": "certitude de la souffrance connue", "bold": true}, {"text": " à l'incertitude du bonheur inconnu."}, {"text": "\n\n"}, {"text": "Mais maintenant que tu "}, {"text": "vois", "bold": true}, {"text": " tes patterns, tu peux les "}, {"text": "choisir", "bold": true}, {"text": " ou les "}, {"text": "transformer", "bold": true}, {"text": "."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "ancrer_dans_mon_corps_ces_de", "label": "🌊 Ancrer dans mon corps ces découvertes →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Intégration Somatique" },

        { type: 'image', url: "https://images.unsplash.com/photo-1505455184862-554165e5f6ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHNlYXJjaHw1fHxoYW5kfGVufDB8MHx8fDE3NTY5MDg2NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080", alt: "" },
        { type: 'message', content: [{"text": "🌊 "}, {"text": "Ancrage Corporel de tes Découvertes", "bold": true}] },
        { type: 'narrative', content: [{"text": "💡 "}, {"text": "Pourquoi ancrer dans le corps ?", "bold": true}, {"text": "\n\n"}, {"text": "Tes patterns relationnels ne vivent pas seulement dans ton mental. Ils sont "}, {"text": "inscrits dans ton corps", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Tes muscles, tes organes, ton système nerveux "}, {"text": "mémorisent", "bold": true}, {"text": " tes expériences amoureuses."}, {"text": "\n\n"}, {"text": "Pour transformer durablement tes patterns, tu dois "}, {"text": "réveiller la sagesse de ton corps", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "🧘‍♀️ "}, {"text": "Scan corporel guidé", "bold": true}, {"text": "\n\n"}, {"text": "Installe-toi confortablement. Ferme les yeux si tu peux."}, {"text": "\n\n"}, {"text": "Parcours ton corps de haut en bas :"}, {"text": "\n\n"}, {"text": "• Ta tête : ressens-tu des tensions ?"}, {"text": "\n\n"}, {"text": "• Tes épaules : portent-elles des poids ?"}, {"text": "\n\n"}, {"text": "• Ton cœur : quel rythme ? Quelle émotion ?"}, {"text": "\n\n"}, {"text": "• Ton ventre : serré ou détendu ?"}, {"text": "\n\n"}, {"text": "• Tes jambes : lourdes ou légères ?"}] },
        { type: 'message', content: [{"text": "Dans quelle partie de ton corps "}, {"text": "reconnais-tu", "bold": true}, {"text": " tes différentes saisons relationnelles ?"}] },
        { type: 'text_input', variable: 'localisation_corporelle_des_saisons', placeholder: "Mon printemps, je le sens dans... Mon été dans... Mon automne dans... Mon hiver dans...", isLong: true },
        { type: 'narrative', content: [{"text": "🌟 "}, {"text": "Briser le cycle avec compassion", "bold": true}, {"text": "\n\n"}, {"text": "Place une main sur ton cœur."}, {"text": "\n\n"}, {"text": "Répète intérieurement : "}, {"text": "\"Je reconnais mes patterns avec amour. Je choisis maintenant de nouvelles saisons. Mon cœur mérite la paix et la joie.\"", "italic": true}] },
        { type: 'narrative', content: [{"text": "✨ "}, {"text": "Ton intention pour ton prochain cycle", "bold": true}, {"text": "\n\n"}, {"text": "Maintenant que tu connais tes patterns, quelle "}, {"text": "intention", "bold": true}, {"text": " veux-tu poser pour ton prochain cycle amoureux ?"}] },
        { type: 'text_input', variable: 'intention_nouveau_cycle', placeholder: "Dans mon prochain cycle amoureux, je m'engage à...", isLong: true },
        { type: 'narrative', content: [{"text": "🌈 "}, {"text": "Tu viens d'accomplir un travail extraordinaire !", "bold": true}, {"text": "\n\n"}, {"text": "Cette intention que tu viens de poser n'est pas que des mots. C'est un "}, {"text": "engagement sacré", "bold": true}, {"text": " avec toi-même."}, {"text": "\n\n"}, {"text": "Ton prochain printemps sera différent inshaAllah. Tu vois maintenant tes patterns et tu as la "}, {"text": "boussole", "bold": true}, {"text": " de ta conscience."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "celebrer_cette_transformatio", "label": "🎉 Célébrer cette transformation →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Célébration et Transition" },

        { type: 'image', url: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHNlYXJjaHwyMXx8dm95YWdlfGVufDB8MHx8fDE3NTY5MDg1NTh8MA&ixlib=rb-4.1.0&q=80&w=1080", alt: "" },
        { type: 'narrative', content: [{"text": "🎉 "}, {"text": "CÉLÉBRATION DE TON VOYAGE", "bold": true, "italic": true}, {"text": "\n\n"}, {"text": "L'Arbre des Saisons Amoureuses"}] },
        { type: 'narrative', content: [{"text": "✨ "}, {"text": "Tu viens d'accomplir quelque chose de MAGIQUE !", "bold": true}, {"text": "\n\n"}, {"text": "Tu as exploré avec courage :"}, {"text": "\n\n"}, {"text": "🌸 Ton printemps : espoirs et idéalisations"}, {"text": "\n\n"}, {"text": "☀️ Ton été : forces et moments de plénitude"}, {"text": "\n\n"}, {"text": "🍂 Ton automne : défis et patterns de réaction"}, {"text": "\n\n"}, {"text": "❄️ Ton hiver : fins et sagesse acquise"}, {"text": "\n\n"}, {"text": "🌳 Tes cycles : cartographie complète et intention nouvelle"}] },
        { type: 'narrative', content: [{"text": "🦋 "}, {"text": "Ta métamorphose est en cours", "bold": true}, {"text": "\n\n"}, {"text": "Tu as "}, {"text": "conscientisé", "bold": true}, {"text": " tes patterns, "}, {"text": "célébré", "bold": true}, {"text": " tes forces, "}, {"text": "honoré", "bold": true}, {"text": " tes épreuves, et "}, {"text": "posé", "bold": true}, {"text": " une intention nouvelle."}, {"text": "\n\n"}, {"text": "C'est exactement ainsi que naissent les "}, {"text": "transformations durables", "bold": true}, {"text": "."}] },
        { type: 'message', content: [{"text": "\""}, {"text": "Et c'est Lui qui fait descendre la pluie après qu'ils aient désespéré, et Il étend Sa miséricorde.", "italic": true}, {"text": "\" (Coran 42:28)"}] },
        { type: 'message', content: [{"text": "📊 "}, {"text": "Progression Phase 3 : [■■□□] 2/4 formulaires complétés", "bold": true}] },
        { type: 'narrative', content: [{"text": "🎯 "}, {"text": "Prochaine étape de ton voyage", "bold": true}, {"text": "\n\n"}, {"text": "Le "}, {"text": "Formulaire 3.3", "bold": true}, {"text": " t'attend pour explorer tes styles d'attachement et tes patterns de communication."}, {"text": "\n\n"}, {"text": "Tu y découvriras comment tes racines d'enfance se manifestent dans ton style relationnel actuel, et comment créer des liens plus sains et authentiques."}] },
        { type: 'message', content: "Merci pour ta confiance.\n\nTon courage inspire. Ta vulnérabilité guérit. Ta transformation rayonne." },
        { type: 'message', content: [{"text": "🌟 Continue quand tu te sentiras prête..."}, {"text": "\n\n"}, {"text": "Souviens-toi : tu n'es plus la même. Tu as maintenant la sagesse de tes saisons. Utilise-la avec amour.", "italic": true}] },

        { type: 'completion', title: "Félicitations !", message: "Tu as terminé F3.2 — Les Saisons Amoureuses. Tes réponses ont été sauvegardées.", icon: '🌸' }
    ]
};

/* ─── Form Registry ─── */
if (typeof window.FORM_REGISTRY === 'undefined') window.FORM_REGISTRY = {};
window.FORM_REGISTRY['f3-2-saisons'] = F3_2_SAISONS;
