import { useRef } from "react";

import "primeicons/primeicons.css";
import { Menu } from "primereact/menu";
import { Button } from "primereact/button";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setLoginActive,
  setRegisterActive,
} from "../../../state/slices/authUiSlice";

export const BreadCrumbMenu = () => {
  const menu = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const items = location.pathname.endsWith("/")
    ? [
        {
          label: (
            <div
              className="p-1 font-bold text-lg hover:text-primary-blue cursor-pointer"
              onClick={() => {
                dispatch(setLoginActive());
                navigate("/auth");
              }}
            >
              <span className="pi pi-sign-in"></span> Bejelentkezés
            </div>
          ),
        },
        {
          label: (
            <div
              className="p-1 font-bold text-lg hover:text-primary-blue cursor-pointer"
              onClick={() => {
                dispatch(setRegisterActive());
                navigate("/auth");
              }}
            >
              <span className="pi pi-user-plus"></span> Regisztráció
            </div>
          ),
        },
      ]
    : [
        {
          label: (
            <div
              className="p-1 font-bold text-lg hover:text-primary-blue cursor-pointer"
              onClick={() => navigate("/")}
            >
              <span className="pi pi-home"></span> Főoldal
            </div>
          ),
        },
      ];

  return (
    <>
      <Button
        icon="pi pi-bars"
        className="md:hidden p-3 bg-primary-green rounded-lg border-2 hover:bg-primary-white hover:border-primary-green"
        onClick={(e) => menu.current.toggle(e)}
      />
      <Menu model={items} popup ref={menu} className="dropdown-menu" />
    </>
  );
};
