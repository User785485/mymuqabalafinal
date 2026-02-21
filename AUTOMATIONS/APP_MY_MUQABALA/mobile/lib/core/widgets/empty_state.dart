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
class EmptyState extends StatelessWidget {
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
  Widget build(BuildContext context) {
    final effectiveIconColor = iconColor ?? AppColors.inkFaint;

    return Center(
      child: Padding(
        padding: padding,
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            // ── Icon ──────────────────────────────────────────────────
            Container(
              width: iconSize * 1.5,
              height: iconSize * 1.5,
              decoration: BoxDecoration(
                color: AppColors.purpleLight.withValues(alpha: 0.5),
                shape: BoxShape.circle,
              ),
              child: Icon(
                icon,
                size: iconSize,
                color: effectiveIconColor,
              ),
            ),

            AppSpacing.gapLg,

            // ── Title (Cormorant) ─────────────────────────────────────
            Text(
              title,
              style: AppTypography.displaySmall.copyWith(
                color: AppColors.ink,
              ),
              textAlign: TextAlign.center,
            ),

            // ── Subtitle (Outfit muted) ──────────────────────────────
            if (subtitle != null) ...[
              AppSpacing.gapSm,
              Text(
                subtitle!,
                style: AppTypography.bodyMedium.copyWith(
                  color: AppColors.inkMuted,
                ),
                textAlign: TextAlign.center,
              ),
            ],

            // ── Action button ────────────────────────────────────────
            if (actionLabel != null && onAction != null) ...[
              AppSpacing.gapXl,
              MuqabalaButton(
                label: actionLabel!,
                onPressed: onAction,
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
