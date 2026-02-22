# My Muqabala - Processeur Automatique

## Description
Ce projet est un processeur automatique pour la génération de pages HTML personnalisées, de rapports CSV et d'une base de données JSON à partir de fichiers texte d'entrée.

## Structure du projet
- `START.bat` - Script principal pour lancer l'application
- `sources/` - Contient les scripts Python et la configuration
- `input/` - Dossier pour les fichiers texte à traiter
- `output/` - Dossier où sont générés les fichiers de sortie
- `database/` - Stockage de la base de données JSON
- `logs/` - Fichiers journaux d'exécution
- `assets-existants/` - Templates HTML et ressources statiques

## Prérequis
- Windows
- Python 3.6 ou supérieur
- Les dépendances Python listées dans `sources/requirements.txt`

## Installation
1. Clonez ce dépôt
2. Assurez-vous que Python est installé et disponible dans votre PATH
3. Installez les dépendances : `pip install -r sources/requirements.txt`

## Utilisation
1. Placez vos fichiers texte dans le dossier `input/`
2. Exécutez `START.bat`
3. Suivez les instructions à l'écran
4. Les fichiers générés seront disponibles dans les dossiers correspondants

## Fonctionnalités
- Traitement automatique des fichiers texte
- Génération de pages HTML personnalisées
- Export CSV des données traitées
- Création et mise à jour d'une base de données JSON
- Journalisation détaillée des opérations
- Interface utilisateur en ligne de commande avec codes couleur

## Notes importantes
- Utilisez des chemins relatifs pour assurer la portabilité
- Le script vérifie et crée automatiquement les dossiers nécessaires
- Les rapports d'exécution sont disponibles dans le dossier `logs/`
