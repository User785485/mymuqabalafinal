/// Web implementation — renders an iframe via HtmlElementView.
///
/// Also provides a postMessage listener so the iframe can communicate
/// back to Flutter (e.g. form completion, close).
library;

// ignore: avoid_web_libraries_in_flutter
import 'dart:html' as html;
import 'dart:ui_web' as ui_web;

import 'package:flutter/widgets.dart';

final _registeredTypes = <String>{};

/// Build an iframe widget that loads [url] and fills its container.
Widget buildWebIframe(String url, String viewType) {
  if (!_registeredTypes.contains(viewType)) {
    ui_web.platformViewRegistry.registerViewFactory(
      viewType,
      (int viewId) {
        return html.IFrameElement()
          ..src = url
          ..style.border = 'none'
          ..style.width = '100%'
          ..style.height = '100%'
          ..allow = 'microphone; camera; autoplay'
          ..setAttribute('allowfullscreen', 'true');
      },
    );
    _registeredTypes.add(viewType);
  }
  return SizedBox.expand(
    child: HtmlElementView(viewType: viewType),
  );
}

html.EventListener? _messageListener;

/// Listen for postMessage events from the iframe.
///
/// The iframe sends JSON strings via `window.parent.postMessage(json, '*')`.
void setupIframeMessageListener(void Function(String) onMessage) {
  _messageListener = (html.Event event) {
    if (event is html.MessageEvent) {
      final data = event.data;
      if (data is String) onMessage(data);
    }
  };
  html.window.addEventListener('message', _messageListener!);
}

/// Remove the postMessage listener.
void disposeIframeMessageListener() {
  if (_messageListener != null) {
    html.window.removeEventListener('message', _messageListener!);
    _messageListener = null;
  }
}
