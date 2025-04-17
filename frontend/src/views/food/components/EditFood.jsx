/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";

import {
  useGetFoodQuantityQuery,
  useEditFoodQuantityMutation,
  useRemoveFoodFromMealMutation,
} from "@/api/endpoints/foodEndpoints";
import { ErrorMessage } from "@/views/helper/ErrorMessage";

export const EditFood = ({ foodId, mealId, setShowEditFood }) => {
  const { data: food, isLoading } = useGetFoodQuantityQuery({ foodId, mealId });
  const [error, setError] = useState(null);
  const [quantityInGrams, setQuantityInGrams] = useState(0);

  const [editFoodQuantity] = useEditFoodQuantityMutation();
  const [removeFood] = useRemoveFoodFromMealMutation();

  useEffect(() => {
    if (!isLoading && food && food.length > 0) {
      setQuantityInGrams(food[0].quantityInGrams);
    }
  }, [food, isLoading]);

  const handleSaveFood = async () => {
    setError(null);
    const result = await editFoodQuantity({ foodId, mealId, quantityInGrams });
    if (result.error?.data.error) {
      setError(result.error.data.error);
      return;
    }
    setShowEditFood(false);
  };

  const handleRemoveFood = async () => {
    setError(null);
    const result = await removeFood({ foodId, mealId });
    if (result.error?.data.error) {
      setError(result.error.data.error);
      return;
    }
    setShowEditFood(false);
  };

  return (
    <Dialog
      header="Mennyiség szerkesztése"
      modal
      visible
      draggable={false}
      closeOnEscape={false}
      onHide={() => setShowEditFood(false)}
    >
      <div className="flex flex-col gap-y-4 mt-5">
        <FloatLabel>
          <InputText
            id="quantityInGrams"
            name="quantityInGrams"
            value={quantityInGrams}
            onInput={(e) => setQuantityInGrams(e.target.value)}
            className="input"
            unstyled
          />
          <label htmlFor="search">Mennyiség (g)</label>
        </FloatLabel>

        {error && <ErrorMessage message={error} />}

        <Button
          label="Mentés"
          className="blue-button px-4"
          onClick={handleSaveFood}
          unstyled
        />

        <Button
          label="Eltávolítás"
          className="red-button px-4"
          onClick={handleRemoveFood}
          unstyled
        />
      </div>
    </Dialog>
  );
};
