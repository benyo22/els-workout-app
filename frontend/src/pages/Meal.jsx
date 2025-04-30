import { CreateMeal } from "@/features/meal/CreateMeal";
import { useGetMealsByUserIdAndDateQuery } from "@api/endpoints/mealEndpoints";
import { ErrorMessage } from "@features/errormessage/ErrorMessage";
import { MacroSummary } from "@features/meal/MacroSummary";
import { MealCard } from "@features/meal/MealCard";
import { selectUserId } from "@store/slices/authSlice";
import { format } from "date-fns";
import { Calendar } from "primereact/calendar";
import { useState } from "react";
import { useSelector } from "react-redux";

export const Meal = () => {
  const userId = useSelector(selectUserId);
  const [date, setDate] = useState(new Date());
  const formattedDate = format(date, "yyyy-MM-dd");
  const {
    data: meals,
    isLoading,
    isError,
    error,
  } = useGetMealsByUserIdAndDateQuery({
    userId,
    date: formattedDate,
  });

  return (
    <>
      {isError ? (
        <ErrorMessage message={error.data.error} />
      ) : (
        <div className="flex flex-col dark:border-1 dark:border-primary-grey rounded-lg p-2">
          <div className="h-[500px] 3xl:h-[700px] shadow-md rounded-lg p-4">
            <h1 className="text-2xl font-bold mb-4 mt-4 md:mt-0">Étkezés</h1>

            <div className="mb-4">
              <label className="mr-2 font-semibold">Dátum:</label>
              <Calendar
                name="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                showIcon
              />
            </div>

            <CreateMeal userId={userId} formattedDate={formattedDate} />

            {isLoading ? (
              <p>Adatok betöltése...</p>
            ) : (
              <div className="space-y-4 h-[200px] sm:h-[250px] md:h-[300px] 3xl:h-[500px] overflow-auto">
                {meals?.map((meal) => (
                  <MealCard key={meal.id} meal={meal} />
                ))}
              </div>
            )}
          </div>

          <MacroSummary userId={userId} date={formattedDate} />
        </div>
      )}
    </>
  );
};
