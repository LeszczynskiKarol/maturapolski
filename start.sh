#!/bin/bash

echo "========================================="
echo "MaturaPolski - Start/Restart Script"
echo "========================================="
echo ""

# Kolory
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Backend
echo -e "${YELLOW}[1/4] Starting Backend...${NC}"
cd /var/www/maturapolski/backend

if pm2 list | grep -q "maturapolski-backend.*online"; then
    echo "Backend already running, restarting..."
    pm2 restart maturapolski-backend
else
    echo "Starting backend..."
    pm2 start ecosystem.config.js
fi

sleep 2

# Sprawdź backend
if curl -sf http://localhost:4000/health > /dev/null; then
    echo -e "${GREEN}✓ Backend is running${NC}"
else
    echo -e "${RED}✗ Backend failed to start${NC}"
    pm2 logs --err --lines 20
    exit 1
fi

# Nginx (dla frontendu)
echo ""
echo -e "${YELLOW}[2/4] Restarting Nginx (Frontend)...${NC}"
sudo systemctl restart nginx

if sudo systemctl is-active --quiet nginx; then
    echo -e "${GREEN}✓ Nginx is running${NC}"
else
    echo -e "${RED}✗ Nginx failed to start${NC}"
    sudo nginx -t
    exit 1
fi

# PostgreSQL
echo ""
echo -e "${YELLOW}[3/4] Checking PostgreSQL...${NC}"
if sudo systemctl is-active --quiet postgresql; then
    echo -e "${GREEN}✓ PostgreSQL is running${NC}"
else
    echo -e "${RED}✗ PostgreSQL is not running${NC}"
    sudo systemctl start postgresql
fi

# Status
echo ""
echo -e "${YELLOW}[4/4] System Status${NC}"
echo "-----------------------------------"
pm2 list
echo ""
echo "Backend: http://localhost:4000"
echo "API: https://api.maturapolski.pl"
echo "Frontend: https://maturapolski.pl"
echo ""

# Health check
echo "Health Check:"
curl -s https://api.maturapolski.pl/health | python3 -m json.tool || echo "API not responding"

echo ""
echo -e "${GREEN}=========================================${NC}"
echo -e "${GREEN}All services started!${NC}"
echo -e "${GREEN}=========================================${NC}"