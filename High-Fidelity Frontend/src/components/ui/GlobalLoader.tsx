import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { DF } from "../../lib/constants";

export default function GlobalLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Artificial delay to let initial assets (fonts, images) load, 
    // and give the user a chance to see the nice animation.
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500); // 2.5 second loading screen
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#11311e] text-[#ffffff]"
        >
          {/* Rotating Cricket Ball */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="w-20 h-20 rounded-full bg-[#8c1c1c] shadow-[inset_-6px_-6px_12px_rgba(0,0,0,0.6)] border-2 border-[#5a0f0f] relative overflow-hidden mb-8 flex items-center justify-center"
          >
            {/* The Seam */}
            <div className="absolute w-full h-full flex items-center justify-center rotate-45">
              <div className="w-full h-3 border-y-2 border-white/60 border-dashed rounded-[50%]"></div>
            </div>
            {/* Thread detail */}
            <div className="absolute w-full h-[2px] bg-white/20 rotate-45"></div>
          </motion.div>

          {/* Typography */}
          <motion.h2
            style={DF}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[24px] font-black uppercase tracking-[0.2em]"
          >
            Mr. Willow
          </motion.h2>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-4 flex items-center gap-2"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#ffffff]/50">
              Preparing the pitch
            </span>
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="text-[10px] uppercase tracking-[0.3em] text-[#ffffff]/50"
            >
              ...
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
