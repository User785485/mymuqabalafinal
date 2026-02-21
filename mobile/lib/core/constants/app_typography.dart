import 'package:flutter/material.dart';

import 'app_colors.dart';

/// Typography tokens matching the MyMuqabala design system.
///
/// Fonts are bundled in `assets/fonts/` and declared in `pubspec.yaml`,
/// so no `google_fonts` dependency is required.
///
/// Three font families are used:
///   - **Cormorant** : display / titles (serif)
///   - **Outfit**    : body / labels / UI text (sans-serif)
///   - **Amiri**     : Arabic quotations (serif)
abstract final class AppTypography {
  // ── Font family names (must match pubspec.yaml `family:` keys) ────────
  static const _cormorant = 'Cormorant';
  static const _outfit = 'Outfit';
  static const _amiri = 'Amiri';

  // ── Display / Heading — Cormorant ─────────────────────────────────────

  /// h1 — 32px Cormorant SemiBold. Main page titles.
  static const h1 = TextStyle(
    fontFamily: _cormorant,
    fontSize: 32,
    fontWeight: FontWeight.w600,
    height: 1.25,
    letterSpacing: -0.5,
    color: AppColors.ink,
  );

  /// h2 — 24px Cormorant Medium. Section titles.
  static const h2 = TextStyle(
    fontFamily: _cormorant,
    fontSize: 24,
    fontWeight: FontWeight.w500,
    height: 1.3,
    letterSpacing: -0.25,
    color: AppColors.ink,
  );

  /// h3 — 20px Cormorant Medium. Sub-section titles.
  static const h3 = TextStyle(
    fontFamily: _cormorant,
    fontSize: 20,
    fontWeight: FontWeight.w500,
    height: 1.35,
    color: AppColors.ink,
  );

  // ── Aliases for Material naming convention ────────────────────────────
  static const displayLarge = h1;
  static const displayMedium = h2;
  static const displaySmall = h3;

  // ── Body — Outfit ─────────────────────────────────────────────────────

  /// bodyLarge — 16px Outfit Regular. Primary body text.
  static const bodyLarge = TextStyle(
    fontFamily: _outfit,
    fontSize: 16,
    fontWeight: FontWeight.w400,
    height: 1.5,
    color: AppColors.ink,
  );

  /// bodyMedium — 14px Outfit Regular. Secondary body text.
  static const bodyMedium = TextStyle(
    fontFamily: _outfit,
    fontSize: 14,
    fontWeight: FontWeight.w400,
    height: 1.5,
    color: AppColors.ink,
  );

  /// bodySmall — 12px Outfit Regular. Tertiary / supporting text.
  static const bodySmall = TextStyle(
    fontFamily: _outfit,
    fontSize: 12,
    fontWeight: FontWeight.w400,
    height: 1.5,
    color: AppColors.inkSoft,
  );

  // ── Labels — Outfit ───────────────────────────────────────────────────

  /// label — 14px Outfit SemiBold. Buttons, form labels, tab headers.
  static const label = TextStyle(
    fontFamily: _outfit,
    fontSize: 14,
    fontWeight: FontWeight.w600,
    height: 1.4,
    letterSpacing: 0.1,
    color: AppColors.ink,
  );

  /// Alias for [label] — used by Material's TextTheme mapping.
  static const labelLarge = label;

  /// labelMedium — 12px Outfit Medium. Chip labels, meta info.
  static const labelMedium = TextStyle(
    fontFamily: _outfit,
    fontSize: 12,
    fontWeight: FontWeight.w500,
    height: 1.4,
    letterSpacing: 0.5,
    color: AppColors.inkSoft,
  );

  /// labelSmall — 10px Outfit Medium. Very small annotations.
  static const labelSmall = TextStyle(
    fontFamily: _outfit,
    fontSize: 10,
    fontWeight: FontWeight.w500,
    height: 1.4,
    letterSpacing: 0.5,
    color: AppColors.inkMuted,
  );

  // ── Caption — Outfit ──────────────────────────────────────────────────

