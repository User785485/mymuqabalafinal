/* ═══════════════════════════════════════
   Le Schéma — La Danse Répétitive
   Converti depuis Typebot · 92 steps · 26 variables
═══════════════════════════════════════ */

const F2_EXPRESS = {
    id: 'f2_express',
    version: 1,
    title: "Le Schéma — La Danse Répétitive",
    icon: '🔄',
    checkboxId: 'exp2',
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
        "armure_principale",
        "armures_protection",
        "blessure_abandon",
        "blessure_dominante",
        "blessure_humiliation",
        "blessure_injustice",
        "blessure_rejet",
        "blessure_trahison",
        "climat_enfance",
        "danse_parents",
        "email",
        "expression_amour_mere",
        "impact_relation_mere",
        "lecons_hommes_pere",
        "message_enfant_interieur",
        "messages_amour_herites",
        "messages_corps",
        "origine_armures",
        "prenom",
        "presence_mere",
        "presence_pere",
        "prise_conscience_racines",
        "relation_corps_actuelle",
        "signaux_alerte_enfance",
        "telephone",
        "valorisation_pere"
],

    steps: [

        /* ════════════════════════════════════ */
        { type: 'section', title: "BLOC 1 - Accueil" },

        { type: 'image', url: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080", alt: "" },
        { type: 'message', content: [{"text": "Bismillah", "italic": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "Bienvenue dans cet espace de "}, {"text": "douceur", "bold": true}, {"text": " et de "}, {"text": "verite", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "Ce formulaire t'invite a explorer ton "}, {"text": "enfance", "bold": true}, {"text": " avec bienveillance."}, {"text": "\n\n"}, {"text": "Prends ton temps."}, {"text": "\n\n"}, {"text": "Il n'y a pas de bonnes ou mauvaises reponses."}, {"text": "\n\n"}, {"text": "Seulement "}, {"text": "ta verite", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "Nous allons explorer ensemble :"}, {"text": "\n\n"}, {"text": "Le "}, {"text": "climat", "bold": true}, {"text": " de ton enfance"}, {"text": "\n\n"}, {"text": "Tes "}, {"text": "figures parentales", "bold": true}, {"text": "\n\n"}, {"text": "Tes "}, {"text": "blessures", "bold": true}, {"text": " fondamentales"}, {"text": "\n\n"}, {"text": "Tes "}, {"text": "armures", "bold": true}, {"text": " de protection"}, {"text": "\n\n"}, {"text": "Ta relation a ton "}, {"text": "corps", "bold": true}] },
        { type: 'narrative', content: [{"text": "Rappelle-toi : tu n'etais qu'une "}, {"text": "enfant", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Tu as fait de ton mieux avec ce que tu avais."}, {"text": "\n\n"}, {"text": "\"Et Allah ne charge aucune ame au-dela de ce qu'elle peut supporter.\" (2:286)", "italic": true}] },
        { type: 'message', content: [{"text": "Es-tu prete a explorer tes racines avec "}, {"text": "compassion", "bold": true}, {"text": " ?"}] },
        { type: 'choice', variable: 'choix', options: [{"id": "oui_je_suis_prete", "label": "Oui, je suis prete"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "BLOC 2 - Identification (B1-B3)" },

        { type: 'message', content: [{"text": "IDENTIFICATION", "bold": true}] },
        { type: 'message', content: [{"text": "B1. Quel est ton prenom ?", "bold": true}] },
        { type: 'text_input', variable: 'prenom', placeholder: "Ton prenom..." },
        { type: 'message', content: [{"text": "B2. Ton email ?", "bold": true}] },
        { type: 'email_input', variable: 'email', placeholder: "ton.email@exemple.com" },
        { type: 'message', content: [{"text": "B3. Ton numero de telephone ?", "bold": true}] },
        { type: 'phone_input', variable: 'telephone', placeholder: "06 12 34 56 78", defaultPrefix: '+33' },

        /* ════════════════════════════════════ */
        { type: 'section', title: "BLOC 3 - Climat Enfance (B4-B6)" },

        { type: 'narrative', content: [{"text": "LE CLIMAT DE TON ENFANCE", "bold": true}, {"text": "\n\n"}, {"text": "Ferme les yeux un instant..."}, {"text": "\n\n"}, {"text": "Retourne dans la maison de ton enfance."}, {"text": "\n\n"}, {"text": "Qu'est-ce que tu "}, {"text": "ressens", "bold": true}, {"text": " ?"}] },
        { type: 'message', content: [{"text": "B4. Si tu devais decrire le climat emotionnel de ton enfance comme une meteo, ce serait...", "bold": true}] },
        { type: 'choice', variable: 'climat_enfance', options: [{"id": "ensoleille_chaleureux_secur", "label": "Ensoleille - Chaleureux, securisant, stable"}, {"id": "partiellement_nuageux_global", "label": "Partiellement nuageux - Globalement bien mais incertain"}, {"id": "couvert_atmosphere_lourde_p", "label": "Couvert - Atmosphere lourde, peu d'expressions"}, {"id": "pluvieux_tristesse_manque", "label": "Pluvieux - Tristesse, manque, solitude"}, {"id": "orageux_conflits_frequents", "label": "Orageux - Conflits frequents, cris, tension"}, {"id": "glacial_froid_emotionnel_in", "label": "Glacial - Froid emotionnel, indifference"}, {"id": "tornade_imprevisible_chaos", "label": "Tornade - Imprevisible, chaos, peur"}, {"id": "brouillard_confusion_messag", "label": "Brouillard - Confusion, messages contradictoires"}] },
        { type: 'message', content: [{"text": "Les enfants developpent des "}, {"text": "antennes", "bold": true}, {"text": " pour detecter les changements d'atmosphere..."}] },
        { type: 'message', content: [{"text": "B5. Quand l'atmosphere changeait a la maison, tu le savais par...", "bold": true}, {"text": "\n\n"}, {"text": "(Plusieurs choix possibles)", "italic": true}] },
        { type: 'choice', variable: 'signaux_alerte_enfance', multiple: true, options: [{"id": "le_silence_soudain_de_maman", "label": "Le silence soudain de maman"}, {"id": "les_pas_lourds_de_papa", "label": "Les pas lourds de papa"}, {"id": "une_porte_qui_claque", "label": "Une porte qui claque"}, {"id": "les_regards_echanges_entre_mes", "label": "Les regards echanges entre mes parents"}, {"id": "un_changement_de_ton_de_voix", "label": "Un changement de ton de voix"}, {"id": "l_odeur_d_alcool", "label": "L'odeur d'alcool"}, {"id": "la_voiture_qui_arrive", "label": "La voiture qui arrive"}, {"id": "mon_corps_se_crispait_sans_rai", "label": "Mon corps se crispait sans raison apparente"}, {"id": "je_ne_me_souviens_pas_pas_de", "label": "Je ne me souviens pas / pas de signaux particuliers"}] },
        { type: 'message', content: [{"text": "Avant meme de le comprendre, tu as appris ce qu'etait "}, {"text": "l'amour", "bold": true}, {"text": " en observant..."}] },
        { type: 'message', content: [{"text": "B6. Quels messages as-tu recus (explicitement ou non) sur ce qu'est l'amour ?", "bold": true}, {"text": "\n\n"}, {"text": "(Plusieurs choix possibles)", "italic": true}] },
        { type: 'choice', variable: 'messages_amour_herites', multiple: true, options: [{"id": "l_amour_c_est_se_sacrifier_po", "label": "L'amour, c'est se sacrifier pour les autres"}, {"id": "l_amour_c_est_souffrir_en_sil", "label": "L'amour, c'est souffrir en silence"}, {"id": "l_amour_c_est_quelque_chose_q", "label": "L'amour, c'est quelque chose qu'il faut meriter"}, {"id": "l_amour_c_est_rester_quoi_qu", "label": "L'amour, c'est rester quoi qu'il arrive"}, {"id": "l_amour_c_est_dangereux_ca_f", "label": "L'amour, c'est dangereux, ca fait mal"}, {"id": "l_amour_c_est_prendre_soin_de", "label": "L'amour, c'est prendre soin des autres avant soi"}, {"id": "l_amour_c_est_quelque_chose_d", "label": "L'amour, c'est quelque chose de rare et precieux"}, {"id": "l_amour_c_est_ce_qui_te_rend", "label": "L'amour, c'est ce qui te rend faible"}, {"id": "l_amour_c_est_un_combat_perma", "label": "L'amour, c'est un combat permanent"}, {"id": "l_amour_c_est_etre_comblee_et", "label": "L'amour, c'est etre comblee et en securite"}, {"id": "je_n_ai_pas_recu_de_messages_c", "label": "Je n'ai pas recu de messages clairs sur l'amour"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "BLOC 4 - Figure Maternelle (B7-B9)" },

        { type: 'narrative', content: [{"text": "TA FIGURE MATERNELLE", "bold": true}, {"text": "\n\n"}, {"text": "Ta mere (ou figure maternelle) a ete ton premier "}, {"text": "miroir", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Ce qu'elle t'a montre de la feminite, de l'amour, de la valeur..."}, {"text": "\n\n"}, {"text": "Tout cela vit encore en toi."}] },
        { type: 'message', content: [{"text": "B7. Comment decrirais-tu la PRESENCE de ta mere dans ton enfance ?", "bold": true}] },
        { type: 'choice', variable: 'presence_mere', options: [{"id": "tres_presente_et_attentive_a_m", "label": "Tres presente et attentive a mes besoins"}, {"id": "presente_physiquement_mais_sou", "label": "Presente physiquement mais souvent ailleurs emotionnellement"}, {"id": "imprevisible_parfois_tres_pr", "label": "Imprevisible - parfois tres proche, parfois absente"}, {"id": "occupee_beaucoup_de_responsa", "label": "Occupee - beaucoup de responsabilites, peu de temps pour moi"}, {"id": "absente_physiquement_ou_emot", "label": "Absente - physiquement ou emotionnellement"}, {"id": "envahissante_trop_presente", "label": "Envahissante - trop presente, etouffante"}, {"id": "malade_ou_en_difficulte_j_ai", "label": "Malade ou en difficulte - j'ai du prendre soin d'elle"}] },
        { type: 'message', content: [{"text": "B8. Comment ta mere exprimait-elle son amour ?", "bold": true}, {"text": "\n\n"}, {"text": "(Plusieurs choix possibles)", "italic": true}] },
        { type: 'choice', variable: 'expression_amour_mere', multiple: true, options: [{"id": "par_des_mots_tendres_et_des_co", "label": "Par des mots tendres et des compliments"}, {"id": "par_le_toucher_calins_caress", "label": "Par le toucher (calins, caresses)"}, {"id": "par_les_actes_cuisine_soins", "label": "Par les actes (cuisine, soins, presence)"}, {"id": "par_des_cadeaux_ou_des_gestes", "label": "Par des cadeaux ou des gestes materiels"}, {"id": "elle_avait_du_mal_a_l_exprimer", "label": "Elle avait du mal a l'exprimer"}, {"id": "je_devais_meriter_son_affectio", "label": "Je devais meriter son affection"}, {"id": "son_amour_etait_conditionnel_a", "label": "Son amour etait conditionnel a mes performances"}, {"id": "je_ne_me_suis_jamais_sentie_vr", "label": "Je ne me suis jamais sentie vraiment aimee par elle"}] },
        { type: 'message', content: "Prends un moment pour reflechir..." },
        { type: 'message', content: [{"text": "B9. Comment ta relation avec ta mere a-t-elle impacte ta vision de toi-meme en tant que femme ?", "bold": true}] },
        { type: 'text_input', variable: 'impact_relation_mere', placeholder: "L'impact de ma relation avec ma mere...", isLong: true },

        /* ════════════════════════════════════ */
        { type: 'section', title: "BLOC 5 - Figure Paternelle (B10-B13)" },

        { type: 'narrative', content: [{"text": "TA FIGURE PATERNELLE", "bold": true}, {"text": "\n\n"}, {"text": "Ton pere (ou figure paternelle) a ete ton premier "}, {"text": "modele masculin", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Sa presence ou son absence a faconne ce que tu attends des hommes."}] },
        { type: 'message', content: [{"text": "B10. Comment decrirais-tu la PRESENCE de ton pere dans ton enfance ?", "bold": true}] },
        { type: 'choice', variable: 'presence_pere', options: [{"id": "tres_present_et_implique", "label": "Tres present et implique"}, {"id": "present_mais_distant_emotionne", "label": "Present mais distant emotionnellement"}, {"id": "travailleur_souvent_absent_p", "label": "Travailleur - souvent absent pour le travail"}, {"id": "imprevisible_parfois_proche", "label": "Imprevisible - parfois proche, parfois effrayant"}, {"id": "absent_physiquement_separat", "label": "Absent - physiquement (separation, deces, depart)"}, {"id": "autoritaire_sa_presence_gene", "label": "Autoritaire - sa presence generait de la peur"}, {"id": "faible_efface_pas_un_modele", "label": "Faible - efface, pas un modele de force"}] },
        { type: 'message', content: [{"text": "B11. Comment ton pere te faisait-il sentir VALORISEE ?", "bold": true}, {"text": "\n\n"}, {"text": "(Plusieurs choix possibles)", "italic": true}] },
        { type: 'choice', variable: 'valorisation_pere', multiple: true, options: [{"id": "il_me_complimentait_et_m_encou", "label": "Il me complimentait et m'encourageait"}, {"id": "il_etait_fier_de_moi_et_le_mon", "label": "Il etait fier de moi et le montrait"}, {"id": "il_me_protegeait_et_je_me_sent", "label": "Il me protegeait et je me sentais en securite"}, {"id": "il_etait_la_pour_moi_dans_les", "label": "Il etait la pour moi dans les moments difficiles"}, {"id": "je_devais_performer_pour_avoir", "label": "Je devais performer pour avoir son attention"}, {"id": "ses_critiques_etaient_plus_fre", "label": "Ses critiques etaient plus frequentes que ses compliments"}, {"id": "je_ne_me_suis_jamais_sentie_vr", "label": "Je ne me suis jamais sentie vraiment valorisee par lui"}, {"id": "je_n_ai_pas_connu_mon_pere_i", "label": "Je n'ai pas connu mon pere / il etait absent"}] },
        { type: 'message', content: [{"text": "B12. Qu'est-ce que ton pere (ou son absence) t'a appris sur les hommes et sur ce que tu peux attendre d'eux ?", "bold": true}] },
        { type: 'text_input', variable: 'lecons_hommes_pere', placeholder: "Ce que j'ai appris sur les hommes...", isLong: true },
        { type: 'narrative', content: [{"text": "Tes parents avaient leur propre "}, {"text": "danse relationnelle", "bold": true}, {"text": "..."}, {"text": "\n\n"}, {"text": "Une facon unique de se rapprocher, de s'eloigner, de gerer les conflits."}] },
        { type: 'message', content: [{"text": "B13. Comment tes parents \"dansaient-ils\" ensemble ? (leur dynamique relationnelle)", "bold": true}] },
        { type: 'choice', variable: 'danse_parents', options: [{"id": "tango_passionne_intense_ave", "label": "Tango passionne - Intense, avec des hauts et des bas"}, {"id": "valse_classique_harmonie_re", "label": "Valse classique - Harmonie, respect mutuel, stabilite"}, {"id": "bataille_conflits_ouverts_c", "label": "Bataille - Conflits ouverts, cris, violence"}, {"id": "robots_cote_a_cote_mais_sans", "label": "Robots - Cote a cote mais sans connexion"}, {"id": "fantome_un_parent_dominait", "label": "Fantome - Un parent dominait, l'autre etait efface"}, {"id": "facade_tout_etait_parfait_en", "label": "Facade - Tout etait parfait en surface, tendu derriere"}, {"id": "separes_ils_n_etaient_plus_e", "label": "Separes - Ils n'etaient plus ensemble"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "BLOC 6 - Blessures (B14-B15)" },

        { type: 'narrative', content: [{"text": "LES 5 BLESSURES FONDAMENTALES", "bold": true}, {"text": "\n\n"}, {"text": "Nous portons tous des "}, {"text": "blessures", "bold": true}, {"text": " de l'enfance."}, {"text": "\n\n"}, {"text": "Les reconnaitre n'est pas une faiblesse - c'est le debut de la "}, {"text": "guerison", "bold": true}, {"text": "."}] },
        { type: 'message', content: [{"text": "B14. Evalue l'intensite de chaque blessure dans ton histoire", "bold": true}, {"text": "\n\n"}, {"text": "(0 = pas du tout, 10 = tres fortement)", "italic": true}] },
        { type: 'message', content: [{"text": "ABANDON", "bold": true}, {"text": " - Etre laissee, quittee, pas assez importante"}] },
        { type: 'rating', variable: 'blessure_abandon', max: 10, leftLabel: "Pas du tout", rightLabel: "Tres fortement" },
        { type: 'message', content: [{"text": "REJET", "bold": true}, {"text": " - Ne pas etre acceptee, sentir qu'on ne veut pas de moi"}] },
        { type: 'rating', variable: 'blessure_rejet', max: 10, leftLabel: "Pas du tout", rightLabel: "Tres fortement" },
        { type: 'message', content: [{"text": "TRAHISON", "bold": true}, {"text": " - Etre trompee, manipulee, mensonges"}] },
        { type: 'rating', variable: 'blessure_trahison', max: 10, leftLabel: "Pas du tout", rightLabel: "Tres fortement" },
        { type: 'message', content: [{"text": "HUMILIATION", "bold": true}, {"text": " - Etre rabaissee, moquee, honteuse"}] },
        { type: 'rating', variable: 'blessure_humiliation', max: 10, leftLabel: "Pas du tout", rightLabel: "Tres fortement" },
        { type: 'message', content: [{"text": "INJUSTICE", "bold": true}, {"text": " - Ne pas etre traitee equitablement, favoritisme"}] },
        { type: 'rating', variable: 'blessure_injustice', max: 10, leftLabel: "Pas du tout", rightLabel: "Tres fortement" },
        { type: 'message', content: [{"text": "B15. Quelle blessure te semble la plus ACTIVE dans tes relations amoureuses aujourd'hui ?", "bold": true}] },
        { type: 'choice', variable: 'blessure_dominante', options: [{"id": "abandon_je_fais_tout_pour_ev", "label": "ABANDON - Je fais tout pour eviter d'etre quittee"}, {"id": "rejet_je_crois_souvent_qu_on", "label": "REJET - Je crois souvent qu'on ne veut pas vraiment de moi"}, {"id": "trahison_j_ai_du_mal_a_faire", "label": "TRAHISON - J'ai du mal a faire confiance"}, {"id": "humiliation_j_ai_peur_du_jug", "label": "HUMILIATION - J'ai peur du jugement et de la honte"}, {"id": "injustice_je_sens_que_je_mer", "label": "INJUSTICE - Je sens que je merite plus que ce que je recois"}, {"id": "plusieurs_blessures_sont_activ", "label": "Plusieurs blessures sont actives de maniere egale"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "BLOC 7 - Armures (B16-B18)" },

        { type: 'narrative', content: [{"text": "TES ARMURES DE PROTECTION", "bold": true}, {"text": "\n\n"}, {"text": "Face a ces blessures, tu as developpe des "}, {"text": "strategies de survie", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Ces armures t'ont "}, {"text": "protegee", "bold": true}, {"text": " enfant."}, {"text": "\n\n"}, {"text": "Mais aujourd'hui, elles peuvent t'empecher de vivre l'amour pleinement."}] },
        { type: 'message', content: [{"text": "B16. Face aux blessures, quelles \"armures\" as-tu developpees pour te proteger ?", "bold": true}, {"text": "\n\n"}, {"text": "(Plusieurs choix possibles)", "italic": true}] },
        { type: 'choice', variable: 'armures_protection', multiple: true, options: [{"id": "intellectualisation_analyser", "label": "Intellectualisation - Analyser au lieu de ressentir"}, {"id": "hypervigilance_toujours_sur", "label": "Hypervigilance - Toujours sur mes gardes"}, {"id": "fuite_m_eloigner_des_que_ca", "label": "Fuite - M'eloigner des que ca devient trop intense"}, {"id": "soumission_faire_plaisir_pou", "label": "Soumission - Faire plaisir pour eviter le conflit"}, {"id": "controle_tout_maitriser_pour", "label": "Controle - Tout maitriser pour me sentir en securite"}, {"id": "masque_montrer_une_image_par", "label": "Masque - Montrer une image parfaite"}, {"id": "murs_ne_laisser_personne_s_a", "label": "Murs - Ne laisser personne s'approcher vraiment"}, {"id": "humour_rire_pour_ne_pas_pleu", "label": "Humour - Rire pour ne pas pleurer"}, {"id": "sauveuse_m_occuper_des_autre", "label": "Sauveuse - M'occuper des autres pour oublier mes besoins"}, {"id": "invisibilite_me_faire_toute", "label": "Invisibilite - Me faire toute petite"}] },
        { type: 'message', content: [{"text": "B17. Quand penses-tu avoir commence a developper ces armures ? Quel evenement ou periode ?", "bold": true}] },
        { type: 'text_input', variable: 'origine_armures', placeholder: "L'origine de mes armures...", isLong: true },
        { type: 'message', content: [{"text": "B18. Si tu devais identifier TON armure principale, celle que tu utilises le plus souvent en amour, ce serait...", "bold": true}] },
        { type: 'text_input', variable: 'armure_principale', placeholder: "Mon armure principale...", isLong: true },

        /* ════════════════════════════════════ */
        { type: 'section', title: "BLOC 8 - Corps (B19-B20)" },

        { type: 'narrative', content: [{"text": "TA RELATION AU CORPS", "bold": true}, {"text": "\n\n"}, {"text": "Ton corps a aussi recu des "}, {"text": "messages", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Ce qu'on t'a dit (ou pas dit) sur ton corps de femme a faconne ta relation a toi-meme."}] },
        { type: 'message', content: [{"text": "B19. Quels messages as-tu recus sur ton corps de femme ?", "bold": true}, {"text": "\n\n"}, {"text": "(Plusieurs choix possibles)", "italic": true}] },
        { type: 'choice', variable: 'messages_corps', multiple: true, options: [{"id": "couvre_toi_cache_ton_corps", "label": "Couvre-toi, cache ton corps"}, {"id": "ton_corps_est_source_de_honte", "label": "Ton corps est source de honte/peche"}, {"id": "tu_es_trop_grosse_maigre_pas_a", "label": "Tu es trop grosse/maigre/pas assez..."}, {"id": "ton_corps_est_beau_et_precieux", "label": "Ton corps est beau et precieux"}, {"id": "ton_corps_attire_les_problemes", "label": "Ton corps attire les problemes"}, {"id": "on_ne_parle_pas_du_corps", "label": "On ne parle pas du corps"}, {"id": "ton_corps_doit_plaire_aux_homm", "label": "Ton corps doit plaire aux hommes"}, {"id": "ton_corps_t_appartient_et_tu_e", "label": "Ton corps t'appartient et tu en es fiere"}, {"id": "je_n_ai_pas_recu_de_messages_e", "label": "Je n'ai pas recu de messages explicites"}] },
        { type: 'message', content: [{"text": "B20. Comment decrirais-tu ta relation avec ton corps aujourd'hui ?", "bold": true}] },
        { type: 'choice', variable: 'relation_corps_actuelle', options: [{"id": "je_l_aime_et_je_l_accepte_tel", "label": "Je l'aime et je l'accepte tel qu'il est"}, {"id": "relation_neutre_ni_amour_ni", "label": "Relation neutre - ni amour ni haine"}, {"id": "c_est_complique_j_oscille_en", "label": "C'est complique - j'oscille entre acceptation et rejet"}, {"id": "je_le_critique_souvent", "label": "Je le critique souvent"}, {"id": "j_ai_honte_de_certaines_partie", "label": "J'ai honte de certaines parties"}, {"id": "je_me_sens_deconnectee_de_mon", "label": "Je me sens deconnectee de mon corps"}, {"id": "en_processus_de_reconciliation", "label": "En processus de reconciliation"}] },

        /* ════════════════════════════════════ */
        { type: 'section', title: "BLOC 9 - Compassion (B21-B22)" },

        { type: 'narrative', content: [{"text": "COMPASSION ET INTEGRATION", "bold": true}, {"text": "\n\n"}, {"text": "Tu viens de faire un "}, {"text": "voyage courageux", "bold": true}, {"text": " dans ton passe."}, {"text": "\n\n"}, {"text": "Prenons un moment pour "}, {"text": "honorer", "bold": true}, {"text": " la petite fille que tu etais."}] },
        { type: 'message', content: "Imagine la petite fille que tu etais...\n\nAvec ses peurs, ses espoirs, ses besoins non combles.\n\nElle a fait de son mieux." },
        { type: 'message', content: [{"text": "B21. Si tu pouvais parler a la petite fille que tu etais, que lui dirais-tu ?", "bold": true}] },
        { type: 'text_input', variable: 'message_enfant_interieur', placeholder: "Ce que je dirais a la petite fille que j'etais...", isLong: true },
        { type: 'message', content: [{"text": "B22. En explorant tes racines, quelle est ta principale prise de conscience ?", "bold": true}] },
        { type: 'text_input', variable: 'prise_conscience_racines', placeholder: "Ma principale prise de conscience...", isLong: true },

        /* ════════════════════════════════════ */
        { type: 'section', title: "BLOC 10 - Pause Sacree" },

        { type: 'message', content: [{"text": "PAUSE SACREE", "bold": true}] },
        { type: 'narrative', content: [{"text": "Merci d'avoir explore tes racines avec "}, {"text": "courage", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Tu viens de faire quelque chose de "}, {"text": "profond", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Tu as regarde ton histoire avec honnetete et douceur."}] },
        { type: 'narrative', content: [{"text": "Rappelle-toi :"}, {"text": "\n\n"}, {"text": "Tu n'etais qu'une "}, {"text": "enfant", "bold": true}, {"text": " qui a fait de son mieux."}, {"text": "\n\n"}, {"text": "Tes armures t'ont "}, {"text": "protegee", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Aujourd'hui, tu peux choisir de "}, {"text": "guerir", "bold": true}, {"text": "."}] },
        { type: 'narrative', content: [{"text": "\"Certes, apres la difficulte vient la facilite.\" (94:6)", "italic": true}, {"text": "\n\n"}, {"text": "Ton passe ne definit pas ton avenir."}, {"text": "\n\n"}, {"text": "La "}, {"text": "conscience", "bold": true}, {"text": " que tu viens de developper est le premier pas vers la "}, {"text": "transformation", "bold": true}, {"text": "."}] },
        { type: 'message', content: "Prends soin de toi.\n\nBois un verre d'eau.\n\nRespire profondement.\n\nHonore le chemin parcouru." },
        { type: 'narrative', content: [{"text": "Tu as termine le "}, {"text": "Formulaire 2 EXPRESS V2 - Les Racines", "bold": true}, {"text": "."}, {"text": "\n\n"}, {"text": "Que la paix soit sur toi."}] },
        { type: 'choice', variable: 'choix', options: [{"id": "merci_pour_ce_voyage", "label": "Merci pour ce voyage"}] },

        { type: 'completion', title: "Félicitations !", message: "Tu as terminé Le Schéma — La Danse Répétitive. Tes réponses ont été sauvegardées.", icon: '🔄' }
    ]
};

/* ─── Form Registry ─── */
if (typeof window.FORM_REGISTRY === 'undefined') window.FORM_REGISTRY = {};
window.FORM_REGISTRY['f2-express'] = F2_EXPRESS;
