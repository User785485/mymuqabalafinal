/// French-locale date formatting helpers.
///
/// All methods produce human-readable French strings suitable for UI
/// display. Uses the `intl` package for locale-aware formatting.
///
/// Usage:
/// ```dart
/// AppDateUtils.formatRelative(someDate);  // "il y a 2h"
/// AppDateUtils.formatFull(someDate);       // "12 février 2026"
/// ```
library;

import 'package:intl/intl.dart';

/// Date & time formatting utilities (French locale).
abstract final class AppDateUtils {
  // ── Pre-built formatters (reused to avoid repeated instantiation) ──────
  static final _fullFormat = DateFormat("d MMMM yyyy", 'fr_FR');
  static final _shortFormat = DateFormat("d MMM", 'fr_FR');
  static final _timeFormat = DateFormat("HH'h'mm", 'fr_FR');
  static final _dayMonthYear = DateFormat('dd/MM/yyyy', 'fr_FR');

  // ── Relative ("il y a ...") ────────────────────────────────────────────

  /// Returns a human-readable relative string such as:
  /// * "à l'instant" (< 1 min)
  /// * "il y a 5 min"
  /// * "il y a 2h"
  /// * "hier"
  /// * "il y a 3 jours"
  /// * the full date if older than 7 days
  static String formatRelative(DateTime date) {
    final now = DateTime.now();
    final diff = now.difference(date);

    if (diff.isNegative) {
      // Future date -- fall back to full format.
      return _fullFormat.format(date);
    }
    if (diff.inSeconds < 60) return "à l'instant";
    if (diff.inMinutes < 60) return 'il y a ${diff.inMinutes} min';
    if (diff.inHours < 24) return 'il y a ${diff.inHours}h';

    final today = DateTime(now.year, now.month, now.day);
    final dateDay = DateTime(date.year, date.month, date.day);
    final daysDiff = today.difference(dateDay).inDays;

    if (daysDiff == 1) return 'hier';
    if (daysDiff < 7) return 'il y a $daysDiff jours';

    return _fullFormat.format(date);
  }

  // ── Full date ──────────────────────────────────────────────────────────

  /// "12 février 2026"
  static String formatFull(DateTime date) => _fullFormat.format(date);

  // ── Short date ─────────────────────────────────────────────────────────

  /// "12 fév."
  static String formatShort(DateTime date) => '${_shortFormat.format(date)}.';

  // ── Time ───────────────────────────────────────────────────────────────

  /// "14h30"
  static String formatTime(DateTime date) => _timeFormat.format(date);

  // ── Numeric date ───────────────────────────────────────────────────────

  /// "20/02/2026"
  static String formatNumeric(DateTime date) => _dayMonthYear.format(date);

  // ── Countdown ──────────────────────────────────────────────────────────

  /// Formats a [Duration] as a countdown string: "2j 5h 30min".
  ///
  /// Returns "terminé" if the duration is zero or negative.
  static String formatCountdown(Duration remaining) {
    if (remaining.isNegative || remaining == Duration.zero) return 'terminé';

    final days = remaining.inDays;
    final hours = remaining.inHours.remainder(24);
    final minutes = remaining.inMinutes.remainder(60);

    final parts = <String>[];
    if (days > 0) parts.add('${days}j');
    if (hours > 0) parts.add('${hours}h');
    if (minutes > 0 || parts.isEmpty) parts.add('${minutes}min');

    return parts.join(' ');
  }
}
