/// State management for the Blink Date feature.
///
/// Uses Riverpod [StateNotifier] to manage the full lifecycle of a
/// Blink Date session: loading round data, connecting to the audio room,
/// running the countdown timer, handling mute/unmute, and submitting
/// post-call feedback.
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
    this.blinkDateId,
    this.matchId,
    this.currentRound = 1,
    this.totalRounds = 3,
    this.timeRemaining = 600,
    this.totalDuration = 600,
    this.isMuted = false,
    this.isConnected = false,
    this.isConnecting = false,
    this.showFeedback = false,
    this.isComplete = false,
    this.isLoading = false,
    this.isFeedbackSubmitting = false,
    this.prompts = const [],
    this.partnerName,
    this.errorMessage,
    this.blinkDates = const [],
  });

  /// Current Blink Date round ID.
  final String? blinkDateId;

  /// Parent match ID.
  final String? matchId;

  /// Current round number (1-based).
  final int currentRound;

  /// Total number of rounds for this match.
  final int totalRounds;

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

  /// Whether all rounds are complete.
  final bool isComplete;

  /// Whether data is being loaded from the server.
  final bool isLoading;

  /// Whether feedback is currently being submitted.
  final bool isFeedbackSubmitting;

  /// Conversation prompts for the current round.
  final List<String> prompts;

  /// Name of the conversation partner (if available).
  final String? partnerName;

  /// Error message to display (if any).
  final String? errorMessage;

  /// All Blink Date rounds loaded for this match.
  final List<BlinkDateModel> blinkDates;

  /// Create a copy with selected fields overridden.
  BlinkDateState copyWith({
    String? blinkDateId,
    String? matchId,
    int? currentRound,
    int? totalRounds,
    int? timeRemaining,
    int? totalDuration,
    bool? isMuted,
    bool? isConnected,
    bool? isConnecting,
    bool? showFeedback,
    bool? isComplete,
    bool? isLoading,
    bool? isFeedbackSubmitting,
    List<String>? prompts,
    String? partnerName,
    String? errorMessage,
    List<BlinkDateModel>? blinkDates,
  }) {
    return BlinkDateState(
      blinkDateId: blinkDateId ?? this.blinkDateId,
      matchId: matchId ?? this.matchId,
      currentRound: currentRound ?? this.currentRound,
      totalRounds: totalRounds ?? this.totalRounds,
      timeRemaining: timeRemaining ?? this.timeRemaining,
      totalDuration: totalDuration ?? this.totalDuration,
      isMuted: isMuted ?? this.isMuted,
      isConnected: isConnected ?? this.isConnected,
      isConnecting: isConnecting ?? this.isConnecting,
      showFeedback: showFeedback ?? this.showFeedback,
      isComplete: isComplete ?? this.isComplete,
      isLoading: isLoading ?? this.isLoading,
      isFeedbackSubmitting: isFeedbackSubmitting ?? this.isFeedbackSubmitting,
      prompts: prompts ?? this.prompts,
      partnerName: partnerName ?? this.partnerName,
      errorMessage: errorMessage ?? this.errorMessage,
      blinkDates: blinkDates ?? this.blinkDates,
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

  /// Load all rounds for a match and prepare the first (or next pending) round.
  Future<void> loadRoundsForMatch(String matchId) async {
    state = state.copyWith(isLoading: true, matchId: matchId, errorMessage: null);

    try {
      final rounds = await _repository.getBlinkDatesForMatch(matchId);

      if (rounds.isEmpty) {
        state = state.copyWith(
          isLoading: false,
          errorMessage: 'Aucun Blink Date trouv\u00e9 pour ce match.',
        );
        return;
      }

      // Find the first round that is not yet completed.
      final nextRound = rounds.firstWhere(
        (r) => r.statut == 'en_attente' || r.statut == 'en_cours',
        orElse: () => rounds.last,
      );

      final isAlreadyComplete =
          rounds.every((r) => r.statut == 'termine' || r.statut == 'annule');

      state = state.copyWith(
        isLoading: false,
        blinkDates: rounds,
        blinkDateId: nextRound.id,
        currentRound: nextRound.ordre,
        totalRounds: rounds.length,
        totalDuration: nextRound.dureeSecondes,
        timeRemaining: nextRound.dureeSecondes,
        prompts: nextRound.sujetsPoposes,
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

  /// Load a specific Blink Date round by its ID.
  Future<void> loadRound(String blinkDateId) async {
    state = state.copyWith(isLoading: true, errorMessage: null);

    try {
      final blinkDate = await _repository.getBlinkDate(blinkDateId);

      if (blinkDate == null) {
        state = state.copyWith(
          isLoading: false,
          errorMessage: 'Blink Date introuvable.',
        );
        return;
      }

      state = state.copyWith(
        isLoading: false,
        blinkDateId: blinkDate.id,
        matchId: blinkDate.matchId,
        currentRound: blinkDate.ordre,
        totalDuration: blinkDate.dureeSecondes,
        timeRemaining: blinkDate.dureeSecondes,
        prompts: blinkDate.sujetsPoposes,
      );
    } catch (e, st) {
      AppLogger.error(
        'Failed to load BlinkDate $blinkDateId',
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
    final blinkDateId = state.blinkDateId;
    if (blinkDateId == null) {
      AppLogger.warning('Cannot start call: no blinkDateId set', tag: _tag);
      return;
    }

    state = state.copyWith(isConnecting: true, errorMessage: null);

    try {
      // Generate room name from match + round for uniqueness.
      final roomName = 'blink-date-${state.matchId ?? blinkDateId}'
          '-round-${state.currentRound}';

      // Request a LiveKit token.
      final tokenData = await _repository.getLivekitToken(roomName);
      final token = tokenData['token'] as String;
      final wsUrl = tokenData['ws_url'] as String? ?? EnvConfig.livekitWsUrl;

      // Connect to the audio room.
      await _audioProvider.connect(wsUrl, token);

      // Update the Blink Date status to 'en_cours'.
      await _repository.updateBlinkDateStatus(blinkDateId, 'en_cours');

      state = state.copyWith(
        isConnecting: false,
        isConnected: true,
        isMuted: false,
      );

      // Start countdown.
      _startTimer();

      AppLogger.info(
        'Blink Date call started (round ${state.currentRound})',
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

    // Mark current round as done.
    final blinkDateId = state.blinkDateId;
    if (blinkDateId != null) {
      try {
        await _repository.updateBlinkDateStatus(blinkDateId, 'termine');
      } catch (_) {
        // Best effort — feedback is more important.
      }
    }

    state = state.copyWith(
      isConnected: false,
      showFeedback: true,
    );

    AppLogger.info(
      'Blink Date call ended (round ${state.currentRound})',
      tag: _tag,
    );
  }

  /// Submit feedback and advance to the next round or mark complete.
  Future<void> submitFeedback(Map<String, dynamic> answers) async {
    final blinkDateId = state.blinkDateId;
    final userId = Supabase.instance.client.auth.currentUser?.id;

    if (blinkDateId == null || userId == null) {
      AppLogger.warning(
        'Cannot submit feedback: missing blinkDateId or userId',
        tag: _tag,
      );
      return;
    }

    state = state.copyWith(isFeedbackSubmitting: true);

    try {
      await _repository.submitFeedback(blinkDateId, userId, answers);

      AppLogger.info(
        'Feedback submitted for round ${state.currentRound}',
        tag: _tag,
      );
    } catch (e, st) {
      AppLogger.error(
        'Failed to submit feedback',
        tag: _tag,
        error: e,
        stackTrace: st,
      );
      // Continue to next round even if feedback save fails.
    }

    state = state.copyWith(
      isFeedbackSubmitting: false,
      showFeedback: false,
    );

    // Check if there are more rounds.
    if (state.currentRound < state.totalRounds) {
      _advanceToNextRound();
    } else {
      state = state.copyWith(isComplete: true);
    }
  }

  /// Skip feedback and proceed to the next round or completion.
  void skipFeedback() {
    state = state.copyWith(showFeedback: false);

    if (state.currentRound < state.totalRounds) {
      _advanceToNextRound();
    } else {
      state = state.copyWith(isComplete: true);
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
      // Time is up — automatically end the call.
      endCall();
      return;
    }

    state = state.copyWith(timeRemaining: state.timeRemaining - 1);
  }

  // ── Round advancement ──────────────────────────────────────────────────

  void _advanceToNextRound() {
    final nextRoundIndex = state.currentRound; // 0-indexed is currentRound
    if (nextRoundIndex < state.blinkDates.length) {
      final nextBlinkDate = state.blinkDates[nextRoundIndex];
      state = state.copyWith(
        blinkDateId: nextBlinkDate.id,
        currentRound: nextBlinkDate.ordre,
        totalDuration: nextBlinkDate.dureeSecondes,
        timeRemaining: nextBlinkDate.dureeSecondes,
        prompts: nextBlinkDate.sujetsPoposes,
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

    _participantsSub = _audioProvider.participantsStream.listen((participants) {
      // Find the remote participant's name (if any).
      final remote = participants.where((p) => p.id != 'local').toList();
      if (remote.isNotEmpty) {
        state = state.copyWith(partnerName: remote.first.name);
      }
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
