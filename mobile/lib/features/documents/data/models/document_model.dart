/// Data model for a coach document.
///
/// Maps directly to the `coach_documents` Supabase table.
/// Does not use Freezed — all fields are final and manually parsed.
///
/// The 12 document types are:
///   compte_rendu_matching, analyse_compatibilite, preparation_audio,
///   guide_decouverte, bilan_phase, preparation_rencontre, guide_engagement,
///   certificat_fin, contrat_moral, fiche_coaching, ressource_pedagogique,
///   rapport_coach.
library;

import 'package:flutter/material.dart';

/// A document shared by a coach with a user.
class DocumentModel {
  /// Creates a [DocumentModel] with the given fields.
  const DocumentModel({
    required this.id,
    required this.userId,
    required this.typeDocument,
    required this.titre,
    required this.createdAt,
    this.contenuHtml,
    this.contenuUrl,
    this.isRead = false,
    this.publishedAt,
    this.matchId,
  });

  /// Parses a [DocumentModel] from a Supabase JSON row.
  ///
  /// Column names use snake_case in the database:
  ///   `type_document`, `contenu_html`, `contenu_url`, `is_read`,
  ///   `published_at`, `match_id`, `created_at`.
  factory DocumentModel.fromJson(Map<String, dynamic> json) {
    return DocumentModel(
      id: json['id'] as String,
      userId: json['destinataire_id'] as String,
      typeDocument: json['type_document'] as String,
      titre: json['titre'] as String,
      contenuHtml: json['contenu_html'] as String?,
      contenuUrl: json['contenu_url'] as String?,
      isRead: json['is_read'] as bool? ?? false,
      publishedAt: json['published_at'] != null
          ? DateTime.parse(json['published_at'] as String)
          : null,
      matchId: json['match_id'] as String?,
      createdAt: DateTime.parse(json['created_at'] as String),
    );
  }

  // ── Fields ──────────────────────────────────────────────────────────────

  /// Unique identifier (UUID).
  final String id;

  /// The user who owns this document.
  final String userId;

  /// One of the 12 document type slugs (e.g. `compte_rendu_matching`).
  final String typeDocument;

  /// Human-readable title of the document.
  final String titre;

  /// Optional HTML content (inline viewer).
  final String? contenuHtml;

  /// Optional external URL (PDF, Google Doc, etc.).
  final String? contenuUrl;

  /// Whether the user has opened / read this document.
  final bool isRead;

  /// When the coach published (made visible) this document.
  final DateTime? publishedAt;

  /// Optional reference to a match (for match-specific documents).
  final String? matchId;

  /// Row creation timestamp.
  final DateTime createdAt;

  // ── Computed helpers ────────────────────────────────────────────────────

  /// Returns a French human-readable label for [typeDocument].
  String get typeLabel => switch (typeDocument) {
        'compte_rendu_matching' => 'Compte-rendu matching',
        'analyse_compatibilite' => 'Analyse de compatibilit\u00e9',
        'preparation_audio' => 'Pr\u00e9paration audio',
        'guide_decouverte' => 'Guide de d\u00e9couverte',
        'bilan_phase' => 'Bilan de phase',
        'preparation_rencontre' => 'Pr\u00e9paration rencontre',
        'guide_engagement' => 'Guide d\u2019engagement',
        'certificat_fin' => 'Certificat de fin',
        'contrat_moral' => 'Contrat moral',
        'fiche_coaching' => 'Fiche de coaching',
        'ressource_pedagogique' => 'Ressource p\u00e9dagogique',
        'rapport_coach' => 'Rapport du coach',
        _ => typeDocument,
      };

  /// Returns a Material icon appropriate for [typeDocument].
  IconData get typeIcon => switch (typeDocument) {
        'compte_rendu_matching' => Icons.people_outline,
        'analyse_compatibilite' => Icons.analytics_outlined,
        'preparation_audio' => Icons.headphones_outlined,
        'guide_decouverte' => Icons.explore_outlined,
        'bilan_phase' => Icons.assessment_outlined,
        'preparation_rencontre' => Icons.event_outlined,
        'guide_engagement' => Icons.favorite_outline,
        'certificat_fin' => Icons.card_membership_outlined,
        'contrat_moral' => Icons.handshake_outlined,
        'fiche_coaching' => Icons.lightbulb_outline,
        'ressource_pedagogique' => Icons.menu_book_outlined,
        'rapport_coach' => Icons.summarize_outlined,
        _ => Icons.description_outlined,
      };

  /// Returns a semantic color for the document type icon circle.
  Color get typeColor => switch (typeDocument) {
        'compte_rendu_matching' => const Color(0xFF6B46C1), // violet
        'analyse_compatibilite' => const Color(0xFF3B82F6), // info
        'preparation_audio' => const Color(0xFFC9A962), // gold
        'guide_decouverte' => const Color(0xFF7D9A8C), // sage
        'bilan_phase' => const Color(0xFFE8B4B8), // rose
        'preparation_rencontre' => const Color(0xFF6B46C1), // violet
        'guide_engagement' => const Color(0xFFE8B4B8), // rose
        'certificat_fin' => const Color(0xFFC9A962), // gold
        'contrat_moral' => const Color(0xFF7D9A8C), // sage
        'fiche_coaching' => const Color(0xFFF59E0B), // warning / amber
        'ressource_pedagogique' => const Color(0xFF3B82F6), // info
        'rapport_coach' => const Color(0xFF6B46C1), // violet
        _ => const Color(0xFF6B6B6B), // inkMuted
      };

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is DocumentModel &&
          runtimeType == other.runtimeType &&
          id == other.id;

  @override
  int get hashCode => id.hashCode;

  @override
  String toString() =>
      'DocumentModel(id: $id, type: $typeDocument, titre: $titre)';
}
