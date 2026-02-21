/// Repository for match-related operations.
///
/// Handles all Supabase queries related to matches, photo selections,
/// and partner profile data. Used by the matching feature providers.
///
/// ```dart
/// final repo = MatchingRepository(Supabase.instance.client);
/// final match = await repo.getMatchById('some-uuid');
/// ```
library;

import 'package:supabase_flutter/supabase_flutter.dart';

import 'package:my_muqabala/core/utils/logger.dart';
import 'package:my_muqabala/features/matching/data/models/match_model.dart';
import 'package:my_muqabala/features/matching/data/models/photo_selection_model.dart';

/// Repository for match data access and photo selection operations.
class MatchingRepository {
  MatchingRepository(this._supabase);

  final SupabaseClient _supabase;

  // ── Match queries ──────────────────────────────────────────────────────────

  /// Fetches a single match by its [matchId].
  ///
  /// Returns `null` if the match does not exist or the query fails.
  Future<MatchModel?> getMatchById(String matchId) async {
    try {
      AppLogger.debug(
        'Fetching match by ID: $matchId',
        tag: 'MatchingRepo',
      );

      final response = await _supabase
          .from('matches')
          .select()
          .eq('id', matchId)
          .maybeSingle();

      if (response == null) {
        AppLogger.debug(
          'Match not found: $matchId',
          tag: 'MatchingRepo',
        );
        return null;
      }

      return MatchModel.fromJson(response);
    } on Exception catch (e, st) {
      AppLogger.error(
        'Failed to fetch match $matchId',
        tag: 'MatchingRepo',
        error: e,
        stackTrace: st,
      );
      return null;
    }
  }

  /// Fetches a match along with the partner's profile data.
  ///
  /// Determines which user is the partner (the one who is not [currentUserId])
  /// and joins the corresponding profile data from the `profiles` table.
  ///
  /// Returns a map with:
  /// - `match` : the [MatchModel]
  /// - `partner` : a `Map<String, dynamic>` with profile fields
  ///   (prenom, nom, photo_floue_url, bio)
  ///
  /// Returns `null` if the match does not exist.
  Future<Map<String, dynamic>?> getMatchWithPartner(
    String matchId,
    String currentUserId,
  ) async {
    try {
      AppLogger.debug(
        'Fetching match with partner: $matchId (user: $currentUserId)',
        tag: 'MatchingRepo',
      );

      final response = await _supabase
          .from('matches')
          .select()
          .eq('id', matchId)
          .maybeSingle();

      if (response == null) {
        AppLogger.debug(
          'Match not found: $matchId',
          tag: 'MatchingRepo',
        );
        return null;
      }

      final match = MatchModel.fromJson(response);

      // Determine the partner user ID.
      final partnerId =
          match.user1Id == currentUserId ? match.user2Id : match.user1Id;

      // Fetch the partner's profile.
      final profileResponse = await _supabase
          .from('profiles')
          .select('id, prenom, nom, photo_floue_url, bio')
          .eq('id', partnerId)
          .maybeSingle();

      final partnerData = profileResponse ?? <String, dynamic>{};

      AppLogger.info(
        'Match $matchId loaded with partner: ${partnerData['prenom'] ?? 'unknown'}',
        tag: 'MatchingRepo',
      );

      return {
        'match': match,
        'partner': partnerData,
      };
    } on Exception catch (e, st) {
      AppLogger.error(
        'Failed to fetch match with partner: $matchId',
        tag: 'MatchingRepo',
        error: e,
        stackTrace: st,
      );
      return null;
    }
  }

  /// Fetches all matches for a given [userId].
  ///
  /// Returns matches where the user is either `user_1_id` or `user_2_id`,
  /// ordered by creation date (newest first).
  Future<List<MatchModel>> getUserMatches(String userId) async {
    try {
      AppLogger.debug(
        'Fetching matches for user: $userId',
        tag: 'MatchingRepo',
      );

      final response = await _supabase
          .from('matches')
          .select()
          .or('user_1_id.eq.$userId,user_2_id.eq.$userId')
          .order('created_at', ascending: false);

      final matches = (response as List<dynamic>)
          .map((row) => MatchModel.fromJson(row as Map<String, dynamic>))
          .toList();

      AppLogger.info(
        'Loaded ${matches.length} matches for user $userId',
        tag: 'MatchingRepo',
      );

      return matches;
    } on Exception catch (e, st) {
      AppLogger.error(
        'Failed to fetch matches for user $userId',
        tag: 'MatchingRepo',
        error: e,
        stackTrace: st,
      );
      return [];
    }
  }

  // ── Photo selection queries ────────────────────────────────────────────────

