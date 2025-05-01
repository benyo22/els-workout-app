/* eslint-disable react/prop-types */
import { useUpdateUserByIdMutation } from "@api/endpoints/userEndpoints";
import { ErrorMessage } from "@features/errormessage/ErrorMessage";
import { selectUserId } from "@store/slices/authSlice";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { FloatLabel } from "primereact/floatlabel";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { useSelector } from "react-redux";

export const EditUserForm = ({ setVisible }) => {
  const userId = useSelector(selectUserId);
  const [errors, setErrors] = useState({});
  const [credentials, setCredentials] = useState({
    name: "",
    age: 0,
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
      age: 0,
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
        content={
          <div className="profile-edit-form">
            <h2 className="text-xl font-bold mb-5">Profil szerkesztése</h2>
            <FloatLabel className="mt-6">
              <InputText
                id="name"
                name="name"
                value={name}
                onInput={handleInput}
                className="w-full"
              />
              <label htmlFor="name" className="font-bold">
                Név
              </label>
            </FloatLabel>

            <FloatLabel className="mt-8">
              <InputNumber
                id="age"
                name="age"
                value={age}
                onValueChange={handleInput}
                className="w-full"
                min={0}
                max={150}
              />
              <label htmlFor="age" className="font-bold">
                Életkor {errors.age && <ErrorMessage message={errors.age} />}
              </label>
            </FloatLabel>

            <FloatLabel className="mt-8">
              <InputText
                id="username"
                name="username"
                value={username}
                onInput={handleInput}
                className="w-full"
              />
              <label htmlFor="username" className="font-bold">
                Felhasználónév{" "}
                {errors.username && <ErrorMessage message={errors.username} />}
              </label>
            </FloatLabel>

            <FloatLabel className="mt-8">
              <InputText
                id="email"
                name="email"
                value={email}
                onInput={handleInput}
                className="w-full"
              />
              <label htmlFor="email" className="font-bold">
                Email {errors.email && <ErrorMessage message={errors.email} />}
              </label>
            </FloatLabel>

            <div className="flex flex-col justify-around md:flex-row w-full gap-3 mt-4">
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
