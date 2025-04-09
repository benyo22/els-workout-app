/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDispatch } from "react-redux";

import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { FloatLabel } from "primereact/floatlabel";

import { ErrorMessage } from "../../helper/ErrorMessage";
import { logout } from "../../../state/slices/authSlice";
import { setLoginActive } from "../../../state/slices/authViewSlice";
import { useLogoutMutation } from "../../../state/endpoints/authEndpoints";
import { useUpdatePasswordByIdMutation } from "../../../state/endpoints/userEndpoints";

export const UpdatePassword = ({ error, setError, userId }) => {
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

    if (result.error?.data.error) {
      setError(result.error.data.error);
      return;
    }

    await sendLogout();
    dispatch(logout());
    dispatch(setLoginActive());
  };

  return (
    <form
      onSubmit={handlePasswordUpdate}
      className="space-y-4 flex flex-col items-center"
    >
      <h2 className="text-lg font-semibold">Jelszó frissítése</h2>

      <FloatLabel>
        <Password
          id="oldPassword"
          name="oldPassword"
          label="Régi jelszó*"
          value={passwords.oldPassword}
          onChange={handleInput}
          feedback={false}
        />
        <label htmlFor="oldPassword">Régi jelszó</label>
      </FloatLabel>

      <FloatLabel className="mt-2">
        <Password
          id="newPassword"
          name="newPassword"
          label="Új jelszó*"
          value={passwords.newPassword}
          onChange={handleInput}
          feedback={false}
        />
        <label htmlFor="newPassword">Új jelszó</label>
      </FloatLabel>

      {error && <ErrorMessage message={error} />}

      <Button
        type="submit"
        label="Jelszó frissítése"
        className="blue-button w-full mt-0"
        unstyled
      />
    </form>
  );
};
