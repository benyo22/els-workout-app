/* eslint-disable react/prop-types */
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";

import { formatWeight } from "@/utils/helper";

export const WeightTable = ({
  weightData,
  onSelect,
  selectedWeight,
  setSelectedWeight,
}) => {
  const weightTemplate = (rowData) => formatWeight(rowData.weight);

  return (
    <DataTable
      value={weightData}
      paginator
      rows={4}
      scrollable
      scrollHeight="400px"
      removableSort
      selectionMode="single"
      selection={selectedWeight}
      onSelectionChange={(e) => setSelectedWeight(e.value)}
      onRowSelect={onSelect}
      metaKeySelection={false}
      emptyMessage="Még nincs súly adat"
    >
      <Column field="date" header="Dátum" sortable />
      <Column body={weightTemplate} header="Súly" />
    </DataTable>
  );
};
