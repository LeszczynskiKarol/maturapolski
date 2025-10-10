#!/bin/bash

# ============================================
# MATURAPOLSKI BACKUP MONITOR & S3 SYNC
# ============================================
# Monitoruje backupy i opcjonalnie synchronizuje do S3
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
LOG_DIR="/var/log/maturapolski-backup"

# S3 Configuration (opcjonalne - odkomentuj jeśli używasz)
# S3_BUCKET="s3://twoj-bucket-name/backups/maturapolski"
# AWS_PROFILE="default"  # lub twój profil AWS

# ============================================
# FUNKCJE
# ============================================

log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

log_error() {
    echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')] ERROR:${NC} $1"
}

log_info() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')] INFO:${NC} $1"
}

# ============================================
# STATUS BACKUPÓW
# ============================================

show_backup_status() {
    echo ""
    echo "========================================"
    echo "   STATUS BACKUPÓW MATURAPOLSKI"
    echo "========================================"
    echo ""
    
    # Sprawdź czy katalog istnieje
    if [ ! -d "$BACKUP_BASE_DIR" ]; then
        log_error "Katalog backupów nie istnieje: $BACKUP_BASE_DIR"
        return 1
    fi
    
    # Ostatni backup
    local last_backup=$(find "$BACKUP_BASE_DIR" -maxdepth 1 -type d -name "20*" | sort -r | head -1)
    
    if [ -z "$last_backup" ]; then
        log_error "Nie znaleziono żadnych backupów!"
        return 1
    fi
    
    echo "📅 OSTATNI BACKUP:"
    echo "   Data: $(basename $last_backup)"
    echo "   Lokalizacja: $last_backup"
    echo "   Rozmiar: $(du -sh $last_backup | cut -f1)"
    
    # Sprawdź zawartość
    local db_count=$(find "$last_backup/database" -name "db_*.sql.gz" 2>/dev/null | wc -l)
    local backend_count=$(find "$last_backup/files" -name "backend_*.tar.gz" 2>/dev/null | wc -l)
    local frontend_count=$(find "$last_backup/files" -name "frontend_*.tar.gz" 2>/dev/null | wc -l)
    local env_count=$(find "$last_backup/files" -name "env_*.tar.gz" 2>/dev/null | wc -l)
    
    echo ""
    echo "📦 ZAWARTOŚĆ:"
    echo "   Baza danych: $db_count $([ $db_count -gt 0 ] && echo '✓' || echo '✗')"
    echo "   Backend: $backend_count $([ $backend_count -gt 0 ] && echo '✓' || echo '✗')"
    echo "   Frontend: $frontend_count $([ $frontend_count -gt 0 ] && echo '✓' || echo '✗')"
    echo "   Pliki .env: $env_count $([ $env_count -gt 0 ] && echo '✓' || echo '✗')"
    
    # Statystyki
    echo ""
    echo "📊 STATYSTYKI:"
    local total_backups=$(find "$BACKUP_BASE_DIR" -maxdepth 1 -type d -name "20*" | wc -l)
    local total_size=$(du -sh "$BACKUP_BASE_DIR" | cut -f1)
    local oldest_backup=$(find "$BACKUP_BASE_DIR" -maxdepth 1 -type d -name "20*" | sort | head -1)
    
    echo "   Wszystkie backupy: $total_backups"
    echo "   Łączny rozmiar: $total_size"
    
    if [ -n "$oldest_backup" ]; then
        echo "   Najstarszy backup: $(basename $oldest_backup)"
    fi
    
    # Ostatnie logi
    echo ""
    echo "📝 OSTATNIE LOGI:"
    if [ -f "$LOG_DIR/backup.log" ]; then
        echo "   Ostatnie 5 wpisów:"
        tail -5 "$LOG_DIR/backup.log" | sed 's/^/   /'
    else
        echo "   Brak logów"
    fi
    
    # Sprawdź miejsce na dysku
    echo ""
    echo "💾 MIEJSCE NA DYSKU:"
    df -h "$BACKUP_BASE_DIR" | tail -1 | awk '{print "   Użyte: " $3 " / " $2 " (" $5 ")"}'
    
    # Sprawdź czy są błędy w logach
    if [ -f "$LOG_DIR/backup.log" ]; then
        local error_count=$(grep -c "ERROR" "$LOG_DIR/backup.log" 2>/dev/null || echo "0")
        if [ "$error_count" -gt 0 ]; then
            echo ""
            echo "⚠️  UWAGA: Znaleziono $error_count błędów w logach!"
            echo "   Zobacz: cat $LOG_DIR/backup.log | grep ERROR"
        fi
    fi
    
    echo ""
    echo "========================================"
}

