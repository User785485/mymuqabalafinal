/// Predefined feedback questions organised by form type.
///
/// Each form type maps to an ordered list of [FeedbackQuestion] items that
/// drive the Typeform-style paged feedback screen.
library;

/// The kind of answer expected for a feedback question.
enum FeedbackQuestionType {
  /// 1-to-5 star rating.
  stars,

  /// Yes / No / Not sure.
  yesNo,

  /// 5-point Likert scale with labelled extremes.
  likert,

  /// Open-ended multi-line text.
  freeText,
}

/// A single feedback question.
class FeedbackQuestion {
  const FeedbackQuestion({
    required this.id,
    required this.text,
    required this.type,
  });

  /// Unique identifier within the form type (1-based).
  final int id;

  /// The question text displayed to the user.
  final String text;

  /// The expected answer format.
  final FeedbackQuestionType type;
}

/// All available feedback forms keyed by `type_formulaire`.
const Map<String, List<FeedbackQuestion>> feedbackQuestionsByType = {
  // ── Post Blink-Date ─────────────────────────────────────────────────────
  'post_blink_date': [
    FeedbackQuestion(
      id: 1,
      text: 'Comment \u00e9valuez-vous cette conversation ?',
      type: FeedbackQuestionType.stars,
    ),
    FeedbackQuestion(
      id: 2,
      text: 'Souhaitez-vous revoir cette personne ?',
      type: FeedbackQuestionType.yesNo,
    ),
  ],

  // ── Post Audio ──────────────────────────────────────────────────────────
  'post_audio': [
    FeedbackQuestion(
      id: 1,
      text: "Qualit\u00e9 de l'\u00e9change ?",
      type: FeedbackQuestionType.stars,
    ),
    FeedbackQuestion(
      id: 2,
      text: 'Compatibilit\u00e9 ressentie ?',
      type: FeedbackQuestionType.likert,
    ),
    FeedbackQuestion(
      id: 3,
      text: 'Commentaire libre',
      type: FeedbackQuestionType.freeText,
    ),
  ],

  // ── Bilan Hebdomadaire ──────────────────────────────────────────────────
  'bilan_hebdomadaire': [
    FeedbackQuestion(
      id: 1,
      text: 'Comment vous sentez-vous cette semaine ?',
      type: FeedbackQuestionType.likert,
    ),
    FeedbackQuestion(
      id: 2,
      text: 'Avez-vous progress\u00e9 dans vos objectifs ?',
      type: FeedbackQuestionType.yesNo,
    ),
    FeedbackQuestion(
      id: 3,
      text: 'Difficult\u00e9s rencontr\u00e9es ?',
      type: FeedbackQuestionType.freeText,
    ),
    FeedbackQuestion(
      id: 4,
      text: 'Objectif pour la semaine prochaine ?',
      type: FeedbackQuestionType.freeText,
    ),
    FeedbackQuestion(
      id: 5,
      text: 'Commentaire pour le coach ?',
      type: FeedbackQuestionType.freeText,
    ),
  ],

  // ── Bilan Mensuel ───────────────────────────────────────────────────────
  'bilan_mensuel': [
    FeedbackQuestion(
      id: 1,
      text: 'Satisfaction globale ce mois ?',
      type: FeedbackQuestionType.stars,
    ),
    FeedbackQuestion(
      id: 2,
      text: '\u00c9volution de la relation ?',
      type: FeedbackQuestionType.likert,
    ),
    FeedbackQuestion(
      id: 3,
      text: "Qualit\u00e9 de l'accompagnement coach ?",
      type: FeedbackQuestionType.stars,
    ),
    FeedbackQuestion(
      id: 4,
      text: 'Recommanderiez-vous My Muqabala ?',
      type: FeedbackQuestionType.likert,
    ),
    FeedbackQuestion(
      id: 5,
      text: "Axes d'am\u00e9lioration ?",
      type: FeedbackQuestionType.freeText,
    ),
    FeedbackQuestion(
      id: 6,
      text: 'Objectifs pour le mois prochain ?',
      type: FeedbackQuestionType.freeText,
    ),
  ],
};

/// Human-readable title for each form type.
const Map<String, String> feedbackFormTitles = {
  'post_blink_date': 'Retour Blink Date',
  'post_audio': 'Retour appel audio',
  'bilan_hebdomadaire': 'Bilan hebdomadaire',
  'bilan_mensuel': 'Bilan mensuel',
};
