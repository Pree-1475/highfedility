import { MessageCircle } from "lucide-react";
import { DF } from "../../../lib/constants";
import { WorkshopData } from "../../../types";
import { useBusinessSettings } from "../../../contexts/BusinessSettingsContext";

interface FinalCTAProps {
  data?: WorkshopData;
}

export default function FinalCTA({ data }: FinalCTAProps) {
  const settings = useBusinessSettings();

  const titleText = data?.cta_title || "Does Your Bat\nNeed Attention?";
  const renderedTitle = titleText.split("\n").map((line, idx) => (
    <span key={idx}>{line}<br /></span>
  ));

  const description = data?.cta_description || "Drop by our store in Johor Bahru or message us a photo of your bat for a quick consultation.";
  const link = data?.cta_whatsapp_link || settings?.whatsapp_url || "https://wa.me/60123456789";

  return (
    <section className="bg-[#f5f3ec] py-24 px-10 text-center">
      <div className="max-w-[600px] mx-auto">
        <h2 style={DF} className="text-[48px] font-black leading-[0.88] tracking-tight text-[#1c2117] uppercase mb-6">
          {renderedTitle}
        </h2>
        <p className="text-[15px] leading-relaxed text-[#6b7462] mb-10">
          {description}
        </p>
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2.5 bg-[#1a3b28] text-white text-[11px] font-bold tracking-[0.13em] uppercase px-8 py-4 hover:bg-[#2d5c3f] transition-colors duration-200"
        >
          <MessageCircle size={14} /> WhatsApp Us Now
        </a>
      </div>
    </section>
  );
}

