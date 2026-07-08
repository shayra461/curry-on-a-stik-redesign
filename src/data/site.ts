import productsData from "./products.json";

export type ProductVariant = {
  title: string;
  price: string;
  sku: string;
  available: boolean;
};

export type Product = {
  id: string;
  handle: string;
  title: string;
  category: "tool" | "shampoo" | "topical" | "other";
  collection: "retail" | "wholesale" | "spca";
  animals: ("horse" | "dog" | "cat")[];
  description: string;
  priceMin: number;
  priceMax: number;
  variants: ProductVariant[];
  options: string[];
  images: string[];
};

export const products = productsData as Product[];

export const retailProducts = products.filter((p) => p.collection === "retail");
export const wholesaleProducts = products.filter((p) => p.collection === "wholesale");

export function getProduct(handle: string): Product | undefined {
  return products.find((p) => p.handle === handle);
}

export function formatPrice(value: number): string {
  return `$${value.toFixed(2)}`;
}

export function priceLabel(p: Product): string {
  if (p.priceMin === p.priceMax) return formatPrice(p.priceMin);
  return `${formatPrice(p.priceMin)} – ${formatPrice(p.priceMax)}`;
}

/* Short, scannable product subtitles (derived from existing site copy). */
export const productTagline: Record<string, string> = {
  "curry-on-a-stik":
    "The only grooming, massage & bathing tool you'll ever need.",
  "complete-grooming-kit-save-10":
    "Curry On A Stik' + Corakko Shampoo — save 10%.",
  "corakko-canine-shampoo":
    "Therapeutic nano-copper shampoo for a healthy, shining coat.",
  "corakko-snake-oil-8oz":
    "Copper nano topical that soothes, heals & protects the skin.",
  "corakko-snake-oil-8oz-matico":
    "Now infused with Matico for advanced tissue repair.",
  "starter-grooming-kit":
    "Curry On A Stik' paired with a 16oz Corakko Shampoo — save 10%.",
};

export const categoryLabels: Record<Product["category"], string> = {
  tool: "Grooming Tools",
  shampoo: "Shampoos",
  topical: "Topical Care",
  other: "More",
};

/* ---------------------------------------------------------------- Trust bar */
export const trustItems = [
  { icon: "shield-check", title: "30-Day Money Back", sub: "Love it or your money back" },
  { icon: "lock", title: "Secure Checkout", sub: "Safe & encrypted payments" },
  { icon: "truck", title: "Fast Shipping", sub: "Quick dispatch, tracked delivery" },
  { icon: "badge-check", title: "Satisfaction Guaranteed", sub: "Vet tested & approved" },
] as const;

/* ---------------------------------------------------------------- Benefits */
/* Rewritten from existing site content into scannable bullets. */
export const benefits = [
  "Professional massage, grooming & bathing tool in one",
  "Decreases shedding while increasing coat health",
  "Patented ergonomic handle — kind to arthritic hands",
  "Massages the skin, muscle & fascia",
  "Dual-sided currying action for thin & thick coats",
  "Acupressure & stress-point stimulation",
  "Releases natural coat oils & stimulates circulation",
  "Easy clean up — simply rinse or wash",
  "Veterinarian tested & approved by the Chi Institute",
];

/* 9 key benefits (grouped, from the existing site). */
export const keyBenefits = [
  "Massages the Skin, Muscle & Fascia",
  "Patent Pending Ergonomic Handle",
  "Dual-Sided Currying Action",
  "Acupressure & Massage Stimulation",
  "Removes Painful Stagnation",
  "Stress Point Therapy",
  "Releases Natural Coat Oils",
  "Stimulates Circulation",
  "Opens Micro-Vasculature",
];

