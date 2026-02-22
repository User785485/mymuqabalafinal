/// Formulaires exploratoires list screen.
///
/// Displays formulaires grouped by type: Sc\u00e9narios (S1-S10),
/// Phases P1-P4 (F1.x-F4.x), and Express.
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
import 'package:my_muqabala/core/widgets/verset_card.dart';
import 'package:my_muqabala/features/high_ticket/data/formulaire_descriptions.dart';
import 'package:my_muqabala/features/high_ticket/data/models/formulaire_model.dart';
import 'package:my_muqabala/features/high_ticket/presentation/providers/high_ticket_provider.dart';
import 'package:my_muqabala/features/high_ticket/presentation/widgets/phase_expansion_widget.dart';
import 'package:my_muqabala/features/high_ticket/presentation/widgets/progress_bar_widget.dart';

class FormulairesScreen extends ConsumerWidget {
  const FormulairesScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final formulairesAsync = ref.watch(formulairesProvider);

    return Scaffold(
      backgroundColor: isDark ? AppColors.darkBg : AppColors.paper,
      appBar: AppBar(
        title: Text(
          'Formulaires exploratoires',
          style: AppTypography.h3.copyWith(
            color: isDark ? AppColors.darkInk : AppColors.ink,
          ),
        ),
        backgroundColor: isDark ? AppColors.darkBg : AppColors.paper,
        surfaceTintColor: Colors.transparent,
        elevation: 0,
      ),
      body: formulairesAsync.when(
        data: (items) {
          if (items.isEmpty) {
            return const EmptyState(
              icon: Icons.quiz_outlined,
              title: 'Aucun formulaire disponible',
              subtitle:
                  'Tes formulaires exploratoires appara\u00eetront ici.',
            );
          }

          // Parse into FormulaireModel and group
          final formulaires =
              items.map(FormulaireModel.fromContent).toList();
          final grouped = <FormulaireGroup, List<FormulaireModel>>{};
          for (final f in formulaires) {
            grouped.putIfAbsent(f.group, () => []).add(f);
          }

          // Global progress
          final total = formulaires.length;
          final completed =
              formulaires.where((f) => f.isCompleted).length;
          final percentage =
              total > 0 ? (completed / total * 100).round() : 0;

          return RefreshIndicator(
            color: AppColors.violet,
            onRefresh: () async {
              ref.invalidate(formulairesProvider);
              await ref.read(formulairesProvider.future);
            },
            child: ListView(
              padding: EdgeInsets.only(
                left: AppSpacing.md,
                right: AppSpacing.md,
                top: AppSpacing.lg,
                bottom: AppSpacing.lg,
              ),
              children: [
                // Global progress
                Row(
                  children: [
                    Expanded(
                      child: ProgressBarWidget(percentage: percentage),
                    ),
                    AppSpacing.horizontalMd,
                    Text(
                      '$completed/$total compl\u00e9t\u00e9s',
                      style: AppTypography.bodySmall.copyWith(
                        color: isDark
                            ? AppColors.darkInkMuted
                            : AppColors.inkMuted,
                      ),
                    ),
                  ],
                ),
                AppSpacing.gapLg,
                // Grouped expansion tiles
                for (final group in FormulaireGroup.values)
                  if (grouped.containsKey(group)) ...[
                    PhaseExpansionWidget(
                      title: FormulaireModel.groupLabel(group),
                      subtitle: kFormulaireGroupDescriptions[group.name],
                      completedCount: grouped[group]!
                          .where((f) => f.isCompleted)
                          .length,
                      totalCount: grouped[group]!.length,
                      initiallyExpanded: false,
                      children: grouped[group]!
                          .map((f) => _FormulaireTile(
                                formulaire: f,
                                isDark: isDark,
                                onTap: () {
                                  context.pushNamed(
                                    RouteNames.formulaireDetail,
                                    pathParameters: {'formId': f.id},
                                  );
                                },
                              ))
                          .toList(),
                    ),
                    AppSpacing.gapSm,
                  ],
                AppSpacing.gapXl,
                AppVersets.formulaires,
              ],
            ),
          );
        },
        loading: () => const SingleChildScrollView(
          padding: EdgeInsets.all(AppSpacing.md),
          child: LoadingSkeletonList(itemCount: 6, itemHeight: 60),
        ),
        error: (error, _) => EmptyState(
          icon: Icons.error_outline_rounded,
          title: 'Erreur de chargement',
          subtitle: error.toString(),
          actionLabel: 'R\u00e9essayer',
          onAction: () => ref.invalidate(formulairesProvider),
        ),
      ),
    );
  }
}

class _FormulaireTile extends StatelessWidget {
  const _FormulaireTile({
    required this.formulaire,
    required this.isDark,
    required this.onTap,
  });

  final FormulaireModel formulaire;
  final bool isDark;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final desc = kFormulaireDescriptions[
        formulaire.content.contentKey.toUpperCase()];

    return InkWell(
      onTap: onTap,
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    formulaire.displayTitle,
                    style: AppTypography.bodyMedium.copyWith(
                      color: isDark ? AppColors.darkInk : AppColors.ink,
                    ),
                  ),
                  if (desc != null) ...[
                    const SizedBox(height: 2),
                    Text(
                      desc,
                      style: AppTypography.bodySmall.copyWith(
                        color: isDark
                            ? AppColors.darkInkMuted
                            : AppColors.inkMuted,
                        fontSize: 11,
                        fontStyle: FontStyle.italic,
                      ),
                      maxLines: 2,
                      overflow: TextOverflow.ellipsis,
                    ),
                  ],
                ],
              ),
            ),
            const SizedBox(width: 8),
            formulaire.isCompleted
                ? const Icon(
                    Icons.check_circle_rounded,
                    color: AppColors.success,
                    size: 20,
                  )
                : const Icon(
                    Icons.chevron_right_rounded,
                    size: 20,
                  ),
          ],
        ),
      ),
    );
  }
}
