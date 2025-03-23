import { useState } from "react";
import { useSelector } from "react-redux";

import { FaPlus } from "react-icons/fa6";
import { Button } from "primereact/button";
import { ConfirmDialog } from "primereact/confirmdialog";

import { SleepForm } from "./components/SleepForm";
import { SleepTable } from "./components/SleepTable";
import { selectUserId } from "../../state/slices/authSlice";
import { useGetSleepByUserIdQuery } from "../../state/endpoints/sleepEndpoints";

export const Sleep = () => {
  const userId = useSelector(selectUserId);
  const { data: sleepData, isLoading } = useGetSleepByUserIdQuery(userId);

  const [showForm, setShowForm] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);

  return (
    <div className="list-container">
      <h2 className="text-2xl font-bold mb-4">Alvás Napló</h2>
      <Button
        label="Új Bejegyzés"
        icon={<FaPlus className="mr-1" />}
        className="edit-button flex items-center mb-2"
        onClick={() => {
          setEditingEntry(null);
          setShowForm(true);
        }}
        unstyled
      />

      {isLoading ? (
        <p>Adatok betöltése...</p>
      ) : (
        <SleepTable
          sleepData={sleepData}
          setShowForm={setShowForm}
          setEditingEntry={setEditingEntry}
        />
      )}

      {showForm && (
        <SleepForm
          userId={userId}
          entry={editingEntry}
          onClose={() => setShowForm(false)}
        />
      )}
      <ConfirmDialog />
    </div>
  );
};
