import { selectUserId } from "@/store/slices/authSlice";
import { useGetMealsByUserIdQuery } from "@api/endpoints/mealEndpoints";
import { useGetSleepByUserIdQuery } from "@api/endpoints/sleepEndpoints";
import { useGetWeightByUserIdQuery } from "@api/endpoints/weightEndpoints";
import { useGetWorkoutByUserIdQuery } from "@api/endpoints/workoutEndpoints";
import { ErrorMessage } from "@features/errormessage/ErrorMessage";
import { Carousel } from "@features/profile/Carousel";
import { EditUserForm } from "@features/profile/EditUserForm";
import { UserData } from "@features/profile/UserData";
import { useState } from "react";
import { useSelector } from "react-redux";

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
