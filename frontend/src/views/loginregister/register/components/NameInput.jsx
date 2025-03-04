/* eslint-disable react/prop-types */
import { InputText } from "primereact/inputtext";

export const NameInput = ({ name, handleInput, nameRef }) => (
  <div className="flex flex-col gap-0.5">
    <label>Név*</label>
    <InputText
      id="name"
      name="name"
      value={name}
      onInput={handleInput}
      ref={nameRef}
      className="register-input"
      unstyled
    />
  </div>
);
