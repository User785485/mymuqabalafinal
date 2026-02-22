/// Mobile stub — these functions are never called on native platforms.
library;

import 'package:flutter/widgets.dart';

Widget buildWebIframe(String url, String viewType) =>
    const SizedBox.shrink();

void setupIframeMessageListener(void Function(String) onMessage) {}

void disposeIframeMessageListener() {}
