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
  workoutIsFinished,
}) => {
  return (
    <div
      className={`flex justify-between items-center ${
        workoutIsFinished ? "" : "pb-4"
      }`}
    >
      <SetButton
        set={set}
        setsInExercises={setsInExercises}
        workoutIsFinished={workoutIsFinished}
      />

      {exerciseCategory === "distance" ? (
        <DistanceCategory set={set} workoutIsFinished={workoutIsFinished} />
      ) : exerciseCategory === "duration" ? (
        <DurationCategory set={set} workoutIsFinished={workoutIsFinished} />
      ) : (
        <WeightRepsCategory set={set} workoutIsFinished={workoutIsFinished} />
      )}

      {/* Delete set button */}
      {!workoutIsFinished && (
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
