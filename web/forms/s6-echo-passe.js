/* ═══════════════════════════════════════
   S6 — L'Écho du Passé
   Converti depuis Typebot · 108 steps · 8 variables
═══════════════════════════════════════ */

const S6_ECHO_PASSE = {
    id: 's6_echo_passe',
    version: 1,
    title: "S6 — L'Écho du Passé",
    icon: '🔊',
    checkboxId: 's6',
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
        "apprentissage_sur_la_guerison",
        "declencheurs_personnels_reconnus",
        "echos_personnels_du_passe",
        "rapport_au_passe_amoureux",
        "reaction_aux_declencheurs",
        "reaction_viscerale_au_trauma",
        "strategie_de_partage_vulnerable",
        "telephone"
],

    steps: [

        /* ════════════════════════════════════ */
        { type: 'section', title: "Cartographie émotionnelle" },

        { type: 'image', url: "https://images.unsplash.com/photo-1692285732742-859cce7ed425?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHNlYXJjaHwzN3x8b21icmVzfGVufDB8MHx8fDE3NTcyNDI2NDl8MA&ixlib=rb-4.1.0&q=80&w=1080", alt: "" },
        { type: 'message', content: "🌙 Les ombres qui nous suivent..." },
        { type: 'text_input', variable: 'reponse', placeholder: "Rappelle moi ton prénom..." },
        { type: 'phone_input', variable: 'telephone', placeholder: "06 12 34 56 78", defaultPrefix: '+33' },
        { type: 'email_input', variable: 'email', placeholder: "ton.email@exemple.com" },
        { type: 'narrative', content: [{"text": "Aujourd'hui, nous explorons ce qui ", "bold": true}, {"text": "résonne", "bold": true}, {"text": " du passé dans le présent..."}, {"text": "\n\n"}, {"text": "Mais d'abord, dis-moi..."}] },
        { type: 'message', content: [{"text": "💔 ", "bold": true}, {"text": "Comment vis-tu avec ton passé amoureux ?"}] },
        { type: 'choice', variable: 'rapport_au_passe_amoureux', options: [{"id": "je_l_ai_transcende_j_ai_appri", "label": "Je l'ai transcendé\n\"J'ai appris et j'ai grandi\""}, {"id": "il_reste_des_cicatrices_certa", "label": "Il reste des cicatrices\n\"Certaines blessures sont encore sensibles\""}, {"id": "je_le_porte_en_silence_j_evit", "label": "Je le porte en silence\n\"J'évite d'y penser ou d'en parler\""}, {"id": "il_me_hante_parfois_des_echos", "label": "Il me hante parfois\n\"Des échos surgissent sans prévenir\""}, {"id": "c_est_complique_entre_gueriso", "label": "C'est compliqué\n\"Entre guérison et vigilance\""}] },
        { type: 'message', content: [{"text": "Cette relation au passé teinte ", "bold": true}, {"text": "chaque nouveau début", "bold": true}, {"text": "..."}] },
        { type: 'message', content: [{"text": "⚡ Et quand quelque chose réveille une vieille douleur..."}, {"text": "\n\n"}, {"text": "Comment réagis-tu ?", "bold": true}] },
        { type: 'choice', variable: 'reaction_aux_declencheurs', options: [{"id": "je_me_ferme_instantanement", "label": "Je me ferme instantanément"}, {"id": "je_communique_ma_blessure", "label": "Je communique ma blessure"}, {"id": "je_fuis_la_situation", "label": "Je fuis la situation"}, {"id": "je_sur_reagis_malgre_moi", "label": "Je sur-réagis malgré moi"}, {"id": "je_dissimule_ma_panique", "label": "Je dissimule ma panique"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "L'écho se réveille" },

        { type: 'narrative', content: [{"text": "Le passé..."}, {"text": "\n\n"}, {"text": "On croit l'avoir ", "italic": true}, {"text": "enterré", "italic": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Jusqu'à ce qu'un geste, un mot, une situation le ", "bold": true}, {"text": "ressuscite", "bold": true}, {"text": "."}] },
        { type: 'image', url: "https://images.unsplash.com/photo-1633265486501-0cf524a07213?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHNlYXJjaHwyfHxwYXN0fGVufDB8MHx8fDE3NTcyNDI2Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080", alt: "" },
        { type: 'message', content: [{"text": "💔 ", "italic": true}, {"text": "Quand le présent réveille le passé...", "italic": true}] },
        { type: 'narrative', content: [{"text": "Laisse-moi te raconter l'histoire de ", "bold": true}, {"text": "Fatima", "bold": true}, {"text": "..."}, {"text": "\n\n"}, {"text": "Une histoire où l'amour nouveau se heurte aux ", "italic": true}, {"text": "fantômes anciens", "italic": true}, {"text": "."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "vivre_ce_moment_de_verite", "label": "Vivre ce moment de vérité →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Le moment de bascule" },

        { type: 'narrative', content: [{"text": "Trois mois de ", "bold": true}, {"text": "renaissance", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Fatima s'était promis de ne plus aimer. Deux ans après la ", "italic": true}, {"text": "trahison", "italic": true}, {"text": " qui l'avait brisée, elle avait construit des ", "bold": true}, {"text": "murs", "bold": true}, {"text": " autour de son cœur."}, {"text": "\n\n"}, {"text": "Puis Mehdi est arrivé. Différent. ", "italic": true}, {"text": "Patient", "italic": true}, {"text": ". ", "italic": true}, {"text": "Doux", "italic": true}, {"text": ". Les murs ont commencé à ", "bold": true}, {"text": "s'effriter", "bold": true}, {"text": "."}] },
        { type: 'message', content: "Ce soir-là, ils regardent son téléphone ensemble, des photos d'un voyage qu'il planifie.\n\nUne notification apparaît.\n\nMessage d'une femme. Juste un prénom et un cœur.\n\nMehdi glisse rapidement l'écran. Trop rapidement." },
        { type: 'narrative', content: [{"text": "Le ", "bold": true}, {"text": "sang", "bold": true}, {"text": " de Fatima se ", "bold": true}, {"text": "glace", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Ce geste. Cette rapidité à cacher. Elle l'a ", "italic": true}, {"text": "déjà vu", "italic": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Soudain, elle n'est plus avec Mehdi en 2024."}, {"text": "\n\n"}, {"text": "Elle est avec ", "bold": true}, {"text": "Karim", "bold": true}, {"text": " en 2022. Le soir où elle a découvert les ", "italic": true}, {"text": "autres messages", "italic": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "\"", "italic": true}, {"text": "Qui est-ce ?", "italic": true}, {"text": "\" Sa voix sort ", "bold": true}, {"text": "étranglée", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "\"", "italic": true}, {"text": "Juste une collègue, pourquoi ?", "italic": true}, {"text": "\" Mehdi semble sincèrement surpris."}, {"text": "\n\n"}, {"text": "Mais Fatima ne l'entend plus. Dans sa tête, un ", "bold": true}, {"text": "film", "bold": true}, {"text": " se déroule. Tous les signes qu'elle avait ignorés avec Karim. Tous les \"", "italic": true}, {"text": "c'est juste une amie", "italic": true}, {"text": "\"."}, {"text": "\n\n"}, {"text": "Son corps ", "bold": true}, {"text": "tremble", "bold": true}, {"text": ". Le passé et le présent se ", "bold": true}, {"text": "confondent", "bold": true}, {"text": "."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "entendre_la_tempete_interieure", "label": "Entendre la tempête intérieure →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Les voix du trauma" },

        { type: 'message', content: [{"text": "Dans le chaos intérieur, les ", "bold": true}, {"text": "voix", "bold": true}, {"text": " s'entrechoquent..."}] },
        { type: 'narrative', content: [{"text": "🛡️ ", "italic": true}, {"text": "\"Fuis. Maintenant. Avant qu'il ne soit trop tard.\"", "italic": true}, {"text": "\n\n"}, {"text": "💔 ", "italic": true}, {"text": "\"Tu vois ? Tu ne peux faire confiance à personne.\"", "italic": true}, {"text": "\n\n"}, {"text": "⚡ ", "italic": true}, {"text": "\"Tous les mêmes. TOUS.\"", "italic": true}, {"text": "\n\n"}, {"text": "✨ ", "italic": true}, {"text": "\"Mais attends... Mehdi n'est pas Karim...\"", "italic": true}, {"text": "\n\n"}, {"text": "🌊 ", "italic": true}, {"text": "\"Comment tu peux en être sûre ? Tu étais sûre avec Karim aussi.\"", "italic": true}, {"text": "\n\n"}, {"text": "💭 ", "italic": true}, {"text": "\"Respire. Juste... respire.\"", "italic": true}] },
        { type: 'narrative', content: [{"text": "Mehdi la regarde, ", "bold": true}, {"text": "inquiet", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "\"", "italic": true}, {"text": "Fatima, qu'est-ce qui se passe ? Tu es toute pâle...", "italic": true}, {"text": "\""}, {"text": "\n\n"}, {"text": "Elle veut parler. Expliquer. Mais les mots sont ", "bold": true}, {"text": "coincés", "bold": true}, {"text": " derrière des années de ", "italic": true}, {"text": "méfiance apprise", "italic": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Comment dire \"", "italic": true}, {"text": "Tu n'as rien fait mais tu me rappelles ma pire douleur", "italic": true}, {"text": "\" ?"}] },
        { type: 'choice', variable: 'choix', options: [{"id": "explorer_ma_propre_resonance", "label": "Explorer ma propre résonance →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Ton écho personnel" },

        { type: 'narrative', content: [{"text": "Avant de voir comment Fatima navigue ce moment..."}, {"text": "\n\n"}, {"text": "Explorons ", "bold": true}, {"text": "tes", "bold": true}, {"text": " propres échos."}] },
        { type: 'narrative', content: [{"text": "💔 ", "bold": true}, {"text": "Si tu étais à la place de Fatima..."}, {"text": "\n\n"}, {"text": "Face à ce geste qui ", "italic": true}, {"text": "réveille", "italic": true}, {"text": " une ancienne blessure..."}, {"text": "\n\n"}, {"text": "Quelle serait ta ", "bold": true}, {"text": "première réaction viscérale", "bold": true}, {"text": " ?"}] },
        { type: 'choice', variable: 'reaction_viscerale_au_trauma', options: [{"id": "la_panique_totale_c_est_rep", "label": "La panique totale - \"C'est reparti, je dois fuir\""}, {"id": "la_confrontation_immediate", "label": "La confrontation immédiate - \"Montre-moi ce message\""}, {"id": "le_repli_silencieux_je_vais", "label": "Le repli silencieux - \"Je vais faire semblant et enquêter\""}, {"id": "la_dissociation_je_ne_suis", "label": "La dissociation - \"Je ne suis plus vraiment là\""}, {"id": "l_effort_de_raison_ce_n_est", "label": "L'effort de raison - \"Ce n'est pas lui, c'est mon trauma\""}, {"id": "la_colere_explosive_comment", "label": "La colère explosive - \"Comment oses-tu me faire revivre ça ?\""}] },
        { type: 'message', content: [{"text": "Cette réaction montre comment ton passé ", "bold": true}, {"text": "habite", "bold": true}, {"text": " ton présent..."}] },
        { type: 'narrative', content: [{"text": "Creusons plus ", "bold": true}, {"text": "profond", "bold": true}, {"text": "..."}, {"text": "\n\n"}, {"text": "Qu'est-ce qui, dans ton passé, ", "bold": true}, {"text": "résonne encore", "bold": true}, {"text": " dans tes relations actuelles ?"}] },
        { type: 'text_input', variable: 'echos_personnels_du_passe', placeholder: "Les échos de mon passé qui surgissent encore...", isLong: true },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Naviguer la tempête" },

        { type: 'message', content: [{"text": "Cette conscience est ", "bold": true}, {"text": "courageuse", "bold": true}, {"text": "..."}] },
        { type: 'narrative', content: [{"text": "Revenons à Fatima..."}, {"text": "\n\n"}, {"text": "Entre ", "bold": true}, {"text": "fuir", "bold": true}, {"text": " et ", "bold": true}, {"text": "affronter", "bold": true}, {"text": ", elle cherche une troisième voie."}] },
        { type: 'narrative', content: [{"text": "Elle prend une ", "bold": true}, {"text": "inspiration tremblante", "bold": true}, {"text": " :"}, {"text": "\n\n"}, {"text": "\"", "italic": true}, {"text": "Mehdi... j'ai besoin de te parler de quelque chose. Ce n'est pas sur toi. C'est sur moi.", "italic": true}, {"text": "\""}, {"text": "\n\n"}, {"text": "Il pose son téléphone. Complètement. Son attention est ", "bold": true}, {"text": "totale", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "\"", "italic": true}, {"text": "Je t'écoute.", "italic": true}, {"text": "\""}] },
        { type: 'narrative', content: [{"text": "\"", "italic": true}, {"text": "Quand tu as caché ce message... mon corps a réagi comme si j'étais en danger. Pas à cause de toi. À cause de... avant.", "italic": true}, {"text": "\""}, {"text": "\n\n"}, {"text": "Les larmes montent. Elle ne les retient pas."}, {"text": "\n\n"}, {"text": "\"", "italic": true}, {"text": "J'ai été trahie. Profondément. Et parfois, des petites choses réveillent cette blessure.", "italic": true}, {"text": "\""}] },
        { type: 'narrative', content: [{"text": "🌊 ", "bold": true}, {"text": "Dans ce moment de vulnérabilité..."}, {"text": "\n\n"}, {"text": "Comment penses-tu que Fatima devrait ", "bold": true}, {"text": "continuer", "bold": true}, {"text": " ?"}] },
        { type: 'choice', variable: 'strategie_de_partage_vulnerable', options: [{"id": "partager_les_details_voici", "label": "Partager les détails - \"Voici ce qui m'est arrivé...\""}, {"id": "rester_generale_j_ai_ete_bl", "label": "Rester générale - \"J'ai été blessée, c'est tout\""}, {"id": "demander_de_l_espace_j_ai_b", "label": "Demander de l'espace - \"J'ai besoin de temps pour processer\""}, {"id": "poser_ses_besoins_voici_ce", "label": "Poser ses besoins - \"Voici ce qui m'aiderait...\""}, {"id": "explorer_ensemble_aide_moi", "label": "Explorer ensemble - \"Aide-moi à différencier passé et présent\""}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Le chemin de guérison" },

        { type: 'message', content: [{"text": "La conversation qui suit est un ", "bold": true}, {"text": "pont", "bold": true}, {"text": "..."}] },
        { type: 'narrative', content: [{"text": "Mehdi reste ", "bold": true}, {"text": "silencieux", "bold": true}, {"text": " un moment. Puis :"}, {"text": "\n\n"}, {"text": "\"", "italic": true}, {"text": "Merci de me faire confiance avec ça. Je suis désolé que mon geste ait réveillé cette douleur.", "italic": true}, {"text": "\""}, {"text": "\n\n"}, {"text": "Il prend son téléphone, l'ouvre devant elle."}, {"text": "\n\n"}, {"text": "\"", "italic": true}, {"text": "Regarde. C'est Sarah, elle organise le projet sur lequel je travaille. Le cœur, c'est parce que j'ai eu la promotion. Rien de plus.", "italic": true}, {"text": "\""}] },
        { type: 'narrative', content: [{"text": "Fatima regarde. ", "bold": true}, {"text": "Voit", "bold": true}, {"text": ". ", "bold": true}, {"text": "Comprend", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Mais plus important que le contenu du message..."}, {"text": "\n\n"}, {"text": "C'est la ", "bold": true}, {"text": "transparence", "bold": true}, {"text": " de Mehdi. Sa ", "bold": true}, {"text": "patience", "bold": true}, {"text": ". Son absence de ", "italic": true}, {"text": "défensivité", "italic": true}, {"text": "."}, {"text": "\n\n"}, {"text": "\"", "italic": true}, {"text": "Je ne suis pas lui", "italic": true}, {"text": ",\" dit-il doucement. \"", "italic": true}, {"text": "Et je ferai attention à comment mes actions peuvent te toucher. Pas en marchant sur des œufs, mais en étant conscient.", "italic": true}, {"text": "\""}] },
        { type: 'narrative', content: [{"text": "Dans ce moment, quelque chose ", "bold": true}, {"text": "shift", "bold": true}, {"text": " en Fatima."}, {"text": "\n\n"}, {"text": "Pour la première fois, elle voit clairement la ", "bold": true}, {"text": "différence", "bold": true}, {"text": " :"}, {"text": "\n\n"}, {"text": "Entre un homme qui ", "italic": true}, {"text": "cache", "italic": true}, {"text": " et un homme qui ", "italic": true}, {"text": "révèle", "italic": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Entre un moment qui ", "italic": true}, {"text": "ressemble", "italic": true}, {"text": " au passé et un moment qui ", "italic": true}, {"text": "en diffère", "italic": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "💫 ", "bold": true}, {"text": "Dans cette guérison en cours..."}, {"text": "\n\n"}, {"text": "Quel ", "bold": true}, {"text": "apprentissage profond", "bold": true}, {"text": " émerge pour toi ?"}] },
        { type: 'text_input', variable: 'apprentissage_sur_la_guerison', placeholder: "Ce que cette histoire m'enseigne sur la guérison...", isLong: true },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Les mécanismes du trauma" },

        { type: 'message', content: [{"text": "Cet apprentissage touche à l'", "bold": true}, {"text": "essence", "bold": true}, {"text": " de la guérison..."}] },
        { type: 'message', content: [{"text": "Explorons ce qui se passe ", "bold": true}, {"text": "vraiment", "bold": true}, {"text": " quand le passé surgit..."}] },
        { type: 'narrative', content: [{"text": "🔄 ", "bold": true}, {"text": "Le Cycle du Trauma Relationnel :"}, {"text": "\n\n"}, {"text": "1. ", "bold": true}, {"text": "Le Déclencheur", "bold": true}, {"text": "\n\n"}, {"text": "   Un geste, mot, situation qui ", "italic": true}, {"text": "ressemble", "italic": true}, {"text": "\n\n"}, {"text": "2. ", "bold": true}, {"text": "L'Activation", "bold": true}, {"text": "\n\n"}, {"text": "   Le corps réagit ", "italic": true}, {"text": "avant", "italic": true}, {"text": " le mental"}, {"text": "\n\n"}, {"text": "   Fight, flight, freeze"}, {"text": "\n\n"}, {"text": "3. ", "bold": true}, {"text": "La Confusion Temporelle", "bold": true}, {"text": "\n\n"}, {"text": "   Passé et présent se ", "italic": true}, {"text": "mélangent", "italic": true}, {"text": "\n\n"}, {"text": "4. ", "bold": true}, {"text": "La Projection", "bold": true}, {"text": "\n\n"}, {"text": "   L'autre devient le ", "italic": true}, {"text": "fantôme", "italic": true}, {"text": " du passé"}, {"text": "\n\n"}, {"text": "5. ", "bold": true}, {"text": "La Réaction", "bold": true}, {"text": "\n\n"}, {"text": "   Disproportionnée au présent"}] },
        { type: 'narrative', content: [{"text": "💔 ", "bold": true}, {"text": "Les Signaux d'un Trauma Activé :"}, {"text": "\n\n"}, {"text": "• ", "bold": true}, {"text": "Corps :", "bold": true}, {"text": " Cœur qui s'emballe, tremblements, nausée"}, {"text": "\n\n"}, {"text": "• ", "bold": true}, {"text": "Mental :", "bold": true}, {"text": " Pensées en spirale, certitudes négatives"}, {"text": "\n\n"}, {"text": "• ", "bold": true}, {"text": "Émotionnel :", "bold": true}, {"text": " Panique, rage, détachement"}, {"text": "\n\n"}, {"text": "• ", "bold": true}, {"text": "Comportemental :", "bold": true}, {"text": " Fuite, attaque, paralysie"}] },
        { type: 'narrative', content: [{"text": "🌟 ", "bold": true}, {"text": "La Différence Cruciale :"}, {"text": "\n\n"}, {"text": "Réaction normale : ", "italic": true}, {"text": "\"Ça me dérange\"", "italic": true}, {"text": "\n\n"}, {"text": "   → Proportionnée, présente, négociable"}, {"text": "\n\n"}, {"text": "Trauma activé : ", "italic": true}, {"text": "\"C'est la fin\"", "italic": true}, {"text": "\n\n"}, {"text": "   → Intense, mélange les temps, absolutiste"}, {"text": "\n\n"}, {"text": "Reconnaître la différence est le ", "bold": true}, {"text": "premier pas", "bold": true}, {"text": " vers la guérison."}] },
        { type: 'narrative', content: [{"text": "En regardant tes propres relations..."}, {"text": "\n\n"}, {"text": "Quels ", "bold": true}, {"text": "déclencheurs", "bold": true}, {"text": " reconnais-tu ?"}] },
        { type: 'choice', variable: 'declencheurs_personnels_reconnus', options: [{"id": "les_messages_caches_ou_secrets", "label": "Les messages cachés ou secrets"}, {"id": "les_changements_de_comportemen", "label": "Les changements de comportement"}, {"id": "les_comparaisons_avec_d_autres", "label": "Les comparaisons avec d'autres"}, {"id": "l_indifference_ou_distance", "label": "L'indifférence ou distance"}, {"id": "les_promesses_non_tenues", "label": "Les promesses non tenues"}, {"id": "les_tons_de_voix_specifiques", "label": "Les tons de voix spécifiques"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Le miroir de la résilience" },

        { type: 'image', url: "https://images.unsplash.com/photo-1755467020939-4c3e196545bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NTcyNDI2OTJ8&ixlib=rb-4.1.0&q=80&w=1080", alt: "" },
        { type: 'message', content: [{"text": "Ta conscience émerge avec une ", "bold": true}, {"text": "tendresse courageuse", "bold": true}, {"text": "..."}] },
        { type: 'narrative', content: [{"text": "✨ Dans cette exploration du passé qui résonne, tu révèles une ", "bold": true}, {"text": "force particulière", "bold": true}, {"text": " :"}, {"text": "\n\n"}, {"text": "Tu reconnais que guérir n'est pas ", "italic": true}, {"text": "oublier", "italic": true}, {"text": "."}, {"text": "\n\n"}, {"text": "C'est apprendre à ", "bold": true}, {"text": "distinguer", "bold": true}, {"text": " l'écho du son original."}, {"text": "\n\n"}, {"text": "C'est permettre au présent d'être ", "italic": true}, {"text": "lui-même", "italic": true}, {"text": ", pas une ", "italic": true}, {"text": "répétition", "italic": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "Ce qui émerge de ton exploration :", "bold": true}, {"text": "\n\n"}, {"text": "• Tu portes tes ", "italic": true}, {"text": "cicatrices", "italic": true}, {"text": " avec conscience"}, {"text": "\n\n"}, {"text": "• Tu reconnais quand le ", "italic": true}, {"text": "passé parle", "italic": true}, {"text": "\n\n"}, {"text": "• Tu cherches la ", "italic": true}, {"text": "guérison", "italic": true}, {"text": " pas l'amnésie"}, {"text": "\n\n"}, {"text": "• Tu veux ", "italic": true}, {"text": "aimer", "italic": true}, {"text": " malgré les risques"}] },
        { type: 'narrative', content: [{"text": "Le défi n'est pas de ", "italic": true}, {"text": "ne plus jamais", "italic": true}, {"text": " être déclenchée."}, {"text": "\n\n"}, {"text": "C'est de ", "bold": true}, {"text": "reconnaître", "bold": true}, {"text": " quand ça arrive, de ", "bold": true}, {"text": "respirer", "bold": true}, {"text": " à travers, et de ", "bold": true}, {"text": "choisir", "bold": true}, {"text": " le présent."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "comprendre_la_voie_de_guerison", "label": "Comprendre la voie de guérison →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Le chemin vers la liberté" },

        { type: 'message', content: [{"text": "Laisse-moi t'éclairer sur le chemin d'évolution", "bold": true}, {"text": "..."}] },
        { type: 'message', content: [{"text": "🌱 ", "bold": true}, {"text": "Les 5 Étapes de la Guérison du Trauma Relationnel :"}] },
        { type: 'narrative', content: [{"text": "1. ", "bold": true}, {"text": "Reconnaissance", "bold": true}, {"text": "\n\n"}, {"text": "\"", "italic": true}, {"text": "J'ai été blessée et ça affecte encore ma vie", "italic": true}, {"text": "\""}, {"text": "\n\n"}, {"text": "→ Sortir du déni, accepter l'impact"}, {"text": "\n\n"}, {"text": "→ Sans cette étape, pas de guérison possible"}] },
        { type: 'narrative', content: [{"text": "2. ", "bold": true}, {"text": "Différenciation", "bold": true}, {"text": "\n\n"}, {"text": "\"", "italic": true}, {"text": "Ceci est le passé, cela est le présent", "italic": true}, {"text": "\""}, {"text": "\n\n"}, {"text": "→ Apprendre à séparer les temps"}, {"text": "\n\n"}, {"text": "→ Voir l'autre pour qui il est vraiment"}] },
        { type: 'narrative', content: [{"text": "3. ", "bold": true}, {"text": "Communication", "bold": true}, {"text": "\n\n"}, {"text": "\"", "italic": true}, {"text": "Voici mes blessures, voici mes besoins", "italic": true}, {"text": "\""}, {"text": "\n\n"}, {"text": "→ Partager sans accuser"}, {"text": "\n\n"}, {"text": "→ Demander du soutien, pas de la pitié"}] },
        { type: 'narrative', content: [{"text": "4. ", "bold": true}, {"text": "Intégration", "bold": true}, {"text": "\n\n"}, {"text": "\"", "italic": true}, {"text": "Mon passé fait partie de moi sans me définir", "italic": true}, {"text": "\""}, {"text": "\n\n"}, {"text": "→ Le trauma devient une ", "italic": true}, {"text": "partie", "italic": true}, {"text": " de l'histoire"}, {"text": "\n\n"}, {"text": "→ Pas toute l'histoire"}, {"text": "\n\n"}, {"text": "5. ", "bold": true}, {"text": "Transformation", "bold": true}, {"text": "\n\n"}, {"text": "\"", "italic": true}, {"text": "Ma blessure est devenue ma sagesse", "italic": true}, {"text": "\""}, {"text": "\n\n"}, {"text": "→ Capacité d'aider d'autres"}, {"text": "\n\n"}, {"text": "→ Force née de la vulnérabilité"}] },
        { type: 'narrative', content: [{"text": "💫 ", "bold": true}, {"text": "La Vérité Libératrice :"}, {"text": "\n\n"}, {"text": "Tu n'es pas ", "italic": true}, {"text": "responsable", "italic": true}, {"text": " de ce qui t'est arrivé."}, {"text": "\n\n"}, {"text": "Mais tu es ", "bold": true}, {"text": "responsable", "bold": true}, {"text": " de ta guérison."}, {"text": "\n\n"}, {"text": "Et tu ", "bold": true}, {"text": "mérites", "bold": true}, {"text": " un amour qui comprend tes échos sans devenir leur prisonnier."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "recevoir_mes_outils_de_gueriso", "label": "Recevoir mes outils de guérison →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Trois clés pour transcender" },

        { type: 'message', content: [{"text": "Pour naviguer les échos du passé avec ", "bold": true}, {"text": "sagesse", "bold": true}, {"text": "..."}] },
        { type: 'narrative', content: [{"text": "🔑 ", "bold": true}, {"text": "1. La Technique du Double Regard"}, {"text": "\n\n"}, {"text": "Quand tu sens le passé surgir :"}, {"text": "\n\n"}, {"text": "• ", "bold": true}, {"text": "Regarde", "bold": true}, {"text": " ce qui se passe ", "italic": true}, {"text": "objectivement", "italic": true}, {"text": "\n\n"}, {"text": "  \"Qu'est-ce qui vient de se passer concrètement ?\""}, {"text": "\n\n"}, {"text": "• ", "bold": true}, {"text": "Ressens", "bold": true}, {"text": " ce qui se passe ", "italic": true}, {"text": "émotionnellement", "italic": true}, {"text": "\n\n"}, {"text": "  \"Qu'est-ce que mon corps me dit ?\""}, {"text": "\n\n"}, {"text": "• ", "bold": true}, {"text": "Différencie", "bold": true}, {"text": "\n\n"}, {"text": "  \"Est-ce proportionné au présent ?\""}, {"text": "\n\n"}, {"text": "Cette ", "italic": true}, {"text": "pause consciente", "italic": true}, {"text": " crée l'espace pour choisir."}] },
        { type: 'narrative', content: [{"text": "🌊 ", "bold": true}, {"text": "2. Le Dialogue du Trauma"}, {"text": "\n\n"}, {"text": "Avec ton partenaire :"}, {"text": "\n\n"}, {"text": "\"", "italic": true}, {"text": "J'ai un signal interne qui s'est allumé. Ce n'est pas sur toi, c'est mon système qui réagit à quelque chose du passé.", "italic": true}, {"text": "\""}, {"text": "\n\n"}, {"text": "Puis :"}, {"text": "\n\n"}, {"text": "• ", "bold": true}, {"text": "Explique", "bold": true}, {"text": " ce qui a déclenché"}, {"text": "\n\n"}, {"text": "• ", "bold": true}, {"text": "Partage", "bold": true}, {"text": " ce dont tu as besoin"}, {"text": "\n\n"}, {"text": "• ", "bold": true}, {"text": "Demande", "bold": true}, {"text": " son soutien"}, {"text": "\n\n"}, {"text": "• ", "bold": true}, {"text": "Remercie", "bold": true}, {"text": " sa patience"}, {"text": "\n\n"}, {"text": "Transformer le ", "italic": true}, {"text": "monologue de peur", "italic": true}, {"text": " en ", "italic": true}, {"text": "dialogue de guérison", "italic": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "💫 ", "bold": true}, {"text": "3. L'Ancrage au Présent"}, {"text": "\n\n"}, {"text": "Pratique régulière pour renforcer ta capacité à rester ", "bold": true}, {"text": "ici et maintenant", "bold": true}, {"text": " :"}, {"text": "\n\n"}, {"text": "Chaque jour, note :"}, {"text": "\n\n"}, {"text": "• 3 choses que ton partenaire ", "bold": true}, {"text": "actuel", "bold": true}, {"text": " fait différemment"}, {"text": "\n\n"}, {"text": "• 2 moments où tu t'es sentie ", "bold": true}, {"text": "en sécurité", "bold": true}, {"text": "\n\n"}, {"text": "• 1 preuve que le ", "bold": true}, {"text": "présent", "bold": true}, {"text": " n'est pas le passé"}, {"text": "\n\n"}, {"text": "Construire activement une ", "italic": true}, {"text": "bibliothèque de preuves", "italic": true}, {"text": " que cette histoire est ", "bold": true}, {"text": "nouvelle", "bold": true}, {"text": "."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "explorer_la_dimension_spiritue", "label": "Explorer la dimension spirituelle →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "La dimension spirituelle de la guérison" },

        { type: 'message', content: [{"text": "Il y a une ", "bold": true}, {"text": "dimension sacrée", "bold": true}, {"text": " dans la guérison des blessures..."}] },
        { type: 'image', url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHNlYXJjaHwyfHxwYXlzYWdlfGVufDB8MHx8fDE3NTcyNDI3MjN8MA&ixlib=rb-4.1.0&q=80&w=1080", alt: "" },
        { type: 'narrative', content: [{"text": "🤲 Dans notre tradition, on dit :"}, {"text": "\n\n"}, {"text": "\"", "italic": true}, {"text": "Allah ne charge une âme que selon sa capacité", "italic": true}, {"text": "\""}, {"text": "\n\n"}, {"text": "Tes blessures ne sont pas une ", "italic": true}, {"text": "punition", "italic": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Elles sont peut-être une ", "bold": true}, {"text": "préparation", "bold": true}, {"text": " pour quelque chose de plus grand."}] },
        { type: 'narrative', content: [{"text": "La guérison spirituelle comprend :"}, {"text": "\n\n"}, {"text": "• ", "bold": true}, {"text": "Le Pardon", "bold": true}, {"text": "\n\n"}, {"text": "  Non pour excuser, mais pour te ", "italic": true}, {"text": "libérer", "italic": true}, {"text": "\n\n"}, {"text": "• ", "bold": true}, {"text": "La Confiance", "bold": true}, {"text": "\n\n"}, {"text": "  Que ce qui t'est destiné ne te manquera pas"}, {"text": "\n\n"}, {"text": "• ", "bold": true}, {"text": "La Gratitude", "bold": true}, {"text": "\n\n"}, {"text": "  Même pour les leçons ", "italic": true}, {"text": "difficiles", "italic": true}, {"text": "\n\n"}, {"text": "• ", "bold": true}, {"text": "L'Espoir", "bold": true}, {"text": "\n\n"}, {"text": "  Que l'amour ", "italic": true}, {"text": "vrai", "italic": true}, {"text": " existe encore"}] },
        { type: 'narrative', content: [{"text": "Dans tes moments de ", "bold": true}, {"text": "doute", "bold": true}, {"text": ", rappelle-toi :"}, {"text": "\n\n"}, {"text": "\"", "italic": true}, {"text": "Ya Allah, transforme mes blessures en sagesse, mes peurs en force, mes doutes en foi.", "italic": true}, {"text": "\""}, {"text": "\n\n"}, {"text": "La guérison n'est pas juste ", "italic": true}, {"text": "psychologique", "italic": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Elle est aussi ", "bold": true}, {"text": "spirituelle", "bold": true}, {"text": "."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "integrer_l_essence", "label": "Intégrer l'essence →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "L'essence à retenir" },

        { type: 'message', content: "De ce voyage dans les échos du passé, retiens ceci..." },
        { type: 'narrative', content: [{"text": "🌸 ", "bold": true}, {"text": "Ton passé n'est pas ton destin"}, {"text": "\n\n"}, {"text": "Il fait partie de ton ", "bold": true}, {"text": "histoire", "bold": true}, {"text": " sans écrire ton ", "bold": true}, {"text": "futur", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Chaque nouvelle relation est une ", "italic": true}, {"text": "page blanche", "italic": true}, {"text": " où tu peux écrire différemment."}, {"text": "\n\n"}, {"text": "🌸 ", "bold": true}, {"text": "La guérison n'est pas linéaire"}, {"text": "\n\n"}, {"text": "Des échos surgiront. C'est ", "italic": true}, {"text": "normal", "italic": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Ce qui compte est ta capacité grandissante à les ", "bold": true}, {"text": "reconnaître", "bold": true}, {"text": " et les ", "bold": true}, {"text": "naviguer", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "🌸 ", "bold": true}, {"text": "Tu mérites un amour patient"}, {"text": "\n\n"}, {"text": "Quelqu'un qui comprend que parfois tu réagis au ", "italic": true}, {"text": "fantôme", "italic": true}, {"text": ", pas à ", "italic": true}, {"text": "lui", "italic": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Et qui t'aide à revenir au ", "bold": true}, {"text": "présent", "bold": true}, {"text": " avec ", "bold": true}, {"text": "douceur", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "Le plus important :", "bold": true}, {"text": "\n\n"}, {"text": "Tes blessures ne te rendent pas ", "italic": true}, {"text": "brisée", "italic": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Elles te rendent ", "bold": true}, {"text": "humaine", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Et dans les bonnes mains, tes fissures laissent passer la ", "bold": true}, {"text": "lumière", "bold": true}, {"text": "."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "recevoir_la_benediction_finale", "label": "Recevoir la bénédiction finale →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "La bénédiction de la renaissance" },

        { type: 'message', content: "Avant de nous quitter, reçois cette bénédiction..." },
        { type: 'narrative', content: [{"text": "Que tu portes des ", "italic": true}, {"text": "cicatrices visibles", "italic": true}, {"text": " ou des ", "italic": true}, {"text": "blessures invisibles", "italic": true}, {"text": "..."}, {"text": "\n\n"}, {"text": "Que ton passé ", "italic": true}, {"text": "murmure", "italic": true}, {"text": " ou qu'il ", "italic": true}, {"text": "crie", "italic": true}, {"text": " parfois..."}, {"text": "\n\n"}, {"text": "Sache que tu es ", "bold": true}, {"text": "entière", "bold": true}, {"text": ", ", "bold": true}, {"text": "digne", "bold": true}, {"text": ", ", "bold": true}, {"text": "capable", "bold": true}, {"text": " d'aimer et d'être aimée."}] },
        { type: 'narrative', content: [{"text": "Puisses-tu trouver quelqu'un qui voit tes ", "italic": true}, {"text": "blessures", "italic": true}, {"text": " non comme des ", "italic": true}, {"text": "faiblesses", "italic": true}, {"text": "..."}, {"text": "\n\n"}, {"text": "Mais comme les ", "bold": true}, {"text": "cartes", "bold": true}, {"text": " de toutes les batailles que tu as ", "bold": true}, {"text": "survécues", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Quelqu'un qui t'aide à écrire une ", "italic": true}, {"text": "nouvelle histoire", "italic": true}, {"text": " sans effacer l'", "italic": true}, {"text": "ancienne", "italic": true}, {"text": "."}] },
        { type: 'message', content: "💔→💖" },
        { type: 'choice', variable: 'choix', options: [{"id": "celebrer_ce_voyage", "label": "Célébrer ce voyage →"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "Gratitude et célébration" },

        { type: 'image', url: "https://images.unsplash.com/photo-1529333241880-94dc60e09d56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjU2MDR8MHwxfHNlYXJjaHwxfHxzdW5yaXNlfGVufDB8fHx8MTY5NjAwMDAwMHww&ixlib=rb-4.0.3&q=80&w=1080", alt: "" },
        { type: 'message', content: [{"text": "Quel voyage ", "bold": true}, {"text": "courageux", "bold": true}, {"text": " dans les profondeurs..."}] },
        { type: 'narrative', content: [{"text": "Explorer l'", "bold": true}, {"text": "écho du passé", "bold": true}, {"text": ", c'est avoir le courage de regarder ses ", "italic": true}, {"text": "ombres", "italic": true}, {"text": " en face."}, {"text": "\n\n"}, {"text": "Tu as osé reconnaître tes ", "bold": true}, {"text": "déclencheurs", "bold": true}, {"text": ", nommer tes ", "bold": true}, {"text": "blessures", "bold": true}, {"text": ", imaginer la ", "bold": true}, {"text": "guérison", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "C'est un acte de ", "bold": true}, {"text": "bravoure", "bold": true}, {"text": " et d'", "bold": true}, {"text": "espoir", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "Tes réponses enrichissent ta ", "bold": true}, {"text": "cartographie émotionnelle personnelle", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Chaque prise de conscience sur tes ", "italic": true}, {"text": "échos", "italic": true}, {"text": " te rapproche d'un amour plus ", "bold": true}, {"text": "conscient", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Tu apprends que le passé peut ", "italic": true}, {"text": "informer", "italic": true}, {"text": " sans ", "italic": true}, {"text": "contrôler", "italic": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "Tu découvres que guérir n'est pas ", "italic": true}, {"text": "oublier", "italic": true}, {"text": ".", "bold": true}, {"text": "\n\n"}, {"text": "C'est ", "bold": true}, {"text": "intégrer", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "C'est permettre à ton histoire complète - ", "italic": true}, {"text": "joies et peines", "italic": true}, {"text": " - de faire de toi qui tu es, sans te ", "italic": true}, {"text": "limiter", "italic": true}, {"text": " à ce que tu étais."}] },
        { type: 'narrative', content: [{"text": "Continue ce chemin de ", "bold": true}, {"text": "guérison", "bold": true}, {"text": " avec ", "bold": true}, {"text": "patience", "bold": true}, {"text": " et ", "bold": true}, {"text": "compassion", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Chaque jour où tu choisis le ", "bold": true}, {"text": "présent", "bold": true}, {"text": " plutôt que le ", "italic": true}, {"text": "passé", "italic": true}, {"text": ", tu ", "bold": true}, {"text": "renais", "bold": true}, {"text": "."}] },
        { type: 'message', content: [{"text": "À très vite pour la suite de ton parcours ", "bold": true}, {"text": "Love Transformations™", "bold": true}, {"text": " insha'Allah…✨"}] },
        { type: 'message', content: [{"text": "🌙 ", "bold": true}, {"text": "Fin du Scénario 6 : L'Écho du Passé", "bold": true}, {"text": " 🌙"}] },

        { type: 'completion', title: "Félicitations !", message: "Tu as terminé S6 — L'Écho du Passé. Tes réponses ont été sauvegardées.", icon: '🔊' }
    ]
};

/* ─── Form Registry ─── */
if (typeof window.FORM_REGISTRY === 'undefined') window.FORM_REGISTRY = {};
window.FORM_REGISTRY['s6-echo-passe'] = S6_ECHO_PASSE;
