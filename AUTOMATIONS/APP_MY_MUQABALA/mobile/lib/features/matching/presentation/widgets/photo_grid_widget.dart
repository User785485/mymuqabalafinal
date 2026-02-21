/// Grid widget for displaying selectable blurred photos.
///
/// Renders a 2-column grid of photo cards, each showing a blurred image
/// loaded via [CachedNetworkImage]. Selected photos display a violet
/// border glow and a check overlay.
///
/// Used by [PhotoSelectionScreen] to let users pick photos during
/// the matching process.
library;

import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';

import 'package:my_muqabala/core/constants/app_colors.dart';
import 'package:my_muqabala/core/constants/app_spacing.dart';
import 'package:my_muqabala/core/constants/app_typography.dart';
import 'package:my_muqabala/core/widgets/loading_skeleton.dart';
import 'package:my_muqabala/features/matching/data/models/photo_selection_model.dart';

/// A 2-column grid of selectable blurred photo cards.
class PhotoGridWidget extends StatelessWidget {
  const PhotoGridWidget({
    required this.photos,
    required this.selectedIds,
    required this.onToggle,
    this.maxSelections,
    super.key,
  });

  /// The list of photo selection models to display.
  final List<PhotoSelectionModel> photos;

  /// The set of currently selected [PhotoSelectionModel.photoUserId] values.
  final Set<String> selectedIds;

  /// Callback when a photo is tapped. Receives the [photoUserId].
  final ValueChanged<String> onToggle;

  /// Optional maximum number of selections allowed.
  /// When reached, unselected photos become visually dimmed.
  final int? maxSelections;

  @override
  Widget build(BuildContext context) {
    final isMaxReached =
        maxSelections != null && selectedIds.length >= maxSelections!;

    return GridView.count(
      crossAxisCount: 2,
      mainAxisSpacing: AppSpacing.md,
      crossAxisSpacing: AppSpacing.md,
      childAspectRatio: 0.75,
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      children: photos.map((photo) {
        final isSelected = selectedIds.contains(photo.photoUserId);
        final isDimmed = isMaxReached && !isSelected;

        return _PhotoCard(
          photo: photo,
          isSelected: isSelected,
          isDimmed: isDimmed,
          onTap: () => onToggle(photo.photoUserId),
        );
      }).toList(),
    );
  }
}

// =============================================================================
// Individual Photo Card
// =============================================================================

class _PhotoCard extends StatelessWidget {
  const _PhotoCard({
    required this.photo,
    required this.isSelected,
    required this.isDimmed,
    required this.onTap,
  });

  final PhotoSelectionModel photo;
  final bool isSelected;
  final bool isDimmed;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: AnimatedContainer(
        duration: AppAnimation.durationFast,
        curve: AppAnimation.curve,
        decoration: BoxDecoration(
          borderRadius: AppRadius.borderLg,
          border: Border.all(
            color: isSelected ? AppColors.violet : AppColors.divider,
            width: isSelected ? 3.0 : 1.0,
          ),
          boxShadow: isSelected
              ? [
                  BoxShadow(
                    color: AppColors.violet.withValues(alpha: 0.3),
                    blurRadius: 16,
                    spreadRadius: 2,
                  ),
                ]
              : [
                  BoxShadow(
                    color: AppColors.shadowLight,
                    blurRadius: 8,
                    offset: const Offset(0, 2),
                  ),
                ],
        ),
        child: ClipRRect(
          borderRadius: AppRadius.borderLg - const BorderRadius.all(Radius.circular(1)),
          child: Stack(
            fit: StackFit.expand,
            children: [
              // ── Photo image ────────────────────────────────────────────
              _PhotoImage(photoUrl: photo.photoUrl),

              // ── Dimmed overlay (when max selections reached) ───────────
              if (isDimmed)
                Container(
                  color: AppColors.ink.withValues(alpha: 0.4),
                ),

              // ── Selection indicator ────────────────────────────────────
              Positioned(
                top: 8,
                right: 8,
                child: AnimatedContainer(
                  duration: AppAnimation.durationFast,
                  curve: AppAnimation.curve,
                  width: 32,
                  height: 32,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    color: isSelected
                        ? AppColors.violet
                        : AppColors.surface.withValues(alpha: 0.85),
                    border: Border.all(
                      color: isSelected
                          ? AppColors.violet
                          : AppColors.inkFaint,
                      width: 2,
                    ),
                    boxShadow: [
                      BoxShadow(
                        color: AppColors.shadowLight,
                        blurRadius: 4,
                      ),
                    ],
                  ),
                  child: isSelected
                      ? const Icon(
                          Icons.check_rounded,
                          color: Colors.white,
                          size: 20,
                        )
                      : null,
                ),
              ),

              // ── Bottom label overlay ───────────────────────────────────
              Positioned(
                left: 0,
                right: 0,
                bottom: 0,
                child: Container(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 12,
                    vertical: 8,
                  ),
                  decoration: BoxDecoration(
                    gradient: LinearGradient(
                      begin: Alignment.topCenter,
                      end: Alignment.bottomCenter,
                      colors: [
                        Colors.transparent,
                        AppColors.ink.withValues(alpha: 0.6),
                      ],
                    ),
                  ),
                  child: Text(
                    isSelected ? 'S\u00e9lectionn\u00e9e' : 'Appuyez pour choisir',
                    style: AppTypography.caption.copyWith(
                      color: Colors.white,
                      fontWeight:
                          isSelected ? FontWeight.w600 : FontWeight.w400,
                    ),
                    textAlign: TextAlign.center,
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

// =============================================================================
// Photo image with loading / error states
// =============================================================================

class _PhotoImage extends StatelessWidget {
  const _PhotoImage({required this.photoUrl});

  final String? photoUrl;

  @override
  Widget build(BuildContext context) {
    if (photoUrl == null || photoUrl!.isEmpty) {
      return _buildPlaceholder();
    }

    return CachedNetworkImage(
      imageUrl: photoUrl!,
      fit: BoxFit.cover,
      placeholder: (_, __) => const LoadingSkeleton(
        borderRadius: 0,
      ),
      errorWidget: (_, __, ___) => _buildPlaceholder(),
    );
  }

  Widget _buildPlaceholder() {
    return Container(
      color: AppColors.violetLight,
      child: const Center(
        child: Icon(
          Icons.person_outline_rounded,
          size: 48,
          color: AppColors.violet,
        ),
      ),
    );
  }
}
