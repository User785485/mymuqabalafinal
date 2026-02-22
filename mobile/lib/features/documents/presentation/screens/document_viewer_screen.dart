/// Document viewer screen.
///
/// Displays the content of a single coach document. The document is
/// identified by [documentId], passed as a path parameter by go_router.
///
/// Content rendering:
///   - If `contenu_html` is present, the HTML content is displayed in a
///     scrollable [SelectableText] widget (cross-platform safe).
///   - If `contenu_url` is present, a button allows opening the external
///     URL in the device browser.
///   - If neither is available, a "no content" placeholder is shown.
///
/// On first load, the document is automatically marked as read.
library;

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:intl/intl.dart';
import 'package:url_launcher/url_launcher.dart';

import 'package:my_muqabala/core/constants/app_colors.dart';
import 'package:my_muqabala/core/constants/app_spacing.dart';
import 'package:my_muqabala/core/constants/app_typography.dart';
import 'package:my_muqabala/core/utils/logger.dart';
import 'package:my_muqabala/core/widgets/loading_skeleton.dart';
import 'package:my_muqabala/core/widgets/muqabala_button.dart';
import 'package:my_muqabala/features/documents/data/models/document_model.dart';
import 'package:my_muqabala/features/documents/presentation/providers/documents_provider.dart';
import 'package:my_muqabala/features/documents/presentation/widgets/document_type_icon.dart';

/// Screen for viewing a single coach document.
///
/// Receives [documentId] from the router path parameter.
class DocumentViewerScreen extends ConsumerStatefulWidget {
  /// Creates a [DocumentViewerScreen] for the given [documentId].
  const DocumentViewerScreen({required this.documentId, super.key});

  /// The ID of the document to display.
  final String documentId;

  @override
  ConsumerState<DocumentViewerScreen> createState() =>
      _DocumentViewerScreenState();
}

class _DocumentViewerScreenState extends ConsumerState<DocumentViewerScreen> {
  /// Tracks whether we have already triggered the mark-as-read call
  /// for this viewing session to avoid duplicate updates.
  bool _hasMarkedRead = false;

  @override
  Widget build(BuildContext context) {
    final docAsync = ref.watch(documentDetailProvider(widget.documentId));

    return Scaffold(
      backgroundColor: AppColors.paper,
      appBar: AppBar(
        title: docAsync.whenOrNull(
          data: (doc) => doc != null
              ? Text(
                  doc.titre,
                  style: AppTypography.label.copyWith(color: AppColors.ink),
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                )
              : const Text('Document'),
        ),
        centerTitle: false,
        backgroundColor: AppColors.paper,
        surfaceTintColor: Colors.transparent,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_rounded),
          color: AppColors.ink,
          onPressed: () => Navigator.of(context).pop(),
        ),
      ),
      body: docAsync.when(
        data: (doc) {
          if (doc == null) {
            return const _DocumentNotFound();
          }

          // Mark as read on first successful load.
          _markAsReadIfNeeded(doc);

          return _DocumentContent(document: doc);
        },
        loading: () => const _DocumentLoadingBody(),
        error: (error, _) => _DocumentErrorBody(
          onRetry: () =>
              ref.invalidate(documentDetailProvider(widget.documentId)),
        ),
      ),
    );
  }

  /// Marks the document as read (once per session) and refreshes
  /// the documents list + unread count providers.
  void _markAsReadIfNeeded(DocumentModel doc) {
    if (_hasMarkedRead || doc.isRead) return;
    _hasMarkedRead = true;

    // Fire-and-forget — we don't block the UI for this.
    Future.microtask(() async {
      try {
        final repository = ref.read(documentsRepositoryProvider);
        await repository.markAsRead(doc.id);

        // Refresh the list and unread count so they reflect the change.
        ref.invalidate(documentsListProvider);
        ref.invalidate(unreadDocCountProvider);

        AppLogger.info(
          'Document "${doc.id}" marked as read',
          tag: 'DocumentViewer',
        );
      } on Exception catch (e, st) {
        AppLogger.error(
          'Failed to mark document "${doc.id}" as read',
          tag: 'DocumentViewer',
          error: e,
          stackTrace: st,
        );
      }
    });
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// Document content body
// ═══════════════════════════════════════════════════════════════════════════════

class _DocumentContent extends StatelessWidget {
  const _DocumentContent({required this.document});

  final DocumentModel document;

  @override
  Widget build(BuildContext context) {
    final dateFormatter = DateFormat('d MMMM yyyy', 'fr_FR');
    final displayDate = document.publishedAt ?? document.createdAt;
    final formattedDate = dateFormatter.format(displayDate);

    return SingleChildScrollView(
      padding: AppSpacing.screenPadding,
      physics: const AlwaysScrollableScrollPhysics(),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // ── Header: icon + type + date ──────────────────────────────────
          Row(
            children: [
              DocumentTypeIcon(document: document, size: 40),
              AppSpacing.horizontalMd,
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      document.typeLabel,
                      style: AppTypography.labelMedium.copyWith(
                        color: document.typeColor,
                      ),
                    ),
                    AppSpacing.verticalXs,
                    Text(
                      'Publi\u00e9 le $formattedDate',
                      style: AppTypography.caption,
                    ),
                  ],
                ),
              ),
            ],
          ),
          AppSpacing.verticalMd,

          // ── Title ──────────────────────────────────────────────────────
          Text(
            document.titre,
            style: AppTypography.h2.copyWith(color: AppColors.ink),
          ),
          AppSpacing.verticalLg,

          // ── Divider ────────────────────────────────────────────────────
          const Divider(color: AppColors.divider, height: 1),
          AppSpacing.verticalLg,

          // ── Content area ───────────────────────────────────────────────
          if (document.contenuHtml != null && document.contenuHtml!.isNotEmpty)
            _HtmlContentViewer(html: document.contenuHtml!),

          if (document.contenuUrl != null && document.contenuUrl!.isNotEmpty)
            _ExternalUrlButton(url: document.contenuUrl!),

          // If neither HTML nor URL is present
          if ((document.contenuHtml == null || document.contenuHtml!.isEmpty) &&
              (document.contenuUrl == null || document.contenuUrl!.isEmpty))
            const _NoContentPlaceholder(),

          AppSpacing.verticalXl,
        ],
      ),
    );
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// HTML content viewer (cross-platform safe)
// ═══════════════════════════════════════════════════════════════════════════════

