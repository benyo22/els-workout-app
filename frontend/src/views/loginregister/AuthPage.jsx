import { useState } from "react";
import { Login } from "./login/Login";
import { Register } from "./register/Register";

import { Button } from "primereact/button";

export const AuthPage = () => {
  const [loginActive, setLoginActive] = useState(true);

  return (
    <>
      <div className="authCard">
        {/* Left side */}
        {/* If loginActive is true then the right side is bigger with the login form on it and the left is not, otherwise the left side is bigger with the register form on it  */}
        <div
          className={`flex flex-col gap-y-8 items-center md:justify-center justify-end md:transition-all md:duration-300 md:ease-out ${
            loginActive
              ? "md:w-[288px] md:h-[480px] md:rounded-r-[225px] bg-dark-blue w-[768px] max-w-full h-[150px] p-2"
              : "md:w-[480px] md:h-[480px]"
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
                className="authButton"
                onClick={() => setLoginActive(false)}
              />
            </>
          ) : (
            <Register />
          )}
        </div>

        {/* Right side */}
        <div
          className={`flex flex-col gap-y-8 items-center justify-center md:transition-all md:duration-300 md:ease-out ${
            loginActive
              ? "md:w-[480px] md:h-[480px]"
              : "md:w-[288px] md:h-[480px] md:rounded-l-[225px] bg-dark-blue w-[768px] max-w-full h-[150px] p-2"
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
                className="authButton"
                onClick={() => setLoginActive(true)}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};
