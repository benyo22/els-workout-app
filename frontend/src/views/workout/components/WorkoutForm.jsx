/* eslint-disable react/prop-types */
import { useState } from "react";

import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Calendar } from "primereact/calendar";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";

import { useCreateWorkoutWithUserIdMutation } from "../../../state/endpoints/workoutEndpoints";

export const WorkoutForm = ({ onClose, userId }) => {
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    date: "",
  });
  const [createWorkout] = useCreateWorkoutWithUserIdMutation();

  const handleInput = (e) => {
    const { name, value } = e.target;

    if (name === "name") {
      if (value.length <= 30) setFormData({ ...formData, [name]: value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async () => {
    setError(null);
    if (!formData.name || !formData.date) {
      setError("Minden mezőt ki kell tölteni!");
      return;
    }

    if (formData.name.length > 30) {
      setError("Az edzés neve maximum 30 hosszú");
    }

    await createWorkout({ userId, data: formData });
    onClose();
  };

  return (
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
};
