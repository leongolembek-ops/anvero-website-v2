# LEGAL-TODO: Offene Punkte vor dem Livegang

Stand: Oktober 2026. Das ist eine Arbeitsliste, keine Rechtsberatung. Impressum und Datenschutzerklaerung
sollten vor der Veroeffentlichung von einer fachkundigen Stelle (Rechtsanwalt, Datenschutzbeauftragte/r
oder Fachkraft fuer Datenschutz) geprueft werden.

## Aktueller Stand

- **Impressum und Datenschutzerklaerung sind Entwuerfe** und muessen vor dem Livegang rechtlich geprueft werden.
- **Calendly ist aktiviert.** Aktueller Link: `https://calendly.com/leongolembek` (Konstante `CALENDLY_URL`
  in `src/siteConfig.js`). Der Button "Online-Termin buchen" oeffnet die externe Calendly-Seite in einem
  neuen Tab (`target="_blank"`, `rel="noopener noreferrer"`). Calendly ist nicht in die Seite eingebettet.
- **Das Kontaktformular besteht zusaetzlich weiter.** Das **Formular-Backend ist noch nicht eingerichtet**
  (`VITE_FORM_ENDPOINT` nicht gesetzt). Bis dahin zeigt das Formular im Produktions-Build eine ehrliche
  Fehlermeldung mit Hinweis auf `info@anvero.de`.
- Die Datenschutzerklaerung enthaelt einen Calendly-Abschnitt (Abschnitt 6) als **Grundgeruest**. Die konkreten
  Angaben fehlen noch (siehe unten).

## Impressum (`src/pages/Impressum.jsx`)

Aufgefuehrt sind nur die bestaetigten Angaben: ANVERO (Einzelunternehmen), Inhaber Leon Raik Golembek,
Zeppelinstrasse 5, 25451 Quickborn, Deutschland, Telefon, E-Mail.

Zu klaeren:

- [ ] **USt-IdNr.:** Bisher "nicht vorhanden oder nicht angegeben". Falls eine vergeben ist (§ 27a UStG),
      muss sie ins Impressum. Falls keine vorhanden ist, bleibt der Eintrag weg.
- [ ] **Handelsregister:** Bisher "nicht vorhanden". Dann ist keine Angabe noetig.
- [ ] **Verantwortlich fuer Inhalte (§ 18 Abs. 2 MStV):** Nur relevant, sobald journalistisch-redaktionelle
      Inhalte erscheinen (z. B. Ratgeber). Dann Name und Anschrift ergaenzen. Pruefen lassen.
- [ ] **Verbraucherstreitbeilegung (§ 36 VSBG):** Ob und welche Aussage noetig ist, haengt davon ab, ob
      Verbraucher angesprochen werden. Die Seite richtet sich an Unternehmen. Pruefen lassen.
- [ ] **Berufs- oder erlaubnispflichtige Taetigkeit / Aufsichtsbehoerde:** Nur falls zutreffend.
- [ ] **Kleinunternehmerregelung:** Falls § 19 UStG genutzt wird, ist das fuer Angebote und Rechnungen
      relevant (nicht zwingend im Impressum). Mit Steuerberatung klaeren.
- [ ] Telefonnummer bestaetigen (`0152 31792983`, Link `tel:+4915231792983`).

## Datenschutzerklaerung (`src/pages/Datenschutz.jsx`), ENTWURF

Der Entwurf beschreibt nur, was sich aus dem Projektcode und Ihren Angaben belegen laesst.
Bewusst **nicht** enthalten, weil keine Fakten vorliegen:

- [ ] **Hosting-Anbieter:** Im Text steht nur "Hosting-Anbieter". Falls Vercel genutzt wird: Vertragsstatus,
      Auftragsverarbeitungsvertrag (AVV/DPA), Region und Umfang der Server-Logs klaeren und namentlich
      eintragen.
- [ ] **Drittlandtransfer** (z. B. USA bei US-Anbietern): Rechtsgrundlage (Angemessenheitsbeschluss/DPF,
      Standardvertragsklauseln) klaeren und aufnehmen.
