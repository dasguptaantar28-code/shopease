import { Category, Product, Coupon, StoreSettings, Review } from "../types";

export const DEFAULT_STORE_SETTINGS: StoreSettings = {
  store_name: "ShopEase",
  tagline: "Shop More • Live Better",
  currency: "USD",
  currency_symbol: "$",
  support_email: "support@shopease.store",
  support_phone: "+1 (800) 555-EASE",
  standard_shipping_cents: 499, // $4.99
  free_shipping_threshold_cents: 5000, // $50.00
  tax_rate_percent: 5, // 5%
  address: "ShopEase Headquarters, 100 Commerce Way, San Francisco, CA 94105",
};

export const DEMO_CATEGORIES: Category[] = [
  {
    id: "cat-electronics",
    name: "Electronics",
    slug: "electronics",
    description: "Cutting-edge smartphones, laptops, audio gear, and wearables",
    image_url: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500&auto=format&fit=crop&q=80",
    display_order: 1,
    is_active: true,
  },
  {
    id: "cat-fashion",
    name: "Fashion",
    slug: "fashion",
    description: "Trending apparel, streetwear, sneakers, and modern accessories",
    image_url: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=500&auto=format&fit=crop&q=80",
    display_order: 2,
    is_active: true,
  },
  {
    id: "cat-home-living",
    name: "Home & Living",
    slug: "home-and-living",
    description: "Stylish furniture, ambient lighting, kitchenware, and modern decor",
    image_url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&auto=format&fit=crop&q=80",
    display_order: 3,
    is_active: true,
  },
  {
    id: "cat-beauty-health",
    name: "Beauty & Health",
    slug: "beauty-and-health",
    description: "Premium skincare, wellness essentials, personal care, and fragrance",
    image_url: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&auto=format&fit=crop&q=80",
    display_order: 4,
    is_active: true,
  },
  {
    id: "cat-sports",
    name: "Sports",
    slug: "sports",
    description: "Fitness equipment, athletic footwear, sportswear, and outdoor gear",
    image_url: "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?w=500&auto=format&fit=crop&q=80",
    display_order: 5,
    is_active: true,
  },
  {
    id: "cat-toys-games",
    name: "Toys & Games",
    slug: "toys-and-games",
    description: "Gaming consoles, mechanical keyboards, tabletop games, and collectibles",
    image_url: "https://images.unsplash.com/photo-1612287232029-7987823521fd?w=500&auto=format&fit=crop&q=80",
    display_order: 6,
    is_active: true,
  },
  {
    id: "cat-groceries",
    name: "Groceries",
    slug: "groceries",
    description: "Artisanal pantry staples, organic gourmet snacks, coffee, and beverages",
    image_url: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&auto=format&fit=crop&q=80",
    display_order: 7,
    is_active: true,
  },
  {
    id: "cat-books",
    name: "Books",
    slug: "books",
    description: "Bestselling non-fiction, fiction, design guides, and timeless literature",
    image_url: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=80",
    display_order: 8,
    is_active: true,
  },
];

