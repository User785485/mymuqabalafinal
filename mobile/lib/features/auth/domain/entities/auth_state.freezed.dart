// GENERATED CODE - DO NOT MODIFY BY HAND
// coverage:ignore-file
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'auth_state.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

// dart format off
T _$identity<T>(T value) => value;

/// @nodoc
mixin _$AppAuthState {
  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType && other is AppAuthState);
  }

  @override
  int get hashCode => runtimeType.hashCode;

  @override
  String toString() {
    return 'AppAuthState()';
  }
}

/// @nodoc
class $AppAuthStateCopyWith<$Res> {
  $AppAuthStateCopyWith(AppAuthState _, $Res Function(AppAuthState) __);
}

/// Adds pattern-matching-related methods to [AppAuthState].
extension AppAuthStatePatterns on AppAuthState {
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
  TResult maybeMap<TResult extends Object?>({
    TResult Function(AppAuthInitial value)? initial,
    TResult Function(AppAuthLoading value)? loading,
    TResult Function(AppAuthAuthenticated value)? authenticated,
    TResult Function(AppAuthUnauthenticated value)? unauthenticated,
    TResult Function(AppAuthError value)? error,
    required TResult orElse(),
  }) {
    final _that = this;
    switch (_that) {
      case AppAuthInitial() when initial != null:
        return initial(_that);
      case AppAuthLoading() when loading != null:
        return loading(_that);
      case AppAuthAuthenticated() when authenticated != null:
        return authenticated(_that);
      case AppAuthUnauthenticated() when unauthenticated != null:
        return unauthenticated(_that);
      case AppAuthError() when error != null:
        return error(_that);
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
  TResult map<TResult extends Object?>({
    required TResult Function(AppAuthInitial value) initial,
    required TResult Function(AppAuthLoading value) loading,
    required TResult Function(AppAuthAuthenticated value) authenticated,
    required TResult Function(AppAuthUnauthenticated value) unauthenticated,
    required TResult Function(AppAuthError value) error,
  }) {
    final _that = this;
    switch (_that) {
      case AppAuthInitial():
        return initial(_that);
      case AppAuthLoading():
        return loading(_that);
      case AppAuthAuthenticated():
        return authenticated(_that);
      case AppAuthUnauthenticated():
        return unauthenticated(_that);
      case AppAuthError():
        return error(_that);
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
  TResult? mapOrNull<TResult extends Object?>({
    TResult? Function(AppAuthInitial value)? initial,
    TResult? Function(AppAuthLoading value)? loading,
    TResult? Function(AppAuthAuthenticated value)? authenticated,
    TResult? Function(AppAuthUnauthenticated value)? unauthenticated,
    TResult? Function(AppAuthError value)? error,
  }) {
    final _that = this;
    switch (_that) {
      case AppAuthInitial() when initial != null:
        return initial(_that);
      case AppAuthLoading() when loading != null:
        return loading(_that);
      case AppAuthAuthenticated() when authenticated != null:
        return authenticated(_that);
      case AppAuthUnauthenticated() when unauthenticated != null:
        return unauthenticated(_that);
      case AppAuthError() when error != null:
        return error(_that);
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
  TResult maybeWhen<TResult extends Object?>({
    TResult Function()? initial,
    TResult Function()? loading,
    TResult Function(UserModel user)? authenticated,
    TResult Function()? unauthenticated,
    TResult Function(String message)? error,
    required TResult orElse(),
  }) {
    final _that = this;
    switch (_that) {
      case AppAuthInitial() when initial != null:
        return initial();
      case AppAuthLoading() when loading != null:
        return loading();
      case AppAuthAuthenticated() when authenticated != null:
        return authenticated(_that.user);
      case AppAuthUnauthenticated() when unauthenticated != null:
        return unauthenticated();
      case AppAuthError() when error != null:
        return error(_that.message);
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
  TResult when<TResult extends Object?>({
    required TResult Function() initial,
    required TResult Function() loading,
    required TResult Function(UserModel user) authenticated,
    required TResult Function() unauthenticated,
    required TResult Function(String message) error,
  }) {
    final _that = this;
    switch (_that) {
      case AppAuthInitial():
        return initial();
      case AppAuthLoading():
        return loading();
      case AppAuthAuthenticated():
        return authenticated(_that.user);
      case AppAuthUnauthenticated():
        return unauthenticated();
      case AppAuthError():
        return error(_that.message);
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
  TResult? whenOrNull<TResult extends Object?>({
    TResult? Function()? initial,
    TResult? Function()? loading,
    TResult? Function(UserModel user)? authenticated,
    TResult? Function()? unauthenticated,
    TResult? Function(String message)? error,
  }) {
    final _that = this;
    switch (_that) {
      case AppAuthInitial() when initial != null:
        return initial();
      case AppAuthLoading() when loading != null:
        return loading();
      case AppAuthAuthenticated() when authenticated != null:
        return authenticated(_that.user);
      case AppAuthUnauthenticated() when unauthenticated != null:
        return unauthenticated();
      case AppAuthError() when error != null:
        return error(_that.message);
      case _:
        return null;
    }
  }
}

/// @nodoc

class AppAuthInitial implements AppAuthState {
  const AppAuthInitial();

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType && other is AppAuthInitial);
  }

  @override
  int get hashCode => runtimeType.hashCode;

  @override
  String toString() {
    return 'AppAuthState.initial()';
  }
}

/// @nodoc

class AppAuthLoading implements AppAuthState {
  const AppAuthLoading();

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType && other is AppAuthLoading);
  }

  @override
  int get hashCode => runtimeType.hashCode;

  @override
  String toString() {
    return 'AppAuthState.loading()';
  }
}

/// @nodoc

class AppAuthAuthenticated implements AppAuthState {
  const AppAuthAuthenticated(this.user);

  final UserModel user;

  /// Create a copy of AppAuthState
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @pragma('vm:prefer-inline')
  $AppAuthAuthenticatedCopyWith<AppAuthAuthenticated> get copyWith =>
      _$AppAuthAuthenticatedCopyWithImpl<AppAuthAuthenticated>(
          this, _$identity);

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is AppAuthAuthenticated &&
            (identical(other.user, user) || other.user == user));
  }

  @override
  int get hashCode => Object.hash(runtimeType, user);

  @override
  String toString() {
    return 'AppAuthState.authenticated(user: $user)';
  }
}

/// @nodoc
abstract mixin class $AppAuthAuthenticatedCopyWith<$Res>
    implements $AppAuthStateCopyWith<$Res> {
  factory $AppAuthAuthenticatedCopyWith(AppAuthAuthenticated value,
          $Res Function(AppAuthAuthenticated) _then) =
      _$AppAuthAuthenticatedCopyWithImpl;
  @useResult
  $Res call({UserModel user});

  $UserModelCopyWith<$Res> get user;
}

/// @nodoc
class _$AppAuthAuthenticatedCopyWithImpl<$Res>
    implements $AppAuthAuthenticatedCopyWith<$Res> {
  _$AppAuthAuthenticatedCopyWithImpl(this._self, this._then);

  final AppAuthAuthenticated _self;
  final $Res Function(AppAuthAuthenticated) _then;

  /// Create a copy of AppAuthState
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  $Res call({
    Object? user = null,
  }) {
    return _then(AppAuthAuthenticated(
      null == user
          ? _self.user
          : user // ignore: cast_nullable_to_non_nullable
              as UserModel,
    ));
  }

  /// Create a copy of AppAuthState
  /// with the given fields replaced by the non-null parameter values.
  @override
  @pragma('vm:prefer-inline')
  $UserModelCopyWith<$Res> get user {
    return $UserModelCopyWith<$Res>(_self.user, (value) {
      return _then(_self.copyWith(user: value));
    });
  }
}

/// @nodoc

class AppAuthUnauthenticated implements AppAuthState {
  const AppAuthUnauthenticated();

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType && other is AppAuthUnauthenticated);
  }

  @override
  int get hashCode => runtimeType.hashCode;

  @override
  String toString() {
    return 'AppAuthState.unauthenticated()';
  }
}

/// @nodoc

class AppAuthError implements AppAuthState {
  const AppAuthError(this.message);

  final String message;

  /// Create a copy of AppAuthState
  /// with the given fields replaced by the non-null parameter values.
  @JsonKey(includeFromJson: false, includeToJson: false)
  @pragma('vm:prefer-inline')
  $AppAuthErrorCopyWith<AppAuthError> get copyWith =>
      _$AppAuthErrorCopyWithImpl<AppAuthError>(this, _$identity);

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is AppAuthError &&
            (identical(other.message, message) || other.message == message));
  }

  @override
  int get hashCode => Object.hash(runtimeType, message);

  @override
  String toString() {
    return 'AppAuthState.error(message: $message)';
  }
}

/// @nodoc
abstract mixin class $AppAuthErrorCopyWith<$Res>
    implements $AppAuthStateCopyWith<$Res> {
  factory $AppAuthErrorCopyWith(
          AppAuthError value, $Res Function(AppAuthError) _then) =
      _$AppAuthErrorCopyWithImpl;
  @useResult
  $Res call({String message});
}

/// @nodoc
class _$AppAuthErrorCopyWithImpl<$Res> implements $AppAuthErrorCopyWith<$Res> {
  _$AppAuthErrorCopyWithImpl(this._self, this._then);

  final AppAuthError _self;
  final $Res Function(AppAuthError) _then;

  /// Create a copy of AppAuthState
  /// with the given fields replaced by the non-null parameter values.
  @pragma('vm:prefer-inline')
  $Res call({
    Object? message = null,
  }) {
    return _then(AppAuthError(
      null == message
          ? _self.message
          : message // ignore: cast_nullable_to_non_nullable
              as String,
    ));
  }
}

// dart format on
