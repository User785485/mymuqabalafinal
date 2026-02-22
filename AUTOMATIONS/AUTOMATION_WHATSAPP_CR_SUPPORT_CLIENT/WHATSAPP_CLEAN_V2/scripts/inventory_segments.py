#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""Inventaire des fichiers .segments.json et classification"""
import json
import os
import sys
from pathlib import Path
from collections import defaultdict

def inventory_segments():
    output_dir = Path(r"C:\Users\Moham\AUTOMATIONS\AUTOMATION_WHATSAPP_CR_SUPPORT_CLIENT\DATA\OUTPUT")
    registry_path = output_dir / ".unified_registry.json"

    print("=" * 80)
    print("INVENTAIRE SEGMENTS.JSON")
    print("=" * 80)

    # Charger registry
    with open(registry_path, encoding='utf-8') as f:
        reg = json.load(f)

    super_files = reg.get('super_files', {})

    # Trouver tous les .segments.json
    print("\nRecherche fichiers .segments.json...")
    segments_files = list(output_dir.rglob("*.segments.json"))
    print(f"Trouves: {len(segments_files)} fichiers")

    # Classification
    has_source_details = []
    missing_source_details = []
    corrupted = []

    print("\nClassification...")
    for i, seg_file in enumerate(segments_files):
        if (i + 1) % 50 == 0:
            print(f"  Traite: {i+1}/{len(segments_files)}")

        try:
            with open(seg_file, encoding='utf-8') as f:
                data = json.load(f)

            if data.get('source_files_details'):
                has_source_details.append(seg_file)
            else:
                missing_source_details.append(seg_file)
        except Exception as e:
            corrupted.append((seg_file, str(e)))

    # Segments.json manquants (dans registry mais pas de fichier)
    print("\nVerification segments.json manquants...")
    missing_segments = []
    for key, sf in super_files.items():
        path = sf.get('path', '')
        if path:
            seg_path = Path(path + '.segments.json')
            if not seg_path.exists():
                missing_segments.append((key, str(seg_path)))

    # Rapport
    print("\n" + "=" * 80)
    print("RESULTATS")
    print("=" * 80)
    print(f"Fichiers .segments.json trouves: {len(segments_files)}")
    print(f"  OK Avec source_files_details: {len(has_source_details)}")
    print(f"  KO Sans source_files_details: {len(missing_source_details)} (A REPARER)")
    print(f"  ERR Corrompus: {len(corrupted)}")
    print(f"\nSuper_files dans registry: {len(super_files)}")
    print(f"Segments.json manquants (dans registry): {len(missing_segments)}")

    if corrupted:
        print(f"\nFICHIERS CORROMPUS:")
        for seg_file, error in corrupted[:10]:
            print(f"  - {seg_file.name}: {error}")

    # Sauvegarder la liste des fichiers à réparer
    repair_list_path = output_dir / "segments_to_repair.txt"
    print(f"\nSauvegarde liste reparation: {repair_list_path}")
    with open(repair_list_path, 'w', encoding='utf-8') as f:
        for seg_file in missing_source_details:
            f.write(str(seg_file) + '\n')

    print(f"OK - {len(missing_source_details)} fichiers a reparer listes")

    print("\n" + "=" * 80)
    print("VERDICT")
    print("=" * 80)

    if len(corrupted) == 0:
        print("OK - Aucun fichier corrompu")
    else:
        print(f"ATTENTION - {len(corrupted)} fichiers corrompus necessitent attention")

    print(f"\nCIBLE: Reparer {len(missing_source_details)} fichiers")

    return {
        'total': len(segments_files),
        'has_details': len(has_source_details),
        'missing_details': len(missing_source_details),
        'corrupted': len(corrupted),
        'missing_segments': len(missing_segments)
    }

if __name__ == '__main__':
    stats = inventory_segments()
    sys.exit(0)
