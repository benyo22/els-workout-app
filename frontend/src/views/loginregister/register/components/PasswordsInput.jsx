import { Password } from "primereact/password";

export const PasswordsInput = () => {
  return (
    <>
      {" "}
      <div className="flex flex-col gap-0.5">
        <label htmlFor="password">Jelszó</label>
        <Password
          //   value={value2}
          //   onChange={(e) => setValue2(e.target.value)}
          feedback={false}
          inputClassName="border-2 hover:border-medium-blue focus:border-medium-blue focus:outline-none p-2 rounded-xl"
        />
      </div>
      <div className="flex flex-col gap-0.5">
        <label htmlFor="password">Jelszó ismét</label>
        <Password
          //   value={value2}
          //   onChange={(e) => setValue2(e.target.value)}
          feedback={false}
          inputClassName="border-2 hover:border-medium-blue focus:border-medium-blue focus:outline-none p-2 rounded-xl"
        />
      </div>
    </>
  );
};
