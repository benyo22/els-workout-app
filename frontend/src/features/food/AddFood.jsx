/* eslint-disable react/prop-types */
import { useAddFoodToMealMutation } from "@api/endpoints/foodEndpoints";
import { ErrorMessage } from "@features/errormessage/ErrorMessage";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { FloatLabel } from "primereact/floatlabel";
import { InputNumber } from "primereact/inputnumber";
import { useState } from "react";

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
      <div className="flex flex-col mt-6 gap-y-4">
        <FloatLabel>
          <InputNumber
            id="quantityInGrams"
            name="quantityInGrams"
            value={quantityInGrams}
            onValueChange={(e) => setQuantityInGrams(e.target.value)}
            className="w-full"
            min={0}
            max={5000}
          />
          <label htmlFor="quantityInGrams" className="font-bold">
            Mennyiség (g)
          </label>
        </FloatLabel>

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
