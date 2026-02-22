/// Audio control buttons for Blink Date calls.
///
/// Provides two primary actions:
/// - **Mute / Unmute**: toggles the local microphone
/// - **Hang Up**: ends the current call
///
/// ```dart
/// AudioControlsWidget(
///   isMuted: false,
///   onToggleMute: () => notifier.toggleMute(),
///   onHangUp: () => notifier.endCall(),
/// )
/// ```
library;

import 'package:flutter/material.dart';

import 'package:my_muqabala/core/constants/app_colors.dart';
import 'package:my_muqabala/core/constants/app_spacing.dart';
import 'package:my_muqabala/core/constants/app_typography.dart';

/// A row of audio call control buttons (mute + hang up).
class AudioControlsWidget extends StatelessWidget {
  const AudioControlsWidget({
    required this.isMuted,
    required this.onToggleMute,
    required this.onHangUp,
    this.isConnecting = false,
    super.key,
  });

  /// Whether the microphone is currently muted.
  final bool isMuted;

  /// Callback to toggle the microphone state.
  final VoidCallback onToggleMute;

  /// Callback to hang up and end the call.
  final VoidCallback onHangUp;

  /// Whether the connection is still being established.
  final bool isConnecting;

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        // ── Mute / Unmute button ───────────────────────────────────────
        _ControlButton(
          icon: isMuted ? Icons.mic_off_rounded : Icons.mic_rounded,
          label: isMuted ? 'Activer' : 'Muet',
          backgroundColor: isMuted
              ? AppColors.warning.withValues(alpha: 0.15)
              : AppColors.surface,
          iconColor: isMuted ? AppColors.warning : AppColors.ink,
          borderColor: isMuted ? AppColors.warning : AppColors.border,
          onPressed: isConnecting ? null : onToggleMute,
        ),

        AppSpacing.horizontalXl,

        // ── Hang Up button ─────────────────────────────────────────────
        _ControlButton(
          icon: Icons.call_end_rounded,
          label: 'Raccrocher',
          backgroundColor: AppColors.error,
          iconColor: Colors.white,
          borderColor: AppColors.error,
          isLarge: true,
          onPressed: isConnecting ? null : onHangUp,
        ),
      ],
    );
  }
}

/// A single circular control button with an icon and label.
class _ControlButton extends StatelessWidget {
  const _ControlButton({
    required this.icon,
    required this.label,
    required this.backgroundColor,
    required this.iconColor,
    required this.borderColor,
    required this.onPressed,
    this.isLarge = false,
  });

  final IconData icon;
  final String label;
  final Color backgroundColor;
  final Color iconColor;
  final Color borderColor;
  final VoidCallback? onPressed;
  final bool isLarge;

  @override
  Widget build(BuildContext context) {
    final size = isLarge ? 72.0 : 60.0;
    final iconSize = isLarge ? 32.0 : 26.0;

    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        Material(
          color: Colors.transparent,
          child: InkWell(
            onTap: onPressed,
            borderRadius: BorderRadius.circular(size / 2),
            child: Container(
              width: size,
              height: size,
              decoration: BoxDecoration(
                color: backgroundColor,
                shape: BoxShape.circle,
                border: Border.all(color: borderColor, width: 1.5),
                boxShadow: [
                  BoxShadow(
                    color: borderColor.withValues(alpha: 0.2),
                    blurRadius: 12,
                    offset: const Offset(0, 4),
                  ),
                ],
              ),
              child: Icon(
                icon,
                size: iconSize,
                color: onPressed != null
                    ? iconColor
                    : iconColor.withValues(alpha: 0.4),
              ),
            ),
          ),
        ),
        const SizedBox(height: 8),
        Text(
          label,
          style: AppTypography.caption.copyWith(
            color: AppColors.inkMuted,
            fontSize: 11,
          ),
        ),
      ],
    );
  }
}
