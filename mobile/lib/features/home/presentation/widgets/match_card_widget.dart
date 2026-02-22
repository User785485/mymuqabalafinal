/// Active match card widget for the home screen.
///
/// Shows the current match with a blurred photo avatar, partner's first
/// name, hobby tags, and a circular compatibility percentage indicator.
/// Features a subtle violet gradient background.
library;

import 'dart:ui';

import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:shimmer/shimmer.dart';

import 'package:my_muqabala/core/widgets/tappable_card.dart';

import 'package:my_muqabala/core/constants/app_colors.dart';
import 'package:my_muqabala/core/constants/app_spacing.dart';
import 'package:my_muqabala/core/constants/app_typography.dart';
import 'package:my_muqabala/core/router/route_names.dart';
import 'package:my_muqabala/features/home/presentation/providers/home_provider.dart';

/// Card displaying the user's active match partner.
class MatchCardWidget extends ConsumerWidget {
  const MatchCardWidget({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final matchAsync = ref.watch(activeMatchProvider);

    return matchAsync.when(
      data: (match) {
        if (match == null) return const SizedBox.shrink();
        return _ActiveMatchCard(match: match);
      },
      loading: () => Shimmer.fromColors(
        baseColor: isDark ? AppColors.darkCard : AppColors.divider,
        highlightColor: isDark ? AppColors.darkBorder : AppColors.paper,
        child: Container(
          height: 100,
          decoration: BoxDecoration(
            color: isDark ? AppColors.darkCard : AppColors.divider,
            borderRadius: AppRadius.borderLg,
          ),
        ),
      ),
      error: (_, __) => const SizedBox.shrink(),
    );
  }
}

class _ActiveMatchCard extends StatelessWidget {
  const _ActiveMatchCard({required this.match});

  final Map<String, dynamic> match;

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final partner = match['partner'] as Map<String, dynamic>? ?? {};
    final prenom = partner['prenom'] as String? ?? '???';
    final nom = partner['nom'] as String? ?? '';
    final photoUrl = partner['photo_floue_url'] as String?;
    final metadata = partner['metadata'] as Map<String, dynamic>? ?? {};
    final hobbies = (metadata['hobbies'] as List<dynamic>?)
            ?.map((e) => e.toString())
            .take(3)
            .toList() ??
        [];

    final score = match['score_compatibilite'];
    final compatPercent = score != null ? (score as num).toInt() : 0;

    // Initial for fallback avatar
    final initial = prenom.isNotEmpty ? prenom[0].toUpperCase() : '?';
    // Display name: "Prenom N."
    final displayName =
        nom.isNotEmpty ? '$prenom ${nom[0].toUpperCase()}.' : prenom;

    return TappableCard(
      onTap: () {
        context.pushNamed(RouteNames.rencontresEnCours);
      },
      child: Container(
        decoration: BoxDecoration(
          borderRadius: AppRadius.borderLg,
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: isDark
                ? [
                    AppColors.violet.withValues(alpha: 0.15),
                    AppColors.darkCard,
                    AppColors.violet.withValues(alpha: 0.08),
                  ]
                : [
                    AppColors.purpleLight.withValues(alpha: 0.5),
                    Colors.white,
                    AppColors.purpleLight.withValues(alpha: 0.2),
                  ],
            stops: const [0.0, 0.5, 1.0],
          ),
          border: Border.all(color: isDark ? AppColors.darkBorder : AppColors.divider),
        ),
        child: Padding(
          padding: AppSpacing.cardPadding,
          child: Row(
            children: [
              // ── Blurred photo avatar (64px) ────────────────────────
              _BlurredAvatar(
                photoUrl: photoUrl,
                initial: initial,
              ),
              AppSpacing.gapHMd,

              // ── Name + hobbies ─────────────────────────────────────
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      displayName,
                      style: AppTypography.labelLarge.copyWith(
                        color: isDark ? AppColors.darkInk : AppColors.ink,
                        fontSize: 16,
                      ),
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                    ),
                    if (hobbies.isNotEmpty) ...[
                      AppSpacing.gapXs,
                      Wrap(
                        spacing: AppSpacing.xs,
                        runSpacing: AppSpacing.xs,
                        children: hobbies.map((hobby) {
                          return Container(
                            padding: const EdgeInsets.symmetric(
                              horizontal: 8,
                              vertical: 3,
                            ),
                            decoration: BoxDecoration(
                              color: isDark ? AppColors.violet.withValues(alpha: 0.15) : AppColors.purpleLight,
                              borderRadius: AppRadius.borderCircular,
                            ),
                            child: Text(
                              hobby,
                              style: AppTypography.labelSmall.copyWith(
                                color: AppColors.purple,
                                fontWeight: FontWeight.w500,
                              ),
                            ),
                          );
                        }).toList(),
                      ),
                    ],
                  ],
                ),
              ),
              AppSpacing.gapHSm,

