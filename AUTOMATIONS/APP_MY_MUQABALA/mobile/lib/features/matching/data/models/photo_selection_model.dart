/// Data model for a photo selection entry during the matching process.
///
/// Maps to the `photo_selections` table in Supabase. Each row represents
/// a photo presented to a user ([selecteurId]) for selection. The photo
/// belongs to [photoUserId] and may be a real candidate or a leurre
/// (decoy) used to validate the selection process.
///
/// The table uses `event_id` (not `match_id`) to associate selections
/// with a specific event.
library;

/// A single photo selection entry within an event.
class PhotoSelectionModel {
  const PhotoSelectionModel({
    required this.id,
    required this.eventId,
    required this.selecteurId,
    required this.photoUserId,
    this.photoUrl,
    required this.isLeurre,
    required this.isSelected,
    required this.createdAt,
  });

  /// Unique identifier (UUID).
  final String id;

  /// Reference to the event this selection belongs to.
  final String eventId;

  /// The user performing the selection.
  final String selecteurId;

  /// The user whose photo is being presented.
  final String photoUserId;

  /// URL to the (blurred) photo. Populated by joining with the profiles table.
  final String? photoUrl;

  /// Whether this photo is a decoy (not the real match partner).
  final bool isLeurre;

  /// Whether the selector has chosen this photo.
  final bool isSelected;

  /// Timestamp when this selection entry was created.
  final DateTime createdAt;

  /// Deserialize from a Supabase row (JSON map).
  ///
  /// Supports a nested `profiles` object for the joined photo URL.
  factory PhotoSelectionModel.fromJson(Map<String, dynamic> json) {
    // The photo URL can come from a joined profiles table.
    String? photoUrl;
    final rawProfiles = json['profiles'];
    if (rawProfiles is Map<String, dynamic>) {
      photoUrl = rawProfiles['photo_floue_url'] as String?;
    }
    // Allow direct photo_url field as a fallback.
    photoUrl ??= json['photo_url'] as String?;
    photoUrl ??= json['photo_floue_url'] as String?;

    return PhotoSelectionModel(
      id: json['id'] as String,
      eventId: json['event_id'] as String,
      selecteurId: json['selecteur_id'] as String,
      photoUserId: json['photo_user_id'] as String,
      photoUrl: photoUrl,
      isLeurre: json['is_leurre'] as bool? ?? false,
      isSelected: json['is_selected'] as bool? ?? false,
      createdAt: json['created_at'] != null
          ? DateTime.parse(json['created_at'] as String)
          : DateTime.now(),
    );
  }

  /// Serialize to a JSON map suitable for Supabase inserts/updates.
  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'event_id': eventId,
      'selecteur_id': selecteurId,
      'photo_user_id': photoUserId,
      'is_leurre': isLeurre,
      'is_selected': isSelected,
      'created_at': createdAt.toIso8601String(),
    };
  }

  /// Create a copy with selected fields overridden.
  PhotoSelectionModel copyWith({
    String? id,
    String? eventId,
    String? selecteurId,
    String? photoUserId,
    String? photoUrl,
    bool? isLeurre,
    bool? isSelected,
    DateTime? createdAt,
  }) {
    return PhotoSelectionModel(
      id: id ?? this.id,
      eventId: eventId ?? this.eventId,
      selecteurId: selecteurId ?? this.selecteurId,
      photoUserId: photoUserId ?? this.photoUserId,
      photoUrl: photoUrl ?? this.photoUrl,
      isLeurre: isLeurre ?? this.isLeurre,
      isSelected: isSelected ?? this.isSelected,
      createdAt: createdAt ?? this.createdAt,
    );
  }

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is PhotoSelectionModel &&
          runtimeType == other.runtimeType &&
          id == other.id;

  @override
  int get hashCode => id.hashCode;

  @override
  String toString() =>
      'PhotoSelectionModel(id: $id, eventId: $eventId, '
      'photoUser: $photoUserId, leurre: $isLeurre, selected: $isSelected)';
}
