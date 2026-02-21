/// Abstract audio room interface for C2 resilience.
///
/// The application codes against this abstraction rather than a specific
/// provider, so we can swap LiveKit for another backend (or a mock)
/// without touching feature code.
///
/// The concrete implementation (`LiveKitAudioRoomProvider`) will live in
/// a separate file under `features/audio/data/`.
library;

/// Connection lifecycle states of an audio room.
enum AudioRoomState {
  /// Not connected to any room.
  disconnected,

  /// Actively establishing a connection.
  connecting,

  /// Successfully connected and streaming.
  connected,

  /// Connection was lost; attempting automatic recovery.
  reconnecting,

  /// Unrecoverable failure.
  failed,
}

/// A participant in an audio room.
class AudioParticipant {
  const AudioParticipant({
    required this.id,
    required this.name,
    this.isMuted = false,
    this.isSpeaking = false,
    this.avatarUrl,
  });

  final String id;
  final String name;
  final bool isMuted;
  final bool isSpeaking;
  final String? avatarUrl;

  /// Create a copy with selected fields overridden.
  AudioParticipant copyWith({
    String? id,
    String? name,
    bool? isMuted,
    bool? isSpeaking,
    String? avatarUrl,
  }) {
    return AudioParticipant(
      id: id ?? this.id,
      name: name ?? this.name,
      isMuted: isMuted ?? this.isMuted,
      isSpeaking: isSpeaking ?? this.isSpeaking,
      avatarUrl: avatarUrl ?? this.avatarUrl,
    );
  }

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is AudioParticipant &&
          runtimeType == other.runtimeType &&
          id == other.id &&
          name == other.name &&
          isMuted == other.isMuted &&
          isSpeaking == other.isSpeaking &&
          avatarUrl == other.avatarUrl;

  @override
  int get hashCode => Object.hash(id, name, isMuted, isSpeaking, avatarUrl);

  @override
  String toString() =>
      'AudioParticipant(id: $id, name: $name, '
      'muted: $isMuted, speaking: $isSpeaking)';
}

/// Provider-agnostic interface for audio room connections.
///
/// Implementations must:
/// * Emit state changes through [stateStream].
/// * Emit participant list updates through [participantsStream].
/// * Handle automatic reconnection internally where possible.
abstract class AudioRoomProvider {
  /// Connect to a room identified by [roomId] using the provided [token].
  ///
  /// Throws if the connection cannot be established after retries.
  Future<void> connect(String roomId, String token);

  /// Gracefully disconnect from the current room.
  Future<void> disconnect();

  /// Toggle the local microphone mute state.
  Future<void> toggleMute();

  /// Whether the local microphone is currently muted.
  bool get isMuted;

  /// Stream of room connection state changes.
  Stream<AudioRoomState> get stateStream;

  /// Stream of the current participant list (including the local user).
  Stream<List<AudioParticipant>> get participantsStream;

  /// Release all resources held by this provider.
  ///
  /// After calling [dispose], no further method calls are valid.
  void dispose();
}
