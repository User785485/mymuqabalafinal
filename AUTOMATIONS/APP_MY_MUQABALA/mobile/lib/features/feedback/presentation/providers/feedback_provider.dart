/// Riverpod providers and state management for the feedback feature.
///
/// Uses a `StateNotifier` driven by a parameterised `family` provider so
/// that each form-type / reference-id combination gets its own independent
/// state.
library;

import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_riverpod/legacy.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

import 'package:my_muqabala/core/utils/logger.dart';
import '../../data/models/feedback_form_model.dart';
import '../../data/models/feedback_questions.dart';
import '../../data/repositories/feedback_repository.dart';

// ── Parameter record ──────────────────────────────────────────────────────

/// Parameter type for the family providers.
typedef FeedbackParams = ({String formType, String? referenceId});

// ── Repository provider ───────────────────────────────────────────────────

/// Singleton [FeedbackRepository] backed by the global Supabase client.
final feedbackRepositoryProvider = Provider<FeedbackRepository>((ref) {
  return FeedbackRepository(Supabase.instance.client);
});

// ── State ─────────────────────────────────────────────────────────────────

/// Immutable state for a single feedback form session.
class FeedbackState {
  const FeedbackState({
    this.answers = const {},
    this.currentStep = 0,
    this.isSubmitting = false,
    this.isSubmitted = false,
    this.errorMessage,
  });

  /// Answers keyed by question id.
  final Map<int, dynamic> answers;

  /// 0-indexed page/step.
  final int currentStep;

  /// Whether a submission is in-flight.
  final bool isSubmitting;

  /// Whether the form has been successfully submitted.
  final bool isSubmitted;

  /// User-visible error message (cleared on retry).
  final String? errorMessage;

  /// Convenience factory for the initial (blank) state.
  factory FeedbackState.initial() => const FeedbackState();

  FeedbackState copyWith({
    Map<int, dynamic>? answers,
    int? currentStep,
    bool? isSubmitting,
    bool? isSubmitted,
    String? errorMessage,
    bool clearError = false,
  }) {
    return FeedbackState(
      answers: answers ?? this.answers,
      currentStep: currentStep ?? this.currentStep,
      isSubmitting: isSubmitting ?? this.isSubmitting,
      isSubmitted: isSubmitted ?? this.isSubmitted,
      errorMessage: clearError ? null : (errorMessage ?? this.errorMessage),
    );
  }
}

// ── Notifier ──────────────────────────────────────────────────────────────

/// Drives the step-by-step feedback form.
class FeedbackNotifier extends StateNotifier<FeedbackState> {
  FeedbackNotifier(this._repo, this._formType, this._referenceId)
      : _questions = feedbackQuestionsByType[_formType] ?? const [],
        super(FeedbackState.initial());

  final FeedbackRepository _repo;
  final String _formType;
  final String? _referenceId;
  final List<FeedbackQuestion> _questions;

  /// Total number of questions in this form.
  int get totalSteps => _questions.length;

  /// The [FeedbackQuestion] for the current step, or `null` if out of range.
  FeedbackQuestion? get currentQuestion {
    if (state.currentStep < 0 || state.currentStep >= _questions.length) {
      return null;
    }
    return _questions[state.currentStep];
  }

  /// Whether the current step has a non-null / non-empty answer.
  bool get canProceed {
    final question = currentQuestion;
    if (question == null) return false;
    final answer = state.answers[question.id];
    if (answer == null) return false;
    if (answer is String && answer.trim().isEmpty) return false;
    return true;
  }

  /// Record an answer for a given [questionId].
  void setAnswer(int questionId, dynamic value) {
    final updated = Map<int, dynamic>.from(state.answers);
    updated[questionId] = value;
    state = state.copyWith(answers: updated, clearError: true);
  }

  /// Advance to the next step (clamped to [totalSteps] - 1).
  void nextStep() {
    if (state.currentStep < _questions.length - 1) {
      state = state.copyWith(currentStep: state.currentStep + 1);
    }
  }

  /// Go back to the previous step (clamped to 0).
  void previousStep() {
    if (state.currentStep > 0) {
      state = state.copyWith(currentStep: state.currentStep - 1);
    }
  }

  /// Validate all required answers are present and submit to the backend.
  Future<void> submit() async {
    // Validate: ensure every question has an answer.
    for (final q in _questions) {
      final answer = state.answers[q.id];
      if (answer == null) {
        state = state.copyWith(
          errorMessage:
              'Veuillez r\u00e9pondre \u00e0 toutes les questions avant de soumettre.',
        );
        return;
      }
      if (answer is String && answer.trim().isEmpty) {
        state = state.copyWith(
          errorMessage:
              'Veuillez r\u00e9pondre \u00e0 toutes les questions avant de soumettre.',
        );
        return;
      }
    }

    state = state.copyWith(isSubmitting: true, clearError: true);

    try {
      final userId = Supabase.instance.client.auth.currentUser?.id;
      if (userId == null) {
        state = state.copyWith(
          isSubmitting: false,
          errorMessage: 'Utilisateur non connect\u00e9.',
        );
        return;
      }

      // Convert int keys to string keys for JSONB storage.
      final reponses = <String, dynamic>{};
      for (final entry in state.answers.entries) {
        reponses[entry.key.toString()] = entry.value;
      }

      await _repo.submitFeedback(
        userId: userId,
        typeFormulaire: _formType,
        referenceId: _referenceId,
        reponses: reponses,
      );

      state = state.copyWith(isSubmitting: false, isSubmitted: true);
      AppLogger.info(
        'Feedback submitted: type=$_formType, ref=$_referenceId',
        tag: 'Feedback',
      );
    } catch (e, st) {
      AppLogger.error(
        'Feedback submission failed',
        tag: 'Feedback',
        error: e,
        stackTrace: st,
      );
      state = state.copyWith(
        isSubmitting: false,
        errorMessage:
            'Erreur lors de l\u2019envoi. Veuillez r\u00e9essayer.',
      );
    }
  }
}

// ── Providers ─────────────────────────────────────────────────────────────

/// Provides a [FeedbackNotifier] scoped to a specific form type and optional
/// reference id.
///
/// Usage:
/// ```dart
/// final params = (formType: 'post_blink_date', referenceId: dateId);
/// final state = ref.watch(feedbackProvider(params));
/// final notifier = ref.read(feedbackProvider(params).notifier);
/// ```
final feedbackProvider = StateNotifierProvider.autoDispose
    .family<FeedbackNotifier, FeedbackState, FeedbackParams>(
  (ref, params) {
    final repo = ref.watch(feedbackRepositoryProvider);
    return FeedbackNotifier(repo, params.formType, params.referenceId);
  },
);

/// Checks whether the current user has already submitted a feedback form for
/// the given type + reference combination.
final existingFeedbackProvider = FutureProvider.autoDispose
    .family<FeedbackFormModel?, FeedbackParams>(
  (ref, params) async {
    final repo = ref.watch(feedbackRepositoryProvider);
    final userId = Supabase.instance.client.auth.currentUser?.id;
    if (userId == null) return null;

    return repo.getExistingFeedback(
      userId: userId,
      typeFormulaire: params.formType,
      referenceId: params.referenceId,
    );
  },
);
