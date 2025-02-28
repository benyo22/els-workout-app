import "primeicons/primeicons.css";

import { NavLink } from "react-router-dom";

import UserAvatar from "./components/UserAvatar";

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
          <NavLink to="home" className="logged-in-menu-links">
            <span className="pi pi-home mr-2"></span>Kezdőlap
          </NavLink>

          <NavLink to="workouts" className="logged-in-menu-links">
            <span className="pi pi-trophy mr-2"></span>Edzés
          </NavLink>

          <NavLink to="meals" className="logged-in-menu-links">
            <span className="pi pi-chart-pie mr-2"></span>Étkezés
          </NavLink>

          <NavLink to="sleep" className="logged-in-menu-links">
            <span className="pi pi-moon mr-2"></span>Alvás
          </NavLink>

          <NavLink to="statistics" className="logged-in-menu-links">
            <span className="pi pi-chart-bar mr-2"></span>Statisztika
          </NavLink>

          <NavLink to="profile" className="logged-in-menu-links">
            <span className="pi pi-user-edit mr-2"></span>Profil
          </NavLink>

          <NavLink to="settings" className="logged-in-menu-links">
            <span className="pi pi-cog mr-2"></span>Beállítások
          </NavLink>
        </div>
      </div>

      {/* Topbar */}
      <div className="md:col-start-2 md:col-span-4 bg-white flex justify-end items-center px-5 border-b-2 border-primary-grey shadow-md">
        <UserAvatar />
      </div>
    </>
  );
};
