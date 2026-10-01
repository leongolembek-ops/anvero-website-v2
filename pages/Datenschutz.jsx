import { LegalPage, Section, linkClass } from "./LegalPage";
import { BUSINESS, CONTACT } from "../siteConfig";

/* ENTWURF (intern): Diese Datenschutzerklaerung ist ein Arbeitsentwurf und wurde NICHT rechtlich geprueft.
   Sie beschreibt nur, was aus dem Projektcode und den Angaben des Inhabers belegbar ist.
   Vor dem Livegang muessen die offenen Punkte aus LEGAL-TODO.md geklaert und der Text anwaltlich
   oder durch eine Datenschutzfachkraft freigegeben werden. Nicht aufgenommen, weil nicht belegt:
   Hosting-Anbieter, Formular-Dienstleister, Speicherdauern, Rechtsgrundlage und Auftragsverarbeitung
   zu Calendly, Drittlandtransfer. Calendly ist nur als Grundgeruest in Abschnitt 6 beschrieben. */
export default function Datenschutz() {
  return (
    <LegalPage
      title="Datenschutzerklärung"
      path="/datenschutz"
      description="Informationen zur Verarbeitung personenbezogener Daten auf der Website von ANVERO.">
      <p className="text-sm text-slate-600">Stand: Oktober 2026</p>

      <Section title="1. Verantwortlicher">
        <p>
          Verantwortlich für die Datenverarbeitung auf dieser Website ist:<br />
          <strong>{BUSINESS.name}</strong>, Inhaber {BUSINESS.owner}<br />
          {BUSINESS.street}, {BUSINESS.zip} {BUSINESS.city}, {BUSINESS.country}<br />
          Telefon: <a className={linkClass} href={CONTACT.phoneHref}>{CONTACT.phoneDisplay}</a><br />
          E-Mail: <a className={linkClass} href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
        </p>
      </Section>

      <Section title="2. Allgemeines">
        <p>
          Wir verarbeiten personenbezogene Daten nur, soweit dies für den Betrieb dieser Website, die Bearbeitung
          von Anfragen und die Anbahnung einer Zusammenarbeit erforderlich ist. Personenbezogene Daten sind alle
          Informationen, die sich auf eine identifizierte oder identifizierbare Person beziehen.
        </p>
      </Section>

      <Section title="3. Hosting und Zugriffsdaten">
        <p>
          Beim Aufruf dieser Website verarbeitet der Hosting-Anbieter technisch bedingt Zugriffsdaten, zum Beispiel
          die IP-Adresse, Datum und Uhrzeit des Abrufs, die aufgerufene Adresse sowie Browser- und Systeminformationen.
          Diese Verarbeitung ist erforderlich, um die Website auszuliefern und ihre Sicherheit und Stabilität zu
          gewährleisten. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einem sicheren
          und funktionsfähigen Webauftritt).
        </p>
      </Section>

      <Section title="4. Kontaktaufnahme per E-Mail oder Telefon">
        <p>
          Wenn Sie uns per E-Mail oder Telefon kontaktieren, verarbeiten wir Ihre Angaben (zum Beispiel Name,
          Kontaktdaten und den Inhalt Ihrer Nachricht), um Ihre Anfrage zu bearbeiten. Rechtsgrundlage ist
          Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit einem Vertrag oder vorvertraglichen Maßnahmen
          zusammenhängt, andernfalls Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Beantwortung von Anfragen).
        </p>
      </Section>

      <Section title="5. Demo-Anfrage über das Formular">
        <p>
          Wenn Sie das Formular zur Demo-Anfrage nutzen, verarbeiten wir die von Ihnen eingegebenen Daten
          (Name, Unternehmen, geschäftliche E-Mail-Adresse und, falls angegeben, Ihre Nachricht), um Ihre Anfrage
          zu bearbeiten und mit Ihnen Kontakt aufzunehmen. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO
          (vorvertragliche Maßnahmen) beziehungsweise Art. 6 Abs. 1 lit. f DSGVO. Die Angabe der Pflichtfelder ist
          erforderlich, damit wir Ihre Anfrage beantworten können.
        </p>
      </Section>

      {/* ENTWURF: Abschnitt 6 ist bewusst nur ein Grundgerüst. Anbieter, Zweck im Detail, Rechtsgrundlage,
          Speicherdauer, Auftragsverarbeitung und Drittlandübermittlung sind nicht belegt und müssen nach
          rechtlicher Prüfung ergänzt werden (siehe LEGAL-TODO.md). */}
      <Section title="6. Terminbuchung über Calendly">
        <p>
          Auf dieser Website gibt es einen Button zur Online-Terminbuchung. Er ist ein Link: Beim Klick wird in einem
          neuen Browser-Tab eine externe Website von Calendly geöffnet, über die Sie einen Termin mit uns vereinbaren
          können. Calendly wird nicht in diese Website eingebettet. Mit dem Klick verlassen Sie unsere Website; für die
          Verarbeitung auf der Seite von Calendly gelten zusätzlich die Datenschutzhinweise von Calendly.
        </p>
        <p>
          Bei einer Terminbuchung können je nach Ihren Eingaben personenbezogene Daten wie Name, E-Mail-Adresse und
          Termininformationen verarbeitet werden. Welche Cookies oder ähnlichen Technologien Calendly auf der eigenen
          Seite einsetzt, ist nicht Gegenstand von Abschnitt 7; dieser bezieht sich nur auf diese Website.
        </p>
        <p>
          Die konkreten Angaben zu Anbieter, Zweck, Rechtsgrundlage, Speicherdauer, Auftragsverarbeitung und
          möglichen Übermittlungen in Drittländer werden nach rechtlicher Prüfung in dieser Erklärung ergänzt.
        </p>
      </Section>

      <Section title="7. Keine Cookies, kein Tracking">
        <p>
          Auf dieser Website setzen wir derzeit keine Cookies zu Analyse- oder Marketingzwecken ein und
          verwenden keine Tracking- oder Analysedienste. Die verwendete Schriftart wird von unserem eigenen Webspace
          geladen; es wird dafür keine Verbindung zu Schriftarten-Servern Dritter aufgebaut.
        </p>
      </Section>

      <Section title="8. Speicherdauer">
        <p>
          Wir speichern personenbezogene Daten nur so lange, wie es für den jeweiligen Zweck erforderlich ist
          oder gesetzliche Aufbewahrungspflichten bestehen. Entfällt der Zweck und stehen keine gesetzlichen
          Aufbewahrungspflichten entgegen, werden die Daten gelöscht.
        </p>
      </Section>

      <Section title="9. Empfänger">
        <p>
          Eine Weitergabe Ihrer Daten an Dritte erfolgt nur, soweit dies zur Bereitstellung der Website
          (Hosting-Anbieter) oder zur Bearbeitung Ihrer Anfrage erforderlich ist oder eine rechtliche Verpflichtung
          besteht. Eine automatisierte Entscheidungsfindung einschließlich Profiling findet nicht statt.
        </p>
      </Section>

      <Section title="10. Ihre Rechte">
        <p>Sie haben gegenüber uns folgende Rechte hinsichtlich Ihrer personenbezogenen Daten:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Auskunft (Art. 15 DSGVO)</li>
          <li>Berichtigung (Art. 16 DSGVO)</li>
          <li>Löschung (Art. 17 DSGVO)</li>
          <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
          <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
          <li>Widerspruch gegen Verarbeitungen auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO (Art. 21 DSGVO)</li>
        </ul>
        <p>
          Erteilte Einwilligungen können Sie jederzeit mit Wirkung für die Zukunft widerrufen. Zur Ausübung Ihrer
          Rechte genügt eine Nachricht an <a className={linkClass} href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.
        </p>
        <p>
          Außerdem haben Sie das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren. Für uns
          zuständig ist die Aufsichtsbehörde des Landes Schleswig-Holstein, das Unabhängige Landeszentrum für
          Datenschutz Schleswig-Holstein.
        </p>
      </Section>

      <Section title="11. Änderungen dieser Erklärung">
        <p>
          Wir passen diese Datenschutzerklärung an, wenn sich die Website, die eingesetzten Dienste oder die
          rechtlichen Anforderungen ändern. Es gilt die jeweils hier veröffentlichte Fassung.
        </p>
      </Section>
    </LegalPage>
  );
}
