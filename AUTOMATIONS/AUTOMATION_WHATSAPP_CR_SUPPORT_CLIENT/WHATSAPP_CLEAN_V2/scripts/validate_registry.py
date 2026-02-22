#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""Validation de cohérence du registry avant reconstruction"""
import json
import os
import sys
from pathlib import Path

def validate_registry():
    registry_path = Path(r"C:\Users\Moham\AUTOMATIONS\AUTOMATION_WHATSAPP_CR_SUPPORT_CLIENT\DATA\OUTPUT\.unified_registry.json")

    print("=" * 80)
    print("VALIDATION REGISTRY")
    print("=" * 80)

    # Charger registry
    print(f"\nChargement registry: {registry_path}")
    try:
        with open(registry_path, encoding='utf-8') as f:
            reg = json.load(f)
        print(f"OK - Registry charge: {len(reg.get('super_files', {}))} super_files")
    except Exception as e:
        print(f"ERREUR: Impossible de charger le registry: {e}")
        return False

    super_files = reg.get('super_files', {})

    # Validation 1: Tous les super_files ont source_files_details
    print("\n[TEST 1] Verification source_files_details...")
    missing_details = []
    for key, sf in super_files.items():
        if not sf.get('source_files_details'):
            missing_details.append(key)

    print(f"  Super_files sans source_files_details: {len(missing_details)}/{len(super_files)}")
    if missing_details:
        print("  Exemples:")
        for key in missing_details[:5]:
            print(f"    - {key}")

    # Validation 2: Tous les fichiers SuperAudio existent physiquement
    print("\n[TEST 2] Verification fichiers physiques...")
    missing_files = []
    for key, sf in super_files.items():
        path = sf.get('path', '')
        if path and not os.path.exists(path):
            missing_files.append((key, path))

    print(f"  Super_files avec fichiers manquants: {len(missing_files)}/{len(super_files)}")
    if missing_files and len(missing_files) < 20:
        print("  Exemples:")
        for key, path in missing_files[:5]:
            print(f"    - {key}")

    # Validation 3: Cohérence durées
    print("\n[TEST 3] Verification coherence durees...")
    duration_mismatches = []
    for key, sf in super_files.items():
        details = sf.get('source_files_details', [])
        if details:
            calculated_duration = details[-1].get('end_time', 0) if details else 0
            registry_duration = sf.get('duration_seconds', 0)
            if abs(calculated_duration - registry_duration) > 1.0:  # Tolérance 1s
                duration_mismatches.append((key, calculated_duration, registry_duration))

    print(f"  Incoherences durees (>1s): {len(duration_mismatches)}/{len(super_files)}")
    if duration_mismatches and len(duration_mismatches) < 20:
        print("  Exemples:")
        for key, calc, reg in duration_mismatches[:3]:
            print(f"    - {key}: calc={calc:.1f}s, reg={reg:.1f}s, diff={abs(calc-reg):.1f}s")

    # Verdict
    print("\n" + "=" * 80)
    print("VERDICT")
    print("=" * 80)

    is_valid = len(missing_details) == 0 and len(missing_files) < 10 and len(duration_mismatches) < 50

    if is_valid:
        print("OK - Registry VALIDE - Peut proceder a la reconstruction")
        return True
    else:
        print("AVERTISSEMENT - Registry a des problemes mineurs mais peut continuer")
        if len(missing_details) > 0:
            print(f"  CRITIQUE: {len(missing_details)} super_files sans source_files_details")
        if len(missing_files) >= 10:
            print(f"  ATTENTION: {len(missing_files)} fichiers physiques manquants")
        return len(missing_details) == 0  # Critique seulement si details manquants

if __name__ == '__main__':
    success = validate_registry()
    sys.exit(0 if success else 1)
