import json
import sys
from collections import Counter

with open("exercises_export.json", encoding="utf-8") as f:
    data = json.load(f)

exercises = data.get("exercises", data) if isinstance(data, dict) else data
print(f"LACZNIE: {len(exercises)} pytan\n")

print("== TYPY ==")
for t, c in Counter(e.get("type", "?") for e in exercises).most_common():
    print(f"  {t:20s} {c}")

print("\n== KATEGORIE ==")
for t, c in Counter(e.get("category", "?") for e in exercises).most_common():
    print(f"  {t:25s} {c}")

print("\n== EPOKI ==")
for t, c in sorted(Counter(e.get("epoch") or "BRAK" for e in exercises).items(), key=lambda x: -x[1]):
    print(f"  {t:20s} {c}")

print("\n== TOP 25 DZIEL ==")
for t, c in Counter(e.get("work") or None for e in exercises).most_common(26):
    if t:
        print(f"  {c:3d}  {t}")

print("\n== TRUDNOSC ==")
for d in range(1, 6):
    c = sum(1 for e in exercises if e.get("difficulty") == d)
    bar = "#" * (c // 2)
    print(f"  {d}: {c:4d}  {bar}")

closed = [e for e in exercises if e.get("type", "").startswith("CLOSED")]
no_expl = [e for e in closed if not (e.get("metadata") or {}).get("explanation")]
no_ans = [e for e in closed if e.get("correctAnswer") is None]
orphans = [e for e in exercises if not e.get("epoch") and not e.get("work")]
no_tags = [e for e in exercises if not e.get("tags")]
dupes = {q: c for q, c in Counter(e.get("question", "") for e in exercises).items() if c > 1}

print("\n== PROBLEMY ==")
print(f"  Zamkniete bez wyjasnienia: {len(no_expl)}/{len(closed)}")
print(f"  Zamkniete bez odpowiedzi:  {len(no_ans)}")
print(f"  Bez epoki i dziela:        {len(orphans)}")
print(f"  Bez tagow:                 {len(no_tags)}")
print(f"  Duplikaty pytan:           {len(dupes)}")

print("\n== MACIERZ EPOKA x TYP ==")
epoch_order = [
    "ANTIQUITY", "MIDDLE_AGES", "RENAISSANCE", "BAROQUE", "ENLIGHTENMENT",
    "ROMANTICISM", "POSITIVISM", "YOUNG_POLAND", "INTERWAR", "CONTEMPORARY", "BRAK",
]
print(f'  {"EPOKA":20s} CS   CM   SA   SN   ES   TOTAL')
for ep in epoch_order:
    exs = [e for e in exercises if (e.get("epoch") or "BRAK") == ep]
    if not exs:
        continue
    cs = sum(1 for e in exs if e.get("type") == "CLOSED_SINGLE")
    cm = sum(1 for e in exs if e.get("type") == "CLOSED_MULTIPLE")
    sa = sum(1 for e in exs if e.get("type") == "SHORT_ANSWER")
    sn = sum(1 for e in exs if e.get("type") == "SYNTHESIS_NOTE")
    es = sum(1 for e in exs if e.get("type") == "ESSAY")
    print(f"  {ep:20s} {cs:3d}  {cm:3d}  {sa:3d}  {sn:3d}  {es:3d}  {cs+cm+sa+sn+es:5d}")

print("\n== LEKTURY OBOWIAZKOWE ==")
required = [
    ("Antygona", "ANTIQUITY"),
    ("Krol Edyp", "ANTIQUITY"),
    ("Biblia", "ANTIQUITY"),
    ("Iliada", "ANTIQUITY"),
    ("Odyseja", "ANTIQUITY"),
    ("Bogurodzica", "MIDDLE_AGES"),
    ("Boska Komedia", "MIDDLE_AGES"),
    ("Piesn o Rolandzie", "MIDDLE_AGES"),
    ("Treny", "RENAISSANCE"),
    ("Odprawa poslow greckich", "RENAISSANCE"),
    ("Kazania sejmowe", "RENAISSANCE"),
    ("Pamietniki", "BAROQUE"),
    ("Kandyd", "ENLIGHTENMENT"),
    ("Powrot posla", "ENLIGHTENMENT"),
    ("Dziady", "ROMANTICISM"),
    ("Pan Tadeusz", "ROMANTICISM"),
    ("Konrad Wallenrod", "ROMANTICISM"),
    ("Kordian", "ROMANTICISM"),
    ("Nie-Boska Komedia", "ROMANTICISM"),
    ("Ballady i romanse", "ROMANTICISM"),
    ("Lalka", "POSITIVISM"),
    ("Nad Niemnem", "POSITIVISM"),
    ("Zbrodnia i kara", "POSITIVISM"),
    ("Gloria victis", "POSITIVISM"),
    ("Wesele", "YOUNG_POLAND"),
    ("Ludzie bezdomni", "YOUNG_POLAND"),
    ("Chlopi", "YOUNG_POLAND"),
    ("Ferdydurke", "INTERWAR"),
    ("Przedwiosnie", "INTERWAR"),
    ("Granica", "INTERWAR"),
    ("Sklepy cynamonowe", "INTERWAR"),
    ("Proces", "INTERWAR"),
    ("Dzuma", "CONTEMPORARY"),
    ("Tango", "CONTEMPORARY"),
    ("Inny swiat", "CONTEMPORARY"),
    ("Medaliony", "CONTEMPORARY"),
    ("Poczatek", "CONTEMPORARY"),
    ("Lord Jim", "CONTEMPORARY"),
    ("Zdazyc przed Panem Bogiem", "CONTEMPORARY"),
]

for title, epoch in required:
    c = sum(
        1
        for e in exercises
        if title.lower() in (e.get("work") or "").lower()
        or title.lower() in e.get("question", "").lower()
        or any(title.lower() in t.lower() for t in (e.get("tags") or []))
    )
    if c == 0:
        mark = "!!! BRAK"
    elif c < 5:
        mark = "!  MALO "
    elif c < 10:
        mark = "~  OK   "
    else:
        mark = "   DOBRZE"
    print(f"  [{mark}] {c:3d}  {title:40s} [{epoch}]")