export const DEMO_PRODUCTS: Product[] = [
  {
    id: "prod-iphone-15",
    name: "iPhone 15 Pro",
    slug: "iphone-15-pro",
    sku: "APL-IPH15",
    category_id: "cat-electronics",
    category: DEMO_CATEGORIES[0],
    price_in_cents: 79900, // $799.00
    compare_at_price_in_cents: 89900, // $899.00
    stock_quantity: 45,
    rating: 4.8,
    review_count: 124,
    is_featured: true,
    is_published: true,
    short_description: "Aerospace-grade titanium design with A17 Pro chip and 48MP camera.",
    description:
      "Crafted with durable lightweight titanium, the iPhone 15 Pro features an industry-leading Super Retina XDR display with ProMotion up to 120Hz. Powered by the A17 Pro chip, experience next-generation mobile gaming performance and cinematic video capture with USB-C convenience.",
    images: [
      {
        id: "img-iph-1",
        image_url: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80",
        alt_text: "iPhone 15 Pro front and back view",
        display_order: 1,
        is_primary: true,
      },
      {
        id: "img-iph-2",
        image_url: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&auto=format&fit=crop&q=80",
        alt_text: "iPhone 15 screen close-up",
        display_order: 2,
        is_primary: false,
      },
    ],
    variants: [
      { id: "var-iph-128", title: "128GB / Natural Titanium", sku: "APL-IPH15-128", price_in_cents: 79900, stock_quantity: 25 },
      { id: "var-iph-256", title: "256GB / Black Titanium", sku: "APL-IPH15-256", price_in_cents: 89900, stock_quantity: 20 },
    ],
  },
  {
    id: "prod-nike-air-force-1",
    name: "Nike Air Force 1 '07",
    slug: "nike-air-force-1-07",
    sku: "NKE-AF1",
    category_id: "cat-fashion",
    category: DEMO_CATEGORIES[1],
    price_in_cents: 8500, // $85.00
    compare_at_price_in_cents: 10000, // $100.00
    stock_quantity: 62,
    rating: 4.9,
    review_count: 89,
    is_featured: true,
    is_published: true,
    short_description: "The radiance lives on with pristine white leather and durable cushioning.",
    description:
      "The radiance lives on in the Nike Air Force 1 '07, the basketball icon that puts a fresh spin on what you know best: crisp leather, bold details, and the right amount of flash to make you shine.",
    images: [
      {
        id: "img-nke-1",
        image_url: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format&fit=crop&q=80",
        alt_text: "Nike Air Force 1 white sneakers",
        display_order: 1,
        is_primary: true,
      },
      {
        id: "img-nke-2",
        image_url: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&auto=format&fit=crop&q=80",
        alt_text: "Nike Air Force 1 angled side profile",
        display_order: 2,
        is_primary: false,
      },
    ],
    variants: [
      { id: "var-nke-us9", title: "Size US 9 / White", sku: "NKE-AF1-09", price_in_cents: 8500, stock_quantity: 22 },
      { id: "var-nke-us10", title: "Size US 10 / White", sku: "NKE-AF1-10", price_in_cents: 8500, stock_quantity: 25 },
      { id: "var-nke-us11", title: "Size US 11 / White", sku: "NKE-AF1-11", price_in_cents: 8500, stock_quantity: 15 },
    ],
  },
  {
    id: "prod-sony-headphones",
    name: "Sony WH-1000XM5 Wireless Headphones",
    slug: "sony-wh-1000xm5-wireless-headphones",
    sku: "SNY-WH1000",
    category_id: "cat-electronics",
    category: DEMO_CATEGORIES[0],
    price_in_cents: 12900, // $129.00
    compare_at_price_in_cents: 14900, // $149.00
    stock_quantity: 38,
    rating: 4.7,
    review_count: 67,
    is_featured: true,
    is_published: true,
    short_description: "Industry-leading noise cancellation with ultra-clear call quality.",
    description:
      "With two processors controlling 8 microphones, Auto NC Optimizer for automatically optimizing noise cancellation, and a specially designed driver unit, the WH-1000XM5 headphones with industry-leading noise cancellation rewrite the rules for distraction-free listening.",
    images: [
      {
        id: "img-sny-1",
        image_url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
        alt_text: "Sony black wireless headphones",
        display_order: 1,
        is_primary: true,
      },
      {
        id: "img-sny-2",
        image_url: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&auto=format&fit=crop&q=80",
        alt_text: "Sony headphones side view",
        display_order: 2,
        is_primary: false,
      },
    ],
  },
  {
    id: "prod-smart-watch-series-8",
    name: "Smart Watch Series 8",
    slug: "smart-watch-series-8",
    sku: "APL-WCH8",
    category_id: "cat-electronics",
    category: DEMO_CATEGORIES[0],
    price_in_cents: 19900, // $199.00
    compare_at_price_in_cents: 24900, // $249.00
    stock_quantity: 50,
    rating: 4.8,
    review_count: 102,
    is_featured: true,
    is_published: true,
    short_description: "Advanced health sensors, ECG, crash detection, and cellular connectivity.",
    description:
      "Your essential companion for a healthy life is now even more powerful. Advanced sensors provide insights to help you better understand your wellness. Innovative safety features give you help when you need it, wrapped in an always-on Retina display.",
    images: [
      {
        id: "img-wch-1",
        image_url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80",
        alt_text: "Smart watch midnight edition",
        display_order: 1,
        is_primary: true,
      },
    ],
  },
  {
    id: "prod-laptop-backpack",
    name: "Urban Shield Waterproof Laptop Backpack",
    slug: "urban-shield-waterproof-laptop-backpack",
    sku: "BPK-URB15",
    category_id: "cat-fashion",
    category: DEMO_CATEGORIES[1],
    price_in_cents: 4900, // $49.00
    compare_at_price_in_cents: 6900, // $69.00
    stock_quantity: 80,
    rating: 4.6,
    review_count: 49,
    is_featured: true,
    is_published: true,
    short_description: "Weatherproof 15.6 inch laptop backpack with anti-theft compartments.",
    description:
      "Engineered for daily commuters and travelers alike, this sleek backpack features water-repellent oxford fabric, padded laptop protection up to 15.6 inches, integrated USB charging port, and ergonomic breathable shoulder straps.",
    images: [
      {
        id: "img-bpk-1",
        image_url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80",
        alt_text: "Black urban laptop backpack",
        display_order: 1,
        is_primary: true,
      },
    ],
  },
  {
    id: "prod-ergonomic-chair",
    name: "ErgoComfort Breathable Office Chair",
    slug: "ergocomfort-breathable-office-chair",
    sku: "FUR-ERG01",
    category_id: "cat-home-living",
    category: DEMO_CATEGORIES[2],
    price_in_cents: 18900, // $189.00
    compare_at_price_in_cents: 24900, // $249.00
    stock_quantity: 18,
    rating: 4.7,
    review_count: 38,
    is_featured: false,
    is_published: true,
    short_description: "Adaptive lumbar support, 3D armrests, and high-elastic mesh back.",
    description:
      "Say goodbye to back fatigue during long hours of work. The ErgoComfort chair dynamically contours to your spine with adjustable lumbar firmness, responsive tilt tension, and whisper-quiet rollerblade caster wheels.",
    images: [
      {
        id: "img-chr-1",
        image_url: "https://images.unsplash.com/photo-1580481077195-c3a821a58875?w=800&auto=format&fit=crop&q=80",
        alt_text: "Ergonomic mesh office chair",
        display_order: 1,
        is_primary: true,
      },
    ],
  },
  {
    id: "prod-facial-serum",
    name: "GlowRevive Hyaluronic Acid Serum",
    slug: "glowrevive-hyaluronic-acid-serum",
    sku: "BTY-SER01",
    category_id: "cat-beauty-health",
    category: DEMO_CATEGORIES[3],
    price_in_cents: 2800, // $28.00
    compare_at_price_in_cents: 3500, // $35.00
    stock_quantity: 95,
    rating: 4.9,
    review_count: 73,
    is_featured: false,
    is_published: true,
    short_description: "Deep multi-molecular hydration with pure vitamin B5 and botanical extracts.",
    description:
      "Formulated for all skin types, this non-greasy serum locks in essential moisture, visibly plumps fine lines, and restores radiance within 7 days. 100% cruelty-free, fragrance-free, and dermatologist tested.",
    images: [
      {
        id: "img-bty-1",
        image_url: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80",
        alt_text: "Hyaluronic serum amber glass bottle",
        display_order: 1,
        is_primary: true,
      },
    ],
  },
  {
    id: "prod-gaming-keyboard",
    name: "ApexRGB Wireless Mechanical Keyboard",
    slug: "apexrgb-wireless-mechanical-keyboard",
    sku: "GAM-KB01",
    category_id: "cat-toys-games",
    category: DEMO_CATEGORIES[5],
    price_in_cents: 8900, // $89.00
    compare_at_price_in_cents: 11900, // $119.00
    stock_quantity: 42,
    rating: 4.8,
    review_count: 56,
    is_featured: false,
    is_published: true,
    short_description: "Hot-swappable custom linear switches with per-key RGB and Bluetooth 5.2.",
    description:
      "Precision tactile feedback with factory-lubed linear switches, sound-dampening silicone foam, and triple-mode connectivity (2.4GHz wireless, Bluetooth, and USB-C). Built with solid aluminum top plate.",
    images: [
      {
        id: "img-kb-1",
        image_url: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80",
        alt_text: "Mechanical gaming keyboard with ambient backlight",
        display_order: 1,
        is_primary: true,
      },
    ],
  },
  {
    id: "prod-olive-oil",
    name: "Estate Reserve Extra Virgin Olive Oil",
    slug: "estate-reserve-extra-virgin-olive-oil",
    sku: "GRO-OIL01",
    category_id: "cat-groceries",
    category: DEMO_CATEGORIES[6],
    price_in_cents: 1900, // $19.00
    compare_at_price_in_cents: 2400, // $24.00
    stock_quantity: 110,
    rating: 4.9,
    review_count: 31,
    is_featured: false,
    is_published: true,
    short_description: "Cold-extracted single-origin EVOO from hand-harvested Mediterranean olives.",
    description:
      "Bottled within 4 hours of harvest, our unfiltered cold-pressed olive oil boasts peppery notes, polyphenol richness, and silky balance ideal for finishing salads, pastas, and dipping crusty breads.",
    images: [
      {
        id: "img-gro-1",
        image_url: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&auto=format&fit=crop&q=80",
        alt_text: "Bottle of artisanal olive oil",
        display_order: 1,
        is_primary: true,
      },
    ],
  },
  {
    id: "prod-atomic-habits",
    name: "Atomic Habits - Special Hardcover",
    slug: "atomic-habits-special-hardcover",
    sku: "BOK-AH01",
    category_id: "cat-books",
    category: DEMO_CATEGORIES[7],
    price_in_cents: 1800, // $18.00
    compare_at_price_in_cents: 2700, // $27.00
    stock_quantity: 75,
    rating: 5.0,
    review_count: 215,
    is_featured: false,
    is_published: true,
    short_description: "An Easy & Proven Way to Build Good Habits & Break Bad Ones by James Clear.",
    description:
      "The definitive masterclass on behavior change. Packed with evidence-based strategies from biology, psychology, and neuroscience to help you achieve personal and professional breakthroughs.",
    images: [
      {
        id: "img-bok-1",
        image_url: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&auto=format&fit=crop&q=80",
        alt_text: "Open book on aesthetic wooden table",
        display_order: 1,
        is_primary: true,
      },
    ],
  },
];

