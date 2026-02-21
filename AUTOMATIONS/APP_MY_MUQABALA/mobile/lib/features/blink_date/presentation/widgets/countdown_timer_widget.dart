/// Circular countdown timer for Blink Date calls.
///
/// Displays the remaining time in MM:SS format, centered inside a
/// circular progress indicator. The color transitions from green
/// (plenty of time) to orange (getting low) to red (urgent).
///
/// ```dart
/// CountdownTimerWidget(
///   timeRemaining: 342,
///   totalDuration: 600,
/// )
/// ```
library;

import 'dart:math' as math;

import 'package:flutter/material.dart';

import 'package:my_muqabala/core/constants/app_colors.dart';
import 'package:my_muqabala/core/constants/app_typography.dart';

/// A circular countdown timer that visualizes remaining time.
class CountdownTimerWidget extends StatelessWidget {
  const CountdownTimerWidget({
    required this.timeRemaining,
    required this.totalDuration,
    this.size = 180.0,
    this.strokeWidth = 8.0,
    super.key,
  });

  /// Remaining time in seconds.
  final int timeRemaining;

  /// Total duration of the round in seconds.
  final int totalDuration;

  /// Diameter of the circular indicator.
  final double size;

  /// Thickness of the progress arc.
  final double strokeWidth;

  @override
  Widget build(BuildContext context) {
    final progress = totalDuration > 0
        ? timeRemaining / totalDuration
        : 0.0;
    final color = _colorForTime(timeRemaining);
    final minutes = timeRemaining ~/ 60;
    final seconds = timeRemaining % 60;
    final timeText =
        '${minutes.toString().padLeft(2, '0')}:${seconds.toString().padLeft(2, '0')}';

    return SizedBox(
      width: size,
      height: size,
      child: Stack(
        alignment: Alignment.center,
        children: [
          // Background track.
          SizedBox(
            width: size,
            height: size,
            child: CircularProgressIndicator(
              value: 1.0,
              strokeWidth: strokeWidth,
              strokeCap: StrokeCap.round,
              valueColor: AlwaysStoppedAnimation<Color>(
                color.withValues(alpha: 0.15),
              ),
              backgroundColor: Colors.transparent,
            ),
          ),

          // Foreground progress arc.
          SizedBox(
            width: size,
            height: size,
            child: TweenAnimationBuilder<double>(
              tween: Tween<double>(begin: progress, end: progress),
              duration: const Duration(milliseconds: 300),
              curve: Curves.easeInOut,
              builder: (context, value, _) {
                return CustomPaint(
                  painter: _CircularTimerPainter(
                    progress: value,
                    color: color,
                    strokeWidth: strokeWidth,
                  ),
                );
              },
            ),
          ),

          // Time text.
          Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Text(
                timeText,
                style: AppTypography.h1.copyWith(
                  color: color,
                  fontSize: size * 0.2,
                  fontWeight: FontWeight.w700,
                  letterSpacing: 1.5,
                ),
              ),
              const SizedBox(height: 4),
              Text(
                _labelForTime(timeRemaining),
                style: AppTypography.caption.copyWith(
                  color: color.withValues(alpha: 0.7),
                  fontSize: size * 0.065,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  /// Returns the appropriate color based on remaining time.
  ///
  /// - Green (> 5 minutes): plenty of time
  /// - Orange (2-5 minutes): getting low
  /// - Red (< 2 minutes): urgent
  Color _colorForTime(int seconds) {
    if (seconds > 300) return AppColors.success;
    if (seconds > 120) return AppColors.warning;
    return AppColors.error;
  }

  /// Returns a contextual label below the time.
  String _labelForTime(int seconds) {
    if (seconds > 300) return 'Profitez de l\u2019\u00e9change';
    if (seconds > 120) return 'Le temps passe...';
    if (seconds > 30) return 'Bient\u00f4t termin\u00e9';
    return 'Derniers instants';
  }
}

/// Custom painter that draws a circular arc from the top (12 o'clock).
class _CircularTimerPainter extends CustomPainter {
  const _CircularTimerPainter({
    required this.progress,
    required this.color,
    required this.strokeWidth,
  });

  final double progress;
  final Color color;
  final double strokeWidth;

  @override
  void paint(Canvas canvas, Size size) {
    final center = Offset(size.width / 2, size.height / 2);
    final radius = (math.min(size.width, size.height) - strokeWidth) / 2;
    const startAngle = -math.pi / 2; // Start from top
    final sweepAngle = 2 * math.pi * progress;

    final paint = Paint()
      ..color = color
      ..strokeWidth = strokeWidth
      ..style = PaintingStyle.stroke
      ..strokeCap = StrokeCap.round;

    canvas.drawArc(
      Rect.fromCircle(center: center, radius: radius),
      startAngle,
      sweepAngle,
      false,
      paint,
    );

    // Draw a small glowing dot at the leading edge of the arc.
    if (progress > 0.01) {
      final dotAngle = startAngle + sweepAngle;
      final dotCenter = Offset(
        center.dx + radius * math.cos(dotAngle),
        center.dy + radius * math.sin(dotAngle),
      );

      // Glow
      final glowPaint = Paint()
        ..color = color.withValues(alpha: 0.3)
        ..maskFilter = const MaskFilter.blur(BlurStyle.normal, 6);
      canvas.drawCircle(dotCenter, strokeWidth * 0.8, glowPaint);

      // Solid dot
      final dotPaint = Paint()..color = color;
      canvas.drawCircle(dotCenter, strokeWidth * 0.5, dotPaint);
    }
  }

  @override
  bool shouldRepaint(_CircularTimerPainter oldDelegate) =>
      oldDelegate.progress != progress || oldDelegate.color != color;
}
