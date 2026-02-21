/// A card widget representing a single coach document in a list.
///
/// Shows a type icon, title, date, type label, and a "Nouveau" badge
/// if the document has not been read yet.
///
/// ```dart
/// DocumentCardWidget(
///   document: doc,
///   onTap: () => navigateToViewer(doc.id),
/// )
/// ```
library;

import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

import 'package:my_muqabala/core/constants/app_colors.dart';
import 'package:my_muqabala/core/constants/app_spacing.dart';
import 'package:my_muqabala/core/constants/app_typography.dart';
import 'package:my_muqabala/features/documents/data/models/document_model.dart';
import 'package:my_muqabala/features/documents/presentation/widgets/document_type_icon.dart';

/// A tappable card that summarizes a coach document.
class DocumentCardWidget extends StatelessWidget {
  /// Creates a [DocumentCardWidget] for the given [document].
  const DocumentCardWidget({
    required this.document,
    required this.onTap,
    super.key,
  });

  /// The document to display.
  final DocumentModel document;

  /// Callback when the card is tapped.
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final dateFormatter = DateFormat('d MMM yyyy', 'fr_FR');
    final displayDate = document.publishedAt ?? document.createdAt;
    final formattedDate = dateFormatter.format(displayDate);

    return GestureDetector(
      onTap: onTap,
      child: Container(
        margin: const EdgeInsets.symmetric(
          horizontal: AppSpacing.md,
          vertical: AppSpacing.xs,
        ),
        decoration: BoxDecoration(
          color: AppColors.surface,
          borderRadius: AppRadius.borderLg,
          border: Border.all(
            color: document.isRead ? AppColors.divider : AppColors.violet.withValues(alpha: 0.25),
          ),
          boxShadow: [
            BoxShadow(
              color: AppColors.shadowLight,
              blurRadius: 8,
              offset: const Offset(0, 2),
            ),
          ],
        ),
        child: Padding(
          padding: AppSpacing.cardPadding,
          child: Row(
            children: [
              // ── Type icon ─────────────────────────────────────────────
              DocumentTypeIcon(document: document, size: 48),
              AppSpacing.horizontalMd,

              // ── Title, type label, date ───────────────────────────────
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // Title
                    Text(
                      document.titre,
                      style: AppTypography.label.copyWith(
                        color: AppColors.ink,
                      ),
                      maxLines: 2,
                      overflow: TextOverflow.ellipsis,
                    ),
                    AppSpacing.verticalXs,

                    // Type label + date
                    Row(
                      children: [
                        Flexible(
                          child: Text(
                            document.typeLabel,
                            style: AppTypography.caption.copyWith(
                              color: AppColors.inkMuted,
                            ),
                            maxLines: 1,
                            overflow: TextOverflow.ellipsis,
                          ),
                        ),
                        Padding(
                          padding: const EdgeInsets.symmetric(horizontal: 6),
                          child: Text(
                            '\u2022',
                            style: AppTypography.caption.copyWith(
                              color: AppColors.inkFaint,
                            ),
                          ),
                        ),
                        Text(
                          formattedDate,
                          style: AppTypography.caption.copyWith(
                            color: AppColors.inkFaint,
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
              AppSpacing.horizontalSm,

              // ── "Nouveau" badge or chevron ────────────────────────────
              if (!document.isRead)
                Container(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 8,
                    vertical: 4,
                  ),
                  decoration: BoxDecoration(
                    color: AppColors.violet.withValues(alpha: 0.1),
                    borderRadius: AppRadius.borderCircular,
                  ),
                  child: Text(
                    'Nouveau',
                    style: AppTypography.labelSmall.copyWith(
                      color: AppColors.violet,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                )
              else
                Icon(
                  Icons.chevron_right_rounded,
                  color: AppColors.inkFaint,
                  size: 20,
                ),
            ],
          ),
        ),
      ),
    );
  }
}
