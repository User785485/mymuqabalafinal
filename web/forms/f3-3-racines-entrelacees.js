/* ═══════════════════════════════════════
   F3.3 — Racines Entrelacées
   Converti depuis Typebot · 173 steps · 17 variables
═══════════════════════════════════════ */

const F3_3_RACINES_ENTRELACEES = {
    id: 'f3_3_racines_entrelacees',
    version: 1,
    title: "F3.3 — Racines Entrelacées",
    icon: '🌿',
    checkboxId: 'f3_3',
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
        "amelioration_gestion_conflits",
        "besoins_de_securite",
        "besoins_non_exprimes",
        "blocages_expression_besoins",
        "blocages_expression_emotions",
        "comment_obtenir_securite",
        "consequences_non_expression",
        "exemples_communication",
        "flexibilite_cognitive",
        "impact_des_patterns_cognitifs",
        "impact_peurs_sur_comportement",
        "manifestation_attachement",
        "origine_de_cette_version",
        "patterns_a_transformer",
        "telephone",
        "version_qui_prend_le_controle",
        "vision_expression_authentique"
],

    steps: [

        /* ════════════════════════════════════ */
        { type: 'section', title: "Ouverture Sacrée - L'Arbre aux Racines Profondes" },

        { type: 'image', url: "https://images.unsplash.com/photo-1698646837791-b65efa317bb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHNlYXJjaHwxNzF8fHJhY2luZXN8ZW58MHwwfHx8MTc1NjkwODgwMXww&ixlib=rb-4.1.0&q=80&w=1080", alt: "" },
        { type: 'narrative', content: [{"text": "🌳 Les Racines Entrelacées 🌳", "bold": true, "italic": true}, {"text": "\n\n"}, {"text": "Formulaire 3.3 : "}, {"text": "Attachement & Communication", "bold": true}] },
        { type: 'narrative', content: [{"text": "Bienvenue dans ce territoire de l'exploration."}, {"text": "\n\n"}, {"text": "Aujourd'hui, nous allons explorer les "}, {"text": "racines invisibles", "bold": true}, {"text": " qui façonnent ta façon d'aimer et de communiquer."}] },
        { type: 'message', content: "Avant de continuer, rappelle-moi tes coordonnées :" },
        { type: 'message', content: "Ton prénom ?" },
        { type: 'text_input', variable: 'reponse', placeholder: "Ton prénom..." },
        { type: 'message', content: "Ton email ?" },
        { type: 'email_input', variable: 'email', placeholder: "ton.email@exemple.com" },
        { type: 'message', content: "Ton téléphone ?" },
        { type: 'phone_input', variable: 'telephone', placeholder: "06 12 34 56 78", defaultPrefix: '+33' },
        { type: 'narrative', content: [{"text": "🕊️ "}, {"text": "Bismillah ar-Rahman ar-Rahim", "italic": true}, {"text": "\n\n"}, {"text": "Au nom d'Allah, le Tout Miséricordieux, le Très Miséricordieux, nous commençons cette exploration des "}, {"text": "liens invisibles", "bold": true}, {"text": " qui nous unissent aux autres."}] },
        { type: 'narrative', content: [{"text": "🌱 Imagine deux arbres qui poussent côte à côte..."}, {"text": "\n\n"}, {"text": "Sous la surface, leurs "}, {"text": "racines s'entrelacent", "bold": true}, {"text": ", créant un réseau complexe d'échanges et de soutien mutuel. Parfois, ces racines se nourrissent mutuellement. Parfois, elles s'emmêlent et créent des nœuds."}] },
        { type: 'message', content: [{"text": "C'est exactement ce que nous allons explorer aujourd'hui : "}, {"text": "tes racines relationnelles", "bold": true}, {"text": "."}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Contextualisation Neuroscientifique" },

        { type: 'narrative', content: [{"text": "🧠 "}, {"text": "Les neurosciences de l'attachement", "bold": true}, {"text": "\n\n"}, {"text": "Savais-tu que ton "}, {"text": "style d'attachement", "bold": true}, {"text": " s'est formé dans les 18 premiers mois de ta vie ?"}] },
        { type: 'narrative', content: [{"text": "Ton cerveau a littéralement "}, {"text": "câblé", "bold": true}, {"text": " des circuits neuronaux basés sur tes premières expériences relationnelles."}, {"text": "\n\n"}, {"text": "La bonne nouvelle ? Grâce à la "}, {"text": "neuroplasticité", "bold": true}, {"text": ", ces circuits peuvent être reconfigurés à tout âge. 🌟"}] },
        { type: 'narrative', content: [{"text": "📊 Dans la population générale :"}, {"text": "\n\n"}, {"text": "• 60% ont un attachement "}, {"text": "sécure", "bold": true}, {"text": "\n\n"}, {"text": "• 20% ont un attachement "}, {"text": "anxieux", "bold": true}, {"text": "\n\n"}, {"text": "• 15% ont un attachement "}, {"text": "évitant", "bold": true}, {"text": "\n\n"}, {"text": "• 5% ont un attachement "}, {"text": "désorganisé", "bold": true}] },
        { type: 'narrative', content: [{"text": "Quel que soit ton style, "}, {"text": "tu n'es pas seule", "bold": true}, {"text": " et il n'y a "}, {"text": "rien de cassé", "bold": true}, {"text": " en toi. 💚"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Préparation Émotionnelle" },

        { type: 'image', url: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHNlYXJjaHwxNHx8c2Fsb258ZW58MHwwfHx8MTc1NjkxMDEzNnww&ixlib=rb-4.1.0&q=80&w=1080", alt: "" },
        { type: 'narrative', content: [{"text": "🌿 "}, {"text": "Créons ensemble un espace sécurisé", "bold": true}, {"text": "\n\n"}, {"text": "Avant d'explorer tes patterns d'attachement, prenons un moment pour nous assurer que tu te sens en "}, {"text": "sécurité émotionnelle", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "🌬️ Prends trois respirations profondes avec moi..."}, {"text": "\n\n"}, {"text": "Inspire... "}, {"text": "(compte jusqu'à 4)", "italic": true}, {"text": "\n\n"}, {"text": "Retiens... "}, {"text": "(compte jusqu'à 4)", "italic": true}, {"text": "\n\n"}, {"text": "Expire... "}, {"text": "(compte jusqu'à 6)", "italic": true}] },
        { type: 'narrative', content: [{"text": "📜 "}, {"text": "Tes droits dans cette exploration :", "bold": true}, {"text": "\n\n"}, {"text": "✨ Tu as le droit de "}, {"text": "prendre ton temps", "bold": true}, {"text": "\n\n"}, {"text": "✨ Tu as le droit de "}, {"text": "ressentir", "bold": true}, {"text": " ce qui émerge"}, {"text": "\n\n"}, {"text": "✨ Tu as le droit d'être "}, {"text": "vulnérable", "bold": true}, {"text": "\n\n"}, {"text": "✨ Tu as le droit de "}, {"text": "faire des pauses", "bold": true}] },
        { type: 'narrative', content: [{"text": "Je suis là pour t'accompagner avec "}, {"text": "bienveillance", "bold": true}, {"text": " et "}, {"text": "sans jugement", "bold": true}, {"text": "."}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Section 24 : Introduction Enrichie" },

        { type: 'message', content: [{"text": "🌳 "}, {"text": "Les Styles d'Attachement", "bold": true}] },
        { type: 'narrative', content: [{"text": "Chaque arbre développe son propre système de racines, unique et adapté à son environnement précoce."}, {"text": "\n\n"}, {"text": "Certains développent des racines "}, {"text": "profondes et stables", "bold": true}, {"text": ", d'autres des racines "}, {"text": "superficielles mais étendues", "bold": true}, {"text": ", d'autres encore des racines "}, {"text": "enchevêtrées", "bold": true}, {"text": "..."}] },
        { type: 'message', content: [{"text": "Explorons ensemble "}, {"text": "ton système racinaire relationnel", "bold": true}, {"text": ". 🌱"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Section 24 : Q1 - Style Principal Enrichi" },

        { type: 'message', content: [{"text": "💫 Je vais te présenter différents "}, {"text": "styles d'attachement", "bold": true}, {"text": ". Prends ton temps pour sentir lequel résonne le plus avec ton expérience."}] },
        { type: 'narrative', content: [{"text": "Ces styles se sont formés dans ton "}, {"text": "enfance", "bold": true}, {"text": " mais continuent d'influencer tes relations "}, {"text": "adultes", "bold": true}, {"text": "."}] },
        { type: 'image', url: "https://images.unsplash.com/photo-1500471929063-235c721eedf6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHNlYXJjaHwxNXx8ZW5mYW50fGVufDB8MHx8fDE3NTY5MDg5ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080", alt: "" },
        { type: 'message', content: [{"text": "Lequel de ces styles te correspond le plus ?", "bold": true}] },
        { type: 'choice', variable: 'choix', options: [{"id": "secure_je_me_sens_a_l_aise", "label": "🌳 SÉCURE : Je me sens à l'aise avec l'intimité ET l'autonomie. Je peux faire confiance et être vulnérable."}, {"id": "anxieux_j_ai_besoin_de_bea", "label": "🌊 ANXIEUX : J'ai besoin de beaucoup de réassurance. J'ai peur d'être abandonnée et je cherche constamment des preuves d'amour."}, {"id": "evitant_j_ai_tendance_a_g", "label": "🏔️ ÉVITANT : J'ai tendance à garder mes distances. L'intimité me fait peur et je préfère compter sur moi-même."}, {"id": "desorganise_j_oscille_ent", "label": "🌪️ DÉSORGANISÉ : J'oscille entre besoin intense de proximité et peur de l'intimité. Je vis des montagnes russes émotionnelles."}] },
        { type: 'narrative', content: [{"text": "✨ Merci pour cette reconnaissance courageuse."}, {"text": "\n\n"}, {"text": "Rappelle-toi : "}, {"text": "aucun style n'est meilleur qu'un autre", "bold": true}, {"text": ". Chacun est une stratégie d'adaptation qui t'a protégée à un moment donné."}] },
        { type: 'message', content: [{"text": "🔍 Maintenant, j'aimerais comprendre "}, {"text": "comment ce style se manifeste", "bold": true}, {"text": " concrètement dans tes relations."}] },
        { type: 'text_input', variable: 'manifestation_attachement', placeholder: "Dans mes relations, ce style se traduit par... (par exemple : je teste constamment l'autre, je garde mes distances, je me sens en sécurité...)", isLong: true },
        { type: 'message', content: [{"text": "🙏 Merci pour ce partage précieux. Cette conscience de tes patterns est le "}, {"text": "premier pas", "bold": true}, {"text": " vers leur transformation."}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Section 24 : Q2 - Peurs Attachement Enrichi" },

        { type: 'message', content: [{"text": "🌙 Parlons maintenant de ce qui se cache dans l'"}, {"text": "ombre", "bold": true}, {"text": " de ton attachement..."}] },
        { type: 'message', content: [{"text": "Les "}, {"text": "peurs relationnelles", "bold": true}, {"text": " sont universelles. Elles sont les gardiennes qui ont protégé ton cœur des blessures passées."}] },
        { type: 'narrative', content: [{"text": "🧠 "}, {"text": "Le sais-tu ?", "bold": true}, {"text": "\n\n"}, {"text": "Ces peurs activent les mêmes zones cérébrales que les "}, {"text": "dangers physiques", "bold": true}, {"text": ". Ton cerveau ne fait pas la différence entre une menace d'abandon et un tigre !"}] },
        { type: 'message', content: [{"text": "Quelles sont tes principales peurs en lien avec l'attachement ?", "bold": true}, {"text": "\n\n"}, {"text": "(Tu peux en sélectionner plusieurs)", "italic": true}] },
        { type: 'choice', variable: 'choix', multiple: true, options: [{"id": "peur_de_l_abandon_etre_lai", "label": "💔 Peur de l'ABANDON - Être laissée, rejetée, remplacée"}, {"id": "peur_de_l_engloutissement", "label": "🌊 Peur de l'ENGLOUTISSEMENT - Perdre mon identité dans la relation"}, {"id": "peur_de_l_intimite_etre_vr", "label": "🔒 Peur de l'INTIMITÉ - Être vraiment vue et connue"}, {"id": "peur_du_rejet_ne_pas_etre", "label": "🚫 Peur du REJET - Ne pas être assez bien"}, {"id": "peur_de_la_trahison_que_m", "label": "🗡️ Peur de la TRAHISON - Que ma confiance soit brisée"}, {"id": "peur_de_la_dependance_avo", "label": "⛓️ Peur de la DÉPENDANCE - Avoir besoin de l'autre"}, {"id": "peur_de_la_vulnerabilite", "label": "🛡️ Peur de la VULNÉRABILITÉ - Montrer mes failles"}, {"id": "peur_de_perdre_mon_identite", "label": "👤 Peur de PERDRE MON IDENTITÉ - Ne plus savoir qui je suis"}] },
        { type: 'message', content: [{"text": "💚 Nommer ses peurs demande un "}, {"text": "courage immense", "bold": true}, {"text": ". Tu viens de faire un pas de géant."}] },
        { type: 'message', content: [{"text": "🔄 Ces peurs créent des "}, {"text": "comportements de protection", "bold": true}, {"text": " qui peuvent paradoxalement créer ce que tu crains le plus..."}] },
        { type: 'message', content: [{"text": "Comment ces peurs influencent-elles ton comportement en relation ?", "bold": true}] },
        { type: 'text_input', variable: 'impact_peurs_sur_comportement', placeholder: "À cause de ces peurs, j'ai tendance à... (par exemple : tester l'autre, me retirer, sur-analyser, contrôler...)", isLong: true },
        { type: 'narrative', content: [{"text": "🌟 Ces comportements ne sont pas des "}, {"text": "défauts", "bold": true}, {"text": " mais des "}, {"text": "stratégies de survie", "bold": true}, {"text": " émotionnelle."}, {"text": "\n\n"}, {"text": "Avec de la conscience et de la compassion, ils peuvent être "}, {"text": "transformés", "bold": true}, {"text": "."}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Section 24 : Q3 - Besoins Sécurité Enrichi" },

        { type: 'narrative', content: [{"text": "🌸 Passons maintenant de tes "}, {"text": "peurs", "bold": true}, {"text": " à tes "}, {"text": "besoins", "bold": true}, {"text": "..."}] },
        { type: 'image', url: "https://images.unsplash.com/photo-1448375240586-882707db888b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHNlYXJjaHwxfHxmb3Jlc3R8ZW58MHwwfHx8MTc1NjkwOTMwOXww&ixlib=rb-4.1.0&q=80&w=1080", alt: "" },
        { type: 'message', content: [{"text": "Derrière chaque peur se cache un "}, {"text": "besoin légitime", "bold": true}, {"text": " de sécurité."}] },
        { type: 'message', content: [{"text": "De quoi as-tu besoin pour te sentir en sécurité dans une relation ?", "bold": true}, {"text": "\n\n"}, {"text": "Pense aux éléments concrets qui t'aident à te sentir en confiance et apaisée...", "italic": true}] },
        { type: 'text_input', variable: 'besoins_de_securite', placeholder: "Pour me sentir en sécurité, j'ai besoin de... (constance, communication claire, espace personnel, preuves d'amour...)", isLong: true },
        { type: 'message', content: [{"text": "✨ Ces besoins sont "}, {"text": "parfaitement légitimes", "bold": true}, {"text": ". Tu as le droit de les avoir et de les exprimer."}] },
        { type: 'message', content: "🤔 La question suivante est délicate mais importante..." },
        { type: 'message', content: [{"text": "Comment demandes-tu ou obtiens-tu généralement ces besoins de sécurité ?", "bold": true}, {"text": "\n\n"}, {"text": "Sois honnête... Parfois nos stratégies ne sont pas les plus saines...", "italic": true}] },
        { type: 'text_input', variable: 'comment_obtenir_securite', placeholder: "Pour obtenir cette sécurité, je... (demande directement, teste l'autre, me sur-adapte, contrôle...)", isLong: true },
        { type: 'narrative', content: [{"text": "💚 Quelle que soit ta stratégie actuelle, elle t'a "}, {"text": "servie jusqu'ici", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Peut-être est-il temps d'explorer des façons plus "}, {"text": "directes et saines", "bold": true}, {"text": " d'obtenir ce dont tu as besoin."}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Pause Intégration Section 24" },

        { type: 'message', content: [{"text": "🌊 "}, {"text": "Pause d'intégration", "bold": true}] },
        { type: 'narrative', content: [{"text": "Ces questions sur l'attachement touchent des "}, {"text": "couches profondes", "bold": true}, {"text": " de ton être."}, {"text": "\n\n"}, {"text": "Prends un moment pour "}, {"text": "respirer", "bold": true}, {"text": " et "}, {"text": "accueillir", "bold": true}, {"text": " ce qui a émergé."}] },
        { type: 'message', content: [{"text": "✨ Tu es en train de faire un "}, {"text": "travail courageux", "bold": true}, {"text": " de conscience et de guérison."}] },
        { type: 'message', content: [{"text": "📿 "}, {"text": "\"En vérité, avec la difficulté vient la facilité\"", "italic": true}, {"text": " - Coran 94:6"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Section 25 : Introduction Communication Enrichie" },

        { type: 'message', content: [{"text": "🌉 "}, {"text": "Communication et Expression", "bold": true}] },
        { type: 'image', url: "https://images.unsplash.com/photo-1483070421852-a142ce0a385d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHNlYXJjaHw2MHx8Y29tbXVuaWNhdGlvbnxlbnwwfDB8fHwxNzU2OTA5Mzc3fDA&ixlib=rb-4.1.0&q=80&w=1080", alt: "" },
        { type: 'narrative', content: [{"text": "Si l'attachement est le "}, {"text": "système racinaire", "bold": true}, {"text": ", la communication est la "}, {"text": "sève", "bold": true}, {"text": " qui circule entre les arbres."}] },
        { type: 'narrative', content: [{"text": "C'est par la communication que nous "}, {"text": "nourrissons", "bold": true}, {"text": " ou "}, {"text": "empoisonnons", "bold": true}, {"text": " nos relations."}] },
        { type: 'message', content: [{"text": "Explorons maintenant ta "}, {"text": "façon unique", "bold": true}, {"text": " de communiquer dans les relations. 💬"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Section 25 : Q1 - Style Communication Enrichi" },

        { type: 'narrative', content: [{"text": "🧠 "}, {"text": "Fait fascinant :", "bold": true}, {"text": "\n\n"}, {"text": "Ton style de communication active des circuits neuronaux spécifiques qui se sont formés dans tes "}, {"text": "7 premières années", "bold": true}, {"text": " de vie."}] },
        { type: 'message', content: [{"text": "Quel est ton style de communication dominant dans les relations ?", "bold": true}] },
        { type: 'choice', variable: 'choix', multiple: true, options: [{"id": "direct_assertif_je_dis_c", "label": "🎯 DIRECT & ASSERTIF - Je dis ce que je pense clairement et respectueusement"}, {"id": "passif_accommodant_j_ev", "label": "🕊️ PASSIF & ACCOMMODANT - J'évite les conflits et je m'adapte aux autres"}, {"id": "passif_agressif_j_exprime", "label": "😏 PASSIF-AGRESSIF - J'exprime mon mécontentement indirectement"}, {"id": "agressif_confrontant_j_i", "label": "🔥 AGRESSIF & CONFRONTANT - J'impose mes besoins, parfois aux dépens des autres"}, {"id": "manipulateur_j_utilise_des", "label": "🎭 MANIPULATEUR - J'utilise des stratégies indirectes pour obtenir ce que je veux"}, {"id": "variable_mon_style_change", "label": "🌊 VARIABLE - Mon style change selon la personne et la situation"}] },
        { type: 'narrative', content: [{"text": "💫 Chaque style a ses "}, {"text": "forces", "bold": true}, {"text": " et ses "}, {"text": "défis", "bold": true}, {"text": ". L'important est d'en être consciente."}] },
        { type: 'message', content: [{"text": "🔍 J'aimerais mieux comprendre comment ce style se "}, {"text": "manifeste concrètement", "bold": true}, {"text": "..."}] },
        { type: 'message', content: [{"text": "Peux-tu me donner des exemples de ce style de communication ?", "bold": true}] },
        { type: 'text_input', variable: 'exemples_communication', placeholder: "Par exemple, quand il y a un conflit, je... Quand j'ai besoin de quelque chose, je... Quand je suis blessée, je...", isLong: true },
        { type: 'message', content: [{"text": "🌟 Cette conscience de tes patterns de communication est "}, {"text": "précieuse", "bold": true}, {"text": ". Elle te permet de choisir consciemment comment tu veux communiquer."}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Section 25 : Q2 - Expression Émotions Enrichie" },

        { type: 'message', content: [{"text": "🎨 Les émotions sont les "}, {"text": "couleurs", "bold": true}, {"text": " de notre communication..."}] },
        { type: 'message', content: "Certaines personnes peignent avec toute la palette, d'autres n'utilisent que quelques teintes, d'autres encore gardent leurs couleurs cachées..." },
        { type: 'message', content: [{"text": "Comment exprimes-tu tes émotions dans une relation ?", "bold": true}, {"text": "\n\n"}, {"text": "(Sélectionne tout ce qui te correspond)", "italic": true}] },
        { type: 'choice', variable: 'choix', multiple: true, options: [{"id": "j_exprime_facilement_mes_emo", "label": "🌈 J'exprime facilement mes émotions"}, {"id": "j_ai_du_mal_a_exprimer_mes_e", "label": "🔒 J'ai du mal à exprimer mes émotions"}, {"id": "la_colere_est_facile_a_expri", "label": "🔥 La colère est facile à exprimer"}, {"id": "la_tristesse_est_difficile_a", "label": "💧 La tristesse est difficile à montrer"}, {"id": "la_joie_s_exprime_naturelle", "label": "☀️ La joie s'exprime naturellement"}, {"id": "je_cache_mes_peurs", "label": "😰 Je cache mes peurs"}, {"id": "j_intellectualise_mes_emotio", "label": "🧠 J'intellectualise mes émotions"}, {"id": "mon_corps_exprime_ce_que_je", "label": "💃 Mon corps exprime ce que je ne dis pas"}] },
        { type: 'message', content: [{"text": "✨ Ton "}, {"text": "paysage émotionnel", "bold": true}, {"text": " est unique. Il n'y a pas de bonne ou mauvaise façon d'exprimer."}] },
        { type: 'message', content: [{"text": "🚧 Explorons maintenant ce qui peut "}, {"text": "bloquer", "bold": true}, {"text": " l'expression de certaines émotions..."}] },
        { type: 'message', content: [{"text": "Qu'est-ce qui bloque l'expression de certaines émotions ?", "bold": true}] },
        { type: 'text_input', variable: 'blocages_expression_emotions', placeholder: "J'ai du mal à exprimer certaines émotions parce que... (peur du jugement, éducation, expériences passées, croyances...)", isLong: true },
        { type: 'narrative', content: [{"text": "💚 Ces blocages sont souvent des "}, {"text": "protections", "bold": true}, {"text": " mises en place pour de bonnes raisons."}, {"text": "\n\n"}, {"text": "Avec douceur et patience, tu peux apprendre à "}, {"text": "élargir ta palette émotionnelle", "bold": true}, {"text": "."}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Déblocage Pétale 9 - Communication Authentique" },

        { type: 'message', content: [{"text": "🌸 "}, {"text": "Félicitations", "bold": true}] },
        { type: 'image', url: "https://images.unsplash.com/photo-1714906945954-8f6fe68ae04e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHNlYXJjaHwyNzJ8fGNvbXByJUMzJUE5aGVuc2lvbnxlbnwwfDB8fHwxNzU2OTA5NjU1fDA&ixlib=rb-4.1.0&q=80&w=1080", alt: "" },
        { type: 'narrative', content: [{"text": "Ta capacité à "}, {"text": "comprendre", "bold": true}, {"text": " et "}, {"text": "transformer", "bold": true}, {"text": " tes patterns de communication s'affine."}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Section 25 : Q3 - Gestion Conflits Enrichie" },

        { type: 'message', content: [{"text": "⚡ Les "}, {"text": "conflits", "bold": true}, {"text": " sont les tempêtes qui testent la solidité de nos racines..."}] },
        { type: 'narrative', content: [{"text": "Les conflits sont "}, {"text": "inévitables", "bold": true}, {"text": " et même "}, {"text": "nécessaires", "bold": true}, {"text": " pour la croissance d'une relation."}, {"text": "\n\n"}, {"text": "C'est notre "}, {"text": "façon de les gérer", "bold": true}, {"text": " qui détermine s'ils nous rapprochent ou nous éloignent."}] },
        { type: 'message', content: [{"text": "Comment gères-tu les conflits dans tes relations ?", "bold": true}] },
        { type: 'choice', variable: 'choix', multiple: true, options: [{"id": "j_evite_les_conflits_a_tout", "label": "🏃 J'ÉVITE les conflits à tout prix - Je préfère la paix même si c'est au prix de mes besoins"}, {"id": "j_affronte_directement_je", "label": "⚔️ J'AFFRONTE directement - Je vais au conflit frontalement"}, {"id": "je_fuis_la_situation_je_di", "label": "🦌 Je FUIS la situation - Je disparais physiquement ou émotionnellement"}, {"id": "j_explose_puis_je_regrette", "label": "🌋 J'EXPLOSE puis je regrette - Mes émotions débordent violemment"}, {"id": "je_cherche_le_dialogue_j_e", "label": "💬 Je cherche le DIALOGUE - J'essaie de comprendre et d'être comprise"}, {"id": "je_me_renferme_dans_le_silen", "label": "🤐 Je me renferme dans le SILENCE - Je coupe la communication"}] },
        { type: 'message', content: [{"text": "💫 Cette stratégie a probablement été "}, {"text": "apprise", "bold": true}, {"text": " très tôt, peut-être en observant tes parents."}] },
        { type: 'message', content: [{"text": "🌱 La bonne nouvelle : tu peux apprendre de "}, {"text": "nouvelles façons", "bold": true}, {"text": " de naviguer les conflits."}] },
        { type: 'message', content: [{"text": "Qu'aimerais-tu améliorer dans ta façon de gérer les conflits ?", "bold": true}] },
        { type: 'text_input', variable: 'amelioration_gestion_conflits', placeholder: "J'aimerais apprendre à... (rester calme, exprimer mes besoins sans agressivité, écouter l'autre, ne pas fuir...)", isLong: true },
        { type: 'message', content: [{"text": "🌟 Cette intention d'"}, {"text": "amélioration", "bold": true}, {"text": " est le premier pas vers des relations plus harmonieuses."}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Section 25 : Q3bis - Version Qui Prend le Contrôle" },

        { type: 'message', content: [{"text": "🎭 Parlons de quelque chose de plus "}, {"text": "profond", "bold": true}, {"text": "..."}] },
        { type: 'narrative', content: [{"text": "Dans les conflits, c'est souvent une "}, {"text": "version plus jeune", "bold": true}, {"text": " de nous qui prend les commandes..."}, {"text": "\n\n"}, {"text": "Une partie blessée, effrayée, ou en colère qui prend le contrôle sur notre adulte rationnel."}] },
        { type: 'message', content: [{"text": "Dans les conflits, quelle 'version' de toi prend le contrôle ?", "bold": true}] },
        { type: 'text_input', variable: 'version_qui_prend_le_controle', placeholder: "Quand je suis en conflit, c'est comme si une version de moi prenait le contrôle, celle qui... (a 5 ans et peur d'être abandonnée, est adolescente rebelle, est la petite fille qui veut être aimée...)", isLong: true },
        { type: 'message', content: [{"text": "💚 Reconnaître cette "}, {"text": "partie de toi", "bold": true}, {"text": " est un acte de courage et de compassion envers toi-même."}] },
        { type: 'message', content: "🔍 Allons encore plus loin..." },
        { type: 'message', content: [{"text": "D'où vient cette version de toi ? À quoi ou à qui te reconnectes-tu dans ces moments ?", "bold": true}] },
        { type: 'text_input', variable: 'origine_de_cette_version', placeholder: "Cette version vient de... (mon enfance, ma mère/père, un traumatisme, une période difficile...)", isLong: true },
        { type: 'narrative', content: [{"text": "🌟 Cette partie de toi a "}, {"text": "besoin d'être entendue", "bold": true}, {"text": ", pas rejetée."}, {"text": "\n\n"}, {"text": "En l'"}, {"text": "accueillant avec compassion", "bold": true}, {"text": ", tu peux progressivement lui apprendre qu'elle est maintenant en sécurité."}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Section 25.5 : Introduction Besoins Non Exprimés" },

        { type: 'message', content: [{"text": "🌙 "}, {"text": "Les Besoins dans l'Ombre", "bold": true}] },
        { type: 'narrative', content: [{"text": "Certaines racines de l'arbre restent "}, {"text": "cachées sous terre", "bold": true}, {"text": ", invisibles mais vitales..."}, {"text": "\n\n"}, {"text": "Ce sont nos "}, {"text": "besoins non exprimés", "bold": true}, {"text": ", ceux que nous n'osons pas montrer mais qui influencent tout."}] },
        { type: 'message', content: [{"text": "Explorons ces besoins qui restent dans l'"}, {"text": "ombre", "bold": true}, {"text": "... 🌒"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Section 25.5 : Q1 - Besoins Cachés Enrichis" },

        { type: 'message', content: [{"text": "💭 Certains besoins sont si "}, {"text": "vulnérables", "bold": true}, {"text": " qu'on préfère les garder cachés..."}] },
        { type: 'narrative', content: [{"text": "Pourtant, ces besoins non exprimés créent souvent de la "}, {"text": "frustration", "bold": true}, {"text": ", du "}, {"text": "ressentiment", "bold": true}, {"text": ", ou de la "}, {"text": "distance", "bold": true}, {"text": "."}] },
        { type: 'message', content: [{"text": "Quels sont les besoins que tu as le plus de mal à exprimer dans tes relations ?", "bold": true}] },
        { type: 'text_input', variable: 'besoins_non_exprimes', placeholder: "J'ai du mal à exprimer mon besoin de... (tendresse, reconnaissance, espace, soutien, être prioritaire, être désirée...)", isLong: true },
        { type: 'message', content: [{"text": "✨ Ces besoins sont "}, {"text": "légitimes et importants", "bold": true}, {"text": ". Tu mérites qu'ils soient entendus et respectés."}] },
        { type: 'message', content: [{"text": "🔐 Qu'est-ce qui "}, {"text": "verrouille", "bold": true}, {"text": " l'expression de ces besoins ?"}] },
        { type: 'message', content: [{"text": "Qu'est-ce qui t'empêche d'exprimer ces besoins ?", "bold": true}] },
        { type: 'text_input', variable: 'blocages_expression_besoins', placeholder: "Je n'exprime pas ces besoins parce que... (peur du rejet, honte, croyance que je ne mérite pas, peur de paraître faible...)", isLong: true },
        { type: 'narrative', content: [{"text": "💚 Ces peurs et croyances peuvent être "}, {"text": "doucement questionnées", "bold": true}, {"text": " et "}, {"text": "transformées", "bold": true}, {"text": "."}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Section 25.5 : Q2 - Conséquences et Vision" },

        { type: 'message', content: [{"text": "🌊 Explorons l'"}, {"text": "impact", "bold": true}, {"text": " de ces besoins non exprimés..."}] },
        { type: 'message', content: [{"text": "Quelles sont les conséquences de ne pas exprimer ces besoins ?", "bold": true}] },
        { type: 'text_input', variable: 'consequences_non_expression', placeholder: "Quand je n'exprime pas ces besoins, il se passe... (accumulation de frustration, distance émotionnelle, colère qui explose...)", isLong: true },
        { type: 'message', content: [{"text": "😔 C'est un "}, {"text": "prix élevé", "bold": true}, {"text": " à payer pour le silence..."}] },
        { type: 'message', content: [{"text": "✨ Maintenant, imaginons un "}, {"text": "monde différent", "bold": true}, {"text": "..."}] },
        { type: 'message', content: [{"text": "Comment ta vie relationnelle serait-elle différente si tu pouvais exprimer tous tes besoins authentiquement ?", "bold": true}] },
        { type: 'text_input', variable: 'vision_expression_authentique', placeholder: "Si je pouvais exprimer tous mes besoins, ma vie relationnelle serait... (plus légère, plus vraie, plus connectée, plus satisfaisante...)", isLong: true },
        { type: 'message', content: [{"text": "🌟 Cette vision est "}, {"text": "possible", "bold": true}, {"text": ". Elle commence par de petits pas courageux vers l'expression authentique."}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Patterns Cognitifs Relationnels Enrichis" },

        { type: 'message', content: [{"text": "🧠 "}, {"text": "Bonus : Les Lunettes Invisibles", "bold": true}] },
        { type: 'narrative', content: [{"text": "Nous portons tous des "}, {"text": "lunettes invisibles", "bold": true}, {"text": " qui filtrent notre perception des relations."}, {"text": "\n\n"}, {"text": "Ces lunettes sont nos "}, {"text": "patterns de pensée", "bold": true}, {"text": ", et elles colorent tout ce que nous voyons."}] },
        { type: 'message', content: [{"text": "As-tu tendance à "}, {"text": "ruminer", "bold": true}, {"text": " après les interactions ?"}] },
        { type: 'choice', variable: 'choix', multiple: true, options: [{"id": "jamais_je_tourne_la_page_f", "label": "🍃 JAMAIS - Je tourne la page facilement"}, {"id": "parfois_selon_l_importance", "label": "🌊 PARFOIS - Selon l'importance de la situation"}, {"id": "souvent_je_rejoue_les_conv", "label": "🌀 SOUVENT - Je rejoue les conversations dans ma tête"}, {"id": "toujours_je_ne_peux_pas_m", "label": "🌪️ TOUJOURS - Je ne peux pas m'en empêcher"}, {"id": "obsessionnel_ca_me_consume", "label": "🔄 OBSESSIONNEL - Ça me consume complètement"}] },
        { type: 'narrative', content: [{"text": "💫 La rumination est souvent une tentative de notre cerveau de "}, {"text": "résoudre", "bold": true}, {"text": " ou de "}, {"text": "comprendre", "bold": true}, {"text": "."}] },
        { type: 'message', content: [{"text": "Comment "}, {"text": "interprètes-tu", "bold": true}, {"text": " généralement les signaux ambigus ?"}] },
        { type: 'choice', variable: 'choix', multiple: true, options: [{"id": "positif_je_vois_le_meilleu", "label": "🌟 POSITIF - Je vois le meilleur"}, {"id": "negatif_je_crains_le_pire", "label": "🌧️ NÉGATIF - Je crains le pire"}, {"id": "neutre_je_reste_factuelle", "label": "⚖️ NEUTRE - Je reste factuelle"}, {"id": "anxieux_je_sur_analyse_tou", "label": "😰 ANXIEUX - Je sur-analyse tout"}, {"id": "clarification_je_demande_d", "label": "📢 CLARIFICATION - Je demande directement"}] },
        { type: 'message', content: [{"text": "🔍 Voyons si tu reconnais certaines "}, {"text": "distorsions cognitives", "bold": true}, {"text": " communes..."}] },
        { type: 'message', content: [{"text": "Reconnais-tu certaines de ces distorsions dans tes relations ?", "bold": true}, {"text": "\n\n"}, {"text": "(Sélectionne toutes celles qui te parlent)", "italic": true}] },
        { type: 'choice', variable: 'choix', multiple: true, options: [{"id": "lecture_de_pensees_je_sai", "label": "🔮 LECTURE DE PENSÉES - \"Je sais ce qu'il/elle pense\""}, {"id": "catastrophisme_tout_va_m", "label": "🌪️ CATASTROPHISME - \"Tout va mal finir\""}, {"id": "generalisation_toujours", "label": "♾️ GÉNÉRALISATION - \"Toujours\" ou \"Jamais\""}, {"id": "personnalisation_c_est_de", "label": "🎯 PERSONNALISATION - \"C'est de ma faute\""}, {"id": "tout_ou_rien_pas_de_nuanc", "label": "⚪⚫ TOUT OU RIEN - Pas de nuances"}, {"id": "filtre_negatif_ne_voir_que", "label": "🔍 FILTRE NÉGATIF - Ne voir que le mauvais"}, {"id": "conclusions_hatives_juger", "label": "🏃 CONCLUSIONS HÂTIVES - Juger trop vite"}, {"id": "aucune_pensee_claire_et_nu", "label": "✨ AUCUNE - Pensée claire et nuancée"}] },
        { type: 'message', content: [{"text": "💚 Ces distorsions sont "}, {"text": "humaines et universelles", "bold": true}, {"text": ". Les reconnaître est le premier pas pour s'en libérer."}] },
        { type: 'message', content: [{"text": "À quel point es-tu "}, {"text": "flexible", "bold": true}, {"text": " dans ta façon de penser en relation ?"}] },
        { type: 'rating', variable: 'flexibilite_cognitive', max: 10, leftLabel: "Très rigide", rightLabel: "Très flexible" },
        { type: 'message', content: [{"text": "Comment ces patterns de pensée affectent-ils tes relations ?", "bold": true}] },
        { type: 'text_input', variable: 'impact_des_patterns_cognitifs', placeholder: "Mes patterns de pensée créent parfois... (malentendus, anxiété, conflits inutiles, distance...)", isLong: true },
        { type: 'message', content: [{"text": "Quels patterns cognitifs aimerais-tu transformer ?", "bold": true}] },
        { type: 'text_input', variable: 'patterns_a_transformer', placeholder: "J'aimerais arrêter de... et plutôt apprendre à...", isLong: true },
        { type: 'narrative', content: [{"text": "🧠 Prendre conscience de tes patterns cognitifs est le premier pas vers des relations plus "}, {"text": "saines et claires", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Tu peux apprendre à "}, {"text": "changer de lunettes", "bold": true}, {"text": " quand les tiennes déforment la réalité."}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Intégration Somatique" },

        { type: 'message', content: [{"text": "🌿 "}, {"text": "Moment d'intégration corporelle", "bold": true}] },
        { type: 'narrative', content: [{"text": "Tout ce que tu viens d'explorer vit aussi dans ton "}, {"text": "corps", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Prenons un moment pour "}, {"text": "ancrer", "bold": true}, {"text": " ces découvertes."}] },
        { type: 'narrative', content: [{"text": "🌬️ "}, {"text": "Scan corporel guidé :", "bold": true}, {"text": "\n\n"}, {"text": "• Place une main sur ton "}, {"text": "cœur", "bold": true}, {"text": "\n\n"}, {"text": "• L'autre sur ton "}, {"text": "ventre", "bold": true}, {"text": "\n\n"}, {"text": "• Respire "}, {"text": "profondément", "bold": true}, {"text": "\n\n"}, {"text": "• Sens la "}, {"text": "chaleur", "bold": true}, {"text": " de tes mains"}] },
        { type: 'narrative', content: [{"text": "💚 Répète intérieurement :"}, {"text": "\n\n"}, {"text": "\"Je suis en sécurité pour explorer et transformer mes patterns relationnels.\"", "italic": true}, {"text": "\n\n"}, {"text": "\"J'ai le droit d'avoir des besoins et de les exprimer.\"", "italic": true}, {"text": "\n\n"}, {"text": "\"Je mérite des relations saines et nourrissantes.\"", "italic": true}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Conclusion Enrichie et Célébration" },

        { type: 'message', content: [{"text": "🌟 "}, {"text": "BRAVO !", "bold": true}] },
        { type: 'image', url: "https://images.unsplash.com/photo-1527784281695-866fa715d9d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHNlYXJjaHw2fHxlbmNvdXJhZ2VtZW50fGVufDB8MHx8fDE3NTY5MDk5MzN8MA&ixlib=rb-4.1.0&q=80&w=1080", alt: "" },
        { type: 'message', content: [{"text": "Tu viens de terminer une exploration "}, {"text": "profonde et courageuse", "bold": true}, {"text": " de tes patterns d'attachement et de communication."}] },
        { type: 'narrative', content: [{"text": "✨ "}, {"text": "Ce que tu as accompli aujourd'hui :", "bold": true}, {"text": "\n\n"}, {"text": "🌳 Identifié ton "}, {"text": "style d'attachement", "bold": true}, {"text": "\n\n"}, {"text": "🌊 Reconnu tes "}, {"text": "peurs relationnelles", "bold": true}, {"text": "\n\n"}, {"text": "💬 Clarifié ton "}, {"text": "style de communication", "bold": true}, {"text": "\n\n"}, {"text": "🎨 Exploré ton "}, {"text": "expression émotionnelle", "bold": true}, {"text": "\n\n"}, {"text": "⚡ Compris ta "}, {"text": "gestion des conflits", "bold": true}, {"text": "\n\n"}, {"text": "🌙 Révélé tes "}, {"text": "besoins cachés", "bold": true}, {"text": "\n\n"}, {"text": "🧠 Identifié tes "}, {"text": "patterns cognitifs", "bold": true}] },
        { type: 'narrative', content: [{"text": "🌱 "}, {"text": "La transformation a déjà commencé", "bold": true}, {"text": "\n\n"}, {"text": "La simple "}, {"text": "conscience", "bold": true}, {"text": " de ces patterns est le premier pas vers leur transformation."}, {"text": "\n\n"}, {"text": "Tu as maintenant les "}, {"text": "clés", "bold": true}, {"text": " pour créer des relations plus conscientes et authentiques."}] },
        { type: 'narrative', content: [{"text": "📿 "}, {"text": "\"Et c'est Lui qui a créé à partir de l'eau une espèce humaine qu'Il unit par les liens de la parenté et de l'alliance\"", "italic": true}, {"text": " - Coran 25:54"}, {"text": "\n\n"}, {"text": "Les liens que nous créons sont "}, {"text": "sacrés", "bold": true}, {"text": ". Honore-les en t'honorant toi-même d'abord."}] },
        { type: 'narrative', content: [{"text": "🎯 "}, {"text": "Prochaine étape", "bold": true}, {"text": "\n\n"}, {"text": "Le prochain et dernier formulaire de cette phase explorera tes "}, {"text": "forces relationnelles", "bold": true}, {"text": " et ta "}, {"text": "créativité", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Tu découvriras l'"}, {"text": "arbre fruitier", "bold": true}, {"text": " que tu es devenue et les "}, {"text": "fruits uniques", "bold": true}, {"text": " que tu portes."}] },
        { type: 'narrative', content: [{"text": "💚 Prends le temps d'"}, {"text": "intégrer", "bold": true}, {"text": " tout ce que tu as découvert aujourd'hui."}, {"text": "\n\n"}, {"text": "Tu es sur le chemin de relations plus "}, {"text": "authentiques", "bold": true}, {"text": ", "}, {"text": "conscientes", "bold": true}, {"text": " et "}, {"text": "épanouissantes", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "🙏 "}, {"text": "Alhamdulillah", "italic": true}, {"text": " pour ce chemin parcouru."}, {"text": "\n\n"}, {"text": "À très bientôt pour la suite de ton voyage. 🌟"}] },

        { type: 'completion', title: "Félicitations !", message: "Tu as terminé F3.3 — Racines Entrelacées. Tes réponses ont été sauvegardées.", icon: '🌿' }
    ]
};

/* ─── Form Registry ─── */
if (typeof window.FORM_REGISTRY === 'undefined') window.FORM_REGISTRY = {};
window.FORM_REGISTRY['f3-3-racines-entrelacees'] = F3_3_RACINES_ENTRELACEES;
