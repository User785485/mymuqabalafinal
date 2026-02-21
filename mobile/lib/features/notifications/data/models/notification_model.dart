/// Data model for in-app notifications.
///
/// Maps the `notifications` Supabase table to a Dart object.
/// Each notification has a [type] that determines its icon, color, and
/// background color for consistent visual treatment in the UI.
///
/// ```dart
/// final notif = NotificationModel.fromJson(row);
/// print(notif.typeIcon);   // Icons.favorite_outline
/// print(notif.typeColor);  // AppColors.rose
/// ```
library;

import 'package:flutter/material.dart';

import 'package:my_muqabala/core/constants/app_colors.dart';

/// Represents a single in-app notification stored in the `notifications` table.
class NotificationModel {
  /// Creates a [NotificationModel] with all required fields.
  NotificationModel({
    required this.id,
    required this.userId,
    required this.type,
    required this.titre,
    required this.message,
    required this.data,
    required this.isRead,
    required this.createdAt,
  });

  /// Deserializes a Supabase row (snake_case JSON) into a [NotificationModel].
  ///
  /// Handles nullable `data` column gracefully by defaulting to an empty map.
  factory NotificationModel.fromJson(Map<String, dynamic> json) {
    return NotificationModel(
      id: json['id'] as String,
      userId: json['user_id'] as String,
      type: json['type'] as String,
      titre: json['titre'] as String,
      message: json['corps'] as String,
      data: json['data'] != null
          ? Map<String, dynamic>.from(json['data'] as Map)
          : <String, dynamic>{},
      isRead: json['is_read'] as bool? ?? false,
      createdAt: DateTime.parse(json['created_at'] as String),
    );
  }

  /// Unique identifier (UUID).
  final String id;

  /// The user this notification belongs to.
  final String userId;

  /// Notification type. One of:
  /// - `match_proposee`
  /// - `blink_date_scheduled`
  /// - `document_published`
  /// - `reminder`
  /// - `message`
  /// - `coach_feedback`
  final String type;

  /// Short title displayed prominently on the notification tile.
  final String titre;

  /// Longer description displayed as the subtitle.
  final String message;

  /// Arbitrary JSON payload. May contain `route_path` for deep-link navigation.
  final Map<String, dynamic> data;

  /// Whether the user has already seen / tapped this notification.
  final bool isRead;

  /// Server timestamp of when this notification was created.
  final DateTime createdAt;

  // ── Type-based visual properties ──────────────────────────────────────────

  /// Icon representing the notification type.
  IconData get typeIcon => switch (type) {
        'match_proposee' => Icons.favorite_outline,
        'blink_date_scheduled' => Icons.mic_outlined,
        'document_published' => Icons.description_outlined,
        'reminder' => Icons.notifications_active_outlined,
        'message' => Icons.chat_bubble_outline,
        'coach_feedback' => Icons.school_outlined,
        _ => Icons.notifications_outlined,
      };

  /// Foreground color for the notification type icon.
  Color get typeColor => switch (type) {
        'match_proposee' => AppColors.rose,
        'blink_date_scheduled' => AppColors.violet,
        'document_published' => AppColors.info,
        'reminder' => AppColors.warning,
        'message' => AppColors.success,
        'coach_feedback' => AppColors.gold,
        _ => AppColors.inkMuted,
      };

  /// Background tint color for the notification type icon container.
  Color get typeBgColor => switch (type) {
        'match_proposee' => AppColors.roseLight,
        'blink_date_scheduled' => AppColors.violetLight,
        'document_published' => AppColors.infoLight,
        'reminder' => AppColors.warningLight,
        'message' => AppColors.successLight,
        'coach_feedback' => AppColors.goldLight,
        _ => AppColors.paper,
      };

  /// Deep-link route path extracted from [data], if present.
  ///
  /// Used by the UI to navigate to the relevant screen when tapped.
  String? get routePath => data['route_path'] as String?;

  @override
  String toString() =>
      'NotificationModel(id: $id, type: $type, titre: $titre, isRead: $isRead)';
}
