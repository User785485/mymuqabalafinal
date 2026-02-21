/// Concrete [AudioRoomProvider] implementation backed by LiveKit.
///
/// Wraps the `livekit_client` SDK and emits state / participant updates
/// through the abstract streams defined in [AudioRoomProvider].
///
/// Usage:
/// ```dart
/// final provider = LiveKitRoomProvider();
/// await provider.connect(wsUrl, token);
/// provider.stateStream.listen((state) => print(state));
/// ```
library;

import 'dart:async';

import 'package:livekit_client/livekit_client.dart' as lk;

import 'package:my_muqabala/core/audio/audio_room_provider.dart';
import 'package:my_muqabala/core/utils/logger.dart';

/// LiveKit-backed implementation of [AudioRoomProvider].
class LiveKitRoomProvider implements AudioRoomProvider {
  LiveKitRoomProvider();

  static const _tag = 'LiveKitRoom';

  lk.Room? _room;
  lk.EventsListener<lk.RoomEvent>? _listener;
  bool _isMutedState = false;
  bool _disposed = false;

  final _stateController = StreamController<AudioRoomState>.broadcast();
  final _participantsController =
      StreamController<List<AudioParticipant>>.broadcast();

  // ── AudioRoomProvider interface ────────────────────────────────────────

  @override
  bool get isMuted => _isMutedState;

  @override
  Stream<AudioRoomState> get stateStream => _stateController.stream;

  @override
  Stream<List<AudioParticipant>> get participantsStream =>
      _participantsController.stream;

  @override
  Future<void> connect(String wsUrl, String token) async {
    if (_disposed) {
      throw StateError('Cannot connect: provider has been disposed.');
    }

    AppLogger.info('Connecting to LiveKit room...', tag: _tag);
    _stateController.add(AudioRoomState.connecting);

    try {
      _room = lk.Room();
      _setupRoomListeners();

      await _room!.connect(
        wsUrl,
        token,
        roomOptions: const lk.RoomOptions(
          adaptiveStream: true,
          dynacast: true,
          defaultAudioPublishOptions: lk.AudioPublishOptions(
            dtx: true,
          ),
          defaultCameraCaptureOptions: lk.CameraCaptureOptions(
            maxFrameRate: 0, // Audio-only: disable camera
          ),
        ),
      );

      // Enable microphone by default (audio-only call).
      await _room!.localParticipant?.setMicrophoneEnabled(true);
      _isMutedState = false;

      _stateController.add(AudioRoomState.connected);
      _emitParticipants();

      AppLogger.info('Connected to LiveKit room', tag: _tag);
    } catch (e, st) {
      AppLogger.error(
        'Failed to connect to LiveKit room',
        tag: _tag,
        error: e,
        stackTrace: st,
      );
      _stateController.add(AudioRoomState.failed);
      rethrow;
    }
  }

  @override
  Future<void> disconnect() async {
    AppLogger.info('Disconnecting from LiveKit room...', tag: _tag);

    try {
      await _room?.localParticipant?.setMicrophoneEnabled(false);
    } catch (_) {
      // Best effort — room may already be disconnected.
    }

    await _room?.disconnect();
    _cleanupRoom();
    _stateController.add(AudioRoomState.disconnected);

    AppLogger.info('Disconnected from LiveKit room', tag: _tag);
  }

  @override
  Future<void> toggleMute() async {
    final localParticipant = _room?.localParticipant;
    if (localParticipant == null) return;

    _isMutedState = !_isMutedState;
    await localParticipant.setMicrophoneEnabled(!_isMutedState);
    _emitParticipants();

    AppLogger.debug(
      'Microphone ${_isMutedState ? "muted" : "unmuted"}',
      tag: _tag,
    );
  }

  @override
  void dispose() {
    if (_disposed) return;
    _disposed = true;

    _cleanupRoom();
    _stateController.close();
    _participantsController.close();

    AppLogger.debug('LiveKitRoomProvider disposed', tag: _tag);
  }

  // ── Internal helpers ───────────────────────────────────────────────────

  void _setupRoomListeners() {
    final room = _room;
    if (room == null) return;

    _listener = room.createListener();

    _listener!
      ..on<lk.RoomDisconnectedEvent>((_) {
        AppLogger.info('Room disconnected event', tag: _tag);
        _stateController.add(AudioRoomState.disconnected);
      })
      ..on<lk.RoomReconnectingEvent>((_) {
        AppLogger.info('Room reconnecting...', tag: _tag);
        _stateController.add(AudioRoomState.reconnecting);
      })
      ..on<lk.RoomReconnectedEvent>((_) {
        AppLogger.info('Room reconnected', tag: _tag);
        _stateController.add(AudioRoomState.connected);
      })
      ..on<lk.ParticipantConnectedEvent>((_) {
        _emitParticipants();
      })
      ..on<lk.ParticipantDisconnectedEvent>((_) {
        _emitParticipants();
      })
      ..on<lk.TrackMutedEvent>((_) {
        _emitParticipants();
      })
      ..on<lk.TrackUnmutedEvent>((_) {
        _emitParticipants();
      })
      ..on<lk.ActiveSpeakersChangedEvent>((_) {
        _emitParticipants();
      });
  }

  void _emitParticipants() {
    final room = _room;
    if (room == null) return;

    final participants = <AudioParticipant>[];

    // Add local participant.
    final local = room.localParticipant;
    if (local != null) {
      participants.add(
        AudioParticipant(
          id: local.identity ?? 'local',
          name: local.name ?? 'Vous',
          isMuted: _isMutedState,
          isSpeaking: local.isSpeaking,
        ),
      );
    }

    // Add remote participants.
    for (final remote in room.remoteParticipants.values) {
      final audioTrack = remote.audioTrackPublications.firstOrNull;
      final isRemoteMuted = audioTrack?.muted ?? true;

      participants.add(
        AudioParticipant(
          id: remote.identity ?? remote.sid,
          name: remote.name ?? 'Participant',
          isMuted: isRemoteMuted,
          isSpeaking: remote.isSpeaking,
        ),
      );
    }

    _participantsController.add(participants);
  }

  void _cleanupRoom() {
    _listener?.dispose();
    _listener = null;
    _room?.dispose();
    _room = null;
  }
}
