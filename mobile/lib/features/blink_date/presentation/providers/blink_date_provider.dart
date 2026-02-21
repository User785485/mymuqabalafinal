/// State management for the Blink Date feature.
///
/// Uses Riverpod [StateNotifier] to manage the full lifecycle of a
/// Blink Date session: loading round data, connecting to the audio room,
/// running the countdown timer, handling mute/unmute, and submitting
/// post-call binary feedback.
///
/// Supports the multi-partner event workflow:
/// 1. Load all rounds for the event (each with a different partner)
/// 2. Start each round sequentially (connect LiveKit, countdown)
/// 3. After each round: binary feedback ("J'aimerais aller plus loin")
/// 4. After all rounds: navigate to photo reveal phase
library;

import 'dart:async';

import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_riverpod/legacy.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

import 'package:my_muqabala/core/audio/audio_room_provider.dart';
import 'package:my_muqabala/core/audio/livekit_room_provider.dart';
import 'package:my_muqabala/core/config/env_config.dart';
import 'package:my_muqabala/core/utils/logger.dart';
import 'package:my_muqabala/features/blink_date/data/models/blink_date_model.dart';
import 'package:my_muqabala/features/blink_date/data/repositories/blink_date_repository.dart';

// ── State ────────────────────────────────────────────────────────────────────

/// Immutable state for the Blink Date session.
class BlinkDateState {
  const BlinkDateState({
    this.eventId,
    this.allRounds = const [],
    this.currentRound,
    this.currentRoundIndex = 0,
    this.timeRemaining = 600,
    this.totalDuration = 600,
    this.isMuted = false,
    this.isConnected = false,
    this.isConnecting = false,
    this.showFeedback = false,
    this.showPhotoPhase = false,
    this.isComplete = false,
    this.isLoading = false,
    this.isFeedbackSubmitting = false,
    this.feedbackByRound = const {},
    this.errorMessage,
  });

  /// Event ID for the current session.
  final String? eventId;

  /// All blink date rounds for this user in this event.
  final List<BlinkDateModel> allRounds;

  /// The currently active round.
  final BlinkDateModel? currentRound;

  /// Index of the current round in [allRounds] (0-based).
  final int currentRoundIndex;

  /// Seconds remaining in the current round.
  final int timeRemaining;

  /// Total duration of the current round in seconds.
  final int totalDuration;

  /// Whether the local microphone is muted.
  final bool isMuted;

  /// Whether the audio connection is established.
  final bool isConnected;

  /// Whether we are currently connecting to the audio room.
  final bool isConnecting;

  /// Whether the feedback form should be displayed.
  final bool showFeedback;

  /// Whether all rounds are done and it's time for photo selection.
  final bool showPhotoPhase;

  /// Whether everything is complete.
  final bool isComplete;

  /// Whether data is being loaded from the server.
  final bool isLoading;

  /// Whether feedback is currently being submitted.
  final bool isFeedbackSubmitting;

  /// Feedback submitted per round: blinkDateId → wantsToContinue.
  final Map<String, bool> feedbackByRound;

  /// Error message to display (if any).
  final String? errorMessage;

  /// Convenience: total number of rounds.
  int get totalRounds => allRounds.length;

  /// Convenience: current round display number (1-based).
  int get roundDisplayNumber => currentRoundIndex + 1;

  /// Convenience: partner name for current round.
  String? get partnerName => currentRound?.partnerPrenom;

  /// Convenience: partner photo URL for current round.
  String? get partnerPhotoUrl => currentRound?.partnerPhotoFloueUrl;

  /// Convenience: conversation prompts for current round.
  List<String> get prompts => currentRound?.sujetsPoposes ?? [];

