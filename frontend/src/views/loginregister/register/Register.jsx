import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useRegisterMutation } from "../../../state/endpoints/userEndpoints";

import { NameInput } from "./components/NameInput";
import { AgeInput } from "./components/AgeInput";
import { EmailInput } from "./components/EmailInput";
import { UsernameInput } from "./components/UsernameInput";
import { PasswordsInput } from "./components/PasswordsInput";
import { RegisterButton } from "./components/RegisterButton";

export const Register = () => {
  const nameRef = useRef();
  const [credentials, setCredentials] = useState({
    name: "",
    age: 0,
    email: "",
    username: "",
    password: "",
  });
  const { name, age, email, username, password } = credentials;
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const [sendRegister, { error }] = useRegisterMutation();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    credentials.age = parseInt(credentials.age);
    await sendRegister(credentials);

    //navigating back to the main page if no error
    navigate("/", { replace: true });
  };

  // focus on page load
  useEffect(() => {
    nameRef.current.focus();
  }, []);
  return (
    <>
      <div className="flex flex-col justify-center gap-2 items-center">
        <h1 className="text-5xl text-center mb-5 font-extrabold">
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
              <EmailInput email={email} handleInput={handleInput} />
            </div>

            {/* Right side */}
            <div className="flex flex-col">
              <UsernameInput username={username} handleInput={handleInput} />
              <PasswordsInput password={password} handleInput={handleInput} />
            </div>
          </div>
          <div className="flex flex-col items-center gap-5">
            <div className="flex flex-col">
              <AgeInput age={age} handleInput={handleInput} />
              {error?.data?.error?.required && (
                <p className="errorMessage">{error.data.error.required}</p>
              )}
            </div>
            <RegisterButton />
          </div>
        </form>
      </div>
    </>
  );
};
