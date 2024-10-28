// src/data/scriptTree.js
export const scriptTree = {
    1: {
      id: "1",
      title: "Accueil Chaleureux et Personnalisé",
      text: "As-salamu alaykum [PRÉNOM], c'est Chaima à l'appareil. J'espère que tu vas bien. Je suis ravie de t'avoir au téléphone aujourd'hui. Comment vas-tu depuis notre dernier échange ?",
      notes: [
        "Adapter ton ton de voix : chaleureux mais professionnel",
        "Prononcer clairement le prénom",
        "Laisser un moment de silence après la question",
        "Noter l'énergie dans la voix du client",
        "Rester authentique et bienveillante"
      ],
      options: [
        {
          id: "1A",
          label: "Réponse Très Positive",
          response: "Ma sha Allah, je suis vraiment contente de t'entendre si enthousiaste ! Cette énergie positive va nous permettre d'avoir un échange vraiment constructif. Dis-moi, qu'est-ce qui t'a motivée à prendre ce rendez-vous aujourd'hui ?",
          next: 2,
          type: "positive"
        },
        {
          id: "1B",
          label: "Réponse Positive Modérée",
          response: "Alhamdulillah, je suis contente de t'entendre en forme. C'est important d'être dans un bon état d'esprit pour notre échange d'aujourd'hui. Qu'est-ce qui t'a donné envie de prendre ce rendez-vous ?",
          next: 2,
          type: "positive"
        }
      ]
    },
    2: {
      id: "2",
      title: "Exploration des Besoins",
      text: "Je comprends. Peux-tu me parler un peu plus en détail de ce qui t'intéresse particulièrement ?",
      notes: [
        "Écouter attentivement",
        "Prendre des notes des points clés",
        "Identifier les motivations principales"
      ],
      options: [
        {
          id: "2A",
          label: "Intérêt Spécifique",
          response: "Je vois que tu as déjà une idée précise. C'est excellent, ça va nous permettre de cibler exactement ce qu'il te faut.",
          next: 3,
          type: "high-impact"
        },
        {
          id: "2B",
          label: "Intérêt Général",
          response: "D'accord, je comprends que tu souhaites explorer les possibilités. Je vais t'aider à identifier ce qui correspondrait le mieux à tes besoins.",
          next: 3,
          type: "medium-impact"
        }
      ]
    },
    3: {
      id: "3",
      title: "Conclusion",
      text: "Merci pour cet échange. Souhaites-tu qu'on planifie un prochain rendez-vous ?",
      notes: [
        "Résumer les points principaux",
        "Proposer les prochaines étapes"
      ],
      options: [
        {
          id: "3A",
          label: "Oui",
          response: "Parfait ! Je te propose qu'on se reparle bientôt.",
          next: "fin",
          type: "positive"
        },
        {
          id: "3B",
          label: "Non",
          response: "Je comprends. N'hésite pas à me recontacter si tu changes d'avis.",
          next: "fin",
          type: "neutral"
        }
      ]
    }
};