import { Filter, X } from "lucide-react";

interface ProductFiltersProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
  onCategoryChangeMobile: (cat: string) => void;
  types: string[];
  activeType: string;
  onTypeChange: (type: string) => void;
  filterOpen: boolean;
  onFilterOpenChange: (open: boolean) => void;
  resultsCount: number;
  sortByPrice: string;
  onSortChange: (sort: "none" | "asc" | "desc") => void;
}

export default function ProductFilters({
  categories,
  activeCategory,
  onCategoryChange,
  onCategoryChangeMobile,
  types,
  activeType,
  onTypeChange,
  filterOpen,
  onFilterOpenChange,
  resultsCount,
  sortByPrice,
  onSortChange,
}: ProductFiltersProps) {
  return (
    <>
      {/* Desktop Filter Sidebar */}
      <aside className="hidden lg:block sticky top-32">
        <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground mb-5">Equipment</h3>
        <ul className="flex flex-col gap-3 mb-10">
          {categories.map((cat) => (
            <li key={cat}>
              <button
                onClick={() => onCategoryChange(cat)}
                className={`text-[14px] font-semibold tracking-wide transition-colors ${
                  activeCategory === cat ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>

        {types.length > 1 && (
          <>
            <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground mb-5 border-t border-[rgba(28,33,23,0.1)] pt-8">
              Type
            </h3>
            <ul className="flex flex-col gap-3">
              {types.map((type) => (
                <li key={type}>
                  <button
                    onClick={() => onTypeChange(type)}
                    className={`text-[13px] tracking-wide transition-colors ${
                      activeType === type ? "text-foreground font-bold" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {type}
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}

        <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground mb-5 border-t border-[rgba(28,33,23,0.1)] pt-8">
          Sort By
        </h3>
        <select
          value={sortByPrice}
          onChange={(e) => onSortChange(e.target.value as any)}
          className="w-full bg-transparent border border-[rgba(28,33,23,0.15)] text-[13px] font-medium text-foreground px-3 py-2.5 rounded-sm focus:outline-none focus:border-[#22c55e] appearance-none cursor-pointer"
        >
          <option value="none">Featured</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </aside>

      {/* Mobile Filter Toggle */}
      <div className="lg:hidden flex items-center justify-between mb-6 border-b border-[rgba(28,33,23,0.1)] pb-4">
        <button onClick={() => onFilterOpenChange(true)} className="flex items-center gap-2 text-[11px] font-bold tracking-[0.1em] uppercase text-foreground">
          <Filter size={16} /> Filters
        </button>
        <span className="text-[11px] font-semibold text-muted-foreground">{resultsCount} Results</span>
      </div>

      {/* Mobile Filter Drawer */}
      {filterOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/40" onClick={() => onFilterOpenChange(false)} />
          <div className="relative bg-card w-[85%] max-w-[320px] h-full shadow-xl flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-[rgba(28,33,23,0.1)]">
              <span className="text-[11px] font-bold tracking-[0.16em] uppercase text-foreground">Filters</span>
              <button onClick={() => onFilterOpenChange(false)}><X size={20} className="text-foreground" /></button>
            </div>
            <div className="p-6 overflow-y-auto flex-1 bg-[#fcfaf5]">
              <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground mb-5">Equipment</h3>
              <ul className="flex flex-col gap-4 mb-10">
                {categories.map((cat) => (
                  <li key={cat}>
                    <button
                      onClick={() => onCategoryChangeMobile(cat)}
                      className={`text-[14px] font-semibold tracking-wide ${activeCategory === cat ? "text-foreground" : "text-muted-foreground"}`}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
              {types.length > 1 && (
                <>
                  <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground mb-5 border-t border-[rgba(28,33,23,0.1)] pt-8">Type</h3>
                  <ul className="flex flex-col gap-4">
                    {types.map((type) => (
                      <li key={type}>
                        <button
                          onClick={() => onTypeChange(type)}
                          className={`text-[14px] font-semibold tracking-wide ${activeType === type ? "text-foreground" : "text-muted-foreground"}`}
                        >
                          {type}
                        </button>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground mb-5 border-t border-[rgba(28,33,23,0.1)] pt-8">Sort By</h3>
              <select
                value={sortByPrice}
                onChange={(e) => onSortChange(e.target.value as any)}
                className="w-full bg-transparent border border-[rgba(28,33,23,0.15)] text-[14px] font-medium text-foreground px-3 py-3 rounded-sm focus:outline-none focus:border-[#22c55e] appearance-none cursor-pointer mb-6"
              >
                <option value="none">Featured</option>
                <option value="asc">Price: Low to High</option>
                <option value="desc">Price: High to Low</option>
              </select>
            </div>
            <div className="p-6 border-t border-[rgba(28,33,23,0.1)] bg-card">
              <button
                onClick={() => onFilterOpenChange(false)}
                className="w-full bg-foreground text-background text-[11px] font-bold tracking-[0.16em] uppercase py-3.5 hover:bg-foreground/90 transition-all text-center block"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
