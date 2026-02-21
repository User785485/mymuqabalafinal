/// Data model representing a submitted feedback form stored in Supabase.
///
/// Maps directly to the `feedback_forms` table with snake_case column names.
library;

/// A feedback form submission.
class FeedbackFormModel {
  const FeedbackFormModel({
    required this.id,
    required this.userId,
    required this.typeFormulaire,
    this.matchId,
    this.eventId,
    required this.reponses,
    this.commentaireCoach,
    required this.createdAt,
  });

  /// Row UUID.
  final String id;

  /// The user who submitted this form.
  final String userId;

  /// Form type key (e.g. `post_blink_date`, `bilan_mensuel`).
  final String typeFormulaire;

  /// Optional reference to the match being reviewed.
  final String? matchId;

  /// Optional reference to the event being reviewed.
  final String? eventId;

  /// Question-id keyed answer map, stored as JSONB in Supabase.
  final Map<String, dynamic> reponses;

  /// Optional coach commentary added after submission.
  final String? commentaireCoach;

  /// Server-side creation timestamp.
  final DateTime createdAt;

  /// Deserialise a row coming from `supabase.from('feedback_forms').select()`.
  factory FeedbackFormModel.fromJson(Map<String, dynamic> json) {
    return FeedbackFormModel(
      id: json['id'] as String,
      userId: json['user_id'] as String,
      typeFormulaire: json['type_formulaire'] as String,
      matchId: json['match_id'] as String?,
      eventId: json['event_id'] as String?,
      reponses: (json['reponses'] as Map<String, dynamic>?) ?? const {},
      commentaireCoach: json['commentaire_coach'] as String?,
      createdAt: DateTime.parse(json['created_at'] as String),
    );
  }

  /// Serialise for insertion into Supabase (excludes `id` and `created_at`
  /// which are server-generated).
  Map<String, dynamic> toInsertJson() {
    return {
      'user_id': userId,
      'type_formulaire': typeFormulaire,
      if (matchId != null) 'match_id': matchId,
      if (eventId != null) 'event_id': eventId,
      'reponses': reponses,
    };
  }
}
