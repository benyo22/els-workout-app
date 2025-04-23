/* eslint-disable react/prop-types */
import { ErrorMessage } from "@features";
import { InputText } from "primereact/inputtext";

export const TextInput = ({
  label,
  id,
  name,
  value,
  onInput,
  ref,
  className,
  error,
}) => (
  <div className="flex flex-col gap-0.5">
    <label>
      {label} {error && <ErrorMessage message={error} />}
    </label>
    <InputText
      id={id}
      name={name}
      value={value}
      onInput={onInput}
      ref={ref}
      className={className}
      unstyled
    />
  </div>
);
