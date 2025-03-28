/* eslint-disable react/prop-types */
import { useState } from "react";
import { useSelector } from "react-redux";

import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";

import { ErrorMessage } from "../../helper/ErrorMessage";
import { selectUserId } from "../../../state/slices/authSlice";
import { useCreateWorkoutWithUserIdMutation } from "../../../state/endpoints/workoutEndpoints";

export const CreateWorkoutForm = ({ onClose }) => {
  const userId = useSelector(selectUserId);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    date: new Date(),
  });
  const [createWorkout] = useCreateWorkoutWithUserIdMutation();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    const result = await createWorkout({ userId, data: formData });

    if (result.error?.data.error) {
      setError(result.error.data.error);
      return;
    }
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
            className="input"
            unstyled
          />
          <label htmlFor="name">Név</label>
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
            label="Létrehozás"
            onClick={handleSubmit}
            className="green-button"
            unstyled
          />
        </div>
      </div>
    </Dialog>
  );
};
