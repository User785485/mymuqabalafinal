import 'package:freezed_annotation/freezed_annotation.dart';

part 'profile_model.freezed.dart';
part 'profile_model.g.dart';

/// Domain model for a user profile.
///
/// Maps 1:1 to the `profiles` table in Supabase. Column names use
/// snake_case in the DB; the [JsonKey] annotations handle conversion
/// to camelCase Dart fields.
///
/// After modifying this file run:
/// ```sh
/// dart run build_runner build --delete-conflicting-outputs
/// ```
@freezed
sealed class ProfileModel with _$ProfileModel {
  const ProfileModel._(); // Needed for custom getters

  const factory ProfileModel({
    required String id,
    required String prenom,
    String? nom,
    required String telephone,
    String? email,
    @JsonKey(name: 'date_naissance') required DateTime dateNaissance,
    required String ville,
    required String genre,
    String? bio,
    @JsonKey(name: 'photo_floue_url') String? photoFloueUrl,
    @JsonKey(name: 'photo_nette_url') String? photoNetteUrl,
    @Default('participant') String role,
    @JsonKey(name: 'statut_parcours')
    @Default('inscription')
    String statutParcours,
    @JsonKey(name: 'date_inscription') required DateTime dateInscription,
    @JsonKey(name: 'derniere_connexion') DateTime? derniereConnexion,
    @JsonKey(name: 'is_high_ticket') @Default(false) bool isHighTicket,
    @JsonKey(name: 'nb_events_participes') @Default(0) int nbEventsParticipes,
    @Default({}) Map<String, dynamic> metadata,
  }) = _ProfileModel;

  // ── Custom getters ──────────────────────────────────────────────────

  /// Display-safe name: "Fatima C." or just "Fatima" if no nom.
  String get displayName =>
      nom != null && nom!.isNotEmpty
          ? '$prenom ${nom![0].toUpperCase()}.'
          : prenom;

  /// First letter of the prenom, uppercased. Falls back to "?" if empty.
  String get initial =>
      prenom.isNotEmpty ? prenom[0].toUpperCase() : '?';

  /// Whether this user has a coach or admin role.
  bool get isCoach => role == 'coach' || role == 'admin';

  /// Whether a photo (blurred or sharp) is available for display.
  bool get hasPhoto =>
      (photoFloueUrl != null && photoFloueUrl!.isNotEmpty) ||
      (photoNetteUrl != null && photoNetteUrl!.isNotEmpty);

  /// Best available photo URL (prefer sharp, fall back to blurred).
  String? get bestPhotoUrl => photoNetteUrl ?? photoFloueUrl;

  /// Human-readable parcours status label in French.
  String get statutLabel => switch (statutParcours) {
    'inscription' => 'Inscription',
    'formulaire_en_cours' => 'Formulaire en cours',
    'formation' => 'Formation',
    'matching_pool' => 'En attente de matching',
    'phase_1_matching' => 'Phase 1 - Matching',
    'phase_2_decouverte' => 'Phase 2 - Découverte',
    'phase_3_approfondie' => 'Phase 3 - Approfondie',
    'phase_4_engagement' => 'Phase 4 - Engagement',
    'termine' => 'Terminé',
    'desactive' => 'Désactivé',
    _ => statutParcours,
  };

  // ── JSON serialization ──────────────────────────────────────────────

  factory ProfileModel.fromJson(Map<String, dynamic> json) =>
      _$ProfileModelFromJson(json);
}
