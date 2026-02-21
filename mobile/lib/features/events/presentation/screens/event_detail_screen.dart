/// Detail screen for a single event.
///
/// Receives [eventId] via the constructor (wired in the router).
/// Displays:
///   - Colored type badge (matching=violet, coaching=blue, blink_date=rose)
///   - Title & formatted date (French locale)
///   - Description
///   - Location with icon
///   - Participant avatar row (max 5 + "+N")
///   - Pool / waiting list status (no RSVP — selection is algorithmic)
///   - "Rejoindre la session" button for coaching_groupe with webinarjam_url
library;

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:intl/intl.dart';
import 'package:url_launcher/url_launcher.dart';

import 'package:my_muqabala/core/constants/app_colors.dart';
import 'package:my_muqabala/core/constants/app_spacing.dart';
import 'package:my_muqabala/core/constants/app_typography.dart';
import 'package:my_muqabala/core/router/route_names.dart';
import 'package:my_muqabala/core/utils/logger.dart';
import 'package:my_muqabala/core/widgets/loading_skeleton.dart';
import 'package:my_muqabala/core/widgets/muqabala_button.dart';
import 'package:my_muqabala/features/events/data/models/event_model.dart';
import 'package:my_muqabala/features/events/presentation/providers/events_provider.dart';
import 'package:my_muqabala/features/events/presentation/widgets/participant_avatar_row.dart';

/// Detail screen for a single event.
///
/// Constructor matches the router declaration:
/// `EventDetailScreen(eventId: eventId)`.
class EventDetailScreen extends ConsumerWidget {
  const EventDetailScreen({
    required this.eventId,
    super.key,
  });

  /// The ID of the event to display.
  final String eventId;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final eventAsync = ref.watch(eventDetailProvider(eventId));

    return Scaffold(
      backgroundColor: isDark ? AppColors.darkBg : AppColors.paper,
      appBar: AppBar(
        title: Text(
          '\u00c9v\u00e9nement',
          style: AppTypography.h2.copyWith(
            color: isDark ? AppColors.darkInk : AppColors.ink,
          ),
        ),
        centerTitle: false,
        elevation: 0,
        scrolledUnderElevation: 0.5,
        backgroundColor: isDark ? AppColors.darkBg : AppColors.paper,
        leading: IconButton(
          icon: Icon(
            Icons.arrow_back_rounded,
            color: isDark ? AppColors.darkInk : AppColors.ink,
          ),
          onPressed: () => Navigator.of(context).pop(),
        ),
      ),
      body: eventAsync.when(
        loading: () => const _DetailLoadingSkeleton(),
        error: (error, _) => _DetailErrorView(
          error: error,
          onRetry: () => ref.invalidate(eventDetailProvider(eventId)),
        ),
        data: (event) {
          if (event == null) {
            return const _DetailNotFound();
          }

          return _EventDetailBody(event: event);
        },
      ),
    );
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// Event detail body
// ═══════════════════════════════════════════════════════════════════════════════

class _EventDetailBody extends ConsumerWidget {
  const _EventDetailBody({required this.event});

  final EventModel event;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final participantsAsync = ref.watch(eventParticipantsProvider(event.id));

