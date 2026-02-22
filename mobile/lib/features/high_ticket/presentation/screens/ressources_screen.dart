/// Ressources p\u00e9dagogiques screen.
///
/// TabBar with two tabs:
///   - Programme 48 semaines
///   - Ramadan 2026
/// Each tab shows a list of items with checkboxes and progress bar.
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
import 'package:my_muqabala/features/high_ticket/data/models/ressource_model.dart';
import 'package:my_muqabala/features/high_ticket/presentation/providers/high_ticket_provider.dart';
import 'package:my_muqabala/features/high_ticket/presentation/widgets/progress_bar_widget.dart';

class RessourcesScreen extends ConsumerWidget {
  const RessourcesScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final ressourcesAsync = ref.watch(ressourcesProvider);

    return DefaultTabController(
      length: 2,
      child: Scaffold(
        backgroundColor: isDark ? AppColors.darkBg : AppColors.paper,
        appBar: AppBar(
          title: Text(
            'Ressources p\u00e9dagogiques',
            style: AppTypography.h3.copyWith(
              color: isDark ? AppColors.darkInk : AppColors.ink,
            ),
          ),
          backgroundColor: isDark ? AppColors.darkBg : AppColors.paper,
          surfaceTintColor: Colors.transparent,
          elevation: 0,
          bottom: TabBar(
            indicatorColor: AppColors.violet,
            labelColor: AppColors.violet,
            unselectedLabelColor:
                isDark ? AppColors.darkInkMuted : AppColors.inkMuted,
            tabs: const [
              Tab(text: 'Programme 48 semaines'),
              Tab(text: 'Ramadan 2026'),
            ],
          ),
        ),
        body: ressourcesAsync.when(
          data: (items) {
            final ressources =
                items.map(RessourceModel.fromContent).toList();
            final programme = ressources
                .where((r) => r.category == RessourceCategory.programme48)
                .toList();
            final ramadan = ressources
                .where((r) => r.category == RessourceCategory.ramadan)
                .toList();

            return TabBarView(
              children: [
                _RessourceTabContent(
                  ressources: programme,
                  emptyMessage:
                      'Le programme de 48 semaines n\u2019est pas encore disponible.',
                  isDark: isDark,
                ),
                _RessourceTabContent(
                  ressources: ramadan,
                  emptyMessage:
                      'Les ressources Ramadan ne sont pas encore disponibles.',
                  isDark: isDark,
                ),
              ],
            );
          },
          loading: () => const SingleChildScrollView(
            padding: EdgeInsets.all(AppSpacing.md),
            child: LoadingSkeletonList(itemCount: 6, itemHeight: 56),
          ),
          error: (error, _) => EmptyState(
            icon: Icons.error_outline_rounded,
            title: 'Erreur de chargement',
            subtitle: error.toString(),
            actionLabel: 'R\u00e9essayer',
            onAction: () => ref.invalidate(ressourcesProvider),
          ),
        ),
      ),
    );
  }
}

class _RessourceTabContent extends StatelessWidget {
  const _RessourceTabContent({
    required this.ressources,
    required this.emptyMessage,
    required this.isDark,
  });

  final List<RessourceModel> ressources;
  final String emptyMessage;
  final bool isDark;

  @override
  Widget build(BuildContext context) {
    if (ressources.isEmpty) {
      return EmptyState(
        icon: Icons.school_outlined,
        title: 'Aucune ressource',
        subtitle: emptyMessage,
      );
    }

    final total = ressources.length;
    final completed = ressources.where((r) => r.isCompleted).length;
    final percentage = total > 0 ? (completed / total * 100).round() : 0;

    return ListView.builder(
      padding: EdgeInsets.only(
        left: AppSpacing.md,
        right: AppSpacing.md,
        top: AppSpacing.lg,
        bottom: AppSpacing.lg,
      ),
      itemCount: ressources.length + 1, // +1 for progress header
      itemBuilder: (context, index) {
        if (index == 0) {
          return Padding(
            padding: const EdgeInsets.only(bottom: AppSpacing.lg),
            child: Row(
              children: [
                Expanded(
                  child: ProgressBarWidget(
                    percentage: percentage,
                    color: const Color(0xFFD97706),
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
          );
        }

        final ressource = ressources[index - 1];
        return Card(
          elevation: 0,
          color: isDark ? AppColors.darkSurface : AppColors.surface,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(10),
            side: BorderSide(
              color: isDark ? AppColors.darkBorder : AppColors.divider,
            ),
          ),
          margin: const EdgeInsets.only(bottom: AppSpacing.sm),
          child: ListTile(
            leading: ressource.isCompleted
                ? const Icon(Icons.check_circle_rounded,
                    color: AppColors.success, size: 22)
                : Icon(Icons.circle_outlined,
                    color:
                        isDark ? AppColors.darkInkFaint : AppColors.inkFaint,
                    size: 22),
            title: Text(
              ressource.displayTitle,
              style: AppTypography.bodyMedium.copyWith(
                color: isDark ? AppColors.darkInk : AppColors.ink,
              ),
            ),
            subtitle: ressource.duration != null
                ? Text(
                    ressource.duration!,
                    style: AppTypography.bodySmall.copyWith(
                      color: isDark
                          ? AppColors.darkInkMuted
                          : AppColors.inkMuted,
                    ),
                  )
                : null,
            trailing:
                const Icon(Icons.chevron_right_rounded, size: 20),
            onTap: () {
              context.pushNamed(
                RouteNames.ressourceDetail,
                pathParameters: {'weekId': ressource.weekId},
              );
            },
          ),
        );
      },
    );
  }
}
