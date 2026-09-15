import { useState, useEffect } from "react";

const Icon = ({ name, size = 20, className = "" }) => {
  const paths = {
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    down: <path d="m6 9 6 6 6-6" />,
    check: <path d="m5 12 4 4L19 6" />,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    file: <><path d="M6 2h8l4 4v16H6z" /><path d="M14 2v5h5" /><path d="M9 13h6M9 17h6" /></>,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 22a8 8 0 0 1 16 0" /></>,
    shield: <><path d="M12 3 4.5 6v5.5c0 5 3.2 8.1 7.5 9.5 4.3-1.4 7.5-4.5 7.5-9.5V6z" /><path d="m8.5 12 2.3 2.3 4.7-5" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    layers: <><path d="m12 2 9 5-9 5-9-5z" /><path d="m3 12 9 5 9-5" /><path d="m3 17 9 5 9-5" /></>,
    settings: <><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9 7 7M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1" /></>,
    send: <><path d="m22 2-7 20-4-9-9-4z" /><path d="M22 2 11 13" /></>,
    lock: <><rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></>,
    alert: <><circle cx="12" cy="12" r="9" /><path d="M12 7v6M12 16.5v.5" /></>,
    x: <><path d="M6 6l12 12M18 6 6 18" /></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    spark: <><path d="M12 3v4M12 17v4M3 12h4M17 12h4" /><path d="M7.8 7.8 5 5M19 19l-2.8-2.8M16.2 7.8 19 5M5 19l2.8-2.8" /></>,
  };
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {paths[name]}
    </svg>
  );
};

