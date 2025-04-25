/* eslint-disable react/prop-types */
import {
  useGetExcercisesInWorkoutQuery,
  useRemoveExerciseFromWorkoutMutation,
} from "@api/endpoints/exerciseEndpoints";
import { useDeleteAllSetsInExerciseMutation } from "@api/endpoints/setEndpoints";
import { categoryLabels } from "@data/data";
import { Sets } from "@features/set/Sets";
import { Button } from "primereact/button";

export const ExerciseList = ({ workout }) => {
  const { data: exercisesInWorkout } = useGetExcercisesInWorkoutQuery(
    workout?.id,
    { skip: !workout?.id }
  );
  const [deleteAllSets] = useDeleteAllSetsInExerciseMutation();
  const [removeExerciseFromWorkout] = useRemoveExerciseFromWorkoutMutation();

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

            {!workout?.isFinished && (
              <Button
                label="Gyakorlat eltávolítása"
                className="text-primary-red hover:text-secondary-red active:text-secondary-red cursor-pointer"
                onClick={async () => {
                  await removeExerciseFromWorkout({
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
              workoutIsFinished={workout?.isFinished}
            />
          </div>
        </div>
      ))}
    </section>
  );
};
