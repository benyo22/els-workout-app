/* eslint-disable react/prop-types */
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";

import { sleepQualityLabels } from "@/utils/data";
import { formatSecToHourMin } from "@/utils/helper";

export const SleepTable = ({
  sleepData,
  onSelect,
  selectedSleep,
  setSelectedSleep,
}) => {
  const qualityTemplate = (rowData) => sleepQualityLabels[rowData.quality];
  const durationTemplate = (rowData) => formatSecToHourMin(rowData.durationSec);

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
