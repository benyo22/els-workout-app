import { DeleteProfile } from "@features/settings/DeleteProfile";
import { UpdatePassword } from "@features/settings/UpdatePassword";
import { selectUserId } from "@store/slices/authSlice";
import { TabPanel, TabView } from "primereact/tabview";
import { useState } from "react";
import { FaKey, FaX } from "react-icons/fa6";
import { useSelector } from "react-redux";

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
