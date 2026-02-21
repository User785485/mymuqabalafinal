import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import 'package:my_muqabala/core/constants/app_colors.dart';
import 'package:my_muqabala/core/constants/app_spacing.dart';
import 'package:my_muqabala/core/constants/app_typography.dart';
import 'package:my_muqabala/core/utils/date_utils.dart';
import 'package:my_muqabala/features/profile/data/models/profile_model.dart';
import 'package:my_muqabala/features/profile/presentation/providers/profile_provider.dart';
import 'package:my_muqabala/features/profile/presentation/screens/edit_profile_screen.dart';
import 'package:my_muqabala/features/profile/presentation/widgets/profile_header.dart';
import 'package:my_muqabala/features/profile/presentation/widgets/settings_tile.dart';

/// Main profile screen.
///
/// Sections:
/// 1. Header (avatar, name, status, city)
/// 2. Informations card (prenom, telephone, email, ville, date_naissance)
/// 3. Preferences card (notifications, biometric, dark mode toggles)
/// 4. Compte card (edit, help, sign out, delete)
class ProfileScreen extends ConsumerStatefulWidget {
  const ProfileScreen({super.key});

  @override
  ConsumerState<ProfileScreen> createState() => _ProfileScreenState();
}

class _ProfileScreenState extends ConsumerState<ProfileScreen> {
  // ── Local toggle states (persisted via SharedPreferences in a real app) ──
  bool _notificationsEnabled = true;
  bool _biometricEnabled = false;
  bool _darkModeEnabled = false;

  @override
  Widget build(BuildContext context) {
    final profileAsync = ref.watch(currentProfileProvider);

    return Scaffold(
      backgroundColor: AppColors.paper,
      appBar: AppBar(
        title: const Text('Mon profil'),
        actions: [
          profileAsync.maybeWhen(
            data: (profile) {
              if (profile == null) return const SizedBox.shrink();
              return IconButton(
                icon: const Icon(Icons.edit_outlined),
                tooltip: 'Modifier',
                onPressed: () => _navigateToEdit(profile),
              );
            },
            orElse: () => const SizedBox.shrink(),
          ),
        ],
      ),
      body: RefreshIndicator(
        color: AppColors.purple,
        backgroundColor: Colors.white,
        onRefresh: () async {
          ref.invalidate(currentProfileProvider);
          // Wait for the new data to arrive
          await ref.read(currentProfileProvider.future);
        },
        child: profileAsync.when(
          loading: () => const _ProfileShimmer(),
          error: (error, _) => _ErrorView(
            message: error.toString(),
            onRetry: () => ref.invalidate(currentProfileProvider),
          ),
          data: (profile) {
            if (profile == null) {
              return const _ErrorView(
                message: 'Profil introuvable. Veuillez vous reconnecter.',
              );
            }
            return _buildContent(context, profile);
          },
        ),
      ),
    );
  }

  Widget _buildContent(BuildContext context, ProfileModel profile) {
    return ListView(
      physics: const AlwaysScrollableScrollPhysics(),
      padding: const EdgeInsets.symmetric(horizontal: AppSpacing.md),
      children: [
        // ── Header ──────────────────────────────────────────────────
        ProfileHeader(
          profile: profile,
          onTapAvatar: () => _navigateToEdit(profile),
        ),

        // ── Section 1: Informations ─────────────────────────────────
        _SectionTitle(title: 'Informations'),
        AppSpacing.gapSm,
        _InfoCard(profile: profile),

        AppSpacing.gapLg,

        // ── Section 2: Preferences ──────────────────────────────────
        _SectionTitle(title: 'Préférences'),
        AppSpacing.gapSm,
        _buildPreferencesCard(),

        AppSpacing.gapLg,

        // ── Section 3: Compte ───────────────────────────────────────
        _SectionTitle(title: 'Compte'),
        AppSpacing.gapSm,
        _buildAccountCard(profile),

        // Bottom padding for safe area
        SizedBox(height: MediaQuery.of(context).padding.bottom + 32),
      ],
    );
  }

  // ── Preferences card ──────────────────────────────────────────────────

  Widget _buildPreferencesCard() {
    return _CardContainer(
      child: Column(
        children: [
          SettingsTile(
            icon: Icons.notifications_outlined,
            title: 'Notifications',
            subtitle: _notificationsEnabled ? 'Activées' : 'Désactivées',
            trailing: Switch.adaptive(
              value: _notificationsEnabled,
              onChanged: (value) {
                setState(() => _notificationsEnabled = value);
              },
            ),
          ),
          const _TileDivider(),
          SettingsTile(
            icon: Icons.fingerprint_rounded,
            title: 'Authentification biométrique',
            subtitle: _biometricEnabled
                ? 'Face ID / Empreinte activée'
                : 'Désactivée',
            trailing: Switch.adaptive(
              value: _biometricEnabled,
              onChanged: (value) {
                setState(() => _biometricEnabled = value);
              },
            ),
          ),
          const _TileDivider(),
          SettingsTile(
            icon: Icons.dark_mode_outlined,
            title: 'Mode sombre',
            subtitle: _darkModeEnabled ? 'Activé' : 'Désactivé',
            trailing: Switch.adaptive(
              value: _darkModeEnabled,
              onChanged: (value) {
                setState(() => _darkModeEnabled = value);
              },
            ),
          ),
        ],
      ),
    );
  }

