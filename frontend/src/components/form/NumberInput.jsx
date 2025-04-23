/* eslint-disable react/prop-types */
import { ErrorMessage } from "@features";

export const NumberInput = ({
  label,
  type,
  id,
  name,
  value,
  onInput,
  className,
  error,
}) => (
  <div className="flex flex-col gap-0.5">
    <label>
      {label} {error && <ErrorMessage message={error} />}
    </label>
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onInput={onInput}
      className={className}
    />
  </div>
);
