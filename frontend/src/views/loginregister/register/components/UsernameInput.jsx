import { InputText } from "primereact/inputtext";

// eslint-disable-next-line react/prop-types
export const UsernameInput = ({ username, handleInput }) => {
  return (
    <div className="flex flex-col gap-0.5">
      <label htmlFor="username">Felhasználónév</label>
      <InputText
        id="username"
        name="username"
        value={username}
        onInput={handleInput}
        className="border-2 hover:border-medium-blue focus:border-medium-blue focus:outline-none p-2 rounded-xl"
      />
    </div>
  );
};
