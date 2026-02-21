/// Riverpod providers for the Events feature.
///
/// Exposes:
///   - [eventsRepositoryProvider] — singleton repository
///   - [upcomingEventsProvider]   — list of future events
///   - [pastEventsProvider]       — list of past / completed events
///   - [eventDetailProvider]      — single event by ID (family)
///   - [eventParticipantsProvider] — participants for an event (family)
///   - [hasCompletedQuestionnaireProvider] — pool eligibility check
library;

import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

import 'package:my_muqabala/features/events/data/models/event_model.dart';
import 'package:my_muqabala/features/events/data/repositories/events_repository.dart';

// ═══════════════════════════════════════════════════════════════════════════════
// Repository provider
// ═══════════════════════════════════════════════════════════════════════════════

/// Provides the [EventsRepository] backed by the live Supabase client.
final eventsRepositoryProvider = Provider<EventsRepository>((ref) {
  return EventsRepository(Supabase.instance.client);
});

// ═══════════════════════════════════════════════════════════════════════════════
// Current user ID (local to events feature)
// ═══════════════════════════════════════════════════════════════════════════════

/// Provides the authenticated user's ID, or `null` if not signed in.
final _currentUserIdProvider = Provider<String?>((ref) {
  return Supabase.instance.client.auth.currentUser?.id;
});

// ═══════════════════════════════════════════════════════════════════════════════
// Event list providers
// ═══════════════════════════════════════════════════════════════════════════════

/// Fetches all upcoming (future, non-cancelled) events.
///
/// Auto-disposes when no longer watched. Pull-to-refresh can invalidate this.
final upcomingEventsProvider =
    FutureProvider.autoDispose<List<EventModel>>((ref) async {
  final repo = ref.watch(eventsRepositoryProvider);
  return repo.getUpcomingEvents();
});

/// Fetches all past or completed events.
///
/// Auto-disposes when no longer watched.
final pastEventsProvider =
    FutureProvider.autoDispose<List<EventModel>>((ref) async {
  final repo = ref.watch(eventsRepositoryProvider);
  return repo.getPastEvents();
});

// ═══════════════════════════════════════════════════════════════════════════════
// Single event detail provider (family)
// ═══════════════════════════════════════════════════════════════════════════════

/// Fetches a single event by [eventId].
///
/// Returns `null` if the event does not exist.
final eventDetailProvider =
    FutureProvider.autoDispose.family<EventModel?, String>((
  ref,
  eventId,
) async {
  final repo = ref.watch(eventsRepositoryProvider);
  return repo.getEventById(eventId);
});

// ═══════════════════════════════════════════════════════════════════════════════
// Participants provider (family)
// ═══════════════════════════════════════════════════════════════════════════════

/// Fetches the participant list (with profile data) for a given [eventId].
final eventParticipantsProvider =
    FutureProvider.autoDispose.family<List<Map<String, dynamic>>, String>((
  ref,
  eventId,
) async {
  final repo = ref.watch(eventsRepositoryProvider);
  return repo.getEventParticipants(eventId);
});

// ═══════════════════════════════════════════════════════════════════════════════
// Questionnaire / pool eligibility check
// ═══════════════════════════════════════════════════════════════════════════════

/// Checks whether the current user has completed the compatibility
/// questionnaire and is therefore in the matching pool.
///
/// Returns `false` if the user is not signed in.
final hasCompletedQuestionnaireProvider =
    FutureProvider.autoDispose<bool>((ref) async {
  final userId = ref.watch(_currentUserIdProvider);
  if (userId == null) return false;

  final repo = ref.watch(eventsRepositoryProvider);
  return repo.hasCompletedQuestionnaire(userId);
});

// ═══════════════════════════════════════════════════════════════════════════════
// Refresh helper
// ═══════════════════════════════════════════════════════════════════════════════

/// Invalidates all event-related providers to trigger a full refresh.
///
/// Call this from pull-to-refresh handlers.
void refreshAllEventsData(WidgetRef ref) {
  ref.invalidate(upcomingEventsProvider);
  ref.invalidate(pastEventsProvider);
}

// ═══════════════════════════════════════════════════════════════════════════════
// Participation status provider (family by event ID)
// ═══════════════════════════════════════════════════════════════════════════════

/// Returns the current user's participation status for a given event.
///
/// Returns `null` if the user is not registered as a participant.
/// Values: `'inscrit'` (pending), `'confirme'`, `'present'`, `'absent'`.
final myParticipationStatusProvider =
    FutureProvider.autoDispose.family<String?, String>((
  ref,
  eventId,
) async {
  final userId = ref.watch(_currentUserIdProvider);
  if (userId == null) return null;

  final repo = ref.watch(eventsRepositoryProvider);
  return repo.getMyParticipationStatus(eventId, userId);
});

// ═══════════════════════════════════════════════════════════════════════════════
// Confirm / Decline participation notifiers
// ═══════════════════════════════════════════════════════════════════════════════

/// Notifier that handles confirming event participation.
///
/// After a successful confirmation, invalidates the participation status
/// provider so the UI updates reactively.
final confirmParticipationProvider =
    FutureProvider.autoDispose.family<Map<String, dynamic>, String>((
  ref,
  eventId,
) async {
  final repo = ref.watch(eventsRepositoryProvider);
  final result = await repo.confirmParticipation(eventId);
  // Invalidate status so UI updates
  ref.invalidate(myParticipationStatusProvider(eventId));
  ref.invalidate(eventParticipantsProvider(eventId));
  return result;
});

/// Notifier that handles declining event participation.
///
/// After a successful decline, invalidates the participation status
/// provider so the UI updates reactively.
final declineParticipationProvider =
    FutureProvider.autoDispose.family<Map<String, dynamic>, String>((
  ref,
  eventId,
) async {
  final repo = ref.watch(eventsRepositoryProvider);
  final result = await repo.declineParticipation(eventId);
  // Invalidate status so UI updates
  ref.invalidate(myParticipationStatusProvider(eventId));
  ref.invalidate(eventParticipantsProvider(eventId));
  return result;
});
