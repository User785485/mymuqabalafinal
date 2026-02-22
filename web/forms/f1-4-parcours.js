/* ═══════════════════════════════════════
   F1.4 — Ton Parcours
   Converti depuis Typebot · 187 steps · 25 variables
═══════════════════════════════════════ */

const F1_4_PARCOURS = {
    id: 'f1_4_parcours',
    version: 1,
    title: "F1.4 — Ton Parcours",
    icon: '🗺️',
    checkboxId: 'f1_4',
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
        "apprentissages_temps",
        "croyance_transformation",
        "details_declencheur",
        "details_situation",
        "dialogue_5_ans",
        "duree_situation",
        "email_phase_2",
        "emotion_temps",
        "espoir_profond",
        "etat_du_cur",
        "evenement_declencheur",
        "fil_rouge",
        "jamais_revivre",
        "maison_interieure",
        "message_moi_passe",
        "moment_accro",
        "motivation_profonde",
        "nombre_relations",
        "pourquoi_saine",
        "prenom_phase_2",
        "relation_saine",
        "statut_officiel",
        "telephone_phase_2",
        "titre_periode",
        "type_d_homme"
],

    steps: [

        /* ════════════════════════════════════ */
        { type: 'section', title: "Phase finale de Germination" },

        { type: 'image', url: "https://images.unsplash.com/photo-1486639107311-064febaff1c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHNlYXJjaHwxMHx8ZmxldXJ8ZW58MHwwfHx8MTc1MjY2ODM3Nnww&ixlib=rb-4.1.0&q=80&w=1080", alt: "" },
        { type: 'message', content: [{"text": "Formulaire 1.4 : L'Appel intérieur", "bold": true, "italic": true}] },
        { type: 'message', content: "📊 Bienvenue dans le Formulaire 1.4 - quatrième étape de ton voyage !\n\nTu as maintenant complété la moitié du parcours (3 formulaires sur 6).\n\nCette partie explorera ton appel intérieur et ta situation actuelle pour comprendre ce qui t'a menée jusqu'ici." },
        { type: 'message', content: "📊 Avant de continuer, rappelle-moi tes coordonnées." },
        { type: 'message', content: [{"text": "Pour finaliser cette "}, {"text": "première phase", "bold": true}, {"text": " :"}] },
        { type: 'message', content: "Ton prénom ?" },
        { type: 'text_input', variable: 'prenom_phase_2', placeholder: "Ton prénom..." },
        { type: 'message', content: "Ton email ?" },
        { type: 'email_input', variable: 'email_phase_2', placeholder: "ton.email@exemple.com" },
        { type: 'message', content: "Ton téléphone ?" },
        { type: 'phone_input', variable: 'telephone_phase_2', placeholder: "06 12 34 56 78", defaultPrefix: '+33' },
        { type: 'choice', variable: 'choix', options: [{"id": "comprendre_mon_appel", "label": "Comprendre mon appel →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "L'appel intérieur" },

        { type: 'message', content: [{"text": "📍 J'aimerais maintenant comprendre "}, {"text": "l'appel", "bold": true}, {"text": " qui t'a menée jusqu'ici."}] },
        { type: 'message', content: [{"text": "💭 Tu sais, chaque transformation commence par un "}, {"text": "appel", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "Dans les récits de sagesse, l'héroïne reçoit toujours un appel à l'aventure."}, {"text": "\n\n"}, {"text": "Ta présence ici témoigne que tu as "}, {"text": "entendu le tien", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "Ê"}, {"text": "tre ici demande de la détermination et du "}, {"text": "courage", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Reconnaître qu'on mérite mieux demande une force immense."}] },
        { type: 'message', content: [{"text": "💡 C'est important pour moi d'identifier ton "}, {"text": "déclencheur", "bold": true}, {"text": "."}] },
        { type: 'message', content: [{"text": "Reconnaître ce qui t'a poussée à chercher de l'aide n'est pas un aveu de faiblesse - c'est reconnaître ta "}, {"text": "force", "bold": true}, {"text": "."}] },
        { type: 'message', content: [{"text": "Il faut du courage pour dire : "}, {"text": "\"Ça suffit, je mérite mieux.\"", "italic": true}] },
        { type: 'message', content: [{"text": "\"En vérité, Allah ne modifie point l'état d'un peuple, tant que les individus qui le composent ne modifient pas ce qui est en eux-mêmes\"", "italic": true}, {"text": " (13:11)."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "identifier_mon_declencheur", "label": "Identifier mon déclencheur →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "L'événement déclencheur" },

        { type: 'narrative', content: [{"text": "Quel a été "}, {"text": "l'événement", "bold": true}, {"text": " qui t'a menée ici ?"}, {"text": "\n\n"}, {"text": "(Choisis celui qui résonne le plus)", "italic": true}] },
        { type: 'choice', variable: 'evenement_declencheur', options: [{"id": "le_miroir_brise_cette_rup", "label": "💔 Le miroir brisé • \"Cette rupture m'a révélé mes schémas\""}, {"id": "le_disque_raye_le_meme_sc", "label": "🔄 Le disque rayé • \"Le même scénario s'est répété\""}, {"id": "le_temps_qui_passe_cet_an", "label": "🎂 Le temps qui passe • \"Cet anniversaire fut un déclic\""}, {"id": "l_epuisement_interieur_fa", "label": "😔 L'épuisement intérieur • \"Fatiguée de ces cycles\""}, {"id": "la_prise_de_conscience_j", "label": "💡 La prise de conscience • \"J'ai compris que je mérite mieux\""}, {"id": "l_appel_spirituel_dans_ma", "label": "🤲 L'appel spirituel • \"Dans ma connexion au Divin, j'ai vu\""}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Suite événement déclencheur" },

        { type: 'message', content: "💭 Quel que soit l'événement choisi, sache que tu n'es pas la seule." },
        { type: 'narrative', content: [{"text": "83% des femmes arrivent ici après un moment de "}, {"text": "\"trop c'est trop\"", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "C'est le début du changement."}] },
        { type: 'message', content: [{"text": "Veux-tu partager plus de détails sur cet "}, {"text": "événement déclencheur", "bold": true}, {"text": " ?"}] },
        { type: 'message', content: "Qu'est-ce qui s'est vraiment passé ?\n\nComment as-tu su qu'il était temps d'agir pour toi ?" },
        { type: 'narrative', content: [{"text": "💬 Exprime-toi librement (audio ou écrit, comme tu préfères) ", "italic": true}, {"text": "\n\n"}, {"text": "✨ Plus tu partages, plus ta cartographie sera précise insha'Allah ", "italic": true}, {"text": "\n\n"}, {"text": "🎤 Audio uniquement sur WhatsApp !", "italic": true}, {"text": "\n\n"}, {"text": "🤍 Choisis ce qui te met le plus à l'aise", "italic": true}] },
        { type: 'text_input', variable: 'details_declencheur', placeholder: "Ton espace d'expression...", isLong: true },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Motivation profonde" },

        { type: 'image', url: "https://images.unsplash.com/photo-1682685796186-1bb4a5655653?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHNlYXJjaHw1NHx8bW90aXZhdGlvbnxlbnwwfDB8fHwxNzUyODMwOTA4fDA&ixlib=rb-4.1.0&q=80&w=1080", alt: "" },
        { type: 'message', content: [{"text": "Au-delà de l'événement, quelle est ta "}, {"text": "motivation profonde", "bold": true}, {"text": " ? (un seul choix)"}] },
        { type: 'choice', variable: 'motivation_profonde', options: [{"id": "transformer_la_peur_ne_pl", "label": "😨 Transformer la peur • \"Ne plus craindre la solitude\""}, {"id": "comprendre_pourquoi_ces_r", "label": "❓ Comprendre • \"Pourquoi ces répétitions ?\""}, {"id": "guerir_mes_blessures_diri", "label": "🩹 Guérir • \"Mes blessures dirigent ma vie\""}, {"id": "etre_authentique_arreter", "label": "🦋 Être authentique • \"Arrêter les masques\""}, {"id": "donner_du_sens_comprendre", "label": "🔍 Donner du sens • \"Comprendre mon parcours\""}, {"id": "elever_l_amour_un_amour", "label": "🕊️ Élever l'amour • \"Un amour qui élève l'âme\""}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Suite motivation" },

        { type: 'message', content: [{"text": "Reconnaître son appel profond est le "}, {"text": "premier pas", "bold": true}, {"text": " vers la transformation."}] },
        { type: 'message', content: [{"text": "🌟 Pause célébration : Tu viens de nommer ton "}, {"text": "\"pourquoi\"", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "C'est le moment où tout bascule - de spectatrice à "}, {"text": "actrice de ta vie", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Honore ce courage."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "dialoguer_avec_mon_passe", "label": "Dialoguer avec mon passé →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Dialogue avec le passé" },

        { type: 'message', content: [{"text": "💡 J'aimerais maintenant que tu "}, {"text": "dialogues avec ton passé", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "Parler à ton moi passé révèle la "}, {"text": "sagesse acquise", "bold": true}, {"text": " inconsciemment."}, {"text": "\n\n"}, {"text": "C'est reconnaître ton évolution et honorer ton parcours."}] },
        { type: 'message', content: [{"text": "Si tu rencontrais ton moi d'il y a "}, {"text": "5 ans ou 10 ans", "bold": true}, {"text": " que lui dirais-tu ?"}] },
        { type: 'message', content: "Visualise vraiment cette rencontre..." },
        { type: 'message', content: "💡 Imagine-la devant toi.\n\nQue vois-tu dans ses yeux ? Quelle énergie dégage-t-elle ?" },
        { type: 'message', content: [{"text": "Qu'est-ce qui a "}, {"text": "changé", "bold": true}, {"text": " ?"}] },
        { type: 'narrative', content: [{"text": "💬 Exprime-toi librement (audio ou écrit, comme tu préfères) ", "italic": true}, {"text": "\n\n"}, {"text": "✨ Plus tu partages, plus ta cartographie sera précise insha'Allah ", "italic": true}, {"text": "\n\n"}, {"text": "🎤 Audio uniquement sur WhatsApp !", "italic": true}, {"text": "\n\n"}, {"text": "🤍 Choisis ce qui te met le plus à l'aise", "italic": true}] },
        { type: 'text_input', variable: 'dialogue_5_ans', placeholder: "Ton espace d'expression..." },
        { type: 'narrative', content: [{"text": "Cette réponse prouve que tu as "}, {"text": "grandi", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Tu n'es plus celle d'il y a 5 ou 10 ans."}] },
        { type: 'message', content: [{"text": "C'est une "}, {"text": "victoire", "bold": true}, {"text": "."}] },
        { type: 'message', content: [{"text": "En une phrase du cœur, qu'"}, {"text": "espères-tu vraiment", "bold": true}, {"text": " ?"}] },
        { type: 'message', content: [{"text": "Ferme les yeux, connecte-toi à ton "}, {"text": "essence", "bold": true}, {"text": "..."}] },
        { type: 'narrative', content: [{"text": "💬 Exprime-toi librement (audio ou écrit, comme tu préfères) ", "italic": true}, {"text": "\n\n"}, {"text": "✨ Plus tu partages, plus ta cartographie sera précise insha'Allah ", "italic": true}, {"text": "\n\n"}, {"text": "🎤 Audio uniquement sur WhatsApp !", "italic": true}, {"text": "\n\n"}, {"text": "🤍 Choisis ce qui te met le plus à l'aise", "italic": true}] },
        { type: 'text_input', variable: 'espoir_profond', placeholder: "Ton espace d'expression...", isLong: true },
        { type: 'narrative', content: [{"text": "À quel point crois-tu que cette transformation est "}, {"text": "possible pour toi", "bold": true}, {"text": " ?"}, {"text": "\n\n"}, {"text": "(1 = J'ai des doutes, 10 = Je sais que c'est possible)", "italic": true}] },
        { type: 'rating', variable: 'croyance_transformation', max: 10, leftLabel: "J'ai des doutes", rightLabel: "C'est possible" },
        { type: 'message', content: [{"text": "✨ Tu débloques le "}, {"text": "Pilier de l'Authenticité", "bold": true}, {"text": "."}] },
        { type: 'message', content: [{"text": "Pour avoir partagé ta vérité "}, {"text": "sans filtre", "bold": true}, {"text": "."}] },
        { type: 'message', content: [{"text": "\"Ne désespérez pas de la miséricorde d'Allah\"", "italic": true}, {"text": " (39:53)"}] },
        { type: 'choice', variable: 'choix', options: [{"id": "explorer_ma_situation", "label": "Explorer ma situation →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Paysage relationnel" },

        { type: 'image', url: "https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHNlYXJjaHwzfHxwYXlzYWdlfGVufDB8MHx8fDE3NTI2NjkzMDN8MA&ixlib=rb-4.1.0&q=80&w=1080", alt: "" },
        { type: 'message', content: [{"text": "📍 Maintenant, explorons ton "}, {"text": "paysage relationnel actuel", "bold": true}, {"text": "."}] },
        { type: 'message', content: [{"text": "💭 Tu sais, les étiquettes sociales ne disent pas "}, {"text": "tout", "bold": true}, {"text": "."}] },
        { type: 'message', content: [{"text": "\"Célibataire\", \"divorcée\", \"c'est compliqué\"...", "italic": true}, {"text": "\n\n"}, {"text": "Ces mots ne capturent pas ton vécu intérieur."}] },
        { type: 'narrative', content: [{"text": "💡 Tu peux être en couple et te sentir "}, {"text": "seule", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Tu peux être célibataire et te sentir "}, {"text": "complète", "bold": true}, {"text": "."}] },
        { type: 'message', content: [{"text": "Le statut est pour le monde, l'état du cœur est "}, {"text": "ta vérité", "bold": true}, {"text": "."}] },
        { type: 'message', content: [{"text": "Quel est ton "}, {"text": "statut officiel", "bold": true}, {"text": " ?"}] },
        { type: 'choice', variable: 'statut_officiel', options: [{"id": "celibataire_jamais_mariee", "label": "📄 Célibataire • Jamais mariée"}, {"id": "apres_rupture_recemment_se", "label": "📜 Après rupture • Récemment séparée"}, {"id": "en_reconstruction_je_me_r", "label": "🏗️ En reconstruction • Je me reconstruis"}, {"id": "divorcee_le_mariage_s_est", "label": "📑 Divorcée • Le mariage s'est terminé"}, {"id": "veuve_la_vie_a_choisi", "label": "🕊️ Veuve • La vie a choisi"}, {"id": "en_exploration_phase_de_co", "label": "🌱 En exploration • Phase de connaissance"}, {"id": "situation_complexe_diffici", "label": "🌀 Situation complexe • Difficile à définir"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "État du cœur" },

        { type: 'message', content: [{"text": "Et dans ton cœur, comment te "}, {"text": "sens-tu", "bold": true}, {"text": " ?"}] },
        { type: 'choice', variable: 'etat_du_cur', options: [{"id": "disponible_prete_pour_du_n", "label": "🌟 Disponible • Prête pour du nouveau"}, {"id": "encore_habitee_le_passe_oc", "label": "👻 Encore habitée • Le passé occupe l'espace"}, {"id": "en_guerison_je_panse_mes_p", "label": "🏥 En guérison • Je panse mes plaies"}, {"id": "ambivalente_entre_deux_et", "label": "⚖️ Ambivalente • Entre deux états"}, {"id": "en_paix_j_ai_appris_a_m_a", "label": "🏵️ En paix • J'ai appris à m'aimer seule"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Suite état du cœur" },

        { type: 'message', content: [{"text": "Entre ce que le monde voit et ce que ton cœur vit, l'écart est "}, {"text": "normal et humain", "bold": true}, {"text": "."}] },
        { type: 'message', content: [{"text": "Y a-t-il quelque chose de plus que tu aimerais dire sur ta "}, {"text": "situation", "bold": true}, {"text": " ?"}] },
        { type: 'message', content: "Des nuances, des complexités, des choses qu'on ne peut pas mettre dans une case ?" },
        { type: 'narrative', content: [{"text": "💬 Exprime-toi librement (audio ou écrit, comme tu préfères) ", "italic": true}, {"text": "\n\n"}, {"text": "✨ Plus tu partages, plus ta cartographie sera précise insha'Allah ", "italic": true}, {"text": "\n\n"}, {"text": "🎤 Audio uniquement sur WhatsApp !", "italic": true}, {"text": "\n\n"}, {"text": "🤍 Choisis ce qui te met le plus à l'aise", "italic": true}] },
        { type: 'text_input', variable: 'details_situation', placeholder: "Ton espace d'expression...", isLong: true },

        /* ════════════════════════════════════ */
        { type: 'section', title: "La maison intérieure" },

        { type: 'narrative', content: [{"text": "Ta disponibilité émotionnelle est comme une "}, {"text": "maison", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Est-elle ouverte ? En travaux ? Protégée ?"}] },
        { type: 'message', content: [{"text": "Cette image révèle ton "}, {"text": "état réel", "bold": true}, {"text": "."}] },
        { type: 'message', content: "Si ta disponibilité émotionnelle était une maison, comment serait-elle ?" },
        { type: 'message', content: [{"text": "Décris cette "}, {"text": "maison intérieure", "bold": true}, {"text": "..."}] },
        { type: 'message', content: "💡 Ferme les yeux un instant. Visualise cette maison." },
        { type: 'message', content: "Est-elle ouverte ou fermée ? Y a-t-il de la lumière ?\n\nLes portes ont-elles des verrous ? Qui a les clés ?" },
        { type: 'message', content: [{"text": "Comment "}, {"text": "s'y sent-on", "bold": true}, {"text": " ?"}] },
        { type: 'narrative', content: [{"text": "💬 Exprime-toi librement (audio ou écrit, comme tu préfères) ", "italic": true}, {"text": "\n\n"}, {"text": "✨ Plus tu partages, plus ta cartographie sera précise insha'Allah ", "italic": true}, {"text": "\n\n"}, {"text": "🎤 Audio uniquement sur WhatsApp !", "italic": true}, {"text": "\n\n"}, {"text": "🤍 Choisis ce qui te met le plus à l'aise", "italic": true}] },
        { type: 'text_input', variable: 'maison_interieure', placeholder: "Ton espace d'expression...", isLong: true },
        { type: 'narrative', content: [{"text": "Les métaphores révèlent des "}, {"text": "vérités profondes", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Chaque état a sa sagesse."}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Histoire relationnelle" },

        { type: 'image', url: "https://images.unsplash.com/photo-1668076524782-82415fabc084?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHNlYXJjaHwxMTN8fHJlbGF0aW9uc2hpcHxlbnwwfDB8fHwxNzUyODMwODgyfDA&ixlib=rb-4.1.0&q=80&w=1080", alt: "" },
        { type: 'message', content: [{"text": "💫 Parlons brièvement de ton "}, {"text": "histoire relationnelle", "bold": true}, {"text": "."}] },
        { type: 'message', content: "Pas besoin de tout détailler maintenant.\n\nJuste quelques éléments pour comprendre ton parcours." },
        { type: 'narrative', content: [{"text": "Combien de relations "}, {"text": "significatives", "bold": true}, {"text": " as-tu vécues ?"}, {"text": "\n\n"}, {"text": "(Pas besoin de détails, juste pour comprendre ton parcours)", "italic": true}] },
        { type: 'choice', variable: 'nombre_relations', options: [{"id": "0_1", "label": "0-1"}, {"id": "2_3", "label": "2-3"}, {"id": "4_5", "label": "4-5"}, {"id": "plus_de_5", "label": "Plus de 5"}] },
        { type: 'message', content: [{"text": "Si tu devais décrire ton "}, {"text": "\"type\"", "bold": true}, {"text": " d'homme habituel ?"}] },
        { type: 'narrative', content: [{"text": "💬 Exprime-toi librement (audio ou écrit, comme tu préfères) ", "italic": true}, {"text": "\n\n"}, {"text": "✨ Plus tu partages, plus ta cartographie sera précise insha'Allah ", "italic": true}, {"text": "\n\n"}, {"text": "🎤 Audio uniquement sur WhatsApp !", "italic": true}, {"text": "\n\n"}, {"text": "🤍 Choisis ce qui te met le plus à l'aise", "italic": true}] },
        { type: 'text_input', variable: 'type_d_homme', placeholder: "Ton espace d'expression...", isLong: true },
        { type: 'message', content: [{"text": "Le moment où tu sais que tu es "}, {"text": "\"accro\"", "bold": true}, {"text": " dans une relation ? Les signes qui te le montrent ?"}] },
        { type: 'narrative', content: [{"text": "💬 Exprime-toi librement (audio ou écrit, comme tu préfères) "}, {"text": "\n\n"}, {"text": "✨ Plus tu partages, plus ta cartographie sera précise insha'Allah "}, {"text": "\n\n"}, {"text": "🎤 Audio uniquement sur WhatsApp !"}, {"text": "\n\n"}, {"text": "🤍 Choisis ce qui te met le plus à l'aises préfèrent l'écrit pour structurer leurs pensées"}, {"text": "\n\n"}, {"text": "✨ "}, {"text": "Les deux sont parfaits.", "bold": true}, {"text": " Plus tu partages, plus ta cartographie sera précise et transformatrice insha'Allah."}, {"text": "\n\n"}, {"text": " Si tu préfères m'envoyer un "}, {"text": "message audio", "bold": true}, {"text": ", enregistre le directement sur WhatsApp"}, {"text": "\n\n"}, {"text": "🤍 "}, {"text": "Choisis ce qui te met le plus à l'aise", "italic": true}] },
        { type: 'text_input', variable: 'moment_accro', placeholder: "Ton espace d'expression...", isLong: true },
        { type: 'message', content: [{"text": "🔄 Quel est le "}, {"text": "fil rouge", "bold": true}, {"text": " de tes histoires ?"}] },
        { type: 'message', content: "Exemples pour t'inspirer :" },
        { type: 'message', content: [{"text": "\"Je donne toujours trop vite\"", "italic": true}] },
        { type: 'message', content: [{"text": "\"Je choisis des personnes indisponibles\"", "italic": true}] },
        { type: 'message', content: [{"text": "\"Je me perds dans l'intensité\"", "italic": true}] },
        { type: 'message', content: [{"text": "\"J'attends qu'on me choisisse\"", "italic": true}] },
        { type: 'message', content: [{"text": "💬 "}, {"text": "Exprime-toi librement - certaines trouvent l'audio plus naturel pour partager leurs émotions, d'autres préfèrent l'écrit pour structurer leurs pensées. Les deux sont parfaits. Plus tu partages, plus ta cartographie sera précise et transformatrice.", "italic": true}] },
        { type: 'text_input', variable: 'fil_rouge', placeholder: "Ton espace d'expression...", isLong: true },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Relation saine" },

        { type: 'message', content: [{"text": "💝 Quelle a été ta relation la plus "}, {"text": "saine", "bold": true}, {"text": " jusqu'ici ?"}] },
        { type: 'message', content: "Exemples pour t'inspirer :" },
        { type: 'message', content: [{"text": "\"Cette amitié où je suis moi-même\"", "italic": true}] },
        { type: 'message', content: [{"text": "\"Cette relation où j'étais respectée\"", "italic": true}] },
        { type: 'message', content: [{"text": "\"Ce lien où je n'avais pas à performer\"", "italic": true}] },
        { type: 'narrative', content: [{"text": "💬 Exprime-toi librement (audio ou écrit, comme tu préfères) ", "italic": true}, {"text": "\n\n"}, {"text": "✨ Plus tu partages, plus ta cartographie sera précise insha'Allah ", "italic": true}, {"text": "\n\n"}, {"text": "🎤 Audio uniquement sur WhatsApp !", "italic": true}, {"text": "\n\n"}, {"text": "🤍 Choisis ce qui te met le plus à l'aise", "italic": true}] },
        { type: 'text_input', variable: 'relation_saine', placeholder: "Ton espace d'expression...", isLong: true },
        { type: 'message', content: [{"text": "Et qu'est-ce qui la rendait "}, {"text": "saine", "bold": true}, {"text": " ?"}] },
        { type: 'narrative', content: [{"text": "💬 Exprime-toi librement (audio ou écrit, comme tu préfères) ", "italic": true}, {"text": "\n\n"}, {"text": "✨ Plus tu partages, plus ta cartographie sera précise insha'Allah ", "italic": true}, {"text": "\n\n"}, {"text": "🎤 Audio uniquement sur WhatsApp !", "italic": true}, {"text": "\n\n"}, {"text": "🤍 Choisis ce qui te met le plus à l'aise", "italic": true}] },
        { type: 'text_input', variable: 'pourquoi_saine', placeholder: "Ton espace d'expression...", isLong: true },
        { type: 'message', content: [{"text": "Le fait que tu aies connu une relation saine et que tu saches l'identifier prouve que tu "}, {"text": "sais", "bold": true}, {"text": " ce qui est bon pour toi."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "explorer_le_temps_vecu", "label": "Explorer le temps vécu →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Le temps et sa sagesse" },

        { type: 'image', url: "https://images.unsplash.com/photo-1501139083538-0139583c060f", alt: "" },
        { type: 'message', content: [{"text": "📍 Explorons maintenant le "}, {"text": "temps vécu", "bold": true}, {"text": " et sa sagesse."}] },
        { type: 'narrative', content: [{"text": "Le temps passé seule n'est pas du temps "}, {"text": "perdu", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "C'est du temps de maturation."}] },
        { type: 'message', content: [{"text": "Chaque jour t'a "}, {"text": "préparée", "bold": true}, {"text": " pour ce qui vient."}] },
        { type: 'message', content: [{"text": "💭 Tu sais, le temps est "}, {"text": "subjectif", "bold": true}, {"text": "."}] },
        { type: 'message', content: "Pour certaines, 6 mois sont une libération.\n\nPour d'autres, une éternité." },
        { type: 'message', content: [{"text": "Depuis combien de temps es-tu dans cette "}, {"text": "situation", "bold": true}, {"text": " ?"}] },
        { type: 'choice', variable: 'duree_situation', options: [{"id": "moins_de_6_mois", "label": "🌱 Moins de 6 mois"}, {"id": "6_mois_1_an", "label": "📅 6 mois - 1 an"}, {"id": "1_3_ans", "label": "📆 1-3 ans"}, {"id": "3_5_ans", "label": "🗓️ 3-5 ans"}, {"id": "plus_de_5_ans", "label": "⏰ Plus de 5 ans"}, {"id": "je_ne_compte_plus", "label": "∞ Je ne compte plus"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Suite temps" },

        { type: 'message', content: "💭 Quelle que soit la durée,  beaucoup de personnes célibataires ressentent du stress face au temps qui passe." },
        { type: 'message', content: [{"text": "Tu n'es pas "}, {"text": "\"en retard\"", "bold": true}, {"text": " - tu es exactement où tu dois être."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "explorer_mes_emotions", "label": "Explorer mes émotions →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Émotions face au temps" },

        { type: 'message', content: [{"text": "💡 Les émotions face au temps révèlent tes "}, {"text": "peurs cachées", "bold": true}, {"text": "."}] },
        { type: 'message', content: "La honte du \"trop tard\", la peur du \"pour toujours\", la colère du \"pourquoi si long\"." },
        { type: 'message', content: [{"text": "Nommer ces émotions, c'est les "}, {"text": "désarmer", "bold": true}, {"text": "."}] },
        { type: 'message', content: [{"text": "Quelle émotion principale émerge face à cette "}, {"text": "durée", "bold": true}, {"text": " ?"}] },
        { type: 'choice', variable: 'emotion_temps', options: [{"id": "honte_qu_est_ce_qui_ne_va", "label": "😳 Honte • \"Qu'est-ce qui ne va pas chez moi ?\""}, {"id": "peur_et_si_c_etait_perman", "label": "😰 Peur • \"Et si c'était permanent ?\""}, {"id": "colere_c_est_injuste", "label": "😤 Colère • \"C'est injuste\""}, {"id": "acceptation_chaque_chose", "label": "🕊️ Acceptation • \"Chaque chose en son temps\""}, {"id": "gratitude_ce_temps_m_a_co", "label": "🙏 Gratitude • \"Ce temps m'a construite\""}, {"id": "paix_j_apprecie_cet_espa", "label": "☮️ Paix • \"J'apprécie cet espace\""}, {"id": "tristesse_le_temps_passe", "label": "😔 Tristesse • \"Le temps passe\""}, {"id": "fierte_j_ai_grandi_seule", "label": "💪 Fierté • \"J'ai grandi seule\""}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Suite émotions" },

        { type: 'message', content: [{"text": "Toutes ces émotions sont "}, {"text": "humaines et légitimes", "bold": true}, {"text": "."}] },
        { type: 'message', content: [{"text": "Quel message donnerais-tu à toi-même au "}, {"text": "début", "bold": true}, {"text": " de cette période ?"}] },
        { type: 'message', content: "Que dirais-tu à celle qui ne savait pas encore ?" },
        { type: 'narrative', content: [{"text": "💬 Exprime-toi librement (audio ou écrit, comme tu préfères) ", "italic": true}, {"text": "\n\n"}, {"text": "✨ Plus tu partages, plus ta cartographie sera précise insha'Allah ", "italic": true}, {"text": "\n\n"}, {"text": "🎤 Audio uniquement sur WhatsApp !", "italic": true}, {"text": "\n\n"}, {"text": "🤍 Choisis ce qui te met le plus à l'aise", "italic": true}] },
        { type: 'text_input', variable: 'message_moi_passe', placeholder: "Ton espace d'expression...", isLong: true },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Apprentissages du temps" },

        { type: 'image', url: "https://images.unsplash.com/photo-1546525506-495a7647977b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHNlYXJjaHwxN3x8dGltZXxlbnwwfDB8fHwxNzUyODMwODA5fDA&ixlib=rb-4.1.0&q=80&w=1080", alt: "" },
        { type: 'message', content: [{"text": "💡 J'aimerais que tu transformes l'attente en "}, {"text": "sagesse", "bold": true}, {"text": "."}] },
        { type: 'message', content: [{"text": "Ce temps n'était pas \"perdu\" s'il t'a enseigné sur toi, sur la vie, sur ce que tu veux "}, {"text": "vraiment", "bold": true}, {"text": "."}] },
        { type: 'message', content: [{"text": "\"Étonnant est l'affaire du croyant ! Tout est bien pour lui\"", "italic": true}, {"text": " (Hadith)."}] },
        { type: 'message', content: [{"text": "Quels "}, {"text": "apprentissages", "bold": true}, {"text": " cette période t'a-t-elle apportés ?"}] },
        { type: 'narrative', content: [{"text": "💬 Exprime-toi librement (audio ou écrit, comme tu préfères) ", "italic": true}, {"text": "\n\n"}, {"text": "✨ Plus tu partages, plus ta cartographie sera précise insha'Allah ", "italic": true}, {"text": "\n\n"}, {"text": "🎤 Audio uniquement sur WhatsApp !", "italic": true}, {"text": "\n\n"}, {"text": "🤍 Choisis ce qui te met le plus à l'aise", "italic": true}] },
        { type: 'text_input', variable: 'apprentissages_temps', placeholder: "Ton espace d'expression...", isLong: true },
        { type: 'message', content: [{"text": "Si tu pouvais donner un "}, {"text": "titre", "bold": true}, {"text": " à cette période de ta vie ?"}] },
        { type: 'message', content: "Exemples pour t'inspirer :" },
        { type: 'message', content: [{"text": "\"Les années de reconstruction\"", "italic": true}] },
        { type: 'message', content: [{"text": "\"Le désert fertile\"", "italic": true}] },
        { type: 'message', content: [{"text": "\"L'hibernation nécessaire\"", "italic": true}] },
        { type: 'narrative', content: [{"text": "💬 Exprime-toi librement (audio ou écrit, comme tu préfères) ", "italic": true}, {"text": "\n\n"}, {"text": "✨ Plus tu partages, plus ta cartographie sera précise insha'Allah ", "italic": true}, {"text": "\n\n"}, {"text": "🎤 Audio uniquement sur WhatsApp !", "italic": true}, {"text": "\n\n"}, {"text": "🤍 Choisis ce qui te met le plus à l'aise", "italic": true}] },
        { type: 'text_input', variable: 'titre_periode', placeholder: "Ton espace d'expression...", isLong: true },
        { type: 'message', content: [{"text": "Qu'est-ce que tu ne veux "}, {"text": "plus jamais revivre", "bold": true}, {"text": " ?"}] },
        { type: 'narrative', content: [{"text": "💬 Exprime-toi librement (audio ou écrit, comme tu préfères) ", "italic": true}, {"text": "\n\n"}, {"text": "✨ Plus tu partages, plus ta cartographie sera précise insha'Allah ", "italic": true}, {"text": "\n\n"}, {"text": "🎤 Audio uniquement sur WhatsApp !", "italic": true}, {"text": "\n\n"}, {"text": "🤍 Choisis ce qui te met le plus à l'aise", "italic": true}] },
        { type: 'text_input', variable: 'jamais_revivre', placeholder: "Ton espace d'expression...", isLong: true },
        { type: 'message', content: [{"text": "✨ Tu débloques le "}, {"text": "Pilier de la Sagesse", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "Pour avoir transformé l'attente en "}, {"text": "apprentissage", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Chaque leçon est une perle de sagesse."}] },
        { type: 'message', content: "Tu n'as pas attendu en vain." },
        { type: 'choice', variable: 'choix', options: [{"id": "continuer_vers_le_formulaire_1", "label": "Continuer vers le Formulaire 1.5 →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Transition vers Phase 2" },

        { type: 'message', content: [{"text": "Tu as exploré avec "}, {"text": "courage", "bold": true}, {"text": " :"}] },
        { type: 'message', content: [{"text": "✓ Ton "}, {"text": "appel intérieur", "bold": true}, {"text": " et ce qui t'a menée ici"}] },
        { type: 'message', content: [{"text": "✓ Ta "}, {"text": "situation relationnelle", "bold": true}, {"text": " avec authenticité"}] },
        { type: 'message', content: [{"text": "✓ Ton "}, {"text": "histoire", "bold": true}, {"text": " et ses patterns"}] },
        { type: 'message', content: [{"text": "✓ La "}, {"text": "sagesse du temps", "bold": true}, {"text": " vécu"}] },
        { type: 'narrative', content: [{"text": "💫 Tu as acquis "}, {"text": "3 Piliers", "bold": true}, {"text": " :"}, {"text": "\n\n"}, {"text": "Courage • Authenticité • Sagesse", "bold": true}] },
        { type: 'message', content: [{"text": "Dans le"}, {"text": " Formulaire 1.5", "bold": true}, {"text": ", tu vas :"}] },
        { type: 'message', content: "🔍 Explorer tes croyances limitantes sur l'amour" },
        { type: 'message', content: "💪 Découvrir tes forces cachées" },
        { type: 'message', content: "🌟 Analyser ton écosystème de soutien" },
        { type: 'message', content: "🦋 Transformer tes vulnérabilités en puissance" },
        { type: 'message', content: [{"text": "Prête à découvrir les "}, {"text": "ressources cachées", "bold": true}, {"text": " que tu portes ?"}] },
        { type: 'message', content: "🎊 Bravo ! Tu as complété le Formulaire 1.4 (4/6) !\n\nProgression : [■■■■□□] 4/6 formulaires complétés\n\nLe Formulaire 1.5 t'attend pour explorer tes croyances et ressources cachées.\n\nPrête à découvrir tes forces intérieures ? 🌟" },

        { type: 'completion', title: "Félicitations !", message: "Tu as terminé F1.4 — Ton Parcours. Tes réponses ont été sauvegardées.", icon: '🗺️' }
    ]
};

/* ─── Form Registry ─── */
if (typeof window.FORM_REGISTRY === 'undefined') window.FORM_REGISTRY = {};
window.FORM_REGISTRY['f1-4-parcours'] = F1_4_PARCOURS;
