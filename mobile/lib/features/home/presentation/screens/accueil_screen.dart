/// Home / Accueil screen — the first tab the user sees.
///
/// Displays a greeting, the current phase progress, upcoming event countdown,
/// active match card, latest coach message, and pending actions. Supports
/// pull-to-refresh for all data.
library;

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:intl/intl.dart';
import 'package:shimmer/shimmer.dart';

import 'package:my_muqabala/core/constants/app_colors.dart';
import 'package:my_muqabala/core/constants/app_spacing.dart';
import 'package:my_muqabala/core/constants/app_typography.dart';
import 'package:my_muqabala/core/router/route_names.dart';
import 'package:my_muqabala/core/utils/greeting_utils.dart';
import 'package:my_muqabala/core/widgets/staggered_list.dart';
import 'package:my_muqabala/features/home/presentation/providers/home_provider.dart';
import 'package:my_muqabala/features/home/presentation/widgets/coach_message_widget.dart';
import 'package:my_muqabala/features/home/presentation/widgets/event_countdown.dart';
import 'package:my_muqabala/features/home/presentation/widgets/match_card_widget.dart';
import 'package:my_muqabala/features/home/presentation/widgets/pending_actions_widget.dart';
import 'package:my_muqabala/features/home/presentation/widgets/phase_indicator.dart';

/// The Accueil (Home) screen displayed in the first bottom navigation tab.
class AccueilScreen extends ConsumerWidget {
  const AccueilScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final prenomAsync = ref.watch(userPrenomProvider);
    final unreadCountAsync = ref.watch(unreadNotificationCountProvider);

    return Scaffold(
      backgroundColor: isDark ? AppColors.darkBg : AppColors.paper,
      appBar: AppBar(
        backgroundColor: isDark ? AppColors.darkBg : AppColors.paper,
        elevation: 0,
        scrolledUnderElevation: 0,
        title: const Text('My Muqabala'),
        actions: [
          // ── Notification bell with badge ──────────────────────────────
          Padding(
            padding: const EdgeInsets.only(right: AppSpacing.sm),
            child: unreadCountAsync.when(
              data: (count) => _NotificationBell(count: count),
              loading: () => const _NotificationBell(count: 0),
              error: (_, __) => const _NotificationBell(count: 0),
            ),
          ),
        ],
      ),
      body: RefreshIndicator(
        color: AppColors.purple,
        backgroundColor: isDark ? AppColors.darkCard : Colors.white,
        onRefresh: () async {
          refreshAllHomeData(ref);
          // Wait a small delay for providers to start refreshing
          await Future<void>.delayed(const Duration(milliseconds: 500));
        },
        child: ListView(
          padding: EdgeInsets.only(
            left: AppSpacing.md,
            right: AppSpacing.md,
            top: AppSpacing.lg,
            bottom: AppSpacing.lg,
          ),
          physics: const AlwaysScrollableScrollPhysics(),
          children: [
            // ── Greeting ──────────────────────────────────────────────
            StaggeredListItem(
              index: 0,
              child: _GreetingSection(prenomAsync: prenomAsync),
            ),
            AppSpacing.gapLg,

            // ── Phase Progress ─────────────────────────────────────────
            StaggeredListItem(
              index: 1,
              child: const PhaseIndicator(),
            ),
            AppSpacing.gapMd,

            // ── Event Countdown ────────────────────────────────────────
            StaggeredListItem(
              index: 2,
              child: const EventCountdown(),
            ),
            AppSpacing.gapMd,

            // ── Active Match ───────────────────────────────────────────
            StaggeredListItem(
              index: 3,
              child: const MatchCardWidget(),
            ),
            AppSpacing.gapMd,

            // ── Coach Message ──────────────────────────────────────────
            StaggeredListItem(
              index: 4,
              child: const CoachMessageWidget(),
            ),
            AppSpacing.gapMd,

            // ── Pending Actions ────────────────────────────────────────
            StaggeredListItem(
              index: 5,
              child: const PendingActionsWidget(),
            ),
            AppSpacing.gapXl,
          ],
        ),
      ),
    );
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// Greeting Section
// ═══════════════════════════════════════════════════════════════════════════

class _GreetingSection extends StatelessWidget {
  const _GreetingSection({required this.prenomAsync});

