/* eslint-disable react/prop-types */
import { useState } from "react";

import { Form } from "./Form";

import { useCreateWorkoutWithUserIdMutation } from "../../../state/endpoints/workoutEndpoints";

export const WorkoutForm = ({ onClose, userId }) => {
  const [error, setError] = useState(null);
  const [createWorkout] = useCreateWorkoutWithUserIdMutation();
  const [formData, setFormData] = useState({
    name: "",
    date: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    setError(null);
    if (!formData.name || !formData.date) {
      setError("Minden mezőt ki kell tölteni!");
      return;
    }

    await createWorkout({ id: userId, data: formData });
    onClose();
  };

  return (
    <Form
      error={error}
      handleInput={handleInput}
      handleSubmit={handleSubmit}
      formData={formData}
      onClose={onClose}
    />
  );
};
