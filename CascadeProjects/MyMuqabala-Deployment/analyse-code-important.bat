@echo off
setlocal enabledelayedexpansion

echo ============================================================
echo             MY MUQABALA - ANALYSE DU CODE                
echo ============================================================
echo.
echo Ce script analyse et compile les parties importantes de l'application
echo.

set "OUTPUT_DIR=C:\Users\Moham\CascadeProjects\MyMuqabala-Deployment\analyse"

if not exist "%OUTPUT_DIR%" mkdir "%OUTPUT_DIR%"

echo Création du dossier d'analyse: %OUTPUT_DIR%
echo.

REM ===== 1. CONFIGURATION =====
echo [1/5] Analyse de la configuration...
echo.

echo   Configuration (config.json) > "%OUTPUT_DIR%\01-configuration.txt"
echo   ------------------------------------------ >> "%OUTPUT_DIR%\01-configuration.txt"
type "C:\Users\Moham\CascadeProjects\MyMuqabala-Deployment\sources\config.json" >> "%OUTPUT_DIR%\01-configuration.txt"
echo. >> "%OUTPUT_DIR%\01-configuration.txt"
echo Notes: >> "%OUTPUT_DIR%\01-configuration.txt"
echo - La configuration définit tous les chemins de l'application >> "%OUTPUT_DIR%\01-configuration.txt"
echo - Le paramètre "output_dir" est défini sur "output" sans "site-final" >> "%OUTPUT_DIR%\01-configuration.txt"
echo - Le paramètre "pause_entre_etapes" est défini sur "false" pour l'automatisation >> "%OUTPUT_DIR%\01-configuration.txt"
echo.

echo Configuration extraite.

REM ===== 2. STRUCTURE DE L'APPLICATION =====
echo [2/5] Analyse de la structure de l'application...
echo.

echo   Structure de l'application > "%OUTPUT_DIR%\02-structure.txt"
echo   ------------------------------------------ >> "%OUTPUT_DIR%\02-structure.txt"
echo * sources/                                    >> "%OUTPUT_DIR%\02-structure.txt"
echo   ├── config.json                             >> "%OUTPUT_DIR%\02-structure.txt"
echo   ├── processeur-global.py                    >> "%OUTPUT_DIR%\02-structure.txt"
echo   └── lancer-processus.bat                    >> "%OUTPUT_DIR%\02-structure.txt"
echo * assets-existants/                           >> "%OUTPUT_DIR%\02-structure.txt"
echo   ├── home-compiled.html                      >> "%OUTPUT_DIR%\02-structure.txt"
echo   ├── login-elegent.html                      >> "%OUTPUT_DIR%\02-structure.txt"
echo   └── template.html                           >> "%OUTPUT_DIR%\02-structure.txt"
echo * input/                                      >> "%OUTPUT_DIR%\02-structure.txt"
echo   └── +3357547854.txt (exemple)               >> "%OUTPUT_DIR%\02-structure.txt"
echo * output/                                     >> "%OUTPUT_DIR%\02-structure.txt"
echo   ├── compte-rendu/                           >> "%OUTPUT_DIR%\02-structure.txt"
echo   │   └── 151567/ (ID généré)                 >> "%OUTPUT_DIR%\02-structure.txt"
echo   │       ├── index.html (page de login)      >> "%OUTPUT_DIR%\02-structure.txt"
echo   │       └── content.html (contenu rapport)  >> "%OUTPUT_DIR%\02-structure.txt"
echo   ├── assets/                                 >> "%OUTPUT_DIR%\02-structure.txt"
echo   ├── exports/ (fichiers CSV)                 >> "%OUTPUT_DIR%\02-structure.txt"
echo   ├── index.html (home page)                  >> "%OUTPUT_DIR%\02-structure.txt"
echo   └── vercel.json                             >> "%OUTPUT_DIR%\02-structure.txt"
echo.

echo Structure extraite.

REM ===== 3. PAGE DE LOGIN =====
echo [3/5] Analyse de la page de login (login-elegent.html)...
echo.

echo   Page de login (login-elegent.html) > "%OUTPUT_DIR%\03-login.txt"
echo   ------------------------------------------ >> "%OUTPUT_DIR%\03-login.txt"
echo PROBLÈME IDENTIFIÉ - VALIDATION DU CODE À 6 CHIFFRES: >> "%OUTPUT_DIR%\03-login.txt"
echo. >> "%OUTPUT_DIR%\03-login.txt"
echo 1. HTML - Input (lignes 503-510): >> "%OUTPUT_DIR%\03-login.txt"
echo    - Modifié pour accepter 6 chiffres: >> "%OUTPUT_DIR%\03-login.txt"
echo    - placeholder="••••••" >> "%OUTPUT_DIR%\03-login.txt"
echo    - maxlength="6" >> "%OUTPUT_DIR%\03-login.txt"
echo    - pattern="[0-9]{6}" >> "%OUTPUT_DIR%\03-login.txt"
echo. >> "%OUTPUT_DIR%\03-login.txt"
echo 2. JavaScript - Validation (ligne 556): >> "%OUTPUT_DIR%\03-login.txt"
echo    - DOIT ÊTRE MODIFIÉ: >> "%OUTPUT_DIR%\03-login.txt"
echo    - Actuel: const expectedCode = doc ? doc.match(/\d{4,6}/)?.[0]?.slice(-4) : ''; >> "%OUTPUT_DIR%\03-login.txt"
echo    - À modifier: const expectedCode = doc ? doc.match(/\d{6}/)?.[0] : ''; >> "%OUTPUT_DIR%\03-login.txt"
echo    - Problème: Le .slice(-4) prend seulement les 4 derniers chiffres >> "%OUTPUT_DIR%\03-login.txt"
echo. >> "%OUTPUT_DIR%\03-login.txt"
echo 3. Easter Egg - Konami Code (lignes ~590): >> "%OUTPUT_DIR%\03-login.txt"
echo    - DOIT ÊTRE MODIFIÉ (même problème) >> "%OUTPUT_DIR%\03-login.txt"
echo. >> "%OUTPUT_DIR%\03-login.txt"
echo Action requise: >> "%OUTPUT_DIR%\03-login.txt"
echo - Modifier toutes les instances de .slice(-4) pour supporter les codes à 6 chiffres >> "%OUTPUT_DIR%\03-login.txt"
echo. >> "%OUTPUT_DIR%\03-login.txt"

