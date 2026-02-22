/// Chat list screen showing all conversations for the authenticated user.
///
/// Uses the Stream Chat SDK to display a real-time list of channels.
/// The screen handles three states:
/// 1. **Client null** : Stream Chat not configured — shows an [EmptyState]
/// 2. **No connected user** : Waiting for connection — shows a loading indicator
/// 3. **Connected** : Renders [StreamChannelListView] with custom tile styling
///
/// Navigation: tapping a channel pushes [RouteNames.chatDetail] with the
/// channel ID as a path parameter.
library;

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:stream_chat_flutter/stream_chat_flutter.dart';

import 'package:my_muqabala/app.dart';
import 'package:my_muqabala/core/constants/app_colors.dart';
import 'package:my_muqabala/core/providers/stream_connection_provider.dart';
import 'package:my_muqabala/core/constants/app_spacing.dart';
import 'package:my_muqabala/core/constants/app_typography.dart';
import 'package:my_muqabala/core/router/route_names.dart';
import 'package:my_muqabala/core/utils/logger.dart';
import 'package:my_muqabala/core/widgets/empty_state.dart';
import 'package:my_muqabala/core/widgets/loading_skeleton.dart';
import 'package:my_muqabala/features/chat/presentation/widgets/channel_tile_widget.dart';

/// Main chat list screen displayed as the "Chat" tab.
class ChatListScreen extends ConsumerStatefulWidget {
  const ChatListScreen({super.key});

  @override
  ConsumerState<ChatListScreen> createState() => _ChatListScreenState();
}

class _ChatListScreenState extends ConsumerState<ChatListScreen> {
  /// Controller for the Stream channel list.
  /// Initialized only when the client is ready and a user is connected.
  StreamChannelListController? _channelListController;

  @override
  void dispose() {
    _channelListController?.dispose();
    super.dispose();
  }

  // ── Build ──────────────────────────────────────────────────────────────────

  @override
  Widget build(BuildContext context) {
    final client = ref.watch(streamChatClientProvider);
    final isDark = Theme.of(context).brightness == Brightness.dark;

    // Watch the connection provider to trigger connect and observe its state.
    final connectionState = ref.watch(streamConnectionProvider);

    return Scaffold(
      backgroundColor: isDark ? AppColors.darkBg : AppColors.paper,
      appBar: _buildAppBar(isDark),
      body: _buildBody(client, isDark, connectionState),
    );
  }

  // ── App Bar ────────────────────────────────────────────────────────────────

  PreferredSizeWidget _buildAppBar(bool isDark) {
    return AppBar(
      title: Text(
        'Chat',
        style: AppTypography.h2.copyWith(
          color: isDark ? AppColors.darkInk : AppColors.ink,
        ),
      ),
      centerTitle: false,
      backgroundColor: isDark ? AppColors.darkBg : AppColors.paper,
      surfaceTintColor: Colors.transparent,
      elevation: 0,
      bottom: PreferredSize(
        preferredSize: const Size.fromHeight(1),
        child: Container(
          height: 1,
          color: isDark ? AppColors.darkBorder : AppColors.divider,
        ),
      ),
    );
  }

  // ── Body ───────────────────────────────────────────────────────────────────

  Widget _buildBody(
    StreamChatClient? client,
    bool isDark,
    AsyncValue<bool> connectionState,
  ) {
    // State 1: Stream Chat not configured
    if (client == null) {
      return const EmptyState(
        icon: Icons.chat_bubble_outline_rounded,
        title: 'Chat non disponible',
        subtitle:
            'Le service de messagerie n\'est pas encore configuré. '
            'Veuillez réessayer ultérieurement.',
      );
    }

    // State 2: Connection provider errored out
    if (connectionState is AsyncError) {
      AppLogger.warning(
        'Stream connection provider error: ${connectionState.error}',
        tag: 'ChatListScreen',
      );
      return _buildServiceUnavailable();
    }

    // State 3: Connection provider still loading — show spinner
    if (connectionState is AsyncLoading) {
      return _buildConnectingState(isDark);
    }

    // State 4: Connection provider resolved to false — service unavailable
    final isConnected = connectionState.value ?? false;
    if (!isConnected) {
      return _buildServiceUnavailable();
    }

    // State 5: Connected — verify the user is actually set on the client
    final currentUser = client.state.currentUser;
    if (currentUser == null) {
      return _buildServiceUnavailable();
    }

    // State 6: Fully connected — show channel list
    return _buildChannelList(client, currentUser, isDark);
  }

