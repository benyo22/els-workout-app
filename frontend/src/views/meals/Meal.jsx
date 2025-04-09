import { useState } from "react";
import { useSelector } from "react-redux";

import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";

import { format } from "date-fns";
import {
  useGetMealsByUserIdAndDateQuery,
  useCreateMealWithUserIdMutation,
} from "../../state/endpoints/mealEndpoints";
import { MealCard } from "./components/MealCard";
import { ErrorMessage } from "../helper/ErrorMessage";
import { MacroSummary } from "./components/MacroSummary";
import { mealLabels, mealTypes } from "../../utils/data";
import { selectUserId } from "../../state/slices/authSlice";

export const Meal = () => {
  const userId = useSelector(selectUserId);
  const [error, setError] = useState(null);
  const [date, setDate] = useState(new Date());
  const formattedDate = format(date, "yyyy-MM-dd");
  const { data: meals, isLoading } = useGetMealsByUserIdAndDateQuery({
    userId,
    date: formattedDate,
  });
  const [createMeal] = useCreateMealWithUserIdMutation();

  const handleCreateMeal = async (type) => {
    setError(null);
    const result = await createMeal({
      userId,
      data: { type, date: formattedDate },
    });

    if (result.error?.data.error) {
      setError(result.error.data.error);
      return;
    }
  };

  return (
    <div className="flex flex-col dark:border-1 dark:border-primary-grey rounded-lg p-2">
      <div className="h-[450px] 2xl:h-[700px] shadow-md rounded-lg p-4">
        <h1 className="text-2xl font-bold mb-4">Étkezés</h1>

        <div className="mb-4">
          <label className="mr-2 font-semibold">Dátum:</label>
          <Calendar
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            showIcon
          />
        </div>

        <div className="grid grid-cols-2 gap-4 md:flex md:flex-wrap md:gap-4 mb-4">
          {mealTypes.map((type) => (
            <Button
              key={type}
              label={`+ ${mealLabels[type]}`}
              onClick={() => handleCreateMeal(type)}
              className="blue-button px-4"
              unstyled
            />
          ))}
        </div>

        {error && <ErrorMessage message={error} />}

        {isLoading ? (
          <p>Adatok betöltése...</p>
        ) : (
          <div className="space-y-4 h-[250px] 2xl:h-[500px] overflow-auto">
            {meals.map((meal) => (
              <MealCard key={meal.id} meal={meal} />
            ))}
          </div>
        )}
      </div>

      <MacroSummary userId={userId} date={formattedDate} />
    </div>
  );
};
