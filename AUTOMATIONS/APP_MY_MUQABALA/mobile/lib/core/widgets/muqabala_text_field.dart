/// Custom text field with My Muqabala styling.
///
/// Features:
///   - 12px rounded border
///   - Soft purple focus color
///   - Error state highlighted in rose
///   - Label, hint, prefix & suffix icon support
///   - Optional password visibility toggle
///
/// ```dart
/// MuqabalaTextField(
///   label: 'Email',
///   hint: 'votre@email.com',
///   prefixIcon: Icons.email_outlined,
///   controller: emailController,
///   keyboardType: TextInputType.emailAddress,
/// )
/// ```
library;

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import 'package:my_muqabala/core/constants/app_colors.dart';

/// A styled text field matching the My Muqabala design system.
class MuqabalaTextField extends StatefulWidget {
  const MuqabalaTextField({
    this.controller,
    this.label,
    this.hint,
    this.errorText,
    this.prefixIcon,
    this.suffixIcon,
    this.onSuffixTap,
    this.obscureText = false,
    this.showPasswordToggle = false,
    this.enabled = true,
    this.readOnly = false,
    this.maxLines = 1,
    this.minLines,
    this.maxLength,
    this.keyboardType,
    this.textInputAction,
    this.textCapitalization = TextCapitalization.none,
    this.inputFormatters,
    this.onChanged,
    this.onSubmitted,
    this.onTap,
    this.focusNode,
    this.autofillHints,
    this.validator,
    this.autovalidateMode,
    super.key,
  });

  /// Controls the text being edited.
  final TextEditingController? controller;

  /// Floating label text above the field.
  final String? label;

  /// Hint text shown when the field is empty.
  final String? hint;

  /// Error message displayed below the field. If non-null, the field
  /// renders in the error state (rose border).
  final String? errorText;

  /// Icon displayed at the start of the field.
  final IconData? prefixIcon;

  /// Icon displayed at the end of the field. Ignored when
  /// [showPasswordToggle] is true (the toggle icon takes precedence).
  final IconData? suffixIcon;

  /// Callback when [suffixIcon] is tapped.
  final VoidCallback? onSuffixTap;

  /// Whether to obscure the text (password mode).
  final bool obscureText;

  /// When true, adds a visibility toggle icon at the suffix position.
  /// Overrides [suffixIcon].
  final bool showPasswordToggle;

  /// Whether the field is interactive.
  final bool enabled;

  /// Whether the field is read-only (tappable but not editable).
  final bool readOnly;

  /// Maximum number of lines. Set to `null` for unlimited.
  final int? maxLines;

  /// Minimum number of lines.
  final int? minLines;

  /// Maximum character count (shows counter if set).
  final int? maxLength;

  /// Keyboard type hint.
  final TextInputType? keyboardType;

  /// Action button on the soft keyboard.
  final TextInputAction? textInputAction;

  /// Text capitalization behavior.
  final TextCapitalization textCapitalization;

  /// Input formatters applied to the field.
  final List<TextInputFormatter>? inputFormatters;

  /// Called whenever the field value changes.
  final ValueChanged<String>? onChanged;

  /// Called when the user submits (e.g., presses enter).
  final ValueChanged<String>? onSubmitted;

  /// Called when the field is tapped.
  final VoidCallback? onTap;

  /// Focus node for managing focus state.
  final FocusNode? focusNode;

  /// Autofill hints for the platform autofill service.
  final Iterable<String>? autofillHints;

  /// Validator for use inside a [Form].
  final FormFieldValidator<String>? validator;

  /// When to run [validator].
  final AutovalidateMode? autovalidateMode;

  @override
  State<MuqabalaTextField> createState() => _MuqabalaTextFieldState();
}

class _MuqabalaTextFieldState extends State<MuqabalaTextField> {
  late bool _isObscured;

  @override
  void initState() {
    super.initState();
    _isObscured = widget.obscureText;
  }

  @override
  void didUpdateWidget(covariant MuqabalaTextField oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.obscureText != widget.obscureText) {
      _isObscured = widget.obscureText;
    }
  }

  void _toggleObscure() {
    setState(() => _isObscured = !_isObscured);
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final hasError = widget.errorText != null && widget.errorText!.isNotEmpty;

    return TextFormField(
      controller: widget.controller,
      focusNode: widget.focusNode,
      obscureText: _isObscured,
      enabled: widget.enabled,
      readOnly: widget.readOnly,
      maxLines: widget.obscureText ? 1 : widget.maxLines,
      minLines: widget.minLines,
      maxLength: widget.maxLength,
      keyboardType: widget.keyboardType,
      textInputAction: widget.textInputAction,
      textCapitalization: widget.textCapitalization,
      inputFormatters: widget.inputFormatters,
      onChanged: widget.onChanged,
      onFieldSubmitted: widget.onSubmitted,
      onTap: widget.onTap,
      autofillHints: widget.autofillHints,
      validator: widget.validator,
      autovalidateMode: widget.autovalidateMode,
      style: theme.textTheme.bodyLarge,
      cursorColor: AppColors.purple,
      decoration: InputDecoration(
        labelText: widget.label,
        hintText: widget.hint,
        errorText: widget.errorText,
        errorMaxLines: 2,

        // ── Prefix icon ────────────────────────────────────────────────
        prefixIcon: widget.prefixIcon != null
            ? Icon(
                widget.prefixIcon,
                size: 20,
                color: hasError ? AppColors.rose : AppColors.inkMuted,
              )
            : null,

        // ── Suffix icon / password toggle ──────────────────────────────
        suffixIcon: _buildSuffix(hasError),

        // ── Border overrides for error state using rose ────────────────
        errorBorder: const OutlineInputBorder(
          borderRadius: BorderRadius.all(Radius.circular(12)),
          borderSide: BorderSide(color: AppColors.rose, width: 1),
        ),
        focusedErrorBorder: const OutlineInputBorder(
          borderRadius: BorderRadius.all(Radius.circular(12)),
          borderSide: BorderSide(color: AppColors.rose, width: 1.5),
        ),
        errorStyle: theme.textTheme.bodySmall?.copyWith(
          color: AppColors.rose,
        ),
      ),
    );
  }

  Widget? _buildSuffix(bool hasError) {
    if (widget.showPasswordToggle) {
      return IconButton(
        icon: Icon(
          _isObscured
              ? Icons.visibility_outlined
              : Icons.visibility_off_outlined,
          size: 20,
          color: hasError ? AppColors.rose : AppColors.inkMuted,
        ),
        onPressed: _toggleObscure,
        splashRadius: 20,
      );
    }

    if (widget.suffixIcon != null) {
      return IconButton(
        icon: Icon(
          widget.suffixIcon,
          size: 20,
          color: hasError ? AppColors.rose : AppColors.inkMuted,
        ),
        onPressed: widget.onSuffixTap,
        splashRadius: 20,
      );
    }

    return null;
  }
}
