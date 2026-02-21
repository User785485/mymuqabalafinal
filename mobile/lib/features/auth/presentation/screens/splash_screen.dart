import 'package:flutter/material.dart';

/// Splash screen shown on app launch.
///
/// Displays the logo for 2 seconds before the router redirects
/// to onboarding, login, or home depending on auth state.
class SplashScreen extends StatelessWidget {
  const SplashScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      body: Center(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(
              Icons.favorite_rounded,
              size: 72,
              color: Color(0xFF7C3AED),
            ),
            SizedBox(height: 24),
            Text(
              'My Muqabala',
              style: TextStyle(
                fontFamily: 'Cormorant',
                fontSize: 32,
                fontWeight: FontWeight.w600,
                color: Color(0xFF1A1A2E),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
