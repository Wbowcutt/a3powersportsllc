import { site } from "@/lib/site";

export default function About() {
  return (
    <section id="about" className="scroll-mt-24 bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-racing-600">
          About
        </p>
        <blockquote className="mt-6 max-w-4xl font-display text-3xl uppercase leading-[1.15] tracking-tight text-ink-950 sm:text-4xl lg:text-5xl">
          A trustworthy powersports repair shop, willing to fix a machine in a
          timely manner.
        </blockquote>
        <div className="mt-6 h-1 w-16 bg-racing-500" />
        <div className="mt-8 max-w-2xl space-y-4 text-lg leading-relaxed text-ink-500">
          <p>
            From small jobs and service work to engine work and all upgrades.
            The shop has a pneumatic tire machine, so tires and rims can be
            sold and changed.
          </p>
          <p>For new customers searching for the shop and the trade.</p>
        </div>
        <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-ink-950">
          {site.contactName}
          <span className="ml-3 font-normal tracking-normal text-ink-400">
            {site.legalName}
          </span>
        </p>
      </div>
    </section>
  );
}