/* ---------------------------------------------------------------- Brand story */
export const brandStory = {
  intro:
    "Created by a husband-and-wife team, Jeff and Sharon, who spent over two years developing, designing, testing and perfecting a curry comb after reviewing nearly every brush on the market. The result is a professional, therapeutic grooming, massage and bathing tool for horses, dogs and cats.",
  origin:
    "\"I have been riding and showing horses for 35 years. What I yearned for was a tool that could curry and massage at the same time. My fingers hurt, my hands were filthy, and the curry would fly out of my hand. There had to be a better way — a well-balanced tool on a handle that alleviates stress on the fingers, wrist and elbow, with coarse rubber on one side and softer rubber on the other. Taking all that under consideration, we designed Curry On A Stik'.\"",
  corakko:
    "The Corakko premium therapeutic skin care line integrates the power of nano-copper technology with an ancestral Chilean herb from the Quillac Seponaira plant and Coptis Huang Lian, a fundamental herb of Traditional Chinese Medicine, to treat and prevent bacterial and fungal growth on and under the skin.",
  corakkoDetail:
    "The formula's main ingredients are combined with a unique blend of skin conditioning agents, cleansing agents and moisturizers. It is both preventative and therapeutic for many common skin diseases — anti-inflammatory, anti-oxidative and anti-microbial to bacteria, fungi and viruses — leaving the coat moisturized, nourished and shining.",
  vet:
    "Veterinarian recommended by Dr. Michael Selmer, TCVM — an equine practitioner in Traditional Chinese Veterinary Medicine, certified in acupuncture, herbal medicine, Tui-na and spinal manipulation from the Chi Institute, where he also teaches.",
  awards:
    "Winner of the Family Choice Award for both Curry On A Stik' & Corakko products, and endorsed by the Chi University for Integrative Medicine.",
};

export const ingredients = [
  {
    name: "Nano-Copper Technology",
    text: "The power of small — advanced copper nano technology that is anti-microbial to bacteria, fungi and viruses on and beneath the skin.",
  },
  {
    name: "Quillac Seponaira",
    text: "An ancestral Chilean herb that works synergistically to maintain a quality hair coat and manage skin ailments.",
  },
  {
    name: "Coptis Huang Lian",
    text: "A fundamental herb of Traditional Chinese Medicine used to treat and prevent bacterial and fungal growth.",
  },
  {
    name: "Matico Herb",
    text: "Infused into our Snake Oil for its potent ability to aid tissue repair and reduce inflammation.",
  },
];

/* ---------------------------------------------------------------- Animals */
export const animalCategories = [
  {
    key: "horse" as const,
    title: "For Horses",
    blurb:
      "Professional equestrians around the globe rave about the shine Curry On A Stik' brings to a horse's coat.",
    image:
      "https://cdn.shopify.com/s/files/1/0500/3270/5696/files/16oz_Horse_Brush.png?v=1772651679",
  },
  {
    key: "dog" as const,
    title: "For Dogs",
    blurb:
      "Works wonders on both short and long coats alike — your dog will love the massaging effect.",
    image:
      "https://cdn.shopify.com/s/files/1/0500/3270/5696/files/16oz_Dog_Brush.png?v=1772651650",
  },
  {
    key: "cat" as const,
    title: "For Cats",
    blurb:
      "Having a difficult time with your cat's coat? Feline friends love our gentle grooming tool.",
    image:
      "https://cdn.shopify.com/s/files/1/0500/3270/5696/files/Brush_NEW.png?v=1772651276",
  },
];

