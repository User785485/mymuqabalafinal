/// Photo selection screen for the matching process.
///
/// Presents a grid of blurred photos and lets the user select which
/// one(s) they believe is their match. After confirmation the selection
/// is submitted to Supabase and the screen pops back.
///
/// Accepts an optional [matchId] parameter. When null, an empty state
/// is displayed.
library;

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

import 'package:my_muqabala/core/constants/app_colors.dart';
import 'package:my_muqabala/core/constants/app_spacing.dart';
import 'package:my_muqabala/core/constants/app_typography.dart';
import 'package:my_muqabala/core/utils/logger.dart';
import 'package:my_muqabala/core/widgets/empty_state.dart';
import 'package:my_muqabala/core/widgets/loading_skeleton.dart';
import 'package:my_muqabala/core/widgets/muqabala_button.dart';
import 'package:my_muqabala/features/matching/data/models/photo_selection_model.dart';
import 'package:my_muqabala/features/matching/presentation/providers/matching_provider.dart';
import 'package:my_muqabala/features/matching/presentation/widgets/photo_grid_widget.dart';

/// Screen where users select photos during the matching flow.
class PhotoSelectionScreen extends ConsumerStatefulWidget {
  const PhotoSelectionScreen({this.matchId, super.key});

  /// The match ID for which photos are presented.
  /// When null, an informational empty state is shown.
  final String? matchId;

  @override
  ConsumerState<PhotoSelectionScreen> createState() =>
      _PhotoSelectionScreenState();
}

class _PhotoSelectionScreenState extends ConsumerState<PhotoSelectionScreen> {
  /// The set of [PhotoSelectionModel.photoUserId] values the user has selected.
  final Set<String> _selectedIds = {};

  /// Whether a submission is in progress.
  bool _isSubmitting = false;

  /// Maximum number of photos the user can select.
  static const _maxSelections = 2;

  // ── Selection toggle logic ───────────────────────────────────────────────

  void _onTogglePhoto(String photoUserId) {
    setState(() {
      if (_selectedIds.contains(photoUserId)) {
        _selectedIds.remove(photoUserId);
      } else if (_selectedIds.length < _maxSelections) {
        _selectedIds.add(photoUserId);
      }
    });
  }

  // ── Submission flow ──────────────────────────────────────────────────────

  Future<void> _onConfirmSelection() async {
    if (_selectedIds.isEmpty) return;

    // Show confirmation dialog.
    final confirmed = await _showConfirmationDialog();
    if (confirmed != true || !mounted) return;

    setState(() => _isSubmitting = true);

    try {
      final repository = ref.read(matchingRepositoryProvider);
      final userId = Supabase.instance.client.auth.currentUser?.id;

      if (userId == null || widget.matchId == null) {
        throw Exception('Utilisateur non authentifi\u00e9 ou match invalide');
      }

      // Resolve matchId → eventId (photo_selections uses event_id, not match_id).
      final eventId =
          await ref.read(matchEventIdProvider(widget.matchId!).future);
      if (eventId == null) {
        throw Exception('Aucun \u00e9v\u00e9nement associ\u00e9 \u00e0 ce match');
      }

      await repository.submitPhotoSelections(
        eventId,
        userId,
        _selectedIds.toList(),
      );

      AppLogger.info(
        'Photo selection submitted: ${_selectedIds.length} photos',
        tag: 'PhotoSelection',
      );

      if (mounted) {
        _showSuccessSnackbar();
        context.pop();
      }
    } on Exception catch (e, st) {
      AppLogger.error(
        'Failed to submit photo selection',
        tag: 'PhotoSelection',
        error: e,
        stackTrace: st,
      );

      if (mounted) {
        _showErrorSnackbar(e.toString());
        setState(() => _isSubmitting = false);
      }
    }
  }

