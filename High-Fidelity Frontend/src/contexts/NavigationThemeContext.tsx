import React, { createContext, useContext, useState, useEffect } from "react";

export type NavTheme = "dark" | "light" | "cream";

interface NavigationThemeContextType {
  navTheme: NavTheme;
  setNavTheme: (theme: NavTheme) => void;
}

const NavigationThemeContext = createContext<NavigationThemeContextType | undefined>(undefined);

export function NavigationThemeProvider({ children }: { children: React.ReactNode }) {
  // Default to 'dark' assuming homepage is the default entry
  const [navTheme, setNavTheme] = useState<NavTheme>("dark");

  return (
    <NavigationThemeContext.Provider value={{ navTheme, setNavTheme }}>
      {children}
    </NavigationThemeContext.Provider>
  );
}

export function useNavigationTheme() {
  const context = useContext(NavigationThemeContext);
  if (!context) {
    throw new Error("useNavigationTheme must be used within a NavigationThemeProvider");
  }
  return context;
}

/**
 * A helper component that pages can drop in to set the navigation theme.
 */
export function SetNavTheme({ theme }: { theme: NavTheme }) {
  const { setNavTheme } = useNavigationTheme();

  useEffect(() => {
    setNavTheme(theme);
  }, [theme, setNavTheme]);

  return null;
}
