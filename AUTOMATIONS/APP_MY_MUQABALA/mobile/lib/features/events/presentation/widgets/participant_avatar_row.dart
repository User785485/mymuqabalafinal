/// Row of overlapping participant avatars with a "+N" overflow indicator.
///
/// Displays up to [maxVisible] (default 5) circular avatars stacked
/// with horizontal overlap. If there are more participants, a "+N"
/// badge is shown at the end.
///
/// Uses [BlurredPhoto] when a `photo_floue_url` is available,
/// otherwise falls back to a colored initial circle.
///
/// ```dart
/// ParticipantAvatarRow(
///   participants: participantList,
///   maxVisible: 5,
/// )
/// ```
library;

import 'package:flutter/material.dart';

import 'package:my_muqabala/core/constants/app_colors.dart';
import 'package:my_muqabala/core/constants/app_typography.dart';
import 'package:my_muqabala/core/widgets/blurred_photo.dart';

/// A row of overlapping circular avatars representing event participants.
class ParticipantAvatarRow extends StatelessWidget {
  const ParticipantAvatarRow({
    required this.participants,
    this.maxVisible = 5,
    this.avatarSize = 36,
    this.overlapFactor = 0.3,
    super.key,
  });

  /// List of participant maps. Expected keys:
  ///   - `prenom` : participant's first name
  ///   - `photo_floue_url` : optional blurred photo URL
  final List<Map<String, dynamic>> participants;

  /// Maximum number of avatars to display before showing "+N".
  final int maxVisible;

  /// Diameter of each avatar circle.
  final double avatarSize;

  /// How much each avatar overlaps the previous one (0.0 = no overlap, 1.0 = full).
  final double overlapFactor;

  @override
  Widget build(BuildContext context) {
    if (participants.isEmpty) return const SizedBox.shrink();

    final isDark = Theme.of(context).brightness == Brightness.dark;
    final visibleParticipants = participants.take(maxVisible).toList();
    final overflowCount = participants.length - maxVisible;
    final overlap = avatarSize * overlapFactor;

    return SizedBox(
      height: avatarSize,
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          // ── Overlapping avatar stack ────────────────────────────────
          SizedBox(
            width: _calculateStackWidth(
              visibleParticipants.length,
              overflowCount > 0,
            ),
            height: avatarSize,
            child: Stack(
              clipBehavior: Clip.none,
              children: [
                for (int i = 0; i < visibleParticipants.length; i++)
                  Positioned(
                    left: i * (avatarSize - overlap),
                    child: _ParticipantAvatar(
                      participant: visibleParticipants[i],
                      size: avatarSize,
                      isDark: isDark,
                    ),
                  ),

                // ── "+N" overflow badge ──────────────────────────────
                if (overflowCount > 0)
                  Positioned(
                    left: visibleParticipants.length * (avatarSize - overlap),
                    child: _OverflowBadge(
                      count: overflowCount,
                      size: avatarSize,
                      isDark: isDark,
                    ),
                  ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  /// Calculates the total width needed for the avatar stack.
  double _calculateStackWidth(int visibleCount, bool hasOverflow) {
    final overlap = avatarSize * overlapFactor;
    final totalItems = visibleCount + (hasOverflow ? 1 : 0);
    if (totalItems <= 1) return avatarSize;
    return avatarSize + (totalItems - 1) * (avatarSize - overlap);
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// Individual avatar
// ═══════════════════════════════════════════════════════════════════════════════

class _ParticipantAvatar extends StatelessWidget {
  const _ParticipantAvatar({
    required this.participant,
    required this.size,
    required this.isDark,
  });

  final Map<String, dynamic> participant;
  final double size;
  final bool isDark;

  @override
  Widget build(BuildContext context) {
    final photoUrl = participant['photo_floue_url'] as String?;
    final prenom = (participant['prenom'] as String?) ?? 'P';
    final initial = prenom.isNotEmpty ? prenom[0].toUpperCase() : 'P';

    return Container(
      width: size,
      height: size,
      decoration: BoxDecoration(
        shape: BoxShape.circle,
        border: Border.all(
          color: isDark ? AppColors.darkBg : AppColors.surface,
          width: 2,
        ),
      ),
      child: ClipOval(
        child: photoUrl != null && photoUrl.isNotEmpty
            ? BlurredPhoto(
                imageUrl: photoUrl,
                sigma: 10,
                width: size,
                height: size,
                fit: BoxFit.cover,
              )
            : _InitialCircle(
                initial: initial,
                size: size,
              ),
      ),
    );
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// Fallback initial circle
// ═══════════════════════════════════════════════════════════════════════════════

class _InitialCircle extends StatelessWidget {
  const _InitialCircle({
    required this.initial,
    required this.size,
  });

  final String initial;
  final double size;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: size,
      height: size,
      decoration: const BoxDecoration(
        color: AppColors.violetLight,
        shape: BoxShape.circle,
      ),
      alignment: Alignment.center,
      child: Text(
        initial,
        style: AppTypography.labelMedium.copyWith(
          color: AppColors.violet,
          fontWeight: FontWeight.w600,
          fontSize: size * 0.38,
        ),
      ),
    );
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// Overflow badge (+N)
// ═══════════════════════════════════════════════════════════════════════════════

class _OverflowBadge extends StatelessWidget {
  const _OverflowBadge({
    required this.count,
    required this.size,
    required this.isDark,
  });

  final int count;
  final double size;
  final bool isDark;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: size,
      height: size,
      decoration: BoxDecoration(
        color: isDark ? AppColors.darkCard : AppColors.paper,
        shape: BoxShape.circle,
        border: Border.all(
          color: isDark ? AppColors.darkBg : AppColors.surface,
          width: 2,
        ),
      ),
      alignment: Alignment.center,
      child: Text(
        '+$count',
        style: AppTypography.caption.copyWith(
          color: isDark ? AppColors.darkInkMuted : AppColors.inkMuted,
          fontWeight: FontWeight.w600,
          fontSize: size * 0.3,
        ),
      ),
    );
  }
}
