/* eslint-disable react/prop-types */
import { InputText } from "primereact/inputtext";
import { ErrorMessage } from "../../../helper/ErrorMessage";

export const UsernameInput = ({
  username,
  handleInput,
  usernameRef,
  error,
}) => (
  <div className="flex flex-col gap-0.5">
    <label>Felhasználónév* {error && <ErrorMessage message={error} />}</label>
    <InputText
      id="username"
      name="username"
      value={username}
      onInput={handleInput}
      ref={usernameRef}
      className="login-input"
      unstyled
    />
  </div>
);
