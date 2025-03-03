// eslint-disable-next-line react/prop-types
export const AgeInput = ({ age, handleInput, error }) => (
  <div className="flex flex-col gap-0.5">
    <label>
      Kor* {error && <span className="error-message">{error}</span>}
    </label>
    <input
      type="number"
      name="age"
      id="age"
      value={age}
      onInput={handleInput}
      className="register-input"
    />
  </div>
);
