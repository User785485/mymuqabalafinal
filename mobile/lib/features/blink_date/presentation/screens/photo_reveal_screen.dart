/// Photo reveal screen — select which partners you're attracted to.
///
/// Displays clear (non-blurred) photos of the user's blink date partners
/// mixed with decoy photos. No names are shown — the user must rely
/// on recognition from the audio conversations.
///
/// Flow:
/// 1. Load partner photos via [BlinkDateRepository.getPartnerPhotosForEvent]
/// 2. Display shuffled grid of clear photos (2 columns, no names)
/// 3. User taps to toggle selection (multi-select)
/// 4. Submit selections via [BlinkDateRepository.submitPhotoSelections]
/// 5. Navigate to [MatchResultsScreen]
library;

import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

import 'package:my_muqabala/core/constants/app_colors.dart';
import 'package:my_muqabala/core/constants/app_spacing.dart';
import 'package:my_muqabala/core/constants/app_typography.dart';
import 'package:my_muqabala/core/router/route_names.dart';
import 'package:my_muqabala/core/utils/logger.dart';
import 'package:my_muqabala/core/widgets/muqabala_button.dart';
import 'package:my_muqabala/features/blink_date/data/repositories/blink_date_repository.dart';

/// Photo reveal screen for post-Blink Date partner selection.
class PhotoRevealScreen extends ConsumerStatefulWidget {
  const PhotoRevealScreen({
    required this.eventId,
    super.key,
  });

  /// The event ID for which to load photo selections.
  final String eventId;

  @override
  ConsumerState<PhotoRevealScreen> createState() => _PhotoRevealScreenState();
}

