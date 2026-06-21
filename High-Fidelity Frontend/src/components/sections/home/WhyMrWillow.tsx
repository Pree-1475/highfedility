import { DF, PH } from "../../../lib/constants";
import { SectionLabel } from "../../ui/SectionLabel";
import { HomePageData } from "../../../types";

import imgFreeBatKnocking from "../../../assets/images/why mr willow - free bat knobbing.jpg";
import imgWorkshop from "../../../assets/images/why mr willow - workshop.jpg";
import imgTrustedBrands from "../../../assets/images/WHY MR WILLOW - TRUSTED BRANDS.jpg";

interface WhyMrWillowProps {
  data?: HomePageData;
}

const DEFAULT_CARDS = [
  {
    n: "01",
    label: "COMPLIMENTARY SERVICE",
    title: "FREE BAT KNOCKING",
    body: "Every bat purchased from MR WILLOW includes complimentary bat knocking using the only bat knocking machine in JB, helping prepare it for match play while improving durability and performance.",
    image: imgFreeBatKnocking,
  },
  {
    n: "02",
    label: "IN-HOUSE EXPERTISE",
    title: "OWN WORKSHOP",
    body: "Repairs, maintenance and bat care handled in-house by people who understand cricket equipment.",
    image: imgWorkshop,
  },
  {
    n: "03",
    label: "PREMIUM SELECTION",
    title: "TRUSTED BRANDS",
    body: "Equipment from the brands players already know and trust.",
    image: imgTrustedBrands,
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
    <section className="bg-card pt-20 pb-16 lg:pb-24 px-6 lg:px-10 relative w-full">
      {/* Header */}
      <div className="max-w-[1400px] mx-auto mb-16 text-center lg:text-left">
        <SectionLabel n="04" label="Why MR.WILLOW" />
        <h2
          style={DF}
          className="text-[44px] md:text-[56px] font-black leading-[0.9] tracking-tight text-foreground uppercase mt-2"
        >
          Why Players Choose <span className="text-foreground">MR.WILLOW</span>
        </h2>
        <p className="mt-4 text-[15px] text-muted-foreground max-w-xl mx-auto lg:mx-0">
          We're Johor Bahru's cricket hub — where craftsmanship meets the game.
        </p>
      </div>

      {/* Sticky Stacking Cards Container */}
      <div className="max-w-[1400px] mx-auto relative flex flex-col pb-[5vh] lg:pb-[10vh]">
        {cards.map(({ n, label, title, body, video, image }, index) => {
          return (
            <div
              key={n}
              className={`why-card sticky w-full bg-background rounded-2xl border border-[rgba(28,33,23,0.06)] px-6 pb-6 pt-6 md:px-8 md:pb-8 lg:px-12 lg:pb-12 lg:pt-8 shadow-[0_-10px_30px_rgba(0,0,0,0.015),0_15px_30px_rgba(28,33,23,0.03)] flex items-center`}
              style={{
                zIndex: index + 10,
                top: `calc(100px + ${index * 72}px)`,
                marginBottom: `calc(40px + ${(cards.length - 1 - index) * 72}px)`,
                color: "#11311e",
                transformOrigin: "top center",
              }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-[45fr_55fr] gap-8 lg:gap-12 items-center w-full">
                {/* Left Column - Copy */}
                <div className="flex flex-col justify-start h-[260px] md:h-[220px] lg:h-auto lg:h-full lg:justify-center">
                  <div className="flex items-center justify-between mb-4 lg:mb-8">
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-foreground bg-foreground/5 px-3 py-1.5 rounded-full w-max">
                      {label}
                    </span>
                    <span style={DF} className="text-[36px] font-black text-foreground leading-none pt-1">
                      {n}
                    </span>
                  </div>
                  
                  <h3
                    style={DF}
                    className="text-[32px] md:text-[44px] font-black text-foreground uppercase tracking-tight leading-none mb-4"
                  >
                    {title}
                  </h3>
                  
                  <p className="text-[14px] md:text-[15px] leading-relaxed text-muted-foreground">
                    {body}
                  </p>
                </div>

                {/* Right Column - Media */}
                <div className={`relative w-full aspect-video rounded-xl overflow-hidden bg-secondary border border-[rgba(28,33,23,0.04)] shadow-inner ${video && image ? 'grid grid-cols-2' : ''}`}>
                  {video && (
                    <video
                      src={video}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  )}
                  {image && (
                    <img
                      src={image}
                      alt={title}
                      className={`w-full h-full object-cover transition-transform duration-700 hover:scale-105 ${video ? 'border-l border-[rgba(28,33,23,0.04)]' : ''}`}
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
