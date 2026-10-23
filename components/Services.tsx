const services = [
  {
    index: "01",
    title: "Small jobs & service",
    body: "Small jobs and service work.",
  },
  {
    index: "02",
    title: "Engine work",
    body: "Engine work when the machine needs it.",
  },
  {
    index: "03",
    title: "Upgrades",
    body: "Upgrades for the machine.",
  },
  {
    index: "04",
    title: "Tires & rims",
    body: "Tires and rims sold and swapped on a pneumatic tire changer. Dirt bike tires changed on a manual dirt bike tire changer.",
  },
];

export default function Services() {
  return (
    <section id="services" className="scroll-mt-24 border-t border-ink-200 bg-ink-100 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-racing-600">
          The work
        </p>
        <h2 className="mt-3 max-w-3xl font-display text-4xl uppercase leading-none tracking-tight text-ink-950 sm:text-5xl">
          From a small job to an engine
        </h2>
        <div className="mt-4 h-1 w-16 bg-racing-500" />
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-500">
          Service work, engine work, and upgrades — plus tire swaps and dirt bike tires.
        </p>

        <div className="mt-12 border-b border-ink-300">
          {services.map((service) => (
            <article
              key={service.index}
              className="grid gap-3 border-t border-ink-300 py-8 sm:grid-cols-12 sm:items-baseline sm:gap-6"
            >
              <p className="font-display text-3xl text-racing-500 sm:col-span-2">
                {service.index}
              </p>
              <h3 className="font-display text-3xl uppercase leading-none text-ink-950 sm:col-span-5 sm:text-4xl">
                {service.title}
              </h3>
              <p className="text-lg leading-relaxed text-ink-500 sm:col-span-5">
                {service.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
