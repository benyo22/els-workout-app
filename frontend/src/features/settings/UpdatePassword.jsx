/* eslint-disable react/prop-types */
import { useLogoutMutation } from "@api/endpoints/authEndpoints";
import { useUpdatePasswordByIdMutation } from "@api/endpoints/userEndpoints";
import { ErrorMessage } from "@features/errormessage/ErrorMessage";
import { logout } from "@store/slices/authSlice";
import { setLoginActive } from "@store/slices/authViewSlice";
import { Button } from "primereact/button";
import { FloatLabel } from "primereact/floatlabel";
import { Password } from "primereact/password";
import { useState } from "react";
import { useDispatch } from "react-redux";

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
    <div className="space-y-4 flex flex-col items-center">
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
        label="Jelszó frissítése"
        className="blue-button w-full mt-0"
        onClick={handlePasswordUpdate}
        unstyled
      />
    </div>
  );
};
