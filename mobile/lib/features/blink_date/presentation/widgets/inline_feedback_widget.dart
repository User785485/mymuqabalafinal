/// Compact inline feedback form for post-Blink Date evaluation.
///
/// Collects two pieces of feedback:
/// 1. A star rating (1-5) for the conversation quality
/// 2. A yes/no/maybe response about wanting to see the person again
///
/// ```dart
/// InlineFeedbackWidget(
///   onSubmit: (answers) => notifier.submitFeedback(answers),
///   onSkip: () => notifier.skipFeedback(),
///   isSubmitting: false,
/// )
/// ```
library;

import 'package:flutter/material.dart';

import 'package:my_muqabala/core/constants/app_colors.dart';
import 'package:my_muqabala/core/constants/app_spacing.dart';
import 'package:my_muqabala/core/constants/app_typography.dart';
import 'package:my_muqabala/core/widgets/muqabala_button.dart';

/// Inline feedback form displayed after a Blink Date round ends.
class InlineFeedbackWidget extends StatefulWidget {
  const InlineFeedbackWidget({
    required this.onSubmit,
    required this.onSkip,
    this.isSubmitting = false,
    this.roundNumber,
    super.key,
  });

  /// Callback with the collected feedback answers.
  ///
  /// The map contains:
  /// - `'note'`: int (1-5) — star rating
  /// - `'revoir'`: String ('oui', 'non', 'peut_etre') — interest
  final void Function(Map<String, dynamic> answers) onSubmit;

  /// Callback when the user chooses to skip feedback.
  final VoidCallback onSkip;

  /// Whether the feedback is currently being submitted.
  final bool isSubmitting;

  /// Optional round number for display context.
  final int? roundNumber;

  @override
  State<InlineFeedbackWidget> createState() => _InlineFeedbackWidgetState();
}

class _InlineFeedbackWidgetState extends State<InlineFeedbackWidget>
    with SingleTickerProviderStateMixin {
  int _rating = 0; // 0 = not selected, 1-5 = stars
  String? _revoir; // 'oui', 'non', 'peut_etre'
  late final AnimationController _animController;
  late final Animation<double> _fadeAnimation;

  @override
  void initState() {
    super.initState();
    _animController = AnimationController(
      duration: const Duration(milliseconds: 400),
      vsync: this,
    );
    _fadeAnimation = CurvedAnimation(
      parent: _animController,
      curve: Curves.easeOut,
    );
    _animController.forward();
  }

  @override
  void dispose() {
    _animController.dispose();
    super.dispose();
  }

  bool get _isComplete => _rating > 0 && _revoir != null;

  void _submit() {
    if (!_isComplete) return;
    widget.onSubmit({
      'note': _rating,
      'revoir': _revoir,
    });
  }

  @override
  Widget build(BuildContext context) {
    return FadeTransition(
      opacity: _fadeAnimation,
      child: Container(
        width: double.infinity,
        padding: const EdgeInsets.all(24),
        decoration: BoxDecoration(
          color: AppColors.surface,
          borderRadius: BorderRadius.circular(20),
          border: Border.all(color: AppColors.border, width: 1),
          boxShadow: [
            BoxShadow(
              color: AppColors.shadowLight,
              blurRadius: 20,
              offset: const Offset(0, 8),
            ),
          ],
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            // ── Header ───────────────────────────────────────────────────
            Text(
              widget.roundNumber != null
                  ? '\u00c9change ${widget.roundNumber} termin\u00e9'
                  : '\u00c9change termin\u00e9',
              style: AppTypography.h3.copyWith(color: AppColors.ink),
            ),
            AppSpacing.gapSm,
            Text(
              'Prenez un instant pour donner votre ressenti.',
              style: AppTypography.bodySmall.copyWith(
                color: AppColors.inkMuted,
              ),
              textAlign: TextAlign.center,
            ),

            AppSpacing.gapLg,

            // ── Star Rating ──────────────────────────────────────────────
            Text(
              'Comment \u00e9valuez-vous cette conversation ?',
              style: AppTypography.label.copyWith(
                color: AppColors.inkSoft,
              ),
            ),
            AppSpacing.gapSm,
            _StarRating(
              rating: _rating,
              onChanged: (value) => setState(() => _rating = value),
            ),

            AppSpacing.gapLg,

            // ── Revoir Question ──────────────────────────────────────────
            Text(
              'Souhaitez-vous revoir cette personne ?',
              style: AppTypography.label.copyWith(
                color: AppColors.inkSoft,
              ),
            ),
            AppSpacing.gapSm,
            _RevoirButtons(
              selected: _revoir,
              onChanged: (value) => setState(() => _revoir = value),
            ),

            AppSpacing.gapXl,

            // ── Submit button ────────────────────────────────────────────
            MuqabalaButton(
              label: 'Valider',
              onPressed: _isComplete ? _submit : null,
              isLoading: widget.isSubmitting,
              variant: MuqabalaButtonVariant.primary,
              icon: Icons.check_rounded,
            ),

            AppSpacing.gapSm,

            // ── Skip button ──────────────────────────────────────────────
            MuqabalaButton(
              label: 'Passer',
              onPressed: widget.isSubmitting ? null : widget.onSkip,
              variant: MuqabalaButtonVariant.text,
            ),
          ],
        ),
      ),
    );
  }
}

