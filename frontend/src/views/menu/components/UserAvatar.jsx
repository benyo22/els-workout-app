import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Menu } from "primereact/menu";
import {
  FaUser,
  FaHome,
  FaTrophy,
  FaAppleAlt,
  FaMoon,
  FaBalanceScale,
  FaUserEdit,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { Avatar } from "primereact/avatar";

import { setLoginActive } from "../../../state/slices/authViewSlice";
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
        <div className="p-1 font-bold text-xl border-b cursor-default">
          Felhasználó:{" "}
          <span
            className="dropdown-menu-username"
            onClick={() => navigate("profile")}
          >
            {username}
          </span>
        </div>
      ),
    },
    {
      label: (
        <div className="dropdown-menu-link">
          <FaSignOutAlt className="mr-0.5" /> Kijelentkezés
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
        <div className="p-1 font-bold text-xl border-b cursor-default">
          Felhasználó:{" "}
          <span className="dropdown-menu-username">{username}</span>
        </div>
      ),
      command: () => {
        navigate("profile");
      },
    },
    {
      label: (
        <div className="dropdown-menu-link">
          <FaHome className="mr-2" /> Kezdőlap
        </div>
      ),
      command: () => {
        navigate("home");
      },
    },
    {
      label: (
        <div className="dropdown-menu-link">
          <FaTrophy className="mr-2" /> Edzés
        </div>
      ),
      command: () => {
        navigate("workouts");
      },
    },
    {
      label: (
        <div className="dropdown-menu-link">
          <FaAppleAlt className="mr-2" /> Étkezés
        </div>
      ),
      command: () => {
        navigate("meals");
      },
    },
    {
      label: (
        <div className="dropdown-menu-link">
          <FaMoon className="mr-2" /> Alvás
        </div>
      ),
      command: () => {
        navigate("sleep");
      },
    },
    {
      label: (
        <div className="dropdown-menu-link">
          <FaBalanceScale className="mr-2" /> Súly
        </div>
      ),
      command: () => {
        navigate("weight");
      },
    },
    {
      label: (
        <div className="dropdown-menu-link">
          <FaUserEdit className="mr-2" /> Profil
        </div>
      ),
      command: () => {
        navigate("profile");
      },
    },
    {
      label: (
        <div className="dropdown-menu-link">
          <FaCog className="mr-2" /> Beállítások
        </div>
      ),
      command: () => {
        navigate("settings");
      },
    },
    {
      label: (
        <div className="dropdown-menu-link">
          <FaSignOutAlt className="mr-0.5" /> Kijelentkezés
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
        icon={<FaUser size={20} />}
        className="user-avatar"
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
