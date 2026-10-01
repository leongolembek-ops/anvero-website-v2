import { Header, Footer } from "../components/Layout";
import { usePageMeta } from "../usePageMeta";

export function LegalPage({ title, description, path, children }) {
  usePageMeta({ title: `${title} | ANVERO`, description, path });
  return (
    <div className="bg-white text-slate-800 antialiased">
      <Header />
      <main>
        <article className="mx-auto max-w-[760px] px-5 py-14 sm:py-20 lg:px-8">
          <h1 className="text-[clamp(2rem,5vw,2.75rem)] font-black leading-[1.08] tracking-[-.03em] text-ink">{title}</h1>
          <div className="mt-8 space-y-8">{children}</div>
        </article>
      </main>
      <Footer />
    </div>
  );
}

export function Section({ title, children }) {
  return (
    <section>
      <h2 className="text-xl font-extrabold tracking-[-.01em] text-ink">{title}</h2>
      <div className="mt-3 space-y-3 text-[15px] leading-7 text-slate-700">{children}</div>
    </section>
  );
}

export const linkClass =
  "font-semibold text-brand-700 underline underline-offset-2 hover:text-brand-900 focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-600/25";
