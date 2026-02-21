/// Repository for event-related Supabase queries.
///
/// Handles:
///   - Listing upcoming & past events
///   - Single event detail fetch
///   - Participant listing (with profile join)
///   - Questionnaire completion check (for pool eligibility)
///
/// ```dart
/// final repo = EventsRepository(Supabase.instance.client);
/// final upcoming = await repo.getUpcomingEvents();
/// ```
library;

import 'package:supabase_flutter/supabase_flutter.dart';

import 'package:my_muqabala/core/utils/logger.dart';
import 'package:my_muqabala/features/events/data/models/event_model.dart';

/// Repository encapsulating all event-related database operations.
class EventsRepository {
  EventsRepository(this._supabase);

  final SupabaseClient _supabase;

  static const _tag = 'EventsRepository';

  // ═══════════════════════════════════════════════════════════════════════════
  // Event listing
  // ═══════════════════════════════════════════════════════════════════════════

  /// Fetches upcoming events that are not cancelled.
  ///
  /// Returns events where `date_evenement > NOW()` and `statut != 'annule'`,
  /// ordered by date ascending (nearest first).
  Future<List<EventModel>> getUpcomingEvents() async {
    try {
      AppLogger.debug('Fetching upcoming events', tag: _tag);

      final now = DateTime.now().toUtc().toIso8601String();

      final response = await _supabase
          .from('events')
          .select()
          .gt('date_evenement', now)
          .neq('statut', 'annule')
          .order('date_evenement', ascending: true);

      final events =
          (response as List).map((row) => EventModel.fromJson(row as Map<String, dynamic>)).toList();

      AppLogger.info(
        'Fetched ${events.length} upcoming events',
        tag: _tag,
      );

      return events;
    } on PostgrestException catch (e, st) {
      AppLogger.error(
        'Failed to fetch upcoming events',
        tag: _tag,
        error: e,
        stackTrace: st,
      );
      rethrow;
    } on Exception catch (e, st) {
      AppLogger.error(
        'Unexpected error fetching upcoming events',
        tag: _tag,
        error: e,
        stackTrace: st,
      );
      rethrow;
    }
  }

