/// Staggered fade-in + slide-up animation wrapper for list items.
///
/// Wrap each item in a scrollable list to create a sequential entrance
/// animation where items appear one after another with a configurable delay.
///
/// ```dart
/// ListView(
///   children: [
///     StaggeredListItem(index: 0, child: CardA()),
///     StaggeredListItem(index: 1, child: CardB()),
///     StaggeredListItem(index: 2, child: CardC()),
///   ],
/// )
/// ```
library;

import 'package:flutter/material.dart';

/// A widget that animates its child with a staggered fade-in and slide-up
/// effect based on its [index] in a list.
class StaggeredListItem extends StatefulWidget {
  const StaggeredListItem({
    required this.index,
    required this.child,
    this.delay = const Duration(milliseconds: 60),
    this.duration = const Duration(milliseconds: 400),
    this.offset = 20.0,
    super.key,
  });

  /// The index of this item in the list (used to calculate stagger delay).
  final int index;

  /// The child widget to animate.
  final Widget child;

  /// Delay between each item's animation start.
  final Duration delay;

  /// Duration of the fade + slide animation.
  final Duration duration;

  /// Vertical offset in logical pixels for the slide-up effect.
  final double offset;

  @override
  State<StaggeredListItem> createState() => _StaggeredListItemState();
}

class _StaggeredListItemState extends State<StaggeredListItem>
    with SingleTickerProviderStateMixin {
  late final AnimationController _controller;
  late final Animation<double> _fadeAnimation;
  late final Animation<Offset> _slideAnimation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: widget.duration,
    );

    final curve = CurvedAnimation(
      parent: _controller,
      curve: Curves.easeOutCubic,
    );

    _fadeAnimation = Tween<double>(begin: 0, end: 1).animate(curve);
    _slideAnimation = Tween<Offset>(
      begin: Offset(0, widget.offset / 100),
      end: Offset.zero,
    ).animate(curve);

    // Stagger the start based on index
    final staggerDelay = widget.delay * widget.index;
    Future<void>.delayed(staggerDelay, () {
      if (mounted) {
        _controller.forward();
      }
    });
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return FadeTransition(
      opacity: _fadeAnimation,
      child: SlideTransition(
        position: _slideAnimation,
        child: widget.child,
      ),
    );
  }
}
