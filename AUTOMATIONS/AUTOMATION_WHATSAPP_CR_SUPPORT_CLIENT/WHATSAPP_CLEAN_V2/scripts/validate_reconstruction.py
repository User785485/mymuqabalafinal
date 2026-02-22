#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""Validation de la reconstruction"""
import json
import sys
from pathlib import Path

def validate_reconstruction():
    output_dir = Path(r"C:\Users\Moham\AUTOMATIONS\AUTOMATION_WHATSAPP_CR_SUPPORT_CLIENT\DATA\OUTPUT")

    print("=" * 80)
    print("VALIDATION POST-RECONSTRUCTION")
    print("=" * 80)

    segments_files = list(output_dir.rglob("*.segments.json"))

    has_details = 0
    missing_details = 0
    corrupted = 0

    print(f"\nAnalyse de {len(segments_files)} fichiers...")

    for i, seg_file in enumerate(segments_files):
        if (i + 1) % 50 == 0:
            print(f"  Traite: {i+1}/{len(segments_files)}")

        try:
            with open(seg_file, encoding='utf-8') as f:
                data = json.load(f)

            if data.get('source_files_details'):
                has_details += 1
            else:
                missing_details += 1
                if missing_details <= 10:
                    print(f"  KO Encore sans details: {seg_file.name}")
        except Exception as e:
            corrupted += 1
            print(f"  ERR Corrompu: {seg_file.name} - {e}")

    print("\n" + "=" * 80)
    print("RESULTATS")
    print("=" * 80)
    print(f"Total segments.json: {len(segments_files)}")
    print(f"  OK Avec source_files_details: {has_details}")
    print(f"  KO Sans source_files_details: {missing_details}")
    print(f"  ERR Corrompus: {corrupted}")

    success_rate = (has_details / len(segments_files) * 100) if segments_files else 0
    print(f"\nTaux de reussite: {success_rate:.1f}%")

    print("\n" + "=" * 80)
    print("VERDICT")
    print("=" * 80)

    if success_rate >= 95:
        print("OK - RECONSTRUCTION VALIDEE (>= 95%)")
        return True
    elif success_rate >= 80:
        print("ATTENTION - RECONSTRUCTION PARTIELLE (80-95%)")
        print("  Acceptable mais {:.1f}% fichiers non repares".format(100-success_rate))
        return True
    else:
        print("ECHEC - RECONSTRUCTION INCOMPLETE (< 80%)")
        return False

if __name__ == '__main__':
    success = validate_reconstruction()
    sys.exit(0 if success else 1)
