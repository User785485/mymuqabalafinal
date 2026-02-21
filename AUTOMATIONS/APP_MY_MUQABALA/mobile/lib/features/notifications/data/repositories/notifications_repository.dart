/// Repository for notification CRUD operations against Supabase.
///
/// All queries target the `notifications` table and filter by `user_id`.
///
/// ```dart
/// final repo = NotificationsRepository(Supabase.instance.client);
/// final list = await repo.getNotifications(userId);
/// await repo.markAllAsRead(userId);
/// ```
library;

import 'package:supabase_flutter/supabase_flutter.dart';

import 'package:my_muqabala/core/utils/logger.dart';
import 'package:my_muqabala/features/notifications/data/models/notification_model.dart';

/// Handles all Supabase interactions for the notifications feature.
class NotificationsRepository {
  /// Creates a repository backed by the given [SupabaseClient].
  NotificationsRepository(this._supabase);

  final SupabaseClient _supabase;

  /// The Supabase table name.
  static const _table = 'notifications';

  // ── Read ──────────────────────────────────────────────────────────────────

  /// Fetches a paginated list of notifications for [userId].
  ///
  /// Results are ordered by `created_at` descending (newest first).
  /// Use [limit] and [offset] for pagination.
  Future<List<NotificationModel>> getNotifications(
    String userId, {
    int limit = 50,
    int offset = 0,
  }) async {
    try {
      AppLogger.info(
        'Fetching notifications for user "$userId" (limit=$limit, offset=$offset)',
        tag: 'NotificationsRepo',
      );

      final response = await _supabase
          .from(_table)
          .select()
          .eq('user_id', userId)
          .order('created_at', ascending: false)
          .range(offset, offset + limit - 1);

      final notifications = (response as List<dynamic>)
          .map((row) =>
              NotificationModel.fromJson(row as Map<String, dynamic>))
          .toList();

      AppLogger.info(
        'Fetched ${notifications.length} notifications',
        tag: 'NotificationsRepo',
      );

      return notifications;
    } on Exception catch (e, st) {
      AppLogger.error(
        'Failed to fetch notifications for user "$userId"',
        tag: 'NotificationsRepo',
        error: e,
        stackTrace: st,
      );
      rethrow;
    }
  }

  // ── Mark as read (single) ─────────────────────────────────────────────────

  /// Marks a single notification as read by its [notifId].
  Future<void> markAsRead(String notifId) async {
    try {
      AppLogger.info(
        'Marking notification "$notifId" as read',
        tag: 'NotificationsRepo',
      );

      await _supabase
          .from(_table)
          .update({'is_read': true})
          .eq('id', notifId);
    } on Exception catch (e, st) {
      AppLogger.error(
        'Failed to mark notification "$notifId" as read',
        tag: 'NotificationsRepo',
        error: e,
        stackTrace: st,
      );
      rethrow;
    }
  }

  // ── Mark all as read ──────────────────────────────────────────────────────

  /// Marks all unread notifications for [userId] as read.
  Future<void> markAllAsRead(String userId) async {
    try {
      AppLogger.info(
        'Marking all notifications as read for user "$userId"',
        tag: 'NotificationsRepo',
      );

      await _supabase
          .from(_table)
          .update({'is_read': true})
          .eq('user_id', userId)
          .eq('is_read', false);
    } on Exception catch (e, st) {
      AppLogger.error(
        'Failed to mark all notifications as read for user "$userId"',
        tag: 'NotificationsRepo',
        error: e,
        stackTrace: st,
      );
      rethrow;
    }
  }

  // ── Unread count ──────────────────────────────────────────────────────────

  /// Returns the number of unread notifications for [userId].
  Future<int> getUnreadCount(String userId) async {
    try {
      final response = await _supabase
          .from(_table)
          .select()
          .eq('user_id', userId)
          .eq('is_read', false)
          .count(CountOption.exact);

      final count = response.count;

      AppLogger.debug(
        'Unread notification count for user "$userId": $count',
        tag: 'NotificationsRepo',
      );

      return count;
    } on Exception catch (e, st) {
      AppLogger.error(
        'Failed to get unread count for user "$userId"',
        tag: 'NotificationsRepo',
        error: e,
        stackTrace: st,
      );
      rethrow;
    }
  }

  // ── Delete ────────────────────────────────────────────────────────────────

  /// Permanently deletes a notification by its [notifId].
  Future<void> deleteNotification(String notifId) async {
    try {
      AppLogger.info(
        'Deleting notification "$notifId"',
        tag: 'NotificationsRepo',
      );

      await _supabase.from(_table).delete().eq('id', notifId);
    } on Exception catch (e, st) {
      AppLogger.error(
        'Failed to delete notification "$notifId"',
        tag: 'NotificationsRepo',
        error: e,
        stackTrace: st,
      );
      rethrow;
    }
  }
}
