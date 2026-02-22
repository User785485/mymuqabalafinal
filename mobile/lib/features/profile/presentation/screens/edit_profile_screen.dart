import 'dart:io';

import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:image_picker/image_picker.dart';
import 'package:reactive_forms/reactive_forms.dart';

import 'package:my_muqabala/core/constants/app_colors.dart';
import 'package:my_muqabala/core/constants/app_spacing.dart';
import 'package:my_muqabala/core/constants/app_typography.dart';
import 'package:my_muqabala/features/profile/data/models/profile_model.dart';
import 'package:my_muqabala/features/profile/presentation/providers/profile_provider.dart';

/// Screen for editing the current user's profile.
///
/// Uses [ReactiveForm] for form management with built-in validation.
/// Photo upload is handled via [ImagePicker] + the profile repository.
class EditProfileScreen extends ConsumerStatefulWidget {
  const EditProfileScreen({required this.profile, super.key});

  /// The current profile data used to pre-fill the form.
  final ProfileModel profile;

  @override
  ConsumerState<EditProfileScreen> createState() => _EditProfileScreenState();
}

class _EditProfileScreenState extends ConsumerState<EditProfileScreen> {
  late final FormGroup _form;
  final _picker = ImagePicker();

  /// Local file selected by the user but not yet uploaded.
  File? _pendingPhoto;

  /// Whether the photo is currently being uploaded.
  bool _isUploadingPhoto = false;

  @override
  void initState() {
    super.initState();
    final meta = widget.profile.metadata;
    _form = FormGroup({
      'prenom': FormControl<String>(
        value: widget.profile.prenom,
        validators: [Validators.required],
      ),
      'nom': FormControl<String>(
        value: widget.profile.nom ?? '',
      ),
      'email': FormControl<String>(
        value: widget.profile.email ?? '',
        validators: [Validators.email],
      ),
      'ville': FormControl<String>(
        value: widget.profile.ville,
        validators: [Validators.required],
      ),
      'bio': FormControl<String>(
        value: widget.profile.bio ?? '',
        validators: [Validators.maxLength(300)],
      ),
      'pratique_religieuse': FormControl<String>(
        value: meta['pratique_religieuse'] as String? ?? '',
      ),
      'objectif_mariage': FormControl<String>(
        value: meta['objectif_mariage'] as String? ?? '',
        validators: [Validators.maxLength(200)],
      ),
      'preferences_priere': FormControl<String>(
        value: meta['preferences_priere'] as String? ?? '',
        validators: [Validators.maxLength(200)],
      ),
    });
  }

  @override
  void dispose() {
    _form.dispose();
    super.dispose();
  }

  /// Whether any form field has been modified or a new photo has been selected.
  bool get _hasUnsavedChanges {
    if (_pendingPhoto != null) return true;
    if (!_form.dirty) return false;

    // Check each field individually
    final prenom = _form.control('prenom').value as String?;
    final nom = _form.control('nom').value as String?;
    final email = _form.control('email').value as String?;
    final ville = _form.control('ville').value as String?;
    final bio = _form.control('bio').value as String?;

    final pratiqueReligieuse = _form.control('pratique_religieuse').value as String?;
    final objectifMariage = _form.control('objectif_mariage').value as String?;
    final prefPriere = _form.control('preferences_priere').value as String?;
    final meta = widget.profile.metadata;

    return prenom != widget.profile.prenom ||
        (nom ?? '') != (widget.profile.nom ?? '') ||
        (email ?? '') != (widget.profile.email ?? '') ||
        ville != widget.profile.ville ||
        (bio ?? '') != (widget.profile.bio ?? '') ||
        (pratiqueReligieuse ?? '') != (meta['pratique_religieuse'] as String? ?? '') ||
        (objectifMariage ?? '') != (meta['objectif_mariage'] as String? ?? '') ||
        (prefPriere ?? '') != (meta['preferences_priere'] as String? ?? '');
  }

