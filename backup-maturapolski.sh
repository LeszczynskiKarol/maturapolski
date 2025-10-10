#!/bin/bash

# ============================================
# MATURAPOLSKI BACKUP SCRIPT
# ============================================
# Tworzy backup bazy PostgreSQL i plików aplikacji
# Autor: Automatyczny backup system
# Data: 2025-10-09
# ============================================

set -euo pipefail  # Exit on error, undefined variables, and pipe failures

# ============================================
# KONFIGURACJA
# ============================================

# Ścieżki
APP_DIR="/var/www/maturapolski"
BACKUP_BASE_DIR="/var/backups/maturapolski"
LOG_DIR="/var/log/maturapolski-backup"

# Baza danych - ZMIEŃ HASŁO!
DB_NAME="maturapolski"
DB_USER="postgres"
DB_PASSWORD="HASLO"  # ⚠️ ZMIEŃ TO NA PRAWDZIWE HASŁO
DB_HOST="localhost"
DB_PORT="5432"

# Retencja (ile dni trzymać backupy)
RETENTION_DAYS=7

# Znacznik czasu
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
DATE_FOLDER=$(date +"%Y-%m-%d")

# Katalogi backupów
BACKUP_DIR="${BACKUP_BASE_DIR}/${DATE_FOLDER}"
DB_BACKUP_DIR="${BACKUP_DIR}/database"
FILES_BACKUP_DIR="${BACKUP_DIR}/files"

# Pliki backupowe
DB_BACKUP_FILE="${DB_BACKUP_DIR}/db_${TIMESTAMP}.sql.gz"
BACKEND_BACKUP_FILE="${FILES_BACKUP_DIR}/backend_${TIMESTAMP}.tar.gz"
FRONTEND_BACKUP_FILE="${FILES_BACKUP_DIR}/frontend_${TIMESTAMP}.tar.gz"
ENV_BACKUP_FILE="${FILES_BACKUP_DIR}/env_${TIMESTAMP}.tar.gz"

# Kolory dla outputu
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# ============================================
# FUNKCJE POMOCNICZE
# ============================================

log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1" | tee -a "${LOG_DIR}/backup.log"
}

log_error() {
    echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')] ERROR:${NC} $1" | tee -a "${LOG_DIR}/backup.log" >&2
}

log_warning() {
    echo -e "${YELLOW}[$(date +'%Y-%m-%d %H:%M:%S')] WARNING:${NC} $1" | tee -a "${LOG_DIR}/backup.log"
}

log_info() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')] INFO:${NC} $1" | tee -a "${LOG_DIR}/backup.log"
}

