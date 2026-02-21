/// API keys, URLs, service identifiers, and timeout configurations.
///
/// In production builds the actual values are loaded at runtime from
/// `.env.prod` via `flutter_dotenv`. The constants below serve as
/// **compile-time fallbacks** for debug / CI builds where the `.env`
/// file might not be present.
///
/// Never commit real secret keys to this file. All sensitive values
/// must remain as `'PLACEHOLDER'` and be injected via environment
/// configuration at build time.
abstract final class ApiConstants {
  // ── Supabase ───────────────────────────────────────────────────────────
  static const supabaseUrl = 'PLACEHOLDER_SUPABASE_URL';
  static const supabaseAnonKey = 'PLACEHOLDER_SUPABASE_ANON_KEY';

  // ── Stream Chat ────────────────────────────────────────────────────────
  static const streamChatApiKey = 'PLACEHOLDER_STREAM_CHAT_API_KEY';

  // ── LiveKit (audio / video calls) ──────────────────────────────────────
  static const livekitWsUrl = 'PLACEHOLDER_LIVEKIT_WS_URL';
  static const livekitApiKey = 'PLACEHOLDER_LIVEKIT_API_KEY';

  // ── Sentry (error monitoring) ──────────────────────────────────────────
  static const sentryDsn = 'PLACEHOLDER_SENTRY_DSN';

  // ── Network Timeouts ──────────────────────────────────────────────────
  /// Maximum time to wait for a TCP connection to be established.
  static const connectTimeout = Duration(seconds: 15);

  /// Maximum time to wait for the server to send a response.
  static const receiveTimeout = Duration(seconds: 30);

  /// Maximum time to wait for a request body to be sent.
  static const sendTimeout = Duration(seconds: 15);

  // ── Circuit Breaker ───────────────────────────────────────────────────
  /// Duration the circuit breaker stays open before attempting a half-open
  /// probe request.
  static const circuitBreakerTimeout = Duration(seconds: 30);

  /// Number of consecutive failures before the circuit breaker trips open.
  static const circuitBreakerFailureThreshold = 5;

  /// Number of successful probes needed to close the circuit again.
  static const circuitBreakerSuccessThreshold = 2;

  // ── Feature Flags ─────────────────────────────────────────────────────
  /// Interval between remote feature flag refresh calls.
  static const featureFlagRefreshInterval = Duration(seconds: 60);

  // ── Retry Configuration ───────────────────────────────────────────────
  /// Maximum number of retry attempts for failed network requests.
  static const maxRetries = 3;

  /// Base delay between retries (exponential backoff is applied).
  static const retryBaseDelay = Duration(seconds: 1);

  /// Maximum delay between retries (caps the exponential backoff).
  static const retryMaxDelay = Duration(seconds: 10);

  // ── Pagination Defaults ───────────────────────────────────────────────
  /// Default number of items per page for list queries.
  static const defaultPageSize = 20;

  /// Number of chat messages loaded per page in the chat view.
  static const chatMessagePageSize = 50;

  /// Number of notifications loaded per page.
  static const notificationPageSize = 30;

  // ── Cache TTL ─────────────────────────────────────────────────────────
  /// Time-to-live for cached profile data.
  static const profileCacheTtl = Duration(minutes: 5);

  /// Time-to-live for cached matching results.
  static const matchingCacheTtl = Duration(minutes: 10);

  /// Time-to-live for cached feature flags.
  static const featureFlagCacheTtl = Duration(minutes: 2);

  // ── Media ─────────────────────────────────────────────────────────────
  /// Maximum file size for photo uploads (5 MB).
  static const maxPhotoUploadBytes = 5 * 1024 * 1024;

  /// Maximum duration for voice message recordings.
  static const maxVoiceMessageDuration = Duration(minutes: 3);

  /// Supported image MIME types for uploads.
  static const supportedImageTypes = ['image/jpeg', 'image/png', 'image/webp'];

  // ── Deep Linking ──────────────────────────────────────────────────────
  static const deepLinkScheme = 'mymuqabala';
  static const deepLinkHost = 'app.mymuqabala.com';
}
