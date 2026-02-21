import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

import '../../data/models/question_model.dart';
import '../../data/repositories/questionnaire_repository.dart';
import '../../domain/attachment_scorer.dart';

final questionnaireRepositoryProvider = Provider<QuestionnaireRepository>((ref) {
  return QuestionnaireRepository(Supabase.instance.client);
});

/// State for the questionnaire flow.
class QuestionnaireState {
  const QuestionnaireState({
    this.currentIndex = 0,
    this.answers = const {},
    this.isLoading = false,
    this.isSaving = false,
    this.isComplete = false,
    this.resultStyle,
    this.resultDescription,
    this.anxietyScore,
    this.avoidanceScore,
  });

  final int currentIndex;
  final Map<int, int> answers; // questionId -> raw value (1-5)
  final bool isLoading;
  final bool isSaving;
  final bool isComplete;
  final String? resultStyle;
  final String? resultDescription;
  final double? anxietyScore;
  final double? avoidanceScore;

  QuestionnaireState copyWith({
    int? currentIndex,
    Map<int, int>? answers,
    bool? isLoading,
    bool? isSaving,
    bool? isComplete,
    String? resultStyle,
    String? resultDescription,
    double? anxietyScore,
    double? avoidanceScore,
  }) {
    return QuestionnaireState(
      currentIndex: currentIndex ?? this.currentIndex,
      answers: answers ?? this.answers,
      isLoading: isLoading ?? this.isLoading,
      isSaving: isSaving ?? this.isSaving,
      isComplete: isComplete ?? this.isComplete,
      resultStyle: resultStyle ?? this.resultStyle,
      resultDescription: resultDescription ?? this.resultDescription,
      anxietyScore: anxietyScore ?? this.anxietyScore,
      avoidanceScore: avoidanceScore ?? this.avoidanceScore,
    );
  }
}

final questionnaireNotifierProvider =
    NotifierProvider<QuestionnaireNotifier, QuestionnaireState>(
  QuestionnaireNotifier.new,
);

class QuestionnaireNotifier extends Notifier<QuestionnaireState> {
  late QuestionnaireRepository _repo;

  @override
  QuestionnaireState build() {
    _repo = ref.watch(questionnaireRepositoryProvider);
    // Load existing responses on init
    _loadExisting();
    return const QuestionnaireState(isLoading: true);
  }

  Future<void> _loadExisting() async {
    try {
      final existing = await _repo.loadExistingResponses();
      // Find the first unanswered question
      int startIndex = 0;
      for (int i = 0; i < attachmentQuestions.length; i++) {
        if (!existing.containsKey(attachmentQuestions[i].id)) {
          startIndex = i;
          break;
        }
        if (i == attachmentQuestions.length - 1) {
          startIndex = attachmentQuestions.length - 1;
        }
      }
      state = state.copyWith(
        answers: existing,
        currentIndex: startIndex,
        isLoading: false,
      );
    } catch (e) {
      state = state.copyWith(isLoading: false);
    }
  }

  /// Answer current question and auto-advance.
  Future<void> answerQuestion(int questionId, int value) async {
    final newAnswers = Map<int, int>.from(state.answers);
    newAnswers[questionId] = value;
    state = state.copyWith(answers: newAnswers, isSaving: true);

    try {
      await _repo.upsertResponse(questionId: questionId, value: value);
    } catch (_) {
      // Continue even if save fails — we'll retry
    }

    state = state.copyWith(isSaving: false);
  }

  void goToNext() {
    if (state.currentIndex < attachmentQuestions.length - 1) {
      state = state.copyWith(currentIndex: state.currentIndex + 1);
    }
  }

  void goToPrevious() {
    if (state.currentIndex > 0) {
      state = state.copyWith(currentIndex: state.currentIndex - 1);
    }
  }

  /// Complete the questionnaire: compute scores and update profile.
  Future<void> completeQuestionnaire() async {
    if (state.answers.length < 20) return;

    state = state.copyWith(isLoading: true);

    final anxiety = AttachmentScorer.anxietyScore(state.answers);
    final avoidance = AttachmentScorer.avoidanceScore(state.answers);
    final style = AttachmentScorer.classifyStyle(anxiety, avoidance);
    final description = AttachmentScorer.styleDescription(style);

    try {
      await _repo.markQuestionnaireComplete();
    } catch (_) {}

    state = state.copyWith(
      isLoading: false,
      isComplete: true,
      resultStyle: style,
      resultDescription: description,
      anxietyScore: anxiety,
      avoidanceScore: avoidance,
    );
  }
}
