/// Cartographie \u00e9motionnelle screen.
///
/// Displays 4 phases with expansion tiles:
///   - Exploration (DOC_01\u201305)
///   - Approfondissement (DOC_06\u201310)
///   - Transformation (DOC_11\u201315)
///   - Int\u00e9gration (DOC_16\u201320)
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
import 'package:my_muqabala/features/high_ticket/data/models/section_content_model.dart';
import 'package:my_muqabala/features/high_ticket/presentation/providers/high_ticket_provider.dart';
import 'package:my_muqabala/features/high_ticket/presentation/widgets/phase_expansion_widget.dart';
import 'package:my_muqabala/features/high_ticket/presentation/widgets/progress_bar_widget.dart';

/// Phase definition for display.
class _Phase {
  const _Phase(this.title, this.start, this.end);
  final String title;
  final int start;
  final int end;
}

const _phases = [
  _Phase('Exploration', 1, 5),
  _Phase('Approfondissement', 6, 10),
  _Phase('Transformation', 11, 15),
  _Phase('Int\u00e9gration', 16, 20),
];

class CartographieScreen extends ConsumerWidget {
  const CartographieScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final docsAsync = ref.watch(cartographieDocsProvider);

    return Scaffold(
      backgroundColor: isDark ? AppColors.darkBg : AppColors.paper,
      appBar: AppBar(
        title: Text(
          'Cartographie \u00e9motionnelle',
          style: AppTypography.h3.copyWith(
            color: isDark ? AppColors.darkInk : AppColors.ink,
          ),
        ),
        backgroundColor: isDark ? AppColors.darkBg : AppColors.paper,
        surfaceTintColor: Colors.transparent,
        elevation: 0,
      ),
      body: docsAsync.when(
        data: (docs) {
          if (docs.isEmpty) {
            return const EmptyState(
              icon: Icons.map_outlined,
              title: 'Cartographie non disponible',
              subtitle:
                  'Votre cartographie \u00e9motionnelle appara\u00eetra ici.',
            );
          }

          final total = docs.length;
          final completed = docs.where((d) => d.isCompleted).length;
          final percentage =
              total > 0 ? (completed / total * 100).round() : 0;

          return RefreshIndicator(
            color: AppColors.violet,
            onRefresh: () async {
              ref.invalidate(cartographieDocsProvider);
              await ref.read(cartographieDocsProvider.future);
            },
            child: ListView(
              padding: AppSpacing.screenPadding,
              children: [
                // Global progress
                Row(
                  children: [
                    Expanded(
                      child: ProgressBarWidget(
                        percentage: percentage,
                        color: const Color(0xFF0D9488),
                      ),
                    ),
                    AppSpacing.horizontalMd,
                    Text(
                      '$completed/$total',
                      style: AppTypography.bodySmall.copyWith(
                        color: isDark
                            ? AppColors.darkInkMuted
                            : AppColors.inkMuted,
                      ),
                    ),
                  ],
                ),
                AppSpacing.gapLg,
                // Phase expansion tiles
                for (var i = 0; i < _phases.length; i++) ...[
                  _buildPhase(context, isDark, _phases[i], docs),
                  AppSpacing.gapSm,
                ],
              ],
            ),
          );
        },
        loading: () => const SingleChildScrollView(
          padding: EdgeInsets.all(AppSpacing.md),
          child: LoadingSkeletonList(itemCount: 5, itemHeight: 60),
        ),
        error: (error, _) => EmptyState(
          icon: Icons.error_outline_rounded,
          title: 'Erreur de chargement',
          subtitle: error.toString(),
          actionLabel: 'R\u00e9essayer',
          onAction: () => ref.invalidate(cartographieDocsProvider),
        ),
      ),
    );
  }

  Widget _buildPhase(
    BuildContext context,
    bool isDark,
    _Phase phase,
    List<SectionContentModel> allDocs,
  ) {
    // Filter docs for this phase (DOC_01 to DOC_20)
    final phaseDocs = allDocs.where((d) {
      final key = d.contentKey.toUpperCase();
      final match = RegExp(r'DOC_(\d+)').firstMatch(key);
      if (match == null) return false;
      final num = int.tryParse(match.group(1)!) ?? 0;
      return num >= phase.start && num <= phase.end;
    }).toList();

    final completed = phaseDocs.where((d) => d.isCompleted).length;

    return PhaseExpansionWidget(
      title: phase.title,
      completedCount: completed,
      totalCount: phaseDocs.length,
      initiallyExpanded: phaseDocs.any((d) => !d.isCompleted),
      children: phaseDocs.map((doc) {
        return ListTile(
          leading: doc.isCompleted
              ? const Icon(Icons.check_circle_rounded,
                  color: AppColors.success, size: 20)
              : Icon(Icons.circle_outlined,
                  color: isDark ? AppColors.darkInkFaint : AppColors.inkFaint,
                  size: 20),
          title: Text(
            doc.titre ?? doc.contentKey,
            style: AppTypography.bodyMedium.copyWith(
              color: isDark ? AppColors.darkInk : AppColors.ink,
            ),
          ),
          trailing: const Icon(Icons.chevron_right_rounded, size: 20),
          onTap: () {
            context.pushNamed(
              RouteNames.cartographieViewer,
              pathParameters: {'docId': doc.id},
            );
          },
        );
      }).toList(),
    );
  }
}
