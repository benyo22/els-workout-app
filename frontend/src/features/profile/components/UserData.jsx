/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";

import { FaAt } from "react-icons/fa";
import { Button } from "primereact/button";

import { ErrorMessage } from "@features";
import { useGetUserByIdQuery } from "@api";
import { selectUserId } from "@store/slices/authSlice";

export const UserData = ({ showEditForm }) => {
  const userId = useSelector(selectUserId);
  const {
    data: userInfo,
    isLoading,
    isError,
    error,
  } = useGetUserByIdQuery(userId);

  return (
    <>
      {isLoading ? (
        <p>Adatok betöltése...</p>
      ) : isError ? (
        <ErrorMessage message={error?.data?.error} />
      ) : (
        <div className="flex flex-col items-center space-y-4">
          {/* Profile picture (if) */}
          <div className="profile-picture">
            {userInfo?.username.charAt(0).toUpperCase()}
          </div>

          {/* User info */}
          <h2 className="user-info-name">{userInfo?.name}</h2>
          <p className="user-info-username">
            <FaAt className="mr-0.5" />
            {userInfo?.username}
          </p>

          <div className="user-info-age-email-container">
            <p className="user-info-p">
              <span className="user-info-age-email">Age:</span> {userInfo?.age}
            </p>
            <p className="user-info-p">
              <span className="user-info-age-email">Email:</span>{" "}
              {userInfo?.email}
            </p>
          </div>

          <Button
            label="Szerkesztés"
            className="edit-button mt-5 font-semibold"
            onClick={showEditForm}
            unstyled
          ></Button>
        </div>
      )}
    </>
  );
};
