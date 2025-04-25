/* eslint-disable react/prop-types */
import {
  useAddSetToExerciseMutation,
  useBulkUpdateSetsMutation,
  useDeleteSetByIdMutation,
  useGetSetsInExerciseQuery,
} from "@api/endpoints/setEndpoints";
import { ErrorMessage } from "@features/errormessage/ErrorMessage";
import { SetItem } from "@features/set/SetItem";
import { Button } from "primereact/button";
import { useState } from "react";

export const Sets = ({
  exerciseId,
  workoutId,
  exerciseCategory,
  workoutIsFinished,
}) => {
  const [error, setError] = useState();
  const [deleteSet] = useDeleteSetByIdMutation();
  const [bulkUpdateSets] = useBulkUpdateSetsMutation();
  const [addSetToExercise] = useAddSetToExerciseMutation();
  const { data: setsInExercises } = useGetSetsInExerciseQuery({
    exerciseId,
    workoutId,
  });

  const recalculateSetNumbers = async (deletedSetId, newSet) => {
    if (!setsInExercises) return;

    let updatedSets = [...setsInExercises];

    if (deletedSetId) {
      updatedSets = updatedSets
        .filter((set) => set.id !== deletedSetId)
        .map((set, index) => ({ ...set, setNumber: index + 1 }));
    }

    if (newSet) {
      updatedSets = [...updatedSets, newSet].map((set, index) => ({
        ...set,
        setNumber: index + 1,
      }));
    }

    await bulkUpdateSets(updatedSets);
  };

  const handleDelete = async (setId) => {
    await deleteSet(setId);
    recalculateSetNumbers(setId);
  };

  const handleSetCreate = async (exerciseId, workoutId) => {
    setError(null);
    try {
      const newSet = await addSetToExercise({
        exerciseId,
        workoutId,
      }).unwrap();
      recalculateSetNumbers(null, newSet);
    } catch (error) {
      setError(error?.data?.error);
    }
  };

  return (
    <>
      {setsInExercises?.map((set) => (
        <SetItem
          key={set.id}
          set={set}
          handleDelete={handleDelete}
          setsInExercises={setsInExercises}
          exerciseCategory={exerciseCategory}
          workoutIsFinished={workoutIsFinished}
        />
      ))}

      <ErrorMessage message={error} />

      {/* Add new set to exercise button */}
      {!workoutIsFinished && (
        <Button
          label="+ Szett hozzáadása"
          className="blue-button p-0 mt-4"
          onClick={async () => handleSetCreate(exerciseId, workoutId)}
          unstyled
        />
      )}
    </>
  );
};