  /// Fetches past events (already occurred or cancelled/completed).
  ///
  /// Returns events where `date_evenement <= NOW()` or
  /// `statut IN ('termine', 'annule')`, ordered by date descending
  /// (most recent first).
  Future<List<EventModel>> getPastEvents() async {
    try {
      AppLogger.debug('Fetching past events', tag: _tag);

      final now = DateTime.now().toUtc().toIso8601String();

      final response = await _supabase
          .from('events')
          .select()
          .or('date_evenement.lte.$now,statut.in.(termine,annule)')
          .order('date_evenement', ascending: false);

      final events =
          (response as List).map((row) => EventModel.fromJson(row as Map<String, dynamic>)).toList();

      AppLogger.info(
        'Fetched ${events.length} past events',
        tag: _tag,
      );

      return events;
    } on PostgrestException catch (e, st) {
      AppLogger.error(
        'Failed to fetch past events',
        tag: _tag,
        error: e,
        stackTrace: st,
      );
      rethrow;
    } on Exception catch (e, st) {
      AppLogger.error(
        'Unexpected error fetching past events',
        tag: _tag,
        error: e,
        stackTrace: st,
      );
      rethrow;
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // Single event
  // ═══════════════════════════════════════════════════════════════════════════

  /// Fetches a single event by its ID.
  ///
  /// Returns `null` if no event is found with the given [eventId].
  Future<EventModel?> getEventById(String eventId) async {
    try {
      AppLogger.debug('Fetching event $eventId', tag: _tag);

      final response = await _supabase
          .from('events')
          .select()
          .eq('id', eventId)
          .maybeSingle();

      if (response == null) {
        AppLogger.warning(
          'Event $eventId not found',
          tag: _tag,
        );
        return null;
      }

      final event = EventModel.fromJson(response);

      AppLogger.info(
        'Fetched event: ${event.titre}',
        tag: _tag,
      );

      return event;
    } on PostgrestException catch (e, st) {
      AppLogger.error(
        'Failed to fetch event $eventId',
        tag: _tag,
        error: e,
        stackTrace: st,
      );
      rethrow;
    } on Exception catch (e, st) {
      AppLogger.error(
        'Unexpected error fetching event $eventId',
        tag: _tag,
        error: e,
        stackTrace: st,
      );
      rethrow;
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // Participants
  // ═══════════════════════════════════════════════════════════════════════════

  /// Fetches participants for a given event, including profile info.
  ///
  /// Performs a join between `event_participants` and `profiles` to retrieve
  /// each participant's `prenom` and `photo_floue_url`.
  ///
  /// Returns a list of maps with keys:
  ///   - `user_id` : participant's user ID
  ///   - `prenom`  : first name from profile
  ///   - `photo_floue_url` : blurred photo URL from profile
  ///   - `statut`  : participation status
  ///   - `role_evenement` : role in the event
  Future<List<Map<String, dynamic>>> getEventParticipants(
    String eventId,
  ) async {
    try {
      AppLogger.debug(
        'Fetching participants for event $eventId',
        tag: _tag,
      );

      final response = await _supabase
          .from('event_participants')
          .select('user_id, statut, role_evenement, profiles(prenom, photo_floue_url)')
          .eq('event_id', eventId);

      final participants = (response as List).map((row) {
        final map = row as Map<String, dynamic>;
        final profile = map['profiles'] as Map<String, dynamic>?;

        return <String, dynamic>{
          'user_id': map['user_id'],
          'prenom': profile?['prenom'] ?? 'Participant',
          'photo_floue_url': profile?['photo_floue_url'],
          'statut': map['statut'],
          'role_evenement': map['role_evenement'],
        };
      }).toList();

      AppLogger.info(
        'Fetched ${participants.length} participants for event $eventId',
        tag: _tag,
      );

      return participants;
    } on PostgrestException catch (e, st) {
      AppLogger.error(
        'Failed to fetch participants for event $eventId',
        tag: _tag,
        error: e,
        stackTrace: st,
      );
      rethrow;
    } on Exception catch (e, st) {
      AppLogger.error(
        'Unexpected error fetching participants for event $eventId',
        tag: _tag,
        error: e,
        stackTrace: st,
      );
      rethrow;
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // Participant count
  // ═══════════════════════════════════════════════════════════════════════════

  /// Returns the total number of participants registered for an event.
  Future<int> getParticipantCount(String eventId) async {
    try {
      final response = await _supabase
          .from('event_participants')
          .select('id')
          .eq('event_id', eventId);

      final count = (response as List).length;

      AppLogger.debug(
        'Participant count for event $eventId: $count',
        tag: _tag,
      );

      return count;
    } on PostgrestException catch (e, st) {
      AppLogger.error(
        'Failed to count participants for event $eventId',
        tag: _tag,
        error: e,
        stackTrace: st,
      );
      rethrow;
    } on Exception catch (e, st) {
      AppLogger.error(
        'Unexpected error counting participants for event $eventId',
        tag: _tag,
        error: e,
        stackTrace: st,
      );
      rethrow;
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // Questionnaire / pool status
  // ═══════════════════════════════════════════════════════════════════════════

  /// Checks whether the user has completed the compatibility questionnaire.
  ///
  /// A user is considered "in the pool" when their `statut_parcours` has
  /// progressed past the questionnaire stage (i.e. is not `inscription` or
  /// `questionnaire_en_cours`).
  ///
  /// Returns `false` if the user is not signed in.
  Future<bool> hasCompletedQuestionnaire(String userId) async {
    try {
      AppLogger.debug(
        'Checking questionnaire completion for user $userId',
        tag: _tag,
      );

      final response = await _supabase
          .from('profiles')
          .select('statut_parcours')
          .eq('id', userId)
          .maybeSingle();

      if (response == null) return false;

      final statut = response['statut_parcours'] as String? ?? 'inscription';

      // These statuses mean the questionnaire is NOT yet completed
      final preQuestionnaireStatuses = {
        'inscription',
        'questionnaire_en_cours',
      };

      final completed = !preQuestionnaireStatuses.contains(statut);

      AppLogger.debug(
        'User $userId questionnaire completed: $completed '
        '(statut_parcours: $statut)',
        tag: _tag,
      );

      return completed;
    } on PostgrestException catch (e, st) {
      AppLogger.error(
        'Failed to check questionnaire status for user $userId',
        tag: _tag,
        error: e,
        stackTrace: st,
      );
      rethrow;
    } on Exception catch (e, st) {
      AppLogger.error(
        'Unexpected error checking questionnaire status for user $userId',
        tag: _tag,
        error: e,
        stackTrace: st,
      );
      rethrow;
    }
  }
}
