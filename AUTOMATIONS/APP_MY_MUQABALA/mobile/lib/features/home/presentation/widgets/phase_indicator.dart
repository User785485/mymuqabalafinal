/// Compact phase indicator for the home screen.
///
/// Displays a horizontal bar with 4 phases, highlighting the current one.
/// Phases represent the My Muqabala journey: Matching, Découverte,
/// Approfondie, Engagement.
library;

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:shimmer/shimmer.dart';

import 'package:my_muqabala/core/constants/app_colors.dart';
import 'package:my_muqabala/core/constants/app_spacing.dart';
import 'package:my_muqabala/core/constants/app_typography.dart';
import 'package:my_muqabala/features/home/presentation/providers/home_provider.dart';

/// Phase labels (French) for the 4-phase journey.
const _phaseLabels = [
  'Matching',
  'Découverte',
  'Approfondie',
  'Engagement',
];

/// Phase colors for each step.
const _phaseColors = [
  AppColors.purple,
  AppColors.rose,
  AppColors.sage,
  AppColors.gold,
];

/// A compact card showing the user's current phase in the 4-step journey.
///
/// Delegates data fetching to [currentPhaseProvider].
class PhaseIndicator extends ConsumerWidget {
  const PhaseIndicator({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final phaseAsync = ref.watch(currentPhaseProvider);

    return phaseAsync.when(
      data: (phase) => _PhaseProgressBar(currentPhase: phase),
      loading: () => Shimmer.fromColors(
        baseColor: AppColors.divider,
        highlightColor: AppColors.paper,
        child: Container(
          height: 96,
          decoration: BoxDecoration(
            color: AppColors.divider,
            borderRadius: AppRadius.borderLg,
          ),
        ),
      ),
      error: (_, __) => const SizedBox.shrink(),
    );
  }
}

/// The actual progress bar with 4 labeled steps.
class _PhaseProgressBar extends StatelessWidget {
  const _PhaseProgressBar({required this.currentPhase});

  /// Current phase: 0 = not yet started, 1-4 = active phase.
  final int currentPhase;

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: AppSpacing.cardPadding,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // ── Title row ─────────────────────────────────────────────
            Row(
              children: [
                Icon(
                  Icons.route_outlined,
                  size: 20,
                  color: AppColors.purple,
                ),
                AppSpacing.gapHSm,
                Text(
                  'Votre parcours',
                  style: AppTypography.labelLarge.copyWith(
                    color: AppColors.ink,
                  ),
                ),
                const Spacer(),
                if (currentPhase > 0)
                  Container(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 10,
                      vertical: 4,
                    ),
                    decoration: BoxDecoration(
                      color: _phaseColors[currentPhase - 1].withValues(alpha: 0.15),
                      borderRadius: AppRadius.borderCircular,
                    ),
                    child: Text(
                      'Phase $currentPhase/4',
                      style: AppTypography.labelSmall.copyWith(
                        color: _phaseColors[currentPhase - 1],
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ),
              ],
            ),
            AppSpacing.gapMd,

            // ── Progress bar ──────────────────────────────────────────
            Row(
              children: List.generate(4, (index) {
                final phaseIndex = index + 1;
                final isCompleted = phaseIndex < currentPhase;
                final isActive = phaseIndex == currentPhase;
                final color = _phaseColors[index];

                return Expanded(
                  child: Padding(
                    padding: EdgeInsets.only(
                      right: index < 3 ? AppSpacing.xs : 0,
                    ),
                    child: Column(
                      children: [
                        // Bar segment
                        Container(
                          height: 6,
                          decoration: BoxDecoration(
                            color: isCompleted || isActive
                                ? color
                                : AppColors.divider,
                            borderRadius: AppRadius.borderCircular,
                          ),
                          child: isActive
                              ? ClipRRect(
                                  borderRadius: AppRadius.borderCircular,
                                  child: LinearProgressIndicator(
                                    value: 0.5,
                                    backgroundColor: color.withValues(alpha: 0.3),
                                    valueColor: AlwaysStoppedAnimation<Color>(color),
                                    minHeight: 6,
                                  ),
                                )
                              : null,
                        ),
                        AppSpacing.gapXs,

                        // Label
                        Text(
                          _phaseLabels[index],
                          style: AppTypography.labelSmall.copyWith(
                            color: isCompleted || isActive
                                ? color
                                : AppColors.inkFaint,
                            fontWeight: isActive
                                ? FontWeight.w600
                                : FontWeight.w400,
                          ),
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                        ),
                      ],
                    ),
                  ),
                );
              }),
            ),
          ],
        ),
      ),
    );
  }
}
