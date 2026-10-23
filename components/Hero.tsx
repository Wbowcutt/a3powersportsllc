import Link from "next/link";
import Logo from "./Logo";
import { site } from "@/lib/site";

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-white pt-24">
      <div className="speed-lines pointer-events-none absolute inset-y-0 right-0 hidden w-[42%] min-[900px]:block" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 sm:py-20 min-[900px]:grid-cols-[1.15fr_0.85fr] min-[900px]:px-8 min-[900px]:py-24">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-racing-600">
            {site.legalName}
          </p>
          <h1 className="mt-4 font-display text-5xl uppercase leading-[0.92] tracking-tight text-ink-950 sm:text-6xl min-[900px]:text-7xl">
            Powersports
            <span className="mt-1 block text-ink-950">repair</span>
          </h1>
          <div className="mt-5 h-1 w-20 bg-racing-500" />
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-500 sm:text-xl">
            A trustworthy shop, willing to fix a machine in a timely manner.
            Small jobs and service work, engine work, upgrades, tire swaps on a
            pneumatic changer, and dirt bike tires on a manual changer.
          </p>
          <div className="mt-10 flex max-w-md flex-col gap-3">
            <Link
              href="/#book"
              className="inline-flex items-center justify-center bg-ink-950 px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-racing-600"
            >
              Book an appointment
            </Link>
            <a
              href={site.phoneHref}
              className="inline-flex items-center justify-center border border-ink-950 px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.16em] text-ink-950 transition hover:bg-ink-950 hover:text-white"
            >
              Call or text {site.phone}
            </a>
          </div>
        </div>

        <div className="relative flex justify-center min-[900px]:justify-end">
          <Logo size={220} priority className="max-w-full" />
        </div>
      </div>
    </section>
  );
}
