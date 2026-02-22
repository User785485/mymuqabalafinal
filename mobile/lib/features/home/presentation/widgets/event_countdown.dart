/// Event countdown card for the home screen.
///
/// Displays the next upcoming event with a countdown timer showing
/// days and hours remaining. Features a rose accent border on the left.
library;

import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:intl/intl.dart';
import 'package:shimmer/shimmer.dart';

import 'package:my_muqabala/core/constants/app_colors.dart';
import 'package:my_muqabala/core/constants/app_spacing.dart';
import 'package:my_muqabala/core/constants/app_typography.dart';
import 'package:go_router/go_router.dart';

import 'package:my_muqabala/core/router/route_names.dart';
import 'package:my_muqabala/features/home/presentation/providers/home_provider.dart';

/// Card showing the next event the user is registered for, with a live
/// countdown.
class EventCountdown extends ConsumerWidget {
  const EventCountdown({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final eventAsync = ref.watch(nextEventProvider);

    final isDark = Theme.of(context).brightness == Brightness.dark;

    return eventAsync.when(
      data: (event) {
        if (event == null) return const SizedBox.shrink();
        return _EventCountdownCard(event: event);
      },
      loading: () => Shimmer.fromColors(
        baseColor: isDark ? AppColors.darkCard : AppColors.divider,
        highlightColor: isDark ? AppColors.darkBorder : AppColors.paper,
        child: Container(
          height: 110,
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

/// The actual event card with live countdown timer.
class _EventCountdownCard extends StatefulWidget {
  const _EventCountdownCard({required this.event});

  final Map<String, dynamic> event;

  @override
  State<_EventCountdownCard> createState() => _EventCountdownCardState();
}

class _EventCountdownCardState extends State<_EventCountdownCard> {
  Timer? _timer;
  late Duration _remaining;

  @override
  void initState() {
    super.initState();
    _computeRemaining();
    // Refresh the countdown every minute
    _timer = Timer.periodic(const Duration(minutes: 1), (_) {
      if (mounted) {
        setState(_computeRemaining);
      }
    });
  }

  void _computeRemaining() {
    final dateStr = widget.event['date_evenement'] as String?;
    if (dateStr != null) {
      final eventDate = DateTime.parse(dateStr);
      _remaining = eventDate.difference(DateTime.now());
    } else {
      _remaining = Duration.zero;
    }
  }

  @override
  void dispose() {
    _timer?.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final titre = widget.event['titre'] as String? ?? 'Événement';
    final dateStr = widget.event['date_evenement'] as String?;
    final type = widget.event['type'] as String? ?? '';

    final formattedDate = dateStr != null
        ? DateFormat("EEEE d MMMM 'a' HH'h'mm", 'fr_FR')
            .format(DateTime.parse(dateStr).toLocal())
        : '';

    final days = _remaining.inDays;
    final hours = _remaining.inHours.remainder(24);

    // Build countdown text
    final countdownParts = <String>[];
    if (days > 0) countdownParts.add('$days jour${days > 1 ? 's' : ''}');
    if (hours > 0) countdownParts.add('$hours heure${hours > 1 ? 's' : ''}');
    if (countdownParts.isEmpty) countdownParts.add("Aujourd'hui");
    final countdown = countdownParts.join(', ');

    // Event type icon
    final typeIcon = switch (type) {
      'matching' => Icons.favorite_outline,
      'blink_date' => Icons.visibility_outlined,
      'coaching_groupe' => Icons.groups_outlined,
      _ => Icons.event_outlined,
    };

    return Card(
      clipBehavior: Clip.antiAlias,
      child: IntrinsicHeight(
        child: Row(
          children: [
            // ── Rose accent bar (left) ──────────────────────────────
            Container(
              width: 4,
              decoration: const BoxDecoration(
                color: AppColors.rose,
                borderRadius: BorderRadius.only(
                  topLeft: Radius.circular(16),
                  bottomLeft: Radius.circular(16),
                ),
              ),
            ),

            // ── Content ─────────────────────────────────────────────
            Expanded(
              child: Padding(
                padding: AppSpacing.cardPadding,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // Top row: icon + title
                    Row(
                      children: [
                        Container(
                          padding: const EdgeInsets.all(8),
                          decoration: BoxDecoration(
                            color: isDark ? AppColors.rose.withValues(alpha: 0.15) : AppColors.roseLight,
                            borderRadius: AppRadius.borderSm,
                          ),
                          child: Icon(
                            typeIcon,
                            size: 18,
                            color: AppColors.roseDeep,
                          ),
                        ),
                        AppSpacing.gapHSm,
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                titre,
                                style: AppTypography.labelLarge,
                                maxLines: 1,
                                overflow: TextOverflow.ellipsis,
                              ),
                              if (formattedDate.isNotEmpty)
                                Text(
                                  formattedDate,
                                  style: AppTypography.bodySmall.copyWith(
                                    color: isDark ? AppColors.darkInkMuted : AppColors.inkMuted,
                                  ),
                                  maxLines: 1,
                                  overflow: TextOverflow.ellipsis,
                                ),
                            ],
                          ),
                        ),
                      ],
                    ),
                    AppSpacing.gapSm,

                    // Countdown
                    Container(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 12,
                        vertical: 6,
                      ),
                      decoration: BoxDecoration(
                        color: isDark ? AppColors.rose.withValues(alpha: 0.15) : AppColors.roseLight,
                        borderRadius: AppRadius.borderCircular,
                      ),
                      child: Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          const Icon(
                            Icons.timer_outlined,
                            size: 16,
                            color: AppColors.roseDeep,
                          ),
                          AppSpacing.gapHXs,
                          Text(
                            countdown,
                            style: AppTypography.labelMedium.copyWith(
                              color: AppColors.roseDeep,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                        ],
                      ),
                    ),
                    AppSpacing.gapSm,

                    // Link
                    Align(
                      alignment: Alignment.centerRight,
                      child: GestureDetector(
                        onTap: () {
                          final eventId = widget.event['id'] as String?;
                          if (eventId != null) {
                            context.pushNamed(
                              RouteNames.eventDetail,
                              pathParameters: {'eventId': eventId},
                            );
                          }
                        },
                        child: Row(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            Text(
                              "Voir l'événement",
                              style: AppTypography.labelMedium.copyWith(
                                color: AppColors.rose,
                                fontWeight: FontWeight.w600,
                              ),
                            ),
                            AppSpacing.gapHXs,
                            const Icon(
                              Icons.arrow_forward,
                              size: 14,
                              color: AppColors.rose,
                            ),
                          ],
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
