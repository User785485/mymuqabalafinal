#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Script de vérification de l'installation
"""

import os
import sys
import subprocess
import importlib
import io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

print("=" * 80)
print("VÉRIFICATION DE L'INSTALLATION WHATSAPP EXTRACTOR V2")
print("=" * 80)

errors = []
warnings = []

# 1. Vérifier Python
print("\n1. VÉRIFICATION PYTHON")
print("-" * 40)
python_version = sys.version_info
print(f"✅ Python {python_version.major}.{python_version.minor}.{python_version.micro}")
if python_version.major < 3 or (python_version.major == 3 and python_version.minor < 8):
    errors.append("Python 3.8+ requis")

# 2. Vérifier les modules Python
print("\n2. VÉRIFICATION DES MODULES")
print("-" * 40)

required_modules = {
    'bs4': 'beautifulsoup4',
    'openai': 'openai',
    'httpx': 'httpx',
    'colorama': 'colorama',
    'tqdm': 'tqdm',
    'pandas': 'pandas'
}

for module, package in required_modules.items():
    try:
        importlib.import_module(module)
        print(f"✅ {package}")
    except ImportError:
        print(f"❌ {package}")
        errors.append(f"Module manquant: {package}")

# 3. Vérifier la structure des dossiers
print("\n3. VÉRIFICATION DE LA STRUCTURE")
print("-" * 40)

required_dirs = [
    'src',
    'src/core',
    'ffmpeg/bin',
    'scripts',
    'batch'
]

for dir_path in required_dirs:
    if os.path.exists(dir_path):
        print(f"✅ {dir_path}/")
    else:
        print(f"❌ {dir_path}/")
        warnings.append(f"Dossier manquant: {dir_path}")

# 4. Vérifier les fichiers critiques
print("\n4. VÉRIFICATION DES FICHIERS")
print("-" * 40)

required_files = [
    'main.py',
    'main_fixed.py',
    'config.ini',
    'src/processors.py',
    'src/exporters.py',
    'src/core/registry.py',
    'src/core/file_manager.py'
]

for file_path in required_files:
    if os.path.exists(file_path):
        print(f"✅ {file_path}")
    else:
        print(f"❌ {file_path}")
        errors.append(f"Fichier manquant: {file_path}")

# 5. Vérifier FFmpeg
print("\n5. VÉRIFICATION FFMPEG")
print("-" * 40)

ffmpeg_path = os.path.join('ffmpeg', 'bin', 'ffmpeg.exe')
if os.path.exists(ffmpeg_path):
    print(f"✅ FFmpeg trouvé")
    try:
        result = subprocess.run([ffmpeg_path, '-version'],
                              capture_output=True, text=True, timeout=5)
        if result.returncode == 0:
            version_line = result.stdout.split('\n')[0]
            print(f"   {version_line}")
    except:
        warnings.append("FFmpeg trouvé mais impossible de vérifier la version")
else:
    print(f"❌ FFmpeg non trouvé")
    errors.append("FFmpeg manquant")

# 6. Vérifier config.ini
print("\n6. VÉRIFICATION CONFIGURATION")
print("-" * 40)

if os.path.exists('config.ini'):
    print("✅ config.ini existe")

    # Lire et vérifier les chemins
    try:
        with open('config.ini', 'r', encoding='utf-8') as f:
            content = f.read()
            if 'html_dir' in content and 'media_dir' in content and 'output_dir' in content:
                print("✅ Configuration semble correcte")
            else:
                warnings.append("Configuration incomplète")
    except:
        warnings.append("Impossible de lire config.ini")
else:
    print("❌ config.ini manquant")
    errors.append("config.ini manquant")

# 7. Test d'import des modules custom
print("\n7. TEST D'IMPORT DES MODULES")
print("-" * 40)

try:
    sys.path.insert(0, 'src')
    from config import Config
    print("✅ Import Config")
except:
    print("❌ Import Config")
    errors.append("Impossible d'importer Config")

try:
    from processors import HTMLParser
    print("✅ Import HTMLParser")
except:
    print("❌ Import HTMLParser")
    errors.append("Impossible d'importer HTMLParser")

try:
    from core import UnifiedRegistry
    print("✅ Import UnifiedRegistry")
except:
    print("❌ Import UnifiedRegistry")
    errors.append("Impossible d'importer UnifiedRegistry")

# RÉSUMÉ
print("\n" + "=" * 80)
print("RÉSUMÉ DE LA VÉRIFICATION")
print("=" * 80)

if errors:
    print(f"\n❌ {len(errors)} ERREURS CRITIQUES:")
    for error in errors:
        print(f"   - {error}")

if warnings:
    print(f"\n⚠️ {len(warnings)} AVERTISSEMENTS:")
    for warning in warnings:
        print(f"   - {warning}")

if not errors and not warnings:
    print("\n✅ INSTALLATION PARFAITE !")
    print("Tout est prêt pour l'utilisation.")
elif not errors:
    print("\n✅ Installation fonctionnelle")
    print("Le système devrait fonctionner malgré les avertissements.")
else:
    print("\n❌ Installation incomplète")
    print("Veuillez corriger les erreurs avant d'utiliser le système.")

    if any("Module manquant" in e for e in errors):
        print("\nPour installer les modules manquants:")
        print("  pip install -r requirements.txt")

print("\n" + "=" * 80)