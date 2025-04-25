import {
  FaAppleAlt,
  FaBalanceScale,
  FaCog,
  FaHome,
  FaMoon,
  FaTrophy,
  FaUserEdit,
} from "react-icons/fa";
import { NavLink } from "react-router";

export const MenuOptions = () => (
  <>
    <NavLink
      to="home"
      className={({ isActive }) =>
        isActive ? "logged-in-menu-links-active" : "logged-in-menu-links"
      }
    >
      <FaHome className="mr-2" /> Kezdőlap
    </NavLink>
    <NavLink
      to="workouts"
      className={({ isActive }) =>
        isActive ? "logged-in-menu-links-active" : "logged-in-menu-links"
      }
    >
      <FaTrophy className="mr-2" /> Edzés
    </NavLink>
    <NavLink
      to="meals"
      className={({ isActive }) =>
        isActive ? "logged-in-menu-links-active" : "logged-in-menu-links"
      }
    >
      <FaAppleAlt className="mr-2" /> Étkezés
    </NavLink>
    <NavLink
      to="sleep"
      className={({ isActive }) =>
        isActive ? "logged-in-menu-links-active" : "logged-in-menu-links"
      }
    >
      <FaMoon className="mr-2" /> Alvás
    </NavLink>
    <NavLink
      to="weight"
      className={({ isActive }) =>
        isActive ? "logged-in-menu-links-active" : "logged-in-menu-links"
      }
    >
      <FaBalanceScale className="mr-2" /> Súly
    </NavLink>
    <NavLink
      to="profile"
      className={({ isActive }) =>
        isActive ? "logged-in-menu-links-active" : "logged-in-menu-links"
      }
    >
      <FaUserEdit className="mr-2" /> Profil
    </NavLink>
    <NavLink
      to="settings"
      className={({ isActive }) =>
        isActive ? "logged-in-menu-links-active" : "logged-in-menu-links"
      }
    >
      <FaCog className="mr-2" /> Beállítások
    </NavLink>
  </>
);
