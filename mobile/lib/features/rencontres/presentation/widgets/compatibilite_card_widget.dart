/// Card summarizing compatibility search status for the Rencontres Hub.
library;

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import 'package:my_muqabala/core/constants/app_colors.dart';
import 'package:my_muqabala/core/constants/app_spacing.dart';
import 'package:my_muqabala/core/constants/app_typography.dart';
import 'package:my_muqabala/core/router/route_names.dart';
import 'package:my_muqabala/core/widgets/loading_skeleton.dart';
import 'package:my_muqabala/features/rencontres/data/models/compatibilite_status_model.dart';
import 'package:my_muqabala/features/rencontres/presentation/providers/rencontres_provider.dart';

class CompatibiliteCardWidget extends ConsumerWidget {
  const CompatibiliteCardWidget({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final statusAsync = ref.watch(compatibiliteStatusProvider);

    return statusAsync.when(
      loading: () => const LoadingSkeleton(height: 80),
      error: (_, __) => const SizedBox.shrink(),
      data: (model) => _CompatibiliteCard(model: model, isDark: isDark),
    );
  }
}

class _CompatibiliteCard extends StatelessWidget {
  const _CompatibiliteCard({required this.model, required this.isDark});

  final CompatibiliteStatusModel model;
  final bool isDark;

  @override
  Widget build(BuildContext context) {
    final (icon, label, subtitle, color) = switch (model.status) {
      CompatibiliteStatus.pending => (
          Icons.search_rounded,
          'Recherche de compatibilité',
          'Remplissez votre formulaire pour lancer la recherche',
          AppColors.violet,
        ),
      CompatibiliteStatus.searching => (
          Icons.hourglass_top_rounded,
          'Recherche en cours',
          'Nous analysons vos compatibilités...',
          AppColors.gold,
        ),
      CompatibiliteStatus.found => (
          Icons.check_circle_rounded,
          'Compatibilités trouvées',
          'Consultez vos résultats',
          AppColors.sage,
        ),
    };

    return GestureDetector(
      onTap: () => context.pushNamed(RouteNames.compatibilite),
      child: Container(
        width: double.infinity,
        padding: AppSpacing.cardPadding,
        decoration: BoxDecoration(
          color: isDark ? AppColors.darkCard : AppColors.surface,
          borderRadius: AppRadius.borderLg,
          border: Border.all(
            color: color.withValues(alpha: 0.25),
          ),
        ),
        child: Row(
          children: [
            Container(
              width: 44,
              height: 44,
              decoration: BoxDecoration(
                color: color.withValues(alpha: 0.12),
                borderRadius: BorderRadius.circular(12),
              ),
              child: Icon(icon, color: color, size: 22),
            ),
            AppSpacing.horizontalMd,
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    label,
                    style: AppTypography.label.copyWith(
                      color: isDark ? AppColors.darkInk : AppColors.ink,
                    ),
                  ),
                  const SizedBox(height: 2),
                  Text(
                    subtitle,
                    style: AppTypography.bodySmall.copyWith(
                      color:
                          isDark ? AppColors.darkInkMuted : AppColors.inkMuted,
                    ),
                  ),
                ],
              ),
            ),
            Icon(
              Icons.chevron_right_rounded,
              color: isDark ? AppColors.darkInkMuted : AppColors.inkMuted,
            ),
          ],
        ),
      ),
    );
  }
}
