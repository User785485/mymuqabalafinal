import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'package:my_muqabala/app.dart';
import 'package:my_muqabala/core/constants/app_colors.dart';
import 'package:my_muqabala/core/constants/app_spacing.dart';
import 'package:my_muqabala/core/constants/app_typography.dart';
import 'package:my_muqabala/core/router/route_names.dart';
import 'package:my_muqabala/core/utils/date_utils.dart';
import 'package:my_muqabala/features/profile/data/models/profile_model.dart';
import 'package:my_muqabala/features/profile/presentation/providers/profile_provider.dart';
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
  // ── Local toggle states ──
  bool _notificationsEnabled = true;
  bool _biometricEnabled = false;

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final profileAsync = ref.watch(currentProfileProvider);

    return Scaffold(
      backgroundColor: isDark ? AppColors.darkBg : AppColors.paper,
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
        backgroundColor: isDark ? AppColors.darkCard : Colors.white,
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
                message: 'Profil introuvable. Reconnecte-toi.',
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

        // ── Profile completion card ─────────────────────────────────
        _ProfileCompletionCard(
          profile: profile,
          onComplete: () => _navigateToEdit(profile),
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

        const SizedBox(height: AppSpacing.lg),
      ],
    );
  }

  // ── Preferences card ──────────────────────────────────────────────────

  Widget _buildPreferencesCard() {
    final themeMode = ref.watch(themeModeProvider);
    final isDarkMode = themeMode == ThemeMode.dark;

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
            subtitle: isDarkMode ? 'Activé' : 'Désactivé',
            trailing: Switch.adaptive(
              value: isDarkMode,
              onChanged: (value) async {
                final newMode = value ? ThemeMode.dark : ThemeMode.light;
                ref.read(themeModeProvider.notifier).state = newMode;
                final prefs = await SharedPreferences.getInstance();
                await prefs.setString('theme_mode', value ? 'dark' : 'light');
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
    // Try tab-based route first, fall back to full-screen route
    context.pushNamed(RouteNames.editProfileTab, extra: profile);
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
        _showSnackBar('Ton compte a été désactivé.');
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

/// Profile completion indicator card.
class _ProfileCompletionCard extends StatelessWidget {
  const _ProfileCompletionCard({
    required this.profile,
    required this.onComplete,
  });

  final ProfileModel profile;
  final VoidCallback onComplete;

  double _calculateCompletion() {
    int filled = 0;
    const total = 6;
    if (profile.prenom.isNotEmpty) filled++;
    if (profile.nom != null && profile.nom!.isNotEmpty) filled++;
    if (profile.email != null && profile.email!.isNotEmpty) filled++;
    if (profile.ville.isNotEmpty) filled++;
    if (profile.bio != null && profile.bio!.isNotEmpty) filled++;
    if (profile.hasPhoto) filled++;
    return filled / total;
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final completion = _calculateCompletion();
    final percent = (completion * 100).round();

    if (percent >= 100) return const SizedBox.shrink();

    return Padding(
      padding: const EdgeInsets.only(bottom: AppSpacing.md),
      child: Container(
        width: double.infinity,
        padding: AppSpacing.cardPadding,
        decoration: BoxDecoration(
          color: isDark ? AppColors.darkCard : AppColors.surface,
          borderRadius: AppRadius.borderLg,
          border: Border.all(
            color: AppColors.violet.withValues(alpha: 0.2),
          ),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Expanded(
                  child: Text(
                    'Profil compl\u00e9t\u00e9 \u00e0 $percent%',
                    style: AppTypography.label.copyWith(
                      color: isDark ? AppColors.darkInk : AppColors.ink,
                    ),
                  ),
                ),
                Text(
                  '$percent%',
                  style: AppTypography.labelLarge.copyWith(
                    color: AppColors.violet,
                    fontWeight: FontWeight.w700,
                  ),
                ),
              ],
            ),
            AppSpacing.gapSm,
            ClipRRect(
              borderRadius: BorderRadius.circular(4),
              child: LinearProgressIndicator(
                value: completion,
                backgroundColor: isDark
                    ? AppColors.darkBorder
                    : AppColors.divider,
                valueColor: const AlwaysStoppedAnimation<Color>(
                  AppColors.violet,
                ),
                minHeight: 6,
              ),
            ),
            AppSpacing.gapSm,
            Text(
              'Complète ton profil pour améliorer tes rencontres',
              style: AppTypography.bodySmall.copyWith(
                color: isDark ? AppColors.darkInkMuted : AppColors.inkMuted,
              ),
            ),
            AppSpacing.gapSm,
            Align(
              alignment: Alignment.centerRight,
              child: TextButton(
                onPressed: onComplete,
                child: Text(
                  'Compl\u00e9ter',
                  style: AppTypography.labelMedium.copyWith(
                    color: AppColors.violet,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

/// Section title in Cormorant font.
class _SectionTitle extends StatelessWidget {
  const _SectionTitle({required this.title});
  final String title;

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    return Padding(
      padding: const EdgeInsets.only(left: 4),
      child: Text(
        title,
        style: AppTypography.displaySmall.copyWith(
          color: isDark ? AppColors.darkInk : AppColors.ink,
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
    final isDark = Theme.of(context).brightness == Brightness.dark;
    return Container(
      decoration: BoxDecoration(
        color: isDark ? AppColors.darkCard : Colors.white,
        borderRadius: AppRadius.borderLg,
        border: Border.all(color: isDark ? AppColors.darkBorder : AppColors.divider, width: 1),
        boxShadow: isDark
            ? null
            : [
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
    final isDark = Theme.of(context).brightness == Brightness.dark;
    return Padding(
      padding: const EdgeInsets.only(left: 72),
      child: Divider(
        height: 1,
        thickness: 1,
        color: isDark ? AppColors.darkBorder : AppColors.divider,
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
    final isDark = Theme.of(context).brightness == Brightness.dark;
    return Row(
      crossAxisAlignment:
          isMultiLine ? CrossAxisAlignment.start : CrossAxisAlignment.center,
      children: [
        Container(
          width: 36,
          height: 36,
          decoration: BoxDecoration(
            color: isDark
                ? AppColors.violet.withValues(alpha: 0.15)
                : AppColors.purpleLight.withValues(alpha: 0.5),
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
                  color: isDark ? AppColors.darkInkMuted : AppColors.inkMuted,
                  letterSpacing: 0.3,
                ),
              ),
              const SizedBox(height: 2),
              Text(
                value,
                style: AppTypography.bodyMedium.copyWith(
                  color: isDark ? AppColors.darkInk : AppColors.ink,
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
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final shimmerColor = isDark ? AppColors.darkCard : AppColors.divider;
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
                color: shimmerColor,
              ),
            ),
            AppSpacing.gapMd,
            // Name placeholder
            Container(
              width: 160,
              height: 24,
              decoration: BoxDecoration(
                color: shimmerColor,
                borderRadius: AppRadius.borderSm,
              ),
            ),
            AppSpacing.gapSm,
            // Status placeholder
            Container(
              width: 100,
              height: 20,
              decoration: BoxDecoration(
                color: shimmerColor,
                borderRadius: BorderRadius.circular(10),
              ),
            ),
            AppSpacing.gapXxl,
            // Card placeholder
            Container(
              width: double.infinity,
              height: 200,
              decoration: BoxDecoration(
                color: shimmerColor,
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
              style: Theme.of(context).textTheme.bodyMedium,
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