/* ---------------------------------------------------------------- Testimonials */
export type Testimonial = {
  name: string;
  location?: string;
  title?: string;
  quote: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Annelisa",
    quote:
      "The only brush you'll ever need! My vet introduced it for therapeutic massage — added bonus that it's the kindest, most effective de-shedding brush ever, plus it pairs perfectly with the shampoo for bathing.",
  },
  {
    name: "Dee Rodkey",
    title: "Amazing Brush",
    quote:
      "We have 2 German Shepherds with very different coats. I'm amazed at how much fur I've de-shed. It's not only for grooming but for massaging too — my hyper dog sat down and calmed almost instantly.",
  },
  {
    name: "Remy",
    title: "Incredible brush",
    quote:
      "Will never buy a different curry again — I have nerve damage in my neck and with this brush my hands no longer freeze up while grooming. Can feel the difference when riding!",
  },
  {
    name: "Trish",
    title: "Bought it for my horse, using it on my dog!",
    quote:
      "Got it originally for my horse but couldn't believe how much my dog loves it. Going to get a second — one for the barn and one for the house. Makes grooming so much easier.",
  },
  {
    name: "Critterguy",
    quote:
      "Curry On A Stik and Corakko shampoo make my horses' coats shine. Their coats are bright, shiny and thick. They never looked so good.",
  },
  {
    name: "Jessica",
    location: "Hong Kong",
    title: "My 2 French bulldogs love it!",
    quote:
      "They first treated it as a toy, then genuinely loved it so much they both fall asleep while being brushed. A very well thought-out product for both the animals and humans.",
  },
  {
    name: "Sierra",
    location: "Ocala, FL",
    title: "A Wonderful Addition",
    quote:
      "It has saved my hands from old curry brushes and serves many purposes around the barn. My horse loves the massage properties. The double sides are genius — 100% worth the money.",
  },
  {
    name: "Jane Armour",
    location: "California",
    title: "Mindful grooming",
    quote:
      "After using it as a massage tool, my horse is freer through her shoulders and hips and takes a bigger step. An essential tool for anyone interested in massage as part of grooming.",
  },
  {
    name: "Ann Biederman",
    location: "N.Y.",
    title: "My Labradoodle Loves It",
    quote:
      "My 56 lb. labradoodle loves your massage brush. He turns over for me to massage his belly!",
  },
  {
    name: "Carole Robinson",
    quote:
      "All my cats like it! I just couldn't believe it — usually when I try to brush them I get scratched. Not anymore.",
  },
  {
    name: "Barbara Lee",
    quote:
      "Awesome tool! My horses love it. It helps since I have arthritis in both my hands.",
  },
  {
    name: "Rebecca Apson",
    location: "Fire Island, N.Y.",
    title: "Happy Customer",
    quote:
      "I purchased Curry On A Stik' as gifts for friends with pets. Wow — what a great reaction! Their pets loved it and it was great bonding time.",
  },
];

/* ---------------------------------------------------------------- Videos */
export type VideoItem = {
  title: string;
  description: string;
  provider: "vimeo" | "youtube";
  id: string;
};

export const videos: VideoItem[] = [
  {
    title: "For The Horses",
    description:
      "The shine Curry On A Stik' brings to a horse's coat will catch everyone's attention in the ring.",
    provider: "vimeo",
    id: "509559969",
  },
  {
    title: "Dogs Love Curry On A Stik'",
    description: "Works wonders on both short and long coats — dogs love the massaging effect.",
    provider: "vimeo",
    id: "509564287",
  },
  {
    title: "Cats Love Curry On A Stik'",
    description: "Feline friends love our gentle grooming tool.",
    provider: "vimeo",
    id: "509570385",
  },
  {
    title: "Sharon Grooms Frederick the Pony",
    description: "See what our pony Frederick Hobbs of Hollywood has to say about Curry On A Stik'.",
    provider: "vimeo",
    id: "477066196",
  },
  {
    title: "SPCA of Ocala ft. Eric Reed",
    description: "Curry On A Stik' makes the perfect grooming sessions for rescue animals.",
    provider: "youtube",
    id: "01qAxNy9HK8",
  },
];

/* ---------------------------------------------------------------- FAQ */
export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "What can Curry On A Stik' be used for?",
    a: "You can use your Curry On A Stik' for grooming, massaging or bathing your animal.",
  },
  {
    q: "Is Curry On A Stik' only made for horses?",
    a: "No — Curry On A Stik' can be used on horses, cats, dogs or any other animal or livestock.",
  },
  {
    q: "How comfortable is Curry On A Stik' to use?",
    a: "It's designed with comfort in mind for both you and your pet. The specially manufactured TPE rubber overlay makes the perfect ergonomic handle that fits your hand whether you're left or right handed. The balanced weight makes it very easy to use.",
  },
  {
    q: "How safe is it compared to other curry brushes?",
    a: "Curry brushes with metal or wire teeth can rip out hair or fur and may even damage the skin. Our rubber overlay design makes it easier to curry without applying as much pressure — and your pet will love how it feels.",
  },
  {
    q: "What is Corakko and how does it work?",
    a: "Corakko is our premium therapeutic skin care line that integrates nano-copper technology with the Chilean herb Quillac Seponaira and Coptis Huang Lian to treat and prevent bacterial and fungal growth on and under the skin. It's anti-inflammatory, anti-oxidative and anti-microbial.",
  },
  {
    q: "What can Corakko Snake Oil treat?",
    a: "Corakko Snake Oil is a therapeutic topical that soothes, heals and eliminates bacteria and fungi. It helps with wounds, hotspots, rain rot, scratches, insect bites, cracked hooves and summer sores.",
  },
  {
    q: "Do you offer a guarantee?",
    a: "Yes — every order is backed by our 30-day money back guarantee. If you're not satisfied, we'll make it right.",
  },
];

