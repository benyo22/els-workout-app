import { useState } from "react";
import { useSelector } from "react-redux";

import { Button } from "primereact/button";
import { FaPlus } from "react-icons/fa6";
import { ConfirmDialog } from "primereact/confirmdialog";

import { WeightForm } from "./components/WeightForm";
import { ErrorMessage } from "../helper/ErrorMessage";
import { WeightTable } from "./components/WeightTable";
import { selectUserId } from "../../state/slices/authSlice";
import { useGetWeightByUserIdQuery } from "../../state/endpoints/weightEndpoints";

export const Weight = () => {
  const userId = useSelector(selectUserId);
  const {
    data: weightData,
    isLoading,
    isError,
    error,
  } = useGetWeightByUserIdQuery(userId);

  const [showForm, setShowForm] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);

  return (
    <>
      {isError ? (
        <ErrorMessage message={error.data.error} />
      ) : (
        <div className="list-container">
          <h2 className="text-2xl font-bold mb-4">Súly Napló</h2>
          <Button
            label=" Új Bejegyzés"
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
            <WeightTable
              weightData={weightData}
              setShowForm={setShowForm}
              setEditingEntry={setEditingEntry}
            />
          )}

          {showForm && (
            <WeightForm
              userId={userId}
              entry={editingEntry}
              onClose={() => setShowForm(false)}
            />
          )}
          <ConfirmDialog />
        </div>
      )}
    </>
  );
};
