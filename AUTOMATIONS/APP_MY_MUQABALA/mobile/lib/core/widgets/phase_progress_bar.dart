/// 4-step progress bar showing the My Muqabala relationship phases.
///
/// Phases:
///   1. Matching
///   2. Découverte
///   3. Approfondissement
///   4. Engagement
///
/// Active step: violet, completed: sage with checkmark, pending: grey.
/// Animated connector lines between steps.
///
/// ```dart
/// PhaseProgressBar(currentPhase: 2) // Découverte active
/// ```
library;

import 'package:flutter/material.dart';

import 'package:my_muqabala/core/constants/app_colors.dart';
import 'package:my_muqabala/core/constants/app_typography.dart';

/// Displays a 4-phase progress bar for the My Muqabala journey.
class PhaseProgressBar extends StatelessWidget {
  const PhaseProgressBar({
    required this.currentPhase,
    this.showLabels = true,
    this.animate = true,
    super.key,
  }) : assert(
         currentPhase >= 1 && currentPhase <= 4,
         'currentPhase must be between 1 and 4',
       );

  /// The current active phase (1-based, range 1..4).
  final int currentPhase;

  /// Whether to display labels under each step.
  final bool showLabels;

  /// Whether to animate the progress transitions.
  final bool animate;

  static const _phases = [
    'Matching',
    'Découverte',
    'Approfondissement',
    'Engagement',
  ];

  static const _phaseIcons = [
    Icons.favorite_outline_rounded,
    Icons.explore_outlined,
    Icons.psychology_outlined,
    Icons.handshake_outlined,
  ];

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        return Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            // ── Steps row ──────────────────────────────────────────
            Row(
              children: List.generate(
                _phases.length * 2 - 1,
                (index) {
                  // Even indices = step circles, odd = connectors
                  if (index.isEven) {
                    final stepIndex = index ~/ 2;
                    final stepNumber = stepIndex + 1;
                    return _StepCircle(
                      stepNumber: stepNumber,
                      currentPhase: currentPhase,
                      icon: _phaseIcons[stepIndex],
                      animate: animate,
                    );
                  } else {
                    final leftStep = (index ~/ 2) + 1;
                    return Expanded(
                      child: _ConnectorLine(
                        isCompleted: leftStep < currentPhase,
                        animate: animate,
                      ),
                    );
                  }
                },
              ),
            ),

            // ── Labels row ─────────────────────────────────────────
            if (showLabels) ...[
              const SizedBox(height: 8),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: List.generate(
                  _phases.length,
                  (index) {
                    final stepNumber = index + 1;
                    final isActive = stepNumber == currentPhase;
                    final isCompleted = stepNumber < currentPhase;

                    return Expanded(
                      child: Text(
                        _phases[index],
                        textAlign: TextAlign.center,
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                        style: AppTypography.labelSmall.copyWith(
                          color: isActive
                              ? AppColors.purple
                              : isCompleted
                                  ? AppColors.sage
                                  : AppColors.inkFaint,
                          fontWeight: isActive
                              ? FontWeight.w600
                              : FontWeight.w400,
                        ),
                      ),
                    );
                  },
                ),
              ),
            ],
          ],
        );
      },
    );
  }
}

// ══════════════════════════════════════════════════════════════════════════════
// Step circle
// ══════════════════════════════════════════════════════════════════════════════

class _StepCircle extends StatelessWidget {
  const _StepCircle({
    required this.stepNumber,
    required this.currentPhase,
    required this.icon,
    required this.animate,
  });

  final int stepNumber;
  final int currentPhase;
  final IconData icon;
  final bool animate;

  static const _size = 40.0;

  bool get _isCompleted => stepNumber < currentPhase;
  bool get _isActive => stepNumber == currentPhase;

  @override
  Widget build(BuildContext context) {
    final Color bgColor;
    final Color iconColor;
    final List<BoxShadow>? shadow;

    if (_isCompleted) {
      bgColor = AppColors.sage;
      iconColor = Colors.white;
      shadow = null;
    } else if (_isActive) {
      bgColor = AppColors.purple;
      iconColor = Colors.white;
      shadow = [
        BoxShadow(
          color: AppColors.purple.withValues(alpha: 0.3),
          blurRadius: 8,
          offset: const Offset(0, 2),
        ),
      ];
    } else {
      bgColor = AppColors.divider;
      iconColor = AppColors.inkFaint;
      shadow = null;
    }

    final content = _isCompleted
        ? const Icon(Icons.check_rounded, color: Colors.white, size: 20)
        : Icon(icon, color: iconColor, size: 20);

    final circle = Container(
      width: _size,
      height: _size,
      decoration: BoxDecoration(
        color: bgColor,
        shape: BoxShape.circle,
        boxShadow: shadow,
      ),
      child: Center(child: content),
    );

    if (animate) {
      return AnimatedContainer(
        duration: const Duration(milliseconds: 400),
        curve: Curves.easeOutCubic,
        width: _size,
        height: _size,
        decoration: BoxDecoration(
          color: bgColor,
          shape: BoxShape.circle,
          boxShadow: shadow,
        ),
        child: Center(child: content),
      );
    }

    return circle;
  }
}

// ══════════════════════════════════════════════════════════════════════════════
// Connector line
// ══════════════════════════════════════════════════════════════════════════════

class _ConnectorLine extends StatelessWidget {
  const _ConnectorLine({
    required this.isCompleted,
    required this.animate,
  });

  final bool isCompleted;
  final bool animate;

  @override
  Widget build(BuildContext context) {
    final color = isCompleted ? AppColors.sage : AppColors.divider;

    if (animate) {
      return AnimatedContainer(
        duration: const Duration(milliseconds: 500),
        curve: Curves.easeOutCubic,
        height: 3,
        margin: const EdgeInsets.symmetric(horizontal: 4),
        decoration: BoxDecoration(
          color: color,
          borderRadius: const BorderRadius.all(Radius.circular(1.5)),
        ),
      );
    }

    return Container(
      height: 3,
      margin: const EdgeInsets.symmetric(horizontal: 4),
      decoration: BoxDecoration(
        color: color,
        borderRadius: const BorderRadius.all(Radius.circular(1.5)),
      ),
    );
  }
}
