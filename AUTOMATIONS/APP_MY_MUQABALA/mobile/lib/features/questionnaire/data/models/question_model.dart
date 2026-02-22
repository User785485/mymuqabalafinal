/// Attachment questionnaire questions (ECR-R adapted for Muslim marriage context).
///
/// Dimensions:
///   - Anxiety (Q1-Q10): fear of abandonment, need for reassurance
///   - Avoidance (Q11-Q20): discomfort with closeness, emotional distance
///
/// Inverse items: {5, 9, 12, 15, 19} — scored as (6 - raw_value)
class AttachmentQuestion {
  const AttachmentQuestion({
    required this.id,
    required this.text,
    required this.dimension,
    this.isInverse = false,
  });

  final int id;
  final String text;
  final String dimension; // 'anxiety' or 'avoidance'
  final bool isInverse;
}

const List<AttachmentQuestion> attachmentQuestions = [
  // ── Dimension Anxiété (Q1-Q10) ──
  AttachmentQuestion(
    id: 1,
    text: "J'ai souvent peur que mon/ma futur(e) conjoint(e) ne veuille pas rester avec moi.",
    dimension: 'anxiety',
  ),
  AttachmentQuestion(
    id: 2,
    text: "J'ai besoin d'être beaucoup rassuré(e) sur le fait que l'on tient à moi.",
    dimension: 'anxiety',
  ),
  AttachmentQuestion(
    id: 3,
    text: "Il m'arrive de penser que je ne suis pas assez bien pour mériter un mariage heureux.",
    dimension: 'anxiety',
  ),
  AttachmentQuestion(
    id: 4,
    text: "Quand quelqu'un de proche ne répond pas rapidement, je m'inquiète de ce que cela signifie.",
    dimension: 'anxiety',
  ),
  AttachmentQuestion(
    id: 5,
    text: "Je me sens serein(e) et en confiance dans mes relations proches.",
    dimension: 'anxiety',
    isInverse: true,
  ),
  AttachmentQuestion(
    id: 6,
    text: "J'ai peur d'être abandonné(e) par les personnes qui comptent pour moi.",
    dimension: 'anxiety',
  ),
  AttachmentQuestion(
    id: 7,
    text: "J'ai parfois l'impression de donner plus que ce que je reçois dans mes relations.",
    dimension: 'anxiety',
  ),
  AttachmentQuestion(
    id: 8,
    text: "Le silence d'un proche me rend anxieux(se) et je cherche à comprendre pourquoi.",
    dimension: 'anxiety',
  ),
  AttachmentQuestion(
    id: 9,
    text: "Je suis confiant(e) que les gens qui m'aiment ne me quitteront pas.",
    dimension: 'anxiety',
    isInverse: true,
  ),
  AttachmentQuestion(
    id: 10,
    text: "J'ai tendance à m'accrocher aux personnes auxquelles je tiens, de peur de les perdre.",
    dimension: 'anxiety',
  ),

  // ── Dimension Évitement (Q11-Q20) ──
  AttachmentQuestion(
    id: 11,
    text: "Je préfère garder mes sentiments pour moi plutôt que de les partager avec mes proches.",
    dimension: 'avoidance',
  ),
  AttachmentQuestion(
    id: 12,
    text: "Je suis à l'aise pour exprimer mes émotions et mes besoins à ceux que j'aime.",
    dimension: 'avoidance',
    isInverse: true,
  ),
  AttachmentQuestion(
    id: 13,
    text: "Je trouve difficile de compter sur les autres, même les personnes les plus proches.",
    dimension: 'avoidance',
  ),
  AttachmentQuestion(
    id: 14,
    text: "L'idée d'une grande proximité émotionnelle dans le mariage me met un peu mal à l'aise.",
    dimension: 'avoidance',
  ),
  AttachmentQuestion(
    id: 15,
    text: "J'apprécie les moments d'intimité émotionnelle et de confidences avec mes proches.",
    dimension: 'avoidance',
    isInverse: true,
  ),
  AttachmentQuestion(
    id: 16,
    text: "Je préfère gérer mes problèmes seul(e), sans solliciter l'aide de mon entourage.",
    dimension: 'avoidance',
  ),
  AttachmentQuestion(
    id: 17,
    text: "Je me sens piégé(e) ou étouffé(e) quand quelqu'un attend trop de proximité émotionnelle.",
    dimension: 'avoidance',
  ),
  AttachmentQuestion(
    id: 18,
    text: "Confier mes faiblesses à quelqu'un, même à mon/ma futur(e) conjoint(e), me semble risqué.",
    dimension: 'avoidance',
  ),
  AttachmentQuestion(
    id: 19,
    text: "Je trouve naturel de demander de l'aide à ma famille ou mes amis quand j'en ai besoin.",
    dimension: 'avoidance',
    isInverse: true,
  ),
  AttachmentQuestion(
    id: 20,
    text: "Je garde souvent mes préoccupations pour moi, même quand quelqu'un veut m'aider.",
    dimension: 'avoidance',
  ),
];

const List<String> likertLabels = [
  "Pas du tout d'accord",
  "Plutôt pas d'accord",
  "Neutre",
  "Plutôt d'accord",
  "Tout à fait d'accord",
];

const Set<int> inverseItems = {5, 9, 12, 15, 19};
