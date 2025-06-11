import { useContext } from "react";
import { ThemeContext } from "../providers/themeProvider";

export const ToggleableThemeButton = () => {
  const themeContext = useContext(ThemeContext);
  const { theme, handleToggleTheme } = themeContext;
  return (
    <>
      <button onClick={handleToggleTheme}>{theme === "light" ? "Switch to dark" : "Switch to light"}</button>
    </>
    
  );
}