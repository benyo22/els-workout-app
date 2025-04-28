import { selectDarkMode } from "@store/slices/darkModeSlice";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export const ThemeProvider = () => {
  const darkMode = useSelector(selectDarkMode);
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
    const themeLinkId = "dynamic-theme";

    const loadTheme = (theme) => {
      const existingLink = document.getElementById(themeLinkId);
      if (existingLink) {
        existingLink.href = theme;
      } else {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = theme;
        link.id = themeLinkId;
        document.head.appendChild(link);
      }
    };

    const removeTheme = () => {
      const currentTheme = document.getElementById(themeLinkId);
      if (currentTheme) {
        currentTheme.remove();
      }
    };

    removeTheme();

    const theme = darkMode
      ? "themes/lara-dark-blue/theme.css"
      : "themes/lara-light-blue/theme.css";
    loadTheme(theme);

    return () => {
      removeTheme();
    };
  }, [darkMode]);

  return null;
};
