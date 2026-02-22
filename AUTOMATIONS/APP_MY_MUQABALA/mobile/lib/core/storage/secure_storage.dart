/// Typed wrapper around [FlutterSecureStorage].
///
/// Provides strongly-typed convenience methods for common token operations
/// while still exposing the generic [read]/[write]/[delete] surface.
library;

import 'package:flutter_secure_storage/flutter_secure_storage.dart';

import 'package:my_muqabala/core/utils/logger.dart';

/// Well-known keys stored in secure storage.
abstract final class _Keys {
  static const authToken = 'auth_token';
  static const refreshToken = 'refresh_token';
  static const streamToken = 'stream_token';
  static const livekitToken = 'livekit_token';
  static const fcmToken = 'fcm_token';
  static const userId = 'user_id';
}

/// Secure, encrypted key-value storage for sensitive data (tokens, secrets).
///
/// Uses [FlutterSecureStorage] under the hood with Android EncryptedSharedPreferences
/// and iOS Keychain. All operations are asynchronous.
class SecureStorageService {
  SecureStorageService({FlutterSecureStorage? storage})
      : _storage = storage ??
            const FlutterSecureStorage(
              aOptions: AndroidOptions(encryptedSharedPreferences: true),
              iOptions: IOSOptions(
                accessibility: KeychainAccessibility.first_unlock_this_device,
              ),
            );

  final FlutterSecureStorage _storage;

  // ── Generic operations ──────────────────────────────────────────────────

  /// Write a [value] under [key]. Overwrites any existing value.
  Future<void> write(String key, String value) async {
    await _storage.write(key: key, value: value);
    AppLogger.debug('Secure storage: wrote key "$key"', tag: 'SecureStorage');
  }

  /// Read the value stored under [key], or `null` if absent.
  Future<String?> read(String key) async {
    return _storage.read(key: key);
  }

  /// Delete the value stored under [key]. No-op if absent.
  Future<void> delete(String key) async {
    await _storage.delete(key: key);
    AppLogger.debug('Secure storage: deleted key "$key"', tag: 'SecureStorage');
  }

  /// Delete all values from secure storage.
  Future<void> deleteAll() async {
    await _storage.deleteAll();
    AppLogger.info('Secure storage: all keys deleted', tag: 'SecureStorage');
  }

  // ── Auth token ──────────────────────────────────────────────────────────

  Future<void> saveAuthToken(String token) =>
      write(_Keys.authToken, token);

  Future<String?> getAuthToken() => read(_Keys.authToken);

  Future<void> deleteAuthToken() => delete(_Keys.authToken);

  // ── Refresh token ───────────────────────────────────────────────────────

  Future<void> saveRefreshToken(String token) =>
      write(_Keys.refreshToken, token);

  Future<String?> getRefreshToken() => read(_Keys.refreshToken);

  // ── Stream (chat) token ─────────────────────────────────────────────────

  Future<void> saveStreamToken(String token) =>
      write(_Keys.streamToken, token);

  Future<String?> getStreamToken() => read(_Keys.streamToken);

  // ── LiveKit token ───────────────────────────────────────────────────────

  Future<void> saveLiveKitToken(String token) =>
      write(_Keys.livekitToken, token);

  Future<String?> getLiveKitToken() => read(_Keys.livekitToken);

  // ── FCM token ───────────────────────────────────────────────────────────

  Future<void> saveFcmToken(String token) =>
      write(_Keys.fcmToken, token);

  Future<String?> getFcmToken() => read(_Keys.fcmToken);

  // ── User ID ─────────────────────────────────────────────────────────────

  Future<void> saveUserId(String id) => write(_Keys.userId, id);

  Future<String?> getUserId() => read(_Keys.userId);
}
