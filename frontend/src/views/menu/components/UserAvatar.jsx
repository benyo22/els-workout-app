import { Menu } from "primereact/menu";
import { Avatar } from "primereact/avatar";

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoginActive } from "../../../state/slices/authUiSlice";
import { useLogoutMutation } from "../../../state/endpoints/authEndpoints";
import {
  logout,
  selectLoggedInUsername,
} from "../../../state/slices/authSlice";
import { useNavigate } from "react-router-dom";

const SMALL_DEVICE_WIDTH = 768;

const UserAvatar = () => {
  const menu = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sendLogout] = useLogoutMutation();
  const username = useSelector(selectLoggedInUsername);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const biggerScreenItems = [
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

  const smallerScreenItems = [
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
    },
    {
      label: (
        <div className="text-xl hover:text-primary-blue mt-2 ml-2">
          <span className="pi pi-home mr-2"></span> Kezdőlap
        </div>
      ),
      command: () => {
        navigate("home");
      },
    },
    {
      label: (
        <div className="text-xl hover:text-primary-blue mt-2 ml-2">
          <span className="pi pi-trophy mr-2"></span> Edzés
        </div>
      ),
      command: () => {
        navigate("workouts");
      },
    },
    {
      label: (
        <div className="text-xl hover:text-primary-blue mt-2 ml-2">
          <span className="pi pi-chart-pie mr-2"></span> Étkezés
        </div>
      ),
      command: () => {
        navigate("meals");
      },
    },
    {
      label: (
        <div className="text-xl hover:text-primary-blue mt-2 ml-2">
          <span className="pi pi-moon mr-2"></span> Alvás
        </div>
      ),
      command: () => {
        navigate("sleep");
      },
    },
    {
      label: (
        <div className="text-xl hover:text-primary-blue mt-2 ml-2">
          <span className="pi pi-chart-bar mr-2"></span> Statisztika
        </div>
      ),
      command: () => {
        navigate("statistics");
      },
    },
    {
      label: (
        <div className="text-xl hover:text-primary-blue mt-2 ml-2">
          <span className="pi pi-user-edit mr-2"></span> Profil
        </div>
      ),
      command: () => {
        navigate("profile");
      },
    },
    {
      label: (
        <div className="text-xl hover:text-primary-blue mt-2 ml-2">
          <span className="pi pi-cog mr-2"></span> Beállítások
        </div>
      ),
      command: () => {
        navigate("settings");
      },
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
        className="text-primary-white my-2 md:mr-2 p-4 text-center border-2 border-primary-white bg-primary-blue rounded-full w-14 h-14 hover:border-2 hover:border-primary-blue hover:bg-primary-white hover:text-black hover:cursor-pointer transition-all duration-400;"
        shape="circle"
        size="xlarge"
        onClick={(e) => menu.current.toggle(e)}
        unstyled
      />
      <Menu
        model={
          windowWidth > SMALL_DEVICE_WIDTH
            ? biggerScreenItems
            : smallerScreenItems
        }
        popup
        ref={menu}
        className="dropdown-menu"
        unstyled
      />
    </div>
  );
};

export default UserAvatar;
