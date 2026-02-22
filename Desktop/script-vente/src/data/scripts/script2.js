// src/data/scripts/script2.js
export default {
    1: {
      id: "1",
      title: "Introduction au Produit",
      text: "Je comprends ton intérêt. Laisse-moi te présenter ce qui pourrait le mieux correspondre à tes besoins. Quelle est ta première impression ?",
      notes: [
        "Observer la réaction initiale",
        "Noter les points d'intérêt",
        "Être attentif aux signaux non-verbaux"
      ],
      options: [
        {
          id: "1A",
          label: "Intérêt Marqué",
          response: "Je suis ravie de voir que cela t'intéresse. Creusons un peu plus pour voir comment cela peut répondre à tes attentes.",
          next: 2,
          type: "positive"
        },
        {
          id: "1B",
          label: "Questions/Hésitations",
          response: "Tes questions sont pertinentes. Prenons le temps d'explorer chaque aspect pour que tu puisses avoir une vision claire.",
          next: 2,
          type: "neutral"
        }
      ]
    },
    2: {
      id: "2",
      title: "Présentation Détaillée",
      text: "Voici les détails qui pourraient t'intéresser particulièrement. Qu'est-ce qui retient le plus ton attention ?",
      notes: [
        "Adapter la présentation aux réactions",
        "Mettre en avant les bénéfices clés",
        "Répondre aux objections"
      ],
      options: [
        {
          id: "2A",
          label: "Focus sur les Avantages",
          response: "Ces avantages correspondent exactement à ce que tu recherches.",
          next: 3,
          type: "high-impact"
        },
        {
          id: "2B",
          label: "Demande de Précisions",
          response: "Bien sûr, entrons dans les détails pour que tout soit parfaitement clair.",
          next: 3,
          type: "medium-impact"
        }
      ]
    },
    3: {
      id: "3",
      title: "Conclusion et Suite",
      text: "Nous avons couvert les points essentiels. Quelle est ta réflexion à ce stade ?",
      notes: [
        "Récapituler les points clés",
        "Valider la compréhension",
        "Proposer les prochaines étapes"
      ],
      options: [
        {
          id: "3A",
          label: "Prêt à Continuer",
          response: "Excellent ! Passons à la prochaine étape ensemble.",
          next: "fin",
          type: "positive"
        },
        {
          id: "3B",
          label: "Besoin de Réflexion",
          response: "Je comprends parfaitement. Prenons le temps nécessaire pour que tu sois totalement à l'aise avec ta décision.",
          next: "fin",
          type: "neutral"
        }
      ]
    }
};