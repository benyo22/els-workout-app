import { NavLink } from "react-router";
import { useSelector } from "react-redux";

import UserAvatar from "./components/UserAvatar";
import { MenuOptions } from "./components/MenuOptions";
import { DarkModeToggle } from "../darkmode/DarkModeToggle";

import { selectUserId } from "../../state/slices/authSlice";
import { useGetWorkoutByUserIdQuery } from "../../state/endpoints/workoutEndpoints";

export const Menu = () => {
  const userId = useSelector(selectUserId);
  const { data: workoutData } = useGetWorkoutByUserIdQuery(userId);

  return (
    <>
      {/* Sidebar */}
      <nav className="sidebar">
        <NavLink to="/" className="logged-in-sidebar-els">
          ELS
        </NavLink>
        <nav className="menu-options-container">
          <MenuOptions />
        </nav>
      </nav>

      {/* Topbar */}
      <header className="topbar">
        {workoutData?.some((w) => !w.isFinished) && (
          <NavLink
            to="/workouts"
            className="bg-primary-green text-primary-white mr-5 px-2 py-2 font-semibold rounded-lg hover:bg-secondary-green transition duration-300 ease-in-out cursor-pointer hover:scale-102 dark:bg-dark-primary-green dark:hover:bg-dark-secondary-green"
          >
            Edzés folytatása
          </NavLink>
        )}
        <DarkModeToggle />
        <UserAvatar />
      </header>
    </>
  );
};
