import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { useRef } from "react";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import ThreeBatCanvas from "../../canvas/ThreeBatCanvas";
import { HomePageData } from "../../../types";
import { useBusinessSettings } from "../../../contexts/BusinessSettingsContext";

interface HeroProps {
  data?: HomePageData;
}

const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };

const fadeUpVariants: any = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.8,
      ease: [0.25, 0.4, 0.25, 1],
    },
  }),
};

const scaleInVariants: any = {
  hidden: { opacity: 0, scale: 0.8, rotate: -10 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      delay: 0.3,
    },
  },
};

export default function Hero({ data }: HeroProps) {
  const settings = useBusinessSettings();
  const ref = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const rawY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y = useSpring(rawY, springConfig);

  const rawTextX1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const textX1 = useSpring(rawTextX1, springConfig);

  const rawTextX2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const textX2 = useSpring(rawTextX2, springConfig);

  const rawScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const scale = useSpring(rawScale, springConfig);

  const rawOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const opacity = useSpring(rawOpacity, springConfig);

  const subtitle = data?.hero_subtitle || "JOHOR BAHRU'S CRICKET SPECIALIST";

  // Split the title for the parallax effect
  const titleLines = data?.hero_title
    ? data.hero_title.split("\n").map(l => l.trim()).filter(l => l)
    : ["GEAR. SERVICE.", "EXPERTISE."];
    
  const midIndex = Math.ceil(titleLines.length / 2);
  const firstHalf = titleLines.slice(0, midIndex).join(" ");
  const secondHalf = titleLines.slice(midIndex).join(" ");

  const description =
    data?.hero_description ||
    "Premium equipment, expert bat knocking, and coaching for every level of the game — all under one roof.";

  const primaryText = "Visit Our Store";
  const primaryLink = "/contact";
  const secondaryText = "Browse Collections";
  const secondaryLink = "/collections";

  const isPrimaryInternal = true;
  const isSecondaryInternal = true;

  const features = [
    "Free Knocking",
    "In-house Repairs",
    "Trusted Brands",
    "Expert Advice",
  ];

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#fdfbf7] noise-overlay"
    >
      {/* Subtle gradient background - Cream to warm off-white */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#fdfbf7] via-[#8b7355]/5 to-[#fdfbf7]" />

      {/* Floating Ambient Orbs */}
      <motion.div
        className="absolute top-20 left-10 w-24 h-24 rounded-full bg-[#8b7355]/15 blur-3xl pointer-events-none"
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-40 right-20 w-32 h-32 rounded-full bg-[#7ec89a]/15 blur-3xl pointer-events-none"
        animate={{
          x: [0, -40, 0],
          y: [0, 30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-12 w-full">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          
          {/* ═══════════════════════════════════════
              LEFT COLUMN — Typography & UI
             ═══════════════════════════════════════ */}
          <motion.div style={{ opacity }} className="space-y-5">
            {/* Eyebrow Tag */}
            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              custom={0}
              className="inline-flex items-center gap-2 bg-[#1c2117] text-[#fdfbf7] px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-mono tracking-wider shadow-sm"
            >
              <motion.span
                className="w-2 h-2 bg-[#7ec89a] rounded-full"
                animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              {subtitle}
            </motion.div>

            {/* Split Headings */}
            <div className="space-y-1 overflow-hidden py-2">
              <motion.h1
                style={{ x: textX1 }}
                className="text-5xl sm:text-6xl md:text-7xl lg:text-[80px] xl:text-[96px] font-black tracking-tighter text-[#1c2117] leading-[0.9] uppercase"
              >
                <motion.span
                  variants={fadeUpVariants}
                  initial="hidden"
                  animate="visible"
                  custom={1}
                  className="inline-block whitespace-nowrap"
                >
                  {firstHalf}
                </motion.span>
              </motion.h1>
              <motion.h1
                style={{ x: textX2 }}
                className="text-5xl sm:text-6xl md:text-7xl lg:text-[80px] xl:text-[96px] font-black tracking-tighter text-[#1c2117] leading-[0.9] uppercase"
              >
                <motion.span
                  variants={fadeUpVariants}
                  initial="hidden"
                  animate="visible"
                  custom={2}
                  className="inline-block text-[#8b7355] whitespace-nowrap"
                >
                  {secondHalf}
                </motion.span>
              </motion.h1>
              
              <motion.p
                variants={fadeUpVariants}
                initial="hidden"
                animate="visible"
                custom={3}
                className="text-[13px] sm:text-[15px] font-mono text-[#1c2117]/70 tracking-tight pt-4 max-w-md leading-relaxed"
              >
                {description}
              </motion.p>
            </div>

            {/* Call-to-Action Buttons */}
            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              custom={4}
              className="flex flex-wrap gap-3 sm:gap-4 pt-4"
            >
              {/* Primary Button */}
              {isPrimaryInternal ? (
                <Link to={primaryLink} className="inline-block">
                  <motion.button
                    className="bg-[#1c2117] text-[#fdfbf7] px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-bold text-[13px] sm:text-sm tracking-wide flex items-center gap-2 group relative overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
                      whileHover={{ x: "200%" }}
                      transition={{ duration: 0.6 }}
                    />
                    <span className="relative z-10">{primaryText}</span>
                    <motion.svg
                      className="w-4 h-4 relative z-10"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      initial={{ x: 0 }}
                      whileHover={{ x: 4 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </motion.svg>
                  </motion.button>
                </Link>
              ) : null}

              {/* Secondary Button */}
              {isSecondaryInternal ? (
                <Link to={secondaryLink} className="inline-block">
                  <motion.button
                    className="border-2 border-[#1c2117]/20 text-[#1c2117] px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-bold text-[13px] sm:text-sm tracking-wide relative overflow-hidden"
                    whileHover={{ scale: 1.02, backgroundColor: "#1c2117", color: "#fdfbf7", borderColor: "#1c2117" }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    {secondaryText}
                  </motion.button>
                </Link>
              ) : null}
            </motion.div>

            {/* Benefit Tickers */}
            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              custom={5}
              className="flex flex-wrap gap-x-4 gap-y-2 pt-4"
            >
              {features.map((benefit, i) => (
                <motion.div
                  key={benefit}
                  className="flex items-center gap-2 text-[11px] sm:text-xs font-mono text-[#1c2117]/60"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                >
                  <div className="w-1.5 h-1.5 bg-[#8b7355] rounded-full" />
                  {benefit}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* ═══════════════════════════════════════
              RIGHT COLUMN — Product Showcase
             ═══════════════════════════════════════ */}
          <motion.div style={{ y, scale }} className="relative flex justify-center w-full h-[65vw] sm:h-[50vw] lg:h-[600px] mt-8 lg:mt-0 pointer-events-auto">
            <motion.div variants={scaleInVariants} initial="hidden" animate="visible" className="relative w-full h-full">
              
              {/* Ambient Glow */}
              <motion.div
                className="absolute inset-0 bg-[#8b7355]/15 blur-[80px] rounded-full scale-75 pointer-events-none"
                animate={{
                  scale: [0.75, 0.85, 0.75],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Levitating Asset wrapper */}
              <motion.div
                className="absolute inset-0 z-10 drop-shadow-2xl"
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 2, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <ThreeBatCanvas />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* ── Scroll Indicator (Bottom Center) ── */}
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden lg:block"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-5 h-8 border-2 border-[#1c2117]/20 rounded-full flex justify-center pt-1.5">
              <motion.div
                className="w-1 h-2 bg-[#1c2117]/30 rounded-full"
                animate={{ y: [0, 6, 0], opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
