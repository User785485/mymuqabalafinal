/// Formulaire viewer screen.
///
/// Supports 3 modes (all rendered in-app, never in external browser):
///   - Chat engine: URL contains `questionnaire.html` → WebView (mobile) / iframe (web)
///   - Typebot: URL starts with `https://` (not questionnaire.html) → WebView (mobile) / iframe (web)
///   - HTML static: `contenu_html` present, no URL → WebView (mobile) / iframe data URI (web)
///
/// Chat-engine forms use a JS bridge to signal completion back to Flutter.
library;

import 'dart:convert';

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:webview_flutter/webview_flutter.dart';

import 'package:my_muqabala/core/constants/app_colors.dart';
import 'package:my_muqabala/core/constants/app_typography.dart';
import 'package:my_muqabala/core/utils/logger.dart';
import 'package:my_muqabala/core/widgets/empty_state.dart';
import 'package:my_muqabala/features/high_ticket/data/models/formulaire_model.dart';
import 'package:my_muqabala/features/high_ticket/presentation/providers/high_ticket_provider.dart';
import 'package:my_muqabala/features/high_ticket/presentation/widgets/web_form_view.dart';
import 'package:my_muqabala/features/profile/presentation/providers/profile_provider.dart';

class FormulaireViewerScreen extends ConsumerStatefulWidget {
  const FormulaireViewerScreen({required this.formId, super.key});

  final String formId;

  @override
  ConsumerState<FormulaireViewerScreen> createState() =>
      _FormulaireViewerScreenState();
}

