/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUsername } from "../../state/slices/authSlice";
import { setLoginActive } from "../../state/slices/authUiSlice";

export const RequireAuth = ({ children }) => {
  const username = useSelector(selectLoggedInUsername);
  const dispatch = useDispatch();

  if (!username) {
    dispatch(setLoginActive);
    return <Navigate to="/auth" replace />;
  }

  return children;
};
