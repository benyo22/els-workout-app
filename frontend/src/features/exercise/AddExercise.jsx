/* eslint-disable react/prop-types */
import {
  useAddExerciseToWorkoutMutation,
  useGetAllExercisesQuery,
  useGetExcercisesInWorkoutQuery,
} from "@api/endpoints/exerciseEndpoints";
import { bodyPartLabels, categoryLabels } from "@data/data";
import { CreateExerciseForm } from "@features/exercise/CreateExerciseForm";
import { ExerciseItem } from "@features/exercise/ExerciseItem";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";

export const AddExercise = ({ workoutId, setVisible }) => {
  const [exercises, setExercises] = useState([]);
  const { data: exerciseData } = useGetAllExercisesQuery();
  const { data: exercisesInWorkout } =
    useGetExcercisesInWorkoutQuery(workoutId);

  const [addExerciseToWorkout] = useAddExerciseToWorkoutMutation();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBodyPart, setSelectedBodyPart] = useState("-1");
  const [selectedCategory, setSelectedCategory] = useState("-1");
  const [showCreateExercise, setShowCreateExercise] = useState(false);

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

  const handleAddExercise = async (exerciseId) => {
    await addExerciseToWorkout({ exerciseId, workoutId });
    setVisible(false);
  };

  return (
    <>
      {showCreateExercise && (
        <CreateExerciseForm setVisible={setShowCreateExercise} />
      )}

      <Dialog
        header={
          <Button
            label="Új Gyakorlat"
            className="text-primary-blue cursor-pointer hover:text-third-blue dark:text-dark-primary-blue dark:hover:text-dark-secondary-blue"
            onClick={() => setShowCreateExercise(true)}
            unstyled
          />
        }
        modal
        visible
        draggable={false}
        onHide={() => setVisible(false)}
      >
        {/* Search bar */}
        <FloatLabel className="mt-6">
          <InputText
            id="search"
            name="search"
            value={searchTerm}
            onInput={(e) => setSearchTerm(e.target.value)}
            className="input"
            unstyled
          />
          <label htmlFor="search" className="font-bold">
            Gyakorlat keresése
          </label>
        </FloatLabel>

        {/* Dropdowns */}
        <div className="flex gap-x-4 text-xs md:text-base mt-4">
          <select
            className="select"
            onChange={(e) => setSelectedBodyPart(e.target.value)}
          >
            <option value="-1">Testrész kiválasztása:</option>
            {Object.entries(bodyPartLabels).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>

          <select
            className="select"
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
        <h3 className="mt-4 font-bold">Gyakorlatok:</h3>
        <div className="flex flex-col gap-2 mt-4 h-[450px] p-2 overflow-y-auto">
          {exercises.length === 0 ? (
            <div className="text-center text-gray-500 dark:text-gray-400">
              Nincs találat
            </div>
          ) : (
            exercises.map((exercise) => (
              <ExerciseItem
                key={exercise.id}
                exercise={exercise}
                onSelect={() => handleAddExercise(exercise.id)}
              />
            ))
          )}
        </div>
      </Dialog>
    </>
  );
};
