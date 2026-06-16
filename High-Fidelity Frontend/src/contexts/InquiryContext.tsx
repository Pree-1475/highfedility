import React, { createContext, useContext, useState, ReactNode } from "react";

import { Product } from "../types";

interface InquiryContextType {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (id: string | number) => void;
  clearItems: () => void;
}

const InquiryContext = createContext<InquiryContextType | undefined>(undefined);

export function InquiryProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>([]);

  const addItem = (product: Product) => {
    setItems((prev) => {
      if (prev.some((item) => item.id === product.id)) return prev;
      return [...prev, product];
    });
  };

  const removeItem = (id: string | number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearItems = () => setItems([]);

  return (
    <InquiryContext.Provider value={{ items, addItem, removeItem, clearItems }}>
      {children}
    </InquiryContext.Provider>
  );
}

export function useInquiry() {
  const context = useContext(InquiryContext);
  if (context === undefined) {
    throw new Error("useInquiry must be used within an InquiryProvider");
  }
  return context;
}
