"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { CartItem, Coupon } from "../types";
import { useToast } from "./toast-context";

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  subtotalCents: number;
  discountCents: number;
  shippingCents: number;
  taxCents: number;
  totalCents: number;
  appliedCoupon: Coupon | null;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: {
    id: string;
    name: string;
    slug: string;
    price_in_cents: number;
    images?: { image_url: string }[];
    stock_quantity: number;
    variant?: { id: string; title: string; price_in_cents: number };
  }, quantity?: number) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => Promise<{ success: boolean; message: string }>;
  removeCoupon: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "shopease_cart_v2";
const COUPON_STORAGE_KEY = "shopease_coupon_v2";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const { toast } = useToast();

  // Load from local storage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        setItems(JSON.parse(stored));
      }
      const storedCoupon = localStorage.getItem(COUPON_STORAGE_KEY);
      if (storedCoupon) {
        setAppliedCoupon(JSON.parse(storedCoupon));
      }
    } catch {
      // Ignore
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to local storage on change
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
      if (appliedCoupon) {
        localStorage.setItem(COUPON_STORAGE_KEY, JSON.stringify(appliedCoupon));
      } else {
        localStorage.removeItem(COUPON_STORAGE_KEY);
      }
    } catch {
      // Ignore
    }
  }, [items, appliedCoupon, isLoaded]);

  const addToCart = useCallback(
    (product: {
      id: string;
      name: string;
      slug: string;
      price_in_cents: number;
      images?: { image_url: string }[];
      stock_quantity: number;
      variant?: { id: string; title: string; price_in_cents: number };
    }, quantity: number = 1) => {
      const variantId = product.variant?.id;
      const itemId = variantId ? `${product.id}_${variantId}` : product.id;
      const price = product.variant ? product.variant.price_in_cents : product.price_in_cents;
      const imageUrl = product.images?.[0]?.image_url || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500";

      setItems((prev) => {
        const existing = prev.find((i) => i.id === itemId);
        if (existing) {
          const newQty = Math.min(existing.quantity + quantity, product.stock_quantity);
          return prev.map((i) => (i.id === itemId ? { ...i, quantity: newQty } : i));
        } else {
          const newItem: CartItem = {
            id: itemId,
            product_id: product.id,
            variant_id: variantId,
            name: product.name,
            slug: product.slug,
            price_in_cents: price,
            image_url: imageUrl,
            quantity: Math.min(quantity, product.stock_quantity),
            stock_quantity: product.stock_quantity,
            variant_title: product.variant?.title,
          };
          return [...prev, newItem];
        }
      });

      toast({
        title: "Added to Cart!",
        description: `${product.name} ${product.variant ? `(${product.variant.title})` : ""} was added.`,
        type: "success",
      });
      setIsCartOpen(true);
    },
    [toast]
  );

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => i.id !== itemId));
    } else {
      setItems((prev) =>
        prev.map((i) =>
          i.id === itemId ? { ...i, quantity: Math.min(quantity, i.stock_quantity) } : i
        )
      );
    }
  }, []);

  const removeFromCart = useCallback((itemId: string) => {
    setItems((prev) => prev.filter((i) => i.id !== itemId));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setAppliedCoupon(null);
  }, []);

  // Recalculations
  const subtotalCents = items.reduce((acc, item) => acc + item.price_in_cents * item.quantity, 0);

  // Discount
  let discountCents = 0;
  if (appliedCoupon && subtotalCents >= appliedCoupon.min_order_cents) {
    if (appliedCoupon.discount_type === "percentage") {
      discountCents = Math.round(subtotalCents * (appliedCoupon.discount_value / 100));
    } else {
      discountCents = Math.min(appliedCoupon.discount_value, subtotalCents);
    }
  }

  // Shipping: Free if subtotal >= $50 (5000 cents) or if coupon code is FREESHIP
  const isFreeShipping = subtotalCents >= 5000 || appliedCoupon?.code === "FREESHIP";
  const shippingCents = subtotalCents > 0 ? (isFreeShipping ? 0 : 499) : 0;

  // Estimated tax (5%)
  const taxableAmount = Math.max(0, subtotalCents - discountCents);
  const taxCents = Math.round(taxableAmount * 0.05);

  const totalCents = Math.max(0, taxableAmount + shippingCents + taxCents);
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const applyCoupon = useCallback(
    async (code: string) => {
      const cleanCode = code.trim().toUpperCase();
      try {
        const res = await fetch("/api/coupons/validate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code: cleanCode, subtotal_cents: subtotalCents }),
        });
        const data = await res.json();
        if (data.valid && data.coupon) {
          setAppliedCoupon(data.coupon);
          toast({
            title: "Coupon applied!",
            description: `${data.coupon.code} discount applied to your cart.`,
            type: "success",
          });
          return { success: true, message: "Coupon applied successfully" };
        } else {
          toast({
            title: "Invalid coupon",
            description: data.error || "Coupon could not be applied.",
            type: "error",
          });
          return { success: false, message: data.error || "Invalid coupon" };
        }
      } catch {
        // Fallback local validate
        if (cleanCode === "WELCOME10" && subtotalCents >= 2000) {
          const c: Coupon = {
            id: "coup-welcome10",
            code: "WELCOME10",
            discount_type: "percentage",
            discount_value: 10,
            min_order_cents: 2000,
            is_active: true,
          };
          setAppliedCoupon(c);
          toast({ title: "Coupon applied!", description: "10% discount applied.", type: "success" });
          return { success: true, message: "Coupon applied" };
        }
        return { success: false, message: "Failed to validate coupon" };
      }
    },
    [subtotalCents, toast]
  );

  const removeCoupon = useCallback(() => {
    setAppliedCoupon(null);
    toast({ title: "Coupon removed", type: "info" });
  }, [toast]);

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        subtotalCents,
        discountCents,
        shippingCents,
        taxCents,
        totalCents,
        appliedCoupon,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        applyCoupon,
        removeCoupon,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
