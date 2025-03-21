import { createContext, useContext, useState, useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const ColorThemeContext = createContext();

export function ColorThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <ColorThemeContext.Provider value={{ isDark, setIsDark }}>
      <div
        className={`flex items-center justify-center h-screen transition-all duration-300 ${
          isDark ? "bg-black text-white" : "bg-white text-[#0F1419]"
        }`}
      >
        {children}
      </div>
    </ColorThemeContext.Provider>
  );
}

export function useColorTheme() {
  return useContext(ColorThemeContext);
}