import { Category, Product, Coupon, StoreSettings, Review, Order, OrderItem } from "../types";
import { DEMO_CATEGORIES, DEMO_PRODUCTS, DEMO_COUPONS, DEMO_REVIEWS, DEFAULT_STORE_SETTINGS } from "./demo-data";
import { isSupabaseConfigured, getSupabaseConfig } from "../supabase/env";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

function getClient() {
  const { url, anonKey } = getSupabaseConfig();
  return createSupabaseClient(url, anonKey);
}

// In-memory runtime persistence for orders & store during demo/fallback mode
let fallbackOrders: Order[] = [
  {
    id: "ord-demo-1001",
    order_number: "SE-92810",
    customer_email: "alex.taylor@example.com",
    customer_phone: "+1 (555) 234-5678",
    shipping_name: "Alex Taylor",
    shipping_address: {
      name: "Alex Taylor",
      phone: "+1 (555) 234-5678",
      line1: "742 Evergreen Terrace",
      city: "Springfield",
      state: "OR",
      postal_code: "97477",
      country: "United States",
    },
    subtotal_cents: 79900,
    discount_cents: 0,
    shipping_cents: 0,
    tax_cents: 3995,
    total_cents: 83895,
    payment_method: "cod",
    payment_status: "paid",
    fulfillment_status: "delivered",
    tracking_number: "TRK-98721498",
    tracking_carrier: "FedEx Ground",
    items: [
      {
        id: "item-1",
        order_id: "ord-demo-1001",
        product_id: "prod-iphone-15",
        product_name: "iPhone 15 Pro",
        variant_title: "128GB / Natural Titanium",
        price_in_cents: 79900,
        quantity: 1,
        total_cents: 79900,
        image_url: DEMO_PRODUCTS[0].images[0].image_url,
      },
    ],
    created_at: "2026-10-26T12:00:00Z",
  },
  {
    id: "ord-demo-1002",
    order_number: "SE-92811",
    customer_email: "jordan.smith@example.com",
    customer_phone: "+1 (555) 432-8765",
    shipping_name: "Jordan Smith",
    shipping_address: {
      name: "Jordan Smith",
      phone: "+1 (555) 432-8765",
      line1: "1200 Market Street, Apt 4B",
      city: "San Francisco",
      state: "CA",
      postal_code: "94102",
      country: "United States",
    },
    subtotal_cents: 13400, // 8500 + 4900
    discount_cents: 1340, // WELCOME10 applied
    shipping_cents: 0,
    tax_cents: 603,
    total_cents: 12663,
    coupon_code: "WELCOME10",
    payment_method: "card_manual",
    payment_status: "paid",
    fulfillment_status: "shipped",
    tracking_number: "USPS-940011189956",
    tracking_carrier: "USPS Priority",
    items: [
      {
        id: "item-2",
        order_id: "ord-demo-1002",
        product_id: "prod-nike-air-force-1",
        product_name: "Nike Air Force 1 '07",
        variant_title: "Size US 10 / White",
        price_in_cents: 8500,
        quantity: 1,
        total_cents: 8500,
        image_url: DEMO_PRODUCTS[1].images[0].image_url,
      },
      {
        id: "item-3",
        order_id: "ord-demo-1002",
        product_id: "prod-laptop-backpack",
        product_name: "Urban Shield Waterproof Laptop Backpack",
        price_in_cents: 4900,
        quantity: 1,
        total_cents: 4900,
        image_url: DEMO_PRODUCTS[4].images[0].image_url,
      },
    ],
    created_at: "2026-10-27T14:30:00Z",
  },
];

let fallbackProducts: Product[] = [...DEMO_PRODUCTS];
let fallbackCategories: Category[] = [...DEMO_CATEGORIES];
let fallbackReviews: Review[] = [...DEMO_REVIEWS];
let fallbackSettings: StoreSettings = { ...DEFAULT_STORE_SETTINGS };

export interface ProductFilters {
  category?: string;
  search?: string;
  sort?: "featured" | "newest" | "price_asc" | "price_desc" | "rating";
  minPrice?: number;
  maxPrice?: number;
  inStockOnly?: boolean;
  featuredOnly?: boolean;
  limit?: number;
  offset?: number;
}

export async function getCategories(): Promise<Category[]> {
  if (isSupabaseConfigured) {
    try {
      const supabase = getClient();
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .eq("is_active", true)
        .order("display_order", { ascending: true });

      if (!error && data && data.length > 0) {
        return data as Category[];
      }
    } catch {
      // Fallback
    }
  }
  return fallbackCategories.filter((c) => c.is_active);
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const categories = await getCategories();
  return categories.find((c) => c.slug === slug) || null;
}

