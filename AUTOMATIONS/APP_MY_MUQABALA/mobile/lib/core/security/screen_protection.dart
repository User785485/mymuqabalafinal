import 'package:flutter/material.dart';
import 'package:screen_protector/screen_protector.dart';

class ScreenProtection {
  static Future<void> enable() async {
    // Android: FLAG_SECURE (prevents screenshots + screen recording)
    await ScreenProtector.protectDataLeakageWithColor(Colors.black);
    // iOS: secure text field overlay
    await ScreenProtector.preventScreenshotOn();
  }

  static Future<void> disable() async {
    await ScreenProtector.protectDataLeakageWithColorOff();
    await ScreenProtector.preventScreenshotOff();
  }
}
