// GENERATED CODE - DO NOT MODIFY BY HAND
// coverage:ignore-file
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'profile_model.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

// dart format off
T _$identity<T>(T value) => value;

/// @nodoc
mixin _$ProfileModel {
  String get id;
  String get prenom;
  String? get nom;
  String get telephone;
  String? get email;
  @JsonKey(name: 'date_naissance')
  DateTime get dateNaissance;
  String get ville;
  String get genre;
  String? get bio;
  @JsonKey(name: 'photo_floue_url')
  String? get photoFloueUrl;
  @JsonKey(name: 'photo_nette_url')
  String? get photoNetteUrl;
  String get role;
  @JsonKey(name: 'statut_parcours')
  String get statutParcours;
  @JsonKey(name: 'date_inscription')
  DateTime get dateInscription;
  @JsonKey(name: 'derniere_connexion')
  DateTime? get derniereConnexion;
  @JsonKey(name: 'is_high_ticket')
  bool get isHighTicket;
  @JsonKey(name: 'nb_events_participes')
  int get nbEventsParticipes;
  Map<String, dynamic> get metadata;

  /// Create a copy of ProfileModel
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @pragma('vm:prefer-inline')
  $ProfileModelCopyWith<ProfileModel> get copyWith =>
      _$ProfileModelCopyWithImpl<ProfileModel>(
          this as ProfileModel, _$identity);

  /// Serializes this ProfileModel to a JSON map.
  Map<String, dynamic> toJson();

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is ProfileModel &&
            (identical(other.id, id) || other.id == id) &&
            (identical(other.prenom, prenom) || other.prenom == prenom) &&
            (identical(other.nom, nom) || other.nom == nom) &&
            (identical(other.telephone, telephone) ||
                other.telephone == telephone) &&
            (identical(other.email, email) || other.email == email) &&
            (identical(other.dateNaissance, dateNaissance) ||
                other.dateNaissance == dateNaissance) &&
            (identical(other.ville, ville) || other.ville == ville) &&
            (identical(other.genre, genre) || other.genre == genre) &&
            (identical(other.bio, bio) || other.bio == bio) &&
            (identical(other.photoFloueUrl, photoFloueUrl) ||
                other.photoFloueUrl == photoFloueUrl) &&
            (identical(other.photoNetteUrl, photoNetteUrl) ||
                other.photoNetteUrl == photoNetteUrl) &&
            (identical(other.role, role) || other.role == role) &&
            (identical(other.statutParcours, statutParcours) ||
                other.statutParcours == statutParcours) &&
            (identical(other.dateInscription, dateInscription) ||
                other.dateInscription == dateInscription) &&
            (identical(other.derniereConnexion, derniereConnexion) ||
                other.derniereConnexion == derniereConnexion) &&
            (identical(other.isHighTicket, isHighTicket) ||
                other.isHighTicket == isHighTicket) &&
            (identical(other.nbEventsParticipes, nbEventsParticipes) ||
                other.nbEventsParticipes == nbEventsParticipes) &&
            const DeepCollectionEquality().equals(other.metadata, metadata));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(
      runtimeType,
      id,
      prenom,
      nom,
      telephone,
      email,
      dateNaissance,
      ville,
      genre,
      bio,
      photoFloueUrl,
      photoNetteUrl,
      role,
      statutParcours,
      dateInscription,
      derniereConnexion,
      isHighTicket,
      nbEventsParticipes,
      const DeepCollectionEquality().hash(metadata));

  @override
  String toString() {
    return 'ProfileModel(id: $id, prenom: $prenom, nom: $nom, telephone: $telephone, email: $email, dateNaissance: $dateNaissance, ville: $ville, genre: $genre, bio: $bio, photoFloueUrl: $photoFloueUrl, photoNetteUrl: $photoNetteUrl, role: $role, statutParcours: $statutParcours, dateInscription: $dateInscription, derniereConnexion: $derniereConnexion, isHighTicket: $isHighTicket, nbEventsParticipes: $nbEventsParticipes, metadata: $metadata)';
  }
}

