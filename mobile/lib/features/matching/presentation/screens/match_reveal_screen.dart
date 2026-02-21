/// Match reveal screen with animated partner reveal.
///
/// Displays the matched partner's blurred photo, name, and compatibility
/// score with elegant entrance animations.
///
/// Provides two CTAs:
///   - "Envoyer un message" : navigates to the chat detail screen
///   - "Voir ses documents" : navigates to the documents tab
library;

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import 'package:my_muqabala/core/constants/app_colors.dart';
import 'package:my_muqabala/core/constants/app_spacing.dart';
import 'package:my_muqabala/core/constants/app_typography.dart';
import 'package:my_muqabala/core/router/route_names.dart';
import 'package:my_muqabala/core/utils/logger.dart';
import 'package:my_muqabala/core/widgets/empty_state.dart';
import 'package:my_muqabala/core/widgets/loading_skeleton.dart';
import 'package:my_muqabala/core/widgets/muqabala_button.dart';
import 'package:my_muqabala/features/matching/data/models/match_model.dart';
import 'package:my_muqabala/features/matching/presentation/providers/matching_provider.dart';
import 'package:my_muqabala/features/matching/presentation/widgets/compatibility_gauge_widget.dart';
import 'package:my_muqabala/features/matching/presentation/widgets/reveal_card_widget.dart';

/// Screen that reveals the matched partner to the user.
class MatchRevealScreen extends ConsumerStatefulWidget {
  const MatchRevealScreen({required this.matchId, super.key});

  /// The ID of the match to reveal.
  final String matchId;

  @override
  ConsumerState<MatchRevealScreen> createState() => _MatchRevealScreenState();
}

