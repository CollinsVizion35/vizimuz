import { FaMoon, FaSun } from "react-icons/fa";
import { useColorTheme } from "../../contexts/colorContext/useColorTheme";

export function ThemeToggleButton() {
    const { isDark, setIsDark } = useColorTheme();
  
    return (
      <button
        onClick={() => setIsDark(!isDark)}
        className="px-6 py-3 text-lg font-semibold rounded-lg border border-gray-300 shadow-md transition-all duration-300 hover:shadow-lg flex items-center gap-2"
      >
        {isDark ? <FaSun className="text-yellow-400 animate-spin" /> : <FaMoon className="text-blue-500 animate-pulse" />}
        Toggle Theme
      </button>
    );
  }