import { InputText } from "primereact/inputtext";

// eslint-disable-next-line react/prop-types
export const AgeInput = ({ age, handleInput }) => {
  return (
    <div className="flex flex-col gap-0.5">
      <label htmlFor="age">Kor</label>
      <InputText
        keyfilter="int"
        id="age"
        name="age"
        value={age}
        onInput={handleInput}
        className="input"
      />
    </div>
  );
};
