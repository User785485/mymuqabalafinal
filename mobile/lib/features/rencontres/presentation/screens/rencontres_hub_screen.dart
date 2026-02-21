/// Rencontres Hub — main screen for the "Rencontres" tab.
///
/// Replaces the old EventsScreen as the root of Tab 1.
/// Shows a scrollable list of sections:
///   1. Prochains événements (preview)
///   2. Rencontre en cours (match card + weekly indicator)
///   3. Zone matching (phase section)
///   4. Recherche de compatibilité (card summary)
///   5. Historique (3 latest encounters)
///   6. Premium section (if high-ticket) / Upsell banner (if not)
///   7. Assistance coach (CTA)
library;

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import 'package:my_muqabala/core/constants/app_colors.dart';
import 'package:my_muqabala/core/constants/app_spacing.dart';
import 'package:my_muqabala/core/constants/app_typography.dart';
import 'package:my_muqabala/core/router/route_names.dart';
import 'package:my_muqabala/core/widgets/profile_app_bar_action.dart';
import 'package:my_muqabala/features/home/presentation/providers/home_provider.dart';
import 'package:my_muqabala/features/profile/presentation/providers/profile_provider.dart';
import 'package:my_muqabala/features/rencontres/presentation/providers/rencontres_provider.dart';
import 'package:my_muqabala/features/rencontres/presentation/widgets/upcoming_events_preview.dart';
import 'package:my_muqabala/features/rencontres/presentation/widgets/rencontres_en_cours_card.dart';
import 'package:my_muqabala/features/rencontres/presentation/widgets/compatibilite_card_widget.dart';
import 'package:my_muqabala/features/rencontres/presentation/widgets/historique_mini_widget.dart';
import 'package:my_muqabala/features/rencontres/presentation/widgets/premium_rencontres_section.dart';

class RencontresHubScreen extends ConsumerWidget {
  const RencontresHubScreen({super.key});

  static const _navBarBottomPadding = 92.0;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final bottomPad = MediaQuery.of(context).padding.bottom;

    final profileAsync = ref.watch(profileStreamProvider);
    final isHighTicket = profileAsync.when(
      data: (profile) => profile?.isHighTicket ?? false,
      loading: () => false,
      error: (_, __) => false,
    );

