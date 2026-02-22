#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Correction urgente : Copier les fichiers audio vers les bons dossiers
"""

import os
import shutil
import sys
import io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

OUTPUT_DIR = r"C:\Users\Shadow\Desktop\AUTOMATIONS\AUTOMATION_WHATSAPP_CR_SUPPORT_CLIENT\DATA\OUTPUT"

print("=" * 80)
print("CORRECTION DES DOSSIERS AUDIO")
print("=" * 80)

total_files_copied = 0
contacts_fixed = 0

# Parcourir tous les dossiers de contacts
for contact in os.listdir(OUTPUT_DIR):
    contact_path = os.path.join(OUTPUT_DIR, contact)

    if not os.path.isdir(contact_path):
        continue

    if contact == 'logs':  # Skip logs
        continue

    # Chemins source et destination
    source_received = os.path.join(contact_path, 'media_recus', 'audio')
    source_sent = os.path.join(contact_path, 'media_envoyes', 'audio')

    dest_received = os.path.join(contact_path, 'Audio_Received')
    dest_sent = os.path.join(contact_path, 'Audio_Sent')

    files_copied = 0

    # Copier les fichiers reçus
    if os.path.exists(source_received):
        os.makedirs(dest_received, exist_ok=True)

        for file in os.listdir(source_received):
            if file.endswith('.opus'):
                source = os.path.join(source_received, file)
                dest = os.path.join(dest_received, file)

                if not os.path.exists(dest):
                    shutil.copy2(source, dest)
                    files_copied += 1

    # Copier les fichiers envoyés
    if os.path.exists(source_sent):
        os.makedirs(dest_sent, exist_ok=True)

        for file in os.listdir(source_sent):
            if file.endswith('.opus'):
                source = os.path.join(source_sent, file)
                dest = os.path.join(dest_sent, file)

                if not os.path.exists(dest):
                    shutil.copy2(source, dest)
                    files_copied += 1

    if files_copied > 0:
        print(f"✅ {contact}: {files_copied} fichiers copiés")
        total_files_copied += files_copied
        contacts_fixed += 1

print("\n" + "=" * 80)
print(f"RÉSULTAT: {total_files_copied} fichiers copiés pour {contacts_fixed} contacts")
print("=" * 80)

print("\nLes fichiers audio sont maintenant dans les bons dossiers !")
print("Vous pouvez relancer le workflow.")