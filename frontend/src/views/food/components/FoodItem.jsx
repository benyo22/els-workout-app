/* eslint-disable react/prop-types */

export const FoodItem = ({ food, onSelect }) => (
  <div
    className="flex items-center border-t border-b p-1 border-solid border-primary-grey hover:bg-gray-200 hover:cursor-pointer dark:hover:bg-gray-700 active:bg-gray-300 dark:active:bg-gray-700"
    onClick={onSelect}
  >
    <div className="flex flex-col gap-1">
      <span className="font-bold text-black dark:text-primary-white">
        {food.name}
      </span>
      <div className="flex flex-col align-items-center gap-2">
        <span className="text-gray-500 dark:text-gray-400">
          Szénhidrát: {food.carbsPer100g}g - Protein: {food.proteinPer100g}g -
          Zsír: {food.fatsPer100g}g
        </span>
        <span className="text-gray-500 dark:text-gray-400">
          Kalória: {food.caloriesPer100g}g - 100g-ban
        </span>
      </div>
    </div>
  </div>
);
