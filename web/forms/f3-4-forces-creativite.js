/* ═══════════════════════════════════════
   F3.4 — Forces & Créativité
   Converti depuis Typebot · 135 steps · 16 variables
═══════════════════════════════════════ */

const F3_4_FORCES_CREATIVITE = {
    id: 'f3_4_forces_creativite',
    version: 1,
    title: "F3.4 — Forces & Créativité",
    icon: '🎨',
    checkboxId: 'f3_4',
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
        "croissance_relationnelle_enrichi",
        "expression_de_la_creativite_relationnelle_enrichi",
        "facteurs_de_reussite_enrichi",
        "force_cachee_revelee_enrichi",
        "forces_developpees_grace_aux_epreuves",
        "lettre_au_futur_amour",
        "manifestation_concrete_des_qualites",
        "moment_de_reussite_relationnelle_enrichi",
        "qualites_relationnelles_enrichi",
        "raisons_de_cacher_cette_force_enrichi",
        "ressources_interieures_enrichi",
        "sagesse_acquise_lettre_au_passe_enrichi",
        "telephone",
        "utilisation_future_des_ressources_enrichi",
        "vision_de_la_femme_future_magnifique",
        "visualisation_creative_guidee"
],

    steps: [

        /* ════════════════════════════════════ */
        { type: 'section', title: "Ouverture Triomphale - Arbre Majestueux" },

        { type: 'image', url: "https://images.unsplash.com/photo-1590725042647-5e175c97913e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHNlYXJjaHw0MDJ8fGRpYW1hbnR8ZW58MHwwfHx8MTc1NjkxMDQ3OHww&ixlib=rb-4.1.0&q=80&w=1080", alt: "" },
        { type: 'message', content: [{"text": "🌟 Tu arrives au moment de reconnaître tes "}, {"text": "trésors", "bold": true, "italic": true}, {"text": "..."}] },
        { type: 'message', content: "Avant de continuer, rappelle-moi tes coordonnées :" },
        { type: 'message', content: "Ton prénom ?" },
        { type: 'text_input', variable: 'reponse', placeholder: "Ton prénom..." },
        { type: 'message', content: "Ton email ?" },
        { type: 'email_input', variable: 'email', placeholder: "ton.email@exemple.com" },
        { type: 'message', content: "Ton téléphone ?" },
        { type: 'phone_input', variable: 'telephone', placeholder: "06 12 34 56 78", defaultPrefix: '+33' },
        { type: 'narrative', content: [{"text": "بسم الله الرحمن الرحيم", "italic": true}, {"text": "\n\n"}, {"text": "Célébrons ce que tu es "}, {"text": "devenue", "bold": true}, {"text": "..."}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Ouverture - Métaphore de l'Arbre" },

        { type: 'message', content: [{"text": "🌳 Imagine un "}, {"text": "arbre fruitier majestueux", "bold": true}, {"text": ", chargé de fruits magnifiques..."}] },
        { type: 'narrative', content: [{"text": "Chaque épreuve que tu as traversée a nourri ses racines..."}, {"text": "\n\n"}, {"text": "Chaque force développée est un "}, {"text": "fruit unique", "bold": true}, {"text": "..."}] },
        { type: 'narrative', content: [{"text": "Ta créativité ? Ce sont les "}, {"text": "mille façons de fleurir", "bold": true, "italic": true}, {"text": "..."}, {"text": "\n\n"}, {"text": "Et ta vision ? La "}, {"text": "canopée qui touche le ciel", "bold": true}, {"text": "."}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Ouverture - Méditation guidée" },

        { type: 'message', content: [{"text": "🧘‍♀️ Prends un moment pour te connecter à ton "}, {"text": "arbre intérieur", "bold": true}, {"text": "..."}] },
        { type: 'narrative', content: [{"text": "Respire profondément... Sens tes racines qui puisent dans la terre de ton expérience..."}, {"text": "\n\n"}, {"text": "Ressens ta "}, {"text": "force intérieure", "bold": true}, {"text": " qui circule comme une sève précieuse..."}] },
        { type: 'narrative', content: [{"text": "Visualise tes branches qui portent les fruits de tes qualités..."}, {"text": "\n\n"}, {"text": "Chacun d'eux "}, {"text": "unique", "bold": true}, {"text": ", "}, {"text": "précieux", "bold": true}, {"text": ", "}, {"text": "nourrissant", "bold": true}, {"text": "..."}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Ouverture - Invitation à la célébration" },

        { type: 'narrative', content: [{"text": "✨ Dans ce formulaire, nous n'allons pas juste "}, {"text": "identifier", "italic": true}, {"text": " tes forces..."}, {"text": "\n\n"}, {"text": "Nous allons les "}, {"text": "CÉLÉBRER", "bold": true}, {"text": " ! 🎉"}] },
        { type: 'narrative', content: [{"text": "💡 Les recherches en psychologie positive montrent quelque chose de "}, {"text": "fascinant", "bold": true, "italic": true}, {"text": " :"}, {"text": "\n\n"}, {"text": "Reconnaître et célébrer nos forces "}, {"text": "multiplie par 5", "bold": true}, {"text": " notre capacité à les utiliser !"}] },
        { type: 'choice', variable: 'choix', options: [{"id": "decouvrir_mes_tresors_interieu", "label": "Découvrir mes trésors intérieurs →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Forces Nées des Épreuves - Image" },

        { type: 'image', url: "https://images.unsplash.com/photo-1615447099572-367b9a26d3ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHNlYXJjaHwxfHxhcmJyZSUyMG1hamVzdHVldXh8ZW58MHwwfHx8MTc1NjkxMDUzN3ww&ixlib=rb-4.1.0&q=80&w=1080", alt: "" },
        { type: 'message', content: [{"text": "🌪️ Regarde ce magnifique arbre... Il a survécu aux "}, {"text": "tempêtes", "bold": true}, {"text": "..."}] },
        { type: 'message', content: [{"text": "Ses cicatrices ne l'ont pas affaibli... Elles l'ont "}, {"text": "renforcé", "bold": true}, {"text": " !"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Forces Nées des Épreuves - Reconnaissance" },

        { type: 'message', content: [{"text": "💎 Grâce à tes défis, tu as développé des forces "}, {"text": "extraordinaires", "bold": true, "italic": true}, {"text": "..."}] },
        { type: 'message', content: [{"text": "🧠 Les neurosciences le confirment : chaque épreuve surmontée "}, {"text": "recâble ton cerveau", "bold": true}, {"text": " vers plus de force."}] },
        { type: 'message', content: [{"text": "✨ Quelles forces"}, {"text": " as-tu développées grâce à tes épreuves relationnelles ?"}] },
        { type: 'text_input', variable: 'forces_developpees_grace_aux_epreuves', placeholder: "Grâce à mes épreuves, j'ai développé...", isLong: true },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Forces Nées des Épreuves - Validation" },

        { type: 'narrative', content: [{"text": "💫 \"Chaque cicatrice est une "}, {"text": "médaille d'honneur", "bold": true, "italic": true}, {"text": "\""}, {"text": "\n\n"}, {"text": "Elle raconte l'histoire de ta "}, {"text": "victoire", "bold": true}, {"text": " sur l'adversité."}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Forces Relationnelles - Exploration" },

        { type: 'message', content: [{"text": "🔬 Basé sur les recherches VIA (Values in Action), explorons tes "}, {"text": "forces de caractère", "bold": true}, {"text": " :"}] },
        { type: 'message', content: [{"text": "✨ Parmi ces qualités relationnelles, lesquelles "}, {"text": "rayonnent", "bold": true, "italic": true}, {"text": " particulièrement en toi ?"}] },
        { type: 'choice', variable: 'qualites_relationnelles_enrichi', multiple: true, options: [{"id": "ecoute_profonde_et_presente", "label": "🎧 Écoute profonde et présente"}, {"id": "empathie_oceanique", "label": "🌊 Empathie océanique"}, {"id": "loyaute_de_diamant", "label": "💎 Loyauté de diamant"}, {"id": "generosite_solaire", "label": "☀️ Générosité solaire"}, {"id": "humour_guerisseur", "label": "😊 Humour guérisseur"}, {"id": "authenticite_cristalline", "label": "🔮 Authenticité cristalline"}, {"id": "patience_de_sage", "label": "🌱 Patience de sage"}, {"id": "creativite_d_artiste", "label": "🎨 Créativité d'artiste"}, {"id": "soutien_de_montagne", "label": "🏔️ Soutien de montagne"}, {"id": "passion_flamme", "label": "🔥 Passion flamme"}, {"id": "sagesse_intuitive", "label": "🦋 Sagesse intuitive"}, {"id": "courage_de_lionne", "label": "🦁 Courage de lionne"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Forces Relationnelles - Manifestation" },

        { type: 'message', content: "🎊 MAGNIFIQUE ! Quelle richesse intérieure !" },
        { type: 'message', content: [{"text": "💫 Comment ces qualités "}, {"text": "précieuses", "bold": true}, {"text": " se manifestent-elles concrètement dans tes relations ?"}] },
        { type: 'message', content: "💡 Par exemple :\n\n\"Mon écoute profonde se manifeste quand je...\"\n\n\"Ma générosité rayonne à travers...\"\n\n\"Mon authenticité se révèle dans...\"" },
        { type: 'text_input', variable: 'manifestation_concrete_des_qualites', placeholder: "Mes qualités se manifestent concrètement quand...", isLong: true },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Moments de Réussite - Analyse" },

        { type: 'message', content: [{"text": "Merci pour ce précieux partage"}, {"text": " !"}] },
        { type: 'message', content: [{"text": "🔍 Maintenant, explorons la "}, {"text": "magie", "bold": true, "italic": true}, {"text": " derrière ce moment..."}] },
        { type: 'message', content: [{"text": "✨ Qu'est-ce qui a rendu ce moment si "}, {"text": "spécial", "bold": true}, {"text": " ? Qu'as-tu fait différemment ?"}] },
        { type: 'message', content: "💡 Peut-être as-tu :\n\n• Écouté ton intuition profonde ?\n\n• Agi depuis ton cœur plutôt que tes peurs ?\n\n• Été complètement authentique ?\n\n• Créé un espace sécure pour l'autre ?" },
        { type: 'text_input', variable: 'facteurs_de_reussite_enrichi', placeholder: "Ce qui a rendu ce moment magique, c'est que j'ai...", isLong: true },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Moments de Réussite - Formule Secrète" },

        { type: 'message', content: [{"text": "🎯 Tu viens de révéler ta "}, {"text": "FORMULE SECRÈTE", "bold": true, "italic": true}, {"text": " du succès relationnel !"}] },
        { type: 'narrative', content: [{"text": "💎 Cette formule est "}, {"text": "PRÉCIEUSE", "bold": true}, {"text": " ! Elle contient les clés de tes futurs succès."}, {"text": "\n\n"}, {"text": "Chaque fois que tu appliques ces ingrédients, tu "}, {"text": "rayonnes", "bold": true, "italic": true}, {"text": " !"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Croissance de Sage - Introduction" },

        { type: 'message', content: [{"text": "🌱 Parlons maintenant de ta "}, {"text": "croissance", "bold": true, "italic": true}, {"text": "..."}] },
        { type: 'message', content: [{"text": "🌳 Comme un arbre qui grandit année après année, tu as développé des "}, {"text": "anneaux de sagesse", "bold": true}, {"text": " à travers tes expériences."}] },
        { type: 'message', content: [{"text": "💫 Comment as-tu "}, {"text": "évolué", "bold": true}, {"text": " à travers tes expériences relationnelles ?"}] },
        { type: 'message', content: "🦋 Peut-être as-tu appris à :\n\n• Poser des limites avec amour ?\n\n• Communiquer tes besoins avec clarté ?\n\n• Faire confiance à ton intuition ?\n\n• T'aimer avant d'aimer l'autre ?" },
        { type: 'text_input', variable: 'croissance_relationnelle_enrichi', placeholder: "À travers mes relations, j'ai grandi en apprenant à...", isLong: true },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Croissance de Sage - Sagesse Acquise" },

        { type: 'message', content: [{"text": "🌟 Maintenant, j'aimerais que tu touches quelque chose de "}, {"text": "profondément précieux", "bold": true, "italic": true}, {"text": "..."}] },
        { type: 'message', content: [{"text": "💌 Quelle sagesse as-tu acquise que tu pourrais partager dans une "}, {"text": "lettre d'amour", "bold": true, "italic": true}, {"text": " à la version plus jeune de toi ?"}] },
        { type: 'message', content: "💕 Tu pourrais lui dire :\n\n\"Les leçons les plus précieuses que j'ai apprises...\"\n\n\"Ma chérie, j'aimerais que tu saches...\"\n\n\"Ce que j'aurais aimé savoir plus tôt...\"" },
        { type: 'text_input', variable: 'sagesse_acquise_lettre_au_passe_enrichi', placeholder: "Chère moi du passé, voici les trésors de sagesse que j'ai découverts...", isLong: true },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Force Cachée - Révélation" },

        { type: 'message', content: [{"text": "🗝️ Il est temps de révéler un secret "}, {"text": "précieux", "bold": true, "italic": true}, {"text": "..."}] },
        { type: 'message', content: [{"text": "🌟 Il existe en toi une force... mais tu la gardes "}, {"text": "cachée", "bold": true}, {"text": " comme un trésor dans un coffre."}] },
        { type: 'message', content: [{"text": "💎 Quelle force "}, {"text": "peu commune", "bold": true}, {"text": " as-tu développée que tu ne dévoiles pas aux autres ?"}] },
        { type: 'message', content: "🌸 Peut-être :\n\n• Ta capacité à voir au-delà des apparences ?\n\n• Ton don pour guérir les cœurs brisés ?\n\n• Ta sagesse intuitive profonde ?\n\n• Ton pouvoir de transformation ?" },
        { type: 'text_input', variable: 'force_cachee_revelee_enrichi', placeholder: "J'ai développé une force secrète magnifique : ma capacité à...", isLong: true },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Force Cachée - Libération" },

        { type: 'message', content: [{"text": "💭 Qu'est-ce qui t'amène à garder cette force "}, {"text": "magnifique", "bold": true, "italic": true}, {"text": " encore cachée ?"}] },
        { type: 'message', content: [{"text": "💕 Aucun jugement ici... juste "}, {"text": "pour comprendre ce qui te protège."}] },
        { type: 'text_input', variable: 'raisons_de_cacher_cette_force_enrichi', placeholder: "Je garde cette force cachée parce que...", isLong: true },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Ressources Intérieures - Image" },

        { type: 'image', url: "https://images.unsplash.com/photo-1750105591521-f8cbf185edfa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHNlYXJjaHw2MHx8cmFjaW5lc3xlbnwwfDB8fHwxNzU2OTA4NzU2fDA&ixlib=rb-4.1.0&q=80&w=1080", alt: "" },
        { type: 'narrative', content: [{"text": "🌳 Regarde ces racines puissantes... Elles puisent leur force dans les profondeurs de la terre..."}, {"text": "\n\n"}, {"text": "Comme tes "}, {"text": "ressources intérieures", "bold": true, "italic": true}, {"text": " qui te nourrissent dans les moments difficiles."}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Ressources Intérieures - Exploration" },

        { type: 'message', content: [{"text": "💪 Quand la tempête relationnelle fait rage, tu ne restes pas "}, {"text": "démunie", "bold": true}, {"text": "..."}] },
        { type: 'message', content: [{"text": "🔥 Sur quelles "}, {"text": "forces intérieures ", "bold": true, "italic": true}, {"text": "peux-tu compter dans les moments relationnels difficiles ?"}] },
        { type: 'choice', variable: 'ressources_interieures_enrichi', options: [{"id": "resilience_de_diamant", "label": "💎 Résilience de diamant"}, {"id": "intuition_cristalline", "label": "🔮 Intuition cristalline"}, {"id": "courage_de_lionne", "label": "🦁 Courage de lionne"}, {"id": "creativite_arc_en_ciel", "label": "🌈 Créativité arc-en-ciel"}, {"id": "spiritualite_ancree", "label": "🕊️ Spiritualité ancrée"}, {"id": "humour_guerisseur", "label": "😄 Humour guérisseur"}, {"id": "determination_de_montagne", "label": "🏔️ Détermination de montagne"}, {"id": "auto_compassion_lotus", "label": "🪷 Auto-compassion lotus"}, {"id": "sagesse_de_hibou", "label": "🦉 Sagesse de hibou"}, {"id": "force_de_phenix", "label": "🔥 Force de phénix"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Ressources Intérieures - Utilisation Future" },

        { type: 'message', content: [{"text": "🚀 Maintenant, imaginons comment ces "}, {"text": "super-pouvoirs", "bold": true, "italic": true}, {"text": " peuvent transformer tes relations futures..."}] },
        { type: 'message', content: [{"text": "💫 Comment pourrais-tu "}, {"text": "utiliser ces ressources dans tes prochaines relations amoureuses ?"}] },
        { type: 'message', content: "🌸 Par exemple :\n\n\"Ma résilience me permettra de...\"\n\n\"Mon intuition me guidera pour...\"\n\n\"Ma créativité m'aidera à...\"" },
        { type: 'text_input', variable: 'utilisation_future_des_ressources_enrichi', placeholder: "Dans mes futures relations, j'utiliserai magnifiquement ces ressources pour...", isLong: true },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Créativité Relationnelle - Expression" },

        { type: 'image', url: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHNlYXJjaHwzNHx8Y3JlYXRpdml0JUMzJUE5fGVufDB8MHx8fDE3NTY5MTE4MjB8MA&ixlib=rb-4.1.0&q=80&w=1080", alt: "" },
        { type: 'message', content: [{"text": "🌺 Ta créativité relationnelle, c'est ta signature "}, {"text": "unique", "bold": true, "italic": true}, {"text": " dans l'art d'aimer..."}] },
        { type: 'message', content: [{"text": "🎭 Comment exprimes-tu ta "}, {"text": "créativité ", "bold": true}, {"text": "dans tes relations ?"}] },
        { type: 'message', content: "💕 Peut-être à travers :\n\n• Des surprises touchantes ?\n\n• Des mots poétiques uniques ?\n\n• Des gestes d'amour inventifs ?\n\n• Des moments magiques créés ?" },
        { type: 'text_input', variable: 'expression_de_la_creativite_relationnelle_enrichi', placeholder: "J'exprime ma créativité relationnelle en...", isLong: true },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Visualisation Créative - Introduction" },

        { type: 'message', content: [{"text": "🎬 Maintenant, créons ensemble un "}, {"text": "film magique", "bold": true, "italic": true}, {"text": "..."}] },
        { type: 'narrative', content: [{"text": "🧘‍♀️ Ferme les yeux... Respire profondément..."}, {"text": "\n\n"}, {"text": "Laisse ton imagination "}, {"text": "s'envoler", "bold": true, "italic": true}, {"text": "..."}] },
        { type: 'narrative', content: [{"text": "🌅 Tu te retrouves dans un lieu "}, {"text": "magique", "bold": true}, {"text": " avec la personne que tu aimes..."}, {"text": "\n\n"}, {"text": "Vous exprimez parfaitement toutes vos "}, {"text": "qualités magnifiques", "bold": true}, {"text": "..."}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Visualisation Créative - Expérience" },

        { type: 'message', content: [{"text": "✨ Décris-moi cette scène "}, {"text": "merveilleuse", "bold": true, "italic": true}, {"text": " :"}] },
        { type: 'message', content: "🎭 Où êtes-vous ? Que ressentez-vous ?\n\n💫 Comment vos qualités dansent-elles ensemble ?\n\n🌈 Quelle magie créez-vous à deux ?\n\n💕 Comment votre amour rayonne-t-il ?" },
        { type: 'text_input', variable: 'visualisation_creative_guidee', placeholder: "Dans cette scène magique, je me vois... Nous créons ensemble...", isLong: true },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Vision Future - Image Horizon" },

        { type: 'image', url: "https://images.unsplash.com/photo-1522506209496-4536d9020ec4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHNlYXJjaHwzfHxzb21tZXR8ZW58MHwwfHx8MTc1NjkxMTQ2MXww&ixlib=rb-4.1.0&q=80&w=1080", alt: "" },
        { type: 'narrative', content: [{"text": "🌅 Depuis le sommet..."}, {"text": "\n\n"}, {"text": "Tu peux voir "}, {"text": "l'horizon infini", "bold": true, "italic": true}, {"text": " de tes possibilités !"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Vision Future - La Femme que tu Deviens" },

        { type: 'message', content: [{"text": "👑 J'aimerais que tu rencontres quelqu'un "}, {"text": "d'exceptionnelle", "bold": true, "italic": true}, {"text": "..."}] },
        { type: 'narrative', content: [{"text": "✨ Cette femme, c'est "}, {"text": "TOI", "bold": true}, {"text": " dans 6 mois..."}, {"text": "\n\n"}, {"text": "Quand tu auras pleinement intégré toutes tes forces et ta créativité ! 🌟"}] },
        { type: 'message', content: [{"text": "👸 Décris-moi cette femme "}, {"text": "spéciale", "bold": true}, {"text": " que tu es en train de devenir :"}] },
        { type: 'message', content: "💫 Comment se tient-elle ? Quelle lumière dans ses yeux ?\n\n🚀 Comment aborde-t-elle les relations ?\n\n🦋 Quelle sagesse rayonne d'elle ?\n\n💖 Comment exprime-t-elle son amour ?" },
        { type: 'text_input', variable: 'vision_de_la_femme_future_magnifique', placeholder: "Cette femme magnifique que je deviens rayonne de... Elle aborde l'amour avec...", isLong: true },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Vision Future - Lettre à l'Amour" },

        { type: 'message', content: [{"text": "💌 Pour terminer cette vision, écris une "}, {"text": "lettre d'amour", "bold": true, "italic": true}, {"text": "..."}] },
        { type: 'message', content: [{"text": "✨ Une lettre à ton "}, {"text": "futur amour", "bold": true}, {"text": ", écrite depuis ta nouvelle force et ta créativité épanouie..."}] },
        { type: 'message', content: "💕 Tu pourrais lui dire :\n\n• Ce que tu lui apporteras de précieux\n\n• Comment vous allez vous enrichir mutuellement\n\n• La magie que vous créerez ensemble\n\n• Tes promesses d'amour authentique" },
        { type: 'text_input', variable: 'lettre_au_futur_amour', placeholder: "Mon cher futur amour, je t'écris depuis ma nouvelle lumière pour te dire...", isLong: true },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Célébration Finale - Récapitulatif" },

        { type: 'message', content: [{"text": "🎊 FÉLICITATIONS ! Tu viens d'accomplir quelque chose d'"}, {"text": "extraordinaire", "bold": true}, {"text": " !"}] },
        { type: 'message', content: [{"text": "✨ Regarde tous les "}, {"text": "trésors", "bold": true, "italic": true}, {"text": " que tu as identifiés :"}] },
        { type: 'message', content: "💎 Tes forces nées des épreuves (transformant la douleur en diamant)" },
        { type: 'message', content: "💖 Tes qualités relationnelles uniques" },
        { type: 'message', content: "🌳 Tes ressources intérieures (tes racines puissantes)" },
        { type: 'message', content: "🎨 Ta créativité relationnelle (ta signature d'amour)" },
        { type: 'message', content: "👑 Ta vision de la femme que tu deviens" },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Célébration Finale - Attestation" },

        { type: 'narrative', content: [{"text": "✨ Tu es "}, {"text": "PRÊTE", "bold": true}, {"text": " pour créer des relations à l'image de ce que tu souhaites !"}, {"text": "\n\n"}, {"text": "💎 Tu possèdes un arsenal de forces extraordinaires !"}, {"text": "\n\n"}, {"text": "🎨 Ta créativité relationnelle est un cadeau !"}, {"text": "\n\n"}, {"text": "👑 Tu mérites un amour à la hauteur de tes attentes !"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Transition vers la Floraison" },

        { type: 'narrative', content: [{"text": "🌸 Avec tous ces fruits que tu portes..."}, {"text": "\n\n"}, {"text": "Il est temps d'entrer dans la "}, {"text": "FLORAISON", "bold": true, "italic": true}, {"text": " !"}] },
        { type: 'narrative', content: [{"text": "💫 La prochaine phase de ton voyage t'attend..."}, {"text": "\n\n"}, {"text": "Où tu vas apprendre à faire "}, {"text": "éclore", "bold": true, "italic": true}, {"text": " toute cette beauté intérieure !"}] },
        { type: 'narrative', content: [{"text": "🙏 Merci infiniment pour ton "}, {"text": "courage et", "bold": true}, {"text": " ta "}, {"text": "sincérité", "bold": true}, {"text": " ! 💝"}] },
        { type: 'narrative', content: [{"text": "🌙 \"Et c'est Lui qui fait descendre du ciel une eau avec laquelle Nous faisons germer toute plante\"", "italic": true}, {"text": "\n\n"}, {"text": "Tes forces sont en train de germer... Maintenant, elles vont "}, {"text": "fleurir inshaAllah", "bold": true, "italic": true}, {"text": " ! 🌺"}] },
        { type: 'narrative', content: [{"text": "📩 Pour m’informer que tu as complété la "}, {"text": "Phase 3", "bold": true}, {"text": ", il te suffit de cliquer sur le lien ci-dessous."}, {"text": "\n\n"}, {"text": "\n Un message pré-rempli s’ouvrira automatiquement sur WhatsApp que tu n’auras qu’à envoyer :"}, {"text": "\n\n"}, {"text": "👉 "}, {"text": "\n\n"}, {"text": "Cela me permet de suivre ton avancée et d’avancer dans la suite du programme pour toi, insha’Allah."}, {"text": "\n\n"}, {"text": "Je te dis à très vite ! 🌿"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Moments de Réussite - Exploration" },

        { type: 'message', content: [{"text": "🌈 J'aimerais que tu me racontes quelque chose"}, {"text": "..."}] },
        { type: 'narrative', content: [{"text": "💖 Peux-tu me parler d'un moment où tu as vraiment "}, {"text": "brillé", "bold": true}, {"text": " dans une relation ?"}, {"text": "\n\n"}, {"text": "Un moment où tu t'es sentie parfaitement "}, {"text": "alignée", "bold": true, "italic": true}, {"text": " avec qui tu es vraiment ?"}] },
        { type: 'message', content: "🌸 Ce peut être :\n\n• Un moment de pure connexion\n\n• Une réconciliation magnifique\n\n• Un geste d'amour parfaitement juste\n\n• Un moment où tu as su exactement quoi dire" },
        { type: 'text_input', variable: 'moment_de_reussite_relationnelle_enrichi', placeholder: "Je me souviens d'un moment magnifique où...", isLong: true },

        { type: 'completion', title: "Félicitations !", message: "Tu as terminé F3.4 — Forces & Créativité. Tes réponses ont été sauvegardées.", icon: '🎨' }
    ]
};

/* ─── Form Registry ─── */
if (typeof window.FORM_REGISTRY === 'undefined') window.FORM_REGISTRY = {};
window.FORM_REGISTRY['f3-4-forces-creativite'] = F3_4_FORCES_CREATIVITE;
