/// Reusable card widget for high-ticket section entries.
///
/// Displays an icon, title, progress indicator, and handles tap navigation.
library;

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import 'package:my_muqabala/core/widgets/tappable_card.dart';

import 'package:my_muqabala/core/constants/app_colors.dart';
import 'package:my_muqabala/core/constants/app_spacing.dart';
import 'package:my_muqabala/core/constants/app_typography.dart';
import 'package:my_muqabala/features/high_ticket/presentation/widgets/progress_bar_widget.dart';

class SectionCardWidget extends ConsumerWidget {
  const SectionCardWidget({
    required this.icon,
    required this.title,
    required this.color,
    required this.progressProvider,
    required this.onTap,
    this.description,
    super.key,
  });

  final IconData icon;
  final String title;
  final String? description;
  final Color color;
  final FutureProvider<Map<String, dynamic>> progressProvider;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final progressAsync = ref.watch(progressProvider);

    return TappableCard(
      onTap: onTap,
      child: Container(
        padding: AppSpacing.cardPadding,
        decoration: BoxDecoration(
          color: isDark ? AppColors.darkSurface : AppColors.surface,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(
            color: color.withValues(alpha: 0.2),
          ),
          boxShadow: [
            BoxShadow(
              color: color.withValues(alpha: 0.06),
              blurRadius: 12,
              offset: const Offset(0, 4),
            ),
          ],
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Icon
            Container(
              width: 44,
              height: 44,
              decoration: BoxDecoration(
                color: color.withValues(alpha: 0.12),
                borderRadius: BorderRadius.circular(12),
              ),
              child: Icon(icon, color: color, size: 24),
            ),
            AppSpacing.gapMd,
            // Title
            Text(
              title,
              style: AppTypography.label.copyWith(
                color: isDark ? AppColors.darkInk : AppColors.ink,
                fontSize: 15,
              ),
            ),
            if (description != null) ...[
              const SizedBox(height: 2),
              Text(
                description!,
                style: AppTypography.bodySmall.copyWith(
                  color: isDark ? AppColors.darkInkMuted : AppColors.inkMuted,
                  fontSize: 10,
                ),
                maxLines: 2,
                overflow: TextOverflow.ellipsis,
              ),
            ],
            const Spacer(),
            // Progress
            progressAsync.when(
              data: (progress) {
                final percentage = progress['percentage'] as int? ?? 0;
                final completed = progress['completed'] as int? ?? 0;
                final total = progress['total'] as int? ?? 0;
                return Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    ProgressBarWidget(
                      percentage: percentage,
                      color: color,
                    ),
                    AppSpacing.gapXs,
                    Text(
                      '$completed/$total',
                      style: AppTypography.bodySmall.copyWith(
                        color: isDark
                            ? AppColors.darkInkMuted
                            : AppColors.inkMuted,
                        fontSize: 11,
                      ),
                    ),
                  ],
                );
              },
              loading: () => const LinearProgressIndicator(
                backgroundColor: Colors.transparent,
                valueColor: AlwaysStoppedAnimation(AppColors.violet),
              ),
              error: (_, __) => const SizedBox.shrink(),
            ),
          ],
        ),
      ),
    );
  }
}
