import 'dart:ui';

/// Design-token colors for the MyMuqabala Flutter app.
///
/// Extracted from the web CSS design tokens and the project specification.
/// All values are compile-time constants so they can be used in `const`
/// widget constructors.
///
/// Naming convention follows the spec: violet (primary), rose, sage, gold.
abstract final class AppColors {
  // ── Primary: Violet ────────────────────────────────────────────────────
  static const violet = Color(0xFF6B46C1);
  static const violetVivid = Color(0xFF7C3AED);
  static const violetDeep = Color(0xFF6B5A9C);
  static const violetLight = Color(0xFFEDE9F6);

  // ── Accent: Rose ───────────────────────────────────────────────────────
  static const rose = Color(0xFFE8B4B8);
  static const roseDeep = Color(0xFFC88B90);
  static const roseLight = Color(0xFFFDF2F3);

  // ── Accent: Sage ───────────────────────────────────────────────────────
  static const sage = Color(0xFF7D9A8C);
  static const sageDeep = Color(0xFF5C7A6C);
  static const sageLight = Color(0xFFF0F5F2);

  // ── Accent: Gold ───────────────────────────────────────────────────────
  static const gold = Color(0xFFC9A962);
  static const goldWarm = Color(0xFFD4A574);
  static const goldLight = Color(0xFFFAF6ED);

  // ── Neutrals ───────────────────────────────────────────────────────────
  static const paper = Color(0xFFF8F7F4);
  static const paperWarm = Color(0xFFFAF6F1);
  static const surface = Color(0xFFFFFFFF);
  static const ink = Color(0xFF1A1A1A);
  static const inkSoft = Color(0xFF3D3D3D);
  static const inkMuted = Color(0xFF6B6B6B);
  static const inkFaint = Color(0xFF9A9A9A);
  static const border = Color(0xFFE8E5DE);
  static const divider = Color(0xFFF0EDE8);
  static const sidebar = Color(0xFF0F0F1A);

  // ── Semantic ───────────────────────────────────────────────────────────
  static const success = Color(0xFF22C55E);
  static const successLight = Color(0xFFDCFCE7);
  static const warning = Color(0xFFF59E0B);
  static const warningLight = Color(0xFFFEF3C7);
  static const error = Color(0xFFEF4444);
  static const errorLight = Color(0xFFFEE2E2);
  static const info = Color(0xFF3B82F6);
  static const infoLight = Color(0xFFDBEAFE);

  // ── Dark Mode ──────────────────────────────────────────────────────────
  static const darkBg = Color(0xFF0F0F1A);
  static const darkBgWarm = Color(0xFF141420);
  static const darkSurface = Color(0xFF1A1A2E);
  static const darkCard = Color(0xFF252540);
  static const darkBorder = Color(0xFF2A2A45);
  static const darkBorderStrong = Color(0xFF3D3D5C);
  static const darkInk = Color(0xFFF5F5F5);
  static const darkInkSoft = Color(0xFFD1D1D1);
  static const darkInkMuted = Color(0xFF9A9A9A);
  static const darkInkFaint = Color(0xFF5C5A70);

  // ── Overlay / Scrim ────────────────────────────────────────────────────
  static const scrimLight = Color(0x33000000);
  static const scrimDark = Color(0x66000000);
  static const shadowLight = Color(0x1A000000);
  static const shadowDark = Color(0x40000000);

  // ── Legacy aliases (backward compatibility with existing code) ────────
  /// @deprecated Use [violet] instead.
  static const purple = violet;

  /// @deprecated Use [violetDeep] instead.
  static const purpleDeep = violetDeep;

  /// @deprecated Use [violetLight] instead.
  static const purpleLight = violetLight;

  /// @deprecated Use [paper] instead.
  static const paperAlt = paper;
}
