/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

import {
  useCreateSleepMutation,
  useUpdateSleepMutation,
} from "../../../state/endpoints/sleepEndpoints";

import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";

const qualityOptions = [
  { label: "Rossz", value: "poor" },
  { label: "Átlagos", value: "average" },
  { label: "Jó", value: "good" },
  { label: "Kiváló", value: "excellent" },
];

export const SleepForm = ({ entry, onClose }) => {
  const [createSleep] = useCreateSleepMutation();
  const [updateSleep] = useUpdateSleepMutation();
  const [formData, setFormData] = useState({
    date: "",
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
    const { name, value } = e.target || e;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    if (entry) {
      await updateSleep({ id: entry.id, data: formData });
    } else {
      await createSleep(formData);
    }
    onClose();
  };

  return (
    <Dialog
      visible
      onHide={onClose}
      header={entry ? "Alvás szerkesztése" : "Új alvás bejegyzés"}
      modal
      className="w-[400px]"
    >
      <div className="flex flex-col gap-4">
        <Calendar
          name="date"
          value={formData.date}
          onChange={handleInput}
          showIcon
          className="w-full"
        />
        <InputNumber
          name="durationHour"
          value={formData.durationHour}
          onValueChange={handleInput}
          className="w-full"
          placeholder="Alvás hossza (óra)"
        />
        <Dropdown
          value={formData.quality}
          options={qualityOptions}
          onChange={handleInput}
          name="quality"
          className="w-full"
          placeholder="Alvás minősége"
        />

        <div className="flex justify-end gap-2">
          <Button
            label="Mégse"
            onClick={onClose}
            className="p-button-secondary"
          />
          <Button
            label={entry ? "Frissítés" : "Hozzáadás"}
            onClick={handleSubmit}
            className="p-button-success"
          />
        </div>
      </div>
    </Dialog>
  );
};
