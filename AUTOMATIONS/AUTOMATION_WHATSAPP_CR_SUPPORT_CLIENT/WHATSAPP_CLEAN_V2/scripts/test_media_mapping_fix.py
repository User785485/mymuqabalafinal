#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Test et correction du mapping des fichiers média
"""

import os
import sys
import io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
sys.path.insert(0, 'src')

from bs4 import BeautifulSoup
import json

# Chemins
HTML_DIR = r"C:\Users\Shadow\Desktop\AUTOMATIONS\AUTOMATION_WHATSAPP_CR_SUPPORT_CLIENT\DATA\INPUT\HTML"
MEDIA_DIR = r"C:\Users\Shadow\Desktop\AUTOMATIONS\AUTOMATION_WHATSAPP_CR_SUPPORT_CLIENT\DATA\INPUT\MEDIA"

print("=" * 80)
print("TEST DU MAPPING DES FICHIERS MÉDIA")
print("=" * 80)

# 1. Construire un index des fichiers média disponibles
print("\n1. CONSTRUCTION DE L'INDEX DES MÉDIAS")
print("-" * 40)

media_index = {}
opus_files = []

for file in os.listdir(MEDIA_DIR):
    if file.endswith('.opus'):
        opus_files.append(file)
        # Indexer par nom complet
        media_index[file] = os.path.join(MEDIA_DIR, file)
        # Indexer aussi par UUID sans extension
        uuid_part = file.replace('.opus', '')
        media_index[uuid_part] = os.path.join(MEDIA_DIR, file)
        # Indexer par 8 premiers caractères
        if len(file) >= 8:
            prefix = file[:8]
            if prefix not in media_index:
                media_index[prefix] = os.path.join(MEDIA_DIR, file)

print(f"✅ {len(opus_files)} fichiers OPUS indexés")
print(f"✅ {len(media_index)} entrées dans l'index")

# 2. Parser un fichier HTML et extraire les références média
print("\n2. EXTRACTION DES RÉFÉRENCES DEPUIS HTML")
print("-" * 40)

test_html = os.path.join(HTML_DIR, "Najate-webi349.html")
print(f"Test avec: {test_html}")

media_references = []

with open(test_html, 'r', encoding='utf-8') as f:
    soup = BeautifulSoup(f.read(), 'html.parser')

# Chercher tous les liens
links = soup.find_all('a')
for link in links:
    href = link.get('href', '')
    if 'opus' in href.lower():
        # Extraire juste le nom du fichier
        filename = os.path.basename(href)
        media_references.append({
            'full_href': href,
            'filename': filename,
            'uuid': filename.replace('.opus', '') if filename.endswith('.opus') else filename
        })

print(f"✅ {len(media_references)} références OPUS trouvées dans le HTML")

if media_references:
    print("\nExemples de références trouvées:")
    for ref in media_references[:3]:
        print(f"  - {ref['filename']}")

# 3. Tester le mapping
print("\n3. TEST DU MAPPING")
print("-" * 40)

found = 0
not_found = 0
mapping_results = []

for ref in media_references:
    filename = ref['filename']
    uuid = ref['uuid']

    # Essayer de trouver le fichier
    found_path = None

    # Méthode 1: Nom exact
    if filename in media_index:
        found_path = media_index[filename]
    # Méthode 2: UUID sans extension
    elif uuid in media_index:
        found_path = media_index[uuid]
    # Méthode 3: Préfixe 8 caractères
    elif len(filename) >= 8 and filename[:8] in media_index:
        found_path = media_index[filename[:8]]

    if found_path:
        found += 1
        mapping_results.append({
            'reference': filename,
            'found': True,
            'path': found_path
        })
    else:
        not_found += 1
        mapping_results.append({
            'reference': filename,
            'found': False,
            'path': None
        })

print(f"\n📊 RÉSULTATS:")
print(f"  ✅ Trouvés: {found}/{len(media_references)} ({found*100/len(media_references):.1f}%)")
print(f"  ❌ Non trouvés: {not_found}/{len(media_references)} ({not_found*100/len(media_references):.1f}%)")

# Afficher quelques exemples
if not_found > 0:
    print("\n⚠️ Fichiers NON trouvés (exemples):")
    for result in mapping_results:
        if not result['found']:
            print(f"  - {result['reference']}")
            # Chercher des correspondances proches
            close_matches = [f for f in opus_files if result['reference'][:8] in f]
            if close_matches:
                print(f"    → Correspondance proche: {close_matches[0]}")
            break

# 4. Vérifier si c'est un problème de casse ou de caractères
print("\n4. ANALYSE DES PROBLÈMES POTENTIELS")
print("-" * 40)

if not_found > 0:
    # Prendre un exemple non trouvé
    for result in mapping_results:
        if not result['found']:
            ref = result['reference']
            print(f"\nAnalyse de: {ref}")

            # Vérifier la casse
            for media_file in opus_files[:10]:
                if ref.lower() == media_file.lower():
                    print(f"  ⚠️ Problème de casse détecté: {media_file}")
                    break

            # Vérifier si le fichier existe vraiment
            direct_path = os.path.join(MEDIA_DIR, ref)
            if os.path.exists(direct_path):
                print(f"  ✅ Le fichier EXISTE directement: {direct_path}")
            else:
                print(f"  ❌ Le fichier n'existe PAS: {direct_path}")

            break

# 5. Proposer une solution
print("\n5. SOLUTION PROPOSÉE")
print("-" * 40)

if found == len(media_references):
    print("✅ PARFAIT ! Tous les fichiers sont trouvés avec le système actuel.")
elif found > 0:
    print(f"⚠️ PARTIEL: {found*100/len(media_references):.1f}% des fichiers sont trouvés.")
    print("\nActions recommandées:")
    print("1. Vérifier que TOUS les fichiers ont été copiés dans DATA/INPUT/MEDIA")
    print("2. Vérifier les permissions d'accès aux fichiers")
    print("3. Peut-être reconstruire l'index avec une recherche plus flexible")
else:
    print("❌ CRITIQUE: Aucun fichier trouvé!")
    print("\nVérifications urgentes:")
    print("1. Les fichiers OPUS sont-ils vraiment dans DATA/INPUT/MEDIA ?")
    print("2. Les noms correspondent-ils exactement ?")
    print("3. Y a-t-il un problème de chemin ou de permissions ?")

# 6. Tester directement avec le système actuel
print("\n6. TEST AVEC LE SYSTÈME ACTUEL")
print("-" * 40)

try:
    from processors import MediaOrganizer
    from config import Config
    from core import UnifiedRegistry, FileManager

    # Initialiser les composants
    config = Config('config.ini')
    output_dir = config.get('Paths', 'output_dir')
    registry = UnifiedRegistry(output_dir)
    file_manager = FileManager(output_dir)

    # Créer MediaOrganizer
    media_org = MediaOrganizer(config, registry, file_manager)

    # Construire le cache
    media_org._build_media_cache(MEDIA_DIR)

    print(f"✅ Cache construit: {len(media_org._media_cache)} entrées")

    # Tester quelques recherches
    test_count = 0
    success_count = 0

    for ref in media_references[:5]:
        test_count += 1
        found = media_org._find_media_file(ref['filename'], MEDIA_DIR)
        if found:
            success_count += 1
            print(f"  ✅ Trouvé: {ref['filename']}")
        else:
            print(f"  ❌ Non trouvé: {ref['filename']}")

    print(f"\nRésultat: {success_count}/{test_count} trouvés avec MediaOrganizer")

except Exception as e:
    print(f"❌ Erreur lors du test avec le système: {e}")

print("\n" + "=" * 80)
print("FIN DU TEST")
print("=" * 80)