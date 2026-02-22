/// Riverpod providers for all home screen data.
///
/// Each provider maps to one [HomeRepository] method and produces an
/// [AsyncValue] so the UI can show loading / error / data states
/// with minimal boilerplate.
library;

import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

import 'package:my_muqabala/features/home/data/models/home_repository.dart';

// ═══════════════════════════════════════════════════════════════════════════
// Repository provider
// ═══════════════════════════════════════════════════════════════════════════

/// Provides the [HomeRepository] backed by the live Supabase client.
final homeRepositoryProvider = Provider<HomeRepository>((ref) {
  return HomeRepository(Supabase.instance.client);
});

// ═══════════════════════════════════════════════════════════════════════════
// Current user ID
// ═══════════════════════════════════════════════════════════════════════════

/// Provides the authenticated user's ID, or `null` if not signed in.
final currentUserIdProvider = Provider<String?>((ref) {
  return Supabase.instance.client.auth.currentUser?.id;
});

// ═══════════════════════════════════════════════════════════════════════════
// Home data providers
// ═══════════════════════════════════════════════════════════════════════════

/// Fetches the user's first name for the greeting widget.
final userPrenomProvider = FutureProvider.autoDispose<String>((ref) async {
  final userId = ref.watch(currentUserIdProvider);
  if (userId == null) return '';
  final repo = ref.watch(homeRepositoryProvider);
  return repo.getUserPrenom(userId);
});

/// Current phase (1-4) based on the user's statut_parcours.
final currentPhaseProvider = FutureProvider.autoDispose<int>((ref) async {
  final userId = ref.watch(currentUserIdProvider);
  if (userId == null) return 0;
  final repo = ref.watch(homeRepositoryProvider);
  return repo.getCurrentPhase(userId);
});

/// Progress within the current active phase (0.0 to 1.0).
final phaseProgressProvider = FutureProvider.autoDispose<double>((ref) async {
  final userId = ref.watch(currentUserIdProvider);
  if (userId == null) return 0.0;
  final repo = ref.watch(homeRepositoryProvider);
  return repo.getPhaseProgress(userId);
});

/// Next upcoming event for the user.
final nextEventProvider =
    FutureProvider.autoDispose<Map<String, dynamic>?>((ref) async {
  final userId = ref.watch(currentUserIdProvider);
  if (userId == null) return null;
  final repo = ref.watch(homeRepositoryProvider);
  return repo.getNextEvent(userId);
});

/// Active match with partner profile data.
final activeMatchProvider =
    FutureProvider.autoDispose<Map<String, dynamic>?>((ref) async {
  final userId = ref.watch(currentUserIdProvider);
  if (userId == null) return null;
  final repo = ref.watch(homeRepositoryProvider);
  return repo.getActiveMatch(userId);
});

/// Latest coach message / notification.
final coachMessageProvider =
    FutureProvider.autoDispose<Map<String, dynamic>?>((ref) async {
  final userId = ref.watch(currentUserIdProvider);
  if (userId == null) return null;
  final repo = ref.watch(homeRepositoryProvider);
  return repo.getCoachMessage(userId);
});

/// List of pending actions for the user.
final pendingActionsProvider =
    FutureProvider.autoDispose<List<PendingAction>>((ref) async {
  final userId = ref.watch(currentUserIdProvider);
  if (userId == null) return [];
  final repo = ref.watch(homeRepositoryProvider);
  return repo.getPendingActions(userId);
});

/// Count of unread notifications (for badge).
final unreadNotificationCountProvider =
    FutureProvider.autoDispose<int>((ref) async {
  final userId = ref.watch(currentUserIdProvider);
  if (userId == null) return 0;
  final repo = ref.watch(homeRepositoryProvider);
  return repo.getUnreadNotificationCount(userId);
});

// ═══════════════════════════════════════════════════════════════════════════
// Aggregated home state (for pull-to-refresh)
// ═══════════════════════════════════════════════════════════════════════════

/// Invalidates all home-related providers to trigger a full refresh.
///
/// Call this from the pull-to-refresh handler:
/// ```dart
/// ref.invalidate(userPrenomProvider);
/// ref.invalidate(currentPhaseProvider);
/// // ... etc.
/// ```
void refreshAllHomeData(WidgetRef ref) {
  ref.invalidate(userPrenomProvider);
  ref.invalidate(currentPhaseProvider);
  ref.invalidate(phaseProgressProvider);
  ref.invalidate(nextEventProvider);
  ref.invalidate(activeMatchProvider);
  ref.invalidate(coachMessageProvider);
  ref.invalidate(pendingActionsProvider);
  ref.invalidate(unreadNotificationCountProvider);
}
