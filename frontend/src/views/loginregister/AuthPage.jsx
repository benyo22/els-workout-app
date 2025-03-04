import { Login } from "./login/Login";
import { Register } from "./register/Register";

import { Button } from "primereact/button";

import { useDispatch, useSelector } from "react-redux";
import {
  selectLoginActive,
  setLoginActive,
  setRegisterActive,
} from "../../state/slices/authUiSlice";

export const AuthPage = () => {
  const dispatch = useDispatch();
  const loginActive = useSelector(selectLoginActive);

  return (
    <>
      <div
        className={`bg-white shadow-[0_5px_15px_rgba(0,0,0,0.35)] w-[768px] max-w-full h-[500px] max-h-full rounded-[20px] flex ${
          loginActive ? "flex-col" : "flex-col-reverse"
        } md:flex-row overflow-y-auto`}
      >
        {/* Left side */}
        {/* If loginActive is true then the right side is bigger with the login form on it and the left is not, otherwise the left side is bigger with the register form on it  */}
        <div
          className={`flex flex-col gap-y-8 items-center justify-center md:transition-all md:duration-400 md:ease-out ${
            loginActive
              ? "md:w-[288px] md:h-[500px] md:rounded-r-[225px] bg-primary-blue w-[768px] max-w-full h-[150px] p-2"
              : "md:w-[480px] md:h-[500px]"
          }`}
        >
          {loginActive ? (
            <>
              <p className="text-white text-2xl font-extrabold text-center">
                Még nincs fiókja?
                <br />
                <span className="text-xs font-light text-center">
                  Regisztráljon most, hogy minden funkciót elérjen.
                </span>
              </p>
              <Button
                label="Regisztráció"
                className="auth-button"
                onClick={() => dispatch(setRegisterActive())}
                unstyled
              />
            </>
          ) : (
            <Register />
          )}
        </div>

        {/* Right side */}
        <div
          className={`flex flex-col gap-y-8 items-center justify-center md:transition-all md:duration-400 md:ease-out ${
            loginActive
              ? "md:w-[480px] md:h-[500px]"
              : "md:w-[288px] md:h-[500px] md:rounded-l-[225px] bg-primary-blue w-[768px] max-w-full h-[150px] p-2"
          }`}
        >
          {loginActive ? (
            <Login />
          ) : (
            <>
              <p className="text-white text-2xl font-extrabold text-center">
                Van már fiókja?
                <br />
                <span className="text-xs font-light text-center">
                  Lépjen be és folytassa egészséges életmódját.
                </span>
              </p>
              <Button
                label="Bejelentkezés"
                className="auth-button"
                onClick={() => dispatch(setLoginActive())}
                unstyled
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};