  Future<bool?> _showConfirmationDialog() {
    return showDialog<bool>(
      context: context,
      builder: (dialogContext) => AlertDialog(
        shape: RoundedRectangleBorder(borderRadius: AppRadius.borderLg),
        title: Text(
          'Confirmer ta sélection',
          style: AppTypography.h3.copyWith(color: AppColors.ink),
        ),
        content: Text(
          'Tu as sélectionné ${_selectedIds.length} '
          'photo${_selectedIds.length > 1 ? 's' : ''}. '
          'Cette action est définitive.',
          style: AppTypography.bodyMedium.copyWith(color: AppColors.inkMuted),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(dialogContext).pop(false),
            child: Text(
              'Annuler',
              style: AppTypography.label.copyWith(color: AppColors.inkMuted),
            ),
          ),
          FilledButton(
            onPressed: () => Navigator.of(dialogContext).pop(true),
            style: FilledButton.styleFrom(
              backgroundColor: AppColors.violet,
              shape: RoundedRectangleBorder(
                borderRadius: AppRadius.borderMd,
              ),
            ),
            child: Text(
              'Confirmer',
              style: AppTypography.label.copyWith(color: Colors.white),
            ),
          ),
        ],
      ),
    );
  }

  void _showSuccessSnackbar() {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Row(
          children: [
            const Icon(
              Icons.check_circle_rounded,
              color: Colors.white,
              size: 20,
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Text(
                'Sélection enregistrée avec succès !',
                style: AppTypography.bodyMedium.copyWith(color: Colors.white),
              ),
            ),
          ],
        ),
        backgroundColor: AppColors.success,
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(borderRadius: AppRadius.borderMd),
        margin: AppSpacing.paddingMd,
      ),
    );
  }

  void _showErrorSnackbar(String message) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Row(
          children: [
            const Icon(
              Icons.error_outline_rounded,
              color: Colors.white,
              size: 20,
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Text(
                'Erreur : $message',
                style: AppTypography.bodyMedium.copyWith(color: Colors.white),
                maxLines: 2,
                overflow: TextOverflow.ellipsis,
              ),
            ),
          ],
        ),
        backgroundColor: AppColors.error,
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(borderRadius: AppRadius.borderMd),
        margin: AppSpacing.paddingMd,
      ),
    );
  }

  // ── Build ────────────────────────────────────────────────────────────────

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.paper,
      appBar: _buildAppBar(),
      body: widget.matchId == null ? _buildNoMatchState() : _buildContent(),
    );
  }

  PreferredSizeWidget _buildAppBar() {
    return AppBar(
      title: Text(
        'Sélection de photos',
        style: AppTypography.h3.copyWith(color: AppColors.ink),
      ),
      centerTitle: true,
      backgroundColor: AppColors.paper,
      elevation: 0,
      scrolledUnderElevation: 1,
      leading: IconButton(
        icon: const Icon(Icons.arrow_back_ios_rounded, size: 20),
        onPressed: () => context.pop(),
      ),
    );
  }

  Widget _buildNoMatchState() {
    return const EmptyState(
      icon: Icons.photo_library_outlined,
      title: 'Aucun match actif',
      subtitle:
          'Les photos seront disponibles lorsqu\'un match vous sera proposé.',
    );
  }

  Widget _buildContent() {
    final photosAsync = ref.watch(photoSelectionsProvider(widget.matchId!));

    return photosAsync.when(
      loading: _buildLoadingState,
      error: (error, _) => _buildErrorState(error),
      data: (photos) {
        if (photos.isEmpty) {
          return const EmptyState(
            icon: Icons.photo_library_outlined,
            title: 'Aucune photo disponible',
            subtitle:
                'Les photos de sélection n\'ont pas encore été générées.',
          );
        }

        return _buildPhotoSelectionBody(photos);
      },
    );
  }

  Widget _buildLoadingState() {
    return Padding(
      padding: AppSpacing.screenPadding,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const LoadingSkeleton(height: 24, width: 220),
          AppSpacing.gapSm,
          const LoadingSkeleton(height: 16, width: 300),
          AppSpacing.gapLg,
          Expanded(
            child: GridView.count(
              crossAxisCount: 2,
              mainAxisSpacing: AppSpacing.md,
              crossAxisSpacing: AppSpacing.md,
              childAspectRatio: 0.75,
              children: List.generate(
                5,
                (_) => const LoadingSkeleton(borderRadius: 16),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildErrorState(Object error) {
    return EmptyState(
      icon: Icons.error_outline_rounded,
      title: 'Erreur de chargement',
      subtitle: 'Impossible de charger les photos. Réessaie.',
      actionLabel: 'Réessayer',
      onAction: () => ref.invalidate(photoSelectionsProvider(widget.matchId!)),
    );
  }

  Widget _buildPhotoSelectionBody(List<PhotoSelectionModel> photos) {
    return Column(
      children: [
        // ── Scrollable content ─────────────────────────────────────────
        Expanded(
          child: SingleChildScrollView(
            padding: AppSpacing.screenPadding,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // ── Header ──────────────────────────────────────────────
                _buildHeader(),
                AppSpacing.gapLg,

                // ── Selection count indicator ───────────────────────────
                _buildSelectionIndicator(),
                AppSpacing.gapMd,

                // ── Photo grid ──────────────────────────────────────────
                PhotoGridWidget(
                  photos: photos,
                  selectedIds: _selectedIds,
                  onToggle: _onTogglePhoto,
                  maxSelections: _maxSelections,
                ),
                AppSpacing.gapLg,

                // ── Information text ────────────────────────────────────
                _buildInfoText(),
                AppSpacing.gapXl,
              ],
            ),
          ),
        ),

        // ── Bottom CTA ─────────────────────────────────────────────────
        _buildBottomBar(),
      ],
    );
  }

  Widget _buildHeader() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Qui est ton match ?',
          style: AppTypography.h2.copyWith(color: AppColors.ink),
        ),
        AppSpacing.gapXs,
        Text(
          'Observe attentivement les photos ci-dessous et '
          'sélectionne celle(s) qui te correspond(ent) le plus.',
          style: AppTypography.bodyMedium.copyWith(color: AppColors.inkMuted),
        ),
      ],
    );
  }

  Widget _buildSelectionIndicator() {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
      decoration: BoxDecoration(
        color: _selectedIds.isEmpty
            ? AppColors.violetLight
            : AppColors.violet.withValues(alpha: 0.1),
        borderRadius: AppRadius.borderCircular,
        border: Border.all(
          color: _selectedIds.isEmpty
              ? AppColors.divider
              : AppColors.violet.withValues(alpha: 0.3),
        ),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(
            _selectedIds.isEmpty
                ? Icons.touch_app_outlined
                : Icons.check_circle_outline_rounded,
            size: 18,
            color: _selectedIds.isEmpty ? AppColors.inkMuted : AppColors.violet,
          ),
          const SizedBox(width: 8),
          Text(
            _selectedIds.isEmpty
                ? 'Sélectionne jusqu\'à $_maxSelections photos'
                : '${_selectedIds.length} / $_maxSelections '
                    'sélectionné${_selectedIds.length > 1 ? 's' : ''}',
            style: AppTypography.labelMedium.copyWith(
              color:
                  _selectedIds.isEmpty ? AppColors.inkMuted : AppColors.violet,
              fontWeight: FontWeight.w600,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildInfoText() {
    return Container(
      padding: AppSpacing.cardPadding,
      decoration: BoxDecoration(
        color: AppColors.goldLight,
        borderRadius: AppRadius.borderMd,
        border: Border.all(color: AppColors.gold.withValues(alpha: 0.3)),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Icon(
            Icons.info_outline_rounded,
            size: 20,
            color: AppColors.gold,
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Text(
              'Parmi ces photos, certaines sont des leurres. '
              'Fais confiance à ton intuition et choisis '
              'avec le cœur.',
              style: AppTypography.bodySmall.copyWith(
                color: AppColors.inkSoft,
                height: 1.5,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildBottomBar() {
    return Container(
      padding: const EdgeInsets.fromLTRB(
        AppSpacing.md,
        AppSpacing.sm,
        AppSpacing.md,
        AppSpacing.lg,
      ),
      decoration: BoxDecoration(
        color: AppColors.surface,
        border: const Border(
          top: BorderSide(color: AppColors.divider),
        ),
        boxShadow: [
          BoxShadow(
            color: AppColors.shadowLight,
            blurRadius: 8,
            offset: const Offset(0, -2),
          ),
        ],
      ),
      child: SafeArea(
        top: false,
        child: MuqabalaButton(
          label: _selectedIds.isEmpty
              ? 'S\u00e9lectionnez une photo'
              : 'Confirmer ma s\u00e9lection (${_selectedIds.length})',
          onPressed: _selectedIds.isEmpty ? null : _onConfirmSelection,
          isLoading: _isSubmitting,
          variant: MuqabalaButtonVariant.primary,
          icon: _selectedIds.isEmpty ? null : Icons.check_rounded,
        ),
      ),
    );
  }
}
