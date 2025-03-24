import { useState } from "react";
import { useSelector } from "react-redux";

import { FaPlus } from "react-icons/fa6";
import { Button } from "primereact/button";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

import { CreateWorkoutForm } from "./components/CreateWorkoutForm";
import { WorkoutTable } from "./components/WorkoutTable";
import {
  useDeleteWorkoutByIdMutation,
  useFinishWorkoutByIdMutation,
  useGetWorkoutByUserIdQuery,
} from "../../state/endpoints/workoutEndpoints";
import { ExerciseManager } from "../exercise/ExerciseManager";
import { selectUserId } from "../../state/slices/authSlice";

export const Workout = () => {
  const userId = useSelector(selectUserId);
  const [closeWorkout] = useFinishWorkoutByIdMutation();
  const [deleteWorkout] = useDeleteWorkoutByIdMutation();
  const { data: workoutData, isLoading } = useGetWorkoutByUserIdQuery(userId);

  const [showCreateWorkoutForm, setShowCreateWorkoutForm] = useState(false);
  const [visibleWorkout, setVisibleWorkout] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState(null);

  const confirmAction = (message, onAccept) => {
    confirmDialog({
      message,
      header: "Megerősítés",
      acceptLabel: "Igen",
      rejectLabel: "Nem",
      accept: onAccept,
    });
  };

  const handleDelete = (workoutId, onAccept) => {
    const activeWorkout = workoutData?.find((w) => !w.isCompleted);
    const message = activeWorkout
      ? "Van már egy folyamatban lévő edzésed! Ha újat szeretnél indítani, akkor az törlődni fog. Biztos vagy benne?"
      : "Biztosan törölni szeretnéd ezt az edzést?";
    confirmAction(message, async () => {
      await deleteWorkout(workoutId);
      onAccept?.();
    });
  };

  const handleFinishWorkout = async (workout, onAccept) => {
    if (workout.isCompleted) return;

    confirmAction(
      "Biztosan lezárod az edzést? Utána már nem szerkesztheted és ez nem visszafordítható!",
      async () => {
        await closeWorkout(workout.id);
        onAccept?.();
      }
    );
  };

  const handleStartWorkout = () => {
    const activeWorkout = workoutData?.find((w) => !w.isCompleted);

    if (activeWorkout) {
      handleDelete(activeWorkout.id, () => setShowCreateWorkoutForm(true));
    } else {
      setShowCreateWorkoutForm(true);
    }
  };

  return (
    <div className="list-container">
      <h2 className="text-2xl font-bold mb-4">Edzések</h2>
      <Button
        label="Edzés elkezdése"
        icon={<FaPlus className="mr-1" />}
        className="edit-button flex items-center mb-4"
        onClick={handleStartWorkout}
        unstyled
      />

      {isLoading ? (
        <p>Adatok betöltése...</p>
      ) : (
        <WorkoutTable
          workoutData={workoutData}
          selectedWorkout={selectedWorkout}
          setSelectedWorkout={setSelectedWorkout}
          onSelect={() => setVisibleWorkout(true)}
        />
      )}

      {showCreateWorkoutForm && (
        <CreateWorkoutForm onClose={() => setShowCreateWorkoutForm(false)} />
      )}

      {visibleWorkout && (
        <ExerciseManager
          setVisible={setVisibleWorkout}
          selectedWorkout={selectedWorkout}
          setSelectedWorkout={setSelectedWorkout}
          deleteWorkout={handleDelete}
          finishWorkout={handleFinishWorkout}
        />
      )}

      <ConfirmDialog />
    </div>
  );
};
