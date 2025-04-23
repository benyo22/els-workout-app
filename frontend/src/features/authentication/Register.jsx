import { useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";

import { Button } from "primereact/button";

import { ErrorMessage } from "@features";
import { useRegisterMutation } from "@api";
import { TextInput } from "@components/form";
import { NumberInput } from "@components/form";
import { PasswordInput } from "@components/form";
import { setLoginActive } from "@store/slices/authViewSlice";

export const Register = () => {
  const nameRef = useRef();
  const [credentials, setCredentials] = useState({
    name: "",
    age: "",
    email: "",
    username: "",
    password: "",
  });
  const { name, age, email, username, password } = credentials;
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const [sendRegister] = useRegisterMutation();

  // focus on page load
  useEffect(() => {
    nameRef.current.focus();
  }, []);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    credentials.age = parseInt(credentials.age) || 0;
    const result = await sendRegister(credentials);

    if (result.error) {
      setErrors(result.error.data?.error);
    } else {
      // navigating back to login if there is no error
      dispatch(setLoginActive());
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-2">
        <h1 className="text-5xl text-center mb-3 font-extrabold">
          Regisztráció
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="flex md:flex-row flex-col md:gap-5 p-2">
            {/* Left side */}
            <div className="flex flex-col">
              <TextInput
                label="Név"
                id="name"
                name="name"
                value={name}
                onInput={handleInput}
                ref={nameRef}
                className="register-input"
              />

              <NumberInput
                label="Kor"
                type="number"
                name="age"
                id="age"
                value={age}
                onInput={handleInput}
                className="register-input"
                error={errors.age}
              />
            </div>

            {/* Right side */}
            <div className="flex flex-col">
              <TextInput
                label="Felhasználónév"
                id="username"
                name="username"
                value={username}
                onInput={handleInput}
                className="register-input"
                error={errors.username}
              />
              <PasswordInput
                label="Jelszó"
                id="password"
                name="password"
                value={password}
                onChange={handleInput}
                feedback={false}
                inputClassName="register-input"
                error={errors.password}
              />
            </div>
          </div>
          <div className="flex flex-col items-center gap-5">
            <div className="flex flex-col">
              <TextInput
                label="Email"
                id="email"
                name="email"
                value={email}
                onInput={handleInput}
                className="register-input"
                error={errors.email}
              />
            </div>
            {errors.required ? (
              <ErrorMessage message={errors.required} />
            ) : (
              // h-5 because then the ui doesnt move when the error message is displayed
              <span className="h-5"></span>
            )}
            <Button
              label="Regisztrálok"
              className="white-blue-button bg-primary-blue text-primary-white hover:bg-secondary-blue"
              unstyled
            />
          </div>
        </form>
      </div>
    </>
  );
};
