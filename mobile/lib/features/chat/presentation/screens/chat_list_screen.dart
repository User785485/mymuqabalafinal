/// Chat screen — direct messaging with the coach.
///
/// No conversation list. Opens directly to the message thread.
/// If no channel exists yet, auto-creates one via edge function
/// and shows the input immediately so the client can type.
library;

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:stream_chat_flutter/stream_chat_flutter.dart';

import 'package:my_muqabala/app.dart';
import 'package:my_muqabala/core/constants/app_colors.dart';
import 'package:my_muqabala/core/providers/stream_connection_provider.dart';
import 'package:my_muqabala/core/constants/app_spacing.dart';
import 'package:my_muqabala/core/constants/app_typography.dart';
import 'package:my_muqabala/core/utils/logger.dart';
import 'package:my_muqabala/core/network/supabase_client.dart';
import 'package:my_muqabala/core/widgets/empty_state.dart';
import 'package:my_muqabala/features/chat/data/repositories/chat_repository.dart';
import 'package:my_muqabala/features/chat/presentation/widgets/coach_message_badge.dart';

/// Direct chat screen displayed as the "Chat" tab.
class ChatListScreen extends ConsumerStatefulWidget {
  const ChatListScreen({super.key});

  @override
  ConsumerState<ChatListScreen> createState() => _ChatListScreenState();
}

class _ChatListScreenState extends ConsumerState<ChatListScreen> {
  Channel? _channel;
  bool _isLoadingChannel = true;
  String? _errorMessage;

  @override
  void dispose() {
    super.dispose();
  }

  // ── Build ──────────────────────────────────────────────────────────────────

  @override
  Widget build(BuildContext context) {
    final client = ref.watch(streamChatClientProvider);
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final connectionState = ref.watch(streamConnectionProvider);

    return Scaffold(
      backgroundColor: isDark ? AppColors.darkBg : AppColors.paper,
      body: _buildBody(client, isDark, connectionState),
    );
  }

  // ── Body ───────────────────────────────────────────────────────────────────

  Widget _buildBody(
    StreamChatClient? client,
    bool isDark,
    AsyncValue<bool> connectionState,
  ) {
    // Not configured
    if (client == null) {
      return _wrapWithAppBar(
        isDark,
        const EmptyState(
          icon: Icons.chat_bubble_outline_rounded,
          title: 'Chat non disponible',
          subtitle: 'Le service de messagerie n\'est pas encore configuré.',
        ),
      );
    }

    // Connection error
    if (connectionState is AsyncError) {
      return _wrapWithAppBar(isDark, _buildServiceUnavailable());
    }

    // Still connecting
    if (connectionState is AsyncLoading) {
      return _wrapWithAppBar(isDark, _buildConnectingState(isDark));
    }

    // Not connected
    final isConnected = connectionState.value ?? false;
    if (!isConnected) {
      return _wrapWithAppBar(isDark, _buildServiceUnavailable());
    }

    final currentUser = client.state.currentUser;
    if (currentUser == null) {
      return _wrapWithAppBar(isDark, _buildServiceUnavailable());
    }

    // Connected — load channel and show messages directly
    _ensureChannelLoaded(client, currentUser);

    if (_isLoadingChannel) {
      return _wrapWithAppBar(isDark, _buildConnectingState(isDark));
    }

    if (_errorMessage != null) {
      return _wrapWithAppBar(
        isDark,
        EmptyState(
          icon: Icons.error_outline_rounded,
          title: 'Erreur',
          subtitle: _errorMessage!,
          actionLabel: 'Réessayer',
          onAction: () {
            setState(() {
              _isLoadingChannel = true;
              _errorMessage = null;
              _channel = null;
            });
          },
        ),
      );
    }

    if (_channel == null) {
      return _wrapWithAppBar(isDark, _buildConnectingState(isDark));
    }

    // Show messages directly
    return _buildDirectChat(_channel!, isDark);
  }

  // ── Ensure channel is loaded (called from build) ──────────────────────────

  bool _loadingInProgress = false;

  void _ensureChannelLoaded(StreamChatClient client, User currentUser) {
    if (_channel != null || _errorMessage != null || _loadingInProgress) return;
    _loadingInProgress = true;

    // Run async loading after the build frame
    Future.microtask(() => _loadOrCreateChannel(client, currentUser));
  }

  Future<void> _loadOrCreateChannel(
    StreamChatClient client,
    User currentUser,
  ) async {
    try {
      AppLogger.info(
        'Loading coaching channel for ${currentUser.id}',
        tag: 'ChatListScreen',
      );

      // Query existing channels
      final channels = await client.queryChannels(
        filter: Filter.in_('members', [currentUser.id]),
        channelStateSort: const [SortOption('last_message_at')],
        paginationParams: const PaginationParams(limit: 1),
      ).first;

      if (channels.isNotEmpty) {
        // Found existing channel — use it
        final channel = channels.first;
        await channel.watch();

        if (mounted) {
          setState(() {
            _channel = channel;
            _isLoadingChannel = false;
            _loadingInProgress = false;
          });
        }
        return;
      }

      // No channel — auto-create one via edge function
      AppLogger.info(
        'No channel found, auto-creating coaching channel',
        tag: 'ChatListScreen',
      );

      final repo = ChatRepository(SupabaseClientManager.client);
      final channelId = await repo.createCoachingChannel(
        client,
        currentUser.id,
      );

      if (channelId == null) {
        if (mounted) {
          setState(() {
            _errorMessage =
                'Impossible de configurer le chat. Réessayez plus tard.';
            _isLoadingChannel = false;
            _loadingInProgress = false;
          });
        }
        return;
      }

      // Watch the newly created channel
      final channel = client.channel('messaging', id: channelId);
      await channel.watch();

      if (mounted) {
        setState(() {
          _channel = channel;
          _isLoadingChannel = false;
          _loadingInProgress = false;
        });
      }
    } catch (e, st) {
      AppLogger.error(
        'Failed to load/create coaching channel',
        tag: 'ChatListScreen',
        error: e,
        stackTrace: st,
      );

      if (mounted) {
        setState(() {
          _errorMessage = 'Erreur de connexion au chat. Réessayez.';
          _isLoadingChannel = false;
          _loadingInProgress = false;
        });
      }
    }
  }

