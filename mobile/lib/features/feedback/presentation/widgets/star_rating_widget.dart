/// Star rating input widget (1-5 stars).
///
/// Displays a horizontal row of star icons. Tapping a star selects that
/// rating (1-based). Filled stars use [AppColors.gold], empty stars use
/// [AppColors.inkFaint]. A subtle scale animation plays on selection.
library;

import 'package:flutter/material.dart';

import 'package:my_muqabala/core/constants/app_colors.dart';
import 'package:my_muqabala/core/constants/app_spacing.dart';
import 'package:my_muqabala/core/constants/app_typography.dart';

/// A 1-to-5 star rating selector.
class StarRatingWidget extends StatefulWidget {
  const StarRatingWidget({
    required this.value,
    required this.onChanged,
    super.key,
  });

  /// Currently selected rating (1-5), or `null` if nothing is selected.
  final int? value;

  /// Called with the tapped star value (1-5).
  final ValueChanged<int> onChanged;

  @override
  State<StarRatingWidget> createState() => _StarRatingWidgetState();
}

class _StarRatingWidgetState extends State<StarRatingWidget>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _scaleAnimation;
  int? _lastTapped;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 250),
    );
    _scaleAnimation = TweenSequence<double>([
      TweenSequenceItem(
        tween: Tween<double>(begin: 1, end: 1.3)
            .chain(CurveTween(curve: Curves.easeOut)),
        weight: 50,
      ),
      TweenSequenceItem(
        tween: Tween<double>(begin: 1.3, end: 1)
            .chain(CurveTween(curve: Curves.easeIn)),
        weight: 50,
      ),
    ]).animate(_controller);
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  void _onStarTap(int star) {
    setState(() => _lastTapped = star);
    _controller.forward(from: 0);
    widget.onChanged(star);
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: List.generate(5, (index) {
            final star = index + 1;
            final isFilled = widget.value != null && star <= widget.value!;
            final isAnimating = _lastTapped == star;

            Widget icon = Icon(
              isFilled ? Icons.star_rounded : Icons.star_outline_rounded,
              size: 48,
              color: isFilled ? AppColors.gold : AppColors.inkFaint,
            );

            if (isAnimating) {
              icon = AnimatedBuilder(
                animation: _scaleAnimation,
                builder: (context, child) => Transform.scale(
                  scale: _scaleAnimation.value,
                  child: child,
                ),
                child: icon,
              );
            }

            return GestureDetector(
              onTap: () => _onStarTap(star),
              behavior: HitTestBehavior.opaque,
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 6),
                child: icon,
              ),
            );
          }),
        ),
        AppSpacing.verticalSm,
        if (widget.value != null)
          Text(
            '${widget.value} / 5',
            style: AppTypography.labelMedium.copyWith(
              color: AppColors.gold,
            ),
          ),
      ],
    );
  }
}