  final AsyncValue<String> prenomAsync;

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final today = DateFormat("EEEE d MMMM yyyy", 'fr_FR').format(DateTime.now());

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // Greeting
        prenomAsync.when(
          data: (prenom) => Text(
            '${GreetingUtils.greeting(DateTime.now())}${prenom.isNotEmpty ? ' $prenom' : ''}',
            style: AppTypography.displayLarge.copyWith(
              color: isDark ? AppColors.darkInk : AppColors.ink,
              height: 1.2,
            ),
          ),
          loading: () => Shimmer.fromColors(
            baseColor: isDark ? AppColors.darkCard : AppColors.divider,
            highlightColor: isDark ? AppColors.darkBorder : AppColors.paper,
            child: Container(
              width: 280,
              height: 36,
              decoration: BoxDecoration(
                color: isDark ? AppColors.darkCard : AppColors.divider,
                borderRadius: AppRadius.borderSm,
              ),
            ),
          ),
          error: (_, __) => Text(
            'As-salamu alaykum',
            style: AppTypography.displayLarge.copyWith(
              color: isDark ? AppColors.darkInk : AppColors.ink,
              height: 1.2,
            ),
          ),
        ),
        AppSpacing.gapXs,

        // Date subtitle
        Text(
          today,
          style: AppTypography.bodyMedium.copyWith(
            color: isDark ? AppColors.darkInkMuted : AppColors.inkMuted,
          ),
        ),
      ],
    );
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// Notification Bell
// ═══════════════════════════════════════════════════════════════════════════

class _NotificationBell extends StatefulWidget {
  const _NotificationBell({required this.count});

  final int count;

  @override
  State<_NotificationBell> createState() => _NotificationBellState();
}

class _NotificationBellState extends State<_NotificationBell>
    with SingleTickerProviderStateMixin {
  late final AnimationController _shakeController;
  late final Animation<double> _shakeAnimation;

  @override
  void initState() {
    super.initState();
    _shakeController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 600),
    );
    _shakeAnimation = TweenSequence<double>([
      TweenSequenceItem(tween: Tween(begin: 0, end: 0.15), weight: 1),
      TweenSequenceItem(tween: Tween(begin: 0.15, end: -0.15), weight: 1),
      TweenSequenceItem(tween: Tween(begin: -0.15, end: 0.08), weight: 1),
      TweenSequenceItem(tween: Tween(begin: 0.08, end: 0), weight: 1),
    ]).animate(CurvedAnimation(
      parent: _shakeController,
      curve: Curves.easeInOut,
    ));

    if (widget.count > 0) {
      _shakeController.forward();
    }
  }

  @override
  void didUpdateWidget(covariant _NotificationBell oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.count == 0 && widget.count > 0) {
      _shakeController.forward(from: 0);
    }
  }

  @override
  void dispose() {
    _shakeController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _shakeAnimation,
      builder: (context, child) {
        return Transform.rotate(
          angle: _shakeAnimation.value,
          child: child,
        );
      },
      child: IconButton(
        onPressed: () {
          context.pushNamed(RouteNames.notifications);
        },
        icon: Badge(
          isLabelVisible: widget.count > 0,
          label: Text(
            widget.count > 99 ? '99+' : widget.count.toString(),
            style: const TextStyle(
              fontFamily: 'Outfit',
              fontSize: 10,
              fontWeight: FontWeight.w600,
              color: Colors.white,
            ),
          ),
          backgroundColor: AppColors.rose,
          child: const Icon(
            Icons.notifications_outlined,
            size: 26,
          ),
        ),
      ),
    );
  }
}
