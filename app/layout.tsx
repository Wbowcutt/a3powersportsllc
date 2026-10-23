import type { Metadata, Viewport } from "next";
import { Barlow, Oswald } from "next/font/google";
import { CartProvider } from "@/components/CartProvider";
import CartDrawer from "@/components/CartDrawer";
import { site } from "@/lib/site";
import "./globals.css";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-barlow",
});

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-oswald",
});

const metadataBase = new URL(
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "http://localhost:3000"
);

export const metadata: Metadata = {
  metadataBase,
  title: `${site.legalName} | Powersports Repair`,
  description:
    "A3 Powersports LLC is a trustworthy powersports repair shop for small jobs, service work, engine work, upgrades, tire swaps, and dirt bike tires. Call or text Asa at (919) 353-8193.",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: `${site.legalName} | Powersports Repair`,
    description:
      "Small jobs, service work, engine work, upgrades, and tires and rims. Call or text Asa.",
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
      <body className={`${barlow.variable} ${oswald.variable} font-sans antialiased`}>
        <CartProvider>
          {children}
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
