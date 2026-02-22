/// Typeform-style feedback screen with one question per page.
///
/// Navigated to with a [formType] key and an optional [referenceId].
/// If the user has already submitted this exact form, a "d\u00e9j\u00e0 soumis"
/// message is shown instead.
///
/// Each question type renders its own specialised widget:
///   - [StarRatingWidget]  for `stars`
///   - [YesNoSelectorWidget] for `yesNo`
///   - [LikertScaleWidget] for `likert`
///   - [FreeTextWidget]    for `freeText`
library;

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import 'package:my_muqabala/core/constants/app_colors.dart';
import 'package:my_muqabala/core/constants/app_spacing.dart';
import 'package:my_muqabala/core/constants/app_typography.dart';
import 'package:my_muqabala/core/widgets/muqabala_button.dart';

import '../../data/models/feedback_questions.dart';
import '../providers/feedback_provider.dart';
import '../widgets/free_text_widget.dart';
import '../widgets/likert_scale_widget.dart';
import '../widgets/star_rating_widget.dart';
import '../widgets/yes_no_selector_widget.dart';

// ═══════════════════════════════════════════════════════════════════════════
// Feedback Screen
// ═══════════════════════════════════════════════════════════════════════════

class FeedbackScreen extends ConsumerStatefulWidget {
  const FeedbackScreen({
    required this.formType,
    this.referenceId,
    super.key,
  });

  /// The form type key (e.g. `post_blink_date`, `bilan_mensuel`).
  final String formType;

  /// Optional entity reference (e.g. a blink-date ID).
  final String? referenceId;

  @override
  ConsumerState<FeedbackScreen> createState() => _FeedbackScreenState();
}

class _FeedbackScreenState extends ConsumerState<FeedbackScreen> {
  late PageController _pageController;
  late FeedbackParams _params;

  @override
  void initState() {
    super.initState();
    _pageController = PageController();
    _params = (formType: widget.formType, referenceId: widget.referenceId);
  }

  @override
  void dispose() {
    _pageController.dispose();
    super.dispose();
  }

  /// Smoothly animate to a given page index.
  void _animateToPage(int page) {
    if (!_pageController.hasClients) return;
    _pageController.animateToPage(
      page,
      duration: const Duration(milliseconds: 350),
      curve: Curves.easeOutCubic,
    );
  }

  /// The questions for the current form type.
  List<FeedbackQuestion> get _questions =>
      feedbackQuestionsByType[widget.formType] ?? const [];

  /// Human-readable title for the app bar.
  String get _title =>
      feedbackFormTitles[widget.formType] ?? 'Formulaire';

  @override
  Widget build(BuildContext context) {
    // ── Check for existing submission ──────────────────────────────────
    final existingAsync = ref.watch(existingFeedbackProvider(_params));

    return existingAsync.when(
      loading: () => _buildLoadingScaffold(),
      error: (e, _) => _buildErrorScaffold(e),
      data: (existing) {
        if (existing != null) {
          return _buildAlreadySubmittedScaffold();
        }
        return _buildFormScaffold();
      },
    );
  }

  // ── Loading state ───────────────────────────────────────────────────────

  Widget _buildLoadingScaffold() {
    return Scaffold(
      backgroundColor: AppColors.paper,
      appBar: AppBar(
        title: Text(_title, style: AppTypography.h3),
        backgroundColor: AppColors.surface,
        elevation: 0,
        foregroundColor: AppColors.ink,
      ),
      body: const Center(
        child: CircularProgressIndicator(color: AppColors.violet),
      ),
    );
  }

  // ── Error state ─────────────────────────────────────────────────────────

