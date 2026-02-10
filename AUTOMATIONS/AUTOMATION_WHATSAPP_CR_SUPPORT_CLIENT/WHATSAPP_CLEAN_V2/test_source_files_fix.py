#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script de test pour valider les corrections source_files_details

Teste :
1. Présence de source_files_details dans nouveaux segments.json
2. Route assemblé crée bien segments.json
3. Route registry crée bien les fichiers manquants
"""

import os
import json
import shutil
from pathlib import Path
from datetime import datetime

def test_correction_1():
    """Test CORRECTION 1: Vérifier injection source_files_details dans route API"""
    print("\n" + "=" * 80)
    print("TEST 1: Injection source_files_details (Route API Whisper)")
    print("=" * 80)

    # Choisir un fichier test
    test_file = "DATA/OUTPUT/plus33_6_65_13_04_12/SuperAudio/plus33_6_65_13_04_12_received_2026-02.mp3"
    segments_file = test_file + '.segments.json'
    txt_file = test_file + '.txt'

    print(f"\n📁 Fichier test: {os.path.basename(test_file)}")

    # Backup si existe
    if os.path.exists(segments_file):
        backup_path = segments_file + f'.backup_{datetime.now().strftime("%Y%m%d_%H%M%S")}'
        shutil.copy2(segments_file, backup_path)
        print(f"✅ Backup créé: {os.path.basename(backup_path)}")

        # Supprimer pour forcer régénération
        os.remove(segments_file)
        print(f"🗑️  Supprimé: {os.path.basename(segments_file)}")

    if os.path.exists(txt_file):
        backup_path = txt_file + f'.backup_{datetime.now().strftime("%Y%m%d_%H%M%S")}'
        shutil.copy2(txt_file, backup_path)
        os.remove(txt_file)

    print("\n⚠️  MANUEL: Lancer maintenant la transcription pour régénérer:")
    print("   python main_fixed_v2.py --config config_with_sent.ini --full")
    print()
    print("Après transcription, relancer ce script pour validation.")

    return False  # Test non automatisé

def verify_correction_1():
    """Vérifier que le fichier a été recréé avec source_files_details"""
    print("\n" + "=" * 80)
    print("VÉRIFICATION 1: Présence source_files_details")
    print("=" * 80)

    test_file = "DATA/OUTPUT/plus33_6_65_13_04_12/SuperAudio/plus33_6_65_13_04_12_received_2026-02.mp3"
    segments_file = test_file + '.segments.json'

    if not os.path.exists(segments_file):
        print(f"❌ ÉCHEC: Fichier non recréé: {os.path.basename(segments_file)}")
        return False

    with open(segments_file, 'r', encoding='utf-8') as f:
        data = json.load(f)

    # Vérifier présence source_files_details
    if 'source_files_details' not in data:
        print(f"❌ ÉCHEC: Champ 'source_files_details' ABSENT")
        return False

    source_count = len(data['source_files_details'])
    print(f"✅ SUCCÈS: {source_count} fichiers sources trouvés")

    # Afficher détails
    print(f"\n📊 Contenu segments.json:")
    print(f"   - file: {data.get('file')}")
    print(f"   - total_duration: {data.get('total_duration')}")
    print(f"   - segments_count: {data.get('segments_count')}")
    print(f"   - source_files_details: {source_count} fichiers")

    # Afficher premier source_file
    if source_count > 0:
        first_source = data['source_files_details'][0]
        print(f"\n   Premier fichier source:")
        print(f"   - file: {first_source.get('file')}")
        print(f"   - duration: {first_source.get('duration')} sec")
        print(f"   - timestamp: {first_source.get('timestamp')}")

    return True

def analyze_all_segments():
    """Analyser tous les segments.json pour statistiques"""
    print("\n" + "=" * 80)
    print("ANALYSE GLOBALE: Tous les segments.json")
    print("=" * 80)

    segments_files = list(Path("DATA/OUTPUT").rglob("*.segments.json"))
    print(f"\n📊 Total fichiers trouvés: {len(segments_files)}")

    with_source = 0
    without_source = 0
    assembled = 0
    registry = 0

    files_without = []

    for seg_file in segments_files:
        try:
            with open(seg_file, 'r', encoding='utf-8') as f:
                data = json.load(f)

            if 'source_files_details' in data:
                with_source += 1

                # Vérifier flags
                if data.get('assembled_from_cache'):
                    assembled += 1
                elif data.get('from_registry_cache'):
                    registry += 1

            else:
                without_source += 1
                files_without.append(seg_file)

        except Exception as e:
            print(f"⚠️  Erreur lecture {seg_file.name}: {e}")

    print(f"\n✅ AVEC source_files_details: {with_source} ({with_source/len(segments_files)*100:.1f}%)")
    print(f"   - Route API Whisper: {with_source - assembled - registry}")
    print(f"   - Route assemblé: {assembled}")
    print(f"   - Route registry: {registry}")
    print(f"\n❌ SANS source_files_details: {without_source} ({without_source/len(segments_files)*100:.1f}%)")

    if files_without:
        print(f"\n📋 Fichiers SANS source_files_details:")
        for f in files_without[:10]:  # Limiter à 10
            print(f"   - {f.name}")
        if len(files_without) > 10:
            print(f"   ... et {len(files_without) - 10} autres")

    return without_source == 0  # Succès si aucun fichier sans source_files_details

def main():
    print("\n" + "=" * 80)
    print("TEST DES CORRECTIONS source_files_details")
    print("=" * 80)

    # Menu
    print("\nOptions:")
    print("  1. Préparer test (supprimer 1 fichier pour forcer régénération)")
    print("  2. Vérifier correction (après transcription)")
    print("  3. Analyse globale (tous les segments.json)")
    print()

    choice = input("Choix [1/2/3]: ").strip()

    if choice == '1':
        test_correction_1()
    elif choice == '2':
        verify_correction_1()
    elif choice == '3':
        success = analyze_all_segments()
        if success:
            print("\n" + "=" * 80)
            print("🎉 SUCCÈS COMPLET: 100% des fichiers ont source_files_details")
            print("=" * 80)
        else:
            print("\n" + "=" * 80)
            print("⚠️  CORRECTION PARTIELLE: Certains fichiers manquent source_files_details")
            print("=" * 80)
    else:
        print("Choix invalide")

if __name__ == "__main__":
    main()
