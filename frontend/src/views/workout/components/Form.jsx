/* eslint-disable react/prop-types */
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Calendar } from "primereact/calendar";
import { FloatLabel } from "primereact/floatlabel";

import { InputText } from "primereact/inputtext";

export const Form = ({
  error,
  handleInput,
  handleSubmit,
  formData,
  onClose,
}) => (
  <Dialog visible onHide={onClose} header="Új edzés" modal>
    <div className="flex flex-col gap-6">
      <Calendar
        name="date"
        value={formData.date}
        onChange={handleInput}
        showIcon
      />

      <FloatLabel>
        <InputText
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInput}
          className="w-full"
        />
        <label htmlFor="name">Név</label>
      </FloatLabel>

      {error && <span className="error-message">{error}</span>}
      <div className="flex justify-end gap-2">
        <Button
          label="Mégse"
          onClick={onClose}
          className="p-button-secondary"
        />
        <Button
          label="Létrehozás"
          onClick={handleSubmit}
          className="p-button-success"
        />
      </div>
    </div>
  </Dialog>
);
