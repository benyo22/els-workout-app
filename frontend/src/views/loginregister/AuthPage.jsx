import { useState } from "react";
import { Login } from "./login/Login";
import { Register } from "./register/Register";

import { Button } from "primereact/button";

export const AuthPage = () => {
  const [loginActive, setLoginActive] = useState(true);

  return (
    <>
      <div className="bg-white shadow-[0_5px_15px_rgba(0,0,0,0.35)] overflow-hidden w-[768px] max-w-full min-h-[480px] rounded-[30px] flex">
        <div
          className={`flex flex-col gap-y-8 items-center justify-center md:transition-all md:duration-300 md:ease-out ${
            loginActive
              ? "md:w-[288px] md:h-[480px] md:rounded-r-full bg-dark-blue w-[768px] h-[150px]"
              : "md:size-[480px] size-0"
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
                className="bg-light-blue p-3 rounded-full border-2 border-cream-white hover:border-2 hover:border-dark-blue hover:bg-cream-white transition-all duration-300"
                onClick={() => setLoginActive(false)}
              />
            </>
          ) : (
            <Register />
          )}
        </div>
        <div
          className={`flex flex-col gap-y-8 items-center justify-center md:transition-all md:duration-300 md:ease-out ${
            loginActive
              ? "md:size-[480px] size-0"
              : "md:w-[288px] md:h-[480px] md:rounded-l-full bg-dark-blue w-[768px] h-[150px]"
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
                className="bg-light-blue p-3 rounded-full border-2 border-cream-white hover:border-2 hover:border-dark-blue hover:bg-cream-white transition-all duration-300"
                onClick={() => setLoginActive(true)}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};
