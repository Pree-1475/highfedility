import { DF } from "../../../lib/constants";
import { SectionLabel } from "../../ui/SectionLabel";
import { WorkshopData } from "../../../types";
import { useEffect, useRef, useState } from "react";

interface ServicesGridProps {
  data?: WorkshopData;
}

export default function ServicesGrid({ data }: ServicesGridProps) {
  const services = data?.services || [
    { title: "Professional Bat Knocking", desc: "Machine-assisted knocking for perfect compression and readiness." },
    { title: "Bat Repair & Restoration", desc: "Fixing toe damage, edge cracks, and handle replacements." },
    { title: "Grip Replacement", desc: "Premium octopus and spiral grips applied professionally." },
    { title: "Bat Oiling & Sanding", desc: "Raw linseed oil application and fine sanding to retain moisture." },
    { title: "Weight Reduction", desc: "Careful shaving of the profile to reduce pickup weight." },
    { title: "Toe Guard Application", desc: "Protective toe guard fitting to prevent water damage and splitting." },
  ];

  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const scrollLeft = scrollRef.current.scrollLeft;
    // The width of each card plus gap is roughly the scroll width divided by items
    const cardWidth = scrollRef.current.scrollWidth / services.length;
    const newIndex = Math.round(scrollLeft / cardWidth);
    setActiveIndex(Math.min(newIndex, services.length - 1));
  };

  useEffect(() => {
    const handleAutoScroll = () => {
      const isMobile = window.innerWidth < 640;
      if (!isMobile || !scrollRef.current) return;

      const nextIndex = (activeIndex + 1) % services.length;
      const targetElement = scrollRef.current.children[nextIndex] as HTMLElement;
      
      if (targetElement) {
        // Find the offset considering the container's padding
        const containerPadding = 40; // px-10 is 40px
        scrollRef.current.scrollTo({
          left: targetElement.offsetLeft - containerPadding,
          behavior: "smooth"
        });
      }
    };

    const intervalId = setInterval(handleAutoScroll, 2500);
    return () => clearInterval(intervalId);
  }, [activeIndex, services.length]);

  return (
    <section className="bg-card py-24 px-10 border-t border-[rgba(28,33,23,0.06)] relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto">
        <div className="mb-12">
          <SectionLabel n="03" label="Workshop Services" />
          <h2 style={DF} className="text-[48px] font-black leading-[0.88] tracking-tight text-foreground uppercase">
            Repair, Restore & <br />Extend Lifespan
          </h2>
        </div>
        
        {/* Scroll Container */}
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6 overflow-x-auto snap-x snap-mandatory hide-scroll pb-4 sm:pb-0 -mx-10 px-10 sm:mx-0 sm:px-0"
        >
          {services.map((s, i) => (
            <div key={i} className="shrink-0 w-[85vw] sm:w-auto snap-center bg-background p-10 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(28,33,23,0.1)] transition-all duration-500 rounded-xl border border-[rgba(28,33,23,0.08)] relative group">
              <span style={DF} className="text-[32px] font-black text-muted-foreground leading-none block mb-4">0{i + 1}</span>
              <h3 style={DF} className="text-[24px] font-bold text-foreground uppercase mb-3 leading-tight">{s.title}</h3>
              <p className="text-[13px] leading-relaxed text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Mobile Pagination Dots */}
        <div className="flex sm:hidden justify-center gap-2 mt-4">
          {services.map((_, i) => (
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
