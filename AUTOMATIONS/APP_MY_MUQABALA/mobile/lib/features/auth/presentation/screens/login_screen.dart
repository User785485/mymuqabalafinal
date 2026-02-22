import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:phone_form_field/phone_form_field.dart';

import 'package:my_muqabala/core/constants/app_colors.dart';

import '../../domain/entities/auth_state.dart';
import '../providers/auth_provider.dart';

/// Full-screen login page with international phone number input.
///
/// Dark background (#0F0F1A) with layered radial gradients, a frosted
/// glass card, and a phone input with country picker (flags + dial codes).
class LoginScreen extends ConsumerStatefulWidget {
  const LoginScreen({super.key});

  @override
  ConsumerState<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends ConsumerState<LoginScreen> {
  final _phoneController = PhoneController(
    initialValue: const PhoneNumber(isoCode: IsoCode.FR, nsn: ''),
  );
  final _passwordController = TextEditingController();
  String? _errorMessage;
  bool _isLoading = false;
  bool _obscurePassword = true;

  @override
  void dispose() {
    _phoneController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  Future<void> _submit() async {
    setState(() => _errorMessage = null);

    final phoneNumber = _phoneController.value;
    if (phoneNumber.nsn.isEmpty) {
      setState(() => _errorMessage = 'Veuillez entrer votre numéro.');
      return;
    }

    if (!phoneNumber.isValid()) {
      setState(() => _errorMessage = 'Numéro de téléphone invalide.');
      return;
    }

    if (_passwordController.text.isEmpty) {
      setState(() => _errorMessage = 'Veuillez entrer votre mot de passe.');
      return;
    }

    // Format to E.164: +33612345678
    final e164 = phoneNumber.international;

    setState(() => _isLoading = true);

    try {
      await ref.read(signInNotifierProvider.notifier).signIn(e164, _passwordController.text);
    } catch (_) {
      // Error is handled through the provider state.
    }

    if (!mounted) return;
    setState(() => _isLoading = false);

    // Check for authentication errors.
    final authState = ref.read(signInNotifierProvider);
    authState.whenOrNull(
      data: (data) {
        if (data is AppAuthError) {
          setState(() => _errorMessage = data.message);
        }
      },
      error: (error, _) {
        setState(() => _errorMessage = 'Erreur de connexion. Réessayez.');
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    final mediaQuery = MediaQuery.of(context);
    final bottomInset = mediaQuery.viewInsets.bottom;

    return AnnotatedRegion<SystemUiOverlayStyle>(
      value: SystemUiOverlayStyle.light,
      child: Scaffold(
        backgroundColor: AppColors.darkBg,
        resizeToAvoidBottomInset: false,
        body: Stack(
          fit: StackFit.expand,
          children: [
            const _GradientBackground(),
            SafeArea(
              child: AnimatedPadding(
                duration: const Duration(milliseconds: 200),
                padding: EdgeInsets.only(bottom: bottomInset),
                child: Center(
                  child: SingleChildScrollView(
                    padding: const EdgeInsets.symmetric(horizontal: 24),
                    child: ConstrainedBox(
                      constraints: const BoxConstraints(maxWidth: 420),
                      child: _buildCard(context),
                    ),
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildCard(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: Colors.white.withValues(alpha: 0.04),
        borderRadius: BorderRadius.circular(24),
        border: Border.all(
          color: Colors.white.withValues(alpha: 0.08),
        ),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.4),
            blurRadius: 80,
            offset: const Offset(0, 24),
          ),
        ],
      ),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(24),
        child: _GlassmorphicContainer(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 32, vertical: 40),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                // ── Logo ────────────────────────────────────────────────
                const Text(
                  'My Muqabala',
                  style: TextStyle(
                    fontFamily: 'Cormorant',
                    fontSize: 32,
                    fontWeight: FontWeight.w500,
                    color: Colors.white,
                    height: 1.2,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  'ESPACE PERSONNEL',
                  style: TextStyle(
                    fontFamily: 'Outfit',
                    fontSize: 12,
                    fontWeight: FontWeight.w500,
                    color: Colors.white.withValues(alpha: 0.4),
                    letterSpacing: 2.4,
                  ),
                ),

                const SizedBox(height: 40),

                // ── Phone field label ─────────────────────────────────
                Align(
                  alignment: Alignment.centerLeft,
                  child: Text(
                    'Votre numéro de téléphone',
                    style: TextStyle(
                      fontFamily: 'Outfit',
                      fontSize: 12,
                      fontWeight: FontWeight.w500,
                      color: Colors.white.withValues(alpha: 0.5),
                      letterSpacing: 0.3,
                    ),
                  ),
                ),
                const SizedBox(height: 8),

                // ── International phone input ─────────────────────────
                PhoneFormField(
                  controller: _phoneController,
                  isCountrySelectionEnabled: true,
                  countrySelectorNavigator:
                      const CountrySelectorNavigator.dialog(
                    favorites: [
                      IsoCode.FR,
                      IsoCode.MA,
                      IsoCode.DZ,
                      IsoCode.TN,
                      IsoCode.BE,
                      IsoCode.CH,
                      IsoCode.GB,
                      IsoCode.DE,
                      IsoCode.TR,
                      IsoCode.SN,
                    ],
                  ),
                  decoration: InputDecoration(
                    hintText: '6 12 34 56 78',
                    hintStyle: TextStyle(
                      fontFamily: 'Outfit',
                      fontSize: 16,
                      color: Colors.white.withValues(alpha: 0.2),
                      letterSpacing: 0.5,
                    ),
                    filled: true,
                    fillColor: Colors.white.withValues(alpha: 0.06),
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(12),
                      borderSide: BorderSide(
                        color: _errorMessage != null
                            ? AppColors.error
                            : Colors.white.withValues(alpha: 0.1),
                      ),
                    ),
                    enabledBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(12),
                      borderSide: BorderSide(
                        color: _errorMessage != null
                            ? AppColors.error
                            : Colors.white.withValues(alpha: 0.1),
                      ),
                    ),
                    focusedBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(12),
                      borderSide: const BorderSide(
                        color: AppColors.purple,
                        width: 1.5,
                      ),
                    ),
                    contentPadding: const EdgeInsets.symmetric(
                      horizontal: 16,
                      vertical: 14,
                    ),
                  ),
                  style: const TextStyle(
                    fontFamily: 'Outfit',
                    fontSize: 16,
                    color: Colors.white,
                    letterSpacing: 0.5,
                  ),
                  countryButtonStyle: const CountryButtonStyle(
                    textStyle: TextStyle(
                      fontFamily: 'Outfit',
                      fontSize: 16,
                      fontWeight: FontWeight.w500,
                      color: Colors.white70,
                    ),
                    flagSize: 22,
                    showDialCode: true,
                    showIsoCode: false,
                    showFlag: true,
                  ),
                  cursorColor: AppColors.purple,
                  onSubmitted: (_) => _submit(),
                ),

                const SizedBox(height: 20),

                // ── Password field label ────────────────────────────
                Align(
                  alignment: Alignment.centerLeft,
                  child: Text(
                    'Mot de passe',
                    style: TextStyle(
                      fontFamily: 'Outfit',
                      fontSize: 12,
                      fontWeight: FontWeight.w500,
                      color: Colors.white.withValues(alpha: 0.5),
                      letterSpacing: 0.3,
                    ),
                  ),
                ),
                const SizedBox(height: 8),

                // ── Password input ──────────────────────────────────
                TextField(
                  controller: _passwordController,
                  obscureText: _obscurePassword,
                  style: const TextStyle(
                    fontFamily: 'Outfit',
                    fontSize: 16,
                    color: Colors.white,
                    letterSpacing: 0.5,
                  ),
                  cursorColor: AppColors.purple,
                  onSubmitted: (_) => _submit(),
                  decoration: InputDecoration(
                    hintText: 'Entrez votre mot de passe',
                    hintStyle: TextStyle(
                      fontFamily: 'Outfit',
                      fontSize: 16,
                      color: Colors.white.withValues(alpha: 0.2),
                      letterSpacing: 0.5,
                    ),
                    filled: true,
                    fillColor: Colors.white.withValues(alpha: 0.06),
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(12),
                      borderSide: BorderSide(
                        color: _errorMessage != null
                            ? AppColors.error
                            : Colors.white.withValues(alpha: 0.1),
                      ),
                    ),
                    enabledBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(12),
                      borderSide: BorderSide(
                        color: _errorMessage != null
                            ? AppColors.error
                            : Colors.white.withValues(alpha: 0.1),
                      ),
                    ),
                    focusedBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(12),
                      borderSide: const BorderSide(
                        color: AppColors.purple,
                        width: 1.5,
                      ),
                    ),
                    contentPadding: const EdgeInsets.symmetric(
                      horizontal: 16,
                      vertical: 14,
                    ),
                    suffixIcon: IconButton(
                      onPressed: () {
                        setState(() => _obscurePassword = !_obscurePassword);
                      },
                      icon: Icon(
                        _obscurePassword
                            ? Icons.visibility_outlined
                            : Icons.visibility_off_outlined,
                        color: Colors.white.withValues(alpha: 0.4),
                      ),
                    ),
                  ),
                ),

                const SizedBox(height: 20),

                // ── Submit button ───────────────────────────────────
                _LoginButton(
                  isLoading: _isLoading,
                  onPressed: _submit,
                ),

                // ── Error message ───────────────────────────────────
                _ErrorText(message: _errorMessage),

                const SizedBox(height: 32),

                // ── Footer ──────────────────────────────────────────
                Text(
                  'My Muqabala',
                  style: TextStyle(
                    fontFamily: 'Cormorant',
                    fontSize: 14,
                    fontWeight: FontWeight.w500,
                    color: Colors.white.withValues(alpha: 0.4),
                  ),
                ),
                const SizedBox(height: 2),
                Text(
                  'Accompagnement thérapeutique musulman',
                  style: TextStyle(
                    fontFamily: 'Outfit',
                    fontSize: 11,
                    color: Colors.white.withValues(alpha: 0.25),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

// ═════════════════════════════════════════════════════════════════════════════
// PRIVATE WIDGETS
// ═════════════════════════════════════════════════════════════════════════════

/// Three layered radial gradients matching the web login page.
class _GradientBackground extends StatelessWidget {
  const _GradientBackground();

  @override
  Widget build(BuildContext context) {
    return Stack(
      fit: StackFit.expand,
      children: [
        Positioned.fill(
          child: DecoratedBox(
            decoration: BoxDecoration(
              gradient: RadialGradient(
                center: const Alignment(-0.4, -0.6),
                radius: 1.0,
                colors: [
                  const Color(0xFF7C3AED).withValues(alpha: 0.15),
                  Colors.transparent,
                ],
                stops: const [0.0, 0.5],
              ),
            ),
          ),
        ),
        Positioned.fill(
          child: DecoratedBox(
            decoration: BoxDecoration(
              gradient: RadialGradient(
                center: const Alignment(0.4, 0.6),
                radius: 1.0,
                colors: [
                  const Color(0xFFE8B4B8).withValues(alpha: 0.10),
                  Colors.transparent,
                ],
                stops: const [0.0, 0.5],
              ),
            ),
          ),
        ),
        Positioned.fill(
          child: DecoratedBox(
            decoration: BoxDecoration(
              gradient: RadialGradient(
                center: Alignment.center,
                radius: 0.8,
                colors: [
                  const Color(0xFFC9A962).withValues(alpha: 0.08),
                  Colors.transparent,
                ],
                stops: const [0.0, 0.4],
              ),
            ),
          ),
        ),
      ],
    );
  }
}

/// Blurred glass effect layer around the card content.
class _GlassmorphicContainer extends StatelessWidget {
  const _GlassmorphicContainer({required this.child});
  final Widget child;

  @override
  Widget build(BuildContext context) {
    return BackdropFilter(
      filter: ImageFilter.blur(sigmaX: 24, sigmaY: 24),
      child: child,
    );
  }
}

/// Violet gradient submit button with loading spinner.
class _LoginButton extends StatelessWidget {
  const _LoginButton({
    required this.isLoading,
    required this.onPressed,
  });

  final bool isLoading;
  final VoidCallback onPressed;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: double.infinity,
      height: 52,
      child: DecoratedBox(
        decoration: BoxDecoration(
          gradient: const LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [
              Color(0xFF7C3AED),
              Color(0xFF6B5A9C),
            ],
          ),
          borderRadius: BorderRadius.circular(12),
          boxShadow: isLoading
              ? null
              : [
                  BoxShadow(
                    color: const Color(0xFF7C3AED).withValues(alpha: 0.3),
                    blurRadius: 16,
                    offset: const Offset(0, 4),
                  ),
                ],
        ),
        child: Material(
          color: Colors.transparent,
          child: InkWell(
            onTap: isLoading ? null : onPressed,
            borderRadius: BorderRadius.circular(12),
            splashColor: Colors.white.withValues(alpha: 0.1),
            child: Center(
              child: isLoading
                  ? const SizedBox(
                      width: 22,
                      height: 22,
                      child: CircularProgressIndicator(
                        strokeWidth: 2.5,
                        valueColor: AlwaysStoppedAnimation(Colors.white),
                      ),
                    )
                  : const Text(
                      'Se connecter',
                      style: TextStyle(
                        fontFamily: 'Outfit',
                        fontSize: 15,
                        fontWeight: FontWeight.w600,
                        color: Colors.white,
                        letterSpacing: 0.3,
                      ),
                    ),
            ),
          ),
        ),
      ),
    );
  }
}

/// Animated error text area below the button.
class _ErrorText extends StatelessWidget {
  const _ErrorText({this.message});
  final String? message;

  @override
  Widget build(BuildContext context) {
    return AnimatedSize(
      duration: const Duration(milliseconds: 200),
      alignment: Alignment.topCenter,
      child: message != null
          ? Padding(
              padding: const EdgeInsets.only(top: 16),
              child: Text(
                message!,
                textAlign: TextAlign.center,
                style: const TextStyle(
                  fontFamily: 'Outfit',
                  fontSize: 13,
                  color: AppColors.error,
                  height: 1.4,
                ),
              ),
            )
          : const SizedBox.shrink(),
    );
  }
}