  @override
  Widget build(BuildContext context) {
    final updateState = ref.watch(updateProfileProvider);
    final isLoading =
        updateState is AsyncLoading || _isUploadingPhoto;

    return PopScope(
      canPop: !_hasUnsavedChanges,
      onPopInvokedWithResult: (didPop, _) async {
        if (didPop) return;
        final shouldPop = await _showUnsavedChangesDialog();
        if (shouldPop && context.mounted) {
          Navigator.of(context).pop();
        }
      },
      child: Scaffold(
        backgroundColor: AppColors.paper,
        appBar: AppBar(
          title: const Text('Modifier le profil'),
          leading: IconButton(
            icon: const Icon(Icons.arrow_back_rounded),
            onPressed: () async {
              if (_hasUnsavedChanges) {
                final shouldPop = await _showUnsavedChangesDialog();
                if (shouldPop && context.mounted) {
                  Navigator.of(context).pop();
                }
              } else {
                Navigator.of(context).pop();
              }
            },
          ),
        ),
        body: ReactiveForm(
          formGroup: _form,
          child: ListView(
            padding: const EdgeInsets.symmetric(
              horizontal: AppSpacing.md,
              vertical: AppSpacing.lg,
            ),
            children: [
              // ── Photo section ─────────────────────────────────────
              _buildPhotoSection(),

              AppSpacing.gapXl,

              // ── Form fields ───────────────────────────────────────
              _buildTextField(
                controlName: 'prenom',
                label: 'Prénom',
                icon: Icons.person_outline_rounded,
                textCapitalization: TextCapitalization.words,
                validationMessages: {
                  ValidationMessage.required: (_) => 'Le prénom est requis',
                },
              ),

              AppSpacing.gapMd,

              _buildTextField(
                controlName: 'nom',
                label: 'Nom (optionnel)',
                icon: Icons.badge_outlined,
                textCapitalization: TextCapitalization.words,
              ),

              AppSpacing.gapMd,

              _buildTextField(
                controlName: 'email',
                label: 'Email (optionnel)',
                icon: Icons.email_outlined,
                keyboardType: TextInputType.emailAddress,
                validationMessages: {
                  ValidationMessage.email: (_) => 'Adresse e-mail invalide',
                },
              ),

              AppSpacing.gapMd,

              _buildTextField(
                controlName: 'ville',
                label: 'Ville',
                icon: Icons.location_on_outlined,
                textCapitalization: TextCapitalization.words,
                validationMessages: {
                  ValidationMessage.required: (_) => 'La ville est requise',
                },
              ),

              AppSpacing.gapMd,

              _buildBioField(),

              AppSpacing.gapLg,

              // ── Islamic context fields ─────────────────────────────
              Padding(
                padding: const EdgeInsets.only(left: 4, bottom: 8),
                child: Text(
                  'Contexte islamique',
                  style: AppTypography.displaySmall.copyWith(
                    color: AppColors.ink,
                  ),
                ),
              ),

              ReactiveDropdownField<String>(
                formControlName: 'pratique_religieuse',
                decoration: const InputDecoration(
                  labelText: 'Pratique religieuse',
                  prefixIcon: Icon(Icons.mosque_outlined, size: 20),
                ),
                items: const [
                  DropdownMenuItem(value: '', child: Text('Non renseign\u00e9')),
                  DropdownMenuItem(value: 'pratiquant', child: Text('Pratiquant(e)')),
                  DropdownMenuItem(value: 'en_chemin', child: Text('En chemin')),
                  DropdownMenuItem(value: 'debutant', child: Text('D\u00e9butant(e)')),
                ],
              ),

              AppSpacing.gapMd,

              _buildTextField(
                controlName: 'objectif_mariage',
                label: 'Objectif du mariage',
                icon: Icons.favorite_outline_rounded,
                textCapitalization: TextCapitalization.sentences,
              ),

              AppSpacing.gapMd,

              _buildTextField(
                controlName: 'preferences_priere',
                label: 'Pr\u00e9f\u00e9rences de pri\u00e8re',
                icon: Icons.access_time_rounded,
                textCapitalization: TextCapitalization.sentences,
              ),

              AppSpacing.gapXl,

              // ── Save button ───────────────────────────────────────
              _buildSaveButton(isLoading),

              SizedBox(
                height: MediaQuery.of(context).viewPadding.bottom + 24,
              ),
            ],
          ),
        ),
      ),
    );
  }

  // ── Photo section ───────────────────────────────────────────────────

