/// Formulaire viewer screen.
///
/// Opens a single formulaire:
///   - If `url` is present (Typebot) \u2192 launches in external browser
///   - If `contenu_html` is present (express) \u2192 renders in WebView
///   - Marks as completed after viewing
library;

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:webview_flutter/webview_flutter.dart';

import 'package:my_muqabala/core/constants/app_colors.dart';
import 'package:my_muqabala/core/constants/app_typography.dart';
import 'package:my_muqabala/core/widgets/empty_state.dart';
import 'package:my_muqabala/features/high_ticket/presentation/providers/high_ticket_provider.dart';

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

  @override
  void initState() {
    super.initState();
    _checkAndLaunch();
  }

  Future<void> _checkAndLaunch() async {
    final items = await ref.read(formulairesProvider.future);
    final item = items.where((i) => i.id == widget.formId).firstOrNull;

    if (item == null) {
      if (mounted) setState(() => _isLoading = false);
      return;
    }

    // Mark as completed
    ref.read(markCompletedProvider(widget.formId));

    // If URL \u2192 external browser
    if (item.url != null && item.url!.isNotEmpty) {
      final uri = Uri.tryParse(item.url!);
      if (uri != null) {
        await launchUrl(uri, mode: LaunchMode.externalApplication);
        if (mounted) {
          Navigator.of(context).pop();
        }
        return;
      }
    }

    // If HTML content \u2192 WebView
    if (item.contenuHtml != null && item.contenuHtml!.isNotEmpty) {
      final controller = WebViewController()
        ..setJavaScriptMode(JavaScriptMode.unrestricted)
        ..loadHtmlString(
          _wrapHtml(item.contenuHtml!, item.titre ?? 'Formulaire'),
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
<body>$html</body>
</html>''';
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      backgroundColor: isDark ? AppColors.darkBg : AppColors.paper,
      appBar: AppBar(
        title: Text(
          'Formulaire',
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
