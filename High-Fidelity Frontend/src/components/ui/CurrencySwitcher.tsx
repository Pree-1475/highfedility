import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useCurrency, CurrencyCode } from "../../contexts/CurrencyContext";
import { DF } from "../../lib/constants";

const CURRENCIES: { code: CurrencyCode; label: string }[] = [
  { code: "MYR", label: "Malaysian Ringgit" },
  { code: "SGD", label: "Singapore Dollar" },
  { code: "INR", label: "Indian Rupee" },
  { code: "BDT", label: "Bangladeshi Taka" },
  { code: "VND", label: "Vietnamese Dong" },
  { code: "IDR", label: "Indonesian Rupiah" },
];

export function CurrencySwitcher() {
  const { currency, setCurrency, isLoadingRates } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block z-50" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-background border border-foreground/10 px-3 py-1.5 rounded-full hover:bg-card transition-colors group"
      >
        <span style={DF} className="text-xs font-bold text-foreground mt-[1px]">
          {currency}
        </span>
        <ChevronDown 
          size={12} 
          className={`text-foreground/60 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} 
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute top-full right-0 mt-2 w-48 bg-card border border-foreground/10 shadow-lg rounded-xl overflow-hidden"
          >
            <div className="py-1">
              {CURRENCIES.map((c) => (
                <button
                  key={c.code}
                  onClick={() => {
                    setCurrency(c.code);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-xs transition-colors flex items-center justify-between
                    ${currency === c.code ? "bg-card text-foreground" : "text-foreground/70 hover:bg-background hover:text-foreground"}
                  `}
                >
                  <span className="font-medium">{c.code}</span>
                  <span className="text-[10px] text-foreground/50 truncate ml-2">{c.label}</span>
                </button>
              ))}
            </div>
            {isLoadingRates && (
              <div className="px-4 py-2 bg-background border-t border-foreground/10 text-[10px] text-foreground/50 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full border border-foreground/30 border-t-[#11311e] animate-spin" />
                Updating rates...
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
