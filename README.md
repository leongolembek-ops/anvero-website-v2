# ANVERO Website v2

Ueberarbeitete Fassung. Stack unveraendert: Vite + React 19 + Tailwind 3.

## Starten

Abhaengigkeiten installieren, dann den Dev-Server starten (Standard-Vite-Skripte
"dev", "build", "preview" sind in package.json hinterlegt).

## Behobene Defekte aus v1

- Demo-Formular hatte nur e.preventDefault(), keinen Endpoint, keine Rueckmeldung.
  Jetzt: idle / loading / success / error, aria-live, Honeypot.
  ACHTUNG: Endpoint muss noch eingetragen werden, siehe unten.
- Icon "sparkle" war nicht definiert, daher leerer Kasten im Kontrollblock. Behoben.
- Navigationsluecke 640-1024 px (weder Menue noch Hamburger sichtbar): sm:hidden -> lg:hidden.
- Keine Open-Graph-/Twitter-Tags, kein Favicon. In index.html ergaenzt.
- Fonts per @import in einem React-style-Tag. Jetzt preconnect plus link im head.
- tailwind.config.js war leer, ca. 20 hartkodierte Gruentoene.
  Jetzt Design-Tokens brand.* und approve.*.
- Globales style-Tag im React-Baum, jetzt src/index.css mit @layer components.
- Impressum und Datenschutz waren href="#". Jetzt /impressum und /datenschutz.
  Die Seiten muessen noch angelegt werden.
- Kontrast text-slate-400 und Schrift bis 9 px, jetzt slate-500/600 und min. 11 px.
- Auto-Rotation 3,8 s ohne Pause, jetzt 6,5 s plus Pause-Button (WCAG 2.2.2).
- Hero-Texte waren doppelt fuer Mobile und Desktop gepflegt. Jetzt eine Quelle.
- Toter Code entfernt: CONFIG.brand, CONFIG.claim, ungenutzte Props.

## Design- und Textaenderungen

- Gold als semantisches System: Petrol = die Software arbeitet,
  Gold = ein Mensch muss entscheiden. Durchgezogen in Mockup, Timeline, Kontrolle.
- Hero: Badge nennt die Zielgruppe. H1 "Keine unvollstaendige Anfrage bleibt liegen."
  CTA mit Aufwandssignal. Trust-Zeile direkt unter dem CTA statt erst in Sektion 4.
- Mockup startet auf dem Schritt mit der goldmarkierten fehlenden Angabe.
  Erkannte Daten, offene Angabe und gesperrter Versand ohne Klick sichtbar.
- Rhythmus: Nutzen typografisch, Ablauf als vertikale Timeline,
  Einrichtung als horizontale Timeline, Branche als Listenraster.
- Kontrollsektion mit den fuenf Garantien aus der Kampagnendatei.
- FAQ in der Form, in der Kunden die Fragen stellen.

## Noch offen - bewusst nicht ausgefuellt

1. Formular-Endpoint in src/App.jsx, Funktion Demo, markierter Kommentar.
   Bis dahin simuliert das Formular nur den Erfolgsfall.
2. Datenschutz-FAQ enthaelt einen sichtbaren Platzhalter. Hosting-Standort,
   AV-Vertrag, Speicherdauer und Umfang des Postfachzugriffs sind Fakten,
   die ich nicht kenne. Eine erfundene Antwort waere hier schaedlicher als keine.
3. Impressum und Datenschutzerklaerung als Seiten anlegen.
4. Domain und OG-Bild in index.html, siehe favicon-hinweis.txt.
5. Prerendering: weiterhin Client-Side-SPA, HTML-Response enthaelt keinen Text.
   Fuer SEO waere vite-react-ssg oder Next.js der naechste Schritt.
6. Vertrauensbeweise fehlen weiterhin komplett. Groesste Conversion-Luecke.

## Offene Produktentscheidungen

- Rueckfragen automatisch versenden oder erst nach Freigabe?
  Dieser Entwurf setzt durchgaengig Freigabe vor Versand.
- Ist ANVERO produktiv oder in Pilotphase? Texte formulieren im Produkt-Praesens.

## Review v2.1 (technische Korrekturen, Design und Texte unveraendert)

- Formular: Endpoint jetzt ueber `.env` (`VITE_FORM_ENDPOINT`, siehe `.env.example`).
  Ohne Endpoint zeigt der Produktions-Build eine Fehlermeldung statt eines
  vorgetaeuschten Erfolgs. Vorher waeren live alle Anfragen still verloren gegangen.
  Im Dev-Server wird der Erfolg weiterhin simuliert. Zusaetzlich E-Mail-Formatpruefung.
- Fonts selbst gehostet ueber `@fontsource/inter` (nur Latin-Subset).
  Google Fonts entfernt, das war ein DSGVO-Risiko (LG Muenchen I, 3 O 17493/20).
- Ueberschriften nutzen `font-black` (900), geladen war nur bis 800. Der Browser hat
  die Fettung kuenstlich erzeugt. Inter 900 wird jetzt echt geladen.
- DM Sans wurde geladen, aber nirgends verwendet. Entfernt.
- Design-Tokens: `tailwind.config.js` definierte brand/approve, App.jsx nutzte aber
  ueberall Hex-Werte. Jetzt durchgaengig Tokens. Pixelvergleich: identisch.
- Produktvorschau-Tabs hatten unter 420 px keinen zugaenglichen Namen. Jetzt
  aria-label, tabpanel-Verknuepfung und Pfeiltasten-Navigation.
- Hero-Trust-Zeile: Trennstrich stand beim Umbruch am Zeilenanfang. Trennstriche entfernt.
- Anker-Spruenge landeten unter dem Sticky-Header. `scroll-padding-top` ergaenzt.
- FAQ: aria-controls zeigte auf nicht existierende Elemente. Behoben.
- Formular-Label "(optional)" brach in eine eigene Zeile. Behoben.

## Vor dem Livegang zwingend

1. `VITE_FORM_ENDPOINT` setzen und einmal echt testen.
2. Impressum und Datenschutzerklaerung anlegen. Impressumspflicht nach § 5 DDG.
3. Datenschutz-FAQ: der sichtbare Platzhaltertext steht noch auf der Seite.
4. favicon.svg, apple-touch-icon.png, og-image.png in /public ablegen. Sonst 404.
5. Domain in index.html pruefen.
