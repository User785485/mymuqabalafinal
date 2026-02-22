/// Main events screen with two tabs: upcoming and past events.
///
/// Displays a [DefaultTabController] with "A venir" and "Passes" tabs.
/// Each tab shows a scrollable list of [EventCardWidget] items with
/// pull-to-refresh, empty states, and loading skeletons.
///
/// Tapping a card navigates to the event detail screen via go_router.
library;

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import 'package:my_muqabala/core/constants/app_colors.dart';
import 'package:my_muqabala/core/constants/app_spacing.dart';
import 'package:my_muqabala/core/constants/app_typography.dart';
import 'package:my_muqabala/core/router/route_names.dart';
import 'package:my_muqabala/core/widgets/empty_state.dart';
import 'package:my_muqabala/core/widgets/profile_app_bar_action.dart';
import 'package:my_muqabala/core/widgets/loading_skeleton.dart';
import 'package:my_muqabala/features/events/data/models/event_model.dart';
import 'package:my_muqabala/features/events/presentation/providers/events_provider.dart';
import 'package:my_muqabala/features/events/presentation/widgets/event_card_widget.dart';

/// Screen listing upcoming and past events in two tabs.
///
/// This widget replaces the initial stub. Constructor matches the
/// router declaration: `const EventsScreen({super.key})`.
class EventsScreen extends ConsumerWidget {
  const EventsScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return DefaultTabController(
      length: 2,
      child: Scaffold(
        backgroundColor: isDark ? AppColors.darkBg : AppColors.paper,
        appBar: AppBar(
          title: Text(
            'Rencontres',
            style: AppTypography.h2.copyWith(
              color: isDark ? AppColors.darkInk : AppColors.ink,
            ),
          ),
          centerTitle: false,
          elevation: 0,
          scrolledUnderElevation: 0.5,
          backgroundColor: isDark ? AppColors.darkBg : AppColors.paper,
          actions: const [ProfileAppBarAction()],
          bottom: TabBar(
            labelColor: AppColors.violet,
            unselectedLabelColor:
                isDark ? AppColors.darkInkMuted : AppColors.inkMuted,
            labelStyle: AppTypography.label,
            unselectedLabelStyle: AppTypography.bodyMedium,
            indicatorColor: AppColors.violet,
            indicatorWeight: 2.5,
            dividerColor: isDark ? AppColors.darkBorder : AppColors.divider,
            tabs: const [
              Tab(text: '\u00c0 venir'),
              Tab(text: 'Pass\u00e9s'),
            ],
          ),
        ),
        body: const TabBarView(
          children: [
            _UpcomingEventsTab(),
            _PastEventsTab(),
          ],
        ),
      ),
    );
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// Upcoming events tab
// ═══════════════════════════════════════════════════════════════════════════════

class _UpcomingEventsTab extends ConsumerWidget {
  const _UpcomingEventsTab();

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final eventsAsync = ref.watch(upcomingEventsProvider);

    return eventsAsync.when(
      loading: () => const _EventsLoadingSkeleton(),
      error: (error, _) => _EventsErrorView(
        error: error,
        onRetry: () => ref.invalidate(upcomingEventsProvider),
      ),
      data: (events) {
        if (events.isEmpty) {
          return const _EventsEmptyState(
            title: 'Aucun \u00e9v\u00e9nement \u00e0 venir',
            subtitle:
                'Les prochains \u00e9v\u00e9nements appara\u00eetront ici '
                'd\u00e8s qu\'ils seront planifi\u00e9s.',
          );
        }

        return RefreshIndicator(
          color: AppColors.violet,
          onRefresh: () async {
            ref.invalidate(upcomingEventsProvider);
            // Wait for the provider to complete
            await ref.read(upcomingEventsProvider.future);
          },
          child: _EventsList(events: events),
        );
      },
    );
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// Past events tab
// ═══════════════════════════════════════════════════════════════════════════════

class _PastEventsTab extends ConsumerWidget {
  const _PastEventsTab();

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final eventsAsync = ref.watch(pastEventsProvider);

