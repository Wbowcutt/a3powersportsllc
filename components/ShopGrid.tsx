"use client";

import { useState } from "react";
import Image from "next/image";
import {
  formatPrice,
  products,
  type Product,
  type ProductColor,
  type ProductSize,
} from "@/lib/products";
import { site } from "@/lib/site";
import { useCart } from "./CartProvider";

function defaultColor(product: Product) {
  if (!product.colors?.length) return null;
  return (
    product.colors.find((option) => option.id === "black") ?? product.colors[0]
  );
}

function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [color, setColor] = useState<ProductColor | null>(() => defaultColor(product));
  const [size, setSize] = useState<ProductSize | null>(product.sizes?.[0] ?? null);

  const frontSrc = color?.image || product.image;
  const backSrc = color?.imageBack;
  const colorLabel = color ? ` in ${color.name}` : "";

  return (
    <article className="flex flex-col border border-ink-200 bg-white">
      <div className={`grid bg-ink-100 ${backSrc ? "grid-cols-2" : "grid-cols-1"}`}>
        <div className="relative aspect-square">
          {frontSrc ? (
            <Image
              src={frontSrc}
              alt={`${product.name}${colorLabel}, front`}
              fill
              className="object-contain p-3 sm:p-4"
              sizes={backSrc ? "(max-width: 640px) 50vw, 25vw" : "(max-width: 640px) 100vw, 50vw"}
            />
          ) : (
            <div className="grid h-full place-items-center font-display text-5xl uppercase text-ink-300">
              A3
            </div>
          )}
          {backSrc && (
            <p className="absolute bottom-2 left-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-400">
              Front
            </p>
          )}
        </div>
        {backSrc && (
          <div className="relative aspect-square border-l border-ink-200">
            <Image
              src={backSrc}
              alt={`${product.name}${colorLabel}, back`}
              fill
              className="object-contain p-3 sm:p-4"
              sizes="(max-width: 640px) 50vw, 25vw"
            />
            <p className="absolute bottom-2 left-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-400">
              Back
            </p>
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

        {product.colors && product.colors.length > 0 && (
          <fieldset className="mt-4">
            <legend className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-400">
              Color
              {color ? (
                <span className="ml-2 normal-case tracking-normal text-ink-700">{color.name}</span>
              ) : null}
            </legend>
            <div className="mt-2 grid max-h-40 grid-cols-6 gap-2 overflow-y-auto pr-1 sm:grid-cols-7">
              {product.colors.map((option) => {
                const selected = color?.id === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    aria-label={option.name}
                    aria-pressed={selected}
                    title={option.name}
                    onClick={() => setColor(option)}
                    className={`relative aspect-square overflow-hidden border ${
                      selected
                        ? "border-ink-950 ring-1 ring-ink-950"
                        : "border-ink-300 hover:border-ink-950"
                    }`}
                  >
                    <Image
                      src={option.image}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </button>
                );
              })}
            </div>
          </fieldset>
        )}

        {product.sizes && product.sizes.length > 0 && (
          <fieldset className="mt-4">
            <legend className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-400">
              Size
              {size ? (
                <span className="ml-2 normal-case tracking-normal text-ink-700">{size.name}</span>
              ) : null}
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
          onClick={() => addItem(product.id, 1, size?.id, color?.id)}
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
        Logo tees and hoodies from {site.legalName}. Pick a color and size, then check out on Stripe.
      </p>

      {products.length === 0 ? (
        <div className="mt-12 border border-dashed border-ink-300 bg-white px-6 py-16 text-center">
          <p className="font-display text-3xl uppercase text-ink-950">Nothing listed yet</p>
          <p className="mx-auto mt-4 max-w-md text-ink-500">
            Merchandise will show up here. What {site.contactName} has for sale right now is on Facebook Marketplace.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={site.marketplaceHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex bg-ink-950 px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.16em] text-white hover:bg-racing-600"
            >
              See what&apos;s for sale
            </a>
            <a
              href={site.phoneHref}
              className="inline-flex border border-ink-950 px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.16em] text-ink-950 hover:bg-ink-950 hover:text-white"
            >
              Call or text {site.phone}
            </a>
          </div>
        </div>
      ) : (
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
