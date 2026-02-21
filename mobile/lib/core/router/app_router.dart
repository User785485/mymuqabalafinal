/// Application router built with go_router + Riverpod.
///
/// Features:
///   - StatefulShellRoute with 4 tab branches (preserves state per tab)
///   - Chat as floating action button (push full-screen, no tab)
///   - Profile in AppBar (push full-screen, no tab)
///   - Glassmorphism floating bottom navigation bar
///   - Auth redirect guard (unauthenticated users → /login)
///   - Onboarding redirect (first-launch users → /onboarding)
///   - Custom page transitions (fade for tabs, slide-up for chat modal)
///   - NavigatorObserver hooks for analytics / Sentry
library;

import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import 'package:go_router/go_router.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

import 'package:my_muqabala/core/constants/app_colors.dart';
import 'package:my_muqabala/core/constants/app_spacing.dart';
import 'package:my_muqabala/core/router/route_names.dart';
import 'package:my_muqabala/core/utils/logger.dart';
import 'package:my_muqabala/features/chat/presentation/providers/chat_provider.dart';

// ── Screen imports ──────────────────────────────────────────────────────────
import 'package:my_muqabala/features/auth/presentation/screens/splash_screen.dart';
import 'package:my_muqabala/features/auth/presentation/screens/onboarding_screen.dart';
import 'package:my_muqabala/features/auth/presentation/screens/login_screen.dart';
import 'package:my_muqabala/features/home/presentation/screens/home_screen.dart';
import 'package:my_muqabala/features/chat/presentation/screens/chat_list_screen.dart';
import 'package:my_muqabala/features/chat/presentation/screens/chat_detail_screen.dart';
import 'package:my_muqabala/features/events/presentation/screens/events_screen.dart';
import 'package:my_muqabala/features/events/presentation/screens/event_detail_screen.dart';
import 'package:my_muqabala/features/documents/presentation/screens/document_viewer_screen.dart';
import 'package:my_muqabala/features/mon_espace/presentation/screens/mon_espace_common_screen.dart';
import 'package:my_muqabala/features/mon_espace/presentation/screens/acces_premium_screen.dart';
import 'package:my_muqabala/features/high_ticket/presentation/screens/formulaires_screen.dart';
import 'package:my_muqabala/features/high_ticket/presentation/screens/formulaire_viewer_screen.dart';
import 'package:my_muqabala/features/high_ticket/presentation/screens/cartographie_screen.dart';
import 'package:my_muqabala/features/high_ticket/presentation/screens/cartographie_viewer_screen.dart';
import 'package:my_muqabala/features/high_ticket/presentation/screens/ressources_screen.dart';
import 'package:my_muqabala/features/high_ticket/presentation/screens/ressource_detail_screen.dart';
import 'package:my_muqabala/features/high_ticket/presentation/screens/plan_action_screen.dart';
import 'package:my_muqabala/features/profile/presentation/screens/profile_screen.dart';
import 'package:my_muqabala/features/profile/presentation/screens/edit_profile_screen.dart';
import 'package:my_muqabala/features/profile/data/models/profile_model.dart';
import 'package:my_muqabala/features/notifications/presentation/screens/notifications_screen.dart';
import 'package:my_muqabala/features/matching/presentation/screens/blink_date_screen.dart';
import 'package:my_muqabala/features/matching/presentation/screens/photo_selection_screen.dart';
import 'package:my_muqabala/features/matching/presentation/screens/match_reveal_screen.dart';
import 'package:my_muqabala/features/blink_date/presentation/screens/photo_reveal_screen.dart';
import 'package:my_muqabala/features/blink_date/presentation/screens/match_results_screen.dart';
import 'package:my_muqabala/features/questionnaire/presentation/screens/questionnaire_screen.dart';
import 'package:my_muqabala/features/feedback/presentation/screens/feedback_screen.dart';

