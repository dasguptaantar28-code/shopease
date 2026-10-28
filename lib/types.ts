export type UserRole = "customer" | "admin" | "staff";

export interface UserProfile {
  id: string;
  email: string;
  full_name?: string | null;
  avatar_url?: string | null;
  phone?: string | null;
  role: UserRole;
  created_at: string;
  updated_at?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  image_url?: string | null;
  display_order: number;
  is_active: boolean;
  created_at?: string;
}

export interface ProductImage {
  id: string;
  product_id?: string;
  image_url: string;
  alt_text?: string | null;
  display_order: number;
  is_primary: boolean;
}

export interface ProductVariant {
  id: string;
  product_id?: string;
  title: string; // e.g. "Space Black / 256GB" or "Size 10 / White"
  sku?: string | null;
  price_in_cents: number;
  stock_quantity: number;
  attributes?: Record<string, string>;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  short_description?: string;
  sku: string;
  category_id: string;
  category?: Category;
  price_in_cents: number; // Stored in minor units (e.g. 79900 = $799.00)
  compare_at_price_in_cents?: number | null;
  stock_quantity: number;
  rating?: number;
  review_count?: number;
  is_featured: boolean;
  is_published: boolean;
  images: ProductImage[];
  variants?: ProductVariant[];
  created_at?: string;
  updated_at?: string;
}

export interface CartItem {
  id: string; // unique item cart key (productId + variantId)
  product_id: string;
  variant_id?: string;
  name: string;
  slug: string;
  price_in_cents: number;
  image_url: string;
  quantity: number;
  stock_quantity: number;
  variant_title?: string;
}

export type DiscountType = "percentage" | "fixed";

export interface Coupon {
  id: string;
  code: string;
  discount_type: DiscountType;
  discount_value: number; // e.g. 10 for 10%, or 1500 for $15.00
  min_order_cents: number;
  max_uses?: number | null;
  times_used?: number;
  expires_at?: string | null;
  is_active: boolean;
}

export type PaymentMethod = "cod" | "card_manual" | "stripe_test";
export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";
export type FulfillmentStatus = "unfulfilled" | "processing" | "shipped" | "delivered" | "cancelled";

export interface Address {
  id?: string;
  user_id?: string;
  name: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  is_default?: boolean;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  product_name: string;
  variant_title?: string;
  price_in_cents: number;
  quantity: number;
  total_cents: number;
  image_url?: string;
}

export interface Order {
  id: string;
  order_number: string;
  user_id?: string | null;
  customer_email: string;
  customer_phone: string;
  shipping_name: string;
  shipping_address: Address;
  subtotal_cents: number;
  discount_cents: number;
  shipping_cents: number;
  tax_cents: number;
  total_cents: number;
  coupon_code?: string | null;
  payment_method: PaymentMethod;
  payment_status: PaymentStatus;
  fulfillment_status: FulfillmentStatus;
  tracking_number?: string | null;
  tracking_carrier?: string | null;
  notes?: string | null;
  items: OrderItem[];
  created_at: string;
  updated_at?: string;
}

export interface Review {
  id: string;
  product_id: string;
  user_id?: string | null;
  author_name: string;
  rating: number; // 1-5
  title: string;
  comment: string;
  is_approved: boolean;
  created_at: string;
}

export interface StoreSettings {
  store_name: string;
  tagline: string;
  currency: string;
  currency_symbol: string;
  support_email: string;
  support_phone: string;
  standard_shipping_cents: number;
  free_shipping_threshold_cents: number;
  tax_rate_percent: number;
  address: string;
}
