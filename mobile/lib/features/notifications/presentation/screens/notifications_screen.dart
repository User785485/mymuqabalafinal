/// Full notifications screen listing all in-app notifications.
///
/// Features:
/// - Pull-to-refresh with [RefreshIndicator]
/// - "Tout marquer lu" action button in the app bar
/// - Tap to mark as read + navigate to the notification's deep-link route
/// - Swipe left to delete individual notifications
/// - Loading state with [LoadingSkeletonList]
/// - Empty state with [EmptyState]
///
/// Uses Riverpod [ConsumerWidget] for reactive state management.
library;

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import 'package:my_muqabala/core/constants/app_colors.dart';
import 'package:my_muqabala/core/constants/app_spacing.dart';
import 'package:my_muqabala/core/constants/app_typography.dart';
import 'package:my_muqabala/core/utils/logger.dart';
import 'package:my_muqabala/core/widgets/empty_state.dart';
import 'package:my_muqabala/core/widgets/loading_skeleton.dart';
import 'package:my_muqabala/features/notifications/data/models/notification_model.dart';
import 'package:my_muqabala/features/notifications/presentation/providers/notifications_provider.dart';
import 'package:my_muqabala/features/notifications/presentation/widgets/notification_tile_widget.dart';

/// Screen that displays the full list of user notifications.
class NotificationsScreen extends ConsumerWidget {
  const NotificationsScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final notificationsAsync = ref.watch(notificationsListProvider);

    return Scaffold(
      backgroundColor: AppColors.paper,
      appBar: _buildAppBar(context, ref, notificationsAsync),
      body: notificationsAsync.when(
        loading: () => const LoadingSkeletonList(
          itemCount: 6,
          itemHeight: 80,
          spacing: 8,
        ),
        error: (error, stackTrace) => _buildErrorState(context, ref, error),
        data: (notifications) {
          if (notifications.isEmpty) {
            return _buildEmptyState();
          }
          return _buildNotificationsList(context, ref, notifications);
        },
      ),
    );
  }

  // ── App Bar ──────────────────────────────────────────────────────────────

  PreferredSizeWidget _buildAppBar(
    BuildContext context,
    WidgetRef ref,
    AsyncValue<List<NotificationModel>> notificationsAsync,
  ) {
    // Determine whether we have any unread notifications.
    final hasUnread = notificationsAsync.whenOrNull(
          data: (list) => list.any((n) => !n.isRead),
        ) ??
        false;

    return AppBar(
      title: Text(
        'Notifications',
        style: AppTypography.h2.copyWith(fontSize: 22),
      ),
      centerTitle: false,
      backgroundColor: AppColors.surface,
      surfaceTintColor: Colors.transparent,
      elevation: 0,
      actions: [
        if (hasUnread)
          TextButton(
            onPressed: () => _handleMarkAllRead(ref),
            child: Text(
              'Tout marquer lu',
              style: AppTypography.bodySmall.copyWith(
                color: AppColors.violet,
                fontWeight: FontWeight.w600,
              ),
            ),
          ),
        const SizedBox(width: 8),
      ],
    );
  }

  // ── Notifications List ────────────────────────────────────────────────────

  Widget _buildNotificationsList(
    BuildContext context,
    WidgetRef ref,
    List<NotificationModel> notifications,
  ) {
    return RefreshIndicator(
      color: AppColors.violet,
      onRefresh: () async {
        ref.invalidate(notificationsListProvider);
        ref.invalidate(unreadNotifCountProvider);
      },
      child: ListView.separated(
        physics: const AlwaysScrollableScrollPhysics(),
        padding: AppSpacing.paddingVSm,
        itemCount: notifications.length,
        separatorBuilder: (_, __) => const Divider(
          height: 1,
          indent: 72,
          color: AppColors.divider,
        ),
        itemBuilder: (context, index) {
          final notification = notifications[index];

          return NotificationTile(
            notification: notification,
            onTap: () => _handleNotificationTap(
              context,
              ref,
              notification,
            ),
            onDismissed: () => _handleDeleteNotification(
              context,
              ref,
              notification,
            ),
          );
        },
      ),
    );
  }

  // ── Empty State ──────────────────────────────────────────────────────────

  Widget _buildEmptyState() {
    return const EmptyState(
      icon: Icons.notifications_none_rounded,
      title: 'Aucune notification',
      subtitle: 'Vos notifications apparaîtront ici\nlorsque vous en recevrez.',
    );
  }

  // ── Error State ──────────────────────────────────────────────────────────

  Widget _buildErrorState(BuildContext context, WidgetRef ref, Object error) {
    return EmptyState(
      icon: Icons.error_outline_rounded,
      title: 'Erreur de chargement',
      subtitle: 'Impossible de charger tes notifications.\nR\u00e9essaie.',
      actionLabel: 'Réessayer',
      onAction: () {
        ref.invalidate(notificationsListProvider);
        ref.invalidate(unreadNotifCountProvider);
      },
    );
  }

  // ── Handlers ──────────────────────────────────────────────────────────────

  /// Marks a single notification as read and navigates to its route if present.
  void _handleNotificationTap(
    BuildContext context,
    WidgetRef ref,
    NotificationModel notification,
  ) {
    AppLogger.info(
      'Notification tapped: "${notification.id}" (type=${notification.type})',
      tag: 'NotificationsScreen',
    );

    // Mark as read if not already.
    if (!notification.isRead) {
      ref
          .read(notificationsRepositoryProvider)
          .markAsRead(notification.id)
          .then((_) {
        ref.invalidate(notificationsListProvider);
        ref.invalidate(unreadNotifCountProvider);
      }).catchError((Object error) {
        AppLogger.error(
          'Failed to mark notification as read',
          tag: 'NotificationsScreen',
          error: error,
        );
      });
    }

    // Navigate to the deep-link route if present.
    final routePath = notification.routePath;
    if (routePath != null && routePath.isNotEmpty) {
      AppLogger.debug(
        'Navigating to route: $routePath',
        tag: 'NotificationsScreen',
      );
      context.go(routePath);
    }
  }

  /// Deletes a notification after swipe-to-dismiss and shows an undo snackbar.
  void _handleDeleteNotification(
    BuildContext context,
    WidgetRef ref,
    NotificationModel notification,
  ) {
    AppLogger.info(
      'Notification dismissed: "${notification.id}"',
      tag: 'NotificationsScreen',
    );

    ref
        .read(notificationsRepositoryProvider)
        .deleteNotification(notification.id)
        .then((_) {
      ref.invalidate(notificationsListProvider);
      ref.invalidate(unreadNotifCountProvider);
    }).catchError((Object error) {
      AppLogger.error(
        'Failed to delete notification',
        tag: 'NotificationsScreen',
        error: error,
      );
    });

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(
          'Notification supprimée',
          style: AppTypography.bodySmall.copyWith(color: Colors.white),
        ),
        backgroundColor: AppColors.ink,
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(
          borderRadius: AppRadius.borderMd,
        ),
        duration: const Duration(seconds: 3),
      ),
    );
  }

  /// Marks all notifications as read via the action notifier.
  void _handleMarkAllRead(WidgetRef ref) {
    AppLogger.info(
      'Mark all notifications as read requested',
      tag: 'NotificationsScreen',
    );

    ref.read(markAllReadNotifierProvider.notifier).markAllRead();
  }
}
