/// Page de vente viewer screen.
///
/// Renders a personalized sales page for free users as a teaser.
/// Shows a CTA button to start conversation with coach.
library;

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:webview_flutter/webview_flutter.dart';

import 'package:my_muqabala/core/constants/app_colors.dart';
import 'package:my_muqabala/core/constants/app_typography.dart';
import 'package:my_muqabala/core/router/route_names.dart';
import 'package:my_muqabala/core/widgets/empty_state.dart';
import 'package:my_muqabala/features/high_ticket/data/models/section_content_model.dart';
import 'package:my_muqabala/features/high_ticket/presentation/providers/high_ticket_provider.dart';

class PageDeVenteScreen extends ConsumerStatefulWidget {
  const PageDeVenteScreen({super.key});

  @override
  ConsumerState<PageDeVenteScreen> createState() => _PageDeVenteScreenState();
}

class _PageDeVenteScreenState extends ConsumerState<PageDeVenteScreen> {
  WebViewController? _controller;
  bool _isLoading = true;
  SectionContentModel? _currentDoc;

  @override
  void initState() {
    super.initState();
    _loadDocument();
  }

  Future<void> _loadDocument() async {
    final docs = await ref.read(pageDeVenteProvider.future);
    if (docs.isEmpty) {
      if (mounted) setState(() => _isLoading = false);
      return;
    }

    _showDoc(docs.first);
  }

  void _showDoc(SectionContentModel doc) {
    _currentDoc = doc;

    final html = doc.contenuHtml ?? '<p>Contenu non disponible.</p>';
    final controller = WebViewController()
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      ..loadHtmlString(
          _wrapHtml(html, doc.titre ?? 'Ton Programme Personnalisé'));

    if (mounted) {
      setState(() {
        _controller = controller;
        _isLoading = false;
      });
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
      line-height: 1.7;
      font-size: 15px;
    }
    h1, h2, h3 { font-family: 'Georgia', serif; color: #6B46C1; }
    @media (prefers-color-scheme: dark) {
      body { background: #1a1a2e; color: #e8e6f0; }
      h1, h2, h3 { color: #a78bfa; }
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
          'Ton Programme Personnalisé',
          style: AppTypography.h3.copyWith(
            color: isDark ? AppColors.darkInk : AppColors.ink,
            fontSize: 16,
          ),
          maxLines: 1,
          overflow: TextOverflow.ellipsis,
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
          : _controller != null
              ? WebViewWidget(controller: _controller!)
              : const EmptyState(
                  icon: Icons.auto_awesome_outlined,
                  title: 'Programme non disponible',
                  subtitle:
                      'Ton programme personnalisé apparaîtra ici.',
                ),
      floatingActionButton: _controller != null
          ? FloatingActionButton.extended(
              onPressed: () => context.pushNamed(RouteNames.chat),
              backgroundColor: AppColors.violet,
              foregroundColor: Colors.white,
              icon: const Icon(Icons.chat_rounded),
              label: const Text('D\u00e9couvrir le programme'),
            )
          : null,
    );
  }
}