  /// Create a copy with selected fields overridden.
  BlinkDateState copyWith({
    String? eventId,
    List<BlinkDateModel>? allRounds,
    BlinkDateModel? currentRound,
    int? currentRoundIndex,
    int? timeRemaining,
    int? totalDuration,
    bool? isMuted,
    bool? isConnected,
    bool? isConnecting,
    bool? showFeedback,
    bool? showPhotoPhase,
    bool? isComplete,
    bool? isLoading,
    bool? isFeedbackSubmitting,
    Map<String, bool>? feedbackByRound,
    String? errorMessage,
  }) {
    return BlinkDateState(
      eventId: eventId ?? this.eventId,
      allRounds: allRounds ?? this.allRounds,
      currentRound: currentRound ?? this.currentRound,
      currentRoundIndex: currentRoundIndex ?? this.currentRoundIndex,
      timeRemaining: timeRemaining ?? this.timeRemaining,
      totalDuration: totalDuration ?? this.totalDuration,
      isMuted: isMuted ?? this.isMuted,
      isConnected: isConnected ?? this.isConnected,
      isConnecting: isConnecting ?? this.isConnecting,
      showFeedback: showFeedback ?? this.showFeedback,
      showPhotoPhase: showPhotoPhase ?? this.showPhotoPhase,
      isComplete: isComplete ?? this.isComplete,
      isLoading: isLoading ?? this.isLoading,
      isFeedbackSubmitting: isFeedbackSubmitting ?? this.isFeedbackSubmitting,
      feedbackByRound: feedbackByRound ?? this.feedbackByRound,
      errorMessage: errorMessage ?? this.errorMessage,
    );
  }
}

// ── Notifier ─────────────────────────────────────────────────────────────────

/// Manages the full lifecycle of a Blink Date session.
class BlinkDateNotifier extends StateNotifier<BlinkDateState> {
  BlinkDateNotifier({
    required BlinkDateRepository repository,
    required AudioRoomProvider audioProvider,
  })  : _repository = repository,
        _audioProvider = audioProvider,
        super(const BlinkDateState()) {
    _listenToAudioState();
  }

  static const _tag = 'BlinkDateNotifier';

  final BlinkDateRepository _repository;
  final AudioRoomProvider _audioProvider;
  Timer? _countdownTimer;
  StreamSubscription<AudioRoomState>? _audioStateSub;
  StreamSubscription<List<AudioParticipant>>? _participantsSub;

  // ── Public API ─────────────────────────────────────────────────────────

  /// Load all rounds for an event and prepare the first round.
  Future<void> loadBlinkDatesForEvent(String eventId) async {
    state = state.copyWith(isLoading: true, eventId: eventId, errorMessage: null);

    try {
      final rounds = await _repository.getBlinkDatesForEvent(eventId);

      if (rounds.isEmpty) {
        state = state.copyWith(
          isLoading: false,
          errorMessage: 'Aucun Blink Date trouv\u00e9 pour cet \u00e9v\u00e9nement.',
        );
        return;
      }

      // Find the first round that is not yet completed.
      final nextIndex = rounds.indexWhere(
        (r) => r.statut == 'planifie' || r.statut == 'en_cours',
      );

      final isAlreadyComplete =
          rounds.every((r) => r.statut == 'termine' || r.statut == 'annule');

      final effectiveIndex = nextIndex >= 0 ? nextIndex : rounds.length - 1;

      state = state.copyWith(
        isLoading: false,
        allRounds: rounds,
        currentRound: rounds[effectiveIndex],
        currentRoundIndex: effectiveIndex,
        totalDuration: rounds[effectiveIndex].dureeSecondes,
        timeRemaining: rounds[effectiveIndex].dureeSecondes,
        isComplete: isAlreadyComplete,
        showPhotoPhase: isAlreadyComplete,
      );
    } catch (e, st) {
      AppLogger.error(
        'Failed to load Blink Date rounds',
        tag: _tag,
        error: e,
        stackTrace: st,
      );
      state = state.copyWith(
        isLoading: false,
        errorMessage:
            'Impossible de charger les donn\u00e9es. Veuillez r\u00e9essayer.',
      );
    }
  }

  /// Load all rounds for a match (legacy compatibility).
  Future<void> loadRoundsForMatch(String matchId) async {
    state = state.copyWith(isLoading: true, errorMessage: null);

    try {
      final rounds = await _repository.getBlinkDatesForMatch(matchId);

      if (rounds.isEmpty) {
        state = state.copyWith(
          isLoading: false,
          errorMessage: 'Aucun Blink Date trouv\u00e9 pour ce match.',
        );
        return;
      }

      final nextIndex = rounds.indexWhere(
        (r) => r.statut == 'planifie' || r.statut == 'en_cours',
      );

      final isAlreadyComplete =
          rounds.every((r) => r.statut == 'termine' || r.statut == 'annule');

      final effectiveIndex = nextIndex >= 0 ? nextIndex : rounds.length - 1;

      state = state.copyWith(
        isLoading: false,
        allRounds: rounds,
        currentRound: rounds[effectiveIndex],
        currentRoundIndex: effectiveIndex,
        totalDuration: rounds[effectiveIndex].dureeSecondes,
        timeRemaining: rounds[effectiveIndex].dureeSecondes,
        isComplete: isAlreadyComplete,
      );
    } catch (e, st) {
      AppLogger.error(
        'Failed to load Blink Date rounds',
        tag: _tag,
        error: e,
        stackTrace: st,
      );
      state = state.copyWith(
        isLoading: false,
        errorMessage:
            'Impossible de charger les donn\u00e9es. Veuillez r\u00e9essayer.',
      );
    }
  }

