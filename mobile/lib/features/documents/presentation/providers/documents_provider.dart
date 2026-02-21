/// Riverpod providers for the Documents feature.
///
/// Exposes:
/// - [documentsRepositoryProvider] : the [DocumentsRepository] singleton
/// - [documentsListProvider] : all published documents for the current user
/// - [documentDetailProvider] : a single document by ID
/// - [unreadDocCountProvider] : total unread document count (for badges)
library;

import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

import 'package:my_muqabala/core/utils/logger.dart';
import 'package:my_muqabala/features/documents/data/models/document_model.dart';
import 'package:my_muqabala/features/documents/data/repositories/documents_repository.dart';

// ═══════════════════════════════════════════════════════════════════════════════
// Repository provider
// ═══════════════════════════════════════════════════════════════════════════════

/// Provides the [DocumentsRepository] backed by the live Supabase client.
final documentsRepositoryProvider = Provider<DocumentsRepository>((ref) {
  return DocumentsRepository(Supabase.instance.client);
});

// ═══════════════════════════════════════════════════════════════════════════════
// Documents list provider
// ═══════════════════════════════════════════════════════════════════════════════

/// All published documents for the currently authenticated user.
///
/// Returns an empty list if there is no authenticated user.
/// The provider is `autoDispose` so it releases resources when the
/// documents screen is no longer visible.
final documentsListProvider =
    FutureProvider.autoDispose<List<DocumentModel>>((ref) async {
  final userId = Supabase.instance.client.auth.currentUser?.id;

  if (userId == null) {
    AppLogger.warning(
      'No authenticated user — returning empty document list',
      tag: 'DocumentsProvider',
    );
    return [];
  }

  final repository = ref.watch(documentsRepositoryProvider);
  return repository.getUserDocuments(userId);
});

// ═══════════════════════════════════════════════════════════════════════════════
// Single document detail provider
// ═══════════════════════════════════════════════════════════════════════════════

/// Fetches a single document by its [docId].
///
/// Returns `null` if the document does not exist.
final documentDetailProvider =
    FutureProvider.autoDispose.family<DocumentModel?, String>(
  (ref, docId) async {
    final repository = ref.watch(documentsRepositoryProvider);
    return repository.getDocumentById(docId);
  },
);

// ═══════════════════════════════════════════════════════════════════════════════
// Unread count provider
// ═══════════════════════════════════════════════════════════════════════════════

/// Total number of unread published documents for the current user.
///
/// Returns `0` if there is no authenticated user or on error.
/// Useful for displaying a badge on the Documents tab.
final unreadDocCountProvider = FutureProvider.autoDispose<int>((ref) async {
  final userId = Supabase.instance.client.auth.currentUser?.id;

  if (userId == null) {
    AppLogger.debug(
      'No authenticated user — returning 0 unread docs',
      tag: 'DocumentsProvider',
    );
    return 0;
  }

  final repository = ref.watch(documentsRepositoryProvider);
  return repository.getUnreadCount(userId);
});
