"use client";

import { useEffect, useState } from "react";
import { formatPrice, shipping } from "@/lib/products";
import { useCart } from "./CartProvider";

export default function CartDrawer() {
  const {
    isOpen,
    closeCart,
    lines,
    itemCount,
    subtotalCents,
    setQuantity,
    removeItem,
    clearCart,
  } = useCart();
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    function onPageShow() {
      setStatus("idle");
      setErrorMessage("");
    }
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setStatus("idle");
      setErrorMessage("");
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") closeCart();
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, closeCart]);

  if (!isOpen) return null;

  const totalCents = lines.length === 0 ? 0 : subtotalCents + shipping.priceCents;

  async function handleCheckout() {
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: lines.map((line) => ({
            productId: line.productId,
            sizeId: line.sizeId,
            quantity: line.quantity,
          })),
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Checkout failed. Please try again.");
      }
      if (!data.url) {
        throw new Error("Checkout did not return a payment page.");
      }
      window.location.href = data.url;
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Checkout failed.");
    }
  }

  return (
    <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label="Cart">
      <button
        type="button"
        className="absolute inset-0 bg-ink-950/60"
        aria-label="Close cart"
        onClick={closeCart}
      />
      <aside className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-white shadow-2xl">
        <div className="h-1 bg-racing-500" />
        <div className="flex items-center justify-between border-b border-ink-200 px-5 py-4">
          <div>
            <h2 className="font-display text-2xl uppercase tracking-wide text-ink-950">Cart</h2>
            <p className="text-sm text-ink-400">
              {itemCount} {itemCount === 1 ? "item" : "items"}
            </p>
          </div>
          <button
            type="button"
            onClick={closeCart}
            className="p-2 text-ink-500 hover:text-ink-950"
            aria-label="Close cart"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {lines.length === 0 ? (
            <p className="py-16 text-center text-ink-400">Your cart is empty.</p>
          ) : (
            <ul className="space-y-4">
              {lines.map((line) => (
                <li key={line.key} className="border border-ink-200 p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-ink-950">{line.product.name}</p>
                      {line.size && <p className="mt-0.5 text-xs uppercase tracking-wide text-ink-400">{line.size.name}</p>}
                    </div>
                    <p className="text-sm font-semibold text-ink-950">
                      {formatPrice(line.product.priceCents * line.quantity)}
                    </p>
                  </div>
                  <div className="mt-3 flex items-center gap-3">
                    <label className="sr-only" htmlFor={`qty-${line.key}`}>
                      Quantity for {line.product.name}
                    </label>
                    <input
                      id={`qty-${line.key}`}
                      type="number"
                      min={1}
                      max={20}
                      value={line.quantity}
                      onChange={(event) =>
                        setQuantity(line.productId, Number(event.target.value) || 1, line.sizeId)
                      }
                      className="w-16 border border-ink-300 px-2 py-1 text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => removeItem(line.productId, line.sizeId)}
                      className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-400 hover:text-racing-600"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t border-ink-200 px-5 py-4">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="text-ink-400">Subtotal</span>
            <span className="font-semibold text-ink-950">{formatPrice(subtotalCents)}</span>
          </div>
          {lines.length > 0 && (
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="text-ink-400">{shipping.name}</span>
              <span className="font-semibold text-ink-950">
                {shipping.priceCents > 0 ? formatPrice(shipping.priceCents) : "At checkout"}
              </span>
            </div>
          )}
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm text-ink-400">Total</span>
            <span className="font-display text-2xl text-ink-950">{formatPrice(totalCents)}</span>
          </div>
          {status === "error" && (
            <p className="mb-3 text-sm text-racing-600" role="alert">
              {errorMessage}
            </p>
          )}
          <button
            type="button"
            disabled={lines.length === 0 || status === "loading"}
            onClick={handleCheckout}
            className="w-full bg-ink-950 px-4 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-racing-600 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {status === "loading" ? "Opening Stripe..." : "Checkout with Stripe"}
          </button>
          {lines.length > 0 && (
            <button
              type="button"
              onClick={clearCart}
              className="mt-3 w-full text-xs font-semibold uppercase tracking-[0.14em] text-ink-400 hover:text-ink-950"
            >
              Clear cart
            </button>
          )}
          <p className="mt-3 text-center text-xs leading-relaxed text-ink-400">
            Stripe hosts the payment page and collects the shipping address.
            {shipping.priceCents > 0
              ? ` ${shipping.name} is ${formatPrice(shipping.priceCents)}.`
              : " Shipping cost is confirmed there."}
          </p>
        </div>
      </aside>
    </div>
  );
}