    return eventsAsync.when(
      loading: () => const _EventsLoadingSkeleton(),
      error: (error, _) => _EventsErrorView(
        error: error,
        onRetry: () => ref.invalidate(pastEventsProvider),
      ),
      data: (events) {
        if (events.isEmpty) {
          return const _EventsEmptyState(
            title: 'Aucun \u00e9v\u00e9nement pass\u00e9',
            subtitle:
                'Ton historique d\'événements apparaîtra ici.',
          );
        }

        return RefreshIndicator(
          color: AppColors.violet,
          onRefresh: () async {
            ref.invalidate(pastEventsProvider);
            await ref.read(pastEventsProvider.future);
          },
          child: _EventsList(events: events),
        );
      },
    );
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// Shared events list
// ═══════════════════════════════════════════════════════════════════════════════

class _EventsList extends StatelessWidget {
  const _EventsList({required this.events});

  final List<EventModel> events;

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      padding: const EdgeInsets.only(top: 8, bottom: AppSpacing.lg),
      physics: const AlwaysScrollableScrollPhysics(),
      itemCount: events.length,
      itemBuilder: (context, index) {
        final event = events[index];

        return EventCardWidget(
          event: event,
          onTap: () {
            context.pushNamed(
              RouteNames.eventDetail,
              pathParameters: {'eventId': event.id},
            );
          },
        );
      },
    );
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// Loading skeleton
// ═══════════════════════════════════════════════════════════════════════════════

class _EventsLoadingSkeleton extends StatelessWidget {
  const _EventsLoadingSkeleton();

  @override
  Widget build(BuildContext context) {
    return const Padding(
      padding: EdgeInsets.only(top: 12),
      child: LoadingSkeletonList(
        itemCount: 4,
        itemHeight: 110,
        spacing: 12,
        padding: EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      ),
    );
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// Empty state
// ═══════════════════════════════════════════════════════════════════════════════

class _EventsEmptyState extends StatelessWidget {
  const _EventsEmptyState({
    required this.title,
    this.subtitle,
  });

  final String title;
  final String? subtitle;

  @override
  Widget build(BuildContext context) {
    return Center(
      child: EmptyState(
        icon: Icons.event_outlined,
        title: title,
        subtitle: subtitle,
        iconColor: AppColors.violet.withValues(alpha: 0.6),
      ),
    );
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// Error view
// ═══════════════════════════════════════════════════════════════════════════════

class _EventsErrorView extends StatelessWidget {
  const _EventsErrorView({
    required this.error,
    required this.onRetry,
  });

  final Object error;
  final VoidCallback onRetry;

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Center(
      child: Padding(
        padding: AppSpacing.screenPadding,
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(
              Icons.error_outline_rounded,
              size: 48,
              color: AppColors.error.withValues(alpha: 0.7),
            ),
            AppSpacing.gapMd,
            Text(
              'Erreur de chargement',
              style: AppTypography.h3.copyWith(
                color: isDark ? AppColors.darkInk : AppColors.ink,
              ),
              textAlign: TextAlign.center,
            ),
            AppSpacing.gapSm,
            Text(
              'Impossible de charger les \u00e9v\u00e9nements.\n'
              'V\u00e9rifie ta connexion et réessaie.',
              style: AppTypography.bodyMedium.copyWith(
                color: isDark ? AppColors.darkInkMuted : AppColors.inkMuted,
              ),
              textAlign: TextAlign.center,
            ),
            AppSpacing.gapLg,
            TextButton.icon(
              onPressed: onRetry,
              icon: const Icon(Icons.refresh_rounded),
              label: const Text('R\u00e9essayer'),
              style: TextButton.styleFrom(
                foregroundColor: AppColors.violet,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
