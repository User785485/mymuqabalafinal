/// Ressource detail screen.
///
/// Displays a single ressource item with its HTML content rendered
/// natively via `flutter_widget_from_html_core`, with a "Marquer comme
/// termin\u00e9" button at the bottom.
library;

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_widget_from_html_core/flutter_widget_from_html_core.dart';

import 'package:my_muqabala/core/constants/app_colors.dart';
import 'package:my_muqabala/core/constants/app_spacing.dart';
import 'package:my_muqabala/core/constants/app_typography.dart';
import 'package:my_muqabala/core/widgets/empty_state.dart';
import 'package:my_muqabala/features/high_ticket/data/models/section_content_model.dart';
import 'package:my_muqabala/features/high_ticket/presentation/providers/high_ticket_provider.dart';

class RessourceDetailScreen extends ConsumerStatefulWidget {
  const RessourceDetailScreen({required this.weekId, super.key});

  final String weekId;

  @override
  ConsumerState<RessourceDetailScreen> createState() =>
      _RessourceDetailScreenState();
}

class _RessourceDetailScreenState
    extends ConsumerState<RessourceDetailScreen> {
  SectionContentModel? _ressource;
  bool _isLoading = true;
  bool _isCompleted = false;

  @override
  void initState() {
    super.initState();
    _loadRessource();
  }

  Future<void> _loadRessource() async {
    final items = await ref.read(ressourcesProvider.future);
    final item = items
        .where((i) => i.contentKey == widget.weekId)
        .firstOrNull;

    if (mounted) {
      setState(() {
        _ressource = item;
        _isCompleted = item?.isCompleted ?? false;
        _isLoading = false;
      });
    }
  }

  Future<void> _markCompleted() async {
    if (_ressource == null) return;
    ref.read(markCompletedProvider(_ressource!.id));
    setState(() => _isCompleted = true);
    if (mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Ressource marqu\u00e9e comme termin\u00e9e'),
          backgroundColor: AppColors.success,
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      backgroundColor: isDark ? AppColors.darkBg : AppColors.paper,
      appBar: AppBar(
        title: Text(
          _ressource?.titre ?? 'Ressource',
          style: AppTypography.h3.copyWith(
            color: isDark ? AppColors.darkInk : AppColors.ink,
            fontSize: 16,
          ),
          maxLines: 1,
          overflow: TextOverflow.ellipsis,
        ),
        backgroundColor: isDark ? AppColors.darkBg : AppColors.paper,
        surfaceTintColor: Colors.transparent,
        elevation: 0,
      ),
      body: _isLoading
          ? const Center(
              child: CircularProgressIndicator(
                valueColor: AlwaysStoppedAnimation(AppColors.violet),
              ),
            )
          : _ressource == null
              ? const EmptyState(
                  icon: Icons.school_outlined,
                  title: 'Ressource introuvable',
                  subtitle:
                      'Cette ressource n\u2019est pas encore disponible.',
                )
              : Column(
                  children: [
                    Expanded(
                      child: SingleChildScrollView(
                        padding: EdgeInsets.only(
                          left: AppSpacing.md,
                          right: AppSpacing.md,
                          top: AppSpacing.lg,
                          bottom: AppSpacing.lg,
                        ),
                        child: HtmlWidget(
                          _ressource!.contenuHtml ?? '',
                          textStyle: AppTypography.bodyMedium.copyWith(
                            color: isDark
                                ? AppColors.darkInk
                                : AppColors.ink,
                            height: 1.7,
                          ),
                        ),
                      ),
                    ),
                    // Mark as completed button
                    if (!_isCompleted)
                      SafeArea(
                        child: Padding(
                          padding: const EdgeInsets.all(AppSpacing.md),
                          child: SizedBox(
                            width: double.infinity,
                            child: FilledButton.icon(
                              onPressed: _markCompleted,
                              icon: const Icon(
                                  Icons.check_circle_outline_rounded),
                              label: const Text(
                                  'Marquer comme termin\u00e9'),
                              style: FilledButton.styleFrom(
                                backgroundColor: AppColors.violet,
                                foregroundColor: Colors.white,
                                padding: const EdgeInsets.symmetric(
                                    vertical: 14),
                                shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(12),
                                ),
                              ),
                            ),
                          ),
                        ),
                      ),
                  ],
                ),
    );
  }
}
