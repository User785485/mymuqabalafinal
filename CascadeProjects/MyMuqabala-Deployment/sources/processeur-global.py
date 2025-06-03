#!/usr/bin/env python3
# -*- coding: utf-8 -*-

# Forcer l'encodage UTF-8 pour la sortie console
import sys
import io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')

"""
My Muqabala - Processeur Global
Génère les compte-rendus personnalisés avec protection par code
"""

import os
import json
import random
import hashlib
import shutil
import subprocess
import datetime
import time
import csv
import re
from pathlib import Path
from typing import Dict, List, Tuple, Optional
import sys

# Configuration des couleurs pour Windows
if sys.platform == "win32":
    os.system("color")

class Colors:
    """Couleurs pour l'affichage console"""
    HEADER = '\033[95m'
    BLUE = '\033[94m'
    CYAN = '\033[96m'
    GREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'

class Logger:
    """Système de logging avec affichage coloré et fichier"""
    
    def __init__(self, log_dir: str, log_level: str = "INFO"):
        self.log_dir = Path(log_dir)
        self.log_dir.mkdir(parents=True, exist_ok=True)
        self.log_file = self.log_dir / f"process-{datetime.datetime.now().strftime('%Y-%m-%d_%H-%M-%S')}.log"
        self.log_level = log_level
        self.start_time = time.time()
        
    def _write(self, level: str, message: str, color: str = ""):
        """Écrit dans le fichier et affiche en console"""
        timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        log_entry = f"[{timestamp}] {level}: {message}"
        
        # Fichier
        with open(self.log_file, 'a', encoding='utf-8') as f:
            f.write(log_entry + '\n')
        
        # Console avec couleur
        if color:
            print(f"{color}{log_entry}{Colors.ENDC}")
        else:
            print(log_entry)
    
    def debug(self, message: str):
        if self.log_level == "DEBUG":
            self._write("DEBUG", message, Colors.CYAN)
    
    def info(self, message: str):
        self._write("INFO", message, Colors.GREEN)
    
    def warning(self, message: str):
        self._write("WARNING", message, Colors.WARNING)
    
    def error(self, message: str):
        self._write("ERROR", message, Colors.FAIL)
    
    def success(self, message: str):
        self._write("SUCCESS", message, Colors.GREEN + Colors.BOLD)
    
    def header(self, message: str):
        """Affiche un header visible"""
        print(f"\n{Colors.HEADER}{'='*60}{Colors.ENDC}")
        print(f"{Colors.HEADER}{message.center(60)}{Colors.ENDC}")
        print(f"{Colors.HEADER}{'='*60}{Colors.ENDC}\n")
        self._write("HEADER", message)

