/// Compatibility search screen — mirrors web/dashboard-compatibilite.html.
///
/// Three states:
///   A. Pending: CTA "Remplir mon formulaire" + 4 illustrated criteria
///   B. Searching: Pulse animation + "Nous recherchons" + criteria
///   C. Found: Results display
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

class CompatibiliteScreen extends ConsumerWidget {
  const CompatibiliteScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final statusAsync = ref.watch(compatibiliteStatusProvider);

    return Scaffold(
      backgroundColor: isDark ? AppColors.darkBg : AppColors.paper,
      appBar: AppBar(
        title: Text(
          'Recherche de compatibilité',
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
      body: statusAsync.when(
        loading: () => const Center(
          child: LoadingSkeleton(height: 300),
        ),
        error: (_, __) => Center(
          child: Text(
            'Erreur de chargement',
            style: AppTypography.bodyMedium.copyWith(
              color: isDark ? AppColors.darkInkMuted : AppColors.inkMuted,
            ),
          ),
        ),
        data: (model) => _CompatibiliteBody(model: model, isDark: isDark),
      ),
    );
  }
}

class _CompatibiliteBody extends StatelessWidget {
  const _CompatibiliteBody({required this.model, required this.isDark});

  final CompatibiliteStatusModel model;
  final bool isDark;

  @override
  Widget build(BuildContext context) {
    final bottomPad = MediaQuery.of(context).padding.bottom;

    return SingleChildScrollView(
      padding: EdgeInsets.only(
        left: AppSpacing.md,
        right: AppSpacing.md,
        top: AppSpacing.lg,
        bottom: 92 + bottomPad,
      ),
      child: Column(
        children: [
          // ── Status header ─────────────────────────────────────────
          _StatusHeader(model: model, isDark: isDark),
          AppSpacing.gapXl,

          // ── CTA (pending only) ────────────────────────────────────
          if (model.isPending) ...[
            SizedBox(
              width: double.infinity,
              child: FilledButton.icon(
                onPressed: () {
                  // Navigate to chat to request compatibility form
                  context.pushNamed(RouteNames.chat);
                },
                icon: const Icon(Icons.assignment_rounded),
                label: const Text('Remplir mon formulaire de compatibilité'),
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
            AppSpacing.gapXl,
          ],

          // ── 4 criteria ────────────────────────────────────────────
          ...defaultCompatibiliteCriteria.map((criterion) => Padding(
                padding: const EdgeInsets.only(bottom: AppSpacing.md),
                child: _CriterionCard(
                  criterion: criterion,
                  isDark: isDark,
                ),
              )),

          // ── Results (found only) ──────────────────────────────────
          if (model.isFound && model.resultData != null) ...[
            AppSpacing.gapLg,
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(AppSpacing.lg),
              decoration: BoxDecoration(
                color: AppColors.sage.withValues(alpha: isDark ? 0.15 : 0.08),
                borderRadius: AppRadius.borderLg,
                border: Border.all(
                  color: AppColors.sage.withValues(alpha: 0.2),
                ),
              ),
              child: Column(
                children: [
                  const Icon(
                    Icons.check_circle_rounded,
                    color: AppColors.sage,
                    size: 48,
                  ),
                  AppSpacing.gapMd,
                  Text(
                    'Compatibilités identifiées',
                    style: AppTypography.h3.copyWith(
                      color: isDark ? AppColors.darkInk : AppColors.ink,
                    ),
                  ),
                  AppSpacing.gapSm,
                  Text(
                    'Votre coach vous communiquera les résultats détaillés lors de votre prochain échange.',
                    style: AppTypography.bodyMedium.copyWith(
                      color:
                          isDark ? AppColors.darkInkMuted : AppColors.inkMuted,
                    ),
                    textAlign: TextAlign.center,
                  ),
                ],
              ),
            ),
          ],
        ],
      ),
    );
  }
}

class _StatusHeader extends StatelessWidget {
  const _StatusHeader({required this.model, required this.isDark});

  final CompatibiliteStatusModel model;
  final bool isDark;

  @override
  Widget build(BuildContext context) {
    final (icon, title, subtitle, color) = switch (model.status) {
      CompatibiliteStatus.pending => (
          Icons.search_rounded,
          'Lancez votre recherche',
          'Remplissez le formulaire de compatibilité pour que nous puissions identifier les profils qui vous correspondent.',
          AppColors.violet,
        ),
      CompatibiliteStatus.searching => (
          Icons.hourglass_top_rounded,
          'Recherche en cours...',
          'Nous analysons vos critères de compatibilité pour trouver les meilleurs profils.',
          AppColors.gold,
        ),
      CompatibiliteStatus.found => (
          Icons.check_circle_rounded,
          'Résultats disponibles',
          'Nous avons identifié des profils compatibles avec vos critères.',
          AppColors.sage,
        ),
    };

    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(AppSpacing.lg),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [
            color.withValues(alpha: isDark ? 0.15 : 0.08),
            color.withValues(alpha: isDark ? 0.08 : 0.03),
          ],
        ),
        borderRadius: AppRadius.borderLg,
        border: Border.all(
          color: color.withValues(alpha: 0.15),
        ),
      ),
      child: Column(
        children: [
          // Pulse animation for searching state
          if (model.isSearching)
            TweenAnimationBuilder<double>(
              tween: Tween(begin: 0.8, end: 1.0),
              duration: const Duration(seconds: 2),
              curve: Curves.easeInOut,
              builder: (_, scale, child) => Transform.scale(
                scale: scale,
                child: child,
              ),
              child: Container(
                width: 64,
                height: 64,
                decoration: BoxDecoration(
                  color: color.withValues(alpha: 0.15),
                  shape: BoxShape.circle,
                ),
                child: Icon(icon, color: color, size: 32),
              ),
            )
          else
            Container(
              width: 64,
              height: 64,
              decoration: BoxDecoration(
                color: color.withValues(alpha: 0.15),
                shape: BoxShape.circle,
              ),
              child: Icon(icon, color: color, size: 32),
            ),
          AppSpacing.gapMd,
          Text(
            title,
            style: AppTypography.h3.copyWith(
              color: isDark ? AppColors.darkInk : AppColors.ink,
            ),
            textAlign: TextAlign.center,
          ),
          AppSpacing.gapSm,
          Text(
            subtitle,
            style: AppTypography.bodyMedium.copyWith(
              color: isDark ? AppColors.darkInkMuted : AppColors.inkMuted,
            ),
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }
}

class _CriterionCard extends StatelessWidget {
  const _CriterionCard({required this.criterion, required this.isDark});

  final CompatibiliteCriterion criterion;
  final bool isDark;

  @override
  Widget build(BuildContext context) {
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
      child: Row(
        children: [
          Container(
            width: 44,
            height: 44,
            decoration: BoxDecoration(
              color: AppColors.violet.withValues(alpha: 0.1),
              borderRadius: BorderRadius.circular(12),
            ),
            child: Icon(criterion.icon, color: AppColors.violet, size: 22),
          ),
          AppSpacing.horizontalMd,
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  criterion.name,
                  style: AppTypography.label.copyWith(
                    color: isDark ? AppColors.darkInk : AppColors.ink,
                  ),
                ),
                const SizedBox(height: 2),
                Text(
                  criterion.description,
                  style: AppTypography.bodySmall.copyWith(
                    color:
                        isDark ? AppColors.darkInkMuted : AppColors.inkMuted,
                    fontSize: 12,
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
