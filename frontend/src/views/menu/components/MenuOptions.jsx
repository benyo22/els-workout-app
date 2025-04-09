import { NavLink } from "react-router-dom";

import {
  FaHome,
  FaTrophy,
  FaAppleAlt,
  FaMoon,
  FaBalanceScale,
  FaUserEdit,
  FaCog,
} from "react-icons/fa";

export const MenuOptions = () => (
  <>
    <NavLink to="home" className="logged-in-menu-links">
      <FaHome className="mr-2" /> Kezdőlap
    </NavLink>
    <NavLink to="workouts" className="logged-in-menu-links">
      <FaTrophy className="mr-2" /> Edzés
    </NavLink>
    <NavLink to="meals" className="logged-in-menu-links">
      <FaAppleAlt className="mr-2" /> Étkezés
    </NavLink>
    <NavLink to="sleep" className="logged-in-menu-links">
      <FaMoon className="mr-2" /> Alvás
    </NavLink>
    <NavLink to="weight" className="logged-in-menu-links">
      <FaBalanceScale className="mr-2" /> Súly
    </NavLink>
    <NavLink to="profile" className="logged-in-menu-links">
      <FaUserEdit className="mr-2" /> Profil
    </NavLink>
    <NavLink to="settings" className="logged-in-menu-links">
      <FaCog className="mr-2" /> Beállítások
    </NavLink>
  </>
);
