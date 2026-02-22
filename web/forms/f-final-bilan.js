/* ═══════════════════════════════════════
   Le Bilan Final
   Converti depuis Typebot · 48 steps · 8 variables
═══════════════════════════════════════ */

const F_FINAL_BILAN = {
    id: 'f_final_bilan',
    version: 1,
    title: "Le Bilan Final",
    icon: '🏆',
    checkboxId: 'f_final',
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
        "besoin_de_clarte",
        "email",
        "etat_actuel",
        "etat_developpe",
        "prenom",
        "recit_du_vecu",
        "telephone",
        "vecu_du_processus"
],

    steps: [

        /* ════════════════════════════════════ */
        { type: 'section', title: "Ouverture du Dernier Formulaire" },

        { type: 'image', url: "https://images.unsplash.com/photo-1607944632043-1d3443128f41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHNlYXJjaHw3NXx8bGFzdHxlbnwwfDB8fHwxNzU5ODQyOTQ2fDA&ixlib=rb-4.1.0&q=80&w=1080", alt: "" },
        { type: 'message', content: [{"text": "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", "bold": true}, {"text": "\n\n"}, {"text": "Au nom d'Allah, le Tout Miséricordieux, le Très Miséricordieux...", "italic": true}] },
        { type: 'narrative', content: [{"text": "Pendant ces semaines, tu as plongé dans tes profondeurs. Tu as répondu à près de 1"}, {"text": "00 questions", "bold": true}, {"text": ". Tu as remué des souvenirs, touché des blessures, entrevu des patterns, ressenti des émotions parfois oubliées."}, {"text": "\n\n"}, {"text": "C'était "}, {"text": "intense", "bold": true}, {"text": ". C'était "}, {"text": "courageux", "bold": true}, {"text": ". C'était "}, {"text": "nécessaire", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "Maintenant, avant que je crée ta "}, {"text": "cartographie émotionnelle personnalisée", "bold": true}, {"text": " - ce miroir qui te révélera ce que tu as partagé sous un jour nouveau - j'ai besoin de comprendre comment "}, {"text": "TU", "bold": true}, {"text": " as vécu cette exploration."}] },
        { type: 'message', content: [{"text": "Ce dernier formulaire n'est pas une conclusion. C'est un "}, {"text": "pont", "bold": true}, {"text": ". Le pont entre tes questions et mes réponses. Entre ton exploration et ta cartographie. Entre ce que tu as dit et ce que tu as besoin d'entendre."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "je_comprends_continuons", "label": "Je comprends, continuons →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Pourquoi Ce Formulaire Est Crucial" },

        { type: 'message', content: [{"text": "📍 "}, {"text": "Pourquoi Ce Formulaire Est Crucial ?", "bold": true}] },
        { type: 'message', content: [{"text": "Pour créer une cartographie qui te ressemble vraiment", "bold": true}, {"text": "\n\n"}, {"text": "Tu as partagé énormément de choses. Des histoires. Des douleurs. Des espoirs. Des patterns que tu commences peut-être à entrevoir. Mais chaque femme est unique dans ce qu'elle a besoin d'entendre et de comprendre."}] },
        { type: 'narrative', content: [{"text": "Ce formulaire me permet de :"}, {"text": "\n\n"}, {"text": "🎯 "}, {"text": "Comprendre tes priorités", "bold": true}, {"text": "\n\n"}, {"text": "Qu'est-ce qui est le plus important pour toi ? Sur quoi as-tu le plus besoin de clarté ?"}, {"text": "\n\n"}, {"text": "💝 "}, {"text": "Adapter mon approche", "bold": true}, {"text": "\n\n"}, {"text": "Comment as-tu besoin que je te parle ? Avec quelle tonalité ? Quelle profondeur ?"}, {"text": "\n\n"}, {"text": "🔍 "}, {"text": "Cibler tes besoins spécifiques", "bold": true}, {"text": "\n\n"}, {"text": "Y a-t-il des aspects particuliers sur lesquels tu veux que je mette l'accent ?"}, {"text": "\n\n"}, {"text": "🌟 "}, {"text": "Honorer ton expérience unique", "bold": true}, {"text": "\n\n"}, {"text": "Comment as-tu vécu ce processus ? Qu'est-ce qui t'a marquée ?"}] },
        { type: 'choice', variable: 'choix', options: [{"id": "d_accord_je_vais_partager_mes", "label": "D'accord, je vais partager mes besoins →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Identification" },

        { type: 'message', content: [{"text": "📝 "}, {"text": "Identification (pour ta cartographie)", "bold": true}] },
        { type: 'message', content: [{"text": "Ton prénom :", "bold": true}] },
        { type: 'text_input', variable: 'prenom', placeholder: "Ton prénom..." },
        { type: 'message', content: [{"text": "Ton email :", "bold": true}] },
        { type: 'email_input', variable: 'email', placeholder: "ton.email@exemple.com" },
        { type: 'message', content: [{"text": "Ton numéro de téléphone :", "bold": true}] },
        { type: 'phone_input', variable: 'telephone', placeholder: "06 12 34 56 78", defaultPrefix: '+33' },
        { type: 'choice', variable: 'choix', options: [{"id": "commencer_le_temoignage", "label": "Commencer le témoignage →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Partie 1 : Ton Vécu de l'Exploration" },

        { type: 'message', content: [{"text": "📍 "}, {"text": "Première Partie : Ton Vécu de l'Exploration", "bold": true}] },
        { type: 'message', content: [{"text": "Vue d'ensemble de l'expérience", "bold": true}, {"text": "\n\n"}, {"text": "Comment as-tu vécu ce processus d'exploration ?"}] },
        { type: 'choice', variable: 'vecu_du_processus', multiple: true, options: [{"id": "intense_et_remuant_ca_a_br", "label": "💥 Intense et remuant - Ça a brassé beaucoup de choses en moi"}, {"id": "revelateur_mais_difficile", "label": "🔍 Révélateur mais difficile - J'ai découvert des choses pas toujours faciles"}, {"id": "progressif_et_profond_chaq", "label": "📈 Progressif et profond - Chaque phase m'amenait plus loin"}, {"id": "epuisant_emotionnellement", "label": "😔 Épuisant émotionnellement - J'ai donné beaucoup d'énergie"}, {"id": "etonnamment_liberateur_met", "label": "🦋 Étonnamment libérateur - Mettre des mots a fait du bien"}, {"id": "frustrant_par_moments_j_au", "label": "😤 Frustrant par moments - J'aurais voulu des réponses, pas que des questions"}, {"id": "variable_selon_les_jours_p", "label": "🎢 Variable selon les jours - Parfois facile, parfois très dur"}, {"id": "plus_profond_que_je_ne_pensa", "label": "🌊 Plus profond que je ne pensais - Je ne m'attendais pas à aller si loin"}] },
        { type: 'message', content: [{"text": "Raconte avec tes mots comment tu as vécu ces semaines d'exploration :", "bold": true}] },
        { type: 'text_input', variable: 'recit_du_vecu', placeholder: "J'ai vécu cette exploration comme...", isLong: true },
        { type: 'choice', variable: 'choix', options: [{"id": "continuer_vers_mon_etat_actuel", "label": "Continuer vers mon état actuel →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Partie 2 : Ton État Actuel" },

        { type: 'message', content: [{"text": "📍 "}, {"text": "Deuxième Partie : Ton État Actuel", "bold": true}] },
        { type: 'narrative', content: [{"text": "Comment tu te sens maintenant", "bold": true}, {"text": "\n\n"}, {"text": "Après toute cette exploration, comment te sens-tu ?"}, {"text": "\n\n"}, {"text": "(Coche tout ce qui s'applique)", "italic": true}] },
        { type: 'choice', variable: 'etat_actuel', multiple: true, options: [{"id": "emotionnellement_videe_mais", "label": "😔 Émotionnellement vidée mais c'est sain"}, {"id": "pleine_de_questions_sans_rep", "label": "❓ Pleine de questions sans réponses"}, {"id": "curieuse_de_ce_que_la_cartog", "label": "🔍 Curieuse de ce que la cartographie va révéler"}, {"id": "un_peu_anxieuse_de_ce_que_je", "label": "😰 Un peu anxieuse de ce que je vais découvrir"}, {"id": "soulagee_d_avoir_mis_des_mot", "label": "😌 Soulagée d'avoir mis des mots"}, {"id": "impatiente_d_avoir_des_cles", "label": "⏰ Impatiente d'avoir des clés de compréhension"}, {"id": "fatiguee_mais_satisfaite_du", "label": "😴 Fatiguée mais satisfaite du travail fait"}, {"id": "confuse_par_tout_ce_que_j_ai", "label": "😵 Confuse par tout ce que j'ai remué"}, {"id": "optimiste_qu_un_changement_e", "label": "🌟 Optimiste qu'un changement est possible"}, {"id": "reconnaissante_pour_ce_proce", "label": "🙏 Reconnaissante pour ce processus"}] },
        { type: 'message', content: [{"text": "Développe ton état émotionnel actuel :", "bold": true}] },
        { type: 'text_input', variable: 'etat_developpe', placeholder: "Émotionnellement, je me sens...", isLong: true },
        { type: 'choice', variable: 'choix', options: [{"id": "passer_a_mes_besoins_pour_la_c", "label": "Passer à mes besoins pour la cartographie →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Partie 3 : Tes Besoins pour la Cartographie" },

        { type: 'message', content: [{"text": "📍 "}, {"text": "Troisième Partie : Tes Besoins pour la Cartographie", "bold": true}] },
        { type: 'narrative', content: [{"text": "Ce que tu espères y trouver", "bold": true}, {"text": "\n\n"}, {"text": "Qu'est-ce qui est "}, {"text": "LE PLUS", "bold": true}, {"text": " important pour toi dans ta cartographie ?"}] },
        { type: 'text_input', variable: 'reponse', placeholder: "Ce que j'espère trouver dans ma cartographie, ce que je souhaite qu'elle m'apporte........" },
        { type: 'message', content: [{"text": "Sur quoi as-tu le plus besoin de clarté ? Qu'est-ce qui reste le plus confus ?", "bold": true}] },
        { type: 'text_input', variable: 'besoin_de_clarte', placeholder: "J'ai besoin de clarté sur...", isLong: true },
        { type: 'choice', variable: 'choix', options: [{"id": "finaliser_mon_temoignage", "label": "Finaliser mon témoignage →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Clôture Finale" },

        { type: 'message', content: [{"text": "✨ "}, {"text": "Clôture : La Fin de l'Exploration", "bold": true}] },
        { type: 'narrative', content: [{"text": "Tu as terminé.", "bold": true}, {"text": "\n\n"}, {"text": "Le dernier formulaire est complété."}, {"text": "\n\n"}, {"text": "La phase d'exploration est officiellement terminée."}, {"text": "\n\n"}, {"text": "Tu peux souffler."}] },
        { type: 'narrative', content: [{"text": "Avec tout mon respect pour ton courage et ma gratitude pour ta confiance,", "italic": true}, {"text": "\n\n"}, {"text": "Ta cartographie sera à la hauteur de ton investissement inshaAllah.", "italic": true}, {"text": "\n\n"}, {"text": "L'EXPLORATION EST COMPLÈTE", "bold": true}, {"text": "\n\n"}, {"text": "LA CRÉATION DE TA CARTOGRAPHIE COMMENCE", "bold": true}, {"text": "\n\n"}, {"text": "🦋"}] },
        { type: 'narrative', content: [{"text": "📩 Pour m’informer que tu as complété "}, {"text": "la dernière phase de la cartographie", "bold": true}, {"text": ", il te suffit de cliquer sur le lien ci-dessous."}, {"text": "\n\n"}, {"text": "\n Un message pré-rempli s’ouvrira automatiquement sur WhatsApp que tu n’auras qu’à envoyer :"}, {"text": "\n\n"}, {"text": "👉 "}, {"text": "\n\n"}, {"text": "Cela me permet de suivre ton avancée et de finaliser la suite du programme pour toi, insha’Allah."}, {"text": "\n\n"}, {"text": "Je te dis à très vite ! 🌿"}] },

        { type: 'completion', title: "Félicitations !", message: "Tu as terminé Le Bilan Final. Tes réponses ont été sauvegardées.", icon: '🏆' }
    ]
};

/* ─── Form Registry ─── */
if (typeof window.FORM_REGISTRY === 'undefined') window.FORM_REGISTRY = {};
window.FORM_REGISTRY['f-final-bilan'] = F_FINAL_BILAN;
