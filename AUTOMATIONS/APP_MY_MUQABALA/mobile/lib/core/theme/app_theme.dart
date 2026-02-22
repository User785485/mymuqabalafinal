import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import '../constants/app_colors.dart';
import '../constants/app_spacing.dart';
import '../constants/app_typography.dart';

/// Material 3 **light** theme for MyMuqabala.
///
/// Every component theme is explicitly configured so the app renders
/// consistently without relying on Material defaults.
///
/// Usage:
/// ```dart
/// MaterialApp(
///   theme: AppTheme.light,
///   darkTheme: DarkTheme.dark,   // from dark_theme.dart
///   ...
/// );
/// ```
abstract final class AppTheme {
  // ── Color Scheme ──────────────────────────────────────────────────────
  static final _colorScheme = ColorScheme.fromSeed(
    seedColor: AppColors.violet,
    brightness: Brightness.light,
    primary: AppColors.violet,
    onPrimary: Colors.white,
    primaryContainer: AppColors.violetLight,
    onPrimaryContainer: AppColors.violetDeep,
    secondary: AppColors.rose,
    onSecondary: Colors.white,
    secondaryContainer: AppColors.roseLight,
    onSecondaryContainer: AppColors.roseDeep,
    tertiary: AppColors.sage,
    onTertiary: Colors.white,
    tertiaryContainer: AppColors.sageLight,
    onTertiaryContainer: AppColors.sageDeep,
    error: AppColors.error,
    onError: Colors.white,
    errorContainer: AppColors.errorLight,
    onErrorContainer: const Color(0xFF991B1B),
    surface: AppColors.surface,
    onSurface: AppColors.ink,
    onSurfaceVariant: AppColors.inkSoft,
    outline: AppColors.border,
    outlineVariant: AppColors.divider,
    shadow: AppColors.shadowLight,
    scrim: AppColors.scrimLight,
    inverseSurface: AppColors.ink,
    onInverseSurface: AppColors.paper,
    inversePrimary: AppColors.violetLight,
    surfaceContainerHighest: AppColors.paper,
  );

