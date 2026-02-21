import 'package:freezed_annotation/freezed_annotation.dart';

import '../../data/models/user_model.dart';

part 'auth_state.freezed.dart';

@freezed
sealed class AppAuthState with _$AppAuthState {
  const factory AppAuthState.initial() = AppAuthInitial;
  const factory AppAuthState.loading() = AppAuthLoading;
  const factory AppAuthState.authenticated(UserModel user) = AppAuthAuthenticated;
  const factory AppAuthState.unauthenticated() = AppAuthUnauthenticated;
  const factory AppAuthState.error(String message) = AppAuthError;
}
