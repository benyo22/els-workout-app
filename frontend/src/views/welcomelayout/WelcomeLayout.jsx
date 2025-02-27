import { Outlet } from "react-router-dom";
import { Footer } from "../footer/Footer";
import { WelcomeMenu } from "../welcomemenu/WelcomeMenu";

export const WelcomeLayout = () => (
  <div className="flex flex-col h-screen w-screen">
    <>
      <WelcomeMenu />

      <div className="flex flex-1 items-center justify-center">
        <Outlet />
      </div>

      <Footer />
    </>
  </div>
);
