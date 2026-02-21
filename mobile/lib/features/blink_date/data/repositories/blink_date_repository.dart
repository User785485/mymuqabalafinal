/// Repository for Blink Date data operations.
///
/// Handles all Supabase interactions for the Blink Date feature:
/// fetching rounds, updating statuses, requesting LiveKit tokens,
/// submitting post-call feedback, photo selections, and match results.
library;

import 'package:supabase_flutter/supabase_flutter.dart';

import 'package:my_muqabala/core/utils/logger.dart';
import 'package:my_muqabala/features/blink_date/data/models/blink_date_model.dart';

/// Data layer for Blink Date operations against Supabase.
class BlinkDateRepository {
  BlinkDateRepository(this._supabase);

  final SupabaseClient _supabase;
  static const _tag = 'BlinkDateRepo';

  // ── Queries ────────────────────────────────────────────────────────────

  /// Fetch a single Blink Date by its ID.
  Future<BlinkDateModel?> getBlinkDate(String id) async {
    try {
      final data = await _supabase
          .from('blink_dates')
          .select()
          .eq('id', id)
          .maybeSingle();

      if (data == null) {
        AppLogger.debug('BlinkDate $id not found', tag: _tag);
        return null;
      }

      return BlinkDateModel.fromJson(data);
    } catch (e, st) {
      AppLogger.error(
        'Failed to fetch BlinkDate $id',
        tag: _tag,
        error: e,
        stackTrace: st,
      );
      rethrow;
    }
  }

  /// Fetch all Blink Date rounds for a given match, ordered by round number.
  Future<List<BlinkDateModel>> getBlinkDatesForMatch(String matchId) async {
    try {
      final data = await _supabase
          .from('blink_dates')
          .select()
          .eq('match_id', matchId)
          .order('ordre', ascending: true);

      final results =
          (data as List<Map<String, dynamic>>).map((row) => BlinkDateModel.fromJson(row)).toList();

      AppLogger.info(
        'Loaded ${results.length} rounds for match $matchId',
        tag: _tag,
      );
      return results;
    } catch (e, st) {
      AppLogger.error(
        'Failed to fetch BlinkDates for match $matchId',
        tag: _tag,
        error: e,
        stackTrace: st,
      );
      rethrow;
    }
  }

  /// Fetch all Blink Date rounds for the current user in an event.
  ///
  /// Uses RPC `get_user_blink_dates_for_event` which returns rounds
  /// with partner info (prenom, photo floue, room_name).
  Future<List<BlinkDateModel>> getBlinkDatesForEvent(String eventId) async {
    try {
      final userId = _supabase.auth.currentUser?.id;
      if (userId == null) throw Exception('Not authenticated');

      final data = await _supabase.rpc('get_user_blink_dates_for_event', params: {
        'p_event_id': eventId,
        'p_user_id': userId,
      });

      final rawList = data as List<dynamic>? ?? [];
      final results = rawList
          .map((item) => BlinkDateModel.fromJson(item as Map<String, dynamic>))
          .toList();

      AppLogger.info(
        'Loaded ${results.length} blink dates for event $eventId',
        tag: _tag,
      );
      return results;
    } catch (e, st) {
      AppLogger.error(
        'Failed to fetch BlinkDates for event $eventId',
        tag: _tag,
        error: e,
        stackTrace: st,
      );
      rethrow;
    }
  }

  // ── LiveKit token ──────────────────────────────────────────────────────

  /// Request a LiveKit access token from the Supabase Edge Function.
  Future<Map<String, dynamic>> getLivekitToken(String roomName) async {
    try {
      final response = await _supabase.functions.invoke(
        'generate-livekit-token',
        body: {'room_name': roomName},
      );

      if (response.data == null) {
        throw Exception('LiveKit token response is null for room "$roomName"');
      }
      final data = response.data is Map<String, dynamic>
          ? response.data as Map<String, dynamic>
          : throw Exception('LiveKit token response is not a valid Map for room "$roomName"');

      AppLogger.info(
        'Obtained LiveKit token for room "$roomName"',
        tag: _tag,
      );
      return data;
    } catch (e, st) {
      AppLogger.error(
        'Failed to get LiveKit token for room "$roomName"',
        tag: _tag,
        error: e,
        stackTrace: st,
      );
      rethrow;
    }
  }

  // ── Mutations ──────────────────────────────────────────────────────────

  /// Update the status of a Blink Date round.
  Future<void> updateBlinkDateStatus(String id, String statut) async {
    try {
      await _supabase
          .from('blink_dates')
          .update({'statut': statut})
          .eq('id', id);

      AppLogger.info(
        'Updated BlinkDate $id status to "$statut"',
        tag: _tag,
      );
    } catch (e, st) {
      AppLogger.error(
        'Failed to update BlinkDate $id status',
        tag: _tag,
        error: e,
        stackTrace: st,
      );
      rethrow;
    }
  }

