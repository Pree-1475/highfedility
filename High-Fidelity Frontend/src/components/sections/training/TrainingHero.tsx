import { ArrowRight } from "lucide-react";
import { DF, PH } from "../../../lib/constants";
import { SectionLabel } from "../../ui/SectionLabel";

export default function TrainingHero() {
  return (
    <section className="bg-[#11311e] text-white pt-20 pb-16 px-10 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: "repeating-linear-gradient(-45deg,transparent,transparent 40px,rgba(255,255,255,0.018) 40px,rgba(255,255,255,0.018) 41px)" }} />
      <div className="max-w-[1440px] mx-auto relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <SectionLabel n="01" label="Player Development" />
          <h1 style={DF} className="text-[64px] md:text-[80px] font-black leading-[0.88] tracking-tight uppercase mb-6">
            Elevate <span className="text-[#a7e5b9]">Your</span>
            <br />Game.
          </h1>
          <p className="text-[15px] leading-relaxed text-white/60 max-w-[400px] mb-8">
            Structured coaching programmes for batsmen and bowlers of all ages. Develop your technique, match awareness, and physical conditioning.
          </p>
          <a
            href="#enroll"
            className="inline-flex items-center gap-2.5 bg-white text-[#11311e] text-[11px] font-bold tracking-[0.13em] uppercase px-7 py-4 hover:bg-[#ffffff] transition-colors duration-200"
          >
            Enroll Now <ArrowRight size={14} />
          </a>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden bg-[#0d2617]">
          <img src={PH.field} alt="Cricket Training Session" className="w-full h-full object-cover" />
        </div>
      </div>
    </section>
  );
}
