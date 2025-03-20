/* eslint-disable react/prop-types */
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { FaTrashCan, FaCircleCheck, FaCircleXmark } from "react-icons/fa6";

export const WorkoutTable = ({
  workouts,
  selectedWorkout,
  setSelectedWorkout,
  handleDelete,
  onRowSelect,
}) => {
  const actionsTemplate = (rowData) => (
    <Button
      icon={<FaTrashCan />}
      className="p-button-rounded p-button-danger"
      onClick={() => handleDelete(rowData.id)}
    />
  );

  const isCompletedTemplate = (rowData) =>
    rowData.isCompleted ? (
      <FaCircleCheck className="text-primary-green" size={25} />
    ) : (
      <FaCircleXmark
        className="text-secondary-red dark:text-primary-red"
        size={25}
      />
    );

  return (
    <DataTable
      value={workouts}
      paginator
      rows={4}
      scrollable
      scrollHeight="400px"
      removableSort
      selectionMode="single"
      selection={selectedWorkout}
      onSelectionChange={(e) => setSelectedWorkout(e.value)}
      dataKey="id"
      onRowSelect={onRowSelect}
      metaKeySelection={false}
    >
      <Column field="name" header="Név" sortable />
      <Column field="date" header="Dátum" sortable />
      <Column body={isCompletedTemplate} header="Lezárva" />
      <Column body={actionsTemplate} header="Műveletek" />
    </DataTable>
  );
};
