/// Reusable Quranic verse card widget.
///
/// Displays an Arabic verse, its French translation, and the reference.
/// Styled to match the web dashboard verset-card design.
library;

import 'package:flutter/material.dart';

import 'package:my_muqabala/core/constants/app_colors.dart';
import 'package:my_muqabala/core/constants/app_typography.dart';

class VersetCard extends StatelessWidget {
  const VersetCard({
    required this.arabic,
    required this.translation,
    required this.reference,
    super.key,
  });

  final String arabic;
  final String translation;
  final String reference;

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Container(
      width: double.infinity,
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 24),
      decoration: BoxDecoration(
        color: isDark
            ? AppColors.violet.withValues(alpha: 0.06)
            : AppColors.violet.withValues(alpha: 0.04),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(
          color: AppColors.violet.withValues(alpha: 0.12),
        ),
      ),
      child: Column(
        children: [
          Text(
            arabic,
            style: TextStyle(
              fontFamily: 'Amiri',
              fontSize: 20,
              height: 1.8,
              color: isDark ? AppColors.darkInk : AppColors.ink,
            ),
            textAlign: TextAlign.center,
            textDirection: TextDirection.rtl,
          ),
          const SizedBox(height: 12),
          Text(
            translation,
            style: AppTypography.bodySmall.copyWith(
              color: isDark ? AppColors.darkInkMuted : AppColors.inkMuted,
              fontStyle: FontStyle.italic,
              fontSize: 13,
              height: 1.5,
            ),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 8),
          Text(
            reference,
            style: AppTypography.bodySmall.copyWith(
              color: AppColors.violet,
              fontWeight: FontWeight.w600,
              fontSize: 11,
            ),
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }
}

/// Pre-defined verses used across the app, sourced from the web version.
class AppVersets {
  AppVersets._();

  static const accueil = VersetCard(
    arabic: '\u0623\u064e\u0644\u064e\u0627 \u0628\u0650\u0630\u0650\u0643\u0652\u0631\u0650 \u0627\u0644\u0644\u0651\u064e\u0647\u0650 \u062a\u064e\u0637\u0652\u0645\u064e\u0626\u0650\u0646\u0651\u064f \u0627\u0644\u0652\u0642\u064f\u0644\u064f\u0648\u0628\u064f',
    translation:
        '\u00abN\u2019est-ce point par le rappel d\u2019Allah que se tranquillisent les c\u0153urs\u00a0?\u00bb',
    reference: 'Sourate Ar-Ra\u2019d, 13:28',
  );

  static const formulaires = VersetCard(
    arabic:
        '\u0648\u064e\u0646\u064e\u0641\u0652\u0633\u064d \u0648\u064e\u0645\u064e\u0627 \u0633\u064e\u0648\u0651\u064e\u0627\u0647\u064e\u0627 \u0641\u064e\u0623\u064e\u0644\u0652\u0647\u064e\u0645\u064e\u0647\u064e\u0627 \u0641\u064f\u062c\u064f\u0648\u0631\u064e\u0647\u064e\u0627 \u0648\u064e\u062a\u064e\u0642\u0652\u0648\u064e\u0627\u0647\u064e\u0627',
    translation:
        '\u00abPar l\u2019\u00e2me et Celui qui l\u2019a harmonieusement fa\u00e7onn\u00e9e, et lui a alors inspir\u00e9 son immoralit\u00e9, de m\u00eame que sa pi\u00e9t\u00e9.\u00bb',
    reference: 'Sourate Ash-Shams, 91:7-8',
  );

  static const compatibilite = VersetCard(
    arabic:
        '\u0648\u064e\u0645\u0650\u0646\u0652 \u0622\u064a\u064e\u0627\u062a\u0650\u0647\u0650 \u0623\u064e\u0646\u0652 \u062e\u064e\u0644\u064e\u0642\u064e \u0644\u064e\u0643\u064f\u0645 \u0645\u0651\u0650\u0646\u0652 \u0623\u064e\u0646\u0641\u064f\u0633\u0650\u0643\u064f\u0645\u0652 \u0623\u064e\u0632\u0652\u0648\u064e\u0627\u062c\u064b\u0627 \u0644\u0651\u0650\u062a\u064e\u0633\u0652\u0643\u064f\u0646\u064f\u0648\u0627 \u0625\u0650\u0644\u064e\u064a\u0652\u0647\u064e\u0627 \u0648\u064e\u062c\u064e\u0639\u064e\u0644\u064e \u0628\u064e\u064a\u0652\u0646\u064e\u0643\u064f\u0645 \u0645\u0651\u064e\u0648\u064e\u062f\u0651\u064e\u0629\u064b \u0648\u064e\u0631\u064e\u062d\u0652\u0645\u064e\u0629\u064b',
    translation:
        '\u00abEt parmi Ses signes, Il a cr\u00e9\u00e9 de vous, pour vous, des \u00e9pouses pour que vous viviez en tranquillit\u00e9 avec elles et Il a mis entre vous de l\u2019affection et de la bont\u00e9.\u00bb',
    reference: 'Sourate Ar-Rum, 30:21',
  );

  static const rencontres = VersetCard(
    arabic:
        '\u0648\u064e\u062a\u064e\u0639\u064e\u0627\u0648\u064e\u0646\u064f\u0648\u0627 \u0639\u064e\u0644\u064e\u0649 \u0627\u0644\u0652\u0628\u0650\u0631\u0651\u0650 \u0648\u064e\u0627\u0644\u062a\u0651\u064e\u0642\u0652\u0648\u064e\u0649\u0670',
    translation:
        '\u00abEntraidez-vous dans l\u2019accomplissement des bonnes \u0153uvres et de la pi\u00e9t\u00e9.\u00bb',
    reference: 'Sourate Al-Ma\u2019idah, 5:2',
  );

  static const historique = VersetCard(
    arabic:
        '\u0641\u064e\u0625\u0650\u0646\u0651\u064e \u0645\u064e\u0639\u064e \u0627\u0644\u0652\u0639\u064f\u0633\u0652\u0631\u0650 \u064a\u064f\u0633\u0652\u0631\u064b\u0627 \u0625\u0650\u0646\u0651\u064e \u0645\u064e\u0639\u064e \u0627\u0644\u0652\u0639\u064f\u0633\u0652\u0631\u0650 \u064a\u064f\u0633\u0652\u0631\u064b\u0627',
    translation:
        '\u00ab\u00c0 c\u00f4t\u00e9 de la difficult\u00e9 est, certes, une facilit\u00e9\u00a0! \u00c0 c\u00f4t\u00e9 de la difficult\u00e9 est, certes, une facilit\u00e9\u00a0!\u00bb',
    reference: 'Sourate Ash-Sharh, 94:5-6',
  );
}
