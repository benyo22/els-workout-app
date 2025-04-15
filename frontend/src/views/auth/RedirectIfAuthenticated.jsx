import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import { selectLoggedInUsername } from "../../state/slices/authSlice";

// this prevents a logged in user to go to the welcome page or the login/register page
export const RedirectIfAuthenticated = () => {
  const username = useSelector(selectLoggedInUsername);

  if (username) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
};
