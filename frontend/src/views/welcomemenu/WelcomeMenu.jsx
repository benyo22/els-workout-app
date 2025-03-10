import { NavLink, useLocation } from "react-router-dom";

import { BreadCrumbMenu } from "./components/BreadCrumbMenu";

export const WelcomeMenu = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname.endsWith("/") ? (
        <></>
      ) : (
        <>
          {/* Topbar */}
          <div className="bg-primary-blue flex justify-end items-center px-5 border-b-2 border-primary-grey shadow-md h-18">
            <div className="md:hidden block">
              <BreadCrumbMenu />
            </div>

            {/* if on main page no "Főoldal" option in the menu */}
            {!location.pathname.endsWith("/") && (
              <NavLink to="/" className="links">
                Főoldal
              </NavLink>
            )}
          </div>
        </>
      )}
    </>
  );
};
