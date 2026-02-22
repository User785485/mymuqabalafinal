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
  bilanFinal,
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
  String? get titre => content.titre;

  /// Whether this form uses the integrated chat engine (vs external Typebot).
  bool get isChatEngine => content.url?.contains('questionnaire.html') ?? false;

  /// Parses a [SectionContentModel] into a [FormulaireModel].
  factory FormulaireModel.fromContent(SectionContentModel c) {
    final key = c.contentKey.toUpperCase();
    FormulaireGroup group;

    if (key.startsWith('S')) {
      group = FormulaireGroup.scenarios;
    } else if (key == 'F_FINAL') {
      group = FormulaireGroup.bilanFinal;
    } else if (key.startsWith('F1')) {
      group = FormulaireGroup.phase1;
    } else if (key.startsWith('F2')) {
      group = FormulaireGroup.phase2;
    } else if (key.startsWith('F3')) {
      group = FormulaireGroup.phase3;
    } else if (key.startsWith('F4')) {
      group = FormulaireGroup.phase4;
    } else if (key.startsWith('EXP')) {
      group = FormulaireGroup.express;
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
      FormulaireGroup.phase1 => 'Partie 1 \u2014 La Germination (F1.1\u2013F1.6)',
      FormulaireGroup.phase2 => 'Partie 2 \u2014 Les Racines (F2.1\u2013F2.5)',
      FormulaireGroup.phase3 => 'Partie 3 \u2014 Les Patterns (F3.1\u2013F3.4)',
      FormulaireGroup.phase4 => 'Partie 4 \u2014 Les Valeurs (F4.1\u2013F4.3)',
      FormulaireGroup.bilanFinal => 'Partie 5 \u2014 Le Bilan Final',
      FormulaireGroup.express => 'Formulaires Express',
    };
  }
}
