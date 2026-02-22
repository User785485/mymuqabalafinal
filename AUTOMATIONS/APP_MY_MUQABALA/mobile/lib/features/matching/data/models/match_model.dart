/// Data model for a match between two users.
///
/// Maps to the `matches` table in Supabase. Each match links two users
/// with a compatibility score and progresses through several statuses
/// from initial proposal to final outcome.
///
/// The [analyseCompatibilite] field is stored as JSONB in the database
/// and contains detailed compatibility analysis data.
library;

/// A match pairing two users in the My Muqabala process.
class MatchModel {
  const MatchModel({
    required this.id,
    required this.user1Id,
    required this.user2Id,
    this.eventId,
    required this.scoreCompatibilite,
    required this.statut,
    this.analyseCompatibilite,
    this.notesCoach,
    required this.createdAt,
  });

  /// Unique identifier (UUID).
  final String id;

  /// First user in the match pairing.
  final String user1Id;

  /// Second user in the match pairing.
  final String user2Id;

  /// Optional reference to the event where this match originated.
  final String? eventId;

  /// Compatibility score between 0.0 and 1.0.
  final double scoreCompatibilite;

  /// Current status of the match progression.
  ///
  /// Possible values:
  /// - `propose` : initially proposed by the algorithm
  /// - `valide_coach` : validated by the coach
  /// - `confirme_mutuel` : confirmed by both users
  /// - `phase_2` : discovery phase (messaging)
  /// - `phase_3` : deeper phase
  /// - `phase_4` : engagement phase
  /// - `termine_positif` : ended positively
  /// - `termine_negatif` : ended negatively
  /// - `annule` : cancelled
  final String statut;

  /// Detailed compatibility analysis stored as JSONB.
  final Map<String, dynamic>? analyseCompatibilite;

  /// Notes from the coach regarding this match.
  final String? notesCoach;

  /// Timestamp when this match was created.
  final DateTime createdAt;

  /// Deserialize from a Supabase row (JSON map).
  factory MatchModel.fromJson(Map<String, dynamic> json) {
    final rawScore = json['score_compatibilite'];
    double score;
    if (rawScore is num) {
      score = rawScore.toDouble();
    } else if (rawScore is String) {
      score = double.tryParse(rawScore) ?? 0.0;
    } else {
      score = 0.0;
    }

    final rawAnalyse = json['analyse_compatibilite'];
    Map<String, dynamic>? analyse;
    if (rawAnalyse is Map<String, dynamic>) {
      analyse = rawAnalyse;
    } else if (rawAnalyse is Map) {
      analyse = Map<String, dynamic>.from(rawAnalyse);
    }

    return MatchModel(
      id: json['id'] as String,
      user1Id: json['user_1_id'] as String,
      user2Id: json['user_2_id'] as String,
      eventId: json['event_id'] as String?,
      scoreCompatibilite: score,
      statut: json['statut'] as String? ?? 'propose',
      analyseCompatibilite: analyse,
      notesCoach: json['notes_coach'] as String?,
      createdAt: json['created_at'] != null
          ? DateTime.parse(json['created_at'] as String)
          : DateTime.now(),
    );
  }

  /// Serialize to a JSON map suitable for Supabase inserts/updates.
  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'user_1_id': user1Id,
      'user_2_id': user2Id,
      if (eventId != null) 'event_id': eventId,
      'score_compatibilite': scoreCompatibilite,
      'statut': statut,
      if (analyseCompatibilite != null)
        'analyse_compatibilite': analyseCompatibilite,
      if (notesCoach != null) 'notes_coach': notesCoach,
      'created_at': createdAt.toIso8601String(),
    };
  }

  /// Human-readable French label for the current [statut].
  String get statutLabel => switch (statut) {
        'propose' => 'Propos\u00e9',
        'valide_coach' => 'Valid\u00e9 par le coach',
        'confirme_mutuel' => 'Confirm\u00e9 mutuellement',
        'phase_2' => 'Phase d\u00e9couverte',
        'phase_3' => 'Phase approfondie',
        'phase_4' => 'Phase engagement',
        'termine_positif' => 'Termin\u00e9 positivement',
        'termine_negatif' => 'Termin\u00e9',
        'annule' => 'Annul\u00e9',
        _ => statut,
      };

  /// Returns the compatibility score as a percentage integer (0-100).
  int get scorePercent => (scoreCompatibilite * 100).round();

  /// Create a copy with selected fields overridden.
  MatchModel copyWith({
    String? id,
    String? user1Id,
    String? user2Id,
    String? eventId,
    double? scoreCompatibilite,
    String? statut,
    Map<String, dynamic>? analyseCompatibilite,
    String? notesCoach,
    DateTime? createdAt,
  }) {
    return MatchModel(
      id: id ?? this.id,
      user1Id: user1Id ?? this.user1Id,
      user2Id: user2Id ?? this.user2Id,
      eventId: eventId ?? this.eventId,
      scoreCompatibilite: scoreCompatibilite ?? this.scoreCompatibilite,
      statut: statut ?? this.statut,
      analyseCompatibilite: analyseCompatibilite ?? this.analyseCompatibilite,
      notesCoach: notesCoach ?? this.notesCoach,
      createdAt: createdAt ?? this.createdAt,
    );
  }

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is MatchModel &&
          runtimeType == other.runtimeType &&
          id == other.id;

  @override
  int get hashCode => id.hashCode;

  @override
  String toString() =>
      'MatchModel(id: $id, user1: $user1Id, user2: $user2Id, '
      'score: $scoreCompatibilite, statut: $statut)';
}
