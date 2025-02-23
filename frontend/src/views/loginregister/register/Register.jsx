import { NameInput } from "./components/NameInput";
import { AgeInput } from "./components/AgeInput";
import { EmailInput } from "./components/EmailInput";
import { UsernameInput } from "./components/UsernameInput";
import { PasswordsInput } from "./components/PasswordsInput";

export const Register = () => {
  return (
    <>
      <h1 className="text-5xl text-center mb-5 font-extrabold">Regisztráció</h1>
      <div className="flex gap-5">
        {/* Left side */}
        <div className="flex flex-col gap-5">
          <NameInput />
          <AgeInput />
          <EmailInput />
        </div>

        {/* Right side */}
        <div className="flex flex-col gap-5">
          <UsernameInput />
          <PasswordsInput />
        </div>
      </div>
    </>
  );
};
