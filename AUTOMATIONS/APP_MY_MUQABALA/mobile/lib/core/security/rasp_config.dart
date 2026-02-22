import 'package:freerasp/freerasp.dart';

class RaspConfig {
  static TalsecConfig get config => TalsecConfig(
        androidConfig: AndroidConfig(
          packageName: 'com.mymuqabala.my_muqabala',
          signingCertHashes: ['YOUR_SIGNING_HASH_HERE'], // PLACEHOLDER
          supportedStores: ['com.sec.android.app.samsungapps'],
        ),
        iosConfig: IOSConfig(
          bundleIds: ['com.mymuqabala.myMuqabala'],
          teamId: 'YOUR_TEAM_ID_HERE', // PLACEHOLDER
        ),
        watcherMail: 'security@mymuqabala.fr',
      );

  static Future<void> initialize() async {
    // Set up threat callbacks
    final callback = ThreatCallback(
      onAppIntegrity: () => _handleThreat('App integrity compromised'),
      onObfuscationIssues: () => _handleThreat('Obfuscation issues detected'),
      onDebug: () => _handleThreat('Debug mode detected'),
      onDeviceBinding: () => _handleThreat('Device binding failed'),
      onDeviceID: () => _handleThreat('Device ID issue'),
      onHooks: () => _handleThreat('Hooks detected'),
      onPasscode: () => _handleThreat('No passcode set'),
      onPrivilegedAccess: () => _handleThreat('Rooted/jailbroken device'),
      onSecureHardwareNotAvailable: () =>
          _handleThreat('Secure hardware unavailable'),
      onSimulator: () => _handleThreat('Running on simulator'),
      onUnofficialStore: () =>
          _handleThreat('Installed from unofficial store'),
    );

    Talsec.instance.attachListener(callback);
    await Talsec.instance.start(config);
  }

  static void _handleThreat(String threat) {
    // Log to Sentry, optionally show warning
  }
}
