#!/bin/bash

echo "========================================="
echo "MaturaPolski - Deploy Script"
echo "========================================="

# 1. Git pull
echo -e "${YELLOW}[1/7] Pobieranie zmian z repozytorium...${NC}"
git pull origin main
echo -e "${GREEN}✓ Zmiany pobrane${NC}\n"


# Backend
echo "[1/3] Updating Backend..."
cd /var/www/maturapolski/backend
git pull
npm install --production
npm run build
npx prisma generate
npx prisma migrate deploy
pm2 restart maturapolski-backend
echo "✓ Backend updated"

# Frontend
echo ""
echo "[2/3] Updating Frontend..."
cd /var/www/maturapolski/frontend
git pull
npm install
npm run build
echo "✓ Frontend updated"

# Restart
echo ""
echo "[3/3] Restarting services..."
sudo systemctl restart nginx
pm2 restart maturapolski-backend

echo ""
echo "========================================="
echo "Deploy complete!"
echo "========================================="