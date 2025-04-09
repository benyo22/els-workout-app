/* eslint-disable react/prop-types */
import { useState } from "react";

import { FaXmark } from "react-icons/fa6";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";

import { ErrorMessage } from "../../helper/ErrorMessage";
import { useCreateFoodMutation } from "../../../state/endpoints/foodEndpoints";

export const CreateFood = ({ setShowCreateFood }) => {
  const [createFood] = useCreateFoodMutation();
  const [errors, setErrors] = useState(null);
  const [foodData, setFoodData] = useState({
    name: "",
    caloriesPer100g: "",
    proteinPer100g: "",
    carbsPer100g: "",
    fatsPer100g: "",
  });
  const { name, caloriesPer100g, proteinPer100g, carbsPer100g, fatsPer100g } =
    foodData;

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFoodData({
      ...foodData,
      [name]: value,
    });
  };

  const resetForm = () => {
    setFoodData({
      name: "",
      caloriesPer100g: "",
      proteinPer100g: "",
      carbsPer100g: "",
      fatsPer100g: "",
    });
    setErrors(null);
  };

  const handleCreateExercise = async () => {
    const result = await createFood(foodData);

    if (result.error?.data.error) {
      setErrors(result.error.data.error);
      return;
    }

    setShowCreateFood(false);
    resetForm();
  };

  return (
    <>
      <Dialog
        header={
          <header className="flex justify-between">
            <span className="text-primary-blue mt-2 ml-2 dark:text-dark-primary-blue">
              Új Étel
            </span>

            <Button
              onClick={() => {
                setShowCreateFood(false);
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
          {/* Food name */}
          <label htmlFor="name">Étel neve</label>
          <InputText
            id="name"
            name="name"
            value={name}
            onInput={handleInput}
            className="input"
            unstyled
          />

          {/* Calories/100g */}
          <div className="flex flex-col gap-0.5">
            <label>Kalória 100g-ban</label>
            <input
              type="number"
              id="caloriesPer100g"
              name="caloriesPer100g"
              value={caloriesPer100g}
              onInput={handleInput}
              className="input"
            />
          </div>

          {/* Protein/100g */}
          <div className="flex flex-col gap-0.5">
            <label>Protein 100g-ban</label>
            <input
              type="number"
              id="proteinPer100g"
              name="proteinPer100g"
              value={proteinPer100g}
              onInput={handleInput}
              className="input"
            />
          </div>

          {/* Carbs/100g */}
          <div className="flex flex-col gap-0.5">
            <label>Szénhidrát 100g-ban</label>
            <input
              type="number"
              id="carbsPer100g"
              name="carbsPer100g"
              value={carbsPer100g}
              onInput={handleInput}
              className="input"
            />
          </div>

          {/* Fats/100g */}
          <div className="flex flex-col gap-0.5">
            <label>Zsír 100g-ban</label>
            <input
              type="number"
              id="fatsPer100g"
              name="fatsPer100g"
              value={fatsPer100g}
              onInput={handleInput}
              className="input"
            />
          </div>

          {errors && <ErrorMessage message={errors} />}

          <Button
            label="Étel létrehozása"
            className="blue-button mt-4"
            onClick={handleCreateExercise}
            unstyled
          />
        </div>
      </Dialog>
    </>
  );
};
