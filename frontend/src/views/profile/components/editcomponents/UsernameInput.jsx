/* eslint-disable react/prop-types */
import { InputText } from "primereact/inputtext";

export const UsernameInput = ({ username, handleInput, error }) => (
  <div className="flex flex-col gap-0.5">
    <label>
      Felhasználónév {error && <span className="error-message">{error}</span>}
    </label>
    <InputText
      id="username"
      name="username"
      value={username}
      onInput={handleInput}
      className="register-input"
      unstyled
    />
  </div>
);
