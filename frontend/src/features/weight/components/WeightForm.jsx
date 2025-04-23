/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

import { format } from "date-fns";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Calendar } from "primereact/calendar";
import { FloatLabel } from "primereact/floatlabel";
import { InputNumber } from "primereact/inputnumber";
import { confirmDialog } from "primereact/confirmdialog";

import {
  useUpdateWeightByIdMutation,
  useDeleteWeightByIdMutation,
  useCreateWeightWithUserIdMutation,
} from "@api";
import { ErrorMessage } from "@features";

export const WeightForm = ({ userId, selectedWeight, onClose }) => {
  const [error, setError] = useState(null);
  const [updateWeight] = useUpdateWeightByIdMutation();
  const [deleteWeight] = useDeleteWeightByIdMutation();
  const [createWeight] = useCreateWeightWithUserIdMutation();
  const [formData, setFormData] = useState({
    date: new Date(),
    weight: "",
  });

  useEffect(() => {
    if (selectedWeight) {
      setFormData({
        weight: selectedWeight.weight,
        date: new Date(selectedWeight.date),
      });
    }
  }, [selectedWeight]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    const formattedDate = format(formData.date, "yyyy-MM-dd");
    let result = null;
    if (selectedWeight) {
      result = await updateWeight({
        weightId: selectedWeight.id,
        data: { ...formData, date: formattedDate },
      });
    } else {
      result = await createWeight({
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
      message: "Biztosan törölni szeretnéd ezt a súly adatot?",
      header: "Megerősítés",
      acceptLabel: "Igen",
      acceptClassName: "p-button-danger",
      rejectLabel: "Nem",
      accept: async () => await deleteWeight(id),
    });
  };

  return (
    <Dialog
      visible
      onHide={onClose}
      header={selectedWeight ? "Súly szerkesztése" : "Új súly bejegyzés"}
      modal
    >
      <div className="flex flex-col gap-y-4">
        <Calendar
          name="date"
          value={formData.date}
          onChange={handleInput}
          showIcon
        />

        <FloatLabel className="mt-2">
          <InputNumber
            id="weight"
            name="weight"
            value={formData.weight}
            onValueChange={handleInput}
            className="w-full"
          />
          <label htmlFor="weight">Súly (kg)</label>
        </FloatLabel>

        {error && <ErrorMessage message={error} />}

        <div className="flex justify-end gap-2">
          <Button
            label="Mégse"
            onClick={onClose}
            className="gray-button"
            unstyled
          />
          {selectedWeight && (
            <Button
              label="Törlés"
              onClick={() => {
                handleDelete(selectedWeight.id);
                onClose();
              }}
              className="red-button px-2"
              unstyled
            />
          )}
          <Button
            label={selectedWeight ? "Mentés" : "Rögzítés"}
            onClick={handleSubmit}
            className="green-button"
            unstyled
          />
        </div>
      </div>
    </Dialog>
  );
};
