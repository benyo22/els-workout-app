import { useRef } from "react";
import { Menu } from "primereact/menu";
import { Avatar } from "primereact/avatar";

import { useDispatch, useSelector } from "react-redux";
import { setLoginActive } from "../../../state/slices/authUiSlice";
import { useLogoutMutation } from "../../../state/endpoints/userEndpoints";
import {
  logout,
  selectLoggedInUsername,
} from "../../../state/slices/authSlice";

const UserAvatar = () => {
  const menu = useRef(null);
  const dispatch = useDispatch();
  const [sendLogout] = useLogoutMutation();
  const username = useSelector(selectLoggedInUsername);

  const items = [
    {
      label: (
        <>
          <div className="p-1 font-bold text-xl border-b cursor-default">
            Felhasználónév:{" "}
            <span className="hover:text-primary-green !important">
              {username}
            </span>
          </div>
        </>
      ),
      // disabled: true,
    },
    {
      label: (
        <div className="text-xl hover:text-primary-blue mt-2 ml-2">
          <span className="pi pi-sign-out"></span> Kijelentkezés
        </div>
      ),
      command: async () => {
        await sendLogout();
        dispatch(logout());
        dispatch(setLoginActive());
      },
    },
  ];

  return (
    <div>
      <Avatar
        icon="pi pi-user"
        className="text-primary-white my-2 md:mr-2 p-6 border-2 border-primary-white bg-primary-blue rounded-2xl hover:border-2 hover:border-primary-blue hover:bg-primary-white hover:text-black transition-all duration-400;"
        shape="circle"
        size="xlarge"
        onClick={(e) => menu.current.toggle(e)}
      />
      <Menu model={items} popup ref={menu} className="dropdown-menu" />
    </div>
  );
};

export default UserAvatar;
