import "primeicons/primeicons.css";

import { NavLink } from "react-router-dom";

import UserAvatar from "./components/UserAvatar";

export const Menu = () => {
  return (
    <>
      {/* Sidebar */}
      <div className="hidden md:flex md:row-start-1 md:row-span-7 bg-primary-blue md:justify-center pt-5 ">
        <NavLink
          to="/"
          className="text-white text-4xl font-extrabold hover:text-primary-green h-fit"
        >
          ELS
        </NavLink>
      </div>

      {/* Topbar */}
      <div className="md:col-start-2 md:col-span-4 bg-white flex justify-end items-center px-5 border-b-2 border-primray-grey shadow-md">
        <UserAvatar />
      </div>
    </>
  );
};
