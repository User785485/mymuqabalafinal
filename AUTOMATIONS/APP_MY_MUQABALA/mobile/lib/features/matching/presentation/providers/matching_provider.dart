/// Riverpod providers for the matching feature.
///
/// Exposes:
/// - [matchingRepositoryProvider] : the [MatchingRepository] backed by Supabase
/// - [matchDetailProvider]        : match + partner data for a given matchId
/// - [userMatchesProvider]        : all matches for the current user
/// - [photoSelectionsProvider]    : photo selections for a given matchId
/// - [matchEventIdProvider]       : resolves matchId to its event_id
library;

import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

import 'package:my_muqabala/core/utils/logger.dart';
import 'package:my_muqabala/features/matching/data/models/match_model.dart';
import 'package:my_muqabala/features/matching/data/models/photo_selection_model.dart';
import 'package:my_muqabala/features/matching/data/repositories/matching_repository.dart';

// =============================================================================
// Repository provider
// =============================================================================

/// Provides the [MatchingRepository] backed by the live Supabase client.
final matchingRepositoryProvider = Provider<MatchingRepository>((ref) {
  return MatchingRepository(Supabase.instance.client);
});

// =============================================================================
// Match detail provider
// =============================================================================

/// Fetches a match along with the partner's profile data.
///
/// Takes a [matchId] as family parameter and returns a map with:
/// - `match` : [MatchModel]
/// - `partner` : `Map<String, dynamic>` with profile fields
///
/// Returns `null` if the user is not authenticated or the match doesn't exist.
final matchDetailProvider = FutureProvider.autoDispose
    .family<Map<String, dynamic>?, String>((ref, matchId) async {
  try {
    final userId = Supabase.instance.client.auth.currentUser?.id;
    if (userId == null) {
      AppLogger.debug(
        'No authenticated user - cannot fetch match detail',
        tag: 'MatchingProvider',
      );
      return null;
    }

    final repository = ref.watch(matchingRepositoryProvider);
    return repository.getMatchWithPartner(matchId, userId);
  } on Exception catch (e, st) {
    AppLogger.error(
      'Error in matchDetailProvider for match: $matchId',
      tag: 'MatchingProvider',
      error: e,
      stackTrace: st,
    );
    return null;
  }
});

// =============================================================================
// User matches list provider
// =============================================================================

/// Fetches all matches for the currently authenticated user.
///
/// Returns an empty list if the user is not authenticated.
final userMatchesProvider =
    FutureProvider.autoDispose<List<MatchModel>>((ref) async {
  try {
    final userId = Supabase.instance.client.auth.currentUser?.id;
    if (userId == null) {
      AppLogger.debug(
        'No authenticated user - cannot fetch matches',
        tag: 'MatchingProvider',
      );
      return [];
    }

    final repository = ref.watch(matchingRepositoryProvider);
    return repository.getUserMatches(userId);
  } on Exception catch (e, st) {
    AppLogger.error(
      'Error in userMatchesProvider',
      tag: 'MatchingProvider',
      error: e,
      stackTrace: st,
    );
    return [];
  }
});

// =============================================================================
// Match event ID resolver
// =============================================================================

/// Resolves a [matchId] to its associated `event_id`.
///
/// The `photo_selections` table uses `event_id` (not `match_id`), so
/// callers that have only a matchId need this provider to look up the
/// event before querying photo selections.
///
/// Returns `null` if the match does not exist or has no event_id.
final matchEventIdProvider = FutureProvider.autoDispose
    .family<String?, String>((ref, matchId) async {
  try {
    final repository = ref.watch(matchingRepositoryProvider);
    final match = await repository.getMatchById(matchId);
    return match?.eventId;
  } on Exception catch (e, st) {
    AppLogger.error(
      'Error resolving event_id for match: $matchId',
      tag: 'MatchingProvider',
      error: e,
      stackTrace: st,
    );
    return null;
  }
});

// =============================================================================
// Photo selections provider
// =============================================================================

/// Fetches photo selection entries for a given match.
///
/// Takes a [matchId] as family parameter. Internally resolves the match's
/// `event_id` (since the `photo_selections` table uses `event_id`, not
/// `match_id`) and then queries by `event_id` + the current user as
/// selector. Returns an empty list if not authenticated or if the match
/// has no associated event.
final photoSelectionsProvider = FutureProvider.autoDispose
    .family<List<PhotoSelectionModel>, String>((ref, matchId) async {
  try {
    final userId = Supabase.instance.client.auth.currentUser?.id;
    if (userId == null) {
      AppLogger.debug(
        'No authenticated user - cannot fetch photo selections',
        tag: 'MatchingProvider',
      );
      return [];
    }

    // Resolve matchId → eventId.
    final eventId = await ref.watch(matchEventIdProvider(matchId).future);
    if (eventId == null) {
      AppLogger.debug(
        'Match $matchId has no event_id - cannot fetch photo selections',
        tag: 'MatchingProvider',
      );
      return [];
    }

    final repository = ref.watch(matchingRepositoryProvider);
    return repository.getPhotoSelections(eventId, userId);
  } on Exception catch (e, st) {
    AppLogger.error(
      'Error in photoSelectionsProvider for match: $matchId',
      tag: 'MatchingProvider',
      error: e,
      stackTrace: st,
    );
    return [];
  }
});
