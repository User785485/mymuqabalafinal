@echo off
setlocal enabledelayedexpansion
chcp 65001 > nul
title My Muqabala - Processeur Automatique

:: Active les extensions de commande
setlocal ENABLEEXTENSIONS

:: Définition des codes couleur pour Windows
:: Ces codes fonctionnent avec la commande COLOR native de Windows
set GREEN=0A
set RED=0C
set YELLOW=0E
set BLUE=09
set MAGENTA=0D
set CYAN=0B
set WHITE=0F
set NORMAL=07

cls

color %CYAN%
echo ==============================================
echo          MY MUQABALA PROCESSOR             
echo ==============================================
echo.
color %YELLOW%
echo Bienvenue dans le processeur de My Muqabala.
echo Ce script va generer les fichiers necessaires.
echo.

:: Verifier qu'on se trouve bien dans le bon repertoire
if not exist "sources\processeur-global.py" (
    if exist "..\sources\processeur-global.py" (
        color %YELLOW%
        echo Changement vers le repertoire principal...
        color %NORMAL%
        cd ..
    ) else (
        color %RED%
        echo ERREUR: Impossible de trouver le repertoire sources avec processeur-global.py
        echo Veuillez executer ce script depuis le repertoire racine du projet.
        color %NORMAL%
        pause
        exit /b 1
    )
)

:: Verifier l'existence des dossiers requis
if not exist "input" (
    mkdir input
    color %YELLOW%
    echo Dossier input cree.
    color %NORMAL%
)
if not exist "database" (
    mkdir database
    color %YELLOW%
    echo Dossier database cree.
    color %NORMAL%
)
if not exist "logs" (
    mkdir logs
    color %YELLOW%
    echo Dossier logs cree.
    color %NORMAL%
)
if not exist "output" (
    mkdir output
    color %YELLOW%
    echo Dossier output cree.
    color %NORMAL%
)

:: Confirmation avant de lancer
color %YELLOW%
echo Pret a lancer le processus de generation.
echo.
color %WHITE%
set /p CONFIRM=Voulez-vous continuer ? (O/N) : 

if /i "%CONFIRM%" NEQ "O" (
    echo.
    color %YELLOW%
    echo Processus annule.
    color %NORMAL%
    pause
    exit /b 0
)

:START_PROCESS
:: Lancer le processus
echo.
color %CYAN%
echo ==============================================
color %GREEN%
echo LANCEMENT DU PROCESSUS...
color %CYAN%
echo ==============================================
echo.

:: Enregistrer l'heure de debut
set START_TIME=%time%

:: Lancer Python directement avec affichage en temps reel
echo.
color %CYAN%
echo Lancement du script Python...
echo Tous les messages vont s'afficher ci-dessous :
echo ==============================================
echo.

:: Aller dans le repertoire sources pour executer le script Python
cd sources

:: Verifier que Python est disponible
where python >nul 2>nul
if %errorlevel% NEQ 0 (
    color %RED%
    echo ERREUR: Python n'est pas installe ou n'est pas dans le PATH
    echo Veuillez installer Python et l'ajouter au PATH, puis relancer ce script.
    cd ..
    color %NORMAL%
    pause
    exit /b 1
)

:: Executer le script Python avec l'option -u pour un affichage non bufferise
python -u processeur-global.py 2>&1
set ERROR_CODE=%errorlevel%

:: Revenir au repertoire principal
cd ..

:: Calculer le temps ecoule
set END_TIME=%time%

echo.
echo %CYAN%==============================================%RESET%

:: Afficher les resultats detailles
echo.
color %CYAN%
echo ==============================================
echo               RESUME D'EXECUTION            
echo ==============================================
echo.

if %ERROR_CODE% EQU 0 (
    color %GREEN%
    echo ==============================================
    echo      PROCESSUS TERMINE AVEC SUCCES !        
    echo ==============================================
) else (
    color %RED%
    echo ==============================================
    echo         ERREUR LORS DU PROCESSUS !           
    echo         Code erreur : %ERROR_CODE%             
    echo ==============================================
)

echo.
color %WHITE%
echo EMPLACEMENTS DES FICHIERS :
color %CYAN%
echo ----------------------------------------------

:: Verifier l'existence de chaque dossier/fichier
if exist "output\site-final" (
    color %GREEN%
    echo [OK] Site genere     : output\site-final\
    color %NORMAL%
) else (
    color %RED%
    echo [MANQUANT] Site genere     : output\site-final\ (NON TROUVE)
    color %NORMAL%
)

if exist "output\exports" (
    color %GREEN%
    echo [OK] Fichiers CSV    : output\exports\
    color %NORMAL%
) else (
    color %RED%
    echo [MANQUANT] Fichiers CSV    : output\exports\ (NON TROUVE)
    color %NORMAL%
)

if exist "logs" (
    color %GREEN%
    echo [OK] Logs detailles  : logs\
    color %NORMAL%
) else (
    color %RED%
    echo [MANQUANT] Logs detailles  : logs\ (NON TROUVE)
    color %NORMAL%
)

if exist "output\rapport-generation.txt" (
    color %GREEN%
    echo [OK] Rapport final   : output\rapport-generation.txt
    color %NORMAL%
) else (
    color %RED%
    echo [MANQUANT] Rapport final   : output\rapport-generation.txt (NON TROUVE)
    color %NORMAL%
)

