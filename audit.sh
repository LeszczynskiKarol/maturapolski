#!/bin/bash
# ============================================================
# AUDYT PYTAŃ - MaturaPolski.pl
# Diagnostyka przez API + szybkie komendy
# ============================================================
#
# UŻYCIE:
# 1. Ustaw zmienne poniżej
# 2. chmod +x audit.sh && ./audit.sh
# 3. Albo kopiuj poszczególne komendy
# ============================================================

# ─── KONFIGURACJA ─────────────────────────────────────────
API_URL="https://www.maturapolski.pl"  # Zmień na swój URL
# Pobierz token admina (zaloguj się normalnie albo wstaw ręcznie):
TOKEN="TWOJ_JWT_TOKEN"

AUTH="Authorization: Bearer $TOKEN"
CT="Content-Type: application/json"

echo "═══════════════════════════════════════"
echo "AUDYT PYTAŃ - MaturaPolski.pl"
echo "═══════════════════════════════════════"
echo ""


# ─── 1. EKSPORT WSZYSTKICH PYTAŃ DO PLIKU ─────────────────
echo "▶ 1. Eksport wszystkich pytań..."
curl -s -H "$AUTH" -H "$CT" \
  "$API_URL/api/admin/exercises?limit=999999" \
  | python3 -m json.tool > exercises_export.json 2>/dev/null \
  || curl -s -H "$AUTH" -H "$CT" \
    "$API_URL/api/admin/exercises?limit=999999" > exercises_export.json

