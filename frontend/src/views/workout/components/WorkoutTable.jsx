/* eslint-disable react/prop-types */
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { FaCircleCheck, FaCircleXmark } from "react-icons/fa6";

export const WorkoutTable = ({
  workoutData,
  selectedWorkout,
  setSelectedWorkout,
  onSelect,
}) => {
  const isCompletedTemplate = (rowData) =>
    rowData.isFinished ? (
      <FaCircleCheck className="text-primary-green" size={25} />
    ) : (
      <FaCircleXmark
        className="text-secondary-red dark:text-primary-red"
        size={25}
      />
    );

  return (
    <DataTable
      value={workoutData}
      paginator
      rows={4}
      scrollable
      scrollHeight="400px"
      removableSort
      selectionMode="single"
      selection={selectedWorkout}
      onSelectionChange={(e) => setSelectedWorkout(e.value)}
      onRowSelect={onSelect}
      metaKeySelection={false}
    >
      <Column field="name" header="Név" sortable />
      <Column field="date" header="Dátum" sortable />
      <Column body={isCompletedTemplate} header="Lezárva" />
    </DataTable>
  );
};
