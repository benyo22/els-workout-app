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
  FaChartBar,
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
            className="hover:text-primary-green cursor-pointer"
            onClick={() => navigate("profile")}
          >
            {username}
          </span>
        </div>
      ),
    },
    {
      label: (
        <div className="text-xl hover:text-primary-blue mt-2 ml-2 flex items-center">
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
          <span className="hover:text-primary-green">{username}</span>
        </div>
      ),
      command: () => {
        navigate("profile");
      },
    },
    {
      label: (
        <div className="text-xl hover:text-primary-blue mt-2 ml-2 flex items-center">
          <FaHome className="mr-2" /> Kezdőlap
        </div>
      ),
      command: () => {
        navigate("home");
      },
    },
    {
      label: (
        <div className="text-xl hover:text-primary-blue mt-2 ml-2 flex items-center">
          <FaTrophy className="mr-2" /> Edzés
        </div>
      ),
      command: () => {
        navigate("workouts");
      },
    },
    {
      label: (
        <div className="text-xl hover:text-primary-blue mt-2 ml-2 flex items-center">
          <FaAppleAlt className="mr-2" /> Étkezés
        </div>
      ),
      command: () => {
        navigate("meals");
      },
    },
    {
      label: (
        <div className="text-xl hover:text-primary-blue mt-2 ml-2 flex items-center">
          <FaMoon className="mr-2" /> Alvás
        </div>
      ),
      command: () => {
        navigate("sleep");
      },
    },
    {
      label: (
        <div className="text-xl hover:text-primary-blue mt-2 ml-2 flex items-center">
          <FaBalanceScale className="mr-2" /> Súly
        </div>
      ),
      command: () => {
        navigate("weight");
      },
    },
    {
      label: (
        <div className="text-xl hover:text-primary-blue mt-2 ml-2 flex items-center">
          <FaChartBar className="mr-2" /> Statisztika
        </div>
      ),
      command: () => {
        navigate("statistics");
      },
    },
    {
      label: (
        <div className="text-xl hover:text-primary-blue mt-2 ml-2 flex items-center">
          <FaUserEdit className="mr-2" /> Profil
        </div>
      ),
      command: () => {
        navigate("profile");
      },
    },
    {
      label: (
        <div className="text-xl hover:text-primary-blue mt-2 ml-2 flex items-center">
          <FaCog className="mr-2" /> Beállítások
        </div>
      ),
      command: () => {
        navigate("settings");
      },
    },
    {
      label: (
        <div className="text-xl hover:text-primary-blue mt-2 ml-2 flex items-center">
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
        className="flex items-center justify-center text-primary-white my-2 md:mr-2 bg-gradient-to-b from-primary-blue to-third-blue rounded-full w-14 h-14 hover:cursor-pointer hover:scale-105 hover:shadow-lg hover:from-primary-blue hover:to-primary-green transition-all duration-400 "
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