/// @nodoc
abstract mixin class $ProfileModelCopyWith<$Res> {
  factory $ProfileModelCopyWith(
          ProfileModel value, $Res Function(ProfileModel) _then) =
      _$ProfileModelCopyWithImpl;
  @useResult
  $Res call(
      {String id,
      String prenom,
      String? nom,
      String telephone,
      String? email,
      @JsonKey(name: 'date_naissance') DateTime dateNaissance,
      String ville,
      String genre,
      String? bio,
      @JsonKey(name: 'photo_floue_url') String? photoFloueUrl,
      @JsonKey(name: 'photo_nette_url') String? photoNetteUrl,
      String role,
      @JsonKey(name: 'statut_parcours') String statutParcours,
      @JsonKey(name: 'date_inscription') DateTime dateInscription,
      @JsonKey(name: 'derniere_connexion') DateTime? derniereConnexion,
      @JsonKey(name: 'is_high_ticket') bool isHighTicket,
      @JsonKey(name: 'nb_events_participes') int nbEventsParticipes,
      Map<String, dynamic> metadata});
}

/// @nodoc
class _$ProfileModelCopyWithImpl<$Res> implements $ProfileModelCopyWith<$Res> {
  _$ProfileModelCopyWithImpl(this._self, this._then);

  final ProfileModel _self;
  final $Res Function(ProfileModel) _then;

  /// Create a copy of ProfileModel
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? prenom = null,
    Object? nom = freezed,
    Object? telephone = null,
    Object? email = freezed,
    Object? dateNaissance = null,
    Object? ville = null,
    Object? genre = null,
    Object? bio = freezed,
    Object? photoFloueUrl = freezed,
    Object? photoNetteUrl = freezed,
    Object? role = null,
    Object? statutParcours = null,
    Object? dateInscription = null,
    Object? derniereConnexion = freezed,
    Object? isHighTicket = null,
    Object? nbEventsParticipes = null,
    Object? metadata = null,
  }) {
    return _then(_self.copyWith(
      id: null == id
          ? _self.id
          : id // ignore: cast_nullable_to_non_nullable
              as String,
      prenom: null == prenom
          ? _self.prenom
          : prenom // ignore: cast_nullable_to_non_nullable
              as String,
      nom: freezed == nom
          ? _self.nom
          : nom // ignore: cast_nullable_to_non_nullable
              as String?,
      telephone: null == telephone
          ? _self.telephone
          : telephone // ignore: cast_nullable_to_non_nullable
              as String,
      email: freezed == email
          ? _self.email
          : email // ignore: cast_nullable_to_non_nullable
              as String?,
      dateNaissance: null == dateNaissance
          ? _self.dateNaissance
          : dateNaissance // ignore: cast_nullable_to_non_nullable
              as DateTime,
      ville: null == ville
          ? _self.ville
          : ville // ignore: cast_nullable_to_non_nullable
              as String,
      genre: null == genre
          ? _self.genre
          : genre // ignore: cast_nullable_to_non_nullable
              as String,
      bio: freezed == bio
          ? _self.bio
          : bio // ignore: cast_nullable_to_non_nullable
              as String?,
      photoFloueUrl: freezed == photoFloueUrl
          ? _self.photoFloueUrl
          : photoFloueUrl // ignore: cast_nullable_to_non_nullable
              as String?,
      photoNetteUrl: freezed == photoNetteUrl
          ? _self.photoNetteUrl
          : photoNetteUrl // ignore: cast_nullable_to_non_nullable
              as String?,
      role: null == role
          ? _self.role
          : role // ignore: cast_nullable_to_non_nullable
              as String,
      statutParcours: null == statutParcours
          ? _self.statutParcours
          : statutParcours // ignore: cast_nullable_to_non_nullable
              as String,
      dateInscription: null == dateInscription
          ? _self.dateInscription
          : dateInscription // ignore: cast_nullable_to_non_nullable
              as DateTime,
      derniereConnexion: freezed == derniereConnexion
          ? _self.derniereConnexion
          : derniereConnexion // ignore: cast_nullable_to_non_nullable
              as DateTime?,
      isHighTicket: null == isHighTicket
          ? _self.isHighTicket
          : isHighTicket // ignore: cast_nullable_to_non_nullable
              as bool,
      nbEventsParticipes: null == nbEventsParticipes
          ? _self.nbEventsParticipes
          : nbEventsParticipes // ignore: cast_nullable_to_non_nullable
              as int,
      metadata: null == metadata
          ? _self.metadata
          : metadata // ignore: cast_nullable_to_non_nullable
              as Map<String, dynamic>,
    ));
  }
}

