import { useState } from "react";
import { useSelector } from "react-redux";

import { WeightForm } from "./WeightForm";

import {
  useGetWeightByUserIdQuery,
  useDeleteWeightByIdMutation,
} from "../../../state/endpoints/weightEndpoints";

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
        icon="pi pi-pencil"
        className="p-button-rounded"
        onClick={() => {
          setEditingEntry(rowData);
          setShowForm(true);
        }}
      />
      <Button
        icon="pi pi-trash"
        className="p-button-rounded p-button-danger"
        onClick={() => handleDelete(rowData.id)}
      />
    </div>
  );

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Súly Napló</h2>
      <Button
        label=" Új Bejegyzés"
        icon="pi pi-plus"
        className="edit-button md:w-[30%] sm:w-[22%]"
        onClick={() => {
          setEditingEntry(null);
          setShowForm(true);
        }}
        unstyled
      />

      {isLoading ? (
        <p>Adatok betöltése...</p>
      ) : (
        <DataTable value={weightData} paginator rows={3} className="">
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
