import '../data/models/question_model.dart';

/// Pure Dart attachment scoring — no dependencies.
class AttachmentScorer {
  /// Score a single answer (handles inverse items).
  static int scoreAnswer(int questionId, int rawValue) {
    if (inverseItems.contains(questionId)) {
      return 6 - rawValue;
    }
    return rawValue;
  }

  /// Compute anxiety score (Q1-Q10), returns 1.0-5.0.
  static double anxietyScore(Map<int, int> answers) {
    double sum = 0;
    int count = 0;
    for (int i = 1; i <= 10; i++) {
      if (answers.containsKey(i)) {
        sum += scoreAnswer(i, answers[i]!);
        count++;
      }
    }
    return count > 0 ? sum / count : 3.0;
  }

  /// Compute avoidance score (Q11-Q20), returns 1.0-5.0.
  static double avoidanceScore(Map<int, int> answers) {
    double sum = 0;
    int count = 0;
    for (int i = 11; i <= 20; i++) {
      if (answers.containsKey(i)) {
        sum += scoreAnswer(i, answers[i]!);
        count++;
      }
    }
    return count > 0 ? sum / count : 3.0;
  }

  /// Classify attachment style.
  static String classifyStyle(double anxiety, double avoidance) {
    if (anxiety < 3.0 && avoidance < 3.0) return 'Sécure';
    if (anxiety >= 3.0 && avoidance < 3.0) return 'Anxieux';
    if (anxiety < 3.0 && avoidance >= 3.0) return 'Évitant';
    return 'Craintif'; // anxiety >= 3.0 && avoidance >= 3.0
  }

  /// Get description for attachment style (French).
  static String styleDescription(String style) {
    switch (style) {
      case 'Sécure':
        return 'Vous êtes à l\'aise avec l\'intimité émotionnelle et faites confiance aux autres. '
            'Vous communiquez vos besoins sereinement et ne craignez pas l\'abandon. '
            'Ce style favorise des relations stables et épanouissantes.';
      case 'Anxieux':
        return 'Vous avez un fort besoin de proximité et de réassurance. '
            'Vous pouvez vous inquiéter de l\'engagement de l\'autre et chercher constamment des signes de son attachement. '
            'Comprendre ce schéma vous aidera à construire une relation plus sereine.';
      case 'Évitant':
        return 'Vous valorisez votre indépendance et pouvez être mal à l\'aise avec trop de proximité émotionnelle. '
            'Vous préférez garder une certaine distance et gérer les choses seul(e). '
            'Apprendre à s\'ouvrir progressivement enrichira vos relations.';
      case 'Craintif':
        return 'Vous désirez la proximité mais craignez aussi d\'être blessé(e). '
            'Cela peut créer une ambivalence : vouloir se rapprocher tout en gardant ses distances. '
            'Un accompagnement adapté vous aidera à développer une base de sécurité intérieure.';
      default:
        return '';
    }
  }

  /// Compute compatibility score between two users.
  static double compatibilityScore({
    required double anxietyA,
    required double avoidanceA,
    required double anxietyB,
    required double avoidanceB,
  }) {
    final styleA = classifyStyle(anxietyA, avoidanceA);
    final styleB = classifyStyle(anxietyB, avoidanceB);

    final (minScore, maxScore) = _compatibilityRange(styleA, styleB);

    final gap = (anxietyA - anxietyB).abs() + (avoidanceA - avoidanceB).abs();
    final gapRatio = (gap / 8.0).clamp(0.0, 1.0);

    return maxScore - (gapRatio * (maxScore - minScore));
  }

  static (double, double) _compatibilityRange(String styleA, String styleB) {
    final key = _sortedPairKey(styleA, styleB);
    return switch (key) {
      'Sécure+Sécure' => (85.0, 100.0),
      'Anxieux+Sécure' => (70.0, 85.0),
      'Sécure+Évitant' => (65.0, 80.0),
      'Craintif+Sécure' => (50.0, 70.0),
      'Anxieux+Anxieux' => (40.0, 60.0),
      'Anxieux+Évitant' => (25.0, 45.0),
      'Anxieux+Craintif' => (30.0, 50.0),
      'Évitant+Évitant' => (30.0, 50.0),
      'Craintif+Évitant' => (25.0, 45.0),
      'Craintif+Craintif' => (20.0, 40.0),
      _ => (30.0, 60.0),
    };
  }

  static String _sortedPairKey(String a, String b) {
    final sorted = [a, b]..sort();
    return '${sorted[0]}+${sorted[1]}';
  }
}
