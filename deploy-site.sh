#!/bin/bash

# Skrypt do zarządzania aplikacją maturapolski
# Autor: Karol Leszczyński
# Data: 2025-10-04

set -e  # Zatrzymaj skrypt przy jakimkolwiek błędzie

# Kolory dla lepszej czytelności
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Ścieżka do aplikacji
APP_DIR="/var/www/maturapolski"

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  Deployment aplikacji MaturaPolski.pl${NC}"
echo -e "${BLUE}========================================${NC}\n"

# Przejdź do katalogu aplikacji
cd $APP_DIR || { echo -e "${RED}Błąd: Nie można przejść do katalogu $APP_DIR${NC}"; exit 1; }

# 1. Git pull
echo -e "${YELLOW}[1/7] Pobieranie zmian z repozytorium...${NC}"
git pull origin main
echo -e "${GREEN}✓ Zmiany pobrane${NC}\n"

# 2. Frontend - npm install
echo -e "${YELLOW}[2/7] Instalacja zależności frontendu...${NC}"
cd frontend
npm install
echo -e "${GREEN}✓ Zależności frontendu zainstalowane${NC}\n"

# 3. Frontend - npm run build
echo -e "${YELLOW}[3/7] Budowanie frontendu...${NC}"
npm run build
echo -e "${GREEN}✓ Frontend zbudowany${NC}\n"

# 4. Powrót do głównego katalogu i przejście do backendu
cd ..

# 5. Backend - npm install
echo -e "${YELLOW}[4/7] Instalacja zależności backendu...${NC}"
cd backend
npm install
echo -e "${GREEN}✓ Zależności backendu zainstalowane${NC}\n"

# 6. Backend - npm run build
echo -e "${YELLOW}[5/7] Budowanie backendu...${NC}"
npm run build
echo -e "${GREEN}✓ Backend zbudowany${NC}\n"

# 7. Restart PM2
echo -e "${YELLOW}[6/7] Restartowanie aplikacji (PM2)...${NC}"
pm2 restart maturapolski-backend --update-env
echo -e "${GREEN}✓ Aplikacja zrestartowana${NC}\n"

# 8. Wyświetl status PM2
echo -e "${YELLOW}[7/7] Status aplikacji:${NC}"
pm2 status maturapolski-backend

echo -e "\n${GREEN}========================================${NC}"
echo -e "${GREEN}  Deployment zakończony pomyślnie!${NC}"
echo -e "${GREEN}========================================${NC}"