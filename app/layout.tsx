import type { Metadata, Viewport } from "next";
import { CartProvider } from "@/components/CartProvider";
import CartDrawer from "@/components/CartDrawer";
import { site } from "@/lib/site";
import "@fontsource/barlow/400.css";
import "@fontsource/barlow/500.css";
import "@fontsource/barlow/600.css";
import "@fontsource/barlow/700.css";
import "@fontsource/oswald/500.css";
import "@fontsource/oswald/600.css";
import "@fontsource/oswald/700.css";
import "./globals.css";

const metadataBase = new URL(
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "http://localhost:3000"
);

export const metadata: Metadata = {
  metadataBase,
  title: `${site.legalName} | Powersports Repair`,
  description:
    "A trustworthy shop, willing to fix any off-road machine in a timely manner the right way the first time. Any & all service work, repair work, & tire swaps. Call or text Asa at (919) 353-8193.",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: `${site.legalName} | Powersports Repair`,
    description:
      "A trustworthy shop, willing to fix any off-road machine in a timely manner the right way the first time. Any & all service work, repair work, & tire swaps.",
    images: ["/logo.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#111111",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-sans antialiased">
        <CartProvider>
          {children}
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
