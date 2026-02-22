/// Conditional export: uses iframe on web, no-op stub on mobile.
///
/// Usage: `import 'web_form_view.dart';`
/// Then call [buildWebIframe], [setupIframeMessageListener],
/// [disposeIframeMessageListener].
library;

export 'web_form_view_stub.dart'
    if (dart.library.html) 'web_form_view_web.dart';