    return SingleChildScrollView(
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
      physics: const AlwaysScrollableScrollPhysics(),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // ── Type badge ────────────────────────────────────────────────
          _TypeBadgeLarge(event: event),

          AppSpacing.gapLg,

          // ── Title ─────────────────────────────────────────────────────
          Text(
            event.titre,
            style: AppTypography.h1.copyWith(
              color: isDark ? AppColors.darkInk : AppColors.ink,
            ),
          ),

          AppSpacing.gapMd,

          // ── Date ──────────────────────────────────────────────────────
          _InfoRow(
            icon: Icons.calendar_today_outlined,
            text: _formatDate(event.dateEvenement),
            isDark: isDark,
          ),

          // ── Location ──────────────────────────────────────────────────
          if (event.lieu != null && event.lieu!.isNotEmpty) ...[
            AppSpacing.gapSm,
            _InfoRow(
              icon: Icons.location_on_outlined,
              text: event.lieu!,
              isDark: isDark,
            ),
          ],

          // ── Status badge (for non-planifie) ───────────────────────────
          if (event.statut != 'planifie') ...[
            AppSpacing.gapSm,
            _InfoRow(
              icon: _statutIcon(event.statut),
              text: event.statutLabel,
              isDark: isDark,
              iconColor: _statutColor(event.statut),
            ),
          ],

          // ── Description ───────────────────────────────────────────────
          if (event.description != null &&
              event.description!.isNotEmpty) ...[
            AppSpacing.gapXl,
            Text(
              'Description',
              style: AppTypography.h3.copyWith(
                color: isDark ? AppColors.darkInk : AppColors.ink,
              ),
            ),
            AppSpacing.gapSm,
            Text(
              event.description!,
              style: AppTypography.bodyLarge.copyWith(
                color: isDark ? AppColors.darkInkSoft : AppColors.inkSoft,
                height: 1.6,
              ),
            ),
          ],

          // ── Participants section ──────────────────────────────────────
          AppSpacing.gapXl,
          Text(
            'Participants',
            style: AppTypography.h3.copyWith(
              color: isDark ? AppColors.darkInk : AppColors.ink,
            ),
          ),
          AppSpacing.gapMd,
          participantsAsync.when(
            loading: () => const Row(
              children: [
                LoadingSkeleton.circle(diameter: 36),
                SizedBox(width: 4),
                LoadingSkeleton.circle(diameter: 36),
                SizedBox(width: 4),
                LoadingSkeleton.circle(diameter: 36),
              ],
            ),
            error: (_, __) => Text(
              'Impossible de charger les participants',
              style: AppTypography.bodySmall.copyWith(
                color: AppColors.inkMuted,
              ),
            ),
            data: (participants) {
              if (participants.isEmpty) {
                return Text(
                  'Aucun participant pour le moment',
                  style: AppTypography.bodyMedium.copyWith(
                    color: isDark
                        ? AppColors.darkInkMuted
                        : AppColors.inkMuted,
                  ),
                );
              }

              return Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  ParticipantAvatarRow(participants: participants),
                  AppSpacing.gapSm,
                  Text(
                    '${participants.length} participant${participants.length > 1 ? 's' : ''} inscrit${participants.length > 1 ? 's' : ''}',
                    style: AppTypography.bodySmall.copyWith(
                      color: isDark
                          ? AppColors.darkInkMuted
                          : AppColors.inkMuted,
                    ),
                  ),
                ],
              );
            },
          ),

          // ── Pool / confirmation status ─────────────────────────────────
          AppSpacing.gapXl,
          _PoolStatusSection(isDark: isDark, event: event),

          // ── Join session button (coaching_groupe with webinarjam_url) ─
          if (_hasWebinarUrl(event)) ...[
            AppSpacing.gapMd,
            _JoinSessionButton(event: event),
          ],

          // ── Join Blink Date button (matching event en_cours) ──────────
          if (_isLiveMatchingEvent(event)) ...[
            AppSpacing.gapMd,
            _JoinBlinkDateButton(event: event),
          ],

          // ── Bottom padding ────────────────────────────────────────────
          AppSpacing.gapXxl,
        ],
      ),
    );
  }

  /// Formats the event date in French locale.
  String _formatDate(DateTime date) {
    final dateFormat = DateFormat.yMMMMd('fr_FR');
    final timeFormat = DateFormat.Hm('fr_FR');
    return '${dateFormat.format(date)} \u00e0 ${timeFormat.format(date)}';
  }

  /// Checks whether the event is a live matching event (en_cours).
  bool _isLiveMatchingEvent(EventModel event) {
    return event.statut == 'en_cours' &&
        (event.typeEvenement == 'matching' || event.typeEvenement == 'blink_date');
  }

  /// Checks whether the event has a webinarjam_url in its config.
  bool _hasWebinarUrl(EventModel event) {
    if (event.typeEvenement != 'coaching_groupe') return false;
    if (event.config == null) return false;
    final url = event.config!['webinarjam_url'] as String?;
    return url != null && url.isNotEmpty;
  }

  /// Returns the appropriate icon for a given event status.
  IconData _statutIcon(String statut) => switch (statut) {
        'en_cours' => Icons.play_circle_outline_rounded,
        'termine' => Icons.check_circle_outline_rounded,
        'annule' => Icons.cancel_outlined,
        _ => Icons.info_outline_rounded,
      };

  /// Returns the appropriate color for a given event status.
  Color _statutColor(String statut) => switch (statut) {
        'en_cours' => AppColors.success,
        'termine' => AppColors.inkMuted,
        'annule' => AppColors.error,
        _ => AppColors.inkMuted,
      };
}

