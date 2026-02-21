/// Root widget of the My Muqabala application.
///
/// Provides:
/// - [MaterialApp.router] with the GoRouter from [routerProvider]
/// - Light / dark theme from the design system
/// - French locale support (fr_FR + Arabic fallback)
/// - [StreamChat] wrapper for chat functionality (when API key is configured)
/// - Global theme mode control via [themeModeProvider]
/// - Auto Stream Chat user connection via [streamConnectionProvider]
library;

import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_riverpod/legacy.dart';
import 'package:stream_chat_flutter/stream_chat_flutter.dart';

import 'package:my_muqabala/core/constants/api_constants.dart';
import 'package:my_muqabala/core/constants/app_colors.dart';
import 'package:my_muqabala/core/config/env_config.dart';
import 'package:my_muqabala/core/router/app_router.dart';
import 'package:my_muqabala/core/theme/app_theme.dart';
import 'package:my_muqabala/core/theme/dark_theme.dart';
import 'package:my_muqabala/core/utils/logger.dart';

// ═══════════════════════════════════════════════════════════════════════════
// App-level providers
// ═══════════════════════════════════════════════════════════════════════════

/// Controls light / dark / system theme mode across the app.
final themeModeProvider = StateProvider<ThemeMode>((ref) => ThemeMode.system);

/// Whether Stream Chat is properly configured with a real API key.
bool _isStreamConfigured() {
  final apiKey = EnvConfig.streamChatApiKey;
  if (apiKey.isEmpty) return false;
  if (apiKey.startsWith('PLACEHOLDER')) return false;
  if (apiKey.startsWith('YOUR_')) return false;
  return true;
}

/// The singleton [StreamChatClient] instance shared across the app.
/// Returns null if the API key is not configured.
final streamChatClientProvider = Provider<StreamChatClient?>((ref) {
  if (!_isStreamConfigured()) {
    AppLogger.debug(
      'Stream Chat not configured — client is null',
      tag: 'StreamChat',
    );
    return null;
  }
  try {
    final apiKey =
        dotenv.env['STREAM_CHAT_API_KEY'] ?? ApiConstants.streamChatApiKey;
    return StreamChatClient(
      apiKey,
      logLevel: Level.WARNING,
    );
  } on Exception catch (e, st) {
    AppLogger.error(
      'Failed to create StreamChatClient',
      tag: 'StreamChat',
      error: e,
      stackTrace: st,
    );
    return null;
  }
});

// ═══════════════════════════════════════════════════════════════════════════
// App Widget
// ═══════════════════════════════════════════════════════════════════════════

/// Root widget that configures [MaterialApp.router] with theming, routing,
/// localization, and the StreamChat wrapper.
class MyMuqabalaApp extends ConsumerWidget {
  const MyMuqabalaApp({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final router = ref.watch(routerProvider);
    final themeMode = ref.watch(themeModeProvider);
    final streamClient = ref.watch(streamChatClientProvider);

    return MaterialApp.router(
      // ── Meta ────────────────────────────────────────────────────────
      title: 'My Muqabala',
      debugShowCheckedModeBanner: false,

      // ── Theme ───────────────────────────────────────────────────────
      theme: AppTheme.light,
      darkTheme: DarkTheme.dark,
      themeMode: themeMode,

      // ── Localization ────────────────────────────────────────────────
      locale: const Locale('fr', 'FR'),
      supportedLocales: const [
        Locale('fr', 'FR'),
        Locale('ar'),
      ],
      localizationsDelegates: const [
        GlobalMaterialLocalizations.delegate,
        GlobalWidgetsLocalizations.delegate,
        GlobalCupertinoLocalizations.delegate,
      ],

      // ── Routing ─────────────────────────────────────────────────────
      routerConfig: router,

      // ── StreamChat wrapper ──────────────────────────────────────────
      // StreamChat must be INSIDE MaterialApp (not wrapping it) so that
      // Localizations, MediaQuery, and Theme are available to its
      // internal widgets that depend on them.
      builder: (context, child) {
        if (streamClient == null || child == null) return child ?? const SizedBox.shrink();

        final isDark = Theme.of(context).brightness == Brightness.dark;
        return StreamChat(
          client: streamClient,
          streamChatThemeData: isDark
              ? StreamChatThemeData.dark().copyWith(
                  colorTheme: StreamColorTheme.dark(
                    accentPrimary: AppColors.violet,
                  ),
                )
              : StreamChatThemeData.light().copyWith(
                  colorTheme: StreamColorTheme.light(
                    accentPrimary: AppColors.violet,
                  ),
                ),
          child: child,
        );
      },
    );
  }
}
