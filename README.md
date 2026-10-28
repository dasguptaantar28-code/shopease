# ShopEase — Shop More • Live Better

ShopEase is a modern, responsive, production-minded e-commerce web application built with **Next.js 16 App Router**, **React 19**, **TypeScript**, **Tailwind CSS**, **Lucide Icons**, and **Supabase** (PostgreSQL, Auth, and Storage).

Designed with a trustworthy navy (`#0B1739`) and vibrant blue (`#1677FF`) retail aesthetic, ShopEase delivers a frictionless shopping experience across mobile, tablet, laptop, and desktop.

---

## Features

### 🛍️ Customer Storefront
- **Home Page**:
  - Promotional announcement bar with active promo codes (`WELCOME10`).
  - Responsive header with search bar, account dropdown, wishlist counter, and cart badge.
  - Category navigation dropdown ("All Categories") and quick links.
  - Hero banner with headline, call-to-actions, and product showcase collage.
  - Popular categories grid with clean icons and hover effects.
  - Featured products grid with discount badges, real-time prices, star ratings, wishlist toggles, and quick add-to-cart.
  - Limited-time promotional callout with `SAVE20` coupon.
  - Trending new arrivals.
  - Customer testimonials clearly tagged as demo feedback.
  - Trust value props (Wide Range, Secure Payment, Fast Delivery, 24/7 Support).
  - Newsletter subscription form with feedback.
  - Detailed footer with category links, customer care, legal policies, and tech stack badges.
- **Product Catalog (`/shop`, `/products`)**:
  - Multi-criteria filters: Category, price range, stock availability.
  - Search query integration with instant URL sync.
  - Sorting: Featured, Newest, Price (Low to High, High to Low), Top Rated.
  - Empty state with reset filters button.
- **Product Detail Page (`/product/[slug]`)**:
  - Interactive multi-image gallery with thumbnail selection.
  - Title, SKU, in-stock count, ratings, and price comparison.
  - Variant selector (storage/color/size) dynamically updating active price and SKU.
  - Quantity stepper with stock boundary limits.
  - Customer reviews list and interactive "Write a Review" modal.
  - Related products grid.
- **Shopping Cart (`/cart` & Slide-over Drawer)**:
  - Quantity increment/decrement and item removal.
  - Free shipping progress indicator ($50 threshold).
  - Server-verified coupon discount code validation.
  - Subtotal, discount, shipping, tax, and order total calculation.
- **Secure Checkout (`/checkout`)**:
  - Validated shipping address form.
  - Supported payment methods: Cash on Delivery (COD) and real test-mode payment simulation.
  - Server-side price recalculation (never trusts client prices).
  - Order confirmation with celebratory confetti.
- **Order Success & Tracking (`/order-success/[id]`)**:
  - Order confirmation number, timeline (Confirmed → Processing → Shipped → Delivered).
  - Printable receipt button.
- **Customer Account Portal (`/account`)**:
  - `/account/orders`: Past order history with fulfillment status tags and order details.
  - `/account/wishlist`: Saved products with quick add-to-cart.
  - `/account/addresses`: Saved delivery addresses with primary default toggle.
  - `/account/profile`: Personal contact details.
- **Information & Policy Pages**:
  - `/about`: Brand story, mission, and quality promise.
  - `/contact`: Functional contact form and headquarters information.
  - `/faq`: Searchable interactive accordion FAQ.
  - `/policies/shipping`: Shipping times, free delivery terms, and tracking rules.
  - `/policies/returns`: 30-day money-back guarantee terms.
  - `/policies/privacy`: Privacy compliance template.
  - `/policies/terms`: Standard terms of service template.

---

### 🛡️ Admin Dashboard (`/admin`)
- **Role-Protected Access**: Public sign-ups strictly receive `customer` role. Admin routes require verified `admin` role in database profiles. Includes a quick demo switcher for testers and reviewers.
- **Overview Dashboard (`/admin`)**: Real metrics calculated from the database: Total Revenue, Total Orders, Active Customers, Total Products, Low Stock alerts count, and recent orders list.
- **Product Catalog Management (`/admin/products`)**: Search, filter, view stock, archive products, and create new products (`/admin/products/new`).
- **Category Management (`/admin/categories`)**: Create and manage storefront categories, descriptions, and cover imagery.
- **Order Processing (`/admin/orders`)**: Filter by payment and fulfillment states, view line items, update fulfillment (Processing, Shipped, Delivered, Cancelled), and assign carrier tracking numbers.
- **Inventory Management (`/admin/inventory`)**: Real-time stock counts, quick adjustment steppers (`+10`, `-5`), and low stock warnings.
- **Customer Directory (`/admin/customers`)**: Lifetime spend and order counts per customer.
- **Coupon Vouchers (`/admin/coupons`)**: Create percentage or fixed discount coupons with minimum order rules and copy buttons.
- **Review Moderation (`/admin/reviews`)**: Approve or reject customer reviews before public display.
- **Store Settings (`/admin/settings`)**: Configure currency code, symbol, shipping fees, free shipping threshold, and contact information.

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router, Turbopack, Partial Prefetching) |
| **Language** | TypeScript 5 (Strict Mode) |
| **Styling** | Tailwind CSS v4, Custom Design Tokens |
| **Icons** | Lucide React |
| **Backend & Database** | Supabase (PostgreSQL 15+, Row Level Security) |
| **Authentication** | Supabase Auth (`@supabase/ssr`) |
| **Storage** | Supabase Storage (`product-images` bucket) |
| **Form Validation** | Zod, React Hook Form |
| **Testing** | Node.js Test Runner + tsx |

---

## Getting Started (Prerequisites & Installation)

### Prerequisites
- Node.js 18+ or 20+ (Node 24 tested)
- npm

