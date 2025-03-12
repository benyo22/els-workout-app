import { FaPencil, FaTrashCan, FaPlus } from "react-icons/fa6";

import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

export const Workout = () => {
  const handleDelete = (id) => {
    confirmDialog({
      message: "Biztosan törölni szeretnéd ezt az alvási adatot?",
      header: "Megerősítés",
      acceptLabel: "Igen",
      acceptClassName: "p-button-danger",
      rejectLabel: "Nem",
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
      <h2 className="text-2xl font-bold mb-4">Edzés Napló</h2>
      <Button
        label=" Új Edzés"
        icon={<FaPlus className="mr-1" />}
        className="edit-button flex items-center mb-2"
        onClick={() => {
          setEditingEntry(null);
          setShowForm(true);
        }}
        unstyled
      />

      {1 === 2 ? (
        <p>Adatok betöltése...</p>
      ) : (
        <DataTable
          value={null}
          paginator
          rows={5}
          scrollable
          scrollHeight="400px"
          removableSort
        >
          <Column field="name" header="Név" sortable />
          <Column field="date" header="Dátum" sortable />
          <Column body={actionsTemplate} header="Műveletek" />
        </DataTable>
      )}

      <ConfirmDialog />
    </div>
  );
};
