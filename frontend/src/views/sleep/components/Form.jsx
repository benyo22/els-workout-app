/* eslint-disable react/prop-types */
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { FloatLabel } from "primereact/floatlabel";
import { InputNumber } from "primereact/inputnumber";

import { sleepQualityOptions } from "../../../utils/data";

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
    header={entry ? "Alvás szerkesztése" : "Új alvás bejegyzés"}
    modal
  >
    <div className="flex flex-col gap-6">
      <Calendar
        name="date"
        value={formData.date}
        onChange={handleInput}
        showIcon
      />

      <FloatLabel>
        <InputNumber
          id="durationHour"
          name="durationHour"
          value={formData.durationHour}
          onValueChange={handleInput}
          className="w-full"
        />
        <label htmlFor="durationHour">Alvás hossza (óra)</label>
      </FloatLabel>

      <Dropdown
        name="quality"
        value={formData.quality}
        options={sleepQualityOptions}
        onChange={handleInput}
        placeholder="Alvás minősége"
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
