/// Chat detail screen for a single conversation channel.
///
/// Displays the full messaging interface for a given [channelId]:
/// - An app bar with the partner/channel name and optional [CoachMessageBadge]
/// - A [StreamMessageListView] showing the conversation history
/// - A [StreamMessageInput] composer at the bottom
///
/// The screen resolves the channel by ID from the [StreamChatClient],
/// then wraps the body in a [StreamChannel] widget so that all Stream
/// child widgets have access to the channel state.
library;

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:stream_chat_flutter/stream_chat_flutter.dart';

import 'package:my_muqabala/app.dart';
import 'package:my_muqabala/core/constants/app_colors.dart';
import 'package:my_muqabala/core/constants/app_spacing.dart';
import 'package:my_muqabala/core/constants/app_typography.dart';
import 'package:my_muqabala/core/utils/logger.dart';
import 'package:go_router/go_router.dart';
import 'package:my_muqabala/core/widgets/empty_state.dart';
import 'package:my_muqabala/features/chat/presentation/widgets/coach_message_badge.dart';

/// Full-screen messaging interface for a single channel.
///
/// Receives [channelId] from the router path parameter (already wired
/// in `app_router.dart`).
class ChatDetailScreen extends ConsumerStatefulWidget {
  const ChatDetailScreen({required this.channelId, super.key});

  /// The ID of the chat channel to display.
  final String channelId;

  @override
  ConsumerState<ChatDetailScreen> createState() => _ChatDetailScreenState();
}

class _ChatDetailScreenState extends ConsumerState<ChatDetailScreen> {
  /// The resolved Stream channel instance.
  Channel? _channel;

  /// Whether the channel is still being resolved / watched.
  bool _isLoading = true;

  /// Error message if channel resolution fails.
  String? _errorMessage;

  @override
  void initState() {
    super.initState();
    _initChannel();
  }

  @override
  void dispose() {
    super.dispose();
  }

  // ── Channel initialization ─────────────────────────────────────────────────

  Future<void> _initChannel() async {
    try {
      final client = ref.read(streamChatClientProvider);

      if (client == null) {
        setState(() {
          _isLoading = false;
          _errorMessage = 'Le service de chat n\'est pas disponible.';
        });
        return;
      }

      final currentUser = client.state.currentUser;
      if (currentUser == null) {
        setState(() {
          _isLoading = false;
          _errorMessage = 'Vous n\'êtes pas connecté au service de chat.';
        });
        return;
      }

      AppLogger.info(
        'Resolving channel: ${widget.channelId}',
        tag: 'ChatDetailScreen',
      );

      final channel = client.channel('messaging', id: widget.channelId);

      // Watch the channel to receive real-time updates.
      await channel.watch();

      if (mounted) {
        setState(() {
          _channel = channel;
          _isLoading = false;
        });

        AppLogger.info(
          'Channel "${widget.channelId}" resolved and watched',
          tag: 'ChatDetailScreen',
        );
      }
    } catch (e, st) {
      // Catch all errors (Exception, Error, CORS failures, network errors)
      // so the screen never crashes when Stream Chat is unavailable.
      AppLogger.error(
        'Failed to resolve channel "${widget.channelId}"',
        tag: 'ChatDetailScreen',
        error: e,
        stackTrace: st,
      );

      if (mounted) {
        setState(() {
          _isLoading = false;
          _errorMessage =
              'Impossible d\'ouvrir cette conversation. '
              'Le service de messagerie est en cours de configuration.';
        });
      }
    }
  }

  // ── Build ──────────────────────────────────────────────────────────────────

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    // Loading state
    if (_isLoading) {
      return Scaffold(
        backgroundColor: isDark ? AppColors.darkBg : AppColors.paper,
        appBar: _buildLoadingAppBar(isDark),
        body: const Center(
          child: CircularProgressIndicator(
            valueColor: AlwaysStoppedAnimation<Color>(AppColors.violet),
          ),
        ),
      );
    }

    // Error state
    if (_errorMessage != null || _channel == null) {
      return Scaffold(
        backgroundColor: isDark ? AppColors.darkBg : AppColors.paper,
        appBar: _buildLoadingAppBar(isDark),
        body: EmptyState(
          icon: Icons.chat_bubble_outline_rounded,
          title: 'Conversation indisponible',
          subtitle: _errorMessage ?? 'Une erreur inattendue est survenue.',
          actionLabel: 'Retour',
          onAction: () => context.pop(),
        ),
      );
    }