export const DEMO_COUPONS: Coupon[] = [
  {
    id: "coup-welcome10",
    code: "WELCOME10",
    discount_type: "percentage",
    discount_value: 10,
    min_order_cents: 2000,
    times_used: 14,
    is_active: true,
  },
  {
    id: "coup-save20",
    code: "SAVE20",
    discount_type: "percentage",
    discount_value: 20,
    min_order_cents: 5000,
    times_used: 8,
    is_active: true,
  },
  {
    id: "coup-freeship",
    code: "FREESHIP",
    discount_type: "fixed",
    discount_value: 499,
    min_order_cents: 2500,
    times_used: 32,
    is_active: true,
  },
];

export const DEMO_REVIEWS: Review[] = [
  {
    id: "rev-1",
    product_id: "prod-iphone-15",
    author_name: "Sarah Jenkins",
    rating: 5,
    title: "Incredible camera and battery life!",
    comment:
      "Upgraded after three years and couldn't be happier. The titanium feel is lightweight, pictures are crystal sharp, and shipping was astonishingly fast. ShopEase delivered in 2 business days!",
    is_approved: true,
    created_at: "2026-10-15T14:22:00Z",
  },
  {
    id: "rev-2",
    product_id: "prod-iphone-15",
    author_name: "Marcus Vance",
    rating: 4,
    title: "Smooth performance, love the action button",
    comment:
      "A17 Pro handles heavy mobile gaming without breaking a sweat. Battery easily lasts a full day of heavy use.",
    is_approved: true,
    created_at: "2026-10-18T09:12:00Z",
  },
  {
    id: "rev-3",
    product_id: "prod-nike-air-force-1",
    author_name: "David Kim",
    rating: 5,
    title: "Timeless classic and true to size",
    comment:
      "Nothing beats a fresh pair of Air Force 1s. Perfectly packaged, completely authentic, and 100% comfortable right out of the box.",
    is_approved: true,
    created_at: "2026-10-20T16:45:00Z",
  },
  {
    id: "rev-4",
    product_id: "prod-sony-headphones",
    author_name: "Elena Rostova",
    rating: 5,
    title: "Best noise cancellation I've ever owned",
    comment:
      "I work in noisy coffee shops and commute by train daily. The moment you put these on, the world goes silent. Sound profile is rich and customizable.",
    is_approved: true,
    created_at: "2026-10-22T11:05:00Z",
  },
];
