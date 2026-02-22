import 'dart:async';
import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import 'package:my_muqabala/bootstrap.dart';
import 'package:my_muqabala/app.dart';

/// Application entry point.
Future<void> main() async {
  // ignore: avoid_print
  print('[BOOT] main() start');
  WidgetsFlutterBinding.ensureInitialized();
  // ignore: avoid_print
  print('[BOOT] binding initialized');

  // Global error handlers to surface hidden errors on web.
  FlutterError.onError = (details) {
    // ignore: avoid_print
    print('[FLUTTER_ERROR] ${details.exceptionAsString()}');
    // ignore: avoid_print
    print('[FLUTTER_ERROR] ${details.stack}');
  };

  PlatformDispatcher.instance.onError = (error, stack) {
    // ignore: avoid_print
    print('[PLATFORM_ERROR] $error');
    // ignore: avoid_print
    print('[PLATFORM_ERROR] $stack');
    return true; // Prevent app crash
  };

  await bootstrap();
  // ignore: avoid_print
  print('[BOOT] bootstrap complete — calling runApp');

  runApp(
    const ProviderScope(
      child: MyMuqabalaApp(),
    ),
  );
  // ignore: avoid_print
  print('[BOOT] runApp called');
}