  /// Fetches the photo selection entries for an event and selector.
  ///
  /// The [eventId] corresponds to the `event_id` column in `photo_selections`.
  /// Joins with the `profiles` table to retrieve the `photo_floue_url`
  /// for each `photo_user_id`.
  Future<List<PhotoSelectionModel>> getPhotoSelections(
    String eventId,
    String selecteurId,
  ) async {
    try {
      AppLogger.debug(
        'Fetching photo selections: event=$eventId, selecteur=$selecteurId',
        tag: 'MatchingRepo',
      );

      final response = await _supabase
          .from('photo_selections')
          .select('*, profiles!photo_selections_photo_user_id_fkey(photo_floue_url)')
          .eq('event_id', eventId)
          .eq('selecteur_id', selecteurId)
          .order('created_at');

      final selections = (response as List<dynamic>)
          .map(
            (row) => PhotoSelectionModel.fromJson(row as Map<String, dynamic>),
          )
          .toList();

      AppLogger.info(
        'Loaded ${selections.length} photo selections for event $eventId',
        tag: 'MatchingRepo',
      );

      return selections;
    } on Exception catch (e, st) {
      AppLogger.error(
        'Failed to fetch photo selections for event $eventId',
        tag: 'MatchingRepo',
        error: e,
        stackTrace: st,
      );
      return [];
    }
  }

  /// Submits the user's photo selection for an event.
  ///
  /// Sets `is_selected = true` for each photo whose `photo_user_id` is
  /// in [selectedPhotoUserIds], and `is_selected = false` for all others
  /// belonging to this event and selector.
  Future<void> submitPhotoSelections(
    String eventId,
    String selecteurId,
    List<String> selectedPhotoUserIds,
  ) async {
    try {
      AppLogger.info(
        'Submitting ${selectedPhotoUserIds.length} photo selections '
        'for event $eventId',
        tag: 'MatchingRepo',
      );

      // First, reset all selections for this event + selector to false.
      await _supabase
          .from('photo_selections')
          .update({'is_selected': false})
          .eq('event_id', eventId)
          .eq('selecteur_id', selecteurId);

      // Then, set is_selected = true for the chosen photos.
      if (selectedPhotoUserIds.isNotEmpty) {
        await _supabase
            .from('photo_selections')
            .update({'is_selected': true})
            .eq('event_id', eventId)
            .eq('selecteur_id', selecteurId)
            .inFilter('photo_user_id', selectedPhotoUserIds);
      }

      AppLogger.info(
        'Photo selections submitted successfully for event $eventId',
        tag: 'MatchingRepo',
      );
    } on Exception catch (e, st) {
      AppLogger.error(
        'Failed to submit photo selections for event $eventId',
        tag: 'MatchingRepo',
        error: e,
        stackTrace: st,
      );
      rethrow;
    }
  }

  // ── Partner profile query ──────────────────────────────────────────────────

  /// Fetches the partner's profile for a given match.
  ///
  /// Determines the partner user ID from the match and queries the
  /// `profiles` table for their data.
  ///
  /// Returns `null` if the match or profile does not exist.
  Future<Map<String, dynamic>?> getPartnerProfile(
    String matchId,
    String currentUserId,
  ) async {
    try {
      AppLogger.debug(
        'Fetching partner profile: match=$matchId, user=$currentUserId',
        tag: 'MatchingRepo',
      );

      final matchResponse = await _supabase
          .from('matches')
          .select('user_1_id, user_2_id')
          .eq('id', matchId)
          .maybeSingle();

      if (matchResponse == null) {
        AppLogger.debug(
          'Match not found: $matchId',
          tag: 'MatchingRepo',
        );
        return null;
      }

      final user1Id = matchResponse['user_1_id'] as String;
      final user2Id = matchResponse['user_2_id'] as String;
      final partnerId = user1Id == currentUserId ? user2Id : user1Id;

      final profileResponse = await _supabase
          .from('profiles')
          .select('id, prenom, nom, photo_floue_url, bio')
          .eq('id', partnerId)
          .maybeSingle();

      if (profileResponse == null) {
        AppLogger.debug(
          'Partner profile not found: $partnerId',
          tag: 'MatchingRepo',
        );
        return null;
      }

      AppLogger.info(
        'Partner profile loaded: ${profileResponse['prenom']}',
        tag: 'MatchingRepo',
      );

      return profileResponse;
    } on Exception catch (e, st) {
      AppLogger.error(
        'Failed to fetch partner profile for match $matchId',
        tag: 'MatchingRepo',
        error: e,
        stackTrace: st,
      );
      return null;
    }
  }
}
