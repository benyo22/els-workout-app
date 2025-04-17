import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useEffect, useRef, useState } from "react";

import { login } from "@/store/slices/authSlice";
import { ErrorMessage } from "@/views/helper/ErrorMessage";
import { useLoginMutation } from "@/api/endpoints/authEndpoints";
import { LoginButton } from "@/views/loginregister/login/components/LoginButton";
import { UsernameInput } from "@/views/loginregister/login/components/UsernameInput";
import { PasswordsInput } from "@/views/loginregister/login/components/PasswordsInput";

export const Login = () => {
  const usernameRef = useRef();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const { username, password } = credentials;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [sendLogin] = useLoginMutation();

  // focus on page load
  useEffect(() => {
    usernameRef.current.focus();
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

    const result = await sendLogin(credentials);
    if (result.error) {
      setErrors(result.error.data?.error);
    } else {
      dispatch(
        login({
          id: result.data.id,
          username: result.data.username,
        })
      );
      // navigating back to the main page if there is no error
      navigate("/home", { replace: true });
    }
  };

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
              error={errors.username}
            />

            <PasswordsInput
              password={password}
              handleInput={handleInput}
              error={errors.password}
            />
            {errors.required ? (
              <ErrorMessage message={errors.required} />
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
