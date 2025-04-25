/* eslint-disable react/prop-types */
import { sleepQualityLabels } from "@data/data";
import { getHourMinFromSeconds } from "@utils/getHourMinFromSeconds";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";

export const SleepTable = ({
  sleepData,
  onSelect,
  selectedSleep,
  setSelectedSleep,
}) => {
  const qualityTemplate = (rowData) => sleepQualityLabels[rowData.quality];
  const durationTemplate = (rowData) =>
    getHourMinFromSeconds(rowData.durationSec);

  return (
    <DataTable
      value={sleepData}
      paginator
      rows={4}
      scrollable
      scrollHeight="400px"
      removableSort
      selectionMode="single"
      selection={selectedSleep}
      onSelectionChange={(e) => setSelectedSleep(e.value)}
      onRowSelect={onSelect}
      metaKeySelection={false}
      emptyMessage="Még nincs feljegyzett alvás"
    >
      <Column field="date" header="Dátum" sortable />
      <Column body={durationTemplate} header="Időtartam" />
      <Column body={qualityTemplate} header="Minőség" />
    </DataTable>
  );
};
