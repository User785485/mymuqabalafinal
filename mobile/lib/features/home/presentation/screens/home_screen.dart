/// Barrel file for the home screen.
///
/// The router (`app_router.dart`) imports `HomeScreen` from this path.
/// The actual implementation lives in [AccueilScreen] which is the
/// canonical home / accueil screen widget.
library;

import 'package:my_muqabala/features/home/presentation/screens/accueil_screen.dart';

/// Alias used by [app_router.dart] to reference the home tab screen.
typedef HomeScreen = AccueilScreen;