    // Connected state — wrap with StreamChannel
    return StreamChannel(
      channel: _channel!,
      child: Scaffold(
        backgroundColor: isDark ? AppColors.darkBg : AppColors.surface,
        appBar: _buildChannelAppBar(isDark),
        body: Column(
          children: [
            // ── Message list ──────────────────────────────────────────────
            Expanded(
              child: StreamMessageListView(
                messageBuilder: (context, details, messages, defaultWidget) {
                  return defaultWidget.copyWith(
                    showUserAvatar: DisplayWidget.show,
                  );
                },
              ),
            ),

            // ── Message input ─────────────────────────────────────────────
            Container(
              decoration: BoxDecoration(
                color: isDark ? AppColors.darkSurface : AppColors.surface,
                border: Border(
                  top: BorderSide(
                    color: isDark ? AppColors.darkBorder : AppColors.divider,
                    width: 1,
                  ),
                ),
              ),
              child: SafeArea(
                child: StreamMessageInput(
                  sendButtonLocation: SendButtonLocation.inside,
                  actionsLocation: ActionsLocation.leftInside,
                  disableAttachments: false,
                  idleSendButton: Padding(
                    padding: const EdgeInsets.all(8),
                    child: Icon(
                      Icons.send_rounded,
                      color: AppColors.inkFaint,
                      size: 24,
                    ),
                  ),
                  activeSendButton: Padding(
                    padding: const EdgeInsets.all(8),
                    child: Icon(
                      Icons.send_rounded,
                      color: AppColors.violet,
                      size: 24,
                    ),
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  // ── App bar: loading / error state ─────────────────────────────────────────

  PreferredSizeWidget _buildLoadingAppBar(bool isDark) {
    return AppBar(
      backgroundColor: isDark ? AppColors.darkBg : AppColors.paper,
      surfaceTintColor: Colors.transparent,
      elevation: 0,
      leading: _buildBackButton(isDark),
      title: Text(
        'Conversation',
        style: AppTypography.h3.copyWith(
          color: isDark ? AppColors.darkInk : AppColors.ink,
        ),
      ),
      bottom: PreferredSize(
        preferredSize: const Size.fromHeight(1),
        child: Container(
          height: 1,
          color: isDark ? AppColors.darkBorder : AppColors.divider,
        ),
      ),
    );
  }

  // ── App bar: connected state ───────────────────────────────────────────────

  PreferredSizeWidget _buildChannelAppBar(bool isDark) {
    final partnerName = _resolvePartnerName();
    final isCoach = _isCoachChannel();

    return AppBar(
      backgroundColor: isDark ? AppColors.darkBg : AppColors.paper,
      surfaceTintColor: Colors.transparent,
      elevation: 0,
      leading: _buildBackButton(isDark),
      titleSpacing: 0,
      title: Row(
        children: [
          // Partner avatar
          _buildMiniAvatar(partnerName, isCoach),
          AppSpacing.horizontalSm,

          // Name + badge
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisSize: MainAxisSize.min,
              children: [
                Row(
                  children: [
                    Flexible(
                      child: Text(
                        partnerName,
                        style: AppTypography.h3.copyWith(
                          color: isDark ? AppColors.darkInk : AppColors.ink,
                          fontSize: 18,
                        ),
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                      ),
                    ),
                    if (isCoach) ...[
                      AppSpacing.horizontalSm,
                      const CoachMessageBadge(),
                    ],
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
      bottom: PreferredSize(
        preferredSize: const Size.fromHeight(1),
        child: Container(
          height: 1,
          color: isDark ? AppColors.darkBorder : AppColors.divider,
        ),
      ),
    );
  }

  // ── Back button ────────────────────────────────────────────────────────────

  Widget _buildBackButton(bool isDark) {
    return IconButton(
      onPressed: () => context.pop(),
      icon: Icon(
        Icons.arrow_back_rounded,
        color: isDark ? AppColors.darkInk : AppColors.ink,
      ),
    );
  }

  // ── Mini avatar for app bar ────────────────────────────────────────────────

  Widget _buildMiniAvatar(String name, bool isCoach) {
    final firstLetter = name.isNotEmpty ? name[0].toUpperCase() : '?';

    final bgColor = isCoach ? AppColors.violet : AppColors.violetLight;
    final textColor = isCoach ? Colors.white : AppColors.violet;

    return Container(
      width: 36,
      height: 36,
      decoration: BoxDecoration(
        color: bgColor,
        shape: BoxShape.circle,
      ),
      alignment: Alignment.center,
      child: Text(
        firstLetter,
        style: AppTypography.label.copyWith(
          color: textColor,
          fontSize: 15,
        ),
      ),
    );
  }

  // ── Helpers ────────────────────────────────────────────────────────────────

  /// Resolves the name of the conversation partner.
  ///
  /// For 1:1 channels, finds the member who is not the current user.
  /// Falls back to the channel name or a generic placeholder.
  String _resolvePartnerName() {
    final channel = _channel;
    if (channel == null) return 'Conversation';

    // Explicit channel name
    final explicitName = channel.extraData['name'] as String?;
    if (explicitName != null && explicitName.isNotEmpty) {
      return explicitName;
    }

    // Derive from members
    final client = ref.read(streamChatClientProvider);
    final currentUserId = client?.state.currentUser?.id;
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
  bool _isCoachChannel() {
    final channel = _channel;
    if (channel == null) return false;

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
}
