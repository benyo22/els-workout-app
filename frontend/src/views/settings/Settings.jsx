import { useState } from "react";
import { useSelector } from "react-redux";

import { FaKey, FaX } from "react-icons/fa6";
import { TabView, TabPanel } from "primereact/tabview";

import { DeleteProfile } from "./components/DeleteProfile";
import { selectUserId } from "../../state/slices/authSlice";
import { UpdatePassword } from "./components/UpdatePassword";

export const Settings = () => {
  const userId = useSelector(selectUserId);
  const [error, setError] = useState("");

  return (
    <div className="settings-container">
      <TabView>
        <TabPanel
          header="Jelszó frissítése"
          leftIcon={<FaKey className="mr-1" />}
        >
          <UpdatePassword error={error} setError={setError} userId={userId} />
        </TabPanel>

        <TabPanel header="Fiók törlése" leftIcon={<FaX className="mr-1" />}>
          <DeleteProfile error={error} setError={setError} userId={userId} />
        </TabPanel>
      </TabView>
    </div>
  );
};
