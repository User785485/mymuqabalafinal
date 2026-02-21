/// Custom channel list tile for the chat list screen.
///
/// Renders a single row with:
/// - A circular avatar showing the first letter of the channel/partner name
/// - The channel display name (with optional [CoachMessageBadge])
/// - A preview of the last message (or "Aucun message" placeholder)
/// - A relative timestamp for the last message
/// - An unread count badge if there are unread messages
///
/// ```dart
/// ChannelTileWidget(
///   channel: streamChannel,
///   currentUserId: 'abc-123',
///   onTap: () => navigateToDetail(streamChannel.id!),
/// )
/// ```
library;

import 'package:flutter/material.dart';
import 'package:stream_chat_flutter/stream_chat_flutter.dart';

import 'package:my_muqabala/core/constants/app_colors.dart';
import 'package:my_muqabala/core/constants/app_spacing.dart';
import 'package:my_muqabala/core/constants/app_typography.dart';
import 'package:my_muqabala/core/utils/date_utils.dart';
import 'package:my_muqabala/features/chat/presentation/widgets/coach_message_badge.dart';

/// A single tile representing a chat channel in the channel list.
class ChannelTileWidget extends StatelessWidget {
  const ChannelTileWidget({
    required this.channel,
    required this.currentUserId,
    this.onTap,
    super.key,
  });

  /// The Stream Chat channel this tile represents.
  final Channel channel;

  /// The current authenticated user's ID (used to derive the partner name).
  final String currentUserId;

  /// Callback when the tile is tapped.
  final VoidCallback? onTap;

  // ── Build ──────────────────────────────────────────────────────────────────

