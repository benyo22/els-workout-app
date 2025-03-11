import { Outlet } from "react-router-dom";

export const WelcomeLayout = () => {
  return (
    <div className="flex items-center justify-center bg-gradient-to-b from-primary-blue to-third-blue overflow-y-auto">
      <Outlet />
    </div>
  );
};
