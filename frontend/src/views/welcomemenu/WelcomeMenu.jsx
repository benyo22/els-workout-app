import { useDispatch } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import {
  setLoginActive,
  setRegisterActive,
} from "../../state/slices/authUiSlice";

import { BreadCrumbMenu } from "./components/BreadCrumbMenu";

export const WelcomeMenu = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  return (
    <>
      {/* Topbar */}
      <div className="bg-primary-blue flex justify-end items-center px-5 border-b-2 border-primray-grey shadow-md h-18">
        <BreadCrumbMenu />

        {/* if on main page no "Főoldal" option in the menu */}
        {!location.pathname.endsWith("/") && (
          <NavLink to="/" className="links">
            Főoldal
          </NavLink>
        )}

        {/* if on auth page in then no "Bejelentkezés" and "Regisztráció" option in the menu */}
        {!location.pathname.endsWith("/auth") && (
          <>
            <NavLink
              to="/auth"
              className="links"
              onClick={() => dispatch(setLoginActive())}
            >
              Bejelentkezés
            </NavLink>

            <NavLink
              to="/auth"
              className="links"
              onClick={() => dispatch(setRegisterActive())}
            >
              Regisztráció
            </NavLink>
          </>
        )}
      </div>
    </>
  );
};
