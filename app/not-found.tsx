import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="bg-white px-4 pb-24 pt-36">
        <div className="mx-auto max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-racing-600">
            404
          </p>
          <h1 className="mt-3 font-display text-5xl uppercase text-ink-950">
            Page not found
          </h1>
          <div className="mt-4 h-1 w-16 bg-racing-500" />
          <Link
            href="/"
            className="mt-8 inline-flex bg-ink-950 px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-white hover:bg-racing-600"
          >
            Back home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
