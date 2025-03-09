/* eslint-disable react/prop-types */
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Calendar } from "primereact/calendar";
import { FloatLabel } from "primereact/floatlabel";
import { InputNumber } from "primereact/inputnumber";

export const Form = ({
  error,
  handleInput,
  handleSubmit,
  formData,
  entry,
  onClose,
}) => (
  <Dialog
    visible
    onHide={onClose}
    header={entry ? "Súly szerkesztése" : "Új súly bejegyzés"}
    modal
  >
    <div className="flex flex-col gap-6">
      <FloatLabel className="mt-6">
        <InputNumber
          id="weight"
          name="weight"
          value={formData.weight}
          onValueChange={handleInput}
          className="w-full"
        />
        <label htmlFor="weight">Súly (kg)</label>
      </FloatLabel>

      <Calendar
        name="date"
        value={formData.date}
        onChange={handleInput}
        showIcon
      />

      {error && <span className="error-message">{error}</span>}
      <div className="flex justify-end gap-2">
        <Button
          label="Mégse"
          onClick={onClose}
          className="p-button-secondary"
        />
        <Button
          label={entry ? "Mentés" : "Hozzáadás"}
          onClick={handleSubmit}
          className="p-button-success"
        />
      </div>
    </div>
  </Dialog>
);
