/// Historique rencontres screen — mirrors web/dashboard-historique.html.
///
/// Shows:
///   - CTA "Déclarer une rencontre passée"
///   - List of past encounters with: number, title, badge, expandable analysis
library;

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import 'package:my_muqabala/core/constants/app_colors.dart';
import 'package:my_muqabala/core/constants/app_spacing.dart';
import 'package:my_muqabala/core/constants/app_typography.dart';
import 'package:my_muqabala/core/router/route_names.dart';
import 'package:my_muqabala/core/widgets/empty_state.dart';
import 'package:my_muqabala/core/widgets/loading_skeleton.dart';
import 'package:my_muqabala/features/rencontres/data/models/rencontre_historique_model.dart';
import 'package:my_muqabala/features/rencontres/presentation/providers/rencontres_provider.dart';

class HistoriqueRencontresScreen extends ConsumerWidget {
  const HistoriqueRencontresScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final historiqueAsync = ref.watch(rencontresHistoriqueProvider);
    final bottomPad = MediaQuery.of(context).padding.bottom;

    return Scaffold(
      backgroundColor: isDark ? AppColors.darkBg : AppColors.paper,
      appBar: AppBar(
        title: Text(
          'Historique rencontres',
          style: AppTypography.h2.copyWith(
            color: isDark ? AppColors.darkInk : AppColors.ink,
          ),
        ),
        centerTitle: false,
        backgroundColor: isDark ? AppColors.darkBg : AppColors.paper,
        surfaceTintColor: Colors.transparent,
        elevation: 0,
        scrolledUnderElevation: 0.5,
      ),
      body: RefreshIndicator(
        color: AppColors.violet,
        onRefresh: () async {
          ref.invalidate(rencontresHistoriqueProvider);
          await ref.read(rencontresHistoriqueProvider.future);
        },
        child: ListView(
          padding: EdgeInsets.only(
            left: AppSpacing.md,
            right: AppSpacing.md,
            top: AppSpacing.lg,
            bottom: 92 + bottomPad,
          ),
          physics: const AlwaysScrollableScrollPhysics(),
          children: [
            // ── CTA ─────────────────────────────────────────────────
            SizedBox(
              width: double.infinity,
              child: FilledButton.icon(
                onPressed: () => context.pushNamed(RouteNames.chat),
                icon: const Icon(Icons.add_rounded),
                label: const Text('Déclarer une rencontre passée'),
                style: FilledButton.styleFrom(
                  backgroundColor: AppColors.violet,
                  foregroundColor: Colors.white,
                  padding: const EdgeInsets.symmetric(vertical: 14),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                ),
              ),
            ),
            AppSpacing.gapLg,

            // ── List ────────────────────────────────────────────────
            historiqueAsync.when(
              loading: () => const LoadingSkeletonList(
                itemCount: 4,
                itemHeight: 80,
                spacing: 8,
              ),
              error: (_, __) => Center(
                child: Text(
                  'Erreur de chargement',
                  style: AppTypography.bodyMedium.copyWith(
                    color:
                        isDark ? AppColors.darkInkMuted : AppColors.inkMuted,
                  ),
                ),
              ),
              data: (rencontres) {
                if (rencontres.isEmpty) {
                  return const EmptyState(
                    icon: Icons.history_rounded,
                    title: 'Aucune rencontre passée',
                    subtitle:
                        'Votre historique de rencontres appara\u00eetra ici.',
                  );
                }

                return Column(
                  children: rencontres.map((r) {
                    return _RencontreExpansionTile(
                      rencontre: r,
                      isDark: isDark,
                    );
                  }).toList(),
                );
              },
            ),
          ],
        ),
      ),
    );
  }
}

class _RencontreExpansionTile extends StatelessWidget {
  const _RencontreExpansionTile({
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
      decoration: BoxDecoration(
        color: isDark ? AppColors.darkCard : AppColors.surface,
        borderRadius: AppRadius.borderLg,
        border: Border.all(
          color: isDark ? AppColors.darkBorder : AppColors.divider,
        ),
      ),
      child: Theme(
        data: Theme.of(context).copyWith(dividerColor: Colors.transparent),
        child: ExpansionTile(
          tilePadding: const EdgeInsets.symmetric(horizontal: AppSpacing.md),
          childrenPadding: const EdgeInsets.only(
            left: AppSpacing.md,
            right: AppSpacing.md,
            bottom: AppSpacing.md,
          ),
          leading: Container(
            width: 40,
            height: 40,
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
          title: Text(
            rencontre.displayTitle,
            style: AppTypography.label.copyWith(
              color: isDark ? AppColors.darkInk : AppColors.ink,
            ),
          ),
          subtitle: Row(
            children: [
              Container(
                padding:
                    const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                decoration: BoxDecoration(
                  color: statusColor.withValues(alpha: 0.12),
                  borderRadius: AppRadius.borderSm,
                ),
                child: Text(
                  rencontre.statutLabel,
                  style: AppTypography.bodySmall.copyWith(
                    color: statusColor,
                    fontWeight: FontWeight.w500,
                    fontSize: 11,
                  ),
                ),
              ),
            ],
          ),
          children: [
            if (rencontre.hasAnalyse)
              Text(
                rencontre.analyse!,
                style: AppTypography.bodyMedium.copyWith(
                  color: isDark ? AppColors.darkInk : AppColors.ink,
                ),
              )
            else
              Text(
                'L\u2019analyse de votre coach sera disponible prochainement.',
                style: AppTypography.bodyMedium.copyWith(
                  color: isDark ? AppColors.darkInkMuted : AppColors.inkMuted,
                  fontStyle: FontStyle.italic,
                ),
              ),
          ],
        ),
      ),
    );
  }
}
