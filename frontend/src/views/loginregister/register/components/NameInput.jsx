import { InputText } from "primereact/inputtext";

// eslint-disable-next-line react/prop-types
export const NameInput = ({ name, handleInput, nameRef }) => {
  return (
    <div className="flex flex-col gap-0.5">
      <label htmlFor="name">Név</label>
      <InputText
        id="name"
        name="name"
        value={name}
        onInput={handleInput}
        ref={nameRef}
        className="border-2 hover:border-medium-blue focus:border-medium-blue focus:outline-none p-2 rounded-xl"
      />
    </div>
  );
};