### 1. Clone & Install Dependencies
On Windows PowerShell:
```powershell
cd shopease
npm.cmd install
```

### 2. Environment Variables Setup
Copy the example environment file:
```powershell
Copy-Item .env.example .env.local
```

Edit `.env.local` with your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```
> **Note on Demo Mode:** If Supabase environment variables are left as placeholders, ShopEase runs in high-fidelity demo mode with pre-seeded products, categories, coupons, and orders, allowing full testing of every button, cart, and checkout flow without crashing.

---

## Supabase Database & Security Setup

### 1. Run Database Migrations
In your Supabase project dashboard, navigate to the **SQL Editor** and run:
1. `supabase/migrations/20261028_000001_initial_schema.sql`:
   - Creates `profiles`, `categories`, `products`, `product_images`, `product_variants`, `coupons`, `orders`, `order_items`, `addresses`, `reviews`, `wishlists`, and `store_settings`.
   - Enables **Row Level Security (RLS)** on all tables with least-privilege policies.
   - Creates triggers and `is_admin()` security function.

2. `supabase/seed.sql`:
   - Seeds initial categories, products matching the design mockup, coupons (`WELCOME10`, `SAVE20`, `FREESHIP`), and default store settings.

### 2. Storage Setup
Run `supabase/storage_setup.sql` in the Supabase SQL Editor:
- Creates the `product-images` public bucket (5MB file size limit).
- Configures public read access and restricts uploads and deletions strictly to admins.

### 3. Bootstrap First Administrator
Public sign-up strictly defaults to `customer`. To promote your account to `admin`:
1. Register your account at `/auth/register` (e.g., `admin@shopease.store`).
2. Open `supabase/bootstrap_admin.sql`, replace `'admin@shopease.store'` with your email, and execute it in the Supabase SQL Editor.

---

## Running the Application

### Development Server
```powershell
npm.cmd run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Running Test Suite
```powershell
npm.cmd test
```
Runs unit and integration tests covering pricing calculations, coupon thresholds, category filters, and checkout logic.

### Production Build
```powershell
npm.cmd run build
```
Creates an optimized production build with prerendered static pages and server routes.

---

## Free-Tier Strategy & Deployment

### Supabase Free Tier Guidelines
- **Database**: 500 MB PostgreSQL database (sufficient for thousands of catalog items and orders).
- **Storage**: 1 GB file storage (accommodates ~2,000 product images optimized under 500 KB).
- **Auth**: Up to 50,000 monthly active users included.
- **Inactivity Warning**: Supabase free projects pause after 7 days of inactivity. To keep your project active, set up a health check ping or perform periodic queries.

### Deploying to Vercel
1. Push your repository to **GitHub**:
   ```powershell
   git init
   git add .
   git commit -m "Initial commit: ShopEase complete e-commerce application"
   git remote add origin https://github.com/YOUR_USERNAME/shopease.git
   git branch -M main
   git push -u origin main
   ```
2. In the [Vercel Dashboard](https://vercel.com):
   - Click **Add New Project** and import the `shopease` GitHub repository.
   - In the **Environment Variables** section, add:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `SUPABASE_SERVICE_ROLE_KEY`
     - `NEXT_PUBLIC_SITE_URL` (your custom domain or `.vercel.app` URL)
   - Click **Deploy**.

---

## Project Structure

```
shopease/
├── app/
│   ├── about/page.tsx               # About ShopEase
│   ├── account/                     # Customer portal (orders, wishlist, addresses, profile)
│   ├── admin/                       # Protected admin control panel (CRUD, inventory, orders, settings)
│   ├── api/checkout/route.ts        # Server checkout & price recalculation endpoint
│   ├── api/coupons/validate/        # Server coupon validation
│   ├── auth/                        # Login & Registration pages
│   ├── cart/page.tsx                # Shopping Cart page
│   ├── checkout/page.tsx            # Validated checkout with COD & real test mode
│   ├── contact/page.tsx             # Contact support inquiry form
│   ├── faq/page.tsx                 # Searchable accordion FAQ
│   ├── order-success/[id]/page.tsx  # Order confirmation & delivery timeline
│   ├── policies/                    # Shipping, Returns, Privacy, Terms
│   ├── product/[slug]/page.tsx      # Product detail page & reviews modal
│   ├── shop/page.tsx                # Product catalog with filters & search
│   ├── layout.tsx                   # Root layout with providers & navigation
│   ├── page.tsx                     # Storefront home page
│   ├── sitemap.ts                   # Dynamic SEO sitemap
│   └── robots.ts                    # Search engine crawling rules
├── components/
│   ├── brand/Logo.tsx               # SVG ShopEase brand logo
│   ├── cart/CartDrawer.tsx          # Slide-over cart drawer
│   ├── layout/                      # Header, AnnouncementBar, Footer, MobileBottomNav
│   ├── storefront/                  # HeroBanner, ProductCard, CategoryGrid, ValueProps
│   └── admin/AdminLayout.tsx        # Role-protected admin layout & navigation
├── lib/
│   ├── formatters.ts                # Price (minor unit cents), date, and slug utilities
│   ├── types.ts                     # TypeScript data models
│   ├── supabase/                    # Client, Server, and Admin Supabase instances
│   └── store/                       # Cart, Wishlist, Auth, and Toast contexts & repository
├── supabase/
│   ├── migrations/                  # Initial SQL schema with RLS policies
│   ├── seed.sql                     # Seed catalog data matching design mockup
│   ├── storage_setup.sql            # Storage bucket & access policies
│   └── bootstrap_admin.sql          # Secure first-admin promotion script
└── tests/
    └── shopease.test.ts             # Test suite
```

---

## License

This project is open-source and available under the [MIT License](LICENSE).
