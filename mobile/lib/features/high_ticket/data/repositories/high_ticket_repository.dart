/// Repository for high-ticket section content.
///
/// Reads from the `section_content` table (or via migration bridge RPCs)
/// in Supabase. Provides CRUD for formulaires, cartographie, ressources,
/// and plan d'action content items.
library;

import 'package:supabase_flutter/supabase_flutter.dart';

import 'package:my_muqabala/core/utils/logger.dart';
import 'package:my_muqabala/features/high_ticket/data/models/section_content_model.dart';

class HighTicketRepository {
  HighTicketRepository(this._client);

  final SupabaseClient _client;

  /// Fetch all content items for a given [section] and [userId].
  Future<List<SectionContentModel>> getSectionContents(
    String userId,
    String section,
  ) async {
    try {
      final response = await _client
          .from('section_content')
          .select()
          .eq('client_id', userId)
          .eq('section_key', section)
          .order('created_at');

      return (response as List)
          .map((row) =>
              SectionContentModel.fromJson(row as Map<String, dynamic>))
          .toList();
    } catch (e, st) {
      AppLogger.error(
        'Failed to fetch section_content for $section',
        tag: 'HighTicketRepo',
        error: e,
        stackTrace: st,
      );
      return [];
    }
  }

  /// Convenience: get formulaires for a user.
  Future<List<SectionContentModel>> getFormulaires(String userId) =>
      getSectionContents(userId, 'formulaires');

  /// Convenience: get cartographie docs for a user.
  Future<List<SectionContentModel>> getCartographieDocs(String userId) =>
      getSectionContents(userId, 'cartographie');

  /// Convenience: get ressources for a user.
  Future<List<SectionContentModel>> getRessources(String userId) =>
      getSectionContents(userId, 'ressources');

  /// Convenience: get plan d'action for a user.
  Future<List<SectionContentModel>> getPlanAction(String userId) =>
      getSectionContents(userId, 'plan_action');

  /// Mark a content item as completed.
  Future<void> markContentCompleted(String contentId) async {
    try {
      await _client.from('section_content').update({
        'is_completed': true,
        'updated_at': DateTime.now().toIso8601String(),
      }).eq('id', contentId);
    } catch (e, st) {
      AppLogger.error(
        'Failed to mark content $contentId as completed',
        tag: 'HighTicketRepo',
        error: e,
        stackTrace: st,
      );
      rethrow;
    }
  }

  /// Get progress stats for a section: {completed, total, percentage}.
  Future<Map<String, dynamic>> getProgress(
    String userId,
    String section,
  ) async {
    final items = await getSectionContents(userId, section);
    final total = items.length;
    final completed = items.where((i) => i.isCompleted).length;
    final percentage = total > 0 ? (completed / total * 100).round() : 0;

    return {
      'completed': completed,
      'total': total,
      'percentage': percentage,
    };
  }
}
