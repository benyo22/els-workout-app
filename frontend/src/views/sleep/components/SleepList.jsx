import { useState } from "react";
import { useSelector } from "react-redux";

import { SleepForm } from "./SleepForm";
import {
  useGetSleepByUserIdQuery,
  useDeleteSleepByIdMutation,
} from "../../../state/endpoints/sleepEndpoints";

import { sleepQualityLabels } from "../../../utils/data";

import { FaPencil, FaTrashCan, FaPlus } from "react-icons/fa6";

import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { selectUserId } from "../../../state/slices/authSlice";

export const SleepList = () => {
  const userId = useSelector(selectUserId);
  const { data: sleepData, isLoading } = useGetSleepByUserIdQuery(userId);

  const [showForm, setShowForm] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);

  const [deleteSleep] = useDeleteSleepByIdMutation();
  const handleDelete = (id) => {
    confirmDialog({
      message: "Biztosan törölni szeretnéd ezt az alvási adatot?",
      header: "Megerősítés",
      acceptLabel: "Igen",
      acceptClassName: "p-button-danger",
      rejectLabel: "Nem",
      accept: async () => await deleteSleep(id),
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

  const qualityTemplate = (rowData) => sleepQualityLabels[rowData.quality];

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
        <DataTable
          value={sleepData}
          paginator
          rows={5}
          scrollable
          scrollHeight="400px"
          removableSort
        >
          <Column field="date" header="Dátum" sortable />
          <Column field="durationHour" header="Időtartam (óra)" sortable />
          <Column body={qualityTemplate} header="Minőség" sortable />
          <Column body={actionsTemplate} header="Műveletek" />
        </DataTable>
      )}

      {showForm && (
        <SleepForm
          entry={editingEntry}
          onClose={() => setShowForm(false)}
          userId={userId}
        />
      )}
      <ConfirmDialog />
    </div>
  );
};
