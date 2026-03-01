"use client";

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  KeyboardEvent,
} from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faClock,
  faFire,
  faTimes,
  faArrowRight,
  faTag,
  faLayerGroup,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { getProducts } from "@/src/features/products/server/products.action";
import { Product } from "@/src/features/products/types/products.types";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────
interface SearchResult {
  products: Product[];
  categories: { _id: string; name: string; image: string }[];
  brands: { _id: string; name: string; image: string }[];
}

interface SearchBarProps {
  autoFocus?: boolean;
  onClose?: () => void;
  placeholder?: string;
  className?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────
const RECENT_KEY = "freshcart_recent_searches";
const MAX_RECENT = 6;
const DEBOUNCE_MS = 280;

const TRENDING = [
  "Fresh vegetables",
  "Organic fruits",
  "Dairy products",
  "Whole grain bread",
  "Chicken breast",
  "Greek yogurt",
];

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────
function getRecent(): string[] {
  try {
    return JSON.parse(localStorage.getItem(RECENT_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function saveRecent(query: string) {
  try {
    const existing = getRecent().filter(
      (r) => r.toLowerCase() !== query.toLowerCase()
    );
    localStorage.setItem(
      RECENT_KEY,
      JSON.stringify([query, ...existing].slice(0, MAX_RECENT))
    );
  } catch {}
}

function removeRecent(query: string) {
  try {
    localStorage.setItem(
      RECENT_KEY,
      JSON.stringify(getRecent().filter((r) => r !== query))
    );
  } catch {}
}

/** Wrap matched text in a <mark> span */
function Highlight({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>;
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className="bg-green-100 text-green-800 rounded-sm px-0.5 not-italic font-semibold">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────────────────────
export default function SearchBar({
  autoFocus = false,
  onClose,
  placeholder = "Search fresh groceries, brands, categories…",
  className = "",
}: SearchBarProps) {
  const router = useRouter();

  // ── state ──────────────────────────────────────────────────────────────────
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);

  // ── refs ───────────────────────────────────────────────────────────────────
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── fetch products lazily on first focus ───────────────────────────────────
  const fetchProducts = useCallback(async () => {
    if (hasFetched) return;
    setIsLoading(true);
    try {
      const res = await getProducts();
      setAllProducts(res.data);
      setHasFetched(true);
    } catch {
      // fail silently
    } finally {
      setIsLoading(false);
    }
  }, [hasFetched]);

  // ── debounce ───────────────────────────────────────────────────────────────
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setDebouncedQuery(query);
      setActiveIndex(-1);
    }, DEBOUNCE_MS);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  // ── click outside ──────────────────────────────────────────────────────────
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ── auto-focus ─────────────────────────────────────────────────────────────
  useEffect(() => {
    if (autoFocus) {
      inputRef.current?.focus();
      setRecentSearches(getRecent());
      setIsOpen(true);
      fetchProducts();
    }
  }, [autoFocus, fetchProducts]);

  // ── search results ─────────────────────────────────────────────────────────
  const results: SearchResult = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();
    if (!q || allProducts.length === 0) {
      return { products: [], categories: [], brands: [] };
    }

    // Products
    const matchedProducts = allProducts
      .filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.brand?.name?.toLowerCase().includes(q) ||
          p.category?.name?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q)
      )
      .slice(0, 5);

    // Unique categories
    const seenCat = new Set<string>();
    const matchedCategories: SearchResult["categories"] = [];
    for (const p of allProducts) {
      if (
        p.category?.name?.toLowerCase().includes(q) &&
        !seenCat.has(p.category._id)
      ) {
        seenCat.add(p.category._id);
        matchedCategories.push(p.category);
        if (matchedCategories.length === 3) break;
      }
    }

    // Unique brands
    const seenBrand = new Set<string>();
    const matchedBrands: SearchResult["brands"] = [];
    for (const p of allProducts) {
      if (
        p.brand?.name?.toLowerCase().includes(q) &&
        !seenBrand.has(p.brand._id)
      ) {
        seenBrand.add(p.brand._id);
        matchedBrands.push(p.brand);
        if (matchedBrands.length === 3) break;
      }
    }

    return {
      products: matchedProducts,
      categories: matchedCategories,
      brands: matchedBrands,
    };
  }, [debouncedQuery, allProducts]);

