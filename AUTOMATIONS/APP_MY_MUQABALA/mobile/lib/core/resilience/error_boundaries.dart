/// Five-layer error boundary setup for production resilience.
///
/// Call [setupErrorBoundaries] once at app startup (before `runApp`) to
/// install handlers at every level of the Flutter runtime:
///
/// 1. **Widget-level** -- [ErrorWidget.builder]
/// 2. **Zone-level** -- [runZonedGuarded]
/// 3. **Flutter framework** -- [FlutterError.onError]
/// 4. **Platform dispatcher** -- [PlatformDispatcher.instance.onError]
/// 5. **Isolate** -- [Isolate.current.addErrorListener]
///
/// All unhandled errors are forwarded to Sentry and logged locally.
library;

import 'dart:async';
import 'dart:isolate';
import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:sentry_flutter/sentry_flutter.dart';

import 'package:my_muqabala/core/utils/logger.dart';

/// Installs all five error boundary layers and then invokes [appRunner].
///
/// Typically called from `main()`:
///
/// ```dart
/// void main() {
///   setupErrorBoundaries(
///     appRunner: () => runApp(const MyApp()),
///   );
/// }
/// ```
void setupErrorBoundaries({required void Function() appRunner}) {
  // ── Layer 1: Widget-level error widget ────────────────────────────────
  ErrorWidget.builder = _buildErrorWidget;

  // ── Layer 2: Zone-level ───────────────────────────────────────────────
  runZonedGuarded(
    () {
      WidgetsFlutterBinding.ensureInitialized();

      // ── Layer 3: Flutter framework errors ─────────────────────────────
      FlutterError.onError = _handleFlutterError;

      // ── Layer 4: Platform dispatcher errors ───────────────────────────
      PlatformDispatcher.instance.onError = _handlePlatformError;

      // ── Layer 5: Isolate errors ───────────────────────────────────────
      _installIsolateErrorListener();

      appRunner();
    },
    _handleZoneError,
  );
}

// ── Layer 1 ───────────────────────────────────────────────────────────────

Widget _buildErrorWidget(FlutterErrorDetails details) {
  AppLogger.error(
    'ErrorWidget rendered',
    tag: 'ErrorBoundary:Widget',
    error: details.exception,
    stackTrace: details.stack,
  );
  // Return a minimal user-visible fallback rather than the red error screen.
  return const Material(
    child: Center(
      child: Padding(
        padding: EdgeInsets.all(24),
        child: Text(
          'Une erreur est survenue.\nVeuillez relancer la page.',
          textAlign: TextAlign.center,
          style: TextStyle(fontSize: 16, color: Colors.black54),
        ),
      ),
    ),
  );
}

// ── Layer 2 ───────────────────────────────────────────────────────────────

void _handleZoneError(Object error, StackTrace stack) {
  AppLogger.error(
    'Uncaught zone error',
    tag: 'ErrorBoundary:Zone',
    error: error,
    stackTrace: stack,
  );
  _reportToSentry(error, stack);
}

// ── Layer 3 ───────────────────────────────────────────────────────────────

void _handleFlutterError(FlutterErrorDetails details) {
  AppLogger.error(
    'Flutter framework error: ${details.exceptionAsString()}',
    tag: 'ErrorBoundary:Framework',
    error: details.exception,
    stackTrace: details.stack,
  );
  _reportToSentry(details.exception, details.stack);
}

// ── Layer 4 ───────────────────────────────────────────────────────────────

bool _handlePlatformError(Object error, StackTrace stack) {
  AppLogger.error(
    'Platform dispatcher error',
    tag: 'ErrorBoundary:Platform',
    error: error,
    stackTrace: stack,
  );
  _reportToSentry(error, stack);
  // Return true to prevent the framework from terminating the app.
  return true;
}

// ── Layer 5 ───────────────────────────────────────────────────────────────

void _installIsolateErrorListener() {
  final errorPort = RawReceivePort((dynamic message) {
    if (message is List<dynamic> && message.length == 2) {
      final error = message[0];
      final stackTrace =
          message[1] is StackTrace ? message[1] as StackTrace : StackTrace.current;
      AppLogger.error(
        'Isolate error',
        tag: 'ErrorBoundary:Isolate',
        error: error,
        stackTrace: stackTrace,
      );
      _reportToSentry(error, stackTrace);
    }
  });
  Isolate.current.addErrorListener(errorPort.sendPort);
}

// ── Sentry reporter ──────────────────────────────────────────────────────

Future<void> _reportToSentry(Object? error, StackTrace? stack) async {
  if (error == null) return;
  try {
    await Sentry.captureException(
      error,
      stackTrace: stack ?? StackTrace.current,
    );
  } on Exception catch (e) {
    AppLogger.warning(
      'Failed to report error to Sentry',
      tag: 'ErrorBoundary',
      error: e,
    );
  }
}
