/* eslint-disable react/prop-types */
import { Button } from "primereact/button";

import { Sets } from "../../set/Sets";
import { categoryLabels } from "../../../utils/data";
import { useDeleteAllSetsInExerciseMutation } from "../../../state/endpoints/setEndpoints";
import { useRemoveExerciseFromWorkoutMutation } from "../../../state/endpoints/exerciseEndpoints";

export const ExerciseList = ({ workout, exercisesInWorkout }) => {
  const [deleteAllSets] = useDeleteAllSetsInExerciseMutation();
  const [deleteExerciseFromWorkout] = useRemoveExerciseFromWorkoutMutation();

  return (
    <section className="flex flex-col gap-y-4 mt-4 overflow-y-auto">
      {exercisesInWorkout?.map((exercise, index) => (
        <div key={index}>
          <div className="flex justify-between">
            <h4>
              {exercise.name}
              {["barbell", "dumbell", "cable", "machine"].includes(
                exercise.category
              ) && ` (${categoryLabels[exercise.category]})`}
            </h4>

            {!workout?.isCompleted && (
              <Button
                label="Gyakorlat törlése"
                className="text-primary-red hover:text-secondary-red active:text-secondary-red cursor-pointer"
                onClick={async () => {
                  await deleteExerciseFromWorkout({
                    exerciseId: exercise.id,
                    workoutId: workout?.id,
                  });
                  await deleteAllSets({
                    exerciseId: exercise.id,
                    workoutId: workout?.id,
                  });
                }}
                unstyled
              />
            )}
          </div>

          <div className="flex flex-col p-4 border border-gray-300 rounded-lg">
            <Sets
              exerciseId={exercise.id}
              workoutId={workout?.id}
              exerciseCategory={exercise.category}
              workoutIsCompleted={workout?.isCompleted}
            />
          </div>
        </div>
      ))}
    </section>
  );
};
