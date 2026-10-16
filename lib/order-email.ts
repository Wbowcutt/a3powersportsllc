import { Resend } from "resend";
import { formatPrice } from "@/lib/products";
import { site } from "@/lib/site";

function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export type OrderEmailSummary = {
  sessionId: string;
  buyerName?: string;
  buyerEmail?: string;
  buyerPhone?: string;
  lineItems: { name: string; qty: string; totalCents: number }[];
  shippingAddress: string[];
  subtotalCents: number;
  shippingCents: number;
  totalCents: number;
};

function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_EMAIL;
  const fromEmail = process.env.RESEND_FROM_EMAIL;

  if (!apiKey || !toEmail || !fromEmail) {
    throw new Error("Resend is not configured.");
  }

  return { resend: new Resend(apiKey), toEmail, fromEmail };
}

function addressBlock(lines: string[]) {
  if (lines.length === 0) return "No shipping address collected.";
  return lines.join("\n");
}

export async function sendOrderEmails(summary: OrderEmailSummary) {
  const { resend, toEmail, fromEmail } = getResend();
  const itemLines = summary.lineItems
    .map(
      (item) =>
        `${item.qty} × ${item.name} — ${formatPrice(item.totalCents)}`
    )
    .join("\n");
  const ship = addressBlock(summary.shippingAddress);
  const totals = [
    `Subtotal: ${formatPrice(summary.subtotalCents)}`,
    `Shipping: ${formatPrice(summary.shippingCents)}`,
    `Total: ${formatPrice(summary.totalCents)}`,
  ].join("\n");

  const merchantText = [
    `New shop order for ${site.legalName}`,
    "",
    `Checkout: ${summary.sessionId}`,
    summary.buyerName ? `Name: ${summary.buyerName}` : "",
    summary.buyerEmail ? `Email: ${summary.buyerEmail}` : "",
    summary.buyerPhone ? `Phone: ${summary.buyerPhone}` : "",
    "",
    "Items:",
    itemLines || "(no line items)",
    "",
    "Ship to:",
    ship,
    "",
    totals,
  ]
    .filter((line) => line !== "")
    .join("\n");

  const safeItems = summary.lineItems
    .map(
      (item) =>
        `<li>${escapeHtml(item.qty)} × ${escapeHtml(item.name)} — ${escapeHtml(formatPrice(item.totalCents))}</li>`
    )
    .join("");
  const safeShip = summary.shippingAddress.map(escapeHtml).join("<br />");

  const merchantHtml = `
    <h2>New shop order</h2>
    <p><strong>Checkout:</strong> ${escapeHtml(summary.sessionId)}</p>
    ${summary.buyerName ? `<p><strong>Name:</strong> ${escapeHtml(summary.buyerName)}</p>` : ""}
    ${summary.buyerEmail ? `<p><strong>Email:</strong> ${escapeHtml(summary.buyerEmail)}</p>` : ""}
    ${summary.buyerPhone ? `<p><strong>Phone:</strong> ${escapeHtml(summary.buyerPhone)}</p>` : ""}
    <p><strong>Items</strong></p>
    <ul>${safeItems}</ul>
    <p><strong>Ship to</strong><br />${safeShip || "No shipping address collected."}</p>
    <p>${escapeHtml(totals).replace(/\n/g, "<br />")}</p>
  `;

  const { error: merchantError } = await resend.emails.send(
    {
      from: fromEmail,
      to: toEmail,
      replyTo: summary.buyerEmail,
      subject: `Shop order — ${site.legalName}`,
      text: merchantText,
      html: merchantHtml,
    },
    { idempotencyKey: `a3-order-${summary.sessionId}-merchant` }
  );

  if (merchantError) {
    throw new Error(merchantError.message || "Merchant order email failed.");
  }

  if (!summary.buyerEmail) return;

  const buyerText = [
    `Thanks for your order from ${site.legalName}.`,
    "",
    "Items:",
    itemLines || "(no line items)",
    "",
    "Ship to:",
    ship,
    "",
    totals,
    "",
    `Questions? Call or text ${site.contactName} at ${site.phone}, or email ${site.email}.`,
  ].join("\n");

  const { error: buyerError } = await resend.emails.send(
    {
      from: fromEmail,
      to: summary.buyerEmail,
      replyTo: toEmail,
      subject: `Order confirmation — ${site.legalName}`,
      text: buyerText,
      html: `
        <h2>Thanks for your order</h2>
        <p>This confirms payment to ${escapeHtml(site.legalName)}.</p>
        <ul>${safeItems}</ul>
        <p><strong>Ship to</strong><br />${safeShip || "No shipping address collected."}</p>
        <p>${escapeHtml(totals).replace(/\n/g, "<br />")}</p>
        <p>Questions? Call or text ${escapeHtml(site.contactName)} at ${escapeHtml(site.phone)}, or email ${escapeHtml(site.email)}.</p>
      `,
    },
    { idempotencyKey: `a3-order-${summary.sessionId}-buyer` }
  );

  if (buyerError) {
    throw new Error(buyerError.message || "Customer order email failed.");
  }
}

export async function sendPaymentFailedEmail(sessionId: string, buyerEmail?: string) {
  const { resend, toEmail, fromEmail } = getResend();
  const { error } = await resend.emails.send(
    {
      from: fromEmail,
      to: toEmail,
      subject: `Shop payment failed — ${site.legalName}`,
      text: [
        `A shop checkout did not complete.`,
        `Checkout: ${sessionId}`,
        buyerEmail ? `Buyer email: ${buyerEmail}` : "",
      ]
        .filter(Boolean)
        .join("\n"),
    },
    { idempotencyKey: `a3-order-${sessionId}-failed` }
  );

  if (error) {
    throw new Error(error.message || "Payment failed email was not sent.");
  }
}
