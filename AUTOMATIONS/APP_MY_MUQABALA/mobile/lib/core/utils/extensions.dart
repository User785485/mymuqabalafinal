/// Common Dart & Flutter extensions used across the MyMuqabala app.
///
/// Provides convenience accessors on [BuildContext] for theme data, text styles,
/// color scheme, media query, and safe-area padding, as well as [String]
/// utilities (capitalize, truncate, initials, etc.).
///
/// Usage:
/// ```dart
/// // In any widget build method:
/// final colors = context.colors;
/// final body = context.textTheme.bodyMedium;
/// final width = context.screenWidth;
/// ```
library;

import 'package:flutter/material.dart';

// ═══════════════════════════════════════════════════════════════════════════
// BuildContext extensions
// ═══════════════════════════════════════════════════════════════════════════

/// Shortcuts to frequently accessed inherited widgets via [BuildContext].
extension BuildContextX on BuildContext {
  // ── Theme ────────────────────────────────────────────────────────────

  /// The nearest [ThemeData].
  ThemeData get theme => Theme.of(this);

  /// The [TextTheme] from the nearest [Theme].
  TextTheme get textTheme => theme.textTheme;

  /// The [ColorScheme] from the nearest [Theme].
  ColorScheme get colors => theme.colorScheme;

  /// Whether the current theme brightness is [Brightness.dark].
  bool get isDarkMode => theme.brightness == Brightness.dark;

  // ── Media Query ──────────────────────────────────────────────────────

  /// The full [MediaQueryData] for the current context.
  MediaQueryData get mediaQuery => MediaQuery.of(this);

  /// Screen width in logical pixels.
  double get screenWidth => mediaQuery.size.width;

  /// Screen height in logical pixels.
  double get screenHeight => mediaQuery.size.height;

  /// The view padding (safe area insets).
  EdgeInsets get viewPadding => mediaQuery.viewPadding;

  /// Bottom safe-area padding (useful for bottom navigation / FAB spacing).
  double get bottomPadding => mediaQuery.viewPadding.bottom;

  /// Top safe-area padding (status bar height).
  double get topPadding => mediaQuery.viewPadding.top;

  /// The current text scale factor.
  double get textScaleFactor => mediaQuery.textScaler.scale(1);

  // ── Keyboard ─────────────────────────────────────────────────────────

  /// Whether the software keyboard is currently visible.
  bool get isKeyboardVisible => mediaQuery.viewInsets.bottom > 0;

  // ── Responsive breakpoints ───────────────────────────────────────────

  /// `true` when the screen width is < 360 (compact phone).
  bool get isCompact => screenWidth < 360;

  /// `true` when the screen width is >= 600 (tablet / landscape).
  bool get isTablet => screenWidth >= 600;

  // ── Navigation shortcuts ─────────────────────────────────────────────

  /// Pop the current route.
  void pop<T>([T? result]) => Navigator.of(this).pop(result);

  /// Push a named route.
  Future<T?> pushNamed<T>(String routeName, {Object? arguments}) =>
      Navigator.of(this).pushNamed<T>(routeName, arguments: arguments);

  // ── Overlay helpers ──────────────────────────────────────────────────

  /// Show a [SnackBar] using the nearest [ScaffoldMessenger].
  ScaffoldFeatureController<SnackBar, SnackBarClosedReason> showSnackBar(
    String message, {
    Duration duration = const Duration(seconds: 3),
    SnackBarAction? action,
  }) {
    return ScaffoldMessenger.of(this).showSnackBar(
      SnackBar(
        content: Text(message),
        duration: duration,
        action: action,
      ),
    );
  }

  /// Hide the currently displayed [SnackBar], if any.
  void hideSnackBar() {
    ScaffoldMessenger.of(this).hideCurrentSnackBar();
  }

  // ── Focus ────────────────────────────────────────────────────────────

  /// Dismiss the keyboard by removing focus from the current node.
  void unfocus() => FocusScope.of(this).unfocus();
}

// ═══════════════════════════════════════════════════════════════════════════
// String extensions
// ═══════════════════════════════════════════════════════════════════════════

/// Common string manipulation helpers.
extension StringX on String {
  /// Capitalizes the first character and lowercases the rest.
  ///
  /// ```dart
  /// 'hello'.capitalize; // 'Hello'
  /// 'HELLO'.capitalize; // 'Hello'
  /// ''.capitalize;      // ''
  /// ```
  String get capitalize {
    if (isEmpty) return this;
    return '${this[0].toUpperCase()}${substring(1).toLowerCase()}';
  }

  /// Capitalizes the first character, leaving the rest unchanged.
  ///
  /// ```dart
  /// 'hello world'.capitalizeFirst; // 'Hello world'
  /// ```
  String get capitalizeFirst {
    if (isEmpty) return this;
    return '${this[0].toUpperCase()}${substring(1)}';
  }

  /// Capitalizes the first letter of every word.
  ///
  /// ```dart
  /// 'hello world'.titleCase; // 'Hello World'
  /// ```
  String get titleCase {
    if (isEmpty) return this;
    return split(' ').map((w) => w.capitalize).join(' ');
  }

