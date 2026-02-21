/// Blink Date screen — the core timed audio matching experience.
///
/// This screen manages a multi-round audio call between two matched
/// participants. Each round lasts a configurable duration (default 10 min)
/// and includes conversation prompts and a countdown timer.
///
/// Flow:
/// 1. Load round data from the server
/// 2. Show pre-call UI with round info and prompts
/// 3. Connect to the audio room and start the timer
/// 4. When time runs out (or user hangs up), show feedback form
/// 5. After feedback, advance to next round or complete
///
/// Requires a [matchId] parameter passed via the router.
library;

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import 'package:my_muqabala/core/constants/app_colors.dart';
import 'package:my_muqabala/core/constants/app_spacing.dart';
import 'package:my_muqabala/core/constants/app_typography.dart';
import 'package:my_muqabala/core/widgets/muqabala_button.dart';
import 'package:my_muqabala/features/blink_date/presentation/providers/blink_date_provider.dart';
import 'package:my_muqabala/features/blink_date/presentation/widgets/audio_controls_widget.dart';
import 'package:my_muqabala/features/blink_date/presentation/widgets/conversation_prompt_card.dart';
import 'package:my_muqabala/features/blink_date/presentation/widgets/countdown_timer_widget.dart';
import 'package:my_muqabala/features/blink_date/presentation/widgets/inline_feedback_widget.dart';

/// The main Blink Date experience screen.
///
/// Accepts an optional [matchId] to load the corresponding rounds.
/// If no [matchId] is provided, shows an error state.
class BlinkDateScreen extends ConsumerStatefulWidget {
  const BlinkDateScreen({
    this.matchId,
    super.key,
  });

  /// The match ID for which to load Blink Date rounds.
  final String? matchId;

  @override
  ConsumerState<BlinkDateScreen> createState() => _BlinkDateScreenState();
}

