import { Coupon } from "./types";

/**
 * Format price in cents (minor units) to formatted string
 * e.g., 79900 -> "$799.00", 8500 -> "$85.00"
 */
export function formatPrice(cents: number, currencySymbol: string = "$"): string {
  if (isNaN(cents) || cents === null || cents === undefined) {
    return `${currencySymbol}0.00`;
  }
  const dollars = cents / 100;
  return `${currencySymbol}${dollars.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

/**
 * Format date to readable string
 */
export function formatDate(dateString: string | undefined): string {
  if (!dateString) return "N/A";
  try {
    const d = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(d);
  } catch {
    return dateString;
  }
}

/**
 * Format date with time
 */
export function formatDateTime(dateString: string | undefined): string {
  if (!dateString) return "N/A";
  try {
    const d = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(d);
  } catch {
    return dateString;
  }
}

/**
 * Format coupon discount label
 */
export function formatDiscount(coupon: Coupon, currencySymbol: string = "$"): string {
  if (coupon.discount_type === "percentage") {
    return `${coupon.discount_value}% OFF`;
  }
  return `${formatPrice(coupon.discount_value, currencySymbol)} OFF`;
}

/**
 * Convert text into URL-friendly slug
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

/**
 * Generate a friendly human-readable order number e.g. "SE-83492"
 */
export function generateOrderNumber(): string {
  const timestamp = Date.now().toString().slice(-4);
  const random = Math.floor(1000 + Math.random() * 9000);
  return `SE-${timestamp}${random}`;
}
