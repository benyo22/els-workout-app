/* eslint-disable react/prop-types */
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { FaPencil, FaTrashCan } from "react-icons/fa6";
import { confirmDialog } from "primereact/confirmdialog";

import { sleepQualityLabels } from "../../../utils/data";
import { useDeleteSleepByIdMutation } from "../../../state/endpoints/sleepEndpoints";

export const SleepTable = ({ sleepData, setShowForm, setEditingEntry }) => {
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

  const durationTemplate = (rowData) => {
    const hours = Math.floor(rowData.durationSec / 3600);
    const minutes = Math.floor((rowData.durationSec % 3600) / 60);
    console.log(hours);

    return `${hours} óra ${minutes} perc`;
  };

  return (
    <DataTable
      value={sleepData}
      paginator
      rows={5}
      scrollable
      scrollHeight="400px"
      removableSort
      emptyMessage="Még nincs feljegyzett alvás"
    >
      <Column field="date" header="Dátum" sortable />
      <Column body={durationTemplate} header="Időtartam" sortable />
      <Column body={qualityTemplate} header="Minőség" sortable />
      <Column body={actionsTemplate} header="Műveletek" />
    </DataTable>
  );
};
