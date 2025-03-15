import { useState } from "react";
import { useSelector } from "react-redux";

import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { BsFillSignStopFill } from "react-icons/bs";
import { DataTable } from "primereact/datatable";
import {
  FaTrashCan,
  FaPlus,
  FaCircleCheck,
  FaCircleXmark,
  FaPencil,
  FaEye,
} from "react-icons/fa6";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

import { WorkoutForm } from "./WorkoutForm";
import {
  useCloseWorkoutByIdMutation,
  useDeleteWorkoutByIdMutation,
  useGetWorkoutByUserIdQuery,
} from "../../../state/endpoints/workoutEndpoints";
import { selectUserId } from "../../../state/slices/authSlice";

export const WorkoutList = () => {
  const userId = useSelector(selectUserId);
  const { data: workoutData, isLoading } = useGetWorkoutByUserIdQuery(userId);

  const [showForm, setShowForm] = useState(false);

  const [deleteWorkout] = useDeleteWorkoutByIdMutation();
  const handleDelete = (id) => {
    confirmDialog({
      message: "Biztosan törölni szeretnéd ezt az edzést?",
      header: "Megerősítés",
      acceptLabel: "Igen",
      acceptClassName: "p-button-danger",
      rejectLabel: "Nem",
      accept: async () => await deleteWorkout(id),
    });
  };

  const [closeWorkout] = useCloseWorkoutByIdMutation();
  const handleWorkoutClose = async (rowData) => {
    // if already finished workout we dont send unneccesary requests
    if (rowData.isCompleted) return;
    const id = rowData.id;
    confirmDialog({
      message:
        "Biztosan lezárod az edzést? Utána már nem szerkesztheted és ez nem visszafordítható!",
      header: "Megerősítés",
      acceptLabel: "Igen",
      acceptClassName: "p-button-danger",
      rejectLabel: "Nem",
      accept: async () => await closeWorkout(id),
    });
  };

  const actionsTemplate = (rowData) => (
    <div className="flex gap-2">
      <Button
        icon={<FaEye />}
        className="p-button-rounded p-button-success"
        // onClick={() => handleWorkoutClose(rowData)}
        disabled={rowData.isCompleted ? false : true}
        tooltip="Edzés megtekintése"
        tooltipOptions={{ position: "top" }}
      />
      <Button
        icon={<FaPencil />}
        className="p-button-rounded"
        // onClick={() => handleWorkoutClose(rowData)}
        disabled={rowData.isCompleted ? true : false}
        tooltip="Edzés szerkesztése"
        tooltipOptions={{ position: "top" }}
      />
      <Button
        icon={<BsFillSignStopFill />}
        className="p-button-rounded"
        onClick={() => handleWorkoutClose(rowData)}
        tooltip="Edzés befejezése"
        tooltipOptions={{ position: "top" }}
      />
      <Button
        icon={<FaTrashCan />}
        className="p-button-rounded p-button-danger"
        onClick={() => handleDelete(rowData.id)}
      />
    </div>
  );

  const isCompletedTemplate = (rowData) =>
    rowData.isCompleted ? (
      <FaCircleCheck color="#31dcb7" size={25} />
    ) : (
      <FaCircleXmark color="#fb2c36" size={25} />
    );

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-primary-white shadow-md rounded-lg border border-primary-grey">
      <h2 className="text-2xl font-bold mb-4">Edzés Napló</h2>
      <Button
        label=" Új Edzés"
        icon={<FaPlus className="mr-1" />}
        className="edit-button flex items-center mb-2"
        onClick={() => {
          setShowForm(true);
        }}
        unstyled
      />

      {isLoading ? (
        <p>Adatok betöltése...</p>
      ) : (
        <DataTable
          value={workoutData}
          paginator
          rows={4}
          scrollable
          scrollHeight="400px"
          removableSort
        >
          <Column field="name" header="Név" sortable />
          <Column field="date" header="Dátum" sortable />
          <Column body={isCompletedTemplate} header="Lezárva" />
          <Column body={actionsTemplate} header="Műveletek" />
        </DataTable>
      )}

      {showForm && (
        <WorkoutForm onClose={() => setShowForm(false)} userId={userId} />
      )}

      <ConfirmDialog />
    </div>
  );
};
