#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script de validation du cache de transcription
Vérifie la cohérence entre .transcription_cache.json et .unified_registry.json
"""

import json
import os
import sys

def validate_cache():
    """Valide que le cache est cohérent avec le registry"""

    cache_path = '.transcription_cache.json'
    registry_path = 'DATA/OUTPUT/.unified_registry.json'

    print("=" * 70)
    print("VALIDATION DU CACHE DE TRANSCRIPTION")
    print("=" * 70)

    # Charger le cache
    if not os.path.exists(cache_path):
        print(f"ERREUR: Fichier cache introuvable: {cache_path}")
        return False

    try:
        with open(cache_path, 'r', encoding='utf-8') as f:
            cache = json.load(f)
        print(f"Cache charge: {len(cache)} entrees")
    except Exception as e:
        print(f"ERREUR: Impossible de charger le cache: {e}")
        return False

    # Charger le registry
    if not os.path.exists(registry_path):
        print(f"AVERTISSEMENT: Registry introuvable: {registry_path}")
        print("Validation partielle uniquement...")
        registry = {'transcriptions': {}}
    else:
        try:
            with open(registry_path, 'r', encoding='utf-8') as f:
                registry = json.load(f)
            print(f"Registry charge: {len(registry.get('transcriptions', {}))} transcriptions")
        except Exception as e:
            print(f"ERREUR: Impossible de charger le registry: {e}")
            return False

    print("\n" + "=" * 70)
    print("TESTS DE VALIDATION")
    print("=" * 70)

    # Test 1: Structure du cache
    print("\n[TEST 1] Structure du cache...")
    valid_count = 0
    invalid_count = 0

    for hash_val, entry in cache.items():
        if 'text' in entry and 'timestamp' in entry:
            valid_count += 1
        else:
            invalid_count += 1
            print(f"  ERREUR: Entree invalide: {hash_val[:8]}... (cles: {list(entry.keys())})")

    print(f"  Valides: {valid_count}/{len(cache)}")
    print(f"  Invalides: {invalid_count}/{len(cache)}")

    if invalid_count > 0:
        print("  RESULTAT: ECHEC")
        return False
    else:
        print("  RESULTAT: OK")

    # Test 2: Cohérence avec le registry
    if registry.get('transcriptions'):
        print("\n[TEST 2] Coherence cache <-> registry...")
        matches = 0
        diffs = 0
        sample_size = min(10, len(cache))

        for hash_val in list(cache.keys())[:sample_size]:
            if hash_val in registry['transcriptions']:
                cache_text = cache[hash_val].get('text', '')
                registry_text = registry['transcriptions'][hash_val].get('text', '')

                if cache_text == registry_text:
                    matches += 1
                else:
                    diffs += 1
                    print(f"  DIFF: {hash_val[:8]}...")
                    print(f"    Cache: {len(cache_text)} caracteres")
                    print(f"    Registry: {len(registry_text)} caracteres")

        print(f"  Echantillon: {sample_size} entrees")
        print(f"  Matches: {matches}/{sample_size}")
        print(f"  Differences: {diffs}/{sample_size}")

        if diffs > 0:
            print("  RESULTAT: AVERTISSEMENT (differences detectees)")
        else:
            print("  RESULTAT: OK")

    # Test 3: Taille du cache
    print("\n[TEST 3] Taille du cache...")
    total_size = 0
    for entry in cache.values():
        text = entry.get('text', '')
        total_size += len(text.encode('utf-8'))

    size_mb = total_size / (1024 * 1024)
    print(f"  Taille totale: {size_mb:.2f} MB")
    print(f"  Taille moyenne par entree: {total_size / len(cache) / 1024:.2f} KB")

    if size_mb > 100:
        print("  RESULTAT: AVERTISSEMENT (cache > 100 MB)")
    else:
        print("  RESULTAT: OK")

    # Résumé
    print("\n" + "=" * 70)
    print("RESUME")
    print("=" * 70)
    print(f"Entrees cache: {len(cache)}")
    print(f"Entrees valides: {valid_count}")
    print(f"Taille totale: {size_mb:.2f} MB")
    print(f"Etat: OK - Cache pret a l'utilisation")
    print("=" * 70)

    return True

if __name__ == '__main__':
    success = validate_cache()
    sys.exit(0 if success else 1)
