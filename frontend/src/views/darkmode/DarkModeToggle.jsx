import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  selectDarkMode,
  toggleDarkMode,
} from "../../state/slices/darkModeSlice";
import { FaSun, FaMoon } from "react-icons/fa6";

export const DarkModeToggle = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector(selectDarkMode);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => dispatch(toggleDarkMode())}
      className="p-2 rounded-lg transition-colors duration-300
      bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white mr-5"
    >
      {darkMode ? (
        <FaSun className="hover:text-yellow-300" />
      ) : (
        <FaMoon className="hover:text-secondary-blue" />
      )}
    </button>
  );
};
