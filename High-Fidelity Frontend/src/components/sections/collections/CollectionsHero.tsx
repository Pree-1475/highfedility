import { DF } from "../../../lib/constants";
import { SectionLabel } from "../../ui/SectionLabel";

export default function CollectionsHero() {
  return (
    <section className="bg-[#11311e] text-white pt-20 pb-16 px-10 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: "repeating-linear-gradient(-45deg,transparent,transparent 40px,rgba(255,255,255,0.018) 40px,rgba(255,255,255,0.018) 41px)" }} />
      <div className="w-full max-w-[1920px] mx-auto relative z-10">
        <SectionLabel n="01" label="Shop Collections" />
        <h1 style={DF} className="text-[64px] md:text-[80px] font-black leading-[0.88] tracking-tight uppercase mb-6">
          Premium <span className="text-[#a7e5b9]">Equipment.</span>
        </h1>
        <p className="text-[15px] leading-relaxed text-white/60 max-w-[400px]">
          Curated selection of bats, pads, gloves and more from the world's leading cricket brands. Hand-picked for quality and performance.
        </p>
      </div>
    </section>
  );
}