  // ── Connecting state ───────────────────────────────────────────────────────

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

  // ── Service unavailable state ─────────────────────────────────────────

  Widget _buildServiceUnavailable() {
    return const EmptyState(
      icon: Icons.chat_bubble_outline_rounded,
      title: 'Chat bientôt disponible',
      subtitle:
          'Le service de messagerie est en cours de configuration. '
          'Vous serez notifié(e) dès qu\'il sera disponible.',
    );
  }

  // ── Channel list ───────────────────────────────────────────────────────────

  Widget _buildChannelList(
    StreamChatClient client,
    User currentUser,
    bool isDark,
  ) {
    // Initialize the controller if not yet created or if the user changed.
    _initializeControllerIfNeeded(client, currentUser.id);

    return StreamChannelListView(
      controller: _channelListController!,
      itemBuilder: (context, channels, index, defaultTile) {
        final channel = channels[index];
        return Column(
          children: [
            ChannelTileWidget(
              channel: channel,
              currentUserId: currentUser.id,
              onTap: () => _navigateToChannel(channel),
            ),
            if (index < channels.length - 1)
              Divider(
                height: 1,
                indent: AppSpacing.md + 52 + AppSpacing.md,
                endIndent: AppSpacing.md,
                color: isDark ? AppColors.darkBorder : AppColors.divider,
              ),
          ],
        );
      },
      loadingBuilder: (context) => const LoadingSkeletonList(
        itemCount: 5,
        itemHeight: 72,
      ),
      emptyBuilder: (context) => const EmptyState(
        icon: Icons.chat_bubble_outline_rounded,
        title: 'Aucune conversation',
        subtitle:
            'Vos conversations apparaîtront ici dès qu\'un échange '
            'sera initié avec votre coach ou votre partenaire.',
      ),
      errorBuilder: (context, error) => EmptyState(
        icon: Icons.error_outline_rounded,
        title: 'Erreur de chargement',
        subtitle:
            'Impossible de charger vos conversations. '
            'Vérifiez votre connexion et réessayez.',
        actionLabel: 'Réessayer',
        onAction: () {
          _channelListController?.refresh();
        },
      ),
      onChannelTap: _navigateToChannel,
    );
  }

  // ── Controller initialization ──────────────────────────────────────────────

  void _initializeControllerIfNeeded(
    StreamChatClient client,
    String currentUserId,
  ) {
    if (_channelListController != null) return;

    AppLogger.info(
      'Initializing StreamChannelListController for user: $currentUserId',
      tag: 'ChatListScreen',
    );

    _channelListController = StreamChannelListController(
      client: client,
      filter: Filter.in_('members', [currentUserId]),
      channelStateSort: const [SortOption('last_message_at')],
      limit: 20,
    );
  }

  // ── Navigation ─────────────────────────────────────────────────────────────

  void _navigateToChannel(Channel channel) {
    final channelId = channel.id;
    if (channelId == null || channelId.isEmpty) {
      AppLogger.warning(
        'Cannot navigate to channel with null/empty ID',
        tag: 'ChatListScreen',
      );
      return;
    }

    AppLogger.debug(
      'Navigating to chat detail: $channelId',
      tag: 'ChatListScreen',
    );

    context.pushNamed(
      RouteNames.chatDetail,
      pathParameters: {'channelId': channelId},
    );
  }
}
