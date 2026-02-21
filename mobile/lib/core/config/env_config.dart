import 'package:flutter_dotenv/flutter_dotenv.dart';

abstract final class EnvConfig {
  static String get supabaseUrl => dotenv.env['SUPABASE_URL'] ?? '';
  static String get supabaseAnonKey => dotenv.env['SUPABASE_ANON_KEY'] ?? '';
  static String get streamChatApiKey =>
      dotenv.env['STREAM_CHAT_API_KEY'] ?? '';
  static String get livekitWsUrl => dotenv.env['LIVEKIT_WS_URL'] ?? '';
  static String get livekitApiKey => dotenv.env['LIVEKIT_API_KEY'] ?? '';
  static String get sentryDsn => dotenv.env['SENTRY_DSN'] ?? '';
  static String get firebaseProjectId =>
      dotenv.env['FIREBASE_PROJECT_ID'] ?? '';

  static String get environment => dotenv.env['ENVIRONMENT'] ?? 'dev';
  static bool get isProduction => environment == 'prod';
}
