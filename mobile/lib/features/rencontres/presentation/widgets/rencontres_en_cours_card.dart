/// Card showing active encounter with mini weekly indicator for the Hub.
///
/// Reuses [MatchCardWidget] for the main display, and adds a subtle
/// indicator for the latest weekly feedback status.
library;

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import 'package:my_muqabala/core/constants/app_colors.dart';
import 'package:my_muqabala/core/constants/app_spacing.dart';
import 'package:my_muqabala/core/constants/app_typography.dart';
import 'package:my_muqabala/core/router/route_names.dart';
import 'package:my_muqabala/features/home/presentation/widgets/match_card_widget.dart';
import 'package:my_muqabala/features/rencontres/presentation/providers/rencontres_provider.dart';

class RencontresEnCoursCard extends ConsumerWidget {
  const RencontresEnCoursCard({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final retoursAsync = ref.watch(retoursHebdoProvider);

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const MatchCardWidget(),
        retoursAsync.when(
          loading: () => const SizedBox.shrink(),
          error: (_, __) => const SizedBox.shrink(),
          data: (retours) {
            if (retours.isEmpty) return const SizedBox.shrink();

            final latest = retours.first;
            return Padding(
              padding: const EdgeInsets.only(top: AppSpacing.sm),
              child: GestureDetector(
                onTap: () =>
                    context.pushNamed(RouteNames.rencontresEnCours),
                child: Container(
                  width: double.infinity,
                  padding: const EdgeInsets.symmetric(
                    horizontal: AppSpacing.md,
                    vertical: AppSpacing.sm,
                  ),
                  decoration: BoxDecoration(
                    color: isDark ? AppColors.darkCard : AppColors.surface,
                    borderRadius: AppRadius.borderMd,
                    border: Border.all(
                      color: isDark ? AppColors.darkBorder : AppColors.divider,
                    ),
                  ),
                  child: Row(
                    children: [
                      Icon(
                        latest.isRedige
                            ? Icons.check_circle_rounded
                            : Icons.pending_rounded,
                        size: 16,
                        color: latest.isRedige
                            ? AppColors.sage
                            : AppColors.gold,
                      ),
                      const SizedBox(width: 8),
                      Text(
                        'Semaine ${latest.semaineNumero} — ${latest.statutLabel}',
                        style: AppTypography.bodySmall.copyWith(
                          color: isDark
                              ? AppColors.darkInkMuted
                              : AppColors.inkMuted,
                        ),
                      ),
                      const Spacer(),
                      Icon(
                        Icons.chevron_right_rounded,
                        size: 18,
                        color: isDark
                            ? AppColors.darkInkMuted
                            : AppColors.inkMuted,
                      ),
                    ],
                  ),
                ),
              ),
            );
          },
        ),
      ],
    );
  }
}