/* Grooming tips (from the existing FAQ page). */
export const groomingTips = [
  "Let the brush do the work — its strong, balanced, weighted design creates a mechanical advantage so you're not relying on your biceps and triceps.",
  "Set your goal: to massage the skin, muscle and fascia, stimulating circulation and opening the micro-vasculature, releasing natural oils and removing painful stagnation.",
  "Use the brush during bathing and shampooing to enrich the effects of the combined brush and natural shampoo.",
  "Be mindful and observe the animal's experience, staying away from distractions.",
  "Begin and finish lightly over the areas your animal likes most — the neck, back and pelvis.",
  "Approach grooming with vision and purpose, and be consistent — animals love a regular routine.",
];

/* ---------------------------------------------------------------- Policies */
export type Policy = {
  slug: string;
  title: string;
  sections: { heading?: string; body: string }[];
};

export const policies: Policy[] = [
  {
    slug: "shipping-policy",
    title: "Shipping Policy",
    sections: [
      {
        body: "We process and dispatch orders quickly so your Curry On A Stik' and Corakko products reach you as fast as possible. Orders are shipped with tracked delivery.",
      },
      {
        heading: "Processing time",
        body: "Most orders are processed within 1–2 business days. You'll receive a confirmation email with tracking details once your order ships.",
      },
      {
        heading: "Delivery",
        body: "Delivery times vary based on your location and the carrier. Many customers report fast delivery — as one reviewer put it, \"I bought it online late Thursday night and it was in my mailbox today.\"",
      },
    ],
  },
  {
    slug: "refund-policy",
    title: "Refund Policy",
    sections: [
      {
        body: "Every order is backed by our 30-Day Money Back Guarantee. If you're not completely satisfied with your purchase, contact us within 30 days and we'll make it right.",
      },
      {
        heading: "How to request a refund",
        body: "Reach out to our team with your order details and we'll guide you through the return and refund process.",
      },
    ],
  },
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    sections: [
      {
        body: "We respect your privacy. Any information you provide — such as your name, shipping address and email — is used only to process your order, provide customer support and, if you opt in, send you occasional updates.",
      },
      {
        heading: "Secure shopping",
        body: "Checkout is safe and secure with encrypted payments. We never sell your personal information.",
      },
    ],
  },
  {
    slug: "terms-of-service",
    title: "Terms of Service",
    sections: [
      {
        body: "By using this website and purchasing our products, you agree to the terms outlined here. All products are described as accurately as possible using information from Curry On A Stik'.",
      },
      {
        heading: "Product use",
        body: "Curry On A Stik' and Corakko products are grooming and topical care products for animals. Always follow the included instructions and consult your veterinarian for specific medical concerns.",
      },
    ],
  },
];

export function getPolicy(slug: string): Policy | undefined {
  return policies.find((p) => p.slug === slug);
}

/* ---------------------------------------------------------------- Business */
export const business = {
  name: "Curry On A Stik'",
  tagline: "Professional, Therapeutic Grooming, Massage & Bathing Tools for Horses, Dogs & Cats.",
  banner: "30-Day Money Back Guarantee · Created with Veterinarians · Over 50,000 Happy Fur Babies & Fur Parents",
  heroPrice: 29.95,
};
