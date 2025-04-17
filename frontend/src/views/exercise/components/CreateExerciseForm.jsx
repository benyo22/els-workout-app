/* eslint-disable react/prop-types */
import { useState } from "react";

import { FaXmark } from "react-icons/fa6";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";

import { ErrorMessage } from "@/views/helper/ErrorMessage";
import { bodyPartLabels, categoryLabels } from "@/utils/data";
import { useCreateExcerciseMutation } from "@/api/endpoints/exerciseEndpoints";

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
          <header className="flex justify-between">
            <span className="text-primary-blue mt-2 ml-2 dark:text-dark-primary-blue">
              Új Gyakorlat
            </span>

            <Button
              onClick={() => {
                setVisible(false);
                resetForm();
              }}
              className="text-md text-[#6B7381] hover:bg-[#F2F4F7] rounded-full p-2 mt-2 mr-2 hover:cursor-pointer dark:hover:bg-[#242F3D] dark:text-[#9498A0]"
              unstyled
            >
              <FaXmark />
            </Button>
          </header>
        }
        modal
        visible
        draggable={false}
        closable={false}
        closeOnEscape={false}
        className="flex flex-col gap-y-4 bg-primary-white dark:bg-dark-medium shadow-lg border-1 border-primary-grey rounded-lg max-w-full w-full md:max-w-md 2xl:h-[700px] p-4"
        unstyled
      >
        <div className="flex flex-col">
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
            <label htmlFor="name">Gyakorlat neve</label>
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
