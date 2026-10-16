import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import {
  sendOrderEmails,
  sendPaymentFailedEmail,
  type OrderEmailSummary,
} from "@/lib/order-email";
import { getStripe } from "@/lib/stripe";

export const runtime = "nodejs";

type ShippingAddress = {
  line1?: string | null;
  line2?: string | null;
  city?: string | null;
  state?: string | null;
  postal_code?: string | null;
  country?: string | null;
};

function addressLines(
  name?: string | null,
  address?: ShippingAddress | null
) {
  const lines: string[] = [];
  if (name) lines.push(name);
  if (address?.line1) lines.push(address.line1);
  if (address?.line2) lines.push(address.line2);
  const cityLine = [address?.city, address?.state, address?.postal_code]
    .filter(Boolean)
    .join(", ");
  if (cityLine) lines.push(cityLine);
  if (address?.country && address.country !== "US") lines.push(address.country);
  return lines;
}

function shippingFromSession(session: Stripe.Checkout.Session) {
  const details = session.collected_information?.shipping_details;
  return addressLines(details?.name, details?.address);
}

function summarize(session: Stripe.Checkout.Session): OrderEmailSummary {
  const lineItems = (session.line_items?.data ?? []).map((item) => ({
    name: item.description || "Item",
    qty: String(item.quantity ?? 1),
    totalCents: item.amount_total ?? 0,
  }));

  const shippingCents = session.shipping_cost?.amount_total ?? 0;
  const totalCents = session.amount_total ?? 0;
  const subtotalCents =
    session.amount_subtotal ?? Math.max(0, totalCents - shippingCents);

  return {
    sessionId: session.id,
    buyerName:
      session.collected_information?.shipping_details?.name ||
      session.customer_details?.name ||
      undefined,
    buyerEmail: session.customer_details?.email || undefined,
    buyerPhone: session.customer_details?.phone || undefined,
    lineItems,
    shippingAddress: shippingFromSession(session),
    subtotalCents,
    shippingCents,
    totalCents,
  };
}

async function fulfill(sessionId: string) {
  const stripe = getStripe();
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items"],
  });

  if (session.metadata?.source !== "a3powersports-shop") {
    return;
  }

  if (session.payment_status === "unpaid") {
    return;
  }

  await sendOrderEmails(summarize(session));
}

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");
  const secret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !secret) {
    console.error("Stripe webhook signature or secret is missing.");
    return NextResponse.json(
      { error: "Webhook is not configured." },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    const stripe = getStripe();
    event = await stripe.webhooks.constructEventAsync(body, signature, secret);
  } catch (error) {
    console.error("Stripe webhook signature verification failed:", error);
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
      case "checkout.session.async_payment_succeeded": {
        const session = event.data.object as Stripe.Checkout.Session;
        if (session.payment_status === "unpaid") break;
        await fulfill(session.id);
        break;
      }
      case "checkout.session.async_payment_failed": {
        const session = event.data.object as Stripe.Checkout.Session;
        if (session.metadata?.source !== "a3powersports-shop") break;
        await sendPaymentFailedEmail(
          session.id,
          session.customer_details?.email ?? undefined
        );
        break;
      }
      default:
        break;
    }
  } catch (error) {
    console.error("Stripe webhook handler failed:", error);
    return NextResponse.json(
      { error: "Webhook handler failed." },
      { status: 500 }
    );
  }

  return NextResponse.json({ received: true });
}
