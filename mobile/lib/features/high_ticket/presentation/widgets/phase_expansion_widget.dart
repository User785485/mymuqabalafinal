/// Stylized ExpansionTile for phases with a counter badge.
library;

import 'package:flutter/material.dart';

import 'package:my_muqabala/core/constants/app_colors.dart';
import 'package:my_muqabala/core/constants/app_typography.dart';

class PhaseExpansionWidget extends StatefulWidget {
  const PhaseExpansionWidget({
    required this.title,
    required this.completedCount,
    required this.totalCount,
    required this.children,
    this.subtitle,
    this.initiallyExpanded = false,
    super.key,
  });

  final String title;
  final String? subtitle;
  final int completedCount;
  final int totalCount;
  final List<Widget> children;
  final bool initiallyExpanded;

  @override
  State<PhaseExpansionWidget> createState() => _PhaseExpansionWidgetState();
}

class _PhaseExpansionWidgetState extends State<PhaseExpansionWidget> {
  final GlobalKey _tileKey = GlobalKey();

  Future<void> _onExpansionChanged(bool expanded) async {
    if (!expanded) return;
    // Wait for ExpansionTile animation (200ms) + layout settle.
    await Future<void>.delayed(const Duration(milliseconds: 250));
    if (!mounted) return;
    final ctx = _tileKey.currentContext;
    if (ctx != null) {
      await Scrollable.ensureVisible(
        // ignore: use_build_context_synchronously — GlobalKey context, guarded by mounted
        ctx,
        duration: const Duration(milliseconds: 300),
        curve: Curves.easeInOut,
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Card(
      key: _tileKey,
      elevation: 0,
      color: isDark ? AppColors.darkSurface : AppColors.surface,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12),
        side: BorderSide(
          color: isDark ? AppColors.darkBorder : AppColors.divider,
        ),
      ),
      clipBehavior: Clip.antiAlias,
      child: ExpansionTile(
        initiallyExpanded: widget.initiallyExpanded,
        onExpansionChanged: _onExpansionChanged,
        tilePadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
        title: Row(
          children: [
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text(
                    widget.title,
                    style: AppTypography.label.copyWith(
                      color: isDark ? AppColors.darkInk : AppColors.ink,
                    ),
                  ),
                  if (widget.subtitle != null) ...[
                    const SizedBox(height: 2),
                    Text(
                      widget.subtitle!,
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
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
              decoration: BoxDecoration(
                color: widget.completedCount == widget.totalCount &&
                        widget.totalCount > 0
                    ? AppColors.success.withValues(alpha: 0.15)
                    : AppColors.violet.withValues(alpha: 0.1),
                borderRadius: BorderRadius.circular(12),
              ),
              child: Text(
                '${widget.completedCount}/${widget.totalCount}',
                style: AppTypography.bodySmall.copyWith(
                  color: widget.completedCount == widget.totalCount &&
                          widget.totalCount > 0
                      ? AppColors.success
                      : AppColors.violet,
                  fontWeight: FontWeight.w600,
                  fontSize: 12,
                ),
              ),
            ),
          ],
        ),
        children: widget.children,
      ),
    );
  }
}
