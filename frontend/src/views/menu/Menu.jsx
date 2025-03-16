import { NavLink } from "react-router-dom";

import UserAvatar from "./components/UserAvatar";
import { MenuOptions } from "./components/MenuOptions";
import { DarkModeToggle } from "../darkmode/DarkModeToggle";

export const Menu = () => {
  return (
    <>
      {/* Sidebar */}
      <div className="sidebar">
        <NavLink to="/" className="logged-in-sidebar-els">
          ELS
        </NavLink>
        <nav className="menu-options-container">
          <MenuOptions />
        </nav>
      </div>

      {/* Topbar */}
      <header className="topbar">
        <DarkModeToggle />
        <UserAvatar />
      </header>
    </>
  );
};
