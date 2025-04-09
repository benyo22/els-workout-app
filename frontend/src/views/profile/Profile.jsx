import { useState } from "react";
import { useSelector } from "react-redux";

import { Carousel } from "./components/Carousel";
import { UserData } from "./components/UserData";
import { EditUserForm } from "./components/EditUserForm";

import { ErrorMessage } from "../helper/ErrorMessage";
import { selectUserId } from "../../state/slices/authSlice";
import { useGetSleepByUserIdQuery } from "../../state/endpoints/sleepEndpoints";
import { useGetWeightByUserIdQuery } from "../../state/endpoints/weightEndpoints";
import { useGetWorkoutByUserIdQuery } from "../../state/endpoints/workoutEndpoints";
import { useGetMealsByUserIdQuery } from "../../state/endpoints/mealEndpoints";

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
