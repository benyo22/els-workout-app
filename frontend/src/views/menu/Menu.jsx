import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { setLoginActive } from "../../state/slices/authUiSlice";
import { logout } from "../../state/slices/authSlice";
import { useLogoutMutation } from "../../state/endpoints/userEndpoints";

export const Menu = () => {
  const dispatch = useDispatch();
  const [sendLogout] = useLogoutMutation();

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
      <div className="md:col-start-2 md:col-span-4 bg-white flex justify-end items-center px-5 border-b-2 border-primray-grey shadow-md">
        <button className="md:hidden px-4 py-3 m-2 bg-gray-700 text-white rounded">
          ☰
        </button>

        <NavLink
          className="links"
          onClick={async () => {
            await sendLogout();
            dispatch(logout());
            dispatch(setLoginActive());
          }}
        >
          Kijelentkezés
        </NavLink>
      </div>
    </>
  );
};
