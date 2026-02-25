import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";
import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
import FilterSidebar from "@/components/FilterSidebar";
import { products, type ProductColor } from "@/data/products";

const Shop = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get("category");

  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialCategory ? [initialCategory] : [],
  );
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<ProductColor[]>([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (
        selectedCategories.length > 0 &&
        !selectedCategories.includes(p.category)
      )
        return false;
      if (
        selectedSizes.length > 0 &&
        !p.sizes.some((s) => selectedSizes.includes(s))
      )
        return false;
      if (
        selectedColors.length > 0 &&
        !p.colors.some((c) => selectedColors.includes(c))
      )
        return false;
      return true;
    });
  }, [selectedCategories, selectedSizes, selectedColors]);

  const toggleCategory = (cat: string) =>
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
    );
  const toggleSize = (size: string) =>
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size],
    );
  const toggleColor = (color: ProductColor) =>
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color],
    );
  const clearAll = () => {
    setSelectedCategories([]);
    setSelectedSizes([]);
    setSelectedColors([]);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 sm:mb-10"
        >
          <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-2">
            Collection
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-0">
            <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold">
              Shop All
            </h1>
            <button
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
              className="md:hidden flex items-center gap-2 text-xs sm:text-sm text-foreground/70 w-fit"
            >
              <SlidersHorizontal size={16} strokeWidth={1.5} />
              Filters
            </button>
          </div>
        </motion.div>

        <div className="flex gap-6 sm:gap-8 md:gap-10">
          {/* Desktop Sidebar */}
          <div className="hidden md:block w-48 lg:w-56 flex-shrink-0">
            <FilterSidebar
              selectedCategories={selectedCategories}
              selectedSizes={selectedSizes}
              selectedColors={selectedColors}
              onCategoryChange={toggleCategory}
              onSizeChange={toggleSize}
              onColorChange={toggleColor}
              onClearAll={clearAll}
            />
          </div>

          {/* Mobile Filters */}
          {mobileFiltersOpen && (
            <div className="fixed inset-0 z-40 bg-background p-4 sm:p-6 overflow-y-auto md:hidden flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-heading text-lg font-semibold">Filters</h2>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="p-1"
                >
                  <X size={20} strokeWidth={1.5} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto">
                <FilterSidebar
                  selectedCategories={selectedCategories}
                  selectedSizes={selectedSizes}
                  selectedColors={selectedColors}
                  onCategoryChange={toggleCategory}
                  onSizeChange={toggleSize}
                  onColorChange={toggleColor}
                  onClearAll={clearAll}
                />
              </div>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="mt-6 w-full py-2.5 sm:py-3 bg-primary text-primary-foreground font-body text-xs sm:text-sm font-semibold tracking-wider uppercase sticky bottom-0"
              >
                Show {filtered.length} Results
              </button>
            </div>
          )}

          {/* Products Grid */}
          <div className="flex-1">
            <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6">
              {filtered.length} products
            </p>
            {filtered.length === 0 ? (
              <div className="text-center py-16 sm:py-20">
                <p className="text-xs sm:text-base text-muted-foreground">
                  No products match your filters.
                </p>
                <button
                  onClick={clearAll}
                  className="mt-2 text-xs sm:text-sm text-primary hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                {filtered.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
