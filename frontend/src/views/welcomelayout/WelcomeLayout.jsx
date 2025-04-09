import { Outlet } from "react-router-dom";

export const WelcomeLayout = () => {
  return (
    <div className="welcome-layout">
      <Outlet />
    </div>
  );
};
