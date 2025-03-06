/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";

import { Button } from "primereact/button";

import { selectUserId } from "../../../state/slices/authSlice";
import { useGetUserByUsernameQuery } from "../../../state/endpoints/userEndpoints";

export const UserData = ({ showEditForm }) => {
  const id = parseInt(useSelector(selectUserId));
  const { data: userInfo, isLoading } = useGetUserByUsernameQuery({
    id,
  });

  if (isLoading) return <div>Adatok betöltése...</div>;

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Profile picture (if) */}
      <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-2xl font-bold text-gray-600">
        {userInfo.username.charAt(0).toUpperCase()}
      </div>

      {/* User info */}
      <h2 className="text-xl font-bold text-secondary-blue">{userInfo.name}</h2>
      <p className="text-gray-600 text-sm">@{userInfo.username}</p>

      <div className="w-full border-t border-gray-300 pt-4">
        <p className="text-gray-700">
          <span className="font-bold text-secondary-blue">Age:</span>{" "}
          {userInfo.age}
        </p>
        <p className="text-gray-700">
          <span className="font-bold text-secondary-blue">Email:</span>{" "}
          {userInfo.email}
        </p>
      </div>

      <Button
        label="Szerkesztés"
        className="edit-button mt-5 font-semibold"
        onClick={showEditForm}
        unstyled
      ></Button>
    </div>
  );
};
