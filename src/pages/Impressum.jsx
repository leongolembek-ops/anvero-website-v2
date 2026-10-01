import { LegalPage, Section, linkClass } from "./LegalPage";
import { BUSINESS, CONTACT } from "../siteConfig";

/* Nur Angaben, die vom Inhaber bestaetigt wurden (Stammdaten in src/siteConfig.js).
   USt-IdNr. und Handelsregister sind bewusst nicht aufgefuehrt: Es wurden keine genannt.
   Offene Punkte zur endgueltigen Pruefung: siehe LEGAL-TODO.md. */
export default function Impressum() {
  return (
    <LegalPage
      title="Impressum"
      path="/impressum"
      description="Anbieterkennzeichnung und Kontaktdaten von ANVERO, Inhaber Leon Raik Golembek, Quickborn.">
      <Section title="Angaben gemäß § 5 DDG">
        <p>
          <strong>{BUSINESS.name}</strong> ({BUSINESS.legalForm})<br />
          Inhaber: {BUSINESS.owner}<br />
          {BUSINESS.street}<br />
          {BUSINESS.zip} {BUSINESS.city}<br />
          {BUSINESS.country}
        </p>
      </Section>

      <Section title="Kontakt">
        <p>
          Telefon: <a className={linkClass} href={CONTACT.phoneHref}>{CONTACT.phoneDisplay}</a><br />
          E-Mail: <a className={linkClass} href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
        </p>
      </Section>
    </LegalPage>
  );
}
