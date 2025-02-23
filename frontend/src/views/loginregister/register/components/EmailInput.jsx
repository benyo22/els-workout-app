import { InputText } from "primereact/inputtext";

export const EmailInput = () => {
  return (
    <div className="flex flex-col gap-0.5">
      <label htmlFor="email">Email</label>
      <InputText
        id="email"
        className="border-2 hover:border-medium-blue focus:border-medium-blue focus:outline-none p-2 rounded-xl"
      />
    </div>
  );
};