/// Adds pattern-matching-related methods to [ProfileModel].
extension ProfileModelPatterns on ProfileModel {
  /// A variant of `map` that fallback to returning `orElse`.
  ///
  /// It is equivalent to doing:
  /// ```dart
  /// switch (sealedClass) {
  ///   case final Subclass value:
  ///     return ...;
  ///   case _:
  ///     return orElse();
  /// }
  /// ```

  @optionalTypeArgs
  TResult maybeMap<TResult extends Object?>(
    TResult Function(_ProfileModel value)? $default, {
    required TResult orElse(),
  }) {
    final _that = this;
    switch (_that) {
      case _ProfileModel() when $default != null:
        return $default(_that);
      case _:
        return orElse();
    }
  }

  /// A `switch`-like method, using callbacks.
  ///
  /// Callbacks receives the raw object, upcasted.
  /// It is equivalent to doing:
  /// ```dart
  /// switch (sealedClass) {
  ///   case final Subclass value:
  ///     return ...;
  ///   case final Subclass2 value:
  ///     return ...;
  /// }
  /// ```

  @optionalTypeArgs
  TResult map<TResult extends Object?>(
    TResult Function(_ProfileModel value) $default,
  ) {
    final _that = this;
    switch (_that) {
      case _ProfileModel():
        return $default(_that);
    }
  }

  /// A variant of `map` that fallback to returning `null`.
  ///
  /// It is equivalent to doing:
  /// ```dart
  /// switch (sealedClass) {
  ///   case final Subclass value:
  ///     return ...;
  ///   case _:
  ///     return null;
  /// }
  /// ```

  @optionalTypeArgs
  TResult? mapOrNull<TResult extends Object?>(
    TResult? Function(_ProfileModel value)? $default,
  ) {
    final _that = this;
    switch (_that) {
      case _ProfileModel() when $default != null:
        return $default(_that);
      case _:
        return null;
    }
  }

  /// A variant of `when` that fallback to an `orElse` callback.
  ///
  /// It is equivalent to doing:
  /// ```dart
  /// switch (sealedClass) {
  ///   case Subclass(:final field):
  ///     return ...;
  ///   case _:
  ///     return orElse();
  /// }
  /// ```

  @optionalTypeArgs
  TResult maybeWhen<TResult extends Object?>(
    TResult Function(
            String id,
            String prenom,
            String? nom,
            String telephone,
            String? email,
            @JsonKey(name: 'date_naissance') DateTime dateNaissance,
            String ville,
            String genre,
            String? bio,
            @JsonKey(name: 'photo_floue_url') String? photoFloueUrl,
            @JsonKey(name: 'photo_nette_url') String? photoNetteUrl,
            String role,
            @JsonKey(name: 'statut_parcours') String statutParcours,
            @JsonKey(name: 'date_inscription') DateTime dateInscription,
            @JsonKey(name: 'derniere_connexion') DateTime? derniereConnexion,
            @JsonKey(name: 'is_high_ticket') bool isHighTicket,
            @JsonKey(name: 'nb_events_participes') int nbEventsParticipes,
            Map<String, dynamic> metadata)?
        $default, {
    required TResult orElse(),
  }) {
    final _that = this;
    switch (_that) {
      case _ProfileModel() when $default != null:
        return $default(
            _that.id,
            _that.prenom,
            _that.nom,
            _that.telephone,
            _that.email,
            _that.dateNaissance,
            _that.ville,
            _that.genre,
            _that.bio,
            _that.photoFloueUrl,
            _that.photoNetteUrl,
            _that.role,
            _that.statutParcours,
            _that.dateInscription,
            _that.derniereConnexion,
            _that.isHighTicket,
            _that.nbEventsParticipes,
            _that.metadata);
      case _:
        return orElse();
    }
  }

  /// A `switch`-like method, using callbacks.
  ///
  /// As opposed to `map`, this offers destructuring.
  /// It is equivalent to doing:
  /// ```dart
  /// switch (sealedClass) {
  ///   case Subclass(:final field):
  ///     return ...;
  ///   case Subclass2(:final field2):
  ///     return ...;
  /// }
  /// ```

