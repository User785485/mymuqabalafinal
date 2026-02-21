/// Riverpod providers for the chat feature.
///
/// Exposes:
/// - [chatRepositoryProvider] : the [ChatRepository] backed by the live Supabase client
/// - [unreadChatCountProvider] : total unread message count from Stream Chat
library;

import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

import 'package:my_muqabala/app.dart';
import 'package:my_muqabala/core/utils/logger.dart';
import 'package:my_muqabala/features/chat/data/repositories/chat_repository.dart';

// ═══════════════════════════════════════════════════════════════════════════════
// Repository provider
// ═══════════════════════════════════════════════════════════════════════════════

/// Provides the [ChatRepository] backed by the live Supabase client.
final chatRepositoryProvider = Provider<ChatRepository>((ref) {
  return ChatRepository(Supabase.instance.client);
});

// ═══════════════════════════════════════════════════════════════════════════════
// Unread count provider
// ═══════════════════════════════════════════════════════════════════════════════

/// Real-time stream of unread chat messages across all channels.
///
/// Listens to Stream Chat client events and emits the latest
/// `totalUnreadCount` whenever it changes. Used by the chat FAB badge.
///
/// Returns `0` if the client is not configured or no user is connected.
final unreadChatStreamProvider = StreamProvider.autoDispose<int>((ref) {
  final client = ref.watch(streamChatClientProvider);
  if (client == null) return Stream.value(0);
  if (client.state.currentUser == null) return Stream.value(0);
  return client.on().map((_) => client.state.totalUnreadCount).distinct();
});

/// Total number of unread chat messages across all channels.
///
/// Returns `0` if:
/// - The Stream Chat client is not configured (null)
/// - No user is currently connected
/// - An error occurs while reading the state
///
/// The provider is `autoDispose` so it cleans up when the widget tree no
/// longer watches it.
final unreadChatCountProvider = FutureProvider.autoDispose<int>((ref) async {
  try {
    final client = ref.watch(streamChatClientProvider);

    if (client == null) {
      AppLogger.debug(
        'Stream client is null — returning 0 unread',
        tag: 'ChatProvider',
      );
      return 0;
    }

    final currentUser = client.state.currentUser;
    if (currentUser == null) {
      AppLogger.debug(
        'No connected Stream user — returning 0 unread',
        tag: 'ChatProvider',
      );
      return 0;
    }

    final totalUnread = client.state.totalUnreadCount;

    AppLogger.debug(
      'Total unread chat count: $totalUnread',
      tag: 'ChatProvider',
    );

    return totalUnread;
  } on Exception catch (e, st) {
    AppLogger.error(
      'Failed to read unread chat count',
      tag: 'ChatProvider',
      error: e,
      stackTrace: st,
    );
    return 0;
  }
});
