/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDispatch } from "react-redux";

import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

import { logout } from "../../../state/slices/authSlice";
import { ErrorMessage } from "../../helper/ErrorMessage";
import { setRegisterActive } from "../../../state/slices/authViewSlice";
import { useLogoutMutation } from "../../../state/endpoints/authEndpoints";
import { useDeleteUserByIdMutation } from "../../../state/endpoints/userEndpoints";

export const DeleteProfile = ({ errors, setErrors, userId }) => {
  const dispatch = useDispatch();
  const [deletePassword, setDeletePassword] = useState("");

  const [sendLogout] = useLogoutMutation();
  const [deleteUser] = useDeleteUserByIdMutation();

  const handleDelete = async () => {
    if (!deletePassword) {
      setErrors({ delete: "Kérlek, add meg a jelszavad!" });
      return;
    }

    confirmDialog({
      message: "Biztosan törölni akarod a fiókodat? Ez nem visszavonható!",
      header: "Megerősítés",
      acceptLabel: "Igen",
      acceptClassName: "p-button-danger",
      rejectLabel: "Nem",
      accept: async () => {
        const result = await deleteUser({
          id: userId,
          password: deletePassword,
        });

        if (result.error?.data.error) {
          setErrors(result.error.data.error);
          return;
        }

        await sendLogout();
        dispatch(logout());
        dispatch(setRegisterActive());
      },
    });
  };

  return (
    <div className="flex flex-col space-y-2 pt-2">
      <h2 className="text-lg font-semibold text-red-600">Fiók törlése</h2>
      <p className="text-sm text-gray-600 mb-2">
        A fiók törlése végleges, és nem visszavonható.
      </p>
      <Password
        id="password"
        name="password"
        placeholder="Jelszó megerősítése"
        inputClassName="delete-input"
        value={deletePassword}
        onChange={(e) => setDeletePassword(e.target.value)}
        feedback={false}
        unstyled
      />
      {errors.delete && <ErrorMessage message={errors.delete} />}

      <Button
        label="Fiók törlése"
        onClick={handleDelete}
        className="delete-button"
        unstyled
      />
      <ConfirmDialog />
    </div>
  );
};
