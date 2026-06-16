import { ArrowRight } from "lucide-react";
import { DF, PH } from "../../../lib/constants";
import { SectionLabel } from "../../ui/SectionLabel";

export default function Community() {
  return (
    <section className="bg-white py-20 px-10 border-t border-[rgba(28,33,23,0.06)]">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <SectionLabel n="06" label="Community" />
            <h2
              style={DF}
              className="text-[52px] font-black leading-[0.88] tracking-tight text-[#1c2117] uppercase"
            >
              Life at
              <br />
              MR.WILLOW
            </h2>
          </div>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="hidden md:inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.13em] uppercase text-[#1a3b28] border-b border-[#1a3b28] pb-0.5 hover:gap-3 transition-all duration-200"
          >
            Follow on Instagram <ArrowRight size={13} />
          </a>
        </div>

        <div className="grid grid-cols-3 grid-rows-2 gap-3 h-[540px]">
          <div className="col-span-2 relative group overflow-hidden bg-[#eae8e0] cursor-pointer">
            <img
              src={PH.field}
              alt="Cricket players on the field"
              className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-[#1a3b28]/0 group-hover:bg-[#1a3b28]/28 transition-colors duration-300 flex items-center justify-center">
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-[10px] font-bold tracking-[0.2em] uppercase">
                View
              </span>
            </div>
          </div>

          {[
            { src: PH.act2, alt: "Training session" },
            { src: PH.storeB, alt: "MR.WILLOW store interior" },
            { src: PH.act1, alt: "Cricket action" },
            { src: PH.store, alt: "Browsing the collection" },
          ].map(({ src, alt }) => (
            <div key={alt} className="relative group overflow-hidden bg-[#eae8e0] cursor-pointer">
              <img
                src={src}
                alt={alt}
                className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-[#1a3b28]/0 group-hover:bg-[#1a3b28]/28 transition-colors duration-300 flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-[10px] font-bold tracking-[0.2em] uppercase">
                  View
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