class _BlinkDateScreenState extends ConsumerState<BlinkDateScreen>
    with TickerProviderStateMixin {
  late final AnimationController _pulseController;
  late final Animation<double> _pulseAnimation;

  @override
  void initState() {
    super.initState();

    // Pulse animation for the "connecting" state indicator.
    _pulseController = AnimationController(
      duration: const Duration(milliseconds: 1200),
      vsync: this,
    )..repeat(reverse: true);

    _pulseAnimation = Tween<double>(begin: 0.8, end: 1.0).animate(
      CurvedAnimation(parent: _pulseController, curve: Curves.easeInOut),
    );

    // Load data after the first frame.
    WidgetsBinding.instance.addPostFrameCallback((_) {
      _loadData();
    });
  }

  @override
  void dispose() {
    _pulseController.dispose();
    super.dispose();
  }

  void _loadData() {
    final matchId = widget.matchId;
    if (matchId != null && matchId.isNotEmpty) {
      ref.read(blinkDateProvider.notifier).loadRoundsForMatch(matchId);
    }
  }

  @override
  Widget build(BuildContext context) {
    final state = ref.watch(blinkDateProvider);
    final notifier = ref.read(blinkDateProvider.notifier);

    // Lock orientation to portrait during the call.
    SystemChrome.setPreferredOrientations([
      DeviceOrientation.portraitUp,
    ]);

    return PopScope(
      canPop: !state.isConnected,
      onPopInvokedWithResult: (didPop, _) {
        if (!didPop && state.isConnected) {
          _showExitConfirmation(context, notifier);
        }
      },
      child: Scaffold(
        backgroundColor: AppColors.paper,
        appBar: _buildAppBar(state),
        body: _buildBody(state, notifier),
      ),
    );
  }

  // ── App Bar ────────────────────────────────────────────────────────────

  PreferredSizeWidget _buildAppBar(BlinkDateState state) {
    return AppBar(
      backgroundColor: AppColors.surface,
      surfaceTintColor: Colors.transparent,
      elevation: 0,
      centerTitle: true,
      title: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Text(
            'Blink Date',
            style: AppTypography.h3.copyWith(color: AppColors.ink),
          ),
          if (state.totalRounds > 1)
            Text(
              '\u00c9change ${state.currentRound} sur ${state.totalRounds}',
              style: AppTypography.caption.copyWith(
                color: AppColors.inkMuted,
              ),
            ),
        ],
      ),
      leading: state.isConnected
          ? const SizedBox.shrink()
          : IconButton(
              icon: const Icon(Icons.arrow_back_rounded),
              color: AppColors.ink,
              onPressed: () => context.pop(),
            ),
      bottom: PreferredSize(
        preferredSize: const Size.fromHeight(1),
        child: Container(
          height: 1,
          color: AppColors.divider,
        ),
      ),
    );
  }

  // ── Body ───────────────────────────────────────────────────────────────

  Widget _buildBody(BlinkDateState state, BlinkDateNotifier notifier) {
    // No matchId provided.
    if (widget.matchId == null || widget.matchId!.isEmpty) {
      return _buildErrorView(
        'Aucun match s\u00e9lectionn\u00e9.',
        'Revenez \u00e0 l\u2019\u00e9cran pr\u00e9c\u00e9dent et choisissez un match.',
      );
    }

    // Loading.
    if (state.isLoading) {
      return _buildLoadingView();
    }

    // Error.
    if (state.errorMessage != null && !state.isConnected) {
      return _buildErrorView(
        'Une erreur est survenue',
        state.errorMessage!,
        showRetry: true,
        onRetry: _loadData,
      );
    }

    // Complete — all rounds done.
    if (state.isComplete) {
      return _buildCompleteView(state);
    }

    // Feedback overlay.
    if (state.showFeedback) {
      return _buildFeedbackView(state, notifier);
    }

    // Connected — active call.
    if (state.isConnected) {
      return _buildActiveCallView(state, notifier);
    }

    // Pre-call — waiting to start.
    return _buildPreCallView(state, notifier);
  }

  // ── Loading View ───────────────────────────────────────────────────────

  Widget _buildLoadingView() {
    return Center(
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          SizedBox(
            width: 48,
            height: 48,
            child: CircularProgressIndicator(
              strokeWidth: 3,
              valueColor: AlwaysStoppedAnimation<Color>(
                AppColors.violet.withValues(alpha: 0.7),
              ),
            ),
          ),
          AppSpacing.gapLg,
          Text(
            'Chargement de votre Blink Date...',
            style: AppTypography.bodyMedium.copyWith(
              color: AppColors.inkMuted,
            ),
          ),
        ],
      ),
    );
  }

  // ── Error View ─────────────────────────────────────────────────────────

  Widget _buildErrorView(
    String title,
    String message, {
    bool showRetry = false,
    VoidCallback? onRetry,
  }) {
    return Center(
      child: Padding(
        padding: AppSpacing.screenPadding,
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              width: 80,
              height: 80,
              decoration: BoxDecoration(
                color: AppColors.errorLight,
                shape: BoxShape.circle,
              ),
              child: const Icon(
                Icons.error_outline_rounded,
                size: 40,
                color: AppColors.error,
              ),
            ),
            AppSpacing.gapLg,
            Text(
              title,
              style: AppTypography.h3.copyWith(color: AppColors.ink),
              textAlign: TextAlign.center,
            ),
            AppSpacing.gapSm,
            Text(
              message,
              style: AppTypography.bodyMedium.copyWith(
                color: AppColors.inkMuted,
              ),
              textAlign: TextAlign.center,
            ),
            if (showRetry && onRetry != null) ...[
              AppSpacing.gapXl,
              MuqabalaButton(
                label: 'R\u00e9essayer',
                onPressed: onRetry,
                isFullWidth: false,
                variant: MuqabalaButtonVariant.secondary,
                icon: Icons.refresh_rounded,
              ),
            ],
            AppSpacing.gapMd,
            MuqabalaButton(
              label: 'Retour',
              onPressed: () => context.pop(),
              isFullWidth: false,
              variant: MuqabalaButtonVariant.text,
            ),
          ],
        ),
      ),
    );
  }

  // ── Pre-Call View ──────────────────────────────────────────────────────

  Widget _buildPreCallView(BlinkDateState state, BlinkDateNotifier notifier) {
    return SingleChildScrollView(
      padding: AppSpacing.screenPadding,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          AppSpacing.gapLg,

          // ── Round indicator ──────────────────────────────────────────
          _RoundIndicator(
            currentRound: state.currentRound,
            totalRounds: state.totalRounds,
          ),

          AppSpacing.gapXl,

          // ── Duration info ───────────────────────────────────────────
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
            decoration: BoxDecoration(
              color: AppColors.violetLight,
              borderRadius: BorderRadius.circular(12),
            ),
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                const Icon(
                  Icons.timer_outlined,
                  color: AppColors.violet,
                  size: 20,
                ),
                AppSpacing.horizontalSm,
                Text(
                  '${state.totalDuration ~/ 60} minutes',
                  style: AppTypography.label.copyWith(
                    color: AppColors.violet,
                  ),
                ),
              ],
            ),
          ),

          AppSpacing.gapXl,

          // ── Instructions ────────────────────────────────────────────
          Text(
            'Pr\u00eat\u00b7e pour votre \u00e9change ?',
            style: AppTypography.h2.copyWith(color: AppColors.ink),
            textAlign: TextAlign.center,
          ),
          AppSpacing.gapSm,
          Text(
            'Un appel audio de ${state.totalDuration ~/ 60} minutes va commencer. '
            'Installez-vous confortablement et profitez de cette rencontre.',
            style: AppTypography.bodyMedium.copyWith(
              color: AppColors.inkMuted,
            ),
            textAlign: TextAlign.center,
          ),

          AppSpacing.gapXl,

          // ── Conversation prompts ────────────────────────────────────
          if (state.prompts.isNotEmpty)
            ConversationPromptList(prompts: state.prompts),

          AppSpacing.gapXl,

          // ── Start button ────────────────────────────────────────────
          MuqabalaButton(
            label: state.isConnecting
                ? 'Connexion...'
                : 'Lancer l\u2019appel',
            onPressed: state.isConnecting ? null : () => notifier.startCall(),
            isLoading: state.isConnecting,
            variant: MuqabalaButtonVariant.primary,
            icon: Icons.phone_rounded,
          ),

          AppSpacing.gapLg,

          // ── Tips ────────────────────────────────────────────────────
          _buildTipsCard(),

          AppSpacing.gapLg,
        ],
      ),
    );
  }

  // ── Active Call View ───────────────────────────────────────────────────

  Widget _buildActiveCallView(
    BlinkDateState state,
    BlinkDateNotifier notifier,
  ) {
    return SafeArea(
      child: Column(
        children: [
          AppSpacing.gapLg,

          // ── Partner info ─────────────────────────────────────────────
          _buildPartnerInfo(state),

          AppSpacing.gapLg,

          // ── Countdown timer ──────────────────────────────────────────
          Expanded(
            flex: 3,
            child: Center(
              child: CountdownTimerWidget(
                timeRemaining: state.timeRemaining,
                totalDuration: state.totalDuration,
                size: MediaQuery.of(context).size.width * 0.5,
              ),
            ),
          ),

          // ── Conversation prompts (scrollable) ────────────────────────
          if (state.prompts.isNotEmpty)
            Expanded(
              flex: 2,
              child: SingleChildScrollView(
                padding: AppSpacing.paddingHMd,
                child: ConversationPromptList(prompts: state.prompts),
              ),
            ),

          AppSpacing.gapLg,

          // ── Audio controls ───────────────────────────────────────────
          Padding(
            padding: const EdgeInsets.only(bottom: 32),
            child: AudioControlsWidget(
              isMuted: state.isMuted,
              onToggleMute: () => notifier.toggleMute(),
              onHangUp: () => _confirmEndCall(context, notifier),
            ),
          ),
        ],
      ),
    );
  }

  // ── Feedback View ──────────────────────────────────────────────────────

  Widget _buildFeedbackView(
    BlinkDateState state,
    BlinkDateNotifier notifier,
  ) {
    return Center(
      child: SingleChildScrollView(
        padding: AppSpacing.screenPadding,
        child: InlineFeedbackWidget(
          onSubmit: (answers) => notifier.submitFeedback(answers),
          onSkip: () => notifier.skipFeedback(),
          isSubmitting: state.isFeedbackSubmitting,
          roundNumber: state.currentRound,
        ),
      ),
    );
  }

  // ── Complete View ──────────────────────────────────────────────────────

  Widget _buildCompleteView(BlinkDateState state) {
    return Center(
      child: Padding(
        padding: AppSpacing.screenPadding,
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            // ── Success icon ──────────────────────────────────────────
            Container(
              width: 96,
              height: 96,
              decoration: BoxDecoration(
                color: AppColors.successLight,
                shape: BoxShape.circle,
              ),
              child: const Icon(
                Icons.check_circle_outline_rounded,
                size: 56,
                color: AppColors.success,
              ),
            ),

            AppSpacing.gapXl,

            Text(
              'Blink Date termin\u00e9 !',
              style: AppTypography.h1.copyWith(color: AppColors.ink),
              textAlign: TextAlign.center,
            ),

            AppSpacing.gapMd,

            Text(
              'F\u00e9licitations ! Vous avez termin\u00e9 vos '
              '${state.totalRounds} \u00e9changes. '
              'Les r\u00e9sultats seront bient\u00f4t disponibles.',
              style: AppTypography.bodyLarge.copyWith(
                color: AppColors.inkMuted,
              ),
              textAlign: TextAlign.center,
            ),

            AppSpacing.gapMd,

            // ── Rounds summary ────────────────────────────────────────
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: AppColors.violetLight,
                borderRadius: BorderRadius.circular(16),
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: List.generate(state.totalRounds, (i) {
                  return Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Container(
                        width: 40,
                        height: 40,
                        decoration: BoxDecoration(
                          color: AppColors.success.withValues(alpha: 0.15),
                          shape: BoxShape.circle,
                        ),
                        child: const Icon(
                          Icons.check_rounded,
                          color: AppColors.success,
                          size: 20,
                        ),
                      ),
                      const SizedBox(height: 6),
                      Text(
                        '\u00c9change ${i + 1}',
                        style: AppTypography.caption.copyWith(
                          color: AppColors.inkSoft,
                        ),
                      ),
                    ],
                  );
                }),
              ),
            ),

            AppSpacing.gapXl,

            MuqabalaButton(
              label: 'Retour \u00e0 l\u2019accueil',
              onPressed: () => context.go('/home'),
              variant: MuqabalaButtonVariant.primary,
              icon: Icons.home_rounded,
            ),
          ],
        ),
      ),
    );
  }

  // ── Helper Widgets ─────────────────────────────────────────────────────

  Widget _buildPartnerInfo(BlinkDateState state) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        // Animated avatar placeholder.
        AnimatedBuilder(
          animation: _pulseAnimation,
          builder: (context, child) {
            return Transform.scale(
              scale: state.isConnecting ? _pulseAnimation.value : 1.0,
              child: child,
            );
          },
          child: Container(
            width: 64,
            height: 64,
            decoration: BoxDecoration(
              color: AppColors.violetLight,
              shape: BoxShape.circle,
              border: Border.all(
                color: AppColors.violet.withValues(alpha: 0.3),
                width: 2,
              ),
            ),
            child: const Icon(
              Icons.person_rounded,
              color: AppColors.violet,
              size: 32,
            ),
          ),
        ),
        AppSpacing.gapSm,
        Text(
          state.partnerName ?? 'Votre partenaire',
          style: AppTypography.label.copyWith(color: AppColors.ink),
        ),
        const SizedBox(height: 4),
        Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              width: 8,
              height: 8,
              decoration: const BoxDecoration(
                color: AppColors.success,
                shape: BoxShape.circle,
              ),
            ),
            const SizedBox(width: 6),
            Text(
              'En ligne',
              style: AppTypography.caption.copyWith(
                color: AppColors.success,
              ),
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildTipsCard() {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppColors.sageLight,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(
          color: AppColors.sage.withValues(alpha: 0.2),
          width: 1,
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(
                Icons.lightbulb_outline_rounded,
                color: AppColors.sageDeep,
                size: 20,
              ),
              AppSpacing.horizontalSm,
              Text(
                'Conseils',
                style: AppTypography.label.copyWith(
                  color: AppColors.sageDeep,
                ),
              ),
            ],
          ),
          AppSpacing.gapSm,
          _buildTip('\u00c9coutez attentivement et laissez des silences.'),
          const SizedBox(height: 6),
          _buildTip('Soyez authentique, partagez avec sinc\u00e9rit\u00e9.'),
          const SizedBox(height: 6),
          _buildTip(
            'Gardez une intention pure \u2014 '
            'c\u2019est une d\u00e9marche de mariage.',
          ),
        ],
      ),
    );
  }

  Widget _buildTip(String text) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.only(top: 2),
          child: Icon(
            Icons.circle,
            size: 5,
            color: AppColors.sage,
          ),
        ),
        AppSpacing.horizontalSm,
        Expanded(
          child: Text(
            text,
            style: AppTypography.bodySmall.copyWith(
              color: AppColors.inkSoft,
            ),
          ),
        ),
      ],
    );
  }

  // ── Dialogs ────────────────────────────────────────────────────────────

  void _confirmEndCall(BuildContext context, BlinkDateNotifier notifier) {
    showDialog<bool>(
      context: context,
      builder: (dialogContext) {
        return AlertDialog(
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(20),
          ),
          title: Text(
            'Terminer l\u2019appel ?',
            style: AppTypography.h3.copyWith(color: AppColors.ink),
          ),
          content: Text(
            '\u00cates-vous s\u00fbr\u00b7e de vouloir raccrocher ? '
            'Vous ne pourrez pas reprendre cet \u00e9change.',
            style: AppTypography.bodyMedium.copyWith(
              color: AppColors.inkMuted,
            ),
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.of(dialogContext).pop(false),
              child: Text(
                'Continuer',
                style: AppTypography.label.copyWith(
                  color: AppColors.violet,
                ),
              ),
            ),
            TextButton(
              onPressed: () {
                Navigator.of(dialogContext).pop(true);
                notifier.endCall();
              },
              child: Text(
                'Raccrocher',
                style: AppTypography.label.copyWith(
                  color: AppColors.error,
                ),
              ),
            ),
          ],
        );
      },
    );
  }

  void _showExitConfirmation(
    BuildContext context,
    BlinkDateNotifier notifier,
  ) {
    showDialog<bool>(
      context: context,
      builder: (dialogContext) {
        return AlertDialog(
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(20),
          ),
          title: Text(
            'Quitter le Blink Date ?',
            style: AppTypography.h3.copyWith(color: AppColors.ink),
          ),
          content: Text(
            'Un appel est en cours. Si vous quittez, '
            'l\u2019\u00e9change sera termin\u00e9.',
            style: AppTypography.bodyMedium.copyWith(
              color: AppColors.inkMuted,
            ),
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.of(dialogContext).pop(false),
              child: Text(
                'Rester',
                style: AppTypography.label.copyWith(
                  color: AppColors.violet,
                ),
              ),
            ),
            TextButton(
              onPressed: () {
                Navigator.of(dialogContext).pop(true);
                notifier.endCall();
                if (context.mounted) context.pop();
              },
              child: Text(
                'Quitter',
                style: AppTypography.label.copyWith(
                  color: AppColors.error,
                ),
              ),
            ),
          ],
        );
      },
    );
  }
}

