import { InputText } from "primereact/inputtext";

// eslint-disable-next-line react/prop-types
export const EmailInput = ({ email, handleInput }) => {
  return (
    <div className="flex flex-col gap-0.5">
      <label htmlFor="email">Email</label>
      <InputText
        id="email"
        name="email"
        value={email}
        onInput={handleInput}
        className="input"
      />
    </div>
  );
};
