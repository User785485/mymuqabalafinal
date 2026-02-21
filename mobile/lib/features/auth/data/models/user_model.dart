import 'package:freezed_annotation/freezed_annotation.dart';

part 'user_model.freezed.dart';
part 'user_model.g.dart';

/// Domain model representing an authenticated user.
///
/// Maps to the `profiles` table in Supabase. The [id] matches
/// `auth.uid()` and [phone] is the E.164 number used for OTP sign-in.
@freezed
sealed class UserModel with _$UserModel {
  const factory UserModel({
    required String id,
    required String phone,
    String? email,
    @Default('participant') String role,
  }) = _UserModel;

  factory UserModel.fromJson(Map<String, dynamic> json) =>
      _$UserModelFromJson(json);
}
