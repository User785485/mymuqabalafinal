/// Reusable AppBar action showing the current user's prenom + avatar.
///
/// Tapping navigates to the full-screen profile page via push.
///
/// ```dart
/// AppBar(
///   actions: [
///     const ProfileAppBarAction(),
///   ],
/// )
/// ```
library;

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import 'package:my_muqabala/core/constants/app_colors.dart';
import 'package:my_muqabala/core/constants/app_spacing.dart';
import 'package:my_muqabala/core/constants/app_typography.dart';
import 'package:my_muqabala/core/router/route_names.dart';
import 'package:my_muqabala/core/widgets/avatar_circle.dart';
import 'package:my_muqabala/core/widgets/loading_skeleton.dart';
import 'package:my_muqabala/features/profile/presentation/providers/profile_provider.dart';

/// Displays [prenom + avatar] in the AppBar actions area.
///
/// Watches [currentProfileProvider] for the user's best photo URL and prenom.
/// Shows shimmer skeletons while loading.
class ProfileAppBarAction extends ConsumerWidget {
  const ProfileAppBarAction({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final profileAsync = ref.watch(currentProfileProvider);
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Padding(
      padding: const EdgeInsets.only(right: AppSpacing.sm),
      child: profileAsync.when(
        data: (profile) {
          if (profile == null) return const SizedBox.shrink();

          return GestureDetector(
            onTap: () => context.pushNamed(RouteNames.profile),
            behavior: HitTestBehavior.opaque,
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                Text(
                  profile.prenom,
                  style: AppTypography.label.copyWith(
                    color: isDark ? AppColors.darkInk : AppColors.ink,
                    fontSize: 13,
                  ),
                ),
                const SizedBox(width: 8),
                AvatarCircle(
                  imageUrl: profile.bestPhotoUrl,
                  name: profile.prenom,
                  size: AvatarSize.sm,
                ),
              ],
            ),
          );
        },
        loading: () => Row(
          mainAxisSize: MainAxisSize.min,
          children: const [
            LoadingSkeleton(width: 60, height: 16),
            SizedBox(width: 8),
            LoadingSkeleton.circle(diameter: 32),
          ],
        ),
        error: (_, __) => const SizedBox.shrink(),
      ),
    );
  }
}
