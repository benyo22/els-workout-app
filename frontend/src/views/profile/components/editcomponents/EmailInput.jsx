/* eslint-disable react/prop-types */
import { InputText } from "primereact/inputtext";
import { ErrorMessage } from "@/views/helper/ErrorMessage";

export const EmailInput = ({ email, handleInput, error }) => (
  <div className="flex flex-col gap-0.5">
    <label>Email {error && <ErrorMessage message={error} />}</label>
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
