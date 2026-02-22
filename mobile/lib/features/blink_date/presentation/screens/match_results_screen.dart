/// Match results screen — displays final match outcomes after an event.
///
/// After the admin resolves matches (feedback + photo selection),
/// this screen shows the user their results:
/// - Confirmed matches: partner photo + name + compatibility score + chat button
/// - No matches: empathetic message + return to home
///
/// Data is loaded via [BlinkDateRepository.getMatchResults] which calls
/// the `get_user_match_results` RPC.
library;

import 'dart:math' as math;

import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

import 'package:my_muqabala/core/constants/app_colors.dart';
import 'package:my_muqabala/core/constants/app_spacing.dart';
import 'package:my_muqabala/core/constants/app_typography.dart';
import 'package:my_muqabala/core/router/route_names.dart';
import 'package:my_muqabala/core/utils/logger.dart';
import 'package:my_muqabala/core/widgets/muqabala_button.dart';
import 'package:my_muqabala/features/blink_date/data/repositories/blink_date_repository.dart';

/// Screen displaying match results for a given event.
class MatchResultsScreen extends ConsumerStatefulWidget {
  const MatchResultsScreen({
    required this.eventId,
    super.key,
  });

  /// The event ID for which to display results.
  final String eventId;

  @override
  ConsumerState<MatchResultsScreen> createState() => _MatchResultsScreenState();
}

