"use client";

import { useState } from "react";
import Image from "next/image";
import { formatPrice, products, type Product, type ProductSize } from "@/lib/products";
import { site } from "@/lib/site";
import { useCart } from "./CartProvider";

function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [size, setSize] = useState<ProductSize | null>(product.sizes?.[0] ?? null);

  return (
    <article className="flex flex-col border border-ink-200 bg-white">
      <div className="relative aspect-square bg-ink-100">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="grid h-full place-items-center font-display text-5xl uppercase text-ink-300">
            A3
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h2 className="font-display text-2xl uppercase leading-none text-ink-950">
            {product.name}
          </h2>
          <p className="shrink-0 font-semibold text-ink-950">{formatPrice(product.priceCents)}</p>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-ink-500">{product.description}</p>

        {product.sizes && product.sizes.length > 0 && (
          <fieldset className="mt-4">
            <legend className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-400">
              Size{size ? <span className="ml-2 normal-case tracking-normal text-ink-700">{size.name}</span> : null}
            </legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.sizes.map((option) => {
                const selected = size?.id === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setSize(option)}
                    className={`min-w-10 border px-3 py-1.5 text-sm font-semibold ${
                      selected
                        ? "border-ink-950 bg-ink-950 text-white"
                        : "border-ink-300 text-ink-700 hover:border-ink-950"
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </fieldset>
        )}

        <button
          type="button"
          onClick={() => addItem(product.id, 1, size?.id)}
          className="mt-5 bg-ink-950 px-4 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-racing-600"
        >
          Add to cart
        </button>
      </div>
    </article>
  );
}

export default function ShopGrid() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-racing-600">
        Merchandise
      </p>
      <h1 className="mt-3 font-display text-5xl uppercase leading-none text-ink-950 sm:text-6xl">
        Shop
      </h1>
      <div className="mt-4 h-1 w-16 bg-racing-500" />
      <p className="mt-5 max-w-2xl text-lg text-ink-500">
        Gear from {site.legalName}. Checkout is on Stripe.
      </p>

      {products.length === 0 ? (
        <div className="mt-12 border border-dashed border-ink-300 bg-white px-6 py-16 text-center">
          <p className="font-display text-3xl uppercase text-ink-950">Nothing listed yet</p>
          <p className="mx-auto mt-4 max-w-md text-ink-500">
            Merchandise will show up here. Call or text {site.contactName} if you need something from the shop.
          </p>
          <a
            href={site.phoneHref}
            className="mt-8 inline-flex bg-ink-950 px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.16em] text-white hover:bg-racing-600"
          >
            Call or text {site.phone}
          </a>
        </div>
      ) : (
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