  /// caption — 11px Outfit Regular. Timestamps, footnotes.
  static const caption = TextStyle(
    fontFamily: _outfit,
    fontSize: 11,
    fontWeight: FontWeight.w400,
    height: 1.4,
    letterSpacing: 0.3,
    color: AppColors.inkFaint,
  );

  // ── Arabic — Amiri ────────────────────────────────────────────────────

  /// arabic — 24px Amiri Regular. Large Arabic quotations.
  static const arabic = TextStyle(
    fontFamily: _amiri,
    fontSize: 24,
    fontWeight: FontWeight.w400,
    height: 1.6,
    color: AppColors.ink,
  );

  /// arabicMedium — 20px Amiri Regular. Standard Arabic text.
  static const arabicMedium = TextStyle(
    fontFamily: _amiri,
    fontSize: 20,
    fontWeight: FontWeight.w400,
    height: 1.6,
    color: AppColors.ink,
  );

  /// arabicSmall — 16px Amiri Regular. Small Arabic text.
  static const arabicSmall = TextStyle(
    fontFamily: _amiri,
    fontSize: 16,
    fontWeight: FontWeight.w400,
    height: 1.6,
    color: AppColors.inkSoft,
  );

  // ── Button text ───────────────────────────────────────────────────────

  /// buttonLarge — 16px Outfit SemiBold. Primary buttons.
  static const buttonLarge = TextStyle(
    fontFamily: _outfit,
    fontSize: 16,
    fontWeight: FontWeight.w600,
    height: 1.25,
    letterSpacing: 0.3,
    color: AppColors.ink,
  );

  /// buttonSmall — 14px Outfit SemiBold. Secondary / text buttons.
  static const buttonSmall = TextStyle(
    fontFamily: _outfit,
    fontSize: 14,
    fontWeight: FontWeight.w600,
    height: 1.25,
    letterSpacing: 0.2,
    color: AppColors.ink,
  );

  // ── TextTheme helper (for ThemeData) ──────────────────────────────────

  /// Returns a [TextTheme] that maps the Material token names to our
  /// custom styles. Pass this to `ThemeData.textTheme`.
  static TextTheme get textTheme => const TextTheme(
        displayLarge: h1,
        displayMedium: h2,
        displaySmall: h3,
        headlineLarge: h1,
        headlineMedium: h2,
        headlineSmall: h3,
        titleLarge: h3,
        titleMedium: label,
        titleSmall: labelMedium,
        bodyLarge: bodyLarge,
        bodyMedium: bodyMedium,
        bodySmall: bodySmall,
        labelLarge: label,
        labelMedium: labelMedium,
        labelSmall: labelSmall,
      );

  /// A dark-mode variant where default text colors are flipped to
  /// [AppColors.darkInk] / [AppColors.darkInkSoft] / [AppColors.darkInkMuted].
  static TextTheme get darkTextTheme => TextTheme(
        displayLarge: h1.copyWith(color: AppColors.darkInk),
        displayMedium: h2.copyWith(color: AppColors.darkInk),
        displaySmall: h3.copyWith(color: AppColors.darkInk),
        headlineLarge: h1.copyWith(color: AppColors.darkInk),
        headlineMedium: h2.copyWith(color: AppColors.darkInk),
        headlineSmall: h3.copyWith(color: AppColors.darkInk),
        titleLarge: h3.copyWith(color: AppColors.darkInk),
        titleMedium: label.copyWith(color: AppColors.darkInk),
        titleSmall: labelMedium.copyWith(color: AppColors.darkInkSoft),
        bodyLarge: bodyLarge.copyWith(color: AppColors.darkInk),
        bodyMedium: bodyMedium.copyWith(color: AppColors.darkInkSoft),
        bodySmall: bodySmall.copyWith(color: AppColors.darkInkMuted),
        labelLarge: label.copyWith(color: AppColors.darkInk),
        labelMedium: labelMedium.copyWith(color: AppColors.darkInkSoft),
        labelSmall: labelSmall.copyWith(color: AppColors.darkInkMuted),
      );
}
