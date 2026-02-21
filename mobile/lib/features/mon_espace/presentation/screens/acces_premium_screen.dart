/// Acc\u00e8s Premium screen \u2014 dedicated tab for the Premium onglet.
///
/// - If the user is high-ticket: shows [HighTicketHubWidget]
/// - If not: shows [PremiumUpsellWidget]
library;

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import 'package:my_muqabala/core/constants/app_colors.dart';
import 'package:my_muqabala/core/constants/app_typography.dart';
import 'package:my_muqabala/core/widgets/profile_app_bar_action.dart';
import 'package:my_muqabala/features/mon_espace/presentation/widgets/high_ticket_hub_widget.dart';
import 'package:my_muqabala/features/mon_espace/presentation/widgets/premium_upsell_widget.dart';
import 'package:my_muqabala/features/profile/presentation/providers/profile_provider.dart';

/// The "Acc\u00e8s Premium" screen shown in tab index 3 of the bottom navigation.
class AccesPremiumScreen extends ConsumerWidget {
  const AccesPremiumScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
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
          'Acc\u00e8s Premium',
          style: AppTypography.h2.copyWith(
            color: isDark ? AppColors.darkInk : AppColors.ink,
          ),
        ),
        centerTitle: false,
        backgroundColor: isDark ? AppColors.darkBg : AppColors.paper,
        surfaceTintColor: Colors.transparent,
        elevation: 0,
        scrolledUnderElevation: 0.5,
        actions: const [ProfileAppBarAction()],
      ),
      body: isHighTicket
          ? const HighTicketHubWidget()
          : const PremiumUpsellWidget(),
    );
  }
}
