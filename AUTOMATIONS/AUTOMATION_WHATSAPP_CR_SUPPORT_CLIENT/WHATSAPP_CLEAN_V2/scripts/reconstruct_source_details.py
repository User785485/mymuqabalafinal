#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Reconstruction des source_files_details dans les fichiers .segments.json
Version: 1.0
Date: 2026-02-10
"""
import json
import os
import shutil
from pathlib import Path
from typing import Dict, Optional, Tuple
import re

# Chemins
DATA_DIR = Path(r"C:\Users\Moham\AUTOMATIONS\AUTOMATION_WHATSAPP_CR_SUPPORT_CLIENT\DATA\OUTPUT")
REGISTRY_PATH = DATA_DIR / ".unified_registry.json"
REPAIR_LIST_PATH = DATA_DIR / "segments_to_repair.txt"
LOG_PATH = DATA_DIR / "reconstruction_log.txt"

# Statistiques
stats = {
    'total': 0,
    'success': 0,
    'skipped_not_found': 0,
    'skipped_already_has': 0,
    'errors': 0,
    'warnings': []
}

def normalize_contact_name(name: str) -> str:
    """Normalise un nom de contact pour matching"""
    # Remplacer underscores par espaces
    normalized = name.replace('_', ' ')
    # Supprimer espaces multiples
    normalized = re.sub(r'\s+', ' ', normalized)
    return normalized.strip()

def extract_super_file_key(segments_path: Path) -> Tuple[str, str, str]:
    """
    Extrait contact, period, direction depuis le chemin du .segments.json

    Exemple:
    Input: C:\\...\\plus33_7_60_32_31_83\\SuperAudio\\plus33_7_60_32_31_83_received_2026-01.mp3.segments.json
    Output: ('plus33 7 60 32 31 83', '2026-01', 'received')
    """
    # Extraire le nom du fichier SuperFile
    super_file_name = segments_path.name.replace('.segments.json', '')

    # Pattern: {contact}_{direction}_{period}.mp3
    # Exemple: plus33_7_60_32_31_83_received_2026-01.mp3

    # Extraire direction (received ou sent)
    if '_received_' in super_file_name:
        direction = 'received'
        parts = super_file_name.split('_received_')
    elif '_sent_' in super_file_name:
        direction = 'sent'
        parts = super_file_name.split('_sent_')
    else:
        raise ValueError(f"Direction non trouvee dans {super_file_name}")

    contact_raw = parts[0]
    period_with_ext = parts[1]

    # Extraire period (enlever .mp3 et suffixes _partN)
    period = re.sub(r'(_part\d+)?\.mp3$', '', period_with_ext)

    # Normaliser le contact (underscores → espaces)
    contact = normalize_contact_name(contact_raw)

    return contact, period, direction

def find_registry_entry(contact: str, period: str, direction: str, super_files: Dict) -> Optional[Tuple[str, Dict]]:
    """
    Trouve l'entrée du registry correspondante
    Essaye plusieurs stratégies de matching
    """
    # Stratégie 1: Matching exact
    key = f"{contact}_{direction}_{period}"
    if key in super_files:
        return key, super_files[key]

    # Stratégie 2: Matching avec espaces (clé registry utilise espaces)
    key_spaces = f"{contact.replace('_', ' ')}_{direction}_{period}"
    if key_spaces in super_files:
        return key_spaces, super_files[key_spaces]

    # Stratégie 3: Parcourir toutes les clés et matcher contact + period + direction
    for reg_key, reg_entry in super_files.items():
        if (reg_entry.get('contact') == contact and
            reg_entry.get('period') == period and
            reg_entry.get('direction') == direction):
            return reg_key, reg_entry

    # Stratégie 4: Matching fuzzy (contact normalisé)
    normalized_contact = normalize_contact_name(contact)
    for reg_key, reg_entry in super_files.items():
        reg_contact_norm = normalize_contact_name(reg_entry.get('contact', ''))
        if (reg_contact_norm == normalized_contact and
            reg_entry.get('period') == period and
            reg_entry.get('direction') == direction):
            return reg_key, reg_entry

    return None, None

def reconstruct_segment_file(segments_path: Path, registry: Dict, dry_run: bool = False) -> bool:
    """
    Reconstruit un fichier .segments.json avec source_files_details

    Returns:
        True si succès, False sinon
    """
    try:
        # 1. Charger le fichier existant
        with open(segments_path, 'r', encoding='utf-8') as f:
            segments_data = json.load(f)

        # 2. Vérifier si déjà réparé
        if segments_data.get('source_files_details'):
            stats['skipped_already_has'] += 1
            print(f"SKIP (deja repare): {segments_path.name}")
            return True

        # 3. Extraire les métadonnées
        contact, period, direction = extract_super_file_key(segments_path)

        # 4. Trouver dans le registry
        super_files = registry.get('super_files', {})
        reg_key, reg_entry = find_registry_entry(contact, period, direction, super_files)

        if not reg_entry:
            stats['skipped_not_found'] += 1
            warning = f"NOT FOUND: {segments_path.name} (contact={contact}, period={period}, dir={direction})"
            print(f"  {warning}")
            stats['warnings'].append(warning)
            return False

        # 5. Extraire source_files_details
        source_files_details = reg_entry.get('source_files_details', [])

        if not source_files_details:
            stats['skipped_not_found'] += 1
            warning = f"NO DETAILS in registry: {reg_key}"
            print(f"  {warning}")
            stats['warnings'].append(warning)
            return False

        # 6. Valider cohérence durées
        registry_duration = reg_entry.get('duration_seconds', 0)
        segments_duration = segments_data.get('total_duration', 0)

        if abs(registry_duration - segments_duration) > registry_duration * 0.10:  # 10% tolérance
            warning = f"DUREE INCOHERENTE: {segments_path.name} - registry={registry_duration:.1f}s, segments={segments_duration:.1f}s"
            print(f"  {warning}")
            stats['warnings'].append(warning)

        # 7. Injecter source_files_details
        segments_data['source_files_details'] = source_files_details

        if dry_run:
            print(f"DRY-RUN: {segments_path.name} -> {len(source_files_details)} fichiers sources")
            stats['success'] += 1
            return True

        # 8. Sauvegarde atomique (via fichier temporaire)
        temp_path = segments_path.with_suffix('.json.tmp')

        with open(temp_path, 'w', encoding='utf-8') as f:
            json.dump(segments_data, f, ensure_ascii=False, indent=2)

        # 9. Validation du JSON écrit
        with open(temp_path, 'r', encoding='utf-8') as f:
            json.load(f)  # Teste si parsable

        # 10. Remplacer l'ancien fichier
        shutil.move(str(temp_path), str(segments_path))

        stats['success'] += 1
        print(f"SUCCESS: {segments_path.name} -> {len(source_files_details)} fichiers sources")

        return True

    except Exception as e:
        stats['errors'] += 1
        error_msg = f"ERROR: {segments_path.name} - {type(e).__name__}: {str(e)}"
        print(f"  {error_msg}")
        stats['warnings'].append(error_msg)

        # Cleanup fichier temporaire si existant
        temp_path = segments_path.with_suffix('.json.tmp')
        if temp_path.exists():
            temp_path.unlink()

        return False

def main(dry_run: bool = False):
    """Point d'entrée principal"""
    print("=" * 80)
    print("RECONSTRUCTION SOURCE_FILES_DETAILS")
    if dry_run:
        print("MODE: DRY-RUN (aucune modification)")
    else:
        print("MODE: PRODUCTION (modification des fichiers)")
    print("=" * 80)

    # Charger le registry
    print(f"\nChargement registry: {REGISTRY_PATH}")
    with open(REGISTRY_PATH, encoding='utf-8') as f:
        registry = json.load(f)
    print(f"OK - Registry charge: {len(registry.get('super_files', {}))} super_files")

    # Charger la liste de réparation
    print(f"\nChargement liste reparation: {REPAIR_LIST_PATH}")
    with open(REPAIR_LIST_PATH, 'r', encoding='utf-8') as f:
        repair_paths = [Path(line.strip()) for line in f if line.strip()]
    print(f"OK - {len(repair_paths)} fichiers a reparer")

    # Traitement
    print("\n" + "=" * 80)
    print("TRAITEMENT")
    print("=" * 80)

    stats['total'] = len(repair_paths)

    for i, segments_path in enumerate(repair_paths, 1):
        if i % 50 == 0 or i == 1:
            print(f"\n[{i}/{stats['total']}]")
        reconstruct_segment_file(segments_path, registry, dry_run)

    # Rapport final
    print("\n" + "=" * 80)
    print("RAPPORT FINAL")
    print("=" * 80)
    print(f"Total traites: {stats['total']}")
    print(f"  Succes: {stats['success']}")
    print(f"  Deja repares: {stats['skipped_already_has']}")
    print(f"  Non trouves: {stats['skipped_not_found']}")
    print(f"  Erreurs: {stats['errors']}")

    if stats['warnings']:
        print(f"\n{len(stats['warnings'])} warnings (premiers 20):")
        for warning in stats['warnings'][:20]:
            print(f"  {warning}")
        if len(stats['warnings']) > 20:
            print(f"  ... et {len(stats['warnings']) - 20} autres warnings")

    # Sauvegarder le log
    with open(LOG_PATH, 'w', encoding='utf-8') as f:
        f.write("RECONSTRUCTION SOURCE_FILES_DETAILS\n")
        f.write("=" * 80 + "\n")
        f.write(f"Total: {stats['total']}\n")
        f.write(f"Succes: {stats['success']}\n")
        f.write(f"Deja repares: {stats['skipped_already_has']}\n")
        f.write(f"Non trouves: {stats['skipped_not_found']}\n")
        f.write(f"Erreurs: {stats['errors']}\n\n")
        f.write("WARNINGS:\n")
        for warning in stats['warnings']:
            f.write(warning + '\n')

    print(f"\nLog sauvegarde: {LOG_PATH}")
    print("=" * 80)

    # Verdict
    success_rate = (stats['success'] / stats['total'] * 100) if stats['total'] > 0 else 0

    print(f"\nTaux de reussite: {success_rate:.1f}%")

    if success_rate >= 95:
        print("OK - RECONSTRUCTION REUSSIE (>= 95% succes)")
        return True
    elif success_rate >= 80:
        print("ATTENTION - RECONSTRUCTION PARTIELLE (80-95% succes) - Verifier warnings")
        return True
    else:
        print("ECHEC - RECONSTRUCTION ECHOUEE (< 80% succes) - Intervention manuelle requise")
        return False

if __name__ == '__main__':
    import sys

    dry_run = '--dry-run' in sys.argv
    success = main(dry_run)

    sys.exit(0 if success else 1)
