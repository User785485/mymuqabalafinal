/// Yes / No / Not sure selector widget.
///
/// Displays three horizontally laid-out buttons. The selected button is
/// highlighted with [AppColors.violet] background and white text; unselected
/// buttons use an outlined style.
library;

import 'package:flutter/material.dart';

import 'package:my_muqabala/core/constants/app_colors.dart';
import 'package:my_muqabala/core/constants/app_spacing.dart';
import 'package:my_muqabala/core/constants/app_typography.dart';

/// A three-option selector: Oui / Non / Je ne sais pas.
class YesNoSelectorWidget extends StatelessWidget {
  const YesNoSelectorWidget({
    required this.value,
    required this.onChanged,
    super.key,
  });

  /// Currently selected value: `"oui"`, `"non"`, `"ne_sais_pas"`, or `null`.
  final String? value;

  /// Called with the tapped option value.
  final ValueChanged<String> onChanged;

  static const _options = [
    ('oui', 'Oui'),
    ('non', 'Non'),
    ('ne_sais_pas', 'Je ne sais pas'),
  ];

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: _options.map((option) {
        final (key, label) = option;
        final isSelected = value == key;

        return Padding(
          padding: const EdgeInsets.only(bottom: 12),
          child: SizedBox(
            width: double.infinity,
            child: AnimatedContainer(
              duration: const Duration(milliseconds: 200),
              curve: Curves.easeOut,
              decoration: BoxDecoration(
                color: isSelected
                    ? AppColors.violet
                    : AppColors.surface,
                borderRadius: AppRadius.borderLg,
                border: Border.all(
                  color: isSelected
                      ? AppColors.violet
                      : AppColors.border,
                  width: isSelected ? 2 : 1.5,
                ),
                boxShadow: isSelected
                    ? [
                        BoxShadow(
                          color: AppColors.violet.withValues(alpha: 0.2),
                          blurRadius: 8,
                          offset: const Offset(0, 2),
                        ),
                      ]
                    : null,
              ),
              child: Material(
                color: Colors.transparent,
                child: InkWell(
                  onTap: () => onChanged(key),
                  borderRadius: AppRadius.borderLg,
                  child: Padding(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 24,
                      vertical: 16,
                    ),
                    child: Center(
                      child: Text(
                        label,
                        style: AppTypography.label.copyWith(
                          color: isSelected
                              ? AppColors.surface
                              : AppColors.ink,
                        ),
                      ),
                    ),
                  ),
                ),
              ),
            ),
          ),
        );
      }).toList(),
    );
  }
}