// ── Navigator keys (one per branch to preserve state) ───────────────────────
final _rootNavigatorKey = GlobalKey<NavigatorState>(debugLabel: 'root');
final _homeNavigatorKey = GlobalKey<NavigatorState>(debugLabel: 'home');
final _eventsNavigatorKey = GlobalKey<NavigatorState>(debugLabel: 'events');
final _monEspaceNavigatorKey =
    GlobalKey<NavigatorState>(debugLabel: 'mon-espace');
final _accesPremiumNavigatorKey =
    GlobalKey<NavigatorState>(debugLabel: 'acces-premium');

// ── Auth state provider ─────────────────────────────────────────────────────

/// Streams the current Supabase auth state for redirect logic.
/// Gracefully handles the case where Supabase is not yet initialized.
final _authStateProvider = StreamProvider<AuthState>((ref) {
  try {
    return Supabase.instance.client.auth.onAuthStateChange;
  } catch (_) {
    return Stream.value(
      AuthState(AuthChangeEvent.signedOut, null),
    );
  }
});

/// Whether the user has completed the onboarding flow.
/// Persisted via SharedPreferences so onboarding only shows once.
final _onboardingCompleteProvider = FutureProvider<bool>((ref) async {
  final prefs = await SharedPreferences.getInstance();
  return prefs.getBool('onboarding_seen') ?? false;
});

// ── Router provider ─────────────────────────────────────────────────────────

