export type ProductSize = {
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
    {
      id: "ash",
      name: "Ash",
      image: "/shop/tee/ash-front.png",
      imageBack: "/shop/tee/ash-back.png",
    },
    {
      id: "azalea",
      name: "Azalea",
      image: "/shop/tee/azalea-front.png",
      imageBack: "/shop/tee/azalea-back.png",
    },
    {
      id: "black",
      name: "Black",
      image: "/shop/tee/black-front.png",
      imageBack: "/shop/tee/black-back.png",
    },
    {
      id: "carolina-blue",
      name: "Carolina Blue",
      image: "/shop/tee/carolina-blue-front.png",
      imageBack: "/shop/tee/carolina-blue-back.png",
    },
    {
      id: "daisy",
      name: "Daisy",
      image: "/shop/tee/daisy-front.png",
      imageBack: "/shop/tee/daisy-back.png",
    },
    {
      id: "dark-heather",
      name: "Dark Heather",
      image: "/shop/tee/dark-heather-front.png",
      imageBack: "/shop/tee/dark-heather-back.png",
    },
    {
      id: "electric-green",
      name: "Electric Green",
      image: "/shop/tee/electric-green-front.png",
      imageBack: "/shop/tee/electric-green-back.png",
    },
    {
      id: "forest",
      name: "Forest",
      image: "/shop/tee/forest-front.png",
      imageBack: "/shop/tee/forest-back.png",
    },
    {
      id: "gold",
      name: "Gold",
      image: "/shop/tee/gold-front.png",
      imageBack: "/shop/tee/gold-back.png",
    },
    {
      id: "graphite-hthr",
      name: "Graphite Heather",
      image: "/shop/tee/graphite-hthr-front.png",
      imageBack: "/shop/tee/graphite-hthr-back.png",
    },
    {
      id: "gravel",
      name: "Gravel",
      image: "/shop/tee/gravel-front.png",
      imageBack: "/shop/tee/gravel-back.png",
    },
    {
      id: "htsptdknvy",
      name: "Heather Sport Dark Navy",
      image: "/shop/tee/htsptdknvy-front.png",
      imageBack: "/shop/tee/htsptdknvy-back.png",
    },
    {
      id: "htsptroyal",
      name: "Heather Sport Royal",
      image: "/shop/tee/htsptroyal-front.png",
      imageBack: "/shop/tee/htsptroyal-back.png",
    },
    {
      id: "htsptscar",
      name: "Heather Sport Scarlet",
      image: "/shop/tee/htsptscar-front.png",
      imageBack: "/shop/tee/htsptscar-back.png",
    },
    {
      id: "heliconia",
      name: "Heliconia",
      image: "/shop/tee/heliconia-front.png",
      imageBack: "/shop/tee/heliconia-back.png",
    },
    {
      id: "irish-green",
      name: "Irish Green",
      image: "/shop/tee/irish-green-front.png",
      imageBack: "/shop/tee/irish-green-back.png",
    },
    {
      id: "jade-dome",
      name: "Jade Dome",
      image: "/shop/tee/jade-dome-front.png",
      imageBack: "/shop/tee/jade-dome-back.png",
    },
    {
      id: "kelly-green",
      name: "Kelly Green",
      image: "/shop/tee/kelly-green-front.png",
      imageBack: "/shop/tee/kelly-green-back.png",
    },
    {
      id: "light-blue",
      name: "Light Blue",
      image: "/shop/tee/light-blue-front.png",
      imageBack: "/shop/tee/light-blue-back.png",
    },
    {
      id: "light-pink",
      name: "Light Pink",
      image: "/shop/tee/light-pink-front.png",
      imageBack: "/shop/tee/light-pink-back.png",
    },
    {
      id: "lime",
      name: "Lime",
      image: "/shop/tee/lime-front.png",
      imageBack: "/shop/tee/lime-back.png",
    },
    {
      id: "maroon",
      name: "Maroon",
      image: "/shop/tee/maroon-front.png",
      imageBack: "/shop/tee/maroon-back.png",
    },
    {
      id: "navy",
      name: "Navy",
      image: "/shop/tee/navy-front.png",
      imageBack: "/shop/tee/navy-back.png",
    },
    {
      id: "orange",
      name: "Orange",
      image: "/shop/tee/orange-front.png",
      imageBack: "/shop/tee/orange-back.png",
    },
    {
      id: "orchid",
      name: "Orchid",
      image: "/shop/tee/orchid-front.png",
      imageBack: "/shop/tee/orchid-back.png",
    },
    {
      id: "purple",
      name: "Purple",
      image: "/shop/tee/purple-front.png",
      imageBack: "/shop/tee/purple-back.png",
    },
    {
      id: "red",
      name: "Red",
      image: "/shop/tee/red-front.png",
      imageBack: "/shop/tee/red-back.png",
    },
    {
      id: "royal",
      name: "Royal",
      image: "/shop/tee/royal-front.png",
      imageBack: "/shop/tee/royal-back.png",
    },
    {
      id: "safety-green",
      name: "Safety Green",
      image: "/shop/tee/safety-green-front.png",
      imageBack: "/shop/tee/safety-green-back.png",
    },
    {
      id: "sand",
      name: "Sand",
      image: "/shop/tee/sand-front.png",
      imageBack: "/shop/tee/sand-back.png",
    },
    {
      id: "sapphire",
      name: "Sapphire",
      image: "/shop/tee/sapphire-front.png",
      imageBack: "/shop/tee/sapphire-back.png",
    },
    {
      id: "sptdkgreen",
      name: "Sport Dark Green",
      image: "/shop/tee/sptdkgreen-front.png",
      imageBack: "/shop/tee/sptdkgreen-back.png",
    },
    {
      id: "sptdknavy",
      name: "Sport Dark Navy",
      image: "/shop/tee/sptdknavy-front.png",
      imageBack: "/shop/tee/sptdknavy-back.png",
    },
    {
      id: "sport-grey",
      name: "Sport Grey",
      image: "/shop/tee/sport-grey-front.png",
      imageBack: "/shop/tee/sport-grey-back.png",
    },
    {
      id: "sportroyal",
      name: "Sport Royal",
      image: "/shop/tee/sportroyal-front.png",
      imageBack: "/shop/tee/sportroyal-back.png",
    },
    {
      id: "sptscarred",
      name: "Sport Scarlet Red",
      image: "/shop/tee/sptscarred-front.png",
      imageBack: "/shop/tee/sptscarred-back.png",
    },
    {
      id: "tennessee-orng",
      name: "Tennessee Orange",
      image: "/shop/tee/tennessee-orng-front.png",
      imageBack: "/shop/tee/tennessee-orng-back.png",
    },
    {
      id: "texas-orange",
      name: "Texas Orange",
      image: "/shop/tee/texas-orange-front.png",
      imageBack: "/shop/tee/texas-orange-back.png",
    },
    {
      id: "white",
      name: "White",
      image: "/shop/tee/white-front.png",
      imageBack: "/shop/tee/white-back.png",
    }
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
    {
      id: "antqu-chry-red",
      name: "Antique Cherry Red",
      image: "/shop/hoodie/antqu-chry-red-front.png",
      imageBack: "/shop/hoodie/antqu-chry-red-back.png",
    },
    {
      id: "antqu-sapphire",
      name: "Antique Sapphire",
      image: "/shop/hoodie/antqu-sapphire-front.png",
      imageBack: "/shop/hoodie/antqu-sapphire-back.png",
    },
    {
      id: "ash",
      name: "Ash",
      image: "/shop/hoodie/ash-front.png",
      imageBack: "/shop/hoodie/ash-back.png",
    },
    {
      id: "azalea",
      name: "Azalea",
      image: "/shop/hoodie/azalea-front.png",
      imageBack: "/shop/hoodie/azalea-back.png",
    },
    {
      id: "black",
      name: "Black",
      image: "/shop/hoodie/black-front.png",
      imageBack: "/shop/hoodie/black-back.png",
    },
    {
      id: "cardinal-red",
      name: "Cardinal Red",
      image: "/shop/hoodie/cardinal-red-front.png",
      imageBack: "/shop/hoodie/cardinal-red-back.png",
    },
    {
      id: "carolina-blue",
      name: "Carolina Blue",
      image: "/shop/hoodie/carolina-blue-front.png",
      imageBack: "/shop/hoodie/carolina-blue-back.png",
    },
    {
      id: "charcoal",
      name: "Charcoal",
      image: "/shop/hoodie/charcoal-front.png",
      imageBack: "/shop/hoodie/charcoal-back.png",
    },
    {
      id: "cherry-red",
      name: "Cherry Red",
      image: "/shop/hoodie/cherry-red-front.png",
      imageBack: "/shop/hoodie/cherry-red-back.png",
    },
    {
      id: "dark-chocolate",
      name: "Dark Chocolate",
      image: "/shop/hoodie/dark-chocolate-front.png",
      imageBack: "/shop/hoodie/dark-chocolate-back.png",
    },
    {
      id: "dark-heather",
      name: "Dark Heather",
      image: "/shop/hoodie/dark-heather-front.png",
      imageBack: "/shop/hoodie/dark-heather-back.png",
    },
    {
      id: "forest",
      name: "Forest",
      image: "/shop/hoodie/forest-front.png",
      imageBack: "/shop/hoodie/forest-back.png",
    },
    {
      id: "garnet",
      name: "Garnet",
      image: "/shop/hoodie/garnet-front.png",
      imageBack: "/shop/hoodie/garnet-back.png",
    },
    {
      id: "gold",
      name: "Gold",
      image: "/shop/hoodie/gold-front.png",
      imageBack: "/shop/hoodie/gold-back.png",
    },
    {
      id: "gphheather",
      name: "Graphite Heather",
      image: "/shop/hoodie/gphheather-front.png",
      imageBack: "/shop/hoodie/gphheather-back.png",
    },
    {
      id: "htsptdkgrn",
      name: "Heather Sport Dark Green",
      image: "/shop/hoodie/htsptdkgrn-front.png",
      imageBack: "/shop/hoodie/htsptdkgrn-back.png",
    },
    {
      id: "htsptdkmar",
      name: "Heather Sport Dark Maroon",
      image: "/shop/hoodie/htsptdkmar-front.png",
      imageBack: "/shop/hoodie/htsptdkmar-back.png",
    },
    {
      id: "htsptdknvy",
      name: "Heather Sport Dark Navy",
      image: "/shop/hoodie/htsptdknvy-front.png",
      imageBack: "/shop/hoodie/htsptdknvy-back.png",
    },
    {
      id: "htsptroyal",
      name: "Heather Sport Royal",
      image: "/shop/hoodie/htsptroyal-front.png",
      imageBack: "/shop/hoodie/htsptroyal-back.png",
    },
    {
      id: "htsptscar",
      name: "Heather Sport Scarlet",
      image: "/shop/hoodie/htsptscar-front.png",
      imageBack: "/shop/hoodie/htsptscar-back.png",
    },
    {
      id: "heliconia",
      name: "Heliconia",
      image: "/shop/hoodie/heliconia-front.png",
      imageBack: "/shop/hoodie/heliconia-back.png",
    },
    {
      id: "indigo-blue",
      name: "Indigo Blue",
      image: "/shop/hoodie/indigo-blue-front.png",
      imageBack: "/shop/hoodie/indigo-blue-back.png",
    },
    {
      id: "irish-green",
      name: "Irish Green",
      image: "/shop/hoodie/irish-green-front.png",
      imageBack: "/shop/hoodie/irish-green-back.png",
    },
    {
      id: "light-blue",
      name: "Light Blue",
      image: "/shop/hoodie/light-blue-front.png",
      imageBack: "/shop/hoodie/light-blue-back.png",
    },
    {
      id: "light-pink",
      name: "Light Pink",
      image: "/shop/hoodie/light-pink-front.png",
      imageBack: "/shop/hoodie/light-pink-back.png",
    },
    {
      id: "maroon",
      name: "Maroon",
      image: "/shop/hoodie/maroon-front.png",
      imageBack: "/shop/hoodie/maroon-back.png",
    },
    {
      id: "military-green",
      name: "Military Green",
      image: "/shop/hoodie/military-green-front.png",
      imageBack: "/shop/hoodie/military-green-back.png",
    },
    {
      id: "mintgreen",
      name: "Mint Green",
      image: "/shop/hoodie/mintgreen-front.png",
      imageBack: "/shop/hoodie/mintgreen-back.png",
    },
    {
      id: "navy",
      name: "Navy",
      image: "/shop/hoodie/navy-front.png",
      imageBack: "/shop/hoodie/navy-back.png",
    },
    {
      id: "oldgold",
      name: "Old Gold",
      image: "/shop/hoodie/oldgold-front.png",
      imageBack: "/shop/hoodie/oldgold-back.png",
    },
    {
      id: "orange",
      name: "Orange",
      image: "/shop/hoodie/orange-front.png",
      imageBack: "/shop/hoodie/orange-back.png",
    },
    {
      id: "orchid",
      name: "Orchid",
      image: "/shop/hoodie/orchid-front.png",
      imageBack: "/shop/hoodie/orchid-back.png",
    },
    {
      id: "purple",
      name: "Purple",
      image: "/shop/hoodie/purple-front.png",
      imageBack: "/shop/hoodie/purple-back.png",
    },
    {
      id: "red",
      name: "Red",
      image: "/shop/hoodie/red-front.png",
      imageBack: "/shop/hoodie/red-back.png",
    },
    {
      id: "royal",
      name: "Royal",
      image: "/shop/hoodie/royal-front.png",
      imageBack: "/shop/hoodie/royal-back.png",
    },
    {
      id: "safety-green",
      name: "Safety Green",
      image: "/shop/hoodie/safety-green-front.png",
      imageBack: "/shop/hoodie/safety-green-back.png",
    },
    {
      id: "s-orange",
      name: "Safety Orange",
      image: "/shop/hoodie/s-orange-front.png",
      imageBack: "/shop/hoodie/s-orange-back.png",
    },
    {
      id: "safety-pink",
      name: "Safety Pink",
      image: "/shop/hoodie/safety-pink-front.png",
      imageBack: "/shop/hoodie/safety-pink-back.png",
    },
    {
      id: "sand",
      name: "Sand",
      image: "/shop/hoodie/sand-front.png",
      imageBack: "/shop/hoodie/sand-back.png",
    },
    {
      id: "sapphire",
      name: "Sapphire",
      image: "/shop/hoodie/sapphire-front.png",
      imageBack: "/shop/hoodie/sapphire-back.png",
    },
    {
      id: "sport-grey",
      name: "Sport Grey",
      image: "/shop/hoodie/sport-grey-front.png",
      imageBack: "/shop/hoodie/sport-grey-back.png",
    },
    {
      id: "violet",
      name: "Violet",
      image: "/shop/hoodie/violet-front.png",
      imageBack: "/shop/hoodie/violet-back.png",
    },
    {
      id: "white",
      name: "White",
      image: "/shop/hoodie/white-front.png",
      imageBack: "/shop/hoodie/white-back.png",
    }
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
  return `${productId}::${colorId ?? ""}::${sizeId ?? ""}`;
}
