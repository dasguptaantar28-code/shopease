-- ==============================================================================
-- ShopEase Seed SQL Data
-- Real categories, products, images, coupons, and store settings
-- ==============================================================================

-- 1. Insert Categories
INSERT INTO public.categories (id, name, slug, description, image_url, display_order, is_active)
VALUES
  ('c0000000-0000-0000-0000-000000000001', 'Electronics', 'electronics', 'Cutting-edge smartphones, laptops, audio gear, and wearables', 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500&auto=format&fit=crop&q=80', 1, true),
  ('c0000000-0000-0000-0000-000000000002', 'Fashion', 'fashion', 'Trending apparel, streetwear, sneakers, and modern accessories', 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=500&auto=format&fit=crop&q=80', 2, true),
  ('c0000000-0000-0000-0000-000000000003', 'Home & Living', 'home-and-living', 'Stylish furniture, ambient lighting, kitchenware, and modern decor', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&auto=format&fit=crop&q=80', 3, true),
  ('c0000000-0000-0000-0000-000000000004', 'Beauty & Health', 'beauty-and-health', 'Premium skincare, wellness essentials, personal care, and fragrance', 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&auto=format&fit=crop&q=80', 4, true),
  ('c0000000-0000-0000-0000-000000000005', 'Sports', 'sports', 'Fitness equipment, athletic footwear, sportswear, and outdoor gear', 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?w=500&auto=format&fit=crop&q=80', 5, true),
  ('c0000000-0000-0000-0000-000000000006', 'Toys & Games', 'toys-and-games', 'Gaming consoles, mechanical keyboards, tabletop games, and collectibles', 'https://images.unsplash.com/photo-1612287232029-7987823521fd?w=500&auto=format&fit=crop&q=80', 6, true),
  ('c0000000-0000-0000-0000-000000000007', 'Groceries', 'groceries', 'Artisanal pantry staples, organic gourmet snacks, coffee, and beverages', 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&auto=format&fit=crop&q=80', 7, true),
  ('c0000000-0000-0000-0000-000000000008', 'Books', 'books', 'Bestselling non-fiction, fiction, design guides, and timeless literature', 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=80', 8, true)
ON CONFLICT (slug) DO NOTHING;

-- 2. Insert Products
INSERT INTO public.products (id, category_id, name, slug, sku, description, short_description, price_in_cents, compare_at_price_in_cents, stock_quantity, rating, review_count, is_featured, is_published)
VALUES
  ('p0000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000001', 'iPhone 15 Pro', 'iphone-15-pro', 'APL-IPH15', 'Crafted with durable lightweight titanium, the iPhone 15 Pro features an industry-leading Super Retina XDR display with ProMotion up to 120Hz.', 'Aerospace-grade titanium design with A17 Pro chip and 48MP camera.', 79900, 89900, 45, 4.8, 124, true, true),
  ('p0000000-0000-0000-0000-000000000002', 'c0000000-0000-0000-0000-000000000002', 'Nike Air Force 1 ''07', 'nike-air-force-1-07', 'NKE-AF1', 'The radiance lives on in the Nike Air Force 1 ''07, the basketball icon that puts a fresh spin on what you know best.', 'The radiance lives on with pristine white leather and durable cushioning.', 8500, 10000, 62, 4.9, 89, true, true),
  ('p0000000-0000-0000-0000-000000000003', 'c0000000-0000-0000-0000-000000000001', 'Sony WH-1000XM5 Wireless Headphones', 'sony-wh-1000xm5-wireless-headphones', 'SNY-WH1000', 'With two processors controlling 8 microphones, Auto NC Optimizer, and high-res audio support, enjoy undisturbed acoustic clarity.', 'Industry-leading noise cancellation with ultra-clear call quality.', 12900, 14900, 38, 4.7, 67, true, true),
  ('p0000000-0000-0000-0000-000000000004', 'c0000000-0000-0000-0000-000000000001', 'Smart Watch Series 8', 'smart-watch-series-8', 'APL-WCH8', 'Advanced health sensors provide insights to help you better understand your wellness, wrapped in an always-on Retina display.', 'Advanced health sensors, ECG, crash detection, and cellular connectivity.', 19900, 24900, 50, 4.8, 102, true, true),
  ('p0000000-0000-0000-0000-000000000005', 'c0000000-0000-0000-0000-000000000002', 'Urban Shield Waterproof Laptop Backpack', 'urban-shield-waterproof-laptop-backpack', 'BPK-URB15', 'Engineered for daily commuters and travelers alike, featuring water-repellent oxford fabric and padded laptop protection.', 'Weatherproof 15.6 inch laptop backpack with anti-theft compartments.', 4900, 6900, 80, 4.6, 49, true, true)
ON CONFLICT (slug) DO NOTHING;

-- 3. Product Images
INSERT INTO public.product_images (product_id, image_url, alt_text, display_order, is_primary)
VALUES
  ('p0000000-0000-0000-0000-000000000001', 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80', 'iPhone 15 Pro front view', 1, true),
  ('p0000000-0000-0000-0000-000000000002', 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format&fit=crop&q=80', 'Nike Air Force 1 sneakers', 1, true),
  ('p0000000-0000-0000-0000-000000000003', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80', 'Sony Headphones black', 1, true),
  ('p0000000-0000-0000-0000-000000000004', 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80', 'Smart Watch Series 8', 1, true),
  ('p0000000-0000-0000-0000-000000000005', 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80', 'Laptop Backpack', 1, true);

-- 4. Coupons
INSERT INTO public.coupons (code, discount_type, discount_value, min_order_cents, is_active)
VALUES
  ('WELCOME10', 'percentage', 10, 2000, true),
  ('SAVE20', 'percentage', 20, 5000, true),
  ('FREESHIP', 'fixed', 499, 2500, true)
ON CONFLICT (code) DO NOTHING;

-- 5. Store Settings
INSERT INTO public.store_settings (key, value)
VALUES
  ('general', '{"store_name":"ShopEase","tagline":"Shop More • Live Better","currency":"USD","currency_symbol":"$","support_email":"support@shopease.store","support_phone":"+1 (800) 555-EASE","standard_shipping_cents":499,"free_shipping_threshold_cents":5000,"tax_rate_percent":5}'::jsonb)
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
