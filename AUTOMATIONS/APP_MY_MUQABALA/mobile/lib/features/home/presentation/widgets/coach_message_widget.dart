/// Coach message card widget for the home screen.
///
/// Displays the latest message from the user's coach with a sage accent,
/// coach avatar with a gold ring, message preview (max 2 lines), and
/// relative date. Tapping navigates to the coaching chat.
library;

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:shimmer/shimmer.dart';

import 'package:my_muqabala/core/constants/app_colors.dart';
import 'package:my_muqabala/core/constants/app_spacing.dart';
import 'package:my_muqabala/core/constants/app_typography.dart';
import 'package:my_muqabala/core/utils/date_utils.dart';
import 'package:my_muqabala/features/home/presentation/providers/home_provider.dart';

/// Card showing the latest coach message.
class CoachMessageWidget extends ConsumerWidget {
  const CoachMessageWidget({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final messageAsync = ref.watch(coachMessageProvider);

    return messageAsync.when(
      data: (message) {
        if (message == null) return const SizedBox.shrink();
        return _CoachMessageCard(message: message);
      },
      loading: () => Shimmer.fromColors(
        baseColor: AppColors.divider,
        highlightColor: AppColors.paper,
        child: Container(
          height: 90,
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

class _CoachMessageCard extends StatelessWidget {
  const _CoachMessageCard({required this.message});

  final Map<String, dynamic> message;

  @override
  Widget build(BuildContext context) {
    final titre = message['titre'] as String? ?? 'Message de votre coach';
    final body = message['corps'] as String? ?? '';
    final createdAt = message['created_at'] as String?;

    final relativeDate = createdAt != null
        ? AppDateUtils.formatRelative(DateTime.parse(createdAt).toLocal())
        : '';

    return GestureDetector(
      onTap: () {
        // Navigate to coaching chat (to be implemented)
      },
      child: Container(
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: AppRadius.borderLg,
          border: Border.all(color: AppColors.divider),
          boxShadow: [
            BoxShadow(
              color: AppColors.sage.withValues(alpha: 0.08),
              blurRadius: 12,
              offset: const Offset(0, 2),
            ),
          ],
        ),
        child: Padding(
          padding: AppSpacing.cardPadding,
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // ── Coach avatar with gold ring ────────────────────────
              const _CoachAvatar(),
              AppSpacing.gapHMd,

              // ── Message content ────────────────────────────────────
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // Title row with date
                    Row(
                      children: [
                        Expanded(
                          child: Text(
                            titre,
                            style: AppTypography.labelLarge.copyWith(
                              color: AppColors.sageDeep,
                            ),
                            maxLines: 1,
                            overflow: TextOverflow.ellipsis,
                          ),
                        ),
                        if (relativeDate.isNotEmpty)
                          Text(
                            relativeDate,
                            style: AppTypography.labelSmall.copyWith(
                              color: AppColors.inkFaint,
                            ),
                          ),
                      ],
                    ),
                    AppSpacing.gapXs,

                    // Message preview (max 2 lines)
                    Text(
                      body,
                      style: AppTypography.bodyMedium.copyWith(
                        color: AppColors.inkSoft,
                      ),
                      maxLines: 2,
                      overflow: TextOverflow.ellipsis,
                    ),
                    AppSpacing.gapSm,

                    // Tap hint
                    Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        const Icon(
                          Icons.chat_bubble_outline,
                          size: 14,
                          color: AppColors.sage,
                        ),
                        AppSpacing.gapHXs,
                        Text(
                          'Repondre',
                          style: AppTypography.labelMedium.copyWith(
                            color: AppColors.sage,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// Coach Avatar with Gold Ring
// ═══════════════════════════════════════════════════════════════════════════

class _CoachAvatar extends StatelessWidget {
  const _CoachAvatar();

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 48,
      height: 48,
      decoration: BoxDecoration(
        shape: BoxShape.circle,
        border: Border.all(
          color: AppColors.gold,
          width: 2.5,
        ),
        boxShadow: [
          BoxShadow(
            color: AppColors.gold.withValues(alpha: 0.25),
            blurRadius: 8,
            spreadRadius: 1,
          ),
        ],
      ),
      child: Container(
        decoration: const BoxDecoration(
          shape: BoxShape.circle,
          color: AppColors.sageLight,
        ),
        child: const Center(
          child: Icon(
            Icons.person_outline,
            size: 24,
            color: AppColors.sageDeep,
          ),
        ),
      ),
    );
  }
}
