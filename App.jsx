import { useState, useEffect, useRef } from "react";
import { Icon, Button, CalendlyButton } from "./components/ui";
import { Header, Footer } from "./components/Layout";
import { CONTACT } from "./siteConfig";
import Impressum from "./pages/Impressum";
import Datenschutz from "./pages/Datenschutz";

/* ── Produktvorschau ─────────────────────────────────────────────
   Änderung: Startzustand zeigt sofort alle drei Kernaussagen –
   erkannte Daten, fehlende Angabe, gesperrter Versand.            */

function Workspace() {
  const steps = [
    {
      key: "in", label: "Anfrage", icon: "mail", tone: "petrol",
      head: "Anfrage eingegangen",
      body: (
        <div>
          <p className="text-sm leading-6 text-slate-600">
            „Wir benötigen eine regelmäßige Reinigung für unser Bürogebäude in Hamburg.
            Die Fläche beträgt etwa 1.200 m², Reinigung dreimal wöchentlich …“
          </p>
          <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-500">
            <span className="rounded-md bg-slate-100 px-2 py-1 text-slate-600">Müller Immobilien</span>
            <span className="rounded-md bg-slate-100 px-2 py-1 text-slate-600">09:14 Uhr</span>
          </div>
        </div>
      ),
    },
    {
      key: "read", label: "Erkennung", icon: "search", tone: "petrol",
      head: "Angaben erkannt – eine fehlt",
      body: (
        <div>
          <div className="grid grid-cols-2 gap-2">
            {[["Objekt", "Bürogebäude"], ["Fläche", "1.200 m²"], ["Ort", "Hamburg"], ["Intervall", "3× wöchentlich"]].map(([k, v]) => (
              <div key={k} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
                <div className="flex items-center gap-1 text-xs uppercase tracking-wider text-slate-600">
                  <Icon name="check" size={11} className="text-brand-600" />{k}
                </div>
                <div className="mt-0.5 text-[12px] font-semibold text-slate-700">{v}</div>
              </div>
            ))}
          </div>
          <div className="mt-2 flex items-center gap-2 rounded-lg border border-approve-300 bg-approve-50 px-3 py-2.5">
            <Icon name="alert" size={15} className="shrink-0 text-approve-700" />
            <div>
              <div className="text-xs uppercase tracking-wider text-approve-800">Noch offen</div>
              <div className="text-[12px] font-bold text-approve-800">Gewünschte Reinigungszeiten</div>
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "ask", label: "Rückfrage", icon: "send", tone: "gold",
      head: "Rückfrage vorbereitet",
      body: (
        <div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
            <p className="text-[13px] leading-6 text-slate-700">
              „Welche Reinigungszeiten sind für Ihr Objekt gewünscht?“
            </p>
          </div>
          <div className="mt-2.5 flex items-center gap-2 rounded-lg border border-approve-300 bg-approve-50 px-3 py-2.5">
            <Icon name="lock" size={15} className="shrink-0 text-approve-700" />
            <span className="text-[12px] font-bold text-approve-800">Versand wartet auf Ihre Freigabe</span>
          </div>
        </div>
      ),
    },
    {
      key: "calc", label: "Kalkulation", icon: "settings", tone: "petrol",
      head: "Nach Ihren Regeln kalkuliert",
      body: (
        <div className="grid grid-cols-2 gap-2">
          {[["Fläche", "berücksichtigt"], ["Leistung", "zugeordnet"], ["Personal", "nach Regelsatz"], ["Material", "berücksichtigt"]].map(([k, v]) => (
            <div key={k} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
              <div className="text-xs uppercase tracking-wider text-slate-600">{k}</div>
              <div className="mt-0.5 text-[12px] font-semibold text-slate-700">{v}</div>
            </div>
          ))}
          <p className="col-span-2 text-xs leading-5 text-slate-500">
            Ausschließlich hinterlegte Preislogik. Keine geschätzten Werte.
          </p>
        </div>
      ),
    },
    {
      key: "draft", label: "Entwurf", icon: "file", tone: "gold",
      head: "Angebotsentwurf bereit",
      body: (
        <div>
          <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5">
            <span className="text-[12px] font-semibold text-slate-600">Angebot 1048 · Müller Immobilien</span>
            <span className="text-[12px] font-bold text-slate-800">vollständig</span>
          </div>
          {/* Bewusst kein Button: Die Vorschau ist eine Beispielansicht ohne Funktion. */}
          <div className="mt-2.5 flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border border-approve-300 bg-approve-50 px-3 text-[13px] font-bold text-approve-800">
            <Icon name="shield" size={15} />Wartet auf Prüfung und Freigabe
          </div>
        </div>
      ),
    },
  ];

  const [active, setActive] = useState(1);
  const [touched, setTouched] = useState(false);
  const [paused, setPaused] = useState(false);
  const [engaged, setEngaged] = useState(false); // Maus oder Tastaturfokus im Widget

  useEffect(() => {
    if (touched || paused || engaged) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setActive((s) => (s + 1) % steps.length), 6500);
    return () => clearInterval(t);
  }, [touched, paused, engaged]);

  const pick = (i) => { setTouched(true); setActive(i); };
  const onTabKey = (e) => {
    const dir = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const next = (active + dir + steps.length) % steps.length;
    pick(next);
    document.getElementById(`tab-${steps[next].key}`)?.focus();
  };
  const step = steps[active];

  return (
    <div id="produkt" className="relative mx-auto w-full max-w-[620px] scroll-mt-24"
      onPointerEnter={() => setEngaged(true)} onPointerLeave={() => setEngaged(false)}
      onFocus={() => setEngaged(true)} onBlur={() => setEngaged(false)}>
      <div className="absolute -inset-4 -z-10 rounded-[40px] bg-brand-200/40 blur-2xl" />
      <div className="overflow-hidden rounded-[22px] border border-slate-300/70 bg-white shadow-[0_28px_70px_rgba(23,48,46,.15)]">

        <div className="flex items-center justify-between gap-3 border-b border-slate-200 bg-offwhite px-4 py-3 sm:px-5">
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-[.14em] text-brand-600">Angebotsvorgang #1048</p>
            <p className="mt-0.5 truncate text-sm font-bold text-slate-950">Bürogebäude Hamburg</p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-approve-300 bg-approve-50 px-2.5 py-1 text-xs font-bold text-approve-800">
            <span className="h-1.5 w-1.5 rounded-full bg-approve-700" />Freigabe offen
          </span>
        </div>

        <div className="border-b border-slate-200 px-3 py-3 sm:px-4">
          <div className="flex items-center gap-1" role="tablist" aria-label="Angebotsvorgang">
            {steps.map((s, i) => (
              <div key={s.key} className="flex min-w-0 flex-1 items-center gap-1">
                <button type="button" role="tab" id={`tab-${s.key}`} aria-label={s.label} aria-selected={active === i}
                  aria-controls="workspace-panel" tabIndex={active === i ? 0 : -1}
                  onClick={() => pick(i)} onKeyDown={onTabKey}
                  className={`flex min-h-11 min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-lg border px-1 transition focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-600/25 ${
                    active === i
                      ? s.tone === "gold"
                        ? "border-approve-300 bg-approve-50"
                        : "border-brand-400 bg-brand-50"
                      : "border-transparent bg-white hover:bg-slate-50"
                  }`}>
                  <span className={active === i ? (s.tone === "gold" ? "text-approve-700" : "text-brand-600") : "text-slate-500"}>
                    <Icon name={s.icon} size={15} />
                  </span>
                  <span className={`hidden text-xs font-bold min-[520px]:block ${
                    active === i ? (s.tone === "gold" ? "text-approve-800" : "text-brand-600") : "text-slate-600"
                  }`}>{s.label}</span>
                </button>
                {i < steps.length - 1 && <Icon name="arrow" size={11} className="hidden shrink-0 text-slate-300 sm:block" />}
              </div>
            ))}
          </div>
        </div>

        {/* Alle Schritte liegen übereinander in derselben Grid-Zelle: Die Höhe richtet sich
            immer nach dem höchsten Schritt, daher springt nichts beim Wechsel. Inaktive
            Schritte sind unsichtbar (visibility) und damit auch für Screenreader und Tab-Fokus aus. */}
        <div id="workspace-panel" role="tabpanel" aria-labelledby={`tab-${step.key}`} className="grid p-4 sm:p-5">
          {steps.map((s, i) => (
            <div key={s.key} aria-hidden={i !== active} className={`[grid-area:1/1] ${i === active ? "" : "invisible"}`}>
              <div className="mb-3 flex items-center gap-2">
                <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${
                  s.tone === "gold" ? "bg-approve-50 text-approve-700" : "bg-brand-100 text-brand-600"
                }`}><Icon name={s.icon} size={15} /></span>
                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-[.13em] text-slate-600">
                    Schritt {i + 1} von {steps.length}
                  </p>
                  <h3 className="truncate text-sm font-bold text-slate-950">{s.head}</h3>
                </div>
              </div>
              {s.body}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 flex items-center justify-center gap-3 px-2 text-center">
        <p className="text-xs leading-5 text-slate-500">Beispielansicht mit Demo-Daten</p>
        <button type="button" onClick={() => setPaused((p) => !p)}
          className="rounded-md px-2 py-1 text-xs font-semibold text-slate-500 underline underline-offset-2 hover:text-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600/30">
          {paused ? "Ablauf abspielen" : "Ablauf pausieren"}
        </button>
      </div>
    </div>
  );
}

/* ── Hero ──────────────────────────────────────────────────────── */

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden border-b border-slate-200 bg-offwhite">
      <div className="absolute inset-0 z-0 opacity-50" style={{
        backgroundImage: "linear-gradient(#dfe7e5 1px,transparent 1px),linear-gradient(90deg,#dfe7e5 1px,transparent 1px)",
        backgroundSize: "48px 48px",
        maskImage: "linear-gradient(to bottom,black,transparent 80%)",
        WebkitMaskImage: "linear-gradient(to bottom,black,transparent 80%)",
      }} />
      <div className="relative mx-auto grid max-w-[1180px] items-center gap-12 px-5 py-12 lg:grid-cols-[.88fr_1.12fr] lg:gap-14 lg:px-8 lg:py-24">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-300 bg-white/80 px-3 py-1.5 text-xs font-bold uppercase tracking-[.1em] text-brand-600">
            <Icon name="layers" size={14} />Für gewerbliche Gebäudereinigungen
          </div>

          <h1 className="text-[clamp(2.5rem,8vw,4.15rem)] font-black leading-[.98] tracking-[-.045em] text-ink">
            Keine unvollständige<br />Anfrage bleibt<br /><span className="text-brand-600">liegen.</span>
          </h1>

          <p className="mt-6 max-w-[540px] text-[16px] leading-7 text-slate-600 sm:text-[17px]">
            ANVERO erkennt fehlende Angaben in eingehenden Reinigungsanfragen, bereitet die
            passende Rückfrage vor und kalkuliert den Angebotsentwurf nach Ihren Regeln.
            Ihr Team prüft, gibt frei und versendet.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="#demo" className="w-full sm:w-auto">20-Minuten-Demo anfragen</Button>
            <Button href="#ablauf" secondary icon={null} className="w-full sm:w-auto">Ablauf ansehen</Button>
          </div>

          {/* Kontrollsignal direkt unter dem CTA statt erst in Sektion 4 */}
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12.5px] font-semibold text-slate-500">
            {["Keine erfundenen Preise", "Kein Versand ohne Freigabe", "Jeder Schritt nachvollziehbar"].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <Icon name="check" size={13} className="text-brand-600" />{t}
              </span>
            ))}
          </div>
        </div>

        <Workspace />
      </div>
    </section>
  );
}

/* ── Nutzen: typografisch statt Karten ─────────────────────────── */

function Benefits() {
  const items = [
    ["Anfragen werden zum Vorgang", "Objekt-, Kunden- und Leistungsdaten landen strukturiert in einem nachvollziehbaren Vorgang statt verteilt im Postfach."],
    ["Lücken werden sichtbar", "Fehlende Pflichtangaben werden erkannt und markiert, bevor jemand anfängt zu kalkulieren."],
    ["Angebote werden konsistent", "Jeder Entwurf folgt denselben hinterlegten Leistungs- und Kalkulationsregeln Ihres Unternehmens."],
  ];
  return (
    <section id="vorteile" className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-[1120px] px-5 lg:px-8">
        <p className="mb-4 text-[.72rem] font-extrabold uppercase tracking-[.15em] text-brand-600">Der konkrete Nutzen</p>
        <h2 className="max-w-3xl text-[clamp(2rem,4.5vw,3rem)] font-black leading-[1.05] tracking-[-.04em] text-ink">
          Weniger Handarbeit zwischen Posteingang und Angebot.
        </h2>
        <div className="mt-12 space-y-0">
          {items.map(([t, d], i) => (
            <div key={t} className="grid gap-3 border-t border-slate-200 py-7 md:grid-cols-[3rem_1fr_1.4fr] md:items-baseline md:gap-8">
              <span className="font-mono text-sm font-bold text-brand-600">0{i + 1}</span>
              <h3 className="text-xl font-extrabold tracking-[-.02em] text-ink">{t}</h3>
              <p className="text-[15px] leading-7 text-slate-600">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Beweis-Moment: eine Anfrage, durchgespielt ────────────────── */

function Proof() {
  const rows = [
    ["mail", "Eingehende E-Mail", "\u201eWir benötigen eine regelmäßige Reinigung für unser Bürogebäude \u2026\u201c", "petrol"],
    ["search", "ANVERO erkennt", "Fläche, Turnus und Leistungsart vorhanden · Reinigungszeiten fehlen", "petrol"],
    ["send", "Rückfrage vorbereitet", "\u201eWelche Reinigungszeiten sind für Ihr Objekt gewünscht?\u201c", "gold"],
    ["file", "Entwurf kalkuliert", "Nach Ihrer hinterlegten Preislogik – ohne geschätzte Werte", "petrol"],
    ["shield", "Ihr Team gibt frei", "Erst danach verlässt eine Nachricht das Haus", "gold"],
  ];
  return (
    <section id="ablauf" className="border-y border-slate-200 bg-[#f1f6f4] py-16 sm:py-24">
      <div className="mx-auto max-w-[900px] px-5 lg:px-8">
        <p className="mb-4 text-[.72rem] font-extrabold uppercase tracking-[.15em] text-brand-600">Ein Vorgang, durchgespielt</p>
        <h2 className="max-w-2xl text-[clamp(2rem,4.5vw,3rem)] font-black leading-[1.05] tracking-[-.04em] text-ink">
          So sieht eine echte Anfrage von Anfang bis Ende aus.
        </h2>
        <div className="mt-11">
          {rows.map(([icon, title, text, tone], i) => (
            <div key={title} className="relative flex gap-5 pb-8 last:pb-0">
              {i < rows.length - 1 && <span className="absolute left-[21px] top-11 h-[calc(100%-2.75rem)] w-px bg-slate-300" />}
              <span className={`relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-xl border ${
                tone === "gold" ? "border-approve-300 bg-approve-50 text-approve-700" : "border-slate-200 bg-white text-brand-600"
              }`}><Icon name={icon} size={18} /></span>
              <div className="pt-1.5">
                <h3 className="text-[15px] font-extrabold text-ink">{title}</h3>
                <p className="mt-1 text-[14.5px] leading-6 text-slate-600">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Kontrolle: das Markenelement ──────────────────────────────── */

function Control() {
  const guarantees = [
    "Keine erfundenen Preise",
    "Keine stillen Annahmen bei fehlenden Angaben",
    "Keine unkontrollierten E-Mails an Ihre Kunden",
    "Kein Angebot ohne menschliche Freigabe",
    "Jeder Schritt im Vorgang dokumentiert",
  ];
  return (
    <section id="kontrolle" className="bg-brand-900 py-20 text-white sm:py-28">
      <div className="mx-auto grid max-w-[1120px] items-start gap-12 px-5 lg:grid-cols-[.95fr_1.05fr] lg:gap-16 lg:px-8">
        <div>
          <p className="mb-4 text-xs font-extrabold uppercase tracking-[.15em] text-approve-300">Kontrolle als Produktprinzip</p>
          <h2 className="text-[clamp(2.1rem,5vw,3.4rem)] font-black leading-[1.03] tracking-[-.04em]">
            Die Software darf vorbereiten.<br />
            <span className="text-approve-300">Entscheiden darf Ihr Team.</span>
          </h2>
          <p className="mt-6 max-w-lg text-[15.5px] leading-7 text-slate-300">
            ANVERO übernimmt die wiederkehrende Vorarbeit und dokumentiert jeden Schritt.
            Alles, was das Haus verlässt, trägt vorher die Unterschrift eines Menschen.
          </p>
        </div>
        <ul className="space-y-px overflow-hidden rounded-2xl border border-white/10">
          {guarantees.map((g) => (
            <li key={g} className="flex items-center gap-4 bg-white/[.045] px-5 py-4">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-approve-300 text-[#17302e]">
                <Icon name="check" size={15} />
              </span>
              <span className="text-[14.5px] font-bold leading-6">{g}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ── Branche ───────────────────────────────────────────────────── */

function Industry() {
  const items = ["Objekt- und Kundendaten", "Flächen und Reinigungsintervalle", "Reinigungsarten und Leistungspositionen",
    "Erforderliche Pflichtangaben", "Preis- und Kalkulationsregeln", "Strukturierte Rückfragen",
    "Eigene Angebotsvorlagen", "Mitarbeiterrollen und Freigaben"];
  return (
    <section id="branche" className="bg-white py-16 sm:py-24">
      <div className="mx-auto grid max-w-[1120px] gap-11 px-5 lg:grid-cols-[.9fr_1.1fr] lg:px-8">
        <div>
          <p className="mb-4 text-[.72rem] font-extrabold uppercase tracking-[.15em] text-brand-600">Branchenspezifisch eingerichtet</p>
          <h2 className="text-[clamp(2rem,4.5vw,3rem)] font-black leading-[1.05] tracking-[-.04em] text-ink">
            Kein allgemeiner KI-Assistent.
          </h2>
          <p className="mt-5 max-w-md text-[15.5px] leading-7 text-slate-600">
            ANVERO wird auf den Angebotsprozess Ihres Betriebs eingerichtet – mit Ihren Leistungen,
            Pflichtangaben, Kalkulationsregeln, Vorlagen und Freigabewegen.
          </p>
        </div>
        <div className="grid gap-x-8 gap-y-0 sm:grid-cols-2">
          {items.map((item) => (
            <div key={item} className="flex items-center gap-3 border-b border-slate-200 py-3.5">
              <Icon name="check" size={15} className="shrink-0 text-brand-600" />
              <span className="text-[14px] font-semibold leading-5 text-slate-700">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Einrichtung: Timeline, nicht IT-Projekt ───────────────────── */

function Setup() {
  const s = [
    ["Ihren Ablauf verstehen", "Wir nehmen typische Anfragen, Leistungen und Freigabeschritte auf."],
    ["Regeln übernehmen", "Kalkulationsgrundlagen, Vorlagen und Rückfragen werden hinterlegt."],
    ["Mit echten Fällen testen", "Gemeinsam prüfen wir reale Vorgänge und schärfen die Regeln nach."],
    ["Produktiv starten", "Ihr Team arbeitet im gewohnten Postfach weiter – mit vorbereiteter Vorarbeit."],
  ];
  return (
    <section id="einrichtung" className="border-y border-slate-200 bg-offwhite py-16 sm:py-24">
      <div className="mx-auto max-w-[1120px] px-5 lg:px-8">
        <p className="mb-4 text-[.72rem] font-extrabold uppercase tracking-[.15em] text-brand-600">Vom Prozess zum System</p>
        <h2 className="max-w-2xl text-[clamp(2rem,4.5vw,3rem)] font-black leading-[1.05] tracking-[-.04em] text-ink">
          In vier Schritten zu Ihrem eigenen Angebotsprozess.
        </h2>
        <ol className="mt-12 grid gap-8 md:grid-cols-4 md:gap-5">
          {s.map(([t, d], i) => (
            <li key={t} className="relative border-t-2 border-brand-600/25 pt-5">
              <span className="absolute -top-[7px] left-0 h-3 w-3 rounded-full bg-brand-600" />
              <span className="font-mono text-xs font-bold text-brand-600">Schritt {i + 1}</span>
              <h3 className="mt-2 text-[15.5px] font-extrabold text-ink">{t}</h3>
              <p className="mt-2 text-[14px] leading-6 text-slate-600">{d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ── FAQ ───────────────────────────────────────────────────────── */

function FAQ() {
  const [open, setOpen] = useState(-1);
  const faqs = [
    ["Verschickt ANVERO selbstständig E-Mails an meine Kunden?",
      "Nein. Rückfragen und Angebote werden vorbereitet und bleiben gesperrt, bis ein Mitarbeiter sie geprüft und freigegeben hat. Ohne diese Freigabe verlässt keine Nachricht Ihr Haus."],
    ["Kann die Software falsche Preise erfinden?",
      "Nein. Kalkuliert wird ausschließlich mit der Preislogik, die Sie hinterlegt haben. Fehlen Angaben oder widersprechen sie sich, wird der Vorgang zur manuellen Prüfung markiert statt geschätzt."],
    ["Wo und wie werden unsere Daten verarbeitet?",
      /* Interne Notiz: Konkrete Zusagen (Hosting-Standort, Auftragsverarbeitung, Speicherdauer) erst
         ergänzen, wenn sie belegt sind. Siehe LEGAL-TODO.md. */
      <>
        Das hängt vom Einsatz in Ihrem Betrieb ab, zum Beispiel davon, ob und wie ein Postfach angebunden wird.
        Fragen zu Hosting, Auftragsverarbeitung und Speicherdauer beantworten wir Ihnen im Demo-Gespräch oder vorab
        per E-Mail an <a href={`mailto:${CONTACT.email}`} className="font-semibold text-brand-700 underline underline-offset-2">{CONTACT.email}</a>.
        Für die Nutzung dieser Website gilt unsere <a href="/datenschutz" className="font-semibold text-brand-700 underline underline-offset-2">Datenschutzerklärung</a>.
      </>],
    ["Für welche Unternehmensgröße eignet sich ANVERO?",
      "Für kleine, mittlere und große Gebäudereinigungen. Regeln, Umfang und Anbindungen werden an den jeweiligen Angebotsprozess angepasst."],
    ["Was passiert bei ungewöhnlichen Anfragen?",
      "Unklare oder untypische Fälle werden gekennzeichnet und an einen Mitarbeiter übergeben, statt automatisch weiterverarbeitet zu werden."],
    ["Ersetzt ANVERO Mitarbeiter?",
      "Nein. ANVERO übernimmt die wiederkehrende Vorarbeit. Ihre Mitarbeiter prüfen Entwürfe, bewerten Sonderfälle und entscheiden verbindlich."],
  ];
  return (
    <section id="faq" className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-[860px] px-5 lg:px-8">
        <p className="mb-4 text-[.72rem] font-extrabold uppercase tracking-[.15em] text-brand-600">Häufige Fragen</p>
        <h2 className="text-[clamp(2rem,4.5vw,3rem)] font-black leading-[1.05] tracking-[-.04em] text-ink">
          Klarheit vor der Demo.
        </h2>
        <div className="mt-9 divide-y divide-slate-200 border-y border-slate-200">
          {faqs.map(([q, a], i) => (
            <div key={q}>
              <button type="button" aria-expanded={open === i} aria-controls={`faq-${i}`}
                onClick={() => setOpen(open === i ? -1 : i)}
                className="flex min-h-16 w-full items-center justify-between gap-5 py-4 text-left focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-600/25">
                <span className="text-[15.5px] font-bold text-slate-900">{q}</span>
                <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border border-slate-200 transition ${open === i ? "rotate-180 bg-slate-50" : ""}`}>
                  <Icon name="down" size={15} />
                </span>
              </button>
              <div id={`faq-${i}`} hidden={open !== i} className="pb-5 pr-10 text-[15px] leading-7 text-slate-600">{a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Demo-Formular mit echten Zuständen ────────────────────────── */

/* Endpoint kommt aus .env (VITE_FORM_ENDPOINT), siehe .env.example.
   Ohne Endpoint: im Dev-Server simulierter Erfolg, im Produktions-Build
   eine ehrliche Fehlermeldung statt eines vorgetäuschten Erfolgs. */
const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* Technische Obergrenzen gegen überlange Eingaben (kein Ersatz für serverseitige Prüfung). */
const FIELD_LIMITS = { name: 100, company: 150, email: 254, message: 2000 };

function validateDemo(f) {
  const errors = {};
  if (!f.get("name")) errors.name = "Bitte geben Sie Ihren Namen ein.";
  if (!f.get("company")) errors.company = "Bitte geben Sie den Namen Ihres Unternehmens ein.";
  const email = f.get("email");
  if (!email) errors.email = "Bitte geben Sie Ihre geschäftliche E-Mail-Adresse ein.";
  else if (!EMAIL_PATTERN.test(email)) errors.email = "Diese E-Mail-Adresse scheint nicht zu stimmen. Bitte prüfen Sie sie, zum Beispiel name@firma.de.";
  return errors;
}

function TextField({ name, label, type = "text", autoComplete, required = false, optional = false, multiline = false, error, onChange, className = "" }) {
  const id = `demo-${name}`;
  const errorId = `${id}-error`;
  const Control = multiline ? "textarea" : "input";
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={id} className="text-xs font-bold text-slate-700">
        {label}
        {required && <span aria-hidden="true"> *</span>}
        {optional && <span className="font-normal text-slate-600"> (optional)</span>}
      </label>
      <Control id={id} name={name} type={multiline ? undefined : type} rows={multiline ? 3 : undefined}
        autoComplete={autoComplete} required={required} maxLength={FIELD_LIMITS[name]}
        aria-invalid={error ? "true" : undefined} aria-describedby={error ? errorId : undefined}
        onChange={() => onChange(name)}
        className={`field ${multiline ? "resize-none" : ""} ${error ? "border-red-600 focus:border-red-600 focus:ring-red-600/[.12]" : ""}`} />
      {error && (
        <p id={errorId} className="flex items-start gap-1.5 text-[13px] font-semibold leading-5 text-red-700">
          <Icon name="alert" size={14} className="mt-[3px] shrink-0" />{error}
        </p>
      )}
    </div>
  );
}

function Demo() {
  const [state, setState] = useState("idle");
  const [err, setErr] = useState("");
  const [errors, setErrors] = useState({});
  const successRef = useRef(null);
  const fail = (message) => { setErr(message); setState("error"); };
  const clearError = (name) => setErrors((prev) => {
    if (!prev[name]) return prev;
    const { [name]: _removed, ...rest } = prev;
    return rest;
  });

  useEffect(() => {
    if (state === "success") successRef.current?.focus();
  }, [state]);

  const submit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);
    if (f.get("_hp")) return;
    for (const key of Object.keys(FIELD_LIMITS)) f.set(key, String(f.get(key) ?? "").trim());

    const found = validateDemo(f);
    setErrors(found);
    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      setErr(""); setState("idle");
      form.elements[firstInvalid]?.focus(); // Screenreader lesen so direkt die Fehlermeldung vor
      return;
    }
    setErr(""); setState("loading");

    if (!FORM_ENDPOINT) {
      if (import.meta.env.DEV) { setTimeout(() => setState("success"), 900); return; }
      console.error("VITE_FORM_ENDPOINT fehlt – Formular ist nicht verbunden.");
      fail(`Das Formular ist derzeit nicht verfügbar. Bitte schreiben Sie uns direkt an ${CONTACT.email}.`); return;
    }
    try {
      const res = await fetch(FORM_ENDPOINT, { method: "POST", body: f, headers: { Accept: "application/json" } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setState("success");
    } catch (error) {
      console.error("Demo-Formular konnte nicht gesendet werden:", error);
      fail(`Senden hat nicht geklappt. Bitte versuchen Sie es erneut oder schreiben Sie uns an ${CONTACT.email}.`);
    }
  };

  return (
    <section id="demo" className="border-t border-slate-200 bg-[#edf4f2] py-16 sm:py-24">
      <div className="mx-auto max-w-[760px] px-5 lg:px-8">
        <div className="text-center">
          <p className="mb-4 text-[.72rem] font-extrabold uppercase tracking-[.15em] text-brand-600">Persönliche Produktdemo</p>
          <h2 className="text-[clamp(2rem,4.5vw,3rem)] font-black leading-[1.05] tracking-[-.04em] text-ink">
            Sehen Sie ANVERO an einer Ihrer Anfragen.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[15.5px] leading-7 text-slate-600">
            20 Minuten, ohne Vorbereitung. Bringen Sie eine typische Anfrage mit –
            wir spielen sie live durch, bis zum geprüften Entwurf.
          </p>
        </div>

        {/* Alternative Kontaktwege neben dem Formular. Der Calendly-Link kommt aus src/siteConfig.js. */}
        <div className="mx-auto mt-8 flex max-w-[680px] flex-col items-center gap-3 text-center">
          <CalendlyButton className="w-full sm:w-auto" />
          <p className="text-[13px] leading-6 text-slate-600">
            Sie erreichen uns auch direkt:{" "}
            <a href={`mailto:${CONTACT.email}`} className="font-semibold text-brand-700 underline underline-offset-2">{CONTACT.email}</a>
            {" · "}
            <a href={CONTACT.phoneHref} className="font-semibold text-brand-700 underline underline-offset-2">{CONTACT.phoneDisplay}</a>
          </p>
          <p className="mt-2 text-xs font-bold uppercase tracking-[.12em] text-slate-600">oder per Formular</p>
        </div>

        {state === "success" ? (
          <div ref={successRef} tabIndex={-1} role="status" className="mx-auto mt-10 max-w-[620px] focus:outline-none rounded-2xl border border-[#8fc6b2] bg-white p-8 text-center shadow-[0_20px_55px_rgba(23,48,46,.08)]">
            <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-brand-100 text-brand-600"><Icon name="check" size={24} /></span>
            <h3 className="mt-4 text-lg font-extrabold text-ink">Vielen Dank für Ihre Anfrage</h3>
            <p className="mt-2 text-[15px] leading-7 text-slate-600">
              Wir haben Ihre Angaben erhalten und melden uns bei Ihnen.
            </p>
          </div>
        ) : (
          <form onSubmit={submit} noValidate
            className="mx-auto mt-10 max-w-[680px] rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_20px_55px_rgba(23,48,46,.08)] sm:p-8">
            <input type="text" name="_hp" tabIndex={-1} autoComplete="off" aria-hidden="true"
              className="absolute h-0 w-0 opacity-0" />
            <p className="mb-5 text-xs text-slate-600">Felder mit * sind Pflichtfelder.</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField name="name" label="Name" autoComplete="name" required error={errors.name} onChange={clearError} />
              <TextField name="company" label="Unternehmen" autoComplete="organization" required error={errors.company} onChange={clearError} />
              <TextField name="email" label="Geschäftliche E-Mail" type="email" autoComplete="email" required
                error={errors.email} onChange={clearError} className="sm:col-span-2" />
              <TextField name="message" label="Nachricht" optional multiline onChange={clearError} className="sm:col-span-2" />
            </div>

            {/* Meldungen zum Senden selbst (Netzwerk, nicht erreichbar); Feldfehler stehen direkt am Feld. */}
            <div aria-live="polite" className="mt-3 min-h-5">
              {state === "error" && (
                <p className="flex items-center gap-1.5 text-[13px] font-semibold text-red-700">
                  <Icon name="alert" size={14} />{err}
                </p>
              )}
            </div>

            <p className="mt-2 text-xs leading-5 text-slate-600">
              Wir verwenden Ihre Angaben, um Ihre Anfrage zu bearbeiten. Informationen zur Datenverarbeitung finden
              Sie in der <a href="/datenschutz" className="font-semibold text-brand-700 underline underline-offset-2">Datenschutzerklärung</a>.
            </p>

            <button type="submit" disabled={state === "loading"}
              className="mt-2 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 text-sm font-bold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-600/25">
              {state === "loading"
                ? <><span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />Wird gesendet …</>
                : <><Icon name="send" size={17} />Demo anfragen</>}
            </button>
            <p className="mt-3 text-center text-[12px] text-slate-600">
              Keine Newsletter-Anmeldung.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}


function Home() {
  return (
    <div className="bg-white text-slate-800 antialiased">
      <Header />
      <main>
        <Hero />
        <Benefits />
        <Proof />
        <Control />
        <Industry />
        <Setup />
        <FAQ />
        <Demo />
      </main>
      <Footer />
    </div>
  );
}

/* Einfaches Routing ohne Zusatzpaket: Vercel liefert fuer /impressum und /datenschutz die index.html
   aus (siehe vercel.json), hier wird anhand des Pfads die passende Seite gerendert. */
const PAGES = { "/impressum": Impressum, "/datenschutz": Datenschutz };

export default function App() {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  const Page = PAGES[path];
  return Page ? <Page /> : <Home />;
}
