/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Calendar } from "primereact/calendar";
import { FloatLabel } from "primereact/floatlabel";
import { InputNumber } from "primereact/inputnumber";

import {
  useUpdateWeightByIdMutation,
  useCreateWeightWithUserIdMutation,
} from "../../../state/endpoints/weightEndpoints";
import { ErrorMessage } from "../../helper/ErrorMessage";

export const WeightForm = ({ userId, entry, onClose }) => {
  const [error, setError] = useState(null);
  const [updateWeight] = useUpdateWeightByIdMutation();
  const [createWeight] = useCreateWeightWithUserIdMutation();
  const [formData, setFormData] = useState({
    date: new Date(),
    weight: "",
  });

  useEffect(() => {
    if (entry) {
      setFormData({
        weight: entry.weight,
        date: new Date(entry.date),
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
      result = await updateWeight({ weightId: entry.id, data: formData });
    } else {
      result = await createWeight({ userId, data: formData });
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
      header={entry ? "Súly szerkesztése" : "Új súly bejegyzés"}
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