class _MatchResultsScreenState extends ConsumerState<MatchResultsScreen>
    with TickerProviderStateMixin {
  late final AnimationController _entranceController;
  late final Animation<double> _fadeAnimation;
  late final Animation<double> _scaleAnimation;

  List<Map<String, dynamic>> _results = [];
  bool _isLoading = true;
  String? _errorMessage;
  bool _isWaitingForResolution = false;

  @override
  void initState() {
    super.initState();

    _entranceController = AnimationController(
      duration: const Duration(milliseconds: 800),
      vsync: this,
    );

    _fadeAnimation = CurvedAnimation(
      parent: _entranceController,
      curve: const Interval(0.0, 0.6, curve: Curves.easeOut),
    );

    _scaleAnimation = Tween<double>(begin: 0.8, end: 1.0).animate(
      CurvedAnimation(
        parent: _entranceController,
        curve: const Interval(0.2, 1.0, curve: Curves.elasticOut),
      ),
    );

    _loadResults();
  }

  @override
  void dispose() {
    _entranceController.dispose();
    super.dispose();
  }

  Future<void> _loadResults() async {
    setState(() {
      _isLoading = true;
      _errorMessage = null;
      _isWaitingForResolution = false;
    });

    try {
      final repo = BlinkDateRepository(Supabase.instance.client);
      final results = await repo.getMatchResults(widget.eventId);

      if (mounted) {
        if (results.isEmpty) {
          // Check if this means "no results yet" (admin hasn't resolved)
          // or "truly no matches". We check by looking for any
          // termine_positif/termine_negatif statuses.
          final hasResolved = results.any(
            (r) => r['is_confirmed'] != null,
          );

          if (!hasResolved && results.isEmpty) {
            setState(() {
              _isLoading = false;
              _isWaitingForResolution = true;
            });
            return;
          }
        }

        setState(() {
          _results = results;
          _isLoading = false;
        });
        _entranceController.forward();
      }
    } catch (e, st) {
      AppLogger.error(
        'Failed to load match results for event ${widget.eventId}',
        tag: 'MatchResults',
        error: e,
        stackTrace: st,
      );
      if (mounted) {
        setState(() {
          _isLoading = false;
          _errorMessage = 'Impossible de charger les r\u00e9sultats.';
        });
      }
    }
  }

  List<Map<String, dynamic>> get _confirmedMatches =>
      _results.where((r) => r['is_confirmed'] == true).toList();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.paper,
      appBar: AppBar(
        backgroundColor: AppColors.surface,
        surfaceTintColor: Colors.transparent,
        elevation: 0,
        centerTitle: true,
        title: Text(
          'R\u00e9sultats',
          style: AppTypography.h3.copyWith(color: AppColors.ink),
        ),
        leading: IconButton(
          icon: const Icon(Icons.close_rounded),
          color: AppColors.ink,
          onPressed: () => context.go('/home'),
        ),
        bottom: PreferredSize(
          preferredSize: const Size.fromHeight(1),
          child: Container(height: 1, color: AppColors.divider),
        ),
      ),
      body: _buildBody(),
    );
  }

  Widget _buildBody() {
    if (_isLoading) return _buildLoading();
    if (_errorMessage != null) return _buildError();
    if (_isWaitingForResolution) return _buildWaiting();

    final confirmed = _confirmedMatches;
    if (confirmed.isEmpty) return _buildNoMatches();
    return _buildMatchResults(confirmed);
  }

  // ── Loading ──────────────────────────────────────────────────────────

  Widget _buildLoading() {
    return Center(
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          SizedBox(
            width: 48,
            height: 48,
            child: CircularProgressIndicator(
              strokeWidth: 3,
              valueColor: AlwaysStoppedAnimation<Color>(
                AppColors.violet.withValues(alpha: 0.7),
              ),
            ),
          ),
          AppSpacing.gapLg,
          Text(
            'Chargement des r\u00e9sultats...',
            style: AppTypography.bodyMedium.copyWith(color: AppColors.inkMuted),
          ),
        ],
      ),
    );
  }

  // ── Error ────────────────────────────────────────────────────────────

  Widget _buildError() {
    return Center(
      child: Padding(
        padding: AppSpacing.screenPadding,
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              width: 80,
              height: 80,
              decoration: BoxDecoration(
                color: AppColors.errorLight,
                shape: BoxShape.circle,
              ),
              child: const Icon(
                Icons.error_outline_rounded,
                size: 40,
                color: AppColors.error,
              ),
            ),
            AppSpacing.gapLg,
            Text(
              _errorMessage!,
              style: AppTypography.bodyMedium.copyWith(color: AppColors.inkMuted),
              textAlign: TextAlign.center,
            ),
            AppSpacing.gapXl,
            MuqabalaButton(
              label: 'R\u00e9essayer',
              onPressed: _loadResults,
              isFullWidth: false,
              variant: MuqabalaButtonVariant.secondary,
              icon: Icons.refresh_rounded,
            ),
          ],
        ),
      ),
    );
  }

  // ── Waiting for admin resolution ────────────────────────────────────

  Widget _buildWaiting() {
    return Center(
      child: Padding(
        padding: AppSpacing.screenPadding,
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            SizedBox(
              width: 80,
              height: 80,
              child: CircularProgressIndicator(
                strokeWidth: 3,
                valueColor: AlwaysStoppedAnimation<Color>(
                  AppColors.violet.withValues(alpha: 0.5),
                ),
              ),
            ),
            AppSpacing.gapXl,
            Text(
              'En attente des r\u00e9sultats',
              style: AppTypography.h2.copyWith(color: AppColors.ink),
              textAlign: TextAlign.center,
            ),
            AppSpacing.gapMd,
            Text(
              'Les r\u00e9sultats ne sont pas encore disponibles. '
              'Vous recevrez une notification d\u00e8s qu\'ils seront pr\u00eats.',
              style: AppTypography.bodyMedium.copyWith(color: AppColors.inkMuted),
              textAlign: TextAlign.center,
            ),
            AppSpacing.gapXl,
            MuqabalaButton(
              label: 'Actualiser',
              onPressed: _loadResults,
              isFullWidth: false,
              variant: MuqabalaButtonVariant.secondary,
              icon: Icons.refresh_rounded,
            ),
            AppSpacing.gapMd,
            MuqabalaButton(
              label: 'Retour \u00e0 l\'accueil',
              onPressed: () => context.go('/home'),
              isFullWidth: false,
              variant: MuqabalaButtonVariant.text,
            ),
          ],
        ),
      ),
    );
  }

  // ── No matches ──────────────────────────────────────────────────────

  Widget _buildNoMatches() {
    return FadeTransition(
      opacity: _fadeAnimation,
      child: Center(
        child: SingleChildScrollView(
          padding: AppSpacing.screenPadding,
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Container(
                width: 96,
                height: 96,
                decoration: BoxDecoration(
                  color: AppColors.sageLight,
                  shape: BoxShape.circle,
                ),
                child: Icon(
                  Icons.spa_outlined,
                  size: 48,
                  color: AppColors.sage,
                ),
              ),
              AppSpacing.gapXl,
              Text(
                'Ce n\'est pas pour cette fois',
                style: AppTypography.h1.copyWith(color: AppColors.ink),
                textAlign: TextAlign.center,
              ),
              AppSpacing.gapMd,
              Text(
                'Malheureusement, il n\'y a pas eu de match mutuel '
                'cette fois-ci. Mais ne perds pas espoir \u2014 ton '
                'profil reste actif pour les prochains \u00e9v\u00e9nements.',
                style: AppTypography.bodyLarge.copyWith(
                  color: AppColors.inkMuted,
                  height: 1.6,
                ),
                textAlign: TextAlign.center,
              ),
              AppSpacing.gapMd,
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: AppColors.sageLight,
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(
                    color: AppColors.sage.withValues(alpha: 0.2),
                  ),
                ),
                child: Row(
                  children: [
                    Icon(
                      Icons.lightbulb_outline_rounded,
                      color: AppColors.sageDeep,
                      size: 24,
                    ),
                    AppSpacing.horizontalMd,
                    Expanded(
                      child: Text(
                        'Chaque rencontre est une exp\u00e9rience. '
                        'Continuez \u00e0 \u00eatre vous-m\u00eame, '
                        'le bon match viendra in sha Allah.',
                        style: AppTypography.bodySmall.copyWith(
                          color: AppColors.sageDeep,
                          height: 1.5,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              AppSpacing.gapXxl,
              MuqabalaButton(
                label: 'Retour \u00e0 l\'accueil',
                onPressed: () => context.go('/home'),
                variant: MuqabalaButtonVariant.primary,
                icon: Icons.home_rounded,
              ),
            ],
          ),
        ),
      ),
    );
  }

  // ── Confirmed matches ───────────────────────────────────────────────

  Widget _buildMatchResults(List<Map<String, dynamic>> confirmed) {
    return FadeTransition(
      opacity: _fadeAnimation,
      child: ScaleTransition(
        scale: _scaleAnimation,
        child: SingleChildScrollView(
          padding: AppSpacing.screenPadding,
          child: Column(
            children: [
              AppSpacing.gapLg,

              // ── Celebration header ──────────────────────────────────
              const _CelebrationIcon(),
              AppSpacing.gapXl,

              Text(
                confirmed.length == 1
                    ? 'Vous avez un match !'
                    : 'Vous avez ${confirmed.length} matchs !',
                style: AppTypography.h1.copyWith(color: AppColors.ink),
                textAlign: TextAlign.center,
              ),
              AppSpacing.gapSm,
              Text(
                'F\u00e9licitations ! Vous pouvez d\u00e9sormais '
                '\u00e9changer par message.',
                style: AppTypography.bodyMedium.copyWith(
                  color: AppColors.inkMuted,
                ),
                textAlign: TextAlign.center,
              ),

              AppSpacing.gapXl,

              // ── Match cards ─────────────────────────────────────────
              ...confirmed.map((match) => Padding(
                    padding: const EdgeInsets.only(bottom: 16),
                    child: _MatchCard(
                      partnerPrenom: match['partner_prenom'] as String? ?? 'Partenaire',
                      partnerPhotoUrl: match['partner_photo_nette_url'] as String?,
                      score: match['score_compatibilite'] as num?,
                      matchId: match['match_id'] as String?,
                      onSendMessage: () {
                        final matchId = match['match_id'] as String?;
                        if (matchId != null) {
                          HapticFeedback.mediumImpact();
                          context.pushNamed(
                            RouteNames.chatDetail,
                            pathParameters: {
                              'channelId': 'messaging:match_$matchId',
                            },
                          );
                        }
                      },
                    ),
                  )),

              AppSpacing.gapLg,

              MuqabalaButton(
                label: 'Retour \u00e0 l\'accueil',
                onPressed: () => context.go('/home'),
                variant: MuqabalaButtonVariant.text,
              ),

              AppSpacing.gapXxl,
            ],
          ),
        ),
      ),
    );
  }
}

// ══════════════════════════════════════════════════════════════════════════════
// Celebration Icon (animated hearts)
// ══════════════════════════════════════════════════════════════════════════════

class _CelebrationIcon extends StatefulWidget {
  const _CelebrationIcon();

  @override
  State<_CelebrationIcon> createState() => _CelebrationIconState();
}

class _CelebrationIconState extends State<_CelebrationIcon>
    with SingleTickerProviderStateMixin {
  late final AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: const Duration(milliseconds: 1500),
      vsync: this,
    )..repeat(reverse: true);
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _controller,
      builder: (context, child) {
        final scale = 1.0 + (_controller.value * 0.08);
        return Transform.scale(
          scale: scale,
          child: child,
        );
      },
      child: Container(
        width: 100,
        height: 100,
        decoration: BoxDecoration(
          gradient: LinearGradient(
            colors: [
              AppColors.violet.withValues(alpha: 0.15),
              AppColors.rose.withValues(alpha: 0.15),
            ],
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          ),
          shape: BoxShape.circle,
        ),
        child: const Icon(
          Icons.favorite_rounded,
          size: 52,
          color: AppColors.rose,
        ),
      ),
    );
  }
}

