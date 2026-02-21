/// Repository for Blink Date data operations.
///
/// Handles all Supabase interactions for the Blink Date feature:
/// fetching rounds, updating statuses, requesting LiveKit tokens,
/// and submitting post-call feedback.
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

  // ── LiveKit token ──────────────────────────────────────────────────────

  /// Request a LiveKit access token from the Supabase Edge Function.
  ///
  /// Returns a map containing:
  /// - `token`: the JWT token for LiveKit
  /// - `ws_url`: the WebSocket URL to connect to
  Future<Map<String, dynamic>> getLivekitToken(String roomName) async {
    try {
      final response = await _supabase.functions.invoke(
        'generate-livekit-token',
        body: {'room_name': roomName},
      );

      final data = response.data as Map<String, dynamic>;

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
  ///
  /// Valid statuses: 'en_attente', 'en_cours', 'termine', 'annule'.
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

  /// Submit post-call feedback for a Blink Date round.
  ///
  /// Inserts a row into the `feedback_forms` table with:
  /// - `type_formulaire`: 'post_blink_date'
  /// - `match_id`: the match ID associated with this Blink Date
  /// - `reponses`: the feedback answers (rating, interest, etc.)
  Future<void> submitFeedback(
    String blinkDateId,
    String userId,
    Map<String, dynamic> reponses,
  ) async {
    try {
      // Look up the match_id from the blink_dates table.
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
}