// ═══════════════════════════════════════════════════════════════════════════════
// Type badge (large variant for detail screen)
// ═══════════════════════════════════════════════════════════════════════════════

class _TypeBadgeLarge extends StatelessWidget {
  const _TypeBadgeLarge({required this.event});

  final EventModel event;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 6),
      decoration: BoxDecoration(
        color: event.typeBgColor,
        borderRadius: AppRadius.borderMd,
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(
            _typeIcon(event.typeEvenement),
            size: 16,
            color: event.typeColor,
          ),
          const SizedBox(width: 6),
          Text(
            event.typeLabel,
            style: AppTypography.label.copyWith(
              color: event.typeColor,
              fontWeight: FontWeight.w600,
            ),
          ),
        ],
      ),
    );
  }

  /// Returns the appropriate icon for a given event type.
  IconData _typeIcon(String type) => switch (type) {
        'matching' => Icons.favorite_outline_rounded,
        'coaching_groupe' => Icons.groups_outlined,
        'blink_date' => Icons.bolt_rounded,
        _ => Icons.event_outlined,
      };
}

// ═══════════════════════════════════════════════════════════════════════════════
// Info row (icon + text)
// ═══════════════════════════════════════════════════════════════════════════════

class _InfoRow extends StatelessWidget {
  const _InfoRow({
    required this.icon,
    required this.text,
    required this.isDark,
    this.iconColor,
  });

  final IconData icon;
  final String text;
  final bool isDark;
  final Color? iconColor;

  @override
  Widget build(BuildContext context) {
    final defaultColor = isDark ? AppColors.darkInkMuted : AppColors.inkMuted;

    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Icon(
          icon,
          size: 18,
          color: iconColor ?? defaultColor,
        ),
        const SizedBox(width: 8),
        Expanded(
          child: Text(
            text,
            style: AppTypography.bodyMedium.copyWith(
              color: isDark ? AppColors.darkInkSoft : AppColors.inkSoft,
            ),
          ),
        ),
      ],
    );
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// Pool / waiting list status section
// ═══════════════════════════════════════════════════════════════════════════════

/// Displays the user's participation status and confirmation buttons.
///
/// States:
///   1. Questionnaire not completed → prompt to complete
///   2. In pool, no participation → "Vous \u00eates dans le pool"
///   3. Participation status = 'inscrit' → Confirm/Decline buttons
///   4. Participation status = 'confirme' → "Pr\u00e9sence confirm\u00e9e"
///   5. Participation status = 'absent' → "Vous avez d\u00e9clin\u00e9"
class _PoolStatusSection extends ConsumerStatefulWidget {
  const _PoolStatusSection({required this.isDark, required this.event});

  final bool isDark;
  final EventModel event;

  @override
  ConsumerState<_PoolStatusSection> createState() =>
      _PoolStatusSectionState();
}

class _PoolStatusSectionState extends ConsumerState<_PoolStatusSection> {
  bool _isLoading = false;