  // ── Account card ──────────────────────────────────────────────────────

  Widget _buildAccountCard(ProfileModel profile) {
    return _CardContainer(
      child: Column(
        children: [
          SettingsTile(
            icon: Icons.person_outline_rounded,
            title: 'Modifier le profil',
            onTap: () => _navigateToEdit(profile),
          ),
          const _TileDivider(),
          SettingsTile(
            icon: Icons.help_outline_rounded,
            title: 'Aide & Contact',
            subtitle: 'Questions, assistance',
            onTap: () {
              _showSnackBar('La page d\'aide sera bientôt disponible.');
            },
          ),
          const _TileDivider(),
          SettingsTile(
            icon: Icons.logout_rounded,
            title: 'Déconnexion',
            isDestructive: true,
            onTap: () => _confirmSignOut(),
          ),
          const _TileDivider(),
          SettingsTile(
            icon: Icons.delete_outline_rounded,
            title: 'Supprimer mon compte',
            subtitle: 'Action irréversible',
            isDestructive: true,
            onTap: () => _confirmDeleteAccount(profile.id),
          ),
        ],
      ),
    );
  }

  // ── Navigation ────────────────────────────────────────────────────────

  void _navigateToEdit(ProfileModel profile) {
    Navigator.of(context).push(
      MaterialPageRoute<void>(
        builder: (_) => EditProfileScreen(profile: profile),
      ),
    );
  }

  // ── Sign out confirmation ─────────────────────────────────────────────

  Future<void> _confirmSignOut() async {
    final confirmed = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text('Déconnexion'),
        content: const Text(
          'Êtes-vous sûr de vouloir vous déconnecter ?',
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(ctx).pop(false),
            child: const Text('Annuler'),
          ),
          ElevatedButton(
            onPressed: () => Navigator.of(ctx).pop(true),
            style: ElevatedButton.styleFrom(
              backgroundColor: AppColors.error,
            ),
            child: const Text('Déconnexion'),
          ),
        ],
      ),
    );

    if (confirmed == true && mounted) {
      await ref.read(signOutProvider.future);
      // Navigation to login screen should be handled by the auth state
      // listener in the app's router.
    }
  }

  // ── Delete account confirmation ───────────────────────────────────────

  Future<void> _confirmDeleteAccount(String userId) async {
    final confirmed = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text('Supprimer le compte'),
        content: const Text(
          'Cette action est irréversible. Toutes vos données '
          'seront supprimées. Êtes-vous sûr ?',
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(ctx).pop(false),
            child: const Text('Annuler'),
          ),
          ElevatedButton(
            onPressed: () => Navigator.of(ctx).pop(true),
            style: ElevatedButton.styleFrom(
              backgroundColor: AppColors.error,
            ),
            child: const Text('Supprimer'),
          ),
        ],
      ),
    );

    if (confirmed == true && mounted) {
      final success =
          await ref.read(deleteAccountProvider(userId).future);
      if (success && mounted) {
        _showSnackBar('Votre compte a été désactivé.');
      }
    }
  }

  void _showSnackBar(String message) {
    if (!mounted) return;
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text(message)),
    );
  }
}

// ═══════════════════════════════════════════════════════════════════════
//  Private helper widgets
// ═══════════════════════════════════════════════════════════════════════

/// Section title in Cormorant font.
class _SectionTitle extends StatelessWidget {
  const _SectionTitle({required this.title});
  final String title;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(left: 4),
      child: Text(
        title,
        style: AppTypography.displaySmall.copyWith(
          color: AppColors.ink,
        ),
      ),
    );
  }
}

/// Rounded card container with divider border.
class _CardContainer extends StatelessWidget {
  const _CardContainer({required this.child});
  final Widget child;

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: AppRadius.borderLg,
        border: Border.all(color: AppColors.divider, width: 1),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.03),
            blurRadius: 10,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      clipBehavior: Clip.antiAlias,
      child: child,
    );
  }
}

/// Thin divider between settings tiles.
class _TileDivider extends StatelessWidget {
  const _TileDivider();

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(left: 72),
      child: Divider(
        height: 1,
        thickness: 1,
        color: AppColors.divider,
      ),
    );
  }
}

/// Information card showing profile details in a labeled grid.
class _InfoCard extends StatelessWidget {
  const _InfoCard({required this.profile});
  final ProfileModel profile;

