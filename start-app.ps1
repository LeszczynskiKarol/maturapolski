# start-app.ps1
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "   MATURAPOLSKI - START APPLICATION  " -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan

# Redis - próbuj różne metody
Write-Host "`n[1/4] Starting Redis..." -ForegroundColor Yellow
$redisRunning = $false

# Sprawdź czy Redis już działa
try {
    $testConnection = New-Object System.Net.Sockets.TcpClient
    $testConnection.Connect("localhost", 6379)
    $testConnection.Close()
    Write-Host "✓ Redis already running" -ForegroundColor Green
    $redisRunning = $true
} catch {}

if (-not $redisRunning) {
    # Próba 1: WSL Redis
    try {
        wsl -e bash -c "redis-cli ping" 2>$null | Out-Null
        if ($?) {
            Write-Host "✓ Redis already running in WSL" -ForegroundColor Green
            $redisRunning = $true
        }
    } catch {}
    
    if (-not $redisRunning) {
        try {
            wsl -e bash -c "sudo service redis-server start" 2>$null
            Start-Sleep -Seconds 3
            wsl -e bash -c "redis-cli ping" 2>$null | Out-Null
            if ($?) {
                Write-Host "✓ Redis started in WSL" -ForegroundColor Green
                $redisRunning = $true
            }
        } catch {}
    }
}

# Próba 2: Windows Redis z D:\redis (twoja ścieżka)
if (-not $redisRunning) {
    Write-Host "Starting Windows Redis..." -ForegroundColor Yellow
    $redisPath = "D:\redis"
    
    if (Test-Path "$redisPath\redis-server.exe") {
        # Uruchom Redis w tle
        $redisProcess = Start-Process -FilePath "$redisPath\redis-server.exe" -WindowStyle Minimized -PassThru
        Write-Host "Redis process started (PID: $($redisProcess.Id))" -ForegroundColor Yellow
        
        # Poczekaj aż Redis się uruchomi
        $attempts = 0
        while ($attempts -lt 10 -and -not $redisRunning) {
            Start-Sleep -Seconds 1
            try {
                $testConnection = New-Object System.Net.Sockets.TcpClient
                $testConnection.Connect("localhost", 6379)
                $testConnection.Close()
                $redisRunning = $true
                Write-Host "✓ Windows Redis started successfully" -ForegroundColor Green
            } catch {
                $attempts++
            }
        }
        
        if (-not $redisRunning) {
            Write-Host "⚠ Redis started but connection test failed" -ForegroundColor Yellow
        }
        
        # Zapisz PID Redis do późniejszego zatrzymania
        $global:RedisProcess = $redisProcess
    } else {
        Write-Host "❌ Redis not found at $redisPath" -ForegroundColor Red
        Write-Host "Please check Redis installation path" -ForegroundColor Red
    }
}

# PostgreSQL
Write-Host "`n[2/4] Checking PostgreSQL..." -ForegroundColor Yellow
$pgService = Get-Service -Name "postgresql-x64-17" -ErrorAction SilentlyContinue
if ($pgService) {
    if ($pgService.Status -ne "Running") {
        Write-Host "Starting PostgreSQL service..." -ForegroundColor Yellow
        Start-Service "postgresql-x64-17"
        Start-Sleep -Seconds 3
    }
    Write-Host "✓ PostgreSQL is running" -ForegroundColor Green
} else {
    Write-Host "⚠ PostgreSQL service not found - make sure it's installed" -ForegroundColor Yellow
}

# Backend
Write-Host "`n[3/4] Starting Backend..." -ForegroundColor Yellow
$backend = Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd D:\maturapolski\backend; Write-Host 'Starting Backend...' -ForegroundColor Green; npm run dev" -PassThru
Start-Sleep -Seconds 5
Write-Host "✓ Backend starting on http://localhost:4000" -ForegroundColor Green

# Frontend
Write-Host "`n[4/4] Starting Frontend..." -ForegroundColor Yellow
$frontend = Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd D:\maturapolski\frontend; Write-Host 'Starting Frontend...' -ForegroundColor Blue; npm run dev" -PassThru
Start-Sleep -Seconds 5
Write-Host "✓ Frontend starting on http://localhost:3000" -ForegroundColor Green

# Summary
Write-Host "`n=====================================" -ForegroundColor Green
Write-Host "     APPLICATION STARTED!            " -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Green
Write-Host ""
Write-Host "🌐 Frontend:  http://localhost:3000" -ForegroundColor Cyan
Write-Host "🚀 Backend:   http://localhost:4000" -ForegroundColor Cyan
Write-Host "❤️  Health:    http://localhost:4000/health" -ForegroundColor Cyan
Write-Host "🔐 Login:     http://localhost:4000/api/auth/login" -ForegroundColor Cyan

if ($redisRunning) {
    Write-Host "📊 Redis:     localhost:6379 (running)" -ForegroundColor Green
} else {
    Write-Host "⚠️  Redis:     localhost:6379 (not available)" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Press Ctrl+C to stop all services" -ForegroundColor Yellow

# Wait for Ctrl+C
try {
    while($true) { Start-Sleep -Seconds 1 }
} finally {
    Write-Host "`nStopping services..." -ForegroundColor Red
    
    # Stop Backend and Frontend
    if ($backend -and !$backend.HasExited) {
        Stop-Process $backend.Id -Force -ErrorAction SilentlyContinue
        Write-Host "Backend stopped" -ForegroundColor Yellow
    }
    
    if ($frontend -and !$frontend.HasExited) {
        Stop-Process $frontend.Id -Force -ErrorAction SilentlyContinue
        Write-Host "Frontend stopped" -ForegroundColor Yellow
    }
    
    # Stop Redis if we started it
    if ($global:RedisProcess -and !$global:RedisProcess.HasExited) {
        Stop-Process $global:RedisProcess.Id -Force -ErrorAction SilentlyContinue
        Write-Host "Redis stopped" -ForegroundColor Yellow
    } else {
        # Próbuj zatrzymać wszystkie procesy Redis
        Get-Process -Name "redis-server" -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
    }
    
    Write-Host "All services stopped" -ForegroundColor Red
}