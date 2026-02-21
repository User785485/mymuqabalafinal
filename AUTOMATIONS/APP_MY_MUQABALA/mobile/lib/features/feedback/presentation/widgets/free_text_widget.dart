/// Multi-line free text input widget for feedback forms.
///
/// Displays a styled [TextField] with a character counter and custom border
/// matching the My Muqabala design system.
library;

import 'package:flutter/material.dart';

import 'package:my_muqabala/core/constants/app_colors.dart';
import 'package:my_muqabala/core/constants/app_spacing.dart';
import 'package:my_muqabala/core/constants/app_typography.dart';

/// A multi-line text input for open-ended feedback answers.
class FreeTextWidget extends StatefulWidget {
  const FreeTextWidget({
    required this.value,
    required this.onChanged,
    this.hintText,
    this.maxLength = 1000,
    super.key,
  });

  /// Current text value, or `null` if empty.
  final String? value;

  /// Called whenever the text content changes.
  final ValueChanged<String> onChanged;

  /// Placeholder text inside the field.
  final String? hintText;

  /// Maximum allowed characters.
  final int maxLength;

  @override
  State<FreeTextWidget> createState() => _FreeTextWidgetState();
}

class _FreeTextWidgetState extends State<FreeTextWidget> {
  late TextEditingController _controller;

  @override
  void initState() {
    super.initState();
    _controller = TextEditingController(text: widget.value ?? '');
  }

  @override
  void didUpdateWidget(covariant FreeTextWidget oldWidget) {
    super.didUpdateWidget(oldWidget);
    // Sync controller when the parent value changes externally.
    if (widget.value != oldWidget.value &&
        widget.value != _controller.text) {
      _controller.text = widget.value ?? '';
      _controller.selection = TextSelection.fromPosition(
        TextPosition(offset: _controller.text.length),
      );
    }
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final charCount = _controller.text.length;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      mainAxisSize: MainAxisSize.min,
      children: [
        TextField(
          controller: _controller,
          onChanged: widget.onChanged,
          maxLines: null,
          minLines: 4,
          maxLength: widget.maxLength,
          buildCounter: (
            context, {
            required currentLength,
            required isFocused,
            required maxLength,
          }) =>
              null, // We render our own counter below.
          style: AppTypography.bodyMedium,
          cursorColor: AppColors.violet,
          decoration: InputDecoration(
            hintText: widget.hintText ?? '\u00c9crivez votre r\u00e9ponse ici\u2026',
            hintStyle: AppTypography.bodyMedium.copyWith(
              color: AppColors.inkFaint,
            ),
            filled: true,
            fillColor: AppColors.surface,
            contentPadding: AppSpacing.cardPadding,
            enabledBorder: OutlineInputBorder(
              borderRadius: AppRadius.borderLg,
              borderSide: const BorderSide(
                color: AppColors.border,
                width: 1.5,
              ),
            ),
            focusedBorder: OutlineInputBorder(
              borderRadius: AppRadius.borderLg,
              borderSide: const BorderSide(
                color: AppColors.violet,
                width: 2,
              ),
            ),
          ),
        ),

        AppSpacing.verticalXs,

        // ── Character counter ──────────────────────────────────────────
        Align(
          alignment: Alignment.centerRight,
          child: Text(
            '$charCount / ${widget.maxLength}',
            style: AppTypography.caption.copyWith(
              color: charCount > widget.maxLength * 0.9
                  ? AppColors.warning
                  : AppColors.inkFaint,
            ),
          ),
        ),
      ],
    );
  }
}
