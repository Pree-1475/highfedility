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
}: ProductFiltersProps) {
  return (
    <>
      {/* Desktop Filter Sidebar */}
      <aside className="hidden lg:block sticky top-32">
        <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#6b7462] mb-5">Equipment</h3>
        <ul className="flex flex-col gap-3 mb-10">
          {categories.map((cat) => (
            <li key={cat}>
              <button
                onClick={() => onCategoryChange(cat)}
                className={`text-[14px] font-semibold tracking-wide transition-colors ${
                  activeCategory === cat ? "text-[#1a3b28]" : "text-[#6b7462] hover:text-[#1c2117]"
                }`}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>

        {types.length > 1 && (
          <>
            <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#6b7462] mb-5 border-t border-[rgba(28,33,23,0.1)] pt-8">
              Type
            </h3>
            <ul className="flex flex-col gap-3">
              {types.map((type) => (
                <li key={type}>
                  <button
                    onClick={() => onTypeChange(type)}
                    className={`text-[13px] tracking-wide transition-colors ${
                      activeType === type ? "text-[#1a3b28] font-bold" : "text-[#6b7462] hover:text-[#1c2117]"
                    }`}
                  >
                    {type}
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </aside>

      {/* Mobile Filter Toggle */}
      <div className="lg:hidden flex items-center justify-between mb-6 border-b border-[rgba(28,33,23,0.1)] pb-4">
        <button onClick={() => onFilterOpenChange(true)} className="flex items-center gap-2 text-[11px] font-bold tracking-[0.1em] uppercase text-[#1c2117]">
          <Filter size={16} /> Filters
        </button>
        <span className="text-[11px] font-semibold text-[#6b7462]">{resultsCount} Results</span>
      </div>

      {/* Mobile Filter Drawer */}
      {filterOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/40" onClick={() => onFilterOpenChange(false)} />
          <div className="relative bg-white w-[85%] max-w-[320px] h-full shadow-xl flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-[rgba(28,33,23,0.1)]">
              <span className="text-[11px] font-bold tracking-[0.16em] uppercase text-[#1c2117]">Filters</span>
              <button onClick={() => onFilterOpenChange(false)}><X size={20} className="text-[#1c2117]" /></button>
            </div>
            <div className="p-6 overflow-y-auto flex-1 bg-[#fcfaf5]">
              <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#6b7462] mb-5">Equipment</h3>
              <ul className="flex flex-col gap-4 mb-10">
                {categories.map((cat) => (
                  <li key={cat}>
                    <button
                      onClick={() => onCategoryChangeMobile(cat)}
                      className={`text-[14px] font-semibold tracking-wide ${activeCategory === cat ? "text-[#1a3b28]" : "text-[#6b7462]"}`}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
              {types.length > 1 && (
                <>
                  <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#6b7462] mb-5 border-t border-[rgba(28,33,23,0.1)] pt-8">Type</h3>
                  <ul className="flex flex-col gap-4">
                    {types.map((type) => (
                      <li key={type}>
                        <button
                          onClick={() => onTypeChange(type)}
                          className={`text-[14px] font-semibold tracking-wide ${activeType === type ? "text-[#1a3b28]" : "text-[#6b7462]"}`}
                        >
                          {type}
                        </button>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
            <div className="p-6 border-t border-[rgba(28,33,23,0.1)] bg-white">
              <button
                onClick={() => onFilterOpenChange(false)}
                className="w-full bg-[#1a3b28] text-white text-[11px] font-bold tracking-[0.16em] uppercase py-3.5 hover:bg-[#2d5c3f] transition-all text-center block"
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