  /// Extracts up to two initials from the string.
  ///
  /// ```dart
  /// 'Fatima Zahra'.initials;  // 'FZ'
  /// 'Ahmed'.initials;         // 'A'
  /// ''.initials;              // ''
  /// ```
  String get initials {
    final parts = trim().split(RegExp(r'\s+'));
    if (parts.isEmpty || parts.first.isEmpty) return '';
    if (parts.length == 1) return parts[0][0].toUpperCase();
    return '${parts[0][0]}${parts[1][0]}'.toUpperCase();
  }

  /// Truncates the string to [maxLength] characters, appending [ellipsis]
  /// if truncation occurred.
  ///
  /// ```dart
  /// 'A very long text'.truncate(10); // 'A very lon...'
  /// ```
  String truncate(int maxLength, {String ellipsis = '...'}) {
    if (length <= maxLength) return this;
    return '${substring(0, maxLength)}$ellipsis';
  }

  /// Returns `true` if the string is a valid email address (basic check).
  bool get isEmail =>
      RegExp(r'^[a-zA-Z0-9.!#$%&*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$')
          .hasMatch(this);

  /// Returns `true` if the string contains only whitespace or is empty.
  bool get isBlank => trim().isEmpty;

  /// Returns `null` if the string is blank, otherwise returns itself.
  String? get nullIfBlank => isBlank ? null : this;
}

// ═══════════════════════════════════════════════════════════════════════════
// Nullable String extensions
// ═══════════════════════════════════════════════════════════════════════════

/// Helpers for nullable strings.
extension NullableStringX on String? {
  /// Returns `true` if the string is null, empty, or contains only whitespace.
  bool get isNullOrBlank => this == null || this!.trim().isEmpty;

  /// Returns the string if it is not null or blank, otherwise returns [fallback].
  String orDefault([String fallback = '']) =>
      isNullOrBlank ? fallback : this!;
}

// ═══════════════════════════════════════════════════════════════════════════
// DateTime extensions
// ═══════════════════════════════════════════════════════════════════════════

/// Convenience getters on [DateTime].
extension DateTimeX on DateTime {
  /// Whether this date is today.
  bool get isToday {
    final now = DateTime.now();
    return year == now.year && month == now.month && day == now.day;
  }

  /// Whether this date is yesterday.
  bool get isYesterday {
    final yesterday = DateTime.now().subtract(const Duration(days: 1));
    return year == yesterday.year &&
        month == yesterday.month &&
        day == yesterday.day;
  }

  /// Whether this date is in the future.
  bool get isFuture => isAfter(DateTime.now());

  /// Whether this date is in the past.
  bool get isPast => isBefore(DateTime.now());

  /// Returns a new [DateTime] with time set to midnight (00:00:00).
  DateTime get dateOnly => DateTime(year, month, day);

  /// The number of whole days between this date and [other].
  int daysUntil(DateTime other) =>
      other.dateOnly.difference(dateOnly).inDays;
}

// ═══════════════════════════════════════════════════════════════════════════
// Iterable extensions
// ═══════════════════════════════════════════════════════════════════════════

/// Convenience methods on [Iterable].
extension IterableX<T> on Iterable<T> {
  /// Returns the first element matching [test], or `null` if none match.
  T? firstWhereOrNull(bool Function(T) test) {
    for (final element in this) {
      if (test(element)) return element;
    }
    return null;
  }

  /// Separates elements with [separator], similar to `String.join` but for
  /// widget lists or any iterable.
  ///
  /// ```dart
  /// [Text('A'), Text('B')].separated(Divider())
  /// // => [Text('A'), Divider(), Text('B')]
  /// ```
  List<T> separated(T separator) {
    final result = <T>[];
    final iterator = this.iterator;
    if (!iterator.moveNext()) return result;
    result.add(iterator.current);
    while (iterator.moveNext()) {
      result.add(separator);
      result.add(iterator.current);
    }
    return result;
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// Duration extensions
// ═══════════════════════════════════════════════════════════════════════════

/// Formatting helpers on [Duration].
extension DurationX on Duration {
  /// Formats as "mm:ss" (e.g. "03:45").
  String get mmss {
    final m = inMinutes.remainder(60).toString().padLeft(2, '0');
    final s = inSeconds.remainder(60).toString().padLeft(2, '0');
    return '$m:$s';
  }

  /// Formats as "hh:mm:ss" (e.g. "01:03:45").
  String get hhmmss {
    final h = inHours.toString().padLeft(2, '0');
    final m = inMinutes.remainder(60).toString().padLeft(2, '0');
    final s = inSeconds.remainder(60).toString().padLeft(2, '0');
    return '$h:$m:$s';
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// Num extensions
// ═══════════════════════════════════════════════════════════════════════════

/// Convenience for creating [Duration] from numeric values.
extension NumDurationX on num {
  /// Creates a [Duration] of the given number of milliseconds.
  Duration get ms => Duration(milliseconds: toInt());

  /// Creates a [Duration] of the given number of seconds.
  Duration get seconds => Duration(seconds: toInt());

  /// Creates a [Duration] of the given number of minutes.
  Duration get minutes => Duration(minutes: toInt());

  /// Creates a [Duration] of the given number of hours.
  Duration get hours => Duration(hours: toInt());
}