// ══════════════════════════════════════════════════════════════════════════════
// Match Card
// ══════════════════════════════════════════════════════════════════════════════

class _MatchCard extends StatelessWidget {
  const _MatchCard({
    required this.partnerPrenom,
    required this.partnerPhotoUrl,
    required this.score,
    required this.matchId,
    required this.onSendMessage,
  });

  final String partnerPrenom;
  final String? partnerPhotoUrl;
  final num? score;
  final String? matchId;
  final VoidCallback onSendMessage;

  @override
  Widget build(BuildContext context) {
    final scorePercent = score != null ? (score! * 100).round() : null;

    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: AppColors.surface,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: AppColors.border, width: 1),
        boxShadow: [
          BoxShadow(
            color: AppColors.shadowLight,
            blurRadius: 20,
            offset: const Offset(0, 8),
          ),
        ],
      ),
      child: Column(
        children: [
          // ── Photo + name ─────────────────────────────────────────────
          Container(
            width: 80,
            height: 80,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              border: Border.all(
                color: AppColors.violet.withValues(alpha: 0.3),
                width: 3,
              ),
              boxShadow: [
                BoxShadow(
                  color: AppColors.violet.withValues(alpha: 0.15),
                  blurRadius: 16,
                ),
              ],
            ),
            clipBehavior: Clip.antiAlias,
            child: partnerPhotoUrl != null && partnerPhotoUrl!.isNotEmpty
                ? CachedNetworkImage(
                    imageUrl: partnerPhotoUrl!,
                    fit: BoxFit.cover,
                    placeholder: (_, __) => Container(
                      color: AppColors.violetLight,
                      child: const Icon(
                        Icons.person_rounded,
                        color: AppColors.violet,
                        size: 40,
                      ),
                    ),
                    errorWidget: (_, __, ___) => Container(
                      color: AppColors.violetLight,
                      child: const Icon(
                        Icons.person_rounded,
                        color: AppColors.violet,
                        size: 40,
                      ),
                    ),
                  )
                : Container(
                    color: AppColors.violetLight,
                    child: const Icon(
                      Icons.person_rounded,
                      color: AppColors.violet,
                      size: 40,
                    ),
                  ),
          ),

          AppSpacing.gapMd,

          Text(
            partnerPrenom,
            style: AppTypography.h2.copyWith(color: AppColors.ink),
            textAlign: TextAlign.center,
          ),

          // ── Compatibility score ──────────────────────────────────────
          if (scorePercent != null) ...[
            AppSpacing.gapSm,
            Container(
              padding: const EdgeInsets.symmetric(
                horizontal: 14,
                vertical: 6,
              ),
              decoration: BoxDecoration(
                color: AppColors.violetLight,
                borderRadius: BorderRadius.circular(20),
              ),
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Icon(
                    Icons.auto_awesome_rounded,
                    size: 16,
                    color: AppColors.violet,
                  ),
                  const SizedBox(width: 6),
                  Text(
                    '$scorePercent% compatible',
                    style: AppTypography.label.copyWith(
                      color: AppColors.violet,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ],
              ),
            ),
          ],

          AppSpacing.gapLg,

          // ── Send message button ──────────────────────────────────────
          MuqabalaButton(
            label: 'Envoyer un message',
            onPressed: onSendMessage,
            variant: MuqabalaButtonVariant.primary,
            icon: Icons.chat_rounded,
          ),
        ],
      ),
    );
  }
}
