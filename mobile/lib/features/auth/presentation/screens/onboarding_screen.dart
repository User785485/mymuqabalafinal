import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:go_router/go_router.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'package:my_muqabala/core/constants/app_colors.dart';

/// SharedPreferences key indicating the user has seen onboarding.
const kOnboardingSeenKey = 'onboarding_seen';

/// 4-slide onboarding introducing My Muqabala's core value propositions.
///
/// After completion (or skip), `onboarding_seen = true` is persisted
/// in SharedPreferences so this screen never shows again.
class OnboardingScreen extends StatefulWidget {
  const OnboardingScreen({
    required this.onComplete,
    super.key,
  });

  /// Called when the user finishes or skips onboarding.
  /// The parent (usually go_router) navigates to the appropriate next screen.
  final VoidCallback onComplete;

  @override
  State<OnboardingScreen> createState() => _OnboardingScreenState();
}

class _OnboardingScreenState extends State<OnboardingScreen> {
  final _pageController = PageController();
  int _currentPage = 0;

  static const _slides = <_SlideData>[
    _SlideData(
      icon: Icons.favorite_outline_rounded,
      title: 'Bienvenue',
      body:
          'My Muqabala t\'accompagne vers un mariage épanouissant, dans le respect de tes valeurs.',
      gradientColors: [Color(0xFF7C3AED), Color(0xFF6B5A9C)],
    ),
    _SlideData(
      icon: Icons.route_rounded,
      title: 'Un parcours structuré',
      body:
          '4 phases pour construire ta relation sur des bases solides, étape par étape.',
      gradientColors: [Color(0xFF6B5A9C), Color(0xFF7D9A8C)],
    ),
    _SlideData(
      icon: Icons.people_outline_rounded,
      title: 'Ton coach dédié',
      body:
          'Un accompagnant certifié t\'encadre à chaque étape pour te guider avec bienveillance.',
      gradientColors: [Color(0xFF7D9A8C), Color(0xFFE8B4B8)],
    ),
    _SlideData(
      icon: Icons.shield_outlined,
      title: 'Le Mahram numérique',
      body:
          'Toutes tes conversations sont supervisées pour ta sécurité et ton honneur.',
      gradientColors: [Color(0xFFE8B4B8), Color(0xFFC9A962)],
    ),
  ];

  @override
  void dispose() {
    _pageController.dispose();
    super.dispose();
  }

