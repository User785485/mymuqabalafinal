/// DEPRECATED: RSVP button widget — no longer used.
///
/// The events feature no longer supports direct RSVP. Participant selection
/// is handled by the backend matching algorithm. Users enter the matching
/// pool by completing the compatibility questionnaire.
///
/// This stub is kept to avoid breaking any lingering imports. It renders
/// an empty [SizedBox].
library;

import 'package:flutter/material.dart';

/// Stub widget — returns an empty [SizedBox].
///
/// Previously displayed an RSVP toggle button. Now replaced by the
/// pool / waiting list status section in [EventDetailScreen].
class RsvpButtonWidget extends StatelessWidget {
  const RsvpButtonWidget({
    required this.eventId,
    this.isFullWidth = true,
    super.key,
  });

  final String eventId;
  final bool isFullWidth;

  @override
  Widget build(BuildContext context) => const SizedBox.shrink();
}
