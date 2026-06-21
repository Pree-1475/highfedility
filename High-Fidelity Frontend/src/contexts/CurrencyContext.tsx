import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type CurrencyCode = "MYR" | "SGD" | "INR" | "BDT" | "VND" | "IDR";

interface CurrencyContextType {
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
  formatPrice: (priceInMYR: string | number) => string;
  isLoadingRates: boolean;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const CURRENCY_SYMBOLS: Record<CurrencyCode, string> = {
  MYR: "RM",
  SGD: "S$",
  INR: "₹",
  BDT: "৳",
  VND: "₫",
  IDR: "Rp",
};

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [currency, setCurrencyState] = useState<CurrencyCode>(() => {
    const saved = localStorage.getItem("selectedCurrency") as CurrencyCode;
    return saved || "MYR";
  });
  
  const [rates, setRates] = useState<Record<string, number>>({});
  const [isLoadingRates, setIsLoadingRates] = useState(true);

  // Fetch live rates on mount
  useEffect(() => {
    const fetchRates = async () => {
      try {
        setIsLoadingRates(true);
        // Using exchangerate-api for free live rates with MYR base
        const res = await fetch("https://open.er-api.com/v6/latest/MYR");
        const data = await res.json();
        if (data && data.rates) {
          setRates(data.rates);
        }
      } catch (error) {
        console.error("Failed to fetch exchange rates", error);
      } finally {
        setIsLoadingRates(false);
      }
    };
    fetchRates();
  }, []);

  const setCurrency = (newCurrency: CurrencyCode) => {
    setCurrencyState(newCurrency);
    localStorage.setItem("selectedCurrency", newCurrency);
  };

  const formatPrice = (priceInMYR: string | number): string => {
    if (!priceInMYR) return `${CURRENCY_SYMBOLS[currency]} 0`;
    
    // Clean string if necessary
    const numericStr = typeof priceInMYR === 'string' 
      ? priceInMYR.replace(/[^0-9.]/g, '') 
      : priceInMYR.toString();
      
    const baseVal = parseFloat(numericStr);
    if (isNaN(baseVal)) return `${CURRENCY_SYMBOLS[currency]} 0`;

    // Conversion
    const rate = rates[currency] || 1; // Fallback to 1 if rates haven't loaded or MYR
    const convertedVal = baseVal * rate;

    // Formatting based on currency
    let fractionDigits = 0;
    if (currency === "MYR" || currency === "SGD") {
        fractionDigits = convertedVal % 1 === 0 ? 0 : 2;
    } else {
        // INR, BDT, VND, IDR generally don't show decimals for typical large amounts
        fractionDigits = 0;
    }

    const formattedNumber = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits,
    }).format(convertedVal);

    return `${CURRENCY_SYMBOLS[currency]} ${formattedNumber}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice, isLoadingRates }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
};
