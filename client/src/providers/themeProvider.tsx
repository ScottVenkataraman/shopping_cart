import { type ReactNode } from "react";
import { useState, createContext, useEffect } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  handleToggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  handleToggleTheme: () => {
    throw new Error("toggleTheme is not implemented");
  },
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
  };


  return (
    <ThemeContext value={{ theme, handleToggleTheme }}>
      {children}
    </ThemeContext>
  );
}