- [ ] **Formular-Dienstleister:** Welcher Dienst nimmt die Formulardaten entgegen (z. B. eigener Endpoint,
      E-Mail-Weiterleitung, Formularanbieter)? Namentlich nennen, AVV abschliessen, Standort und Speicherort
      klaeren. **Das Formular erst aktivieren, wenn das geklaert ist.**
- [ ] **Speicherdauer:** Konkrete Fristen fuer Anfragen, E-Mails und Formulardaten festlegen und eintragen.
      Aktuell steht nur eine allgemeine Formulierung im Text.
- [ ] **Terminbuchung (Calendly), bereits aktiv, Abschnitt 6 ist nur ein Grundgeruest.** Der Entwurf sagt
      bisher nur: Klick oeffnet eine externe Calendly-Seite in neuem Tab, Calendly dient der Terminvereinbarung,
      je nach Buchung koennen Name, E-Mail-Adresse und Termininformationen verarbeitet werden. Noch zu pruefen
      und zu ergaenzen:
  - [ ] Anbieter: korrekte Bezeichnung des Vertragspartners (juristische Person, Anschrift) aus den
        Calendly-Vertragsunterlagen uebernehmen.
  - [ ] Zweck im Detail und **Rechtsgrundlage** (z. B. vorvertragliche Massnahmen oder berechtigtes Interesse).
  - [ ] **Speicherdauer:** bei uns (Kalender, Buchungsdaten) und bei Calendly.
  - [ ] **Auftragsverarbeitung:** Besteht ein AV-Vertrag, und ist er abgeschlossen? Rollenverteilung klaeren
        (Auftragsverarbeitung oder eigene Verantwortlichkeit von Calendly).
  - [ ] **Drittlandtransfer:** Werden Daten in Laender ausserhalb der EU/des EWR uebermittelt, und auf welcher
        Grundlage (Angemessenheitsbeschluss/DPF, Standardvertragsklauseln)?
  - [ ] Cookies/Technologien auf der Calendly-Seite: Pruefen und beschreiben, ob und welche gesetzt werden und
        ob dafuer eine Einwilligung noetig ist. (Die Aussage "keine Cookies" in Abschnitt 7 gilt nur fuer
        diese Website.)
  - [ ] Abschnitt 9 "Empfaenger" an Calendly anpassen, sobald die Angaben stehen.
  - [ ] Einstellungen im eigenen Calendly-Konto pruefen: welche Eingabefelder abgefragt werden (nur
        Erforderliches), Bestaetigungs- und Erinnerungs-E-Mails, Weiterleitungen, Integrationen, Aufbewahrung.
  - [ ] Pruefen, ob in der Terminbeschreibung bei Calendly auf die Datenschutzerklaerung verwiesen werden soll.
  - [ ] Fallback pruefen: Bei einer ungueltigen `CALENDLY_URL` wuerde der Button deaktiviert dargestellt.
- [ ] **E-Mail-Verarbeitung:** Wer betreibt das Postfach `info@anvero.de` (Anbieter)? Gegebenenfalls aufnehmen.
- [ ] **Aussagen im Entwurf gegen die Realitaet pruefen:**
  - "Keine Cookies, kein Tracking": gilt nach Stand des Codes. Vor dem Livegang bestaetigen, dass auf Vercel
    keine Analytics, Speed Insights oder aehnliche Dienste aktiviert sind.
  - Schriftart wird selbst ausgeliefert (kein Google Fonts): gilt nach Stand des Codes.
  - "Keine automatisierte Entscheidungsfindung auf der Website": gilt fuer die Website. Fuer das Produkt
    ANVERO selbst (Kundendaten, Postfachzugriff) wird eine **eigene** Datenschutz- und AV-Dokumentation benoetigt.
- [ ] **Aufsichtsbehoerde:** Zustaendigkeit (Schleswig-Holstein) und Bezeichnung der Behoerde bestaetigen lassen.
- [ ] **Datenschutzbeauftragte/r:** Voraussichtlich nicht benennungspflichtig, bitte bestaetigen lassen.
- [ ] Cookie-/Einwilligungsbanner: Nach Stand des Codes nicht noetig. Entfaellt, solange keine Dienste ergaenzt werden.
- [ ] Datum "Stand" bei jeder inhaltlichen Aenderung aktualisieren.

