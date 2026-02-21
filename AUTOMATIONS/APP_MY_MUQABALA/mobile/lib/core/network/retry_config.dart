/// Retry configuration for the Dio HTTP client.
///
/// Provides an exponential-backoff [RetryInterceptor] that retries on
/// transient server errors (5xx), timeouts, and network failures while
/// skipping client errors (4xx) which are not worth retrying.
library;

import 'package:dio/dio.dart';
import 'package:dio_smart_retry/dio_smart_retry.dart';

/// Creates a [RetryInterceptor] wired to [dio] with sensible defaults.
///
/// * **3 retries** with delays of 1 s, 2 s, 4 s (exponential backoff).
/// * Retries on timeout, 5xx, and connection errors.
/// * Does **not** retry 4xx client errors.
RetryInterceptor createRetryInterceptor(Dio dio) {
  return RetryInterceptor(
    dio: dio,
    logPrint: (_) {}, // Silence default print(); we use AppLogger instead.
    retries: 3,
    retryDelays: const [
      Duration(seconds: 1),
      Duration(seconds: 2),
      Duration(seconds: 4),
    ],
    retryEvaluator: (error, attempt) => _shouldRetry(error),
  );
}

/// Determines whether a request that failed with [error] is eligible for
/// automatic retry.
bool _shouldRetry(DioException error) {
  // Always retry on timeouts and connection errors.
  switch (error.type) {
    case DioExceptionType.connectionTimeout:
    case DioExceptionType.sendTimeout:
    case DioExceptionType.receiveTimeout:
    case DioExceptionType.connectionError:
      return true;

    case DioExceptionType.badResponse:
      final statusCode = error.response?.statusCode;
      if (statusCode == null) return true;
      // Retry server errors (5xx), not client errors (4xx).
      return statusCode >= 500;

    case DioExceptionType.cancel:
      // Cancelled by the caller -- do not retry.
      return false;

    case DioExceptionType.badCertificate:
    case DioExceptionType.unknown:
      // Unknown errors may be transient network issues.
      return true;
  }
}
