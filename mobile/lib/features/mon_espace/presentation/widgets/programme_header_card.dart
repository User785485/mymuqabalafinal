/// Gradient header card presenting the coaching programme.
///
/// Shown at the top of Mon Espace for free users.
library;

import 'package:flutter/material.dart';

import 'package:my_muqabala/core/constants/app_colors.dart';
import 'package:my_muqabala/core/constants/app_spacing.dart';
import 'package:my_muqabala/core/constants/app_typography.dart';

class ProgrammeHeaderCard extends StatelessWidget {
  const ProgrammeHeaderCard({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(AppSpacing.lg),
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [AppColors.violet, AppColors.rose],
        ),
        borderRadius: AppRadius.borderLg,
        boxShadow: [
          BoxShadow(
            color: AppColors.violet.withValues(alpha: 0.3),
            blurRadius: 16,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Icon(
            Icons.auto_stories,
            color: Colors.white,
            size: 32,
          ),
          AppSpacing.gapMd,
          Text(
            'Ton programme d\u2019accompagnement',
            style: AppTypography.h2.copyWith(
              color: Colors.white,
              fontSize: 20,
            ),
          ),
          AppSpacing.gapXs,
          Text(
            'Un parcours personnalis\u00e9 pour te guider '
            'vers un mariage \u00e9panouissant, in sha Allah.',
            style: AppTypography.bodyMedium.copyWith(
              color: Colors.white.withValues(alpha: 0.85),
            ),
          ),
        ],
      ),
    );
  }
}
