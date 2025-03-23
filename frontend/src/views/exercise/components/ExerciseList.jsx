/* eslint-disable react/prop-types */
import { Button } from "primereact/button";
import { FaRegCircleXmark } from "react-icons/fa6";

import { categoryLabels } from "../../../utils/data";
import {
  useDeleteExerciseFromWorkoutMutation,
  useGetExcercisesInWorkoutQuery,
} from "../../../state/endpoints/exerciseEndpoints";

export const ExerciseList = ({ workout }) => {
  const { data: exercisesInWorkout } = useGetExcercisesInWorkoutQuery(
    workout?.id,
    { skip: !workout?.id }
  );
  const [deleteExerciseFromWorkout] = useDeleteExerciseFromWorkoutMutation();

  return (
    <div className="flex flex-col mt-4 overflow-y-auto max-h-[200px] 2xl:max-h-[400px]">
      {exercisesInWorkout?.map((exercise, index) => (
        <div key={index}>
          <h4>
            {exercise.name}
            {["barbell", "dumbell", "cable", "machine"].includes(
              exercise.category
            ) && ` (${categoryLabels[exercise.category]})`}
          </h4>

          <div className="p-4 border border-gray-300 rounded-lg flex justify-end">
            {/* Render the sets for each exercise */}
            {/* {exercise.sets.map((set, setIndex) => (
          <div
            key={setIndex}
            className="flex justify-between items-center border-b py-2"
          >
            <div className="flex-1">
              <span className="text-sm font-semibold">
                Set {setIndex + 1}:
              </span>
            </div>
            <div className="flex-1 text-center">
              <span className="text-sm">{set.weight} kg</span>
            </div>
            <div className="flex-1 text-center">
              <span className="text-sm">{set.reps} reps</span>
            </div>
          </div>
        ))} */}
            {!workout?.isCompleted && (
              <Button
                className="text-primary-red hover:text-secondary-red active:text-secondary-red hover:scale-101 cursor-pointer"
                onClick={async () =>
                  await deleteExerciseFromWorkout({
                    exerciseId: exercise.id,
                    workoutId: workout?.id,
                  })
                }
                unstyled
              >
                <FaRegCircleXmark size={25} />
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