  // ── Theme Data ────────────────────────────────────────────────────────
  static ThemeData get light => ThemeData(
        useMaterial3: true,
        colorScheme: _colorScheme,
        scaffoldBackgroundColor: AppColors.paper,
        textTheme: AppTypography.textTheme,
        fontFamily: 'Outfit',

        // ── AppBar ──────────────────────────────────────────────────────
        appBarTheme: const AppBarTheme(
          backgroundColor: Colors.transparent,
          elevation: 0,
          scrolledUnderElevation: 0,
          centerTitle: true,
          systemOverlayStyle: SystemUiOverlayStyle(
            statusBarBrightness: Brightness.light,
            statusBarIconBrightness: Brightness.dark,
            statusBarColor: Colors.transparent,
          ),
          titleTextStyle: TextStyle(
            fontFamily: 'Cormorant',
            fontSize: 20,
            fontWeight: FontWeight.w600,
            color: AppColors.ink,
          ),
          iconTheme: IconThemeData(color: AppColors.ink, size: 24),
        ),

        // ── Card ────────────────────────────────────────────────────────
        cardTheme: CardThemeData(
          color: AppColors.surface,
          elevation: 0,
          shadowColor: const Color(0x0D6B46C1), // violet-tinted shadow
          shape: const RoundedRectangleBorder(
            borderRadius: AppRadius.borderMd,
            side: BorderSide(color: AppColors.divider, width: 1),
          ),
          margin: EdgeInsets.zero,
        ),

        // ── Elevated Button ─────────────────────────────────────────────
        elevatedButtonTheme: ElevatedButtonThemeData(
          style: ElevatedButton.styleFrom(
            foregroundColor: Colors.white,
            backgroundColor: AppColors.violet,
            disabledForegroundColor: AppColors.inkFaint,
            disabledBackgroundColor: AppColors.paper,
            elevation: 2,
            shadowColor: const Color(0x336B46C1), // violet-tinted shadow
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
            foregroundColor: AppColors.violet,
            elevation: 0,
            padding: const EdgeInsets.symmetric(
              horizontal: AppSpacing.lg,
              vertical: 14,
            ),
            minimumSize: const Size(double.infinity, 52),
            shape: const RoundedRectangleBorder(
              borderRadius: AppRadius.borderMd,
            ),
            side: const BorderSide(color: AppColors.violet, width: 1.5),
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
            foregroundColor: AppColors.violet,
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
          fillColor: AppColors.paper,
          contentPadding: const EdgeInsets.symmetric(
            horizontal: AppSpacing.md,
            vertical: 14,
          ),
          hintStyle: AppTypography.bodyMedium.copyWith(
            color: AppColors.inkFaint,
          ),
          labelStyle: AppTypography.labelMedium.copyWith(
            color: AppColors.inkMuted,
          ),
          floatingLabelStyle: AppTypography.labelMedium.copyWith(
            color: AppColors.violet,
          ),
          border: const OutlineInputBorder(
            borderRadius: AppRadius.borderMd,
            borderSide: BorderSide(color: AppColors.border, width: 1),
          ),
          enabledBorder: const OutlineInputBorder(
            borderRadius: AppRadius.borderMd,
            borderSide: BorderSide(color: AppColors.border, width: 1),
          ),
          focusedBorder: const OutlineInputBorder(
            borderRadius: AppRadius.borderMd,
            borderSide: BorderSide(color: AppColors.violet, width: 1.5),
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
          backgroundColor: AppColors.surface,
          elevation: 8,
          selectedItemColor: AppColors.violet,
          unselectedItemColor: AppColors.inkMuted,
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
          backgroundColor: AppColors.surface,
          elevation: 0,
          surfaceTintColor: Colors.transparent,
          indicatorColor: AppColors.violetLight,
          labelTextStyle: WidgetStateProperty.resolveWith((states) {
            if (states.contains(WidgetState.selected)) {
              return const TextStyle(
                fontFamily: 'Outfit',
                fontSize: 12,
                fontWeight: FontWeight.w600,
                color: AppColors.violet,
              );
            }
            return const TextStyle(
              fontFamily: 'Outfit',
              fontSize: 12,
              fontWeight: FontWeight.w400,
              color: AppColors.inkMuted,
            );
          }),
          iconTheme: WidgetStateProperty.resolveWith((states) {
            if (states.contains(WidgetState.selected)) {
              return const IconThemeData(
                color: AppColors.violet,
                size: 24,
              );
            }
            return const IconThemeData(
              color: AppColors.inkMuted,
              size: 24,
            );
          }),
        ),

        // ── Chip ───────────────────────────────────────────────────────
        chipTheme: ChipThemeData(
          backgroundColor: AppColors.paper,
          selectedColor: AppColors.violetLight,
          disabledColor: AppColors.paper,
          labelStyle: AppTypography.labelMedium,
          secondaryLabelStyle: AppTypography.labelMedium.copyWith(
            color: AppColors.violet,
          ),
          side: const BorderSide(color: AppColors.border, width: 1),
          shape: const RoundedRectangleBorder(
            borderRadius: AppRadius.borderSm,
          ),
          padding: const EdgeInsets.symmetric(
            horizontal: AppSpacing.sm,
            vertical: AppSpacing.xs,
          ),
        ),

        // ── Dialog ─────────────────────────────────────────────────────
        dialogTheme: const DialogThemeData(
          backgroundColor: AppColors.surface,
          elevation: 4,
          shadowColor: Color(0x1A6B46C1), // violet-tinted shadow
          shape: RoundedRectangleBorder(
            borderRadius: AppRadius.borderXl,
          ),
          titleTextStyle: AppTypography.h3,
          contentTextStyle: AppTypography.bodyMedium,
        ),

        // ── Bottom Sheet ───────────────────────────────────────────────
        bottomSheetTheme: const BottomSheetThemeData(
          backgroundColor: AppColors.surface,
          elevation: 0,
          shape: RoundedRectangleBorder(
            borderRadius: AppRadius.borderTopXl,
          ),
          dragHandleColor: AppColors.border,
          dragHandleSize: Size(40, 4),
          showDragHandle: true,
        ),

        // ── Floating Action Button ─────────────────────────────────────
        floatingActionButtonTheme: const FloatingActionButtonThemeData(
          backgroundColor: AppColors.violet,
          foregroundColor: Colors.white,
          elevation: 4,
          focusElevation: 6,
          hoverElevation: 8,
          shape: CircleBorder(),
        ),

        // ── Divider ───────────────────────────────────────────────────
        dividerTheme: const DividerThemeData(
          color: AppColors.divider,
          thickness: 1,
          space: 1,
        ),

        // ── Snackbar ──────────────────────────────────────────────────
        snackBarTheme: SnackBarThemeData(
          backgroundColor: AppColors.ink,
          contentTextStyle: AppTypography.bodyMedium.copyWith(
            color: Colors.white,
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
              return AppColors.violet;
            }
            return AppColors.inkFaint;
          }),
          trackColor: WidgetStateProperty.resolveWith((states) {
            if (states.contains(WidgetState.selected)) {
              return AppColors.violetLight;
            }
            return AppColors.border;
          }),
        ),

        // ── Checkbox ──────────────────────────────────────────────────
        checkboxTheme: CheckboxThemeData(
          fillColor: WidgetStateProperty.resolveWith((states) {
            if (states.contains(WidgetState.selected)) {
              return AppColors.violet;
            }
            return Colors.transparent;
          }),
          checkColor: WidgetStateProperty.all(Colors.white),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(4),
          ),
          side: const BorderSide(color: AppColors.border, width: 1.5),
        ),

