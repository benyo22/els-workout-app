import { Login } from "./login/Login";
import { Register } from "./register/Register";
import { Button } from "primereact/button";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectLoginActive,
  setLoginActive,
  setRegisterActive,
} from "../../state/slices/authViewSlice";

export const AuthPage = () => {
  const dispatch = useDispatch();
  const loginActive = useSelector(selectLoginActive);

  const toggleView = () => {
    loginActive ? dispatch(setRegisterActive()) : dispatch(setLoginActive());
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center">
      <header className="w-full bg-primary-blue py-4 px-6 flex items-center justify-between shadow-md">
        <h2 className="text-2xl font-bold text-primary-green">
          Eat Lift Sleep
        </h2>
        <NavLink to="/" className="welcome-menu-home-page-link">
          Főoldal
        </NavLink>
      </header>

      <main
        className={`bg-primary-white shadow-[0_5px_15px_rgba(0,0,0,0.35)] max-w-[768px] h-[500px] rounded-2xl flex my-10 mx-2 md:mx-6 ${
          loginActive ? "flex-col" : "flex-col-reverse"
        } md:flex-row overflow-y-auto`}
      >
        {/* Left side */}
        {/* If loginActive is true then the right side is bigger with the login form on it and the left is not, otherwise the left side is bigger with the register form on it  */}
        <div
          className={`flex flex-col gap-y-4 items-center justify-center md:transition-all md:duration-400 md:ease-out ${
            loginActive
              ? "md:w-[288px] md:h-[500px] md:rounded-r-[150px] bg-primary-blue w-full max-w-full h-[150px] py-2"
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
                className="register-button"
                onClick={toggleView}
                unstyled
              />
            </>
          ) : (
            <Register />
          )}
        </div>

        {/* Right side */}
        <div
          className={`flex flex-col gap-y-4 items-center justify-center md:transition-all md:duration-400 md:ease-out ${
            loginActive
              ? "md:w-[480px] md:h-[500px]"
              : "md:w-[288px] md:h-[500px] md:rounded-l-[150px] bg-primary-blue w-full max-w-full h-[150px] py-2"
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
                className="login-button"
                onClick={toggleView}
                unstyled
              />
            </>
          )}
        </div>
      </main>
    </div>
  );
};
