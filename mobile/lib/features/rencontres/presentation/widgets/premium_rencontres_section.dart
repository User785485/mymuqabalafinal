/// Premium section within the Rencontres Hub.
///
/// Shows 2 cards (Plan d'Action + Assistante Amoureuse) wrapped in
/// [PremiumGateWidget] for non-premium users.
library;

import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import 'package:my_muqabala/core/constants/app_colors.dart';
import 'package:my_muqabala/core/constants/app_spacing.dart';
import 'package:my_muqabala/core/constants/app_typography.dart';
import 'package:my_muqabala/core/router/route_names.dart';
import 'package:my_muqabala/core/widgets/premium_gate_widget.dart';

class PremiumRencontresSection extends StatelessWidget {
  const PremiumRencontresSection({super.key});

  @override
  Widget build(BuildContext context) {
    return PremiumGateWidget(
      message: 'Débloquez l\u2019accompagnement premium rencontres',
      child: _PremiumContent(),
    );
  }
}

class _PremiumContent extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Column(
      children: [
        _PremiumCard(
          icon: Icons.timeline_rounded,
          title: 'Plan d\u2019Action Rencontres',
          subtitle: 'Stratégies et objectifs pour vos rencontres',
          color: AppColors.rose,
          onTap: () => context.pushNamed(RouteNames.planAction),
          isDark: isDark,
        ),
        AppSpacing.gapSm,
        _PremiumCard(
          icon: Icons.chat_bubble_outline_rounded,
          title: 'Assistante Amoureuse',
          subtitle: 'Guidance personnalisée par chat',
          color: AppColors.violet,
          onTap: () => context.pushNamed(RouteNames.chat),
          isDark: isDark,
        ),
      ],
    );
  }
}

class _PremiumCard extends StatelessWidget {
  const _PremiumCard({
    required this.icon,
    required this.title,
    required this.subtitle,
    required this.color,
    required this.onTap,
    required this.isDark,
  });

  final IconData icon;
  final String title;
  final String subtitle;
  final Color color;
  final VoidCallback onTap;
  final bool isDark;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        width: double.infinity,
        padding: AppSpacing.cardPadding,
        decoration: BoxDecoration(
          color: isDark ? AppColors.darkCard : AppColors.surface,
          borderRadius: AppRadius.borderLg,
          border: Border.all(
            color: color.withValues(alpha: 0.2),
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
                    title,
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
