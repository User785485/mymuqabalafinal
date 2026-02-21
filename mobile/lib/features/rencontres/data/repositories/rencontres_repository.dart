/// Repository for rencontres-related data access.
///
/// Handles Supabase queries for:
///   - Weekly feedback (retours hebdomadaires)
///   - Encounter history
///   - Compatibility status
///   - Section visibility
library;

import 'package:supabase_flutter/supabase_flutter.dart';

import 'package:my_muqabala/core/utils/logger.dart';
import 'package:my_muqabala/features/rencontres/data/models/retour_hebdo_model.dart';
import 'package:my_muqabala/features/rencontres/data/models/rencontre_historique_model.dart';
import 'package:my_muqabala/features/rencontres/data/models/compatibilite_status_model.dart';

class RencontresRepository {
  RencontresRepository(this._supabase);

  final SupabaseClient _supabase;

  // ── Weekly feedback ──────────────────────────────────────────────────────

  /// Fetches all weekly feedback entries for a user, ordered by week number.
  Future<List<RetourHebdoModel>> getRetoursHebdo(String userId) async {
    try {
      AppLogger.debug(
        'Fetching retours hebdo for user: $userId',
        tag: 'RencontresRepo',
      );

      final response = await _supabase
          .from('retours_hebdomadaires')
          .select()
          .eq('client_id', userId)
          .order('semaine_numero', ascending: false);

      final retours = (response as List<dynamic>)
          .map((row) => RetourHebdoModel.fromJson(row as Map<String, dynamic>))
          .toList();

      AppLogger.info(
        'Loaded ${retours.length} retours hebdo for user $userId',
        tag: 'RencontresRepo',
      );

      return retours;
    } on Exception catch (e, st) {
      AppLogger.error(
        'Failed to fetch retours hebdo for user $userId',
        tag: 'RencontresRepo',
        error: e,
        stackTrace: st,
      );
      return [];
    }
  }

  // ── Encounter history ────────────────────────────────────────────────────

  /// Fetches encounter history entries for a user, ordered by number descending.
  Future<List<RencontreHistoriqueModel>> getRencontresHistorique(
    String userId,
  ) async {
    try {
      AppLogger.debug(
        'Fetching rencontres historique for user: $userId',
        tag: 'RencontresRepo',
      );

      final response = await _supabase
          .from('rencontres_historique')
          .select()
          .eq('client_id', userId)
          .order('numero', ascending: false);

      final rencontres = (response as List<dynamic>)
          .map((row) =>
              RencontreHistoriqueModel.fromJson(row as Map<String, dynamic>))
          .toList();

      AppLogger.info(
        'Loaded ${rencontres.length} rencontres historique for user $userId',
        tag: 'RencontresRepo',
      );

      return rencontres;
    } on Exception catch (e, st) {
      AppLogger.error(
        'Failed to fetch rencontres historique for user $userId',
        tag: 'RencontresRepo',
        error: e,
        stackTrace: st,
      );
      return [];
    }
  }

  // ── Compatibility status ─────────────────────────────────────────────────

  /// Fetches the compatibility form status from the section_content table.
  Future<CompatibiliteStatusModel> getCompatibiliteStatus(
    String userId,
  ) async {
    try {
      AppLogger.debug(
        'Fetching compatibilite status for user: $userId',
        tag: 'RencontresRepo',
      );

      final response = await _supabase
          .from('section_content')
          .select()
          .eq('client_id', userId)
          .eq('section_key', 'compatibilite_form_status')
          .maybeSingle();

      return CompatibiliteStatusModel.fromJson(response);
    } on Exception catch (e, st) {
      AppLogger.error(
        'Failed to fetch compatibilite status for user $userId',
        tag: 'RencontresRepo',
        error: e,
        stackTrace: st,
      );
      return CompatibiliteStatusModel(status: CompatibiliteStatus.pending);
    }
  }

  // ── Section visibility ───────────────────────────────────────────────────

  /// Fetches section visibility settings for a user.
  ///
  /// Returns a map of section keys to their visibility status.
  Future<Map<String, bool>> getSectionVisibility(String userId) async {
    try {
      AppLogger.debug(
        'Fetching section visibility for user: $userId',
        tag: 'RencontresRepo',
      );

      final response = await _supabase
          .from('section_visibility')
          .select()
          .eq('client_id', userId);

      final visibility = <String, bool>{};
      for (final row in response as List<dynamic>) {
        final map = row as Map<String, dynamic>;
        final key = map['section_key'] as String?;
        final visible = map['is_visible'] as bool? ?? true;
        if (key != null) {
          visibility[key] = visible;
        }
      }

      AppLogger.info(
        'Loaded ${visibility.length} visibility settings for user $userId',
        tag: 'RencontresRepo',
      );

      return visibility;
    } on Exception catch (e, st) {
      AppLogger.error(
        'Failed to fetch section visibility for user $userId',
        tag: 'RencontresRepo',
        error: e,
        stackTrace: st,
      );
      return {};
    }
  }
}
