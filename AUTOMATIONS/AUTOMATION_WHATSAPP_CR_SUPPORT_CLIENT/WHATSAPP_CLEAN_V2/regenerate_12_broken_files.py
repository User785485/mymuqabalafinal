#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script pour régénérer les 12 fichiers segments.json défectueux
(ceux créés SANS source_files_details)

Utilisation:
    python regenerate_12_broken_files.py
"""

import os
import sys
import shutil
from pathlib import Path
from datetime import datetime

# Fix encoding pour Windows
if sys.platform == 'win32':
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

# Liste des 12 fichiers défectueux (chemins relatifs depuis WHATSAPP_CLEAN_V2)
BROKEN_FILES = [
    "../DATA/OUTPUT/Najete/SuperAudio/Najete_received_2026-02.mp3",
    "../DATA/OUTPUT/Najete/SuperAudio/Najete_sent_2026-02.mp3",
    "../DATA/OUTPUT/plus33_6_09_92_85_07/SuperAudio/plus33_6_09_92_85_07_received_2026-02.mp3",
    "../DATA/OUTPUT/plus33_6_09_92_85_07/SuperAudio/plus33_6_09_92_85_07_sent_2026-02.mp3",
    "../DATA/OUTPUT/plus33_6_46_37_48_17/SuperAudio/plus33_6_46_37_48_17_received_2026-02.mp3",
    "../DATA/OUTPUT/plus33_6_48_13_93_98/SuperAudio/plus33_6_48_13_93_98_received_2026-02.mp3",
    "../DATA/OUTPUT/plus33_6_51_38_11_19/SuperAudio/plus33_6_51_38_11_19_received_2026-02.mp3",
    "../DATA/OUTPUT/plus33_6_59_87_98_14/SuperAudio/plus33_6_59_87_98_14_received_2026-02.mp3",
    "../DATA/OUTPUT/plus33_6_64_97_97_79/SuperAudio/plus33_6_64_97_97_79_received_2026-02.mp3",
    "../DATA/OUTPUT/plus33_6_65_13_04_12/SuperAudio/plus33_6_65_13_04_12_received_2026-02.mp3",
    "../DATA/OUTPUT/plus33_6_65_13_04_12/SuperAudio/plus33_6_65_13_04_12_sent_2026-02.mp3",
    "../DATA/OUTPUT/plus33_6_65_14_34_35/SuperAudio/plus33_6_65_14_34_35_received_2026-02.mp3",
]

def main():
    print("=" * 80)
    print("RÉGÉNÉRATION DES 12 FICHIERS SEGMENTS.JSON DÉFECTUEUX")
    print("=" * 80)
    print()
    print("Ce script va :")
    print("  1. Sauvegarder les fichiers actuels (.txt et .segments.json)")
    print("  2. Supprimer les fichiers défectueux")
    print("  3. Permettre leur régénération avec le fix source_files_details")
    print()
    print("⚠️  IMPORTANT : Après ce script, lancer :")
    print("   python main_fixed_v2.py --config config_with_sent.ini --full")
    print()

    # Demander confirmation
    response = input("Voulez-vous continuer ? [o/N] : ").strip().lower()
    if response not in ['o', 'oui', 'y', 'yes']:
        print("\n❌ Annulé par l'utilisateur.")
        return

    # Créer dossier backup
    backup_dir = f"BACKUPS/fix_source_files_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
    os.makedirs(backup_dir, exist_ok=True)
    print(f"\n📁 Backup directory: {backup_dir}")

    deleted_segments = 0
    deleted_txt = 0
    backed_up = 0
    missing = 0
    errors = 0

    for mp3_file in BROKEN_FILES:
        mp3_path = Path(mp3_file)
        segments_file = Path(str(mp3_path) + '.segments.json')
        txt_file = Path(str(mp3_path) + '.txt')

        print(f"\n📁 Traitement: {mp3_path.name}")

        # Vérifier que le mp3 existe
        if not mp3_path.exists():
            print(f"  ⚠️  SKIP: Fichier MP3 introuvable: {mp3_path}")
            missing += 1
            continue

        # Backup et suppression segments.json
        if segments_file.exists():
            try:
                # Backup
                backup_name = f"{mp3_path.stem}.segments.json"
                backup_path = Path(backup_dir) / backup_name
                shutil.copy2(segments_file, backup_path)
                print(f"  ✅ Backup segments: {backup_name}")
                backed_up += 1

                # Supprimer
                segments_file.unlink()
                print(f"  🗑️  Supprimé: .segments.json")
                deleted_segments += 1

            except Exception as e:
                print(f"  ❌ Erreur segments: {e}")
                errors += 1
        else:
            print(f"  ℹ️  Déjà absent: .segments.json")

        # Backup et suppression .txt (optionnel - pour forcer re-transcription)
        if txt_file.exists():
            try:
                # Backup
                backup_name = f"{mp3_path.stem}.txt"
                backup_path = Path(backup_dir) / backup_name
                shutil.copy2(txt_file, backup_path)
                print(f"  ✅ Backup txt: {backup_name}")

                # Supprimer pour forcer re-transcription complète
                txt_file.unlink()
                print(f"  🗑️  Supprimé: .txt")
                deleted_txt += 1

            except Exception as e:
                print(f"  ❌ Erreur txt: {e}")
                errors += 1

    print()
    print("=" * 80)
    print("RÉSUMÉ")
    print("=" * 80)
    print(f"✅ Fichiers sauvegardés:      {backed_up}")
    print(f"🗑️  Segments supprimés:       {deleted_segments}")
    print(f"🗑️  TXT supprimés:            {deleted_txt}")
    print(f"⚠️  Fichiers MP3 manquants:   {missing}")
    print(f"❌ Erreurs:                   {errors}")
    print(f"📁 Backup directory:          {backup_dir}")
    print()

    if deleted_segments > 0:
        print("=" * 80)
        print("✅ SUCCÈS - Fichiers préparés pour régénération")
        print("=" * 80)
        print()
        print("PROCHAINES ÉTAPES:")
        print()
        print("1. Supprimer les entrées cache correspondantes (optionnel):")
        print("   python remove_cache_entries.py")
        print()
        print("2. Lancer la transcription complète:")
        print("   python main_fixed_v2.py --config config_with_sent.ini --full")
        print()
        print(f"3. Les {deleted_segments} fichiers seront recréés AVEC source_files_details")
        print()
        print("4. Valider avec:")
        print("   python test_source_files_fix.py")
        print("   Choisir option 3 (Analyse globale)")
        print()
        print("   Attendu: 366/366 (100%) avec source_files_details ✅")
        print()
    else:
        print("⚠️  Aucun fichier supprimé - Vérifier les chemins")

if __name__ == "__main__":
    main()
