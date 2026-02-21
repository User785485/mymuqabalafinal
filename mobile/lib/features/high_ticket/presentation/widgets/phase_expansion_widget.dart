/// Stylized ExpansionTile for phases with a counter badge.
library;

import 'package:flutter/material.dart';

import 'package:my_muqabala/core/constants/app_colors.dart';
import 'package:my_muqabala/core/constants/app_typography.dart';

class PhaseExpansionWidget extends StatelessWidget {
  const PhaseExpansionWidget({
    required this.title,
    required this.completedCount,
    required this.totalCount,
    required this.children,
    this.initiallyExpanded = false,
    super.key,
  });

  final String title;
  final int completedCount;
  final int totalCount;
  final List<Widget> children;
  final bool initiallyExpanded;

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Card(
      elevation: 0,
      color: isDark ? AppColors.darkSurface : AppColors.surface,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12),
        side: BorderSide(
          color: isDark ? AppColors.darkBorder : AppColors.divider,
        ),
      ),
      clipBehavior: Clip.antiAlias,
      child: ExpansionTile(
        initiallyExpanded: initiallyExpanded,
        tilePadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
        title: Row(
          children: [
            Expanded(
              child: Text(
                title,
                style: AppTypography.label.copyWith(
                  color: isDark ? AppColors.darkInk : AppColors.ink,
                ),
              ),
            ),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
              decoration: BoxDecoration(
                color: completedCount == totalCount && totalCount > 0
                    ? AppColors.success.withValues(alpha: 0.15)
                    : AppColors.violet.withValues(alpha: 0.1),
                borderRadius: BorderRadius.circular(12),
              ),
              child: Text(
                '$completedCount/$totalCount',
                style: AppTypography.bodySmall.copyWith(
                  color: completedCount == totalCount && totalCount > 0
                      ? AppColors.success
                      : AppColors.violet,
                  fontWeight: FontWeight.w600,
                  fontSize: 12,
                ),
              ),
            ),
          ],
        ),
        children: children,
      ),
    );
  }
}
