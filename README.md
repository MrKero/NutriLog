# NutriLog 🥗

**Ernährung, Verbrauch und Fortschritt tracken – direkt im Browser, ohne Konto, ohne Tracking.**
Alle Daten bleiben auf deinem Gerät.

👉 **App öffnen:** https://mrkero.github.io/NutriLog/

![Version](https://img.shields.io/badge/Version-2.19-0f766e) ![Offline](https://img.shields.io/badge/offline-nutzbar-16a34a) ![Sprachen](https://img.shields.io/badge/Sprachen-DE%20%C2%B7%20EN%20%C2%B7%20TR-5b4bdb) ![Datenschutz](https://img.shields.io/badge/Daten-nur%20lokal-e0566b)

NutriLog ist ein Kalorien- und Makro-Tracker im Stil bekannter Fitness-Apps – als einzelne Web-App, die man auf dem iPhone (oder jedem anderen Gerät) wie eine normale App auf den Home-Bildschirm legen kann. Es gibt keinen Server, keine Anmeldung und keine Werbung.

---

## Funktionen

### 📒 Tagebuch
- Frühstück, Mittagessen, Abendessen und Snacks mit Kalorien, Eiweiß, Kohlenhydraten, Fett, Zucker, Ballaststoffen und Salz
- Lebensmittel suchen, per **Barcode** scannen (Open Food Facts) oder die **Nährwerttabelle fotografieren** (Texterkennung im Browser)
- Schnelleintrag, Rezepte, gespeicherte Mahlzeiten und „Vortag kopieren“
- Wasser, Supplements mit eigener Serie, Tagesnotiz mit Schlaf und Energie
- Tageswechsel per Wischgeste

### 🔥 Verbrauch
- Grundumsatz, Alltag, Schritte, Arbeit, Sport (MET-Werte) und Verdauung
- Tagesprofile (z. B. „Arbeit + Training“) und ein Wochenplan
- Energiebilanz für jeden Tag

### 📈 Fortschritt
- Messungen für Gewicht, Körperfett, Muskelanteil und Umfänge, mit Diagrammen und Trend
- Körper-Kennzahlen: BMI, WHtR, WHR, FFMI, US-Navy-Körperfett und Broca
- Körpertyp-Karten für **BMI × Körperfett** und **FFMI × Körperfett**, jeweils mit Leiste, Gewichtstabelle und Verlauf
- „Echter Verbrauch“, berechnet aus Gewichtstrend und gegessenen Kalorien
- Wochenberichte mit Punktzahl

### 🎯 Ziele
- Kalorienziel mit wählbarem Tempo (abnehmen, halten oder aufbauen) und Makro-Verteilung
- Zielgewicht mit Prognose und ein Wunsch-Körperfett-Rechner
- Wählbare wissenschaftliche Formeln: Mifflin-St Jeor, Katch-McArdle, Cunningham, Harris-Benedict und WHO/FAO/UNU

### 🗓️ Übersicht
- Wochen- und Monatsansicht mit Kalender, Diagrammen und Tagesliste
- Notizen durchsuchen sowie Motivationssprüche und persönliche Fakten

### ✨ Sonstiges
- **16 Designs** (u. a. Glas-Designs mit Farbverläufen), jeweils hell und dunkel
- **3 Sprachen:** Deutsch, English und Türkçe
- Reiter frei anordnen und Bereiche ausblenden
- Töne, Animationen, Streaks mit Meilensteinen und ein paar versteckte Überraschungen 🥚
- 73 mitgelieferte Standard-Lebensmittel, die sich entfernen und wiederherstellen lassen
- Eingabeprüfung für alle Felder, damit unrealistische Werte gar nicht erst gespeichert werden

---

## Installation auf dem iPhone

1. https://mrkero.github.io/NutriLog/ in **Safari** öffnen.
2. Auf das Teilen-Symbol tippen und **„Zum Home-Bildschirm“** wählen.
3. Ab dann über das Icon starten. Die App läuft im Vollbild mit eigenem Icon und funktioniert auch offline.

Die App funktioniert genauso auf Android (Chrome → „Zum Startbildschirm hinzufügen“) und am Desktop.

> **Wichtig:** Die Home-Bildschirm-App hat einen eigenen Speicher, getrennt von Safari. Daten aus einer anderen Version überträgst du mit einem Backup: Einstellungen → „Backup sichern“ und in der neuen App „Backup importieren“.

---

## Datenschutz

- Alle Einträge werden **nur lokal** im Browser gespeichert (IndexedDB, notfalls localStorage).
- Es gibt kein Konto, keinen Server, keine Cookies und keine Analyse- oder Werbe-Tracker.
- Das Internet wird nur in zwei Fällen genutzt:
  - **Barcode-Suche:** Nur die Barcode-Nummer wird an Open Food Facts gesendet.
  - **Texterkennung:** Beim ersten Gebrauch werden die Programmbibliotheken und Sprachdaten von jsDelivr bzw. unpkg geladen.
- Fotos und Kamerabild werden ausschließlich im Browser verarbeitet.
- **Backups** (.json) und ein **CSV-Export** für Excel sind jederzeit möglich.

---

## Aufbau

| Datei | Zweck |
|---|---|
| `index.html` | Die komplette App (HTML, CSS und JavaScript in einer Datei) |
| `sw.js` | Service Worker für die Offline-Nutzung und Updates |
| `manifest.webmanifest` | Name, Icons und Vollbild für den Home-Bildschirm |
| `icons/` | App-Icons |
| `ANLEITUNG.md` | Ausführliche Anleitung für GitHub Pages und das iPhone |

Die App ist in reinem JavaScript ohne Framework und ohne Build-Schritt geschrieben. Ein Update geht so: `index.html` (und bei Bedarf `sw.js`) ersetzen. Beim nächsten Start mit Internet lädt die App die neue Version, und die Daten bleiben erhalten.

---

## Hinweis

Alle Berechnungen (Grundumsatz, Verbrauch, Makros und Prognosen) sind Schätzungen auf Basis wissenschaftlicher Formeln und können um 10–15 % abweichen. **NutriLog ersetzt keine ärztliche oder ernährungsfachliche Beratung.**

## Quellen & verwendete Projekte

- [Open Food Facts](https://world.openfoodfacts.org) – Produktdaten, Lizenz: ODbL 1.0
- [Tesseract.js](https://github.com/naptha/tesseract.js) – Texterkennung, Lizenz: Apache 2.0
- [ZXing (zxing-js)](https://github.com/zxing-js/library) – Barcode-Erkennung, Lizenz: Apache 2.0
- MET-Werte: 2024 Adult Compendium of Physical Activities
- Formeln: Mifflin-St Jeor (1990), Katch-McArdle, Cunningham (1980), Harris-Benedict revidiert (1984), WHO/FAO/UNU (1985), US-Navy (Hodgdon & Beckett 1984), FFMI (Kouri et al. 1995)

Die vollständige Liste mit Links steht in der App unter Einstellungen → Hinweise.

---

## English

**NutriLog** is a private calorie, macro and progress tracker that runs entirely in the browser. It works offline, needs no account and stores all data on your device only. It is available in German, English and Turkish. Open https://mrkero.github.io/NutriLog/ in Safari and choose “Add to Home Screen” to use it like a native app.

---

Made with ♥ by Kerem · 💬 Ideen oder Bugs? Gerne über die [Issues](../../issues) melden.
