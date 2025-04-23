import { Outlet } from "react-router";

import { Menu } from "@features";
import { Footer } from "@features";

export const Layout = () => (
  <div className="authed-layout-container">
    <>
      <Menu />

      <main className="authed-outlet-container">
        <Outlet />
      </main>

      <Footer />
    </>
  </div>
);