/// The main application router.
///
/// Usage in the root widget:
/// ```dart
/// Consumer(builder: (context, ref, _) {
///   final router = ref.watch(routerProvider);
///   return MaterialApp.router(routerConfig: router);
/// })
/// ```
final routerProvider = Provider<GoRouter>((ref) {
  final refreshNotifier = ValueNotifier<int>(0);

  ref.listen(_authStateProvider, (_, __) {
    refreshNotifier.value++;
  });

  ref.listen(_onboardingCompleteProvider, (_, __) {
    refreshNotifier.value++;
  });

  ref.onDispose(() => refreshNotifier.dispose());

  final router = GoRouter(
    navigatorKey: _rootNavigatorKey,
    debugLogDiagnostics: true,
    initialLocation: '/',
    observers: [_AppNavigatorObserver()],
    refreshListenable: refreshNotifier,

    // ── Redirect logic ────────────────────────────────────────────────────
    redirect: (BuildContext context, GoRouterState state) {
      final authState = ref.read(_authStateProvider);
      final isLoading = authState.isLoading;

      if (isLoading && state.matchedLocation == '/') return null;
      if (isLoading && state.matchedLocation != '/') return null;

      bool isAuthenticated;
      try {
        isAuthenticated =
            Supabase.instance.client.auth.currentSession != null;
      } catch (_) {
        isAuthenticated = false;
      }

      final isOnSplash = state.matchedLocation == '/';
      final isOnAuth = state.matchedLocation == '/login' ||
          state.matchedLocation == '/onboarding';

      final hasCompletedOnboarding = ref.read(_onboardingCompleteProvider).value ?? false;

      if (isOnSplash) {
        if (!isAuthenticated) {
          return hasCompletedOnboarding ? '/login' : '/onboarding';
        }
        return '/home';
      }

      if (!isAuthenticated && !isOnAuth) {
        return '/login';
      }

      if (isAuthenticated && isOnAuth) {
        return '/home';
      }

      return null;
    },

    // ── Routes ────────────────────────────────────────────────────────────
    routes: [
      // Splash
      GoRoute(
        path: '/',
        name: RouteNames.splash,
        parentNavigatorKey: _rootNavigatorKey,
        pageBuilder: (context, state) => _fadeTransitionPage(
          key: state.pageKey,
          child: const SplashScreen(),
        ),
      ),

      // Onboarding
      GoRoute(
        path: '/onboarding',
        name: RouteNames.onboarding,
        parentNavigatorKey: _rootNavigatorKey,
        pageBuilder: (context, state) => _fadeTransitionPage(
          key: state.pageKey,
          child: OnboardingScreen(
            onComplete: () {
              ref.invalidate(_onboardingCompleteProvider);
            },
          ),
        ),
      ),

      // Login
      GoRoute(
        path: '/login',
        name: RouteNames.login,
        parentNavigatorKey: _rootNavigatorKey,
        pageBuilder: (context, state) => _fadeTransitionPage(
          key: state.pageKey,
          child: const LoginScreen(),
        ),
      ),

      // ── Feature screens (full-screen, above tabs) ─────────────────────
      GoRoute(
        path: '/blink-date',
        name: RouteNames.blinkDate,
        parentNavigatorKey: _rootNavigatorKey,
        pageBuilder: (context, state) {
          // Supports both eventId (new flow) and matchId (legacy).
          // extra can be a String (eventId) or Map with keys.
          String? eventId;
          String? matchId;
          if (state.extra is Map<String, String>) {
            final params = state.extra as Map<String, String>;
            eventId = params['eventId'];
            matchId = params['matchId'];
          } else if (state.extra is String) {
            eventId = state.extra as String;
          }
          return _slideTransitionPage(
            key: state.pageKey,
            child: BlinkDateScreen(eventId: eventId, matchId: matchId),
          );
        },
      ),

      GoRoute(
        path: '/photo-selection',
        name: RouteNames.photoSelection,
        parentNavigatorKey: _rootNavigatorKey,
        pageBuilder: (context, state) {
          final matchId = state.extra as String?;
          return _slideTransitionPage(
            key: state.pageKey,
            child: PhotoSelectionScreen(matchId: matchId),
          );
        },
      ),

      GoRoute(
        path: '/match-reveal',
        name: RouteNames.matchReveal,
        parentNavigatorKey: _rootNavigatorKey,
        pageBuilder: (context, state) {
          final matchId = state.extra as String? ?? '';
          return _fadeTransitionPage(
            key: state.pageKey,
            child: MatchRevealScreen(matchId: matchId),
          );
        },
      ),

      GoRoute(
        path: '/photo-reveal',
        name: RouteNames.photoReveal,
        parentNavigatorKey: _rootNavigatorKey,
        pageBuilder: (context, state) {
          final eventId = state.extra as String? ?? '';
          return _slideTransitionPage(
            key: state.pageKey,
            child: PhotoRevealScreen(eventId: eventId),
          );
        },
      ),

      GoRoute(
        path: '/match-results',
        name: RouteNames.matchResults,
        parentNavigatorKey: _rootNavigatorKey,
        pageBuilder: (context, state) {
          final eventId = state.extra as String? ?? '';
          return _fadeTransitionPage(
            key: state.pageKey,
            child: MatchResultsScreen(eventId: eventId),
          );
        },
      ),

      GoRoute(
        path: '/questionnaire',
        name: RouteNames.questionnaire,
        parentNavigatorKey: _rootNavigatorKey,
        pageBuilder: (context, state) => _slideTransitionPage(
          key: state.pageKey,
          child: const QuestionnaireScreen(),
        ),
      ),

      GoRoute(
        path: '/notifications',
        name: RouteNames.notifications,
        parentNavigatorKey: _rootNavigatorKey,
        pageBuilder: (context, state) => _slideTransitionPage(
          key: state.pageKey,
          child: const NotificationsScreen(),
        ),
      ),

      GoRoute(
        path: '/feedback',
        name: RouteNames.feedback,
        parentNavigatorKey: _rootNavigatorKey,
        pageBuilder: (context, state) {
          final params = state.extra as Map<String, String>? ?? {};
          final formType = params['formType'] ?? 'post_blink_date';
          final referenceId = params['referenceId'];
          return _slideTransitionPage(
            key: state.pageKey,
            child: FeedbackScreen(
              formType: formType,
              referenceId: referenceId,
            ),
          );
        },
      ),

      // ── Chat detail: full-screen (no bottom nav) ──────────────────────
      GoRoute(
        path: '/conversation/:channelId',
        name: RouteNames.chatDetail,
        parentNavigatorKey: _rootNavigatorKey,
        pageBuilder: (context, state) {
          final channelId = state.pathParameters['channelId']!;
          return _slideTransitionPage(
            key: state.pageKey,
            child: ChatDetailScreen(channelId: channelId),
          );
        },
      ),

      // ── Chat list: full-screen push (slide-up from FAB) ──────────────
      GoRoute(
        path: '/chat',
        name: RouteNames.chat,
        parentNavigatorKey: _rootNavigatorKey,
        pageBuilder: (context, state) => _slideUpTransitionPage(
          key: state.pageKey,
          child: const ChatListScreen(),
        ),
      ),

      // ── Profile: full-screen push (slide-right from AppBar) ──────────
      GoRoute(
        path: '/profile',
        name: RouteNames.profile,
        parentNavigatorKey: _rootNavigatorKey,
        pageBuilder: (context, state) => _slideTransitionPage(
          key: state.pageKey,
          child: const ProfileScreen(),
        ),
        routes: [
          GoRoute(
            path: 'edit',
            name: RouteNames.editProfile,
            parentNavigatorKey: _rootNavigatorKey,
            pageBuilder: (context, state) {
              final profile = state.extra as ProfileModel;
              return _slideTransitionPage(
                key: state.pageKey,
                child: EditProfileScreen(profile: profile),
              );
            },
          ),
        ],
      ),

      // ── Main app: 4-tab StatefulShellRoute ────────────────────────────
      StatefulShellRoute.indexedStack(
        parentNavigatorKey: _rootNavigatorKey,
        builder: (context, state, navigationShell) {
          return _ScaffoldWithNavBar(navigationShell: navigationShell);
        },
        branches: [
          // ── Tab 0: Accueil ──────────────────────────────────────────
          StatefulShellBranch(
            navigatorKey: _homeNavigatorKey,
            routes: [
              GoRoute(
                path: '/home',
                name: RouteNames.home,
                pageBuilder: (context, state) => _fadeTransitionPage(
                  key: state.pageKey,
                  child: const HomeScreen(),
                ),
              ),
            ],
          ),

          // ── Tab 1: Rencontres (was Événements) ────────────────────
          StatefulShellBranch(
            navigatorKey: _eventsNavigatorKey,
            routes: [
              GoRoute(
                path: '/events',
                name: RouteNames.events,
                pageBuilder: (context, state) => _fadeTransitionPage(
                  key: state.pageKey,
                  child: const EventsScreen(),
                ),
                routes: [
                  GoRoute(
                    path: ':eventId',
                    name: RouteNames.eventDetail,
                    pageBuilder: (context, state) {
                      final eventId =
                          state.pathParameters['eventId'] ?? '';
                      return _slideTransitionPage(
                        key: state.pageKey,
                        child: EventDetailScreen(eventId: eventId),
                      );
                    },
                  ),
                ],
              ),
            ],
          ),

          // ── Tab 2: Mon Espace (common, all clients) ───────────────
          StatefulShellBranch(
            navigatorKey: _monEspaceNavigatorKey,
            routes: [
              GoRoute(
                path: '/mon-espace',
                name: RouteNames.monEspace,
                pageBuilder: (context, state) => _fadeTransitionPage(
                  key: state.pageKey,
                  child: const MonEspaceCommonScreen(),
                ),
              ),
            ],
          ),

          // ── Tab 3: Accès Premium ──────────────────────────────────
          StatefulShellBranch(
            navigatorKey: _accesPremiumNavigatorKey,
            routes: [
              GoRoute(
                path: '/acces-premium',
                name: RouteNames.accesPremium,
                pageBuilder: (context, state) => _fadeTransitionPage(
                  key: state.pageKey,
                  child: const AccesPremiumScreen(),
                ),
                routes: [
                  GoRoute(
                    path: 'document/:documentId',
                    name: RouteNames.documentViewer,
                    pageBuilder: (context, state) {
                      final documentId =
                          state.pathParameters['documentId'] ?? '';
                      return _slideTransitionPage(
                        key: state.pageKey,
                        child: DocumentViewerScreen(
                          documentId: documentId,
                        ),
                      );
                    },
                  ),
                  GoRoute(
                    path: 'formulaires',
                    name: RouteNames.formulaires,
                    pageBuilder: (context, state) =>
                        _slideTransitionPage(
                      key: state.pageKey,
                      child: const FormulairesScreen(),
                    ),
                  ),
                  GoRoute(
                    path: 'formulaire/:formId',
                    name: RouteNames.formulaireDetail,
                    pageBuilder: (context, state) {
                      final formId =
                          state.pathParameters['formId'] ?? '';
                      return _slideTransitionPage(
                        key: state.pageKey,
                        child:
                            FormulaireViewerScreen(formId: formId),
                      );
                    },
                  ),
                  GoRoute(
                    path: 'cartographie',
                    name: RouteNames.cartographie,
                    pageBuilder: (context, state) =>
                        _slideTransitionPage(
                      key: state.pageKey,
                      child: const CartographieScreen(),
                    ),
                  ),
                  GoRoute(
                    path: 'cartographie/:docId',
                    name: RouteNames.cartographieViewer,
                    pageBuilder: (context, state) {
                      final docId =
                          state.pathParameters['docId'] ?? '';
                      return _slideTransitionPage(
                        key: state.pageKey,
                        child:
                            CartographieViewerScreen(docId: docId),
                      );
                    },
                  ),
                  GoRoute(
                    path: 'ressources',
                    name: RouteNames.ressources,
                    pageBuilder: (context, state) =>
                        _slideTransitionPage(
                      key: state.pageKey,
                      child: const RessourcesScreen(),
                    ),
                  ),
                  GoRoute(
                    path: 'ressource/:weekId',
                    name: RouteNames.ressourceDetail,
                    pageBuilder: (context, state) {
                      final weekId =
                          state.pathParameters['weekId'] ?? '';
                      return _slideTransitionPage(
                        key: state.pageKey,
                        child:
                            RessourceDetailScreen(weekId: weekId),
                      );
                    },
                  ),
                  GoRoute(
                    path: 'plan-action',
                    name: RouteNames.planAction,
                    pageBuilder: (context, state) =>
                        _slideTransitionPage(
                      key: state.pageKey,
                      child: const PlanActionScreen(),
                    ),
                  ),
                ],
              ),
            ],
          ),
        ],
      ),
    ],

    // ── Error page ────────────────────────────────────────────────────────
    errorPageBuilder: (context, state) => MaterialPage(
      key: state.pageKey,
      child: _ErrorScreen(error: state.error),
    ),
  );

  return router;
});

