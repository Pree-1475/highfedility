import React, { createContext, useContext, useState, useEffect } from "react";
import { getBusinessSettings } from "../services/settings";
import { BusinessSettingsData } from "../types";

const BusinessSettingsContext = createContext<BusinessSettingsData | undefined>(undefined);

export function BusinessSettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<BusinessSettingsData | undefined>(undefined);

  useEffect(() => {
    getBusinessSettings()
      .then((data) => {
        if (data) {
          setSettings(data);
        }
      })
      .catch((err) => {
        console.warn("Failed to fetch global business settings:", err);
      });
  }, []);

  return (
    <BusinessSettingsContext.Provider value={settings}>
      {children}
    </BusinessSettingsContext.Provider>
  );
}

export function useBusinessSettings() {
  return useContext(BusinessSettingsContext);
}
