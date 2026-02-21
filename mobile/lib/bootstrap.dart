/// Application bootstrap sequence.
///
/// Initializes all third-party services in the correct dependency order.
/// Every initialization step is wrapped in a try/catch so that a single
/// service failure does not prevent the app from launching.
library;

import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/services.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:intl/date_symbol_data_local.dart';
import 'package:sentry_flutter/sentry_flutter.dart';

import 'package:my_muqabala/core/config/env_config.dart';
import 'package:my_muqabala/core/constants/api_constants.dart';
import 'package:my_muqabala/core/network/supabase_client.dart';
import 'package:my_muqabala/core/security/rasp_config.dart';
import 'package:my_muqabala/core/security/screen_protection.dart';
import 'package:my_muqabala/core/utils/logger.dart';
import 'package:my_muqabala/firebase_options.dart';

/// Returns true if [value] is a real configured value (not a placeholder).
bool _isConfigured(String value) =>
    value.isNotEmpty &&
    !value.startsWith('PLACEHOLDER') &&
    !value.startsWith('YOUR_');

/// Run the full bootstrap sequence.
///
/// Call this **once** from `main()` before `runApp()`.
/// Each step is isolated so a failure in one does not block the others.
Future<void> bootstrap() async {
  // ignore: avoid_print
  print('[BOOT] bootstrap() start');

  // ── 1. Load environment variables ─────────────────────────────────────
  await _loadEnv();
  // ignore: avoid_print
  print('[BOOT] 1/5 env loaded');

  // ── 2. Initialize French locale data for intl ─────────────────────────
  await initializeDateFormatting('fr_FR');
  // ignore: avoid_print
  print('[BOOT] 2/5 locale initialized');

  // ── 3. Initialize Supabase (skip if placeholder) ──────────────────────
  await _initSupabase();
  // ignore: avoid_print
  print('[BOOT] 3/5 supabase done');

  // ── 4. Initialize Firebase (skip on web without config) ───────────────
  await _initFirebase();
  // ignore: avoid_print
  print('[BOOT] 4/5 firebase done');

  // ── 5. Initialize Sentry (skip if placeholder DSN) ────────────────────
  await _initSentry();
  // ignore: avoid_print
  print('[BOOT] 5/5 sentry done');

  // ── 6–8. Mobile-only steps ────────────────────────────────────────────
  if (!kIsWeb) {
    await _initFreeRasp();
    await _initScreenProtector();
    await SystemChrome.setPreferredOrientations([
      DeviceOrientation.portraitUp,
    ]);
  }

  // ignore: avoid_print
  print('[BOOT] bootstrap() COMPLETE');
}

// ═══════════════════════════════════════════════════════════════════════════
// Private initialization helpers
// ═══════════════════════════════════════════════════════════════════════════

/// Reads the appropriate .env file based on build mode.
Future<void> _loadEnv() async {
  try {
    const envFile = kReleaseMode ? '.env.prod' : '.env.dev';
    await dotenv.load(fileName: envFile);
    // ignore: avoid_print
    print('[BOOT] loaded $envFile — SUPABASE_URL=${EnvConfig.supabaseUrl.isNotEmpty ? "SET" : "EMPTY"} ANON_KEY=${EnvConfig.supabaseAnonKey.isNotEmpty ? "SET(${EnvConfig.supabaseAnonKey.length} chars)" : "EMPTY"}');
  } catch (e) {
    // ignore: avoid_print
    print('[BOOT] WARN: env load failed: $e');
  }
}

/// Initializes the Supabase SDK.
Future<void> _initSupabase() async {
  try {
    final url = EnvConfig.supabaseUrl.isNotEmpty
        ? EnvConfig.supabaseUrl
        : ApiConstants.supabaseUrl;
    final anonKey = EnvConfig.supabaseAnonKey.isNotEmpty
        ? EnvConfig.supabaseAnonKey
        : ApiConstants.supabaseAnonKey;

    if (!_isConfigured(url) || !_isConfigured(anonKey)) {
      // ignore: avoid_print
      print('[BOOT] Supabase SKIPPED (placeholder values)');
      return;
    }

    // ignore: avoid_print
    print('[BOOT] Supabase initializing with url=$url ...');
    await SupabaseClientManager.init(url: url, anonKey: anonKey)
        .timeout(const Duration(seconds: 10));
    // ignore: avoid_print
    print('[BOOT] Supabase initialized OK');
  } catch (e) {
    // ignore: avoid_print
    print('[BOOT] ERROR Supabase init failed: $e');
  }
}

/// Initializes Firebase Core.
Future<void> _initFirebase() async {
  try {
    // ignore: avoid_print
    print('[BOOT] Firebase initializing...');
    await Firebase.initializeApp(
      options: DefaultFirebaseOptions.currentPlatform,
    ).timeout(const Duration(seconds: 10));
    // ignore: avoid_print
    print('[BOOT] Firebase initialized OK');
  } catch (e) {
    // ignore: avoid_print
    print('[BOOT] ERROR Firebase init failed: $e');
  }
}

/// Initializes Sentry error tracking.
Future<void> _initSentry() async {
  try {
    final dsn = EnvConfig.sentryDsn.isNotEmpty
        ? EnvConfig.sentryDsn
        : ApiConstants.sentryDsn;

    if (!_isConfigured(dsn)) {
      // ignore: avoid_print
      print('[BOOT] Sentry SKIPPED (placeholder DSN)');
      return;
    }

    // ignore: avoid_print
    print('[BOOT] Sentry initializing...');
    await SentryFlutter.init(
      (options) {
        options
          ..dsn = dsn
          ..tracesSampleRate = 0.2
          ..environment = EnvConfig.isProduction ? 'production' : 'development'
          ..debug = false
          ..sendDefaultPii = false
          ..attachScreenshot = false
          ..enableAutoPerformanceTracing = true;
      },
    ).timeout(const Duration(seconds: 10));
    // ignore: avoid_print
    print('[BOOT] Sentry initialized OK');
  } catch (e) {
    // ignore: avoid_print
    print('[BOOT] ERROR Sentry init failed: $e');
  }
}

/// Initializes freeRASP tamper detection via [RaspConfig].
Future<void> _initFreeRasp() async {
  try {
    await RaspConfig.initialize();
  } catch (e) {
    // ignore: avoid_print
    print('[BOOT] ERROR freeRASP init failed: $e');
  }
}

/// Prevents screenshots and screen recording via [ScreenProtection].
Future<void> _initScreenProtector() async {
  try {
    await ScreenProtection.enable();
  } catch (e) {
    // ignore: avoid_print
    print('[BOOT] ERROR screen protector failed: $e');
  }
}
