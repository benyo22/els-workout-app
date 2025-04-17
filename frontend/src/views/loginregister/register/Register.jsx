import { useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";

import { ErrorMessage } from "@/views/helper/ErrorMessage";
import { setLoginActive } from "@/store/slices/authViewSlice";
import { useRegisterMutation } from "@/api/endpoints/authEndpoints";
import { AgeInput } from "@/views/loginregister/register/components/AgeInput";
import { NameInput } from "@/views/loginregister/register/components/NameInput";
import { EmailInput } from "@/views/loginregister/register/components/EmailInput";
import { UsernameInput } from "@/views/loginregister/register/components/UsernameInput";
import { PasswordsInput } from "@/views/loginregister/register/components/PasswordsInput";
import { RegisterButton } from "@/views/loginregister/register/components/RegisterButton";

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
              <NameInput
                name={name}
                handleInput={handleInput}
                nameRef={nameRef}
              />

              <AgeInput
                age={age}
                handleInput={handleInput}
                error={errors.age}
              />
            </div>

            {/* Right side */}
            <div className="flex flex-col">
              <UsernameInput
                username={username}
                handleInput={handleInput}
                error={errors.username}
              />
              <PasswordsInput
                password={password}
                handleInput={handleInput}
                error={errors.password}
              />
            </div>
          </div>
          <div className="flex flex-col items-center gap-5">
            <div className="flex flex-col">
              <EmailInput
                email={email}
                handleInput={handleInput}
                error={errors.email}
              />
            </div>
            {errors.required ? (
              <ErrorMessage message={errors.required} />
            ) : (
              // h-5 because then the ui doesnt move when the error message is displayed
              <span className="h-5"></span>
            )}
            <RegisterButton />
          </div>
        </form>
      </div>
    </>
  );
};