  Future<void> _handleConfirm() async {
    setState(() => _isLoading = true);
    try {
      final repo = ref.read(eventsRepositoryProvider);
      final result = await repo.confirmParticipation(widget.event.id);
      if (result['success'] == true && mounted) {
        ref.invalidate(myParticipationStatusProvider(widget.event.id));
        ref.invalidate(eventParticipantsProvider(widget.event.id));
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Pr\u00e9sence confirm\u00e9e !'),
            backgroundColor: AppColors.success,
          ),
        );
      }
    } on Exception catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Erreur : $e')),
        );
      }
    } finally {
      if (mounted) setState(() => _isLoading = false);
    }
  }

  Future<void> _handleDecline() async {
    final confirmed = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text('D\u00e9cliner la participation ?'),
        content: const Text(
          'En d\u00e9clinant, vous ne participerez pas \u00e0 cet '
          '\u00e9v\u00e9nement et votre priorit\u00e9 pour les prochains '
          'matchings sera r\u00e9duite.',
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(ctx).pop(false),
            child: const Text('Annuler'),
          ),
          TextButton(
            onPressed: () => Navigator.of(ctx).pop(true),
            style: TextButton.styleFrom(foregroundColor: AppColors.error),
            child: const Text('D\u00e9cliner'),
          ),
        ],
      ),
    );

    if (confirmed != true) return;

    setState(() => _isLoading = true);
    try {
      final repo = ref.read(eventsRepositoryProvider);
      final result = await repo.declineParticipation(widget.event.id);
      if (result['success'] == true && mounted) {
        ref.invalidate(myParticipationStatusProvider(widget.event.id));
        ref.invalidate(eventParticipantsProvider(widget.event.id));
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Participation d\u00e9clin\u00e9e.'),
          ),
        );
      }
    } on Exception catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Erreur : $e')),
        );
      }
    } finally {
      if (mounted) setState(() => _isLoading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final isDark = widget.isDark;
    final questionnaireAsync = ref.watch(hasCompletedQuestionnaireProvider);
    final participationAsync =
        ref.watch(myParticipationStatusProvider(widget.event.id));

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Votre statut',
          style: AppTypography.h3.copyWith(
            color: isDark ? AppColors.darkInk : AppColors.ink,
          ),
        ),
        AppSpacing.gapMd,

        // ── Main status card ──────────────────────────────────────────
        questionnaireAsync.when(
          loading: () =>
              const LoadingSkeleton(height: 60, borderRadius: 12),
          error: (_, __) => _buildPromptCard(context, isDark),
          data: (hasCompleted) {
            if (!hasCompleted) {
              return _buildPromptCard(context, isDark);
            }

            // Questionnaire completed — check participation status
            return participationAsync.when(
              loading: () =>
                  const LoadingSkeleton(height: 60, borderRadius: 12),
              error: (_, __) => _buildInPoolCard(isDark),
              data: (statut) {
                if (statut == null) return _buildInPoolCard(isDark);
                if (statut == 'inscrit') {
                  return _buildConfirmationCard(isDark);
                }
                if (statut == 'confirme') {
                  return _buildConfirmedCard(isDark);
                }
                if (statut == 'absent') {
                  return _buildDeclinedCard(isDark);
                }
                return _buildInPoolCard(isDark);
              },
            );
          },
        ),

        AppSpacing.gapMd,

        // ── Info line ─────────────────────────────────────────────────
        Container(
          padding: const EdgeInsets.all(12),
          decoration: BoxDecoration(
            color: isDark
                ? AppColors.info.withValues(alpha: 0.08)
                : AppColors.infoLight,
            borderRadius: AppRadius.borderMd,
            border: Border.all(
              color: isDark
                  ? AppColors.info.withValues(alpha: 0.2)
                  : AppColors.info.withValues(alpha: 0.15),
            ),
          ),
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Icon(
                Icons.info_outline_rounded,
                size: 18,
                color: AppColors.info,
              ),
              const SizedBox(width: 10),
              Expanded(
                child: Text(
                  'La s\u00e9lection des participants est faite par '
                  'l\'algorithme de matching.',
                  style: AppTypography.bodySmall.copyWith(
                    color: AppColors.info,
                    height: 1.4,
                  ),
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }

  // ── Card: Questionnaire not completed ──────────────────────────────
  Widget _buildPromptCard(BuildContext context, bool isDark) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
      decoration: BoxDecoration(
        color: isDark
            ? AppColors.violet.withValues(alpha: 0.08)
            : AppColors.violetLight,
        borderRadius: AppRadius.borderMd,
        border: Border.all(
          color: isDark
              ? AppColors.violet.withValues(alpha: 0.2)
              : AppColors.violet.withValues(alpha: 0.15),
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(Icons.assignment_outlined, size: 20, color: AppColors.violet),
              const SizedBox(width: 10),
              Expanded(
                child: Text(
                  'Compl\u00e9tez le questionnaire de compatibilit\u00e9 pour participer',
                  style: AppTypography.bodyMedium.copyWith(
                    color: isDark ? AppColors.darkInk : AppColors.ink,
                    fontWeight: FontWeight.w500,
                    height: 1.4,
                  ),
                ),
              ),
            ],
          ),
          AppSpacing.gapMd,
          SizedBox(
            width: double.infinity,
            child: MuqabalaButton(
              label: 'Acc\u00e9der au questionnaire',
              icon: Icons.arrow_forward_rounded,
              variant: MuqabalaButtonVariant.primary,
              onPressed: () => context.pushNamed(RouteNames.questionnaire),
            ),
          ),
        ],
      ),
    );
  }

  // ── Card: In pool, waiting for pre-matching ────────────────────────
  Widget _buildInPoolCard(bool isDark) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
      decoration: BoxDecoration(
        color: isDark
            ? AppColors.success.withValues(alpha: 0.08)
            : AppColors.successLight,
        borderRadius: AppRadius.borderMd,
        border: Border.all(
          color: isDark
              ? AppColors.success.withValues(alpha: 0.2)
              : AppColors.success.withValues(alpha: 0.15),
        ),
      ),
      child: Row(
        children: [
          Container(
            width: 32,
            height: 32,
            decoration: BoxDecoration(
              color: AppColors.success.withValues(alpha: 0.15),
              shape: BoxShape.circle,
            ),
            child: Icon(Icons.check_rounded, size: 18, color: AppColors.success),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Vous \u00eates dans le pool de matching',
                  style: AppTypography.label.copyWith(
                    color: AppColors.success,
                    fontWeight: FontWeight.w600,
                  ),
                ),
                const SizedBox(height: 2),
                Text(
                  'En attente du prochain \u00e9v\u00e9nement',
                  style: AppTypography.bodySmall.copyWith(
                    color: isDark ? AppColors.darkInkMuted : AppColors.inkMuted,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  // ── Card: Compatibilities found, confirm/decline ───────────────────
  Widget _buildConfirmationCard(bool isDark) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: isDark
            ? AppColors.violet.withValues(alpha: 0.08)
            : AppColors.violetLight,
        borderRadius: AppRadius.borderLg,
        border: Border.all(
          color: isDark
              ? AppColors.violet.withValues(alpha: 0.25)
              : AppColors.violet.withValues(alpha: 0.2),
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(Icons.favorite_rounded, size: 20, color: AppColors.violet),
              const SizedBox(width: 10),
              Expanded(
                child: Text(
                  'Compatibilit\u00e9s disponibles !',
                  style: AppTypography.label.copyWith(
                    color: AppColors.violet,
                    fontWeight: FontWeight.w700,
                  ),
                ),
              ),
            ],
          ),
          AppSpacing.gapSm,
          Text(
            'Des profils compatibles ont \u00e9t\u00e9 trouv\u00e9s pour vous. '
            'Confirmez votre pr\u00e9sence pour participer \u00e0 cet \u00e9v\u00e9nement.',
            style: AppTypography.bodyMedium.copyWith(
              color: isDark ? AppColors.darkInkSoft : AppColors.inkSoft,
              height: 1.5,
            ),
          ),
          AppSpacing.gapLg,
          if (_isLoading)
            const Center(child: CircularProgressIndicator())
          else ...[
            SizedBox(
              width: double.infinity,
              child: MuqabalaButton(
                label: 'Confirmer ma pr\u00e9sence',
                icon: Icons.check_circle_outline_rounded,
                variant: MuqabalaButtonVariant.primary,
                onPressed: _handleConfirm,
              ),
            ),
            AppSpacing.gapSm,
            SizedBox(
              width: double.infinity,
              child: MuqabalaButton(
                label: 'D\u00e9cliner',
                icon: Icons.close_rounded,
                variant: MuqabalaButtonVariant.secondary,
                onPressed: _handleDecline,
              ),
            ),
          ],
        ],
      ),
    );
  }

  // ── Card: Confirmed ────────────────────────────────────────────────
  Widget _buildConfirmedCard(bool isDark) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
      decoration: BoxDecoration(
        color: isDark
            ? AppColors.success.withValues(alpha: 0.08)
            : AppColors.successLight,
        borderRadius: AppRadius.borderMd,
        border: Border.all(
          color: isDark
              ? AppColors.success.withValues(alpha: 0.2)
              : AppColors.success.withValues(alpha: 0.15),
        ),
      ),
      child: Row(
        children: [
          Container(
            width: 32,
            height: 32,
            decoration: BoxDecoration(
              color: AppColors.success.withValues(alpha: 0.15),
              shape: BoxShape.circle,
            ),
            child: Icon(
              Icons.check_circle_rounded,
              size: 18,
              color: AppColors.success,
            ),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Pr\u00e9sence confirm\u00e9e',
                  style: AppTypography.label.copyWith(
                    color: AppColors.success,
                    fontWeight: FontWeight.w600,
                  ),
                ),
                const SizedBox(height: 2),
                Text(
                  'Vous serez inclus(e) dans le matching d\u00e9finitif',
                  style: AppTypography.bodySmall.copyWith(
                    color: isDark ? AppColors.darkInkMuted : AppColors.inkMuted,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  // ── Card: Declined ─────────────────────────────────────────────────
  Widget _buildDeclinedCard(bool isDark) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
      decoration: BoxDecoration(
        color: isDark
            ? AppColors.inkFaint.withValues(alpha: 0.08)
            : AppColors.inkFaint.withValues(alpha: 0.06),
        borderRadius: AppRadius.borderMd,
        border: Border.all(
          color: AppColors.inkFaint.withValues(alpha: 0.15),
        ),
      ),
      child: Row(
        children: [
          Container(
            width: 32,
            height: 32,
            decoration: BoxDecoration(
              color: AppColors.inkFaint.withValues(alpha: 0.15),
              shape: BoxShape.circle,
            ),
            child: Icon(Icons.close_rounded, size: 18, color: AppColors.inkMuted),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Participation d\u00e9clin\u00e9e',
                  style: AppTypography.label.copyWith(
                    color: AppColors.inkMuted,
                    fontWeight: FontWeight.w600,
                  ),
                ),
                const SizedBox(height: 2),
                Text(
                  'Vous ne participerez pas \u00e0 cet \u00e9v\u00e9nement',
                  style: AppTypography.bodySmall.copyWith(
                    color: isDark ? AppColors.darkInkMuted : AppColors.inkMuted,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// Join session button
// ═══════════════════════════════════════════════════════════════════════════════

class _JoinSessionButton extends StatelessWidget {
  const _JoinSessionButton({required this.event});

  final EventModel event;

  @override
  Widget build(BuildContext context) {
    return MuqabalaButton(
      label: 'Rejoindre la session',
      icon: Icons.videocam_outlined,
      variant: MuqabalaButtonVariant.secondary,
      onPressed: () => _launchWebinarUrl(context),
    );
  }

  Future<void> _launchWebinarUrl(BuildContext context) async {
    final urlString = event.config?['webinarjam_url'] as String?;
    if (urlString == null || urlString.isEmpty) return;

    try {
      final uri = Uri.parse(urlString);
      final launched = await launchUrl(
        uri,
        mode: LaunchMode.externalApplication,
      );

      if (!launched) {
        AppLogger.warning(
          'Could not launch webinar URL: $urlString',
          tag: 'EventDetail',
        );

        if (context.mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(
              content: Text(
                'Impossible d\'ouvrir le lien de la session.',
              ),
            ),
          );
        }
      }
    } on Exception catch (e, st) {
      AppLogger.error(
        'Error launching webinar URL',
        tag: 'EventDetail',
        error: e,
        stackTrace: st,
      );

      if (context.mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text(
              'Erreur lors de l\'ouverture du lien.',
            ),
          ),
        );
      }
    }
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// Join Blink Date button
// ═══════════════════════════════════════════════════════════════════════════════

class _JoinBlinkDateButton extends StatelessWidget {
  const _JoinBlinkDateButton({required this.event});

  final EventModel event;

  @override
  Widget build(BuildContext context) {
    return MuqabalaButton(
      label: 'Rejoindre le Blink Date',
      icon: Icons.bolt_rounded,
      variant: MuqabalaButtonVariant.primary,
      onPressed: () => context.pushNamed(
        RouteNames.blinkDate,
        extra: event.id,
      ),
    );
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// Loading skeleton
// ═══════════════════════════════════════════════════════════════════════════════

class _DetailLoadingSkeleton extends StatelessWidget {
  const _DetailLoadingSkeleton();

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const LoadingSkeleton(width: 120, height: 28, borderRadius: 8),
          AppSpacing.gapLg,
          const LoadingSkeleton(height: 36, borderRadius: 8),
          AppSpacing.gapMd,
          const LoadingSkeleton(width: 250, height: 18, borderRadius: 6),
          AppSpacing.gapSm,
          const LoadingSkeleton(width: 200, height: 18, borderRadius: 6),
          AppSpacing.gapXl,
          const LoadingSkeleton(height: 80, borderRadius: 10),
          AppSpacing.gapXl,
          const LoadingSkeleton(width: 140, height: 22, borderRadius: 6),
          AppSpacing.gapMd,
          Row(
            children: List.generate(
              4,
              (i) => Padding(
                padding: EdgeInsets.only(right: i < 3 ? 4 : 0),
                child: const LoadingSkeleton.circle(diameter: 36),
              ),
            ),
          ),
          AppSpacing.gapXl,
          const LoadingSkeleton(height: 52, borderRadius: 12),
        ],
      ),
    );
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// Not found view
// ═══════════════════════════════════════════════════════════════════════════════

class _DetailNotFound extends StatelessWidget {
  const _DetailNotFound();

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Center(
      child: Padding(
        padding: AppSpacing.screenPadding,
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(
              Icons.event_busy_outlined,
              size: 64,
              color: AppColors.inkFaint,
            ),
            AppSpacing.gapMd,
            Text(
              '\u00c9v\u00e9nement introuvable',
              style: AppTypography.h3.copyWith(
                color: isDark ? AppColors.darkInk : AppColors.ink,
              ),
              textAlign: TextAlign.center,
            ),
            AppSpacing.gapSm,
            Text(
              'Cet \u00e9v\u00e9nement n\'existe pas ou a \u00e9t\u00e9 supprim\u00e9.',
              style: AppTypography.bodyMedium.copyWith(
                color: isDark ? AppColors.darkInkMuted : AppColors.inkMuted,
              ),
              textAlign: TextAlign.center,
            ),
          ],
        ),
      ),
    );
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// Error view
// ═══════════════════════════════════════════════════════════════════════════════

class _DetailErrorView extends StatelessWidget {
  const _DetailErrorView({
    required this.error,
    required this.onRetry,
  });

  final Object error;
  final VoidCallback onRetry;

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Center(
      child: Padding(
        padding: AppSpacing.screenPadding,
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(
              Icons.error_outline_rounded,
              size: 48,
              color: AppColors.error.withValues(alpha: 0.7),
            ),
            AppSpacing.gapMd,
            Text(
              'Erreur de chargement',
              style: AppTypography.h3.copyWith(
                color: isDark ? AppColors.darkInk : AppColors.ink,
              ),
              textAlign: TextAlign.center,
            ),
            AppSpacing.gapSm,
            Text(
              'Impossible de charger les d\u00e9tails de l\'\u00e9v\u00e9nement.\n'
              'V\u00e9rifiez votre connexion et r\u00e9essayez.',
              style: AppTypography.bodyMedium.copyWith(
                color: isDark ? AppColors.darkInkMuted : AppColors.inkMuted,
              ),
              textAlign: TextAlign.center,
            ),
            AppSpacing.gapLg,
            TextButton.icon(
              onPressed: onRetry,
              icon: const Icon(Icons.refresh_rounded),
              label: const Text('R\u00e9essayer'),
              style: TextButton.styleFrom(
                foregroundColor: AppColors.violet,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
