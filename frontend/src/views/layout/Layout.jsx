import { Outlet } from "react-router";

import { Menu } from "@/views/menu/Menu";
import { Footer } from "@/views/footer/Footer";

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