class DatabaseManager:
    """Gère la base de données des codes générés"""
    
    def __init__(self, db_path: str, logger: Logger):
        self.db_path = Path(db_path)
        self.logger = logger
        self.data = {}
        self.load()
    
    def load(self):
        """Charge la base de données existante"""
        if self.db_path.exists():
            try:
                with open(self.db_path, 'r', encoding='utf-8') as f:
                    self.data = json.load(f)
                self.logger.info(f"Base de données chargée : {len(self.data)} entrées")
            except Exception as e:
                self.logger.error(f"Erreur lecture DB : {e}")
                self.data = {}
        else:
            self.logger.info("Nouvelle base de données créée")
            self.save()
    
    def save(self):
        """Sauvegarde la base de données"""
        try:
            self.db_path.parent.mkdir(parents=True, exist_ok=True)
            with open(self.db_path, 'w', encoding='utf-8') as f:
                json.dump(self.data, f, indent=2, ensure_ascii=False)
            self.logger.debug("Base de données sauvegardée")
        except Exception as e:
            self.logger.error(f"Erreur sauvegarde DB : {e}")
    
    def get_or_create(self, numero: str, content_hash: str) -> Tuple[str, str, bool]:
        """
        Récupère ou crée un ID et code pour un numéro
        Retourne: (id, code, is_new)
        """
        if numero in self.data:
            # Vérifie si le contenu a changé
            if self.data[numero].get('hash_contenu') != content_hash:
                self.data[numero]['hash_contenu'] = content_hash
                self.data[numero]['date_derniere_maj'] = datetime.datetime.now().isoformat()
                self.data[numero]['nb_modifications'] = self.data[numero].get('nb_modifications', 0) + 1
                self.save()
                self.logger.info(f"Contenu modifié pour : {numero}")
            
            return self.data[numero]['id'], self.data[numero]['code'], False
        else:
            # Génère nouveau
            new_id = self._generate_unique_id()
            new_code = self._generate_code()
            
            self.data[numero] = {
                'id': new_id,
                'code': new_code,
                'date_creation': datetime.datetime.now().isoformat(),
                'date_derniere_maj': datetime.datetime.now().isoformat(),
                'nb_modifications': 0,
                'hash_contenu': content_hash
            }
            
            self.save()
            self.logger.success(f"Nouveau → {numero} = ID:{new_id} CODE:{new_code}")
            return new_id, new_code, True
    
    def _generate_unique_id(self) -> str:
        """Génère un ID unique de 6 chiffres"""
        existing_ids = {entry['id'] for entry in self.data.values()}
        
        for _ in range(100):  # Max 100 tentatives
            new_id = str(random.randint(100000, 999999))
            if new_id not in existing_ids:
                return new_id
        
        raise ValueError("Impossible de générer un ID unique après 100 tentatives")
    
    def _generate_code(self) -> str:
        """Génère un code de 6 chiffres"""
        return str(random.randint(100000, 999999))
    
    def get_all_entries(self) -> Dict:
        """Retourne toutes les entrées"""
        return self.data

class HTMLBuilder:
    """Construit les pages HTML"""
    
    def __init__(self, config: dict, logger: Logger):
        self.config = config
        self.logger = logger
        self.template_content = None
        self.login_content = None
        self._load_templates()
    
    def _load_templates(self):
        """Charge les templates HTML"""
        # Template principal
        template_path = Path(self.config['paths']['template_html'])
        if not template_path.exists():
            raise FileNotFoundError(f"Template non trouvé : {template_path}")
        
        with open(template_path, 'r', encoding='utf-8') as f:
            self.template_content = f.read()
        self.logger.debug("Template principal chargé")
        
        # Page de login
        login_path = Path(self.config['paths']['login_html'])
        if not login_path.exists():
            raise FileNotFoundError(f"Page login non trouvée : {login_path}")
        
        with open(login_path, 'r', encoding='utf-8') as f:
            self.login_content = f.read()
        self.logger.debug("Page login chargée")
    
    def build_content_page(self, txt_content: str, numero: str) -> str:
        """Construit la page de contenu finale"""
        # Trouve où insérer le contenu
        body_start = self.template_content.find('<body')
        if body_start == -1:
            self.logger.error(f"Pas de balise <body> dans le template")
            return self.template_content
        
        # Trouve la fin de la balise body
        body_tag_end = self.template_content.find('>', body_start)
        body_end = self.template_content.find('</body>')
        
        if body_tag_end == -1 or body_end == -1:
            self.logger.error(f"Structure HTML invalide dans le template")
            return self.template_content
        
        # Insère le contenu
        result = (
            self.template_content[:body_tag_end + 1] +
            '\n' + txt_content + '\n' +
            self.template_content[body_end:]
        )
        
        return result
    
    def build_login_page(self, doc_id: str, code: str) -> str:
        """Configure la page de login avec le code"""
        result = self.login_content
        
        # Cherche le script de vérification
        script_pattern = r'const expectedCode = doc \? doc\.match.*?;'
        replacement = f'const expectedCode = "{code}";'
        result = re.sub(script_pattern, replacement, result)
        
        # Change la redirection
        redirect_pattern = r'window\.location\.href = doc \+ .*?;'
        redirect_replacement = f'window.location.href = "./content.html";'
        result = re.sub(redirect_pattern, redirect_replacement, result)
        
        # Personnalise les textes
        result = result.replace('Accéder au document', 'Accéder à mon compte-rendu')
        result = result.replace('Veuillez entrer votre code d\'accès personnel', 
                              'Entre ton code personnel pour accéder à ton compte-rendu')
        
        return result

