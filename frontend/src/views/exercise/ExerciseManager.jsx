/* eslint-disable react/prop-types */
import { useState } from "react";

import { FaXmark } from "react-icons/fa6";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

import { AddExercise } from "./components/AddExercise";
import { ExerciseList } from "./components/ExerciseList";
import { useGetExcercisesInWorkoutQuery } from "../../state/endpoints/exerciseEndpoints";

export const ExerciseManager = ({
  setVisible,
  selectedWorkout,
  setSelectedWorkout,
  deleteWorkout,
  finishWorkout,
}) => {
  const [showAddExercise, setShowAddExercise] = useState(false);
  const { data: exercisesInWorkout } = useGetExcercisesInWorkoutQuery(
    selectedWorkout?.id,
    { skip: !selectedWorkout?.id }
  );

  const handleFinisWorkout = () => {
    finishWorkout(selectedWorkout, () => {
      setVisible(false);
      // row selection works fine because of this
      setTimeout(() => {
        setSelectedWorkout(null);
      }, 100);
    });
  };

  return (
    <Dialog
      header={
        <div className="flex justify-between sticky top-0">
          <p className="mt-3 font-semibold text-xl">
            {selectedWorkout.name || "Új edzés"}
          </p>
          <Button
            onClick={() => {
              setVisible(false);
              // row selection works fine because of this
              setTimeout(() => {
                setSelectedWorkout(null);
              }, 100);
            }}
            className="text-md text-[#6B7381] hover:bg-[#F2F4F7] rounded-full p-2 mt-2 mr-2 hover:cursor-pointer dark:hover:bg-[#242F3D] dark:text-[#9498A0]"
            unstyled
          >
            <FaXmark />
          </Button>
        </div>
      }
      visible
      modal
      draggable={false}
      closable={false}
      closeOnEscape={false}
      className="bg-primary-white shadow-lg border-1 border-primary-grey dark:bg-dark-medium rounded-lg max-w-full w-full md:max-w-md h-[700px] p-4 overflow-y-auto"
      unstyled
    >
      <div className="flex flex-col mt-4">
        <div className="flex justify-between">
          {/* Date of workout */}
          <span className="font-extrabold">{selectedWorkout?.date}</span>

          {/* Finish workout button */}
          {!selectedWorkout?.isCompleted && (
            <Button
              label="Befejez"
              className="green-button"
              onClick={handleFinisWorkout}
              unstyled
            />
          )}
        </div>

        {/* Exercises in workout */}
        <ExerciseList
          workout={selectedWorkout}
          exercisesInWorkout={exercisesInWorkout}
        />

        {/* Adding exercises dialog */}
        {showAddExercise && (
          <AddExercise
            workoutId={selectedWorkout?.id}
            setVisible={setShowAddExercise}
          />
        )}

        {/* Add exercise button */}
        {!selectedWorkout?.isCompleted && (
          <Button
            label="Gyakorlat hozzáadása"
            className="blue-button my-4"
            onClick={() => setShowAddExercise(true)}
            unstyled
          />
        )}

        {/* Delete workout button */}
        <Button
          label="Edzés törlése"
          className="red-button my-4"
          onClick={() => {
            deleteWorkout(selectedWorkout?.id, () => setVisible(false));
          }}
          unstyled
        />
      </div>
    </Dialog>
  );
};
