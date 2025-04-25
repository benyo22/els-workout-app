import { useLoginMutation } from "@api/endpoints/authEndpoints";
import { ErrorMessage } from "@features/errormessage/ErrorMessage";
import { login } from "@store/slices/authSlice";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

export const Login = () => {
  const usernameRef = useRef();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);
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
    if (result.error?.data.error) {
      setError(result.error.data.error);
      return;
    } else {
      dispatch(
        login({
          id: result.data.id,
          username: result.data.username,
        })
      );
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
            <div className="flex flex-col gap-0.5">
              <label>Felhasználónév</label>
              <InputText
                id="username"
                name="username"
                value={username}
                onInput={handleInput}
                ref={usernameRef}
                className="login-input"
                unstyled
              />
            </div>

            <div className="flex flex-col gap-0.5">
              <label>Jelszó</label>
              <Password
                id="password"
                name="password"
                value={password}
                onChange={handleInput}
                feedback={false}
                inputClassName="login-input"
                unstyled
              />
            </div>
            {error ? (
              <ErrorMessage message={error} />
            ) : (
              // h-5 because then the ui doesnt move when the error message is displayed
              <span className="h-5"></span>
            )}
            <Button label="Bejelentkezés" className="login-button" unstyled />
          </div>
        </form>
      </div>
    </>
  );
};
