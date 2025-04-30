/* eslint-disable react/prop-types */
import { useGetAllFoodInMealQuery } from "@api/endpoints/foodEndpoints";
import { useDeleteMealByIdMutation } from "@api/endpoints/mealEndpoints";
import { mealLabels } from "@data/data";
import { ErrorMessage } from "@features/errormessage/ErrorMessage";
import { Food } from "@features/food/Food";
import { FoodItemInMeal } from "@features/food/FoodItemInMeal";
import { Button } from "primereact/button";
import { useState } from "react";
import { FaRegCircleXmark } from "react-icons/fa6";

export const MealCard = ({ meal }) => {
  const [error, setError] = useState(null);
  const [foodId, setFoodId] = useState(-1);
  const [showFoodList, setShowFoodList] = useState(false);
  const [showEditFood, setShowEditFood] = useState(false);

  const { data: foodInMeal } = useGetAllFoodInMealQuery(meal.id);
  const [deleteMeal] = useDeleteMealByIdMutation();

  const handleDelete = async () => {
    setError(null);
    const result = await deleteMeal(meal.id);
    if (result.error?.data.error) {
      setError(result.error.data.error);
      return;
    }
  };

  return (
    <>
      <Food
        showFoodList={showFoodList}
        setShowFoodList={setShowFoodList}
        showEditFood={showEditFood}
        setShowEditFood={setShowEditFood}
        mealId={meal.id}
        foodId={foodId}
      />

      <div className="p-4 bg-primary-white rounded-lg shadow dark:bg-dark-dark">
        <div className="flex justify-between">
          <h2 className="text-xl font-semibold mb-2">
            {mealLabels[meal.type]}
          </h2>

          {error && <ErrorMessage message={error} />}

          <Button
            icon={<FaRegCircleXmark size={25} />}
            className="text-primary-red hover:text-secondary-red active:text-secondary-red hover:scale-101 cursor-pointer"
            onClick={handleDelete}
            unstyled
          />
        </div>

        <ul className="mb-2">
          {foodInMeal?.map((food) => (
            <FoodItemInMeal
              key={food.id}
              food={food}
              setFoodId={setFoodId}
              setShowEditFood={setShowEditFood}
            />
          ))}
        </ul>
        <Button
          label="+ Étel hozzáadása"
          className="blue-button px-4"
          onClick={() => setShowFoodList(true)}
          unstyled
        />
      </div>
    </>
  );
};
