/// Reusable empty state widget for screens with no data.
///
/// Displays a centered column with an icon, title (Cormorant font),
/// optional subtitle (Outfit muted), and an optional action button.
///
/// ```dart
/// EmptyState(
///   icon: Icons.chat_bubble_outline,
///   title: 'Aucune conversation',
///   subtitle: 'Vos conversations apparaitront ici.',
///   actionLabel: 'Demarrer',
///   onAction: () => startChat(),
/// )
/// ```
library;

import 'package:flutter/material.dart';

import 'package:my_muqabala/core/constants/app_colors.dart';
import 'package:my_muqabala/core/constants/app_spacing.dart';
import 'package:my_muqabala/core/constants/app_typography.dart';
import 'package:my_muqabala/core/widgets/muqabala_button.dart';

/// A widget displayed when a list or screen has no content to show.
///
/// The icon container has a subtle breathing (pulse) animation to add
/// life to otherwise static empty screens.
class EmptyState extends StatefulWidget {
  const EmptyState({
    required this.icon,
    required this.title,
    this.subtitle,
    this.actionLabel,
    this.onAction,
    this.iconSize = 64,
    this.iconColor,
    this.padding = const EdgeInsets.all(32),
    super.key,
  });

  /// The large icon displayed at the top.
  final IconData icon;

  /// Primary message (displayed in Cormorant display style).
  final String title;

  /// Secondary message with additional context (Outfit, muted color).
  final String? subtitle;

  /// Label for the optional action button.
  final String? actionLabel;

  /// Callback when the action button is tapped.
  final VoidCallback? onAction;

  /// Size of the top icon.
  final double iconSize;

  /// Color of the top icon. Defaults to [AppColors.inkFaint].
  final Color? iconColor;

  /// Padding around the entire widget.
  final EdgeInsets padding;

  @override
  State<EmptyState> createState() => _EmptyStateState();
}

class _EmptyStateState extends State<EmptyState>
    with SingleTickerProviderStateMixin {
  late final AnimationController _breathController;
  late final Animation<double> _breathAnimation;

  @override
  void initState() {
    super.initState();
    _breathController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 2000),
    );
    _breathAnimation = Tween<double>(begin: 1.0, end: 1.05).animate(
      CurvedAnimation(parent: _breathController, curve: Curves.easeInOut),
    );
    _breathController.repeat(reverse: true);
  }

  @override
  void dispose() {
    _breathController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final effectiveIconColor = widget.iconColor ?? (isDark ? AppColors.darkInkFaint : AppColors.inkFaint);

    return Center(
      child: Padding(
        padding: widget.padding,
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            // ── Breathing icon ─────────────────────────────────────────
            ScaleTransition(
              scale: _breathAnimation,
              child: Container(
                width: widget.iconSize * 1.5,
                height: widget.iconSize * 1.5,
                decoration: BoxDecoration(
                  color: isDark
                      ? AppColors.violet.withValues(alpha: 0.15)
                      : AppColors.purpleLight.withValues(alpha: 0.5),
                  shape: BoxShape.circle,
                ),
                child: Icon(
                  widget.icon,
                  size: widget.iconSize,
                  color: effectiveIconColor,
                ),
              ),
            ),

            AppSpacing.gapLg,

            // ── Title (Cormorant) ─────────────────────────────────────
            Text(
              widget.title,
              style: AppTypography.displaySmall.copyWith(
                color: isDark ? AppColors.darkInk : AppColors.ink,
              ),
              textAlign: TextAlign.center,
            ),

            // ── Subtitle (Outfit muted) ──────────────────────────────
            if (widget.subtitle != null) ...[
              AppSpacing.gapSm,
              Text(
                widget.subtitle!,
                style: AppTypography.bodyMedium.copyWith(
                  color: isDark ? AppColors.darkInkMuted : AppColors.inkMuted,
                ),
                textAlign: TextAlign.center,
              ),
            ],

            // ── Action button ────────────────────────────────────────
            if (widget.actionLabel != null && widget.onAction != null) ...[
              AppSpacing.gapXl,
              MuqabalaButton(
                label: widget.actionLabel!,
                onPressed: widget.onAction,
                isFullWidth: false,
                variant: MuqabalaButtonVariant.primary,
              ),
            ],
          ],
        ),
      ),
    );
  }
}
