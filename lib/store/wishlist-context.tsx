"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { Product } from "../types";
import { useToast } from "./toast-context";

interface WishlistContextType {
  wishlist: Product[];
  wishlistCount: number;
  isInWishlist: (productId: string) => boolean;
  toggleWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

const WISHLIST_STORAGE_KEY = "shopease_wishlist_v2";

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (stored) {
        setWishlist(JSON.parse(stored));
      }
    } catch {
      // Ignore
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch {
      // Ignore
    }
  }, [wishlist, isLoaded]);

  const isInWishlist = useCallback(
    (productId: string) => {
      return wishlist.some((p) => p.id === productId);
    },
    [wishlist]
  );

  const toggleWishlist = useCallback(
    (product: Product) => {
      setWishlist((prev) => {
        const exists = prev.some((p) => p.id === product.id);
        if (exists) {
          toast({
            title: "Removed from Wishlist",
            description: `${product.name} removed from your saved items.`,
            type: "info",
          });
          return prev.filter((p) => p.id !== product.id);
        } else {
          toast({
            title: "Added to Wishlist!",
            description: `${product.name} saved to your favorites.`,
            type: "success",
          });
          return [...prev, product];
        }
      });
    },
    [toast]
  );

  const removeFromWishlist = useCallback(
    (productId: string) => {
      setWishlist((prev) => prev.filter((p) => p.id !== productId));
      toast({
        title: "Removed from Wishlist",
        type: "info",
      });
    },
    [toast]
  );

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistCount: wishlist.length,
        isInWishlist,
        toggleWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
