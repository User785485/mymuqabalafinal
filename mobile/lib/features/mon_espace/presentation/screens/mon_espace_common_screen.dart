/// Mon Espace common screen — accessible to ALL clients.
///
/// Displays:
///   1. Active match (rencontre en cours)
///   2. Past matches history
///   3. Matching phase status
///   4. Coaching / assistance section
library;

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import 'package:my_muqabala/core/constants/app_colors.dart';
import 'package:my_muqabala/core/constants/app_spacing.dart';
import 'package:my_muqabala/core/constants/app_typography.dart';
import 'package:my_muqabala/core/router/route_names.dart';
import 'package:my_muqabala/core/widgets/avatar_circle.dart';
import 'package:my_muqabala/core/widgets/loading_skeleton.dart';
import 'package:my_muqabala/core/widgets/profile_app_bar_action.dart';
import 'package:my_muqabala/features/home/presentation/providers/home_provider.dart';
import 'package:my_muqabala/features/home/presentation/widgets/match_card_widget.dart';
import 'package:my_muqabala/features/matching/presentation/providers/matching_provider.dart';

/// The Mon Espace screen shown in tab index 2 of the bottom navigation.
///
/// This screen is available to all clients (not just high-ticket).
class MonEspaceCommonScreen extends ConsumerWidget {
  const MonEspaceCommonScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      backgroundColor: isDark ? AppColors.darkBg : AppColors.paper,
      appBar: AppBar(
        title: Text(
          'Mon Espace',
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
      body: ListView(
        padding: EdgeInsets.only(
          left: AppSpacing.md,
          right: AppSpacing.md,
          top: AppSpacing.lg,
          bottom: AppSpacing.lg,
        ),
        physics: const AlwaysScrollableScrollPhysics(),
        children: [
          // ── 1. Rencontre en cours ────────────────────────────────────
          _SectionHeader(
            title: 'Rencontre en cours',
            icon: Icons.favorite_rounded,
            color: AppColors.rose,
            isDark: isDark,
          ),
          AppSpacing.gapSm,
          const MatchCardWidget(),
          AppSpacing.gapLg,

          // ── 2. Historique rencontres ──────────────────────────────────
          _SectionHeader(
            title: 'Historique rencontres',
            icon: Icons.history_rounded,
            color: AppColors.violet,
            isDark: isDark,
          ),
          AppSpacing.gapSm,
          _MatchHistorySection(isDark: isDark),
          AppSpacing.gapLg,

          // ── 3. Zone matching ─────────────────────────────────────────
          _SectionHeader(
            title: 'Zone matching',
            icon: Icons.auto_awesome_rounded,
            color: AppColors.gold,
            isDark: isDark,
          ),
          AppSpacing.gapSm,
          _MatchingPhaseSection(isDark: isDark),
          AppSpacing.gapLg,

          // ── 4. Assistance relation ───────────────────────────────────
          _SectionHeader(
            title: 'Assistance relation',
            icon: Icons.support_agent_rounded,
            color: AppColors.sage,
            isDark: isDark,
          ),
          AppSpacing.gapSm,
          _AssistanceSection(isDark: isDark),
        ],
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
  });

  final String title;
  final IconData icon;
  final Color color;
  final bool isDark;

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Icon(icon, color: color, size: 20),
        const SizedBox(width: 8),
        Text(
          title,
          style: AppTypography.h3.copyWith(
            color: isDark ? AppColors.darkInk : AppColors.ink,
          ),
        ),
      ],
    );
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// Match history section
// ═══════════════════════════════════════════════════════════════════════════════

class _MatchHistorySection extends ConsumerWidget {
  const _MatchHistorySection({required this.isDark});

  final bool isDark;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final matchesAsync = ref.watch(userMatchesProvider);

    return matchesAsync.when(
      loading: () => const LoadingSkeleton(height: 80),
      error: (_, __) => _EmptyCard(
        message: 'Impossible de charger l\u2019historique.',
        isDark: isDark,
      ),
      data: (matches) {
        if (matches.isEmpty) {
          return _EmptyCard(
            message: 'Aucune rencontre pass\u00e9e pour le moment.',
            isDark: isDark,
          );
        }

        return Column(
          children: matches.take(5).map((match) {
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
                  AvatarCircle(
                    name: match.user2Id,
                    size: AvatarSize.md,
                    isBlurred: true,
                  ),
                  AppSpacing.horizontalMd,
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'Rencontre',
                          style: AppTypography.label.copyWith(
                            color: isDark ? AppColors.darkInk : AppColors.ink,
                          ),
                        ),
                        Text(
                          match.statutLabel,
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
          }).toList(),
        );
      },
    );
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// Matching phase section
// ═══════════════════════════════════════════════════════════════════════════════

class _MatchingPhaseSection extends ConsumerWidget {
  const _MatchingPhaseSection({required this.isDark});

  final bool isDark;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final phaseAsync = ref.watch(currentPhaseProvider);

    return phaseAsync.when(
      loading: () => const LoadingSkeleton(height: 72),
      error: (_, __) => _EmptyCard(
        message: 'Impossible de charger le statut.',
        isDark: isDark,
      ),
      data: (phase) {
        final phaseLabel = switch (phase) {
          0 => 'Inscription en cours',
          1 => 'Phase 1 \u2014 Matching',
          2 => 'Phase 2 \u2014 D\u00e9couverte',
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
                      'Ton parcours de rencontre',
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
            'Contacte ton coach pour toute question sur ton parcours de rencontre.',
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

// ═══════════════════════════════════════════════════════════════════════════════
// Empty card helper
// ═══════════════════════════════════════════════════════════════════════════════

class _EmptyCard extends StatelessWidget {
  const _EmptyCard({required this.message, required this.isDark});

  final String message;
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
      child: Text(
        message,
        style: AppTypography.bodyMedium.copyWith(
          color: isDark ? AppColors.darkInkMuted : AppColors.inkMuted,
        ),
        textAlign: TextAlign.center,
      ),
    );
  }
}
