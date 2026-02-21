/// Mon Espace screen — toggle between Documents and Espace Premium.
///
/// Uses a [SegmentedButton] in the app bar bottom to switch between:
///   - **Documents** : the existing documents list
///   - **Espace Premium** : high-ticket hub (or upsell for non-premium users)
library;

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import 'package:my_muqabala/core/constants/app_colors.dart';
import 'package:my_muqabala/core/constants/app_spacing.dart';
import 'package:my_muqabala/core/constants/app_typography.dart';
import 'package:my_muqabala/features/documents/presentation/screens/documents_screen.dart';
import 'package:my_muqabala/features/mon_espace/presentation/widgets/high_ticket_hub_widget.dart';
import 'package:my_muqabala/features/mon_espace/presentation/widgets/premium_upsell_widget.dart';
import 'package:my_muqabala/features/profile/presentation/providers/profile_provider.dart';

/// Segment values for the toggle.
enum _EspaceSegment { documents, premium }

class MonEspaceScreen extends ConsumerStatefulWidget {
  const MonEspaceScreen({super.key});

  @override
  ConsumerState<MonEspaceScreen> createState() => _MonEspaceScreenState();
}

class _MonEspaceScreenState extends ConsumerState<MonEspaceScreen> {
  _EspaceSegment _selectedSegment = _EspaceSegment.documents;

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final profileAsync = ref.watch(currentProfileProvider);
    final isHighTicket = profileAsync.when(
      data: (profile) => profile?.isHighTicket ?? false,
      loading: () => false,
      error: (_, __) => false,
    );

    return Scaffold(
      backgroundColor: isDark ? AppColors.darkBg : AppColors.paper,
      appBar: AppBar(
        title: Text(
          'Mon Espace',
          style: AppTypography.h2.copyWith(
            color: isDark ? AppColors.darkInk : AppColors.ink,
          ),
        ),
        centerTitle: false,
        backgroundColor: isDark ? AppColors.darkBg : AppColors.paper,
        surfaceTintColor: Colors.transparent,
        elevation: 0,
        bottom: PreferredSize(
          preferredSize: const Size.fromHeight(56),
          child: Padding(
            padding: const EdgeInsets.symmetric(
              horizontal: AppSpacing.md,
              vertical: AppSpacing.sm,
            ),
            child: SizedBox(
              width: double.infinity,
              child: SegmentedButton<_EspaceSegment>(
                segments: const [
                  ButtonSegment(
                    value: _EspaceSegment.documents,
                    label: Text('Documents'),
                    icon: Icon(Icons.folder_outlined, size: 18),
                  ),
                  ButtonSegment(
                    value: _EspaceSegment.premium,
                    label: Text('Espace Premium'),
                    icon: Icon(Icons.diamond_outlined, size: 18),
                  ),
                ],
                selected: {_selectedSegment},
                onSelectionChanged: (newSelection) {
                  setState(() {
                    _selectedSegment = newSelection.first;
                  });
                },
                style: ButtonStyle(
                  backgroundColor: WidgetStateProperty.resolveWith((states) {
                    if (states.contains(WidgetState.selected)) {
                      return AppColors.violet.withValues(alpha: 0.15);
                    }
                    return Colors.transparent;
                  }),
                  foregroundColor: WidgetStateProperty.resolveWith((states) {
                    if (states.contains(WidgetState.selected)) {
                      return AppColors.violet;
                    }
                    return isDark ? AppColors.darkInkMuted : AppColors.inkMuted;
                  }),
                ),
              ),
            ),
          ),
        ),
      ),
      body: IndexedStack(
        index: _selectedSegment.index,
        children: [
          const DocumentsBody(),
          if (isHighTicket)
            const HighTicketHubWidget()
          else
            const PremiumUpsellWidget(),
        ],
      ),
    );
  }
}