// ══════════════════════════════════════════════════════════════════════════════
// Page transition helpers
// ══════════════════════════════════════════════════════════════════════════════

/// Fade transition used for tab switches and initial screens.
CustomTransitionPage<void> _fadeTransitionPage({
  required LocalKey key,
  required Widget child,
}) {
  return CustomTransitionPage<void>(
    key: key,
    child: child,
    transitionDuration: const Duration(milliseconds: 250),
    reverseTransitionDuration: const Duration(milliseconds: 200),
    transitionsBuilder: (context, animation, secondaryAnimation, child) {
      return FadeTransition(opacity: animation, child: child);
    },
  );
}

/// Slide-from-right transition for push navigation.
CustomTransitionPage<void> _slideTransitionPage({
  required LocalKey key,
  required Widget child,
}) {
  return CustomTransitionPage<void>(
    key: key,
    child: child,
    transitionDuration: const Duration(milliseconds: 300),
    reverseTransitionDuration: const Duration(milliseconds: 250),
    transitionsBuilder: (context, animation, secondaryAnimation, child) {
      final tween = Tween<Offset>(
        begin: const Offset(1, 0),
        end: Offset.zero,
      ).chain(CurveTween(curve: Curves.easeOutCubic));

      return SlideTransition(
        position: animation.drive(tween),
        child: child,
      );
    },
  );
}

