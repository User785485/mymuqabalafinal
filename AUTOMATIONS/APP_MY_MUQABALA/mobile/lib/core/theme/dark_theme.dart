import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import '../constants/app_colors.dart';
import '../constants/app_spacing.dart';
import '../constants/app_typography.dart';

/// Material 3 **dark** theme for MyMuqabala.
///
/// Mirrors every component theme from [AppTheme.light] but uses the
/// `AppColors.dark*` palette. Background=#0F0F1A, cards=#1A1A2E,
/// text=#F5F5F5.
///
/// Usage:
/// ```dart
/// MaterialApp(
///   theme: AppTheme.light,
///   darkTheme: DarkTheme.dark,
///   ...
/// );
/// ```
abstract final class DarkTheme {
  // ── Color Scheme ──────────────────────────────────────────────────────
  static final _colorScheme = ColorScheme.fromSeed(
    seedColor: AppColors.violet,
    brightness: Brightness.dark,
    primary: AppColors.violetVivid,
    onPrimary: Colors.white,
    primaryContainer: AppColors.violetDeep,
    onPrimaryContainer: AppColors.violetLight,
    secondary: AppColors.rose,
    onSecondary: Colors.white,
    secondaryContainer: AppColors.roseDeep,
    onSecondaryContainer: AppColors.roseLight,
    tertiary: AppColors.sage,
    onTertiary: Colors.white,
    tertiaryContainer: AppColors.sageDeep,
    onTertiaryContainer: AppColors.sageLight,
    error: AppColors.error,
    onError: Colors.white,
    errorContainer: const Color(0xFF7F1D1D),
    onErrorContainer: const Color(0xFFFECACA),
    surface: AppColors.darkSurface,
    onSurface: AppColors.darkInk,
    onSurfaceVariant: AppColors.darkInkSoft,
    outline: AppColors.darkBorder,
    outlineVariant: const Color(0xFF2D2D4A),
    shadow: AppColors.shadowDark,
    scrim: AppColors.scrimDark,
    inverseSurface: AppColors.paper,
    onInverseSurface: AppColors.ink,
    inversePrimary: AppColors.violetDeep,
    surfaceContainerHighest: AppColors.darkCard,
  );

