/// Home / Accueil screen — the first tab the user sees.
///
/// Displays a greeting, the current phase progress, upcoming event countdown,
/// active match card, latest coach message, and pending actions. Supports
/// pull-to-refresh for all data.
library;

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:intl/intl.dart';
import 'package:shimmer/shimmer.dart';

import 'package:my_muqabala/core/constants/app_colors.dart';
import 'package:my_muqabala/core/constants/app_spacing.dart';
import 'package:my_muqabala/core/constants/app_typography.dart';
import 'package:my_muqabala/core/widgets/profile_app_bar_action.dart';
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
    final prenomAsync = ref.watch(userPrenomProvider);
    final unreadCountAsync = ref.watch(unreadNotificationCountProvider);

    return Scaffold(
      backgroundColor: AppColors.paper,
      appBar: AppBar(
        backgroundColor: AppColors.paper,
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
          const ProfileAppBarAction(),
        ],
      ),
      body: RefreshIndicator(
        color: AppColors.purple,
        backgroundColor: Colors.white,
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
            bottom: 92 + MediaQuery.of(context).padding.bottom,
          ),
          physics: const AlwaysScrollableScrollPhysics(),
          children: [
            // ── Greeting ──────────────────────────────────────────────
            _GreetingSection(prenomAsync: prenomAsync),
            AppSpacing.gapLg,

            // ── Phase Progress ─────────────────────────────────────────
            const PhaseIndicator(),
            AppSpacing.gapMd,

            // ── Event Countdown ────────────────────────────────────────
            const EventCountdown(),
            AppSpacing.gapMd,

            // ── Active Match ───────────────────────────────────────────
            const MatchCardWidget(),
            AppSpacing.gapMd,

            // ── Coach Message ──────────────────────────────────────────
            const CoachMessageWidget(),
            AppSpacing.gapMd,

            // ── Pending Actions ────────────────────────────────────────
            const PendingActionsWidget(),
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
    final today = DateFormat("EEEE d MMMM yyyy", 'fr_FR').format(DateTime.now());

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // Greeting
        prenomAsync.when(
          data: (prenom) => Text(
            'As-salamu alaykum${prenom.isNotEmpty ? ' $prenom' : ''}',
            style: AppTypography.displayLarge.copyWith(
              color: AppColors.ink,
              height: 1.2,
            ),
          ),
          loading: () => Shimmer.fromColors(
            baseColor: AppColors.divider,
            highlightColor: AppColors.paper,
            child: Container(
              width: 280,
              height: 36,
              decoration: BoxDecoration(
                color: AppColors.divider,
                borderRadius: AppRadius.borderSm,
              ),
            ),
          ),
          error: (_, __) => Text(
            'As-salamu alaykum',
            style: AppTypography.displayLarge.copyWith(
              color: AppColors.ink,
              height: 1.2,
            ),
          ),
        ),
        AppSpacing.gapXs,

        // Date subtitle
        Text(
          today,
          style: AppTypography.bodyMedium.copyWith(
            color: AppColors.inkMuted,
          ),
        ),
      ],
    );
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// Notification Bell
// ═══════════════════════════════════════════════════════════════════════════

class _NotificationBell extends StatelessWidget {
  const _NotificationBell({required this.count});

  final int count;

  @override
  Widget build(BuildContext context) {
    return IconButton(
      onPressed: () {
        // Navigate to notifications screen (to be implemented)
      },
      icon: Badge(
        isLabelVisible: count > 0,
        label: Text(
          count > 99 ? '99+' : count.toString(),
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
    );
  }
}
