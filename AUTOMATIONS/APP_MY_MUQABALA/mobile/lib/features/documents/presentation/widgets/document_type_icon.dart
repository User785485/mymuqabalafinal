/// Circular icon widget representing a document's type.
///
/// Displays the document's [DocumentModel.typeIcon] inside a colored
/// circle whose background is derived from [DocumentModel.typeColor].
///
/// ```dart
/// DocumentTypeIcon(document: myDoc, size: 44)
/// ```
library;

import 'package:flutter/material.dart';

import 'package:my_muqabala/features/documents/data/models/document_model.dart';

/// A circular icon container colored by document type.
class DocumentTypeIcon extends StatelessWidget {
  /// Creates a [DocumentTypeIcon] for the given [document].
  const DocumentTypeIcon({
    required this.document,
    this.size = 44,
    super.key,
  });

  /// The document whose type determines icon and color.
  final DocumentModel document;

  /// Diameter of the circle. The icon is sized at `size * 0.5`.
  final double size;

  @override
  Widget build(BuildContext context) {
    final color = document.typeColor;
    final iconData = document.typeIcon;
    final iconSize = size * 0.5;

    return Container(
      width: size,
      height: size,
      decoration: BoxDecoration(
        color: color.withValues(alpha: 0.12),
        shape: BoxShape.circle,
      ),
      child: Center(
        child: Icon(
          iconData,
          size: iconSize,
          color: color,
        ),
      ),
    );
  }
}
