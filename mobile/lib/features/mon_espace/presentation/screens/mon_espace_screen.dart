/// Mon Espace screen — the coaching hub (Tab 2).
///
/// For **free** users: scrollable list with programme presentation,
/// free features, locked premium teasers, coach intro, and CTA.
///
/// For **premium** users: welcome card with progress, 2x3 section grid,
/// and quick-access documents.
library;

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import 'package:my_muqabala/core/widgets/tappable_card.dart';

import 'package:my_muqabala/core/constants/app_colors.dart';
import 'package:my_muqabala/core/constants/app_spacing.dart';
import 'package:my_muqabala/core/constants/app_typography.dart';
import 'package:my_muqabala/core/router/route_names.dart';
import 'package:my_muqabala/features/mon_espace/presentation/widgets/high_ticket_hub_widget.dart';
import 'package:my_muqabala/features/mon_espace/presentation/widgets/programme_header_card.dart';
import 'package:my_muqabala/features/mon_espace/presentation/widgets/teaser_feature_card.dart';
import 'package:my_muqabala/features/high_ticket/presentation/providers/high_ticket_provider.dart';
import 'package:my_muqabala/features/profile/presentation/providers/profile_provider.dart';

class MonEspaceScreen extends ConsumerWidget {
  const MonEspaceScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
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
      ),
      body: isHighTicket
          ? const HighTicketHubWidget()
          : _FreeUserBody(isDark: isDark),
    );
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// Free user body
// ═══════════════════════════════════════════════════════════════════════════════

class _FreeUserBody extends ConsumerWidget {
  const _FreeUserBody({required this.isDark});

  final bool isDark;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final hasCR = ref.watch(hasCompteRenduProvider).value ?? false;
    final hasPDV = ref.watch(hasPageDeVenteProvider).value ?? false;

