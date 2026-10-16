export type ProductSize = {
  id: string;
  name: string;
  label: string;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  priceCents: number;
  image?: string;
  sizes?: ProductSize[];
};

/**
 * Merchandise catalog. Add an item here when Asa has a name, price, and photo.
 * Photos go in public/shop/ and image is a path like "/shop/tee.png".
 */
export const products: Product[] = [];

/**
 * Flat shipping added on the Stripe checkout page.
 * Leave at 0 to collect a US shipping address with no shipping fee.
 */
export const shipping = {
  name: "Shipping",
  priceCents: 0,
} as const;

export function formatPrice(cents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}

export function getProduct(id: string) {
  return products.find((product) => product.id === id) ?? null;
}

export function getProductSize(productId: string, sizeId?: string) {
  const product = getProduct(productId);
  if (!product?.sizes?.length) return null;
  return (
    product.sizes.find((size) => size.id === sizeId) ?? product.sizes[0] ?? null
  );
}

export function cartLineKey(productId: string, sizeId?: string) {
  return `${productId}::${sizeId ?? ""}`;
}
