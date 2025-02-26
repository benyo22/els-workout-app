import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import {
  setLoginActive,
  setRegisterActive,
} from "../../state/slices/authUiSlice";
import { logout, selectIsAuthenticated } from "../../state/slices/authSlice";
import { useLogoutMutation } from "../../state/endpoints/userEndpoints";

export const Menu = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [sendLogout] = useLogoutMutation();
  console.log(isAuthenticated);

  return (
    <>
      {/* Sidebar */}
      <div className="hidden md:flex md:row-start-1 md:row-span-7 bg-primary-blue md:justify-center pt-5 ">
        <NavLink
          to="/"
          className="text-white text-4xl font-extrabold hover:text-primary-green h-fit"
        >
          ELS
        </NavLink>
      </div>

      {/* Topbar */}
      <div className="md:col-start-2 md:col-span-4 bg-white flex justify-end items-center px-5 border-b-2 border-gray-400 shadow-md">
        <button className="md:hidden px-4 py-3 m-2 bg-gray-700 text-white rounded">
          ☰
        </button>

        {/* if on auth page or logged in then no register and login option in the menu */}
        {!location.pathname.endsWith("/auth") && !isAuthenticated && (
          <>
            <NavLink
              to="/auth"
              className={({ isActive }) =>
                `hidden md:block mr-8 text-xl no-underline transition-all duration-200 ${
                  isActive ? "text-primary-blue" : "text-black"
                } hover:text-primary-blue`
              }
              onClick={() => dispatch(setLoginActive())}
            >
              Bejelentkezés
            </NavLink>

            <NavLink
              to="/auth"
              className={({ isActive }) =>
                `hidden md:block text-xl no-underline transition-all duration-200 ${
                  isActive ? "text-primary-blue" : "text-black"
                } hover:text-primary-blue`
              }
              onClick={() => dispatch(setRegisterActive())}
            >
              Regisztráció
            </NavLink>
          </>
        )}

        {isAuthenticated && (
          <>
            <NavLink
              className="hidden md:block text-xl no-underline transition-all duration-200 hover:text-primary-blue"
              onClick={async () => {
                const result = await sendLogout();
                dispatch(logout());
                console.log(result, isAuthenticated);
              }}
            >
              Kijelentkezés
            </NavLink>
          </>
        )}
      </div>
    </>
  );
};
