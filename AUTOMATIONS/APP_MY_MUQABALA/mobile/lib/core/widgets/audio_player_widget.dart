/// Simple audio player widget with play/pause, seek bar, and duration display.
///
/// Uses the `just_audio` package for playback.
///
/// ```dart
/// AudioPlayerWidget(
///   url: 'https://example.com/audio.m4a',
///   duration: Duration(seconds: 120),
/// )
/// ```
library;

import 'dart:async';

import 'package:flutter/material.dart';
import 'package:just_audio/just_audio.dart';

import 'package:my_muqabala/core/constants/app_colors.dart';
import 'package:my_muqabala/core/constants/app_spacing.dart';
import 'package:my_muqabala/core/constants/app_typography.dart';
import 'package:my_muqabala/core/utils/logger.dart';

/// A compact audio player with play/pause toggle, progress slider,
/// and elapsed / total duration labels.
class AudioPlayerWidget extends StatefulWidget {
  const AudioPlayerWidget({
    required this.url,
    this.duration,
    this.showDuration = true,
    this.compact = false,
    super.key,
  });

  /// The URL of the audio file to play.
  final String url;

  /// Pre-known total duration. If null, the player will determine it
  /// after loading the audio source.
  final Duration? duration;

  /// Whether to show the elapsed / total duration text.
  final bool showDuration;

  /// When true, renders a smaller layout suitable for list items.
  final bool compact;

  @override
  State<AudioPlayerWidget> createState() => _AudioPlayerWidgetState();
}

class _AudioPlayerWidgetState extends State<AudioPlayerWidget> {
  late final AudioPlayer _player;

  Duration _position = Duration.zero;
  Duration _totalDuration = Duration.zero;
  bool _isLoading = true;
  bool _hasError = false;

  StreamSubscription<Duration>? _positionSub;
  StreamSubscription<Duration?>? _durationSub;
  StreamSubscription<PlayerState>? _stateSub;

  @override
  void initState() {
    super.initState();
    _player = AudioPlayer();
    _initPlayer();
  }

  Future<void> _initPlayer() async {
    try {
      _durationSub = _player.durationStream.listen((d) {
        if (d != null && mounted) {
          setState(() => _totalDuration = d);
        }
      });

      _positionSub = _player.positionStream.listen((p) {
        if (mounted) {
          setState(() => _position = p);
        }
      });

      _stateSub = _player.playerStateStream.listen((state) {
        if (mounted) setState(() {});
        // Auto-rewind when playback completes.
        if (state.processingState == ProcessingState.completed) {
          _player.seek(Duration.zero);
          _player.pause();
        }
      });

      await _player.setUrl(widget.url);

      if (widget.duration != null) {
        _totalDuration = widget.duration!;
      }

      if (mounted) {
        setState(() => _isLoading = false);
      }
    } catch (e, st) {
      AppLogger.error(
        'Failed to load audio: ${widget.url}',
        tag: 'AudioPlayer',
        error: e,
        stackTrace: st,
      );
      if (mounted) {
        setState(() {
          _isLoading = false;
          _hasError = true;
        });
      }
    }
  }

  @override
  void dispose() {
    _positionSub?.cancel();
    _durationSub?.cancel();
    _stateSub?.cancel();
    _player.dispose();
    super.dispose();
  }

  // ── Playback controls ─────────────────────────────────────────────────

  Future<void> _togglePlayPause() async {
    if (_player.playing) {
      await _player.pause();
    } else {
      await _player.play();
    }
  }

  Future<void> _seek(double value) async {
    final position = Duration(
      milliseconds: (value * _totalDuration.inMilliseconds).round(),
    );
    await _player.seek(position);
  }

  // ── Formatting ────────────────────────────────────────────────────────

  String _formatDuration(Duration d) {
    final minutes = d.inMinutes.remainder(60).toString().padLeft(2, '0');
    final seconds = d.inSeconds.remainder(60).toString().padLeft(2, '0');
    if (d.inHours > 0) {
      final hours = d.inHours.toString();
      return '$hours:$minutes:$seconds';
    }
    return '$minutes:$seconds';
  }

  double get _progress {
    if (_totalDuration.inMilliseconds == 0) return 0;
    return (_position.inMilliseconds / _totalDuration.inMilliseconds)
        .clamp(0.0, 1.0);
  }