class _PhotoRevealScreenState extends ConsumerState<PhotoRevealScreen>
    with SingleTickerProviderStateMixin {
  late final AnimationController _fadeController;
  late final Animation<double> _fadeAnimation;

  List<Map<String, dynamic>> _photos = [];
  final Set<String> _selectedIds = {};
  bool _isLoading = true;
  bool _isSubmitting = false;
  String? _errorMessage;

  @override
  void initState() {
    super.initState();

    _fadeController = AnimationController(
      duration: const Duration(milliseconds: 500),
      vsync: this,
    );
    _fadeAnimation = CurvedAnimation(
      parent: _fadeController,
      curve: Curves.easeOut,
    );

    _loadPhotos();
  }

  @override
  void dispose() {
    _fadeController.dispose();
    super.dispose();
  }

  Future<void> _loadPhotos() async {
    setState(() {
      _isLoading = true;
      _errorMessage = null;
    });

    try {
      final repo = BlinkDateRepository(Supabase.instance.client);
      final photos = await repo.getPartnerPhotosForEvent(widget.eventId);

      if (mounted) {
        setState(() {
          _photos = photos;
          _isLoading = false;
        });
        _fadeController.forward();
      }
    } catch (e, st) {
      AppLogger.error(
        'Failed to load photos for event ${widget.eventId}',
        tag: 'PhotoReveal',
        error: e,
        stackTrace: st,
      );
      if (mounted) {
        setState(() {
          _isLoading = false;
          _errorMessage = 'Impossible de charger les photos.';
        });
      }
    }
  }

  void _toggleSelection(String id) {
    HapticFeedback.selectionClick();
    setState(() {
      if (_selectedIds.contains(id)) {
        _selectedIds.remove(id);
      } else {
        _selectedIds.add(id);
      }
    });
  }

  Future<void> _submitSelections() async {
    if (_selectedIds.isEmpty) return;

    setState(() => _isSubmitting = true);

    try {
      final repo = BlinkDateRepository(Supabase.instance.client);
      await repo.submitPhotoSelections(
        widget.eventId,
        _selectedIds.toList(),
      );

      if (mounted) {
        context.pushReplacementNamed(
          RouteNames.matchResults,
          extra: widget.eventId,
        );
      }
    } catch (e, st) {
      AppLogger.error(
        'Failed to submit photo selections',
        tag: 'PhotoReveal',
        error: e,
        stackTrace: st,
      );
      if (mounted) {
        setState(() => _isSubmitting = false);
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Erreur lors de la soumission. R\u00e9essayez.'),
            backgroundColor: AppColors.error,
          ),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.paper,
      appBar: AppBar(
        backgroundColor: AppColors.surface,
        surfaceTintColor: Colors.transparent,
        elevation: 0,
        centerTitle: true,
        title: Text(
          'S\u00e9lection photos',
          style: AppTypography.h3.copyWith(color: AppColors.ink),
        ),
        bottom: PreferredSize(
          preferredSize: const Size.fromHeight(1),
          child: Container(height: 1, color: AppColors.divider),
        ),
      ),
      body: _buildBody(),
    );
  }

  Widget _buildBody() {
    if (_isLoading) return _buildLoading();
    if (_errorMessage != null) return _buildError();
    if (_photos.isEmpty) return _buildEmpty();
    return _buildPhotoGrid();
  }

  Widget _buildLoading() {
    return Center(
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          SizedBox(
            width: 48,
            height: 48,
            child: CircularProgressIndicator(
              strokeWidth: 3,
              valueColor: AlwaysStoppedAnimation<Color>(
                AppColors.violet.withValues(alpha: 0.7),
              ),
            ),
          ),
          AppSpacing.gapLg,
          Text(
            'Chargement des photos...',
            style: AppTypography.bodyMedium.copyWith(color: AppColors.inkMuted),
          ),
        ],
      ),
    );
  }

  Widget _buildError() {
    return Center(
      child: Padding(
        padding: AppSpacing.screenPadding,
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              width: 80,
              height: 80,
              decoration: BoxDecoration(
                color: AppColors.errorLight,
                shape: BoxShape.circle,
              ),
              child: const Icon(
                Icons.error_outline_rounded,
                size: 40,
                color: AppColors.error,
              ),
            ),
            AppSpacing.gapLg,
            Text(
              _errorMessage!,
              style: AppTypography.bodyMedium.copyWith(color: AppColors.inkMuted),
              textAlign: TextAlign.center,
            ),
            AppSpacing.gapXl,
            MuqabalaButton(
              label: 'R\u00e9essayer',
              onPressed: _loadPhotos,
              isFullWidth: false,
              variant: MuqabalaButtonVariant.secondary,
              icon: Icons.refresh_rounded,
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildEmpty() {
    return Center(
      child: Padding(
        padding: AppSpacing.screenPadding,
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(
              Icons.photo_library_outlined,
              size: 64,
              color: AppColors.inkFaint,
            ),
            AppSpacing.gapMd,
            Text(
              'Aucune photo disponible',
              style: AppTypography.h3.copyWith(color: AppColors.ink),
              textAlign: TextAlign.center,
            ),
            AppSpacing.gapSm,
            Text(
              'Les photos ne sont pas encore disponibles pour cet \u00e9v\u00e9nement.',
              style: AppTypography.bodyMedium.copyWith(color: AppColors.inkMuted),
              textAlign: TextAlign.center,
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildPhotoGrid() {
    return Column(
      children: [
        // ── Header ──────────────────────────────────────────────────────
        Padding(
          padding: const EdgeInsets.fromLTRB(20, 20, 20, 0),
          child: Column(
            children: [
              Text(
                'Qui vous a attir\u00e9\u00b7e ?',
                style: AppTypography.h1.copyWith(color: AppColors.ink),
                textAlign: TextAlign.center,
              ),
              AppSpacing.gapSm,
              Text(
                'S\u00e9lectionnez les photos des personnes avec lesquelles '
                'vous aimeriez aller plus loin.',
                style: AppTypography.bodyMedium.copyWith(
                  color: AppColors.inkMuted,
                ),
                textAlign: TextAlign.center,
              ),
              AppSpacing.gapMd,
            ],
          ),
        ),

        // ── Photo grid ─────────────────────────────────────────────────
        Expanded(
          child: FadeTransition(
            opacity: _fadeAnimation,
            child: GridView.builder(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 2,
                crossAxisSpacing: 12,
                mainAxisSpacing: 12,
                childAspectRatio: 0.75,
              ),
              itemCount: _photos.length,
              itemBuilder: (context, index) {
                final photo = _photos[index];
                final id = photo['id'] as String;
                final photoUrl = photo['photo_nette_url'] as String?;
                final isSelected = _selectedIds.contains(id);

                return _PhotoCard(
                  photoUrl: photoUrl,
                  isSelected: isSelected,
                  onTap: _isSubmitting ? null : () => _toggleSelection(id),
                );
              },
            ),
          ),
        ),

        // ── Submit button ──────────────────────────────────────────────
        Container(
          width: double.infinity,
          padding: EdgeInsets.fromLTRB(
            20,
            12,
            20,
            MediaQuery.of(context).viewPadding.bottom + 16,
          ),
          decoration: BoxDecoration(
            color: AppColors.surface,
            border: Border(
              top: BorderSide(color: AppColors.divider, width: 1),
            ),
          ),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              if (_selectedIds.isNotEmpty)
                Padding(
                  padding: const EdgeInsets.only(bottom: 8),
                  child: Text(
                    '${_selectedIds.length} photo${_selectedIds.length > 1 ? 's' : ''} s\u00e9lectionn\u00e9e${_selectedIds.length > 1 ? 's' : ''}',
                    style: AppTypography.label.copyWith(
                      color: AppColors.violet,
                    ),
                  ),
                ),
              MuqabalaButton(
                label: 'Valider mes choix',
                onPressed: _selectedIds.isEmpty || _isSubmitting
                    ? null
                    : _submitSelections,
                isLoading: _isSubmitting,
                variant: MuqabalaButtonVariant.primary,
                icon: Icons.check_circle_outline_rounded,
              ),
            ],
          ),
        ),
      ],
    );
  }
}

// ══════════════════════════════════════════════════════════════════════════════
// Photo Card
// ══════════════════════════════════════════════════════════════════════════════

class _PhotoCard extends StatelessWidget {
  const _PhotoCard({
    required this.photoUrl,
    required this.isSelected,
    required this.onTap,
  });

  final String? photoUrl;
  final bool isSelected;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 250),
        curve: Curves.easeOutCubic,
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(16),
          border: Border.all(
            color: isSelected
                ? AppColors.violet
                : AppColors.border,
            width: isSelected ? 3 : 1,
          ),
          boxShadow: isSelected
              ? [
                  BoxShadow(
                    color: AppColors.violet.withValues(alpha: 0.25),
                    blurRadius: 16,
                    offset: const Offset(0, 4),
                  ),
                ]
              : [
                  BoxShadow(
                    color: AppColors.shadowLight,
                    blurRadius: 8,
                    offset: const Offset(0, 2),
                  ),
                ],
        ),
        child: ClipRRect(
          borderRadius: BorderRadius.circular(isSelected ? 13 : 15),
          child: Stack(
            fit: StackFit.expand,
            children: [
              // ── Photo ─────────────────────────────────────────────────
              if (photoUrl != null && photoUrl!.isNotEmpty)
                CachedNetworkImage(
                  imageUrl: photoUrl!,
                  fit: BoxFit.cover,
                  placeholder: (_, __) => Container(
                    color: AppColors.violetLight,
                    child: const Center(
                      child: Icon(
                        Icons.person_rounded,
                        size: 48,
                        color: AppColors.violet,
                      ),
                    ),
                  ),
                  errorWidget: (_, __, ___) => Container(
                    color: AppColors.violetLight,
                    child: const Center(
                      child: Icon(
                        Icons.broken_image_outlined,
                        size: 48,
                        color: AppColors.inkMuted,
                      ),
                    ),
                  ),
                )
              else
                Container(
                  color: AppColors.violetLight,
                  child: const Center(
                    child: Icon(
                      Icons.person_rounded,
                      size: 48,
                      color: AppColors.violet,
                    ),
                  ),
                ),

              // ── Selection overlay ─────────────────────────────────────
              if (isSelected)
                Container(
                  color: AppColors.violet.withValues(alpha: 0.15),
                ),

              // ── Check badge ───────────────────────────────────────────
              if (isSelected)
                Positioned(
                  top: 8,
                  right: 8,
                  child: Container(
                    width: 32,
                    height: 32,
                    decoration: BoxDecoration(
                      color: AppColors.violet,
                      shape: BoxShape.circle,
                      boxShadow: [
                        BoxShadow(
                          color: AppColors.violet.withValues(alpha: 0.4),
                          blurRadius: 8,
                        ),
                      ],
                    ),
                    child: const Icon(
                      Icons.check_rounded,
                      color: Colors.white,
                      size: 20,
                    ),
                  ),
                ),
            ],
          ),
        ),
      ),
    );
  }
}
