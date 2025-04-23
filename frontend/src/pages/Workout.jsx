import { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "primereact/button";

import { FaChartLine, FaPlus } from "react-icons/fa6";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

import {
  useDeleteWorkoutByIdMutation,
  useFinishWorkoutByIdMutation,
  useGetWorkoutByUserIdQuery,
} from "@api";
import { ErrorMessage } from "@features";
import { WorkoutTable } from "@features";
import { WorkoutManager } from "@features";
import { WorkoutStatistics } from "@features";
import { CreateWorkoutForm } from "@features";
import { selectUserId } from "@store/slices/authSlice";

export const Workout = () => {
  const userId = useSelector(selectUserId);
  const [finishWorkout] = useFinishWorkoutByIdMutation();
  const [deleteWorkout] = useDeleteWorkoutByIdMutation();
  const {
    data: workoutData,
    isLoading,
    isError,
    error,
  } = useGetWorkoutByUserIdQuery(userId);

  const [visibleWorkout, setVisibleWorkout] = useState(false);
  const [showStatistics, setShowStatistics] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [showCreateWorkoutForm, setShowCreateWorkoutForm] = useState(false);

  const confirmAction = (message, onAccept) => {
    confirmDialog({
      message,
      header: "Megerősítés",
      acceptLabel: "Igen",
      rejectLabel: "Nem",
      accept: onAccept,
    });
  };

  const handleDelete = (workoutId, onAccept, startingWorkout) => {
    const activeWorkout = workoutData?.find((w) => !w.isCompleted);
    const message =
      activeWorkout && startingWorkout
        ? "Van már egy folyamatban lévő edzésed! Ha újat szeretnél indítani, akkor az törlődni fog! Biztos vagy benne?"
        : "Biztosan törölni szeretnéd ezt az edzést?";
    confirmAction(message, async () => {
      await deleteWorkout(workoutId);
      onAccept?.();
    });
  };

  const handleFinishWorkout = async (workout, onAccept) => {
    if (workout.isFinished) return;

    confirmAction(
      "Biztosan befejezed az edzést? Miután lezárod, már nem tudod módosítani, és ez a művelet nem visszavonható!",
      async () => {
        await finishWorkout(workout.id);
        onAccept?.();
      }
    );
  };

  const handleStartWorkout = () => {
    const activeWorkout = workoutData?.find((w) => !w.isFinished);
    const startingWorkout = true;
    if (activeWorkout) {
      handleDelete(
        activeWorkout.id,
        () => setShowCreateWorkoutForm(true),
        startingWorkout
      );
    } else {
      setShowCreateWorkoutForm(true);
    }
  };

  return (
    <>
      {isError ? (
        <ErrorMessage message={error.data.error} />
      ) : showStatistics ? (
        <div className="settings-container h-[340px]">
          <WorkoutStatistics setVisible={setShowStatistics} />
        </div>
      ) : (
        <div className="list-container">
          <h2 className="text-2xl font-bold mb-4">Edzések</h2>

          <div className="flex gap-x-4">
            <Button
              label="Edzés indítása"
              icon={<FaPlus className="mr-1" />}
              className="edit-button flex items-center mb-2"
              onClick={handleStartWorkout}
              unstyled
            />

            <Button
              icon={<FaChartLine className="ml-1" />}
              onClick={() => setShowStatistics(true)}
              className="edit-button flex items-center mb-2"
              unstyled
            />
          </div>

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
            <CreateWorkoutForm
              onClose={() => setShowCreateWorkoutForm(false)}
            />
          )}

          {visibleWorkout && (
            <WorkoutManager
              setVisible={setVisibleWorkout}
              selectedWorkout={selectedWorkout}
              setSelectedWorkout={setSelectedWorkout}
              deleteWorkout={handleDelete}
              finishWorkout={handleFinishWorkout}
            />
          )}

          <ConfirmDialog />
        </div>
      )}
    </>
  );
};