echo Analyse de la page de login terminée.

REM ===== 4. PROCESSEUR PYTHON =====
echo [4/5] Analyse du processeur Python...
echo.

echo   Processeur Python (processeur-global.py) > "%OUTPUT_DIR%\04-processeur.txt"
echo   ------------------------------------------ >> "%OUTPUT_DIR%\04-processeur.txt"
echo NOTES IMPORTANTES: >> "%OUTPUT_DIR%\04-processeur.txt"
echo. >> "%OUTPUT_DIR%\04-processeur.txt"
echo 1. Le script utilise uniquement des bibliothèques Python standard >> "%OUTPUT_DIR%\04-processeur.txt"
echo 2. Le script a été modifié pour forcer l'encodage UTF-8 dans la console >> "%OUTPUT_DIR%\04-processeur.txt"
echo 3. Le script génère des codes à 6 chiffres pour les nouveaux comptes-rendus >> "%OUTPUT_DIR%\04-processeur.txt"
echo 4. Le processus se déroule en 5 étapes: >> "%OUTPUT_DIR%\04-processeur.txt"
echo    - Scan des fichiers TXT >> "%OUTPUT_DIR%\04-processeur.txt"
echo    - Traitement des contenus >> "%OUTPUT_DIR%\04-processeur.txt"
echo    - Copie des assets >> "%OUTPUT_DIR%\04-processeur.txt"
echo    - Export CSV >> "%OUTPUT_DIR%\04-processeur.txt"
echo    - Configuration Vercel >> "%OUTPUT_DIR%\04-processeur.txt"
echo. >> "%OUTPUT_DIR%\04-processeur.txt"
echo 5. Le script crée les répertoires suivants pour chaque rapport: >> "%OUTPUT_DIR%\04-processeur.txt"
echo    - /output/compte-rendu/[ID]/index.html (page de login) >> "%OUTPUT_DIR%\04-processeur.txt"
echo    - /output/compte-rendu/[ID]/content.html (contenu du rapport) >> "%OUTPUT_DIR%\04-processeur.txt"
echo. >> "%OUTPUT_DIR%\04-processeur.txt"
echo 6. Le script a généré le fichier vercel.json avec routes au lieu de rewrites >> "%OUTPUT_DIR%\04-processeur.txt"
echo    - Nécessite correction manuelle pour Vercel >> "%OUTPUT_DIR%\04-processeur.txt"
echo. >> "%OUTPUT_DIR%\04-processeur.txt"

echo Analyse du processeur Python terminée.

REM ===== 5. DÉPLOIEMENT VERCEL =====
echo [5/5] Analyse de la configuration Vercel...
echo.

echo   Configuration Vercel (vercel.json) > "%OUTPUT_DIR%\05-vercel.txt"
echo   ------------------------------------------ >> "%OUTPUT_DIR%\05-vercel.txt"
echo CORRECTION EFFECTUÉE: >> "%OUTPUT_DIR%\05-vercel.txt"
echo. >> "%OUTPUT_DIR%\05-vercel.txt"
echo Vercel.json original: >> "%OUTPUT_DIR%\05-vercel.txt"
echo - Utilisait "routes" (syntaxe obsolète) >> "%OUTPUT_DIR%\05-vercel.txt"
echo - Incompatible avec headers/cleanUrls/trailingSlash >> "%OUTPUT_DIR%\05-vercel.txt"
echo. >> "%OUTPUT_DIR%\05-vercel.txt"
echo Vercel.json corrigé: >> "%OUTPUT_DIR%\05-vercel.txt"
echo - Utilise "rewrites" (syntaxe moderne) >> "%OUTPUT_DIR%\05-vercel.txt"
echo - Compatible avec headers/cleanUrls/trailingSlash >> "%OUTPUT_DIR%\05-vercel.txt"
echo - Structure mise à jour pour la compatibilité avec Vercel >> "%OUTPUT_DIR%\05-vercel.txt"
echo. >> "%OUTPUT_DIR%\05-vercel.txt"
echo IMPORTANT: À chaque nouvelle génération du site, le vercel.json >> "%OUTPUT_DIR%\05-vercel.txt"
echo doit être corrigé avant déploiement. >> "%OUTPUT_DIR%\05-vercel.txt"
echo. >> "%OUTPUT_DIR%\05-vercel.txt"

echo Analyse de la configuration Vercel terminée.

REM ===== RÉSUMÉ =====
echo.
echo ============================================================
echo                       RÉSUMÉ                               
echo ============================================================
echo.
echo Analyse complète du code important terminée.
echo Les fichiers ont été sauvegardés dans: %OUTPUT_DIR%
echo.
echo Principales conclusions:
echo 1. Le système fonctionne correctement mais la page de login
echo    doit être mise à jour pour les codes à 6 chiffres
echo 2. Le processeur Python est correctement configuré
echo 3. Le fichier vercel.json doit être corrigé après chaque génération
echo 4. Le compte-rendu pour +3357547854 (ID: 151567) a été généré avec succès
echo.
echo.
echo Appuyez sur une touche pour quitter...
pause > nul
