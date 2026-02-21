import 'package:supabase_flutter/supabase_flutter.dart';
import 'package:my_muqabala/core/utils/logger.dart';

class QuestionnaireRepository {
  QuestionnaireRepository(this._supabase);
  final SupabaseClient _supabase;

  /// Upsert a single response.
  Future<void> upsertResponse({
    required int questionId,
    required int value,
  }) async {
    final userId = _supabase.auth.currentUser?.id;
    if (userId == null) throw Exception('Utilisateur non connecté');

    await _supabase.from('questionnaire_responses').upsert({
      'user_id': userId,
      'question_id': questionId,
      'categorie': 'attachement',
      'reponse': {'value': value},
    }, onConflict: 'user_id,question_id');

    AppLogger.debug('Saved Q$questionId = $value', tag: 'Questionnaire');
  }

  /// Load all existing attachment responses for current user.
  Future<Map<int, int>> loadExistingResponses() async {
    final userId = _supabase.auth.currentUser?.id;
    if (userId == null) return {};

    final data = await _supabase
        .from('questionnaire_responses')
        .select('question_id, reponse')
        .eq('user_id', userId)
        .eq('categorie', 'attachement')
        .gte('question_id', 1)
        .lte('question_id', 20);

    final Map<int, int> result = {};
    for (final row in data) {
      final qId = row['question_id'] as int;
      final reponse = row['reponse'] as Map<String, dynamic>;
      result[qId] = reponse['value'] as int;
    }

    AppLogger.info(
      'Loaded ${result.length} existing responses',
      tag: 'Questionnaire',
    );
    return result;
  }

  /// Count total attachment responses for current user.
  Future<int> countResponses() async {
    final userId = _supabase.auth.currentUser?.id;
    if (userId == null) return 0;

    final data = await _supabase
        .from('questionnaire_responses')
        .select('id')
        .eq('user_id', userId)
        .eq('categorie', 'attachement')
        .gte('question_id', 1)
        .lte('question_id', 20);

    return data.length;
  }

  /// Update statut_parcours to 'formation' after completing questionnaire.
  Future<void> markQuestionnaireComplete() async {
    final userId = _supabase.auth.currentUser?.id;
    if (userId == null) return;

    await _supabase.from('profiles').update({
      'statut_parcours': 'formation',
    }).eq('id', userId);

    AppLogger.info('Statut updated to formation', tag: 'Questionnaire');
  }
}
