/// Conversation prompt card for Blink Date rounds.
///
/// Displays a suggested conversation topic in an elegant card with
/// a violet-tinted background and a decorative icon. Used within the
/// Blink Date screen to guide participants through their exchange.
///
/// ```dart
/// ConversationPromptCard(
///   prompt: 'Quelle est votre vision du mariage ?',
/// )
/// ```
library;

import 'package:flutter/material.dart';

import 'package:my_muqabala/core/constants/app_colors.dart';
import 'package:my_muqabala/core/constants/app_spacing.dart';
import 'package:my_muqabala/core/constants/app_typography.dart';

/// A card that displays a conversation prompt / topic suggestion.
class ConversationPromptCard extends StatelessWidget {
  const ConversationPromptCard({
    required this.prompt,
    this.index,
    super.key,
  });

  /// The conversation topic or question to display.
  final String prompt;

  /// Optional index number displayed as a label (e.g. "Sujet 1").
  final int? index;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppColors.violetLight,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(
          color: AppColors.violet.withValues(alpha: 0.15),
          width: 1,
        ),
        boxShadow: [
          BoxShadow(
            color: AppColors.violet.withValues(alpha: 0.06),
            blurRadius: 12,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // ── Decorative icon ────────────────────────────────────────────
          Container(
            width: 40,
            height: 40,
            decoration: BoxDecoration(
              color: AppColors.violet.withValues(alpha: 0.12),
              borderRadius: BorderRadius.circular(12),
            ),
            child: const Icon(
              Icons.chat_bubble_outline_rounded,
              color: AppColors.violet,
              size: 20,
            ),
          ),

          AppSpacing.horizontalMd,

          // ── Text content ───────────────────────────────────────────────
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                if (index != null) ...[
                  Text(
                    'Sujet ${index!}',
                    style: AppTypography.labelSmall.copyWith(
                      color: AppColors.violet,
                      fontWeight: FontWeight.w600,
                      letterSpacing: 0.8,
                    ),
                  ),
                  const SizedBox(height: 4),
                ],
                Text(
                  prompt,
                  style: AppTypography.bodyMedium.copyWith(
                    color: AppColors.ink,
                    height: 1.5,
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

/// A horizontally scrollable list of [ConversationPromptCard]s.
///
/// Used when there are multiple prompts to display in a compact area.
class ConversationPromptList extends StatelessWidget {
  const ConversationPromptList({
    required this.prompts,
    super.key,
  });

  /// The list of conversation prompts to display.
  final List<String> prompts;

  @override
  Widget build(BuildContext context) {
    if (prompts.isEmpty) {
      return Container(
        width: double.infinity,
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: AppColors.violetLight,
          borderRadius: BorderRadius.circular(16),
        ),
        child: Row(
          children: [
            const Icon(
              Icons.lightbulb_outline_rounded,
              color: AppColors.violet,
              size: 20,
            ),
            AppSpacing.horizontalSm,
            Expanded(
              child: Text(
                'Laissez la conversation se d\u00e9rouler naturellement...',
                style: AppTypography.bodyMedium.copyWith(
                  color: AppColors.inkMuted,
                  fontStyle: FontStyle.italic,
                ),
              ),
            ),
          ],
        ),
      );
    }

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.only(left: 4, bottom: 8),
          child: Text(
            'Sujets de conversation',
            style: AppTypography.label.copyWith(
              color: AppColors.inkSoft,
            ),
          ),
        ),
        ...List.generate(
          prompts.length,
          (i) => Padding(
            padding: EdgeInsets.only(
              bottom: i < prompts.length - 1 ? 10 : 0,
            ),
            child: ConversationPromptCard(
              prompt: prompts[i],
              index: i + 1,
            ),
          ),
        ),
      ],
    );
  }
}
