/// Model for past encounter history entries.
///
/// Maps to the `rencontres_historique` Supabase table.
library;

class RencontreHistoriqueModel {
  RencontreHistoriqueModel({
    required this.id,
    required this.clientId,
    required this.numero,
    this.dateRencontre,
    this.titre,
    this.analyse,
    required this.statut,
  });

  final String id;
  final String clientId;
  final int numero;
  final DateTime? dateRencontre;
  final String? titre;
  final String? analyse;

  /// `en_attente` or `analyse_disponible`
  final String statut;

  factory RencontreHistoriqueModel.fromJson(Map<String, dynamic> json) {
    return RencontreHistoriqueModel(
      id: json['id'] as String,
      clientId: json['client_id'] as String,
      numero: json['numero'] as int? ?? 0,
      dateRencontre: json['date_rencontre'] != null
          ? DateTime.tryParse(json['date_rencontre'] as String)
          : null,
      titre: json['titre'] as String?,
      analyse: json['analyse'] as String?,
      statut: json['statut'] as String? ?? 'en_attente',
    );
  }

  Map<String, dynamic> toJson() => {
        'id': id,
        'client_id': clientId,
        'numero': numero,
        'date_rencontre': dateRencontre?.toIso8601String(),
        'titre': titre,
        'analyse': analyse,
        'statut': statut,
      };

  bool get hasAnalyse => statut == 'analyse_disponible' && analyse != null;
  bool get isEnAttente => statut == 'en_attente';

  String get statutLabel => switch (statut) {
        'analyse_disponible' => 'Analyse disponible',
        'en_attente' => 'En attente',
        _ => statut,
      };

  String get displayTitle =>
      titre ?? 'Rencontre n°$numero';
}
