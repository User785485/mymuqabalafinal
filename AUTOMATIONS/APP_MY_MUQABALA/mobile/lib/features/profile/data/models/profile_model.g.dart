// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'profile_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_ProfileModel _$ProfileModelFromJson(Map<String, dynamic> json) =>
    _ProfileModel(
      id: json['id'] as String,
      prenom: json['prenom'] as String,
      nom: json['nom'] as String?,
      telephone: json['telephone'] as String,
      email: json['email'] as String?,
      dateNaissance: DateTime.parse(json['date_naissance'] as String),
      ville: json['ville'] as String,
      genre: json['genre'] as String,
      bio: json['bio'] as String?,
      photoFloueUrl: json['photo_floue_url'] as String?,
      photoNetteUrl: json['photo_nette_url'] as String?,
      role: json['role'] as String? ?? 'participant',
      statutParcours: json['statut_parcours'] as String? ?? 'inscription',
      dateInscription: DateTime.parse(json['date_inscription'] as String),
      derniereConnexion: json['derniere_connexion'] == null
          ? null
          : DateTime.parse(json['derniere_connexion'] as String),
      isHighTicket: json['is_high_ticket'] as bool? ?? false,
      nbEventsParticipes: (json['nb_events_participes'] as num?)?.toInt() ?? 0,
      metadata: json['metadata'] as Map<String, dynamic>? ?? const {},
    );

Map<String, dynamic> _$ProfileModelToJson(_ProfileModel instance) =>
    <String, dynamic>{
      'id': instance.id,
      'prenom': instance.prenom,
      'nom': instance.nom,
      'telephone': instance.telephone,
      'email': instance.email,
      'date_naissance': instance.dateNaissance.toIso8601String(),
      'ville': instance.ville,
      'genre': instance.genre,
      'bio': instance.bio,
      'photo_floue_url': instance.photoFloueUrl,
      'photo_nette_url': instance.photoNetteUrl,
      'role': instance.role,
      'statut_parcours': instance.statutParcours,
      'date_inscription': instance.dateInscription.toIso8601String(),
      'derniere_connexion': instance.derniereConnexion?.toIso8601String(),
      'is_high_ticket': instance.isHighTicket,
      'nb_events_participes': instance.nbEventsParticipes,
      'metadata': instance.metadata,
    };
