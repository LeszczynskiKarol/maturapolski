# stop-app.ps1
Write-Host "Stopping MaturaPolski services..." -ForegroundColor Red

# Zabij procesy Node
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force
Get-Process tsx -ErrorAction SilentlyContinue | Stop-Process -Force

# Zatrzymaj Redis w WSL (opcjonalnie)
# wsl sudo service redis-server stop

Write-Host "All services stopped" -ForegroundColor Yellow