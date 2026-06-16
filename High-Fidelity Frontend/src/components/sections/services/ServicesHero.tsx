import { MessageCircle } from "lucide-react";
import { DF, PH } from "../../../lib/constants";
import { SectionLabel } from "../../ui/SectionLabel";
import { WorkshopData } from "../../../types";
import { useBusinessSettings } from "../../../contexts/BusinessSettingsContext";

interface ServicesHeroProps {
  data?: WorkshopData;
}

export default function ServicesHero({ data }: ServicesHeroProps) {
  const settings = useBusinessSettings();

  const titleText = data?.hero_title || "Expert Care.\nPeak Performance.";
  const renderedTitle = titleText.split("\n").map((line, idx) => {
    const parts = line.split(/(Care\.|Performance\.)/g);
    return (
      <span key={idx}>
        {parts.map((part, pIdx) => {
          if (part === "Care.") {
            return <span key={pIdx} className="text-[#7ec89a]">Care.</span>;
          }
          if (part === "Performance.") {
            return <span key={pIdx} className="text-white">Performance.</span>;
          }
          return part;
        })}
        {idx < titleText.split("\n").length - 1 && <br />}
      </span>
    );
  });

  const description = data?.hero_description || "Professional bat knocking, repairs, and full restoration services by experienced craftsmen to extend the lifespan of your gear.";

  const ctaText = data?.hero_cta_text || "Book a Service";
  const ctaLink = data?.hero_cta_link || settings?.whatsapp_url || "https://wa.me/60123456789";
  const imageSrc = data?.hero_image || PH.act1;

  return (
    <section className="bg-[#1a3b28] text-white pt-20 pb-16 px-10 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: "repeating-linear-gradient(-45deg,transparent,transparent 40px,rgba(255,255,255,0.018) 40px,rgba(255,255,255,0.018) 41px)" }} />
      <div className="max-w-[1440px] mx-auto relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <SectionLabel n="01" label="Workshop & Services" />
          <h1 style={DF} className="text-[64px] md:text-[80px] font-black leading-[0.88] tracking-tight uppercase mb-6">
            {renderedTitle}
          </h1>
          <p className="text-[15px] leading-relaxed text-white/60 max-w-[400px] mb-8">
            {description}
          </p>
          <a
            href={ctaLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2.5 bg-white text-[#1a3b28] text-[11px] font-bold tracking-[0.13em] uppercase px-7 py-4 hover:bg-[#f5f3ec] transition-colors duration-200"
          >
            <MessageCircle size={14} /> {ctaText}
          </a>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden bg-[#122a1c]">
          <img src={imageSrc} alt="Workshop" className="w-full h-full object-cover" />
        </div>
      </div>
    </section>
  );
}

