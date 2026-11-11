import Link from "next/link";
import Logo from "./Logo";
import { site } from "@/lib/site";

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-white pt-24">
      <div className="speed-lines pointer-events-none absolute inset-y-0 right-0 hidden w-[42%] min-[900px]:block" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 sm:py-20 min-[900px]:grid-cols-[1.15fr_0.85fr] min-[900px]:px-8 min-[900px]:py-24">
        <div>
          <h1 className="text-ink-950">
            <span className="block font-sans text-xs font-semibold uppercase tracking-[0.32em] text-racing-600">
              {site.legalName}
            </span>
            <span className="mt-4 block font-display text-5xl uppercase leading-[0.92] tracking-tight sm:text-6xl min-[900px]:text-7xl">
              Powersports
            </span>
            <span className="mt-1 block font-display text-5xl uppercase leading-[0.92] tracking-tight sm:text-6xl min-[900px]:text-7xl">
              Repair
            </span>
          </h1>
          <div className="mt-5 h-1 w-20 bg-racing-500" />
          <div className="mt-6 max-w-xl space-y-3 text-lg leading-relaxed text-ink-500 sm:text-xl">
            <p>
              A trustworthy shop, willing to fix any off-road machine in a timely
              manner the right way the first time!
            </p>
            <p>Any & all service work, repair work, & tire swaps!</p>
          </div>
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
