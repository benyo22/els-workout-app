import { Outlet, useLocation } from "react-router-dom";

import { WelcomeMenu } from "../welcomemenu/WelcomeMenu";

export const WelcomeLayout = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col h-screen w-screen overflow-y-auto">
      {location.pathname.endsWith("/auth") && <WelcomeMenu />}

      <div className="flex flex-1 items-center justify-center">
        <Outlet />
      </div>
    </div>
  );
};
