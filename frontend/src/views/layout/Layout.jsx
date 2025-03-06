import { Outlet } from "react-router-dom";

import { Menu } from "../menu/Menu";
import { Footer } from "../footer/Footer";

export const Layout = () => (
  <div className="authed-layout-container">
    <>
      <Menu />

      <div className="authed-outlet-container">
        <Outlet />
      </div>

      <Footer />
    </>
  </div>
);