        // ── Radio ─────────────────────────────────────────────────────
        radioTheme: RadioThemeData(
          fillColor: WidgetStateProperty.resolveWith((states) {
            if (states.contains(WidgetState.selected)) {
              return AppColors.violet;
            }
            return AppColors.inkMuted;
          }),
        ),

        // ── Tab Bar ───────────────────────────────────────────────────
        tabBarTheme: TabBarThemeData(
          labelColor: AppColors.violet,
          unselectedLabelColor: AppColors.inkMuted,
          labelStyle: AppTypography.label,
          unselectedLabelStyle: AppTypography.labelMedium,
          indicator: const UnderlineTabIndicator(
            borderSide: BorderSide(
              color: AppColors.violet,
              width: 2,
            ),
          ),
          indicatorSize: TabBarIndicatorSize.label,
          overlayColor: WidgetStateProperty.all(
            AppColors.violet.withValues(alpha: 0.08),
          ),
        ),

        // ── Progress Indicator ────────────────────────────────────────
        progressIndicatorTheme: const ProgressIndicatorThemeData(
          color: AppColors.violet,
          linearTrackColor: AppColors.violetLight,
          circularTrackColor: AppColors.violetLight,
        ),

        // ── Slider ────────────────────────────────────────────────────
        sliderTheme: SliderThemeData(
          activeTrackColor: AppColors.violet,
          inactiveTrackColor: AppColors.violetLight,
          thumbColor: AppColors.violet,
          overlayColor: AppColors.violet.withValues(alpha: 0.12),
          valueIndicatorColor: AppColors.violet,
          valueIndicatorTextStyle: AppTypography.labelMedium.copyWith(
            color: Colors.white,
          ),
        ),

        // ── Tooltip ───────────────────────────────────────────────────
        tooltipTheme: TooltipThemeData(
          decoration: BoxDecoration(
            color: AppColors.ink,
            borderRadius: AppRadius.borderSm,
          ),
          textStyle: AppTypography.bodySmall.copyWith(color: Colors.white),
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
          iconColor: AppColors.inkMuted,
          textColor: AppColors.ink,
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
        splashColor: AppColors.violet.withValues(alpha: 0.08),
        highlightColor: AppColors.violet.withValues(alpha: 0.04),
      );
}
