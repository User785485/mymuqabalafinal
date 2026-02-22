#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
TranscriberUltra - Module d'Optimisation Ultra-Rapide pour WhatsApp Extractor V2
Version 1.0.0 - Optimisé pour 2 clés API
Compatible avec l'interface existante - Drop-in replacement
"""

import os
import json
import time
import logging
import asyncio
import aiohttp
import openai
from typing import List, Dict, Optional, Tuple
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import datetime
import threading
import queue
import subprocess
from collections import OrderedDict
from utils import normalize_contact_name_for_filesystem
from concurrent.futures import ThreadPoolExecutor, as_completed

# Import OpenAI
try:
    from openai import OpenAI
except ImportError:
    print("ERREUR: OpenAI non installé. Exécutez: pip install openai")
    sys.exit(1)

# Configuration du logger
logger = logging.getLogger('whatsapp_extractor')  # Utiliser le même logger que le système principal

# =============================================================================
# UTILITAIRES DE NORMALISATION DES NOMS
# =============================================================================

# =============================================================================
# COMPRESSION AUDIO POUR OPTIMISATION WHISPER API
# =============================================================================

def get_ffmpeg_path() -> str:
    """Trouve le chemin FFmpeg disponible"""
    ffmpeg_paths = [
        'ffmpeg',  # PATH système
        os.path.join(os.path.dirname(os.path.dirname(__file__)), 'ffmpeg', 'bin', 'ffmpeg.exe'),
        os.path.join(os.getcwd(), 'ffmpeg', 'bin', 'ffmpeg.exe'),
    ]

    for ffmpeg_path in ffmpeg_paths:
        try:
            result = subprocess.run([ffmpeg_path, '-version'],
                                  capture_output=True,
                                  timeout=5)
            if result.returncode == 0:
                return ffmpeg_path
        except:
            continue

    return None


def compress_audio_for_whisper(input_path: str, output_path: str = None) -> Tuple[str, bool]:
    """
    Compresse un fichier audio pour optimiser l'envoi à Whisper API.

    Paramètres optimaux basés sur la recherche:
    - Bitrate: 16 kbps (suffisant pour speech, réduit ~4-5x la taille)
    - Sample rate: 16 kHz (Whisper downsample à 16k internement)
    - Channels: Mono (la voix n'a pas besoin de stéréo)

    Args:
        input_path: Chemin du fichier audio original
        output_path: Chemin de sortie (optionnel, génère automatiquement)

    Returns:
        Tuple (chemin_fichier_compressé, succès)
    """
    if not os.path.exists(input_path):
        logger.error(f"❌ Fichier source introuvable: {input_path}")
        return input_path, False

    # Générer le chemin de sortie si non spécifié
    if output_path is None:
        base, ext = os.path.splitext(input_path)
        output_path = f"{base}_compressed.mp3"

    # Trouver FFmpeg
    ffmpeg_path = get_ffmpeg_path()
    if not ffmpeg_path:
        logger.warning("⚠️ FFmpeg non trouvé - pas de compression")
        return input_path, False

    # Taille originale
    original_size = os.path.getsize(input_path) / (1024 * 1024)  # MB

    # Si fichier déjà petit (< 5 MB), pas besoin de compresser
    if original_size < 5:
        logger.info(f"⏭️ Fichier déjà petit ({original_size:.1f}MB) - pas de compression nécessaire")
        return input_path, True

    logger.info(f"🔄 COMPRESSION: {os.path.basename(input_path)} ({original_size:.1f}MB)")
    logger.info(f"   Paramètres: 16kbps, 16kHz, mono")

    try:
        # Commande FFmpeg optimisée pour Whisper
        cmd = [
            ffmpeg_path,
            '-y',                    # Écraser si existe
            '-i', input_path,        # Fichier source
            '-vn',                   # Pas de vidéo
            '-ar', '16000',          # Sample rate 16kHz (natif Whisper)
            '-ac', '1',              # Mono
            '-b:a', '16k',           # Bitrate 16 kbps (optimal pour speech)
            '-acodec', 'libmp3lame', # Codec MP3
            output_path
        ]

        start_time = time.time()
        result = subprocess.run(
            cmd,
            capture_output=True,
            timeout=120,  # 2 minutes max pour compression
            encoding='utf-8',
            errors='ignore'
        )
        compression_time = time.time() - start_time

        if result.returncode == 0 and os.path.exists(output_path):
            compressed_size = os.path.getsize(output_path) / (1024 * 1024)  # MB
            ratio = original_size / compressed_size if compressed_size > 0 else 0

            logger.info(f"✅ COMPRESSION RÉUSSIE!")
            logger.info(f"   📊 {original_size:.1f}MB → {compressed_size:.1f}MB (ratio {ratio:.1f}x)")
            logger.info(f"   ⏱️ Temps: {compression_time:.1f}s")

            return output_path, True
        else:
            logger.error(f"❌ Échec compression: {result.stderr[:200] if result.stderr else 'Erreur inconnue'}")
            return input_path, False

    except subprocess.TimeoutExpired:
        logger.error("❌ Timeout compression (>2min)")
        return input_path, False
    except Exception as e:
        logger.error(f"❌ Erreur compression: {e}")
        return input_path, False


# =============================================================================
# GESTIONNAIRE DE POOL D'API (Optimisé pour 2 clés)
# =============================================================================

class APIPoolManager:
    """
    Gestionnaire intelligent du pool de clés API
    Optimisé pour rotation entre 2 clés API
    """

    def __init__(self, config):
        self.config = config
        self.api_keys = []
        self.clients = {}
        self.health_scores = {}
        self.usage_stats = {}
        self.lock = threading.RLock()
        self.current_key_index = 0

        # Charger les clés depuis plusieurs sources
        self._load_api_keys()
        self._initialize_clients()

    def _load_api_keys(self):
        """Charge les clés API depuis config et fichier externe"""
        keys_set = set()

        # 1. Charger la clé principale depuis config.ini
        try:
            main_key = self.config.get('API', 'openai_key', fallback='')
            if main_key and main_key.startswith('sk-'):
                keys_set.add(main_key)
                logger.info("✅ Clé principale chargée depuis config.ini")
        except Exception as e:
            logger.warning(f"Erreur chargement config: {e}")

        # 2. Charger la clé depuis api_keys.txt (en évitant les doublons)
        api_keys_file = 'api_keys.txt'
        if os.path.exists(api_keys_file):
            try:
                with open(api_keys_file, 'r', encoding='utf-8') as f:
                    for line in f:
                        line = line.strip()
                        if line and line.startswith('sk-') and not line.startswith('#'):
                            keys_set.add(line)
                logger.info(f"✅ Clés chargées depuis {api_keys_file}")
            except Exception as e:
                logger.warning(f"Erreur lecture {api_keys_file}: {e}")

        self.api_keys = list(keys_set)

        logger.info("\n" + "="*70)
        logger.info("🔑 DÉTECTION DES CLÉS API")
        logger.info("="*70)
        logger.info(f"📋 Nombre de clés uniques trouvées: {len(self.api_keys)}")

        for i, key in enumerate(self.api_keys, 1):
            # Afficher les clés de manière sécurisée
            logger.info(f"   Clé {i}: {key[:20]}...{key[-4:]}")

        if len(self.api_keys) == 0:
            raise ValueError("❌ ERREUR: Aucune clé API trouvée!")
        elif len(self.api_keys) == 1:
            logger.warning("⚠️ Une seule clé détectée - Performance limitée")
            logger.warning("   → 3 fichiers/minute maximum")
            logger.warning("   → Ajoutez plus de clés dans api_keys.txt pour améliorer")
        else:
            logger.info(f"✅ {len(self.api_keys)} clés actives!")
            logger.info(f"⚡ Vitesse estimée: ~{len(self.api_keys) * 3} fichiers/minute")
        logger.info("="*70)

    def _initialize_clients(self):
        """Initialise un client OpenAI pour chaque clé"""
        for i, key in enumerate(self.api_keys):
            try:
                client = OpenAI(api_key=key)
                self.clients[key] = client
                self.health_scores[key] = 100  # Score initial
                self.usage_stats[key] = {
                    'requests': 0,
                    'successes': 0,
                    'failures': 0,
                    'last_used': None,
                    'rate_limited': False,
                    'rate_limit_reset': None
                }
                logger.debug(f"Client {i+1} initialisé")
            except Exception as e:
                logger.error(f"Échec init client {i+1}: {e}")

    def get_best_client(self) -> Tuple[Optional[str], Optional[OpenAI]]:
        """Sélectionne le meilleur client disponible avec rotation intelligente"""
        with self.lock:
            if not self.api_keys:
                return None, None

            # Avec 1-2 clés, stratégie simple de rotation
            attempts = 0
            while attempts < len(self.api_keys):
                key = self.api_keys[self.current_key_index]
                stats = self.usage_stats[key]

                # Vérifier si la clé est rate limited
                if stats['rate_limited']:
                    if stats['rate_limit_reset'] and time.time() < stats['rate_limit_reset']:
                        # Encore en rate limit, essayer la suivante
                        self.current_key_index = (self.current_key_index + 1) % len(self.api_keys)
                        attempts += 1
                        continue
                    else:
                        # Rate limit expiré
                        stats['rate_limited'] = False
                        stats['rate_limit_reset'] = None

                # Cette clé est disponible
                stats['last_used'] = time.time()
                stats['requests'] += 1

                # Rotation pour la prochaine fois (si plusieurs clés)
                if len(self.api_keys) > 1:
                    self.current_key_index = (self.current_key_index + 1) % len(self.api_keys)

                return key, self.clients[key]

            # Aucune clé disponible
            logger.warning("⚠️ Toutes les clés API sont rate limited!")
            return None, None

    def update_client_health(self, key: str, success: bool, error_type: str = None):
        """Met à jour le score de santé d'une clé"""
        with self.lock:
            if key not in self.usage_stats:
                return

            stats = self.usage_stats[key]

            if success:
                stats['successes'] += 1
                self.health_scores[key] = min(100, self.health_scores[key] + 5)
            else:
                stats['failures'] += 1

                if error_type == 'rate_limit':
                    stats['rate_limited'] = True
                    stats['rate_limit_reset'] = time.time() + 60  # 1 minute
                    self.health_scores[key] -= 30
                elif error_type == 'quota_exceeded':
                    self.health_scores[key] = 0
                else:
                    self.health_scores[key] = max(0, self.health_scores[key] - 10)

    def get_stats(self) -> Dict:
        """Retourne les statistiques du pool"""
        with self.lock:
            total_requests = sum(s['requests'] for s in self.usage_stats.values())
            total_successes = sum(s['successes'] for s in self.usage_stats.values())
            active_keys = sum(1 for k in self.api_keys if self.health_scores.get(k, 0) > 0)

            return {
                'total_keys': len(self.api_keys),
                'active_keys': active_keys,
                'total_requests': total_requests,
                'total_successes': total_successes,
                'success_rate': (total_successes / total_requests * 100) if total_requests > 0 else 0
            }

# =============================================================================
# CHUNKER INTELLIGENT (Résout le problème des fichiers >25MB)
# =============================================================================

class SmartChunker:
    """
    Système de chunking adaptatif pour fichiers audio
    Résout le problème critique des fichiers >25MB qui causent 30% d'erreurs
    """

    def __init__(self, config):
        self.config = config
        self.ffmpeg_path = self._get_ffmpeg_path()
        self.max_size_mb = 20  # Limite de sécurité (OpenAI = 25MB)
        self.target_chunk_size_mb = 10  # Taille cible des chunks
        self.temp_dir = os.path.join(os.getcwd(), 'temp_chunks')

    def _get_ffmpeg_path(self):
        """Trouve le chemin FFmpeg depuis la config"""
        # D'abord essayer depuis la config
        ffmpeg_path = self.config.get('Conversion', 'ffmpeg_path',
                                     fallback='ffmpeg')

        # Vérifier si le chemin existe
        if os.path.exists(ffmpeg_path):
            return ffmpeg_path

        # Essayer le dossier ffmpeg local
        local_ffmpeg = os.path.join(os.getcwd(), 'ffmpeg', 'bin', 'ffmpeg.exe')
        if os.path.exists(local_ffmpeg):
            return local_ffmpeg

        # Fallback sur ffmpeg dans PATH
        return 'ffmpeg'

    def needs_chunking(self, file_path: str) -> bool:
        """Détermine si un fichier nécessite un chunking"""
        try:
            size_mb = os.path.getsize(file_path) / (1024 * 1024)
            return size_mb > self.max_size_mb
        except:
            return False

    def chunk_audio(self, file_path: str) -> List[str]:
        """
        Découpe un fichier audio en chunks intelligents
        Retourne la liste des chemins des chunks
        """
        if not self.needs_chunking(file_path):
            return [file_path]

        logger.info(f"🔪 Chunking nécessaire pour {os.path.basename(file_path)}")

        # Créer le dossier temporaire
        os.makedirs(self.temp_dir, exist_ok=True)

        # Nom de base pour les chunks
        base_name = os.path.splitext(os.path.basename(file_path))[0]

        # Calculer le nombre de chunks nécessaires
        file_size_mb = os.path.getsize(file_path) / (1024 * 1024)
        num_chunks = int(file_size_mb / self.target_chunk_size_mb) + 1

        chunks = []

        # Créer les chunks avec FFmpeg
        for i in range(num_chunks):
            chunk_path = os.path.join(self.temp_dir, f"{base_name}_chunk_{i:03d}.mp3")

            # Commande FFmpeg pour extraire un segment
            # Utilise la segmentation par durée approximative
            cmd = [
                self.ffmpeg_path,
                '-i', file_path,
                '-f', 'segment',
                '-segment_time', str(300),  # 5 minutes par chunk
                '-c', 'copy',
                '-segment_start_number', str(i),
                '-vn',  # Pas de vidéo
                chunk_path
            ]

            try:
                # Alternative: découpage simple par taille
                # Pour éviter les problèmes de segmentation
                duration_per_chunk = self._get_duration_for_chunks(file_path, num_chunks)

                cmd = [
                    self.ffmpeg_path,
                    '-i', file_path,
                    '-ss', str(i * duration_per_chunk),
                    '-t', str(duration_per_chunk),
                    '-acodec', 'mp3',
                    '-ab', '128k',
                    '-y',
                    chunk_path
                ]

                result = subprocess.run(cmd, capture_output=True, text=True,
                                      encoding='utf-8', errors='ignore')

                if os.path.exists(chunk_path) and os.path.getsize(chunk_path) > 0:
                    chunks.append(chunk_path)
                    logger.info(f"  ✅ Chunk {i+1}/{num_chunks} créé")

            except Exception as e:
                logger.error(f"Erreur création chunk {i}: {e}")

        return chunks if chunks else [file_path]

    def _get_duration_for_chunks(self, file_path: str, num_chunks: int) -> float:
        """Calcule la durée approximative par chunk"""
        try:
            # Commande pour obtenir la durée
            cmd = [
                self.ffmpeg_path,
                '-i', file_path,
                '-hide_banner'
            ]

            result = subprocess.run(cmd, capture_output=True, text=True,
                                  encoding='utf-8', errors='ignore', timeout=5)

            # Parser la durée depuis stderr
            import re
            duration_match = re.search(r'Duration: (\d{2}):(\d{2}):(\d{2})', result.stderr)
            if duration_match:
                hours = int(duration_match.group(1))
                minutes = int(duration_match.group(2))
                seconds = int(duration_match.group(3))
                total_duration = hours * 3600 + minutes * 60 + seconds
                return total_duration / num_chunks
        except:
            pass

        # Fallback: 5 minutes par chunk
        return 300

    def cleanup_chunks(self):
        """Nettoie tous les fichiers chunks temporaires"""
        try:
            if os.path.exists(self.temp_dir):
                import shutil
                shutil.rmtree(self.temp_dir)
                logger.debug("Chunks temporaires nettoyés")
        except Exception as e:
            logger.warning(f"Erreur nettoyage chunks: {e}")

# =============================================================================
# CACHE DE TRANSCRIPTIONS
# =============================================================================

class TranscriptionCache:
    """
    Cache LRU pour les transcriptions
    Évite de re-transcrire les mêmes fichiers
    """

    def __init__(self, max_size_mb=2000):  # Augmenté à 2GB pour éviter toute suppression de cache
        self.max_size_mb = max_size_mb  # Stocker pour l'affichage
        self.max_size_bytes = max_size_mb * 1024 * 1024
        self.cache = OrderedDict()
        self.cache_file = '.transcription_cache.json'
        self.current_size = 0
        self.hits = 0
        self.misses = 0
        self.lock = threading.RLock()

        # Charger le cache existant
        self._load_cache()

    def _load_cache(self):
        """Charge le cache depuis le disque"""
        if os.path.exists(self.cache_file):
            try:
                with open(self.cache_file, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                    # Limiter la taille lors du chargement (augmenté 100→500 pour gérer 373 entrées actuelles)
                    for key, value in list(data.items())[:500]:
                        self.cache[key] = value
                        self.current_size += len(value.get('text', '').encode('utf-8'))
                logger.info(f"📦 [CACHE] Chargé: {len(self.cache)} entrées ({self.current_size / (1024*1024):.2f} MB)")
            except Exception as e:
                logger.warning(f"⚠️ [CACHE] Erreur chargement ({e}), création nouveau cache")

    def get(self, file_hash: str) -> Optional[str]:
        """Récupère une transcription du cache"""
        with self.lock:
            if file_hash in self.cache:
                self.hits += 1
                self.cache.move_to_end(file_hash)  # LRU
                return self.cache[file_hash].get('text')
            self.misses += 1
            return None

    def put(self, file_hash: str, transcription: str):
        """Ajoute une transcription au cache"""
        with self.lock:
            entry_size = len(transcription.encode('utf-8'))

            # Éviction LRU si nécessaire
            while self.current_size + entry_size > self.max_size_bytes and self.cache:
                oldest_key = next(iter(self.cache))
                oldest_size = len(self.cache[oldest_key].get('text', '').encode('utf-8'))
                del self.cache[oldest_key]
                self.current_size -= oldest_size

            # Ajouter la nouvelle entrée
            self.cache[file_hash] = {
                'text': transcription,
                'timestamp': datetime.now().isoformat()
            }
            self.current_size += entry_size

    def save(self):
        """Sauvegarde le cache sur disque"""
        try:
            with self.lock:
                with open(self.cache_file, 'w', encoding='utf-8') as f:
                    json.dump(dict(self.cache), f, ensure_ascii=False)
        except Exception as e:
            logger.error(f"Erreur sauvegarde cache: {e}")

    def get_stats(self) -> Dict:
        """Retourne les statistiques du cache"""
        with self.lock:
            hit_rate = (self.hits / (self.hits + self.misses) * 100) if (self.hits + self.misses) > 0 else 0
            return {
                'entries': len(self.cache),
                'size_mb': self.current_size / (1024 * 1024),
                'hits': self.hits,
                'misses': self.misses,
                'hit_rate': hit_rate
            }

# =============================================================================
# CLASSE PRINCIPALE TRANSCRIBER ULTRA
# =============================================================================

class TranscriberUltra:
    """
    Transcripteur Ultra-Optimisé pour WhatsApp Extractor V2
    Drop-in replacement avec interface 100% compatible
    Optimisé pour 2 clés API avec chunking intelligent et cache
    """

    def __init__(self, config, registry, file_manager):
        """
        Initialisation IDENTIQUE aux autres transcripteurs
        Garantit la compatibilité totale avec le système existant
        """
        self.config = config
        self.registry = registry
        self.file_manager = file_manager

        # Logger
        self.logger = logging.getLogger('whatsapp_extractor')

        # Composants d'optimisation
        self.api_pool = APIPoolManager(config)
        self.chunker = SmartChunker(config)
        self.cache = TranscriptionCache()

        # Configuration optimisée pour 2 clés
        # Avec 2 clés: 4-6 workers optimaux
        self.max_workers = min(6, len(self.api_pool.api_keys) * 3)
        self.max_transcriptions = config.getint('Processing', 'max_transcriptions', fallback=0)
        
        # Mode de transcription forcée (pour compatibilité)
        self.force_transcription = config.getboolean('Processing', 'force_transcription', fallback=False)

        # DEDUPLICATION: Flag pour activer/désactiver la déduplication des sources
        self.enable_source_deduplication = config.getboolean('Processing', 'enable_source_deduplication', fallback=True)

        # Statistiques
        self.stats = {
            'start_time': 0,
            'files_processed': 0,
            'files_cached': 0,
            'files_skipped': 0,
            'files_assembled_from_cache': 0,  # DEDUP: SuperFiles assemblés depuis cache
            'source_cache_hits': 0,            # DEDUP: Nombre de sources trouvées en cache
            'chunks_created': 0,
            'api_calls': 0,
            'errors': 0
        }

        logger.info("\n" + "="*70)
        logger.info("⚡ TRANSCRIBER ULTRA INITIALISÉ - MODE OPTIMISATION MAXIMALE")
        logger.info("="*70)
        logger.info(f"🔑 Clés API détectées: {len(self.api_pool.api_keys)}")
        if len(self.api_pool.api_keys) == 1:
            logger.warning("⚠️  Une seule clé détectée - Performance limitée à 3 fichiers/minute")
        else:
            logger.info(f"✅ {len(self.api_pool.api_keys)} clés actives - Performance x{len(self.api_pool.api_keys)}")
        logger.info(f"👷 Workers parallèles: {self.max_workers}")
        logger.info(f"💾 Cache: Activé ({self.cache.max_size_mb}MB)")
        logger.info(f"🔪 Chunking: Activé pour fichiers >20MB")
        logger.info(f"🎯 Déduplication sources: {'Activé' if self.enable_source_deduplication else 'Désactivé'}")
        logger.info("="*70)

    def transcribe_all(self, conversations: Dict[str, List[Dict]]) -> Dict[str, int]:
        """
        MÉTHODE PRINCIPALE - Interface IDENTIQUE pour compatibilité
        Cette méthode est appelée par le workflow principal
        """
        self.stats['start_time'] = time.time()

        logger.info("\n" + "#"*70)
        logger.info("# 🚀 DÉBUT TRANSCRIPTION ULTRA")
        logger.info("#"*70)
        logger.info(f"🔑 Clés API: {len(self.api_pool.api_keys)}")
        logger.info(f"📂 Conversations: {len(conversations)} contacts")

        # LOGS DÉTAILLÉS POUR DÉBUGGER
        logger.info("\n🔥 MODE DEBUG TRANSCRIPTION")
        logger.info(f"📍 Registry path: {self.registry.registry_path}")
        if os.path.exists(self.registry.registry_path):
            with open(self.registry.registry_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
                trans_count = len(data.get('transcriptions', {}))
                logger.info(f"   📊 Transcriptions existantes dans registry: {trans_count}")
        else:
            logger.info(f"   ⚠️ Registry VIDE - Toutes les transcriptions seront faites!")

        # Logger les contacts pour debug
        for contact_name in conversations.keys():
            logger.info(f"   Contact: {contact_name}")

        logger.info("\n" + "="*70)
        logger.info("📋 PHASE 1: DÉCOUVERTE DES FICHIERS")
        logger.info("="*70)

        # Extraire tous les fichiers SuperAudio à traiter
        super_files = self._get_super_files_from_conversations(conversations)

        if not super_files:
            logger.warning("❌ Aucun fichier SuperAudio/SUPER_FICHIERS trouvé à transcrire")
            logger.warning("Vérifiez que les fichiers audio ont été créés dans l'étape précédente")
            logger.warning("Certains contacts avec caractères spéciaux peuvent avoir échoué")
            # Ne pas bloquer complètement, continuer avec ce qu'on a
            return {'transcribed': 0, 'failed': 0, 'warning': 'Aucun fichier trouvé'}

        logger.info(f"\n📁 RÉSULTAT: {len(super_files)} fichiers SuperAudio trouvés au total")

        logger.info("\n" + "="*70)
        logger.info("📋 PHASE 2: FILTRAGE ET PRÉPARATION AVEC DÉDUPLICATION")
        logger.info("="*70)

        # Filtrer les fichiers avec déduplication avancée
        # Retourne: (to_transcribe, to_assemble)
        files_to_transcribe, files_to_assemble = self._filter_already_transcribed(super_files)

        total_to_process = len(files_to_transcribe) + len(files_to_assemble)
        logger.info(f"🎯 {len(files_to_transcribe)} fichiers à transcrire (API)")
        logger.info(f"🔄 {len(files_to_assemble)} fichiers à assembler (cache sources)")
        logger.info(f"⏭️  {len(super_files) - total_to_process} fichiers déjà transcrits (skip)")

        if not files_to_transcribe and not files_to_assemble:
            logger.info("✨ Tous les fichiers sont déjà transcrits!")
            return {'transcribed': 0, 'failed': 0, 'skipped': len(super_files)}

        # Limiter si configuré (seulement les fichiers à transcrire)
        if self.max_transcriptions > 0 and len(files_to_transcribe) > self.max_transcriptions:
            logger.info(f"⚠️ Limitation à {self.max_transcriptions} fichiers")
            files_to_transcribe = files_to_transcribe[:self.max_transcriptions]

        # Optimiser l'ordre de traitement (petits fichiers d'abord)
        files_to_transcribe = self._optimize_processing_order(files_to_transcribe)

        # Préparer les éléments de travail avec chunking si nécessaire
        work_items = self._prepare_work_items(files_to_transcribe)
        logger.info(f"📦 {len(work_items)} éléments de travail préparés pour transcription")

        # Exécuter les transcriptions en parallèle (Phase 1) puis assemblage (Phase 2)
        results = self._execute_parallel_transcription(work_items, files_to_assemble)

        # Sauvegarder le cache
        self.cache.save()

        # Nettoyer les chunks temporaires
        self.chunker.cleanup_chunks()

        # Statistiques finales
        self._print_statistics()

        # Retour compatible avec le système existant
        return {
            'transcribed': self.stats['files_processed'],
            'failed': self.stats['errors'],
            'cached': self.stats['files_cached'],
            'skipped': self.stats['files_skipped']
        }

    def _create_normalized_super_files(self, contact: str, contact_dir: str) -> List[str]:
        """
        Crée des SuperFiles avec noms normalisés pour contourner les problèmes d'encodage
        """
        logger.info(f"🔧 [NORMALIZE] Création SuperFiles normalisés pour {contact}")

        # Obtenir le nom normalisé
        normalized_name = normalize_contact_name_for_filesystem(contact)

        logger.info(f"📝 [NORMALIZE] '{contact}' → '{normalized_name}'")

        # Chercher les fichiers MP3 individuels dans le dossier audio
        audio_dirs = [
            os.path.join(contact_dir, 'media_recus', 'audio'),
            os.path.join(contact_dir, 'audio'),
            os.path.join(contact_dir, 'Audio')
        ]

        mp3_files = []
        for audio_dir in audio_dirs:
            if os.path.exists(audio_dir):
                logger.info(f"🔍 [NORMALIZE] Scan audio: {audio_dir}")
                for file in os.listdir(audio_dir):
                    if file.endswith('.mp3'):
                        mp3_path = os.path.join(audio_dir, file)
                        if os.path.isfile(mp3_path):
                            mp3_files.append(mp3_path)

        if not mp3_files:
            logger.warning(f"❌ [NORMALIZE] Aucun fichier MP3 trouvé pour {contact}")
            return []

        logger.info(f"📊 [NORMALIZE] {len(mp3_files)} fichiers MP3 trouvés")

        # Créer le dossier SuperAudio normalisé
        super_audio_dir = os.path.join(contact_dir, 'SuperAudio')
        os.makedirs(super_audio_dir, exist_ok=True)

        # Créer un SuperFile avec nom normalisé
        super_file_path = os.path.join(super_audio_dir, f"{normalized_name}_received_2025-09.mp3")

        try:
            # Créer le fichier liste pour FFmpeg avec chemins corrects
            filelist_path = super_file_path + ".txt"
            with open(filelist_path, 'w', encoding='utf-8') as f:
                for mp3_file in mp3_files[:15]:  # Limiter à 15 fichiers pour éviter les gros SuperFiles
                    # Échapper les chemins pour FFmpeg
                    escaped_path = mp3_file.replace('\\', '/')
                    f.write(f"file '{escaped_path}'\n")

            # NOUVELLE APPROCHE : Utiliser Python pour concaténer les MP3 directement
            logger.info(f"🚀 [NORMALIZE] Création SuperFile: {os.path.basename(super_file_path)}")

            try:
                # Concaténer les MP3 avec Python (plus simple que FFmpeg)
                with open(super_file_path, 'wb') as outfile:
                    for mp3_file in mp3_files[:15]:  # Limiter à 15 fichiers
                        if os.path.exists(mp3_file):
                            with open(mp3_file, 'rb') as infile:
                                outfile.write(infile.read())
                            logger.debug(f"   Ajouté: {os.path.basename(mp3_file)}")

                # Vérifier que le fichier est créé
                if os.path.exists(super_file_path) and os.path.getsize(super_file_path) > 0:
                    file_size = os.path.getsize(super_file_path) / (1024*1024)
                    logger.info(f"✅ [NORMALIZE] SuperFile créé avec succès: {os.path.basename(super_file_path)} ({file_size:.2f}MB)")

                    # Nettoyer le fichier liste
                    try:
                        os.remove(filelist_path)
                    except:
                        pass

                    return [super_file_path]
                else:
                    logger.error(f"❌ [NORMALIZE] Échec création fichier vide")
                    return []

            except Exception as e:
                logger.error(f"❌ [NORMALIZE] Erreur concaténation: {e}")
                return []

        except Exception as e:
            logger.error(f"❌ [NORMALIZE] Erreur création SuperFile: {e}")
            return []

    def _get_super_files_from_conversations(self, conversations: Dict) -> List[str]:
        """Extrait tous les fichiers SuperAudio des conversations"""
        super_files = []

        logger.info(f"⚡ [ULTRA] Recherche des SuperFiles pour {len(conversations)} contacts")

        for contact in conversations.keys():
            logger.info(f"📂 [ULTRA] Traitement contact: {contact}")

            try:
                # 🚨 NORMALISATION AUTOMATIQUE - ZÉRO PERTE DE LEADS
                # Chercher les SuperFiles dans BOTH répertoires: original ET normalisé
                safe_contact = normalize_contact_name_for_filesystem(contact)
                
                # Construire le chemin vers le dossier SuperAudio du contact ORIGINAL
                paths = self.file_manager.setup_contact_directory(contact)
                contact_dir = paths['root']
                
                # Construire AUSSI le chemin vers le dossier SuperAudio NORMALISÉ
                safe_paths = self.file_manager.setup_contact_directory(safe_contact)
                safe_contact_dir = safe_paths['root']

                logger.info(f"📍 [ULTRA] Répertoire contact original: {contact_dir}")
                if safe_contact != contact:
                    logger.info(f"📍 [ULTRA] Répertoire contact normalisé: {safe_contact_dir}")

                # Chercher dans TOUS les répertoires possibles (original + normalisé)
                dirs_to_check = [
                    # Répertoires avec nom original
                    os.path.join(contact_dir, 'SuperAudio'),
                    os.path.join(contact_dir, 'SUPER_FICHIERS'),
                    paths.get('super_files', ''),
                    paths.get('SuperAudio', ''),
                    # Répertoires avec nom normalisé (pour les nouveaux SuperFiles)
                    os.path.join(safe_contact_dir, 'SuperAudio'),
                    os.path.join(safe_contact_dir, 'SUPER_FICHIERS'),
                    safe_paths.get('super_files', ''),
                    safe_paths.get('SuperAudio', '')
                ]

                files_found_for_contact = 0
                for super_dir in dirs_to_check:
                    if super_dir and os.path.exists(super_dir):
                        logger.info(f"🔍 [ULTRA] Scan du dossier: {super_dir}")
                        logger.info(f"   Dossier existe: {os.path.isdir(super_dir)}")
                        try:
                            files_in_dir = os.listdir(super_dir)
                            logger.info(f"📊 [ULTRA] {len(files_in_dir)} fichiers trouvés dans {os.path.basename(super_dir)}")

                            # Logger tous les fichiers pour debug
                            for f in files_in_dir:
                                logger.debug(f"   Fichier trouvé: {f}")

                            # FILTRE DIRECTION: Vérifier si on doit transcrire les fichiers envoyés
                            transcribe_sent = self.config.getboolean('Processing', 'transcribe_sent', fallback=False)

                            for file in files_in_dir:
                                if file.endswith('.mp3') and not file.endswith('.mp3.txt'):
                                    # NOUVEAU: Filtrer par direction si transcribe_sent=False
                                    if not transcribe_sent and '_sent_' in file.lower():
                                        logger.info(f"[SKIP] Fichier SENT ignoré (transcribe_sent=False): {file}")
                                        continue

                                    file_path = os.path.join(super_dir, file)
                                    # Vérifier que le fichier existe réellement
                                    if os.path.isfile(file_path):
                                        if file_path not in super_files:  # Éviter doublons
                                            super_files.append(file_path)
                                            files_found_for_contact += 1
                                            try:
                                                size_mb = os.path.getsize(file_path) / (1024*1024)
                                                logger.info(f"✅ [ULTRA] SuperFile ajouté: {file} ({size_mb:.2f}MB)")
                                                logger.info(f"   Chemin complet: {file_path}")
                                            except:
                                                logger.info(f"✅ [ULTRA] SuperFile ajouté: {file}")
                                    else:
                                        logger.warning(f"   Fichier MP3 trouvé mais pas accessible: {file_path}")
                        except Exception as e:
                            logger.error(f"❌ [ULTRA] Erreur lecture {super_dir}: {e}")
                            import traceback
                            logger.error(traceback.format_exc())

                if files_found_for_contact == 0:
                    logger.warning(f"⚠️ [ULTRA] Aucun SuperFile trouvé pour {contact}")

                    # NOUVELLE STRATÉGIE: Créer des SuperFiles avec noms normalisés
                    logger.info(f"🔧 [ULTRA] Tentative de création SuperFile normalisé pour {contact}")
                    try:
                        created_files = self._create_normalized_super_files(contact, contact_dir)
                        if created_files:
                            super_files.extend(created_files)
                            logger.info(f"✅ [ULTRA] {len(created_files)} SuperFiles créés avec nom normalisé!")
                        else:
                            logger.warning(f"❌ [ULTRA] Impossible de créer SuperFile pour {contact}")
                    except Exception as create_error:
                        logger.error(f"❌ [ULTRA] Échec création SuperFile normalisé: {create_error}")
                else:
                    logger.info(f"✅ [ULTRA] {files_found_for_contact} SuperFiles trouvés pour {contact}")
            except Exception as e:
                logger.error(f"❌ [ULTRA] Erreur traitement contact {contact}: {e}")
                logger.warning(f"⚠️ [ULTRA] Contact ignoré à cause de l'erreur (caractères spéciaux?)")
                # Continuer avec les autres contacts au lieu de bloquer
                continue

        logger.info(f"✅ [ULTRA] {len(super_files)} SuperFiles trouvés pour tous les contacts")
        logger.info(f"\n📁 RÉSULTAT: {len(super_files)} fichiers SuperAudio trouvés au total")
        
        return super_files

    def _filter_already_transcribed(self, files: List[str]) -> Tuple[List[str], List[str]]:
        """
        Filtre les fichiers déjà transcrits avec déduplication avancée.

        Retourne:
            Tuple (to_transcribe, to_assemble):
            - to_transcribe: SuperFiles qui doivent être envoyés à l'API Whisper
            - to_assemble: SuperFiles dont toutes les sources sont en cache (assemblage local)
        """
        logger.info("\n" + "="*70)
        logger.info("🔍 [FILTRAGE] ANALYSE DES SUPERFILES À TRANSCRIRE")
        logger.info("="*70)

        # ============================================================
        # ÉTAPE 1: Filtrage classique (cache, registry, échecs)
        # ============================================================
        candidates = []  # Fichiers qui passent le filtrage classique

        for file_path in files:
            file_hash = self.registry.get_file_hash(file_path)
            file_name = os.path.basename(file_path)
            try:
                file_size_mb = os.path.getsize(file_path) / (1024 * 1024)
            except:
                file_size_mb = 0

            logger.debug(f"📄 Analyse: {file_name} ({file_size_mb:.2f} MB)")

            # Mode forcé : toujours transcrire
            if self.force_transcription:
                logger.debug("⚡ [MODE FORCÉ] Transcription forcée activée")
                candidates.append(file_path)
                continue

            # Vérifier si c'est un SuperFile incrémental (nouvellement créé)
            is_incremental_file = self._is_incremental_superfile(file_path)
            if is_incremental_file:
                logger.debug("🔄 [INCRÉMENTAL] SuperFile nouvellement créé détecté")
                candidates.append(file_path)
                continue

            # Vérifier le cache local d'abord
            cached_transcription = self.cache.get(file_hash)
            if cached_transcription:
                logger.debug("💾 [CACHE HIT] Transcription trouvée dans le cache")
                self.stats['files_cached'] += 1
                continue

            # Vérifier le Registry
            registry_transcription = self.registry.get_transcription(file_hash)
            if registry_transcription:
                logger.debug("🗃️ [REGISTRY HIT] Transcription trouvée dans le registry")
                self.cache.put(file_hash, registry_transcription)
                self.stats['files_cached'] += 1

                # ✅ NOUVEAU : Créer les fichiers .txt et .segments.json si absents
                sf_path = work_item['path']
                txt_file = sf_path + '.txt'
                segments_file = sf_path + '.segments.json'

                # Créer .txt si absent
                if not os.path.exists(txt_file):
                    with open(txt_file, 'w', encoding='utf-8') as f:
                        f.write(registry_transcription)
                    logger.debug(f"📝 [REGISTRY] Fichier .txt recréé depuis registry")

                # Créer segments.json si absent
                if not os.path.exists(segments_file):
                    source_details = self._get_superfile_source_info(sf_path)
                    segments_data = {
                        'file': os.path.basename(sf_path),
                        'total_duration': 0,
                        'segments_count': 0,
                        'segments': [],
                        'from_registry_cache': True
                    }

                    if source_details:
                        segments_data['source_files_details'] = source_details
                        total_dur = sum(s.get('duration', 0) for s in source_details)
                        segments_data['total_duration'] = total_dur
                        logger.debug(f"📊 [REGISTRY] segments.json recréé avec {len(source_details)} sources")

                    with open(segments_file, 'w', encoding='utf-8') as f:
                        import json
                        json.dump(segments_data, f, ensure_ascii=False, indent=2)

                continue

            # Vérifier si échec précédent
            if not self.registry.should_retry_transcription(file_hash):
                logger.debug("❌ [SKIP] Trop d'échecs précédents, ignoré")
                self.stats['files_skipped'] += 1
                continue

            # Fichier candidat pour transcription
            candidates.append(file_path)

        logger.info(f"📋 {len(candidates)} candidats après filtrage classique (sur {len(files)} total)")

        # ============================================================
        # ÉTAPE 2: Déduplication avancée (si activée)
        # ============================================================
        if not self.enable_source_deduplication or not candidates:
            # Déduplication désactivée ou pas de candidats
            logger.info("⏭️ Déduplication désactivée ou pas de candidats")
            return candidates, []

        # Construire l'index des sources pour les candidats
        hash_index = self._build_source_hash_index(candidates)

        # Classifier les SuperFiles
        to_transcribe, to_assemble = self._classify_superfiles(candidates, hash_index)

        # ============================================================
        # ÉTAPE 3: Résumé final
        # ============================================================
        logger.info("\n" + "="*60)
        logger.info("📊 RÉSULTAT DU FILTRAGE AVEC DÉDUPLICATION")
        logger.info("="*60)
        logger.info(f"   📥 Fichiers analysés: {len(files)}")
        logger.info(f"   💾 Depuis cache SuperFile: {self.stats['files_cached']}")
        logger.info(f"   ⏭️ Ignorés (échecs): {self.stats['files_skipped']}")
        logger.info(f"   🚀 À TRANSCRIRE (API): {len(to_transcribe)}")
        logger.info(f"   🔄 À ASSEMBLER (cache sources): {len(to_assemble)}")

        if to_transcribe:
            logger.info(f"\n📋 FICHIERS QUI VONT ÊTRE TRANSCRITS:")
            for i, f in enumerate(to_transcribe, 1):
                logger.info(f"   {i}. {os.path.basename(f)}")

        if to_assemble:
            logger.info(f"\n📋 FICHIERS QUI VONT ÊTRE ASSEMBLÉS DEPUIS CACHE:")
            for i, f in enumerate(to_assemble, 1):
                logger.info(f"   {i}. {os.path.basename(f)}")

        if not to_transcribe and not to_assemble:
            logger.warning("\n⚠️ AUCUN FICHIER À TRAITER!")

        logger.info("="*70)
        return to_transcribe, to_assemble

    def _get_superfile_source_info(self, file_path: str) -> List[Dict]:
        """
        Récupère les informations sur les fichiers sources d'un SuperFile.
        Utilisé pour la déduplication au niveau des fichiers sources.

        Gère les SuperFiles multi-parties (ex: contact_received_2025-01_part2.mp3)

        Args:
            file_path: Chemin du SuperFile

        Returns:
            Liste de dicts avec {filename, hash, duration} pour chaque fichier source
        """
        try:
            # Extraire le contact et la période du nom du fichier
            file_name = os.path.basename(file_path)
            base_name = file_name.replace('.mp3', '')
            parts = base_name.split('_')

            # Format attendu:
            # - Sans partie: contact_direction_YYYY-MM.mp3
            # - Avec partie: contact_direction_YYYY-MM_part2.mp3
            if len(parts) >= 3:
                # Trouver la direction, période et partie
                direction = None
                period = None
                part_suffix = ""
                contact_parts = []

                for i, part in enumerate(parts):
                    if part in ['received', 'sent', 'unknown']:
                        direction = part
                        # Le reste avant direction est le contact
                        contact_parts = parts[:i]
                    elif len(part) == 7 and '-' in part:  # YYYY-MM
                        period = part
                    elif part.startswith('part') and len(part) >= 5:  # part1, part2, etc.
                        # Extraire le suffixe de partie (ex: _part2)
                        part_suffix = f"_{part}"

                if direction and period:
                    contact = '_'.join(contact_parts) if contact_parts else parts[0]
                    # Inclure le suffixe de partie dans la période pour la clé du registry
                    registry_period = period + part_suffix

                    # Récupérer les infos depuis le registry
                    super_file_info = self.registry.get_super_file_info(contact, registry_period, direction)
                    if super_file_info:
                        source_details = super_file_info.get('source_files_details', [])
                        if source_details:
                            # Ajouter les hash SHA256 pour chaque fichier source si pas déjà présent
                            for detail in source_details:
                                if 'hash' not in detail and 'mp3_path' in detail:
                                    mp3_path = detail['mp3_path']
                                    if os.path.exists(mp3_path):
                                        detail['hash'] = self.registry.get_file_hash(mp3_path)

                            logger.debug(f"[SOURCE INFO] {len(source_details)} fichiers sources pour {file_name}")
                            return source_details
                    else:
                        # Fallback: essayer sans le suffixe de partie (anciens fichiers)
                        if part_suffix:
                            super_file_info = self.registry.get_super_file_info(contact, period, direction)
                            if super_file_info:
                                source_details = super_file_info.get('source_files_details', [])
                                if source_details:
                                    logger.debug(f"[SOURCE INFO] Fallback sans partie: {len(source_details)} sources")
                                    return source_details

            return []
        except Exception as e:
            logger.debug(f"[SOURCE INFO] Erreur récupération info sources: {e}")
            return []

    def _cache_transcription_by_source_files(self, superfile_path: str, full_transcription: str,
                                               segments: List[Dict] = None):
        """
        Cache la transcription par hash de chaque fichier source.
        Utilise les timestamps des segments pour segmenter la transcription.

        Args:
            superfile_path: Chemin du SuperFile transcrit
            full_transcription: Texte complet de la transcription
            segments: Segments avec timestamps de Whisper API (optionnel)
        """
        try:
            source_info = self._get_superfile_source_info(superfile_path)
            if not source_info:
                logger.debug("[SOURCE CACHE] Pas d'info source pour ce SuperFile")
                return

            logger.info(f"🔄 [SOURCE CACHE] Mise en cache pour {len(source_info)} fichiers sources")

            # Si on a des segments avec timestamps, on peut segmenter précisément
            if segments and len(segments) > 0:
                # Construire un mapping temps -> texte
                current_time = 0
                source_idx = 0

                for source in source_info:
                    source_duration = source.get('duration', 0)
                    source_end_time = current_time + source_duration

                    # Collecter les segments qui appartiennent à ce fichier source
                    source_text_parts = []
                    for seg in segments:
                        seg_start = seg.get('start', 0)
                        seg_end = seg.get('end', 0)

                        # Si le segment chevauche la plage du fichier source
                        if seg_start < source_end_time and seg_end > current_time:
                            source_text_parts.append(seg.get('text', ''))

                    source_text = ' '.join(source_text_parts).strip()

                    # Obtenir le hash du fichier source original (pas le MP3 converti)
                    source_hash = source.get('hash')
                    original_file = source.get('original_path') or source.get('filename', '')

                    # Si pas de hash mais on a le chemin MP3, calculer le hash
                    if not source_hash and source.get('mp3_path'):
                        mp3_path = source['mp3_path']
                        if os.path.exists(mp3_path):
                            source_hash = self.registry.get_file_hash(mp3_path)

                    if source_hash and source_text:
                        self.registry.register_source_transcription(
                            source_hash=source_hash,
                            transcription_text=source_text,
                            duration_seconds=source_duration,
                            original_file=original_file
                        )
                        logger.debug(f"   ✓ Caché: {original_file[:30]}... ({len(source_text)} chars)")

                    current_time = source_end_time
                    source_idx += 1

            else:
                # Pas de segments - diviser le texte proportionnellement
                # Moins précis mais mieux que rien
                total_duration = sum(s.get('duration', 0) for s in source_info)
                if total_duration <= 0:
                    logger.debug("[SOURCE CACHE] Durée totale = 0, skip")
                    return

                text_length = len(full_transcription)
                current_pos = 0

                for source in source_info:
                    source_duration = source.get('duration', 0)
                    proportion = source_duration / total_duration if total_duration > 0 else 0
                    chars_for_source = int(text_length * proportion)

                    # Extraire la portion de texte (essayer de couper aux espaces)
                    end_pos = min(current_pos + chars_for_source, text_length)
                    if end_pos < text_length:
                        # Chercher le prochain espace pour couper proprement
                        while end_pos < text_length and full_transcription[end_pos] != ' ':
                            end_pos += 1

                    source_text = full_transcription[current_pos:end_pos].strip()

                    # Obtenir le hash
                    source_hash = source.get('hash')
                    original_file = source.get('original_path') or source.get('filename', '')

                    if not source_hash and source.get('mp3_path'):
                        mp3_path = source['mp3_path']
                        if os.path.exists(mp3_path):
                            source_hash = self.registry.get_file_hash(mp3_path)

                    if source_hash and source_text:
                        self.registry.register_source_transcription(
                            source_hash=source_hash,
                            transcription_text=source_text,
                            duration_seconds=source_duration,
                            original_file=original_file
                        )

                    current_pos = end_pos

            # Afficher les stats de déduplication
            dedup_stats = self.registry.get_source_deduplication_stats()
            logger.info(f"📊 [DEDUP STATS] {dedup_stats['total_cached_transcriptions']} sources cachées, "
                       f"{dedup_stats['total_cache_hits']} réutilisations")

        except Exception as e:
            logger.error(f"❌ [SOURCE CACHE] Erreur: {e}")
            import traceback
            logger.debug(traceback.format_exc())

    # ============================================================
    # MÉTHODES DE DÉDUPLICATION AVANCÉE - PHASE PRÉ-TRANSCRIPTION
    # ============================================================

    def _build_source_hash_index(self, super_files: List[str]) -> Dict[str, List[Tuple[str, Dict]]]:
        """
        Construit un index global de tous les hash sources → SuperFiles qui les contiennent.

        Args:
            super_files: Liste des chemins de SuperFiles

        Returns:
            Dict {source_hash: [(superfile_path, source_detail), ...]}
        """
        logger.info("\n" + "="*60)
        logger.info("[DEDUP] PHASE 1: Construction de l'index des sources")
        logger.info("="*60)

        hash_index = {}  # hash -> [(superfile, source_detail), ...]
        total_sources = 0

        for sf_path in super_files:
            source_info = self._get_superfile_source_info(sf_path)

            if not source_info:
                continue

            for detail in source_info:
                # Obtenir ou calculer le hash
                source_hash = detail.get('hash')
                if not source_hash and detail.get('mp3_path'):
                    mp3_path = detail['mp3_path']
                    if os.path.exists(mp3_path):
                        source_hash = self.registry.get_file_hash(mp3_path)
                        detail['hash'] = source_hash

                if source_hash:
                    if source_hash not in hash_index:
                        hash_index[source_hash] = []
                    hash_index[source_hash].append((sf_path, detail))
                    total_sources += 1

        # Statistiques
        unique_hashes = len(hash_index)
        duplicated_hashes = sum(1 for h, locs in hash_index.items() if len(locs) > 1)

        logger.info(f"   Total sources indexées: {total_sources}")
        logger.info(f"   Hash uniques: {unique_hashes}")
        logger.info(f"   Hash dupliqués (>1 SuperFile): {duplicated_hashes}")
        logger.info(f"   Taux de duplication: {(1 - unique_hashes/total_sources)*100:.1f}%" if total_sources > 0 else "N/A")

        return hash_index

    def _classify_superfiles(self, super_files: List[str], hash_index: Dict) -> Tuple[List[str], List[str]]:
        """
        Classifie les SuperFiles en deux catégories:
        - to_transcribe: SuperFiles qui ont au moins une source non cachée
        - to_assemble: SuperFiles dont TOUTES les sources sont déjà cachées

        Args:
            super_files: Liste des chemins de SuperFiles
            hash_index: Index hash → SuperFiles

        Returns:
            Tuple (to_transcribe, to_assemble)
        """
        logger.info("\n" + "="*60)
        logger.info("[DEDUP] PHASE 2: Classification des SuperFiles")
        logger.info("="*60)

        # Récupérer tous les hash déjà en cache
        cached_hashes = self.registry.get_all_cached_source_hashes()
        logger.info(f"   Hash déjà en cache: {len(cached_hashes)}")

        to_transcribe = []
        to_assemble = []

        for sf_path in super_files:
            source_info = self._get_superfile_source_info(sf_path)

            if not source_info:
                # Pas d'info source, transcrire par sécurité
                to_transcribe.append(sf_path)
                continue

            # Collecter les hash de ce SuperFile
            sf_hashes = set()
            for detail in source_info:
                source_hash = detail.get('hash')
                if not source_hash and detail.get('mp3_path'):
                    mp3_path = detail['mp3_path']
                    if os.path.exists(mp3_path):
                        source_hash = self.registry.get_file_hash(mp3_path)
                if source_hash:
                    sf_hashes.add(source_hash)

            # Vérifier si TOUTES les sources sont en cache
            if sf_hashes and sf_hashes.issubset(cached_hashes):
                to_assemble.append(sf_path)
                logger.debug(f"   [ASSEMBLE] {os.path.basename(sf_path)} - {len(sf_hashes)} sources en cache")
            else:
                to_transcribe.append(sf_path)
                uncached = sf_hashes - cached_hashes
                logger.debug(f"   [TRANSCRIBE] {os.path.basename(sf_path)} - {len(uncached)} sources nouvelles")

        logger.info(f"\n   Résultat classification:")
        logger.info(f"   À transcrire (API): {len(to_transcribe)}")
        logger.info(f"   À assembler (cache): {len(to_assemble)}")
        if super_files:
            savings_pct = len(to_assemble) / len(super_files) * 100
            logger.info(f"   Économie potentielle: {savings_pct:.1f}%")

        return to_transcribe, to_assemble

    def _assemble_from_cache(self, sf_path: str) -> Optional[str]:
        """
        Assemble une transcription complète depuis le cache des sources.

        Args:
            sf_path: Chemin du SuperFile

        Returns:
            Transcription assemblée ou None si échec
        """
        try:
            source_info = self._get_superfile_source_info(sf_path)

            if not source_info:
                logger.warning(f"[DEDUP] Pas d'info source pour assemblage: {os.path.basename(sf_path)}")
                return None

            # Collecter les hash dans l'ordre
            source_hashes = []
            for detail in source_info:
                source_hash = detail.get('hash')
                if not source_hash and detail.get('mp3_path'):
                    mp3_path = detail['mp3_path']
                    if os.path.exists(mp3_path):
                        source_hash = self.registry.get_file_hash(mp3_path)
                if source_hash:
                    source_hashes.append(source_hash)

            if not source_hashes:
                logger.warning(f"[DEDUP] Aucun hash source pour: {os.path.basename(sf_path)}")
                return None

            # Récupérer les transcriptions en batch
            cached_transcriptions = self.registry.batch_get_source_transcriptions(source_hashes)

            if len(cached_transcriptions) != len(source_hashes):
                missing = len(source_hashes) - len(cached_transcriptions)
                logger.warning(f"[DEDUP] {missing} sources manquantes en cache pour: {os.path.basename(sf_path)}")
                return None

            # Assembler dans l'ordre original
            assembled_parts = []
            for source_hash in source_hashes:
                if source_hash in cached_transcriptions:
                    text = cached_transcriptions[source_hash].get('text', '')
                    if text:
                        assembled_parts.append(text)
                    self.stats['source_cache_hits'] += 1

            if not assembled_parts:
                logger.warning(f"[DEDUP] Assemblage vide pour: {os.path.basename(sf_path)}")
                return None

            # Joindre les parties avec espacement
            assembled_text = "\n\n".join(assembled_parts)

            logger.info(f"[DEDUP] Assemblé depuis cache: {os.path.basename(sf_path)} "
                       f"({len(assembled_parts)} sources, {len(assembled_text)} chars)")

            return assembled_text

        except Exception as e:
            logger.error(f"[DEDUP] Erreur assemblage {os.path.basename(sf_path)}: {e}")
            import traceback
            logger.debug(traceback.format_exc())
            return None

    def _save_assembled_transcription(self, sf_path: str, transcription: str) -> bool:
        """
        Sauvegarde une transcription assemblée comme si elle avait été transcrite normalement.

        Args:
            sf_path: Chemin du SuperFile
            transcription: Texte assemblé

        Returns:
            True si succès
        """
        try:
            # Calculer le hash du SuperFile
            file_hash = self.registry.get_file_hash(sf_path)

            if not file_hash:
                logger.error(f"[DEDUP] Impossible de calculer hash pour: {sf_path}")
                return False

            # Enregistrer dans le registry
            self.registry.register_transcription(file_hash, transcription, sf_path)

            # Ajouter au cache local
            self.cache.put(file_hash, transcription)

            # Sauvegarder dans un fichier .txt
            txt_file = sf_path + '.txt'
            with open(txt_file, 'w', encoding='utf-8') as f:
                f.write(transcription)

            logger.debug(f"[DEDUP] Sauvegardé: {os.path.basename(txt_file)}")

            # ✅ NOUVEAU : Créer aussi un segments.json minimal avec source_files_details
            segments_file = sf_path + '.segments.json'
            source_details = self._get_superfile_source_info(sf_path)

            segments_data = {
                'file': os.path.basename(sf_path),
                'total_duration': 0,  # Non calculé pour assemblé
                'segments_count': 0,  # Pas de segments Whisper (assemblé)
                'segments': [],  # Vide car assemblé depuis chunks
                'assembled_from_cache': True  # Flag pour identifier source
            }

            if source_details:
                segments_data['source_files_details'] = source_details
                # Calculer total_duration depuis source_details
                total_dur = sum(s.get('duration', 0) for s in source_details)
                segments_data['total_duration'] = total_dur
                logger.debug(f"✅ [ASSEMBLED] segments.json créé avec {len(source_details)} sources")
            else:
                logger.warning(f"⚠️ [ASSEMBLED] Aucun source_details pour {os.path.basename(sf_path)}")

            with open(segments_file, 'w', encoding='utf-8') as f:
                import json
                json.dump(segments_data, f, ensure_ascii=False, indent=2)

            self.stats['files_assembled_from_cache'] += 1
            return True

        except Exception as e:
            logger.error(f"[DEDUP] Erreur sauvegarde assemblage: {e}")
            return False

    def _is_incremental_superfile(self, file_path: str) -> bool:
        """Détermine si un SuperFile a été créé incrémentalement (nouveaux audios détectés)"""
        try:
            # Vérifier si le fichier a été créé récemment (moins de 5 minutes)
            file_mtime = os.path.getmtime(file_path)
            current_time = time.time()
            age_minutes = (current_time - file_mtime) / 60
            
            if age_minutes < 5:
                logger.debug(f"[INCRÉMENTAL] {os.path.basename(file_path)} créé il y a {age_minutes:.1f} minutes")
                return True
                
            # Vérifier si le hash du fichier n'existe pas encore dans le registry
            file_hash = self.registry.get_file_hash(file_path)
            existing_transcription = self.registry.get_transcription(file_hash)
            
            if not existing_transcription:
                logger.debug(f"[INCRÉMENTAL] {os.path.basename(file_path)} pas encore transcrit")
                return True
                
            return False
        except Exception as e:
            logger.debug(f"[INCRÉMENTAL] Erreur vérification {file_path}: {e}")
            return False

    def _optimize_processing_order(self, files: List[str]) -> List[str]:
        """Optimise l'ordre: petits fichiers d'abord pour saturation rapide"""
        file_sizes = []
        for file in files:
            try:
                size = os.path.getsize(file)
                file_sizes.append((file, size))
            except:
                file_sizes.append((file, 0))

        # Trier par taille croissante
        file_sizes.sort(key=lambda x: x[1])
        return [f[0] for f in file_sizes]

    def _prepare_work_items(self, files: List[str]) -> List[Dict]:
        """Prépare les éléments de travail avec chunking si nécessaire"""
        work_items = []

        for file_path in files:
            if self.chunker.needs_chunking(file_path):
                # Fichier trop gros, chunking nécessaire
                size_mb = os.path.getsize(file_path) / (1024 * 1024)
                logger.info(f"🔪 Chunking requis pour {os.path.basename(file_path)} ({size_mb:.1f}MB)")

                chunks = self.chunker.chunk_audio(file_path)
                self.stats['chunks_created'] += len(chunks)

                for i, chunk_path in enumerate(chunks):
                    work_items.append({
                        'original_file': file_path,
                        'chunk_file': chunk_path,
                        'chunk_index': i,
                        'total_chunks': len(chunks),
                        'is_chunk': True
                    })
            else:
                # Fichier OK, pas de chunking
                work_items.append({
                    'original_file': file_path,
                    'chunk_file': file_path,
                    'chunk_index': 0,
                    'total_chunks': 1,
                    'is_chunk': False
                })

        return work_items

    def _execute_parallel_transcription(self, work_items: List[Dict], files_to_assemble: List[str] = None) -> List[Dict]:
        """
        Exécute les transcriptions en 2 phases:
        - Phase 1: Transcription API des fichiers avec sources nouvelles
        - Phase 2: Assemblage depuis cache des fichiers dont toutes les sources sont cachées
        """
        results = {}  # Groupé par fichier original
        files_to_assemble = files_to_assemble or []

        # ============================================================
        # PHASE 1: Transcription API (fichiers avec sources nouvelles)
        # ============================================================
        if work_items:
            logger.info("\n" + "="*60)
            logger.info("🚀 PHASE 1: TRANSCRIPTION API")
            logger.info(f"   {len(work_items)} éléments à transcrire")
            logger.info("="*60)

            with ThreadPoolExecutor(max_workers=self.max_workers) as executor:
                # Soumettre tous les travaux
                futures = []
                for item in work_items:
                    future = executor.submit(self._transcribe_single_item, item)
                    futures.append((future, item))

                # Collecter les résultats
                completed = 0
                total = len(futures)

                for future, item in futures:
                    try:
                        result = future.result(timeout=600)  # 10 minutes max par fichier

                        # Grouper les résultats par fichier original
                        original_file = item['original_file']
                        if original_file not in results:
                            results[original_file] = {
                                'chunks': {},
                                'total_chunks': item['total_chunks'],
                                'success': True
                            }

                        if result['success']:
                            if item['is_chunk']:
                                results[original_file]['chunks'][item['chunk_index']] = result['text']
                            else:
                                results[original_file]['text'] = result['text']
                                # Transférer le flag 'saved' pour éviter double sauvegarde
                                if result.get('saved'):
                                    results[original_file]['saved'] = True
                        else:
                            results[original_file]['success'] = False
                            self.stats['errors'] += 1

                        completed += 1
                        progress = (completed / total) * 100

                        # Calcul des métriques en temps réel
                        elapsed = time.time() - self.stats.get('start_time', time.time())
                        rate = completed / elapsed if elapsed > 0 else 0
                        eta = (total - completed) / rate if rate > 0 else 0

                        # Log à chaque fichier traité
                        logger.info(f"📊 [{completed}/{total}] {progress:.0f}% | ⚡ {rate:.1f} fichiers/min | ⏱️ ETA: {eta/60:.1f} min")

                        # Stats détaillées tous les 3 fichiers
                        if completed % 3 == 0 or completed == total:
                            active_keys = len([k for k,v in self.api_pool.health_scores.items() if v > 0])
                            logger.info(f"   💾 Cache: {self.cache.hits} hits / {self.cache.misses} miss")
                            logger.info(f"   🔑 Clés actives: {active_keys}/{len(self.api_pool.api_keys)}")
                            logger.info(f"   ✅ Succès: {completed - self.stats.get('errors', 0)}/{completed}")

                    except Exception as e:
                        import traceback
                        logger.error(f"❌ Erreur collecte résultat: {type(e).__name__}: {e}")
                        logger.error(f"   Fichier: {item.get('original_file', 'inconnu')}")
                        logger.error(f"   Traceback: {traceback.format_exc()}")
                        self.stats['errors'] += 1

            # Consolider les résultats et sauvegarder
            self._consolidate_and_save_results(results)

        # ============================================================
        # PHASE 2: Assemblage depuis cache (sources déjà transcrites)
        # ============================================================
        if files_to_assemble:
            logger.info("\n" + "="*60)
            logger.info("🔄 PHASE 2: ASSEMBLAGE DEPUIS CACHE")
            logger.info(f"   {len(files_to_assemble)} fichiers à assembler")
            logger.info("="*60)

            assembled_count = 0
            for sf_path in files_to_assemble:
                file_name = os.path.basename(sf_path)
                logger.info(f"\n📄 Assemblage: {file_name}")

                # Assembler depuis le cache
                assembled_text = self._assemble_from_cache(sf_path)

                if assembled_text:
                    # Sauvegarder comme une transcription normale
                    success = self._save_assembled_transcription(sf_path, assembled_text)
                    if success:
                        assembled_count += 1
                        logger.info(f"   ✅ Assemblé et sauvegardé: {len(assembled_text)} caractères")
                    else:
                        logger.error(f"   ❌ Erreur sauvegarde assemblage")
                        self.stats['errors'] += 1
                else:
                    # Échec d'assemblage - ajouter à la file de transcription?
                    # Pour l'instant on log l'erreur
                    logger.warning(f"   ⚠️ Impossible d'assembler {file_name} - sources manquantes en cache")

            logger.info(f"\n📊 Phase 2 terminée: {assembled_count}/{len(files_to_assemble)} fichiers assemblés")

        return list(results.values())

    def _transcribe_single_item(self, work_item: Dict) -> Dict:
        """Transcrit un seul élément (fichier ou chunk)"""
        file_path = work_item['chunk_file']
        file_name = os.path.basename(file_path)
        compressed_file = None  # Track pour cleanup

        logger.info(f"\n" + "="*60)
        logger.info(f"🎯 DÉBUT TRANSCRIPTION: {file_name}")
        logger.info("="*60)

        # 🔧 OPTIMISATION: Compresser le fichier avant envoi à l'API
        original_size = os.path.getsize(file_path) / (1024 * 1024)  # MB
        file_to_send = file_path

        if original_size > 5:  # Compresser si > 5MB
            compressed_path, compression_success = compress_audio_for_whisper(file_path)
            if compression_success and compressed_path != file_path:
                file_to_send = compressed_path
                compressed_file = compressed_path  # Marquer pour cleanup
                logger.info(f"📦 Utilisation du fichier compressé pour transcription")
            else:
                logger.info(f"📦 Utilisation du fichier original (compression non nécessaire/échec)")

        # Obtenir un client API disponible
        logger.info("🔍 Recherche d'une clé API disponible...")
        api_key, client = self.api_pool.get_best_client()
        if not client:
            # Attendre qu'une clé se libère
            time.sleep(10)
            api_key, client = self.api_pool.get_best_client()
            if not client:
                # Cleanup fichier compressé si échec
                if compressed_file and os.path.exists(compressed_file):
                    os.remove(compressed_file)
                return {
                    'success': False,
                    'error': 'Aucune clé API disponible'
                }

        # Tentatives de transcription avec retry
        max_retries = 3
        for attempt in range(max_retries):
            try:
                # Vérifier la taille du fichier à envoyer
                file_size = os.path.getsize(file_to_send)
                if file_size > 25 * 1024 * 1024:  # 25MB
                    logger.error(f"Fichier trop gros malgré compression: {file_size / (1024*1024):.1f}MB")
                    if compressed_file and os.path.exists(compressed_file):
                        os.remove(compressed_file)
                    return {'success': False, 'error': 'Fichier trop gros'}

                # Appel API OpenAI Whisper
                logger.info(f"\n🎙️ [OPENAI WHISPER API]")
                logger.info(f"   📁 Fichier: {os.path.basename(file_to_send)} ({file_size / (1024*1024):.1f}MB)")
                logger.info(f"   🔑 Clé API: {api_key[:20]}...{api_key[-4:]}")
                logger.info(f"   🕑 Heure: {datetime.now().strftime('%H:%M:%S')}")
                logger.info(f"   📡 ENVOI EN COURS À OPENAI...")

                api_start = time.time()
                with open(file_to_send, 'rb') as audio_file:
                    # 🆕 verbose_json pour avoir les timestamps des segments
                    api_response = client.audio.transcriptions.create(
                        model="whisper-1",
                        file=audio_file,
                        response_format="verbose_json",  # 🆕 Pour avoir les segments avec timestamps
                        language="fr"
                    )
                api_duration = time.time() - api_start

                logger.info(f"   ✅ RÉPONSE REÇUE en {api_duration:.1f} secondes!")

                # Succès!
                self.api_pool.update_client_health(api_key, True)
                self.stats['api_calls'] += 1

                # 🆕 Extraire le texte et les segments de la réponse verbose_json
                if hasattr(api_response, 'text'):
                    response = api_response.text
                    segments = []
                    if hasattr(api_response, 'segments') and api_response.segments:
                        # Debug: voir le type du premier segment
                        first_seg = api_response.segments[0]
                        logger.info(f"   🔍 Type segment: {type(first_seg).__name__}")
                        logger.info(f"   🔍 Attributs: {dir(first_seg)[:10]}...")

                        for seg in api_response.segments:
                            # Gérer les segments comme dictionnaire OU objet Pydantic
                            if isinstance(seg, dict):
                                seg_start = seg.get('start', 0)
                                seg_end = seg.get('end', 0)
                                seg_text = seg.get('text', '')
                            elif hasattr(seg, 'model_dump'):
                                # Pydantic v2 model
                                seg_dict = seg.model_dump()
                                seg_start = seg_dict.get('start', 0)
                                seg_end = seg_dict.get('end', 0)
                                seg_text = seg_dict.get('text', '')
                            elif hasattr(seg, 'dict'):
                                # Pydantic v1 model
                                seg_dict = seg.dict()
                                seg_start = seg_dict.get('start', 0)
                                seg_end = seg_dict.get('end', 0)
                                seg_text = seg_dict.get('text', '')
                            else:
                                # Accès direct aux attributs
                                seg_start = getattr(seg, 'start', 0)
                                seg_end = getattr(seg, 'end', 0)
                                seg_text = getattr(seg, 'text', '')

                            segments.append({
                                'start': seg_start,
                                'end': seg_end,
                                'text': seg_text
                            })
                        logger.info(f"   📊 {len(segments)} segments avec timestamps extraits")
                        # Debug: afficher le premier segment pour vérifier
                        if segments:
                            logger.info(f"   🔍 Premier segment extrait: start={segments[0].get('start')}, end={segments[0].get('end')}")
                            if segments[0].get('end', 0) > 0:
                                logger.info(f"   ✅ Timestamps OK: {segments[0]['start']:.1f}s - {segments[0]['end']:.1f}s")
                else:
                    # Fallback si format inattendu
                    response = str(api_response)
                    segments = []

                # Afficher un aperçu de la transcription
                text_length = len(response)
                preview = response[:200].replace('\n', ' ')
                if text_length > 200:
                    preview += "..."

                logger.info(f"\n✅ TRANSCRIPTION RÉUSSIE!")
                logger.info(f"   📝 Longueur: {text_length} caractères")
                logger.info(f"   🔍 Aperçu: \"{preview}\"")
                logger.info(f"{'='*60}\n")

                # 🔧 FIX BUG #1: Sauvegarder IMMÉDIATEMENT après succès API
                # Ne pas attendre la consolidation qui peut perdre des transcriptions
                # ⚠️ SAUF pour les chunks - ils doivent être assemblés d'abord
                is_chunk = work_item.get('is_chunk', False)
                saved_immediately = False

                if not is_chunk:
                    # Fichier complet (non-chunké) - sauvegarder maintenant
                    original_file = work_item.get('original_file', file_path)
                    try:
                        file_hash = self.registry.get_file_hash(original_file)
                        if file_hash:
                            # Sauvegarder dans le Registry MAINTENANT
                            self.registry.register_transcription(file_hash, response, original_file)
                            logger.info(f"💾 [SAUVEGARDE IMMÉDIATE] Transcription enregistrée pour {os.path.basename(original_file)}")

                            # Sauvegarder aussi dans un fichier .txt
                            txt_file = original_file + '.txt'
                            with open(txt_file, 'w', encoding='utf-8') as f:
                                f.write(response if isinstance(response, str) else str(response))
                            logger.info(f"📄 Fichier .txt créé: {os.path.basename(txt_file)}")

                            # 🆕 Sauvegarder les segments avec timestamps dans un fichier JSON
                            if segments:
                                segments_file = original_file + '.segments.json'

                                # ✅ NOUVEAU : Récupérer source_files_details depuis registry
                                source_details = self._get_superfile_source_info(original_file)

                                segments_data = {
                                    'file': os.path.basename(original_file),
                                    'total_duration': segments[-1]['end'] if segments else 0,
                                    'segments_count': len(segments),
                                    'segments': segments
                                }

                                # ✅ NOUVEAU : Injecter source_files_details si disponible
                                if source_details:
                                    segments_data['source_files_details'] = source_details
                                    logger.debug(f"✅ [SOURCE FILES] {len(source_details)} fichiers sources ajoutés au segments.json")
                                else:
                                    logger.warning(f"⚠️ [SOURCE FILES] Aucun détail de source trouvé pour {os.path.basename(original_file)}")

                                with open(segments_file, 'w', encoding='utf-8') as f:
                                    import json
                                    json.dump(segments_data, f, ensure_ascii=False, indent=2)

                                logger.info(f"📊 Fichier segments créé: {os.path.basename(segments_file)} ({len(segments)} segments)")

                            # Ajouter au cache
                            self.cache.put(file_hash, response)
                            saved_immediately = True

                            # 🆕 DÉDUPLICATION: Enregistrer par hash des fichiers sources
                            # Cela permet de réutiliser les transcriptions pour les fichiers dupliqués
                            self._cache_transcription_by_source_files(original_file, response, segments)

                    except Exception as save_error:
                        logger.error(f"❌ Erreur sauvegarde immédiate: {save_error}")
                        import traceback
                        logger.error(traceback.format_exc())
                else:
                    logger.debug(f"⏭️ Chunk {work_item.get('chunk_index', '?')} - sauvegarde différée pour assemblage")

                # 🧹 Cleanup: Supprimer le fichier compressé après succès
                if compressed_file and os.path.exists(compressed_file):
                    try:
                        os.remove(compressed_file)
                        logger.debug(f"🧹 Fichier compressé supprimé: {os.path.basename(compressed_file)}")
                    except Exception as cleanup_error:
                        logger.warning(f"⚠️ Impossible de supprimer fichier compressé: {cleanup_error}")

                return {
                    'success': True,
                    'text': response,
                    'segments': segments,  # 🆕 Segments avec timestamps pour segmentation
                    'saved': saved_immediately  # True seulement si non-chunk ET sauvegardé
                }

            except Exception as e:
                error_str = str(e).lower()

                logger.error(f"\n❌ ERREUR lors de la transcription")
                logger.error(f"   Tentative: {attempt+1}/{max_retries}")
                logger.error(f"   Type: {type(e).__name__}")
                logger.error(f"   Message: {str(e)}")

                # Gestion des erreurs spécifiques
                if 'rate' in error_str or '429' in error_str:
                    logger.warning(f"   🕑 RATE LIMIT! Rotation de clé...")
                    self.api_pool.update_client_health(api_key, False, 'rate_limit')
                    time.sleep(5)  # Attendre 5 secondes

                    # Obtenir une autre clé
                    api_key, client = self.api_pool.get_best_client()
                    if not client:
                        time.sleep(30)  # Attendre plus longtemps
                        api_key, client = self.api_pool.get_best_client()

                elif 'quota' in error_str:
                    logger.error(f"   💳 QUOTA DÉPASSÉ pour la clé!")
                    self.api_pool.update_client_health(api_key, False, 'quota_exceeded')
                    # Cleanup fichier compressé
                    if compressed_file and os.path.exists(compressed_file):
                        os.remove(compressed_file)
                    return {'success': False, 'error': 'Quota dépassé'}

                else:
                    self.api_pool.update_client_health(api_key, False, 'other')

                if attempt == max_retries - 1:
                    logger.error(f"   ❌ ÉCHEC DÉFINITIF après {max_retries} tentatives")

                    # 🆕 ENREGISTRER L'ÉCHEC pour éviter boucle infinie
                    # MAIS seulement pour les fichiers complets, pas les chunks
                    is_chunk = work_item.get('is_chunk', False)

                    if not is_chunk:
                        try:
                            # Récupérer le fichier original et calculer son hash
                            original_file = work_item.get('original_file', file_path)
                            file_hash = self.registry.get_file_hash(original_file)

                            if file_hash:
                                # Utiliser la méthode EXISTANTE du registry
                                self.registry.register_failed_transcription(
                                    file_hash=file_hash,
                                    error=f"{type(e).__name__}: {str(e)}"
                                )
                                # Log sécurisé - vérifier que l'entrée existe
                                attempts_count = self.registry.data.get('failed_transcriptions', {}).get(file_hash, {}).get('attempts', '?')
                                logger.warning(f"⚠️  Échec enregistré pour {os.path.basename(original_file)} - tentative #{attempts_count}/3")
                            else:
                                logger.warning(f"⚠️  Hash impossible pour {os.path.basename(original_file)} - échec non enregistré")

                        except Exception as record_error:
                            logger.error(f"❌ Erreur enregistrement échec: {record_error}")
                            import traceback
                            logger.debug(traceback.format_exc())
                    else:
                        logger.debug(f"⏭️  Chunk échec - pas d'enregistrement (sera regroupé avec fichier parent)")

                    # Cleanup fichier compressé
                    if compressed_file and os.path.exists(compressed_file):
                        os.remove(compressed_file)
                    return {'success': False, 'error': str(e)}

                # Backoff exponentiel
                wait_time = 2 ** attempt
                logger.info(f"   ⏳ Attente de {wait_time} secondes avant retry...")
                time.sleep(wait_time)

        # Cleanup fichier compressé si échec final
        if compressed_file and os.path.exists(compressed_file):
            os.remove(compressed_file)
        return {'success': False, 'error': 'Max retries'}

    def _consolidate_and_save_results(self, results: Dict):
        """Consolide les chunks et sauvegarde les transcriptions"""
        for file_path, result in results.items():
            if not result.get('success'):
                continue

            # 🔧 FIX: Skip si déjà sauvegardé immédiatement
            if result.get('saved'):
                logger.debug(f"⏭️ Skip consolidation pour {os.path.basename(file_path)} (déjà sauvegardé)")
                self.stats['files_processed'] += 1
                continue

            # Reconstituer le texte complet pour les chunks
            if 'chunks' in result and result['chunks']:
                # Assembler les chunks dans l'ordre
                full_text = ""
                for i in range(result['total_chunks']):
                    if i in result['chunks']:
                        full_text += result['chunks'][i] + " "
                result['text'] = full_text.strip()

            if 'text' in result and result['text']:
                try:
                    # Calculer le hash du fichier
                    file_hash = self.registry.get_file_hash(file_path)

                    # Enregistrer dans le Registry
                    self.registry.register_transcription(file_hash, result['text'], file_path)

                    # Ajouter au cache
                    self.cache.put(file_hash, result['text'])

                    # Sauvegarder dans un fichier .txt
                    self._save_transcription_file(file_path, result['text'])

                    self.stats['files_processed'] += 1
                    logger.info(f"✅ Consolidation réussie pour {os.path.basename(file_path)}")
                except Exception as e:
                    logger.error(f"❌ Erreur consolidation pour {os.path.basename(file_path)}: {e}")
                    import traceback
                    logger.error(traceback.format_exc())

    def _save_transcription_file(self, audio_file: str, transcription: str):
        """Sauvegarde la transcription dans un fichier .txt"""
        try:
            txt_file = audio_file + '.txt'
            with open(txt_file, 'w', encoding='utf-8') as f:
                f.write(transcription)
            logger.debug(f"Transcription sauvegardée: {os.path.basename(txt_file)}")
        except Exception as e:
            logger.error(f"Erreur sauvegarde transcription: {e}")

    def _print_statistics(self):
        """Affiche les statistiques de performance"""
        duration = time.time() - self.stats['start_time']

        logger.info("="*60)
        logger.info("📊 STATISTIQUES TRANSCRIBER ULTRA")
        logger.info("="*60)
        logger.info(f"⏱️  Durée: {duration:.1f} secondes")
        logger.info(f"✅ Transcrits: {self.stats['files_processed']}")
        logger.info(f"💾 Depuis cache: {self.stats['files_cached']}")
        logger.info(f"⏭️  Déjà traités: {self.stats['files_skipped']}")
        logger.info(f"🔪 Chunks créés: {self.stats['chunks_created']}")
        logger.info(f"📡 Appels API: {self.stats['api_calls']}")
        logger.info(f"❌ Erreurs: {self.stats['errors']}")

        if duration > 0:
            files_per_minute = (self.stats['files_processed'] / duration) * 60
            logger.info(f"⚡ Performance: {files_per_minute:.1f} fichiers/minute")

        # Stats du pool API
        api_stats = self.api_pool.get_stats()
        logger.info(f"🔑 Clés actives: {api_stats['active_keys']}/{api_stats['total_keys']}")
        if api_stats['total_requests'] > 0:
            logger.info(f"✅ Taux succès: {api_stats['success_rate']:.1f}%")

        # Stats du cache
        cache_stats = self.cache.get_stats()
        logger.info(f"💾 Cache: {cache_stats['entries']} entrées, {cache_stats['hit_rate']:.1f}% hit rate")

        logger.info("="*60)


# Point d'entrée pour tests
if __name__ == "__main__":
    logger.info("TranscriberUltra module chargé avec succès!")
    logger.info("Pour utiliser: activer 'ultra_mode = True' dans config.ini")