/* ═══════════════════════════════════════
   F1.5 — Exploration & Transformation
   Converti depuis Typebot · 149 steps · 23 variables
═══════════════════════════════════════ */

const F1_5_TRANSFORMATION = {
    id: 'f1_5_transformation',
    version: 1,
    title: "F1.5 — Exploration & Transformation",
    icon: '🦋',
    checkboxId: 'f1_5',
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
        "actions_sans_limitation",
        "besoins_soutien",
        "cercle_actuel",
        "croyance_limitante",
        "croyances_amour",
        "expression_libre_croyances",
        "force_a_developper_f2",
        "force_piege_f2",
        "forces_cachees_f2",
        "influences_difficiles",
        "jardin_cercle",
        "niveau_soutien",
        "plus_grande_force_f2",
        "prete_lacher_croyance",
        "protection_energie",
        "qui_celebrera",
        "qui_soutient",
        "telephone",
        "var_email",
        "var_prenom",
        "vie_sans_limitation",
        "vulnerabilites_f2",
        "vulnerabilites_protection_f2"
],

    steps: [

        /* ════════════════════════════════════ */
        { type: 'section', title: "💫 Reconnexion" },

        { type: 'image', url: "https://images.unsplash.com/photo-1735507582615-0321c88f6dbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NTI4MzA5OTV8&ixlib=rb-4.1.0&q=80&w=1080", alt: "" },
        { type: 'message', content: [{"text": "Formulaire 1.5 : Tes Ressources cachées", "bold": true, "italic": true}] },
        { type: 'message', content: "💫 Bienvenue dans le Formulaire 1.5 - l'avant-dernière étape de ta cartographie émotionnelle !\n\nTu as déjà parcouru 4 formulaires sur 6. Un magnifique chemin !\n\nDans cette partie, nous allons explorer tes croyances sur l'amour et découvrir tes ressources cachées." },
        { type: 'message', content: [{"text": "Avant de continuer, quel est ton prénom ?"}, {"text": "\n\n"}, {"text": "(Pour personnaliser la suite de ton parcours)", "italic": true}] },
        { type: 'text_input', variable: 'var_prenom', placeholder: "Ton prénom..." },
        { type: 'message', content: "Et ton email ?" },
        { type: 'email_input', variable: 'var_email', placeholder: "ton.email@exemple.com" },
        { type: 'message', content: "Et ton numéro de téléphone ?" },
        { type: 'phone_input', variable: 'telephone', placeholder: "06 12 34 56 78", defaultPrefix: '+33' },
        { type: 'narrative', content: [{"text": "Prends une grande respiration..."}, {"text": "\n\n"}, {"text": "Es-tu prête à "}, {"text": "explorer tes profondeurs", "bold": true}, {"text": " ?"}] },
        { type: 'choice', variable: 'choix', options: [{"id": "je_suis_prete_a_explorer_mes_p", "label": "Je suis prête à explorer mes profondeurs →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Croyances sur l'amour" },

        { type: 'image', url: "https://images.unsplash.com/photo-1494774157365-9e04c6720e47", alt: "" },
        { type: 'message', content: [{"text": "📍 Maintenant, explorons tes "}, {"text": "croyances sur l'amour", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "Les histoires que tu te racontes deviennent ta "}, {"text": "\"vérité\"", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Les identifier, c'est reprendre ton pouvoir créateur."}] },
        { type: 'message', content: [{"text": "💡 Tes croyances sont des "}, {"text": "lunettes invisibles", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "Si tu crois que \"l'amour fait souffrir\", tu attireras des confirmations."}, {"text": "\n\n"}, {"text": "C'est ainsi que fonctionne notre "}, {"text": "cerveau", "bold": true}, {"text": "."}] },
        { type: 'message', content: [{"text": "Identifie les croyances qui "}, {"text": "résonnent en toi", "bold": true}, {"text": " :"}] },
        { type: 'choice', variable: 'croyances_amour', multiple: true, options: [{"id": "l_amour_vrai_n_existe_pas", "label": "💔 \"L'amour vrai n'existe pas\""}, {"id": "les_bonnes_personnes_sont_p", "label": "🔒 \"Les bonnes personnes sont prises\""}, {"id": "je_suis_trop_compliquee", "label": "🎭 \"Je suis trop compliquée\""}, {"id": "l_amour_fait_souffrir", "label": "⚡ \"L'amour fait souffrir\""}, {"id": "c_est_trop_tard_pour_moi", "label": "⏰ \"C'est trop tard pour moi\""}, {"id": "je_porte_malchance", "label": "🌪️ \"Je porte malchance\""}, {"id": "l_amour_fuit_qui_le_cherche", "label": "🏃 \"L'amour fuit qui le cherche\""}, {"id": "c_est_une_question_de_chanc", "label": "🎲 \"C'est une question de chance\""}, {"id": "il_faut_le_meriter", "label": "💰 \"Il faut le mériter\""}, {"id": "je_dois_changer_pour_etre_a", "label": "🦋 \"Je dois changer pour être aimée\""}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Suite croyances" },

        { type: 'message', content: [{"text": "💫 "}, {"text": "Respire profondément", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "Ces croyances peuvent être lourdes."}, {"text": "\n\n"}, {"text": "Tu es "}, {"text": "courageuse", "bold": true}, {"text": " de les regarder."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "identifier_ma_croyance_princip", "label": "Identifier ma croyance principale →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Croyance limitante" },

        { type: 'message', content: [{"text": "Quelle est LA croyance principale qui te "}, {"text": "limite", "bold": true}, {"text": " ? "}] },
        { type: 'message', content: "Celle qui revient le plus souvent..." },
        { type: 'narrative', content: [{"text": "💬 Exprime-toi librement (audio ou écrit, comme tu préfères) ", "italic": true}, {"text": "\n\n"}, {"text": "✨ Plus tu partages, plus ta cartographie sera précise insha'Allah ", "italic": true}, {"text": "\n\n"}, {"text": "🎤 Audio uniquement sur WhatsApp !", "italic": true}, {"text": "\n\n"}, {"text": "🤍 Choisis ce qui te met le plus à l'aise", "italic": true}] },
        { type: 'text_input', variable: 'croyance_limitante', placeholder: "Ton espace d'expression...", isLong: true },
        { type: 'narrative', content: [{"text": "💭 Ces croyances peuvent peser lourd..."}, {"text": "\n\n"}, {"text": "C'est "}, {"text": "normal", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "Elles se sont construites pour te "}, {"text": "protéger", "bold": true}, {"text": " à une époque."}, {"text": "\n\n"}, {"text": "Aujourd'hui, tu es assez forte pour les questionner."}] },
        { type: 'message', content: [{"text": "Nommer cette croyance, c'est "}, {"text": "reprendre le pouvoir", "bold": true}, {"text": "."}] },
        { type: 'message', content: [{"text": "Elle n'est pas toi, c'est une histoire apprise qui peut être "}, {"text": "réécrite", "bold": true}, {"text": "."}] },
        { type: 'message', content: [{"text": "\"Et quiconque place sa confiance en Allah, Il lui suffit\"", "italic": true}, {"text": " (65:3)"}] },
        { type: 'choice', variable: 'choix', options: [{"id": "imaginer_autrement", "label": "Imaginer autrement →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Au-delà des limitations" },

        { type: 'image', url: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94", alt: "" },
        { type: 'message', content: [{"text": "💡 J'aimerais que tu imagines "}, {"text": "au-delà", "bold": true}, {"text": " de cette limitation."}] },
        { type: 'message', content: [{"text": "Einstein disait : "}, {"text": "\"On ne résout pas un problème avec le niveau de pensée qui l'a créé.\"", "italic": true}] },
        { type: 'message', content: [{"text": "En imaginant sans cette limitation, tu ouvres une "}, {"text": "nouvelle réalité", "bold": true}, {"text": "."}] },
        { type: 'message', content: [{"text": "Si cette croyance était "}, {"text": "fausse", "bold": true}, {"text": ", que serait ta vie ?"}] },
        { type: 'narrative', content: [{"text": "💬 Exprime-toi librement (audio ou écrit, comme tu préfères) ", "italic": true}, {"text": "\n\n"}, {"text": "✨ Plus tu partages, plus ta cartographie sera précise insha'Allah ", "italic": true}, {"text": "\n\n"}, {"text": "🎤 Audio uniquement sur WhatsApp !", "italic": true}, {"text": "\n\n"}, {"text": "🤍 Choisis ce qui te met le plus à l'aise", "italic": true}] },
        { type: 'text_input', variable: 'vie_sans_limitation', placeholder: "Ton espace d'expression...", isLong: true },
        { type: 'message', content: [{"text": "Sans cette croyance, que ferais-tu "}, {"text": "différemment dès demain", "bold": true}, {"text": " ?"}] },
        { type: 'narrative', content: [{"text": "💬 Exprime-toi librement (audio ou écrit, comme tu préfères) ", "italic": true}, {"text": "\n\n"}, {"text": "✨ Plus tu partages, plus ta cartographie sera précise insha'Allah ", "italic": true}, {"text": "\n\n"}, {"text": "🎤 Audio uniquement sur WhatsApp !", "italic": true}, {"text": "\n\n"}, {"text": "🤍 Choisis ce qui te met le plus à l'aise", "italic": true}] },
        { type: 'text_input', variable: 'actions_sans_limitation', placeholder: "Ton espace d'expression...", isLong: true },
        { type: 'narrative', content: [{"text": "Es-tu prête à "}, {"text": "questionner", "bold": true}, {"text": " cette croyance ?"}, {"text": "\n\n"}, {"text": "(1 = Elle fait partie de moi, 10 = Je peux la lâcher)", "italic": true}] },
        { type: 'rating', variable: 'prete_lacher_croyance', max: 10, leftLabel: "Partie de moi", rightLabel: "Je peux lâcher" },
        { type: 'message', content: [{"text": "Le simple fait d'imaginer sans cette croyance crée déjà de "}, {"text": "nouvelles possibilités", "bold": true}, {"text": "."}] },
        { type: 'message', content: "📔 Si ces croyances ont éveillé quelque chose en toi..." },
        { type: 'message', content: [{"text": "Voici un espace pour déposer ce qui a besoin d'être "}, {"text": "exprimé", "bold": true}, {"text": " :"}] },
        { type: 'narrative', content: [{"text": "💬 Exprime-toi librement (audio ou écrit, comme tu préfères) ", "italic": true}, {"text": "\n\n"}, {"text": "✨ Plus tu partages, plus ta cartographie sera précise insha'Allah ", "italic": true}, {"text": "\n\n"}, {"text": "🎤 Audio uniquement sur WhatsApp !", "italic": true}, {"text": "\n\n"}, {"text": "🤍 Choisis ce qui te met le plus à l'aise", "italic": true}] },
        { type: 'text_input', variable: 'expression_libre_croyances', placeholder: "Ton espace d'expression...", isLong: true },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Écosystème de soutien" },

        { type: 'image', url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac", alt: "" },
        { type: 'message', content: [{"text": "📍 Parlons maintenant de ton "}, {"text": "écosystème de soutien", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "On ne guérit pas seule."}, {"text": "\n\n"}, {"text": "La qualité de tes relations prédit celle de tes "}, {"text": "amours", "bold": true}, {"text": "."}] },
        { type: 'message', content: [{"text": "💡 Savais-tu que tu deviens la moyenne des "}, {"text": "5 personnes", "bold": true}, {"text": " avec qui tu passes le plus de temps ?"}] },
        { type: 'message', content: [{"text": "Ton cercle influence profondément tes "}, {"text": "standards relationnels", "bold": true}, {"text": "."}] },
        { type: 'message', content: [{"text": "\"Les bons compagnons et les mauvais compagnons sont comme le vendeur de musc et le forgeron\"", "italic": true}, {"text": " (Hadith)"}] },
        { type: 'message', content: [{"text": "Comment décrirais-tu ton "}, {"text": "cercle actuel", "bold": true}, {"text": " ?"}] },
        { type: 'choice', variable: 'cercle_actuel', options: [{"id": "trio_solide_2_3_vraies_ami", "label": "👯 Trio solide • 2-3 vraies amies"}, {"id": "constellation_5_7_liens_va", "label": "🌟 Constellation • 5-7 liens variés"}, {"id": "un_pilier_une_amie_proche", "label": "💫 Un pilier • Une amie proche"}, {"id": "presence_familiale", "label": "👯 Présence familiale"}, {"id": "en_construction_je_choisi", "label": "🏗️ En construction • Je choisis mieux"}, {"id": "solitude_peu_de_liens_pro", "label": "🏜️ Solitude • Peu de liens profonds"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Suite écosystème" },

        { type: 'message', content: "Si tu devais décrire ton cercle proche ? (les personnes que tu cotoies et fréquentes le plus)" },
        { type: 'narrative', content: [{"text": "💬 Exprime-toi librement (audio ou écrit, comme tu préfères) ", "italic": true}, {"text": "\n\n"}, {"text": "✨ Plus tu partages, plus ta cartographie sera précise insha'Allah ", "italic": true}, {"text": "\n\n"}, {"text": "🎤 Audio uniquement sur WhatsApp !", "italic": true}, {"text": "\n\n"}, {"text": "🤍 Choisis ce qui te met le plus à l'aise", "italic": true}] },
        { type: 'text_input', variable: 'jardin_cercle', placeholder: "Ton espace d'expression...", isLong: true },
        { type: 'choice', variable: 'choix', options: [{"id": "identifier_mes_besoins", "label": "Identifier mes besoins →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Besoins de soutien" },

        { type: 'message', content: [{"text": "Quel type de soutien te "}, {"text": "manque", "bold": true}, {"text": " actuellement ?"}] },
        { type: 'message', content: [{"text": "J'aimerais comprendre ce dont tu as "}, {"text": "vraiment besoin", "bold": true}, {"text": "..."}] },
        { type: 'message', content: "Est-ce :" },
        { type: 'message', content: [{"text": "Une présence qui t'écoute "}, {"text": "sans juger", "bold": true}, {"text": " ?"}] },
        { type: 'message', content: [{"text": "Quelqu'un qui comprend ta "}, {"text": "foi et tes valeurs", "bold": true}, {"text": " ?"}] },
        { type: 'message', content: [{"text": "Un mentor qui a traversé des "}, {"text": "épreuves similaires", "bold": true}, {"text": " ?"}] },
        { type: 'message', content: [{"text": "Une communauté de femmes sur le "}, {"text": "même chemin", "bold": true}, {"text": " ?"}] },
        { type: 'message', content: [{"text": "Un soutien professionnel "}, {"text": "spécialisé", "bold": true}, {"text": " ?"}] },
        { type: 'message', content: "Autre chose ?" },
        { type: 'narrative', content: [{"text": "💬 Exprime-toi librement (audio ou écrit, comme tu préfères) ", "italic": true}, {"text": "\n\n"}, {"text": "✨ Plus tu partages, plus ta cartographie sera précise insha'Allah ", "italic": true}, {"text": "\n\n"}, {"text": "🎤 Audio uniquement sur WhatsApp !", "italic": true}, {"text": "\n\n"}, {"text": "🤍 Choisis ce qui te met le plus à l'aise", "italic": true}] },
        { type: 'text_input', variable: 'besoins_soutien', placeholder: "Ton espace d'expression...", isLong: true },
        { type: 'message', content: [{"text": "Qui te "}, {"text": "soutient vraiment", "bold": true}, {"text": " dans ta vie ?"}] },
        { type: 'narrative', content: [{"text": "💬 Exprime-toi librement (audio ou écrit, comme tu préfères) ", "italic": true}, {"text": "\n\n"}, {"text": "✨ Plus tu partages, plus ta cartographie sera précise insha'Allah ", "italic": true}, {"text": "\n\n"}, {"text": "🎤 Audio uniquement sur WhatsApp !", "italic": true}, {"text": "\n\n"}, {"text": "🤍 Choisis ce qui te met le plus à l'aise", "italic": true}] },
        { type: 'text_input', variable: 'qui_soutient', placeholder: "Ton espace d'expression...", isLong: true },
        { type: 'narrative', content: [{"text": "À quel niveau te sens-tu "}, {"text": "soutenue", "bold": true}, {"text": " ?"}, {"text": "\n\n"}, {"text": "(1 = Très seule, 10 = Bien entourée)", "italic": true}] },
        { type: 'rating', variable: 'niveau_soutien', max: 10, leftLabel: "Très seule", rightLabel: "Bien entourée" },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Influences difficiles" },

        { type: 'message', content: [{"text": "💭 Parlons des influences plus "}, {"text": "difficiles", "bold": true}, {"text": "."}] },
        { type: 'message', content: [{"text": "Parfois, certaines personnes de notre entourage, même avec de bonnes intentions, peuvent "}, {"text": "freiner notre évolution", "bold": true}, {"text": "."}] },
        { type: 'message', content: [{"text": "Y a-t-il dans ton cercle des personnes qui "}, {"text": "drainent ton énergie", "bold": true}, {"text": " ou remettent en question ta transformation ?"}] },
        { type: 'message', content: [{"text": "Sans jugement - parfois ce sont ceux qu'on aime qui nous "}, {"text": "limitent le plus", "bold": true}, {"text": "..."}] },
        { type: 'narrative', content: [{"text": "💬 Exprime-toi librement (audio ou écrit, comme tu préfères) ", "italic": true}, {"text": "\n\n"}, {"text": "✨ Plus tu partages, plus ta cartographie sera précise insha'Allah ", "italic": true}, {"text": "\n\n"}, {"text": "🎤 Audio uniquement sur WhatsApp !", "italic": true}, {"text": "\n\n"}, {"text": "🤍 Choisis ce qui te met le plus à l'aise", "italic": true}] },
        { type: 'text_input', variable: 'influences_difficiles', placeholder: "Ton espace d'expression...", isLong: true },
        { type: 'message', content: [{"text": "Comment "}, {"text": "protèges-tu ton énergie", "bold": true}, {"text": " avec ces personnes ?"}] },
        { type: 'narrative', content: [{"text": "💬 Exprime-toi librement (audio ou écrit, comme tu préfères) ", "italic": true}, {"text": "\n\n"}, {"text": "✨ Plus tu partages, plus ta cartographie sera précise insha'Allah ", "italic": true}, {"text": "\n\n"}, {"text": "🎤 Audio uniquement sur WhatsApp !", "italic": true}, {"text": "\n\n"}, {"text": "🤍 Choisis ce qui te met le plus à l'aise", "italic": true}] },
        { type: 'text_input', variable: 'protection_energie', placeholder: "Ton espace d'expression...", isLong: true },
        { type: 'narrative', content: [{"text": "Tu n'es pas "}, {"text": "seule", "bold": true}, {"text": " dans ce voyage."}, {"text": "\n\n"}, {"text": "D'autres soutiens viendront."}] },
        { type: 'message', content: [{"text": "Après ta transformation, qui "}, {"text": "célébrera", "bold": true}, {"text": " avec toi ?"}] },
        { type: 'narrative', content: [{"text": "💬 Exprime-toi librement (audio ou écrit, comme tu préfères) ", "italic": true}, {"text": "\n\n"}, {"text": "✨ Plus tu partages, plus ta cartographie sera précise insha'Allah ", "italic": true}, {"text": "\n\n"}, {"text": "🎤 Audio uniquement sur WhatsApp !", "italic": true}, {"text": "\n\n"}, {"text": "🤍 Choisis ce qui te met le plus à l'aise", "italic": true}] },
        { type: 'text_input', variable: 'qui_celebrera', placeholder: "Ton espace d'expression...", isLong: true },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Forces cachées" },

        { type: 'image', url: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5", alt: "" },
        { type: 'message', content: [{"text": "📍 Découvrons maintenant tes "}, {"text": "forces cachées", "bold": true}, {"text": " dans l'adversité."}] },
        { type: 'message', content: [{"text": "💡 Tes expériences t'ont forgé des "}, {"text": "super-pouvoirs relationnels", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "Chaque épreuve développe une force."}, {"text": "\n\n"}, {"text": "Reconnaître ces forces, c'est "}, {"text": "honorer ton parcours", "bold": true}, {"text": "."}] },
        { type: 'message', content: "Lesquels reconnais-tu chez toi ?" },
        { type: 'choice', variable: 'forces_cachees_f2', multiple: true, options: [{"id": "intuition_hyper_developpee", "label": "🔮 Intuition hyper-développée - Je sens les red flags"}, {"id": "resilience_de_guerriere_j", "label": "⚔️ Résilience de guerrière - Je me relève toujours"}, {"id": "empathie_profonde_je_compr", "label": "💕 Empathie profonde - Je comprends la souffrance"}, {"id": "independance_solide_je_sa", "label": "🏔️ Indépendance solide - Je sais être seule"}, {"id": "capacite_d_amour_intacte", "label": "❤️ Capacité d'amour intacte - Malgré tout"}, {"id": "sagesse_acquise_je_ne_suis", "label": "🦉 Sagesse acquise - Je ne suis plus naïve"}, {"id": "discernement_affine_je_vo", "label": "👁️ Discernement affiné - Je vois au-delà des masques"}, {"id": "force_tranquille_je_n_ai_p", "label": "🌊 Force tranquille - Je n'ai plus besoin de prouver"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Suite forces" },

        { type: 'message', content: [{"text": "Quelle est ta "}, {"text": "plus grande force", "bold": true}, {"text": " en amour ?"}] },
        { type: 'narrative', content: [{"text": "💬 Exprime-toi librement (audio ou écrit, comme tu préfères) ", "italic": true}, {"text": "\n\n"}, {"text": "✨ Plus tu partages, plus ta cartographie sera précise insha'Allah ", "italic": true}, {"text": "\n\n"}, {"text": "🎤 Audio uniquement sur WhatsApp !", "italic": true}, {"text": "\n\n"}, {"text": "🤍 Choisis ce qui te met le plus à l'aise", "italic": true}] },
        { type: 'text_input', variable: 'plus_grande_force_f2', placeholder: "Ton espace d'expression...", isLong: true },
        { type: 'message', content: [{"text": "Comment cette force devient-elle parfois ton "}, {"text": "piège", "bold": true}, {"text": " ?"}] },
        { type: 'message', content: [{"text": "💡 Exemple : Ton indépendance te protège mais peut aussi "}, {"text": "t'isoler", "bold": true}] },
        { type: 'narrative', content: [{"text": "💬 Exprime-toi librement (audio ou écrit, comme tu préfères) ", "italic": true}, {"text": "\n\n"}, {"text": "✨ Plus tu partages, plus ta cartographie sera précise insha'Allah ", "italic": true}, {"text": "\n\n"}, {"text": "🎤 Audio uniquement sur WhatsApp !", "italic": true}, {"text": "\n\n"}, {"text": "🤍 Choisis ce qui te met le plus à l'aise", "italic": true}] },
        { type: 'text_input', variable: 'force_piege_f2', placeholder: "Ton espace d'expression...", isLong: true },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Vulnérabilités" },

        { type: 'message', content: [{"text": "💭 Parlons aussi de tes "}, {"text": "vulnérabilités", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "Les vulnérabilités ne sont pas des faiblesses."}, {"text": "\n\n"}, {"text": "Ce sont des "}, {"text": "zones de croissance", "bold": true}, {"text": " potentielle."}] },
        { type: 'message', content: [{"text": "💭 Savais-tu que nos vulnérabilités sont souvent nos plus grandes "}, {"text": "forces déguisées", "bold": true}, {"text": " ?"}] },
        { type: 'message', content: "L'hypersensibilité peut être de l'intuition.\n\nL'attachement rapide peut être une grande capacité d'amour..." },
        { type: 'message', content: [{"text": "Quelles vulnérabilités reconnais-tu en toi dans le "}, {"text": "domaine relationnel", "bold": true}, {"text": " ?"}] },
        { type: 'message', content: "Exemples pour t'inspirer :" },
        { type: 'message', content: [{"text": "\"Je m'attache trop vite\"", "italic": true}] },
        { type: 'message', content: [{"text": "\"J'ai du mal à faire confiance\"", "italic": true}] },
        { type: 'message', content: [{"text": "\"Je fuis l'intimité\"", "italic": true}] },
        { type: 'message', content: [{"text": "\"Je donne trop, trop vite\"", "italic": true}] },
        { type: 'message', content: [{"text": "\"Je ne sais pas poser mes limites\"", "italic": true}] },
        { type: 'message', content: [{"text": "\"J'idéalise rapidement\"", "italic": true}] },
        { type: 'narrative', content: [{"text": "💬 Exprime-toi librement (audio ou écrit, comme tu préfères) ", "italic": true}, {"text": "\n\n"}, {"text": "✨ Plus tu partages, plus ta cartographie sera précise insha'Allah ", "italic": true}, {"text": "\n\n"}, {"text": "🎤 Audio uniquement sur WhatsApp !", "italic": true}, {"text": "\n\n"}, {"text": "🤍 Choisis ce qui te met le plus à l'aise", "italic": true}] },
        { type: 'text_input', variable: 'vulnerabilites_f2', placeholder: "Ton espace d'expression...", isLong: true },
        { type: 'message', content: [{"text": "💭 Nommer ses vulnérabilités demande un "}, {"text": "courage immense", "bold": true}, {"text": "."}] },
        { type: 'message', content: [{"text": "Si c'est difficile, sache que c'est le signe que tu touches à quelque chose d'"}, {"text": "important", "bold": true}, {"text": " pour ta guérison."}] },
        { type: 'message', content: [{"text": "Comment ces vulnérabilités t'ont-elles aussi "}, {"text": "protégée", "bold": true}, {"text": " ?"}] },
        { type: 'message', content: [{"text": "Chaque vulnérabilité a une "}, {"text": "fonction cachée", "bold": true}, {"text": "..."}] },
        { type: 'narrative', content: [{"text": "💬 Exprime-toi librement (audio ou écrit, comme tu préfères) ", "italic": true}, {"text": "\n\n"}, {"text": "✨ Plus tu partages, plus ta cartographie sera précise insha'Allah ", "italic": true}, {"text": "\n\n"}, {"text": "🎤 Audio uniquement sur WhatsApp !", "italic": true}, {"text": "\n\n"}, {"text": "🤍 Choisis ce qui te met le plus à l'aise", "italic": true}] },
        { type: 'text_input', variable: 'vulnerabilites_protection_f2', placeholder: "Ton espace d'expression...", isLong: true },
        { type: 'message', content: [{"text": "Quelle force aimerais-tu "}, {"text": "développer davantage", "bold": true}, {"text": " ?"}] },
        { type: 'narrative', content: [{"text": "💬 Exprime-toi librement (audio ou écrit, comme tu préfères) ", "italic": true}, {"text": "\n\n"}, {"text": "✨ Plus tu partages, plus ta cartographie sera précise insha'Allah ", "italic": true}, {"text": "\n\n"}, {"text": "🎤 Audio uniquement sur WhatsApp !", "italic": true}, {"text": "\n\n"}, {"text": "🤍 Choisis ce qui te met le plus à l'aise", "italic": true}] },
        { type: 'text_input', variable: 'force_a_developper_f2', placeholder: "Ton espace d'expression...", isLong: true },
        { type: 'message', content: [{"text": "✨ Tu débloques le "}, {"text": "Pilier de la Vulnérabilité", "bold": true}, {"text": "."}] },
        { type: 'message', content: [{"text": "Pour avoir eu le courage de regarder tes zones d'ombre avec "}, {"text": "compassion", "bold": true}, {"text": "."}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Transition vers Phase 3" },

        { type: 'image', url: "https://images.unsplash.com/photo-1603376277241-70b32265cf10?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHNlYXJjaHw2Nnx8Y29uc2Npb3VzfGVufDB8MHx8fDE3NTI4MzEwMjJ8MA&ixlib=rb-4.1.0&q=80&w=1080", alt: "" },
        { type: 'message', content: [{"text": "Magnifique ! La "}, {"text": "Phase Conscience", "bold": true}, {"text": " est complète 💫"}] },
        { type: 'message', content: "Dans cette phase, tu as :" },
        { type: 'message', content: [{"text": "✓ Identifié et questionné tes "}, {"text": "croyances limitantes", "bold": true}] },
        { type: 'message', content: [{"text": "✓ Analysé ton "}, {"text": "écosystème de soutien", "bold": true}] },
        { type: 'message', content: [{"text": "✓ Découvert tes "}, {"text": "forces et vulnérabilités", "bold": true}] },
        { type: 'message', content: [{"text": "Tu connais maintenant tes forces et tes "}, {"text": "zones de croissance", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "🌟 Magnifique ! Tu viens de terminer le Formulaire 1.5 (5/6) !"}, {"text": "\n\n"}, {"text": "Tu as exploré avec courage :"}, {"text": "\n\n"}, {"text": "✓ Tes croyances limitantes sur l'amour"}, {"text": "\n\n"}, {"text": "✓ Ton écosystème de soutien "}, {"text": "\n\n"}, {"text": "✓ Tes forces cachées et vulnérabilités"}, {"text": "\n\n"}, {"text": "Progression : [■■■■■□] 5/6 formulaires complétés"}, {"text": "\n\n"}, {"text": "Tu es maintenant prête pour le dernier formulaire (1.6) où tu vas :"}, {"text": "\n\n"}, {"text": "🦋 Visualiser ta transformation"}, {"text": "\n\n"}, {"text": "🎯 Créer ton plan d'action concret"}, {"text": "\n\n"}, {"text": "🌺 Ancrer le changement durablement"}, {"text": "\n\n"}, {"text": "La "}, {"text": "Phase Germination", "bold": true}, {"text": " de ta cartographie est presque complète. Une dernière étape t'attend pour sceller cette magnifique étape."}, {"text": "\n\n"}, {"text": "Continue vers le Formulaire 1.6 quand tu seras prête... 🌸"}] },

        { type: 'completion', title: "Félicitations !", message: "Tu as terminé F1.5 — Exploration & Transformation. Tes réponses ont été sauvegardées.", icon: '🦋' }
    ]
};

/* ─── Form Registry ─── */
if (typeof window.FORM_REGISTRY === 'undefined') window.FORM_REGISTRY = {};
window.FORM_REGISTRY['f1-5-transformation'] = F1_5_TRANSFORMATION;
