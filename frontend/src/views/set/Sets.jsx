/* eslint-disable react/prop-types */
import { useEffect } from "react";

import { Button } from "primereact/button";
import { FaRegCircleXmark } from "react-icons/fa6";

import {
  useAddSetToExerciseMutation,
  useDeleteSetByIdMutation,
  useGetSetsInExerciseQuery,
  useUpdateSetByIdMutation,
} from "../../state/endpoints/setEndpoints";
import { setTypes } from "../../utils/data";

export const Sets = ({ exerciseId, workoutId, workoutIsCompleted }) => {
  const [updateSet] = useUpdateSetByIdMutation();
  const [deleteSet] = useDeleteSetByIdMutation();
  const [addSetToExercise] = useAddSetToExerciseMutation();
  const { data: setsInExercises } = useGetSetsInExerciseQuery({
    exerciseId,
    workoutId,
  });

  useEffect(() => {
    const correctSetNumbers = async (setId, setNumber) => {
      await updateSet({ setId, data: { setNumber } });
    };

    if (setsInExercises) {
      setsInExercises.map((set, index) => correctSetNumbers(set.id, index + 1));
    }
  }, [setsInExercises, updateSet]);

  const nextSetType = (current) => {
    const currentKeys = Object.keys(setTypes);
    const currentIndex = currentKeys.indexOf(current);

    if (currentIndex !== -1) {
      const nextIndex = (currentIndex + 1) % currentKeys.length;
      return currentKeys[nextIndex];
    } else {
      return "/";
    }
  };

  return (
    <>
      {/* Loop through the sets in the exercise */}
      {setsInExercises?.map((set, index) => (
        <div key={index} className="flex justify-between items-center mb-4">
          <div className="flex flex-col items-center">
            <p>Szett</p>
            <p className="border-1 border-gray-300 rounded-lg px-2 bg-gray-200 dark:bg-dark-light mt-1">
              {set.setNumber}
            </p>
          </div>

          <div className="flex flex-col">
            <p>kg</p>
            {/* <input
              type="number"
              value={set.weight}
              onChange={(e) =>
                updateSetData(exercise.id, index, "weight", e.target.value)
              }
            /> */}
          </div>

          <div className="flex flex-col">
            <p>Ismétlés</p>
            {/* <input
              type="number"
              value={set.reps}
              onChange={(e) =>
                updateSetData(exercise.id, index, "reps", e.target.value)
              }
            /> */}
          </div>

          {/* Set type */}
          <Button
            label={setTypes[set.type]}
            onClick={async () => {
              const type = nextSetType(set.type);
              await updateSet({ setId: set.id, data: { type } });
            }}
            className={`h-8 w-8 border-1 border-gray-200 hover:bg-gray-300 active:bg-gray-300 rounded-lg px-2 bg-gray-200 dark:bg-dark-light dark:hover:bg-gray-600 dark:active:bg-gray-600 cursor-pointer ${
              set.type === "warm-up"
                ? "text-yellow-500 dark:text-yellow-300"
                : set.type === "dropset"
                ? "text-primary-blue dark:text-dark-primary-blue"
                : set.type === "failure"
                ? "text-primary-red"
                : "text-black dark:text-primary-white"
            }`}
            unstyled
          />

          {/* Delete set button */}
          {!workoutIsCompleted && (
            <Button
              className="text-primary-red hover:text-secondary-red active:text-secondary-red hover:scale-101 cursor-pointer"
              onClick={async () => await deleteSet(set.id)}
              unstyled
            >
              <FaRegCircleXmark size={25} />
            </Button>
          )}
        </div>
      ))}

      {/* Add new set to exercise button */}
      {!workoutIsCompleted && (
        <Button
          label="+ Szett hozzáadása"
          className="blue-button p-0 mt-4"
          unstyled
          onClick={async () => addSetToExercise({ exerciseId, workoutId })}
        />
      )}
    </>
  );
};
