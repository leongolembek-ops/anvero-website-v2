import { CALENDLY_HREF, CALENDLY_LABEL } from "../siteConfig";

export const Icon = ({ name, size = 20, className = "" }) => {
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
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></>,
    spark: <><path d="M12 3v4M12 17v4M3 12h4M17 12h4" /><path d="M7.8 7.8 5 5M19 19l-2.8-2.8M16.2 7.8 19 5M5 19l2.8-2.8" /></>,
  };
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {paths[name]}
    </svg>
  );
};

export function Button({ children, href = "#demo", secondary = false, icon = "arrow", className = "", onClick }) {
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

/* Terminbuchung bei Calendly (Haupt-CTA). Oeffnet immer in einem neuen Tab.
   size: "lg" = Hero (56 px hoch), "md" = Standard (48 px), "sm" = Header (44 px).
   Nur bei ungueltiger URL in siteConfig.js faellt der Button auf eine deaktivierte Darstellung zurueck. */
const CALENDLY_SIZES = {
  lg: "min-h-14 px-7 py-4 text-base",
  md: "min-h-12 px-5 py-3 text-sm",
  sm: "min-h-11 px-4 py-2 text-sm",
};

export function CalendlyButton({ size = "md", className = "", onClick }) {
  const base = `group inline-flex items-center justify-center gap-2 rounded-xl font-semibold ${CALENDLY_SIZES[size]}`;
  if (CALENDLY_HREF) {
    return (
      <a href={CALENDLY_HREF} target="_blank" rel="noopener noreferrer" onClick={onClick}
        className={`${base} bg-brand-600 text-white shadow-[0_8px_22px_rgba(23,107,104,.25)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-600/25 ${className}`}>
        <Icon name="calendar" size={size === "lg" ? 20 : 17} />
        {CALENDLY_LABEL}
        <span className="sr-only"> (öffnet in neuem Tab)</span>
      </a>
    );
  }
  return (
    <button type="button" disabled aria-disabled="true"
      className={`${base} cursor-not-allowed border border-slate-300 bg-slate-100 text-slate-600 ${className}`}>
      <Icon name="calendar" size={size === "lg" ? 20 : 17} />{CALENDLY_LABEL}
    </button>
  );
}