if exist "database\codes-generes.json" (
    color %GREEN%
    echo [OK] Base de donnees : database\codes-generes.json
    color %NORMAL%
) else (
    color %RED%
    echo [MANQUANT] Base de donnees : database\codes-generes.json (NON TROUVE)
    color %NORMAL%
)

color %CYAN%
echo ----------------------------------------------
color %NORMAL%

:: Deploiement automatique sur Vercel si le processus s'est termine avec succes
if %ERROR_CODE% EQU 0 (
    color %YELLOW%
    echo.
    echo ==============================================
    echo          DEPLOIEMENT VERCEL AUTOMATIQUE
    echo ==============================================
    echo.
    color %NORMAL%
    
    :: Verifier que Vercel CLI est installe
    where vercel >nul 2>nul
    if %errorlevel% NEQ 0 (
        color %RED%
        echo ERREUR: Vercel CLI n'est pas installe ou n'est pas dans le PATH
        echo Pour installer, executez: npm install -g vercel
        color %NORMAL%
    ) else (
        :: Aller dans le dossier du site final
        if exist "output\site-final" (
            cd output\site-final
            
            :: Lancer le deploiement Vercel
            echo Lancement du deploiement Vercel...
            vercel --prod --yes
            set VERCEL_CODE=%errorlevel%
            
            :: Revenir au repertoire principal
            cd ..\..
            
            if %VERCEL_CODE% EQU 0 (
                color %GREEN%
                echo.
                echo Deploiement Vercel termine avec succes!
            ) else (
                color %RED%
                echo.
                echo Erreur lors du deploiement Vercel (code %VERCEL_CODE%)
            )
            color %NORMAL%
        ) else (
            color %RED%
            echo ERREUR: Le dossier output\site-final n'existe pas
            color %NORMAL%
        )
    )
)

echo.
color %YELLOW%
echo ACTIONS DISPONIBLES :
color %CYAN%
echo ----------------------------------------------
color %NORMAL%
echo   [1] Ouvrir le dossier du site genere
echo   [2] Ouvrir le fichier CSV
echo   [3] Ouvrir le rapport de generation
echo   [4] Ouvrir les logs detailles
echo   [5] Voir la base de donnees (JSON)
echo   [6] Deployer sur Vercel
echo   [7] Relancer le processus
echo   [8] Quitter

echo.
color %CYAN%
echo ----------------------------------------------
color %NORMAL%

:MENU_LOOP
color %WHITE%
set /p MENU_CHOICE=Votre choix (1-8) : 
color %NORMAL%

if "%MENU_CHOICE%"=="1" (
    if exist "output\site-final" (
        start explorer "output\site-final"
    ) else (
        color %RED%
        echo [ERREUR] Le dossier n'existe pas encore.
        color %NORMAL%
    )
    goto MENU_LOOP
)

if "%MENU_CHOICE%"=="2" (
    if exist "output\exports" (
        start explorer "output\exports"
    ) else (
        color %RED%
        echo [ERREUR] Le dossier n'existe pas encore.
        color %NORMAL%
    )
    goto MENU_LOOP
)

if "%MENU_CHOICE%"=="3" (
    if exist "output\rapport-generation.txt" (
        start notepad "output\rapport-generation.txt"
    ) else (
        color %RED%
        echo [ERREUR] Le fichier n'existe pas encore.
        color %NORMAL%
    )
    goto MENU_LOOP
)

if "%MENU_CHOICE%"=="4" (
    if exist "logs" (
        start explorer "logs"
    ) else (
        color %RED%
        echo [ERREUR] Le dossier n'existe pas encore.
        color %NORMAL%
    )
    goto MENU_LOOP
)

if "%MENU_CHOICE%"=="5" (
    if exist "database\codes-generes.json" (
        start notepad "database\codes-generes.json"
    ) else (
        color %RED%
        echo [ERREUR] Le fichier n'existe pas encore.
        color %NORMAL%
    )
    goto MENU_LOOP
)

if "%MENU_CHOICE%"=="6" (
    color %YELLOW%
    echo.
    echo Deploiement du site sur Vercel...
    echo.
    color %NORMAL%
    
    :: Verifier que Vercel CLI est installe
    where vercel >nul 2>nul
    if %errorlevel% NEQ 0 (
        color %RED%
        echo ERREUR: Vercel CLI n'est pas installe ou n'est pas dans le PATH
        echo Pour installer, executez: npm install -g vercel
        color %NORMAL%
    ) else (
        :: Aller dans le dossier du site final
        cd output\site-final
        
        :: Lancer le deploiement Vercel
        echo Lancement du deploiement Vercel...
        vercel --prod --yes
        
        :: Revenir au repertoire principal
        cd ..\..
        
        color %GREEN%
        echo.
        echo Deploiement termine!
        color %NORMAL%
    )
    goto MENU_LOOP
)

if "%MENU_CHOICE%"=="7" (
    cls
    goto START_PROCESS
)

if "%MENU_CHOICE%"=="8" (
    echo.
    color %GREEN%
    echo Merci d'avoir utilise My Muqabala Processeur. Au revoir !
    color %NORMAL%
    pause
    exit /b 0
)

color %RED%
echo Choix invalide. Veuillez entrer un nombre entre 1 et 8.
color %NORMAL%
goto MENU_LOOP
