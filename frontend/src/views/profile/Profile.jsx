import { useState } from "react";
import { useSelector } from "react-redux";

import { Carousel } from "./components/Carousel";
import { UserData } from "./components/UserData";
import { EditUserForm } from "./components/EditUserForm";

import { selectUserId } from "../../state/slices/authSlice";
import { useGetSleepByUserIdQuery } from "../../state/endpoints/sleepEndpoints";
import { useGetWeightByUserIdQuery } from "../../state/endpoints/weightEndpoints";
import { useGetWorkoutByUserIdQuery } from "../../state/endpoints/workoutEndpoints";

export const Profile = () => {
  const [visible, setVisible] = useState(false);

  const userId = useSelector(selectUserId);
  const { data: sleepData, isLoading: isLoadingSleep } =
    useGetSleepByUserIdQuery(userId);
  const { data: weightData, isLoading: isLoadingWeight } =
    useGetWeightByUserIdQuery(userId);
  const { data: workoutData, isLoading: isLoadingWorkout } =
    useGetWorkoutByUserIdQuery(userId);

  return (
    <div className="profile-card">
      <UserData showEditForm={() => setVisible(true)} />
      <EditUserForm visible={visible} setVisible={setVisible} />
      {isLoadingSleep || isLoadingWeight || isLoadingWorkout ? (
        <p>Adatok betöltése</p>
      ) : (
        <Carousel
          sleepData={sleepData}
          weightData={weightData}
          workoutData={workoutData}
        />
      )}
    </div>
  );
};