  // ── Theme Data ────────────────────────────────────────────────────────
  static ThemeData get dark => ThemeData(
        useMaterial3: true,
        colorScheme: _colorScheme,
        scaffoldBackgroundColor: AppColors.darkBg,
        textTheme: AppTypography.darkTextTheme,
        fontFamily: 'Outfit',

        // ── AppBar ──────────────────────────────────────────────────────
        appBarTheme: const AppBarTheme(
          backgroundColor: AppColors.darkSurface,
          elevation: 0,
          scrolledUnderElevation: 1,
          centerTitle: true,
          surfaceTintColor: Colors.transparent,
          systemOverlayStyle: SystemUiOverlayStyle(
            statusBarBrightness: Brightness.dark,
            statusBarIconBrightness: Brightness.light,
            statusBarColor: Colors.transparent,
          ),
          titleTextStyle: TextStyle(
            fontFamily: 'Cormorant',
            fontSize: 20,
            fontWeight: FontWeight.w600,
            color: AppColors.darkInk,
          ),
          iconTheme: IconThemeData(color: AppColors.darkInk, size: 24),
        ),

        // ── Card ────────────────────────────────────────────────────────
        cardTheme: const CardThemeData(
          color: AppColors.darkCard,
          elevation: 0,
          shadowColor: Color(0x40000000),
          shape: RoundedRectangleBorder(
            borderRadius: AppRadius.borderMd,
            side: BorderSide(color: AppColors.darkBorder, width: 1),
          ),
          margin: EdgeInsets.zero,
        ),

        // ── Elevated Button ─────────────────────────────────────────────
        elevatedButtonTheme: ElevatedButtonThemeData(
          style: ElevatedButton.styleFrom(
            foregroundColor: Colors.white,
            backgroundColor: AppColors.violetVivid,
            disabledForegroundColor: AppColors.darkInkMuted,
            disabledBackgroundColor: AppColors.darkCard,
            elevation: 2,
            shadowColor: const Color(0x407C3AED), // violet vivid shadow
            padding: const EdgeInsets.symmetric(
              horizontal: AppSpacing.lg,
              vertical: 14,
            ),
            minimumSize: const Size(double.infinity, 52),
            shape: const RoundedRectangleBorder(
              borderRadius: AppRadius.borderMd,
            ),
            textStyle: const TextStyle(
              fontFamily: 'Outfit',
              fontSize: 16,
              fontWeight: FontWeight.w600,
              letterSpacing: 0.3,
            ),
          ),
        ),

        // ── Outlined Button ─────────────────────────────────────────────
        outlinedButtonTheme: OutlinedButtonThemeData(
          style: OutlinedButton.styleFrom(
            foregroundColor: AppColors.violetLight,
            elevation: 0,
            padding: const EdgeInsets.symmetric(
              horizontal: AppSpacing.lg,
              vertical: 14,
            ),
            minimumSize: const Size(double.infinity, 52),
            shape: const RoundedRectangleBorder(
              borderRadius: AppRadius.borderMd,
            ),
            side: const BorderSide(
              color: AppColors.violetVivid,
              width: 1.5,
            ),
            textStyle: const TextStyle(
              fontFamily: 'Outfit',
              fontSize: 16,
              fontWeight: FontWeight.w600,
              letterSpacing: 0.3,
            ),
          ),
        ),

        // ── Text Button ────────────────────────────────────────────────
        textButtonTheme: TextButtonThemeData(
          style: TextButton.styleFrom(
            foregroundColor: AppColors.violetLight,
            textStyle: const TextStyle(
              fontFamily: 'Outfit',
              fontSize: 14,
              fontWeight: FontWeight.w600,
            ),
            padding: const EdgeInsets.symmetric(
              horizontal: AppSpacing.md,
              vertical: AppSpacing.sm,
            ),
            shape: const RoundedRectangleBorder(
              borderRadius: AppRadius.borderMd,
            ),
          ),
        ),

        // ── Input Decoration ───────────────────────────────────────────
        inputDecorationTheme: InputDecorationTheme(
          filled: true,
          fillColor: AppColors.darkSurface,
          contentPadding: const EdgeInsets.symmetric(
            horizontal: AppSpacing.md,
            vertical: 14,
          ),
          hintStyle: AppTypography.bodyMedium.copyWith(
            color: AppColors.darkInkMuted,
          ),
          labelStyle: AppTypography.labelMedium.copyWith(
            color: AppColors.darkInkMuted,
          ),
          floatingLabelStyle: AppTypography.labelMedium.copyWith(
            color: AppColors.violetVivid,
          ),
          border: const OutlineInputBorder(
            borderRadius: AppRadius.borderMd,
            borderSide: BorderSide(color: AppColors.darkBorder, width: 1),
          ),
          enabledBorder: const OutlineInputBorder(
            borderRadius: AppRadius.borderMd,
            borderSide: BorderSide(color: AppColors.darkBorder, width: 1),
          ),
          focusedBorder: const OutlineInputBorder(
            borderRadius: AppRadius.borderMd,
            borderSide: BorderSide(
              color: AppColors.violetVivid,
              width: 1.5,
            ),
          ),
          errorBorder: const OutlineInputBorder(
            borderRadius: AppRadius.borderMd,
            borderSide: BorderSide(color: AppColors.error, width: 1),
          ),
          focusedErrorBorder: const OutlineInputBorder(
            borderRadius: AppRadius.borderMd,
            borderSide: BorderSide(color: AppColors.error, width: 1.5),
          ),
          errorStyle: AppTypography.bodySmall.copyWith(
            color: AppColors.error,
          ),
        ),

        // ── Bottom Navigation Bar ──────────────────────────────────────
        bottomNavigationBarTheme: const BottomNavigationBarThemeData(
          type: BottomNavigationBarType.fixed,
          backgroundColor: AppColors.darkSurface,
          elevation: 0,
          selectedItemColor: AppColors.violetVivid,
          unselectedItemColor: AppColors.darkInkMuted,
          selectedLabelStyle: TextStyle(
            fontFamily: 'Outfit',
            fontSize: 12,
            fontWeight: FontWeight.w600,
          ),
          unselectedLabelStyle: TextStyle(
            fontFamily: 'Outfit',
            fontSize: 12,
            fontWeight: FontWeight.w400,
          ),
          showUnselectedLabels: true,
          selectedIconTheme: IconThemeData(size: 24),
          unselectedIconTheme: IconThemeData(size: 24),
        ),

        // ── Navigation Bar (Material 3) ────────────────────────────────
        navigationBarTheme: NavigationBarThemeData(
          backgroundColor: AppColors.darkSurface,
          elevation: 0,
          surfaceTintColor: Colors.transparent,
          indicatorColor: AppColors.violetDeep,
          labelTextStyle: WidgetStateProperty.resolveWith((states) {
            if (states.contains(WidgetState.selected)) {
              return const TextStyle(
                fontFamily: 'Outfit',
                fontSize: 12,
                fontWeight: FontWeight.w600,
                color: AppColors.violetLight,
              );
            }
            return const TextStyle(
              fontFamily: 'Outfit',
              fontSize: 12,
              fontWeight: FontWeight.w400,
              color: AppColors.darkInkMuted,
            );
          }),
          iconTheme: WidgetStateProperty.resolveWith((states) {
            if (states.contains(WidgetState.selected)) {
              return const IconThemeData(
                color: AppColors.violetLight,
                size: 24,
              );
            }
            return const IconThemeData(
              color: AppColors.darkInkMuted,
              size: 24,
            );
          }),
        ),

        // ── Chip ───────────────────────────────────────────────────────
        chipTheme: ChipThemeData(
          backgroundColor: AppColors.darkSurface,
          selectedColor: AppColors.violetDeep,
          disabledColor: AppColors.darkCard,
          labelStyle: AppTypography.labelMedium.copyWith(
            color: AppColors.darkInkSoft,
          ),
          secondaryLabelStyle: AppTypography.labelMedium.copyWith(
            color: AppColors.violetLight,
          ),
          side: const BorderSide(color: AppColors.darkBorder, width: 1),
          shape: const RoundedRectangleBorder(
            borderRadius: AppRadius.borderSm,
          ),
          padding: const EdgeInsets.symmetric(
            horizontal: AppSpacing.sm,
            vertical: AppSpacing.xs,
          ),
        ),

        // ── Dialog ─────────────────────────────────────────────────────
        dialogTheme: DialogThemeData(
          backgroundColor: AppColors.darkCard,
          elevation: 8,
          shadowColor: const Color(0x40000000),
          shape: const RoundedRectangleBorder(
            borderRadius: AppRadius.borderXl,
          ),
          titleTextStyle:
              AppTypography.h3.copyWith(color: AppColors.darkInk),
          contentTextStyle:
              AppTypography.bodyMedium.copyWith(color: AppColors.darkInkSoft),
        ),

        // ── Bottom Sheet ───────────────────────────────────────────────
        bottomSheetTheme: const BottomSheetThemeData(
          backgroundColor: AppColors.darkCard,
          elevation: 0,
          shape: RoundedRectangleBorder(
            borderRadius: AppRadius.borderTopXl,
          ),
          dragHandleColor: AppColors.darkBorderStrong,
          dragHandleSize: Size(40, 4),
          showDragHandle: true,
        ),

        // ── Floating Action Button ─────────────────────────────────────
        floatingActionButtonTheme: const FloatingActionButtonThemeData(
          backgroundColor: AppColors.violetVivid,
          foregroundColor: Colors.white,
          elevation: 4,
          focusElevation: 6,
          hoverElevation: 8,
          shape: CircleBorder(),
        ),

        // ── Divider ───────────────────────────────────────────────────
        dividerTheme: const DividerThemeData(
          color: AppColors.darkBorder,
          thickness: 1,
          space: 1,
        ),

        // ── Snackbar ──────────────────────────────────────────────────
        snackBarTheme: SnackBarThemeData(
          backgroundColor: AppColors.darkCard,
          contentTextStyle: AppTypography.bodyMedium.copyWith(
            color: AppColors.darkInk,
          ),
          shape: const RoundedRectangleBorder(
            borderRadius: AppRadius.borderMd,
          ),
          behavior: SnackBarBehavior.floating,
          elevation: 4,
        ),

        // ── Switch ────────────────────────────────────────────────────
        switchTheme: SwitchThemeData(
          thumbColor: WidgetStateProperty.resolveWith((states) {
            if (states.contains(WidgetState.selected)) {
              return AppColors.violetVivid;
            }
            return AppColors.darkInkMuted;
          }),
          trackColor: WidgetStateProperty.resolveWith((states) {
            if (states.contains(WidgetState.selected)) {
              return AppColors.violetDeep;
            }
            return AppColors.darkBorder;
          }),
        ),

        // ── Checkbox ──────────────────────────────────────────────────
        checkboxTheme: CheckboxThemeData(
          fillColor: WidgetStateProperty.resolveWith((states) {
            if (states.contains(WidgetState.selected)) {
              return AppColors.violetVivid;
            }
            return Colors.transparent;
          }),
          checkColor: WidgetStateProperty.all(Colors.white),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(4),
          ),
          side: const BorderSide(
            color: AppColors.darkBorderStrong,
            width: 1.5,
          ),
        ),

