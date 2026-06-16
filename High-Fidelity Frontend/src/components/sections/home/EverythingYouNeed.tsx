import { ArrowRight, Package, Hammer, Wrench, Swords, Users } from "lucide-react";
import { Link } from "react-router";
import { DF } from "../../../lib/constants";
import { SectionLabel } from "../../ui/SectionLabel";
import { HomePageData } from "../../../types";

interface EverythingYouNeedProps {
  data?: HomePageData;
}

export default function EverythingYouNeed(_props: EverythingYouNeedProps) {
  const pillars = [
    {
      icon: <Package size={24} strokeWidth={1.5} />,
      title: "EQUIPMENT",
      desc: "Bats, gear and accessories from trusted brands.",
      link: "/collections",
    },
    {
      icon: <Hammer size={24} strokeWidth={1.5} />,
      title: "BAT KNOCKING",
      desc: "Professional preparation for match-ready performance.",
      link: "/services",
    },
    {
      icon: <Wrench size={24} strokeWidth={1.5} />,
      title: "REPAIRS",
      desc: "Restore performance and extend equipment lifespan.",
      link: "/services",
    },
    {
      icon: <Swords size={24} strokeWidth={1.5} />,
      title: "CUSTOM BATS",
      desc: "Built and prepared for your game.",
      link: "/custom-bats",
    },
    {
      icon: <Users size={24} strokeWidth={1.5} />,
      title: "TRAIN & PLAY",
      desc: "Facilities, equipment and cricket essentials.",
      link: "/training",
    },
  ];

  return (
    <section className="bg-[#f5f3ec] py-24 px-6 md:px-10 overflow-hidden">
      <div className="max-w-[1440px] mx-auto">
        <SectionLabel n="01" label="Overview" />
        <h2
          style={DF}
          className="text-[44px] md:text-[52px] font-black uppercase tracking-tight text-[#1c2117] mb-12"
        >
          EVERYTHING YOU NEED
        </h2>

        {/* Carousel / Grid Container */}
        <div className="flex lg:grid lg:grid-cols-5 gap-4 overflow-x-auto snap-x snap-mandatory hide-scroll pb-4 -mx-6 px-6 md:-mx-10 md:px-10 lg:mx-0 lg:px-0 lg:pb-0 lg:overflow-visible">
          {pillars.map(({ icon, title, desc, link }) => (
            <Link
              key={title}
              to={link}
              className="flex flex-col group w-[78%] sm:w-[320px] lg:w-auto shrink-0 snap-start bg-white border border-[rgba(28,33,23,0.06)] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#1a3b28]/30"
            >
              <div className="w-14 h-14 rounded-full bg-[#1a3b28]/5 flex items-center justify-center mb-8 text-[#1a3b28] group-hover:bg-[#1a3b28] group-hover:text-white transition-colors duration-300">
                {icon}
              </div>
              <h3
                style={DF}
                className="text-[22px] font-bold tracking-wide text-[#1c2117] mb-3 uppercase leading-tight"
              >
                {title}
              </h3>
              <p className="text-[13px] leading-relaxed text-[#6b7462] flex-grow mb-8">
                {desc}
              </p>
              <div className="flex items-center gap-1.5 mt-auto text-[10px] font-bold tracking-[0.16em] uppercase text-[#1a3b28]">
                <span>Explore</span>
                <ArrowRight
                  size={12}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

