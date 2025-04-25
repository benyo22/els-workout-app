/* eslint-disable react/prop-types */
import { useCreateExcerciseMutation } from "@api/endpoints/exerciseEndpoints";
import { bodyPartLabels, categoryLabels } from "@data/data";
import { ErrorMessage } from "@features/errormessage/ErrorMessage";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { useState } from "react";

export const CreateExerciseForm = ({ setVisible }) => {
  const [createExcercise] = useCreateExcerciseMutation();
  const [errors, setErrors] = useState("");
  const [newExerciseData, setNewExerciseData] = useState({
    name: "",
    bodyPart: "",
    category: "",
  });
  const { name } = newExerciseData;

  const handleInput = (e) => {
    const { name, value } = e.target;
    setNewExerciseData({
      ...newExerciseData,
      [name]: value,
    });
  };

  const resetForm = () => {
    setNewExerciseData({ name: "", bodyPart: "", category: "" });
    setErrors("");
  };

  const handleCreateExercise = async () => {
    const result = await createExcercise(newExerciseData);

    if (result.error?.data.error) {
      setErrors(result.error.data.error);
      return;
    }

    setVisible(false);
    resetForm();
  };

  return (
    <>
      <Dialog
        header={
          <span className="text-primary-blue dark:text-dark-primary-blue">
            Új Gyakorlat
          </span>
        }
        modal
        visible
        draggable={false}
        onHide={() => setVisible(false)}
      >
        <div className="flex flex-col mt-6">
          {/* Exercise name */}
          <FloatLabel>
            <InputText
              id="name"
              name="name"
              value={name}
              onInput={handleInput}
              className="input"
              unstyled
            />
            <label htmlFor="name" className="font-bold">
              Gyakorlat neve
            </label>
          </FloatLabel>

          {/* Dropdowns */}
          <div className="flex gap-x-4 text-xs md:text-base mt-4">
            <select name="bodyPart" className="select" onChange={handleInput}>
              <option value="-1">Testrész kiválasztása:</option>
              {Object.entries(bodyPartLabels).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </select>

            <select name="category" className="select" onChange={handleInput}>
              <option value="-1">Kategória kiválasztása:</option>
              {Object.entries(categoryLabels).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </select>
          </div>

          {errors && <ErrorMessage message={errors} />}

          <Button
            label="Gyakorlat létrehozása"
            className="blue-button mt-4"
            onClick={handleCreateExercise}
            unstyled
          />
        </div>
      </Dialog>
    </>
  );
};
