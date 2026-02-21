/// Repository layer for feedback form CRUD against the `feedback_forms` table.
library;

import 'package:supabase_flutter/supabase_flutter.dart';

import 'package:my_muqabala/core/utils/logger.dart';
import '../models/feedback_form_model.dart';

/// Provides read / write access to the `feedback_forms` Supabase table.
class FeedbackRepository {
  FeedbackRepository(this._supabase);

  final SupabaseClient _supabase;

  static const _table = 'feedback_forms';

  /// Match-related feedback types that use the `match_id` column.
  static const _matchTypes = {
    'post_blink_date',
    'post_audio',
    'post_appel',
    'post_rdv_physique',
  };

  /// Event-related feedback types that use the `event_id` column.
  static const _eventTypes = <String>{};

  /// Insert a new feedback form submission.
  ///
  /// [referenceId] is mapped to either `match_id` or `event_id` depending on
  /// [typeFormulaire]. Bilan types (bilan_hebdomadaire, bilan_mensuel) have
  /// neither.
  Future<void> submitFeedback({
    required String userId,
    required String typeFormulaire,
    String? referenceId,
    required Map<String, dynamic> reponses,
  }) async {
    final payload = <String, dynamic>{
      'user_id': userId,
      'type_formulaire': typeFormulaire,
      'reponses': reponses,
    };
    if (referenceId != null) {
      if (_matchTypes.contains(typeFormulaire)) {
        payload['match_id'] = referenceId;
      } else if (_eventTypes.contains(typeFormulaire)) {
        payload['event_id'] = referenceId;
      }
    }

    await _supabase.from(_table).insert(payload);

    AppLogger.info(
      'Feedback submitted: type=$typeFormulaire, ref=$referenceId',
      tag: 'Feedback',
    );
  }

  /// Return an existing feedback for the given user / form-type / reference
  /// combination, or `null` if none exists.
  ///
  /// This is used to prevent duplicate submissions.
  /// [referenceId] is matched against `match_id` or `event_id` depending on
  /// [typeFormulaire].
  Future<FeedbackFormModel?> getExistingFeedback({
    required String userId,
    required String typeFormulaire,
    String? referenceId,
  }) async {
    var query = _supabase
        .from(_table)
        .select()
        .eq('user_id', userId)
        .eq('type_formulaire', typeFormulaire);

    if (referenceId != null) {
      if (_matchTypes.contains(typeFormulaire)) {
        query = query.eq('match_id', referenceId);
      } else if (_eventTypes.contains(typeFormulaire)) {
        query = query.eq('event_id', referenceId);
      }
    } else {
      // For bilan types with no reference, filter rows that have no match_id.
      query = query.isFilter('match_id', null);
    }

    final data = await query.maybeSingle();
    if (data == null) return null;

    AppLogger.debug(
      'Found existing feedback: type=$typeFormulaire, ref=$referenceId',
      tag: 'Feedback',
    );
    return FeedbackFormModel.fromJson(data);
  }

  /// Return every feedback form submitted by [userId], newest first.
  Future<List<FeedbackFormModel>> getUserFeedbacks(String userId) async {
    final data = await _supabase
        .from(_table)
        .select()
        .eq('user_id', userId)
        .order('created_at', ascending: false);

    final feedbacks =
        (data as List).map((row) => FeedbackFormModel.fromJson(row as Map<String, dynamic>)).toList();

    AppLogger.debug(
      'Loaded ${feedbacks.length} feedbacks for user',
      tag: 'Feedback',
    );
    return feedbacks;
  }
}
