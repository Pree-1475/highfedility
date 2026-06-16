import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { DF } from "../../../lib/constants";
import ThreeBatCanvas from "../../canvas/ThreeBatCanvas";
import { HomePageData } from "../../../types";
import { useBusinessSettings } from "../../../contexts/BusinessSettingsContext";

interface HeroProps {
  data?: HomePageData;
}

export default function Hero({ data }: HeroProps) {
  const settings = useBusinessSettings();
  const subtitle = data?.hero_subtitle || "Johor Bahru · Malaysia";
  
  const renderedTitle = data?.hero_title 
    ? data.hero_title.split("\n").map((line: string, idx: number) => {
        if (line.trim().toUpperCase() === "GETS") {
          return <span key={idx} className="text-[#7ec89a]">GETS<br /></span>;
        }
        return <span key={idx}>{line}<br /></span>;
      })
    : (
        <>
          WHERE
          <br />
          CRICKET
          <br />
          <span className="text-[#7ec89a]">GETS</span>
          <br />
          SERIOUS.
        </>
      );

  const description = data?.hero_description || "Premium equipment, expert bat knocking, and coaching for every level of the game — all under one roof.";
  
  const primaryText = "Visit Our Store";
  const primaryLink = "/contact";
  const secondaryText = "Contact Us";
  const secondaryLink = settings?.whatsapp_url || "https://wa.me/60123456789";

  const isPrimaryInternal = true;
  const isSecondaryInternal = false;

  const stats = [
    { val: "2018", label: "Est." },
    { val: "500+", label: "Bats Knocked" },
    { val: "#1", label: "Cricket Store in JB" },
  ];

  return (
    <section className="w-full min-h-[92vh] grid grid-cols-1 lg:grid-cols-[55fr_45fr]">
      {/* Left — content */}
      <div
        className="relative flex flex-col justify-center px-12 lg:px-20 pt-12 pb-20 lg:py-20 overflow-hidden"
        style={{
          backgroundColor: "#1a3b28",
          backgroundImage:
            "repeating-linear-gradient(-45deg,transparent,transparent 40px,rgba(255,255,255,0.018) 40px,rgba(255,255,255,0.018) 41px)",
        }}
      >
        <span className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#4a8b60] via-[#2d5c3f] to-transparent" />

        <p className="text-[10px] font-bold tracking-[0.32em] uppercase text-white/45 mb-8">
          {subtitle}
        </p>

        <h1
          style={DF}
          className="text-[90px] xl:text-[108px] font-black leading-[0.86] tracking-[-0.01em] text-white mb-8"
        >
          {renderedTitle}
        </h1>

        <p className="text-[15px] leading-relaxed text-white/60 max-w-[340px] mb-10 font-light">
          {description}
        </p>

        <div className="flex flex-wrap items-center gap-4">
          {isPrimaryInternal ? (
            <Link
              to={primaryLink}
              className="inline-flex items-center gap-2.5 bg-white text-[#1a3b28] text-[11px] font-bold tracking-[0.13em] uppercase px-7 py-4 hover:bg-[#f5f3ec] transition-colors duration-200"
            >
              {primaryText} <ArrowRight size={14} />
            </Link>
          ) : (
            <a
              href={primaryLink}
              className="inline-flex items-center gap-2.5 bg-white text-[#1a3b28] text-[11px] font-bold tracking-[0.13em] uppercase px-7 py-4 hover:bg-[#f5f3ec] transition-colors duration-200"
            >
              {primaryText} <ArrowRight size={14} />
            </a>
          )}
          {isSecondaryInternal ? (
            <Link
              to={secondaryLink}
              className="inline-flex items-center gap-2.5 border border-white/25 text-white text-[11px] font-bold tracking-[0.13em] uppercase px-7 py-4 hover:border-white/55 transition-colors duration-200"
            >
              {secondaryText}
            </Link>
          ) : (
            <a
              href={secondaryLink}
              className="inline-flex items-center gap-2.5 border border-white/25 text-white text-[11px] font-bold tracking-[0.13em] uppercase px-7 py-4 hover:border-white/55 transition-colors duration-200"
            >
              {secondaryText}
            </a>
          )}
        </div>

        {/* Stats */}
        <div className="mt-14 pt-8 border-t border-white/10 flex gap-10">
          {stats.map(({ val, label }) => (
            <div key={label} className="flex flex-col">
              <span style={DF} className="text-[30px] font-black text-white leading-none">
                {val}
              </span>
              <span className="text-[9px] tracking-[0.16em] uppercase text-white/40 mt-1.5 font-medium">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Right — 3D Bat */}
      <div className="hp-hero__bat-area relative overflow-hidden bg-[#122a1c] min-h-[50vh] lg:min-h-auto">
        <ThreeBatCanvas />
        
        {/* Annotated Tags */}
        <div className="absolute top-10 left-10 border border-dashed border-white/30 bg-black/20 backdrop-blur-sm px-4 py-2 text-white text-[10px] uppercase tracking-widest font-bold">
          Grain
        </div>
        <div className="absolute top-10 right-10 border border-dashed border-white/30 bg-black/20 backdrop-blur-sm px-4 py-2 text-white text-[10px] uppercase tracking-widest font-bold">
          Profile
        </div>
        <div className="absolute bottom-10 left-10 border border-dashed border-white/30 bg-black/20 backdrop-blur-sm px-4 py-2 text-white text-[10px] uppercase tracking-widest font-bold">
          Pickup
        </div>
        <div className="absolute bottom-10 right-10 border border-dashed border-white/30 bg-black/20 backdrop-blur-sm px-4 py-2 text-white text-[10px] uppercase tracking-widest font-bold">
          Prepared in-store
        </div>
      </div>
    </section>
  );
}

