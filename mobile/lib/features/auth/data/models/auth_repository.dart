import 'dart:async';

import 'package:supabase_flutter/supabase_flutter.dart';

import 'package:my_muqabala/core/utils/logger.dart';

import '../../domain/entities/auth_state.dart';
import 'user_model.dart';

/// Repository encapsulating all Supabase GoTrue (auth) operations.
///
/// This class is intentionally **not** a singleton. A fresh instance is
/// created by Riverpod via [authRepositoryProvider] so that tests can
/// inject a mock [SupabaseClient].
class AuthRepository {
  AuthRepository(this._supabase);

  final SupabaseClient _supabase;

  // ── Public API ──────────────────────────────────────────────────────────

  /// Sign in with phone number and password.
  ///
  /// [phone] must be in E.164 format (e.g. `+33612345678`).
  /// [password] is the user's password.
  ///
  /// Internally the phone is converted to a fake email address
  /// (`33612345678@mymuqabala.app`) because the Supabase project uses
  /// the **email** provider (no Twilio dependency).  The login screen
  /// is unchanged — the user still types their phone number.
  ///
  /// Throws an [AuthException] if the credentials are invalid or the
  /// user does not exist (invitation-only model).
  Future<AuthResponse> signInWithPassword(String phone, String password) async {
    final fakeEmail = _phoneToEmail(phone);
    AppLogger.info(
      'Signing in with password for $phone (email: $fakeEmail)',
      tag: 'Auth',
    );
    final response = await _supabase.auth.signInWithPassword(
      email: fakeEmail,
      password: password,
    );
    AppLogger.info('Sign-in successful — user ${response.user?.id}', tag: 'Auth');
    return response;
  }

  /// End the current session and revoke tokens.
  Future<void> signOut() async {
    AppLogger.info('Signing out', tag: 'Auth');
    await _supabase.auth.signOut();
    AppLogger.info('Signed out successfully', tag: 'Auth');
  }

  /// Reactive stream of [AppAuthState] derived from Supabase auth events.
  ///
  /// Emits a new state whenever the session changes (sign in, sign out,
  /// token refresh, etc.). The stream never completes under normal
  /// operation.
  Stream<AppAuthState> onAuthStateChange() {
    return _supabase.auth.onAuthStateChange.map((data) {
      final session = data.session;
      final event = data.event;

      AppLogger.debug(
        'Auth event: $event, session: ${session != null}',
        tag: 'Auth',
      );

      if (session != null && session.user.id.isNotEmpty) {
        final user = _userFromSession(session);
        return AppAuthState.authenticated(user);
      }

      return const AppAuthState.unauthenticated();
    });
  }

  /// The current session, or `null` if the user is not authenticated.
  Session? get currentSession => _supabase.auth.currentSession;

  /// The current Supabase [User], or `null`.
  User? get currentUser => _supabase.auth.currentUser;

  // ── Helpers ─────────────────────────────────────────────────────────────

  /// Domain suffix used for the phone-to-email mapping.
  static const _emailDomain = 'mymuqabala.app';

  /// Convert an E.164 phone number to a fake email address.
  ///
  /// Example: `+33612345678` → `33612345678@mymuqabala.app`.
  static String _phoneToEmail(String phone) {
    final digits = phone.replaceAll(RegExp(r'[^\d]'), '');
    return '$digits@$_emailDomain';
  }

  /// Reverse a fake email back to an E.164 phone number.
  ///
  /// Example: `33612345678@mymuqabala.app` → `+33612345678`.
  /// Returns an empty string if the email does not match the expected
  /// pattern.
  static String emailToPhone(String? email) {
    if (email == null || !email.endsWith('@$_emailDomain')) return '';
    final digits = email.split('@').first;
    return '+$digits';
  }

  /// Build a [UserModel] from a Supabase [Session].
  ///
  /// Because we authenticate via fake emails, the phone field on the
  /// Supabase [User] object will be empty. We reconstruct it from the
  /// email address instead.
  UserModel _userFromSession(Session session) {
    final user = session.user;
    return UserModel(
      id: user.id,
      phone: user.phone?.isNotEmpty == true
          ? user.phone!
          : emailToPhone(user.email),
      email: user.email,
      role: user.userMetadata?['role'] as String? ?? 'participant',
    );
  }
}
