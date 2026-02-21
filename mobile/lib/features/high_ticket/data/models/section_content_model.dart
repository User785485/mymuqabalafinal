/// Model for high-ticket section content items.
///
/// Maps to the `section_content` table (V1 web) accessed via
/// migration bridge RPCs or direct queries.
library;

class SectionContentModel {
  const SectionContentModel({
    required this.id,
    required this.clientCode,
    required this.section,
    required this.contentKey,
    this.titre,
    this.contenuHtml,
    this.url,
    this.isCompleted = false,
    this.metadata = const {},
    this.updatedAt,
  });

  final String id;
  final String clientCode;
  final String section;
  final String contentKey;
  final String? titre;
  final String? contenuHtml;
  final String? url;
  final bool isCompleted;
  final Map<String, dynamic> metadata;
  final DateTime? updatedAt;

  factory SectionContentModel.fromJson(Map<String, dynamic> json) {
    return SectionContentModel(
      id: json['id'] as String? ?? '',
      clientCode: json['client_id'] as String? ?? '',
      section: json['section_key'] as String? ?? '',
      contentKey: json['section_key'] as String? ?? '',
      titre: json['titre'] as String?,
      contenuHtml: json['contenu_html'] as String?,
      url: json['url'] as String?,
      isCompleted: json['is_completed'] as bool? ?? false,
      metadata: (json['metadata'] as Map<String, dynamic>?) ?? const {},
      updatedAt: json['updated_at'] != null
          ? DateTime.tryParse(json['updated_at'] as String)
          : null,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'client_id': clientCode,
      'section_key': section,
      'content_key': section,
      'titre': titre,
      'contenu_html': contenuHtml,
      'url': url,
      'is_completed': isCompleted,
      'metadata': metadata,
      'updated_at': updatedAt?.toIso8601String(),
    };
  }

  SectionContentModel copyWith({
    String? id,
    String? clientCode,
    String? section,
    String? contentKey,
    String? titre,
    String? contenuHtml,
    String? url,
    bool? isCompleted,
    Map<String, dynamic>? metadata,
    DateTime? updatedAt,
  }) {
    return SectionContentModel(
      id: id ?? this.id,
      clientCode: clientCode ?? this.clientCode,
      section: section ?? this.section,
      contentKey: contentKey ?? this.contentKey,
      titre: titre ?? this.titre,
      contenuHtml: contenuHtml ?? this.contenuHtml,
      url: url ?? this.url,
      isCompleted: isCompleted ?? this.isCompleted,
      metadata: metadata ?? this.metadata,
      updatedAt: updatedAt ?? this.updatedAt,
    );
  }
}
