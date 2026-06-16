import { DF, PH } from "../../../lib/constants";
import { Product } from "../../../types";

interface ProductCardProps {
  product: Product;
  inInquiry: boolean;
  onInquiryToggle: () => void;
  productSlug: string;
}

export default function ProductCard({
  product,
  inInquiry,
  onInquiryToggle,
  productSlug,
}: ProductCardProps) {
  return (
    <div 
      id={`product-${productSlug}`}
      className="group flex flex-col h-full bg-white border border-transparent hover:border-[rgba(28,33,23,0.1)] transition-all duration-500"
    >
      <div className="relative overflow-hidden bg-[#eae8e0] aspect-[3/4]">
        <img 
          src={product.photo || PH.hero} 
          alt={product.name} 
          className={`w-full h-full object-cover ${product.pos} group-hover:scale-105 transition-transform duration-500`} 
        />
      </div>
      <div className="pt-4 pb-5 px-4 flex flex-col flex-1">
        <p className="text-[9px] font-bold tracking-[0.22em] uppercase text-[#6b7462] mb-1">{product.brand}</p>
        <h3 style={DF} className="text-[18px] md:text-[20px] font-bold text-[#1c2117] leading-tight tracking-wide uppercase mb-1">
          {product.name}
        </h3>
        <p className="text-[11px] md:text-[12px] text-[#6b7462] mb-1.5">{product.sub}</p>
        <p style={DF} className="text-[15px] font-bold text-[#1a3b28] mb-4 mt-auto">{product.price}</p>
        
        <button
          onClick={onInquiryToggle}
          className={`w-full text-[10px] font-bold tracking-[0.16em] uppercase py-3.5 border transition-colors cursor-pointer ${
            inInquiry 
              ? "bg-[#1c2117] text-white border-[#1c2117]" 
              : "border-[#1c2117] text-[#1c2117] hover:bg-[#1a3b28] hover:text-white hover:border-[#1a3b28]"
          }`}
        >
          {inInquiry ? "Added to Inquiry" : "Add to Enquiry"}
        </button>
      </div>
    </div>
  );
}
