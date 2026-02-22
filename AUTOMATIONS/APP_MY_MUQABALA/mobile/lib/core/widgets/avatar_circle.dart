/// Circular avatar widget with image, fallback initials, blur, and
/// online-indicator support.
///
/// ```dart
/// AvatarCircle(
///   imageUrl: user.photoUrl,
///   name: user.displayName,
///   size: AvatarSize.lg,
///   isOnline: true,
/// )
/// ```
library;

import 'dart:ui';

import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';

import 'package:my_muqabala/core/constants/app_colors.dart';

/// Predefined avatar sizes.
enum AvatarSize {
  /// 32x32
  sm(32),

  /// 48x48
  md(48),

  /// 64x64
  lg(64),

  /// 96x96
  xl(96);

  const AvatarSize(this.diameter);

  /// The diameter in logical pixels.
  final double diameter;

  /// Derived radius.
  double get radius => diameter / 2;

  /// Font size for the fallback initial letter.
  double get fontSize => diameter * 0.4;

  /// Online indicator dot diameter.
  double get indicatorDiameter => diameter * 0.25;
}

/// A circular avatar that displays a cached network image, falling back to
/// the first letter of [name] on a violet gradient background.
class AvatarCircle extends StatelessWidget {
  const AvatarCircle({
    this.imageUrl,
    this.name,
    this.size = AvatarSize.md,
    this.isBlurred = false,
    this.blurSigma = 15.0,
    this.isOnline = false,
    this.borderColor,
    this.borderWidth = 0,
    this.onTap,
    super.key,
  });

  /// URL of the avatar image. If null or loading fails, the initials
  /// fallback is shown.
  final String? imageUrl;

  /// Full name used to extract the initial letter for the fallback.
  final String? name;

  /// Predefined size token.
  final AvatarSize size;

  /// Whether to apply a Gaussian blur over the image.
  final bool isBlurred;

  /// Sigma for the Gaussian blur (only used when [isBlurred] is true).
  final double blurSigma;

  /// Whether to show the green online indicator dot.
  final bool isOnline;

  /// Optional border color around the avatar.
  final Color? borderColor;

  /// Width of the optional border.
  final double borderWidth;

  /// Callback when the avatar is tapped.
  final VoidCallback? onTap;

  // ── Gradient used for initials fallback ───────────────────────────────
  static const _fallbackGradient = LinearGradient(
    colors: [AppColors.purple, Color(0xFF9333EA)],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );

  @override
  Widget build(BuildContext context) {
    final diameter = size.diameter;

    Widget avatar = SizedBox(
      width: diameter,
      height: diameter,
      child: _buildClippedContent(),
    );

    // Wrap with border if needed.
    if (borderColor != null && borderWidth > 0) {
      avatar = Container(
        width: diameter + borderWidth * 2,
        height: diameter + borderWidth * 2,
        decoration: BoxDecoration(
          shape: BoxShape.circle,
          border: Border.all(color: borderColor!, width: borderWidth),
        ),
        child: avatar,
      );
    }

    // Stack online indicator on top.
    if (isOnline) {
      avatar = Stack(
        clipBehavior: Clip.none,
        children: [
          avatar,
          Positioned(
            right: borderWidth,
            bottom: borderWidth,
            child: _OnlineIndicator(diameter: size.indicatorDiameter),
          ),
        ],
      );
    }

    // Wrap with GestureDetector if tappable.
    if (onTap != null) {
      avatar = GestureDetector(
        onTap: onTap,
        child: avatar,
      );
    }

    return avatar;
  }

  // ── Content builder ───────────────────────────────────────────────────

  Widget _buildClippedContent() {
    return ClipOval(
      child: _hasImage ? _buildImage() : _buildInitials(),
    );
  }

  bool get _hasImage => imageUrl != null && imageUrl!.isNotEmpty;

  Widget _buildImage() {
    Widget image = CachedNetworkImage(
      imageUrl: imageUrl!,
      width: size.diameter,
      height: size.diameter,
      fit: BoxFit.cover,
      placeholder: (_, __) => _buildInitials(),
      errorWidget: (_, __, ___) => _buildInitials(),
    );

    if (isBlurred) {
      image = ImageFiltered(
        imageFilter: ImageFilter.blur(
          sigmaX: blurSigma,
          sigmaY: blurSigma,
          tileMode: TileMode.decal,
        ),
        child: image,
      );
    }

    return image;
  }

  Widget _buildInitials() {
    final initial = _extractInitial();

    return Container(
      width: size.diameter,
      height: size.diameter,
      decoration: const BoxDecoration(
        gradient: _fallbackGradient,
      ),
      alignment: Alignment.center,
      child: Text(
        initial,
        style: TextStyle(
          fontFamily: 'Outfit',
          fontSize: size.fontSize,
          fontWeight: FontWeight.w600,
          color: Colors.white,
          height: 1,
        ),
      ),
    );
  }

  String _extractInitial() {
    if (name == null || name!.trim().isEmpty) return '?';
    return name!.trim()[0].toUpperCase();
  }
}

// ══════════════════════════════════════════════════════════════════════════════
// Online indicator dot
// ══════════════════════════════════════════════════════════════════════════════

class _OnlineIndicator extends StatelessWidget {
  const _OnlineIndicator({required this.diameter});

  final double diameter;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: diameter,
      height: diameter,
      decoration: BoxDecoration(
        color: AppColors.success,
        shape: BoxShape.circle,
        border: Border.all(
          color: Theme.of(context).scaffoldBackgroundColor,
          width: diameter * 0.15,
        ),
      ),
    );
  }
}
