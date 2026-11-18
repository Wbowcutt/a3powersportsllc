"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  cartLineKey,
  getProduct,
  getProductColor,
  getProductSize,
  type Product,
  type ProductColor,
  type ProductSize,
} from "@/lib/products";

export type CartItem = {
  productId: string;
  sizeId?: string;
  colorId?: string;
  quantity: number;
};

type CartLine = CartItem & {
  key: string;
  product: Product;
  size: ProductSize | null;
  color: ProductColor | null;
};

type CartContextValue = {
  itemCount: number;
  subtotalCents: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (
    productId: string,
    quantity?: number,
    sizeId?: string,
    colorId?: string
  ) => void;
  removeItem: (productId: string, sizeId?: string, colorId?: string) => void;
  setQuantity: (
    productId: string,
    quantity: number,
    sizeId?: string,
    colorId?: string
  ) => void;
  clearCart: () => void;
  lines: CartLine[];
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "a3-shop-cart-v2";

function sameLine(
  item: CartItem,
  productId: string,
  sizeId?: string,
  colorId?: string
) {
  return (
    item.productId === productId &&
    item.sizeId === sizeId &&
    item.colorId === colorId
  );
}

function normalizeItem(raw: unknown): CartItem | null {
  if (!raw || typeof raw !== "object") return null;
  const item = raw as Record<string, unknown>;
  if (typeof item.productId !== "string") return null;
  if (!getProduct(item.productId)) return null;
  const quantity = Number(item.quantity);
  if (!Number.isFinite(quantity) || quantity < 1) return null;

  const product = getProduct(item.productId)!;
  let sizeId: string | undefined;
  if (product.sizes?.length) {
    const requested =
      typeof item.sizeId === "string" ? item.sizeId : product.sizes[0].id;
    sizeId = getProductSize(item.productId, requested)?.id;
  }

  let colorId: string | undefined;
  if (product.colors?.length) {
    const requested =
      typeof item.colorId === "string" ? item.colorId : product.colors[0].id;
    colorId = getProductColor(item.productId, requested)?.id;
  }

  return {
    productId: item.productId,
    sizeId,
    colorId,
    quantity: Math.min(20, Math.floor(quantity)),
  };
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as unknown;
        if (Array.isArray(parsed)) {
          setItems(
            parsed
              .map(normalizeItem)
              .filter((item): item is CartItem => Boolean(item))
          );
        }
      }
    } catch {
      // Ignore unreadable cart data.
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const addItem = useCallback(
    (productId: string, quantity = 1, sizeId?: string, colorId?: string) => {
      const product = getProduct(productId);
      if (!product) return;
      const resolvedSizeId = product.sizes?.length
        ? getProductSize(productId, sizeId)?.id
        : undefined;
      const resolvedColorId = product.colors?.length
        ? getProductColor(productId, colorId)?.id
        : undefined;

      setItems((current) => {
        const existing = current.find((item) =>
          sameLine(item, productId, resolvedSizeId, resolvedColorId)
        );
        if (existing) {
          return current.map((item) =>
            sameLine(item, productId, resolvedSizeId, resolvedColorId)
              ? { ...item, quantity: Math.min(20, item.quantity + quantity) }
              : item
          );
        }
        return [
          ...current,
          {
            productId,
            sizeId: resolvedSizeId,
            colorId: resolvedColorId,
            quantity: Math.min(20, quantity),
          },
        ];
      });
      setIsOpen(true);
    },
    []
  );

  const removeItem = useCallback(
    (productId: string, sizeId?: string, colorId?: string) => {
      setItems((current) =>
        current.filter((item) => !sameLine(item, productId, sizeId, colorId))
      );
    },
    []
  );

  const setQuantity = useCallback(
    (productId: string, quantity: number, sizeId?: string, colorId?: string) => {
      if (quantity <= 0) {
        setItems((current) =>
          current.filter((item) => !sameLine(item, productId, sizeId, colorId))
        );
        return;
      }
      setItems((current) =>
        current.map((item) =>
          sameLine(item, productId, sizeId, colorId)
            ? { ...item, quantity: Math.min(20, quantity) }
            : item
        )
      );
    },
    []
  );

  const clearCart = useCallback(() => setItems([]), []);

  const lines = useMemo(
    () =>
      items
        .map((item) => {
          const product = getProduct(item.productId);
          if (!product) return null;
          return {
            ...item,
            key: cartLineKey(item.productId, item.sizeId, item.colorId),
            product,
            size: getProductSize(item.productId, item.sizeId),
            color: getProductColor(item.productId, item.colorId),
          };
        })
        .filter((line): line is CartLine => Boolean(line)),
    [items]
  );

  const itemCount = useMemo(
    () => lines.reduce((sum, line) => sum + line.quantity, 0),
    [lines]
  );

  const subtotalCents = useMemo(
    () =>
      lines.reduce(
        (sum, line) => sum + line.product.priceCents * line.quantity,
        0
      ),
    [lines]
  );

  const value: CartContextValue = {
    itemCount,
    subtotalCents,
    isOpen,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
    addItem,
    removeItem,
    setQuantity,
    clearCart,
    lines,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
