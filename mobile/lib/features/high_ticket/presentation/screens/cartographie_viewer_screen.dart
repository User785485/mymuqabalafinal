/// Cartographie viewer screen.
///
/// Renders a single cartographie document in a WebView with
/// prev/next navigation and marks it as read on first display.
library;

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:webview_flutter/webview_flutter.dart';

import 'package:my_muqabala/core/constants/app_colors.dart';
import 'package:my_muqabala/core/constants/app_typography.dart';
import 'package:my_muqabala/core/widgets/empty_state.dart';
import 'package:my_muqabala/features/high_ticket/data/models/section_content_model.dart';
import 'package:my_muqabala/features/high_ticket/presentation/providers/high_ticket_provider.dart';

class CartographieViewerScreen extends ConsumerStatefulWidget {
  const CartographieViewerScreen({required this.docId, super.key});

  final String docId;

  @override
  ConsumerState<CartographieViewerScreen> createState() =>
      _CartographieViewerScreenState();
}

class _CartographieViewerScreenState
    extends ConsumerState<CartographieViewerScreen> {
  WebViewController? _controller;
  bool _isLoading = true;
  SectionContentModel? _currentDoc;
  List<SectionContentModel> _allDocs = [];
  int _currentIndex = -1;

  @override
  void initState() {
    super.initState();
    _loadDocument();
  }

  Future<void> _loadDocument() async {
    final docs = await ref.read(cartographieDocsProvider.future);
    _allDocs = docs;
    _currentIndex = docs.indexWhere((d) => d.id == widget.docId);

    if (_currentIndex == -1) {
      if (mounted) setState(() => _isLoading = false);
      return;
    }

    _showDoc(docs[_currentIndex]);
  }

  void _showDoc(SectionContentModel doc) {
    _currentDoc = doc;

    // Mark as read
    if (!doc.isCompleted) {
      ref.read(markCompletedProvider(doc.id));
    }

    final html = doc.contenuHtml ?? '<p>Contenu non disponible.</p>';
    final controller = WebViewController()
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      ..loadHtmlString(_wrapHtml(html, doc.titre ?? doc.contentKey));

    if (mounted) {
      setState(() {
        _controller = controller;
        _isLoading = false;
      });
    }
  }

  void _navigateTo(int index) {
    if (index < 0 || index >= _allDocs.length) return;
    setState(() {
      _currentIndex = index;
      _isLoading = true;
    });
    _showDoc(_allDocs[index]);
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
    final title = _currentDoc?.titre ?? 'Document';
    final hasPrev = _currentIndex > 0;
    final hasNext = _currentIndex < _allDocs.length - 1;

    return Scaffold(
      backgroundColor: isDark ? AppColors.darkBg : AppColors.paper,
      appBar: AppBar(
        title: Text(
          title,
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
                  icon: Icons.map_outlined,
                  title: 'Document introuvable',
                  subtitle: 'Ce document n\u2019est pas encore disponible.',
                ),
      bottomNavigationBar: _allDocs.length > 1
          ? SafeArea(
              child: Padding(
                padding: const EdgeInsets.symmetric(
                  horizontal: 16,
                  vertical: 8,
                ),
                child: Row(
                  children: [
                    TextButton.icon(
                      onPressed: hasPrev
                          ? () => _navigateTo(_currentIndex - 1)
                          : null,
                      icon: const Icon(Icons.arrow_back_rounded, size: 18),
                      label: const Text('Pr\u00e9c\u00e9dent'),
                      style: TextButton.styleFrom(
                        foregroundColor: AppColors.violet,
                      ),
                    ),
                    const Spacer(),
                    Text(
                      '${_currentIndex + 1}/${_allDocs.length}',
                      style: AppTypography.bodySmall.copyWith(
                        color: isDark
                            ? AppColors.darkInkMuted
                            : AppColors.inkMuted,
                      ),
                    ),
                    const Spacer(),
                    TextButton.icon(
                      onPressed: hasNext
                          ? () => _navigateTo(_currentIndex + 1)
                          : null,
                      icon: const Icon(Icons.arrow_forward_rounded, size: 18),
                      label: const Text('Suivant'),
                      style: TextButton.styleFrom(
                        foregroundColor: AppColors.violet,
                      ),
                    ),
                  ],
                ),
              ),
            )
          : null,
    );
  }
}
