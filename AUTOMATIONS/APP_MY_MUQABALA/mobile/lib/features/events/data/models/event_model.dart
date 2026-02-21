/// Data model for events fetched from the `events` Supabase table.
///
/// Maps snake_case database columns to camelCase Dart properties.
/// No Freezed — manual `fromJson` factory.
///
/// ```dart
/// final event = EventModel.fromJson(row);
/// print(event.typeLabel); // 'Coaching de groupe'
/// print(event.typeColor); // AppColors.info
/// ```
library;

import 'package:flutter/material.dart';

import 'package:my_muqabala/core/constants/app_colors.dart';

/// Represents an event in the My Muqabala system.
///
/// Event types:
///   - `matching`        — Matching sessions
///   - `coaching_groupe` — Group coaching / webinar
///   - `blink_date`      — Blink Date speed-meeting
///
/// Statuses:
///   - `planifie` — Scheduled, not yet started
///   - `en_cours` — Currently running
///   - `termine`  — Completed
///   - `annule`   — Cancelled
class EventModel {
  EventModel({
    required this.id,
    required this.titre,
    this.description,
    required this.typeEvenement,
    required this.dateEvenement,
    this.lieu,
    this.config,
    required this.statut,
    required this.createdAt,
  });

  /// Unique identifier (UUID).
  final String id;

  /// Event title displayed to users.
  final String titre;

  /// Optional longer description / body text.
  final String? description;

  /// Type discriminator: `matching`, `coaching_groupe`, or `blink_date`.
  final String typeEvenement;

  /// When the event takes place.
  final DateTime dateEvenement;

  /// Optional physical or virtual location.
  final String? lieu;

  /// Arbitrary JSON configuration (e.g. `webinarjam_url` for coaching).
  final Map<String, dynamic>? config;

  /// Lifecycle status: `planifie`, `en_cours`, `termine`, or `annule`.
  final String statut;

  /// Row creation timestamp.
  final DateTime createdAt;

  // ── Factory ──────────────────────────────────────────────────────────────

  /// Creates an [EventModel] from a Supabase JSON row.
  ///
  /// Maps `type`, `date_evenement`, and `created_at` from
  /// the database snake_case naming convention.
  factory EventModel.fromJson(Map<String, dynamic> json) {
    return EventModel(
      id: json['id'] as String,
      titre: json['titre'] as String? ?? '',
      description: json['description'] as String?,
      typeEvenement: json['type'] as String? ?? 'matching',
      dateEvenement: DateTime.parse(json['date_evenement'] as String),
      lieu: json['lieu'] as String?,
      config: json['config'] != null
          ? Map<String, dynamic>.from(json['config'] as Map)
          : null,
      statut: json['statut'] as String? ?? 'planifie',
      createdAt: DateTime.parse(json['created_at'] as String),
    );
  }

  // ── Computed properties ──────────────────────────────────────────────────

  /// Human-readable label for [typeEvenement].
  String get typeLabel => switch (typeEvenement) {
        'matching' => 'Matching',
        'coaching_groupe' => 'Coaching de groupe',
        'blink_date' => 'Blink Date',
        _ => typeEvenement,
      };

  /// Design-system color associated with [typeEvenement].
  Color get typeColor => switch (typeEvenement) {
        'matching' => AppColors.violet,
        'coaching_groupe' => AppColors.info,
        'blink_date' => AppColors.rose,
        _ => AppColors.inkMuted,
      };

  /// Light background tint for the type badge.
  Color get typeBgColor => switch (typeEvenement) {
        'matching' => AppColors.violetLight,
        'coaching_groupe' => AppColors.infoLight,
        'blink_date' => AppColors.roseLight,
        _ => AppColors.divider,
      };

  /// Whether the event is in the future and not cancelled.
  bool get isUpcoming =>
      dateEvenement.isAfter(DateTime.now()) && statut != 'annule';

  /// Human-readable label for [statut].
  String get statutLabel => switch (statut) {
        'planifie' => 'Planifié',
        'en_cours' => 'En cours',
        'termine' => 'Terminé',
        'annule' => 'Annulé',
        _ => statut,
      };

  @override
  String toString() => 'EventModel(id: $id, titre: $titre, '
      'type: $typeEvenement, date: $dateEvenement, statut: $statut)';
}
