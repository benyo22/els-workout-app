/* eslint-disable react/prop-types */
import { useState } from "react";

import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

import { ErrorMessage } from "@/views/helper/ErrorMessage";
import { useAddFoodToMealMutation } from "@/api/endpoints/foodEndpoints";

export const AddFood = ({
  foodId,
  mealId,
  setShowAddFood,
  setShowFoodList,
}) => {
  const [error, setError] = useState(null);
  const [quantityInGrams, setQuantityInGrams] = useState(0);
  const [addFoodToMeal] = useAddFoodToMealMutation();

  const handleAddFood = async () => {
    setError(null);
    const result = await addFoodToMeal({ foodId, mealId, quantityInGrams });
    if (result.error?.data.error) {
      setError(result.error.data.error);
      return;
    }
    setShowAddFood(false);
    setShowFoodList(false);
  };

  return (
    <Dialog
      header="Mennyiség megadása"
      modal
      visible
      draggable={false}
      closeOnEscape={false}
      onHide={() => setShowAddFood(false)}
    >
      <div className="flex flex-col gap-y-4">
        <div className="flex flex-col gap-0.5">
          <label>Mennyiség (g)</label>
          <input
            type="number"
            id="quantityInGrams"
            name="quantityInGrams"
            value={quantityInGrams}
            onInput={(e) => setQuantityInGrams(e.target.value)}
            className="input"
          />
        </div>

        {error && <ErrorMessage message={error} />}

        <Button
          label="Hozzáad"
          className="blue-button px-4"
          onClick={handleAddFood}
          unstyled
        />
      </div>
    </Dialog>
  );
};
