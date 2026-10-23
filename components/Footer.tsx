import Logo from "./Logo";
import { site } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t-8 border-ink-950 bg-white">
      <div className="h-1 bg-racing-500" />
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-10 px-4 py-12 sm:px-6 lg:flex-row lg:px-8">
        <Logo size={84} />
        <div className="text-sm text-ink-500 lg:text-right">
          <p className="font-display text-2xl uppercase tracking-wide text-ink-950">
            {site.contactName}
          </p>
          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em]">
            {site.legalName}
          </p>
          <p className="mt-4">
            <a href={site.phoneHref} className="text-lg font-semibold text-ink-950 hover:text-racing-600">
              {site.phone}
            </a>
          </p>
          <p className="mt-1 text-xs uppercase tracking-[0.16em]">Call or text</p>
          <p className="mt-4">
            <a href={`mailto:${site.email}`} className="break-all hover:text-ink-950">
              {site.email}
            </a>
          </p>
          <p className="mt-4">
            <a
              href={site.marketplaceHref}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold uppercase tracking-[0.14em] text-ink-950 hover:text-racing-600"
            >
              Facebook Marketplace
            </a>
          </p>
        </div>
      </div>
      <div className="border-t border-ink-200 py-6 text-center text-xs uppercase tracking-[0.16em] text-ink-400">
        © {year} {site.legalName}
      </div>
    </footer>
  );
}