export async function getProducts(filters: ProductFilters = {}): Promise<{ products: Product[]; total: number }> {
  if (isSupabaseConfigured) {
    try {
      const supabase = getClient();
      let query = supabase.from("products").select("*, category:categories(*), images:product_images(*), variants:product_variants(*)", { count: "exact" });
      
      query = query.eq("is_published", true);

      if (filters.category) {
        // filter by category slug or id
        const { data: cat } = await supabase.from("categories").select("id").eq("slug", filters.category).single();
        if (cat) {
          query = query.eq("category_id", cat.id);
        }
      }

      if (filters.search) {
        query = query.ilike("name", `%${filters.search}%`);
      }

      if (filters.featuredOnly) {
        query = query.eq("is_featured", true);
      }

      if (filters.inStockOnly) {
        query = query.gt("stock_quantity", 0);
      }

      if (filters.minPrice !== undefined) {
        query = query.gte("price_in_cents", filters.minPrice);
      }

      if (filters.maxPrice !== undefined) {
        query = query.lte("price_in_cents", filters.maxPrice);
      }

      switch (filters.sort) {
        case "price_asc":
          query = query.order("price_in_cents", { ascending: true });
          break;
        case "price_desc":
          query = query.order("price_in_cents", { ascending: false });
          break;
        case "newest":
          query = query.order("created_at", { ascending: false });
          break;
        case "rating":
          query = query.order("rating", { ascending: false });
          break;
        default:
          query = query.order("is_featured", { ascending: false });
          break;
      }

      if (filters.limit) {
        const from = filters.offset || 0;
        const to = from + filters.limit - 1;
        query = query.range(from, to);
      }

      const { data, count, error } = await query;
      if (!error && data && data.length > 0) {
        return { products: data as unknown as Product[], total: count || data.length };
      }
    } catch {
      // Fallback
    }
  }

  // Fallback in-memory querying
  let list = [...fallbackProducts].filter((p) => p.is_published);

  if (filters.category) {
    list = list.filter((p) => p.category?.slug === filters.category || p.category_id === filters.category);
  }

  if (filters.search) {
    const s = filters.search.toLowerCase().trim();
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(s) ||
        p.description.toLowerCase().includes(s) ||
        p.sku.toLowerCase().includes(s)
    );
  }

  if (filters.featuredOnly) {
    list = list.filter((p) => p.is_featured);
  }

  if (filters.inStockOnly) {
    list = list.filter((p) => p.stock_quantity > 0);
  }

  if (filters.minPrice !== undefined) {
    list = list.filter((p) => p.price_in_cents >= (filters.minPrice ?? 0));
  }

  if (filters.maxPrice !== undefined) {
    list = list.filter((p) => p.price_in_cents <= (filters.maxPrice ?? Infinity));
  }

  switch (filters.sort) {
    case "price_asc":
      list.sort((a, b) => a.price_in_cents - b.price_in_cents);
      break;
    case "price_desc":
      list.sort((a, b) => b.price_in_cents - a.price_in_cents);
      break;
    case "newest":
      list.sort((a, b) => (b.created_at || "").localeCompare(a.created_at || ""));
      break;
    case "rating":
      list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      break;
    default:
      list.sort((a, b) => (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0));
      break;
  }

  const total = list.length;
  if (filters.limit) {
    const from = filters.offset || 0;
    list = list.slice(from, from + filters.limit);
  }

  return { products: list, total };
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (isSupabaseConfigured) {
    try {
      const supabase = getClient();
      const { data, error } = await supabase
        .from("products")
        .select("*, category:categories(*), images:product_images(*), variants:product_variants(*)")
        .eq("slug", slug)
        .single();

      if (!error && data) {
        return data as unknown as Product;
      }
    } catch {
      // Fallback
    }
  }

  return fallbackProducts.find((p) => p.slug === slug || p.id === slug) || null;
}

export async function validateCoupon(code: string, subtotalCents: number): Promise<{ valid: boolean; coupon?: Coupon; error?: string }> {
  const cleanCode = code.trim().toUpperCase();

  if (isSupabaseConfigured) {
    try {
      const supabase = getClient();
      const { data, error } = await supabase
        .from("coupons")
        .select("*")
        .eq("code", cleanCode)
        .eq("is_active", true)
        .single();

      if (!error && data) {
        const c = data as Coupon;
        if (c.expires_at && new Date(c.expires_at) < new Date()) {
          return { valid: false, error: "This coupon code has expired." };
        }
        if (c.min_order_cents && subtotalCents < c.min_order_cents) {
          return {
            valid: false,
            error: `Minimum order of $${(c.min_order_cents / 100).toFixed(2)} required for this coupon.`,
          };
        }
        return { valid: true, coupon: c };
      }
    } catch {
      // Fallback
    }
  }

  const found = DEMO_COUPONS.find((c) => c.code.toUpperCase() === cleanCode && c.is_active);
  if (!found) {
    return { valid: false, error: "Invalid coupon code. Try WELCOME10 or SAVE20" };
  }

  if (subtotalCents < found.min_order_cents) {
    return {
      valid: false,
      error: `Minimum order of $${(found.min_order_cents / 100).toFixed(2)} required for code ${found.code}.`,
    };
  }

  return { valid: true, coupon: found };
}

