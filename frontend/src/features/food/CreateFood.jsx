/* eslint-disable react/prop-types */
import { useCreateFoodMutation } from "@api/endpoints/foodEndpoints";
import { ErrorMessage } from "@features/errormessage/ErrorMessage";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { FloatLabel } from "primereact/floatlabel";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { useState } from "react";

export const CreateFood = ({ setShowCreateFood }) => {
  const [createFood] = useCreateFoodMutation();
  const [errors, setErrors] = useState(null);
  const [foodData, setFoodData] = useState({
    name: "",
    caloriesPer100g: 0,
    proteinPer100g: 0,
    carbsPer100g: 0,
    fatsPer100g: 0,
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
      caloriesPer100g: 0,
      proteinPer100g: 0,
      carbsPer100g: 0,
      fatsPer100g: 0,
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
          <span className="text-primary-blue dark:text-dark-primary-blue">
            Új Étel
          </span>
        }
        modal
        visible
        draggable={false}
        onHide={() => setShowCreateFood(false)}
      >
        <div className="flex flex-col gap-y-8">
          {/* Food name */}
          <FloatLabel className="mt-6">
            <InputText
              id="name"
              name="name"
              value={name}
              onInput={handleInput}
              className="w-full"
            />
            <label htmlFor="name" className="font-bold">
              Étel neve
            </label>
          </FloatLabel>

          {/* Calories/100g */}
          <FloatLabel>
            <InputNumber
              id="caloriesPer100g"
              name="caloriesPer100g"
              value={caloriesPer100g}
              onValueChange={handleInput}
              className="w-full"
              min={0}
              max={10000}
            />
            <label htmlFor="caloriesPer100g" className="font-bold">
              Kalória 100g-ban
            </label>
          </FloatLabel>

          {/* Protein/100g */}
          <FloatLabel>
            <InputNumber
              id="proteinPer100g"
              name="proteinPer100g"
              value={proteinPer100g}
              onValueChange={handleInput}
              className="w-full"
              min={0}
              max={10000}
            />
            <label htmlFor="proteinPer100g" className="font-bold">
              Protein 100g-ban
            </label>
          </FloatLabel>

          {/* Carbs/100g */}
          <FloatLabel>
            <InputNumber
              id="carbsPer100g"
              name="carbsPer100g"
              value={carbsPer100g}
              onValueChange={handleInput}
              className="w-full"
              min={0}
              max={10000}
            />
            <label htmlFor="carbsPer100g" className="font-bold">
              Szénhidrát 100g-ban
            </label>
          </FloatLabel>

          {/* Fats/100g */}
          <FloatLabel>
            <InputNumber
              id="fatsPer100g"
              name="fatsPer100g"
              value={fatsPer100g}
              onValueChange={handleInput}
              className="w-full"
              min={0}
              max={10000}
            />
            <label htmlFor="fatsPer100g" className="font-bold">
              Zsír 100g-ban
            </label>
          </FloatLabel>

          {errors && <ErrorMessage message={errors} />}

          <Button
            label="Étel létrehozása"
            className="blue-button"
            onClick={handleCreateExercise}
            unstyled
          />
        </div>
      </Dialog>
    </>
  );
};
