/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

import { FaXmark } from "react-icons/fa6";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";

import { bodyPartLabels, categoryLabels } from "../../../utils/data";
import {
  useAddExerciseToWorkoutMutation,
  useGetAllExercisesQuery,
  useGetExcercisesInWorkoutQuery,
} from "../../../state/endpoints/exerciseEndpoints";

export const AddExercise = ({ workoutId, visible, setVisible }) => {
  const [exercises, setExercises] = useState([]);
  const { data: exerciseData } = useGetAllExercisesQuery();
  const { data: exercisesInWorkout } =
    useGetExcercisesInWorkoutQuery(workoutId);

  const [addExerciseToWorkout] = useAddExerciseToWorkoutMutation();

  // filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBodyPart, setSelectedBodyPart] = useState("-1");
  const [selectedCategory, setSelectedCategory] = useState("-1");

  useEffect(() => {
    if (exerciseData && exercisesInWorkout) {
      let filtered = exerciseData.filter((exercise) => {
        return !exercisesInWorkout.some(
          (workoutExercise) => workoutExercise.id === exercise.id
        );
      });

      if (searchTerm) {
        filtered = filtered.filter((exercise) =>
          exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      if (selectedBodyPart && selectedBodyPart !== "-1") {
        filtered = filtered.filter(
          (exercise) => exercise.bodyPart === selectedBodyPart
        );
      }

      if (selectedCategory && selectedCategory !== "-1") {
        filtered = filtered.filter(
          (exercise) => exercise.category === selectedCategory
        );
      }

      setExercises(filtered);
    }
  }, [
    exerciseData,
    searchTerm,
    selectedBodyPart,
    selectedCategory,
    exercisesInWorkout,
  ]);

  return (
    <Dialog
      header={
        <div className="flex justify-between">
          <Button
            className="text-primary-blue cursor-pointer hover:text-third-blue mt-2 ml-2 dark:text-dark-primary-blue dark:hover:text-dark-secondary-blue"
            unstyled
          >
            Új Gyakorlat
          </Button>

          <Button
            onClick={() => {
              if (!visible) return;
              setVisible(false);
            }}
            className="text-md text-[#6B7381] hover:bg-[#F2F4F7] rounded-full p-2 mt-2 mr-2 hover:cursor-pointer dark:hover:bg-[#242F3D] dark:text-[#9498A0]"
            unstyled
          >
            <FaXmark />
          </Button>
        </div>
      }
      visible={visible}
      draggable={false}
      closable={false}
      closeOnEscape={false}
      className="bg-primary-white dark:bg-dark-medium shadow-lg border-1 border-primary-grey rounded-lg max-w-full w-full md:max-w-md h-[500px] 2xl:h-[700px] p-4"
      unstyled
    >
      <main className="flex flex-col">
        {/* Search bar */}
        <InputText
          value={searchTerm}
          onInput={(e) => setSearchTerm(e.target.value)}
          placeholder="Gyakorlat keresése"
          className="login-input border-0 bg-gray-200 mt-4 w-full dark:bg-dark-light"
          unstyled
        />

        {/* Dropdowns */}
        <div className="flex gap-x-4 text-xs md:text-base mt-4">
          <select
            className="w-full bg-gray-200 hover:bg-gray-300 rounded-lg flex items-center justify-between px-1 h-10 dark:bg-dark-light dark:hover:bg-gray-600 hover:cursor-pointer active:bg-gray-300 dark:active:bg-gray-600"
            onChange={(e) => setSelectedBodyPart(e.target.value)}
          >
            <option value="-1">Testrész kiválasztása:</option>
            {Object.entries(bodyPartLabels).map(([key, value]) => (
              <option key={key} value={key} className="hover:bg-gray-300">
                {value}
              </option>
            ))}
          </select>

          <select
            className="w-full bg-gray-200 hover:bg-gray-300 rounded-lg flex items-center justify-between px-1 h-10 dark:bg-dark-light dark:hover:bg-gray-600 hover:cursor-pointer active:bg-gray-300 dark:active:bg-gray-600"
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="-1">Kategória kiválasztása:</option>
            {Object.entries(categoryLabels).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>
        </div>

        {/* Exercises */}
        <section className="flex flex-col gap-2 mt-8 max-h-[280px] 2xl:max-h-[480px] p-2 overflow-y-auto">
          {exercises.length === 0 ? (
            <div className="text-center text-gray-500 dark:text-gray-400">
              Nincs találat
            </div>
          ) : (
            exercises.map((exercise) => (
              <div
                key={exercise.id}
                className="flex items-center border-t border-b p-1 border-solid border-primary-grey hover:bg-gray-200 hover:cursor-pointer dark:hover:bg-gray-700 active:bg-gray-300 dark:active:bg-gray-700"
                onClick={async () => {
                  await addExerciseToWorkout({
                    exerciseId: exercise.id,
                    workoutId,
                  });
                  setVisible(false);
                }}
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
            ))
          )}
        </section>
      </main>
    </Dialog>
  );
};