function Button({ children, href = "#demo", secondary = false, icon = "arrow", className = "", onClick }) {
  const base = "group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-600/25";
  const style = secondary
    ? "border border-slate-300 bg-white text-slate-800 hover:border-slate-400 hover:bg-slate-50"
    : "bg-brand-600 text-white shadow-[0_8px_22px_rgba(23,107,104,.2)] hover:-translate-y-0.5 hover:bg-brand-700";
  return (
    <a href={href} onClick={onClick} className={`${base} ${style} ${className}`}>
      {children}
      {icon && <Icon name={icon} size={17} className="transition-transform group-hover:translate-x-0.5" />}
    </a>
  );
}

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
          <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-slate-500">
            <span className="rounded-md bg-slate-100 px-2 py-1">Müller Immobilien</span>
            <span className="rounded-md bg-slate-100 px-2 py-1">09:14 Uhr</span>
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
                <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-slate-400">
                  <Icon name="check" size={11} className="text-brand-600" />{k}
                </div>
                <div className="mt-0.5 text-[12px] font-semibold text-slate-700">{v}</div>
              </div>
            ))}
          </div>
          <div className="mt-2 flex items-center gap-2 rounded-lg border border-approve-300 bg-approve-50 px-3 py-2.5">
            <Icon name="alert" size={15} className="shrink-0 text-approve-600" />
            <div>
              <div className="text-[10px] uppercase tracking-wider text-approve-600">Noch offen</div>
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
            <Icon name="lock" size={15} className="shrink-0 text-approve-600" />
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
              <div className="text-[10px] uppercase tracking-wider text-slate-400">{k}</div>
              <div className="mt-0.5 text-[12px] font-semibold text-slate-700">{v}</div>
            </div>
          ))}
          <p className="col-span-2 text-[11px] leading-5 text-slate-500">
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
          <button type="button"
            className="mt-2.5 flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border border-approve-300 bg-approve-50 px-3 text-[13px] font-bold text-approve-800 transition hover:bg-approve-100 focus:outline-none focus-visible:ring-4 focus-visible:ring-approve-300/40">
            <Icon name="shield" size={15} />Prüfen und freigeben
          </button>
        </div>
      ),
    },
  ];

  const [active, setActive] = useState(1);
  const [touched, setTouched] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (touched || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setActive((s) => (s + 1) % steps.length), 6500);
    return () => clearInterval(t);
  }, [touched, paused]);

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
    <div id="produkt" className="relative mx-auto w-full max-w-[620px] scroll-mt-24">
      <div className="absolute -inset-4 -z-10 rounded-[40px] bg-brand-200/40 blur-2xl" />
      <div className="overflow-hidden rounded-[22px] border border-slate-300/70 bg-white shadow-[0_28px_70px_rgba(23,48,46,.15)]">

        <div className="flex items-center justify-between gap-3 border-b border-slate-200 bg-offwhite px-4 py-3 sm:px-5">
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-[.14em] text-brand-600">Angebotsvorgang #1048</p>
            <p className="mt-0.5 truncate text-sm font-bold text-slate-950">Bürogebäude Hamburg</p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-approve-300 bg-approve-50 px-2.5 py-1 text-[11px] font-bold text-approve-800">
            <span className="h-1.5 w-1.5 rounded-full bg-approve-600" />Freigabe offen
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
                  <span className={active === i ? (s.tone === "gold" ? "text-approve-600" : "text-brand-600") : "text-slate-400"}>
                    <Icon name={s.icon} size={15} />
                  </span>
                  <span className={`hidden text-[10px] font-bold min-[420px]:block ${
                    active === i ? (s.tone === "gold" ? "text-approve-800" : "text-brand-600") : "text-slate-400"
                  }`}>{s.label}</span>
                </button>
                {i < steps.length - 1 && <Icon name="arrow" size={11} className="hidden shrink-0 text-slate-300 sm:block" />}
              </div>
            ))}
          </div>
        </div>

        <div id="workspace-panel" role="tabpanel" aria-labelledby={`tab-${step.key}`} className="p-4 sm:p-5">
          <div className="mb-3 flex items-center gap-2">
            <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${
              step.tone === "gold" ? "bg-approve-50 text-approve-600" : "bg-brand-100 text-brand-600"
            }`}><Icon name={step.icon} size={15} /></span>
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-[.13em] text-slate-400">
                Schritt {active + 1} von {steps.length}
              </p>
              <h3 className="truncate text-sm font-bold text-slate-950">{step.head}</h3>
            </div>
          </div>
          {step.body}
        </div>
      </div>

      <div className="mt-3 flex items-center justify-center gap-3 px-2 text-center">
        <p className="text-[11px] leading-5 text-slate-500">Beispielansicht mit Demo-Daten</p>
        <button type="button" onClick={() => setPaused((p) => !p)}
          className="rounded-md px-2 py-1 text-[11px] font-semibold text-slate-500 underline underline-offset-2 hover:text-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600/30">
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
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-300 bg-white/80 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[.1em] text-brand-600">
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
            <Button href="#produkt" secondary icon={null} className="w-full sm:w-auto">Ablauf ansehen</Button>
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
                tone === "gold" ? "border-approve-300 bg-approve-50 text-approve-600" : "border-slate-200 bg-white text-brand-600"
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
      "Diese Angaben ergänzen Sie hier mit Ihren belastbaren Fakten: Hosting-Standort, Auftragsverarbeitungsvertrag, Speicherdauer und Umfang des Postfachzugriffs. Eine unkonkrete Antwort schadet an dieser Stelle mehr als keine."],
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

function Demo() {
  const [state, setState] = useState("idle");
  const [err, setErr] = useState("");
  const fail = (message) => { setErr(message); setState("error"); };

  const submit = async (e) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    if (f.get("_hp")) return;
    if (!f.get("name") || !f.get("company") || !f.get("email")) {
      fail("Bitte füllen Sie Name, Unternehmen und E-Mail aus."); return;
    }
    if (!EMAIL_PATTERN.test(String(f.get("email")).trim())) {
      fail("Bitte geben Sie eine gültige E-Mail-Adresse ein."); return;
    }
    setErr(""); setState("loading");

    if (!FORM_ENDPOINT) {
      if (import.meta.env.DEV) { setTimeout(() => setState("success"), 900); return; }
      console.error("VITE_FORM_ENDPOINT fehlt – Formular ist nicht verbunden.");
      fail("Das Formular ist gerade nicht erreichbar. Bitte versuchen Sie es später erneut."); return;
    }
    try {
      const res = await fetch(FORM_ENDPOINT, { method: "POST", body: f, headers: { Accept: "application/json" } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setState("success");
    } catch (error) {
      console.error("Demo-Formular konnte nicht gesendet werden:", error);
      fail("Senden hat nicht geklappt. Bitte versuchen Sie es erneut.");
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

        {state === "success" ? (
          <div role="status" className="mx-auto mt-10 max-w-[620px] rounded-2xl border border-[#8fc6b2] bg-white p-8 text-center shadow-[0_20px_55px_rgba(23,48,46,.08)]">
            <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-brand-100 text-brand-600"><Icon name="check" size={24} /></span>
            <h3 className="mt-4 text-lg font-extrabold text-ink">Anfrage ist angekommen</h3>
            <p className="mt-2 text-[15px] leading-7 text-slate-600">
              Wir melden uns innerhalb eines Werktags mit zwei Terminvorschlägen.
            </p>
          </div>
        ) : (
          <form onSubmit={submit} noValidate
            className="mx-auto mt-10 max-w-[680px] rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_20px_55px_rgba(23,48,46,.08)] sm:p-8">
            <input type="text" name="_hp" tabIndex={-1} autoComplete="off" aria-hidden="true"
              className="absolute h-0 w-0 opacity-0" />
            <div className="grid gap-4 sm:grid-cols-2">
              {[["name", "Name", "text", "name"], ["company", "Unternehmen", "text", "organization"]].map(([n, l, t, ac]) => (
                <label key={n} className="flex flex-col gap-2 text-xs font-bold text-slate-700">
                  {l}
                  <input name={n} type={t} autoComplete={ac} required
                    className="min-h-[46px] rounded-[.65rem] border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-brand-600 focus:ring-4 focus:ring-brand-600/12" />
                </label>
              ))}
              <label className="flex flex-col gap-2 text-xs font-bold text-slate-700 sm:col-span-2">
                Geschäftliche E-Mail
                <input name="email" type="email" autoComplete="email" required
                  className="min-h-[46px] rounded-[.65rem] border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-brand-600 focus:ring-4 focus:ring-brand-600/12" />
              </label>
              <label className="flex flex-col gap-2 text-xs font-bold text-slate-700 sm:col-span-2">
                <span>Nachricht <span className="font-normal text-slate-500">(optional)</span></span>
                <textarea name="message" rows="3"
                  className="resize-none rounded-[.65rem] border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-brand-600 focus:ring-4 focus:ring-brand-600/12" />
              </label>
            </div>

            <div aria-live="polite" className="mt-3 min-h-5">
              {state === "error" && (
                <p className="flex items-center gap-1.5 text-[13px] font-semibold text-red-700">
                  <Icon name="alert" size={14} />{err}
                </p>
              )}
            </div>

            <button type="submit" disabled={state === "loading"}
              className="mt-2 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 text-sm font-bold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-600/25">
              {state === "loading"
                ? <><span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />Wird gesendet …</>
                : <><Icon name="send" size={17} />Demo anfragen</>}
            </button>
            <p className="mt-3 text-center text-[12px] text-slate-500">
              Antwort innerhalb eines Werktags. Keine Newsletter-Anmeldung.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}

/* ── Header mit geschlossener Navigationslücke ─────────────────── */

function Header() {
  const [open, setOpen] = useState(false);
  const nav = [["Produkt", "#produkt"], ["Vorteile", "#vorteile"], ["Ablauf", "#ablauf"], ["Kontrolle", "#kontrolle"], ["FAQ", "#faq"]];
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-offwhite/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1180px] items-center justify-between px-5 lg:h-[72px] lg:px-8">
        <a href="#top" className="flex items-center gap-3 rounded-lg focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-600/25">
          <div className="grid h-9 w-9 place-items-center rounded-[10px] bg-brand-800 text-white">
            <span className="text-sm font-black tracking-[-.08em]">AV</span>
          </div>
          <div>
            <div className="text-[15px] font-extrabold tracking-[.14em] text-slate-950">ANVERO</div>
            <div className="text-[10px] text-slate-500">Anfrage bis Angebot</div>
          </div>
        </a>
        <nav className="hidden items-center gap-6 lg:flex">
          {nav.map(([l, h]) => (
            <a key={h} href={h} className="text-sm font-semibold text-slate-600 transition hover:text-slate-950">{l}</a>
          ))}
        </nav>
        <Button href="#demo" icon={null} className="hidden min-h-10 px-4 py-2 sm:inline-flex">Demo anfragen</Button>
        {/* geändert: sm:hidden -> lg:hidden, schließt die Lücke 640–1024 px */}
        <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? "Menü schließen" : "Menü öffnen"}
          className="grid h-11 w-11 place-items-center rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-600/25 lg:hidden">
          <Icon name={open ? "x" : "menu"} size={18} />
        </button>
      </div>
      {open && (
        <nav className="border-t border-slate-200 bg-white px-5 py-4 lg:hidden">
          <div className="mx-auto flex max-w-[1180px] flex-col">
            {nav.map(([l, h]) => (
              <a key={h} href={h} onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50">{l}</a>
            ))}
            <Button href="#demo" onClick={() => setOpen(false)} className="mt-2 w-full">Demo anfragen</Button>
          </div>
        </nav>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-brand-950 text-white">
      <div className="mx-auto max-w-[1120px] px-5 py-12 lg:px-8">
        <div className="grid gap-9 border-b border-white/10 pb-9 md:grid-cols-[1.4fr_.6fr_.6fr]">
          <div>
            <div className="text-lg font-black tracking-[.16em]">ANVERO</div>
            <p className="mt-3 max-w-sm text-sm leading-6 text-slate-400">
              Angebotsvorbereitung für Gebäudereinigungen – von der Anfrage bis zum geprüften Entwurf.
            </p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-300">Produkt</p>
            <div className="mt-4 flex flex-col gap-3">
              {[["Vorteile", "#vorteile"], ["Ablauf", "#ablauf"], ["Einrichtung", "#einrichtung"]].map(([l, h]) => (
                <a key={h} href={h} className="text-sm text-slate-400 hover:text-white">{l}</a>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-300">Rechtliches</p>
            <div className="mt-4 flex flex-col gap-3">
              <a href="#demo" className="text-sm text-slate-400 hover:text-white">Kontakt</a>
              <a href="/impressum" className="text-sm text-slate-400 hover:text-white">Impressum</a>
              <a href="/datenschutz" className="text-sm text-slate-400 hover:text-white">Datenschutz</a>
            </div>
          </div>
        </div>
        <p className="pt-6 text-xs text-slate-500">© {new Date().getFullYear()} ANVERO</p>
      </div>
    </footer>
  );
}

export default function App() {
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
