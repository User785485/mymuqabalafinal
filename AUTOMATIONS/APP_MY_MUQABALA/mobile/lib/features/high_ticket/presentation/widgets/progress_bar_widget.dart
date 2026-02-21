/// Horizontal progress bar with percentage label.
library;

import 'package:flutter/material.dart';

import 'package:my_muqabala/core/constants/app_colors.dart';

class ProgressBarWidget extends StatelessWidget {
  const ProgressBarWidget({
    required this.percentage,
    this.color = AppColors.violet,
    this.height = 6,
    super.key,
  });

  final int percentage;
  final Color color;
  final double height;

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return ClipRRect(
      borderRadius: BorderRadius.circular(height / 2),
      child: SizedBox(
        height: height,
        child: LinearProgressIndicator(
          value: percentage / 100,
          backgroundColor:
              isDark ? Colors.white.withValues(alpha: 0.08) : Colors.black.withValues(alpha: 0.06),
          valueColor: AlwaysStoppedAnimation(color),
        ),
      ),
    );
  }
}