  /// Submit binary feedback for a blink date round.
  ///
  /// Uses RPC `submit_blink_date_feedback` to set wants_to_continue.
  Future<Map<String, dynamic>> submitBlinkDateFeedback(
    String blinkDateId,
    bool wantsToContinue,
  ) async {
    try {
      final data = await _supabase.rpc('submit_blink_date_feedback', params: {
        'p_blink_date_id': blinkDateId,
        'p_wants_to_continue': wantsToContinue,
      });

      AppLogger.info(
        'Submitted feedback for BlinkDate $blinkDateId: $wantsToContinue',
        tag: _tag,
      );
      return data as Map<String, dynamic>? ?? {'success': true};
    } catch (e, st) {
      AppLogger.error(
        'Failed to submit feedback for BlinkDate $blinkDateId',
        tag: _tag,
        error: e,
        stackTrace: st,
      );
      rethrow;
    }
  }

  /// Submit post-call feedback (legacy star rating format).
  Future<void> submitFeedback(
    String blinkDateId,
    String userId,
    Map<String, dynamic> reponses,
  ) async {
    try {
      final blinkDate = await _supabase
          .from('blink_dates')
          .select('match_id')
          .eq('id', blinkDateId)
          .single();

      await _supabase.from('feedback_forms').insert({
        'user_id': userId,
        'type_formulaire': 'post_blink_date',
        'match_id': blinkDate['match_id'],
        'reponses': reponses,
      });

      AppLogger.info(
        'Submitted feedback for BlinkDate $blinkDateId',
        tag: _tag,
      );
    } catch (e, st) {
      AppLogger.error(
        'Failed to submit feedback for BlinkDate $blinkDateId',
        tag: _tag,
        error: e,
        stackTrace: st,
      );
      rethrow;
    }
  }

  // ── Photo selections ──────────────────────────────────────────────────

  /// Get partner photos for the photo reveal phase.
  Future<List<Map<String, dynamic>>> getPartnerPhotosForEvent(
    String eventId,
  ) async {
    try {
      final userId = _supabase.auth.currentUser?.id;
      if (userId == null) throw Exception('Not authenticated');

      final data = await _supabase
          .from('photo_selections')
          .select('id, photo_user_id, is_leurre, is_selected, profiles:photo_user_id(photo_nette_url)')
          .eq('event_id', eventId)
          .eq('selecteur_id', userId);

      final results = (data as List<dynamic>).map((row) {
        final r = row as Map<String, dynamic>;
        final profile = r['profiles'] as Map<String, dynamic>?;
        return {
          'id': r['id'],
          'photo_user_id': r['photo_user_id'],
          'is_leurre': r['is_leurre'],
          'is_selected': r['is_selected'],
          'photo_nette_url': profile?['photo_nette_url'],
        };
      }).toList();

      results.shuffle();

      AppLogger.info(
        'Loaded ${results.length} photo selections for event $eventId',
        tag: _tag,
      );
      return results;
    } catch (e, st) {
      AppLogger.error(
        'Failed to fetch photo selections for event $eventId',
        tag: _tag,
        error: e,
        stackTrace: st,
      );
      rethrow;
    }
  }

  /// Submit photo selections for the event.
  Future<Map<String, dynamic>> submitPhotoSelections(
    String eventId,
    List<String> selectedIds,
  ) async {
    try {
      final data = await _supabase.rpc('submit_photo_selections_for_event', params: {
        'p_event_id': eventId,
        'p_selections': selectedIds,
      });

      AppLogger.info(
        'Submitted ${selectedIds.length} photo selections for event $eventId',
        tag: _tag,
      );
      return data as Map<String, dynamic>? ?? {'success': true};
    } catch (e, st) {
      AppLogger.error(
        'Failed to submit photo selections for event $eventId',
        tag: _tag,
        error: e,
        stackTrace: st,
      );
      rethrow;
    }
  }

  // ── Match results ─────────────────────────────────────────────────────

  /// Get final match results for the current user in an event.
  Future<List<Map<String, dynamic>>> getMatchResults(String eventId) async {
    try {
      final userId = _supabase.auth.currentUser?.id;
      if (userId == null) throw Exception('Not authenticated');

      final data = await _supabase.rpc('get_user_match_results', params: {
        'p_event_id': eventId,
        'p_user_id': userId,
      });

      final results = (data as List<dynamic>?)
              ?.map((item) => item as Map<String, dynamic>)
              .toList() ??
          [];

      AppLogger.info(
        'Loaded ${results.length} match results for event $eventId',
        tag: _tag,
      );
      return results;
    } catch (e, st) {
      AppLogger.error(
        'Failed to fetch match results for event $eventId',
        tag: _tag,
        error: e,
        stackTrace: st,
      );
      rethrow;
    }
  }
}
