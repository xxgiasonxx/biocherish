import React, { createContext } from "react";
import { useColorScheme } from "nativewind";
import { colorType, fontType, Colors, Fonts } from "@/constants/theme";

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeContext = createContext<{
    color: colorType;
    font: fontType;
}>({
    color: Colors.light,
    font: Fonts,
});

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const { colorScheme } = useColorScheme();

  const value = React.useMemo(() => ({
    color: Colors[colorScheme ?? 'light'],
    font: Fonts,
  }), [colorScheme]);

  return (
    <ThemeContext.Provider value={value}>
        {children}
    </ThemeContext.Provider>
  );
};