  Future<void> _completeOnboarding() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setBool(kOnboardingSeenKey, true);
    widget.onComplete();
    if (mounted) {
      context.go('/login');
    }
  }

  void _nextPage() {
    if (_currentPage < _slides.length - 1) {
      _pageController.nextPage(
        duration: const Duration(milliseconds: 400),
        curve: Curves.easeInOutCubic,
      );
    } else {
      _completeOnboarding();
    }
  }

  // ── Build ──────────────────────────────────────────────────────────────

  @override
  Widget build(BuildContext context) {
    return AnnotatedRegion<SystemUiOverlayStyle>(
      value: SystemUiOverlayStyle.light,
      child: Scaffold(
        backgroundColor: AppColors.darkBg,
        body: SafeArea(
          child: Column(
            children: [
              // ── Skip button ────────────────────────────────────────────
              Align(
                alignment: Alignment.centerRight,
                child: Padding(
                  padding: const EdgeInsets.only(right: 16, top: 12),
                  child: TextButton(
                    onPressed: _completeOnboarding,
                    style: TextButton.styleFrom(
                      foregroundColor: Colors.white.withValues(alpha: 0.5),
                      textStyle: const TextStyle(
                        fontFamily: 'Outfit',
                        fontSize: 14,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                    child: const Text('Passer'),
                  ),
                ),
              ),

              // ── PageView ──────────────────────────────────────────────
              Expanded(
                child: PageView.builder(
                  controller: _pageController,
                  itemCount: _slides.length,
                  onPageChanged: (index) {
                    setState(() => _currentPage = index);
                  },
                  itemBuilder: (context, index) {
                    return _OnboardingSlide(data: _slides[index]);
                  },
                ),
              ),

              // ── Dot indicators ────────────────────────────────────────
              Padding(
                padding: const EdgeInsets.only(bottom: 24),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: List.generate(_slides.length, (index) {
                    final isActive = index == _currentPage;
                    return AnimatedContainer(
                      duration: const Duration(milliseconds: 300),
                      curve: Curves.easeInOut,
                      margin: const EdgeInsets.symmetric(horizontal: 4),
                      width: isActive ? 28 : 8,
                      height: 8,
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(100),
                        color: isActive
                            ? AppColors.purple
                            : Colors.white.withValues(alpha: 0.15),
                      ),
                    );
                  }),
                ),
              ),

              // ── Action button ─────────────────────────────────────────
              Padding(
                padding: const EdgeInsets.fromLTRB(24, 0, 24, 32),
                child: SizedBox(
                  width: double.infinity,
                  height: 54,
                  child: DecoratedBox(
                    decoration: BoxDecoration(
                      gradient: LinearGradient(
                        begin: Alignment.topLeft,
                        end: Alignment.bottomRight,
                        colors: [
                          _slides[_currentPage].gradientColors[0],
                          _slides[_currentPage].gradientColors[1],
                        ],
                      ),
                      borderRadius: BorderRadius.circular(100),
                      boxShadow: [
                        BoxShadow(
                          color: _slides[_currentPage]
                              .gradientColors[0]
                              .withValues(alpha: 0.35),
                          blurRadius: 20,
                          offset: const Offset(0, 6),
                        ),
                      ],
                    ),
                    child: Material(
                      color: Colors.transparent,
                      child: InkWell(
                        onTap: _nextPage,
                        borderRadius: BorderRadius.circular(100),
                        splashColor: Colors.white.withValues(alpha: 0.1),
                        child: Center(
                          child: AnimatedSwitcher(
                            duration: const Duration(milliseconds: 200),
                            child: Text(
                              _currentPage == _slides.length - 1
                                  ? 'Commencer'
                                  : 'Suivant',
                              key: ValueKey(
                                _currentPage == _slides.length - 1
                                    ? 'start'
                                    : 'next',
                              ),
                              style: const TextStyle(
                                fontFamily: 'Outfit',
                                fontSize: 16,
                                fontWeight: FontWeight.w600,
                                color: Colors.white,
                                letterSpacing: 0.3,
                              ),
                            ),
                          ),
                        ),
                      ),
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

// ═════════════════════════════════════════════════════════════════════════════
// DATA & PRIVATE WIDGETS
// ═════════════════════════════════════════════════════════════════════════════

class _SlideData {
  const _SlideData({
    required this.icon,
    required this.title,
    required this.body,
    required this.gradientColors,
  });

  final IconData icon;
  final String title;
  final String body;
  final List<Color> gradientColors;
}

class _OnboardingSlide extends StatelessWidget {
  const _OnboardingSlide({required this.data});
  final _SlideData data;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 32),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          // ── Icon circle ────────────────────────────────────────────────
          Container(
            width: 140,
            height: 140,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              gradient: LinearGradient(
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
                colors: [
                  data.gradientColors[0].withValues(alpha: 0.25),
                  data.gradientColors[1].withValues(alpha: 0.15),
                ],
              ),
              border: Border.all(
                color: data.gradientColors[0].withValues(alpha: 0.15),
                width: 1.5,
              ),
            ),
            child: Icon(
              data.icon,
              size: 56,
              color: Colors.white.withValues(alpha: 0.85),
            ),
          ),

          const SizedBox(height: 40),

          // ── Title ──────────────────────────────────────────────────────
          Text(
            data.title,
            textAlign: TextAlign.center,
            style: const TextStyle(
              fontFamily: 'Cormorant',
              fontSize: 30,
              fontWeight: FontWeight.w500,
              color: Colors.white,
              height: 1.2,
            ),
          ),

          const SizedBox(height: 16),

          // ── Body ───────────────────────────────────────────────────────
          Text(
            data.body,
            textAlign: TextAlign.center,
            style: TextStyle(
              fontFamily: 'Outfit',
              fontSize: 15,
              fontWeight: FontWeight.w400,
              color: Colors.white.withValues(alpha: 0.55),
              height: 1.7,
            ),
          ),
        ],
      ),
    );
  }
}
