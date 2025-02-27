import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import { LoginButton } from "./components/LoginButton";
import { UsernameInput } from "./components/UsernameInput";
import { PasswordsInput } from "./components/PasswordsInput";

import { useDispatch } from "react-redux";
import { login } from "../../../state/slices/authSlice";
import { useLoginMutation } from "../../../state/endpoints/userEndpoints";

export const Login = () => {
  const usernameRef = useRef();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const { username, password } = credentials;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [sendLogin, { error }] = useLoginMutation();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await sendLogin(credentials);

    // navigatin back to the main page if there is no error
    if (result?.data?.message === "Login successful!") {
      dispatch(
        login({
          id: result.data.id,
          username: result.data.username,
        })
      );
      navigate("/home", { replace: true });
    }
  };

  // focus on page load
  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  return (
    <>
      <div className="flex flex-col justify-center gap-2 items-center">
        <h1 className="text-5xl text-center mb-5 mt-3 font-extrabold">
          Üdvözöllek újra
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-center gap-5 p-2">
            <UsernameInput
              username={username}
              handleInput={handleInput}
              usernameRef={usernameRef}
              error={error?.data?.error?.notfound}
            />

            <PasswordsInput
              password={password}
              handleInput={handleInput}
              error={error?.data?.error?.password}
            />
            {error?.data?.error?.required ? (
              <span className="error-message">{error.data.error.required}</span>
            ) : (
              // h-5 because then the ui doesnt move when the error message is displayed
              <span className="h-5"></span>
            )}
            <LoginButton />
          </div>
        </form>
      </div>
    </>
  );
};
