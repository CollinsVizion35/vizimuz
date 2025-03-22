import { useContext } from "react";
import ColorThemeContext from "./colorContext";

export const useColorTheme = () => {
  return useContext(ColorThemeContext);
};
