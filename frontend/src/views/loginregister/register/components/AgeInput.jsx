// eslint-disable-next-line react/prop-types
export const AgeInput = ({ age, handleInput, error }) => (
  <div className="flex flex-col gap-0.5">
    <label>Kor* {error && <span className="errorMessage">{error}</span>}</label>
    <input
      type="number"
      name="age"
      id="age"
      value={age}
      onInput={handleInput}
      className="input"
    />
  </div>
);
