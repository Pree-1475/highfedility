import { DF } from "../../../lib/constants";

export default function BrandMarquee() {
  const displayBrands = [
    { name: "SS TON", logo: null },
    { name: "KOOKABURRA", logo: null },
    { name: "GRAY-NICOLLS", logo: null },
    { name: "MASURI", logo: null },
    { name: "NEW BALANCE", logo: null },
    { name: "MR WILLOW", logo: null },
    { name: "GM", logo: null }
  ];

  return (
    <section className="w-full bg-[#11311e] overflow-hidden py-4 border-t border-b border-[rgba(255,255,255,0.05)] flex items-center">
      <div className="flex w-max animate-scroll-marquee items-center">
        {[...displayBrands, ...displayBrands, ...displayBrands, ...displayBrands].map((brand, i) => (
          <div key={i} className="flex items-center">
            {brand.logo ? (
              <div className="px-12 flex items-center justify-center">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="h-[32px] w-auto object-contain brightness-0 invert opacity-50 hover:opacity-100 hover:scale-105 transition-all duration-300"
                />
              </div>
            ) : (
              <span
                style={DF}
                className="text-[24px] font-bold text-[#c8c4b8]/50 tracking-[0.2em] whitespace-nowrap uppercase px-12 hover:text-white transition-colors duration-300"
              >
                {brand.name}
              </span>
            )}
            <span className="text-[#c8c4b8]/20 text-[10px]">✦</span>
          </div>
        ))}
      </div>
    </section>
  );
}