class _HtmlContentViewer extends StatelessWidget {
  const _HtmlContentViewer({required this.html});

  final String html;

  @override
  Widget build(BuildContext context) {
    // Strip HTML tags for a clean text rendering.
    // This provides a safe cross-platform fallback without dart:html.
    final plainText = _stripHtmlTags(html);

    return Container(
      width: double.infinity,
      padding: AppSpacing.cardPadding,
      decoration: BoxDecoration(
        color: AppColors.surface,
        borderRadius: AppRadius.borderLg,
        border: Border.all(color: AppColors.divider),
      ),
      child: SelectableText(
        plainText,
        style: AppTypography.bodyLarge.copyWith(
          color: AppColors.ink,
          height: 1.7,
        ),
      ),
    );
  }

  /// Removes HTML tags and decodes common HTML entities.
  static String _stripHtmlTags(String html) {
    // Remove HTML tags
    final withoutTags = html.replaceAll(RegExp(r'<[^>]*>'), '');

    // Decode common HTML entities
    return withoutTags
        .replaceAll('&nbsp;', ' ')
        .replaceAll('&amp;', '&')
        .replaceAll('&lt;', '<')
        .replaceAll('&gt;', '>')
        .replaceAll('&quot;', '"')
        .replaceAll('&#39;', "'")
        .replaceAll('&apos;', "'")
        .replaceAll('&laquo;', '\u00ab')
        .replaceAll('&raquo;', '\u00bb')
        .replaceAll('&ndash;', '\u2013')
        .replaceAll('&mdash;', '\u2014')
        .replaceAll('&hellip;', '\u2026')
        .replaceAll('&rsquo;', '\u2019')
        .replaceAll('&lsquo;', '\u2018')
        .replaceAll('&rdquo;', '\u201d')
        .replaceAll('&ldquo;', '\u201c')
        .replaceAllMapped(RegExp(r'&#(\d+);'), (match) {
      final code = int.tryParse(match.group(1) ?? '');
      if (code != null) return String.fromCharCode(code);
      return match.group(0) ?? '';
    }).trim();
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// External URL button
// ═══════════════════════════════════════════════════════════════════════════════

class _ExternalUrlButton extends StatelessWidget {
  const _ExternalUrlButton({required this.url});

  final String url;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        // Info card
        Container(
          padding: AppSpacing.cardPadding,
          decoration: BoxDecoration(
            color: AppColors.infoLight,
            borderRadius: AppRadius.borderLg,
          ),
          child: Row(
            children: [
              const Icon(
                Icons.open_in_new_rounded,
                color: AppColors.info,
                size: 20,
              ),
              AppSpacing.horizontalSm,
              Expanded(
                child: Text(
                  'Ce document est h\u00e9berg\u00e9 en ligne. '
                  'Appuyez sur le bouton ci-dessous pour l\u2019ouvrir.',
                  style: AppTypography.bodySmall.copyWith(
                    color: AppColors.info,
                  ),
                ),
              ),
            ],
          ),
        ),
        AppSpacing.verticalLg,

        // Open button
        MuqabalaButton(
          label: 'Ouvrir le document',
          icon: Icons.open_in_browser_rounded,
          onPressed: () => _openUrl(context),
        ),
      ],
    );
  }

  Future<void> _openUrl(BuildContext context) async {
    final uri = Uri.tryParse(url);
    if (uri == null) {
      AppLogger.error(
        'Invalid URL: $url',
        tag: 'DocumentViewer',
      );
      return;
    }

    try {
      final launched = await launchUrl(
        uri,
        mode: LaunchMode.externalApplication,
      );

      if (!launched) {
        AppLogger.warning(
          'Could not launch URL: $url',
          tag: 'DocumentViewer',
        );

        if (context.mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(
              content: Text('Impossible d\u2019ouvrir le lien.'),
            ),
          );
        }
      }
    } on Exception catch (e, st) {
      AppLogger.error(
        'Error launching URL: $url',
        tag: 'DocumentViewer',
        error: e,
        stackTrace: st,
      );

      if (context.mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Erreur lors de l\u2019ouverture du lien.'),
          ),
        );
      }
    }
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// No content placeholder
// ═══════════════════════════════════════════════════════════════════════════════

