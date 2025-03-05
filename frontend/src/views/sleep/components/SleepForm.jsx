/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

import {
  useCreateSleepMutation,
  useUpdateSleepMutation,
} from "../../../state/endpoints/sleepEndpoints";

import { Form } from "./Form";

export const SleepForm = ({ entry, onClose }) => {
  const [error, setError] = useState(null);
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
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    setError(null);
    if (!formData.date || !formData.durationHour || !formData.quality) {
      setError("Minden mezőt ki kell tölteni!");
      return;
    }

    if (entry) {
      await updateSleep({ id: entry.id, data: formData });
    } else {
      await createSleep(formData);
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
