/// Documents list screen.
///
/// Displays all published coach documents for the current user in a
/// scrollable list with pull-to-refresh. Each card shows the document
/// type icon, title, date, and a "Nouveau" badge for unread items.
///
/// Tapping a card navigates to [DocumentViewerScreen] via go_router.
///
/// States:
///   - **Loading** : shimmer skeleton list
///   - **Empty**   : centered empty-state illustration
///   - **Error**   : centered error message with retry
///   - **Data**    : RefreshIndicator + ListView of DocumentCardWidgets
library;

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import 'package:my_muqabala/core/constants/app_colors.dart';
import 'package:my_muqabala/core/constants/app_spacing.dart';
import 'package:my_muqabala/core/constants/app_typography.dart';
import 'package:my_muqabala/core/router/route_names.dart';
import 'package:my_muqabala/core/widgets/empty_state.dart';
import 'package:my_muqabala/core/widgets/loading_skeleton.dart';
import 'package:my_muqabala/features/documents/data/models/document_model.dart';
import 'package:my_muqabala/features/documents/presentation/providers/documents_provider.dart';
import 'package:my_muqabala/features/documents/presentation/widgets/document_card_widget.dart';

/// The main documents list screen with its own Scaffold (standalone use).
class DocumentsScreen extends ConsumerWidget {
  const DocumentsScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final documentsAsync = ref.watch(documentsListProvider);

    return Scaffold(
      backgroundColor: AppColors.paper,
      appBar: AppBar(
        title: Text(
          'Documents',
          style: AppTypography.h2,
        ),
        centerTitle: false,
        backgroundColor: AppColors.paper,
        surfaceTintColor: Colors.transparent,
        elevation: 0,
      ),
      body: documentsAsync.when(
        data: (documents) => _DocumentsListBody(documents: documents),
        loading: () => const _DocumentsLoadingBody(),
        error: (error, _) => _DocumentsErrorBody(
          error: error,
          onRetry: () => ref.invalidate(documentsListProvider),
        ),
      ),
    );
  }
}

/// Extracted documents body widget — used by [MonEspaceScreen] in the
/// "Documents" tab without a wrapping Scaffold.
class DocumentsBody extends ConsumerWidget {
  const DocumentsBody({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final documentsAsync = ref.watch(documentsListProvider);

    return documentsAsync.when(
      data: (documents) => _DocumentsListBody(documents: documents),
      loading: () => const _DocumentsLoadingBody(),
      error: (error, _) => _DocumentsErrorBody(
        error: error,
        onRetry: () => ref.invalidate(documentsListProvider),
      ),
    );
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// Data body — list of documents with pull-to-refresh
// ═══════════════════════════════════════════════════════════════════════════════

class _DocumentsListBody extends ConsumerWidget {
  const _DocumentsListBody({required this.documents});

  final List<DocumentModel> documents;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    if (documents.isEmpty) {
      return const _DocumentsEmptyBody();
    }

    return RefreshIndicator(
      color: AppColors.violet,
      backgroundColor: AppColors.surface,
      onRefresh: () async {
        ref.invalidate(documentsListProvider);
        // Wait for the provider to complete its new fetch before
        // the RefreshIndicator dismisses the loading spinner.
        await ref.read(documentsListProvider.future);
      },
      child: ListView.builder(
        padding: const EdgeInsets.only(
          top: AppSpacing.sm,
          bottom: AppSpacing.xxl,
        ),
        physics: const AlwaysScrollableScrollPhysics(),
        itemCount: documents.length + 1, // +1 for the header
        itemBuilder: (context, index) {
          // Header showing total count
          if (index == 0) {
            return Padding(
              padding: const EdgeInsets.symmetric(
                horizontal: AppSpacing.md + 4,
                vertical: AppSpacing.sm,
              ),
              child: Text(
                '${documents.length} document${documents.length > 1 ? 's' : ''}',
                style: AppTypography.bodySmall.copyWith(
                  color: AppColors.inkMuted,
                ),
              ),
            );
          }

          final doc = documents[index - 1];

          return Padding(
            padding: const EdgeInsets.only(bottom: AppSpacing.xs),
            child: DocumentCardWidget(
              document: doc,
              onTap: () {
                context.pushNamed(
                  RouteNames.documentViewer,
                  pathParameters: {'documentId': doc.id},
                );
              },
            ),
          );
        },
      ),
    );
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// Loading body — shimmer skeletons
// ═══════════════════════════════════════════════════════════════════════════════

class _DocumentsLoadingBody extends StatelessWidget {
  const _DocumentsLoadingBody();

  @override
  Widget build(BuildContext context) {
    return const SingleChildScrollView(
      physics: NeverScrollableScrollPhysics(),
      padding: EdgeInsets.only(top: AppSpacing.md),
      child: LoadingSkeletonList(
        itemCount: 5,
        itemHeight: 80,
        spacing: 12,
      ),
    );
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// Empty body — no documents yet
// ═══════════════════════════════════════════════════════════════════════════════

class _DocumentsEmptyBody extends StatelessWidget {
  const _DocumentsEmptyBody();

  @override
  Widget build(BuildContext context) {
    return const EmptyState(
      icon: Icons.folder_open_outlined,
      title: 'Aucun document disponible',
      subtitle: 'Les documents de ton coach apparaîtront ici '
          'dès qu’ils seront publiés.',
    );
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// Error body — with retry
// ═══════════════════════════════════════════════════════════════════════════════

class _DocumentsErrorBody extends StatelessWidget {
  const _DocumentsErrorBody({
    required this.error,
    required this.onRetry,
  });

  final Object error;
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
              'Impossible de charger les documents',
              style: AppTypography.h3.copyWith(color: AppColors.ink),
              textAlign: TextAlign.center,
            ),
            AppSpacing.gapSm,
            Text(
              'Vérifie ta connexion internet et réessaie.',
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