        // ── Radio ─────────────────────────────────────────────────────
        radioTheme: RadioThemeData(
          fillColor: WidgetStateProperty.resolveWith((states) {
            if (states.contains(WidgetState.selected)) {
              return AppColors.violetVivid;
            }
            return AppColors.darkInkMuted;
          }),
        ),

        // ── Tab Bar ───────────────────────────────────────────────────
        tabBarTheme: TabBarThemeData(
          labelColor: AppColors.violetLight,
          unselectedLabelColor: AppColors.darkInkMuted,
          labelStyle: AppTypography.label.copyWith(
            color: AppColors.violetLight,
          ),
          unselectedLabelStyle: AppTypography.labelMedium.copyWith(
            color: AppColors.darkInkMuted,
          ),
          indicator: const UnderlineTabIndicator(
            borderSide: BorderSide(
              color: AppColors.violetVivid,
              width: 2,
            ),
          ),
          indicatorSize: TabBarIndicatorSize.label,
          overlayColor: WidgetStateProperty.all(
            AppColors.violetVivid.withValues(alpha: 0.12),
          ),
        ),

        // ── Progress Indicator ────────────────────────────────────────
        progressIndicatorTheme: const ProgressIndicatorThemeData(
          color: AppColors.violetVivid,
          linearTrackColor: AppColors.violetDeep,
          circularTrackColor: AppColors.violetDeep,
        ),

