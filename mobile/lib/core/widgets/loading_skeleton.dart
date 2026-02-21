/// Shimmer loading skeleton placeholder.
///
/// Uses the `shimmer` package to render a pulsing placeholder while
/// content is loading. Colors are derived from the My Muqabala palette.
///
/// ```dart
/// // Simple rectangle
/// LoadingSkeleton(width: 200, height: 20)
///
/// // Circle (avatar placeholder)
/// LoadingSkeleton.circle(diameter: 48)
///
/// // Full-width card placeholder
/// LoadingSkeleton(height: 120, borderRadius: 16)
/// ```
library;

import 'package:flutter/material.dart';
import 'package:shimmer/shimmer.dart';

import 'package:my_muqabala/core/constants/app_colors.dart';

/// A shimmer-animated placeholder skeleton for loading states.
class LoadingSkeleton extends StatelessWidget {
  const LoadingSkeleton({
    this.width,
    this.height,
    this.borderRadius = 10,
    super.key,
  }) : _isCircle = false,
       _diameter = null;

  /// Creates a circular skeleton, useful for avatar placeholders.
  const LoadingSkeleton.circle({
    required double diameter,
    super.key,
  }) : width = diameter,
       height = diameter,
       borderRadius = 0,
       _isCircle = true,
       _diameter = diameter;

  /// Width of the skeleton. Defaults to full available width if null.
  final double? width;

  /// Height of the skeleton.
  final double? height;

  /// Corner radius for the rounded rectangle shape.
  /// Ignored when using [LoadingSkeleton.circle].
  final double borderRadius;

  /// Internal flag for circle mode.
  final bool _isCircle;

  /// Internal diameter for circle mode.
  // ignore: unused_field
  final double? _diameter;

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    final baseColor =
        isDark ? AppColors.darkCard : AppColors.paperAlt;
    final highlightColor =
        isDark ? AppColors.darkBorder : AppColors.divider;

    return Shimmer.fromColors(
      baseColor: baseColor,
      highlightColor: highlightColor,
      period: const Duration(milliseconds: 1500),
      child: Container(
        width: width,
        height: height,
        decoration: BoxDecoration(
          color: baseColor,
          shape: _isCircle ? BoxShape.circle : BoxShape.rectangle,
          borderRadius: _isCircle
              ? null
              : BorderRadius.all(Radius.circular(borderRadius)),
        ),
      ),
    );
  }
}

/// A convenience widget that arranges multiple [LoadingSkeleton] items
/// vertically to simulate a loading list.
class LoadingSkeletonList extends StatelessWidget {
  const LoadingSkeletonList({
    this.itemCount = 3,
    this.itemHeight = 72,
    this.spacing = 12,
    this.padding = const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
    super.key,
  });

  /// Number of skeleton items to render.
  final int itemCount;

  /// Height of each skeleton item.
  final double itemHeight;

  /// Vertical spacing between items.
  final double spacing;

  /// Padding around the list.
  final EdgeInsets padding;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: padding,
      child: Column(
        children: List.generate(
          itemCount,
          (index) => Padding(
            padding: EdgeInsets.only(
              bottom: index < itemCount - 1 ? spacing : 0,
            ),
            child: LoadingSkeleton(
              height: itemHeight,
              borderRadius: 12,
            ),
          ),
        ),
      ),
    );
  }
}
