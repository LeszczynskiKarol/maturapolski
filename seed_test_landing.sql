-- seed_test_landing.sql
SET client_encoding TO 'UTF8';

INSERT INTO "TestLanding" (id, slug, work, title, author, epoch, "isRequired", "isPublished", "createdAt", "updatedAt")
VALUES
  (gen_random_uuid(), 'antygona', 'Antygona', 'Antygona', 'Sofokles', 'ANTIQUITY', true, true, NOW(), NOW()),
  (gen_random_uuid(), 'dziady-cz-iii', 'Dziady cz. III', 'Dziady cz. III', 'Adam Mickiewicz', 'ROMANTICISM', true, true, NOW(), NOW()),
  (gen_random_uuid(), 'krol-edyp', E'Kr\u00F3l Edyp', E'Kr\u00F3l Edyp', 'Sofokles', 'ANTIQUITY', true, true, NOW(), NOW()),
  (gen_random_uuid(), 'lalka', 'Lalka', 'Lalka', E'Boles\u0142aw Prus', 'POSITIVISM', true, true, NOW(), NOW()),
  (gen_random_uuid(), 'makbet', 'Makbet', 'Makbet', 'William Shakespeare', 'RENAISSANCE', true, true, NOW(), NOW()),
  (gen_random_uuid(), 'pan-tadeusz', 'Pan Tadeusz', 'Pan Tadeusz', 'Adam Mickiewicz', 'ROMANTICISM', true, true, NOW(), NOW()),
  (gen_random_uuid(), 'przedwiosnie', E'Przedwio\u015Bnie', E'Przedwio\u015Bnie', E'Stefan \u017Beromski', 'INTERWAR', true, true, NOW(), NOW()),
  (gen_random_uuid(), 'zbrodnia-i-kara', 'Zbrodnia i kara', 'Zbrodnia i kara', 'Fiodor Dostojewski', 'POSITIVISM', true, true, NOW(), NOW()),
  (gen_random_uuid(), 'ludzie-bezdomni', 'Ludzie bezdomni', 'Ludzie bezdomni', E'Stefan \u017Beromski', 'YOUNG_POLAND', true, true, NOW(), NOW()),
  (gen_random_uuid(), 'nad-niemnem', 'Nad Niemnem', 'Nad Niemnem', 'Eliza Orzeszkowa', 'POSITIVISM', true, true, NOW(), NOW()),
  (gen_random_uuid(), 'sklepy-cynamonowe', 'Sklepy cynamonowe', 'Sklepy cynamonowe', 'Bruno Schulz', 'INTERWAR', false, true, NOW(), NOW()),
  (gen_random_uuid(), 'konrad-wallenrod', 'Konrad Wallenrod', 'Konrad Wallenrod', 'Adam Mickiewicz', 'ROMANTICISM', true, true, NOW(), NOW());