  @optionalTypeArgs
  TResult when<TResult extends Object?>(
    TResult Function(
            String id,
            String prenom,
            String? nom,
            String telephone,
            String? email,
            @JsonKey(name: 'date_naissance') DateTime dateNaissance,
            String ville,
            String genre,
            String? bio,
            @JsonKey(name: 'photo_floue_url') String? photoFloueUrl,
            @JsonKey(name: 'photo_nette_url') String? photoNetteUrl,
            String role,
            @JsonKey(name: 'statut_parcours') String statutParcours,
            @JsonKey(name: 'date_inscription') DateTime dateInscription,
            @JsonKey(name: 'derniere_connexion') DateTime? derniereConnexion,
            @JsonKey(name: 'is_high_ticket') bool isHighTicket,
            @JsonKey(name: 'nb_events_participes') int nbEventsParticipes,
            Map<String, dynamic> metadata)
        $default,
  ) {
    final _that = this;
    switch (_that) {
      case _ProfileModel():
        return $default(
            _that.id,
            _that.prenom,
            _that.nom,
            _that.telephone,
            _that.email,
            _that.dateNaissance,
            _that.ville,
            _that.genre,
            _that.bio,
            _that.photoFloueUrl,
            _that.photoNetteUrl,
            _that.role,
            _that.statutParcours,
            _that.dateInscription,
            _that.derniereConnexion,
            _that.isHighTicket,
            _that.nbEventsParticipes,
            _that.metadata);
    }
  }

  /// A variant of `when` that fallback to returning `null`
  ///
  /// It is equivalent to doing:
  /// ```dart
  /// switch (sealedClass) {
  ///   case Subclass(:final field):
  ///     return ...;
  ///   case _:
  ///     return null;
  /// }
  /// ```

  @optionalTypeArgs
  TResult? whenOrNull<TResult extends Object?>(
    TResult? Function(
            String id,
            String prenom,
            String? nom,
            String telephone,
            String? email,
            @JsonKey(name: 'date_naissance') DateTime dateNaissance,
            String ville,
            String genre,
            String? bio,
            @JsonKey(name: 'photo_floue_url') String? photoFloueUrl,
            @JsonKey(name: 'photo_nette_url') String? photoNetteUrl,
            String role,
            @JsonKey(name: 'statut_parcours') String statutParcours,
            @JsonKey(name: 'date_inscription') DateTime dateInscription,
            @JsonKey(name: 'derniere_connexion') DateTime? derniereConnexion,
            @JsonKey(name: 'is_high_ticket') bool isHighTicket,
            @JsonKey(name: 'nb_events_participes') int nbEventsParticipes,
            Map<String, dynamic> metadata)?
        $default,
  ) {
    final _that = this;
    switch (_that) {
      case _ProfileModel() when $default != null:
        return $default(
            _that.id,
            _that.prenom,
            _that.nom,
            _that.telephone,
            _that.email,
            _that.dateNaissance,
            _that.ville,
            _that.genre,
            _that.bio,
            _that.photoFloueUrl,
            _that.photoNetteUrl,
            _that.role,
            _that.statutParcours,
            _that.dateInscription,
            _that.derniereConnexion,
            _that.isHighTicket,
            _that.nbEventsParticipes,
            _that.metadata);
      case _:
        return null;
    }
  }
}

/// @nodoc
@JsonSerializable()
class _ProfileModel extends ProfileModel {
  const _ProfileModel(
      {required this.id,
      required this.prenom,
      this.nom,
      required this.telephone,
      this.email,
      @JsonKey(name: 'date_naissance') required this.dateNaissance,
      required this.ville,
      required this.genre,
      this.bio,
      @JsonKey(name: 'photo_floue_url') this.photoFloueUrl,
      @JsonKey(name: 'photo_nette_url') this.photoNetteUrl,
      this.role = 'participant',
      @JsonKey(name: 'statut_parcours') this.statutParcours = 'inscription',
      @JsonKey(name: 'date_inscription') required this.dateInscription,
      @JsonKey(name: 'derniere_connexion') this.derniereConnexion,
      @JsonKey(name: 'is_high_ticket') this.isHighTicket = false,
      @JsonKey(name: 'nb_events_participes') this.nbEventsParticipes = 0,
      final Map<String, dynamic> metadata = const {}})
      : _metadata = metadata,
        super._();
  factory _ProfileModel.fromJson(Map<String, dynamic> json) =>
      _$ProfileModelFromJson(json);

