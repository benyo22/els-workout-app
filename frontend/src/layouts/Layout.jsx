import { Footer } from "@features/footer/Footer";
import { Menu } from "@features/menu/Menu";
import { Outlet } from "react-router";

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
