/// Event card widget displayed in the events list.
///
/// Shows:
///   - A colored type badge (chip) with the event type label
///   - Event title
///   - Formatted date (French locale)
///   - Optional location (lieu)
///
/// ```dart
/// EventCardWidget(
///   event: myEvent,
///   onTap: () => navigateToDetail(myEvent.id),
/// )
/// ```
library;

import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

import 'package:my_muqabala/core/constants/app_colors.dart';
import 'package:my_muqabala/core/constants/app_spacing.dart';
import 'package:my_muqabala/core/constants/app_typography.dart';
import 'package:my_muqabala/features/events/data/models/event_model.dart';

/// A card that summarizes an event for list display.
class EventCardWidget extends StatelessWidget {
  const EventCardWidget({
    required this.event,
    this.onTap,
    super.key,
  });

  /// The event data to display.
  final EventModel event;

  /// Callback when the card is tapped.
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final cardColor = isDark ? AppColors.darkCard : AppColors.surface;
    final borderColor = isDark ? AppColors.darkBorder : AppColors.divider;

    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
      child: Material(
        color: cardColor,
        borderRadius: AppRadius.borderLg,
        child: InkWell(
          onTap: onTap,
          borderRadius: AppRadius.borderLg,
          splashColor: event.typeColor.withValues(alpha: 0.08),
          highlightColor: event.typeColor.withValues(alpha: 0.04),
          child: Container(
            padding: AppSpacing.cardPadding,
            decoration: BoxDecoration(
              borderRadius: AppRadius.borderLg,
              border: Border.all(color: borderColor, width: 1),
              boxShadow: isDark
                  ? null
                  : [
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
                // ── Type badge + status ──────────────────────────────────
                Row(
                  children: [
                    _TypeBadge(event: event),
                    const Spacer(),
                    if (event.statut == 'annule')
                      Container(
                        padding: const EdgeInsets.symmetric(
                          horizontal: 8,
                          vertical: 3,
                        ),
                        decoration: BoxDecoration(
                          color: isDark ? AppColors.error.withValues(alpha: 0.15) : AppColors.errorLight,
                          borderRadius: AppRadius.borderSm,
                        ),
                        child: Text(
                          'Annulé',
                          style: AppTypography.caption.copyWith(
                            color: AppColors.error,
                            fontWeight: FontWeight.w500,
                          ),
                        ),
                      ),
                    if (event.statut == 'en_cours')
                      Container(
                        padding: const EdgeInsets.symmetric(
                          horizontal: 8,
                          vertical: 3,
                        ),
                        decoration: BoxDecoration(
                          color: isDark ? AppColors.success.withValues(alpha: 0.15) : AppColors.successLight,
                          borderRadius: AppRadius.borderSm,
                        ),
                        child: Text(
                          'En cours',
                          style: AppTypography.caption.copyWith(
                            color: AppColors.success,
                            fontWeight: FontWeight.w500,
                          ),
                        ),
                      ),
                  ],
                ),

                AppSpacing.gapSm,

                // ── Title ────────────────────────────────────────────────
                Text(
                  event.titre,
                  style: AppTypography.h3.copyWith(
                    color: isDark ? AppColors.darkInk : AppColors.ink,
                  ),
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                ),

                AppSpacing.gapSm,

                // ── Date ─────────────────────────────────────────────────
                Row(
                  children: [
                    Icon(
                      Icons.calendar_today_outlined,
                      size: 14,
                      color: isDark
                          ? AppColors.darkInkMuted
                          : AppColors.inkMuted,
                    ),
                    const SizedBox(width: 6),
                    Text(
                      _formatDate(event.dateEvenement),
                      style: AppTypography.bodySmall.copyWith(
                        color: isDark
                            ? AppColors.darkInkMuted
                            : AppColors.inkMuted,
                      ),
                    ),
                  ],
                ),

                // ── Location (if available) ──────────────────────────────
                if (event.lieu != null && event.lieu!.isNotEmpty) ...[
                  const SizedBox(height: 4),
                  Row(
                    children: [
                      Icon(
                        Icons.location_on_outlined,
                        size: 14,
                        color: isDark
                            ? AppColors.darkInkMuted
                            : AppColors.inkMuted,
                      ),
                      const SizedBox(width: 6),
                      Expanded(
                        child: Text(
                          event.lieu!,
                          style: AppTypography.bodySmall.copyWith(
                            color: isDark
                                ? AppColors.darkInkMuted
                                : AppColors.inkMuted,
                          ),
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                        ),
                      ),
                    ],
                  ),
                ],
              ],
            ),
          ),
        ),
      ),
    );
  }

  /// Formats the event date in French locale.
  ///
  /// Example output: "24 février 2026 à 14:30"
  String _formatDate(DateTime date) {
    final dateFormat = DateFormat.yMMMMd('fr_FR');
    final timeFormat = DateFormat.Hm('fr_FR');
    return '${dateFormat.format(date)} \u00e0 ${timeFormat.format(date)}';
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// Type badge
// ═══════════════════════════════════════════════════════════════════════════════

/// Colored chip that displays the event type label.
class _TypeBadge extends StatelessWidget {
  const _TypeBadge({required this.event});

  final EventModel event;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
      decoration: BoxDecoration(
        color: event.typeBgColor,
        borderRadius: AppRadius.borderSm,
      ),
      child: Text(
        event.typeLabel,
        style: AppTypography.labelMedium.copyWith(
          color: event.typeColor,
          fontWeight: FontWeight.w600,
          letterSpacing: 0.2,
        ),
      ),
    );
  }
}
