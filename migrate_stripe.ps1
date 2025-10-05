# Stripe Product Migration Script - NAPRAWIONY
# ==============================================

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  Stripe Migration - FIXED VERSION" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# Product 1: Pakiet Starter - 50 punktów AI
Write-Host "[1/7] Pakiet Starter - 50 punktow AI" -ForegroundColor Yellow
$prod1 = stripe products create --name "Pakiet Starter - 50 punktow AI" --description "50 punktow AI do jednorazowego wykorzystania" --type service | ConvertFrom-Json
Write-Host "  Produkt: $($prod1.id)" -ForegroundColor Green
$price1 = stripe prices create --product $prod1.id --currency pln --unit-amount 1900 | ConvertFrom-Json
Write-Host "  Cena: $($price1.id)" -ForegroundColor Green
Write-Host ""

# Product 2: Pakiet Standard - 150 punktów AI
Write-Host "[2/7] Pakiet Standard - 150 punktow AI" -ForegroundColor Yellow
$prod2 = stripe products create --name "Pakiet Standard - 150 punktow AI" --description "150 punktow AI do jednorazowego wykorzystania" --type service | ConvertFrom-Json
Write-Host "  Produkt: $($prod2.id)" -ForegroundColor Green
$price2 = stripe prices create --product $prod2.id --currency pln --unit-amount 4900 | ConvertFrom-Json
Write-Host "  Cena: $($price2.id)" -ForegroundColor Green
Write-Host ""

# Product 3: Pakiet Premium - 300 punktów AI
Write-Host "[3/7] Pakiet Premium - 300 punktow AI" -ForegroundColor Yellow
$prod3 = stripe products create --name "Pakiet Premium - 300 punktow AI" --description "300 punktow AI do jednorazowego wykorzystania" --type service | ConvertFrom-Json
Write-Host "  Produkt: $($prod3.id)" -ForegroundColor Green
$price3 = stripe prices create --product $prod3.id --currency pln --unit-amount 7900 | ConvertFrom-Json
Write-Host "  Cena: $($price3.id)" -ForegroundColor Green
Write-Host ""

# Product 4: MaturaAI Premium (RECURRING)
Write-Host "[4/7] MaturaAI Premium (subskrypcja)" -ForegroundColor Yellow
$prod4 = stripe products create --name "MaturaAI Premium" --description "Pelny dostep do MaturaAI z 300 punktami AI miesiecznie" --type service | ConvertFrom-Json
Write-Host "  Produkt: $($prod4.id)" -ForegroundColor Green
$price4 = stripe prices create --product $prod4.id --currency pln --unit-amount 4900 "-d" "recurring[interval]=month" | ConvertFrom-Json
Write-Host "  Cena (recurring): $($price4.id)" -ForegroundColor Green
Write-Host ""

# Product 5: Basic Plan
Write-Host "[5/7] Basic Plan" -ForegroundColor Yellow
$prod5 = stripe products create --name "Basic Plan" --type service "-d" "metadata[creditRate]=1.1" "-d" "metadata[monthlyCredits]=900" | ConvertFrom-Json
Write-Host "  Produkt: $($prod5.id)" -ForegroundColor Green
$price5 = stripe prices create --product $prod5.id --currency usd --unit-amount 999 "-d" "recurring[interval]=month" "-d" "metadata[creditRate]=1.1" "-d" "metadata[monthlyCredits]=900" | ConvertFrom-Json
Write-Host "  Cena (recurring): $($price5.id)" -ForegroundColor Green
Write-Host ""

# Product 6: Pro Plan
Write-Host "[6/7] Pro Plan" -ForegroundColor Yellow
$prod6 = stripe products create --name "Pro Plan" --type service "-d" "metadata[creditRate]=1.0" "-d" "metadata[monthlyCredits]=2000" | ConvertFrom-Json
Write-Host "  Produkt: $($prod6.id)" -ForegroundColor Green
$price6 = stripe prices create --product $prod6.id --currency usd --unit-amount 1999 "-d" "recurring[interval]=month" "-d" "metadata[creditRate]=1.0" "-d" "metadata[monthlyCredits]=2000" | ConvertFrom-Json
Write-Host "  Cena (recurring): $($price6.id)" -ForegroundColor Green
Write-Host ""

# Product 7: Premium Plan
Write-Host "[7/7] Premium Plan" -ForegroundColor Yellow
$prod7 = stripe products create --name "Premium Plan" --type service "-d" "metadata[creditRate]=0.95" "-d" "metadata[monthlyCredits]=3150" | ConvertFrom-Json
Write-Host "  Produkt: $($prod7.id)" -ForegroundColor Green
$price7 = stripe prices create --product $prod7.id --currency usd --unit-amount 2999 "-d" "recurring[interval]=month" "-d" "metadata[creditRate]=0.95" "-d" "metadata[monthlyCredits]=3150" | ConvertFrom-Json
Write-Host "  Cena (recurring): $($price7.id)" -ForegroundColor Green
Write-Host ""

# Summary
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  GOTOWE!" -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "MAPOWANIE PRODUKTOW:" -ForegroundColor Yellow
Write-Host "prod_T9j9kazbLM9GDI -> $($prod1.id)" -ForegroundColor White
Write-Host "prod_T9jAY1V8aIaoyZ -> $($prod2.id)" -ForegroundColor White
Write-Host "prod_T9jAoOg9OvCm4J -> $($prod3.id)" -ForegroundColor White
Write-Host "prod_T9j6KVzXnBxrwT -> $($prod4.id)" -ForegroundColor White
Write-Host "prod_R4oumvaO55tqSi -> $($prod5.id)" -ForegroundColor White
Write-Host "prod_R4ov204DolslMH -> $($prod6.id)" -ForegroundColor White
Write-Host "prod_R4ovSv51P7fa52 -> $($prod7.id)" -ForegroundColor White
Write-Host ""