  const hasResults =
    results.products.length > 0 ||
    results.categories.length > 0 ||
    results.brands.length > 0;

  // ── flat navigatable items: for keyboard nav ───────────────────────────────
  const flatItems = useMemo(() => {
    const q = debouncedQuery.trim();
    if (!q) {
      return [
        ...recentSearches.map((r) => ({ type: "recent" as const, label: r })),
        ...TRENDING.map((t) => ({ type: "trending" as const, label: t })),
      ];
    }
    return [
      ...results.products.map((p) => ({ type: "product" as const, id: p._id, label: p.title })),
      ...results.categories.map((c) => ({ type: "category" as const, id: c._id, label: c.name })),
      ...results.brands.map((b) => ({ type: "brand" as const, id: b._id, label: b.name })),
      ...(hasResults ? [{ type: "viewAll" as const, label: q }] : []),
    ];
  }, [debouncedQuery, recentSearches, results, hasResults]);

  // ── navigate ───────────────────────────────────────────────────────────────
  const navigate = useCallback(
    (item: (typeof flatItems)[number]) => {
      setIsOpen(false);
      onClose?.();
      const q = item.label;
      if (item.type === "product") {
        saveRecent(q);
        router.push(`/products/${item.id}`);
      } else if (item.type === "category") {
        saveRecent(q);
        router.push(`/categories/${item.id}`);
      } else if (item.type === "brand") {
        saveRecent(q);
        router.push(`/brands/${item.id}`);
      } else {
        // recent | trending | viewAll
        saveRecent(q);
        setQuery(q);
        router.push(`/products?q=${encodeURIComponent(q)}`);
      }
    },
    [router, onClose]
  );

  const submitSearch = useCallback(
    (q: string) => {
      if (!q.trim()) return;
      saveRecent(q.trim());
      setIsOpen(false);
      onClose?.();
      router.push(`/products?q=${encodeURIComponent(q.trim())}`);
    },
    [router, onClose]
  );

