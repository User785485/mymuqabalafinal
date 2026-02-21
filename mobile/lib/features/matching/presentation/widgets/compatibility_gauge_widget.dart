/// Animated circular gauge widget displaying a compatibility score.
///
/// Renders a circular progress arc with a percentage in the center.
/// The arc color transitions through a gradient based on the score:
///   - Low (0-40%): [AppColors.rose]
///   - Medium (40-70%): [AppColors.gold]
///   - High (70-100%): [AppColors.violet]
///
/// Supports an entrance animation when [animated] is true.
library;

import 'dart:math' as math;

import 'package:flutter/material.dart';

import 'package:my_muqabala/core/constants/app_colors.dart';
import 'package:my_muqabala/core/constants/app_spacing.dart';
import 'package:my_muqabala/core/constants/app_typography.dart';

/// A circular gauge widget that displays a compatibility score.
class CompatibilityGaugeWidget extends StatefulWidget {
  const CompatibilityGaugeWidget({
    required this.score,
    this.size = 160,
    this.strokeWidth = 12,
    this.animated = true,
    this.animationDuration = const Duration(milliseconds: 1200),
    this.label,
    super.key,
  });

  /// The compatibility score between 0.0 and 1.0.
  final double score;

  /// The overall size (width & height) of the gauge.
  final double size;

  /// The width of the arc stroke.
  final double strokeWidth;

  /// Whether to animate the gauge filling on first build.
  final bool animated;

  /// Duration of the fill animation.
  final Duration animationDuration;

  /// Optional label displayed below the percentage.
  final String? label;

  @override
  State<CompatibilityGaugeWidget> createState() =>
      _CompatibilityGaugeWidgetState();
}

class _CompatibilityGaugeWidgetState extends State<CompatibilityGaugeWidget>
    with SingleTickerProviderStateMixin {
  late final AnimationController _controller;
  late final Animation<double> _scoreAnimation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: widget.animationDuration,
    );

    _scoreAnimation = Tween<double>(
      begin: 0,
      end: widget.score.clamp(0.0, 1.0),
    ).animate(CurvedAnimation(
      parent: _controller,
      curve: const Cubic(0.23, 1, 0.32, 1),
    ));

    if (widget.animated) {
      // Delay slightly so the widget is visible before animating.
      Future.delayed(const Duration(milliseconds: 200), () {
        if (mounted) _controller.forward();
      });
    } else {
      _controller.value = 1.0;
    }
  }

  @override
  void didUpdateWidget(CompatibilityGaugeWidget oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.score != widget.score) {
      _scoreAnimation = Tween<double>(
        begin: _scoreAnimation.value,
        end: widget.score.clamp(0.0, 1.0),
      ).animate(CurvedAnimation(
        parent: _controller,
        curve: const Cubic(0.23, 1, 0.32, 1),
      ));
      _controller
        ..reset()
        ..forward();
    }
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  /// Returns the gauge color based on the current score value.
  static Color _colorForScore(double score) {
    if (score < 0.4) return AppColors.rose;
    if (score < 0.7) return AppColors.gold;
    return AppColors.violet;
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _scoreAnimation,
      builder: (context, child) {
        final currentScore = _scoreAnimation.value;
        final percent = (currentScore * 100).round();
        final color = _colorForScore(currentScore);

        return SizedBox(
          width: widget.size,
          height: widget.size + (widget.label != null ? 28 : 0),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              // ── Circular gauge ──────────────────────────────────────
              SizedBox(
                width: widget.size,
                height: widget.size,
                child: CustomPaint(
                  painter: _GaugePainter(
                    progress: currentScore,
                    strokeWidth: widget.strokeWidth,
                    activeColor: color,
                    trackColor: color.withValues(alpha: 0.15),
                  ),
                  child: Center(
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Text(
                          '$percent%',
                          style: AppTypography.h1.copyWith(
                            color: color,
                            fontSize: widget.size * 0.22,
                            fontWeight: FontWeight.w700,
                            height: 1.0,
                          ),
                        ),
                        AppSpacing.verticalXs,
                        Text(
                          'Compatibilit\u00e9',
                          style: AppTypography.caption.copyWith(
                            color: AppColors.inkMuted,
                            fontSize: widget.size * 0.08,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ),

              // ── Optional label ──────────────────────────────────────
              if (widget.label != null) ...[
                AppSpacing.verticalSm,
                Text(
                  widget.label!,
                  style: AppTypography.labelMedium.copyWith(
                    color: color,
                    fontWeight: FontWeight.w600,
                  ),
                  textAlign: TextAlign.center,
                ),
              ],
            ],
          ),
        );
      },
    );
  }
}

// =============================================================================
// Custom painter for the circular gauge arc
// =============================================================================

class _GaugePainter extends CustomPainter {
  _GaugePainter({
    required this.progress,
    required this.strokeWidth,
    required this.activeColor,
    required this.trackColor,
  });

  final double progress;
  final double strokeWidth;
  final Color activeColor;
  final Color trackColor;

  @override
  void paint(Canvas canvas, Size size) {
    final center = Offset(size.width / 2, size.height / 2);
    final radius = (math.min(size.width, size.height) - strokeWidth) / 2;

    // Start from the top (-90 degrees).
    const startAngle = -math.pi / 2;
    final sweepAngle = 2 * math.pi * progress;

    // ── Background track ────────────────────────────────────────────────
    final trackPaint = Paint()
      ..color = trackColor
      ..style = PaintingStyle.stroke
      ..strokeWidth = strokeWidth
      ..strokeCap = StrokeCap.round;

    canvas.drawCircle(center, radius, trackPaint);

    // ── Active arc ──────────────────────────────────────────────────────
    if (progress > 0) {
      final activePaint = Paint()
        ..color = activeColor
        ..style = PaintingStyle.stroke
        ..strokeWidth = strokeWidth
        ..strokeCap = StrokeCap.round;

      canvas.drawArc(
        Rect.fromCircle(center: center, radius: radius),
        startAngle,
        sweepAngle,
        false,
        activePaint,
      );

      // ── Glow effect on the leading edge ─────────────────────────────
      final glowPaint = Paint()
        ..color = activeColor.withValues(alpha: 0.3)
        ..style = PaintingStyle.stroke
        ..strokeWidth = strokeWidth + 6
        ..strokeCap = StrokeCap.round
        ..maskFilter = const MaskFilter.blur(BlurStyle.normal, 8);

      // Only draw a small arc at the leading edge for the glow.
      final glowSweep = math.min(sweepAngle, 0.15);
      final glowStart = startAngle + sweepAngle - glowSweep;

      canvas.drawArc(
        Rect.fromCircle(center: center, radius: radius),
        glowStart,
        glowSweep,
        false,
        glowPaint,
      );
    }
  }

  @override
  bool shouldRepaint(_GaugePainter oldDelegate) =>
      oldDelegate.progress != progress ||
      oldDelegate.activeColor != activeColor;
}
