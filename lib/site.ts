export const site = {
  name: "A3 Powersports",
  legalName: "A3 Powersports LLC",
  tagline: "Powersports repair",
  contactName: "Asa",
  phone: "(919) 353-8193",
  phoneHref: "tel:+19193538193",
  smsHref: "sms:+19193538193",
  email: "a3powersportsllc@gmail.com",
  // Current for-sale listings on Facebook Marketplace.
  marketplaceHref:
    "https://www.facebook.com/marketplace/profile/100001714541378/",
} as const;

function normalizeCalLink(value: string) {
  return value
    .trim()
    .replace(/^https?:\/\/(www\.)?cal\.com\//i, "")
    .replace(/^\/+/, "")
    .replace(/\/+$/, "");
}

/** Cal.com username/event, or empty until NEXT_PUBLIC_CAL_LINK is set. */
export const calLink = normalizeCalLink(process.env.NEXT_PUBLIC_CAL_LINK ?? "");
