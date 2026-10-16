import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClearPaidCart from "@/components/ClearPaidCart";
import { site } from "@/lib/site";
import { getStripe } from "@/lib/stripe";

export const metadata: Metadata = {
  title: `Order | ${site.legalName}`,
};

export default async function ShopSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id: sessionId } = await searchParams;
  let state: "paid" | "unpaid" | "unknown" = "unknown";

  if (sessionId) {
    try {
      const stripe = getStripe();
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      if (session.metadata?.source === "a3powersports-shop") {
        state = session.payment_status === "unpaid" ? "unpaid" : "paid";
      }
    } catch (error) {
      console.error("Could not read checkout session:", error);
    }
  }

  return (
    <>
      <Navbar />
      <main className="bg-white px-4 pb-24 pt-36">
        {state === "paid" ? <ClearPaidCart /> : null}
        <div className="mx-auto max-w-xl border border-ink-200 bg-ink-100 px-6 py-12 sm:px-10">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-racing-600">
            Shop
          </p>
          <h1 className="mt-3 font-display text-4xl uppercase leading-none text-ink-950">
            {state === "paid"
              ? "Payment received"
              : state === "unpaid"
                ? "Payment not finished"
                : "Thanks for stopping by"}
          </h1>
          <div className="mt-4 h-1 w-16 bg-racing-500" />
          <p className="mt-5 text-lg leading-relaxed text-ink-500">
            {state === "paid"
              ? "Asa will get the order by email, and you will get a confirmation with the ship-to address."
              : state === "unpaid"
                ? "This checkout is not paid. You can return to the shop and try again."
                : "If a payment went through, a confirmation email will follow. Order emails are sent from the payment notification, so this page is only a receipt view."}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center bg-ink-950 px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-racing-600"
            >
              Back to the shop
            </Link>
            <a
              href={site.phoneHref}
              className="inline-flex items-center justify-center border border-ink-950 px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-ink-950 transition hover:bg-ink-950 hover:text-white"
            >
              Call or text
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
