/* eslint-disable react/prop-types */
import { Button } from "primereact/button";
import { FaRegCircleXmark } from "react-icons/fa6";

import { SetButton } from "./SetButton";
import { WeightRepsCategory } from "./WeightRepsCategory";
import { DistanceCategory } from "./DistanceCategory";
import { DurationCategory } from "./DurationCategory";

export const SetItem = ({
  set,
  handleDelete,
  setsInExercises,
  exerciseCategory,
  workoutIsCompleted,
}) => {
  return (
    <div
      className={`flex justify-between items-center ${
        workoutIsCompleted ? "" : "pb-4"
      }`}
    >
      <SetButton
        set={set}
        setsInExercises={setsInExercises}
        workoutIsCompleted={workoutIsCompleted}
      />

      {exerciseCategory === "distance" ? (
        <DistanceCategory set={set} workoutIsCompleted={workoutIsCompleted} />
      ) : exerciseCategory === "duration" ? (
        <DurationCategory set={set} workoutIsCompleted={workoutIsCompleted} />
      ) : (
        <WeightRepsCategory set={set} workoutIsCompleted={workoutIsCompleted} />
      )}

      {/* Delete set button */}
      {!workoutIsCompleted && (
        <Button
          className="text-primary-red hover:text-secondary-red active:text-secondary-red hover:scale-101 cursor-pointer"
          onClick={() => handleDelete(set.id)}
          unstyled
        >
          <FaRegCircleXmark size={25} />
        </Button>
      )}
    </div>
  );
};
