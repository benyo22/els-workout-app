import { Outlet } from "react-router-dom";
import { Menu } from "../menu/Menu";
import { Footer } from "../footer/Footer";

export const Layout = () => (
  <div className="md:grid md:grid-cols-[192px_1fr_1fr_1fr_1fr] md:grid-rows-[80px_1fr_1fr_1fr_1fr_1fr_35px] md:gap-0 h-screen w-screen flex flex-col">
    <>
      <Menu />

      <div className="md:col-start-2 md:col-span-4 md:row-start-2 md:row-span-5 flex flex-1 items-center justify-center overflow-y-auto">
        <Outlet />
      </div>

      <Footer />
    </>
  </div>
);
