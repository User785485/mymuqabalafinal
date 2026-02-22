/// Riverpod providers for the high-ticket feature.
///
/// Provides access to formulaires, cartographie, ressources, plan d'action
/// data through auto-disposing FutureProviders.
library;

import 'package:flutter_riverpod/flutter_riverpod.dart';

import 'package:my_muqabala/features/high_ticket/data/models/section_content_model.dart';
import 'package:my_muqabala/features/high_ticket/data/repositories/high_ticket_repository.dart';
import 'package:my_muqabala/features/profile/presentation/providers/profile_provider.dart';

// ── Repository provider ─────────────────────────────────────────────────

final highTicketRepositoryProvider = Provider<HighTicketRepository>((ref) {
  final client = ref.watch(supabaseClientProvider);
  return HighTicketRepository(client);
});

// ── Section content providers ───────────────────────────────────────────

final formulairesProvider =
    FutureProvider.autoDispose<List<SectionContentModel>>((ref) async {
  final userId = ref.watch(currentUserIdProvider);
  if (userId == null) return [];
  final repo = ref.watch(highTicketRepositoryProvider);
  return repo.getFormulaires(userId);
});

final cartographieDocsProvider =
    FutureProvider.autoDispose<List<SectionContentModel>>((ref) async {
  final userId = ref.watch(currentUserIdProvider);
  if (userId == null) return [];
  final repo = ref.watch(highTicketRepositoryProvider);
  return repo.getCartographieDocs(userId);
});

final ressourcesProvider =
    FutureProvider.autoDispose<List<SectionContentModel>>((ref) async {
  final userId = ref.watch(currentUserIdProvider);
  if (userId == null) return [];
  final repo = ref.watch(highTicketRepositoryProvider);
  return repo.getRessources(userId);
});

final planActionProvider =
    FutureProvider.autoDispose<List<SectionContentModel>>((ref) async {
  final userId = ref.watch(currentUserIdProvider);
  if (userId == null) return [];
  final repo = ref.watch(highTicketRepositoryProvider);
  return repo.getPlanAction(userId);
});

// ── Progress provider (family by section) ───────────────────────────────

/// Returns progress data for a given section.
///
/// Usage: `ref.watch(sectionProgressProvider('formulaires'))`
///
/// Returns `{completed: int, total: int, percentage: int}`.
final sectionProgressProvider = FutureProvider.autoDispose
    .family<Map<String, dynamic>, String>((ref, section) async {
  final userId = ref.watch(currentUserIdProvider);
  if (userId == null) return {'completed': 0, 'total': 0, 'percentage': 0};
  final repo = ref.watch(highTicketRepositoryProvider);
  return repo.getProgress(userId, section);
});

// ── Mark completed action provider ──────────────────────────────────────

final markCompletedProvider =
    FutureProvider.autoDispose.family<void, String>((ref, contentId) async {
  final repo = ref.watch(highTicketRepositoryProvider);
  await repo.markContentCompleted(contentId);
  // Invalidate all section providers to refresh progress
  ref.invalidate(formulairesProvider);
  ref.invalidate(cartographieDocsProvider);
  ref.invalidate(ressourcesProvider);
  ref.invalidate(planActionProvider);
});
