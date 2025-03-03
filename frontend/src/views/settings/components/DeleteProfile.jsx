/* eslint-disable react/prop-types */
import { Button } from "primereact/button";
import { Password } from "primereact/password";

import { useState } from "react";
import { useDispatch } from "react-redux";

import { logout } from "../../../state/slices/authSlice";
import { setRegisterActive } from "../../../state/slices/authUiSlice";
import { useLogoutMutation } from "../../../state/endpoints/authEndpoints";
import { useDeleteUserByIdMutation } from "../../../state/endpoints/userEndpoints";

export const DeleteProfile = ({ errors, setErrors, userId }) => {
  const dispatch = useDispatch();
  const [sendLogout] = useLogoutMutation();
  const [deletePassword, setDeletePassword] = useState("");

  const [deleteUser] = useDeleteUserByIdMutation();
  const handleDeleteAccount = async () => {
    if (!deletePassword) {
      setErrors({ delete: "Kérlek, add meg a jelszavad!" });
      return;
    }

    const confirmed = window.confirm(
      "Biztosan törölni akarod a fiókodat? Ez nem visszavonható!"
    );
    if (!confirmed) return;

    const result = await deleteUser({ id: userId, password: deletePassword });
    if (result.error?.data.error) {
      setErrors(result.error.data.error);
      return;
    }

    await sendLogout();
    dispatch(logout());
    dispatch(setRegisterActive());
    alert("Fiókod törölve lett.");
  };

  return (
    <div className="flex flex-col space-y-2 border-t pt-2">
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
      />
      {errors.delete && (
        <span className="error-message ml-5">{errors.delete}</span>
      )}
      <Button
        label="Fiók törlése"
        onClick={handleDeleteAccount}
        className="delete-button"
      />
    </div>
  );
};
