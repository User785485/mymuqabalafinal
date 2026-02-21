/// Model for a ressource p\u00e9dagogique item.
library;

import 'package:my_muqabala/features/high_ticket/data/models/section_content_model.dart';

/// Category of ressource.
enum RessourceCategory {
  programme48,
  ramadan,
}

class RessourceModel {
  const RessourceModel({
    required this.content,
    required this.category,
    required this.displayTitle,
    this.duration,
  });

  final SectionContentModel content;
  final RessourceCategory category;
  final String displayTitle;
  final String? duration;

  String get id => content.id;
  String get weekId => content.contentKey;
  bool get isCompleted => content.isCompleted;
  String? get contenuHtml => content.contenuHtml;

  factory RessourceModel.fromContent(SectionContentModel c) {
    final key = c.contentKey.toLowerCase();
    final category = key.startsWith('ramadan')
        ? RessourceCategory.ramadan
        : RessourceCategory.programme48;

    final duration = c.metadata['duration'] as String?;

    return RessourceModel(
      content: c,
      category: category,
      displayTitle: c.titre ?? c.contentKey,
      duration: duration,
    );
  }
}
