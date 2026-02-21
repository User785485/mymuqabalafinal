/// Model for a formulaire exploratoire item.
///
/// Wraps [SectionContentModel] with formulaire-specific helpers
/// (group resolution, ordering).
library;

import 'package:my_muqabala/features/high_ticket/data/models/section_content_model.dart';

/// Groups for formulaire classification.
enum FormulaireGroup {
  scenarios,
  phase1,
  phase2,
  phase3,
  phase4,
  express,
}

class FormulaireModel {
  const FormulaireModel({
    required this.content,
    required this.group,
    required this.displayTitle,
  });

  final SectionContentModel content;
  final FormulaireGroup group;
  final String displayTitle;

  String get id => content.id;
  bool get isCompleted => content.isCompleted;
  String? get url => content.url;
  String? get contenuHtml => content.contenuHtml;

  /// Parses a [SectionContentModel] into a [FormulaireModel].
  factory FormulaireModel.fromContent(SectionContentModel c) {
    final key = c.contentKey.toUpperCase();
    FormulaireGroup group;

    if (key.startsWith('S')) {
      group = FormulaireGroup.scenarios;
    } else if (key.startsWith('F1')) {
      group = FormulaireGroup.phase1;
    } else if (key.startsWith('F2')) {
      group = FormulaireGroup.phase2;
    } else if (key.startsWith('F3')) {
      group = FormulaireGroup.phase3;
    } else if (key.startsWith('F4')) {
      group = FormulaireGroup.phase4;
    } else {
      group = FormulaireGroup.express;
    }

    return FormulaireModel(
      content: c,
      group: group,
      displayTitle: c.titre ?? c.contentKey,
    );
  }

  /// Human-readable group label.
  static String groupLabel(FormulaireGroup group) {
    return switch (group) {
      FormulaireGroup.scenarios => 'Sc\u00e9narios (S1\u2013S10)',
      FormulaireGroup.phase1 => 'Phase 1 (F1.1\u2013F1.3)',
      FormulaireGroup.phase2 => 'Phase 2 (F2.1\u2013F2.3)',
      FormulaireGroup.phase3 => 'Phase 3 (F3.1\u2013F3.3)',
      FormulaireGroup.phase4 => 'Phase 4 (F4.1\u2013F4.3)',
      FormulaireGroup.express => 'Express',
    };
  }
}