    return ListView(
      padding: EdgeInsets.only(
        left: AppSpacing.md,
        right: AppSpacing.md,
        top: AppSpacing.lg,
        bottom: AppSpacing.lg,
      ),
      children: [
        // ── 1. Programme header ──────────────────────────────────────
        const ProgrammeHeaderCard(),
        AppSpacing.gapLg,

        // ── 2. Compte-rendu card (if available) ─────────────────────
        if (hasCR) ...[
          _CompteRenduCard(isDark: isDark),
          AppSpacing.gapLg,
        ],

        // ── 3. Section gratuite ──────────────────────────────────────
        Text(
          'Commencez gratuitement',
          style: AppTypography.h3.copyWith(
            color: isDark ? AppColors.darkInk : AppColors.ink,
          ),
        ),
        AppSpacing.gapSm,
        _FreeFeatureCard(
          icon: Icons.chat_rounded,
          title: 'Séance de découverte',
          subtitle: 'Discute avec ton coach pour découvrir le programme',
          color: AppColors.sage,
          isDark: isDark,
          onTap: () => context.pushNamed(RouteNames.chat),
        ),
        AppSpacing.gapSm,
        _FreeFeatureCard(
          icon: Icons.quiz_outlined,
          title: 'Questionnaire de compatibilité',
          subtitle: 'Remplis le questionnaire pour lancer tes rencontres',
          color: AppColors.violet,
          isDark: isDark,
          onTap: () => context.pushNamed(RouteNames.questionnaire),
        ),
        AppSpacing.gapLg,

        // ── 4. Page de vente CTA (if available) ─────────────────────
        if (hasPDV) ...[
          _PageDeVenteCTA(isDark: isDark),
          AppSpacing.gapLg,
        ],

        // ── 5. Section programme (teasers verrouillés) ───────────────
        Text(
          'Le programme complet',
          style: AppTypography.h3.copyWith(
            color: isDark ? AppColors.darkInk : AppColors.ink,
          ),
        ),
        AppSpacing.gapXs,
        Text(
          'Disponible avec l’accompagnement premium',
          style: AppTypography.bodySmall.copyWith(
            color: isDark ? AppColors.darkInkMuted : AppColors.inkMuted,
          ),
        ),
        AppSpacing.gapSm,
        const TeaserFeatureCard(
          icon: Icons.quiz_rounded,
          title: 'Formulaires Exploratoires',
          description: 'Scénarios et questionnaires qui alimentent ta cartographie émotionnelle',
          color: AppColors.violet,
        ),
        AppSpacing.gapSm,
        const TeaserFeatureCard(
          icon: Icons.map_rounded,
          title: 'Cartographie Émotionnelle',
          description: '21 documents personnalisés façonnés par ce que tu as exploré en toi',
          color: Color(0xFF0D9488),
        ),
        AppSpacing.gapSm,
        const TeaserFeatureCard(
          icon: Icons.school_rounded,
          title: 'Ressources Pédagogiques',
          description: 'Vidéos, audios et guides écrits pour t’accompagner à chaque étape',
          color: Color(0xFFD97706),
        ),
        AppSpacing.gapSm,
        const TeaserFeatureCard(
          icon: Icons.timeline_rounded,
          title: 'Plan d’Action',
          description: 'Ton plan concret pour créer des opportunités de rencontre saines',
          color: AppColors.rose,
        ),
        AppSpacing.gapSm,
        const TeaserFeatureCard(
          icon: Icons.description_rounded,
          title: 'Documents Coach',
          description: 'Comptes-rendus et documents de ton coach',
          color: AppColors.sage,
        ),
        AppSpacing.gapSm,
        const TeaserFeatureCard(
          icon: Icons.chat_bubble_outline_rounded,
          title: 'Assistante Amoureuse',
          description: 'Accompagnement personnalisé par chat intelligent',
          color: AppColors.rose,
        ),
        AppSpacing.gapLg,

        // ── 6. Coach intro ───────────────────────────────────────────
        _CoachIntroCard(isDark: isDark),
        AppSpacing.gapLg,

        // ── 7. Social proof placeholder ──────────────────────────────
        _SocialProofPlaceholder(isDark: isDark),
        AppSpacing.gapLg,

        // ── 8. CTA final ─────────────────────────────────────────────
        SizedBox(
          width: double.infinity,
          child: FilledButton.icon(
            onPressed: () => context.pushNamed(RouteNames.chat),
            icon: const Icon(Icons.chat_rounded),
            label: const Text('Découvrir le programme complet'),
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
    );
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// Compte-rendu highlight card (violet gradient)
// ═══════════════════════════════════════════════════════════════════════════════

class _CompteRenduCard extends StatelessWidget {
  const _CompteRenduCard({required this.isDark});

  final bool isDark;

  @override
  Widget build(BuildContext context) {
    return TappableCard(
      onTap: () => context.pushNamed(RouteNames.compteRendu),
      child: Container(
        width: double.infinity,
        padding: AppSpacing.cardPadding,
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [
              AppColors.violet.withValues(alpha: isDark ? 0.25 : 0.12),
              AppColors.violetVivid.withValues(alpha: isDark ? 0.15 : 0.06),
            ],
          ),
          borderRadius: AppRadius.borderLg,
          border: Border.all(
            color: AppColors.violet.withValues(alpha: 0.25),
          ),
        ),
        child: Row(
          children: [
            Container(
              width: 48,
              height: 48,
              decoration: BoxDecoration(
                color: AppColors.violet.withValues(alpha: 0.15),
                borderRadius: BorderRadius.circular(14),
              ),
              child: const Icon(
                Icons.description_rounded,
                color: AppColors.violet,
                size: 24,
              ),
            ),
            const SizedBox(width: 14),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Ton Compte-Rendu est prêt',
                    style: AppTypography.label.copyWith(
                      color: isDark ? AppColors.darkInk : AppColors.ink,
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                  const SizedBox(height: 2),
                  Text(
                    'Découvre ton analyse personnalisée',
                    style: AppTypography.bodySmall.copyWith(
                      color: isDark ? AppColors.darkInkMuted : AppColors.inkMuted,
                      fontSize: 12,
                    ),
                  ),
                ],
              ),
            ),
            Icon(
              Icons.arrow_forward_ios_rounded,
              size: 16,
              color: AppColors.violet.withValues(alpha: 0.7),
            ),
          ],
        ),
      ),
    );
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// Page de vente CTA card (gold gradient)
// ═══════════════════════════════════════════════════════════════════════════════

class _PageDeVenteCTA extends StatelessWidget {
  const _PageDeVenteCTA({required this.isDark});

  final bool isDark;

  @override
  Widget build(BuildContext context) {
    return TappableCard(
      onTap: () => context.pushNamed(RouteNames.pageDeVente),
      child: Container(
        width: double.infinity,
        padding: AppSpacing.cardPadding,
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [
              AppColors.gold.withValues(alpha: isDark ? 0.2 : 0.1),
              AppColors.goldWarm.withValues(alpha: isDark ? 0.15 : 0.06),
            ],
          ),
          borderRadius: AppRadius.borderLg,
          border: Border.all(
            color: AppColors.gold.withValues(alpha: 0.25),
          ),
        ),
        child: Row(
          children: [
            Container(
              width: 48,
              height: 48,
              decoration: BoxDecoration(
                color: AppColors.gold.withValues(alpha: 0.15),
                borderRadius: BorderRadius.circular(14),
              ),
              child: const Icon(
                Icons.auto_awesome_rounded,
                color: AppColors.gold,
                size: 24,
              ),
            ),
            const SizedBox(width: 14),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Programme adapté à ta situation',
                    style: AppTypography.label.copyWith(
                      color: isDark ? AppColors.darkInk : AppColors.ink,
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                  const SizedBox(height: 2),
                  Text(
                    'Découvre comment le programme s’adapte à toi',
                    style: AppTypography.bodySmall.copyWith(
                      color: isDark ? AppColors.darkInkMuted : AppColors.inkMuted,
                      fontSize: 12,
                    ),
                  ),
                ],
              ),
            ),
            Icon(
              Icons.arrow_forward_ios_rounded,
              size: 16,
              color: AppColors.gold.withValues(alpha: 0.7),
            ),
          ],
        ),
      ),
    );
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// Free feature card (accessible, no lock)
// ═══════════════════════════════════════════════════════════════════════════════

