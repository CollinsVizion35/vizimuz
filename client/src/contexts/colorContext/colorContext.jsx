import { createContext, useState, useEffect } from "react";

const ColorThemeContext = createContext();

export const ColorThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <ColorThemeContext.Provider value={{ isDark, setIsDark }}>
      {children}
    </ColorThemeContext.Provider>
  );
};

export default ColorThemeContext; // Export context separately
