import { useState } from "react";
import { useSelector } from "react-redux";

import { Carousel } from "@features";
import { UserData } from "@features";
import { ErrorMessage } from "@features";
import { EditUserForm } from "@features";
import { useGetMealsByUserIdQuery } from "@api";
import { useGetSleepByUserIdQuery } from "@api";
import { useGetWeightByUserIdQuery } from "@api";
import { useGetWorkoutByUserIdQuery } from "@api";
import { selectUserId } from "@/store/slices/authSlice";

export const Profile = () => {
  const [visible, setVisible] = useState(false);

  const userId = useSelector(selectUserId);
  const {
    data: sleepData,
    isLoading: isLoadingSleep,
    isError: isErrorSleep,
    error,
  } = useGetSleepByUserIdQuery(userId);
  const {
    data: weightData,
    isLoading: isLoadingWeight,
    isError: isErrorWeight,
  } = useGetWeightByUserIdQuery(userId);
  const {
    data: workoutData,
    isLoading: isLoadingWorkout,
    isError: isErrorWorkout,
  } = useGetWorkoutByUserIdQuery(userId);
  const {
    data: mealData,
    isLoading: isLoadingMeal,
    isError: isErrorMeal,
  } = useGetMealsByUserIdQuery(userId);

  return (
    <>
      {isErrorSleep || isErrorWeight || isErrorWorkout || isErrorMeal ? (
        <ErrorMessage message={error?.data.error} />
      ) : (
        <div className="profile-card">
          <UserData showEditForm={() => setVisible(true)} />

          {visible && <EditUserForm setVisible={setVisible} />}

          {isLoadingSleep ||
          isLoadingWeight ||
          isLoadingWorkout ||
          isLoadingMeal ? (
            <p>Adatok betöltése</p>
          ) : (
            <Carousel
              sleepData={sleepData}
              weightData={weightData}
              workoutData={workoutData}
              mealData={mealData}
            />
          )}
        </div>
      )}
    </>
  );
};
