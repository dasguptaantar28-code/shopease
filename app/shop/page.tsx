"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Filter,
  SlidersHorizontal,
  Search,
  X,
  ChevronDown,
  ShoppingBag,
  Sparkles,
  ArrowUpDown,
} from "lucide-react";
import { ProductCard } from "@/components/storefront/ProductCard";
import { DEMO_CATEGORIES, DEMO_PRODUCTS } from "@/lib/store/demo-data";
import { Product, Category } from "@/lib/types";

function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Query params
  const categoryParam = searchParams.get("category") || "";
  const searchParam = searchParams.get("search") || "";
  const sortParam = searchParams.get("sort") || "featured";
  const minPriceParam = searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : null;
  const maxPriceParam = searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : null;
  const inStockParam = searchParams.get("inStock") === "true";
  const featuredParam = searchParams.get("featured") === "true";

  // Local filter states
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [searchInput, setSearchInput] = useState(searchParam);
  const [sortOption, setSortOption] = useState(sortParam);
  const [inStockOnly, setInStockOnly] = useState(inStockParam);
  const [priceRange, setPriceRange] = useState<string>(
    minPriceParam && maxPriceParam
      ? `${minPriceParam}-${maxPriceParam}`
      : minPriceParam
      ? `${minPriceParam}+`
      : maxPriceParam
      ? `0-${maxPriceParam}`
      : "all"
  );
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Sync state when URL params change
  useEffect(() => {
    setSelectedCategory(categoryParam);
    setSearchInput(searchParam);
    setSortOption(sortParam);
    setInStockOnly(inStockParam);
  }, [categoryParam, searchParam, sortParam, inStockParam]);

  // Push URL update helper
  const updateFilters = (newParams: Record<string, string | null>) => {
    const current = new URLSearchParams(searchParams.toString());
    Object.entries(newParams).forEach(([key, val]) => {
      if (val === null || val === "" || val === "all") {
        current.delete(key);
      } else {
        current.set(key, val);
      }
    });
    router.push(`/shop?${current.toString()}`);
  };

  const handleCategoryChange = (slug: string) => {
    setSelectedCategory(slug);
    updateFilters({ category: slug === "all" ? null : slug });
  };

  const handleSortChange = (sort: string) => {
    setSortOption(sort);
    updateFilters({ sort });
  };

  const handlePriceChange = (range: string) => {
    setPriceRange(range);
    if (range === "all") {
      updateFilters({ minPrice: null, maxPrice: null });
    } else if (range === "0-50") {
      updateFilters({ minPrice: "0", maxPrice: "5000" });
    } else if (range === "50-100") {
      updateFilters({ minPrice: "5000", maxPrice: "10000" });
    } else if (range === "100-300") {
      updateFilters({ minPrice: "10000", maxPrice: "30000" });
    } else if (range === "300+") {
      updateFilters({ minPrice: "30000", maxPrice: null });
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters({ search: searchInput.trim() || null });
  };

  const handleClearFilters = () => {
    setSelectedCategory("");
    setSearchInput("");
    setSortOption("featured");
    setInStockOnly(false);
    setPriceRange("all");
    router.push("/shop");
  };

  // Filter products client-side
  const filteredProducts = useMemo(() => {
    return DEMO_PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory && selectedCategory !== "all") {
        if (product.category?.slug !== selectedCategory && product.category_id !== selectedCategory) {
          return false;
        }
      }

      // Search filter
      if (searchParam) {
        const query = searchParam.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesSku = product.sku.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesSku) return false;
      }

      // Featured filter
      if (featuredParam && !product.is_featured) {
        return false;
      }

      // In stock
      if (inStockOnly && product.stock_quantity <= 0) {
        return false;
      }

      // Price filter
      if (minPriceParam !== null && product.price_in_cents < minPriceParam) {
        return false;
      }
      if (maxPriceParam !== null && product.price_in_cents > maxPriceParam) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortOption === "price_asc") return a.price_in_cents - b.price_in_cents;
      if (sortOption === "price_desc") return b.price_in_cents - a.price_in_cents;
      if (sortOption === "rating") return (b.rating || 0) - (a.rating || 0);
      if (sortOption === "newest") return (b.created_at || "").localeCompare(a.created_at || "");
      return (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0);
    });
  }, [
    selectedCategory,
    searchParam,
    featuredParam,
    inStockOnly,
    minPriceParam,
    maxPriceParam,
    sortOption,
  ]);

  const hasActiveFilters = Boolean(
    selectedCategory ||
      searchParam ||
      featuredParam ||
      inStockOnly ||
      minPriceParam !== null ||
      maxPriceParam !== null
  );

  return (
    <div className="py-6 space-y-6">
      {/* Top Banner & Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0B1739] tracking-tight">
            {selectedCategory
              ? DEMO_CATEGORIES.find((c) => c.slug === selectedCategory)?.name || "Catalog"
              : "All Products"}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Showing {filteredProducts.length} results
            {searchParam && <span> for &ldquo;{searchParam}&rdquo;</span>}
          </p>
        </div>

        {/* Search bar inside catalog */}
        <form onSubmit={handleSearchSubmit} className="flex gap-2 max-w-md w-full">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search in store..."
              className="w-full bg-white border border-slate-200 text-xs sm:text-sm rounded-xl pl-9 pr-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1677FF]"
            />
          </div>
          <button
            type="submit"
            className="bg-[#1677FF] hover:bg-blue-600 text-white font-bold text-xs px-4 py-2 rounded-xl transition shadow-xs"
          >
            Search
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Filters Sidebar (Desktop) */}
        <div className="hidden lg:block space-y-6">
          {/* Active Filters Clear */}
          {hasActiveFilters && (
            <div className="flex items-center justify-between bg-blue-50 border border-blue-100 p-3 rounded-xl">
              <span className="text-xs font-bold text-blue-900">Filters Active</span>
              <button
                onClick={handleClearFilters}
                className="text-xs text-[#1677FF] hover:underline font-semibold flex items-center gap-1"
              >
                <X className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>
          )}

          {/* Categories */}
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs">
            <h3 className="font-bold text-sm text-[#0B1739] mb-3">Categories</h3>
            <div className="space-y-1.5 text-xs">
              <button
                onClick={() => handleCategoryChange("all")}
                className={`w-full text-left py-1.5 px-2.5 rounded-lg transition font-medium ${
                  !selectedCategory || selectedCategory === "all"
                    ? "bg-[#1677FF] text-white font-bold"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                All Categories ({DEMO_PRODUCTS.length})
              </button>
              {DEMO_CATEGORIES.map((cat) => {
                const count = DEMO_PRODUCTS.filter((p) => p.category?.slug === cat.slug).length;
                const isSelected = selectedCategory === cat.slug;
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryChange(cat.slug)}
                    className={`w-full flex items-center justify-between py-1.5 px-2.5 rounded-lg transition font-medium ${
                      isSelected
                        ? "bg-[#1677FF] text-white font-bold"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className={isSelected ? "text-blue-100" : "text-slate-400"}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Price Range */}
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs">
            <h3 className="font-bold text-sm text-[#0B1739] mb-3">Price Range</h3>
            <div className="space-y-2 text-xs">
              {[
                { label: "All Prices", value: "all" },
                { label: "Under $50", value: "0-50" },
                { label: "$50 to $100", value: "50-100" },
                { label: "$100 to $300", value: "100-300" },
                { label: "$300 and Above", value: "300+" },
              ].map((opt) => (
                <label
                  key={opt.value}
                  className="flex items-center gap-2 cursor-pointer text-slate-700 hover:text-brand-blue"
                >
                  <input
                    type="radio"
                    name="price"
                    checked={priceRange === opt.value}
                    onChange={() => handlePriceChange(opt.value)}
                    className="accent-[#1677FF]"
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs">
            <h3 className="font-bold text-sm text-[#0B1739] mb-3">Availability</h3>
            <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700 hover:text-brand-blue">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => {
                  setInStockOnly(e.target.checked);
                  updateFilters({ inStock: e.target.checked ? "true" : null });
                }}
                className="rounded accent-[#1677FF]"
              />
              <span>In Stock Only</span>
            </label>
          </div>
        </div>

        {/* Right Product Grid Area */}
        <div className="lg:col-span-3 space-y-4">
          {/* Top Sort & Filter Bar */}
          <div className="flex items-center justify-between bg-white p-3.5 rounded-2xl border border-slate-100 shadow-xs">
            {/* Mobile Filter Toggle Button */}
            <button
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              className="lg:hidden flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold px-3 py-2 rounded-xl transition"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters {hasActiveFilters ? "(Active)" : ""}</span>
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 text-xs ml-auto">
              <span className="text-slate-500 font-medium hidden sm:inline">Sort by:</span>
              <div className="relative">
                <select
                  value={sortOption}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1677FF] cursor-pointer"
                >
                  <option value="featured">Featured First</option>
                  <option value="newest">Newest Arrivals</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="rating">Top Customer Rated</option>
                </select>
              </div>
            </div>
          </div>

          {/* Mobile Filter Drawer / Collapse */}
          {isMobileFilterOpen && (
            <div className="lg:hidden bg-white p-4 rounded-2xl border border-slate-200 shadow-lg space-y-4 animate-fade-in">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h3 className="font-bold text-sm text-[#0B1739]">Filter Products</h3>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div>
                <p className="font-bold text-xs text-slate-700 mb-2">Category</p>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() => handleCategoryChange("all")}
                    className={`text-xs px-2.5 py-1 rounded-lg ${
                      !selectedCategory ? "bg-[#1677FF] text-white" : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    All
                  </button>
                  {DEMO_CATEGORIES.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => handleCategoryChange(c.slug)}
                      className={`text-xs px-2.5 py-1 rounded-lg ${
                        selectedCategory === c.slug
                          ? "bg-[#1677FF] text-white"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="font-bold text-xs text-slate-700 mb-2">Price</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[
                    { label: "All Prices", value: "all" },
                    { label: "< $50", value: "0-50" },
                    { label: "$50 - $100", value: "50-100" },
                    { label: "$100 - $300", value: "100-300" },
                    { label: "$300+", value: "300+" },
                  ].map((p) => (
                    <button
                      key={p.value}
                      onClick={() => handlePriceChange(p.value)}
                      className={`p-2 rounded-lg text-left ${
                        priceRange === p.value
                          ? "bg-[#1677FF] text-white font-bold"
                          : "bg-slate-50 text-slate-700"
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <button
                  onClick={handleClearFilters}
                  className="text-xs text-rose-600 font-semibold"
                >
                  Reset All
                </button>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="bg-[#1677FF] text-white text-xs font-bold px-4 py-2 rounded-xl"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          )}

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-100 p-12 text-center shadow-xs">
              <div className="w-16 h-16 bg-blue-50 text-brand-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-lg text-[#0B1739]">No products found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-6">
                No items match your active filters or search terms. Try adjusting your price range or
                keywords.
              </p>
              <button
                onClick={handleClearFilters}
                className="inline-flex items-center gap-2 bg-[#1677FF] text-white text-xs font-bold px-5 py-2.5 rounded-xl hover:bg-blue-600 transition"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
              {filteredProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-400">Loading catalog...</div>}>
      <ShopContent />
    </Suspense>
  );
}
