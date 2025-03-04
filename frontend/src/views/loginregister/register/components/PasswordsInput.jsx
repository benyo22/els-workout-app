/* eslint-disable react/prop-types */
import { Password } from "primereact/password";

export const PasswordsInput = ({ password, handleInput, error }) => (
  <div className="flex flex-col gap-0.5">
    <label>
      Jelszó* {error && <span className="error-message">{error}</span>}
    </label>
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
