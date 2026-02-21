/// High-ticket hub widget — grid of the 6 premium sections.
///
/// Shown in the "Espace Premium" tab when the user has
/// `is_high_ticket = true` on their profile.
library;

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

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
      padding: AppSpacing.screenPadding,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Votre accompagnement',
            style: AppTypography.h3.copyWith(
              color: isDark ? AppColors.darkInk : AppColors.ink,
            ),
          ),
          AppSpacing.gapSm,
          Text(
            'Acc\u00e9dez \u00e0 vos outils d\u2019accompagnement personnalis\u00e9',
            style: AppTypography.bodySmall.copyWith(
              color: isDark ? AppColors.darkInkMuted : AppColors.inkMuted,
            ),
          ),
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
                title: 'Formulaires',
                color: AppColors.violet,
                progressProvider: sectionProgressProvider('formulaires'),
                onTap: () => context.pushNamed(RouteNames.formulaires),
              ),
              SectionCardWidget(
                icon: Icons.map_rounded,
                title: 'Cartographie',
                color: const Color(0xFF0D9488), // teal
                progressProvider: sectionProgressProvider('cartographie'),
                onTap: () => context.pushNamed(RouteNames.cartographie),
              ),
              SectionCardWidget(
                icon: Icons.school_rounded,
                title: 'Ressources',
                color: const Color(0xFFD97706), // amber
                progressProvider: sectionProgressProvider('ressources'),
                onTap: () => context.pushNamed(RouteNames.ressources),
              ),
              SectionCardWidget(
                icon: Icons.timeline_rounded,
                title: 'Plan d\u2019Action',
                color: AppColors.rose,
                progressProvider: sectionProgressProvider('plan_action'),
                onTap: () => context.pushNamed(RouteNames.planAction),
              ),
              SectionCardWidget(
                icon: Icons.description_rounded,
                title: 'Documents Coach',
                color: AppColors.sage,
                progressProvider: sectionProgressProvider('documents'),
                onTap: () => context.pushNamed(RouteNames.documentViewer,
                    pathParameters: {'documentId': 'list'}),
              ),
              SectionCardWidget(
                icon: Icons.chat_bubble_outline_rounded,
                title: 'Assistante Amoureuse',
                color: AppColors.rose,
                progressProvider: sectionProgressProvider('assistante'),
                onTap: () => context.pushNamed(RouteNames.chat),
              ),
            ],
          ),
          AppSpacing.gapXxl,
        ],
      ),
    );
  }
}
