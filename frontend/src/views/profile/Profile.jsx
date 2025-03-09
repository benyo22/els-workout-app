import { useState } from "react";
import { useSelector } from "react-redux";

import { Carousel } from "./components/Carousel";
import { UserData } from "./components/UserData";
import { EditUserForm } from "./components/EditUserForm";

import { selectUserId } from "../../state/slices/authSlice";
import { useGetSleepByUserIdQuery } from "../../state/endpoints/sleepEndpoints";
import { useGetWeightByUserIdQuery } from "../../state/endpoints/weightEndpoints";

export const Profile = () => {
  const [visible, setVisible] = useState(false);

  const userId = useSelector(selectUserId);
  const { data: sleepData, isLoading: isLoadingSleep } =
    useGetSleepByUserIdQuery(userId);
  const { data: weightData, isLoading: isLoadingWeight } =
    useGetWeightByUserIdQuery(userId);

  return (
    <div className="w-full max-w-sm md:max-w-md shadow-lg rounded-xl p-6 border border-primary-grey">
      <UserData showEditForm={() => setVisible(true)} />
      <EditUserForm visible={visible} setVisible={setVisible} />
      {isLoadingSleep || isLoadingWeight ? (
        <p>Adatok betöltése</p>
      ) : (
        <Carousel sleepData={sleepData} weightData={weightData} />
      )}
    </div>
  );
};