    return Scaffold(
      backgroundColor: isDark ? AppColors.darkBg : AppColors.paper,
      appBar: AppBar(
        title: Text(
          'Rencontres',
          style: AppTypography.h2.copyWith(
            color: isDark ? AppColors.darkInk : AppColors.ink,
          ),
        ),
        centerTitle: false,
        backgroundColor: isDark ? AppColors.darkBg : AppColors.paper,
        surfaceTintColor: Colors.transparent,
        elevation: 0,
        scrolledUnderElevation: 0.5,
        actions: const [ProfileAppBarAction()],
      ),
      body: RefreshIndicator(
        color: AppColors.violet,
        onRefresh: () async {
          refreshAllRencontresData(ref);
          ref.invalidate(activeMatchProvider);
          ref.invalidate(currentPhaseProvider);
        },
        child: ListView(
          padding: EdgeInsets.only(
            left: AppSpacing.md,
            right: AppSpacing.md,
            top: AppSpacing.lg,
            bottom: _navBarBottomPadding + bottomPad,
          ),
          physics: const AlwaysScrollableScrollPhysics(),
          children: [
            // ── 1. Prochains événements ──────────────────────────────
            _SectionHeader(
              title: 'Prochains événements',
              icon: Icons.event_rounded,
              color: AppColors.violet,
              isDark: isDark,
              trailing: TextButton(
                onPressed: () =>
                    context.pushNamed(RouteNames.eventsListing),
                child: Text(
                  'Tous',
                  style: AppTypography.label.copyWith(
                    color: AppColors.violet,
                  ),
                ),
              ),
            ),
            AppSpacing.gapSm,
            const UpcomingEventsPreview(),
            AppSpacing.gapLg,

            // ── 2. Rencontre en cours ────────────────────────────────
            _SectionHeader(
              title: 'Rencontre en cours',
              icon: Icons.favorite_rounded,
              color: AppColors.rose,
              isDark: isDark,
            ),
            AppSpacing.gapSm,
            const RencontresEnCoursCard(),
            AppSpacing.gapLg,

            // ── 3. Zone matching ─────────────────────────────────────
            _SectionHeader(
              title: 'Zone matching',
              icon: Icons.auto_awesome_rounded,
              color: AppColors.gold,
              isDark: isDark,
            ),
            AppSpacing.gapSm,
            _MatchingPhaseSection(isDark: isDark),
            AppSpacing.gapLg,

            // ── 4. Recherche de compatibilité ────────────────────────
            _SectionHeader(
              title: 'Compatibilité',
              icon: Icons.search_rounded,
              color: AppColors.violet,
              isDark: isDark,
            ),
            AppSpacing.gapSm,
            const CompatibiliteCardWidget(),
            AppSpacing.gapLg,

            // ── 5. Historique ────────────────────────────────────────
            _SectionHeader(
              title: 'Historique rencontres',
              icon: Icons.history_rounded,
              color: AppColors.violet,
              isDark: isDark,
            ),
            AppSpacing.gapSm,
            const HistoriqueMiniWidget(),
            AppSpacing.gapLg,

            // ── 6. Premium / Upsell ─────────────────────────────────
            _SectionHeader(
              title: isHighTicket
                  ? 'Accompagnement premium'
                  : 'Passer au Premium',
              icon: Icons.diamond_rounded,
              color: AppColors.gold,
              isDark: isDark,
            ),
            AppSpacing.gapSm,
            if (isHighTicket)
              const PremiumRencontresSection()
            else
              _UpsellBanner(isDark: isDark),
            AppSpacing.gapLg,

            // ── 7. Assistance coach ─────────────────────────────────
            _AssistanceSection(isDark: isDark),
          ],
        ),
      ),
    );
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// Section header
// ═══════════════════════════════════════════════════════════════════════════════

class _SectionHeader extends StatelessWidget {
  const _SectionHeader({
    required this.title,
    required this.icon,
    required this.color,
    required this.isDark,
    this.trailing,
  });

  final String title;
  final IconData icon;
  final Color color;
  final bool isDark;
  final Widget? trailing;

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Icon(icon, color: color, size: 20),
        const SizedBox(width: 8),
        Expanded(
          child: Text(
            title,
            style: AppTypography.h3.copyWith(
              color: isDark ? AppColors.darkInk : AppColors.ink,
            ),
          ),
        ),
        if (trailing != null) trailing!,
      ],
    );
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// Matching phase section (migrated from MonEspaceCommonScreen)
// ═══════════════════════════════════════════════════════════════════════════════

class _MatchingPhaseSection extends ConsumerWidget {
  const _MatchingPhaseSection({required this.isDark});

  final bool isDark;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final phaseAsync = ref.watch(currentPhaseProvider);

