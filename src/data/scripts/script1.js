// src/data/scripts/script1.js
export default {
  1: {
    id: "1",
    title: "Accueil Chaleureux et Personnalisé",
    text: "Chaima : \"As-salamu alaykum [PRÉNOM], c'est [Votre Prénom] à l'appareil. J'espère que tu vas bien. Je suis ravie de t'avoir au téléphone aujourd'hui. Comment vas-tu depuis notre dernier échange ?\"",
    notes: [
      "Adapter le ton de voix : chaleureux mais professionnel",
      "Prononcer clairement le prénom",
      "Laisser un moment de silence après la question",
      "Noter l'énergie dans la voix du client",
      "Rester authentique et bienveillante",
    ],
    options: [
      {
        id: "1A",
        label: "Réponse Positive",
        response: "Chaima : \"Je suis contente de t'entendre si positive. Dis-moi, qu'est-ce qui t'a donné envie de prendre ce rendez-vous aujourd'hui ?\"",
        next: "2",
        type: "positive",
      },
      {
        id: "1B",
        label: "Réponse Hésitante",
        response: "Chaima : \"Je ressens une hésitation dans ta voix. C'est tout à fait normal, travailler sur des problèmes relationnels demande du courage. Qu'est-ce qui t'a poussée à franchir ce pas aujourd'hui ?\"",
        next: "2",
        type: "neutral",
      },
      {
        id: "1C",
        label: "Réponse Négative",
        response: "Chaima : \"Je comprends que ce ne soit pas une période facile pour toi. Tu sais, c'est souvent dans ces moments-là qu'on trouve la force d'agir et de faire les changements nécessaires. Veux-tu me parler un peu de ce qui te préoccupe ?\"",
        next: "2",
        type: "negative",
      },
    ],
  },

  2: {
    id: "2",
    title: "Création du Cadre de Confort",
    text: "Chaima : \"[PRÉNOM], avant d'aller plus loin, j'aimerais m'assurer que tu es dans un environnement où tu peux parler librement et tranquillement. Est-ce le cas ?\"",
    notes: [
      "Assurer que le client est dans un environnement propice",
      "Préparer le terrain pour une discussion ouverte",
      "Montrer de l'empathie et de la compréhension",
    ],
    options: [
      {
        id: "2A",
        label: "Bien Installée",
        response: "Chaima : \"Parfait [PRÉNOM], je suis contente que tu aies pris le temps de t'installer dans un endroit calme. C'est important pour moi que tu te sentes complètement libre de t'exprimer, surtout quand on va parler de tes défis relationnels.\"",
        next: "3",
        type: "positive",
      },
      {
        id: "2B",
        label: "Environnement Moyen",
        response: "Chaima : \"D'accord. Est-ce que tu te sens suffisamment à l'aise pour parler de tes problèmes relationnels dans ces conditions ? N'oublie pas que nous allons aborder des sujets assez personnels.\"",
        next: "3",
        type: "neutral",
      },
      {
        id: "2C",
        label: "Environnement Pas Idéal",
        response: "Chaima : \"Je comprends. Tu sais, cet appel est vraiment important pour ton avenir et ton bien-être émotionnel. Je préférerais qu'on le reprogramme à un moment où tu pourras être dans un environnement plus propice à une discussion profonde. Je suis disponible demain à 14h ou vendredi à 10h. Qu'est-ce qui t'arrangerait le mieux ?\"",
        next: "fin",
        type: "negative",
      },
      {
        id: "2D",
        label: "Peu de Temps Disponible",
        response: "Chaima : \"Je comprends que tu sois prise par le temps. Cet appel est essentiel pour t'apporter le soutien dont tu as besoin. Préférerais-tu qu'on fixe un autre moment où tu seras plus disponible ? Notre échange nécessite environ 45 minutes à 1 heure pour être vraiment bénéfique.\"",
        next: "fin",
        type: "neutral",
      },
    ],
  },

  3: {
    id: "3",
    title: "Établir l'Importance de l'Appel et Évaluer la Motivation",
    text: "Chaima : \"[PRÉNOM], cet appel est spécialement réservé aux personnes qui ont suivi le programme de découverte de Mohamed sur WhatsApp et qui sont vraiment prêtes à transformer leur vie en ce qui concerne leurs relations. Pour bien commencer, j'aimerais comprendre quelles sont tes attentes pour notre échange aujourd'hui.\"",
    notes: [
      "Valider l'engagement du client",
      "Comprendre les attentes spécifiques",
      "Créer un espace pour que le client s'exprime",
    ],
    options: [
      {
        id: "3A",
        label: "Attente Précise",
        response: "Chaima : \"Je vois que tu as déjà une idée claire de ce que tu veux accomplir. C'est excellent ! Parlons un peu plus en détail de la reconstruction de la confiance avec ton mari. Qu'est-ce qui fait que c'est particulièrement important pour toi maintenant ?\"",
        next: "4",
        type: "positive",
      },
      {
        id: "3B",
        label: "Attente Vague",
        response: "Chaima : \"C'est normal d'avoir encore des questionnements. Mais dis-moi, quand tu penses à ta relation actuelle, qu'est-ce qui te préoccupe le plus actuellement ? Quel changement te semblerait déjà significatif ?\"",
        next: "4",
        type: "neutral",
      },
      {
        id: "3C",
        label: "Attente Émotionnelle",
        response: "Chaima : \"Je comprends ta frustration face à ce sentiment de solitude dans ton couple. Ce n'est pas une position facile. Depuis combien de temps ressens-tu cela ?\"",
        next: "4",
        type: "emotional",
      },
      {
        id: "3D",
        label: "Hésitante sur les Attentes",
        response: "Chaima : \"Pas de souci, nous sommes là pour clarifier tout cela ensemble. Qu'est-ce qui t'a motivée à prendre ce rendez-vous initialement ?\"",
        next: "4",
        type: "neutral",
      },
    ],
  },

  4: {
    id: "4",
    title: "Créer un Espace de Confiance et d'Ouverture",
    text: "Chaima : \"Je tiens vraiment à te dire, [PRÉNOM], que cet appel est un espace totalement bienveillant et confidentiel. Mon rôle est de comprendre ta situation en profondeur et de voir comment notre programme peut vraiment t'aider à atteindre tes objectifs concernant tes défis relationnels. Durant notre échange, tu seras entendue et comprise. N'hésite jamais à m'interrompre si tu as des questions.\"",
    notes: [
      "Renforcer la confiance",
      "Encourager l'ouverture",
      "Assurer la confidentialité",
    ],
    options: [
      {
        id: "4A",
        label: "Client Réceptif",
        response: "Chaima : \"D'ailleurs, ton histoire me fait penser à Amina, une de nos participantes qui était exactement dans ta situation il y a quelques mois. Je te raconterai son parcours un peu plus tard, car c'est vraiment inspirant de voir comment elle a réussi à reconstruire la confiance avec son mari et à revitaliser sa relation.\"",
        next: "5",
        type: "positive",
      },
      {
        id: "4B",
        label: "Client Hésitant",
        response: "Chaima : \"Je suis là pour t'accompagner à chaque étape. N'hésite pas à partager ce que tu ressens, chaque détail compte pour que je puisse t'aider au mieux.\"",
        next: "5",
        type: "neutral",
      },
      {
        id: "4C",
        label: "Client Méfiante",
        response: "Chaima : \"Je comprends que ce ne soit pas évident de se livrer. Sache que tout ce que tu partages restera entre nous, et mon objectif est vraiment de t'aider au mieux. C'est un espace protégé où tu peux te sentir en sécurité.\"",
        next: "5",
        type: "neutral",
      },
    ],
  },

  5: {
    id: "5",
    title: "Exploration Subtile de la Situation et Capacité Financière",
    text: "Chaima : \"[PRÉNOM], avant d'aller plus loin, j'aimerais mieux comprendre ta situation. Par rapport à ta relation avec ton mari, quels sont selon toi les principaux obstacles qui t'empêchent d'atteindre tes objectifs ?\"",
    notes: [
      "Écouter activement",
      "Identifier les obstacles clés",
      "Préparer le terrain pour discuter de la disponibilité",
    ],
    options: [
      {
        id: "5A",
        label: "Score Élevé (8-10)",
        response: "Chaima : \"Je comprends l'ampleur de l'impact sur ta vie. C'est courageux de ta part de vouloir agir maintenant. Qu'est-ce qui te fait dire 9 plutôt que 7 par exemple ?\"",
        next: "6",
        type: "high-impact",
      },
      {
        id: "5B",
        label: "Score Moyen (5-7)",
        response: "Chaima : \"D'accord, je vois. Et qu'est-ce qui fait que tu places ton niveau à 6 ? Qu'est-ce qui t'empêche d'être plus bas dans ton évaluation ?\"",
        next: "6",
        type: "medium-impact",
      },
      {
        id: "5C",
        label: "Score Bas (1-4)",
        response: "Chaima : \"Je vois. Pourtant, tu as fait la démarche de prendre rendez-vous. Qu'est-ce qui t'a poussée à vouloir agir maintenant, même si l'impact te semble modéré ?\"",
        next: "6",
        type: "low-impact",
      },
      {
        id: "5D",
        label: "Ne souhaite pas donner de score",
        response: "Chaima : \"Je comprends que c'est difficile à évaluer. Peut-être peux-tu me parler de comment cette situation affecte ton quotidien ?\"",
        next: "6",
        type: "neutral",
      },
    ],
  },

  6: {
    id: "6",
    title: "Présentation du Déroulement de l'Appel",
    text: "Chaima : \"Merci infiniment pour tout ce que tu viens de partager avec moi, [PRÉNOM]. Ça me permet de vraiment comprendre ta situation et tes objectifs. Maintenant, je vais t'expliquer comment nous allons poursuivre notre échange :\n\n1. Nous allons examiner ensemble le compte-rendu que tu as reçu. C'est important car il contient une analyse approfondie de ta situation et nous permettra d'identifier précisément comment le programme peut répondre à tes besoins.\n2. Ensuite, je te proposerai de regarder une courte vidéo de Mohamed, où il explique sa méthodologie unique et comment elle peut spécifiquement t'aider avec la reconstruction de la confiance et l'amélioration de la communication dans ton couple.\n3. Enfin, si je constate que ton profil correspond bien au programme et que ta motivation est au rendez-vous, nous discuterons des différentes options d'accompagnement qui pourraient te convenir.\n\nComment te sens-tu par rapport à ce programme ? As-tu des questions avant que nous continuions ?\"",
    notes: [
      "Clarifier le déroulement",
      "Préparer le client pour les prochaines étapes",
      "Inviter le client à poser des questions",
    ],
    options: [
      {
        id: "6A",
        label: "Client D'accord",
        response: "Chaima : \"Parfait [PRÉNOM] ! Alors commençons par analyser ensemble le compte-rendu...\"",
        next: "7",
        type: "positive",
      },
      {
        id: "6B",
        label: "Client Questionne le Temps",
        response: "Chaima : \"Notre échange va durer environ 45 minutes au total. C'est un moment important pour ton avenir, un investissement de temps qui peut vraiment faire la différence dans ta démarche de reconstruction de ta relation. Tu es disponible pour qu'on continue ?\"",
        next: "7",
        type: "neutral",
      },
      {
        id: "6C",
        label: "Client a des Questions",
        response: "Chaima : \"Bien sûr, je suis là pour répondre à toutes tes questions. Qu'est-ce que tu aimerais savoir ?\"",
        next: "7",
        type: "neutral",
      },
      {
        id: "6D",
        label: "Client Pressée",
        response: "Chaima : \"Je comprends que tu aies un emploi du temps chargé. Nous pouvons aller à l'essentiel si tu le souhaites, mais je veux m'assurer que tu aies toutes les informations nécessaires. Es-tu d'accord pour qu'on continue ?\"",
        next: "7",
        type: "neutral",
      },
    ],
  },

  7: {
    id: "7",
    title: "Introduction aux Défis Personnels",
    text: "Chaima : \"[PRÉNOM], j'aimerais qu'on parle du compte-rendu que tu as reçu. J'ai noté plusieurs points importants concernant ta situation :\n\n- La découverte de l'infidélité de ton mari qui s'est étendue sur plusieurs années, ce qui a profondément ébranlé les fondations de votre relation\n- L'anxiété et l'insécurité que tu ressens concernant l'avenir, notamment ces moments où tu te retrouves à analyser chaque geste, chaque absence\n- Le sentiment de solitude que tu évoques, même en présence de ton mari, particulièrement douloureux dans un mariage de longue date avec des enfants\n\nEst-ce que ces points reflètent bien ta situation actuelle ?\"",
    notes: [
      "Valider les points clés",
      "Encourager le client à s'exprimer",
      "Montrer de l'empathie",
    ],
    options: [
      {
        id: "7A",
        label: "Client Confirme",
        response: "Chaima : \"Je suis contente que tu te sois sentie comprise. C'est important pour nous que tu te reconnaisses dans ce qui a été partagé. Quel point t'a particulièrement parlé ?\"",
        next: "8",
        type: "positive",
      },
      {
        id: "7B",
        label: "Client Hésite",
        response: "Chaima : \"Y a-t-il un point particulier qui a retenu ton attention ou qui t'a surprise ? Comment t'es-tu sentie en parcourant ce compte-rendu ?\"",
        next: "8",
        type: "neutral",
      },
      {
        id: "7C",
        label: "Client Émotionnel",
        response: "Chaima : \"Je comprends que la lecture ait pu te toucher. C'est normal, on a abordé des points très personnels. Veux-tu qu'on en parle plus en détail ?\"",
        next: "8",
        type: "emotional",
      },
      {
        id: "7D",
        label: "Client en Désaccord",
        response: "Chaima : \"Je suis désolée si certains points ne te semblent pas refléter ta situation. Peux-tu m'en dire plus sur ce qui te paraît différent ?\"",
        next: "8",
        type: "neutral",
      },
    ],
  },

  8: {
    id: "8",
    title: "Identification des Défis Principaux",
    text: "Chaima : \"Parmi les différents points abordés :\n\n- Gestion de la trahison et reconstruction de la confiance.\n- L'anxiété et de l'insécurité émotionnelle.\n- Amélioration de la communication et de la connexion émotionnelle.\n- Gestion des antécédents de relations difficiles.\n- Renouvellement et rafraîchissement de la relation.\n\nQuels sont ceux qui résonnent le plus avec ta situation actuelle ?\"",
    notes: [
      "Prioriser les besoins du client",
      "Comprendre les préoccupations majeures",
      "Adapter la suite de l'échange en fonction",
    ],
    options: [
      {
        id: "8A",
        label: "Reconstruction de la Confiance",
        response: "Chaima : \"Parlons un peu plus en détail de la reconstruction de la confiance. Quelles sont les difficultés que tu rencontres actuellement à ce sujet ?\"",
        next: "9",
        type: "high-impact",
      },
      {
        id: "8B",
        label: "Amélioration de la Communication",
        response: "Chaima : \"La communication est effectivement essentielle dans un couple. Peux-tu me donner des exemples de situations où la communication est difficile ?\"",
        next: "9",
        type: "medium-impact",
      },
      {
        id: "8C",
        label: "Anxiété et Insécurité",
        response: "Chaima : \"Je comprends que l'anxiété puisse être pesante. Comment cela se manifeste-t-il dans ton quotidien ?\"",
        next: "9",
        type: "emotional",
      },
      {
        id: "8D",
        label: "Antécédents de Relations Difficiles",
        response: "Chaima : \"Les expériences passées peuvent en effet influencer nos relations actuelles. Comment penses-tu que cela affecte ta relation avec ton mari ?\"",
        next: "9",
        type: "neutral",
      },
      {
        id: "8E",
        label: "Renouvellement de la Relation",
        response: "Chaima : \"Redonner un nouveau souffle à sa relation est important. Qu'aimerais-tu voir changer ou évoluer entre vous ?\"",
        next: "9",
        type: "positive",
      },
    ],
  },

  9: {
    id: "9",
    title: "Conclusion et Transition",
    text: "Chaima : \"En combinant ces différents modules, le programme est conçu pour t'offrir un accompagnement complet et adapté à tes besoins spécifiques. Il a déjà aidé de nombreuses personnes à transformer leur vie.\n\nQu'est-ce qui te plaît le plus dans ce que je viens de te présenter ?\"",
    notes: [
      "Recueillir le feedback du client",
      "Préparer la transition vers la présentation des solutions",
      "Identifier les points d'accroche",
    ],
    options: [
      {
        id: "9A",
        label: "Client Enthousiaste",
        response: "Chaima : \"Je suis ravie que cela te parle autant. Je pense sincèrement que ce programme peut t'aider à atteindre tes objectifs.\"",
        next: "10",
        type: "positive",
      },
      {
        id: "9B",
        label: "Client a des Doutes",
        response: "Chaima : \"Je comprends tes hésitations. Qu'est-ce qui te préoccupe le plus ? Parle-moi de tes doutes, je suis là pour y répondre.\"",
        next: "10",
        type: "neutral",
      },
      {
        id: "9C",
        label: "Client Indécis",
        response: "Chaima : \"C'est normal de se sentir indécise face à tant d'informations. Y a-t-il un aspect particulier sur lequel tu voudrais que je revienne ?\"",
        next: "10",
        type: "neutral",
      },
    ],
  },

  10: {
    id: "10",
    title: "Introduction à la Vidéo",
    text: "Chaima : \"[PRÉNOM], maintenant que nous avons vu comment le programme peut répondre à tes besoins concernant la reconstruction de la confiance et l'amélioration de la communication, j'aimerais te partager une vidéo spéciale que Mohamed a préparée.\n\nCette vidéo va te permettre de comprendre en profondeur sa méthodologie unique. Après l'avoir regardée, je pourrai te dire si tu remplis toutes les conditions pour rejoindre le programme et en tirer pleinement profit. Et si tout est en accord pour nous deux, nous verrons ensemble les différentes options d'accompagnement. Est-ce que cela te convient ?\"",
    notes: [
      "Préparer le client au visionnage de la vidéo",
      "Expliquer l'importance de la vidéo",
      "Obtenir l'accord du client",
    ],
    options: [
      {
        id: "10A",
        label: "Client D'accord",
        response: "Chaima : \"Super, je suis sûre que tu vas trouver beaucoup de résonance avec ta situation.\"",
        next: "11",
        type: "positive",
      },
      {
        id: "10B",
        label: "Client Questionne la Durée",
        response: "Chaima : \"C'est une vidéo courte mais puissante de 5 minutes environ. Mohamed y aborde spécifiquement les points qui concernent ta situation de reconstruction après une infidélité.\"",
        next: "11",
        type: "neutral",
      },
      {
        id: "10C",
        label: "Client Hésitante",
        response: "Chaima : \"Je comprends ton hésitation. Y a-t-il quelque chose de particulier qui te préoccupe ? Souhaites-tu que je t'en dise plus sur le contenu de la vidéo ?\"",
        next: "11",
        type: "neutral",
      },
      {
        id: "10D",
        label: "Client Refuse la Vidéo",
        response: "Chaima : \"Je comprends. Peut-être préférerais-tu que je t'explique directement la méthodologie de Mohamed ?\"",
        next: "12",
        type: "neutral",
      },
    ],
  },

  11: {
    id: "11",
    title: "Préparation au Visionnage",
    text: "Chaima : \"Super ! En regardant la vidéo, prête particulièrement attention à comment la méthodologie de Mohamed peut t'aider avec la reconstruction de la confiance. Je te l'envoie sur WhatsApp. Fais-moi signe quand tu l'auras reçue.\"",
    notes: [
      "Envoyer la vidéo",
      "Assurer que le client la reçoit",
      "Préparer le client à la regarder",
    ],
    options: [
      {
        id: "11A",
        label: "Client Reçoit la Vidéo",
        response: "Chaima : \"Parfait ! Je te laisse la regarder tranquillement.\"",
        next: "12",
        type: "positive",
      },
      {
        id: "11B",
        label: "Problème Technique",
        response: "Chaima : \"As-tu bien reçu la vidéo ? N'hésite pas à vérifier tes messages. Je peux te la renvoyer si besoin ou te donner un autre lien.\"",
        next: "12",
        type: "neutral",
      },
      {
        id: "11C",
        label: "Client Ne Peut Pas Regarder Maintenant",
        response: "Chaima : \"Je comprends. Souhaites-tu que je te fasse un résumé des points clés maintenant, ou préfères-tu qu'on se fixe un autre moment pour en discuter après que tu aies pu la regarder ?\"",
        next: "12",
        type: "neutral",
      },
    ],
  },

  12: {
    id: "12",
    title: "Discussion Post-Visionnage",
    text: "Chaima : \"Alors, qu'as-tu pensé de la méthodologie de Mohamed, notamment sur l'importance d'être soutenue et accompagnée tout au long du processus ? Qu'est-ce qui t'a le plus marquée ?\"",
    notes: [
      "Obtenir le feedback du client",
      "Comprendre les points qui ont le plus touché le client",
      "Préparer la suite de l'échange",
    ],
    options: [
      {
        id: "12A",
        label: "Client Très Touché",
        response: "Chaima : \"Je comprends que ça t'ait touchée aussi profondément. Tu vois, la méthodologie de Mohamed est vraiment puissante justement parce qu'elle prend en compte tous les aspects de ce que tu traverses. Tu ne seras jamais seule dans ce processus. Notre méthode va au-delà d'un simple accompagnement :\n\n- Un psychologue pour comprendre tes blocages et les transformer\n- Un coach pour te guider vers l'action et le changement\n- Un guide bienveillant qui comprend ta situation unique\n- Un soutien spirituel qui respecte tes valeurs\n\nEn quelques mois, tu verras des résultats que d'autres mettent des années à atteindre.\"",
        next: "13",
        type: "emotional",
      },
      {
        id: "12B",
        label: "Client Connecte avec Certains Points",
        response: "Chaima : \"Je suis contente que ces aspects résonnent avec toi. Peux-tu me dire plus précisément ce qui t'a parlé dans son approche de [point mentionné] ? Comment vois-tu cela s'appliquer à ta situation ?\"",
        next: "13",
        type: "neutral",
      },
      {
        id: "12C",
        label: "Client a des Questions",
        response: "Chaima : \"Excellente question. La transformation dont parle Mohamed se fait à travers un processus structuré. Laisse-moi t'expliquer plus en détail comment cela s'applique spécifiquement à ta situation...\"",
        next: "13",
        type: "neutral",
      },
      {
        id: "12D",
        label: "Client Exprime des Doutes",
        response: "Chaima : \"Je comprends tes doutes, Saphira. C'est normal d'être prudente après ce que tu as vécu. Ce que Mohamed explique n'est pas magique, c'est un processus qui a fait ses preuves avec de nombreux couples dans des situations similaires à la tienne. Veux-tu que je te partage quelques exemples concrets ?\"",
        next: "13",
        type: "neutral",
      },
    ],
  },

  13: {
    id: "13",
    title: "Projection dans l'Avenir",
    text: "Chaima : \"Maintenant, [PRÉNOM], j'aimerais qu'on prenne un moment pour se projeter. Après avoir vu la méthodologie de Mohamed, imagine-toi dans 6 mois :\n\n- Tu as retrouvé un sentiment de sécurité dans ta relation\n- La confiance se reconstruit progressivement\n- Tu ne te sens plus rongée par l'anxiété\n- Vous avez rétabli une communication profonde et authentique\n- Tu te sens épanouie et sereine dans ton couple\n\nComment te sens-tu en imaginant cette transformation ?\"",
    notes: [
      "Créer une image positive du futur",
      "Encourager le client à ressentir les bénéfices",
      "Renforcer l'envie de transformation",
    ],
    options: [
      {
        id: "13A",
        label: "Client Ému et Optimiste",
        response: "Chaima : \"Je sens beaucoup d'espoir dans ta voix, [PRÉNOM]. Et tu sais quoi ? Cet espoir est parfaitement légitime. Ce que tu imagines n'est pas un rêve inaccessible, c'est un objectif concret que nous pouvons atteindre ensemble avec la méthodologie de Mohamed. Les femmes qui, comme toi, sont déterminées à transformer leur relation, voient souvent les premiers changements dès les premières semaines.\"",
        next: "14",
        type: "positive",
      },
      {
        id: "13B",
        label: "Client Mélange d'Espoir et de Doute",
        response: "Chaima : \"Je comprends cette dualité entre l'espoir et la peur, [PRÉNOM]. C'est parfaitement normal après la trahison que tu as vécue. Mais laisse-moi te dire quelque chose : cette peur d'espérer que tu ressens, toutes les femmes qui ont réussi leur transformation l'ont ressentie au début. La différence, c'est qu'elles ont décidé d'agir malgré cette peur. [PAUSE] Et aujourd'hui, elles ne regrettent pas d'avoir fait ce choix.\"",
        next: "14",
        type: "neutral",
      },
      {
        id: "13C",
        label: "Client Exprime des Inquiétudes Concernant le Mari",
        response: "Chaima : \"C'est une préoccupation légitime, [PRÉNOM]. Ce que l'expérience de Mohamed montre, c'est que quand une femme commence à changer sa façon d'être dans la relation, en utilisant les outils qu'il enseigne, cela crée naturellement un effet miroir chez le mari. Tu vois, parfois il suffit qu'une personne commence à changer pour que toute la dynamique du couple se transforme.\"",
        next: "14",
        type: "neutral",
      },
      {
        id: "13D",
        label: "Client Se Questionne sur le Processus",
        response: "Chaima : \"Excellente question. Le programme est structuré pour créer des changements progressifs mais durables. Chaque semaine, tu auras des objectifs précis et des outils concrets. Et surtout, tu auras le soutien constant de ta Coach Care pour t'accompagner. Les premiers changements se font sentir généralement dès les premières semaines, et en 6 mois, la transformation peut être vraiment profonde.\"",
        next: "14",
        type: "neutral",
      },
      {
        id: "13E",
        label: "Client Évoque les Enfants",
        response: "Chaima : \"Tu as raison, [PRÉNOM]. Les enfants sont très sensibles à l'atmosphère du foyer. Imagine comme ce serait bénéfique pour eux de voir leurs parents retrouver une relation harmonieuse. C'est un des aspects dont Mohamed parle souvent : quand on guérit le couple, on guérit toute la famille.\"",
        next: "14",
        type: "positive",
      },
    ],
  },

  14: {
    id: "14",
    title: "Ancrage du Prix de Manière Conversationnelle",
    text: "Chaima : \"[PRÉNOM], avant qu'on continue, j'aimerais te poser une question. As-tu une idée du coût d'un accompagnement thérapeutique classique sur 2-3 ans, avec une séance hebdomadaire ? Je te demande ça car c'est souvent le temps nécessaire pour reconstruire une relation après une infidélité quand on est seule.\"",
    notes: [
      "Introduire la discussion sur le prix de manière naturelle",
      "Mettre en avant la valeur ajoutée de notre programme",
      "Préparer le terrain pour comparer avec d'autres solutions",
    ],
    options: [
      {
        id: "14A",
        label: "Client Sans Idée",
        response: "Chaima : \"Je comprends. En fait, un accompagnement thérapeutique classique peut facilement atteindre entre 5000€ et 10000€, voire plus sur cette durée. Et malheureusement, ce n'est pas toujours adapté aux spécificités de l'infidélité et aux besoins de reconstruction de la confiance.\"",
        next: "15",
        type: "neutral",
      },
      {
        id: "14B",
        label: "Client Estimation Basse",
        response: "Chaima : \"Je comprends ton estimation. En réalité, un suivi thérapeutique classique sur cette durée se situe plutôt entre 5000€ et 10000€. Et souvent, ce n'est pas suffisamment spécialisé pour traiter en profondeur les traumatismes liés à l'infidélité et reconstruire une vraie connexion dans le couple.\"",
        next: "15",
        type: "neutral",
      },
      {
        id: "14C",
        label: "Client Estimation Haute",
        response: "Chaima : \"Tu as raison. Un accompagnement thérapeutique classique peut effectivement coûter entre 5000€ et 10000€. Et malgré cet investissement important, les résultats ne sont pas toujours garantis, surtout dans des situations complexes comme l'infidélité.\"",
        next: "15",
        type: "neutral",
      },
    ],
  },

  15: {
    id: "15",
    title: "Transition vers Notre Solution",
    text: "Chaima : \"C'est justement pour cela que Mohamed a développé un accompagnement plus complet et plus accessible. Notre programme intègre non seulement l'aspect thérapeutique, mais aussi un accompagnement personnalisé avec la Coach Care, des outils pratiques, et une méthodologie spécifique pour la reconstruction après l'infidélité.\n\nCe que je vais te présenter, [PRÉNOM], c'est une approche qui a déjà fait ses preuves avec de nombreuses femmes qui étaient exactement dans ta situation.\"",
    notes: [
      "Présenter notre solution comme une alternative supérieure",
      "Mettre en avant les avantages spécifiques",
      "Créer une transition fluide vers la présentation des offres",
    ],
    options: [
      {
        id: "15A",
        label: "Client Intéressé",
        response: "Chaima : \"Je suis ravie que cela t'intéresse, [PRÉNOM]. Passons maintenant à la présentation de nos offres et comment elles peuvent répondre à tes besoins spécifiques.\"",
        next: "16",
        type: "positive",
      },
      {
        id: "15B",
        label: "Client Pose des Questions",
        response: "Chaima : \"Bien sûr, n'hésite pas à me poser toutes les questions que tu as en tête sur notre programme. Je suis là pour t'éclairer.\"",
        next: "16",
        type: "neutral",
      },
      {
        id: "15C",
        label: "Client Hésitant",
        response: "Chaima : \"Je comprends que tu puisses avoir des réserves. Dis-moi ce qui te préoccupe, et je t'aiderai à y voir plus clair.\"",
        next: "16",
        type: "neutral",
      },
    ],
  },

  16: {
    id: "16",
    title: "Présentation de l'Offre Premium",
    text: "Chaima : \"[PRÉNOM], maintenant que je sais que tu es éligible, laisse-moi te présenter notre programme de Transformation Complète sur 6 mois. C'est un accompagnement spécialement conçu pour les femmes comme toi qui sont déterminées à transformer leur vie de couple après une infidélité.\"",
    notes: [
      "Présenter l'offre principale de manière détaillée",
      "Mettre en avant les composants clés de l'offre",
      "Préparer le client à la discussion sur le prix",
    ],
    options: [
      {
        id: "16A",
        label: "Détail des Composantes",
        response: "Chaima : \"Premier pilier de ta transformation :\n- Accès complet à notre plateforme spécialisée\n- Un parcours introspectif guidé, adapté à ta situation d'infidélité\n- Des exercices pratiques ciblés pour reconstruire la confiance\n- Des mini-audios quotidiens pour renforcer ton développement personnel\n- Des outils spécifiques pour gérer l'anxiété et les pensées intrusives.\n\nDeuxième pilier fondamental :\n- Sessions interactives avec d'autres femmes qui comprennent ce que tu traverses\n- Partage d'expériences dans un cadre bienveillant et confidentiel\n- Questions/réponses avec nos experts en reconstruction du couple\n- Soutien mutuel dans un environnement compréhensif.\n\nEt l'élément qui fait toute la différence, ton accompagnement Coach Care personnalisé :\n- Dimension Coach : pour te guider activement vers tes objectifs\n- Dimension Care : pour t'apporter le soutien émotionnel dont tu as besoin\n- Appels hebdomadaires de suivi personnalisé\n- Support continu via WhatsApp pour les moments difficiles.\"",
        next: "17",
        type: "positive",
      },
    ],
  },

  17: {
    id: "17",
    title: "Présentation du Prix",
    text: "Chaima : \"[PRÉNOM], cet accompagnement complet représente un investissement de 3091€. Pour le rendre plus accessible, nous proposons des facilités de paiement en 3 ou 6 fois sans frais.\"",
    notes: [
      "Introduire le prix de manière transparente",
      "Offrir des options de paiement pour faciliter l'engagement",
      "Mettre en avant la valeur ajoutée de l'investissement",
    ],
    options: [
      {
        id: "17A",
        label: "Client Choqué par le Prix",
        response: "Chaima : \"Je comprends que ce montant puisse te surprendre, [PRÉNOM]. Laisse-moi te poser une question : quel prix accordes-tu à la paix dans ton couple et à ton bien-être émotionnel ? [PAUSE] Rappelle-toi, un accompagnement thérapeutique classique coûterait entre 5000€ et 10000€, sans la spécialisation sur l'infidélité ni l'accompagnement personnalisé.\"",
        next: "18",
        type: "neutral",
      },
      {
        id: "17B",
        label: "Client Hésite",
        response: "Chaima : \"Je comprends que tu aies besoin de réfléchir, c'est une décision importante. Mais laisse-moi te poser une question : combien de temps as-tu déjà passé à souffrir de cette situation ? [PAUSE] Chaque jour qui passe est un jour de plus dans l'anxiété et l'insécurité.\"",
        next: "18",
        type: "neutral",
      },
      {
        id: "17C",
        label: "Client Évoque le Budget",
        response: "Chaima : \"Je comprends ta préoccupation concernant le budget, [PRÉNOM]. C'est justement pour cela que nous proposons des facilités de paiement. Par exemple, en 6 fois, cela revient à environ 515€ par mois. [PAUSE] C'est un investissement dans ton bonheur et celui de ta famille.\"",
        next: "18",
        type: "neutral",
      },
    ],
  },

  18: {
    id: "18",
    title: "Gestion de la Première Objection Prix",
    text: "Chaima : \"Je comprends tout à fait que cet investissement te fasse réfléchir, [PRÉNOM]. C'est normal et même sain d'avoir cette réaction. [PAUSE] Permets-moi de te poser une question : sur une échelle de 1 à 10, à quel point dirais-tu que tu es motivée pour transformer ta vie de couple et retrouver la sérénité émotionnelle ?\"",
    notes: [
      "Répondre avec empathie à l'objection de prix",
      "Évaluer la motivation du client",
      "Adapter la réponse en fonction du score de motivation",
    ],
    options: [
      {
        id: "18A",
        label: "Score Élevé (8-10)",
        response: "Chaima : \"Un score de [X] sur 10 ! C'est remarquable, [PRÉNOM]. Les femmes qui commencent avec ce niveau de motivation voient généralement des résultats exceptionnels en quelques semaines. Cette détermination, combinée à notre accompagnement, c'est la recette parfaite pour une transformation réussie.\"",
        next: "19",
        type: "high-impact",
      },
      {
        id: "18B",
        label: "Score Moyen (6-7)",
        response: "Chaima : \"Un [X] sur 10, c'est déjà une belle motivation. Avec notre accompagnement, nous allons transformer cette motivation en résultats concrets. Les doutes que tu ressens sont normaux, mais ils ne doivent pas t'empêcher d'avancer vers le bonheur que tu mérites.\"",
        next: "19",
        type: "medium-impact",
      },
      {
        id: "18C",
        label: "Score Bas (1-5)",
        response: "Chaima : \"Je comprends. Ces hésitations sont souvent liées à la peur du changement ou à des expériences passées décevantes. Parlons un peu plus en détail de ce qui te freine. Qu'est-ce qui t'empêche d'être plus convaincue ?\"",
        next: "19",
        type: "low-impact",
      },
    ],
  },

  19: {
    id: "19",
    title: "Présentation de l'Offre Essentielle",
    text: "Chaima : \"[PRÉNOM], je vois à quel point tu es motivée à transformer ta situation. Je vais faire quelque chose d'exceptionnel. [PAUSE] Notre programme Premium est normalement le seul que nous proposons, mais je sens une réelle détermination chez toi.\n\nJ'ai la possibilité de te proposer notre Option Essentielle sur 3 mois à 2091€. C'est vraiment une opportunité unique que je t'offre car je crois en ton potentiel et je veux vraiment t'aider à transformer ta situation.\"",
    notes: [
      "Offrir une alternative pour faciliter l'engagement",
      "Adapter l'offre en fonction de la motivation du client",
      "Mettre en avant la valeur de l'offre essentielle",
    ],
    options: [
      {
        id: "19A",
        label: "Client Accepte l'Option Essentielle",
        response: "Chaima : \"Je suis vraiment heureuse que l'Option Essentielle réponde à tes besoins, [PRÉNOM]. Passons maintenant aux prochaines étapes pour intégrer ce programme dans ta vie.\"",
        next: "20",
        type: "positive",
      },
      {
        id: "19B",
        label: "Client Hésite Entre les Offres",
        response: "Chaima : \"Je comprends que tu puisses être indécise entre les deux options. Parlons de ce qui est le plus important pour toi et comment chacune des offres peut répondre à tes besoins spécifiques.\"",
        next: "20",
        type: "neutral",
      },
      {
        id: "19C",
        label: "Client Refuse les Deux Offres",
        response: "Chaima : \"Je suis désolée que les options proposées ne correspondent pas à ce que tu recherches actuellement. Si jamais tu changes d'avis ou as des questions supplémentaires, n'hésite pas à me contacter.\"",
        next: "fin",
        type: "negative",
      },
    ],
  },

  20: {
    id: "20",
    title: "Gestion de la Résistance Finale et Conclusion",
    text: "Chaima : \"[PRÉNOM], je sens que tu hésites encore, et je comprends. J'aimerais partager avec toi une réflexion importante qui me vient de Mohamed. Il dit souvent que dans une situation comme la tienne, il y a en réalité deux coûts à considérer : le coût de l'action et le coût de l'inaction.\"",
    notes: [
      "Introduire le concept du coût de l'inaction",
      "Créer un sentiment d'urgence",
      "Encourager le client à prendre une décision éclairée",
    ],
    options: [
      {
        id: "20A",
        label: "Client Intéressé",
        response: "Chaima : \"Laisse-moi t'expliquer avec un exercice qui aide beaucoup nos participantes à voir les choses clairement...\"",
        next: "21",
        type: "neutral",
      },
      {
        id: "20B",
        label: "Client Sceptique",
        response: "Chaima : \"Je comprends ta réserve. Faisons quelque chose ensemble qui va t'aider à voir exactement ce que je veux dire...\"",
        next: "21",
        type: "neutral",
      },
    ],
  },

  21: {
    id: "21",
    title: "Exercice de Projection Négative",
    text: "Chaima : \"Faisons un petit exercice ensemble, [PRÉNOM]. Je vais te guider pas à pas. Ferme les yeux un instant... [PAUSE]\n\nD'abord, projette-toi dans un an, en imaginant que tu n'aies rien changé à ta situation actuelle :\n- Comment te sens-tu émotionnellement ?\n- Où en est ta relation avec ton mari ?\n- Quel impact cela a-t-il sur vos enfants ?\n- Comment est l'ambiance à la maison ?\"",
    notes: [
      "Faire réfléchir le client sur les conséquences de l'inaction",
      "Créer un contraste entre le présent et le futur",
      "Encourager la prise de conscience",
    ],
    options: [
      {
        id: "21A",
        label: "Client Projette Négativement",
        response: "Chaima : \"Je comprends que cette perspective soit difficile à envisager. C'est exactement pour éviter ce scénario qu'il est important d'agir maintenant. [PAUSE] La bonne nouvelle, c'est que ce n'est qu'un scénario possible, pas une fatalité.\"",
        next: "22",
        type: "neutral",
      },
      {
        id: "21B",
        label: "Client Optimiste Irréaliste",
        response: "Chaima : \"Je comprends ton espoir que les choses s'améliorent d'elles-mêmes. Mais sois honnête avec toi-même : si c'était vraiment possible, ne serait-ce pas déjà arrivé ? [PAUSE] Les blessures profondes comme l'infidélité ne guérissent pas toutes seules, elles nécessitent un vrai travail de reconstruction.\"",
        next: "22",
        type: "neutral",
      },
    ],
  },

  22: {
    id: "22",
    title: "Projection Positive",
    text: "Chaima : \"Maintenant, [PRÉNOM], projetons-nous dans 6 mois, mais cette fois après avoir suivi notre programme :\n\n- Tu as surmonté ces sentiments d'anxiété qui te rongent\n- La confiance se reconstruit progressivement\n- Vous avez retrouvé une communication authentique et profonde\n- Tes enfants ressentent cette nouvelle harmonie dans le foyer\n- Tu te sens enfin en paix avec toi-même\n\nQuelle différence ressens-tu entre ces deux scénarios ?\"",
    notes: [
      "Encourager une vision positive du futur avec notre programme",
      "Renforcer le désir de transformation",
      "Mettre en avant les bénéfices concrets",
    ],
    options: [
      {
        id: "22A",
        label: "Client Réagit Positivement",
        response: "Chaima : \"Je sens beaucoup d'espoir dans ta voix, [PRÉNOM]. Et tu sais quoi ? Cet espoir est parfaitement légitime. Ce que tu imagines n'est pas un rêve inaccessible, c'est un objectif concret que nous pouvons atteindre ensemble avec la méthodologie de Mohamed. Les femmes qui, comme toi, sont déterminées à transformer leur relation, voient souvent les premiers changements dès les premières semaines.\"",
        next: "23",
        type: "positive",
      },
      {
        id: "22B",
        label: "Client Dubitatif",
        response: "Chaima : \"Ta question est légitime. Ce que je te décris n'est pas un miracle, mais le résultat d'une méthode éprouvée. De nombreuses femmes qui étaient exactement dans ta situation y sont parvenues. [PAUSE] La différence entre elles et celles qui continuent à souffrir ? Elles ont décidé d'agir.\"",
        next: "23",
        type: "neutral",
      },
      {
        id: "22C",
        label: "Client Évoque les Enfants",
        response: "Chaima : \"Tu as raison, [PRÉNOM]. Les enfants sont très sensibles à l'atmosphère du foyer. Imagine comme ce serait bénéfique pour eux de voir leurs parents retrouver une relation harmonieuse. C'est un des aspects dont Mohamed parle souvent : quand on guérit le couple, on guérit toute la famille.\"",
        next: "23",
        type: "positive",
      },
    ],
  },

  23: {
    id: "23",
    title: "Création de l'Urgențce",
    text: "Chaima : \"[PRÉNOM], laisse-moi te poser une question importante : combien de temps as-tu déjà passé dans cette situation ? [PAUSE] Et plus important encore, combien de temps es-tu prête à continuer comme ça ?\n\nChaque jour qui passe est un jour où :\n- Tu continues à souffrir de cette anxiété\n- La confiance s'érode un peu plus\n- Vos enfants ressentent cette tension\n- Tu passes à côté du bonheur que tu mérites\n\nCe n'est pas juste un jour de plus, c'est un jour de moins pour construire le bonheur que tu mérites.\"",
    notes: [
      "Souligner l'urgence d'agir maintenant",
      "Renforcer l'impact négatif de l'inaction",
      "Encourager la prise de décision rapide",
    ],
    options: [
      {
        id: "23A",
        label: "Client Montre de l'Hésitation",
        response: "Chaima : \"Je comprends ton hésitation, [PRÉNOM]. Mais laisse-moi te poser une question : depuis combien de temps réfléchis-tu déjà à cette situation ? [PAUSE] Le temps que tu passes à réfléchir est du temps perdu pour ta transformation. Avec la garantie de 7 jours, tu ne prends aucun risque à commencer maintenant.\"",
        next: "24",
        type: "neutral",
      },
      {
        id: "23B",
        label: "Client Mentionne le Budget",
        response: "Chaima : \"Je comprends ta préoccupation concernant l'investissement, [PRÉNOM]. Mais réfléchissons ensemble : quel est le prix de ton bonheur ? De la sérénité dans ton couple ? De l'harmonie dans ta famille ? [PAUSE] De plus, avec le paiement en plusieurs fois, c'est moins que ce que beaucoup dépensent en courses supplémentaires chaque mois.\"",
        next: "24",
        type: "neutral",
      },
    ],
  },

  24: {
    id: "24",
    title: "Présentation de la Garantie",
    text: "Chaima : \"Je comprends que prendre cette décision demande du courage, [PRÉNOM]. C'est pour cela que nous offrons une garantie 'satisfait ou remboursé' de 7 jours.\n\nConcrètement, cela signifie que tu peux :\n- Commencer le programme\n- Explorer la plateforme\n- Avoir tes premiers appels avec ta Coach Care\n- Participer aux sessions de groupe\n\nSi dans les 7 jours, tu estimes que ce n'est pas ce que tu cherchais, nous te remboursons intégralement. Sans question, sans condition.\"",
    notes: [
      "Offrir une sécurité pour faciliter l'engagement",
      "Rassurer le client sur l'absence de risque",
      "Encourager l'essai du programme",
    ],
    options: [
      {
        id: "24A",
        label: "Client Rassuré",
        response: "Chaima : \"Exactement, nous voulons que tu te sentes en totale confiance. Cette garantie te permet de faire le premier pas sans risque.\"",
        next: "25",
        type: "positive",
      },
      {
        id: "24B",
        label: "Client Encore Hésitant",
        response: "Chaima : \"Je comprends ton besoin de réflexion, [PRÉNOM]. Mais laisse-moi te poser une question : qu'est-ce qui pourrait changer dans ta situation en réfléchissant quelques jours de plus ? [PAUSE] Surtout quand tu peux commencer sans risque grâce à la garantie.\"",
        next: "25",
        type: "neutral",
      },
    ],
  },

  25: {
    id: "25",
    title: "Création du Sentiment d'Urgențce",
    text: "Chaima : \"[PRÉNOM], après tout ce que nous avons échangé aujourd'hui, je dois être honnête avec toi. [PAUSE] La situation que tu vis avec ton mari nécessite une action rapide. Voici pourquoi :\n\n- Chaque jour qui passe creuse davantage ce fossé émotionnel entre vous\n- L'anxiété et l'insécurité que tu ressens continuent d'éroder ton bien-être\n- Les enfants absorbent cette tension au quotidien\n- Ces schémas destructeurs s'ancrent plus profondément dans votre relation\n\nLa vraie question n'est pas de savoir SI tu dois agir, mais QUAND. Et le meilleur moment pour commencer ta transformation, c'est maintenant.\"",
    notes: [
      "Renforcer l'urgence d'agir immédiatement",
      "Souligner les conséquences négatives de l'inaction",
      "Encourager une prise de décision rapide",
    ],
    options: [
      {
        id: "25A",
        label: "Client Montre de l'Hésitation",
        response: "Chaima : \"Je comprends ton hésitation, [PRÉNOM]. Mais laisse-moi te poser une question : depuis combien de temps réfléchis-tu déjà à cette situation ? [PAUSE] Le temps que tu passes à réfléchir est du temps perdu pour ta transformation. Avec la garantie de 7 jours, tu ne prends aucun risque à commencer maintenant.\"",
        next: "26",
        type: "neutral",
      },
      {
        id: "25B",
        label: "Client Mentionne le Budget",
        response: "Chaima : \"Je comprends ta préoccupation concernant l'investissement, [PRÉNOM]. Mais réfléchissons ensemble : quel est le prix de ton bonheur ? De la sérénité dans ton couple ? De l'harmonie dans ta famille ? [PAUSE] De plus, avec le paiement en plusieurs fois, c'est moins que ce que beaucoup dépensent en courses supplémentaires chaque mois.\"",
        next: "26",
        type: "neutral",
      },
    ],
  },

  26: {
    id: "26",
    title: "Invitation aux Questions",
    text: "Chaima : \"Avant de te présenter les options d'accompagnement en détail, j'aimerais m'assurer que tu as toutes les informations dont tu as besoin. Y a-t-il des points que tu souhaiterais clarifier ?\"",
    notes: [
      "Ouvrir un espace pour les questions finales",
      "Assurer que le client est bien informé",
      "Préparer la transition vers la présentation des offres",
    ],
    options: [
      {
        id: "26A",
        label: "Client a des Questions",
        response: "Chaima : \"Je suis là pour répondre à toutes tes questions. Qu'est-ce que tu aimerais savoir ?\"",
        next: "27",
        type: "neutral",
      },
      {
        id: "26B",
        label: "Client N'a Pas de Questions",
        response: "Chaima : \"Parfait, passons maintenant à la présentation de nos options d'accompagnement.\"",
        next: "27",
        type: "positive",
      },
    ],
  },

  27: {
    id: "27",
    title: "Présentation des Offres et Gestion des Objections",
    text: "Chaima : \"[PRÉNOM], je vais maintenant te présenter nos différentes options d'accompagnement pour que tu puisses choisir celle qui te convient le mieux.\"",
    notes: [
      "Présenter les différentes offres disponibles",
      "Gérer les objections de manière proactive",
      "Encourager le client à choisir l'offre la plus adaptée",
    ],
    options: [
      {
        id: "27A",
        label: "Présenter Offre Premium",
        response: "Chaima : \"Notre offre Premium comprend un accompagnement complet sur 6 mois avec tous les modules que nous avons évoqués, ainsi que le suivi personnalisé avec ta Coach Care. C'est un investissement de 3091€ payable en 3 ou 6 fois sans frais.\"",
        next: "28",
        type: "positive",
      },
      {
        id: "27B",
        label: "Présenter Offre Essentielle",
        response: "Chaima : \"Si tu préfères une option plus courte, nous avons l'Option Essentielle sur 3 mois à 2091€. Elle inclut les modules clés et un accompagnement personnalisé adapté à tes besoins immédiats.\"",
        next: "28",
        type: "neutral",
      },
    ],
  },

  28: {
    id: "28",
    title: "Gestion des Objections sur le Prix",
    text: "Chaima : \"Je comprends que ces montants puissent te surprendre, [PRÉNOM]. Laisse-moi te poser une question : quel prix accordes-tu à la paix dans ton couple et à ton bien-être émotionnel ?\"",
    notes: [
      "Répondre avec empathie aux objections de prix",
      "Encourager le client à évaluer la valeur de l'investissement",
      "Renforcer la comparaison avec d'autres solutions coûteuses",
    ],
    options: [
      {
        id: "28A",
        label: "Client Choque par le Prix",
        response: "Chaima : \"Je comprends. En fait, un accompagnement thérapeutique classique peut facilement atteindre entre 5000€ et 10000€, voire plus sur cette durée. Et malheureusement, ce n'est pas toujours adapté aux spécificités de l'infidélité et aux besoins de reconstruction de la confiance.\"",
        next: "29",
        type: "neutral",
      },
      {
        id: "28B",
        label: "Client Hésite",
        response: "Chaima : \"Je comprends que tu aies besoin de réfléchir, [PRÉNOM]. Mais laisse-moi te poser une question : combien de temps as-tu déjà passé à souffrir de cette situation ? [PAUSE] Chaque jour qui passe est un jour de plus dans l'anxiété et l'insécurité.\"",
        next: "29",
        type: "neutral",
      },
      {
        id: "28C",
        label: "Client Évoque le Budget",
        response: "Chaima : \"Je comprends ta préoccupation concernant l'investissement, [PRÉNOM]. C'est justement pour cela que nous proposons des facilités de paiement. Par exemple, en 6 fois, cela revient à environ 515€ par mois. [PAUSE] C'est un investissement dans ton bonheur et celui de ta famille.\"",
        next: "29",
        type: "neutral",
      },
    ],
  },

  29: {
    id: "29",
    title: "Gestion de la Résistance Finale",
    text: "Chaima : \"Je comprends tout à fait que cet investissement te fasse réfléchir, [PRÉNOM]. C'est normal et même sain d'avoir cette réaction. [PAUSE] Permets-moi de te poser une question : sur une échelle de 1 à 10, à quel point dirais-tu que tu es motivée pour transformer ta vie de couple et retrouver la sérénité émotionnelle ?\"",
    notes: [
      "Répondre avec empathie à l'objection de prix",
      "Évaluer la motivation du client",
      "Adapter la réponse en fonction du score de motivation",
    ],
    options: [
      {
        id: "29A",
        label: "Score Élevé (8-10)",
        response: "Chaima : \"Un score de [X] sur 10 ! C'est remarquable, [PRÉNOM]. Les femmes qui commencent avec ce niveau de motivation voient généralement des résultats exceptionnels en quelques semaines. Cette détermination, combinée à notre accompagnement, c'est la recette parfaite pour une transformation réussie.\"",
        next: "30",
        type: "high-impact",
      },
      {
        id: "29B",
        label: "Score Moyen (6-7)",
        response: "Chaima : \"Un [X] sur 10, c'est déjà une belle motivation. Avec notre accompagnement, nous allons transformer cette motivation en résultats concrets. Les doutes que tu ressens sont normaux, mais ils ne doivent pas t'empêcher d'avancer vers le bonheur que tu mérites.\"",
        next: "30",
        type: "medium-impact",
      },
      {
        id: "29C",
        label: "Score Bas (1-5)",
        response: "Chaima : \"Je comprends. Ces hésitations sont souvent liées à la peur du changement ou à des expériences passées décevantes. Parlons un peu plus en détail de ce qui te freine. Qu'est-ce qui t'empêche d'être plus convaincue ?\"",
        next: "30",
        type: "low-impact",
      },
    ],
  },

  30: {
    id: "30",
    title: "Présentation de l'Offre Essentielle (Suite)",
    text: "Chaima : \"[PRÉNOM], je vois à quel point tu es motivée à transformer ta situation. Je vais faire quelque chose d'exceptionnel. [PAUSE] Notre programme Premium est normalement le seul que nous proposons, mais je sens une réelle détermination chez toi.\n\nJ'ai la possibilité de te proposer notre Option Essentielle sur 3 mois à 2091€. C'est vraiment une opportunité unique que je t'offre car je crois en ton potentiel et je veux vraiment t'aider à transformer ta situation.\"",
    notes: [
      "Offrir une alternative pour faciliter l'engagement",
      "Adapter l'offre en fonction de la motivation du client",
      "Mettre en avant la valeur de l'offre essentielle",
    ],
    options: [
      {
        id: "30A",
        label: "Client Accepte l'Option Essentielle",
        response: "Chaima : \"Je suis vraiment heureuse que l'Option Essentielle réponde à tes besoins, [PRÉNOM]. Passons maintenant aux prochaines étapes pour intégrer ce programme dans ta vie.\"",
        next: "31",
        type: "positive",
      },
      {
        id: "30B",
        label: "Client Hésite Entre les Offres",
        response: "Chaima : \"Je comprends que tu puisses être indécise entre les deux options. Parlons de ce qui est le plus important pour toi et comment chacune des offres peut répondre à tes besoins spécifiques.\"",
        next: "31",
        type: "neutral",
      },
      {
        id: "30C",
        label: "Client Refuse les Deux Offres",
        response: "Chaima : \"Je suis désolée que les options proposées ne correspondent pas à ce que tu recherches actuellement. Si jamais tu changes d'avis ou as des questions supplémentaires, n'hésite pas à me contacter.\"",
        next: "fin",
        type: "negative",
      },
    ],
  },

  31: {
    id: "31",
    title: "Amorce du Coût de l'Inaction",
    text: "Chaima : \"[PRÉNOM], je sens que tu hésites encore, et je comprends. J'aimerais partager avec toi une réflexion importante qui me vient de Mohamed. Il dit souvent que dans une situation comme la tienne, il y a en réalité deux coûts à considérer : le coût de l'action et le coût de l'inaction.\"",
    notes: [
      "Introduire le concept du coût de l'inaction",
      "Créer un sentiment d'urgence",
      "Encourager le client à prendre une décision éclairée",
    ],
    options: [
      {
        id: "31A",
        label: "Client Intéressé",
        response: "Chaima : \"Laisse-moi t'expliquer avec un exercice qui aide beaucoup nos participantes à voir les choses clairement...\"",
        next: "32",
        type: "neutral",
      },
      {
        id: "31B",
        label: "Client Sceptique",
        response: "Chaima : \"Je comprends ta réserve. Faisons quelque chose ensemble qui va t'aider à voir exactement ce que je veux dire...\"",
        next: "32",
        type: "neutral",
      },
    ],
  },

  32: {
    id: "32",
    title: "Exercice de Projection Négative (Suite)",
    text: "Chaima : \"Faisons un petit exercice ensemble, [PRÉNOM]. Je vais te guider pas à pas. Ferme les yeux un instant... [PAUSE]\n\nD'abord, projette-toi dans un an, en imaginant que tu n'aies rien changé à ta situation actuelle :\n- Comment te sens-tu émotionnellement ?\n- Où en est ta relation avec ton mari ?\n- Quel impact cela a-t-il sur vos enfants ?\n- Comment est l'ambiance à la maison ?\"",
    notes: [
      "Faire réfléchir le client sur les conséquences de l'inaction",
      "Créer un contraste entre le présent et le futur",
      "Encourager la prise de conscience",
    ],
    options: [
      {
        id: "32A",
        label: "Client Projette Négativement",
        response: "Chaima : \"Je comprends que cette perspective soit difficile à envisager. C'est exactement pour éviter ce scénario qu'il est important d'agir maintenant. [PAUSE] La bonne nouvelle, c'est que ce n'est qu'un scénario possible, pas une fatalité.\"",
        next: "33",
        type: "neutral",
      },
      {
        id: "32B",
        label: "Client Optimiste Irréaliste",
        response: "Chaima : \"Je comprends ton espoir que les choses s'améliorent d'elles-mêmes. Mais sois honnête avec toi-même : si c'était vraiment possible, ne serait-ce pas déjà arrivé ? [PAUSE] Les blessures profondes comme l'infidélité ne guérissent pas toutes seules, elles nécessitent un vrai travail de reconstruction.\"",
        next: "33",
        type: "neutral",
      },
    ],
  },

  33: {
    id: "33",
    title: "Projection Positive (Suite)",
    text: "Chaima : \"Maintenant, [PRÉNOM], projetons-nous dans 6 mois, mais cette fois après avoir suivi notre programme :\n\n- Tu as surmonté ces sentiments d'anxiété qui te rongent\n- La confiance se reconstruit progressivement\n- Vous avez retrouvé une communication authentique et profonde\n- Tes enfants ressentent cette nouvelle harmonie dans le foyer\n- Tu te sens enfin en paix avec toi-même\n\nQuelle différence ressens-tu entre ces deux scénarios ?\"",
    notes: [
      "Encourager une vision positive du futur avec notre programme",
      "Renforcer le désir de transformation",
      "Mettre en avant les bénéfices concrets",
    ],
    options: [
      {
        id: "33A",
        label: "Client Ému",
        response: "Chaima : \"Je comprends que cette projection te touche profondément. Cette vision est exactement ce que notre programme peut t'aider à réaliser.\"",
        next: "34",
        type: "positive",
      },
      {
        id: "33B",
        label: "Client Dubitatif",
        response: "Chaima : \"Ta question est légitime. Ce que je te décris n'est pas un miracle, mais le résultat d'une méthode éprouvée. De nombreuses femmes qui étaient exactement dans ta situation y sont parvenues. [PAUSE] La différence entre elles et celles qui continuent à souffrir ? Elles ont décidé d'agir.\"",
        next: "34",
        type: "neutral",
      },
    ],
  },

  34: {
    id: "34",
    title: "Création de l'Urgence",
    text: "Chaima : \"Saphira, laisse-moi te poser une question importante : combien de temps as-tu déjà passé dans cette situation ? [PAUSE] Et plus important encore, combien de temps es-tu prête à continuer comme ça ?\n\nChaque jour qui passe est un jour où :\n- Tu continues à souffrir de cette anxiété\n- La confiance s'érode un peu plus\n- Vos enfants ressentent cette tension\n- Tu passes à côté du bonheur que tu mérites\n\nCe n'est pas juste un jour de plus, c'est un jour de moins pour construire le bonheur que tu mérites.\"",
    notes: [
      "Créer un sentiment d'urgence",
      "Mettre en avant les conséquences de l'inaction",
      "Encourager une décision rapide",
    ],
    options: [
      {
        id: "34A",
        label: "Client Prêt à s'Engager",
        response: "Chaima : \"Je suis vraiment fière de ta décision, Saphira ! C'est le premier pas vers la transformation de ta vie. Je t'envoie tout de suite le lien de paiement. Tu préfères régler en 3 ou 6 fois ? [PAUSE] Une fois le paiement effectué, tu recevras immédiatement tes accès à la plateforme et ton Coach Care te contactera dans les 24h pour ton premier appel.\"",
        next: "35",
        type: "positive",
      },
      {
        id: "34B",
        label: "Client Hésite Encore",
        response: "Chaima : \"Je sens dans ta voix que tu sais au fond de toi que c'est la bonne décision, mais que quelque chose te retient encore. [PAUSE] Rappelle-toi : avec la garantie de 7 jours, tu ne prends aucun risque à commencer maintenant.\"",
        next: "35",
        type: "neutral",
      },
      {
        id: "34C",
        label: "Client Mentionne le Budget",
        response: "Chaima : \"Je comprends ta préoccupation concernant l'investissement. Réfléchissons ensemble : quel est le prix de ton bonheur ? De la sérénité dans ton couple ? De l'harmonie dans ta famille ? [PAUSE] De plus, avec le paiement en plusieurs fois, c'est moins que ce que beaucoup dépensent en courses supplémentaires chaque mois.\"",
        next: "35",
        type: "neutral",
      },
    ],
  },

  35: {
    id: "35",
    title: "Présentation de la Garantie",
    text: "Chaima : \"Je comprends que prendre cette décision demande du courage, Saphira. C'est pour cela que nous offrons une garantie 'satisfait ou remboursé' de 7 jours.\n\nConcrètement, cela signifie que tu peux :\n- Commencer le programme\n- Explorer la plateforme\n- Avoir tes premiers appels avec ta Coach Care\n- Participer aux sessions de groupe\n\nSi dans les 7 jours, tu estimes que ce n'est pas ce que tu cherchais, nous te remboursons intégralement. Sans question, sans condition.\"",
    notes: [
      "Rassurer le client avec une garantie",
      "Réduire le risque perçu",
      "Encourager la prise de décision",
    ],
    options: [
      {
        id: "35A",
        label: "Client Rassuré",
        response: "Chaima : \"Exactement, nous voulons que tu te sentes en totale confiance. Cette garantie te permet de faire le premier pas sans risque.\"",
        next: "36",
        type: "positive",
      },
      {
        id: "35B",
        label: "Client Encore Hésitant",
        response: "Chaima : \"Je comprends ton besoin de réflexion. Mais laisse-moi te poser une question : qu'est-ce qui pourrait changer dans ta situation en réfléchissant quelques jours de plus ? [PAUSE] Surtout quand tu peux commencer sans risque grâce à la garantie.\"",
        next: "36",
        type: "neutral",
      },
    ],
  },

  36: {
    id: "36",
    title: "Création du Sentiment d'Urgenence",
    text: "Chaima : \"Saphira, après tout ce que nous avons échangé aujourd'hui, je dois être honnête avec toi. [PAUSE] La situation que tu vis avec ton mari nécessite une action rapide. Voici pourquoi :\n\nChaque jour qui passe creuse davantage ce fossé émotionnel entre vous\nL'anxiété et l'insécurité que tu ressens continuent d'éroder ton bien-être\nLes enfants absorbent cette tension au quotidien\nCes schémas destructeurs s'ancrent plus profondément dans votre relation\n\nLa vraie question n'est pas de savoir SI tu dois agir, mais QUAND. Et le meilleur moment pour commencer ta transformation, c'est maintenant.\"",
    notes: [
      "Insister sur l'urgence de la situation",
      "Encourager une décision rapide",
      "Mettre en avant les conséquences de l'inaction",
    ],
    options: [
      {
        id: "36A",
        label: "Client Prêt à Agir",
        response: "Chaima : \"Ton enthousiasme me touche, Saphira. Je sens que tu es prête à passer à l'action. Avant de te présenter les différentes options d'accompagnement, j'aimerais te poser une question importante...\"",
        next: "37",
        type: "positive",
      },
      {
        id: "36B",
        label: "Client Hésite Encore",
        response: "Chaima : \"Je comprends ton hésitation, Saphira. Mais laisse-moi te poser une question : depuis combien de temps réfléchis-tu déjà à cette situation ? [PAUSE] Le temps que tu passes à réfléchir est du temps perdu pour ta transformation. Avec la garantie de 7 jours, tu ne prends aucun risque à commencer maintenant.\"",
        next: "37",
        type: "neutral",
      },
      {
        id: "36C",
        label: "Client Mentionne le Budget",
        response: "Chaima : \"Je comprends ta préoccupation concernant l'investissement. Réfléchissons ensemble : quel est le prix de ton bonheur ? De la sérénité dans ton couple ? De l'harmonie dans ta famille ? [PAUSE] De plus, avec le paiement en plusieurs fois, c'est moins que ce que beaucoup dépensent en courses supplémentaires chaque mois.\"",
        next: "37",
        type: "neutral",
      },
    ],
  },

  37: {
    id: "37",
    title: "Gestion des Dernières Objections",
    text: "Chaima : \"Saphira, je sens qu'il y a encore quelque chose qui te retient. Peux-tu me dire exactement ce qui t'empêche de commencer ta transformation aujourd'hui ?\"",
    notes: [
      "Identifier les dernières objections",
      "Personnaliser la réponse en fonction des objections",
      "Encourager l'engagement",
    ],
    options: [
      {
        id: "37A",
        label: "Objection sur le Temps",
        response: "Chaima : \"Je comprends cette préoccupation, Saphira. Mais dis-moi : combien de temps passes-tu actuellement à t'inquiéter, à ruminer sur la situation ? [PAUSE] Le programme demande seulement 2-3 heures par semaine, et il est entièrement adaptable à ton rythme. N'est-ce pas un petit investissement en temps pour transformer complètement ta vie de couple ?\"",
        next: "38",
        type: "neutral",
      },
      {
        id: "37B",
        label: "Objection sur l'Efficacité",
        response: "Chaima : \"C'est normal d'avoir des doutes, surtout après des déceptions. Mais c'est justement la différence avec notre programme : tu ne seras pas seule. Tu auras un accompagnement personnalisé avec ta Coach Care, des outils spécifiques pour ta situation, et surtout, une méthode qui a fait ses preuves avec de nombreuses femmes dans ta situation. Et n'oublie pas : tu as 7 jours pour tester le programme sans risque.\"",
        next: "38",
        type: "neutral",
      },
      {
        id: "37C",
        label: "Objection sur le Mari",
        response: "Chaima : \"Je comprends que tu veuilles en parler avec ton mari. Mais réfléchis : ce programme est d'abord pour TOI, pour te donner les outils et la force de transformer votre relation. [PAUSE] Souvent, quand une femme commence à changer positivement, son mari suit naturellement. N'attends pas son approbation pour prendre soin de toi et de votre couple.\"",
        next: "38",
        type: "neutral",
      },
    ],
  },

  38: {
    id: "38",
    title: "Invitation Finale à l'Action",
    text: "Chaima : \"Saphira, nous avons passé ce temps ensemble à parler de ta situation, de tes défis avec la confiance après l'infidélité, et de comment notre programme peut t'aider à transformer ta vie de couple. [PAUSE] Maintenant, j'aimerais te poser une dernière question très importante...\"",
    notes: [
      "Finaliser l'engagement du client",
      "Offrir des options claires",
      "Assurer un closing positif",
    ],
    options: [
      {
        id: "38A",
        label: "Client Prêt à s'Engager",
        response: "Chaima : \"Oui, je veux commencer...\"",
        next: "39",
        type: "positive",
      },
      {
        id: "38B",
        label: "Client Hésite Encore",
        response: "Chaima : \"Je ne sais pas...\"",
        next: "39",
        type: "neutral",
      },
      {
        id: "38C",
        label: "Client Évoque une Dernière Fois le Prix",
        response: "Chaima : \"C'est quand même un gros investissement...\"",
        next: "39",
        type: "neutral",
      },
    ],
  },

  39: {
    id: "39",
    title: "Présentation des Offres et Gestion des Objections",
    text: "Chaima : \"Saphira, je vais maintenant te présenter les différentes options d'accompagnement qui s'offrent à toi...\"",
    notes: [
      "Présenter les différentes offres",
      "Gérer les objections de prix",
      "Finaliser la vente",
    ],
    options: [
      {
        id: "39A",
        label: "Client Accepte l'Offre Premium",
        response: "Chaima : \"Parfait, [PRÉNOM] ! Je vais t'accompagner pas à pas dans le processus. Je t'envoie le lien de paiement sur WhatsApp. Tu le reçois bien ?\"",
        next: "40",
        type: "positive",
      },
      {
        id: "39B",
        label: "Client Choisit l'Option Essentielle",
        response: "Chaima : \"Je suis vraiment heureuse que l'Option Essentielle réponde à tes besoins, [PRÉNOM]. Passons maintenant aux prochaines étapes pour intégrer ce programme dans ta vie.\"",
        next: "40",
        type: "positive",
      },
      {
        id: "39C",
        label: "Client Refuse les Offres",
        response: "Chaima : \"Je suis désolée que les options proposées ne correspondent pas à ce que tu recherches actuellement. Si jamais tu changes d'avis ou as des questions supplémentaires, n'hésite pas à me contacter.\"",
        next: "fin",
        type: "negative",
      },
    ],
  },

  40: {
    id: "40",
    title: "Processus de Paiement",
    text: "Chaima : \"Super, [PRÉNOM] ! Je vais t'accompagner pas à pas dans le processus. Je t'envoie le lien de paiement sur WhatsApp. Tu le reçois bien ?\"",
    notes: [
      "Accompagner le client dans le paiement",
      "Gérer les problèmes techniques",
      "Confirmer le paiement",
    ],
    options: [
      {
        id: "40A",
        label: "Réception Claire du Lien",
        response: "Chaima : \"Parfait ! Je reste en ligne avec toi pendant que tu procèdes au paiement. N'hésite pas si tu as la moindre question.\"",
        next: "41",
        type: "positive",
      },
      {
        id: "40B",
        label: "Problème Technique",
        response: "Chaima : \"Pas de souci, je vais t'aider. Essayons d'abord de rafraîchir la page. [PAUSE] Si ça ne fonctionne toujours pas, je peux te l'envoyer par SMS ou par email. Quelle option préfères-tu ?\"",
        next: "41",
        type: "neutral",
      },
    ],
  },

  41: {
    id: "41",
    title: "Confirmation du Paiement",
    text: "Chaima : \"Je vois que le paiement est bien passé ! Félicitations [PRÉNOM], tu viens de faire le premier pas vers la transformation de ta vie de couple.\"",
    notes: [
      "Confirmer la réception du paiement",
      "Féliciter le client",
      "Préparer l'onboarding",
    ],
    options: [
      {
        id: "41A",
        label: "Client Confirme la Réception",
        response: "Chaima : \"Félicitations, [PRÉNOM] ! Tu as fait le premier pas vers ta transformation.\"",
        next: "42",
        type: "positive",
      },
    ],
  },

  42: {
    id: "42",
    title: "Onboarding Immédiat",
    text: "Chaima : \"Voici ce qui va se passer maintenant :\n\nTu vas recevoir dans quelques minutes un email avec tes identifiants de connexion à la plateforme.\nTa Coach Care va te contacter dans les prochaines 24h pour programmer ton premier appel.\nTu auras accès immédiatement au premier module pour commencer ta transformation.\nAs-tu des questions sur ces premières étapes ?\"",
    notes: [
      "Informer sur les prochaines étapes",
      "Assurer un bon démarrage",
      "Répondre aux questions du client",
    ],
    options: [
      {
        id: "42A",
        label: "Client Enthousiaste",
        response: "Chaima : \"Ton enthousiasme me fait vraiment plaisir, [PRÉNOM] ! C'est exactement l'état d'esprit qu'il faut pour réussir. Je te conseille de commencer dès aujourd'hui à explorer la plateforme, ainsi tu pourras déjà avoir des questions précises pour ton premier appel avec ta Coach Care.\"",
        next: "43",
        type: "positive",
      },
      {
        id: "42B",
        label: "Client Anxieux",
        response: "Chaima : \"C'est tout à fait normal de ressentir un peu d'appréhension, [PRÉNOM]. C'est le début d'une belle aventure. Rappelle-toi que tu ne seras pas seule. Ta Coach Care sera là pour t'accompagner à chaque étape. Et moi aussi, je reste disponible si tu as besoin.\"",
        next: "43",
        type: "neutral",
      },
    ],
  },

  43: {
    id: "43",
    title: "Clôture Positive",
    text: "Chaima : \"[PRÉNOM], avant de te laisser découvrir la plateforme, je voulais te dire que je suis vraiment touchée par ton courage et ta détermination. Tu as pris aujourd'hui une décision qui va transformer ta vie. [PAUSE] Je suis impatiente d'entendre les retours de ta Coach Care sur tes premiers progrès.\"",
    notes: [
      "Clore l'appel de manière positive",
      "Encourager le client",
      "Renforcer la confiance",
    ],
    options: [
      {
        id: "43A",
        label: "Client Reconnaissant",
        response: "Chaima : \"Je te remercie également pour ta confiance, [PRÉNOM]. Tu as fait le choix courageux d'agir pour transformer ta vie, et c'est inspirant. Je te souhaite une excellente découverte du programme. Qu'Allah te facilite ce nouveau chapitre de ta vie.\"",
        next: "fin",
        type: "positive",
      },
      {
        id: "43B",
        label: "Client Demande un Dernier Conseil",
        response: "Chaima : \"Je te conseille de commencer par le module d'introduction qui pose les bases de ta transformation. Prends le temps de faire les exercices de connexion à toi-même, c'est vraiment la clé pour bien démarrer. Ta Coach Care t'aidera ensuite à définir ton plan d'action personnalisé.\"",
        next: "fin",
        type: "positive",
      },
    ],
  },

  fin: {
    id: "fin",
    title: "Fin de l'Appel",
    text: "Chaima : \"Merci encore pour ton temps, [PRÉNOM]. Je suis convaincue que tu es sur la bonne voie pour une transformation positive. N'hésite pas à me contacter si tu as des questions supplémentaires. Bonne journée !\"",
    notes: [
      "Clôture de l'appel",
      "Remercier le client",
      "Assurer une bonne fin d'appel",
    ],
    options: [],
  },
};