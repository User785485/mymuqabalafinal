/// Riverpod providers for the Rencontres feature.
///
/// Exposes:
///   - [rencontresRepositoryProvider] — singleton repository
///   - [retoursHebdoProvider]        — weekly feedback list
///   - [rencontresHistoriqueProvider] — encounter history list
///   - [compatibiliteStatusProvider]  — compatibility search status
///   - [sectionVisibilityProvider]    — section visibility map
library;

import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

import 'package:my_muqabala/core/utils/logger.dart';
import 'package:my_muqabala/features/rencontres/data/models/retour_hebdo_model.dart';
import 'package:my_muqabala/features/rencontres/data/models/rencontre_historique_model.dart';
import 'package:my_muqabala/features/rencontres/data/models/compatibilite_status_model.dart';
import 'package:my_muqabala/features/rencontres/data/repositories/rencontres_repository.dart';

// =============================================================================
// Repository provider
// =============================================================================

/// Provides the [RencontresRepository] backed by the live Supabase client.
final rencontresRepositoryProvider = Provider<RencontresRepository>((ref) {
  return RencontresRepository(Supabase.instance.client);
});

// =============================================================================
// Current user ID (local to rencontres feature)
// =============================================================================

final _currentUserIdProvider = Provider<String?>((ref) {
  return Supabase.instance.client.auth.currentUser?.id;
});

// =============================================================================
// Weekly feedback provider
// =============================================================================

/// Fetches all weekly feedback entries for the current user.
final retoursHebdoProvider =
    FutureProvider.autoDispose<List<RetourHebdoModel>>((ref) async {
  try {
    final userId = ref.watch(_currentUserIdProvider);
    if (userId == null) return [];

    final repository = ref.watch(rencontresRepositoryProvider);
    return repository.getRetoursHebdo(userId);
  } on Exception catch (e, st) {
    AppLogger.error(
      'Error in retoursHebdoProvider',
      tag: 'RencontresProvider',
      error: e,
      stackTrace: st,
    );
    return [];
  }
});

// =============================================================================
// Encounter history provider
// =============================================================================

/// Fetches all encounter history entries for the current user.
final rencontresHistoriqueProvider =
    FutureProvider.autoDispose<List<RencontreHistoriqueModel>>((ref) async {
  try {
    final userId = ref.watch(_currentUserIdProvider);
    if (userId == null) return [];

    final repository = ref.watch(rencontresRepositoryProvider);
    return repository.getRencontresHistorique(userId);
  } on Exception catch (e, st) {
    AppLogger.error(
      'Error in rencontresHistoriqueProvider',
      tag: 'RencontresProvider',
      error: e,
      stackTrace: st,
    );
    return [];
  }
});

// =============================================================================
// Compatibility status provider
// =============================================================================

/// Fetches the compatibility search status for the current user.
final compatibiliteStatusProvider =
    FutureProvider.autoDispose<CompatibiliteStatusModel>((ref) async {
  try {
    final userId = ref.watch(_currentUserIdProvider);
    if (userId == null) {
      return CompatibiliteStatusModel(status: CompatibiliteStatus.pending);
    }

    final repository = ref.watch(rencontresRepositoryProvider);
    return repository.getCompatibiliteStatus(userId);
  } on Exception catch (e, st) {
    AppLogger.error(
      'Error in compatibiliteStatusProvider',
      tag: 'RencontresProvider',
      error: e,
      stackTrace: st,
    );
    return CompatibiliteStatusModel(status: CompatibiliteStatus.pending);
  }
});

// =============================================================================
// Section visibility provider
// =============================================================================

/// Fetches section visibility settings for the current user.
final sectionVisibilityProvider =
    FutureProvider.autoDispose<Map<String, bool>>((ref) async {
  try {
    final userId = ref.watch(_currentUserIdProvider);
    if (userId == null) return {};

    final repository = ref.watch(rencontresRepositoryProvider);
    return repository.getSectionVisibility(userId);
  } on Exception catch (e, st) {
    AppLogger.error(
      'Error in sectionVisibilityProvider',
      tag: 'RencontresProvider',
      error: e,
      stackTrace: st,
    );
    return {};
  }
});

// =============================================================================
// Refresh helper
// =============================================================================

/// Invalidates all rencontres-related providers to trigger a full refresh.
void refreshAllRencontresData(WidgetRef ref) {
  ref.invalidate(retoursHebdoProvider);
  ref.invalidate(rencontresHistoriqueProvider);
  ref.invalidate(compatibiliteStatusProvider);
  ref.invalidate(sectionVisibilityProvider);
}
