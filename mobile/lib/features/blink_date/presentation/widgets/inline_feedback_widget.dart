/// Binary feedback form for post-Blink Date evaluation.
///
/// Collects a single yes/no response:
/// - "J'aimerais aller plus loin" → `onSubmit(true)`
/// - "Je ne souhaite pas continuer" → `onSubmit(false)`
///
/// ```dart
/// InlineFeedbackWidget(
///   onSubmit: (wantsToContinue) => notifier.submitFeedback(wantsToContinue),
///   onSkip: () => notifier.skipFeedback(),
///   isSubmitting: false,
/// )
/// ```
library;

import 'package:flutter/material.dart';

import 'package:my_muqabala/core/constants/app_colors.dart';
import 'package:my_muqabala/core/constants/app_spacing.dart';
import 'package:my_muqabala/core/constants/app_typography.dart';

/// Inline feedback form displayed after a Blink Date round ends.
class InlineFeedbackWidget extends StatefulWidget {
  const InlineFeedbackWidget({
    required this.onSubmit,
    required this.onSkip,
    this.isSubmitting = false,
    this.roundNumber,
    this.partnerPrenom,
    super.key,
  });

  /// Callback with the binary feedback.
  final void Function(bool wantsToContinue) onSubmit;

  /// Callback when the user chooses to skip feedback.
  final VoidCallback onSkip;

  /// Whether the feedback is currently being submitted.
  final bool isSubmitting;

  /// Optional round number for display context.
  final int? roundNumber;

  /// Optional partner name for personalized message.
  final String? partnerPrenom;

  @override
  State<InlineFeedbackWidget> createState() => _InlineFeedbackWidgetState();
}

class _InlineFeedbackWidgetState extends State<InlineFeedbackWidget>
    with SingleTickerProviderStateMixin {
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
              'Souhaitez-vous aller plus loin avec ${widget.partnerPrenom ?? 'cette personne'} ?',
              style: AppTypography.bodySmall.copyWith(
                color: AppColors.inkMuted,
              ),
              textAlign: TextAlign.center,
            ),

            AppSpacing.gapXl,

            // ── Continue button (green) ──────────────────────────────────
            SizedBox(
              width: double.infinity,
              child: _FeedbackButton(
                label: "J'aimerais aller plus loin",
                icon: Icons.favorite_rounded,
                color: AppColors.success,
                isLoading: widget.isSubmitting,
                onPressed: widget.isSubmitting
                    ? null
                    : () => widget.onSubmit(true),
              ),
            ),

            AppSpacing.gapMd,

            // ── Decline button (neutral) ─────────────────────────────────
            SizedBox(
              width: double.infinity,
              child: _FeedbackButton(
                label: 'Je ne souhaite pas continuer',
                icon: Icons.close_rounded,
                color: AppColors.inkMuted,
                isLoading: false,
                onPressed: widget.isSubmitting
                    ? null
                    : () => widget.onSubmit(false),
              ),
            ),

            AppSpacing.gapLg,

            // ── Skip link ────────────────────────────────────────────────
            GestureDetector(
              onTap: widget.isSubmitting ? null : widget.onSkip,
              child: Text(
                'Passer',
                style: AppTypography.labelMedium.copyWith(
                  color: AppColors.inkFaint,
                  decoration: TextDecoration.underline,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

// ── Feedback Button ─────────────────────────────────────────────────────────

class _FeedbackButton extends StatelessWidget {
  const _FeedbackButton({
    required this.label,
    required this.icon,
    required this.color,
    required this.isLoading,
    required this.onPressed,
  });

  final String label;
  final IconData icon;
  final Color color;
  final bool isLoading;
  final VoidCallback? onPressed;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onPressed,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 250),
        curve: Curves.easeOutCubic,
        padding: const EdgeInsets.symmetric(vertical: 16, horizontal: 20),
        decoration: BoxDecoration(
          color: color.withValues(alpha: 0.08),
          borderRadius: BorderRadius.circular(14),
          border: Border.all(
            color: color.withValues(alpha: 0.25),
            width: 1.5,
          ),
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            if (isLoading)
              SizedBox(
                width: 20,
                height: 20,
                child: CircularProgressIndicator(
                  strokeWidth: 2,
                  valueColor: AlwaysStoppedAnimation<Color>(color),
                ),
              )
            else
              Icon(icon, size: 22, color: color),
            const SizedBox(width: 12),
            Flexible(
              child: Text(
                label,
                style: AppTypography.label.copyWith(
                  color: color,
                  fontWeight: FontWeight.w600,
                ),
                textAlign: TextAlign.center,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