  @override
  final String id;
  @override
  final String prenom;
  @override
  final String? nom;
  @override
  final String telephone;
  @override
  final String? email;
  @override
  @JsonKey(name: 'date_naissance')
  final DateTime dateNaissance;
  @override
  final String ville;
  @override
  final String genre;
  @override
  final String? bio;
  @override
  @JsonKey(name: 'photo_floue_url')
  final String? photoFloueUrl;
  @override
  @JsonKey(name: 'photo_nette_url')
  final String? photoNetteUrl;
  @override
  @JsonKey()
  final String role;
  @override
  @JsonKey(name: 'statut_parcours')
  final String statutParcours;
  @override
  @JsonKey(name: 'date_inscription')
  final DateTime dateInscription;
  @override
  @JsonKey(name: 'derniere_connexion')
  final DateTime? derniereConnexion;
  @override
  @JsonKey(name: 'is_high_ticket')
  final bool isHighTicket;
  @override
  @JsonKey(name: 'nb_events_participes')
  final int nbEventsParticipes;
  final Map<String, dynamic> _metadata;
  @override
  @JsonKey()
  Map<String, dynamic> get metadata {
    if (_metadata is EqualUnmodifiableMapView) return _metadata;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableMapView(_metadata);
  }

  /// Create a copy of ProfileModel
  /// with the given fields replaced by the non-null parameter values.
  @override
  @JsonKey(includeFromJson: false, includeToJson: false)
  @pragma('vm:prefer-inline')
  _$ProfileModelCopyWith<_ProfileModel> get copyWith =>
      __$ProfileModelCopyWithImpl<_ProfileModel>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$ProfileModelToJson(
      this,
    );
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _ProfileModel &&
            (identical(other.id, id) || other.id == id) &&
            (identical(other.prenom, prenom) || other.prenom == prenom) &&
            (identical(other.nom, nom) || other.nom == nom) &&
            (identical(other.telephone, telephone) ||
                other.telephone == telephone) &&
            (identical(other.email, email) || other.email == email) &&
            (identical(other.dateNaissance, dateNaissance) ||
                other.dateNaissance == dateNaissance) &&
            (identical(other.ville, ville) || other.ville == ville) &&
            (identical(other.genre, genre) || other.genre == genre) &&
            (identical(other.bio, bio) || other.bio == bio) &&
            (identical(other.photoFloueUrl, photoFloueUrl) ||
                other.photoFloueUrl == photoFloueUrl) &&
            (identical(other.photoNetteUrl, photoNetteUrl) ||
                other.photoNetteUrl == photoNetteUrl) &&
            (identical(other.role, role) || other.role == role) &&
            (identical(other.statutParcours, statutParcours) ||
                other.statutParcours == statutParcours) &&
            (identical(other.dateInscription, dateInscription) ||
                other.dateInscription == dateInscription) &&
            (identical(other.derniereConnexion, derniereConnexion) ||
                other.derniereConnexion == derniereConnexion) &&
            (identical(other.isHighTicket, isHighTicket) ||
                other.isHighTicket == isHighTicket) &&
            (identical(other.nbEventsParticipes, nbEventsParticipes) ||
                other.nbEventsParticipes == nbEventsParticipes) &&
            const DeepCollectionEquality().equals(other._metadata, _metadata));
  }

  @JsonKey(includeFromJson: false, includeToJson: false)
  @override
  int get hashCode => Object.hash(
      runtimeType,
      id,
      prenom,
      nom,
      telephone,
      email,
      dateNaissance,
      ville,
      genre,
      bio,
      photoFloueUrl,
      photoNetteUrl,
      role,
      statutParcours,
      dateInscription,
      derniereConnexion,
      isHighTicket,
      nbEventsParticipes,
      const DeepCollectionEquality().hash(_metadata));

  @override
  String toString() {
    return 'ProfileModel(id: $id, prenom: $prenom, nom: $nom, telephone: $telephone, email: $email, dateNaissance: $dateNaissance, ville: $ville, genre: $genre, bio: $bio, photoFloueUrl: $photoFloueUrl, photoNetteUrl: $photoNetteUrl, role: $role, statutParcours: $statutParcours, dateInscription: $dateInscription, derniereConnexion: $derniereConnexion, isHighTicket: $isHighTicket, nbEventsParticipes: $nbEventsParticipes, metadata: $metadata)';
  }
}

