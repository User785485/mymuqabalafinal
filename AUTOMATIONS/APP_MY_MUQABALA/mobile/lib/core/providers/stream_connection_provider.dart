/// Auto-connects and disconnects the Stream Chat user based on Supabase
/// auth state.
///
/// Watch this provider from the root widget ([MyMuqabalaApp]) so that
/// the Stream Chat user lifecycle is managed automatically:
///
/// ```dart
/// ref.watch(streamConnectionProvider); // triggers connect/disconnect
/// ```
library;

import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:stream_chat_flutter/stream_chat_flutter.dart';
import 'package:supabase_flutter/supabase_flutter.dart' hide User;

import 'package:my_muqabala/app.dart';
import 'package:my_muqabala/core/network/supabase_client.dart';
import 'package:my_muqabala/core/utils/logger.dart';

/// Manages the Stream Chat connection lifecycle.
///
/// Returns `true` when the Stream Chat user is successfully connected,
/// `false` otherwise (not configured, not authenticated, or error).
final streamConnectionProvider = FutureProvider.autoDispose<bool>((ref) async {
  final client = ref.watch(streamChatClientProvider);
  if (client == null) return false;

  try {
    final session = Supabase.instance.client.auth.currentSession;
    if (session == null) {
      // Not authenticated — disconnect if there is a connected user.
      if (client.state.currentUser != null) {
        await client.disconnectUser();
        AppLogger.info('Stream Chat disconnected (no session)', tag: 'StreamChat');
      }
      return false;
    }

    // Already connected with the same user — no-op.
    if (client.state.currentUser?.id == session.user.id) return true;

    // Get a Stream Chat token from the edge function.
    final response = await SupabaseClientManager.client.functions.invoke(
      'generate-stream-token',
    );

    // Validate the response — the edge function may not be deployed yet.
    final data = response.data;
    if (data == null || data is! Map || !data.containsKey('stream_token')) {
      AppLogger.warning(
        'Stream Chat edge function returned invalid data: $data',
        tag: 'StreamChat',
      );
      return false;
    }
    final streamToken = data['stream_token'] as String;

    // Fetch the user's display name for Stream Chat.
    final profile = await SupabaseClientManager.client
        .from('profiles')
        .select('prenom')
        .eq('id', session.user.id)
        .maybeSingle();
    final displayName = (profile?['prenom'] as String?) ?? 'Utilisateur';

    await client.connectUser(
      User(id: session.user.id, extraData: {'name': displayName}),
      streamToken,
    );
    AppLogger.info(
      'Stream Chat connected for ${session.user.id}',
      tag: 'StreamChat',
    );
    return true;
  } catch (e, st) {
    // Catch *all* errors (Exception, Error, CORS failures, network errors)
    // so the app never crashes when the edge function is unavailable.
    AppLogger.error(
      'Stream Chat connection failed',
      tag: 'StreamChat',
      error: e,
      stackTrace: st,
    );
    return false;
  }
});
