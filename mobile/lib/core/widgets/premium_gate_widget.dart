/// Reusable premium gating widget.
///
/// Reads `profileStreamProvider` → `isHighTicket`:
/// - Premium ON: shows [child] normally
/// - Premium OFF: overlay with opacity 0.4 + upsell banner
library;

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import 'package:my_muqabala/core/constants/app_colors.dart';
import 'package:my_muqabala/core/constants/app_spacing.dart';
import 'package:my_muqabala/core/constants/app_typography.dart';
import 'package:my_muqabala/core/router/route_names.dart';
import 'package:my_muqabala/features/profile/presentation/providers/profile_provider.dart';

class PremiumGateWidget extends ConsumerWidget {
  const PremiumGateWidget({
    required this.child,
    this.message = 'Débloquez l\u2019accompagnement premium',
    super.key,
  });

  final Widget child;
  final String message;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final profileAsync = ref.watch(profileStreamProvider);
    final isHighTicket = profileAsync.when(
      data: (profile) => profile?.isHighTicket ?? false,
      loading: () => false,
      error: (_, __) => false,
    );

    if (isHighTicket) return child;

    final isDark = Theme.of(context).brightness == Brightness.dark;

    return ClipRRect(
      borderRadius: AppRadius.borderLg,
      child: Stack(
        children: [
          // Dimmed child
          Opacity(
            opacity: 0.4,
            child: IgnorePointer(child: child),
          ),

          // Upsell overlay
          Positioned.fill(
            child: Container(
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  begin: Alignment.topCenter,
                  end: Alignment.bottomCenter,
                  colors: [
                    (isDark ? AppColors.darkBg : AppColors.paper)
                        .withValues(alpha: 0.3),
                    (isDark ? AppColors.darkBg : AppColors.paper)
                        .withValues(alpha: 0.85),
                  ],
                ),
              ),
              child: Center(
                child: Padding(
                  padding: const EdgeInsets.all(AppSpacing.lg),
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Container(
                        width: 48,
                        height: 48,
                        decoration: BoxDecoration(
                          color: AppColors.violet.withValues(alpha: 0.15),
                          shape: BoxShape.circle,
                        ),
                        child: const Icon(
                          Icons.diamond_rounded,
                          color: AppColors.violet,
                          size: 24,
                        ),
                      ),
                      AppSpacing.gapMd,
                      Text(
                        message,
                        style: AppTypography.label.copyWith(
                          color: isDark ? AppColors.darkInk : AppColors.ink,
                        ),
                        textAlign: TextAlign.center,
                      ),
                      AppSpacing.gapMd,
                      SizedBox(
                        width: double.infinity,
                        child: FilledButton.icon(
                          onPressed: () =>
                              context.pushNamed(RouteNames.chat),
                          icon: const Icon(Icons.chat_rounded, size: 18),
                          label: const Text('Contacter mon coach'),
                          style: FilledButton.styleFrom(
                            backgroundColor: AppColors.violet,
                            foregroundColor: Colors.white,
                            padding: const EdgeInsets.symmetric(vertical: 12),
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(10),
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
