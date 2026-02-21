/// Compact preview of upcoming events for the Rencontres Hub.
///
/// Shows 2-3 next events with a "Voir tout" link to the full events list.
library;

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import 'package:my_muqabala/core/constants/app_colors.dart';
import 'package:my_muqabala/core/constants/app_spacing.dart';
import 'package:my_muqabala/core/constants/app_typography.dart';
import 'package:my_muqabala/core/router/route_names.dart';
import 'package:my_muqabala/core/widgets/loading_skeleton.dart';
import 'package:my_muqabala/features/events/presentation/providers/events_provider.dart';
import 'package:my_muqabala/features/events/presentation/widgets/event_card_widget.dart';

class UpcomingEventsPreview extends ConsumerWidget {
  const UpcomingEventsPreview({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final eventsAsync = ref.watch(upcomingEventsProvider);

    return eventsAsync.when(
      loading: () => const LoadingSkeleton(height: 110),
      error: (_, __) => const SizedBox.shrink(),
      data: (events) {
        if (events.isEmpty) {
          return Container(
            width: double.infinity,
            padding: AppSpacing.cardPadding,
            decoration: BoxDecoration(
              color: isDark ? AppColors.darkCard : AppColors.surface,
              borderRadius: AppRadius.borderLg,
              border: Border.all(
                color: isDark ? AppColors.darkBorder : AppColors.divider,
              ),
            ),
            child: Text(
              'Aucun événement à venir pour le moment.',
              style: AppTypography.bodyMedium.copyWith(
                color: isDark ? AppColors.darkInkMuted : AppColors.inkMuted,
              ),
              textAlign: TextAlign.center,
            ),
          );
        }

        final previewEvents = events.take(3).toList();

        return Column(
          children: [
            ...previewEvents.map((event) => EventCardWidget(
                  event: event,
                  onTap: () => context.pushNamed(
                    RouteNames.eventDetail,
                    pathParameters: {'eventId': event.id},
                  ),
                )),
            if (events.length > 3)
              Align(
                alignment: Alignment.centerRight,
                child: TextButton(
                  onPressed: () => context.pushNamed(RouteNames.eventsListing),
                  child: Text(
                    'Voir tout (${events.length})',
                    style: AppTypography.label.copyWith(
                      color: AppColors.violet,
                    ),
                  ),
                ),
              ),
          ],
        );
      },
    );
  }
}
