/* eslint-disable react/prop-types */
import { useGetMealsByUserIdAndDateQuery } from "@api/endpoints/mealEndpoints";

export const MacroSummary = ({ userId, date }) => {
  const { data: meal, isLoading } = useGetMealsByUserIdAndDateQuery({
    userId,
    date,
  });

  return (
    <>
      {isLoading ? (
        <p>Adatok betöltése...</p>
      ) : (
        <div className="mt-15 md:mt-4 p-4 bg-gray-100 rounded-2xl shadow text-center dark:bg-dark-light">
          <h3 className="text-lg font-semibold mb-2">
            Napi összesített értékek
          </h3>
          <div className="grid grid-cols-2 md:flex md:justify-around gap-2 text-sm font-medium">
            <div>Kalória: {meal[0]?.calories || 0} kcal</div>
            <div>Fehérje: {meal[0]?.protein || 0} g</div>
            <div>Szénhidrát: {meal[0]?.carbs || 0} g</div>
            <div>Zsír: {meal[0]?.fats || 0} g</div>
          </div>
        </div>
      )}
    </>
  );
};
