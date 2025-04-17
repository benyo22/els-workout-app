/* eslint-disable react/prop-types */
import { useState } from "react";

import { Button } from "primereact/button";
import { FaRegCircleXmark } from "react-icons/fa6";

import { mealLabels } from "@/utils/data";
import { FoodList } from "@/views/food/FoodList";
import { ErrorMessage } from "@/views/helper/ErrorMessage";
import { EditFood } from "@/views/food/components/EditFood";
import { useGetAllFoodInMealQuery } from "@/api/endpoints/foodEndpoints";
import { useDeleteMealByIdMutation } from "@/api/endpoints/mealEndpoints";

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

  const calcNutrients = (food) => {
    const calories = Math.floor(
      food.caloriesPer100g * (food.MealFood.quantityInGrams / 100)
    );
    const protein = Math.floor(
      food.proteinPer100g * (food.MealFood.quantityInGrams / 100)
    );
    const carbs = Math.floor(
      food.carbsPer100g * (food.MealFood.quantityInGrams / 100)
    );
    const fats = Math.floor(
      food.fatsPer100g * (food.MealFood.quantityInGrams / 100)
    );
    return { calories, protein, carbs, fats };
  };
  return (
    <>
      {showFoodList && (
        <FoodList mealId={meal.id} setShowFoodList={setShowFoodList} />
      )}

      {showEditFood && (
        <EditFood
          foodId={foodId}
          mealId={meal.id}
          setShowEditFood={setShowEditFood}
        />
      )}

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
          {foodInMeal?.map((food) => {
            const { calories, protein, carbs, fats } = calcNutrients(food);
            return (
              <li
                key={food.id}
                className="flex justify-between items-center px-4 py-1 border rounded-lg my-4 hover:bg-gray-200 active:bg-gray-200 dark:hover:bg-dark-light dark:active:bg-dark-light cursor-pointer transition-all duration-200"
                onClick={() => {
                  setFoodId(food.id);
                  setShowEditFood(true);
                }}
              >
                {/* Quantity */}
                <span className="text-xl font-medium text-gray-700 dark:text-primary-white">
                  {food.MealFood.quantityInGrams} g
                </span>

                {/* Food Name */}
                <span className="text-xl font-semibold text-gray-800 dark:text-primary-white">
                  {food.name}
                </span>

                {/* Nutrients */}
                <div className="flex items-center space-x-4 text-gray-600 dark:text-primary-white">
                  {/* Calories */}
                  <span className="font-medium text-xl text-orange-500">
                    {calories} kcal
                  </span>

                  <div className="flex flex-col">
                    {/* Protein */}
                    <span className="font-medium text-secondary-green dark:text-dark-secondary-green">
                      {protein}g F
                    </span>

                    {/* Carbs */}
                    <span className="font-medium text-yellow-500">
                      {carbs}g SZ
                    </span>

                    {/* Fats */}
                    <span className="font-medium text-primary-blue dark:text-dark-primary-blue">
                      {fats}g ZS
                    </span>
                  </div>
                </div>
              </li>
            );
          })}
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
