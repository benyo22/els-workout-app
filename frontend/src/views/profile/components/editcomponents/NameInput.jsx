/* eslint-disable react/prop-types */
import { InputText } from "primereact/inputtext";

export const NameInput = ({ name, handleInput }) => (
  <div className="flex flex-col gap-0.5">
    <label>Név*</label>
    <InputText
      id="name"
      name="name"
      value={name}
      onInput={handleInput}
      className="register-input"
      unstyled
    />
  </div>
);
