/* Zentrale Stammdaten der Website. Nur hier pflegen, nicht in den Komponenten. */

/* Einzige gueltige Website-URL. Muss mit index.html, public/robots.txt und
   public/sitemap.xml uebereinstimmen (dort steht sie als feste Zeichenkette). */
export const SITE_URL = "https://anvero.tech";

export const BUSINESS = {
  name: "ANVERO",
  legalForm: "Einzelunternehmen",
  owner: "Leon Raik Golembek",
  street: "Zeppelinstraße 5",
  zip: "25451",
  city: "Quickborn",
  country: "Deutschland",
};

/* E-Mail-Adresse (Postfach-Domain, keine Website-URL). */
export const CONTACT = {
  email: "info@anvero.de",
  phoneDisplay: "0152 31792983",
  phoneHref: "tel:+4915231792983",
};

/* Calendly-Buchungslink. Es werden nur Links akzeptiert, die mit "https://calendly.com/" beginnen.
   Datenschutzerklaerung um den Terminanbieter ergaenzen (siehe LEGAL-TODO.md). */
const CALENDLY_URL = "https://calendly.com/leongolembek";

export const CALENDLY_HREF = CALENDLY_URL.startsWith("https://calendly.com/") ? CALENDLY_URL : null;
