import { TabView, TabPanel } from "primereact/tabview";

import { FaKey, FaX } from "react-icons/fa6";

import { useState } from "react";
import { useSelector } from "react-redux";

import { DeleteProfile } from "./components/DeleteProfile";
import { selectUserId } from "../../state/slices/authSlice";
import { UpdatePassword } from "./components/UpdatePassword";

export const Settings = () => {
  const userId = useSelector(selectUserId);
  const [errors, setErrors] = useState({});

  return (
    <div className="w-full max-w-sm md:max-w-md h-[420px] shadow-lg rounded-xl p-6 border border-primary-grey">
      <TabView
        pt={{
          nav: { className: "flex space-x-3 border-b border-gray-300" }, // Tab container with underline
          tab: ({ selected }) => ({
            className: `px-4 py-2 transition-all ${
              selected ? "font-bold border-b-2 border-primary" : "text-gray-500"
            }`,
          }),
        }}
      >
        <TabPanel
          header="Jelszó frissítése"
          leftIcon={<FaKey className="mr-1" />}
        >
          <UpdatePassword
            errors={errors}
            setErrors={setErrors}
            userId={userId}
          />
        </TabPanel>

        <TabPanel header="Fiók törlése" leftIcon={<FaX className="mr-1" />}>
          <DeleteProfile
            errors={errors}
            setErrors={setErrors}
            userId={userId}
          />
        </TabPanel>
      </TabView>
    </div>
  );
};