## Formular und Texte auf der Startseite

- [ ] Die Aussage zur Antwortzeit wurde entfernt. Nur wieder aufnehmen, wenn sie eingehalten wird.
- [ ] **Formular-Backend fehlt.** Calendly und Formular bestehen nebeneinander. Das Formular ist bis zur
      Einrichtung (`VITE_FORM_ENDPOINT`) nicht funktionsfaehig und darf nicht als funktionierend beworben
      werden. Alternativ das Formular bis dahin ausblenden.
- [ ] Der Text am Calendly-Button ("Online-Termin buchen") und der Hinweis "Sie erreichen uns auch direkt"
      sind neutral formuliert. Keine Zusagen zu Antwort- oder Terminfristen ergaenzen, die nicht eingehalten werden.
- [ ] Der Satz am Formular ("Wir verwenden Ihre Angaben, um Ihre Anfrage zu bearbeiten ...") ist bewusst
      schlicht gehalten. Pruefen lassen, ob er ausreicht.
- [ ] Produktaussagen auf der Seite ("Keine erfundenen Preise", "Kein Versand ohne Freigabe", "Jeder Schritt
      nachvollziehbar") muessen dem tatsaechlichen Produkt entsprechen (Wettbewerbsrecht, UWG).
- [ ] Beispieldaten in der Produktvorschau (z. B. "Mueller Immobilien", "Angebot 1048") sind erfundene
      Demo-Daten und als "Beispielansicht mit Demo-Daten" gekennzeichnet. Das beibehalten.

## Technik (Vercel und Betrieb)

- [ ] Vercel-Projekt anlegen/verbinden. Framework "Vite", Build `npm run build`, Output `dist`
      (steht bereits in `vercel.json`).
- [ ] Domain `anvero.tech` im Vercel-Projekt hinzufuegen und DNS wie angezeigt setzen (A-Record bzw. CNAME).
- [ ] Entscheiden: `anvero.tech` oder `www.anvero.tech` als Hauptadresse. Die andere Variante in Vercel als
      Weiterleitung (308) auf die Hauptadresse einrichten. Im Projekt ist ueberall `https://anvero.tech` gesetzt.
- [ ] Alte Domains (`anvero.de`, `www.anvero.de`): Falls sie als Website geplant waren, bewusst
      weiterleiten oder abschalten. Als Website-URL wird sie im Projekt nirgends verwendet.
- [ ] HTTPS und Zertifikat: Vercel stellt sie automatisch aus. Nach dem Livegang kontrollieren.
- [ ] Umgebungsvariable `VITE_FORM_ENDPOINT` in Vercel (Production) setzen, **sobald** der Dienst feststeht.
      Hinweis: Werte mit Praefix `VITE_` sind im Browser sichtbar. Keine Geheimnisse dort ablegen.
- [ ] Spam-Schutz fuer das Formular auf Server-/Anbieterseite (Honeypot allein genuegt nicht).
- [ ] Nach dem Deployment testen: `/`, `/impressum`, `/datenschutz` direkt aufrufen und neu laden,
      `/robots.txt`, `/sitemap.xml`, unbekannte URL (muss 404 liefern), Header (z. B. mit
      securityheaders.com).
- [ ] Content-Security-Policy: Noch nicht gesetzt. Erst nach einem Test mit dem echten Build einfuehren
      (Inline-Style im Hero, spaeter Formular-Endpoint und Calendly beachten).
- [ ] Google Search Console und Bing Webmaster Tools: Domain verifizieren, Sitemap `https://anvero.tech/sitemap.xml` einreichen.
- [ ] `public/favicon.svg`, `public/apple-touch-icon.png`, `public/og-image.png` bereitstellen.
- [ ] Prerendering einplanen: Impressum und Datenschutz werden aktuell erst im Browser per JavaScript
      aufgebaut (Titel und Canonical werden dort gesetzt). Fuer Crawler ohne JavaScript und
      fuer Link-Vorschauen waere statisches HTML besser.
