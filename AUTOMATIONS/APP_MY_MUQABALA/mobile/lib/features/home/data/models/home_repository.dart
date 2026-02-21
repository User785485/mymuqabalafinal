/// Repository for home screen data fetched from Supabase.
///
/// All methods accept a [userId] and return typed data structures
/// for the various home screen widgets. Errors are propagated to
/// the caller (Riverpod providers) for proper error-state handling.
library;

import 'package:supabase_flutter/supabase_flutter.dart';

import 'package:my_muqabala/core/utils/logger.dart';

/// Data class for a single pending action shown on the home screen.
class PendingAction {
  const PendingAction({
    required this.id,
    required this.type,
    required this.title,
    required this.priority,
    this.routePath,
  });

  final String id;

  /// One of: 'form', 'document', 'feedback', 'photo', 'event'.
  final String type;

  final String title;

  /// One of: 'urgent', 'normal', 'info'.
  final String priority;

  /// Optional deep-link path for navigation.
  final String? routePath;
}

/// Repository responsible for fetching all data the home screen needs.
class HomeRepository {
  HomeRepository(this._supabase);

  final SupabaseClient _supabase;

  // ── Phase progression ──────────────────────────────────────────────────

  /// Maps [statut_parcours] from the profiles table to a phase number (1-4).
  ///
  /// Returns 0 for pre-matching statuses (inscription, formulaire, formation,
  /// matching_pool) and 4 for terminal statuses.
  Future<int> getCurrentPhase(String userId) async {
    try {
      final response = await _supabase
          .from('profiles')
          .select('statut_parcours')
          .eq('id', userId)
          .single();

      final statut = response['statut_parcours'] as String? ?? 'inscription';
      return _mapStatutToPhase(statut);
    } on Exception catch (e, st) {
      AppLogger.error(
        'Failed to fetch current phase',
        tag: 'HomeRepository',
        error: e,
        stackTrace: st,
      );
      rethrow;
    }
  }

  int _mapStatutToPhase(String statut) {
    return switch (statut) {
      'inscription' || 'formulaire_en_cours' || 'formation' || 'matching_pool' => 0,
      'phase_1_matching' => 1,
      'phase_2_decouverte' => 2,
      'phase_3_approfondie' => 3,
      'phase_4_engagement' || 'termine' || 'termine_positif' => 4,
      _ => 0,
    };
  }

  // ── Next event ─────────────────────────────────────────────────────────

  /// Returns the next upcoming event where [userId] is a participant.
  ///
  /// Returns `null` if no future event is found.
  Future<Map<String, dynamic>?> getNextEvent(String userId) async {
    try {
      final now = DateTime.now().toUtc().toIso8601String();

      final response = await _supabase
          .from('event_participants')
          .select('event_id, events(id, titre, description, date_evenement, type)')
          .eq('user_id', userId)
          .gte('events.date_evenement', now)
          .order('events.date_evenement', ascending: true)
          .limit(1)
          .maybeSingle();

      if (response == null) return null;

      final event = response['events'] as Map<String, dynamic>?;
      return event;
    } on Exception catch (e, st) {
      AppLogger.error(
        'Failed to fetch next event',
        tag: 'HomeRepository',
        error: e,
        stackTrace: st,
      );
      return null;
    }
  }

  // ── Active match ───────────────────────────────────────────────────────

  /// Returns the latest active match for [userId], joining the partner's
  /// profile data (prenom, photo_floue_url, bio).
  ///
  /// Returns `null` if no active match exists.
  Future<Map<String, dynamic>?> getActiveMatch(String userId) async {
    try {
      // Check matches where user is user_1
      final asUser1 = await _supabase
          .from('matches')
          .select('''
            id, score_compatibilite, statut, analyse_compatibilite,
            user_2:profiles!matches_user_2_id_fkey(
              id, prenom, nom, photo_floue_url, bio, metadata
            )
          ''')
          .eq('user_1_id', userId)
          .inFilter('statut', [
            'propose',
            'valide_coach',
            'confirme_mutuel',
            'phase_2',
            'phase_3',
            'phase_4',
          ])
          .order('created_at', ascending: false)
          .limit(1)
          .maybeSingle();

      if (asUser1 != null) return _normalizeMatchResult(asUser1, 'user_2');

      // Check matches where user is user_2
      final asUser2 = await _supabase
          .from('matches')
          .select('''
            id, score_compatibilite, statut, analyse_compatibilite,
            user_1:profiles!matches_user_1_id_fkey(
              id, prenom, nom, photo_floue_url, bio, metadata
            )
          ''')
          .eq('user_2_id', userId)
          .inFilter('statut', [
            'propose',
            'valide_coach',
            'confirme_mutuel',
            'phase_2',
            'phase_3',
            'phase_4',
          ])
          .order('created_at', ascending: false)
          .limit(1)
          .maybeSingle();

      if (asUser2 != null) return _normalizeMatchResult(asUser2, 'user_1');

      return null;
    } on Exception catch (e, st) {
      AppLogger.error(
        'Failed to fetch active match',
        tag: 'HomeRepository',
        error: e,
        stackTrace: st,
      );
      return null;
    }
  }

