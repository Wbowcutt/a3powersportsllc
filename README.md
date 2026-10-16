# A3 Powersports LLC

Website for A3 Powersports LLC. Next.js 15, TypeScript, and Tailwind CSS. The same Cloudflare Workers deploy path as Total Care Service, with a light black-and-red layout built around the shop logo.

Facts on the site come from the brief: Asa, the phone, the email, service work, engine work, upgrades, and tires and rims on a pneumatic tire machine. Address, hours, and reviews are not on the site because they were not in the brief.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Copy `.env.example` to `.env.local` before the contact form, calendar, or shop checkout will work.

## Contact form (Resend)

1. Create a [Resend](https://resend.com) API key.
2. Set `CONTACT_EMAIL` to `a3powersportsllc@gmail.com` (or wherever messages should land).
3. Set `RESEND_FROM_EMAIL` to a verified sender. `onboarding@resend.dev` is only for testing.

## Appointments (Cal.com)

Set `NEXT_PUBLIC_CAL_LINK` to the booking page, for example `asa/service` or `https://cal.com/asa/service`. The Book section embeds that calendar. Until the link is set, the section tells people to call or text.

## Shop (Stripe)

Checkout is a Stripe-hosted Checkout Session. Prices are read on the server from `lib/products.ts`. The cart never sends a price.

Use a [restricted API key](https://docs.stripe.com/keys.md#manage-your-api-keys) (`rk_`) with write access for Checkout Sessions, Products, and Prices. Keep a separate sandbox for local work, and store the key as a secret — never in source.

Webhooks are required before real orders. Fulfillment emails are sent from the webhook, not from the thank-you page.

1. In the Stripe Dashboard, add an endpoint: `https://YOUR_DOMAIN/api/stripe/webhook`
2. Subscribe to:
   - `checkout.session.completed`
   - `checkout.session.async_payment_succeeded`
   - `checkout.session.async_payment_failed`
3. Put the signing secret in `STRIPE_WEBHOOK_SECRET`.
4. For local testing: `stripe listen --forward-to localhost:3000/api/stripe/webhook`

Paid checkouts email Asa and the buyer through Resend, including the ship-to address. Retries use an idempotency key so the same checkout does not send a second pair of emails.

Sales tax is off until there is an active Stripe Tax registration. Do not turn on `automatic_tax` before that.

### Adding merchandise

Edit `lib/products.ts`. Example:

```ts
{
  id: "tee",
  name: "Shop tee",
  description: "Short sleeve shirt.",
  priceCents: 2500,
  image: "/shop/tee.png",
  sizes: [
    { id: "m", name: "Medium", label: "M" },
    { id: "l", name: "Large", label: "L" },
  ],
}
```

Put photos in `public/shop/`. Set `shipping.priceCents` in the same file when a flat shipping rate is decided. `0` collects a US address and does not add a fee.

## Namecheap domain

The live URL goes in `NEXT_PUBLIC_SITE_URL` (no trailing slash). Point the Namecheap domain at hosting after the Worker is deployed. The domain name was not in the brief, so it is not hardcoded.

## Deploy to Cloudflare

Same pattern as Total Care Service, using [`@opennextjs/cloudflare`](https://opennext.js.org/cloudflare).

Build command: `npx @opennextjs/cloudflare build`  
Deploy command: `npx @opennextjs/cloudflare deploy -- --keep-vars`

Set runtime variables on the Worker (Settings → Variables and Secrets), not only as build variables:

- `RESEND_API_KEY` (secret)
- `CONTACT_EMAIL`
- `RESEND_FROM_EMAIL`
- `STRIPE_SECRET_KEY` (secret, restricted key)
- `STRIPE_WEBHOOK_SECRET` (secret)
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_CAL_LINK`

Also set `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_CAL_LINK` as build variables so the client bundle sees them.

From this machine, after `npx wrangler login`:

```bash
npm run deploy
```

## Where to edit copy

- Phone, email, Asa’s name — `lib/site.ts`
- Logo — `public/logo.png` and `components/Logo.tsx`
- Home sections — `components/`
- Merchandise — `lib/products.ts`
