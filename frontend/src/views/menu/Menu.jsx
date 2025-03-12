import { NavLink } from "react-router-dom";

import UserAvatar from "./components/UserAvatar";
import { MenuOptions } from "./components/MenuOptions";
// import { DarkModeToggle } from "../darkmode/DarkModeToggle";

export const Menu = () => {
  return (
    <>
      {/* Sidebar */}
      <div className="hidden md:flex md:flex-col md:items-center md:justify-start md:row-start-1 md:row-span-7 md:bg-gradient-to-b md:from-primary-blue md:to-third-blue md:pt-5 md:pb-5 overflow-y-auto">
        <NavLink
          to="/"
          className="text-white text-4xl font-extrabold hover:text-primary-green hover:scale-105 transition duration-300 ease-in-out"
        >
          ELS
        </NavLink>
        <nav className="flex flex-col text-white text-xl font-semibold mt-30 space-y-10">
          <MenuOptions />
        </nav>
      </div>

      {/* Topbar */}
      <header className="md:col-start-2 md:col-span-4 bg-white flex justify-end items-center px-5 border-b-2 border-primary-grey shadow-md">
        {/* <DarkModeToggle /> */}
        <UserAvatar />
      </header>
    </>
  );
};
