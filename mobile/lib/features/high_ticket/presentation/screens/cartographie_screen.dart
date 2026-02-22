/// Cartographie \u00e9motionnelle screen.
///
/// Displays 4 phases aligned with the web dashboard:
///   - Accueillir (DOC_01\u201303)
///   - Comprendre (DOC_04\u201311)
///   - Se situer (DOC_12\u201317)
///   - Agir (DOC_18\u201320)
/// Plus a bonus section for the Protocole de Lib\u00e9ration \u00c9motionnelle.
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
import 'package:my_muqabala/features/high_ticket/data/cartographie_descriptions.dart';
import 'package:my_muqabala/features/high_ticket/data/models/section_content_model.dart';
import 'package:my_muqabala/features/high_ticket/presentation/providers/high_ticket_provider.dart';
import 'package:my_muqabala/features/high_ticket/presentation/widgets/phase_expansion_widget.dart';
import 'package:my_muqabala/features/high_ticket/presentation/widgets/progress_bar_widget.dart';


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
                  'Ta cartographie \u00e9motionnelle appara\u00eetra ici.',
            );
          }

          final total = docs.length;
          final completed = docs.where((d) => d.isCompleted).length;
          final percentage =
              total > 0 ? (completed / total * 100).round() : 0;

          // Separate the Protocole from DOC_XX items
          final protocole = docs.where(
            (d) => d.contentKey.toUpperCase() == 'PROTOCOLE',
          ).toList();

          return RefreshIndicator(
            color: AppColors.violet,
            onRefresh: () async {
              ref.invalidate(cartographieDocsProvider);
              await ref.read(cartographieDocsProvider.future);
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
                for (var i = 0; i < kCartographiePhases.length; i++) ...[
                  _buildPhase(context, isDark, kCartographiePhases[i], docs),
                  AppSpacing.gapSm,
                ],
                // Bonus: Protocole de Libération Émotionnelle
                if (protocole.isNotEmpty) ...[
                  AppSpacing.gapMd,
                  _buildProtocole(context, isDark, protocole.first),
                ],
                AppSpacing.gapXl,
                AppVersets.accueil,
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
    PhaseInfo phase,
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
      subtitle: phase.subtitle,
      completedCount: completed,
      totalCount: phaseDocs.length,
      initiallyExpanded: false,
      children: phaseDocs.map((doc) {
        final docNum = _extractDocNum(doc.contentKey);
        final info = kCartographieDocDescriptions[docNum];

        return _DocTile(
          doc: doc,
          docNum: docNum,
          info: info,
          isDark: isDark,
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

  int _extractDocNum(String contentKey) {
    final match = RegExp(r'DOC_(\d+)').firstMatch(contentKey.toUpperCase());
    return match != null ? (int.tryParse(match.group(1)!) ?? 0) : 0;
  }

  Widget _buildProtocole(
    BuildContext context,
    bool isDark,
    SectionContentModel doc,
  ) {
    return Card(
      elevation: 0,
      color: isDark ? AppColors.darkSurface : AppColors.surface,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12),
        side: BorderSide(
          color: AppColors.violet.withValues(alpha: 0.3),
        ),
      ),
      child: InkWell(
        borderRadius: BorderRadius.circular(12),
        onTap: () {
          context.pushNamed(
            RouteNames.cartographieViewer,
            pathParameters: {'docId': doc.id},
          );
        },
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  Container(
                    width: 40,
                    height: 40,
                    decoration: BoxDecoration(
                      color: AppColors.violet.withValues(alpha: 0.1),
                      borderRadius: BorderRadius.circular(10),
                    ),
                    child: Icon(
                      doc.isCompleted
                          ? Icons.check_circle_rounded
                          : Icons.auto_awesome_rounded,
                      color: doc.isCompleted ? AppColors.success : AppColors.violet,
                      size: 22,
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          doc.titre ?? 'Protocole de Lib\u00e9ration \u00c9motionnelle',
                          style: AppTypography.label.copyWith(
                            color: isDark ? AppColors.darkInk : AppColors.ink,
                          ),
                        ),
                        const SizedBox(height: 2),
                        Text(
                          'Bonus',
                          style: AppTypography.bodySmall.copyWith(
                            color: AppColors.violet,
                            fontWeight: FontWeight.w500,
                          ),
                        ),
                      ],
                    ),
                  ),
                  const Icon(Icons.chevron_right_rounded, size: 20),
                ],
              ),
              const SizedBox(height: 10),
              Text(
                kProtocoleInfo.teaser,
                style: AppTypography.bodySmall.copyWith(
                  color: isDark ? AppColors.darkInkMuted : AppColors.inkMuted,
                  fontStyle: FontStyle.italic,
                  fontSize: 12,
                ),
              ),
              const SizedBox(height: 8),
              Wrap(
                spacing: 6,
                runSpacing: 4,
                children: kProtocoleInfo.tags
                    .map((tag) => _DocTag(tag: tag, isDark: isDark))
                    .toList(),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
// Enriched document tile with teaser + tags
// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550

class _DocTile extends StatelessWidget {
  const _DocTile({
    required this.doc,
    required this.docNum,
    required this.info,
    required this.isDark,
    required this.onTap,
  });

  final SectionContentModel doc;
  final int docNum;
  final CartographieDocInfo? info;
  final bool isDark;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                // Doc number badge
                Container(
                  width: 28,
                  height: 28,
                  decoration: BoxDecoration(
                    color: doc.isCompleted
                        ? AppColors.success.withValues(alpha: 0.12)
                        : const Color(0xFF0D9488).withValues(alpha: 0.1),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Center(
                    child: doc.isCompleted
                        ? const Icon(Icons.check_rounded,
                            color: AppColors.success, size: 16)
                        : Text(
                            docNum.toString().padLeft(2, '0'),
                            style: AppTypography.bodySmall.copyWith(
                              color: const Color(0xFF0D9488),
                              fontWeight: FontWeight.w700,
                              fontSize: 11,
                            ),
                          ),
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Text(
                    doc.titre ?? doc.contentKey,
                    style: AppTypography.bodyMedium.copyWith(
                      color: isDark ? AppColors.darkInk : AppColors.ink,
                    ),
                  ),
                ),
                const Icon(Icons.chevron_right_rounded, size: 20),
              ],
            ),
            if (info != null) ...[
              Padding(
                padding: const EdgeInsets.only(left: 40, top: 4),
                child: Text(
                  info!.teaser,
                  style: AppTypography.bodySmall.copyWith(
                    color: isDark
                        ? AppColors.darkInkMuted
                        : AppColors.inkMuted,
                    fontStyle: FontStyle.italic,
                    fontSize: 11,
                  ),
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                ),
              ),
              Padding(
                padding: const EdgeInsets.only(left: 40, top: 6),
                child: Wrap(
                  spacing: 6,
                  runSpacing: 4,
                  children: info!.tags
                      .map((tag) => _DocTag(tag: tag, isDark: isDark))
                      .toList(),
                ),
              ),
            ],
          ],
        ),
      ),
    );
  }
}

class _DocTag extends StatelessWidget {
  const _DocTag({required this.tag, required this.isDark});

  final String tag;
  final bool isDark;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
      decoration: BoxDecoration(
        color: const Color(0xFF0D9488).withValues(alpha: isDark ? 0.15 : 0.08),
        borderRadius: BorderRadius.circular(100),
      ),
      child: Text(
        tag,
        style: TextStyle(
          fontFamily: 'Outfit',
          fontSize: 10,
          fontWeight: FontWeight.w500,
          color: isDark
              ? const Color(0xFF5EEAD4)
              : const Color(0xFF0D9488),
        ),
      ),
    );
  }
}
