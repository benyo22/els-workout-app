/* eslint-disable react/prop-types */
import { useUpdateSetByIdMutation } from "@api/endpoints/setEndpoints";
import { setTypes } from "@data/data";
import { Button } from "primereact/button";

export const SetButton = ({ set, setsInExercises, workoutIsFinished }) => {
  const [updateSet] = useUpdateSetByIdMutation();

  const handleTypeChange = async () => {
    const currentKeys = Object.keys(setTypes);

    const nextIndex = (currentKeys.indexOf(set.type) + 1) % currentKeys.length;
    let nextType = currentKeys[nextIndex];

    if (nextType === "warm-up") {
      const canBeWarmUp =
        set.setNumber === 1 ||
        setsInExercises[set.setNumber - 2]?.type === "warm-up";

      if (!canBeWarmUp) {
        const nextIndex =
          (currentKeys.indexOf(nextType) + 1) % currentKeys.length;
        nextType = currentKeys[nextIndex];
      }
    }

    await updateSet({ setId: set.id, data: { type: nextType } });
  };

  return (
    <div className="flex flex-col items-center">
      <p>Szett</p>
      <Button
        label={setTypes[set.type] === "/" ? set.setNumber : setTypes[set.type]}
        onClick={handleTypeChange}
        className={`h-8 w-8 border-1 border-gray-200 hover:bg-gray-300 active:bg-gray-300 rounded-lg px-2 bg-gray-200 dark:bg-dark-light dark:hover:bg-gray-600 dark:active:bg-gray-600 ${
          workoutIsFinished ? "cursor-default" : "cursor-pointer"
        } ${
          set.type === "warm-up"
            ? "text-yellow-500 dark:text-yellow-300"
            : set.type === "dropset"
            ? "text-primary-blue dark:text-dark-primary-blue"
            : set.type === "failure"
            ? "text-primary-red"
            : "text-black dark:text-primary-white"
        }`}
        unstyled
        disabled={workoutIsFinished}
      />
    </div>
  );
};
