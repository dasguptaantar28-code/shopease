"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Heart, ShoppingBag, Star, Check } from "lucide-react";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/formatters";
import { useCart } from "@/lib/store/cart-context";
import { useWishlist } from "@/lib/store/wishlist-context";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [isAdded, setIsAdded] = useState(false);

  const isFavorited = isInWishlist(product.id);
  const primaryImage =
    product.images?.[0]?.image_url ||
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500";

  // Calculate discount percentage
  let discountPercentage = 0;
  if (product.compare_at_price_in_cents && product.compare_at_price_in_cents > product.price_in_cents) {
    discountPercentage = Math.round(
      ((product.compare_at_price_in_cents - product.price_in_cents) /
        product.compare_at_price_in_cents) *
        100
    );
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-100 p-3.5 flex flex-col justify-between shadow-xs hover:shadow-lg transition-all duration-200">
      {/* Top Image area */}
      <div className="relative w-full aspect-square bg-[#F8FAFC] rounded-xl overflow-hidden mb-3.5 flex items-center justify-center">
        {/* Discount badge */}
        {discountPercentage > 0 && (
          <span className="absolute top-2.5 left-2.5 z-10 bg-rose-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-xs">
            -{discountPercentage}%
          </span>
        )}

        {/* Wishlist button */}
        <button
          onClick={handleToggleWishlist}
          className={`absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full flex items-center justify-center transition shadow-xs ${
            isFavorited
              ? "bg-rose-50 text-rose-500"
              : "bg-white/90 text-slate-400 hover:text-rose-500 hover:bg-white"
          }`}
          aria-label={isFavorited ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? "fill-current" : ""}`} />
        </button>

        {/* Product image with subtle hover zoom */}
        <Link href={`/product/${product.slug}`} className="w-full h-full">
          <img
            src={primaryImage}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </Link>
      </div>

      {/* Product Information */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Category */}
          {product.category && (
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
              {product.category.name}
            </p>
          )}

          {/* Title */}
          <h3 className="font-bold text-sm text-[#0B1739] line-clamp-1 group-hover:text-[#1677FF] transition">
            <Link href={`/product/${product.slug}`}>{product.name}</Link>
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-1.5">
            <div className="flex items-center text-amber-400">
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="text-xs font-bold text-slate-800">{product.rating || 4.8}</span>
            <span className="text-xs text-slate-400">({product.review_count || 12})</span>
          </div>
        </div>

        {/* Price & Action Row */}
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-extrabold text-[#0B1739]">
                {formatPrice(product.price_in_cents)}
              </span>
              {product.compare_at_price_in_cents && (
                <span className="text-xs text-slate-400 line-through">
                  {formatPrice(product.compare_at_price_in_cents)}
                </span>
              )}
            </div>
            <p className="text-[10px] text-emerald-600 font-medium">In Stock</p>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className={`p-2.5 rounded-xl flex items-center justify-center transition-all ${
              isAdded
                ? "bg-emerald-600 text-white"
                : "bg-slate-100 text-[#0B1739] hover:bg-[#1677FF] hover:text-white"
            }`}
            aria-label={`Add ${product.name} to cart`}
            title="Add to Cart"
          >
            {isAdded ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
