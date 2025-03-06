import { NavLink } from "react-router-dom";

export const MenuOptions = () => (
  <>
    <NavLink to="home" className="logged-in-menu-links">
      <span className="pi pi-home mr-2"></span>Kezdőlap
    </NavLink>

    <NavLink to="workouts" className="logged-in-menu-links">
      <span className="pi pi-trophy mr-2"></span>Edzés
    </NavLink>

    <NavLink to="meals" className="logged-in-menu-links">
      <span className="pi pi-chart-pie mr-2"></span>
      Étkezés
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
  </>
);
