import { useState } from "react";
import { Icon, Button } from "./ui";
import { CONTACT } from "../siteConfig";

/* Alle Anker laufen ueber "/#..." statt "#...": So funktionieren Header und Footer
   auf der Startseite (Scroll ohne Neuladen) und auf Unterseiten wie /impressum. */

export function Header() {
  const [open, setOpen] = useState(false);
  const nav = [["Produkt", "/#produkt"], ["Vorteile", "/#vorteile"], ["Ablauf", "/#ablauf"], ["Kontrolle", "/#kontrolle"], ["FAQ", "/#faq"]];
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-offwhite/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1180px] items-center justify-between px-5 lg:h-[72px] lg:px-8">
        <a href="/" className="flex items-center gap-3 rounded-lg focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-600/25">
          <div className="grid h-9 w-9 place-items-center rounded-[10px] bg-brand-800 text-white">
            <span className="text-sm font-black tracking-[-.08em]">AV</span>
          </div>
          <div>
            <div className="text-[15px] font-extrabold tracking-[.14em] text-slate-950">ANVERO</div>
            <div className="text-xs text-slate-600">Anfrage bis Angebot</div>
          </div>
        </a>
        <nav className="hidden items-center gap-6 lg:flex">
          {nav.map(([l, h]) => (
            <a key={h} href={h} className="text-sm font-semibold text-slate-600 transition hover:text-slate-950">{l}</a>
          ))}
        </nav>
        <Button href="/#demo" icon={null} className="hidden min-h-10 px-4 py-2 sm:inline-flex">Demo anfragen</Button>
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
            <Button href="/#demo" onClick={() => setOpen(false)} className="mt-2 w-full">Demo anfragen</Button>
          </div>
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  const link = "text-sm text-slate-400 hover:text-white focus:outline-none focus-visible:text-white focus-visible:underline";
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
              {[["Vorteile", "/#vorteile"], ["Ablauf", "/#ablauf"], ["Einrichtung", "/#einrichtung"]].map(([l, h]) => (
                <a key={h} href={h} className={link}>{l}</a>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-300">Kontakt und Rechtliches</p>
            <div className="mt-4 flex flex-col gap-3">
              <a href="/#demo" className={link}>Demo anfragen</a>
              <a href={`mailto:${CONTACT.email}`} className={link}>{CONTACT.email}</a>
              <a href="/impressum" className={link}>Impressum</a>
              <a href="/datenschutz" className={link}>Datenschutz</a>
            </div>
          </div>
        </div>
        <p className="pt-6 text-xs text-slate-400">© {new Date().getFullYear()} ANVERO</p>
      </div>
    </footer>
  );
}
