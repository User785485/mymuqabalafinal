/// Data model for a single Blink Date round.
///
/// Maps to the `blink_dates` table in Supabase. Each match can have
/// multiple rounds, each lasting [dureeSecondes] seconds.
///
/// The [sujetsPoposes] field is stored as JSONB in the database and
/// contains conversation prompts suggested for this round.
///
/// Partner fields ([partnerId], [partnerPrenom], [partnerPhotoFloueUrl])
/// are populated when loaded via the `get_user_blink_dates_for_event` RPC.
library;

/// A single Blink Date round associated with a match.
class BlinkDateModel {
  const BlinkDateModel({
    required this.id,
    required this.matchId,
    this.eventId,
    required this.ordre,
    required this.dureeSecondes,
    required this.statut,
    required this.sujetsPoposes,
    this.enregistrementUrl,
    required this.createdAt,
    this.partnerId,
    this.partnerPrenom,
    this.partnerPhotoFloueUrl,
    this.roomName,
  });

  /// Unique identifier (UUID).
  final String id;

  /// Reference to the parent match.
  final String matchId;

  /// Optional reference to a Blink Date event.
  final String? eventId;

  /// Round number within this match (1, 2, or 3).
  final int ordre;

  /// Duration of the call in seconds (default: 600 = 10 minutes).
  final int dureeSecondes;

  /// Current status: 'planifie', 'en_cours', 'termine', 'annule'.
  final String statut;

  /// Conversation prompts / topics suggested for this round.
  final List<String> sujetsPoposes;

  /// Optional URL to the recorded audio.
  final String? enregistrementUrl;

  /// Timestamp when this Blink Date was created.
  final DateTime createdAt;

  /// Partner user ID (populated from RPC).
  final String? partnerId;

  /// Partner first name (populated from RPC).
  final String? partnerPrenom;

  /// Partner blurred photo URL (populated from RPC).
  final String? partnerPhotoFloueUrl;

  /// Room name for LiveKit (populated from RPC).
  final String? roomName;

  /// Deserialize from a Supabase row (JSON map).
  ///
  /// Handles both direct table rows and RPC-returned objects.
  factory BlinkDateModel.fromJson(Map<String, dynamic> json) {
    // Parse sujets_proposes — can be a JSON array of strings.
    final rawSujets = json['sujets_proposes'];
    final sujets = <String>[];
    if (rawSujets is List) {
      for (final item in rawSujets) {
        if (item is String) {
          sujets.add(item);
        } else {
          sujets.add(item.toString());
        }
      }
    }

    // Support both direct table (id) and RPC format (blink_date_id).
    final id = json['blink_date_id'] as String? ?? json['id'] as String;

    return BlinkDateModel(
      id: id,
      matchId: json['match_id'] as String? ?? '',
      eventId: json['event_id'] as String?,
      ordre: json['ordre'] as int? ?? 1,
      dureeSecondes: json['duree_secondes'] as int? ?? 600,
      statut: json['statut'] as String? ?? 'planifie',
      sujetsPoposes: sujets,
      enregistrementUrl: json['enregistrement_url'] as String?,
      createdAt: json['created_at'] != null
          ? DateTime.parse(json['created_at'] as String)
          : DateTime.now(),
      partnerId: json['partner_id'] as String?,
      partnerPrenom: json['partner_prenom'] as String?,
      partnerPhotoFloueUrl: json['partner_photo_floue_url'] as String?,
      roomName: json['room_name'] as String?,
    );
  }

  /// Serialize to a JSON map suitable for Supabase inserts/updates.
  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'match_id': matchId,
      if (eventId != null) 'event_id': eventId,
      'ordre': ordre,
      'duree_secondes': dureeSecondes,
      'statut': statut,
      'sujets_proposes': sujetsPoposes,
      if (enregistrementUrl != null) 'enregistrement_url': enregistrementUrl,
      'created_at': createdAt.toIso8601String(),
    };
  }

  /// Create a copy with selected fields overridden.
  BlinkDateModel copyWith({
    String? id,
    String? matchId,
    String? eventId,
    int? ordre,
    int? dureeSecondes,
    String? statut,
    List<String>? sujetsPoposes,
    String? enregistrementUrl,
    DateTime? createdAt,
    String? partnerId,
    String? partnerPrenom,
    String? partnerPhotoFloueUrl,
    String? roomName,
  }) {
    return BlinkDateModel(
      id: id ?? this.id,
      matchId: matchId ?? this.matchId,
      eventId: eventId ?? this.eventId,
      ordre: ordre ?? this.ordre,
      dureeSecondes: dureeSecondes ?? this.dureeSecondes,
      statut: statut ?? this.statut,
      sujetsPoposes: sujetsPoposes ?? this.sujetsPoposes,
      enregistrementUrl: enregistrementUrl ?? this.enregistrementUrl,
      createdAt: createdAt ?? this.createdAt,
      partnerId: partnerId ?? this.partnerId,
      partnerPrenom: partnerPrenom ?? this.partnerPrenom,
      partnerPhotoFloueUrl: partnerPhotoFloueUrl ?? this.partnerPhotoFloueUrl,
      roomName: roomName ?? this.roomName,
    );
  }

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is BlinkDateModel &&
          runtimeType == other.runtimeType &&
          id == other.id;

  @override
  int get hashCode => id.hashCode;

  @override
  String toString() =>
      'BlinkDateModel(id: $id, matchId: $matchId, '
      'ordre: $ordre, statut: $statut)';
}