export async function getProductReviews(productId: string): Promise<Review[]> {
  if (isSupabaseConfigured) {
    try {
      const supabase = getClient();
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .eq("product_id", productId)
        .eq("is_approved", true)
        .order("created_at", { ascending: false });

      if (!error && data && data.length > 0) {
        return data as Review[];
      }
    } catch {
      // Fallback
    }
  }

  return fallbackReviews.filter((r) => r.product_id === productId && r.is_approved);
}

export async function submitReview(review: Omit<Review, "id" | "is_approved" | "created_at">): Promise<Review> {
  const newReview: Review = {
    ...review,
    id: `rev-${Date.now()}`,
    is_approved: true, // Demo auto-approve for instant user feedback
    created_at: new Date().toISOString(),
  };

  if (isSupabaseConfigured) {
    try {
      const supabase = getClient();
      const { data, error } = await supabase.from("reviews").insert(newReview).select().single();
      if (!error && data) {
        return data as Review;
      }
    } catch {
      // Fallback
    }
  }

  fallbackReviews.unshift(newReview);
  return newReview;
}

export async function getStoreSettings(): Promise<StoreSettings> {
  return fallbackSettings;
}

export async function updateStoreSettings(newSettings: Partial<StoreSettings>): Promise<StoreSettings> {
  fallbackSettings = { ...fallbackSettings, ...newSettings };
  return fallbackSettings;
}

export async function getOrderById(orderId: string): Promise<Order | null> {
  if (isSupabaseConfigured) {
    try {
      const supabase = getClient();
      const { data, error } = await supabase
        .from("orders")
        .select("*, items:order_items(*)")
        .or(`id.eq.${orderId},order_number.eq.${orderId}`)
        .single();

      if (!error && data) {
        return data as unknown as Order;
      }
    } catch {
      // Fallback
    }
  }

  return (
    fallbackOrders.find(
      (o) => o.id === orderId || o.order_number.toLowerCase() === orderId.toLowerCase()
    ) || null
  );
}

export async function getOrdersByUser(emailOrUserId: string): Promise<Order[]> {
  if (isSupabaseConfigured) {
    try {
      const supabase = getClient();
      const { data, error } = await supabase
        .from("orders")
        .select("*, items:order_items(*)")
        .or(`user_id.eq.${emailOrUserId},customer_email.eq.${emailOrUserId}`)
        .order("created_at", { ascending: false });

      if (!error && data) {
        return data as unknown as Order[];
      }
    } catch {
      // Fallback
    }
  }

  return fallbackOrders.filter(
    (o) =>
      o.customer_email.toLowerCase() === emailOrUserId.toLowerCase() ||
      o.user_id === emailOrUserId
  );
}

export async function getAllOrders(): Promise<Order[]> {
  if (isSupabaseConfigured) {
    try {
      const supabase = getClient();
      const { data, error } = await supabase
        .from("orders")
        .select("*, items:order_items(*)")
        .order("created_at", { ascending: false });

      if (!error && data) {
        return data as unknown as Order[];
      }
    } catch {
      // Fallback
    }
  }

  return fallbackOrders;
}

export async function updateOrderStatus(
  orderId: string,
  updates: Partial<Pick<Order, "payment_status" | "fulfillment_status" | "tracking_number" | "tracking_carrier" | "notes">>
): Promise<Order | null> {
  if (isSupabaseConfigured) {
    try {
      const supabase = getClient();
      const { data, error } = await supabase
        .from("orders")
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq("id", orderId)
        .select("*, items:order_items(*)")
        .single();

      if (!error && data) {
        return data as unknown as Order;
      }
    } catch {
      // Fallback
    }
  }

  const idx = fallbackOrders.findIndex((o) => o.id === orderId || o.order_number === orderId);
  if (idx !== -1) {
    fallbackOrders[idx] = {
      ...fallbackOrders[idx],
      ...updates,
      updated_at: new Date().toISOString(),
    };
    return fallbackOrders[idx];
  }
  return null;
}

export async function saveOrder(order: Order): Promise<Order> {
  fallbackOrders.unshift(order);
  return order;
}

// Admin metrics
export async function getAdminMetrics() {
  const orders = await getAllOrders();
  const products = (await getProducts({ limit: 1000 })).products;
  
  const totalRevenueCents = orders
    .filter((o) => o.payment_status === "paid")
    .reduce((sum, o) => sum + o.total_cents, 0);

  const totalOrders = orders.length;
  const lowStockCount = products.filter((p) => p.stock_quantity <= 10).length;
  
  // Unique customers by email
  const uniqueCustomerEmails = new Set(orders.map((o) => o.customer_email.toLowerCase()));
  const totalCustomers = uniqueCustomerEmails.size;

  return {
    totalRevenueCents,
    totalOrders,
    totalProducts: products.length,
    lowStockCount,
    totalCustomers,
    recentOrders: orders.slice(0, 5),
  };
}