  Widget _buildPhotoSection() {
    return Center(
      child: Column(
        children: [
          GestureDetector(
            onTap: _isUploadingPhoto ? null : _pickPhoto,
            child: Stack(
              children: [
                Container(
                  width: 100,
                  height: 100,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    gradient: const LinearGradient(
                      begin: Alignment.topLeft,
                      end: Alignment.bottomRight,
                      colors: [
                        AppColors.purpleLight,
                        AppColors.roseLight,
                      ],
                    ),
                    border: Border.all(
                      color: AppColors.purple.withValues(alpha: 0.2),
                      width: 3,
                    ),
                  ),
                  child: ClipOval(
                    child: _buildAvatarContent(),
                  ),
                ),

                // Upload indicator or camera icon
                Positioned(
                  bottom: 0,
                  right: 0,
                  child: Container(
                    width: 34,
                    height: 34,
                    decoration: BoxDecoration(
                      color: AppColors.purple,
                      shape: BoxShape.circle,
                      border: Border.all(color: Colors.white, width: 2),
                    ),
                    child: _isUploadingPhoto
                        ? const Padding(
                            padding: EdgeInsets.all(7),
                            child: CircularProgressIndicator(
                              strokeWidth: 2,
                              color: Colors.white,
                            ),
                          )
                        : const Icon(
                            Icons.camera_alt_rounded,
                            color: Colors.white,
                            size: 16,
                          ),
                  ),
                ),
              ],
            ),
          ),
          AppSpacing.gapSm,
          Text(
            'Changer la photo',
            style: AppTypography.labelMedium.copyWith(
              color: AppColors.purple,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildAvatarContent() {
    // Show the locally selected file first
    if (_pendingPhoto != null) {
      return Image.file(
        _pendingPhoto!,
        fit: BoxFit.cover,
        width: 100,
        height: 100,
      );
    }

    // Otherwise show the existing photo from the network
    if (widget.profile.hasPhoto) {
      return CachedNetworkImage(
        imageUrl: widget.profile.bestPhotoUrl!,
        fit: BoxFit.cover,
        width: 100,
        height: 100,
        placeholder: (_, __) => _initialFallback(),
        errorWidget: (_, __, ___) => _initialFallback(),
      );
    }

    return _initialFallback();
  }

  Widget _initialFallback() {
    return Center(
      child: Text(
        widget.profile.initial,
        style: AppTypography.displayLarge.copyWith(
          color: AppColors.purple,
          fontSize: 36,
        ),
      ),
    );
  }

  // ── Text fields ─────────────────────────────────────────────────────

  Widget _buildTextField({
    required String controlName,
    required String label,
    required IconData icon,
    TextInputType keyboardType = TextInputType.text,
    TextCapitalization textCapitalization = TextCapitalization.none,
    Map<String, String Function(Object)>? validationMessages,
  }) {
    return ReactiveTextField<String>(
      formControlName: controlName,
      decoration: InputDecoration(
        labelText: label,
        prefixIcon: Icon(icon, size: 20),
      ),
      keyboardType: keyboardType,
      textCapitalization: textCapitalization,
      style: AppTypography.bodyLarge,
      validationMessages: validationMessages ?? {},
    );
  }

  Widget _buildBioField() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        ReactiveTextField<String>(
          formControlName: 'bio',
          decoration: InputDecoration(
            labelText: 'Bio (optionnel)',
            prefixIcon: const Icon(Icons.short_text_rounded, size: 20),
            alignLabelWithHint: true,
            counterText: '',
          ),
          maxLines: 4,
          maxLength: 300,
          style: AppTypography.bodyLarge,
          validationMessages: {
            ValidationMessage.maxLength: (_) => '300 caractères maximum',
          },
        ),
        AppSpacing.gapXs,
        // Character counter
        ReactiveValueListenableBuilder<String>(
          formControlName: 'bio',
          builder: (context, control, _) {
            final length = (control.value ?? '').length;
            final isNearLimit = length > 250;
            return Padding(
              padding: const EdgeInsets.only(right: 4),
              child: Align(
                alignment: Alignment.centerRight,
                child: Text(
                  '$length / 300',
                  style: AppTypography.labelSmall.copyWith(
                    color: isNearLimit ? AppColors.warning : AppColors.inkFaint,
                  ),
                ),
              ),
            );
          },
        ),
      ],
    );
  }

  // ── Save button ───────────────────────────────────────────────────────

  Widget _buildSaveButton(bool isLoading) {
    return ReactiveFormConsumer(
      builder: (context, form, _) {
        return ElevatedButton(
          onPressed: isLoading ? null : () => _save(form),
          child: isLoading
              ? const SizedBox(
                  width: 22,
                  height: 22,
                  child: CircularProgressIndicator(
                    strokeWidth: 2.5,
                    color: Colors.white,
                  ),
                )
              : const Text('Enregistrer'),
        );
      },
    );
  }

  // ── Actions ───────────────────────────────────────────────────────────

  Future<void> _pickPhoto() async {
    final source = await _showPhotoSourceDialog();
    if (source == null) return;

    final xFile = await _picker.pickImage(
      source: source,
      maxWidth: 800,
      maxHeight: 800,
      imageQuality: 85,
    );

    if (xFile == null) return;

    setState(() => _pendingPhoto = File(xFile.path));
  }

  Future<ImageSource?> _showPhotoSourceDialog() async {
    return showModalBottomSheet<ImageSource>(
      context: context,
      builder: (ctx) => SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(vertical: AppSpacing.md),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Container(
                width: 40,
                height: 4,
                decoration: BoxDecoration(
                  color: AppColors.border,
                  borderRadius: BorderRadius.circular(2),
                ),
              ),
              AppSpacing.gapMd,
              Text(
                'Choisir une photo',
                style: AppTypography.displaySmall,
              ),
              AppSpacing.gapMd,
              ListTile(
                leading: Container(
                  width: 44,
                  height: 44,
                  decoration: BoxDecoration(
                    color: AppColors.purpleLight,
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: const Icon(
                    Icons.camera_alt_rounded,
                    color: AppColors.purple,
                  ),
                ),
                title: Text(
                  'Prendre une photo',
                  style: AppTypography.bodyLarge.copyWith(
                    fontWeight: FontWeight.w500,
                  ),
                ),
                onTap: () => Navigator.of(ctx).pop(ImageSource.camera),
              ),
              ListTile(
                leading: Container(
                  width: 44,
                  height: 44,
                  decoration: BoxDecoration(
                    color: AppColors.sageLight,
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: const Icon(
                    Icons.photo_library_rounded,
                    color: AppColors.sage,
                  ),
                ),
                title: Text(
                  'Galerie photos',
                  style: AppTypography.bodyLarge.copyWith(
                    fontWeight: FontWeight.w500,
                  ),
                ),
                onTap: () => Navigator.of(ctx).pop(ImageSource.gallery),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Future<void> _save(FormGroup form) async {
    if (!form.valid) {
      form.markAllAsTouched();
      return;
    }

    final notifier = ref.read(updateProfileProvider.notifier);

    // 1. Upload photo if one was selected
    if (_pendingPhoto != null) {
      setState(() => _isUploadingPhoto = true);
      final url = await notifier.uploadPhoto(_pendingPhoto!);
      setState(() => _isUploadingPhoto = false);

      if (url == null && mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Erreur lors du téléchargement de la photo.'),
            backgroundColor: AppColors.error,
          ),
        );
        return;
      }
    }

    // 2. Build the updates map from changed fields
    final updates = <String, dynamic>{};

    final prenom = (form.control('prenom').value as String?)?.trim();
    if (prenom != null && prenom != widget.profile.prenom) {
      updates['prenom'] = prenom;
    }

    final nom = (form.control('nom').value as String?)?.trim();
    final currentNom = widget.profile.nom ?? '';
    if ((nom ?? '') != currentNom) {
      updates['nom'] = (nom != null && nom.isNotEmpty) ? nom : null;
    }

    final email = (form.control('email').value as String?)?.trim();
    final currentEmail = widget.profile.email ?? '';
    if ((email ?? '') != currentEmail) {
      updates['email'] = (email != null && email.isNotEmpty) ? email : null;
    }

    final ville = (form.control('ville').value as String?)?.trim();
    if (ville != null && ville != widget.profile.ville) {
      updates['ville'] = ville;
    }

    final bio = (form.control('bio').value as String?)?.trim();
    final currentBio = widget.profile.bio ?? '';
    if ((bio ?? '') != currentBio) {
      updates['bio'] = (bio != null && bio.isNotEmpty) ? bio : null;
    }

    // Islamic context fields stored in metadata JSONB
    final meta = widget.profile.metadata;
    final pratiqueReligieuse = (form.control('pratique_religieuse').value as String?)?.trim() ?? '';
    final objectifMariage = (form.control('objectif_mariage').value as String?)?.trim() ?? '';
    final prefPriere = (form.control('preferences_priere').value as String?)?.trim() ?? '';

    final currentPratique = meta['pratique_religieuse'] as String? ?? '';
    final currentObjectif = meta['objectif_mariage'] as String? ?? '';
    final currentPriere = meta['preferences_priere'] as String? ?? '';

    if (pratiqueReligieuse != currentPratique ||
        objectifMariage != currentObjectif ||
        prefPriere != currentPriere) {
      updates['metadata'] = {
        ...meta,
        'pratique_religieuse': pratiqueReligieuse.isNotEmpty ? pratiqueReligieuse : null,
        'objectif_mariage': objectifMariage.isNotEmpty ? objectifMariage : null,
        'preferences_priere': prefPriere.isNotEmpty ? prefPriere : null,
      };
    }

    // 3. Only call the API if there are actual changes
    if (updates.isNotEmpty) {
      final success = await notifier.updateFields(updates);
      if (!success && mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Erreur lors de la mise à jour du profil.'),
            backgroundColor: AppColors.error,
          ),
        );
        return;
      }
    }

    if (mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Profil mis à jour avec succès.'),
        ),
      );
      Navigator.of(context).pop();
    }
  }

  Future<bool> _showUnsavedChangesDialog() async {
    final result = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text('Modifications non enregistrées'),
        content: const Text(
          'Vous avez des modifications non enregistrées. '
          'Voulez-vous quitter sans sauvegarder ?',
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(ctx).pop(false),
            child: const Text('Rester'),
          ),
          ElevatedButton(
            onPressed: () => Navigator.of(ctx).pop(true),
            style: ElevatedButton.styleFrom(
              backgroundColor: AppColors.error,
            ),
            child: const Text('Quitter'),
          ),
        ],
      ),
    );
    return result ?? false;
  }
}
