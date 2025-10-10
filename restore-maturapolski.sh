#!/bin/bash

# ============================================
# MATURAPOLSKI RESTORE SCRIPT
# ============================================
# Odtwarza backup bazy PostgreSQL i plików aplikacji
# UWAGA: Używaj z rozwagą! To nadpisuje istniejące dane!
# ============================================

set -euo pipefail

# Kolory
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Konfiguracja
BACKUP_BASE_DIR="/var/backups/maturapolski"
APP_DIR="/var/www/maturapolski"
DB_NAME="maturapolski"
DB_USER="postgres"

# ============================================
# FUNKCJE
# ============================================

log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

log_error() {
    echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')] ERROR:${NC} $1" >&2
}

log_warning() {
    echo -e "${YELLOW}[$(date +'%Y-%m-%d %H:%M:%S')] WARNING:${NC} $1"
}

log_info() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')] INFO:${NC} $1"
}

# ============================================
# LISTA DOSTĘPNYCH BACKUPÓW
# ============================================

list_backups() {
    echo ""
    echo "========================================"
    echo "   DOSTĘPNE BACKUPY"
    echo "========================================"
    echo ""
    
    if [ ! -d "$BACKUP_BASE_DIR" ]; then
        log_error "Katalog backupów nie istnieje: $BACKUP_BASE_DIR"
        exit 1
    fi
    
    local backup_dirs=($(find "$BACKUP_BASE_DIR" -maxdepth 1 -type d -name "20*" | sort -r))
    
    if [ ${#backup_dirs[@]} -eq 0 ]; then
        log_warning "Nie znaleziono żadnych backupów!"
        exit 1
    fi
    
    local i=1
    for dir in "${backup_dirs[@]}"; do
        local date=$(basename "$dir")
        local size=$(du -sh "$dir" 2>/dev/null | cut -f1)
        local db_count=$(find "$dir/database" -name "db_*.sql.gz" 2>/dev/null | wc -l)
        local files_count=$(find "$dir/files" -name "*.tar.gz" 2>/dev/null | wc -l)
        
        echo "$i) $date"
        echo "   Rozmiar: $size"
        echo "   Backupy bazy: $db_count"
        echo "   Backupy plików: $files_count"
        
        if [ -f "$dir/backup_report.txt" ]; then
            echo "   ✓ Raport dostępny"
        fi
        echo ""
        
        ((i++))
    done
    
    echo "========================================"
}

# ============================================
# WYBÓR BACKUPU
# ============================================

select_backup() {
    list_backups
    
    echo -n "Wybierz numer backupu do przywrócenia (lub 'q' aby wyjść): "
    read selection
    
    if [ "$selection" = "q" ] || [ "$selection" = "Q" ]; then
        log "Anulowano."
        exit 0
    fi
    
    local backup_dirs=($(find "$BACKUP_BASE_DIR" -maxdepth 1 -type d -name "20*" | sort -r))
    local index=$((selection - 1))
    
    if [ $index -lt 0 ] || [ $index -ge ${#backup_dirs[@]} ]; then
        log_error "Nieprawidłowy wybór!"
        exit 1
    fi
    
    SELECTED_BACKUP="${backup_dirs[$index]}"
    log "Wybrano backup: $(basename $SELECTED_BACKUP)"
}

# ============================================
# RESTORE BAZY DANYCH
# ============================================

restore_database() {
    log_info "Przywracanie bazy danych..."
    
    # Znajdź najnowszy backup bazy w wybranym katalogu
    local db_backup=$(find "$SELECTED_BACKUP/database" -name "db_*.sql.gz" | sort -r | head -1)
    
    if [ -z "$db_backup" ]; then
        log_error "Nie znaleziono backupu bazy danych!"
        return 1
    fi
    
    log_info "Plik backupu: $db_backup"
    
    # OSTRZEŻENIE
    echo ""
    log_warning "⚠️  UWAGA! To nadpisze istniejącą bazę danych!"
    log_warning "⚠️  Baza: $DB_NAME"
    echo ""
    echo -n "Czy na pewno chcesz kontynuować? (tak/nie): "
    read confirm
    
    if [ "$confirm" != "tak" ]; then
        log "Anulowano przywracanie bazy danych."
        return 0
    fi
    
    # Stop aplikacji
    log_info "Zatrzymywanie aplikacji..."
    cd "$APP_DIR"
    pm2 stop maturapolski-backend 2>/dev/null || true
    
    # Backup obecnej bazy (na wszelki wypadek)
    log_info "Tworzenie bezpieczeństwa kopii obecnej bazy..."
    local safety_backup="/tmp/db_safety_$(date +%Y%m%d_%H%M%S).sql"
    sudo -u postgres pg_dump "$DB_NAME" > "$safety_backup" 2>/dev/null || true
    log_info "Bezpieczeństwa kopia: $safety_backup"
    
    # Drop i create bazy
    log_info "Usuwanie i tworzenie bazy danych..."
    sudo -u postgres psql -c "DROP DATABASE IF EXISTS $DB_NAME;"
    sudo -u postgres psql -c "CREATE DATABASE $DB_NAME;"
    
    # Restore
    log_info "Przywracanie bazy z backupu..."
    gunzip -c "$db_backup" | sudo -u postgres psql -d "$DB_NAME"
    
    log "✓ Baza danych przywrócona pomyślnie"
    
    # Restart aplikacji
    log_info "Uruchamianie aplikacji..."
    pm2 start ecosystem.config.js 2>/dev/null || true
    
    log "✓ Aplikacja uruchomiona"
}

# ============================================
# RESTORE PLIKÓW
# ============================================

restore_backend() {
    log_info "Przywracanie plików backendu..."
    
    local backend_backup=$(find "$SELECTED_BACKUP/files" -name "backend_*.tar.gz" | sort -r | head -1)
    
    if [ -z "$backend_backup" ]; then
        log_warning "Nie znaleziono backupu backendu!"
        return 1
    fi
    
    echo ""
    log_warning "⚠️  UWAGA! To nadpisze pliki backendu!"
    echo -n "Czy na pewno chcesz kontynuować? (tak/nie): "
    read confirm
    
    if [ "$confirm" != "tak" ]; then
        log "Anulowano przywracanie backendu."
        return 0
    fi
    
    # Backup obecnych plików
    log_info "Tworzenie kopii bezpieczeństwa obecnych plików..."
    tar -czf "/tmp/backend_safety_$(date +%Y%m%d_%H%M%S).tar.gz" -C "$APP_DIR" backend/
    
    # Restore
    log_info "Przywracanie plików z backupu..."
    tar -xzf "$backend_backup" -C "$APP_DIR"
    
    log "✓ Backend przywrócony pomyślnie"
}

restore_frontend() {
    log_info "Przywracanie plików frontendu..."
    
    local frontend_backup=$(find "$SELECTED_BACKUP/files" -name "frontend_*.tar.gz" | sort -r | head -1)
    
    if [ -z "$frontend_backup" ]; then
        log_warning "Nie znaleziono backupu frontendu!"
        return 1
    fi
    
    echo ""
    log_warning "⚠️  UWAGA! To nadpisze pliki frontendu!"
    echo -n "Czy na pewno chcesz kontynuować? (tak/nie): "
    read confirm
    
    if [ "$confirm" != "tak" ]; then
        log "Anulowano przywracanie frontendu."
        return 0
    fi
    
    # Backup obecnych plików
    log_info "Tworzenie kopii bezpieczeństwa obecnych plików..."
    tar -czf "/tmp/frontend_safety_$(date +%Y%m%d_%H%M%S).tar.gz" -C "$APP_DIR" frontend/
    
    # Restore
    log_info "Przywracanie plików z backupu..."
    tar -xzf "$frontend_backup" -C "$APP_DIR"
    
    log "✓ Frontend przywrócony pomyślnie"
}

restore_env_files() {
    log_info "Przywracanie plików .env..."
    
    local env_backup=$(find "$SELECTED_BACKUP/files" -name "env_*.tar.gz" | sort -r | head -1)
    
    if [ -z "$env_backup" ]; then
        log_warning "Nie znaleziono backupu plików .env!"
        return 1
    fi
    
    echo ""
    log_warning "⚠️  UWAGA! To nadpisze pliki .env!"
    echo -n "Czy na pewno chcesz kontynuować? (tak/nie): "
    read confirm
    
    if [ "$confirm" != "tak" ]; then
        log "Anulowano przywracanie plików .env."
        return 0
    fi
    
    # Restore
    log_info "Przywracanie plików z backupu..."
    tar -xzf "$env_backup" -C "$APP_DIR"
    
    log "✓ Pliki .env przywrócone pomyślnie"
}

# ============================================
# MENU GŁÓWNE
# ============================================

show_menu() {
    echo ""
    echo "========================================"
    echo "   CO CHCESZ PRZYWRÓCIĆ?"
    echo "========================================"
    echo "1) Wszystko (baza + pliki)"
    echo "2) Tylko baza danych"
    echo "3) Tylko pliki backendu"
    echo "4) Tylko pliki frontendu"
    echo "5) Tylko pliki .env"
    echo "6) Zobacz raport backupu"
    echo "q) Wyjście"
    echo "========================================"
    echo -n "Wybierz opcję: "
}

# ============================================
# GŁÓWNA FUNKCJA
# ============================================

main() {
    echo ""
    echo "========================================"
    echo "   MATURAPOLSKI RESTORE SCRIPT"
    echo "========================================"
    echo ""
    
    # Sprawdź czy jesteś rootem lub ubuntu
    if [ "$EUID" -ne 0 ] && [ "$(whoami)" != "ubuntu" ]; then 
        log_warning "Uruchom jako ubuntu lub root"
    fi
    
    # Wybierz backup
    select_backup
    
    # Menu
    while true; do
        show_menu
        read choice
        
        case $choice in
            1)
                log "Przywracanie wszystkiego..."
                restore_database
                restore_backend
                restore_frontend
                restore_env_files
                log "✓✓✓ RESTORE ZAKOŃCZONY ✓✓✓"
                break
                ;;
            2)
                restore_database
                break
                ;;
            3)
                restore_backend
                break
                ;;
            4)
                restore_frontend
                break
                ;;
            5)
                restore_env_files
                break
                ;;
            6)
                if [ -f "$SELECTED_BACKUP/backup_report.txt" ]; then
                    cat "$SELECTED_BACKUP/backup_report.txt"
                else
                    log_warning "Raport nie jest dostępny"
                fi
                ;;
            q|Q)
                log "Wyjście..."
                exit 0
                ;;
            *)
                log_error "Nieprawidłowy wybór!"
                ;;
        esac
    done
}

# Uruchom
main "$@"