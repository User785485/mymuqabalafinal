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
    this.groupLabel,
    this.isLocked = false,
  });

  final SectionContentModel content;
  final RessourceCategory category;
  final String displayTitle;
  final String? duration;
  final String? groupLabel;
  final bool isLocked;

  String get id => content.id;
  String get weekId => content.contentKey;
  bool get isCompleted => content.isCompleted;
  String? get contenuHtml => content.contenuHtml;

  factory RessourceModel.fromContent(SectionContentModel c) {
    final key = c.contentKey.toLowerCase();

    // Keys: m1w1-m12w4 = programme, r1d1-r4d9 = ramadan
    final category = key.startsWith('r')
        ? RessourceCategory.ramadan
        : RessourceCategory.programme48;

    final duration = c.metadata['duration'] as String?;
    final isLocked = c.metadata['locked'] as bool? ?? false;

    // Build group label from the key
    String? groupLabel;
    if (category == RessourceCategory.programme48) {
      // e.g. m1w1 -> "Mois 1"
      final monthMatch = RegExp(r'^m(\d+)w').firstMatch(key);
      if (monthMatch != null) {
        groupLabel = 'Mois ${monthMatch.group(1)}';
      }
    } else {
      // e.g. r1d1 -> "Semaine 1"
      final weekMatch = RegExp(r'^r(\d+)d').firstMatch(key);
      if (weekMatch != null) {
        groupLabel = 'Semaine ${weekMatch.group(1)}';
      }
    }

    return RessourceModel(
      content: c,
      category: category,
      displayTitle: c.titre ?? c.contentKey,
      duration: duration,
      groupLabel: groupLabel,
      isLocked: isLocked,
    );
  }
}
