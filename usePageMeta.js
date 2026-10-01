import { useEffect } from "react";
import { SITE_URL } from "./siteConfig";

/* Setzt Titel, Beschreibung, Canonical und Open-Graph-URL fuer Unterseiten.
   index.html enthaelt die Werte der Startseite; ohne diese Anpassung wuerde z. B. /impressum
   faelschlich die Startseite als Canonical melden. Funktioniert nur mit JavaScript. */
function setMeta(selector, create, value) {
  let el = document.head.querySelector(selector);
  if (!el) { el = create(); document.head.appendChild(el); }
  el.setAttribute(el.tagName === "LINK" ? "href" : "content", value);
}

export function usePageMeta({ title, description, path }) {
  useEffect(() => {
    const url = `${SITE_URL}${path}`;
    document.title = title;
    const meta = (attr, key) => () => { const m = document.createElement("meta"); m.setAttribute(attr, key); return m; };
    setMeta('meta[name="description"]', meta("name", "description"), description);
    setMeta('link[rel="canonical"]', () => { const l = document.createElement("link"); l.rel = "canonical"; return l; }, url);
    setMeta('meta[property="og:url"]', meta("property", "og:url"), url);
    setMeta('meta[property="og:title"]', meta("property", "og:title"), title);
    setMeta('meta[property="og:description"]', meta("property", "og:description"), description);
  }, [title, description, path]);
}
