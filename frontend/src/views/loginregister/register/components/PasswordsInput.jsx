/* eslint-disable react/prop-types */
import { Password } from "primereact/password";
import { ErrorMessage } from "@/views/helper/ErrorMessage";

export const PasswordsInput = ({ password, handleInput, error }) => (
  <div className="flex flex-col gap-0.5">
    <label>Jelszó* {error && <ErrorMessage message={error} />}</label>
    <Password
      id="password"
      name="password"
      value={password}
      onChange={handleInput}
      feedback={false}
      inputClassName="register-input"
      unstyled
    />
  </div>
);
