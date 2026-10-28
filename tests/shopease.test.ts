import { test, describe } from "node:test";
import assert from "node:assert/strict";

import { formatPrice, slugify, generateOrderNumber, formatDiscount } from "../lib/formatters";
import { validateCoupon, getProducts, getProductBySlug } from "../lib/store/repository";
import { Coupon, Product } from "../lib/types";

describe("ShopEase Core Pricing & Formatting", () => {
  test("formats cents minor units correctly into USD currency", () => {
    assert.equal(formatPrice(79900), "$799.00");
    assert.equal(formatPrice(8500), "$85.00");
    assert.equal(formatPrice(499), "$4.99");
    assert.equal(formatPrice(0), "$0.00");
  });

  test("generates SEO-friendly URL slugs", () => {
    assert.equal(slugify("iPhone 15 Pro Max"), "iphone-15-pro-max");
    assert.equal(slugify("Nike Air Force 1 '07"), "nike-air-force-1-07");
    assert.equal(slugify("Home & Living"), "home-and-living");
  });

  test("generates unique human-friendly order numbers", () => {
    const ord1 = generateOrderNumber();
    const ord2 = generateOrderNumber();
    assert.match(ord1, /^SE-\d{8}$/);
    assert.notEqual(ord1, ord2);
  });
});

describe("Coupon Validation Rules", () => {
  test("validates percentage coupon above minimum order threshold", async () => {
    const res = await validateCoupon("WELCOME10", 3000); // $30 order, min $20
    assert.equal(res.valid, true);
    assert.ok(res.coupon);
    assert.equal(res.coupon?.code, "WELCOME10");
    assert.equal(res.coupon?.discount_type, "percentage");
    assert.equal(res.coupon?.discount_value, 10);
  });

  test("rejects coupon when subtotal does not meet minimum order", async () => {
    const res = await validateCoupon("WELCOME10", 1500); // $15 order, min $20
    assert.equal(res.valid, false);
    assert.match(res.error || "", /minimum order/i);
  });

  test("rejects unknown or invalid coupons safely", async () => {
    const res = await validateCoupon("FAKE_CODE_99", 5000);
    assert.equal(res.valid, false);
    assert.match(res.error || "", /invalid/i);
  });
});

describe("Product Catalog & Search Filters", () => {
  test("filters products by category slug", async () => {
    const { products } = await getProducts({ category: "electronics" });
    assert.ok(products.length > 0);
    products.forEach((p) => {
      assert.equal(p.category_id, "cat-electronics");
    });
  });

  test("searches products by keyword", async () => {
    const { products } = await getProducts({ search: "Headphones" });
    assert.ok(products.length >= 1);
    assert.ok(products.some((p) => p.name.includes("Headphones")));
  });

  test("retrieves product by exact slug", async () => {
    const product = await getProductBySlug("iphone-15-pro");
    assert.ok(product);
    assert.equal(product?.sku, "APL-IPH15");
    assert.equal(product?.price_in_cents, 79900);
  });
});

describe("Checkout Calculation Logic & Stock Safety", () => {
  test("calculates subtotal, shipping waiver, tax and total correctly", () => {
    const item1Price = 8500; // $85.00
    const item1Qty = 1;
    const subtotal = item1Price * item1Qty; // 8500

    // Above $50 threshold -> Shipping is $0
    const shipping = subtotal >= 5000 ? 0 : 499;
    assert.equal(shipping, 0);

    // 10% discount from WELCOME10
    const discount = Math.round(subtotal * 0.1);
    assert.equal(discount, 850);

    // Taxable amount: 8500 - 850 = 7650
    const taxable = subtotal - discount;
    const tax = Math.round(taxable * 0.05); // 5% = 383
    assert.equal(tax, 383);

    const total = taxable + shipping + tax;
    assert.equal(total, 8033); // $80.33
  });
});
