/* eslint-disable react/prop-types */
import { DistanceCategory } from "@features/set/DistanceCategory";
import { DurationCategory } from "@features/set/DurationCategory";
import { SetButton } from "@features/set/SetButton";
import { WeightRepsCategory } from "@features/set/WeightRepsCategory";
import { Button } from "primereact/button";
import { FaRegCircleXmark } from "react-icons/fa6";

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
      ) : exerciseCategory === "duration" || exerciseCategory === "cardio" ? (
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
