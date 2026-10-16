import { NextRequest, NextResponse } from "next/server";
import { site } from "@/lib/site";
import {
  getProduct,
  getProductSize,
  shipping,
} from "@/lib/products";
import { getSiteUrl, getStripe } from "@/lib/stripe";

type CartPayloadItem = {
  productId?: string;
  sizeId?: string;
  quantity?: number;
};

const INTEGRATION_ID = "a3powersports_checkout_mhtkplwq";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const rawItems = Array.isArray(body?.items)
      ? (body.items as CartPayloadItem[])
      : [];

    if (rawItems.length === 0) {
      return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });
    }

    const lineItems = [];

    for (const item of rawItems) {
      const productId = String(item.productId ?? "");
      const quantity = Number(item.quantity);

      if (
        !productId ||
        !Number.isInteger(quantity) ||
        quantity < 1 ||
        quantity > 20
      ) {
        return NextResponse.json({ error: "Invalid cart item." }, { status: 400 });
      }

      const product = getProduct(productId);
      if (!product) {
        return NextResponse.json(
          { error: "That item is no longer in the shop." },
          { status: 400 }
        );
      }

      let name = product.name;
      if (product.sizes?.length) {
        const size = getProductSize(productId, item.sizeId);
        if (!size || (item.sizeId && size.id !== item.sizeId)) {
          return NextResponse.json(
            { error: `Pick a size for ${product.name}.` },
            { status: 400 }
          );
        }
        name = `${product.name} (${size.name})`;
      }

      lineItems.push({
        quantity,
        price_data: {
          currency: "usd" as const,
          unit_amount: product.priceCents,
          product_data: {
            name,
            description: product.description,
          },
        },
      });
    }

    const stripe = getStripe();
    const siteUrl = getSiteUrl();

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      success_url: `${siteUrl}/shop/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/shop`,
      billing_address_collection: "auto",
      shipping_address_collection: {
        allowed_countries: ["US"],
      },
      ...(shipping.priceCents > 0
        ? {
            shipping_options: [
              {
                shipping_rate_data: {
                  type: "fixed_amount" as const,
                  display_name: shipping.name,
                  fixed_amount: {
                    amount: shipping.priceCents,
                    currency: "usd" as const,
                  },
                },
              },
            ],
          }
        : {}),
      phone_number_collection: { enabled: true },
      customer_creation: "if_required",
      metadata: {
        source: "a3powersports-shop",
      },
      payment_intent_data: {
        description: `${site.legalName} shop order`,
      },
      integration_identifier: INTEGRATION_ID,
    });

    if (!session.url) {
      console.error("Stripe checkout session missing URL", session.id);
      return NextResponse.json(
        { error: "Checkout could not be started." },
        { status: 500 }
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    if (
      error instanceof Error &&
      (error.message.includes("STRIPE_SECRET_KEY") ||
        error.message.includes("NEXT_PUBLIC_SITE_URL"))
    ) {
      console.error("Checkout is not configured:", error.message);
      return NextResponse.json(
        {
          error: `Online checkout isn't set up yet. Call or text ${site.contactName} at ${site.phone}.`,
        },
        { status: 500 }
      );
    }

    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Checkout could not be started. Please try again." },
      { status: 500 }
    );
  }
}
