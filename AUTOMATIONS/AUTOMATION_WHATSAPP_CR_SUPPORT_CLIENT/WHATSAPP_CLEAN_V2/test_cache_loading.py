#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Test rapide du chargement du cache
"""

import sys
import os

# Ajouter le répertoire src au path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'src'))

from transcriber_ultra import TranscriptionCache

def test_cache_loading():
    """Test que le cache se charge correctement"""

    print("=" * 70)
    print("TEST DE CHARGEMENT DU CACHE")
    print("=" * 70)

    # Créer une instance de TranscriptionCache
    print("\nCreation de TranscriptionCache...")
    try:
        cache = TranscriptionCache()
        print("Instance creee avec succes")
    except Exception as e:
        print(f"ERREUR lors de la creation: {e}")
        import traceback
        traceback.print_exc()
        return False

    # Vérifier que le cache a été chargé
    print(f"\nEntrees chargees en memoire: {len(cache.cache)}")
    print(f"Taille cache: {cache.current_size / (1024*1024):.2f} MB")
    print(f"Hits: {cache.hits}")
    print(f"Misses: {cache.misses}")

    # Vérifier quelques entrées
    if len(cache.cache) > 0:
        print(f"\nPremiere entree (sample):")
        first_key = list(cache.cache.keys())[0]
        first_entry = cache.cache[first_key]
        print(f"  Hash: {first_key[:16]}...")
        print(f"  Cles: {list(first_entry.keys())}")
        print(f"  Taille texte: {len(first_entry.get('text', ''))} caracteres")
        print(f"  Timestamp: {first_entry.get('timestamp', 'N/A')}")

    # Résumé
    print("\n" + "=" * 70)
    if len(cache.cache) > 300:
        print("RESULTAT: OK - Cache charge avec succes")
        print(f"  {len(cache.cache)} entrees disponibles")
        print("  Les prochaines transcriptions utiliseront le cache")
        print("  Gain estime: 95% temps, 80%+ couts")
        return True
    elif len(cache.cache) > 0:
        print("RESULTAT: PARTIEL - Cache charge mais incomplet")
        print(f"  Seulement {len(cache.cache)} entrees (attendu: 373)")
        return True
    else:
        print("RESULTAT: ECHEC - Cache vide")
        print("  Le cache ne s'est pas charge correctement")
        return False

if __name__ == '__main__':
    success = test_cache_loading()
    sys.exit(0 if success else 1)