class _FreeFeatureCard extends StatelessWidget {
  const _FreeFeatureCard({
    required this.icon,
    required this.title,
    required this.subtitle,
    required this.color,
    required this.isDark,
    required this.onTap,
  });

  final IconData icon;
  final String title;
  final String subtitle;
  final Color color;
  final bool isDark;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return TappableCard(
      onTap: onTap,
      child: Container(
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
                color: color.withValues(alpha: 0.12),
                borderRadius: BorderRadius.circular(12),
              ),
              child: Icon(icon, color: color, size: 22),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    title,
                    style: AppTypography.label.copyWith(
                      color: isDark ? AppColors.darkInk : AppColors.ink,
                    ),
                  ),
                  const SizedBox(height: 2),
                  Text(
                    subtitle,
                    style: AppTypography.bodySmall.copyWith(
                      color: isDark ? AppColors.darkInkMuted : AppColors.inkMuted,
                      fontSize: 12,
                    ),
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                  ),
                ],
              ),
            ),
            Icon(
              Icons.arrow_forward_ios,
              size: 14,
              color: isDark ? AppColors.darkInkMuted : AppColors.inkMuted,
            ),
          ],
        ),
      ),
    );
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// Coach intro card
// ═══════════════════════════════════════════════════════════════════════════════

class _CoachIntroCard extends StatelessWidget {
  const _CoachIntroCard({required this.isDark});

  final bool isDark;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: AppSpacing.cardPadding,
      decoration: BoxDecoration(
        color: isDark ? AppColors.darkCard : AppColors.surface,
        borderRadius: AppRadius.borderLg,
        border: Border.all(
          color: isDark ? AppColors.darkBorder : AppColors.divider,
        ),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Coach avatar
          Container(
            width: 48,
            height: 48,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              border: Border.all(color: AppColors.gold, width: 2),
              color: isDark
                  ? AppColors.sage.withValues(alpha: 0.15)
                  : AppColors.sageLight,
            ),
            child: Icon(
              Icons.person_outline,
              size: 24,
              color: isDark ? AppColors.sage : AppColors.sageDeep,
            ),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Ton coach t’accompagne',
                  style: AppTypography.label.copyWith(
                    color: isDark ? AppColors.darkInk : AppColors.ink,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  'Un accompagnement bienveillant et personnalisé '
                  'pour te guider dans ta recherche de mariage.',
                  style: AppTypography.bodySmall.copyWith(
                    color: isDark ? AppColors.darkInkMuted : AppColors.inkMuted,
                  ),
                ),
                const SizedBox(height: 8),
                OutlinedButton.icon(
                  onPressed: () => context.pushNamed(RouteNames.chat),
                  icon: const Icon(Icons.chat_rounded, size: 16),
                  label: const Text('Contacter mon coach'),
                  style: OutlinedButton.styleFrom(
                    foregroundColor: AppColors.violet,
                    side: const BorderSide(color: AppColors.violet),
                    padding: const EdgeInsets.symmetric(
                      horizontal: 12,
                      vertical: 6,
                    ),
                    textStyle: AppTypography.labelSmall,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(8),
                    ),
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

// ═══════════════════════════════════════════════════════════════════════════════
// Social proof placeholder
// ═══════════════════════════════════════════════════════════════════════════════

class _SocialProofPlaceholder extends StatelessWidget {
  const _SocialProofPlaceholder({required this.isDark});

  final bool isDark;

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 80,
      width: double.infinity,
      decoration: BoxDecoration(
        borderRadius: AppRadius.borderLg,
        border: Border.all(
          color: (isDark ? AppColors.darkBorder : AppColors.divider)
              .withValues(alpha: 0.5),
          style: BorderStyle.solid,
        ),
      ),
      child: Center(
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(
              Icons.format_quote_rounded,
              size: 20,
              color: isDark ? AppColors.darkInkFaint : AppColors.inkFaint,
            ),
            const SizedBox(width: 8),
            Text(
              'T\u00e9moignages \u00e0 venir',
              style: AppTypography.bodySmall.copyWith(
                color: isDark ? AppColors.darkInkFaint : AppColors.inkFaint,
                fontStyle: FontStyle.italic,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
