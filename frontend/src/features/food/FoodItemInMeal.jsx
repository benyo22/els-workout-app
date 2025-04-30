/* eslint-disable react/prop-types */
import { calcNutrients } from "@utils/calcNutrients";

export const FoodItemInMeal = ({ food, setFoodId, setShowEditFood }) => {
  const { calories, protein, carbs, fats } = calcNutrients(
    food,
    food.MealFood.quantityInGrams
  );

  return (
    <li
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
          <span className="font-medium text-yellow-500">{carbs}g SZ</span>

          {/* Fats */}
          <span className="font-medium text-primary-blue dark:text-dark-primary-blue">
            {fats}g ZS
          </span>
        </div>
      </div>
    </li>
  );
};
