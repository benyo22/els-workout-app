/* eslint-disable react/prop-types */
import { bodyPartLabels, categoryLabels } from "@/utils/data";

export const ExerciseItem = ({ exercise, onSelect }) => (
  <div
    className="flex items-center border-t border-b p-1 border-solid border-primary-grey hover:bg-gray-200 hover:cursor-pointer dark:hover:bg-gray-700 active:bg-gray-300 dark:active:bg-gray-700"
    onClick={onSelect}
  >
    <div className="flex flex-col gap-1">
      <span className="font-bold text-black dark:text-primary-white">
        {exercise.name}
      </span>
      <div className="flex align-items-center gap-2">
        <span className="text-gray-500 dark:text-gray-400">
          {bodyPartLabels[exercise.bodyPart]} -{" "}
          {categoryLabels[exercise.category]}
        </span>
      </div>
    </div>
  </div>
);
