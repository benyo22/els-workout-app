/* eslint-disable react/prop-types */
import { InputText } from "primereact/inputtext";

export const EmailInput = ({ email, handleInput, error }) => (
  <div className="flex flex-col gap-0.5">
    <label>
      Email* {error && <span className="error-message">{error}</span>}
    </label>
    <InputText
      id="email"
      name="email"
      value={email}
      onInput={handleInput}
      className="register-input"
      unstyled
    />
  </div>
);
