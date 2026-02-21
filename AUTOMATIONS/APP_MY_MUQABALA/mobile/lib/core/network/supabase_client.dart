/// Singleton access to the Supabase client.
///
/// Call [SupabaseClientManager.init] once at startup (from `main()`),
/// then use the static getters anywhere in the app:
///
/// ```dart
/// final user = SupabaseClientManager.auth.currentUser;
/// final rows = await SupabaseClientManager.client.from('profiles').select();
/// ```
library;

import 'package:supabase_flutter/supabase_flutter.dart';

import 'package:my_muqabala/core/utils/logger.dart';

/// Centralized Supabase client initialization and access.
abstract final class SupabaseClientManager {
  /// The singleton [SupabaseClient] created by [init].
  static SupabaseClient get client => Supabase.instance.client;

  /// Shortcut to the GoTrue (auth) client.
  static GoTrueClient get auth => client.auth;

  /// Shortcut to the Supabase Storage client.
  static SupabaseStorageClient get storage => client.storage;

  /// Shortcut to the Supabase Realtime client.
  static RealtimeClient get realtime => client.realtime;

  /// Initialize the Supabase SDK.
  ///
  /// Must be called **once** before any other Supabase interaction,
  /// typically right after `WidgetsFlutterBinding.ensureInitialized()`.
  static Future<void> init({
    required String url,
    required String anonKey,
  }) async {
    await Supabase.initialize(
      url: url,
      anonKey: anonKey,
    );
    AppLogger.info(
      'Supabase initialized ($url)',
      tag: 'SupabaseClient',
    );
  }
}
