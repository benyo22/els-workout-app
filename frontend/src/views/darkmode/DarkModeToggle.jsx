import { useEffect } from "react";
import { MoonIcon, SunIcon } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { toggleDarkMode } from "../../state/slices/darkModeSlice";

export const DarkModeToggle = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.darkMode.darkMode);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  console.log(darkMode);

  return (
    <button
      onClick={() => dispatch(toggleDarkMode())}
      className="p-2 rounded-lg transition-colors duration-300 
      bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white"
    >
      {darkMode ? <SunIcon size={20} /> : <MoonIcon size={20} />}
    </button>
  );
};
