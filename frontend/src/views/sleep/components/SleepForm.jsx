/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

import { format } from "date-fns";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { FloatLabel } from "primereact/floatlabel";
import { InputNumber } from "primereact/inputnumber";

import {
  useCreateSleepWithUserIdMutation,
  useUpdateSleepByIdMutation,
} from "@/api/endpoints/sleepEndpoints";
import { sleepQualityOptions } from "@/utils/data";
import { ErrorMessage } from "@/views/helper/ErrorMessage";

export const SleepForm = ({ userId, entry, onClose }) => {
  const [error, setError] = useState(null);
  const [updateSleep] = useUpdateSleepByIdMutation();
  const [createSleep] = useCreateSleepWithUserIdMutation();
  const [formData, setFormData] = useState({
    date: new Date(),
    durationSec: 0,
    quality: "",
  });

  useEffect(() => {
    if (entry) {
      setFormData({
        date: new Date(entry.date),
        durationSec: entry.durationSec,
        quality: entry.quality,
      });
    }
  }, [entry]);

  const handleTimeChange = (value, type) => {
    value = value || 0;
    const hours = Math.floor(formData.durationSec / 3600);
    const minutes = Math.floor((formData.durationSec % 3600) / 60);

    const newHours = type === "hh" ? Math.min(99, value) : hours;
    const newMinutes = type === "m" ? Math.min(59, value) : minutes;

    const totalSeconds = newHours * 3600 + newMinutes * 60;
    setFormData((prev) => ({ ...prev, durationSec: totalSeconds }));
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const formattedDate = format(formData.date, "yyyy-MM-dd");
    let result = null;
    if (entry) {
      result = await updateSleep({
        sleepId: entry.id,
        data: { ...formData, date: formattedDate },
      });
    } else {
      result = await createSleep({
        userId,
        data: { ...formData, date: formattedDate },
      });
    }

    if (result.error?.data.error) {
      setError(result.error.data.error);
      return;
    }

    onClose();
  };

  const hours = Math.floor(formData.durationSec / 3600);
  const minutes = Math.floor((formData.durationSec % 3600) / 60);

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
            id="hours"
            name="hours"
            value={hours}
            onValueChange={(e) => handleTimeChange(e.value, "hh")}
            className="w-full"
            min={0}
          />
          <label htmlFor="durationSec">Alvás hossza (óra)</label>
        </FloatLabel>

        <FloatLabel>
          <InputNumber
            id="minutes"
            name="minutes"
            value={minutes}
            onValueChange={(e) => handleTimeChange(e.value, "m")}
            className="w-full"
            min={0}
          />
          <label htmlFor="durationSec">Alvás hossza (perc)</label>
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
            label={entry ? "Mentés" : "Rögzítés"}
            onClick={handleSubmit}
            className="green-button"
            unstyled
          />
        </div>
      </div>
    </Dialog>
  );
};
