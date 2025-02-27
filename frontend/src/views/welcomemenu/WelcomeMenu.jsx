import { useDispatch } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import {
  setLoginActive,
  setRegisterActive,
} from "../../state/slices/authUiSlice";

export const WelcomeMenu = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  return (
    <>
      {/* Topbar */}
      <div className="bg-primary-blue flex justify-end items-center px-5 border-b-2 border-primray-grey shadow-md h-18">
        <button className="md:hidden px-4 py-3 my-2 mx-6 bg-gray-700 text-white rounded">
          ☰
        </button>

        {!location.pathname.endsWith("/") && (
          <NavLink
            to="/"
            className="links"
            onClick={() => dispatch(setLoginActive())}
          >
            Főoldal
          </NavLink>
        )}

        {/* if on auth page or logged in then no register and login option in the menu */}
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
