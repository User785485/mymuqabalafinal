// Basic smoke test for MyMuqabala app.

import 'package:flutter_test/flutter_test.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import 'package:my_muqabala/app.dart';

void main() {
  testWidgets('MyMuqabalaApp smoke test', (WidgetTester tester) async {
    // Verify the app widget can be instantiated without errors.
    await tester.pumpWidget(
      const ProviderScope(
        child: MyMuqabalaApp(),
      ),
    );
  });
}
