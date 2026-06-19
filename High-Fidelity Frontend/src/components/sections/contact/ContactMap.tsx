import { ArrowRight } from "lucide-react";
import { DF } from "../../../lib/constants";
import { useBusinessSettings } from "../../../contexts/BusinessSettingsContext";

export default function ContactMap() {
  const settings = useBusinessSettings();
  const mapsLink = settings?.google_maps_link || "https://maps.google.com";

  return (
    <div className="h-full min-h-[500px]">
      <div
        className="relative w-full h-full bg-[#ddd9cf] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(rgba(28,33,23,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(28,33,23,0.06) 1px,transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      >
        <div className="absolute w-4 h-4 bg-[#11311e] rounded-full shadow-[0_0_0_8px_rgba(28,33,23,0.2)]" />
        <div className="relative text-center mt-14 bg-white/90 backdrop-blur px-6 py-4 shadow-xl">
          <p
            style={DF}
            className="text-[20px] font-bold text-[#11311e] uppercase tracking-wide"
          >
            MR.WILLOW Cricket Store
          </p>
          <p className="text-[13px] text-[#6b7462] mt-0.5">Johor Bahru, Malaysia</p>
          <a
            href={mapsLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 mt-3 text-[10px] font-bold tracking-[0.16em] uppercase text-[#11311e] border-b border-[#11311e] pb-px hover:gap-2 transition-all"
          >
            Get Directions <ArrowRight size={11} />
          </a>
        </div>
      </div>
    </div>
  );
}