// ══════════════════════════════════════════════════════════════════════════════
// Round Indicator
// ══════════════════════════════════════════════════════════════════════════════

/// Visual indicator showing progress through the rounds (1/3, 2/3, 3/3).
class _RoundIndicator extends StatelessWidget {
  const _RoundIndicator({
    required this.currentRound,
    required this.totalRounds,
  });

  final int currentRound;
  final int totalRounds;

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: List.generate(totalRounds, (i) {
        final roundNumber = i + 1;
        final isActive = roundNumber == currentRound;
        final isCompleted = roundNumber < currentRound;

        return Padding(
          padding: const EdgeInsets.symmetric(horizontal: 6),
          child: AnimatedContainer(
            duration: const Duration(milliseconds: 300),
            width: isActive ? 48 : 36,
            height: isActive ? 48 : 36,
            decoration: BoxDecoration(
              color: isCompleted
                  ? AppColors.success
                  : isActive
                      ? AppColors.violet
                      : AppColors.paper,
              shape: BoxShape.circle,
              border: Border.all(
                color: isCompleted
                    ? AppColors.success
                    : isActive
                        ? AppColors.violet
                        : AppColors.border,
                width: isActive ? 2.5 : 1.5,
              ),
              boxShadow: isActive
                  ? [
                      BoxShadow(
                        color: AppColors.violet.withValues(alpha: 0.3),
                        blurRadius: 12,
                        offset: const Offset(0, 4),
                      ),
                    ]
                  : null,
            ),
            child: Center(
              child: isCompleted
                  ? const Icon(
                      Icons.check_rounded,
                      color: Colors.white,
                      size: 18,
                    )
                  : Text(
                      '$roundNumber',
                      style: AppTypography.label.copyWith(
                        color: isActive ? Colors.white : AppColors.inkMuted,
                        fontSize: isActive ? 16 : 13,
                      ),
                    ),
            ),
          ),
        );
      }),
    );
  }
}
