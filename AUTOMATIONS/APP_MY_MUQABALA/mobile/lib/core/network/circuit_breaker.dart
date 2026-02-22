/// Circuit breaker pattern for external service resilience.
///
/// Each external service (Supabase, Stream, LiveKit, FCM) gets its own
/// [CircuitBreaker] instance. After [failureThreshold] consecutive failures
/// the circuit **opens** and all subsequent calls fail fast with a
/// [ServiceUnavailableException] until [resetTimeout] elapses, at which point
/// a single probe call is allowed (half-open state).
library;

import 'package:my_muqabala/core/utils/logger.dart';

/// The three states of the circuit breaker state machine.
enum CircuitState {
  /// Normal operation -- calls pass through.
  closed,

  /// Too many failures -- calls are rejected immediately.
  open,

  /// Cooling-off period elapsed -- one probe call is allowed.
  halfOpen,
}

/// Thrown when the circuit is [CircuitState.open] and a call is attempted.
class ServiceUnavailableException implements Exception {
  const ServiceUnavailableException({
    required this.serviceName,
    this.message,
  });

  final String serviceName;
  final String? message;

  @override
  String toString() =>
      'ServiceUnavailableException($serviceName): '
      '${message ?? 'circuit is open -- service temporarily unavailable'}';
}

/// A circuit breaker that wraps async calls to a single external service.
///
/// ```dart
/// final cb = CircuitBreaker(serviceName: 'supabase');
/// final data = await cb.call(() => supabaseClient.from('users').select());
/// ```
class CircuitBreaker {
  CircuitBreaker({
    required this.serviceName,
    this.failureThreshold = 3,
    this.resetTimeout = const Duration(seconds: 30),
  });

  final String serviceName;
  final int failureThreshold;
  final Duration resetTimeout;

  CircuitState _state = CircuitState.closed;
  int _failureCount = 0;
  DateTime? _lastFailureTime;

  /// The current state of the circuit breaker (read-only).
  CircuitState get state => _state;

  /// The number of consecutive failures recorded so far.
  int get failureCount => _failureCount;

  /// Execute [action] through the circuit breaker.
  ///
  /// * In **closed** state the call is forwarded as-is.
  /// * In **open** state a [ServiceUnavailableException] is thrown immediately.
  /// * In **halfOpen** state a single probe call is allowed; if it succeeds
  ///   the circuit closes again, otherwise it re-opens.
  Future<T> call<T>(Future<T> Function() action) async {
    _evaluateState();

    switch (_state) {
      case CircuitState.open:
        AppLogger.warning(
          'Circuit OPEN for $serviceName -- rejecting call',
          tag: 'CircuitBreaker',
        );
        throw ServiceUnavailableException(serviceName: serviceName);

      case CircuitState.halfOpen:
        return _attemptProbe(action);

      case CircuitState.closed:
        return _attemptCall(action);
    }
  }

  /// Manually reset the circuit breaker to [CircuitState.closed].
  void reset() {
    _state = CircuitState.closed;
    _failureCount = 0;
    _lastFailureTime = null;
    AppLogger.info(
      'Circuit manually reset for $serviceName',
      tag: 'CircuitBreaker',
    );
  }

  // ── Private helpers ─────────────────────────────────────────────────────

  /// Re-evaluate whether the circuit should transition from open to halfOpen.
  void _evaluateState() {
    if (_state == CircuitState.open && _lastFailureTime != null) {
      final elapsed = DateTime.now().difference(_lastFailureTime!);
      if (elapsed >= resetTimeout) {
        AppLogger.info(
          'Circuit transitioning to HALF-OPEN for $serviceName '
          '(${elapsed.inSeconds}s since last failure)',
          tag: 'CircuitBreaker',
        );
        _state = CircuitState.halfOpen;
      }
    }
  }

  Future<T> _attemptCall<T>(Future<T> Function() action) async {
    try {
      final result = await action();
      _onSuccess();
      return result;
    } on Exception catch (e) {
      _onFailure(e);
      rethrow;
    }
  }

  Future<T> _attemptProbe<T>(Future<T> Function() action) async {
    AppLogger.info(
      'Attempting probe call for $serviceName (half-open)',
      tag: 'CircuitBreaker',
    );
    try {
      final result = await action();
      _onSuccess();
      AppLogger.info(
        'Probe succeeded -- circuit CLOSED for $serviceName',
        tag: 'CircuitBreaker',
      );
      return result;
    } on Exception catch (e) {
      _onFailure(e);
      AppLogger.warning(
        'Probe failed -- circuit re-OPENED for $serviceName',
        tag: 'CircuitBreaker',
        error: e,
      );
      rethrow;
    }
  }

  void _onSuccess() {
    _failureCount = 0;
    _state = CircuitState.closed;
  }

  void _onFailure(Exception error) {
    _failureCount++;
    _lastFailureTime = DateTime.now();

    if (_failureCount >= failureThreshold) {
      _state = CircuitState.open;
      AppLogger.error(
        'Circuit OPENED for $serviceName after $_failureCount failures',
        tag: 'CircuitBreaker',
        error: error,
      );
    } else {
      AppLogger.warning(
        'Failure $_failureCount/$failureThreshold for $serviceName',
        tag: 'CircuitBreaker',
        error: error,
      );
    }
  }
}