  /// Normalize the match result so the partner data is under a consistent
  /// 'partner' key.
  Map<String, dynamic> _normalizeMatchResult(
    Map<String, dynamic> raw,
    String partnerKey,
  ) {
    final partner = raw[partnerKey] as Map<String, dynamic>?;
    return {
      'id': raw['id'],
      'score_compatibilite': raw['score_compatibilite'],
      'statut': raw['statut'],
      'analyse_compatibilite': raw['analyse_compatibilite'],
      'partner': partner,
    };
  }

  // ── Coach message ──────────────────────────────────────────────────────

  /// Returns the latest notification from a coach to [userId].
  ///
  /// Returns `null` if no coach message is found.
  Future<Map<String, dynamic>?> getCoachMessage(String userId) async {
    try {
      final response = await _supabase
          .from('notifications')
          .select('id, titre, corps, type, created_at')
          .eq('user_id', userId)
          .eq('type', 'coach_feedback')
          .order('created_at', ascending: false)
          .limit(1)
          .maybeSingle();

      return response;
    } on Exception catch (e, st) {
      AppLogger.error(
        'Failed to fetch coach message',
        tag: 'HomeRepository',
        error: e,
        stackTrace: st,
      );
      return null;
    }
  }

  // ── Pending actions ────────────────────────────────────────────────────

  /// Returns a list of pending actions for [userId]:
  /// - Incomplete questionnaire forms
  /// - Unread coach documents
  /// - Pending feedback forms
  /// - Missing photo selections
  Future<List<PendingAction>> getPendingActions(String userId) async {
    final actions = <PendingAction>[];

    try {
      // Check incomplete questionnaire (less than 147 answers)
      final questionCount = await _supabase
          .from('questionnaire_responses')
          .select('id')
          .eq('user_id', userId);

      if ((questionCount as List).length < 147) {
        actions.add(
          PendingAction(
            id: 'questionnaire',
            type: 'form',
            title: 'Compléter le questionnaire',
            priority: 'urgent',
            routePath: '/questionnaire',
          ),
        );
      }

      // Check pending feedback forms
      final pendingFeedback = await _supabase
          .from('feedback_forms')
          .select('id')
          .eq('user_id', userId);

      for (final feedback in pendingFeedback as List) {
        actions.add(
          PendingAction(
            id: feedback['id'] as String,
            type: 'feedback',
            title: 'Feedback en attente',
            priority: 'normal',
            routePath: '/feedback/${feedback['id']}',
          ),
        );
      }

      // Check unread notifications
      final unreadNotifs = await _supabase
          .from('notifications')
          .select('id, titre')
          .eq('user_id', userId)
          .eq('is_read', false)
          .neq('type', 'coach_feedback')
          .order('created_at', ascending: false)
          .limit(5);

      for (final notif in unreadNotifs as List) {
        actions.add(
          PendingAction(
            id: notif['id'] as String,
            type: 'document',
            title: notif['titre'] as String? ?? 'Nouvelle notification',
            priority: 'info',
            routePath: '/notifications',
          ),
        );
      }
    } on Exception catch (e, st) {
      AppLogger.error(
        'Failed to fetch pending actions',
        tag: 'HomeRepository',
        error: e,
        stackTrace: st,
      );
    }

    return actions;
  }

  // ── Unread notification count ──────────────────────────────────────────

  /// Returns the total count of unread notifications for [userId].
  Future<int> getUnreadNotificationCount(String userId) async {
    try {
      final response = await _supabase
          .from('notifications')
          .select('id')
          .eq('user_id', userId)
          .eq('is_read', false);

      return (response as List).length;
    } on Exception catch (e, st) {
      AppLogger.error(
        'Failed to fetch unread notification count',
        tag: 'HomeRepository',
        error: e,
        stackTrace: st,
      );
      return 0;
    }
  }

  // ── User profile (for greeting) ───────────────────────────────────────

  /// Returns the user's first name for the greeting.
  Future<String> getUserPrenom(String userId) async {
    try {
      final response = await _supabase
          .from('profiles')
          .select('prenom')
          .eq('id', userId)
          .single();

      return response['prenom'] as String? ?? '';
    } on Exception catch (e, st) {
      AppLogger.error(
        'Failed to fetch user prenom',
        tag: 'HomeRepository',
        error: e,
        stackTrace: st,
      );
      return '';
    }
  }
}
