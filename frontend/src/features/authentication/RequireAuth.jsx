import { selectLoggedInUsername } from "@/store/slices/authSlice";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

// this prevents a not logged in user to go to pages that require auth
export const RequireAuth = () => {
  const username = useSelector(selectLoggedInUsername);

  if (!username) {
    return <Navigate to="/auth" replace />;
  }

  return <Outlet />;
};
