import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ShopGrid from "@/components/ShopGrid";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Shop | ${site.legalName}`,
  description: `Merchandise from ${site.legalName}. Checkout is handled by Stripe.`,
};

export default function ShopPage() {
  return (
    <>
      <Navbar />
      <main className="bg-ink-100 pt-28">
        <ShopGrid />
      </main>
      <Footer />
    </>
  );
}
