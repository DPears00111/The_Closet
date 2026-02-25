import { categories, colorOptions, colorHex, type ProductColor } from '@/data/products';

interface FilterSidebarProps {
  selectedCategories: string[];
  selectedSizes: string[];
  selectedColors: ProductColor[];
  onCategoryChange: (cat: string) => void;
  onSizeChange: (size: string) => void;
  onColorChange: (color: ProductColor) => void;
  onClearAll: () => void;
}

const sizeGroups = [
  { label: 'Clothing', sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'] },
  { label: 'Waist', sizes: ['28', '30', '32', '34', '36'] },
  { label: 'Universal', sizes: ['One Size'] },
];

const FilterSidebar = ({
  selectedCategories,
  selectedSizes,
  selectedColors,
  onCategoryChange,
  onSizeChange,
  onColorChange,
  onClearAll,
}: FilterSidebarProps) => {
  const hasFilters = selectedCategories.length > 0 || selectedSizes.length > 0 || selectedColors.length > 0;

  return (
    <aside className="w-full space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-lg font-semibold">Filters</h2>
        {hasFilters && (
          <button onClick={onClearAll} className="text-xs text-primary hover:underline font-medium">
            Clear all
          </button>
        )}
      </div>

      {/* Categories */}
      <div>
        <h3 className="font-body text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Category</h3>
        <div className="flex flex-col gap-2">
          {categories.map((cat) => (
            <label key={cat} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat)}
                onChange={() => onCategoryChange(cat)}
                className="h-3.5 w-3.5 rounded-sm border-border accent-primary"
              />
              <span className="text-sm text-foreground/80 group-hover:text-foreground transition-colors">{cat}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Sizes */}
      <div>
        <h3 className="font-body text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Size</h3>
        {sizeGroups.map((group) => (
          <div key={group.label} className="mb-3">
            <div className="flex flex-wrap gap-1.5">
              {group.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => onSizeChange(size)}
                  className={`px-2.5 py-1 text-xs border rounded-sm transition-all ${
                    selectedSizes.includes(size)
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border text-foreground/70 hover:border-foreground/40'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Colors */}
      <div>
        <h3 className="font-body text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Color</h3>
        <div className="flex gap-3">
          {colorOptions.map((color) => (
            <button
              key={color}
              onClick={() => onColorChange(color)}
              className={`h-7 w-7 rounded-full border-2 transition-all ${
                selectedColors.includes(color) ? 'border-primary scale-110' : 'border-transparent'
              }`}
              style={{ backgroundColor: colorHex[color] }}
              title={color}
            />
          ))}
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;