  @override
  Widget build(BuildContext context) {
    if (_hasError) return _buildError();

    final iconSize = widget.compact ? 32.0 : 40.0;

    return Container(
      padding: EdgeInsets.symmetric(
        horizontal: widget.compact ? AppSpacing.sm : AppSpacing.md,
        vertical: widget.compact ? AppSpacing.xs : AppSpacing.sm,
      ),
      decoration: BoxDecoration(
        color: AppColors.purpleLight.withValues(alpha: 0.3),
        borderRadius: const BorderRadius.all(Radius.circular(12)),
        border: Border.all(color: AppColors.divider),
      ),
      child: Row(
        children: [
          // ── Play / Pause button ──────────────────────────────────
          _buildPlayButton(iconSize),
          const SizedBox(width: 12),

          // ── Slider + duration ────────────────────────────────────
          Expanded(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                _buildSlider(),
                if (widget.showDuration) ...[
                  const SizedBox(height: 2),
                  _buildDurationLabels(),
                ],
              ],
            ),
          ),
        ],
      ),
    );
  }

  // ── Sub-builders ──────────────────────────────────────────────────────

  Widget _buildPlayButton(double size) {
    if (_isLoading) {
      return SizedBox(
        width: size,
        height: size,
        child: const Padding(
          padding: EdgeInsets.all(8),
          child: CircularProgressIndicator(
            strokeWidth: 2.5,
            valueColor: AlwaysStoppedAnimation<Color>(AppColors.purple),
          ),
        ),
      );
    }

    final isPlaying = _player.playing;

    return GestureDetector(
      onTap: _togglePlayPause,
      child: Container(
        width: size,
        height: size,
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            colors: [AppColors.purple, Color(0xFF9333EA)],
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          ),
          shape: BoxShape.circle,
        ),
        child: Icon(
          isPlaying ? Icons.pause_rounded : Icons.play_arrow_rounded,
          color: Colors.white,
          size: size * 0.55,
        ),
      ),
    );
  }

  Widget _buildSlider() {
    return SliderTheme(
      data: SliderThemeData(
        activeTrackColor: AppColors.purple,
        inactiveTrackColor: AppColors.divider,
        thumbColor: AppColors.purple,
        thumbShape: const RoundSliderThumbShape(enabledThumbRadius: 6),
        trackHeight: 3,
        overlayColor: AppColors.purple.withValues(alpha: 0.12),
        overlayShape: const RoundSliderOverlayShape(overlayRadius: 14),
      ),
      child: Slider(
        value: _progress,
        onChanged: _isLoading ? null : _seek,
      ),
    );
  }

  Widget _buildDurationLabels() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(
          _formatDuration(_position),
          style: AppTypography.labelSmall.copyWith(
            color: AppColors.inkMuted,
            fontFeatures: const [FontFeature.tabularFigures()],
          ),
        ),
        Text(
          _formatDuration(_totalDuration),
          style: AppTypography.labelSmall.copyWith(
            color: AppColors.inkMuted,
            fontFeatures: const [FontFeature.tabularFigures()],
          ),
        ),
      ],
    );
  }

  Widget _buildError() {
    return Container(
      padding: const EdgeInsets.symmetric(
        horizontal: AppSpacing.md,
        vertical: AppSpacing.sm,
      ),
      decoration: BoxDecoration(
        color: AppColors.roseLight,
        borderRadius: const BorderRadius.all(Radius.circular(12)),
        border: Border.all(color: AppColors.rose.withValues(alpha: 0.5)),
      ),
      child: Row(
        children: [
          const Icon(
            Icons.error_outline_rounded,
            color: AppColors.roseDeep,
            size: 20,
          ),
          const SizedBox(width: 8),
          Expanded(
            child: Text(
              'Impossible de charger l\'audio',
              style: AppTypography.bodySmall.copyWith(
                color: AppColors.roseDeep,
              ),
            ),
          ),
          GestureDetector(
            onTap: () {
              setState(() {
                _hasError = false;
                _isLoading = true;
              });
              _initPlayer();
            },
            child: const Icon(
              Icons.refresh_rounded,
              color: AppColors.roseDeep,
              size: 20,
            ),
          ),
        ],
      ),
    );
  }
}
