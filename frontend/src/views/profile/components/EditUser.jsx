import { useState } from "react";
import { useSelector } from "react-redux";

import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

import { AgeInput } from "./editcomponents/AgeInput";
import { NameInput } from "./editcomponents/NameInput";
import { EmailInput } from "./editcomponents/EmailInput";
import { UsernameInput } from "./editcomponents/UsernameInput";
import { selectUserId } from "../../../state/slices/authSlice";
import { useUpdateUserByIdMutation } from "../../../state/endpoints/userEndpoints";

export const EditUser = () => {
  const [visible, setVisible] = useState(false);
  const [credentials, setCredentials] = useState({
    name: "",
    age: "",
    email: "",
    username: "",
  });
  const { name, age, email, username } = credentials;
  const [errors, setErrors] = useState({});

  const userId = useSelector(selectUserId);
  const [updateUser] = useUpdateUserByIdMutation();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    credentials.age = parseInt(credentials.age) || 0;
    const result = await updateUser({ id: userId, data: credentials });

    if (result.error?.data.error) {
      setErrors(result.error.data.error);
      return;
    }

    // if success, close the edit window
    setVisible(false);
    setErrors({});
    setCredentials({
      name: "",
      age: "",
      email: "",
      username: "",
    });
  };

  return (
    <>
      <Button
        label="Szerkesztés"
        className="edit-button mt-5 font-semibold"
        onClick={() => setVisible(true)}
        unstyled
      ></Button>

      <Dialog
        visible={visible}
        modal
        onHide={() => setVisible(false)}
        position="right"
        content={
          <div className="flex flex-col bg-primary-white w-full p-6 rounded-lg shadow-lg items-center justify-center">
            <h2 className="text-xl font-bold mb-5">Profil szerkesztése</h2>
            <NameInput name={name} handleInput={handleInput} />

            <AgeInput age={age} handleInput={handleInput} error={errors.age} />
            <UsernameInput
              username={username}
              handleInput={handleInput}
              error={errors.username}
            />
            <EmailInput
              email={email}
              handleInput={handleInput}
              error={errors.email}
            />
            <div className="flex flex-col md:flex-row w-full gap-3 mt-4">
              <Button
                label="Mentés"
                className="p-button-success"
                onClick={handleUpdate}
              />
              <Button
                label="Mégse"
                className="p-button-secondary"
                onClick={() => {
                  setVisible(false);
                  setCredentials({
                    name: "",
                    age: "",
                    email: "",
                    username: "",
                  });
                }}
              />
            </div>
          </div>
        }
      ></Dialog>
    </>
  );
};