TOTAL=$(cat exercises_export.json | python3 -c "
import json, sys
data = json.load(sys.stdin)
exercises = data.get('exercises', data) if isinstance(data, dict) else data
print(len(exercises))
" 2>/dev/null || echo "?")

echo "   Wyeksportowano: $TOTAL pytań → exercises_export.json"
echo ""


# ─── 2. SZYBKA ANALIZA PLIKU JSON (Python one-liner) ──────
echo "▶ 2. Analiza rozkładów z JSON..."
python3 << 'PYEOF'
import json
from collections import Counter, defaultdict

try:
    with open("exercises_export.json") as f:
        data = json.load(f)
    
    exercises = data.get("exercises", data) if isinstance(data, dict) else data
    
    if not isinstance(exercises, list):
        print("  ❌ Nieoczekiwany format danych")
        exit()

    print(f"\n  ŁĄCZNIE: {len(exercises)} pytań\n")
    
    # --- Rozkład typów ---
    types = Counter(e.get("type", "?") for e in exercises)
    print("  ── TYPY ──")
    for t, c in types.most_common():
        pct = 100 * c / len(exercises)
        print(f"    {t:20s} {c:4d}  ({pct:.1f}%)")
    
    # --- Rozkład kategorii ---
    cats = Counter(e.get("category", "?") for e in exercises)
    print("\n  ── KATEGORIE ──")
    for c, n in cats.most_common():
        pct = 100 * n / len(exercises)
        print(f"    {c:25s} {n:4d}  ({pct:.1f}%)")
    
    # --- Rozkład epok ---
    epochs = Counter(e.get("epoch") or "BRAK_EPOKI" for e in exercises)
    epoch_order = [
        "ANTIQUITY", "MIDDLE_AGES", "RENAISSANCE", "BAROQUE",
        "ENLIGHTENMENT", "ROMANTICISM", "POSITIVISM",
        "YOUNG_POLAND", "INTERWAR", "CONTEMPORARY", "BRAK_EPOKI"
    ]
    print("\n  ── EPOKI ──")
    for ep in epoch_order:
        c = epochs.get(ep, 0)
        if c > 0 or ep != "BRAK_EPOKI":
            bar = "█" * (c // 2)
            print(f"    {ep:20s} {c:4d}  {bar}")
    
    # --- Rozkład dzieł ---
    works = Counter(e.get("work") or None for e in exercises)
    works_real = {k: v for k, v in works.items() if k is not None}
    print(f"\n  ── DZIEŁA (top 20 z {len(works_real)} unikalnych) ──")
    for w, c in Counter(works_real).most_common(20):
        epoch = next((e.get("epoch","?") for e in exercises if e.get("work") == w), "?")
        print(f"    {c:3d}  {w:40s}  [{epoch}]")
    
    # --- Rozkład trudności ---
    diffs = Counter(e.get("difficulty", 0) for e in exercises)
    print("\n  ── TRUDNOŚĆ ──")
    for d in sorted(diffs.keys()):
        c = diffs[d]
        bar = "█" * (c // 2)
        print(f"    {d}: {c:4d}  {bar}")

    # --- PROBLEMY ---
    print("\n  ═══ PROBLEMY / RAKI ═══\n")
    
    # Bez epoki i dzieła
    orphans = [e for e in exercises if not e.get("epoch") and not e.get("work")]
    print(f"  ❌ Bez epoki I bez dzieła:      {len(orphans):4d}  ({100*len(orphans)/len(exercises):.1f}%)")
    
    # Zamknięte bez wyjaśnienia
    closed = [e for e in exercises if e.get("type","").startswith("CLOSED")]
    no_expl = [e for e in closed if not (e.get("metadata") or {}).get("explanation")]
    print(f"  ❌ Zamknięte bez wyjaśnienia:   {len(no_expl):4d}  z {len(closed)} zamkniętych ({100*len(no_expl)/max(len(closed),1):.1f}%)")
    
    # Zamknięte bez correctAnswer
    no_answer = [e for e in closed if e.get("correctAnswer") is None]
    print(f"  ❌ Zamknięte bez odpowiedzi:    {len(no_answer):4d}")
    
    # Bez tagów
    no_tags = [e for e in exercises if not e.get("tags")]
    print(f"  ⚠️  Bez tagów:                  {len(no_tags):4d}  ({100*len(no_tags)/len(exercises):.1f}%)")
    
    # Krótkie pytania
    short_q = [e for e in exercises if len(e.get("question","")) < 25]
    print(f"  ⚠️  Krótkie pytania (<25 zn.):  {len(short_q):4d}")
    
    # Duplikaty
    questions = [e.get("question","") for e in exercises]
    dupes = {q: c for q, c in Counter(questions).items() if c > 1}
    print(f"  ⚠️  Zduplikowane pytania:        {len(dupes):4d}")
    
    # Zamknięte z < 3 opcjami
    few_opts = [e for e in closed 
                if len((e.get("content") or {}).get("options", [])) < 3]
    print(f"  ⚠️  Zamknięte z <3 opcjami:     {len(few_opts):4d}")
    
    # --- LEKTURY OBOWIĄZKOWE ---
    print("\n  ═══ POKRYCIE LEKTUR OBOWIĄZKOWYCH ═══\n")
    
    required = [
        ("Antygona", "ANTIQUITY"), ("Król Edyp", "ANTIQUITY"), ("Iliada", "ANTIQUITY"),
        ("Odyseja", "ANTIQUITY"), ("Biblia", "ANTIQUITY"),
        ("Bogurodzica", "MIDDLE_AGES"), ("Boska Komedia", "MIDDLE_AGES"),
        ("Pieśń o Rolandzie", "MIDDLE_AGES"),
        ("Treny", "RENAISSANCE"), ("Pieśni", "RENAISSANCE"),
        ("Odprawa posłów greckich", "RENAISSANCE"),
        ("Kazania sejmowe", "RENAISSANCE"),
        ("Pamiętniki", "BAROQUE"),
        ("Kandyd", "ENLIGHTENMENT"), ("Powrót posła", "ENLIGHTENMENT"),
        ("Dziady", "ROMANTICISM"), ("Pan Tadeusz", "ROMANTICISM"),
        ("Konrad Wallenrod", "ROMANTICISM"), ("Kordian", "ROMANTICISM"),
        ("Nie-Boska Komedia", "ROMANTICISM"), ("Ballady i romanse", "ROMANTICISM"),
        ("Beniowski", "ROMANTICISM"),
        ("Lalka", "POSITIVISM"), ("Nad Niemnem", "POSITIVISM"),
        ("Zbrodnia i kara", "POSITIVISM"), ("Gloria victis", "POSITIVISM"),
        ("Wesele", "YOUNG_POLAND"), ("Ludzie bezdomni", "YOUNG_POLAND"),
        ("Chłopi", "YOUNG_POLAND"),
        ("Ferdydurke", "INTERWAR"), ("Przedwiośnie", "INTERWAR"),
        ("Granica", "INTERWAR"), ("Sklepy cynamonowe", "INTERWAR"),
        ("Proces", "INTERWAR"),
        ("Dżuma", "CONTEMPORARY"), ("Tango", "CONTEMPORARY"),
        ("Inny świat", "CONTEMPORARY"), ("Medaliony", "CONTEMPORARY"),
        ("Początek", "CONTEMPORARY"), ("Lord Jim", "CONTEMPORARY"),
        ("Zdążyć przed Panem Bogiem", "CONTEMPORARY"),
    ]
    
    for title, epoch in required:
        # Szukaj po polu work (exact lub substring) + w pytaniu + w tagach
        count = sum(1 for e in exercises 
                   if (e.get("work") or "").lower().find(title.lower()) >= 0
                   or title.lower() in e.get("question","").lower()
                   or any(title.lower() in t.lower() for t in (e.get("tags") or [])))
        
        if count == 0:
            status = "❌ BRAK"
        elif count < 5:
            status = f"⚠️  {count:2d} pyt."
        elif count < 10:
            status = f"🔶 {count:2d} pyt."
        else:
            status = f"✅ {count:2d} pyt."
        
        print(f"    {status}  {title:40s}  [{epoch}]")
    
    # --- REKOMENDACJE ---
    print("\n  ═══ REKOMENDACJE ═══\n")
    
    # Znajdź lektury z 0 pytań
    missing = [title for title, epoch in required 
               if sum(1 for e in exercises 
                     if (e.get("work") or "").lower().find(title.lower()) >= 0
                     or title.lower() in e.get("question","").lower()) == 0]
    
    if missing:
        print(f"  🔴 PRIORYTET 1: Dodaj pytania do {len(missing)} lektur bez pokrycia:")
        for m in missing:
            print(f"     → {m}")
    
    # Epoki z < 10 pytań
    weak_epochs = [(ep, c) for ep, c in epochs.items() 
                   if ep != "BRAK_EPOKI" and c < 10]
    if weak_epochs:
        print(f"\n  🔴 PRIORYTET 2: Wzmocnij epoki z < 10 pytań:")
        for ep, c in sorted(weak_epochs, key=lambda x: x[1]):
            print(f"     → {ep}: {c} pytań")
    
    # Brak ESSAY
    essay_epochs = {e.get("epoch") for e in exercises if e.get("type") == "ESSAY"}
    no_essay = [ep for ep in epoch_order[:-1] if ep not in essay_epochs and epochs.get(ep, 0) > 0]
    if no_essay:
        print(f"\n  🟡 PRIORYTET 3: Brak wypracowań dla epok: {', '.join(no_essay)}")
    
    # Za dużo łatwych
    easy_pct = 100 * (diffs.get(1,0) + diffs.get(2,0)) / len(exercises)
    hard_pct = 100 * (diffs.get(4,0) + diffs.get(5,0)) / len(exercises)
    if easy_pct > 50:
        print(f"\n  🟡 PRIORYTET 4: {easy_pct:.0f}% pytań jest łatwych (diff 1-2). Dodaj trudniejsze.")
    if hard_pct < 15:
        print(f"\n  🟡 PRIORYTET 4: Tylko {hard_pct:.0f}% pytań trudnych (diff 4-5). Maturzyści potrzebują więcej wyzwań.")

except FileNotFoundError:
    print("  ❌ Brak pliku exercises_export.json — najpierw uruchom eksport (krok 1)")
except json.JSONDecodeError as e:
    print(f"  ❌ Błąd parsowania JSON: {e}")

PYEOF

echo ""


# ─── 3. STATYSTYKI Z API ──────────────────────────────────
echo "▶ 3. Statystyki z API..."
echo "  /exercises/stats:"
curl -s -H "$AUTH" "$API_URL/api/admin/exercises/stats" | python3 -m json.tool 2>/dev/null
echo ""

echo "  /exercises/filters (metadane filtrów):"
curl -s -H "$AUTH" "$API_URL/api/admin/exercises/filters" | python3 -c "
import json, sys
data = json.load(sys.stdin)
print(f\"  Epoki:     {len(data.get('epochs',[]))} unikalnych\")
print(f\"  Dzieła:    {len(data.get('works',[]))} unikalnych\")
print(f\"  Tagi:      {len(data.get('tags',[]))} unikalnych\")
print(f\"  Kategorie: {len(data.get('categories',[]))} unikalnych\")
print(f\"  Typy:      {len(data.get('types',[]))} unikalnych\")
" 2>/dev/null
echo ""


# ─── 4. DIAGNOZA BEZPOŚREDNIO Z BAZY (psql) ──────────────
echo "▶ 4. Komendy psql do uruchomienia na serwerze:"
echo ""
echo "  # Połącz się z bazą:"
echo '  psql $DATABASE_URL'
echo ""
echo "  # Lub odpal cały audyt:"
echo '  psql $DATABASE_URL -f audit.sql'
echo ""
echo "  # Lub poszczególne komendy (kopiuj z audit.sql)"
echo ""


# ─── 5. EKSPORT PROBLEMATYCZNYCH PYTAŃ ────────────────────
echo "▶ 5. Eksport problematycznych pytań..."
python3 << 'PYEOF'
import json

try:
    with open("exercises_export.json") as f:
        data = json.load(f)
    
    exercises = data.get("exercises", data) if isinstance(data, dict) else data
    
    problems = []
    
    for e in exercises:
        issues = []
        
        if not e.get("epoch") and not e.get("work"):
            issues.append("brak_epoki_i_dziela")
        
        if e.get("type","").startswith("CLOSED"):
            if not (e.get("metadata") or {}).get("explanation"):
                issues.append("brak_wyjasnienia")
            if e.get("correctAnswer") is None:
                issues.append("brak_odpowiedzi")
            opts = (e.get("content") or {}).get("options", [])
            if len(opts) < 3:
                issues.append("za_malo_opcji")
            if len(set(opts)) < len(opts):
                issues.append("zduplikowane_opcje")
        
        if not e.get("tags"):
            issues.append("brak_tagow")
        
        if len(e.get("question","")) < 25:
            issues.append("krotkie_pytanie")
        
        if issues:
            problems.append({
                "id": e.get("id"),
                "question": e.get("question","")[:80],
                "type": e.get("type"),
                "epoch": e.get("epoch"),
                "work": e.get("work"),
                "issues": issues
            })
    
    with open("problems_report.json", "w", encoding="utf-8") as f:
        json.dump(problems, f, ensure_ascii=False, indent=2)
    
    print(f"  Zapisano {len(problems)} problematycznych pytań → problems_report.json")
    
    # Podsumowanie issues
    from collections import Counter
    all_issues = Counter()
    for p in problems:
        for i in p["issues"]:
            all_issues[i] += 1
    
    print("\n  Rozkład problemów:")
    for issue, count in all_issues.most_common():
        print(f"    {issue:30s} {count:4d}")

except Exception as ex:
    print(f"  ❌ Błąd: {ex}")

PYEOF

echo ""
echo "═══════════════════════════════════════"
echo "GOTOWE. Pliki wyjściowe:"
echo "  → exercises_export.json    (pełen eksport)"
echo "  → problems_report.json     (problematyczne pytania)"
echo "  → audit.sql                (komendy SQL do psql)"
echo "═══════════════════════════════════════"
