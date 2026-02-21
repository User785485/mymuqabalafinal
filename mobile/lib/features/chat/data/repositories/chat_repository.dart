/// Repository for Stream Chat operations.
///
/// Handles token generation via Supabase Edge Functions and manages
/// the Stream Chat user connection lifecycle.
///
/// ```dart
/// final repo = ChatRepository(supabaseClient);
/// await repo.connectStreamUser(streamClient, userId, 'Fatima');
/// ```
library;

import 'package:stream_chat_flutter/stream_chat_flutter.dart';
import 'package:supabase_flutter/supabase_flutter.dart' hide User;

import 'package:my_muqabala/core/network/supabase_client.dart';
import 'package:my_muqabala/core/utils/logger.dart';

/// Repository responsible for Stream Chat authentication and connection.
class ChatRepository {
  ChatRepository(this._supabase);

  final SupabaseClient _supabase;

  // ── Stream token generation ──────────────────────────────────────────────

  /// Requests a Stream Chat JWT from the `generate-stream-token` Edge Function.
  ///
  /// The Edge Function reads the authenticated user from the Supabase JWT
  /// and returns a `{ "stream_token": "<jwt>" }` payload.
  ///
  /// Throws a [ChatRepositoryException] if the call fails or the response
  /// does not contain a valid token.
  Future<String> getStreamToken() async {
    try {
      AppLogger.info(
        'Requesting Stream Chat token from Edge Function',
        tag: 'ChatRepository',
      );

      final response = await SupabaseClientManager.client.functions.invoke(
        'generate-stream-token',
      );

      final data = response.data as Map<String, dynamic>?;

      if (data == null || data['stream_token'] == null) {
        throw ChatRepositoryException(
          'La réponse de l\'Edge Function ne contient pas de token Stream.',
        );
      }

      final token = data['stream_token'] as String;

      AppLogger.info(
        'Stream Chat token obtained successfully',
        tag: 'ChatRepository',
      );

      return token;
    } on FunctionException catch (e, st) {
      AppLogger.error(
        'Edge Function "generate-stream-token" failed',
        tag: 'ChatRepository',
        error: e,
        stackTrace: st,
      );
      throw ChatRepositoryException(
        'Impossible de générer le token de chat : ${e.details ?? e.toString()}',
      );
    } on Exception catch (e, st) {
      AppLogger.error(
        'Unexpected error while fetching Stream token',
        tag: 'ChatRepository',
        error: e,
        stackTrace: st,
      );
      throw ChatRepositoryException(
        'Erreur inattendue lors de la génération du token : $e',
      );
    }
  }

  // ── Connect user to Stream ───────────────────────────────────────────────

  /// Connects the authenticated user to the Stream Chat service.
  ///
  /// 1. Fetches a fresh JWT via [getStreamToken].
  /// 2. Calls [StreamChatClient.connectUser] with the user's ID and display name.
  ///
  /// If the client already has a connected user with the same [userId],
  /// this method returns immediately without reconnecting.
  Future<void> connectStreamUser(
    StreamChatClient client,
    String userId,
    String displayName,
  ) async {
    try {
      // Avoid reconnecting if the same user is already connected.
      if (client.state.currentUser?.id == userId) {
        AppLogger.debug(
          'Stream user "$userId" already connected — skipping',
          tag: 'ChatRepository',
        );
        return;
      }

      AppLogger.info(
        'Connecting Stream user: $userId ($displayName)',
        tag: 'ChatRepository',
      );

      final token = await getStreamToken();

      await client.connectUser(
        User(
          id: userId,
          extraData: {'name': displayName},
        ),
        token,
      );

      AppLogger.info(
        'Stream user "$userId" connected successfully',
        tag: 'ChatRepository',
      );
    } on Exception catch (e, st) {
      AppLogger.error(
        'Failed to connect Stream user "$userId"',
        tag: 'ChatRepository',
        error: e,
        stackTrace: st,
      );
      rethrow;
    }
  }

  // ── Disconnect user from Stream ──────────────────────────────────────────

  /// Disconnects the currently connected user from the Stream Chat service.
  ///
  /// Safe to call even if no user is connected — the method is a no-op in
  /// that case.
  Future<void> disconnectStreamUser(StreamChatClient client) async {
    try {
      if (client.state.currentUser == null) {
        AppLogger.debug(
          'No Stream user connected — skipping disconnect',
          tag: 'ChatRepository',
        );
        return;
      }

      AppLogger.info(
        'Disconnecting Stream user: ${client.state.currentUser?.id}',
        tag: 'ChatRepository',
      );

      await client.disconnectUser();

      AppLogger.info(
        'Stream user disconnected successfully',
        tag: 'ChatRepository',
      );
    } on Exception catch (e, st) {
      AppLogger.error(
        'Failed to disconnect Stream user',
        tag: 'ChatRepository',
        error: e,
        stackTrace: st,
      );
      rethrow;
    }
  }

  // ── Create coaching channel ─────────────────────────────────────────────

  /// Creates a coaching channel between the client and their coach/admin.
  ///
  /// Looks up a coach or admin in the profiles table, then creates a
  /// Stream Chat channel `coaching-{clientId}` with both as members.
  /// Returns the channel ID, or null if no coach was found.
  Future<String?> createCoachingChannel(
    StreamChatClient client,
    String clientId,
  ) async {
    try {
      // Find a coach or admin in profiles
      final coachResponse = await _supabase
          .from('profiles')
          .select('id, prenom')
          .inFilter('role', ['coach', 'admin'])
          .limit(1)
          .maybeSingle();

      if (coachResponse == null) {
        AppLogger.warning(
          'No coach/admin found in profiles',
          tag: 'ChatRepository',
        );
        return null;
      }

      final coachId = coachResponse['id'] as String;
      final coachName = coachResponse['prenom'] as String? ?? 'Coach';

      // Get client display name
      final clientName = await getUserDisplayName(clientId);

      // Create the channel
      final channelId = 'coaching-$clientId';
      final channel = client.channel(
        'messaging',
        id: channelId,
        extraData: {
          'name': 'Coaching - $clientName',
          'members': [clientId, coachId],
        },
      );

      await channel.watch();

      // Send welcome message
      await channel.sendMessage(
        Message(text: 'Assalamou alaykoum, je souhaite échanger avec mon coach.'),
      );

      AppLogger.info(
        'Created coaching channel $channelId with coach $coachId',
        tag: 'ChatRepository',
      );

      return channelId;
    } on Exception catch (e, st) {
      AppLogger.error(
        'Failed to create coaching channel',
        tag: 'ChatRepository',
        error: e,
        stackTrace: st,
      );
      return null;
    }
  }

  // ── Helper: fetch display name from Supabase profile ─────────────────────

  /// Returns the user's first name from the `profiles` table.
  ///
  /// Falls back to `'Utilisateur'` if the profile cannot be read.
  Future<String> getUserDisplayName(String userId) async {
    try {
      final response = await _supabase
          .from('profiles')
          .select('prenom')
          .eq('id', userId)
          .single();

      return (response['prenom'] as String?) ?? 'Utilisateur';
    } on Exception catch (e, st) {
      AppLogger.error(
        'Failed to fetch display name for user "$userId"',
        tag: 'ChatRepository',
        error: e,
        stackTrace: st,
      );
      return 'Utilisateur';
    }
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// Exception type
// ═══════════════════════════════════════════════════════════════════════════════

/// Domain-specific exception for chat repository operations.
class ChatRepositoryException implements Exception {
  const ChatRepositoryException(this.message);

  final String message;

  @override
  String toString() => 'ChatRepositoryException: $message';
}
