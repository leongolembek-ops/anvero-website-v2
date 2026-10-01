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

## Umsetzungsschritt 1 aus dem Audit

- `.gitignore` angelegt (u. a. `.env`, `node_modules`, `dist`; `.env.example` bleibt erhalten).
- Hero-CTA "Ablauf ansehen" fuehrt jetzt zu `#ablauf` statt zu `#produkt`.
- Kontraste: `slate-400` auf hellem Grund entfernt, neues Token `approve-700` fuer Gold-Icons,
  Mindestschriftgroesse 12 px (vorher 10-11 px). Tab-Beschriftungen der Vorschau erst ab 520 px.
- Produktvorschau: alle Schritte liegen in einer Grid-Zelle, Hoehe bleibt konstant. Auto-Rotation
  pausiert zusaetzlich bei Maus oder Tastaturfokus.
- Attrappen-Button "Pruefen und freigeben" ist jetzt eine reine Statusanzeige.
- Formular: Feldfehler pro Feld mit `aria-invalid` und `aria-describedby`, Fokus auf erstes
  fehlerhaftes Feld, Fokus auf Bestaetigung nach Erfolg, Eingaben getrimmt, `maxLength`.
- `focus:ring-brand-600/12` war keine gueltige Tailwind-3-Stufe, jetzt `/[.12]`.
- `public/robots.txt` und `public/sitemap.xml` angelegt (siehe Schritt 2 fuer die endgueltige Domain).

## Umsetzungsschritt 2: Domain, Rechtliches, Vercel

- **Domain:** Die einzige Website-URL ist `https://anvero.tech`. Sie steht fest in `index.html`
  (canonical, og:url, og:image, twitter:image), `public/robots.txt`, `public/sitemap.xml` und als
  Konstante `SITE_URL` in `src/siteConfig.js`. `info@anvero.de` ist die E-Mail-Adresse, keine Website-URL.
- **Seiten:** `/impressum` und `/datenschutz` (`src/pages/`). Footer und Header verlinken sie.
  Die Datenschutzerklaerung ist ein **Entwurf** und nicht rechtlich geprueft (interner Hinweis im Code).
  Offene Angaben: siehe `LEGAL-TODO.md`.
- **Stammdaten zentral:** `src/siteConfig.js` (Firmen- und Kontaktdaten, Calendly-Link).
- **Routing ohne Zusatzpaket:** `src/App.jsx` waehlt die Seite anhand des Pfads. `vercel.json` liefert
  `/impressum` und `/datenschutz` per Rewrite auf `index.html` aus, damit der Direktaufruf funktioniert.
  Unbekannte Pfade ergeben weiterhin einen echten 404.
- **Calendly (aktiviert):** Der Buchungslink `https://calendly.com/leongolembek` steht als Konstante
  `CALENDLY_URL` in `src/siteConfig.js`. Der Button "Online-Termin buchen" im Demo-Bereich ist aktiv und
  oeffnet die **externe Calendly-Seite in einem neuen Tab** (`target="_blank"`, `rel="noopener noreferrer"`).
  Calendly wird nicht eingebettet. Nur Links mit `https://calendly.com/` werden akzeptiert; bei einer
  ungueltigen URL faellt der Button auf eine deaktivierte Darstellung zurueck.
- **Formular (zusaetzlich zu Calendly):** Das Kontaktformular besteht weiter. Das **Formular-Backend ist
  noch nicht eingerichtet** (`VITE_FORM_ENDPOINT` ist nicht gesetzt). Im Produktions-Build meldet das Formular
  deshalb ehrlich, dass es nicht verfuegbar ist, und nennt die E-Mail-Adresse. Es wird nirgends behauptet,
  dass E-Mails versendet werden. Im Dev-Server wird der Erfolg nur simuliert.
- **Header, Footer, Icons, Buttons** liegen jetzt in `src/components/`.

## Rechtlicher Status

**Impressum (`src/pages/Impressum.jsx`) und Datenschutzerklaerung (`src/pages/Datenschutz.jsx`) sind
Entwuerfe.** Sie wurden nicht rechtlich geprueft und muessen vor dem Livegang fachkundig geprueft werden.
Die Datenschutzerklaerung enthaelt einen Abschnitt zu Calendly (Abschnitt 6), der bewusst nur ein
Grundgeruest ist: Anbieter, Rechtsgrundlage, Speicherdauer, Auftragsverarbeitung und Drittlandtransfer
muessen noch geprueft und ergaenzt werden. Die vollstaendige Liste steht in `LEGAL-TODO.md`.

## Vor dem Livegang zwingend

1. Formular-Backend einrichten: Dienst waehlen, `VITE_FORM_ENDPOINT` setzen und einmal echt testen
   (oder das Formular bewusst ausblenden). Solange das fehlt, erreicht das Formular niemanden.
2. `LEGAL-TODO.md` abarbeiten und Impressum sowie Datenschutzerklaerung (beide Entwuerfe, auch der
   Calendly-Abschnitt) rechtlich pruefen lassen.
3. favicon.svg, apple-touch-icon.png, og-image.png in /public ablegen. Sonst 404.
4. Einmal `npm install` und `npm run build` ausfuehren und die Seiten im Browser pruefen
   (der Code wurde ohne Build erstellt, weil auf dem Entwicklungsrechner kein Node vorhanden war).
   Dabei den Calendly-Button testen: neuer Tab, richtiger Link.
5. Vercel-Projekt, Domain `anvero.tech` und Weiterleitungen pruefen (siehe `LEGAL-TODO.md`, Abschnitt Technik).