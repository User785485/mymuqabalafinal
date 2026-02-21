/// Riverpod providers for the notifications feature.
///
/// Exposes:
/// - [notificationsRepositoryProvider] : the [NotificationsRepository] singleton
/// - [notificationsListProvider]       : paginated list of notifications
/// - [unreadNotifCountProvider]        : total unread notification count
/// - [markAllReadNotifierProvider]     : action notifier to mark all as read
library;

import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

import 'package:my_muqabala/core/utils/logger.dart';
import 'package:my_muqabala/features/notifications/data/models/notification_model.dart';
import 'package:my_muqabala/features/notifications/data/repositories/notifications_repository.dart';

// ═══════════════════════════════════════════════════════════════════════════════
// Repository provider
// ═══════════════════════════════════════════════════════════════════════════════

/// Provides the [NotificationsRepository] backed by the live Supabase client.
final notificationsRepositoryProvider = Provider<NotificationsRepository>((ref) {
  return NotificationsRepository(Supabase.instance.client);
});

// ═══════════════════════════════════════════════════════════════════════════════
// Notifications list provider
// ═══════════════════════════════════════════════════════════════════════════════

/// Fetches the current user's notifications list, ordered newest first.
///
/// Returns an empty list if no user is authenticated.
/// Auto-disposed when the widget tree no longer watches it.
final notificationsListProvider =
    FutureProvider.autoDispose<List<NotificationModel>>((ref) async {
  try {
    final userId = Supabase.instance.client.auth.currentUser?.id;

    if (userId == null) {
      AppLogger.debug(
        'No authenticated user — returning empty notifications list',
        tag: 'NotificationsProvider',
      );
      return [];
    }

    final repo = ref.watch(notificationsRepositoryProvider);
    return repo.getNotifications(userId);
  } on Exception catch (e, st) {
    AppLogger.error(
      'Failed to load notifications list',
      tag: 'NotificationsProvider',
      error: e,
      stackTrace: st,
    );
    return [];
  }
});

// ═══════════════════════════════════════════════════════════════════════════════
// Unread count provider
// ═══════════════════════════════════════════════════════════════════════════════

/// Total number of unread notifications for the current user.
///
/// Returns `0` if no user is authenticated or on error.
final unreadNotifCountProvider = FutureProvider.autoDispose<int>((ref) async {
  try {
    final userId = Supabase.instance.client.auth.currentUser?.id;

    if (userId == null) {
      AppLogger.debug(
        'No authenticated user — returning 0 unread notifications',
        tag: 'NotificationsProvider',
      );
      return 0;
    }

    final repo = ref.watch(notificationsRepositoryProvider);
    return repo.getUnreadCount(userId);
  } on Exception catch (e, st) {
    AppLogger.error(
      'Failed to read unread notification count',
      tag: 'NotificationsProvider',
      error: e,
      stackTrace: st,
    );
    return 0;
  }
});

// ═══════════════════════════════════════════════════════════════════════════════
// Mark all read notifier
// ═══════════════════════════════════════════════════════════════════════════════

/// An action-based [AsyncNotifier] that marks all notifications as read.
///
/// Usage:
/// ```dart
/// ref.read(markAllReadNotifierProvider.notifier).markAllRead();
/// ```
final markAllReadNotifierProvider =
    AsyncNotifierProvider.autoDispose<MarkAllReadNotifier, void>(
  MarkAllReadNotifier.new,
);

/// Notifier that exposes a [markAllRead] action.
class MarkAllReadNotifier extends AsyncNotifier<void> {
  @override
  Future<void> build() async {
    // No initial load needed — this is an action-only notifier.
  }

  /// Marks all unread notifications as read for the current user,
  /// then invalidates the list and count providers to refresh the UI.
  Future<void> markAllRead() async {
    final userId = Supabase.instance.client.auth.currentUser?.id;
    if (userId == null) return;

    state = const AsyncLoading();

    try {
      final repo = ref.read(notificationsRepositoryProvider);
      await repo.markAllAsRead(userId);

      AppLogger.info(
        'All notifications marked as read for user "$userId"',
        tag: 'NotificationsProvider',
      );

      // Refresh dependent providers.
      ref.invalidate(notificationsListProvider);
      ref.invalidate(unreadNotifCountProvider);

      state = const AsyncData(null);
    } on Exception catch (e, st) {
      AppLogger.error(
        'Failed to mark all notifications as read',
        tag: 'NotificationsProvider',
        error: e,
        stackTrace: st,
      );
      state = AsyncError(e, st);
    }
  }
}
