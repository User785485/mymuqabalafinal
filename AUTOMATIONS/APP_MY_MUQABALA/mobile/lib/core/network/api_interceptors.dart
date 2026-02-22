/// Dio interceptors and factory function.
///
/// Provides:
/// * [AuthInterceptor] -- injects the Supabase access token into every request.
/// * [LoggingInterceptor] -- logs requests & responses via [AppLogger].
/// * [ErrorTransformInterceptor] -- maps [DioException] to domain-level errors.
/// * [createDio] -- pre-configured Dio instance with all interceptors wired up.
library;

import 'package:dio/dio.dart';

import 'package:my_muqabala/core/network/retry_config.dart';
import 'package:my_muqabala/core/network/supabase_client.dart';
import 'package:my_muqabala/core/utils/logger.dart';

// ── Auth ──────────────────────────────────────────────────────────────────

/// Injects the current Supabase access token as an `Authorization` header.
class AuthInterceptor extends Interceptor {
  @override
  void onRequest(RequestOptions options, RequestInterceptorHandler handler) {
    final session = SupabaseClientManager.auth.currentSession;
    if (session != null) {
      options.headers['Authorization'] = 'Bearer ${session.accessToken}';
    }
    handler.next(options);
  }
}

// ── Logging ───────────────────────────────────────────────────────────────

/// Logs outgoing requests and incoming responses at debug level.
class LoggingInterceptor extends Interceptor {
  @override
  void onRequest(RequestOptions options, RequestInterceptorHandler handler) {
    AppLogger.debug(
      '--> ${options.method} ${options.uri}',
      tag: 'HTTP',
    );
    handler.next(options);
  }

  @override
  void onResponse(
    Response<dynamic> response,
    ResponseInterceptorHandler handler,
  ) {
    AppLogger.debug(
      '<-- ${response.statusCode} ${response.requestOptions.uri}',
      tag: 'HTTP',
    );
    handler.next(response);
  }

  @override
  void onError(DioException err, ErrorInterceptorHandler handler) {
    AppLogger.warning(
      '<-- ERROR ${err.response?.statusCode ?? 'N/A'} '
      '${err.requestOptions.uri}: ${err.message}',
      tag: 'HTTP',
      error: err,
    );
    handler.next(err);
  }
}

// ── Error transform ──────────────────────────────────────────────────────

/// Transforms raw [DioException] instances into more readable domain errors.
///
/// This interceptor enriches the error message so that callers higher up
/// the stack get actionable descriptions without needing to inspect the
/// raw response body.
class ErrorTransformInterceptor extends Interceptor {
  @override
  void onError(DioException err, ErrorInterceptorHandler handler) {
    final transformed = switch (err.type) {
      DioExceptionType.connectionTimeout => DioException(
          requestOptions: err.requestOptions,
          type: err.type,
          error: err.error,
          message: 'Connexion trop longue. Vérifiez votre réseau.',
        ),
      DioExceptionType.receiveTimeout => DioException(
          requestOptions: err.requestOptions,
          type: err.type,
          error: err.error,
          message: 'Le serveur met trop de temps à répondre.',
        ),
      DioExceptionType.badResponse => _transformBadResponse(err),
      _ => err,
    };
    handler.next(transformed);
  }

  DioException _transformBadResponse(DioException err) {
    final statusCode = err.response?.statusCode;
    final String? userMessage;
    if (statusCode == null) {
      userMessage = err.message;
    } else {
      userMessage = switch (statusCode) {
        401 => 'Session expirée. Veuillez vous reconnecter.',
        403 => 'Accès refusé.',
        404 => 'Ressource introuvable.',
        422 => 'Données invalides.',
        429 => 'Trop de requêtes. Veuillez patienter.',
        >= 500 => 'Erreur serveur. Veuillez réessayer.',
        _ => err.message,
      };
    }
    return DioException(
      requestOptions: err.requestOptions,
      response: err.response,
      type: err.type,
      error: err.error,
      message: userMessage,
    );
  }
}

// ── Factory ──────────────────────────────────────────────────────────────

/// Creates a fully configured [Dio] instance with auth, retry, logging,
/// and error-transform interceptors.
///
/// ```dart
/// final dio = createDio();
/// final response = await dio.get('https://api.example.com/data');
/// ```
Dio createDio() {
  final dio = Dio(
    BaseOptions(
      connectTimeout: const Duration(seconds: 10),
      receiveTimeout: const Duration(seconds: 30),
      sendTimeout: const Duration(seconds: 15),
    ),
  );
  dio.interceptors.addAll([
    AuthInterceptor(),
    createRetryInterceptor(dio),
    LoggingInterceptor(),
    ErrorTransformInterceptor(),
  ]);
  return dio;
}