/// @nodoc
abstract mixin class _$ProfileModelCopyWith<$Res>
    implements $ProfileModelCopyWith<$Res> {
  factory _$ProfileModelCopyWith(
          _ProfileModel value, $Res Function(_ProfileModel) _then) =
      __$ProfileModelCopyWithImpl;
  @override
  @useResult
  $Res call(
      {String id,
      String prenom,
      String? nom,
      String telephone,
      String? email,
      @JsonKey(name: 'date_naissance') DateTime dateNaissance,
      String ville,
      String genre,
      String? bio,
      @JsonKey(name: 'photo_floue_url') String? photoFloueUrl,
      @JsonKey(name: 'photo_nette_url') String? photoNetteUrl,
      String role,
      @JsonKey(name: 'statut_parcours') String statutParcours,
      @JsonKey(name: 'date_inscription') DateTime dateInscription,
      @JsonKey(name: 'derniere_connexion') DateTime? derniereConnexion,
      @JsonKey(name: 'is_high_ticket') bool isHighTicket,
      @JsonKey(name: 'nb_events_participes') int nbEventsParticipes,
      Map<String, dynamic> metadata});
}

/// @nodoc
class __$ProfileModelCopyWithImpl<$Res>
    implements _$ProfileModelCopyWith<$Res> {
  __$ProfileModelCopyWithImpl(this._self, this._then);

  final _ProfileModel _self;
  final $Res Function(_ProfileModel) _then;

  /// Create a copy of ProfileModel
  /// with the given fields replaced by the non-null parameter values.
  @override
  @pragma('vm:prefer-inline')
  $Res call({
    Object? id = null,
    Object? prenom = null,
    Object? nom = freezed,
    Object? telephone = null,
    Object? email = freezed,
    Object? dateNaissance = null,
    Object? ville = null,
    Object? genre = null,
    Object? bio = freezed,
    Object? photoFloueUrl = freezed,
    Object? photoNetteUrl = freezed,
    Object? role = null,
    Object? statutParcours = null,
    Object? dateInscription = null,
    Object? derniereConnexion = freezed,
    Object? isHighTicket = null,
    Object? nbEventsParticipes = null,
    Object? metadata = null,
  }) {
    return _then(_ProfileModel(
      id: null == id
          ? _self.id
          : id // ignore: cast_nullable_to_non_nullable
              as String,
      prenom: null == prenom
          ? _self.prenom
          : prenom // ignore: cast_nullable_to_non_nullable
              as String,
      nom: freezed == nom
          ? _self.nom
          : nom // ignore: cast_nullable_to_non_nullable
              as String?,
      telephone: null == telephone
          ? _self.telephone
          : telephone // ignore: cast_nullable_to_non_nullable
              as String,
      email: freezed == email
          ? _self.email
          : email // ignore: cast_nullable_to_non_nullable
              as String?,
      dateNaissance: null == dateNaissance
          ? _self.dateNaissance
          : dateNaissance // ignore: cast_nullable_to_non_nullable
              as DateTime,
      ville: null == ville
          ? _self.ville
          : ville // ignore: cast_nullable_to_non_nullable
              as String,
      genre: null == genre
          ? _self.genre
          : genre // ignore: cast_nullable_to_non_nullable
              as String,
      bio: freezed == bio
          ? _self.bio
          : bio // ignore: cast_nullable_to_non_nullable
              as String?,
      photoFloueUrl: freezed == photoFloueUrl
          ? _self.photoFloueUrl
          : photoFloueUrl // ignore: cast_nullable_to_non_nullable
              as String?,
      photoNetteUrl: freezed == photoNetteUrl
          ? _self.photoNetteUrl
          : photoNetteUrl // ignore: cast_nullable_to_non_nullable
              as String?,
      role: null == role
          ? _self.role
          : role // ignore: cast_nullable_to_non_nullable
              as String,
      statutParcours: null == statutParcours
          ? _self.statutParcours
          : statutParcours // ignore: cast_nullable_to_non_nullable
              as String,
      dateInscription: null == dateInscription
          ? _self.dateInscription
          : dateInscription // ignore: cast_nullable_to_non_nullable
              as DateTime,
      derniereConnexion: freezed == derniereConnexion
          ? _self.derniereConnexion
          : derniereConnexion // ignore: cast_nullable_to_non_nullable
              as DateTime?,
      isHighTicket: null == isHighTicket
          ? _self.isHighTicket
          : isHighTicket // ignore: cast_nullable_to_non_nullable
              as bool,
      nbEventsParticipes: null == nbEventsParticipes
          ? _self.nbEventsParticipes
          : nbEventsParticipes // ignore: cast_nullable_to_non_nullable
              as int,
      metadata: null == metadata
          ? _self._metadata
          : metadata // ignore: cast_nullable_to_non_nullable
              as Map<String, dynamic>,
    ));
  }
}

// dart format on
