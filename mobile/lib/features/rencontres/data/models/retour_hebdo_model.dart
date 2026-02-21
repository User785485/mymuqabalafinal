/// Model for weekly feedback entries (retours hebdomadaires).
///
/// Maps to the `retours_hebdomadaires` Supabase table.
library;

class RetourHebdoModel {
  RetourHebdoModel({
    required this.id,
    required this.clientId,
    required this.semaineNumero,
    this.dateRetour,
    this.contenu,
    required this.statut,
  });

  final String id;
  final String clientId;
  final int semaineNumero;
  final DateTime? dateRetour;
  final String? contenu;

  /// `en_attente` or `redige`
  final String statut;

  factory RetourHebdoModel.fromJson(Map<String, dynamic> json) {
    return RetourHebdoModel(
      id: json['id'] as String,
      clientId: json['client_id'] as String,
      semaineNumero: json['semaine_numero'] as int? ?? 0,
      dateRetour: json['date_retour'] != null
          ? DateTime.tryParse(json['date_retour'] as String)
          : null,
      contenu: json['contenu'] as String?,
      statut: json['statut'] as String? ?? 'en_attente',
    );
  }

  Map<String, dynamic> toJson() => {
        'id': id,
        'client_id': clientId,
        'semaine_numero': semaineNumero,
        'date_retour': dateRetour?.toIso8601String(),
        'contenu': contenu,
        'statut': statut,
      };

  bool get isRedige => statut == 'redige';
  bool get isEnAttente => statut == 'en_attente';

  String get statutLabel => switch (statut) {
        'redige' => 'Rédigé',
        'en_attente' => 'En attente',
        _ => statut,
      };
}
