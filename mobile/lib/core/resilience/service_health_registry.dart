/// Centralized registry for service-level feature flags.
///
/// Polls the `feature_flags` table in Supabase every 60 seconds and caches
/// results locally so that the rest of the app can synchronously query
/// whether a given feature is enabled or read its current value.
library;

import 'dart:async';

import 'package:supabase_flutter/supabase_flutter.dart';

import 'package:my_muqabala/core/utils/logger.dart';

/// Represents a single row from the `feature_flags` table.
class FeatureFlag {
  const FeatureFlag({
    required this.key,
    required this.enabled,
    this.value,
  });

  /// Create a [FeatureFlag] from a Supabase row (JSON map).
  factory FeatureFlag.fromJson(Map<String, dynamic> json) {
    return FeatureFlag(
      key: json['key'] as String,
      enabled: json['enabled'] as bool? ?? true,
      value: json['value'] as String?,
    );
  }

  final String key;
  final bool enabled;
  final String? value;
}

/// Well-known feature flag keys used across the application.
abstract final class FeatureFlagKeys {
  static const audioCalls = 'audio_calls';
  static const streamChat = 'stream_chat';
  static const blinkDates = 'blink_dates';
  static const pushNotifications = 'push_notifications';
  static const photoSelection = 'photo_selection';
}

/// Reads and caches feature flags from Supabase.
///
/// ```dart
/// final registry = ServiceHealthRegistry();
/// await registry.init(Supabase.instance.client);
///
/// if (registry.isEnabled(FeatureFlagKeys.audioCalls)) {
///   // show audio call UI
/// }
/// ```
class ServiceHealthRegistry {
  ServiceHealthRegistry({
    this.refreshInterval = const Duration(seconds: 60),
  });

  final Duration refreshInterval;

  final Map<String, FeatureFlag> _flags = {};
  Timer? _refreshTimer;
  SupabaseClient? _client;

  /// Whether a flag identified by [key] is currently enabled.
  ///
  /// Returns `true` by default if the key is not found (fail-open).
  bool isEnabled(String key) => _flags[key]?.enabled ?? true;

  /// Returns the optional string value associated with [key], or `null`.
  String? getValue(String key) => _flags[key]?.value;

  /// Returns an unmodifiable snapshot of all cached flags.
  Map<String, FeatureFlag> get flags => Map.unmodifiable(_flags);

  /// Perform the initial fetch and start the periodic refresh timer.
  Future<void> init(SupabaseClient client) async {
    _client = client;
    await _fetchFlags();
    _refreshTimer = Timer.periodic(refreshInterval, (_) => _fetchFlags());
    AppLogger.info(
      'ServiceHealthRegistry initialized with ${_flags.length} flags',
      tag: 'HealthRegistry',
    );
  }

  /// Cancel the refresh timer and clear cached data.
  void dispose() {
    _refreshTimer?.cancel();
    _refreshTimer = null;
    _flags.clear();
    _client = null;
    AppLogger.info(
      'ServiceHealthRegistry disposed',
      tag: 'HealthRegistry',
    );
  }

  /// Force an immediate refresh of feature flags.
  Future<void> refresh() => _fetchFlags();

  // ── Private ─────────────────────────────────────────────────────────────

  Future<void> _fetchFlags() async {
    final client = _client;
    if (client == null) return;

    try {
      final response = await client.from('feature_flags').select();
      final rows = response as List<dynamic>;

      _flags.clear();
      for (final row in rows) {
        if (row is Map<String, dynamic>) {
          final flag = FeatureFlag.fromJson(row);
          _flags[flag.key] = flag;
        }
      }

      AppLogger.debug(
        'Feature flags refreshed: ${_flags.keys.join(', ')}',
        tag: 'HealthRegistry',
      );
    } on Exception catch (e) {
      // Swallow errors silently -- we keep the last-known-good cache.
      AppLogger.warning(
        'Failed to refresh feature flags, keeping cached values',
        tag: 'HealthRegistry',
        error: e,
      );
    }
  }
}
