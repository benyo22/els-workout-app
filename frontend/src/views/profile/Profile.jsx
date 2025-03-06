import { useState } from "react";
import { useSelector } from "react-redux";

import { Carousel } from "./components/Carousel";
import { UserData } from "./components/UserData";
import { EditUser } from "./components/EditUserForm";

import { selectUserId } from "../../state/slices/authSlice";
import { useGetSleepByUserIdQuery } from "../../state/endpoints/sleepEndpoints";

export const Profile = () => {
  const [visible, setVisible] = useState(false);

  const userId = useSelector(selectUserId);
  const { data: sleepData, isLoading } = useGetSleepByUserIdQuery(userId);

  return (
    <div className="w-full max-w-sm md:max-w-md shadow-lg rounded-xl p-6 border border-primary-grey">
      <UserData showEditForm={() => setVisible(true)} />
      <EditUser visible={visible} setVisible={setVisible} />
      {isLoading ? <p>Adatok betöltése</p> : <Carousel sleepData={sleepData} />}
    </div>
  );
};
