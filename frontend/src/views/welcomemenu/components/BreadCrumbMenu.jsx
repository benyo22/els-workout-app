import { useRef } from "react";
import { useNavigate } from "react-router-dom";

import { Menu } from "primereact/menu";
import { Button } from "primereact/button";

export const BreadCrumbMenu = () => {
  const menu = useRef(null);
  const navigate = useNavigate();

  const items = [
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
        className="breadcrumb-menu"
        onClick={(e) => menu.current.toggle(e)}
        unstyled
      />
      <Menu model={items} popup ref={menu} className="dropdown-menu" unstyled />
    </>
  );
};
