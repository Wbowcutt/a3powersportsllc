import WorkGallery from "./WorkGallery";

export default function Services() {
  return (
    <section id="services" className="scroll-mt-24 border-t border-ink-200 bg-ink-100 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-racing-600">
          The work
        </p>
        <h2 className="mt-3 max-w-4xl font-display text-4xl uppercase leading-[0.95] tracking-tight text-ink-950 sm:text-5xl">
          Throw any repair job at us & we will tackle it.
        </h2>
        <div className="mt-4 h-1 w-16 bg-racing-500" />
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-500">
          All service work, most engine work, & any upgrades — plus tire swaps on
          all off road machines.
        </p>

        <section id="pictures" className="mt-16 scroll-mt-24 border-t border-ink-300 pt-16">
          <h2 className="font-display text-4xl uppercase leading-none tracking-tight text-ink-950 sm:text-5xl">
            Pictures of work
          </h2>
          <div className="mt-4 h-1 w-16 bg-racing-500" />
          <WorkGallery />
        </section>
      </div>
    </section>
  );
}
