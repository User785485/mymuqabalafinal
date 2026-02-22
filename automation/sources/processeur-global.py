#!/usr/bin/env python3
# -*- coding: utf-8 -*-

# Forcer l'encodage UTF-8 pour la sortie console
import sys
import io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')

"""
My Muqabala - Processeur Global v2.0
Génère les compte-rendus ET plans d'action personnalisés avec protection par code
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
import traceback
from pathlib import Path
from typing import Dict, List, Tuple, Optional
import sys

# Configuration des couleurs pour Windows
if sys.platform == "win32":
    os.system("color")

import secrets
import string

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

def normalize_phone(raw: str) -> str:
    """Normalise un numero de telephone vers le format +33XXXXXXXXX"""
    digits = re.sub(r'[^\d+]', '', raw.strip())
    # Remove leading + for digit processing
    if digits.startswith('+'):
        digits_only = digits[1:]
    else:
        digits_only = digits
    # 0033... -> 33...
    if digits_only.startswith('0033'):
        digits_only = '33' + digits_only[4:]
    # 06... or 07... -> 336... or 337...
    elif digits_only.startswith('0') and len(digits_only) == 10:
        digits_only = '33' + digits_only[1:]
    # Already 33...
    elif digits_only.startswith('33') and len(digits_only) == 11:
        pass
    return '+' + digits_only


def generate_password(length: int = 12) -> str:
    """Genere un mot de passe securise avec upper+lower+digit+special"""
    alphabet = string.ascii_letters + string.digits + '!@#$%&*'
    while True:
        pwd = ''.join(secrets.choice(alphabet) for _ in range(length))
        if (any(c.isupper() for c in pwd)
                and any(c.islower() for c in pwd)
                and any(c.isdigit() for c in pwd)
                and any(c in '!@#$%&*' for c in pwd)):
            return pwd


def _extract_phone_from_filename(name: str) -> Optional[str]:
    """Extrait un telephone de '+33612345678.html' ou '+33612345678_Fatima.html'"""
    stem = Path(name).stem
    match = re.match(r'(\+?\d{10,15})', stem)
    if match:
        return normalize_phone(match.group(1))
    return None


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

    def get_or_create(self, numero: str, content_hash: str, doc_type: str = "compte-rendu") -> Tuple[str, str, bool]:
        """
        Récupère ou crée un ID et code pour un numéro ET type de document
        Retourne: (id, code, is_new)

        La clé est maintenant: numero|doc_type pour permettre qu'un même numéro
        ait à la fois un compte-rendu ET un plan d'action
        """
        # Clé composite: numéro + type de document
        db_key = f"{numero}|{doc_type}"

        if db_key in self.data:
            # Vérifie si le contenu a changé
            if self.data[db_key].get('hash_contenu') != content_hash:
                self.data[db_key]['hash_contenu'] = content_hash
                self.data[db_key]['date_derniere_maj'] = datetime.datetime.now().isoformat()
                self.data[db_key]['nb_modifications'] = self.data[db_key].get('nb_modifications', 0) + 1
                self.save()
                self.logger.info(f"Contenu modifié pour : {numero} ({doc_type})")

            return self.data[db_key]['id'], self.data[db_key]['code'], False
        else:
            # Génère nouveau
            new_id = self._generate_unique_id()
            new_code = self._generate_code()

            self.data[db_key] = {
                'id': new_id,
                'code': new_code,
                'numero': numero,
                'doc_type': doc_type,
                'date_creation': datetime.datetime.now().isoformat(),
                'date_derniere_maj': datetime.datetime.now().isoformat(),
                'nb_modifications': 0,
                'hash_contenu': content_hash
            }

            self.save()
            self.logger.success(f"Nouveau {doc_type} → {numero} = ID:{new_id} CODE:{new_code}")
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
        self.login_content = None
        self._load_templates()

    def _load_templates(self):
        """Charge la page de login (seul template encore utilisé pour compte-rendu/plan-action)"""
        # Page de login
        login_path = Path(self.config['paths']['login_html'])
        if not login_path.exists():
            raise FileNotFoundError(f"Page login non trouvée : {login_path}")

        with open(login_path, 'r', encoding='utf-8') as f:
            self.login_content = f.read()
        self.logger.debug("Page login chargée")

    def build_content_page(self, txt_content: str, numero: str, doc_type: str = "compte-rendu") -> str:
        """Retourne le fichier input tel quel - il contient déjà tout le CSS + HTML prêt à déployer"""
        self.logger.info(f"Contenu {doc_type} pour {numero} (longueur: {len(txt_content)} caractères)")
        self.logger.info(f"Aperçu: {txt_content[:100]}...")
        return txt_content

    def build_login_page(self, doc_id: str, code: str, doc_type: str = "compte-rendu") -> str:
        """Configure la page de login avec le code et le type de document"""
        result = self.login_content

        # Cherche le script de vérification
        script_pattern = r'const expectedCode = doc \? doc\.match.*?;'
        replacement = f'const expectedCode = "{code}";'
        result = re.sub(script_pattern, replacement, result)

        # Change la redirection selon le type de document
        redirect_pattern = r'window\.location\.href = doc \+ .*?;'
        redirect_replacement = f'window.location.href = "./{doc_type}-{doc_id}-content.html";'
        self.logger.info(f"Redirection configurée vers: ./{doc_type}-{doc_id}-content.html")
        result = re.sub(redirect_pattern, redirect_replacement, result)

        # Personnalise les textes selon le type de document
        if doc_type == "plan-action":
            result = result.replace('Accéder au document', 'Accéder à mon plan d\'action')
            result = result.replace('Veuillez entrer votre code d\'accès personnel',
                                  'Entre ton code personnel pour accéder à ton plan d\'action personnalisé')
            result = result.replace('Accéder à mon compte-rendu', 'Accéder à mon plan d\'action')
            result = result.replace('ton compte-rendu', 'ton plan d\'action personnalisé')
        else:
            result = result.replace('Accéder au document', 'Accéder à mon compte-rendu')
            result = result.replace('Veuillez entrer votre code d\'accès personnel',
                                  'Entre ton code personnel pour accéder à ton compte-rendu')

        return result

class CSVExporter:
    """Exporte les données en CSV"""

    def __init__(self, config: dict, logger: Logger):
        self.config = config
        self.logger = logger

    def export_credentials(self, database: Dict, output_path: str, since_date: str = None):
        """Exporte les identifiants de connexion en CSV (mots de passe depuis le JSON local uniquement)"""
        try:
            with open(output_path, 'w', encoding='utf-8-sig', newline='') as f:
                writer = csv.writer(f, delimiter=self.config['settings']['csv_separator'])
                writer.writerow(['Telephone', 'Email', 'Mot_de_passe', 'Code_acces',
                                 'Date_creation', 'Type_doc', 'Nouveau_compte', 'Prenom'])

                count = 0
                for db_key, data in database.items():
                    doc_type = data.get('doc_type', '')
                    date_creation = data.get('date_creation', '')

                    # Filter by since_date if provided
                    if since_date and date_creation < since_date:
                        continue

                    numero = data.get('numero', '')
                    digits = re.sub(r'[^\d]', '', numero)
                    email = f'{digits}@mymuqabala.app' if digits else ''
                    password = data.get('password', '')
                    code = data.get('code', '')
                    prenom = data.get('prenom', '')
                    nouveau = data.get('nouveau_compte', False)

                    writer.writerow([numero, email, password, code, date_creation,
                                     doc_type, nouveau, prenom])
                    count += 1

                self.logger.success(f"CSV identifiants exporte : {count} lignes -> {output_path}")

        except Exception as e:
            self.logger.error(f"Erreur export credentials CSV : {e}")

    def export(self, database: Dict, output_path: str):
        """Exporte la base de données en CSV avec le bon template de message selon le type"""
        try:
            with open(output_path, 'w', encoding='utf-8-sig', newline='') as f:
                writer = csv.writer(f, delimiter=self.config['settings']['csv_separator'])

                # Header - ajout de la colonne Type
                writer.writerow(['Numero', 'Type', 'ID', 'Code', 'Message'])

                site_url = self.config['settings']['site_url']

                count = 0
                for db_key, data in database.items():
                    # Récupère le type de document
                    doc_type = data.get('doc_type', 'compte-rendu')
                    numero = data.get('numero', db_key.split('|')[0] if '|' in db_key else db_key)

                    # Sélectionne le bon template de message
                    if doc_type == "cartographie":
                        template = self.config['messages'].get('csv_template_cartographie',
                                   self.config['messages']['csv_template'])
                    elif doc_type == "plan-action":
                        template = self.config['messages'].get('csv_template_plan_action',
                                   self.config['messages']['csv_template'])
                    elif doc_type == "sms":
                        template = self.config['messages'].get('csv_template_sms',
                                   self.config['messages']['csv_template'])
                    else:
                        template = self.config['messages'].get('csv_template_compte_rendu',
                                   self.config['messages']['csv_template'])

                    message = template.format(
                        site_url=site_url,
                        id=data['id'],
                        code=data['code']
                    )
                    writer.writerow([numero, doc_type, data['id'], data['code'], message])
                    count += 1

                self.logger.success(f"CSV exporté : {count} lignes")

        except Exception as e:
            self.logger.error(f"Erreur export CSV : {e}")

class SupabaseClient:
    """Client REST leger pour Supabase Storage + PostgREST (urllib uniquement)"""

    def __init__(self, url: str, service_role_key: str, bucket_name: str, logger: Logger):
        self.url = url.rstrip('/')
        self.key = service_role_key
        self.bucket = bucket_name
        self.logger = logger
        self.headers = {
            'apikey': self.key,
            'Authorization': f'Bearer {self.key}',
        }

    def _request(self, method: str, url: str, data: bytes = None, extra_headers: dict = None) -> Tuple[int, bytes]:
        import urllib.request
        import urllib.error
        hdrs = {**self.headers}
        if extra_headers:
            hdrs.update(extra_headers)
        req = urllib.request.Request(url, data=data, headers=hdrs, method=method)
        try:
            with urllib.request.urlopen(req, timeout=60) as resp:
                return resp.status, resp.read()
        except urllib.error.HTTPError as e:
            return e.code, e.read()

    # ── Storage helpers ──

    def list_files(self, prefix: str) -> List[dict]:
        """List files in a storage prefix"""
        api_url = f'{self.url}/storage/v1/object/list/{self.bucket}'
        body = json.dumps({'prefix': prefix, 'limit': 100}).encode()
        status, resp = self._request('POST', api_url, body, {'Content-Type': 'application/json'})
        if status == 200:
            return json.loads(resp)
        self.logger.warning(f'Storage list {prefix}: HTTP {status}')
        return []

    def download_file(self, storage_path: str, dest: Path) -> bool:
        """Download a file from storage to local path"""
        api_url = f'{self.url}/storage/v1/object/{self.bucket}/{storage_path}'
        status, resp = self._request('GET', api_url)
        if status == 200:
            dest.parent.mkdir(parents=True, exist_ok=True)
            dest.write_bytes(resp)
            return True
        self.logger.error(f'Download {storage_path}: HTTP {status}')
        return False

    def upload_file(self, local_path: Path, storage_path: str) -> bool:
        """Upload a local file to storage"""
        ext = local_path.suffix.lower()
        ct = {'html': 'text/html', 'csv': 'text/csv', 'txt': 'text/plain', 'json': 'application/json'}.get(ext.lstrip('.'), 'application/octet-stream')
        api_url = f'{self.url}/storage/v1/object/{self.bucket}/{storage_path}'
        data = local_path.read_bytes()
        status, resp = self._request('POST', api_url, data, {'Content-Type': ct, 'x-upsert': 'true'})
        if status in (200, 201):
            return True
        self.logger.error(f'Upload {storage_path}: HTTP {status} — {resp[:200]}')
        return False

    def delete_file(self, storage_path: str) -> bool:
        """Delete a file from storage"""
        api_url = f'{self.url}/storage/v1/object/{self.bucket}'
        body = json.dumps({'prefixes': [storage_path]}).encode()
        status, _ = self._request('DELETE', api_url, body, {'Content-Type': 'application/json'})
        return status in (200, 204)

    # ── PostgREST helpers ──

    def download_pending(self, doc_type: str, dest_dir: Path) -> List[Path]:
        """Download all pending files for a doc_type from storage into dest_dir"""
        prefix = f'pending/{doc_type}'
        files = self.list_files(prefix)
        downloaded = []
        for f in files:
            name = f.get('name', '')
            if not name or name.startswith('.'):
                continue
            storage_path = f'{prefix}/{name}'
            local_dest = dest_dir / name
            if self.download_file(storage_path, local_dest):
                downloaded.append(local_dest)
                self.logger.info(f'  Downloaded: {name}')
                # Remove from pending after download
                self.delete_file(storage_path)
        return downloaded

    # ── Profile / Auth / Content helpers ──

    def find_profile_by_phone(self, phone: str) -> Optional[dict]:
        """Find an existing profile by phone number"""
        encoded_phone = phone.replace('+', '%2B')
        api_url = f'{self.url}/rest/v1/profiles?telephone=eq.{encoded_phone}&select=id,prenom,telephone,access_code'
        status, resp = self._request('GET', api_url, extra_headers={'Accept': 'application/json'})
        if status == 200:
            rows = json.loads(resp)
            if rows:
                return rows[0]
        return None

    def create_auth_user(self, phone: str, password: str, prenom: str = '') -> Optional[str]:
        """Create a Supabase auth user via admin API. Returns user UUID or None."""
        api_url = f'{self.url}/auth/v1/admin/users'
        # Use phone as email fallback for auth (phone-based login)
        digits = re.sub(r'[^\d]', '', phone)
        email = f'{digits}@mymuqabala.app'
        payload = {
            'email': email,
            'password': password,
            'email_confirm': True,
            'user_metadata': {'prenom': prenom, 'telephone': phone},
        }
        status, resp = self._request('POST', api_url, json.dumps(payload).encode(),
                                     {'Content-Type': 'application/json'})
        if status in (200, 201):
            user = json.loads(resp)
            return user.get('id')
        elif status == 422:
            # User already exists — find existing UUID
            self.logger.warning(f'Auth user already exists for {phone}, looking up UUID...')
            # Search by email
            find_url = f'{self.url}/auth/v1/admin/users?page=1&per_page=1'
            # Use admin list endpoint and filter
            list_status, list_resp = self._request('GET', find_url)
            if list_status == 200:
                data = json.loads(list_resp)
                users = data.get('users', data) if isinstance(data, dict) else data
                for u in (users if isinstance(users, list) else []):
                    if u.get('email') == email:
                        return u.get('id')
            # Fallback: try to find profile
            profile = self.find_profile_by_phone(phone)
            if profile:
                return profile.get('id')
            self.logger.error(f'Cannot find existing user for {phone}')
            return None
        else:
            self.logger.error(f'create_auth_user {phone}: HTTP {status} — {resp[:300]}')
            return None

    def create_profile(self, user_id: str, phone: str, prenom: str, access_code: str) -> bool:
        """Create or update a profile row via PostgREST upsert"""
        api_url = f'{self.url}/rest/v1/profiles'
        payload = {
            'id': user_id,
            'telephone': phone,
            'prenom': prenom,
            'access_code': access_code,
            'role': 'client',
            'statut_parcours': 'actif',
        }
        status, resp = self._request('POST', api_url, json.dumps(payload).encode(),
                                     {'Content-Type': 'application/json',
                                      'Prefer': 'resolution=merge-duplicates,return=minimal'})
        if status in (200, 201, 204):
            return True
        self.logger.error(f'create_profile {phone}: HTTP {status} — {resp[:300]}')
        return False

    def upsert_section_content(self, client_id: str, section_key: str, content_key: str,
                                titre: str, html: str) -> bool:
        """Insert or update a section_content row (idempotent via merge-duplicates)"""
        api_url = f'{self.url}/rest/v1/section_content'
        payload = {
            'client_id': client_id,
            'section_key': section_key,
            'content_key': content_key,
            'titre': titre,
            'contenu_html': html,
        }
        status, resp = self._request('POST', api_url, json.dumps(payload).encode(),
                                     {'Content-Type': 'application/json',
                                      'Prefer': 'resolution=merge-duplicates,return=minimal'})
        if status in (200, 201, 204):
            return True
        self.logger.error(f'upsert_section_content {section_key}/{content_key}: HTTP {status} — {resp[:300]}')
        return False

    def update_history(self, filename: str, doc_type: str, doc_id: str, code: str, url: str, status: str, error_msg: str = None):
        """Upsert document_processing_history via PostgREST"""
        api_url = f'{self.url}/rest/v1/document_processing_history'

        # Try to find existing row
        find_url = f'{api_url}?original_filename=eq.{filename}&doc_type=eq.{doc_type}&order=created_at.desc&limit=1'
        find_status, find_resp = self._request('GET', find_url, extra_headers={'Accept': 'application/json'})

        payload = {
            'generated_id': doc_id,
            'generated_code': code,
            'generated_url': url,
            'status': status,
            'error_message': error_msg,
            'completed_at': datetime.datetime.now().isoformat() if status in ('completed', 'error') else None
        }

        if find_status == 200:
            rows = json.loads(find_resp)
            if rows:
                # Update existing
                row_id = rows[0]['id']
                upd_url = f'{api_url}?id=eq.{row_id}'
                self._request('PATCH', upd_url, json.dumps(payload).encode(),
                             {'Content-Type': 'application/json', 'Prefer': 'return=minimal'})
                return

        # Insert new
        payload['doc_type'] = doc_type
        payload['original_filename'] = filename
        self._request('POST', api_url, json.dumps(payload).encode(),
                     {'Content-Type': 'application/json', 'Prefer': 'return=minimal'})


class MyMuqabalaProcessor:
    """Processeur principal"""

    def __init__(self, config_path: str = "config.json"):
        self.config = self._load_config(config_path)
        self.logger = Logger(self.config['paths']['logs_dir'], self.config['settings']['log_level'])
        self.db = DatabaseManager(
            Path(self.config['paths']['database_dir']) / 'codes-generes.json',
            self.logger
        )
        self.exporter = CSVExporter(self.config, self.logger)

        self.stats = {
            'total': 0,
            'nouveaux': 0,
            'modifies': 0,
            'erreurs': 0,
            'skipped': 0,
            'compte_rendu': 0,
            'plan_action': 0,
            'cartographie': 0,
            'sms': 0,
            'html_direct': 0
        }

        # Supabase client (optionnel)
        self.sb_client = None
        sb_cfg = self.config.get('supabase', {})
        if sb_cfg.get('enabled') and sb_cfg.get('service_role_key'):
            self.sb_client = SupabaseClient(
                url=sb_cfg['url'],
                service_role_key=sb_cfg['service_role_key'],
                bucket_name=sb_cfg.get('bucket_name', 'documents'),
                logger=self.logger
            )
            self.logger.info("Supabase Storage actif")
        else:
            self.logger.info("Supabase Storage desactive (mode fichiers local)")

        # Templates SMS (chargés à la demande)
        self.template_sms_login = None
        self.template_sms_content = None

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

    def process(self, doc_type_filter: str = "tous"):
        """Lance le processus complet"""
        self.logger.header("MY MUQABALA - PROCESSEUR AUTOMATIQUE v2.0")
        self.logger.info(f"Démarrage à {datetime.datetime.now().strftime('%H:%M:%S')}")
        self.logger.info(f"Mode de traitement: {doc_type_filter}")

        txt_files = []
        cartographie_folders = []
        sms_files = []
        html_direct_files = []

        try:
            # Étape 0 : Download fichiers depuis Supabase Storage (si activé)
            if self.sb_client:
                self.logger.header("ÉTAPE 0 : DOWNLOAD DEPUIS SUPABASE STORAGE")
                type_map = {
                    'compte-rendu': Path(self.config['paths']['input_compte_rendu']),
                    'plan-action': Path(self.config['paths']['input_plan_action']),
                    'cartographie': Path(self.config['paths']['input_cartographie']),
                    'sms': Path(self.config['paths']['input_sms']),
                    'html-direct': Path(self.config['paths']['input_html_direct']),
                }
                for dtype, dest_dir in type_map.items():
                    if doc_type_filter not in ['tous', dtype]:
                        continue
                    dest_dir.mkdir(parents=True, exist_ok=True)
                    downloaded = self.sb_client.download_pending(dtype, dest_dir)
                    if downloaded:
                        self.logger.info(f"  {dtype}: {len(downloaded)} fichier(s) telecharge(s)")

            # Étape 1 : Scan des fichiers (selon le filtre)
            self.logger.header("ÉTAPE 1 : SCAN DES FICHIERS")

            # Scan compte-rendu et plan-action si nécessaire
            if doc_type_filter in ["tous", "compte-rendu", "plan-action", "compte-rendu-plan-action"]:
                txt_files = self._scan_txt_files(doc_type_filter)

            # Scan cartographie si nécessaire
            if doc_type_filter in ["tous", "cartographie"]:
                cartographie_folders = self._scan_cartographie_folders()

            # Scan SMS si nécessaire
            if doc_type_filter in ["sms"]:
                sms_files = self._scan_sms_files()

            # Scan HTML direct si nécessaire
            if doc_type_filter in ["html-direct"]:
                html_direct_files = self._scan_html_direct_files()

            # Vérification qu'il y a quelque chose à traiter
            if not txt_files and not cartographie_folders and not sms_files and not html_direct_files:
                raise ValueError("Aucun fichier à traiter trouvé !")

            self._pause_if_needed()

            # Étape 2 : Traitement des fichiers (compte-rendu / plan-action)
            if txt_files:
                self.logger.header("ÉTAPE 2 : TRAITEMENT DES CONTENUS")
                self._process_files(txt_files)
                self._pause_if_needed()

            # Étape 2bis : Traitement des cartographies
            if cartographie_folders:
                self.logger.header("ÉTAPE 2bis : TRAITEMENT DES CARTOGRAPHIES")
                self._process_cartographies(cartographie_folders)
                self._pause_if_needed()

            # Étape 2ter : Traitement des SMS
            if sms_files:
                self.logger.header("ÉTAPE 2ter : TRAITEMENT DES SMS")
                self._process_sms(sms_files)
                self._pause_if_needed()

            # Étape 2quater : Traitement des HTML directs
            if html_direct_files:
                self.logger.header("ÉTAPE 2quater : HTML DIRECT - COPIE SIMPLE")
                self._process_html_direct(html_direct_files)
                self._pause_if_needed()

            # Étape 3 : Export CSV
            self.logger.header("ÉTAPE 3 : EXPORT CSV")
            self._export_csv(txt_files, cartographie_folders, sms_files)
            self._pause_if_needed()

            # Rapport final
            self._generate_report()

        except Exception as e:
            self.logger.error(f"Erreur fatale : {e}")
            raise

        finally:
            elapsed = time.time() - self.logger.start_time
            self.logger.success(f"Processus terminé en {elapsed:.1f} secondes")

    def _find_or_create_profile(self, phone: str, prenom: str = '') -> Optional[Tuple[str, Optional[str]]]:
        """Find existing profile or create auth user + profile.
        Returns (uuid, password_if_new) or None on failure."""
        if not self.sb_client:
            return None

        # 1. Check existing profile
        profile = self.sb_client.find_profile_by_phone(phone)
        if profile:
            self.logger.info(f"  Profil existant: {phone} -> {profile['id'][:8]}...")
            return (profile['id'], None)

        # 2. Create new auth user + profile
        password = generate_password()
        prenom = prenom or 'Client'
        uuid = self.sb_client.create_auth_user(phone, password, prenom)
        if not uuid:
            return None

        access_code = str(random.randint(100000, 999999))
        self.sb_client.create_profile(uuid, phone, prenom, access_code)

        # Store password in local DB for CSV export
        db_key = f"{phone}|auth"
        self.db.data[db_key] = {
            'id': uuid[:8],
            'code': access_code,
            'numero': phone,
            'doc_type': 'auth',
            'password': password,
            'prenom': prenom,
            'date_creation': datetime.datetime.now().isoformat(),
            'nouveau_compte': True,
        }
        self.db.save()

        self.logger.success(f"  Nouveau compte: {phone} -> {uuid[:8]}...")
        return (uuid, password)

    def _insert_to_supabase(self, txt_file: Path, doc_type: str, content_html: str):
        """Insert document content into Supabase section_content (unique destination, no static files)."""
        if not self.sb_client:
            return

        phone = _extract_phone_from_filename(txt_file.name)
        if not phone:
            self.logger.warning(f"  Supabase: impossible d'extraire le tel de {txt_file.name}")
            return

        # Extract prenom from filename (e.g. +33612345678_Fatima.html -> Fatima)
        prenom = ''
        stem = txt_file.stem
        if '_' in stem:
            prenom = stem.split('_', 1)[1]

        result = self._find_or_create_profile(phone, prenom)
        if not result:
            self.logger.error(f"  Supabase: echec creation profil pour {phone}")
            return
        uuid, _ = result

        # Map doc_type -> section_key/content_key
        if doc_type == 'compte-rendu':
            section_key = 'compte_rendu'
            content_key = 'CR_001'
            titre = 'Compte-Rendu Personnalis\u00e9'
        elif doc_type == 'plan-action':
            section_key = 'page_de_vente'
            content_key = 'PDV_001'
            titre = 'Programme Personnalis\u00e9'
        else:
            return  # SMS, html-direct etc. not handled here

        ok = self.sb_client.upsert_section_content(uuid, section_key, content_key, titre, content_html)
        if ok:
            self.logger.info(f"  Supabase: {section_key}/{content_key} -> {uuid[:8]}...")
        else:
            self.logger.error(f"  Supabase: echec upsert {section_key}/{content_key}")

    def _scan_txt_files(self, doc_type_filter: str = "tous") -> List[Tuple[Path, str]]:
        """
        Scan les dossiers des fichiers selon le filtre
        (compte-rendu: .txt, plan-action: .html)
        Retourne: Liste de tuples (chemin_fichier, type_document)
        """
        txt_files = []

        # Dossier compte-rendu (si filtre = tous, compte-rendu ou compte-rendu-plan-action)
        if doc_type_filter in ["tous", "compte-rendu", "compte-rendu-plan-action"]:
            compte_rendu_dir = Path(self.config['paths']['input_compte_rendu'])
            if compte_rendu_dir.exists():
                cr_files = list(compte_rendu_dir.glob("*.txt")) + list(compte_rendu_dir.glob("*.html"))
                for f in cr_files:
                    txt_files.append((f, "compte-rendu"))
                self.logger.info(f"Dossier compte-rendu: {len(cr_files)} fichiers (TXT/HTML) trouvés")
            else:
                self.logger.warning(f"Dossier compte-rendu non trouvé: {compte_rendu_dir}")

        # Dossier plan-action (si filtre = tous, plan-action ou compte-rendu-plan-action)
        if doc_type_filter in ["tous", "plan-action", "compte-rendu-plan-action"]:
            plan_action_dir = Path(self.config['paths']['input_plan_action'])
            if plan_action_dir.exists():
                pa_files = list(plan_action_dir.glob("*.html"))
                for f in pa_files:
                    txt_files.append((f, "plan-action"))
                self.logger.info(f"Dossier plan-action: {len(pa_files)} fichiers HTML trouvés")
            else:
                self.logger.warning(f"Dossier plan-action non trouvé: {plan_action_dir}")

        # Compatibilité: vérifie aussi l'ancien dossier input/ (racine)
        old_input_dir = Path(self.config['paths']['input_txt'])
        if old_input_dir.exists():
            old_files = [f for f in old_input_dir.iterdir()
                        if f.suffix in ('.txt', '.html') and f.parent == old_input_dir]  # Seulement fichiers à la racine
            if old_files:
                self.logger.warning(f"ATTENTION: {len(old_files)} fichiers trouvés dans l'ancien dossier input/")
                self.logger.warning("Ces fichiers seront traités comme compte-rendu par défaut")
                self.logger.warning("Veuillez les déplacer vers input/compte-rendu/ ou input/plan-action/")
                for f in old_files:
                    txt_files.append((f, "compte-rendu"))

        self.logger.info(f"TOTAL: {len(txt_files)} fichiers à traiter")

        return txt_files

    def _scan_cartographie_folders(self) -> List[Tuple[Path, str]]:
        """
        Scan le dossier cartographie pour trouver les sous-dossiers (numéros de téléphone)
        Retourne: Liste de tuples (chemin_dossier, numero)
        """
        cartographie_folders = []

        cartographie_dir = Path(self.config['paths']['input_cartographie'])
        if not cartographie_dir.exists():
            self.logger.warning(f"Dossier cartographie non trouvé: {cartographie_dir}")
            return cartographie_folders

        # Cherche les sous-dossiers (chaque sous-dossier = un client)
        for folder in cartographie_dir.iterdir():
            if folder.is_dir():
                # Vérifie qu'il y a des fichiers HTML dans le dossier
                html_files = list(folder.glob("*.html"))
                if html_files:
                    numero = folder.name
                    cartographie_folders.append((folder, numero))
                    self.logger.info(f"Cartographie trouvée: {numero} ({len(html_files)} fichiers HTML)")
                else:
                    self.logger.warning(f"Dossier cartographie vide: {folder.name}")

        self.logger.info(f"TOTAL: {len(cartographie_folders)} cartographies à traiter")

        return cartographie_folders

    def _process_cartographies(self, cartographie_folders: List[Tuple[Path, str]]):
        """Traite chaque dossier de cartographie — insert direct dans Supabase"""
        for folder, numero in cartographie_folders:
            try:
                self.stats['total'] += 1
                self.stats['cartographie'] += 1

                self.logger.info(f"Traitement cartographie: {numero}")

                # Calcule un hash basé sur tous les fichiers HTML du dossier
                html_files = sorted(folder.glob("*.html"))
                combined_content = ""
                for html_file in html_files:
                    with open(html_file, 'r', encoding='utf-8') as f:
                        combined_content += f.read()
                content_hash = self._calculate_hash(combined_content)

                # Récupère ou crée ID et code (tracking local)
                doc_id, code, is_new = self.db.get_or_create(numero, content_hash, "cartographie")

                if is_new:
                    self.stats['nouveaux'] += 1
                else:
                    self.stats['modifies'] += 1

                # Extraire le prénom du premier fichier HTML (DOC_01)
                prenom = self._extract_prenom_from_cartographie(folder)

                self.logger.success(f"✓ Cartographie {doc_id} traitée ({len(html_files)} documents)")

                # Insert cartographie docs into Supabase section_content
                if self.sb_client:
                    phone = _extract_phone_from_filename(numero) or normalize_phone(numero)
                    result = self._find_or_create_profile(phone, prenom)
                    if result:
                        uuid, _ = result
                        for html_file in html_files:
                            doc_name = self._normalize_doc_name(html_file.name)
                            ck = Path(doc_name).stem  # DOC_01, PROTOCOLE, etc.
                            with open(html_file, 'r', encoding='utf-8') as f:
                                doc_html = f.read()
                            # Extract title from first h1/h2 tag or use filename
                            title_match = re.search(r'<h[12][^>]*>(.*?)</h[12]>', doc_html, re.IGNORECASE)
                            doc_titre = title_match.group(1) if title_match else ck
                            # Strip HTML tags from title
                            doc_titre = re.sub(r'<[^>]+>', '', doc_titre).strip()
                            self.sb_client.upsert_section_content(uuid, 'cartographie', ck, doc_titre, doc_html)
                        self.logger.info(f"  Supabase: {len(html_files)} docs cartographie -> {uuid[:8]}...")

            except Exception as e:
                self.logger.error(f"Erreur avec cartographie {numero}: {e}")
                self.stats['erreurs'] += 1
                import traceback
                self.logger.error(traceback.format_exc())

    def _extract_prenom_from_cartographie(self, folder: Path) -> str:
        """Extrait le prénom depuis le nom des fichiers HTML de la cartographie"""
        html_files = list(folder.glob("DOC_01*.html"))
        if html_files:
            # Extrait le prénom du nom de fichier (ex: DOC_01_Rislene.html -> Rislene)
            filename = html_files[0].stem  # DOC_01_Rislene
            parts = filename.split('_')
            if len(parts) >= 3:
                return parts[2]  # Rislene
        return "Utilisateur"

    def _normalize_doc_name(self, original_name: str) -> str:
        """
        Normalise le nom du document (ex: DOC_01_Rislene.html -> DOC_01.html)
        """
        # Pattern: DOC_XX_NOM.html ou DOC_XXx_NOM.html (ex: DOC_08A_ABANDON_RISLENE.html)
        import re
        match = re.match(r'(DOC_\d+[A-Z]?).*\.html', original_name, re.IGNORECASE)
        if match:
            return f"{match.group(1)}.html"
        return original_name

    def _scan_sms_files(self) -> List[Tuple[Path, str]]:
        """
        Scan le dossier SMS pour trouver les fichiers à traiter
        Retourne: Liste de tuples (chemin_fichier, numero)
        """
        sms_files = []

        sms_dir = Path(self.config['paths']['input_sms'])
        if not sms_dir.exists():
            self.logger.warning(f"Dossier SMS non trouvé: {sms_dir}")
            return sms_files

        # Cherche les fichiers .html dans le dossier SMS (ignore les fichiers commencant par _)
        for html_file in sms_dir.glob("*.html"):
            if html_file.name.startswith('_'):
                self.logger.debug(f"Fichier modèle ignoré: {html_file.name}")
                continue
            numero = html_file.stem  # Nom du fichier sans extension (ex: +33612345678_Fatima)
            sms_files.append((html_file, numero))
            self.logger.info(f"SMS trouvé: {numero}")

        self.logger.info(f"TOTAL: {len(sms_files)} fichiers SMS à traiter")

        return sms_files

    def _load_sms_templates(self):
        """Charge les templates pour SMS"""
        if self.template_sms_login is None:
            login_path = Path(self.config['paths']['template_sms_login'])
            if not login_path.exists():
                raise FileNotFoundError(f"Template SMS login non trouvé: {login_path}")
            with open(login_path, 'r', encoding='utf-8') as f:
                self.template_sms_login = f.read()
            self.logger.debug("Template SMS login chargé")

        if self.template_sms_content is None:
            content_path = Path(self.config['paths']['template_sms_content'])
            if not content_path.exists():
                raise FileNotFoundError(f"Template SMS content non trouvé: {content_path}")
            with open(content_path, 'r', encoding='utf-8') as f:
                self.template_sms_content = f.read()
            self.logger.debug("Template SMS content chargé")

    def _process_sms(self, sms_files: List[Tuple[Path, str]]):
        """Traite chaque fichier SMS (fichiers HTML complets)"""
        # Charge le template de login
        self._load_sms_templates()

        output_dir = Path(self.config['paths']['output_dir'])

        sms_output_dir = output_dir / "sms"
        sms_output_dir.mkdir(parents=True, exist_ok=True)

        audio_output_dir = sms_output_dir / "audio"
        audio_output_dir.mkdir(parents=True, exist_ok=True)

        for html_file, numero in sms_files:
            try:
                self.stats['total'] += 1
                self.stats['sms'] += 1

                self.logger.info(f"Traitement SMS: {numero}")

                # Lit le fichier HTML complet
                content_html = self._read_file_safe(html_file)
                if not content_html:
                    self.logger.warning(f"Fichier SMS vide : {html_file.name}")
                    self.stats['skipped'] += 1
                    continue

                # Extrait le prénom du nom de fichier (ex: +33612345678_Fatima -> Fatima)
                prenom = "Utilisateur"
                if '_' in numero:
                    prenom = numero.split('_')[-1]

                self.logger.info(f"Prénom extrait du fichier: {prenom}")

                # Calcule un hash basé sur le contenu HTML
                content_hash = self._calculate_hash(content_html)

                # Récupère ou crée ID et code
                doc_id, code, is_new = self.db.get_or_create(numero, content_hash, "sms")

                if is_new:
                    self.stats['nouveaux'] += 1
                else:
                    self.stats['modifies'] += 1

                # Génère la page de login
                login_html = self.template_sms_login
                login_html = login_html.replace('{{CODE}}', code)
                login_html = login_html.replace('{{ID}}', doc_id)

                login_file = sms_output_dir / f'sms-{doc_id}.html'
                with open(login_file, 'w', encoding='utf-8') as f:
                    f.write(login_html)

                content_file = sms_output_dir / f'sms-{doc_id}-content.html'
                with open(content_file, 'w', encoding='utf-8') as f:
                    f.write(content_html)

                self.logger.success(f"✓ SMS {doc_id} généré (prénom: {prenom})")
                self.logger.info(f"  URL: /sms/sms-{doc_id}.html")

            except Exception as e:
                self.logger.error(f"Erreur avec SMS {numero}: {e}")
                self.stats['erreurs'] += 1
                import traceback
                self.logger.error(traceback.format_exc())

    def _scan_html_direct_files(self) -> List[Path]:
        """
        Scan le dossier html-direct pour trouver les fichiers HTML à mettre en ligne tels quels
        Retourne: Liste de chemins de fichiers HTML
        """
        html_files = []

        html_direct_dir = Path(self.config['paths']['input_html_direct'])
        if not html_direct_dir.exists():
            html_direct_dir.mkdir(parents=True, exist_ok=True)
            self.logger.warning(f"Dossier html-direct créé: {html_direct_dir}")
            return html_files

        for html_file in html_direct_dir.glob("*.html"):
            html_files.append(html_file)
            self.logger.info(f"HTML direct trouvé: {html_file.name}")

        self.logger.info(f"TOTAL: {len(html_files)} fichiers HTML direct à mettre en ligne")

        return html_files

    def _process_html_direct(self, html_files: List[Path]):
        """
        Copie les fichiers HTML directement dans output/ sans modification.
        Pas de page login, pas de code. Le fichier est accessible tel quel.
        URL finale: my-muqabala.fr/{nom-du-fichier}.html
        """
        output_dir = Path(self.config['paths']['output_dir'])
        output_dir.mkdir(parents=True, exist_ok=True)

        for html_file in html_files:
            try:
                self.stats['total'] += 1
                self.stats['html_direct'] += 1

                dest_file = output_dir / html_file.name
                shutil.copy2(html_file, dest_file)

                self.logger.success(f"✓ HTML direct copié: {html_file.name}")
                self.logger.info(f"  URL: https://www.my-muqabala.fr/{html_file.name}")
                self.stats['nouveaux'] += 1

            except Exception as e:
                self.logger.error(f"Erreur copie HTML direct {html_file.name}: {e}")
                self.stats['erreurs'] += 1

    def _process_files(self, txt_files: List[Tuple[Path, str]]):
        """Traite chaque fichier et insère dans Supabase section_content"""
        for txt_file, doc_type in txt_files:
            try:
                self.stats['total'] += 1

                # Extrait le numéro du nom de fichier
                numero = txt_file.stem  # Sans l'extension .txt
                self.logger.debug(f"Traitement : {numero} (type: {doc_type})")

                # Lit le contenu
                content = self._read_file_safe(txt_file)
                if not content:
                    self.logger.warning(f"Fichier vide : {txt_file.name}")
                    self.stats['skipped'] += 1
                    continue

                # Calcule le hash
                content_hash = self._calculate_hash(content)

                # Récupère ou crée ID et code (avec le type de document)
                doc_id, code, is_new = self.db.get_or_create(numero, content_hash, doc_type)

                if is_new:
                    self.stats['nouveaux'] += 1
                else:
                    self.stats['modifies'] += 1

                # Comptage par type
                if doc_type == "plan-action":
                    self.stats['plan_action'] += 1
                else:
                    self.stats['compte_rendu'] += 1

                self.logger.debug(f"✓ {doc_type} {doc_id} traité")

                # Insert raw content into Supabase section_content (unique destination)
                self._insert_to_supabase(txt_file, doc_type, content)

            except Exception as e:
                self.logger.error(f"Erreur avec {txt_file.name} : {e}")
                self.stats['erreurs'] += 1
                self.logger.error(traceback.format_exc())

    def _read_file_safe(self, file_path: Path) -> str:
        """Lit un fichier avec gestion d'erreurs"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()

            # Diagnostic du contenu du fichier TXT
            self.logger.info(f"Fichier {file_path.name} lu avec succès (taille: {len(content)} caractères)")
            if content.strip():
                self.logger.info(f"Aperçu du contenu: {content[:50]}...")
            else:
                self.logger.warning(f"Le fichier {file_path.name} semble vide ou ne contient que des espaces")

            return content
        except Exception as e:
            self.logger.error(f"Erreur lecture {file_path.name} : {e}")
            return ""

    def _export_csv(self, txt_files: List[Tuple[Path, str]], cartographie_folders: List[Tuple[Path, str]] = None, sms_files: List[Tuple[Path, str]] = None):
        """Exporte un CSV unifié avec Telephone, Prenom, Mot_de_passe, Message_SMS"""
        base_export_dir = Path(self.config['paths']['output_dir']).parent / 'exports'
        base_export_dir.mkdir(exist_ok=True)

        # Collect all processed phone numbers
        processed_phones = set()
        for f, doc_type in txt_files:
            phone = _extract_phone_from_filename(f.name)
            if phone:
                processed_phones.add(phone)
        if cartographie_folders:
            for folder, numero in cartographie_folders:
                phone = _extract_phone_from_filename(numero) or normalize_phone(numero)
                processed_phones.add(phone)
        if sms_files:
            for txt_file, numero in sms_files:
                phone = _extract_phone_from_filename(numero)
                if phone:
                    processed_phones.add(phone)

        if not processed_phones:
            self.logger.warning("Aucun numéro à exporter")
            return

        all_entries = self.db.get_all_entries()
        timestamp = datetime.datetime.now().strftime("%Y%m%d-%H%M%S")
        sms_template = self.config['messages'].get('csv_template_app', '')

        csv_path = base_export_dir / f'identifiants-{timestamp}.csv'
        sep = self.config['settings']['csv_separator']

        try:
            with open(csv_path, 'w', encoding='utf-8-sig', newline='') as f:
                writer = csv.writer(f, delimiter=sep)
                writer.writerow(['Telephone', 'Prenom', 'Mot_de_passe', 'Nouveau_compte', 'Message_SMS'])

                count = 0
                for phone in sorted(processed_phones):
                    # Look up auth entry for password
                    auth_key = f"{phone}|auth"
                    auth_entry = all_entries.get(auth_key, {})
                    password = auth_entry.get('password', '')
                    prenom = auth_entry.get('prenom', '')
                    nouveau = 'Oui' if auth_entry.get('nouveau_compte') else 'Non'

                    # Build SMS message
                    message = ''
                    if sms_template and password:
                        message = sms_template.replace('{telephone}', phone).replace('{password}', password).replace('{prenom}', prenom)

                    writer.writerow([phone, prenom, password, nouveau, message])
                    count += 1

                self.logger.success(f"CSV identifiants exporté : {count} lignes -> {csv_path.name}")

        except Exception as e:
            self.logger.error(f"Erreur export CSV : {e}")

        # Upload to Supabase Storage
        if self.sb_client:
            storage_path = f'exports/{csv_path.name}'
            if self.sb_client.upload_file(csv_path, storage_path):
                self.logger.info(f"  Uploaded: {storage_path}")

    def _generate_report(self):
        """Génère le rapport final"""
        self.logger.header("RAPPORT FINAL")

        report = f"""
RÉSUMÉ :
- Fichiers traités : {self.stats['total']}
  - Compte-rendus : {self.stats['compte_rendu']}
  - Plans d'action : {self.stats['plan_action']}
  - Cartographies : {self.stats['cartographie']}
  - SMS : {self.stats['sms']}
- Nouveaux documents : {self.stats['nouveaux']}
- Mises à jour : {self.stats['modifies']}
- Fichiers ignorés : {self.stats['skipped']}
- Erreurs : {self.stats['erreurs']}

ACTIONS EFFECTUÉES :
[OK] Base de données locale mise à jour
[OK] {self.stats['total'] - self.stats['skipped'] - self.stats['erreurs']} documents insérés dans Supabase
[OK] CSV identifiants exporté

Fichiers générés :
- CSV : exports/
- Logs : {self.config['paths']['logs_dir']}

MODE : Tout via Supabase (pas de fichiers statiques)"""

        # Affiche
        print(report)

        # Sauvegarde
        report_path = Path(self.config['paths']['output_dir']).parent / 'rapport-generation.txt'
        with open(report_path, 'w', encoding='utf-8') as f:
            f.write(report)

def main():
    """Point d'entrée principal"""
    import argparse

    parser = argparse.ArgumentParser(description='My Muqabala Processor')
    parser.add_argument('--type', choices=['compte-rendu', 'plan-action', 'compte-rendu-plan-action', 'cartographie', 'sms', 'html-direct', 'tous'],
                        default='tous', help='Type de document à traiter')
    parser.add_argument('--since', type=str, default=None,
                        help='Export credentials since date (YYYY-MM-DD)')
    parser.add_argument('--export-credentials', action='store_true',
                        help='Export credentials CSV only (no processing)')
    args = parser.parse_args()

    try:
        processor = MyMuqabalaProcessor()

        if args.export_credentials:
            # Export credentials only mode
            base_export_dir = Path(processor.config['paths']['output_dir']).parent / 'exports'
            base_export_dir.mkdir(exist_ok=True)
            timestamp = datetime.datetime.now().strftime("%Y%m%d-%H%M%S")
            csv_path = base_export_dir / f'identifiants-{timestamp}.csv'
            processor.exporter.export_credentials(
                processor.db.data, str(csv_path), since_date=args.since)
        else:
            processor.process(doc_type_filter=args.type)

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
