/// Centralized route name constants for go_router.
///
/// Used with `GoRouter.goNamed()` / `context.pushNamed()` to avoid
/// hard-coding route name strings throughout the app.
///
/// ```dart
/// context.goNamed(RouteNames.home);
/// context.pushNamed(RouteNames.chatDetail, pathParameters: {'id': chatId});
/// ```
abstract final class RouteNames {
  // ── Auth flow ─────────────────────────────────────────────────────────
  static const splash = 'splash';
  static const onboarding = 'onboarding';
  static const login = 'login';

  // ── Main tabs ─────────────────────────────────────────────────────────
  static const home = 'home';
  static const chat = 'chat';
  static const profile = 'profile';
  static const accesPremium = 'accesPremium';

  // ── Detail screens ────────────────────────────────────────────────────
  static const chatDetail = 'chat-detail';
  static const eventDetail = 'event-detail';
  static const documentViewer = 'document-viewer';
  static const editProfile = 'edit-profile';
  static const notifications = 'notifications';

  // ── Rencontres Hub ────────────────────────────────────────────────────
  static const rencontresHub = 'rencontresHub';
  static const eventsListing = 'eventsListing';
  static const compatibilite = 'compatibilite';
  static const rencontresEnCours = 'rencontresEnCours';
  static const historiqueRencontres = 'historiqueRencontres';

  // ── High-Ticket ────────────────────────────────────────────────────
  static const formulaires = 'formulaires';
  static const formulaireDetail = 'formulaireDetail';
  static const cartographie = 'cartographie';
  static const cartographieViewer = 'cartographieViewer';
  static const ressources = 'ressources';
  static const ressourceDetail = 'ressourceDetail';
  static const planAction = 'planAction';

  // ── Feature screens ───────────────────────────────────────────────────
  static const blinkDate = 'blink-date';
  static const photoSelection = 'photo-selection';
  static const matchReveal = 'match-reveal';
  static const photoReveal = 'photo-reveal';
  static const matchResults = 'match-results';
  static const questionnaire = 'questionnaire';
  static const feedback = 'feedback';
}
