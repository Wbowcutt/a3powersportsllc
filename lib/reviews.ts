export type Review = {
  name: string;
  date: string;
  quote: string;
  notable?: string[];
};

/** Facebook reviews supplied by the shop. Quoted as written. */
export const reviews: Review[] = [
  {
    name: "Lynn",
    date: "September 1, 2026",
    quote:
      "Everything was as promised... Feel like we got a great deal... Was really nice to meet Aza and his girlfriend they seem like really good people felt like I could trust what they were saying",
  },
  {
    name: "Jonathan",
    date: "August 8, 2026",
    quote:
      "Bought Rims off him knows communication and that was about it got to the point and they were sold",
    notable: ["Communication"],
  },
  {
    name: "Kristoffer",
    date: "May 21, 2026",
    quote: "great guy to communicate with. Very fair.",
    notable: ["Communication"],
  },
  {
    name: "Jason",
    date: "April 10, 2026",
    quote:
      "Asa went above and beyond for me with my purchase..such a breath of fresh air for a honest smart guy, and made a lasting friendship...thanks again Asa...",
    notable: ["Punctuality", "Communication", "Pricing", "Item Description"],
  },
  {
    name: "Ryan",
    date: "December 22, 2025",
    quote:
      "perfect communication and availability. Great personality.... makes doing business easy. Item found to be exactly as described.",
    notable: ["Punctuality", "Communication", "Pricing", "Item Description"],
  },
  {
    name: "Tyler",
    date: "December 4, 2025",
    quote: "Asa was great all the way through. Just an all around great seller.",
  },
];
