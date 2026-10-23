import Link from "next/link";
import { site } from "@/lib/site";

export default function ShopTeaser() {
  return (
    <section className="bg-ink-950 text-white">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-4 py-14 sm:px-6 lg:flex-row lg:items-center lg:px-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-racing-400">
            For sale
          </p>
          <h2 className="mt-3 font-display text-4xl uppercase leading-none sm:text-5xl">
            What&apos;s listed now
          </h2>
          <p className="mt-4 max-w-xl text-lg text-ink-300">
            See what {site.contactName} has for sale on Facebook Marketplace.
            Shop gear is checked out here with Stripe.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
          <a
            href={site.marketplaceHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-racing-500 px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-white hover:text-ink-950"
          >
            See what&apos;s for sale
          </a>
          <Link
            href="/shop"
            className="inline-flex items-center justify-center border border-white px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-white hover:text-ink-950"
          >
            Visit the shop
          </Link>
        </div>
      </div>
    </section>
  );
}
