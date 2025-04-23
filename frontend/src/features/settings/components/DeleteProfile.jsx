/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDispatch } from "react-redux";

import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { FloatLabel } from "primereact/floatlabel";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

import { ErrorMessage } from "@features";
import { useLogoutMutation } from "@api";
import { useDeleteUserByIdMutation } from "@api";
import { logout } from "@store/slices/authSlice";
import { setRegisterActive } from "@store/slices/authViewSlice";

export const DeleteProfile = ({ error, setError, userId }) => {
  const dispatch = useDispatch();
  const [deletePassword, setDeletePassword] = useState("");
  const [sendLogout] = useLogoutMutation();
  const [deleteUser] = useDeleteUserByIdMutation();

  const handleDelete = async () => {
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
          setError(result.error.data.error);
          return;
        }

        await sendLogout();
        dispatch(logout());
        dispatch(setRegisterActive());
      },
    });
  };

  return (
    <div className="flex flex-col">
      <h2 className="text-lg font-semibold text-red-600">Fiók törlése</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300">
        A fiók törlése végleges, és nem visszavonható.
      </p>

      <FloatLabel className="mt-8 mb-4">
        <Password
          id="password"
          name="password"
          inputClassName="delete-input"
          value={deletePassword}
          onChange={(e) => setDeletePassword(e.target.value)}
          feedback={false}
          unstyled
        />
        <label htmlFor="password">Jelszó megerősítése</label>
      </FloatLabel>

      {error && <ErrorMessage message={error} />}

      <Button
        label="Fiók törlése"
        onClick={handleDelete}
        className="red-button mt-4"
        unstyled
      />
      <ConfirmDialog />
    </div>
  );
};
