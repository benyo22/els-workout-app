/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

import {
  useUpdateWeightByIdMutation,
  useCreateWeightWithUserIdMutation,
} from "../../../state/endpoints/weightEndpoints";

import { Form } from "./Form";

export const WeightForm = ({ entry, onClose, userId }) => {
  const [error, setError] = useState(null);
  const [updateWeight] = useUpdateWeightByIdMutation();
  const [createWeight] = useCreateWeightWithUserIdMutation();
  const [formData, setFormData] = useState({
    weight: "",
    date: "",
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
    setError(null);
    if (!formData.weight || !formData.date) {
      setError("Minden mezőt ki kell tölteni!");
      return;
    }

    if (entry) {
      await updateWeight({ id: entry.id, data: formData });
    } else {
      await createWeight({ userId, data: formData });
    }
    onClose();
  };

  return (
    <Form
      error={error}
      handleInput={handleInput}
      handleSubmit={handleSubmit}
      formData={formData}
      entry={entry}
      onClose={onClose}
    />
  );
};
