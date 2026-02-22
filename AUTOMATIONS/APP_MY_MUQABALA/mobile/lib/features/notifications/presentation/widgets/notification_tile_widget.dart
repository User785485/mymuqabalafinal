/// A single notification row displayed in the notifications list.
///
/// Features:
/// - Colored icon circle matching the notification [type]
/// - Bold title when unread, normal weight when read
/// - Relative time display ("Il y a 2h", "Hier", etc.)
/// - Subtle background tint for unread notifications
/// - Swipe-to-delete via [Dismissible]
///
/// ```dart
/// NotificationTile(
///   notification: notif,
///   onTap: () => handleTap(notif),
///   onDismissed: () => handleDelete(notif.id),
/// )
/// ```
library;

import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

import 'package:my_muqabala/core/constants/app_colors.dart';
import 'package:my_muqabala/core/constants/app_spacing.dart';
import 'package:my_muqabala/core/constants/app_typography.dart';
import 'package:my_muqabala/features/notifications/data/models/notification_model.dart';

/// Displays a single notification as a list tile with type-based styling.
class NotificationTile extends StatelessWidget {
  const NotificationTile({
    required this.notification,
    required this.onTap,
    required this.onDismissed,
    super.key,
  });

  /// The notification data to display.
  final NotificationModel notification;

  /// Called when the tile is tapped.
  final VoidCallback onTap;

  /// Called when the tile is swiped away (dismissed).
  final VoidCallback onDismissed;

  @override
  Widget build(BuildContext context) {
    return Dismissible(
      key: ValueKey(notification.id),
      direction: DismissDirection.endToStart,
      onDismissed: (_) => onDismissed(),
      background: _buildDismissBackground(),
      child: Material(
        color: notification.isRead
            ? Colors.transparent
            : notification.typeBgColor.withValues(alpha: 0.10),
        child: InkWell(
          onTap: onTap,
          child: Padding(
            padding: AppSpacing.listItemPadding,
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // ── Leading: type icon in colored circle ─────────────────
                _buildLeadingIcon(),

                AppSpacing.horizontalMd,

                // ── Content: title + message ────────────────────────────
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      // Title
                      Text(
                        notification.titre,
                        style: notification.isRead
                            ? AppTypography.bodyMedium
                            : AppTypography.label,
                        maxLines: 2,
                        overflow: TextOverflow.ellipsis,
                      ),

                      const SizedBox(height: 4),

                      // Message
                      Text(
                        notification.message,
                        style: AppTypography.bodySmall.copyWith(
                          color: AppColors.inkMuted,
                        ),
                        maxLines: 2,
                        overflow: TextOverflow.ellipsis,
                      ),
                    ],
                  ),
                ),

                AppSpacing.horizontalSm,

                // ── Trailing: relative time + unread dot ────────────────
                Column(
                  crossAxisAlignment: CrossAxisAlignment.end,
                  children: [
                    Text(
                      _formatRelativeTime(notification.createdAt),
                      style: AppTypography.caption,
                    ),

                    if (!notification.isRead) ...[
                      const SizedBox(height: 8),
                      Container(
                        width: 8,
                        height: 8,
                        decoration: BoxDecoration(
                          color: notification.typeColor,
                          shape: BoxShape.circle,
                        ),
                      ),
                    ],
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  // ── Leading icon builder ────────────────────────────────────────────────

  Widget _buildLeadingIcon() {
    return Container(
      width: 44,
      height: 44,
      decoration: BoxDecoration(
        color: notification.typeBgColor,
        shape: BoxShape.circle,
      ),
      child: Icon(
        notification.typeIcon,
        size: 22,
        color: notification.typeColor,
      ),
    );
  }

  // ── Dismiss background ──────────────────────────────────────────────────

  Widget _buildDismissBackground() {
    return Container(
      alignment: Alignment.centerRight,
      padding: const EdgeInsets.only(right: 24),
      color: AppColors.error,
      child: const Icon(
        Icons.delete_outline_rounded,
        color: Colors.white,
        size: 24,
      ),
    );
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// Relative time helper
// ═══════════════════════════════════════════════════════════════════════════════

/// Formats a [DateTime] into a human-readable relative time string in French.
///
/// Examples:
/// - Less than 1 minute ago   → `"À l'instant"`
/// - 5 minutes ago            → `"Il y a 5 min"`
/// - 3 hours ago              → `"Il y a 3h"`
/// - Yesterday                → `"Hier"`
/// - 4 days ago               → `"Il y a 4j"`
/// - Older than 7 days        → formatted date (e.g. `"15 janv. 2026"`)
String _formatRelativeTime(DateTime dateTime) {
  final diff = DateTime.now().difference(dateTime);

  if (diff.inMinutes < 1) return '\u00C0 l\u0027instant';
  if (diff.inMinutes < 60) return 'Il y a ${diff.inMinutes} min';
  if (diff.inHours < 24) return 'Il y a ${diff.inHours}h';
  if (diff.inDays == 1) return 'Hier';
  if (diff.inDays < 7) return 'Il y a ${diff.inDays}j';

  return DateFormat.yMMMd('fr_FR').format(dateTime);
}