  /// Connect to the audio room and start the countdown timer.
  Future<void> startCall() async {
    final current = state.currentRound;
    if (current == null) {
      AppLogger.warning('Cannot start call: no current round', tag: _tag);
      return;
    }

    state = state.copyWith(isConnecting: true, errorMessage: null);

    try {
      // Use room name from RPC if available, otherwise construct it.
      final roomName = current.roomName ??
          'blink-date-${current.matchId}-round-${current.ordre}';

      final tokenData = await _repository.getLivekitToken(roomName);
      final token = tokenData['token'] as String;
      final wsUrl = tokenData['ws_url'] as String? ?? EnvConfig.livekitWsUrl;

      await _audioProvider.connect(wsUrl, token);

      await _repository.updateBlinkDateStatus(current.id, 'en_cours');

      state = state.copyWith(
        isConnecting: false,
        isConnected: true,
        isMuted: false,
      );

      _startTimer();

      AppLogger.info(
        'Blink Date call started (round ${state.roundDisplayNumber})',
        tag: _tag,
      );
    } catch (e, st) {
      AppLogger.error(
        'Failed to start Blink Date call',
        tag: _tag,
        error: e,
        stackTrace: st,
      );
      state = state.copyWith(
        isConnecting: false,
        errorMessage:
            'Impossible de lancer l\u2019appel. V\u00e9rifiez votre connexion.',
      );
    }
  }

  /// Toggle the local microphone mute state.
  Future<void> toggleMute() async {
    try {
      await _audioProvider.toggleMute();
      state = state.copyWith(isMuted: _audioProvider.isMuted);
    } catch (e, st) {
      AppLogger.error(
        'Failed to toggle mute',
        tag: _tag,
        error: e,
        stackTrace: st,
      );
    }
  }

  /// End the current call, disconnect audio, and show feedback form.
  Future<void> endCall() async {
    _stopTimer();

    try {
      await _audioProvider.disconnect();
    } catch (e) {
      AppLogger.warning('Error disconnecting audio', tag: _tag, error: e);
    }

    final current = state.currentRound;
    if (current != null) {
      try {
        await _repository.updateBlinkDateStatus(current.id, 'termine');
      } catch (_) {
        // Best effort.
      }
    }

    state = state.copyWith(
      isConnected: false,
      showFeedback: true,
    );

    AppLogger.info(
      'Blink Date call ended (round ${state.roundDisplayNumber})',
      tag: _tag,
    );
  }

  /// Submit binary feedback and advance to the next round or photo phase.
  Future<void> submitFeedback(bool wantsToContinue) async {
    final current = state.currentRound;
    if (current == null) return;

    state = state.copyWith(isFeedbackSubmitting: true);

    try {
      await _repository.submitBlinkDateFeedback(current.id, wantsToContinue);

      AppLogger.info(
        'Feedback submitted for round ${state.roundDisplayNumber}: $wantsToContinue',
        tag: _tag,
      );
    } catch (e, st) {
      AppLogger.error(
        'Failed to submit feedback',
        tag: _tag,
        error: e,
        stackTrace: st,
      );
    }

    final updatedFeedback = Map<String, bool>.from(state.feedbackByRound);
    updatedFeedback[current.id] = wantsToContinue;

    state = state.copyWith(
      isFeedbackSubmitting: false,
      showFeedback: false,
      feedbackByRound: updatedFeedback,
    );

    // Advance to next round or complete.
    if (state.currentRoundIndex < state.allRounds.length - 1) {
      _advanceToNextRound();
    } else {
      // All rounds done → photo phase.
      state = state.copyWith(showPhotoPhase: true, isComplete: true);
    }
  }