class CSVExporter:
    """Exporte les données en CSV"""
    
    def __init__(self, config: dict, logger: Logger):
        self.config = config
        self.logger = logger
    
    def export(self, database: Dict, output_path: str):
        """Exporte la base de données en CSV"""
        try:
            with open(output_path, 'w', encoding='utf-8-sig', newline='') as f:
                writer = csv.writer(f, delimiter=self.config['settings']['csv_separator'])
                
                # Header
                writer.writerow(['Numero', 'ID', 'Code', 'Message'])
                
                # Données
                template = self.config['messages']['csv_template']
                site_url = self.config['settings']['site_url']
                
                count = 0
                for numero, data in database.items():
                    message = template.format(
                        site_url=site_url,
                        id=data['id'],
                        code=data['code']
                    )
                    writer.writerow([numero, data['id'], data['code'], message])
                    count += 1
                
                self.logger.success(f"CSV exporté : {count} lignes")
                
        except Exception as e:
            self.logger.error(f"Erreur export CSV : {e}")

class MyMuqabalaProcessor:
    """Processeur principal"""
    
    def __init__(self, config_path: str = "config.json"):
        self.config = self._load_config(config_path)
        self.logger = Logger(self.config['paths']['logs_dir'], self.config['settings']['log_level'])
        self.db = DatabaseManager(
            Path(self.config['paths']['database_dir']) / 'codes-generes.json',
            self.logger
        )
        self.builder = HTMLBuilder(self.config, self.logger)
        self.exporter = CSVExporter(self.config, self.logger)
        
        self.stats = {
            'total': 0,
            'nouveaux': 0,
            'modifies': 0,
            'erreurs': 0,
            'skipped': 0
        }
    
    def _load_config(self, config_path: str) -> dict:
        """Charge la configuration"""
        if not os.path.exists(config_path):
            raise FileNotFoundError(f"Fichier de configuration non trouvé : {config_path}")
        
        with open(config_path, 'r', encoding='utf-8') as f:
            return json.load(f)
    
    def _calculate_hash(self, content: str) -> str:
        """Calcule le hash MD5 d'un contenu"""
        return hashlib.md5(content.encode('utf-8')).hexdigest()
    
    def _pause_if_needed(self, message: str = "Appuyez sur Entrée pour continuer..."):
        """Pause si configuré"""
        if self.config['settings'].get('pause_entre_etapes', False):
            input(f"\n{Colors.CYAN}{message}{Colors.ENDC}")
    
    def process(self):
        """Lance le processus complet"""
        self.logger.header("MY MUQABALA - PROCESSEUR AUTOMATIQUE")
        self.logger.info(f"Démarrage à {datetime.datetime.now().strftime('%H:%M:%S')}")
        
        try:
            # Étape 1 : Scan des fichiers
            self.logger.header("ÉTAPE 1 : SCAN DES FICHIERS")
            txt_files = self._scan_txt_files()
            self._pause_if_needed()
            
            # Étape 2 : Traitement des fichiers
            self.logger.header("ÉTAPE 2 : TRAITEMENT DES CONTENUS")
            self._process_files(txt_files)
            self._pause_if_needed()
            
            # Étape 3 : Copie des assets
            self.logger.header("ÉTAPE 3 : COPIE DES ASSETS")
            self._copy_assets()
            self._pause_if_needed()
            
            # Étape 4 : Export CSV
            self.logger.header("ÉTAPE 4 : EXPORT CSV")
            self._export_csv()
            self._pause_if_needed()
            
            # Étape 5 : Configuration Vercel
            self.logger.header("ÉTAPE 5 : CONFIGURATION VERCEL")
            self._setup_vercel()
            
            # Rapport final
            self._generate_report()
            
            # Déploiement si configuré
            if self.config['settings'].get('vercel_auto_deploy', False):
                self._pause_if_needed("Prêt pour le déploiement. Continuer ?")
                self._deploy_vercel()
            
        except Exception as e:
            self.logger.error(f"Erreur fatale : {e}")
            raise
        
        finally:
            elapsed = time.time() - self.logger.start_time
            self.logger.success(f"Processus terminé en {elapsed:.1f} secondes")
    
    def _scan_txt_files(self) -> List[Path]:
        """Scan le dossier des fichiers TXT"""
        input_dir = Path(self.config['paths']['input_txt'])
        
        if not input_dir.exists():
            raise FileNotFoundError(f"Dossier input non trouvé : {input_dir}")
        
        txt_files = list(input_dir.glob("*.txt"))
        self.logger.info(f"{len(txt_files)} fichiers TXT trouvés")
        
        if not txt_files:
            raise ValueError("Aucun fichier TXT trouvé !")
        
        return txt_files
    
    def _process_files(self, txt_files: List[Path]):
        """Traite chaque fichier TXT"""
        output_dir = Path(self.config['paths']['output_dir']) / 'compte-rendu'
        output_dir.mkdir(parents=True, exist_ok=True)
        
        for txt_file in txt_files:
            try:
                self.stats['total'] += 1
                
                # Extrait le numéro du nom de fichier
                numero = txt_file.stem  # Sans l'extension .txt
                self.logger.debug(f"Traitement : {numero}")
                
                # Lit le contenu
                content = self._read_file_safe(txt_file)
                if not content:
                    self.logger.warning(f"Fichier vide : {txt_file.name}")
                    self.stats['skipped'] += 1
                    continue
                
                # Calcule le hash
                content_hash = self._calculate_hash(content)
                
                # Récupère ou crée ID et code
                doc_id, code, is_new = self.db.get_or_create(numero, content_hash)
                
                if is_new:
                    self.stats['nouveaux'] += 1
                else:
                    self.stats['modifies'] += 1
                
                # Crée le dossier du document
                doc_dir = output_dir / doc_id
                doc_dir.mkdir(exist_ok=True)
                
                # Génère content.html
                content_html = self.builder.build_content_page(content, numero)
                with open(doc_dir / 'content.html', 'w', encoding='utf-8') as f:
                    f.write(content_html)
                
                # Génère index.html (page login)
                login_html = self.builder.build_login_page(doc_id, code)
                with open(doc_dir / 'index.html', 'w', encoding='utf-8') as f:
                    f.write(login_html)
                
                self.logger.debug(f"✓ {doc_id} généré")
                
            except Exception as e:
                self.logger.error(f"Erreur avec {txt_file.name} : {e}")
                self.stats['erreurs'] += 1
    
    def _read_file_safe(self, file_path: Path) -> str:
        """Lit un fichier avec gestion des encodages"""
        encodings = ['utf-8', 'latin-1', 'cp1252']
        
        for encoding in encodings:
            try:
                with open(file_path, 'r', encoding=encoding) as f:
                    return f.read().strip()
            except UnicodeDecodeError:
                continue
        
        self.logger.error(f"Impossible de lire {file_path.name} avec les encodages testés")
        return ""
    
    def _copy_assets(self):
        """Copie les assets statiques"""
        output_dir = Path(self.config['paths']['output_dir'])
        
        # Copie la page d'accueil
        home_path = Path(self.config['paths']['home_html'])
        if home_path.exists():
            shutil.copy2(home_path, output_dir / 'index.html')
            self.logger.info("Page d'accueil copiée")
        else:
            self.logger.warning("Page d'accueil non trouvée")
        
        # Crée le dossier assets si nécessaire
        assets_dir = output_dir / 'assets'
        assets_dir.mkdir(exist_ok=True)
        
        self.logger.info("Assets copiés")
    
    def _export_csv(self):
        """Exporte le CSV"""
        export_dir = Path(self.config['paths']['output_dir']).parent / 'exports'
        export_dir.mkdir(exist_ok=True)
        
        csv_path = export_dir / f'contacts-codes-{datetime.datetime.now().strftime("%Y%m%d-%H%M%S")}.csv'
        self.exporter.export(self.db.get_all_entries(), str(csv_path))
        
        self.logger.info(f"CSV exporté : {csv_path.name}")
    
    def _setup_vercel(self):
        """Configure Vercel"""
        vercel_config = {
            "routes": [
                {
                    "src": "/compte-rendu/([^/]+)/?$",
                    "dest": "/compte-rendu/$1/index.html"
                },
                {
                    "src": "/compte-rendu/([^/]+)/(.+)",
                    "dest": "/compte-rendu/$1/$2"
                }
            ]
        }
        
        vercel_path = Path(self.config['paths']['output_dir']) / 'vercel.json'
        with open(vercel_path, 'w', encoding='utf-8') as f:
            json.dump(vercel_config, f, indent=2)
        
        self.logger.info("Configuration Vercel créée")
    
    def _deploy_vercel(self):
        """Déploie sur Vercel"""
        self.logger.header("DÉPLOIEMENT VERCEL")
        
        output_dir = Path(self.config['paths']['output_dir'])
        
        try:
            # Change de répertoire
            os.chdir(output_dir)
            
            # Lance Vercel
            self.logger.info("Lancement de Vercel...")
            result = subprocess.run(['vercel', '--prod', '--yes'], 
                                  capture_output=True, text=True)
            
            if result.returncode == 0:
                self.logger.success("Déploiement réussi !")
                self.logger.info(result.stdout)
            else:
                self.logger.error(f"Échec du déploiement : {result.stderr}")
                
        except FileNotFoundError:
            self.logger.error("Vercel CLI non installé. Installez avec : npm install -g vercel")
        except Exception as e:
            self.logger.error(f"Erreur déploiement : {e}")
    
    def _generate_report(self):
        """Génère le rapport final"""
        self.logger.header("RAPPORT FINAL")
        
        report = f"""
=== RAPPORT DE GÉNÉRATION ===
Date : {datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}

RÉSUMÉ :
- Fichiers traités : {self.stats['total']}
- Nouveaux comptes : {self.stats['nouveaux']}
- Mises à jour : {self.stats['modifies']}
- Fichiers ignorés : {self.stats['skipped']}
- Erreurs : {self.stats['erreurs']}

ACTIONS EFFECTUÉES :
✓ Base de données mise à jour
✓ {self.stats['total'] - self.stats['skipped'] - self.stats['erreurs']} dossiers créés
✓ CSV exporté
✓ Site prêt au déploiement

Fichiers générés :
- Site web : {self.config['paths']['output_dir']}
- CSV : exports/
- Logs : {self.config['paths']['logs_dir']}
"""
        
        # Affiche
        print(report)
        
        # Sauvegarde
        report_path = Path(self.config['paths']['output_dir']).parent / 'rapport-generation.txt'
        with open(report_path, 'w', encoding='utf-8') as f:
            f.write(report)

def main():
    """Point d'entrée principal"""
    try:
        processor = MyMuqabalaProcessor()
        processor.process()
        
        # Son de fin si Windows
        if sys.platform == "win32":
            import winsound
            winsound.MessageBeep()
            
    except KeyboardInterrupt:
        print(f"\n{Colors.WARNING}Processus interrompu par l'utilisateur{Colors.ENDC}")
        sys.exit(1)
    except Exception as e:
        print(f"\n{Colors.FAIL}ERREUR FATALE : {e}{Colors.ENDC}")
        sys.exit(1)

if __name__ == "__main__":
    main()