// ── Star Rating Widget ───────────────────────────────────────────────────────

class _StarRating extends StatelessWidget {
  const _StarRating({
    required this.rating,
    required this.onChanged,
  });

  final int rating;
  final ValueChanged<int> onChanged;

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: List.generate(5, (index) {
        final starValue = index + 1;
        final isSelected = starValue <= rating;

        return GestureDetector(
          onTap: () => onChanged(starValue),
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 6),
            child: AnimatedScale(
              scale: isSelected ? 1.15 : 1.0,
              duration: const Duration(milliseconds: 200),
              child: Icon(
                isSelected ? Icons.star_rounded : Icons.star_outline_rounded,
                size: 40,
                color: isSelected ? AppColors.gold : AppColors.inkFaint,
              ),
            ),
          ),
        );
      }),
    );
  }
}

// ── Revoir Buttons Widget ────────────────────────────────────────────────────

class _RevoirButtons extends StatelessWidget {
  const _RevoirButtons({
    required this.selected,
    required this.onChanged,
  });

  final String? selected;
  final ValueChanged<String> onChanged;

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Expanded(
          child: _RevoirOption(
            label: 'Oui',
            value: 'oui',
            icon: Icons.favorite_rounded,
            selectedColor: AppColors.success,
            isSelected: selected == 'oui',
            onTap: () => onChanged('oui'),
          ),
        ),
        AppSpacing.horizontalSm,
        Expanded(
          child: _RevoirOption(
            label: 'Peut-\u00eatre',
            value: 'peut_etre',
            icon: Icons.help_outline_rounded,
            selectedColor: AppColors.warning,
            isSelected: selected == 'peut_etre',
            onTap: () => onChanged('peut_etre'),
          ),
        ),
        AppSpacing.horizontalSm,
        Expanded(
          child: _RevoirOption(
            label: 'Non',
            value: 'non',
            icon: Icons.close_rounded,
            selectedColor: AppColors.error,
            isSelected: selected == 'non',
            onTap: () => onChanged('non'),
          ),
        ),
      ],
    );
  }
}

class _RevoirOption extends StatelessWidget {
  const _RevoirOption({
    required this.label,
    required this.value,
    required this.icon,
    required this.selectedColor,
    required this.isSelected,
    required this.onTap,
  });

  final String label;
  final String value;
  final IconData icon;
  final Color selectedColor;
  final bool isSelected;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 250),
        curve: Curves.easeOutCubic,
        padding: const EdgeInsets.symmetric(vertical: 14, horizontal: 8),
        decoration: BoxDecoration(
          color: isSelected
              ? selectedColor.withValues(alpha: 0.12)
              : AppColors.paper,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(
            color: isSelected ? selectedColor : AppColors.border,
            width: isSelected ? 2 : 1,
          ),
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(
              icon,
              size: 24,
              color: isSelected ? selectedColor : AppColors.inkMuted,
            ),
            const SizedBox(height: 6),
            Text(
              label,
              style: AppTypography.labelMedium.copyWith(
                color: isSelected ? selectedColor : AppColors.inkMuted,
                fontWeight: isSelected ? FontWeight.w600 : FontWeight.w500,
              ),
              textAlign: TextAlign.center,
            ),
          ],
        ),
      ),
    );
  }
}