check_dependencies() {
    log_info "Sprawdzanie zależności..."
    
    local missing_deps=()
    
    if ! command -v pg_dump &> /dev/null; then
        missing_deps+=("postgresql-client")
    fi
    
    if ! command -v gzip &> /dev/null; then
        missing_deps+=("gzip")
    fi
    
    if ! command -v tar &> /dev/null; then
        missing_deps+=("tar")
    fi
    
    if [ ${#missing_deps[@]} -ne 0 ]; then
        log_error "Brakujące zależności: ${missing_deps[*]}"
        log_info "Zainstaluj je: sudo apt-get install ${missing_deps[*]}"
        exit 1
    fi
    
    log "✓ Wszystkie zależności są dostępne"
}

create_directories() {
    log_info "Tworzenie katalogów backupowych..."
    
    mkdir -p "${DB_BACKUP_DIR}"
    mkdir -p "${FILES_BACKUP_DIR}"
    mkdir -p "${LOG_DIR}"
    
    log "✓ Katalogi utworzone"
}

# ============================================
# BACKUP BAZY DANYCH
# ============================================

backup_database() {
    log_info "Rozpoczynam backup bazy danych: ${DB_NAME}"
    
    export PGPASSWORD="${DB_PASSWORD}"
    
    if pg_dump -h "${DB_HOST}" -p "${DB_PORT}" -U "${DB_USER}" -d "${DB_NAME}" \
        --format=plain \
        --no-owner \
        --no-acl \
        --verbose 2>&1 | gzip > "${DB_BACKUP_FILE}"; then
        
        local size=$(du -h "${DB_BACKUP_FILE}" | cut -f1)
        log "✓ Backup bazy danych zakończony pomyślnie"
        log "  Plik: ${DB_BACKUP_FILE}"
        log "  Rozmiar: ${size}"
    else
        log_error "Backup bazy danych nie powiódł się!"
        unset PGPASSWORD
        exit 1
    fi
    
    unset PGPASSWORD
}

# ============================================
# BACKUP PLIKÓW
# ============================================

backup_backend() {
    log_info "Rozpoczynam backup backendu..."
    
    if [ ! -d "${APP_DIR}/backend" ]; then
        log_warning "Katalog backend nie istnieje: ${APP_DIR}/backend"
        return 1
    fi
    
    # Wykluczamy node_modules, dist (można odbudować), i logi
    tar -czf "${BACKEND_BACKUP_FILE}" \
        -C "${APP_DIR}" \
        --exclude='backend/node_modules' \
        --exclude='backend/dist' \
        --exclude='backend/.env' \
        backend/ 2>&1 | grep -v "Removing leading"
    
    local size=$(du -h "${BACKEND_BACKUP_FILE}" | cut -f1)
    log "✓ Backup backendu zakończony pomyślnie"
    log "  Plik: ${BACKEND_BACKUP_FILE}"
    log "  Rozmiar: ${size}"
}

backup_frontend() {
    log_info "Rozpoczynam backup frontendu..."
    
    if [ ! -d "${APP_DIR}/frontend" ]; then
        log_warning "Katalog frontend nie istnieje: ${APP_DIR}/frontend"
        return 1
    fi
    
    # Wykluczamy node_modules i dist (można odbudować)
    tar -czf "${FRONTEND_BACKUP_FILE}" \
        -C "${APP_DIR}" \
        --exclude='frontend/node_modules' \
        --exclude='frontend/dist' \
        frontend/ 2>&1 | grep -v "Removing leading"
    
    local size=$(du -h "${FRONTEND_BACKUP_FILE}" | cut -f1)
    log "✓ Backup frontendu zakończony pomyślnie"
    log "  Plik: ${FRONTEND_BACKUP_FILE}"
    log "  Rozmiar: ${size}"
}

backup_env_files() {
    log_info "Rozpoczynam backup plików .env..."
    
    # Zbieramy wszystkie pliki .env
    tar -czf "${ENV_BACKUP_FILE}" \
        -C "${APP_DIR}" \
        --ignore-failed-read \
        backend/.env \
        .env.example \
        deployment-config.env \
        2>&1 | grep -v "Removing leading" || true
    
    if [ -f "${ENV_BACKUP_FILE}" ]; then
        local size=$(du -h "${ENV_BACKUP_FILE}" | cut -f1)
        log "✓ Backup plików .env zakończony pomyślnie"
        log "  Plik: ${ENV_BACKUP_FILE}"
        log "  Rozmiar: ${size}"
        
        # Zabezpieczamy wrażliwe dane
        chmod 600 "${ENV_BACKUP_FILE}"
    else
        log_warning "Nie znaleziono plików .env do backupu"
    fi
}

# ============================================
# CZYSZCZENIE STARYCH BACKUPÓW
# ============================================

cleanup_old_backups() {
    log_info "Usuwam backupy starsze niż ${RETENTION_DAYS} dni..."
    
    local deleted_count=0
    
    # Znajdujemy i usuwamy stare foldery
    while IFS= read -r -d '' old_dir; do
        if [ -d "$old_dir" ]; then
            log_info "Usuwam: $old_dir"
            rm -rf "$old_dir"
            ((deleted_count++))
        fi
    done < <(find "${BACKUP_BASE_DIR}" -maxdepth 1 -type d -mtime +${RETENTION_DAYS} -print0 2>/dev/null)
    
    if [ $deleted_count -gt 0 ]; then
        log "✓ Usunięto ${deleted_count} starych backupów"
    else
        log "✓ Brak starych backupów do usunięcia"
    fi
}

# ============================================
# GENEROWANIE RAPORTU
# ============================================

generate_report() {
    local report_file="${BACKUP_DIR}/backup_report.txt"
    
    log_info "Generowanie raportu backupu..."
    
    {
        echo "========================================"
        echo "RAPORT BACKUPU MATURAPOLSKI"
        echo "========================================"
        echo "Data: $(date +'%Y-%m-%d %H:%M:%S')"
        echo "Serwer: $(hostname)"
        echo ""
        echo "SZCZEGÓŁY BACKUPU:"
        echo "========================================"
        
        if [ -f "${DB_BACKUP_FILE}" ]; then
            echo "✓ Baza danych:"
            echo "  - Plik: $(basename ${DB_BACKUP_FILE})"
            echo "  - Rozmiar: $(du -h ${DB_BACKUP_FILE} | cut -f1)"
            echo "  - MD5: $(md5sum ${DB_BACKUP_FILE} | cut -d' ' -f1)"
        fi
        
        if [ -f "${BACKEND_BACKUP_FILE}" ]; then
            echo "✓ Backend:"
            echo "  - Plik: $(basename ${BACKEND_BACKUP_FILE})"
            echo "  - Rozmiar: $(du -h ${BACKEND_BACKUP_FILE} | cut -f1)"
            echo "  - MD5: $(md5sum ${BACKEND_BACKUP_FILE} | cut -d' ' -f1)"
        fi
        
        if [ -f "${FRONTEND_BACKUP_FILE}" ]; then
            echo "✓ Frontend:"
            echo "  - Plik: $(basename ${FRONTEND_BACKUP_FILE})"
            echo "  - Rozmiar: $(du -h ${FRONTEND_BACKUP_FILE} | cut -f1)"
            echo "  - MD5: $(md5sum ${FRONTEND_BACKUP_FILE} | cut -d' ' -f1)"
        fi
        
        if [ -f "${ENV_BACKUP_FILE}" ]; then
            echo "✓ Pliki .env:"
            echo "  - Plik: $(basename ${ENV_BACKUP_FILE})"
            echo "  - Rozmiar: $(du -h ${ENV_BACKUP_FILE} | cut -f1)"
        fi
        
        echo ""
        echo "CAŁKOWITY ROZMIAR:"
        echo "$(du -sh ${BACKUP_DIR} | cut -f1)"
        echo ""
        echo "LOKALIZACJA:"
        echo "${BACKUP_DIR}"
        echo "========================================"
    } > "${report_file}"
    
    cat "${report_file}" | tee -a "${LOG_DIR}/backup.log"
    
    log "✓ Raport zapisany w: ${report_file}"
}

# ============================================
# GŁÓWNA FUNKCJA
# ============================================

main() {
    echo ""
    echo "========================================"
    echo "   MATURAPOLSKI BACKUP SCRIPT"
    echo "========================================"
    echo ""
    
    local start_time=$(date +%s)
    
    # Sprawdzenie zależności
    check_dependencies
    
    # Utworzenie katalogów
    create_directories
    
    # Wykonanie backupów
    log "Rozpoczynam proces backupu..."
    echo ""
    
    backup_database
    echo ""
    
    backup_backend
    echo ""
    
    backup_frontend
    echo ""
    
    backup_env_files
    echo ""
    
    # Czyszczenie starych backupów
    cleanup_old_backups
    echo ""
    
    # Generowanie raportu
    generate_report
    echo ""
    
    local end_time=$(date +%s)
    local duration=$((end_time - start_time))
    
    log "✓✓✓ BACKUP ZAKOŃCZONY POMYŚLNIE ✓✓✓"
    log "Czas trwania: ${duration} sekund"
    log "Lokalizacja: ${BACKUP_DIR}"
    echo ""
    echo "========================================"
}

# ============================================
# URUCHOMIENIE
# ============================================

# Trap errors
trap 'log_error "Backup przerwany z powodu błędu na linii $LINENO"' ERR

# Uruchom główną funkcję
main "$@"

exit 0