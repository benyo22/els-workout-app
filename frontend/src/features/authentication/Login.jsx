import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useEffect, useRef, useState } from "react";

import { useLoginMutation } from "@api";
import { ErrorMessage } from "@features";
import { login } from "@store/slices/authSlice";
import { TextInput } from "@components/form/TextInput";
import { LabelButton } from "@/components/ui/LabelButton";
import { PasswordInput } from "@/components/form/PasswordInput";

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
            <TextInput
              label="Felhasználónév"
              id="username"
              name="username"
              value={username}
              onInput={handleInput}
              ref={usernameRef}
              className="login-input"
              error={errors.username}
              unstyled
            />

            <PasswordInput
              label="Jelszó"
              id="password"
              name="password"
              value={password}
              onChange={handleInput}
              feedback={false}
              inputClassName="login-input"
              error={errors.password}
            />
            {errors.required ? (
              <ErrorMessage message={errors.required} />
            ) : (
              // h-5 because then the ui doesnt move when the error message is displayed
              <span className="h-5"></span>
            )}
            <LabelButton label="Bejelentkezés" className="green-button" />
          </div>
        </form>
      </div>
    </>
  );
};
