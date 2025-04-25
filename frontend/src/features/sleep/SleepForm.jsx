/* eslint-disable react/prop-types */
import {
  useCreateSleepWithUserIdMutation,
  useDeleteSleepByIdMutation,
  useUpdateSleepByIdMutation,
} from "@api/endpoints/sleepEndpoints";
import { sleepQualityOptions } from "@data/data";
import { ErrorMessage } from "@features/errormessage/ErrorMessage";
import { format } from "date-fns";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { confirmDialog } from "primereact/confirmdialog";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { FloatLabel } from "primereact/floatlabel";
import { InputNumber } from "primereact/inputnumber";
import { useEffect, useState } from "react";

export const SleepForm = ({ userId, selectedSleep, onClose }) => {
  const [error, setError] = useState(null);
  const [updateSleep] = useUpdateSleepByIdMutation();
  const [deleteSleep] = useDeleteSleepByIdMutation();
  const [createSleep] = useCreateSleepWithUserIdMutation();
  const [formData, setFormData] = useState({
    date: new Date(),
    durationSec: 0,
    quality: "",
  });

  useEffect(() => {
    if (selectedSleep) {
      setFormData({
        date: new Date(selectedSleep.date),
        durationSec: selectedSleep.durationSec,
        quality: selectedSleep.quality,
      });
    }
  }, [selectedSleep]);

  const handleTimeChange = (value, type) => {
    const hours =
      type === "h" ? value : Math.floor(formData.durationSec / 3600);
    const minutes =
      type === "m" ? value : Math.floor((formData.durationSec % 3600) / 60);

    const totalSeconds = hours * 3600 + minutes * 60;
    setFormData((prev) => ({ ...prev, durationSec: totalSeconds }));
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const formattedDate = format(formData.date, "yyyy-MM-dd");
    let result = null;
    if (selectedSleep) {
      result = await updateSleep({
        sleepId: selectedSleep.id,
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

  const handleDelete = (id) => {
    confirmDialog({
      message: "Biztosan törölni szeretnéd ezt az alvási adatot?",
      header: "Megerősítés",
      acceptLabel: "Igen",
      acceptClassName: "p-button-danger",
      rejectLabel: "Nem",
      accept: async () => await deleteSleep(id),
    });
  };

  const hours = Math.floor(formData.durationSec / 3600);
  const minutes = Math.floor((formData.durationSec % 3600) / 60);

  return (
    <Dialog
      visible
      onHide={onClose}
      header={selectedSleep ? "Alvás szerkesztése" : "Új alvás bejegyzés"}
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
            onValueChange={(e) => handleTimeChange(e.value, "h")}
            className="w-full"
            min={0}
            max={99}
          />
          <label htmlFor="durationSec" className="font-bold">
            Alvás hossza (óra)
          </label>
        </FloatLabel>

        <FloatLabel>
          <InputNumber
            id="minutes"
            name="minutes"
            value={minutes}
            onValueChange={(e) => handleTimeChange(e.value, "m")}
            className="w-full"
            min={0}
            max={59}
          />
          <label htmlFor="durationSec" className="font-bold">
            Alvás hossza (perc)
          </label>
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
          {selectedSleep && (
            <Button
              label="Törlés"
              onClick={() => {
                handleDelete(selectedSleep.id);
                onClose();
              }}
              className="red-button px-2"
              unstyled
            />
          )}
          <Button
            label={selectedSleep ? "Mentés" : "Rögzítés"}
            onClick={handleSubmit}
            className="green-button"
            unstyled
          />
        </div>
      </div>
    </Dialog>
  );
};
