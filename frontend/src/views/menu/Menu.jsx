import { NavLink } from "react-router-dom";

export const Menu = () => (
  <>
    {/* Sidebar */}
    <div className="hidden md:flex md:row-start-1 md:row-span-7 bg-dark-blue md:justify-center pt-5 ">
      <NavLink
        to="/"
        className="text-white text-4xl font-extrabold hover:text-light-blue h-fit"
      >
        ELS
      </NavLink>
    </div>

    {/* Topbar */}
    <div className="md:col-start-2 md:col-span-4 bg-white flex justify-end items-center px-5 border-b-2 border-gray-400 shadow-md">
      <button className="md:hidden px-4 py-3 m-2 bg-gray-700 text-white rounded">
        ☰
      </button>

      <NavLink
        to="/auth"
        className={({ isActive }) =>
          `hidden md:block mr-8 text-xl no-underline transition-all duration-200 ${
            isActive ? "text-medium-blue" : "text-black"
          } hover:text-medium-blue`
        }
      >
        Bejelentkezés
      </NavLink>

      {/* <NavLink
        to="/auth"
        className={({ isActive }) =>
          `hidden md:block text-xl no-underline transition-all duration-200 ${
            isActive ? "text-medium-blue" : "text-black"
          } hover:text-medium-blue`
        }
      >
        Regisztráció
      </NavLink> */}
    </div>
  </>
);
