import 'package:local_auth/local_auth.dart';

class BiometricAuth {
  static final _auth = LocalAuthentication();

  static Future<bool> isAvailable() async {
    final canCheck = await _auth.canCheckBiometrics;
    final isDeviceSupported = await _auth.isDeviceSupported();
    return canCheck && isDeviceSupported;
  }

  static Future<List<BiometricType>> getAvailableBiometrics() async {
    return _auth.getAvailableBiometrics();
  }

  static Future<bool> authenticate(
      {String reason = 'Veuillez vous authentifier'}) async {
    return _auth.authenticate(
      localizedReason: reason,
      options: const AuthenticationOptions(
        stickyAuth: true,
        biometricOnly: false,
      ),
    );
  }
}