  /// Submit legacy feedback (star rating format) — kept for compatibility.
  Future<void> submitLegacyFeedback(Map<String, dynamic> answers) async {
    final current = state.currentRound;
    final userId = Supabase.instance.client.auth.currentUser?.id;

    if (current == null || userId == null) return;

    state = state.copyWith(isFeedbackSubmitting: true);

    try {
      await _repository.submitFeedback(current.id, userId, answers);
    } catch (e, st) {
      AppLogger.error('Failed to submit legacy feedback', tag: _tag, error: e, stackTrace: st);
    }

    state = state.copyWith(isFeedbackSubmitting: false, showFeedback: false);

    if (state.currentRoundIndex < state.allRounds.length - 1) {
      _advanceToNextRound();
    } else {
      state = state.copyWith(showPhotoPhase: true, isComplete: true);
    }
  }

  /// Skip feedback and proceed.
  void skipFeedback() {
    state = state.copyWith(showFeedback: false);

    if (state.currentRoundIndex < state.allRounds.length - 1) {
      _advanceToNextRound();
    } else {
      state = state.copyWith(showPhotoPhase: true, isComplete: true);
    }
  }

  // ── Timer management ───────────────────────────────────────────────────

  void _startTimer() {
    _stopTimer();
    _countdownTimer = Timer.periodic(
      const Duration(seconds: 1),
      (_) => _tick(),
    );
  }

  void _stopTimer() {
    _countdownTimer?.cancel();
    _countdownTimer = null;
  }

  void _tick() {
    if (state.timeRemaining <= 1) {
      endCall();
      return;
    }

    state = state.copyWith(timeRemaining: state.timeRemaining - 1);
  }

  // ── Round advancement ──────────────────────────────────────────────────

  void _advanceToNextRound() {
    final nextIndex = state.currentRoundIndex + 1;
    if (nextIndex < state.allRounds.length) {
      final nextRound = state.allRounds[nextIndex];
      state = state.copyWith(
        currentRound: nextRound,
        currentRoundIndex: nextIndex,
        totalDuration: nextRound.dureeSecondes,
        timeRemaining: nextRound.dureeSecondes,
        isConnected: false,
        isMuted: false,
      );
    }
  }

  // ── Audio state listener ───────────────────────────────────────────────

  void _listenToAudioState() {
    _audioStateSub = _audioProvider.stateStream.listen((audioState) {
      switch (audioState) {
        case AudioRoomState.connected:
          state = state.copyWith(isConnected: true, isConnecting: false);
        case AudioRoomState.connecting:
          state = state.copyWith(isConnecting: true);
        case AudioRoomState.reconnecting:
          state = state.copyWith(isConnecting: true);
        case AudioRoomState.disconnected:
          state = state.copyWith(isConnected: false, isConnecting: false);
        case AudioRoomState.failed:
          state = state.copyWith(
            isConnected: false,
            isConnecting: false,
            errorMessage:
                'La connexion audio a \u00e9chou\u00e9. Veuillez r\u00e9essayer.',
          );
      }
    });

    _participantsSub = _audioProvider.participantsStream.listen((_) {
      // Partner name is now provided by the RPC data.
    });
  }

  // ── Cleanup ────────────────────────────────────────────────────────────

  @override
  void dispose() {
    _stopTimer();
    _audioStateSub?.cancel();
    _participantsSub?.cancel();
    _audioProvider.dispose();
    super.dispose();
  }
}

// ── Providers ────────────────────────────────────────────────────────────────

/// Provides the [BlinkDateRepository] instance.
final blinkDateRepositoryProvider = Provider<BlinkDateRepository>((ref) {
  return BlinkDateRepository(Supabase.instance.client);
});

/// Provides the [AudioRoomProvider] backed by LiveKit.
final audioRoomProvider = Provider<AudioRoomProvider>((ref) {
  final provider = LiveKitRoomProvider();
  ref.onDispose(provider.dispose);
  return provider;
});

/// Provides the [BlinkDateNotifier] and its [BlinkDateState].
final blinkDateProvider =
    StateNotifierProvider<BlinkDateNotifier, BlinkDateState>((ref) {
  return BlinkDateNotifier(
    repository: ref.watch(blinkDateRepositoryProvider),
    audioProvider: ref.watch(audioRoomProvider),
  );
});