  @override
  Widget build(BuildContext context) {
    final channelName = _resolveChannelName();
    final lastMessage = channel.state?.lastMessage;
    final unreadCount = channel.state?.unreadCount ?? 0;
    final isCoachChannel = _isCoachChannel();

    return InkWell(
      onTap: onTap,
      child: Container(
        padding: AppSpacing.listItemPadding,
        child: Row(
          children: [
            // ── Avatar ──────────────────────────────────────────────────
            _ChannelAvatar(
              channelName: channelName,
              isCoach: isCoachChannel,
            ),

            AppSpacing.horizontalMd,

            // ── Text content ────────────────────────────────────────────
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisSize: MainAxisSize.min,
                children: [
                  // Channel name + coach badge
                  Row(
                    children: [
                      Flexible(
                        child: Text(
                          channelName,
                          style: unreadCount > 0
                              ? AppTypography.label
                              : AppTypography.bodyMedium.copyWith(
                                  fontWeight: FontWeight.w500,
                                ),
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                        ),
                      ),
                      if (isCoachChannel) ...[
                        AppSpacing.horizontalSm,
                        const CoachMessageBadge(),
                      ],
                    ],
                  ),

                  const SizedBox(height: 2),

                  // Last message preview
                  Text(
                    _formatLastMessage(lastMessage),
                    style: unreadCount > 0
                        ? AppTypography.bodySmall.copyWith(
                            color: AppColors.ink,
                            fontWeight: FontWeight.w500,
                          )
                        : AppTypography.bodySmall.copyWith(
                            color: AppColors.inkMuted,
                          ),
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                  ),
                ],
              ),
            ),

            AppSpacing.horizontalSm,

            // ── Trailing: timestamp + unread badge ──────────────────────
            Column(
              crossAxisAlignment: CrossAxisAlignment.end,
              mainAxisSize: MainAxisSize.min,
              children: [
                // Timestamp
                if (lastMessage?.createdAt != null)
                  Text(
                    AppDateUtils.formatRelative(
                      lastMessage!.createdAt.toLocal(),
                    ),
                    style: unreadCount > 0
                        ? AppTypography.caption.copyWith(
                            color: AppColors.violet,
                            fontWeight: FontWeight.w600,
                          )
                        : AppTypography.caption,
                  ),

                if (unreadCount > 0) ...[
                  const SizedBox(height: 4),
                  _UnreadBadge(count: unreadCount),
                ],
              ],
            ),
          ],
        ),
      ),
    );
  }

  // ── Helpers ────────────────────────────────────────────────────────────────

  /// Resolves the display name for the channel.
  ///
  /// Priority:
  /// 1. Explicit channel name (set by admin/coach)
  /// 2. Partner's name (for 1:1 channels, the other member's name)
  /// 3. Fallback to "Conversation"
  String _resolveChannelName() {
    // Explicit name
    final explicitName = channel.extraData['name'] as String?;
    if (explicitName != null && explicitName.isNotEmpty) {
      return explicitName;
    }

    // Derive from members (exclude self)
    final members = channel.state?.members ?? [];
    final otherMembers = members.where(
      (m) => m.userId != currentUserId,
    );

    if (otherMembers.isNotEmpty) {
      final partner = otherMembers.first;
      final partnerName = partner.user?.name;
      if (partnerName != null && partnerName.isNotEmpty) {
        return partnerName;
      }
    }

    return 'Conversation';
  }

  /// Determines if this channel involves a coach.
  ///
  /// Checks the channel's extra data for a `is_coach` flag, or whether
  /// any member has a `role` of `coach` in their extra data.
  bool _isCoachChannel() {
    // Check channel-level flag
    if (channel.extraData['is_coach'] == true) return true;

    // Check member roles
    final members = channel.state?.members ?? [];
    for (final member in members) {
      if (member.user?.role == 'admin' || member.user?.role == 'coach') {
        return true;
      }
      if (member.user?.extraData['role'] == 'coach') {
        return true;
      }
    }

    return false;
  }

  /// Formats the last message for preview display.
  String _formatLastMessage(Message? message) {
    if (message == null) return 'Aucun message';

    // Attachment-only messages
    if (message.text == null || message.text!.isEmpty) {
      if (message.attachments.isNotEmpty) {
        final type = message.attachments.first.type;
        return switch (type) {
          'image' => '\u{1F4F7} Photo',
          'video' => '\u{1F3AC} Vidéo',
          'audio' || 'voicenote' => '\u{1F3A4} Message vocal',
          'file' => '\u{1F4CE} Fichier',
          _ => '\u{1F4CE} Pièce jointe',
        };
      }
      return 'Aucun message';
    }

    return message.text!;
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// Channel avatar sub-widget
// ═══════════════════════════════════════════════════════════════════════════════

class _ChannelAvatar extends StatelessWidget {
  const _ChannelAvatar({
    required this.channelName,
    required this.isCoach,
  });

  final String channelName;
  final bool isCoach;

  @override
  Widget build(BuildContext context) {
    final firstLetter = channelName.isNotEmpty
        ? channelName[0].toUpperCase()
        : '?';

    final bgColor = isCoach
        ? AppColors.violet
        : AppColors.violetLight;

    final textColor = isCoach
        ? Colors.white
        : AppColors.violet;

    return Container(
      width: 52,
      height: 52,
      decoration: BoxDecoration(
        color: bgColor,
        shape: BoxShape.circle,
      ),
      alignment: Alignment.center,
      child: Text(
        firstLetter,
        style: AppTypography.h2.copyWith(
          color: textColor,
          fontSize: 22,
        ),
      ),
    );
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// Unread badge sub-widget
// ═══════════════════════════════════════════════════════════════════════════════

class _UnreadBadge extends StatelessWidget {
  const _UnreadBadge({required this.count});

  final int count;

  @override
  Widget build(BuildContext context) {
    final displayText = count > 99 ? '99+' : count.toString();

    return Container(
      constraints: const BoxConstraints(
        minWidth: 20,
        minHeight: 20,
      ),
      padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
      decoration: const BoxDecoration(
        color: AppColors.violet,
        borderRadius: BorderRadius.all(Radius.circular(10)),
      ),
      alignment: Alignment.center,
      child: Text(
        displayText,
        style: const TextStyle(
          fontFamily: 'Outfit',
          fontSize: 11,
          fontWeight: FontWeight.w700,
          color: Colors.white,
          height: 1.2,
        ),
      ),
    );
  }
}