  // ── Direct chat UI (messages + input) ─────────────────────────────────────

  Widget _buildDirectChat(Channel channel, bool isDark) {
    final partnerName = _resolvePartnerName(channel);

    return StreamChannel(
      channel: channel,
      child: Column(
        children: [
          // App bar
          _buildChatAppBar(isDark, partnerName),

          // Messages
          Expanded(
            child: StreamMessageListView(
              messageBuilder: (context, details, messages, defaultWidget) {
                return defaultWidget.copyWith(
                  showUserAvatar: DisplayWidget.show,
                );
              },
            ),
          ),

          // Input
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
    );
  }

  // ── App bars ──────────────────────────────────────────────────────────────

  Widget _buildChatAppBar(bool isDark, String partnerName) {
    final firstLetter =
        partnerName.isNotEmpty ? partnerName[0].toUpperCase() : '?';

    return Container(
      padding: EdgeInsets.only(
        top: MediaQuery.of(context).padding.top,
      ),
      decoration: BoxDecoration(
        color: isDark ? AppColors.darkBg : AppColors.paper,
        border: Border(
          bottom: BorderSide(
            color: isDark ? AppColors.darkBorder : AppColors.divider,
            width: 1,
          ),
        ),
      ),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
        child: Row(
          children: [
            // Coach avatar
            Container(
              width: 40,
              height: 40,
              decoration: BoxDecoration(
                color: AppColors.violet,
                shape: BoxShape.circle,
              ),
              alignment: Alignment.center,
              child: Text(
                firstLetter,
                style: AppTypography.label.copyWith(
                  color: Colors.white,
                  fontSize: 16,
                ),
              ),
            ),
            AppSpacing.horizontalSm,
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
                      AppSpacing.horizontalSm,
                      const CoachMessageBadge(),
                    ],
                  ),
                  Text(
                    'Ton accompagnant',
                    style: AppTypography.caption.copyWith(
                      color:
                          isDark ? AppColors.darkInkMuted : AppColors.inkMuted,
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _wrapWithAppBar(bool isDark, Widget body) {
    return Column(
      children: [
        Container(
          padding: EdgeInsets.only(
            top: MediaQuery.of(context).padding.top,
          ),
          decoration: BoxDecoration(
            color: isDark ? AppColors.darkBg : AppColors.paper,
            border: Border(
              bottom: BorderSide(
                color: isDark ? AppColors.darkBorder : AppColors.divider,
                width: 1,
              ),
            ),
          ),
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
            child: Row(
              children: [
                Text(
                  'Chat',
                  style: AppTypography.h2.copyWith(
                    color: isDark ? AppColors.darkInk : AppColors.ink,
                  ),
                ),
              ],
            ),
          ),
        ),
        Expanded(child: body),
      ],
    );
  }

  // ── States ────────────────────────────────────────────────────────────────

  Widget _buildConnectingState(bool isDark) {
    return Center(
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          SizedBox(
            width: 32,
            height: 32,
            child: CircularProgressIndicator(
              strokeWidth: 3,
              valueColor: AlwaysStoppedAnimation<Color>(AppColors.violet),
            ),
          ),
          AppSpacing.gapMd,
          Text(
            'Connexion au chat...',
            style: AppTypography.bodyMedium.copyWith(
              color: isDark ? AppColors.darkInkMuted : AppColors.inkMuted,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildServiceUnavailable() {
    return const EmptyState(
      icon: Icons.chat_bubble_outline_rounded,
      title: 'Chat bientôt disponible',
      subtitle:
          'Le service de messagerie est en cours de configuration. '
          'Vous serez notifié(e) dès qu\'il sera disponible.',
    );
  }

  // ── Helpers ───────────────────────────────────────────────────────────────

  String _resolvePartnerName(Channel channel) {
    final explicitName = channel.extraData['name'] as String?;
    if (explicitName != null && explicitName.isNotEmpty) {
      // Strip "Coaching - " prefix
      if (explicitName.startsWith('Coaching - ')) {
        return explicitName.substring(11);
      }
      return explicitName;
    }

    final client = ref.read(streamChatClientProvider);
    final currentUserId = client?.state.currentUser?.id;
    final members = channel.state?.members ?? [];

    final otherMembers = members.where((m) => m.userId != currentUserId);
    if (otherMembers.isNotEmpty) {
      final partner = otherMembers.first;
      final name = partner.user?.name;
      if (name != null && name.isNotEmpty) return name;
    }

    return 'Mon coach';
  }
}
