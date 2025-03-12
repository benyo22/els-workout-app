import { useState } from "react";
import { useSelector } from "react-redux";

import { WeightForm } from "./WeightForm";

import {
  useGetWeightByUserIdQuery,
  useDeleteWeightByIdMutation,
} from "../../../state/endpoints/weightEndpoints";

import { FaPencil, FaTrashCan, FaPlus } from "react-icons/fa6";

import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { selectUserId } from "../../../state/slices/authSlice";

export const WeightList = () => {
  const userId = useSelector(selectUserId);
  const { data: weightData, isLoading } = useGetWeightByUserIdQuery(userId);

  const [showForm, setShowForm] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);

  const [deleteWeight] = useDeleteWeightByIdMutation();
  const handleDelete = (id) => {
    confirmDialog({
      message: "Biztosan törölni szeretnéd ezt a súly adatot?",
      header: "Megerősítés",
      acceptLabel: "Igen",
      acceptClassName: "p-button-danger",
      rejectLabel: "Nem",
      accept: async () => await deleteWeight(id),
    });
  };

  const actionsTemplate = (rowData) => (
    <div className="flex gap-2">
      <Button
        icon={<FaPencil />}
        className="p-button-rounded"
        onClick={() => {
          setEditingEntry(rowData);
          setShowForm(true);
        }}
      />
      <Button
        icon={<FaTrashCan />}
        className="p-button-rounded p-button-danger"
        onClick={() => handleDelete(rowData.id)}
      />
    </div>
  );

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-primary-white shadow-md rounded-lg border border-primary-grey">
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
        <DataTable
          value={weightData}
          paginator
          rows={5}
          scrollable
          scrollHeight="400px"
          removableSort
        >
          <Column field="weight" header="Súly (kg)" sortable />
          <Column field="date" header="Dátum" sortable />
          <Column body={actionsTemplate} header="Műveletek" />
        </DataTable>
      )}

      {showForm && (
        <WeightForm
          entry={editingEntry}
          onClose={() => setShowForm(false)}
          userId={userId}
        />
      )}
      <ConfirmDialog />
    </div>
  );
};
