/* ═══════════════════════════════════════
   S1 — L'Étincelle Initiale
   Converti depuis Typebot · 160 steps · 10 variables
═══════════════════════════════════════ */

const S1_ETINCELLE = {
    id: 's1_etincelle',
    version: 1,
    title: "S1 — L'Étincelle Initiale",
    icon: '✨',
    checkboxId: 's1',
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
        "ce_qui_occupe_le_cur",
        "echo_personnel",
        "email",
        "energie_actuelle",
        "influences_profondes",
        "prenom",
        "reaction_dominante_au_message",
        "strategie_de_reponse",
        "telephone",
        "vecu_de_l_attente"
],

    steps: [

        /* ════════════════════════════════════ */
        { type: 'section', title: "Cartographie émotionnelle" },

        { type: 'image', url: "https://images.unsplash.com/photo-1505765052322-75804bb2e5f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHNlYXJjaHwxNHx8Y291cGxlfGVufDB8MHx8fDE3NTQyMzU3NjN8MA&ixlib=rb-4.1.0&q=80&w=1080", alt: "" },
        { type: 'message', content: "✨ Bienvenue dans ce nouveau scénario..." },
        { type: 'message', content: "Avant de commencer, j'ai besoin de quelques informations pour t'identifier :" },
        { type: 'text_input', variable: 'prenom', placeholder: "Quel est ton prénom ?" },
        { type: 'phone_input', variable: 'telephone', placeholder: "06 12 34 56 78", defaultPrefix: '+33' },
        { type: 'email_input', variable: 'email', placeholder: "ton.email@exemple.com" },
        { type: 'message', content: "Avant de commencer notre voyage ensemble, j'aimerais savoir où tu en es actuellement" },
        { type: 'message', content: [{"text": "Comment te sens-tu en ce moment ?", "bold": true}, {"text": "\n\n"}, {"text": "Prends un instant pour scanner ton état intérieur..."}] },
        { type: 'message', content: [{"text": "🌊 "}, {"text": "Mon énergie aujourd'hui :", "bold": true}] },
        { type: 'choice', variable: 'energie_actuelle', options: [{"id": "calme_et_sereine_je_me_sens_p", "label": "Calme et sereine\n\"Je me sens posée et tranquille, l'esprit clair\""}, {"id": "un_peu_anxieuse_je_ressens_un", "label": "Un peu anxieuse\n\"Je ressens une légère nervosité, mais ça reste gérable\""}, {"id": "curieuse_et_enthousiaste_j_ai", "label": "Curieuse et enthousiaste\n\"J'ai hâte de découvrir la suite, je suis motivée\""}, {"id": "bouleversee_emotionnellement", "label": "Bouleversée émotionnellement\n\"C'est difficile en ce moment, je traverse des turbulences intérieures\""}, {"id": "confuse_et_perdue_je_ne_compr", "label": "Confuse et perdue\n\"Je ne comprends pas vraiment ce que je ressens, c'est flou\""}] },
        { type: 'message', content: [{"text": "Merci pour cette "}, {"text": "transparence", "bold": true}, {"text": "."}] },
        { type: 'message', content: [{"text": "💭 Et maintenant, dis-moi..."}, {"text": "\n\n"}, {"text": "Qu'est-ce qui occupe ton cœur en ce moment ?", "bold": true}] },
        { type: 'choice', variable: 'ce_qui_occupe_le_cur', options: [{"id": "des_questions_sur_mon_chemin_r", "label": "Des questions sur mon chemin relationnel"}, {"id": "l_espoir_de_clarifier_mes_patt", "label": "L'espoir de clarifier mes patterns"}, {"id": "une_fatigue_de_repeter_les_mem", "label": "Une fatigue de répéter les mêmes danses"}, {"id": "la_curiosite_de_me_decouvrir_a", "label": "La curiosité de me découvrir autrement"}, {"id": "autre_chose_qui_emerge", "label": "Autre chose qui émerge..."}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "L'aube des possibles" },

        { type: 'narrative', content: [{"text": "Ce que tu portes en toi est "}, {"text": "précieux", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Je voudrais t'accompagner dans une exploration qui pourrait résonner avec ce que tu vis..."}] },
        { type: 'image', url: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHNlYXJjaHwyfHxkYXduJTIwc3VufGVufDB8fHx8MTY5NjAwMDAwMHww&ixlib=rb-4.0.3&q=80&w=1080", alt: "" },
        { type: 'message', content: [{"text": "🌸 "}, {"text": "L'aube des possibles...", "italic": true}] },
        { type: 'narrative', content: [{"text": "Aujourd'hui, nous allons explorer ensemble..."}, {"text": "\n\n"}, {"text": "Les premiers battements", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Ce moment suspendu où tout est encore possible."}] },
        { type: 'message', content: "Quand deux chemins se croisent, avant même de savoir s'ils marcheront ensemble.\n\nCette phase délicate où l'on choisit de révéler ou de protéger." },
        { type: 'narrative', content: [{"text": "Dans les prochains instants, tu vas accompagner "}, {"text": "Sara", "bold": true}, {"text": " dans ce moment universel :"}, {"text": "\n\n"}, {"text": "Celui où l'intérêt se manifeste pour la première fois."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "je_suis_prete_a_plonger_dans_c", "label": "Je suis prête à plonger dans cette exploration"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Le message qui change tout" },

        { type: 'message', content: "Voilà, nous y sommes." },
        { type: 'image', url: "https://images.unsplash.com/photo-1729860649405-96dec89ec58b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHNlYXJjaHwxNXx8d2hhdHNhcHB8ZW58MHwwfHx8MTc1MzUzNTA5OXww&ixlib=rb-4.1.0&q=80&w=1080", alt: "" },
        { type: 'message', content: [{"text": "💫 "}, {"text": "Le message qui change tout...", "italic": true}] },
        { type: 'message', content: "La notification fait vibrer son téléphone posé sur la table basse." },
        { type: 'message', content: [{"text": "Sara termine sa tisane du soir, cette routine qui clôture ses journées. La télé murmure en fond, mais c'est le "}, {"text": "silence dans son cœur", "italic": true}, {"text": " qu'elle écoute vraiment."}] },
        { type: 'message', content: [{"text": "Bzz. Bzz.", "italic": true}, {"text": "\n\n"}, {"text": "L'écran s'illumine dans la pénombre."}] },
        { type: 'message', content: [{"text": "Son prénom apparaît. "}, {"text": "Mehdi", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "Cette rencontre d'il y a trois jours qui a laissé... "}, {"text": "quelque chose", "italic": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Ni coup de foudre, ni indifférence. Juste cette curiosité douce, cette possibilité qui flottait entre eux."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "decouvrir_qui_ils_sont", "label": "Découvrir qui ils sont →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Deux âmes qui se découvrent" },

        { type: 'message', content: "Laisse-moi te présenter ces deux âmes..." },
        { type: 'narrative', content: [{"text": "Sara", "bold": true}, {"text": ", dans cette saison de sa vie où les questions deviennent plus précises."}, {"text": "\n\n"}, {"text": "Où le "}, {"text": "\"un jour\"", "italic": true}, {"text": " devient "}, {"text": "\"bientôt peut-être\"", "italic": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "Elle porte en elle des rêves qu'elle n'a jamais vraiment nommés, des peurs qu'elle connaît que trop bien et d'autres qu'elle reconnaît à peine."}, {"text": "\n\n"}, {"text": "Mais il y a surtout cette "}, {"text": "force tranquille", "bold": true}, {"text": " de celle qui a appris à marcher seule tout en rêvant de marcher à deux."}] },
        { type: 'narrative', content: [{"text": "Et puis il y a "}, {"text": "Mehdi", "bold": true}, {"text": "..."}, {"text": "\n\n"}, {"text": "Son prénom résonne encore nouveau. Ils se sont rencontrés par le biais de connaissances en commun..."}] },
        { type: 'message', content: "Trois jours que leurs mots ont dansé avec prudence.\n\nTrois jours que quelque chose cherche à naître." },
        { type: 'choice', variable: 'choix', options: [{"id": "lire_le_message", "label": "Lire le message →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Les mots qui attendent" },

        { type: 'message', content: "Le moment est venu..." },
        { type: 'message', content: "Elle ouvre le message.\n\nSon pouce hésite une fraction de seconde, ce micro-moment où l'on choisit de basculer dans l'histoire ou de rester sur le rivage." },
        { type: 'message', content: [{"text": "💬 "}, {"text": "Mehdi", "bold": true}] },
        { type: 'narrative', content: [{"text": "Salam Sara,", "italic": true}, {"text": "\n\n"}, {"text": "J'espère que tu vas bien. Je voulais te dire que notre rencontre m'a vraiment marqué. Ta façon de voir les choses, ton rire quand tu as parlé de tes projets...", "italic": true}, {"text": "\n\n"}, {"text": "J'aimerais vraiment qu'on apprenne à mieux se connaître. Est-ce que tu serais partante pour qu'on se revoie ? ", "italic": true}, {"text": "\n\n"}, {"text": "Je comprendrais totalement si tu préfères prendre ton temps. Juste... j'avais envie que tu saches que cette rencontre compte pour moi.", "italic": true}, {"text": "\n\n"}, {"text": "Prends soin de toi.", "italic": true}] },
        { type: 'narrative', content: [{"text": "Les mots flottent devant ses yeux."}, {"text": "\n\n"}, {"text": "Simples. Sincères. "}, {"text": "Peut-être", "italic": true}, {"text": "."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "ressentir_sa_reaction", "label": "Ressentir sa réaction →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "La tempête intérieure" },

        { type: 'message', content: "Et là, quelque chose se déclenche en elle..." },
        { type: 'image', url: "https://images.unsplash.com/photo-1525723550961-7a8f846d6ba7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHNlYXJjaHw2fHx2ZW50fGVufDB8MHx8fDE3NTM1MzUyMTN8MA&ixlib=rb-4.1.0&q=80&w=1080", alt: "" },
        { type: 'message', content: [{"text": "🌪️ "}, {"text": "La tempête intérieure", "italic": true}] },
        { type: 'message', content: [{"text": "Le téléphone devient soudain "}, {"text": "lourd", "bold": true}, {"text": " dans sa main."}] },
        { type: 'narrative', content: [{"text": "Ce n'est pas le message en lui-même."}, {"text": "\n\n"}, {"text": "C'est tout ce qu'il "}, {"text": "réveille", "italic": true}, {"text": "."}] },
        { type: 'message', content: [{"text": "Les voix se lèvent en elle :", "bold": true}] },
        { type: 'message', content: [{"text": "💭 "}, {"text": "\"Réponds vite, montre ton intérêt\"", "italic": true}] },
        { type: 'message', content: [{"text": "🛡️ "}, {"text": "\"Attends, ne sois pas trop disponible\"", "italic": true}] },
        { type: 'message', content: [{"text": "🔍 "}, {"text": "\"Est-ce que c'est sincère ?\"", "italic": true}] },
        { type: 'message', content: [{"text": "✨ "}, {"text": "\"Et si c'était lui ?\"", "italic": true}] },
        { type: 'narrative', content: [{"text": "Son cœur bat ce rythme étrange entre "}, {"text": "excitation et protection", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Entre l'élan naturel et les règles apprises. Entre ce qu'elle ressent et ce qu'elle "}, {"text": "\"devrait\"", "italic": true}, {"text": " faire."}] },
        { type: 'message', content: "Le temps semble suspendu.\n\nDehors, la ville continue sa course. Dedans, Sara est au carrefour de tous ses mondes intérieurs." },
        { type: 'choice', variable: 'choix', options: [{"id": "explorer_ma_propre_reaction", "label": "Explorer ma propre réaction →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Le moment de vérité" },

        { type: 'message', content: "Et toi, comment aurais-tu vécu ce moment ?" },
        { type: 'message', content: "Elle relit. Une fois. Deux fois." },
        { type: 'narrative', content: [{"text": "Chaque mot prend des couleurs différentes selon l'angle."}, {"text": "\n\n"}, {"text": "\"Vraiment marqué\"", "italic": true}, {"text": " - intensité ou formule ?"}, {"text": "\n\n"}, {"text": "\"Prendre ton temps\"", "italic": true}, {"text": " - respect ou distance ?"}] },
        { type: 'message', content: "L'espace de message reste vide. Attendant. Plein de possibles." },
        { type: 'message', content: [{"text": "Sara reste là, suspendue entre ses élans..."}, {"text": "\n\n"}, {"text": "Et toi, dans ce moment de suspension, qu'est-ce qui domine ?", "bold": true}] },
        { type: 'choice', variable: 'reaction_dominante_au_message', options: [{"id": "l_excitation_pure_enfin_que", "label": "L'excitation pure - \"Enfin quelqu'un qui ose montrer son intérêt !\""}, {"id": "la_mefiance_instinctive_les", "label": "La méfiance instinctive - \"Les mots sont faciles, les actes parlent\""}, {"id": "l_analyse_strategique_comme", "label": "L'analyse stratégique - \"Comment naviguer ce moment avec sagesse ?\""}, {"id": "la_peur_cachee_et_si_l_hist", "label": "La peur cachée - \"Et si l'histoire se répétait ?\""}, {"id": "le_calme_confiant_mon_intui", "label": "Le calme confiant - \"Mon intuition saura me guider\""}, {"id": "autre_chose", "label": "Autre chose..."}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Les vraies raisons" },

        { type: 'message', content: [{"text": "Cette réaction en dit long sur ton "}, {"text": "histoire intérieure", "bold": true}] },
        { type: 'message', content: [{"text": "Finalement, Sara pose le téléphone. Le reprend. Le repose."}, {"text": "\n\n"}, {"text": "Cette danse que nous connaissons tous.", "italic": true}] },
        { type: 'message', content: [{"text": "Et toi, qu'est-ce qui t'influencerait dans ce moment ?", "bold": true}] },
        { type: 'message', content: [{"text": "💭 "}, {"text": "Peut-être...", "bold": true}] },
        { type: 'narrative', content: "• Des échos de celui qui a promis puis disparu\n\n• La voix de ta mère sur \"comment se comporter avec dignité\"\n\n• Cette amie qui dit toujours \"ne te précipite pas\"\n\n• Les murmures de ton cœur qui reconnaît quelque chose\n\n• Cette partie de toi qui sait déjà mais doute encore\n\n• Les anciennes blessures qui murmurent leurs mises en garde\n\n• Ou quelque chose de totalement différent..." },
        { type: 'message', content: [{"text": "Au-delà de la surface, qu'est-ce qui pèserait vraiment dans TA balance ?", "bold": true}] },
        { type: 'text_input', variable: 'influences_profondes', placeholder: "Ce qui m'influence vraiment dans ces moments...", isLong: true },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Les chemins possibles" },

        { type: 'narrative', content: [{"text": "Merci pour cette "}, {"text": "honnêteté", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "C'est précieux de reconnaître ce qui nous influence vraiment."}] },
        { type: 'message', content: [{"text": "Maintenant, explorons les possibles..."}, {"text": "\n\n"}, {"text": "Si tu étais Sara, face à ce message de Mehdi...", "bold": true}] },
        { type: 'choice', variable: 'strategie_de_reponse', options: [{"id": "repondre_dans_l_heure_avec_aut", "label": "Répondre dans l'heure avec authenticité \"Son courage mérite ma vérité. Je refuse les jeux.\""}, {"id": "attendre_le_lendemain_matin_u", "label": "Attendre le lendemain matin \"Une nuit porte conseil. Ni précipitation ni stratégie excessive.\""}, {"id": "prendre_2_3_jours_avant_de_rep", "label": "Prendre 2-3 jours avant de répondre \"Créer un peu d'espace permet de voir plus clair.\""}, {"id": "repondre_rapidement_mais_reste", "label": "Répondre rapidement mais rester mesurée \"Montrer l'intérêt tout en gardant une certaine réserve.\""}, {"id": "demander_conseil_avant_de_deci", "label": "Demander conseil avant de décider \"Les perspectives externes m'aident à clarifier.\""}, {"id": "autre_approche", "label": "Autre approche..."}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Après l'envoi" },

        { type: 'message', content: "Tu as choisi ton approche. Maintenant imagine..." },
        { type: 'message', content: [{"text": "Le message est parti. "}, {"text": "Envoyé", "bold": true}, {"text": ". Les deux coches apparaissent."}] },
        { type: 'message', content: [{"text": "Dans les heures qui suivent, comment vis-tu cette attente ?", "bold": true}, {"text": "\n\n"}, {"text": "Sois honnête avec ce qui se jouerait vraiment en toi...", "italic": true}] },
        { type: 'message', content: "• Cette vérification compulsive du téléphone ?\n\n• Les scénarios qui se construisent dans ta tête ?\n\n• L'interprétation de chaque heure de silence ?\n\n• Le doute qui s'installe (\"J'aurais dû dire autrement\") ?\n\n• Ou cette paix de celle qui a agi en cohérence ?" },
        { type: 'text_input', variable: 'vecu_de_l_attente', placeholder: "Dans ces heures d'attente, je vivrais...", isLong: true },

        /* ════════════════════════════════════ */
        { type: 'section', title: "L'écho personnel" },

        { type: 'message', content: [{"text": "Cette "}, {"text": "conscience de toi-même", "bold": true}, {"text": " est un trésor..."}] },
        { type: 'message', content: [{"text": "Avant de quitter cette histoire..."}, {"text": "\n\n"}, {"text": "Quel moment précis a fait le plus écho en toi ?", "bold": true}] },
        { type: 'message', content: [{"text": "Peut-être :", "italic": true}] },
        { type: 'message', content: "• Cette fraction de seconde avant d'ouvrir le message\n\n• Le poids du téléphone qui change soudainement\n\n• Les voix contradictoires qui se lèvent\n\n• Cette attente après l'envoi qui révèle tant\n\n• Un détail qui a réveillé un souvenir précis\n\n• Autre chose de plus intime..." },
        { type: 'text_input', variable: 'echo_personnel', placeholder: "Le moment qui a vraiment résonné en moi...", isLong: true },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Le miroir bienveillant" },

        { type: 'image', url: "https://images.unsplash.com/photo-1525615301846-b1e8aeafa1ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHNlYXJjaHw3fHxtaXJyb3J8ZW58MHwwfHx8MTc1NDEzMzU1Nnww&ixlib=rb-4.1.0&q=80&w=1080", alt: "" },
        { type: 'message', content: [{"text": "Ce que tu viens de partager révèle quelque chose de "}, {"text": "précieux", "bold": true}, {"text": "..."}] },
        { type: 'message', content: [{"text": "✨ Dans cette danse des premiers échanges, tu portes une "}, {"text": "sagesse unique", "bold": true}, {"text": " :"}] },
        { type: 'message', content: "Tu prends le temps de t'ouvrir à ton rythme, en restant attentive à tes limites et à ce que tu ressens. \n\nCette tension entre l'élan du cœur et la voix de la prudence n'est pas un défaut, c'est ta façon d'honorer à la fois ton désir de connexion et ton besoin de sécurité." },
        { type: 'message', content: [{"text": "Ce qui se déroule en toi :", "bold": true}] },
        { type: 'message', content: "• Tu ressens profondément l'importance de ces premiers moments\n\n• Tu sais que l'énergie initiale colore toute la suite\n\n• Tu cherches ton propre équilibre, au-delà des règles apprises" },
        { type: 'message', content: "Prends le temps d'écouter ce que ton intuition te dit. C'est un guide intérieur précieux qui mérite qu'on lui fasse confiance, surtout dans les moments de doute \n\nElle te guidera vers ceux qui sauront honorer ton rythme unique." },
        { type: 'choice', variable: 'choix', options: [{"id": "comprendre_cette_danse", "label": "Comprendre cette danse →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Comprendre la danse" },

        { type: 'message', content: "Laisse-moi maintenant t'éclairer sur ce qui se joue vraiment..." },
        { type: 'message', content: [{"text": "Les 3 forces qui s'activent dans les premiers messages", "bold": true}] },
        { type: 'narrative', content: [{"text": "🌊 "}, {"text": "1. L'Élan Naturel", "bold": true}, {"text": "\n\n"}, {"text": "C'est ta vérité première, celle qui veut répondre spontanément. Elle porte ta joie, ton enthousiasme, ta capacité d'émerveillement."}, {"text": "\n\n"}, {"text": "C'est l'enfant intérieur qui dit \"oui\" à la vie."}] },
        { type: 'narrative', content: [{"text": "🛡️ "}, {"text": "2. Le Gardien Intérieur", "bold": true}, {"text": "\n\n"}, {"text": "C'est la voix de la protection, nourrie par l'expérience. Chaque déception passée l'a rendu plus vigilant."}, {"text": "\n\n"}, {"text": "Il veut te protéger, parfois trop."}] },
        { type: 'narrative', content: [{"text": "👑 "}, {"text": "3. La Sagesse Sociale", "bold": true}, {"text": "\n\n"}, {"text": "Les règles transmises, apprises, observées."}, {"text": "\n\n"}, {"text": "\"Une femme bien se fait désirer\", \"Ne montre pas trop d'intérêt\", \"Laisse-le chasser\"."}, {"text": "\n\n"}, {"text": "Parfois utiles, souvent limitantes."}] },
        { type: 'narrative', content: [{"text": "💡 "}, {"text": "Le secret ?", "bold": true}, {"text": "\n\n"}, {"text": "Ces trois voix ont chacune leur vérité. La maturité relationnelle, c'est apprendre à les écouter toutes, puis choisir consciemment laquelle suivre selon la situation."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "recevoir_mes_cles_pratiques", "label": "Recevoir mes clés pratiques →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Trois clés pratiques" },

        { type: 'message', content: "Maintenant que tu comprends ces forces, voici comment les apprivoiser..." },
        { type: 'narrative', content: [{"text": "🌙 "}, {"text": "1. La Règle de l'Alignement", "bold": true}, {"text": "\n\n"}, {"text": "Avant de répondre, pose-toi 3 questions :"}] },
        { type: 'message', content: "• Ce message reflète-t-il qui je suis vraiment ?\n\n• Est-ce que j'agis par peur ou par choix ?\n\n• Dans 6 mois, serai-je fière de cette réponse ?" },
        { type: 'narrative', content: [{"text": "🌊 "}, {"text": "2. Surfer l'Attente", "bold": true}, {"text": "\n\n"}, {"text": "Après l'envoi, pour gérer l'anxiété :"}] },
        { type: 'message', content: "• Pose ton téléphone dans une autre pièce\n\n• Fixe-toi des créneaux de vérification (matin, midi, soir)\n\n• Rappelle-toi : son timing révèle sa compatibilité avec le tien" },
        { type: 'narrative', content: [{"text": "📿 "}, {"text": "3. Le Rituel d'Intention", "bold": true}, {"text": "\n\n"}, {"text": "Avant chaque échange important :"}] },
        { type: 'message', content: "• Respire 3 fois profondément\n\n• Pose ton intention : \"Que veux-je créer ?\"\n\n• Envoie avec cette énergie claire" },
        { type: 'choice', variable: 'choix', options: [{"id": "explorer_la_dimension_sacree", "label": "Explorer la dimension sacrée →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "La dimension sacrée" },

        { type: 'message', content: "Il y a une dimension plus profonde encore dans tout cela..." },
        { type: 'image', url: "https://images.unsplash.com/photo-1542816417-b2f71ff05459?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHNlYXJjaHwxNTB8fHNhY3IlQzMlQTklMjBpc2xhbXxlbnwwfDB8fHwxNzUzNTM1Mzc4fDA&ixlib=rb-4.1.0&q=80&w=1080", alt: "" },
        { type: 'message', content: [{"text": "🤲 "}, {"text": "La dimension sacrée", "italic": true}] },
        { type: 'message', content: [{"text": "Le cœur entre deux mondes", "bold": true}] },
        { type: 'message', content: "Dans cette recherche de l'âme sœur, tu navigues entre désir humain et confiance divine.\n\nUne danse délicate et sacrée." },
        { type: 'message', content: [{"text": "Transformer l'anxiété en sérénité", "bold": true}] },
        { type: 'message', content: "Quand l'attente devient lourde, quand les doutes murmurent, souviens-toi :" },
        { type: 'narrative', content: [{"text": "Au lieu de vérifier ton téléphone compulsivement, fais du "}, {"text": "dhikr", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "\"Hasbi Allah wa ni'mal wakil\"", "italic": true}, {"text": " - Allah me suffit, Il est le meilleur garant."}] },
        { type: 'narrative', content: [{"text": "Au lieu d'imaginer mille scénarios, transforme cette énergie en "}, {"text": "du'a", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Demande ce qui est "}, {"text": "khayr", "italic": true}, {"text": " pour ta foi, ta vie, ton au-delà."}] },
        { type: 'message', content: [{"text": "Comment reconnaître une connexion ?", "bold": true}] },
        { type: 'message', content: [{"text": "La vraie connexion ne se force pas. Elle se reconnaît.", "italic": true}] },
        { type: 'message', content: "Elle apporte la sakina (sérénité) dans ton cœur. \n\nIl peut y avoir une excitation saine au début, mais au fond, tu ressens une paix profonde, pas une agitation anxieuse.\n\nElle te rapproche d'Allah, pas l'inverse.\n\nLes obstacles se lèvent naturellement quand c'est écrit, sans forcer ni s'épuiser." },
        { type: 'choice', variable: 'choix', options: [{"id": "decouvrir_l_essence", "label": "Découvrir l'essence →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "L'essence à retenir" },

        { type: 'message', content: "Nous approchons de la fin de ce voyage...\n\nVoici ce que j'aimerais que tu retiennes." },
        { type: 'message', content: "Dans cette danse des premiers messages" },
        { type: 'narrative', content: [{"text": "🌸 "}, {"text": "Ton authenticité est ta meilleure stratégie", "bold": true}, {"text": "\n\n"}, {"text": "Les jeux attirent les joueurs. La vérité attire ceux qui la cherchent aussi."}] },
        { type: 'narrative', content: [{"text": "🌸 "}, {"text": "L'attente révèle autant que les mots", "bold": true}, {"text": "\n\n"}, {"text": "Comment tu vis le silence en dit long sur tes blessures et tes besoins."}] },
        { type: 'narrative', content: [{"text": "🌸 "}, {"text": "Chaque début porte une graine", "bold": true}, {"text": "\n\n"}, {"text": "L'énergie que tu mets dans les premiers échanges façonne la relation entière."}] },
        { type: 'narrative', content: [{"text": "Le plus important :", "bold": true}, {"text": "\n\n"}, {"text": "Il n'y a pas de \"bonne\" façon de répondre. Il y a "}, {"text": "TA façon", "bold": true}, {"text": ", celle qui honore qui tu es et ce que tu veux créer."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "recevoir_la_benediction_finale", "label": "Recevoir la bénédiction finale →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "La bénédiction finale" },

        { type: 'message', content: "Avant de nous quitter, j'ai quelque chose d'important à te dire..." },
        { type: 'message', content: [{"text": "Les premiers messages sont des fils d'or. Ni trop tendus, ni trop lâches. Juste assez pour créer le motif unique de votre histoire.", "italic": true}] },
        { type: 'message', content: "La prochaine fois qu'un message te sera envoyé dans ce contexte de la rencontre :" },
        { type: 'message', content: [{"text": "Respire. Ressens. Réponds depuis ton centre.", "bold": true}] },
        { type: 'message', content: "Car celui qui est fait pour toi reconnaîtra la mélodie de ton authenticité, qu'elle soit rapide ou lente, directe ou nuancée." },
        { type: 'message', content: "✨" },
        { type: 'choice', variable: 'choix', options: [{"id": "cloturer_ce_voyage", "label": "Cloturer ce voyage →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Gratitude et célébration" },

        { type: 'image', url: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHNlYXJjaHwyfHx0cmF2ZWx8ZW58MHwwfHx8MTc1NDEzMzU5NHww&ixlib=rb-4.1.0&q=80&w=1080", alt: "" },
        { type: 'message', content: [{"text": "Merci pour ce partage...", "bold": true}] },
        { type: 'message', content: "Ce que tu viens de faire demande de l'authenticité.\n\nPlonger dans ses schémas relationnels, regarder ses mécanismes en face, ce n'est pas anodin." },
        { type: 'message', content: [{"text": "Tes réponses sont précieuses.", "bold": true}] },
        { type: 'narrative', content: [{"text": "Chaque mot que tu as partagé, chaque hésitation, chaque élan du cœur, tout cela dessine les contours uniques de qui tu es dans l'amour."}, {"text": "\n\n"}, {"text": "Ces révélations ne se perdront pas. Elles viendront enrichir ta "}, {"text": "cartographie émotionnelle personnelle", "bold": true}, {"text": ", ce miroir bienveillant de ton monde intérieur."}] },
        { type: 'message', content: [{"text": "Tu viens de poser une pierre importante.", "bold": true}] },
        { type: 'message', content: "En explorant comment tu navigues ces premiers moments si délicats, tu as éclairé une facette essentielle de ton fonctionnement relationnel." },
        { type: 'narrative', content: [{"text": "Tu aurais pu scrollé ailleurs, rester en surface, éviter de regarder."}, {"text": "\n\n"}, {"text": "Mais tu as choisi la "}, {"text": "profondeur", "bold": true}, {"text": ". Tu as choisi la "}, {"text": "croissance", "bold": true}, {"text": ". Tu as choisi de mieux te connaître pour mieux aimer et être aimée."}] },
        { type: 'message', content: [{"text": "Tes réponses sont maintenant partie intégrante de ton "}, {"text": "chemin de transformation", "bold": true}, {"text": "."}] },
        { type: 'message', content: [{"text": "A très vite pour la suite du parcours "}, {"text": "Love Transformations™", "bold": true}, {"text": " insha'Allah…✨"}] },
        { type: 'message', content: [{"text": "🌸 "}, {"text": "Fin du Scénario 1 : L'Étincelle Initiale", "bold": true}, {"text": " 🌸"}] },

        { type: 'completion', title: "Félicitations !", message: "Tu as terminé S1 — L'Étincelle Initiale. Tes réponses ont été sauvegardées.", icon: '✨' }
    ]
};

/* ─── Form Registry ─── */
if (typeof window.FORM_REGISTRY === 'undefined') window.FORM_REGISTRY = {};
window.FORM_REGISTRY['s1-etincelle'] = S1_ETINCELLE;
