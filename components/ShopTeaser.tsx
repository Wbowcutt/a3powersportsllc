import Link from "next/link";

export default function ShopTeaser() {
  return (
    <section className="bg-ink-950 text-white">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-4 py-14 sm:px-6 lg:flex-row lg:items-center lg:px-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-racing-400">
            Merchandise
          </p>
          <h2 className="mt-3 font-display text-4xl uppercase leading-none sm:text-5xl">
            Online shop
          </h2>
          <p className="mt-4 max-w-xl text-lg text-ink-300">
            Gear from the shop. Payment runs through Stripe.
          </p>
        </div>
        <Link
          href="/shop"
          className="inline-flex bg-racing-500 px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-white hover:text-ink-950"
        >
          Visit the shop
        </Link>
      </div>
    </section>
  );
}
