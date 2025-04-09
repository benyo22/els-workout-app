/* eslint-disable react/prop-types */
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { FaPencil, FaTrashCan } from "react-icons/fa6";
import { confirmDialog } from "primereact/confirmdialog";

import { formatWeight } from "../../../utils/helper";
import { useDeleteWeightByIdMutation } from "../../../state/endpoints/weightEndpoints";

export const WeightTable = ({ weightData, setShowForm, setEditingEntry }) => {
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

  const weightTemplate = (rowData) => formatWeight(rowData.weight);

  return (
    <DataTable
      value={weightData}
      paginator
      rows={4}
      scrollable
      scrollHeight="400px"
      removableSort
      emptyMessage="Még nincs súly adat"
    >
      <Column field="date" header="Dátum" sortable />
      <Column body={weightTemplate} header="Súly" />
      <Column body={actionsTemplate} header="Műveletek" />
    </DataTable>
  );
};
