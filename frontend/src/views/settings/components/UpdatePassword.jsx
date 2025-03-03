/* eslint-disable react/prop-types */
import { Button } from "primereact/button";
import { Password } from "primereact/password";

import { useState } from "react";
import { useDispatch } from "react-redux";

import { logout } from "../../../state/slices/authSlice";
import { setLoginActive } from "../../../state/slices/authUiSlice";
import { useLogoutMutation } from "../../../state/endpoints/authEndpoints";
import { useUpdatePasswordByIdMutation } from "../../../state/endpoints/userEndpoints";

export const UpdatePassword = ({ errors, setErrors, userId }) => {
  const dispatch = useDispatch();
  const [sendLogout] = useLogoutMutation();

  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setPasswords({ ...passwords, [name]: value });
  };

  const [updatePassword] = useUpdatePasswordByIdMutation();
  const handlePasswordUpdate = async (e) => {
    e.preventDefault();

    const result = await updatePassword({
      id: userId,
      data: passwords,
    });
    if (result.error) {
      setErrors(result.error.data?.error || { general: "Hiba történt!" });
      return;
    }

    await sendLogout();
    dispatch(logout());
    dispatch(setLoginActive());
    alert("Jelszó frissítése sikeres volt!");
  };

  return (
    <div className="border-t pt-2">
      <h2 className="text-lg font-semibold mb-2">Jelszó frissítése</h2>
      <form onSubmit={handlePasswordUpdate} className="space-y-2">
        <div className="flex flex-col gap-0.5">
          <label>Régi jelszó*</label>
          <Password
            id="oldPassword"
            name="oldPassword"
            placeholder="Jelenlegi jelszó"
            inputClassName="register-input"
            value={passwords.oldPassword}
            onChange={handleInput}
            feedback={false}
          />
        </div>

        <div className="flex flex-col gap-0.5">
          <label>Új jelszó*</label>
          <Password
            id="newPassword"
            name="newPassword"
            placeholder="Új jelszó"
            inputClassName="register-input"
            value={passwords.newPassword}
            onChange={handleInput}
            feedback={false}
          />
        </div>

        {errors.password && (
          <span className="error-message">{errors.password}</span>
        )}
        {errors.required && (
          <span className="error-message">{errors.required}</span>
        )}
        <Button label="Jelszó frissítése" className="auth-button" />
      </form>
    </div>
  );
};
