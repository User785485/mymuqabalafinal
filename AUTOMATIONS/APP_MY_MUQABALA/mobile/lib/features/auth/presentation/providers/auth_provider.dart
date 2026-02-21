import 'dart:async';

import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

import 'package:my_muqabala/core/utils/logger.dart';

import '../../data/models/auth_repository.dart';
import '../../data/models/user_model.dart';
import '../../domain/entities/auth_state.dart';

// ── Repository provider ──────────────────────────────────────────────────

/// Provides a singleton [AuthRepository] backed by the global
/// [SupabaseClient] instance.
final authRepositoryProvider = Provider<AuthRepository>((ref) {
  return AuthRepository(Supabase.instance.client);
});

// ── Auth state stream ────────────────────────────────────────────────────

/// Reactive [AppAuthState] stream that mirrors Supabase auth events.
///
/// The router redirect listens to this provider to decide whether to
/// show login, onboarding, or the main app shell.
final authStateProvider = StreamProvider<AppAuthState>((ref) {
  final repo = ref.watch(authRepositoryProvider);

  // Prepend the current session state so the stream immediately emits
  // an authenticated state if a session already exists (e.g. app restart).
  final session = repo.currentSession;
  final initial = (session != null && session.user.id.isNotEmpty)
      ? AppAuthState.authenticated(
          UserModel(
            id: session.user.id,
            phone: session.user.phone?.isNotEmpty == true
                ? session.user.phone!
                : AuthRepository.emailToPhone(session.user.email),
            email: session.user.email,
            role:
                session.user.userMetadata?['role'] as String? ?? 'participant',
          ),
        )
      : const AppAuthState.unauthenticated();

  // Emit the initial state first, then follow Supabase auth events.
  return Stream.value(initial).asyncExpand(
    (initialState) async* {
      yield initialState;
      yield* repo.onAuthStateChange();
    },
  );
});

// ── Sign-in notifier ─────────────────────────────────────────────────────

/// Manages the password-based sign-in flow.
///
/// Usage from a widget:
/// ```dart
/// final notifier = ref.read(signInNotifierProvider.notifier);
/// await notifier.signIn('+33612345678', 'myPassword');
/// ```
final signInNotifierProvider =
    AsyncNotifierProvider<SignInNotifier, AppAuthState>(SignInNotifier.new);

class SignInNotifier extends AsyncNotifier<AppAuthState> {
  late AuthRepository _repo;

  @override
  FutureOr<AppAuthState> build() {
    _repo = ref.watch(authRepositoryProvider);

    // Bootstrap: check for existing session.
    final session = _repo.currentSession;
    if (session != null && session.user.id.isNotEmpty) {
      final user = UserModel(
        id: session.user.id,
        phone: session.user.phone?.isNotEmpty == true
            ? session.user.phone!
            : AuthRepository.emailToPhone(session.user.email),
        email: session.user.email,
        role: session.user.userMetadata?['role'] as String? ?? 'participant',
      );
      return AppAuthState.authenticated(user);
    }

    return const AppAuthState.unauthenticated();
  }

  /// Sign in with [phone] (E.164 format) and [password].
  ///
  /// On success the state transitions to [AppAuthState.authenticated].
  /// On failure it transitions to [AppAuthState.error].
  Future<void> signIn(String phone, String password) async {
    state = const AsyncValue.loading();
    state = await AsyncValue.guard(() async {
      try {
        final response = await _repo.signInWithPassword(phone, password);
        final user = response.user;
        if (user == null) {
          return const AppAuthState.error('Connexion échouée. Réessayez.');
        }
        return AppAuthState.authenticated(
          UserModel(
            id: user.id,
            phone: user.phone?.isNotEmpty == true
                ? user.phone!
                : phone, // original E.164 input from the login screen
            email: user.email,
            role: user.userMetadata?['role'] as String? ?? 'participant',
          ),
        );
      } on AuthException catch (e) {
        AppLogger.error('Sign-in failed: ${e.message} (status: ${e.statusCode})', tag: 'Auth', error: e);
        // ignore: avoid_print
        print('[AUTH DEBUG] AuthException: message="${e.message}" statusCode=${e.statusCode}');
        return AppAuthState.error(_mapAuthError(e));
      } catch (e, st) {
        AppLogger.error('Sign-in unexpected error: $e', tag: 'Auth', error: e);
        // ignore: avoid_print
        print('[AUTH DEBUG] Unexpected error: $e\n$st');
        return AppAuthState.error('Erreur inattendue: $e');
      }
    });
  }

  /// Sign out the current user.
  Future<void> signOut() async {
    state = const AsyncValue.loading();
    state = await AsyncValue.guard(() async {
      await _repo.signOut();
      return const AppAuthState.unauthenticated();
    });
  }

  /// Map Supabase [AuthException] to a user-friendly French message.
  String _mapAuthError(AuthException e) {
    final msg = e.message.toLowerCase();
    if (msg.contains('invalid credentials') || msg.contains('invalid_credentials')) {
      return 'Identifiants incorrects. Vérifiez votre numéro et mot de passe.';
    }
    if (msg.contains('rate') || msg.contains('limit')) {
      return 'Trop de tentatives. Patientez quelques minutes.';
    }
    if (msg.contains('not found') || msg.contains('no user')) {
      return 'Ce numéro n\'est pas enregistré. Contactez votre accompagnant.';
    }
    return 'Erreur de connexion. Réessayez.';
  }
}
