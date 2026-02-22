/// Contextual greeting utility based on time of day and day of week.
///
/// Returns culturally appropriate Islamic greetings:
/// - Friday: "Jumu'a mubarak"
/// - Morning (5h–12h): "Sabah al-khayr"
/// - Afternoon (12h–18h): "As-salamu alaykum"
/// - Evening (18h–5h): "Masa' al-khayr"
library;

/// Provides contextual greeting strings.
abstract final class GreetingUtils {
  /// Returns the appropriate greeting for the given [now] timestamp.
  ///
  /// Priority: Friday greeting > time-of-day greeting.
  static String greeting(DateTime now) {
    if (now.weekday == DateTime.friday) {
      return "Jumu'a mubarak";
    }

    final hour = now.hour;

    if (hour >= 5 && hour < 12) {
      return 'Sabah al-khayr';
    } else if (hour >= 12 && hour < 18) {
      return 'As-salamu alaykum';
    } else {
      return "Masa' al-khayr";
    }
  }
}
