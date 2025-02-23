import { InputText } from "primereact/inputtext";

export const UsernameInput = () => {
  return (
    <div className="flex flex-col gap-0.5">
      <label htmlFor="username">Felhasználónév</label>
      <InputText
        id="username"
        className="border-2 hover:border-medium-blue focus:border-medium-blue focus:outline-none p-2 rounded-xl"
      />
    </div>
  );
};
