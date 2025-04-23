import { Outlet } from "react-router";

export const WelcomeLayout = () => {
  return (
    <div className="welcome-layout">
      <Outlet />
    </div>
  );
};