  @override
  Widget build(BuildContext context) {
    return _CardContainer(
      child: Padding(
        padding: AppSpacing.cardPadding,
        child: Column(
          children: [
            _InfoRow(
              icon: Icons.person_outline_rounded,
              label: 'Prénom',
              value: profile.prenom,
            ),
            const SizedBox(height: 14),
            _InfoRow(
              icon: Icons.phone_outlined,
              label: 'Téléphone',
              value: profile.telephone,
            ),
            if (profile.email != null && profile.email!.isNotEmpty) ...[
              const SizedBox(height: 14),
              _InfoRow(
                icon: Icons.email_outlined,
                label: 'Email',
                value: profile.email!,
              ),
            ],
            const SizedBox(height: 14),
            _InfoRow(
              icon: Icons.location_on_outlined,
              label: 'Ville',
              value: profile.ville,
            ),
            const SizedBox(height: 14),
            _InfoRow(
              icon: Icons.cake_outlined,
              label: 'Date de naissance',
              value: AppDateUtils.formatFull(profile.dateNaissance),
            ),
            if (profile.bio != null && profile.bio!.isNotEmpty) ...[
              const SizedBox(height: 14),
              _InfoRow(
                icon: Icons.short_text_rounded,
                label: 'Bio',
                value: profile.bio!,
                isMultiLine: true,
              ),
            ],
          ],
        ),
      ),
    );
  }
}

/// Single row inside the info card.
class _InfoRow extends StatelessWidget {
  const _InfoRow({
    required this.icon,
    required this.label,
    required this.value,
    this.isMultiLine = false,
  });

  final IconData icon;
  final String label;
  final String value;
  final bool isMultiLine;

  @override
  Widget build(BuildContext context) {
    return Row(
      crossAxisAlignment:
          isMultiLine ? CrossAxisAlignment.start : CrossAxisAlignment.center,
      children: [
        Container(
          width: 36,
          height: 36,
          decoration: BoxDecoration(
            color: AppColors.purpleLight.withValues(alpha: 0.5),
            borderRadius: BorderRadius.circular(8),
          ),
          child: Icon(icon, size: 18, color: AppColors.purple),
        ),
        AppSpacing.gapHMd,
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                label,
                style: AppTypography.labelSmall.copyWith(
                  color: AppColors.inkMuted,
                  letterSpacing: 0.3,
                ),
              ),
              const SizedBox(height: 2),
              Text(
                value,
                style: AppTypography.bodyMedium.copyWith(
                  color: AppColors.ink,
                  fontWeight: FontWeight.w500,
                ),
                maxLines: isMultiLine ? 5 : 1,
                overflow: TextOverflow.ellipsis,
              ),
            ],
          ),
        ),
      ],
    );
  }
}

/// Shimmer placeholder while profile is loading.
class _ProfileShimmer extends StatelessWidget {
  const _ProfileShimmer();

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Padding(
        padding: AppSpacing.screenPadding,
        child: Column(
          children: [
            AppSpacing.gapXxl,
            // Avatar placeholder
            Container(
              width: 96,
              height: 96,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: AppColors.divider,
              ),
            ),
            AppSpacing.gapMd,
            // Name placeholder
            Container(
              width: 160,
              height: 24,
              decoration: BoxDecoration(
                color: AppColors.divider,
                borderRadius: AppRadius.borderSm,
              ),
            ),
            AppSpacing.gapSm,
            // Status placeholder
            Container(
              width: 100,
              height: 20,
              decoration: BoxDecoration(
                color: AppColors.divider,
                borderRadius: BorderRadius.circular(10),
              ),
            ),
            AppSpacing.gapXxl,
            // Card placeholder
            Container(
              width: double.infinity,
              height: 200,
              decoration: BoxDecoration(
                color: AppColors.divider,
                borderRadius: AppRadius.borderLg,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

/// Error view with optional retry button.
class _ErrorView extends StatelessWidget {
  const _ErrorView({required this.message, this.onRetry});

  final String message;
  final VoidCallback? onRetry;

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Padding(
        padding: AppSpacing.screenPadding,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(
              Icons.error_outline_rounded,
              size: 56,
              color: AppColors.error.withValues(alpha: 0.6),
            ),
            AppSpacing.gapMd,
            Text(
              'Erreur',
              style: AppTypography.displaySmall,
            ),
            AppSpacing.gapSm,
            Text(
              message,
              style: AppTypography.bodyMedium.copyWith(
                color: AppColors.inkMuted,
              ),
              textAlign: TextAlign.center,
            ),
            if (onRetry != null) ...[
              AppSpacing.gapLg,
              ElevatedButton.icon(
                onPressed: onRetry,
                icon: const Icon(Icons.refresh_rounded),
                label: const Text('Réessayer'),
              ),
            ],
          ],
        ),
      ),
    );
  }
}
