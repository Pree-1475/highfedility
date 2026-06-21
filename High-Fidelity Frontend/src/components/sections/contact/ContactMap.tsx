import { ArrowRight } from "lucide-react";
import { DF } from "../../../lib/constants";
import { useBusinessSettings } from "../../../contexts/BusinessSettingsContext";

export default function ContactMap() {
  const settings = useBusinessSettings();
  const mapsLink = settings?.google_maps_link || "https://maps.google.com";

  return (
    <div className="h-full min-h-[500px]">
      <div
        className="relative w-full h-full bg-secondary flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(rgba(28,33,23,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(28,33,23,0.06) 1px,transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      >
        <div className="absolute w-4 h-4 bg-foreground rounded-full shadow-[0_0_0_8px_rgba(28,33,23,0.2)]" />
        <div className="relative text-center mt-14 bg-card/90 backdrop-blur px-6 py-4 shadow-xl">
          <p
            style={DF}
            className="text-[20px] font-bold text-foreground uppercase tracking-wide"
          >
            MR.WILLOW Cricket Store
          </p>
          <p className="text-[13px] text-muted-foreground mt-0.5">Johor Bahru, Malaysia</p>
          <a
            href={mapsLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 mt-3 text-[10px] font-bold tracking-[0.16em] uppercase text-foreground border-b border-foreground pb-px hover:gap-2 transition-all"
          >
            Get Directions <ArrowRight size={11} />
          </a>
        </div>
      </div>
    </div>
  );
}
