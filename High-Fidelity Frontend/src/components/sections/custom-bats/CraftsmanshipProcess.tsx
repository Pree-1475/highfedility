import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DF } from "../../../lib/constants";

export default function CraftsmanshipProcess() {
  const steps = [
    { n: "01", title: "Consultation", desc: "We discuss your playing style, typical pitch conditions, and preferences." },
    { n: "02", title: "Selection", desc: "We handpick the perfect cleft of willow matching your criteria." },
    { n: "03", title: "Shaping", desc: "The bat is carved, pressed, and balanced by expert bat makers." },
    { n: "04", title: "Finishing", desc: "Sanded, oiled, gripped, and machine-knocked—ready for the crease." },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % steps.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [steps.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? steps.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % steps.length);
  };

  return (
    <section className="bg-[#11311e] py-20 lg:py-32 overflow-hidden text-[#ffffff]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
        <div className="text-center mb-16">
          <h2 style={DF} className="text-[40px] sm:text-[54px] font-black tracking-tight uppercase mb-4">
            The Process
          </h2>
          <p className="text-[14px] text-[#ffffff]/60 max-w-lg mx-auto">
            From raw willow cleft to a match-ready masterpiece.
          </p>
        </div>

        <div className="relative w-full max-w-3xl mx-auto flex items-center justify-center">
          {/* Desktop/Tablet side arrows */}
          <button 
            onClick={handlePrev}
            className="hidden sm:block absolute -left-2 sm:-left-6 md:-left-10 z-20 p-2 text-[#ffffff]/40 hover:text-[#ffffff] transition-colors"
          >
            <ChevronLeft size={40} strokeWidth={1} />
          </button>

          <div className="relative w-full max-w-2xl mx-auto h-[280px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute inset-0 bg-[#252a1f] border border-[#ffffff]/10 p-8 sm:p-10 flex flex-col justify-center items-center text-center rounded-2xl shadow-xl"
              >
                <span style={DF} className="text-[60px] sm:text-[80px] font-black text-[#ffffff]/5 leading-none absolute -top-2 sm:-top-4 -left-2 sm:-left-4 pointer-events-none select-none">
                  {steps[currentIndex].n}
                </span>
                <h3 style={DF} className="text-[28px] sm:text-[36px] font-bold uppercase mb-4 relative z-10">
                  {steps[currentIndex].title}
                </h3>
                <p className="text-[14px] sm:text-[15px] leading-relaxed text-[#ffffff]/70 relative z-10 max-w-sm">
                  {steps[currentIndex].desc}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <button 
            onClick={handleNext}
            className="hidden sm:block absolute -right-2 sm:-right-6 md:-right-10 z-20 p-2 text-[#ffffff]/40 hover:text-[#ffffff] transition-colors"
          >
            <ChevronRight size={40} strokeWidth={1} />
          </button>
        </div>
        
        {/* Indicators & Mobile Nav */}
        <div className="flex justify-center items-center gap-6 mt-10">
          <button 
            onClick={handlePrev}
            className="sm:hidden p-2 text-[#ffffff]/40 hover:text-[#ffffff] transition-colors"
          >
            <ChevronLeft size={24} strokeWidth={1.5} />
          </button>

          <div className="flex gap-3">
            {steps.map((_, i) => (
              <button 
                key={i} 
                onClick={() => setCurrentIndex(i)}
                className={`h-1 rounded-full transition-all duration-500 ${i === currentIndex ? "w-8 bg-[#ffffff]" : "w-2 bg-[#ffffff]/20 hover:bg-[#ffffff]/50"}`}
              />
            ))}
          </div>

          <button 
            onClick={handleNext}
            className="sm:hidden p-2 text-[#ffffff]/40 hover:text-[#ffffff] transition-colors"
          >
            <ChevronRight size={24} strokeWidth={1.5} />
          </button>
        </div>

      </div>
    </section>
  );
}
