import 'dart:async';
import 'dart:io';

import 'package:supabase_flutter/supabase_flutter.dart';

import 'package:my_muqabala/core/utils/logger.dart';

import 'profile_model.dart';

/// Repository that encapsulates all Supabase operations on the
/// `profiles` table and the `photos` storage bucket.
///
/// Usage with Riverpod: see `profile_provider.dart`.
class ProfileRepository {
  ProfileRepository(this._supabase);

  final SupabaseClient _supabase;

  static const _table = 'profiles';
  static const _bucket = 'photos';
  static const _tag = 'ProfileRepository';

  // ── Read ─────────────────────────────────────────────────────────────

  /// Fetch a single profile by [userId].
  ///
  /// Returns `null` if no row exists (e.g. during onboarding before the
  /// profile is created).
  Future<ProfileModel?> getProfile(String userId) async {
    try {
      final response = await _supabase
          .from(_table)
          .select()
          .eq('id', userId)
          .maybeSingle();

      if (response == null) {
        AppLogger.debug('No profile found for $userId', tag: _tag);
        return null;
      }

      return ProfileModel.fromJson(response);
    } catch (e, st) {
      AppLogger.error(
        'Failed to fetch profile $userId',
        tag: _tag,
        error: e,
        stackTrace: st,
      );
      rethrow;
    }
  }

  // ── Update ───────────────────────────────────────────────────────────

  /// Partial update: only the keys present in [updates] are overwritten.
  ///
  /// The `updated_at` column is handled by the DB trigger.
  Future<void> updateProfile(
    String userId,
    Map<String, dynamic> updates,
  ) async {
    try {
      await _supabase.from(_table).update(updates).eq('id', userId);

      AppLogger.info('Profile $userId updated', tag: _tag);
    } catch (e, st) {
      AppLogger.error(
        'Failed to update profile $userId',
        tag: _tag,
        error: e,
        stackTrace: st,
      );
      rethrow;
    }
  }

  // ── Photo upload ─────────────────────────────────────────────────────

  /// Upload a photo for [userId] to the `photos` storage bucket, then
  /// invoke the `blur-photo` edge function to generate the blurred
  /// version. Returns the sharp (nette) photo URL.
  ///
  /// Flow:
  /// 1. Upload original to `photos/{userId}/photo_nette.jpg`
  /// 2. Get the public URL of the uploaded file
  /// 3. Update `photo_nette_url` on the profile row
  /// 4. Call the `blur-photo` edge function which creates & stores
  ///    the blurred version and updates `photo_floue_url`
  Future<String> uploadPhoto(String userId, File photo) async {
    try {
      final bytes = await photo.readAsBytes();
      final storagePath = '$userId/photo_nette.jpg';

      // 1. Upload to storage (upsert in case a photo already exists)
      await _supabase.storage.from(_bucket).uploadBinary(
            storagePath,
            bytes,
            fileOptions: const FileOptions(
              contentType: 'image/jpeg',
              upsert: true,
            ),
          );

      // 2. Get the public URL
      final photoUrl =
          _supabase.storage.from(_bucket).getPublicUrl(storagePath);

      // 3. Update profile row with the sharp URL
      await _supabase
          .from(_table)
          .update({'photo_nette_url': photoUrl}).eq('id', userId);

      AppLogger.info('Photo uploaded for $userId', tag: _tag);

      // 4. Call blur-photo edge function (fire-and-forget style,
      //    but we await to catch immediate errors)
      try {
        await _supabase.functions.invoke(
          'blur-photo',
          body: {
            'user_id': userId,
            'photo_path': storagePath,
          },
        );
        AppLogger.info('Blur-photo edge function invoked', tag: _tag);
      } catch (blurError) {
        // Non-fatal: the blurred version is a nice-to-have.
        // The edge function can also be retried later.
        AppLogger.warning(
          'blur-photo edge function failed (non-fatal)',
          tag: _tag,
          error: blurError,
        );
      }

      return photoUrl;
    } catch (e, st) {
      AppLogger.error(
        'Failed to upload photo for $userId',
        tag: _tag,
        error: e,
        stackTrace: st,
      );
      rethrow;
    }
  }

  // ── Delete account ───────────────────────────────────────────────────

  /// Soft-delete the account by setting `statut_parcours = 'desactive'`.
  ///
  /// A full deletion (auth + data) would require a service-role call
  /// via an edge function. For now we deactivate the profile so that
  /// the user disappears from the matching pool but historical data
  /// is preserved for coaching records.
  Future<void> deleteAccount(String userId) async {
    try {
      await _supabase.from(_table).update({
        'statut_parcours': 'desactive',
      }).eq('id', userId);

      // Sign the user out locally
      await _supabase.auth.signOut();

      AppLogger.info('Account $userId deactivated', tag: _tag);
    } catch (e, st) {
      AppLogger.error(
        'Failed to delete account $userId',
        tag: _tag,
        error: e,
        stackTrace: st,
      );
      rethrow;
    }
  }

  // ── Realtime ─────────────────────────────────────────────────────────

  /// Returns a stream that emits the latest [ProfileModel] every time
  /// the row for [userId] is updated via Supabase Realtime.
  ///
  /// The stream emits `null` if the row is deleted.
  Stream<ProfileModel?> watchProfile(String userId) {
    return _supabase
        .from(_table)
        .stream(primaryKey: ['id'])
        .eq('id', userId)
        .map((rows) {
          if (rows.isEmpty) return null;
          return ProfileModel.fromJson(rows.first);
        });
  }

  // ── Update last connexion ────────────────────────────────────────────

  /// Updates the `derniere_connexion` timestamp. Called on app foreground.
  Future<void> touchLastConnexion(String userId) async {
    try {
      await _supabase.from(_table).update({
        'derniere_connexion': DateTime.now().toUtc().toIso8601String(),
      }).eq('id', userId);
    } catch (e) {
      // Non-critical, silently ignore.
      AppLogger.debug(
        'Failed to update derniere_connexion: $e',
        tag: _tag,
      );
    }
  }
}
