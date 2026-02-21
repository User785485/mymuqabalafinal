/// Displays a blurred photo using Gaussian blur with [ImageFilter.blur].
///
/// The image is loaded via [CachedNetworkImage] so it benefits from
/// disk + memory caching.
///
/// ```dart
/// BlurredPhoto(
///   imageUrl: 'https://example.com/photo.jpg',
///   sigma: 15.0,
///   borderRadius: BorderRadius.circular(16),
/// )
/// ```
library;

import 'dart:ui';

import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';

import 'package:my_muqabala/core/constants/app_colors.dart';
import 'package:my_muqabala/core/widgets/loading_skeleton.dart';

/// A widget that renders a cached network image with a Gaussian blur overlay.
class BlurredPhoto extends StatelessWidget {
  const BlurredPhoto({
    required this.imageUrl,
    this.sigma = 15.0,
    this.borderRadius,
    this.width,
    this.height,
    this.fit = BoxFit.cover,
    this.overlayColor,
    super.key,
  });

  /// The URL of the image to load and blur.
  final String imageUrl;

  /// The sigma value for the Gaussian blur. Higher values mean more blur.
  /// Defaults to 15.0.
  final double sigma;

  /// Optional border radius applied to the clipped image.
  final BorderRadius? borderRadius;

  /// Optional fixed width.
  final double? width;

  /// Optional fixed height.
  final double? height;

  /// How the image should be inscribed into the available space.
  final BoxFit fit;

  /// Optional color overlay on top of the blurred image.
  /// Useful for adding a tinted scrim.
  final Color? overlayColor;

  @override
  Widget build(BuildContext context) {
    Widget content = CachedNetworkImage(
      imageUrl: imageUrl,
      width: width,
      height: height,
      fit: fit,
      placeholder: (_, __) => LoadingSkeleton(
        width: width,
        height: height,
        borderRadius: borderRadius != null ? 16 : 0,
      ),
      errorWidget: (_, __, ___) => Container(
        width: width,
        height: height,
        color: AppColors.paperAlt,
        child: const Center(
          child: Icon(
            Icons.image_not_supported_outlined,
            color: AppColors.inkFaint,
            size: 32,
          ),
        ),
      ),
    );

    // Apply the Gaussian blur filter.
    content = ImageFiltered(
      imageFilter: ImageFilter.blur(
        sigmaX: sigma,
        sigmaY: sigma,
        tileMode: TileMode.decal,
      ),
      child: content,
    );

    // Apply optional color overlay.
    if (overlayColor != null) {
      content = ColorFiltered(
        colorFilter: ColorFilter.mode(overlayColor!, BlendMode.srcOver),
        child: content,
      );
    }

    // Clip with border radius if provided.
    if (borderRadius != null) {
      content = ClipRRect(
        borderRadius: borderRadius!,
        child: content,
      );
    }

    return content;
  }
}
