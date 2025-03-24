/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

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

  const [sets, setSets] = useState([]);

  useEffect(() => {
    const correctSetNumbers = async (setId, setNumber) => {
      await updateSet({ setId, data: { setNumber } });
    };

    if (setsInExercises) {
      setsInExercises.map((set, index) => correctSetNumbers(set.id, index + 1));
    }
  }, [setsInExercises, updateSet]);

  return (
    <div className="flex flex-col flex-1 mr-4">
      {/* Loop through the sets in the exercise */}
      {setsInExercises?.map((set, index) => (
        <div key={index} className="flex justify-between mb-2">
          <div className="flex flex-col items-center">
            <p>Szett</p>
            <p>{set.setNumber}</p>
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
    </div>
  );
};
