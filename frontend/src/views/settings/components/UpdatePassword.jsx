/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDispatch } from "react-redux";

import { Button } from "primereact/button";
import { Password } from "primereact/password";

import { ErrorMessage } from "../../helper/ErrorMessage";

import { logout } from "../../../state/slices/authSlice";
import { setLoginActive } from "../../../state/slices/authViewSlice";
import { useLogoutMutation } from "../../../state/endpoints/authEndpoints";
import { useUpdatePasswordByIdMutation } from "../../../state/endpoints/userEndpoints";

export const UpdatePassword = ({ errors, setErrors, userId }) => {
  const dispatch = useDispatch();
  const [sendLogout] = useLogoutMutation();
  const [updatePassword] = useUpdatePasswordByIdMutation();

  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const handleInput = (e) =>
    setPasswords({ ...passwords, [e.target.name]: e.target.value });

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    const result = await updatePassword({ id: userId, data: passwords });

    if (result.error) {
      setErrors(result.error.data?.error);
      return;
    }

    await sendLogout();
    dispatch(logout());
    dispatch(setLoginActive());
  };

  return (
    <div className="pt-2">
      <h2 className="text-lg font-semibold mb-2">Jelszó frissítése</h2>
      <form onSubmit={handlePasswordUpdate} className="space-y-2">
        <div className="flex flex-col gap-0.5">
          <label>Régi jelszó*</label>
          <Password
            label="Régi jelszó*"
            name="oldPassword"
            placeholder="Régi jelszó"
            value={passwords.oldPassword}
            onChange={handleInput}
            feedback={false}
          />
        </div>

        <div className="flex flex-col gap-0.5">
          <label>Új jelszó*</label>
          <Password
            label="Új jelszó*"
            name="newPassword"
            placeholder="Új jelszó"
            value={passwords.newPassword}
            onChange={handleInput}
            feedback={false}
          />
        </div>

        {errors.password && <ErrorMessage message={errors.password} />}
        {errors.required && <ErrorMessage message={errors.required} />}

        <Button
          type="submit"
          label="Jelszó frissítése"
          className="edit-button"
          unstyled
        />
      </form>
    </div>
  );
};
