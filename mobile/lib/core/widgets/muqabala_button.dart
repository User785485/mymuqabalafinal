/// Custom button widget with 3 variants for the My Muqabala design system.
///
/// Variants:
///   - **primary** : violet linear gradient, white text, rounded 12px
///   - **secondary** : transparent background, violet border & text
///   - **text** : no border / background, violet text only
///
/// All variants support a loading state (shows [CircularProgressIndicator])
/// and an optional leading icon.
///
/// ```dart
/// MuqabalaButton(
///   label: 'Continuer',
///   onPressed: () => doSomething(),
///   variant: MuqabalaButtonVariant.primary,
///   isLoading: isSubmitting,
///   icon: Icons.arrow_forward,
/// )
/// ```
library;

import 'package:flutter/material.dart';

import 'package:my_muqabala/core/constants/app_colors.dart';

/// The visual variant of a [MuqabalaButton].
enum MuqabalaButtonVariant {
  /// Violet gradient background, white text.
  primary,

  /// Transparent background, violet border & text.
  secondary,

  /// No background or border, violet text only.
  text,
}

/// A reusable button matching the My Muqabala design system.
class MuqabalaButton extends StatelessWidget {
  const MuqabalaButton({
    required this.label,
    required this.onPressed,
    this.variant = MuqabalaButtonVariant.primary,
    this.isLoading = false,
    this.isFullWidth = true,
    this.icon,
    super.key,
  });

  /// The text displayed inside the button.
  final String label;

  /// Callback when the button is tapped. Disabled while [isLoading].
  final VoidCallback? onPressed;

  /// Visual variant (primary / secondary / text).
  final MuqabalaButtonVariant variant;

  /// When true, shows a [CircularProgressIndicator] and disables taps.
  final bool isLoading;

  /// Whether the button should expand to fill the available width.
  final bool isFullWidth;

  /// Optional leading icon displayed before the label.
  final IconData? icon;

  // ── Shared constants ──────────────────────────────────────────────────

  static const _height = 52.0;
  static const _borderRadius = BorderRadius.all(Radius.circular(12));
  static const _horizontalPadding = 24.0;
  static const _iconSpacing = 8.0;
  static const _loaderSize = 22.0;
  static const _loaderStroke = 2.5;

  static const _gradient = LinearGradient(
    colors: [AppColors.purple, Color(0xFF9333EA)],
    begin: Alignment.centerLeft,
    end: Alignment.centerRight,
  );

  static const _labelStyle = TextStyle(
    fontFamily: 'Outfit',
    fontSize: 16,
    fontWeight: FontWeight.w600,
    letterSpacing: 0.3,
  );

  @override
  Widget build(BuildContext context) {
    final effectiveOnPressed = isLoading ? null : onPressed;

    return switch (variant) {
      MuqabalaButtonVariant.primary => _buildPrimary(effectiveOnPressed),
      MuqabalaButtonVariant.secondary => _buildSecondary(effectiveOnPressed),
      MuqabalaButtonVariant.text => _buildText(effectiveOnPressed),
    };
  }

  // ── Primary variant ───────────────────────────────────────────────────

  Widget _buildPrimary(VoidCallback? effectiveOnPressed) {
    return _wrapWidth(
      child: DecoratedBox(
        decoration: BoxDecoration(
          gradient: effectiveOnPressed != null ? _gradient : null,
          color: effectiveOnPressed == null ? AppColors.inkFaint : null,
          borderRadius: _borderRadius,
          boxShadow: effectiveOnPressed != null
              ? [
                  BoxShadow(
                    color: AppColors.purple.withValues(alpha: 0.3),
                    blurRadius: 12,
                    offset: const Offset(0, 4),
                  ),
                ]
              : null,
        ),
        child: Material(
          color: Colors.transparent,
          child: InkWell(
            onTap: effectiveOnPressed,
            borderRadius: _borderRadius,
            splashColor: Colors.white.withValues(alpha: 0.15),
            highlightColor: Colors.white.withValues(alpha: 0.08),
            child: Container(
              height: _height,
              padding: const EdgeInsets.symmetric(
                horizontal: _horizontalPadding,
              ),
              alignment: Alignment.center,
              child: _buildContent(
                labelColor: Colors.white,
                loaderColor: Colors.white,
              ),
            ),
          ),
        ),
      ),
    );
  }

  // ── Secondary variant ─────────────────────────────────────────────────

  Widget _buildSecondary(VoidCallback? effectiveOnPressed) {
    return _wrapWidth(
      child: OutlinedButton(
        onPressed: effectiveOnPressed,
        style: OutlinedButton.styleFrom(
          foregroundColor: AppColors.purple,
          side: const BorderSide(color: AppColors.purple, width: 1.5),
          minimumSize: Size(isFullWidth ? double.infinity : 0, _height),
          padding: const EdgeInsets.symmetric(horizontal: _horizontalPadding),
          shape: const RoundedRectangleBorder(borderRadius: _borderRadius),
          textStyle: _labelStyle,
        ),
        child: _buildContent(
          labelColor: AppColors.purple,
          loaderColor: AppColors.purple,
        ),
      ),
    );
  }

  // ── Text variant ──────────────────────────────────────────────────────

  Widget _buildText(VoidCallback? effectiveOnPressed) {
    return _wrapWidth(
      child: TextButton(
        onPressed: effectiveOnPressed,
        style: TextButton.styleFrom(
          foregroundColor: AppColors.purple,
          minimumSize: Size(isFullWidth ? double.infinity : 0, _height),
          padding: const EdgeInsets.symmetric(horizontal: _horizontalPadding),
          shape: const RoundedRectangleBorder(borderRadius: _borderRadius),
          textStyle: _labelStyle,
        ),
        child: _buildContent(
          labelColor: AppColors.purple,
          loaderColor: AppColors.purple,
        ),
      ),
    );
  }

  // ── Shared content builder ────────────────────────────────────────────

  Widget _buildContent({
    required Color labelColor,
    required Color loaderColor,
  }) {
    if (isLoading) {
      return SizedBox(
        width: _loaderSize,
        height: _loaderSize,
        child: CircularProgressIndicator(
          strokeWidth: _loaderStroke,
          valueColor: AlwaysStoppedAnimation<Color>(loaderColor),
        ),
      );
    }

    if (icon != null) {
      return Row(
        mainAxisSize: MainAxisSize.min,
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(icon, size: 20, color: labelColor),
          const SizedBox(width: _iconSpacing),
          Text(
            label,
            style: _labelStyle.copyWith(color: labelColor),
          ),
        ],
      );
    }

    return Text(
      label,
      style: _labelStyle.copyWith(color: labelColor),
    );
  }

  // ── Width wrapper ─────────────────────────────────────────────────────

  Widget _wrapWidth({required Widget child}) {
    if (isFullWidth) {
      return SizedBox(width: double.infinity, child: child);
    }
    return child;
  }
}
