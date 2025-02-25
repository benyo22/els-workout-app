/* eslint-disable react/prop-types */
import { Password } from "primereact/password";

export const PasswordsInput = ({ password, handleInput }) => {
  return (
    <>
      {" "}
      <div className="flex flex-col gap-0.5">
        <label htmlFor="password">Jelszó</label>
        <Password
          id="password"
          name="password"
          value={password}
          onChange={handleInput}
          feedback={false}
          inputClassName="input"
        />
      </div>
    </>
  );
};
