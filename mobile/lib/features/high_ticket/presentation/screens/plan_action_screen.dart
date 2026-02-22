/// Plan d'action screen.
///
/// Displays a vertical timeline of 3 months with objectives (checkboxes)
/// and monthly bilans section.
library;

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import 'package:my_muqabala/core/constants/app_colors.dart';
import 'package:my_muqabala/core/widgets/verset_card.dart';
import 'package:my_muqabala/core/constants/app_spacing.dart';
import 'package:my_muqabala/core/constants/app_typography.dart';
import 'package:my_muqabala/core/widgets/empty_state.dart';
import 'package:my_muqabala/core/widgets/loading_skeleton.dart';
import 'package:my_muqabala/features/high_ticket/data/models/section_content_model.dart';
import 'package:my_muqabala/features/high_ticket/presentation/providers/high_ticket_provider.dart';
import 'package:my_muqabala/features/high_ticket/presentation/widgets/progress_bar_widget.dart';

class PlanActionScreen extends ConsumerWidget {
  const PlanActionScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final planAsync = ref.watch(planActionProvider);

    return Scaffold(
      backgroundColor: isDark ? AppColors.darkBg : AppColors.paper,
      appBar: AppBar(
        title: Text(
          'Plan d\u2019action',
          style: AppTypography.h3.copyWith(
            color: isDark ? AppColors.darkInk : AppColors.ink,
          ),
        ),
        backgroundColor: isDark ? AppColors.darkBg : AppColors.paper,
        surfaceTintColor: Colors.transparent,
        elevation: 0,
      ),
      body: planAsync.when(
        data: (items) {
          if (items.isEmpty) {
            return const EmptyState(
              icon: Icons.timeline_outlined,
              title: 'Plan d\u2019action non disponible',
              subtitle:
                  'Ton plan d\u2019action personnalis\u00e9 appara\u00eetra ici.',
            );
          }

          // Group by month (content_key pattern: month_1, month_2, month_3, bilan_1, etc.)
          final months = <String, List<SectionContentModel>>{};
          final bilans = <SectionContentModel>[];

          for (final item in items) {
            final key = item.contentKey.toLowerCase();
            if (key.startsWith('bilan')) {
              bilans.add(item);
            } else {
              final monthKey = _extractMonthKey(key);
              months.putIfAbsent(monthKey, () => []).add(item);
            }
          }

          final total = items.length;
          final completed = items.where((i) => i.isCompleted).length;
          final percentage =
              total > 0 ? (completed / total * 100).round() : 0;

          return RefreshIndicator(
            color: AppColors.violet,
            onRefresh: () async {
              ref.invalidate(planActionProvider);
              await ref.read(planActionProvider.future);
            },
            child: ListView(
              padding: EdgeInsets.only(
                left: AppSpacing.md,
                right: AppSpacing.md,
                top: AppSpacing.lg,
                bottom: AppSpacing.lg,
              ),
              children: [
                // Page subtitle
                Text(
                  'Ton plan concret pour cr\u00e9er des opportunit\u00e9s de rencontre saines dans ton environnement.',
                  style: AppTypography.bodySmall.copyWith(
                    color: isDark
                        ? AppColors.darkInkMuted
                        : AppColors.inkMuted,
                    fontStyle: FontStyle.italic,
                  ),
                ),
                AppSpacing.gapMd,
                // Progress
                Row(
                  children: [
                    Expanded(
                      child: ProgressBarWidget(
                        percentage: percentage,
                        color: AppColors.rose,
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
                // Timeline
                for (var i = 0; i < months.length; i++) ...[
                  _MonthSection(
                    monthLabel: _monthLabel(i),
                    items: months.values.elementAt(i),
                    isLast: i == months.length - 1 && bilans.isEmpty,
                    isDark: isDark,
                    ref: ref,
                  ),
                ],
                // Bilans
                if (bilans.isNotEmpty) ...[
                  AppSpacing.gapLg,
                  Text(
                    'Bilans mensuels',
                    style: AppTypography.h3.copyWith(
                      color: isDark ? AppColors.darkInk : AppColors.ink,
                      fontSize: 18,
                    ),
                  ),
                  AppSpacing.gapMd,
                  for (final bilan in bilans)
                    _BilanCard(bilan: bilan, isDark: isDark, ref: ref),
                ],
                AppSpacing.gapXl,
                AppVersets.compatibilite,
                AppSpacing.gapXxl,
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
          onAction: () => ref.invalidate(planActionProvider),
        ),
      ),
    );
  }

  String _extractMonthKey(String key) {
    final match = RegExp(r'month_(\d+)').firstMatch(key);
    return match != null ? 'month_${match.group(1)}' : 'other';
  }

  String _monthLabel(int index) {
    return switch (index) {
      0 => 'Mois 1',
      1 => 'Mois 2',
      2 => 'Mois 3',
      _ => 'Mois ${index + 1}',
    };
  }
}

class _MonthSection extends StatelessWidget {
  const _MonthSection({
    required this.monthLabel,
    required this.items,
    required this.isLast,
    required this.isDark,
    required this.ref,
  });

  final String monthLabel;
  final List<SectionContentModel> items;
  final bool isLast;
  final bool isDark;
  final WidgetRef ref;

  @override
  Widget build(BuildContext context) {
    return IntrinsicHeight(
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Timeline indicator
          SizedBox(
            width: 40,
            child: Column(
              children: [
                Container(
                  width: 12,
                  height: 12,
                  decoration: BoxDecoration(
                    color: AppColors.rose,
                    shape: BoxShape.circle,
                    border: Border.all(
                      color: AppColors.rose.withValues(alpha: 0.3),
                      width: 3,
                    ),
                  ),
                ),
                if (!isLast)
                  Expanded(
                    child: Container(
                      width: 2,
                      color: AppColors.rose.withValues(alpha: 0.2),
                    ),
                  ),
              ],
            ),
          ),
          // Content
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  monthLabel,
                  style: AppTypography.label.copyWith(
                    color: AppColors.rose,
                    fontWeight: FontWeight.w600,
                  ),
                ),
                AppSpacing.gapSm,
                for (final item in items)
                  Padding(
                    padding: const EdgeInsets.only(bottom: AppSpacing.xs),
                    child: _ObjectiveRow(
                      item: item,
                      isDark: isDark,
                      ref: ref,
                    ),
                  ),
                AppSpacing.gapLg,
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _ObjectiveRow extends StatelessWidget {
  const _ObjectiveRow({
    required this.item,
    required this.isDark,
    required this.ref,
  });

  final SectionContentModel item;
  final bool isDark;
  final WidgetRef ref;

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 0,
      color: isDark ? AppColors.darkSurface : AppColors.surface,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(10),
        side: BorderSide(
          color: isDark ? AppColors.darkBorder : AppColors.divider,
        ),
      ),
      child: ListTile(
        leading: GestureDetector(
          onTap: () {
            if (!item.isCompleted) {
              ref.read(markCompletedProvider(item.id));
            }
          },
          child: item.isCompleted
              ? const Icon(Icons.check_circle_rounded,
                  color: AppColors.success, size: 22)
              : Icon(Icons.circle_outlined,
                  color: isDark ? AppColors.darkInkFaint : AppColors.inkFaint,
                  size: 22),
        ),
        title: Text(
          item.titre ?? item.contentKey,
          style: AppTypography.bodyMedium.copyWith(
            color: isDark ? AppColors.darkInk : AppColors.ink,
            decoration: item.isCompleted
                ? TextDecoration.lineThrough
                : null,
          ),
        ),
        dense: true,
      ),
    );
  }
}

class _BilanCard extends StatelessWidget {
  const _BilanCard({
    required this.bilan,
    required this.isDark,
    required this.ref,
  });

  final SectionContentModel bilan;
  final bool isDark;
  final WidgetRef ref;

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 0,
      color: isDark ? AppColors.darkSurface : AppColors.surface,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12),
        side: BorderSide(
          color: AppColors.rose.withValues(alpha: 0.2),
        ),
      ),
      margin: const EdgeInsets.only(bottom: AppSpacing.sm),
      child: ListTile(
        leading: Icon(
          bilan.isCompleted
              ? Icons.assignment_turned_in_rounded
              : Icons.assignment_outlined,
          color: bilan.isCompleted ? AppColors.success : AppColors.rose,
        ),
        title: Text(
          bilan.titre ?? bilan.contentKey,
          style: AppTypography.bodyMedium.copyWith(
            color: isDark ? AppColors.darkInk : AppColors.ink,
          ),
        ),
        subtitle: Text(
          bilan.isCompleted ? 'Compl\u00e9t\u00e9' : 'En attente',
          style: AppTypography.bodySmall.copyWith(
            color: bilan.isCompleted
                ? AppColors.success
                : (isDark ? AppColors.darkInkMuted : AppColors.inkMuted),
          ),
        ),
        trailing: const Icon(Icons.chevron_right_rounded, size: 20),
      ),
    );
  }
}
