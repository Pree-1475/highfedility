import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { DF, PH } from "../../../lib/constants";
import { SectionLabel } from "../../ui/SectionLabel";
import { HomePageData } from "../../../types";
import { useRef, useState } from "react";

import imgBatKnobbing from "../../../assets/images/everything y need - bat knobbing.jpeg";
import imgRepairs from "../../../assets/images/everything you need - repairs.jpeg";
import imgCustomBats from "../../../assets/images/everything you need custom bats.jpg";
import imgEquipment from "../../../assets/images/everything youneed - equipment.jpg";
import imgTrainAndPlay from "../../../assets/images/everything you need - train and play.jpg";

interface EverythingYouNeedProps {
  data?: HomePageData;
}

export default function EverythingYouNeed(_props: EverythingYouNeedProps) {
  const pillars = [
    {
      image: imgEquipment,
      title: "EQUIPMENT",
      desc: "Bats, gear and accessories from trusted brands.",
      link: "/collections",
    },
    {
      image: imgBatKnobbing,
      title: "BAT KNOCKING",
      desc: "Professional preparation for match-ready performance.",
      link: "/services",
    },
    {
      image: imgRepairs,
      title: "REPAIRS",
      desc: "Restore performance and extend equipment lifespan.",
      link: "/services",
    },
    {
      image: imgCustomBats,
      title: "CUSTOM BATS",
      desc: "Built and prepared for your game.",
      link: "/custom-bats",
    },
    {
      image: imgTrainAndPlay,
      title: "TRAIN & PLAY",
      desc: "Facilities, equipment and cricket essentials.",
      link: "/training",
    },
  ];

  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const scrollLeft = scrollRef.current.scrollLeft;
    const cardWidth = scrollRef.current.scrollWidth / pillars.length;
    const newIndex = Math.round(scrollLeft / cardWidth);
    setActiveIndex(Math.min(newIndex, pillars.length - 1));
  };

  return (
    <section className="bg-card py-12 md:py-16 lg:py-24 px-6 md:px-10 overflow-hidden relative">
      <div className="max-w-[1440px] mx-auto">
        <div className="mb-10">
          <SectionLabel n="01" label="Overview" />
          <h2
            style={DF}
            className="text-[44px] md:text-[52px] font-black leading-[0.88] tracking-tight text-foreground uppercase"
          >
            EVERYTHING YOU NEED
          </h2>
        </div>

        {/* Carousel / Grid Container */}
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex lg:grid lg:grid-cols-5 gap-4 overflow-x-auto snap-x snap-mandatory hide-scroll pb-4 -mx-6 md:-mx-10 lg:mx-0 lg:pb-0 lg:overflow-visible before:content-[''] before:w-2 md:before:w-6 lg:before:hidden before:shrink-0 after:content-[''] after:w-2 md:after:w-6 lg:after:hidden after:shrink-0"
        >
          {pillars.map(({ image, title, desc, link }) => (
            <Link
              key={title}
              to={link}
              className="flex flex-col group w-[60%] sm:w-[240px] lg:w-auto shrink-0 snap-center lg:snap-start transition-all duration-300"
            >
              <div className="aspect-square w-full overflow-hidden rounded-xl relative mb-5 bg-foreground/5">
                <img 
                  src={image} 
                  alt={title} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/25 pointer-events-none z-10" />
              </div>

              {/* Text Content - No borders, sitting on background */}
              <div className="flex flex-col flex-grow px-1">
                <h3
                  style={DF}
                  className="text-[18px] md:text-[22px] font-bold tracking-wide text-foreground mb-2 uppercase leading-tight"
                >
                  {title}
                </h3>
                <p className="text-[13px] leading-relaxed text-muted-foreground flex-grow mb-5">
                  {desc}
                </p>
                <div className="flex items-center gap-1.5 mt-auto text-[10px] font-bold tracking-[0.16em] uppercase text-foreground">
                  <span>Explore</span>
                  <ArrowRight
                    size={12}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile Pagination Dots */}
        <div className="flex lg:hidden justify-center gap-2 mt-4">
          {pillars.map((_, i) => (
            <div 
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeIndex ? "w-6 bg-foreground" : "w-1.5 bg-foreground/20"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

