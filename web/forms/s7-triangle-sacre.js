/* ═══════════════════════════════════════
   S7 — Le Triangle Sacré
   Converti depuis Typebot · 116 steps · 9 variables
═══════════════════════════════════════ */

const S7_TRIANGLE_SACRE = {
    id: 's7_triangle_sacre',
    version: 1,
    title: "S7 — Le Triangle Sacré",
    icon: '🔺',
    checkboxId: 's7',
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
        "apprentissage_cle_du_triangle",
        "ce_qui_pese_dans_la_decision",
        "element_decisif_du_changement",
        "premiere_impulsion_face_a_l_ultimatum",
        "strategie_face_au_triangle",
        "style_d_etablissement_des_limites",
        "style_d_influence_familiale",
        "telephone",
        "type_de_triangle_reconnu"
],

    steps: [

        /* ════════════════════════════════════ */
        { type: 'section', title: "Cartographie émotionnelle" },

        { type: 'image', url: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHNlYXJjaHwxfHxmYW1pbHl8ZW58MHx8fHwxNjk2MDAwMDAwfDA&ixlib=rb-4.0.3&q=80&w=1080", alt: "" },
        { type: 'message', content: "👨‍👩‍👧 Scenario 7 : Le Triangle Sacré " },
        { type: 'narrative', content: [{"text": "Bienvenue dans ce nouveau scénario", "bold": true}, {"text": " où nous allons nous attarder sur les liens qui nous façonnent..."}, {"text": "\n\n"}, {"text": "Mais d'abord, j'ai besoin de ces informations..."}] },
        { type: 'text_input', variable: 'reponse', placeholder: "Ton prénom..." },
        { type: 'email_input', variable: 'email', placeholder: "ton.email@exemple.com" },
        { type: 'phone_input', variable: 'telephone', placeholder: "06 12 34 56 78", defaultPrefix: '+33' },
        { type: 'narrative', content: [{"text": "Aujourd'hui, nous explorons les loyautés complexes", "bold": true}, {"text": " qui tissent nos amours..."}, {"text": "\n\n"}, {"text": "Pourrais-tu d'abord me dire..."}] },
        { type: 'message', content: [{"text": "🏠 ", "bold": true}, {"text": "Comment vis-tu l'influence familiale ?"}] },
        { type: 'choice', variable: 'style_d_influence_familiale', options: [{"id": "je_navigue_avec_diplomatie_j", "label": "Je navigue avec diplomatie\n\"J'écoute mais je garde mon cap\""}, {"id": "je_subis_leur_pression_leur_a", "label": "Je subis leur pression\n\"Leur avis pèse lourd sur mes choix\""}, {"id": "je_maintiens_mes_distances_ma", "label": "Je maintiens mes distances\n\"Ma vie privée reste privée\""}, {"id": "je_cherche_leur_approbation_j", "label": "Je cherche leur approbation\n\"J'ai besoin qu'ils valident mes choix\""}, {"id": "je_jongle_constamment_entre_r", "label": "Je jongle constamment\n\"Entre respect et autonomie, c'est complexe\""}] },
        { type: 'message', content: [{"text": "Cette position révèle tes ", "bold": true}, {"text": "stratégies de loyauté", "bold": true}, {"text": "..."}] },
        { type: 'message', content: [{"text": "🌉 Et face aux opinions extérieures..."}, {"text": "\n\n"}, {"text": "Où places-tu ta limite ?", "bold": true}] },
        { type: 'choice', variable: 'style_d_etablissement_des_limites', options: [{"id": "tres_tot_et_fermement", "label": "Très tôt et fermement"}, {"id": "progressivement_avec_douceur", "label": "Progressivement avec douceur"}, {"id": "difficilement_avec_culpabilit", "label": "Difficilement, avec culpabilité"}, {"id": "rarement_je_cede_souvent", "label": "Rarement, je cède souvent"}, {"id": "strategiquement_selon_qui_parl", "label": "Stratégiquement selon qui parle"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "La construction protégée" },

        { type: 'narrative', content: [{"text": "L'amour à deux..."}, {"text": "\n\n"}, {"text": "Une ", "italic": true}, {"text": "illusion nécessaire", "italic": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Jusqu'à ce que le monde ", "bold": true}, {"text": "frappe à la porte", "bold": true}, {"text": "."}] },
        { type: 'image', url: "https://images.unsplash.com/photo-1513279922550-250c2129b13a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHNlYXJjaHwzfHxhbW91cnxlbnwwfDB8fHwxNzU5ODQ0NTI3fDA&ixlib=rb-4.1.0&q=80&w=1080", alt: "" },
        { type: 'message', content: [{"text": "🔺 ", "italic": true}, {"text": "Quand l'amour devient géométrie...", "italic": true}] },
        { type: 'narrative', content: [{"text": "Laisse-moi te raconter l'histoire de ", "bold": true}, {"text": "Yasmine", "bold": true}, {"text": "..."}, {"text": "\n\n"}, {"text": "Une histoire où l'amour doit soudain ", "italic": true}, {"text": "choisir son camp", "italic": true}, {"text": "."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "decouvrir_ce_moment_critique", "label": "Découvrir ce moment critique →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Le paradis avant la tempête" },

        { type: 'narrative', content: [{"text": "Trois mois de construction délicate", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Yasmine et Mehdi ont créé leur bulle. Complicité grandissante, messages constants, cette certitude qu'ils construisent quelque chose de solide", "italic": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Ils ont gardé leur histoire protégée", "bold": true}, {"text": ". \"Le temps de voir si c'est sérieux", "italic": true}, {"text": ",\" disaient-ils."}] },
        { type: 'narrative', content: [{"text": "Ce vendredi soir, Yasmine rentre chez elle, ", "bold": true}, {"text": "rayonnante", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Mehdi vient de lui dire ", "italic": true}, {"text": "\"Je t'aime\"", "italic": true}, {"text": " pour la première fois."}, {"text": "\n\n"}, {"text": "Elle flotte encore quand sa mère l'intercepte :"}] },
        { type: 'narrative', content: [{"text": "\"", "italic": true}, {"text": "Yasmine, on doit parler.", "italic": true}, {"text": "\""}, {"text": "\n\n"}, {"text": "Le salon. Son père. Sa tante. Son frère aîné. Tous ", "bold": true}, {"text": "l'attendent", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "\"", "italic": true}, {"text": "On sait pour Mehdi. La mère de Samira vous a vus au café.", "italic": true}, {"text": "\""}] },
        { type: 'narrative', content: [{"text": "\"", "italic": true}, {"text": "Trois mois cachés ? Tu nous prends pour qui ?", "italic": true}, {"text": "\" Le père, d'habitude si doux."}, {"text": "\n\n"}, {"text": "\"", "italic": true}, {"text": "On a vérifié. Sa famille... ils ne sont pas de notre niveau. Son père est chauffeur de taxi.", "italic": true}, {"text": "\" La tante, toujours stratège."}, {"text": "\n\n"}, {"text": "\"", "italic": true}, {"text": "Tu mérites mieux. On a déjà quelqu'un en vue. Le fils du Dr. Karim.", "italic": true}, {"text": "\" La mère, protectrice."}, {"text": "\n\n"}, {"text": "Le frère reste ", "bold": true}, {"text": "silencieux", "bold": true}, {"text": ", mais son regard dit ", "bold": true}, {"text": "\"choisis bien\"", "bold": true}, {"text": "."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "vivre_ce_dechirement", "label": "Vivre ce déchirement →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Les voix qui s'affrontent" },

        { type: 'message', content: [{"text": "Dans le silence qui suit, ", "bold": true}, {"text": "deux batailles", "bold": true}, {"text": " se livrent..."}] },
        { type: 'narrative', content: [{"text": "💭 ", "bold": true}, {"text": "Dans la tête de Yasmine :"}, {"text": "\n\n"}, {"text": "⚡ ", "italic": true}, {"text": "\"Ils ne le connaissent même pas !\"", "italic": true}, {"text": "\n\n"}, {"text": "💔 ", "italic": true}, {"text": "\"Mais ils m'ont toujours protégée...\"", "italic": true}, {"text": "\n\n"}, {"text": "🔥 ", "italic": true}, {"text": "\"C'est MA vie, MON choix !\"", "italic": true}, {"text": "\n\n"}, {"text": "😢 ", "italic": true}, {"text": "\"Et si je les perdais pour lui ?\"", "italic": true}, {"text": "\n\n"}, {"text": "✨ ", "italic": true}, {"text": "\"Il vient de me dire qu'il m'aime...\"", "italic": true}, {"text": "\n\n"}, {"text": "🌙 ", "italic": true}, {"text": "\"Qu'est-ce qu'Allah attend de moi ?\"", "italic": true}] },
        { type: 'narrative', content: [{"text": "Sa mère reprend : \"Tu as 48 heures pour lui dire que c'est fini. Ou on s'en charge.", "italic": true}, {"text": "\""}, {"text": "\n\n"}, {"text": "Son père ajoute : \"C'est pour ton bien, ma fille. L'amour sans bénédiction familiale ne dure pas.", "italic": true}, {"text": "\""}, {"text": "\n\n"}, {"text": "Yasmine sent son téléphone vibrer", "bold": true}, {"text": ". Message de Mehdi : \"Tu es bien rentrée ? Je t'aime ❤️", "italic": true}, {"text": "\""}, {"text": "\n\n"}, {"text": "Les larmes montent. Le triangle", "bold": true}, {"text": " se referme."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "explorer_ma_propre_reaction", "label": "Explorer ma propre réaction →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Ton propre triangle" },

        { type: 'narrative', content: [{"text": "Avant de voir comment Yasmine navigue cette tempête..."}, {"text": "\n\n"}, {"text": "Plongeons dans ", "bold": true}, {"text": "ta", "bold": true}, {"text": " vérité."}] },
        { type: 'narrative', content: [{"text": "🔺 ", "bold": true}, {"text": "Si tu étais à la place de Yasmine..."}, {"text": "\n\n"}, {"text": "Face à cet ", "italic": true}, {"text": "ultimatum", "italic": true}, {"text": " entre amour et famille..."}, {"text": "\n\n"}, {"text": "Quelle serait ta ", "bold": true}, {"text": "première impulsion", "bold": true}, {"text": " ?"}] },
        { type: 'choice', variable: 'premiere_impulsion_face_a_l_ultimatum', options: [{"id": "la_rebellion_immediate_je_c", "label": "La rébellion immédiate - \"Je choisis l'amour, point\""}, {"id": "la_negociation_desesperee_d", "label": "La négociation désespérée - \"Donnez-lui une chance\""}, {"id": "la_soumission_douloureuse_j", "label": "La soumission douloureuse - \"Je ne peux pas les perdre\""}, {"id": "la_strategie_secrete_je_dis", "label": "La stratégie secrète - \"Je dis oui mais je continue en cachette\""}, {"id": "le_test_ultime_je_lui_dis_t", "label": "Le test ultime - \"Je lui dis tout, voyons s'il se bat pour nous\""}, {"id": "la_pause_necessaire_j_ai_be", "label": "La pause nécessaire - \"J'ai besoin de temps pour réfléchir\""}] },
        { type: 'message', content: [{"text": "Cette impulsion révèle ton ", "bold": true}, {"text": "rapport au conflit de loyauté", "bold": true}, {"text": "..."}] },
        { type: 'narrative', content: [{"text": "Creusons plus ", "bold": true}, {"text": "profond", "bold": true}, {"text": "..."}, {"text": "\n\n"}, {"text": "Dans ce type de situation, qu'est-ce qui ", "bold": true}, {"text": "pèse le plus lourd", "bold": true}, {"text": " dans ton cœur ?"}] },
        { type: 'text_input', variable: 'ce_qui_pese_dans_la_decision', placeholder: "Ce qui influence vraiment ma décision dans ces moments...", isLong: true },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Naviguer l'impossible" },

        { type: 'message', content: [{"text": "Cette conscience est ", "bold": true}, {"text": "cruciale", "bold": true}, {"text": " pour naviguer..."}] },
        { type: 'narrative', content: [{"text": "Revenons à Yasmine..."}, {"text": "\n\n"}, {"text": "Cette nuit-là, elle ne ", "bold": true}, {"text": "dort pas", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "À 3h du matin, elle appelle Mehdi :"}, {"text": "\n\n"}, {"text": "\"", "italic": true}, {"text": "Ils savent. Ils veulent que je te quitte.", "italic": true}, {"text": "\""}, {"text": "\n\n"}, {"text": "Long silence. Puis :"}, {"text": "\n\n"}, {"text": "\"", "italic": true}, {"text": "Qu'est-ce que TU veux, toi ?", "italic": true}, {"text": "\""}] },
        { type: 'narrative', content: [{"text": "\"", "italic": true}, {"text": "Je veux les deux. Toi ET eux.", "italic": true}, {"text": "\""}, {"text": "\n\n"}, {"text": "\"", "italic": true}, {"text": "Alors on va se battre pour ça. Ensemble.", "italic": true}, {"text": "\""}, {"text": "\n\n"}, {"text": "Ils élaborent une ", "bold": true}, {"text": "stratégie", "bold": true}, {"text": " :"}] },
        { type: 'narrative', content: [{"text": "• Mehdi viendra ", "italic": true}, {"text": "demain", "italic": true}, {"text": " parler au père"}, {"text": "\n\n"}, {"text": "• Avec des ", "italic": true}, {"text": "preuves concrètes", "italic": true}, {"text": " de ses projets"}, {"text": "\n\n"}, {"text": "• Yasmine mobilisera sa ", "italic": true}, {"text": "grand-mère", "italic": true}, {"text": ", la seule qui peut influencer son père"}, {"text": "\n\n"}, {"text": "• Ils demanderont ", "italic": true}, {"text": "3 mois", "italic": true}, {"text": " pour prouver leur sérieux"}] },
        { type: 'narrative', content: [{"text": "🌟 ", "bold": true}, {"text": "Face à cette stratégie..."}, {"text": "\n\n"}, {"text": "Quel ", "bold": true}, {"text": "élément clé", "bold": true}, {"text": " ajouterais-tu ?"}] },
        { type: 'choice', variable: 'strategie_face_au_triangle', multiple: true, options: [{"id": "l_approche_spirituelle_invo", "label": "L'approche spirituelle - \"Invoquer les valeurs religieuses communes\""}, {"id": "l_alliance_strategique_gagn", "label": "L'alliance stratégique - \"Gagner d'abord le frère, puis les parents\""}, {"id": "la_transparence_totale_avou", "label": "La transparence totale - \"Avouer les 3 mois et assumer\""}, {"id": "la_demonstration_concrete_m", "label": "La démonstration concrète - \"Montrer des actes, pas des promesses\""}, {"id": "le_temps_comme_allie_laisse", "label": "Le temps comme allié - \"Laisser la colère retomber avant d'agir\""}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "La confrontation décisive" },

        { type: 'narrative', content: [{"text": "Le lendemain, 17h. Mehdi sonne à la porte."}, {"text": "\n\n"}, {"text": "Costume. Dossier en main. ", "bold": true}, {"text": "Déterminé", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "\"", "italic": true}, {"text": "Assalam alaykoum. Je suis Mehdi. Je viens vous parler de mes intentions.", "italic": true}, {"text": "\""}, {"text": "\n\n"}, {"text": "Le père, ", "bold": true}, {"text": "glacial", "bold": true}, {"text": " : \"", "italic": true}, {"text": "Tu as 5 minutes.", "italic": true}, {"text": "\""}, {"text": "\n\n"}, {"text": "Mehdi ouvre son dossier :"}, {"text": "\n\n"}, {"text": "\"", "italic": true}, {"text": "Mon CDI chez Microsoft. Mon plan d'épargne. Le rendez-vous pris avec l'imam pour les fiançailles. Les clés de l'appartement que je viens d'acheter.", "italic": true}, {"text": "\""}] },
        { type: 'narrative', content: [{"text": "La mère ", "bold": true}, {"text": "lève un sourcil", "bold": true}, {"text": ". Le père ", "bold": true}, {"text": "se redresse", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "\"", "italic": true}, {"text": "Mon père était chauffeur de taxi, c'est vrai. Mais il m'a appris que l'honneur d'un homme se mesure à ses actes, pas à son métier.", "italic": true}, {"text": "\""}, {"text": "\n\n"}, {"text": "La grand-mère entre, comme ", "bold": true}, {"text": "prévu", "bold": true}, {"text": " :"}, {"text": "\n\n"}, {"text": "\"", "italic": true}, {"text": "J'ai connu ce garçon à la mosquée. Il dirige la prière du vendredi des jeunes.", "italic": true}, {"text": "\""}] },
        { type: 'narrative', content: [{"text": "Yasmine apparaît dans l'escalier :"}, {"text": "\n\n"}, {"text": "\"", "italic": true}, {"text": "Papa, Mama... Je l'aime. ET je vous aime. Les deux peuvent coexister si vous me faites confiance.", "italic": true}, {"text": "\""}, {"text": "\n\n"}, {"text": "Le silence est ", "bold": true}, {"text": "électrique", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Puis le père : \"", "italic": true}, {"text": "Trois mois. Pour voir. Mais dans les règles.", "italic": true}, {"text": "\""}] },
        { type: 'narrative', content: [{"text": "🔺 ", "bold": true}, {"text": "Dans cette résolution..."}, {"text": "\n\n"}, {"text": "Qu'est-ce qui a ", "bold": true}, {"text": "vraiment", "bold": true}, {"text": " fait basculer les parents selon toi ?"}] },
        { type: 'text_input', variable: 'element_decisif_du_changement', placeholder: "L'élément décisif qui a changé la donne...", isLong: true },

        /* ════════════════════════════════════ */
        { type: 'section', title: "La transformation visible" },

        { type: 'message', content: [{"text": "Cette observation révèle ta ", "bold": true}, {"text": "compréhension des dynamiques familiales", "bold": true}, {"text": "..."}] },
        { type: 'narrative', content: [{"text": "Trois mois plus tard..."}, {"text": "\n\n"}, {"text": "La table familiale. Mehdi ", "bold": true}, {"text": "fait partie du décor", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "Le père lui passe le plat : \"", "italic": true}, {"text": "Alors, ce projet dont tu parlais ?", "italic": true}, {"text": "\""}, {"text": "\n\n"}, {"text": "La mère sourit : \"", "italic": true}, {"text": "Yasmine m'a dit que tu cuisines bien. Il faudra me montrer.", "italic": true}, {"text": "\""}, {"text": "\n\n"}, {"text": "Le frère tape l'épaule de Mehdi : \"", "italic": true}, {"text": "Bienvenue dans la famille, frérot.", "italic": true}, {"text": "\""}, {"text": "\n\n"}, {"text": "La grand-mère observe, ", "bold": true}, {"text": "satisfaite", "bold": true}, {"text": " : \"", "italic": true}, {"text": "L'amour qui résiste devient plus fort.", "italic": true}, {"text": "\""}] },
        { type: 'narrative', content: [{"text": "Yasmine et Mehdi échangent un regard."}, {"text": "\n\n"}, {"text": "Ils n'ont pas eu à ", "italic": true}, {"text": "choisir", "italic": true}, {"text": " entre l'amour et la famille."}, {"text": "\n\n"}, {"text": "Ils ont ", "bold": true}, {"text": "transformé", "bold": true}, {"text": " le triangle en ", "bold": true}, {"text": "cercle", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Un cercle où chacun a trouvé sa ", "italic": true}, {"text": "place", "italic": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "🔺 ", "bold": true}, {"text": "Dans cette transformation..."}, {"text": "\n\n"}, {"text": "Quel ", "bold": true}, {"text": "apprentissage clé", "bold": true}, {"text": " émerge pour toi ?"}] },
        { type: 'text_input', variable: 'apprentissage_cle_du_triangle', placeholder: "Ce que cette navigation m'enseigne...", isLong: true },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Les dynamiques cachées" },

        { type: 'message', content: [{"text": "Cet apprentissage touche au ", "bold": true}, {"text": "cœur", "bold": true}, {"text": " des relations triangulaires..."}] },
        { type: 'message', content: [{"text": "Explorons les ", "bold": true}, {"text": "forces invisibles", "bold": true}, {"text": " à l'œuvre..."}] },
        { type: 'narrative', content: [{"text": "🔺 ", "bold": true}, {"text": "Les 4 Types de Triangles Relationnels :"}, {"text": "\n\n"}, {"text": "1. ", "bold": true}, {"text": "Le Triangle Protecteur", "bold": true}, {"text": "\n\n"}, {"text": "   La famille veut ", "italic": true}, {"text": "protéger", "italic": true}, {"text": " des erreurs"}, {"text": "\n\n"}, {"text": "   → Amour inquiet qui peut étouffer"}, {"text": "\n\n"}, {"text": "2. ", "bold": true}, {"text": "Le Triangle Projectif", "bold": true}, {"text": "\n\n"}, {"text": "   La famille projette ses ", "italic": true}, {"text": "rêves non réalisés", "italic": true}, {"text": "\n\n"}, {"text": "   → Attentes qui ne t'appartiennent pas"}, {"text": "\n\n"}, {"text": "3. ", "bold": true}, {"text": "Le Triangle Compétitif", "bold": true}, {"text": "\n\n"}, {"text": "   Les comparaisons constantes"}, {"text": "\n\n"}, {"text": "   → \"Pourquoi pas comme ta sœur/cousine ?\""}, {"text": "\n\n"}, {"text": "4. ", "bold": true}, {"text": "Le Triangle Culturel", "bold": true}, {"text": "\n\n"}, {"text": "   Les traditions vs modernité"}, {"text": "\n\n"}, {"text": "   → \"Ce n'est pas comme ça qu'on fait\""}] },
        { type: 'narrative', content: [{"text": "💫 ", "bold": true}, {"text": "Les Impacts Sur le Couple :"}, {"text": "\n\n"}, {"text": "• ", "bold": true}, {"text": "Pression externe", "bold": true}, {"text": " → Fragilise l'intimité"}, {"text": "\n\n"}, {"text": "• ", "bold": true}, {"text": "Loyautés divisées", "bold": true}, {"text": " → \"Eux ou moi ?\""}, {"text": "\n\n"}, {"text": "• ", "bold": true}, {"text": "Doutes semés", "bold": true}, {"text": " → \"Ont-ils raison ?\""}, {"text": "\n\n"}, {"text": "• ", "bold": true}, {"text": "Identité questionnée", "bold": true}, {"text": " → \"Qui suis-je vraiment ?\""}] },
        { type: 'narrative', content: [{"text": "⚡ ", "bold": true}, {"text": "La Vérité Libératrice :"}, {"text": "\n\n"}, {"text": "Les familles ne sont pas des ", "italic": true}, {"text": "ennemies", "italic": true}, {"text": " de l'amour."}, {"text": "\n\n"}, {"text": "Elles sont des ", "bold": true}, {"text": "gardiennes anxieuses", "bold": true}, {"text": " du bonheur."}, {"text": "\n\n"}, {"text": "Le défi est de les aider à voir que le bonheur peut prendre des ", "italic": true}, {"text": "formes différentes", "italic": true}, {"text": " de ce qu'elles imaginent."}] },
        { type: 'narrative', content: [{"text": "Dans tes propres triangles..."}, {"text": "\n\n"}, {"text": "Quel ", "bold": true}, {"text": "type", "bold": true}, {"text": " reconnais-tu le plus ?"}] },
        { type: 'choice', variable: 'type_de_triangle_reconnu', multiple: true, options: [{"id": "le_protecteur_qui_etouffe_parf", "label": "Le protecteur qui étouffe parfois"}, {"id": "le_projectif_avec_ses_attentes", "label": "Le projectif avec ses attentes"}, {"id": "le_competitif_et_ses_comparais", "label": "Le compétitif et ses comparaisons"}, {"id": "le_culturel_et_ses_traditions", "label": "Le culturel et ses traditions"}, {"id": "un_melange_complexe_de_tous", "label": "Un mélange complexe de tous"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Le miroir des loyautés" },

        { type: 'image', url: "https://images.unsplash.com/photo-1693774422174-a474207f47e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHNlYXJjaHwzNnx8bG95YWx8ZW58MHwwfHx8MTc1OTg0NTA3N3ww&ixlib=rb-4.1.0&q=80&w=1080", alt: "" },
        { type: 'message', content: [{"text": "Ta navigation révèle une ", "bold": true}, {"text": "maturité touchante", "bold": true}, {"text": "..."}] },
        { type: 'narrative', content: [{"text": "✨ Dans cette exploration du triangle, tu montres une sagesse particulière", "bold": true}, {"text": " :"}, {"text": "\n\n"}, {"text": "Tu comprends que l'amour ne vit pas en vase clos", "italic": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Il existe dans un écosystème", "bold": true}, {"text": " de relations, d'histoires, d'attentes."}, {"text": "\n\n"}, {"text": "Tu cherches non pas à couper ces liens mais à les transformer", "italic": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "Ce qui émerge de ton exploration :", "bold": true}, {"text": "\n\n"}, {"text": "• Tu navigues entre ", "italic": true}, {"text": "respect", "italic": true}, {"text": " et ", "italic": true}, {"text": "autonomie", "italic": true}, {"text": "\n\n"}, {"text": "• Tu cherches à ", "italic": true}, {"text": "honorer", "italic": true}, {"text": " sans te ", "italic": true}, {"text": "trahir", "italic": true}, {"text": "\n\n"}, {"text": "• Tu veux ", "italic": true}, {"text": "construire des ponts", "italic": true}, {"text": " pas des murs"}, {"text": "\n\n"}, {"text": "• Tu comprends la ", "italic": true}, {"text": "complexité", "italic": true}, {"text": " des loyautés"}] },
        { type: 'narrative', content: [{"text": "Le défi n'est pas de ", "italic": true}, {"text": "choisir", "italic": true}, {"text": " entre l'amour et la famille."}, {"text": "\n\n"}, {"text": "C'est de créer un ", "bold": true}, {"text": "espace", "bold": true}, {"text": " où les deux peuvent ", "bold": true}, {"text": "coexister", "bold": true}, {"text": ", même imparfaitement."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "comprendre_l_art_de_naviguer", "label": "Comprendre l'art de naviguer →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "L'art de la navigation familiale" },

        { type: 'message', content: [{"text": "Laisse-moi t'éclairer sur l'", "bold": true}, {"text": "art délicat", "bold": true}, {"text": " de naviguer les triangles..."}] },
        { type: 'message', content: [{"text": "🧭 ", "bold": true}, {"text": "Les 5 Principes de Navigation :"}] },
        { type: 'narrative', content: [{"text": "1. ", "bold": true}, {"text": "Comprendre Avant d'Être Compris", "bold": true}, {"text": "\n\n"}, {"text": "D'où viennent leurs ", "italic": true}, {"text": "peurs", "italic": true}, {"text": " ?"}, {"text": "\n\n"}, {"text": "Quelle ", "italic": true}, {"text": "histoire", "italic": true}, {"text": " portent-ils ?"}, {"text": "\n\n"}, {"text": "Qu'est-ce qu'ils veulent ", "italic": true}, {"text": "vraiment", "italic": true}, {"text": " pour toi ?"}, {"text": "\n\n"}, {"text": "→ La compréhension ", "bold": true}, {"text": "désarme", "bold": true}, {"text": " la résistance"}] },
        { type: 'narrative', content: [{"text": "2. ", "bold": true}, {"text": "Différencier Forme et Fond", "bold": true}, {"text": "\n\n"}, {"text": "Forme : ", "italic": true}, {"text": "\"Il n'est pas assez bien\"", "italic": true}, {"text": "\n\n"}, {"text": "Fond : ", "italic": true}, {"text": "\"J'ai peur que tu souffres\"", "italic": true}, {"text": "\n\n"}, {"text": "→ Répondre au ", "bold": true}, {"text": "fond", "bold": true}, {"text": ", pas à la forme"}] },
        { type: 'narrative', content: [{"text": "3. ", "bold": true}, {"text": "Créer des Alliés, Pas des Camps", "bold": true}, {"text": "\n\n"}, {"text": "Ce n'est pas ", "italic": true}, {"text": "\"nous contre eux\"", "italic": true}, {"text": "\n\n"}, {"text": "C'est ", "italic": true}, {"text": "\"nous tous ensemble\"", "italic": true}, {"text": "\n\n"}, {"text": "→ L'inclusion ", "bold": true}, {"text": "transforme", "bold": true}, {"text": " la dynamique"}] },
        { type: 'narrative', content: [{"text": "4. ", "bold": true}, {"text": "Honorer Sans Se Soumettre", "bold": true}, {"text": "\n\n"}, {"text": "   \"Je respecte votre inquiétude\""}, {"text": "\n\n"}, {"text": "   \"ET je fais confiance à mon choix\""}, {"text": "\n\n"}, {"text": "5. ", "bold": true}, {"text": "Le Temps Comme Allié", "bold": true}, {"text": "\n\n"}, {"text": "   Les transformations prennent du temps"}, {"text": "\n\n"}, {"text": "   → La patience est une ", "bold": true}, {"text": "stratégie", "bold": true}] },
        { type: 'choice', variable: 'choix', options: [{"id": "recevoir_mes_outils_pratiques", "label": "Recevoir mes outils pratiques →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Trois clés pour harmoniser" },

        { type: 'message', content: [{"text": "Pour transformer les triangles en ", "bold": true}, {"text": "cercles d'amour", "bold": true}, {"text": "..."}] },
        { type: 'narrative', content: [{"text": "🔑 ", "bold": true}, {"text": "1. Le Pont de Traduction", "bold": true}, {"text": "\n\n"}, {"text": "Deviens ", "bold": true}, {"text": "traductrice", "bold": true}, {"text": " entre les mondes :"}, {"text": "\n\n"}, {"text": "• À ta famille : ", "italic": true}, {"text": "\"Voici pourquoi il me rend heureuse...\"", "italic": true}, {"text": "\n\n"}, {"text": "  Traduire ses ", "bold": true}, {"text": "qualités", "bold": true}, {"text": " dans leur ", "bold": true}, {"text": "langage", "bold": true}, {"text": "\n\n"}, {"text": "• À ton partenaire : ", "italic": true}, {"text": "\"Voici ce qui les inquiète vraiment...\"", "italic": true}, {"text": "\n\n"}, {"text": "  Traduire leurs ", "bold": true}, {"text": "peurs", "bold": true}, {"text": " en ", "bold": true}, {"text": "besoins", "bold": true}, {"text": "\n\n"}, {"text": "Tu deviens le ", "italic": true}, {"text": "pont", "italic": true}, {"text": " qui unit au lieu du ", "italic": true}, {"text": "champ de bataille", "italic": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "🌟 ", "bold": true}, {"text": "2. Les Rituels d'Inclusion", "bold": true}, {"text": "\n\n"}, {"text": "Créez des ", "bold": true}, {"text": "moments", "bold": true}, {"text": " qui incluent sans envahir :"}, {"text": "\n\n"}, {"text": "• Dîners ", "italic": true}, {"text": "réguliers", "italic": true}, {"text": " mais pas ", "italic": true}, {"text": "obligatoires", "italic": true}, {"text": "\n\n"}, {"text": "• Partage de ", "italic": true}, {"text": "bonnes nouvelles", "italic": true}, {"text": " en premier"}, {"text": "\n\n"}, {"text": "• Demander des ", "italic": true}, {"text": "conseils", "italic": true}, {"text": " sur leurs expertises"}, {"text": "\n\n"}, {"text": "• Célébrer leurs ", "italic": true}, {"text": "occasions", "italic": true}, {"text": " importantes"}, {"text": "\n\n"}, {"text": "L'inclusion ", "bold": true}, {"text": "choisie", "bold": true}, {"text": " remplace l'intrusion ", "italic": true}, {"text": "subie", "italic": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "💫 ", "bold": true}, {"text": "3. La Stratégie des Petites Victoires", "bold": true}, {"text": "\n\n"}, {"text": "Construis la confiance ", "bold": true}, {"text": "progressivement", "bold": true}, {"text": " :"}, {"text": "\n\n"}, {"text": "• Commence par des ", "italic": true}, {"text": "promesses simples", "italic": true}, {"text": " tenues"}, {"text": "\n\n"}, {"text": "• Montre des ", "italic": true}, {"text": "preuves concrètes", "italic": true}, {"text": " de stabilité"}, {"text": "\n\n"}, {"text": "• Implique-les dans des ", "italic": true}, {"text": "décisions mineures", "italic": true}, {"text": "\n\n"}, {"text": "• Célèbre les ", "italic": true}, {"text": "moments d'harmonie", "italic": true}, {"text": "\n\n"}, {"text": "Chaque ", "bold": true}, {"text": "petite victoire", "bold": true}, {"text": " construit le ", "bold": true}, {"text": "grand pont", "bold": true}, {"text": "."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "explorer_la_dimension_spiritue", "label": "Explorer la dimension spirituelle →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "La dimension sacrée des liens" },

        { type: 'message', content: [{"text": "Il y a une ", "bold": true}, {"text": "sagesse divine", "bold": true}, {"text": " dans les liens familiaux..."}] },
        { type: 'image', url: "https://images.unsplash.com/photo-1504439268584-b72c5019471e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHNlYXJjaHw1fHxmYW1pbGxlfGVufDB8MHx8fDE3NTk4NDUwNTh8MA&ixlib=rb-4.1.0&q=80&w=1080", alt: "" },
        { type: 'narrative', content: [{"text": "🤲 ", "italic": true}, {"text": "\"Et ton Seigneur a décrété que vous n'adoriez que Lui et que vous soyez bienfaisants envers vos parents.\"", "italic": true}, {"text": "\n\n"}, {"text": "Mais aussi :"}, {"text": "\n\n"}, {"text": "\"", "italic": true}, {"text": "Et parmi Ses signes Il a créé de vous, pour vous, des épouses pour que vous viviez en tranquillité avec elles.", "italic": true}, {"text": "\""}] },
        { type: 'narrative', content: [{"text": "L'Islam nous enseigne l'", "bold": true}, {"text": "équilibre", "bold": true}, {"text": " :"}, {"text": "\n\n"}, {"text": "• ", "bold": true}, {"text": "Birr al-walidayn", "bold": true}, {"text": " - La bonté envers les parents"}, {"text": "\n\n"}, {"text": "  Sans que cela signifie ", "italic": true}, {"text": "obéissance aveugle", "italic": true}, {"text": "\n\n"}, {"text": "• ", "bold": true}, {"text": "Haqq az-zawj", "bold": true}, {"text": " - Les droits de l'époux"}, {"text": "\n\n"}, {"text": "  Sans que cela ", "italic": true}, {"text": "efface", "italic": true}, {"text": " les liens familiaux"}, {"text": "\n\n"}, {"text": "• ", "bold": true}, {"text": "Silat ar-rahim", "bold": true}, {"text": " - Maintenir les liens"}, {"text": "\n\n"}, {"text": "  Même quand c'est ", "italic": true}, {"text": "difficile", "italic": true}] },
        { type: 'narrative', content: [{"text": "La sagesse est de comprendre :"}, {"text": "\n\n"}, {"text": "Respecter ne signifie pas toujours ", "italic": true}, {"text": "obéir", "italic": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Aimer ne signifie pas toujours ", "italic": true}, {"text": "céder", "italic": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Honorer peut se faire tout en ", "bold": true}, {"text": "affirmant", "bold": true}, {"text": " ses choix avec ", "bold": true}, {"text": "douceur", "bold": true}, {"text": "."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "integrer_l_essence", "label": "Intégrer l'essence →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "L'essence à retenir" },

        { type: 'message', content: "De ce voyage dans le triangle sacré, retiens ceci..." },
        { type: 'narrative', content: [{"text": "🌸 ", "bold": true}, {"text": "Ta famille n'est pas ton ennemie"}, {"text": "\n\n"}, {"text": "Leurs ", "italic": true}, {"text": "inquiétudes", "italic": true}, {"text": " sont souvent de l'", "bold": true}, {"text": "amour maladroit", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Apprends à voir l'", "italic": true}, {"text": "amour", "italic": true}, {"text": " sous la ", "italic": true}, {"text": "pression", "italic": true}, {"text": "."}, {"text": "\n\n"}, {"text": "🌸 ", "bold": true}, {"text": "L'autonomie n'est pas l'abandon"}, {"text": "\n\n"}, {"text": "Tu peux ", "italic": true}, {"text": "choisir ta vie", "italic": true}, {"text": " tout en ", "italic": true}, {"text": "honorant tes racines", "italic": true}, {"text": "."}, {"text": "\n\n"}, {"text": "C'est un ", "bold": true}, {"text": "art délicat", "bold": true}, {"text": " mais ", "bold": true}, {"text": "possible", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "🌸 ", "bold": true}, {"text": "Le temps est ton allié"}, {"text": "\n\n"}, {"text": "Les ", "italic": true}, {"text": "transformations", "italic": true}, {"text": " familiales sont ", "italic": true}, {"text": "lentes", "italic": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Patience et ", "bold": true}, {"text": "constance", "bold": true}, {"text": " font plus que ", "italic": true}, {"text": "confrontation", "italic": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "Le plus important :", "bold": true}, {"text": "\n\n"}, {"text": "Tu n'as pas à choisir entre ", "italic": true}, {"text": "être aimée", "italic": true}, {"text": " et ", "italic": true}, {"text": "être toi-même", "italic": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Tu peux ", "bold": true}, {"text": "créer", "bold": true}, {"text": " un espace où ton ", "bold": true}, {"text": "authenticité", "bold": true}, {"text": " et leurs ", "bold": true}, {"text": "besoins", "bold": true}, {"text": " coexistent."}, {"text": "\n\n"}, {"text": "Même si c'est ", "italic": true}, {"text": "imparfait", "italic": true}, {"text": ". Surtout si c'est ", "italic": true}, {"text": "imparfait", "italic": true}, {"text": "."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "recevoir_la_benediction_finale", "label": "Recevoir la bénédiction finale →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "La bénédiction des liens" },

        { type: 'message', content: "Avant de nous quitter, reçois cette..." },
        { type: 'narrative', content: [{"text": "Que tu sois celle qui ", "italic": true}, {"text": "navigue facilement", "italic": true}, {"text": " ou celle qui ", "italic": true}, {"text": "lutte", "italic": true}, {"text": " entre les mondes..."}, {"text": "\n\n"}, {"text": "Que tu portes des ", "italic": true}, {"text": "loyautés légères", "italic": true}, {"text": " ou des ", "italic": true}, {"text": "attentes lourdes", "italic": true}, {"text": "..."}, {"text": "\n\n"}, {"text": "Sache que tu es ", "bold": true}, {"text": "capable", "bold": true}, {"text": " de créer l'", "bold": true}, {"text": "harmonie", "bold": true}, {"text": " dont tu rêves."}] },
        { type: 'narrative', content: [{"text": "Puisses-tu trouver quelqu'un qui comprend que t'aimer, c'est aussi ", "italic": true}, {"text": "honorer", "italic": true}, {"text": " d'où tu viens..."}, {"text": "\n\n"}, {"text": "Quelqu'un qui sait ", "bold": true}, {"text": "gagner", "bold": true}, {"text": " le cœur de ta famille tout en ", "bold": true}, {"text": "gardant", "bold": true}, {"text": " le tien."}, {"text": "\n\n"}, {"text": "Quelqu'un qui transforme le ", "italic": true}, {"text": "triangle", "italic": true}, {"text": " en ", "italic": true}, {"text": "cercle", "italic": true}, {"text": " où tous ont leur ", "bold": true}, {"text": "place", "bold": true}, {"text": "."}] },
        { type: 'message', content: "👨‍👩‍👧✨" },
        { type: 'choice', variable: 'choix', options: [{"id": "celebrer_ce_voyage", "label": "Célébrer ce voyage →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Gratitude et célébration" },

        { type: 'image', url: "https://images.unsplash.com/photo-1757317202556-a87236bdb48b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NTk4NDUwMDR8&ixlib=rb-4.1.0&q=80&w=1080", alt: "" },
        { type: 'message', content: [{"text": "Quelle exploration ", "bold": true}, {"text": "profonde", "bold": true}, {"text": " tu viens d'accomplir..."}] },
        { type: 'narrative', content: [{"text": "Explorer le triangle sacré", "bold": true}, {"text": ", c'est reconnaître que l'amour n'existe pas en isolation", "italic": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Tu as osé regarder les loyautés complexes, naviguer les attentes multiples, imaginer l'harmonie possible", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "Tes réponses enrichissent ta ", "bold": true}, {"text": "cartographie émotionnelle personnelle", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Chaque prise de conscience sur tes ", "italic": true}, {"text": "navigations", "italic": true}, {"text": " te rapproche de relations plus ", "bold": true}, {"text": "harmonieuses", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Tu apprends l'art délicat d'", "italic": true}, {"text": "honorer", "italic": true}, {"text": " sans te ", "italic": true}, {"text": "perdre", "italic": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "Tu découvres que la famille n'est pas un ", "italic": true}, {"text": "obstacle", "italic": true}, {"text": " à l'amour.", "bold": true}, {"text": "\n\n"}, {"text": "Elle peut être un ", "bold": true}, {"text": "jardin", "bold": true}, {"text": " où l'amour ", "bold": true}, {"text": "grandit", "bold": true}, {"text": " différemment."}, {"text": "\n\n"}, {"text": "Avec de la ", "italic": true}, {"text": "patience", "italic": true}, {"text": ", de la ", "italic": true}, {"text": "sagesse", "italic": true}, {"text": ", et beaucoup d'", "italic": true}, {"text": "amour", "italic": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "Continue de naviguer avec ", "bold": true}, {"text": "grâce", "bold": true}, {"text": " et ", "bold": true}, {"text": "détermination", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Chaque pont que tu construis entre les mondes est une ", "bold": true}, {"text": "victoire", "bold": true}, {"text": " pour l'amour."}] },
        { type: 'message', content: [{"text": "À très vite pour la suite de ton parcours ", "bold": true}, {"text": "Love Transformations™", "bold": true}, {"text": " insha'Allah…✨"}] },
        { type: 'message', content: [{"text": "🔺 ", "bold": true}, {"text": "Fin du Scénario 7 : Le Triangle Sacré", "bold": true}, {"text": " 🔺"}] },

        { type: 'completion', title: "Félicitations !", message: "Tu as terminé S7 — Le Triangle Sacré. Tes réponses ont été sauvegardées.", icon: '🔺' }
    ]
};

/* ─── Form Registry ─── */
if (typeof window.FORM_REGISTRY === 'undefined') window.FORM_REGISTRY = {};
window.FORM_REGISTRY['s7-triangle-sacre'] = S7_TRIANGLE_SACRE;