class _NoContentPlaceholder extends StatelessWidget {
  const _NoContentPlaceholder();

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: AppSpacing.dialogPadding,
      decoration: BoxDecoration(
        color: AppColors.surface,
        borderRadius: AppRadius.borderLg,
        border: Border.all(color: AppColors.divider),
      ),
      child: Column(
        children: [
          Icon(
            Icons.article_outlined,
            size: 48,
            color: AppColors.inkFaint.withValues(alpha: 0.5),
          ),
          AppSpacing.verticalMd,
          Text(
            'Contenu bient\u00f4t disponible',
            style: AppTypography.bodyMedium.copyWith(
              color: AppColors.inkMuted,
            ),
            textAlign: TextAlign.center,
          ),
          AppSpacing.verticalXs,
          Text(
            'Le contenu de ce document sera ajout\u00e9 prochainement.',
            style: AppTypography.bodySmall.copyWith(
              color: AppColors.inkFaint,
            ),
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// Loading body
// ═══════════════════════════════════════════════════════════════════════════════

class _DocumentLoadingBody extends StatelessWidget {
  const _DocumentLoadingBody();

  @override
  Widget build(BuildContext context) {
    return const Padding(
      padding: AppSpacing.screenPadding,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Header skeleton
          Row(
            children: [
              LoadingSkeleton.circle(diameter: 40),
              SizedBox(width: AppSpacing.md),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    LoadingSkeleton(width: 120, height: 14),
                    SizedBox(height: AppSpacing.xs),
                    LoadingSkeleton(width: 160, height: 12),
                  ],
                ),
              ),
            ],
          ),
          SizedBox(height: AppSpacing.lg),

          // Title skeleton
          LoadingSkeleton(height: 28),
          SizedBox(height: AppSpacing.sm),
          LoadingSkeleton(width: 200, height: 28),
          SizedBox(height: AppSpacing.lg),

          // Content skeleton
          LoadingSkeleton(height: 16),
          SizedBox(height: AppSpacing.sm),
          LoadingSkeleton(height: 16),
          SizedBox(height: AppSpacing.sm),
          LoadingSkeleton(height: 16),
          SizedBox(height: AppSpacing.sm),
          LoadingSkeleton(width: 280, height: 16),
          SizedBox(height: AppSpacing.lg),
          LoadingSkeleton(height: 16),
          SizedBox(height: AppSpacing.sm),
          LoadingSkeleton(height: 16),
          SizedBox(height: AppSpacing.sm),
          LoadingSkeleton(width: 200, height: 16),
        ],
      ),
    );
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// Document not found
// ═══════════════════════════════════════════════════════════════════════════════

class _DocumentNotFound extends StatelessWidget {
  const _DocumentNotFound();

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Padding(
        padding: AppSpacing.screenPadding,
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(
              Icons.find_in_page_outlined,
              size: 64,
              color: AppColors.inkFaint.withValues(alpha: 0.5),
            ),
            AppSpacing.gapMd,
            Text(
              'Document introuvable',
              style: AppTypography.h3.copyWith(color: AppColors.ink),
              textAlign: TextAlign.center,
            ),
            AppSpacing.gapSm,
            Text(
              'Ce document n\u2019existe pas ou a \u00e9t\u00e9 supprim\u00e9.',
              style: AppTypography.bodyMedium.copyWith(
                color: AppColors.inkMuted,
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
// Error body
// ═══════════════════════════════════════════════════════════════════════════════

class _DocumentErrorBody extends StatelessWidget {
  const _DocumentErrorBody({required this.onRetry});

  final VoidCallback onRetry;

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Padding(
        padding: AppSpacing.screenPadding,
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(
              Icons.error_outline_rounded,
              size: 56,
              color: AppColors.error.withValues(alpha: 0.7),
            ),
            AppSpacing.gapMd,
            Text(
              'Impossible de charger le document',
              style: AppTypography.h3.copyWith(color: AppColors.ink),
              textAlign: TextAlign.center,
            ),
            AppSpacing.gapSm,
            Text(
              'V\u00e9rifie ta connexion et r\u00e9essaie.',
              style: AppTypography.bodyMedium.copyWith(
                color: AppColors.inkMuted,
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
