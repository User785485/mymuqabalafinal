#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Test complet du workflow média pour comprendre le blocage
"""

import os
import sys
import io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
sys.path.insert(0, 'src')

from processors import HTMLParser, MediaOrganizer
from config import Config
from core import UnifiedRegistry, FileManager
import logging

# Configuration du logging
logging.basicConfig(
    level=logging.DEBUG,
    format='%(levelname)s | %(message)s'
)
logger = logging.getLogger('test_workflow')

print("=" * 80)
print("TEST COMPLET DU WORKFLOW MÉDIA")
print("=" * 80)

# Initialiser les composants
config = Config('config.ini')
output_dir = config.get('Paths', 'output_dir')
html_dir = config.get('Paths', 'html_dir')
media_dir = config.get('Paths', 'media_dir')

print(f"\nConfiguration:")
print(f"  HTML: {html_dir}")
print(f"  MEDIA: {media_dir}")
print(f"  OUTPUT: {output_dir}")

registry = UnifiedRegistry(output_dir)
file_manager = FileManager(output_dir)

# 1. Parser un fichier HTML
print("\n1. PARSING HTML")
print("-" * 40)

html_parser = HTMLParser(config, registry, file_manager)

# Parser juste un contact pour tester
test_file = os.path.join(html_dir, "Najate-webi349.html")
print(f"Test avec: {test_file}")

# Parser manuellement
from bs4 import BeautifulSoup

messages = []
with open(test_file, 'r', encoding='utf-8') as f:
    soup = BeautifulSoup(f.read(), 'html.parser')

# Extraire quelques messages avec média
message_divs = soup.find_all(['p', 'table'])
media_count = 0

for element in message_divs[:100]:  # Limiter pour le test
    # Chercher les liens média
    if element.name == 'table':
        links = element.find_all('a')
        for link in links:
            href = link.get('href', '')
            if 'opus' in href.lower():
                media_count += 1
                filename = os.path.basename(href)

                # Créer un message fictif pour test
                messages.append({
                    'content': f'Audio: {filename}',
                    'media_files': [filename],
                    'direction': 'received',
                    'timestamp': '2025-01-01 12:00'
                })

print(f"✅ {media_count} messages avec fichiers OPUS trouvés")
print(f"✅ {len(messages)} messages créés pour le test")

# 2. Tester l'organisation des médias
print("\n2. TEST ORGANISATION MÉDIA")
print("-" * 40)

media_organizer = MediaOrganizer(config, registry, file_manager)

# Créer un mini dataset de test
test_conversations = {
    'Najate-webi349': messages[:5]  # Juste 5 messages pour tester
}

print(f"Test avec {len(test_conversations['Najate-webi349'])} messages")

# Afficher les références média
for i, msg in enumerate(test_conversations['Najate-webi349'], 1):
    if msg.get('media_files'):
        print(f"  Message {i}: {msg['media_files'][0]}")

# Lancer l'organisation
print("\n3. LANCEMENT DE L'ORGANISATION")
print("-" * 40)

try:
    # Construire le cache d'abord
    media_organizer._build_media_cache(media_dir)
    print(f"✅ Cache construit: {len(media_organizer._media_cache)} entrées")

    # Tester la recherche de quelques fichiers
    print("\n4. TEST DE RECHERCHE INDIVIDUELLE")
    print("-" * 40)

    for msg in test_conversations['Najate-webi349']:
        if msg.get('media_files'):
            for media_ref in msg['media_files']:
                found = media_organizer._find_media_file(media_ref, media_dir)
                if found:
                    print(f"  ✅ Trouvé: {media_ref}")
                    print(f"     → {found}")

                    # Tester aussi l'organisation
                    contact_paths = file_manager.setup_contact_directory('Najate-webi349')
                    dest = media_organizer._organize_media_file(
                        found, 'Najate-webi349', msg['direction'], contact_paths
                    )
                    if dest:
                        print(f"     → Organisé vers: {dest}")
                    else:
                        print(f"     ❌ Échec de l'organisation")
                else:
                    print(f"  ❌ Non trouvé: {media_ref}")

    # Maintenant tester le workflow complet
    print("\n5. TEST DU WORKFLOW COMPLET")
    print("-" * 40)

    # Réinitialiser pour test complet
    media_organizer._cache_built = False
    media_organizer._media_cache = {}

    # Lancer l'organisation complète
    media_organizer.organize_media(test_conversations, media_dir)

except Exception as e:
    print(f"❌ Erreur: {e}")
    import traceback
    traceback.print_exc()

# 6. Vérifier les résultats
print("\n6. VÉRIFICATION DES RÉSULTATS")
print("-" * 40)

contact_dir = os.path.join(output_dir, 'Najate-webi349')
if os.path.exists(contact_dir):
    print(f"✅ Dossier contact créé: {contact_dir}")

    # Vérifier les sous-dossiers
    for subdir in ['Received', 'Sent', 'Audio', 'SuperAudio']:
        subdir_path = os.path.join(contact_dir, subdir)
        if os.path.exists(subdir_path):
            files = os.listdir(subdir_path)
            print(f"  • {subdir}: {len(files)} fichiers")
            for f in files[:3]:
                print(f"    - {f}")
else:
    print(f"❌ Dossier contact non créé: {contact_dir}")

print("\n" + "=" * 80)
print("FIN DU TEST")
print("=" * 80)