    return phaseAsync.when(
      loading: () => const SizedBox(
        height: 72,
        child: Center(child: CircularProgressIndicator(strokeWidth: 2)),
      ),
      error: (_, __) => const SizedBox.shrink(),
      data: (phase) {
        final phaseLabel = switch (phase) {
          0 => 'Inscription en cours',
          1 => 'Phase 1 \u2014 Matching',
          2 => 'Phase 2 \u2014 Découverte',
          3 => 'Phase 3 \u2014 Approfondie',
          4 => 'Phase 4 \u2014 Engagement',
          _ => 'Phase $phase',
        };

        return Container(
          width: double.infinity,
          padding: AppSpacing.cardPadding,
          decoration: BoxDecoration(
            gradient: LinearGradient(
              colors: [
                AppColors.gold.withValues(alpha: isDark ? 0.15 : 0.08),
                AppColors.goldWarm.withValues(alpha: isDark ? 0.10 : 0.04),
              ],
            ),
            borderRadius: AppRadius.borderLg,
            border: Border.all(
              color: AppColors.gold.withValues(alpha: 0.2),
            ),
          ),
          child: Row(
            children: [
              Container(
                width: 48,
                height: 48,
                decoration: BoxDecoration(
                  color: AppColors.gold.withValues(alpha: 0.15),
                  shape: BoxShape.circle,
                ),
                child: Center(
                  child: Text(
                    '$phase',
                    style: AppTypography.h2.copyWith(
                      color: AppColors.gold,
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
                      phaseLabel,
                      style: AppTypography.label.copyWith(
                        color: isDark ? AppColors.darkInk : AppColors.ink,
                      ),
                    ),
                    const SizedBox(height: 2),
                    Text(
                      'Votre parcours de rencontre',
                      style: AppTypography.bodySmall.copyWith(
                        color: isDark
                            ? AppColors.darkInkMuted
                            : AppColors.inkMuted,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        );
      },
    );
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// Mini upsell banner
// ═══════════════════════════════════════════════════════════════════════════════

class _UpsellBanner extends StatelessWidget {
  const _UpsellBanner({required this.isDark});

  final bool isDark;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(AppSpacing.lg),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [
            AppColors.violet.withValues(alpha: isDark ? 0.2 : 0.08),
            AppColors.rose.withValues(alpha: isDark ? 0.15 : 0.05),
          ],
        ),
        borderRadius: AppRadius.borderLg,
        border: Border.all(
          color: AppColors.violet.withValues(alpha: 0.15),
        ),
      ),
      child: Column(
        children: [
          Container(
            width: 48,
            height: 48,
            decoration: BoxDecoration(
              color: AppColors.violet.withValues(alpha: 0.15),
              shape: BoxShape.circle,
            ),
            child: const Icon(
              Icons.diamond_rounded,
              color: AppColors.violet,
              size: 24,
            ),
          ),
          AppSpacing.gapMd,
          Text(
            'Débloquez l\u2019accompagnement premium',
            style: AppTypography.label.copyWith(
              color: isDark ? AppColors.darkInk : AppColors.ink,
              fontSize: 15,
            ),
            textAlign: TextAlign.center,
          ),
          AppSpacing.gapXs,
          Text(
            'Plan d\u2019action, assistante amoureuse et bien plus',
            style: AppTypography.bodySmall.copyWith(
              color: isDark ? AppColors.darkInkMuted : AppColors.inkMuted,
            ),
            textAlign: TextAlign.center,
          ),
          AppSpacing.gapMd,
          SizedBox(
            width: double.infinity,
            child: FilledButton.icon(
              onPressed: () => context.pushNamed(RouteNames.chat),
              icon: const Icon(Icons.chat_rounded, size: 18),
              label: const Text('Contacter mon coach'),
              style: FilledButton.styleFrom(
                backgroundColor: AppColors.violet,
                foregroundColor: Colors.white,
                padding: const EdgeInsets.symmetric(vertical: 12),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(10),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// Assistance section
// ═══════════════════════════════════════════════════════════════════════════════

class _AssistanceSection extends StatelessWidget {
  const _AssistanceSection({required this.isDark});

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
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Besoin d\u2019aide\u00a0?',
            style: AppTypography.label.copyWith(
              color: isDark ? AppColors.darkInk : AppColors.ink,
            ),
          ),
          AppSpacing.gapXs,
          Text(
            'Contactez votre coach pour toute question sur votre parcours de rencontre.',
            style: AppTypography.bodySmall.copyWith(
              color: isDark ? AppColors.darkInkMuted : AppColors.inkMuted,
            ),
          ),
          AppSpacing.gapMd,
          SizedBox(
            width: double.infinity,
            child: OutlinedButton.icon(
              onPressed: () => context.pushNamed(RouteNames.chat),
              icon: const Icon(Icons.chat_rounded, size: 18),
              label: const Text('Contacter mon coach'),
              style: OutlinedButton.styleFrom(
                foregroundColor: AppColors.violet,
                side: const BorderSide(color: AppColors.violet),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(10),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
