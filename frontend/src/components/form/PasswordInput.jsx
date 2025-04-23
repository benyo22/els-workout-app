/* eslint-disable react/prop-types */
import { ErrorMessage } from "@features";
import { Password } from "primereact/password";

export const PasswordInput = ({
  label,
  id,
  name,
  value,
  onChange,
  inputClassName,
  error,
}) => (
  <div className="flex flex-col gap-0.5">
    <label>
      {label} {error && <ErrorMessage message={error} />}
    </label>
    <Password
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      feedback={false}
      inputClassName={inputClassName}
      unstyled
    />
  </div>
);
