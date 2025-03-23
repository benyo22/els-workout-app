/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { FloatLabel } from "primereact/floatlabel";
import { InputNumber } from "primereact/inputnumber";

import {
  useCreateSleepWithUserIdMutation,
  useUpdateSleepByIdMutation,
} from "../../../state/endpoints/sleepEndpoints";
import { ErrorMessage } from "../../helper/ErrorMessage";
import { sleepQualityOptions } from "../../../utils/data";

export const SleepForm = ({ userId, entry, onClose }) => {
  const [error, setError] = useState(null);
  const [updateSleep] = useUpdateSleepByIdMutation();
  const [createSleep] = useCreateSleepWithUserIdMutation();
  const [formData, setFormData] = useState({
    date: new Date(),
    durationHour: "",
    quality: "",
  });

  useEffect(() => {
    if (entry) {
      setFormData({
        date: new Date(entry.date),
        durationHour: entry.durationHour,
        quality: entry.quality,
      });
    }
  }, [entry]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    let result = null;
    if (entry) {
      result = await updateSleep({ id: entry.id, data: formData });
    } else {
      result = await createSleep({ userId, data: formData });
    }

    if (result.error?.data.error) {
      setError(result.error.data.error);
      return;
    }

    onClose();
  };

  return (
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

        {error && <ErrorMessage message={error} />}

        <div className="flex justify-end gap-2">
          <Button
            label="Mégse"
            onClick={onClose}
            className="gray-button"
            unstyled
          />
          <Button
            label={entry ? "Mentés" : "Hozzáadás"}
            onClick={handleSubmit}
            className="green-button"
            unstyled
          />
        </div>
      </div>
    </Dialog>
  );
};