class _MatchRevealScreenState extends ConsumerState<MatchRevealScreen>
    with TickerProviderStateMixin {
  // ── Animation controllers ──────────────────────────────────────────────

  late final AnimationController _entranceController;
  late final AnimationController _contentController;

  late final Animation<double> _scaleAnimation;
  late final Animation<double> _fadeAnimation;
  late final Animation<double> _contentFadeAnimation;
  late final Animation<Offset> _slideAnimation;

  @override
  void initState() {
    super.initState();

    // ── Card entrance animation (scale + fade) ─────────────────────────
    _entranceController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1500),
    );

    _scaleAnimation = Tween<double>(begin: 0.8, end: 1.0).animate(
      CurvedAnimation(
        parent: _entranceController,
        curve: const Interval(0.0, 0.7, curve: Cubic(0.23, 1, 0.32, 1)),
      ),
    );

    _fadeAnimation = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(
        parent: _entranceController,
        curve: const Interval(0.0, 0.5, curve: Curves.easeOut),
      ),
    );

    // ── Content below card (fade + slide up) ───────────────────────────
    _contentController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 800),
    );

    _contentFadeAnimation = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(
        parent: _contentController,
        curve: Curves.easeOut,
      ),
    );

    _slideAnimation = Tween<Offset>(
      begin: const Offset(0, 0.15),
      end: Offset.zero,
    ).animate(
      CurvedAnimation(
        parent: _contentController,
        curve: const Cubic(0.23, 1, 0.32, 1),
      ),
    );

    // Start the entrance animation after a brief delay.
    Future.delayed(const Duration(milliseconds: 300), () {
      if (mounted) {
        _entranceController.forward();
      }
    });

    // Start content animation after the card entrance.
    Future.delayed(const Duration(milliseconds: 1000), () {
      if (mounted) {
        _contentController.forward();
      }
    });

    AppLogger.info(
      'Match reveal screen opened: ${widget.matchId}',
      tag: 'MatchReveal',
    );
  }

  @override
  void dispose() {
    _entranceController.dispose();
    _contentController.dispose();
    super.dispose();
  }

  // ── Navigation handlers ──────────────────────────────────────────────────

  void _onSendMessage() {
    AppLogger.info(
      'Navigating to chat from match reveal: ${widget.matchId}',
      tag: 'MatchReveal',
    );
    context.pushNamed(
      RouteNames.chatDetail,
      pathParameters: {'channelId': 'messaging:${widget.matchId}'},
    );
  }

  void _onViewDocuments() {
    AppLogger.info(
      'Navigating to documents from match reveal',
      tag: 'MatchReveal',
    );
    context.goNamed(RouteNames.monEspace);
  }

  // ── Build ────────────────────────────────────────────────────────────────

  @override
  Widget build(BuildContext context) {
    final matchDataAsync = ref.watch(matchDetailProvider(widget.matchId));

    return Scaffold(
      backgroundColor: AppColors.paper,
      body: matchDataAsync.when(
        loading: _buildLoadingState,
        error: (error, _) => _buildErrorState(error),
        data: (data) {
          if (data == null) {
            return _buildNotFoundState();
          }
          return _buildRevealContent(data);
        },
      ),
    );
  }

  Widget _buildLoadingState() {
    return SafeArea(
      child: Padding(
        padding: AppSpacing.screenPadding,
        child: Column(
          children: [
            AppSpacing.gapXl,
            const LoadingSkeleton(height: 380, borderRadius: 24),
            AppSpacing.gapXl,
            const LoadingSkeleton.circle(diameter: 160),
            AppSpacing.gapLg,
            const LoadingSkeleton(height: 20, width: 200),
            AppSpacing.gapMd,
            const LoadingSkeleton(height: 52),
            AppSpacing.gapSm,
            const LoadingSkeleton(height: 52),
          ],
        ),
      ),
    );
  }

  Widget _buildErrorState(Object error) {
    return SafeArea(
      child: EmptyState(
        icon: Icons.error_outline_rounded,
        title: 'Erreur de chargement',
        subtitle: 'Impossible de charger les d\u00e9tails du match.',
        actionLabel: 'R\u00e9essayer',
        onAction: () => ref.invalidate(matchDetailProvider(widget.matchId)),
      ),
    );
  }

  Widget _buildNotFoundState() {
    return SafeArea(
      child: Column(
        children: [
          _buildCloseButton(),
          const Expanded(
            child: EmptyState(
              icon: Icons.search_off_rounded,
              title: 'Match introuvable',
              subtitle: 'Ce match n\'existe pas ou a \u00e9t\u00e9 supprim\u00e9.',
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildCloseButton() {
    return Align(
      alignment: Alignment.topRight,
      child: Padding(
        padding: const EdgeInsets.only(top: 8, right: 8),
        child: IconButton(
          icon: Container(
            padding: const EdgeInsets.all(6),
            decoration: BoxDecoration(
              color: AppColors.surface,
              shape: BoxShape.circle,
              boxShadow: [
                BoxShadow(
                  color: AppColors.shadowLight,
                  blurRadius: 8,
                ),
              ],
            ),
            child: const Icon(
              Icons.close_rounded,
              size: 20,
              color: AppColors.inkMuted,
            ),
          ),
          onPressed: () => context.pop(),
        ),
      ),
    );
  }

  Widget _buildRevealContent(Map<String, dynamic> data) {
    final match = data['match'] as MatchModel;
    final partner = data['partner'] as Map<String, dynamic>? ?? {};

    final partnerName = partner['prenom'] as String? ?? 'Votre match';
    final partnerPhotoUrl = partner['photo_floue_url'] as String?;
    final partnerBio = partner['bio'] as String?;

    // Compatibility analysis text.
    final analyseText = _buildAnalyseText(match.analyseCompatibilite);

    return CustomScrollView(
      slivers: [
        // ── Top safe area + close button ──────────────────────────────────
        SliverToBoxAdapter(
          child: SafeArea(
            bottom: false,
            child: _buildCloseButton(),
          ),
        ),

        // ── Animated reveal card ─────────────────────────────────────────
        SliverToBoxAdapter(
          child: Padding(
            padding: AppSpacing.paddingHMd,
            child: AnimatedBuilder(
              animation: _entranceController,
              builder: (context, child) {
                return Transform.scale(
                  scale: _scaleAnimation.value,
                  child: Opacity(
                    opacity: _fadeAnimation.value,
                    child: child,
                  ),
                );
              },
              child: RevealCardWidget(
                imageUrl: partnerPhotoUrl,
                name: partnerName,
              ),
            ),
          ),
        ),

        // ── Animated content below card ──────────────────────────────────
        SliverToBoxAdapter(
          child: AnimatedBuilder(
            animation: _contentController,
            builder: (context, child) {
              return SlideTransition(
                position: _slideAnimation,
                child: FadeTransition(
                  opacity: _contentFadeAnimation,
                  child: child,
                ),
              );
            },
            child: Padding(
              padding: AppSpacing.screenPadding,
              child: Column(
                children: [
                  AppSpacing.gapLg,

                  // ── Compatibility gauge ────────────────────────────────
                  CompatibilityGaugeWidget(
                    score: match.scoreCompatibilite,
                    animated: true,
                    label: _compatibilityLabel(match.scoreCompatibilite),
                  ),

                  AppSpacing.gapLg,

                  // ── Status badge ───────────────────────────────────────
                  _buildStatusBadge(match),

                  AppSpacing.gapMd,

                  // ── Compatibility analysis text ────────────────────────
                  if (analyseText.isNotEmpty) ...[
                    _buildAnalyseCard(analyseText),
                    AppSpacing.gapMd,
                  ],

                  // ── Partner bio ────────────────────────────────────────
                  if (partnerBio != null && partnerBio.isNotEmpty) ...[
                    _buildBioCard(partnerBio),
                    AppSpacing.gapLg,
                  ],

                  // ── CTA buttons ────────────────────────────────────────
                  _buildActionButtons(),

                  AppSpacing.gapXl,
                ],
              ),
            ),
          ),
        ),
      ],
    );
  }

  // ── Sub-widgets ──────────────────────────────────────────────────────────

  Widget _buildStatusBadge(MatchModel match) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      decoration: BoxDecoration(
        color: AppColors.violetLight,
        borderRadius: AppRadius.borderCircular,
        border: Border.all(
          color: AppColors.violet.withValues(alpha: 0.2),
        ),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          const Icon(
            Icons.verified_rounded,
            size: 16,
            color: AppColors.violet,
          ),
          const SizedBox(width: 8),
          Text(
            match.statutLabel,
            style: AppTypography.labelMedium.copyWith(
              color: AppColors.violet,
              fontWeight: FontWeight.w600,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildAnalyseCard(String text) {
    return Container(
      width: double.infinity,
      padding: AppSpacing.cardPadding,
      decoration: BoxDecoration(
        color: AppColors.surface,
        borderRadius: AppRadius.borderLg,
        border: Border.all(color: AppColors.divider),
        boxShadow: [
          BoxShadow(
            color: AppColors.shadowLight,
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              const Icon(
                Icons.insights_rounded,
                size: 18,
                color: AppColors.violet,
              ),
              const SizedBox(width: 8),
              Text(
                'Analyse de compatibilit\u00e9',
                style: AppTypography.label.copyWith(
                  color: AppColors.violet,
                ),
              ),
            ],
          ),
          AppSpacing.gapSm,
          Text(
            text,
            style: AppTypography.bodyMedium.copyWith(
              color: AppColors.inkSoft,
              height: 1.6,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildBioCard(String bio) {
    return Container(
      width: double.infinity,
      padding: AppSpacing.cardPadding,
      decoration: BoxDecoration(
        color: AppColors.surface,
        borderRadius: AppRadius.borderLg,
        border: Border.all(color: AppColors.divider),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              const Icon(
                Icons.format_quote_rounded,
                size: 18,
                color: AppColors.gold,
              ),
              const SizedBox(width: 8),
              Text(
                '\u00c0 propos',
                style: AppTypography.label.copyWith(
                  color: AppColors.ink,
                ),
              ),
            ],
          ),
          AppSpacing.gapSm,
          Text(
            bio,
            style: AppTypography.bodyMedium.copyWith(
              color: AppColors.inkSoft,
              height: 1.6,
              fontStyle: FontStyle.italic,
            ),
            maxLines: 5,
            overflow: TextOverflow.ellipsis,
          ),
        ],
      ),
    );
  }

  Widget _buildActionButtons() {
    return Column(
      children: [
        // Primary CTA: Send a message.
        MuqabalaButton(
          label: 'Envoyer un message',
          onPressed: _onSendMessage,
          variant: MuqabalaButtonVariant.primary,
          icon: Icons.chat_bubble_outline_rounded,
        ),

        AppSpacing.gapSm,

        // Secondary CTA: View documents.
        MuqabalaButton(
          label: 'Voir ses documents',
          onPressed: _onViewDocuments,
          variant: MuqabalaButtonVariant.secondary,
          icon: Icons.folder_outlined,
        ),
      ],
    );
  }

  // ── Helpers ──────────────────────────────────────────────────────────────

  /// Returns a human-readable label for the compatibility level.
  String _compatibilityLabel(double score) {
    if (score >= 0.85) return 'Excellente compatibilit\u00e9';
    if (score >= 0.70) return 'Tr\u00e8s bonne compatibilit\u00e9';
    if (score >= 0.55) return 'Bonne compatibilit\u00e9';
    if (score >= 0.40) return 'Compatibilit\u00e9 mod\u00e9r\u00e9e';
    return 'Compatibilit\u00e9 \u00e0 explorer';
  }

  /// Builds a readable text from the compatibility analysis map.
  String _buildAnalyseText(Map<String, dynamic>? analyse) {
    if (analyse == null || analyse.isEmpty) return '';

    final parts = <String>[];

    // Extract common analysis fields.
    final resume = analyse['resume'] as String?;
    if (resume != null && resume.isNotEmpty) {
      return resume;
    }

    final pointsForts = analyse['points_forts'];
    if (pointsForts is List && pointsForts.isNotEmpty) {
      parts.add(
        'Points forts : ${pointsForts.take(3).join(', ')}.',
      );
    }

    final pointsVigilance = analyse['points_vigilance'];
    if (pointsVigilance is List && pointsVigilance.isNotEmpty) {
      parts.add(
        'Points de vigilance : ${pointsVigilance.take(2).join(', ')}.',
      );
    }

    return parts.join(' ');
  }
}