# ============================================
# LISTA WSZYSTKICH BACKUPÓW
# ============================================

list_all_backups() {
    echo ""
    echo "========================================"
    echo "   WSZYSTKIE BACKUPY"
    echo "========================================"
    echo ""
    
    local backup_dirs=($(find "$BACKUP_BASE_DIR" -maxdepth 1 -type d -name "20*" | sort -r))
    
    if [ ${#backup_dirs[@]} -eq 0 ]; then
        log_error "Nie znaleziono żadnych backupów!"
        return 1
    fi
    
    printf "%-15s %-10s %-8s %-8s %-8s\n" "DATA" "ROZMIAR" "DB" "BACKEND" "FRONTEND"
    echo "----------------------------------------------------------------"
    
    for dir in "${backup_dirs[@]}"; do
        local date=$(basename "$dir")
        local size=$(du -sh "$dir" 2>/dev/null | cut -f1)
        local db=$([ -f "$dir/database/db_"*.sql.gz ] && echo "✓" || echo "✗")
        local backend=$([ -f "$dir/files/backend_"*.tar.gz ] && echo "✓" || echo "✗")
        local frontend=$([ -f "$dir/files/frontend_"*.tar.gz ] && echo "✓" || echo "✗")
        
        printf "%-15s %-10s %-8s %-8s %-8s\n" "$date" "$size" "$db" "$backend" "$frontend"
    done
    
    echo ""
}

# ============================================
# SYNCHRONIZACJA DO S3 (OPCJONALNE)
# ============================================

sync_to_s3() {
    # Sprawdź czy S3_BUCKET jest ustawiony
    if [ -z "${S3_BUCKET:-}" ]; then
        log_error "S3_BUCKET nie jest skonfigurowany!"
        log_info "Edytuj skrypt i ustaw S3_BUCKET='s3://twoj-bucket/path'"
        return 1
    fi
    
    # Sprawdź czy AWS CLI jest zainstalowane
    if ! command -v aws &> /dev/null; then
        log_error "AWS CLI nie jest zainstalowane!"
        log_info "Zainstaluj: sudo apt-get install awscli"
        return 1
    fi
    
    log "Rozpoczynam synchronizację do S3..."
    log_info "Źródło: $BACKUP_BASE_DIR"
    log_info "Cel: $S3_BUCKET"
    
    # Synchronizuj do S3
    if aws s3 sync "$BACKUP_BASE_DIR" "$S3_BUCKET" \
        --exclude "*.log" \
        --storage-class STANDARD_IA \
        ${AWS_PROFILE:+--profile "$AWS_PROFILE"}; then
        log "✓ Synchronizacja do S3 zakończona pomyślnie"
        
        # Zapisz w logach
        echo "[$(date)] S3 sync completed successfully" >> "$LOG_DIR/s3-sync.log"
    else
        log_error "Synchronizacja do S3 nie powiodła się!"
        echo "[$(date)] S3 sync failed" >> "$LOG_DIR/s3-sync.log"
        return 1
    fi
}

# ============================================
# SPRAWDZENIE INTEGRALNOŚCI
# ============================================

verify_backup_integrity() {
    echo ""
    echo "========================================"
    echo "   WERYFIKACJA INTEGRALNOŚCI"
    echo "========================================"
    echo ""
    
    local last_backup=$(find "$BACKUP_BASE_DIR" -maxdepth 1 -type d -name "20*" | sort -r | head -1)
    
    if [ -z "$last_backup" ]; then
        log_error "Nie znaleziono backupów do weryfikacji!"
        return 1
    fi
    
    log "Weryfikuję backup: $(basename $last_backup)"
    echo ""
    
    # Sprawdź bazę danych
    local db_backup=$(find "$last_backup/database" -name "db_*.sql.gz" | head -1)
    if [ -n "$db_backup" ]; then
        log_info "Sprawdzam backup bazy danych..."
        if gunzip -t "$db_backup" 2>/dev/null; then
            echo "   ✓ Backup bazy danych jest prawidłowy"
        else
            echo "   ✗ Backup bazy danych jest uszkodzony!"
        fi
    fi
    
    # Sprawdź pliki
    for file in "$last_backup/files"/*.tar.gz; do
        if [ -f "$file" ]; then
            log_info "Sprawdzam: $(basename $file)"
            if tar -tzf "$file" > /dev/null 2>&1; then
                echo "   ✓ $(basename $file) jest prawidłowy"
            else
                echo "   ✗ $(basename $file) jest uszkodzony!"
            fi
        fi
    done
    
    echo ""
    log "✓ Weryfikacja zakończona"
    echo ""
}

# ============================================
# CZYSZCZENIE STARYCH BACKUPÓW (MANUAL)
# ============================================

cleanup_old_backups_manual() {
    echo ""
    echo "========================================"
    echo "   CZYSZCZENIE STARYCH BACKUPÓW"
    echo "========================================"
    echo ""
    
    echo -n "Podaj liczbę dni (backupy starsze niż X dni zostaną usunięte): "
    read days
    
    if ! [[ "$days" =~ ^[0-9]+$ ]]; then
        log_error "Nieprawidłowa liczba!"
        return 1
    fi
    
    echo ""
    log_info "Szukam backupów starszych niż $days dni..."
    
    local old_backups=($(find "$BACKUP_BASE_DIR" -maxdepth 1 -type d -name "20*" -mtime +$days))
    
    if [ ${#old_backups[@]} -eq 0 ]; then
        log "Nie znaleziono starych backupów do usunięcia"
        return 0
    fi
    
    echo ""
    echo "Znaleziono ${#old_backups[@]} starych backupów:"
    for backup in "${old_backups[@]}"; do
        echo "  - $(basename $backup) ($(du -sh $backup | cut -f1))"
    done
    
    echo ""
    echo -n "Czy na pewno chcesz usunąć te backupy? (tak/nie): "
    read confirm
    
    if [ "$confirm" != "tak" ]; then
        log "Anulowano"
        return 0
    fi
    
    for backup in "${old_backups[@]}"; do
        log_info "Usuwam: $(basename $backup)"
        rm -rf "$backup"
    done
    
    log "✓ Usunięto ${#old_backups[@]} starych backupów"
}

# ============================================
# MENU
# ============================================

show_menu() {
    echo ""
    echo "========================================"
    echo "   MATURAPOLSKI BACKUP MONITOR"
    echo "========================================"
    echo "1) Pokaż status backupów"
    echo "2) Lista wszystkich backupów"
    echo "3) Weryfikuj integralność ostatniego backupu"
    echo "4) Uruchom backup teraz"
    echo "5) Synchronizuj do S3 (jeśli skonfigurowane)"
    echo "6) Wyczyść stare backupy (manual)"
    echo "7) Zobacz pełne logi"
    echo "q) Wyjście"
    echo "========================================"
    echo -n "Wybierz opcję: "
}

# ============================================
# GŁÓWNA FUNKCJA
# ============================================

main() {
    # Jeśli podano argument, wykonaj akcję bezpośrednio
    if [ $# -gt 0 ]; then
        case $1 in
            status)
                show_backup_status
                ;;
            list)
                list_all_backups
                ;;
            verify)
                verify_backup_integrity
                ;;
            s3)
                sync_to_s3
                ;;
            *)
                echo "Użycie: $0 [status|list|verify|s3]"
                exit 1
                ;;
        esac
        exit 0
    fi
    
    # Interaktywne menu
    while true; do
        show_menu
        read choice
        
        case $choice in
            1)
                show_backup_status
                ;;
            2)
                list_all_backups
                ;;
            3)
                verify_backup_integrity
                ;;
            4)
                log "Uruchamiam backup..."
                /usr/local/bin/backup-maturapolski.sh
                ;;
            5)
                sync_to_s3
                ;;
            6)
                cleanup_old_backups_manual
                ;;
            7)
                if [ -f "$LOG_DIR/backup.log" ]; then
                    less "$LOG_DIR/backup.log"
                else
                    log_error "Brak pliku z logami"
                fi
                ;;
            q|Q)
                log "Do widzenia!"
                exit 0
                ;;
            *)
                log_error "Nieprawidłowy wybór!"
                ;;
        esac
        
        echo ""
        echo -n "Naciśnij ENTER aby kontynuować..."
        read
    done
}

# Uruchom
main "$@"