              // ── Compatibility percentage circle ────────────────────
              _CompatibilityCircle(percent: compatPercent),
            ],
          ),
        ),
      ),
    );
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// Blurred Avatar
// ═══════════════════════════════════════════════════════════════════════════

class _BlurredAvatar extends StatelessWidget {
  const _BlurredAvatar({
    required this.photoUrl,
    required this.initial,
  });

  final String? photoUrl;
  final String initial;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: 64,
      height: 64,
      child: ClipRRect(
        borderRadius: AppRadius.borderMd,
        child: photoUrl != null && photoUrl!.isNotEmpty
            ? ImageFiltered(
                imageFilter: ImageFilter.blur(sigmaX: 6, sigmaY: 6),
                child: CachedNetworkImage(
                  imageUrl: photoUrl!,
                  width: 64,
                  height: 64,
                  fit: BoxFit.cover,
                  placeholder: (_, __) => _FallbackAvatar(initial: initial),
                  errorWidget: (_, __, ___) =>
                      _FallbackAvatar(initial: initial),
                ),
              )
            : _FallbackAvatar(initial: initial),
      ),
    );
  }
}

class _FallbackAvatar extends StatelessWidget {
  const _FallbackAvatar({required this.initial});

  final String initial;

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Container(
      width: 64,
      height: 64,
      decoration: BoxDecoration(
        color: isDark ? AppColors.violet.withValues(alpha: 0.2) : AppColors.purpleLight,
        borderRadius: AppRadius.borderMd,
      ),
      child: Center(
        child: Text(
          initial,
          style: AppTypography.displayMedium.copyWith(
            color: AppColors.purple,
            fontWeight: FontWeight.w600,
          ),
        ),
      ),
    );
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// Compatibility Percentage Circle
// ═══════════════════════════════════════════════════════════════════════════

class _CompatibilityCircle extends StatelessWidget {
  const _CompatibilityCircle({required this.percent});

  final int percent;

  @override
  Widget build(BuildContext context) {
    final progress = percent / 100;

    // Color based on compatibility level
    final color = percent >= 80
        ? AppColors.sage
        : percent >= 60
            ? AppColors.gold
            : AppColors.rose;

    return SizedBox(
      width: 52,
      height: 52,
      child: Stack(
        alignment: Alignment.center,
        children: [
          // Background track
          CircularProgressIndicator(
            value: 1.0,
            strokeWidth: 4,
            backgroundColor: Colors.transparent,
            valueColor: AlwaysStoppedAnimation<Color>(
              color.withValues(alpha: 0.2),
            ),
          ),
          // Animated progress arc
          TweenAnimationBuilder<double>(
            tween: Tween<double>(begin: 0, end: progress),
            duration: const Duration(milliseconds: 900),
            curve: Curves.easeOutCubic,
            builder: (context, value, _) {
              return CircularProgressIndicator(
                value: value,
                strokeWidth: 4,
                backgroundColor: Colors.transparent,
                valueColor: AlwaysStoppedAnimation<Color>(color),
                strokeCap: StrokeCap.round,
              );
            },
          ),
          // Percentage text
          Text(
            '$percent%',
            style: AppTypography.labelMedium.copyWith(
              color: color,
              fontWeight: FontWeight.w700,
              fontSize: 13,
            ),
          ),
        ],
      ),
    );
  }
}
