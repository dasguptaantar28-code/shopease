import type { Metadata } from "next";
import "./globals.css";
import { ToastProvider } from "@/lib/store/toast-context";
import { AuthProvider } from "@/lib/store/auth-context";
import { CartProvider } from "@/lib/store/cart-context";
import { WishlistProvider } from "@/lib/store/wishlist-context";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://shopease.store"),
  title: "ShopEase | Shop More • Live Better",
  description:
    "ShopEase is your trusted online retail destination. Discover top-tier electronics, trending apparel, smart home accessories, and daily essentials with fast doorstep delivery.",
  keywords: ["e-commerce", "electronics", "fashion", "shopping", "ShopEase", "Next.js"],
  authors: [{ name: "ShopEase Engineering" }],
  openGraph: {
    title: "ShopEase — Shop More • Live Better",
    description: "Curated electronics, lifestyle, apparel, and essentials at unbeatable prices.",
    siteName: "ShopEase",
    images: [
      {
        url: "/shopease-banner-preview.jpg",
        width: 1200,
        height: 630,
        alt: "ShopEase Storefront Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/shopease-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0B1739] selection:bg-[#1677FF] selection:text-white">
        <ToastProvider>
          <AuthProvider>
            <CartProvider>
              <WishlistProvider>
                <AnnouncementBar />
                <Header />
                <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-10">
                  {children}
                </main>
                <Footer />
                <CartDrawer />
                <MobileBottomNav />
              </WishlistProvider>
            </CartProvider>
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
