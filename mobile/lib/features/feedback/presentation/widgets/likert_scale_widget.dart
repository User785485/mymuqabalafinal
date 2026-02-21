/// A 5-point Likert scale input widget.
///
/// Displays five selectable circles labelled 1-5 with textual anchors at
/// the extremes ("Pas du tout" and "\u00c9norm\u00e9ment").
library;

import 'package:flutter/material.dart';

import 'package:my_muqabala/core/constants/app_colors.dart';
import 'package:my_muqabala/core/constants/app_spacing.dart';
import 'package:my_muqabala/core/constants/app_typography.dart';

/// A 5-point Likert scale selector.
class LikertScaleWidget extends StatelessWidget {
  const LikertScaleWidget({
    required this.value,
    required this.onChanged,
    super.key,
  });

  /// Currently selected point (1-5), or `null`.
  final int? value;

  /// Called with the tapped point (1-5).
  final ValueChanged<int> onChanged;

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        // ── Scale circles ──────────────────────────────────────────────
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: List.generate(5, (index) {
            final point = index + 1;
            final isSelected = value == point;

            return GestureDetector(
              onTap: () => onChanged(point),
              behavior: HitTestBehavior.opaque,
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  AnimatedContainer(
                    duration: const Duration(milliseconds: 200),
                    curve: Curves.easeOut,
                    width: 52,
                    height: 52,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      color: isSelected
                          ? AppColors.violet
                          : AppColors.surface,
                      border: Border.all(
                        color: isSelected
                            ? AppColors.violet
                            : AppColors.border,
                        width: isSelected ? 2.5 : 1.5,
                      ),
                      boxShadow: isSelected
                          ? [
                              BoxShadow(
                                color:
                                    AppColors.violet.withValues(alpha: 0.25),
                                blurRadius: 10,
                                offset: const Offset(0, 3),
                              ),
                            ]
                          : null,
                    ),
                    alignment: Alignment.center,
                    child: Text(
                      '$point',
                      style: AppTypography.label.copyWith(
                        fontSize: 18,
                        color: isSelected
                            ? AppColors.surface
                            : AppColors.ink,
                      ),
                    ),
                  ),
                ],
              ),
            );
          }),
        ),

        AppSpacing.verticalMd,

        // ── Extreme labels ─────────────────────────────────────────────
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              'Pas du tout',
              style: AppTypography.caption.copyWith(
                color: AppColors.inkMuted,
              ),
            ),
            Text(
              '\u00c9norm\u00e9ment',
              style: AppTypography.caption.copyWith(
                color: AppColors.inkMuted,
              ),
            ),
          ],
        ),
      ],
    );
  }
}
