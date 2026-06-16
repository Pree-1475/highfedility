import { ArrowRight, MessageCircle } from "lucide-react";
import { Link } from "react-router";
import { DF, PH } from "../../../lib/constants";
import { SectionLabel } from "../../ui/SectionLabel";
import { HomePageData } from "../../../types";

interface CustomBatsProps {
  data?: HomePageData;
}

export default function CustomBats({ data }: CustomBatsProps) {
  const renderedTitle = data?.custom_bats_title
    ? data.custom_bats_title.split("\n").map((line: string, idx: number) => {
        if (line.trim().toUpperCase() === "GAME.") {
          return <span key={idx} className="text-[#7ec89a]">GAME.<br /></span>;
        }
        return <span key={idx}>{line}<br /></span>;
      })
    : (
        <>
          Crafted
          <br />
          To Your
          <br />
          <span className="text-[#7ec89a]">Game.</span>
        </>
      );

  const description = data?.custom_bats_description || 
    "Every MR.WILLOW custom bat begins with a conversation. Your preferred weight, balance, handle type, and edge thickness — handcrafted for the way you play.";

  const imageSrc = data?.custom_bats_image || PH.act1;

  const primaryText = data?.custom_bats_primary_cta_text || "Start Your Order";
  const primaryLink = data?.custom_bats_primary_cta_link || "/custom-bats";
  const secondaryText = data?.custom_bats_secondary_cta_text || "Ask Us";
  const secondaryLink = data?.custom_bats_secondary_cta_link || "https://wa.me/60123456789";

  const isPrimaryInternal = primaryLink.startsWith("/");
  const isSecondaryInternal = secondaryLink.startsWith("/");

  const tags = data?.custom_bats_tags
    ? data.custom_bats_tags.split(",").map((t: string) => t.trim())
    : [
        "English Willow",
        "Kashmir Willow",
        "Custom Weight",
        "Handle Preference",
        "Grip Selection",
      ];

  return (
    <section className="bg-[#1a3b28] grid lg:grid-cols-2 min-h-[640px]">
      <div className="relative overflow-hidden bg-[#122a1c] min-h-[400px] lg:min-h-auto">
        <img
          src={imageSrc}
          alt="Custom cricket bat crafting process"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#1a3b28]/55" />
      </div>

      <div className="relative flex flex-col justify-center px-12 lg:px-16 xl:px-20 py-20 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-[#2d5c3f]/25 rounded-full pointer-events-none" />

        <SectionLabel n="05" label="Custom Bats" />
        <h2
          style={DF}
          className="text-[64px] xl:text-[76px] font-black leading-[0.86] tracking-tight text-white uppercase mb-6"
        >
          {renderedTitle}
        </h2>
        <p className="text-[15px] leading-relaxed text-white/60 mb-8 max-w-[340px]">
          {description}
        </p>

        <div className="flex gap-4 flex-wrap">
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
              className="inline-flex items-center gap-2.5 border border-white/22 text-white text-[11px] font-bold tracking-[0.13em] uppercase px-7 py-4 hover:border-white/50 transition-colors duration-200"
            >
              <MessageCircle size={13} />
              {secondaryText}
            </Link>
          ) : (
            <a
              href={secondaryLink}
              className="inline-flex items-center gap-2.5 border border-white/22 text-white text-[11px] font-bold tracking-[0.13em] uppercase px-7 py-4 hover:border-white/50 transition-colors duration-200"
            >
              <MessageCircle size={13} />
              {secondaryText}
            </a>
          )}
        </div>

        <div className="mt-10 flex flex-wrap gap-2">
          {tags.map((tag: string) => (
            <span
              key={tag}
              className="text-[9px] font-semibold tracking-[0.16em] uppercase border border-white/18 text-white/55 px-3 py-1.5"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

