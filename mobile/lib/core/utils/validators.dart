/// Common form validators for the MyMuqabala app.
///
/// Every validator follows the same contract:
/// * Returns `null` when the value is valid.
/// * Returns a French-language error string when the value is invalid.
///
/// Usage with reactive_forms or plain TextFormField:
/// ```dart
/// TextFormField(
///   validator: Validators.phone,
/// )
/// ```
library;

/// Reusable form-field validators.
abstract final class Validators {
  // ── Phone (French format) ──────────────────────────────────────────────

  /// French mobile/landline starting with +33, 0033, or 0.
  ///
  /// Accepts spaces, dots, and dashes as separators.
  static final _phoneRegExp = RegExp(
    r'^(?:\+33|0033|0)\s*[1-9](?:[\s.\-]?\d{2}){4}$',
  );

  static String? phone(String? value) {
    if (value == null || value.trim().isEmpty) {
      return 'Le numéro de téléphone est requis';
    }
    final cleaned = value.trim();
    if (!_phoneRegExp.hasMatch(cleaned)) {
      return 'Numéro invalide (format : +33 6 12 34 56 78)';
    }
    return null;
  }

  // ── Email ──────────────────────────────────────────────────────────────

  /// Basic email validation (not RFC-5322 exhaustive, but practical).
  static final _emailRegExp = RegExp(
    r'^[a-zA-Z0-9.!#$%&*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$',
  );

  static String? email(String? value) {
    if (value == null || value.trim().isEmpty) {
      return "L'adresse e-mail est requise";
    }
    if (!_emailRegExp.hasMatch(value.trim())) {
      return 'Adresse e-mail invalide';
    }
    return null;
  }

  // ── Required ───────────────────────────────────────────────────────────

  static String? required(String? value) {
    if (value == null || value.trim().isEmpty) {
      return 'Ce champ est requis';
    }
    return null;
  }

  // ── Min length ─────────────────────────────────────────────────────────

  /// Returns a validator function that enforces a minimum character length.
  ///
  /// ```dart
  /// TextFormField(validator: Validators.minLength(3));
  /// ```
  static String? Function(String?) minLength(int min) {
    return (String? value) {
      if (value == null || value.trim().length < min) {
        return '$min caractères minimum';
      }
      return null;
    };
  }

  // ── Max length ─────────────────────────────────────────────────────────

  /// Returns a validator function that enforces a maximum character length.
  static String? Function(String?) maxLength(int max) {
    return (String? value) {
      if (value != null && value.trim().length > max) {
        return '$max caractères maximum';
      }
      return null;
    };
  }

  // ── OTP (6 digits) ────────────────────────────────────────────────────

  static final _otpRegExp = RegExp(r'^\d{6}$');

  static String? otp(String? value) {
    if (value == null || value.trim().isEmpty) {
      return 'Le code est requis';
    }
    if (!_otpRegExp.hasMatch(value.trim())) {
      return 'Le code doit contenir 6 chiffres';
    }
    return null;
  }

  // ── Compose multiple validators ───────────────────────────────────────

  /// Chains multiple validators: returns the first non-null error.
  ///
  /// ```dart
  /// TextFormField(
  ///   validator: Validators.compose([
  ///     Validators.required,
  ///     Validators.minLength(3),
  ///   ]),
  /// );
  /// ```
  static String? Function(String?) compose(
    List<String? Function(String?)> validators,
  ) {
    return (String? value) {
      for (final validator in validators) {
        final error = validator(value);
        if (error != null) return error;
      }
      return null;
    };
  }
}