class _FormulaireViewerScreenState
    extends ConsumerState<FormulaireViewerScreen> {
  WebViewController? _webViewController;
  bool _isLoading = true;
  String _title = 'Formulaire';

  /// On Flutter web, we use an iframe instead of WebView.
  String? _iframeUrl;

  @override
  void initState() {
    super.initState();
    if (kIsWeb) {
      setupIframeMessageListener(_onIframeMessage);
    }
    _checkAndLaunch();
  }

  @override
  void dispose() {
    if (kIsWeb) {
      disposeIframeMessageListener();
    }
    super.dispose();
  }

  /// Handle postMessage events from the iframe (web only).
  void _onIframeMessage(String raw) {
    // Reuse the same bridge message handler
    _onBridgeMessage(raw);
  }

  /// Detect if this form uses the chat engine.
  bool _isChatEngine(String? url) {
    return url != null && url.contains('questionnaire.html');
  }

  Future<void> _checkAndLaunch() async {
    final items = await ref.read(formulairesProvider.future);
    final raw = items.where((i) => i.id == widget.formId).firstOrNull;

    if (raw == null) {
      if (mounted) setState(() => _isLoading = false);
      return;
    }

    final item = FormulaireModel.fromContent(raw);
    if (mounted) setState(() => _title = item.displayTitle);

    AppLogger.info(
      'Form ${widget.formId}: url=${item.url}, '
      'isChatEngine=${_isChatEngine(item.url)}, kIsWeb=$kIsWeb',
      tag: 'FormulaireViewer',
    );

    // ── Mode 1: Chat Engine (WebView with JS bridge) ──
    if (_isChatEngine(item.url)) {
      // Do NOT mark as completed yet — wait for formCompleted JS bridge signal
      await _launchChatEngine(item);
      return;
    }

    // ── Mode 2: Typebot / external URL (in-app) ──
    if (item.url != null && item.url!.isNotEmpty) {
      final uri = Uri.tryParse(item.url!);
      if (uri != null) {
        // Flutter web → iframe
        if (kIsWeb) {
          if (mounted) {
            setState(() {
              _iframeUrl = item.url!;
              _isLoading = false;
            });
          }
          return;
        }

        // Mobile → WebView in-app
        final controller = WebViewController(
          onPermissionRequest: (request) => request.grant(),
        )
          ..setJavaScriptMode(JavaScriptMode.unrestricted)
          ..setNavigationDelegate(NavigationDelegate(
            onNavigationRequest: (request) {
              // Allow Typebot navigation; open other links externally
              if (!request.url.contains('typebot.co') &&
                  !request.url.startsWith(item.url!.split('/').take(3).join('/'))) {
                launchUrl(
                  Uri.parse(request.url),
                  mode: LaunchMode.externalApplication,
                );
                return NavigationDecision.prevent;
              }
              return NavigationDecision.navigate;
            },
          ))
          ..loadRequest(uri);

        if (mounted) {
          setState(() {
            _webViewController = controller;
            _isLoading = false;
          });
        }
        return;
      }
    }

    // ── Mode 3: HTML static (in-app WebView / iframe) ──
    if (item.contenuHtml != null && item.contenuHtml!.isNotEmpty) {
      // Flutter web → iframe with data URI
      if (kIsWeb) {
        final dataUri =
            'data:text/html;charset=utf-8,${Uri.encodeComponent(_wrapHtml(item.contenuHtml!, item.displayTitle))}';
        if (mounted) {
          setState(() {
            _iframeUrl = dataUri;
            _isLoading = false;
          });
        }
        return;
      }

      final controller = WebViewController()
        ..setJavaScriptMode(JavaScriptMode.unrestricted)
        ..addJavaScriptChannel(
          'FormChannel',
          onMessageReceived: (message) {
            if (message.message == 'completed') {
              ref.read(markCompletedProvider(widget.formId));
              ref.invalidate(formulairesProvider);
              if (mounted) {
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(
                    content: Text('Formulaire soumis avec succ\u00e8s\u00a0!'),
                    behavior: SnackBarBehavior.floating,
                  ),
                );
              }
            }
          },
        )
        ..loadHtmlString(
          _wrapHtml(item.contenuHtml!, item.displayTitle),
        );

      if (mounted) {
        setState(() {
          _webViewController = controller;
          _isLoading = false;
        });
      }
      return;
    }

    if (mounted) setState(() => _isLoading = false);
  }

  /// Launch the chat-engine WebView with auth params and JS bridge.
  Future<void> _launchChatEngine(FormulaireModel item) async {
    // Request microphone permission on iOS before loading WebView
    if (!kIsWeb && defaultTargetPlatform == TargetPlatform.iOS) {
      await Permission.microphone.request();
    }

    // Fetch web credentials (telephone + access_code)
    final userId = ref.read(currentUserIdProvider);
    if (userId == null) {
      if (mounted) setState(() => _isLoading = false);
      return;
    }

    final repo = ref.read(highTicketRepositoryProvider);
    final creds = await repo.getClientWebCredentials(userId);
    if (creds == null) {
      AppLogger.warning(
        'No web credentials found for user $userId',
        tag: 'FormulaireViewer',
      );
      if (mounted) setState(() => _isLoading = false);
      return;
    }

    // Extract the form param from the URL
    final parsedUri = Uri.tryParse(item.url!);
    final formParam =
        parsedUri?.queryParameters['form'] ?? 'f1-express';

    // Build full URL
    const baseUrl = 'https://my-muqabala.fr';
    final chatUrl = '$baseUrl/questionnaire.html'
        '?form=${Uri.encodeComponent(formParam)}'
        '&tel=${Uri.encodeComponent(creds.telephone)}'
        '&code=${Uri.encodeComponent(creds.accessCode)}';

    // On Flutter web, WebView is NOT supported — use iframe instead.
    if (kIsWeb) {
      if (mounted) {
        setState(() {
          _iframeUrl = chatUrl;
          _isLoading = false;
        });
      }
      return;
    }

    final controller = WebViewController(
      onPermissionRequest: (request) => request.grant(),
    )
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      ..addJavaScriptChannel(
        'FlutterBridge',
        onMessageReceived: (message) => _onBridgeMessage(message.message),
      )
      ..loadRequest(Uri.parse(chatUrl));

    if (mounted) {
      setState(() {
        _webViewController = controller;
        _isLoading = false;
      });
    }
  }

  /// Handle messages from the chat-engine JS bridge.
  void _onBridgeMessage(String raw) {
    try {
      final data = jsonDecode(raw) as Map<String, dynamic>;
      final type = data['type'] as String?;

      switch (type) {
        case 'formCompleted':
          ref.read(markCompletedProvider(widget.formId));
          ref.invalidate(formulairesProvider);
          if (mounted) {
            ScaffoldMessenger.of(context).showSnackBar(
              const SnackBar(
                content: Text('Formulaire termin\u00e9 !'),
                behavior: SnackBarBehavior.floating,
              ),
            );
          }
        case 'close':
          if (mounted) Navigator.of(context).pop();
        case 'progress':
          // Could update a local progress indicator in the future
          break;
      }
    } catch (e) {
      AppLogger.error(
        'Failed to parse FlutterBridge message',
        tag: 'FormulaireViewer',
        error: e,
      );
    }
  }

  String _wrapHtml(String html, String title) {
    return '''
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>$title</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      padding: 16px;
      margin: 0;
      color: #1a1a2e;
      line-height: 1.6;
      font-size: 15px;
    }
    @media (prefers-color-scheme: dark) {
      body { background: #1a1a2e; color: #e8e6f0; }
    }
  </style>
</head>
<body>$html
<script>
  document.addEventListener('submit', function(e) {
    if (window.FormChannel) {
      FormChannel.postMessage('completed');
    }
  }, true);
</script>
</body>
</html>''';
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      backgroundColor: isDark ? AppColors.darkBg : AppColors.paper,
      appBar: AppBar(
        title: Text(
          _title,
          style: AppTypography.h3.copyWith(
            color: isDark ? AppColors.darkInk : AppColors.ink,
          ),
        ),
        backgroundColor: isDark ? AppColors.darkBg : AppColors.paper,
        surfaceTintColor: Colors.transparent,
        elevation: 0,
      ),
      body: _isLoading
          ? const Center(
              child: CircularProgressIndicator(
                valueColor: AlwaysStoppedAnimation(AppColors.violet),
              ),
            )
          : _iframeUrl != null
              ? buildWebIframe(
                  _iframeUrl!,
                  'form-iframe-${widget.formId}',
                )
              : _webViewController != null
                  ? WebViewWidget(controller: _webViewController!)
                  : const EmptyState(
                      icon: Icons.quiz_outlined,
                      title: 'Formulaire introuvable',
                      subtitle:
                          'Ce formulaire n\u2019est pas encore disponible.',
                    ),
    );
  }
}
