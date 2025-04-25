import { selectDarkMode, toggleDarkMode } from "@/store/slices/darkModeSlice";
import { useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";

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
