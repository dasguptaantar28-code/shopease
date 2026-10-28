"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Star,
  Heart,
  ShoppingBag,
  Truck,
  ShieldCheck,
  RotateCcw,
  Check,
  Share2,
  Plus,
  Minus,
  MessageSquarePlus,
} from "lucide-react";
import { Product, ProductVariant, Review } from "@/lib/types";
import { DEMO_PRODUCTS, DEMO_REVIEWS } from "@/lib/store/demo-data";
import { formatPrice, formatDate } from "@/lib/formatters";
import { useCart } from "@/lib/store/cart-context";
import { useWishlist } from "@/lib/store/wishlist-context";
import { useToast } from "@/lib/store/toast-context";
import { ProductCard } from "@/components/storefront/ProductCard";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  const product = DEMO_PRODUCTS.find((p) => p.slug === slug || p.id === slug);

  if (!product) {
    notFound();
  }

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { toast } = useToast();

  // State
  const [selectedImage, setSelectedImage] = useState(
    product.images?.[0]?.image_url || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800"
  );
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    product.variants?.[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState<Review[]>(
    DEMO_REVIEWS.filter((r) => r.product_id === product.id)
  );

  // Review Form Modal
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [newAuthor, setNewAuthor] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [newTitle, setNewTitle] = useState("");
  const [newComment, setNewComment] = useState("");

  const isFavorited = isInWishlist(product.id);
  const currentPrice = selectedVariant ? selectedVariant.price_in_cents : product.price_in_cents;

  const relatedProducts = DEMO_PRODUCTS.filter(
    (p) => p.id !== product.id && p.category_id === product.category_id
  ).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(
      {
        ...product,
        variant: selectedVariant
          ? {
              id: selectedVariant.id,
              title: selectedVariant.title,
              price_in_cents: selectedVariant.price_in_cents,
            }
          : undefined,
      },
      quantity
    );
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newComment.trim()) {
      toast({ title: "Please fill in all review fields", type: "error" });
      return;
    }

    const createdRev: Review = {
      id: `rev-${Date.now()}`,
      product_id: product.id,
      author_name: newAuthor.trim(),
      rating: newRating,
      title: newTitle.trim() || "Great purchase",
      comment: newComment.trim(),
      is_approved: true,
      created_at: new Date().toISOString(),
    };

    setReviews([createdRev, ...reviews]);
    setIsReviewModalOpen(false);
    setNewAuthor("");
    setNewTitle("");
    setNewComment("");
    toast({
      title: "Review submitted!",
      description: "Thank you for your valuable feedback.",
      type: "success",
    });
  };

  return (
    <div className="py-6 space-y-12">
      {/* Breadcrumb */}
      <nav className="text-xs text-slate-500 flex items-center gap-2">
        <Link href="/" className="hover:text-brand-blue">
          Home
        </Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-brand-blue">
          Shop
        </Link>
        <span>/</span>
        {product.category && (
          <>
            <Link
              href={`/shop?category=${product.category.slug}`}
              className="hover:text-brand-blue"
            >
              {product.category.name}
            </Link>
            <span>/</span>
          </>
        )}
        <span className="text-[#0B1739] font-semibold truncate max-w-[200px]">
          {product.name}
        </span>
      </nav>

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left: Image Gallery */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Large Image */}
          <div className="relative aspect-square sm:aspect-4/3 w-full bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-xs flex items-center justify-center p-4">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Thumbnail list */}
          {product.images && product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img) => (
                <button
                  key={img.id}
                  onClick={() => setSelectedImage(img.image_url)}
                  className={`w-20 h-20 rounded-2xl bg-white border p-1 shrink-0 overflow-hidden transition ${
                    selectedImage === img.image_url
                      ? "border-[#1677FF] ring-2 ring-blue-100"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <img
                    src={img.image_url}
                    alt={img.alt_text || product.name}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Buy Box */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            {product.category && (
              <span className="text-xs font-bold text-[#1677FF] uppercase tracking-wider">
                {product.category.name}
              </span>
            )}
            <h1 className="text-2xl sm:text-3xl font-black text-[#0B1739] tracking-tight mt-1">
              {product.name}
            </h1>

            {/* Rating & SKU */}
            <div className="flex items-center gap-4 mt-2.5 text-xs text-slate-500">
              <div className="flex items-center gap-1 text-amber-500">
                <Star className="w-4 h-4 fill-current" />
                <span className="font-bold text-slate-900">{product.rating || 4.8}</span>
                <span className="text-slate-400">({reviews.length || product.review_count} reviews)</span>
              </div>
              <span>•</span>
              <span>SKU: {selectedVariant?.sku || product.sku}</span>
            </div>
          </div>

          {/* Price Box */}
          <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-xs flex items-baseline justify-between">
            <div>
              <span className="text-3xl font-black text-[#0B1739]">
                {formatPrice(currentPrice)}
              </span>
              {product.compare_at_price_in_cents && (
                <span className="text-sm text-slate-400 line-through ml-2 font-medium">
                  {formatPrice(product.compare_at_price_in_cents)}
                </span>
              )}
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
              In Stock ({product.stock_quantity} available)
            </span>
          </div>

          {/* Short description */}
          <p className="text-sm text-slate-600 leading-relaxed">
            {product.short_description || product.description}
          </p>

          {/* Variants selector (if present) */}
          {product.variants && product.variants.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Select Option / Variant:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {product.variants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariant(v)}
                    className={`p-2.5 rounded-xl text-left border text-xs font-semibold transition ${
                      selectedVariant?.id === v.id
                        ? "border-[#1677FF] bg-blue-50/50 text-[#1677FF] ring-2 ring-blue-100"
                        : "border-slate-200 hover:border-slate-300 text-slate-700"
                    }`}
                  >
                    <p className="truncate">{v.title}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {formatPrice(v.price_in_cents)}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector & Add to Cart */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              {/* Quantity Stepper */}
              <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-3 text-slate-600 hover:bg-slate-100 transition"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 text-sm font-bold text-slate-900 min-w-8 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock_quantity, quantity + 1))}
                  className="px-3 py-3 text-slate-600 hover:bg-slate-100 transition"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add to Cart CTA */}
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 bg-[#1677FF] hover:bg-blue-600 text-white font-bold text-sm py-3 px-6 rounded-xl shadow-md transition transform hover:-translate-y-0.5"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product)}
                className={`p-3 rounded-xl border transition shadow-xs ${
                  isFavorited
                    ? "bg-rose-50 border-rose-200 text-rose-500"
                    : "bg-white border-slate-200 text-slate-500 hover:text-rose-500 hover:border-rose-200"
                }`}
                title="Save to Wishlist"
              >
                <Heart className={`w-5 h-5 ${isFavorited ? "fill-current" : ""}`} />
              </button>
            </div>
          </div>

          {/* Trust Guarantees */}
          <div className="border-t border-slate-200 pt-5 space-y-3 text-xs text-slate-600">
            <div className="flex items-center gap-2.5">
              <Truck className="w-4 h-4 text-[#1677FF]" />
              <span>Free delivery on orders over $50</span>
            </div>
            <div className="flex items-center gap-2.5">
              <RotateCcw className="w-4 h-4 text-[#1677FF]" />
              <span>30-Day Hassle-Free Returns & Money Back Guarantee</span>
            </div>
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>100% Genuine Brand Warranty Guaranteed</span>
            </div>
          </div>
        </div>
      </div>

      {/* Full Description & Specs */}
      <section className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-10 shadow-xs space-y-4">
        <h2 className="text-xl font-bold text-[#0B1739] tracking-tight">Product Overview</h2>
        <div className="prose prose-slate max-w-none text-sm text-slate-600 leading-relaxed space-y-3">
          <p>{product.description}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
            <div className="bg-slate-50 p-4 rounded-xl">
              <h4 className="font-bold text-xs text-[#0B1739] mb-1">Authenticity & Quality</h4>
              <p className="text-xs text-slate-500">
                Directly sourced from verified brand distributors with genuine warranty certificates.
              </p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl">
              <h4 className="font-bold text-xs text-[#0B1739] mb-1">Packaging & Care</h4>
              <p className="text-xs text-slate-500">
                Shipped in tamper-evident protective transit packaging to ensure pristine delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-10 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <h2 className="text-xl font-bold text-[#0B1739] tracking-tight">Customer Reviews</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Backed by real feedback from verified customers
            </p>
          </div>
          <button
            onClick={() => setIsReviewModalOpen(true)}
            className="inline-flex items-center gap-2 bg-[#0B1739] text-white hover:bg-slate-800 text-xs font-bold px-4 py-2.5 rounded-xl transition"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>Write a Review</span>
          </button>
        </div>

        {/* Reviews List */}
        <div className="space-y-4 divide-y divide-slate-100">
          {reviews.length === 0 ? (
            <p className="text-xs text-slate-400 py-4">
              No reviews yet for this product. Be the first to share your thoughts!
            </p>
          ) : (
            reviews.map((rev) => (
              <div key={rev.id} className="pt-4 first:pt-0 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="font-bold text-xs text-[#0B1739]">{rev.title}</span>
                  </div>
                  <span className="text-[11px] text-slate-400">{formatDate(rev.created_at)}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{rev.comment}</p>
                <div className="flex items-center gap-1.5 text-[10px] text-emerald-600 font-semibold">
                  <Check className="w-3 h-3" />
                  <span>{rev.author_name} (Verified Purchase)</span>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Review Submission Modal */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-fade-in">
            <h3 className="font-bold text-lg text-[#0B1739]">Review &ldquo;{product.name}&rdquo;</h3>
            <form onSubmit={handleReviewSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Your Name</label>
                <input
                  type="text"
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  placeholder="e.g. Alex T."
                  className="w-full border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-[#1677FF]"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setNewRating(star)}
                      className="p-1 text-amber-400 focus:outline-none"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= newRating ? "fill-current" : "text-slate-200"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Headline</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Exceeded my expectations!"
                  className="w-full border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-[#1677FF]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Your Review</label>
                <textarea
                  rows={3}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="How was the product quality, shipping speed, and overall experience?"
                  className="w-full border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-[#1677FF]"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsReviewModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#1677FF] hover:bg-blue-600 text-white font-bold shadow-xs"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="space-y-6">
          <h2 className="text-xl font-bold text-[#0B1739] tracking-tight">Related Products</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
