/// Pending actions list widget for the home screen.
///
/// Displays a card titled "Actions en attente" with a count badge, listing
/// all pending items (forms, feedback, documents) with priority styling
/// and navigation links.
library;

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:shimmer/shimmer.dart';

import 'package:my_muqabala/core/constants/app_colors.dart';
import 'package:my_muqabala/core/constants/app_spacing.dart';
import 'package:my_muqabala/core/constants/app_typography.dart';
import 'package:my_muqabala/features/home/data/models/home_repository.dart';
import 'package:my_muqabala/features/home/presentation/providers/home_provider.dart';

/// Card listing all pending actions for the user.
class PendingActionsWidget extends ConsumerWidget {
  const PendingActionsWidget({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final actionsAsync = ref.watch(pendingActionsProvider);

    return actionsAsync.when(
      data: (actions) {
        if (actions.isEmpty) return const SizedBox.shrink();
        return _PendingActionsCard(actions: actions);
      },
      loading: () => Shimmer.fromColors(
        baseColor: AppColors.divider,
        highlightColor: AppColors.paper,
        child: Container(
          height: 120,
          decoration: BoxDecoration(
            color: AppColors.divider,
            borderRadius: AppRadius.borderLg,
          ),
        ),
      ),
      error: (_, __) => const SizedBox.shrink(),
    );
  }
}

class _PendingActionsCard extends StatelessWidget {
  const _PendingActionsCard({required this.actions});

  final List<PendingAction> actions;

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: AppSpacing.cardPadding,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // ── Header row with count badge ─────────────────────────
            Row(
              children: [
                const Icon(
                  Icons.checklist_outlined,
                  size: 20,
                  color: AppColors.purple,
                ),
                AppSpacing.gapHSm,
                Text(
                  'Actions en attente',
                  style: AppTypography.labelLarge,
                ),
                AppSpacing.gapHSm,
                Container(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 8,
                    vertical: 2,
                  ),
                  decoration: BoxDecoration(
                    color: AppColors.purple,
                    borderRadius: AppRadius.borderCircular,
                  ),
                  child: Text(
                    actions.length.toString(),
                    style: const TextStyle(
                      fontFamily: 'Outfit',
                      fontSize: 12,
                      fontWeight: FontWeight.w600,
                      color: Colors.white,
                    ),
                  ),
                ),
              ],
            ),
            AppSpacing.gapMd,

            // ── Action items ────────────────────────────────────────
            ...actions.map((action) => _ActionItem(action: action)),
          ],
        ),
      ),
    );
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// Single Action Item
// ═══════════════════════════════════════════════════════════════════════════

class _ActionItem extends StatelessWidget {
  const _ActionItem({required this.action});

  final PendingAction action;

  @override
  Widget build(BuildContext context) {
    // Priority-based colors
    final (accentColor, bgColor) = switch (action.priority) {
      'urgent' => (AppColors.rose, AppColors.roseLight),
      'normal' => (AppColors.purple, AppColors.purpleLight),
      'info' => (AppColors.sage, AppColors.sageLight),
      _ => (AppColors.purple, AppColors.purpleLight),
    };

    // Type-based icon
    final icon = switch (action.type) {
      'form' => Icons.edit_note_outlined,
      'feedback' => Icons.rate_review_outlined,
      'document' => Icons.article_outlined,
      'photo' => Icons.photo_camera_outlined,
      'event' => Icons.event_outlined,
      _ => Icons.task_alt_outlined,
    };

    return Padding(
      padding: const EdgeInsets.only(bottom: AppSpacing.sm),
      child: GestureDetector(
        onTap: () {
          // Navigate to the relevant screen based on action.routePath
          // (to be implemented with GoRouter context.push)
        },
        child: Container(
          padding: const EdgeInsets.symmetric(
            horizontal: 12,
            vertical: 10,
          ),
          decoration: BoxDecoration(
            color: bgColor.withValues(alpha: 0.5),
            borderRadius: AppRadius.borderMd,
            border: Border.all(
              color: accentColor.withValues(alpha: 0.2),
            ),
          ),
          child: Row(
            children: [
              // Icon
              Container(
                padding: const EdgeInsets.all(6),
                decoration: BoxDecoration(
                  color: accentColor.withValues(alpha: 0.15),
                  borderRadius: AppRadius.borderSm,
                ),
                child: Icon(
                  icon,
                  size: 18,
                  color: accentColor,
                ),
              ),
              AppSpacing.gapHSm,

              // Title
              Expanded(
                child: Text(
                  action.title,
                  style: AppTypography.bodyMedium.copyWith(
                    color: AppColors.ink,
                    fontWeight: FontWeight.w500,
                  ),
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                ),
              ),
              AppSpacing.gapHSm,

              // "Voir" link
              Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text(
                    'Voir',
                    style: AppTypography.labelMedium.copyWith(
                      color: accentColor,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  AppSpacing.gapHXs,
                  Icon(
                    Icons.arrow_forward,
                    size: 14,
                    color: accentColor,
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
