import { Product } from "../../../types";
import ProductCard from "./ProductCard";
import { CurrencySwitcher } from "../../ui/CurrencySwitcher";

interface ProductGridProps {
  filteredProducts: Product[];
  inquiryItems: { id: string | number }[];
  onAddItem: (product: Product) => void;
  onRemoveItem: (id: string | number) => void;
}

export default function ProductGrid({
  filteredProducts,
  inquiryItems,
  onAddItem,
  onRemoveItem,
}: ProductGridProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <span className="hidden lg:block text-[11px] font-semibold tracking-[0.1em] uppercase text-muted-foreground">
          {filteredProducts.length} Results
        </span>
        <div className="ml-auto">
          <CurrencySwitcher />
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-5">
        {filteredProducts.map((p) => {
          const inInquiry = inquiryItems.some((i) => i.id === p.id);
          const productSlug = `${p.brand}-${p.name}`
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");

          return (
            <ProductCard
              key={p.id}
              product={p}
              inInquiry={inInquiry}
              onInquiryToggle={() => (inInquiry ? onRemoveItem(p.id) : onAddItem(p))}
              productSlug={productSlug}
            />
          );
        })}
      </div>
      {filteredProducts.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-muted-foreground text-[15px]">No products found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
