/// High-ticket hub widget — grid of the 6 premium sections.
///
/// Shown in the "Espace Premium" tab when the user has
/// `is_high_ticket = true` on their profile.
library;

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import 'package:my_muqabala/core/widgets/tappable_card.dart';

import 'package:my_muqabala/core/constants/app_colors.dart';
import 'package:my_muqabala/core/constants/app_spacing.dart';
import 'package:my_muqabala/core/constants/app_typography.dart';
import 'package:my_muqabala/core/router/route_names.dart';
import 'package:my_muqabala/features/high_ticket/presentation/providers/high_ticket_provider.dart';
import 'package:my_muqabala/features/high_ticket/presentation/widgets/section_card_widget.dart';

class HighTicketHubWidget extends ConsumerWidget {
  const HighTicketHubWidget({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return SingleChildScrollView(
      padding: EdgeInsets.only(
        left: AppSpacing.md,
        right: AppSpacing.md,
        top: AppSpacing.lg,
        bottom: AppSpacing.lg,
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // ── Premium welcome card ────────────────────────────────────
          _PremiumWelcomeCard(isDark: isDark),
          AppSpacing.gapLg,
          // ── 2x2 Grid ─────────────────────────────────────────────────
          GridView.count(
            crossAxisCount: 2,
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            mainAxisSpacing: AppSpacing.md,
            crossAxisSpacing: AppSpacing.md,
            childAspectRatio: 0.95,
            children: [
              SectionCardWidget(
                icon: Icons.quiz_rounded,
                title: 'Formulaires Exploratoires',
                description: 'Scénarios et questionnaires qui alimentent ta cartographie',
                color: AppColors.violet,
                progressProvider: sectionProgressProvider('formulaires'),
                onTap: () => context.pushNamed(RouteNames.formulaires),
              ),
              SectionCardWidget(
                icon: Icons.map_rounded,
                title: 'Cartographie Émotionnelle',
                description: '21 documents personnalisés façonnés par ce que tu as exploré en toi',
                color: const Color(0xFF0D9488), // teal
                progressProvider: sectionProgressProvider('cartographie'),
                onTap: () => context.pushNamed(RouteNames.cartographie),
              ),
              SectionCardWidget(
                icon: Icons.school_rounded,
                title: 'Ressources',
                description: '48 semaines de vidéos, audios et guides écrits',
                color: const Color(0xFFD97706), // amber
                progressProvider: sectionProgressProvider('ressources'),
                onTap: () => context.pushNamed(RouteNames.ressources),
              ),
              SectionCardWidget(
                icon: Icons.timeline_rounded,
                title: 'Plan d’Action',
                description: 'Ton plan concret pour passer à l’action',
                color: AppColors.rose,
                progressProvider: sectionProgressProvider('plan_action'),
                onTap: () => context.pushNamed(RouteNames.planAction),
              ),
              SectionCardWidget(
                icon: Icons.description_rounded,
                title: 'Documents Coach',
                description: 'Tes documents personnalisés par ton coach',
                color: AppColors.sage,
                progressProvider: sectionProgressProvider('documents'),
                onTap: () => context.pushNamed(RouteNames.documentViewer,
                    pathParameters: {'documentId': 'list'}),
              ),
              SectionCardWidget(
                icon: Icons.chat_bubble_outline_rounded,
                title: 'Assistante Amoureuse',
                description: 'Accompagnement personnalisé par chat',
                color: AppColors.rose,
                progressProvider: sectionProgressProvider('assistante'),
                onTap: () => context.pushNamed(RouteNames.chat),
              ),
            ],
          ),
          AppSpacing.gapLg,
          // ── Compte-rendu card (conditional) ──────────────────────────
          _CompteRenduSecondaryCard(isDark: isDark),
          AppSpacing.gapXxl,
        ],
      ),
    );
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// Compte-rendu secondary card for premium users
// ═══════════════════════════════════════════════════════════════════════════════

class _CompteRenduSecondaryCard extends ConsumerWidget {
  const _CompteRenduSecondaryCard({required this.isDark});

  final bool isDark;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final hasCR = ref.watch(hasCompteRenduProvider).value ?? false;
    if (!hasCR) return const SizedBox.shrink();

    return TappableCard(
      onTap: () => context.pushNamed(RouteNames.compteRendu),
      child: Container(
        width: double.infinity,
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
        decoration: BoxDecoration(
          color: isDark ? AppColors.darkCard : AppColors.surface,
          borderRadius: AppRadius.borderLg,
          border: Border.all(
            color: AppColors.violet.withValues(alpha: 0.15),
          ),
        ),
        child: Row(
          children: [
            Container(
              width: 40,
              height: 40,
              decoration: BoxDecoration(
                color: AppColors.violet.withValues(alpha: 0.1),
                borderRadius: BorderRadius.circular(10),
              ),
              child: const Icon(
                Icons.description_rounded,
                color: AppColors.violet,
                size: 20,
              ),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Mon Compte-Rendu',
                    style: AppTypography.label.copyWith(
                      color: isDark ? AppColors.darkInk : AppColors.ink,
                    ),
                  ),
                  const SizedBox(height: 2),
                  Text(
                    'Consulte ton analyse personnalis\u00e9e',
                    style: AppTypography.bodySmall.copyWith(
                      color: isDark ? AppColors.darkInkMuted : AppColors.inkMuted,
                      fontSize: 12,
                    ),
                  ),
                ],
              ),
            ),
            Icon(
              Icons.chevron_right_rounded,
              size: 20,
              color: isDark ? AppColors.darkInkMuted : AppColors.inkMuted,
            ),
          ],
        ),
      ),
    );
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// Premium welcome card
// ═══════════════════════════════════════════════════════════════════════════════

class _PremiumWelcomeCard extends StatelessWidget {
  const _PremiumWelcomeCard({required this.isDark});

  final bool isDark;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: AppSpacing.cardPadding,
      decoration: BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [
            AppColors.violet.withValues(alpha: isDark ? 0.2 : 0.1),
            AppColors.rose.withValues(alpha: isDark ? 0.15 : 0.06),
          ],
        ),
        borderRadius: AppRadius.borderLg,
        border: Border.all(
          color: AppColors.violet.withValues(alpha: 0.2),
        ),
      ),
      child: Row(
        children: [
          Container(
            width: 44,
            height: 44,
            decoration: BoxDecoration(
              color: AppColors.violet.withValues(alpha: 0.15),
              shape: BoxShape.circle,
            ),
            child: const Icon(
              Icons.verified_rounded,
              color: AppColors.violet,
              size: 22,
            ),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Ton accompagnement est actif',
                  style: AppTypography.label.copyWith(
                    color: isDark ? AppColors.darkInk : AppColors.ink,
                  ),
                ),
                const SizedBox(height: 2),
                Text(
                  'Acc\u00e8de \u00e0 tes outils d\u2019accompagnement personnalis\u00e9',
                  style: AppTypography.bodySmall.copyWith(
                    color: isDark ? AppColors.darkInkMuted : AppColors.inkMuted,
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
