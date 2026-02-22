/// Reusable tappable card wrapper with scale-down animation.
///
/// Wraps any child widget and adds a subtle scale-down effect on tap,
/// providing tactile feedback via haptics. Consistent with the Chat FAB
/// pattern used in `app_router.dart`.
///
/// ```dart
/// TappableCard(
///   onTap: () => context.push('/details'),
///   child: MyCardContent(),
/// )
/// ```
library;

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

/// A wrapper that adds a scale-down animation on tap to any child widget.
class TappableCard extends StatefulWidget {
  const TappableCard({
    required this.onTap,
    required this.child,
    this.scaleFactor = 0.97,
    this.duration = const Duration(milliseconds: 120),
    super.key,
  });

  /// Callback when the card is tapped.
  final VoidCallback onTap;

  /// The child widget to wrap.
  final Widget child;

  /// The scale factor to animate to on press (default 0.97).
  final double scaleFactor;

  /// Duration of the scale animation.
  final Duration duration;

  @override
  State<TappableCard> createState() => _TappableCardState();
}

class _TappableCardState extends State<TappableCard>
    with SingleTickerProviderStateMixin {
  late final AnimationController _controller;
  late final Animation<double> _scaleAnimation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: widget.duration,
    );
    _scaleAnimation = Tween<double>(
      begin: 1.0,
      end: widget.scaleFactor,
    ).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeInOut),
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  void _onTapDown(TapDownDetails _) {
    _controller.forward();
  }

  void _onTapUp(TapUpDetails _) {
    _controller.reverse();
    HapticFeedback.selectionClick();
    widget.onTap();
  }

  void _onTapCancel() {
    _controller.reverse();
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTapDown: _onTapDown,
      onTapUp: _onTapUp,
      onTapCancel: _onTapCancel,
      behavior: HitTestBehavior.opaque,
      child: ScaleTransition(
        scale: _scaleAnimation,
        child: widget.child,
      ),
    );
  }
}
