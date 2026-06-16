import { DF } from "../../../lib/constants";

export default function AboutHero() {
  return (
    <section className="bg-[#1a3b28] text-white pt-20 pb-16 px-10 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: "repeating-linear-gradient(-45deg,transparent,transparent 40px,rgba(255,255,255,0.018) 40px,rgba(255,255,255,0.018) 41px)" }} />
      <div className="max-w-[1440px] mx-auto relative z-10 text-center">
        <h1 style={DF} className="text-[64px] md:text-[80px] font-black leading-[0.88] tracking-tight uppercase mb-6">
          The MR.WILLOW <br /><span className="text-[#7ec89a]">Story.</span>
        </h1>
        <p className="text-[15px] leading-relaxed text-white/60 max-w-[500px] mx-auto">
          Born from a passion for the game and a dedication to the craft, we are Johor Bahru's premier destination for serious cricketers.
        </p>
      </div>
    </section>
  );
}