  // ── keyboard ───────────────────────────────────────────────────────────────
  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (!isOpen) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, flatItems.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, -1));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (activeIndex >= 0 && flatItems[activeIndex]) {
          navigate(flatItems[activeIndex]);
        } else {
          submitSearch(query);
        }
      } else if (e.key === "Escape") {
        setIsOpen(false);
        inputRef.current?.blur();
      }
    },
    [isOpen, flatItems, activeIndex, navigate, submitSearch, query]
  );

  // ── handlers ───────────────────────────────────────────────────────────────
  const handleFocus = () => {
    setRecentSearches(getRecent());
    setIsOpen(true);
    fetchProducts();
  };

  const handleDeleteRecent = (e: React.MouseEvent, term: string) => {
    e.stopPropagation();
    removeRecent(term);
    setRecentSearches(getRecent());
  };

  const handleClearQuery = () => {
    setQuery("");
    setDebouncedQuery("");
    inputRef.current?.focus();
  };

  const showEmpty = isOpen && !debouncedQuery.trim();
  const showResults = isOpen && !!debouncedQuery.trim();
  const isDropdownVisible = showEmpty || showResults;

  // index offset helpers
  const productStart = 0;
  const categoryStart = results.products.length;
  const brandStart = categoryStart + results.categories.length;
  const viewAllIdx = brandStart + results.brands.length;

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {/* ── Input ── */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitSearch(query);
        }}
      >
        <div className="relative flex items-center">
          {/* Search icon */}
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
            {isLoading ? (
              <svg
                className="w-4 h-4 text-green-500 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
            ) : (
              <FontAwesomeIcon
                icon={faSearch}
                className={`w-3.5 h-3.5 transition-colors ${isOpen ? "text-green-600" : "text-gray-400"}`}
              />
            )}
          </div>

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={handleFocus}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            autoComplete="off"
            spellCheck={false}
            className="w-full pl-10 pr-10 py-2.5 text-sm border-2 rounded-xl transition-all bg-gray-50 focus:bg-white placeholder:text-gray-400 focus:outline-none focus:ring-0 border-gray-200 focus:border-green-500"
            aria-label="Search products"
            aria-autocomplete="list"
            aria-expanded={isDropdownVisible}
            role="combobox"
          />

          {/* Clear button */}
          {query && (
            <button
              type="button"
              onClick={handleClearQuery}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
              aria-label="Clear search"
            >
              <FontAwesomeIcon icon={faTimes} className="w-2.5 h-2.5 text-gray-600" />
            </button>
          )}
        </div>
      </form>

      {/* ── Dropdown ── */}
      {isDropdownVisible && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden max-h-[80vh] overflow-y-auto">

          {/* ── Empty state: recents + trending ── */}
          {showEmpty && (
            <div className="p-3">
              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div className="mb-3">
                  <div className="flex items-center justify-between px-2 mb-1.5">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      Recent
                    </p>
                    <button
                      onClick={() => {
                        localStorage.removeItem(RECENT_KEY);
                        setRecentSearches([]);
                      }}
                      className="text-[10px] text-gray-400 hover:text-red-500 transition-colors"
                    >
                      Clear all
                    </button>
                  </div>
                  <ul>
                    {recentSearches.map((term, i) => {
                      const flatIdx = i;
                      return (
                        <li key={term}>
                          <button
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => navigate({ type: "recent", label: term })}
                            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-left transition-colors ${
                              activeIndex === flatIdx ? "bg-green-50 text-green-700" : "hover:bg-gray-50 text-gray-700"
                            }`}
                          >
                            <FontAwesomeIcon icon={faClock} className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                            <span className="flex-1 truncate">{term}</span>
                            <button
                              onClick={(e) => handleDeleteRecent(e, term)}
                              className="w-5 h-5 flex items-center justify-center rounded-full hover:bg-gray-200 text-gray-400 hover:text-gray-600 transition-colors shrink-0"
                              aria-label={`Remove ${term}`}
                            >
                              <FontAwesomeIcon icon={faTimes} className="w-2.5 h-2.5" />
                            </button>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}

              {/* Divider */}
              {recentSearches.length > 0 && (
                <div className="border-t border-gray-100 my-2" />
              )}

              {/* Trending */}
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2 mb-1.5">
                  Trending
                </p>
                <ul className="flex flex-wrap gap-2 px-2">
                  {TRENDING.map((term, i) => {
                    const flatIdx = recentSearches.length + i;
                    return (
                      <li key={term}>
                        <button
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => navigate({ type: "trending", label: term })}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                            activeIndex === flatIdx
                              ? "bg-green-600 text-white border-green-600"
                              : "bg-gray-50 text-gray-700 border-gray-200 hover:border-green-400 hover:text-green-700"
                          }`}
                        >
                          <FontAwesomeIcon icon={faFire} className="w-2.5 h-2.5 text-orange-400" />
                          {term}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          )}

          {/* ── Search results ── */}
          {showResults && (
            <>
              {isLoading && (
                <div className="flex items-center justify-center py-10">
                  <svg className="w-6 h-6 text-green-500 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                </div>
              )}

              {!isLoading && !hasResults && (
                <div className="py-10 text-center">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FontAwesomeIcon icon={faSearch} className="w-5 h-5 text-gray-400" />
                  </div>
                  <p className="text-gray-700 font-semibold text-sm">No results for &ldquo;{debouncedQuery}&rdquo;</p>
                  <p className="text-gray-400 text-xs mt-1">Try a different keyword</p>
                </div>
              )}

              {!isLoading && hasResults && (
                <div className="p-3 space-y-3">
                  {/* Products */}
                  {results.products.length > 0 && (
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2 mb-1.5">
                        Products
                      </p>
                      <ul>
                        {results.products.map((product, i) => {
                          const flatIdx = productStart + i;
                          return (
                            <li key={product._id}>
                              <button
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => navigate({ type: "product", id: product._id, label: product.title })}
                                className={`w-full flex items-center gap-3 px-2 py-2 rounded-xl text-left transition-colors ${
                                  activeIndex === flatIdx ? "bg-green-50" : "hover:bg-gray-50"
                                }`}
                              >
                                {/* Product image */}
                                <div className="w-10 h-10 rounded-lg bg-gray-100 overflow-hidden shrink-0 border border-gray-100">
                                  <Image
                                    src={product.imageCover}
                                    alt={product.title}
                                    width={40}
                                    height={40}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-gray-800 truncate">
                                    <Highlight text={product.title} query={debouncedQuery} />
                                  </p>
                                  <p className="text-xs text-gray-400 truncate">{product.category?.name}</p>
                                </div>
                                <div className="text-right shrink-0">
                                  <p className="text-sm font-bold text-green-600">
                                    ${(product.priceAfterDiscount ?? product.price).toFixed(2)}
                                  </p>
                                  {product.priceAfterDiscount && (
                                    <p className="text-xs text-gray-400 line-through">
                                      ${product.price.toFixed(2)}
                                    </p>
                                  )}
                                </div>
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}

                  {/* Categories */}
                  {results.categories.length > 0 && (
                    <div>
                      <div className="border-t border-gray-100 mb-2" />
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2 mb-1.5">
                        Categories
                      </p>
                      <ul>
                        {results.categories.map((cat, i) => {
                          const flatIdx = categoryStart + i;
                          return (
                            <li key={cat._id}>
                              <button
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => navigate({ type: "category", id: cat._id, label: cat.name })}
                                className={`w-full flex items-center gap-3 px-2 py-2 rounded-xl text-left transition-colors ${
                                  activeIndex === flatIdx ? "bg-green-50" : "hover:bg-gray-50"
                                }`}
                              >
                                <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center shrink-0">
                                  <FontAwesomeIcon icon={faLayerGroup} className="w-3.5 h-3.5 text-green-600" />
                                </div>
                                <p className="text-sm text-gray-700 flex-1">
                                  <Highlight text={cat.name} query={debouncedQuery} />
                                </p>
                                <FontAwesomeIcon icon={faChevronRight} className="w-3 h-3 text-gray-300" />
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}

                  {/* Brands */}
                  {results.brands.length > 0 && (
                    <div>
                      <div className="border-t border-gray-100 mb-2" />
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2 mb-1.5">
                        Brands
                      </p>
                      <ul>
                        {results.brands.map((brand, i) => {
                          const flatIdx = brandStart + i;
                          return (
                            <li key={brand._id}>
                              <button
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => navigate({ type: "brand", id: brand._id, label: brand.name })}
                                className={`w-full flex items-center gap-3 px-2 py-2 rounded-xl text-left transition-colors ${
                                  activeIndex === flatIdx ? "bg-green-50" : "hover:bg-gray-50"
                                }`}
                              >
                                <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center shrink-0 border border-orange-100 overflow-hidden">
                                  {brand.image ? (
                                    <Image src={brand.image} alt={brand.name} width={32} height={32} className="w-full h-full object-contain p-0.5" />
                                  ) : (
                                    <FontAwesomeIcon icon={faTag} className="w-3.5 h-3.5 text-orange-500" />
                                  )}
                                </div>
                                <p className="text-sm text-gray-700 flex-1">
                                  <Highlight text={brand.name} query={debouncedQuery} />
                                </p>
                                <FontAwesomeIcon icon={faChevronRight} className="w-3 h-3 text-gray-300" />
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}

                  {/* View all footer */}
                  <div className="border-t border-gray-100 pt-2">
                    <button
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => navigate({ type: "viewAll", label: debouncedQuery })}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                        activeIndex === viewAllIdx
                          ? "bg-green-600 text-white"
                          : "text-green-600 hover:bg-green-50"
                      }`}
                    >
                      <span>See all results for &ldquo;{debouncedQuery}&rdquo;</span>
                      <FontAwesomeIcon icon={faArrowRight} className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
