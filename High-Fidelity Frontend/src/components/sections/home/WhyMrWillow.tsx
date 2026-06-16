import { DF, PH } from "../../../lib/constants";
import { SectionLabel } from "../../ui/SectionLabel";
import { HomePageData } from "../../../types";

interface WhyMrWillowProps {
  data?: HomePageData;
}

const DEFAULT_CARDS = [
  {
    n: "01",
    label: "COMPLIMENTARY SERVICE",
    title: "FREE BAT KNOCKING",
    body: "Every bat purchased from MR WILLOW includes complimentary bat knocking, helping prepare it for match play while improving durability and performance.",
    video: "https://assets.mixkit.co/videos/preview/mixkit-cricket-player-batting-in-nets-practice-42211-large.mp4",
  },
  {
    n: "02",
    label: "IN-HOUSE EXPERTISE",
    title: "OWN WORKSHOP",
    body: "Repairs, maintenance and bat care handled in-house by people who understand cricket equipment.",
    image: PH.act1,
  },
  {
    n: "03",
    label: "PREMIUM SELECTION",
    title: "TRUSTED BRANDS",
    body: "Equipment from the brands players already know and trust.",
    image: PH.store,
  },
  {
    n: "04",
    label: "PERSONALIZED SERVICE",
    title: "EXPERT ADVICE",
    body: "Get recommendations based on age, skill level, playing style and budget.",
    image: PH.storeB,
  },
];

export default function WhyMrWillow(_props: WhyMrWillowProps) {
  const cards = DEFAULT_CARDS;


  return (
    <section className="bg-[#f5f3ec] pt-20 pb-16 lg:pb-20 px-6 lg:px-10 relative w-full">
      {/* Header */}
      <div className="max-w-[1400px] mx-auto mb-16 text-center lg:text-left">
        <SectionLabel n="04" label="Why MR.WILLOW" />
        <h2
          style={DF}
          className="text-[44px] md:text-[56px] font-black leading-[0.9] tracking-tight text-[#1c2117] uppercase mt-2"
        >
          Why Players Choose <span className="text-[#1a3b28]">MR.WILLOW</span>
        </h2>
        <p className="mt-4 text-[15px] text-[#6b7462] max-w-xl mx-auto lg:mx-0">
          We're Johor Bahru's cricket hub — where craftsmanship meets the game.
        </p>
      </div>

      {/* Sticky Stacking Cards Container */}
      <div className="max-w-[1400px] mx-auto relative flex flex-col gap-0">
        {cards.map(({ n, label, title, body, video, image }, index) => {
          return (
            <div
              key={n}
              className={`why-card sticky w-full bg-[#fdfcf7] rounded-2xl border border-[rgba(28,33,23,0.06)] p-6 md:p-8 lg:p-12 shadow-[0_-10px_30px_rgba(0,0,0,0.015),0_15px_30px_rgba(28,33,23,0.03)] flex items-center ${
                index === cards.length - 1 ? "mb-0" : "mb-12 lg:mb-16"
              }`}
              style={{
                zIndex: index + 10,
                color: "#1c2117",
                transform: `scale(${0.97 + index * 0.01})`,
                transformOrigin: "top center",
                ['--card-idx' as any]: index,
              }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-[45fr_55fr] gap-8 lg:gap-12 items-center w-full">
                {/* Left Column - Copy */}
                <div className="flex flex-col h-full justify-center">
                  <div className="flex items-center justify-between mb-4 lg:mb-8">
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#1a3b28] bg-[#1a3b28]/5 px-3 py-1.5 rounded-full w-max">
                      {label}
                    </span>
                    <span style={DF} className="text-[36px] font-black text-[#1a3b28] leading-none pt-1">
                      {n}
                    </span>
                  </div>
                  
                  <h3
                    style={DF}
                    className="text-[32px] md:text-[44px] font-black text-[#1c2117] uppercase tracking-tight leading-none mb-4"
                  >
                    {title}
                  </h3>
                  
                  <p className="text-[14px] md:text-[15px] leading-relaxed text-[#6b7462]">
                    {body}
                  </p>
                </div>

                {/* Right Column - Media */}
                <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-[#eae8e0] border border-[rgba(28,33,23,0.04)] shadow-inner">
                  {video ? (
                    <video
                      src={video}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={image}
                      alt={title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
