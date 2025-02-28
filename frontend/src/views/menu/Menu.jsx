import { NavLink } from "react-router-dom";

import UserAvatar from "./components/UserAvatar";
import { MenuOptions } from "./components/MenuOptions";

export const Menu = () => {
  return (
    <>
      {/* Sidebar */}
      <div className="hidden md:flex md:flex-col md:items-center md:justify-start md:row-start-1 md:row-span-7 md:bg-primary-blue md:pt-5 md:pb-5 overflow-y-auto">
        <NavLink
          to="/"
          className="text-white text-4xl font-extrabold hover:text-primary-green h-fit"
        >
          ELS
        </NavLink>
        <div className="flex flex-col text-white text-xl font-semibold mt-30 space-y-10">
          <MenuOptions />
        </div>
      </div>

      {/* Topbar */}
      <div className="md:col-start-2 md:col-span-4 bg-white flex justify-end items-center px-5 border-b-2 border-primary-grey shadow-md">
        <UserAvatar />
      </div>
    </>
  );
};
