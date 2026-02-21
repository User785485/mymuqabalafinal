import 'dart:async';
import 'dart:io';

import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

import 'package:my_muqabala/core/network/supabase_client.dart';
import 'package:my_muqabala/core/utils/logger.dart';
import 'package:my_muqabala/features/profile/data/models/profile_model.dart';
import 'package:my_muqabala/features/profile/data/models/profile_repository.dart';

// ═══════════════════════════════════════════════════════════════════════
//  Providers for the Profile feature
// ═══════════════════════════════════════════════════════════════════════

/// Provides the singleton [SupabaseClient].
final supabaseClientProvider = Provider<SupabaseClient>((ref) {
  return SupabaseClientManager.client;
});

/// Provides a [ProfileRepository] backed by Supabase.
final profileRepositoryProvider = Provider<ProfileRepository>((ref) {
  final client = ref.watch(supabaseClientProvider);
  return ProfileRepository(client);
});

// ── Current user ID ─────────────────────────────────────────────────────

/// Exposes the current authenticated user's ID, or `null` if not signed in.
final currentUserIdProvider = Provider<String?>((ref) {
  return SupabaseClientManager.auth.currentUser?.id;
});

// ── Current profile (async) ─────────────────────────────────────────────

/// Fetches the current user's profile as a one-shot [FutureProvider].
///
/// Returns `null` if the user is not authenticated or has no profile row.
/// Widgets can use `ref.refresh(currentProfileProvider)` to re-fetch.
final currentProfileProvider = FutureProvider<ProfileModel?>((ref) async {
  final userId = ref.watch(currentUserIdProvider);
  if (userId == null) return null;

  final repository = ref.watch(profileRepositoryProvider);
  return repository.getProfile(userId);
});

// ── Realtime profile stream ─────────────────────────────────────────────

/// Streams the current user's profile with hybrid approach:
/// 1. Immediate fetch on creation
/// 2. Supabase Realtime subscription (instant when publication is enabled)
/// 3. Periodic polling every 8s as fallback (guarantees freshness)
///
/// This ensures that changes made by the admin (e.g. toggling premium)
/// are reflected on the client within seconds, even without Realtime
/// publication configured.
final profileStreamProvider = StreamProvider<ProfileModel?>((ref) {
  final userId = ref.watch(currentUserIdProvider);
  if (userId == null) return const Stream.empty();

  final repository = ref.watch(profileRepositoryProvider);
  final controller = StreamController<ProfileModel?>();

  // 1. Immediate fetch
  repository.getProfile(userId).then((profile) {
    if (!controller.isClosed) controller.add(profile);
  });

  // 2. Supabase Realtime stream (instant when table is in publication)
  final realtimeSub = repository.watchProfile(userId).listen(
    (data) {
      if (!controller.isClosed) controller.add(data);
    },
    onError: (_) {},
  );

  // 3. Periodic polling fallback (every 8 seconds)
  final timer = Timer.periodic(const Duration(seconds: 8), (_) async {
    try {
      final profile = await repository.getProfile(userId);
      if (!controller.isClosed) controller.add(profile);
    } catch (_) {}
  });

  // Cleanup on provider dispose
  ref.onDispose(() {
    realtimeSub.cancel();
    timer.cancel();
    controller.close();
  });

  return controller.stream.distinct();
});

// ── Update profile mutation ─────────────────────────────────────────────

/// State notifier that handles profile update mutations.
///
/// Usage:
/// ```dart
/// ref.read(updateProfileProvider.notifier).updateFields({
///   'prenom': 'Fatima',
///   'ville': 'Paris',
/// });
/// ```
final updateProfileProvider =
    NotifierProvider<UpdateProfileNotifier, AsyncValue<void>>(
  UpdateProfileNotifier.new,
);

class UpdateProfileNotifier extends Notifier<AsyncValue<void>> {
  @override
  AsyncValue<void> build() => const AsyncData(null);

  /// Update arbitrary profile fields.
  ///
  /// After a successful update the [currentProfileProvider] is refreshed
  /// so that all consumers see the new data.
  Future<bool> updateFields(Map<String, dynamic> updates) async {
    final userId = ref.read(currentUserIdProvider);
    if (userId == null) {
      state = AsyncError(
        Exception('Utilisateur non connecte'),
        StackTrace.current,
      );
      return false;
    }

    state = const AsyncLoading();

    try {
      final repository = ref.read(profileRepositoryProvider);
      await repository.updateProfile(userId, updates);

      // Invalidate the cached profile so the next read fetches fresh data
      ref.invalidate(currentProfileProvider);

      state = const AsyncData(null);
      AppLogger.info('Profile updated successfully', tag: 'UpdateProfile');
      return true;
    } catch (e, st) {
      state = AsyncError(e, st);
      AppLogger.error(
        'Profile update failed',
        tag: 'UpdateProfile',
        error: e,
        stackTrace: st,
      );
      return false;
    }
  }

  /// Upload a new photo and update the profile accordingly.
  ///
  /// Returns the new photo URL on success, `null` on failure.
  Future<String?> uploadPhoto(File photo) async {
    final userId = ref.read(currentUserIdProvider);
    if (userId == null) return null;

    state = const AsyncLoading();

    try {
      final repository = ref.read(profileRepositoryProvider);
      final url = await repository.uploadPhoto(userId, photo);

      ref.invalidate(currentProfileProvider);

      state = const AsyncData(null);
      return url;
    } catch (e, st) {
      state = AsyncError(e, st);
      return null;
    }
  }
}

// ── Delete account mutation ─────────────────────────────────────────────

/// Provider to delete (deactivate) the current user's account.
///
/// Returns `true` on success.
final deleteAccountProvider = FutureProvider.family<bool, String>((
  ref,
  userId,
) async {
  final repository = ref.watch(profileRepositoryProvider);
  try {
    await repository.deleteAccount(userId);
    return true;
  } catch (e, st) {
    AppLogger.error(
      'Delete account failed',
      tag: 'DeleteAccount',
      error: e,
      stackTrace: st,
    );
    return false;
  }
});

// ── Sign out ────────────────────────────────────────────────────────────

/// Simple provider to sign the user out.
final signOutProvider = FutureProvider<void>((ref) async {
  await SupabaseClientManager.auth.signOut();
  AppLogger.info('User signed out', tag: 'Auth');
});
