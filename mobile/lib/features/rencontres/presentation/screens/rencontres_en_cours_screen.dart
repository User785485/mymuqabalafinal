/// Rencontres en cours screen — mirrors web/dashboard-rencontres.html.
///
/// Shows:
///   - CTA "Remplir mon formulaire de suivi hebdomadaire"
///   - Accordion list (ExpansionTile) of weekly feedback entries
///   - Badge status per week (en_attente / rédigé)
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
import 'package:my_muqabala/features/home/presentation/widgets/match_card_widget.dart';
import 'package:my_muqabala/features/rencontres/data/models/retour_hebdo_model.dart';
import 'package:my_muqabala/features/rencontres/presentation/providers/rencontres_provider.dart';

class RencontresEnCoursScreen extends ConsumerWidget {
  const RencontresEnCoursScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final retoursAsync = ref.watch(retoursHebdoProvider);


    return Scaffold(
      backgroundColor: isDark ? AppColors.darkBg : AppColors.paper,
      appBar: AppBar(
        title: Text(
          'Suivi hebdomadaire',
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
          ref.invalidate(retoursHebdoProvider);
          await ref.read(retoursHebdoProvider.future);
        },
        child: ListView(
          padding: EdgeInsets.only(
            left: AppSpacing.md,
            right: AppSpacing.md,
            top: AppSpacing.lg,
            bottom: AppSpacing.lg,
          ),
          physics: const AlwaysScrollableScrollPhysics(),
          children: [
            // ── Active match card ────────────────────────────────────
            const MatchCardWidget(),
            AppSpacing.gapLg,

            // ── CTA ─────────────────────────────────────────────────
            SizedBox(
              width: double.infinity,
              child: FilledButton.icon(
                onPressed: () => context.pushNamed(RouteNames.chat),
                icon: const Icon(Icons.assignment_rounded),
                label:
                    const Text('Remplir mon formulaire de suivi hebdomadaire'),
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

            // ── Title ───────────────────────────────────────────────
            Text(
              'Retours d\u2019accompagnement',
              style: AppTypography.h3.copyWith(
                color: isDark ? AppColors.darkInk : AppColors.ink,
              ),
            ),
            AppSpacing.gapMd,

            // ── Retours list ────────────────────────────────────────
            retoursAsync.when(
              loading: () => const LoadingSkeletonList(
                itemCount: 4,
                itemHeight: 72,
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
              data: (retours) {
                if (retours.isEmpty) {
                  return const EmptyState(
                    icon: Icons.calendar_today_outlined,
                    title: 'Aucun retour hebdomadaire',
                    subtitle:
                        'Vos retours d\u2019accompagnement appara\u00eetront ici.',
                  );
                }

                return Column(
                  children: retours.map((retour) {
                    return _RetourExpansionTile(
                      retour: retour,
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

class _RetourExpansionTile extends StatelessWidget {
  const _RetourExpansionTile({
    required this.retour,
    required this.isDark,
  });

  final RetourHebdoModel retour;
  final bool isDark;

  @override
  Widget build(BuildContext context) {
    final statusColor = retour.isRedige ? AppColors.sage : AppColors.gold;

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
            width: 36,
            height: 36,
            decoration: BoxDecoration(
              color: AppColors.violet.withValues(alpha: 0.1),
              shape: BoxShape.circle,
            ),
            child: Center(
              child: Text(
                'S${retour.semaineNumero}',
                style: AppTypography.labelSmall.copyWith(
                  color: AppColors.violet,
                  fontWeight: FontWeight.w700,
                ),
              ),
            ),
          ),
          title: Text(
            'Semaine ${retour.semaineNumero}',
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
                  retour.statutLabel,
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
            if (retour.contenu != null && retour.contenu!.isNotEmpty)
              Text(
                retour.contenu!,
                style: AppTypography.bodyMedium.copyWith(
                  color: isDark ? AppColors.darkInk : AppColors.ink,
                ),
              )
            else
              Text(
                'Retour en attente de r\u00e9daction par ton coach.',
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
