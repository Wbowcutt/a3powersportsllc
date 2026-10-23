"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import { site } from "@/lib/site";
import { useCart } from "./CartProvider";

const navLinks = [
  { href: "/#services", label: "Services", external: false },
  { href: "/#about", label: "About", external: false },
  { href: "/#book", label: "Book", external: false },
  { href: site.marketplaceHref, label: "For sale", external: true },
  { href: "/shop", label: "Shop", external: false },
  { href: "/#contact", label: "Contact", external: false },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { itemCount, openCart } = useCart();

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="h-1 bg-racing-500" />
      <nav className="border-b border-ink-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 min-[900px]:px-8">
          <Link href="/" aria-label={`${site.legalName} home`} onClick={() => setMenuOpen(false)}>
            <Logo size={52} priority />
          </Link>

          <ul className="hidden items-center gap-7 min-[900px]:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                {link.external ? (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold uppercase tracking-[0.16em] text-ink-700 transition hover:text-racing-600"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    href={link.href}
                    className="text-sm font-semibold uppercase tracking-[0.16em] text-ink-700 transition hover:text-racing-600"
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-3 min-[900px]:flex">
            <button
              type="button"
              onClick={openCart}
              className="relative inline-flex items-center border border-ink-300 px-3 py-2 text-sm font-semibold uppercase tracking-[0.14em] text-ink-800 transition hover:border-ink-950"
              aria-label={`Open cart${itemCount ? `, ${itemCount} items` : ""}`}
            >
              Cart
              {itemCount > 0 && (
                <span className="ml-2 inline-flex h-5 min-w-5 items-center justify-center bg-racing-500 px-1.5 text-xs font-bold text-white">
                  {itemCount}
                </span>
              )}
            </button>
            <Link
              href="/#book"
              className="inline-flex bg-ink-950 px-4 py-2 text-sm font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-racing-600"
            >
              Book
            </Link>
          </div>

          <div className="flex items-center gap-1 min-[900px]:hidden">
            <button
              type="button"
              onClick={openCart}
              className="relative p-2 text-ink-800"
              aria-label={`Open cart${itemCount ? `, ${itemCount} items` : ""}`}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
              {itemCount > 0 && (
                <span className="absolute right-0 top-0 inline-flex h-4 min-w-4 items-center justify-center bg-racing-500 px-1 text-[10px] font-bold text-white">
                  {itemCount}
                </span>
              )}
            </button>
            <button
              type="button"
              className="p-2 text-ink-800"
              aria-expanded={menuOpen}
              aria-label="Toggle navigation menu"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="border-t border-ink-200 bg-white min-[900px]:hidden">
            <ul className="flex flex-col px-4 py-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-2 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-ink-800"
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="block px-2 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-ink-800"
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
              <li className="pt-2">
                <a
                  href={site.phoneHref}
                  className="block bg-ink-950 px-3 py-3 text-center text-sm font-semibold uppercase tracking-[0.14em] text-white"
                  onClick={() => setMenuOpen(false)}
                >
                  Call or text {site.phone}
                </a>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
