/* eslint-disable react/prop-types */

import { useGetMacrosInMealsQuery } from "../../../state/endpoints/mealEndpoints";

export const MacroSummary = ({ userId, date }) => {
  const { data: macros, isLoading } = useGetMacrosInMealsQuery({
    userId,
    date,
  });

  return (
    <>
      {isLoading ? (
        <p>Adatok betöltése...</p>
      ) : (
        <div className="mt-6 p-4 bg-gray-100 rounded-2xl shadow text-center dark:bg-dark-light">
          <h3 className="text-lg font-semibold mb-2">
            Napi összesített értékek
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm font-medium">
            <div>Kalória: {macros.calories} kcal</div>
            <div>Fehérje: {macros.protein} g</div>
            <div>Szénhidrát: {macros.carbs} g</div>
            <div>Zsír: {macros.fats} g</div>
          </div>
        </div>
      )}
    </>
  );
};
