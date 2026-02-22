/// Repository for coach document CRUD operations.
///
/// Reads from and writes to the `coach_documents` Supabase table.
/// All queries scope to `published_at IS NOT NULL` so that draft
/// documents created by coaches are never shown to users.
///
/// ```dart
/// final repo = DocumentsRepository(Supabase.instance.client);
/// final docs = await repo.getUserDocuments(userId);
/// ```
library;

import 'package:supabase_flutter/supabase_flutter.dart';

import 'package:my_muqabala/core/utils/logger.dart';
import 'package:my_muqabala/features/documents/data/models/document_model.dart';

/// Repository for fetching and updating coach documents.
class DocumentsRepository {
  /// Creates a [DocumentsRepository] backed by the given [SupabaseClient].
  DocumentsRepository(this._supabase);

  final SupabaseClient _supabase;

  /// The Supabase table name for coach documents.
  static const _table = 'coach_documents';

  // ═══════════════════════════════════════════════════════════════════════════
  // Fetch all published documents for a user
  // ═══════════════════════════════════════════════════════════════════════════

  /// Returns all published documents for the given [userId], ordered by
  /// most recently published first.
  ///
  /// Only documents where `published_at IS NOT NULL` are returned.
  Future<List<DocumentModel>> getUserDocuments(String userId) async {
    try {
      AppLogger.info(
        'Fetching documents for user $userId',
        tag: 'DocumentsRepo',
      );

      final response = await _supabase
          .from(_table)
          .select()
          .eq('destinataire_id', userId)
          .not('published_at', 'is', null)
          .order('published_at', ascending: false);

      final documents = (response as List<dynamic>)
          .map((row) => DocumentModel.fromJson(row as Map<String, dynamic>))
          .toList();

      AppLogger.info(
        'Fetched ${documents.length} documents for user $userId',
        tag: 'DocumentsRepo',
      );

      return documents;
    } on PostgrestException catch (e, st) {
      AppLogger.error(
        'Postgrest error fetching documents for user $userId',
        tag: 'DocumentsRepo',
        error: e,
        stackTrace: st,
      );
      rethrow;
    } on Exception catch (e, st) {
      AppLogger.error(
        'Unexpected error fetching documents for user $userId',
        tag: 'DocumentsRepo',
        error: e,
        stackTrace: st,
      );
      rethrow;
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // Fetch a single document by ID
  // ═══════════════════════════════════════════════════════════════════════════

  /// Returns the document with the given [docId], or `null` if not found.
  Future<DocumentModel?> getDocumentById(String docId) async {
    try {
      AppLogger.debug(
        'Fetching document by id: $docId',
        tag: 'DocumentsRepo',
      );

      final response = await _supabase
          .from(_table)
          .select()
          .eq('id', docId)
          .maybeSingle();

      if (response == null) {
        AppLogger.warning(
          'Document not found: $docId',
          tag: 'DocumentsRepo',
        );
        return null;
      }

      return DocumentModel.fromJson(response);
    } on PostgrestException catch (e, st) {
      AppLogger.error(
        'Postgrest error fetching document $docId',
        tag: 'DocumentsRepo',
        error: e,
        stackTrace: st,
      );
      rethrow;
    } on Exception catch (e, st) {
      AppLogger.error(
        'Unexpected error fetching document $docId',
        tag: 'DocumentsRepo',
        error: e,
        stackTrace: st,
      );
      rethrow;
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // Mark a document as read
  // ═══════════════════════════════════════════════════════════════════════════

  /// Sets `is_read = true` for the document with the given [docId].
  Future<void> markAsRead(String docId) async {
    try {
      AppLogger.info(
        'Marking document $docId as read',
        tag: 'DocumentsRepo',
      );

      await _supabase
          .from(_table)
          .update({'is_read': true})
          .eq('id', docId);

      AppLogger.info(
        'Document $docId marked as read',
        tag: 'DocumentsRepo',
      );
    } on PostgrestException catch (e, st) {
      AppLogger.error(
        'Postgrest error marking document $docId as read',
        tag: 'DocumentsRepo',
        error: e,
        stackTrace: st,
      );
      rethrow;
    } on Exception catch (e, st) {
      AppLogger.error(
        'Unexpected error marking document $docId as read',
        tag: 'DocumentsRepo',
        error: e,
        stackTrace: st,
      );
      rethrow;
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // Count unread documents
  // ═══════════════════════════════════════════════════════════════════════════

  /// Returns the number of unread published documents for [userId].
  Future<int> getUnreadCount(String userId) async {
    try {
      AppLogger.debug(
        'Counting unread documents for user $userId',
        tag: 'DocumentsRepo',
      );

      final response = await _supabase
          .from(_table)
          .select()
          .eq('destinataire_id', userId)
          .eq('is_read', false)
          .not('published_at', 'is', null)
          .count(CountOption.exact);

      final count = response.count;

      AppLogger.debug(
        'Unread documents for user $userId: $count',
        tag: 'DocumentsRepo',
      );

      return count;
    } on PostgrestException catch (e, st) {
      AppLogger.error(
        'Postgrest error counting unread documents for user $userId',
        tag: 'DocumentsRepo',
        error: e,
        stackTrace: st,
      );
      return 0;
    } on Exception catch (e, st) {
      AppLogger.error(
        'Unexpected error counting unread documents for user $userId',
        tag: 'DocumentsRepo',
        error: e,
        stackTrace: st,
      );
      return 0;
    }
  }
}
