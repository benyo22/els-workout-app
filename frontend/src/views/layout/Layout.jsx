import { Outlet } from "react-router-dom";
import { Menu } from "../menu/Menu";

export const Layout = () => (
  <div>
    <Menu />
    <Outlet />
  </div>
);
