import 'package:flutter/material.dart';

import 'package:my_muqabala/core/constants/app_colors.dart';
import 'package:my_muqabala/core/constants/app_spacing.dart';
import 'package:my_muqabala/core/constants/app_typography.dart';

/// A single settings row used throughout the profile / settings screens.
///
/// Layout:
/// ```
/// [ icon ]  title              [ trailing ]
///           subtitle (optional)
/// ```
///
/// When [isDestructive] is `true`, the icon and text are rendered in
/// [AppColors.error] red.
class SettingsTile extends StatelessWidget {
  const SettingsTile({
    required this.icon,
    required this.title,
    this.subtitle,
    this.trailing,
    this.onTap,
    this.isDestructive = false,
    super.key,
  });

  /// Leading icon (displayed in a rounded square background).
  final IconData icon;

  /// Main title text.
  final String title;

  /// Optional secondary text below the title.
  final String? subtitle;

  /// Widget shown on the right side (e.g. [Switch], [Icon], [Text]).
  /// If omitted and [onTap] is non-null, a chevron icon is shown.
  final Widget? trailing;

  /// Called when the tile is tapped.
  final VoidCallback? onTap;

  /// If `true`, title and icon use the error/red color.
  final bool isDestructive;

  @override
  Widget build(BuildContext context) {
    final foreground =
        isDestructive ? AppColors.error : AppColors.ink;
    final iconBg = isDestructive
        ? AppColors.error.withValues(alpha: 0.08)
        : AppColors.purpleLight.withValues(alpha: 0.5);
    final iconColor = isDestructive ? AppColors.error : AppColors.purple;

    return Material(
      color: Colors.transparent,
      child: InkWell(
        onTap: onTap,
        borderRadius: AppRadius.borderMd,
        splashColor: AppColors.purple.withValues(alpha: 0.06),
        highlightColor: AppColors.purple.withValues(alpha: 0.03),
        child: Padding(
          padding: const EdgeInsets.symmetric(
            horizontal: AppSpacing.md,
            vertical: 14,
          ),
          child: Row(
            children: [
              // ── Icon container ────────────────────────────────────
              Container(
                width: 40,
                height: 40,
                decoration: BoxDecoration(
                  color: iconBg,
                  borderRadius: BorderRadius.circular(10),
                ),
                child: Icon(icon, color: iconColor, size: 20),
              ),

              AppSpacing.gapHMd,

              // ── Text column ───────────────────────────────────────
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      title,
                      style: AppTypography.bodyLarge.copyWith(
                        color: foreground,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                    if (subtitle != null) ...[
                      const SizedBox(height: 2),
                      Text(
                        subtitle!,
                        style: AppTypography.bodySmall.copyWith(
                          color: AppColors.inkMuted,
                        ),
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                      ),
                    ],
                  ],
                ),
              ),

              // ── Trailing widget ───────────────────────────────────
              if (trailing != null)
                trailing!
              else if (onTap != null)
                Icon(
                  Icons.chevron_right_rounded,
                  color: AppColors.inkFaint,
                  size: 22,
                ),
            ],
          ),
        ),
      ),
    );
  }
}