  Widget _buildErrorScaffold(Object error) {
    return Scaffold(
      backgroundColor: AppColors.paper,
      appBar: AppBar(
        title: Text(_title, style: AppTypography.h3),
        backgroundColor: AppColors.surface,
        elevation: 0,
        foregroundColor: AppColors.ink,
      ),
      body: Center(
        child: Padding(
          padding: AppSpacing.screenPadding,
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              const Icon(
                Icons.error_outline_rounded,
                size: 48,
                color: AppColors.error,
              ),
              AppSpacing.verticalMd,
              Text(
                'Impossible de charger le formulaire.',
                style: AppTypography.bodyLarge.copyWith(
                  color: AppColors.inkMuted,
                ),
                textAlign: TextAlign.center,
              ),
              AppSpacing.verticalLg,
              MuqabalaButton(
                label: 'Retour',
                onPressed: () => context.pop(),
                variant: MuqabalaButtonVariant.secondary,
                isFullWidth: false,
              ),
            ],
          ),
        ),
      ),
    );
  }

  // ── Already submitted state ─────────────────────────────────────────────

  Widget _buildAlreadySubmittedScaffold() {
    return Scaffold(
      backgroundColor: AppColors.paper,
      appBar: AppBar(
        title: Text(_title, style: AppTypography.h3),
        backgroundColor: AppColors.surface,
        elevation: 0,
        foregroundColor: AppColors.ink,
      ),
      body: Center(
        child: Padding(
          padding: AppSpacing.screenPadding,
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Container(
                width: 72,
                height: 72,
                decoration: const BoxDecoration(
                  shape: BoxShape.circle,
                  color: AppColors.successLight,
                ),
                child: const Icon(
                  Icons.check_circle_rounded,
                  size: 40,
                  color: AppColors.success,
                ),
              ),
              AppSpacing.verticalLg,
              Text(
                'Formulaire d\u00e9j\u00e0 soumis',
                style: AppTypography.h2,
                textAlign: TextAlign.center,
              ),
              AppSpacing.verticalSm,
              Text(
                'Vous avez d\u00e9j\u00e0 r\u00e9pondu \u00e0 ce formulaire.\n'
                'Merci pour votre retour !',
                style: AppTypography.bodyMedium.copyWith(
                  color: AppColors.inkMuted,
                ),
                textAlign: TextAlign.center,
              ),
              AppSpacing.verticalXl,
              MuqabalaButton(
                label: 'Retour',
                onPressed: () => context.pop(),
                variant: MuqabalaButtonVariant.primary,
                isFullWidth: false,
              ),
            ],
          ),
        ),
      ),
    );
  }

  // ── Main form scaffold ──────────────────────────────────────────────────

  Widget _buildFormScaffold() {
    final feedbackState = ref.watch(feedbackProvider(_params));
    final notifier = ref.read(feedbackProvider(_params).notifier);
    final questions = _questions;

    if (questions.isEmpty) {
      return _buildErrorScaffold('Type de formulaire inconnu');
    }

    // Keep page controller in sync with state.
    ref.listen(feedbackProvider(_params), (prev, next) {
      if (prev?.currentStep != next.currentStep) {
        _animateToPage(next.currentStep);
      }
    });

    // ── Submission success ──
    if (feedbackState.isSubmitted) {
      return _buildSuccessScaffold();
    }

    final isLastStep = feedbackState.currentStep >= questions.length - 1;

    return Scaffold(
      backgroundColor: AppColors.paper,
      appBar: AppBar(
        title: Text(_title, style: AppTypography.h3),
        backgroundColor: AppColors.surface,
        elevation: 0,
        foregroundColor: AppColors.ink,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios_new_rounded, size: 20),
          onPressed: feedbackState.currentStep > 0
              ? () => notifier.previousStep()
              : () => context.pop(),
        ),
      ),
      body: SafeArea(
        child: Column(
          children: [
            // ── Progress bar ────────────────────────────────────────────
            _ProgressBar(
              current: feedbackState.currentStep,
              total: questions.length,
            ),

            // ── Question pages ──────────────────────────────────────────
            Expanded(
              child: PageView.builder(
                controller: _pageController,
                physics: const NeverScrollableScrollPhysics(),
                itemCount: questions.length,
                itemBuilder: (context, index) {
                  final question = questions[index];
                  final answer = feedbackState.answers[question.id];

                  return _QuestionPage(
                    question: question,
                    answer: answer,
                    stepLabel:
                        'Question ${index + 1} sur ${questions.length}',
                    onAnswer: (value) =>
                        notifier.setAnswer(question.id, value),
                  );
                },
              ),
            ),

            // ── Error message ───────────────────────────────────────────
            if (feedbackState.errorMessage != null)
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 24),
                child: Container(
                  width: double.infinity,
                  padding: const EdgeInsets.symmetric(
                    horizontal: 16,
                    vertical: 12,
                  ),
                  decoration: BoxDecoration(
                    color: AppColors.errorLight,
                    borderRadius: AppRadius.borderMd,
                  ),
                  child: Text(
                    feedbackState.errorMessage!,
                    style: AppTypography.bodySmall.copyWith(
                      color: AppColors.error,
                    ),
                    textAlign: TextAlign.center,
                  ),
                ),
              ),

            // ── Bottom action button ────────────────────────────────────
            Padding(
              padding: const EdgeInsets.fromLTRB(24, 12, 24, 16),
              child: MuqabalaButton(
                label: isLastStep ? 'Envoyer' : 'Suivant',
                icon: isLastStep
                    ? Icons.send_rounded
                    : Icons.arrow_forward_rounded,
                isLoading: feedbackState.isSubmitting,
                onPressed: notifier.canProceed
                    ? () {
                        if (isLastStep) {
                          notifier.submit();
                        } else {
                          notifier.nextStep();
                        }
                      }
                    : null,
              ),
            ),
          ],
        ),
      ),
    );
  }

  // ── Success state after submission ──────────────────────────────────────

  Widget _buildSuccessScaffold() {
    return Scaffold(
      backgroundColor: AppColors.paper,
      body: SafeArea(
        child: Center(
          child: Padding(
            padding: AppSpacing.screenPadding,
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Container(
                  width: 88,
                  height: 88,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    gradient: const LinearGradient(
                      colors: [
                        AppColors.violet,
                        AppColors.violetVivid,
                      ],
                      begin: Alignment.topLeft,
                      end: Alignment.bottomRight,
                    ),
                    boxShadow: [
                      BoxShadow(
                        color: AppColors.violet.withValues(alpha: 0.3),
                        blurRadius: 24,
                        offset: const Offset(0, 8),
                      ),
                    ],
                  ),
                  child: const Icon(
                    Icons.check_rounded,
                    size: 44,
                    color: Colors.white,
                  ),
                ),
                AppSpacing.verticalXl,
                Text(
                  'Merci pour votre retour !',
                  style: AppTypography.h2,
                  textAlign: TextAlign.center,
                ),
                AppSpacing.verticalSm,
                Text(
                  'Vos r\u00e9ponses ont bien \u00e9t\u00e9 enregistr\u00e9es.\n'
                  'Elles nous aident \u00e0 am\u00e9liorer votre accompagnement.',
                  style: AppTypography.bodyMedium.copyWith(
                    color: AppColors.inkMuted,
                  ),
                  textAlign: TextAlign.center,
                ),
                AppSpacing.verticalXl,
                MuqabalaButton(
                  label: 'Retour',
                  onPressed: () => context.pop(),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// Progress Bar
// ═══════════════════════════════════════════════════════════════════════════

class _ProgressBar extends StatelessWidget {
  const _ProgressBar({required this.current, required this.total});

  final int current;
  final int total;

  @override
  Widget build(BuildContext context) {
    final progress = total > 0 ? (current + 1) / total : 0.0;

    return Padding(
      padding: const EdgeInsets.fromLTRB(24, 8, 24, 0),
      child: Column(
        children: [
          ClipRRect(
            borderRadius: BorderRadius.circular(4),
            child: TweenAnimationBuilder<double>(
              tween: Tween<double>(begin: 0, end: progress),
              duration: const Duration(milliseconds: 300),
              curve: Curves.easeOutCubic,
              builder: (context, value, _) {
                return LinearProgressIndicator(
                  value: value,
                  backgroundColor: AppColors.divider,
                  valueColor:
                      const AlwaysStoppedAnimation(AppColors.violet),
                  minHeight: 4,
                );
              },
            ),
          ),
          AppSpacing.verticalXs,
          Text(
            '${current + 1} / $total',
            style: AppTypography.caption,
          ),
        ],
      ),
    );
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// Question Page
// ═══════════════════════════════════════════════════════════════════════════

class _QuestionPage extends StatelessWidget {
  const _QuestionPage({
    required this.question,
    required this.answer,
    required this.stepLabel,
    required this.onAnswer,
  });

  final FeedbackQuestion question;
  final dynamic answer;
  final String stepLabel;
  final ValueChanged<dynamic> onAnswer;

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
      child: ConstrainedBox(
        constraints: BoxConstraints(
          minHeight: MediaQuery.of(context).size.height * 0.55,
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            AppSpacing.verticalLg,

            // ── Question text ─────────────────────────────────────────
            Text(
              question.text,
              textAlign: TextAlign.center,
              style: AppTypography.h2.copyWith(
                height: 1.4,
              ),
            ),

            AppSpacing.verticalXl,

            // ── Answer widget ─────────────────────────────────────────
            _buildAnswerWidget(),

            AppSpacing.verticalLg,
          ],
        ),
      ),
    );
  }

  Widget _buildAnswerWidget() {
    return switch (question.type) {
      FeedbackQuestionType.stars => StarRatingWidget(
          value: answer as int?,
          onChanged: onAnswer,
        ),
      FeedbackQuestionType.yesNo => YesNoSelectorWidget(
          value: answer as String?,
          onChanged: onAnswer,
        ),
      FeedbackQuestionType.likert => LikertScaleWidget(
          value: answer as int?,
          onChanged: onAnswer,
        ),
      FeedbackQuestionType.freeText => FreeTextWidget(
          value: answer as String?,
          onChanged: onAnswer,
        ),
    };
  }
}
