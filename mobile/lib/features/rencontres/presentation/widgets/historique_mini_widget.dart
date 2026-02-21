/// Mini list of the 3 most recent encounters for the Rencontres Hub.
///
/// Shows encounter number, title, status badge, and a "Voir tout" link.
library;

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import 'package:my_muqabala/core/constants/app_colors.dart';
import 'package:my_muqabala/core/constants/app_spacing.dart';
import 'package:my_muqabala/core/constants/app_typography.dart';
import 'package:my_muqabala/core/router/route_names.dart';
import 'package:my_muqabala/core/widgets/loading_skeleton.dart';
import 'package:my_muqabala/features/rencontres/data/models/rencontre_historique_model.dart';
import 'package:my_muqabala/features/rencontres/presentation/providers/rencontres_provider.dart';

class HistoriqueMiniWidget extends ConsumerWidget {
  const HistoriqueMiniWidget({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final historiqueAsync = ref.watch(rencontresHistoriqueProvider);

    return historiqueAsync.when(
      loading: () => const LoadingSkeleton(height: 80),
      error: (_, __) => const SizedBox.shrink(),
      data: (rencontres) {
        if (rencontres.isEmpty) {
          return Container(
            width: double.infinity,
            padding: AppSpacing.cardPadding,
            decoration: BoxDecoration(
              color: isDark ? AppColors.darkCard : AppColors.surface,
              borderRadius: AppRadius.borderLg,
              border: Border.all(
                color: isDark ? AppColors.darkBorder : AppColors.divider,
              ),
            ),
            child: Text(
              'Aucune rencontre passée pour le moment.',
              style: AppTypography.bodyMedium.copyWith(
                color: isDark ? AppColors.darkInkMuted : AppColors.inkMuted,
              ),
              textAlign: TextAlign.center,
            ),
          );
        }

        final preview = rencontres.take(3).toList();

        return Column(
          children: [
            ...preview.map((r) => _HistoriqueItemCard(
                  rencontre: r,
                  isDark: isDark,
                )),
            if (rencontres.length > 3)
              Align(
                alignment: Alignment.centerRight,
                child: TextButton(
                  onPressed: () =>
                      context.pushNamed(RouteNames.historiqueRencontres),
                  child: Text(
                    'Voir tout (${rencontres.length})',
                    style: AppTypography.label.copyWith(
                      color: AppColors.violet,
                    ),
                  ),
                ),
              ),
          ],
        );
      },
    );
  }
}

class _HistoriqueItemCard extends StatelessWidget {
  const _HistoriqueItemCard({
    required this.rencontre,
    required this.isDark,
  });

  final RencontreHistoriqueModel rencontre;
  final bool isDark;

  @override
  Widget build(BuildContext context) {
    final statusColor =
        rencontre.hasAnalyse ? AppColors.sage : AppColors.gold;

    return Container(
      margin: const EdgeInsets.only(bottom: AppSpacing.sm),
      padding: AppSpacing.cardPadding,
      decoration: BoxDecoration(
        color: isDark ? AppColors.darkCard : AppColors.surface,
        borderRadius: AppRadius.borderLg,
        border: Border.all(
          color: isDark ? AppColors.darkBorder : AppColors.divider,
        ),
      ),
      child: Row(
        children: [
          // Encounter number badge
          Container(
            width: 36,
            height: 36,
            decoration: BoxDecoration(
              color: AppColors.violet.withValues(alpha: 0.1),
              shape: BoxShape.circle,
            ),
            child: Center(
              child: Text(
                '${rencontre.numero}',
                style: AppTypography.label.copyWith(
                  color: AppColors.violet,
                  fontWeight: FontWeight.w700,
                ),
              ),
            ),
          ),
          AppSpacing.horizontalMd,
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  rencontre.displayTitle,
                  style: AppTypography.label.copyWith(
                    color: isDark ? AppColors.darkInk : AppColors.ink,
                  ),
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                ),
                const SizedBox(height: 2),
                Text(
                  rencontre.statutLabel,
                  style: AppTypography.bodySmall.copyWith(
                    color: statusColor,
                    fontWeight: FontWeight.w500,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