/// Slide-from-bottom transition for the chat FAB (modal feel).
CustomTransitionPage<void> _slideUpTransitionPage({
  required LocalKey key,
  required Widget child,
}) {
  return CustomTransitionPage<void>(
    key: key,
    child: child,
    transitionDuration: const Duration(milliseconds: 350),
    reverseTransitionDuration: const Duration(milliseconds: 300),
    transitionsBuilder: (context, animation, secondaryAnimation, child) {
      final tween = Tween<Offset>(
        begin: const Offset(0, 1),
        end: Offset.zero,
      ).chain(CurveTween(curve: Curves.easeOutCubic));

      return SlideTransition(
        position: animation.drive(tween),
        child: child,
      );
    },
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// Scaffold with floating nav bar + chat FAB
// ══════════════════════════════════════════════════════════════════════════════

/// Height of the floating navigation bar.
const _kNavBarHeight = 68.0;

class _ScaffoldWithNavBar extends ConsumerWidget {
  const _ScaffoldWithNavBar({required this.navigationShell});

  final StatefulNavigationShell navigationShell;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final bottomPadding = MediaQuery.of(context).padding.bottom;

    return Scaffold(
      extendBody: true,
      body: Stack(
        children: [
          // Main content
          navigationShell,

          // ── Chat FAB ──────────────────────────────────────────────────
          Positioned(
            right: 16,
            bottom: _kNavBarHeight + bottomPadding + 8 + 24,
            child: const _ChatFab(),
          ),
        ],
      ),
      bottomNavigationBar: _FloatingNavBar(
        currentIndex: navigationShell.currentIndex,
        onTap: (index) {
          HapticFeedback.selectionClick();
          navigationShell.goBranch(
            index,
            initialLocation: index == navigationShell.currentIndex,
          );
        },
      ),
    );
  }
}

// ══════════════════════════════════════════════════════════════════════════════
// Floating glassmorphism navigation bar
// ══════════════════════════════════════════════════════════════════════════════

class _FloatingNavBar extends StatelessWidget {
  const _FloatingNavBar({
    required this.currentIndex,
    required this.onTap,
  });

  final int currentIndex;
  final ValueChanged<int> onTap;

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final bottomPadding = MediaQuery.of(context).padding.bottom;

    return Padding(
      padding: EdgeInsets.only(
        left: 16,
        right: 16,
        bottom: bottomPadding + 8,
      ),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(22),
        child: BackdropFilter(
          filter: ImageFilter.blur(sigmaX: 20, sigmaY: 20),
          child: Container(
            height: _kNavBarHeight,
            decoration: BoxDecoration(
              color: isDark
                  ? AppColors.darkSurface.withValues(alpha: 0.85)
                  : AppColors.surface.withValues(alpha: 0.85),
              borderRadius: BorderRadius.circular(22),
              border: Border.all(
                color: isDark
                    ? AppColors.darkBorder.withValues(alpha: 0.3)
                    : AppColors.divider.withValues(alpha: 0.4),
              ),
              boxShadow: [
                BoxShadow(
                  color: AppColors.shadowLight,
                  blurRadius: 20,
                  offset: const Offset(0, 4),
                ),
                // Subtle violet glow
                BoxShadow(
                  color: AppColors.violet.withValues(alpha: 0.06),
                  blurRadius: 30,
                  spreadRadius: 2,
                ),
              ],
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                _NavItem(
                  icon: Icons.home_outlined,
                  selectedIcon: Icons.home_rounded,
                  label: 'Accueil',
                  isSelected: currentIndex == 0,
                  onTap: () => onTap(0),
                  isDark: isDark,
                ),
                _NavItem(
                  icon: Icons.favorite_outline_rounded,
                  selectedIcon: Icons.favorite_rounded,
                  label: 'Rencontres',
                  isSelected: currentIndex == 1,
                  onTap: () => onTap(1),
                  isDark: isDark,
                ),
                _NavItem(
                  icon: Icons.person_outline_rounded,
                  selectedIcon: Icons.person_rounded,
                  label: 'Mon Espace',
                  isSelected: currentIndex == 2,
                  onTap: () => onTap(2),
                  isDark: isDark,
                ),
                _NavItem(
                  icon: Icons.diamond_outlined,
                  selectedIcon: Icons.diamond_rounded,
                  label: 'Premium',
                  isSelected: currentIndex == 3,
                  onTap: () => onTap(3),
                  isDark: isDark,
                  useGoldGradient: true,
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

// ══════════════════════════════════════════════════════════════════════════════
// Individual nav item
// ══════════════════════════════════════════════════════════════════════════════

class _NavItem extends StatelessWidget {
  const _NavItem({
    required this.icon,
    required this.selectedIcon,
    required this.label,
    required this.isSelected,
    required this.onTap,
    required this.isDark,
    this.useGoldGradient = false,
  });

  final IconData icon;
  final IconData selectedIcon;
  final String label;
  final bool isSelected;
  final VoidCallback onTap;
  final bool isDark;
  final bool useGoldGradient;

  @override
  Widget build(BuildContext context) {
    final activeColor = AppColors.violet;
    final inactiveColor =
        isDark ? AppColors.darkInkMuted : AppColors.inkMuted;

    Widget iconWidget;
    if (useGoldGradient && isSelected) {
      iconWidget = _GoldDiamondIcon(
        icon: selectedIcon,
        size: 24,
      );
    } else {
      iconWidget = Icon(
        isSelected ? selectedIcon : icon,
        size: 24,
        color: isSelected ? activeColor : inactiveColor,
      );
    }

    return GestureDetector(
      onTap: onTap,
      behavior: HitTestBehavior.opaque,
      child: SizedBox(
        width: 72,
        child: Column(
          mainAxisSize: MainAxisSize.min,
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            iconWidget,
            const SizedBox(height: 4),
            Text(
              label,
              style: TextStyle(
                fontFamily: 'Outfit',
                fontSize: 10,
                fontWeight: isSelected ? FontWeight.w600 : FontWeight.w400,
                color: useGoldGradient && isSelected
                    ? AppColors.gold
                    : isSelected
                        ? activeColor
                        : inactiveColor,
              ),
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
            ),
          ],
        ),
      ),
    );
  }
}

// ══════════════════════════════════════════════════════════════════════════════
// Gold diamond icon with gradient shader
// ══════════════════════════════════════════════════════════════════════════════

class _GoldDiamondIcon extends StatelessWidget {
  const _GoldDiamondIcon({
    required this.icon,
    required this.size,
  });

  final IconData icon;
  final double size;

  @override
  Widget build(BuildContext context) {
    return ShaderMask(
      blendMode: BlendMode.srcIn,
      shaderCallback: (bounds) => const LinearGradient(
        colors: [AppColors.gold, AppColors.goldWarm],
        begin: Alignment.topLeft,
        end: Alignment.bottomRight,
      ).createShader(bounds),
      child: Icon(icon, size: size),
    );
  }
}

// ══════════════════════════════════════════════════════════════════════════════
// Chat FAB (WhatsApp-style floating bubble)
// ══════════════════════════════════════════════════════════════════════════════

class _ChatFab extends ConsumerStatefulWidget {
  const _ChatFab();

  @override
  ConsumerState<_ChatFab> createState() => _ChatFabState();
}

class _ChatFabState extends ConsumerState<_ChatFab>
    with SingleTickerProviderStateMixin {
  late final AnimationController _controller;
  late final Animation<double> _scaleAnimation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 200),
    );
    _scaleAnimation = Tween<double>(begin: 1.0, end: 0.9).animate(
      CurvedAnimation(parent: _controller, curve: AppAnimation.curve),
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final unreadAsync = ref.watch(unreadChatStreamProvider);
    final unreadCount = unreadAsync.when(
      data: (count) => count,
      loading: () => 0,
      error: (_, __) => 0,
    );

    return GestureDetector(
      onTapDown: (_) => _controller.forward(),
      onTapUp: (_) {
        _controller.reverse();
        HapticFeedback.mediumImpact();
        context.pushNamed(RouteNames.chat);
      },
      onTapCancel: () => _controller.reverse(),
      child: ScaleTransition(
        scale: _scaleAnimation,
        child: Container(
          width: 56,
          height: 56,
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            gradient: const LinearGradient(
              colors: [AppColors.violet, AppColors.violetVivid],
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
            ),
            boxShadow: [
              BoxShadow(
                color: AppColors.violet.withValues(alpha: 0.35),
                blurRadius: 16,
                offset: const Offset(0, 4),
              ),
            ],
          ),
          child: Badge(
            isLabelVisible: unreadCount > 0,
            label: Text(
              unreadCount > 99 ? '99+' : unreadCount.toString(),
              style: const TextStyle(
                fontFamily: 'Outfit',
                fontSize: 10,
                fontWeight: FontWeight.w600,
                color: Colors.white,
              ),
            ),
            backgroundColor: AppColors.rose,
            child: const Center(
              child: Icon(
                Icons.chat_rounded,
                color: Colors.white,
                size: 26,
              ),
            ),
          ),
        ),
      ),
    );
  }
}

// ══════════════════════════════════════════════════════════════════════════════
// Navigator observer (analytics / Sentry)
// ══════════════════════════════════════════════════════════════════════════════

class _AppNavigatorObserver extends NavigatorObserver {
  @override
  void didPush(Route<dynamic> route, Route<dynamic>? previousRoute) {
    super.didPush(route, previousRoute);
    AppLogger.debug(
      'Nav PUSH: ${previousRoute?.settings.name} \u2192 ${route.settings.name}',
      tag: 'Router',
    );
  }

  @override
  void didPop(Route<dynamic> route, Route<dynamic>? previousRoute) {
    super.didPop(route, previousRoute);
    AppLogger.debug(
      'Nav POP: ${route.settings.name} \u2192 ${previousRoute?.settings.name}',
      tag: 'Router',
    );
  }

  @override
  void didReplace({Route<dynamic>? newRoute, Route<dynamic>? oldRoute}) {
    super.didReplace(newRoute: newRoute, oldRoute: oldRoute);
    AppLogger.debug(
      'Nav REPLACE: ${oldRoute?.settings.name} \u2192 ${newRoute?.settings.name}',
      tag: 'Router',
    );
  }
}

// ══════════════════════════════════════════════════════════════════════════════
// Error screen
// ══════════════════════════════════════════════════════════════════════════════

class _ErrorScreen extends StatelessWidget {
  const _ErrorScreen({this.error});

  final Exception? error;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              const Icon(
                Icons.error_outline_rounded,
                size: 64,
                color: AppColors.rose,
              ),
              const SizedBox(height: 16),
              Text(
                'Page introuvable',
                style: Theme.of(context).textTheme.displaySmall,
              ),
              const SizedBox(height: 8),
              Text(
                error?.toString() ?? 'La page demand\u00e9e n\'existe pas.',
                style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                      color: AppColors.inkMuted,
                    ),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 24),
              FilledButton.icon(
                onPressed: () => context.go('/home'),
                icon: const Icon(Icons.home_rounded),
                label: const Text('Retour \u00e0 l\'accueil'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
