import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useBusinessSettings } from "../../contexts/BusinessSettingsContext";
import { DF } from "../../lib/constants";
import { MessageCircle } from "lucide-react";

export function Footer() {
  const settings = useBusinessSettings();
  const address = settings?.address || "No. 12, Jalan Perang\nTaman Perang, 80150\nJohor Bahru, Johor";
  const whatsappUrl = settings?.whatsapp_url || "https://wa.me/60123456789";
  // The context may not provide opening hours directly, fallback default
  const openingHours = "Mon - Sun: 10:00 AM - 10:00 PM";

  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, margin: "-100px" });

  const [isHovering, setIsHovering] = useState(false);

  return (
    <footer ref={footerRef} className="relative bg-primary pt-0 md:pt-24 pb-[100px] lg:pb-6 overflow-hidden flex flex-col justify-between">
      <div className="max-w-[1440px] w-full mx-auto px-6 md:px-10 relative z-10">

        {/* Info Grid (Brand Area + Essential Info) */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 pt-12 pb-8 lg:pb-16 border-t border-background/10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {/* Brand Area */}
          <div className="flex flex-col gap-4">
            <h3 style={DF} className="text-3xl md:text-4xl text-background uppercase tracking-tighter leading-none">
              MR.WILLOW
            </h3>
            <p className="text-[14px] text-background font-bold uppercase tracking-widest">
              Johor Bahru's Cricket Specialist
            </p>
            <p className="text-background/60 text-[13px] leading-relaxed max-w-sm">
              Your destination for premium cricket gear and expert services. Crafted for the game.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-2 w-max inline-flex items-center gap-2.5 text-[11px] font-bold tracking-[0.15em] uppercase text-background/80 hover:text-primary transition-colors duration-300"
            >
              <MessageCircle size={14} />
              <span>Contact Us (WhatsApp)</span>
            </a>
          </div>

          {/* Essential Info */}
          <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="flex flex-col gap-2">
              <h4 className="text-[10px] font-bold tracking-[0.16em] uppercase text-background/40 mb-2">Location</h4>
              <address className="not-italic text-[13px] text-background/80 leading-relaxed whitespace-pre-line">
                {address}
              </address>
            </div>

            <div className="flex flex-col gap-2">
              <h4 className="text-[10px] font-bold tracking-[0.16em] uppercase text-background/40 mb-2">Connect</h4>
              <a href={whatsappUrl} target="_blank" rel="noreferrer" className="text-[13px] text-background/80 hover:text-primary transition-colors leading-relaxed">
                WhatsApp Us
              </a>
            </div>

            <div className="flex flex-col gap-2">
              <h4 className="text-[10px] font-bold tracking-[0.16em] uppercase text-background/40 mb-2">Opening Hours</h4>
              <p className="text-[13px] text-background/80 leading-relaxed whitespace-pre-line">
                {openingHours}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Legal Bar */}
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-background/10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <motion.div
            className="hidden md:flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <span style={DF} className="text-2xl tracking-tighter uppercase text-background">MW</span>
          </motion.div>

          <p className="text-[10px] text-background/40 tracking-[0.1em] uppercase">
            © {new Date().getFullYear()} MR.WILLOW. ALL RIGHTS RESERVED.
          </p>

          <motion.div
            className="text-background/30 font-mono text-[10px] uppercase cursor-pointer tracking-widest"
            onHoverStart={() => setIsHovering(true)}
            onHoverEnd={() => setIsHovering(false)}
            animate={
              isHovering
                ? {
                  rotate: [0, -2, 2, -2, 2, 0],
                  scale: [1, 1.05, 1],
                  color: "#a37c56",
                }
                : {
                  rotate: 0,
                  scale: 1,
                  color: "rgba(245,243,236,0.3)",
                }
            }
            transition={{ duration: 0.5 }}
          >
            Crafted for the game
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-[76px] lg:bottom-0 left-1/2 -translate-x-1/2 w-full px-6 text-center text-[16vw] sm:text-[15vw] md:text-[14vw] lg:text-[15vw] font-black text-background/[0.03] pointer-events-none select-none leading-none whitespace-nowrap"
        style={DF}
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        MR.WILLOW
      </motion.div>
    </footer>
  );
}
