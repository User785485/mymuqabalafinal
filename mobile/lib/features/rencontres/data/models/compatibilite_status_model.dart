/// Model for compatibility search status.
///
/// Sourced from `section_content` table (key: `compatibilite_form_status`).
library;

import 'package:flutter/material.dart';

/// Represents a single compatibility criterion.
class CompatibiliteCriterion {
  const CompatibiliteCriterion({
    required this.name,
    required this.icon,
    required this.description,
  });

  final String name;
  final IconData icon;
  final String description;
}

/// The four default compatibility criteria.
const defaultCompatibiliteCriteria = [
  CompatibiliteCriterion(
    name: 'Compatibilité émotionnelle',
    icon: Icons.favorite_rounded,
    description:
        'Évaluation de la connexion émotionnelle et de la complémentarité affective',
  ),
  CompatibiliteCriterion(
    name: 'Compatibilité spirituelle',
    icon: Icons.auto_awesome_rounded,
    description:
        'Alignement des valeurs spirituelles et de la pratique religieuse',
  ),
  CompatibiliteCriterion(
    name: 'Vision de vie',
    icon: Icons.visibility_rounded,
    description:
        'Convergence des projets de vie, objectifs familiaux et professionnels',
  ),
  CompatibiliteCriterion(
    name: 'Protection des pièges',
    icon: Icons.shield_rounded,
    description:
        'Identification des schémas relationnels à risque et mécanismes de protection',
  ),
];

/// Status of the compatibility search.
enum CompatibiliteStatus {
  pending,
  searching,
  found;

  factory CompatibiliteStatus.fromString(String? value) => switch (value) {
        'searching' => CompatibiliteStatus.searching,
        'found' => CompatibiliteStatus.found,
        _ => CompatibiliteStatus.pending,
      };
}

/// Full compatibility status model.
class CompatibiliteStatusModel {
  CompatibiliteStatusModel({
    required this.status,
    this.formUrl,
    this.resultData,
  });

  final CompatibiliteStatus status;
  final String? formUrl;
  final Map<String, dynamic>? resultData;

  factory CompatibiliteStatusModel.fromJson(Map<String, dynamic>? json) {
    if (json == null) {
      return CompatibiliteStatusModel(status: CompatibiliteStatus.pending);
    }

    // content_value is a JSONB column returned as Map by PostgREST
    final raw = json['content_value'] ?? json['content'];
    final content = raw is Map<String, dynamic> ? raw : json;
    return CompatibiliteStatusModel(
      status: CompatibiliteStatus.fromString(content['status'] as String?),
      formUrl: content['form_url'] as String?,
      resultData: content['result'] as Map<String, dynamic>?,
    );
  }

  bool get isPending => status == CompatibiliteStatus.pending;
  bool get isSearching => status == CompatibiliteStatus.searching;
  bool get isFound => status == CompatibiliteStatus.found;
}
