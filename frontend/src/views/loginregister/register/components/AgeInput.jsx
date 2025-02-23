import { InputText } from "primereact/inputtext";

export const AgeInput = () => {
  return (
    <div className="flex flex-col gap-0.5">
      <label htmlFor="age">Kor</label>
      <InputText
        keyfilter="int"
        id="age"
        className="border-2 hover:border-medium-blue focus:border-medium-blue focus:outline-none p-2 rounded-xl"
      />
    </div>
  );
};
