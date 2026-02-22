import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';

import 'package:my_muqabala/core/constants/app_colors.dart';
import 'package:my_muqabala/core/constants/app_spacing.dart';
import 'package:my_muqabala/core/constants/app_typography.dart';
import 'package:my_muqabala/features/profile/data/models/profile_model.dart';

/// Large profile header shown at the top of the profile screen.
///
/// Displays:
/// - A circular avatar (96 px) with the user's photo or initial
/// - Display name (Cormorant)
/// - Parcours status badge (colored chip)
/// - City name
class ProfileHeader extends StatelessWidget {
  const ProfileHeader({
    required this.profile,
    this.onTapAvatar,
    super.key,
  });

  final ProfileModel profile;

  /// Called when the avatar circle is tapped (e.g. to change photo).
  final VoidCallback? onTapAvatar;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        AppSpacing.gapMd,

        // ── Avatar ──────────────────────────────────────────────────
        GestureDetector(
          onTap: onTapAvatar,
          child: Stack(
            children: [
              Container(
                width: 96,
                height: 96,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  gradient: const LinearGradient(
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                    colors: [
                      AppColors.purpleLight,
                      AppColors.roseLight,
                    ],
                  ),
                  border: Border.all(
                    color: AppColors.purple.withValues(alpha: 0.2),
                    width: 3,
                  ),
                  boxShadow: [
                    BoxShadow(
                      color: AppColors.purple.withValues(alpha: 0.12),
                      blurRadius: 20,
                      offset: const Offset(0, 8),
                    ),
                  ],
                ),
                child: ClipOval(
                  child: profile.hasPhoto
                      ? CachedNetworkImage(
                          imageUrl: profile.bestPhotoUrl!,
                          fit: BoxFit.cover,
                          placeholder: (_, __) => _InitialFallback(
                            initial: profile.initial,
                          ),
                          errorWidget: (_, __, ___) => _InitialFallback(
                            initial: profile.initial,
                          ),
                        )
                      : _InitialFallback(initial: profile.initial),
                ),
              ),

              // Camera icon overlay
              if (onTapAvatar != null)
                Positioned(
                  bottom: 0,
                  right: 0,
                  child: Container(
                    width: 32,
                    height: 32,
                    decoration: BoxDecoration(
                      color: AppColors.purple,
                      shape: BoxShape.circle,
                      border: Border.all(color: Colors.white, width: 2),
                      boxShadow: [
                        BoxShadow(
                          color: AppColors.purple.withValues(alpha: 0.3),
                          blurRadius: 8,
                          offset: const Offset(0, 2),
                        ),
                      ],
                    ),
                    child: const Icon(
                      Icons.camera_alt_rounded,
                      color: Colors.white,
                      size: 16,
                    ),
                  ),
                ),
            ],
          ),
        ),

        AppSpacing.gapMd,

        // ── Display name ────────────────────────────────────────────
        Text(
          profile.displayName,
          style: AppTypography.displayMedium,
          textAlign: TextAlign.center,
        ),

        AppSpacing.gapSm,

        // ── Status badge ────────────────────────────────────────────
        Container(
          padding: const EdgeInsets.symmetric(
            horizontal: 12,
            vertical: 4,
          ),
          decoration: BoxDecoration(
            color: _statusColor(profile.statutParcours).withValues(alpha: 0.12),
            borderRadius: BorderRadius.circular(20),
            border: Border.all(
              color: _statusColor(profile.statutParcours).withValues(alpha: 0.3),
              width: 1,
            ),
          ),
          child: Text(
            profile.statutLabel,
            style: AppTypography.labelSmall.copyWith(
              color: _statusColor(profile.statutParcours),
              fontWeight: FontWeight.w600,
            ),
          ),
        ),

        AppSpacing.gapSm,

        // ── City ────────────────────────────────────────────────────
        Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(
              Icons.location_on_outlined,
              size: 16,
              color: AppColors.inkMuted,
            ),
            const SizedBox(width: 4),
            Text(
              profile.ville,
              style: AppTypography.bodyMedium.copyWith(
                color: AppColors.inkMuted,
              ),
            ),
          ],
        ),

        AppSpacing.gapLg,
      ],
    );
  }

  /// Returns a color corresponding to the user's parcours status.
  Color _statusColor(String statut) {
    return switch (statut) {
      'inscription' || 'formulaire_en_cours' => AppColors.gold,
      'formation' => AppColors.sage,
      'matching_pool' => AppColors.purple,
      'phase_1_matching' => AppColors.purple,
      'phase_2_decouverte' => AppColors.sage,
      'phase_3_approfondie' => AppColors.rose,
      'phase_4_engagement' => AppColors.gold,
      'termine' => AppColors.success,
      'desactive' => AppColors.error,
      _ => AppColors.inkMuted,
    };
  }
}

/// Fallback widget showing the user's initial letter inside the avatar.
class _InitialFallback extends StatelessWidget {
  const _InitialFallback({required this.initial});

  final String initial;

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Text(
        initial,
        style: AppTypography.displayLarge.copyWith(
          color: AppColors.purple,
          fontSize: 36,
        ),
      ),
    );
  }
}
