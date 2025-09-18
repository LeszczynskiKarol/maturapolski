# start-app.ps1
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "   MATURAPOLSKI - START APPLICATION  " -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan

# Redis - próbuj różne metody
Write-Host "`n[1/4] Starting Redis..." -ForegroundColor Yellow
$redisRunning = $false

# Metoda 1: WSL Redis
try {
    wsl -e bash -c "redis-cli ping" 2>$null | Out-Null
    if ($?) {
        Write-Host "✓ Redis already running in WSL" -ForegroundColor Green
        $redisRunning = $true
    }
} catch {}

if (-not $redisRunning) {
    # Próbuj uruchomić w WSL (wymaga skonfigurowanego sudo NOPASSWD)
    wsl -e bash -c "sudo service redis-server start" 2>$null
    Start-Sleep -Seconds 2
    
    # Sprawdź czy działa
    try {
        wsl -e bash -c "redis-cli ping" 2>$null | Out-Null
        if ($?) {
            Write-Host "✓ Redis started in WSL" -ForegroundColor Green
            $redisRunning = $true
        }
    } catch {}
}

# Jeśli WSL nie działa, użyj Windows Redis
if (-not $redisRunning) {
    Write-Host "Starting Windows Redis as fallback..." -ForegroundColor Yellow
    $redisPath = "C:\Users\Admin\Desktop\Redis-8.2.1-Windows-x64-msys2\Redis-8.2.1-Windows-x64-msys2"
    if (Test-Path "$redisPath\redis-server.exe") {
        Start-Process -FilePath "$redisPath\redis-server.exe" -WindowStyle Hidden
        Start-Sleep -Seconds 2
        Write-Host "✓ Windows Redis started" -ForegroundColor Green
    } else {
        Write-Host "⚠ Redis not found - install it or start manually" -ForegroundColor Red
    }
}

# PostgreSQL
Write-Host "`n[2/4] Checking PostgreSQL..." -ForegroundColor Yellow
$pgService = Get-Service -Name "postgresql-x64-17" -ErrorAction SilentlyContinue
if ($pgService -and $pgService.Status -ne "Running") {
    Start-Service "postgresql-x64-17"
    Start-Sleep -Seconds 2
}
Write-Host "✓ PostgreSQL is running" -ForegroundColor Green

# Backend
Write-Host "`n[3/4] Starting Backend..." -ForegroundColor Yellow
$backend = Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd D:\maturapolski\backend; npm run dev" -PassThru
Start-Sleep -Seconds 5
Write-Host "✓ Backend starting on http://localhost:4000" -ForegroundColor Green

# Frontend
Write-Host "`n[4/4] Starting Frontend..." -ForegroundColor Yellow
$frontend = Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd D:\maturapolski\frontend; npm run dev" -PassThru
Start-Sleep -Seconds 5
Write-Host "✓ Frontend starting on http://localhost:3000" -ForegroundColor Green

# Summary
Write-Host "`n=====================================" -ForegroundColor Green
Write-Host "     APPLICATION STARTED!            " -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Green
Write-Host ""
Write-Host "Frontend:  http://localhost:3000" -ForegroundColor Cyan
Write-Host "Backend:   http://localhost:4000" -ForegroundColor Cyan
Write-Host "Health:    http://localhost:4000/health" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press Ctrl+C to stop all services" -ForegroundColor Yellow

# Wait for Ctrl+C
try {
    while($true) { Start-Sleep -Seconds 1 }
} finally {
    Write-Host "`nStopping services..." -ForegroundColor Red
    Stop-Process $backend.Id -Force -ErrorAction SilentlyContinue
    Stop-Process $frontend.Id -Force -ErrorAction SilentlyContinue
    # Stop Windows Redis if running
    Stop-Process -Name "redis-server" -Force -ErrorAction SilentlyContinue
    Write-Host "Services stopped" -ForegroundColor Red
}