        // ── Slider ────────────────────────────────────────────────────
        sliderTheme: SliderThemeData(
          activeTrackColor: AppColors.violetVivid,
          inactiveTrackColor: AppColors.violetDeep,
          thumbColor: AppColors.violetVivid,
          overlayColor: AppColors.violetVivid.withValues(alpha: 0.16),
          valueIndicatorColor: AppColors.violetVivid,
          valueIndicatorTextStyle: AppTypography.labelMedium.copyWith(
            color: Colors.white,
          ),
        ),

        // ── Tooltip ───────────────────────────────────────────────────
        tooltipTheme: TooltipThemeData(
          decoration: BoxDecoration(
            color: AppColors.darkInk,
            borderRadius: AppRadius.borderSm,
          ),
          textStyle: AppTypography.bodySmall.copyWith(
            color: AppColors.darkBg,
          ),
          padding: const EdgeInsets.symmetric(
            horizontal: AppSpacing.sm,
            vertical: AppSpacing.xs,
          ),
        ),

        // ── ListTile ──────────────────────────────────────────────────
        listTileTheme: const ListTileThemeData(
          contentPadding: EdgeInsets.symmetric(
            horizontal: AppSpacing.md,
            vertical: AppSpacing.xs,
          ),
          minVerticalPadding: AppSpacing.sm,
          shape: RoundedRectangleBorder(
            borderRadius: AppRadius.borderMd,
          ),
          iconColor: AppColors.darkInkMuted,
          textColor: AppColors.darkInk,
        ),

        // ── Page Transitions ──────────────────────────────────────────
        pageTransitionsTheme: const PageTransitionsTheme(
          builders: {
            TargetPlatform.android: CupertinoPageTransitionsBuilder(),
            TargetPlatform.iOS: CupertinoPageTransitionsBuilder(),
          },
        ),

        // ── Splash / Ink ──────────────────────────────────────────────
        splashFactory: InkSparkle.splashFactory,
        splashColor: AppColors.violetVivid.withValues(alpha: 0.12),
        highlightColor: AppColors.violetVivid.withValues(alpha: 0.06),
      );
}
