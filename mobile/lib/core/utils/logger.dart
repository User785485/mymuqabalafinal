/// Application-wide structured logger.
///
/// Wraps `dart:developer` [log] so that messages appear in DevTools and can
/// be filtered by tag / severity. In release builds `dart:developer` is a
/// no-op so there is zero overhead.
///
/// Usage:
/// ```dart
/// AppLogger.info('User signed in', tag: 'Auth');
/// AppLogger.error('Payment failed', tag: 'Billing', error: e, stackTrace: st);
/// ```
library;

import 'dart:developer' as dev;

/// Severity levels mirroring `dart:developer` log levels.
///
/// Level values follow the convention:
/// * 0   = finest / debug
/// * 800 = info
/// * 900 = warning
/// * 1000 = severe / error
enum LogLevel {
  debug(0),
  info(800),
  warning(900),
  error(1000);

  const LogLevel(this.value);
  final int value;
}

/// Lightweight structured logger backed by `dart:developer`.
abstract final class AppLogger {
  /// Log a debug message. Stripped in release builds automatically.
  static void debug(String message, {String? tag}) {
    _log(LogLevel.debug, message, tag: tag);
  }

  /// Log an informational message.
  static void info(String message, {String? tag}) {
    _log(LogLevel.info, message, tag: tag);
  }

  /// Log a warning, optionally attaching the causal [error].
  static void warning(
    String message, {
    String? tag,
    Object? error,
    StackTrace? stackTrace,
  }) {
    _log(LogLevel.warning, message, tag: tag, error: error, stackTrace: stackTrace);
  }

  /// Log an error with optional [error] object and [stackTrace].
  static void error(
    String message, {
    String? tag,
    Object? error,
    StackTrace? stackTrace,
  }) {
    _log(LogLevel.error, message, tag: tag, error: error, stackTrace: stackTrace);
  }

  // ── Internal ────────────────────────────────────────────────────────────

  static void _log(
    LogLevel level,
    String message, {
    String? tag,
    Object? error,
    StackTrace? stackTrace,
  }) {
    final buffer = StringBuffer(message);
    if (error != null) {
      buffer
        ..writeln()
        ..write('Error: $error');
    }
    if (stackTrace != null) {
      buffer
        ..writeln()
        ..write(stackTrace);
    }

    dev.log(
      buffer.toString(),
      name: tag ?? 'MyMuqabala',
      level: level.value,
      error: error,
      stackTrace: stackTrace,
    );
  }
}
