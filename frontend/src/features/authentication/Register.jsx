import { useRegisterMutation } from "@api/endpoints/authEndpoints";
import { ErrorMessage } from "@features/errormessage/ErrorMessage";
import { setLoginActive } from "@store/slices/authViewSlice";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

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
              <div className="flex flex-col gap-0.5">
                <label>Név</label>
                <InputText
                  id="name"
                  name="name"
                  value={name}
                  onInput={handleInput}
                  ref={nameRef}
                  className="register-input"
                  unstyled
                />
              </div>

              <div className="flex flex-col gap-0.5">
                <label>
                  Kor {errors.age && <ErrorMessage message={errors.age} />}
                </label>
                <input
                  type="number"
                  name="age"
                  id="age"
                  value={age}
                  onInput={handleInput}
                  className="register-input"
                />
              </div>
            </div>

            {/* Right side */}
            <div className="flex flex-col">
              <div className="flex flex-col gap-0.5">
                <label>
                  Felhasználónév{" "}
                  {errors.username && (
                    <ErrorMessage message={errors.username} />
                  )}
                </label>
                <InputText
                  id="username"
                  name="username"
                  value={username}
                  onInput={handleInput}
                  className="register-input"
                  unstyled
                />
              </div>

              <div className="flex flex-col gap-0.5">
                <label>
                  Jelszó{" "}
                  {errors.password && (
                    <ErrorMessage message={errors.password} />
                  )}
                </label>
                <Password
                  id="password"
                  name="password"
                  value={password}
                  onChange={handleInput}
                  feedback={false}
                  inputClassName="register-input"
                  unstyled
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-5">
            <div className="flex flex-col gap-0.5">
              <label>
                Email {errors.email && <ErrorMessage message={errors.email} />}
              </label>
              <InputText
                id="email"
                name="email"
                value={email}
                onInput={handleInput}
                className="register-input"
                unstyled
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
              className="register-button bg-primary-blue text-primary-white hover:bg-secondary-blue active:bg-secondary-blue dark:bg-dark-primary-blue dark:hover:bg-dark-secondary-blue dark:active:bg-dark-secondary-blue"
              unstyled
            />
          </div>
        </form>
      </div>
    </>
  );
};
