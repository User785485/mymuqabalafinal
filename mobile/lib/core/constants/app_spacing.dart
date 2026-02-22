import 'package:flutter/material.dart';

/// Spacing & layout tokens matching the MyMuqabala design system.
///
/// Provides raw spacing values, EdgeInsets helpers, and SizedBox gap helpers
/// for consistent spacing throughout the app.
abstract final class AppSpacing {
  // ── Raw spacing values ─────────────────────────────────────────────────
  static const double xs = 4;
  static const double sm = 8;
  static const double md = 16;
  static const double lg = 24;
  static const double xl = 32;
  static const double xxl = 48;

  // ── Symmetric EdgeInsets (all sides) ───────────────────────────────────
  static const paddingXs = EdgeInsets.all(xs);
  static const paddingSm = EdgeInsets.all(sm);
  static const paddingMd = EdgeInsets.all(md);
  static const paddingLg = EdgeInsets.all(lg);
  static const paddingXl = EdgeInsets.all(xl);
  static const paddingXxl = EdgeInsets.all(xxl);

  // ── Horizontal-only EdgeInsets ─────────────────────────────────────────
  static const paddingHXs = EdgeInsets.symmetric(horizontal: xs);
  static const paddingHSm = EdgeInsets.symmetric(horizontal: sm);
  static const paddingHMd = EdgeInsets.symmetric(horizontal: md);
  static const paddingHLg = EdgeInsets.symmetric(horizontal: lg);
  static const paddingHXl = EdgeInsets.symmetric(horizontal: xl);
  static const paddingHXxl = EdgeInsets.symmetric(horizontal: xxl);

  // ── Vertical-only EdgeInsets ───────────────────────────────────────────
  static const paddingVXs = EdgeInsets.symmetric(vertical: xs);
  static const paddingVSm = EdgeInsets.symmetric(vertical: sm);
  static const paddingVMd = EdgeInsets.symmetric(vertical: md);
  static const paddingVLg = EdgeInsets.symmetric(vertical: lg);
  static const paddingVXl = EdgeInsets.symmetric(vertical: xl);
  static const paddingVXxl = EdgeInsets.symmetric(vertical: xxl);

  // ── Common layout padding (horizontal + vertical combos) ──────────────

  /// Standard screen padding: 16 horizontal, 24 vertical.
  static const screenPadding = EdgeInsets.symmetric(
    horizontal: md,
    vertical: lg,
  );

  /// Card internal padding: 16 all sides.
  static const cardPadding = EdgeInsets.all(md);

  /// List-item padding: 16 horizontal, 12 vertical.
  static const listItemPadding = EdgeInsets.symmetric(
    horizontal: md,
    vertical: 12,
  );

  /// Section padding: 16 horizontal, 24 vertical — for content sections.
  static const sectionPadding = EdgeInsets.symmetric(
    horizontal: md,
    vertical: lg,
  );

  /// Dialog padding: 24 all sides.
  static const dialogPadding = EdgeInsets.all(lg);

  // ── Vertical SizedBox gap helpers ─────────────────────────────────────
  static const verticalXs = SizedBox(height: xs);
  static const verticalSm = SizedBox(height: sm);
  static const verticalMd = SizedBox(height: md);
  static const verticalLg = SizedBox(height: lg);
  static const verticalXl = SizedBox(height: xl);
  static const verticalXxl = SizedBox(height: xxl);

  // ── Horizontal SizedBox gap helpers ───────────────────────────────────
  static const horizontalXs = SizedBox(width: xs);
  static const horizontalSm = SizedBox(width: sm);
  static const horizontalMd = SizedBox(width: md);
  static const horizontalLg = SizedBox(width: lg);
  static const horizontalXl = SizedBox(width: xl);
  static const horizontalXxl = SizedBox(width: xxl);

  // ── Floating nav bar clearance ────────────────────────────────────────
  static const double navBarHeight = 68;
  static const double navBarBottomMargin = 8;

  // ── Legacy aliases (backward compatibility) ───────────────────────────
  static const gapXs = verticalXs;
  static const gapSm = verticalSm;
  static const gapMd = verticalMd;
  static const gapLg = verticalLg;
  static const gapXl = verticalXl;
  static const gapXxl = verticalXxl;
  static const gapHXs = horizontalXs;
  static const gapHSm = horizontalSm;
  static const gapHMd = horizontalMd;
  static const gapHLg = horizontalLg;
  static const gapHXl = horizontalXl;
}

/// Border-radius tokens matching the MyMuqabala design system.
abstract final class AppRadius {
  // ── Raw radius values ─────────────────────────────────────────────────
  static const double sm = 6;
  static const double md = 10;
  static const double lg = 16;
  static const double xl = 24;
  static const double circular = 999;

  // ── BorderRadius helpers ──────────────────────────────────────────────
  static const borderSm = BorderRadius.all(Radius.circular(sm));
  static const borderMd = BorderRadius.all(Radius.circular(md));
  static const borderLg = BorderRadius.all(Radius.circular(lg));
  static const borderXl = BorderRadius.all(Radius.circular(xl));
  static const borderCircular = BorderRadius.all(Radius.circular(circular));

  // ── Top-only (useful for bottom sheets / modals) ──────────────────────
  static const borderTopMd = BorderRadius.only(
    topLeft: Radius.circular(md),
    topRight: Radius.circular(md),
  );

  static const borderTopLg = BorderRadius.only(
    topLeft: Radius.circular(lg),
    topRight: Radius.circular(lg),
  );

  static const borderTopXl = BorderRadius.only(
    topLeft: Radius.circular(xl),
    topRight: Radius.circular(xl),
  );

  // ── Bottom-only (useful for snackbars / banners) ──────────────────────
  static const borderBottomMd = BorderRadius.only(
    bottomLeft: Radius.circular(md),
    bottomRight: Radius.circular(md),
  );

  static const borderBottomLg = BorderRadius.only(
    bottomLeft: Radius.circular(lg),
    bottomRight: Radius.circular(lg),
  );
}

/// Animation duration & curve tokens matching the MyMuqabala design system.
///
/// The primary transition uses 400ms with a custom cubic-bezier curve
/// that creates an elegant, slightly bouncy feel.
abstract final class AppAnimation {
  /// Default animation duration — 400ms.
  static const duration = Duration(milliseconds: 400);

  /// Fast animation duration — 200ms.
  static const durationFast = Duration(milliseconds: 200);

  /// Slow animation duration — 600ms.
  static const durationSlow = Duration(milliseconds: 600);

  /// Default animation curve — cubic-bezier(0.23, 1, 0.32, 1).
  /// An ease-out curve with a slight overshoot for elegance.
  static const curve = Cubic(0.23, 1, 0.32, 1);

  /// Ease-in variant for exit animations.
  static const curveIn = Curves.easeIn;

  /// Ease-in-out variant for state changes.
  static const curveInOut = Curves.easeInOut;
}
