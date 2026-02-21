/// Marketing upsell widget for non high-ticket users.
///
/// Shown in the "Espace Premium" tab when the user does not have
/// `is_high_ticket = true` on their profile.
library;

import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import 'package:my_muqabala/core/constants/app_colors.dart';
import 'package:my_muqabala/core/constants/app_spacing.dart';
import 'package:my_muqabala/core/constants/app_typography.dart';
import 'package:my_muqabala/core/router/route_names.dart';

class PremiumUpsellWidget extends StatelessWidget {
  const PremiumUpsellWidget({super.key});

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return SingleChildScrollView(
      padding: AppSpacing.screenPadding,
      child: Column(
        children: [
          AppSpacing.gapLg,
          // ── Card with gradient ───────────────────────────────────────
          Container(
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
              borderRadius: BorderRadius.circular(20),
              border: Border.all(
                color: AppColors.violet.withValues(alpha: 0.15),
              ),
            ),
            child: Column(
              children: [
                // Diamond icon
                Container(
                  width: 64,
                  height: 64,
                  decoration: BoxDecoration(
                    color: AppColors.violet.withValues(alpha: 0.15),
                    shape: BoxShape.circle,
                  ),
                  child: const Icon(
                    Icons.diamond_rounded,
                    color: AppColors.violet,
                    size: 32,
                  ),
                ),
                AppSpacing.gapLg,
                Text(
                  'Acc\u00e9dez \u00e0 l\u2019accompagnement Premium',
                  style: AppTypography.h2.copyWith(
                    color: isDark ? AppColors.darkInk : AppColors.ink,
                    fontSize: 22,
                  ),
                  textAlign: TextAlign.center,
                ),
                AppSpacing.gapMd,
                Text(
                  'D\u00e9bloquez un accompagnement personnalis\u00e9 complet avec\u00a0:',
                  style: AppTypography.bodyMedium.copyWith(
                    color: isDark ? AppColors.darkInkMuted : AppColors.inkMuted,
                  ),
                  textAlign: TextAlign.center,
                ),
                AppSpacing.gapLg,
                // Feature list
                _FeatureRow(
                  icon: Icons.quiz_outlined,
                  title: 'Formulaires exploratoires',
                  subtitle: 'Sc\u00e9narios et questionnaires personnalis\u00e9s',
                  isDark: isDark,
                ),
                AppSpacing.gapMd,
                _FeatureRow(
                  icon: Icons.map_outlined,
                  title: 'Cartographie \u00e9motionnelle',
                  subtitle: '20 documents d\u2019exploration int\u00e9rieure',
                  isDark: isDark,
                ),
                AppSpacing.gapMd,
                _FeatureRow(
                  icon: Icons.school_outlined,
                  title: 'Ressources p\u00e9dagogiques',
                  subtitle: 'Programme de 48 semaines + Ramadan',
                  isDark: isDark,
                ),
                AppSpacing.gapMd,
                _FeatureRow(
                  icon: Icons.timeline_outlined,
                  title: 'Plan d\u2019action',
                  subtitle: 'Objectifs et bilans mensuels',
                  isDark: isDark,
                ),
                AppSpacing.gapMd,
                _FeatureRow(
                  icon: Icons.chat_bubble_outlined,
                  title: 'Assistante Amoureuse',
                  subtitle: 'Accompagnement personnalis\u00e9 par chat',
                  isDark: isDark,
                ),
                AppSpacing.gapXl,
                // CTA
                SizedBox(
                  width: double.infinity,
                  child: FilledButton.icon(
                    onPressed: () {
                      context.pushNamed(RouteNames.chat);
                    },
                    icon: const Icon(Icons.chat_rounded),
                    label: const Text('Contacter mon coach'),
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
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _FeatureRow extends StatelessWidget {
  const _FeatureRow({
    required this.icon,
    required this.title,
    required this.subtitle,
    required this.isDark,
  });

  final IconData icon;
  final String title;
  final String subtitle;
  final bool isDark;

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Container(
          width: 40,
          height: 40,
          decoration: BoxDecoration(
            color: AppColors.violet.withValues(alpha: 0.1),
            borderRadius: BorderRadius.circular(10),
          ),
          child: Icon(icon, color: AppColors.violet, size: 20),
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
              Text(
                subtitle,
                style: AppTypography.bodySmall.copyWith(
                  color: isDark ? AppColors.darkInkMuted : AppColors.inkMuted,
                  fontSize: 12,
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }
}
