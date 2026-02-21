/* ═══════════════════════════════════════
   F1 EXPRESS V2 — L'Empreinte
   Les Racines de Ton Coeur
   23 questions · 26 variables · ~80 steps
═══════════════════════════════════════ */

const F1_EXPRESS = {
    id: 'f1_express_v2',
    title: "L'Empreinte — Les Racines de Ton C\u0153ur",
    icon: '\uD83C\uDF31',
    checkboxId: 'exp1',
    theme: {
        background: '#FAF9F6',
        botBubbleBg: '#F8F7F4',
        botBubbleText: '#2F4F3F',
        botBubbleBorder: '#A8D5BA',
        userBubbleBg: '#6B8E7F',
        userBubbleText: '#FAF9F6',
        buttonBg: '#6B8E7F',
        buttonText: '#FAF9F6',
        inputBg: '#FAF9F6',
        inputText: '#2F4F3F',
        inputBorder: '#A8D5BA',
        progressFill: '#A8D5BA',
        progressBg: '#F5F5F5'
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
        'prenom', 'email', 'telephone',
        'prete', 'contexte_relation', 'statut_relationnel',
        'duree_relation', 'etat_coeur', 'declencheur',
        'attente_accompagnement', 'anxiete', 'confiance_soi',
        'gestion_emotions', 'qualite_sommeil', 'isolement_social',
        'communication_besoins', 'relation_parents',
        'blessure_enfance', 'schema_repete', 'pattern_detail',
        'valeur_prioritaire', 'deal_breaker', 'vision_couple',
        'blocage_principal', 'pret_engagement', 'message_libre'
    ],

    steps: [

        /* ════════════════════════════════════
           SECTION 0 : ACCUEIL
        ════════════════════════════════════ */

        { type: 'image', url: 'https://s3.typebot.io/public/workspaces/cm3ydmyqn005xmp0hqrxnxwif/typebots/cm6b7a3u6001smp0h8zzv9g5r/blocks/s7v7wuypxf4bi6h78ilqvh3j?v=1738439683882' },

        { type: 'message', content: [{ bold: true, text: 'Bismillah.' }] },

        { type: 'message', content: "Bienvenue dans cet espace qui t'est enti\u00e8rement d\u00e9di\u00e9." },

        { type: 'message', content: "Je suis Mohamed, ton accompagnant th\u00e9rapeutique. Ce formulaire est le premier pas d'un voyage profond \u00e0 la rencontre de toi-m\u00eame." },

        { type: 'message', content: "Ici, il n'y a ni jugement, ni bonne ou mauvaise r\u00e9ponse. Juste toi, ton c\u0153ur, et un espace de sinc\u00e9rit\u00e9." },

        { type: 'message', content: [
            { text: "Prends ton temps. " },
            { bold: true, text: "R\u00e9ponds avec le c\u0153ur." },
            { text: " Tu peux revenir dessus plus tard si besoin." }
        ]},

        { type: 'message', content: "Pr\u00eate \u00e0 commencer ?" },

        { type: 'choice', variable: 'prete', options: [
            { id: 'oui', label: 'Oui, je suis pr\u00eate \uD83C\uDF3F' }
        ]},


        /* ════════════════════════════════════
           SECTION 1 : TON CONTEXTE ACTUEL
        ════════════════════════════════════ */

        { type: 'section', title: 'Ton contexte actuel' },

        { type: 'message', content: "Merci pour ta confiance. \uD83D\uDE4F" },

        { type: 'message', content: "Commen\u00e7ons par faire connaissance. Quel est ton pr\u00e9nom ?" },

        // Q1 : Prenom
        { type: 'text_input', variable: 'prenom', placeholder: 'Ton pr\u00e9nom...' },

        { type: 'message', content: "Enchant\u00e9 {{prenom}} \uD83C\uDF38" },

        { type: 'message', content: "Quelle est ton adresse email ? (pour recevoir ton r\u00e9capitulatif)" },

        // Q2 : Email
        { type: 'email_input', variable: 'email', placeholder: 'ton.email@exemple.com' },

        { type: 'message', content: "Parfait. Et ton num\u00e9ro de t\u00e9l\u00e9phone ?" },

        // Q3 : Telephone
        { type: 'phone_input', variable: 'telephone', placeholder: '06 12 34 56 78', defaultPrefix: '+33' },

        { type: 'message', content: "Merci {{prenom}}. Maintenant, parlons un peu de toi et de ta situation actuelle." },


        /* ════════════════════════════════════
           SECTION 2 : TA SITUATION RELATIONNELLE
        ════════════════════════════════════ */

        { type: 'section', title: 'Ta situation relationnelle' },

        { type: 'message', content: [
            { bold: true, text: "Comment d\u00e9crirais-tu ta situation relationnelle actuelle ?" }
        ]},

        // Q4 : Statut relationnel
        { type: 'choice', variable: 'statut_relationnel', multiple: false, options: [
            { id: 'celibataire_jamais', label: "C\u00e9libataire \u2014 jamais \u00e9t\u00e9 en couple" },
            { id: 'celibataire_rupture', label: "C\u00e9libataire \u2014 suite \u00e0 une rupture" },
            { id: 'relation_compliquee', label: "En relation mais c'est compliqu\u00e9" },
            { id: 'relation_questionnement', label: "En relation avec des questionnements" },
            { id: 'situation_floue', label: "Situation floue (talking stage, etc.)" }
        ]},

        { type: 'message', content: "Je comprends. Et depuis combien de temps es-tu dans cette situation ?" },

        // Q5 : Duree relation/situation
        { type: 'choice', variable: 'duree_relation', multiple: false, options: [
            { id: 'moins_6mois', label: "Moins de 6 mois" },
            { id: '6mois_1an', label: "Entre 6 mois et 1 an" },
            { id: '1an_3ans', label: "Entre 1 et 3 ans" },
            { id: 'plus_3ans', label: "Plus de 3 ans" }
        ]},

        { type: 'message', content: [
            { text: "D'accord. " },
            { bold: true, text: "Si tu devais d\u00e9crire l'\u00e9tat de ton c\u0153ur aujourd'hui" },
            { text: ", quels mots choisirais-tu ? (Tu peux en s\u00e9lectionner plusieurs)" }
        ]},

        // Q6 : Etat du coeur (multi)
        { type: 'choice', variable: 'etat_coeur', multiple: true, options: [
            { id: 'blesse', label: "Bless\u00e9, meurtri \uD83D\uDC94" },
            { id: 'confus', label: "Confus, perdu \uD83C\uDF2B\uFE0F" },
            { id: 'en_colere', label: "En col\u00e8re, frustr\u00e9 \uD83D\uDD25" },
            { id: 'anxieux', label: "Anxieux, inquiet \uD83D\uDE1F" },
            { id: 'plein_espoir', label: "Plein d'espoir \uD83C\uDF1F" },
            { id: 'fatigue', label: "Fatigu\u00e9, \u00e9puis\u00e9 \uD83D\uDE2E\u200D\uD83D\uDCA8" },
            { id: 'en_paix', label: "En paix, serein \uD83D\uDE4F" },
            { id: 'determinee', label: "D\u00e9termin\u00e9e \u00e0 avancer \uD83D\uDCAA" }
        ]},


        /* ════════════════════════════════════
           SECTION 3 : TA DEMARCHE
        ════════════════════════════════════ */

        { type: 'section', title: 'Ta d\u00e9marche' },

        { type: 'message', content: "Merci pour ton honn\u00eatet\u00e9, {{prenom}}. C'est courageux." },

        { type: 'message', content: [
            { bold: true, text: "Qu'est-ce qui t'a d\u00e9cid\u00e9e \u00e0 faire cette d\u00e9marche aujourd'hui ?" },
            { text: " Raconte-moi avec tes mots." }
        ]},

        // Q7 : Declencheur
        { type: 'text_input', variable: 'declencheur', isLong: true, placeholder: "Ce qui m'a d\u00e9cid\u00e9e \u00e0 commencer ce parcours..." },

        { type: 'message', content: "Merci de partager cela. \u2728" },

        { type: 'message', content: [
            { bold: true, text: "Qu'attends-tu principalement de cet accompagnement ?" }
        ]},

        // Q8 : Attentes accompagnement
        { type: 'choice', variable: 'attente_accompagnement', multiple: false, options: [
            { id: 'comprendre_schemas', label: "Comprendre mes sch\u00e9mas relationnels" },
            { id: 'guerir_blessures', label: "Gu\u00e9rir des blessures du pass\u00e9" },
            { id: 'preparer_mariage', label: "Me pr\u00e9parer au mariage" },
            { id: 'confiance_en_soi', label: "Retrouver confiance en moi" },
            { id: 'communication', label: "Am\u00e9liorer ma communication" },
            { id: 'clarifier_vision', label: "Clarifier ma vision du couple" }
        ]},


        /* ════════════════════════════════════
           SECTION 4 : TON ETAT INTERIEUR
        ════════════════════════════════════ */

        { type: 'section', title: 'Ton \u00e9tat int\u00e9rieur' },

        { type: 'message', content: "Maintenant, j'aimerais prendre le pouls de ton \u00e9tat int\u00e9rieur. R\u00e9ponds instinctivement, sans trop r\u00e9fl\u00e9chir." },

        { type: 'message', content: [
            { bold: true, text: "Quel est ton niveau d'anxi\u00e9t\u00e9 actuel ?" }
        ]},

        // Q9 : Anxiete (rating)
        { type: 'rating', variable: 'anxiete', max: 10, leftLabel: 'Tr\u00e8s calme', rightLabel: 'Tr\u00e8s anxieuse' },

        { type: 'message', content: [
            { bold: true, text: "Comment \u00e9values-tu ta confiance en toi ?" }
        ]},

        // Q10 : Confiance en soi (rating)
        { type: 'rating', variable: 'confiance_soi', max: 10, leftLabel: 'Tr\u00e8s faible', rightLabel: 'Tr\u00e8s forte' },

        { type: 'message', content: [
            { bold: true, text: "Ta capacit\u00e9 \u00e0 g\u00e9rer tes \u00e9motions ?" }
        ]},

        // Q11 : Gestion emotions (rating)
        { type: 'rating', variable: 'gestion_emotions', max: 10, leftLabel: 'D\u00e9bord\u00e9e', rightLabel: 'Tr\u00e8s stable' },

        { type: 'message', content: [
            { bold: true, text: "Comment est ta qualit\u00e9 de sommeil en ce moment ?" }
        ]},

        // Q12 : Qualite sommeil (rating)
        { type: 'rating', variable: 'qualite_sommeil', max: 10, leftLabel: 'Tr\u00e8s mauvaise', rightLabel: 'Excellente' },

        { type: 'message', content: [
            { bold: true, text: "Te sens-tu isol\u00e9e socialement ?" }
        ]},

        // Q13 : Isolement social (rating)
        { type: 'rating', variable: 'isolement_social', max: 10, leftLabel: 'Pas du tout', rightLabel: 'Tr\u00e8s isol\u00e9e' },

        { type: 'message', content: [
            { bold: true, text: "Arrives-tu \u00e0 communiquer tes besoins dans tes relations ?" }
        ]},

        // Q14 : Communication besoins (rating)
        { type: 'rating', variable: 'communication_besoins', max: 10, leftLabel: 'Tr\u00e8s difficilement', rightLabel: 'Tr\u00e8s facilement' },


        /* ════════════════════════════════════
           SECTION 5 : TES RACINES
        ════════════════════════════════════ */

        { type: 'section', title: 'Tes racines' },

        { type: 'message', content: "Merci {{prenom}}. Ces indicateurs sont pr\u00e9cieux pour mieux te comprendre." },

        { type: 'message', content: "Explorons maintenant tes racines. Notre pass\u00e9 familial influence profond\u00e9ment nos relations." },

        { type: 'message', content: [
            { bold: true, text: "Comment d\u00e9crirais-tu ta relation avec tes parents ?" }
        ]},

        // Q15 : Relation parents
        { type: 'choice', variable: 'relation_parents', multiple: false, options: [
            { id: 'tres_proche', label: "Tr\u00e8s proche et aimante" },
            { id: 'correcte_distance', label: "Correcte mais distante" },
            { id: 'conflictuelle', label: "Conflictuelle ou tendue" },
            { id: 'absente', label: "Absente ou rompue" },
            { id: 'complexe', label: "Complexe \u2014 c'est compliqu\u00e9" }
        ]},

        { type: 'message', content: [
            { bold: true, text: "As-tu identifi\u00e9 une blessure d'enfance" },
            { text: " qui impacte encore ta vie amoureuse aujourd'hui ?" }
        ]},

        // Q16 : Blessure enfance
        { type: 'choice', variable: 'blessure_enfance', multiple: false, options: [
            { id: 'abandon', label: "L'abandon \u2014 peur d'\u00eatre quitt\u00e9e" },
            { id: 'rejet', label: "Le rejet \u2014 ne pas se sentir \u00e0 la hauteur" },
            { id: 'trahison', label: "La trahison \u2014 difficult\u00e9 \u00e0 faire confiance" },
            { id: 'humiliation', label: "L'humiliation \u2014 honte de soi" },
            { id: 'injustice', label: "L'injustice \u2014 besoin de contr\u00f4le" },
            { id: 'pas_identifie', label: "Je n'ai pas encore identifi\u00e9" },
            { id: 'aucune', label: "Aucune particuli\u00e8re" }
        ]},


        /* ════════════════════════════════════
           SECTION 6 : TES PATTERNS
        ════════════════════════════════════ */

        { type: 'section', title: 'Tes patterns' },

        { type: 'message', content: "Passons aux patterns relationnels. Ce sont ces sc\u00e9narios qui se r\u00e9p\u00e8tent dans nos vies amoureuses." },

        { type: 'message', content: [
            { bold: true, text: "Observes-tu un sch\u00e9ma qui se r\u00e9p\u00e8te dans tes relations ?" }
        ]},

        // Q17 : Schema repete
        { type: 'choice', variable: 'schema_repete', multiple: false, options: [
            { id: 'attirer_indisponibles', label: "J'attire des personnes \u00e9motionnellement indisponibles" },
            { id: 'donner_trop', label: "Je donne trop et on me prend pour acquise" },
            { id: 'fuir_engagement', label: "Je fuis quand \u00e7a devient s\u00e9rieux" },
            { id: 'dependance', label: "Je deviens d\u00e9pendante affective" },
            { id: 'sabotage', label: "Je sabote mes relations inconsciemment" },
            { id: 'pas_de_pattern', label: "Je n'ai pas identifi\u00e9 de pattern" }
        ]},

        { type: 'message', content: [
            { text: "Si tu devais d\u00e9crire ce pattern plus en d\u00e9tail, " },
            { bold: true, text: "comment se manifeste-t-il concr\u00e8tement ?" }
        ]},

        // Q18 : Pattern detail (texte libre)
        { type: 'text_input', variable: 'pattern_detail', isLong: true, placeholder: "D\u00e9cris comment ce pattern se manifeste dans ta vie..." },


        /* ════════════════════════════════════
           SECTION 7 : TES VALEURS & VISION
        ════════════════════════════════════ */

        { type: 'section', title: 'Tes valeurs & ta vision' },

        { type: 'message', content: "On approche de la fin, {{prenom}}. Parlons maintenant de ce qui compte vraiment pour toi." },

        { type: 'message', content: [
            { bold: true, text: "Quelle est la valeur la plus importante pour toi dans un couple ?" }
        ]},

        // Q19 : Valeur prioritaire
        { type: 'choice', variable: 'valeur_prioritaire', multiple: false, options: [
            { id: 'confiance', label: "La confiance" },
            { id: 'respect', label: "Le respect mutuel" },
            { id: 'communication', label: "La communication" },
            { id: 'din', label: "La religion (d\u00een)" },
            { id: 'tendresse', label: "La tendresse et l'affection" },
            { id: 'projet_commun', label: "Un projet de vie commun" }
        ]},

        { type: 'message', content: [
            { bold: true, text: "Quel est ton plus grand deal-breaker ?" },
            { text: " (Ce que tu ne pourrais jamais accepter)" }
        ]},

        // Q20 : Deal-breaker
        { type: 'choice', variable: 'deal_breaker', multiple: false, options: [
            { id: 'mensonge', label: "Le mensonge r\u00e9p\u00e9t\u00e9" },
            { id: 'violence', label: "Toute forme de violence" },
            { id: 'infidelite', label: "L'infid\u00e9lit\u00e9" },
            { id: 'manque_respect', label: "Le manque de respect" },
            { id: 'pas_de_din', label: "L'absence de religion" },
            { id: 'manque_ambition', label: "Le manque d'ambition" }
        ]},

        { type: 'message', content: [
            { bold: true, text: "Comment imagines-tu ton couple id\u00e9al ?" },
            { text: " D\u00e9cris-le en quelques mots." }
        ]},

        // Q21 : Vision couple (texte libre)
        { type: 'text_input', variable: 'vision_couple', isLong: true, placeholder: "Mon couple id\u00e9al ressemblerait \u00e0..." },


        /* ════════════════════════════════════
           SECTION 8 : POUR CONCLURE
        ════════════════════════════════════ */

        { type: 'section', title: 'Pour conclure' },

        { type: 'message', content: "Derni\u00e8res questions, {{prenom}}. Tu as fait un travail magnifique." },

        { type: 'message', content: [
            { bold: true, text: "Quel est le plus grand blocage" },
            { text: " que tu ressens dans ta vie amoureuse actuellement ?" }
        ]},

        // Q22 : Blocage principal
        { type: 'choice', variable: 'blocage_principal', multiple: false, options: [
            { id: 'peur_souffrir', label: "La peur de souffrir encore" },
            { id: 'manque_confiance', label: "Le manque de confiance en moi" },
            { id: 'pas_trouver', label: "Ne pas trouver la bonne personne" },
            { id: 'famille', label: "Les pressions familiales" },
            { id: 'blessures_passees', label: "Des blessures non gu\u00e9ries" },
            { id: 'clarification', label: "Le manque de clart\u00e9 sur ce que je veux" }
        ]},

        { type: 'message', content: [
            { bold: true, text: "Sur une \u00e9chelle de 1 \u00e0 10, \u00e0 quel point es-tu pr\u00eate \u00e0 t'engager" },
            { text: " dans un vrai travail sur toi ?" }
        ]},

        // Q23 : Pret engagement (rating)
        { type: 'rating', variable: 'pret_engagement', max: 10, leftLabel: 'Pas encore', rightLabel: 'Totalement pr\u00eate' },

        { type: 'message', content: "Avant de terminer, y a-t-il quelque chose que tu aimerais me dire ? Un mot, une pens\u00e9e, une pri\u00e8re..." },

        // Bonus : Message libre (non-obligatoire)
        { type: 'text_input', variable: 'message_libre', isLong: true, placeholder: "Si tu veux partager quelque chose de plus... (facultatif)", optional: true },


        /* ════════════════════════════════════
           FIN : COMPLETION
        ════════════════════════════════════ */

        { type: 'message', content: [
            { bold: true, text: "BarakAllahu fiki {{prenom}}." }
        ]},

        { type: 'message', content: "Tu viens de poser les premi\u00e8res fondations d'un beau parcours de gu\u00e9rison et de d\u00e9couverte de soi." },

        { type: 'message', content: "Tes r\u00e9ponses seront analys\u00e9es avec soin et bienveillance. Elles constituent la base de ta cartographie \u00e9motionnelle." },

        { type: 'completion',
          title: 'F\u00e9licitations !',
          message: "Tu as termin\u00e9 le Formulaire 1 : L'Empreinte. Tes r\u00e9ponses ont \u00e9t\u00e9 sauvegard\u00e9es.",
          icon: '\uD83C\uDF31'
        }
    ]
};

/* ─── Form Registry ─── */
if (typeof window.FORM_REGISTRY === 'undefined') window.FORM_REGISTRY = {};
window.FORM_REGISTRY['f1-express'] = F1_EXPRESS;
