/// A small badge indicating that a channel belongs to a coach.
///
/// Displays "Coach" in white text on a violet background, using
/// the My Muqabala design system colors and typography.
///
/// ```dart
/// Row(
///   children: [
///     Text(channelName),
///     const SizedBox(width: 8),
///     const CoachMessageBadge(),
///   ],
/// )
/// ```
library;

import 'package:flutter/material.dart';

import 'package:my_muqabala/core/constants/app_colors.dart';
import 'package:my_muqabala/core/constants/app_spacing.dart';

/// A compact badge widget labelled "Coach" to visually distinguish
/// coach channels from peer-to-peer conversations.
class CoachMessageBadge extends StatelessWidget {
  const CoachMessageBadge({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(
        horizontal: AppSpacing.sm,
        vertical: 2,
      ),
      decoration: BoxDecoration(
        color: AppColors.violet,
        borderRadius: AppRadius.borderSm,
      ),
      child: const Text(
        'Coach',
        style: TextStyle(
          fontFamily: 'Outfit',
          fontSize: 10,
          fontWeight: FontWeight.w600,
          letterSpacing: 0.3,
          color: Colors.white,
          height: 1.4,
        ),
      ),
    );
  }
}
