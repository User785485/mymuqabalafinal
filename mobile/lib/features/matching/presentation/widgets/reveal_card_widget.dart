/// Elegant card widget for the match reveal moment.
///
/// Displays a large blurred photo of the partner with their name and
/// an optional subtitle. Features a subtle violet glow, gradient overlay,
/// and elegant shadow treatment.
///
/// Used by [MatchRevealScreen] for the dramatic partner reveal.
library;

import 'package:flutter/material.dart';

import 'package:my_muqabala/core/constants/app_colors.dart';
import 'package:my_muqabala/core/constants/app_spacing.dart';
import 'package:my_muqabala/core/constants/app_typography.dart';
import 'package:my_muqabala/core/widgets/blurred_photo.dart';

/// A card that reveals the matched partner's blurred photo and name.
class RevealCardWidget extends StatelessWidget {
  const RevealCardWidget({
    required this.imageUrl,
    required this.name,
    this.subtitle,
    this.photoSigma = 10.0,
    this.height = 380,
    super.key,
  });

  /// URL of the partner's blurred photo.
  final String? imageUrl;

  /// The partner's display name.
  final String name;

  /// Optional subtitle (e.g., attachment style or short bio).
  final String? subtitle;

  /// Blur intensity for the photo. Defaults to 10.0.
  final double photoSigma;

  /// Height of the card. Defaults to 380.
  final double height;

  @override
  Widget build(BuildContext context) {
    // First initial for the fallback avatar.
    final initial = name.isNotEmpty ? name[0].toUpperCase() : '?';

    return Container(
      height: height,
      width: double.infinity,
      decoration: BoxDecoration(
        borderRadius: AppRadius.borderXl,
        boxShadow: [
          // ── Primary violet glow ──────────────────────────────────────
          BoxShadow(
            color: AppColors.violet.withValues(alpha: 0.2),
            blurRadius: 32,
            spreadRadius: 4,
            offset: const Offset(0, 8),
          ),
          // ── Subtle dark shadow for depth ─────────────────────────────
          BoxShadow(
            color: AppColors.shadowLight,
            blurRadius: 16,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: ClipRRect(
        borderRadius: AppRadius.borderXl,
        child: Stack(
          fit: StackFit.expand,
          children: [
            // ── Blurred photo background ─────────────────────────────────
            _buildPhotoBackground(initial),

            // ── Gradient overlay ─────────────────────────────────────────
            Container(
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  begin: Alignment.topCenter,
                  end: Alignment.bottomCenter,
                  colors: [
                    Colors.transparent,
                    Colors.transparent,
                    AppColors.ink.withValues(alpha: 0.3),
                    AppColors.ink.withValues(alpha: 0.7),
                  ],
                  stops: const [0.0, 0.4, 0.7, 1.0],
                ),
              ),
            ),

            // ── Violet tint overlay ──────────────────────────────────────
            Container(
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                  colors: [
                    AppColors.violet.withValues(alpha: 0.05),
                    AppColors.violet.withValues(alpha: 0.12),
                  ],
                ),
              ),
            ),

            // ── Top decorative element ───────────────────────────────────
            Positioned(
              top: 20,
              left: 0,
              right: 0,
              child: Center(
                child: Container(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 16,
                    vertical: 6,
                  ),
                  decoration: BoxDecoration(
                    color: AppColors.surface.withValues(alpha: 0.9),
                    borderRadius: AppRadius.borderCircular,
                    boxShadow: [
                      BoxShadow(
                        color: AppColors.shadowLight,
                        blurRadius: 8,
                      ),
                    ],
                  ),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Icon(
                        Icons.favorite_rounded,
                        size: 14,
                        color: AppColors.rose,
                      ),
                      const SizedBox(width: 6),
                      Text(
                        'Votre match',
                        style: AppTypography.labelMedium.copyWith(
                          color: AppColors.violet,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),

            // ── Name and subtitle at bottom ──────────────────────────────
            Positioned(
              left: AppSpacing.lg,
              right: AppSpacing.lg,
              bottom: AppSpacing.lg,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.center,
                mainAxisSize: MainAxisSize.min,
                children: [
                  // Partner name.
                  Text(
                    name,
                    style: AppTypography.h1.copyWith(
                      color: Colors.white,
                      fontSize: 36,
                      fontWeight: FontWeight.w700,
                      shadows: [
                        Shadow(
                          color: AppColors.ink.withValues(alpha: 0.5),
                          blurRadius: 12,
                        ),
                      ],
                    ),
                    textAlign: TextAlign.center,
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                  ),

                  // Subtitle (e.g., attachment style).
                  if (subtitle != null && subtitle!.isNotEmpty) ...[
                    AppSpacing.verticalSm,
                    Container(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 14,
                        vertical: 5,
                      ),
                      decoration: BoxDecoration(
                        color: AppColors.surface.withValues(alpha: 0.2),
                        borderRadius: AppRadius.borderCircular,
                        border: Border.all(
                          color: Colors.white.withValues(alpha: 0.3),
                        ),
                      ),
                      child: Text(
                        subtitle!,
                        style: AppTypography.bodySmall.copyWith(
                          color: Colors.white.withValues(alpha: 0.9),
                          fontWeight: FontWeight.w500,
                        ),
                        textAlign: TextAlign.center,
                      ),
                    ),
                  ],
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  /// Builds the photo background or a fallback avatar.
  Widget _buildPhotoBackground(String initial) {
    if (imageUrl != null && imageUrl!.isNotEmpty) {
      return BlurredPhoto(
        imageUrl: imageUrl!,
        sigma: photoSigma,
        fit: BoxFit.cover,
      );
    }

    // Fallback: gradient with initial.
    return Container(
      decoration: BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [
            AppColors.violetLight,
            AppColors.roseLight,
            AppColors.violetLight,
          ],
        ),
      ),
      child: Center(
        child: Text(
          initial,
          style: AppTypography.h1.copyWith(
            fontSize: 96,
            color: AppColors.violet.withValues(alpha: 0.4),
            fontWeight: FontWeight.w700,
          ),
        ),
      ),
    );
  }
}
