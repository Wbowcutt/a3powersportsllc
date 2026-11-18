import fs from "node:fs";
import path from "node:path";

const NAME_MAP = {
  "antqu-chry-red": "Antique Cherry Red",
  "antqu-sapphire": "Antique Sapphire",
  ash: "Ash",
  azalea: "Azalea",
  black: "Black",
  "cardinal-red": "Cardinal Red",
  "carolina-blue": "Carolina Blue",
  charcoal: "Charcoal",
  "cherry-red": "Cherry Red",
  daisy: "Daisy",
  "dark-chocolate": "Dark Chocolate",
  "dark-heather": "Dark Heather",
  "electric-green": "Electric Green",
  forest: "Forest",
  garnet: "Garnet",
  gold: "Gold",
  gphheather: "Graphite Heather",
  "graphite-hthr": "Graphite Heather",
  gravel: "Gravel",
  heliconia: "Heliconia",
  htsptdkgrn: "Heather Sport Dark Green",
  htsptdkmar: "Heather Sport Dark Maroon",
  htsptdknvy: "Heather Sport Dark Navy",
  htsptroyal: "Heather Sport Royal",
  htsptscar: "Heather Sport Scarlet",
  "indigo-blue": "Indigo Blue",
  "irish-green": "Irish Green",
  "jade-dome": "Jade Dome",
  "kelly-green": "Kelly Green",
  "light-blue": "Light Blue",
  "light-pink": "Light Pink",
  lime: "Lime",
  maroon: "Maroon",
  "military-green": "Military Green",
  mintgreen: "Mint Green",
  navy: "Navy",
  oldgold: "Old Gold",
  orange: "Orange",
  orchid: "Orchid",
  purple: "Purple",
  red: "Red",
  royal: "Royal",
  "safety-green": "Safety Green",
  "safety-pink": "Safety Pink",
  sand: "Sand",
  sapphire: "Sapphire",
  "s-orange": "Safety Orange",
  "sport-grey": "Sport Grey",
  sportroyal: "Sport Royal",
  sptdkgreen: "Sport Dark Green",
  sptdknavy: "Sport Dark Navy",
  sptscarred: "Sport Scarlet Red",
  "tennessee-orng": "Tennessee Orange",
  "texas-orange": "Texas Orange",
  violet: "Violet",
  white: "White",
};

function titleFromSlug(slug) {
  if (NAME_MAP[slug]) return NAME_MAP[slug];
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function loadColors(dir, urlPrefix) {
  const files = fs.readdirSync(dir);
  const fronts = files.filter((name) => name.endsWith("-front.png"));
  return fronts
    .map((file) => {
      const id = file.replace(/-front\.png$/, "");
      const backFile = `${id}-back.png`;
      const color = {
        id,
        name: titleFromSlug(id),
        image: `${urlPrefix}/${file}`,
      };
      if (files.includes(backFile)) {
        color.imageBack = `${urlPrefix}/${backFile}`;
      }
      return color;
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}

function fmtColor(color) {
  const lines = [
    "    {",
    `      id: ${JSON.stringify(color.id)},`,
    `      name: ${JSON.stringify(color.name)},`,
    `      image: ${JSON.stringify(color.image)},`,
  ];
  if (color.imageBack) {
    lines.push(`      imageBack: ${JSON.stringify(color.imageBack)},`);
  }
  lines.push("    }");
  return lines.join("\n");
}

const tee = loadColors(path.join("public", "shop", "tee"), "/shop/tee");
const hoodie = loadColors(path.join("public", "shop", "hoodie"), "/shop/hoodie");

const out = `export type ProductSize = {
  id: string;
  name: string;
  label: string;
};

export type ProductColor = {
  id: string;
  name: string;
  image: string;
  imageBack?: string;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  priceCents: number;
  image?: string;
  sizes?: ProductSize[];
  colors?: ProductColor[];
};

const apparelSizes: ProductSize[] = [
  { id: "s", name: "Small", label: "S" },
  { id: "m", name: "Medium", label: "M" },
  { id: "l", name: "Large", label: "L" },
  { id: "xl", name: "X-Large", label: "XL" },
  { id: "2xl", name: "2X-Large", label: "2XL" },
];

/**
 * Merchandise catalog.
 * Prices are starter amounts — change them here when Asa confirms retail pricing.
 * Photos live in public/shop/tee and public/shop/hoodie.
 */
export const products: Product[] = [
  {
    id: "logo-tee",
    name: "Logo tee",
    description:
      "Gildan heavy cotton short sleeve with the A3 Powersports mark on the left chest.",
    priceCents: 2800,
    image: "/shop/tee/black-front.png",
    sizes: apparelSizes,
    colors: [
${tee.map(fmtColor).join(",\n")}
    ],
  },
  {
    id: "logo-hoodie",
    name: "Logo hoodie",
    description:
      "Gildan heavy blend pullover hoodie with the A3 Powersports mark on the left chest.",
    priceCents: 4800,
    image: "/shop/hoodie/black-front.png",
    sizes: apparelSizes,
    colors: [
${hoodie.map(fmtColor).join(",\n")}
    ],
  },
];

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

export function getProductColor(productId: string, colorId?: string) {
  const product = getProduct(productId);
  if (!product?.colors?.length) return null;
  return (
    product.colors.find((color) => color.id === colorId) ??
    product.colors[0] ??
    null
  );
}

export function cartLineKey(
  productId: string,
  sizeId?: string,
  colorId?: string
) {
  return \`\${productId}::\${colorId ?? ""}::\${sizeId ?? ""}\`;
}
`;

fs.writeFileSync("lib/products.ts", out);
console.log(
  `Wrote products.ts (${tee.length} tee colors, ${hoodie.length} hoodie colors)`
);
