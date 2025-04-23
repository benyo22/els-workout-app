/* eslint-disable react/prop-types */
import { useState } from "react";
import { useSelector } from "react-redux";

import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

import { TextInput } from "@components/form";
import { NumberInput } from "@components/form";
import { useUpdateUserByIdMutation } from "@api";
import { selectUserId } from "@store/slices/authSlice";

export const EditUserForm = ({ setVisible }) => {
  const userId = useSelector(selectUserId);
  const [errors, setErrors] = useState({});
  const [credentials, setCredentials] = useState({
    name: "",
    age: "",
    email: "",
    username: "",
  });
  const [updateUser] = useUpdateUserByIdMutation();
  const { name, age, email, username } = credentials;

  const handleInput = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const onClose = () => {
    setVisible(false);
    setErrors({});
    setCredentials({
      name: "",
      age: "",
      email: "",
      username: "",
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

    onClose();
  };

  return (
    <>
      <Dialog
        visible
        modal
        onHide={onClose}
        position="right"
        content={
          <div className="profile-edit-form">
            <h2 className="text-xl font-bold mb-5">Profil szerkesztése</h2>
            <TextInput
              label={"Név"}
              id={"name"}
              name={"name"}
              value={name}
              onInput={handleInput}
              className={"register-input"}
            />
            <NumberInput
              label={"Kor"}
              type={"number"}
              id={"age"}
              name={"age"}
              value={age}
              onInput={handleInput}
              className={"register-input"}
              error={errors.age}
            />
            <TextInput
              label={"Felhasználónév"}
              id={"username"}
              name={"username"}
              value={username}
              onInput={handleInput}
              className={"register-input"}
              error={errors.username}
            />
            <TextInput
              label={"Email"}
              id={"email"}
              name={"email"}
              value={email}
              onInput={handleInput}
              className={"register-input"}
              error={errors.email}
            />
            <div className="flex flex-col justify-end md:flex-row w-full gap-3 mt-4">
              <Button
                label="Mégse"
                onClick={onClose}
                className="gray-button"
                unstyled
              />
              <Button
                label="Mentés"
                onClick={handleUpdate}
                className="green-button"
                unstyled
              />
            </div>
          </div>
        }
      ></Dialog>
    </>
  );
};
