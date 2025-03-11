import { NavLink } from "react-router-dom";

import { BreadCrumbMenu } from "./components/BreadCrumbMenu";

export const WelcomeMenu = () => {
  return (
    <>
      {/* Topbar */}
      <div className="bg-primary-blue flex justify-end items-center px-5 border-b-2 border-primary-grey shadow-md h-18">
        <div className="md:hidden block">
          <BreadCrumbMenu />
        </div>

        <NavLink to="/" className="welcome-menu-home-page-link">
          Főoldal
        </NavLink>
      </div>
    </>
  );
};
